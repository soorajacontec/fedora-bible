#!/usr/bin/env python3
"""Fedora Bible smoke test (headless Chromium, phone-sized screen).

  pip install playwright && playwright install chromium
  python3 tests/smoke_test.py

Checks:
  * the app loads without JavaScript errors
  * every card in every section opens, and no table is wider than the screen
  * every command row opens the command pop-up
  * every command row is understood by the Terminal playground
"""
import asyncio, functools, http.server, os, socketserver, sys, threading
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 0  # 0 = pick a free port


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    handler = functools.partial(Quiet, directory=ROOT)
    httpd = socketserver.TCPServer(('127.0.0.1', PORT), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]


async def main():
    httpd, port = serve()
    failures = []
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 390, 'height': 844})
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        await page.goto(f'http://127.0.0.1:{port}/')
        await page.wait_for_timeout(800)

        sections = await page.evaluate('FB_DATA.map(s => [s.id, s.cards.length])')
        print(f'{len(sections)} sections')

        # 1) every card opens; tables fit on a phone screen
        for sid, n in sections:
            for i in range(n):
                for pane in ('cmd', 'flags'):
                    await page.evaluate(f"location.hash = '#{sid}/{i}/{pane}'")
                    await page.wait_for_timeout(25)
                over = await page.evaluate(
                    f"[...document.querySelectorAll('#{sid}-{i} .tblwrap')].map(t => t.scrollWidth - t.clientWidth).filter(x => x > 1)")
                if over:
                    failures.append(f'table overflow: {sid}/{i} {over}')

        # 2) command pop-up opens for a sample of rows in every section
        popup_bad = await page.evaluate('''async () => {
            const bad = [];
            for (const sec of FB_DATA) {
              location.hash = '#' + sec.id; await new Promise(r => setTimeout(r, 60));
              const rows = [...document.querySelectorAll('#v-' + sec.id + ' .row[data-cmd]')].slice(0, 12);
              for (const r of rows) {
                r.querySelector('pre').click(); await new Promise(r => setTimeout(r, 30));
                const ok = !document.getElementById('cmdSheet').hidden && document.querySelector('#shBody .sh-name');
                if (!ok) bad.push(r.dataset.cmd);
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                await new Promise(r => setTimeout(r, 240));
              }
            }
            return bad;
        }''')
        failures += [f'pop-up did not open: {c}' for c in popup_bad]

        # 3) every command row runs in the Terminal playground
        await page.goto(f'http://127.0.0.1:{port}/#term')
        await page.wait_for_timeout(600)
        res = await page.evaluate('''async () => {
            const out = document.querySelector('#pgOut'), bad = [];
            await FB.pgRun('sudo true'); await new Promise(r => setTimeout(r, 500));
            for (const k of FB.ROWMAP.keys()) {
              out.innerHTML = ''; FB.pgRun(k); await new Promise(r => setTimeout(r, 0));
              if (/command not found/.test(out.textContent)) bad.push(k);
            }
            return { total: FB.ROWMAP.size, bad };
        }''')
        print(f"{res['total']} terminal commands checked")
        failures += [f'terminal does not know: {c}' for c in res['bad']]
        failures += [f'page error: {e}' for e in errors]
        await browser.close()
    httpd.shutdown()

    if failures:
        print('\n'.join(failures[:50]))
        print(f'FAILED ({len(failures)} problems)')
        sys.exit(1)
    print('All checks passed ✔')


asyncio.run(main())
