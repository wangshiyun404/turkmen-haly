"""Turkmen spelling -> IPA (phonemic; the orthography is nearly one-to-one)."""
import re
TK = {'a':'a','ä':'æ','b':'b','ç':'tʃ','d':'d','e':'e','f':'f','g':'ɡ','h':'h','i':'i','j':'dʒ','ž':'ʒ','k':'k','l':'l','m':'m','n':'n','ň':'ŋ','o':'o','ö':'ø','p':'p','r':'r','s':'θ','ş':'ʃ','t':'t','u':'u','ü':'y','w':'w','y':'ɯ','ý':'j','z':'ð'}
VOW = set('aäeioöuüy')
def tk_ipa(text):
    w = re.sub(r"[^a-zäçňöşüýž ]", '', text.lower().replace('’', "'")); out = []
    for i, ch in enumerate(w):
        if ch == ' ': continue
        p = TK.get(ch)
        if p is None: continue
        if ch == 'g' and i > 0 and w[i-1] in VOW: p = 'ɣ'     # g after a vowel is the fricative [ɣ]
        out.append(p)
    return ''.join(out)
