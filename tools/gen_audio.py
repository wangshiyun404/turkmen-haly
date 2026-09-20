"""Synthesize every item in audio/items.json with Meta's MMS Turkmen voice and pack the
clips into one MP3 sprite (audio/tk.mp3) plus an offset map (audio/map.json).

Usage: python3 tools/gen_audio.py [--model /path/to/mms-tts-tuk-script_latin]
"""
import argparse, json, os, subprocess, sys, hashlib, time, warnings, logging
import numpy as np
import scipy.io.wavfile as wav

warnings.filterwarnings('ignore'); logging.disable(logging.WARNING)
ap = argparse.ArgumentParser()
ap.add_argument('--model', default=os.environ.get('MMS_TUK', '/home/claude/mms'))
ap.add_argument('--items', default=os.path.join(os.path.dirname(__file__), '..', 'audio', 'items.json'))
ap.add_argument('--out', default=os.path.join(os.path.dirname(__file__), '..', 'audio'))
ap.add_argument('--bitrate', default='40k')
args = ap.parse_args()

import torch
from transformers import VitsModel, VitsTokenizer
tok = VitsTokenizer.from_pretrained(args.model)
model = VitsModel.from_pretrained(args.model).eval()
SR = model.config.sampling_rate  # 16000
RATE = {'letter': 0.8, 'word': 0.85, 'phrase': 0.92}

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

def polish(a):
    s, e = loud_span(a)
    pad = int(0.08 * SR)
    s = max(0, s - pad); e = min(len(a), e + pad)
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

items = json.load(open(args.items, encoding='utf-8'))
clips = {}   # text -> np.array
log = []
t0 = time.time()
for n, it in enumerate(items):
    text, kind = it['text'], it['kind']
    if text in clips: continue
    seed = int(hashlib.md5(text.encode()).hexdigest()[:8], 16) % 100000
    a, note = None, ''
    for attempt, (t, sd) in enumerate([(text, seed), (text, seed + 1), (text, seed + 2), (text + ' ' + text, seed), (text + ' ' + text, seed + 1)]):
        cand = synth(t, RATE[kind], sd)
        peak, loud = quality(cand)
        if peak >= 0.12 and loud >= 0.1:
            a = cand; note = '' if attempt == 0 else ('retry%d' % attempt if attempt < 3 else 'doubled')
            break
    if a is None:
        a = cand; note = 'WEAK'
    clips[text] = polish(a)
    log.append((text, kind, round(len(clips[text]) / SR, 2), note))
    if n % 40 == 0:
        print('%d/%d %.0fs' % (n, len(items), time.time() - t0), flush=True)

# pack sprite
GAP = int(0.35 * SR)
parts, pos, seg_of = [], 0.0, {}
for text, a in clips.items():
    seg_of[text] = [round(pos, 3), round(len(a) / SR, 3)]
    parts.append(a); parts.append(np.zeros(GAP, np.float32))
    pos += (len(a) + GAP) / SR
sprite = np.concatenate(parts)
os.makedirs(args.out, exist_ok=True)
wav_path = os.path.join(args.out, 'tk.wav')
wav.write(wav_path, SR, (sprite * 32767).astype(np.int16))
mp3_path = os.path.join(args.out, 'tk.mp3')
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav_path, '-ac', '1', '-ar', str(SR), '-codec:a', 'libmp3lame', '-b:a', args.bitrate, '-compression_level', '2', mp3_path], check=True)
amap = {it['key']: seg_of[it['text']] for it in items}
json.dump(amap, open(os.path.join(args.out, 'map.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
json.dump(log, open(os.path.join(args.out, 'log.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
weak = [l for l in log if l[3]]
print('clips %d, sprite %.1fs, mp3 %d bytes, keys %d, elapsed %.0fs' % (len(clips), len(sprite) / SR, os.path.getsize(mp3_path), len(amap), time.time() - t0))
print('retried/doubled/weak:', weak)
