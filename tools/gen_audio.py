"""Build the pronunciation sprite (audio/tk.mp3 + audio/map.json) for every item in audio/items.json.

Sources, in order of preference:
  1. audio/native/<key>.wav  — native-speaker clips cut from the Peace Corps "Introduction to the Turkmen
     Language" recordings (public domain); audio/native/native.json records where each clip came from.
  2. Meta MMS Turkmen TTS (facebook/mms-tts-tuk-script_latin). With --score, three renditions are
     synthesized per item and the one that best matches the expected phonemes (allosaurus CTC
     goodness-of-pronunciation, tools/gop.py) is kept; items that still score badly are listed in log.json.

map.json: {key: [start_seconds, duration_seconds, source]}  source 1 = native recording, 0 = synthesized.

Usage: python3 tools/gen_audio.py [--model /path/to/mms-tts-tuk-script_latin] [--score]
"""
import argparse, json, os, subprocess, sys, hashlib, time, warnings, logging
import numpy as np
import scipy.io.wavfile as wav

warnings.filterwarnings('ignore'); logging.disable(logging.WARNING)
HERE = os.path.dirname(os.path.abspath(__file__))
ap = argparse.ArgumentParser()
ap.add_argument('--model', default=os.environ.get('MMS_TUK', '/home/claude/mms'))
ap.add_argument('--items', default=os.path.join(HERE, '..', 'audio', 'items.json'))
ap.add_argument('--native', default=os.path.join(HERE, '..', 'audio', 'native'))
ap.add_argument('--out', default=os.path.join(HERE, '..', 'audio'))
ap.add_argument('--bitrate', default='40k')
ap.add_argument('--score', action='store_true', help='pick the best of 3 synthesized renditions with tools/gop.py (needs allosaurus)')
args = ap.parse_args()

import torch
from transformers import VitsModel, VitsTokenizer
tok = VitsTokenizer.from_pretrained(args.model)
model = VitsModel.from_pretrained(args.model).eval()
SR = model.config.sampling_rate  # 16000
RATE = {'letter': 0.8, 'word': 0.85, 'phrase': 0.92}

scorer = None
if args.score:
    sys.path.insert(0, HERE)
    import gop
    scorer = gop.score   # (float32 audio, text) -> cost, lower is better

def synth(text, rate, seed):
    torch.manual_seed(seed)
    model.speaking_rate = rate
    ids = tok(text, return_tensors='pt')
    with torch.no_grad():
        return model(**ids).waveform[0].numpy().astype(np.float32)

def loud_span(a, frac=0.005):
    thr = max(frac * float(np.abs(a).max()), 1e-4)
    idx = np.where(np.abs(a) > thr)[0]
    return (int(idx[0]), int(idx[-1])) if len(idx) else (0, 0)

def quality(a):
    peak = float(np.abs(a).max())
    idx = np.where(np.abs(a) > 0.05)[0]
    loud = (idx[-1] - idx[0]) / SR if len(idx) else 0.0
    return peak, loud

def polish(a, pad=0.08):
    s, e = loud_span(a)
    p = int(pad * SR)
    s = max(0, s - p); e = min(len(a), e + p)
    a = a[s:e].copy()
    # RMS normalise to -20 dBFS over the louder half, then peak-limit
    mag = np.abs(a)
    core = a[mag > 0.1 * mag.max()] if mag.max() > 0 else a
    rms = float(np.sqrt(np.mean(core ** 2))) if len(core) else 1e-4
    a *= min(10 ** (-20 / 20) / max(rms, 1e-4), 20)
    a = np.clip(a, -0.95, 0.95)
    f = int(0.01 * SR)
    if len(a) > 2 * f:
        a[:f] *= np.linspace(0, 1, f); a[-f:] *= np.linspace(1, 0, f)
    return a

def load_native(key):
    fn = os.path.join(args.native, key.replace(' ', '_') + '.wav')
    if key in NATIVE and 'file' in NATIVE[key]: fn = os.path.join(args.native, NATIVE[key]['file'])
    if not os.path.exists(fn): return None
    sr, a = wav.read(fn)
    if a.ndim > 1: a = a[:, 0]
    a = a.astype(np.float32) / 32767
    if sr != SR:
        import resampy
        a = resampy.resample(a, sr, SR)
    return a

NATIVE = {}
nat_json = os.path.join(args.native, 'native.json')
if os.path.exists(nat_json): NATIVE = json.load(open(nat_json, encoding='utf-8'))

items = json.load(open(args.items, encoding='utf-8'))
clips = {}   # key -> np.array
src_of = {}
log = []
t0 = time.time()
for n, it in enumerate(items):
    key, text, kind = it['key'], it['text'], it['kind']
    if key in clips: continue
    nat = load_native(key)
    if nat is not None:
        clips[key] = polish(nat, pad=0.06); src_of[key] = 1
        log.append({'key': key, 'kind': kind, 'dur': round(len(clips[key]) / SR, 2), 'src': 'native', 'from': NATIVE.get(key, {}).get('source', 'audio/native')})
        continue
    seed = int(hashlib.md5(text.encode()).hexdigest()[:8], 16) % 100000
    cands = []
    for t, sd in [(text, seed), (text, seed + 1), (text, seed + 2)]:
        c = synth(t, RATE[kind], sd); peak, loud = quality(c)
        if peak >= 0.12 and loud >= 0.1: cands.append((c, sd, t))
        if cands and scorer is None: break
    note = ''
    if not cands:   # doubled text for inputs the model swallows
        for t, sd in [(text + ' ' + text, seed), (text + ' ' + text, seed + 1)]:
            c = synth(t, RATE[kind], sd); peak, loud = quality(c)
            if peak >= 0.12 and loud >= 0.1: cands.append((c, sd, t)); note = 'doubled'; break
    if not cands:
        cands.append((c, sd, t)); note = 'WEAK'
    score = None
    if scorer is not None and len(cands) > 1:
        scored = [(scorer(polish(c), text), c, sd, t) for c, sd, t in cands]
        scored.sort(key=lambda z: z[0])
        score, c, sd, t = scored[0]
        if score > 0.5:   # try harder: more seeds and other speaking rates
            for sd2 in range(seed + 3, seed + 9):
                for rate in (RATE[kind], 0.75, 1.0):
                    c2 = synth(text, rate, sd2); peak, loud = quality(c2)
                    if peak < 0.12 or loud < 0.1: continue
                    sc2 = scorer(polish(c2), text)
                    if sc2 < score: score, c, sd, t = sc2, c2, sd2, text
            note = (note + ' ' if note else '') + 'retried'
        if score > 0.5: note = (note + ' ' if note else '') + 'lowscore'
    else:
        c, sd, t = cands[0]
        if scorer is not None: score = scorer(polish(c), text)
    clips[key] = polish(c); src_of[key] = 0
    log.append({'key': key, 'kind': kind, 'dur': round(len(clips[key]) / SR, 2), 'src': 'mms', 'seed': sd, 'note': note, 'score': (round(float(score), 3) if score is not None else None)})
    if n % 40 == 0:
        print('%d/%d %.0fs' % (n, len(items), time.time() - t0), flush=True)

# pack sprite
GAP = int(0.35 * SR)
parts, pos, seg_of = [], 0.0, {}
for key, a in clips.items():
    seg_of[key] = [round(pos, 3), round(len(a) / SR, 3), src_of[key]]
    parts.append(a); parts.append(np.zeros(GAP, np.float32))
    pos += (len(a) + GAP) / SR
sprite = np.concatenate(parts)
os.makedirs(args.out, exist_ok=True)
wav_path = os.path.join(args.out, 'tk.wav')
wav.write(wav_path, SR, (sprite * 32767).astype(np.int16))
mp3_path = os.path.join(args.out, 'tk.mp3')
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav_path, '-ac', '1', '-ar', str(SR), '-codec:a', 'libmp3lame', '-b:a', args.bitrate, '-compression_level', '2', mp3_path], check=True)
os.remove(wav_path)
amap = {it['key']: seg_of[it['key']] for it in items}
json.dump(amap, open(os.path.join(args.out, 'map.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
json.dump(log, open(os.path.join(args.out, 'log.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
nn = sum(1 for k in clips if src_of[k] == 1)
print('clips %d (native %d, synthesized %d), sprite %.1fs, mp3 %d bytes, keys %d, elapsed %.0fs' % (len(clips), nn, len(clips) - nn, len(sprite) / SR, os.path.getsize(mp3_path), len(amap), time.time() - t0))
flagged = [l for l in log if l.get('note')]
print('flagged synthesized items:', [(l['key'], l['note'], l.get('score')) for l in flagged])
