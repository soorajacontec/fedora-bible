#!/usr/bin/env python3
"""Make a single self-contained HTML file (all scripts + favicon inlined).

Usage:  python3 tools/build_single.py [out.html]     # default: dist/fedora-bible.html
Handy for sharing one file or opening without a web server (no offline/PWA install).
"""
import base64, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'dist', 'fedora-bible.html')
h = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
for f in ['data.js', 'cmdref.js', 'app.js']:
    js = open(os.path.join(ROOT, f), encoding='utf-8').read().replace('</script', '<\\/script')
    h = h.replace(f'<script src="{f}"></script>', f'<script>\n{js}\n</script>')
svg = base64.b64encode(open(os.path.join(ROOT, 'icons', 'icon.svg'), 'rb').read()).decode()
h = h.replace('href="icons/icon.svg"', f'href="data:image/svg+xml;base64,{svg}"')
os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
open(out, 'w', encoding='utf-8').write(h)
print('wrote', out, f'{len(h)//1024} KB')
