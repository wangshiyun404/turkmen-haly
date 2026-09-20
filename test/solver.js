// Runs inside the page. Answers the current question (correctly unless wrong=true).
(wrong) => {
  const H = window.__haly, S = H.S(), Q = H.Q();
  if(!S) return {err:'no session'};
  if(S.phase !== 'quiz') return {phase:S.phase};
  const it = S.queue[S.pos];
  const q = H.ALL.find(l => l.id === it.lid).quiz[it.qi];
  const $ = sel => document.querySelector(sel);
  const click = sel => { const el = $(sel); if(!el) throw new Error('missing '+sel+' in '+it.lid+'#'+it.qi+' '+q.q); el.click(); };
  const name = (H.P().name && H.P().name.trim()) ? H.P().name.trim() : 'Li Hua';
  const info = {lid:it.lid, qi:it.qi, type:q.q};
  if(q.q === 'choice' || q.q === 'dialog' || q.q === 'listen'){
    let idx = H.Q().opts.findIndex(o => o.ok);
    if(wrong) idx = H.Q().opts.findIndex(o => !o.ok);
    click('[data-act=pick][data-i="'+idx+'"]');
  } else if(q.q === 'match'){
    const n = q.pairs.length;
    if(wrong){ click('[data-act=mt][data-side=l][data-i="0"]'); click('[data-act=mt][data-side=r][data-i="1"]'); }
    for(let i=0;i<n;i++){ click('[data-act=mt][data-side=l][data-i="'+i+'"]'); click('[data-act=mt][data-side=r][data-i="'+i+'"]'); }
  } else if(q.q === 'sort'){
    let guard = 0;
    while(H.Q().k < q.items.length && guard++ < 50){
      const b = q.items[H.Q().order[H.Q().k]][1];
      click('[data-act=bin][data-b="'+(wrong && guard===1 ? 1-b : b)+'"]');
    }
  } else if(q.q === 'spell'){
    const letters = wrong ? [...q.a].reverse() : [...q.a];
    for(const ch of letters){
      const QQ = H.Q();
      const i = QQ.tiles.findIndex((t,j) => t === ch && !QQ.seq.includes(j));
      click('[data-act=tile][data-i="'+i+'"]');
    }
    click('[data-act=check]');
  } else if(q.q === 'build'){
    const seq = wrong ? q.a.slice(0,-1).concat([q.blocks.find(b => b !== q.a[q.a.length-1])]) : q.a;
    for(const b of seq) click('[data-act=block][data-i="'+q.blocks.indexOf(b)+'"]');
    click('[data-act=check]');
  } else if(q.q === 'order'){
    let toks = q.w.map(t => t.replace('{NAME}', name));
    if(wrong) toks = toks.slice().reverse();
    for(const t of toks){
      const QQ = H.Q();
      const i = QQ.pool.findIndex((p,j) => p === t && !QQ.seq.includes(j));
      click('[data-act=ord][data-i="'+i+'"]');
    }
    click('[data-act=check]');
  }
  info.state = H.Q().state;
  info.barText = (document.querySelector('.bar') || {}).innerText || '';
  return info;
}
