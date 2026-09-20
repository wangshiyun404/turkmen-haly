"""Assemble src/ (+ audio/map.json) into a single self-contained index.html.
GitHub Pages serves index.html next to audio/tk.mp3, the pronunciation sprite."""
import json, pathlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / 'src'
read = lambda p: p.read_text(encoding='utf-8')

audio_js = ''
if (ROOT / 'audio' / 'map.json').exists():
    amap = json.loads(read(ROOT / 'audio' / 'map.json'))
    audio_js = 'const AUDIO_MAP = ' + json.dumps(amap, ensure_ascii=False, separators=(',', ':')) + ";\nconst AUDIO_SRC = 'audio/tk.mp3';"
frag = (read(SRC / 'shell.html').replace('/*CSS*/', read(SRC / 'style.css')).replace('/*AKEY*/', read(SRC / 'akey.js'))
        .replace('/*DATA*/', read(SRC / 'data.js')).replace('/*AUDIO*/', audio_js).replace('/*APP*/', read(SRC / 'app.js')))
head, body = frag.split('<div id="app">', 1)
page = ('<!doctype html>\n<html lang="zh-CN">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + head + '</head>\n<body>\n<div id="app">' + body + '\n</body>\n</html>\n')
(ROOT / 'index.html').write_text(page, encoding='utf-8')
print('index.html', len(page.encode()), 'bytes; audio map', 'yes' if audio_js else 'no')
