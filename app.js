/* Fedora Bible — app logic */
(() => {
'use strict';
const DATA = window.FB_DATA || [];
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem('fb-' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('fb-' + k, JSON.stringify(v)); } catch {} }
};
const USER = 'user', HOST = 'fedora';
const PROMPT = `[${USER}@${HOST} ~]$ `;

/* ═════════ ICONS ═════════ */
const I = {
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',
  chev:'<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 001.5.87l12-7.5a1 1 0 000-1.74l-12-7.5A1 1 0 007 4.5z"/></svg>',
  pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4.5" height="16" rx="1.2"/><rect x="13.5" y="4" width="4.5" height="16" rx="1.2"/></svg>',
  replay:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 12a9 9 0 109-9 9.5 9.5 0 00-6.5 2.7L3 8"/><path d="M3 3v5h5"/></svg>',
  term:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17l6-5-6-5M12 19h8"/></svg>',
  send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  sun:'<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:'<path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"/>'
};

/* ═════════ SYNTAX HIGHLIGHT ═════════ */
function hlShell(s) {
  if (/^\s*#/.test(s)) return `<span class="t-com">${esc(s)}</span>`;
  const re = /(\s+)|('[^']*'?|"(?:[^"\\]|\\.)*"?)|(\|\||&&|[|;<>]+&?\d?|&>|&)|([^\s'"|;&<>]+)/g;
  let out = '', m, expectCmd = true;
  while ((m = re.exec(s))) {
    const [tok, ws, str, op, word] = m;
    if (ws) { out += ws; continue; }
    if (str) { out += `<span class="t-str">${esc(str)}</span>`; continue; }
    if (op) { out += `<span class="t-op">${esc(op)}</span>`; if (/[|;&]/.test(op)) expectCmd = true; continue; }
    if (word.startsWith('#')) {
      const end = s.indexOf('\n', m.index), stop = end === -1 ? s.length : end;
      out += `<span class="t-com">${esc(s.slice(m.index, stop))}</span>`;
      re.lastIndex = stop; if (end === -1) break; continue;
    }
    let cls = '';
    if (expectCmd && !word.startsWith('-') && !/^\w+=/.test(word)) {
      cls = 't-cmd'; expectCmd = ['sudo','time','nohup','nice','env','exec','xargs','watch'].includes(word);
    } else if (word.startsWith('-')) cls = 't-flag';
    else if (/^(\/|~|\.{1,2}\/)/.test(word)) cls = 't-path';
    else if (word.includes('$')) cls = 't-var';
    out += cls ? `<span class="${cls}">${esc(tok)}</span>` : esc(tok);
  }
  return out;
}
function hlCode(block) {
  return block.split('\n').map(l => {
    if (/^\s*#/.test(l)) return `<span class="t-com">${esc(l)}</span>`;
    if (/^\s*\[[^\]]+\]\s*$/.test(l)) return `<span class="t-sec">${esc(l)}</span>`;
    const kv = l.match(/^(\s*)([A-Za-z][\w.]*)(=)(.*)$/);
    if (kv && !/\s/.test(kv[2])) return `${kv[1]}<span class="t-key">${esc(kv[2])}</span>${kv[3]}<span class="t-str">${esc(kv[4])}</span>`;
    const conf = l.match(/^(\s*)([A-Z][A-Za-z]+)(\s+)(.*)$/); // sshd / ssh_config style
    if (conf) return `${conf[1]}<span class="t-key">${esc(conf[2])}</span>${conf[3]}<span class="t-str">${esc(conf[4])}</span>`;
    return hlShell(l);
  }).join('\n');
}

/* ═════════ INDEX / STATS ═════════ */
const EXAMPLES = [];            // {cmd, out, sec, card}
const cmdName = c => { const w = c.trim().split(/\s+/); let i = 0; while (w[i] === 'sudo') i++; return (w[i] || '').replace(/[^\w.+-]/g, ''); };
let nCmds = 0, nFlags = 0;
DATA.forEach(sec => sec.cards.forEach((c, i) => {
  nCmds += (c.cmds || []).filter(r => !r[0].startsWith('#')).length;
  nFlags += (c.flags || []).length;
  if (c.example) EXAMPLES.push({ ...c.example, sec: sec.id, card: i, title: c.title });
}));

/* ═════════ TOAST / COPY ═════════ */
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800); }
async function copy(text, btn) {
  try { await navigator.clipboard.writeText(text); }
  catch { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = 0; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch {} ta.remove(); }
  if (btn) {
    const old = btn.innerHTML; btn.classList.add('ok');
    btn.innerHTML = btn.classList.contains('cp') ? I.check : '✓ COPIED';
    setTimeout(() => { btn.innerHTML = old; btn.classList.remove('ok'); }, 1400);
  }
  toast('Copied to clipboard');
}

/* ═════════ RENDER ═════════ */
function renderTabs() {
  const tabs = [{ id:'home', icon:'🏠', title:'Home' }, ...DATA, { id:'term', icon:'💻', title:'Terminal' }];
  $('#tabs').innerHTML = tabs.map(t => `<button class="tab" data-go="${t.id}">${t.icon} ${esc(t.title)}</button>`).join('');
}

function renderHome() {
  const tiles = DATA.map(s => `<button class="tile" data-go="${s.id}"><span class="n">${s.cards.length}</span><span class="ti">${s.icon}</span><b>${esc(s.title)}</b><small>${esc(s.sub)}</small></button>`).join('');
  $('#v-home').innerHTML = `
    <div class="hero">
      <h2>The <span>Fedora Linux</span> pocket bible</h2>
      <p>Commands, every useful option and flag, and a live terminal example for each topic. Installable, works offline, updated for Fedora 44 and DNF5.</p>
      <div class="stats">
        <div class="stat"><b>${nCmds}</b><span>Commands</span></div>
        <div class="stat"><b>${nFlags}</b><span>Flags</span></div>
        <div class="stat"><b>${EXAMPLES.length}</b><span>Live demos</span></div>
        <div class="stat"><b>${DATA.length}</b><span>Sections</span></div>
      </div>
      <div class="hero-cta">
        <button class="btn pri" data-go="term">${I.term} Open terminal</button>
        <button class="btn" id="heroMusic">🎧 Ambient music</button>
      </div>
    </div>
    <div class="home-h">// sections</div>
    <div class="grid">${tiles}<button class="tile" data-go="term"><span class="ti">💻</span><b>Terminal</b><small>Try any example</small></button></div>
    <footer><span class="credit">Created by <b>SSK-BLUM</b></span><br>Simulated output — nothing runs on your device.<br>Fedora® is a trademark of Red Hat, Inc. This is an unofficial reference.</footer>`;
  $('#heroMusic').onclick = () => Music.toggle();
}

function renderSection(sec) {
  const v = document.createElement('section');
  v.className = 'view'; v.id = 'v-' + sec.id;
  v.innerHTML = `<div class="sec-head"><h2>${sec.icon} ${esc(sec.title)}</h2><p>${esc(sec.desc)}</p></div>
    <div class="sec-tools"><button class="chip" data-expand="1">Expand all</button><button class="chip" data-expand="0">Collapse all</button></div>
    ${sec.cards.map((c, i) => renderCard(sec, c, i)).join('')}`;
  $('#main').appendChild(v);
}

function renderCard(sec, c, i) {
  const id = `${sec.id}-${i}`;
  const panes = [];
  // Commands pane
  let cmdHtml = c.desc ? `<p class="desc">${c.desc}</p>` : '';
  if (c.table && c.tableFirst) cmdHtml += `<div class="tblwrap"><table class="ftable ref${c.table.mono ? ' mono' : ''}"><tr>${c.table.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr>${c.table.rows.map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table></div>`;
  if (c.code) cmdHtml += `<div class="codebox"><div class="cmds-top"><span>config / script</span><button class="mini" data-copy-code>COPY</button></div><pre>${hlCode(c.code)}</pre></div>`;
  if (c.cmds) {
    const rows = c.cmds.map(([cmd, com]) => {
      if (cmd.startsWith('#') && !com) return `<div class="row hd"><div class="l"><pre>${esc(cmd.replace(/^#\s*/, ''))}</pre></div></div>`;
      return `<div class="row" data-cmd="${esc(cmd)}" data-desc="${esc(com || '')}" role="button" tabindex="0" aria-label="Details for ${esc(cmd)}"><div class="l"><pre>${hlShell(cmd)}</pre>${com ? `<div class="c">${esc(com)}</div>` : ''}</div><button class="cp" data-copy="${esc(cmd)}" aria-label="Copy command">${I.copy}</button></div>`;
    }).join('');
    const all = c.cmds.filter(r => !(r[0].startsWith('#') && !r[1])).map(r => r[0]).join('\n');
    cmdHtml += `<div class="cmds"><div class="cmds-top"><span>commands <em class="tap-hint">· tap one for options</em></span><button class="mini" data-copy="${esc(all)}">COPY ALL</button></div>${rows}</div>`;
  }
  if (c.table && !c.tableFirst) cmdHtml += `<div class="tblwrap"><table class="ftable ref${c.table.mono ? ' mono' : ''}"><tr>${c.table.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr>${c.table.rows.map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table></div>`;
  if (cmdHtml) panes.push({ key:'cmd', label:'Commands', cnt:(c.cmds || []).filter(r => !r[0].startsWith('#')).length || '', html:cmdHtml });
  if (c.flags) panes.push({ key:'flags', label:c.flagsLabel || 'Options & Flags', cnt:c.flags.length, html:
    `<div class="tblwrap"><table class="ftable"><tr><th>${esc((c.flagsHead || ['Option'])[0])}</th><th>${esc((c.flagsHead || [0,'What it does'])[1])}</th></tr>${c.flags.map(([f, d]) => `<tr><td>${esc(f).replace(/-/g, '\u2011')}</td><td>${esc(d)}</td></tr>`).join('')}</table></div>` });
  if (c.example) panes.push({ key:'live', label:'<span class="live-dot"></span> Live', cnt:'', html:
    `<div class="term" data-term><div class="term-bar"><i></i><i></i><i></i><span>${USER}@${HOST}: ~</span></div><div class="term-body"><span class="ps">${esc(PROMPT)}</span><span class="cursor"></span></div></div>
     <div class="term-actions">
       <button class="btn pri" data-run>${I.play} Run</button>
       <button class="btn" data-copy="${esc(c.example.cmd)}">${I.copy} Copy</button>
       <button class="btn" data-try="${esc(c.example.cmd)}">${I.term} Try in terminal</button>
     </div><p class="sim">// simulated output from a Fedora 44 system</p>` });

  const seg = panes.length > 1 ? `<div class="seg" role="tablist">${panes.map((p, k) =>
      `<button role="tab" data-pane="${p.key}" class="${k ? '' : 'active'}">${p.label}${p.cnt ? ` <span class="cnt">${p.cnt}</span>` : ''}</button>`).join('')}</div>` : '';
  const notes = [['tip','Tip'],['warn','Warning'],['danger','Danger']].filter(([k]) => c[k])
      .map(([k, l]) => `<div class="note ${k}"><span class="nt">${l}</span>${c[k]}</div>`).join('');
  const sub = [c.cmds && `${c.cmds.filter(r => !r[0].startsWith('#')).length} cmds`, c.flags && `${c.flags.length} ${c.flagsLabel ? 'checks' : 'flags'}`, c.example && 'live'].filter(Boolean).join(' · ');

  return `<article class="card" id="${id}" data-sec="${sec.id}" data-i="${i}">
    <button class="card-h" aria-expanded="false"><span class="ci">${c.icon}</span><span class="ct"><b>${esc(c.title)}</b><small>${sub}</small></span><span class="badge b-${c.color || 'blue'}">${esc(c.badge)}</span>${I.chev}</button>
    <div class="card-b">${seg}${panes.map((p, k) => `<div class="pane ${k ? '' : 'active'}" data-p="${p.key}">${p.html}</div>`).join('')}${notes}</div>
  </article>`;
}

/* ═════════ LIVE TERMINAL ANIMATION ═════════ */
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function playExample(termEl, ex) {
  const token = Symbol(); termEl._tok = token;
  const body = $('.term-body', termEl);
  body.innerHTML = `<span class="ps">${esc(PROMPT)}</span><span class="typed"></span><span class="cursor"></span>`;
  const typed = $('.typed', body);
  const step = Math.max(8, Math.min(38, 1100 / ex.cmd.length));
  for (let k = 1; k <= ex.cmd.length; k++) {
    if (termEl._tok !== token) return;
    typed.innerHTML = hlShell(ex.cmd.slice(0, k));
    if (Music.on && k % 2) Music.tick();
    await sleep(step * (0.6 + Math.random() * 0.8));
  }
  await sleep(260);
  if (termEl._tok !== token) return;
  $('.cursor', body).remove();
  body.insertAdjacentHTML('beforeend', '\n');
  const lines = ex.out.split('\n');
  const out = document.createElement('span'); out.className = 'o'; body.appendChild(out);
  for (const ln of lines) {
    if (termEl._tok !== token) return;
    out.insertAdjacentText('beforeend', ln + '\n');
    body.scrollTop = body.scrollHeight;
    await sleep(lines.length > 6 ? 45 : 90);
  }
  body.insertAdjacentHTML('beforeend', `<span class="ps">${esc(PROMPT)}</span><span class="cursor"></span>`);
  body.scrollTop = body.scrollHeight;
}

/* ═════════ PLAYGROUND ═════════ */
const PG = { hist: [], hi: 0, sudoAsked: false };
const norm = s => s.trim().replace(/\s+/g, ' ');
const EXMAP = new Map(EXAMPLES.map(e => [norm(e.cmd), e]));
Object.entries(window.FB_EXTRA_OUT || {}).forEach(([k, out]) => { if (!EXMAP.has(norm(k))) EXMAP.set(norm(k), { cmd:k, out }); });
// every command row of every card → runnable in the playground
const ROWMAP = new Map();
DATA.forEach(sec => sec.cards.forEach((c, i) => (c.cmds || []).forEach(([cmd, com]) => {
  if (cmd.startsWith('#')) return;
  const k = norm(cmd); if (!ROWMAP.has(k)) ROWMAP.set(k, { cmd, com, sec, i, title: c.title, card: c });
})));
const PG_BUILTINS = ['help','clear','examples','sections','commands','search','history','whoami','pwd','cd','date','echo','exit','fastfetch','neofetch'];
const COMPLETE = [...new Set([...PG_BUILTINS, ...EXMAP.keys(), ...ROWMAP.keys()])].sort((a, b) => a.length - b.length);
const BUILTIN_HELP =
`Fedora Bible simulated shell — ${ROWMAP.size} section commands · ${EXAMPLES.length} live examples.
  sections            list every section
  commands <section>  list a section's commands (tap one to run it)
  search <text>       find commands anywhere in the guide
  examples            list every live example
  man <cmd>           syntax, options & examples for a command
  clear · history     clear screen (Ctrl+L) · previous commands
Any command from any section can be typed or tapped. Tab completes.
Try: commands network · dnf info htop · systemctl status sshd`;

function renderTerm() {
  const picks = ['fastfetch','dnf info htop','timedatectl','ip -br addr','sestatus','systemctl status sshd','zramctl','git branch -a','lsblk -f','sudo firewall-cmd --list-all','podman ps','man ssh','examples'];
  $('#v-term').innerHTML = `
    <div class="sec-head"><h2>💻 Terminal</h2><p>interactive playground — run any command from any section</p></div>
    <div class="term pg"><div class="term-bar"><i></i><i></i><i></i><span>${USER}@${HOST}: ~ — bash</span></div>
      <div class="term-body" id="pgOut"></div>
      <form class="pg-input" id="pgForm" autocomplete="off"><label for="pgIn">$</label>
        <input id="pgIn" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="type a command…">
        <button type="button" aria-label="Run">${I.send}</button></form>
    </div>
    <div class="sugs">${picks.map(p => `<button class="chip" data-pg="${esc(p)}">${esc(p)}</button>`).join('')}</div>
    <p class="sim">// simulated shell — responses come from this guide; nothing runs on your device.</p>
    <div class="pg-browse">
      <div class="pg-bh"><b>Section commands</b><span class="sh-n">${ROWMAP.size}</span></div>
      <div class="sugs pg-secs" role="tablist">${DATA.map(sec => `<button class="chip" data-pgsec="${sec.id}" role="tab">${sec.icon} ${esc(sec.title)}</button>`).join('')}</div>
      <div class="pg-find"><input id="pgFilter" type="search" placeholder="filter commands in all sections…" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Filter section commands"></div>
      <div id="pgList"></div>
    </div>`;
  const out = $('#pgOut');
  out.innerHTML = `<span class="dimo">Fedora Linux 44 (Workstation Edition) · Kernel 6.19.8-200.fc44.x86_64\nType <span class="ps2">help</span> to get started · <span class="ps2">sections</span> · <span class="ps2">commands &lt;section&gt;</span>\nEvery command in this guide works here — or pick one from the list below.\n\n</span>`;
  let ft; $('#pgFilter').addEventListener('input', e => { clearTimeout(ft); ft = setTimeout(() => pgList(null, e.target.value), 120); });
  pgList(DATA[0].id);
  // run without relying on form submit (blocked in sandboxed previews / some webviews)
  const submit = () => { const i = $('#pgIn'); const v = i.value; i.value = ''; pgRun(v).catch(err => pgPrint(`<span class="err">${esc(String(err))}</span>\n`)); };
  $('#pgForm').addEventListener('submit', e => e.preventDefault());
  $('#pgForm button').addEventListener('click', e => { e.preventDefault(); submit(); $('#pgIn').focus(); });
  $('#pgIn').addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.keyCode === 13) && !e.isComposing) { e.preventDefault(); submit(); }
    else if (e.key === 'ArrowUp' && PG.hist.length) { PG.hi = Math.max(0, PG.hi - 1); e.target.value = PG.hist[PG.hi]; e.preventDefault(); }
    else if (e.key === 'ArrowDown') { PG.hi = Math.min(PG.hist.length, PG.hi + 1); e.target.value = PG.hist[PG.hi] || ''; e.preventDefault(); }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); out.innerHTML = ''; }
    else if (e.key === 'Tab') { e.preventDefault(); const v = e.target.value; const m = COMPLETE.find(k => k.startsWith(v) && k !== v); if (v && m) e.target.value = m; }
  });
}

// section command browser under the terminal
let pgSecCur = null;
function pgList(secId, filter) {
  const box = $('#pgList'); if (!box) return;
  const f = (filter || '').trim().toLowerCase();
  if (secId) pgSecCur = secId;
  $$('.pg-secs .chip').forEach(b => { const on = !f && b.dataset.pgsec === pgSecCur; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); if (on) b.parentElement.scrollLeft = b.offsetLeft - b.parentElement.offsetLeft - 16; });
  const row = r => `<button class="pgc" data-pg="${esc(r[0])}"><code>${hlShell(r[0])}</code>${r[1] ? `<small>${esc(r[1])}</small>` : ''}</button>`;
  if (f) {
    const hits = [];
    ROWMAP.forEach(v => { if (hits.length < 80 && (v.cmd.toLowerCase().includes(f) || (v.com || '').toLowerCase().includes(f))) hits.push(v); });
    box.innerHTML = hits.length ? `<p class="pg-cnt">${hits.length}${hits.length === 80 ? '+' : ''} matching commands</p>` + hits.map(v => row([v.cmd, `${v.sec.icon} ${v.title}${v.com ? ' — ' + v.com : ''}`])).join('')
      : `<p class="pg-cnt">No command matches “${esc(f)}”.</p>`;
    return;
  }
  const sec = DATA.find(x => x.id === pgSecCur) || DATA[0];
  box.innerHTML = sec.cards.map((c, k) => {
    const rows = (c.cmds || []).filter(r => !r[0].startsWith('#'));
    if (!rows.length) return '';
    return `<details class="pg-card"${k ? '' : ' open'}><summary><span>${c.icon}</span><b>${esc(c.title)}</b><span class="sh-n">${rows.length}</span></summary>${rows.map(row).join('')}</details>`;
  }).join('');
}
const pgLink = cmd => `<button class="pgl" data-pg="${esc(cmd)}">${hlShell(cmd)}</button>`;
function findSection(q) {
  q = (q || '').toLowerCase().trim(); if (!q) return null;
  return DATA.find(s => s.id === q) || DATA.find(s => s.title.toLowerCase() === q) || DATA.find(s => s.id.startsWith(q) || s.title.toLowerCase().startsWith(q))
    || DATA.find(s => s.title.toLowerCase().includes(q) || (s.sub || '').toLowerCase().includes(q));
}
// explain a command line: which options it uses (from the command reference)
function pgExplain(line, base) {
  const ref = REF[base]; if (!ref) return '';
  const hits = matchOptions(line, base, ref).slice(0, 6);
  return hits.map(({ o }) => `  <span class="t-flag">${esc(o[0].length > 22 ? o[0].slice(0, 21) + '…' : o[0].padEnd(22))}</span> <span class="o">${esc(o[1])}</span>`).join('\n') + (hits.length ? '\n' : '');
}

function manFor(name) {
  const hits = [];
  DATA.forEach(sec => sec.cards.forEach(c => {
    if ((c.cmds || []).some(r => cmdName(r[0]) === name) || (c.example && cmdName(c.example.cmd) === name)) hits.push(c);
  }));
  return hits;
}

/* ═════════ COMMAND DETAIL POP-UP ═════════ */
const REF = window.FB_CMDREF || {};
const WRAPPERS = ['time','nohup','env','exec','nice','ionice','command','builtin','watch'];
// base command of a line: skips sudo (and its own options), env assignments, wrappers
function baseCmd(line) {
  const w = line.trim().split(/\s+/); let i = 0;
  for (;;) {
    const x = w[i]; if (x === undefined) break;
    if (x === 'sudo') { i++; while (w[i] && w[i].startsWith('-')) { if (['-u','-g','-C','-D','-h','-p','-r','-t','-U'].includes(w[i])) i++; i++; } continue; }
    if (WRAPPERS.includes(x) && !REF[x]) { i++; while (w[i] && w[i].startsWith('-')) i++; continue; }
    if (/^[A-Za-z_]\w*=/.test(x)) { i++; continue; }
    break;
  }
  return (w[i] || '').replace(/^[({]+/, '').replace(/[;)]+$/, '');
}
// index of every command row, by base command
const USES = new Map();
DATA.forEach(sec => sec.cards.forEach((c, i) => (c.cmds || []).forEach(([cmd, com]) => {
  if (cmd.startsWith('#')) return;
  const b = baseCmd(cmd); if (!b) return;
  if (!USES.has(b)) USES.set(b, []);
  USES.get(b).push({ cmd, com, sec, i, title: c.title });
})));

// words of a command line (quotes kept together) → flag + word tokens
function tokens(line) {
  const out = []; const re = /'[^']*'|"(?:[^"\\]|\\.)*"|\S+/g; let m;
  while ((m = re.exec(line))) out.push(m[0]);
  return out;
}
function optKeys(key) {            // "-A N / -B N" → ["-A","-B"]; "install PKG" → ["install"]; "start / stop UNIT" → ["start","stop"]
  const alts = key.split(/\s+\/\s+/).map(x => x.trim());
  const multiFirst = /\s/.test(alts[0]) && !alts[0].startsWith('-');   // "group list / install" → only "group"
  const keys = [];
  alts.forEach((alt, j) => alt.split(/[\s,|]+/).forEach((w, k) => {
    const f = w.replace(/[=:].*$/, '').replace(/\[.*$/, '');
    if (/^--?[\w-]+$/.test(f) || (k === 0 && /^[a-z][\w-]*$/.test(f) && (j === 0 || !multiFirst))) { if (!keys.includes(f)) keys.push(f); }
  }));
  return keys;
}
function matchOptions(line, base, ref) {
  const tk = tokens(line);
  const start = tk.findIndex(t => t.replace(/^[({]+/, '') === base);
  const after = start >= 0 ? tk.slice(start + 1) : tk;
  const shortSet = new Set(ref.o.flatMap(([k]) => optKeys(k)).filter(k => /^-\w$/.test(k)));
  const used = [];                 // tokens to look for, in order
  const stop = after.findIndex(t => /^(\||;|&&|\|\|)/.test(t));
  (stop >= 0 ? after.slice(0, stop) : after).forEach((t, n) => {
    if (/^['"]/.test(t) || /^[<>]/.test(t)) return;
    if (/^--[\w-]+/.test(t)) used.push(t.replace(/=.*$/, ''));
    else if (/^-[A-Za-z]{2,}$/.test(t) && [...t.slice(1)].every(ch => shortSet.has('-' + ch))) [...t.slice(1)].forEach(ch => used.push('-' + ch));
    else if (/^-\w/.test(t)) used.push(t.match(/^-\w+/)[0], t.slice(0, 2));
    else if (n < 3 && /^[a-z][\w-]*$/.test(t)) used.push(t);
  });
  const hits = [];
  ref.o.forEach((o, idx) => {
    const ks = optKeys(o[0]);
    const pos = used.findIndex(u => ks.includes(u));
    if (pos >= 0) hits.push({ idx, pos, o });
  });
  return hits.sort((a, b) => a.pos - b.pos);
}
const copyable = (base, key) => /^(\(|Ctrl|Alt|Esc|Space|F\d|[A-Z]\b|\/text|:|q$|g \/|[0-9]+$|[A-Z]{2,}[ =])/.test(key) ? null : `${base} ${key.replace(/\s+\(inside\).*$/, '')}`;

let sheetReturn = null, sheetHideT = 0;
function openCmd(cmd, desc, secId, cardIdx) {
  const base = baseCmd(cmd), ref = REF[base];
  const uses = (USES.get(base) || []).filter(u => u.cmd !== cmd);
  const hits = ref ? matchOptions(cmd, base, ref) : [];
  const hitIdx = new Set(hits.map(h => h.idx));
  const cpBtn = (text, label = 'Copy') => `<button class="cp" data-copy="${esc(text)}" aria-label="${label}">${I.copy}</button>`;
  let h = `<div class="sh-head"><span class="sh-name" id="shTitle">${esc(base || cmd)}</span><span class="sh-sum">${esc(ref ? ref.s : (desc || 'Command'))}</span><button class="sh-x" data-sheet-close aria-label="Close">✕</button></div>`;
  h += `<div class="sh-sel"><div class="sh-lbl">Selected command</div><div class="sh-line"><pre>${hlShell(cmd)}</pre>${cpBtn(cmd)}</div>${desc ? `<p class="sh-desc">${esc(desc)}</p>` : ''}</div>`;
  if (hits.length) h += `<div class="sh-sec"><div class="sh-lbl">What this command uses</div>${hits.map(({ o }) => `<div class="sh-bd"><code>${esc(o[0])}</code><span>${esc(o[1])}</span></div>`).join('')}</div>`;
  if (ref) {
    h += `<div class="sh-sec"><div class="sh-lbl">Syntax</div>${ref.syn.map(s => `<div class="sh-line syn"><pre>${hlShell(s)}</pre>${cpBtn(s)}</div>`).join('')}</div>`;
    if (ref.o.length) h += `<div class="sh-sec"><div class="sh-lbl">Options &amp; subcommands <span class="sh-n">${ref.o.length}</span></div><div class="sh-opts">${ref.o.map((o, k) => {
      const c = copyable(base, o[0]);
      return `<div class="sh-opt${hitIdx.has(k) ? ' hit' : ''}"><code>${esc(o[0]).replace(/-/g, '‑')}</code><span>${esc(o[1])}${hitIdx.has(k) ? ' <em>used</em>' : ''}</span>${c ? cpBtn(c, 'Copy ' + o[0]) : '<i></i>'}</div>`;
    }).join('')}</div></div>`;
    if (ref.ex.length) h += `<div class="sh-sec"><div class="sh-lbl">Examples</div>${ref.ex.map(([e, d]) => `<div class="sh-line ex"><div class="l"><pre>${hlShell(e)}</pre><span>${esc(d)}</span></div>${cpBtn(e)}</div>`).join('')}</div>`;
  } else {
    h += `<div class="sh-sec"><div class="sh-lbl">Syntax</div><div class="sh-line syn"><pre>${hlShell(`${base} [OPTIONS] [ARGUMENTS]`)}</pre></div>
      <div class="sh-line syn"><div class="l"><pre>${hlShell(`man ${base}`)}</pre><span>Full manual</span></div>${cpBtn('man ' + base)}</div>
      <div class="sh-line syn"><div class="l"><pre>${hlShell(`${base} --help`)}</pre><span>Quick option list</span></div>${cpBtn(base + ' --help')}</div></div>`;
    // options from cards that use this command, kept only when they plausibly belong to it
    const seen = new Set(), opts = [];
    const subs = new Set((USES.get(base) || []).concat([{ cmd }]).flatMap(u => {
      const tk = tokens(u.cmd), k = tk.findIndex(t => t === base); return k >= 0 ? tk.slice(k + 1, k + 3).filter(t => /^-?-?[a-z][\w-]*$/.test(t)) : [];
    }));
    DATA.forEach(sec => sec.cards.forEach(c => {
      if (!c.flags || c.flagsLabel || !c.cmds) return;
      const rows = c.cmds.filter(r => !r[0].startsWith('#')), mine = rows.filter(r => baseCmd(r[0]) === base).length;
      if (!mine) return;
      const share = mine / rows.length;
      c.flags.forEach(f => {
        const first = f[0].split(/[\s/=,]+/)[0];
        const ok = f[0].includes(base) || subs.has(first) || (share >= 0.5 && /^-/.test(f[0]));
        if (ok && !seen.has(f[0]) && opts.length < 14) { seen.add(f[0]); opts.push(f); }
      });
    }));
    if (opts.length) h += `<div class="sh-sec"><div class="sh-lbl">Options shown in this app</div><div class="sh-opts">${opts.map(o => `<div class="sh-opt"><code>${esc(o[0]).replace(/-/g, '‑')}</code><span>${esc(o[1])}</span><i></i></div>`).join('')}</div></div>`;
  }
  if (uses.length) h += `<div class="sh-sec"><div class="sh-lbl">More <b>${esc(base)}</b> in this app <span class="sh-n">${uses.length}</span></div>${uses.slice(0, 10).map(u =>
    `<div class="sh-line ex"><div class="l"><pre>${hlShell(u.cmd)}</pre><span>${esc(u.com || '')}${u.com ? ' · ' : ''}<a href="#${u.sec.id}/${u.i}" data-go="${u.sec.id}" data-card="${u.i}" data-pane="cmd" data-sheet-close>${esc(u.sec.icon)} ${esc(u.title)}</a></span></div>${cpBtn(u.cmd)}</div>`).join('')}</div>`;
  h += `<div class="sh-foot"><button class="btn pri" data-copy="${esc(cmd)}">${I.copy} Copy command</button><button class="btn" data-try="${esc(cmd)}" data-sheet-close>${I.term} Try in terminal</button></div>`;
  showSheet(h);
}
function showSheet(h) {
  const bg = $('#cmdSheet'); $('#shBody').innerHTML = h; $('#shBody').scrollTop = 0;
  sheetReturn = document.activeElement;
  clearTimeout(sheetHideT); bg.hidden = false; requestAnimationFrame(() => bg.classList.add('open'));
  document.body.classList.add('sheet-on');
  if (!history.state || !history.state.sheet) history.pushState({ sheet: 1 }, '');
  setTimeout(() => $('.sh-x', bg)?.focus({ preventScroll: true }), 60);
}
/* ═════════ ABOUT / CREATOR ═════════ */
const CREATOR = { name: 'SSK-BLUM', email: 'soorajsknairqa@gmail.com' };
function openAbout() {
  const sw = (navigator.serviceWorker && navigator.serviceWorker.controller) ? 'installed for offline use' : 'works offline once installed';
  const logo = $('.hdr .logo').outerHTML.replace('class="logo"', '').replace(/id="h(fb\w+)"/g, 'id="a$1"').replace(/url\(#h(fb\w+)\)/g, 'url(#a$1)');
  const h = `<div class="sh-head"><span class="sh-name" id="shTitle">About</span><span class="sh-sum">Fedora Bible · creator &amp; app info</span><button class="sh-x" data-sheet-close aria-label="Close">✕</button></div>
    <div class="ab-hero">${logo}<div><b>Fedora Bible</b><small>Linux command reference · F44</small></div></div>
    <div class="sh-lbl">Creator details</div>
    <div class="ab-card"><div class="ab-who"><span class="ab-av" aria-hidden="true">SSK</span><div><b>Created by ${CREATOR.name}</b><span>Design, content &amp; development</span></div></div>
      <div class="ab-mail"><span class="k">Email</span><a href="mailto:${CREATOR.email}?subject=Fedora%20Bible">${CREATOR.email}</a><button class="cp" data-copy="${CREATOR.email}" aria-label="Copy email">${I.copy}</button></div></div>
    <div class="sh-lbl">About the app</div>
    <div class="ab-stats"><div><b>${DATA.length}</b><span>sections</span></div><div><b>${nCmds.toLocaleString()}</b><span>commands</span></div><div><b>${nFlags.toLocaleString()}</b><span>flags</span></div><div><b>${EXAMPLES.length}</b><span>live demos</span></div></div>
    <div class="ab-card ab-note"><p><b>Fedora Bible</b> is a pocket reference for Fedora Linux — from first steps in the shell to servers, containers, virtualization, SELinux and Kubernetes. Every section groups real-world commands with their options, flags and a live simulated terminal example.</p>
      <ul><li>Tap any command for its syntax, options and a copy button</li><li>Practise safely in the Terminal playground — nothing runs on your device</li><li>Install it as an app; it ${sw}</li><li>Dark / light theme and an optional ambient soundtrack</li></ul></div>
    <p class="ab-fine">Simulated output — nothing runs on your device. Fedora® is a trademark of Red Hat, Inc.; this is an independent, unofficial guide.</p>
    <div class="sh-foot"><a class="btn pri" href="mailto:${CREATOR.email}?subject=Fedora%20Bible">✉️ Email creator</a><button class="btn" data-sheet-close>Close</button></div>`;
  showSheet(h);
}
// mode: undefined = user closed (undo our history entry) · 'pop' = back button · 'nav' = leaving to another view
function closeCmd(mode) {
  const bg = $('#cmdSheet'); if (bg.hidden) return;
  bg.classList.remove('open'); document.body.classList.remove('sheet-on');
  clearTimeout(sheetHideT); sheetHideT = setTimeout(() => { bg.hidden = true; }, 220);
  const ours = history.state && history.state.sheet;
  if (ours && mode === 'nav') history.replaceState(null, '');
  else if (ours && !mode) history.back();
  if (mode !== 'nav' && sheetReturn && sheetReturn.focus) sheetReturn.focus({ preventScroll: true });
}

function pgPrint(html) { const out = $('#pgOut'); out.insertAdjacentHTML('beforeend', html); out.scrollTop = out.scrollHeight; }

async function pgRun(raw) {
  const cmd = norm(raw);
  pgPrint(`<span class="ps">${esc(PROMPT)}</span>${hlShell(cmd)}\n`);
  if (!cmd) return;
  PG.hist.push(cmd); PG.hi = PG.hist.length;
  if (Music.on) Music.tick();
  const name = cmdName(cmd);
  const args = cmd.split(' ');
  if (cmd.startsWith('sudo') && !PG.sudoAsked) { PG.sudoAsked = true; pgPrint(`<span class="dimo">[sudo] password for ${USER}: ••••••••</span>\n`); await sleep(350); }

  const ex = EXMAP.get(cmd) || EXMAP.get(cmd.replace(/^sudo /, '')) || EXMAP.get('sudo ' + cmd);
  if (ex) return streamOut(ex.out);

  // a command from one of the sections
  const row = ROWMAP.get(cmd);
  const simpleLs = name === 'ls' && (args.length === 1 || args[1] === '-la' || args[1] === '-l');
  if (row && !PG_BUILTINS.includes(name) && !simpleLs && !(name === 'man' && args.length === 2)) return pgRow(row);

  switch (name) {
    case 'help': return pgPrint(`<span class="o">${esc(BUILTIN_HELP)}</span>\n`);
    case 'clear': $('#pgOut').innerHTML = ''; return;
    case 'sections': return pgPrint(DATA.map(sec => {
      const n = sec.cards.reduce((a, c) => a + (c.cmds || []).filter(r => !r[0].startsWith('#')).length, 0);
      return `<button class="pgl" data-pg="commands ${sec.id}"><span class="ps2">${esc(sec.id.padEnd(11))}</span></button><span class="o">${sec.icon} ${esc(sec.title.padEnd(22))}</span><span class="dimo">${String(n).padStart(4)} cmds</span>`;
    }).join('\n') + `\n<span class="dimo">→ commands &lt;section&gt;  e.g. commands ${DATA[1].id}</span>\n`);
    case 'commands': {
      if (args.length === 1) return pgRun('sections');
      const sec = findSection(args.slice(1).join(' '));
      if (!sec) return pgPrint(`<span class="err">commands: no section “${esc(args.slice(1).join(' '))}”</span>\n<span class="dimo">Type 'sections' to list them.</span>\n`);
      pgList(sec.id); if ($('#pgFilter')) $('#pgFilter').value = '';
      let o = `<span class="ps2">${sec.icon} ${esc(sec.title)}</span>  <span class="dimo">— tap a command to run it</span>\n`;
      sec.cards.forEach(c => {
        const rows = (c.cmds || []).filter(r => !r[0].startsWith('#')); if (!rows.length) return;
        o += `\n<span class="ps2">${c.icon} ${esc(c.title)}</span>\n` + rows.map(r => `  ${pgLink(r[0])}${r[1] ? `  <span class="dimo"># ${esc(r[1])}</span>` : ''}`).join('\n') + '\n';
      });
      return pgPrint(o);
    }
    case 'search': {
      const q = args.slice(1).join(' ').toLowerCase();
      if (!q) return pgPrint(`<span class="o">usage: search &lt;text&gt;   e.g. search firewall</span>\n`);
      const hits = []; ROWMAP.forEach(v => { if (v.cmd.toLowerCase().includes(q) || (v.com || '').toLowerCase().includes(q)) hits.push(v); });
      if (!hits.length) return pgPrint(`<span class="err">search: nothing matches “${esc(q)}”</span>\n`);
      return pgPrint(`<span class="dimo">${hits.length} commands${hits.length > 40 ? ' (first 40)' : ''}</span>\n` + hits.slice(0, 40).map(v => `  ${pgLink(v.cmd)}  <span class="dimo"># ${v.sec.icon} ${esc(v.title)}</span>`).join('\n') + '\n');
    }
    case 'examples': return pgPrint(EXAMPLES.map(e => `<span class="dimo">${esc(e.title.padEnd(26).slice(0,26))}</span> ${hlShell(e.cmd)}`).join('\n') + '\n');
    case 'history': return pgPrint(`<span class="o">${esc(PG.hist.map((h, i) => String(i + 1).padStart(4) + '  ' + h).join('\n'))}</span>\n`);
    case 'whoami': return pgPrint(`<span class="o">${USER}</span>\n`);
    case 'pwd': return pgPrint(`<span class="o">/home/${USER}</span>\n`);
    case 'cd': return;
    case 'date': return pgPrint(`<span class="o">${esc(new Date().toString().replace(/ \(.+\)$/, ''))}</span>\n`);
    case 'echo': return pgPrint(`<span class="o">${esc(args.slice(1).join(' ').replace(/^["']|["']$/g, '').replace(/\$HOME/g, '/home/' + USER).replace(/\$USER/g, USER))}</span>\n`);
    case 'ls': if (args.length === 1 || args[1] === '-la' || args[1] === '-l') return pgPrint(`<span class="o">Desktop  Documents  Downloads  Music  Pictures  Projects  Videos</span>\n`); break;
    case 'exit': return pgPrint(`<span class="dimo">logout — (this is a playground, the session stays open 🙂)</span>\n`);
    case 'fastfetch': case 'neofetch': return streamOut(
`        .--.           ${USER}@${HOST}
       |o_o |          -------------
       |:_/ |          OS: Fedora Linux 44 (Workstation Edition) x86_64
      //   \\ \\         Kernel: 6.19.8-200.fc44.x86_64
     (|     | )        Uptime: 15 hours, 12 mins
    /'\\_   _/\`\\        Packages: 2214 (rpm), 18 (flatpak)
    \\___)=(___/        Shell: bash 5.3.3
                       DE: GNOME 50
                       CPU: AMD Ryzen 7 PRO 8840U (16) @ 5.13 GHz
                       Memory: 6.21 GiB / 31.00 GiB (20%)`);
    case 'man': {
      const target = cmdName(args.slice(1).join(' '));
      const cards = manFor(target);
      if (!target) return pgPrint(`<span class="o">What manual page do you want?\nFor example, try 'man dnf'.</span>\n`);
      const mref = REF[target];
      if (mref) {
        let m = `<span class="ps2">${esc(target.toUpperCase())}(1)</span>  <span class="dimo">— from Fedora Bible</span>\n\n<span class="ps2">NAME</span>\n  <span class="o">${esc(target)} — ${esc(mref.s)}</span>\n\n<span class="ps2">SYNOPSIS</span>\n` + mref.syn.map(x => '  ' + hlShell(x)).join('\n') + '\n';
        if (mref.o.length) m += `\n<span class="ps2">OPTIONS</span>\n` + mref.o.map(([k, d]) => `  <span class="t-flag">${esc(k.padEnd(24))}</span> <span class="o">${esc(d)}</span>`).join('\n') + '\n';
        if (mref.ex.length) m += `\n<span class="ps2">EXAMPLES</span>\n` + mref.ex.map(([e, d]) => `  ${pgLink(e)}  <span class="dimo"># ${esc(d)}</span>`).join('\n') + '\n';
        const n = (USES.get(target) || []).length;
        if (n) m += `\n<span class="dimo">${n} ${esc(target)} commands in this guide → </span>${pgLink('search ' + target)}\n`;
        return pgPrint(m);
      }
      if (!cards.length || !cards.some(c => c.flags)) return pgPrint(`<span class="err">No manual entry for ${esc(target)} in this guide</span>\n`);
      let s = `<span class="ps2">${esc(target.toUpperCase())}(1)</span>  <span class="dimo">— from Fedora Bible</span>\n`;
      cards.filter(c => c.flags).forEach(c => {
        s += `\n<span class="ps2">${esc(c.title)}</span>\n` + c.flags.map(([f, d]) => `  <span class="t-flag">${esc(f.padEnd(24))}</span> <span class="o">${esc(d)}</span>`).join('\n') + '\n';
      });
      return pgPrint(s);
    }
  }
  if (args.includes('--help') || args.includes('-h')) return pgRun('man ' + name);

  // known command, unknown arguments → explain + related commands from the guide
  const base = baseCmd(cmd);
  if (REF[base] || USES.has(base)) {
    pgPrint(`<span class="dimo">(simulated) </span><span class="ps2">${esc(base)}</span><span class="o"> — ${esc(REF[base] ? REF[base].s : 'command used in this guide')}</span>\n` + pgExplain(cmd, base));
    const rel = (USES.get(base) || []).slice(0, 5);
    if (rel.length) pgPrint(`<span class="dimo">related commands in this guide:</span>\n` + rel.map(u => `  ${pgLink(u.cmd)}  <span class="dimo"># ${esc(u.com || u.title)}</span>`).join('\n') + '\n');
    const nearB = EXAMPLES.find(e => baseCmd(e.cmd) === base);
    if (nearB) { pgPrint(`<span class="dimo">closest live example → </span>${hlShell(nearB.cmd)}\n`); return streamOut(nearB.out); }
    return;
  }
  // Nearest example with the same command
  const near = EXAMPLES.find(e => cmdName(e.cmd) === name);
  if (near) {
    pgPrint(`<span class="dimo">(simulated) closest example → </span>${hlShell(near.cmd)}\n`);
    return streamOut(near.out);
  }
  pgPrint(`<span class="err">bash: ${esc(name || cmd)}: command not found...</span>\n<span class="dimo">Try 'search ${esc(name || cmd)}', 'sections' or 'help'.</span>\n`);
}

// run a command row from a section card
async function pgRow(row) {
  const base = baseCmd(row.cmd);
  pgPrint(`<span class="dimo">(simulated) ${row.sec.icon} ${esc(row.sec.title)} › </span><button class="pgl" data-go="${row.sec.id}" data-card="${row.i}" data-pane="cmd"><span class="dimo">${esc(row.title)}</span></button>\n`);
  if (row.com) pgPrint(`<span class="o">→ ${esc(row.com)}</span>\n`);
  else if (REF[base]) pgPrint(`<span class="o">→ ${esc(base)}: ${esc(REF[base].s)}</span>\n`);
  const exp = pgExplain(row.cmd, base);
  if (exp) pgPrint(exp);
  await sleep(120);
  // same card's live example for this command → its output
  const ce = row.card.example;
  const head2 = c => { const w = c.replace(/^(sudo\s+(-\S+\s+)*)+/, '').trim().split(/\s+/); return w.slice(0, 2).join(' '); };
  if (ce && baseCmd(ce.cmd) === base && head2(ce.cmd) === head2(row.cmd)) { pgPrint(`<span class="dimo">sample output (from </span>${hlShell(ce.cmd)}<span class="dimo">):</span>\n`); return streamOut(ce.out); }
  const near = EXAMPLES.find(e => head2(e.cmd) === head2(row.cmd)) || EXAMPLES.find(e => e.sec === row.sec.id && baseCmd(e.cmd) === base) || EXAMPLES.find(e => baseCmd(e.cmd) === base);
  pgPrint(`<span class="ok">✓ done</span>${near ? `<span class="dimo">  · live example → </span>${pgLink(near.cmd)}` : ''}\n`);
}

async function streamOut(text) {
  const lines = text.split('\n');
  for (const ln of lines) { pgPrint(`<span class="o">${esc(ln)}</span>\n`); await sleep(lines.length > 6 ? 30 : 60); }
}

/* ═════════ NAVIGATION ═════════ */
let current = 'home', lastView = 'home';
function show(id, cardIdx, pane) {
  if (!document.getElementById('v-' + id)) id = 'home';
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'v-' + id));
  $$('.tab').forEach(t => {
    const on = t.dataset.go === id; t.classList.toggle('active', on);
    if (on) t.scrollIntoView({ inline:'center', block:'nearest', behavior:'smooth' });
  });
  current = id; if (id !== 'search') lastView = id;
  if (cardIdx != null) {
    const card = document.getElementById(`${id}-${cardIdx}`);
    if (card) {
      openCard(card, true);
      if (pane) selectPane(card, pane);
      setTimeout(() => card.scrollIntoView({ behavior:'smooth', block:'start' }), 60);
    }
  } else window.scrollTo({ top:0 });
  if (id === 'term') setTimeout(() => { if (matchMedia('(pointer:fine)').matches) $('#pgIn')?.focus(); }, 100);
}
function go(id, cardIdx, pane) {
  const h = '#' + id + (cardIdx != null ? '/' + cardIdx + (pane ? '/' + pane : '') : '');
  if (location.hash === h) show(id, cardIdx, pane); else location.hash = h;
}
function route() {
  const [id, idx, pane] = location.hash.slice(1).split('/');
  clearSearch(true);
  show(id || 'home', idx != null && idx !== '' ? +idx : null, pane);
}

function openCard(card, force) {
  const open = force ?? !card.classList.contains('open');
  card.classList.toggle('open', open);
  $('.card-h', card).setAttribute('aria-expanded', open);
  // If the only pane is live, auto-run
  if (open) { const active = $('.pane.active', card); if (active?.dataset.p === 'live') autoRun(card); }
}
function selectPane(card, key) {
  $$('.seg button', card).forEach(b => b.classList.toggle('active', b.dataset.pane === key));
  $$('.pane', card).forEach(p => p.classList.toggle('active', p.dataset.p === key));
  if (key === 'live') autoRun(card);
}
function autoRun(card) {
  const t = $('[data-term]', card);
  if (t && !t._ran) { t._ran = true; const c = DATA.find(s => s.id === card.dataset.sec).cards[+card.dataset.i]; playExample(t, c.example); }
}

/* ═════════ SEARCH ═════════ */
const IDX = [];
DATA.forEach(sec => sec.cards.forEach((c, i) => {
  const lines = [
    ...(c.cmds || []).map(r => ({ t: r[0] + (r[1] ? '  — ' + r[1] : ''), pane:'cmd' })),
    ...(c.flags || []).map(r => ({ t: r[0] + '  — ' + r[1], pane:'flags' })),
    ...(c.table ? c.table.rows.map(r => ({ t: r.join('  — '), pane:'cmd' })) : []),
    ...(c.code ? c.code.split('\n').map(t => ({ t, pane:'cmd' })) : []),
    ...(c.example ? [{ t: c.example.cmd, pane:'live' }] : [])
  ];
  IDX.push({ sec, i, c, title: c.title, lines, blob: (c.title + ' ' + (c.desc || '') + ' ' + sec.title + ' ' + lines.map(l => l.t).join(' ')).toLowerCase() });
}));
const hlq = (s, q) => esc(s).replace(new RegExp('(' + esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>');

function doSearch(raw) {
  const q = raw.trim().toLowerCase();
  $('#qClear').classList.toggle('show', !!raw);
  if (q.length < 2) { if (current === 'search') show(lastView); return; }
  const terms = q.split(/\s+/);
  const hits = IDX.map(e => {
    if (!terms.every(t => e.blob.includes(t))) return null;
    let score = e.title.toLowerCase().includes(q) ? 10 : 0;
    const line = e.lines.find(l => l.t.toLowerCase().includes(q)) || e.lines.find(l => l.t.toLowerCase().includes(terms[0]));
    if (line) score += 5;
    return { e, line, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score);
  const v = $('#v-search');
  v.innerHTML = hits.length
    ? `<div class="sec-head"><p>${hits.length} result${hits.length > 1 ? 's' : ''} for "${esc(raw.trim())}"</p></div>` + hits.map(({ e, line }) =>
        `<button class="res" data-go="${e.sec.id}" data-card="${e.i}" data-pane="${line ? line.pane : ''}"><span class="rs">${e.sec.icon} ${esc(e.sec.title)}${line && line.pane === 'flags' ? ' · flag' : ''}</span><b>${hlq(e.title, terms[0])}</b>${line ? `<p>${hlq(line.t, terms[0])}</p>` : ''}</button>`).join('')
    : `<div class="empty">No results for <b>${esc(raw)}</b><br><br>Try: dnf, --permanent, ssh -L, btrfs, journalctl</div>`;
  show('search');
}
function clearSearch(silent) { const q = $('#q'); if (!q.value) return; q.value = ''; $('#qClear').classList.remove('show'); if (!silent) show(lastView); }

/* ═════════ THEME ═════════ */
function applyTheme(t) {
  const sys = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const eff = t || sys;
  document.documentElement.dataset.theme = eff;
  $('#themeIco').innerHTML = eff === 'dark' ? I.sun : I.moon;
  $$('meta[name="theme-color"]').forEach(m => m.content = eff === 'dark' ? '#070b16' : '#eef3fb');
}

/* ═════════ AMBIENT MUSIC (Web Audio, generated live) ═════════ */
const Music = {
  ctx:null, on:false, timer:null, vol: store.get('vol', 35),
  CHORDS:[ {root:45, pad:[57,60,64,71]},   // Am9
           {root:41, pad:[53,57,60,64]},   // Fmaj7
           {root:48, pad:[55,59,64,67]},   // Cmaj7
           {root:43, pad:[55,59,62,66]} ], // Gmaj7 (lydian shimmer)
  hz: m => 440 * Math.pow(2, (m - 69) / 12),
  init() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { toast('Audio not supported on this device'); return false; }
    const c = this.ctx = new AC();
    this.master = c.createGain(); this.master.gain.value = 0;
    const comp = c.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 3;
    this.an = c.createAnalyser(); this.an.fftSize = 64; this.an.smoothingTimeConstant = .8;
    this.master.connect(comp); comp.connect(this.an); this.an.connect(c.destination);
    // reverb
    const len = c.sampleRate * 3.2, ir = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.4); }
    this.rev = c.createConvolver(); this.rev.buffer = ir;
    const revG = c.createGain(); revG.gain.value = .55; this.rev.connect(revG); revG.connect(this.master);
    // ping-pong-ish delay
    this.dly = c.createDelay(1.5); this.dly.delayTime.value = .5625;
    const fb = c.createGain(); fb.gain.value = .42; const dlp = c.createBiquadFilter(); dlp.type = 'lowpass'; dlp.frequency.value = 2600;
    this.dly.connect(dlp); dlp.connect(fb); fb.connect(this.dly);
    const dOut = c.createGain(); dOut.gain.value = .5; dlp.connect(dOut); dOut.connect(this.master); dOut.connect(this.rev);
    // pad bus with slow sweeping filter
    this.padF = c.createBiquadFilter(); this.padF.type = 'lowpass'; this.padF.frequency.value = 900; this.padF.Q.value = 2;
    const lfo = c.createOscillator(), lfoG = c.createGain(); lfo.frequency.value = .045; lfoG.gain.value = 520;
    lfo.connect(lfoG); lfoG.connect(this.padF.frequency); lfo.start();
    const padG = c.createGain(); padG.gain.value = .55; this.padF.connect(padG); padG.connect(this.master); padG.connect(this.rev);
    // noise buffer for hats / ticks
    const nb = c.createBuffer(1, c.sampleRate * .25, c.sampleRate), nd = nb.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    this.noise = nb;
    return true;
  },
  level() { return (this.vol / 100) * 0.55; },
  pad(t, notes, dur) {
    const c = this.ctx;
    notes.forEach(n => [-8, 8].forEach(det => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sawtooth'; o.frequency.value = this.hz(n); o.detune.value = det + (Math.random() * 4 - 2);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.032, t + 2.2);
      g.gain.setValueAtTime(.032, t + dur - .2); g.gain.linearRampToValueAtTime(0, t + dur + 2);
      o.connect(g); g.connect(this.padF); o.start(t); o.stop(t + dur + 2.1);
    }));
  },
  bass(t, n, dur) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.value = this.hz(n - 12);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.16, t + .08); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + dur + .05);
  },
  pluck(t, n, amp = .06) {
    const c = this.ctx, o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
    o.type = 'triangle'; o2.type = 'square'; o.frequency.value = this.hz(n); o2.frequency.value = this.hz(n) * 2.001;
    const g2 = c.createGain(); g2.gain.value = .12;
    f.type = 'lowpass'; f.frequency.setValueAtTime(4200, t); f.frequency.exponentialRampToValueAtTime(500, t + .5);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(amp, t + .006); g.gain.exponentialRampToValueAtTime(.0008, t + .7);
    o.connect(f); o2.connect(g2); g2.connect(f); f.connect(g); g.connect(this.master); g.connect(this.dly);
    o.start(t); o2.start(t); o.stop(t + .75); o2.stop(t + .75);
  },
  hat(t, amp) {
    const c = this.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noise; f.type = 'highpass'; f.frequency.value = 7500;
    g.gain.setValueAtTime(amp, t); g.gain.exponentialRampToValueAtTime(.0005, t + .05);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + .06);
  },
  tick() { if (this.ctx && this.on) this.hat(this.ctx.currentTime, .02); },
  schedule() {
    const c = this.ctx, E = .375; // eighth note at 80 bpm
    while (this.nextT < c.currentTime + .25) {
      const t = this.nextT, s = this.step, ch = this.CHORDS[Math.floor(s / 16) % 4];
      if (s % 16 === 0) this.pad(t, ch.pad, 16 * E);
      if (s % 8 === 0) this.bass(t, ch.root, 7.5 * E);
      if (s % 8 === 5) this.bass(t, ch.root + 7, 2 * E);
      if (Math.random() < (s % 2 ? .38 : .62)) {
        const pool = ch.pad.map(n => n + 12), n = pool[(s * 3 + (Math.random() < .3 ? 1 : 0)) % pool.length];
        this.pluck(t, n, s % 4 === 0 ? .06 : .04);
      }
      if (s % 2) this.hat(t, s % 4 === 3 ? .018 : .01);
      this.step++; this.nextT += E;
    }
  },
  run() { this.step = this.step || 0; this.nextT = this.ctx.currentTime + .12; this.timer = setInterval(() => this.schedule(), 60); },
  async start() {
    if (!this.ctx && !this.init()) return;
    if (this.ctx.state !== 'running') await this.ctx.resume();
    if (!this.timer) this.run();
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setTargetAtTime(this.level(), this.ctx.currentTime, .9);
    this.on = true; store.set('music', true); this.ui(); this.viz();
  },
  stop(hide) {
    this.on = false; store.set('music', false); this.ui(hide);
    if (!this.ctx) return;
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, .25);
    setTimeout(() => { if (!this.on) { clearInterval(this.timer); this.timer = null; this.ctx.suspend(); } }, 1100);
  },
  toggle() { this.on ? this.stop() : this.start(); },
  setVol(v) { this.vol = v; store.set('vol', v); if (this.on) this.master.gain.setTargetAtTime(this.level(), this.ctx.currentTime, .1); },
  ui(hide) {
    const b = $('#musicBtn'); b.classList.toggle('on', this.on); b.setAttribute('aria-pressed', this.on);
    $('#pToggle').innerHTML = this.on ? I.pause : I.play;
    if (this.on) $('#player').classList.add('show'); else if (hide) $('#player').classList.remove('show');
  },
  viz() {
    const bars = $$('#viz i'), data = new Uint8Array(this.an.frequencyBinCount);
    const loop = () => {
      if (!this.on) { bars.forEach(b => b.style.height = '3px'); return; }
      this.an.getByteFrequencyData(data);
      bars.forEach((b, i) => b.style.height = Math.max(3, data[i * 3 + 1] / 255 * 22) + 'px');
      requestAnimationFrame(loop);
    };
    loop();
  },
  // pause scheduling when the app is hidden, resume when visible
  onVis() {
    if (!this.ctx || !this.on) return;
    if (document.hidden) { clearInterval(this.timer); this.timer = null; this.ctx.suspend(); }
    else { this.ctx.resume().then(() => { if (!this.timer) this.run(); }); }
  }
};

/* ═════════ EVENTS ═════════ */
function bind() {
  document.addEventListener('click', e => {
    if (e.target.id === 'cmdSheet') return closeCmd();
    const t = e.target.closest('button, a');
    if (!t) {
      const row = e.target.closest('.row[data-cmd]');
      if (row && !getSelection().toString()) { const card = row.closest('.card'); openCmd(row.dataset.cmd, row.dataset.desc, card?.dataset.sec, card ? +card.dataset.i : null); }
      return;
    }
    if (t.hasAttribute('data-sheet-close') && !t.dataset.go && !t.dataset.try) { closeCmd(); return; }
    if (t.closest('#cmdSheet') && (t.dataset.go || t.dataset.try)) closeCmd('nav');
    if (t.dataset.go) { e.preventDefault(); go(t.dataset.go, t.dataset.card != null ? +t.dataset.card : null, t.dataset.pane || null); return; }
    if (t.classList.contains('card-h')) return openCard(t.closest('.card'));
    if (t.dataset.pane) return selectPane(t.closest('.card'), t.dataset.pane);
    if (t.dataset.copy != null) return copy(t.dataset.copy, t);
    if (t.hasAttribute('data-copy-code')) return copy(t.closest('.codebox').querySelector('pre').textContent, t);
    if (t.hasAttribute('data-run')) {
      const card = t.closest('.card'), c = DATA.find(s => s.id === card.dataset.sec).cards[+card.dataset.i];
      const term = $('[data-term]', card); term._ran = true; playExample(term, c.example);
      t.innerHTML = `${I.replay} Replay`; return;
    }
    if (t.dataset.try) { go('term'); setTimeout(() => pgRun(t.dataset.try), 150); return; }
    if (t.dataset.pgsec) { $('#pgFilter').value = ''; pgList(t.dataset.pgsec); return; }
    if (t.dataset.pg) { pgRun(t.dataset.pg); if (t.closest('#pgList')) $('.pg').scrollIntoView({ behavior:'smooth', block:'start' }); return; }
    if (t.dataset.expand) { const on = t.dataset.expand === '1'; $$('.card', t.closest('.view')).forEach(c => openCard(c, on)); }
  });

  const q = $('#q'); let st;
  q.addEventListener('input', () => { clearTimeout(st); st = setTimeout(() => doSearch(q.value), 120); });
  q.addEventListener('keydown', e => { if (e.key === 'Escape') { clearSearch(); q.blur(); } if (e.key === 'Enter') q.blur(); });
  $('#qClear').onclick = () => { clearSearch(); q.focus(); };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('#cmdSheet').hidden) { e.preventDefault(); closeCmd(); return; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('.row[data-cmd]')) {
      e.preventDefault(); const row = e.target, card = row.closest('.card');
      openCmd(row.dataset.cmd, row.dataset.desc, card?.dataset.sec, card ? +card.dataset.i : null); return;
    }
    if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName) && $('#cmdSheet').hidden) { e.preventDefault(); q.focus(); }
  });
  addEventListener('popstate', () => { if (!$('#cmdSheet').hidden) closeCmd('pop'); });

  $('#themeBtn').onclick = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    store.set('theme', next); applyTheme(next);
  };
  matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', () => applyTheme(store.get('theme', null)));

  $('#musicBtn').onclick = () => Music.toggle();
  $('#aboutBtn').onclick = () => openAbout();
  $('#pToggle').onclick = () => Music.toggle();
  $('#pClose').onclick = () => Music.stop(true);
  const vol = $('#vol'); vol.value = Music.vol; vol.oninput = () => Music.setVol(+vol.value);
  document.addEventListener('visibilitychange', () => Music.onVis());
  if (store.get('music', false)) {
    $('#player').classList.add('show'); Music.ui();
    const resume = () => { Music.start(); removeEventListener('pointerdown', resume); removeEventListener('keydown', resume); };
    addEventListener('pointerdown', resume, { once:true }); addEventListener('keydown', resume, { once:true });
  }

  const fab = $('#fab');
  addEventListener('scroll', () => fab.classList.toggle('show', scrollY > 600), { passive:true });
  fab.onclick = () => scrollTo({ top:0, behavior:'smooth' });

  addEventListener('hashchange', route);
  const net = () => document.body.classList.toggle('offline', !navigator.onLine);
  addEventListener('online', net); addEventListener('offline', net); net();
}

/* ═════════ PWA ═════════ */
function pwa() {
  let deferred;
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; $('#installBtn').classList.add('show'); });
  $('#installBtn').onclick = async () => {
    if (!deferred) return;
    deferred.prompt(); const r = await deferred.userChoice; deferred = null;
    $('#installBtn').classList.remove('show'); if (r.outcome === 'accepted') toast('Installing…');
  };
  addEventListener('appinstalled', () => toast('Installed — works offline'));
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    addEventListener('load', () => navigator.serviceWorker.register('sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        nw && nw.addEventListener('statechange', () => { if (nw.state === 'installed' && navigator.serviceWorker.controller) toast('Updated — reload for the latest'); });
      });
    }).catch(() => {}));
  }
}

/* ═════════ BOOT ═════════ */
renderTabs();
renderHome();
DATA.forEach(renderSection);
renderTerm();
applyTheme(store.get('theme', null));
bind();
pwa();
route();
window.FB = { Music, pgRun, go, ROWMAP }; // handy for debugging
})();
