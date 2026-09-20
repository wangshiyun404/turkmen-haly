/* Shared between the game and the audio generator: turns any Turkmen string
   (with {braces}, [ipa], {NAME}, punctuation, Chinese glosses) into the key used
   to look up its clip in the audio sprite. */
function akey(s){
  if(s == null) return '';
  let t = String(s);
  t = t.replace(/\{NAME\}/g, ' ');
  t = t.replace(/\[[^\]]*\]/g, ' ');
  t = t.replace(/[{}]/g, '');
  t = t.toLowerCase();
  t = t.replace(/[^a-zäçňöşüýž'\- ]+/g, ' ');
  t = t.replace(/\s+/g, ' ').trim();
  t = t.split(' ').map(w => w.replace(/^-+|-+$/g, '')).filter(Boolean).join(' ');
  return t;
}
const LETTER_NAME = {a:'a',e:'e',ä:'ä',i:'i',y:'y',o:'o',ö:'ö',u:'u',ü:'ü',
  b:'be',ç:'çe',d:'de',f:'fe',g:'ge',h:'he',j:'je',ž:'že',k:'ke',l:'le',m:'me',n:'ne',ň:'eň',p:'pe',r:'re',s:'se',ş:'şe',t:'te',w:'we',ý:'ýe',z:'ze'};
/* text actually sent to the synthesizer for a key */
function asynth(key){
  if(key.length === 1 && LETTER_NAME[key]) return LETTER_NAME[key] + ' ' + LETTER_NAME[key];
  return key.replace(/-/g, '');
}
