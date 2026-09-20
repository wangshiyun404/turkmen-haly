"""Automated playthrough: answers every question in all 29 levels (plus some wrong answers),
checks the review basket, audio sprite, layout overflow and dark mode, and saves screenshots to test/shots/.
Run: pip install playwright && python -m playwright install chromium && python3 test/run.py"""
import json, sys, pathlib
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).parent
URL = (ROOT.parent / 'index.html').resolve().as_uri()
SOLVER = (ROOT/'solver.js').read_text()
errors = []
shots = ROOT/'shots'; shots.mkdir(exist_ok=True)
def shot(page, name, full=False):
    page.screenshot(path=str(shots/(name+'.png')), full_page=full)

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width':390,'height':844}, device_scale_factor=2)
    page = ctx.new_page()
    page.on('console', lambda m: errors.append(('console', m.type, m.text)) if m.type == 'error' and 'fonts.g' not in m.text and 'ERR_' not in m.text else None)
    page.on('pageerror', lambda e: errors.append(('pageerror', str(e))))
    page.goto(URL)
    page.wait_for_timeout(600)
    shot(page, '01-home-mobile', full=True)
    print('audio keys:', page.evaluate('() => Object.keys(window.__haly.AUD.map).length'))
    # sprite element loads and can seek
    page.evaluate("() => { const a = window.__haly.AUD.el || (window.__haly.AUD.el = new Audio(window.__haly.AUD.src)); return true; }")
    page.wait_for_function("() => window.__haly.AUD.el && window.__haly.AUD.el.readyState >= 1", timeout=15000)
    print('sprite duration:', page.evaluate('() => Math.round(window.__haly.AUD.el.duration)'), 'failed:', page.evaluate('() => window.__haly.AUD.failed'))
    results = []
    wrong_done = False
    for li in range(29):
        lid = page.evaluate('() => window.__haly.ALL[%d].id' % li)
        page.click('[data-act=home]') if page.query_selector('[data-act=home]') and page.evaluate('() => !!window.__haly.S()') else None
        page.evaluate("id => { const b = document.querySelector('[data-act=open][data-id=\"'+id+'\"]'); if(!b) throw new Error('no gul '+id); if(b.disabled) throw new Error('locked '+id); b.click(); }", lid)
        # learn cards
        n = 0
        while page.query_selector('[data-act=next-card]'):
            txt = page.inner_text('.stage')
            assert len(txt.strip()) > 20, ('empty card', lid, n)
            if lid == '1-1' and n in (1, 2): shot(page, '02-learn-%s-%d' % (lid, n))
            if lid in ('3-1','5-2') and n == 1: shot(page, '03-learn-table-%s' % lid, full=True)
            if lid == '6-2' and n == 1: shot(page, '03-learn-dialog-6-2', full=True)
            page.click('[data-act=next-card]'); n += 1
        page.click('[data-act=start-quiz]')
        guard = 0
        while page.evaluate('() => window.__haly.S().phase') == 'quiz' and guard < 80:
            guard += 1
            wrong = (lid in ('1-2','3-1','4-4') and guard == 1) or (lid == '2-2' and guard in (6,))
            info = page.evaluate(SOLVER, wrong)
            if info.get('state') not in ('ok','bad'):
                errors.append(('nostate', info))
            if (not wrong) and info.get('state') != 'ok':
                errors.append(('expected ok', info))
            if wrong and info.get('state') != 'bad':
                errors.append(('expected bad', info))
            if info.get('type') == 'listen' and not any(r == (lid,'listen') for r in results):
                pass
            key = (lid, info.get('type'))
            if key in {('1-1','choice'),('1-1','sort'),('1-2','spell'),('2-2','build'),('4-4','order'),('6-2','dialog'),('3-1','build'),('1-1','match'),('1-1','listen'),('6-4','listen')} and not any(r == key for r in results):
                results.append(key)
                shot(page, '04-q-%s-%s-%s' % (lid, info.get('type'), 'bad' if wrong else 'ok'), full=True)
            page.click('[data-act=continue]')
        assert page.evaluate('() => window.__haly.S().phase') == 'result', ('no result', lid)
        if lid in ('1-1','1-6','6-6'): shot(page, '05-result-%s' % lid, full=True)
        stars = page.evaluate("id => window.__haly.P().stars[id]", lid)
        print(lid, 'stars', stars, 'learn cards', n+1)
        page.click('[data-act=home]')
        if lid == '1-3': shot(page, '06-home-progress-mobile', full=True)
    # audio state machine: play a key, confirm it stops inside its segment
    st = page.evaluate('''async () => { const H = window.__haly; const seg = H.AUD.map['salam']; H.playKey('salam'); await new Promise(r => setTimeout(r, 400)); const a = H.AUD.el; const mid = {paused:a.paused, t:a.currentTime, end:H.AUD.end}; await new Promise(r => setTimeout(r, (seg[1]*1000)+900)); return {seg, mid, after:{paused:a.paused, t:a.currentTime, end:H.AUD.end}}; }''')
    print('playback check:', st)
    print('review basket:', page.evaluate('() => window.__haly.P().review'))
    # review session
    page.click('[data-act=review]')
    g = 0
    while page.evaluate('() => window.__haly.S() && window.__haly.S().phase') == 'quiz' and g < 30:
        g += 1
        info = page.evaluate(SOLVER, False)
        if g == 1: shot(page, '07-review-q', full=True)
        page.click('[data-act=continue]')
    shot(page, '07-review-result')
    print('review after:', page.evaluate('() => window.__haly.P().review'))
    page.click('[data-act=home]')
    page.click('[data-act=go-abc]'); page.wait_for_timeout(200); shot(page, '08-abc', full=True)
    page.click('[data-act=letter][data-k="s"]'); shot(page, '09-letter-modal')
    page.click('[data-act=close]')
    page.click('[data-act=home]'); page.click('[data-act=go-words]'); shot(page, '10-words', full=False)
    page.fill('#wq', 'suw'); shot(page, '10-words-search')
    page.click('[data-act=home]'); page.click('[data-act=settings]'); shot(page, '11-settings')
    page.fill('#set-name', 'Aprel'); page.click('[data-act=close]')
    # desktop
    page.set_viewport_size({'width':1280,'height':900})
    shot(page, '12-home-desktop-done', full=True)
    # overflow check
    ow = page.evaluate('() => document.documentElement.scrollWidth - document.documentElement.clientWidth')
    print('desktop horizontal overflow px:', ow)
    page.set_viewport_size({'width':390,'height':844})
    ow = page.evaluate('() => document.documentElement.scrollWidth - document.documentElement.clientWidth')
    print('mobile horizontal overflow px:', ow)
    # dark mode check
    ctx2 = b.new_context(viewport={'width':1280,'height':900}, color_scheme='dark')
    p2 = ctx2.new_page(); p2.on('pageerror', lambda e: errors.append(('pageerror-dark', str(e))))
    p2.goto(URL); p2.wait_for_timeout(500); shot(p2, '13-home-desktop-dark-fresh', full=True)
    p2.click('[data-act=open][data-id="1-1"]'); p2.click('[data-act=next-card]'); p2.click('[data-act=next-card]'); shot(p2, '14-letter-dark')
    b.close()
print('ERRORS:', json.dumps(errors, ensure_ascii=False, indent=1)[:4000])
