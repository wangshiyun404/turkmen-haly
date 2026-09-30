"""Goodness-of-pronunciation score for a Turkmen clip with the allosaurus universal phone recognizer
(pip install allosaurus; python -m allosaurus.bin.download_model -m uni2005).
score(audio, text) = (best-path log-prob - forced-alignment log-prob of the expected phones) / frames.
0 = the expected phones are the most likely reading; > 0.5 = the clip does not sound like the text."""
import numpy as np, torch, warnings, logging
warnings.filterwarnings('ignore'); logging.disable(logging.WARNING)
from allosaurus.app import read_recognizer
from allosaurus.audio import Audio
from tk_g2p import tk_ipa
_m = read_recognizer('uni2005')
ID = _m.lm.inventory.unit.unit_to_id
SR = 16000
ALT = {
 'a': ['a','ɑ','ɒ','ɐ','aː','ɑː','ã'], 'æ': ['æ','a','æː','ɛ'], 'e': ['e','ɛ','e̞','eː','ɪ'], 'i': ['i','ɪ','iː','ij','i̞'],
 'o': ['o','ɔ','oː','ɔː'], 'u': ['u','ʊ','uː','ɯ'], 'y': ['y','ʏ','yː','ʉ','u'], 'ø': ['ø','œ','ɵ','œː','ɘ'], 'ɯ': ['ɯ','ɨ','ʌ','ɯː','ɤ','ə'],
 'b': ['b','b̤','b̥','β','b̞'], 'p': ['p','pʰ','b̥'], 'd': ['d','d̪','d̥','d̚'], 't': ['t','t̪','tʰ','t̪ʰ','t̚'], 'k': ['k','kʰ','k̟ʲ','ɡ','k͡p'], 'ɡ': ['ɡ','g','ɟ','ɡ̤','k','k͡p'],
 'ɣ': ['ɣ','ɡ','ʁ','x','ɰ','g'], 'h': ['h','x','χ','ħ','ɦ','ʔ'], 'f': ['f','ɸ','v'], 'w': ['w','β','ʋ','ɥ'], 'j': ['j','ʝ','ij'],
 'θ': ['θ','s','s̪','ð'], 'ð': ['ð','z','ð̞','θ'], 'ʃ': ['ʃ','ʂ','ɕ','ʃʲ'], 'ʒ': ['ʒ','ʐ','ʑ'],
 'tʃ': ['t͡ʃ','tʃ','t͡ɕ','tɕ','tʂ','ʧ','t͡ʂ','tʃʲ','t͡ʃʲ'], 'dʒ': ['d͡ʒ','dʒ','d͡ʑ','dʑ','d͡ʒ̤','ʤ'],
 'm': ['m','ɱ'], 'n': ['n','n̪','ɳ','ɲ'], 'ŋ': ['ŋ','ɴ','ɲ','n'], 'l': ['l','l̪','ɫ','ʎ'], 'r': ['r','ɾ','ɹ','ɻ','ʀ'],
}
def tokens(ipa):
    out, i = [], 0
    while i < len(ipa):
        if ipa[i:i+2] in ('tʃ', 'dʒ'): out.append(ipa[i:i+2]); i += 2
        else: out.append(ipa[i]); i += 1
    return out
def classes(ipa):
    res = []
    for t in tokens(ipa):
        ids = [ID[a] for a in ALT.get(t, [t]) if a in ID]
        if ids: res.append(np.array(sorted(set(ids))))
    return res
def lprobs(x):
    audio = Audio((x * 32767).astype(np.int16), SR)
    feat = _m.pm.compute(audio)
    feats = np.expand_dims(feat, 0); feat_len = np.array([feat.shape[0]], dtype=np.int32)
    with torch.no_grad():
        out = _m.am(torch.from_numpy(feats), torch.from_numpy(feat_len))
    lp = out[0].detach().numpy().astype(np.float64)
    return lp - np.logaddexp.reduce(lp, axis=1, keepdims=True)
def forced(lp, cls):
    T = lp.shape[0]; L = len(cls)
    if L == 0: return float(lp[:, 0].sum())
    em = np.stack([np.logaddexp.reduce(lp[:, c], axis=1) for c in cls], axis=1)
    blank = lp[:, 0]; S = 2*L + 1; NEG = -1e30
    same = [False] + [np.array_equal(cls[l], cls[l-1]) for l in range(1, L)]
    alpha = np.full((T, S), NEG); alpha[0, 0] = blank[0]; alpha[0, 1] = em[0, 0]
    for t in range(1, T):
        prev = alpha[t-1]
        for s in range(S):
            c = [prev[s]]
            if s > 0: c.append(prev[s-1])
            if s % 2 == 1 and s > 1 and not same[s // 2]: c.append(prev[s-2])
            alpha[t, s] = np.logaddexp.reduce(c) + (blank[t] if s % 2 == 0 else em[t, s // 2])
    return float(np.logaddexp(alpha[T-1, S-1], alpha[T-1, S-2]))
def score(x, text):
    lp = lprobs(np.asarray(x, dtype=np.float32))
    return (float(lp.max(axis=1).sum()) - forced(lp, classes(tk_ipa(text)))) / lp.shape[0]
