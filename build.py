"""Assemble src/ into a single self-contained index.html (what GitHub Pages serves)."""
import pathlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / 'src'

shell = (SRC / 'shell.html').read_text(encoding='utf-8')
frag = (shell.replace('/*CSS*/', (SRC / 'style.css').read_text(encoding='utf-8'))
             .replace('/*DATA*/', (SRC / 'data.js').read_text(encoding='utf-8'))
             .replace('/*APP*/', (SRC / 'app.js').read_text(encoding='utf-8')))
head, body = frag.split('<div id="app">', 1)
page = ('<!doctype html>\n<html lang="zh-CN">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + head + '</head>\n<body>\n<div id="app">' + body + '\n</body>\n</html>\n')
(ROOT / 'index.html').write_text(page, encoding='utf-8')
print('index.html', len(page.encode()), 'bytes')
