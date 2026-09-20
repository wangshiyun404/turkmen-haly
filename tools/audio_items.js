// Walks src/data.js and lists every Turkmen string that gets a clip in the audio sprite.
// Usage: node tools/audio_items.js > audio/items.json
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const src = fs.existsSync(path.join(root, 'src')) ? path.join(root, 'src') : root;
global.window = {};
eval(fs.readFileSync(path.join(src, 'akey.js'), 'utf8') + '\nglobal.akey = akey; global.asynth = asynth; global.LETTER_NAME = LETTER_NAME;');
eval(fs.readFileSync(path.join(src, 'data.js'), 'utf8') + '\nglobal.LETTERS = LETTERS; global.LAYERS = LAYERS; global.PROVERB = PROVERB;');

const items = new Map(); // key -> {key, text, kind, where}
function add(s, kind, where){
  if(s == null) return;
  if(String(s).includes('[')) return;            // items carrying IPA (long/short pairs) get no clip
  const key = akey(s);
  if(!key) return;
  if(!items.has(key)) items.set(key, {key, text: asynth(key), kind: kind || (key.includes(' ') ? 'phrase' : 'word'), where});
}
function braces(s, where){ if(!s) return; for(const m of String(s).matchAll(/\{([^{}]+)\}/g)) if(m[1] !== 'NAME') add(m[1], null, where); }

for(const L of LETTERS){ add(L.l, 'letter', 'letters'); add(L.w[0], 'word', 'letters'); braces(L.tip, 'letters'); }
for(const La of LAYERS){
  add(La.tkname, 'phrase', 'layer');
  for(const lv of La.levels){
    const w = lv.id;
    lv.words.forEach(x => add(x[0], null, w));
    for(const c of lv.learn){
      braces(c.h, w); braces(c.b, w);
      if(c.items) c.items.forEach(it => { if(Array.isArray(it[0])){ it[0].forEach(ch => add(ch, 'letter', w)); add(it[1], null, w); } else { add(it[0], null, w); braces(it[1], w); } });
      if(c.rows) c.rows.forEach(r => r.slice(1).forEach(v => add(v, null, w)));
      if(c.lines) c.lines.forEach(l => add(l[1], null, w));
      if(c.parts) c.parts.forEach(p => add(p[0], null, w));
      if(c.result) add(c.result, null, w);
      if(c.letters) c.letters.forEach(k => add(k, 'letter', w));
    }
    for(const q of lv.quiz){
      braces(q.p, w); braces(q.x, w);
      if(q.o){ if(q.tk) add(q.o[0], null, w); else braces(q.o[0], w); }
      if(q.line) add(q.line, null, w);
      if(q.key) add(q.key, null, w);
      if(q.w) add(q.w.join(' ') + (q.end || ''), null, w);
      if(q.root){ add(q.root, null, w); q.forms.forEach(f => add(f, null, w)); }
      if(typeof q.a === 'string') add(q.a, null, w);
      if(q.items && q.tk) q.items.forEach(it => add(it[0], null, w));
      if(q.pairs) q.pairs.forEach(p => add(p[0], null, w));
    }
  }
}
['Dogry!', 'Örän gowy!', 'Berekella!', PROVERB.tk].forEach(s => add(s, null, 'misc'));

const out = [...items.values()];
process.stdout.write(JSON.stringify(out, null, 0));
process.stderr.write(`${out.length} items: ${out.filter(i=>i.kind==='letter').length} letters, ${out.filter(i=>i.kind==='word').length} words, ${out.filter(i=>i.kind==='phrase').length} phrases\n`);
