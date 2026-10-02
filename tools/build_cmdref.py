#!/usr/bin/env python3
"""Build cmdref.js (command pop-up reference) from tools/cmdref/*.txt.

Usage:  python3 tools/build_cmdref.py            # writes ./cmdref.js

Text format (one command block per entry):
  @name ~~ one-line summary
  $ syntax line            (one or more)
  - option ~~ description  (options & subcommands)
  > example ~~ description (examples)
"""
import json, sys, glob, os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D=os.path.join(ROOT,'tools','cmdref')
ref={}; cur=None; errs=[]
for fn in sorted(glob.glob(D+'/*.txt')):
    for ln_no,line in enumerate(open(fn,encoding='utf-8'),1):
        line=line.rstrip('\n')
        if not line.strip(): continue
        tag,rest=line[:2],line[2:]
        if line.startswith('@'):
            name,_,summ=line[1:].partition(' ~~ ')
            if name in ref: errs.append(f'dup {name}')
            cur=ref[name]={'s':summ,'syn':[],'o':[],'ex':[]}
            if not summ: errs.append(f'nosumm {name}')
        elif tag=='$ ': cur['syn'].append(rest)
        elif tag=='- ' or tag=='> ':
            k,sep,d=rest.partition(' ~~ ')
            if not sep: errs.append(f'{os.path.basename(fn)}:{ln_no} missing ~~ : {line[:60]}')
            (cur['o'] if tag=='- ' else cur['ex']).append([k,d])
        else: errs.append(f'{os.path.basename(fn)}:{ln_no} bad line: {line[:60]}')
for n,r in ref.items():
    if not r['syn']: errs.append(f'nosyn {n}')
    if not r['o']: errs.append(f'noopts {n}')
js='/* Fedora Bible — command reference for the command pop-up (generated) */\nwindow.FB_CMDREF='+json.dumps(ref,ensure_ascii=False,separators=(',',':'))+';\n'
open(sys.argv[1] if len(sys.argv)>1 else os.path.join(ROOT,'cmdref.js'),'w',encoding='utf-8').write(js)
print(len(ref),'commands', len(js)//1024,'KB'); print('\n'.join(errs) or 'no errors')
