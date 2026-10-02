/* Fedora Bible — content data
 * Each section → cards. Each card may have:
 *   desc, cmds [[command, comment]], flags [[flag, meaning]],
 *   example {cmd, out}, table {head, rows}, tip, warn, danger
 * Targets Fedora 44 (DNF5 has been the default since F41).
 */
window.FB_DATA = [
/* ───────────────────────── BASICS ───────────────────────── */
{ id:'basics', icon:'⚡', title:'Basics', sub:'Essential commands', desc:'essential commands every fedora user needs',
  cards:[
  { title:'System Information', icon:'🖥️', badge:'INFO', color:'blue',
    desc:'Get OS, hardware and kernel details.',
    cmds:[
      ['cat /etc/os-release','Fedora version info'],
      ['uname -a','Kernel + architecture'],
      ['uname -r','Kernel version only'],
      ['hostnamectl','Host, OS, kernel, hardware'],
      ['lscpu','CPU information'],
      ['lsmem','Memory ranges'],
      ['lspci -k','PCI devices + drivers'],
      ['lsusb','USB devices'],
      ['sudo dmidecode -t system','DMI / BIOS info'],
      ['fastfetch','Pretty system summary (dnf install fastfetch)']],
    flags:[
      ['uname -a','All info: kernel, host, release, arch'],
      ['uname -r','Kernel release'],
      ['uname -m','Machine hardware (x86_64, aarch64)'],
      ['lspci -k','Show kernel driver in use'],
      ['lspci -v','Verbose device details'],
      ['lscpu -e','Extended per-CPU table'],
      ['dmidecode -t <type>','system | bios | memory | processor']],
    example:{cmd:'hostnamectl', out:
` Static hostname: fedora-ws
       Icon name: computer-laptop
      Machine ID: 3f9c2a7d8e1b4c6a9f0e2d1c3b5a7e9f
Operating System: Fedora Linux 44 (Workstation Edition)
          Kernel: Linux 6.19.8-200.fc44.x86_64
    Architecture: x86-64
 Hardware Vendor: Lenovo
  Hardware Model: ThinkPad T14 Gen 5`},
    tip:'<b>neofetch</b> is no longer maintained — <code>fastfetch</code> is the drop-in replacement in the Fedora repos.' },

  { title:'Memory, Disk & Uptime', icon:'📊', badge:'QUICK', color:'blue',
    cmds:[
      ['free -h','Human-readable RAM'],
      ['df -h','Disk usage per filesystem'],
      ['du -sh /var/log','Size of a directory'],
      ['uptime','Uptime + load average'],
      ['who','Logged-in users'],
      ['w','Who + what they are running'],
      ['last -n 10','Last 10 logins']],
    flags:[
      ['free -h','Human units (Gi/Mi)'],
      ['free -s 2','Repeat every 2 seconds'],
      ['df -h','Human-readable sizes'],
      ['df -T','Show filesystem type'],
      ['du -s','Summary only (total)'],
      ['du -h --max-depth=1','One level deep, human units'],
      ['uptime -p','Pretty format ("up 3 hours")']],
    example:{cmd:'free -h', out:
`               total        used        free      shared  buff/cache   available
Mem:            31Gi       6.2Gi        18Gi       412Mi       7.4Gi        24Gi
Swap:          8.0Gi          0B       8.0Gi`} },

  { title:'Navigation & Directories', icon:'📂', badge:'NAV', color:'blue',
    cmds:[
      ['pwd','Print working directory'],
      ['cd /etc','Change directory'],
      ['cd ~','Go home'],
      ['cd -','Previous directory'],
      ['ls -la','All files, long format'],
      ['ls -lhS','Sort by size, human units'],
      ['ls -ltr','Oldest first by mtime'],
      ['tree -L 2','Directory tree, depth 2']],
    flags:[
      ['-l','Long listing (perms, owner, size, date)'],
      ['-a','Include hidden (dot) files'],
      ['-A','Hidden files, but not . and ..'],
      ['-h','Human-readable sizes'],
      ['-S','Sort by size'],
      ['-t','Sort by modification time'],
      ['-r','Reverse sort order'],
      ['-R','Recursive'],
      ['-d','List directory itself, not contents'],
      ['-Z','Show SELinux context']],
    example:{cmd:'ls -lh /etc/dnf', out:
`total 12K
-rw-r--r--. 1 root root  96 Apr 28 10:12 dnf.conf
drwxr-xr-x. 2 root root 4.0K Apr 28 10:12 libdnf5.conf.d
drwxr-xr-x. 2 root root 4.0K Apr 28 10:12 protected.d`},
    tip:'Use <kbd>Tab</kbd> for completion and <kbd>Ctrl</kbd>+<kbd>R</kbd> to search history.' },

  { title:'Help & Man Pages', icon:'📖', badge:'DOCS', color:'blue',
    cmds:[
      ['man dnf5','Manual page'],
      ['man -k network','Search man page descriptions'],
      ['man 5 fstab','Section 5 (file formats)'],
      ['info coreutils','GNU info docs'],
      ['dnf --help','Built-in help'],
      ['tldr tar','Short examples (dnf install tldr)'],
      ['whatis ls','One-line description'],
      ['which python3','Path of a command'],
      ['type cd','Builtin, alias, or file?']],
    flags:[
      ['man -k <term>','Keyword search (same as apropos)'],
      ['man -f <cmd>','Short description (same as whatis)'],
      ['man <n> <page>','1 cmds · 5 files · 8 admin'],
      ['type -a <cmd>','Every match on PATH']],
    example:{cmd:'whatis ls', out:`ls (1)               - list directory contents`} },

  { title:'Environment Variables', icon:'🌍', badge:'ENV', color:'blue',
    cmds:[
      ['env','All environment variables'],
      ['printenv PATH','One variable'],
      ['echo $HOME','Expand a variable'],
      ['export MY_VAR="value"','Set for this session'],
      ['unset MY_VAR','Remove it'],
      ["echo 'export PATH=$PATH:/opt/myapp/bin' >> ~/.bashrc",'Persist'],
      ['source ~/.bashrc','Reload shell config']],
    flags:[
      ['export VAR=val','Set + export to child processes'],
      ['env -i cmd','Run cmd with an empty environment'],
      ['env VAR=x cmd','Run cmd with one extra variable'],
      ['printenv','Print all or a named variable']],
    example:{cmd:'echo $SHELL $LANG', out:`/bin/bash en_US.UTF-8`} },

  { title:'Terminal Shortcuts', icon:'⌨️', badge:'CHEATSHEET', color:'green',
    table:{head:['Shortcut','Action'], rows:[
      ['Ctrl+C','Cancel current command'],['Ctrl+D','Exit shell / EOF'],
      ['Ctrl+Z','Suspend foreground job'],['Ctrl+L','Clear screen'],
      ['Ctrl+R','Reverse history search'],['Ctrl+A / Ctrl+E','Start / end of line'],
      ['Ctrl+U / Ctrl+K','Delete to start / end'],['Ctrl+W','Delete previous word'],
      ['Alt+.','Insert last argument'],['!!','Repeat last command'],
      ['sudo !!','Repeat last command as root'],['!$','Last argument of previous command']]} }
  ]},

/* ───────────────────────── DNF ───────────────────────── */
{ id:'dnf', icon:'📦', title:'DNF', sub:'Install / Update', desc:'dnf5 — fedora\'s default package manager since F41',
  cards:[
  { title:'Search & Info', icon:'🔍', badge:'QUERY', color:'blue',
    cmds:[
      ['dnf search nginx','Search names + summaries'],
      ['dnf info nginx','Package details'],
      ['dnf list --installed','Installed packages'],
      ['dnf list --upgrades','Packages with updates'],
      ['dnf provides /usr/bin/vim','Which package provides a file'],
      ['dnf repoquery --list vim-enhanced','Files in a package'],
      ['dnf repoquery --requires nginx','Dependencies'],
      ['dnf repoquery --whatrequires openssl','Reverse dependencies'],
      ['rpm -qi vim-enhanced','Info on an installed RPM']],
    flags:[
      ['--installed','Only installed packages'],
      ['--available','Only packages not yet installed'],
      ['--upgrades','Only packages with newer versions'],
      ['--showduplicates','All versions in repos'],
      ['--refresh','Force metadata refresh first'],
      ['-C, --cacheonly','Use cache only (offline)'],
      ['--repo=<id>','Limit to one repository'],
      ['--requires / --whatrequires','Forward / reverse deps (repoquery)']],
    example:{cmd:'dnf info htop', out:
`Available packages
Name           : htop
Epoch          : 0
Version        : 3.4.1
Release        : 1.fc44
Architecture   : x86_64
Download size  : 196.8 KiB
Repository     : fedora
Summary        : Interactive process viewer
License        : GPL-2.0-or-later`} },

  { title:'Install & Remove', icon:'⬇️', badge:'INSTALL', color:'green',
    cmds:[
      ['sudo dnf install nginx','Install package'],
      ['sudo dnf install -y vim-enhanced','Assume yes'],
      ['sudo dnf install ./app.rpm','Install local RPM + deps'],
      ['sudo dnf remove nginx','Remove package'],
      ['sudo dnf autoremove','Remove unneeded deps'],
      ['sudo dnf reinstall nginx','Reinstall'],
      ['sudo dnf swap ffmpeg-free ffmpeg --allowerasing','Replace one package with another'],
      ['dnf group list','List package groups'],
      ['sudo dnf group install development-tools','Install a group']],
    flags:[
      ['-y, --assumeyes','Answer yes to all prompts'],
      ['--allowerasing','Allow removing conflicting packages'],
      ['--skip-unavailable','Skip packages that do not exist'],
      ['--skip-broken','Skip packages with broken deps'],
      ['--downloadonly','Download but do not install'],
      ['--enablerepo=<id>','Temporarily enable a repo'],
      ['--setopt=install_weak_deps=False','Skip weak (recommended) deps'],
      ['--best','Insist on the newest version']],
    example:{cmd:'sudo dnf install -y htop', out:
`Updating and loading repositories:
Repositories loaded.
Package         Arch    Version        Repository   Size
Installing:
 htop           x86_64  3.4.1-1.fc44   fedora    458.1 KiB

Transaction Summary:
 Installing:         1 package
[1/1] htop-0:3.4.1-1.fc44.x86_64   100% | 1.2 MiB/s | 196.8 KiB
Complete!`},
    tip:'In DNF5 the old <code>groupinstall</code> alias is gone — use <code>dnf group install &lt;id&gt;</code>.' },

  { title:'Update & Upgrade', icon:'🔄', badge:'UPDATE', color:'warn',
    cmds:[
      ['dnf check-upgrade','List available updates'],
      ['sudo dnf upgrade --refresh','Upgrade everything'],
      ['sudo dnf upgrade nginx','Upgrade one package'],
      ['sudo dnf upgrade --advisory-severities=critical','Security fixes by severity'],
      ['# Release upgrade (e.g. 43 → 44):',''],
      ['sudo dnf upgrade --refresh',''],
      ['sudo dnf system-upgrade download --releasever=44',''],
      ['sudo dnf system-upgrade reboot','']],
    flags:[
      ['--refresh','Refresh metadata before upgrading'],
      ['--security','Only security updates'],
      ['--advisories=<id>','Apply a specific advisory'],
      ['--releasever=<N>','Target Fedora release (system-upgrade)'],
      ['--exclude=<pkg>','Hold back a package'],
      ['--offline','Stage the transaction to run at next boot']],
    example:{cmd:'dnf check-upgrade', out:
`Updating and loading repositories:
Repositories loaded.
firefox.x86_64            143.0.1-1.fc44     updates
kernel.x86_64             6.19.10-200.fc44   updates
mesa-dri-drivers.x86_64   26.1.3-1.fc44      updates`},
    warn:'Always fully upgrade the current release <b>before</b> a system-upgrade. The system-upgrade command is built into DNF5 — no plugin needed.' },

  { title:'Repositories', icon:'🏪', badge:'REPOS', color:'blue',
    cmds:[
      ['dnf repo list','Enabled repositories'],
      ['dnf repo list --all','All repositories'],
      ['dnf repo info fedora','Repo details'],
      ['sudo dnf config-manager addrepo --from-repofile=URL','Add a .repo file'],
      ['sudo dnf config-manager setopt rpmfusion-free.enabled=1','Enable a repo'],
      ['sudo dnf config-manager setopt repo-name.enabled=0','Disable a repo'],
      ['# RPM Fusion (free + nonfree):',''],
      ['sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm',''],
      ['sudo dnf install https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm','']],
    flags:[
      ['--all','Enabled and disabled repos'],
      ['--enabled / --disabled','Filter list'],
      ['addrepo --from-repofile=URL','Download a .repo file'],
      ['addrepo --set=baseurl=URL','Create repo from a base URL'],
      ['setopt <repo>.<opt>=<val>','Persist a repo option']],
    example:{cmd:'dnf repo list', out:
`repo id                    repo name
fedora                     Fedora 44 - x86_64
fedora-cisco-openh264      Fedora 44 openh264 (From Cisco) - x86_64
updates                    Fedora 44 - x86_64 - Updates
rpmfusion-free             RPM Fusion for Fedora 44 - Free`},
    tip:'<code>rpm -E %fedora</code> expands to your release number (44), so the same line works on every version.' },

  { title:'History & Cache', icon:'🕒', badge:'HISTORY', color:'blue',
    cmds:[
      ['dnf history list','Transaction history'],
      ['dnf history info 5','Details of transaction 5'],
      ['sudo dnf history undo 5','Undo transaction 5'],
      ['sudo dnf history redo 5','Repeat transaction 5'],
      ['sudo dnf history rollback 3','Roll back to state after #3'],
      ['sudo dnf clean all','Clear all caches'],
      ['sudo dnf makecache','Rebuild metadata cache']],
    flags:[
      ['history list --reverse','Oldest first'],
      ['history info <id>','Packages + command used'],
      ['clean all | packages | metadata','What to purge']],
    example:{cmd:'dnf history list', out:
`ID Command line                  Date and time       Action(s) Altered
 7 dnf install -y htop           2026-09-29 21:14:03                 1
 6 dnf upgrade --refresh         2026-09-27 09:02:41                38
 5 dnf install podman-compose    2026-09-20 18:33:10                 4`} }
  ]},

/* ───────────────────────── FILES ───────────────────────── */
{ id:'files', icon:'📁', title:'Files', sub:'Filesystem ops', desc:'file operations, permissions, ownership, links',
  cards:[
  { title:'Copy · Move · Delete', icon:'📄', badge:'FILES', color:'blue',
    cmds:[
      ['cp file.txt /tmp/','Copy file'],
      ['cp -r dir/ /tmp/','Copy directory'],
      ['cp -a src/ backup/','Archive copy (keeps perms, links, times)'],
      ['mv old.txt new.txt','Rename / move'],
      ['rm file.txt','Delete file'],
      ['rm -ri dir/','Delete dir, confirm each'],
      ['mkdir -p /opt/app/conf','Create nested dirs'],
      ['touch newfile.txt','Create empty file / update mtime'],
      ['ln -s /etc/nginx ~/nginx','Symbolic link'],
      ['ln file.txt hard.txt','Hard link']],
    flags:[
      ['cp -r / -R','Recursive'],
      ['cp -a','Archive: -dR --preserve=all'],
      ['cp -i / mv -i','Prompt before overwrite'],
      ['cp -u','Only when source is newer'],
      ['cp -v / mv -v','Verbose'],
      ['mv -n','Never overwrite'],
      ['rm -f','Force, no prompts'],
      ['rm -I','Prompt once for 3+ files'],
      ['mkdir -p','Create parents, no error if exists'],
      ['ln -sf','Replace an existing link']],
    example:{cmd:'cp -av project/ /tmp/backup/', out:
`'project/' -> '/tmp/backup/'
'project/README.md' -> '/tmp/backup/README.md'
'project/src' -> '/tmp/backup/src'
'project/src/main.py' -> '/tmp/backup/src/main.py'`},
    danger:'<code>rm -rf</code> is irreversible. Double-check the path — especially as root and with variables.' },

  { title:'Find & Search', icon:'🔎', badge:'SEARCH', color:'blue',
    cmds:[
      ['find /etc -name "*.conf"','By name'],
      ['find /var -type f -size +100M','Files over 100 MB'],
      ['find . -mtime -7','Modified in last 7 days'],
      ['find . -perm 777','World-writable'],
      ['find . -name "*.log" -delete','Find & delete'],
      ['find . -type f -exec chmod 644 {} +','Run a command on matches'],
      ['plocate nginx.conf','Fast indexed lookup'],
      ['grep -rn "error" /etc/nginx','Recursive with line numbers'],
      ['grep -rl "pattern" .','Only filenames']],
    flags:[
      ['-name / -iname','Match name (case-insensitive)'],
      ['-type f|d|l','File, directory, symlink'],
      ['-size +N[kMG]','Larger than N'],
      ['-mtime -N','Modified < N days ago'],
      ['-user / -group','By owner'],
      ['-maxdepth N','Limit recursion'],
      ['-exec cmd {} +','Run cmd on results'],
      ['grep -i','Ignore case'],
      ['grep -v','Invert match'],
      ['grep -E','Extended regex'],
      ['grep -C N','N lines of context']],
    example:{cmd:'find /var/log -type f -size +10M', out:
`/var/log/journal/3f9c2a7d8e1b/system.journal
/var/log/journal/3f9c2a7d8e1b/user-1000.journal`} },

  { title:'Permissions & Ownership', icon:'🔐', badge:'PERMS', color:'warn',
    desc:'<code>rwx</code> = read / write / execute, for user / group / other.',
    cmds:[
      ['chmod 755 script.sh','rwxr-xr-x'],
      ['chmod 644 config.conf','rw-r--r--'],
      ['chmod 600 ~/.ssh/id_ed25519','rw------- (private key)'],
      ['chmod +x script.sh','Add execute'],
      ['chmod u+rw,g-w,o-rwx file','Symbolic mode'],
      ['chown user:group file.txt','Owner + group'],
      ['chown -R nginx:nginx /var/www','Recursive'],
      ['chgrp developers project/','Group only'],
      ['setfacl -m u:alice:rw file','ACL: extra user access'],
      ['getfacl file','Show ACLs']],
    flags:[
      ['-R','Recursive'],
      ['-v / -c','Verbose / report only changes'],
      ['u g o a','User, group, other, all'],
      ['+ - =','Add, remove, set exactly'],
      ['--reference=<file>','Copy mode/owner from file'],
      ['setfacl -m / -x','Modify / remove ACL entry']],
    table:{head:['Octal','Symbolic','Meaning'], rows:[
      ['7','rwx','Read + write + execute'],['6','rw-','Read + write'],
      ['5','r-x','Read + execute'],['4','r--','Read only'],['0','---','Nothing']]},
    example:{cmd:'stat -c "%A %a %U:%G %n" script.sh', out:`-rwxr-xr-x 755 sooraj:sooraj script.sh`} },

  { title:'Viewing & Editing Text', icon:'📝', badge:'TEXT', color:'blue',
    cmds:[
      ['cat file.txt','Print file'],
      ['less file.txt','Page through (q quits)'],
      ['head -n 20 file.txt','First 20 lines'],
      ['tail -n 50 file.txt','Last 50 lines'],
      ['tail -f app.log','Follow a growing file'],
      ['wc -l file.txt','Count lines'],
      ['sort -u file.txt','Sort, unique'],
      ['diff -u a.txt b.txt','Unified diff'],
      ["sed -i 's/old/new/g' file",'Replace in place'],
      ["awk -F: '{print $1}' /etc/passwd",'First field']],
    flags:[
      ['cat -n','Number lines'],
      ['tail -f / -F','Follow (-F survives rotation)'],
      ['sort -n / -r / -k2','Numeric / reverse / by column 2'],
      ['uniq -c','Count duplicates (after sort)'],
      ['sed -i','Edit in place'],
      ['sed -n','Print only matched lines'],
      ['awk -F','Field separator']],
    example:{cmd:"awk -F: '$3>=1000 {print $1}' /etc/passwd", out:`sooraj
alice
bob`} },

  { title:'Archives & Compression', icon:'🗜️', badge:'ARCHIVE', color:'blue',
    cmds:[
      ['tar -czf archive.tar.gz dir/','Create gzip archive'],
      ['tar -xzf archive.tar.gz','Extract'],
      ['tar -xf archive.tar.gz -C /opt/','Extract into a dir'],
      ['tar -tf archive.tar.gz','List contents'],
      ['tar -cJf archive.tar.xz dir/','xz (smaller)'],
      ['tar --zstd -cf archive.tar.zst dir/','zstd (fast)'],
      ['zip -r archive.zip dir/','Create zip'],
      ['unzip archive.zip -d out/','Extract zip']],
    flags:[
      ['-c / -x / -t','Create / extract / list'],
      ['-f <file>','Archive filename'],
      ['-z / -j / -J','gzip / bzip2 / xz'],
      ['--zstd','zstd compression'],
      ['-v','Verbose'],
      ['-C <dir>','Change to dir first'],
      ['--exclude=<pat>','Skip matching files']],
    example:{cmd:'tar -tvf backup.tar.gz', out:
`drwxr-xr-x sooraj/sooraj    0 2026-09-29 20:10 project/
-rw-r--r-- sooraj/sooraj  812 2026-09-29 20:08 project/README.md
-rw-r--r-- sooraj/sooraj 4213 2026-09-29 20:09 project/src/main.py`},
    tip:'Modern GNU tar auto-detects compression on extract — <code>tar -xf file</code> works for .gz, .xz, .zst.' }
  ]},

/* ───────────────────────── USERS ───────────────────────── */
{ id:'users', icon:'👤', title:'Users', sub:'Accounts & sudo', desc:'manage users, groups, sudo and authentication',
  cards:[
  { title:'User Management', icon:'👤', badge:'USERS', color:'blue',
    cmds:[
      ['sudo useradd -m -s /bin/bash alice','Create with home + shell'],
      ['sudo useradd -m -G wheel alice','Create + sudo access'],
      ['sudo passwd alice','Set password'],
      ['sudo usermod -aG docker alice','Append to a group'],
      ['sudo usermod -s /bin/zsh alice','Change shell'],
      ['sudo usermod -L alice','Lock account'],
      ['sudo chage -l alice','Password ageing info'],
      ['sudo userdel -r alice','Delete user + home'],
      ['id alice','UID / GIDs'],
      ['whoami','Current user']],
    flags:[
      ['-m','Create home directory'],
      ['-s <shell>','Login shell'],
      ['-G <g1,g2>','Supplementary groups'],
      ['-aG','Append to groups (usermod — never omit -a)'],
      ['-u <uid>','Specific UID'],
      ['-c "<text>"','Comment / full name'],
      ['-L / -U','Lock / unlock'],
      ['-e YYYY-MM-DD','Account expiry']],
    example:{cmd:'id alice', out:`uid=1001(alice) gid=1001(alice) groups=1001(alice),10(wheel)`},
    warn:'<code>usermod -G</code> without <code>-a</code> <b>replaces</b> all supplementary groups.' },

  { title:'Group Management', icon:'👥', badge:'GROUPS', color:'blue',
    cmds:[
      ['sudo groupadd developers','Create group'],
      ['sudo groupdel developers','Delete group'],
      ['groups alice','Groups of a user'],
      ['getent group developers','Group entry'],
      ['getent passwd alice','User entry'],
      ['sudo gpasswd -a alice developers','Add member'],
      ['sudo gpasswd -d alice developers','Remove member'],
      ['newgrp developers','Switch active group now']],
    flags:[
      ['groupadd -g <gid>','Specific GID'],
      ['groupadd -r','System group'],
      ['gpasswd -a / -d','Add / delete member'],
      ['gpasswd -M a,b,c','Set member list']],
    example:{cmd:'getent group wheel', out:`wheel:x:10:sooraj,alice`} },

  { title:'Sudo & Privileges', icon:'🛡️', badge:'SUDO', color:'warn',
    cmds:[
      ['sudo command','Run as root'],
      ['sudo -i','Root login shell'],
      ['sudo -l','What can I run?'],
      ['sudo -u alice command','Run as another user'],
      ['sudo visudo','Safely edit /etc/sudoers'],
      ['sudo visudo -f /etc/sudoers.d/alice','Drop-in file'],
      ['# sudoers examples:',''],
      ['alice ALL=(ALL) ALL','Full access'],
      ['alice ALL=(ALL) /usr/bin/dnf','Only dnf']],
    flags:[
      ['-i','Interactive login shell as root'],
      ['-s','Shell as root, keep env'],
      ['-u <user>','Run as user'],
      ['-l','List privileges'],
      ['-k','Forget cached credentials'],
      ['-E','Preserve environment'],
      ['visudo -c','Check syntax']],
    example:{cmd:'sudo -l', out:
`User sooraj may run the following commands on fedora-ws:
    (ALL) ALL`},
    warn:'Always use <code>visudo</code> — it validates syntax and prevents lockouts.' }
  ]},

/* ───────────────────────── NETWORK ───────────────────────── */
{ id:'network', icon:'🌐', title:'Network', sub:'nmcli / ip / ss', desc:'nmcli, ip, ss, diagnostics and dns',
  cards:[
  { title:'IP & Interfaces', icon:'📡', badge:'IP', color:'blue',
    cmds:[
      ['ip -br addr','Brief address list'],
      ['ip addr show dev enp3s0','One interface'],
      ['ip link','Links + MAC'],
      ['ip route','Routing table'],
      ['ip route get 1.1.1.1','Which route is used'],
      ['ip neigh','ARP / neighbour table'],
      ['hostname -I','All IP addresses'],
      ['ss -tulpn','Listening sockets + process'],
      ['ss -s','Socket summary']],
    flags:[
      ['ip -br','Brief, tabular'],
      ['ip -c','Colour output'],
      ['ip -4 / -6','IPv4 / IPv6 only'],
      ['ss -t / -u','TCP / UDP'],
      ['ss -l','Listening only'],
      ['ss -n','Numeric (no DNS)'],
      ['ss -p','Show process']],
    example:{cmd:'ip -br addr', out:
`lo               UNKNOWN        127.0.0.1/8 ::1/128
enp3s0           UP             192.168.1.42/24 fe80::a2b3:c4ff:fe5d:6e7f/64
wlp4s0           DOWN`},
    tip:'<code>netstat</code> / <code>ifconfig</code> need the legacy <code>net-tools</code> package — prefer <code>ss</code> and <code>ip</code>.' },

  { title:'NetworkManager (nmcli)', icon:'🔌', badge:'NMCLI', color:'blue',
    cmds:[
      ['nmcli device status','Devices'],
      ['nmcli connection show','Connections'],
      ['nmcli connection up "Wired 1"','Activate'],
      ['nmcli connection down "Wired 1"','Deactivate'],
      ['# Static IP:',''],
      ['nmcli con mod "Wired 1" ipv4.addresses 192.168.1.10/24',''],
      ['nmcli con mod "Wired 1" ipv4.gateway 192.168.1.1',''],
      ['nmcli con mod "Wired 1" ipv4.dns "1.1.1.1 9.9.9.9"',''],
      ['nmcli con mod "Wired 1" ipv4.method manual',''],
      ['nmcli con up "Wired 1"',''],
      ['# Wi-Fi:',''],
      ['nmcli dev wifi list',''],
      ['nmcli dev wifi connect "SSID" --ask','Prompt for password'],
      ['nmtui','Text UI']],
    flags:[
      ['-t','Terse, script-friendly'],
      ['-f <fields>','Choose fields'],
      ['-p','Pretty output'],
      ['--ask','Prompt for secrets'],
      ['ipv4.method auto|manual','DHCP or static'],
      ['+ipv4.dns <ip>','Append rather than replace']],
    example:{cmd:'nmcli device status', out:
`DEVICE   TYPE      STATE                   CONNECTION
enp3s0   ethernet  connected               Wired 1
wlp4s0   wifi      disconnected            --
lo       loopback  connected (externally)  lo`},
    tip:'<code>--ask</code> keeps the Wi-Fi password out of your shell history.' },

  { title:'Diagnostics & Testing', icon:'🏓', badge:'DIAG', color:'blue',
    cmds:[
      ['ping -c 4 fedoraproject.org','4 pings'],
      ['tracepath fedoraproject.org','Trace route (no root)'],
      ['mtr fedoraproject.org','Live ping + traceroute'],
      ['dig fedoraproject.org','DNS query'],
      ['dig +short fedoraproject.org','Just the IPs'],
      ['curl -I https://fedoraproject.org','HTTP headers'],
      ['curl -LO URL','Download, keep name'],
      ['nc -zv 192.168.1.1 22','Is a port open?'],
      ['nmap -sn 192.168.1.0/24','Hosts on your subnet']],
    flags:[
      ['ping -c N','Stop after N packets'],
      ['ping -i S','Interval seconds'],
      ['dig +short','Answer only'],
      ['dig @1.1.1.1','Ask a specific server'],
      ['dig -x <ip>','Reverse lookup'],
      ['curl -I','Headers only'],
      ['curl -L','Follow redirects'],
      ['curl -o / -O','Save as name / remote name'],
      ['nc -z -v','Scan, verbose']],
    example:{cmd:'ping -c 3 fedoraproject.org', out:
`PING fedoraproject.org (38.145.60.21) 56(84) bytes of data.
64 bytes from 38.145.60.21: icmp_seq=1 ttl=51 time=182 ms
64 bytes from 38.145.60.21: icmp_seq=2 ttl=51 time=181 ms
64 bytes from 38.145.60.21: icmp_seq=3 ttl=51 time=183 ms

--- fedoraproject.org ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms`},
    warn:'Only scan networks you own or are authorised to test.' },

  { title:'Hostname & DNS', icon:'🗃️', badge:'DNS', color:'blue',
    cmds:[
      ['hostnamectl hostname','Show hostname'],
      ['sudo hostnamectl hostname myserver','Set hostname'],
      ['cat /etc/hosts','Local host entries'],
      ['resolvectl status','systemd-resolved status'],
      ['resolvectl query fedoraproject.org','Resolve via resolved'],
      ['resolvectl flush-caches','Flush DNS cache']],
    flags:[
      ['resolvectl status <iface>','Per-interface DNS'],
      ['resolvectl statistics','Cache hit stats'],
      ['hostnamectl --static','Static hostname only']],
    example:{cmd:'resolvectl query fedoraproject.org', out:
`fedoraproject.org: 38.145.60.21          -- link: enp3s0
                   38.145.60.20          -- link: enp3s0

-- Information acquired via protocol DNS in 21.4ms.`},
    tip:'<code>systemd-resolve</code> is the old name — use <code>resolvectl</code>. /etc/resolv.conf is managed by systemd-resolved on Fedora.' }
  ]},

/* ───────────────────────── SERVICES ───────────────────────── */
{ id:'services', icon:'⚙️', title:'Services', sub:'systemd units', desc:'manage services and units with systemctl',
  cards:[
  { title:'Service Control', icon:'▶️', badge:'CONTROL', color:'blue',
    cmds:[
      ['sudo systemctl start nginx','Start'],
      ['sudo systemctl stop nginx','Stop'],
      ['sudo systemctl restart nginx','Restart'],
      ['sudo systemctl reload nginx','Reload config'],
      ['sudo systemctl enable --now nginx','Enable at boot + start'],
      ['sudo systemctl disable --now nginx','Disable + stop'],
      ['sudo systemctl mask nginx','Prevent any start'],
      ['systemctl status nginx','Status + recent logs'],
      ['systemctl is-active nginx','active / inactive'],
      ['systemctl list-units --type=service --state=running',''],
      ['systemctl --failed','Failed units']],
    flags:[
      ['--now','Also start/stop immediately'],
      ['--user','Manage your user units'],
      ['--type=<t>','service, timer, socket, mount'],
      ['--state=<s>','running, failed, enabled'],
      ['-l, --full','Don\'t truncate lines'],
      ['--no-pager','Plain output'],
      ['-H user@host','Run against a remote host']],
    example:{cmd:'systemctl status sshd', out:
`● sshd.service - OpenSSH server daemon
     Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; preset: disabled)
     Active: active (running) since Tue 2026-09-29 08:14:22 +03; 15h ago
   Main PID: 1123 (sshd)
      Tasks: 1 (limit: 37912)
     Memory: 3.4M
     CGroup: /system.slice/sshd.service
             └─1123 "sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups"`} },

  { title:'Targets & Power', icon:'🔌', badge:'TARGETS', color:'blue',
    cmds:[
      ['systemctl get-default','Default target'],
      ['sudo systemctl set-default multi-user.target','Boot to CLI'],
      ['sudo systemctl set-default graphical.target','Boot to GUI'],
      ['sudo systemctl isolate rescue.target','Switch now'],
      ['systemctl poweroff','Power off'],
      ['systemctl reboot','Reboot'],
      ['systemctl suspend','Suspend'],
      ['systemctl soft-reboot','Restart userspace only']],
    table:{head:['Target','Runlevel','Description'], rows:[
      ['poweroff.target','0','Shutdown'],['rescue.target','1','Single user'],
      ['multi-user.target','3','Multi-user, no GUI'],['graphical.target','5','Multi-user + GUI'],
      ['reboot.target','6','Reboot']]},
    example:{cmd:'systemctl get-default', out:`graphical.target`} },

  { title:'Custom Service Unit', icon:'📝', badge:'CREATE', color:'green',
    desc:'Save as <code>/etc/systemd/system/myapp.service</code>.',
    code:
`[Unit]
Description=My Application
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=myuser
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/myapp --config /etc/myapp.conf
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target`,
    cmds:[
      ['sudo systemctl daemon-reload','Reload unit files'],
      ['sudo systemctl enable --now myapp',''],
      ['sudo systemctl edit myapp','Drop-in override'],
      ['systemctl cat myapp','Show effective unit']],
    flags:[
      ['Type=simple|exec|forking|oneshot|notify','Startup style'],
      ['Restart=on-failure|always','Restart policy'],
      ['User= / Group=','Run as'],
      ['Environment=KEY=val','Set env vars'],
      ['ProtectSystem=strict','Read-only /usr, /etc'],
      ['PrivateTmp=yes','Isolated /tmp']],
    example:{cmd:'systemctl is-enabled myapp', out:`enabled`} },

  { title:'Timers (cron replacement)', icon:'⏰', badge:'TIMERS', color:'blue',
    cmds:[
      ['systemctl list-timers','Scheduled timers'],
      ['sudo systemctl enable --now backup.timer','Enable a timer'],
      ['systemd-analyze calendar "Mon *-*-* 02:00"','Test a schedule'],
      ['systemd-run --on-active=10m touch /tmp/done','One-off in 10 min']],
    code:
`# /etc/systemd/system/backup.timer
[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target`,
    flags:[
      ['OnCalendar=','daily, weekly, Mon 02:00 …'],
      ['OnBootSec=','Delay after boot'],
      ['Persistent=true','Catch up missed runs'],
      ['RandomizedDelaySec=','Spread load']],
    example:{cmd:'systemctl list-timers --no-pager', out:
`NEXT                        LEFT      LAST                        PASSED  UNIT                  ACTIVATES
Wed 2026-09-30 01:00:00 +03 58min     Tue 2026-09-29 01:00:02 +03 23h ago dnf-makecache.timer   dnf-makecache.service
Wed 2026-09-30 02:00:00 +03 1h 58min  Tue 2026-09-29 02:00:00 +03 22h ago backup.timer          backup.service`} }
  ]},

/* ───────────────────────── FIREWALL ───────────────────────── */
{ id:'firewall', icon:'🔥', title:'Firewall', sub:'firewalld', desc:'zone-based firewall with firewall-cmd',
  cards:[
  { title:'Zones & Status', icon:'🧱', badge:'ZONES', color:'blue',
    cmds:[
      ['sudo firewall-cmd --state','running?'],
      ['sudo firewall-cmd --list-all','Active zone rules'],
      ['sudo firewall-cmd --get-active-zones','Zones in use'],
      ['sudo firewall-cmd --get-default-zone',''],
      ['sudo firewall-cmd --set-default-zone=home',''],
      ['sudo firewall-cmd --zone=home --change-interface=wlp4s0 --permanent','Move interface']],
    flags:[
      ['--zone=<z>','Target a zone (else default)'],
      ['--list-all','Everything in the zone'],
      ['--list-all-zones','Every zone'],
      ['--get-services','Known service names'],
      ['--permanent','Write to config (needs --reload)']],
    table:{head:['Zone','Behaviour'], rows:[
      ['drop','Silently drop all incoming'],['block','Reject incoming'],
      ['public','Default server zone — selected services'],
      ['FedoraWorkstation','Workstation default — high ports open'],
      ['home / work','More trusted LANs'],['trusted','Accept everything']]},
    example:{cmd:'sudo firewall-cmd --list-all', out:
`FedoraWorkstation (default, active)
  target: default
  interfaces: enp3s0
  services: dhcpv6-client mdns samba-client ssh
  ports: 1025-65535/udp 1025-65535/tcp
  forward: yes
  masquerade: no
  rich rules:`} },

  { title:'Open Ports & Services', icon:'🔓', badge:'PORTS', color:'warn',
    cmds:[
      ['sudo firewall-cmd --add-service=http --permanent',''],
      ['sudo firewall-cmd --add-service=https --permanent',''],
      ['sudo firewall-cmd --add-port=8080/tcp --permanent',''],
      ['sudo firewall-cmd --add-port=5000-5010/tcp --permanent','Port range'],
      ['sudo firewall-cmd --remove-service=http --permanent',''],
      ['sudo firewall-cmd --reload','Apply permanent config'],
      ['sudo firewall-cmd --add-port=3000/tcp --timeout=1h','Temporary rule'],
      ['sudo firewall-cmd --runtime-to-permanent','Save runtime rules']],
    flags:[
      ['--add-service / --remove-service','By service name'],
      ['--add-port=N/proto','tcp or udp'],
      ['--permanent','Persist (not active until reload)'],
      ['--reload','Load permanent config'],
      ['--timeout=<t>','Auto-expire runtime rule'],
      ['--runtime-to-permanent','Commit current runtime']],
    example:{cmd:'sudo firewall-cmd --add-service=https --permanent && sudo firewall-cmd --reload', out:
`success
success`},
    tip:'<code>--permanent</code> alone doesn\'t change the live firewall — follow with <code>--reload</code>, or test live first and then <code>--runtime-to-permanent</code>.' },

  { title:'Rich Rules & Forwarding', icon:'🔄', badge:'ADVANCED', color:'blue',
    cmds:[
      ['sudo firewall-cmd --permanent --add-rich-rule=\'rule family="ipv4" source address="192.168.1.0/24" service name="ssh" accept\'','LAN-only SSH'],
      ['sudo firewall-cmd --permanent --add-rich-rule=\'rule family="ipv4" source address="10.0.0.5" drop\'','Block an IP'],
      ['sudo firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=8080','Port forward'],
      ['sudo firewall-cmd --permanent --add-masquerade','NAT'],
      ['sudo firewall-cmd --list-rich-rules','']],
    flags:[
      ['family="ipv4|ipv6"','Address family'],
      ['source address=','IP / CIDR'],
      ['service name= | port port= protocol=','Match'],
      ['accept | reject | drop','Action'],
      ['log prefix="x" level="info"','Log matches']],
    example:{cmd:'sudo firewall-cmd --list-rich-rules', out:
`rule family="ipv4" source address="192.168.1.0/24" service name="ssh" accept
rule family="ipv4" source address="10.0.0.5" drop`} }
  ]},

/* ───────────────────────── SELINUX ───────────────────────── */
{ id:'selinux', icon:'🔒', title:'SELinux', sub:'Mandatory access', desc:'security-enhanced linux — mandatory access control',
  cards:[
  { title:'Status & Modes', icon:'🔍', badge:'STATUS', color:'blue',
    cmds:[
      ['getenforce','Enforcing / Permissive'],
      ['sestatus','Detailed status'],
      ['sudo setenforce 0','Permissive (until reboot)'],
      ['sudo setenforce 1','Enforcing'],
      ['sudo semanage permissive -a httpd_t','Permissive for ONE domain'],
      ['# Persistent: /etc/selinux/config',''],
      ['SELINUX=enforcing','']],
    flags:[
      ['setenforce 0|1','Permissive | Enforcing (runtime)'],
      ['sestatus -v','Also show contexts of key files'],
      ['semanage permissive -a / -d','Add / remove per-domain permissive']],
    example:{cmd:'sestatus', out:
`SELinux status:                 enabled
SELinuxfs mount:                /sys/fs/selinux
Loaded policy name:             targeted
Current mode:                   enforcing
Mode from config file:          enforcing
Policy MLS status:              enabled
Max kernel policy version:      33`},
    warn:'Keep SELinux <b>enforcing</b>. Debug with a per-domain permissive rule instead of switching the whole system.' },

  { title:'Labels & Contexts', icon:'🏷️', badge:'CONTEXT', color:'blue',
    cmds:[
      ['ls -Z /var/www/html','File contexts'],
      ['ps -eZ | grep httpd','Process contexts'],
      ['id -Z','Your context'],
      ['sudo semanage fcontext -a -t httpd_sys_content_t "/srv/www(/.*)?"','Persistent rule'],
      ['sudo restorecon -Rv /srv/www','Apply rules'],
      ['sudo chcon -t httpd_sys_content_t /srv/tmp','Temporary relabel'],
      ['sudo semanage port -a -t http_port_t -p tcp 8081','Allow service on new port'],
      ['matchpathcon /srv/www','What label should be']],
    flags:[
      ['-Z','Show context (ls, ps, id, cp)'],
      ['restorecon -R -v','Recursive, verbose'],
      ['restorecon -n','Dry run'],
      ['semanage fcontext -a -t <type>','Add file rule'],
      ['semanage port -l','List port labels']],
    example:{cmd:'ls -Z /var/www/html', out:
`unconfined_u:object_r:httpd_sys_content_t:s0 index.html
unconfined_u:object_r:httpd_sys_content_t:s0 style.css`},
    tip:'<code>chcon</code> changes are lost on relabel. Use <code>semanage fcontext</code> + <code>restorecon</code>.' },

  { title:'Booleans & Troubleshooting', icon:'🚦', badge:'BOOLEANS', color:'warn',
    cmds:[
      ['getsebool -a | grep httpd','Booleans'],
      ['sudo setsebool -P httpd_can_network_connect on','Persistently enable'],
      ['sudo ausearch -m avc -ts recent','Recent denials'],
      ['sudo sealert -a /var/log/audit/audit.log','Human explanations'],
      ['sudo audit2why -a','Why it was denied'],
      ['sudo audit2allow -a -M mypol','Build a module'],
      ['sudo semodule -i mypol.pp','Install module']],
    flags:[
      ['setsebool -P','Persist across reboots'],
      ['ausearch -m avc','AVC denials'],
      ['ausearch -ts recent|today','Time window'],
      ['audit2allow -M <name>','Write .te/.pp module'],
      ['semodule -l / -r','List / remove modules']],
    example:{cmd:'sudo ausearch -m avc -ts recent', out:
`----
time->Tue Sep 29 22:41:07 2026
type=AVC msg=audit(1759174867.412:512): avc:  denied  { name_connect } for  pid=2210
  comm="php-fpm" dest=5432 scontext=system_u:system_r:httpd_t:s0
  tcontext=system_u:object_r:postgresql_port_t:s0 tclass=tcp_socket permissive=0`},
    tip:'Look for a boolean (<code>audit2why</code> often names one) before writing a custom module.' }
  ]},

/* ───────────────────────── DISK ───────────────────────── */
{ id:'disk', icon:'💾', title:'Disk', sub:'Storage, LVM, Btrfs', desc:'disks, mounts, lvm and btrfs',
  cards:[
  { title:'Disks & Partitions', icon:'🗂️', badge:'DISK', color:'blue',
    cmds:[
      ['lsblk -f','Tree with filesystems'],
      ['df -hT','Usage + type'],
      ['sudo fdisk -l','All partition tables'],
      ['sudo parted /dev/sdb print','Partition table'],
      ['sudo blkid','UUIDs + types'],
      ['findmnt','Mount tree'],
      ['sudo smartctl -a /dev/nvme0n1','Drive health (smartmontools)'],
      ['iostat -xz 1','I/O stats (sysstat)']],
    flags:[
      ['lsblk -f','Filesystem, label, UUID'],
      ['lsblk -o NAME,SIZE,TYPE,MOUNTPOINTS','Pick columns'],
      ['df -h / -T / -i','Human / type / inodes'],
      ['fdisk -l','List only'],
      ['smartctl -H','Health verdict only']],
    example:{cmd:'lsblk -f', out:
`NAME        FSTYPE FSVER LABEL                 UUID                                 MOUNTPOINTS
nvme0n1
├─nvme0n1p1 vfat   FAT32                       7A1C-3E2F                            /boot/efi
├─nvme0n1p2 ext4   1.0                         5d1b...e7a2                          /boot
└─nvme0n1p3 btrfs        fedora_fedora         9e3f...1c44                          /home /`} },

  { title:'Mount & fstab', icon:'🔗', badge:'MOUNT', color:'blue',
    cmds:[
      ['sudo mount /dev/sdb1 /mnt/data','Mount'],
      ['sudo umount /mnt/data','Unmount'],
      ['sudo mount -a','Mount all in fstab'],
      ['sudo findmnt --verify','Check fstab for errors'],
      ['sudo systemctl daemon-reload','After editing fstab'],
      ['# fstab: UUID  mountpoint  type  options  dump  pass',''],
      ['UUID=5d1b...e7a2  /mnt/data  ext4  defaults,noatime  0  2','']],
    flags:[
      ['-t <type>','Filesystem type'],
      ['-o ro|rw|noatime','Mount options'],
      ['-o remount,rw','Remount read-write'],
      ['umount -l','Lazy unmount'],
      ['nofail','fstab: don\'t block boot if missing'],
      ['x-systemd.automount','fstab: mount on first access']],
    example:{cmd:'sudo findmnt --verify', out:
`/mnt/data
   [W] target is not a directory
0 parse errors, 0 errors, 1 warning`},
    warn:'A broken fstab entry can drop you into emergency mode. Run <code>findmnt --verify</code> and add <code>nofail</code> for removable disks.' },

  { title:'Btrfs (Fedora default)', icon:'🌳', badge:'BTRFS', color:'green',
    cmds:[
      ['sudo btrfs filesystem usage /','Real space usage'],
      ['sudo btrfs subvolume list /','Subvolumes'],
      ['sudo btrfs subvolume snapshot -r /home /home/.snap-$(date +%F)','Read-only snapshot'],
      ['sudo btrfs scrub start /','Verify checksums'],
      ['sudo btrfs scrub status /',''],
      ['sudo btrfs balance start -dusage=50 /','Compact chunks']],
    flags:[
      ['subvolume snapshot -r','Read-only snapshot'],
      ['subvolume delete','Remove subvolume/snapshot'],
      ['filesystem usage -T','Tabular'],
      ['balance -dusage=N','Only data chunks ≤ N% full'],
      ['compress=zstd:1','Mount option Fedora uses']],
    example:{cmd:'sudo btrfs subvolume list /', out:
`ID 256 gen 48213 top level 5 path home
ID 257 gen 48219 top level 5 path root
ID 258 gen 47110 top level 5 path var/lib/machines`},
    tip:'Fedora Workstation has used Btrfs with transparent zstd compression by default since F33.' },

  { title:'LVM', icon:'📦', badge:'LVM', color:'warn',
    cmds:[
      ['sudo pvs && sudo vgs && sudo lvs','Summary'],
      ['sudo pvcreate /dev/sdb','Physical volume'],
      ['sudo vgcreate vg_data /dev/sdb','Volume group'],
      ['sudo vgextend vg_data /dev/sdc','Add disk'],
      ['sudo lvcreate -L 50G -n lv_web vg_data','Logical volume'],
      ['sudo mkfs.xfs /dev/vg_data/lv_web','Format'],
      ['sudo lvextend -r -L +20G /dev/vg_data/lv_web','Grow LV + filesystem']],
    flags:[
      ['-L <size>','Absolute size (50G)'],
      ['-L +<size>','Grow by'],
      ['-l 100%FREE','Use all free extents'],
      ['-n <name>','LV name'],
      ['-r, --resizefs','Resize filesystem too'],
      ['-s','Create snapshot LV']],
    example:{cmd:'sudo lvs', out:
`  LV     VG      Attr       LSize  Pool Origin Data%  Meta%
  lv_web vg_data -wi-ao---- 70.00g`},
    tip:'<code>lvextend -r</code> grows XFS or ext4 in one step — no separate xfs_growfs/resize2fs needed.' }
  ]},

/* ───────────────────────── PROCESSES ───────────────────────── */
{ id:'process', icon:'🔄', title:'Processes', sub:'Monitor & control', desc:'monitor, signal and schedule processes',
  cards:[
  { title:'Process Monitoring', icon:'👁️', badge:'MONITOR', color:'blue',
    cmds:[
      ['ps aux','All processes'],
      ['ps -ef --forest','Tree with parents'],
      ['ps aux --sort=-%mem | head','Top memory users'],
      ['top','Interactive viewer'],
      ['htop','Enhanced top'],
      ['btop','Modern dashboard'],
      ['pgrep -a nginx','PIDs + command line'],
      ['pstree -p','Tree with PIDs'],
      ['sudo lsof -i :80','Who uses port 80'],
      ['sudo strace -p 1234','Trace syscalls']],
    flags:[
      ['ps aux','BSD style: all users, with user col'],
      ['ps -ef','POSIX style: full format'],
      ['--sort=-%cpu','Sort descending'],
      ['-o pid,comm,%mem','Custom columns'],
      ['pgrep -a / -u <user>','Full cmd / by user'],
      ['top -o %MEM','Sort by memory']],
    example:{cmd:'ps aux --sort=-%mem | head -4', out:
`USER       PID %CPU %MEM    VSZ   RSS TTY  STAT START   TIME COMMAND
sooraj    3120  4.1  6.8 12.1g 2.1g ?    Sl   08:20  12:44 /usr/lib64/firefox/firefox
sooraj    2011  1.3  2.4  5.6g 790m ?    Ssl  08:15   3:02 /usr/bin/gnome-shell
sooraj    4410  0.7  1.9  3.2g 610m ?    Sl   09:02   1:10 /usr/share/code/code`} },

  { title:'Kill & Signals', icon:'⚡', badge:'KILL', color:'red',
    cmds:[
      ['kill 1234','SIGTERM (graceful)'],
      ['kill -9 1234','SIGKILL (force)'],
      ['kill -HUP 1234','Reload'],
      ['killall firefox','By exact name'],
      ['pkill -f "python app.py"','Match full command line'],
      ['pkill -u alice','All of a user\'s processes'],
      ['kill -l','List signals']],
    flags:[
      ['-s <SIG> / -<N>','Signal to send'],
      ['pkill -f','Match whole command line'],
      ['pkill -x','Exact name only'],
      ['killall -i','Ask before each']],
    table:{head:['Signal','No.','Meaning'], rows:[
      ['SIGHUP','1','Hang up / reload'],['SIGINT','2','Interrupt (Ctrl+C)'],
      ['SIGKILL','9','Force kill (uncatchable)'],['SIGTERM','15','Graceful terminate'],
      ['SIGCONT','18','Continue'],['SIGSTOP','19','Pause (uncatchable)']]},
    example:{cmd:'pgrep -a sleep && kill 5521', out:`5521 sleep 600`},
    tip:'Try SIGTERM first — SIGKILL skips cleanup and can leave temp files and locks behind.' },

  { title:'Jobs & Priority', icon:'⏱️', badge:'JOBS', color:'blue',
    cmds:[
      ['long_task &','Run in background'],
      ['jobs -l','List jobs'],
      ['fg %1','To foreground'],
      ['bg %1','Resume in background'],
      ['nohup long_task &','Survive logout'],
      ['disown %1','Detach from shell'],
      ['nice -n 10 make -j8','Lower priority'],
      ['sudo renice -n -5 -p 1234','Change priority'],
      ['tmux new -s work','Persistent session']],
    flags:[
      ['nice -n <-20..19>','Lower = higher priority'],
      ['renice -n N -p PID','Change running process'],
      ['ionice -c3','Idle-only disk I/O'],
      ['tmux attach -t <name>','Re-attach session'],
      ['tmux Ctrl+b d','Detach']],
    example:{cmd:'sleep 300 & jobs -l', out:
`[1] 6120
[1]+  6120 Running                 sleep 300 &`} }
  ]},

/* ───────────────────────── SHELL ───────────────────────── */
{ id:'shell', icon:'🖥️', title:'Shell', sub:'Bash scripting', desc:'redirection, pipes, scripting and tests',
  cards:[
  { title:'Pipes & Redirection', icon:'🔀', badge:'I/O', color:'blue',
    cmds:[
      ['cmd > file.txt','stdout, overwrite'],
      ['cmd >> file.txt','stdout, append'],
      ['cmd 2> err.txt','stderr'],
      ['cmd &> all.txt','stdout + stderr'],
      ['cmd 2>&1 | less','Both into a pipe'],
      ['cmd < input.txt','stdin from file'],
      ['cmd1 | tee out.txt','Show and save'],
      ['cmd1 && cmd2','cmd2 if cmd1 succeeds'],
      ['cmd1 || cmd2','cmd2 if cmd1 fails'],
      ['diff <(ls a) <(ls b)','Process substitution']],
    flags:[
      ['>  >>','Overwrite / append'],
      ['2>  2>&1','stderr / merge into stdout'],
      ['&>  &>>','Both streams'],
      ['<<EOF','Here-document'],
      ['<<<"str"','Here-string'],
      ['tee -a','Append instead of overwrite']],
    example:{cmd:'ls /etc /nope 2>&1 | head -3', out:
`ls: cannot access '/nope': No such file or directory
/etc:
adjtime`} },

  { title:'Bash Script Template', icon:'📜', badge:'SCRIPT', color:'green',
    code:
`#!/usr/bin/env bash
# myscript.sh — description
set -euo pipefail
IFS=$'\\n\\t'

SCRIPT_DIR=$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)
LOG_FILE="/var/log/myscript.log"
DRY_RUN=false

log() { echo "[$(date '+%F %T')] $*" | tee -a "$LOG_FILE"; }
die() { echo "ERROR: $*" >&2; exit 1; }
trap 'die "failed at line $LINENO"' ERR

[[ $EUID -eq 0 ]] || die "Run as root (sudo)"

while [[ $# -gt 0 ]]; do
  case $1 in
    -d|--dry-run) DRY_RUN=true ;;
    -h|--help)    echo "Usage: $0 [-d]"; exit 0 ;;
    *)            die "Unknown option: $1" ;;
  esac
  shift
done

log "Started (dry-run=$DRY_RUN)"
# … your code …
log "Done."`,
    flags:[
      ['set -e','Exit on first error'],
      ['set -u','Error on unset variables'],
      ['set -o pipefail','Pipe fails if any stage fails'],
      ['set -x','Trace each command (debug)'],
      ['bash -n script.sh','Syntax check only'],
      ['shellcheck script.sh','Lint (dnf install ShellCheck)']],
    example:{cmd:'bash -n myscript.sh && shellcheck myscript.sh && echo OK', out:`OK`} },

  { title:'Control Flow', icon:'🔁', badge:'FLOW', color:'blue',
    code:
`# if
if [[ -f /etc/nginx/nginx.conf ]]; then
  echo "config exists"
elif [[ -d /etc/nginx ]]; then
  echo "dir exists"
else
  echo "not found"
fi

# for
for user in alice bob; do
  echo "Hello $user"
done

# C-style
for (( i=1; i<=3; i++ )); do echo "$i"; done

# while read
while read -r line; do echo "$line"; done < file.txt

# case
case "$ID" in
  fedora) dnf install -y pkg ;;
  ubuntu) apt install -y pkg ;;
  *)      echo "unknown" ;;
esac`,
    example:{cmd:'for i in 1 2 3; do echo "item $i"; done', out:`item 1
item 2
item 3`} },

  { title:'Test Conditions', icon:'🧪', badge:'TESTS', color:'blue',
    table:{head:['Test','Meaning'], rows:[
      ['-f file','Regular file exists'],['-d dir','Directory exists'],['-e path','Anything exists'],
      ['-r / -w / -x','Readable / writable / executable'],['-s file','Exists and not empty'],
      ['-z "$v"','String empty'],['-n "$v"','String not empty'],
      ['"$a" == "$b"','Strings equal'],['"$a" =~ regex','Regex match ([[ ]])'],
      ['$a -eq $b','Numbers equal'],['$a -gt / -lt $b','Greater / less'],
      ['(( a > b ))','Arithmetic comparison']]},
    example:{cmd:'[[ -d /etc/dnf ]] && echo "yes" || echo "no"', out:`yes`} }
  ]},

/* ───────────────────────── SSH ───────────────────────── */
{ id:'ssh', icon:'🔐', title:'SSH', sub:'Secure access', desc:'connect, configure, transfer and tunnel',
  cards:[
  { title:'SSH Keys', icon:'🔑', badge:'KEYS', color:'blue',
    cmds:[
      ['ssh-keygen -t ed25519 -C "me@example.com"','New key (recommended)'],
      ['ssh-copy-id user@server','Install public key'],
      ['ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server',''],
      ['ssh-add ~/.ssh/id_ed25519','Add to agent'],
      ['ssh-add -l','Loaded keys'],
      ['ssh-keygen -lf ~/.ssh/id_ed25519.pub','Fingerprint'],
      ['ssh-keygen -R server','Remove old host key']],
    flags:[
      ['-t ed25519|rsa|ecdsa','Key type'],
      ['-b 4096','Bits (RSA)'],
      ['-C "<comment>"','Label'],
      ['-f <path>','Output file'],
      ['-a 100','KDF rounds (stronger passphrase)'],
      ['-p','Change passphrase']],
    example:{cmd:'ssh-keygen -t ed25519 -C "me@example.com"', out:
`Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/sooraj/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Your identification has been saved in /home/sooraj/.ssh/id_ed25519
Your public key has been saved in /home/sooraj/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:q3Vd8m2fH1k0yZp7c9sL4xTnR5bJw6eA2uGiK8oN1Yc me@example.com`} },

  { title:'Connections & Tunnels', icon:'🌐', badge:'CONNECT', color:'blue',
    cmds:[
      ['ssh user@host','Connect'],
      ['ssh -p 2222 user@host','Custom port'],
      ['ssh -i ~/.ssh/mykey user@host','Specific key'],
      ['ssh -L 8080:localhost:80 user@host','Local forward'],
      ['ssh -R 9090:localhost:3000 user@host','Remote forward'],
      ['ssh -D 1080 user@host','SOCKS proxy'],
      ['ssh -J jump@bastion user@target','Via jump host'],
      ['ssh user@host "uptime"','Run one command']],
    flags:[
      ['-p <port>','Port'],
      ['-i <key>','Identity file'],
      ['-L l:host:r','Local port forward'],
      ['-R r:host:l','Remote port forward'],
      ['-D <port>','Dynamic SOCKS proxy'],
      ['-J <host>','ProxyJump'],
      ['-N','No remote command (tunnels only)'],
      ['-f','Go to background'],
      ['-v / -vvv','Debug verbosity']],
    code:
`# ~/.ssh/config
Host myserver
  HostName 192.168.1.100
  User alice
  Port 2222
  IdentityFile ~/.ssh/id_ed25519
  ServerAliveInterval 60

Host *
  AddKeysToAgent yes`,
    example:{cmd:'ssh myserver "uptime"', out:` 00:03:11 up 12 days,  4:21,  1 user,  load average: 0.08, 0.03, 0.01`} },

  { title:'File Transfer', icon:'📁', badge:'TRANSFER', color:'blue',
    cmds:[
      ['scp file.txt user@host:/remote/path/','Upload'],
      ['scp user@host:/remote/file.txt ./','Download'],
      ['scp -r localdir/ user@host:/remote/','Directory'],
      ['rsync -avz localdir/ user@host:/remote/','Sync'],
      ['rsync -avz --delete src/ user@host:/dst/','Mirror'],
      ['rsync -avzn src/ user@host:/dst/','Dry run'],
      ['sftp user@host','Interactive']],
    flags:[
      ['scp -P <port>','Port (capital P!)'],
      ['scp -r','Recursive'],
      ['rsync -a','Archive (perms, times, links)'],
      ['rsync -z','Compress in transit'],
      ['rsync -n','Dry run'],
      ['rsync --delete','Remove extras at destination'],
      ['rsync --progress / -P','Progress (+ resume)'],
      ['rsync -e "ssh -p 2222"','Custom ssh options']],
    example:{cmd:'rsync -avz site/ web@myserver:/var/www/site/', out:
`sending incremental file list
./
index.html
css/style.css

sent 4,812 bytes  received 76 bytes  3,258.67 bytes/sec
total size is 18,204  speedup is 3.72`},
    tip:'A trailing slash on the source (<code>src/</code>) copies its contents; without it you get <code>dst/src/</code>.' },

  { title:'sshd Hardening', icon:'🛡️', badge:'SERVER', color:'warn',
    desc:'Put overrides in <code>/etc/ssh/sshd_config.d/50-hardening.conf</code>.',
    code:
`PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
AllowUsers alice bob
MaxAuthTries 3
LoginGraceTime 30
X11Forwarding no`,
    cmds:[
      ['sudo sshd -t','Test config'],
      ['sudo systemctl reload sshd','Apply'],
      ['sudo semanage port -a -t ssh_port_t -p tcp 2222','If changing port (SELinux)'],
      ['sudo firewall-cmd --add-port=2222/tcp --permanent && sudo firewall-cmd --reload','']],
    flags:[
      ['sshd -t','Syntax check'],
      ['sshd -T','Print effective config']],
    example:{cmd:'sudo sshd -T | grep -E "permitrootlogin|passwordauth"', out:
`permitrootlogin no
passwordauthentication no`},
    warn:'Keep your current session open and test a new login before closing it.' }
  ]},

/* ───────────────────────── LOGS ───────────────────────── */
{ id:'logs', icon:'📋', title:'Logs', sub:'journalctl', desc:'systemd journal and log files',
  cards:[
  { title:'journalctl', icon:'📖', badge:'JOURNAL', color:'blue',
    cmds:[
      ['journalctl -f','Follow live'],
      ['journalctl -n 100','Last 100 lines'],
      ['journalctl -u nginx -f','Follow one service'],
      ['journalctl -b','This boot'],
      ['journalctl -b -1 -p err','Errors, previous boot'],
      ['journalctl --since "1 hour ago"',''],
      ['journalctl --since today -u sshd',''],
      ['journalctl -k','Kernel messages'],
      ['journalctl -g "failed"','Grep messages'],
      ['journalctl --disk-usage',''],
      ['sudo journalctl --vacuum-time=2weeks','Trim']],
    flags:[
      ['-f','Follow'],
      ['-n N','Last N entries'],
      ['-u <unit>','Unit filter'],
      ['-b [-N]','Boot (0 current, -1 previous)'],
      ['-p <prio>','emerg…debug; e.g. err, warning..err'],
      ['--since / --until','Time window'],
      ['-g <regex>','Grep message field'],
      ['-k','Kernel ring'],
      ['-o json|short-iso|cat','Output format'],
      ['-x','Add explanations'],
      ['--list-boots','Show boot IDs'],
      ['--vacuum-size / -time','Trim journal']],
    example:{cmd:'journalctl -u sshd -n 4 --no-pager', out:
`Sep 29 22:10:04 fedora-ws sshd[8812]: Accepted publickey for sooraj from 192.168.1.20 port 51422 ssh2: ED25519 SHA256:q3Vd…
Sep 29 22:10:04 fedora-ws sshd[8812]: pam_unix(sshd:session): session opened for user sooraj(uid=1000)
Sep 29 23:02:41 fedora-ws sshd[9120]: Invalid user admin from 203.0.113.7 port 40022
Sep 29 23:02:41 fedora-ws sshd[9120]: Connection closed by invalid user admin 203.0.113.7 port 40022 [preauth]`} },

  { title:'Log Files & Rotation', icon:'📁', badge:'FILES', color:'blue',
    desc:'Fedora logs to the journal by default; rsyslog (and /var/log/messages) is optional.',
    table:{head:['Path','Contents'], rows:[
      ['/var/log/journal/','Persistent systemd journal'],
      ['/var/log/dnf5.log','DNF5 activity'],
      ['/var/log/audit/audit.log','SELinux + audit events'],
      ['/var/log/nginx/','Nginx access / error'],
      ['/var/log/httpd/','Apache access / error'],
      ['/var/log/messages','Only if rsyslog is installed']]},
    cmds:[
      ['sudo dnf install rsyslog && sudo systemctl enable --now rsyslog','Classic text logs'],
      ['sudo logrotate -d /etc/logrotate.conf','Dry run'],
      ['sudo logrotate -f /etc/logrotate.conf','Force rotate'],
      ['cat /etc/logrotate.d/nginx','App config']],
    flags:[
      ['logrotate -d','Debug / dry run'],
      ['logrotate -f','Force'],
      ['daily|weekly · rotate N','Config: schedule + copies'],
      ['compress · missingok','Config: gzip, ignore missing']],
    example:{cmd:'sudo tail -3 /var/log/dnf5.log', out:
`2026-09-29T21:14:02+0300 [2210] INFO --- DNF5 launched with arguments: "dnf install -y htop" ---
2026-09-29T21:14:03+0300 [2210] INFO Transaction: install htop-3.4.1-1.fc44.x86_64
2026-09-29T21:14:03+0300 [2210] INFO DNF5 finished`} }
  ]},

/* ───────────────────────── BOOT ───────────────────────── */
{ id:'boot', icon:'🚀', title:'Boot', sub:'GRUB & kernels', desc:'bootloader, kernels and recovery',
  cards:[
  { title:'GRUB2 & grubby', icon:'🥾', badge:'GRUB', color:'blue',
    cmds:[
      ['sudo grubby --info=ALL','All boot entries'],
      ['sudo grubby --default-kernel','Default kernel'],
      ['sudo grubby --set-default-index=1','Default by index'],
      ['sudo grubby --update-kernel=ALL --args="quiet splash"','Add kernel args'],
      ['sudo grubby --update-kernel=ALL --remove-args="rhgb"','Remove args'],
      ['sudo grub2-editenv - unset menu_auto_hide','Always show menu'],
      ['sudo grub2-mkconfig -o /boot/grub2/grub.cfg','Regenerate config']],
    flags:[
      ['--info=ALL|<kernel>','Show entries'],
      ['--default-kernel / --default-index',''],
      ['--set-default=<path>','By kernel path'],
      ['--update-kernel=ALL','Target all entries'],
      ['--args / --remove-args','Kernel command line']],
    example:{cmd:'sudo grubby --default-kernel', out:`/boot/vmlinuz-6.19.8-200.fc44.x86_64`},
    tip:'On UEFI Fedora, <code>/boot/grub2/grub.cfg</code> is the correct target — don\'t write to /boot/efi.' },

  { title:'Kernels & Modules', icon:'🔧', badge:'KERNEL', color:'warn',
    cmds:[
      ['uname -r','Running kernel'],
      ['rpm -q kernel','Installed kernels'],
      ['sudo dnf remove $(dnf repoquery --installonly --latest-limit=-2 -q)','Keep newest 2'],
      ['# /etc/dnf/dnf.conf:',''],
      ['installonly_limit=3','Kernels to keep'],
      ['lsmod | grep kvm','Loaded modules'],
      ['modinfo btrfs','Module info'],
      ['sudo modprobe vfio-pci','Load'],
      ['sudo modprobe -r pcspkr','Unload']],
    flags:[
      ['modprobe -r','Remove'],
      ['modprobe -n -v','Dry run, verbose'],
      ['modinfo -p','Parameters only'],
      ['/etc/modprobe.d/*.conf','blacklist / options']],
    example:{cmd:'rpm -q kernel', out:
`kernel-6.19.6-200.fc44.x86_64
kernel-6.19.7-200.fc44.x86_64
kernel-6.19.8-200.fc44.x86_64`} },

  { title:'Rescue & Recovery', icon:'🆘', badge:'RESCUE', color:'red',
    desc:'At the GRUB menu press <kbd>e</kbd>, append to the <code>linux</code> line, then <kbd>Ctrl</kbd>+<kbd>X</kbd>.',
    cmds:[
      ['systemd.unit=rescue.target','Rescue (root password)'],
      ['systemd.unit=emergency.target','Minimal, root fs read-only'],
      ['rd.break','Stop in initramfs'],
      ['# Reset root password after rd.break:',''],
      ['mount -o remount,rw /sysroot',''],
      ['chroot /sysroot',''],
      ['passwd root',''],
      ['touch /.autorelabel','Required for SELinux'],
      ['exit; exit','']],
    flags:[
      ['systemd.unit=<target>','Boot into a target'],
      ['rd.break','Break before switch_root'],
      ['init=/bin/bash','Last resort shell'],
      ['nomodeset','Graphics fallback']],
    example:{cmd:'systemd-analyze blame | head -3', out:
`5.412s NetworkManager-wait-online.service
1.208s dnf-makecache.service
 904ms  plymouth-quit-wait.service`},
    danger:'Skipping <code>/.autorelabel</code> after editing /etc/shadow from rd.break leaves the system unable to log in.' }
  ]},

/* ───────────────────────── FLATPAK ───────────────────────── */
{ id:'flatpak', icon:'🧩', title:'Flatpak', sub:'Apps & containers', desc:'flatpak apps, rpm tools and podman',
  cards:[
  { title:'Flatpak', icon:'📦', badge:'FLATPAK', color:'blue',
    cmds:[
      ['flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo','Add Flathub'],
      ['flatpak search gimp','Search'],
      ['flatpak install flathub org.gimp.GIMP','Install'],
      ['flatpak run org.gimp.GIMP','Run'],
      ['flatpak update','Update all'],
      ['flatpak list --app','Installed apps'],
      ['flatpak uninstall --unused','Remove unused runtimes'],
      ['flatpak override --user --nofilesystem=home org.gimp.GIMP','Tighten sandbox']],
    flags:[
      ['--user / --system','Per-user or system-wide'],
      ['--app / --runtime','Filter list'],
      ['-y','Assume yes'],
      ['--if-not-exists','Idempotent remote-add'],
      ['override --filesystem=<path>','Grant file access'],
      ['info --show-permissions','Show sandbox permissions']],
    example:{cmd:'flatpak list --app', out:
`Name         Application ID            Version   Branch  Installation
GIMP         org.gimp.GIMP             3.0.4     stable  system
Flatseal     com.github.tchx84.Flatseal 2.3.1    stable  system
Signal       org.signal.Signal         7.70.0    stable  user`},
    tip:'<b>Flatseal</b> gives you a GUI for Flatpak permissions.' },

  { title:'RPM Tools', icon:'🔧', badge:'RPM', color:'blue',
    cmds:[
      ['rpm -qa | grep kernel','Installed RPMs'],
      ['rpm -qi bash','Info'],
      ['rpm -ql bash','Files'],
      ['rpm -qf /usr/bin/vim','Owner of a file'],
      ['rpm -qR bash','Requirements'],
      ['rpm -q --changelog bash | head','Changelog'],
      ['rpm -V openssh-server','Verify files'],
      ['rpm2cpio pkg.rpm | cpio -idmv','Extract without installing']],
    flags:[
      ['-q','Query mode'],
      ['-a','All packages'],
      ['-i / -l / -f','Info / list / file owner'],
      ['-R','Requires'],
      ['-p <file.rpm>','Query a package file'],
      ['-V / -Va','Verify one / all'],
      ['--last','Sort by install time']],
    example:{cmd:'rpm -qf /usr/bin/vim', out:`vim-enhanced-9.1.1500-1.fc44.x86_64`},
    tip:'Install with <code>dnf install ./file.rpm</code>, not <code>rpm -i</code> — DNF resolves dependencies.' },

  { title:'Dev Tools & Podman', icon:'🏗️', badge:'DEV', color:'green',
    cmds:[
      ['sudo dnf group install development-tools c-development','Compilers & tools'],
      ['sudo dnf install git python3-pip nodejs golang rust cargo',''],
      ['sudo dnf install podman-compose toolbox',''],
      ['podman run -d --name web -p 8080:80 docker.io/library/nginx','Run container'],
      ['podman ps -a','Containers'],
      ['podman logs -f web','Logs'],
      ['podman stop web && podman rm web',''],
      ['toolbox create && toolbox enter','Mutable dev container']],
    flags:[
      ['-d','Detached'],
      ['--name <n>','Name container'],
      ['-p host:ctr','Publish port'],
      ['-v host:ctr:Z','Volume + SELinux relabel'],
      ['--rm','Remove on exit'],
      ['-it','Interactive terminal']],
    example:{cmd:'podman ps', out:
`CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS        PORTS                 NAMES
a1b2c3d4e5f6  docker.io/library/nginx:latest  nginx -g daemon o...  2 minutes ago  Up 2 minutes  0.0.0.0:8080->80/tcp  web`},
    tip:'Add <code>:Z</code> to volume mounts on Fedora, or SELinux will block container access to the files.' }
  ]}
];

/* ═════════════════ EXTENDED CONTENT ═════════════════ */
(function () {
const D = window.FB_DATA;
const sec = id => D.find(s => s.id === id);
const addCards = (id, cards) => sec(id).cards.push(...cards);
const insertAfter = (id, s) => D.splice(D.findIndex(x => x.id === id) + 1, 0, s);

/* ── DNF extras ── */
addCards('dnf', [
  { title:'COPR, Locks & Housekeeping', icon:'🧰', badge:'EXTRAS', color:'blue',
    cmds:[
      ['sudo dnf copr enable atim/lazygit','Enable a COPR repo'],
      ['sudo dnf copr disable atim/lazygit','Disable it'],
      ['dnf copr list','Enabled COPRs'],
      ['sudo dnf versionlock add kernel','Pin a package version'],
      ['dnf versionlock list','Show locks'],
      ['sudo dnf versionlock delete kernel','Remove lock'],
      ['dnf needs-restarting -r','Is a reboot needed?'],
      ['dnf download --resolve htop','Download RPM + deps'],
      ['sudo dnf builddep python3','Install build deps'],
      ['sudo dnf mark user htop','Keep from autoremove'],
      ['dnf leaves','Packages nothing depends on']],
    flags:[
      ['copr enable <owner>/<project>','Community repo (Fedora COPR)'],
      ['versionlock add / delete / list','Hold versions'],
      ['needs-restarting -r','Reboot hint (exit code 1 = reboot)'],
      ['needs-restarting -s','Services that need restart'],
      ['download --resolve','Include dependencies'],
      ['download --destdir=<dir>','Where to save'],
      ['mark user | dependency','Change install reason']],
    example:{cmd:'dnf needs-restarting -r', out:
`Core libraries or services have been updated since boot-up:
  * kernel
  * systemd

Reboot is required to fully utilize these updates.
More information: https://access.redhat.com/solutions/27943`},
    warn:'COPR repos are community-built and not vetted by Fedora — enable only ones you trust.' }
]);

/* ── Files extras ── */
addCards('files', [
  { title:'Text Processing Power Tools', icon:'🛠️', badge:'PIPES', color:'green',
    cmds:[
      ['cut -d: -f1,7 /etc/passwd','Pick fields'],
      ["tr 'a-z' 'A-Z' < file.txt",'Translate characters'],
      ["tr -d '\\r' < win.txt > unix.txt",'Strip Windows CRs'],
      ['column -t -s: /etc/group | head','Align into columns'],
      ['sort data.txt | uniq -c | sort -rn | head','Top repeated lines'],
      ['find . -name "*.tmp" -print0 | xargs -0 rm -v','Safe bulk delete'],
      ['comm -12 <(sort a.txt) <(sort b.txt)','Lines in both files'],
      ['paste -d, names.txt emails.txt','Merge side by side'],
      ['jq ".items[].name" data.json','Query JSON'],
      ['nl -ba script.sh','Number all lines']],
    flags:[
      ['cut -d <c> -f <n>','Delimiter + fields'],
      ['cut -c 1-10','Character range'],
      ['tr -d / -s','Delete / squeeze chars'],
      ['xargs -0','NUL-separated input (pair with -print0)'],
      ['xargs -n 1 / -P 4','One arg per run / 4 in parallel'],
      ['xargs -I{}','Placeholder for each item'],
      ['jq -r','Raw strings (no quotes)'],
      ['jq -c','Compact one-line output'],
      ['column -t','Table layout']],
    example:{cmd:'cut -d: -f1,7 /etc/passwd | column -t -s: | tail -3', out:
`sooraj   /bin/bash
alice    /bin/bash
nginx    /sbin/nologin`},
    tip:'<code>jq</code> is in the repos: <code>sudo dnf install jq</code>.' },

  { title:'Disk Usage & Cleanup', icon:'🧹', badge:'CLEANUP', color:'warn',
    cmds:[
      ['du -xh --max-depth=1 / 2>/dev/null | sort -h','Biggest top-level dirs'],
      ['ncdu /','Interactive usage browser'],
      ['sudo journalctl --vacuum-size=200M','Shrink the journal'],
      ['sudo dnf clean all','Package caches'],
      ['sudo dnf autoremove','Unneeded deps'],
      ['flatpak uninstall --unused','Old runtimes'],
      ['podman system prune -a','Unused images/containers'],
      ['rm -rf ~/.cache/thumbnails/*','Thumbnail cache']],
    flags:[
      ['du -x','Stay on one filesystem'],
      ['du --max-depth=N','Depth limit'],
      ['sort -h','Sort human sizes (K < M < G)'],
      ['ncdu -x','Stay on one filesystem'],
      ['podman system df','Show container storage use']],
    example:{cmd:'du -xh --max-depth=1 /var 2>/dev/null | sort -h | tail -4', out:
`412M	/var/log
1.9G	/var/cache
6.3G	/var/lib
8.7G	/var`} }
]);

/* ── Network extras ── */
addCards('network', [
  { title:'Bluetooth & Radios', icon:'📶', badge:'BT', color:'blue',
    cmds:[
      ['rfkill list','Radio block status'],
      ['sudo rfkill unblock bluetooth','Unblock BT'],
      ['bluetoothctl power on',''],
      ['bluetoothctl scan on','Discover devices'],
      ['bluetoothctl devices','Known devices'],
      ['bluetoothctl pair AA:BB:CC:DD:EE:FF',''],
      ['bluetoothctl trust AA:BB:CC:DD:EE:FF','Auto-reconnect'],
      ['bluetoothctl connect AA:BB:CC:DD:EE:FF',''],
      ['nmcli radio wifi off','Wi-Fi radio off']],
    flags:[
      ['rfkill block | unblock <type>','wifi, bluetooth, all'],
      ['bluetoothctl info <MAC>','Device details'],
      ['bluetoothctl remove <MAC>','Forget device'],
      ['nmcli radio all on|off','All radios']],
    example:{cmd:'bluetoothctl devices', out:
`Device 4C:87:5D:1A:22:9E WH-1000XM5
Device E8:9F:6D:08:41:C2 MX Master 3S`} }
]);

/* ── Processes extras ── */
addCards('process', [
  { title:'Resource Limits & cgroups', icon:'🎚️', badge:'LIMITS', color:'warn',
    cmds:[
      ['systemd-cgtop','Live usage by cgroup'],
      ['systemd-run --user --scope -p MemoryMax=2G -p CPUQuota=50% firefox','Run capped'],
      ['sudo systemctl set-property httpd.service MemoryMax=1G','Cap a service'],
      ['systemctl show nginx -p MemoryCurrent','Current memory'],
      ['ulimit -a','Shell limits'],
      ['ulimit -n 4096','Raise open-file limit (session)'],
      ['cat /proc/pressure/memory','Memory pressure (PSI)']],
    flags:[
      ['MemoryMax=','Hard memory cap'],
      ['MemoryHigh=','Soft cap (throttle)'],
      ['CPUQuota=50%','Half of one CPU'],
      ['IOWeight=','Relative disk priority'],
      ['--scope','Run in foreground as a scope'],
      ['--runtime','set-property: don\'t persist'],
      ['ulimit -n / -u','Open files / processes']],
    example:{cmd:'cat /proc/pressure/memory', out:
`some avg10=0.00 avg60=0.12 avg300=0.35 total=4817233
full avg10=0.00 avg60=0.03 avg300=0.10 total=1602211`},
    tip:'Fedora runs <b>systemd-oomd</b>, which uses this pressure data to kill runaway cgroups before the system freezes.' }
]);

/* ── Boot extras ── */
addCards('boot', [
  { title:'Boot Performance', icon:'⏱️', badge:'ANALYZE', color:'blue',
    cmds:[
      ['systemd-analyze','Total boot time'],
      ['systemd-analyze blame','Slowest units'],
      ['systemd-analyze critical-chain','Critical path'],
      ['systemd-analyze plot > boot.svg','Timeline chart'],
      ['systemd-analyze security sshd','Unit hardening score'],
      ['sudo systemctl disable NetworkManager-wait-online.service','Common desktop speed-up']],
    flags:[
      ['blame','Units by start time'],
      ['critical-chain [unit]','Time-critical chain'],
      ['plot','SVG timeline'],
      ['security [unit]','Exposure score'],
      ['verify <file>','Lint a unit file']],
    example:{cmd:'systemd-analyze', out:
`Startup finished in 6.211s (firmware) + 2.104s (loader) + 1.402s (kernel) + 2.881s (initrd) + 7.930s (userspace) = 20.530s
graphical.target reached after 7.902s in userspace.`},
    warn:'Only disable wait-online on desktops — servers with network mounts need it.' }
]);

/* ── NEW: System settings ── */
insertAfter('services', { id:'system', icon:'🕰️', title:'System', sub:'Time, locale, power', desc:'time, locale, scheduling, power and firmware',
  cards:[
  { title:'Date, Time & NTP', icon:'🕒', badge:'TIME', color:'blue',
    cmds:[
      ['timedatectl','Clock + timezone status'],
      ['timedatectl list-timezones | grep Asia','Find a zone'],
      ['sudo timedatectl set-timezone Asia/Qatar','Set timezone'],
      ['sudo timedatectl set-ntp true','Enable NTP sync'],
      ['chronyc tracking','Sync accuracy'],
      ['chronyc sources -v','Time servers'],
      ['date +"%F %T %Z"','Formatted date'],
      ['date -d "next friday"','Date arithmetic']],
    flags:[
      ['set-timezone <Zone>','Region/City'],
      ['set-ntp true|false','Automatic sync'],
      ['set-time "YYYY-MM-DD HH:MM"','Manual (NTP off)'],
      ['date +%s','Unix timestamp'],
      ['date -d @<epoch>','Epoch → date'],
      ['date -u','UTC']],
    example:{cmd:'timedatectl', out:
`               Local time: Wed 2026-09-30 00:36:12 +03
           Universal time: Tue 2026-09-29 21:36:12 UTC
                 RTC time: Tue 2026-09-29 21:36:12
                Time zone: Asia/Qatar (+03, +0300)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no`} },

  { title:'Locale & Keyboard', icon:'⌨️', badge:'LOCALE', color:'blue',
    cmds:[
      ['localectl','Current settings'],
      ['localectl list-locales | grep en_','Available locales'],
      ['sudo localectl set-locale LANG=en_US.UTF-8',''],
      ['sudo dnf install langpacks-ar','Add a language (Arabic)'],
      ['sudo localectl set-keymap us','Console keymap'],
      ['sudo localectl set-x11-keymap us,ara "" "" grp:alt_shift_toggle','Two layouts + switch']],
    flags:[
      ['set-locale LANG=','System language'],
      ['set-keymap','Virtual console layout'],
      ['set-x11-keymap L M V O','Layout, model, variant, options'],
      ['list-keymaps','All console maps']],
    example:{cmd:'localectl', out:
`System Locale: LANG=en_US.UTF-8
    VC Keymap: us
   X11 Layout: us,ara
  X11 Options: grp:alt_shift_toggle`} },

  { title:'Scheduling: cron & at', icon:'📅', badge:'CRON', color:'green',
    cmds:[
      ['crontab -e','Edit your jobs'],
      ['crontab -l','List jobs'],
      ['sudo crontab -u alice -l','Another user\'s jobs'],
      ['# min hour dom mon dow  command',''],
      ['30 2 * * * /usr/local/bin/backup.sh','Daily 02:30'],
      ['*/15 * * * * ~/bin/check.sh','Every 15 minutes'],
      ['@reboot ~/bin/startup.sh','At boot'],
      ['sudo dnf install at && sudo systemctl enable --now atd','One-shot jobs'],
      ['echo "reboot" | sudo at 03:00','Run once at 03:00'],
      ['atq','Pending at jobs'],
      ['atrm 3','Remove job 3']],
    flags:[
      ['crontab -e / -l / -r','Edit / list / remove all'],
      ['*/N','Every N units'],
      ['1-5','Range (Mon–Fri in dow)'],
      ['@daily @weekly @reboot','Shortcuts'],
      ['at now + 10 minutes','Relative time'],
      ['at -f script.sh 17:00','Run a file']],
    example:{cmd:'crontab -l', out:
`# m h  dom mon dow   command
30 2 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1
*/15 * * * * /home/sooraj/bin/check.sh`},
    tip:'For anything important, prefer systemd timers (Services → Timers): logging, catch-up of missed runs, and dependencies for free.' },

  { title:'Power, Sensors & Firmware', icon:'🔋', badge:'POWER', color:'warn',
    cmds:[
      ['powerprofilesctl','Current power profile'],
      ['powerprofilesctl set power-saver','performance | balanced | power-saver'],
      ['tuned-adm active','Active tuned profile'],
      ['tuned-adm list','All profiles'],
      ['upower -i $(upower -e | grep BAT)','Battery details'],
      ['sudo dnf install lm_sensors && sensors','Temperatures & fans'],
      ['fwupdmgr refresh','Update firmware metadata'],
      ['fwupdmgr get-updates','Available firmware'],
      ['fwupdmgr update','Install firmware updates']],
    flags:[
      ['powerprofilesctl set <p>','Switch profile'],
      ['tuned-adm profile <p>','Apply tuned profile'],
      ['tuned-adm recommend','Suggested profile'],
      ['fwupdmgr get-devices','Supported hardware'],
      ['upower -d','Dump all power devices']],
    example:{cmd:'sensors', out:
`k10temp-pci-00c3
Adapter: PCI adapter
Tctl:         +48.9°C

nvme-pci-0400
Adapter: PCI adapter
Composite:    +39.8°C  (low  = -273.1°C, high = +81.8°C)

thinkpad-isa-0000
fan1:        2310 RPM`},
    tip:'Since Fedora 41 the desktop power slider is backed by <b>tuned-ppd</b>, so powerprofilesctl and tuned-adm work side by side.' }
  ]});

/* ── NEW: Performance ── */
insertAfter('process', { id:'perf', icon:'📈', title:'Performance', sub:'CPU, memory, I/O', desc:'measure cpu, memory, disk and swap',
  cards:[
  { title:'vmstat, mpstat & pidstat', icon:'📊', badge:'CPU', color:'blue',
    cmds:[
      ['vmstat 1 5','System summary every 1s, 5 times'],
      ['sudo dnf install sysstat','mpstat, iostat, pidstat, sar'],
      ['mpstat -P ALL 1','Per-CPU usage'],
      ['pidstat 1','Per-process CPU'],
      ['pidstat -r 1','Per-process memory'],
      ['pidstat -d 1','Per-process disk I/O'],
      ['sudo perf top','Hottest functions live (perf pkg)'],
      ['uptime','Load averages']],
    flags:[
      ['vmstat <delay> <count>','Interval + repeats'],
      ['vmstat -S M','Units in MB'],
      ['mpstat -P ALL','All CPUs'],
      ['pidstat -u / -r / -d','CPU / mem / disk'],
      ['pidstat -p <PID>','One process'],
      ['perf stat <cmd>','Counters for a command']],
    example:{cmd:'vmstat 1 3', out:
`procs -----------memory---------- ---swap-- -----io---- -system-- -------cpu-------
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st gu
 1  0      0 18824412  8312 7612044   0    0    41    63  712 1204  4  1 95  0  0  0
 0  0      0 18823960  8312 7612110   0    0     0    88 1802 3011  3  1 96  0  0  0
 2  0      0 18821188  8312 7612200   0    0     0     0 1655 2873  5  2 93  0  0  0`},
    tip:'In vmstat: high <b>r</b> = CPU queue, high <b>wa</b> = waiting on disk, non-zero <b>si/so</b> = swapping.' },

  { title:'Disk I/O & History (sar)', icon:'💽', badge:'I/O', color:'blue',
    cmds:[
      ['iostat -xz 1','Extended device stats'],
      ['sudo iotop -o','Processes doing I/O now'],
      ['sudo systemctl enable --now sysstat','Start collecting history'],
      ['sar -u','CPU history today'],
      ['sar -r','Memory history'],
      ['sar -d -f /var/log/sa/sa28','Disk, from another day'],
      ['sar -n DEV 1 3','Network throughput']],
    flags:[
      ['iostat -x','Extended (util, await)'],
      ['iostat -z','Hide idle devices'],
      ['iotop -o / -a','Only active / accumulated'],
      ['sar -u / -r / -d / -n DEV','CPU / mem / disk / net'],
      ['sar -s 09:00 -e 12:00','Time window']],
    example:{cmd:'iostat -xz 1 1', out:
`Device   r/s    w/s   rkB/s   wkB/s  r_await w_await aqu-sz  %util
nvme0n1  12.4   31.8  402.1  1210.6    0.18    0.42   0.02    1.9`} },

  { title:'Memory, Swap & zram', icon:'🧠', badge:'MEMORY', color:'warn',
    cmds:[
      ['free -h','Overview'],
      ['swapon --show','Active swap devices'],
      ['zramctl','Compressed RAM swap'],
      ['cat /etc/systemd/zram-generator.conf','zram config (if customised)'],
      ['sudo sysctl vm.swappiness','Swap tendency'],
      ['echo "vm.swappiness=60" | sudo tee /etc/sysctl.d/99-swap.conf','Persist a sysctl'],
      ['smem -tk','Proportional memory per process'],
      ['sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches','Drop caches (testing only)']],
    flags:[
      ['swapon --show','Device, size, priority'],
      ['zramctl --output-all','Compression stats'],
      ['sysctl -a','All kernel params'],
      ['sysctl -p <file>','Load a file'],
      ['zram-size = ram / 2','zram-generator option']],
    example:{cmd:'zramctl', out:
`NAME       ALGORITHM DISKSIZE  DATA COMPR TOTAL STREAMS MOUNTPOINT
/dev/zram0 zstd           8G  1.2G  318M  331M      16 [SWAP]`},
    tip:'Fedora uses zram swap by default since F33 — swap lives in compressed RAM, no swap partition needed.' }
  ]});

/* ── NEW: Security ── */
insertAfter('selinux', { id:'security', icon:'🛡️', title:'Security', sub:'Crypto & hardening', desc:'checksums, gpg, openssl, crypto policies, brute-force protection',
  cards:[
  { title:'Checksums & GPG', icon:'🧾', badge:'VERIFY', color:'blue',
    cmds:[
      ['sha256sum file.iso','Hash a file'],
      ['sha256sum -c CHECKSUM --ignore-missing','Verify against a list'],
      ['gpg --full-generate-key','Create a key pair'],
      ['gpg --list-keys','Public keys'],
      ['gpg --import KEYS.asc','Import a key'],
      ['gpg --verify file.sig file','Check a signature'],
      ['gpg -c secret.txt','Encrypt with a passphrase'],
      ['gpg -e -r bob@example.com doc.pdf','Encrypt for someone'],
      ['gpg -d doc.pdf.gpg > doc.pdf','Decrypt']],
    flags:[
      ['-c','Symmetric (passphrase)'],
      ['-e -r <id>','Encrypt for recipient'],
      ['-s / --clearsign','Sign / readable signature'],
      ['-a, --armor','ASCII output'],
      ['--fingerprint','Show fingerprints'],
      ['sha256sum -c','Check mode']],
    example:{cmd:'sha256sum -c Fedora-Workstation-44-CHECKSUM --ignore-missing', out:
`Fedora-Workstation-Live-44-1.7.x86_64.iso: OK`} },

  { title:'OpenSSL & TLS', icon:'🔏', badge:'TLS', color:'blue',
    cmds:[
      ['openssl x509 -in cert.pem -noout -subject -issuer -dates','Inspect a cert'],
      ['openssl s_client -connect fedoraproject.org:443 -servername fedoraproject.org </dev/null','Test a TLS server'],
      ['openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365 -subj "/CN=localhost"','Self-signed cert'],
      ['openssl rand -base64 32','Random secret'],
      ['sudo cp myca.crt /etc/pki/ca-trust/source/anchors/','Trust a CA…'],
      ['sudo update-ca-trust','…and apply']],
    flags:[
      ['-noout','Don\'t print the encoded cert'],
      ['-text','Full human-readable dump'],
      ['-dates / -subject / -issuer','Specific fields'],
      ['-servername','SNI hostname'],
      ['-nodes','No passphrase on the key'],
      ['-days N','Validity']],
    example:{cmd:'openssl x509 -in cert.pem -noout -subject -dates', out:
`subject=CN=localhost
notBefore=Sep 29 21:40:02 2026 GMT
notAfter=Sep 29 21:40:02 2027 GMT`} },

  { title:'Crypto Policies', icon:'🧮', badge:'POLICY', color:'warn',
    cmds:[
      ['update-crypto-policies --show','Current policy'],
      ['sudo update-crypto-policies --set FUTURE','Stricter everywhere'],
      ['sudo update-crypto-policies --set DEFAULT','Back to default'],
      ['sudo update-crypto-policies --set DEFAULT:SHA1','Re-enable SHA-1 (legacy)']],
    flags:[
      ['DEFAULT','Balanced, recommended'],
      ['FUTURE','Stronger keys/algorithms only'],
      ['LEGACY','Older algorithms allowed'],
      ['FIPS','FIPS 140 mode'],
      [':SUBPOLICY','Modifier, e.g. :SHA1 or :NO-CAMELLIA']],
    example:{cmd:'update-crypto-policies --show', out:`DEFAULT`},
    tip:'One setting applies to OpenSSL, GnuTLS, NSS, OpenSSH and more. Reboot (or restart services) after changing it.' },

  { title:'Brute-force Protection & Audit', icon:'🚨', badge:'HARDEN', color:'red',
    cmds:[
      ['sudo dnf install fail2ban && sudo systemctl enable --now fail2ban',''],
      ['sudo fail2ban-client status sshd','Banned IPs'],
      ['sudo fail2ban-client set sshd unbanip 203.0.113.7','Unban'],
      ['sudo lastb | head','Failed logins'],
      ['sudo faillock --user alice','Lockout counter'],
      ['sudo faillock --user alice --reset','Unlock'],
      ['sudo auditctl -l','Audit rules'],
      ['sudo rpm -Va --nomtime | head','Changed package files']],
    code:
`# /etc/fail2ban/jail.local
[sshd]
enabled  = true
maxretry = 5
findtime = 10m
bantime  = 1h`,
    flags:[
      ['maxretry','Failures before ban'],
      ['findtime','Window for counting failures'],
      ['bantime','Ban length (-1 = forever)'],
      ['fail2ban-client status','All jails'],
      ['faillock --reset','Clear failures']],
    example:{cmd:'sudo fail2ban-client status sshd', out:
`Status for the jail: sshd
|- Filter
|  |- Currently failed: 1
|  |- Total failed:     37
|  \`- Journal matches:  _SYSTEMD_UNIT=sshd.service + _COMM=sshd
\`- Actions
   |- Currently banned: 2
   |- Total banned:     6
   \`- Banned IP list:   203.0.113.7 198.51.100.23`} }
  ]});

/* ── NEW: Git ── */
insertAfter('shell', { id:'git', icon:'🌿', title:'Git', sub:'Version control', desc:'configure, commit, branch and undo with git',
  cards:[
  { title:'Setup & Config', icon:'⚙️', badge:'SETUP', color:'blue',
    cmds:[
      ['sudo dnf install git',''],
      ['git config --global user.name "Your Name"',''],
      ['git config --global user.email "you@example.com"',''],
      ['git config --global init.defaultBranch main',''],
      ['git config --global pull.rebase true','Rebase on pull'],
      ['git config --global core.editor vim',''],
      ['git config --list --show-origin','Where each setting comes from'],
      ['git config --global alias.lg "log --oneline --graph --all"','Alias']],
    flags:[
      ['--global','~/.gitconfig'],
      ['--local','This repo only'],
      ['--system','All users'],
      ['--unset <key>','Remove a setting'],
      ['--show-origin','Show source file']],
    example:{cmd:'git config --global --list', out:
`user.name=SSK
user.email=you@example.com
init.defaultbranch=main
pull.rebase=true
alias.lg=log --oneline --graph --all`} },

  { title:'Everyday Workflow', icon:'🔁', badge:'DAILY', color:'green',
    cmds:[
      ['git clone https://github.com/user/repo.git',''],
      ['git status -sb','Short status'],
      ['git add -p','Stage hunks interactively'],
      ['git commit -m "Add feature"',''],
      ['git commit --amend --no-edit','Add to last commit'],
      ['git diff --staged','What will be committed'],
      ['git log --oneline --graph --all -15',''],
      ['git pull','Fetch + integrate'],
      ['git push -u origin main','Push + set upstream']],
    flags:[
      ['status -s -b','Short + branch'],
      ['add -p / -A','Hunks / everything'],
      ['commit -a','Stage tracked changes'],
      ['commit --amend','Rewrite last commit'],
      ['log -p / --stat','Patches / file stats'],
      ['log --author= --since=','Filter'],
      ['push -u','Set upstream'],
      ['push --force-with-lease','Safer force push']],
    example:{cmd:'git log --oneline --graph -5', out:
`* 9f3c2a1 (HEAD -> main, origin/main) Add DNF5 examples
* 71be0d4 PWA: service worker + manifest
* 3a8e5c9 Ambient music engine
*   d02f118 Merge branch 'search'
|\\
| * 5c1a7b2 Fuzzy search across flags`} },

  { title:'Branches & Merging', icon:'🌱', badge:'BRANCH', color:'blue',
    cmds:[
      ['git branch -a','All branches'],
      ['git switch -c feature/login','Create + switch'],
      ['git switch main',''],
      ['git merge feature/login','Merge into current'],
      ['git rebase main','Replay onto main'],
      ['git rebase -i HEAD~3','Squash / reorder last 3'],
      ['git branch -d feature/login','Delete merged branch'],
      ['git push origin --delete feature/login','Delete remote branch'],
      ['git tag -a v2.0 -m "Release 2.0"','Annotated tag']],
    flags:[
      ['switch -c','Create branch'],
      ['merge --no-ff','Always create merge commit'],
      ['merge --squash','Squash into one change'],
      ['rebase -i','Interactive'],
      ['rebase --abort / --continue','Stop / resume'],
      ['branch -D','Force delete']],
    example:{cmd:'git branch -a', out:
`  feature/login
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main`} },

  { title:'Undo & Recover', icon:'⏪', badge:'UNDO', color:'red',
    cmds:[
      ['git restore file.txt','Discard working changes'],
      ['git restore --staged file.txt','Unstage'],
      ['git reset --soft HEAD~1','Undo commit, keep changes staged'],
      ['git reset --hard HEAD~1','Undo commit AND changes'],
      ['git revert 9f3c2a1','New commit that undoes one'],
      ['git stash push -m "wip"','Shelve changes'],
      ['git stash list',''],
      ['git stash pop','Re-apply latest'],
      ['git reflog','Every HEAD position — recover "lost" commits'],
      ['git clean -nd','Preview untracked files to delete']],
    flags:[
      ['reset --soft','Keep index + working tree'],
      ['reset --mixed','Keep working tree (default)'],
      ['reset --hard','Discard everything'],
      ['stash -u','Include untracked files'],
      ['clean -n / -f / -d','Dry run / force / dirs too']],
    example:{cmd:'git reflog -4', out:
`9f3c2a1 (HEAD -> main) HEAD@{0}: reset: moving to HEAD~1
b44e012 HEAD@{1}: commit: Oops, wrong file
9f3c2a1 (HEAD -> main) HEAD@{2}: commit: Add DNF5 examples
71be0d4 HEAD@{3}: commit: PWA: service worker + manifest`},
    danger:'<code>reset --hard</code> and <code>clean -f</code> delete uncommitted work permanently. Use <code>revert</code> on commits you already pushed.' }
  ]});
})();

/* ═════════════════ MORE CONTENT (v2.2) ═════════════════ */
(function () {
const D = window.FB_DATA;
const sec = id => D.find(s => s.id === id);
const addCards = (id, cards) => sec(id).cards.push(...cards);
const insertAfter = (id, s) => D.splice(D.findIndex(x => x.id === id) + 1, 0, s);

/* ── Users: password policy ── */
addCards('users', [
  { title:'Password Policy & Ageing', icon:'🔏', badge:'POLICY', color:'warn',
    cmds:[
      ['sudo passwd -S alice','Password status'],
      ['sudo chage -l alice','Ageing details'],
      ['sudo chage -M 90 -W 7 alice','Expire every 90 days, warn 7 days before'],
      ['sudo chage -E 2026-12-31 alice','Account expiry date'],
      ['sudo passwd -e alice','Force change at next login'],
      ['sudo passwd -l alice','Lock password'],
      ['sudoedit /etc/security/pwquality.conf','Strength rules'],
      ['minlen = 12','pwquality: minimum length'],
      ['dcredit = -1','pwquality: require a digit']],
    flags:[
      ['chage -M <days>','Max days between changes'],
      ['chage -m <days>','Min days between changes'],
      ['chage -W <days>','Warning period'],
      ['chage -I <days>','Inactive days after expiry'],
      ['chage -E <date|-1>','Account expiry (-1 = never)'],
      ['passwd -S','Status: P (set), L (locked), NP (none)'],
      ['passwd -e / -l / -u','Expire / lock / unlock']],
    example:{cmd:'sudo chage -l alice', out:
`Last password change                                    : Sep 12, 2026
Password expires                                        : Dec 11, 2026
Password inactive                                       : never
Account expires                                         : Dec 31, 2026
Minimum number of days between password change          : 0
Maximum number of days between password change          : 90
Number of days of warning before password expires       : 7`} }
]);

/* ── Network: VPN + curl ── */
addCards('network', [
  { title:'VPN: WireGuard & OpenVPN', icon:'🛰️', badge:'VPN', color:'green',
    cmds:[
      ['sudo dnf install wireguard-tools',''],
      ['wg genkey | tee private.key | wg pubkey > public.key','Key pair'],
      ['sudo nmcli connection import type wireguard file wg0.conf','Managed by NetworkManager'],
      ['nmcli connection up wg0','Connect'],
      ['sudo wg show','Peers + handshakes'],
      ['sudo dnf install NetworkManager-openvpn-gnome','OpenVPN support'],
      ['sudo nmcli connection import type openvpn file client.ovpn',''],
      ['curl -s https://ifconfig.me','Check public IP']],
    code:
`# wg0.conf
[Interface]
PrivateKey = <client-private-key>
Address = 10.8.0.2/24
DNS = 10.8.0.1

[Peer]
PublicKey = <server-public-key>
Endpoint = vpn.example.com:51820
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25`,
    flags:[
      ['AllowedIPs = 0.0.0.0/0','Full tunnel (all traffic)'],
      ['AllowedIPs = 10.8.0.0/24','Split tunnel'],
      ['PersistentKeepalive','Keep NAT mappings alive'],
      ['wg show <if> latest-handshakes','Is the tunnel alive?'],
      ['nmcli con mod wg0 connection.autoconnect yes','Connect at boot']],
    example:{cmd:'sudo wg show', out:
`interface: wg0
  public key: kH3n2yV1...Qw=
  listening port: 51820

peer: 9vZt8R0c...Ag=
  endpoint: 198.51.100.10:51820
  allowed ips: 0.0.0.0/0, ::/0
  latest handshake: 12 seconds ago
  transfer: 18.42 MiB received, 2.10 MiB sent`},
    warn:'Keep <code>private.key</code> secret (<code>chmod 600</code>). Never paste it into chats or repos.' },

  { title:'curl for APIs & Downloads', icon:'🌀', badge:'HTTP', color:'blue',
    cmds:[
      ['curl -s https://api.github.com/repos/fedora-infra/bodhi | jq .stargazers_count','GET + JSON'],
      ["curl -X POST -H 'Content-Type: application/json' -d '{\"name\":\"test\"}' https://httpbin.org/post",'POST JSON'],
      ['curl -u alice https://example.com/private','Basic auth (prompts)'],
      ['curl -H "Authorization: Bearer $TOKEN" https://api.example.com/me','Token auth'],
      ['curl -o /dev/null -s -w "%{http_code} %{time_total}s\\n" https://fedoraproject.org','Status + timing'],
      ['curl -LOC - https://example.com/big.iso','Resume a download'],
      ['curl -F "file=@photo.jpg" https://example.com/upload','Upload a file'],
      ['wget -c https://example.com/big.iso','Resume with wget']],
    flags:[
      ['-X <METHOD>','GET, POST, PUT, DELETE'],
      ['-H "<header>"','Add header'],
      ['-d / --data-raw','Request body'],
      ['--json \'{…}\'','Body + JSON headers in one flag'],
      ['-F name=@file','Multipart upload'],
      ['-s / -S','Silent / still show errors'],
      ['-w "%{http_code}"','Write-out variables'],
      ['-C -','Resume transfer'],
      ['--retry N','Retry on failure'],
      ['-k','Skip TLS verification (testing only!)']],
    example:{cmd:'curl -o /dev/null -s -w "%{http_code} %{time_total}s\\n" https://fedoraproject.org', out:`200 0.482913s`} }
]);

/* ── Disk: partitioning, LUKS, network mounts, swap ── */
addCards('disk', [
  { title:'Partition & Format', icon:'🧱', badge:'MKFS', color:'red',
    cmds:[
      ['lsblk','Identify the disk FIRST'],
      ['sudo wipefs -a /dev/sdb','Remove old signatures'],
      ['sudo parted /dev/sdb mklabel gpt','New GPT table'],
      ['sudo parted -a optimal /dev/sdb mkpart data ext4 1MiB 100%','One big partition'],
      ['sudo mkfs.ext4 -L data /dev/sdb1','ext4'],
      ['sudo mkfs.xfs -L data /dev/sdb1','XFS'],
      ['sudo mkfs.btrfs -L data /dev/sdb1','Btrfs'],
      ['sudo mkfs.exfat -n USB /dev/sdb1','exFAT for USB sticks'],
      ['sudo e2label /dev/sdb1 backup','Rename ext4 label']],
    flags:[
      ['mklabel gpt | msdos','Partition table type'],
      ['mkpart <name> <fs> <start> <end>','Create partition'],
      ['-a optimal','Align for performance'],
      ['mkfs -L <label>','Filesystem label'],
      ['wipefs -n','Dry run'],
      ['gnome-disks','GUI alternative']],
    example:{cmd:'sudo parted /dev/sdb print', out:
`Model: SanDisk Extreme (scsi)
Disk /dev/sdb: 128GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt

Number  Start   End    Size   File system  Name  Flags
 1      1049kB  128GB  128GB  ext4         data`},
    danger:'These commands destroy everything on the target disk. Triple-check <code>/dev/sdX</code> with <code>lsblk</code>.' },

  { title:'LUKS Encryption', icon:'🔐', badge:'LUKS', color:'warn',
    cmds:[
      ['sudo cryptsetup luksFormat /dev/sdb1','Encrypt partition'],
      ['sudo cryptsetup open /dev/sdb1 secure','Unlock → /dev/mapper/secure'],
      ['sudo mkfs.ext4 /dev/mapper/secure','Format inside'],
      ['sudo mount /dev/mapper/secure /mnt/secure',''],
      ['sudo umount /mnt/secure && sudo cryptsetup close secure','Lock'],
      ['sudo cryptsetup luksDump /dev/sdb1','Header + key slots'],
      ['sudo cryptsetup luksAddKey /dev/sdb1','Add a passphrase'],
      ['sudo systemd-cryptenroll --tpm2-device=auto /dev/nvme0n1p3','Unlock with TPM2'],
      ['sudo cryptsetup luksHeaderBackup /dev/sdb1 --header-backup-file hdr.img','Back up header']],
    flags:[
      ['open <dev> <name>','Map to /dev/mapper/<name>'],
      ['close <name>','Remove mapping'],
      ['luksAddKey / luksRemoveKey','Manage passphrases'],
      ['--tpm2-pcrs=7','Bind to Secure Boot state'],
      ['/etc/crypttab','Unlock at boot']],
    example:{cmd:'sudo cryptsetup status secure', out:
`/dev/mapper/secure is active and is in use.
  type:    LUKS2
  cipher:  aes-xts-plain64
  keysize: 512 bits
  device:  /dev/sdb1
  sector size:  512
  mode:    read/write`},
    tip:'Keep the header backup somewhere safe — a damaged header makes the data unrecoverable.' },

  { title:'Network Shares (NFS & SMB)', icon:'🗄️', badge:'SHARES', color:'blue',
    cmds:[
      ['showmount -e 192.168.1.5','NFS exports on a server'],
      ['sudo mount -t nfs 192.168.1.5:/export/media /mnt/media',''],
      ['sudo dnf install cifs-utils','SMB client'],
      ['sudo mount -t cifs //nas/share /mnt/nas -o username=alice,uid=$(id -u),gid=$(id -g)',''],
      ['smbclient -L //nas -U alice','List SMB shares'],
      ['# fstab examples:',''],
      ['192.168.1.5:/export/media  /mnt/media  nfs   _netdev,nofail,x-systemd.automount  0 0',''],
      ['//nas/share  /mnt/nas  cifs  credentials=/root/.smbcred,uid=1000,_netdev,nofail  0 0','']],
    flags:[
      ['-t nfs | cifs','Share type'],
      ['_netdev','Wait for network'],
      ['x-systemd.automount','Mount on first access'],
      ['credentials=<file>','Keep passwords out of fstab'],
      ['vers=3.0','Force SMB version'],
      ['uid= gid=','Owner of files (SMB)']],
    example:{cmd:'showmount -e 192.168.1.5', out:
`Export list for 192.168.1.5:
/export/media   192.168.1.0/24
/export/backup  192.168.1.20`},
    tip:'Home directories on SMB need an SELinux boolean: <code>setsebool -P use_samba_home_dirs on</code>.' },

  { title:'Swap Files', icon:'🔃', badge:'SWAP', color:'blue',
    cmds:[
      ['# Btrfs (Fedora default):',''],
      ['sudo btrfs subvolume create /var/swap',''],
      ['sudo btrfs filesystem mkswapfile --size 8G /var/swap/swapfile','Creates a NOCOW file'],
      ['sudo swapon /var/swap/swapfile',''],
      ['# ext4 / XFS:',''],
      ['sudo fallocate -l 8G /swapfile',''],
      ['sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile',''],
      ['echo "/swapfile none swap defaults 0 0" | sudo tee -a /etc/fstab','Persist']],
    flags:[
      ['swapon --show','Active swap'],
      ['swapon -p <prio>','Priority (higher used first)'],
      ['swapoff <file>','Disable'],
      ['mkswapfile --size','Btrfs-safe swap file']],
    example:{cmd:'swapon --show', out:
`NAME               TYPE      SIZE USED PRIO
/dev/zram0         partition   8G 1.1G  100
/var/swap/swapfile file        8G   0B   -2`},
    tip:'A disk swap file alongside zram is mainly useful for hibernation or very memory-hungry workloads.' }
]);

/* ── Shell: variables & history ── */
addCards('shell', [
  { title:'Variables, Arrays & Strings', icon:'🔤', badge:'VARS', color:'blue',
    code:
`name="fedora"; ver=44
echo "\${name^^} $ver"  # FEDORA 44
echo "\${#name}"  # length → 6
echo "\${file%.tar.gz}"  # strip suffix
echo "\${path##*/}"  # basename
echo "\${var:-default}"  # fallback value
echo "\${text//foo/bar}"  # replace all

pkgs=(vim git htop)
echo "\${pkgs[0]} \${#pkgs[@]}"  # vim 3
for p in "\${pkgs[@]}"; do echo "$p"; done

declare -A port=([ssh]=22 [http]=80)
echo "\${port[ssh]}"  # 22

echo $(( (ver + 1) * 2 ))  # arithmetic → 90

greet() { local who=$1; echo "hi $who"; }
greet sooraj
read -rp "Continue? [y/N] " ans`,
    flags:[
      ['${v:-x}','Use x if v unset/empty'],
      ['${v:=x}','Assign x if unset'],
      ['${v#p} / ${v##p}','Strip shortest / longest prefix'],
      ['${v%s} / ${v%%s}','Strip shortest / longest suffix'],
      ['${v/a/b} / ${v//a/b}','Replace first / all'],
      ['${v^^} / ${v,,}','Upper / lower case'],
      ['${v:off:len}','Substring'],
      ['${#arr[@]}','Array length'],
      ['declare -A','Associative array'],
      ['local','Function-scoped variable']],
    example:{cmd:'f=backup-2026.tar.gz; echo "${f%%.*} ${f##*.}"', out:`backup-2026 gz`} },

  { title:'History, Aliases & Prompt', icon:'🕘', badge:'HISTORY', color:'green',
    cmds:[
      ['history | tail -20','Recent commands'],
      ['history | grep dnf','Search history'],
      ['!123','Re-run entry 123'],
      ['!dnf','Re-run last dnf command'],
      ['^old^new','Re-run last cmd with a replacement'],
      ["alias ll='ls -lah --color=auto'",'Create alias'],
      ['unalias ll','Remove alias'],
      ['mkdir -p ~/.bashrc.d && vim ~/.bashrc.d/aliases.sh','Fedora auto-loads ~/.bashrc.d/*'],
      ['echo "HISTSIZE=10000" >> ~/.bashrc.d/history.sh','Longer history'],
      ['type ll','See what an alias expands to']],
    flags:[
      ['history -c','Clear session history'],
      ['history -d N','Delete entry N'],
      ['HISTCONTROL=ignoreboth','Skip dupes and space-prefixed'],
      ['HISTTIMEFORMAT="%F %T "','Timestamps in history'],
      ['PS1=','Prompt format string'],
      ['\\u \\h \\w','Prompt: user, host, dir']],
    example:{cmd:'history | tail -3', out:
`  998  sudo dnf upgrade --refresh
  999  systemctl status sshd
 1000  history | tail -3`},
    tip:'Start a command with a space to keep it (and any secret in it) out of history when HISTCONTROL=ignoreboth.' }
]);

/* ── Logs: dmesg & crashes ── */
addCards('logs', [
  { title:'Kernel Messages & Crashes', icon:'💥', badge:'DEBUG', color:'red',
    cmds:[
      ['sudo dmesg -T | tail -20','Recent kernel log, human time'],
      ['sudo dmesg -T --level=err,warn','Only problems'],
      ['sudo dmesg -w','Follow live (plug a USB in!)'],
      ['coredumpctl list','Crashed programs'],
      ['coredumpctl info firefox','Crash details + backtrace'],
      ['coredumpctl debug 2210','Open in gdb'],
      ['journalctl --list-boots','Previous boots'],
      ['journalctl -b -1 -e','End of last boot (after a crash)']],
    flags:[
      ['dmesg -T','Readable timestamps'],
      ['dmesg -l err,warn','Filter levels'],
      ['dmesg -w','Wait for new messages'],
      ['coredumpctl list --since today','Recent crashes'],
      ['coredumpctl dump <pid> -o core','Export core file']],
    example:{cmd:'sudo dmesg -T | tail -4', out:
`[Wed Sep 30 00:38:11 2026] usb 3-2: new SuperSpeed USB device number 4 using xhci_hcd
[Wed Sep 30 00:38:11 2026] usb 3-2: Product: Extreme
[Wed Sep 30 00:38:11 2026] sd 0:0:0:0: [sdb] 250069680 512-byte logical blocks: (128 GB/119 GiB)
[Wed Sep 30 00:38:11 2026]  sdb: sdb1`} }
]);

/* ── NEW: Containers ── */
insertAfter('flatpak', { id:'containers', icon:'🐳', title:'Containers', sub:'Podman & friends', desc:'rootless podman, pods, quadlets and dev containers',
  cards:[
  { title:'Images', icon:'🖼️', badge:'IMAGES', color:'blue',
    cmds:[
      ['podman search nginx','Search registries'],
      ['podman pull registry.fedoraproject.org/fedora:44',''],
      ['podman images','Local images'],
      ['podman build -t myapp:1.0 .','Build from Containerfile'],
      ['podman tag myapp:1.0 quay.io/me/myapp:1.0',''],
      ['podman login quay.io',''],
      ['podman push quay.io/me/myapp:1.0',''],
      ['podman image prune -a','Remove unused images'],
      ['podman save -o myapp.tar myapp:1.0','Export to a file']],
    code:
`# Containerfile
FROM registry.fedoraproject.org/fedora-minimal:44
RUN microdnf install -y python3 && microdnf clean all
WORKDIR /app
COPY . .
EXPOSE 8000
CMD ["python3", "-m", "http.server", "8000"]`,
    flags:[
      ['build -t <name:tag>','Tag the image'],
      ['build -f <file>','Custom Containerfile'],
      ['build --no-cache','Rebuild every layer'],
      ['images -a','Include intermediate'],
      ['rmi <image>','Delete image'],
      ['history <image>','Layer history']],
    example:{cmd:'podman images', out:
`REPOSITORY                             TAG     IMAGE ID      CREATED        SIZE
localhost/myapp                        1.0     4f2c9a81e0b3  3 minutes ago  148 MB
registry.fedoraproject.org/fedora      44      b21d7c4e9a10  2 days ago     171 MB
docker.io/library/nginx                latest  a8758716bb6a  6 days ago     197 MB`} },

  { title:'Containers', icon:'📦', badge:'RUN', color:'green',
    cmds:[
      ['podman run -d --name web -p 8080:80 docker.io/library/nginx','Detached + port'],
      ['podman run --rm -it registry.fedoraproject.org/fedora:44 bash','Throwaway shell'],
      ['podman ps -a','All containers'],
      ['podman exec -it web sh','Shell inside'],
      ['podman logs -f --tail 50 web','Follow logs'],
      ['podman stats --no-stream','Resource use'],
      ['podman inspect web --format "{{.NetworkSettings.IPAddress}}"','Pick a field'],
      ['podman cp web:/etc/nginx/nginx.conf .','Copy out'],
      ['podman stop web && podman rm web',''],
      ['podman container prune','Remove stopped']],
    flags:[
      ['-d','Detached'],
      ['-it','Interactive + TTY'],
      ['--rm','Delete on exit'],
      ['-p host:ctr','Publish port'],
      ['-e KEY=val / --env-file','Environment'],
      ['-v src:dst:Z','Bind mount + SELinux label'],
      ['--restart=always','Restart policy'],
      ['--memory=512m --cpus=1','Limits'],
      ['--userns=keep-id','Map your UID inside']],
    example:{cmd:'podman stats --no-stream', out:
`ID            NAME   CPU %   MEM USAGE / LIMIT  MEM %   NET IO           BLOCK IO     PIDS
a1b2c3d4e5f6  web    0.02%   6.9MB / 32.9GB     0.02%   2.1kB / 1.3kB    0B / 12kB    9`} },

  { title:'Volumes, Networks & Pods', icon:'🧬', badge:'PODS', color:'blue',
    cmds:[
      ['podman volume create pgdata',''],
      ['podman volume ls',''],
      ['podman network create appnet',''],
      ['podman run -d --name db --network appnet -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret docker.io/library/postgres:17',''],
      ['podman pod create --name app -p 8080:80','Shared network namespace'],
      ['podman run -d --pod app docker.io/library/nginx',''],
      ['podman pod ps',''],
      ['podman kube generate app > app.yaml','Export as Kubernetes YAML'],
      ['podman kube play app.yaml','Recreate from YAML'],
      ['podman-compose up -d','Use a compose file']],
    flags:[
      ['--network <net>','Join a network (name resolves)'],
      ['-v <vol>:<path>','Named volume'],
      ['--pod <name>','Run inside a pod'],
      ['pod create -p','Ports belong to the pod'],
      ['kube play --down','Tear it down']],
    example:{cmd:'podman pod ps', out:
`POD ID        NAME   STATUS   CREATED        INFRA ID      # OF CONTAINERS
7e1f00c2a9d4  app    Running  4 minutes ago  0cb22e7d1f3a  2`} },

  { title:'Run as a Service (Quadlet)', icon:'🚦', badge:'QUADLET', color:'warn',
    desc:'Save as <code>~/.config/containers/systemd/web.container</code>.',
    code:
`[Unit]
Description=Nginx web container

[Container]
Image=docker.io/library/nginx:latest
PublishPort=8080:80
Volume=%h/site:/usr/share/nginx/html:Z
AutoUpdate=registry

[Service]
Restart=always

[Install]
WantedBy=default.target`,
    cmds:[
      ['systemctl --user daemon-reload','Generate web.service'],
      ['systemctl --user start web',''],
      ['systemctl --user status web',''],
      ['loginctl enable-linger $USER','Keep running after logout'],
      ['podman auto-update','Pull newer images + restart'],
      ['/usr/libexec/podman/quadlet -dryrun -user','Debug a quadlet file']],
    flags:[
      ['.container / .pod / .volume / .network','Quadlet unit types'],
      ['AutoUpdate=registry','Allow podman auto-update'],
      ['/etc/containers/systemd/','Rootful (system) quadlets'],
      ['%h','Your home directory']],
    example:{cmd:'systemctl --user status web', out:
`● web.service - Nginx web container
     Loaded: loaded (/home/sooraj/.config/containers/systemd/web.container; generated)
     Active: active (running) since Wed 2026-09-30 00:41:07 +03; 18s ago
   Main PID: 6120 (conmon)`},
    tip:'Quadlet is the modern replacement for <code>podman generate systemd</code>.' },

  { title:'Toolbox & Distrobox', icon:'🧪', badge:'DEV', color:'green',
    cmds:[
      ['toolbox create','Fedora dev container'],
      ['toolbox enter',''],
      ['toolbox create --distro fedora --release 43 f43','Another release'],
      ['toolbox list',''],
      ['sudo dnf install distrobox',''],
      ['distrobox create -i docker.io/library/ubuntu:24.04 -n ubuntu','Any distro'],
      ['distrobox enter ubuntu',''],
      ['distrobox-export --app code','Export a GUI app to your menu']],
    flags:[
      ['--distro / --release','Toolbox image choice'],
      ['-i <image>','Distrobox image'],
      ['-n <name>','Container name'],
      ['rm <name>','Delete'],
      ['--root','Rootful distrobox']],
    example:{cmd:'toolbox list', out:
`IMAGE ID      IMAGE NAME                                    CREATED
b21d7c4e9a10  registry.fedoraproject.org/fedora-toolbox:44  2 days ago

CONTAINER ID  CONTAINER NAME     CREATED      STATUS   IMAGE NAME
e4d9f2a0c1b7  fedora-toolbox-44  2 days ago   running  registry.fedoraproject.org/fedora-toolbox:44`},
    tip:'Both share your home directory, so your dotfiles and projects are available inside.' }
  ]});

/* ── NEW: Virtualization ── */
insertAfter('containers', { id:'virt', icon:'🖥️', title:'Virtualization', sub:'KVM & libvirt', desc:'kvm virtual machines with libvirt, virsh and virt-install',
  cards:[
  { title:'Install KVM', icon:'🧩', badge:'SETUP', color:'green',
    cmds:[
      ['grep -Ec "(vmx|svm)" /proc/cpuinfo','> 0 means CPU virtualization is on'],
      ['sudo dnf group install --with-optional virtualization',''],
      ['sudo systemctl enable --now libvirtd',''],
      ['sudo usermod -aG libvirt $USER','Manage VMs without sudo (re-login)'],
      ['virt-host-validate qemu','Check host readiness'],
      ['sudo dnf install gnome-boxes','Simple GUI alternative']],
    flags:[
      ['--with-optional','Include virt-manager, virt-install, …'],
      ['virt-host-validate','Checks KVM, IOMMU, cgroups'],
      ['qemu:///system','System VMs (default for libvirt group)'],
      ['qemu:///session','Per-user VMs']],
    example:{cmd:'virt-host-validate qemu', out:
`  QEMU: Checking for hardware virtualization                 : PASS
  QEMU: Checking if device '/dev/kvm' exists                  : PASS
  QEMU: Checking if device '/dev/kvm' is accessible           : PASS
  QEMU: Checking for cgroup 'cpu' controller support          : PASS
  QEMU: Checking for secure guest support                     : WARN (AMD SEV not enabled)`} },

  { title:'Create VMs (virt-install)', icon:'🏗️', badge:'CREATE', color:'blue',
    cmds:[
      ['osinfo-query os | grep fedora','Known OS variants'],
      ['virt-install --name f44 --memory 4096 --vcpus 2 --disk size=30 --cdrom ~/Downloads/Fedora-Workstation-Live-44.iso --os-variant fedora-unknown',''],
      ['virt-install --name srv --memory 2048 --vcpus 2 --disk size=20 --location https://download.fedoraproject.org/pub/fedora/linux/releases/44/Server/x86_64/os/ --os-variant fedora-unknown --graphics none --extra-args "console=ttyS0"','Headless network install'],
      ['virt-manager','GUI manager']],
    flags:[
      ['--memory <MiB>','RAM'],
      ['--vcpus N','CPUs'],
      ['--disk size=<GiB>','New disk in default pool'],
      ['--cdrom / --location','ISO / network tree'],
      ['--os-variant','Tunes defaults'],
      ['--graphics none','Serial console only'],
      ['--network network=default','NAT network'],
      ['--boot uefi','UEFI firmware']],
    example:{cmd:'osinfo-query os | grep -i "fedora 4"', out:
` fedora40             | Fedora Linux 40          | 40       | http://fedoraproject.org/fedora/40
 fedora41             | Fedora Linux 41          | 41       | http://fedoraproject.org/fedora/41
 fedora-unknown       | Fedora                   | unknown  | http://fedoraproject.org/fedora/unknown`} },

  { title:'Manage VMs (virsh)', icon:'🎛️', badge:'VIRSH', color:'blue',
    cmds:[
      ['virsh list --all','All VMs'],
      ['virsh start f44',''],
      ['virsh shutdown f44','Graceful'],
      ['virsh destroy f44','Pull the plug'],
      ['virsh autostart f44','Start with host'],
      ['virsh dominfo f44',''],
      ['virsh domifaddr f44','Guest IP'],
      ['virsh console f44','Serial console (Ctrl+] exits)'],
      ['virsh setmem f44 6G --config','Change RAM'],
      ['virsh undefine f44 --remove-all-storage','Delete VM + disks']],
    flags:[
      ['--all','Include shut-off VMs'],
      ['--config / --live','Persistent / running VM'],
      ['net-list --all','Virtual networks'],
      ['pool-list / vol-list default','Storage'],
      ['edit <vm>','Edit XML safely']],
    example:{cmd:'virsh list --all', out:
` Id   Name   State
-----------------------
 2    f44    running
 -    srv    shut off
 -    win11  shut off`} },

  { title:'Snapshots & Disks', icon:'📸', badge:'SNAPSHOT', color:'warn',
    cmds:[
      ['virsh snapshot-create-as f44 clean --description "fresh install"',''],
      ['virsh snapshot-list f44',''],
      ['virsh snapshot-revert f44 clean',''],
      ['virsh snapshot-delete f44 clean',''],
      ['qemu-img info /var/lib/libvirt/images/f44.qcow2','Disk details'],
      ['sudo qemu-img resize /var/lib/libvirt/images/f44.qcow2 +10G','Grow disk (VM off)'],
      ['qemu-img convert -O qcow2 disk.vmdk disk.qcow2','Import from VMware']],
    flags:[
      ['snapshot-create-as <vm> <name>','Named snapshot'],
      ['--disk-only','External disk snapshot'],
      ['qemu-img -O qcow2|raw','Output format'],
      ['qemu-img check','Verify image']],
    example:{cmd:'virsh snapshot-list f44', out:
` Name     Creation Time               State
-----------------------------------------------------
 clean    2026-09-29 18:02:14 +0300   shutoff
 pre-dnf  2026-09-29 23:41:50 +0300   running`} }
  ]});

/* ── NEW: Web & Databases ── */
insertAfter('virt', { id:'web', icon:'🌍', title:'Web & DB', sub:'nginx, SQL, Python', desc:'web servers, databases and python environments',
  cards:[
  { title:'nginx', icon:'🟢', badge:'NGINX', color:'green',
    cmds:[
      ['sudo dnf install nginx',''],
      ['sudo systemctl enable --now nginx',''],
      ['sudo firewall-cmd --add-service={http,https} --permanent && sudo firewall-cmd --reload',''],
      ['sudo nginx -t','Test config'],
      ['sudo systemctl reload nginx','Apply'],
      ['sudo setsebool -P httpd_can_network_connect on','Allow reverse proxy (SELinux)'],
      ['sudo tail -f /var/log/nginx/error.log','']],
    code:
`# /etc/nginx/conf.d/app.conf
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`,
    flags:[
      ['nginx -t','Syntax check'],
      ['nginx -T','Dump full effective config'],
      ['nginx -s reload','Signal reload'],
      ['sudo dnf install certbot python3-certbot-nginx','Let\'s Encrypt'],
      ['certbot --nginx -d <domain>','Get + install cert']],
    example:{cmd:'sudo nginx -t', out:
`nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful`} },

  { title:'Apache (httpd)', icon:'🪶', badge:'HTTPD', color:'blue',
    cmds:[
      ['sudo dnf install httpd mod_ssl',''],
      ['sudo systemctl enable --now httpd',''],
      ['sudo apachectl configtest',''],
      ['sudo httpd -S','Virtual hosts summary'],
      ['sudo httpd -M','Loaded modules'],
      ['ls /etc/httpd/conf.d/','Drop-in configs'],
      ['sudo semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/app/uploads(/.*)?" && sudo restorecon -Rv /var/www/app','Writable dir for the app']],
    flags:[
      ['apachectl configtest','Syntax check'],
      ['apachectl graceful','Reload without dropping connections'],
      ['httpd -S','Parsed vhost settings'],
      ['httpd_sys_content_t','SELinux: read-only content'],
      ['httpd_sys_rw_content_t','SELinux: writable content']],
    example:{cmd:'sudo apachectl configtest', out:`Syntax OK`} },

  { title:'PostgreSQL', icon:'🐘', badge:'POSTGRES', color:'blue',
    cmds:[
      ['sudo dnf install postgresql-server postgresql-contrib',''],
      ['sudo postgresql-setup --initdb','Create cluster'],
      ['sudo systemctl enable --now postgresql',''],
      ['sudo -u postgres psql','Admin shell'],
      ['sudo -u postgres createuser --pwprompt appuser',''],
      ['sudo -u postgres createdb -O appuser appdb',''],
      ['psql -h localhost -U appuser appdb',''],
      ['pg_dump -U appuser -Fc appdb > appdb.dump','Backup'],
      ['pg_restore -U appuser -d appdb appdb.dump','Restore']],
    flags:[
      ['\\l  \\c db  \\dt  \\d table','psql: list DBs, connect, tables, describe'],
      ['\\du','psql: roles'],
      ['\\q','psql: quit'],
      ['pg_dump -Fc','Custom compressed format'],
      ['/var/lib/pgsql/data/pg_hba.conf','Client auth rules']],
    example:{cmd:'sudo -u postgres psql -c "\\l"', out:
`                                                  List of databases
   Name    |  Owner   | Encoding | Locale Provider |   Collate   |    Ctype
-----------+----------+----------+-----------------+-------------+-------------
 appdb     | appuser  | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8
 postgres  | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8
 template0 | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8
 template1 | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8
(4 rows)`},
    tip:'Password logins from apps need <code>scram-sha-256</code> (not <code>ident</code>) in pg_hba.conf.' },

  { title:'MariaDB / MySQL', icon:'🐬', badge:'MARIADB', color:'blue',
    cmds:[
      ['sudo dnf install mariadb-server',''],
      ['sudo systemctl enable --now mariadb',''],
      ['sudo mariadb-secure-installation','Harden defaults'],
      ['sudo mariadb','Root shell (socket auth)'],
      ["CREATE DATABASE appdb; CREATE USER 'app'@'localhost' IDENTIFIED BY 'S3cret!'; GRANT ALL ON appdb.* TO 'app'@'localhost';",'SQL'],
      ['mariadb -u app -p appdb',''],
      ['mariadb-dump -u app -p appdb > appdb.sql','Backup'],
      ['mariadb -u app -p appdb < appdb.sql','Restore']],
    flags:[
      ['-u <user> -p','User + password prompt'],
      ['-h <host>','Remote server'],
      ['-e "<sql>"','Run one statement'],
      ['--single-transaction','Consistent InnoDB dump'],
      ['SHOW DATABASES; SHOW TABLES;','Explore']],
    example:{cmd:'sudo mariadb -e "SHOW DATABASES;"', out:
`+--------------------+
| Database           |
+--------------------+
| appdb              |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+`} },

  { title:'Python Environments', icon:'🐍', badge:'PYTHON', color:'green',
    cmds:[
      ['python3 --version',''],
      ['python3 -m venv .venv','Project virtualenv'],
      ['source .venv/bin/activate',''],
      ['pip install -r requirements.txt',''],
      ['pip freeze > requirements.txt',''],
      ['deactivate',''],
      ['sudo dnf install pipx && pipx install httpie','Isolated CLI tools'],
      ['sudo dnf install uv && uv venv && uv pip install flask','Fast alternative'],
      ['sudo dnf install python3.12','Parallel older Python'],
      ['python3 -m http.server 8000','Instant file server']],
    flags:[
      ['-m venv <dir>','Create env'],
      ['--system-site-packages','Use dnf-installed libs too'],
      ['pip install -U','Upgrade'],
      ['pip list --outdated',''],
      ['pipx install / upgrade-all',''],
      ['python3 -m pip','Pip for that exact interpreter']],
    example:{cmd:'python3 -m venv .venv && source .venv/bin/activate && pip install flask', out:
`Collecting flask
  Downloading flask-3.1.2-py3-none-any.whl (103 kB)
Collecting werkzeug>=3.1.0 (from flask)
  Downloading werkzeug-3.1.3-py3-none-any.whl (224 kB)
Installing collected packages: markupsafe, itsdangerous, click, blinker, werkzeug, jinja2, flask
Successfully installed blinker-1.9.0 click-8.2.1 flask-3.1.2 itsdangerous-2.2.0 jinja2-3.1.6 markupsafe-3.0.2 werkzeug-3.1.3`},
    warn:'Never <code>sudo pip install</code> — it can break dnf-managed Python packages. Use a venv, pipx, or dnf.' }
  ]});
})();

/* ═════════════════ MORE CONTENT (v2.3) ═════════════════ */
(function () {
const D = window.FB_DATA;
const sec = id => D.find(s => s.id === id);
const addCards = (id, cards) => sec(id).cards.push(...cards);
const insertAfter = (id, s) => D.splice(D.findIndex(x => x.id === id) + 1, 0, s);

/* ── Files: attributes & odd jobs ── */
addCards('files', [
  { title:'File Info, Attributes & Odd Jobs', icon:'🧷', badge:'UTILS', color:'blue',
    cmds:[
      ['file mystery.bin','Detect file type'],
      ['stat file.txt','Size, inode, timestamps'],
      ['realpath ./link','Absolute resolved path'],
      ['sudo chattr +i /etc/resolv.conf','Make immutable (even root can\'t change)'],
      ['lsattr /etc/resolv.conf','Show attributes'],
      ['sudo chattr -i /etc/resolv.conf','Remove immutable'],
      ['tmp=$(mktemp -d)','Safe temp directory'],
      ['rename .jpeg .jpg *.jpeg','Bulk rename (util-linux)'],
      ['split -b 100M big.iso part_','Split a file'],
      ['cat part_* > big.iso','Join it back'],
      ['truncate -s 0 app.log','Empty a file in place'],
      ['touch -d "2026-01-01 12:00" file','Set a timestamp']],
    flags:[
      ['chattr +i / -i','Immutable'],
      ['chattr +a','Append-only (good for logs)'],
      ['stat -c "%s %y"','Custom format: size, mtime'],
      ['mktemp -d','Directory instead of file'],
      ['split -b / -l','By bytes / by lines'],
      ['rename -n','Dry run'],
      ['file -i','MIME type']],
    example:{cmd:'file photo.heic backup.tar.zst script.sh', out:
`photo.heic:     ISO Media, HEIF Image HEVC Main or Main Still Picture Profile
backup.tar.zst: Zstandard compressed data (v0.8+), Dictionary ID: None
script.sh:      Bourne-Again shell script, ASCII text executable`} }
]);

/* ── SSH: agent, sshfs, multiplexing ── */
addCards('ssh', [
  { title:'Agent, SSHFS & Speed-ups', icon:'🚀', badge:'PRO', color:'green',
    cmds:[
      ['eval "$(ssh-agent -s)" && ssh-add','Start agent (GNOME runs one for you)'],
      ['ssh -A user@host','Forward your agent (trusted hosts only)'],
      ['sudo dnf install fuse-sshfs',''],
      ['sshfs user@host:/var/www ~/remote-www','Mount remote dir'],
      ['fusermount3 -u ~/remote-www','Unmount'],
      ['ssh-keyscan github.com >> ~/.ssh/known_hosts','Pre-trust a host key'],
      ['sudo dnf install mosh && mosh user@host','Roaming-friendly shell'],
      ['ssh -O check myserver','Is the shared connection up?']],
    code:
`# ~/.ssh/config — reuse one connection for many sessions
Host *
  ControlMaster auto
  ControlPath ~/.ssh/cm-%r@%h:%p
  ControlPersist 10m
  Compression yes`,
    flags:[
      ['-A','Agent forwarding'],
      ['-O check | exit','Control a multiplexed master'],
      ['-o StrictHostKeyChecking=accept-new','Auto-trust new, reject changed keys'],
      ['sshfs -o reconnect','Survive network drops'],
      ['sshfs -o idmap=user','Map remote UID to you']],
    example:{cmd:'ssh -O check myserver', out:`Master running (pid=8812)`},
    warn:'Only use <code>-A</code> with hosts you fully trust — admins there can use your keys while you are connected.' }
]);

/* ── Firewall: logging & debugging ── */
addCards('firewall', [
  { title:'Logging, Panic & nftables', icon:'🔬', badge:'DEBUG', color:'warn',
    cmds:[
      ['sudo firewall-cmd --get-log-denied',''],
      ['sudo firewall-cmd --set-log-denied=unicast','Log dropped packets'],
      ['journalctl -k -g "filter_IN_.*REJECT"','See what was blocked'],
      ['sudo firewall-cmd --check-config','Validate permanent config'],
      ['sudo firewall-cmd --panic-on','Drop ALL traffic now'],
      ['sudo firewall-cmd --panic-off',''],
      ['sudo nft list ruleset | less','Raw nftables rules firewalld built'],
      ['sudo firewall-cmd --list-services --zone=public','']],
    flags:[
      ['--set-log-denied=all|unicast|broadcast|multicast|off','Which drops to log'],
      ['--check-config','Lint XML config'],
      ['--panic-on / --query-panic','Emergency lockdown'],
      ['nft list ruleset','Everything in the kernel'],
      ['nft list table inet firewalld','firewalld\'s table only']],
    example:{cmd:'journalctl -k -g REJECT -n 2 --no-pager', out:
`Sep 30 00:44:02 fedora-ws kernel: filter_IN_FedoraWorkstation_REJECT: IN=enp3s0 OUT= SRC=192.168.1.77 DST=192.168.1.42 PROTO=TCP SPT=51544 DPT=22 SYN
Sep 30 00:44:05 fedora-ws kernel: filter_IN_FedoraWorkstation_REJECT: IN=enp3s0 OUT= SRC=192.168.1.77 DST=192.168.1.42 PROTO=TCP SPT=51546 DPT=22 SYN`},
    danger:'<code>--panic-on</code> cuts your own SSH session too. Only use it from a local console.' }
]);

/* ── Processes: handy wrappers ── */
addCards('process', [
  { title:'Handy Wrappers', icon:'🎁', badge:'WRAP', color:'green',
    cmds:[
      ['watch -n 2 -d "ss -s"','Re-run every 2s, highlight changes'],
      ['timeout 10s ping fedoraproject.org','Kill after 10 seconds'],
      ['time tar -czf a.tgz dir/','How long did it take?'],
      ['/usr/bin/time -v make','Peak memory + more'],
      ['flock /tmp/job.lock ./backup.sh','Prevent overlapping runs'],
      ['yes | head -3','Feed "y" to prompts'],
      ['sleep 5; notify-send "Done" "Build finished"','Desktop notification'],
      ['systemd-inhibit --what=idle:sleep sleep 3600','Keep awake for an hour']],
    flags:[
      ['watch -n <s>','Interval'],
      ['watch -d','Highlight differences'],
      ['timeout -s KILL','Signal to send'],
      ['timeout -k 5s 30s','Kill 5s after TERM'],
      ['flock -n','Fail instead of waiting'],
      ['systemd-inhibit --what=sleep|idle|shutdown','Block power actions']],
    example:{cmd:'/usr/bin/time -v gzip -k big.log 2>&1 | grep -E "Elapsed|Maximum resident"', out:
`	Elapsed (wall clock) time (h:mm:ss or m:ss): 0:02.41
	Maximum resident set size (kbytes): 1892`} }
]);

/* ── NEW: Desktop (GNOME) ── */
insertAfter('boot', { id:'desktop', icon:'🎨', title:'Desktop', sub:'GNOME & session', desc:'gnome settings, extensions, fonts, defaults and session info',
  cards:[
  { title:'gsettings & dconf', icon:'🎚️', badge:'GNOME', color:'blue',
    cmds:[
      ["gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'",'Dark mode'],
      ["gsettings set org.gnome.desktop.wm.preferences button-layout 'appmenu:minimize,maximize,close'",'Min/max buttons'],
      ['gsettings set org.gnome.desktop.interface show-battery-percentage true',''],
      ['gsettings set org.gnome.desktop.peripherals.touchpad tap-to-click true',''],
      ['gsettings get org.gnome.desktop.interface font-name',''],
      ['gsettings list-recursively org.gnome.desktop.interface','All keys in a schema'],
      ['dconf dump /org/gnome/ > gnome-settings.ini','Back up all GNOME settings'],
      ['dconf load /org/gnome/ < gnome-settings.ini','Restore them'],
      ['dconf reset -f /org/gnome/desktop/wm/','Reset a subtree']],
    flags:[
      ['get / set / reset <schema> <key>','Read / write / default'],
      ['list-schemas','All schemas'],
      ['list-keys <schema>','Keys in a schema'],
      ['range <schema> <key>','Allowed values'],
      ['dconf watch /','Print changes live (find a key!)']],
    example:{cmd:'gsettings get org.gnome.desktop.interface color-scheme', out:`'prefer-dark'`},
    tip:'Run <code>dconf watch /</code>, flip a switch in Settings, and it prints the exact key to script.' },

  { title:'Extensions & Apps', icon:'🧩', badge:'EXT', color:'green',
    cmds:[
      ['gnome-extensions list --enabled',''],
      ['gnome-extensions enable appindicatorsupport@rgcjonas.gmail.com',''],
      ['gnome-extensions disable <uuid>',''],
      ['sudo dnf install gnome-tweaks gnome-extensions-app',''],
      ['flatpak install flathub com.mattjakeman.ExtensionManager','Browse & install extensions'],
      ['xdg-open report.pdf','Open with default app'],
      ['xdg-mime query default application/pdf','Default handler'],
      ['xdg-mime default org.gnome.Papers.desktop application/pdf','Change it'],
      ['ls /usr/share/applications ~/.local/share/applications','.desktop launchers']],
    flags:[
      ['list --enabled | --disabled | --user',''],
      ['info <uuid>','Details + state'],
      ['prefs <uuid>','Open extension settings'],
      ['xdg-mime query filetype <file>','MIME type of a file']],
    example:{cmd:'gnome-extensions list --enabled', out:
`appindicatorsupport@rgcjonas.gmail.com
background-logo@fedorahosted.org
dash-to-dock@micxgx.gmail.com`} },

  { title:'Fonts & Session Info', icon:'🔤', badge:'SESSION', color:'blue',
    cmds:[
      ['echo $XDG_SESSION_TYPE','wayland or x11'],
      ['echo $XDG_CURRENT_DESKTOP','GNOME, KDE…'],
      ['loginctl list-sessions',''],
      ['fc-list : family | sort -u | head','Installed font families'],
      ['mkdir -p ~/.local/share/fonts && cp *.ttf ~/.local/share/fonts/','Install fonts for you'],
      ['fc-cache -fv','Refresh font cache'],
      ['sudo dnf install google-noto-sans-arabic-fonts','Font from repos'],
      ['fc-match "Noto Sans Arabic"','Check a font resolves']],
    flags:[
      ['fc-list :lang=ar','Fonts covering a language'],
      ['fc-match monospace','What "monospace" resolves to'],
      ['fc-cache -f','Force rebuild'],
      ['loginctl show-session <id>','Session properties']],
    example:{cmd:'fc-match monospace', out:`AdwaitaMono-Regular.ttf: "Adwaita Mono" "Regular"`} },

  { title:'Screenshots, Recording & Keys', icon:'📷', badge:'KEYS', color:'green',
    table:{head:['Shortcut','Action'], rows:[
      ['Print','Screenshot / screencast UI'],
      ['Shift+Print','Screenshot the whole screen'],
      ['Alt+Print','Screenshot a window'],
      ['Ctrl+Alt+Shift+R','Start/stop screen recording'],
      ['Super','Activities overview'],
      ['Super+A','App grid'],
      ['Super+V','Notifications / calendar'],
      ['Super+L','Lock screen'],
      ['Super+←/→','Snap window left / right'],
      ['Super+Page Up/Down','Switch workspace'],
      ['Alt+F2 → r','Restart GNOME Shell (X11 only)'],
      ['Ctrl+Alt+T','Terminal (if set in Settings → Keyboard)']]},
    cmds:[
      ['ls ~/Pictures/Screenshots ~/Videos/Screencasts','Where they are saved']],
    example:{cmd:'ls ~/Pictures/Screenshots | tail -2', out:
`Screenshot From 2026-09-30 00-41-12.png
Screenshot From 2026-09-30 00-43-57.png`} }
  ]});

/* ── NEW: Hardware & Drivers ── */
insertAfter('desktop', { id:'hardware', icon:'🔌', title:'Hardware', sub:'Devices & drivers', desc:'inspect hardware, udev, nvidia drivers and secure boot',
  cards:[
  { title:'Inspect Hardware', icon:'🔍', badge:'HW', color:'blue',
    cmds:[
      ['inxi -Fxz','Full summary (dnf install inxi)'],
      ['sudo lshw -short','Hardware tree'],
      ['lspci -nnk | grep -A3 -Ei "vga|3d"','GPU + driver in use'],
      ['lsusb -t','USB tree with speeds'],
      ['sudo dmidecode -t memory | grep -E "Size|Speed|Type:"','RAM sticks'],
      ['cat /sys/class/power_supply/BAT0/capacity','Battery %'],
      ['sudo smartctl -H /dev/nvme0n1','Disk health verdict'],
      ['glxinfo -B','OpenGL renderer (mesa-demos)'],
      ['vulkaninfo --summary','Vulkan GPUs']],
    flags:[
      ['inxi -F','Full'],
      ['inxi -x / -xx','Extra detail'],
      ['inxi -z','Hide serials/IPs (safe to share)'],
      ['lspci -nn','Vendor:device IDs'],
      ['lspci -k','Kernel driver'],
      ['lshw -C display|network|disk','One class']],
    example:{cmd:'inxi -Gxz', out:
`Graphics:
  Device-1: AMD Phoenix1 vendor: Lenovo driver: amdgpu v: kernel arch: RDNA-3
  Display: wayland server: X.org v: 1.21.1.18 with: Xwayland v: 24.1.8
    compositor: gnome-shell driver: gpu: amdgpu resolution: 2880x1800~120Hz
  API: OpenGL v: 4.6 vendor: amd mesa v: 26.1.3 renderer: AMD Radeon 780M
  API: Vulkan v: 1.4.321 drivers: radv surfaces: xcb,xlib,wayland`},
    tip:'<code>inxi -Fxz</code> output is the thing to paste when asking for help on forums — it hides serial numbers.' },

  { title:'udev & Device Events', icon:'⚡', badge:'UDEV', color:'blue',
    cmds:[
      ['udevadm monitor --udev --property','Watch plug/unplug events'],
      ['udevadm info --query=property /dev/sdb','Device properties'],
      ['udevadm info -a /dev/sdb | head -30','Attributes for rule matching'],
      ['sudoedit /etc/udev/rules.d/99-usb-serial.rules','Custom rule'],
      ['sudo udevadm control --reload && sudo udevadm trigger','Apply rules']],
    code:
`# /etc/udev/rules.d/99-usb-serial.rules
# Stable name + group access for an Arduino
SUBSYSTEM=="tty", ATTRS{idVendor}=="2341", ATTRS{idProduct}=="0043", \\
  SYMLINK+="arduino", GROUP="dialout", MODE="0660"`,
    flags:[
      ['monitor --udev --property','Events with properties'],
      ['info -a','Walk up parent attributes'],
      ['trigger --action=add','Re-run rules'],
      ['ATTRS{idVendor}','Match USB vendor'],
      ['SYMLINK+=','Add stable /dev name']],
    example:{cmd:'udevadm monitor --udev', out:
`monitor will print the received events for:
UDEV - the event which udev sends out after rule processing

UDEV  [8812.402118] add      /devices/pci0000:00/.../usb3/3-2 (usb)
UDEV  [8812.513007] add      /devices/.../block/sdb (block)
UDEV  [8812.521644] add      /devices/.../block/sdb/sdb1 (block)`} },

  { title:'NVIDIA Drivers', icon:'🟩', badge:'NVIDIA', color:'warn',
    cmds:[
      ['# 1. Enable RPM Fusion nonfree (see DNF → Repositories)',''],
      ['sudo dnf upgrade --refresh && sudo reboot','Be on the newest kernel first'],
      ['sudo dnf install akmod-nvidia','Driver (auto-rebuilds per kernel)'],
      ['sudo dnf install xorg-x11-drv-nvidia-cuda','nvidia-smi + CUDA libs'],
      ['modinfo -F version nvidia','Wait until this prints a version (~5 min)'],
      ['sudo reboot',''],
      ['nvidia-smi','Verify'],
      ['lsmod | grep -E "nouveau|nvidia"','Which driver is loaded']],
    flags:[
      ['akmod-nvidia','Current GPUs'],
      ['akmod-nvidia-470xx','Older Kepler cards'],
      ['nvidia-smi -l 1','Refresh every second'],
      ['nvidia-smi --query-gpu=temperature.gpu,utilization.gpu --format=csv','Scriptable']],
    example:{cmd:'nvidia-smi --query-gpu=name,driver_version,temperature.gpu,utilization.gpu --format=csv', out:
`name, driver_version, temperature.gpu, utilization.gpu [%]
NVIDIA GeForce RTX 4070, 580.82.09, 41, 3 %`},
    warn:'With Secure Boot on, the module must be signed — see the next card before rebooting.' },

  { title:'Secure Boot & MOK', icon:'🗝️', badge:'SB', color:'red',
    cmds:[
      ['mokutil --sb-state','Is Secure Boot enabled?'],
      ['sudo dnf install kmodtool akmods mokutil openssl',''],
      ['sudo kmodgenca -a','Create a local signing key'],
      ['sudo mokutil --import /etc/pki/akmods/certs/public_key.der','Queue key (set a one-time password)'],
      ['sudo reboot','Blue MOK screen → Enroll MOK → enter password'],
      ['mokutil --list-enrolled | grep -i akmods','Confirm']],
    flags:[
      ['--sb-state','Secure Boot status'],
      ['--import <der>','Enroll on next boot'],
      ['--list-enrolled','Enrolled keys'],
      ['--delete <der>','Remove a key']],
    example:{cmd:'mokutil --sb-state', out:`SecureBoot enabled`},
    tip:'Enroll the key <b>before</b> installing akmod-nvidia, so the first module build is already signed.' }
  ]});

/* ── NEW: Multimedia ── */
insertAfter('hardware', { id:'media', icon:'🎬', title:'Multimedia', sub:'Codecs, ffmpeg, audio', desc:'codecs, ffmpeg, images, pdfs and pipewire audio',
  cards:[
  { title:'Codecs & Hardware Decoding', icon:'🎞️', badge:'CODECS', color:'warn',
    cmds:[
      ['# Needs RPM Fusion free + nonfree',''],
      ['sudo dnf swap ffmpeg-free ffmpeg --allowerasing','Full ffmpeg'],
      ['sudo dnf group upgrade multimedia --setopt=install_weak_deps=False --exclude=PackageKit-gstreamer-plugin','GStreamer codecs'],
      ['sudo dnf swap mesa-va-drivers mesa-va-drivers-freeworld','AMD video decode'],
      ['sudo dnf swap mesa-vdpau-drivers mesa-vdpau-drivers-freeworld','AMD VDPAU'],
      ['sudo dnf install intel-media-driver','Intel (Broadwell+) decode'],
      ['vainfo','Check VA-API support (libva-utils)']],
    flags:[
      ['--allowerasing','Needed to replace -free packages'],
      ['vainfo --display drm','Test without a GUI session'],
      ['VAEntrypointVLD','= hardware decode supported']],
    example:{cmd:'vainfo | grep -E "Driver|HEVCMain |AV1"', out:
`vainfo: Driver version: Mesa Gallium driver 26.1.3 for AMD Radeon 780M
      VAProfileHEVCMain               : VAEntrypointVLD
      VAProfileAV1Profile0            : VAEntrypointVLD`} },

  { title:'ffmpeg Recipes', icon:'🎥', badge:'FFMPEG', color:'green',
    cmds:[
      ['ffprobe -hide_banner video.mp4','Inspect streams'],
      ['ffmpeg -i in.mov -c:v libx264 -crf 23 -c:a aac out.mp4','Convert to MP4'],
      ['ffmpeg -i in.mp4 -vn -c:a libmp3lame -q:a 2 audio.mp3','Extract audio'],
      ['ffmpeg -ss 00:01:00 -to 00:02:30 -i in.mp4 -c copy clip.mp4','Cut without re-encoding'],
      ['ffmpeg -i in.mp4 -vf scale=-2:720 out720.mp4','Resize to 720p'],
      ['ffmpeg -i in.mp4 -vf "fps=12,scale=480:-1" out.gif','Make a GIF'],
      ['ffmpeg -f concat -safe 0 -i list.txt -c copy joined.mp4','Join files'],
      ['ffmpeg -i in.mp4 -c:v libsvtav1 -crf 35 -c:a libopus out.webm','Small AV1 file'],
      ['ffmpeg -i in.mp4 -ss 5 -frames:v 1 thumb.jpg','Grab a frame']],
    flags:[
      ['-i <file>','Input'],
      ['-c copy','Copy streams (no re-encode, instant)'],
      ['-c:v / -c:a','Video / audio codec'],
      ['-crf N','Quality (lower = better; x264 ~18–28)'],
      ['-preset slow|fast','Speed vs size'],
      ['-vf','Video filters (scale, fps, crop…)'],
      ['-ss / -to','Start / end time'],
      ['-vn / -an','Drop video / audio'],
      ['-y','Overwrite output']],
    example:{cmd:'ffprobe -hide_banner -v error -show_entries stream=codec_name,width,height -of compact video.mp4', out:
`stream|codec_name=h264|width=1920|height=1080
stream|codec_name=aac|width=N/A|height=N/A`},
    tip:'List files for concat look like: <code>file \'part1.mp4\'</code>, one per line.' },

  { title:'Images & PDFs', icon:'🖼️', badge:'CONVERT', color:'blue',
    cmds:[
      ['sudo dnf install ImageMagick poppler-utils qpdf',''],
      ['magick in.png -resize 50% out.jpg','Resize + convert'],
      ['magick in.jpg -quality 80 out.webp','To WebP'],
      ['mogrify -format webp -quality 80 *.png','Batch convert'],
      ['magick identify photo.jpg','Dimensions + format'],
      ['exiftool -all= photo.jpg','Strip metadata (perl-Image-ExifTool)'],
      ['pdfunite a.pdf b.pdf merged.pdf','Merge PDFs'],
      ['qpdf in.pdf --pages . 1-3 -- first3.pdf','Extract pages'],
      ['pdftotext -layout doc.pdf doc.txt','PDF → text'],
      ['magick -density 150 doc.pdf[0] page1.png','PDF page → image']],
    flags:[
      ['-resize 50% | 800x | x600','Scale'],
      ['-quality N','JPEG/WebP quality'],
      ['-strip','Drop metadata'],
      ['mogrify','Edit in place (batch)'],
      ['pdftotext -layout','Keep columns'],
      ['qpdf --rotate=+90:1','Rotate page 1']],
    example:{cmd:'magick identify photo.jpg', out:`photo.jpg JPEG 4032x3024 4032x3024+0+0 8-bit sRGB 3.41MiB 0.000u 0:00.001`} },

  { title:'Audio (PipeWire)', icon:'🎧', badge:'AUDIO', color:'green',
    cmds:[
      ['wpctl status','Devices, sinks, sources'],
      ['wpctl set-volume @DEFAULT_AUDIO_SINK@ 50%','Set volume'],
      ['wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+','Raise 5%'],
      ['wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle',''],
      ['wpctl set-default 52','Switch output device by ID'],
      ['pactl list short sinks','PulseAudio-compatible view'],
      ['pw-top','Live per-stream load'],
      ['systemctl --user restart pipewire pipewire-pulse wireplumber','Fix stuck audio'],
      ['pw-record test.wav && pw-play test.wav','Mic test']],
    flags:[
      ['@DEFAULT_AUDIO_SINK@ / SOURCE@','Default output / input'],
      ['set-volume N% | N%+ | N%-','Absolute / relative'],
      ['set-mute 1|0|toggle',''],
      ['inspect <id>','Device details'],
      ['--limit 1.0','Cap volume at 100%']],
    example:{cmd:'wpctl status | sed -n "/Sinks:/,/Sources:/p"', out:
` ├─ Sinks:
 │  *   52. Family 17h/19h HD Audio Controller Speaker [vol: 0.50]
 │      67. WH-1000XM5                                  [vol: 0.35]
 │
 ├─ Sources:`} }
  ]});

/* ── NEW: Backup ── */
insertAfter('media', { id:'backup', icon:'💼', title:'Backup', sub:'restic, snapper, rsync', desc:'versioned backups, btrfs snapshots and rsync mirrors',
  cards:[
  { title:'restic (encrypted backups)', icon:'🔒', badge:'RESTIC', color:'green',
    cmds:[
      ['sudo dnf install restic',''],
      ['restic -r /run/media/$USER/USB/restic init','Create repo (sets password)'],
      ['export RESTIC_REPOSITORY=/run/media/$USER/USB/restic','Save typing'],
      ['restic backup ~ --exclude-caches --exclude ~/Downloads','Back up home'],
      ['restic snapshots','List backups'],
      ['restic ls latest | grep report','Find a file'],
      ['restic restore latest --target /tmp/restore --include ~/Documents',''],
      ['restic forget --keep-daily 7 --keep-weekly 4 --keep-monthly 6 --prune','Retention'],
      ['restic check','Verify repo integrity'],
      ['restic mount /mnt/restic','Browse snapshots as folders']],
    flags:[
      ['-r / RESTIC_REPOSITORY','Repo: local path, sftp:, s3:, rest:'],
      ['RESTIC_PASSWORD_FILE','Password from file (for scripts)'],
      ['--exclude / --exclude-file','Skip paths'],
      ['--exclude-caches','Skip dirs with CACHEDIR.TAG'],
      ['--keep-daily/weekly/monthly N','Retention policy'],
      ['--prune','Actually free space'],
      ['--dry-run','Preview']],
    example:{cmd:'restic snapshots', out:
`ID        Time                 Host        Tags        Paths
---------------------------------------------------------------------
3f9c2a7d  2026-09-27 21:00:04  fedora-ws               /home/sooraj
b44e0126  2026-09-28 21:00:03  fedora-ws               /home/sooraj
e17a90cc  2026-09-29 21:00:05  fedora-ws               /home/sooraj
---------------------------------------------------------------------
3 snapshots`},
    warn:'Lose the restic password and the backup is unreadable — store it in a password manager.' },

  { title:'Btrfs Snapshots with Snapper', icon:'📸', badge:'SNAPPER', color:'blue',
    cmds:[
      ['sudo dnf install snapper',''],
      ['sudo snapper -c home create-config /home','Enable for /home'],
      ['sudo snapper -c home create -d "before cleanup"','Manual snapshot'],
      ['sudo snapper -c home list',''],
      ['sudo snapper -c home status 1..2','What changed'],
      ['sudo snapper -c home diff 1..2 /home/sooraj/.bashrc','File diff'],
      ['sudo snapper -c home undochange 1..2 /home/sooraj/.bashrc','Restore one file'],
      ['sudo systemctl enable --now snapper-timeline.timer snapper-cleanup.timer','Automatic hourly + cleanup']],
    flags:[
      ['-c <config>','Which config (root, home…)'],
      ['create -d "<desc>"','Description'],
      ['list-configs','All configs'],
      ['delete <N>','Remove snapshot'],
      ['TIMELINE_LIMIT_HOURLY=','Config: how many to keep']],
    example:{cmd:'sudo snapper -c home list', out:
` # | Type   | Pre # | Date                     | User | Cleanup  | Description    | Userdata
---+--------+-------+--------------------------+------+----------+----------------+---------
0  | single |       |                          | root |          | current        |
1  | single |       | Tue Sep 29 22:00:01 2026 | root | timeline | timeline       |
2  | single |       | Wed Sep 30 00:44:37 2026 | root |          | before cleanup |`},
    tip:'Snapshots live on the same disk — they protect against mistakes, not disk failure. Pair with restic.' },

  { title:'rsync Mirrors & Rotating Backups', icon:'🔄', badge:'RSYNC', color:'blue',
    cmds:[
      ['rsync -aHAX --delete --info=progress2 ~/ /run/media/$USER/USB/home/','Mirror home'],
      ['rsync -aHAX --delete --exclude-from=~/.rsync-exclude ~/ backup:/srv/home/',''],
      ['rsync -a --link-dest=../latest ~/ /backup/$(date +%F)/','Space-saving daily snapshots'],
      ['ln -sfn /backup/$(date +%F) /backup/latest','Point "latest" at it'],
      ['tar --listed-incremental=home.snar -czf home-$(date +%F).tgz ~','Incremental tar']],
    flags:[
      ['-a','Archive mode'],
      ['-H -A -X','Hard links, ACLs, xattrs (SELinux labels)'],
      ['--delete','Mirror deletions'],
      ['--link-dest=<dir>','Hard-link unchanged files'],
      ['--info=progress2','Overall progress'],
      ['--exclude-from=<file>','Patterns file'],
      ['-n','Dry run first!']],
    example:{cmd:'rsync -aHAX --delete --info=progress2 ~/Documents/ /run/media/sooraj/USB/Documents/', out:
`      1,284,511,002  100%   86.21MB/s    0:00:14 (xfr#3912, to-chk=0/4210)`},
    danger:'<code>--delete</code> with the source and destination swapped wipes your originals. Run with <code>-n</code> first.' }
  ]});

/* ── NEW: Atomic desktops (renamed "Distro UI" in v2.36) ── */
insertAfter('backup', { id:'atomic', icon:'⚛️', title:'Atomic', sub:'Silverblue, bootc', desc:'fedora silverblue, kinoite & other atomic desktops — rpm-ostree and bootc',
  cards:[
  { title:'rpm-ostree Basics', icon:'🧊', badge:'OSTREE', color:'blue',
    cmds:[
      ['rpm-ostree status','Deployments (current + rollback)'],
      ['rpm-ostree upgrade','Stage OS update'],
      ['systemctl reboot','Boot into it'],
      ['rpm-ostree rollback','Go back to previous deployment'],
      ['rpm-ostree install htop','Layer a package'],
      ['rpm-ostree install --apply-live htop','…and use it now'],
      ['rpm-ostree uninstall htop','Remove layer'],
      ['rpm-ostree override remove firefox firefox-langpacks','Remove a base package'],
      ['rpm-ostree reset','Drop all layers & overrides'],
      ['sudo ostree admin pin 0','Keep current deployment forever']],
    flags:[
      ['--apply-live','Apply without reboot (additions only)'],
      ['-r, --reboot','Reboot after staging'],
      ['--preview / --check','See what an upgrade would do'],
      ['kargs --append=<arg>','Add kernel argument'],
      ['override replace <rpm>','Swap base package version']],
    example:{cmd:'rpm-ostree status', out:
`State: idle
Deployments:
● fedora:fedora/44/x86_64/silverblue
                  Version: 44.20260929.0 (2026-09-29T00:42:11Z)
               BaseCommit: 7c2e0d…
          LayeredPackages: htop

  fedora:fedora/44/x86_64/silverblue
                  Version: 44.20260926.0 (2026-09-26T00:39:57Z)
               BaseCommit: 41a9bb…`},
    tip:'On atomic desktops install apps with Flatpak and CLI tools in Toolbox — layer only what truly needs the host.' },

  { title:'Rebase & bootc', icon:'🔁', badge:'REBASE', color:'warn',
    cmds:[
      ['ostree remote refs fedora | grep 44','Available variants'],
      ['rpm-ostree rebase fedora:fedora/44/x86_64/kinoite','Switch Silverblue → Kinoite'],
      ['sudo bootc status','Image-based status'],
      ['sudo bootc upgrade','Pull + stage the image'],
      ['sudo bootc switch quay.io/fedora/fedora-silverblue:44','Switch to another image'],
      ['sudo bootc rollback','']],
    flags:[
      ['rebase <remote>:<ref>','Change branch/variant'],
      ['bootc upgrade --check','Only check'],
      ['bootc switch <image>','Any OCI image, incl. your own'],
      ['bootc status --format=json','Scriptable']],
    example:{cmd:'sudo bootc status --format=humanreadable', out:
`● Booted image: quay.io/fedora/fedora-silverblue:44
        Digest: sha256:9e2f…c41a
       Version: 44.20260929.0 (2026-09-29T00:42:11Z)

  Rollback image: quay.io/fedora/fedora-silverblue:44
        Version: 44.20260926.0 (2026-09-26T00:39:57Z)`},
    warn:'Rebasing between desktops can leave conflicting settings in your home folder — back up first.' }
  ]});
})();

/* ═════════════════ MORE CONTENT (v2.4) ═════════════════ */
(function () {
const D = window.FB_DATA;
const insertAfter = (id, s) => D.splice(D.findIndex(x => x.id === id) + 1, 0, s);

/* ── NEW: Troubleshooting (placed early — most useful when things break) ── */
insertAfter('basics', { id:'fix', icon:'🩺', title:'Troubleshoot', sub:'Fix common problems', desc:'step-by-step checks for the problems people hit most',
  cards:[
  { title:'Won\'t Boot / Boots to Emergency', icon:'🚑', badge:'BOOT', color:'red',
    cmds:[
      ['# 1. At the GRUB menu, pick the previous kernel',''],
      ['# 2. Once booted, look at what failed last time:',''],
      ['journalctl -b -1 -p err --no-pager','Errors from the failed boot'],
      ['systemctl --failed','Units that failed now'],
      ['sudo findmnt --verify','Broken fstab is the #1 cause of emergency mode'],
      ['# 3. If a new kernel broke things, keep booting the old one:',''],
      ['sudo grubby --set-default=/boot/vmlinuz-$(uname -r)',''],
      ['# 4. Nothing boots? From GRUB add: systemd.unit=rescue.target','']],
    flags:[
      ['journalctl -b -1','Previous boot'],
      ['journalctl --list-boots','Pick an older boot by index'],
      ['-p err','Errors and worse'],
      ['systemd.unit=emergency.target','Minimal shell, / read-only']],
    example:{cmd:'systemctl --failed', out:
`  UNIT              LOAD   ACTIVE SUB    DESCRIPTION
● mnt-data.mount    loaded failed failed /mnt/data

LOAD   = Reflects whether the unit definition was properly loaded.
ACTIVE = The high-level unit activation state.
1 loaded units listed.`},
    tip:'A missing disk in fstab without <code>nofail</code> is a classic — comment the line out and reboot.' },

  { title:'Disk Full', icon:'🈵', badge:'SPACE', color:'warn',
    cmds:[
      ['df -h','Which filesystem is full?'],
      ['sudo du -xh --max-depth=1 / 2>/dev/null | sort -h | tail','Where the space went'],
      ['sudo find / -xdev -type f -size +1G -exec ls -lh {} + 2>/dev/null','Files over 1 GB'],
      ['sudo journalctl --vacuum-size=200M','Journal'],
      ['sudo dnf clean all','Package cache'],
      ['podman system prune -a && flatpak uninstall --unused','Containers + runtimes'],
      ['sudo btrfs filesystem usage /','Btrfs: real numbers'],
      ['sudo btrfs balance start -dusage=10 /','Btrfs "full" but df shows space'],
      ['sudo lsof +L1','Deleted files still held open']],
    flags:[
      ['du -x','Don\'t cross into other filesystems'],
      ['find -xdev','Same, for find'],
      ['lsof +L1','Unlinked but open (restart that process)'],
      ['balance -dusage=N','Reclaim nearly-empty chunks']],
    example:{cmd:'sudo lsof +L1', out:
`COMMAND   PID USER   FD   TYPE DEVICE   SIZE/OFF NLINK  NODE NAME
java     4410 app    12w   REG  0,39 8589934592     0 88213 /var/log/app/debug.log (deleted)`},
    tip:'A deleted log still held open keeps using space — restart the process to release it.' },

  { title:'No Network / No Internet', flagsLabel:'Diagnosis', flagsHead:['If you see','It means'], icon:'📴', badge:'NET', color:'warn',
    cmds:[
      ['nmcli device status','Is the device connected?'],
      ['rfkill list','Wi-Fi hard/soft blocked?'],
      ['ip -br addr','Do we have an IP?'],
      ['ip route','Is there a default gateway?'],
      ['ping -c 3 $(ip route | awk \'/default/{print $3; exit}\')','Reach the router'],
      ['ping -c 3 1.1.1.1','Reach the internet by IP'],
      ['ping -c 3 fedoraproject.org','…by name (tests DNS)'],
      ['resolvectl status','DNS servers in use'],
      ['sudo systemctl restart NetworkManager','Kick the network stack'],
      ['journalctl -u NetworkManager -b --no-pager | tail -30','What NM thinks']],
    flags:[
      ['IP works, name fails','→ DNS problem (resolvectl)'],
      ['Router works, 1.1.1.1 fails','→ upstream / ISP / VPN'],
      ['No default route','→ DHCP failed or wrong static config'],
      ['rfkill "Hard blocked: yes"','→ physical switch / BIOS']],
    example:{cmd:'ping -c 2 1.1.1.1 && ping -c 2 fedoraproject.org', out:
`PING 1.1.1.1 (1.1.1.1) 56(84) bytes of data.
64 bytes from 1.1.1.1: icmp_seq=1 ttl=57 time=4.21 ms
64 bytes from 1.1.1.1: icmp_seq=2 ttl=57 time=4.08 ms
ping: fedoraproject.org: Temporary failure in name resolution`} },

  { title:'System Is Slow', flagsLabel:'Diagnosis', flagsHead:['If you see','It means'], icon:'🐢', badge:'PERF', color:'blue',
    cmds:[
      ['uptime','Load vs. CPU count (nproc)'],
      ['top -o %CPU','CPU hog?'],
      ['free -h','Out of RAM / swapping?'],
      ['vmstat 1 5','wa = disk wait, si/so = swapping'],
      ['iostat -xz 1 3','Disk saturated (%util)?'],
      ['systemd-cgtop','Which service/app group'],
      ['journalctl -u systemd-oomd -b','Did oomd kill something?'],
      ['journalctl -p err -b --no-pager | tail','Errors this boot'],
      ['sudo dnf install btop && btop','One-screen overview']],
    flags:[
      ['load > nproc','CPU-bound'],
      ['high wa in vmstat','Disk-bound'],
      ['si/so non-zero','Memory pressure'],
      ['%util ~100 in iostat','Device saturated']],
    example:{cmd:'uptime && nproc', out:
` 00:52:40 up 15:24,  2 users,  load average: 14.02, 11.87, 6.44
16`} },

  { title:'Broken Packages / DNF Errors', icon:'🧯', badge:'DNF', color:'red',
    cmds:[
      ['sudo dnf clean all && sudo dnf makecache --refresh','Stale metadata'],
      ['sudo dnf upgrade --refresh --best --allowerasing','Resolve conflicts'],
      ['sudo dnf distro-sync --refresh','Sync all packages to repo versions'],
      ['dnf history list | head','What changed recently'],
      ['sudo dnf history undo last','Undo the last transaction'],
      ['sudo rpm --rebuilddb','Corrupt RPM database'],
      ['sudo rm -f /var/lib/rpm/.rpm.lock','Stale lock (only if no dnf is running!)'],
      ['rpm -Va --nomtime 2>/dev/null | grep -v "^..5......  c"','Modified package files']],
    flags:[
      ['--allowerasing','Allow removing conflicting packages'],
      ['--skip-broken','Upgrade what can be upgraded'],
      ['distro-sync','Up- or downgrade to match repos'],
      ['history undo last','Revert last transaction']],
    example:{cmd:'sudo dnf upgrade --refresh', out:
`Updating and loading repositories:
 Fedora 44 - x86_64 - Updates     100% |  42.1 KiB/s |  18.3 KiB |  00m00s
Repositories loaded.
Problem: cannot install the best update candidate for package foo-lib-2.1-1.fc44.x86_64
  - package bar-3.0-2.fc44.x86_64 requires foo-lib(x86-64) = 2.1, but none of the providers can be installed
You can try to add to command line:
  --allowerasing to allow erasing of installed packages to resolve problems
  --skip-broken to skip uninstallable packages`} }
  ]});

/* ── NEW: Editors & tmux ── */
insertAfter('git', { id:'editors', icon:'✏️', title:'Editors', sub:'vim, nano, tmux', desc:'vim, nano and tmux cheat-sheets',
  cards:[
  { title:'Vim Essentials', icon:'🟩', badge:'VIM', color:'green',
    table:{head:['Keys','Action'], rows:[
      ['i / a / o','Insert before / after cursor / new line'],
      ['Esc','Back to normal mode'],
      [':w  :q  :wq  :q!','Save, quit, save+quit, quit without saving'],
      ['h j k l','Left, down, up, right'],
      ['w / b / e','Next word / back / end of word'],
      ['0 / $ / gg / G','Line start / end / file top / bottom'],
      [':42','Go to line 42'],
      ['dd / yy / p','Cut line / copy line / paste'],
      ['x / u / Ctrl+r','Delete char / undo / redo'],
      ['v / V / Ctrl+v','Select chars / lines / block'],
      ['/text  n  N','Search, next, previous'],
      [':%s/old/new/g','Replace all in file'],
      [':%s/old/new/gc','…confirm each'],
      ['.','Repeat last change']]},
    cmds:[
      ['sudo dnf install vim-enhanced',''],
      ['vimtutor','30-minute interactive lesson'],
      ['sudoedit /etc/hosts','Edit root files as you (uses $EDITOR)'],
      ['sudo dnf install vim-default-editor --allowerasing','Make vim the default instead of nano']],
    example:{cmd:'vim --version | head -1', out:`VIM - Vi IMproved 9.1 (2024 Jan 02, compiled Sep 12 2026 00:00:00)`} },

  { title:'Vim Power Moves', icon:'⚡', badge:'VIM+', color:'blue',
    table:{head:['Keys','Action'], rows:[
      ['ciw / ci"','Change word / inside quotes'],
      ['dap','Delete a paragraph'],
      ['>> / <<','Indent / outdent line'],
      ['gg=G','Re-indent whole file'],
      ['qa … q  then @a','Record / replay macro a'],
      ['10@a','Replay macro 10 times'],
      [':sp  :vsp','Split horizontal / vertical'],
      ['Ctrl+w w','Next split'],
      [':e file  :bn  :bp','Open / next / previous buffer'],
      [':set nu  :set paste','Line numbers / paste mode'],
      ['Ctrl+v, j j, I#, Esc','Comment several lines'],
      [':w !sudo tee %','Save a root file you opened without sudo'],
      [':!ls','Run a shell command']]},
    code:
`" ~/.vimrc
set number relativenumber
set expandtab shiftwidth=4 tabstop=4
set ignorecase smartcase incsearch hlsearch
set clipboard=unnamedplus
syntax on`,
    example:{cmd:'grep -c "" ~/.vimrc', out:`6`} },

  { title:'nano', icon:'📝', badge:'NANO', color:'blue',
    table:{head:['Keys','Action'], rows:[
      ['Ctrl+O','Save (Write Out)'],
      ['Ctrl+X','Exit'],
      ['Ctrl+W','Search'],
      ['Alt+W','Search next'],
      ['Ctrl+\\','Search & replace'],
      ['Ctrl+K / Ctrl+U','Cut line / paste'],
      ['Alt+6','Copy line'],
      ['Ctrl+_','Go to line'],
      ['Alt+U / Alt+E','Undo / redo'],
      ['Alt+#','Toggle line numbers']]},
    cmds:[
      ['nano -l file.txt','Open with line numbers'],
      ['nano +42 file.txt','Open at line 42'],
      ['echo "set linenumbers" >> ~/.nanorc','Always show numbers']],
    example:{cmd:'echo $EDITOR', out:`/usr/bin/nano`},
    tip:'nano is Fedora\'s default <code>$EDITOR</code>, so <code>sudoedit</code>, <code>crontab -e</code> and <code>git commit</code> open in it.' },

  { title:'tmux', icon:'🪟', badge:'TMUX', color:'green',
    table:{head:['Keys (prefix = Ctrl+b)','Action'], rows:[
      ['prefix d','Detach (session keeps running)'],
      ['prefix c','New window'],
      ['prefix n / p / 0-9','Next / previous / go to window'],
      ['prefix ,','Rename window'],
      ['prefix %','Split left/right'],
      ['prefix "','Split top/bottom'],
      ['prefix arrow','Move between panes'],
      ['prefix z','Zoom pane'],
      ['prefix x','Close pane'],
      ['prefix [','Scroll / copy mode (q exits)'],
      ['prefix s','Session picker']]},
    cmds:[
      ['tmux new -s work','Named session'],
      ['tmux ls','List sessions'],
      ['tmux attach -t work','Re-attach'],
      ['tmux kill-session -t work',''],
      ["echo 'set -g mouse on' >> ~/.tmux.conf",'Mouse scrolling + resize']],
    example:{cmd:'tmux ls', out:
`deploy: 2 windows (created Tue Sep 29 22:10:41 2026)
work: 3 windows (created Wed Sep 30 00:05:12 2026) (attached)`},
    tip:'Run long jobs over SSH inside tmux — a dropped connection won\'t kill them.' }
  ]});

/* ── NEW: Dev Tools ── */
insertAfter('editors', { id:'dev', icon:'🧑‍💻', title:'Dev Tools', sub:'Build, debug, package', desc:'compilers, build systems, debuggers, language toolchains and rpm packaging',
  cards:[
  { title:'Build: gcc, make, CMake, Meson', icon:'🔨', badge:'BUILD', color:'blue',
    cmds:[
      ['sudo dnf group install development-tools c-development',''],
      ['gcc -Wall -Wextra -O2 -g -o app main.c','Compile C'],
      ['g++ -std=c++23 -O2 -o app main.cpp','Compile C++'],
      ['make -j$(nproc)','Build with all cores'],
      ['cmake -B build -G Ninja -DCMAKE_BUILD_TYPE=Release',''],
      ['cmake --build build',''],
      ['meson setup build && meson compile -C build',''],
      ['ldd ./app','Shared libraries used'],
      ['sudo dnf builddep ./app.spec','Install a project\'s build deps']],
    flags:[
      ['-Wall -Wextra','Useful warnings'],
      ['-O0 / -O2 / -O3','Optimisation level'],
      ['-g','Debug symbols'],
      ['-fsanitize=address,undefined','Catch memory bugs at runtime'],
      ['-I / -L / -l','Include dir / lib dir / link library'],
      ['make -jN / -C dir','Parallel / other directory'],
      ['cmake -D<VAR>=<val>','Configure option']],
    example:{cmd:'gcc -Wall -O2 -o hello hello.c && ./hello', out:`Hello from Fedora 44!`} },

  { title:'Debug: gdb, valgrind, strace', icon:'🐞', badge:'DEBUG', color:'red',
    cmds:[
      ['gdb ./app','Start debugger'],
      ['gdb -p 1234','Attach to running process'],
      ['valgrind --leak-check=full ./app','Memory leaks'],
      ['strace -f -e trace=openat,connect ./app','Which files / sockets'],
      ['strace -c ./app','Syscall time summary'],
      ['ltrace ./app','Library calls'],
      ['sudo perf record -g ./app && sudo perf report','CPU profile'],
      ['sudo dnf debuginfo-install bash','Symbols for system packages']],
    table:{head:['gdb command','Action'], rows:[
      ['run [args]','Start'],['break main / b file.c:42','Breakpoint'],
      ['next / step / finish','Over / into / out of'],['continue','Resume'],
      ['bt','Backtrace'],['print x / p *ptr','Inspect'],['watch x','Break when x changes'],['quit','Exit']]},
    flags:[
      ['strace -f','Follow child processes'],
      ['strace -e trace=<set>','file, network, process…'],
      ['strace -o out.txt','Write to file'],
      ['valgrind --track-origins=yes','Where uninitialised values came from']],
    example:{cmd:'strace -e trace=openat cat /etc/hostname 2>&1 | tail -3', out:
`openat(AT_FDCWD, "/etc/hostname", O_RDONLY) = 3
fedora-ws
+++ exited with 0 +++`},
    tip:'Fedora fetches debug symbols on demand via <b>debuginfod</b> — gdb will offer to download them.' },

  { title:'Node, Go & Rust', icon:'📚', badge:'LANGS', color:'green',
    cmds:[
      ['sudo dnf install nodejs npm',''],
      ['npm init -y && npm install express',''],
      ['npx create-vite@latest my-app','Scaffold without global installs'],
      ['sudo dnf install golang',''],
      ['go mod init example.com/app && go run .',''],
      ['go build -o app . && go test ./...',''],
      ['sudo dnf install rustup && rustup-init','Latest stable Rust (or: dnf install rust cargo)'],
      ['cargo new hello && cd hello && cargo run',''],
      ['cargo build --release',''],
      ['cargo clippy && cargo fmt','Lint + format']],
    flags:[
      ['npm ci','Clean install from lockfile'],
      ['npm run <script>','package.json scripts'],
      ['go build -ldflags="-s -w"','Smaller binary'],
      ['GOOS=windows go build','Cross-compile'],
      ['cargo build --release','Optimised build'],
      ['rustup update','Update toolchain']],
    example:{cmd:'cargo new hello && cd hello && cargo run', out:
`    Creating binary (application) \`hello\` package
   Compiling hello v0.1.0 (/home/sooraj/hello)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.61s
     Running \`target/debug/hello\`
Hello, world!`} },

  { title:'Build Your Own RPM', icon:'📦', badge:'RPMBUILD', color:'warn',
    cmds:[
      ['sudo dnf install rpmdevtools rpm-build rpmlint mock',''],
      ['rpmdev-setuptree','Creates ~/rpmbuild/{SPECS,SOURCES,…}'],
      ['rpmdev-newspec -o ~/rpmbuild/SPECS/hello.spec hello','Spec template'],
      ['spectool -g -R ~/rpmbuild/SPECS/hello.spec','Download Source0'],
      ['rpmbuild -ba ~/rpmbuild/SPECS/hello.spec','Build binary + source RPM'],
      ['rpmlint ~/rpmbuild/SPECS/hello.spec ~/rpmbuild/RPMS/*/*.rpm','Check for problems'],
      ['sudo usermod -aG mock $USER','Allow clean-chroot builds'],
      ['mock -r fedora-44-x86_64 ~/rpmbuild/SRPMS/hello-*.src.rpm','Reproducible build']],
    flags:[
      ['rpmbuild -ba / -bb / -bs','All / binary / source only'],
      ['--define "dist .fc44"','Override a macro'],
      ['mock -r <config>','Target release/arch'],
      ['rpm -qpl <file.rpm>','List files in the result'],
      ['rpm --eval %{_libdir}','Expand a macro']],
    example:{cmd:'rpm --eval "%{dist} %{_bindir} %{_libdir}"', out:`.fc44 /usr/bin /usr/lib64`} }
  ]});

/* ── NEW: Servers (Cockpit, NFS, Samba) ── */
insertAfter('web', { id:'servers', icon:'🏢', title:'Servers', sub:'Cockpit, NFS, Samba', desc:'web admin console and file-sharing servers',
  cards:[
  { title:'Cockpit Web Console', icon:'🕹️', badge:'COCKPIT', color:'green',
    cmds:[
      ['sudo dnf install cockpit cockpit-podman cockpit-machines cockpit-storaged',''],
      ['sudo systemctl enable --now cockpit.socket',''],
      ['sudo firewall-cmd --add-service=cockpit --permanent && sudo firewall-cmd --reload',''],
      ['# Browse to https://<server-ip>:9090 and log in with a system account',''],
      ['systemctl status cockpit.socket','']],
    flags:[
      ['cockpit-podman','Containers page'],
      ['cockpit-machines','VMs page'],
      ['cockpit-storaged','Disks, RAID, LVM'],
      ['cockpit-files','File browser'],
      ['/etc/cockpit/cockpit.conf','Settings (e.g. LoginTitle)']],
    example:{cmd:'ss -tlnp | grep 9090', out:`LISTEN 0      4096               *:9090            *:*    users:(("systemd",pid=1,fd=58))`},
    tip:'Fedora Server has Cockpit enabled out of the box.' },

  { title:'NFS Server', icon:'📂', badge:'NFS', color:'blue',
    cmds:[
      ['sudo dnf install nfs-utils',''],
      ['sudo mkdir -p /srv/share && sudo chown nobody:nobody /srv/share',''],
      ['echo "/srv/share 192.168.1.0/24(rw,sync,no_subtree_check)" | sudo tee -a /etc/exports',''],
      ['sudo systemctl enable --now nfs-server',''],
      ['sudo exportfs -rav','Reload exports'],
      ['sudo firewall-cmd --add-service=nfs --permanent && sudo firewall-cmd --reload','NFSv4 only needs this'],
      ['sudo exportfs -v','Show active exports']],
    flags:[
      ['rw / ro','Read-write / read-only'],
      ['sync','Safer writes'],
      ['root_squash (default)','Remote root → nobody'],
      ['no_root_squash','Trust remote root (avoid)'],
      ['all_squash,anonuid=1000','Map everyone to one user'],
      ['exportfs -r / -a / -v','Re-export / all / verbose']],
    example:{cmd:'sudo exportfs -v', out:
`/srv/share    	192.168.1.0/24(sync,wdelay,hide,no_subtree_check,sec=sys,rw,secure,root_squash,no_all_squash)`} },

  { title:'Samba Server', icon:'🪟', badge:'SMB', color:'blue',
    code:
`# /etc/samba/smb.conf — add at the end
[share]
    path = /srv/samba/share
    browseable = yes
    read only = no
    valid users = alice`,
    cmds:[
      ['sudo dnf install samba',''],
      ['sudo mkdir -p /srv/samba/share && sudo chown alice: /srv/samba/share',''],
      ['sudo semanage fcontext -a -t samba_share_t "/srv/samba(/.*)?" && sudo restorecon -Rv /srv/samba','SELinux label'],
      ['sudo smbpasswd -a alice','Samba password for a Linux user'],
      ['testparm','Validate smb.conf'],
      ['sudo systemctl enable --now smb',''],
      ['sudo firewall-cmd --add-service=samba --permanent && sudo firewall-cmd --reload',''],
      ['smbclient //localhost/share -U alice -c ls','Test it']],
    flags:[
      ['valid users =','Who may connect'],
      ['read only = no','Allow writes'],
      ['guest ok = yes','No login (use carefully)'],
      ['create mask = 0664','New file permissions'],
      ['smbpasswd -a / -x / -d','Add / delete / disable user'],
      ['pdbedit -L','List Samba users']],
    example:{cmd:'testparm -s 2>/dev/null | sed -n "/\\[share\\]/,$p"', out:
`[share]
	path = /srv/samba/share
	read only = No
	valid users = alice`},
    warn:'Without the <code>samba_share_t</code> label SELinux blocks access and clients see "permission denied".' }
  ]});

/* ── NEW: Ansible ── */
insertAfter('servers', { id:'ansible', icon:'🤖', title:'Ansible', sub:'Automation', desc:'automate many machines with ansible',
  cards:[
  { title:'Inventory & Ad-hoc Commands', icon:'📋', badge:'ADHOC', color:'blue',
    code:
`# inventory.ini
[web]
web1.example.com
web2.example.com ansible_user=admin

[db]
192.168.1.30

[all:vars]
ansible_python_interpreter=/usr/bin/python3`,
    cmds:[
      ['sudo dnf install ansible',''],
      ['ansible all -i inventory.ini -m ping','Can we reach everyone?'],
      ['ansible web -i inventory.ini -a "uptime"','Run a command'],
      ['ansible web -i inventory.ini -b -m ansible.builtin.dnf -a "name=nginx state=latest"','Install a package'],
      ['ansible all -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_distribution*"','Gather facts'],
      ['ansible-inventory -i inventory.ini --graph','Show groups']],
    flags:[
      ['-i <file>','Inventory'],
      ['-m <module>','Module to run'],
      ['-a "<args>"','Module arguments'],
      ['-b','Become root (sudo)'],
      ['-K','Ask for sudo password'],
      ['-l <pattern>','Limit to hosts'],
      ['-f N','Parallel forks']],
    example:{cmd:'ansible all -i inventory.ini -m ping', out:
`web1.example.com | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
web2.example.com | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
192.168.1.30 | UNREACHABLE! => {
    "msg": "Failed to connect to the host via ssh: ssh: connect to host 192.168.1.30 port 22: No route to host"
}`} },

  { title:'Playbooks', icon:'📜', badge:'PLAYBOOK', color:'green',
    code:
`# site.yml
- name: Web servers
  hosts: web
  become: true
  tasks:
    - name: Install nginx
      ansible.builtin.dnf:
        name: nginx
        state: latest

    - name: Open HTTP in firewalld
      ansible.posix.firewalld:
        service: http
        permanent: true
        immediate: true
        state: enabled

    - name: Start nginx
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: true`,
    cmds:[
      ['ansible-playbook -i inventory.ini site.yml --check --diff','Dry run'],
      ['ansible-playbook -i inventory.ini site.yml','Apply'],
      ['ansible-playbook -i inventory.ini site.yml -l web1.example.com','One host'],
      ['ansible-playbook site.yml --syntax-check',''],
      ['ansible-lint site.yml','Best-practice checks'],
      ['ansible-doc ansible.builtin.dnf','Module docs + examples'],
      ['ansible-galaxy collection install ansible.posix community.general','Extra modules']],
    flags:[
      ['--check','Don\'t change anything'],
      ['--diff','Show file changes'],
      ['--tags / --skip-tags','Run part of a play'],
      ['--start-at-task "<name>"','Resume'],
      ['-e var=value','Extra variables'],
      ['-v / -vvv','Verbosity']],
    example:{cmd:'ansible-playbook -i inventory.ini site.yml', out:
`PLAY [Web servers] ***********************************************************
TASK [Gathering Facts] *******************************************************
ok: [web1.example.com]
TASK [Install nginx] *********************************************************
changed: [web1.example.com]
TASK [Open HTTP in firewalld] ************************************************
changed: [web1.example.com]
TASK [Start nginx] ***********************************************************
changed: [web1.example.com]
PLAY RECAP *******************************************************************
web1.example.com : ok=4  changed=3  unreachable=0  failed=0  skipped=0  rescued=0  ignored=0`} },

  { title:'Vault (Secrets)', icon:'🔐', badge:'VAULT', color:'warn',
    cmds:[
      ['ansible-vault create secrets.yml','New encrypted file'],
      ['ansible-vault edit secrets.yml',''],
      ['ansible-vault view secrets.yml',''],
      ['ansible-vault encrypt vars.yml','Encrypt existing'],
      ['ansible-vault encrypt_string "S3cret!" --name db_password','Inline encrypted var'],
      ['ansible-playbook site.yml --ask-vault-pass',''],
      ['ansible-playbook site.yml --vault-password-file ~/.vault_pass','For automation']],
    flags:[
      ['create / edit / view','Work with vault files'],
      ['encrypt / decrypt / rekey','Change encryption'],
      ['--ask-vault-pass','Prompt'],
      ['--vault-password-file','Read from file (chmod 600)']],
    example:{cmd:'head -2 secrets.yml', out:
`$ANSIBLE_VAULT;1.1;AES256
6231393436613362663034373734336266316263653934623364343461653237`} }
  ]});

/* ── NEW: Kubernetes ── */
insertAfter('ansible', { id:'k8s', icon:'☸️', title:'Kubernetes', sub:'kubectl & helm', desc:'kubectl, local clusters and helm',
  cards:[
  { title:'Local Cluster & Setup', icon:'🏁', badge:'SETUP', color:'green',
    cmds:[
      ['sudo dnf install kubernetes-client helm','kubectl + helm'],
      ['curl -Lo kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64 && chmod +x kind && sudo mv kind /usr/local/bin/','kind (clusters in containers)'],
      ['KIND_EXPERIMENTAL_PROVIDER=podman kind create cluster --name dev','Cluster on podman'],
      ['kubectl cluster-info',''],
      ['kubectl config get-contexts',''],
      ['kubectl config use-context kind-dev',''],
      ['kind delete cluster --name dev','']],
    flags:[
      ['--kubeconfig <file>','Use another config'],
      ['--context <name>','One-off context'],
      ['-n <ns> / -A','Namespace / all namespaces'],
      ['KUBECONFIG=a:b','Merge configs']],
    example:{cmd:'kubectl get nodes -o wide', out:
`NAME                STATUS   ROLES           AGE   VERSION   INTERNAL-IP   OS-IMAGE                         CONTAINER-RUNTIME
dev-control-plane   Ready    control-plane   2m    v1.34.0   10.89.0.2     Debian GNU/Linux 12 (bookworm)   containerd://2.1.3`} },

  { title:'kubectl Everyday', icon:'🧭', badge:'KUBECTL', color:'blue',
    cmds:[
      ['kubectl get pods -A','All pods'],
      ['kubectl get deploy,svc,ing -n shop','Several kinds'],
      ['kubectl describe pod web-7d9f8-abcde','Events + details'],
      ['kubectl logs -f deploy/web --tail=50','Follow logs'],
      ['kubectl exec -it deploy/web -- sh','Shell in a pod'],
      ['kubectl create deployment web --image=nginx --replicas=2',''],
      ['kubectl expose deployment web --port=80 --type=ClusterIP',''],
      ['kubectl port-forward svc/web 8080:80','Local access'],
      ['kubectl apply -f app.yaml','Declarative apply'],
      ['kubectl scale deploy/web --replicas=4',''],
      ['kubectl rollout restart deploy/web',''],
      ['kubectl rollout status deploy/web',''],
      ['kubectl rollout undo deploy/web','Rollback'],
      ['kubectl delete -f app.yaml','']],
    flags:[
      ['-o wide | yaml | json','Output format'],
      ['-o jsonpath="{.items[*].metadata.name}"','Extract fields'],
      ['-l app=web','Label selector'],
      ['-w','Watch changes'],
      ['--dry-run=client -o yaml','Generate YAML without creating'],
      ['explain <kind>.<field>','Built-in API docs']],
    example:{cmd:'kubectl get pods -n shop', out:
`NAME                   READY   STATUS             RESTARTS      AGE
api-6c8f9d7b5-2xk4p    1/1     Running            0             3h
api-6c8f9d7b5-9mzq1    1/1     Running            0             3h
web-7d9f8c6b4-abcde    0/1     CrashLoopBackOff   5 (40s ago)   6m`},
    tip:'<code>alias k=kubectl</code> and <code>source &lt;(kubectl completion bash)</code> save a lot of typing.' },

  { title:'Helm Charts', icon:'⛵', badge:'HELM', color:'blue',
    cmds:[
      ['helm repo add bitnami https://charts.bitnami.com/bitnami',''],
      ['helm repo update',''],
      ['helm search repo postgresql',''],
      ['helm show values bitnami/postgresql > values.yaml','Default settings'],
      ['helm install db bitnami/postgresql -n data --create-namespace -f values.yaml',''],
      ['helm list -A','Installed releases'],
      ['helm upgrade db bitnami/postgresql -n data -f values.yaml',''],
      ['helm rollback db 1 -n data',''],
      ['helm uninstall db -n data','']],
    flags:[
      ['-f values.yaml','Override values'],
      ['--set key=val','Single override'],
      ['--create-namespace','Make namespace if missing'],
      ['--dry-run --debug','Render without installing'],
      ['helm template','Output manifests']],
    example:{cmd:'helm list -A', out:
`NAME  NAMESPACE  REVISION  UPDATED                                 STATUS    CHART              APP VERSION
db    data       2         2026-09-30 00:50:11.4 +0300 +03         deployed  postgresql-16.7.4  17.5.0`} }
  ]});
})();

/* ═════════════════ MORE BASICS (v2.5) ═════════════════ */
(function () {
const b = window.FB_DATA.find(s => s.id === 'basics');
const at = b.cards.findIndex(c => c.title === 'Terminal Shortcuts'); // keep cheat-sheet last
b.cards.splice(at, 0,
  { title:'First Steps: Files & Folders', icon:'🗂️', badge:'START', color:'green',
    desc:'The dozen commands you\'ll type every day.',
    cmds:[
      ['ls','What\'s here?'],
      ['cd Documents','Go into a folder'],
      ['cd ..','Up one level'],
      ['mkdir notes','New folder'],
      ['touch notes/todo.txt','New empty file'],
      ['echo "buy milk" > notes/todo.txt','Write text (replaces file)'],
      ['echo "call mum" >> notes/todo.txt','Add a line'],
      ['cat notes/todo.txt','Show a file'],
      ['cp notes/todo.txt notes/backup.txt','Copy'],
      ['mv notes/backup.txt ~/Desktop/','Move'],
      ['rm ~/Desktop/backup.txt','Delete (no recycle bin!)'],
      ['gio trash old.txt','Delete to Trash instead']],
    flags:[
      ['~','Your home folder (/home/you)'],
      ['.','This folder'],
      ['..','Parent folder'],
      ['/','Top of the filesystem'],
      ['>','Write output to file (overwrite)'],
      ['>>','Append output to file'],
      ['Tab','Auto-complete names — press twice to list']],
    example:{cmd:'mkdir -p notes && echo "buy milk" > notes/todo.txt && cat notes/todo.txt', out:`buy milk`},
    tip:'<code>gio trash</code> moves files to the GNOME Trash, so you can still restore them.' },

  { title:'Wildcards, Braces & Quoting', icon:'✳️', badge:'GLOB', color:'blue',
    cmds:[
      ['ls *.txt','All .txt files'],
      ['ls photo?.jpg','photo1.jpg, photoA.jpg (one character)'],
      ['ls [abc]*','Starts with a, b or c'],
      ['cp report.{docx,pdf} ~/Desktop/','report.docx AND report.pdf'],
      ['mkdir -p project/{src,docs,tests}','Three folders at once'],
      ['echo file{1..5}.txt','Number ranges'],
      ['echo "Home is $HOME"','Double quotes expand variables'],
      ["echo 'Home is $HOME'",'Single quotes are literal'],
      ['touch "my file.txt"','Quote names with spaces'],
      ['rm my\\ file.txt','…or escape the space']],
    flags:[
      ['*','Any characters'],
      ['?','Exactly one character'],
      ['[abc] / [0-9]','One of these'],
      ['{a,b,c}','Each listed word'],
      ['{1..10} / {a..z}','Sequences'],
      ['"…"','Keep spaces, expand $vars'],
      ["'…'",'Keep everything literal'],
      ['\\','Escape one character']],
    example:{cmd:'echo backup-{mon,tue,wed}.tar {1..3}', out:`backup-mon.tar backup-tue.tar backup-wed.tar 1 2 3`},
    warn:'Test a wildcard with <code>ls</code> or <code>echo</code> before using it with <code>rm</code>.' },

  { title:'Finding Things', icon:'🔦', badge:'FIND', color:'blue',
    cmds:[
      ['which firefox','Where a command lives'],
      ['whereis bash','Binary, source and man page'],
      ['type ll','Alias, builtin or file?'],
      ['find ~ -name "*.pdf"','Files by name under home'],
      ['find ~ -iname "*invoice*"','Case-insensitive'],
      ['locate fstab','Instant search (plocate index)'],
      ['grep -i "error" app.log','Lines containing a word'],
      ['grep -rn "TODO" ~/project','Search inside files, recursively'],
      ['history | grep ssh','Commands you ran before'],
      ['dnf provides */bin/htop','Which package gives a command']],
    flags:[
      ['find -name / -iname','Exact / ignore case'],
      ['find -type f / d','Files / directories'],
      ['grep -i','Ignore case'],
      ['grep -r','Recursive'],
      ['grep -n','Line numbers'],
      ['grep -l','Only file names'],
      ['grep -w','Whole words']],
    example:{cmd:'which python3 && whereis bash', out:
`/usr/bin/python3
bash: /usr/bin/bash /usr/share/man/man1/bash.1.gz`} },

  { title:'Keep Fedora Updated', icon:'🔄', badge:'UPDATE', color:'green',
    cmds:[
      ['sudo dnf upgrade --refresh','System packages'],
      ['flatpak update','Flatpak apps'],
      ['fwupdmgr get-updates && fwupdmgr update','Firmware'],
      ['dnf needs-restarting -r','Need a reboot?'],
      ['sudo dnf upgrade --offline && sudo dnf offline reboot','Install during reboot (safest)'],
      ['cat /etc/fedora-release','Which Fedora am I on?']],
    flags:[
      ['--refresh','Always check for newest metadata'],
      ['-y','Don\'t ask'],
      ['--security','Only security fixes'],
      ['flatpak update -y','Non-interactive']],
    example:{cmd:'cat /etc/fedora-release', out:`Fedora release 44 (Forty Four)`},
    tip:'GNOME Software does the same thing graphically and installs updates on reboot by default.' },

  { title:'Installing Software', icon:'🛒', badge:'INSTALL', color:'blue',
    cmds:[
      ['dnf search video editor','Find packages'],
      ['sudo dnf install vlc','Install from Fedora repos'],
      ['sudo dnf remove vlc','Uninstall'],
      ['flatpak search spotify','Find apps on Flathub'],
      ['flatpak install flathub com.spotify.Client','Install a Flatpak'],
      ['flatpak list --app','Installed Flatpaks'],
      ['sudo dnf install ./package.rpm','A downloaded .rpm'],
      ['chmod +x App.AppImage && ./App.AppImage','Run an AppImage'],
      ['gnome-software --search=gimp','Open Software centre at a search']],
    flags:[
      ['dnf = system packages','Tools, libraries, core apps'],
      ['flatpak = sandboxed apps','Desktop apps, newest versions'],
      ['.rpm','Vendor packages (Chrome, VS Code…)'],
      ['AppImage','Single-file portable apps (needs fuse)']],
    example:{cmd:'dnf search --quiet "video editor" | head -4', out:
`Matched fields: summary
 kdenlive.x86_64       Non-linear video editor
 openshot.noarch       Create and edit videos and movies
 pitivi.x86_64         Non-linear video editor`} },

  { title:'Power & Session', icon:'⏻', badge:'POWER', color:'warn',
    cmds:[
      ['systemctl reboot','Restart now'],
      ['systemctl poweroff','Shut down now'],
      ['sudo shutdown -r +10 "Rebooting for updates"','Reboot in 10 min with a message'],
      ['sudo shutdown -c','Cancel a scheduled shutdown'],
      ['systemctl suspend','Sleep'],
      ['loginctl lock-session','Lock the screen'],
      ['gnome-session-quit --logout','Log out of GNOME'],
      ['exit','Close this shell / SSH session']],
    flags:[
      ['shutdown -h now','Halt / power off'],
      ['shutdown -r now','Reboot'],
      ['shutdown +N','In N minutes'],
      ['shutdown HH:MM','At a time'],
      ['shutdown -c','Cancel']],
    example:{cmd:'sudo shutdown -r +10 "Rebooting for updates"', out:
`Reboot scheduled for Wed 2026-09-30 01:05:00 +03, use 'shutdown -c' to cancel.`} },

  { title:'Exit Codes & Chaining', icon:'🔗', badge:'LOGIC', color:'blue',
    cmds:[
      ['ls /etc; echo $?','0 = success'],
      ['ls /nope; echo $?','Non-zero = error'],
      ['mkdir build && cd build','Second runs only if first succeeds'],
      ['ping -c1 router || echo "router down"','Second runs only on failure'],
      ['sudo dnf upgrade -y; systemctl reboot','Run both regardless'],
      ['(cd /tmp && ls)','Subshell — your directory doesn\'t change'],
      ['command -v git >/dev/null && echo "git installed"','Test if a command exists']],
    flags:[
      ['$?','Exit code of last command'],
      ['&&','AND — on success'],
      ['||','OR — on failure'],
      [';','Always continue'],
      ['( … )','Run in a subshell'],
      ['>/dev/null 2>&1','Hide all output']],
    example:{cmd:'ls /nope; echo "exit code: $?"', out:
`ls: cannot access '/nope': No such file or directory
exit code: 2`} },

  { title:'Handy Little Tools', icon:'🧮', badge:'FUN', color:'green',
    cmds:[
      ['cal','This month'],
      ['cal -3','Last, this and next month'],
      ['echo "scale=2; 1299 * 1.05" | bc','Calculator'],
      ['echo $(( 60 * 60 * 24 ))','Integer maths in bash'],
      ['seq 1 5','Count'],
      ['shuf -i 1-100 -n 1','Random number'],
      ['factor 2026','Prime factors'],
      ['date','Current date & time'],
      ['echo "hello" | rev','Reverse text'],
      ['sudo dnf install cowsay fortune-mod && fortune | cowsay','Just for fun']],
    flags:[
      ['cal -y','Whole year'],
      ['cal 12 2026','Specific month'],
      ['bc -l','Maths library (decimals, sqrt)'],
      ['seq -s, 1 5','Custom separator'],
      ['shuf -n N file','N random lines']],
    example:{cmd:'cal', out:
`   September 2026
Su Mo Tu We Th Fr Sa
       1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 29 30`} }
);
{ const k = b.cards.findIndex(c => c.title.startsWith('First Steps')); b.cards.unshift(b.cards.splice(k, 1)[0]); }
})();

/* ═════════════════ MORE BASICS (v2.6) ═════════════════ */
(function () {
const b = window.FB_DATA.find(s => s.id === 'basics');
const before = t => b.cards.findIndex(c => c.title === t);
b.cards.splice(before('Terminal Shortcuts'), 0,
  { title:'Reading Files Comfortably', icon:'📖', badge:'READ', color:'blue',
    cmds:[
      ['less /etc/os-release','Scroll through a file'],
      ['head -n 5 notes.txt','First 5 lines'],
      ['tail -n 5 notes.txt','Last 5 lines'],
      ['tail -f app.log','Watch a file grow (Ctrl+C stops)'],
      ['wc -l notes.txt','How many lines'],
      ['cat -n notes.txt','With line numbers'],
      ['diff old.txt new.txt','What changed'],
      ['ls -l | less','Page any long output']],
    table:{head:['Key in less','Action'], rows:[
      ['Space / b','Page down / up'],['↑ ↓','Line by line'],
      ['g / G','Top / bottom'],['/word','Search forward'],
      ['n / N','Next / previous match'],['q','Quit']]},
    flags:[
      ['head -n N / tail -n N','N lines'],
      ['tail -f','Follow'],
      ['wc -l / -w / -c','Lines / words / bytes'],
      ['less -N','Line numbers'],
      ['less -S','Don\'t wrap long lines']],
    example:{cmd:'wc -l /etc/passwd /etc/group', out:
`  48 /etc/passwd
  79 /etc/group
 127 total`} },

  { title:'Permissions Explained', tableFirst:true, icon:'🔑', badge:'PERMS', color:'warn',
    desc:'Reading <code>-rwxr-xr--</code>: type, then owner / group / others.',
    table:{head:['Part','Meaning'], rows:[
      ['-  d  l','File, directory, symbolic link'],
      ['rwx (1st)','Owner can read, write, execute'],
      ['r-x (2nd)','Group can read, execute'],
      ['r-- (3rd)','Everyone else can read'],
      ['r=4 w=2 x=1','Add them up: rwx=7, r-x=5, r--=4'],
      ['754','= rwxr-xr--']]},
    cmds:[
      ['ls -l script.sh','See permissions'],
      ['chmod +x script.sh','Make runnable'],
      ['./script.sh','Run it'],
      ['chmod 644 notes.txt','Normal file: you write, others read'],
      ['chmod 600 secret.txt','Only you'],
      ['chmod 755 ~/bin','Normal folder/program'],
      ['sudo chown $USER: file.txt','Make a file yours']],
    flags:[
      ['u g o a','Who: user, group, others, all'],
      ['+ - =','Add, remove, set'],
      ['-R','Whole folder recursively'],
      ['$USER:','You and your group']],
    example:{cmd:'ls -l script.sh && chmod +x script.sh && ls -l script.sh', out:
`-rw-r--r--. 1 sooraj sooraj 58 Sep 30 00:55 script.sh
-rwxr-xr-x. 1 sooraj sooraj 58 Sep 30 00:55 script.sh`},
    tip:'"Permission denied" running a script usually just means it needs <code>chmod +x</code>.' },

  { title:'Users & sudo Basics', icon:'🙋', badge:'SUDO', color:'blue',
    cmds:[
      ['whoami','Your username'],
      ['id','Your UID and groups'],
      ['passwd','Change your own password'],
      ['sudo dnf upgrade','Run one command as admin'],
      ['sudo -i','Admin shell (exit to leave)'],
      ['sudo !!','Repeat last command with sudo'],
      ['groups','Are you in wheel (admin)?'],
      ['su - alice','Switch to another user']],
    flags:[
      ['sudo -i','Root login shell'],
      ['sudo -u <user>','Run as another user'],
      ['sudo -k','Forget password cache'],
      ['wheel group','= allowed to use sudo on Fedora']],
    example:{cmd:'groups', out:`sooraj wheel`},
    warn:'Only use <code>sudo</code> when a command needs it — and never paste sudo commands from the web you don\'t understand.' },

  { title:'USB Drives & Disks', icon:'🧷', badge:'USB', color:'blue',
    cmds:[
      ['lsblk','Which disks are connected'],
      ['df -h','How full they are'],
      ['ls /run/media/$USER/','Where USB drives appear'],
      ['udisksctl mount -b /dev/sdb1','Mount without sudo'],
      ['udisksctl unmount -b /dev/sdb1','Unmount'],
      ['udisksctl power-off -b /dev/sdb','Safe to remove'],
      ['sync','Flush pending writes'],
      ['gnome-disks','Graphical disk tool']],
    flags:[
      ['sdX','USB/SATA disks (sda, sdb…)'],
      ['nvme0n1pN','NVMe SSD partitions'],
      ['-b <device>','Block device to act on'],
      ['lsblk -f','Show filesystems and labels']],
    example:{cmd:'udisksctl mount -b /dev/sdb1', out:`Mounted /dev/sdb1 at /run/media/sooraj/USB-STICK`},
    danger:'Never write to <code>/dev/sda</code> or <code>/dev/nvme0n1</code> by mistake — that\'s usually your main disk. Check <code>lsblk</code> first.' },

  { title:'Network Basics', icon:'📡', badge:'NET', color:'blue',
    cmds:[
      ['ip a','Your IP addresses'],
      ['hostname -I','Just the IPs'],
      ['ping -c 4 fedoraproject.org','Is the internet up?'],
      ['nmcli device wifi list','Nearby Wi-Fi'],
      ['nmcli device wifi connect "HomeWiFi" --ask','Connect (prompts for password)'],
      ['nmcli connection show --active','What you\'re connected to'],
      ['curl ifconfig.me','Your public IP'],
      ['nmcli device wifi show-password','QR + password for current Wi-Fi']],
    flags:[
      ['ping -c N','Stop after N'],
      ['nmcli dev wifi rescan','Refresh list'],
      ['--ask','Prompt for secrets'],
      ['nmtui','Menu-driven network setup']],
    example:{cmd:'nmcli device wifi list', out:
`IN-USE  BSSID              SSID          MODE   CHAN  RATE        SIGNAL  BARS  SECURITY
*       A4:2B:B0:11:22:33  HomeWiFi      Infra  36    540 Mbit/s  82      ▂▄▆█  WPA3
        C8:3A:35:44:55:66  Neighbour_5G  Infra  149   270 Mbit/s  41      ▂▄__  WPA2`} },

  { title:'Processes Basics', icon:'🏃', badge:'PROC', color:'blue',
    cmds:[
      ['top','Live view (q to quit)'],
      ['ps aux | grep firefox','Find a program'],
      ['pgrep -l firefox','PID by name'],
      ['kill 4410','Ask a process to stop'],
      ['pkill firefox','Stop by name'],
      ['kill -9 4410','Force stop (last resort)'],
      ['xkill','Click a frozen window to kill it (X11 apps)'],
      ['gnome-system-monitor','Graphical task manager']],
    table:{head:['Key','In the terminal'], rows:[
      ['Ctrl+C','Stop the running command'],
      ['Ctrl+Z','Pause it'],
      ['fg','Resume paused command'],
      ['bg','Resume it in background'],
      ['command &','Start in background']]},
    flags:[
      ['top: P / M','Sort by CPU / memory'],
      ['top: k','Kill a PID'],
      ['kill -15 (default)','Polite stop'],
      ['kill -9','Forced stop']],
    example:{cmd:'pgrep -l firefox', out:
`3120 firefox
3188 firefox`} },

  { title:'Download & Unpack', icon:'📥', badge:'GET', color:'green',
    cmds:[
      ['wget https://example.com/file.zip','Download'],
      ['curl -LO https://example.com/file.zip','Same with curl'],
      ['unzip file.zip','Extract zip'],
      ['unzip file.zip -d folder/','…into a folder'],
      ['tar -xf archive.tar.gz','Extract any tar (.gz .xz .zst)'],
      ['tar -czf backup.tar.gz Documents/','Make a .tar.gz'],
      ['zip -r photos.zip Pictures/','Make a .zip'],
      ['sha256sum file.zip','Check it matches the website']],
    flags:[
      ['wget -c','Resume'],
      ['curl -L','Follow redirects'],
      ['curl -O','Keep remote file name'],
      ['tar -x / -c / -t','Extract / create / list'],
      ['tar -f','Archive file name follows'],
      ['unzip -l','List contents']],
    example:{cmd:'tar -czf backup.tar.gz Documents/ && ls -lh backup.tar.gz', out:`-rw-r--r--. 1 sooraj sooraj 48M Sep 30 00:57 backup.tar.gz`},
    tip:'Remember tar as e<b>X</b>tract / <b>C</b>reate + <b>F</b>ile: <code>tar -xf</code>, <code>tar -cf</code>.' },

  { title:'Services Basics', icon:'⚙️', badge:'SYSTEMD', color:'blue',
    cmds:[
      ['systemctl status sshd','Running? Errors?'],
      ['sudo systemctl start sshd','Start now'],
      ['sudo systemctl stop sshd','Stop now'],
      ['sudo systemctl restart sshd','Restart'],
      ['sudo systemctl enable --now sshd','Start now + at every boot'],
      ['sudo systemctl disable sshd','Don\'t start at boot'],
      ['systemctl list-units --type=service --state=running','What\'s running'],
      ['journalctl -u sshd -e','Its logs (jump to end)']],
    flags:[
      ['start / stop / restart','Right now'],
      ['enable / disable','At boot'],
      ['--now','Both at once'],
      ['status','State + recent logs']],
    example:{cmd:'systemctl is-active sshd; systemctl is-enabled sshd', out:
`active
enabled`} },

  { title:'Clipboard & Output', icon:'📋', badge:'CLIP', color:'green',
    cmds:[
      ['sudo dnf install wl-clipboard','Wayland clipboard tools'],
      ['cat ~/.ssh/id_ed25519.pub | wl-copy','Copy to clipboard'],
      ['wl-paste > pasted.txt','Paste into a file'],
      ['ls -l | tee listing.txt','Show AND save'],
      ['printf "%-10s %5d\\n" apples 12','Formatted output'],
      ['echo -e "line1\\nline2"','Escape sequences'],
      ['clear','Clean screen (or Ctrl+L)'],
      ['reset','Fix a garbled terminal']],
    flags:[
      ['wl-copy / wl-paste','Wayland (Fedora default)'],
      ['xclip -sel clip','X11 alternative'],
      ['tee -a','Append'],
      ['echo -n','No trailing newline'],
      ['echo -e','Interpret \\n \\t']],
    example:{cmd:'printf "%-10s %5d\\n" apples 12 pears 7', out:
`apples        12
pears          7`},
    tip:'In GNOME Terminal copy/paste is <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> / <kbd>V</kbd> — plain Ctrl+C stops a command.' }
);
// Command Anatomy goes right after First Steps
b.cards.splice(1, 0,
  { title:'Command Anatomy', tableFirst:true, icon:'🧬', badge:'LEARN', color:'green',
    desc:'Almost every command follows the same shape.',
    table:{head:['Part','Example in: ls -lh --color=auto /etc'], rows:[
      ['command','ls — the program to run'],
      ['short options','-lh — single letters, can be combined'],
      ['long options','--color=auto — full words, two dashes'],
      ['arguments','/etc — what to act on'],
      ['sudo prefix','sudo ls /root — run as admin'],
      ['pipe |','ls | wc -l — feed output to another command'],
      ['redirect >','ls > list.txt — save output to a file']]},
    cmds:[
      ['ls --help | less','Every command explains itself'],
      ['man ls','Full manual (q to quit)'],
      ['tldr ls','Short practical examples'],
      ['ls -l -h','Same as…'],
      ['ls -lh','…combined short options']],
    flags:[
      ['-x','Short option'],
      ['--word','Long option'],
      ['--opt=value','Option with a value'],
      ['--','End of options (for names starting with -)']],
    example:{cmd:'rm -v -- -weird-name.txt', out:`removed '-weird-name.txt'`},
    tip:'Stuck? Try <code>command --help</code>, then <code>man command</code>, then the <b>Terminal</b> tab here with <code>man command</code>.' }
);
{ const h = b.cards.findIndex(c => c.title === 'Handy Little Tools'); const card = b.cards.splice(h, 1)[0]; b.cards.splice(b.cards.findIndex(c => c.title === 'Terminal Shortcuts'), 0, card); }
})();

/* ═════════════════ MORE TROUBLESHOOTING (v2.7) ═════════════════ */
(function () {
const f = window.FB_DATA.find(s => s.id === 'fix');
const DX = { flagsLabel:'Diagnosis', flagsHead:['If you see','It means / do this'] };
const card = o => Object.assign({}, DX, o);

// "Gather info" goes first — it's step zero for any problem
f.cards.unshift(card({ title:'Step 0: Gather Info Before Asking', icon:'🗒️', badge:'INFO', color:'green',
  desc:'Collect this before posting on <b>discussion.fedoraproject.org</b> or filing a bug.',
  cmds:[
    ['cat /etc/fedora-release && uname -r','Release + kernel'],
    ['sudo dnf install inxi && inxi -Fxz > system.txt','Hardware summary (hides serials)'],
    ['journalctl -b -p warning --no-pager > boot-warnings.txt','Warnings & errors this boot'],
    ['journalctl -b -1 -p err --no-pager > prev-boot-errors.txt','…and last boot'],
    ['sudo dmesg -T > dmesg.txt','Kernel messages'],
    ['dnf history list | head -5','What changed recently'],
    ['lspci -nnk > lspci.txt && lsusb > lsusb.txt','Devices + drivers'],
    ['systemctl --failed','Failed units']],
  flags:[
    ['"It broke after an update"','→ dnf history list, then dnf history undo <id>'],
    ['"It broke after a new kernel"','→ boot the previous kernel from GRUB'],
    ['Hardware-specific issue','→ include lspci -nnk / lsusb output'],
    ['Screenshots of text','→ paste text instead; it\'s searchable']],
  example:{cmd:'cat /etc/fedora-release && uname -r', out:
`Fedora release 44 (Forty Four)
6.19.8-200.fc44.x86_64`},
  tip:'Remove usernames, hostnames and IPs you don\'t want public before sharing logs.' }));

f.cards.push(
  card({ title:'No Sound', icon:'🔇', badge:'AUDIO', color:'warn',
    cmds:[
      ['wpctl status','Is the right output (Sink) marked with * ?'],
      ['wpctl get-volume @DEFAULT_AUDIO_SINK@','Muted? Volume 0?'],
      ['wpctl set-mute @DEFAULT_AUDIO_SINK@ 0 && wpctl set-volume @DEFAULT_AUDIO_SINK@ 70%',''],
      ['wpctl set-default <ID>','Switch to the correct device'],
      ['speaker-test -c 2 -t wav -l 1','Test left/right'],
      ['alsamixer','Unmute hardware channels (M key) — alsa-utils'],
      ['systemctl --user restart pipewire pipewire-pulse wireplumber','Restart the audio stack'],
      ['rm -rf ~/.local/state/wireplumber && systemctl --user restart wireplumber','Reset saved audio settings'],
      ['sudo dnf install alsa-sof-firmware','Newer Intel laptops (no devices listed)']],
    flags:[
      ['"Dummy Output" only','→ missing firmware/driver; check dmesg | grep -i sof'],
      ['[MUTED] in get-volume','→ set-mute 0'],
      ['Sound on wrong device','→ wpctl set-default <ID>'],
      ['HDMI silent','→ pick the HDMI profile in Settings → Sound'],
      ['Works after restart of wireplumber','→ corrupted state; delete ~/.local/state/wireplumber']],
    example:{cmd:'wpctl get-volume @DEFAULT_AUDIO_SINK@', out:`Volume: 0.40 [MUTED]`} }),

  card({ title:'Wi-Fi Missing or Dropping', icon:'📶', badge:'WIFI', color:'warn',
    cmds:[
      ['nmcli radio wifi','enabled / disabled'],
      ['rfkill list','Soft/hard blocked?'],
      ['lspci -k | grep -A3 -i network','Card + driver in use'],
      ['sudo dmesg | grep -iE "firmware|iwlwifi|ath|rtw|brcm"','Firmware errors'],
      ['sudo dnf install broadcom-wl','Broadcom cards (RPM Fusion nonfree)'],
      ['nmcli connection delete "HomeWiFi"','Forget the network…'],
      ['nmcli device wifi connect "HomeWiFi" --ask','…and reconnect'],
      ['printf "[connection]\\nwifi.powersave = 2\\n" | sudo tee /etc/NetworkManager/conf.d/wifi-powersave.conf','Disable power saving (fixes drops)'],
      ['sudo systemctl restart NetworkManager','']],
    flags:[
      ['No wlp… device at all','→ no driver/firmware; check lspci -k + dmesg'],
      ['"Hard blocked: yes"','→ hardware switch / Fn key / BIOS'],
      ['Connects then drops','→ disable powersave; try 5 GHz vs 2.4 GHz'],
      ['"Secrets were required"','→ wrong password; delete and reconnect'],
      ['Broadcom BCM43xx','→ broadcom-wl from RPM Fusion']],
    example:{cmd:'lspci -k | grep -A3 -i network', out:
`03:00.0 Network controller: Intel Corporation Wi-Fi 6E(802.11ax) AX211 160MHz
	Subsystem: Intel Corporation Device 0094
	Kernel driver in use: iwlwifi
	Kernel modules: iwlwifi`} }),

  card({ title:'Display & Graphics Problems', icon:'🖥️', badge:'GPU', color:'red',
    cmds:[
      ['# Black screen after boot: at GRUB press e, add "nomodeset", Ctrl+X',''],
      ['lspci -k | grep -EA3 "VGA|3D|Display"','Which GPU driver is loaded'],
      ['journalctl -b -1 -g "drm|amdgpu|i915|nouveau|nvidia" --no-pager | tail -30','GPU errors last boot'],
      ['journalctl -b -u gdm --no-pager | tail -30','Login screen errors'],
      ['mv ~/.config/monitors.xml ~/.config/monitors.xml.bak','Reset monitor layout'],
      ['echo $XDG_SESSION_TYPE','wayland (GNOME on F43+ is Wayland-only)'],
      ['rpm -q mesa-dri-drivers akmod-nvidia','Driver package versions'],
      ['sudo dnf downgrade mesa\\*','If a Mesa update broke things']],
    flags:[
      ['Boots only with nomodeset','→ GPU driver issue; NVIDIA users install akmod-nvidia'],
      ['NVIDIA + black screen after update','→ akmod not rebuilt yet; boot old kernel, wait, reboot'],
      ['Wrong resolution / monitor order','→ delete ~/.config/monitors.xml'],
      ['Flicker / tearing on one app','→ try the Flatpak version or an older kernel'],
      ['nouveau loaded on NVIDIA','→ proprietary driver not active']],
    example:{cmd:'lspci -k | grep -EA3 "VGA|3D"', out:
`01:00.0 VGA compatible controller: NVIDIA Corporation AD104 [GeForce RTX 4070] (rev a1)
	Subsystem: ASUSTeK Computer Inc. Device 88d2
	Kernel driver in use: nvidia
	Kernel modules: nouveau, nvidia_drm, nvidia`},
    warn:'<code>nomodeset</code> is a temporary rescue option — remove it once the right driver is installed.' }),

  card({ title:'Bluetooth Won\'t Pair or Connect', icon:'🦷', badge:'BT', color:'blue',
    cmds:[
      ['systemctl status bluetooth','Service running?'],
      ['rfkill list bluetooth','Blocked?'],
      ['sudo rfkill unblock bluetooth',''],
      ['bluetoothctl show','Controller powered + discoverable?'],
      ['bluetoothctl remove AA:BB:CC:DD:EE:FF','Forget the device…'],
      ['bluetoothctl scan on','…put device in pairing mode…'],
      ['bluetoothctl pair AA:BB:CC:DD:EE:FF && bluetoothctl trust AA:BB:CC:DD:EE:FF','…pair + trust'],
      ['sudo systemctl restart bluetooth',''],
      ['journalctl -u bluetooth -b --no-pager | tail -20','Errors']],
    flags:[
      ['"No default controller available"','→ rfkill / missing firmware (dmesg | grep -i blue)'],
      ['Pairs but no audio','→ pick the device in wpctl status / Settings → Sound'],
      ['Headset low quality','→ it switched to HFP (mic) profile; pick A2DP'],
      ['Device paired to another PC','→ remove it there or reset the device']],
    example:{cmd:'bluetoothctl show | head -5', out:
`Controller 70:A8:D3:11:22:33 (public)
	Name: fedora-ws
	Powered: yes
	Discoverable: no
	Pairable: yes`} }),

  card({ title:'Can\'t Log In', icon:'🚪', badge:'LOGIN', color:'red',
    cmds:[
      ['# Press Ctrl+Alt+F3 for a text login (Ctrl+Alt+F1/F2 to go back)',''],
      ['sudo faillock --user $USER','Locked after wrong passwords?'],
      ['sudo faillock --user $USER --reset','Unlock'],
      ['df -h /home','A full disk blocks graphical login'],
      ['ls -ldZ ~','Home owned by you? Correct SELinux label?'],
      ['sudo restorecon -Rv /home/$USER','Fix labels (after copying home from backup)'],
      ['journalctl -b -u gdm --no-pager | tail -30','Login screen errors'],
      ['mv ~/.config ~/.config.bak','Test with fresh settings (logout, try again)'],
      ['# Forgot the password entirely? See Boot → Rescue & Recovery (rd.break)','']],
    flags:[
      ['Login loop (returns to login screen)','→ disk full, wrong home ownership or SELinux labels'],
      ['"Authentication failure" but password right','→ faillock or keyboard layout'],
      ['Works on TTY, not GUI','→ desktop/session issue; check gdm logs, reset ~/.config'],
      ['New test user works','→ problem is in your home folder settings']],
    example:{cmd:'sudo faillock --user sooraj', out:
`sooraj:
When                Type  Source                                           Valid
2026-09-30 00:58:02 RHOST                                                      V
2026-09-30 00:58:09 RHOST                                                      V
2026-09-30 00:58:15 RHOST                                                      V`} }),

  card({ title:'Frozen Desktop', icon:'🧊', badge:'FREEZE', color:'warn',
    cmds:[
      ['# 1. Try Ctrl+Alt+F3 to reach a text console',''],
      ['top -o %MEM','Find the runaway process'],
      ['kill -9 <PID>',''],
      ['loginctl list-sessions',''],
      ['loginctl terminate-session <ID>','Log that session out'],
      ['sudo systemctl restart gdm','Restart the login manager (logs out everyone)'],
      ['# 2. From another computer: ssh in and do the same',''],
      ['echo "kernel.sysrq = 1" | sudo tee /etc/sysctl.d/90-sysrq.conf','Enable Magic SysRq for next time'],
      ['journalctl -b -1 -e','After a hard reset: what happened before']],
    table:{head:['Magic SysRq: hold Alt+SysRq, type slowly','Effect'], rows:[
      ['R','Take keyboard back from the display server'],
      ['E','Ask all processes to terminate'],
      ['I','Kill all processes'],
      ['S','Sync disks'],
      ['U','Remount read-only'],
      ['B','Reboot']]},
    flags:[
      ['Mouse moves, nothing responds','→ GNOME Shell stuck; try Ctrl+Alt+F3'],
      ['Everything frozen incl. mouse','→ kernel/GPU hang; SysRq REISUB or SSH in'],
      ['Freezes when RAM fills up','→ check journalctl -u systemd-oomd; add RAM / close apps']],
    example:{cmd:'loginctl list-sessions', out:
`SESSION  UID USER   SEAT  LEADER CLASS   TTY  IDLE SINCE
      2 1000 sooraj seat0 2011   user    tty2 no   -
      5 1000 sooraj seat0 7120   user    tty3 no   -

2 sessions listed.`},
    tip:'Fedora ships with SysRq limited to "sync" (16). Enabling it fully is a trade-off — anyone at the keyboard can reboot.' }),

  card({ title:'"Permission denied"', icon:'⛔', badge:'PERMS', color:'warn',
    cmds:[
      ['ls -l file','Owner and mode'],
      ['namei -l /srv/app/data/file.txt','Permissions of EVERY folder on the path'],
      ['id','Which groups you are in'],
      ['ls -Z file','SELinux label'],
      ['sudo ausearch -m avc -ts recent','Was it SELinux?'],
      ['sudo -u nginx cat /srv/app/data/file.txt','Test as the service user'],
      ['lsattr file','Immutable (i) flag?'],
      ['findmnt -no OPTIONS --target /run/media/$USER/USB','noexec / ro mount?'],
      ['newgrp docker','Use a group you were just added to (or log out/in)']],
    flags:[
      ['Can read file, can\'t cd to folder','→ folder missing x permission (namei shows it)'],
      ['Script: "Permission denied"','→ chmod +x, or the drive is mounted noexec'],
      ['Right perms, still denied','→ SELinux (ausearch) or immutable flag'],
      ['Just added to a group','→ log out and back in'],
      ['Files on USB owned by root','→ exFAT/NTFS mount options, not chmod']],
    example:{cmd:'namei -l /srv/app/data/file.txt', out:
`f: /srv/app/data/file.txt
dr-xr-xr-x root  root  /
drwxr-xr-x root  root  srv
drwxr-x--- app   app   app
drwxr-xr-x app   app   data
-rw-r--r-- app   app   file.txt`},
    tip:'In that example "app" is <code>drwxr-x---</code> — anyone not in group <i>app</i> is stopped there, whatever file.txt says.' }),

  card({ title:'Service Won\'t Start', icon:'🛑', badge:'SERVICE', color:'red',
    cmds:[
      ['systemctl status myapp -l --no-pager','Last log lines + exit code'],
      ['journalctl -xeu myapp','Full log with explanations'],
      ['systemd-analyze verify /etc/systemd/system/myapp.service','Unit file mistakes'],
      ['systemctl cat myapp','The unit as systemd sees it'],
      ['sudo ss -tlnp | grep ":80 "','Port already taken?'],
      ['sudo -u myuser /opt/myapp/myapp --config /etc/myapp.conf','Run it by hand as the service user'],
      ['sudo ausearch -m avc -ts recent -c myapp','SELinux blocking it?'],
      ['sudo systemctl daemon-reload && sudo systemctl reset-failed myapp','After fixing']],
    flags:[
      ['status=203/EXEC','→ ExecStart path wrong or not executable'],
      ['status=217/USER','→ User= doesn\'t exist'],
      ['"Address already in use"','→ another process owns the port (ss -tlnp)'],
      ['"start request repeated too quickly"','→ it crashes on start; read journalctl, then reset-failed'],
      ['Works by hand, fails as service','→ SELinux, environment, or working directory']],
    example:{cmd:'systemctl status myapp --no-pager | head -6', out:
`× myapp.service - My Application
     Loaded: loaded (/etc/systemd/system/myapp.service; enabled; preset: disabled)
     Active: failed (Result: exit-code) since Wed 2026-09-30 00:59:12 +03; 8s ago
    Process: 9120 ExecStart=/opt/myapp/myapp --config /etc/myapp.conf (code=exited, status=203/EXEC)
   Main PID: 9120 (code=exited, status=203/EXEC)`} }),

  card({ title:'SSH Won\'t Connect', icon:'🔌', badge:'SSH', color:'warn',
    cmds:[
      ['ssh -vvv user@host','Verbose: shows where it stops'],
      ['nc -zv host 22','Is port 22 reachable at all?'],
      ['# On the server:',''],
      ['systemctl status sshd',''],
      ['sudo sshd -t','Config syntax'],
      ['sudo firewall-cmd --list-services | grep ssh','Firewall allows ssh?'],
      ['journalctl -u sshd -e','Why it refused you'],
      ['chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys','Key auth needs strict perms'],
      ['restorecon -Rv ~/.ssh','SELinux labels on .ssh'],
      ['ssh-keygen -R host','"Host identification has changed" (verify first!)']],
    flags:[
      ['"Connection refused"','→ sshd not running or wrong port'],
      ['"Connection timed out"','→ firewall / wrong IP / host down'],
      ['"Permission denied (publickey)"','→ key not in authorized_keys, or perms/SELinux on ~/.ssh'],
      ['"REMOTE HOST IDENTIFICATION HAS CHANGED"','→ server reinstalled… or an attack. Confirm, then ssh-keygen -R'],
      ['"Too many authentication failures"','→ ssh -o IdentitiesOnly=yes -i key']],
    example:{cmd:'nc -zv 192.168.1.100 22', out:`Ncat: Connection refused.`} }),

  card({ title:'USB Drive Not Showing', icon:'💾', badge:'USB', color:'blue',
    cmds:[
      ['sudo dmesg -w','Watch while you plug it in'],
      ['lsusb','Seen on the USB bus?'],
      ['lsblk -f','Seen as a disk? Which filesystem?'],
      ['udisksctl mount -b /dev/sdb1',''],
      ['sudo fsck.vfat -a /dev/sdb1','Repair FAT32'],
      ['sudo dnf install ntfs-3g ntfsprogs && sudo ntfsfix /dev/sdb1','Repair NTFS "dirty" flag'],
      ['sudo fsck.exfat /dev/sdb1','Repair exFAT']],
    flags:[
      ['Nothing in dmesg','→ cable/port/hub; try another port'],
      ['In lsusb, not in lsblk','→ device isn\'t storage or needs a driver'],
      ['NTFS mounts read-only','→ Windows Fast Startup/hibernation; shut Windows down fully'],
      ['"wrong fs type"','→ unformatted or unsupported filesystem']],
    example:{cmd:'sudo dmesg -T | tail -3', out:
`[Wed Sep 30 01:02:11 2026] usb 3-1: new high-speed USB device number 7 using xhci_hcd
[Wed Sep 30 01:02:11 2026] usb-storage 3-1:1.0: USB Mass Storage device detected
[Wed Sep 30 01:02:12 2026] sd 1:0:0:0: [sdb] 60751872 512-byte logical blocks: (31.1 GB/29.0 GiB)`} }),

  card({ title:'Wrong Time / Clock Drift', icon:'⏰', badge:'TIME', color:'blue',
    cmds:[
      ['timedatectl','Timezone, NTP, RTC settings'],
      ['sudo timedatectl set-timezone Asia/Qatar',''],
      ['sudo timedatectl set-ntp true','Automatic sync'],
      ['chronyc sources -v','Reaching time servers?'],
      ['sudo chronyc makestep','Jump to correct time now'],
      ['sudo timedatectl set-local-rtc 1 --adjust-system-clock','Dual-boot with Windows (or set Windows to UTC instead)']],
    flags:[
      ['Off by whole hours','→ wrong timezone, or dual-boot RTC mismatch'],
      ['"System clock synchronized: no"','→ NTP off or blocked (UDP 123)'],
      ['Wrong after every Windows boot','→ RTC local vs UTC mismatch'],
      ['TLS errors / "certificate not yet valid"','→ clock is wrong']],
    example:{cmd:'chronyc sources', out:
`MS Name/IP address         Stratum Poll Reach LastRx Last sample
===============================================================================
^* time.cloudflare.com           3   6   377    22   +112us[ +140us] +/- 9212us
^- ntp1.example.net              2   6   377    21  -1204us[-1204us] +/-   38ms`} }),

  card({ title:'Printer Problems', icon:'🖨️', badge:'CUPS', color:'blue',
    cmds:[
      ['lpstat -t','All printers, queues, errors'],
      ['driverless','Network printers that need no driver (IPP Everywhere)'],
      ['lpinfo -v','Detected printer connections'],
      ['cancel -a','Clear stuck jobs'],
      ['cupsenable MyPrinter','Re-enable a paused printer'],
      ['sudo systemctl restart cups',''],
      ['sudo dnf install hplip','HP printers'],
      ['lp -d MyPrinter test.pdf','Print from the terminal'],
      ['# Web admin: http://localhost:631','']],
    flags:[
      ['"Paused" / "disabled"','→ cupsenable <printer>'],
      ['Jobs stuck in queue','→ cancel -a, then restart cups'],
      ['Printer not found on network','→ firewall: allow mdns and ipp-client'],
      ['Garbage output','→ wrong driver; re-add with driverless/IPP']],
    example:{cmd:'lpstat -t', out:
`scheduler is running
system default destination: HP_OfficeJet
device for HP_OfficeJet: implicitclass://HP_OfficeJet/
HP_OfficeJet accepting requests since Wed 30 Sep 2026 12:40:03 AM
printer HP_OfficeJet disabled since Wed 30 Sep 2026 12:58:41 AM -
	Unable to connect to printer; will retry in 30 seconds.`} }),

  card({ title:'Battery Drain & Overheating', icon:'🔥', badge:'POWER', color:'warn',
    cmds:[
      ['top -o %CPU','Something stuck at 100%?'],
      ['sensors','Temperatures + fan speed'],
      ['powerprofilesctl set power-saver',''],
      ['sudo dnf install powertop && sudo powertop','What uses power (Tab through views)'],
      ['sudo powertop --auto-tune','Apply all tunables (until reboot)'],
      ['upower -i $(upower -e | grep BAT) | grep -E "state|energy-rate|capacity|time to"','Drain rate + battery health'],
      ['flatpak ps','Background Flatpak apps']],
    flags:[
      ['energy-rate > 15 W idle','→ find the process / device with powertop'],
      ['capacity < 70%','→ worn battery, not software'],
      ['Fans always loud','→ top for CPU hogs, clean vents, check sensors'],
      ['Drains while suspended','→ check /sys/power/mem_sleep (s2idle vs deep)']],
    example:{cmd:'upower -i $(upower -e | grep BAT) | grep -E "state|energy-rate|capacity"', out:
`    state:               discharging
    energy-rate:         7.812 W
    capacity:            91.4%`} }),

  card({ title:'App Blocked by SELinux', icon:'🛡️', badge:'SELINUX', color:'red',
    cmds:[
      ['sudo ausearch -m avc -ts recent','Recent denials'],
      ['sudo sealert -l "*"','Plain-English explanation + suggested fix'],
      ['sudo restorecon -Rv /path/to/files','Fix wrong labels (most common cause)'],
      ['getsebool -a | grep httpd','Is there a boolean for it?'],
      ['sudo setsebool -P httpd_can_network_connect on','Example fix'],
      ['sudo semanage permissive -a httpd_t','Test: only this domain permissive'],
      ['sudo semanage permissive -d httpd_t','Undo the test']],
    flags:[
      ['Works with setenforce 0','→ it IS SELinux; now fix it properly'],
      ['Files moved with mv','→ kept old label; restorecon'],
      ['Service on a non-standard port','→ semanage port -a -t <type>_port_t'],
      ['Container can\'t read mounted folder','→ add :Z to the volume']],
    example:{cmd:'sudo sealert -l "*" | head -8', out:
`SELinux is preventing /usr/sbin/nginx from read access on the file index.html.

*****  Plugin restorecon (99.5 confidence) suggests   ************************

If you want to fix the label.
/srv/www/index.html default label should be httpd_sys_content_t.
Then you can run restorecon.
Do
# /sbin/restorecon -v /srv/www/index.html`},
    warn:'Don\'t leave SELinux disabled to "fix" a problem — it\'s almost always a label or boolean.' })
);
})();

/* ═════════════════ MORE DNF (v2.8) ═════════════════ */
(function () {
const d = window.FB_DATA.find(s => s.id === 'dnf');

// DNF4 → DNF5 cheat-sheet goes first: most online guides still show the old syntax
d.cards.unshift({ title:'DNF4 → DNF5 Cheat-sheet', icon:'🔁', badge:'DNF5', color:'green', tableFirst:true,
  desc:'Fedora 41+ uses DNF5. Many online guides still show DNF4 syntax — here is the translation.',
  table:{mono:true, head:['Old (DNF4)','New (DNF5)'], rows:[
    ['dnf check-update','dnf check-upgrade'],
    ['dnf groupinstall "X"','dnf group install x'],
    ['dnf group list','dnf group list  (same)'],
    ['dnf repolist','dnf repo list'],
    ['dnf config-manager --add-repo URL','dnf config-manager addrepo --from-repofile=URL'],
    ['dnf config-manager --set-enabled R','dnf config-manager setopt R.enabled=1'],
    ['dnf config-manager --set-disabled R','dnf config-manager setopt R.enabled=0'],
    ['dnf updateinfo list','dnf advisory list'],
    ['dnf deplist pkg','dnf repoquery --requires pkg'],
    ['dnf offline-upgrade download','dnf upgrade --offline'],
    ['dnf offline-upgrade reboot','dnf offline reboot'],
    ['dnf-automatic','dnf5-plugin-automatic'],
    ['dnf system-upgrade (plugin)','built in, no plugin needed'],
    ['--nogpgcheck','--no-gpgchecks']]},
  cmds:[
    ['dnf --version','Confirm you\'re on DNF5'],
    ['dnf --help','All commands'],
    ['dnf <command> --help','Options for one command'],
    ['man dnf5',''],
    ['man dnf5.conf','Every config option']],
  example:{cmd:'dnf --version | head -2', out:
`dnf5 version 5.4.5.0
dnf5 plugin API version 2.0`},
  tip:'Copied an old command and got "Unknown argument"? Check this table first.' });

d.cards.push(
  { title:'Advanced Queries (repoquery)', icon:'🔬', badge:'QUERY+', color:'blue',
    cmds:[
      ['dnf repoquery --userinstalled','Packages YOU asked for (not deps)'],
      ['dnf repoquery --unneeded','Deps nothing needs anymore'],
      ['dnf repoquery --duplicates','Multiple versions installed'],
      ['dnf repoquery --installonly','Kernels & other install-only pkgs'],
      ['dnf repoquery --whatprovides "*/libssl.so.3"','Which package provides a library'],
      ['dnf repoquery --whatdepends python3-requests','What needs this package'],
      ['dnf repoquery --location htop','Download URL'],
      ['dnf repoquery --installed --queryformat "%{name}-%{version}\\n"','Custom output'],
      ['rpm -qa --queryformat "%{SIZE} %{NAME}\\n" | sort -n | tail -10','10 largest packages'],
      ['rpm -qa --last | head','Most recently installed'],
      ['dnf repoquery --recent','Recently changed in repos']],
    flags:[
      ['--installed / --available','Where to look'],
      ['--userinstalled','Reason = user'],
      ['--unneeded','Autoremove candidates'],
      ['--whatprovides / --whatrequires / --whatdepends','Reverse lookups'],
      ['--requires / --provides','Forward lookups'],
      ['--queryformat, --qf','Custom template'],
      ['--latest-limit=N','Only newest N versions'],
      ['--arch=x86_64','Filter by arch'],
      ['--querytags','List usable %{tags}']],
    example:{cmd:'rpm -qa --queryformat "%{SIZE} %{NAME}\\n" | sort -n | tail -4 | numfmt --to=iec --field=1', out:
`412M firefox
538M libreoffice-core
804M texlive-base
1.2G kernel-modules-extra`} },

  { title:'Groups & Environments', icon:'🧺', badge:'GROUPS', color:'blue',
    cmds:[
      ['dnf group list','Package groups'],
      ['dnf group list --hidden','Including hidden ones'],
      ['dnf group info development-tools','What\'s inside'],
      ['sudo dnf group install development-tools c-development',''],
      ['sudo dnf group install --with-optional virtualization','Include optional packages'],
      ['sudo dnf group remove development-tools',''],
      ['dnf environment list','Full desktop / server environments'],
      ['sudo dnf install @kde-desktop-environment','Add KDE Plasma alongside GNOME'],
      ['dnf group list --installed','Installed groups']],
    flags:[
      ['@group-id','Group in install/remove commands'],
      ['@env-id','Environment (a set of groups)'],
      ['--with-optional','Also optional packages'],
      ['--no-packages','Mark group installed only'],
      ['--hidden','Show hidden groups'],
      ['--installed / --available','Filter']],
    example:{cmd:'dnf group list --installed', out:
`ID                   Name                       Installed
container-management Container Management             yes
development-tools    Development Tools                yes
multimedia           Multimedia                       yes`} },

  { title:'Security Advisories', icon:'🛡️', badge:'ADVISORY', color:'warn',
    cmds:[
      ['dnf advisory summary','Counts by type'],
      ['dnf advisory list','Pending advisories'],
      ['dnf advisory list --security','Security only'],
      ['dnf advisory list --advisory-severities=critical,important',''],
      ['dnf advisory list --contains-pkgs=openssl','For one package'],
      ['dnf advisory info FEDORA-2026-1a2b3c4d5e','Details, CVEs, bugs'],
      ['sudo dnf upgrade --security','Apply security fixes only'],
      ['sudo dnf upgrade --advisories=FEDORA-2026-1a2b3c4d5e','Apply one advisory'],
      ['dnf advisory list --installed','Already applied']],
    flags:[
      ['--security / --bugfix / --enhancement / --newpackage','By type'],
      ['--advisory-severities=','critical, important, moderate, low'],
      ['--cves=CVE-2026-XXXX','By CVE'],
      ['--bzs=<id>','By Bugzilla ID'],
      ['--contains-pkgs=','Advisories touching a package'],
      ['--all / --installed / --updates','Scope']],
    example:{cmd:'dnf advisory summary', out:
`Available advisory information summary:
Security    : 6
  Critical  : 1
  Important : 2
  Moderate  : 3
  Low       : 0
  Other     : 0
Bugfix      : 23
Enhancement : 9
Other       : 1`} },

  { title:'Versions & Downgrades', icon:'⏬', badge:'VERSION', color:'warn',
    cmds:[
      ['dnf list --showduplicates firefox','Every available version'],
      ['sudo dnf downgrade firefox','Previous version in repos'],
      ['sudo dnf install firefox-142.0.1-1.fc44','Specific version'],
      ['sudo dnf versionlock add firefox','Stop it upgrading again'],
      ['sudo dnf install koji && koji download-build --arch=x86_64 firefox-142.0.1-1.fc44','Older builds from Fedora\'s build system'],
      ['sudo dnf install ./firefox-142.0.1-1.fc44.x86_64.rpm','Install the downloaded RPM'],
      ['sudo dnf distro-sync firefox','Back to the repo version later']],
    flags:[
      ['--showduplicates','List all versions'],
      ['downgrade <pkg>','One step back'],
      ['name-version-release','Pin an exact build'],
      ['--allowerasing','If deps must change too'],
      ['distro-sync','Match repo version (up or down)']],
    example:{cmd:'dnf list --showduplicates firefox', out:
`Installed packages
firefox.x86_64   143.0.1-1.fc44   <unknown>

Available packages
firefox.x86_64   141.0-2.fc44     fedora
firefox.x86_64   143.0.1-1.fc44   updates`},
    tip:'Fedora repos usually keep only the release version and the latest update — koji has everything in between.' },

  { title:'Testing Updates (updates-testing)', icon:'🧪', badge:'TESTING', color:'blue',
    cmds:[
      ['dnf repo list --all | grep testing','Testing repos (disabled by default)'],
      ['sudo dnf upgrade --enablerepo=updates-testing --refresh firefox','Try one package early'],
      ['sudo dnf upgrade --enablerepo=updates-testing --advisory=FEDORA-2026-1a2b3c4d5e','A specific update'],
      ['sudo dnf install bodhi-client',''],
      ['bodhi updates query --packages firefox --releases F44','Update status + karma'],
      ['sudo dnf install fedora-easy-karma && fedora-easy-karma','Give feedback on what you tested']],
    flags:[
      ['--enablerepo=updates-testing','Temporary, one command'],
      ['--refresh','Fetch fresh metadata'],
      ['bodhi updates query --status testing','Pending updates'],
      ['bodhi updates comment <id> "…" 1','Karma +1']],
    example:{cmd:'bodhi updates query --packages firefox --releases F44 --rows 2', out:
`FEDORA-2026-7c1e0b3a9d  firefox-143.0.2-1.fc44     testing   2026-09-29 (1)   +2 karma
FEDORA-2026-5b9d2e4c1f  firefox-143.0.1-1.fc44     stable    2026-09-24 (6)   +4 karma`},
    warn:'Testing updates can break things. Enable the repo per command rather than permanently.' },

  { title:'Configure DNF (dnf.conf)', icon:'🛠️', badge:'CONFIG', color:'blue',
    code:
`# /etc/dnf/dnf.conf
[main]
max_parallel_downloads=10
installonly_limit=3
defaultyes=True
keepcache=False
skip_if_unavailable=False
# install_weak_deps=False   # uncomment to skip "Recommends"`,
    cmds:[
      ['sudoedit /etc/dnf/dnf.conf',''],
      ['sudo dnf config-manager setopt max_parallel_downloads=10','Same, without an editor'],
      ['sudo dnf config-manager setopt defaultyes=True','Enter = yes'],
      ['sudo dnf config-manager unsetopt defaultyes','Back to default'],
      ['dnf --dump-main-config | grep -E "parallel|installonly|weak"','Effective values'],
      ['dnf --dump-repo-config=fedora | head','One repo\'s settings'],
      ['sudo dnf --setopt=install_weak_deps=False install pkg','One-off override']],
    flags:[
      ['max_parallel_downloads','1–20, default 3'],
      ['installonly_limit','Kernels to keep, default 3'],
      ['defaultyes','Default answer Y'],
      ['install_weak_deps','Install "Recommends" (default True)'],
      ['keepcache','Keep downloaded RPMs'],
      ['excludepkgs=pkg*','Never install/upgrade these'],
      ['--setopt=key=val','Per-command override']],
    example:{cmd:'dnf --dump-main-config | grep -E "max_parallel|installonly_limit|defaultyes"', out:
`defaultyes = 1
installonly_limit = 3
max_parallel_downloads = 10`} },

  { title:'Automatic & Offline Updates', icon:'🤖', badge:'AUTO', color:'green',
    cmds:[
      ['sudo dnf upgrade --offline','Download + stage update for next boot'],
      ['dnf offline status','Is something staged?'],
      ['sudo dnf offline reboot','Reboot and apply it'],
      ['sudo dnf offline clean','Discard a staged update'],
      ['sudo dnf install dnf5-plugin-automatic','Unattended updates'],
      ['sudoedit /etc/dnf/automatic.conf','apply_updates, reboot, emit_via…'],
      ['sudo systemctl enable --now dnf5-automatic.timer',''],
      ['systemctl list-timers dnf5-automatic.timer','Next run']],
    flags:[
      ['--offline','Stage transaction for next boot'],
      ['offline reboot / status / clean / log','Manage it'],
      ['upgrade_type = security','automatic: only security'],
      ['apply_updates = yes','automatic: install, not just download'],
      ['reboot = when-needed','automatic: reboot if required']],
    example:{cmd:'dnf offline status', out:
`An offline transaction was initiated by the following command:
	dnf upgrade --offline
Run \`dnf5 offline reboot\` to reboot and perform the offline transaction.`},
    tip:'Offline updates are what GNOME Software uses — nothing is replaced while apps are running.' },

  { title:'Local Repos & Signing Keys', icon:'🔑', badge:'REPO+', color:'warn',
    cmds:[
      ['sudo dnf install createrepo_c',''],
      ['mkdir -p ~/myrepo && cp *.rpm ~/myrepo/ && createrepo_c ~/myrepo','Make a repo from RPMs'],
      ['dnf --repofrompath=myrepo,$HOME/myrepo --repo=myrepo list --available','Use it without a .repo file'],
      ['sudo dnf config-manager addrepo --id=myrepo --set=baseurl=file://$HOME/myrepo --set=gpgcheck=0','…or add it permanently'],
      ['rpmkeys --list','Trusted signing keys (rpm 4.20+ / 6)'],
      ['sudo rpmkeys --import https://example.com/RPM-GPG-KEY','Trust a vendor key'],
      ['rpmkeys --checksig package.rpm','Verify a downloaded RPM'],
      ['ls /etc/pki/rpm-gpg/','Fedora\'s shipped keys']],
    flags:[
      ['createrepo_c --update','Refresh existing repo quickly'],
      ['--repofrompath=id,path','Temporary repo'],
      ['--repo=<id>','Use only that repo'],
      ['gpgcheck=0','Skip signatures (local repos only!)'],
      ['rpmkeys --checksig','Digest + signature check']],
    example:{cmd:'rpmkeys --checksig google-chrome-stable.rpm', out:`google-chrome-stable.rpm: digests signatures OK`},
    danger:'Only import signing keys from vendors you trust — a key lets them ship anything as a trusted update.' }
);
})();

/* ═════════════════ MORE FILES (v2.9) ═════════════════ */
(function () {
const f = window.FB_DATA.find(s => s.id === 'files');
f.cards.push(
  { title:'Links: Soft vs Hard', icon:'🔗', badge:'LINKS', color:'blue', tableFirst:true,
    table:{head:['','Symbolic (soft) link','Hard link'], rows:[
      ['Create','ln -s target link','ln target link'],
      ['Points to','A path (name)','The same data (inode)'],
      ['Target deleted','Link breaks','Data survives'],
      ['Across filesystems','Yes','No'],
      ['To directories','Yes','No']]},
    cmds:[
      ['ln -s ~/Projects/site ~/Desktop/site','Shortcut to a folder'],
      ['ln -sfn /opt/app-2.1 /opt/app','Repoint an existing link'],
      ['readlink -f ~/Desktop/site','Final target'],
      ['ls -l ~/Desktop','Links show as name -> target'],
      ['ls -li file.txt hard.txt','Same inode number = hard links'],
      ['find ~ -xtype l','Broken symlinks'],
      ['find ~ -xtype l -delete','Remove broken symlinks'],
      ['unlink ~/Desktop/site','Remove a link (not the target)']],
    flags:[
      ['ln -s','Symbolic'],
      ['ln -f','Replace existing'],
      ['ln -n','Treat link-to-dir as a file (use with -f)'],
      ['ln -r','Relative link'],
      ['readlink -f','Resolve fully'],
      ['find -type l / -xtype l','Links / broken links']],
    example:{cmd:'ls -l /usr/bin/python3 && readlink -f /usr/bin/python3', out:
`lrwxrwxrwx. 1 root root 10 Aug 12 00:00 /usr/bin/python3 -> python3.14
/usr/bin/python3.14`},
    warn:'<code>rm -r link/</code> (with a trailing slash) can delete the <b>target\'s</b> contents. Use <code>unlink link</code>.' },

  { title:'Special Permissions & umask', icon:'🎖️', badge:'SUID', color:'warn', tableFirst:true,
    table:{head:['Bit','Octal','On a file','On a directory'], rows:[
      ['setuid (s)','4000','Runs as file owner (e.g. passwd)','—'],
      ['setgid (s)','2000','Runs as file group','New files inherit the group'],
      ['sticky (t)','1000','—','Only owners can delete (e.g. /tmp)']]},
    cmds:[
      ['ls -ld /tmp /usr/bin/passwd','See t and s bits'],
      ['sudo chmod 2775 /srv/shared','Shared team folder (group inherits)'],
      ['sudo chmod +t /srv/dropbox','Sticky: users can\'t delete others\' files'],
      ['sudo find / -xdev -perm -4000 -type f 2>/dev/null','Audit setuid programs'],
      ['umask','Default permission mask'],
      ['umask 027','New files 640, dirs 750 (this shell)'],
      ['echo "umask 027" >> ~/.bashrc.d/umask.sh','Make it permanent']],
    flags:[
      ['chmod u+s / g+s / +t','Symbolic form'],
      ['chmod 4755 / 2775 / 1777','Octal form (leading digit)'],
      ['umask 022','Default: files 644, dirs 755'],
      ['umask 077','Private: files 600, dirs 700'],
      ['find -perm -4000','Has setuid']],
    example:{cmd:'ls -ld /tmp /usr/bin/passwd', out:
`drwxrwxrwt. 18 root root   420 Sep 30 01:05 /tmp
-rwsr-xr-x.  1 root root 32712 Jul 22 00:00 /usr/bin/passwd`} },

  { title:'ACLs (Fine-grained Access)', icon:'🎟️', badge:'ACL', color:'blue',
    cmds:[
      ['getfacl report.pdf','Show ACLs'],
      ['setfacl -m u:alice:rw report.pdf','Give one user read/write'],
      ['setfacl -m g:devs:rx /srv/app','Give a group access'],
      ['setfacl -R -m u:alice:rwX /srv/project','Recursive (X = dirs only)'],
      ['setfacl -d -m g:devs:rwX /srv/project','Default for NEW files'],
      ['setfacl -x u:alice report.pdf','Remove one entry'],
      ['setfacl -b report.pdf','Remove all ACLs'],
      ['getfacl -R /srv/project > acl-backup.txt','Back up ACLs'],
      ['setfacl --restore=acl-backup.txt','Restore them']],
    flags:[
      ['-m','Modify / add entry'],
      ['-x','Remove entry'],
      ['-b','Remove all'],
      ['-d','Default (inherited) ACL'],
      ['-R','Recursive'],
      ['X','Execute only on dirs / already-executable'],
      ['+ at end of ls -l','File has an ACL']],
    example:{cmd:'getfacl report.pdf', out:
`# file: report.pdf
# owner: sooraj
# group: sooraj
user::rw-
user:alice:rw-
group::r--
mask::rw-
other::r--`} },

  { title:'find: Advanced', icon:'🧭', badge:'FIND+', color:'blue',
    cmds:[
      ['find . -type f -mmin -30','Changed in last 30 minutes'],
      ['find . -newer reference.txt','Newer than a file'],
      ['find . -type f -empty','Empty files'],
      ['find . -type d -empty -delete','Remove empty folders'],
      ['find ~/Downloads -type f -mtime +90 -print','Older than 90 days'],
      ['find . -name node_modules -prune -o -name "*.js" -print','Skip a folder'],
      ['find . -type f -exec sha256sum {} \;','Run once per file'],
      ['find . -type f -exec grep -l "TODO" {} +','Batch many files per call'],
      ['find . -type f -name "*.log" -size +50M -exec ls -lh {} +',''],
      ['find /srv -user alice -not -group devs','Combine conditions']],
    flags:[
      ['-mmin / -mtime ±N','Minutes / days (− within, + older)'],
      ['-newer <file>','Modified after file'],
      ['-empty','Zero size / no entries'],
      ['-prune','Don\'t descend'],
      ['-not / ! / -o','Negate / OR'],
      ['-exec … \;','One call per file'],
      ['-exec … {} +','Many files per call (faster)'],
      ['-ok … \;','Ask before each'],
      ['-print0','NUL separated, for xargs -0']],
    example:{cmd:'find ~/Downloads -type f -mtime +90 | head -3', out:
`/home/sooraj/Downloads/old-installer.rpm
/home/sooraj/Downloads/invoice-2026-03.pdf
/home/sooraj/Downloads/Fedora-Workstation-Live-42.iso`},
    tip:'Put <code>-delete</code> last and run the same command without it first to preview.' },

  { title:'Modern File Tools', icon:'✨', badge:'MODERN', color:'green',
    cmds:[
      ['sudo dnf install fd-find ripgrep bat eza fzf zoxide',''],
      ['fd invoice','Fast, friendly find (respects .gitignore)'],
      ['fd -e pdf -x ls -lh','Find by extension + run a command'],
      ['rg "TODO" ~/project','Very fast recursive grep'],
      ['rg -i -t py "import requests"','By file type, ignore case'],
      ['bat script.sh','cat with syntax colours + line numbers'],
      ['eza -la --git --icons','ls with git status'],
      ['eza --tree --level=2','Tree view'],
      ['vim $(fzf)','Fuzzy-pick a file to open'],
      ['eval "$(zoxide init bash)" && z proj','Jump to frequent dirs']],
    flags:[
      ['fd -H / -I','Include hidden / ignored'],
      ['fd -t f|d','Files / dirs'],
      ['rg -l / -c','Filenames / counts'],
      ['rg -w','Whole word'],
      ['rg --hidden','Search dotfiles'],
      ['bat -p','Plain (no decorations)'],
      ['Ctrl+R with fzf','Fuzzy history search']],
    example:{cmd:'rg -n "TODO" src/', out:
`src/app.js
42:// TODO: handle offline mode
118:  // TODO: debounce search

src/sw.js
7:// TODO: precache fonts`} },

  { title:'sed & awk Recipes', icon:'🪄', badge:'SED/AWK', color:'blue',
    cmds:[
      ["sed -n '10,20p' file.txt",'Print lines 10–20'],
      ["sed '/^#/d; /^$/d' config.conf",'Drop comments + blank lines'],
      ["sed -i.bak 's/http:/https:/g' links.txt",'In-place, keep a .bak'],
      ["sed -i '3i\\new line three' file.txt",'Insert at line 3'],
      ["sed -E 's/([0-9]{4})-([0-9]{2})/\\2\\/\\1/' dates.txt",'Regex groups'],
      ["awk '{sum += $2} END {print sum}' sales.txt",'Sum a column'],
      ["awk -F, 'NR>1 && $3 > 100 {print $1}' data.csv",'Filter CSV rows'],
      ["awk '{print NR\": \"$0}' file.txt",'Number lines'],
      ["awk '!seen[$0]++' file.txt",'Remove duplicates, keep order'],
      ["awk 'length > 80' file.txt",'Lines longer than 80']],
    flags:[
      ['sed -n + p','Print only selected'],
      ['sed -i[.bak]','In place (with backup)'],
      ['sed -E','Extended regex'],
      ['s/a/b/g','Substitute globally'],
      ['awk -F<sep>','Field separator'],
      ['$1 $NF NR NF','First field, last field, line no., field count'],
      ['BEGIN{} / END{}','Before / after all lines']],
    example:{cmd:"printf 'apples 12\\npears 7\\nplums 5\\n' | awk '{sum+=$2} END {print \"total:\", sum}'", out:`total: 24`} },

  { title:'Compare & Find Duplicates', icon:'⚖️', badge:'DIFF', color:'blue',
    cmds:[
      ['diff -u old.conf new.conf','Unified diff'],
      ['diff -y --suppress-common-lines a.txt b.txt','Side by side, only differences'],
      ['diff -rq dirA/ dirB/','Which files differ between folders'],
      ['cmp a.bin b.bin','Binary compare'],
      ['sha256sum a.iso b.iso','Same checksum = identical'],
      ['vimdiff a.txt b.txt','Interactive diff in vim'],
      ['sudo dnf install meld && meld dirA dirB','Graphical diff'],
      ['sudo dnf install fdupes && fdupes -r ~/Pictures','Duplicate files'],
      ['fdupes -rS ~/Pictures | head','…with sizes']],
    flags:[
      ['diff -u','Unified format (patch-ready)'],
      ['diff -r','Recursive'],
      ['diff -q','Only say if they differ'],
      ['diff -w / -B','Ignore whitespace / blank lines'],
      ['fdupes -r','Recursive'],
      ['fdupes -d','Prompt to delete (careful)']],
    example:{cmd:'diff -rq site-v1/ site-v2/', out:
`Files site-v1/index.html and site-v2/index.html differ
Only in site-v2/css: dark.css
Only in site-v1: old-logo.png`} },

  { title:'Encoding, Line Endings & Hex', icon:'🔣', badge:'BYTES', color:'blue',
    cmds:[
      ['file -i notes.txt','Charset'],
      ['iconv -f WINDOWS-1256 -t UTF-8 old.txt > new.txt','Convert encoding (e.g. Arabic Windows)'],
      ['sudo dnf install dos2unix && dos2unix script.sh','Fix Windows line endings (^M)'],
      ['unix2dos notes.txt','The other way'],
      ['xxd file.bin | head','Hex dump'],
      ['hexdump -C file.bin | head','Hex + ASCII'],
      ['base64 photo.jpg > photo.b64','Encode'],
      ['base64 -d photo.b64 > photo.jpg','Decode'],
      ['strings program | grep -i version','Readable text inside a binary']],
    flags:[
      ['file -i','MIME + charset'],
      ['iconv -l','All encodings'],
      ['iconv -c','Drop characters that can\'t convert'],
      ['xxd -r','Hex back to binary'],
      ['base64 -w0','No line wrapping']],
    example:{cmd:'file -i script.sh && cat -A script.sh | head -2', out:
`script.sh: text/x-shellscript; charset=us-ascii
#!/bin/bash^M$
echo "hello"^M$`},
    tip:'<code>^M$</code> at line ends means Windows CRLF — the cause of "bad interpreter: /bin/bash^M". Run <code>dos2unix</code>.' },

  { title:'Trash, Shred & Recovery', icon:'♻️', badge:'TRASH', color:'warn',
    cmds:[
      ['gio trash report.pdf','Move to Trash'],
      ['gio trash --list','What\'s in Trash'],
      ['gio trash --restore trash:///report.pdf','Restore'],
      ['gio trash --empty','Empty Trash'],
      ['shred -u -n 3 secret.txt','Overwrite then delete'],
      ['sudo dnf install testdisk','Recovery tools'],
      ['sudo photorec','Recover deleted photos/files (run on a DIFFERENT output disk)'],
      ['sudo testdisk','Recover lost partitions']],
    flags:[
      ['shred -u','Remove after overwriting'],
      ['shred -n N','Overwrite passes'],
      ['shred -z','Final pass with zeros'],
      ['gio trash --restore','Needs the trash:// URI from --list']],
    example:{cmd:'gio trash --list', out:
`trash:///report.pdf	/home/sooraj/Documents/report.pdf
trash:///old-notes.txt	/home/sooraj/old-notes.txt`},
    warn:'<code>shred</code> is not reliable on SSDs or Btrfs (copy-on-write). For those, use full-disk encryption (LUKS).' },

  { title:'Watch Files for Changes', icon:'👀', badge:'WATCH', color:'green',
    cmds:[
      ['sudo dnf install inotify-tools entr',''],
      ['inotifywait -m -r ~/Downloads','Print every change live'],
      ['inotifywait -m -e close_write --format "%w%f" ~/in | while read f; do echo "new: $f"; done','React to new files'],
      ['ls *.py | entr -c python3 main.py','Re-run when a file changes'],
      ['find src -name "*.c" | entr -s "make && ./app"','Rebuild on save'],
      ['watch -n 1 ls -l','Poor man\'s version'],
      ['tail -F /var/log/nginx/access.log','Follow a log across rotation']],
    flags:[
      ['inotifywait -m','Monitor forever'],
      ['-r','Recursive'],
      ['-e create,modify,delete,close_write','Events to watch'],
      ['--format "%w%f %e"','Path + event'],
      ['entr -c','Clear screen each run'],
      ['entr -r','Restart a long-running process']],
    example:{cmd:'inotifywait -m ~/Downloads', out:
`Setting up watches.
Watches established.
/home/sooraj/Downloads/ CREATE report.pdf.part
/home/sooraj/Downloads/ MOVED_FROM report.pdf.part
/home/sooraj/Downloads/ MOVED_TO report.pdf`} }
);
})();

/* ═════════════════ MORE FILES (v2.10) ═════════════════ */
(function () {
const f = window.FB_DATA.find(s => s.id === 'files');
f.cards.push(
  { title:'Copy & Move Like a Pro', icon:'🚚', badge:'CP+', color:'green',
    cmds:[
      ['cp -i notes.txt backup/','Ask before overwriting'],
      ['cp --backup=numbered notes.txt backup/','Keep old copies as notes.txt.~1~'],
      ['cp -u *.txt backup/','Only newer files'],
      ['cp --reflink=always vm.qcow2 vm-copy.qcow2','Instant copy on Btrfs (shares blocks)'],
      ['cp -al photos/ photos-snapshot/','Hard-link "copy" (no extra space)'],
      ['cp -a --parents src/app/main.c /tmp/out/','Keep the folder path'],
      ['mv -n *.jpg Pictures/','Never overwrite'],
      ['mv -t Archive/ *.pdf *.docx','Target first (handy with xargs)'],
      ['install -D -m 755 app ~/.local/bin/app','Copy + create dirs + set mode'],
      ['rsync -ah --info=progress2 bigdir/ /run/media/$USER/USB/bigdir/','Local copy with progress + resume']],
    flags:[
      ['-i / -n','Prompt / never overwrite'],
      ['-u','Update: only if newer'],
      ['-b / --backup=numbered','Keep a backup of the replaced file'],
      ['--reflink=auto|always','Copy-on-write clone (Btrfs, XFS)'],
      ['-l','Hard links instead of copies'],
      ['--parents','Recreate source path under dest'],
      ['-t <dir>','Destination first'],
      ['-v','Show each file']],
    example:{cmd:'time cp --reflink=always fedora.qcow2 fedora-clone.qcow2', out:
`real	0m0.041s
user	0m0.001s
sys	0m0.012s`},
    tip:'Fedora\'s default Btrfs makes <code>--reflink</code> copies of huge files instant. Recent coreutils already try it automatically.' },

  { title:'Writing Files as Root & Here-docs', icon:'✍️', badge:'WRITE', color:'warn',
    cmds:[
      ['echo "127.0.0.1 dev.local" | sudo tee -a /etc/hosts','Append as root (sudo echo >> fails!)'],
      ['echo "vm.swappiness=10" | sudo tee /etc/sysctl.d/99-swap.conf >/dev/null','Overwrite as root, quietly'],
      ['sudoedit /etc/hosts','Edit a root file safely'],
      ["cat > hello.sh <<'EOF'\n#!/bin/bash\necho \"Hello $USER\"\nEOF",'Multi-line file (literal, no expansion)'],
      ['cat > info.txt <<EOF\nUser: $USER\nDate: $(date +%F)\nEOF','Here-doc WITH variable expansion'],
      ["sudo tee /etc/profile.d/editor.sh >/dev/null <<'EOF'\nexport EDITOR=vim\nEOF",'Multi-line root file'],
      ['printf "%s\\n" alpha beta gamma > list.txt','One item per line'],
      [': > app.log','Empty a file (same as truncate -s 0)']],
    flags:[
      ['sudo tee <file>','Write stdin to a root-owned file'],
      ['tee -a','Append instead of overwrite'],
      ['<<EOF','Here-doc, expands $vars'],
      ["<<'EOF'",'Here-doc, literal'],
      ['<<-EOF','Strip leading tabs'],
      ['>/dev/null','Hide tee\'s echo']],
    example:{cmd:'echo "127.0.0.1 dev.local" | sudo tee -a /etc/hosts', out:`127.0.0.1 dev.local`},
    tip:'<code>sudo echo x &gt; /etc/file</code> fails because the redirect runs as <i>you</i>, not root — that\'s why <code>tee</code> exists.' },

  { title:'Paths & File Names', icon:'🛤️', badge:'PATHS', color:'blue',
    cmds:[
      ['basename /home/sooraj/docs/report.pdf','report.pdf'],
      ['basename /home/sooraj/docs/report.pdf .pdf','report'],
      ['dirname /home/sooraj/docs/report.pdf','/home/sooraj/docs'],
      ['realpath ../docs/report.pdf','Absolute path'],
      ['realpath --relative-to=/home/sooraj /home/sooraj/docs/a.txt','docs/a.txt'],
      ['f=archive.tar.gz; echo "${f%%.*} ${f#*.} ${f##*.}"','Name / all ext / last ext'],
      ['for f in *.JPG; do mv -- "$f" "${f%.JPG}.jpg"; done','Change extension in bulk'],
      ['for f in *\\ *; do mv -- "$f" "${f// /_}"; done','Spaces → underscores'],
      ['pwd -P','Real path (resolve symlinks)']],
    flags:[
      ['basename <path> [suffix]','Strip directory (+ suffix)'],
      ['dirname','Strip last component'],
      ['realpath -e','Must exist'],
      ['${f%.*}','Drop last extension'],
      ['${f##*/}','Same as basename'],
      ['${f%/*}','Same as dirname'],
      ['--','End of options (safe for names starting with -)']],
    example:{cmd:'f=/home/sooraj/backup-2026.tar.gz; echo "${f##*/} | ${f%/*} | ${f##*.}"', out:`backup-2026.tar.gz | /home/sooraj | gz`} },

  { title:'Counting & Sizes', icon:'🧮', badge:'COUNT', color:'blue',
    cmds:[
      ['ls | wc -l','Items in this folder'],
      ['find . -type f | wc -l','Files, recursively'],
      ['find . -type d | wc -l','Folders, recursively'],
      ['du -sh ~/Videos','Folder size'],
      ['du -ah ~/Downloads | sort -h | tail -10','10 biggest items'],
      ['stat -c "%s" file.iso | numfmt --to=iec','One file, human size'],
      ['du --apparent-size -sh vm.qcow2 && du -sh vm.qcow2','Logical vs real (sparse/compressed)'],
      ['find . -name "*.py" -exec cat {} + | wc -l','Lines of code'],
      ['sudo compsize /home','Btrfs: size after compression (compsize pkg)']],
    flags:[
      ['wc -l / -w / -c','Lines / words / bytes'],
      ['du -s / -h / -a','Summary / human / all files'],
      ['du --apparent-size','Size as programs see it'],
      ['sort -h','Human-readable sort'],
      ['numfmt --to=iec','Bytes → K/M/G']],
    example:{cmd:'du -ah ~/Downloads | sort -h | tail -3', out:
`1.4G	/home/sooraj/Downloads/Fedora-Workstation-Live-44.iso
2.1G	/home/sooraj/Downloads/project-assets.zip
4.0G	/home/sooraj/Downloads`} },

  { title:'Timestamps', icon:'🕰️', badge:'TIME', color:'blue',
    cmds:[
      ['stat notes.txt','Access, modify, change, birth times'],
      ['ls -l --time-style=long-iso','Precise dates in listings'],
      ['ls -lt --time=birth','Sort by creation time'],
      ['touch -r original.jpg copy.jpg','Copy timestamps from another file'],
      ['touch -d "2026-09-01 09:00" report.pdf','Set a specific time'],
      ['find . -newermt "2026-09-01" ! -newermt "2026-09-15"','Modified in a date range'],
      ['date -r notes.txt','When a file was last modified'],
      ['cp -p file backup/','Copy keeping timestamps']],
    table:{head:['Time','Changes when…'], rows:[
      ['mtime (modify)','Content changes'],
      ['ctime (change)','Content OR permissions/owner change'],
      ['atime (access)','File is read (Fedora: relatime, updated rarely)'],
      ['btime (birth)','File is created (Btrfs, ext4, XFS)']]},
    flags:[
      ['touch -d "<date>"','Set time'],
      ['touch -r <ref>','Copy time'],
      ['touch -m / -a','Only mtime / atime'],
      ['find -newermt <date>','Modified after date'],
      ['ls -lu / -lc','Show atime / ctime']],
    example:{cmd:'stat -c "%n | modified %y | born %w" notes.txt', out:`notes.txt | modified 2026-09-30 00:58:12.412 +0300 | born 2026-09-12 18:04:51.007 +0300`} },

  { title:'Disk Images & ISOs', icon:'💿', badge:'ISO', color:'red',
    cmds:[
      ['udisksctl loop-setup -f image.iso','Mount an ISO (no sudo) → appears in Files'],
      ['sudo mount -o loop,ro image.iso /mnt/iso','Classic loop mount'],
      ['sudo umount /mnt/iso',''],
      ['truncate -s 1G disk.img','Empty 1 GB image (sparse)'],
      ['mkfs.ext4 disk.img && udisksctl loop-setup -f disk.img','Filesystem inside a file'],
      ['sudo dd if=/dev/sdb of=usb-backup.img bs=4M status=progress','Image a whole USB stick'],
      ['sudo dd if=Fedora.iso of=/dev/sdX bs=4M status=progress oflag=sync','Write an ISO to USB'],
      ['flatpak install flathub org.fedoraproject.MediaWriter','Safer GUI for writing USBs'],
      ['sha256sum -c *CHECKSUM --ignore-missing','Verify before writing']],
    flags:[
      ['dd if= / of=','Input / output (read it twice!)'],
      ['bs=4M','Block size (speed)'],
      ['status=progress','Show progress'],
      ['oflag=sync','Flush as it writes'],
      ['-o loop,ro','Mount a file read-only'],
      ['losetup -a','Active loop devices']],
    example:{cmd:'udisksctl loop-setup -f Fedora-Server-44.iso', out:`Mapped file Fedora-Server-44.iso as /dev/loop0.`},
    danger:'<code>dd of=/dev/sdX</code> with the wrong letter erases that disk instantly. Check <code>lsblk</code> twice.' },

  { title:'"Target is busy" — Who Uses This File?', icon:'🔒', badge:'BUSY', color:'warn',
    cmds:[
      ['lsof /run/media/$USER/USB','Processes using the drive'],
      ['fuser -vm /run/media/$USER/USB','Same, shorter'],
      ['lsof ~/Documents/report.docx','Who has a file open'],
      ['lsof +D ~/project','Everything open under a folder (slow)'],
      ['fuser -km /mnt/usb','Kill everything using it (careful)'],
      ['sudo umount -l /mnt/usb','Lazy unmount: detach when free'],
      ['lsof -p 4410','Files one process has open']],
    flags:[
      ['lsof <path>','Users of a file / mount'],
      ['lsof +D <dir>','Recursive'],
      ['lsof -u <user>','Files a user has open'],
      ['fuser -v','Verbose'],
      ['fuser -m','Whole mount'],
      ['fuser -k','Kill them']],
    example:{cmd:'fuser -vm /run/media/sooraj/USB', out:
`                     USER        PID ACCESS COMMAND
/run/media/sooraj/USB:
                     root     kernel mount /run/media/sooraj/USB
                     sooraj     5120 ..c.. bash
                     sooraj     6644 f.... vlc`},
    tip:'A terminal whose current folder is on the drive counts as "using" it — <code>cd ~</code> there first.' },

  { title:'More Archive Formats', icon:'🗃️', badge:'7Z', color:'blue',
    cmds:[
      ['sudo dnf install 7zip unar','7-Zip + universal extractor'],
      ['7z a backup.7z Documents/','Create .7z'],
      ['7z x backup.7z','Extract .7z (keeps folders)'],
      ['7z a -p -mhe=on secret.7z private/','Encrypted, file names hidden too'],
      ['unar archive.rar','Extract RAR (and most other formats)'],
      ['lsar archive.rar','List contents'],
      ['zip -er private.zip folder/','Password-protected zip'],
      ['tar --zstd -cf backup.tar.zst Documents/','Fast modern compression'],
      ['tar -xf backup.tar.gz path/in/archive.txt','Extract a single file'],
      ['tar -czf site.tgz --exclude="*.log" --exclude=node_modules site/','Exclude patterns'],
      ['tar --selinux --acls --xattrs -cpf etc.tar /etc','Keep SELinux labels + ACLs']],
    flags:[
      ['7z a / x / l / t','Add / extract / list / test'],
      ['-p','Prompt for password'],
      ['-mhe=on','Encrypt file names (7z)'],
      ['-mx=9','Maximum compression'],
      ['tar --zstd / -J / -z','zstd / xz / gzip'],
      ['tar --exclude=<pat>','Skip matches'],
      ['tar -p','Preserve permissions']],
    example:{cmd:'7z l backup.7z | tail -4', out:
`------------------- ----- ------------ ------------  ------------------------
2026-09-30 01:08:40         52428800     11862016  214 files, 12 folders`},
    warn:'Zip\'s built-in encryption is weak. For secrets use <code>7z -p -mhe=on</code> or <code>gpg -c</code>.' },

  { title:'Sort, Unique & Join Data', icon:'🔢', badge:'SORT', color:'blue',
    cmds:[
      ['sort names.txt','Alphabetical'],
      ['sort -n numbers.txt','Numeric'],
      ['sort -rh sizes.txt','Human sizes, largest first'],
      ['sort -t, -k3,3n data.csv','CSV by 3rd column, numeric'],
      ['sort -u emails.txt','Sort + remove duplicates'],
      ['sort list.txt | uniq -d','Only lines that appear more than once'],
      ['sort list.txt | uniq -c | sort -rn | head','Most frequent lines'],
      ['join -t, <(sort ids.csv) <(sort names.csv)','Merge two files on a key'],
      ['shuf names.txt | head -3','Random pick'],
      ['sort -V versions.txt','Version order (1.9 < 1.10)']],
    flags:[
      ['-n / -h / -V','Numeric / human / version'],
      ['-r','Reverse'],
      ['-u','Unique'],
      ['-t <sep> -k N,N','Field separator + key'],
      ['-f','Ignore case'],
      ['uniq -c / -d / -u','Count / dupes only / uniques only']],
    example:{cmd:'printf "1.10\\n1.9\\n1.2\\n" | sort -V', out:
`1.2
1.9
1.10`} },

  { title:'Extended Attributes & Sparse Files', icon:'🏷️', badge:'XATTR', color:'blue',
    cmds:[
      ['getfattr -d -m - file.txt','All extended attributes (incl. SELinux)'],
      ['setfattr -n user.comment -v "reviewed" file.txt','Add your own tag'],
      ['getfattr -n user.comment file.txt',''],
      ['setfattr -x user.comment file.txt','Remove it'],
      ['fallocate -l 2G big.dat','Instantly reserve 2 GB'],
      ['truncate -s 10G sparse.img','10 GB file using ~0 bytes'],
      ['du -h sparse.img; ls -lh sparse.img','Real vs apparent size'],
      ['cp --sparse=always in.img out.img','Keep holes when copying'],
      ['sudo chattr +C ~/vms','Btrfs: disable copy-on-write for VM images (empty dir)']],
    flags:[
      ['getfattr -d -m -','Dump every namespace'],
      ['user.* / security.*','Namespaces (security.selinux = label)'],
      ['fallocate -l','Allocate real blocks'],
      ['truncate -s','Set size (sparse)'],
      ['chattr +C','No-COW (Btrfs), set on empty dir']],
    example:{cmd:'truncate -s 10G sparse.img && ls -lh sparse.img && du -h sparse.img', out:
`-rw-r--r--. 1 sooraj sooraj 10G Sep 30 01:09 sparse.img
0	sparse.img`} }
);
})();

/* ═════════════════ MORE USERS (v2.11) ═════════════════ */
(function () {
const u = window.FB_DATA.find(s => s.id === 'users');
u.cards.push(
  { title:'Who\'s Logged In & Login History', icon:'👀', badge:'WHO', color:'blue',
    cmds:[
      ['who','Logged-in users + terminals'],
      ['w','…plus what they\'re running and idle time'],
      ['users','Just names'],
      ['loginctl list-users','systemd view'],
      ['loginctl list-sessions','Every session (TTY, SSH, GUI)'],
      ['last -n 10','Recent logins'],
      ['last alice','One user\'s history'],
      ['last reboot | head -5','Reboot history'],
      ['sudo lastb | head','Failed login attempts'],
      ['lastlog2','Last login of every account'],
      ['journalctl _COMM=sshd -g "Accepted" --since today','Today\'s SSH logins']],
    flags:[
      ['who -a','Everything who knows'],
      ['w -h','No header'],
      ['last -F','Full dates'],
      ['last -x','Include shutdowns/runlevel changes'],
      ['last -s yesterday','Since a time'],
      ['lastlog2 -u <user>','One account']],
    example:{cmd:'w', out:
` 01:12:40 up 15:44,  2 users,  load average: 0.31, 0.29, 0.27
USER     TTY      LOGIN@   IDLE   JCPU   PCPU  WHAT
sooraj   tty2     09:28    15:44m  0.04s  0.04s /usr/libexec/gnome-session-binary
alice    pts/1    00:51     2:10   0.12s  0.02s vim notes.txt`} },

  { title:'Account Files Explained', icon:'📜', badge:'FILES', color:'blue', tableFirst:true,
    table:{head:['/etc/passwd field','Example: alice:x:1001:1001:Alice:/home/alice:/bin/bash'], rows:[
      ['1 name','alice'],['2 password','x = stored in /etc/shadow'],['3 UID','1001 (1000+ = normal users)'],
      ['4 GID','1001 (primary group)'],['5 comment (GECOS)','Alice — full name'],
      ['6 home','/home/alice'],['7 shell','/bin/bash (/sbin/nologin = no login)']]},
    cmds:[
      ['getent passwd alice','One user\'s entry'],
      ['getent group wheel','One group\'s entry'],
      ['sudo getent shadow alice','Password hash + ageing'],
      ['sudo vipw','Safely edit /etc/passwd (locks it)'],
      ['sudo vigr','Safely edit /etc/group'],
      ['sudo pwck -r','Check passwd/shadow consistency (read-only)'],
      ['sudo grpck -r','Check group files'],
      ['grep -E "^(UID_MIN|UID_MAX|PASS_MAX_DAYS|ENCRYPT_METHOD)" /etc/login.defs','Account defaults']],
    flags:[
      ['/etc/passwd','Users (world-readable)'],
      ['/etc/shadow','Hashed passwords (root only)'],
      ['/etc/group','Groups + members'],
      ['/etc/gshadow','Group passwords/admins'],
      ['/etc/login.defs','UID ranges, ageing defaults'],
      ['/etc/default/useradd','useradd defaults']],
    example:{cmd:'getent passwd alice', out:`alice:x:1001:1001:Alice Smith:/home/alice:/bin/bash`},
    warn:'Never edit <code>/etc/passwd</code> or <code>/etc/shadow</code> with a normal editor — use <code>vipw</code>/<code>vigr</code>, which lock and validate.' },

  { title:'Rename & Modify Accounts', icon:'✏️', badge:'MODIFY', color:'warn',
    cmds:[
      ['sudo usermod -c "Alice Smith" alice','Full name'],
      ['chfn','Change your own full name'],
      ['chsh -s /bin/zsh','Change your own shell'],
      ['cat /etc/shells','Allowed shells'],
      ['sudo usermod -l alicia alice','Rename login name…'],
      ['sudo usermod -d /home/alicia -m alicia','…move home to match'],
      ['sudo groupmod -n alicia alice','…rename her private group'],
      ['sudo usermod -u 1500 alicia','Change UID (fixes files in home)'],
      ['sudo find / -xdev -uid 1001 -exec chown -h 1500 {} +','Fix files outside home'],
      ['sudo usermod -g developers alice','Change primary group']],
    flags:[
      ['-c','Comment / full name'],
      ['-l <new>','New login name'],
      ['-d <dir> -m','New home + move contents'],
      ['-u <uid>','New UID'],
      ['-g <group>','Primary group'],
      ['-s <shell>','Login shell'],
      ['groupmod -n','Rename group']],
    example:{cmd:'id alicia', out:`uid=1500(alicia) gid=1001(alicia) groups=1001(alicia),10(wheel)`},
    warn:'Rename or change the UID only while the user is fully logged out (<code>loginctl terminate-user alice</code>).' },

  { title:'Home Directories & /etc/skel', icon:'🏠', badge:'HOME', color:'blue',
    cmds:[
      ['ls -la /etc/skel','Template copied into every new home'],
      ['sudo cp ~/.vimrc /etc/skel/','Give future users your vimrc'],
      ['ls -ld /home/*','Fedora default: 700 (private)'],
      ['sudo du -sh /home/* | sort -h','Space per user'],
      ['sudo mkhomedir_helper alice','Create a missing home from skel'],
      ['sudo useradd -m -d /data/users/bob bob','Home in a custom location'],
      ['sudo semanage fcontext -a -e /home /data/users && sudo restorecon -Rv /data/users','SELinux: label like /home'],
      ['sudo restorecon -Rv /home/alice','Fix labels after copying a home in']],
    flags:[
      ['useradd -m','Create home from /etc/skel'],
      ['useradd -M','No home'],
      ['useradd -d <dir>','Custom path'],
      ['useradd -k <dir>','Alternate skel'],
      ['HOME_MODE 0700','login.defs: new home permissions'],
      ['semanage fcontext -e','Equivalence: label B like A']],
    example:{cmd:'sudo du -sh /home/* | sort -h', out:
`312M	/home/bob
4.8G	/home/alice
61G	/home/sooraj`} },

  { title:'System & Service Accounts', icon:'🤖', badge:'SYSTEM', color:'blue',
    cmds:[
      ['sudo useradd -r -M -s /sbin/nologin myapp','Service account (no home, no login)'],
      ['awk -F: \'$3 < 1000 {print $1, $3, $7}\' /etc/passwd','List system accounts'],
      ['getent passwd {1000..60000}','Only human users'],
      ['echo "u myapp - \\"My App\\" /var/lib/myapp" | sudo tee /etc/sysusers.d/myapp.conf','Declarative (systemd-sysusers)'],
      ['sudo systemd-sysusers','Create accounts from sysusers.d'],
      ['sudo -u myapp /opt/myapp/bin/run','Run something as that account'],
      ['sudo usermod -s /sbin/nologin olduser','Block interactive login']],
    flags:[
      ['useradd -r','System UID range (<1000)'],
      ['-M','No home directory'],
      ['-s /sbin/nologin','Can\'t log in'],
      ['DynamicUser=yes','systemd unit: throwaway user per run'],
      ['/etc/sysusers.d/*.conf','u name uid "desc" home']],
    example:{cmd:'awk -F: \'$3 < 1000 && $3 > 0 {print $1}\' /etc/passwd | head -5', out:
`bin
daemon
adm
lp
sync`},
    tip:'For services you write, <code>DynamicUser=yes</code> in the unit is often simpler than creating an account.' },

  { title:'Switching Users: su vs sudo', icon:'🔀', badge:'SWITCH', color:'green', tableFirst:true,
    table:{head:['Command','Becomes','Env','Password'], rows:[
      ['su','root','Keeps yours','root\'s'],
      ['su -','root','Root\'s login env','root\'s'],
      ['su - alice','alice','Alice\'s login env','alice\'s'],
      ['sudo -s','root','Mostly yours','yours'],
      ['sudo -i','root','Root\'s login env','yours'],
      ['sudo -u alice -i','alice','Alice\'s login env','yours'],
      ['runuser -l alice','alice (from root)','Alice\'s login env','none']]},
    cmds:[
      ['su -c "systemctl restart nginx" -','One command as root via su'],
      ['sudo -u postgres psql','Run one command as another user'],
      ['sudo -u alice -i','Full shell as alice'],
      ['sudo machinectl shell alice@','Full login session (proper user services)'],
      ['exit','Back to yourself']],
    flags:[
      ['- / -l','Login shell (clean environment)'],
      ['-c "<cmd>"','su: run one command'],
      ['sudo -E','Keep your environment'],
      ['sudo -H','Set HOME to target user']],
    example:{cmd:'sudo -u alice -i whoami', out:`alice`},
    tip:'Fedora locks the root password by default — use <code>sudo -i</code> rather than <code>su -</code>.' },

  { title:'sudoers Deep Dive', icon:'📐', badge:'SUDOERS', color:'warn',
    code:
`# sudo visudo -f /etc/sudoers.d/10-team
# Group-based access (Fedora already has %wheel ALL=(ALL) ALL)
%devs  ALL=(ALL) /usr/bin/systemctl restart myapp, /usr/bin/journalctl -u myapp

# Command aliases
Cmnd_Alias PKG = /usr/bin/dnf upgrade, /usr/bin/dnf install *
alice  ALL=(root) PKG

# Ask less often (minutes)
Defaults timestamp_timeout=15

# Keep a searchable log of every sudo command
Defaults logfile=/var/log/sudo.log`,
    cmds:[
      ['sudo visudo -f /etc/sudoers.d/10-team','Edit a drop-in safely'],
      ['sudo visudo -c','Validate all sudoers files'],
      ['sudo chmod 440 /etc/sudoers.d/10-team','Required permissions'],
      ['sudo -l -U alice','What alice may run'],
      ['sudo -ll','Your rules, verbose'],
      ['journalctl _COMM=sudo --since today','Today\'s sudo usage'],
      ['sudo -k','Forget your cached password now']],
    flags:[
      ['user HOST=(RUNAS) CMDS','Rule format'],
      ['%group','Rule for a group'],
      ['NOPASSWD:','No password for these commands'],
      ['Cmnd_Alias / User_Alias','Reusable lists'],
      ['Defaults timestamp_timeout=N','Password cache minutes (0 = always ask)'],
      ['visudo -c','Syntax check']],
    example:{cmd:'sudo -l -U alice', out:
`User alice may run the following commands on fedora-ws:
    (root) /usr/bin/dnf upgrade, /usr/bin/dnf install *`},
    danger:'A syntax error in sudoers can lock everyone out of sudo. Always use <code>visudo</code>, and keep a root shell open while testing.' },

  { title:'Lock, Disable & Offboard a User', icon:'🚷', badge:'OFFBOARD', color:'red',
    cmds:[
      ['sudo usermod -L -e 1 alice','Lock password + expire account'],
      ['sudo loginctl terminate-user alice','End all her sessions'],
      ['sudo pkill -KILL -u alice','Kill anything left'],
      ['sudo crontab -r -u alice','Remove her cron jobs'],
      ['sudo find / -xdev -user alice -not -path "/home/alice/*" 2>/dev/null','Her files elsewhere'],
      ['sudo tar -czf /root/alice-home-$(date +%F).tgz -C /home alice','Archive her home'],
      ['sudo userdel -r alice','Delete account + home + mail'],
      ['sudo usermod -U -e "" alice','(Undo lock/expiry if she returns)']],
    flags:[
      ['usermod -L / -U','Lock / unlock password'],
      ['usermod -e 1','Expire account (any auth incl. SSH keys)'],
      ['usermod -e ""','Remove expiry'],
      ['userdel -r','Also remove home + mail spool'],
      ['userdel -f','Force, even if logged in']],
    example:{cmd:'sudo passwd -S alice', out:`alice LK 2026-09-12 0 90 7 -1 (Password locked.)`},
    warn:'Locking the password (<code>-L</code>) does <b>not</b> stop SSH key logins — also expire the account with <code>-e 1</code>.' },

  { title:'Create Many Users at Once', icon:'👪', badge:'BULK', color:'green',
    code:
`# users.txt — newusers format (name:pass:uid:gid:gecos:home:shell)
student1:Temp#Pass1:::Student One:/home/student1:/bin/bash
student2:Temp#Pass2:::Student Two:/home/student2:/bin/bash`,
    cmds:[
      ['sudo newusers users.txt','Create all from a file'],
      ['for u in dev1 dev2 dev3; do sudo useradd -m -G devs "$u"; done','Loop'],
      ['echo "dev1:$(openssl rand -base64 12)" | sudo chpasswd','Set a random password'],
      ['for u in dev1 dev2 dev3; do p=$(openssl rand -base64 12); echo "$u:$p" | sudo chpasswd; echo "$u $p"; done > passwords.txt','Random passwords for all, saved once'],
      ['for u in dev1 dev2 dev3; do sudo passwd -e "$u"; done','Force change at first login'],
      ['chmod 600 passwords.txt','Protect the list (then share securely & delete)']],
    flags:[
      ['newusers <file>','Batch create/update'],
      ['chpasswd','name:password pairs on stdin'],
      ['chpasswd -e','Input already hashed'],
      ['passwd -e','Expire now (must change)']],
    example:{cmd:'getent group devs', out:`devs:x:1010:dev1,dev2,dev3`} },

  { title:'Login Screen & Autologin (GNOME)', icon:'🖥️', badge:'GDM', color:'blue',
    code:
`# /etc/gdm/custom.conf
[daemon]
AutomaticLoginEnable=True
AutomaticLogin=sooraj`,
    cmds:[
      ['sudoedit /etc/gdm/custom.conf','Autologin (or Settings → Users → Automatic Login)'],
      ['sudo mkdir -p /var/lib/AccountsService/users','Hide a user from the login list…'],
      ['printf "[User]\\nSystemAccount=true\\n" | sudo tee /var/lib/AccountsService/users/backupuser','…by marking it a system account'],
      ['sudo cp face.png /var/lib/AccountsService/icons/alice','Set a user picture'],
      ['sudo -u gdm dbus-run-session gsettings set org.gnome.login-screen disable-user-list true','Type username instead of picking'],
      ['sudo systemctl restart gdm','Apply (logs everyone out)']],
    flags:[
      ['AutomaticLoginEnable','Auto log in at boot'],
      ['TimedLoginEnable / TimedLoginDelay','Log in after N seconds'],
      ['SystemAccount=true','Hidden from user list'],
      ['disable-user-list','Show a username box instead']],
    example:{cmd:'grep -A2 "\\[daemon\\]" /etc/gdm/custom.conf', out:
`[daemon]
AutomaticLoginEnable=True
AutomaticLogin=sooraj`},
    warn:'Autologin means anyone who powers on the machine gets your session — and your keyring won\'t unlock automatically.' },

  { title:'Per-User Resource Limits', icon:'📏', badge:'LIMITS', color:'warn',
    cmds:[
      ['ulimit -a','Your current limits'],
      ['sudoedit /etc/security/limits.d/90-devs.conf','Classic PAM limits'],
      ['@devs  soft  nofile  8192','limits.d line: open files for group devs'],
      ['alice  hard  nproc   500','limits.d line: max processes'],
      ['id -u alice','UID for the systemd slice…'],
      ['sudo systemctl set-property user-1001.slice MemoryMax=4G CPUQuota=200%','…cap all of alice\'s processes'],
      ['systemctl status user-1001.slice','Current usage'],
      ['sudo xfs_quota -x -c "limit bsoft=10g bhard=12g alice" /home','Disk quota (XFS with quota mount option)']],
    flags:[
      ['soft / hard','Default / maximum a user can raise to'],
      ['nofile / nproc / memlock','Common limit types'],
      ['MemoryMax= / CPUQuota=','systemd slice caps'],
      ['user-<UID>.slice','All processes of one user'],
      ['xfs_quota -c "report -h"','Quota usage report']],
    example:{cmd:'systemctl show user-1001.slice -p MemoryMax -p CPUQuotaPerSecUSec', out:
`MemoryMax=4294967296
CPUQuotaPerSecUSec=2s`} }
);
})();

/* ═════════════════ MORE NETWORK (v2.12) ═════════════════ */
(function () {
const n = window.FB_DATA.find(s => s.id === 'network');
n.cards.push(
  { title:'Routes & Gateways', icon:'🛣️', badge:'ROUTE', color:'blue',
    cmds:[
      ['ip route','Routing table'],
      ['ip route get 10.20.0.5','Which route + interface a packet uses'],
      ['sudo ip route add 10.20.0.0/16 via 192.168.1.254','Temporary route'],
      ['sudo ip route del 10.20.0.0/16',''],
      ['nmcli con mod "Wired 1" +ipv4.routes "10.20.0.0/16 192.168.1.254"','Permanent route'],
      ['nmcli con mod "Wired 1" ipv4.route-metric 50','Prefer this connection'],
      ['nmcli con mod "Wired 1" ipv4.never-default yes','Never use it as default gateway'],
      ['nmcli con up "Wired 1"','Apply'],
      ['ip -6 route','IPv6 routes']],
    flags:[
      ['via <gw>','Next hop'],
      ['dev <iface>','Out interface'],
      ['metric N','Lower = preferred'],
      ['+ipv4.routes / -ipv4.routes','Add / remove saved route'],
      ['ipv4.never-default','Don\'t install default route'],
      ['ip route get','Test route selection']],
    example:{cmd:'ip route', out:
`default via 192.168.1.1 dev enp3s0 proto dhcp src 192.168.1.42 metric 100
default via 192.168.1.1 dev wlp4s0 proto dhcp src 192.168.1.57 metric 600
10.20.0.0/16 via 192.168.1.254 dev enp3s0 proto static metric 100
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.42 metric 100`},
    tip:'Wired (metric 100) beats Wi-Fi (600) automatically — that\'s why plugging in a cable takes over.' },

  { title:'Bridges, VLANs & Bonds', icon:'🌉', badge:'L2', color:'warn',
    cmds:[
      ['# Bridge (VMs on your LAN):',''],
      ['nmcli con add type bridge ifname br0 con-name br0',''],
      ['nmcli con add type bridge-slave ifname enp3s0 master br0',''],
      ['nmcli con up br0',''],
      ['# VLAN 10 on enp3s0:',''],
      ['nmcli con add type vlan con-name vlan10 dev enp3s0 id 10 ipv4.method auto',''],
      ['# Bond (two NICs, failover):',''],
      ['nmcli con add type bond ifname bond0 con-name bond0 bond.options "mode=active-backup,miimon=100"',''],
      ['nmcli con add type ethernet ifname enp3s0 master bond0',''],
      ['nmcli con add type ethernet ifname enp4s0 master bond0',''],
      ['cat /proc/net/bonding/bond0','Bond status'],
      ['bridge link','Ports on bridges']],
    flags:[
      ['type bridge / vlan / bond','Virtual device types'],
      ['master <dev>','Enslave a port'],
      ['id <n>','VLAN tag'],
      ['mode=active-backup','Failover bond'],
      ['mode=802.3ad','LACP (switch must support)'],
      ['bridge.stp no','Disable spanning tree']],
    example:{cmd:'nmcli -f NAME,TYPE,DEVICE con show --active', out:
`NAME              TYPE      DEVICE
br0               bridge    br0
bridge-slave-enp3s0 ethernet enp3s0
vlan10            vlan      enp3s0.10`},
    warn:'Doing this over SSH can cut you off. Use a local console or Cockpit\'s network page (it rolls back on failure).' },

  { title:'Hotspot & Connection Sharing', icon:'📲', badge:'HOTSPOT', color:'green',
    cmds:[
      ['nmcli dev wifi hotspot ifname wlp4s0 ssid FedoraHotspot password "S3cure-Pass"','Wi-Fi hotspot'],
      ['nmcli dev wifi show-password','SSID + password + QR code'],
      ['nmcli con down Hotspot','Stop it'],
      ['nmcli con mod Hotspot connection.autoconnect yes','Start on boot'],
      ['nmcli con add type ethernet ifname enp3s0 con-name shared ipv4.method shared','Share Wi-Fi internet over a cable'],
      ['nmcli con up shared','']],
    flags:[
      ['hotspot ssid / password','Creates connection named "Hotspot"'],
      ['band a | bg','5 GHz / 2.4 GHz'],
      ['ipv4.method shared','NAT + DHCP for clients'],
      ['802-11-wireless-security.key-mgmt sae','WPA3 hotspot']],
    example:{cmd:'nmcli dev wifi show-password', out:
`SSID: FedoraHotspot
Security: WPA
Password: S3cure-Pass

    ▄▄▄▄▄▄▄  ▄ ▄▄▄  ▄▄▄▄▄▄▄
    █ ▄▄▄ █ ▀▄█▀▄▀▄ █ ▄▄▄ █
    █ ███ █ ▄▀▀ ▄▀█ █ ███ █`} },

  { title:'DNS Deep Dive', icon:'🧭', badge:'DNS+', color:'blue',
    cmds:[
      ['resolvectl status enp3s0','DNS for one interface'],
      ['resolvectl query -t MX fedoraproject.org','Any record type'],
      ['dig +short fedoraproject.org AAAA','IPv6 address'],
      ['dig +trace fedoraproject.org','Follow resolution from the root'],
      ['dig @9.9.9.9 example.com','Ask a specific server'],
      ['host 8.8.8.8','Reverse lookup'],
      ['sudo resolvectl dns enp3s0 1.1.1.1 9.9.9.9','Temporary DNS for an interface'],
      ['sudo mkdir -p /etc/systemd/resolved.conf.d && sudoedit /etc/systemd/resolved.conf.d/dot.conf','Encrypted DNS (DoT)'],
      ['sudo systemctl restart systemd-resolved',''],
      ['resolvectl statistics','Cache hits']],
    code:
`# /etc/systemd/resolved.conf.d/dot.conf
[Resolve]
DNS=1.1.1.1#cloudflare-dns.com 9.9.9.9#dns.quad9.net
DNSOverTLS=yes
Domains=~.`,
    flags:[
      ['dig +short','Answer only'],
      ['dig +trace','Iterative from root'],
      ['dig -t MX|TXT|NS|SOA','Record type'],
      ['DNSOverTLS=yes|opportunistic','Encrypted DNS'],
      ['Domains=~.','Use these servers for everything'],
      ['resolvectl flush-caches','Clear cache']],
    example:{cmd:'resolvectl status | grep -E "DNS Server|DNSOverTLS"', out:
`Protocols: +LLMNR +mDNS +DNSOverTLS DNSSEC=no/unsupported
Current DNS Server: 1.1.1.1#cloudflare-dns.com
       DNS Servers: 1.1.1.1#cloudflare-dns.com 9.9.9.9#dns.quad9.net`} },

  { title:'Bandwidth Monitoring', icon:'📊', badge:'TRAFFIC', color:'green',
    cmds:[
      ['sudo dnf install iftop nethogs nload bmon vnstat',''],
      ['sudo nethogs','Bandwidth per PROCESS'],
      ['sudo iftop -i enp3s0','Bandwidth per CONNECTION'],
      ['nload enp3s0','In/out graph'],
      ['bmon','All interfaces'],
      ['ip -s link show enp3s0','Byte / packet / error counters'],
      ['sudo systemctl enable --now vnstat','Start long-term stats…'],
      ['vnstat -d','…daily totals'],
      ['ss -tp','Connections with owning process']],
    flags:[
      ['nethogs <iface>','Limit to an interface'],
      ['iftop -n','No DNS lookups'],
      ['iftop -P','Show ports'],
      ['vnstat -h / -d / -m','Hourly / daily / monthly'],
      ['ip -s -s link','Extra error detail']],
    example:{cmd:'vnstat -d | tail -5', out:
`     2026-09-27     3.12 GiB |   412.40 MiB |    3.52 GiB
     2026-09-28     5.87 GiB |   701.18 MiB |    6.56 GiB
     2026-09-29     2.44 GiB |   318.02 MiB |    2.75 GiB
     2026-09-30   611.20 MiB |    52.91 MiB |  664.11 MiB
     ------------------------+--------------+-------------`} },

  { title:'Speed Testing', icon:'⚡', badge:'SPEED', color:'blue',
    cmds:[
      ['sudo dnf install iperf3',''],
      ['iperf3 -s','On machine A: server'],
      ['iperf3 -c 192.168.1.42','On machine B: test to A'],
      ['iperf3 -c 192.168.1.42 -R','Reverse direction'],
      ['iperf3 -c 192.168.1.42 -P 4 -t 20','4 streams, 20 seconds'],
      ['sudo firewall-cmd --add-port=5201/tcp','Allow iperf3 (temporary)'],
      ['curl -o /dev/null -w "%{speed_download}\\n" https://download.fedoraproject.org/pub/fedora/linux/releases/44/Workstation/x86_64/iso/Fedora-Workstation-Live-44-1.7.x86_64.iso','Internet download speed (bytes/s)'],
      ['ping -c 20 -i 0.2 1.1.1.1 | tail -1','Latency + jitter']],
    flags:[
      ['-s / -c <host>','Server / client'],
      ['-R','Server sends (download test)'],
      ['-P N','Parallel streams'],
      ['-t N','Duration seconds'],
      ['-u -b 100M','UDP at 100 Mbit/s'],
      ['-p <port>','Custom port (default 5201)']],
    example:{cmd:'iperf3 -c 192.168.1.42 | tail -4', out:
`[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  1.09 GBytes   939 Mbits/sec   12            sender
[  5]   0.00-10.00  sec  1.09 GBytes   937 Mbits/sec                 receiver
iperf Done.`},
    tip:'~940 Mbit/s is the practical maximum of gigabit Ethernet. Much less over a cable points at a bad cable or port.' },

  { title:'Packet Capture (tcpdump & Wireshark)', icon:'🦈', badge:'PCAP', color:'warn',
    cmds:[
      ['sudo tcpdump -i any -nn port 53','Watch DNS queries'],
      ['sudo tcpdump -i enp3s0 -nn host 192.168.1.20','Traffic to/from one host'],
      ['sudo tcpdump -i any -nn "tcp port 443 and host 1.1.1.1"','Combine filters'],
      ['sudo tcpdump -i any -w capture.pcap -c 1000','Save 1000 packets'],
      ['tcpdump -nn -r capture.pcap | head','Read a capture'],
      ['sudo dnf install wireshark',''],
      ['sudo usermod -aG wireshark $USER','Capture without root (re-login)'],
      ['tshark -i enp3s0 -Y "http.request" -T fields -e http.host','CLI Wireshark: HTTP hosts']],
    flags:[
      ['-i <iface> | any','Interface'],
      ['-nn','No name/port resolution'],
      ['-w / -r','Write / read pcap'],
      ['-c N','Stop after N packets'],
      ['-A','Print payload as ASCII'],
      ['host / net / port / tcp / udp','Filter primitives'],
      ['and / or / not','Combine filters']],
    example:{cmd:'sudo tcpdump -i any -nn -c 2 port 53', out:
`01:15:02.114812 enp3s0 Out IP 192.168.1.42.51544 > 1.1.1.1.53: 41213+ A? fedoraproject.org. (35)
01:15:02.129033 enp3s0 In  IP 1.1.1.1.53 > 192.168.1.42.51544: 41213 2/0/0 A 38.145.60.21, A 38.145.60.20 (67)
2 packets captured`},
    warn:'Only capture traffic on networks you own or are authorised to monitor.' },

  { title:'Ports, Listening & Quick Servers', icon:'🚪', badge:'PORTS', color:'blue',
    cmds:[
      ['sudo ss -tlnp','TCP ports listening + process'],
      ['sudo ss -ulnp','UDP ports'],
      ['ss -tan state established','Active connections'],
      ['sudo lsof -i :8080','Who is using port 8080'],
      ['nc -zv 192.168.1.10 20-25','Scan a small port range'],
      ['nc -l 9000','Listen on a port (test firewall)…'],
      ['nc 192.168.1.42 9000','…connect from another machine and type'],
      ['python3 -m http.server 8000','Share this folder over HTTP'],
      ['nmap -sV -p 22,80,443 192.168.1.10','Service + version on your own host']],
    flags:[
      ['ss -t / -u / -l / -n / -p','TCP / UDP / listen / numeric / process'],
      ['ss state <state>','established, listening, time-wait…'],
      ['nc -z','Scan only, no data'],
      ['nc -l','Listen mode'],
      ['nmap -sV','Detect service versions'],
      ['nmap -p-','All 65535 ports']],
    example:{cmd:'sudo ss -tlnp', out:
`State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process
LISTEN 0      128          0.0.0.0:22        0.0.0.0:*    users:(("sshd",pid=1123,fd=3))
LISTEN 0      4096       127.0.0.1:631       0.0.0.0:*    users:(("cupsd",pid=988,fd=7))
LISTEN 0      511          0.0.0.0:80        0.0.0.0:*    users:(("nginx",pid=2210,fd=6))`},
    tip:'A port listening on <code>127.0.0.1</code> is only reachable from this machine; <code>0.0.0.0</code> means every interface.' },

  { title:'Proxy Settings', icon:'🧱', badge:'PROXY', color:'blue',
    cmds:[
      ['export https_proxy=http://proxy.corp:3128','Shell tools (curl, git, pip…)'],
      ['export http_proxy=$https_proxy no_proxy=localhost,127.0.0.1,.corp',''],
      ['echo "proxy=http://proxy.corp:3128" | sudo tee -a /etc/dnf/dnf.conf','DNF'],
      ["gsettings set org.gnome.system.proxy mode 'manual'",'GNOME apps…'],
      ["gsettings set org.gnome.system.proxy.https host 'proxy.corp'",''],
      ['gsettings set org.gnome.system.proxy.https port 3128',''],
      ['git config --global http.proxy http://proxy.corp:3128','Git'],
      ['curl -x http://proxy.corp:3128 -I https://fedoraproject.org','Test through the proxy']],
    flags:[
      ['http_proxy / https_proxy','Most CLI tools'],
      ['no_proxy','Bypass list'],
      ['ALL_PROXY=socks5://host:1080','SOCKS proxy'],
      ['curl -x / --noproxy','Explicit proxy / bypass'],
      ['proxy= in dnf.conf','DNF only']],
    example:{cmd:'env | grep -i _proxy', out:
`https_proxy=http://proxy.corp:3128
http_proxy=http://proxy.corp:3128
no_proxy=localhost,127.0.0.1,.corp`} },

  { title:'NIC Details, Wake-on-LAN & MAC Privacy', icon:'🔧', badge:'NIC', color:'blue',
    cmds:[
      ['ethtool enp3s0','Link speed, duplex, WoL support'],
      ['ethtool -i enp3s0','Driver + firmware'],
      ['ethtool -S enp3s0 | grep -i err','Error counters'],
      ['nmcli con mod "Wired 1" 802-3-ethernet.wake-on-lan magic','Enable Wake-on-LAN'],
      ['sudo dnf install wakeonlan && wakeonlan AA:BB:CC:DD:EE:FF','Wake another PC'],
      ['nmcli con mod "HomeWiFi" 802-11-wireless.cloned-mac-address stable','Per-network random MAC'],
      ['nmcli con mod "CafeWiFi" 802-11-wireless.cloned-mac-address random','New MAC every connection'],
      ['nmcli con mod "Wired 1" ipv6.ip6-privacy 2','IPv6 privacy addresses'],
      ['ip link show wlp4s0 | grep ether','Current MAC']],
    flags:[
      ['ethtool -s <if> speed 1000 duplex full','Force link settings'],
      ['wake-on-lan magic | ignore','WoL mode'],
      ['cloned-mac-address permanent|stable|random','MAC policy'],
      ['ip6-privacy 2','Prefer temporary IPv6']],
    example:{cmd:'ethtool enp3s0 | grep -E "Speed|Duplex|Link detected|Wake-on"', out:
`	Speed: 1000Mb/s
	Duplex: Full
	Supports Wake-on: pumbg
	Wake-on: g
	Link detected: yes`},
    tip:'Link speed 100Mb/s on a gigabit port usually means a damaged cable (only 2 of 4 pairs working).' }
);
})();

/* ═════════════════ MORE SERVICES (v2.13) ═════════════════ */
(function () {
const s = window.FB_DATA.find(x => x.id === 'services');
s.cards.push(
  { title:'Enable, Disable, Mask — Explained', icon:'🎛️', badge:'STATES', color:'green', tableFirst:true,
    table:{head:['Command','Now','At boot','Can others start it?'], rows:[
      ['start','Runs','—','Yes'],
      ['stop','Stops','—','Yes'],
      ['enable','—','Starts','Yes'],
      ['enable --now','Runs','Starts','Yes'],
      ['disable','—','Won\'t start','Yes (deps/sockets can)'],
      ['mask','—','Won\'t start','No — blocked completely'],
      ['unmask','—','Back to normal','Yes']]},
    cmds:[
      ['systemctl list-unit-files --state=enabled','Everything enabled'],
      ['systemctl list-unit-files --state=masked','Everything masked'],
      ['sudo systemctl mask --now packagekit','Block a service entirely'],
      ['sudo systemctl unmask packagekit',''],
      ['sudo systemctl preset sshd','Back to Fedora\'s default on/off'],
      ['sudo systemctl reset-failed','Clear failed markers'],
      ['sudo systemctl daemon-reload','After editing unit files'],
      ['sudo systemctl daemon-reexec','Restart systemd itself (after systemd upgrades)']],
    flags:[
      ['--now','Also start/stop immediately'],
      ['preset','Apply distro default'],
      ['is-enabled','enabled / disabled / masked / static'],
      ['static','No [Install] section — started by others only'],
      ['--runtime','Until next reboot only']],
    example:{cmd:'systemctl is-enabled sshd packagekit systemd-journald', out:
`enabled
masked
static`} },

  { title:'Inspect Units', icon:'🔍', badge:'INSPECT', color:'blue',
    cmds:[
      ['systemctl cat nginx','Unit file + all drop-ins'],
      ['systemctl show nginx -p MainPID,ActiveState,SubState,MemoryCurrent','Specific properties'],
      ['systemctl show nginx --property=ExecStart --value',''],
      ['systemctl list-dependencies nginx','What it pulls in'],
      ['systemctl list-dependencies --reverse nginx','What pulls it in'],
      ['systemctl status 2210','Which unit owns a PID'],
      ['systemctl list-units --all --state=inactive --type=service','Loaded but not running'],
      ['systemctl list-units --type=target','Active targets'],
      ['systemd-analyze verify myapp.service','Lint a unit file'],
      ['systemctl -H admin@server status nginx','Status on a remote host (over SSH)']],
    flags:[
      ['show -p A,B','Pick properties'],
      ['--value','Just the value'],
      ['list-dependencies --reverse','Reverse tree'],
      ['--all','Include inactive units'],
      ['--type= / --state=','Filter'],
      ['-H user@host','Remote']],
    example:{cmd:'systemctl show nginx -p ActiveState,SubState,MainPID,MemoryCurrent', out:
`MainPID=2210
ActiveState=active
SubState=running
MemoryCurrent=14336000`} },

  { title:'Overrides & Drop-ins', icon:'🧩', badge:'OVERRIDE', color:'warn',
    code:
`# sudo systemctl edit nginx   → creates
# /etc/systemd/system/nginx.service.d/override.conf
[Service]
Restart=always
RestartSec=3
LimitNOFILE=65536
Environment=TZ=Asia/Qatar

# To REPLACE ExecStart, clear it first:
ExecStart=
ExecStart=/usr/sbin/nginx -g "daemon off;"`,
    cmds:[
      ['sudo systemctl edit nginx','Create / edit a drop-in (safe, survives updates)'],
      ['sudo systemctl edit --full nginx','Copy the whole unit to /etc to edit'],
      ['sudo systemctl revert nginx','Remove all your overrides'],
      ['systemd-delta --type=extended,overridden','Every unit you\'ve overridden'],
      ['ls /etc/systemd/system/nginx.service.d/',''],
      ['sudo systemctl restart nginx','Apply']],
    flags:[
      ['/usr/lib/systemd/system/','Package units — don\'t edit'],
      ['/etc/systemd/system/','Your units + overrides (win)'],
      ['<unit>.d/*.conf','Drop-in fragments'],
      ['ExecStart= (empty)','Clears list before redefining'],
      ['edit --drop-in=name','Named drop-in file']],
    example:{cmd:'systemd-delta --type=extended', out:
`[EXTENDED]   /usr/lib/systemd/system/nginx.service → /etc/systemd/system/nginx.service.d/override.conf

1 overridden configuration files found.`},
    tip:'Never edit files in <code>/usr/lib/systemd/system</code> — package updates overwrite them. Drop-ins are kept.' },

  { title:'User Services (no sudo)', icon:'🙋', badge:'USER', color:'green',
    code:
`# ~/.config/systemd/user/syncthing-like.service
[Unit]
Description=My personal sync job

[Service]
ExecStart=%h/bin/sync.sh
Restart=on-failure

[Install]
WantedBy=default.target`,
    cmds:[
      ['mkdir -p ~/.config/systemd/user',''],
      ['systemctl --user daemon-reload',''],
      ['systemctl --user enable --now syncthing-like','Start now + at login'],
      ['systemctl --user status syncthing-like',''],
      ['journalctl --user -u syncthing-like -f','Its logs'],
      ['systemctl --user list-units --type=service','Your running services'],
      ['loginctl enable-linger $USER','Keep running after logout / start at boot'],
      ['systemctl --user list-timers','Your timers']],
    flags:[
      ['--user','Your per-user systemd'],
      ['%h','Your home directory'],
      ['default.target','User "login" target'],
      ['enable-linger','User manager runs without a login'],
      ['journalctl --user','Your journal']],
    example:{cmd:'systemctl --user list-units --type=service --state=running | head -5', out:
`  UNIT                              LOAD   ACTIVE SUB     DESCRIPTION
  at-spi-dbus-bus.service           loaded active running Accessibility services bus
  pipewire.service                  loaded active running PipeWire Multimedia Service
  syncthing-like.service            loaded active running My personal sync job
  wireplumber.service               loaded active running Multimedia Service Session Manager`} },

  { title:'One-off Jobs: systemd-run', icon:'🚀', badge:'RUN', color:'blue',
    cmds:[
      ['sudo systemd-run --unit=backup-now /usr/local/bin/backup.sh','Run as a tracked service'],
      ['journalctl -u backup-now','Its logs'],
      ['sudo systemd-run --on-active=30min /usr/bin/systemctl reboot','Reboot in 30 minutes'],
      ['sudo systemd-run --on-calendar="2026-10-01 03:00" /usr/local/bin/cleanup.sh','Once at a time'],
      ['systemd-run --user --scope -p MemoryMax=2G -p CPUQuota=50% make -j8','Resource-capped command'],
      ['sudo systemd-run -t -p ProtectHome=yes bash','Test hardening options interactively'],
      ['systemctl list-timers --all | grep run-','Pending transient timers']],
    flags:[
      ['--unit=<name>','Name the transient unit'],
      ['--on-active= / --on-calendar=','Delay / schedule'],
      ['--scope','Run in foreground, as a scope'],
      ['-p Prop=Value','Any unit property'],
      ['-t / --pty','Interactive terminal'],
      ['--wait','Block until finished, show result'],
      ['--user','In your user manager']],
    example:{cmd:'sudo systemd-run --wait --unit=hello /usr/bin/echo hi', out:
`Running as unit: hello.service; invocation ID: 3f1c…
Finished with result: success
Main processes terminated with: code=exited/status=0
Service runtime: 4ms`} },

  { title:'Unit Types & Dependencies', icon:'🕸️', badge:'ORDER', color:'blue', tableFirst:true,
    table:{head:['Directive','Meaning'], rows:[
      ['Wants=','Start this too; fine if it fails'],
      ['Requires=','Start this too; stop me if it stops/fails'],
      ['BindsTo=','Like Requires, also stop if it vanishes'],
      ['After= / Before=','Ordering only (no pulling in!)'],
      ['PartOf=','Restart/stop with the other unit'],
      ['Conflicts=','Can\'t run at the same time'],
      ['Type=simple','Ready immediately (default)'],
      ['Type=exec','Ready once the binary started'],
      ['Type=notify','Program signals readiness'],
      ['Type=forking','Classic daemon that backgrounds itself'],
      ['Type=oneshot','Runs to completion (scripts); use RemainAfterExit=yes']]},
    cmds:[
      ['systemctl list-dependencies graphical.target | head -20','Boot dependency tree'],
      ['systemd-analyze critical-chain nginx.service','Why it started when it did'],
      ['systemd-analyze dot nginx.service | dot -Tsvg > deps.svg','Graph (graphviz)']],
    flags:[
      ['Wants + After','The usual pair'],
      ['network-online.target','Wait for real network (with Wants=)'],
      ['multi-user.target','Normal boot (WantedBy=)'],
      ['default.target','User services (WantedBy=)']],
    example:{cmd:'systemd-analyze critical-chain nginx.service', out:
`nginx.service +48ms
└─network-online.target @3.912s
  └─NetworkManager-wait-online.service @1.101s +2.809s
    └─NetworkManager.service @0.982s +112ms
      └─basic.target @0.960s`},
    tip:'<code>After=</code> alone never starts anything — pair it with <code>Wants=</code> or <code>Requires=</code>.' },

  { title:'Restart Policies & Failure Alerts', icon:'🔁', badge:'RESTART', color:'warn',
    code:
`[Unit]
StartLimitIntervalSec=300
StartLimitBurst=5
OnFailure=notify-failure@%n.service

[Service]
Restart=on-failure
RestartSec=5s
RestartSteps=5
RestartMaxDelaySec=2min
WatchdogSec=30s

# /etc/systemd/system/notify-failure@.service
[Service]
Type=oneshot
ExecStart=/usr/local/bin/alert.sh "%i failed on %H"`,
    cmds:[
      ['sudo systemctl edit myapp','Add the [Service] lines as a drop-in'],
      ['systemctl show myapp -p NRestarts','How many times it restarted'],
      ['journalctl -u myapp -g "Scheduled restart"','Restart events'],
      ['sudo systemctl reset-failed myapp','After hitting the start limit']],
    flags:[
      ['Restart=no|on-failure|on-abnormal|always','When to restart'],
      ['RestartSec=','Delay before restart'],
      ['RestartSteps / RestartMaxDelaySec','Growing back-off'],
      ['StartLimitBurst / IntervalSec','Give up after N tries in T'],
      ['OnFailure=','Unit to start when this one fails'],
      ['WatchdogSec=','Kill+restart if app stops pinging (Type=notify)'],
      ['%n / %i / %H','Unit name / instance / hostname']],
    example:{cmd:'systemctl show myapp -p NRestarts -p Result', out:
`NRestarts=3
Result=success`} },

  { title:'Environment & Secrets', icon:'🔐', badge:'ENV', color:'blue',
    code:
`[Service]
Environment=APP_ENV=production PORT=8080
EnvironmentFile=-/etc/myapp/myapp.env
# Encrypted credential, readable only by this service:
LoadCredentialEncrypted=db-pass:/etc/credstore.encrypted/db-pass
ExecStart=/opt/myapp/run --db-pass-file=\${CREDENTIALS_DIRECTORY}/db-pass`,
    cmds:[
      ['sudo install -m 600 /dev/null /etc/myapp/myapp.env','Env file readable by root only'],
      ['echo -n "S3cret!" | sudo systemd-creds encrypt --name=db-pass - /etc/credstore.encrypted/db-pass','Encrypt a secret (TPM2 if available)'],
      ['sudo systemd-creds list','Credentials visible to this context'],
      ['systemctl show myapp -p Environment','Effective environment'],
      ['sudo systemctl set-environment DEBUG=1','Global env for all services (runtime)'],
      ['systemctl show-environment','Manager environment']],
    flags:[
      ['Environment=K=V','Inline variables'],
      ['EnvironmentFile=-path','File (- = optional)'],
      ['LoadCredential= / LoadCredentialEncrypted=','Secret files'],
      ['$CREDENTIALS_DIRECTORY','Where secrets appear'],
      ['PassEnvironment=','Pass through from manager']],
    example:{cmd:'systemctl show myapp -p Environment', out:`Environment=APP_ENV=production PORT=8080`},
    tip:'Secrets in <code>Environment=</code> are visible to anyone who can run <code>systemctl show</code>. Use credentials instead.' },

  { title:'Hardening a Service', icon:'🛡️', badge:'HARDEN', color:'red',
    code:
`[Service]
# Throwaway UID, no account needed
DynamicUser=yes
NoNewPrivileges=yes
# Whole filesystem read-only, except the paths listed
ProtectSystem=strict
ReadWritePaths=/var/lib/myapp
ProtectHome=yes
PrivateTmp=yes
PrivateDevices=yes
ProtectKernelTunables=yes
ProtectKernelModules=yes
ProtectControlGroups=yes
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
RestrictNamespaces=yes
LockPersonality=yes
MemoryDenyWriteExecute=yes
SystemCallFilter=@system-service
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
StateDirectory=myapp`,
    cmds:[
      ['systemd-analyze security','Exposure score of every service'],
      ['systemd-analyze security myapp.service','Detailed checklist for one'],
      ['sudo systemctl edit myapp','Add hardening as a drop-in'],
      ['sudo systemctl restart myapp && systemctl status myapp','Test it still works'],
      ['journalctl -u myapp -b | grep -iE "denied|EPERM|read-only"','What the sandbox blocked']],
    flags:[
      ['ProtectSystem=strict|full|yes','How much of / is read-only'],
      ['ProtectHome=yes|read-only|tmpfs','Hide /home'],
      ['PrivateTmp=yes','Own /tmp'],
      ['DynamicUser=yes','Ephemeral user'],
      ['StateDirectory= / CacheDirectory=','Auto-created writable dirs'],
      ['SystemCallFilter=@system-service','Allow-list of syscalls'],
      ['CapabilityBoundingSet=','Drop root powers']],
    example:{cmd:'systemd-analyze security myapp.service | tail -1', out:`→ Overall exposure level for myapp.service: 1.9 OK 🙂`},
    tip:'Add options one or two at a time and restart — the score goes from ~9.6 UNSAFE to under 2.' },

  { title:'Socket & Path Activation', icon:'🔌', badge:'ACTIVATE', color:'blue',
    code:
`# /etc/systemd/system/inbox.path  — run a job when a file appears
[Path]
PathChanged=/srv/inbox
Unit=process-inbox.service

[Install]
WantedBy=multi-user.target

# /etc/systemd/system/echo.socket — start the service on first connection
[Socket]
ListenStream=9999
Accept=yes

[Install]
WantedBy=sockets.target`,
    cmds:[
      ['sudo systemctl enable --now inbox.path','Watch a folder'],
      ['systemctl list-paths','Active path watchers'],
      ['sudo systemctl enable --now echo.socket',''],
      ['systemctl list-sockets','Listening sockets + units they activate'],
      ['systemctl status cockpit.socket','Real example: Cockpit starts on demand']],
    flags:[
      ['PathExists= / PathChanged= / PathModified=','Path triggers'],
      ['DirectoryNotEmpty=','Trigger while files are waiting'],
      ['ListenStream= / ListenDatagram=','TCP / UDP'],
      ['Accept=yes','One service instance per connection'],
      ['Unit=','Which service to start']],
    example:{cmd:'systemctl list-sockets | head -5', out:
`LISTEN                          UNIT                  ACTIVATES
/run/dbus/system_bus_socket     dbus.socket           dbus-broker.service
/run/systemd/journal/socket     systemd-journald.socket systemd-journald.service
[::]:9090                       cockpit.socket        cockpit.service
[::]:9999                       echo.socket           echo@*.service`} }
);
})();

/* ═════════════════ MORE SYSTEM (v2.14) ═════════════════ */
(function () {
const s = window.FB_DATA.find(x => x.id === 'system');
s.cards.push(
  { title:'Hostname & Machine Identity', icon:'🪪', badge:'IDENTITY', color:'blue',
    cmds:[
      ['hostnamectl','Everything at once'],
      ['sudo hostnamectl hostname fedora-ws','Set the hostname'],
      ['sudo hostnamectl hostname --pretty "Sooraj\'s Laptop"','Friendly name (shown in GNOME/Bluetooth)'],
      ['sudo hostnamectl chassis laptop','desktop, laptop, server, vm…'],
      ['sudo hostnamectl location "Doha office"',''],
      ['sudo hostnamectl deployment production',''],
      ['cat /etc/machine-id','Unique ID of this install'],
      ['hostnamectl --json=pretty','Machine-readable']],
    flags:[
      ['hostname <name>','Static hostname (/etc/hostname)'],
      ['--pretty / --static / --transient','Which name to set'],
      ['chassis / location / deployment','Extra metadata'],
      ['--json=short|pretty','JSON output']],
    example:{cmd:'hostnamectl | head -6', out:
` Static hostname: fedora-ws
 Pretty hostname: Sooraj's Laptop
       Icon name: computer-laptop
         Chassis: laptop 💻
        Location: Doha office
      Deployment: production`},
    tip:'After changing the hostname, reconnect SSH sessions and restart apps that cache it (or just reboot).' },

  { title:'What Am I Running On?', icon:'🧭', badge:'DETECT', color:'green',
    cmds:[
      ['systemd-detect-virt','none, kvm, vmware, oracle, wsl…'],
      ['systemd-detect-virt --container','Inside podman/toolbox?'],
      ['[ -d /sys/firmware/efi ] && echo UEFI || echo BIOS','Boot mode'],
      ['mokutil --sb-state','Secure Boot'],
      ['uname -m','Architecture (x86_64, aarch64)'],
      ['nproc','CPU threads'],
      ['rpm -E %fedora','Release number'],
      ['grep VARIANT_ID /etc/os-release','workstation, server, silverblue, kde…'],
      ['cat /sys/class/dmi/id/sys_vendor /sys/class/dmi/id/product_name','Maker + model'],
      ['test -f /run/ostree-booted && echo "Atomic desktop"','rpm-ostree system?']],
    flags:[
      ['--vm / --container','Only check one kind'],
      ['-q','Quiet: exit code only (scripts)'],
      ['uname -r / -m / -a','Kernel / arch / all'],
      ['getconf LONG_BIT','32 or 64-bit userland']],
    example:{cmd:'systemd-detect-virt; uname -m; rpm -E %fedora; grep VARIANT_ID /etc/os-release', out:
`none
x86_64
44
VARIANT_ID=workstation`} },

  { title:'Kernel Tunables (sysctl)', icon:'🎚️', badge:'SYSCTL', color:'warn',
    cmds:[
      ['sysctl -a | less','Every tunable'],
      ['sysctl vm.swappiness','Read one'],
      ['sudo sysctl -w net.ipv4.ip_forward=1','Change now (until reboot)'],
      ['echo "net.ipv4.ip_forward = 1" | sudo tee /etc/sysctl.d/90-forward.conf','Make it permanent'],
      ['echo "fs.inotify.max_user_watches = 524288" | sudo tee /etc/sysctl.d/90-inotify.conf','For IDEs / file watchers'],
      ['sudo sysctl --system','Reload all sysctl.d files'],
      ['systemd-sysctl --cat-config | grep -v "^#" | grep .','Effective config from all files'],
      ['ls /usr/lib/sysctl.d/','Fedora\'s defaults (don\'t edit)']],
    flags:[
      ['-w key=value','Write'],
      ['-p <file>','Load a specific file'],
      ['--system','Load all config dirs'],
      ['/etc/sysctl.d/NN-name.conf','Your settings (higher NN wins)'],
      ['/proc/sys/…','Same values as files']],
    table:{head:['Common tunable','Why change it'], rows:[
      ['vm.swappiness','Swap eagerness (Fedora: zram, default 60 is fine)'],
      ['net.ipv4.ip_forward','Routing / VPN server / NAT'],
      ['fs.inotify.max_user_watches','"Too many open files" in VS Code, Dropbox…'],
      ['kernel.sysrq','Enable Magic SysRq keys'],
      ['net.core.default_qdisc / tcp_congestion_control','fq + bbr for faster uploads']]},
    example:{cmd:'sysctl vm.swappiness net.ipv4.ip_forward fs.inotify.max_user_watches', out:
`vm.swappiness = 60
net.ipv4.ip_forward = 0
fs.inotify.max_user_watches = 524288`} },

  { title:'Peek into /proc and /sys', icon:'🔭', badge:'PROC', color:'blue',
    cmds:[
      ['grep -m1 "model name" /proc/cpuinfo','CPU model'],
      ['grep -E "MemTotal|MemAvailable|SwapTotal" /proc/meminfo','Memory'],
      ['cat /proc/loadavg','Load averages + running/total tasks'],
      ['cat /proc/cmdline','Kernel boot parameters'],
      ['cat /proc/version','Kernel build info'],
      ['cat /proc/$$/status | head','Your shell\'s process info'],
      ['ls /sys/class/net','Network interfaces'],
      ['cat /sys/block/nvme0n1/queue/scheduler','I/O scheduler'],
      ['cat /sys/class/backlight/*/brightness','Screen brightness'],
      ['cat /sys/class/thermal/thermal_zone*/temp','Temperatures (millidegrees)']],
    flags:[
      ['/proc/<pid>/','Per-process: status, cmdline, fd/, environ'],
      ['/proc/sys/','Tunables (sysctl)'],
      ['/sys/class/','Devices by type'],
      ['/sys/block/','Disks'],
      ['$$','PID of the current shell']],
    example:{cmd:'cat /proc/loadavg; cat /proc/cmdline', out:
`0.42 0.37 0.31 2/1284 91234
BOOT_IMAGE=(hd0,gpt2)/vmlinuz-6.19.8-200.fc44.x86_64 root=UUID=9e3f…1c44 ro rootflags=subvol=root rhgb quiet`},
    tip:'Everything in <code>/proc</code> and <code>/sys</code> is generated live by the kernel — nothing is stored on disk.' },

  { title:'System-wide Environment & Login Scripts', icon:'🌐', badge:'PROFILE', color:'blue', tableFirst:true,
    table:{head:['File','Applies to'], rows:[
      ['/etc/environment','All sessions — plain KEY=value, no $expansion'],
      ['/etc/profile.d/*.sh','Every login shell, all users'],
      ['/etc/bashrc','Every interactive bash, all users'],
      ['~/.bash_profile','Your login shells (sources ~/.bashrc)'],
      ['~/.bashrc  and  ~/.bashrc.d/*','Your interactive shells'],
      ['~/.config/environment.d/*.conf','Your graphical session + user services']]},
    cmds:[
      ['echo "EDITOR=vim" | sudo tee -a /etc/environment','Everyone, everywhere'],
      ['echo \'export PATH="$PATH:/opt/tools/bin"\' | sudo tee /etc/profile.d/tools.sh','All users\' login shells'],
      ['mkdir -p ~/.config/environment.d && echo "GTK_THEME=Adwaita:dark" > ~/.config/environment.d/theme.conf','GUI apps too (re-login)'],
      ['systemctl --user show-environment','What your session has'],
      ['bash -l -c "echo $PATH"','Test as a login shell']],
    flags:[
      ['login shell','TTY, SSH, su -'],
      ['interactive shell','Every terminal tab'],
      ['environment.d','Affects apps started from GNOME'],
      ['/etc/environment','Read by PAM, very early']],
    example:{cmd:'systemctl --user show-environment | grep -E "^(EDITOR|GTK_THEME|XDG_SESSION_TYPE)="', out:
`EDITOR=vim
GTK_THEME=Adwaita:dark
XDG_SESSION_TYPE=wayland`},
    tip:'Variables set only in <code>~/.bashrc</code> are invisible to apps you launch from the GNOME app grid — use environment.d for those.' },

  { title:'Alternatives (Default Versions)', icon:'🔀', badge:'ALT', color:'blue',
    cmds:[
      ['alternatives --list','Everything managed'],
      ['alternatives --display java','Choices + current'],
      ['sudo alternatives --config java','Pick interactively'],
      ['sudo alternatives --set java /usr/lib/jvm/java-21-openjdk/bin/java','Pick in a script'],
      ['sudo alternatives --auto java','Back to highest priority'],
      ['readlink -f $(which java)','What actually runs'],
      ['ls -l /etc/alternatives/ | head','The symlinks behind it']],
    flags:[
      ['--list','All groups'],
      ['--display <name>','Details'],
      ['--config <name>','Interactive menu'],
      ['--set <name> <path>','Non-interactive'],
      ['--auto <name>','Automatic mode'],
      ['--install','Register a new choice (packagers)']],
    example:{cmd:'alternatives --display java | head -4', out:
`java - status is manual.
 link currently points to /usr/lib/jvm/java-21-openjdk/bin/java
/usr/lib/jvm/java-21-openjdk/bin/java - family java-21-openjdk.x86_64 priority 21000001
/usr/lib/jvm/java-25-openjdk/bin/java - family java-25-openjdk.x86_64 priority 25000001`} },

  { title:'Kernel Modules & initramfs', icon:'🧱', badge:'MODULES', color:'warn',
    cmds:[
      ['lsmod | head','Loaded modules'],
      ['modinfo -p kvm_amd','Parameters a module accepts'],
      ['echo "vfio-pci" | sudo tee /etc/modules-load.d/vfio.conf','Load at every boot'],
      ['echo "blacklist pcspkr" | sudo tee /etc/modprobe.d/no-beep.conf','Never auto-load'],
      ['echo "options kvm_amd nested=1" | sudo tee /etc/modprobe.d/kvm.conf','Set a module option'],
      ['cat /sys/module/kvm_amd/parameters/nested','Check the live value'],
      ['sudo dracut -f','Rebuild initramfs for the running kernel'],
      ['sudo dracut -f --regenerate-all','…for all installed kernels'],
      ['lsinitrd | grep -i nvidia','What\'s inside the initramfs']],
    flags:[
      ['/etc/modules-load.d/*.conf','Modules to load'],
      ['/etc/modprobe.d/*.conf','blacklist / options / install'],
      ['modprobe -r','Unload'],
      ['dracut -f','Force rebuild'],
      ['dracut --regenerate-all','Every kernel'],
      ['rd.driver.blacklist=<mod>','Kernel arg: block in initramfs too']],
    example:{cmd:'cat /sys/module/kvm_amd/parameters/nested', out:`1`},
    tip:'Blacklisting a driver that\'s in the initramfs (e.g. nouveau) needs <code>dracut -f</code> too, or it still loads early.' },

  { title:'Temporary Files (tmpfiles.d)', icon:'🧺', badge:'TMP', color:'blue',
    code:
`# /etc/tmpfiles.d/myapp.conf
# Type Path            Mode User  Group Age
d      /run/myapp      0755 myapp myapp -
d      /var/cache/myapp 0750 myapp myapp 14d
e      /var/tmp/scratch -   -     -     3d`,
    cmds:[
      ['findmnt /tmp','Fedora: /tmp is RAM (tmpfs), wiped on reboot'],
      ['systemd-tmpfiles --cat-config | less','All rules from all packages'],
      ['sudo systemd-tmpfiles --create /etc/tmpfiles.d/myapp.conf','Apply a rule now'],
      ['sudo systemd-tmpfiles --clean','Run age-based cleanup now'],
      ['systemctl list-timers systemd-tmpfiles-clean.timer','Daily cleanup schedule']],
    flags:[
      ['d','Create dir (clean by age)'],
      ['e','Clean existing dir by age'],
      ['f / L / z','File / symlink / set label+mode'],
      ['Age 10d / 12h','Delete untouched content older than'],
      ['/var/tmp','Survives reboot; cleaned after 30 days']],
    example:{cmd:'findmnt /tmp', out:
`TARGET SOURCE FSTYPE OPTIONS
/tmp   tmpfs  tmpfs  rw,nosuid,nodev,size=16305952k,nr_inodes=1048576,inode64`},
    tip:'Big temporary files belong in <code>/var/tmp</code> — anything in <code>/tmp</code> uses RAM.' },

  { title:'Out-of-Memory Handling (systemd-oomd)', icon:'🧯', badge:'OOM', color:'red',
    cmds:[
      ['oomctl','What oomd is watching + current pressure'],
      ['systemctl status systemd-oomd',''],
      ['journalctl -u systemd-oomd -b','Did it kill something this boot?'],
      ['sudo dmesg -T | grep -i "out of memory"','Kernel OOM killer events'],
      ['cat /proc/$(pgrep -n firefox)/oom_score','How likely a process is to be killed'],
      ['choom -p $(pgrep -n myapp) -n -500','Protect a process (lower = safer)'],
      ['sudo systemctl edit myapp','Service-level: OOMScoreAdjust=-500']],
    flags:[
      ['ManagedOOMMemoryPressure=kill','Unit: let oomd act on it'],
      ['ManagedOOMMemoryPressureLimit=80%','Pressure threshold'],
      ['OOMScoreAdjust=-1000..1000','Unit: kernel OOM preference'],
      ['choom -n','Adjust a running process'],
      ['/etc/systemd/oomd.conf.d/','Global oomd settings']],
    example:{cmd:'journalctl -u systemd-oomd -b --no-pager | tail -2', out:
`Sep 30 00:21:44 fedora-ws systemd-oomd[912]: Considered 42 cgroups for killing, top candidates were:
Sep 30 00:21:44 fedora-ws systemd-oomd[912]: Killed /user.slice/user-1000.slice/user@1000.service/app.slice/app-gnome-chrome-4410.scope due to memory pressure for /user.slice/user-1000.slice/user@1000.service being 72.41% > 50.00% for > 20s with reclaim activity`},
    tip:'When apps "just disappear" under heavy load, this log is usually why.' },

  { title:'System Report for Support (sos)', icon:'📦', badge:'SOS', color:'green',
    cmds:[
      ['sudo dnf install sos',''],
      ['sudo sos report --batch','Collect config + logs into one archive'],
      ['sudo sos report -o networking,process,systemd --batch','Only some plugins'],
      ['sos report -l','List plugins'],
      ['sudo sos clean /var/tmp/sosreport-*.tar.xz','Obfuscate hostnames, IPs, usernames'],
      ['ls -lh /var/tmp/sosreport-*','Where it is saved']],
    flags:[
      ['--batch','No questions'],
      ['-o <plugins>','Only these'],
      ['-n <plugins>','Skip these'],
      ['--clean','Obfuscate while collecting'],
      ['--label <text>','Add to filename']],
    example:{cmd:'sudo sos report --batch --clean | tail -4', out:
`Your sos report has been generated and saved in:
	/var/tmp/sosreport-fedora-ws-2026-09-30-kxqmqzc-obfuscated.tar.xz

 Size	9.82MiB`},
    warn:'Even cleaned reports can contain sensitive config. Review before sharing publicly.' }
);
})();

/* ═════════════════ MORE FIREWALL (v2.15) ═════════════════ */
(function () {
const f = window.FB_DATA.find(x => x.id === 'firewall');
f.cards.push(
  { title:'Common Recipes', icon:'🍳', badge:'RECIPES', color:'green',
    cmds:[
      ['sudo firewall-cmd --permanent --add-service={http,https} && sudo firewall-cmd --reload','Web server'],
      ['sudo firewall-cmd --permanent --add-service=ssh --zone=public','SSH (on by default)'],
      ['sudo firewall-cmd --permanent --add-service=kdeconnect','KDE Connect / GSConnect'],
      ['sudo firewall-cmd --permanent --add-service=syncthing','Syncthing'],
      ['sudo firewall-cmd --permanent --add-service=samba','Windows file sharing'],
      ['sudo firewall-cmd --permanent --add-service={nfs,mountd,rpc-bind}','NFS (incl. v3)'],
      ['sudo firewall-cmd --permanent --add-service=cockpit','Cockpit on :9090'],
      ['sudo firewall-cmd --permanent --add-port=25565/tcp','Minecraft server'],
      ['sudo firewall-cmd --permanent --add-service=mdns','Printer / device discovery'],
      ['sudo firewall-cmd --reload','Apply everything above']],
    flags:[
      ['--add-service={a,b,c}','Several at once (bash braces)'],
      ['--get-services','All ~200 predefined service names'],
      ['--info-service=<name>','Which ports a service opens'],
      ['--zone=<z>','Target zone (default: default zone)']],
    example:{cmd:'firewall-cmd --info-service=kdeconnect', out:
`kdeconnect
  ports: 1714-1764/tcp 1714-1764/udp
  protocols:
  source-ports:
  modules:
  destination:
  includes:
  helpers:`},
    tip:'Prefer service names over raw ports — they document <i>why</i> a port is open.' },

  { title:'Zones per Interface & Source', icon:'🗺️', badge:'ZONES+', color:'blue',
    cmds:[
      ['firewall-cmd --get-active-zones','Which zone each interface/source uses'],
      ['firewall-cmd --get-zone-of-interface=wlp4s0',''],
      ['nmcli con mod "HomeWiFi" connection.zone home','Home Wi-Fi → home zone (preferred way)'],
      ['nmcli con mod "CafeWiFi" connection.zone public','Café Wi-Fi → strict zone'],
      ['sudo firewall-cmd --permanent --zone=trusted --add-source=192.168.1.50','Trust one machine'],
      ['sudo firewall-cmd --permanent --zone=internal --add-source=10.8.0.0/24','VPN clients get internal rules'],
      ['firewall-cmd --get-zone-of-source=192.168.1.50',''],
      ['sudo firewall-cmd --permanent --new-zone=lab && sudo firewall-cmd --reload','Your own zone']],
    flags:[
      ['--add-source=<ip|cidr|ipset:name>','Match by sender'],
      ['--add-interface / --change-interface','Match by interface'],
      ['connection.zone','NetworkManager: zone per connection'],
      ['--new-zone / --delete-zone','Custom zones (permanent only)'],
      ['--set-target=ACCEPT|DROP|REJECT|default','What happens to unmatched traffic']],
    example:{cmd:'firewall-cmd --get-active-zones', out:
`FedoraWorkstation (default)
  interfaces: enp3s0
home
  interfaces: wlp4s0
trusted
  sources: 192.168.1.50`},
    tip:'Source-based zones win over interface zones — a trusted IP gets trusted rules on any interface.' },

  { title:'Create a Custom Service', icon:'🧩', badge:'SERVICE', color:'blue',
    desc:'The commands below generate <code>/etc/firewalld/services/myapp.xml</code>, shown in the box.',
    cmds:[
      ['sudo firewall-cmd --permanent --new-service=myapp',''],
      ['sudo firewall-cmd --permanent --service=myapp --set-description="My web app + metrics"',''],
      ['sudo firewall-cmd --permanent --service=myapp --add-port=8080/tcp',''],
      ['sudo firewall-cmd --permanent --service=myapp --add-port=9100/tcp',''],
      ['sudo firewall-cmd --reload',''],
      ['sudo firewall-cmd --permanent --add-service=myapp && sudo firewall-cmd --reload','Use it'],
      ['cat /etc/firewalld/services/myapp.xml','The file it created'],
      ['sudo firewall-cmd --permanent --delete-service=myapp','Remove it']],
    code:
`<?xml version="1.0" encoding="utf-8"?>
<service>
  <short>myapp</short>
  <description>My web app + metrics</description>
  <port protocol="tcp" port="8080"/>
  <port protocol="tcp" port="9100"/>
</service>`,
    flags:[
      ['--new-service=<name>','Create (permanent)'],
      ['--service=<n> --add-port=','Add a port to it'],
      ['--new-service-from-file=<xml>','Import a definition'],
      ['/usr/lib/firewalld/services/','Built-in definitions'],
      ['/etc/firewalld/services/','Yours (override built-ins)']],
    example:{cmd:'firewall-cmd --info-service=myapp', out:
`myapp
  ports: 8080/tcp 9100/tcp
  protocols:
  description: My web app + metrics`} },

  { title:'IP Sets (Blocklists & Allowlists)', icon:'🚫', badge:'IPSET', color:'red',
    cmds:[
      ['sudo firewall-cmd --permanent --new-ipset=blocklist --type=hash:net',''],
      ['sudo firewall-cmd --permanent --ipset=blocklist --add-entry=203.0.113.0/24','Add a network'],
      ['sudo firewall-cmd --permanent --ipset=blocklist --add-entries-from-file=bad-ips.txt','Bulk add'],
      ['sudo firewall-cmd --permanent --zone=drop --add-source=ipset:blocklist','Drop everything from it'],
      ['sudo firewall-cmd --reload',''],
      ['firewall-cmd --ipset=blocklist --get-entries','See entries'],
      ['firewall-cmd --ipset=blocklist --query-entry=203.0.113.7','Is this IP blocked?'],
      ['sudo firewall-cmd --permanent --ipset=blocklist --remove-entry=203.0.113.0/24','Unblock']],
    flags:[
      ['--type=hash:ip','Single addresses'],
      ['--type=hash:net','Networks (CIDR)'],
      ['--option=family=inet6','IPv6 set'],
      ['--option=timeout=3600','Entries expire (runtime sets)'],
      ['ipset:<name>','Use a set as a zone source']],
    example:{cmd:'firewall-cmd --ipset=blocklist --get-entries', out:
`203.0.113.0/24
198.51.100.23`},
    tip:'Thousands of IPs in one ipset are far faster than thousands of rich rules.' },

  { title:'Router: Policies, NAT & Forwarding', icon:'🔀', badge:'ROUTER', color:'warn',
    cmds:[
      ['# Share internet from "external" zone to "internal" LAN:',''],
      ['echo "net.ipv4.ip_forward = 1" | sudo tee /etc/sysctl.d/90-forward.conf && sudo sysctl --system','Allow routing'],
      ['sudo firewall-cmd --permanent --zone=external --change-interface=enp3s0','WAN side (masquerade on by default)'],
      ['sudo firewall-cmd --permanent --zone=internal --change-interface=enp4s0','LAN side'],
      ['sudo firewall-cmd --permanent --new-policy=lan-to-wan',''],
      ['sudo firewall-cmd --permanent --policy=lan-to-wan --add-ingress-zone=internal',''],
      ['sudo firewall-cmd --permanent --policy=lan-to-wan --add-egress-zone=external',''],
      ['sudo firewall-cmd --permanent --policy=lan-to-wan --set-target=ACCEPT',''],
      ['sudo firewall-cmd --permanent --zone=external --add-forward-port=port=8080:proto=tcp:toport=80:toaddr=192.168.10.20','Port-forward to an inner server'],
      ['sudo firewall-cmd --reload && firewall-cmd --list-all-policies','']],
    flags:[
      ['--new-policy / --policy=<p>','Traffic between zones'],
      ['--add-ingress-zone / --add-egress-zone','From / to'],
      ['HOST / ANY','Special zones: this machine / all'],
      ['--add-masquerade','Source NAT (hide LAN behind WAN IP)'],
      ['toaddr=','Forward to another machine'],
      ['--set-priority=N','Policy order']],
    example:{cmd:'firewall-cmd --info-policy=lan-to-wan', out:
`lan-to-wan (active)
  priority: -1
  target: ACCEPT
  ingress-zones: internal
  egress-zones: external
  services:
  ports:
  masquerade: no`},
    warn:'Build router setups from a local console — a mistake here can cut off remote access.' },

  { title:'Rate Limiting & Logged Rules', icon:'⏱️', badge:'LIMIT', color:'warn',
    cmds:[
      ['sudo firewall-cmd --permanent --remove-service=ssh','Replace plain SSH access…'],
      ['sudo firewall-cmd --permanent --add-rich-rule=\'rule service name="ssh" log prefix="SSH " level="info" limit value="3/m" accept\'','…with logged, max 3 new/min'],
      ['sudo firewall-cmd --permanent --add-rich-rule=\'rule family="ipv4" source address="192.168.1.0/24" service name="ssh" accept\'','LAN unlimited'],
      ['sudo firewall-cmd --permanent --add-rich-rule=\'rule port port="8080" protocol="tcp" reject type="tcp-reset"\'','Reject politely'],
      ['sudo firewall-cmd --reload',''],
      ['journalctl -k -g "SSH " --since "1 hour ago"','See logged SSH attempts'],
      ['firewall-cmd --list-rich-rules','']],
    flags:[
      ['limit value="N/s|m|h|d"','Rate limit matches'],
      ['log prefix="…" level="info"','Log matches to the kernel log'],
      ['audit','Log via audit instead'],
      ['accept | reject | drop | mark','Action'],
      ['priority="-10"','Order among rich rules (lower first)']],
    example:{cmd:'journalctl -k -g "SSH " -n 2 --no-pager', out:
`Sep 30 01:38:14 fedora-ws kernel: SSH IN=enp3s0 OUT= SRC=198.51.100.23 DST=192.168.1.42 PROTO=TCP SPT=40522 DPT=22 SYN
Sep 30 01:38:19 fedora-ws kernel: SSH IN=enp3s0 OUT= SRC=198.51.100.23 DST=192.168.1.42 PROTO=TCP SPT=40528 DPT=22 SYN`},
    tip:'For real brute-force protection, combine this with fail2ban (Security → Brute-force Protection).' },

  { title:'Ping & ICMP', icon:'🏓', badge:'ICMP', color:'blue',
    cmds:[
      ['firewall-cmd --get-icmptypes | tr " " "\\n" | head','Known ICMP types'],
      ['sudo firewall-cmd --permanent --add-icmp-block=echo-request','Don\'t answer ping'],
      ['sudo firewall-cmd --permanent --remove-icmp-block=echo-request','Answer again'],
      ['firewall-cmd --query-icmp-block=echo-request','Is ping blocked?'],
      ['sudo firewall-cmd --permanent --add-icmp-block-inversion','Invert: block ALL ICMP except listed'],
      ['sudo firewall-cmd --reload','']],
    flags:[
      ['--add-icmp-block=<type>','Block one type'],
      ['--add-icmp-block-inversion','Allow-list mode'],
      ['echo-request','= incoming ping'],
      ['destination-unreachable, packet-too-big','Never block these (breaks networking)']],
    example:{cmd:'firewall-cmd --query-icmp-block=echo-request', out:`yes`},
    warn:'Blocking all ICMP breaks path-MTU discovery and IPv6. Block only <code>echo-request</code> if you must.' },

  { title:'Safe Changes: Test, Back Up, Reset', icon:'🛟', badge:'SAFE', color:'green',
    cmds:[
      ['sudo firewall-cmd --add-port=3000/tcp --timeout=10m','Try a rule; it vanishes after 10 min'],
      ['sudo firewall-cmd --runtime-to-permanent','Happy? Keep current runtime rules'],
      ['diff <(sudo firewall-cmd --list-all) <(sudo firewall-cmd --permanent --list-all)','Runtime vs permanent differences'],
      ['sudo tar -czf firewalld-backup-$(date +%F).tgz -C /etc firewalld','Back up your config'],
      ['sudo firewall-cmd --check-config','Validate XML before reload'],
      ['sudo firewall-cmd --reload','Load permanent config (keeps connections)'],
      ['sudo firewall-cmd --complete-reload','Full reload (drops state — last resort)'],
      ['sudo firewall-cmd --reset-to-defaults','Back to Fedora\'s factory config']],
    flags:[
      ['--timeout=<t>','Auto-expiring runtime rule'],
      ['--runtime-to-permanent','Commit runtime'],
      ['--permanent','Only edits config files'],
      ['--reload / --complete-reload','Soft / hard reload'],
      ['--reset-to-defaults','Remove all your changes']],
    example:{cmd:'sudo firewall-cmd --add-port=3000/tcp --timeout=10m && firewall-cmd --list-ports', out:
`success
3000/tcp`},
    tip:'On a remote server: add the new rule with <code>--timeout</code>, check you can still connect, then make it permanent.' },

  { title:'Test From Outside', icon:'🔭', badge:'TEST', color:'blue',
    cmds:[
      ['sudo ss -tlnp','What is listening locally'],
      ['nc -zv 192.168.1.42 22 80 443','From another machine: which ports answer'],
      ['nmap -Pn -p 22,80,443,8080 192.168.1.42','Open / closed / filtered'],
      ['nmap -Pn --top-ports 100 192.168.1.42','Most common ports'],
      ['curl -sI http://192.168.1.42','Web server reachable?'],
      ['journalctl -k -g REJECT -f','On the server: watch rejects live (needs --set-log-denied)']],
    flags:[
      ['open','Service listening + firewall allows'],
      ['closed','Firewall allows, nothing listening'],
      ['filtered','Firewall drops (no reply)'],
      ['nmap -Pn','Skip ping (for hosts that block it)'],
      ['nmap -sU','UDP scan (slow, needs root)']],
    example:{cmd:'nmap -Pn -p 22,80,443,8080 192.168.1.42', out:
`Starting Nmap 7.95 ( https://nmap.org ) at 2026-09-30 01:40 +03
Nmap scan report for 192.168.1.42
PORT     STATE    SERVICE
22/tcp   open     ssh
80/tcp   open     http
443/tcp  closed   https
8080/tcp filtered http-proxy`},
    warn:'Only scan machines you own or are authorised to test.' },

  { title:'GUI, Config Files & nftables', icon:'🖱️', badge:'GUI', color:'blue',
    cmds:[
      ['sudo dnf install firewall-config','Graphical firewall editor'],
      ['firewall-config','Runtime / Permanent switch at top'],
      ['ls /etc/firewalld/zones/','Your zone changes (XML)'],
      ['cat /etc/firewalld/zones/public.xml',''],
      ['grep -E "DefaultZone|FirewallBackend|LogDenied" /etc/firewalld/firewalld.conf','Global settings'],
      ['sudo nft list table inet firewalld | less','Rules firewalld generated'],
      ['# Cockpit → Networking → Firewall also works in a browser','']],
    flags:[
      ['/usr/lib/firewalld/','Built-in defaults'],
      ['/etc/firewalld/','Your config (overrides)'],
      ['FirewallBackend=nftables','Default backend'],
      ['DefaultZone=','Default zone'],
      ['firewall-cmd --state','Is firewalld running?']],
    example:{cmd:'cat /etc/firewalld/zones/home.xml', out:
`<?xml version="1.0" encoding="utf-8"?>
<zone>
  <short>Home</short>
  <service name="ssh"/>
  <service name="mdns"/>
  <service name="samba-client"/>
  <service name="dhcpv6-client"/>
  <service name="kdeconnect"/>
</zone>`},
    tip:'Don\'t mix raw <code>nft</code> or <code>iptables</code> rules with firewalld — a reload wipes them. Use rich rules or policies.' }
);
})();

/* ═════════════════ MORE SELINUX (v2.16) ═════════════════ */
(function () {
const s = window.FB_DATA.find(x => x.id === 'selinux');

// Concepts first — everything else makes more sense after it
s.cards.unshift({ title:'How SELinux Thinks', icon:'🧠', badge:'CONCEPTS', color:'green', tableFirst:true,
  desc:'Every process and file has a label. The policy lists which process <b>types</b> may do what to which file <b>types</b>. Anything not allowed is denied — even for root. A full label looks like <code>system_u:object_r:httpd_sys_content_t:s0</code>:',
  table:{head:['Part','Meaning'], rows:[
    ['system_u','SELinux user (maps from Linux users)'],
    ['object_r','Role (object_r for files)'],
    ['httpd_sys_content_t','TYPE — the part that matters 95% of the time'],
    ['s0','Sensitivity level (MLS/MCS; containers use categories like s0:c1,c2)'],
    ['targeted policy','Fedora default: only services are confined; your desktop apps run unconfined_t'],
    ['_t / _u / _r','Suffix naming: type / user / role']]},
  cmds:[
    ['ls -Z /var/www/html/index.html','Label of a file'],
    ['ps -eZ | grep -E "httpd|sshd"','Labels of processes (domains)'],
    ['id -Z','Your own label'],
    ['sestatus | grep "Loaded policy"','Which policy is loaded']],
  flags:[
    ['domain','A process type, e.g. httpd_t'],
    ['type enforcement','Rules like "httpd_t may read httpd_sys_content_t"'],
    ['unconfined_t','Almost unrestricted (your shell, most desktop apps)'],
    ['AVC denial','A blocked action, logged to the audit log']],
  example:{cmd:'ps -eZ | grep -E "sshd|nginx" | head -3', out:
`system_u:system_r:sshd_t:s0-s0:c0.c1023   1123 ?  00:00:00 sshd
system_u:system_r:httpd_t:s0              2210 ?  00:00:00 nginx
system_u:system_r:httpd_t:s0              2211 ?  00:00:01 nginx`},
  tip:'Rule of thumb: if something works with <code>setenforce 0</code> but not with <code>1</code>, it\'s almost always a <b>label</b>, a <b>boolean</b> or a <b>port</b> — in that order.' });

s.cards.push(
  { title:'Reading an AVC Denial', icon:'🧾', badge:'AVC', color:'warn', tableFirst:true,
    table:{head:['Field','In the example below'], rows:[
      ['denied { … }','read — the action that was blocked'],
      ['comm= / pid=','"nginx" pid 2210 — who tried'],
      ['name= / path=','index.html — what it touched'],
      ['scontext=','httpd_t — the process\' type'],
      ['tcontext=','user_home_t — the file\'s type (wrong one!)'],
      ['tclass=','file — kind of object (file, dir, tcp_socket…)'],
      ['permissive=0','It was actually blocked (1 = only logged)']]},
    cmds:[
      ['sudo ausearch -m AVC,USER_AVC -ts recent','Last 10 minutes'],
      ['sudo ausearch -m AVC -ts today -c nginx','Today, one program'],
      ['sudo ausearch -m AVC -ts recent -i','Interpreted (readable times/UIDs)'],
      ['sudo ausearch -m AVC -ts today | audit2why','Why + likely fix'],
      ['sudo sealert -a /var/log/audit/audit.log | less','Every denial explained'],
      ['sudo journalctl -t setroubleshoot --since today','setroubleshoot summaries in the journal']],
    flags:[
      ['-ts recent|today|boot|this-week','Time window'],
      ['-c <comm>','By program name'],
      ['-i','Interpret numeric fields'],
      ['audit2why','Explains boolean/label/policy cause']],
    example:{cmd:'sudo ausearch -m AVC -ts recent -i | tail -1', out:
`type=AVC msg=audit(09/30/2026 01:44:12.418:612) : avc:  denied  { read } for  pid=2210 comm=nginx name=index.html dev="nvme0n1p3" ino=88213 scontext=system_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:user_home_t:s0 tclass=file permissive=0`},
    tip:'<code>tcontext=user_home_t</code> on web files means they were <b>moved</b> from your home folder — <code>restorecon -Rv</code> fixes it.' },

  { title:'Ports', icon:'🚪', badge:'PORTS', color:'blue',
    cmds:[
      ['sudo semanage port -l | grep -E "^http_port_t|^ssh_port_t"','Which ports a type may use'],
      ['sudo semanage port -a -t http_port_t -p tcp 8081','Let web servers bind 8081'],
      ['sudo semanage port -a -t ssh_port_t -p tcp 2222','SSH on 2222'],
      ['sudo semanage port -m -t http_cache_port_t -p tcp 8081','Move a port to another type'],
      ['sudo semanage port -d -t http_port_t -p tcp 8081','Remove your rule'],
      ['sudo semanage port -l -C','Only your customisations'],
      ['sudo sepolicy network -p 8080','Which type owns a port']],
    flags:[
      ['-a / -m / -d','Add / modify / delete'],
      ['-t <type>','Port type'],
      ['-p tcp|udp','Protocol'],
      ['-l -C','List local changes only'],
      ['8000-8010','Ranges are allowed']],
    example:{cmd:'sudo semanage port -l | grep ^http_port_t', out:`http_port_t                    tcp      8081, 80, 81, 443, 488, 8008, 8009, 8443, 9000`},
    tip:'"Permission denied" binding a port as root usually means the port has the wrong SELinux type.' },

  { title:'File Context Rules (Deep)', icon:'🏷️', badge:'FCONTEXT', color:'blue',
    cmds:[
      ['sudo semanage fcontext -l | grep "/var/www"','Built-in rules'],
      ['sudo semanage fcontext -l -C','Your custom rules'],
      ['sudo semanage fcontext -a -t httpd_sys_rw_content_t "/srv/app/uploads(/.*)?"','Writable web dir'],
      ['sudo semanage fcontext -a -e /var/www /srv/www','Label /srv/www exactly like /var/www'],
      ['sudo semanage fcontext -d "/srv/app/uploads(/.*)?"','Delete a rule'],
      ['matchpathcon /srv/app/uploads/a.jpg','What the label SHOULD be'],
      ['sudo restorecon -Rnv /srv','Dry run: what would change'],
      ['sudo restorecon -RFv /srv','Force full reset (incl. user/role)'],
      ['sudo mv ~/index.html /var/www/html/ && sudo restorecon -v /var/www/html/index.html','mv keeps the OLD label — always restorecon after mv']],
    flags:[
      ['-a -t <type> "<regex>"','Add rule'],
      ['"(/.*)?"','The dir AND everything below'],
      ['-e <src> <dst>','Equivalence (dst like src)'],
      ['restorecon -n','Dry run'],
      ['restorecon -F','Force whole context'],
      ['chcon','Temporary — lost on relabel']],
    example:{cmd:'sudo restorecon -Rnv /srv/www', out:
`Would relabel /srv/www/index.html from unconfined_u:object_r:user_home_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0
Would relabel /srv/www/css/site.css from unconfined_u:object_r:user_home_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0`} },

  { title:'Useful Booleans', icon:'🔘', badge:'BOOLEANS', color:'green', tableFirst:true,
    table:{head:['Boolean','Turn on when…'], rows:[
      ['httpd_can_network_connect','Web server proxies to an app/API (nginx → :3000)'],
      ['httpd_can_network_connect_db','Web app talks to a database over the network'],
      ['httpd_enable_homedirs','Serving ~/public_html'],
      ['httpd_can_sendmail','Web app sends email'],
      ['httpd_use_nfs / httpd_use_cifs','Web content on NFS / SMB'],
      ['samba_enable_home_dirs','Sharing home directories with Samba'],
      ['samba_export_all_rw','Samba shares arbitrary dirs read-write (broad!)'],
      ['use_nfs_home_dirs','/home is on NFS'],
      ['container_manage_cgroup','systemd running inside containers'],
      ['virt_use_nfs / virt_use_samba','VM disk images on network storage'],
      ['ftpd_full_access','FTP server needs full file access']]},
    cmds:[
      ['getsebool -a | grep -E "httpd|samba"','Current values'],
      ['sudo semanage boolean -l | grep httpd_can_network','With descriptions'],
      ['sudo setsebool -P httpd_can_network_connect on','Persistent'],
      ['sudo semanage boolean -l -C','Only ones you changed'],
      ['sudo sesearch -A -b httpd_can_network_connect | head','What a boolean actually allows (setools-console)']],
    flags:[
      ['setsebool -P','Persist across reboot'],
      ['setsebool (no -P)','Runtime only — test first'],
      ['semanage boolean -l -C','Local changes'],
      ['on / off / 1 / 0','Values']],
    example:{cmd:'sudo semanage boolean -l | grep httpd_can_network_connect', out:
`httpd_can_network_connect      (on   ,   on)  Allow httpd to can network connect
httpd_can_network_connect_db   (off  ,  off)  Allow httpd to can network connect db`},
    tip:'Two values in brackets = (current, default after reboot). If they differ, you forgot <code>-P</code>.' },

  { title:'Query the Policy', icon:'🔎', badge:'QUERY', color:'blue',
    cmds:[
      ['sudo dnf install setools-console policycoreutils-devel',''],
      ['seinfo','Policy statistics'],
      ['seinfo -t | grep -c _t','How many types exist'],
      ['sesearch -A -s httpd_t -t httpd_sys_content_t -c file','What httpd may do to its content'],
      ['sesearch -A -s httpd_t -t user_home_t','Is httpd ever allowed into homes?'],
      ['sesearch -T -s unconfined_t -t httpd_exec_t','Domain transitions (starting a program)'],
      ['sepolicy booleans -b httpd_enable_homedirs','Describe a boolean'],
      ['sepolicy transition -s unconfined_t -t httpd_t','How a domain is entered'],
      ['sepolicy manpage -d httpd_t -p /tmp && man /tmp/httpd_selinux.8','Generated man page for a domain']],
    flags:[
      ['-A','Allow rules'],
      ['-T','Type transition rules'],
      ['-s / -t / -c','Source / target / class'],
      ['-b <bool>','Rules controlled by a boolean'],
      ['seinfo -t / -r / -u / -b','Types / roles / users / booleans']],
    example:{cmd:'sesearch -A -s httpd_t -t httpd_sys_content_t -c file', out:
`allow httpd_t httpd_sys_content_t:file { getattr ioctl lock map open read };`} },

  { title:'Hidden Denials & Safe Debugging', icon:'🕵️', badge:'DEBUG', color:'warn',
    cmds:[
      ['sudo semanage permissive -a httpd_t','Only nginx/httpd permissive — rest stays enforcing'],
      ['sudo semanage permissive -l','Which domains are permissive'],
      ['sudo semanage permissive -d httpd_t','Back to enforcing'],
      ['sudo semodule -DB','Disable "dontaudit" rules (reveal hidden denials)'],
      ['sudo ausearch -m AVC -ts recent','…reproduce the problem, read the extra denials…'],
      ['sudo semodule -B','Re-enable dontaudit (noisy otherwise!)'],
      ['sudo setenforce 0; ./test; sudo setenforce 1','Last resort, whole system, briefly']],
    flags:[
      ['semanage permissive -a <domain>','Log-only for one domain'],
      ['semodule -DB','Rebuild without dontaudit'],
      ['semodule -B','Rebuild normally'],
      ['permissive=1 in AVC','Logged but allowed']],
    example:{cmd:'sudo semanage permissive -l', out:
`Customized Permissive Types

httpd_t

Builtin Permissive Types
`},
    warn:'Don\'t leave domains permissive or <code>semodule -DB</code> active — remember to undo both.' },

  { title:'Custom Policy Modules', icon:'🧪', badge:'MODULE', color:'red',
    cmds:[
      ['sudo ausearch -m AVC -ts recent -c myapp | audit2allow','Preview rules that would allow it'],
      ['sudo ausearch -m AVC -ts recent -c myapp | audit2allow -M myapp_local','Build myapp_local.te + .pp'],
      ['cat myapp_local.te','READ IT before installing'],
      ['sudo semodule -i myapp_local.pp','Install'],
      ['sudo semodule -l | grep myapp','Is it loaded?'],
      ['sudo semodule -r myapp_local','Remove it'],
      ['sepolicy generate --init /usr/local/bin/myapp','Proper confined policy for your own daemon (skeleton)'],
      ['sudo ./myapp.sh','Build + install that generated policy']],
    code:
`# myapp_local.te — what audit2allow generates
module myapp_local 1.0;

require {
    type httpd_t;
    type var_lib_t;
    class file { read open getattr };
}

allow httpd_t var_lib_t:file { read open getattr };`,
    flags:[
      ['audit2allow -M <name>','Write module files'],
      ['audit2allow -R','Use interfaces (reference policy macros)'],
      ['semodule -i / -r / -l','Install / remove / list'],
      ['semodule -X 300','Priority (local modules)'],
      ['sepolicy generate --init|--application','Generate a new domain']],
    example:{cmd:'sudo semodule -l | grep local', out:`myapp_local`},
    danger:'audit2allow blindly allows whatever was denied. First try <code>restorecon</code>, a boolean or <code>semanage port</code> — a module is the last resort.' },

  { title:'Confined Users', icon:'👮', badge:'USERS', color:'blue',
    cmds:[
      ['sudo semanage login -l','Linux user → SELinux user mapping'],
      ['sudo semanage user -l','SELinux users + allowed roles'],
      ['sudo semanage login -a -s user_u guest','Guest: no sudo, no setuid, no network tools'],
      ['sudo semanage login -a -s staff_u alice','Admin who must switch role'],
      ['sudo semanage login -m -s unconfined_u alice','Back to normal'],
      ['echo "alice ALL=(ALL) TYPE=sysadm_t ROLE=sysadm_r ALL" | sudo tee /etc/sudoers.d/alice-sysadm','staff_u + sudo → sysadm role'],
      ['id -Z','Check after re-login']],
    flags:[
      ['unconfined_u','Default for everyone on Fedora'],
      ['user_u','Very limited: no su/sudo'],
      ['staff_u','Can sudo into sysadm_r'],
      ['guest_u / xguest_u','Terminal / browser-only kiosk'],
      ['-a / -m / -d','Add / modify / delete mapping']],
    example:{cmd:'sudo semanage login -l', out:
`Login Name           SELinux User         MLS/MCS Range        Service

__default__          unconfined_u         s0-s0:c0.c1023       *
alice                staff_u              s0-s0:c0.c1023       *
guest                user_u               s0                   *
root                 unconfined_u         s0-s0:c0.c1023       *`} },

  { title:'Containers & SELinux', icon:'🐳', badge:'CONTAINER', color:'green',
    cmds:[
      ['podman run -v ~/site:/usr/share/nginx/html:Z nginx','Private relabel: only this container'],
      ['podman run -v ~/shared:/data:z …','Shared relabel: all containers'],
      ['ls -dZ ~/site','Now container_file_t (with categories)'],
      ['ps -eZ | grep container_t','Containers run as container_t'],
      ['sudo setsebool -P container_manage_cgroup on','systemd inside containers'],
      ['podman run --security-opt label=disable …','Turn SELinux off for ONE container (debug)'],
      ['sudo dnf install udica','Generate a tailored container policy'],
      ['podman inspect web | udica web_policy','…from a running container']],
    flags:[
      [':Z','Relabel private (unique categories)'],
      [':z','Relabel shared'],
      ['container_file_t','Label containers may use'],
      ['--security-opt label=disable','Unconfined container'],
      ['--security-opt label=type:<t>','Custom type (e.g. from udica)']],
    example:{cmd:'ls -dZ ~/site', out:`system_u:object_r:container_file_t:s0:c214,c731 /home/sooraj/site`},
    warn:'Never use <code>:Z</code> on system directories like <code>/home</code> or <code>/etc</code> — it relabels everything under them.' },

  { title:'Relabel, Export & Import', icon:'📤', badge:'MANAGE', color:'blue',
    cmds:[
      ['sudo touch /.autorelabel && sudo reboot','Relabel the whole filesystem at next boot'],
      ['sudo fixfiles -F onboot','Same, via fixfiles'],
      ['sudo fixfiles -R nginx restore','Relabel files of one package'],
      ['sudo semanage export -f selinux-custom.txt','Export ALL your customisations'],
      ['sudo semanage import -f selinux-custom.txt','Apply them on another machine'],
      ['sudo dnf install setroubleshoot','Desktop notifications for denials'],
      ['sealert -b','setroubleshoot GUI browser']],
    flags:[
      ['/.autorelabel','Full relabel on boot (slow on big disks)'],
      ['fixfiles -R <pkg>','Per-package'],
      ['semanage export / import','Ports, fcontexts, booleans, logins, permissive'],
      ['sealert -a / -l / -b','Analyze file / one alert / browser']],
    example:{cmd:'sudo semanage export | head -5', out:
`boolean -D
login -D
port -D
fcontext -D
boolean -m -1 httpd_can_network_connect`},
    tip:'Keep <code>semanage export</code> output in your config repo — rebuilding a server\'s SELinux setup becomes one command.' }
);
})();

/* ═════════════════ MORE SECURITY (v2.17) ═════════════════ */
(function () {
const s = window.FB_DATA.find(x => x.id === 'security');

s.cards.unshift({ title:'Security Checklist', icon:'✅', badge:'START', color:'green', tableFirst:true,
  desc:'Ten quick checks for any Fedora machine, roughly in order of impact.',
  table:{mono:true, head:['Check','Command'], rows:[
    ['Updates applied','sudo dnf upgrade --refresh'],
    ['SELinux enforcing','getenforce'],
    ['Firewall running','sudo firewall-cmd --state'],
    ['What\'s listening','sudo ss -tulpn'],
    ['Enabled services','systemctl list-unit-files --state=enabled'],
    ['Admins (wheel)','getent group wheel'],
    ['SSH: no root, keys only','sudo sshd -T | grep -E "permitroot|passwordauth"'],
    ['Disk encrypted','lsblk -o NAME,TYPE,FSTYPE | grep crypt'],
    ['Failed logins','sudo lastb | head'],
    ['Secure Boot','mokutil --sb-state']]},
  cmds:[
    ['getenforce && sudo firewall-cmd --state && mokutil --sb-state','Three checks in one line'],
    ['sudo ss -tulpn | grep -v 127.0.0','Services reachable from the network'],
    ['dnf advisory list --security','Pending security fixes']],
  example:{cmd:'getenforce && sudo firewall-cmd --state && mokutil --sb-state', out:
`Enforcing
running
SecureBoot enabled`},
  tip:'Fedora is secure by default — most of this is about not undoing those defaults.' });

s.cards.push(
  { title:'Audit a System with Lynis', icon:'🔬', badge:'LYNIS', color:'blue',
    cmds:[
      ['sudo dnf install lynis',''],
      ['sudo lynis audit system','Full audit (~2 minutes)'],
      ['sudo lynis audit system --quick','No pauses'],
      ['sudo grep -E "^(warning|suggestion)" /var/log/lynis-report.dat | head','Findings from the report'],
      ['sudo lynis show details SSH-7408','Explain one finding'],
      ['sudo grep hardening_index /var/log/lynis-report.dat','Score out of 100']],
    flags:[
      ['audit system','Local host audit'],
      ['--quick / -Q','Don\'t wait for keypress'],
      ['--pentest','Non-privileged scan'],
      ['show details <TEST-ID>','Explanation + fix'],
      ['/var/log/lynis.log','Full log']],
    example:{cmd:'sudo lynis audit system --quick | tail -8', out:
`  Lynis security scan details:

  Hardening index : 72 [##############      ]
  Tests performed : 268
  Plugins enabled : 0

  Components:
  - Firewall               [V]`},
    tip:'Treat suggestions as a to-do list, not a score to max out — some don\'t fit desktops.' },

  { title:'auditd: Who Changed What?', icon:'📹', badge:'AUDIT', color:'warn',
    cmds:[
      ['sudo auditctl -w /etc/ssh/sshd_config -p wa -k sshd_config','Watch a file (runtime)'],
      ['sudo auditctl -w /etc/sudoers.d/ -p wa -k sudoers','Watch a directory'],
      ['sudo auditctl -l','Active rules'],
      ['echo "-w /etc/passwd -p wa -k identity" | sudo tee /etc/audit/rules.d/50-custom.rules','Persistent rule'],
      ['sudo augenrules --load','Load rules.d files'],
      ['sudo ausearch -k sshd_config -i','Who touched it, when, with what'],
      ['sudo aureport --summary','Overview'],
      ['sudo aureport -au --failed','Failed authentications'],
      ['sudo aureport -x --summary','Most-run executables']],
    flags:[
      ['-w <path>','Watch path'],
      ['-p r|w|x|a','Read / write / execute / attribute change'],
      ['-k <key>','Tag for searching'],
      ['ausearch -k <key> -i','Find by tag, interpreted'],
      ['aureport -l / -au / -x','Logins / auth / executables'],
      ['--failed / --success','Filter results']],
    example:{cmd:'sudo ausearch -k sshd_config -i | grep -E "type=SYSCALL" | tail -1', out:
`type=SYSCALL msg=audit(09/30/2026 01:49:07.211:733) : arch=x86_64 syscall=openat success=yes exit=3 comm=vim exe=/usr/bin/vim subj=unconfined_u:unconfined_r:unconfined_t:s0 key=sshd_config auid=sooraj uid=root`},
    tip:'<code>auid</code> is the user who originally logged in — it stays the same even after <code>sudo</code>.' },

  { title:'File Integrity Monitoring (AIDE)', icon:'🧬', badge:'AIDE', color:'blue',
    cmds:[
      ['sudo dnf install aide',''],
      ['sudo aide --init','Build the baseline database (a few minutes)'],
      ['sudo mv /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz','Activate it'],
      ['sudo aide --check','Compare the system against the baseline'],
      ['sudo aide --update','After legitimate changes (e.g. updates)'],
      ['sudo mv /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz','…activate the new baseline'],
      ['sudoedit /etc/aide.conf','What to watch'],
      ['sudo rpm -Va --nomtime | grep -v "^..5......  c"','Quick alternative: changed package files']],
    flags:[
      ['--init','Create baseline'],
      ['--check','Report changes'],
      ['--update','Report + write new db'],
      ['rpm -Va','Verify all packages'],
      ['S 5 M U G T','rpm -V: size, digest, mode, user, group, time changed']],
    example:{cmd:'sudo aide --check | head -8', out:
`Start timestamp: 2026-09-30 01:50:02 +0300 (AIDE 0.18.8)
AIDE found differences between database and filesystem!!

Summary:
  Total number of entries:	187342
  Added entries:		1
  Removed entries:		0
  Changed entries:		2`},
    tip:'Keep a copy of <code>aide.db.gz</code> off the machine — an attacker with root could rewrite it.' },

  { title:'Malware & Rootkit Scans', icon:'🦠', badge:'SCAN', color:'warn',
    cmds:[
      ['sudo dnf install clamav clamav-update',''],
      ['sudo freshclam','Update signatures'],
      ['clamscan -r -i ~/Downloads','Scan, show only infected'],
      ['clamscan -r -i --move=$HOME/quarantine ~/Downloads','Move infected files aside'],
      ['clamscan -r -i /run/media/$USER/USB','Scan a USB drive (e.g. before sharing with Windows users)'],
      ['sudo dnf install rkhunter',''],
      ['sudo rkhunter --update && sudo rkhunter --propupd','Update + baseline'],
      ['sudo rkhunter --check --sk','Rootkit check, no pauses']],
    flags:[
      ['-r','Recursive'],
      ['-i','Only print infected'],
      ['--move=<dir> / --remove','Quarantine / delete'],
      ['--exclude-dir=<regex>','Skip folders'],
      ['rkhunter --sk','Skip keypress'],
      ['rkhunter --propupd','Re-baseline after updates']],
    example:{cmd:'clamscan -r -i ~/Downloads | tail -8', out:
`/home/sooraj/Downloads/invoice.zip: Win.Trojan.Agent-1234567 FOUND

----------- SCAN SUMMARY -----------
Known viruses: 8712944
Scanned directories: 41
Scanned files: 612
Infected files: 1
Time: 38.402 sec (0 m 38 s)`},
    tip:'Linux malware is rare; ClamAV is most useful for files you pass on to Windows users or mail servers.' },

  { title:'Logins: authselect, Fingerprint & 2FA', icon:'🔐', badge:'AUTH', color:'red',
    cmds:[
      ['authselect current','Active profile + features'],
      ['authselect list-features local','What you can turn on'],
      ['sudo authselect enable-feature with-faillock','Lock after repeated failures'],
      ['fprintd-enroll','Register a fingerprint'],
      ['sudo authselect enable-feature with-fingerprint','Use it for login + sudo'],
      ['sudo dnf install pam-u2f pamu2fcfg',''],
      ['mkdir -p ~/.config/Yubico && pamu2fcfg > ~/.config/Yubico/u2f_keys','Register a security key'],
      ['sudo authselect enable-feature with-pam-u2f','Security key for login + sudo'],
      ['sudo dnf install google-authenticator qrencode && google-authenticator','TOTP codes (for SSH)'],
      ['authselect check','Config not modified by hand?']],
    flags:[
      ['with-faillock','Account lockout'],
      ['with-fingerprint','fprintd'],
      ['with-pam-u2f','YubiKey / FIDO2'],
      ['with-pam-u2f-2fa','Key REQUIRED in addition to password'],
      ['with-mkhomedir','Create home on first login'],
      ['disable-feature <f>','Undo']],
    example:{cmd:'authselect current', out:
`Profile ID: local
Enabled features:
- with-faillock
- with-fingerprint
- with-silent-lastlog`},
    danger:'Test a new login method in a second session (or TTY) before logging out — a mistake can lock you out of sudo.' },

  { title:'USBGuard: Block Unknown USB Devices', icon:'🔌', badge:'USB', color:'warn',
    cmds:[
      ['sudo dnf install usbguard',''],
      ['sudo usbguard generate-policy > /tmp/rules.conf','Allow everything plugged in NOW'],
      ['sudo install -m 0600 -o root -g root /tmp/rules.conf /etc/usbguard/rules.conf',''],
      ['sudo systemctl enable --now usbguard',''],
      ['sudo usbguard list-devices','Devices + allow/block state'],
      ['sudo usbguard allow-device 12','Allow now'],
      ['sudo usbguard allow-device 12 -p','Allow permanently'],
      ['sudo usbguard block-device 12',''],
      ['sudo usbguard watch','Live events']],
    flags:[
      ['generate-policy','Rules from current devices'],
      ['list-devices -b','Only blocked ones'],
      ['allow-device <id> -p','Persist to rules.conf'],
      ['block / reject','Ignore / remove from system'],
      ['ImplicitPolicyTarget=block','Default for unknown devices']],
    example:{cmd:'sudo usbguard list-devices -b', out:
`12: block id 0781:5583 serial "4C530001" name "Ultra Fit" hash "Jx3k…=" parent-hash "…" via-port "3-2" with-interface 08:06:50 with-connect-type "hotplug"`},
    warn:'Generate the policy with your keyboard and mouse plugged in, or you may block them at the next boot.' },

  { title:'Passwords & Secrets', icon:'🗝️', badge:'SECRETS', color:'blue',
    cmds:[
      ['openssl rand -base64 24','Random password'],
      ['sudo dnf install pwgen && pwgen -sy 24 1','Password generator'],
      ['secret-tool store --label="My API key" service myapi user sooraj','Save to GNOME Keyring'],
      ['secret-tool lookup service myapi user sooraj','Read it back in a script'],
      ['sudo dnf install keepassxc','Offline password manager'],
      ['keepassxc-cli show -s ~/Passwords.kdbx github','Read an entry from the CLI'],
      ['sudo dnf install pass && pass init you@example.com','GPG-based "pass"'],
      ['pass generate web/github 24 && pass -c web/github','Generate + copy for 45 s'],
      ['history -d $(history 1 | awk \'{print $1}\')','Remove the last command (if it had a secret)']],
    flags:[
      ['pwgen -s','Fully random'],
      ['pwgen -y','Include symbols'],
      ['secret-tool store / lookup / clear','Keyring access'],
      ['pass -c','Copy to clipboard, auto-clear'],
      ['keepassxc-cli -s','Show protected fields']],
    example:{cmd:'secret-tool lookup service myapi user sooraj', out:`sk-live-4f9c2a7d8e1b4c6a9f0e2d1c`},
    tip:'Never put secrets in shell history, scripts in git, or <code>Environment=</code> lines — use the keyring, pass, or systemd credentials.' },

  { title:'Encrypt Files with age', icon:'🔏', badge:'AGE', color:'green',
    cmds:[
      ['sudo dnf install age',''],
      ['age -p secrets.tar > secrets.tar.age','Encrypt with a passphrase'],
      ['age -d secrets.tar.age > secrets.tar','Decrypt'],
      ['age-keygen -o ~/.config/age/key.txt','Create a key pair (prints public key)'],
      ['age -r age1ql3z7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p -o report.pdf.age report.pdf','Encrypt for someone'],
      ['age -d -i ~/.config/age/key.txt report.pdf.age > report.pdf','Decrypt with your key'],
      ['age -R ~/.ssh/id_ed25519.pub -o notes.age notes.txt','Encrypt to an SSH key'],
      ['age -d -i ~/.ssh/id_ed25519 notes.age','…decrypt with it']],
    flags:[
      ['-p','Passphrase mode'],
      ['-r <age1…>','Recipient public key (repeatable)'],
      ['-R <file>','Recipients file (incl. SSH .pub)'],
      ['-i <key>','Identity for decryption'],
      ['-a','ASCII armour (paste-safe)'],
      ['-o <file>','Output file']],
    example:{cmd:'age-keygen -o ~/.config/age/key.txt', out:`Public key: age1ql3z7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p`},
    tip:'age is simpler than GPG for "encrypt this file for that person" — no keyrings or trust models.' },

  { title:'Kernel & System Hardening', icon:'🧱', badge:'HARDEN', color:'warn',
    code:
`# /etc/sysctl.d/90-hardening.conf
kernel.kptr_restrict = 2
kernel.dmesg_restrict = 1
kernel.yama.ptrace_scope = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.tcp_syncookies = 1`,
    cmds:[
      ['sudoedit /etc/sysctl.d/90-hardening.conf','Paste the block above'],
      ['sudo sysctl --system','Apply'],
      ['systemctl list-unit-files --state=enabled --type=service','Review enabled services…'],
      ['sudo systemctl disable --now cups','…disable ones you don\'t use (e.g. no printer)'],
      ['sudo dnf remove telnet rsh ypbind','Remove legacy network tools if present'],
      ['sudo chmod 700 /home/*','Private home dirs (Fedora default for new users)'],
      ['systemd-analyze security | head -15','Least-hardened services'],
      ['sudo update-crypto-policies --set FUTURE','Stricter crypto (test your connections!)']],
    flags:[
      ['kptr_restrict=2','Hide kernel addresses'],
      ['dmesg_restrict=1','dmesg needs root'],
      ['yama.ptrace_scope=1','Processes can only debug their children'],
      ['rp_filter=1','Drop spoofed source addresses'],
      ['accept_redirects=0','Ignore ICMP redirects']],
    example:{cmd:'sysctl kernel.kptr_restrict kernel.dmesg_restrict kernel.yama.ptrace_scope', out:
`kernel.kptr_restrict = 2
kernel.dmesg_restrict = 1
kernel.yama.ptrace_scope = 1`},
    warn:'<code>ptrace_scope=1</code> can break attaching debuggers (gdb -p) to running programs — use sudo for that.' }
);
})();

/* ═════════════════ MORE DISK (v2.18) ═════════════════ */
(function () {
const d = window.FB_DATA.find(x => x.id === 'disk');
d.cards.push(
  { title:'Disk Health: SMART & NVMe', icon:'🩺', badge:'HEALTH', color:'green',
    cmds:[
      ['sudo dnf install smartmontools nvme-cli',''],
      ['sudo smartctl -H /dev/nvme0n1','PASSED / FAILED verdict'],
      ['sudo smartctl -a /dev/sda','Everything (SATA/HDD)'],
      ['sudo nvme smart-log /dev/nvme0n1','NVMe wear, temperature, errors'],
      ['sudo smartctl -t short /dev/sda','Start a 2-minute self-test'],
      ['sudo smartctl -t long /dev/sda','Full surface test (hours)'],
      ['sudo smartctl -l selftest /dev/sda','Self-test results'],
      ['sudo systemctl enable --now smartd','Background monitoring + journal warnings'],
      ['journalctl -u smartd -b','smartd findings']],
    flags:[
      ['-H','Overall health'],
      ['-a / -x','All / extended info'],
      ['-t short|long','Self-test'],
      ['-l selftest|error','Logs'],
      ['nvme smart-log','NVMe health page'],
      ['nvme list','All NVMe drives']],
    table:{head:['Watch these values','Bad sign'], rows:[
      ['Reallocated_Sector_Ct (HDD/SATA SSD)','Anything rising above 0'],
      ['Current_Pending_Sector','Non-zero'],
      ['percentage_used (NVMe)','Near 100% = end of rated life'],
      ['media_errors (NVMe)','Non-zero'],
      ['critical_warning (NVMe)','Anything but 0']]},
    example:{cmd:'sudo nvme smart-log /dev/nvme0n1 | grep -E "critical|temperature|percentage|media|power_on"', out:
`critical_warning                        : 0
temperature                             : 39 °C (312 K)
percentage_used                         : 3%
media_errors                            : 0
power_on_hours                          : 5,812`},
    tip:'SMART "PASSED" doesn\'t guarantee health — watch the trend of those raw values and keep backups.' },

  { title:'Check & Repair Filesystems', icon:'🔧', badge:'FSCK', color:'red',
    cmds:[
      ['sudo umount /dev/sdb1','ALWAYS unmount first'],
      ['sudo e2fsck -n /dev/sdb1','ext4: check only, change nothing'],
      ['sudo e2fsck -f -y /dev/sdb1','ext4: force check + auto-fix'],
      ['sudo xfs_repair -n /dev/sdb1','XFS: dry run'],
      ['sudo xfs_repair /dev/sdb1','XFS: repair'],
      ['sudo btrfs scrub start -B /','Btrfs: verify checksums (mounted, safe)'],
      ['sudo btrfs check --readonly /dev/sdb1','Btrfs: offline check (read-only!)'],
      ['sudo fsck.vfat -a /dev/sdc1','FAT32 USB stick'],
      ['sudo grubby --update-kernel=DEFAULT --args="fsck.mode=force"','Check root at next boot (remove the arg afterwards with --remove-args)']],
    flags:[
      ['-n','No changes (dry run)'],
      ['-f','Force even if marked clean'],
      ['-y / -p','Answer yes / auto-fix safe issues'],
      ['xfs_repair -L','Zero the log — last resort, may lose data'],
      ['btrfs check --repair','DANGEROUS — only when told to by devs'],
      ['btrfs scrub -B','Run in foreground, print result']],
    example:{cmd:'sudo e2fsck -f -n /dev/sdb1', out:
`e2fsck 1.47.2 (1-Jan-2025)
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
backup: 1284/7815168 files (0.3% non-contiguous), 612451/31258112 blocks`},
    danger:'Never run a repair on a mounted filesystem, and never <code>btrfs check --repair</code> without a backup and a reason.' },

  { title:'Grow & Shrink Filesystems', icon:'📐', badge:'RESIZE', color:'warn',
    cmds:[
      ['sudo growpart /dev/vda 3','Grow partition 3 into free space (cloud-utils-growpart)'],
      ['sudo parted /dev/sdb resizepart 1 100%','Grow a partition with parted'],
      ['sudo resize2fs /dev/sdb1','ext4: fill the partition (online OK)'],
      ['sudo xfs_growfs /mnt/data','XFS: grow (by mount point, online)'],
      ['sudo btrfs filesystem resize max /','Btrfs: grow to fill device (online)'],
      ['sudo btrfs filesystem resize -20G /home','Btrfs: shrink by 20 GB (online)'],
      ['sudo lvextend -r -l +100%FREE /dev/vg/data','LVM: grow LV + filesystem in one step'],
      ['sudo umount /mnt/data && sudo e2fsck -f /dev/sdb1 && sudo resize2fs /dev/sdb1 50G','ext4: shrink (offline only)']],
    flags:[
      ['resize2fs <dev> [size]','ext4 grow/shrink (shrink offline)'],
      ['xfs_growfs','XFS can only GROW, never shrink'],
      ['btrfs filesystem resize ±N|max','Grow/shrink online'],
      ['growpart <disk> <partnum>','Expand a partition in place'],
      ['lvextend -r','Resize filesystem too']],
    example:{cmd:'sudo btrfs filesystem resize max /', out:`Resize device id 1 (/dev/nvme0n1p3) from 450.00GiB to max`},
    warn:'Shrink the filesystem BEFORE shrinking the partition/LV; grow the partition/LV BEFORE growing the filesystem.' },

  { title:'Btrfs Advanced', icon:'🌲', badge:'BTRFS+', color:'green',
    cmds:[
      ['sudo btrfs subvolume create /home/sooraj/vms','New subvolume (own snapshots/quotas)'],
      ['sudo btrfs subvolume delete /home/.snap-2026-09-01','Remove old snapshot'],
      ['sudo btrfs property set /home/sooraj/Projects compression zstd','Compress a folder\'s new files'],
      ['sudo btrfs filesystem defragment -r -czstd /home/sooraj/Documents','Compress existing files'],
      ['sudo compsize /home','Real compression savings'],
      ['sudo btrfs device add /dev/sdb /','Add a second disk to the filesystem'],
      ['sudo btrfs balance start -dconvert=raid1 -mconvert=raid1 /','Turn it into a mirror (RAID1)'],
      ['sudo btrfs filesystem show','Devices in each filesystem'],
      ['sudo btrfs device stats /','Per-device error counters'],
      ['sudo btrfs send /home/.snap-ro | sudo btrfs receive /run/media/$USER/backup/','Copy a read-only snapshot to another Btrfs disk']],
    flags:[
      ['subvolume create / delete / list',''],
      ['property set <path> compression zstd|lzo|none','Per-folder compression'],
      ['defragment -c<algo>','Recompress (breaks reflinks/snapshot sharing)'],
      ['balance -dconvert= -mconvert=','Change RAID profile'],
      ['send -p <parent>','Incremental send'],
      ['device stats -z','Reset counters']],
    example:{cmd:'sudo compsize /home', out:
`Processed 412331 files, 301294 regular extents (318870 refs), 211842 inline.
Type       Perc     Disk Usage   Uncompressed Referenced
TOTAL       71%       44G          61G          63G
none       100%       29G          29G          30G
zstd        46%       14G          31G          32G`},
    tip:'Fedora mounts with <code>compress=zstd:1</code> already — new files are compressed automatically.' },

  { title:'Software RAID (mdadm)', icon:'🪞', badge:'RAID', color:'warn',
    cmds:[
      ['sudo mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb1 /dev/sdc1','Create a mirror'],
      ['cat /proc/mdstat','Sync progress + health'],
      ['sudo mdadm --detail /dev/md0',''],
      ['sudo mkfs.xfs /dev/md0 && sudo mount /dev/md0 /srv/raid',''],
      ['sudo mdadm --detail --scan | sudo tee -a /etc/mdadm.conf','Assemble at boot'],
      ['sudo mdadm /dev/md0 --fail /dev/sdc1 --remove /dev/sdc1','Take out a bad disk'],
      ['sudo mdadm /dev/md0 --add /dev/sdd1','Add the replacement (rebuilds)'],
      ['sudo systemctl enable --now mdmonitor','Email/journal alerts on failures']],
    flags:[
      ['--level=0|1|5|6|10','RAID level'],
      ['--raid-devices=N','Number of active disks'],
      ['--fail / --remove / --add','Replace a disk'],
      ['--detail --scan','Config lines for mdadm.conf'],
      ['[UU] / [U_]','mdstat: healthy / one disk missing']],
    example:{cmd:'cat /proc/mdstat', out:
`Personalities : [raid1]
md0 : active raid1 sdc1[1] sdb1[0]
      976630464 blocks super 1.2 [2/2] [UU]
      bitmap: 0/8 pages [0KB], 65536KB chunk

unused devices: <none>`},
    warn:'RAID is not a backup — a deleted file is deleted on both disks.' },

  { title:'SSD & TRIM', icon:'⚡', badge:'SSD', color:'blue',
    cmds:[
      ['systemctl status fstrim.timer','Weekly TRIM (enabled by default on Fedora)'],
      ['sudo fstrim -av','TRIM all mounted filesystems now'],
      ['lsblk --discard','Which devices support TRIM (non-zero DISC-GRAN)'],
      ['cat /sys/block/nvme0n1/queue/rotational','0 = SSD, 1 = spinning disk'],
      ['cat /sys/block/nvme0n1/queue/scheduler','I/O scheduler ([none] is right for NVMe)'],
      ['grep -E "discard" /etc/crypttab','Encrypted disks need discard enabled to pass TRIM']],
    flags:[
      ['fstrim -a','All supported mounts'],
      ['fstrim -v','Show how much was trimmed'],
      ['discard=async','Btrfs mount option (continuous TRIM)'],
      ['discard in /etc/crypttab','Allow TRIM through LUKS']],
    example:{cmd:'sudo fstrim -av', out:
`/boot/efi: 579.6 MiB (607764480 bytes) trimmed on /dev/nvme0n1p1
/boot: 682.4 MiB (715538432 bytes) trimmed on /dev/nvme0n1p2
/: 118.2 GiB (126915289088 bytes) trimmed on /dev/mapper/luks-9e3f…`} },

  { title:'Disk Speed Tests', icon:'🏎️', badge:'BENCH', color:'blue',
    cmds:[
      ['sudo hdparm -Tt /dev/nvme0n1','Quick cached + raw read speed'],
      ['dd if=/dev/zero of=~/testfile bs=1M count=2048 oflag=direct status=progress','Sequential write (2 GB)'],
      ['dd if=~/testfile of=/dev/null bs=1M iflag=direct status=progress','Sequential read'],
      ['rm ~/testfile',''],
      ['sudo dnf install fio',''],
      ['fio --name=rand --filename=$HOME/fio.tmp --size=1G --rw=randread --bs=4k --iodepth=32 --ioengine=io_uring --direct=1 --runtime=20 --time_based','Random 4K reads (IOPS)'],
      ['gnome-disks','GUI: ⋮ → Benchmark Disk']],
    flags:[
      ['oflag=direct / iflag=direct','Bypass the cache for honest numbers'],
      ['--rw=read|write|randread|randwrite','fio pattern'],
      ['--bs=4k | 1M','Block size'],
      ['--iodepth=N','Queue depth'],
      ['hdparm -t / -T','Device / cached reads']],
    example:{cmd:'dd if=/dev/zero of=~/testfile bs=1M count=2048 oflag=direct status=progress', out:
`2147483648 bytes (2.1 GB, 2.0 GiB) copied, 1.21 s, 1.8 GB/s
2048+0 records in
2048+0 records out`},
    tip:'Btrfs compression makes <code>/dev/zero</code> tests unrealistically fast — use fio or a compressed-off folder.' },

  { title:'Wipe & Secure Erase', icon:'🧨', badge:'ERASE', color:'red',
    cmds:[
      ['lsblk -o NAME,SIZE,MODEL,SERIAL','Identify the disk BY MODEL + SERIAL'],
      ['sudo wipefs -a /dev/sdX','Remove filesystem/partition signatures'],
      ['sudo blkdiscard -f /dev/nvme1n1','SSD: discard every block (instant)'],
      ['sudo nvme format /dev/nvme1n1 --ses=1','NVMe: firmware secure erase'],
      ['sudo shred -v -n 1 /dev/sdX','HDD: overwrite once (hours)'],
      ['sudo cryptsetup luksErase /dev/sdX2','LUKS: destroy all key slots = data unrecoverable']],
    flags:[
      ['wipefs -a','All signatures'],
      ['blkdiscard -s','Secure discard (if supported)'],
      ['nvme format --ses=1|2','User data erase | crypto erase'],
      ['shred -n N -z','Passes + final zeros'],
      ['luksErase','Kill keys, instant']],
    example:{cmd:'lsblk -o NAME,SIZE,MODEL,SERIAL', out:
`NAME          SIZE MODEL                     SERIAL
nvme0n1     476.9G SAMSUNG MZVL2512HCJQ      S675NX0T123456
nvme1n1     931.5G WD_BLACK SN850X 1000GB    23061K801234
sda          28.9G Ultra Fit                 4C530001`},
    danger:'These commands destroy data instantly and permanently. Check the MODEL and SERIAL, not just the letter.' },

  { title:'Persistent Names, UUIDs & Labels', icon:'🏷️', badge:'UUID', color:'blue',
    cmds:[
      ['ls -l /dev/disk/by-uuid/','Filesystem UUIDs'],
      ['ls -l /dev/disk/by-id/','Model + serial names (stable)'],
      ['ls -l /dev/disk/by-label/','By label'],
      ['sudo blkid /dev/sdb1','UUID + type of one partition'],
      ['sudo e2label /dev/sdb1 backup','Label ext4'],
      ['sudo xfs_admin -L backup /dev/sdb1','Label XFS (unmounted)'],
      ['sudo btrfs filesystem label /mnt/data backup','Label Btrfs'],
      ['sudo fatlabel /dev/sdc1 USBSTICK','Label FAT'],
      ['sudo tune2fs -U random /dev/sdb1','New UUID after cloning a disk (ext4)']],
    flags:[
      ['UUID=…','fstab: survives disk reordering'],
      ['LABEL=…','fstab: human-friendly'],
      ['/dev/sdX','Can change between boots — avoid in fstab'],
      ['PARTUUID=','Partition (not filesystem) ID']],
    example:{cmd:'sudo blkid /dev/sdb1', out:`/dev/sdb1: LABEL="backup" UUID="5d1b8c3e-7a2f-4e6d-9b1a-0c3f2e7a8d44" BLOCK_SIZE="4096" TYPE="ext4" PARTLABEL="data" PARTUUID="b3c2…"`},
    tip:'Two disks with the same UUID (after cloning) confuse mounting and Btrfs badly — change one.' },

  { title:'LVM Snapshots, Thin Pools & Migration', icon:'📸', badge:'LVM+', color:'warn',
    cmds:[
      ['sudo lvcreate -s -L 10G -n data_snap /dev/vg/data','Snapshot before a risky change'],
      ['sudo mount -o ro /dev/vg/data_snap /mnt/snap','Browse it'],
      ['sudo lvconvert --merge /dev/vg/data_snap','Roll back to the snapshot'],
      ['sudo lvremove /dev/vg/data_snap','Or delete it when happy'],
      ['sudo lvcreate -L 100G -T vg/thinpool','Thin pool'],
      ['sudo lvcreate -V 500G -T vg/thinpool -n bigvol','Over-provisioned thin volume'],
      ['sudo pvmove /dev/sdb','Move all data off a disk (online)'],
      ['sudo vgreduce vg /dev/sdb && sudo pvremove /dev/sdb','…then remove it from the VG'],
      ['sudo lvs -a -o +devices','Which disk each LV lives on']],
    flags:[
      ['-s','Snapshot'],
      ['--merge','Revert origin to snapshot'],
      ['-T / -V','Thin pool / virtual size'],
      ['pvmove <pv> [<dest>]','Migrate extents'],
      ['lvs -o +data_percent','Snapshot / thin usage']],
    example:{cmd:'sudo lvs', out:
`  LV        VG Attr       LSize   Pool Origin Data%  Meta%
  data      vg owi-aos--- 200.00g
  data_snap vg swi-a-s---  10.00g      data   4.12`},
    warn:'A classic LVM snapshot that fills up (Data% 100) becomes invalid — size it generously or use thin snapshots.' },

  { title:'Stratis (Pooled Storage)', icon:'🧊', badge:'STRATIS', color:'blue',
    cmds:[
      ['sudo dnf install stratisd stratis-cli && sudo systemctl enable --now stratisd',''],
      ['sudo stratis pool create pool1 /dev/sdb /dev/sdc','Pool from whole disks'],
      ['sudo stratis filesystem create pool1 data','Thin XFS filesystem'],
      ['sudo mount /dev/stratis/pool1/data /srv/data',''],
      ['sudo stratis filesystem snapshot pool1 data data-snap','Snapshot'],
      ['sudo stratis pool add-data pool1 /dev/sdd','Grow the pool'],
      ['sudo stratis pool list && sudo stratis filesystem list',''],
      ['echo "/dev/stratis/pool1/data /srv/data xfs defaults,x-systemd.requires=stratisd.service 0 0" | sudo tee -a /etc/fstab','Mount at boot']],
    flags:[
      ['pool create <name> <devs>','New pool'],
      ['--key-desc <key>','Encrypted pool'],
      ['filesystem create / snapshot / destroy',''],
      ['pool add-data / add-cache','More space / SSD cache'],
      ['x-systemd.requires=stratisd.service','Required in fstab']],
    example:{cmd:'sudo stratis filesystem list', out:
`Pool    Filesystem   Total / Used / Free            Created             Device                        UUID
pool1   data         1 TiB / 546 MiB / 1023.47 GiB  Sep 30 2026 01:55   /dev/stratis/pool1/data       7c2e…
pool1   data-snap    1 TiB / 546 MiB / 1023.47 GiB  Sep 30 2026 01:56   /dev/stratis/pool1/data-snap  41a9…`},
    tip:'Stratis gives LVM-thin + XFS with a much simpler CLI — handy on servers.' }
);
})();

/* ═════════════════ MORE PROCESSES (v2.19) ═════════════════ */
(function () {
const p = window.FB_DATA.find(x => x.id === 'process');
p.cards.push(
  { title:'Process States Explained', icon:'🚦', badge:'STATES', color:'green', tableFirst:true,
    table:{head:['STAT','Meaning'], rows:[
      ['R','Running or ready to run'],
      ['S','Sleeping — waiting for something (normal for most processes)'],
      ['D','Uninterruptible sleep — stuck on disk/NFS I/O; even kill -9 waits'],
      ['Z','Zombie — finished, parent hasn\'t collected it yet'],
      ['T / t','Stopped (Ctrl+Z / SIGSTOP) / stopped by a debugger'],
      ['I','Idle kernel thread'],
      ['< / N','High / low priority (nice)'],
      ['s / l / +','Session leader / multi-threaded / foreground']]},
    cmds:[
      ['ps -eo stat,pid,comm | awk \'$1 ~ /^D/\'','Processes stuck in D state'],
      ['ps -eo stat,pid,ppid,comm | awk \'$1 ~ /^Z/\'','Zombies + their parents'],
      ['cat /proc/loadavg','D-state processes count toward load!'],
      ['cat /proc/1234/wchan; echo','What a sleeping process waits on']],
    flags:[
      ['ps -o stat','Show state column'],
      ['top: S column','Same letters'],
      ['High load, idle CPU','→ look for D-state (slow disk / hung NFS)']],
    example:{cmd:'ps -eo stat,pid,comm | head -6', out:
`STAT     PID COMMAND
Ss         1 systemd
S          2 kthreadd
I<         4 kworker/R-rcu_g
Ssl     1123 sshd
Sl+     4410 vim`} },

  { title:'Custom ps Output', icon:'🧾', badge:'PS', color:'blue',
    cmds:[
      ['ps -eo pid,ppid,user,%cpu,%mem,etime,cmd --sort=-%cpu | head','Top CPU with parent + uptime'],
      ['ps -eo pid,user,rss,comm --sort=-rss | head','Top memory (RSS, KB)'],
      ['ps -p 4410 -o pid,etime,lstart,cmd','When did it start / how long running'],
      ['ps -u alice -o pid,comm,%cpu','One user\'s processes'],
      ['ps -C nginx -o pid,ppid,cmd','By command name'],
      ['ps -Lf -p 3120 | wc -l','Thread count'],
      ['ps -eo pid,cgroup:60,comm | grep nginx','Which cgroup/service'],
      ['ps -eo comm --no-headers | sort | uniq -c | sort -rn | head','Most common process names']],
    flags:[
      ['-e','Every process'],
      ['-o <cols>','Choose columns'],
      ['--sort=-col','Sort descending'],
      ['-p / -u / -C','By PID / user / name'],
      ['-L','Threads'],
      ['--no-headers','For scripts'],
      ['cols: pid ppid user %cpu %mem rss vsz etime lstart stat ni cmd comm','Useful columns']],
    example:{cmd:'ps -eo pid,user,rss,comm --sort=-rss | head -4', out:
`    PID USER       RSS COMMAND
   3120 sooraj  2142380 firefox
   2011 sooraj   798412 gnome-shell
   4410 sooraj   612004 code`} },

  { title:'top & htop Keys', icon:'⌨️', badge:'KEYS', color:'blue', tableFirst:true,
    table:{head:['top key','Action'], rows:[
      ['P / M / T','Sort by CPU / memory / time'],
      ['1','Per-CPU lines'],
      ['c','Full command line'],
      ['u','Only one user'],
      ['k / r','Kill / renice a PID'],
      ['H','Show threads'],
      ['V','Tree view'],
      ['W','Save your layout to ~/.config/procps/toprc'],
      ['htop: F3 or /','Search'],
      ['htop: F4','Filter'],
      ['htop: F5 or t','Tree'],
      ['htop: F9','Send a signal'],
      ['htop: Space','Tag several processes']]},
    cmds:[
      ['top -o %MEM','Start sorted by memory'],
      ['top -u alice','Only alice'],
      ['top -p 3120,4410','Only these PIDs'],
      ['top -b -n 1 | head -15','One snapshot (for scripts / logs)'],
      ['htop -t','Tree view'],
      ['btop','Graphs for CPU, memory, disks, network']],
    flags:[
      ['-o <field>','Sort field'],
      ['-d <sec>','Refresh delay'],
      ['-b -n N','Batch mode, N iterations'],
      ['-p / -u','PIDs / user']],
    example:{cmd:'top -b -n 1 | head -5', out:
`top - 01:58:40 up 16:30,  2 users,  load average: 0.52, 0.41, 0.33
Tasks: 384 total,   1 running, 383 sleeping,   0 stopped,   0 zombie
%Cpu(s):  3.1 us,  1.2 sy,  0.0 ni, 95.4 id,  0.2 wa,  0.0 hi,  0.1 si,  0.0 st
MiB Mem :  31744.2 total,  18402.6 free,   6380.1 used,   7612.0 buff/cache
MiB Swap:   8192.0 total,   8192.0 free,      0.0 used.  25364.1 avail Mem`} },

  { title:'Process Tree, Parents & Zombies', icon:'🌳', badge:'TREE', color:'blue',
    cmds:[
      ['pstree -p','Whole tree with PIDs'],
      ['pstree -p -s 4410','Ancestors of one process'],
      ['pstree -u sooraj','One user\'s tree'],
      ['ps -o ppid= -p 4410','Parent PID'],
      ['ps -ef --forest | less','Tree in ps'],
      ['systemctl status 4410','Which service/scope started it'],
      ['kill -s SIGCHLD <parent-pid>','Nudge a parent to reap zombies'],
      ['kill <parent-pid>','If not: stopping the parent clears its zombies']],
    flags:[
      ['pstree -p','Show PIDs'],
      ['pstree -s','Show parents of a PID'],
      ['pstree -a','Command-line arguments'],
      ['pstree -T','Hide threads']],
    example:{cmd:'pstree -p -s 4410', out:`systemd(1)───systemd(1890)───gnome-terminal-(3805)───bash(3822)───vim(4410)`},
    tip:'You can\'t kill a zombie — it\'s already dead. Only its parent can remove it.' },

  { title:'Inspect a Running Process', icon:'🔬', badge:'/PROC', color:'blue',
    cmds:[
      ['tr "\\0" " " < /proc/4410/cmdline; echo','Exact command line'],
      ['pwdx 4410','Current directory'],
      ['readlink /proc/4410/exe','Real binary path'],
      ['sudo tr "\\0" "\\n" < /proc/4410/environ | head','Environment variables'],
      ['ls -l /proc/4410/fd | wc -l','Open file descriptors'],
      ['cat /proc/4410/limits','Limits it runs with'],
      ['grep -E "VmRSS|VmSwap|Threads" /proc/4410/status','Memory + threads'],
      ['pmap -x 4410 | tail -1','Memory map total'],
      ['sudo lsof -p 4410 | grep -E "REG|IPv"','Files + network connections']],
    flags:[
      ['/proc/<pid>/cmdline','NUL-separated args'],
      ['/proc/<pid>/environ','Env (root or owner)'],
      ['/proc/<pid>/fd/','Open files as symlinks'],
      ['/proc/<pid>/status','State, memory, UIDs'],
      ['pmap -x','Per-mapping RSS'],
      ['/proc/self','The process reading it']],
    example:{cmd:'grep -E "State|VmRSS|Threads" /proc/3120/status', out:
`State:	S (sleeping)
VmRSS:	 2142380 kB
Threads:	87`},
    tip:'A deleted binary still running shows as <code>/usr/bin/foo (deleted)</code> in <code>/proc/PID/exe</code> — it needs a restart after an update.' },

  { title:'Pause, Resume & Signal Tricks', icon:'⏯️', badge:'SIGNALS', color:'warn',
    cmds:[
      ['kill -STOP 3120','Freeze a process (e.g. browser eating CPU)'],
      ['kill -CONT 3120','Resume it'],
      ['pkill -STOP -f "make -j"','Pause a build'],
      ['kill -USR1 $(pgrep -x dd)','Make dd print its progress'],
      ['kill -HUP $(pgrep -x nginx | head -1)','Reload config (many daemons)'],
      ['trap "echo cleaning up; rm -f /tmp/lock" EXIT INT TERM','In scripts: run cleanup on exit/Ctrl+C'],
      ['kill -0 4410 && echo alive','Check a PID exists (sends nothing)'],
      ['timeout -s INT 30s ./server','Send Ctrl+C after 30s']],
    flags:[
      ['STOP / CONT','Pause / resume (STOP can\'t be caught)'],
      ['TSTP','Polite pause (Ctrl+Z)'],
      ['HUP','Reload / hang-up'],
      ['USR1 / USR2','App-defined'],
      ['kill -0','Existence check'],
      ['trap "<cmd>" SIG…','Handle signals in bash']],
    example:{cmd:'dd if=/dev/zero of=/dev/null bs=1M & sleep 1; kill -USR1 $!; sleep 0.2; kill $!', out:
`18432+0 records in
18431+0 records out
19326304256 bytes (19 GB, 18 GiB) copied, 1.0041 s, 19.2 GB/s`} },

  { title:'Keep Running After Logout', icon:'🌙', badge:'DETACH', color:'green', tableFirst:true,
    table:{head:['Method','Survives','Reattach','Best for'], rows:[
      ['cmd &','Often not','No','Quick jobs'],
      ['nohup cmd &','Yes','No','Fire-and-forget (output → nohup.out)'],
      ['disown','Yes','No','Already-running job'],
      ['setsid cmd','Yes','No','Fully detached'],
      ['tmux / screen','Yes','Yes','Interactive work over SSH'],
      ['systemd-run --user','Yes (linger)','Logs','Long tasks with logs + limits']]},
    cmds:[
      ['nohup ./long-job.sh > job.log 2>&1 &','Detach + keep output'],
      ['./long-job.sh & disown','Detach after starting'],
      ['setsid -f ./server','New session, no terminal'],
      ['tmux new -d -s job "./long-job.sh"','Detached tmux session'],
      ['systemd-run --user --unit=job ./long-job.sh','Managed by systemd'],
      ['loginctl enable-linger $USER','Let user services keep running after logout']],
    flags:[
      ['nohup','Ignore SIGHUP'],
      ['disown -h','Keep in jobs list but ignore HUP'],
      ['setsid -f','Fork into new session'],
      ['KillUserProcesses=','logind.conf: kill everything at logout?']],
    example:{cmd:'nohup ./long-job.sh > job.log 2>&1 & echo "started $!"', out:`started 91822`} },

  { title:'Run Things in Parallel', icon:'🔀', badge:'PARALLEL', color:'blue',
    cmds:[
      ['for f in *.png; do magick "$f" "${f%.png}.jpg" & done; wait','Background + wait for all'],
      ['find . -name "*.png" -print0 | xargs -0 -P 4 -I{} magick {} -resize 50% small/{}','4 at a time with xargs'],
      ['sudo dnf install parallel',''],
      ['parallel -j 8 gzip ::: *.log','GNU parallel, 8 jobs'],
      ["parallel -j 10 'ping -c1 -W1 {} >/dev/null && echo {} up' :::: hosts.txt",'Ping many hosts from a file'],
      ['parallel --bar -j4 ffmpeg -i {} {.}.mp3 ::: *.wav','Progress bar'],
      ['make -j$(nproc)','Builds: use every core']],
    flags:[
      ['&  +  wait','Simplest parallelism in bash'],
      ['xargs -P N','N processes'],
      ['parallel -j N','N jobs (default = cores)'],
      ['{} / {.} / {/}','Input / without extension / basename'],
      [':::  /  ::::','Arguments follow / read arguments from a file'],
      ['--bar / --eta','Progress']],
    example:{cmd:'parallel -j 4 "sleep 1; echo done {}" ::: a b c d', out:
`done a
done b
done c
done d`},
    tip:'Four jobs that each sleep 1 second finish in ~1 second total instead of 4.' },

  { title:'CPU Affinity & Real-time Priority', icon:'🎯', badge:'CPU', color:'warn',
    cmds:[
      ['nproc && lscpu | grep -E "^CPU\\(s\\)|Thread|Core"','Cores and threads'],
      ['taskset -c 0-3 ./render','Run on CPUs 0–3 only'],
      ['taskset -cp 3120','Which CPUs a process may use'],
      ['sudo taskset -cp 4-7 3120','Move a running process'],
      ['ionice -c3 -p 3120','Idle-only disk I/O'],
      ['ionice -c2 -n7 rsync -a src/ dst/','Lowest best-effort I/O'],
      ['sudo chrt -f 50 ./audio-app','Real-time FIFO priority 50'],
      ['chrt -p 3120','Current scheduling policy'],
      ['sudo systemctl set-property myapp.service AllowedCPUs=2-3','Pin a whole service']],
    flags:[
      ['taskset -c <list>','CPU list: 0,2,4 or 0-3'],
      ['taskset -p','Existing PID'],
      ['ionice -c1|2|3','Realtime / best-effort / idle'],
      ['chrt -f / -r / -o','FIFO / round-robin / normal'],
      ['AllowedCPUs=','systemd unit pinning']],
    example:{cmd:'taskset -cp 3120', out:`pid 3120's current affinity list: 0-15`},
    warn:'A runaway real-time process can freeze the whole system. Keep priorities modest and test first.' },

  { title:'Watch Activity with eBPF (bcc-tools)', icon:'🐝', badge:'EBPF', color:'green',
    cmds:[
      ['sudo dnf install bcc-tools bpftrace',''],
      ['sudo /usr/share/bcc/tools/execsnoop','Every new process as it starts'],
      ['sudo /usr/share/bcc/tools/opensnoop -n firefox','Files a program opens'],
      ['sudo /usr/share/bcc/tools/tcpconnect','Outgoing TCP connections + process'],
      ['sudo /usr/share/bcc/tools/biolatency','Disk I/O latency histogram'],
      ['sudo /usr/share/bcc/tools/runqlat','How long tasks wait for a CPU'],
      ['sudo bpftrace -e \'tracepoint:syscalls:sys_enter_openat { printf("%s %s\\n", comm, str(args->filename)); }\'','One-liner: every file opened'],
      ['ls /usr/share/bcc/tools/','~100 more tools']],
    flags:[
      ['execsnoop','Short-lived processes top misses'],
      ['opensnoop -p PID / -n name','Filter'],
      ['tcpconnect / tcpaccept','Outbound / inbound'],
      ['biolatency -D','Per-disk'],
      ['bpftrace -l','List probes']],
    example:{cmd:'sudo /usr/share/bcc/tools/execsnoop', out:
`PCOMM            PID     PPID    RET ARGS
bash             91901   3822      0 /usr/bin/bash
git              91902   91901     0 /usr/bin/git status
dnf              91930   1         0 /usr/bin/dnf makecache --timer`},
    tip:'execsnoop is the fastest way to find the mystery process that runs for a split second and disappears.' }
);
})();

/* ═════════════════ MORE PERFORMANCE (v2.20) ═════════════════ */
(function () {
const p = window.FB_DATA.find(x => x.id === 'perf');

p.cards.unshift({ title:'The 60-Second Performance Check', icon:'⏱️', badge:'START', color:'green', tableFirst:true,
  desc:'Run these in order when a machine "feels slow". Each one rules something in or out.',
  table:{mono:true, head:['Look for','Command'], rows:[
    ['Load trend vs. CPU count','uptime; nproc'],
    ['Kernel errors, OOM kills','sudo dmesg -T | tail'],
    ['Run queue, swapping, I/O wait','vmstat 1 5'],
    ['One CPU pegged?','mpstat -P ALL 1 3'],
    ['Which process','pidstat 1 3'],
    ['Disk saturation / latency','iostat -xz 1 3'],
    ['Available memory','free -h'],
    ['Network throughput','sar -n DEV 1 3'],
    ['TCP retransmits','sar -n TCP,ETCP 1 3'],
    ['Waiting on CPU / memory / I/O','cat /proc/pressure/{cpu,memory,io}']]},
  cmds:[
    ['sudo dnf install sysstat','mpstat, pidstat, iostat, sar'],
    ['uptime; vmstat 1 3; free -h','The quickest three'],
    ['grep . /proc/pressure/*','Pressure stall info in one go']],
  flags:[
    ['load > nproc','CPU saturated'],
    ['vmstat r > nproc','Tasks queuing for CPU'],
    ['vmstat wa high','Waiting on disk'],
    ['iostat %util ~100 + high r_await/w_await','Disk is the bottleneck'],
    ['PSI "some avg10" > 10','Real stalls happening now']],
  example:{cmd:'grep . /proc/pressure/*', out:
`/proc/pressure/cpu:some avg10=1.42 avg60=0.88 avg300=0.61 total=81234411
/proc/pressure/io:some avg10=0.00 avg60=0.10 avg300=0.21 total=11902331
/proc/pressure/io:full avg10=0.00 avg60=0.05 avg300=0.11 total=6801442
/proc/pressure/memory:some avg10=0.00 avg60=0.00 avg300=0.02 total=412903
/proc/pressure/memory:full avg10=0.00 avg60=0.00 avg300=0.01 total=201228`},
  tip:'Based on the well-known "Linux performance analysis in 60 seconds" checklist.' });

p.cards.push(
  { title:'perf Profiling & Flame Graphs', icon:'🔥', badge:'PERF', color:'warn',
    cmds:[
      ['sudo dnf install perf',''],
      ['perf stat -d ./myapp','Cycles, instructions, cache misses for a run'],
      ['sudo perf top','Hottest functions system-wide, live'],
      ['sudo perf top -p $(pgrep -n firefox)','…for one process'],
      ['sudo perf record -F 99 -g -p 3120 -- sleep 30','Sample a process for 30 s with call stacks'],
      ['sudo perf report --stdio | head -40','Where the time went'],
      ['git clone https://github.com/brendangregg/FlameGraph',''],
      ['sudo perf script | FlameGraph/stackcollapse-perf.pl | FlameGraph/flamegraph.pl > cpu.svg','Flame graph (open in a browser)'],
      ['sudo dnf debuginfo-install myapp','Symbols so functions have names']],
    flags:[
      ['stat -d','Detailed counters'],
      ['record -F 99','Sample 99 times/sec'],
      ['-g','Call graphs'],
      ['-a','All CPUs'],
      ['-p <pid>','One process'],
      ['report --stdio / --sort=dso','Text report / by library']],
    example:{cmd:'perf stat -d gzip -k big.log', out:
` Performance counter stats for 'gzip -k big.log':

          2,412.51 msec task-clock                #    0.998 CPUs utilized
     9,812,440,112      cycles                    #    4.067 GHz
    21,907,331,008      instructions              #    2.23  insn per cycle
        31,442,190      cache-misses              #    1.84% of all cache refs

       2.417281211 seconds time elapsed`},
    tip:'In a flame graph, the widest boxes are where the CPU spends its time — optimise those first.' },

  { title:'CPU Frequency & Governors', icon:'🌡️', badge:'CPUFREQ', color:'blue',
    cmds:[
      ['sudo dnf install kernel-tools','cpupower + turbostat'],
      ['cpupower frequency-info','Driver, governor, limits'],
      ['watch -n1 "grep MHz /proc/cpuinfo | sort -t: -k2 -nr | head -4"','Live clock speeds'],
      ['sudo turbostat --quiet --show Busy%,Bzy_MHz,PkgWatt,PkgTmp --interval 2','Real MHz, power (W), temperature'],
      ['cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_driver','amd-pstate-epp / intel_pstate'],
      ['cat /sys/devices/system/cpu/cpu0/cpufreq/energy_performance_preference','EPP hint'],
      ['powerprofilesctl set performance','Easiest way to go fast (tuned-ppd)'],
      ['sudo cpupower frequency-set -g performance','Governor directly (overridden by tuned)']],
    flags:[
      ['frequency-info','What the CPU can do'],
      ['frequency-set -g <gov>','performance / powersave / schedutil'],
      ['idle-info','C-state details'],
      ['turbostat --show <cols>','Pick columns'],
      ['EPP','performance · balance_performance · balance_power · power']],
    example:{cmd:'sudo turbostat --quiet --show Busy%,Bzy_MHz,PkgWatt,PkgTmp --interval 2 --num_iterations 1', out:
`Busy%	Bzy_MHz	PkgTmp	PkgWatt
4.12	3874	46	6.81`},
    tip:'Laptop feels sluggish on battery? Check the power profile before anything else.' },

  { title:'tuned Profiles', icon:'🎛️', badge:'TUNED', color:'green', tableFirst:true,
    table:{head:['Profile','Use it for'], rows:[
      ['balanced','Default on desktops/laptops'],
      ['powersave','Maximum battery'],
      ['throughput-performance','Servers, batch jobs, builds'],
      ['latency-performance','Low response time'],
      ['network-latency / network-throughput','Network-heavy servers'],
      ['virtual-guest','Inside a VM'],
      ['virtual-host','KVM hosts'],
      ['desktop','Desktop responsiveness tweaks']]},
    cmds:[
      ['tuned-adm active',''],
      ['tuned-adm list',''],
      ['tuned-adm recommend','What tuned suggests for this hardware'],
      ['sudo tuned-adm profile throughput-performance',''],
      ['tuned-adm verify','Is the profile fully applied?'],
      ['sudo mkdir -p /etc/tuned/profiles/my-server','Custom profile (see file below)'],
      ['sudo tuned-adm profile my-server','Use it']],
    code:
`# /etc/tuned/profiles/my-server/tuned.conf
[main]
summary=Throughput + my tweaks
include=throughput-performance

[sysctl]
vm.swappiness=10
net.core.default_qdisc=fq
net.ipv4.tcp_congestion_control=bbr`,
    flags:[
      ['profile <name>','Switch'],
      ['profile a b','Combine profiles'],
      ['include=','Inherit a profile'],
      ['[sysctl] [cpu] [disk] [vm]','Plugin sections'],
      ['off','Stop tuning']],
    example:{cmd:'tuned-adm active && tuned-adm verify', out:
`Current active profile: throughput-performance
Verification succeeded, current system settings match the preset profile.`},
    tip:'On older tuned versions custom profiles live directly in <code>/etc/tuned/&lt;name&gt;/</code> — check <code>ls /etc/tuned</code>.' },

  { title:'Memory Deep Dive', icon:'🧮', badge:'MEM+', color:'blue',
    cmds:[
      ['grep -E "MemTotal|MemAvailable|Cached|Dirty|Slab|AnonPages|Shmem:" /proc/meminfo','Where memory is'],
      ['sudo dnf install ps_mem && sudo ps_mem | tail -8','Real per-program usage (shared counted once)'],
      ['sudo slabtop -o | head -15','Kernel slab caches'],
      ['vmstat -s | head -12','Summary counters'],
      ['cat /sys/kernel/mm/transparent_hugepage/enabled','THP mode'],
      ['grep -i huge /proc/meminfo','Huge pages'],
      ['echo 1024 | sudo tee /proc/sys/vm/nr_hugepages','Reserve 2 GB of 2 MB huge pages (DBs, VMs)'],
      ['sudo sysctl vm.dirty_ratio vm.dirty_background_ratio','Write-back thresholds']],
    flags:[
      ['MemAvailable','What apps can really still use'],
      ['Cached / Buffers','Reclaimable file cache'],
      ['Slab / SReclaimable','Kernel caches'],
      ['AnonPages','Program memory (not file-backed)'],
      ['THP: always|madvise|never','Transparent huge pages'],
      ['ps_mem -p <pid>','One program']],
    example:{cmd:'sudo ps_mem | tail -5', out:
`  612.4 MiB +  88.1 MiB = 700.5 MiB	code (14)
  798.2 MiB + 112.4 MiB = 910.6 MiB	gnome-shell
    1.9 GiB + 248.0 MiB =   2.1 GiB	firefox (22)
---------------------------------
                          6.4 GiB
=================================`},
    tip:'"Free" memory near zero is normal — Linux uses spare RAM as cache. Watch <b>MemAvailable</b> instead.' },

  { title:'Network Performance', icon:'📶', badge:'NET+', color:'blue',
    cmds:[
      ['ss -ti dst 1.1.1.1','RTT, congestion window, retransmits per connection'],
      ['nstat -az | grep -iE "retrans|TcpExtListenDrops"','Kernel TCP counters'],
      ['sysctl net.ipv4.tcp_congestion_control net.core.default_qdisc',''],
      ['echo -e "net.core.default_qdisc=fq\\nnet.ipv4.tcp_congestion_control=bbr" | sudo tee /etc/sysctl.d/90-bbr.conf && sudo sysctl --system','BBR (faster uploads on lossy links)'],
      ['sudo ethtool -g enp3s0','NIC ring buffers'],
      ['sudo ethtool -k enp3s0 | grep -E "offload|scatter"','Offloads'],
      ['ip -s link show enp3s0','Drops + errors'],
      ['cat /proc/net/softnet_stat','Per-CPU packet drops (2nd column)']],
    flags:[
      ['ss -i','Internal TCP info'],
      ['nstat -a / -z','Absolute / include zeros'],
      ['bbr / cubic','Congestion control'],
      ['ethtool -G','Set ring sizes'],
      ['ethtool -K','Toggle offloads']],
    example:{cmd:'ss -ti dst 1.1.1.1 | tail -1', out:`	 cubic wscale:7,7 rto:204 rtt:4.21/1.1 mss:1448 cwnd:10 bytes_sent:2841 bytes_acked:2842 retrans:0/0 rcv_space:14480`} },

  { title:'Disk & I/O Tuning', icon:'💽', badge:'IO+', color:'warn',
    cmds:[
      ['cat /sys/block/*/queue/scheduler','Current I/O schedulers'],
      ['echo bfq | sudo tee /sys/block/sda/queue/scheduler','BFQ: smoother desktop on HDD'],
      ['echo \'ACTION=="add|change", KERNEL=="sd[a-z]", ATTR{queue/rotational}=="1", ATTR{queue/scheduler}="bfq"\' | sudo tee /etc/udev/rules.d/60-iosched.rules','Persistent for all HDDs'],
      ['sudo blockdev --getra /dev/sda','Read-ahead (512-byte sectors)'],
      ['sudo blockdev --setra 4096 /dev/sda','More read-ahead for big sequential reads'],
      ['findmnt -no OPTIONS /','Mount options (noatime? compress?)'],
      ['sudo iotop -oPa','Who wrote the most since start']],
    flags:[
      ['none','NVMe default (fast devices)'],
      ['mq-deadline','SATA SSD / server default'],
      ['bfq','Fairness; good for HDD desktops'],
      ['noatime','Don\'t write on every read'],
      ['blockdev --setra','Read-ahead size']],
    example:{cmd:'grep . /sys/block/*/queue/scheduler', out:
`/sys/block/nvme0n1/queue/scheduler:[none] mq-deadline kyber bfq
/sys/block/sda/queue/scheduler:none mq-deadline kyber [bfq]`} },

  { title:'Benchmarks & Stress Tests', icon:'🏋️', badge:'BENCH', color:'green',
    cmds:[
      ['sudo dnf install sysbench stress-ng 7zip',''],
      ['sysbench cpu --threads=$(nproc) run | grep "events per second"','CPU score'],
      ['sysbench memory run | grep -E "transferred|MiB/sec"','Memory bandwidth'],
      ['7z b','Compression benchmark (widely compared)'],
      ['openssl speed -evp aes-256-gcm','Crypto throughput'],
      ['stress-ng --cpu $(nproc) --timeout 120s --metrics-brief','Full CPU load for 2 minutes'],
      ['watch -n2 sensors','…watch temperatures meanwhile'],
      ['stress-ng --vm 2 --vm-bytes 75% --timeout 60s','Memory stress']],
    flags:[
      ['--threads=N','sysbench threads'],
      ['--cpu N / --vm N','stress-ng workers'],
      ['--timeout','How long'],
      ['--metrics-brief','Results summary'],
      ['--vm-bytes 75%','How much RAM']],
    example:{cmd:'sysbench cpu --threads=16 run | grep "events per second"', out:`    events per second: 41823.57`},
    warn:'Stress tests push hardware to its thermal limits — watch temperatures, especially on laptops.' },

  { title:'Long-term Monitoring', icon:'📼', badge:'HISTORY', color:'blue',
    cmds:[
      ['sudo dnf install atop && sudo systemctl enable --now atop','Records a snapshot every 10 min'],
      ['atop -r /var/log/atop/atop_$(date +%Y%m%d)','Replay today (t / T = forward / back)'],
      ['sudo dnf install pcp-zeroconf','Performance Co-Pilot: auto-logging'],
      ['pmstat -t 2','vmstat-like view from PCP'],
      ['pcp atop','atop over PCP data'],
      ['sudo dnf install cockpit-pcp','Metrics history graphs in Cockpit'],
      ['sudo dnf install glances && glances','All-in-one dashboard'],
      ['glances -w','…as a web page on :61208']],
    flags:[
      ['atop -r <file>','Read a recording'],
      ['atop -b 14:00','Begin at a time'],
      ['pmlogger','PCP recorder service'],
      ['pmrep <metric>','Custom PCP reports'],
      ['glances -w / --export','Web / to InfluxDB etc.']],
    example:{cmd:'pmstat -t 2 -s 2', out:
`@ Wed Sep 30 02:06:12 2026
 loadavg                      memory      swap        io    system         cpu
   1 min   swpd   free   buff  cache   pi   po   bi   bo   in   cs  us  sy  id
    0.41      0 18.0g   8312  7.3g    0    0    0   44 1712 2904   3   1  96
    0.40      0 18.0g   8312  7.3g    0    0    0   12 1650 2811   2   1  97`},
    tip:'Past data answers "what was slow last night?" — something live tools can\'t.' },

  { title:'GPU Monitoring', icon:'🎮', badge:'GPU', color:'green',
    cmds:[
      ['sudo dnf install nvtop','htop for GPUs (AMD, Intel, NVIDIA)'],
      ['nvtop',''],
      ['sudo dnf install igt-gpu-tools && sudo intel_gpu_top','Intel GPU engines'],
      ['sudo dnf install radeontop && radeontop','AMD GPU blocks'],
      ['nvidia-smi dmon -s pucm','NVIDIA: power, util, clocks, memory per second'],
      ['cat /sys/class/drm/card*/device/gpu_busy_percent','AMD busy % (quick)'],
      ['sudo dnf install mangohud && mangohud glxgears','FPS / frame-time overlay in games']],
    flags:[
      ['nvtop','Multi-vendor'],
      ['intel_gpu_top -l','List mode'],
      ['radeontop -c','Colour'],
      ['nvidia-smi dmon -s <cols>','p power · u util · c clocks · m memory'],
      ['MANGOHUD=1 %command%','Steam launch option']],
    example:{cmd:'nvidia-smi dmon -s pu -c 3', out:
`# gpu   pwr gtemp mtemp    sm   mem   enc   dec
# Idx     W     C     C     %     %     %     %
    0    18    41     -     2     1     0     0
    0   142    63     -    97    48     0     0
    0   151    64     -    99    51     0     0`} }
);
})();

/* ═════════════════ MORE SHELL (v2.21) ═════════════════ */
(function () {
const s = window.FB_DATA.find(x => x.id === 'shell');
s.cards.push(
  { title:'Functions & Arguments', icon:'🧩', badge:'FUNC', color:'blue',
    code:
`#!/usr/bin/env bash
greet() {
  local name=\${1:-world}      # first arg, default "world"
  echo "Hello, $name"
}

sum() {
  local total=0
  for n in "$@"; do (( total += n )); done
  echo "$total"                # "return" data by printing it
}

is_root() { [[ $EUID -eq 0 ]]; }   # exit status = true/false

greet Sooraj
result=$(sum 4 5 6)
echo "sum=$result, args given: $#"
is_root || echo "not root"`,
    flags:[
      ['$1 … $9, ${10}','Positional arguments'],
      ['$@  /  "$@"','All args (quote it to keep spaces)'],
      ['$#','Number of args'],
      ['$0','Script name'],
      ['shift [n]','Drop the first n args'],
      ['local','Variable only inside the function'],
      ['return N','Exit status 0–255 (not data!)'],
      ['$?','Status of the last command/function']],
    example:{cmd:'sum() { local t=0; for n in "$@"; do (( t += n )); done; echo "$t"; }; sum 4 5 6', out:`15`},
    tip:'Functions return <b>status</b> with <code>return</code> and <b>data</b> by printing it — capture it with <code>$(…)</code>.' },

  { title:'Parse Options with getopts', icon:'🎛️', badge:'GETOPTS', color:'blue',
    code:
`#!/usr/bin/env bash
usage() { echo "Usage: $0 [-v] [-o file] [-n count] input…"; exit 1; }

verbose=false; out=/dev/stdout; count=1
while getopts ":vo:n:h" opt; do
  case $opt in
    v) verbose=true ;;
    o) out=$OPTARG ;;
    n) count=$OPTARG ;;
    h) usage ;;
    :) echo "Option -$OPTARG needs a value" >&2; usage ;;
    \\?) echo "Unknown option -$OPTARG" >&2; usage ;;
  esac
done
shift $((OPTIND - 1))          # now $@ = the remaining inputs
[[ $# -ge 1 ]] || usage

$verbose && echo "count=$count out=$out files=$*"`,
    flags:[
      ['"vo:n:"','Letters; a colon = option takes a value'],
      ['leading ":"','Silent errors — handle : and ? yourself'],
      ['$OPTARG','Value of the current option'],
      ['$OPTIND','Index of next arg — shift it away after the loop'],
      ['getopts','Short options only (-v, -o x); long ones need a manual case loop']],
    example:{cmd:'./tool.sh -v -n 3 -o out.txt a.txt b.txt', out:`count=3 out=out.txt files=a.txt b.txt`} },

  { title:'Read Input & Files Line by Line', icon:'📥', badge:'READ', color:'green',
    cmds:[
      ['read -rp "Your name: " name','Prompt for input'],
      ['read -rsp "Password: " pw; echo','Hidden input'],
      ['read -rt 10 -p "Continue? [y/N] " ans || ans=n','Timeout after 10 s'],
      ['while IFS= read -r line; do echo ">> $line"; done < file.txt','Every line, exactly as written'],
      ['while IFS=, read -r name age city; do echo "$name is $age"; done < people.csv','Split CSV columns'],
      ['mapfile -t lines < file.txt; echo "${#lines[@]} lines, first: ${lines[0]}"','Whole file into an array'],
      ['while read -r pid comm; do echo "$pid=$comm"; done < <(ps -eo pid=,comm= | head -3)','Loop over command output (keeps variables!)']],
    flags:[
      ['-r','Don\'t treat backslashes specially (always use it)'],
      ['-p "<prompt>"','Prompt text'],
      ['-s','Silent (passwords)'],
      ['-t <sec>','Timeout'],
      ['-n N','Read N characters (e.g. -n1 for y/n)'],
      ['IFS=','Keep leading/trailing spaces'],
      ['mapfile -t','Array, strip newlines']],
    example:{cmd:'printf "alice,31\\nbob,27\\n" | while IFS=, read -r n a; do echo "$n is $a"; done', out:
`alice is 31
bob is 27`},
    tip:'<code>cmd | while read …</code> runs in a subshell, so variables set inside vanish. Use <code>done &lt; &lt;(cmd)</code> instead.' },

  { title:'Error Handling & Debugging', icon:'🐛', badge:'DEBUG', color:'red',
    code:
`#!/usr/bin/env bash
set -Eeuo pipefail
trap 'echo "✗ line $LINENO: $BASH_COMMAND (exit $?)" >&2' ERR
trap 'rm -rf "$tmp"' EXIT

tmp=$(mktemp -d)
: "\${API_KEY:?API_KEY must be set}"   # stop with a message if unset

grep -q pattern file.txt || true        # allowed to fail
if ! cp big.iso "$tmp"/; then
  echo "copy failed, continuing" >&2
fi`,
    cmds:[
      ['bash -n script.sh','Syntax check only'],
      ['bash -x script.sh','Trace every command'],
      ['PS4=\'+ ${BASH_SOURCE}:${LINENO}: \' bash -x script.sh','Trace with file:line'],
      ['set -x; risky_part; set +x','Trace one section'],
      ['sudo dnf install ShellCheck && shellcheck script.sh','Find bugs before running']],
    flags:[
      ['set -e','Exit on error'],
      ['set -u','Error on unset variables'],
      ['set -o pipefail','A failing pipe stage fails the pipe'],
      ['set -E','ERR trap works inside functions'],
      ['trap … ERR / EXIT / INT','Run code on error / exit / Ctrl+C'],
      ['${VAR:?msg}','Abort if unset/empty'],
      ['cmd || true','Allow one command to fail']],
    example:{cmd:'bash -c \'set -e; trap "echo failed at line \\$LINENO" ERR; true; false; echo never\'', out:`failed at line 1`},
    tip:'ShellCheck catches most quoting bugs — run it on every script.' },

  { title:'Maths & Command Substitution', icon:'🧮', badge:'MATH', color:'blue',
    cmds:[
      ['echo $(( 7 * 6 ))','Integer maths'],
      ['echo $(( 17 / 5 )) $(( 17 % 5 ))','Division + remainder'],
      ['(( count++ )); echo $count','Increment'],
      ['(( disk > 90 )) && echo "disk nearly full"','Numeric condition'],
      ['echo "scale=2; 10 / 3" | bc','Decimals with bc'],
      ['awk "BEGIN{printf \\"%.1f\\n\\", 1024/3}"','Decimals with awk'],
      ['printf -v pct "%.0f" "$(echo "0.4567*100" | bc)"; echo "$pct%"','Format into a variable'],
      ['files=$(ls | wc -l); echo "$files files"','Capture command output'],
      ['echo $(( RANDOM % 6 + 1 ))','Dice roll'],
      ['echo $(( 16#ff )) $(( 2#1010 ))','Hex / binary to decimal']],
    flags:[
      ['$(( expr ))','Arithmetic → value'],
      ['(( expr ))','Arithmetic → true/false'],
      ['$( cmd )','Command substitution (prefer over backticks)'],
      ['** / % / <<','Power / modulo / bit shift'],
      ['bc -l','Floating point'],
      ['$RANDOM','0–32767']],
    example:{cmd:'echo $(( 2**10 )) $(( 17 % 5 )) $(( 16#ff )); echo "scale=3; 22/7" | bc', out:
`1024 2 255
3.142`} },

  { title:'Advanced Globbing (shopt)', icon:'✳️', badge:'GLOB+', color:'blue',
    cmds:[
      ['shopt -s globstar; ls **/*.md','** = any depth of folders'],
      ['shopt -s nullglob; for f in *.xyz; do echo "$f"; done','No matches → loop runs zero times'],
      ['shopt -s dotglob; cp -r src/* dst/','* includes hidden files'],
      ['shopt -s extglob','Enable extglob — on its OWN line (bash parses a line before running it)'],
      ['rm -v !(*.jpg|*.png)','…then: delete everything EXCEPT images'],
      ['ls +([0-9]).log','…one or more digits'],
      ['shopt -s nocaseglob; ls *.JPG','Case-insensitive'],
      ['shopt | grep " on"','Which options are on']],
    flags:[
      ['globstar','**/ recursion'],
      ['nullglob','Unmatched glob → nothing'],
      ['failglob','Unmatched glob → error'],
      ['dotglob','Include .dotfiles'],
      ['extglob','!(p) ?(p) *(p) +(p) @(p)'],
      ['nocaseglob','Ignore case'],
      ['shopt -u <opt>','Turn off']],
    example:{cmd:'shopt -s globstar; ls **/*.md', out:
`README.md
docs/install.md
docs/api/endpoints.md`},
    warn:'Try <code>!(…)</code> patterns with <code>ls</code> or <code>echo</code> before <code>rm</code>.' },

  { title:'Directory Stack & Line Editing', icon:'📚', badge:'EDIT', color:'green',
    cmds:[
      ['pushd /etc/nginx','Go there, remember where you were'],
      ['pushd /var/log',''],
      ['dirs -v','Numbered stack'],
      ['popd','Back one step'],
      ['cd ~2','Jump to stack entry 2'],
      ['export CDPATH=.:~:~/Projects','cd myapp works from anywhere'],
      ['fc','Edit the last command in $EDITOR, then run it'],
      ['set -o vi','Vi keys on the command line (set -o emacs to undo)'],
      ['bind -P | grep -c "can be found"','How many key bindings exist']],
    table:{head:['Keys','Action'], rows:[
      ['Ctrl+X Ctrl+E','Open current line in your editor'],
      ['Alt+B / Alt+F','Back / forward one word'],
      ['Ctrl+W / Alt+D','Delete word before / after'],
      ['Ctrl+Y','Paste what you just deleted'],
      ['Alt+.','Last argument of previous command (repeat to go further back)'],
      ['Ctrl+_','Undo'],
      ['Esc then #','Comment out the line and keep it in history']]},
    flags:[
      ['pushd / popd / dirs','Directory stack'],
      ['dirs -c','Clear stack'],
      ['CDPATH','Search path for cd'],
      ['fc -l','List recent history'],
      ['fc -s old=new','Re-run with a substitution']],
    example:{cmd:'pushd /etc/nginx >/dev/null; pushd /var/log >/dev/null; dirs -v', out:
` 0  /var/log
 1  /etc/nginx
 2  ~`} },

  { title:'Colours & Pretty Output', icon:'🎨', badge:'COLOR', color:'green',
    code:
`#!/usr/bin/env bash
if [[ -t 1 ]]; then                 # only colour when printing to a terminal
  RED=$(tput setaf 1) GRN=$(tput setaf 2) YLW=$(tput setaf 3)
  BLD=$(tput bold) RST=$(tput sgr0)
fi
ok()   { printf "%s✔%s %s\\n" "$GRN" "$RST" "$*"; }
warn() { printf "%s!%s %s\\n" "$YLW" "$RST" "$*"; }
fail() { printf "%s✘ %s%s\\n" "$RED$BLD" "$*" "$RST" >&2; }

ok "Backup finished"
warn "Disk 85% full"

# spinner while a job runs
long_job & pid=$!
while kill -0 $pid 2>/dev/null; do
  for c in / - \\\\ '|'; do printf "\\r%s working…" "$c"; sleep .1; done
done; printf "\\r"`,
    cmds:[
      ['printf "\\e[1;32mSUCCESS\\e[0m\\n"','Raw ANSI escape'],
      ['tput cols; tput lines','Terminal size'],
      ['printf "%-12s %8s\\n" Name Size; printf "%-12s %8s\\n" report.pdf 1.2M','Aligned columns'],
      ['column -t -s, data.csv','Auto-align CSV'],
      ['printf "%.0s─" {1..40}; echo','Draw a line']],
    flags:[
      ['tput setaf 0–7','Colour: black red green yellow blue magenta cyan white'],
      ['tput bold / sgr0','Bold / reset'],
      ['[[ -t 1 ]]','stdout is a terminal?'],
      ['printf "%-10s"','Left-align in 10 chars'],
      ['\\r','Return to line start (redraw)']],
    example:{cmd:'printf "%-12s %8s\\n" Name Size report.pdf 1.2M notes.txt 4K', out:
`Name             Size
report.pdf       1.2M
notes.txt          4K`} },

  { title:'Handy Script Snippets', icon:'🧰', badge:'SNIPPETS', color:'blue',
    code:
`# Must run as root
[[ $EUID -eq 0 ]] || { echo "Run with sudo" >&2; exit 1; }

# Required commands exist
for c in rsync jq curl; do
  command -v "$c" >/dev/null || { echo "Missing: $c" >&2; exit 1; }
done

# Only one copy at a time
exec 9>/tmp/myscript.lock
flock -n 9 || { echo "Already running" >&2; exit 1; }

# Ask yes/no
confirm() { read -rp "\${1:-Continue?} [y/N] " a; [[ $a =~ ^[Yy]$ ]]; }
confirm "Delete old backups?" || exit 0

# Retry up to 5 times with a pause
for i in {1..5}; do curl -fsS https://example.com && break; sleep $((i*2)); done

# Timestamped log to screen + file
log() { echo "[$(date '+%F %T')] $*" | tee -a "$HOME/script.log"; }

# Directory the script lives in
here=$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)

# Elapsed time
start=$SECONDS; sleep 2; echo "took $((SECONDS - start))s"`,
    flags:[
      ['command -v','Portable "is it installed?"'],
      ['flock -n','Fail instead of waiting'],
      ['[[ $a =~ regex ]]','Regex match'],
      ['$SECONDS','Seconds since the shell started'],
      ['${BASH_SOURCE[0]}','Path of the script itself']],
    example:{cmd:'start=$SECONDS; sleep 2; echo "took $((SECONDS - start))s"', out:`took 2s`} },

  { title:'Other Shells: zsh & fish', icon:'🐚', badge:'SHELLS', color:'green',
    cmds:[
      ['echo $SHELL; cat /etc/shells','Current + installed shells'],
      ['sudo dnf install zsh fish',''],
      ['fish','Try it without switching'],
      ['chsh -s /usr/bin/fish','Make fish your login shell (re-login)'],
      ['chsh -s /usr/bin/zsh',''],
      ['chsh -s /bin/bash','Back to bash'],
      ['fish_config','fish: colours + prompt in a browser'],
      ['sudo dnf install zsh-autosuggestions zsh-syntax-highlighting','zsh plugins from the repos']],
    table:{head:['','bash','zsh','fish'], rows:[
      ['Default','Yes','No','No'],
      ['Bash syntax','Yes','Mostly','No'],
      ['Suggestions','No','Plugin','Built-in'],
      ['Highlighting','No','Plugin','Built-in'],
      ['Config','.bashrc','.zshrc','config.fish']]},
    flags:[
      ['chsh -s <path>','Change login shell'],
      ['#!/usr/bin/env bash','Scripts still run in bash whatever your shell is'],
      ['exec zsh','Replace current shell for this session']],
    example:{cmd:'cat /etc/shells', out:
`/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash
/usr/bin/zsh
/usr/bin/fish`},
    tip:'Keep writing scripts for bash — change only your interactive shell.' }
);
})();

/* ═════════════════ MORE GIT (v2.22) ═════════════════ */
(function () {
const g = window.FB_DATA.find(x => x.id === 'git');
g.cards.push(
  { title:'Sign In: SSH, HTTPS & GitHub CLI', icon:'🔑', badge:'AUTH', color:'green',
    cmds:[
      ['ssh-keygen -t ed25519 -C "you@example.com"','Key for GitHub/GitLab'],
      ['cat ~/.ssh/id_ed25519.pub | wl-copy','Copy public key → paste in the site\'s SSH keys page'],
      ['ssh -T git@github.com','Test (says "Hi <user>!")'],
      ['git remote set-url origin git@github.com:user/repo.git','Switch a clone from HTTPS to SSH'],
      ['sudo dnf install git-credential-libsecret',''],
      ['git config --global credential.helper /usr/libexec/git-core/git-credential-libsecret','HTTPS tokens stored in GNOME Keyring'],
      ['sudo dnf install gh && gh auth login','GitHub CLI login (browser flow)'],
      ['gh repo clone user/repo',''],
      ['gh pr create --fill','Open a pull request from this branch'],
      ['gh pr checkout 42','Check out someone\'s PR locally']],
    flags:[
      ['git@host:user/repo.git','SSH URL'],
      ['https://host/user/repo.git','HTTPS URL (needs a token, not your password)'],
      ['credential.helper','Where HTTPS credentials are kept'],
      ['gh pr list / view / merge','Pull requests from the terminal'],
      ['gh issue list / create','Issues']],
    example:{cmd:'ssh -T git@github.com', out:`Hi sooraj! You've successfully authenticated, but GitHub does not provide shell access.`} },

  { title:'Remotes & Forks', icon:'🌐', badge:'REMOTE', color:'blue',
    cmds:[
      ['git remote -v','Where pushes/pulls go'],
      ['git remote add upstream https://github.com/original/repo.git','Track the original of your fork'],
      ['git fetch upstream',''],
      ['git switch main && git merge --ff-only upstream/main','Update your fork\'s main…'],
      ['git push origin main','…and push it'],
      ['git fetch --all --prune','Refresh everything, drop deleted branches'],
      ['git branch -vv','Which remote branch each local one tracks'],
      ['git branch -u origin/feature','Set upstream for current branch'],
      ['git remote rename origin old && git remote remove old','Rename / remove']],
    flags:[
      ['fetch','Download, don\'t touch your branches'],
      ['pull','fetch + merge (or rebase)'],
      ['--prune','Forget branches deleted on the remote'],
      ['--ff-only','Refuse if a real merge would be needed'],
      ['origin / upstream','Conventional names: your copy / the original']],
    example:{cmd:'git remote -v', out:
`origin	git@github.com:sooraj/fedora-bible.git (fetch)
origin	git@github.com:sooraj/fedora-bible.git (push)
upstream	https://github.com/original/fedora-bible.git (fetch)
upstream	https://github.com/original/fedora-bible.git (push)`} },

  { title:'Search History', icon:'🔎', badge:'LOG', color:'blue',
    cmds:[
      ['git log --oneline --graph --decorate --all','Visual history'],
      ['git log --author="Sooraj" --since="2 weeks ago" --oneline',''],
      ['git log -S "API_KEY" --oneline','Commits that added/removed a string'],
      ['git log -G "func\\s+main" --oneline','…matching a regex'],
      ['git log --follow -p -- src/app.js','One file\'s history, across renames'],
      ['git log main..feature --oneline','Commits on feature not yet in main'],
      ['git blame -L 40,60 src/app.js','Who last changed lines 40–60'],
      ['git show a1b2c3d:src/app.js','A file as it was in a commit'],
      ['git shortlog -sn HEAD','Commits per author'],
      ['git grep -n "TODO" $(git rev-list --all | head -50)','Search old versions too']],
    flags:[
      ['--oneline / --graph / --all','Compact / tree / every branch'],
      ['--author= / --since= / --until=','Filters'],
      ['-S "<str>"','Pickaxe: count of string changed'],
      ['-G "<regex>"','Diff lines match regex'],
      ['--follow','Track renames (one file)'],
      ['A..B','In B but not in A'],
      ['blame -w -C','Ignore whitespace, detect moved code']],
    example:{cmd:'git shortlog -sn HEAD', out:
`   142  Sooraj
    37  Alice
     5  dependabot[bot]`},
    tip:'<code>git shortlog</code> without <code>HEAD</code> reads from stdin when piped or scripted — always pass a revision.' },

  { title:'Diffs & Comparing', icon:'⚖️', badge:'DIFF', color:'blue',
    cmds:[
      ['git diff','Unstaged changes'],
      ['git diff --staged','Staged changes'],
      ['git diff HEAD~3','Since 3 commits ago'],
      ['git diff main...feature','What feature changed since it branched'],
      ['git diff --stat main','Files + line counts'],
      ['git diff --name-only HEAD~1','Just file names'],
      ['git diff --word-diff README.md','Word-level (great for prose)'],
      ['git difftool -t meld main','Visual diff in Meld'],
      ['git range-diff main old-feature new-feature','Compare two versions of a rebased branch']],
    flags:[
      ['--staged / --cached','Index vs HEAD'],
      ['A..B / A...B','Between / since merge-base'],
      ['--stat / --name-only / --name-status','Summaries'],
      ['-w','Ignore whitespace'],
      ['--word-diff','Inline word changes'],
      ['-- <path>','Limit to a path']],
    example:{cmd:'git diff --stat main', out:
` app.js      | 42 ++++++++++++++++++++++++++++++++----------
 data.js     | 318 ++++++++++++++++++++++++++++++++++++++++++++++++
 index.html  |   6 ++--
 3 files changed, 348 insertions(+), 18 deletions(-)`} },

  { title:'Cherry-pick, Revert & Patches', icon:'🍒', badge:'PICK', color:'green',
    cmds:[
      ['git cherry-pick a1b2c3d','Copy one commit onto this branch'],
      ['git cherry-pick a1b2c3d^..f9e8d7c','A range'],
      ['git cherry-pick -n a1b2c3d','Apply changes without committing'],
      ['git cherry-pick --abort',''],
      ['git revert a1b2c3d','Undo a pushed commit safely (new commit)'],
      ['git revert -m 1 <merge-sha>','Undo a merge commit'],
      ['git format-patch -3 -o patches/','Last 3 commits as .patch files'],
      ['git am patches/*.patch','Apply patches as commits (keeps author)'],
      ['git diff > fix.diff && git apply fix.diff','Plain diff → apply elsewhere']],
    flags:[
      ['-x','Add "(cherry picked from …)" note'],
      ['-n / --no-commit','Stage only'],
      ['--continue / --abort / --skip','After conflicts'],
      ['revert -m 1','Keep mainline parent of a merge'],
      ['apply --check','Test if a patch applies']],
    example:{cmd:'git cherry-pick -x a1b2c3d', out:
`[release-2.1 7e4d2c1] Fix crash when search is empty
 Date: Tue Sep 29 22:14:03 2026 +0300
 1 file changed, 3 insertions(+), 1 deletion(-)`} },

  { title:'Rewrite History (Interactive Rebase)', icon:'✂️', badge:'REBASE', color:'warn', tableFirst:true,
    table:{head:['Command in the editor','Effect'], rows:[
      ['pick','Keep commit as is'],
      ['reword (r)','Keep, change message'],
      ['edit (e)','Stop to amend the commit'],
      ['squash (s)','Merge into previous, combine messages'],
      ['fixup (f)','Merge into previous, drop this message'],
      ['drop (d)','Delete the commit'],
      ['reorder lines','Reorder commits']]},
    cmds:[
      ['git rebase -i HEAD~5','Edit the last 5 commits'],
      ['git commit --fixup=a1b2c3d','Make a "fixup!" commit for an older one…'],
      ['git rebase -i --autosquash main','…and fold it in automatically'],
      ['git commit --amend --reset-author --no-edit','Fix author on the last commit'],
      ['git rebase --continue','After fixing a stop'],
      ['git rebase --abort','Give up, back to before'],
      ['git push --force-with-lease','Update the remote after rewriting'],
      ['git config --global rebase.autoSquash true','Always autosquash']],
    flags:[
      ['-i','Interactive'],
      ['--autosquash','Apply fixup!/squash! commits'],
      ['--onto <new> <old>','Move a branch base'],
      ['--exec "make test"','Run a command after each commit'],
      ['--force-with-lease','Only overwrite if nobody else pushed']],
    example:{cmd:'git rebase -i --autosquash main', out:`Successfully rebased and updated refs/heads/feature.`},
    danger:'Only rewrite commits that nobody else has pulled. On shared branches use <code>git revert</code>.' },

  { title:'Merge Conflicts', icon:'⚔️', badge:'CONFLICT', color:'red',
    cmds:[
      ['git status','Which files conflict'],
      ['git diff --name-only --diff-filter=U','Just the conflicted files'],
      ['git checkout --ours config.yml','Keep my version of a file'],
      ['git checkout --theirs config.yml','Take their version'],
      ['git mergetool -t meld','Resolve in Meld'],
      ['git add config.yml && git commit','Mark resolved + finish merge'],
      ['git merge --abort','Back to before the merge'],
      ['git config --global merge.conflictStyle zdiff3','Show the original text in conflicts too'],
      ['git config --global rerere.enabled true','Remember how you solved a conflict']],
    code:
`<<<<<<< HEAD
timeout: 30
||||||| base
timeout: 10
=======
timeout: 60
>>>>>>> feature/slow-network`,
    flags:[
      ['<<<<<<< / ======= / >>>>>>>','Your side / their side'],
      ['||||||| base','Original (zdiff3 style)'],
      ['--ours / --theirs','Pick a side (during rebase they swap!)'],
      ['--diff-filter=U','Unmerged files'],
      ['rerere','Reuse recorded resolutions']],
    example:{cmd:'git status --short', out:
`UU config.yml
M  src/app.js
A  src/net.js`},
    tip:'During a <b>rebase</b>, "ours" is the branch you are rebasing onto and "theirs" is your own commit — the opposite of a merge.' },

  { title:'Tags & Releases', icon:'🏷️', badge:'TAGS', color:'blue',
    cmds:[
      ['git tag','List tags'],
      ['git tag -a v2.1.0 -m "Release 2.1.0"','Annotated tag (recommended)'],
      ['git tag -a v2.0.1 a1b2c3d -m "Hotfix"','Tag an older commit'],
      ['git push origin v2.1.0','Push one tag'],
      ['git push --follow-tags','Push commits + their annotated tags'],
      ['git describe --tags','Version string like v2.1.0-3-g9f3c2a1'],
      ['git tag -d v2.1.0 && git push origin :refs/tags/v2.1.0','Delete locally + remotely'],
      ['git archive --format=tar.gz --prefix=app-2.1.0/ -o app-2.1.0.tar.gz v2.1.0','Release tarball'],
      ['gh release create v2.1.0 app-2.1.0.tar.gz --generate-notes','GitHub release with notes']],
    flags:[
      ['-a','Annotated (has author, date, message)'],
      ['-s','Signed tag'],
      ['-l "v2.*"','List by pattern'],
      ['--sort=-v:refname','Newest version first'],
      ['describe --tags --abbrev=0','Latest tag only']],
    example:{cmd:'git describe --tags', out:`v1.0-1-gaa3f9f4`} },

  { title:'Find the Bad Commit (bisect)', icon:'🎯', badge:'BISECT', color:'green',
    cmds:[
      ['git bisect start',''],
      ['git bisect bad','Current version is broken'],
      ['git bisect good v2.0.0','This one worked'],
      ['# Test, then mark each step: git bisect good | git bisect bad',''],
      ['git bisect run ./test.sh','Automate: script exits 0 = good, 1 = bad'],
      ['git bisect log','Steps so far'],
      ['git bisect reset','Back to where you started']],
    flags:[
      ['start / good / bad','Basic flow'],
      ['skip','Can\'t test this one'],
      ['run <cmd>','Fully automatic'],
      ['exit 125 in script','= skip'],
      ['terms --term-old/new','Use other words than good/bad']],
    example:{cmd:'git bisect run ./test.sh | tail -4', out:
`9f3c2a1b7e4d2c1a0b9e8d7f6c5b4a3928170615 is the first bad commit
commit 9f3c2a1b7e4d2c1a0b9e8d7f6c5b4a3928170615
Author: Alice <alice@example.com>
    Switch search to async index`},
    tip:'Even with 1000 commits between good and bad, bisect needs only about 10 tests.' },

  { title:'.gitignore, Attributes & Large Files', icon:'🙈', badge:'IGNORE', color:'blue',
    code:
`# .gitignore
node_modules/
*.log
.env
build/
!build/.keep

# .gitattributes
* text=auto eol=lf
*.sh text eol=lf
*.bat text eol=crlf
*.png binary
*.psd filter=lfs diff=lfs merge=lfs -text`,
    cmds:[
      ['git check-ignore -v debug.log','Which rule ignores a file'],
      ['git rm -r --cached node_modules && git commit -m "Stop tracking node_modules"','Untrack something already committed'],
      ['git config --global core.excludesFile ~/.gitignore_global','Personal ignores for every repo'],
      ['git status --ignored','Show ignored files'],
      ['sudo dnf install git-lfs && git lfs install','Large File Storage'],
      ['git lfs track "*.psd" && git add .gitattributes','Store big binaries outside the repo'],
      ['git lfs ls-files','Files in LFS']],
    flags:[
      ['dir/','Ignore a directory'],
      ['*.ext','Pattern'],
      ['!pattern','Re-include'],
      ['/file','Only at repo root'],
      ['**/','Any depth'],
      ['eol=lf','Force Unix line endings']],
    example:{cmd:'git check-ignore -v debug.log', out:`.gitignore:2:*.log	debug.log`} },

  { title:'Worktrees & Submodules', icon:'🌿', badge:'WORKTREE', color:'blue',
    cmds:[
      ['git worktree add ../app-hotfix hotfix/login','Second checkout of another branch, same repo'],
      ['git worktree add -b feature/x ../app-x main','New branch in a new folder'],
      ['git worktree list',''],
      ['git worktree remove ../app-hotfix',''],
      ['git submodule add https://github.com/lib/foo.git vendor/foo','Embed another repo'],
      ['git clone --recurse-submodules <url>','Clone with submodules'],
      ['git submodule update --init --recursive','Fetch submodules after a normal clone'],
      ['git submodule update --remote','Move submodules to their latest commit']],
    flags:[
      ['worktree add <path> <branch>','Extra working folder'],
      ['worktree prune','Clean up deleted folders'],
      ['--recurse-submodules','Clone / pull submodules too'],
      ['submodule foreach "git pull"','Command in every submodule']],
    example:{cmd:'git worktree list', out:
`/home/sooraj/Projects/app         9f3c2a1 [main]
/home/sooraj/Projects/app-hotfix  7e4d2c1 [hotfix/login]`},
    tip:'Worktrees let you fix a bug on another branch without stashing or losing your build.' },

  { title:'Sign Your Commits', icon:'✍️', badge:'SIGN', color:'green',
    cmds:[
      ['git config --global gpg.format ssh','Sign with your SSH key (simplest)'],
      ['git config --global user.signingkey ~/.ssh/id_ed25519.pub',''],
      ['git config --global commit.gpgsign true','Sign every commit'],
      ['git config --global tag.gpgsign true','…and every tag'],
      ['echo "you@example.com $(cat ~/.ssh/id_ed25519.pub)" >> ~/.config/git/allowed_signers','Trust list for verifying'],
      ['git config --global gpg.ssh.allowedSignersFile ~/.config/git/allowed_signers',''],
      ['git log --show-signature -1','Check a signature'],
      ['git verify-tag v2.1.0','Verify a tag']],
    flags:[
      ['-S','Sign this commit'],
      ['gpg.format ssh | openpgp','Key type'],
      ['user.signingkey','Which key'],
      ['--show-signature','Verify in log']],
    example:{cmd:'git log --show-signature -1 --format="%h %s"', out:
`Good "git" signature for you@example.com with ED25519 key SHA256:q3Vd8m2fH1k0yZp7c9sL4xTnR5bJw6eA2uGiK8oN1Yc
9f3c2a1 Add DNF5 examples`},
    tip:'Add the same key as a <b>Signing key</b> on GitHub/GitLab to get the "Verified" badge.' },

  { title:'Hooks & Maintenance', icon:'🧹', badge:'MAINT', color:'blue',
    code:
`#!/usr/bin/env bash
# .git/hooks/pre-commit  (chmod +x) — block secrets + lint staged shell scripts
if git diff --cached | grep -qE 'API_KEY|PRIVATE KEY'; then
  echo "✘ Possible secret in staged changes" >&2; exit 1
fi
files=$(git diff --cached --name-only --diff-filter=ACM -- '*.sh')
if [[ -n $files ]] && command -v shellcheck >/dev/null; then
  shellcheck $files || exit 1
fi`,
    cmds:[
      ['chmod +x .git/hooks/pre-commit','Enable the hook'],
      ['git commit --no-verify','Skip hooks once'],
      ['git config core.hooksPath .githooks','Keep hooks in the repo (shared)'],
      ['git count-objects -vH','Repo size'],
      ['git gc --aggressive --prune=now','Compact the repository'],
      ['git maintenance start','Background upkeep (scheduled)'],
      ['git fsck','Check for corruption'],
      ['git rev-list --objects --all | git cat-file --batch-check="%(objecttype) %(objectsize) %(rest)" | awk \'$1=="blob"\' | sort -k2 -n | tail -5','Biggest files ever committed']],
    flags:[
      ['pre-commit / commit-msg / pre-push','Common hooks'],
      ['exit non-zero','Block the action'],
      ['--no-verify','Bypass hooks'],
      ['core.hooksPath','Custom hooks folder'],
      ['gc --prune=now','Drop unreachable objects now']],
    example:{cmd:'git count-objects -vH', out:
`count: 0
size: 0 bytes
in-pack: 1893
packs: 1
size-pack: 4.21 MiB
prune-packable: 0
garbage: 0
size-garbage: 0 bytes`} }
);
})();

/* ═════════════════ MORE EDITORS (v2.23) ═════════════════ */
(function () {
const e = window.FB_DATA.find(x => x.id === 'editors');
e.cards.push(
  { title:'Vim: Search & Replace', icon:'🔁', badge:'VIM-S', color:'blue', tableFirst:true,
    table:{mono:true, head:['Goal','Command'], rows:[
      ['Replace on this line',':s/old/new/g'],
      ['Replace in whole file',':%s/old/new/g'],
      ['…ask each time',':%s/old/new/gc'],
      ['Lines 10–20 only',':10,20s/old/new/g'],
      ['Inside a visual selection','select, then :s/old/new/g'],
      ['Whole word only',':%s/\\<id\\>/user_id/g'],
      ['Ignore case',':%s/error/ERROR/gi'],
      ['Regex groups (very magic)',':%s/\\v(\\w+)\\s+(\\w+)/\\2 \\1/'],
      ['Delete lines matching',':g/DEBUG/d'],
      ['Keep only lines matching',':v/ERROR/d'],
      ['Delete blank lines',':g/^\\s*$/d'],
      ['Search word under cursor','* (next)   # (previous)'],
      ['Clear highlight',':noh']]},
    flags:[
      ['g','All matches on the line'],
      ['c','Confirm each'],
      ['i / I','Ignore / match case'],
      ['n','Count matches only (:%s/x//gn)'],
      ['\\v','"Very magic" — regex like other tools'],
      ['&','Repeat last :s on this line'],
      [':g/pat/cmd','Run any command on matching lines']],
    cmds:[
      ['vim -c "%s/http:/https:/g | wq" links.txt','Replace from the shell, no UI']],
    example:{cmd:'printf "debug a\\nerror b\\ndebug c\\n" > t.txt && vim -es -c "g/debug/d" -c "wq" t.txt && cat t.txt', out:`error b`} },

  { title:'Vim: Text Objects', icon:'🧱', badge:'VIM-O', color:'green', tableFirst:true,
    desc:'Operator + <b>i</b>nside/<b>a</b>round + object. Works from anywhere inside the object.',
    table:{head:['Keys','Does'], rows:[
      ['diw / daw','Delete word / word + space'],
      ['ci"','Change inside quotes'],
      ['ca(','Change including parentheses'],
      ['yi{','Copy inside braces'],
      ['dit','Delete inside an HTML tag'],
      ['vip','Select a paragraph'],
      ['>i{','Indent a block'],
      ['gUiw','UPPERCASE a word'],
      ['dt,','Delete up to the next comma'],
      ['cf)','Change up to and including )'],
      ['d/foo<Enter>','Delete up to the next "foo"'],
      ['.','Repeat the last change anywhere']]},
    flags:[
      ['d / c / y / v','Delete / change / yank / select'],
      ['gU / gu / g~','Upper / lower / toggle case'],
      ['> / < / =','Indent / outdent / auto-indent'],
      ['w s p','Word, sentence, paragraph'],
      ['" \' ` ( [ { < t','Quotes, brackets, tags'],
      ['t<c> / f<c>','Till / find character']],
    cmds:[['vimtutor','Practice these in 30 minutes']],
    example:{cmd:'echo \'call("old value")\' > t.txt && vim -es -c \'normal f"ci"new value\' -c wq t.txt && cat t.txt', out:`call("new value")`} },

  { title:'Vim: Registers, Marks & Clipboard', icon:'📋', badge:'VIM-R', color:'blue', tableFirst:true,
    table:{head:['Keys','Does'], rows:[
      ['"ayy','Copy line into register a'],
      ['"ap','Paste register a'],
      ['"Ayy','APPEND line to register a'],
      [':reg','Show all registers'],
      ['"0p','Paste last yank (not last delete)'],
      ['Ctrl+R a','Insert register a while typing'],
      ['ma / \'a / `a','Set mark a / go to its line / exact spot'],
      ['\'\'','Back to where you jumped from'],
      ['Ctrl+O / Ctrl+I','Jump back / forward'],
      ['g;','Go to last change']]},
    cmds:[
      ['vim --version | grep -o "[+-]clipboard"','Does your vim have clipboard support?'],
      ['sudo dnf install vim-X11 && vimx file.txt','vimx has +clipboard: "+y copies, "+p pastes'],
      [':%w !wl-copy','Copy whole file to clipboard (Wayland)'],
      [':r !wl-paste','Paste clipboard below cursor'],
      [':\'<,\'>w !wl-copy','Copy the visual selection']],
    flags:[
      ['"+ / "*','System clipboard / primary selection'],
      ['"0','Last yank'],
      ['"1–"9','Recent deletes'],
      ['"_','Black hole (delete without saving)'],
      ['"%','Current file name']],
    example:{cmd:'vim --version | grep -o "[+-]clipboard"', out:`-clipboard`},
    tip:'Fedora\'s <code>vim-enhanced</code> is built without clipboard support — use <code>vimx</code>, Neovim, or the <code>wl-copy</code> tricks above.' },

  { title:'Vim: Buffers, Windows & Tabs', icon:'🪟', badge:'VIM-W', color:'blue', tableFirst:true,
    table:{head:['Command','Does'], rows:[
      [':e file / :e .','Open a file / browse the folder'],
      [':ls / :b 3 / :b name','List buffers / switch'],
      [':bn / :bp / :bd','Next / previous / close buffer'],
      [':sp / :vsp file','Split horizontal / vertical'],
      ['Ctrl+W h j k l','Move between splits'],
      ['Ctrl+W = / _ / |','Equalise / maximise height / width'],
      ['Ctrl+W o','Close all other splits'],
      [':tabnew file / gt / gT','New tab / next / previous'],
      [':wa / :qa / :wqa','Write all / quit all / both'],
      [':Ex / :Vex','File browser (netrw) / in a split'],
      [':terminal','Terminal inside vim (Ctrl+W N for normal mode)']]},
    flags:[
      ['vim -o a b','Open in horizontal splits'],
      ['vim -O a b','Vertical splits'],
      ['vim -p a b','Tabs'],
      [':set hidden','Switch buffers without saving first']],
    example:{cmd:'vim -Es +"e a.txt" +"e b.txt" +"redir >> /dev/stdout | ls | redir END" +"qa!"', out:
`  1 #    "a.txt"                        line 1
  2 %a   "b.txt"                        line 1`} },

  { title:'Vim: Launch Tricks & vimdiff', icon:'🚀', badge:'VIM-L', color:'green',
    cmds:[
      ['vim +42 app.py','Open at line 42'],
      ['vim +/TODO app.py','Open at first TODO'],
      ['view /etc/fstab','Read-only'],
      ['vim scp://user@server//etc/nginx/nginx.conf','Edit a remote file over SSH'],
      ['journalctl -b | vim -','Pipe output into vim'],
      ['vim -u NONE file','No config (debug a broken vimrc)'],
      ['vimdiff old.conf new.conf','Side-by-side diff'],
      ['git difftool -t vimdiff HEAD~1','Git diffs in vimdiff'],
      ['vim -c "set ff=unix" -c wq script.sh','Convert CRLF → LF from the shell']],
    table:{head:['In vimdiff','Does'], rows:[
      [']c / [c','Next / previous change'],
      ['do','Obtain change from the other side'],
      ['dp','Put change to the other side'],
      [':diffupdate','Refresh'],
      ['zo / zc','Open / close folded identical text']]},
    flags:[
      ['+N / +/pat','Start line / pattern'],
      ['-R','Read-only'],
      ['-d','Diff mode'],
      ['-c "<cmd>"','Run an ex command at start'],
      ['-es','Silent ex mode for scripts']],
    example:{cmd:'vim --version | head -1', out:`VIM - Vi IMproved 9.1 (2024 Jan 02, compiled Sep 12 2026 00:00:00)`} },

  { title:'Vim Plugins (Built-in Packages)', icon:'🧩', badge:'VIM-P', color:'blue',
    cmds:[
      ['mkdir -p ~/.vim/pack/plugins/start','Anything here loads automatically'],
      ['git clone --depth 1 https://github.com/tpope/vim-surround ~/.vim/pack/plugins/start/vim-surround','cs"\' → change surrounding quotes'],
      ['git clone --depth 1 https://github.com/tpope/vim-commentary ~/.vim/pack/plugins/start/vim-commentary','gcc → toggle comment'],
      ['git clone --depth 1 https://github.com/junegunn/fzf.vim ~/.vim/pack/plugins/start/fzf.vim','Fuzzy file finder (needs fzf)'],
      ['vim -c "helptags ALL" -c q','Build plugin help'],
      ['for d in ~/.vim/pack/plugins/start/*; do git -C "$d" pull --ff-only; done','Update all plugins'],
      ['rm -rf ~/.vim/pack/plugins/start/vim-surround','Remove a plugin']],
    flags:[
      ['pack/*/start/','Loaded at startup'],
      ['pack/*/opt/','Load on demand with :packadd name'],
      [':help <plugin>','Plugin docs after helptags'],
      ['vim-plug / Vundle','Optional plugin managers']],
    example:{cmd:'ls ~/.vim/pack/plugins/start/', out:`fzf.vim  vim-commentary  vim-surround`},
    tip:'No plugin manager needed — Vim 8+ loads everything in <code>pack/*/start</code> by itself.' },

  { title:'Neovim', icon:'💚', badge:'NVIM', color:'green',
    code:
`-- ~/.config/nvim/init.lua  (minimal, no plugins)
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.expandtab = true
vim.opt.shiftwidth = 4
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.clipboard = "unnamedplus"   -- uses wl-copy on Wayland
vim.g.mapleader = " "
vim.keymap.set("n", "<leader>w", ":w<CR>")
vim.keymap.set("n", "<leader>e", ":Ex<CR>")`,
    cmds:[
      ['sudo dnf install neovim wl-clipboard ripgrep',''],
      ['nvim +Tutor','Built-in interactive tutorial'],
      ['mkdir -p ~/.config/nvim && nvim ~/.config/nvim/init.lua','Your config'],
      [':checkhealth','Diagnose clipboard, providers, plugins'],
      [':lua print(vim.version().minor)','Run Lua inline'],
      ['nvim -d a.txt b.txt','Diff mode'],
      ['git clone https://github.com/LazyVim/starter ~/.config/nvim','Full IDE-like setup (back up old config first)']],
    flags:[
      ['~/.config/nvim/init.lua','Config (Lua) — or init.vim'],
      [':checkhealth','Health report'],
      ['vim.opt / vim.keymap.set','Options / key mappings in Lua'],
      ['NVIM_APPNAME=nvim-test nvim','Try a second config side-by-side']],
    example:{cmd:'nvim --version | head -1', out:`NVIM v0.11.4`},
    tip:'Neovim reads <code>~/.vimrc</code> habits almost unchanged — most Vim keys work identically.' },

  { title:'nano Configuration', icon:'⚙️', badge:'NANORC', color:'blue',
    code:
`# ~/.nanorc
set linenumbers
set autoindent
set tabsize 4
set tabstospaces
set mouse
set softwrap
set indicator        # scrollbar
set stateflags       # show modes in the title bar
set constantshow     # always show cursor position
set backup
set backupdir "~/.cache/nano-backups"`,
    cmds:[
      ['mkdir -p ~/.cache/nano-backups && nano ~/.nanorc',''],
      ['nano -Y sh script.txt','Force syntax colouring (sh, python, …)'],
      ['ls /usr/share/nano/','Available syntax definitions'],
      ['nano -v /etc/fstab','Read-only view'],
      ['nano +$ notes.txt','Open at the end of the file']],
    table:{head:['More nano keys','Does'], rows:[
      ['Alt+A','Start selecting (then move)'],
      ['Alt+6 / Ctrl+U','Copy selection / paste'],
      ['Alt+] ','Jump to matching bracket'],
      ['Alt+/ / Alt+\\','End / start of file'],
      ['Ctrl+T','Run a command (e.g. spell check, formatter)'],
      ['Alt+3','Comment / uncomment lines']]},
    flags:[
      ['-l','Line numbers'],
      ['-Y <syntax>','Syntax'],
      ['-v','View only'],
      ['-B','Backup on save'],
      ['-E','Tabs → spaces']],
    example:{cmd:'nano --version | head -1', out:` GNU nano, version 8.4`} },

  { title:'tmux Configuration & Copy Mode', icon:'🧰', badge:'TMUX+', color:'green',
    code:
`# ~/.tmux.conf
set -g prefix C-a                # Ctrl+A instead of Ctrl+B
unbind C-b
bind C-a send-prefix
set -g mouse on
set -g base-index 1              # windows start at 1
setw -g pane-base-index 1
set -g history-limit 50000
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"
bind r source-file ~/.tmux.conf \\; display "config reloaded"
setw -g mode-keys vi
bind -T copy-mode-vi v send -X begin-selection
bind -T copy-mode-vi y send -X copy-pipe-and-cancel "wl-copy"`,
    cmds:[
      ['tmux source-file ~/.tmux.conf','Reload without restarting'],
      ['tmux new -A -s main','Attach to "main", or create it'],
      ['tmux setw synchronize-panes on','Type into ALL panes at once (many servers)'],
      ['tmux capture-pane -pS -3000 > pane.txt','Save scrollback to a file'],
      ['tmux kill-server','End every session']],
    table:{head:['Copy mode (vi keys)','Does'], rows:[
      ['prefix [','Enter copy mode'],
      ['v / y','Start selection / copy (to wl-copy with the config above)'],
      ['/ ?','Search down / up'],
      ['q','Leave copy mode'],
      ['prefix ]','Paste tmux buffer']]},
    flags:[
      ['new -A -s name','Attach-or-create'],
      ['-c "#{pane_current_path}"','New pane in the same folder'],
      ['synchronize-panes','Broadcast typing'],
      ['display-popup','Floating terminal (tmux 3.2+)']],
    example:{cmd:'tmux -V', out:`tmux 3.5a`} },

  { title:'GNU screen', icon:'🖥️', badge:'SCREEN', color:'blue',
    cmds:[
      ['sudo dnf install screen',''],
      ['screen -S work','New named session'],
      ['screen -ls','List sessions'],
      ['screen -r work','Re-attach'],
      ['screen -dmS job ./long-task.sh','Start detached, running a command'],
      ['screen -X -S job quit','Kill a session'],
      ['screen /dev/ttyUSB0 115200','Serial console (routers, Arduino)']],
    table:{head:['Keys (prefix = Ctrl+A)','Does'], rows:[
      ['prefix d','Detach'],
      ['prefix c','New window'],
      ['prefix n / p','Next / previous window'],
      ['prefix S / |','Split horizontal / vertical'],
      ['prefix Tab','Move between regions'],
      ['prefix [','Scroll / copy mode (Esc to leave)'],
      ['prefix k','Kill window']]},
    flags:[
      ['-S <name>','Session name'],
      ['-r / -x','Re-attach / attach shared'],
      ['-d -m','Start detached'],
      ['-L','Log output to screenlog.0']],
    example:{cmd:'screen -ls', out:
`There are screens on:
	91822.job	(Detached)
	90344.work	(Attached)
2 Sockets in /run/screen/S-sooraj.`},
    tip:'screen is handy for serial consoles; for everything else tmux is the more active project.' },

  { title:'Emacs Basics', icon:'🟣', badge:'EMACS', color:'blue', tableFirst:true,
    table:{head:['Keys (C = Ctrl, M = Alt)','Does'], rows:[
      ['C-x C-f','Open file'],
      ['C-x C-s','Save'],
      ['C-x C-c','Quit'],
      ['C-g','Cancel whatever is happening'],
      ['C-s / C-r','Search forward / back'],
      ['M-%','Search & replace'],
      ['C-space … M-w / C-w','Mark … copy / cut'],
      ['C-y','Paste ("yank")'],
      ['C-/','Undo'],
      ['C-x 2 / C-x 3 / C-x o','Split / split side-by-side / other window'],
      ['C-x b','Switch buffer'],
      ['M-x','Run any command by name']]},
    cmds:[
      ['sudo dnf install emacs',''],
      ['emacs -nw file.txt','Run in the terminal'],
      ['emacs -Q','Start without your config'],
      ['emacs --batch file.org -f org-html-export-to-html','Scripted use (Org → HTML)'],
      ['M-x help-with-tutorial','Built-in tutorial (or C-h t)']],
    flags:[
      ['-nw','No window (terminal)'],
      ['-Q','Skip init files'],
      ['--daemon / emacsclient -t','Server + instant clients'],
      ['~/.config/emacs/init.el','Config file']],
    example:{cmd:'emacs --version | head -1', out:`GNU Emacs 30.2`} },

  { title:'Modern Terminal Editors: micro & Helix', icon:'✨', badge:'MODERN', color:'green',
    cmds:[
      ['sudo dnf install micro','Easy: normal Ctrl+S / Ctrl+C / Ctrl+V keys'],
      ['micro notes.txt',''],
      ['sudo dnf install helix','Modal like vim, but select-then-act'],
      ['hx --tutor','Interactive tutorial'],
      ['hx --health python','Language server status for a language'],
      ['hx src/main.rs',''],
      ['sudo dnf install python3-lsp-server','Language server → completions in helix/nvim']],
    table:{head:['micro keys','Does'], rows:[
      ['Ctrl+S / Ctrl+Q','Save / quit'],
      ['Ctrl+F / Ctrl+N','Find / next'],
      ['Ctrl+E','Command bar (replace, set, …)'],
      ['Ctrl+Z / Ctrl+Y','Undo / redo'],
      ['Ctrl+E then "vsplit file"','Split view'],
      ['Alt+G','Show all key bindings']]},
    flags:[
      ['micro -plugin install <name>','Plugins'],
      ['~/.config/micro/settings.json','micro settings'],
      ['hx: space f / space /','File picker / global search'],
      ['~/.config/helix/config.toml','Helix settings']],
    example:{cmd:'hx --health python | head -4', out:
`Configured language servers:
  ✓ pylsp: /usr/bin/pylsp
Configured debug adapter: None
Highlight queries: ✓`},
    tip:'Want nano-level simplicity with mouse, colours and multiple cursors? micro. Want vim power with less config? Helix.' },

  { title:'VS Code & GUI Editors', icon:'🖱️', badge:'GUI', color:'blue',
    cmds:[
      ['sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc','VS Code: trust Microsoft\'s key…'],
      ['printf "[code]\\nname=Visual Studio Code\\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\\nenabled=1\\ngpgcheck=1\\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc\\n" | sudo tee /etc/yum.repos.d/vscode.repo','…add the repo…'],
      ['sudo dnf install code','…install'],
      ['flatpak install flathub com.vscodium.codium','VSCodium (no telemetry)'],
      ['code .','Open current folder'],
      ['code -g src/app.js:42','Open at line 42'],
      ['code --diff old.js new.js','Compare two files'],
      ['code --list-extensions > extensions.txt','Back up extensions'],
      ['xargs -n1 code --install-extension < extensions.txt','Restore them'],
      ['gnome-text-editor notes.txt','GNOME\'s default text editor'],
      ['sudo dnf install kate','KDE\'s advanced editor']],
    flags:[
      ['-g file:line','Go to line'],
      ['-n / -r','New window / reuse window'],
      ['--diff a b','Diff view'],
      ['--install-extension <id>','Install extension'],
      ['--wait','Block until closed (for git core.editor)']],
    example:{cmd:'code --version', out:
`1.104.2
e3a5acfb517a443235981655413d566533107e92
x64`},
    tip:'Using a Flatpak editor for development? Its terminal runs inside the sandbox — use Toolbox or the host-spawn feature to reach your system tools.' },

  { title:'Choose Your Default Editor', icon:'🎯', badge:'DEFAULT', color:'warn',
    cmds:[
      ['echo "EDITOR=$EDITOR VISUAL=$VISUAL"','Current settings'],
      ['echo \'export EDITOR=vim VISUAL=vim\' > ~/.bashrc.d/editor.sh','For your shell (Fedora loads ~/.bashrc.d)'],
      ['sudo dnf install vim-default-editor --allowerasing','System-wide: vim instead of nano'],
      ['sudo dnf install nano-default-editor --allowerasing','…or back to nano'],
      ['git config --global core.editor "code --wait"','Git commits in VS Code'],
      ['echo \'export SUDO_EDITOR=vim\' >> ~/.bashrc.d/editor.sh','What sudoedit uses'],
      ['xdg-mime default org.gnome.TextEditor.desktop text/plain','Default GUI app for .txt']],
    flags:[
      ['EDITOR','Terminal editor (crontab -e, git…)'],
      ['VISUAL','Full-screen editor (preferred when set)'],
      ['SUDO_EDITOR','Used by sudoedit'],
      ['core.editor','Git-only override'],
      ['*-default-editor pkgs','Set /etc/profile.d defaults for everyone']],
    example:{cmd:'echo "EDITOR=$EDITOR"; git config --global core.editor', out:
`EDITOR=/usr/bin/nano
code --wait`},
    tip:'Stuck in an unknown editor from <code>git commit</code>? vim: <kbd>Esc</kbd> <code>:q!</code> · nano: <kbd>Ctrl</kbd>+<kbd>X</kbd> · emacs: <kbd>Ctrl</kbd>+<kbd>X</kbd> <kbd>Ctrl</kbd>+<kbd>C</kbd>.' }
);
})();

/* ═════════════════ MORE DEV TOOLS (v2.24) ═════════════════ */
(function () {
const d = window.FB_DATA.find(x => x.id === 'dev');
d.cards.push(
  { title:'Makefile Template', icon:'📐', badge:'MAKE', color:'green',
    code:
`# Makefile — recipe lines MUST start with a TAB
CC      := gcc
CFLAGS  := -Wall -Wextra -O2 -g
LDLIBS  := -lm
SRC     := $(wildcard src/*.c)
OBJ     := $(SRC:src/%.c=build/%.o)
BIN     := build/app

.PHONY: all clean run

all: $(BIN)

$(BIN): $(OBJ)
	$(CC) $(OBJ) -o $@ $(LDLIBS)

build/%.o: src/%.c | build
	$(CC) $(CFLAGS) -c $< -o $@

build:
	mkdir -p build

run: $(BIN)
	./$(BIN)

clean:
	rm -rf build`,
    cmds:[
      ['make','Build the first target (all)'],
      ['make -j$(nproc)','Parallel build'],
      ['make run',''],
      ['make clean && make',''],
      ['make -n','Show commands without running them'],
      ['make CFLAGS="-O0 -g3"','Override a variable'],
      ['make -B','Rebuild everything']],
    flags:[
      ['$@ / $< / $^','Target / first prereq / all prereqs'],
      ['%.o: %.c','Pattern rule'],
      [':=','Assign once (not re-evaluated)'],
      ['.PHONY','Targets that aren\'t files'],
      ['| build','Order-only prerequisite (folder must exist)'],
      ['-n / -B / -C dir','Dry run / force / other folder']],
    example:{cmd:'make', out:
`mkdir -p build
gcc -Wall -Wextra -O2 -g -c src/main.c -o build/main.o
gcc -Wall -Wextra -O2 -g -c src/util.c -o build/util.o
gcc build/main.o build/util.o -o build/app -lm`},
    warn:'"missing separator" means a recipe line starts with spaces instead of a TAB.' },

  { title:'C/C++ Toolchain Extras', icon:'🛠️', badge:'C++', color:'blue',
    cmds:[
      ['sudo dnf install clang clang-tools-extra ccache bear',''],
      ['gcc -g -fsanitize=address,undefined -o app main.c','Catch memory errors at runtime'],
      ['clang-format -i src/*.c include/*.h','Auto-format'],
      ['clang-tidy src/main.c -- -Iinclude','Static analysis'],
      ['bear -- make','Generate compile_commands.json (for editors/LSP)'],
      ['cmake -B build -DCMAKE_EXPORT_COMPILE_COMMANDS=ON','Same with CMake'],
      ['export CC="ccache gcc" CXX="ccache g++"','Cache compilations (much faster rebuilds)'],
      ['ccache -s','Cache hit statistics'],
      ['pkg-config --cflags --libs gtk4','Compiler flags for a library'],
      ['sudo dnf install gtk4-devel','Headers: the -devel package']],
    flags:[
      ['-fsanitize=address','Use-after-free, overflows'],
      ['-fsanitize=undefined','UB: overflow, bad shifts…'],
      ['-fsanitize=thread','Data races'],
      ['-std=c17 / c++23','Language standard'],
      ['-Werror','Warnings become errors'],
      ['-devel packages','Headers + .so links for building']],
    example:{cmd:'gcc -g -fsanitize=address -o bad bad.c && ./bad 2>&1 | head -3', out:
`=================================================================
==91822==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x502000000018 at pc 0x5621a3e0f1d4 bp 0x7ffd2a1c3e40 sp 0x7ffd2a1c3e30
WRITE of size 4 at 0x502000000018 thread T0`},
    tip:'Can\'t find a header? <code>dnf provides "*/gtk/gtk.h"</code> tells you which -devel package has it.' },

  { title:'Python Developer Tools', icon:'🐍', badge:'PY', color:'green',
    cmds:[
      ['sudo dnf install uv ruff python3-pytest python3-mypy',''],
      ['uv init myproj && cd myproj','New project with pyproject.toml'],
      ['uv add requests','Add a dependency (creates .venv + lockfile)'],
      ['uv run python main.py','Run inside the project env'],
      ['ruff check . && ruff format .','Lint + format (very fast)'],
      ['pytest -q','Run tests'],
      ['pytest -k "login and not slow" -x','Filter tests, stop on first failure'],
      ['mypy src/','Type checking'],
      ['python3 -m pdb script.py','Debugger (n, s, c, p var, q)'],
      ['python3 -m cProfile -s cumtime script.py | head -20','Where time is spent'],
      ['python3 -X importtime -c "import pandas" 2>&1 | tail -3','Slow imports']],
    flags:[
      ['uv add / remove / sync / lock','Manage dependencies'],
      ['uv python install 3.12','Get another Python version'],
      ['pytest -x / -k / -q / --lf','Stop / filter / quiet / last failed'],
      ['ruff check --fix','Auto-fix'],
      ['breakpoint()','Drop into pdb from code']],
    example:{cmd:'pytest -q', out:
`........F.
================================== FAILURES ===================================
___________________________ test_parse_empty_input ____________________________
    def test_parse_empty_input():
>       assert parse("") == []
E       assert None == []
1 failed, 9 passed in 0.21s`} },

  { title:'Node.js & JavaScript Tooling', icon:'🟩', badge:'NODE', color:'blue',
    cmds:[
      ['dnf list --available "nodejs[0-9]*"','Parallel Node versions in Fedora'],
      ['sudo dnf install nodejs22','A specific major version'],
      ['npm config set prefix ~/.local','Global installs without sudo (~/.local/bin)'],
      ['npm install -g npm-check-updates','…then global tools work'],
      ['corepack enable --install-directory ~/.local/bin pnpm','pnpm via corepack'],
      ['npm run dev','package.json script'],
      ['npm outdated && npx npm-check-updates -u','Check + bump dependencies'],
      ['npm audit fix','Fix known vulnerabilities'],
      ['node --watch server.js','Restart on file changes (built in)'],
      ['node --inspect server.js','Debug in Chrome DevTools (chrome://inspect)']],
    flags:[
      ['npm ci','Clean, exact install from lockfile (CI)'],
      ['npm i -D <pkg>','Dev dependency'],
      ['npx <tool>','Run without installing'],
      ['npm ls --depth=0','Top-level deps'],
      ['node --test','Built-in test runner']],
    example:{cmd:'npm outdated', out:
`Package    Current  Wanted  Latest  Location                Depended by
express     4.19.2  4.21.2   5.1.0  node_modules/express    myapp
vite         5.4.8  5.4.19   7.1.7  node_modules/vite       myapp`},
    warn:'Never <code>sudo npm install -g</code> — it writes into system folders dnf manages.' },

  { title:'Go in Depth', icon:'🐹', badge:'GO', color:'blue',
    cmds:[
      ['go mod tidy','Add missing / remove unused modules'],
      ['go vet ./...','Suspicious code'],
      ['go test -race -cover ./...','Tests + race detector + coverage'],
      ['go test -run TestLogin -v ./auth','One test, verbose'],
      ['go test -bench=. -benchmem','Benchmarks'],
      ['go install golang.org/x/tools/gopls@latest','Install a tool into ~/go/bin'],
      ['echo \'export PATH=$PATH:$HOME/go/bin\' >> ~/.bashrc.d/go.sh',''],
      ['GOOS=windows GOARCH=amd64 go build -o app.exe','Cross-compile'],
      ['CGO_ENABLED=0 go build -ldflags="-s -w" -o app','Small static binary'],
      ['go tool pprof -http=:8081 cpu.prof','Profile in the browser']],
    flags:[
      ['./...','This module, all packages'],
      ['-race','Data race detector'],
      ['-cover / -coverprofile=c.out','Coverage'],
      ['-run <regex>','Select tests'],
      ['GOOS / GOARCH','Target OS / CPU'],
      ['-ldflags="-s -w"','Strip symbols']],
    example:{cmd:'go test -race -cover ./...', out:
`ok  	example.com/app/auth	0.412s	coverage: 87.5% of statements
ok  	example.com/app/store	1.108s	coverage: 72.1% of statements
?   	example.com/app/cmd	[no test files]`} },

  { title:'Rust in Depth', icon:'🦀', badge:'RUST', color:'warn',
    cmds:[
      ['cargo add serde --features derive','Add a dependency'],
      ['cargo check','Fast type-check, no binary'],
      ['cargo test','Run tests'],
      ['cargo clippy -- -D warnings','Lints, fail on warnings'],
      ['cargo fmt','Format'],
      ['cargo doc --open','Docs for your crate + deps'],
      ['cargo install ripgrep','Install a Rust tool into ~/.cargo/bin'],
      ['rustup target add x86_64-unknown-linux-musl','Static-linking target'],
      ['cargo build --release --target x86_64-unknown-linux-musl',''],
      ['cargo tree -d','Duplicate dependency versions']],
    flags:[
      ['--release','Optimised build'],
      ['--features / --all-features','Feature flags'],
      ['-p <crate>','One workspace member'],
      ['cargo update','Refresh Cargo.lock'],
      ['RUST_BACKTRACE=1','Full backtrace on panic']],
    example:{cmd:'cargo test', out:
`   Compiling hello v0.1.0 (/home/sooraj/hello)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.58s
     Running unittests src/main.rs (target/debug/deps/hello-3f9c2a7d8e1b4c6a)

running 2 tests
test tests::adds ... ok
test tests::parses_empty ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s`} },

  { title:'Java & the JVM', icon:'☕', badge:'JAVA', color:'blue',
    cmds:[
      ['sudo dnf install java-devel maven','Fedora\'s default JDK + Maven'],
      ['dnf list --available "java-*-openjdk-devel"','Other JDK versions'],
      ['sudo alternatives --config java','Pick the default JDK'],
      ['java Hello.java','Run a single file without compiling (Java 11+)'],
      ['javac -d out src/*.java && java -cp out Main','Classic compile + run'],
      ['jshell','Interactive Java shell'],
      ['mvn archetype:generate -DgroupId=com.example -DartifactId=app -DinteractiveMode=false','New Maven project'],
      ['mvn -q package && java -jar target/app-1.0-SNAPSHOT.jar','Build + run'],
      ['jcmd','List running JVMs'],
      ['jcmd 4410 Thread.print | head','Thread dump of a JVM']],
    flags:[
      ['-cp / -classpath','Where classes are'],
      ['-Xmx2g','Max heap'],
      ['-jar <file>','Run an executable jar'],
      ['mvn clean package / test / dependency:tree',''],
      ['JAVA_HOME=/usr/lib/jvm/java','Follows the alternatives choice']],
    example:{cmd:'printf \'public class Hello { public static void main(String[] a){ System.out.println("Hi from Java"); } }\' > Hello.java && java Hello.java', out:`Hi from Java`} },

  { title:'.NET, PHP, Ruby & More', icon:'🌈', badge:'LANGS+', color:'green',
    cmds:[
      ['dnf list --available "dotnet-sdk-*"','.NET SDK versions in Fedora'],
      ['sudo dnf install dotnet-sdk-10.0','Install one (pick from the list)'],
      ['dotnet new console -o hello && dotnet run --project hello',''],
      ['sudo dnf install php-cli composer',''],
      ['php -S localhost:8000 -t public/','Built-in PHP dev server'],
      ['composer require monolog/monolog',''],
      ['sudo dnf install ruby rubygem-bundler',''],
      ['bundle install && bundle exec rake test',''],
      ['sudo dnf install lua zig','Lua and Zig'],
      ['zig run hello.zig','Compile + run Zig'],
      ['dnf search --quiet compiler | head','Find more toolchains']],
    flags:[
      ['dotnet new list','Project templates'],
      ['dotnet watch run','Hot reload'],
      ['php -l file.php','Syntax check'],
      ['gem install --user-install <gem>','No sudo'],
      ['bundle config set path vendor/bundle','Per-project gems']],
    example:{cmd:'php -r \'echo "PHP ok\\n";\' && ruby -e \'puts "Ruby ok"\'', out:
`PHP ok
Ruby ok`} },

  { title:'API, JSON & Data Tools', icon:'🔌', badge:'DATA', color:'blue',
    cmds:[
      ['sudo dnf install httpie jq yq sqlite',''],
      ['http GET https://api.github.com/repos/fedora-infra/bodhi','Readable HTTP client'],
      ['http POST httpbin.org/post name=sooraj active:=true','JSON body from key=value'],
      ['curl -s https://api.github.com/repos/fedora-infra/bodhi | jq \'{name, stars: .stargazers_count}\'','Reshape JSON'],
      ['jq -r \'.[] | select(.age > 30) | .name\' people.json','Filter + raw strings'],
      ['jq -s \'map(.size) | add\' *.json','Combine files'],
      ['yq \'.spec.replicas\' deploy.yaml','Query YAML the same way'],
      ['sqlite3 app.db ".tables"','Inspect an SQLite database'],
      ['sqlite3 -header -column app.db "SELECT * FROM users LIMIT 5;"',''],
      ['python3 -m json.tool < ugly.json','Pretty-print JSON without extra tools']],
    flags:[
      ['jq -r','Raw strings, no quotes'],
      ['jq -c','One object per line'],
      ['jq -s','Slurp all inputs into one array'],
      ['select(cond) / map(f)','Filter / transform'],
      ['http a=b / a:=1','String / raw JSON value'],
      ['sqlite3 .mode / .import','CSV output / load CSV']],
    example:{cmd:'echo \'[{"name":"alice","age":31},{"name":"bob","age":27}]\' | jq -r \'.[] | select(.age > 30) | .name\'', out:`alice`} },

  { title:'Benchmarking & Code Coverage', icon:'📏', badge:'MEASURE', color:'warn',
    cmds:[
      ['sudo dnf install hyperfine lcov',''],
      ['hyperfine "grep -r TODO ." "rg TODO"','Compare commands statistically'],
      ['hyperfine --warmup 3 -N "./app-old" "./app-new"','Warm caches, no shell overhead'],
      ['gcc --coverage -O0 -o app main.c && ./app','C coverage: build + run…'],
      ['gcov main.c && grep -n "#####" main.c.gcov','…lines never executed'],
      ['lcov -c -d . -o cov.info && genhtml cov.info -o cov-html','HTML report'],
      ['python3 -m pip install --user coverage && coverage run -m pytest && coverage report -m','Python coverage'],
      ['go test -coverprofile=c.out ./... && go tool cover -html=c.out','Go coverage in the browser'],
      ['cargo install cargo-llvm-cov && cargo llvm-cov --html','Rust coverage']],
    flags:[
      ['hyperfine --warmup N','Discard N warm-up runs'],
      ['hyperfine -N','No intermediate shell'],
      ['--export-markdown r.md','Results table'],
      ['--coverage','gcc: -fprofile-arcs -ftest-coverage'],
      ['#####','gcov: line never ran'],
      ['coverage report -m','Show missing lines']],
    example:{cmd:'hyperfine "grep -r TODO ." "rg TODO"', out:
`Benchmark 1: grep -r TODO .
  Time (mean ± σ):     412.3 ms ±   8.1 ms    [User: 201.4 ms, System: 208.7 ms]
  Range (min … max):   401.2 ms … 428.9 ms    10 runs

Benchmark 2: rg TODO
  Time (mean ± σ):      38.6 ms ±   1.9 ms    [User: 61.2 ms, System: 89.4 ms]
  Range (min … max):    35.9 ms …  43.1 ms    74 runs

Summary
  rg TODO ran 10.68 ± 0.56 times faster than grep -r TODO .`} }
);
})();

/* ═════════════════ MORE SSH (v2.25) ═════════════════ */
(function () {
const s = window.FB_DATA.find(x => x.id === 'ssh');
s.cards.push(
  { title:'~/.ssh/config Deep Dive', icon:'🗂️', badge:'CONFIG', color:'green',
    code:
`# ~/.ssh/config  — first match wins, so put specific hosts first
Include ~/.ssh/config.d/*

Host web1 web2
  HostName %h.example.com
  User deploy
  IdentityFile ~/.ssh/id_work
  IdentitiesOnly yes

Host db
  HostName 10.0.5.20
  User admin
  ProxyJump bastion
  LocalForward 5433 localhost:5432

Host bastion
  HostName bastion.example.com
  User sooraj
  Port 2222

Host pi
  HostName 192.168.1.50
  User pi
  RemoteCommand tmux new -A -s main
  RequestTTY yes

Host *
  ServerAliveInterval 30
  ServerAliveCountMax 3
  AddKeysToAgent yes`,
    cmds:[
      ['chmod 600 ~/.ssh/config','Required permissions'],
      ['ssh -G db | grep -E "^(hostname|user|port|proxyjump|localforward) "','See the final settings WITHOUT connecting'],
      ['ssh db','Bastion hop + tunnel happen automatically'],
      ['ssh pi','Lands straight in a tmux session'],
      ['ssh -F /dev/null user@host','Ignore your config (debugging)']],
    flags:[
      ['%h / %r / %p','Host / remote user / port tokens'],
      ['Include','Split config into files'],
      ['IdentitiesOnly yes','Offer only the listed key'],
      ['Match host … exec "…"','Conditional blocks'],
      ['ssh -G <host>','Print effective config'],
      ['-F <file>','Use a different config file']],
    example:{cmd:'ssh -G db | grep -E "^(hostname|user|proxyjump|localforward) "', out:
`user admin
hostname 10.0.5.20
proxyjump bastion
localforward 5433 [localhost]:5432`},
    tip:'Settings are taken from the FIRST block that sets them — that\'s why <code>Host *</code> goes last.' },

  { title:'Jump Hosts & Bastions', icon:'🪜', badge:'JUMP', color:'blue',
    cmds:[
      ['ssh -J admin@bastion.example.com admin@10.0.5.20','One hop'],
      ['ssh -J bastion1,bastion2 admin@10.0.5.20','Chain of hops'],
      ['scp -J bastion report.pdf admin@10.0.5.20:/tmp/','Copy through the bastion'],
      ['rsync -av -e "ssh -J bastion" site/ admin@10.0.5.20:/var/www/',''],
      ['ssh -J bastion -L 8080:10.0.5.30:80 admin@10.0.5.20','Reach a web UI deep inside'],
      ['ssh -o ProxyCommand="ssh -W %h:%p bastion" admin@10.0.5.20','Old-style (very old servers)']],
    flags:[
      ['-J host1,host2','ProxyJump chain'],
      ['ProxyJump in config','Same, permanently'],
      ['-W host:port','Forward stdin/stdout (ProxyCommand)'],
      ['ForwardAgent','Not needed with -J — your key never leaves your machine']],
    example:{cmd:'ssh -J admin@bastion.example.com admin@10.0.5.20 hostname', out:`db-01.internal`},
    tip:'Prefer <code>-J</code> over agent forwarding: the bastion only relays encrypted traffic and never sees your keys.' },

  { title:'Tunnel Recipes', icon:'🚇', badge:'TUNNEL', color:'green',
    cmds:[
      ['ssh -N -L 5433:localhost:5432 db','Remote Postgres → localhost:5433'],
      ['psql -h localhost -p 5433 -U app appdb','…use it as if it were local'],
      ['ssh -N -R 8080:localhost:3000 server','Share your local dev server as server:8080'],
      ['ssh -N -D 1080 server','SOCKS proxy — set browser to localhost:1080'],
      ['ssh -f -N -L 5433:localhost:5432 db','Background tunnel'],
      ['sudo dnf install autossh && autossh -M 0 -f -N -L 5433:localhost:5432 db','Auto-reconnecting tunnel'],
      ['ssh -O forward -L 9000:localhost:9000 db','Add a forward to an existing multiplexed connection'],
      ['ss -tlnp | grep ssh','Which tunnels are listening']],
    code:
`# ~/.config/systemd/user/db-tunnel.service — tunnel that starts at login
[Unit]
Description=SSH tunnel to Postgres

[Service]
ExecStart=/usr/bin/ssh -N -o ExitOnForwardFailure=yes -o ServerAliveInterval=30 db
Restart=always
RestartSec=5

[Install]
WantedBy=default.target`,
    flags:[
      ['-L local:host:remote','Pull a remote port to you'],
      ['-R remote:host:local','Push your port to the server'],
      ['-D port','Dynamic SOCKS proxy'],
      ['-N / -f','No command / background'],
      ['ExitOnForwardFailure=yes','Fail instead of silently skipping the tunnel'],
      ['GatewayPorts yes (sshd)','Let -R listen on all interfaces']],
    example:{cmd:'ss -tlnp | grep ssh', out:`LISTEN 0 128 127.0.0.1:5433 0.0.0.0:* users:(("ssh",pid=91822,fd=5))`},
    tip:'Enable the service with <code>systemctl --user enable --now db-tunnel</code>.' },

  { title:'Known Hosts & Fingerprints', icon:'🪪', badge:'HOSTKEYS', color:'warn',
    cmds:[
      ['ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub','ON THE SERVER: its real fingerprint'],
      ['ssh-keyscan -t ed25519 server.example.com | ssh-keygen -lf -','What the network says (compare!)'],
      ['ssh-keyscan -H server.example.com >> ~/.ssh/known_hosts','Pre-trust (after verifying)'],
      ['ssh-keygen -F server.example.com','Is it in known_hosts?'],
      ['ssh-keygen -R server.example.com','Remove old key (after a reinstall)'],
      ['ssh -o StrictHostKeyChecking=accept-new new-server','Trust NEW hosts, still reject CHANGED ones'],
      ['ssh -o UpdateHostKeys=yes server','Learn a server\'s rotated keys']],
    flags:[
      ['-l -f <pub>','Show fingerprint'],
      ['-F / -R <host>','Find / remove in known_hosts'],
      ['-H','Hash host names'],
      ['StrictHostKeyChecking ask|accept-new|yes','Trust policy'],
      ['VisualHostKey yes','ASCII-art fingerprint on connect']],
    example:{cmd:'ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub', out:`256 SHA256:9vZt8R0cWq2mLx4bPnJ3kT7eYs1dF6hG8aC5uV0iNoE root@server (ED25519)`},
    danger:'"REMOTE HOST IDENTIFICATION HAS CHANGED" can mean an attack. Confirm the new fingerprint on the server before running <code>ssh-keygen -R</code>.' },

  { title:'Keys: FIDO2, Passphrases & Recovery', icon:'🗝️', badge:'KEYS+', color:'blue',
    cmds:[
      ['ssh-keygen -t ed25519-sk -O resident -O verify-required -C "yubikey"','Key that lives on a YubiKey/FIDO2 token'],
      ['ssh-keygen -K','Download resident keys onto a new computer'],
      ['ssh-keygen -p -f ~/.ssh/id_ed25519','Add or change a passphrase'],
      ['ssh-keygen -y -f ~/.ssh/id_ed25519 > id_ed25519.pub','Recreate a lost .pub from the private key'],
      ['ssh-keygen -c -C "new comment" -f ~/.ssh/id_ed25519','Change the comment'],
      ['for k in ~/.ssh/*.pub; do ssh-keygen -lf "$k"; done','Fingerprints of all your keys'],
      ['ssh-add -t 1h ~/.ssh/id_ed25519','Unlock in the agent for one hour'],
      ['ssh-add -D','Remove all keys from the agent']],
    flags:[
      ['-t ed25519-sk / ecdsa-sk','Hardware-backed key types'],
      ['-O resident','Store on the token (portable)'],
      ['-O verify-required','Require PIN as well as touch'],
      ['-p','Change passphrase'],
      ['-y','Print public key'],
      ['ssh-add -t <time>','Key expires from agent']],
    example:{cmd:'ssh-keygen -y -f ~/.ssh/id_ed25519', out:`ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKq3Vd8m2fH1k0yZp7c9sL4xTnR5bJw6eA2uGiK8oN1Y`},
    tip:'A FIDO2 key can\'t be copied off the token — stealing your laptop isn\'t enough to use it.' },

  { title:'Restricted Keys (authorized_keys options)', icon:'🔒', badge:'RESTRICT', color:'warn',
    code:
`# ~/.ssh/authorized_keys on the server — options go BEFORE the key

# Only from the office network
from="192.168.1.0/24" ssh-ed25519 AAAA… laptop

# Backup key: can ONLY run the backup script, nothing else
restrict,command="/usr/local/bin/backup-receive" ssh-ed25519 AAAA… backup-bot

# Tunnel-only key: port forward to the DB, no shell
restrict,port-forwarding,permitopen="localhost:5432",command="/bin/false" ssh-ed25519 AAAA… db-tunnel

# Expires automatically
expiry-time="20261231",restrict,pty ssh-ed25519 AAAA… contractor`,
    cmds:[
      ['chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys','Required on the server'],
      ['restorecon -Rv ~/.ssh','SELinux labels (Fedora)'],
      ['ssh backup-host','With command= you always get that command'],
      ['echo "$SSH_ORIGINAL_COMMAND"','Inside a forced command: what the client asked for']],
    flags:[
      ['restrict','Disable everything (pty, forwarding, agent, X11)…'],
      ['pty / port-forwarding','…then re-enable only what\'s needed'],
      ['from="pattern"','Allowed client addresses'],
      ['command="…"','Forced command'],
      ['permitopen="host:port"','Allowed -L destinations'],
      ['expiry-time="YYYYMMDD"','Key stops working after this date']],
    example:{cmd:'ssh backup-bot@server "rm -rf /"', out:`Only backups allowed here.`},
    tip:'For automation keys, <code>restrict,command="…"</code> means a stolen key can only do that one job.' },

  { title:'Remote Commands & Many Servers', icon:'🛰️', badge:'REMOTE', color:'blue',
    cmds:[
      ['ssh web1 "df -h / && uptime"','Run commands, get output locally'],
      ['ssh -t web1 "sudo systemctl restart nginx"','-t: needed when the command prompts (sudo)'],
      ['ssh web1 "bash -s" < ./check.sh','Run a LOCAL script on the server'],
      ['ssh web1 "bash -s -- --verbose" < ./check.sh','…with arguments'],
      ['ssh web1 "cat /var/log/nginx/error.log" > web1-error.log','Save remote output locally'],
      ['tar czf - site/ | ssh web1 "tar xzf - -C /var/www"','Copy a folder via a pipe'],
      ['for h in web1 web2 db; do echo "== $h"; ssh "$h" uptime; done','Loop over servers'],
      ['parallel -j 10 --tag ssh {} uptime ::: web1 web2 db','In parallel, output tagged by host'],
      ['sudo dnf install pssh && pssh -h hosts.txt -i "uptime"','Parallel SSH tool']],
    flags:[
      ['-t','Force a TTY (interactive / sudo)'],
      ['-n','stdin from /dev/null (loops!)'],
      ['-o BatchMode=yes','Fail instead of prompting (scripts)'],
      ['-o ConnectTimeout=5','Don\'t hang on dead hosts'],
      ['bash -s','Read script from stdin']],
    example:{cmd:'parallel -j 10 --tag ssh {} uptime ::: web1 web2 db', out:
`web1	 09:05:12 up 41 days,  2:10,  0 users,  load average: 0.12, 0.08, 0.05
web2	 09:05:12 up 41 days,  2:09,  0 users,  load average: 0.31, 0.22, 0.18
db	 09:05:12 up 97 days, 14:51,  0 users,  load average: 1.02, 0.95, 0.90`},
    warn:'Inside <code>while read … ssh</code> loops, add <code>-n</code> — otherwise ssh eats the rest of the input and the loop stops after one host.' },

  { title:'Escape Sequences (Frozen Sessions)', icon:'🧊', badge:'ESCAPE', color:'green', tableFirst:true,
    desc:'Press <kbd>Enter</kbd> first, then type the sequence. Works inside any ssh session.',
    table:{head:['Type','Does'], rows:[
      ['~.','Kill a hung session immediately'],
      ['~?','List all escapes'],
      ['~C','Command line: add a forward, e.g. -L 8080:localhost:80'],
      ['~#','List active forwards/connections'],
      ['~&','Background ssh (waiting for tunnels to close)'],
      ['~^Z','Suspend ssh (fg to return)'],
      ['~~','Send a literal ~'],
      ['~.  (nested)','Each extra ~ targets the next session: ~~. kills the inner one']]},
    cmds:[
      ['ssh -e none host','Disable escapes (binary data over the session)'],
      ['ssh -e "^" host','Use ^ instead of ~']],
    flags:[
      ['EscapeChar','Config option'],
      ['-e <char>|none','Per connection']],
    example:{cmd:'~#', out:
`The following connections are open:
  #0 client-session (t4 [session] r0 i0/0 o0/0 e[write]/4 fd 4/5/6 sock -1 cc -1 io 0x01/0x02)
  #1 direct-tcpip: listening port 5433 for localhost port 5432, connect from 127.0.0.1 port 51220 to 127.0.0.1 port 5433 (t4 [direct-tcpip] r1 i0/0 o0/0 e[closed]/0 fd 7/7/-1 sock 7 cc -1 io 0x01/0x00)`},
    tip:'<kbd>Enter</kbd> <code>~.</code> is the fix for a terminal frozen after Wi-Fi dropped.' },

  { title:'SFTP-only Users (chroot)', icon:'📦', badge:'SFTP', color:'warn',
    code:
`# /etc/ssh/sshd_config.d/60-sftp.conf
Match Group sftponly
    ChrootDirectory /srv/sftp/%u
    ForceCommand internal-sftp
    AllowTcpForwarding no
    X11Forwarding no
    PermitTunnel no`,
    cmds:[
      ['sudo groupadd sftponly',''],
      ['sudo useradd -M -G sftponly -s /sbin/nologin client1','No shell, no home'],
      ['sudo passwd client1',''],
      ['sudo mkdir -p /srv/sftp/client1/upload',''],
      ['sudo chown root:root /srv/sftp/client1 && sudo chmod 755 /srv/sftp/client1','Chroot dir MUST be root-owned'],
      ['sudo chown client1:client1 /srv/sftp/client1/upload','Where they can write'],
      ['sudo setsebool -P ssh_chroot_rw_homedirs on','SELinux: allow chroot writes'],
      ['sudo sshd -t && sudo systemctl reload sshd',''],
      ['sftp client1@server','Test: lands in /, can write to /upload only']],
    flags:[
      ['Match Group / User','Apply settings to some users only'],
      ['ChrootDirectory','Jail (must be root-owned, not writable by user)'],
      ['ForceCommand internal-sftp','SFTP only, no shell'],
      ['%u','Username token'],
      ['sshd -T -C user=client1','Effective config for a user']],
    example:{cmd:'sudo sshd -T -C user=client1,host=x,addr=1.2.3.4 | grep -E "chrootdirectory|forcecommand"', out:
`forcecommand internal-sftp
chrootdirectory /srv/sftp/%u`},
    warn:'"bad ownership or modes for chroot directory" in the journal means the chroot folder isn\'t owned by root or is group-writable.' },

  { title:'SSH Certificates (CA)', icon:'🎓', badge:'CA', color:'blue',
    cmds:[
      ['ssh-keygen -t ed25519 -f ssh_user_ca -C "User CA"','Create a CA key (keep it offline!)'],
      ['ssh-keygen -s ssh_user_ca -I alice-laptop -n alice,deploy -V +52w alice.pub','Sign alice\'s key → alice-cert.pub'],
      ['ssh-keygen -Lf alice-cert.pub','Inspect a certificate'],
      ['sudo cp ssh_user_ca.pub /etc/ssh/','On every server…'],
      ['echo "TrustedUserCAKeys /etc/ssh/ssh_user_ca.pub" | sudo tee /etc/ssh/sshd_config.d/70-ca.conf','…trust the CA'],
      ['sudo systemctl reload sshd','No more authorized_keys per server'],
      ['ssh-keygen -s ssh_host_ca -I web1 -h -n web1.example.com -V +52w /etc/ssh/ssh_host_ed25519_key.pub','Host certificate (no more "unknown host" prompts)'],
      ['echo "@cert-authority *.example.com $(cat ssh_host_ca.pub)" >> ~/.ssh/known_hosts','Clients trust host certs']],
    flags:[
      ['-s <ca>','Sign with this CA'],
      ['-I <id>','Certificate ID (shows in logs)'],
      ['-n user1,user2','Allowed principals (logins)'],
      ['-V +52w','Validity'],
      ['-h','Host certificate'],
      ['-L','Show certificate details']],
    example:{cmd:'ssh-keygen -Lf alice-cert.pub | head -8', out:
`alice-cert.pub:
        Type: ssh-ed25519-cert-v01@openssh.com user certificate
        Public key: ED25519-CERT SHA256:q3Vd8m2fH1k0yZp7c9sL4xTnR5bJw6eA2uGiK8oN1Yc
        Signing CA: ED25519 SHA256:Lx4bPnJ3kT7eYs1dF6hG8aC5uV0iNoE9vZt8R0cWq2m (using ssh-ed25519)
        Key ID: "alice-laptop"
        Serial: 0
        Valid: from 2026-09-30T09:00:00 to 2027-09-29T09:01:00
        Principals: `},
    tip:'Short-lived certificates (e.g. <code>-V +8h</code>) mean nothing to revoke when someone leaves.' }
);
})();

/* ═════════════════ MORE LOGS (v2.26) ═════════════════ */
(function () {
const l = window.FB_DATA.find(x => x.id === 'logs');
l.cards.push(
  { title:'Priority Levels', icon:'🚥', badge:'LEVELS', color:'green', tableFirst:true,
    table:{head:['Level','Name','Use -p'], rows:[
      ['0','emerg — system unusable','-p 0'],
      ['1','alert — act immediately','-p alert'],
      ['2','crit — critical','-p crit'],
      ['3','err — errors','-p err'],
      ['4','warning','-p warning'],
      ['5','notice — normal but significant','-p notice'],
      ['6','info','-p info'],
      ['7','debug','-p debug']]},
    cmds:[
      ['journalctl -p err -b','Errors and worse, this boot'],
      ['journalctl -p warning..err -b','Only warnings + errors'],
      ['journalctl -p 3 -b -o short-precise --no-pager | tail','Numeric form'],
      ['journalctl -p err -b --output-fields=SYSLOG_IDENTIFIER -o cat | sort | uniq -c | sort -rn | head','Who logs the most errors']],
    flags:[
      ['-p N','N and more severe'],
      ['-p A..B','Range'],
      ['PRIORITY=3','Exact match (field filter)']],
    example:{cmd:'journalctl -p err -b --no-pager | tail -3', out:
`Sep 30 08:02:14 fedora-ws kernel: ACPI BIOS Error (bug): Could not resolve symbol [\\_SB.PCI0.GP17.XHC0], AE_NOT_FOUND
Sep 30 08:02:19 fedora-ws gdm-password][2011]: gkr-pam: unable to locate daemon control file
Sep 30 09:11:47 fedora-ws systemd[1]: myapp.service: Failed with result 'exit-code'.`},
    tip:'A handful of "errors" on every boot (ACPI, firmware) are normal — look for new ones or ones that repeat.' },

  { title:'Filter by Field', icon:'🔬', badge:'FIELDS', color:'blue',
    cmds:[
      ['journalctl -t sudo','By identifier (the name before the colon)'],
      ['journalctl _COMM=sshd','By process name'],
      ['journalctl _PID=2210','By PID'],
      ['journalctl _UID=1000','Everything from one user'],
      ['journalctl _EXE=/usr/bin/gnome-shell','By executable'],
      ['journalctl _SYSTEMD_UNIT=nginx.service + _COMM=php-fpm','OR across fields with +'],
      ['journalctl -F _SYSTEMD_UNIT | sort | head','All values a field has'],
      ['journalctl -n 1 -o verbose _COMM=sshd','See every field of an entry'],
      ['journalctl -g "(?i)timeout|refused" -b','Case-insensitive regex in messages']],
    flags:[
      ['FIELD=value','Match (several = AND)'],
      ['+','OR between groups'],
      ['-t / -u','Identifier / unit shortcut'],
      ['-F <field>','List distinct values'],
      ['-g <regex>','Grep message (PCRE)'],
      ['-o verbose','All fields']],
    example:{cmd:'journalctl -n 1 -o verbose _COMM=sshd | head -12', out:
`Wed 2026-09-30 09:05:12.418321 +03 [s=3f9c…;i=4a2e1;b=7c2e…;m=…;t=…;x=…]
    _BOOT_ID=7c2e0d9a1b4c4e6f8a0b2c3d4e5f6a7b
    PRIORITY=6
    SYSLOG_FACILITY=4
    SYSLOG_IDENTIFIER=sshd
    _PID=91830
    _UID=0
    _COMM=sshd
    _EXE=/usr/sbin/sshd
    _SYSTEMD_UNIT=sshd.service
    MESSAGE=Accepted publickey for sooraj from 192.168.1.20 port 51422 ssh2: ED25519 SHA256:q3Vd…
    _HOSTNAME=fedora-ws`} },

  { title:'Output Formats & JSON', icon:'🧾', badge:'OUTPUT', color:'blue',
    cmds:[
      ['journalctl -u nginx -o short-iso','ISO timestamps'],
      ['journalctl -u nginx -o short-precise','Microseconds'],
      ['journalctl -u nginx -o cat','Message only (like a plain log file)'],
      ['journalctl -u nginx -o with-unit','Show the unit name'],
      ['journalctl -u nginx --utc','Times in UTC'],
      ['journalctl -u nginx -o json | jq -r \'.MESSAGE\' | head','JSON → jq'],
      ['journalctl -u nginx -o json-pretty -n 1',''],
      ['journalctl -u nginx --since today --no-pager > nginx-today.log','Save to a file'],
      ['journalctl -o export -u nginx > nginx.journal','Binary export (import with systemd-journal-remote)']],
    flags:[
      ['short / short-iso / short-precise / short-monotonic','Text variants'],
      ['cat','Message text only'],
      ['json / json-pretty / json-sse','Machine-readable'],
      ['verbose','All fields'],
      ['--no-hostname','Drop the host column'],
      ['--output-fields=A,B','Limit fields (json/verbose/cat)']],
    example:{cmd:'journalctl -u sshd -n 2 -o short-iso --no-hostname', out:
`2026-09-30T09:05:12+03:00 sshd[91830]: Accepted publickey for sooraj from 192.168.1.20 port 51422 ssh2
2026-09-30T09:05:12+03:00 sshd[91830]: pam_unix(sshd:session): session opened for user sooraj(uid=1000) by sooraj(uid=0)`} },

  { title:'Journal Size & Retention', icon:'🗄️', badge:'STORAGE', color:'warn',
    code:
`# /etc/systemd/journald.conf.d/50-size.conf
[Journal]
Storage=persistent
SystemMaxUse=1G
SystemKeepFree=5G
MaxRetentionSec=3month
Compress=yes`,
    cmds:[
      ['journalctl --disk-usage','How big the journal is'],
      ['sudo mkdir -p /etc/systemd/journald.conf.d && sudoedit /etc/systemd/journald.conf.d/50-size.conf','Limits (file above)'],
      ['sudo systemctl restart systemd-journald','Apply'],
      ['sudo journalctl --vacuum-size=500M','Trim now to 500 MB'],
      ['sudo journalctl --vacuum-time=2weeks','Delete older than 2 weeks'],
      ['sudo journalctl --rotate','Start new journal files'],
      ['sudo journalctl --verify','Check journal files for corruption'],
      ['ls -lh /var/log/journal/*/ | tail -3','Journal files on disk']],
    flags:[
      ['Storage=persistent|volatile|auto','Disk / RAM only / disk if /var/log/journal exists'],
      ['SystemMaxUse=','Maximum size'],
      ['SystemKeepFree=','Always leave this much free'],
      ['MaxRetentionSec=','Maximum age'],
      ['--vacuum-size / -time / -files','One-off cleanup']],
    example:{cmd:'journalctl --disk-usage', out:`Archived and active journals take up 1.8G in the file system.`},
    tip:'Fedora keeps a persistent journal by default; the cap is 10% of the filesystem (max 4 GB) unless you set one.' },

  { title:'Write to the Journal from Scripts', icon:'✍️', badge:'LOGGER', color:'green',
    cmds:[
      ['logger "Backup started"','Plain message'],
      ['logger -t backup -p user.err "Backup FAILED: disk full"','Tag + priority'],
      ['journalctl -t backup','Read it back'],
      ['systemd-cat -t backup ./backup.sh','Send a whole script\'s output to the journal'],
      ['systemd-cat -t backup -p warning echo "Low disk"','One command with a priority'],
      ['echo "done" | systemd-cat -t backup',''],
      ['logger -t myapp --journald <<< $\'MESSAGE=order failed\\nORDER_ID=4711\\nPRIORITY=3\'','Custom fields'],
      ['journalctl ORDER_ID=4711','…then search by your field']],
    flags:[
      ['logger -t <tag>','Identifier'],
      ['logger -p facility.level','user.info, user.err, …'],
      ['logger --journald','Structured fields from stdin'],
      ['systemd-cat -t / -p','Identifier / priority'],
      ['stdout in a service','Goes to the journal automatically']],
    example:{cmd:'logger -t backup -p user.err "Backup FAILED: disk full" && journalctl -t backup -n 1 --no-pager', out:
`Sep 30 09:14:02 fedora-ws backup[92011]: Backup FAILED: disk full`},
    tip:'Anything a systemd service prints on stdout/stderr lands in the journal — no logging code needed.' },

  { title:'What Happened Before the Crash/Reboot?', icon:'🕵️', badge:'TIMELINE', color:'red',
    cmds:[
      ['journalctl --list-boots | tail -5','Recent boots'],
      ['journalctl -b -1 -n 80 --no-pager','Last 80 lines of the previous boot'],
      ['journalctl -b -1 -p warning --no-pager | tail -30','Warnings just before'],
      ['last -x shutdown reboot | head -6','Clean shutdowns vs crashes'],
      ['journalctl --since "2026-09-29 22:00" --until "2026-09-29 22:30"','Exact time window'],
      ['journalctl -b -1 -k | tail -30','Kernel messages last boot (GPU hangs, disk errors)'],
      ['journalctl -b -1 -u systemd-oomd','Out-of-memory kills'],
      ['coredumpctl list --since yesterday','Programs that crashed']],
    flags:[
      ['-b -1 / -b -2','Previous / the one before'],
      ['--since / --until','Absolute or "1 hour ago"'],
      ['-e','Jump to the end'],
      ['-k','Kernel only'],
      ['--list-boots','Boot IDs + time ranges']],
    example:{cmd:'journalctl --list-boots | tail -3', out:
`IDX BOOT ID                          FIRST ENTRY                 LAST ENTRY
 -2 41a9bb0c7e3d4f5a9b2c1d0e8f7a6b5c Sun 2026-09-27 08:10:02 +03 Mon 2026-09-28 23:58:11 +03
 -1 9e3f1c440a5b4d6e8f7a6b5c4d3e2f1a Tue 2026-09-29 08:02:44 +03 Tue 2026-09-29 22:17:39 +03
  0 7c2e0d9a1b4c4e6f8a0b2c3d4e5f6a7b Wed 2026-09-30 08:02:10 +03 Wed 2026-09-30 09:14:02 +03`},
    tip:'If the previous boot ends mid-sentence with no "Reached target Power-Off", it lost power or froze hard.' },

  { title:'Login & Security Events', icon:'🔐', badge:'AUTH', color:'warn',
    cmds:[
      ['journalctl _COMM=sshd -g "Accepted" --since today','Successful SSH logins'],
      ['journalctl _COMM=sshd -g "Failed|Invalid user" --since today','Failed SSH attempts'],
      ['journalctl _COMM=sshd -g "Failed password" --since today -o cat | grep -oE "from [0-9.]+" | sort | uniq -c | sort -rn | head','Top attacking IPs'],
      ['journalctl _COMM=sudo --since today','Every sudo command'],
      ['journalctl -u systemd-logind --since today','Logins, logouts, lid, power button'],
      ['journalctl SYSLOG_FACILITY=10 -b','All authpriv messages'],
      ['sudo lastb | head','Failed logins (btmp)'],
      ['lastlog2','Last login per account']],
    flags:[
      ['SYSLOG_FACILITY=10','authpriv'],
      ['_COMM=sudo','sudo command log'],
      ['-g "Accepted|Failed"','Regex on messages'],
      ['aureport -au','Audit-based auth report (Security section)']],
    example:{cmd:'journalctl _COMM=sudo -n 2 -o cat', out:
`  sooraj : TTY=pts/1 ; PWD=/home/sooraj ; USER=root ; COMMAND=/usr/bin/dnf upgrade --refresh
  sooraj : TTY=pts/1 ; PWD=/home/sooraj ; USER=root ; COMMAND=/usr/bin/systemctl restart nginx`} },

  { title:'Desktop & App Logs', icon:'🖥️', badge:'DESKTOP', color:'blue',
    cmds:[
      ['journalctl --user -b','Your session\'s journal'],
      ['journalctl --user -u pipewire -u wireplumber -b','Audio stack'],
      ['journalctl -b _COMM=gnome-shell -p warning','GNOME Shell warnings'],
      ['journalctl --user -b -u "app-flatpak-org.gimp.GIMP-*"','A Flatpak app (units accept glob patterns)'],
      ['flatpak run org.gimp.GIMP 2>&1 | tee gimp.log','Or run it from a terminal to see output'],
      ['journalctl -b -u gdm','Login screen'],
      ['journalctl -b -u NetworkManager -g "wlp|state change"','Wi-Fi connect/disconnect'],
      ['ls ~/.local/share/xorg/ 2>/dev/null','Xorg logs (X11 sessions only)']],
    flags:[
      ['--user','Your user journal'],
      ['_COMM=gnome-shell','The desktop shell'],
      ['-u gdm','Display manager'],
      ['app-flatpak-<id>-*.scope','How Flatpak apps appear']],
    example:{cmd:'journalctl --user -u wireplumber -b -n 2 --no-pager', out:
`Sep 30 08:02:31 fedora-ws wireplumber[2088]: spa.bluez5: BlueZ system service is not available
Sep 30 08:03:12 fedora-ws wireplumber[2088]: wp-device: SPA handle 'api.bluez5.enum.dbus' could not be loaded`} },

  { title:'Web Server Log Analysis', icon:'🌐', badge:'ACCESS', color:'green',
    cmds:[
      ['awk \'{print $1}\' access.log | sort | uniq -c | sort -rn | head','Top client IPs'],
      ['awk \'{print $9}\' access.log | sort | uniq -c | sort -rn','Count by status code'],
      ['awk \'$9 ~ /^5/\' access.log | tail','Recent 5xx errors'],
      ['awk \'{print $7}\' access.log | sort | uniq -c | sort -rn | head','Most requested URLs'],
      ['awk \'$9==404 {print $7}\' access.log | sort | uniq -c | sort -rn | head','Most common 404s'],
      ['grep "30/Sep/2026:09" access.log | wc -l','Requests in one hour'],
      ['tail -F /var/log/nginx/access.log | grep --line-buffered " 500 "','Watch errors live'],
      ['sudo dnf install goaccess && goaccess access.log --log-format=COMBINED -o report.html','Full HTML dashboard']],
    flags:[
      ['$1 / $7 / $9 / $10','IP / path / status / bytes (combined format)'],
      ['$9 ~ /^5/','Regex on a field'],
      ['--line-buffered','grep in a live pipe'],
      ['goaccess --real-time-html','Live-updating report']],
    example:{cmd:'awk \'{print $9}\' access.log | sort | uniq -c | sort -rn', out:
`   8412 200
    611 304
    233 404
     41 301
     12 500`} },

  { title:'Log Viewers', icon:'🔭', badge:'VIEWERS', color:'blue',
    cmds:[
      ['sudo dnf install lnav',''],
      ['lnav /var/log/nginx/','Merge + colour + filter log files'],
      ['journalctl -b -o short-iso | lnav','The journal in lnav'],
      ['sudo dnf install gnome-logs && gnome-logs','GNOME\'s journal viewer'],
      ['journalctl -b','Opens in less:'],
      ['sudo dnf install glogg','Fast GUI viewer for huge files']],
    table:{head:['Keys in journalctl / less','Does'], rows:[
      ['G / g','End / start'],
      ['/ ?','Search forward / back'],
      ['n / N','Next / previous match'],
      ['F','Follow new lines (Ctrl+C stops)'],
      ['-S then Enter','Toggle line wrapping'],
      ['&pattern','Show only matching lines']]},
    flags:[
      ['lnav: e / E','Next / previous error'],
      ['lnav: :filter-in <re>','Show only matching lines'],
      ['lnav: ;SELECT …','SQL over your logs'],
      ['--no-pager','Plain output, no less']],
    example:{cmd:'lnav -n -c ":filter-in 500" /var/log/nginx/access.log | head -2', out:
`203.0.113.7 - - [30/Sep/2026:09:02:11 +0300] "POST /api/orders HTTP/1.1" 500 162 "-" "curl/8.15.0"
198.51.100.23 - - [30/Sep/2026:09:11:47 +0300] "GET /admin HTTP/1.1" 500 162 "-" "Mozilla/5.0"`} },

  { title:'Write a logrotate Config', icon:'🔄', badge:'ROTATE', color:'warn',
    code:
`# /etc/logrotate.d/myapp
/var/log/myapp/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0640 myapp myapp
    sharedscripts
    postrotate
        systemctl reload myapp.service >/dev/null 2>&1 || true
    endscript
}`,
    cmds:[
      ['sudoedit /etc/logrotate.d/myapp','Add the file above'],
      ['sudo logrotate -d /etc/logrotate.d/myapp','Dry run: what would happen'],
      ['sudo logrotate -f /etc/logrotate.d/myapp','Force a rotation now'],
      ['systemctl list-timers logrotate.timer','Runs daily via a systemd timer'],
      ['cat /var/lib/logrotate/logrotate.status | grep myapp','When each log was last rotated']],
    flags:[
      ['daily / weekly / monthly / size 100M','When'],
      ['rotate N','Keep N old files'],
      ['compress + delaycompress','gzip, but leave the newest old file plain'],
      ['copytruncate','For apps that can\'t reopen logs (may lose a few lines)'],
      ['create mode user group','New empty log after rotating'],
      ['postrotate … endscript','Tell the app to reopen its log']],
    example:{cmd:'sudo logrotate -d /etc/logrotate.d/myapp 2>&1 | grep -E "rotating pattern|log needs|does not need"', out:
`rotating pattern: /var/log/myapp/*.log  after 1 days (14 rotations)
  log does not need rotating (log has already been rotated)`} },

  { title:'Send Logs to Another Server', icon:'📡', badge:'REMOTE', color:'blue',
    cmds:[
      ['# Receiver (log server):',''],
      ['sudo dnf install systemd-journal-remote',''],
      ['sudo systemctl edit systemd-journal-remote.service','Plain HTTP (default is HTTPS with certificates) — add the 2 lines below:'],
      ['ExecStart=','  (clears the default)'],
      ['ExecStart=/usr/lib/systemd/systemd-journal-remote --listen-http=-3 --output=/var/log/journal/remote/',''],
      ['sudo mkdir -p /var/log/journal/remote && sudo chown systemd-journal-remote: /var/log/journal/remote',''],
      ['sudo systemctl enable --now systemd-journal-remote.socket','Listens on :19532'],
      ['sudo firewall-cmd --permanent --add-port=19532/tcp && sudo firewall-cmd --reload',''],
      ['# Each sender:',''],
      ['sudo dnf install systemd-journal-remote',''],
      ['echo -e "[Upload]\\nURL=http://logserver.lan:19532" | sudo tee /etc/systemd/journal-upload.conf.d/50-server.conf',''],
      ['sudo systemctl enable --now systemd-journal-upload',''],
      ['# On the log server, read everyone\'s logs:',''],
      ['sudo journalctl -D /var/log/journal/remote/ -f','All hosts'],
      ['sudo journalctl -D /var/log/journal/remote/ _HOSTNAME=web1','One host'],
      ['echo "*.* @@logserver.lan:514" | sudo tee /etc/rsyslog.d/90-forward.conf','Classic syslog forwarding instead (rsyslog)']],
    flags:[
      ['-D <dir>','Read journal files from a directory'],
      ['--file <f>','One journal file'],
      ['_HOSTNAME=','Filter by sending host'],
      ['@@host:514 / @host:514','rsyslog TCP / UDP'],
      ['--merge','Interleave all available journals']],
    example:{cmd:'sudo journalctl -D /var/log/journal/remote/ -n 3 --no-pager', out:
`Sep 30 09:15:02 web1 nginx[2210]: 2026/09/30 09:15:02 [error] 2211#2211: *881 upstream timed out
Sep 30 09:15:03 db-01 postgres[1402]: LOG:  checkpoint complete: wrote 312 buffers (1.9%)
Sep 30 09:15:05 web2 sshd[4410]: Accepted publickey for deploy from 10.0.0.5 port 50112 ssh2`},
    warn:'This plain setup sends logs unencrypted — use HTTPS with certificates (or a VPN) across untrusted networks.' }
);
})();

/* ═════════════════ MORE LOGS (v2.27) ═════════════════ */
(function () {
const l = window.FB_DATA.find(x => x.id === 'logs');

l.cards.unshift({ title:'Where Is the Log For…?', icon:'🗺️', badge:'MAP', color:'green', tableFirst:true,
  desc:'On Fedora most things log to the journal; some apps still keep their own files.',
  table:{mono:true, head:['Thing','Look here'], rows:[
    ['Any systemd service','journalctl -u <name>'],
    ['Kernel / drivers / USB','journalctl -k   or   dmesg'],
    ['Package installs','/var/log/dnf5.log   ·   dnf history'],
    ['SELinux denials','/var/log/audit/audit.log'],
    ['nginx / Apache','/var/log/nginx/   ·   /var/log/httpd/'],
    ['PostgreSQL','/var/lib/pgsql/data/log/'],
    ['MariaDB','/var/log/mariadb/mariadb.log'],
    ['Virtual machines','/var/log/libvirt/qemu/<vm>.log'],
    ['Containers','podman logs <name>'],
    ['Printing','journalctl -u cups   ·   /var/log/cups/'],
    ['Login screen','journalctl -u gdm'],
    ['Your desktop apps','journalctl --user -b'],
    ['Fedora installer','/var/log/anaconda/'],
    ['Crashes','coredumpctl list']]},
  cmds:[
    ['sudo find /var/log -mmin -10 -type f','Which log files changed in the last 10 minutes'],
    ['sudo ls -lt /var/log | head','Most recently written logs'],
    ['systemctl status <unit> | head -20','Status also shows the last log lines']],
  example:{cmd:'sudo find /var/log -mmin -10 -type f', out:
`/var/log/audit/audit.log
/var/log/journal/7c2e0d9a1b4c4e6f8a0b2c3d4e5f6a7b/system.journal
/var/log/journal/7c2e0d9a1b4c4e6f8a0b2c3d4e5f6a7b/user-1000.journal
/var/log/nginx/access.log`},
  tip:'Not sure where something logs? Reproduce the problem, then run the <code>find -mmin</code> command above.' });

l.cards.push(
  { title:'Container Logs', icon:'🐳', badge:'PODMAN', color:'blue',
    cmds:[
      ['podman logs web','All output of a container'],
      ['podman logs -f --tail 50 web','Follow, starting with the last 50 lines'],
      ['podman logs --since 10m -t web','Last 10 minutes, with timestamps'],
      ['podman logs --until 2026-09-30T09:00:00 web','Up to a time'],
      ['podman pod logs -f app','All containers in a pod'],
      ['journalctl --user -u web -f','Quadlet container (runs as a user service)'],
      ['journalctl CONTAINER_NAME=web -o cat','Journald log driver: filter by container'],
      ['podman run --log-opt max-size=10m --name web …','Cap a container\'s log file']],
    flags:[
      ['-f','Follow'],
      ['--tail N','Last N lines'],
      ['--since / --until','Relative (10m) or timestamp'],
      ['-t','Timestamps'],
      ['--log-driver journald|k8s-file','Where logs are stored'],
      ['CONTAINER_NAME= / CONTAINER_ID=','Journal fields for containers']],
    example:{cmd:'podman logs --tail 3 -t web', out:
`2026-09-30T09:21:04.118+03:00 10.88.0.1 - - [30/Sep/2026:06:21:04 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.15.0"
2026-09-30T09:21:07.402+03:00 10.88.0.1 - - [30/Sep/2026:06:21:07 +0000] "GET /missing HTTP/1.1" 404 153 "-" "curl/8.15.0"
2026-09-30T09:21:07.402+03:00 2026/09/30 06:21:07 [error] 29#29: *2 open() "/usr/share/nginx/html/missing" failed (2: No such file or directory)`},
    tip:'Container times inside the log line are often UTC — <code>-t</code> adds your local time in front.' },

  { title:'Compressed & Rotated Logs', icon:'🗜️', badge:'ZGREP', color:'blue',
    cmds:[
      ['ls /var/log/nginx/','access.log, access.log-20260929.gz …'],
      ['zgrep " 500 " /var/log/nginx/access.log*','Search plain AND .gz files together'],
      ['zgrep -c "Failed password" /var/log/secure*','Count per file (rsyslog systems)'],
      ['zcat /var/log/nginx/access.log-*.gz | wc -l','Lines across old logs'],
      ['zless /var/log/nginx/access.log-20260929.gz','Page through a compressed log'],
      ['xzgrep ERROR app.log.xz','.xz files'],
      ['zstdgrep ERROR app.log.zst','.zst files'],
      ['cat access.log <(zcat access.log-*.gz) | awk \'{print $1}\' | sort | uniq -c | sort -rn | head','Top IPs across ALL rotations']],
    flags:[
      ['zgrep / zcat / zless / zdiff','gzip-aware versions'],
      ['xzgrep / xzcat','xz'],
      ['zstdgrep / zstdcat','zstd'],
      ['-h','Hide file names (zgrep)'],
      ['-c','Count per file']],
    example:{cmd:'zgrep -c " 500 " /var/log/nginx/access.log*', out:
`/var/log/nginx/access.log:12
/var/log/nginx/access.log-20260928.gz:4
/var/log/nginx/access.log-20260929.gz:31`},
    tip:'The journal compresses itself — these tools are for classic text log files.' },

  { title:'Time Filters Cheat-sheet', icon:'⏲️', badge:'TIME', color:'green', tableFirst:true,
    table:{mono:true, head:['You want','Use'], rows:[
      ['Last 15 minutes','--since -15min'],
      ['Last 2 hours','--since "2 hours ago"'],
      ['Today','--since today'],
      ['Yesterday only','--since yesterday --until today'],
      ['Since 18:00 yesterday','--since "$(date -d \'yesterday 18:00\' \'+%F %T\')"'],
      ['An exact window','--since "2026-09-29 22:00" --until "2026-09-29 22:30"'],
      ['From a Unix timestamp','--since @1790694000'],
      ['This boot / last boot','-b   /   -b -1'],
      ['Newest N lines','-n 100'],
      ['Newest first','-r']]},
    cmds:[
      ['journalctl -u nginx --since -15min','Quick look'],
      ['journalctl -p err --since yesterday --until today','Yesterday\'s errors'],
      ['date -d @1790694000','Convert a timestamp you found in a log'],
      ['systemd-analyze timespan 1h30min','Check how systemd reads a duration'],
      ['systemd-analyze timestamp "2026-09-29 18:00"','…or a point in time']],
    flags:[
      ['-S / -U','Short for --since / --until'],
      ['now, today, yesterday, tomorrow','Keywords (on their own — "yesterday 18:00" is NOT accepted)'],
      ['-1h, -30min, -2d','Relative to now'],
      ['--utc','Interpret + show in UTC']],
    example:{cmd:'systemd-analyze timestamp "2026-09-29 18:00"', out:
`  Original form: 2026-09-29 18:00
Normalized form: Tue 2026-09-29 18:00:00 +03
       (in UTC): Tue 2026-09-29 15:00:00 UTC
   UNIX seconds: @1790694000
       From now: 15h ago`} },

  { title:'Count & Chart Events', icon:'📊', badge:'STATS', color:'green',
    cmds:[
      ['journalctl -p err --since today -o short-iso | cut -c1-13 | uniq -c','Errors per hour'],
      ['journalctl _COMM=sshd -g "Failed" --since today -o short-iso | cut -c1-16 | uniq -c | sort -rn | head','Busiest minutes for failed logins'],
      ['journalctl -b -o json --output-fields=_SYSTEMD_UNIT | jq -r \'._SYSTEMD_UNIT // "kernel"\' | sort | uniq -c | sort -rn | head','Chattiest units this boot'],
      ['awk \'{split($4,t,":"); h=t[2]; c[h]++} END {for (h in c) printf "%s:00 %6d %s\\n", h, c[h], substr("##################################################",1,c[h]/50)}\' access.log | sort','Requests per hour as a text bar chart'],
      ['awk \'{s+=$10} END {printf "%.1f MB\\n", s/1048576}\' access.log','Total bytes served']],
    flags:[
      ['cut -c1-13','Keep "YYYY-MM-DDTHH" (hour bucket)'],
      ['cut -c1-16','Minute bucket'],
      ['uniq -c','Count consecutive identical lines'],
      ['--output-fields','Smaller JSON = faster'],
      ['substr(bar,1,n)','awk text-bar trick']],
    example:{cmd:'journalctl -p err --since today -o short-iso | cut -c1-13 | uniq -c', out:
`      4 2026-09-30T08
     17 2026-09-30T09`},
    tip:'A sudden jump in the per-hour count tells you when a problem started — then zoom in with <code>--since/--until</code>.' },

  { title:'Alert on Errors (Live Watcher)', icon:'🚨', badge:'ALERT', color:'warn',
    code:
`#!/usr/bin/env bash
# ~/bin/log-alert.sh — desktop notification for every new error
journalctl -f -n 0 -p err -o cat | while read -r msg; do
  notify-send -u critical "System error" "$msg"
done`,
    cmds:[
      ['chmod +x ~/bin/log-alert.sh && ~/bin/log-alert.sh &','Start it'],
      ['journalctl -f -n 0 -u nginx -g "upstream timed out"','Follow only one pattern from one service'],
      ['journalctl -f -n 0 -p err -o cat | tee -a ~/errors.log','Follow + keep a copy'],
      ['tail -F /var/log/nginx/error.log | grep --line-buffered crit','Classic log file version'],
      ['systemd-run --user --unit=log-alert ~/bin/log-alert.sh','Run the watcher as a background user service'],
      ['journalctl --user -u log-alert -f','…and its own output']],
    flags:[
      ['-f -n 0','Follow, show only NEW entries'],
      ['-o cat','Message text only'],
      ['notify-send -u critical','Stays until dismissed'],
      ['--line-buffered','Needed when grep feeds another command']],
    example:{cmd:'journalctl -f -n 0 -p err -o cat', out:
`myapp.service: Main process exited, code=exited, status=1/FAILURE
myapp.service: Failed with result 'exit-code'.`},
    tip:'For servers, use a unit\'s <code>OnFailure=</code> (Services → Restart Policies) to send email instead of desktop pop-ups.' },

  { title:'Debug Boot Logging', icon:'🥾', badge:'BOOTLOG', color:'warn',
    cmds:[
      ['# At GRUB press e, append to the linux line, then Ctrl+X:',''],
      ['systemd.log_level=debug','Very detailed systemd logging'],
      ['rd.debug','Initramfs (early boot) debugging'],
      ['systemd.journald.forward_to_console=1 console=tty1','Show log on screen while booting'],
      ['sudo grubby --update-kernel=DEFAULT --args="systemd.log_level=debug"','Make it stick for the next boots…'],
      ['sudo grubby --update-kernel=DEFAULT --remove-args="systemd.log_level=debug"','…and remove it afterwards'],
      ['journalctl -b -o short-monotonic | head -40','Seconds since power-on for each line'],
      ['journalctl -b -1 -u systemd-journald','Journal\'s own messages (missed logs, rate limits)']],
    flags:[
      ['systemd.log_level=debug|info','systemd verbosity'],
      ['rd.debug','dracut/initramfs'],
      ['loglevel=7','Kernel console verbosity'],
      ['-o short-monotonic','Timing relative to boot'],
      ['rhgb quiet','Remove to see boot text instead of the logo']],
    example:{cmd:'journalctl -b -o short-monotonic --no-hostname | head -4', out:
`[    0.000000] kernel: Linux version 6.19.8-200.fc44.x86_64 (mockbuild@…) (gcc (GCC) 15.2.1) #1 SMP PREEMPT_DYNAMIC
[    0.000000] kernel: Command line: BOOT_IMAGE=(hd0,gpt2)/vmlinuz-6.19.8-200.fc44.x86_64 root=UUID=9e3f… ro rhgb quiet
[    1.402118] systemd[1]: systemd 258.1-1.fc44 running in system mode
[    2.881440] systemd[1]: Switching root.`},
    warn:'Debug logging produces huge amounts of text — remove the option once you\'ve captured the problem.' },

  { title:'Noisy or Missing Logs', icon:'🔇', badge:'TUNE', color:'blue',
    code:
`# sudo systemctl edit chatty-app.service
[Service]
# Drop debug/info noise from this service only
LogLevelMax=warning
# Drop lines matching a pattern (newer systemd: ~ means "exclude")
LogFilterPatterns=~health-check
# Allow bursts instead of "Suppressed N messages"
LogRateLimitIntervalSec=30s
LogRateLimitBurst=10000`,
    cmds:[
      ['journalctl -u systemd-journald -g "Suppressed"','Were messages dropped by rate limiting?'],
      ['sudo systemctl edit chatty-app.service','Add the drop-in above'],
      ['sudo systemctl restart chatty-app',''],
      ['systemctl show chatty-app -p LogLevelMax -p LogRateLimitBurst','Check it applied'],
      ['journalctl -u chatty-app --since -5min | wc -l','Compare volume before/after'],
      ['sudo systemctl service-log-level systemd-resolved debug','Change a running systemd daemon\'s level (supported by systemd\'s own services)']],
    flags:[
      ['LogLevelMax=','Highest priority stored (lower = less)'],
      ['LogFilterPatterns=~re','Discard matching lines'],
      ['LogRateLimitIntervalSec / Burst','Per-service rate limit'],
      ['RateLimitIntervalSec (journald.conf)','Global defaults'],
      ['SyslogIdentifier=','Name shown in the log']],
    example:{cmd:'journalctl -u systemd-journald -g Suppressed -n 1 -o cat', out:`Suppressed 4812 messages from chatty-app.service`} },

  { title:'rsyslog: Classic Text Logs & Rules', icon:'📜', badge:'RSYSLOG', color:'blue',
    code:
`# /etc/rsyslog.d/30-myapp.conf
# Put one program's messages in its own file…
:programname, isequal, "myapp"   /var/log/myapp.log
# …and stop them going anywhere else
& stop

# Everything at err or worse into one file
*.err                            /var/log/errors.log`,
    cmds:[
      ['sudo dnf install rsyslog && sudo systemctl enable --now rsyslog','Classic /var/log/messages, /var/log/secure'],
      ['sudoedit /etc/rsyslog.d/30-myapp.conf','Rules above'],
      ['sudo rsyslogd -N1','Validate the config'],
      ['sudo systemctl restart rsyslog',''],
      ['logger -t myapp "hello" && sudo tail -1 /var/log/myapp.log','Test the rule'],
      ['sudo tail -f /var/log/messages','General system log (rsyslog)'],
      ['sudo tail -f /var/log/secure','Authentication log (rsyslog)']],
    flags:[
      ['facility.priority','e.g. authpriv.*, *.err, kern.warning'],
      [':property, compare, "value"','Property filter'],
      ['& stop','Don\'t process this message further'],
      ['@host:514 / @@host:514','Forward UDP / TCP'],
      ['rsyslogd -N1','Syntax check']],
    example:{cmd:'sudo rsyslogd -N1', out:
`rsyslogd: version 8.2508.0, config validation run (level 1), master config /etc/rsyslog.conf
rsyslogd: End of config validation run. Bye.`},
    tip:'rsyslog reads from the journal, so you keep journalctl too — the text files are an extra copy.' },

  { title:'Clear or Share Logs Safely', icon:'🧽', badge:'PRIVACY', color:'red',
    cmds:[
      ['journalctl -b -p warning --no-pager > boot.log','Export only what\'s needed'],
      ['sed -E -i "s/([0-9]{1,3}\\.){3}[0-9]{1,3}/x.x.x.x/g; s/$(hostname)/HOST/g; s/$USER/USER/g" boot.log','Hide IPs, hostname, username'],
      ['sudo dnf install sos && sudo sos report --batch --clean','Full, automatically obfuscated report'],
      ['sudo journalctl --rotate && sudo journalctl --vacuum-time=1s','Delete ALL archived journal entries'],
      ['sudo truncate -s 0 /var/log/nginx/access.log','Empty a text log without breaking the app'],
      ['history -c && history -w','Clear your shell history too']],
    flags:[
      ['--rotate then --vacuum-time=1s','Wipe old journal'],
      ['truncate -s 0','Keep the file (and its permissions)'],
      ['sos --clean','Obfuscate automatically'],
      ['-o cat','Message text only (fewer identifiers)']],
    example:{cmd:'grep -c "x.x.x.x" boot.log', out:`37`},
    warn:'Wiping logs also removes the evidence you may need later — export a copy first if something is wrong.' }
);
})();

/* ═════════════════ MORE BOOT (v2.28) ═════════════════ */
(function () {
const b = window.FB_DATA.find(x => x.id === 'boot');

b.cards.unshift({ title:'The Boot Chain', icon:'⛓️', badge:'OVERVIEW', color:'green', tableFirst:true,
  desc:'Each stage hands over to the next. Knowing which one failed tells you where to look.',
  table:{mono:true, head:['Stage','Inspect with'], rows:[
    ['1 · UEFI firmware','efibootmgr -v   ·   mokutil --sb-state'],
    ['2 · shim → GRUB','ls /boot/efi/EFI/fedora/'],
    ['3 · GRUB menu','sudo grubby --info=ALL'],
    ['4 · Kernel + initramfs','cat /proc/cmdline   ·   lsinitrd'],
    ['5 · systemd (PID 1)','systemd-analyze   ·   systemctl --failed'],
    ['6 · Targets','systemctl get-default'],
    ['7 · Login (gdm)','journalctl -b -u gdm']]},
  cmds:[
    ['[ -d /sys/firmware/efi ] && echo UEFI || echo "Legacy BIOS"','Boot mode'],
    ['systemd-analyze','Time spent in firmware, loader, kernel, initrd, userspace'],
    ['journalctl -b -o short-monotonic | head -20','First seconds of this boot']],
  flags:[
    ['Stuck before GRUB menu','Firmware / Secure Boot / boot order'],
    ['"grub>" or "grub rescue>" prompt','GRUB config/files missing → Repair GRUB card'],
    ['Kernel panic / "Timed out waiting for device"','Kernel args, initramfs, disk UUID, LUKS'],
    ['Emergency mode','fstab or a failed mount (Troubleshoot → Won\'t Boot)'],
    ['Black screen after logo','Graphics driver (try nomodeset)']],
  flagsLabel:'Diagnosis', flagsHead:['If it stops at…','Look at'],
  example:{cmd:'systemd-analyze', out:
`Startup finished in 6.211s (firmware) + 2.104s (loader) + 1.402s (kernel) + 2.881s (initrd) + 7.930s (userspace) = 20.530s
graphical.target reached after 7.902s in userspace.`} });

b.cards.push(
  { title:'UEFI Boot Entries (efibootmgr)', icon:'🧬', badge:'UEFI', color:'blue',
    cmds:[
      ['efibootmgr','Boot entries + current order'],
      ['efibootmgr -v','…with disk/file paths'],
      ['sudo efibootmgr -o 0001,0000,2001','Change the permanent boot order'],
      ['sudo efibootmgr -n 0000','Boot entry 0000 NEXT TIME ONLY (e.g. Windows)'],
      ['sudo efibootmgr -N','Cancel BootNext'],
      ['sudo efibootmgr -b 0003 -B','Delete a stale entry'],
      ['sudo efibootmgr -c -d /dev/nvme0n1 -p 1 -L Fedora -l "\\EFI\\fedora\\shimx64.efi"','Re-create the Fedora entry'],
      ['systemctl reboot --firmware-setup','Reboot straight into the UEFI/BIOS setup']],
    flags:[
      ['-o <list>','BootOrder'],
      ['-n <num> / -N','BootNext / delete BootNext'],
      ['-b <num> -B','Delete an entry'],
      ['-c -d <disk> -p <part> -L <label> -l <loader>','Create an entry'],
      ['-v','Verbose paths']],
    example:{cmd:'efibootmgr', out:
`BootCurrent: 0001
Timeout: 1 seconds
BootOrder: 0001,0000,2001
Boot0000* Windows Boot Manager
Boot0001* Fedora
Boot2001* EFI USB Device`},
    warn:'Deleting the wrong entry can leave a system that won\'t boot until you re-create it — note the numbers first.' },

  { title:'GRUB Menu & One-time Boot', icon:'📋', badge:'GRUB+', color:'blue',
    code:
`# /etc/default/grub  (Fedora defaults shown)
GRUB_TIMEOUT=5
GRUB_DEFAULT=saved
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="rhgb quiet"
GRUB_DISABLE_RECOVERY="true"
GRUB_ENABLE_BLSCFG=true`,
    cmds:[
      ['sudo grub2-editenv - unset menu_auto_hide','Always show the menu'],
      ['sudo grub2-editenv - set menu_auto_hide=1','Hide it again (Shift/Esc still shows it)'],
      ['sudo grub2-editenv list','GRUB environment (saved_entry, …)'],
      ['ls /boot/loader/entries/','One .conf file per kernel (BLS)'],
      ['sudo grubby --info=ALL | grep -E "^(index|title)"','Menu entries'],
      ['sudo grub2-reboot "Windows Boot Manager (on /dev/nvme0n1p1)"','Boot that entry once, then back to default'],
      ['sudo grub2-set-default 1','Permanent default by index'],
      ['sudoedit /etc/default/grub && sudo grub2-mkconfig -o /boot/grub2/grub.cfg','Change timeout etc., then regenerate']],
    flags:[
      ['GRUB_TIMEOUT=','Seconds to show the menu'],
      ['GRUB_DEFAULT=saved','Use the saved/default entry'],
      ['menu_auto_hide','Fedora hides the menu when only one OS boots fine'],
      ['grub2-reboot','One-time entry'],
      ['grub2-set-default','Permanent entry'],
      ['/boot/grub2/grub.cfg','The file to regenerate (UEFI too)']],
    example:{cmd:'sudo grubby --info=ALL | grep -E "^(index|title)"', out:
`index=0
title="Fedora Linux (6.19.8-200.fc44.x86_64) 44 (Workstation Edition)"
index=1
title="Fedora Linux (6.19.7-200.fc44.x86_64) 44 (Workstation Edition)"
index=2
title="Fedora Linux (0-rescue-3f9c2a7d8e1b4c6a9f0e2d1c3b5a7e9f) 44 (Workstation Edition)"`},
    tip:'Hold <kbd>Shift</kbd> (BIOS) or tap <kbd>Esc</kbd> (UEFI) during start-up to show a hidden GRUB menu.' },

  { title:'Kernel Parameters', icon:'🎚️', badge:'CMDLINE', color:'warn', tableFirst:true,
    table:{head:['Parameter','Effect'], rows:[
      ['rhgb quiet','Graphical splash, few messages (remove to see boot text)'],
      ['nomodeset','Basic graphics — rescue from a black screen'],
      ['systemd.unit=rescue.target','Boot to a rescue shell'],
      ['rd.break','Stop in the initramfs'],
      ['module_blacklist=nouveau','Don\'t load a driver'],
      ['mem_sleep_default=deep','Deeper suspend (if supported)'],
      ['amd_pstate=active','AMD CPU power driver mode'],
      ['pcie_aspm=off','Workaround for some PCIe/Wi-Fi hangs'],
      ['usbcore.autosuspend=-1','Stop USB devices going to sleep'],
      ['mitigations=off','Disable CPU security mitigations (faster, LESS SAFE)']]},
    cmds:[
      ['cat /proc/cmdline','Parameters used for this boot'],
      ['sudo grubby --update-kernel=ALL --args="pcie_aspm=off"','Add to every kernel'],
      ['sudo grubby --update-kernel=ALL --remove-args="pcie_aspm"','Remove again'],
      ['sudo grubby --update-kernel=DEFAULT --args="nomodeset"','Only the default kernel'],
      ['sudo grubby --info=DEFAULT | grep args','Check'],
      ['# Try once: press e at the GRUB menu, edit the linux line, Ctrl+X','']],
    flags:[
      ['--update-kernel=ALL|DEFAULT|<path>','Which entries'],
      ['--args / --remove-args','Add / remove'],
      ['GRUB_CMDLINE_LINUX','Defaults for newly installed kernels'],
      ['e at GRUB menu','One-time edit (safest way to test)']],
    example:{cmd:'cat /proc/cmdline', out:`BOOT_IMAGE=(hd0,gpt2)/vmlinuz-6.19.8-200.fc44.x86_64 root=UUID=9e3f…1c44 ro rootflags=subvol=root rd.luks.uuid=luks-9e3f… rhgb quiet`},
    tip:'Always test a new parameter once with <kbd>e</kbd> at the GRUB menu before making it permanent with grubby.' },

  { title:'Dual-boot with Windows', icon:'🪟', badge:'DUAL', color:'blue',
    cmds:[
      ['sudo dnf install os-prober','Detects other OSes'],
      ['echo "GRUB_DISABLE_OS_PROBER=false" | sudo tee -a /etc/default/grub','If Windows is missing from the menu'],
      ['sudo grub2-mkconfig -o /boot/grub2/grub.cfg','Regenerate — look for "Found Windows Boot Manager"'],
      ['sudo grub2-reboot "Windows Boot Manager (on /dev/nvme0n1p1)" && systemctl reboot','Reboot into Windows once'],
      ['sudo efibootmgr -n 0000 && systemctl reboot','Same via firmware BootNext'],
      ['sudo timedatectl set-local-rtc 1 --adjust-system-clock','Fix clock jumping between OSes…'],
      ['reg add "HKLM\\System\\CurrentControlSet\\Control\\TimeZoneInformation" /v RealTimeIsUniversal /t REG_DWORD /d 1','Better: run in an ADMIN Windows terminal so Windows uses UTC like Linux']],
    flags:[
      ['os-prober','Finds Windows/other Linux'],
      ['GRUB_DISABLE_OS_PROBER=false','Allow it to run'],
      ['grub2-reboot / efibootmgr -n','One-time OS choice'],
      ['set-local-rtc','RTC in local time (Windows default)']],
    example:{cmd:'sudo grub2-mkconfig -o /boot/grub2/grub.cfg', out:
`Generating grub configuration file ...
Found Windows Boot Manager on /dev/nvme0n1p1@/efi/Microsoft/Boot/bootmgfw.efi
Adding boot menu entry for UEFI Firmware Settings ...
done`},
    warn:'Turn off Windows "Fast Startup" — it leaves disks half-mounted and can corrupt shared NTFS partitions.' },

  { title:'Repair GRUB from a Live USB', icon:'🛠️', badge:'REPAIR', color:'red',
    cmds:[
      ['lsblk -f','Boot the Fedora live USB, identify partitions (EFI, /boot, root)'],
      ['sudo cryptsetup open /dev/nvme0n1p3 root','Only if the root partition is encrypted (LUKS)'],
      ['sudo mount -o subvol=root /dev/mapper/root /mnt','Btrfs root subvolume (use /dev/nvme0n1p3 if not encrypted)'],
      ['sudo mount /dev/nvme0n1p2 /mnt/boot',''],
      ['sudo mount /dev/nvme0n1p1 /mnt/boot/efi',''],
      ['for d in dev proc sys run; do sudo mount --rbind /$d /mnt/$d; done',''],
      ['sudo chroot /mnt','You are now "inside" the installed system'],
      ['dnf reinstall "shim-*" "grub2-efi-*" grub2-common','Restore bootloader files (UEFI)'],
      ['grub2-mkconfig -o /boot/grub2/grub.cfg','Rebuild the menu'],
      ['exit && sudo reboot','']],
    flags:[
      ['subvol=root','Fedora\'s default Btrfs layout'],
      ['--rbind','Bring /dev /sys /proc /run into the chroot'],
      ['reinstall shim/grub2-efi','Fedora way on UEFI (not grub2-install)'],
      ['grub2-install /dev/sda','Only for legacy BIOS systems']],
    example:{cmd:'dnf reinstall "shim-*" "grub2-efi-*" grub2-common', out:
`Package                   Arch    Version            Repository   Size
Reinstalling:
 grub2-common             noarch  1:2.12-40.fc44     updates   3.1 MiB
 grub2-efi-x64            x86_64  1:2.12-40.fc44     updates   6.0 MiB
 shim-x64                 x86_64  15.8-4             fedora    3.2 MiB
Complete!`},
    danger:'Check every device name with <code>lsblk -f</code> — mounting or reinstalling onto the wrong disk can break another OS.' },

  { title:'initramfs & dracut', icon:'📦', badge:'DRACUT', color:'blue',
    code:
`# /etc/dracut.conf.d/90-custom.conf
# Always include the NVMe driver
add_drivers+=" nvme "
# Leave out the boot splash
omit_dracutmodules+=" plymouth "
# Smaller image with only what THIS machine needs (Fedora default)
hostonly="yes"`,
    cmds:[
      ['ls -lh /boot/initramfs-*','One initramfs per kernel'],
      ['lsinitrd | head -20','What\'s inside (current kernel)'],
      ['lsinitrd -m','Included dracut modules'],
      ['lsinitrd | grep -i nvme','Is a driver included?'],
      ['sudo dracut -f','Rebuild for the running kernel'],
      ['sudo dracut -f --kver 6.19.7-200.fc44.x86_64','Rebuild for another kernel'],
      ['sudo dracut -f --regenerate-all','Rebuild all (after changing dracut.conf.d)'],
      ['sudo dracut --list-modules | head','Available modules'],
      ['sudo dracut --print-cmdline','Kernel args dracut would need for this system']],
    flags:[
      ['-f','Overwrite existing image'],
      ['--kver','Kernel version'],
      ['--regenerate-all','Every installed kernel'],
      ['--add / --omit <module>','One-off changes'],
      ['add_drivers+= / omit_dracutmodules+=','Permanent (in dracut.conf.d)'],
      ['hostonly="no"','Generic image (to move the disk to other hardware)']],
    example:{cmd:'lsinitrd -m | head -8', out:
`dracut modules:
bash
systemd
systemd-initrd
i18n
crypt
dm
kernel-modules`},
    tip:'Moving your disk to different hardware? Rebuild once with <code>--no-hostonly</code> so every driver is included.' },

  { title:'Keep a Known-Good Kernel', icon:'🛡️', badge:'KERNEL+', color:'green',
    cmds:[
      ['rpm -q kernel-core','Installed kernels'],
      ['uname -r','Running kernel'],
      ['sudo grubby --set-default /boot/vmlinuz-6.19.7-200.fc44.x86_64','Boot the older kernel by default'],
      ['sudo dnf config-manager setopt installonly_limit=5','Keep more old kernels around'],
      ['sudo dnf upgrade --exclude="kernel*"','Update everything except the kernel (once)'],
      ['sudo dnf versionlock add kernel kernel-core kernel-modules kernel-modules-core kernel-modules-extra','Pause kernel updates'],
      ['sudo dnf versionlock delete kernel kernel-core kernel-modules kernel-modules-core kernel-modules-extra','Resume later'],
      ['sudo dnf install koji && koji download-build --arch=x86_64 kernel-6.19.6-200.fc44','Get an older kernel from Fedora\'s build system'],
      ['sudo dnf install ./kernel*-6.19.6-200.fc44.x86_64.rpm','…install it alongside']],
    flags:[
      ['installonly_limit','How many kernels dnf keeps (default 3)'],
      ['--exclude="kernel*"','Skip kernels for one command'],
      ['versionlock','Hold versions until deleted'],
      ['grubby --default-kernel','Which one boots by default']],
    example:{cmd:'rpm -q kernel-core', out:
`kernel-core-6.19.6-200.fc44.x86_64
kernel-core-6.19.7-200.fc44.x86_64
kernel-core-6.19.8-200.fc44.x86_64`},
    warn:'Holding kernel updates also holds security fixes — resume updates as soon as the regression is fixed.' },

  { title:'Splash Screen & Boot Messages', icon:'🎨', badge:'PLYMOUTH', color:'blue',
    cmds:[
      ['plymouth-set-default-theme','Current theme (Fedora: bgrt = maker\'s logo)'],
      ['plymouth-set-default-theme --list','Installed themes'],
      ['sudo dnf install plymouth-theme-spinfinity','More themes'],
      ['sudo plymouth-set-default-theme -R spinner','Switch + rebuild initramfs'],
      ['sudo grubby --update-kernel=ALL --remove-args="rhgb quiet"','See all boot messages instead of a logo'],
      ['sudo grubby --update-kernel=ALL --args="rhgb quiet"','Back to the quiet splash'],
      ['# During boot: press Esc to toggle splash ↔ text','']],
    flags:[
      ['-l / --list','List themes'],
      ['-R','Rebuild the initramfs (needed to take effect)'],
      ['rhgb','Red Hat graphical boot = splash'],
      ['quiet','Fewer kernel messages']],
    example:{cmd:'plymouth-set-default-theme --list', out:
`bgrt
details
spinner
text
tribar`} },

  { title:'Slow or Hanging Shutdown', icon:'⏳', badge:'SHUTDOWN', color:'warn',
    code:
`# /etc/systemd/system.conf.d/10-timeout.conf
[Manager]
DefaultTimeoutStopSec=15s`,
    cmds:[
      ['journalctl -b -1 -r | grep -m5 -iE "stop job|timed out|killing"','What held up the last shutdown'],
      ['journalctl -b -1 -n 60','Last lines of the previous boot'],
      ['sudo mkdir -p /etc/systemd/system.conf.d && sudoedit /etc/systemd/system.conf.d/10-timeout.conf','Wait 15 s instead of 90 s (file above)'],
      ['sudo systemctl daemon-reexec','Apply'],
      ['sudo systemctl edit slow-app.service','Or only one service: TimeoutStopSec=10s'],
      ['sudo systemctl enable debug-shell','Root shell on Ctrl+Alt+F9 during boot/shutdown (debugging!)'],
      ['sudo systemctl disable debug-shell','…turn it OFF again afterwards']],
    flags:[
      ['DefaultTimeoutStopSec=','Global stop timeout (default 90s)'],
      ['TimeoutStopSec=','Per service'],
      ['"A stop job is running for …"','Name of the service to investigate'],
      ['debug-shell','Unauthenticated root shell on tty9']],
    example:{cmd:'journalctl -b -1 -r | grep -m2 -iE "stop job|timed out"', out:
`Sep 29 22:17:38 fedora-ws systemd[1]: user@1000.service: State 'stop-sigterm' timed out. Killing.
Sep 29 22:16:08 fedora-ws systemd[1]: A stop job is running for User Manager for UID 1000 (1min 30s)`},
    danger:'<code>debug-shell</code> gives anyone at the keyboard a root shell without a password — disable it as soon as you\'re done.' }
);
})();

/* ═════════════════ MORE DESKTOP (v2.29) ═════════════════ */
(function () {
const d = window.FB_DATA.find(x => x.id === 'desktop');
const K = '/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/';
d.cards.push(
  { title:'Custom Keyboard Shortcuts', icon:'⌨️', badge:'SHORTCUT', color:'green',
    desc:'Settings → Keyboard → Custom Shortcuts does the same thing; these commands let you script it.',
    cmds:[
      [`gsettings set org.gnome.settings-daemon.plugins.media-keys custom-keybindings "['${K}']"`,'1. Register a custom shortcut slot'],
      [`gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:${K} name 'Terminal'`,'2. Name it'],
      [`gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:${K} command 'ptyxis --new-window'`,'3. Command (Ptyxis = Fedora\'s terminal)'],
      [`gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:${K} binding '<Control><Alt>t'`,'4. Keys'],
      ['gsettings get org.gnome.settings-daemon.plugins.media-keys custom-keybindings','List registered slots'],
      ["gsettings set org.gnome.desktop.wm.keybindings close \"['<Super>q']\"",'Change a built-in shortcut (close window)'],
      ["gsettings set org.gnome.desktop.wm.keybindings switch-windows \"['<Alt>Tab']\"",'Alt+Tab switches windows, not apps'],
      ['gsettings list-recursively org.gnome.desktop.wm.keybindings | less','All window-manager shortcuts']],
    flags:[
      ['<Super> <Control> <Alt> <Shift>','Modifier names'],
      ['custom0/, custom1/ …','One path per shortcut — list them all in custom-keybindings'],
      ['"[]"','Empty = disable a built-in shortcut'],
      ['org.gnome.shell.keybindings','Shell shortcuts (screenshots, overview…)']],
    example:{cmd:'gsettings get org.gnome.settings-daemon.plugins.media-keys custom-keybindings', out:`['/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/']`},
    tip:'Adding a second shortcut? Put BOTH paths in the list: <code>"[\'…/custom0/\', \'…/custom1/\']"</code> — setting only the new one removes the old.' },

  { title:'Windows & Workspaces', icon:'🪟', badge:'WM', color:'blue',
    cmds:[
      ['gsettings set org.gnome.mutter center-new-windows true','Open windows centred'],
      ['gsettings set org.gnome.mutter dynamic-workspaces false','Fixed number of workspaces…'],
      ['gsettings set org.gnome.desktop.wm.preferences num-workspaces 4','…four of them'],
      ['gsettings set org.gnome.mutter workspaces-only-on-primary false','Workspaces on every monitor'],
      ['gsettings set org.gnome.shell.app-switcher current-workspace-only true','Alt+Tab only shows this workspace'],
      ['gsettings set org.gnome.mutter edge-tiling true','Drag to screen edge = half-screen'],
      ['gsettings set org.gnome.mutter attach-modal-dialogs false','Dialogs as separate windows'],
      ['gsettings set org.gnome.desktop.interface enable-hot-corners false','No overview when mouse hits top-left'],
      ["gsettings set org.gnome.desktop.wm.preferences focus-mode 'sloppy'",'Focus follows mouse']],
    table:{head:['Keys','Does'], rows:[
      ['Super+↑ / Super+↓','Maximise / restore'],
      ['Super+Shift+←/→','Move window to other monitor'],
      ['Super+Shift+Page Up/Down','Move window to other workspace'],
      ['Ctrl+Alt+←/→','Switch workspace'],
      ['Super+H','Hide (minimise)'],
      ['Alt+F8 / Alt+F7','Resize / move with keyboard']]},
    flags:[
      ['org.gnome.mutter','Window manager behaviour'],
      ['org.gnome.desktop.wm.preferences','Buttons, focus, workspaces'],
      ['gsettings reset <schema> <key>','Back to default']],
    example:{cmd:'gsettings get org.gnome.mutter dynamic-workspaces; gsettings get org.gnome.desktop.wm.preferences num-workspaces', out:
`false
4`} },

  { title:'Displays, Scaling & Night Light', icon:'🖥️', badge:'DISPLAY', color:'blue',
    cmds:[
      ['gdctl show','Monitors, modes, scale (GNOME 48+, Wayland)'],
      ['gsettings set org.gnome.desktop.interface text-scaling-factor 1.25','Bigger text without scaling everything'],
      ["gsettings set org.gnome.mutter experimental-features \"['scale-monitor-framebuffer']\"",'Enable 125% / 150% options if they\'re missing'],
      ['gsettings set org.gnome.settings-daemon.plugins.color night-light-enabled true','Night Light on'],
      ['gsettings set org.gnome.settings-daemon.plugins.color night-light-temperature 3500','Warmer (lower = warmer)'],
      ['gsettings set org.gnome.settings-daemon.plugins.color night-light-schedule-automatic true','Sunset to sunrise'],
      ['cat ~/.config/monitors.xml','Saved monitor layout'],
      ['mv ~/.config/monitors.xml ~/.config/monitors.xml.bak','Reset layout (log out/in)']],
    flags:[
      ['text-scaling-factor','Font size multiplier'],
      ['scale-monitor-framebuffer','Fractional scaling'],
      ['night-light-temperature','uint32, ~1700–4700 K'],
      ['xrandr','Doesn\'t control displays on Wayland — use Settings or gdctl']],
    example:{cmd:'gsettings get org.gnome.settings-daemon.plugins.color night-light-temperature', out:`uint32 3500`} },

  { title:'Look & Feel', icon:'🎨', badge:'THEME', color:'green',
    cmds:[
      ["gsettings set org.gnome.desktop.interface accent-color 'teal'",'Accent colour'],
      ["gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'",'Dark style'],
      ["gsettings set org.gnome.desktop.background picture-uri-dark 'file:///home/sooraj/Pictures/wall.jpg'",'Wallpaper for dark style'],
      ["gsettings set org.gnome.desktop.background picture-uri 'file:///home/sooraj/Pictures/wall.jpg'",'…and light style'],
      ['sudo dnf install adw-gtk3-theme',''],
      ["gsettings set org.gnome.desktop.interface gtk-theme 'adw-gtk3-dark'",'Make older GTK3 apps match'],
      ['sudo dnf install papirus-icon-theme',''],
      ["gsettings set org.gnome.desktop.interface icon-theme 'Papirus'",'Icon theme'],
      ['gsettings set org.gnome.desktop.interface cursor-size 32','Larger cursor'],
      ['flatpak override --user --filesystem=xdg-config/gtk-4.0:ro','Let Flatpak apps see your GTK settings']],
    flags:[
      ['accent-color','blue teal green yellow orange red pink purple slate'],
      ['color-scheme','default · prefer-dark · prefer-light'],
      ['picture-uri / picture-uri-dark','Wallpapers per style'],
      ['~/.local/share/icons, ~/.local/share/themes','Your own themes']],
    example:{cmd:'gsettings get org.gnome.desktop.interface accent-color', out:`'teal'`},
    tip:'Libadwaita (GTK4) apps ignore gtk-theme by design — accent colour and dark style are the supported knobs.' },

  { title:'Keyboard, Mouse & Touchpad', icon:'🖱️', badge:'INPUT', color:'blue',
    cmds:[
      ['gsettings set org.gnome.desktop.peripherals.keyboard delay 250','Key repeat starts sooner (ms)'],
      ['gsettings set org.gnome.desktop.peripherals.keyboard repeat-interval 25','Repeat faster (ms between)'],
      ["gsettings set org.gnome.desktop.input-sources xkb-options \"['caps:ctrl_modifier']\"",'Caps Lock → Ctrl'],
      ["gsettings set org.gnome.desktop.input-sources xkb-options \"['compose:ralt']\"",'Right Alt = Compose key (é, ñ, €…)'],
      ["gsettings set org.gnome.desktop.input-sources sources \"[('xkb', 'us'), ('xkb', 'ara')]\"",'Keyboard layouts (Super+Space switches)'],
      ['gsettings set org.gnome.desktop.peripherals.touchpad natural-scroll false','Traditional scroll direction'],
      ['gsettings set org.gnome.desktop.peripherals.touchpad disable-while-typing true',''],
      ["gsettings set org.gnome.desktop.peripherals.mouse accel-profile 'flat'",'No mouse acceleration (gaming)'],
      ['sudo libinput list-devices | grep -A3 Touchpad','What the system sees']],
    flags:[
      ['delay / repeat-interval','uint32, milliseconds'],
      ['xkb-options','List — include every option you want at once'],
      ['sources','Layouts in order'],
      ['accel-profile','default · flat · adaptive'],
      ['speed','-1.0 … 1.0']],
    example:{cmd:'gsettings get org.gnome.desktop.input-sources xkb-options', out:`['caps:ctrl_modifier', 'compose:ralt']`},
    tip:'Setting <code>xkb-options</code> replaces the whole list — combine options: <code>"[\'caps:ctrl_modifier\', \'compose:ralt\']"</code>.' },

  { title:'Autostart Apps', icon:'🚀', badge:'AUTOSTART', color:'blue',
    cmds:[
      ['ls ~/.config/autostart/ /etc/xdg/autostart/','Your autostart / system-wide autostart'],
      ['mkdir -p ~/.config/autostart && cp /usr/share/applications/org.keepassxc.KeePassXC.desktop ~/.config/autostart/','Start an app at login'],
      ['cp /var/lib/flatpak/exports/share/applications/com.discordapp.Discord.desktop ~/.config/autostart/','Same for a Flatpak app'],
      ['rm ~/.config/autostart/org.keepassxc.KeePassXC.desktop','Stop auto-starting'],
      ["cp /etc/xdg/autostart/org.gnome.Software.desktop ~/.config/autostart/ && echo 'X-GNOME-Autostart-enabled=false' >> ~/.config/autostart/org.gnome.Software.desktop",'Disable a system autostart for you only'],
      ['flatpak install flathub com.mattjakeman.ExtensionManager','Or: GNOME Tweaks → Startup Applications']],
    flags:[
      ['~/.config/autostart/','Per-user (wins over system)'],
      ['/etc/xdg/autostart/','System-wide'],
      ['X-GNOME-Autostart-enabled=false','Turn one off'],
      ['X-GNOME-Autostart-Delay=10','Start after 10 s'],
      ['systemd --user service','Alternative for background programs']],
    example:{cmd:'ls ~/.config/autostart/', out:
`com.discordapp.Discord.desktop
org.gnome.Software.desktop
org.keepassxc.KeePassXC.desktop`} },

  { title:'Create an App Launcher (.desktop)', icon:'🧷', badge:'LAUNCHER', color:'green',
    code:
`[Desktop Entry]
Type=Application
Name=My Tool
Comment=Launches my tool
Exec=/home/sooraj/Apps/mytool/mytool %F
Icon=/home/sooraj/Apps/mytool/icon.png
Terminal=false
Categories=Development;
StartupWMClass=mytool`,
    cmds:[
      ['nano ~/.local/share/applications/mytool.desktop','Save the file above there'],
      ['desktop-file-validate ~/.local/share/applications/mytool.desktop','Check for mistakes'],
      ['update-desktop-database ~/.local/share/applications','Refresh (appears in the app grid)'],
      ['gtk-launch mytool','Start it by launcher name'],
      ['cp /usr/share/applications/firefox.desktop ~/.local/share/applications/','Customise a system launcher (yours wins)'],
      ['echo "Exec=env MOZ_ENABLE_WAYLAND=1 firefox %u"','…e.g. change its Exec line']],
    flags:[
      ['Exec=','Command; %f one file, %F many files, %u URL'],
      ['Icon=','Path or theme icon name'],
      ['Terminal=true','Run in a terminal'],
      ['Categories=','Where it appears in menus'],
      ['StartupWMClass=','Match the window to this launcher (fixes duplicate dock icons)'],
      ['NoDisplay=true','Hide from the app grid']],
    example:{cmd:'desktop-file-validate ~/.local/share/applications/mytool.desktop && echo valid', out:`valid`},
    tip:'AppImages have no launcher — this is how you give one an icon in the app grid.' },

  { title:'Files (Nautilus) Tricks', icon:'🗂️', badge:'FILES', color:'blue',
    cmds:[
      ['nautilus .','Open the current folder'],
      ['gio open report.pdf','Open with the default app'],
      ['gsettings set org.gtk.gtk4.Settings.FileChooser show-hidden true','Show hidden files (also Ctrl+H)'],
      ["gsettings set org.gnome.nautilus.preferences default-folder-viewer 'list-view'",'List view everywhere'],
      ['touch ~/Templates/"Text File.txt"','Right-click → New Document → Text File'],
      ['mkdir -p ~/.local/share/nautilus/scripts','Right-click → Scripts…'],
      ['printf \'#!/bin/bash\\nfor f in "$@"; do magick "$f" -resize 50%% "small-$f"; done\\n\' > ~/.local/share/nautilus/scripts/Resize-50 && chmod +x ~/.local/share/nautilus/scripts/Resize-50','A "Resize 50%" script'],
      ['cat ~/.config/gtk-3.0/bookmarks','Sidebar bookmarks'],
      ['nautilus -q','Restart Files (after changes)']],
    table:{head:['Keys in Files','Does'], rows:[
      ['Ctrl+L','Type a path'],
      ['Ctrl+H','Hidden files'],
      ['Ctrl+D','Bookmark this folder'],
      ['F2','Rename (several selected = batch rename)'],
      ['Ctrl+Shift+N','New folder'],
      ['Alt+↑','Parent folder']]},
    flags:[
      ['~/Templates','New Document menu'],
      ['~/.local/share/nautilus/scripts','Scripts menu (gets selected files as args)'],
      ['gio info <file>','Everything Files knows about a file']],
    example:{cmd:'gio info -a standard::content-type report.pdf', out:
`uri: file:///home/sooraj/report.pdf
local path: /home/sooraj/report.pdf
unix mount: /dev/mapper/luks-9e3f… /home btrfs rw,seclabel,relatime,compress=zstd:1,ssd,discard=async,space_cache=v2,subvolid=256,subvol=/home
attributes:
  standard::content-type: application/pdf`} },

  { title:'Notifications & Do Not Disturb', icon:'🔕', badge:'NOTIFY', color:'blue',
    cmds:[
      ['gsettings set org.gnome.desktop.notifications show-banners false','Do Not Disturb on'],
      ['gsettings set org.gnome.desktop.notifications show-banners true','…off'],
      ['gsettings set org.gnome.desktop.notifications show-in-lock-screen false','Hide notifications on the lock screen'],
      ['notify-send "Backup" "Finished in 3 min"','Send one from a script'],
      ['notify-send -u critical -i dialog-warning "Disk" "95% full"','Urgent, with an icon'],
      ['notify-send -t 5000 -a "Build" "Done"','Custom timeout + app name'],
      ['sleep 1500 && notify-send "Pomodoro" "Take a break" &','Simple timer']],
    flags:[
      ['-u low|normal|critical','Urgency (critical stays)'],
      ['-i <icon>','Icon name or path'],
      ['-t <ms>','Timeout'],
      ['-a <name>','App name'],
      ['show-banners','DND switch']],
    example:{cmd:'gsettings get org.gnome.desktop.notifications show-banners', out:`false`} },

  { title:'Remote Desktop (RDP)', icon:'🖧', badge:'REMOTE', color:'warn',
    cmds:[
      ['grdctl status','Current remote desktop settings'],
      ['grdctl rdp enable','Share YOUR session over RDP'],
      ['grdctl rdp set-credentials sooraj "S3cure-Pass"','RDP username/password (separate from login)'],
      ['grdctl rdp disable-view-only','Allow remote control, not just viewing'],
      ['sudo firewall-cmd --add-service=rdp --permanent && sudo firewall-cmd --reload','Open port 3389'],
      ['sudo dnf install freerdp && xfreerdp /v:192.168.1.42 /u:sooraj /dynamic-resolution','Connect FROM Fedora to an RDP host'],
      ['flatpak install flathub org.remmina.Remmina','GUI client for RDP/VNC/SSH'],
      ['# Settings → System → Remote Desktop has the same switches + "Remote Login"','']],
    flags:[
      ['rdp enable / disable','On / off'],
      ['set-credentials','RDP login'],
      ['disable-view-only / enable-view-only','Control vs watch'],
      ['--system','Remote Login (headless, at the login screen)'],
      ['/dynamic-resolution','xfreerdp: resize with the window']],
    example:{cmd:'grdctl status', out:
`RDP:
	Status: enabled
	Port: 3389
	TLS certificate: /home/sooraj/.local/share/gnome-remote-desktop/certificates/rdp-tls.crt
	View-only: no
	Username: (hidden)
	Password: (hidden)`},
    warn:'Only expose RDP on trusted networks or through a VPN/SSH tunnel — never directly to the internet.' },

  { title:'Other Desktops & Sessions', icon:'🧭', badge:'SESSIONS', color:'blue',
    cmds:[
      ['echo $XDG_CURRENT_DESKTOP $XDG_SESSION_TYPE','What you\'re running now'],
      ['ls /usr/share/wayland-sessions/ /usr/share/xsessions/ 2>/dev/null','Installed sessions'],
      ['sudo dnf install @kde-desktop-environment','KDE Plasma'],
      ['sudo dnf install @xfce-desktop-environment','Xfce (light)'],
      ['sudo dnf install @cinnamon-desktop-environment','Cinnamon'],
      ['sudo dnf install sway','Sway (tiling, Wayland)'],
      ['# Pick one: at the login screen click your name, then the ⚙ gear (bottom right)',''],
      ['dnf environment list','All desktop environments available']],
    flags:[
      ['@<env>-desktop-environment','Whole desktop via dnf'],
      ['XDG_CURRENT_DESKTOP','GNOME / KDE / XFCE / sway'],
      ['wayland-sessions/*.desktop','What the gear menu lists'],
      ['Fedora Spins','Install images with another desktop preinstalled']],
    example:{cmd:'ls /usr/share/wayland-sessions/', out:
`gnome.desktop
gnome-wayland.desktop
plasma.desktop
sway.desktop`},
    warn:'Two full desktops share settings folders and default apps — expect some mixing (e.g. KDE apps in GNOME\'s "Open With").' },

  { title:'Reset GNOME to Defaults', icon:'♻️', badge:'RESET', color:'red',
    cmds:[
      ['dconf dump /org/gnome/ > ~/gnome-backup.ini','ALWAYS back up first'],
      ['gsettings set org.gnome.shell disable-user-extensions true','Rule out extensions first (log out/in)'],
      ['gsettings reset org.gnome.desktop.interface color-scheme','Reset one key'],
      ['gsettings reset-recursively org.gnome.mutter','Reset one whole schema'],
      ['dconf reset -f /org/gnome/desktop/','Reset all desktop settings'],
      ['dconf reset -f /org/gnome/','Reset EVERYTHING GNOME (log out/in)'],
      ['dconf load /org/gnome/ < ~/gnome-backup.ini','Restore the backup'],
      ['mv ~/.config/gnome-session ~/.config/gnome-session.bak','Broken session state'],
      ['mv ~/.local/share/gnome-shell/extensions ~/extensions.bak','Remove all user extensions']],
    flags:[
      ['gsettings reset <schema> <key>','One key'],
      ['gsettings reset-recursively <schema>','One schema'],
      ['dconf reset -f <dir>','A whole tree'],
      ['disable-user-extensions','Kill switch for extensions']],
    example:{cmd:'gsettings get org.gnome.shell disable-user-extensions', out:`true`},
    tip:'Weird GNOME problem after an upgrade? Test with a brand-new user account — if it works there, it\'s your settings.' },

  { title:'Accessibility', icon:'♿', badge:'A11Y', color:'green',
    cmds:[
      ['gsettings set org.gnome.desktop.a11y.interface high-contrast true','High contrast'],
      ['gsettings set org.gnome.desktop.interface text-scaling-factor 1.5','Large text'],
      ['gsettings set org.gnome.desktop.a11y.applications screen-reader-enabled true','Orca screen reader (also Super+Alt+S)'],
      ['gsettings set org.gnome.desktop.a11y.applications screen-magnifier-enabled true','Zoom (also Super+Alt+8)'],
      ['gsettings set org.gnome.desktop.a11y.magnifier mag-factor 2.0','Zoom level'],
      ['gsettings set org.gnome.desktop.interface cursor-size 48','Big cursor'],
      ['gsettings set org.gnome.desktop.a11y.keyboard stickykeys-enable true','Sticky keys (one key at a time)'],
      ['gsettings set org.gnome.desktop.interface gtk-enable-animations false','Reduce motion']],
    table:{head:['Keys','Does'], rows:[
      ['Super+Alt+S','Screen reader on/off'],
      ['Super+Alt+8','Zoom on/off'],
      ['Super+Alt+= / -','Zoom in / out'],
      ['Shift ×5','Sticky keys toggle (if enabled in Settings)']]},
    flags:[
      ['org.gnome.desktop.a11y.*','Accessibility schemas'],
      ['orca --setup','Screen reader preferences'],
      ['gtk-enable-animations','Motion']],
    example:{cmd:'gsettings get org.gnome.desktop.a11y.interface high-contrast', out:`true`} }
);
})();

/* ═════════════════ MORE HARDWARE (v2.30) ═════════════════ */
(function () {
const h = window.FB_DATA.find(x => x.id === 'hardware');
h.desc = 'inspect cpu & ram, drivers, secure boot, laptops, printers, scanners, cameras, docks, monitors and gpus';
const B = '/sys/class/power_supply/BAT0';
h.cards.push(
  { title:'CPU Details & Feature Levels', icon:'🧠', badge:'CPU', color:'blue',
    cmds:[
      ['lscpu | grep -E "Model name|Socket|Core|Thread|NUMA node\\(s\\)|max MHz"','The essentials'],
      ['lscpu -e=CPU,CORE,SOCKET,MAXMHZ','Per-thread table (which threads share a core)'],
      ['lscpu -C','Cache sizes (L1 / L2 / L3)'],
      ['/lib64/ld-linux-x86-64.so.2 --help | grep supported','x86-64-v2 / v3 / v4 level'],
      ['grep -o -w -E "vmx|svm|avx2|avx512f|aes|sha_ni" /proc/cpuinfo | sort -u','Check specific CPU features'],
      ['cat /sys/devices/cpu_core/cpus /sys/devices/cpu_atom/cpus','Intel hybrid: P-core vs E-core threads'],
      ['cat /sys/devices/system/cpu/smt/active','Hyper-threading / SMT on? (1 = yes)'],
      ['grep . /sys/devices/system/cpu/vulnerabilities/*','CPU security flaws + active mitigations'],
      ['journalctl -k -b -g microcode','Microcode loaded this boot']],
    flags:[
      ['vmx / svm','Intel / AMD virtualization (needed for KVM)'],
      ['avx2 · avx512f','Vector instructions (x86-64-v3 / v4)'],
      ['aes · sha_ni','Hardware crypto acceleration'],
      ['lscpu -e=<cols>','CPU, CORE, SOCKET, NODE, MAXMHZ, ONLINE'],
      ['lscpu -J','JSON output'],
      ['"Mitigation: …"','Patched; "Vulnerable" = update firmware + kernel']],
    example:{cmd:'/lib64/ld-linux-x86-64.so.2 --help | grep supported', out:
`  x86-64-v3 (supported, searched)
  x86-64-v2 (supported, searched)`},
    tip:'Fedora still runs on any 64-bit x86 CPU; RHEL 10 and its clones need <b>x86-64-v3</b>. The check above tells you which one your CPU can run.' },

  { title:'RAM Slots, ECC & Memory Errors', icon:'🧮', badge:'RAM', color:'warn',
    cmds:[
      ['sudo dmidecode -t 16 | grep -E "Maximum Capacity|Number Of Devices|Error Correction"','Max RAM the board takes, slot count, ECC'],
      ['sudo dmidecode -t 17 | grep -E "^\\s+(Locator|Size|Speed|Manufacturer|Part Number):"','What is in each slot'],
      ['lsmem --summary','Online memory'],
      ['sudo dnf install rasdaemon && sudo systemctl enable --now rasdaemon','Record hardware errors (RAM, PCIe, CPU)'],
      ['sudo ras-mc-ctl --summary | grep -v "^$"','Error summary'],
      ['sudo ras-mc-ctl --error-count','Corrected / uncorrected errors per DIMM (ECC)'],
      ['journalctl -k -g "EDAC|Hardware Error|mce:"','Kernel-reported hardware errors'],
      ['sudo dnf install memtester && sudo memtester 2G 1','Test 2 GB of free RAM, one pass']],
    flags:[
      ['dmidecode -t 16','Memory array (board limits)'],
      ['dmidecode -t 17','Memory devices (the sticks)'],
      ['memtester <size> [loops]','e.g. 4G 3; only tests RAM that is free'],
      ['CE / UE','Corrected (warning) / Uncorrected (replace the DIMM)'],
      ['"Size: No Module Installed"','Empty slot']],
    example:{cmd:'sudo memtester 2G 1', out:
`memtester version 4.7.1 (64-bit)
Copyright (C) 2001-2024 Charles Cazabon.
Licensed under the GNU General Public License version 2 (only).

pagesize is 4096
pagesizemask is 0xfffffffffffff000
want 2048MB (2147483648 bytes)
got  2048MB (2147483648 bytes), trying mlock ...locked.
Loop 1/1:
  Stuck Address       : ok
  Random Value        : ok
  Compare XOR         : ok
  Compare SUB         : ok
  Compare MUL         : ok
  Compare DIV         : ok
  Compare OR          : ok
  Compare AND         : ok
  Sequential Increment: ok
  Solid Bits          : ok
  Block Sequential    : ok
  Checkerboard        : ok
  Bit Spread          : ok
  Bit Flip            : ok
  Walking Ones        : ok
  Walking Zeroes      : ok
  8-bit Writes        : ok
  16-bit Writes       : ok

Done.`},
    tip:'memtester can only check RAM that is free while Linux runs. For a full test, boot a <b>memtest86+</b> USB stick (memtest.org) and let it finish at least one pass.' },

  { title:'Battery Health, Charge Limit & Brightness', icon:'🔋', badge:'LAPTOP', color:'green',
    cmds:[
      [`cat ${B}/cycle_count`,'Charge cycles so far'],
      [`echo $(( 100 * $(cat ${B}/energy_full) / $(cat ${B}/energy_full_design) ))%`,'Battery health (capacity left)'],
      [`cat ${B}/charge_control_end_threshold`,'Current charge limit (if the laptop supports one)'],
      [`echo 80 | sudo tee ${B}/charge_control_end_threshold`,'Stop charging at 80% (until reboot)'],
      ['sudoedit /etc/udev/rules.d/99-charge-limit.rules','Make the limit permanent (see code)'],
      ['upower --monitor-detail','Live battery / charger events'],
      ['sudo dnf install brightnessctl',''],
      ['brightnessctl set 40%','Screen brightness'],
      ['brightnessctl set 10%-','10% dimmer'],
      ["brightnessctl -d '*::kbd_backlight' set 1",'Keyboard backlight level'],
      ['cat /sys/power/mem_sleep','Suspend mode: [s2idle] or [deep]']],
    code:
`# /etc/udev/rules.d/99-charge-limit.rules
SUBSYSTEM=="power_supply", KERNEL=="BAT0", \\
  ATTR{charge_control_end_threshold}="80"`,
    flags:[
      ['charge_control_end_threshold','Stop charging at N% (ThinkPad, ASUS, Dell, Framework…)'],
      ['charge_control_start_threshold','Start charging again below N% (ThinkPad)'],
      ['energy_full / _design','Wear (some batteries use charge_full instead)'],
      ['brightnessctl -l','List controllable devices'],
      ['set N% · N%- · +N%','Absolute · down · up']],
    example:{cmd:`cd ${B} && echo "health: $(( 100 * $(cat energy_full) / $(cat energy_full_design) ))%  cycles: $(cat cycle_count)  limit: $(cat charge_control_end_threshold)%"`, out:
`health: 91%  cycles: 214  limit: 80%`},
    tip:'GNOME 48+ has this built in on supported laptops: Settings → Power → <b>Battery Charging</b> → Preserve Battery Health.' },

  { title:'Printers from the Terminal', icon:'🖨️', badge:'PRINT', color:'blue',
    cmds:[
      ['driverless','Network printers that need no driver'],
      ['sudo lpadmin -p Office -E -v ipp://192.168.1.40/ipp/print -m everywhere','Add a driverless printer'],
      ['lpoptions -d Office','Make it your default'],
      ['lpstat -p -d','Printers + current default'],
      ['lpoptions -p Office -l','Options this printer supports'],
      ['lp -d Office -o sides=two-sided-long-edge report.pdf','Print double-sided'],
      ['lp -n 2 -o page-ranges=1-3,7 -o print-color-mode=monochrome notes.pdf','2 copies, some pages, B&W'],
      ['lp -o media=A4 -o fit-to-page photo.jpg','Fit an image on A4'],
      ['lpstat -o','Jobs waiting'],
      ['cancel Office-42','Cancel one job'],
      ['sudo lpadmin -x Office','Remove the printer']],
    flags:[
      ['lpadmin -p <name> -E','Create printer + enable it'],
      ['-v ipp://host/ipp/print','Printer address'],
      ['-m everywhere','IPP Everywhere (no driver)'],
      ['lp -n N','Copies'],
      ['-o sides=…','two-sided-long-edge · two-sided-short-edge · one-sided'],
      ['-o number-up=2','2 pages per sheet'],
      ['-o print-color-mode=monochrome','Black & white']],
    example:{cmd:'lp -d Office -o sides=two-sided-long-edge report.pdf', out:
`request id is Office-42 (1 file(s))`},
    tip:'Most printers made in the last ten years speak IPP Everywhere / AirPrint, so <code>-m everywhere</code> works without any vendor driver. Printer broken? See Troubleshoot → Printer Problems.' },

  { title:'Scanners (SANE)', icon:'📠', badge:'SCAN', color:'blue',
    cmds:[
      ['sudo dnf install sane-backends sane-airscan simple-scan','Drivers + driverless network scanning'],
      ['scanimage -L','List scanners'],
      ['sudo sane-find-scanner','Find USB scanners (even without a driver)'],
      ["scanimage -d 'airscan:e0:HP OfficeJet Pro 9010' -A",'Options this scanner offers'],
      ['scanimage --format=png --resolution 300 --mode Color -o scan.png','Scan one page'],
      ['scanimage --source ADF --batch=page%02d.png --format=png --resolution 200','Whole stack from the document feeder'],
      ['magick page*.png scans.pdf','Combine pages into one PDF'],
      ['sudo dnf install hplip && hp-setup -i','HP all-in-ones over USB']],
    flags:[
      ['-L','List devices'],
      ['-d <device>','Pick a scanner'],
      ['-A','Supported options'],
      ['--resolution 150|300|600','DPI (300 for documents)'],
      ['--mode Color|Gray|Lineart','Colour mode (names vary)'],
      ['--source Flatbed|ADF','Glass or feeder (names vary)'],
      ['--batch=FMT','Many pages, one file each']],
    example:{cmd:'scanimage -L', out:
`device \`airscan:e0:HP OfficeJet Pro 9010' is a eSCL HP OfficeJet Pro 9010 ip=192.168.1.40`},
    tip:'Network scanner not found? Add it to <code>/etc/sane.d/airscan.conf</code> under <code>[devices]</code>: <code>"Office" = http://192.168.1.40/eSCL, eSCL</code>' },

  { title:'Webcams & Video Devices', icon:'📷', badge:'CAMERA', color:'green',
    cmds:[
      ['sudo dnf install v4l-utils',''],
      ['v4l2-ctl --list-devices','Cameras and their /dev/video nodes'],
      ['v4l2-ctl -d /dev/video0 --list-formats-ext','Resolutions + frame rates'],
      ['v4l2-ctl -d /dev/video0 --list-ctrls','Brightness, focus, exposure…'],
      ['v4l2-ctl -d /dev/video0 -c focus_automatic_continuous=0 -c focus_absolute=30','Manual focus'],
      ['ffplay -f v4l2 -video_size 1280x720 /dev/video0','Quick preview'],
      ['ffmpeg -f v4l2 -video_size 1280x720 -i /dev/video0 -frames:v 1 snap.jpg','Take a photo'],
      ['sudo fuser -v /dev/video*','Which app is holding the camera?'],
      ['sudo dnf install libcamera-tools && cam -l','Newer laptop cameras (MIPI / Intel IPU6)'],
      ['sudo modprobe -r uvcvideo && sudo modprobe uvcvideo','Reset a stuck USB webcam']],
    flags:[
      ['--list-devices','All video devices'],
      ['-d /dev/videoN','Device (the first node of a camera is the picture)'],
      ['--list-formats-ext','Formats, sizes, fps'],
      ['-l / -c ctrl=value','List / set controls'],
      ['MJPG vs YUYV','MJPG = HD at 30 fps; YUYV = raw, often low fps']],
    example:{cmd:'v4l2-ctl --list-devices', out:
`Integrated Camera: Integrated C (usb-0000:00:14.0-8):
	/dev/video0
	/dev/video1
	/dev/media0

Logitech BRIO (usb-0000:00:14.0-2):
	/dev/video2
	/dev/video3
	/dev/media1`},
    tip:'A camera that shows in <code>cam -l</code> but not in v4l2-ctl is a libcamera (MIPI) camera. Apps such as Snapshot and browsers reach it through PipeWire.' },

  { title:'Input Devices & Key Remapping', icon:'🕹️', badge:'INPUT', color:'blue',
    cmds:[
      ['sudo dnf install libinput-utils evtest',''],
      ['sudo libinput list-devices','Every input device + its settings'],
      ['sudo libinput debug-events','Live events (keys, taps, gestures)'],
      ['sudo evtest /dev/input/event3','Raw key codes + scan codes'],
      ['grep -E "^N:|^H:" /proc/bus/input/devices','Device names → /dev/input/eventN'],
      ['sudoedit /etc/udev/hwdb.d/90-remap.hwdb','Remap a key at the lowest level (see code)'],
      ['sudo systemd-hwdb update && sudo udevadm trigger','Apply the remap'],
      ['sudo dnf install solaar','Logitech receivers: pair, battery, buttons'],
      ['sudo libinput measure touchpad-pressure','Tune a touchpad that misses taps']],
    code:
`# /etc/udev/hwdb.d/90-remap.hwdb
# Caps Lock → Ctrl on the built-in laptop keyboard
evdev:atkbd:*
 KEYBOARD_KEY_3a=leftctrl`,
    flags:[
      ['evdev:atkbd:*','Match the built-in keyboard'],
      ['evdev:input:b0003v046Dp*','Match USB keyboards by vendor (046D = Logitech)'],
      ['KEYBOARD_KEY_<scan>=<key>','Scan code from evtest (MSC_SCAN value)'],
      ['debug-events --show-keycodes','Show real key names (hidden by default)']],
    example:{cmd:'sudo evtest /dev/input/event3 | grep -m3 -E "MSC_SCAN|EV_KEY|SYN"', out:
`Event: time 1790745612.401233, type 4 (EV_MSC), code 4 (MSC_SCAN), value 3a
Event: time 1790745612.401233, type 1 (EV_KEY), code 58 (KEY_CAPSLOCK), value 1
Event: time 1790745612.401233, -------------- SYN_REPORT ------------`},
    tip:'hwdb remaps work everywhere (GNOME, KDE, the login screen, even the text console) because they happen in the kernel, before any desktop sees the key.' },

  { title:'Hybrid Graphics (iGPU + dGPU)', icon:'🔀', badge:'PRIME', color:'warn',
    cmds:[
      ['switcherooctl list','GPUs + the settings that select them'],
      ['switcherooctl launch blender','Run on the discrete GPU'],
      ['switcherooctl launch -g 0 firefox','Force a GPU by its index'],
      ['DRI_PRIME=1 glxinfo -B | grep "OpenGL renderer"','AMD / Intel dGPU: test offload'],
      ['__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia glxinfo -B | grep "OpenGL renderer"','NVIDIA dGPU: test offload'],
      ['lspci -D | grep -Ei "vga|3d|display"','Find the dGPU PCI address'],
      ['cat /sys/bus/pci/devices/0000:01:00.0/power/runtime_status','Is the dGPU asleep? (suspended = saving power)'],
      ['# GNOME: right-click an app → "Launch using Discrete Graphics Card"','']],
    flags:[
      ['DRI_PRIME=1','Mesa (AMD / Intel) offload'],
      ['__NV_PRIME_RENDER_OFFLOAD=1','NVIDIA offload'],
      ['__GLX_VENDOR_LIBRARY_NAME=nvidia','Use NVIDIA OpenGL'],
      ['PrefersNonDefaultGPU=true','In a .desktop file: always use the dGPU'],
      ['suspended / active','dGPU off / on']],
    example:{cmd:'switcherooctl list', out:
`Device: 0
  Name:        Intel Corporation Raptor Lake-P [Iris Xe Graphics]
  Default:     yes
  Environment: DRI_PRIME=pci-0000_00_02_0

Device: 1
  Name:        NVIDIA Corporation AD107M [GeForce RTX 4060 Max-Q / Mobile]
  Default:     no
  Environment: __GLX_VENDOR_LIBRARY_NAME=nvidia __NV_PRIME_RENDER_OFFLOAD=1 __VK_LAYER_NV_optimus=NVIDIA_only`},
    tip:'Keep the desktop on the integrated GPU and offload only games and 3D apps. The dGPU then sleeps the rest of the time, which saves a lot of battery.' },

  { title:'GPU Compute: ROCm & OpenCL', icon:'🧪', badge:'COMPUTE', color:'green',
    cmds:[
      ['sudo dnf install rocminfo rocm-smi rocm-opencl rocm-hip clinfo','AMD ROCm stack (Fedora repos)'],
      ['sudo usermod -aG render,video $USER','Allow GPU compute access (log out and in)'],
      ['rocminfo | grep -E "Marketing Name|gfx"','GPU seen by ROCm + its gfx target'],
      ['rocm-smi','Temperature, power, clocks, VRAM use'],
      ['clinfo -l','OpenCL platforms + devices'],
      ['HSA_OVERRIDE_GFX_VERSION=11.0.0 python3 train.py','Use a GPU ROCm does not officially list'],
      ['sudo dnf install intel-compute-runtime','Intel GPUs: OpenCL + Level Zero']],
    flagsHead:['Target / variable','Meaning'],
    flags:[
      ['gfx1030','RX 6800 / 6900 (RDNA2)'],
      ['gfx1100','RX 7900 XT / XTX (RDNA3)'],
      ['gfx1103','Radeon 780M iGPU → override 11.0.0'],
      ['gfx1201','RX 9070 series (RDNA4)'],
      ['HSA_OVERRIDE_GFX_VERSION','Pretend to be a supported target'],
      ['render group','Access to /dev/kfd + /dev/dri/renderD*']],
    example:{cmd:'rocminfo | grep -E "Marketing Name|gfx"', out:
`  Marketing Name:          Intel(R) Core(TM) i7-14700K
  Name:                    gfx1100
  Marketing Name:          AMD Radeon RX 7900 XTX
      Name:                    amdgcn-amd-amdhsa--gfx1100`},
    tip:'Fedora ships ROCm in its main repos, so there is no AMD installer or extra repo to add. NVIDIA compute (CUDA) comes with the driver; see the NVIDIA Drivers card.' },

  { title:'Thunderbolt, USB-C & Docks', icon:'🔗', badge:'DOCK', color:'blue',
    cmds:[
      ['boltctl list','Thunderbolt / USB4 devices + authorization'],
      ['boltctl domains','Controller security level'],
      ['boltctl enroll --policy auto <uuid>','Trust a dock permanently'],
      ['boltctl forget <uuid>','Stop trusting a device'],
      ['boltctl monitor','Watch plug / authorize events'],
      ['ls /sys/class/typec/','USB-C ports'],
      ['cat /sys/class/typec/port0/power_role /sys/class/typec/port0/data_role','Charging direction · host or device'],
      ['journalctl -k -b -g "thunderbolt|usb4|typec"','Dock errors this boot'],
      ['sudoedit /etc/udev/rules.d/50-usb-no-autosuspend.rules','Stop a USB device dropping out (see code)']],
    code:
`# /etc/udev/rules.d/50-usb-no-autosuspend.rules
# Keep a flaky USB device (here a Logitech receiver) powered
ACTION=="add", SUBSYSTEM=="usb", \\
  ATTR{idVendor}=="046d", ATTR{idProduct}=="c52b", \\
  TEST=="power/control", ATTR{power/control}="on"`,
    flags:[
      ['--policy auto','Authorize on every connect'],
      ['--policy manual','Ask each time'],
      ['security: user','Needs authorizing (normal)'],
      ['iommu+user','DMA-protected + needs authorizing'],
      ['power/control on | auto','Never / allow USB autosuspend'],
      ['[sink] / [host]','Current role (in brackets)']],
    example:{cmd:'boltctl list', out:
` ● Dell WD19TB Thunderbolt Dock
   ├─ type:          peripheral
   ├─ name:          WD19TB Thunderbolt Dock
   ├─ vendor:        Dell
   ├─ uuid:          d8038a53-7c5b-d400-ffff-ffffffffffff
   ├─ generation:    Thunderbolt 3
   ├─ status:        authorized
   │  ├─ domain:     c7030000-0090-8418-a3a5-a91e0c01f921
   │  ├─ rx speed:   40 Gb/s = 2 lanes * 20 Gb/s
   │  ├─ tx speed:   40 Gb/s = 2 lanes * 20 Gb/s
   │  └─ authflags:  none
   ├─ authorized:    Wed 30 Sep 2026 07:02:11 UTC
   ├─ connected:     Wed 30 Sep 2026 07:02:10 UTC
   └─ stored:        Mon 14 Sep 2026 09:15:44 UTC
      ├─ policy:     auto
      └─ key:        no`},
    tip:'GNOME asks before a new Thunderbolt device may connect. Enrolling with <code>--policy auto</code> is the same as ticking "always allow".' },

  { title:'External Monitor Control (DDC/CI)', icon:'🖥️', badge:'DDC', color:'green',
    cmds:[
      ['sudo dnf install ddcutil',''],
      ['sudo modprobe i2c-dev','Needed for DDC (now)'],
      ['echo i2c-dev | sudo tee /etc/modules-load.d/i2c-dev.conf','…and at every boot'],
      ['ddcutil detect','Monitors that support DDC/CI'],
      ['ddcutil getvcp 10','Brightness'],
      ['ddcutil setvcp 10 70','Set brightness to 70'],
      ['ddcutil --display 2 setvcp 10 - 20','Monitor 2: 20 steps darker'],
      ['ddcutil setvcp 12 60','Contrast'],
      ['ddcutil capabilities | grep -A8 "Feature: 60"','Inputs this monitor has'],
      ['ddcutil setvcp 60 0x11','Switch input to HDMI-1'],
      ['ddcutil setvcp d6 0x04','Standby (if the monitor supports it)']],
    flagsHead:['Code / option','Meaning'],
    flags:[
      ['10','Brightness'],
      ['12','Contrast'],
      ['60','Input: 0x0f DP-1 · 0x11 HDMI-1 · 0x12 HDMI-2'],
      ['62','Speaker volume'],
      ['d6','Power mode'],
      ['--display N / --bus N','Pick a monitor'],
      ['--noverify','Faster setvcp (skip the read-back)']],
    example:{cmd:'ddcutil getvcp 10', out:
`VCP code 0x10 (Brightness                    ): current value =    70, max value =   100`},
    tip:'Want a slider? The GNOME extension <b>Brightness control using ddcutil</b> adds one to the quick settings menu. If you get permission errors, run ddcutil with sudo.' }
);
})();

/* ═════════════════ MORE HARDWARE II (v2.31) ═════════════════ */
(function () {
const h = window.FB_DATA.find(x => x.id === 'hardware');
h.desc = 'cpu & ram, drivers, pcie, fans, rgb, laptops, printers, scanners, cameras, controllers, serial & gpio, docks, monitors and gpus';
const P = '/sys/bus/pci/devices/0000:03:00.0';
h.cards.push(
  { title:'Identify Unknown Devices & Find the Driver', icon:'❓', badge:'IDS', color:'blue',
    cmds:[
      ['lspci -nnk','Every PCI device with [vendor:device] IDs + driver'],
      ['for d in /sys/bus/pci/devices/*; do [ -e "$d/driver" ] || lspci -nns "${d##*/}"; done','PCI devices with NO driver bound'],
      [`cat ${P}/modalias`,'The ID string the kernel matches drivers against'],
      [`modprobe -R $(cat ${P}/modalias)`,'Which module would drive it'],
      [`readlink ${P}/driver`,'Driver currently bound'],
      ['lsusb','USB devices with vendor:product IDs'],
      ['lsusb -v -d 0bda:8153 | grep -E "idVendor|idProduct|iProduct|bInterfaceClass"','One USB device in detail'],
      ['journalctl -k -b -g "0000:03:00.0"','Kernel messages about that device']],
    flags:[
      ['[8086:a7a0]','vendor:device (8086 Intel · 10de NVIDIA · 1002 AMD · 10ec Realtek · 14e4 Broadcom)'],
      ['lspci -s <slot>','Only this device'],
      ['lspci -k','Driver in use + drivers that could be used'],
      ['modprobe -R <alias>','Resolve alias → module name'],
      ['lsusb -d vid:pid','Filter by USB ID']],
    example:{cmd:`lspci -nnk -s 03:00.0; modprobe -R $(cat ${P}/modalias)`, out:
`03:00.0 Ethernet controller [0200]: Realtek Semiconductor Co., Ltd. RTL8125 2.5GbE Controller [10ec:8125] (rev 05)
	Subsystem: Micro-Star International Co., Ltd. [MSI] Device [1462:7d78]
	Kernel modules: r8169
r8169`},
    tip:'No "Kernel driver in use" line means nothing claimed the device. Search its [vendor:device] ID at <b>linux-hardware.org</b> to see which driver other people use for it.' },

  { title:'PCIe Links, Resizable BAR & IOMMU Groups', icon:'🛤️', badge:'PCIE', color:'warn',
    cmds:[
      ['lspci -tv','PCI tree (what hangs off which bridge)'],
      ['sudo lspci -vv -s 01:00.0 | grep -E "LnkCap:|LnkSta:"','Link speed/width: possible vs actual'],
      ['cat /sys/bus/pci/devices/0000:01:00.0/{current,max}_link_{speed,width}','Same, from sysfs'],
      ['sudo lspci -vv -s 01:00.0 | grep -A1 "Resizable BAR"','Is Resizable BAR (ReBAR / SAM) active?'],
      ['journalctl -k -b -g "DMAR|AMD-Vi|IOMMU"','Is the IOMMU on?'],
      ['for g in /sys/kernel/iommu_groups/*; do echo "Group ${g##*/}:"; for d in "$g"/devices/*; do echo "  $(lspci -nns "${d##*/}")"; done; done','List IOMMU groups (GPU passthrough planning)'],
      ['sudo grubby --update-kernel=ALL --args="intel_iommu=on iommu=pt"','Turn the IOMMU on (Intel, if the groups list is empty)']],
    flags:[
      ['2.5 · 5 · 8 · 16 · 32 GT/s','PCIe gen 1 · 2 · 3 · 4 · 5'],
      ['(downgraded)','Running below the maximum'],
      ['Width x16 / x8 / x4','Lanes in use'],
      ['iommu=pt','Passthrough mode, less overhead for host devices'],
      ['Own IOMMU group','Needed to pass a device to a VM on its own']],
    example:{cmd:'sudo lspci -vv -s 01:00.0 | grep -E "LnkCap:|LnkSta:|current size"', out:
`		LnkCap:	Port #0, Speed 16GT/s, Width x16, ASPM L1, Exit Latency L1 <64us
		LnkSta:	Speed 2.5GT/s (downgraded), Width x16
		BAR 0: current size: 16GB, supported: 256MB 512MB 1GB 2GB 4GB 8GB 16GB`},
    tip:'A graphics card showing 2.5GT/s (downgraded) while idle is normal power saving. Check again while a game runs: it should reach full speed. A width of x4 or x8 on a x16 card usually means it is in the wrong slot.' },

  { title:'Fan Control & Extra Sensors', icon:'🌀', badge:'FANS', color:'blue',
    cmds:[
      ['sudo sensors-detect --auto','Find sensor chips + the modules they need'],
      ['grep . /sys/class/hwmon/hwmon*/name','Sensor drivers loaded'],
      ['sudo modprobe drivetemp','SATA drive temperatures in sensors'],
      ['echo drivetemp | sudo tee /etc/modules-load.d/drivetemp.conf','…at every boot'],
      ['sensors -j','JSON (for scripts)'],
      ['sudo pwmconfig','Test each fan and write /etc/fancontrol'],
      ['sudo systemctl enable --now fancontrol','Apply the fan curve at boot'],
      ['echo "options thinkpad_acpi fan_control=1" | sudo tee /etc/modprobe.d/thinkpad_acpi.conf','ThinkPad: allow manual fan control (reboot)'],
      ['echo level 3 | sudo tee /proc/acpi/ibm/fan','ThinkPad: fixed fan level (0–7)'],
      ['echo level auto | sudo tee /proc/acpi/ibm/fan','ThinkPad: back to automatic']],
    flags:[
      ['sensors -u','Raw values + limits'],
      ['sensors -f','Fahrenheit'],
      ['nct6775 / it87','Common desktop board sensor chips'],
      ['k10temp / coretemp','AMD / Intel CPU temperature'],
      ['level disengaged','ThinkPad: fan flat out (careful)']],
    example:{cmd:'cat /proc/acpi/ibm/fan', out:
`status:		enabled
speed:		2310
level:		auto
commands:	level <level> (<level> is 0-7, auto, disengaged, full-speed)
commands:	enable, disable
commands:	watchdog <timeout> (<timeout> is 0 (off), 1-120 (seconds))`},
    warn:'A fixed low fan level does not rise when the CPU heats up. Switch back to <code>level auto</code> when you are done testing.' },

  { title:'RGB Lighting & AIO Coolers', icon:'🌈', badge:'RGB', color:'green',
    cmds:[
      ['sudo dnf install openrgb openrgb-udev-rules','OpenRGB + device permissions'],
      ['sudo modprobe i2c-dev','Needed for RAM + motherboard RGB'],
      ['openrgb --list-devices','Everything OpenRGB can control'],
      ['openrgb --device 0 --mode static --color FF0000','One device red'],
      ['openrgb --color 000000','All lights off'],
      ['openrgb --profile Night.orp','Load a profile saved in the GUI'],
      ['sudo dnf install liquidctl',''],
      ['liquidctl list','AIO coolers, fan hubs, PSUs'],
      ['sudo liquidctl initialize all','Required once after every boot'],
      ['liquidctl status','Liquid temp, pump + fan speeds'],
      ['sudo liquidctl --match kraken set pump speed 70','Fixed pump duty 70%'],
      ['sudo liquidctl --match kraken set pump speed 20 50 30 60 40 80 50 100','Curve: liquid °C → duty %']],
    flags:[
      ['-l / --list-devices','List'],
      ['-d / --device N','Pick device'],
      ['-m / --mode','static, breathing, rainbow… (per device)'],
      ['-c / --color RRGGBB','Colour'],
      ['--match <text>','liquidctl: pick device by name'],
      ['set <channel> speed','Fixed % or temp/duty pairs']],
    example:{cmd:'liquidctl status', out:
`NZXT Kraken X (X53, X63 or X73)
├── Liquid temperature    31.4  °C
├── Pump speed            2280  rpm
└── Pump duty               70  %`},
    tip:'Put <code>liquidctl initialize all</code> and your settings in a small systemd service so the cooler is set up at every boot.' },

  { title:'Serial Ports & USB-Serial Adapters', icon:'🔌', badge:'SERIAL', color:'blue',
    cmds:[
      ['journalctl -k -b -g "ttyUSB|ttyACM"','Which port the adapter got'],
      ['ls -l /dev/serial/by-id/','Stable names (same after replugging)'],
      ['sudo usermod -aG dialout $USER','Use serial ports without sudo (log out and in)'],
      ['sudo dnf install picocom minicom',''],
      ['picocom -b 115200 /dev/ttyUSB0','Open a console (quit: Ctrl-A Ctrl-X)'],
      ['picocom -b 115200 --imap lfcrlf -g session.log /dev/ttyUSB0','Fix line endings + log to a file'],
      ['minicom -D /dev/ttyUSB0 -b 9600','minicom (quit: Ctrl-A X)'],
      ['stty -F /dev/ttyACM0 9600 raw -echo && cat /dev/ttyACM0','Just read what an Arduino prints'],
      ['python3 -m serial.tools.miniterm /dev/ttyUSB0 115200','Python pyserial terminal'],
      ['sudo systemctl stop ModemManager','If ModemManager keeps grabbing the port']],
    flags:[
      ['ttyUSB*','USB-serial chips (FTDI, CH340, CP210x)'],
      ['ttyACM*','USB CDC devices (Arduino, many boards)'],
      ['-b / --baud','9600 · 115200 · 1500000…'],
      ['--imap lfcrlf','Show each LF as CR+LF'],
      ['-g <file>','Log the session'],
      ['ENV{ID_MM_DEVICE_IGNORE}="1"','udev: keep ModemManager off a device']],
    example:{cmd:'picocom -b 115200 /dev/ttyUSB0', out:
`picocom v3.1

port is        : /dev/ttyUSB0
flowcontrol    : none
baudrate is    : 115200
parity is      : none
databits are   : 8
stopbits are   : 1
escape is      : C-a
local echo is  : no
...
Type [C-a] [C-h] to see available commands
Terminal ready

U-Boot 2024.10 (Oct 07 2024 - 00:00:00 +0000)
Hit any key to stop autoboot:  0`},
    tip:'Garbage characters almost always mean the wrong baud rate. Try 115200 first, then 9600.' },

  { title:'GPIO, I²C & SPI (Raspberry Pi & Boards)', icon:'📟', badge:'GPIO', color:'green',
    cmds:[
      ['sudo dnf install libgpiod-utils i2c-tools',''],
      ['gpiodetect','GPIO chips'],
      ['gpioinfo -c gpiochip0','Every line: name, direction, who uses it'],
      ['gpioset GPIO17=1','Set a pin high (held until Ctrl-C)'],
      ['gpioset -t500ms GPIO17=1','Blink it'],
      ['gpioset --daemonize GPIO17=1','Set it and return to the prompt'],
      ['gpioget GPIO27','Read a pin'],
      ['gpiomon --edges=rising --num-events=3 GPIO22','Wait for button presses'],
      ['i2cdetect -l','I²C buses'],
      ['sudo i2cdetect -y 1','Scan bus 1 for devices'],
      ['sudo i2cget -y 1 0x48 0x00 w','Read a 16-bit register (e.g. a temp sensor)'],
      ['ls /dev/spidev*','SPI devices (enable in the board\'s device tree)']],
    flags:[
      ['-c <chip>','Chip by name or number'],
      ['GPIO17 / 17','By line name, or by offset with -c'],
      ['-t <on>,<off>','Toggle timing'],
      ['--edges rising|falling|both','gpiomon: which changes'],
      ['--numeric','gpioget: print 0/1'],
      ['i2cdetect -y','No "are you sure" prompt']],
    example:{cmd:'sudo i2cdetect -y 1', out:
`     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:                         -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- 3c -- -- --
40: -- -- -- -- -- -- -- -- 48 -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- 76 --                         `},
    tip:'Fedora uses libgpiod v2. The old <code>/sys/class/gpio</code> interface is gone, and v1 guides that write <code>gpioset gpiochip0 17=1</code> need <code>-c</code> now.' },

  { title:'Smart Cards & Security Keys', icon:'🪪', badge:'TOKENS', color:'red',
    cmds:[
      ['sudo dnf install pcsc-lite pcsc-tools opensc yubikey-manager fido2-tools',''],
      ['sudo systemctl enable --now pcscd.socket','Smart-card service'],
      ['pcsc_scan','Readers + inserted cards (Ctrl-C to stop)'],
      ['opensc-tool --list-readers','Card readers'],
      ['pkcs11-tool --list-slots','Tokens available to apps (PKCS#11)'],
      ['fido2-token -L','FIDO2 security keys'],
      ['ykman info','YubiKey model, firmware, enabled apps'],
      ['ykman fido access change-pin','Set / change the FIDO2 PIN'],
      ['ykman config usb --disable OTP','Stop the YubiKey typing codes when touched'],
      ['ykman piv info','PIV (smart-card) slot status']],
    flags:[
      ['pcscd.socket','Starts pcscd only when needed'],
      ['fido2-token -I <dev>','Details of one key'],
      ['ykman fido credentials list','Passkeys stored on the key'],
      ['ykman list','All connected YubiKeys'],
      ['--disable OTP','The "cccjgjg…" typing feature']],
    example:{cmd:'ykman info', out:
`Device type: YubiKey 5 NFC
Serial number: 21234567
Firmware version: 5.7.1
Form factor: Keychain (USB-A)
Enabled USB interfaces: OTP, FIDO, CCID
NFC transport is enabled.

Applications\tUSB    \tNFC
OTP         \tEnabled\tEnabled
FIDO U2F    \tEnabled\tEnabled
OpenPGP     \tEnabled\tEnabled
PIV         \tEnabled\tEnabled
OATH        \tEnabled\tEnabled
YubiHSM Auth\tEnabled\tEnabled
FIDO2       \tEnabled\tEnabled`},
    tip:'For SSH with a key, see SSH → Keys: FIDO2. For logging in to Fedora with one, see Security → Logins.' },

  { title:'Wake Timers & Wakeup Sources', icon:'⏰', badge:'WAKE', color:'warn',
    cmds:[
      ['sudo rtcwake -m mem -s 600','Suspend now, wake in 10 minutes'],
      ["sudo rtcwake -m no -t $(date -d 'tomorrow 07:00' +%s)",'Set an alarm only…'],
      ['sudo systemctl poweroff','…then power off: the PC turns on at 7:00 (if the firmware allows)'],
      ['sudo rtcwake -m show','Current alarm'],
      ['sudo rtcwake -m disable','Clear the alarm'],
      ['sudo hwclock --show','Hardware clock'],
      ['cat /proc/acpi/wakeup','Devices allowed to wake the machine'],
      ['echo XHC0 | sudo tee /proc/acpi/wakeup','Toggle one (until reboot)'],
      ['grep . /sys/bus/usb/devices/*/power/wakeup','USB devices that can wake it'],
      ['cat /sys/power/pm_wakeup_irq','Which interrupt woke it last'],
      ['journalctl -b -k -g "PM: suspend"','Suspend / resume history this boot']],
    code:
`# /etc/udev/rules.d/90-mouse-no-wake.rules
# Moving the mouse should not wake the laptop
ACTION=="add", SUBSYSTEM=="usb", \\
  ATTR{idVendor}=="046d", ATTR{idProduct}=="c52b", \\
  ATTR{power/wakeup}="disabled"`,
    flags:[
      ['-m mem | freeze | disk | off | no','Sleep state (no = only set the alarm)'],
      ['-s <sec>','Wake after N seconds'],
      ['-t <epoch>','Wake at a time'],
      ['-n','Dry run'],
      ['*enabled / *disabled','/proc/acpi/wakeup state']],
    example:{cmd:'sudo rtcwake -m mem -s 600', out:
`rtcwake: assuming RTC uses UTC ...
rtcwake: wakeup from "mem" using /dev/rtc0 at Wed Sep 30 07:46:12 2026`},
    tip:'Laptop waking up in your bag? Look at <code>/proc/acpi/wakeup</code> and disable the lid or USB entries that you do not need.' },

  { title:'Game Controllers', icon:'🎮', badge:'GAMEPAD', color:'green',
    cmds:[
      ['sudo dnf install steam-devices','udev rules for Steam Controller, Index + many gamepads'],
      ['ls /dev/input/by-id/ | grep -i joystick','Is the controller detected?'],
      ['sudo dnf install linuxconsoletools',''],
      ['jstest /dev/input/js0','Live axes + buttons'],
      ['sudo evtest','Raw events (pick the controller)'],
      ['cat /sys/class/power_supply/ps-controller-battery-*/capacity','DualSense / DualShock battery %'],
      ['bluetoothctl','Pair over Bluetooth: scan on → pair → trust → connect'],
      ['journalctl -k -b -g "xpad|playstation|nintendo|microsoft"','Driver messages']],
    flags:[
      ['xpad','Xbox pads over USB'],
      ['hid-microsoft','Xbox pads over Bluetooth'],
      ['hid-playstation','DualShock 4 / DualSense'],
      ['hid-nintendo','Switch Pro / Joy-Con'],
      ['jstest --event','Print events instead of a live line']],
    example:{cmd:'jstest /dev/input/js0', out:
`Driver version is 2.1.0.
Joystick (Sony Interactive Entertainment DualSense Wireless Controller) has 8 axes (X, Y, Z, Rx, Ry, Rz, Hat0X, Hat0Y)
and 13 buttons (BtnA, BtnB, BtnX, BtnY, BtnTL, BtnTR, BtnTL2, BtnTR2, BtnSelect, BtnStart, BtnMode, BtnThumbL, BtnThumbR).
Testing ... (interrupt to exit)
Axes:  0:     0  1:     0  2:-32767  3:     0  4:     0  5:-32767  6:     0  7:     0 Buttons:  0:off  1:off  2:off  3:off`},
    tip:'In Steam, turn on <b>Settings → Controller → Steam Input</b> for PlayStation / Switch pads so every game sees them as a standard controller.' },

  { title:'Screen Rotation, Tablets & Sensors', icon:'🔄', badge:'2-IN-1', color:'blue',
    cmds:[
      ['monitor-sensor','Accelerometer, light sensor, proximity (iio-sensor-proxy)'],
      ['gsettings set org.gnome.settings-daemon.peripherals.touchscreen orientation-lock true','Lock screen rotation'],
      ['gsettings set org.gnome.settings-daemon.plugins.power ambient-enabled false','Turn off automatic brightness'],
      ['ls /sys/bus/iio/devices/','Raw sensor devices'],
      ['sudo libinput list-devices | grep -B1 -A3 -iE "touch|pen|stylus"','Touchscreen + pen'],
      ['libwacom-list-local-devices','Drawing tablets libwacom knows'],
      ["gsettings set org.gnome.desktop.peripherals.tablet:/org/gnome/desktop/peripherals/tablets/056a:0374/ left-handed true",'Wacom tablet: left-handed (use your tablet\'s ID)'],
      ['systemctl status iio-sensor-proxy','Is the sensor service running?']],
    flags:[
      ['orientation-lock','Stop auto-rotation'],
      ['ambient-enabled','Auto brightness from light sensor'],
      ['tablets/<vid>:<pid>/','Per-tablet settings path (lowercase IDs from lsusb)'],
      ['left-handed · mapping','Flip tablet · absolute or relative']],
    example:{cmd:'monitor-sensor', out:
`    Waiting for iio-sensor-proxy to appear
+++ iio-sensor-proxy appeared
=== Has accelerometer (orientation: normal)
=== Has ambient light sensor (value: 245.000000, unit: lux)
=== No proximity sensor
=== No compass
    Accelerometer orientation changed: left-up
    Light changed: 180.000000 (lux)`},
    tip:'On many 2-in-1s GNOME only auto-rotates in tablet mode, so fold the screen back before testing rotation.' },

  { title:'Monitor EDID & Connectors', icon:'📺', badge:'EDID', color:'warn',
    cmds:[
      ['for c in /sys/class/drm/card*-*; do echo "${c##*/}: $(cat $c/status)"; done','Every video output + connected or not'],
      ['cat /sys/class/drm/card1-DP-1/modes','Modes the monitor offers'],
      ['sudo dnf install edid-decode drm_info',''],
      ['edid-decode /sys/class/drm/card1-DP-1/edid','Decode what the monitor reports about itself'],
      ['drm_info | less','Everything the GPU driver knows (planes, modes, props)'],
      ['sudo grubby --update-kernel=ALL --args="video=HDMI-A-1:1920x1080@60"','Force a mode from boot'],
      ['sudo cp my.bin /usr/lib/firmware/edid/','Use a fixed EDID for a broken monitor/KVM…'],
      ['sudo grubby --update-kernel=ALL --args="drm.edid_firmware=HDMI-A-1:edid/my.bin"','…and tell the kernel to load it']],
    flags:[
      ['card1-DP-1 · card1-HDMI-A-1 · card1-eDP-1','DisplayPort · HDMI · built-in panel'],
      ['connected / disconnected','status file'],
      ['video=<conn>:<WxH>@<Hz>','Kernel mode override'],
      ['video=<conn>:d','Disable an output'],
      ['drm.edid_firmware=','Override EDID (add the file to the initramfs too)']],
    example:{cmd:'edid-decode /sys/class/drm/card1-DP-1/edid | grep -E "Manufacturer|Display Product Name|Made in|Maximum image size|DTD 1"', out:
`    Manufacturer: DEL
    Made in: week 12 of 2024
    Maximum image size: 60 cm x 34 cm
    DTD 1:  3840x2160   59.996625 Hz  16:9    133.312 kHz    533.250000 MHz (597 mm x 336 mm)
    Display Product Name: 'DELL U2723QE'`},
    tip:'KVM switches and cheap adapters often pass on a wrong or empty EDID, which causes low resolution or a black screen. The fixed-EDID trick solves that.' }
);
})();

/* ═════════════════ MORE MULTIMEDIA (v2.32) ═════════════════ */
(function () {
const m = window.FB_DATA.find(x => x.id === 'media');
m.desc = 'codecs, players, downloads, ffmpeg editing, subtitles, gpu encoding, audio, tags, photos, pdfs, pipewire, streaming and discs';
m.cards.push(
  { title:'Players: mpv & Media Info', icon:'▶️', badge:'PLAY', color:'green',
    cmds:[
      ['sudo dnf install mpv mediainfo playerctl',''],
      ['mpv --hwdec=auto movie.mkv','Play with GPU decoding'],
      ['mpv --start=1:30 --speed=1.5 lecture.mp4','Start at 1:30, 1.5× speed'],
      ['mpv --alang=jpn --slang=eng anime.mkv','Pick audio + subtitle language'],
      ['mpv --sub-file=subs.srt movie.mp4','Load an external subtitle'],
      ['mpv --no-video song.flac','Audio only'],
      ['mpv --loop-file=inf clip.mp4','Loop forever'],
      ['mediainfo movie.mkv','Everything about a file'],
      ['mediainfo --Inform="Video;%Width%x%Height% %FrameRate%fps %Format%" movie.mkv','One custom line'],
      ['ffprobe -v error -show_entries format=duration -of csv=p=0 movie.mkv','Duration in seconds (scripts)'],
      ['playerctl play-pause','Control whichever player is running (Spotify, Firefox, mpv…)'],
      ["playerctl metadata --format '{{ artist }} - {{ title }}'",'What\'s playing']],
    table:{head:['mpv key','Does'], rows:[
      ['Space','Pause'],
      ['← / →  ·  ↑ / ↓','Seek 5 s · 1 min'],
      ['[ / ]','Speed −/+ 10%'],
      ['j  ·  #','Next subtitle · audio track'],
      ['v','Subtitles on/off'],
      ['z / x','Subtitle delay −/+'],
      ['s','Screenshot'],
      ['f  ·  Shift+I','Fullscreen · stats overlay']]},
    flags:[
      ['--hwdec=auto','Hardware decoding'],
      ['--start=<time>','Seconds, mm:ss or 50%'],
      ['--alang / --slang','Preferred languages'],
      ['--aid / --sid N','Pick track by number'],
      ['--ytdl-format=<fmt>','Quality when playing web URLs'],
      ['playerctl -l','List running players']],
    example:{cmd:'mediainfo --Inform="Video;%Width%x%Height% %FrameRate%fps %Format%" movie.mkv', out:
`1920x1080 30.000fps AVC`},
    tip:'mpv can play web links directly (<code>mpv https://…</code>) when yt-dlp is installed.' },

  { title:'Download Video & Audio (yt-dlp)', icon:'⬇️', badge:'YT-DLP', color:'blue',
    cmds:[
      ['sudo dnf install yt-dlp','Updated often in Fedora (use dnf, not yt-dlp -U)'],
      ['yt-dlp -F "URL"','List available formats'],
      ['yt-dlp -S "res:1080,ext" "URL"','Best up to 1080p, prefer mp4'],
      ['yt-dlp -f "bv*+ba/b" --merge-output-format mkv "URL"','Best video + best audio'],
      ['yt-dlp -x --audio-format mp3 --audio-quality 0 "URL"','Audio only, best-quality MP3'],
      ['yt-dlp --embed-subs --sub-langs "en.*" --embed-chapters --embed-metadata "URL"','Keep subtitles, chapters, tags'],
      ['yt-dlp --download-sections "*00:01:00-00:02:30" "URL"','Only one part'],
      ['yt-dlp -o "%(playlist_index)02d - %(title)s.%(ext)s" "PLAYLIST_URL"','Whole playlist, numbered'],
      ['yt-dlp -I 1:5 "PLAYLIST_URL"','Only the first 5 videos'],
      ['yt-dlp --download-archive done.txt -a urls.txt','Batch from a file, skip already downloaded'],
      ['yt-dlp --cookies-from-browser firefox "URL"','Use your browser login']],
    flags:[
      ['-F / -f <fmt>','List / choose formats'],
      ['-S <sort>','Sort formats (res, ext, codec, size)'],
      ['-x --audio-format','mp3 · m4a · opus · flac'],
      ['-o <template>','Output file name'],
      ['-I <items>','Playlist items (1:5, 3,7)'],
      ['-r 2M','Limit speed'],
      ['--restrict-filenames','ASCII names without spaces']],
    example:{cmd:'yt-dlp -F "https://www.youtube.com/watch?v=VIDEO_ID"', out:
`[youtube] Extracting URL: https://www.youtube.com/watch?v=VIDEO_ID
[youtube] VIDEO_ID: Downloading webpage
[info] Available formats for VIDEO_ID:
ID  EXT   RESOLUTION FPS CH │   FILESIZE   TBR PROTO │ VCODEC          VBR ACODEC      ABR ASR MORE INFO
─────────────────────────────────────────────────────────────────────────────────────────────────────────
140 m4a   audio only      2 │    3.42MiB  129k https │ audio only          mp4a.40.2  129k 44k medium, m4a_dash
251 webm  audio only      2 │    3.35MiB  126k https │ audio only          opus       126k 48k medium, webm_dash
136 mp4   1280x720    30    │   19.87MiB  748k https │ avc1.4d401f    748k video only          720p, mp4_dash
247 webm  1280x720    30    │   15.02MiB  565k https │ vp9            565k video only          720p, webm_dash
137 mp4   1920x1080   30    │   41.63MiB 1567k https │ avc1.640028   1567k video only          1080p, mp4_dash
248 webm  1920x1080   30    │   27.14MiB 1021k https │ vp9           1021k video only          1080p, webm_dash`},
    tip:'Always quote the URL: <code>&</code> and <code>?</code> in links mean something to the shell. Only download content you have the right to keep.' },

  { title:'Hardware Video Encoding (GPU)', icon:'⚡', badge:'ENCODE', color:'warn',
    cmds:[
      ['# H.264 / HEVC on AMD + Intel need the freeworld drivers (see Codecs card)',''],
      ['vainfo | grep EncSlice','What your GPU can encode (VA-API)'],
      ['ffmpeg -hide_banner -encoders | grep -E "vaapi|nvenc|qsv"','GPU encoders in your ffmpeg'],
      ['ffmpeg -vaapi_device /dev/dri/renderD128 -i in.mp4 -vf "format=nv12,hwupload" -c:v hevc_vaapi -qp 24 -c:a copy out.mp4','AMD / Intel → HEVC'],
      ['ffmpeg -hwaccel vaapi -hwaccel_output_format vaapi -i in.mp4 -vf "scale_vaapi=w=1280:h=720" -c:v h264_vaapi -qp 23 -c:a copy out720.mp4','Decode + scale + encode all on the GPU'],
      ['ffmpeg -vaapi_device /dev/dri/renderD128 -i in.mp4 -vf "format=nv12,hwupload" -c:v av1_vaapi -c:a copy out.mkv','AV1 (Radeon RX 7000+, Intel Arc)'],
      ['ffmpeg -hwaccel cuda -hwaccel_output_format cuda -i in.mp4 -c:v hevc_nvenc -preset p5 -cq 24 -c:a copy out.mp4','NVIDIA → HEVC'],
      ['ffmpeg -i in.mp4 -c:v hevc_qsv -global_quality 24 -c:a copy out.mp4','Intel Quick Sync']],
    flags:[
      ['-qp N (vaapi)','Constant quality: lower = better, bigger'],
      ['-cq N (nvenc)','Target quality (0–51)'],
      ['-preset p1…p7','NVENC: fast … best quality'],
      ['-global_quality N','Quick Sync quality'],
      ['hwupload / scale_vaapi','Move frames to the GPU / scale there'],
      ['/dev/dri/renderD129','Second GPU (hybrid laptops)']],
    example:{cmd:'vainfo 2>/dev/null | grep EncSlice', out:
`      VAProfileH264ConstrainedBaseline: VAEntrypointEncSlice
      VAProfileH264Main               : VAEntrypointEncSlice
      VAProfileH264High               : VAEntrypointEncSlice
      VAProfileHEVCMain               : VAEntrypointEncSlice
      VAProfileHEVCMain10             : VAEntrypointEncSlice
      VAProfileAV1Profile0            : VAEntrypointEncSlice`},
    tip:'GPU encoding is 5–20× faster than x264/x265 but slightly bigger at the same quality. That makes it ideal for screen recordings and quick shares; use the CPU for archiving.' },

  { title:'Subtitles, Audio Tracks & Chapters', icon:'💬', badge:'TRACKS', color:'blue',
    cmds:[
      ['ffprobe -v error -show_entries stream=index,codec_type,codec_name:stream_tags=language -of compact=p=0:nk=1 movie.mkv','List every track'],
      ['ffmpeg -i movie.mkv -map 0:v -map 0:a:m:language:eng -map 0:s? -c copy eng.mkv','Keep only English audio'],
      ['ffmpeg -i movie.mkv -i subs.srt -map 0:v -map 0:a:0 -map 1 -c copy -c:s mov_text -metadata:s:s:0 language=eng out.mp4','Add soft subtitles to an MP4'],
      ['ffmpeg -i movie.mkv -vf subtitles=subs.srt -c:a copy burned.mp4','Burn subtitles into the picture'],
      ['ffmpeg -i movie.mkv -map 0:s:0 subs.srt','Extract the first subtitle track'],
      ['ffmpeg -i subs.srt subs.vtt','SRT → WebVTT (for the web)'],
      ['ffmpeg -i movie.mkv -map 0 -c copy -sn nosubs.mkv','Drop all subtitles'],
      ['ffmpeg -i movie.mkv -map 0 -c copy -disposition:a:0 0 -disposition:a:1 default out.mkv','Make the 2nd audio track the default'],
      ['ffmpeg -i movie.mkv -i chapters.txt -map 0 -map_chapters 1 -c copy out.mkv','Add chapters (see code)'],
      ['ffmpeg -i movie.mkv -map 0 -map_chapters -1 -c copy out.mkv','Remove chapters'],
      ['sudo dnf install mkvtoolnix',''],
      ['mkvmerge -i movie.mkv','Tracks with IDs (MKV)'],
      ['mkvextract movie.mkv tracks 3:subs.srt','Extract track 3']],
    code:
`;FFMETADATA1
[CHAPTER]
TIMEBASE=1/1000
START=0
END=5000
title=Intro
[CHAPTER]
TIMEBASE=1/1000
START=5000
END=12000
title=Main part`,
    flags:[
      ['-map 0','Keep every stream (ffmpeg keeps only 1 video + 1 audio otherwise)'],
      ['0:a:1','Input 0, 2nd audio track'],
      ['0:a:m:language:eng','Audio tracks tagged English'],
      ['0:s?','Subtitles if any (no error if none)'],
      ['-c:s mov_text','Subtitle codec MP4 accepts'],
      ['-sn / -an / -vn','Drop subtitles / audio / video']],
    example:{cmd:'ffprobe -v error -show_entries stream=index,codec_type,codec_name:stream_tags=language -of compact=p=0:nk=1 movie.mkv', out:
`0|h264|video
1|aac|audio|eng
2|aac|audio|jpn
3|subrip|subtitle|eng`} },

  { title:'Video Editing Recipes', icon:'✂️', badge:'EDIT', color:'green',
    cmds:[
      ['ffmpeg -i in.mp4 -vf "setpts=0.5*PTS" -af "atempo=2" fast.mp4','2× speed (0.5 and 2 → change both)'],
      ['ffmpeg -i in.mp4 -vf "transpose=1" out.mp4','Rotate 90° clockwise (re-encodes)'],
      ['ffmpeg -display_rotation 90 -i in.mp4 -c copy out.mp4','Rotate instantly (metadata only)'],
      ['ffmpeg -i in.mp4 -vf cropdetect -t 5 -f null - 2>&1 | grep -o "crop=.*" | tail -1','Find the black bars…'],
      ['ffmpeg -i in.mp4 -vf "crop=1920:800:0:140" out.mp4','…and crop them off'],
      ['ffmpeg -i in.mp4 -i logo.png -filter_complex "overlay=W-w-20:H-h-20" out.mp4','Watermark bottom-right'],
      ['ffmpeg -i in.mp4 -vf "fade=t=in:d=1,fade=t=out:st=59:d=1" -af "afade=t=in:d=1,afade=t=out:st=59:d=1" out.mp4','Fade in/out (60 s clip)'],
      ['ffmpeg -i a.mp4 -i b.mp4 -filter_complex hstack=inputs=2 side.mp4','Side by side (same height)'],
      ['ffmpeg -i in.mp4 -i music.mp3 -map 0:v -map 1:a -shortest -c:v copy out.mp4','Replace the audio'],
      ['ffmpeg -i in.mp4 -c copy -an silent.mp4','Remove audio'],
      ['ffmpeg -i in.mp4 -vf fps=1 frame_%03d.jpg','One picture per second'],
      ["ffmpeg -framerate 24 -pattern_type glob -i '*.jpg' -c:v libx264 -pix_fmt yuv420p timelapse.mp4",'Timelapse from photos'],
      ['ffmpeg -i shaky.mp4 -vf vidstabdetect -f null - && ffmpeg -i shaky.mp4 -vf vidstabtransform,unsharp=5:5:0.8 stable.mp4','Stabilise (2 passes, RPM Fusion ffmpeg)']],
    flags:[
      ['setpts=N*PTS','Video speed (0.5 = 2× faster)'],
      ['atempo=0.5…2','Audio speed (chain for more)'],
      ['transpose=1 / 2','90° clockwise / counter-clockwise'],
      ['crop=w:h:x:y','Width, height, left, top'],
      ['overlay=x:y','W/H = video size, w/h = logo size'],
      ['-shortest','Stop at the shorter input']],
    example:{cmd:'ffmpeg -i in.mp4 -vf cropdetect -t 5 -f null - 2>&1 | grep -o "crop=.*" | tail -1', out:
`crop=1920:800:0:140`},
    tip:'Filters (<code>-vf</code>, <code>-af</code>) always re-encode. Cutting, remuxing and removing tracks with <code>-c copy</code> are instant and lossless.' },

  { title:'Audio Conversion, Loudness & SoX', icon:'🎚️', badge:'AUDIO', color:'blue',
    cmds:[
      ['ffmpeg -i song.flac -c:a libopus -b:a 128k song.opus','FLAC → Opus (small, great quality)'],
      ['for f in *.flac; do ffmpeg -i "$f" -c:a libmp3lame -q:a 2 "${f%.flac}.mp3"; done','Whole folder FLAC → MP3'],
      ['ffmpeg -i talk.mp3 -af volumedetect -f null - 2>&1 | grep -E "mean_volume|max_volume"','How loud is it?'],
      ['ffmpeg -i talk.wav -af loudnorm=I=-16:TP=-1.5:LRA=11 -ar 48000 even.wav','Normalise loudness (podcast level)'],
      ['sudo dnf install sox',''],
      ['soxi song.flac','Format, rate, bit depth, duration'],
      ['sox song.flac clip.flac trim 0 30','First 30 seconds'],
      ['sox in.wav -r 48000 out.wav','Resample'],
      ['sox in.wav mono.wav remix -','Stereo → mono'],
      ['sox in.wav out.wav silence 1 0.1 1% reverse silence 1 0.1 1% reverse','Cut silence at start + end'],
      ['sox song.flac -n spectrogram -o spec.png','Spectrogram picture (spot fake lossless)'],
      ['play -n synth 3 sine 440','Test tone (speaker check)']],
    flags:[
      ['-q:a 0…9 (mp3)','VBR quality, 0 best · 2 ≈ 190 kbps'],
      ['-b:a 96k…160k (opus)','Opus bitrate'],
      ['loudnorm I=-16','Target loudness (−14 streaming · −16 podcast · −23 broadcast)'],
      ['trim start [length]','sox: cut'],
      ['remix -','Mix all channels to mono'],
      ['gain -n','Normalise peak to 0 dB']],
    example:{cmd:'ffmpeg -i talk.mp3 -af volumedetect -f null - 2>&1 | grep -E "mean_volume|max_volume"', out:
`[Parsed_volumedetect_0 @ 0x56077e3daf80] mean_volume: -21.1 dB
[Parsed_volumedetect_0 @ 0x56077e3daf80] max_volume: -12.7 dB`},
    tip:'Converting MP3 → FLAC does not bring quality back. A spectrogram cut off at 16 kHz shows a "lossless" file that was really made from an MP3.' },

  { title:'Music Tags & Cover Art', icon:'🏷️', badge:'TAGS', color:'green',
    cmds:[
      ['sudo dnf install kid3-cli flac',''],
      ['kid3-cli -c get song.mp3','Show all tags'],
      ["kid3-cli -c \"set title 'One More Time'\" -c \"set artist 'Daft Punk'\" -c \"set album 'Discovery'\" -c \"set track 1\" song.mp3",'Set tags'],
      ["kid3-cli -c \"totag '%{artist} - %{title}' 2\" *.mp3",'Tags from file names ("Artist - Title.mp3")'],
      ["kid3-cli -c \"fromtag '%{track} %{title}' 2\" *.mp3",'Rename files from tags ("01 Title.mp3")'],
      ["kid3-cli -c \"set picture:'cover.jpg' 'Cover'\" song.mp3",'Embed cover art'],
      ['metaflac --show-tag=ARTIST --show-tag=TITLE song.flac','FLAC tags'],
      ['metaflac --set-tag="ALBUM=Discovery" *.flac','Tag a whole album'],
      ['metaflac --import-picture-from=cover.jpg song.flac','FLAC cover art'],
      ['ffmpeg -i song.mp3 -map 0:a -c copy -map_metadata -1 clean.mp3','Strip every tag']],
    flags:[
      ['tag 1 / tag 2','kid3: ID3v1 / ID3v2 (2 is the useful one)'],
      ['%{artist} %{title} %{album} %{track}','kid3 format codes'],
      ['--remove-tag=NAME','metaflac: delete one field'],
      ['--remove-all-tags','metaflac: delete all'],
      ['--list --block-type=PICTURE','metaflac: show embedded art']],
    example:{cmd:'kid3-cli -c get "01 One More Time.mp3"', out:
`File: MPEG 1 Layer 3 320 kbps 44100 Hz Stereo 5:20
  Name: 01 One More Time.mp3
Tag 2: ID3v2.4.0
  Title                   One More Time
  Artist                  Daft Punk
  Album                   Discovery
  Track Number            1
  Picture: Cover (front)  Cover`},
    tip:'For a big library, the GUI version (<code>sudo dnf install kid3</code>) or Picard (MusicBrainz lookup) is faster than tagging by hand.' },

  { title:'PDF Power Tools', icon:'📑', badge:'PDF', color:'warn',
    cmds:[
      ['sudo dnf install ghostscript qpdf poppler-utils img2pdf ocrmypdf',''],
      ['gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -dNOPAUSE -dBATCH -dQUIET -sOutputFile=small.pdf big.pdf','Shrink a PDF (scans, photos)'],
      ['img2pdf --pagesize A4 scan*.jpg -o scans.pdf','Photos → PDF without recompressing'],
      ['ocrmypdf -l eng --deskew scan.pdf searchable.pdf','Make a scan searchable / copyable'],
      ['pdftoppm -png -r 150 doc.pdf page','Every page → PNG'],
      ['pdfimages -all doc.pdf img','Extract the original images'],
      ['qpdf doc.pdf --rotate=+90:1-2 rotated.pdf','Rotate pages 1–2'],
      ['qpdf --empty --pages doc.pdf 3,1-2 -- reordered.pdf','Reorder pages'],
      ['qpdf --split-pages doc.pdf page-%d.pdf','One file per page'],
      ['qpdf --encrypt --user-password=open123 --owner-password=owner456 --bits=256 -- doc.pdf locked.pdf','Password-protect'],
      ['qpdf --decrypt --password=open123 locked.pdf unlocked.pdf','Remove a password you know'],
      ['pdfinfo doc.pdf','Pages, size, producer']],
    flags:[
      ['/screen · /ebook · /printer · /prepress','gs quality: 72 · 150 · 300 · 300 dpi+'],
      ['ocrmypdf -l eng+ara','Several languages (tesseract-langpack-ara)'],
      ['--skip-text / --force-ocr','Pages that already have text'],
      ['--rotate=+90:1-2','qpdf: angle:pages'],
      ['1-z / r1','qpdf: all pages / last page'],
      ['pdftoppm -r / -jpeg','Resolution / JPEG output']],
    example:{cmd:'gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -dNOPAUSE -dBATCH -dQUIET -sOutputFile=scan-small.pdf scan.pdf && du -h scan.pdf scan-small.pdf', out:
`19M	scan.pdf
596K	scan-small.pdf`},
    tip:'Merging, extracting pages and PDF → text are in the <b>Images & PDFs</b> card above.' },

  { title:'Photos: Optimise, Convert & EXIF', icon:'📸', badge:'PHOTOS', color:'blue',
    cmds:[
      ['sudo dnf install jpegoptim libwebp-tools libheif-tools perl-Image-ExifTool',''],
      ['jpegoptim --strip-all -m85 *.jpg','Shrink JPEGs in place (max quality 85)'],
      ['cwebp -q 80 photo.jpg -o photo.webp','JPEG → WebP'],
      ['magick photo.jpg -quality 50 photo.avif','JPEG → AVIF (smallest)'],
      ['sudo dnf install libheif-freeworld','iPhone HEIC support (RPM Fusion)'],
      ['heif-convert IMG_1234.HEIC IMG_1234.jpg','HEIC → JPEG'],
      ['for f in *.HEIC; do heif-convert "$f" "${f%.HEIC}.jpg"; done','Whole folder'],
      ['exiftool -Make -Model -DateTimeOriginal -GPSPosition photo.jpg','Camera, date, location'],
      ['exiftool -gps:all= -overwrite_original *.jpg','Remove location before sharing'],
      ["exiftool '-FileName<DateTimeOriginal' -d '%Y-%m-%d_%H%M%S%%-c.%%e' .",'Rename by date taken'],
      ["exiftool '-Directory<DateTimeOriginal' -d '%Y/%m' .",'Sort into year/month folders']],
    flags:[
      ['jpegoptim -m N','Max quality (re-encodes above N)'],
      ['--strip-all','Remove all metadata (EXIF, GPS…)'],
      ['cwebp -q / -lossless','Quality / lossless'],
      ['exiftool -overwrite_original','No _original backup copies'],
      ['%%-c','Adds -1, -2 when two photos share a second'],
      ['-r','exiftool: include subfolders']],
    example:{cmd:"exiftool '-FileName<DateTimeOriginal' -d '%Y-%m-%d_%H%M%S%%-c.%%e' . && ls", out:
`    1 directories scanned
    3 image files updated
2026-09-12_184107-1.jpg
2026-09-12_184107.jpg
2026-09-12_190255.jpg`},
    warn:'<code>jpegoptim --strip-all</code> also deletes the date taken. Rename or sort by date first, then optimise.' },

  { title:'PipeWire Pro Audio & Bluetooth Codecs', icon:'🎛️', badge:'PRO', color:'warn',
    cmds:[
      ['pw-metadata -n settings','Current rate + buffer (quantum)'],
      ['pw-metadata -n settings 0 clock.force-rate 96000','Force 96 kHz (until restart)'],
      ['pw-metadata -n settings 0 clock.force-quantum 64','Low latency buffer (64 samples)'],
      ['pw-metadata -n settings 0 clock.force-quantum 0','Back to automatic'],
      ['mkdir -p ~/.config/pipewire/pipewire.conf.d','Permanent settings (see code)'],
      ['pw-link -o','Output ports'],
      ['pw-link -i','Input ports'],
      ['pw-link -l','Current links'],
      ['pw-link "Firefox:output_FL" "alsa_output.usb-Focusrite:playback_FL"','Wire ports by hand'],
      ['pw-loopback','Hear your mic live (Ctrl-C to stop)'],
      ['pactl load-module module-null-sink sink_name=virt sink_properties=device.description=Virtual','Virtual output (e.g. for OBS)'],
      ['PIPEWIRE_QUANTUM=64/48000 pw-jack ardour','JACK apps with a small buffer'],
      ['sudo dnf install qpwgraph easyeffects','Patchbay GUI · EQ + noise removal'],
      ['pactl send-message /card/bluez_card.AC_80_0A_11_22_33/bluez list-codecs','Bluetooth codecs your headphones support'],
      ["pactl send-message /card/bluez_card.AC_80_0A_11_22_33/bluez switch-codec '\"ldac\"'",'Switch codec']],
    code:
`# ~/.config/pipewire/pipewire.conf.d/10-rates.conf
context.properties = {
    default.clock.allowed-rates = [ 44100 48000 88200 96000 ]
    default.clock.quantum       = 512
    default.clock.min-quantum   = 32
}`,
    flags:[
      ['clock.force-rate','Sample rate (0 = auto)'],
      ['clock.force-quantum','Buffer size (latency = quantum ÷ rate)'],
      ['allowed-rates','Follow the file\'s rate (no resampling)'],
      ['sbc · aac · ldac · aptx','Bluetooth codecs (ldac/aptx = better)'],
      ['PIPEWIRE_QUANTUM=N/rate','Per-app buffer']],
    example:{cmd:'pw-metadata -n settings', out:
`Found "settings" metadata 31
update: id:0 key:'log.level' value:'2' type:''
update: id:0 key:'clock.rate' value:'48000' type:''
update: id:0 key:'clock.allowed-rates' value:'[ 48000 ]' type:''
update: id:0 key:'clock.quantum' value:'1024' type:''
update: id:0 key:'clock.min-quantum' value:'32' type:''
update: id:0 key:'clock.max-quantum' value:'2048' type:''
update: id:0 key:'clock.force-quantum' value:'0' type:''
update: id:0 key:'clock.force-rate' value:'0' type:''`},
    tip:'Restart after editing the config: <code>systemctl --user restart pipewire pipewire-pulse wireplumber</code>. Card names for Bluetooth come from <code>pactl list cards short</code>.' },

  { title:'Recording, Streaming & Virtual Camera', icon:'🔴', badge:'STREAM', color:'red',
    cmds:[
      ['flatpak install flathub com.obsproject.Studio','OBS Studio (Flathub build has all codecs)'],
      ['ffmpeg -f pulse -i default -c:a flac mic.flac','Record the microphone'],
      ["pw-record -P '{ stream.capture.sink=true }' desktop.wav",'Record what the computer is playing'],
      ['ffmpeg -re -i video.mp4 -c:v libx264 -preset veryfast -b:v 4500k -maxrate 4500k -bufsize 9000k -g 60 -c:a aac -b:a 160k -f flv "rtmp://live.twitch.tv/app/$STREAM_KEY"','Stream a file to Twitch / YouTube (RTMP)'],
      ['sudo dnf install v4l2loopback','Virtual camera driver (RPM Fusion)'],
      ['sudo modprobe v4l2loopback devices=1 video_nr=10 card_label="Virtual Cam" exclusive_caps=1','Create /dev/video10'],
      ['ffmpeg -re -stream_loop -1 -i clip.mp4 -f v4l2 -pix_fmt yuv420p /dev/video10','Play a video "as" your webcam'],
      ['v4l2-ctl --list-devices','Check the virtual camera exists'],
      ['flatpak install flathub com.dec05eba.gpu_screen_recorder','Screen recorder using GPU encoding']],
    flags:[
      ['-re','Read at real speed (needed for live streams)'],
      ['-g 60','Keyframe every 2 s at 30 fps (platform requirement)'],
      ['-b:v / -maxrate / -bufsize','Constant-ish bitrate for streaming'],
      ['stream.capture.sink=true','pw-record: capture the output'],
      ['exclusive_caps=1','Needed for Chrome / Zoom to see the camera']],
    example:{cmd:'v4l2-ctl --list-devices', out:
`Virtual Cam (platform:v4l2loopback-000):
	/dev/video10

Integrated Camera: Integrated C (usb-0000:00:14.0-8):
	/dev/video0
	/dev/video1
	/dev/media0`},
    tip:'For simple screen recording, GNOME\'s own recorder (<b>Ctrl+Alt+Shift+R</b>) is enough. Use OBS when you need a webcam, scenes or streaming.' },

  { title:'CDs, DVDs & Blu-ray', icon:'💿', badge:'DISC', color:'blue',
    cmds:[
      ['sudo dnf install cdparanoia abcde',''],
      ['cdparanoia -Q','Tracks on the audio CD'],
      ['abcde -o flac','Rip + tag + name the whole CD (looks up MusicBrainz)'],
      ['cdparanoia -B','Rip every track to WAV'],
      ['sudo dnf install rpmfusion-free-release-tainted && sudo dnf install libdvdcss','Play encrypted DVDs'],
      ['mpv dvd://','Play a DVD'],
      ['flatpak install flathub com.makemkv.MakeMKV','Back up DVDs / Blu-rays to MKV'],
      ['growisofs -dvd-compat -Z /dev/sr0=image.iso','Burn an ISO to DVD'],
      ['growisofs -Z /dev/sr0 -R -J ~/Backup','Burn a folder as a data DVD'],
      ['wodim -v -dao -pad -audio *.wav','Burn an audio CD'],
      ['eject','Open the tray'],
      ['eject -t','Close the tray']],
    flags:[
      ['abcde -o flac,mp3','Several formats at once'],
      ['cdparanoia -B','Batch: one file per track'],
      ['cdparanoia "1-3"','Only some tracks'],
      ['growisofs -Z dev=file.iso','Write an image'],
      ['-R -J','Rock Ridge + Joliet (long names on Linux + Windows)']],
    example:{cmd:'cdparanoia -Q', out:
`cdparanoia III release 10.2 (September 11, 2008)

Table of contents (audio tracks only):
track        length               begin        copy pre ch
===========================================================
  1.    16277 [03:37.02]        0 [00:00.00]    no   no  2
  2.    22400 [04:58.50]    16277 [03:37.02]    no   no  2
  3.    19310 [04:17.35]    38677 [08:35.52]    no   no  2
  4.    17865 [03:58.15]    57987 [12:53.12]    no   no  2
TOTAL   75852 [16:51.27]    (audio only)`},
    tip:'Whether you may break DVD copy protection (libdvdcss, MakeMKV) depends on your country\'s law, so check it first.' }
);
})();

/* ═════════════════ MORE BACKUP (v2.33) ═════════════════ */
(function () {
const b = window.FB_DATA.find(x => x.id === 'backup');
b.desc = 'restic, borg, rclone cloud, btrfs send, snapper rollback, encrypted archives, databases, disk images, timers and restore tests';
b.cards.push(
  { title:'BorgBackup (dedup + encrypted)', icon:'🧱', badge:'BORG', color:'green',
    cmds:[
      ['sudo dnf install borgbackup borgmatic',''],
      ['borg init --encryption=repokey-blake2 /run/media/$USER/USB/borg','Create an encrypted repo'],
      ['borg key export --paper /run/media/$USER/USB/borg > borg-key.txt','Save the key somewhere else!'],
      ['export BORG_REPO=/run/media/$USER/USB/borg','Stop typing the path'],
      ["borg create --stats --progress --compression zstd,6 --exclude-caches --exclude '*/Downloads' ::'{hostname}-{now:%Y-%m-%d}' ~",'Back up home'],
      ['borg list','Archives in the repo'],
      ['borg list ::laptop-2026-09-30 | grep report','Find a file in one archive'],
      ['borg diff ::laptop-2026-09-29 laptop-2026-09-30','What changed between two'],
      ['cd /tmp && borg extract ::laptop-2026-09-30 home/sooraj/Documents/report.odt','Restore one file (into the current folder)'],
      ['borg mount ::laptop-2026-09-30 ~/borg-mnt','Browse an archive like a folder'],
      ['borg umount ~/borg-mnt','Unmount it'],
      ['borg prune --list --keep-daily 7 --keep-weekly 4 --keep-monthly 6','Thin out old archives…'],
      ['borg compact','…then actually free the space'],
      ['borg create ssh://sooraj@nas/./backups/borg::{hostname}-{now} ~','Back up over SSH (borg installed on both ends)'],
      ['sudo borgmatic config generate','borgmatic: write /etc/borgmatic/config.yaml'],
      ['sudo borgmatic --verbosity 1 --list --stats','Run create + prune + compact + check from that file']],
    flags:[
      ['repokey-blake2','Key inside the repo, protected by the passphrase'],
      ['--compression zstd,N','1 fast … 22 small (lz4 = fastest)'],
      ['--exclude-caches','Skip folders with a CACHEDIR.TAG'],
      ['{hostname} {now}','Placeholders in archive names'],
      ['BORG_PASSPHRASE','Env var for scripts (or BORG_PASSCOMMAND)'],
      ['check --verify-data','Read + verify every chunk (slow)']],
    example:{cmd:"borg create --stats --compression zstd,6 --exclude-caches ::'{hostname}-{now:%Y-%m-%d}' ~", out:
`Archive name: laptop-2026-09-30
Archive fingerprint: 1b905657693083248435c07b3556b8fb0dc228ce1ffa9dfa37a14d21178a72a9
Time (start): Wed, 2026-09-30 11:02:30
Time (end):   Wed, 2026-09-30 11:03:41
Duration: 1 minutes 11.20 seconds
Number of files: 184213
Utilization of max. archive size: 0%
------------------------------------------------------------------------------
                       Original size      Compressed size    Deduplicated size
This archive:               48.21 GB             41.07 GB            212.64 MB
All archives:              712.35 GB            603.88 GB             58.19 GB

                       Unique chunks         Total chunks
Chunk index:                  301228              4418610
------------------------------------------------------------------------------`},
    tip:'Look at "Deduplicated size": the second backup of 48 GB only added 212 MB, because Borg stores unchanged data just once.' },

  { title:'Automatic Backups (restic + systemd timer)', icon:'⏲️', badge:'AUTO', color:'blue',
    cmds:[
      ['mkdir -p ~/.config/restic && chmod 700 ~/.config/restic',''],
      ['echo "your-long-passphrase" > ~/.config/restic/password && chmod 600 ~/.config/restic/password','Password file'],
      ['nano ~/.config/restic/env','Where to back up (see code)'],
      ['mkdir -p ~/.config/systemd/user','Then create the .service + .timer files there'],
      ['restic -r sftp:nas:/srv/restic/laptop init','Repo on another machine via SSH'],
      ['restic -r rclone:gdrive:restic init','…or in the cloud through rclone'],
      ['systemctl --user daemon-reload',''],
      ['systemctl --user enable --now restic-backup.timer','Turn on the daily schedule'],
      ['systemctl --user start restic-backup.service','Run one now (test it!)'],
      ['journalctl --user -u restic-backup -n 30','Did it work?'],
      ['systemctl --user list-timers','When it runs next'],
      ['sudo loginctl enable-linger $USER','Run even when you are not logged in']],
    code:
`# ~/.config/restic/env
RESTIC_REPOSITORY=sftp:nas:/srv/restic/laptop
RESTIC_PASSWORD_FILE=/home/sooraj/.config/restic/password

# ~/.config/systemd/user/restic-backup.service
[Unit]
Description=restic backup of home

[Service]
Type=oneshot
EnvironmentFile=%h/.config/restic/env
ExecStart=/usr/bin/restic backup %h --exclude-caches --exclude %h/Downloads
ExecStartPost=/usr/bin/restic forget --keep-daily 7 --keep-weekly 4 --keep-monthly 12 --prune
Nice=19
IOSchedulingClass=idle

# ~/.config/systemd/user/restic-backup.timer
[Unit]
Description=Daily restic backup

[Timer]
OnCalendar=daily
Persistent=true
RandomizedDelaySec=30m

[Install]
WantedBy=timers.target`,
    flags:[
      ['sftp: · rest: · s3: · b2: · rclone:','restic repo types'],
      ['Persistent=true','Catch up if the PC was off at the scheduled time'],
      ['RandomizedDelaySec','Don\'t start exactly at midnight'],
      ['Nice / IOSchedulingClass=idle','Don\'t slow you down while it runs'],
      ['%h','Your home folder (in unit files)']],
    example:{cmd:'journalctl --user -u restic-backup -n 8 -o cat', out:
`using parent snapshot 3e06c457

Files:          41 new,   118 changed, 183954 unmodified
Dirs:            3 new,    97 changed, 21406 unmodified
Added to the repository: 184.221 MiB (61.407 MiB stored)

processed 184113 files, 47.902 GiB in 1:12
snapshot 32a5f7fd saved`},
    tip:'EnvironmentFile does not understand <code>~</code> or <code>%h</code>, so write the full path to the password file there.' },

  { title:'rclone: Cloud Backups & Encrypted Remotes', icon:'☁️', badge:'RCLONE', color:'blue',
    cmds:[
      ['sudo dnf install rclone',''],
      ['rclone config','Add Google Drive, OneDrive, Dropbox, S3, B2… (wizard)'],
      ['rclone listremotes','Configured remotes'],
      ['rclone about gdrive:','Quota used / free'],
      ['rclone copy ~/Documents gdrive:Backup/Documents -P','Upload (never deletes)'],
      ['rclone sync --dry-run ~/Photos gdrive:Photos','Preview a mirror…'],
      ['rclone sync ~/Photos gdrive:Photos -P','…then run it (deletes extra files on the remote!)'],
      ['rclone sync ~/Documents gdrive:Backup/current --backup-dir gdrive:Backup/old/$(date +%F)','Mirror, but keep old/deleted versions'],
      ['rclone check ~/Photos gdrive:Photos','Compare both sides'],
      ['rclone config create secret crypt remote=gdrive:encrypted password=$(rclone obscure "$PASS")','Encrypted remote on top of gdrive'],
      ['rclone copy ~/Private secret: -P','Files arrive encrypted, even names'],
      ['rclone mount gdrive: ~/GDrive --vfs-cache-mode writes --daemon','Cloud as a folder'],
      ['fusermount3 -u ~/GDrive','Unmount'],
      ['rclone bisync ~/Sync gdrive:Sync --resync','Two-way sync (first run only --resync)'],
      ['rclone ncdu gdrive:','What uses the space']],
    flags:[
      ['copy vs sync','sync makes the target identical (deletes)'],
      ['-P / --progress','Live progress'],
      ['--dry-run','Show what would happen'],
      ['--backup-dir','Move changed/deleted files here instead of losing them'],
      ['--max-age 24h','Only recent files'],
      ['--bwlimit 2M','Limit upload speed'],
      ['--exclude "*.tmp"','Skip files']],
    example:{cmd:'rclone sync --dry-run ~/Documents gdrive:Backup/Documents', out:
`2026/09/30 11:03:01 NOTICE: new.txt: Skipped copy as --dry-run is set (size 2)
2026/09/30 11:03:01 NOTICE: report30.txt: Skipped delete as --dry-run is set (size 262.592Ki)
2026/09/30 11:03:01 NOTICE:
Transferred:   	          2 B / 2 B, 100%, 0 B/s, ETA -
Checks:                32 / 32, 100%
Deleted:                1 (files), 0 (dirs)
Transferred:            1 / 1, 100%
Elapsed time:         0.0s`},
    warn:'Losing the crypt password means losing the files. rclone cannot recover it, so store it in your password manager.' },

  { title:'Encrypted Archives, Checksums & Repair Data', icon:'🔐', badge:'ARCHIVE', color:'warn',
    cmds:[
      ['sudo dnf install age zstd par2cmdline',''],
      ['age-keygen -o ~/.config/age/key.txt','Create a key (prints the public key)'],
      ['tar -C ~ -cf - Documents | zstd -T0 -10 | age -r age1… > docs-$(date +%F).tar.zst.age','Archive + compress + encrypt'],
      ['age -d -i ~/.config/age/key.txt docs-2026-09-30.tar.zst.age | zstd -d | tar -xf -','Decrypt + extract'],
      ['tar -C ~ -cf - Documents | zstd -T0 | age -p > docs.tar.zst.age','Passphrase instead of a key'],
      ['tar --zstd -cf home.tar.zst -C / home/$USER','Just compress (tar understands zstd)'],
      ['tar -df home.tar','Compare an archive with the disk now'],
      ['split -b 4G -d home.tar.zst home.tar.zst.part-','Split for FAT32 / upload limits'],
      ['cat home.tar.zst.part-* > home.tar.zst','Join again'],
      ['sha256sum *.age > SHA256SUMS','Record checksums'],
      ['sha256sum -c SHA256SUMS','Verify them later'],
      ['par2 create -r10 docs.par2 docs-2026-09-30.tar.zst.age','10% repair data (survives bit rot)'],
      ['par2 verify docs.par2','Check an archive'],
      ['par2 repair docs.par2','Fix a damaged archive']],
    flags:[
      ['zstd -T0','Use all CPU cores'],
      ['zstd -1…-19','Speed ↔ size'],
      ['age -r / -R','Encrypt to a public key / keys file'],
      ['age -p','Encrypt with a passphrase'],
      ['par2 -rN','Repair data as % of the file'],
      ['tar -d','Report files that changed since the archive']],
    example:{cmd:'par2 verify docs.par2 | grep -E "Target|Repair"', out:
`Target: "docs-2026-09-30.tar.zst.age" - damaged. Found 1998 of 1999 data blocks.
Repair is required.
Repair is possible.`},
    tip:'<code>par2 repair</code> keeps the damaged original as <code>.1</code>. After the repair, <code>sha256sum -c</code> should say OK again.' },

  { title:'Btrfs send / receive & btrbk', icon:'📤', badge:'SEND', color:'green',
    cmds:[
      ['sudo mkdir -p /home/.backup-snaps',''],
      ['sudo btrfs subvolume snapshot -r /home /home/.backup-snaps/home-2026-09-30','Read-only snapshot (instant)'],
      ['sudo btrfs send /home/.backup-snaps/home-2026-09-30 | sudo btrfs receive /run/media/$USER/BTRFS-BACKUP/','First full copy to a Btrfs USB disk'],
      ['sudo btrfs subvolume snapshot -r /home /home/.backup-snaps/home-2026-10-07','A week later…'],
      ['sudo btrfs send -p /home/.backup-snaps/home-2026-09-30 /home/.backup-snaps/home-2026-10-07 | sudo btrfs receive /run/media/$USER/BTRFS-BACKUP/','…send only the changes'],
      ['sudo btrfs send -p OLD NEW | ssh nas "sudo btrfs receive /srv/backups"','Incremental over SSH'],
      ['sudo btrfs send /home/.backup-snaps/home-2026-10-07 | zstd > home.btrfs.zst','Into a file (any filesystem)'],
      ['sudo btrfs subvolume delete /home/.backup-snaps/home-2026-09-30','Remove old snapshots (keep the newest as next parent)'],
      ['sudo dnf install btrbk && sudo btrbk dryrun','btrbk automates all of this (see code)'],
      ['sudo btrbk run','Snapshot + send + clean up']],
    code:
`# /etc/btrbk/btrbk.conf
# First: sudo mkdir -p /mnt/btr_pool && sudo mount -o subvolid=5 /dev/nvme0n1p3 /mnt/btr_pool
#        sudo mkdir /mnt/btr_pool/btrbk_snapshots
snapshot_preserve_min   2d
snapshot_preserve       14d
target_preserve_min     no
target_preserve         20d 10w *m

volume /mnt/btr_pool
  snapshot_dir btrbk_snapshots
  subvolume home
    target /run/media/sooraj/BTRFS-BACKUP/btrbk`,
    flags:[
      ['-r','Snapshot must be read-only to send'],
      ['send -p <parent>','Incremental (parent must exist on both sides)'],
      ['receive <dir>','Target must be Btrfs'],
      ['subvolid=5','Btrfs top level (Fedora\'s root + home live under it)'],
      ['btrbk dryrun','Show what would happen']],
    example:{cmd:'sudo btrfs send -p /home/.backup-snaps/home-2026-09-30 /home/.backup-snaps/home-2026-10-07 | sudo btrfs receive /run/media/$USER/BTRFS-BACKUP/', out:
`At subvol /home/.backup-snaps/home-2026-10-07
At snapshot home-2026-10-07`} },

  { title:'Undo a Bad Update (Snapper + DNF5)', icon:'⏪', badge:'ROLLBACK', color:'red',
    cmds:[
      ['sudo dnf install snapper libdnf5-plugin-actions',''],
      ['sudo snapper -c root create-config /','Snapshots of the system (Btrfs root)'],
      ['sudo snapper -c root set-config TIMELINE_CREATE=no NUMBER_LIMIT=10','Only update snapshots, keep 10'],
      ['sudoedit /etc/dnf/libdnf5-plugins/actions.d/snapper.actions','Snapshot before + after every dnf run (see code)'],
      ['sudo dnf upgrade --refresh','Creates a pre/post pair automatically'],
      ['sudo snapper -c root list','Snapshots'],
      ['sudo snapper -c root status 42..43','Files the update changed'],
      ['sudo snapper -c root diff 42..43 /etc/ssh/sshd_config','Exact changes in one file'],
      ['sudo snapper -c root undochange 42..43','Put everything back as it was before'],
      ['sudo snapper -c root delete 30-40','Delete a range']],
    code:
`# /etc/dnf/libdnf5-plugins/actions.d/snapper.actions
pre_transaction::::/usr/bin/sh -c echo\\ "tmp.snapper_descr=$(ps\\ -o\\ command\\ --no-headers\\ -p\\ '\${pid}')"
pre_transaction::::/usr/bin/sh -c echo\\ "tmp.snapper_pre_number=$(snapper\\ -c\\ root\\ create\\ -t\\ pre\\ -c\\ number\\ -p\\ -d\\ '\${tmp.snapper_descr}')"
post_transaction::::/usr/bin/sh -c [\\ -n\\ "\${tmp.snapper_pre_number}"\\ ]\\ &&\\ snapper\\ -c\\ root\\ create\\ -t\\ post\\ --pre-number\\ "\${tmp.snapper_pre_number}"\\ -c\\ number\\ -d\\ "\${tmp.snapper_descr}"\\ ;\\ echo\\ tmp.snapper_pre_number\\ ;\\ echo\\ tmp.snapper_descr`,
    flags:[
      ['-c root','Snapper config (the first -c)'],
      ['create -c number','Cleanup rule (-c after "create")'],
      ['N..M','From snapshot N to M'],
      ['undochange N..M file','Undo only some files'],
      ['NUMBER_LIMIT','How many numbered snapshots to keep']],
    example:{cmd:'sudo snapper -c root list', out:
` # │ Type   │ Pre # │ Date                            │ User │ Cleanup │ Description           │ Userdata
───┼────────┼───────┼─────────────────────────────────┼──────┼─────────┼───────────────────────┼─────────
 0 │ single │       │                                 │ root │         │ current               │
42 │ pre    │       │ Wed 30 Sep 2026 09:12:04 AM +03 │ root │ number  │ dnf upgrade --refresh │
43 │ post   │    42 │ Wed 30 Sep 2026 09:14:51 AM +03 │ root │ number  │ dnf upgrade --refresh │`},
    warn:'On Fedora <code>/boot</code> is not Btrfs, so kernels are not in the snapshot. For a broken kernel, pick the previous one in the GRUB menu instead of undochange.' },

  { title:'Databases & Container Volumes', icon:'🗄️', badge:'DATA', color:'blue',
    cmds:[
      ['sudo -u postgres pg_dumpall | zstd > pg-all-$(date +%F).sql.zst','Every PostgreSQL database + users'],
      ['pg_dump -U app -Fc appdb > appdb.dump','One database (custom format)'],
      ['pg_restore -U app -d appdb -c -j4 appdb.dump','Restore it (drop + recreate, 4 jobs)'],
      ['sudo mariadb-dump --single-transaction --all-databases | zstd > mariadb-$(date +%F).sql.zst','Every MariaDB database, no locking'],
      ['zstd -dc mariadb-2026-09-30.sql.zst | sudo mariadb','Restore'],
      ['sqlite3 app.db ".backup \'app-$(date +%F).db\'"','SQLite: safe copy while in use'],
      ['sqlite3 app-2026-09-30.db "PRAGMA integrity_check"','Check the copy'],
      ['podman exec db pg_dump -U app -Fc app > app.dump','Dump from a container'],
      ['podman volume export pgdata --output pgdata.tar','Save a whole volume'],
      ['podman volume import pgdata pgdata.tar','Put it back (stop the container first)']],
    flags:[
      ['pg_dump -Fc','Compressed, restore selectively'],
      ['pg_dumpall -g','Only users + roles'],
      ['--single-transaction','Consistent InnoDB dump, no table locks'],
      ['.backup','SQLite online backup API (never cp a live DB)'],
      ['-j N','pg_restore in parallel']],
    example:{cmd:'sqlite3 app.db ".backup \'app-2026-09-30.db\'" && sqlite3 app-2026-09-30.db "PRAGMA integrity_check"', out:
`ok`},
    tip:'Copying a running database\'s files often gives a broken backup. Dump it first, then let restic or Borg back up the dump file.' },

  { title:'Disk Images & Partition Tables', icon:'💽', badge:'IMAGE', color:'red',
    cmds:[
      ['sudo sfdisk -d /dev/nvme0n1 > nvme0n1.sfdisk','Save the partition table (tiny text file)'],
      ['sudo sfdisk /dev/nvme0n1 < nvme0n1.sfdisk','Restore it'],
      ['sudo sgdisk --backup=nvme0n1.gpt /dev/nvme0n1','GPT binary backup (sgdisk --load-backup= to restore)'],
      ['sudo efibootmgr -v > efi-entries.txt','Note the UEFI boot entries'],
      ['sudo dd if=/dev/nvme0n1 bs=4M status=progress | zstd -T0 > disk.img.zst','Whole-disk image (boot a live USB first)'],
      ['zstd -dc disk.img.zst | sudo dd of=/dev/nvme0n1 bs=4M status=progress oflag=direct','Restore the image'],
      ['sudo dnf install partclone ddrescue',''],
      ['sudo partclone.btrfs -c -s /dev/nvme0n1p3 -o - | zstd -T0 > p3.pcl.zst','Image only the used space'],
      ['zstd -dc p3.pcl.zst | sudo partclone.btrfs -r -s - -o /dev/nvme0n1p3','Restore a partclone image'],
      ['sudo ddrescue -n /dev/sdb sdb.img sdb.map','Rescue a FAILING disk: easy parts first…'],
      ['sudo ddrescue -r3 /dev/sdb sdb.img sdb.map','…then retry the bad areas 3 times']],
    flags:[
      ['sfdisk -d','Dump in a format sfdisk can read back'],
      ['partclone -c / -r','Clone to image / restore'],
      ['-s / -o','Source / output (- = stdin/stdout)'],
      ['ddrescue -n','Skip slow scraping on the first pass'],
      ['<mapfile>','Lets ddrescue resume where it stopped']],
    example:{cmd:'sudo sfdisk -d /dev/nvme0n1', out:
`label: gpt
label-id: C8A51090-9ED5-47FE-A727-F4DB652E97E7
device: /dev/nvme0n1
unit: sectors
first-lba: 2048
last-lba: 1000215182
sector-size: 512

/dev/nvme0n1p1 : start=        2048, size=     1228800, type=C12A7328-F81F-11D2-BA4B-00A0C93EC93B, uuid=2B8E1FFD-1649-4205-8701-2F0D7FA8E54A, name="EFI System Partition"
/dev/nvme0n1p2 : start=     1230848, size=     4194304, type=0FC63DAF-8483-4772-8E79-3D69D8477DE4, uuid=7F95730C-FA91-4152-A887-823C13EF256B
/dev/nvme0n1p3 : start=     5425152, size=   994789376, type=0FC63DAF-8483-4772-8E79-3D69D8477DE4, uuid=61D979AF-F476-492B-8965-31B7207DF746`},
    warn:'Never image a mounted, running system with dd: the copy will be inconsistent. Boot the Fedora live USB (or Clonezilla) first. Double-check <code>if=</code> and <code>of=</code>, because a swap wipes the disk.' },

  { title:'Move to a New PC (Reinstall List & Settings)', icon:'📦', badge:'MIGRATE', color:'green',
    cmds:[
      ["dnf repoquery --userinstalled --queryformat '%{name}\\n' | sort -u > packages.txt",'Packages you installed yourself'],
      ['dnf repolist --enabled > repos.txt && dnf copr list > coprs.txt','Extra repos to re-add first'],
      ['flatpak list --app --columns=application > flatpaks.txt','Flatpak apps'],
      ['dconf dump / > dconf-all.ini','Every GNOME / app setting'],
      ['crontab -l > crontab.txt; systemctl --user list-unit-files --state=enabled > user-units.txt','Your schedules'],
      ['tar -C ~ -cf - .ssh .gnupg .local/share/keyrings | age -p > secrets.tar.age','Keys + saved passwords, encrypted'],
      ['# ── on the new PC ──',''],
      ['xargs -a packages.txt sudo dnf install -y --skip-unavailable','Reinstall packages'],
      ['xargs -a flatpaks.txt flatpak install -y flathub','Reinstall Flatpaks'],
      ['dconf load / < dconf-all.ini','Restore settings (log out + in)'],
      ['age -d secrets.tar.age | tar -C ~ -xf - && chmod 700 ~/.ssh ~/.gnupg','Restore keys']],
    flags:[
      ['--userinstalled','Skip automatic dependencies'],
      ['--skip-unavailable','Keep going if a package no longer exists'],
      ['--columns=application','Just the app IDs'],
      ['dconf dump /org/gnome/','Only GNOME settings'],
      ['xargs -a <file>','Run a command with every line as an argument']],
    example:{cmd:"dnf repoquery --userinstalled --queryformat '%{name}\\n' | sort -u | head", out:
`akmod-nvidia
borgbackup
code
fastfetch
ffmpeg
gnome-tweaks
htop
podman-compose
rclone
restic`},
    tip:'Restore <code>~/Documents</code> and other data from your normal backup. This card only covers the "what did I install and how was it set up" part.' },

  { title:'Backup Apps: Déjà Dup, Pika, Vorta, Timeshift', icon:'🖱️', badge:'APPS', color:'blue',
    cmds:[
      ['sudo dnf install deja-dup','GNOME "Backups" (simple, encrypted, to disk or cloud)'],
      ['deja-dup --backup','Run a backup now'],
      ['deja-dup --restore ~/Documents/report.odt','Restore one file'],
      ['flatpak install flathub org.gnome.World.PikaBackup','Pika: Borg with a friendly GUI + schedule'],
      ['flatpak install flathub com.borgbase.Vorta','Vorta: Borg GUI with more options'],
      ['sudo dnf install timeshift','System snapshots (rsync mode on Fedora)'],
      ['sudo timeshift --create --comments "before upgrade"','Snapshot now'],
      ['sudo timeshift --list','Snapshots'],
      ["sudo timeshift --restore --snapshot '2026-09-30_10-15-02'",'Roll the system back'],
      ["sudo timeshift --delete --snapshot '2026-09-28_02-00-01'",'Delete one']],
    table:{head:['App','Best for'], rows:[
      ['Déjà Dup','Beginners: personal files'],
      ['Pika / Vorta','Fast, deduplicated Borg backups'],
      ['Timeshift','System files only (not home)'],
      ['restic / borg CLI','Scripts, servers, full control']]},
    flags:[
      ['--create --comments','Named snapshot'],
      ['--restore --snapshot','Pick a snapshot'],
      ['--check','Create one only if a scheduled one is due'],
      ['RSYNC mode','Needed on Fedora (Btrfs mode expects Ubuntu\'s @ layout)']],
    example:{cmd:'sudo timeshift --list', out:
`Device : /dev/sdb1
UUID   : 5c3e9a1f-0d2b-4e8a-9b71-2f6c0e8d4a13
Path   : /run/timeshift/41822/backup
Mode   : RSYNC
Status : OK
3 snapshots, 812.4 GB free

Num     Name                 Tags  Description
------------------------------------------------------------------------------
0    >  2026-09-28_02-00-01  D
1    >  2026-09-29_02-00-01  D
2    >  2026-09-30_10-15-02  O     before upgrade`} },

  { title:'Test Your Backups (Restore Drills)', icon:'🧪', badge:'VERIFY', color:'warn',
    cmds:[
      ['restic restore latest --target /tmp/restore-test --include ~/Documents','Restore a folder somewhere safe…'],
      ['diff -rq ~/Documents /tmp/restore-test$HOME/Documents','…and compare with the original'],
      ['restic check --read-data-subset=5%','Read + verify 5% of the data (rotate over time)'],
      ['borg check --verify-data','Verify every chunk (slow)'],
      ['rsync -acn --delete --itemize-changes ~/Documents/ /run/media/$USER/USB/home/Documents/','Compare a mirror by checksum (changes nothing)'],
      ['sha256sum -c SHA256SUMS','Archive files still intact?'],
      ["echo $(( ( $(date +%s) - $(date -d \"$(restic snapshots --latest 1 --json | jq -r '.[-1].time')\" +%s) ) / 86400 )) days",'Age of the newest backup'],
      ['journalctl --user -u restic-backup --since "7 days ago" -p warning','Any failures this week?']],
    flags:[
      ['--read-data-subset=N%','restic: part of the data per run'],
      ['--verify-data','borg: decrypt + check everything'],
      ['-c','rsync: compare contents, not dates'],
      ['-n','rsync: dry run'],
      ['*deleting / >f+++ / >fcs','Only on mirror / missing / different']],
    example:{cmd:'rsync -acn --delete --itemize-changes ~/Documents/ /run/media/$USER/USB/home/Documents/', out:
`*deleting   old.txt
.d..t...... ./
>fcs....... report2.txt
>f+++++++++ report3.txt`},
    tip:'A backup you have never restored from is only a hope. Do a small restore every month, and keep the <b>3-2-1</b> rule: 3 copies, 2 kinds of storage, 1 copy off-site.' }
);
})();

/* ═════════════════ MORE BACKUP II (v2.34) ═════════════════ */
(function () {
const b = window.FB_DATA.find(x => x.id === 'backup');
b.desc = 'restic, borg, rclone, off-site & append-only repos, usb drives, phones, vms, /etc history, alerts, snapshots, databases and restore drills';
const DEV = 'dev-disk-by\\x2duuid-5c3e9a1f\\x2d0d2b\\x2d4e8a\\x2d9b71\\x2d2f6c0e8d4a13.device';
b.cards.push(
  { title:'restic Power Moves', icon:'🦾', badge:'RESTIC+', color:'green',
    cmds:[
      ['restic snapshots --compact','Short list'],
      ['restic diff 3e06c457 32a5f7fd','What changed between two snapshots'],
      ['restic find "report*.odt"','Which snapshots contain a file'],
      ['restic dump latest /home/sooraj/Documents/notes.txt > notes.txt','Get one file back without a restore'],
      ['restic dump latest /home/sooraj/Documents > docs.tar','A whole folder as a tar'],
      ['restic tag --add before-upgrade latest','Label a snapshot'],
      ['restic snapshots --tag before-upgrade','Find it later'],
      ['sudo -u postgres pg_dumpall | restic backup --stdin --stdin-filename pg-all.sql --tag db','Back up a command\'s output directly'],
      ['restic backup --files-from ~/backup-list.txt','Only the paths listed in a file'],
      ["restic rewrite --exclude '*/.env' --forget",'Remove a secret you backed up by mistake…'],
      ['restic prune','…and free the space'],
      ['restic key add','Second password (e.g. for your partner)'],
      ['restic key list','Passwords on this repo'],
      ['restic -r sftp:nas:/srv/restic copy --from-repo /run/media/$USER/USB/restic','Copy snapshots to a second repo'],
      ['restic unlock','Remove a stale lock after a crash']],
    flags:[
      ['latest / <id>','Which snapshot'],
      ['--tag <t>','Filter or label'],
      ['--host <h> / --path <p>','Filter snapshots'],
      ['--stdin --stdin-filename','Save a stream as a file'],
      ['rewrite --forget','Replace the old snapshots'],
      ['--limit-upload 2048','KiB/s cap']],
    example:{cmd:"restic rewrite --exclude '*/.env' --forget latest", out:
`saved new snapshot 074fd4e7
removed old snapshot 9c28d364

modified 1 snapshots`},
    tip:'<code>rewrite</code> only hides the file from snapshots. Run <code>restic prune</code> afterwards so the data is really gone from the repo.' },

  { title:'What to Back Up (and What to Skip)', icon:'🎯', badge:'SCOPE', color:'blue',
    cmds:[
      ['du -sh ~/* ~/.[!.]* 2>/dev/null | sort -h | tail -15','Biggest things in your home'],
      ['du -sh ~/.cache ~/.local/share/Trash ~/.local/share/containers ~/.var/app 2>/dev/null','Usual space hogs'],
      ['find ~ -name CACHEDIR.TAG 2>/dev/null','Folders already marked "cache"'],
      ['nano ~/.config/restic/excludes','Write an exclude list (see code)'],
      ['restic backup --dry-run -vv --exclude-file ~/.config/restic/excludes --exclude-caches ~','Preview exactly what would be saved'],
      ["borg create --dry-run --list --exclude-caches ::test ~ | head",'Preview with Borg'],
      ['echo "Signature: 8a477f597d28d172789f06886806bc55" > ~/Games/CACHEDIR.TAG','Mark any folder to be skipped']],
    code:
`# ~/.config/restic/excludes  (restic pattern syntax)
/home/*/.cache
/home/*/.local/share/Trash
/home/*/.local/share/containers
/home/*/.local/share/Steam/steamapps
/home/*/.var/app/*/cache
/home/*/Downloads
node_modules
__pycache__
*.iso
*.qcow2`,
    table:{head:['Back up','Skip'], rows:[
      ['Documents, Pictures, Music','~/.cache, Trash'],
      ['~/.ssh, ~/.gnupg, keyrings','Downloads (re-downloadable)'],
      ['~/.config, dotfiles','Steam games, container images'],
      ['~/.var/app/*/data (Flatpak data)','node_modules, build output'],
      ['Database dumps','Running VM disks (see VM card)']]},
    flags:[
      ['--exclude-caches','Skip folders with CACHEDIR.TAG'],
      ['--exclude-file','restic: patterns from a file'],
      ['--exclude-larger-than 2G','restic: skip huge files'],
      ['--dry-run -vv','restic: list new + changed files']],
    example:{cmd:'restic backup --dry-run -vv --exclude-file ~/.config/restic/excludes ~ | grep -E "^new|Would add"', out:
`new       /home/sooraj/Documents/draft.txt, saved in 0.007s (3 B added)
new       /home/sooraj/proj/app.js, saved in 0.000s (2 B added)
Would add to the repository: 14.304 KiB (3.286 KiB stored)`} },

  { title:'Off-site Targets: S3, Backblaze B2, Storage Boxes', icon:'🌍', badge:'OFFSITE', color:'blue',
    cmds:[
      ['export AWS_ACCESS_KEY_ID=… AWS_SECRET_ACCESS_KEY=…','Keys for any S3-compatible storage'],
      ['restic -r s3:https://s3.eu-central-1.amazonaws.com/my-backups/laptop init','Amazon S3'],
      ['restic -r s3:https://s3.eu-central-003.backblazeb2.com/my-backups/laptop init','Backblaze B2 (S3 API, cheap)'],
      ['restic -r sftp://u123456@u123456.your-storagebox.de:23/restic init','Hetzner Storage Box via SFTP'],
      ['borg init -e repokey-blake2 ssh://u123456@u123456.your-storagebox.de:23/./borg','…or Borg on the same box'],
      ['restic -o s3.storage-class=STANDARD_IA backup ~','Cheaper storage class for rarely read data'],
      ['restic backup --limit-upload 2048 ~','Cap upload at 2 MiB/s'],
      ['rclone sync ~/Photos b2:my-photos --fast-list --transfers 8 -P','Plain file copy to B2 with rclone'],
      ['ssh-copy-id -p 23 u123456@u123456.your-storagebox.de','Key login for the Storage Box']],
    flags:[
      ['s3:https://<endpoint>/<bucket>/<path>','Any S3-compatible service'],
      ['sftp://user@host:port/path','Non-standard SSH port'],
      ['-o s3.storage-class=','STANDARD · STANDARD_IA · ONEZONE_IA'],
      ['--limit-upload / --limit-download','KiB/s'],
      ['--fast-list','rclone: fewer API calls (cheaper)']],
    example:{cmd:'restic -r s3:https://s3.eu-central-003.backblazeb2.com/my-backups/laptop init', out:
`created restic repository 9f8b22d9f7 at s3:https://s3.eu-central-003.backblazeb2.com/my-backups/laptop

Please note that knowledge of your password is required to access
the repository. Losing your password means that your data is
irrecoverably lost.`},
    tip:'Avoid "Glacier"/archive tiers for restic or Borg repos. They need to read old data during backups, and early deletion fees add up.' },

  { title:'Ransomware-Proof: Append-only & Restricted Keys', icon:'🛡️', badge:'IMMUTABLE', color:'red',
    cmds:[
      ['ssh-keygen -t ed25519 -f ~/.ssh/backup_key -N "" -C laptop-backup','A key used only for backups'],
      ['# On the server, put ONE of these lines in ~backup/.ssh/authorized_keys (see code)',''],
      ['borg create ssh://backup@nas/./laptop::{hostname}-{now} ~','Borg through the append-only key'],
      ['sudo dnf install rsync-rrsync','Server: restricted rsync helper'],
      ['rsync -a -e "ssh -i ~/.ssh/backup_key" ~/Documents/ backup@nas:Documents/','Client: path is inside the allowed folder'],
      ['podman run -d --name rest_server -p 8000:8000 -v /srv/restic:/data:Z -e OPTIONS="--append-only --private-repos" docker.io/restic/rest-server','restic REST server, append-only'],
      ['podman exec -it rest_server create_user laptop','Give the laptop its own login'],
      ['restic -r rest:http://laptop:PASSWORD@nas:8000/laptop/ init','Client repo on it'],
      ['restic -r /srv/restic/laptop forget --keep-daily 7 --keep-weekly 4 --prune','Clean up ON THE SERVER only'],
      ['sudo chattr +i /srv/archive/2026-09.tar.zst.age','Make a finished archive undeletable']],
    code:
`# ~backup/.ssh/authorized_keys on the NAS
# Borg: can add archives, cannot really delete, only inside one folder
command="borg serve --append-only --restrict-to-path /srv/borg/laptop",restrict ssh-ed25519 AAAAC3Nz… laptop-backup

# rsync: write-only, --delete refused
command="rrsync -wo -no-del /srv/backup/laptop",restrict ssh-ed25519 AAAAC3Nz… laptop-backup`,
    flags:[
      ['--append-only','Deletes are only logged, not done'],
      ['--restrict-to-path','Borg: stay in one repo'],
      ['rrsync -wo / -ro','Write-only / read-only'],
      ['rrsync -no-del','Refuse --delete'],
      ['--private-repos','rest-server: each user sees only /user/'],
      ['restrict','No shell, no port forwarding, no PTY']],
    example:{cmd:'rsync -a --delete -e "ssh -i ~/.ssh/backup_key" ~/Documents/ backup@nas:Documents/', out:
`/usr/bin/rrsync error: option --delete has been disabled on this server.
rsync: connection unexpectedly closed (0 bytes received so far) [sender]
rsync error: error in rsync protocol data stream (code 12) at io.c(232) [sender=3.4.1]`},
    tip:'Ransomware on the laptop can use any key the laptop has. With these restrictions it can add junk, but it cannot wipe the history. Prune from the server, never from the client.' },

  { title:'Plug-in USB Backup Drive (auto-run)', icon:'🔌', badge:'USB', color:'warn',
    cmds:[
      ['lsblk -f','Find the USB partition (e.g. sdb1)'],
      ['sudo cryptsetup luksFormat /dev/sdb1','Encrypt the backup drive (erases it!)'],
      ['sudo dd if=/dev/urandom of=/root/usbbackup.key bs=64 count=1 && sudo chmod 400 /root/usbbackup.key','Key file so backups run unattended'],
      ['sudo cryptsetup luksAddKey /dev/sdb1 /root/usbbackup.key','Let the key file unlock it too'],
      ['sudo blkid /dev/sdb1','Its UUID (TYPE="crypto_LUKS")'],
      ['systemd-escape -p --suffix=device /dev/disk/by-uuid/5c3e9a1f-0d2b-4e8a-9b71-2f6c0e8d4a13','Unit name for that disk'],
      ['sudo nano /usr/local/bin/usb-backup.sh && sudo chmod 755 /usr/local/bin/usb-backup.sh','The script (see code)'],
      ['sudo systemctl daemon-reload && sudo systemctl enable usb-backup.service','Run whenever that disk appears'],
      ['journalctl -u usb-backup -f','Watch it after plugging in'],
      ['udisksctl power-off -b /dev/sdb','Safely remove when done']],
    code:
`#!/bin/bash
# /usr/local/bin/usb-backup.sh
set -euo pipefail
UUID=5c3e9a1f-0d2b-4e8a-9b71-2f6c0e8d4a13
cryptsetup open /dev/disk/by-uuid/$UUID usbbackup --key-file /root/usbbackup.key
mkdir -p /mnt/usbbackup && mount /dev/mapper/usbbackup /mnt/usbbackup
restic -r /mnt/usbbackup/restic --password-file /root/restic-pass \\
  backup /home --exclude-caches
umount /mnt/usbbackup && cryptsetup close usbbackup

# /etc/systemd/system/usb-backup.service
[Unit]
Description=Back up when the backup disk is plugged in
BindsTo=${DEV}
After=${DEV}

[Service]
Type=oneshot
ExecStart=/usr/local/bin/usb-backup.sh

[Install]
WantedBy=${DEV}`,
    flags:[
      ['WantedBy=<disk>.device','Start when that exact disk shows up'],
      ['BindsTo=','Stop if the disk is pulled'],
      ['--key-file','Unlock without typing'],
      ['set -euo pipefail','Stop at the first error'],
      ['udisksctl power-off','Flush + spin down + detach']],
    example:{cmd:'systemd-escape -p --suffix=device /dev/disk/by-uuid/5c3e9a1f-0d2b-4e8a-9b71-2f6c0e8d4a13', out:
`${DEV}`},
    warn:'Anyone with root on this PC can read <code>/root/usbbackup.key</code>. That is fine against a lost USB stick, but keep it that way: never store the key on the drive itself.' },

  { title:'Back Up Phones (Android & iPhone)', icon:'📱', badge:'PHONE', color:'blue',
    cmds:[
      ['sudo dnf install android-tools','adb for Android'],
      ['adb devices','Phone connected? (allow USB debugging on the phone)'],
      ['adb pull -a /sdcard/DCIM/Camera ~/Phone/Camera','Copy all photos, keep dates'],
      ['adb pull -a /sdcard/WhatsApp/Media ~/Phone/WhatsApp','App media folder'],
      ['adb shell "du -sh /sdcard/*"','What is using space on the phone (quoted: runs on the phone)'],
      ['adb pair 192.168.1.50:37123','Wireless debugging (Android 11+): pair once…'],
      ['adb connect 192.168.1.50:41235','…then connect without a cable'],
      ['sudo dnf install libimobiledevice-utils ifuse','Tools for iPhone / iPad'],
      ['idevicepair pair','Trust this PC (unlock the phone first)'],
      ['idevicebackup2 encryption on','Encrypted backups (include saved passwords + health data)'],
      ['idevicebackup2 backup --full ~/iPhoneBackup','Full iPhone backup, like iTunes'],
      ['mkdir -p ~/iPhone && ifuse ~/iPhone','Mount the photo storage (DCIM)'],
      ['fusermount3 -u ~/iPhone','Unmount']],
    flags:[
      ['adb pull -a','Keep timestamps + modes'],
      ['adb pair / connect','Wireless debugging ports differ'],
      ['backup --full','iPhone: full, not incremental'],
      ['restore --system --settings','iPhone: put everything back'],
      ['idevicebackup2 list','What is in a backup']],
    example:{cmd:'idevicepair pair && adb devices', out:
`SUCCESS: Paired with device 00008110-001A2B3C4D5E801E
List of devices attached
R5CT21ABCDE	device`},
    tip:'Photos pulled to <code>~/Phone</code> are then part of your normal home backup. Run the phone copy first, then the restic or Borg job.' },

  { title:'Back Up Virtual Machines', icon:'🖥️', badge:'VM', color:'warn',
    cmds:[
      ['virsh domblklist f44','Which disk files the VM uses'],
      ['virsh dumpxml f44 > f44.xml','Save the VM definition'],
      ['virsh shutdown f44','Simplest: back up while it is off…'],
      ['sudo qemu-img convert -c -O qcow2 /var/lib/libvirt/images/f44.qcow2 /backup/f44-$(date +%F).qcow2','…compressed, only used space'],
      ['virsh snapshot-create-as f44 bk --disk-only --atomic --no-metadata','Live: freeze disk into an overlay'],
      ['sudo cp --sparse=always /var/lib/libvirt/images/f44.qcow2 /backup/','Copy the now-quiet base image'],
      ['virsh blockcommit f44 vda --active --pivot','Merge the overlay back'],
      ['sudo rm /var/lib/libvirt/images/f44.bk','Delete the overlay file'],
      ['virsh backup-begin f44','Or: libvirt\'s built-in live backup (writes next to the disk)'],
      ['virsh domjobinfo f44 --completed','Backup job result'],
      ['virsh define f44.xml','Restore: re-create the VM from its XML'],
      ['virsh -c qemu:///session list --all','GNOME Boxes VMs live here']],
    flags:[
      ['--disk-only','Snapshot disk, not RAM'],
      ['--quiesce','Flush guest filesystems (needs qemu-guest-agent)'],
      ['--no-metadata','Don\'t keep it in the snapshot list'],
      ['blockcommit --active --pivot','Merge overlay into base + switch'],
      ['qemu-img convert -c','Compress the copy']],
    example:{cmd:'virsh domblklist f44', out:
` Target   Source
------------------------------------------------
 vda      /var/lib/libvirt/images/f44.qcow2
 sda      -`},
    warn:'Never copy the disk of a running VM directly. The copy can be corrupt. Shut it down, or use the snapshot / backup-begin methods.' },

  { title:'/etc History with etckeeper', icon:'🗂️', badge:'ETC', color:'green',
    cmds:[
      ['sudo dnf install etckeeper etckeeper-dnf5','Git history for /etc + auto-commit on dnf'],
      ['sudo etckeeper init && sudo etckeeper commit "initial"','Start tracking'],
      ['sudo etckeeper commit "sshd: disable password logins"','Commit your own changes'],
      ['sudo git -C /etc log --oneline | head','History'],
      ['sudo git -C /etc diff HEAD~1 -- ssh/sshd_config','What changed in one file'],
      ['sudo git -C /etc checkout HEAD~1 -- ssh/sshd_config','Put a file back'],
      ['sudo rpm -Va --nomtime 2>/dev/null | grep "^..5.*  c /"','Config files that differ from the package'],
      ['sudo tar --selinux --acls --xattrs -czpf /root/etc-$(date +%F).tgz /etc','Plain /etc backup keeping SELinux labels']],
    flags:[
      ['etckeeper-dnf5','Commit before + after every dnf run'],
      ['git -C /etc','Run git in /etc from anywhere'],
      ['--selinux --acls --xattrs','Keep labels + permissions'],
      ['..5......  c','rpm -V: content changed, config file']],
    example:{cmd:'sudo git -C /etc log --oneline | head -4', out:
`a41c2f9 committing changes in /etc after dnf run
7be03d1 saving uncommitted changes in /etc prior to dnf run
3c9e0a2 sshd: disable password logins
e12f7b8 initial`},
    tip:'/etc can contain secrets (keys, Wi-Fi passwords). etckeeper keeps the git repo readable by root only, so never push it to a public remote.' },

  { title:'Backup Alerts: Desktop, ntfy & Healthchecks', icon:'🔔', badge:'ALERT', color:'red',
    cmds:[
      ['nano ~/.config/systemd/user/backup-failed.service','Failure handler (see code)'],
      ['systemctl --user edit restic-backup.service','Add OnFailure= + the success ping'],
      ['systemctl --user start backup-failed.service','Test the alert'],
      ['curl -d "Backup failed on $(hostname)" https://ntfy.sh/sooraj-backups-8f3k','Push to your phone (ntfy app, subscribe to the topic)'],
      ['curl -fsS -m 10 --retry 5 -o /dev/null https://hc-ping.com/YOUR-UUID','Healthchecks.io: "I ran OK"'],
      ['curl -fsS -m 10 --retry 5 -o /dev/null https://hc-ping.com/YOUR-UUID/fail','…or "I failed"'],
      ['notify-send -u critical "Backup failed" "journalctl --user -u restic-backup"','Desktop pop-up']],
    code:
`# ~/.config/systemd/user/backup-failed.service
[Unit]
Description=Tell me a backup failed

[Service]
Type=oneshot
ExecStart=/usr/bin/notify-send -u critical "Backup failed" "journalctl --user -u restic-backup"
ExecStart=/usr/bin/curl -fsS -m 10 -d "Backup failed on %H" https://ntfy.sh/sooraj-backups-8f3k

# systemctl --user edit restic-backup.service  → add:
[Unit]
OnFailure=backup-failed.service
[Service]
ExecStartPost=/usr/bin/curl -fsS -m 10 --retry 5 -o /dev/null https://hc-ping.com/YOUR-UUID`,
    flags:[
      ['OnFailure=','Start a unit when this one fails'],
      ['ExecStartPost=','Runs only after success'],
      ['hc-ping …/fail · /start','Healthchecks signals'],
      ['%H','Hostname (in unit files)'],
      ['-H "Priority: high"','ntfy: louder notification']],
    example:{cmd:'curl -d "Backup failed on laptop" https://ntfy.sh/sooraj-backups-8f3k', out:
`{"id":"hwQ2YpKdmg6p","time":1790755800,"expires":1790799000,"event":"message","topic":"sooraj-backups-8f3k","message":"Backup failed on laptop"}`},
    tip:'Healthchecks.io is a dead man\'s switch: it alerts you when the "OK" ping <b>stops</b> arriving, which catches a timer that silently never runs.' },

  { title:'Disaster Playbook: What to Restore, From Where', icon:'🧯', badge:'RECOVER', color:'red', flagsLabel:'Playbook', flagsHead:['What happened','Do this'],
    cmds:[
      ['sudo snapper -c home list','Deleted a file today? Check snapshots first'],
      ['sudo snapper -c home undochange 12..0 /home/sooraj/Documents/report.odt','Bring it back from snapshot 12'],
      ['restic find "report.odt"','Older than your snapshots? Find it in restic'],
      ['restic restore latest --target / --include /home/sooraj/Documents','Whole folder back in place'],
      ['restic restore latest --target /mnt/newhome','Lost the whole home disk: restore everything'],
      ['restic snapshots --host old-laptop','Stolen laptop: its snapshots, from a new PC'],
      ['borg list ssh://backup@nas/./laptop','Ransomware: pick an archive from before it started'],
      ['zstd -dc disk.img.zst | sudo dd of=/dev/nvme0n1 bs=4M status=progress','Dead disk: write the image to the new one']],
    flags:[
      ['Deleted / overwrote a file','Snapper snapshot → restic → Borg'],
      ['Bad update','Snapper root undochange, or older kernel in GRUB'],
      ['Disk died','New disk + restic restore (or disk image)'],
      ['Laptop stolen','New PC, restore + revoke its SSH keys'],
      ['Ransomware','Wipe, reinstall, restore from append-only repo'],
      ['Cloud account lost','Your local restic / Borg copy']],
    example:{cmd:'restic snapshots --host old-laptop --compact', out:
`ID        Time                 Host        Tags
-------------------------------------------------------
3e06c457  2026-09-28 00:21:02  old-laptop
32a5f7fd  2026-09-29 00:19:44  old-laptop
074fd4e7  2026-09-30 00:23:10  old-laptop  before-upgrade
-------------------------------------------------------
3 snapshots`},
    tip:'Write down (on paper) where your repos are and how to unlock them: passwords, key files, cloud logins. A backup you cannot open after a disaster does not help.' }
);
})();

/* ═════════════════ MORE ATOMIC (v2.35) ═════════════════ */
(function () {
const a = window.FB_DATA.find(x => x.id === 'atomic');
a.desc = 'silverblue, kinoite & other atomic desktops: rpm-ostree, layering, rpm fusion, kargs, deployments, auto-updates, bootc images and fixes';
a.cards.push(
  { title:'How Atomic Is Laid Out (/usr, /etc, /var)', icon:'🗺️', badge:'LAYOUT', color:'blue',
    cmds:[
      ['ls -l / | grep -- "->"','Folders that are really in /var'],
      ['touch /usr/test','Fails: /usr is read-only'],
      ['sudo ostree admin config-diff','Your changes to /etc vs the image defaults'],
      ['sudo ostree admin config-diff | grep "^A"','Files you added to /etc'],
      ['sudo rpm-ostree usroverlay','Temporary writable /usr (gone after reboot)'],
      ['ls /var/usrlocal/bin','Where /usr/local really lives'],
      ['rpm -qa | wc -l','rpm still works for queries'],
      ['cat /run/ostree-booted && echo "atomic system"','Detect an atomic system in scripts']],
    table:{head:['Path','Behaviour'], rows:[
      ['/usr','Read-only, replaced on every update'],
      ['/etc','Yours; merged 3-way with the new image'],
      ['/var','Yours; never touched by updates'],
      ['/home → /var/home','Your files'],
      ['/opt → /var/opt','Kept, but RPMs can\'t install there'],
      ['/usr/local → /var/usrlocal','Put your own scripts here']]},
    flags:[
      ['config-diff M / A / D','Modified / added / deleted in /etc'],
      ['usroverlay','Testing only; changes vanish at reboot'],
      ['/run/ostree-booted','Exists only on ostree systems']],
    example:{cmd:'ls -l / | grep -- "->"', out:
`lrwxrwxrwx.   1 root root    8 Sep 29 00:42 home -> var/home
lrwxrwxrwx.   1 root root    7 Sep 29 00:42 mnt -> var/mnt
lrwxrwxrwx.   1 root root    7 Sep 29 00:42 opt -> var/opt
lrwxrwxrwx.   1 root root   12 Sep 29 00:42 root -> var/roothome
lrwxrwxrwx.   1 root root    7 Sep 29 00:42 srv -> var/srv`},
    tip:'Everything in /usr comes from the image, so a broken system is always one <code>rpm-ostree rollback</code> away. Your /etc and /var changes carry over.' },

  { title:'Automatic Updates & Update Previews', icon:'🔄', badge:'UPDATES', color:'green',
    cmds:[
      ['rpm-ostree upgrade --check','Is there an update?'],
      ['rpm-ostree upgrade --preview','Which packages would change'],
      ['rpm-ostree upgrade','Download + stage (applies on next boot)'],
      ['rpm-ostree db diff','Booted vs staged: package changes'],
      ['rpm-ostree upgrade --reboot','Update and reboot right away'],
      ['sudo nano /etc/rpm-ostreed.conf','Set AutomaticUpdatePolicy (see code)'],
      ['rpm-ostree reload','Re-read the config'],
      ['sudo systemctl enable --now rpm-ostreed-automatic.timer','Turn on background staging'],
      ['rpm-ostree status | head -3','Shows the policy + last run'],
      ['rpm-ostree cleanup -p','Throw away a staged update']],
    code:
`# /etc/rpm-ostreed.conf
[Daemon]
AutomaticUpdatePolicy=stage
#   none  = off
#   check = only look for updates
#   stage = download + prepare; applied at your next reboot`,
    flags:[
      ['--check','Only check'],
      ['--preview','Check + list package changes'],
      ['-r / --reboot','Reboot when done'],
      ['db diff <a> <b>','Compare any two commits'],
      ['cleanup -p','Remove the pending deployment']],
    example:{cmd:'rpm-ostree db diff', out:
`ostree diff commit from: booted deployment (7c2e0d5a)
ostree diff commit to:   pending deployment (a91f33c0)
Upgraded:
  firefox 143.0-1.fc44 -> 143.0.1-1.fc44
  kernel 6.19.7-200.fc44 -> 6.19.8-200.fc44
  kernel-core 6.19.7-200.fc44 -> 6.19.8-200.fc44
  mesa-dri-drivers 26.1.2-1.fc44 -> 26.1.3-1.fc44`},
    tip:'GNOME Software (and Discover on KDE) already stages updates for you. Use the timer on servers, or if you turned those off.' },

  { title:'Layering: Local RPMs, Repos & COPR', icon:'🧅', badge:'LAYER', color:'warn',
    cmds:[
      ['rpm-ostree install ./mytool-1.2-1.fc44.x86_64.rpm','Layer a downloaded RPM'],
      ['sudo nano /etc/yum.repos.d/vscode.repo','Add a vendor repo (see code)'],
      ['rpm-ostree install code','Then layer from it'],
      ['sudo curl -Lo /etc/yum.repos.d/atim-starship.repo https://copr.fedorainfracloud.org/coprs/atim/starship/repo/fedora-$(rpm -E %fedora)/atim-starship-fedora-$(rpm -E %fedora).repo','Add a COPR (dnf copr isn\'t available)'],
      ['rpm-ostree install starship',''],
      ['rpm-ostree install --idempotent --allow-inactive htop','No error if already there / already in base'],
      ['rpm-ostree install -A htop','Also apply live, no reboot (simple packages)'],
      ['sudo rpm-ostree apply-live','Apply the pending layer change now'],
      ['rpm-ostree status -v','LayeredPackages, LocalPackages, overrides'],
      ['rpm-ostree reset --overlays','Remove ALL layered packages']],
    code:
`# /etc/yum.repos.d/vscode.repo
[code]
name=Visual Studio Code
baseurl=https://packages.microsoft.com/yumrepos/vscode
enabled=1
gpgcheck=1
gpgkey=https://packages.microsoft.com/keys/microsoft.asc`,
    flags:[
      ['--idempotent','Don\'t fail if already requested'],
      ['--allow-inactive','Allow packages the base already has'],
      ['-A / --apply-live','Apply without reboot'],
      ['reset --overlays','Drop layers, keep overrides'],
      ['LocalPackages','Layered from a file: never auto-updated!']],
    example:{cmd:'rpm-ostree status -v | grep -E "Layered|Local|Removed|Replaced"', out:
`          LayeredPackages: code htop starship
            LocalPackages: mytool-1.2-1.fc44.x86_64
      RemovedBasePackages: firefox firefox-langpacks 143.0.1-1.fc44`},
    warn:'Every layered package slows down updates and can block them when it conflicts with a new Fedora release. Prefer Flatpak, Toolbox or Distrobox.' },

  { title:'RPM Fusion, Codecs & NVIDIA (Atomic)', icon:'🎞️', badge:'FUSION', color:'red',
    cmds:[
      ['rpm-ostree install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm','1. Add RPM Fusion'],
      ['systemctl reboot',''],
      ['rpm-ostree update --uninstall rpmfusion-free-release --uninstall rpmfusion-nonfree-release --install rpmfusion-free-release --install rpmfusion-nonfree-release','2. Switch to repo-tracked release pkgs (survive Fedora upgrades)'],
      ['rpm-ostree override remove mesa-va-drivers --install mesa-va-drivers-freeworld --install libavcodec-freeworld','3. Hardware video + more codecs'],
      ['rpm-ostree install akmod-nvidia xorg-x11-drv-nvidia xorg-x11-drv-nvidia-cuda','NVIDIA driver'],
      ['rpm-ostree kargs --append=rd.driver.blacklist=nouveau --append=modprobe.blacklist=nouveau','Keep nouveau out'],
      ['systemctl reboot',''],
      ['modinfo -F version nvidia','Driver built?'],
      ['nvidia-smi','Working?']],
    flags:[
      ['--uninstall X --install X','Same name, now from the repo instead of a URL'],
      ['override remove … --install …','Swap base packages in one step'],
      ['*-freeworld','RPM Fusion builds with patent-encumbered codecs'],
      ['rd.driver.blacklist','Blocks the module in the initramfs too']],
    example:{cmd:'rpm-ostree status | sed -n "3,9p"', out:
`● fedora:fedora/44/x86_64/silverblue
                  Version: 44.20260929.0 (2026-09-29T00:42:11Z)
               BaseCommit: 7c2e0d5a…
      RemovedBasePackages: mesa-va-drivers 26.1.3-1.fc44
          LayeredPackages: akmod-nvidia libavcodec-freeworld mesa-va-drivers-freeworld rpmfusion-free-release
                           rpmfusion-nonfree-release xorg-x11-drv-nvidia xorg-x11-drv-nvidia-cuda`},
    tip:'Many people skip all of this: Flatpak apps (Firefox, VLC, mpv) bring their own codecs, and GPU decoding works through the Flathub runtime extensions. With Secure Boot on, see Hardware → Secure Boot & MOK before the NVIDIA step.' },

  { title:'Kernel Arguments, initramfs & Bootloader', icon:'🥾', badge:'KARGS', color:'warn',
    cmds:[
      ['rpm-ostree kargs','Current kernel command line'],
      ['rpm-ostree kargs --append=amd_pstate=active','Add one'],
      ['rpm-ostree kargs --delete=rhgb --delete=quiet','Show boot messages instead of the splash'],
      ['rpm-ostree kargs --append-if-missing=quiet','Add only if absent (scripts)'],
      ['rpm-ostree kargs --replace=mitigations=auto','Change a value'],
      ['rpm-ostree kargs --editor','Edit all of them in $EDITOR'],
      ['rpm-ostree initramfs-etc --track=/etc/crypttab','Copy an /etc file into the initramfs'],
      ['rpm-ostree initramfs --enable','Build the initramfs locally (slower updates)'],
      ['rpm-ostree initramfs --disable','Back to the image\'s initramfs'],
      ['sudo bootupctl status','Bootloader (shim/GRUB) version'],
      ['sudo bootupctl update','Update shim + GRUB (not automatic on atomic!)']],
    flags:[
      ['--append / --delete','Add / remove an argument'],
      ['--replace=KEY=NEW','Change a value'],
      ['--append-if-missing / --delete-if-present','Idempotent versions'],
      ['initramfs-etc --track','Keep a file in sync with the initramfs'],
      ['--untrack / --untrack-all','Stop tracking']],
    example:{cmd:'sudo bootupctl status', out:
`Component EFI
  Installed: grub2-efi-x64-1:2.12-40.fc44.x86_64,shim-x64-15.8-5.x86_64
  Update: At latest version
No components are adoptable.
Boot method: EFI`},
    tip:'Kernel argument changes create a new deployment. If a new argument breaks booting, pick the previous entry in GRUB: it still has the old arguments.' },

  { title:'Deployments, Pinning & Downgrades', icon:'📌', badge:'DEPLOY', color:'blue',
    cmds:[
      ['ostree admin status','All deployments (booted marked *)'],
      ['sudo ostree admin pin 1','Keep the rollback deployment forever'],
      ['sudo ostree admin pin --unpin 2','Unpin'],
      ['sudo ostree pull --commit-metadata-only --depth=10 fedora:fedora/44/x86_64/silverblue','Fetch recent history…'],
      ['ostree log fedora:fedora/44/x86_64/silverblue | grep -E "^commit|Version"','…and list older versions'],
      ['rpm-ostree deploy 44.20260915.0','Go to a specific older version'],
      ['rpm-ostree db diff 7c2e0d5a a91f33c0','Package changes between two commits'],
      ['rpm-ostree cleanup -r','Delete the rollback deployment (frees space)'],
      ['rpm-ostree cleanup -b','Delete old base commits'],
      ['df -h /sysroot','Space used by deployments']],
    flags:[
      ['pin <index>','0 = first in the list'],
      ['deploy <version>','Pinned version, even older'],
      ['upgrade after deploy','Returns to the newest'],
      ['cleanup -r / -p / -b / -m','rollback · pending · base · metadata']],
    example:{cmd:'ostree admin status', out:
`* fedora 7c2e0d5a4b1e9f2c3d8a6e0b7f5c1a2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b.0
    Version: 44.20260929.0
    origin refspec: fedora:fedora/44/x86_64/silverblue
  fedora 41a9bb135d2c7e8f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f.0 (rollback)
    Version: 44.20260926.0
    Pinned: yes
    origin refspec: fedora:fedora/44/x86_64/silverblue`},
    tip:'Before a big change (a rebase, a new Fedora release), pin the working deployment. Updates will then never delete it.' },

  { title:'Your Own Image with bootc', icon:'🏗️', badge:'BOOTC', color:'green',
    cmds:[
      ['mkdir my-image && cd my-image && nano Containerfile','Describe your system (see code)'],
      ['sudo podman build -t localhost/my-silverblue:44 .','Build it (as root: bootc reads root\'s storage)'],
      ['sudo bootc switch --transport containers-storage localhost/my-silverblue:44','Boot into it on this PC'],
      ['systemctl reboot',''],
      ['sudo podman build -t localhost/my-silverblue:44 . && sudo bootc upgrade','Change something later, rebuild, stage'],
      ['sudo podman login ghcr.io','Log in as root (the image is in root\'s storage)'],
      ['sudo podman push localhost/my-silverblue:44 ghcr.io/sooraj/my-silverblue:44','Publish for your other PCs'],
      ['sudo bootc switch ghcr.io/sooraj/my-silverblue:44','Other PCs follow the registry image'],
      ['sudo bootc upgrade --apply','Update + reboot if there is one'],
      ['sudo podman run --rm -it --privileged -v ./output:/output -v /var/lib/containers/storage:/var/lib/containers/storage quay.io/centos-bootc/bootc-image-builder:latest --type iso localhost/my-silverblue:44','Installer ISO from your image']],
    code:
`# Containerfile
FROM quay.io/fedora/fedora-silverblue:44

RUN dnf -y install htop tmux zsh distrobox \\
 && dnf -y remove firefox firefox-langpacks \\
 && dnf clean all

COPY etc/ /etc/
RUN systemctl enable podman.socket

RUN bootc container lint`,
    flags:[
      ['--transport containers-storage','Use a locally built image'],
      ['--apply','Reboot into the update'],
      ['bootc container lint','Catch common mistakes at build time'],
      ['--type iso | qcow2 | raw','bootc-image-builder outputs']],
    example:{cmd:'sudo bootc status --format=humanreadable', out:
`● Booted image: containers-storage:localhost/my-silverblue:44
        Digest: sha256:4be1…77d0
       Version: 44.20260929.0 (2026-09-30T08:12:40Z)

  Rollback image: quay.io/fedora/fedora-silverblue:44
        Version: 44.20260929.0 (2026-09-29T00:42:11Z)`},
    tip:'A CI job (GitHub Actions) can rebuild the image every night on top of the latest Fedora image. Your PCs then update like stock Silverblue, with your changes included.' },

  { title:'Universal Blue Images (Bazzite, Bluefin, Aurora)', icon:'🌌', badge:'UBLUE', color:'blue',
    cmds:[
      ['rpm-ostree rebase ostree-unverified-registry:ghcr.io/ublue-os/bazzite:stable','1. Rebase (gaming image)'],
      ['systemctl reboot',''],
      ['rpm-ostree rebase ostree-image-signed:docker://ghcr.io/ublue-os/bazzite:stable','2. Switch to the signed image'],
      ['ujust','List the image\'s helper recipes'],
      ['ujust --choose','Pick one from a menu'],
      ['ujust update','Update system, Flatpaks + distroboxes'],
      ['rpm-ostree rebase fedora:fedora/44/x86_64/silverblue','Back to stock Fedora Silverblue']],
    table:{head:['Image','For'], rows:[
      ['bazzite','Gaming (Steam, HDR, handhelds)'],
      ['bluefin','Developers, GNOME'],
      ['aurora','Developers, KDE'],
      ['silverblue-main / kinoite-main','Fedora + codecs + drivers']]},
    flags:[
      ['ostree-unverified-registry:','First hop (no signing policy yet)'],
      ['ostree-image-signed:docker://','Verified with the image\'s key'],
      [':stable / :latest','Update channel'],
      ['-nvidia images','Driver already built in']],
    example:{cmd:'rpm-ostree status | sed -n "3,5p"', out:
`● ostree-image-signed:docker://ghcr.io/ublue-os/bazzite:stable
                   Digest: sha256:c09e…51f2
                  Version: 44.20260929 (2026-09-29T05:13:28Z)`},
    warn:'These are community images built on Fedora, not official Fedora editions. Pin your current deployment before rebasing.' },

  { title:'Develop Without Layering', icon:'🧰', badge:'DEV', color:'green',
    cmds:[
      ['toolbox run -c fedora-toolbox-44 make','Run one command in a toolbox'],
      ['flatpak-spawn --host podman ps','Inside a toolbox: run a host command'],
      ['distrobox-export --bin /usr/bin/rg --export-path ~/.local/bin','Use a container tool from the host'],
      ['distrobox assemble create --file ~/distrobox.ini','Create boxes from a file (see code)'],
      ['distrobox assemble create --replace --file ~/distrobox.ini','Rebuild them fresh'],
      ['[ -f /run/.toolboxenv ] && echo "inside toolbox"','Detect toolbox in scripts'],
      ['systemd-sysext status','System extensions (experimental on Fedora Atomic)']],
    code:
`# ~/distrobox.ini
[dev]
image=registry.fedoraproject.org/fedora-toolbox:44
additional_packages="gcc make git ripgrep nodejs"
exported_bins="/usr/bin/rg"
exported_bins_path="~/.local/bin"
init_hooks="ln -sf /usr/bin/distrobox-host-exec /usr/local/bin/podman"

[ubuntu]
image=docker.io/library/ubuntu:24.04
additional_packages="build-essential"`,
    flags:[
      ['toolbox run -c <name>','Command without entering'],
      ['flatpak-spawn --host','Escape to the host'],
      ['distrobox-export --app / --bin','Export GUI app / CLI tool'],
      ['distrobox-host-exec','Run a host command from a distrobox'],
      ['assemble --replace','Delete + recreate']],
    example:{cmd:'toolbox run -c fedora-toolbox-44 sh -c \'[ -f /run/.toolboxenv ] && echo "inside toolbox: $(. /etc/os-release; echo $PRETTY_NAME)"\'', out:
`inside toolbox: Fedora Linux 44 (Container Image)`},
    tip:'Your home folder is shared with every toolbox and distrobox, so code and dotfiles are the same everywhere. Only the installed software differs.' },

  { title:'Fix Atomic Update Problems', icon:'🧯', badge:'FIX', color:'red', flagsLabel:'Diagnosis', flagsHead:['If you see','Do this'],
    cmds:[
      ['rpm-ostree status -v','What is booted, staged, layered'],
      ['journalctl -u rpm-ostreed -b --no-pager | tail -30','Daemon errors'],
      ['rpm-ostree cancel','Stop a stuck transaction'],
      ['sudo systemctl restart rpm-ostreed','Restart the daemon'],
      ['rpm-ostree refresh-md -f','Force-refresh repo metadata'],
      ['rpm-ostree cleanup -m','Clear cached metadata'],
      ['rpm-ostree uninstall <pkg>','Remove the layered package that blocks the update'],
      ['rpm-ostree reset --overlays','Nuclear: drop every layered package'],
      ['sudo ostree fsck','Check the ostree repo for corruption'],
      ['rpm-ostree cleanup -r -b','Free space in /sysroot']],
    flags:[
      ['"Could not depsolve" / "conflicts with"','Layered package vs new base → uninstall it or wait'],
      ['"Transaction in progress"','rpm-ostree cancel'],
      ['"Packages not found" after a release upgrade','Layered pkg gone from repos → uninstall'],
      ['rpmfusion-release version conflict','Do the --uninstall/--install switch (RPM Fusion card)'],
      ['"No space left on device"','cleanup -r -b, remove old pins'],
      ['New deployment won\'t boot','Pick the previous entry in GRUB → rpm-ostree rollback']],
    example:{cmd:'rpm-ostree upgrade', out:
`Checking out tree 8f31c0a... done
Enabled rpm-md repositories: fedora-cisco-openh264 updates fedora rpmfusion-free rpmfusion-free-updates
Importing rpm-md... done
error: Could not depsolve transaction; 1 problem detected:
 Problem: package ffmpeg-libs-7.1.2-3.fc44.x86_64 from rpmfusion-free-updates conflicts with libavcodec-free provided by libavcodec-free-7.1.2-4.fc44.x86_64 from @System`},
    tip:'Most update failures come from layered packages. The fewer you layer, the fewer surprises at every Fedora release.' }
);
})();

/* ═════════════════ DISTRO UI (v2.36): Atomic → Distro UI + desktop environments ═════════════════ */
(function () {
const a = window.FB_DATA.find(x => x.id === 'atomic');
a.icon = '🪟';
a.title = 'Distro UI';
a.sub = 'Desktops & atomic';
a.desc = 'every fedora desktop — gnome, kde plasma, xfce, cinnamon, mate, sway, i3, niri, cosmic — login screens, plus atomic editions (silverblue, kinoite) and bootc';
const ui = [
  { title:'Fedora Desktops at a Glance', icon:'🧭', badge:'START', color:'green', tableFirst:true,
    table:{head:['Desktop','Login screen','Atomic'], rows:[
      ['GNOME','GDM','Silverblue'],
      ['KDE Plasma','Plasma Login','Kinoite'],
      ['Xfce','LightDM','—'],
      ['Cinnamon','LightDM','—'],
      ['MATE','LightDM','—'],
      ['LXQt','SDDM','—'],
      ['Budgie','LightDM','Budgie Atomic'],
      ['Sway','SDDM','Sway Atomic'],
      ['i3','LightDM','—'],
      ['COSMIC','cosmic-greeter','COSMIC Atomic']]},
    cmds:[
      ['loginctl show-session "$XDG_SESSION_ID" -p Desktop -p Type','Which desktop + Wayland or X11'],
      ['dnf environment list','Every desktop you can install'],
      ['sudo dnf install @mate-desktop-environment','MATE'],
      ['sudo dnf install @lxqt-desktop-environment','LXQt (very light)'],
      ['sudo dnf install @budgie-desktop-environment','Budgie'],
      ['sudo dnf install @i3-desktop-environment','i3 (tiling, X11)'],
      ['sudo dnf install @cosmic-desktop-environment','COSMIC (System76, Rust)'],
      ['rpm-ostree rebase fedora:fedora/44/x86_64/cosmic-atomic','Atomic: switch the whole image instead']],
    flags:[
      ['@<name>-desktop-environment','Install a full desktop'],
      ['Editions','Workstation (GNOME) + KDE Plasma Desktop'],
      ['Spins','Official images with another desktop preinstalled'],
      ['*-atomic / silverblue / kinoite','Image-based versions (see cards below)']],
    example:{cmd:'loginctl show-session "$XDG_SESSION_ID" -p Desktop -p Type', out:
`Type=wayland
Desktop=GNOME`},
    tip:'Installing and switching desktops (GNOME, KDE, Xfce, Cinnamon, Sway) is also covered in Desktop → Other Desktops & Sessions. The cards below show the commands each desktop understands.' },

  { title:'GNOME Shell Power Tools', icon:'👣', badge:'GNOME', color:'blue',
    cmds:[
      ['gnome-shell --version','GNOME version'],
      ['gdbus call --session --dest org.gnome.Shell.Extensions --object-path /org/gnome/Shell/Extensions --method org.gnome.Shell.Extensions.InstallRemoteExtension "blur-my-shell@aunetx"','Install an extension from extensions.gnome.org by UUID'],
      ['gnome-extensions install --force ~/Downloads/blur-my-shell@aunetx.shell-extension.zip','Install from a zip (log out + in)'],
      ['gnome-extensions prefs blur-my-shell@aunetx','Open its settings'],
      ['gnome-extensions info blur-my-shell@aunetx','Version, state, path'],
      ['journalctl -b /usr/bin/gnome-shell -p warning --no-pager | tail -20','Shell + extension errors'],
      ['gsettings get org.gnome.shell favorite-apps','Apps pinned in the dash'],
      ["gsettings set org.gnome.shell favorite-apps \"['org.mozilla.firefox.desktop', 'org.gnome.Nautilus.desktop', 'org.gnome.Ptyxis.desktop']\"",'Set the dash'],
      ["gsettings set org.gnome.mutter experimental-features \"['variable-refresh-rate', 'scale-monitor-framebuffer']\"",'VRR + fractional scaling'],
      ['gnome-session-inhibit --inhibit idle:suspend --reason "Presentation" sleep 3600','Stay awake for an hour'],
      ['# Alt+F2 → lg → Looking Glass: inspector + JavaScript console','']],
    flags:[
      ['InstallRemoteExtension','Same as the browser "Install" button (asks first)'],
      ['install --force','Overwrite an existing version'],
      ['experimental-features','A list: include every feature you want'],
      ['--inhibit idle:suspend','Colon-separated list'],
      ['/usr/bin/gnome-shell','journalctl filter by program']],
    example:{cmd:'gnome-extensions info blur-my-shell@aunetx', out:
`blur-my-shell@aunetx
  Name: Blur my Shell
  Description: Adds a blur look to different parts of the GNOME Shell, including the top panel, dash and overview.
  Path: /home/sooraj/.local/share/gnome-shell/extensions/blur-my-shell@aunetx
  URL: https://github.com/aunetx/blur-my-shell
  Version: 69
  Enabled: Yes
  State: ACTIVE`},
    tip:'Fedora\'s GNOME is Wayland-only now, so X11 tools like xdotool and xrandr do not work on it. Use gsettings, gdctl and gnome-extensions instead.' },

  { title:'KDE Plasma Commands', icon:'💠', badge:'KDE', color:'blue',
    cmds:[
      ['plasmashell --version','Plasma version'],
      ['plasma-apply-colorscheme BreezeDark','Dark colours'],
      ['plasma-apply-lookandfeel -a org.kde.breezedark.desktop','Full Global Theme'],
      ['plasma-apply-wallpaperimage ~/Pictures/wall.jpg','Wallpaper'],
      ['plasma-apply-cursortheme breeze_cursors','Cursor theme'],
      ['kreadconfig6 --file kdeglobals --group General --key ColorScheme','Read any KDE setting'],
      ['kwriteconfig6 --file kwinrc --group Plugins --key blurEnabled false','Write one (here: turn off blur)'],
      ['qdbus-qt6 org.kde.KWin /KWin reconfigure','Make KWin reload its config'],
      ['systemctl --user restart plasma-plasmashell','Frozen panel / desktop? Restart it'],
      ['kscreen-doctor -o','Displays'],
      ['kscreen-doctor output.DP-1.mode.2560x1440@144 output.DP-1.scale.1.25','Set mode + scale'],
      ['balooctl6 status','File indexer status'],
      ['balooctl6 disable','Turn the indexer off (saves CPU/disk)'],
      ['kbuildsycoca6 --noincremental','Rebuild the app menu cache']],
    flags:[
      ['--file / --group / --key','Config file in ~/.config, [Group], key'],
      ['kwriteconfig6 --delete','Remove a key (back to default)'],
      ['qdbus-qt6','Fedora\'s name for qdbus (Qt 6)'],
      ['output.<name>.<prop>.<value>','kscreen-doctor syntax'],
      ['plasma-apply-* --list-*','See what you can apply']],
    example:{cmd:'kscreen-doctor -o', out:
`Output: 1 eDP-1
	enabled
	connected
	priority 1
	Panel
	Modes:  0:2880x1800@120*!  1:2880x1800@60  2:1920x1200@120
	Geometry: 0,0 2304x1440
	Scale: 1.25
	Rotation: 1`},
    tip:'Plasma keeps settings in plain text files in <code>~/.config</code> (kdeglobals, kwinrc, plasma-org.kde.plasma.desktop-appletsrc). Back those up to keep your layout.' },

  { title:'Xfce Commands (xfconf)', icon:'🐭', badge:'XFCE', color:'green',
    cmds:[
      ['xfconf-query -l','All settings channels'],
      ['xfconf-query -c xfwm4 -l -v','Every window manager setting + value'],
      ['xfconf-query -c xsettings -p /Net/ThemeName -s Adwaita-dark','GTK theme'],
      ['xfconf-query -c xsettings -p /Net/IconThemeName -s Adwaita','Icons'],
      ['xfconf-query -c xfwm4 -p /general/use_compositing -s false','Compositor off (games / old GPUs)'],
      ['xfconf-query -c xfce4-desktop -m','Watch changes: then change a setting in the GUI to learn its name'],
      ['xfconf-query -c xfce4-panel -p /panels/panel-1/size -s 32','Panel height'],
      ['xfce4-panel -r','Restart the panel'],
      ['xfwm4 --replace &','Restart the window manager'],
      ['xfce4-screenshooter -r','Screenshot of a region'],
      ['xfce4-session-logout --logout','Log out']],
    flags:[
      ['-c <channel>','Settings group'],
      ['-p <property>','Setting path'],
      ['-s <value>','Set'],
      ['-n -t bool|int|string','Create a new property with a type'],
      ['-r / -R','Reset (recursive)'],
      ['-m','Monitor changes live']],
    example:{cmd:'xfconf-query -l', out:
`Channels:
  displays
  keyboards
  pointers
  thunar
  xfce4-desktop
  xfce4-keyboard-shortcuts
  xfce4-panel
  xfce4-power-manager
  xfce4-session
  xfwm4
  xsettings`},
    tip:'<code>xfconf-query -m</code> is the easiest way to find a setting: run it, click the option in Settings, and it prints the exact channel and property.' },

  { title:'Cinnamon & MATE Commands', icon:'🌿', badge:'CINNAMON', color:'green',
    cmds:[
      ['cinnamon --version','Cinnamon version'],
      ["gsettings set org.cinnamon.desktop.interface gtk-theme 'Adwaita-dark'",'Cinnamon: app theme'],
      ['gsettings set org.cinnamon.desktop.background picture-uri "file://$HOME/Pictures/wall.jpg"','Cinnamon: wallpaper'],
      ['cinnamon-settings themes','Open one Settings page directly'],
      ['# Ctrl+Alt+Esc restarts Cinnamon if it freezes',''],
      ['cinnamon-screensaver-command --lock','Lock the screen'],
      ['cinnamon-session-quit --logout --no-prompt','Log out'],
      ['dconf dump /org/cinnamon/ > cinnamon.ini','Back up all Cinnamon settings'],
      ["gsettings set org.mate.interface gtk-theme 'BlueMenta'",'MATE: theme'],
      ['gsettings set org.mate.background picture-filename ~/Pictures/wall.jpg','MATE: wallpaper'],
      ['mate-panel --replace &','MATE: restart the panel'],
      ['dconf dump /org/mate/ > mate.ini','Back up MATE settings']],
    flags:[
      ['org.cinnamon.*','Cinnamon gsettings schemas'],
      ['org.mate.*','MATE gsettings schemas'],
      ['cinnamon-settings <module>','themes, applets, display, keyboard…'],
      ['--no-prompt','Skip the confirm dialog']],
    example:{cmd:'gsettings list-schemas | grep -c "^org.cinnamon"', out:
`48`},
    tip:'Both are X11 desktops built on the same gsettings system as GNOME, so every trick from the Desktop section (dconf dump / load, gsettings list-recursively) works. Just use their own schema names.' },

  { title:'Sway & i3 (Tiling)', icon:'🧱', badge:'SWAY', color:'warn',
    cmds:[
      ['mkdir -p ~/.config/sway && cp /etc/sway/config ~/.config/sway/','Start from the default config'],
      ['swaymsg reload','Apply config changes'],
      ['swaymsg -t get_outputs','Monitors, modes, scale'],
      ['swaymsg output eDP-1 scale 1.5','Change scale now'],
      ['swaymsg -t get_inputs | grep -i identifier','Input device IDs (for input blocks)'],
      ["swaymsg -t get_tree | jq -r '.. | select(.focused? == true) | .app_id'",'app_id of the focused window (for rules)'],
      ['grim -g "$(slurp)" shot.png','Screenshot a region'],
      ['swaylock -f -c 000000','Lock'],
      ['i3-msg reload','i3: reload config'],
      ['i3-msg restart','i3: restart in place (keeps windows)'],
      ["i3-msg -t get_workspaces | jq -r '.[].name'",'i3: workspace names']],
    code:
`# ~/.config/sway/config  (additions)
output eDP-1 scale 1.5
input type:touchpad {
    tap enabled
    natural_scroll enabled
}
bindsym $mod+Shift+s exec grim -g "$(slurp)" ~/Pictures/shot-$(date +%F_%H%M%S).png
exec swayidle -w timeout 300 'swaylock -f -c 000000' before-sleep 'swaylock -f -c 000000'
for_window [app_id="org.gnome.Calculator"] floating enable`,
    flags:[
      ['-t get_outputs / get_inputs / get_tree','Query'],
      ['-t get_workspaces','Workspaces (JSON)'],
      ['for_window [app_id=…]','Per-app rules (Wayland apps)'],
      ['[class=…]','Rules for X11 / i3 apps'],
      ['$mod','Usually Mod4 = Super key']],
    example:{cmd:'swaymsg -t get_outputs', out:
`Output eDP-1 'BOE 0x0BCA Unknown' (focused)
  Current mode: 2880x1800 @ 120.000 Hz
  Power: on
  Position: 0,0
  Scale factor: 1.500000
  Scale filter: smart
  Subpixel hinting: unknown
  Transform: normal
  Workspace: 1
  Max render time: off
  Adaptive sync: disabled`} },

  { title:'Scrolling & Dynamic Tiling: niri, Hyprland', icon:'🌀', badge:'NIRI', color:'blue',
    cmds:[
      ['sudo dnf install niri','niri (in Fedora repos)'],
      ['niri validate','Check ~/.config/niri/config.kdl for mistakes'],
      ['niri msg outputs','Monitors'],
      ['niri msg windows','Open windows + app IDs'],
      ['niri msg action focus-workspace 2','Run any action from a script'],
      ['niri msg action screenshot','Screenshot UI'],
      ['sudo dnf copr enable solopasha/hyprland','Hyprland: community COPR (not in Fedora 44 repos)'],
      ['sudo dnf install hyprland',''],
      ['hyprctl monitors','Hyprland: monitors'],
      ['hyprctl keyword monitor eDP-1,preferred,auto,1.5','Change scale live'],
      ['hyprctl clients','Windows'],
      ['hyprctl reload','Re-read hyprland.conf']],
    code:
`// ~/.config/niri/config.kdl  (additions)
output "eDP-1" {
    scale 1.5
}
input {
    touchpad {
        tap
        natural-scroll
    }
}
binds {
    Mod+T { spawn "ptyxis"; }
    Mod+Shift+S { screenshot; }
}`,
    flags:[
      ['niri msg <query>','outputs · workspaces · windows · focused-window'],
      ['niri msg action <name>','Same actions as key bindings'],
      ['hyprctl keyword <k> <v>','Change a setting until reload'],
      ['hyprctl dispatch <cmd>','Run a dispatcher (workspace 2, exec …)']],
    example:{cmd:'niri msg outputs', out:
`Output "BOE 0x0BCA Unknown" (eDP-1)
  Current mode: 2880x1800 @ 120.000 Hz (preferred)
  Variable refresh rate: not supported
  Physical size: 300x190 mm
  Logical position: 0, 0
  Logical size: 1920x1200
  Scale: 1.5
  Transform: normal`},
    warn:'Hyprland was dropped from Fedora\'s own repos after Fedora 42. The COPR is community-run, so check it before trusting it. niri is fully packaged.' },

  { title:'COSMIC, LXQt & Budgie', icon:'🚀', badge:'COSMIC', color:'blue',
    cmds:[
      ['cosmic-settings','COSMIC Settings app'],
      ['ls ~/.config/cosmic/','COSMIC keeps each setting as a small file'],
      ['cat ~/.config/cosmic/com.system76.CosmicTheme.Mode/v1/is_dark','Dark mode on?'],
      ['echo true > ~/.config/cosmic/com.system76.CosmicTheme.Mode/v1/is_dark','Switch to dark from a script'],
      ['cosmic-randr list','COSMIC: displays'],
      ['# COSMIC: Super+Y toggles auto-tiling',''],
      ['lxqt-config','LXQt settings centre'],
      ['ls ~/.config/lxqt/','LXQt settings (plain .conf files)'],
      ['lxqt-leave --logout','LXQt: log out'],
      ['budgie-desktop-settings','Budgie settings']],
    flags:[
      ['~/.config/cosmic/<id>/v1/<key>','One file per COSMIC setting'],
      ['com.system76.CosmicSettings.Shortcuts','COSMIC shortcuts folder'],
      ['~/.config/lxqt/*.conf','LXQt: panel.conf, session.conf, lxqt.conf'],
      ['@lxqt-desktop-environment','Lightest full desktop in Fedora']],
    example:{cmd:'ls ~/.config/cosmic/ | head -6', out:
`com.system76.CosmicAppList
com.system76.CosmicBackground
com.system76.CosmicComp
com.system76.CosmicPanel.Panel
com.system76.CosmicSettings.Shortcuts
com.system76.CosmicTheme.Mode`} },

  { title:'Change the Login Screen (Display Manager)', icon:'🚪', badge:'LOGIN', color:'red',
    cmds:[
      ['readlink /etc/systemd/system/display-manager.service','Which login manager is active'],
      ['sudo systemctl enable --force gdm','Use GDM (GNOME)'],
      ['sudo systemctl enable --force plasmalogin','Use Plasma Login Manager (KDE, Fedora 44)'],
      ['sudo dnf install sddm sddm-kcm sddm-wayland-plasma && sudo systemctl enable --force sddm','Back to SDDM (custom themes)'],
      ['sudo dnf install lightdm lightdm-gtk && sudo systemctl enable --force lightdm','LightDM (light)'],
      ['systemctl reboot','Takes effect after reboot'],
      ['sudo nano /etc/sddm.conf.d/autologin.conf','SDDM auto-login (see code)'],
      ['sudo nano /etc/lightdm/lightdm.conf','LightDM auto-login (see code)']],
    code:
`# /etc/sddm.conf.d/autologin.conf
[Autologin]
User=sooraj
Session=plasma

# /etc/lightdm/lightdm.conf  (under the existing [Seat:*] section)
[Seat:*]
autologin-user=sooraj
autologin-session=xfce`,
    flags:[
      ['enable --force','Replace the current display-manager alias'],
      ['gdm · plasmalogin · sddm · lightdm','Service names'],
      ['Session=','Name of a file in /usr/share/wayland-sessions or xsessions'],
      ['Plasma Login','Breeze look only; SDDM for custom themes']],
    example:{cmd:'readlink /etc/systemd/system/display-manager.service', out:
`/usr/lib/systemd/system/gdm.service`},
    warn:'Only one login manager can be active. If you get a black screen after switching, press Ctrl+Alt+F3, log in, and re-enable the previous one.' },

  { title:'Tools That Work on Every Desktop', icon:'🔧', badge:'ANY', color:'green',
    cmds:[
      ['env | grep -E "^XDG_(CURRENT_DESKTOP|SESSION_TYPE|SESSION_DESKTOP)="','Desktop + session details'],
      ['xdg-settings get default-web-browser','Default browser'],
      ['xdg-settings set default-web-browser org.mozilla.firefox.desktop','Change it'],
      ['gtk-launch org.gnome.Calculator','Start an app by its .desktop ID'],
      ['xdg-open .','Open this folder in the file manager'],
      ['loginctl lock-session','Lock the screen (any desktop)'],
      ['systemctl --user status xdg-desktop-portal --no-pager','Portals (file pickers, screen sharing)'],
      ['ls /usr/share/xdg-desktop-portal/','Which portal backend each desktop uses'],
      ['sudo dnf install xlsclients && xlsclients','Apps still running through XWayland'],
      ['sudo dnf install wayland-utils && wayland-info | grep -c interface','Wayland protocols your desktop supports']],
    flags:[
      ['XDG_CURRENT_DESKTOP','GNOME · KDE · XFCE · X-Cinnamon · MATE · sway · niri · COSMIC'],
      ['XDG_SESSION_TYPE','wayland or x11'],
      ['*-portals.conf','Per-desktop portal choice'],
      ['gtk-launch <id>','ID = file name without .desktop']],
    example:{cmd:'env | grep -E "^XDG_(CURRENT_DESKTOP|SESSION_TYPE|SESSION_DESKTOP)="', out:
`XDG_CURRENT_DESKTOP=KDE
XDG_SESSION_DESKTOP=KDE
XDG_SESSION_TYPE=wayland`},
    tip:'Screen sharing or file dialogs broken in a Flatpak? The desktop\'s portal backend is usually missing or crashed. Restart it with <code>systemctl --user restart xdg-desktop-portal</code>.' }
];
a.cards.unshift(...ui);
})();

/* ═════════════════ MORE FLATPAK (v2.37) ═════════════════ */
(function () {
const f = window.FB_DATA.find(x => x.id === 'flatpak');
f.desc = 'flatpak apps: search, permissions, portals, updates & rollback, remotes, offline usb, theming, building + rpm and dev tools';
const i = f.cards.findIndex(c => c.title === 'Flatpak') + 1;
f.cards.splice(i, 0,
  { title:'Find, Inspect & Compare Apps', icon:'🔎', badge:'INFO', color:'blue',
    cmds:[
      ['flatpak search --columns=application,name,version,remotes editor','Search with chosen columns'],
      ['flatpak remote-info flathub org.gimp.GIMP','Version, size, runtime before installing'],
      ['flatpak info org.gimp.GIMP','Installed app details'],
      ['flatpak info -M org.gimp.GIMP','Its permissions (what it can reach)'],
      ['flatpak info --file-access=~/Documents org.gimp.GIMP','Can it read/write this folder?'],
      ['flatpak list --app --columns=application,version,size,installation','Your apps with size'],
      ['flatpak list --runtime --columns=application,branch,size','Runtimes (shared libraries)'],
      ['flatpak list --app --app-runtime=org.gnome.Platform//49','Which apps use this runtime'],
      ['flatpak remote-ls flathub --updates','Updates waiting']],
    flags:[
      ['--columns=help','All available columns'],
      ['-M / --show-permissions','Permissions from the app + overrides'],
      ['--file-access=PATH','read-write / read-only / hidden'],
      ['--app / --runtime','Only apps / only runtimes'],
      ['--app-runtime=ID//BRANCH','Apps built on that runtime']],
    example:{cmd:'flatpak info -M org.gimp.GIMP', out:
`[Context]
shared=network;ipc;
sockets=x11;wayland;fallback-x11;pulseaudio;
devices=dri;
filesystems=xdg-config/GIMP;/tmp;xdg-config/gtk-3.0;host;

[Session Bus Policy]
org.gtk.vfs.*=talk
org.freedesktop.FileManager1=talk

[Environment]
GIMP3_PLUGINDIR=/app/lib/gimp/3.0`},
    tip:'On Flathub, the green "Safe" / orange "Potentially unsafe" badge on each app page summarises the same permissions <code>flatpak info -M</code> shows.' },

  { title:'Permission Overrides (Sandbox Tuning)', icon:'🔐', badge:'OVERRIDE', color:'red',
    cmds:[
      ['flatpak override --user --show org.telegram.desktop','Your changes for one app'],
      ['flatpak override --user --filesystem=~/Games:ro com.valvesoftware.Steam','Give read-only access to a folder'],
      ['flatpak override --user --nofilesystem=home org.telegram.desktop','Take away home access'],
      ['flatpak override --user --nosocket=x11 --socket=wayland org.telegram.desktop','Wayland only'],
      ['flatpak override --user --unshare=network org.gnome.TextEditor','No internet for this app'],
      ['flatpak override --user --device=all org.chromium.Chromium','USB/webcam/controller access'],
      ['flatpak override --user --env=GTK_THEME=Adwaita:dark org.gimp.GIMP','Set an environment variable'],
      ['flatpak override --user --talk-name=org.freedesktop.Notifications org.example.App','Allow one D-Bus service'],
      ['flatpak override --user --nofilesystem=host','Global: no app sees the whole disk'],
      ['flatpak override --user --reset org.telegram.desktop','Undo all overrides for one app'],
      ['flatpak install flathub com.github.tchx84.Flatseal','GUI for all of this']],
    flags:[
      ['--filesystem=home|host|~/dir[:ro]','Grant folders (:ro read-only, :create make it)'],
      ['xdg-download / xdg-documents / xdg-config/…','Named folders'],
      ['--nofilesystem / --nosocket / --nodevice','Remove'],
      ['--socket=wayland|x11|pulseaudio|ssh-auth','Sockets'],
      ['--share / --unshare=network|ipc','Network / IPC'],
      ['--user vs sudo (system)','Your override vs everyone\'s']],
    example:{cmd:'flatpak override --user --show org.example.App', out:
`[Context]
sockets=!x11;wayland;
devices=dri;
filesystems=!home;~/Games:ro;

[Session Bus Policy]
org.freedesktop.Notifications=talk

[Environment]
GTK_THEME=Adwaita:dark`},
    tip:'Leave out the app ID to make an override global: <code>flatpak override --user --nofilesystem=host</code> applies to every app. The <code>!</code> in the output means "removed".' },

  { title:'Portals: Permission Store & Documents', icon:'🚪', badge:'PORTAL', color:'blue',
    cmds:[
      ['flatpak permissions','Everything apps asked for through portals'],
      ['flatpak permission-show org.mozilla.firefox','One app: background, notifications, screenshots…'],
      ['flatpak permission-reset org.mozilla.firefox','Forget its answers (it will ask again)'],
      ['flatpak permission-remove background background org.telegram.desktop','Revoke "run in background"'],
      ['flatpak documents','Files shared with apps via the file picker'],
      ['flatpak document-export --app=org.gimp.GIMP -r -w ~/Pictures/big.psd','Give one app one file (no folder access needed)'],
      ['ls /run/user/$UID/doc/','Where shared documents appear inside apps'],
      ['systemctl --user restart xdg-desktop-portal','Fix broken file pickers / screen sharing']],
    flags:[
      ['Tables','background · notifications · screenshot · devices · location…'],
      ['permission-reset <app>','Clear all portal answers for it'],
      ['document-export -r / -w','Read / write permission'],
      ['--transient','Share only until you log out']],
    example:{cmd:'flatpak permission-show org.mozilla.firefox', out:
`Table         Object       App                 Permissions Data
background    background   org.mozilla.firefox yes         0x00
notifications notification org.mozilla.firefox yes         0x00
devices       camera       org.mozilla.firefox yes         0x00`},
    tip:'Portals are why a sandboxed app without home access can still open any file you pick in the file dialog: you grant it one file at a time.' },

  { title:'Updates, Rollback & Pinning', icon:'⏮️', badge:'UPDATE', color:'warn',
    cmds:[
      ['flatpak update -y','Update everything'],
      ['flatpak update org.gimp.GIMP','Update one app'],
      ['flatpak history --columns=time,change,application,branch | tail','What changed recently'],
      ['flatpak remote-info --log flathub org.gimp.GIMP','Older commits of an app'],
      ['sudo flatpak update --commit=5d1a0c3e9f… org.gimp.GIMP','Downgrade to one of those commits'],
      ['flatpak mask org.gimp.GIMP','Freeze it: no more updates'],
      ['flatpak mask','List masks'],
      ['flatpak mask --remove org.gimp.GIMP','Unfreeze'],
      ['flatpak pin runtime/org.gnome.Platform/x86_64/48','Keep an old runtime from auto-removal'],
      ['flatpak pin --remove runtime/org.gnome.Platform/x86_64/48','Unpin'],
      ['flatpak uninstall --unused','Remove runtimes nothing uses anymore']],
    flags:[
      ['--commit=<hash>','Install that exact version'],
      ['mask <pattern>','Wildcards ok: org.kde.*'],
      ['pin <ref>','Protect from --unused'],
      ['--no-related','Skip locales / GL extensions'],
      ['--noninteractive','Scripts / timers']],
    example:{cmd:'flatpak history --columns=time,change,application,branch | tail -4', out:
`Sep 27 21:04:11  update     org.gimp.GIMP                  stable
Sep 27 21:04:15  update     org.gnome.Platform             49
Sep 29 20:11:52  install    com.github.tchx84.Flatseal     stable
Sep 30 09:02:30  update     org.mozilla.firefox            stable`},
    tip:'A new version broke an app? Find the previous commit with <code>remote-info --log</code>, install it with <code>--commit</code>, then <code>mask</code> it until the fix lands.' },

  { title:'Run Options & Debugging', icon:'🐛', badge:'DEBUG', color:'green',
    cmds:[
      ['flatpak run --command=sh org.gimp.GIMP','Shell inside the app\'s sandbox'],
      ['flatpak ps --columns=instance,application,pid','Running Flatpak apps'],
      ['flatpak enter 2839041765 sh','Join a running app\'s sandbox'],
      ['flatpak kill org.gimp.GIMP','Force-quit it'],
      ['flatpak run --filesystem=~/Projects org.gnome.TextEditor','One-time extra permission'],
      ['flatpak run --unshare=network org.example.App','Run offline this once'],
      ['flatpak run --env=GTK_DEBUG=interactive org.gnome.TextEditor','GTK inspector'],
      ['flatpak run --log-session-bus org.example.App','See its D-Bus calls'],
      ['flatpak run -v org.example.App','Verbose start-up (why won\'t it launch?)'],
      ['flatpak run --devel --command=gdb org.example.App','Debug with the SDK (install the .Debug extension)'],
      ['flatpak-spawn --host ls /','From inside: run a host command (if allowed)']],
    flags:[
      ['--command=<cmd>','Something other than the app'],
      ['--devel','Use the SDK instead of the runtime'],
      ['--sandbox','Strip every permission'],
      ['--env=VAR=value','Just this run'],
      ['--file-forwarding','Pass file args through the document portal']],
    example:{cmd:'flatpak ps --columns=instance,application,pid', out:
`Instance   Application           PID
2839041765 org.gimp.GIMP         48210
1702233551 org.mozilla.firefox   5531
3914502278 org.telegram.desktop  7098`} },

  { title:'App Data, Cache & Disk Space', icon:'💾', badge:'DATA', color:'blue',
    cmds:[
      ['ls ~/.var/app/','Per-app folders (config, data, cache)'],
      ['du -sh ~/.var/app/* 2>/dev/null | sort -h | tail -5','Which apps store the most'],
      ['du -sh ~/.var/app/*/cache 2>/dev/null | sort -h | tail -5','Biggest caches'],
      ['rm -rf ~/.var/app/org.mozilla.firefox/cache/*','Clear one app\'s cache (app closed)'],
      ['du -sh /var/lib/flatpak ~/.local/share/flatpak 2>/dev/null','System vs user installs'],
      ['flatpak list --columns=application,size | sort -k2 -h | tail','Biggest installs'],
      ['flatpak uninstall --delete-data org.telegram.desktop','Remove app AND its ~/.var/app data'],
      ['flatpak uninstall --unused','Remove orphaned runtimes'],
      ['flatpak repair','Fix a damaged install (system)'],
      ['flatpak repair --user','Fix user install']],
    table:{head:['Inside the app','On your disk'], rows:[
      ['$XDG_CONFIG_HOME','~/.var/app/<id>/config'],
      ['$XDG_DATA_HOME','~/.var/app/<id>/data'],
      ['$XDG_CACHE_HOME','~/.var/app/<id>/cache'],
      ['/app','/var/lib/flatpak/app/<id>/…']]},
    flags:[
      ['--delete-data','Also delete ~/.var/app/<id>'],
      ['repair','Verify + re-download broken objects'],
      ['~/.var/app','Back this up to keep app settings']],
    example:{cmd:'du -sh ~/.var/app/* | sort -h | tail -4', out:
`312M	/home/sooraj/.var/app/org.gimp.GIMP
1.4G	/home/sooraj/.var/app/org.telegram.desktop
2.1G	/home/sooraj/.var/app/org.mozilla.firefox
18G	/home/sooraj/.var/app/com.valvesoftware.Steam`} },

  { title:'Remotes & User vs System Installs', icon:'🌐', badge:'REMOTES', color:'warn',
    cmds:[
      ['flatpak remotes --columns=name,title,url,priority,options','Configured sources'],
      ['flatpak remote-modify --enable flathub','Turn Flathub back on if it is disabled'],
      ['flatpak remote-modify --subset=verified flathub','Only apps verified by their developers'],
      ['flatpak remote-modify --disable fedora','Stop using Fedora\'s own Flatpaks'],
      ['flatpak remote-modify --prio=2 flathub','Prefer Flathub when both have an app'],
      ['flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo','Beta apps'],
      ['flatpak install flathub-beta org.gimp.GIMP','Beta version side by side'],
      ['flatpak make-current org.gimp.GIMP stable','Which branch "flatpak run" starts'],
      ['flatpak remote-add --user --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo','Flathub just for your user (no sudo)'],
      ['flatpak install --user flathub org.gnome.Podcasts','Install into your home'],
      ['flatpak list --columns=application,installation','Which apps are user vs system']],
    flags:[
      ['--subset=verified','Hide unverified apps'],
      ['--prio=N','Higher wins'],
      ['--user / --system','~/.local/share/flatpak vs /var/lib/flatpak'],
      ['fedora (oci+https://registry…)','Fedora-built Flatpaks remote'],
      ['make-current <app> <branch>','stable / beta']],
    example:{cmd:'flatpak remotes --columns=name,title,url,priority,options', out:
`Name    Title           URL                                    Priority Options
fedora  Fedora Flatpaks oci+https://registry.fedoraproject.org 1        system,oci
flathub Flathub         https://dl.flathub.org/repo/           2        system`},
    tip:'The same app from "fedora" and "flathub" are different builds. If one misbehaves, try the other; remove the first so you don\'t end up with two icons.' },

  { title:'Offline, USB & Bundles', icon:'🧳', badge:'OFFLINE', color:'green',
    cmds:[
      ['flatpak create-usb /run/media/$USER/USB org.gimp.GIMP','Copy an app + its runtime to a USB stick'],
      ['flatpak install --sideload-repo=/run/media/$USER/USB/.ostree/repo flathub org.gimp.GIMP','Install from that stick on an offline PC'],
      ['flatpak build-bundle /var/lib/flatpak/repo gimp.flatpak org.gimp.GIMP stable --runtime-repo=https://flathub.org/repo/flathub.flatpakrepo','Single-file .flatpak from an installed app'],
      ['flatpak install --bundle gimp.flatpak','Install a .flatpak file'],
      ['flatpak install --from https://example.com/app.flatpakref','Install from a .flatpakref link'],
      ['flatpak install --or-update -y flathub org.gimp.GIMP','Install or update (scripts)'],
      ['flatpak list --app --columns=application > flatpaks.txt','Save your app list…'],
      ['xargs -a flatpaks.txt flatpak install -y flathub','…reinstall on another PC']],
    flags:[
      ['create-usb <mount> <ref>','Includes dependencies'],
      ['--sideload-repo=<path>','Use local copies first'],
      ['--runtime-repo=<url>','Bundle knows where to get its runtime'],
      ['--bundle / --from','.flatpak / .flatpakref'],
      ['--or-update','No error if already installed']],
    example:{cmd:'flatpak install --bundle gimp.flatpak', out:
`Required runtime for org.gimp.GIMP/x86_64/stable (runtime/org.gnome.Platform/x86_64/49) found in remote flathub
Do you want to install it? [Y/n]: y

org.gimp.GIMP permissions:
    ipc      network      fallback-x11      pulseaudio      wayland      x11      dri
    file access [1]       dbus access [2]

        ID                          Branch    Op   Remote            Download
 1. [✓] org.gnome.Platform          49        i    flathub           310.2 MB / 382.9 MB
 2. [✓] org.gimp.GIMP               stable    i    gimp-origin       0 bytes

Installation complete.`} },

  { title:'Themes, Fonts & Cursors in Flatpaks', icon:'🎨', badge:'THEME', color:'blue',
    cmds:[
      ['flatpak install flathub org.gtk.Gtk3theme.adw-gtk3-dark','GTK3 apps match modern GNOME (dark)'],
      ['flatpak override --user --env=GTK_THEME=Adwaita:dark','Force dark GTK for all apps'],
      ['flatpak override --user --filesystem=xdg-config/gtk-4.0:ro','Let apps read your GTK4 CSS tweaks'],
      ['flatpak override --user --filesystem=xdg-data/icons:ro','Your icon + cursor themes'],
      ['flatpak override --user --env=XCURSOR_PATH=$HOME/.local/share/icons:/usr/share/icons','Cursor themes for X11/Xwayland apps'],
      ['flatpak search --columns=application Gtk3theme | head','Available GTK3 theme packs'],
      ['flatpak install flathub org.kde.KStyle.Adwaita','Qt/KDE apps with the Adwaita style'],
      ['fc-list | grep -c ~/.local/share/fonts','Your fonts: Flatpaks see ~/.local/share/fonts automatically']],
    flags:[
      ['org.gtk.Gtk3theme.<name>','Theme as a Flatpak extension'],
      ['GTK_THEME=Name:dark','Theme + variant'],
      ['xdg-config/gtk-4.0:ro','Read-only access to GTK4 settings'],
      ['org.kde.KStyle.*','Qt styles as extensions']],
    example:{cmd:'flatpak list --runtime --columns=application | grep -i theme', out:
`org.gtk.Gtk3theme.adw-gtk3
org.gtk.Gtk3theme.adw-gtk3-dark`},
    tip:'Global overrides (no app ID) apply to every Flatpak app, and per-app overrides still win over them.' },

  { title:'Build Your Own Flatpak (flatpak-builder)', icon:'🏗️', badge:'BUILD', color:'warn',
    cmds:[
      ['flatpak install flathub org.flatpak.Builder','flatpak-builder + linter, always current'],
      ['flatpak install flathub org.freedesktop.Platform//25.08 org.freedesktop.Sdk//25.08','Runtime + SDK the manifest uses'],
      ['nano org.example.Hello.yml','Write the manifest (see code)'],
      ['flatpak run org.flatpak.Builder --user --install --force-clean build-dir org.example.Hello.yml','Build + install for your user'],
      ['flatpak run org.example.Hello','Run it'],
      ['flatpak run --command=flatpak-builder-lint org.flatpak.Builder manifest org.example.Hello.yml','Lint (Flathub rules)'],
      ['flatpak run org.flatpak.Builder --repo=repo --force-clean build-dir org.example.Hello.yml','Build into a local repo…'],
      ['flatpak build-bundle repo hello.flatpak org.example.Hello','…and make a shareable .flatpak']],
    code:
`# org.example.Hello.yml
id: org.example.Hello
runtime: org.freedesktop.Platform
runtime-version: '25.08'
sdk: org.freedesktop.Sdk
command: hello.sh
finish-args:
  - --share=network
  - --socket=wayland
modules:
  - name: hello
    buildsystem: simple
    build-commands:
      - install -Dm755 hello.sh /app/bin/hello.sh
    sources:
      - type: file
        path: hello.sh`,
    flags:[
      ['--user --install','Install straight after building'],
      ['--force-clean','Wipe build-dir first'],
      ['--repo=<dir>','Export to an OSTree repo'],
      ['finish-args','The app\'s permissions'],
      ['buildsystem: simple | meson | cmake-ninja | autotools','How the module is built']],
    example:{cmd:'flatpak run org.example.Hello', out:
`Hello from inside the sandbox: NAME="Freedesktop SDK"`} },

  { title:'Fix Common Flatpak Problems', icon:'🧯', badge:'FIX', color:'red', flagsLabel:'Diagnosis', flagsHead:['If you see','Do this'],
    cmds:[
      ['flatpak run -v org.example.App 2>&1 | tail -20','Why it won\'t start'],
      ['flatpak update','Many GPU/driver errors are fixed by matching GL extensions'],
      ['flatpak list --runtime | grep -i GL','Installed GL drivers (NVIDIA must match the host driver)'],
      ['flatpak repair','Corrupted files'],
      ['flatpak override --user --reset org.example.App','Undo your permission changes'],
      ['mv ~/.var/app/org.example.App ~/.var/app/org.example.App.bak','Test with fresh settings'],
      ['systemctl --user restart xdg-desktop-portal','File picker / screen share broken'],
      ['flatpak remotes','"No remote refs found" → is flathub listed and enabled?']],
    flags:[
      ['"No remote refs found similar to …"','Remote missing/disabled → remote-add or --enable'],
      ['App can\'t see my files','Use the file picker, or --filesystem override'],
      ['Wrong / light theme in GTK3 apps','Install the matching Gtk3theme extension'],
      ['"Failed to open display" / blank window','Check sockets: wayland / fallback-x11'],
      ['Game/3D very slow on NVIDIA','flatpak update to get GL.nvidia-<your version>'],
      ['Disk full of runtimes','flatpak uninstall --unused']],
    example:{cmd:'flatpak list --runtime --columns=application,branch | grep -i GL', out:
`org.freedesktop.Platform.GL.default        25.08
org.freedesktop.Platform.GL.default        25.08-extra
org.freedesktop.Platform.GL.nvidia-580-82-09   1.4`},
    tip:'After a host NVIDIA driver update, Flatpak games only use the GPU once <code>flatpak update</code> has pulled the matching GL.nvidia extension.' }
);
})();

/* ═════════════════ MORE CONTAINERS (v2.38) ═════════════════ */
(function () {
const c = window.FB_DATA.find(x => x.id === 'containers');
c.desc = 'podman images, containers, pods, networks, healthchecks, secrets, builds, buildah & skopeo, compose, kube yaml, quadlet apps, security and toolbox';
const at = c.cards.findIndex(x => /Toolbox/.test(x.title));
c.cards.splice(at, 0,
  { title:'Inspect & Debug Running Containers', icon:'🔬', badge:'DEBUG', color:'blue',
    cmds:[
      ['podman ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"','Custom columns'],
      ['podman top web pid user args','Processes inside a container'],
      ['podman diff web','Files changed since it started (A/C/D)'],
      ['podman port web','Published ports'],
      ["podman inspect web --format '{{.State.Status}} {{.RestartCount}} {{.HostConfig.Memory}}'",'Pick fields from inspect'],
      ['podman inspect web | jq ".[0].Mounts"','Or the full JSON with jq'],
      ['podman logs --since 10m --timestamps web','Recent logs with times'],
      ['podman stats --no-stream --format "table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}"','Resource use'],
      ['podman events --since 1h --filter container=web','Start/stop/health events'],
      ['podman exec -it -u 0 web sh','Root shell even if the image uses another user'],
      ['podman commit web localhost/web-debug:1','Freeze a broken container as an image to study']],
    flags:[
      ['--format "{{.Field}}"','Go templates on ps, inspect, images, stats'],
      ['diff A / C / D','Added / changed / deleted'],
      ['logs --since / --until / -t','Time filters, timestamps'],
      ['events --filter','container= · event= · type='],
      ['exec -u 0','Run as root inside']],
    example:{cmd:'podman diff web', out:
`A /etc
A /www
A /www/index.html`} },

  { title:'Healthchecks & Self-Healing', icon:'❤️‍🩹', badge:'HEALTH', color:'green',
    cmds:[
      ["podman run -d --name web -p 8080:80 --health-cmd 'wget -q -O /dev/null http://localhost/ || exit 1' --health-interval 10s --health-retries 3 --health-start-period 5s docker.io/library/nginx",'Check the app every 10 s'],
      ['podman healthcheck run web','Run the check now (exit 0 = healthy)'],
      ['podman ps','STATUS shows (healthy) / (unhealthy)'],
      ["podman inspect web --format '{{.State.Health.Status}}'",'Just the health'],
      ['podman run -d --health-cmd "curl -fs localhost:3000/health" --health-on-failure=restart myapp','Restart it automatically when unhealthy'],
      ['podman run -d --restart=unless-stopped myapp','Restart after crashes / reboots'],
      ['systemctl --user enable podman-restart.service','Rootless: needed for --restart=always after reboot'],
      ['podman build --format docker -t myapp .','Keep HEALTHCHECK lines from a Containerfile']],
    flags:[
      ['--health-cmd','Command; exit 0 = healthy'],
      ['--health-interval / -retries / -timeout','How often, how many fails, how long'],
      ['--health-start-period','Grace time while the app boots'],
      ['--health-on-failure=none|kill|restart|stop','What to do when unhealthy'],
      ['--restart=no|on-failure|always|unless-stopped','Restart policy']],
    example:{cmd:'podman ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"', out:
`NAMES       STATUS                  PORTS
web         Up 2 seconds (healthy)  0.0.0.0:8080->80/tcp`},
    warn:'A <code>HEALTHCHECK</code> line in a Containerfile is silently dropped with the default OCI format. Build with <code>--format docker</code>, or set it at run time with <code>--health-cmd</code>.' },

  { title:'Secrets & Environment Files', icon:'🗝️', badge:'SECRETS', color:'red',
    cmds:[
      ["printf 's3cr3t-pass' | podman secret create dbpass -",'Store a secret (not in shell history)'],
      ['podman secret create tlskey ./server.key','From a file'],
      ['podman secret ls','List (values are never shown)'],
      ['podman run --secret dbpass myimage cat /run/secrets/dbpass','As a file inside'],
      ['podman run --secret dbpass,type=env,target=POSTGRES_PASSWORD docker.io/library/postgres:17','As an environment variable'],
      ['podman run --env-file ./app.env myimage','Many variables from a file'],
      ['podman secret rm dbpass','Delete'],
      ['# Quadlet: Secret=dbpass,type=env,target=POSTGRES_PASSWORD','']],
    flags:[
      ['--secret <name>','Mounted at /run/secrets/<name>'],
      ['type=env,target=VAR','Expose as an environment variable'],
      ['target=/path','Custom mount path (file type)'],
      ['--env-file','KEY=value lines'],
      ['secret create -','Read from stdin']],
    example:{cmd:'podman run --rm --secret dbpass,type=env,target=DB_PASSWORD registry.fedoraproject.org/fedora-minimal:44 sh -c \'echo "DB_PASSWORD=$DB_PASSWORD"\'', out:
`DB_PASSWORD=s3cr3t-pass`},
    tip:'Secrets never end up in <code>podman inspect</code> output or in images you commit, unlike <code>-e PASSWORD=…</code>.' },

  { title:'Better Builds: Multi-stage, Args & Cache', icon:'🏭', badge:'BUILD', color:'warn',
    cmds:[
      ['podman build -t localhost/site:1.0 .','Build from ./Containerfile (see code)'],
      ['podman build --build-arg VERSION=1.2 -t app:1.2 .','Pass ARG values'],
      ['podman build --target build -t app:build .','Stop at one stage (debugging)'],
      ['podman build --no-cache --pull=newer -t app .','Fresh build with the newest base'],
      ['podman build -f Containerfile.prod -t app:prod .','Another Containerfile'],
      ['echo -e ".git\\nnode_modules\\n*.log" > .containerignore','Keep junk out of the build context'],
      ['podman history localhost/site:1.0','Layers + sizes'],
      ['podman image inspect localhost/site:1.0 --format "{{.Size}}"','Final size in bytes'],
      ['podman build --platform linux/amd64,linux/arm64 --manifest localhost/app:1 .','Multi-arch (needs qemu-user-static)'],
      ['podman manifest push localhost/app:1 docker://quay.io/sooraj/app:1','Push both architectures']],
    code:
`# Containerfile
FROM registry.fedoraproject.org/fedora:44 AS build
RUN dnf -y install hugo && dnf clean all
COPY . /src
RUN hugo --source /src --destination /out

FROM registry.access.redhat.com/ubi9/nginx-124
COPY --from=build /out /opt/app-root/src
EXPOSE 8080
USER 1001
CMD ["nginx", "-g", "daemon off;"]`,
    flags:[
      ['FROM … AS <name>','Name a stage'],
      ['COPY --from=<stage>','Take only the results'],
      ['--build-arg K=V','Fill in ARG K'],
      ['--target <stage>','Build up to that stage'],
      ['--pull=always|newer|never','Base image refresh'],
      ['--format docker','Keep HEALTHCHECK, SHELL, ONBUILD']],
    example:{cmd:'podman history localhost/site:1.0 --format "{{.CreatedBy}} {{.Size}}"', out:
`/bin/sh -c #(nop) CMD ["nginx", "-g", "daemon... 0B
/bin/sh -c #(nop) USER 1001 0B
/bin/sh -c #(nop) EXPOSE 8080 0B
/bin/sh -c #(nop) COPY dir:72c1a931aa074ef... 1.84MB`},
    tip:'Multi-stage builds keep compilers and source code out of the final image: only what you <code>COPY --from</code> ends up in it.' },

  { title:'Buildah & Skopeo', icon:'🛠️', badge:'TOOLS', color:'blue',
    cmds:[
      ['sudo dnf install buildah skopeo',''],
      ['c=$(buildah from registry.fedoraproject.org/fedora-minimal:44)','Start a working container'],
      ['buildah run $c -- microdnf -y install python3','Run commands in it'],
      ['buildah copy $c ./app /app','Copy files in'],
      ["buildah config --cmd '[\"python3\",\"/app/main.py\"]' --port 8000 --label maintainer=sooraj $c",'Set metadata'],
      ['buildah commit $c localhost/pyapp:1 && buildah rm $c','Save as an image'],
      ['skopeo inspect docker://quay.io/fedora/fedora:44','Image details WITHOUT pulling'],
      ['skopeo list-tags docker://quay.io/fedora/fedora','All tags'],
      ['skopeo copy docker://quay.io/fedora/fedora:44 docker://registry.local:5000/fedora:44','Registry → registry (no local copy)'],
      ['skopeo copy containers-storage:localhost/pyapp:1 oci-archive:pyapp.tar','Local image → portable file'],
      ['skopeo sync --src docker --dest dir quay.io/fedora/fedora:44 ./mirror','Mirror images to a folder']],
    flags:[
      ['docker://','Remote registry'],
      ['containers-storage:','Your local Podman images'],
      ['oci-archive: / docker-archive: / dir:','File formats'],
      ['buildah from scratch','Completely empty image'],
      ['skopeo --override-arch arm64','Inspect another architecture']],
    example:{cmd:"buildah inspect --format '{{.OCIv1.Config.Cmd}} {{.OCIv1.Config.Labels.maintainer}}' localhost/pyapp:1", out:
`[python3 /app/main.py] sooraj`},
    tip:'Buildah is ideal in scripts and CI: no Containerfile needed, and every step is a normal shell command.' },

  { title:'Security Hardening (Rootless & Least Privilege)', icon:'🛡️', badge:'SECURE', color:'red',
    cmds:[
      ["podman info --format '{{.Host.Security.Rootless}}'",'true = running rootless (good)'],
      ['podman run --read-only --tmpfs /tmp myimage','Read-only root filesystem'],
      ['podman run --cap-drop=all --cap-add=NET_BIND_SERVICE myimage','Only the capabilities it needs'],
      ['podman run --security-opt no-new-privileges myimage','Block setuid privilege gains'],
      ['podman run --memory 512m --cpus 1.5 --pids-limit 200 myimage','Resource limits'],
      ['podman update --memory 1g --cpus 2 web','Change limits on a running container'],
      ['podman run --userns=keep-id -v ~/code:/code:Z myimage','Files keep YOUR uid inside + out'],
      ['podman unshare cat /proc/self/uid_map','How rootless uids are mapped'],
      ['podman unshare chown 1000:1000 ./data','Fix "permission denied" on a bind mount'],
      ['podman run -v ./data:/data:Z myimage','SELinux label for one container (:z = shared)']],
    flags:[
      ['--read-only','Root filesystem read-only'],
      ['--cap-drop=all','Remove every Linux capability'],
      ['--userns=keep-id','Map your uid into the container'],
      [':Z / :z','Private / shared SELinux relabel'],
      ['--pids-limit','Stop fork bombs'],
      ['--network=none','No network at all']],
    example:{cmd:"podman run --rm --read-only --cap-drop=all --security-opt no-new-privileges --memory 64m localhost/site:1.0 sh -c 'touch /x; id'", out:
`touch: cannot touch '/x': Read-only file system
uid=1001(default) gid=0(root) groups=0(root)`},
    warn:'Never relabel system folders like <code>/home</code> or <code>/usr</code> with <code>:Z</code>. Use it only on folders you made for the container.' },

  { title:'Compose & the Docker API Socket', icon:'🎼', badge:'COMPOSE', color:'green',
    cmds:[
      ['sudo dnf install podman-compose','Compose tool for Podman'],
      ['podman compose up -d','Start everything in compose.yaml (see code)'],
      ['podman compose ps','Services'],
      ['podman compose logs -f web','Follow one service'],
      ['podman compose pull && podman compose up -d','Update images + recreate'],
      ['podman compose down','Stop + remove (volumes kept)'],
      ['systemctl --user enable --now podman.socket','Docker-compatible API socket'],
      ['export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/podman/podman.sock','Docker tools now talk to Podman'],
      ['sudo dnf install podman-docker','"docker" command → podman']],
    code:
`# compose.yaml
services:
  db:
    image: docker.io/library/postgres:17
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - pgdata:/var/lib/postgresql/data:Z
  web:
    image: ghcr.io/sooraj/blog:latest
    ports:
      - "8080:3000"
    environment:
      DB_HOST: db
    depends_on:
      - db
volumes:
  pgdata:`,
    flags:[
      ['podman compose','Wrapper: uses podman-compose or docker-compose'],
      ['-f <file>','Another compose file'],
      ['up -d / down / ps / logs','Everyday commands'],
      ['DOCKER_HOST','Point Docker CLI / VS Code / Testcontainers at Podman']],
    example:{cmd:'podman compose ps', out:
`CONTAINER ID  IMAGE                             COMMAND     CREATED        STATUS        PORTS                   NAMES
3f1c0a9e2b7d  docker.io/library/postgres:17     postgres    2 minutes ago  Up 2 minutes  5432/tcp                blog_db_1
9ad24e61c0f5  ghcr.io/sooraj/blog:latest                    2 minutes ago  Up 2 minutes  0.0.0.0:8080->3000/tcp  blog_web_1`},
    tip:'For a server, turn the compose app into Quadlet units (next cards). They start at boot, restart on failure and auto-update.' },

  { title:'Kubernetes YAML with Podman', icon:'☸️', badge:'KUBE', color:'blue',
    cmds:[
      ['podman kube generate blog > blog.yaml','Pod → Kubernetes YAML'],
      ['podman kube generate --service blog > blog.yaml','Include a Service object'],
      ['podman kube play blog.yaml','Run the YAML locally'],
      ['podman kube play --replace blog.yaml','Re-create after editing'],
      ['podman kube down blog.yaml','Stop + remove it'],
      ['podman kube play --publish 8081:80 blog.yaml','Override ports'],
      ['nano ~/.config/containers/systemd/blog.kube','Run the YAML as a service (see code)'],
      ['systemctl --user daemon-reload && systemctl --user start blog','Start it']],
    code:
`# ~/.config/containers/systemd/blog.kube
[Unit]
Description=Blog pod from Kubernetes YAML

[Kube]
Yaml=%h/blog.yaml
PublishPort=8081:80

[Install]
WantedBy=default.target`,
    flags:[
      ['kube generate <pod|ctr>','Export'],
      ['--service','Add a Service'],
      ['kube play --replace','Tear down + recreate'],
      ['kube down','Remove'],
      ['.kube Quadlet','systemd unit from YAML']],
    example:{cmd:'podman kube generate blog | head -18', out:
`# Save the output of this file and use kubectl create -f to import
# it into Kubernetes.
#
# Created with podman-5.6.1
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: blog
  name: blog
spec:
  containers:
  - command:
    - httpd
    - -f
    image: localhost/busybox:1
    name: blog-web
    ports:`},
    tip:'The same YAML runs on a real cluster with <code>kubectl apply -f blog.yaml</code>. It is a gentle way to learn Kubernetes on one PC.' },

  { title:'Quadlet Apps: Network + Volume + Containers', icon:'🧩', badge:'QUADLET+', color:'warn',
    cmds:[
      ['mkdir -p ~/.config/containers/systemd && cd ~/.config/containers/systemd','Where user quadlets live'],
      ['nano app.network pgdata.volume db.container web.container','Four small files (see code)'],
      ["printf 's3cr3t' | podman secret create dbpass -",'Secret used by both containers'],
      ['/usr/libexec/podman/quadlet -dryrun -user','Check the files + see generated units'],
      ['systemctl --user daemon-reload',''],
      ['systemctl --user start web','Starts network, volume, db and web in order'],
      ['systemctl --user status db web',''],
      ['journalctl --user -u web -f','Logs'],
      ['podman auto-update --dry-run','Would any image update?'],
      ['systemctl --user enable --now podman-auto-update.timer','Daily auto-update (+ rollback if it fails)']],
    code:
`# app.network
[Network]
Label=app=blog

# pgdata.volume
[Volume]
Label=app=blog

# db.container
[Container]
Image=docker.io/library/postgres:17
ContainerName=db
Network=app.network
Volume=pgdata.volume:/var/lib/postgresql/data:Z
Secret=dbpass,type=env,target=POSTGRES_PASSWORD
HealthCmd=pg_isready -U postgres
Notify=healthy

# web.container
[Unit]
Requires=db.service
After=db.service
[Container]
Image=ghcr.io/sooraj/blog:latest
ContainerName=web
Network=app.network
PublishPort=8080:3000
Environment=DB_HOST=db
Secret=dbpass,type=env,target=DB_PASSWORD
AutoUpdate=registry
[Service]
Restart=always
[Install]
WantedBy=default.target`,
    flags:[
      ['Network=app.network','Refers to the .network file'],
      ['Volume=pgdata.volume:…','Refers to the .volume file'],
      ['ContainerName=','Stable name (= DNS name on the network)'],
      ['Notify=healthy','"Started" only once healthy (Podman 5)'],
      ['.pod / .build / .image','Also available as Quadlet files']],
    example:{cmd:'/usr/libexec/podman/quadlet -dryrun -user | grep -E "^---"', out:
`---app-network.service---
---pgdata-volume.service---
---db.service---
---web.service---`},
    tip:'Containers on the same Quadlet network find each other by <code>ContainerName</code>, so <code>DB_HOST=db</code> just works.' },

  { title:'Registries, Short Names & Mirrors', icon:'🏷️', badge:'REGISTRY', color:'blue',
    cmds:[
      ['cat /etc/containers/registries.conf | grep -v "^#" | grep .','Where short names are searched'],
      ['ls /etc/containers/registries.conf.d/','Short-name aliases (e.g. nginx → docker.io/library/nginx)'],
      ['nano ~/.config/containers/registries.conf','Your own settings (see code)'],
      ['podman search --list-tags quay.io/fedora/fedora','Tags on a registry'],
      ['podman login --get-login quay.io','Which account you are logged in as'],
      ['cat $XDG_RUNTIME_DIR/containers/auth.json','Where logins are stored'],
      ['podman run -d -p 5000:5000 --name registry docker.io/library/registry:2','Local registry'],
      ['podman push --tls-verify=false localhost/app:1 localhost:5000/app:1','Push to it'],
      ['podman image trust show','Signature policy per registry']],
    code:
`# ~/.config/containers/registries.conf
unqualified-search-registries = ["registry.fedoraproject.org", "quay.io", "docker.io"]

# Use a local mirror for Docker Hub (fewer rate limits)
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "mirror.local:5000"
insecure = true`,
    flags:[
      ['unqualified-search-registries','Tried in order for "podman pull nginx"'],
      ['[[registry.mirror]]','Try the mirror first'],
      ['--tls-verify=false','Plain-HTTP / self-signed registry'],
      ['short-name-mode','enforcing asks which registry to use']],
    example:{cmd:'podman login --get-login quay.io', out:
`sooraj`},
    tip:'Always write full image names (<code>docker.io/library/nginx</code>) in scripts and Quadlets. Short names can resolve differently on other machines.' },

  { title:'Housekeeping, Storage & Remote Podman', icon:'🧹', badge:'SYSTEM', color:'green',
    cmds:[
      ['podman system df','Space used by images, containers, volumes'],
      ['podman system prune','Remove stopped containers, dangling images, unused networks'],
      ['podman system prune -a --volumes','Everything unused, including volumes (careful!)'],
      ['podman image prune -a --filter "until=720h"','Images unused for 30 days'],
      ["podman info --format '{{.Store.GraphRoot}}'",'Where images are stored'],
      ['podman system migrate','Fix things after a Podman upgrade'],
      ['podman system reset','Delete ALL Podman data (fresh start)'],
      ['podman system connection add nas ssh://sooraj@nas/run/user/1000/podman/podman.sock','Manage Podman on another machine…'],
      ['podman --connection nas ps','…from here'],
      ['flatpak install flathub io.podman_desktop.PodmanDesktop','Podman Desktop GUI']],
    flags:[
      ['prune -a','Also images without containers'],
      ['--volumes','Also unused volumes'],
      ['--filter until=<h>','Only older than'],
      ['system reset','Irreversible full wipe'],
      ['connection add/default/ls','Remote Podman over SSH']],
    example:{cmd:'podman system df', out:
`TYPE           TOTAL       ACTIVE      SIZE        RECLAIMABLE
Images         14          5           4.812GB     3.207GB (67%)
Containers     6           5           38.4MB      1.1MB (3%)
Local Volumes  4           3           1.93GB      212MB (11%)`},
    tip:'On the remote machine, run <code>systemctl --user enable --now podman.socket</code> and <code>loginctl enable-linger</code> first.' }
);
})();

/* ═════════════════ MORE VIRTUALIZATION (v2.39) ═════════════════ */
(function () {
const v = window.FB_DATA.find(x => x.id === 'virt');
v.desc = 'kvm & libvirt: create, cloud images, templates, networks, storage, hardware, windows 11, shared folders, gpu passthrough, remote hosts and fixes';
const IMG = '/var/lib/libvirt/images';
v.cards.push(
  { title:'Instant VMs from Cloud Images', icon:'☁️', badge:'CLOUD', color:'green',
    cmds:[
      [`sudo curl -Lo ${IMG}/fedora-cloud-44.qcow2 https://download.fedoraproject.org/pub/fedora/linux/releases/44/Cloud/x86_64/images/Fedora-Cloud-Base-Generic-44-1.7.x86_64.qcow2`,'Download once (check the exact file name on the site)'],
      ['nano user-data.yaml','First-boot setup (see code)'],
      [`virt-install --name web1 --memory 2048 --vcpus 2 --import --disk size=20,backing_store=${IMG}/fedora-cloud-44.qcow2 --osinfo fedora-unknown --cloud-init user-data=user-data.yaml --graphics none --noautoconsole`,'VM ready in ~30 seconds'],
      ['virsh domifaddr web1','Its IP address'],
      ['ssh sooraj@192.168.122.87','Log in'],
      [`virt-install --name web2 --memory 2048 --import --disk size=20,backing_store=${IMG}/fedora-cloud-44.qcow2 --osinfo fedora-unknown --cloud-init root-ssh-key=$HOME/.ssh/id_ed25519.pub --noautoconsole`,'Quickest: just your SSH key for root'],
      ['virsh console web1','Serial console (Ctrl+] to leave)']],
    code:
`#cloud-config
hostname: web1
users:
  - name: sooraj
    groups: wheel
    sudo: ALL=(ALL) NOPASSWD:ALL
    ssh_authorized_keys:
      - ssh-ed25519 AAAAC3Nz… sooraj@laptop
packages:
  - htop
  - podman
runcmd:
  - systemctl enable --now podman.socket`,
    flags:[
      ['--import','Boot an existing disk (no installer)'],
      ['backing_store=','Thin copy of the cloud image: many VMs share one base'],
      ['--cloud-init user-data=','Your cloud-config file'],
      ['--cloud-init root-ssh-key=','Just inject an SSH key'],
      ['--graphics none','Headless server']],
    example:{cmd:'virsh domifaddr web1', out:
` Name       MAC address          Protocol     Address
-------------------------------------------------------------------------------
 vnet3      52:54:00:3a:7c:19    ipv4         192.168.122.87/24`},
    tip:'The backing file must never change once VMs use it. Keep it read-only and download a new one for the next Fedora release.' },

  { title:'Build & Customise Images (virt-builder, virt-customize)', icon:'🧰', badge:'GUESTFS', color:'blue',
    cmds:[
      ['sudo dnf install guestfs-tools',''],
      ['virt-builder --list | grep -i fedora','Ready-made templates'],
      [`sudo virt-builder fedora-40 -o ${IMG}/lab.qcow2 --format qcow2 --size 20G --hostname lab --root-password password:ChangeMe --install vim,htop,git --ssh-inject root:file:$HOME/.ssh/id_ed25519.pub --firstboot-command 'dnf -y upgrade' --selinux-relabel`,'Fully set-up disk in one command'],
      [`virt-install --name lab --memory 2048 --import --disk ${IMG}/lab.qcow2 --osinfo fedora-unknown --noautoconsole`,'Boot it'],
      [`sudo virt-customize -a ${IMG}/lab.qcow2 --install nginx --run-command 'systemctl enable nginx' --selinux-relabel`,'Change an existing disk (VM off)'],
      [`sudo virt-customize -a ${IMG}/lab.qcow2 --copy-in ./site:/usr/share/nginx/html`,'Copy files in'],
      [`sudo virt-sysprep -a ${IMG}/lab.qcow2`,'Remove machine-id, SSH host keys, logs → make a template']],
    flags:[
      ['--install pkg1,pkg2','Install packages'],
      ['--run-command \'…\'','Run a shell command inside'],
      ['--ssh-inject user:file:key.pub','Add an SSH key'],
      ['--firstboot-command','Runs once at first boot'],
      ['--selinux-relabel','Always add this for Fedora/RHEL guests'],
      ['virt-sysprep --operations','Choose what to reset']],
    example:{cmd:'virt-builder --list | grep -i fedora | tail -3', out:
`fedora-38                x86_64     Fedora® 38 Server
fedora-39                x86_64     Fedora® 39 Server
fedora-40                x86_64     Fedora® 40 Server`},
    tip:'virt-builder templates lag behind new Fedora releases. For the newest Fedora, use the cloud-image card and <code>virt-customize</code> it.' },

  { title:'Look Inside Disk Images (Offline)', icon:'🔍', badge:'INSPECT', color:'blue',
    cmds:[
      [`sudo virt-df -h -a ${IMG}/f44.qcow2`,'Free space inside the VM\'s filesystems'],
      [`sudo virt-ls -l -a ${IMG}/f44.qcow2 /etc/ssh`,'List files'],
      [`sudo virt-cat -a ${IMG}/f44.qcow2 /var/log/messages | tail`,'Read a file (VM won\'t boot? read its logs)'],
      [`sudo virt-edit -a ${IMG}/f44.qcow2 /etc/fstab`,'Fix a file in place (VM off)'],
      [`sudo virt-copy-out -a ${IMG}/f44.qcow2 /home/sooraj/Documents ~/rescued/`,'Rescue files'],
      [`sudo guestmount -a ${IMG}/f44.qcow2 -i --ro /mnt/vm`,'Mount the whole disk read-only'],
      ['sudo guestunmount /mnt/vm',''],
      [`sudo guestfish --ro -a ${IMG}/f44.qcow2 -i`,'Interactive shell for the image'],
      [`sudo virt-sparsify --in-place ${IMG}/f44.qcow2`,'Give free space back to the host']],
    flags:[
      ['-a <disk>','Disk image (repeat for several)'],
      ['-d <vm>','Use a libvirt VM by name instead'],
      ['--ro','Read-only (safe while VM runs)'],
      ['-i','Find + mount the OS automatically'],
      ['virt-sparsify --in-place','Shrink qcow2 without a copy']],
    example:{cmd:`sudo virt-df -h -a ${IMG}/f44.qcow2`, out:
`Filesystem                                Size       Used  Available  Use%
f44.qcow2:/dev/sda2                       974M       274M       633M   29%
f44.qcow2:/dev/sda3                        28G       5.9G        21G   21%
f44.qcow2:btrfsvol:/dev/sda3/root          28G       5.9G        21G   21%
f44.qcow2:btrfsvol:/dev/sda3/home          28G       5.9G        21G   21%`},
    warn:'Never write (<code>virt-edit</code>, <code>guestmount</code> without --ro) to the disk of a running VM. That corrupts it.' },

  { title:'Clones, Templates & Linked Disks', icon:'🐑', badge:'CLONE', color:'green',
    cmds:[
      ['virsh shutdown f44','Source must be off'],
      ['virt-clone --original f44 --name f44-test --auto-clone','Full copy with a new MAC + disk'],
      ['sudo virt-sysprep -d f44-test','Give the clone a fresh identity'],
      [`sudo qemu-img create -f qcow2 -b ${IMG}/template.qcow2 -F qcow2 ${IMG}/dev1.qcow2`,'Linked clone: tiny disk on top of a template'],
      [`virt-install --name dev1 --memory 2048 --import --disk ${IMG}/dev1.qcow2 --osinfo fedora-unknown --noautoconsole`,'Boot it'],
      [`qemu-img info --backing-chain ${IMG}/dev1.qcow2`,'Show the chain'],
      [`sudo qemu-img snapshot -c before-update ${IMG}/dev1.qcow2`,'Internal snapshot (VM off)'],
      [`sudo qemu-img snapshot -l ${IMG}/dev1.qcow2`,'List'],
      [`sudo qemu-img convert -O qcow2 ${IMG}/dev1.qcow2 ${IMG}/dev1-standalone.qcow2`,'Flatten into an independent disk']],
    flags:[
      ['--auto-clone','Pick names/paths automatically'],
      ['-b <base> -F qcow2','Backing file + its format'],
      ['--backing-chain','Follow all layers'],
      ['snapshot -c / -l / -a / -d','Create / list / apply / delete'],
      ['convert','Merge layers into one file']],
    example:{cmd:`qemu-img info --backing-chain ${IMG}/dev1.qcow2 | grep -E "^image|backing file:|disk size"`, out:
`image: dev1.qcow2
disk size: 196 KiB
backing file: template.qcow2
image: template.qcow2
disk size: 3.4 GiB`},
    tip:'Ten linked clones of a 3 GB template use a few hundred MB extra, instead of 30 GB. Great for labs and testing.' },

  { title:'VM Networking: NAT, Static IPs & Bridges', icon:'🕸️', badge:'NET', color:'warn',
    cmds:[
      ['virsh net-list --all','Virtual networks'],
      ['virsh net-start default && virsh net-autostart default','"Network default is not active" fix'],
      ['virsh net-dhcp-leases default','Which VM got which IP'],
      ["virsh net-update default add ip-dhcp-host \"<host mac='52:54:00:3a:7c:19' name='web1' ip='192.168.122.50'/>\" --live --config",'Always give web1 the same IP'],
      ['virsh net-edit default','Edit the network XML'],
      ['sudo nmcli con add type bridge ifname br0 con-name br0','Bridge: VMs on your real LAN…'],
      ['sudo nmcli con add type bridge-slave ifname enp3s0 master br0','…attach the wired NIC (Wi-Fi can\'t be bridged)'],
      ['sudo nmcli con up br0',''],
      ['virt-install … --network bridge=br0','Use it for a VM'],
      ['virt-install … --network type=direct,source=enp3s0,source_mode=bridge','macvtap: LAN access without a bridge'],
      ['virt-xml web1 --add-device --network network=default,model=virtio','Add a second NIC']],
    flags:[
      ['default (NAT)','192.168.122.0/24, VMs reach out, LAN can\'t reach in'],
      ['bridge=br0','VM gets an IP from your router'],
      ['type=direct (macvtap)','Easy LAN access; host ↔ VM traffic blocked'],
      ['--live --config','Change now + keep after restart'],
      ['model=virtio','Fastest NIC']],
    example:{cmd:'virsh net-dhcp-leases default', out:
` Expiry Time           MAC address         Protocol   IP address           Hostname   Client ID or DUID
-----------------------------------------------------------------------------------------------------------
 2026-09-30 14:25:11   52:54:00:3a:7c:19   ipv4       192.168.122.87/24    web1       01:52:54:00:3a:7c:19
 2026-09-30 14:31:40   52:54:00:8e:21:04   ipv4       192.168.122.112/24   f44        01:52:54:00:8e:21:04`} },

  { title:'Storage Pools, Volumes & Extra Disks', icon:'🗄️', badge:'STORAGE', color:'blue',
    cmds:[
      ['virsh pool-list --all --details','Storage pools + free space'],
      ['virsh pool-define-as bigdisk dir --target /data/vms','New pool on another drive'],
      ['virsh pool-build bigdisk && virsh pool-start bigdisk && virsh pool-autostart bigdisk',''],
      ['virsh vol-create-as bigdisk data.qcow2 50G --format qcow2','New disk volume'],
      ['virsh vol-list bigdisk --details','Volumes in a pool'],
      ['virsh attach-disk f44 /data/vms/data.qcow2 vdb --driver qemu --subdriver qcow2 --targetbus virtio --persistent','Plug it into a VM'],
      ['virsh detach-disk f44 vdb --persistent','Unplug'],
      ['virsh blockresize f44 vda 40G','Grow a disk while the VM runs (then grow the partition inside)'],
      ['virt-xml f44 --add-device --disk size=10,bus=virtio','Create + attach a new disk in one go'],
      ['sudo semanage fcontext -a -t virt_image_t "/data/vms(/.*)?" && sudo restorecon -Rv /data/vms','SELinux label for a new VM folder']],
    flags:[
      ['pool types','dir · logical (LVM) · netfs (NFS) · iscsi'],
      ['--persistent','Keep after VM restart'],
      ['--targetbus virtio','Fast, needs drivers on Windows'],
      ['blockresize','Online grow'],
      ['virt_image_t','SELinux type for VM images']],
    example:{cmd:'virsh pool-list --all --details', out:
` Name      State     Autostart   Persistent   Capacity     Allocation   Available
-----------------------------------------------------------------------------------
 default   running   yes         yes          475.35 GiB   112.84 GiB   362.51 GiB
 bigdisk   running   yes         yes          1.79 TiB     402.11 GiB   1.40 TiB`} },

  { title:'Change CPU, RAM & Devices (virt-xml)', icon:'🎛️', badge:'HW', color:'green',
    cmds:[
      ['virt-xml f44 --edit --vcpus 4','CPUs (applies at next boot)'],
      ['virt-xml f44 --edit --memory 8192','RAM in MiB'],
      ['virt-xml f44 --edit --cpu host-passthrough','Expose the real CPU (faster, less portable)'],
      ['virt-xml f44 --edit --video model.type=virtio','Modern display (3D with --graphics spice,gl.enable=yes)'],
      ['virt-xml f44 --edit --boot menu=on','Show the boot menu'],
      ['virt-xml f44 --add-device --disk size=10,bus=virtio --print-diff','Preview a change before applying it'],
      ['lsusb','Find a USB device ID…'],
      ['virsh attach-device f44 usb-stick.xml --live','…and pass it to the running VM (see code)'],
      ['virsh detach-device f44 usb-stick.xml --live','Give it back'],
      ['virsh edit f44','Edit the full XML (validated on save)']],
    code:
`<!-- usb-stick.xml -->
<hostdev mode='subsystem' type='usb' managed='yes'>
  <source>
    <vendor id='0x0781'/>
    <product id='0x5581'/>
  </source>
</hostdev>`,
    flags:[
      ['--edit / --add-device / --remove-device','What to do'],
      ['--print-diff','Show changes, apply nothing'],
      ['--update','Also apply to the running VM when possible'],
      ['one --edit option per run','virt-xml refuses --vcpus + --memory together'],
      ['managed=\'yes\'','libvirt detaches/reattaches the device for you']],
    example:{cmd:'virt-xml f44 --add-device --filesystem source.dir=/home/sooraj/share,target.dir=hostshare,driver.type=virtiofs --print-diff', out:
`--- Original XML
+++ Altered XML
@@ -27,5 +27,10 @@
     <memballoon model="virtio">
       <address type="pci" domain="0x0000" bus="0x00" slot="0x02" function="0x0"/>
     </memballoon>
+    <filesystem type="mount">
+      <source dir="/home/sooraj/share"/>
+      <target dir="hostshare"/>
+      <driver type="virtiofs"/>
+    </filesystem>
   </devices>`} },

  { title:'Windows 11 Guests (TPM, Secure Boot, virtio)', icon:'🪟', badge:'WIN11', color:'warn',
    cmds:[
      ['sudo dnf install swtpm swtpm-tools edk2-ovmf','Software TPM + UEFI firmware'],
      [`sudo curl -Lo ${IMG}/virtio-win.iso https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso`,'Windows drivers for virtio disks/network'],
      [`virt-install --name win11 --memory 8192 --vcpus 4 --cpu host-passthrough --osinfo win11 --disk size=80,bus=virtio --cdrom ~/Downloads/Win11.iso --disk ${IMG}/virtio-win.iso,device=cdrom --network network=default,model=virtio --tpm backend.type=emulator,backend.version=2.0,model=tpm-crb --boot firmware=efi,firmware.feature0.name=secure-boot,firmware.feature0.enabled=yes,firmware.feature1.name=enrolled-keys,firmware.feature1.enabled=yes`,'Create the VM'],
      ['# Setup shows no disk? → Load driver → virtio CD → viostor\\w11\\amd64',''],
      ['# After install: run virtio-win-guest-tools.exe from the virtio CD',''],
      ['virsh domifaddr win11 --source agent','IP via the guest agent'],
      ['virt-xml win11 --edit --memory 12288','More RAM later']],
    flags:[
      ['--tpm … model=tpm-crb','TPM 2.0 (Windows 11 requirement)'],
      ['firmware.feature0 secure-boot','Secure Boot on'],
      ['enrolled-keys','Microsoft keys pre-loaded'],
      ['--osinfo win11','Turns on Hyper-V tweaks automatically'],
      ['bus=virtio','Fastest disk; needs the viostor driver during setup']],
    example:{cmd:'virsh dumpxml win11 | grep -A2 -E "<tpm|<firmware>"', out:
`    <firmware>
      <feature enabled='yes' name='secure-boot'/>
      <feature enabled='yes' name='enrolled-keys'/>
--
    <tpm model='tpm-crb'>
      <backend type='emulator' version='2.0'/>
    </tpm>`},
    tip:'For better graphics and clipboard sharing, open the VM in virt-manager and install the SPICE guest tools inside Windows (included in virtio-win-guest-tools).' },

  { title:'Shared Folders & Guest Agents', icon:'📂', badge:'SHARE', color:'blue',
    cmds:[
      ['virt-xml f44 --edit --memorybacking source.type=memfd,access.mode=shared','1. Needed once for virtiofs'],
      ['virt-xml f44 --add-device --filesystem source.dir=/home/sooraj/share,target.dir=hostshare,driver.type=virtiofs','2. Share a host folder'],
      ['sudo mount -t virtiofs hostshare /mnt/host','3. Inside the guest: mount it'],
      ['echo "hostshare /mnt/host virtiofs defaults,nofail 0 0" | sudo tee -a /etc/fstab','…at every boot'],
      ['sudo dnf install qemu-guest-agent spice-vdagent','Inside a Linux guest: agents'],
      ['virsh guestinfo f44 --os --hostname','Ask the guest about itself'],
      ['virsh domfsinfo f44','Mounted filesystems in the guest'],
      ['virsh set-user-password f44 sooraj --password "N3w-Pass"','Reset a guest password from the host'],
      ['virsh domfsfreeze f44 && virsh domfsthaw f44','Freeze/thaw guest writes (consistent backups)']],
    flags:[
      ['driver.type=virtiofs','Fast host-folder sharing'],
      ['access.mode=shared','Memory setting virtiofs requires'],
      ['qemu-guest-agent','Lets virsh query/control the guest'],
      ['spice-vdagent','Clipboard, auto-resize display'],
      ['--source agent','Get data via the agent']],
    example:{cmd:'virsh guestinfo f44 --os --hostname', out:
`os.id               : fedora
os.name             : Fedora Linux
os.pretty-name      : Fedora Linux 44 (Workstation Edition)
os.version          : 44 (Workstation Edition)
os.version-id       : 44
os.kernel-release   : 6.19.8-200.fc44.x86_64
os.machine          : x86_64
hostname            : f44-vm`} },

  { title:'Performance & Monitoring', icon:'📊', badge:'PERF', color:'green',
    cmds:[
      ['sudo dnf install virt-top',''],
      ['sudo virt-top','top for VMs'],
      ['virsh domstats f44 --cpu-total --balloon --block --interface','All counters for one VM'],
      ['virsh dommemstat f44','Memory as the guest sees it'],
      ['virsh domblkstat f44 vda --human','Disk I/O'],
      ['virsh vcpuinfo f44','Which host CPU runs each vCPU'],
      ['virsh vcpupin f44 0 4 --config','Pin vCPU 0 to host CPU 4'],
      ['cat /sys/module/kvm_intel/parameters/nested','Nested virtualization on? (kvm_amd on AMD)'],
      ['echo "options kvm_intel nested=1" | sudo tee /etc/modprobe.d/kvm.conf','Turn it on (reload the module / reboot)'],
      ['virt-xml f44 --edit target=vda --disk driver.cache=none,driver.io=native','Faster disk I/O settings']],
    flags:[
      ['--cpu host-passthrough','Best CPU speed'],
      ['model=virtio (disk/net/video)','Paravirtual = fast'],
      ['cache=none, io=native','Lower overhead for busy disks'],
      ['vcpupin / emulatorpin','Keep VMs off busy cores'],
      ['nested=1','Run VMs (or WSL/Hyper-V) inside VMs']],
    example:{cmd:'virsh dommemstat f44', out:
`actual 4194304
swap_in 0
swap_out 0
major_fault 812
minor_fault 1433201
unused 2701880
available 4013904
usable 2894420
last_update 1790762700
rss 2211004`} },

  { title:'GPU & PCI Passthrough (VFIO)', icon:'🎮', badge:'VFIO', color:'red',
    cmds:[
      ['lspci -nn | grep -Ei "vga|audio"','GPU + its HDMI audio IDs, e.g. [10de:2786] [10de:22bc]'],
      ['# IOMMU groups: see Hardware → PCIe Links, Resizable BAR & IOMMU Groups',''],
      ['sudo grubby --update-kernel=ALL --args="intel_iommu=on iommu=pt vfio-pci.ids=10de:2786,10de:22bc"','Reserve the GPU for VMs'],
      ['echo \'force_drivers+=" vfio vfio_iommu_type1 vfio_pci "\' | sudo tee /etc/dracut.conf.d/vfio.conf','Load vfio before the GPU driver'],
      ['sudo dracut -f && systemctl reboot',''],
      ['lspci -k -s 01:00.0 | grep "in use"','Should say vfio-pci'],
      ['virt-xml win11 --add-device --host-device 01:00.0','Give the GPU to a VM'],
      ['virt-xml win11 --add-device --host-device 01:00.1','…and its audio function']],
    flags:[
      ['vfio-pci.ids=','Bind these devices to vfio at boot'],
      ['iommu=pt','Less overhead for host devices'],
      ['--host-device <bus:slot.fn>','PCI passthrough'],
      ['Same IOMMU group','Everything in the group must be passed together']],
    example:{cmd:'lspci -k -s 01:00.0 | grep "in use"', out:
`	Kernel driver in use: vfio-pci`},
    warn:'The passed-through GPU disappears from the host. You need a second GPU (or the iGPU) for your own desktop, otherwise you are left with a black screen.' },

  { title:'Remote Hosts, Live Migration & Imports', icon:'🛰️', badge:'REMOTE', color:'blue',
    cmds:[
      ['virsh uri','Which libvirt you are talking to'],
      ['virsh -c qemu:///session list --all','Your user VMs (GNOME Boxes lives here)'],
      ['virsh -c qemu+ssh://sooraj@server/system list --all','VMs on another machine over SSH'],
      ['virt-manager -c qemu+ssh://sooraj@server/system','GUI for the remote host'],
      ['export LIBVIRT_DEFAULT_URI=qemu+ssh://sooraj@server/system','Make it the default'],
      ['virsh migrate --live --persistent --undefinesource f44 qemu+ssh://server2/system','Move a running VM'],
      ['virsh migrate --live --copy-storage-all --persistent f44 qemu+ssh://server2/system','…including its disk (no shared storage)'],
      ['sudo dnf install virt-v2v',''],
      ['virt-v2v -i ova ~/Downloads/appliance.ova -o libvirt -os default','Import a VMware / VirtualBox OVA']],
    flags:[
      ['qemu:///system','System VMs (virt-manager default)'],
      ['qemu:///session','Per-user VMs (Boxes)'],
      ['qemu+ssh://user@host/system','Remote over SSH'],
      ['--live / --persistent / --undefinesource','No downtime / define on target / remove from source'],
      ['-i ova / vmx / libvirt','virt-v2v input types']],
    example:{cmd:'virsh -c qemu+ssh://sooraj@server/system list --all', out:
` Id   Name       State
---------------------------
 1    web1       running
 2    db1        running
 -    win11      shut off`} },

  { title:'Fix Common VM Problems', icon:'🧯', badge:'FIX', color:'red', flagsLabel:'Diagnosis', flagsHead:['If you see','Do this'],
    cmds:[
      ['virt-host-validate qemu','Checks KVM, IOMMU, cgroups'],
      ['systemctl status virtqemud.socket','Fedora uses modular libvirt daemons'],
      ['sudo systemctl enable --now virtqemud.socket virtnetworkd.socket virtstoraged.socket','Start them'],
      ['virsh net-start default && virsh net-autostart default','Default network down'],
      ['sudo journalctl -u virtqemud -b --no-pager | tail -20','libvirt errors'],
      ['sudo tail -50 /var/log/libvirt/qemu/f44.log','QEMU log for one VM'],
      ['sudo ausearch -m avc -ts recent | grep -i qemu','SELinux denials'],
      [`sudo restorecon -Rv ${IMG}`,'Fix image labels'],
      ['setfacl -m u:qemu:x ~','ISO in your home? Let qemu enter the folder']],
    flags:[
      ['"Failed to connect socket …virtqemud-sock"','sudo systemctl enable --now virtqemud.socket'],
      ['"Network \'default\' is not active"','virsh net-start default'],
      ['"KVM is not available"','Enable VT-x / AMD-V (SVM) in BIOS'],
      ['"Cannot access storage file … Permission denied"','Move disk to /var/lib/libvirt/images, or ACL + restorecon'],
      ['VM very slow','virtio disk/NIC, host-passthrough CPU, guest agent'],
      ['Black screen with passthrough','Host lost its only GPU → remove the hostdev']],
    example:{cmd:'virt-host-validate qemu', out:
`  QEMU: Checking for hardware virtualization                                 : PASS
  QEMU: Checking if device '/dev/kvm' exists                                 : PASS
  QEMU: Checking if device '/dev/kvm' is accessible                          : PASS
  QEMU: Checking if device '/dev/vhost-net' exists                           : PASS
  QEMU: Checking if device '/dev/net/tun' exists                             : PASS
  QEMU: Checking for cgroup 'cpu' controller support                         : PASS
  QEMU: Checking for cgroup 'memory' controller support                      : PASS
  QEMU: Checking for device assignment IOMMU support                         : PASS
  QEMU: Checking if IOMMU is enabled by kernel                               : PASS
  QEMU: Checking for secure guest support                                    : WARN (Unknown if this platform has Secure Guest support)`} }
);
})();

/* ═════════════════ MORE WEB & DB (v2.40) ═════════════════ */
(function () {
const w = window.FB_DATA.find(x => x.id === 'web');
w.desc = 'nginx, caddy, apache, https, php, app deploys, testing, postgresql, mariadb, valkey, sqlite and dev databases in containers';
w.cards.push(
  { title:'nginx Reverse Proxy + HTTPS', icon:'🔁', badge:'PROXY', color:'green',
    cmds:[
      ['sudo nano /etc/nginx/conf.d/app.conf','Site config (see code)'],
      ['sudo nginx -t','Test before reloading'],
      ['sudo systemctl reload nginx','Apply with no downtime'],
      ['sudo setsebool -P httpd_can_network_connect on','SELinux: allow nginx to reach your app port'],
      ['sudo dnf install certbot python3-certbot-nginx','Let\'s Encrypt'],
      ['sudo certbot --nginx -d app.example.com -d www.example.com','Get a certificate + edit the config for HTTPS'],
      ['sudo certbot renew --dry-run','Test renewal'],
      ['systemctl list-timers certbot-renew.timer','Auto-renew timer'],
      ['sudo nginx -T | less','The full config nginx actually uses']],
    code:
`# /etc/nginx/conf.d/app.conf
server {
    listen 80;
    server_name app.example.com;
    server_tokens off;
    client_max_body_size 50m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;      # WebSockets
        proxy_set_header Connection "upgrade";
    }
}`,
    flags:[
      ['proxy_pass','Where the app listens'],
      ['X-Forwarded-*','Tell the app the real client + scheme'],
      ['Upgrade / Connection','Needed for WebSockets'],
      ['client_max_body_size','Upload limit (default 1 MB!)'],
      ['certbot --nginx','Adds listen 443 ssl + redirect for you']],
    example:{cmd:'sudo nginx -t', out:
`nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful`},
    tip:'"413 Request Entity Too Large" on uploads means <code>client_max_body_size</code> is too small. "502 Bad Gateway" means the app isn\'t running, or SELinux is blocking the connection (see the setsebool line).' },

  { title:'nginx Hardening: Headers, Rate Limits, Auth', icon:'🧱', badge:'HARDEN', color:'red',
    cmds:[
      ['sudo nano /etc/nginx/conf.d/app.conf','Add the lines from the code box'],
      ['sudo dnf install httpd-tools','htpasswd tool'],
      ['sudo htpasswd -c /etc/nginx/.htpasswd admin','Create a login (-c only the first time)'],
      ['sudo htpasswd /etc/nginx/.htpasswd sooraj','Add another user'],
      ['sudo nginx -t && sudo systemctl reload nginx',''],
      ['curl -sI https://app.example.com | grep -iE "strict|x-frame|x-content|referrer"','Check the headers'],
      ['for i in $(seq 1 25); do curl -s -o /dev/null -w "%{http_code} " https://app.example.com/; done','Watch the rate limit kick in'],
      ['sudo grep "limiting requests" /var/log/nginx/error.log | tail','Who got limited']],
    code:
`# at the top of the file (http level)
limit_req_zone $binary_remote_addr zone=perip:10m rate=10r/s;

# inside server { … }
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options nosniff always;
add_header X-Frame-Options SAMEORIGIN always;
add_header Referrer-Policy strict-origin-when-cross-origin always;
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;

location / {
    limit_req zone=perip burst=20 nodelay;
    limit_req_status 429;
    proxy_pass http://127.0.0.1:3000;
}
location /admin/ {
    auth_basic "Admin";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://127.0.0.1:3000;
}`,
    flags:[
      ['rate=10r/s burst=20','10 per second, short bursts of 20 allowed'],
      ['limit_req_status 429','"Too Many Requests" instead of 503'],
      ['always','Send headers on error pages too'],
      ['auth_basic','Password prompt (use only over HTTPS)'],
      ['server_tokens off','Hide the nginx version']],
    example:{cmd:'for i in $(seq 1 25); do curl -s -o /dev/null -w "%{http_code} " http://127.0.0.1:8088/; done', out:
`200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 429 429 429`},
    warn:'Load tests against a rate-limited site mostly measure the limiter. Benchmark the app port directly, or turn the limit off while testing.' },

  { title:'Caddy (Automatic HTTPS)', icon:'🔒', badge:'CADDY', color:'green',
    cmds:[
      ['sudo dnf install caddy',''],
      ['sudo nano /etc/caddy/Caddyfile','Sites (see code); HTTPS certificates are automatic'],
      ['caddy fmt --overwrite /etc/caddy/Caddyfile','Tidy the formatting'],
      ['caddy validate --config /etc/caddy/Caddyfile','Check it'],
      ['sudo systemctl enable --now caddy',''],
      ['sudo systemctl reload caddy','Apply changes'],
      ["caddy hash-password --plaintext 'S3cret'",'Password hash for basic_auth'],
      ['caddy file-server --browse --listen :8080 --root ~/Public','Instant file server, no config'],
      ['caddy reverse-proxy --from :8443 --to localhost:3000','Instant HTTPS proxy for testing'],
      ['journalctl -u caddy -f','Logs (certificate issues show here)']],
    code:
`# /etc/caddy/Caddyfile
{
	email admin@example.com
}

app.example.com {
	encode zstd gzip
	reverse_proxy localhost:3000
}

static.example.com {
	root * /srv/www
	file_server browse
}

admin.example.com {
	basic_auth {
		admin $2a$14$Zkx19XLiW6VYouLHR5NmfOFU0z2GTNmpkT/5qqR7hx4IjWJPDhjvG
	}
	reverse_proxy localhost:9000
}`,
    flags:[
      ['<domain> { … }','Site block: HTTPS is obtained automatically'],
      ['reverse_proxy','Forward to an app (headers handled for you)'],
      ['file_server browse','Static files + directory listing'],
      ['encode zstd gzip','Compression'],
      ['basic_auth','Login (older Caddy: basicauth)']],
    example:{cmd:'caddy validate --config /etc/caddy/Caddyfile', out:
`{"level":"info","ts":1790764652.164161,"msg":"using provided configuration","config_file":"/etc/caddy/Caddyfile","config_adapter":"caddyfile"}
Valid configuration`},
    tip:'Caddy needs ports 80 and 443 reachable from the internet (firewall + router) to get certificates. For LAN-only sites, it uses its own local CA.' },

  { title:'PHP with PHP-FPM', icon:'🐘', badge:'PHP', color:'blue',
    cmds:[
      ['sudo dnf install php php-fpm php-mysqlnd php-pgsql php-gd php-mbstring php-intl php-xml php-opcache',''],
      ['sudo systemctl enable --now php-fpm','Starts the /run/php-fpm/www.sock socket'],
      ['sudo systemctl restart nginx','Fedora\'s nginx picks up PHP automatically (default.d/php.conf)'],
      ['echo "<?php phpinfo();" | sudo tee /usr/share/nginx/html/info.php','Test page (delete afterwards!)'],
      ['php -v','Version'],
      ['php -m','Loaded extensions'],
      ['php --ini','Which php.ini files are read'],
      ['sudo nano /etc/php.d/99-custom.ini','Your own settings: upload_max_filesize = 64M'],
      ['sudo nano /etc/php-fpm.d/www.conf','Pool: pm.max_children, user…'],
      ['sudo dnf install composer && composer install --no-dev -o','PHP dependencies'],
      ['sudo setsebool -P httpd_can_network_connect_db on','SELinux: allow PHP to reach a database']],
    flags:[
      ['/run/php-fpm/www.sock','Socket nginx/Apache talk to'],
      ['/etc/php.d/*.ini','Extra settings (loaded in order)'],
      ['pm.max_children','Max PHP workers (RAM ÷ ~60 MB)'],
      ['opcache','Big speed-up, keep it on']],
    example:{cmd:'php -v', out:
`PHP 8.5.2 (cli) (built: Sep 12 2026 00:00:00) (NTS gcc x86_64)
Copyright (c) The PHP Group
Built by Fedora Project
Zend Engine v4.5.2, Copyright (c) Zend Technologies
    with Zend OPcache v8.5.2, Copyright (c), by Zend Technologies`} },

  { title:'Deploy Python & Node Apps (systemd)', icon:'🚀', badge:'DEPLOY', color:'green',
    cmds:[
      ['python3 -m venv /srv/app/.venv && /srv/app/.venv/bin/pip install -r /srv/app/requirements.txt gunicorn',''],
      ['/srv/app/.venv/bin/gunicorn -w 4 -b 127.0.0.1:8000 app:app','Flask/Django (WSGI) test run'],
      ['/srv/app/.venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000 --workers 4 --proxy-headers','FastAPI (ASGI)'],
      ['cd /srv/web && npm ci --omit=dev','Node: exact, production-only install'],
      ['sudo nano /etc/systemd/system/app.service','Run it as a service (see code)'],
      ['sudo systemctl daemon-reload && sudo systemctl enable --now app',''],
      ['journalctl -u app -f','App logs'],
      ['sudo systemctl restart app','Deploy new code']],
    code:
`# /etc/systemd/system/app.service
[Unit]
Description=My web app
After=network-online.target
Wants=network-online.target

[Service]
User=app
WorkingDirectory=/srv/app
EnvironmentFile=/etc/app.env
ExecStart=/srv/app/.venv/bin/gunicorn -w 4 -b 127.0.0.1:8000 app:app
# Node instead: ExecStart=/usr/bin/node /srv/web/server.js
Restart=on-failure
NoNewPrivileges=yes
ProtectSystem=strict
ReadWritePaths=/srv/app/uploads

[Install]
WantedBy=multi-user.target`,
    flags:[
      ['-w N','gunicorn workers (≈ 2 × CPU cores + 1)'],
      ['--proxy-headers','Trust X-Forwarded-* from nginx'],
      ['npm ci','Clean install from package-lock.json'],
      ['EnvironmentFile','Secrets/config outside the code'],
      ['ProtectSystem=strict','App can only write to ReadWritePaths']],
    example:{cmd:'systemctl status app --no-pager | head -4', out:
`● app.service - My web app
     Loaded: loaded (/etc/systemd/system/app.service; enabled; preset: disabled)
     Active: active (running) since Wed 2026-09-30 13:40:02 +03; 12s ago
   Main PID: 51230 (gunicorn)`},
    tip:'Bind apps to <code>127.0.0.1</code> and let nginx or Caddy face the internet. The app port then never needs a firewall hole.' },

  { title:'Test & Benchmark Web Servers', icon:'⏱️', badge:'TEST', color:'blue',
    cmds:[
      ['curl -sI https://app.example.com','Headers only'],
      ["curl -sS -o /dev/null -w 'code=%{http_code} ttfb=%{time_starttransfer}s total=%{time_total}s\\n' https://app.example.com",'Response time breakdown'],
      ["curl -sI --http2 -o /dev/null -w '%{http_version}\\n' https://app.example.com",'HTTP/2 working? (prints 2)'],
      ['curl --resolve app.example.com:443:192.168.1.20 https://app.example.com','Test a new server before DNS points to it'],
      ['echo | openssl s_client -connect app.example.com:443 -servername app.example.com 2>/dev/null | openssl x509 -noout -subject -dates','Certificate name + expiry'],
      ['curl -s -H "Accept-Encoding: gzip" -o /dev/null -w "%{size_download}\\n" https://app.example.com','Compressed size'],
      ['sudo dnf install httpd-tools wrk',''],
      ['ab -n 1000 -c 50 http://127.0.0.1:8000/','Quick load test'],
      ['wrk -t2 -c50 -d10s http://127.0.0.1:8000/','Longer, more realistic load test']],
    flags:[
      ['-w "%{http_code} %{time_total}"','curl write-out variables'],
      ['--resolve host:port:ip','Override DNS for one request'],
      ['ab -n / -c','Total requests / concurrency'],
      ['wrk -t / -c / -d','Threads / connections / duration'],
      ['Non-2xx responses','ab: errors or rate limiting']],
    example:{cmd:'wrk -t2 -c50 -d5s http://127.0.0.1:3000/', out:
`Running 5s test @ http://127.0.0.1:3000/
  2 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    42.46ms  185.30ms   1.70s    95.41%
    Req/Sec   826.34    332.62     1.57k    68.89%
  7436 requests in 5.00s, 3.64MB read
  Socket errors: connect 0, read 0, write 0, timeout 6
Requests/sec:   1486.59
Transfer/sec:    744.78KB`} },

  { title:'PostgreSQL: Everyday Admin', icon:'🐘', badge:'PSQL', color:'blue',
    cmds:[
      ['sudo -u postgres psql','Admin shell'],
      ['\\l','psql: list databases'],
      ['\\c appdb','psql: connect to a database'],
      ['\\dt','psql: tables'],
      ['\\d+ orders','psql: describe a table'],
      ['\\du','psql: roles'],
      ['\\x auto','psql: readable wide rows'],
      ['\\timing on','psql: show query times'],
      ["psql -U appuser -d appdb -c \"SELECT count(*) FROM orders;\"",'One query from the shell'],
      ["sudo -u postgres psql -c \"CREATE ROLE readonly LOGIN PASSWORD 'S3cret';\"",'New user'],
      ['sudo -u postgres psql -d appdb -c "GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;"','Read-only access to existing tables'],
      ['sudo -u postgres psql -d appdb -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly;"','…and future tables'],
      ["sudo -u postgres psql -c \"SELECT datname, pg_size_pretty(pg_database_size(datname)) AS size FROM pg_database ORDER BY pg_database_size(datname) DESC;\"",'Database sizes'],
      ['sudo nano /var/lib/pgsql/data/postgresql.conf',"Remote access: listen_addresses = '*'"],
      ['sudo nano /var/lib/pgsql/data/pg_hba.conf','host appdb appuser 192.168.1.0/24 scram-sha-256'],
      ['sudo systemctl restart postgresql && sudo firewall-cmd --add-service=postgresql --permanent && sudo firewall-cmd --reload','']],
    flags:[
      ['\\dt / \\d+ <t> / \\di','Tables / table detail / indexes'],
      ['\\x auto','Vertical output when rows are wide'],
      ['-c "<sql>"','Run and exit'],
      ['scram-sha-256','Modern password auth in pg_hba.conf'],
      ['ALTER DEFAULT PRIVILEGES','Grants for tables created later']],
    example:{cmd:'sudo -u postgres psql -c "SELECT datname, pg_size_pretty(pg_database_size(datname)) AS size FROM pg_database ORDER BY pg_database_size(datname) DESC;"', out:
`  datname  |  size
-----------+---------
 appdb     | 23 MB
 postgres  | 7503 kB
 template1 | 7345 kB
 template0 | 7345 kB
(4 rows)`} },

  { title:'PostgreSQL: Speed & Maintenance', icon:'🏎️', badge:'PG TUNE', color:'warn',
    cmds:[
      ['EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;','Why is it slow? (Seq Scan on a big table = missing index)'],
      ['CREATE INDEX CONCURRENTLY idx_orders_customer ON orders(customer_id);','Add an index without locking writes'],
      ["SELECT pid, usename, state, now() - query_start AS runtime, left(query, 40) FROM pg_stat_activity WHERE state <> 'idle' ORDER BY runtime DESC NULLS LAST;",'What is running now'],
      ['SELECT pg_cancel_backend(12345);','Cancel a query'],
      ['SELECT pg_terminate_backend(12345);','Kill the whole connection'],
      ['SELECT relname, n_live_tup, n_dead_tup, last_autovacuum FROM pg_stat_user_tables ORDER BY n_dead_tup DESC LIMIT 5;','Tables needing vacuum'],
      ['VACUUM (VERBOSE, ANALYZE) orders;','Clean + refresh statistics'],
      ["ALTER SYSTEM SET log_min_duration_statement = '500ms';",'Log every query slower than 0.5 s…'],
      ['SELECT pg_reload_conf();','…apply without restart'],
      ['sudo dnf install postgresql-upgrade && sudo postgresql-setup --upgrade','After a Fedora upgrade brings a new major version']],
    flags:[
      ['EXPLAIN ANALYZE','Real timings (runs the query!)'],
      ['CONCURRENTLY','No table lock (slower build)'],
      ['pg_cancel / pg_terminate_backend','Stop query / connection'],
      ['n_dead_tup','Deleted rows not yet cleaned'],
      ['ALTER SYSTEM','Writes postgresql.auto.conf']],
    example:{cmd:'EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;  -- after CREATE INDEX', out:
`                                                           QUERY PLAN
--------------------------------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on orders  (cost=5.83..534.52 rows=198 width=22) (actual time=0.055..0.726 rows=217 loops=1)
   Recheck Cond: (customer_id = 42)
   Heap Blocks: exact=199
   ->  Bitmap Index Scan on idx_orders_customer  (cost=0.00..5.78 rows=198 width=0) (actual time=0.026..0.026 rows=217 loops=1)
 Planning Time: 0.311 ms
 Execution Time: 0.771 ms`},
    tip:'On 200,000 rows, the same query took 10.9 ms as a Seq Scan and 0.77 ms after the index: 14× faster. Check with EXPLAIN ANALYZE before and after.' },

  { title:'MariaDB: Admin & Tuning', icon:'🦭', badge:'MARIADB+', color:'blue',
    cmds:[
      ["sudo mariadb -e \"SHOW GRANTS FOR 'app'@'localhost';\"",'What a user may do'],
      ["sudo mariadb -e \"CREATE USER 'report'@'%' IDENTIFIED BY 'S3cret!'; GRANT SELECT ON appdb.* TO 'report'@'%';\"",'Read-only user from any host'],
      ['sudo mariadb-admin status','Uptime, queries/s, slow queries'],
      ['sudo mariadb-admin processlist','What is running'],
      ['sudo mariadb -e "KILL 1234;"','Stop one connection'],
      ["sudo mariadb -e \"SELECT table_schema AS db, ROUND(SUM(data_length+index_length)/1024/1024,1) AS size_mb FROM information_schema.tables GROUP BY table_schema ORDER BY size_mb DESC;\"",'Database sizes'],
      ["sudo mariadb -e \"SET GLOBAL slow_query_log=1; SET GLOBAL long_query_time=0.5;\"",'Log slow queries now'],
      ["sudo mariadb -e \"SHOW GLOBAL VARIABLES LIKE 'slow_query%';\"",'Check (GLOBAL, not session!)'],
      ['sudo nano /etc/my.cnf.d/99-tuning.cnf','Permanent settings (see code)'],
      ['sudo mariadb-check --all-databases --check','Check tables for errors'],
      ['sudo dnf install mysqltuner && sudo mysqltuner','Tuning advice']],
    code:
`# /etc/my.cnf.d/99-tuning.cnf
[mysqld]
innodb_buffer_pool_size = 2G      # ~50-70% of RAM on a DB-only server
max_connections         = 200
slow_query_log          = 1
long_query_time         = 0.5
bind-address            = 0.0.0.0 # listen on the network (default: localhost only)`,
    flags:[
      ["'user'@'host'",'% = any host, localhost = local only'],
      ['SHOW GLOBAL VARIABLES','See server-wide values after SET GLOBAL'],
      ['innodb_buffer_pool_size','The #1 performance setting'],
      ['mariadb-admin status','Quick health line'],
      ['/etc/my.cnf.d/','Drop-in config folder on Fedora']],
    example:{cmd:'sudo mariadb-admin status', out:
`Uptime: 86412  Threads: 3  Questions: 1284901  Slow queries: 12  Opens: 214  Open tables: 187  Queries per second avg: 14.869`},
    warn:'After <code>SET GLOBAL</code>, a plain <code>SHOW VARIABLES</code> still shows your session\'s old value. Use <code>SHOW GLOBAL VARIABLES</code> to confirm the change.' },

  { title:'Valkey (Redis-compatible Cache)', icon:'⚡', badge:'VALKEY', color:'red',
    cmds:[
      ['sudo dnf install valkey','Fedora ships Valkey (open-source Redis fork)'],
      ['sudo systemctl enable --now valkey',''],
      ['valkey-cli ping','PONG = up'],
      ["valkey-cli set session:42 '{\"user\":\"sooraj\"}' EX 3600",'Store with a 1-hour expiry'],
      ['valkey-cli get session:42','Read'],
      ['valkey-cli ttl session:42','Seconds left'],
      ['valkey-cli incr page:views','Atomic counter'],
      ["valkey-cli --scan --pattern 'session:*'",'Find keys safely (never KEYS * in production)'],
      ['valkey-cli info memory | grep -E "used_memory_human|maxmemory"','Memory use'],
      ['valkey-cli config set maxmemory 256mb','Cap memory…'],
      ['valkey-cli config set maxmemory-policy allkeys-lru','…and evict least-used keys when full'],
      ['sudo nano /etc/valkey/valkey.conf','Permanent: requirepass, maxmemory, bind'],
      ['sudo dnf install valkey-compat-redis','redis-cli / redis-server names for old scripts']],
    flags:[
      ['EX <sec>','Expiry on SET'],
      ['--scan --pattern','Non-blocking key listing'],
      ['allkeys-lru','Cache mode: drop old keys'],
      ['noeviction','Default: errors when full'],
      ['-a <password> / AUTH','When requirepass is set']],
    example:{cmd:'valkey-cli info memory | grep -E "^used_memory_human|^maxmemory_human|^maxmemory_policy"', out:
`used_memory_human:1.06M
maxmemory_human:256.00M
maxmemory_policy:allkeys-lru`},
    tip:'Apps and libraries written for Redis work with Valkey unchanged: same protocol, same port 6379.' },

  { title:'SQLite Power Moves', icon:'🪶', badge:'SQLITE', color:'green',
    cmds:[
      ['sqlite3 shop.db','Open (created if missing)'],
      ['.tables','Inside sqlite3: list tables'],
      ['.schema people','Inside sqlite3: show a table definition'],
      ['.mode box','Inside sqlite3: pretty output'],
      ['sqlite3 shop.db "CREATE TABLE people(name TEXT, city TEXT, orders INTEGER);"','Create with types first…'],
      ['sqlite3 shop.db ".import --csv --skip 1 people.csv people"','…then import the CSV (skip header)'],
      ['sqlite3 -box shop.db "SELECT * FROM people WHERE orders > 10 ORDER BY orders DESC;"','Pretty table output'],
      ['sqlite3 -json shop.db "SELECT name, orders FROM people;"','JSON output'],
      ['sqlite3 -csv -header shop.db "SELECT * FROM people;" > export.csv','Export CSV'],
      ['sqlite3 shop.db "PRAGMA journal_mode=WAL;"','Better with many readers + one writer'],
      ['sqlite3 shop.db "VACUUM INTO \'backup.db\';"','Compact backup copy while in use'],
      ['sqlite3 shop.db "PRAGMA integrity_check;"','ok = healthy'],
      ['sqlite3 broken.db ".recover" | sqlite3 fixed.db','Salvage a corrupt database']],
    flags:[
      ['-box / -table / -json / -csv','Output modes'],
      ['.import --csv --skip 1','Import, skip header row'],
      ['WAL','Write-ahead log: concurrent reads'],
      ['VACUUM INTO','Online, compact backup'],
      ['.recover','Rebuild from damaged pages']],
    example:{cmd:'sqlite3 -box shop.db "SELECT name, city, orders FROM people WHERE orders > 10 ORDER BY orders DESC;"', out:
`┌────────┬───────┬────────┐
│  name  │ city  │ orders │
├────────┼───────┼────────┤
│ Ravi   │ Kochi │ 19     │
│ Sooraj │ Doha  │ 12     │
└────────┴───────┴────────┘`},
    warn:'Importing a CSV into a NEW table makes every column TEXT, so <code>orders &gt; 10</code> and <code>ORDER BY orders</code> compare as text and give wrong results. Create the table with column types first, as shown.' },

  { title:'Dev Databases in Containers', icon:'🐳', badge:'DEV DB', color:'blue',
    cmds:[
      ['podman run -d --name pg -e POSTGRES_PASSWORD=dev -p 5432:5432 -v pgdata:/var/lib/postgresql/data:Z docker.io/library/postgres:17','PostgreSQL'],
      ['podman run -d --name maria -e MARIADB_ROOT_PASSWORD=dev -e MARIADB_DATABASE=appdb -p 3306:3306 -v mariadata:/var/lib/mysql:Z docker.io/library/mariadb:11','MariaDB'],
      ['podman run -d --name cache -p 6379:6379 docker.io/valkey/valkey:8','Valkey'],
      ['podman run -d --name adminer -p 8081:8080 docker.io/library/adminer','Web UI for all of them → http://localhost:8081'],
      ['podman exec -it pg psql -U postgres','Shell into Postgres'],
      ['podman exec -it maria mariadb -uroot -pdev','Shell into MariaDB'],
      ['podman exec -it cache valkey-cli','Shell into Valkey'],
      ['podman exec pg pg_dump -U postgres -Fc postgres > dev.dump','Dump from the container'],
      ['podman rm -f pg maria cache adminer','Throw them away (volumes stay)']],
    table:{mono:true, head:['Database','Connection string'], rows:[
      ['PostgreSQL','postgresql://postgres:dev@localhost:5432/postgres'],
      ['MariaDB','mysql://root:dev@localhost:3306/appdb'],
      ['Valkey','redis://localhost:6379/0']]},
    flags:[
      ['-v name:/path:Z','Named volume, SELinux label'],
      ['-e POSTGRES_PASSWORD','Required by the postgres image'],
      ['-p host:container','Reach it from your apps'],
      ['adminer','One small UI for Postgres, MariaDB, SQLite']],
    example:{cmd:'podman ps --format "table {{.Names}}\\t{{.Image}}\\t{{.Ports}}"', out:
`NAMES       IMAGE                              PORTS
pg          docker.io/library/postgres:17      0.0.0.0:5432->5432/tcp
maria       docker.io/library/mariadb:11       0.0.0.0:3306->3306/tcp
cache       docker.io/valkey/valkey:8          0.0.0.0:6379->6379/tcp
adminer     docker.io/library/adminer:latest   0.0.0.0:8081->8080/tcp`},
    tip:'Each project can have its own database version this way, without installing anything on the host. For always-on use, turn them into Quadlets (Containers section).' }
);
})();

/* ═════════════════ MORE SERVERS (v2.41) ═════════════════ */
(function () {
const s = window.FB_DATA.find(x => x.id === 'servers');
s.sub = 'LAN & self-hosting';
s.desc = 'cockpit, nfs, samba, dns & dhcp, ntp, wireguard server, mail relay, load balancer, iscsi, monitoring, self-hosted apps and domain join';
s.cards.push(
  { title:'LAN DNS + DHCP with dnsmasq', icon:'📇', badge:'DNSMASQ', color:'green',
    cmds:[
      ['sudo dnf install dnsmasq',''],
      ['sudo nano /etc/dnsmasq.d/lan.conf','Names + DHCP for your network (see code)'],
      ['dnsmasq --test','Check the config'],
      ['sudo systemctl enable --now dnsmasq',''],
      ['sudo firewall-cmd --add-service={dns,dhcp} --permanent && sudo firewall-cmd --reload',''],
      ['dig +short @192.168.1.2 nas.lan','Test a local name'],
      ['cat /var/lib/dnsmasq/dnsmasq.leases','Who got which IP'],
      ['sudo journalctl -u dnsmasq -f','Live queries (log-queries)'],
      ['sudo systemctl restart dnsmasq','After editing /etc/hosts or the config']],
    code:
`# /etc/dnsmasq.d/lan.conf
interface=enp3s0
bind-interfaces            # don't clash with systemd-resolved on 127.0.0.53
domain-needed
bogus-priv
no-resolv
server=9.9.9.9
server=1.1.1.1
local=/lan/
domain=lan
expand-hosts               # names from /etc/hosts become name.lan
address=/nas.lan/192.168.1.10
dhcp-range=192.168.1.100,192.168.1.200,12h
dhcp-option=option:router,192.168.1.1
dhcp-option=option:dns-server,192.168.1.2
dhcp-host=52:54:00:3a:7c:19,printer,192.168.1.50
cache-size=10000
log-queries`,
    flags:[
      ['bind-interfaces','Only the listed interface (avoids port 53 clash)'],
      ['address=/name/ip','Fixed DNS answer'],
      ['dhcp-range','Pool + lease time'],
      ['dhcp-host=mac,name,ip','Reserved address'],
      ['no-resolv + server=','Ignore resolv.conf, use these upstreams']],
    example:{cmd:'dig @192.168.1.2 nas.lan | grep -E "status|^nas"', out:
`;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39209
nas.lan.		0	IN	A	192.168.1.10`},
    warn:'Only one DHCP server per network: turn DHCP off on your router before enabling <code>dhcp-range</code>.' },

  { title:'Unbound: Private, Encrypted DNS Resolver', icon:'🛡️', badge:'UNBOUND', color:'blue',
    cmds:[
      ['sudo dnf install unbound',''],
      ['sudo nano /etc/unbound/conf.d/lan.conf','Settings (see code)'],
      ['sudo unbound-checkconf','Validate'],
      ['sudo systemctl enable --now unbound',''],
      ['dig +short @127.0.0.1 printer.lan','Local record'],
      ['dig @127.0.0.1 ads.example.com | grep status','Blocked domain → NXDOMAIN'],
      ['sudo unbound-control stats_noreset | grep -E "total.num.queries|cachehits"','Cache hit rate'],
      ['sudo unbound-control flush example.com','Forget one cached name'],
      ['sudo unbound-control reload','Apply config changes']],
    code:
`# /etc/unbound/conf.d/lan.conf
server:
    interface: 127.0.0.1
    interface: 192.168.1.2     # this server's LAN IP (not 0.0.0.0: systemd-resolved owns 127.0.0.53)
    access-control: 127.0.0.0/8 allow
    access-control: 192.168.1.0/24 allow
    prefetch: yes
    hide-identity: yes
    hide-version: yes
    tls-cert-bundle: /etc/pki/tls/certs/ca-bundle.crt
    local-zone: "lan." static
    local-data: "nas.lan. IN A 192.168.1.10"
    local-data: "printer.lan. IN A 192.168.1.50"
    local-zone: "ads.example.com." always_nxdomain

forward-zone:
    name: "."
    forward-tls-upstream: yes
    forward-addr: 9.9.9.9@853#dns.quad9.net
    forward-addr: 1.1.1.1@853#cloudflare-dns.com`,
    flags:[
      ['access-control','Who may use it'],
      ['local-data','Your own records'],
      ['always_nxdomain','Block a domain (ad/tracker lists)'],
      ['forward-tls-upstream','DNS-over-TLS to the upstream'],
      ['prefetch','Refresh popular names before they expire']],
    example:{cmd:'dig @127.0.0.1 ads.example.com | grep status', out:
`;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 55719`},
    tip:'Leave out the forward-zone block and Unbound resolves everything itself from the root servers, so no upstream provider sees your queries.' },

  { title:'NTP Time Server (chrony)', icon:'🕰️', badge:'NTP', color:'green',
    cmds:[
      ['sudo nano /etc/chrony.conf','Add the "allow" lines (see code)'],
      ['sudo systemctl restart chronyd',''],
      ['sudo firewall-cmd --add-service=ntp --permanent && sudo firewall-cmd --reload',''],
      ['sudo chronyc clients','Machines asking this server for time'],
      ['chronyc tracking','How accurate this server is'],
      ['chronyc sources -v','Its upstream servers'],
      ['# On clients: put  server 192.168.1.2 iburst  in /etc/chrony.conf',''],
      ['chronyc -h 192.168.1.2 tracking','Query the server from a client']],
    code:
`# /etc/chrony.conf  (server additions)
pool 2.fedora.pool.ntp.org iburst
allow 192.168.1.0/24       # serve time to the LAN
local stratum 10           # keep serving even if the internet is down
makestep 1.0 3
rtcsync`,
    flags:[
      ['allow <subnet>','Enable serving to these clients'],
      ['local stratum 10','Serve from the local clock when offline'],
      ['chronyc clients','Needs root'],
      ['iburst','Fast first sync']],
    example:{cmd:'sudo chronyc clients', out:
`Hostname                      NTP   Drop Int IntL Last     Cmd   Drop Int  Last
===============================================================================
192.168.1.21                   18      0   6   -    25       0      0   -     -
192.168.1.35                    9      0   7   -    61       0      0   -     -`} },

  { title:'WireGuard VPN Server', icon:'🛰️', badge:'WG SERVER', color:'red',
    cmds:[
      ['sudo dnf install wireguard-tools qrencode',''],
      ['umask 077 && wg genkey | tee server.key | wg pubkey > server.pub','Server keys (umask: private file)'],
      ['wg genkey | tee phone.key | wg pubkey > phone.pub && wg genpsk > phone.psk','One key set per device'],
      ['sudo nano /etc/wireguard/wg0.conf','Server config (see code)'],
      ['echo "net.ipv4.ip_forward = 1" | sudo tee /etc/sysctl.d/99-wireguard.conf && sudo sysctl --system','Route traffic'],
      ['sudo firewall-cmd --add-port=51820/udp --permanent',''],
      ['sudo firewall-cmd --add-masquerade --permanent && sudo firewall-cmd --zone=trusted --add-interface=wg0 --permanent && sudo firewall-cmd --reload','NAT for VPN clients'],
      ['sudo systemctl enable --now wg-quick@wg0','Start + at boot'],
      ['qrencode -t ansiutf8 < phone.conf','Scan with the WireGuard phone app'],
      ['sudo wg set wg0 peer "$(cat laptop.pub)" allowed-ips 10.8.0.3/32 && sudo wg-quick save wg0','Add a device live'],
      ['sudo wg show','Peers, handshakes, traffic']],
    code:
`# /etc/wireguard/wg0.conf  (server)
[Interface]
Address = 10.8.0.1/24
ListenPort = 51820
PrivateKey = <contents of server.key>

[Peer]
# phone
PublicKey = <contents of phone.pub>
PresharedKey = <contents of phone.psk>
AllowedIPs = 10.8.0.2/32

# phone.conf  (client; turned into a QR code)
[Interface]
PrivateKey = <contents of phone.key>
Address = 10.8.0.2/32
DNS = 10.8.0.1

[Peer]
PublicKey = <contents of server.pub>
PresharedKey = <contents of phone.psk>
Endpoint = vpn.example.com:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25`,
    flags:[
      ['AllowedIPs (server side)','Which IP each peer may use (/32)'],
      ['AllowedIPs = 0.0.0.0/0 (client)','Send all traffic through the VPN'],
      ['PresharedKey','Extra (post-quantum) protection'],
      ['wg-quick save','Write live changes back to wg0.conf'],
      ['--add-masquerade','NAT so clients reach the internet']],
    example:{cmd:'sudo wg show', out:
`interface: wg0
  public key: 3kV0vXl2mS8gC0bq5yJpE7rW1tH9aZ4nD6uF2oK8cQs=
  private key: (hidden)
  listening port: 51820

peer: 9Qx2hTk1LwR5vB8nE3mY7cP0aS4dG6fJ2uI9oZ1xV5k=
  preshared key: (hidden)
  endpoint: 37.210.44.18:53122
  allowed ips: 10.8.0.2/32
  latest handshake: 42 seconds ago
  transfer: 18.42 MiB received, 211.07 MiB sent`},
    tip:'Forward UDP 51820 on your router to this server. For a home connection without a fixed IP, use a dynamic-DNS name as the Endpoint. Client-side setup is in Network → VPN.' },

  { title:'Send-Only Mail Relay (Postfix)', icon:'✉️', badge:'MAIL', color:'blue',
    cmds:[
      ['sudo dnf install postfix cyrus-sasl-plain s-nail',''],
      ['sudo nano /etc/postfix/main.cf','Relay settings at the end (see code)'],
      ['echo "[smtp.gmail.com]:587 you@gmail.com:app-password" | sudo tee /etc/postfix/sasl_passwd','Login for the relay'],
      ['sudo chmod 600 /etc/postfix/sasl_passwd && sudo postmap lmdb:/etc/postfix/sasl_passwd',''],
      ['echo "root: you@example.com" | sudo tee -a /etc/aliases && sudo newaliases','Send root\'s mail to you'],
      ['sudo systemctl enable --now postfix',''],
      ['echo "Disk almost full on $(hostname)" | mail -s "Server alert" you@example.com','Test'],
      ['postqueue -p','Stuck mail?'],
      ['sudo postqueue -f','Retry now'],
      ['sudo postsuper -d ALL','Delete everything in the queue'],
      ['sudo journalctl -u postfix -n 20','Delivery errors']],
    code:
`# /etc/postfix/main.cf  (add at the end)
relayhost = [smtp.gmail.com]:587
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = lmdb:/etc/postfix/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_tls_security_level = encrypt
inet_interfaces = loopback-only    # only this machine may send`,
    flags:[
      ['relayhost','Your provider\'s SMTP server'],
      ['lmdb:','Fedora\'s Postfix map format (not hash:)'],
      ['loopback-only','Not an open relay'],
      ['/etc/aliases','Where root / cron mail goes'],
      ['postconf -n','Show your non-default settings']],
    example:{cmd:'postqueue -p', out:
`Mail queue is empty`},
    tip:'Gmail, Outlook and most providers require an "app password" for this, not your normal password. Once set up, cron, smartd and mdadm alerts all reach your inbox.' },

  { title:'HAProxy Load Balancer', icon:'⚖️', badge:'HAPROXY', color:'warn',
    cmds:[
      ['sudo dnf install haproxy',''],
      ['sudo nano /etc/haproxy/haproxy.cfg','Frontends + backends (see code)'],
      ['haproxy -c -f /etc/haproxy/haproxy.cfg','Validate'],
      ['sudo setsebool -P haproxy_connect_any 1','SELinux: allow any backend port'],
      ['sudo systemctl enable --now haproxy',''],
      ['sudo systemctl reload haproxy','Apply changes, no dropped connections'],
      ['curl -s http://127.0.0.1:8404/stats','Stats page (open it in a browser)'],
      ['echo "show servers state" | sudo socat stdio /run/haproxy/admin.sock','Backend status from the CLI'],
      ['echo "disable server app/app1" | sudo socat stdio /run/haproxy/admin.sock','Take one server out for maintenance']],
    code:
`# /etc/haproxy/haproxy.cfg
global
    log /dev/log local0
    stats socket /run/haproxy/admin.sock mode 660 level admin
    maxconn 4096

defaults
    mode http
    log global
    option httplog
    timeout connect 5s
    timeout client 30s
    timeout server 30s

frontend web
    bind *:80
    default_backend app

backend app
    balance roundrobin
    option httpchk GET /health
    server app1 192.168.1.21:3000 check
    server app2 192.168.1.22:3000 check
    server app3 192.168.1.23:3000 check backup

listen stats
    bind 127.0.0.1:8404
    stats enable
    stats uri /stats
    stats refresh 10s`,
    flags:[
      ['balance roundrobin | leastconn | source','How requests are spread'],
      ['option httpchk','Health check URL'],
      ['check / backup','Monitor / use only if others are down'],
      ['stats socket','Runtime control via socat']],
    example:{cmd:'haproxy -c -f /etc/haproxy/haproxy.cfg', out:
`Configuration file is valid`} },

  { title:'iSCSI: Share a Disk over the Network', icon:'💽', badge:'ISCSI', color:'blue',
    cmds:[
      ['sudo dnf install targetcli && sudo systemctl enable --now target','Server (target)'],
      ['sudo targetcli /backstores/fileio create disk1 /srv/iscsi/disk1.img 50G','Create a 50 GB virtual disk'],
      ['sudo targetcli /iscsi create iqn.2026-09.lan.nas:disk1','Publish it'],
      ['sudo targetcli /iscsi/iqn.2026-09.lan.nas:disk1/tpg1/luns create /backstores/fileio/disk1',''],
      ['sudo targetcli /iscsi/iqn.2026-09.lan.nas:disk1/tpg1/acls create iqn.2026-09.lan.laptop:client','Allow one client'],
      ['sudo targetcli saveconfig && sudo firewall-cmd --add-service=iscsi-target --permanent && sudo firewall-cmd --reload',''],
      ['sudo dnf install iscsi-initiator-utils','Client (initiator)'],
      ['echo "InitiatorName=iqn.2026-09.lan.laptop:client" | sudo tee /etc/iscsi/initiatorname.iscsi','Must match the ACL'],
      ['sudo iscsiadm -m discovery -t st -p 192.168.1.10','Find targets'],
      ['sudo iscsiadm -m node -T iqn.2026-09.lan.nas:disk1 -p 192.168.1.10 --login','Connect → new /dev/sdX appears'],
      ['sudo iscsiadm -m session -P 1','Active sessions'],
      ['sudo iscsiadm -m node -T iqn.2026-09.lan.nas:disk1 --logout','Disconnect']],
    flags:[
      ['IQN','iqn.YYYY-MM.reversed.domain:name'],
      ['fileio / block','Backstore: image file / real disk or LV'],
      ['acls','Which initiator IQNs may connect'],
      ['-t st','sendtargets discovery'],
      ['_netdev','fstab option for iSCSI disks']],
    example:{cmd:'sudo iscsiadm -m discovery -t st -p 192.168.1.10', out:
`192.168.1.10:3260,1 iqn.2026-09.lan.nas:disk1`},
    warn:'An iSCSI disk is a raw block device: only one client at a time may mount it (unless you use a cluster filesystem). For sharing files, use NFS or Samba.' },

  { title:'Monitoring: Prometheus + Grafana', icon:'📈', badge:'MONITOR', color:'green',
    cmds:[
      ['podman run -d --name node-exporter --net host --pid host -v /:/host:ro,rslave quay.io/prometheus/node-exporter:latest --path.rootfs=/host','Metrics agent (run on every server)'],
      ['curl -s localhost:9100/metrics | grep "^node_load"','Is it working?'],
      ['nano ~/monitoring/prometheus.yml','What to collect (see code)'],
      ['podman run --rm -v ~/monitoring:/cfg:Z --entrypoint promtool quay.io/prometheus/prometheus check config /cfg/prometheus.yml','Validate'],
      ['podman run -d --name prometheus -p 9090:9090 -v ~/monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:Z -v prom-data:/prometheus:Z quay.io/prometheus/prometheus','Prometheus → http://server:9090'],
      ['podman run -d --name grafana -p 3000:3000 -v grafana:/var/lib/grafana:Z docker.io/grafana/grafana-oss','Grafana → http://server:3000 (admin/admin)'],
      ['# Grafana: add data source http://server:9090, import dashboard ID 1860 ("Node Exporter Full")',''],
      ['sudo firewall-cmd --zone=internal --add-source=192.168.1.0/24 --add-port={9090,9100,3000}/tcp --permanent && sudo firewall-cmd --reload','LAN-only access']],
    code:
`# ~/monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ["localhost:9090"]
  - job_name: nodes
    static_configs:
      - targets: ["192.168.1.10:9100", "192.168.1.20:9100"]
        labels:
          site: home`,
    flags:[
      [':9100','node-exporter metrics'],
      [':9090','Prometheus UI + queries'],
      [':3000','Grafana dashboards'],
      ['--path.rootfs=/host','Report the host, not the container'],
      ['scrape_interval','How often to collect']],
    example:{cmd:'podman run --rm -v ~/monitoring:/cfg:Z --entrypoint promtool quay.io/prometheus/prometheus check config /cfg/prometheus.yml', out:
`Checking /cfg/prometheus.yml
 SUCCESS: /cfg/prometheus.yml is valid prometheus config file syntax`},
    tip:'Cockpit (first card) is enough to watch one machine. Prometheus + Grafana pays off with several servers and months of history.' },

  { title:'Self-Hosted Apps (Podman Quick Starts)', icon:'🏠', badge:'SELFHOST', color:'blue',
    cmds:[
      ['podman run -d --name forgejo -p 3000:3000 -p 2222:22 -v forgejo:/data:Z codeberg.org/forgejo/forgejo:11','Git hosting (GitHub-like)'],
      ['podman run -d --name jellyfin -p 8096:8096 -v jf-config:/config:Z -v /srv/media:/media:ro,z docker.io/jellyfin/jellyfin','Media server'],
      ['podman run -d --name vaultwarden -p 8082:80 -v vw-data:/data:Z docker.io/vaultwarden/server','Password manager (Bitwarden-compatible)'],
      ['podman run -d --name uptime-kuma -p 3001:3001 -v kuma:/app/data:Z docker.io/louislam/uptime-kuma:1','Website/service uptime monitor'],
      ['sudo podman run -d --name adguard -p 53:53/udp -p 53:53/tcp -p 3003:3000 -v adg-conf:/opt/adguardhome/conf:Z -v adg-work:/opt/adguardhome/work:Z docker.io/adguard/adguardhome','Network-wide ad blocking (rootful for port 53)'],
      ['podman run -d --name homeassistant --network host -v ha-config:/config:Z ghcr.io/home-assistant/home-assistant:stable','Home automation'],
      ['podman ps --format "table {{.Names}}\\t{{.Ports}}"','What is running where'],
      ['podman auto-update --dry-run','Updates available?']],
    table:{head:['App','Open in browser'], rows:[
      ['Forgejo','http://server:3000'],
      ['Jellyfin','http://server:8096'],
      ['Vaultwarden','https via your reverse proxy'],
      ['Uptime Kuma','http://server:3001'],
      ['AdGuard Home','http://server:3003 (setup)'],
      ['Home Assistant','http://server:8123']]},
    flags:[
      ['-v name:/path:Z','Data survives container updates'],
      [':ro,z','Shared read-only media folder'],
      ['--network host','Needed for device discovery (Home Assistant)'],
      ['ports < 1024','Need rootful Podman or a sysctl change']],
    example:{cmd:'podman ps --format "table {{.Names}}\\t{{.Ports}}"', out:
`NAMES        PORTS
forgejo      0.0.0.0:2222->22/tcp, 0.0.0.0:3000->3000/tcp
jellyfin     0.0.0.0:8096->8096/tcp
vaultwarden  0.0.0.0:8082->80/tcp
uptime-kuma  0.0.0.0:3001->3001/tcp`},
    tip:'Once an app works, turn it into a Quadlet (Containers section) so it starts at boot and updates itself. Put Vaultwarden behind HTTPS: it refuses to work over plain HTTP.' },

  { title:'Join Active Directory / FreeIPA (realmd + SSSD)', icon:'🏛️', badge:'DOMAIN', color:'warn',
    cmds:[
      ['sudo dnf install realmd sssd oddjob oddjob-mkhomedir adcli samba-common-tools',''],
      ['realm discover ad.example.com','Is the domain reachable? What does it need?'],
      ['sudo realm join ad.example.com -U Administrator','Join (asks for the admin password)'],
      ['realm list','Joined domains'],
      ['id sooraj@ad.example.com','A domain user resolves'],
      ['sudo realm permit -g "Linux Admins@ad.example.com"','Only this group may log in'],
      ['echo "%linux\\ admins@ad.example.com ALL=(ALL) ALL" | sudo tee /etc/sudoers.d/ad-admins','sudo for that group'],
      ['sudo sssctl domain-status ad.example.com','Online? Which DC?'],
      ['sudo sss_cache -E','Clear cached users/groups'],
      ['sudo dnf install freeipa-client && sudo ipa-client-install --mkhomedir','FreeIPA domain instead'],
      ['sudo realm leave ad.example.com','Leave the domain']],
    flags:[
      ['realm discover','Shows type + required packages'],
      ['realm permit / deny','Login access control'],
      ['user@domain','Domain login name format'],
      ['sssctl','SSSD diagnostics'],
      ['--mkhomedir','Create home folders on first login']],
    example:{cmd:'realm discover ad.example.com', out:
`ad.example.com
  type: kerberos
  realm-name: AD.EXAMPLE.COM
  domain-name: ad.example.com
  configured: no
  server-software: active-directory
  client-software: sssd
  required-package: oddjob
  required-package: oddjob-mkhomedir
  required-package: sssd
  required-package: adcli
  required-package: samba-common-tools`},
    tip:'The server\'s DNS must point to the domain controllers, and its clock must be within 5 minutes of theirs (Kerberos). Those two cause most join failures.' }
);
})();

/* ═════════════════ NEW SECTIONS (v2.46): Packaging, Local AI, Gaming ═════════════════ */
(function () {
const D = window.FB_DATA;
const insertAfter = (id, s) => D.splice(D.findIndex(x => x.id === id) + 1, 0, s);

/* ── Packaging ── */
insertAfter('dev', { id:'pkg', icon:'🏗️', title:'Packaging', sub:'RPM & Fedora tools', desc:'build rpms, test them in mock, publish to copr and contribute packages to fedora with fedpkg, koji and bodhi',
  cards:[
  { title:'Set Up a Packaging Workstation', icon:'🧰', badge:'SETUP', color:'blue',
    cmds:[
      ['sudo dnf install fedora-packager rpmdevtools rpmlint mock','Everything a packager needs'],
      ['sudo usermod -aG mock $USER','Allow mock builds without sudo (log out + in)'],
      ['rpmdev-setuptree','Create ~/rpmbuild/{BUILD,RPMS,SOURCES,SPECS,SRPMS}'],
      ['cd ~/rpmbuild/SPECS && rpmdev-newspec hello','Start a spec file from a template'],
      ['spectool -g -R hello.spec','Download every Source: into ~/rpmbuild/SOURCES'],
      ['sudo dnf builddep hello.spec','Install the BuildRequires'],
      ['rpm --eval "%{_libdir} %{dist}"','Show what a macro expands to'],
      ['rpm -E %fedora','Current Fedora release number']],
    flags:[
      ['spectool -g','Get (download) sources'],
      ['spectool -R','Save into the rpmbuild SOURCES dir'],
      ['spectool -l','Only list the source URLs'],
      ['rpmdev-newspec -t lib','Template type: minimal, lib, python, perl…'],
      ['rpm --eval / -E','Expand a macro']],
    example:{cmd:'rpmdev-setuptree && tree -L 1 ~/rpmbuild', out:
`/home/user/rpmbuild
├── BUILD
├── RPMS
├── SOURCES
├── SPECS
└── SRPMS

6 directories, 0 files`},
    tip:'Never build RPMs as root. Build as your normal user, and use <code>mock</code> for clean builds.' },

  { title:'Anatomy of a Spec File', icon:'📜', badge:'SPEC', color:'green',
    code:
`Name:           hello
Version:        2.12.1
Release:        %autorelease
Summary:        The GNU Hello program
License:        GPL-3.0-or-later
URL:            https://www.gnu.org/software/hello/
Source0:        https://ftp.gnu.org/gnu/hello/hello-%{version}.tar.gz

BuildRequires:  gcc make gettext

%description
Prints a friendly greeting. A classic example package.

%prep
%autosetup

%build
%configure
%make_build

%install
%make_install
%find_lang %{name}
rm -f %{buildroot}%{_infodir}/dir

%check
make check

%files -f %{name}.lang
%license COPYING
%doc README NEWS
%{_bindir}/hello
%{_mandir}/man1/hello.1*
%{_infodir}/hello.info*

%changelog
%autochangelog`,
    table:{ head:['Macro','Expands to'], mono:true, rows:[
      ['%{_bindir}','/usr/bin'],
      ['%{_libdir}','/usr/lib64'],
      ['%{_sysconfdir}','/etc'],
      ['%{_datadir}','/usr/share'],
      ['%{_unitdir}','/usr/lib/systemd/system'],
      ['%{buildroot}','Fake root the files are installed into'],
      ['%{?dist}','.fc44']]},
    flags:[
      ['%prep','Unpack + patch (%autosetup does both)'],
      ['%build','Compile'],
      ['%install','Install into %{buildroot}'],
      ['%check','Run the test suite'],
      ['%files','Every file the package owns'],
      ['%autorelease / %autochangelog','Release + changelog generated from git history']],
    tip:'<code>%license</code> and <code>%doc</code> copy files from the source tree into the right places for you.' },

  { title:'Build & Check RPMs', icon:'🔨', badge:'RPMBUILD', color:'blue',
    cmds:[
      ['rpmbuild -ba ~/rpmbuild/SPECS/hello.spec','Build source + binary RPMs'],
      ['rpmbuild -bb hello.spec','Binary RPM only'],
      ['rpmbuild -bs hello.spec','Source RPM (.src.rpm) only'],
      ['rpmbuild -bp hello.spec','Only run %prep (test your patches)'],
      ['rpmbuild --rebuild hello-2.12.1-1.fc44.src.rpm','Rebuild somebody\'s SRPM'],
      ['rpmbuild -ba --nocheck hello.spec','Skip the %check tests'],
      ['rpmlint hello.spec ~/rpmbuild/RPMS/x86_64/hello-*.rpm','Find packaging mistakes'],
      ['rpm -qlp ~/rpmbuild/RPMS/x86_64/hello-2.12.1-1.fc44.x86_64.rpm','Files inside the package'],
      ['rpm -qp --requires hello-2.12.1-1.fc44.x86_64.rpm','What it depends on'],
      ['sudo dnf install ./hello-2.12.1-1.fc44.x86_64.rpm','Install your build']],
    flags:[
      ['-ba / -bb / -bs','All / binary / source'],
      ['-bp / -bc / -bi','Stop after prep / build / install'],
      ['--define "macro value"','Override a macro'],
      ['--with / --without FEATURE','Toggle a %bcond option'],
      ['--nocheck','Skip %check'],
      ['--target=aarch64','Set the target arch (needs a cross toolchain)']],
    example:{cmd:'rpmlint hello.spec', out:
`============================ rpmlint session starts ============================
rpmlint: 2.7.0
configuration:
    /usr/lib/python3.14/site-packages/rpmlint/configdefaults.toml
    /etc/xdg/rpmlint/fedora-spdx-licenses.toml
    /etc/xdg/rpmlint/fedora.toml
checks: 32, packages: 1

hello.spec: W: invalid-url Source0: https://ftp.gnu.org/gnu/hello/hello-2.12.1.tar.gz HTTP Error 404: Not Found
 1 packages and 0 specfiles checked; 0 errors, 1 warnings, 0 badness; has taken 0.3 s`} },

  { title:'Clean Builds with mock', icon:'🧪', badge:'MOCK', color:'green',
    cmds:[
      ['mock -r fedora-44-x86_64 --rebuild hello-2.12.1-1.fc44.src.rpm','Build in a clean Fedora 44 chroot'],
      ['mock -r fedora-rawhide-x86_64 --rebuild hello-*.src.rpm','Test against Rawhide'],
      ['mock -r centos-stream+epel-10-x86_64 --rebuild hello-*.src.rpm','Build for EPEL 10'],
      ['mock --buildsrpm --spec hello.spec --sources ~/rpmbuild/SOURCES','Make the SRPM inside mock'],
      ['ls /var/lib/mock/fedora-44-x86_64/result/','Built RPMs + build.log + root.log'],
      ['mock -r fedora-44-x86_64 --shell','Shell inside the build chroot'],
      ['mock -r fedora-44-x86_64 --install vim-enhanced','Add a package to the chroot'],
      ['mock -r fedora-44-x86_64 --clean','Wipe that chroot'],
      ['mock --scrub=all','Remove every chroot + cache'],
      ['ls /etc/mock/*.cfg | head','Available build targets']],
    flags:[
      ['-r CONFIG','Target, e.g. fedora-44-x86_64'],
      ['--rebuild','Build from an SRPM'],
      ['--resultdir DIR','Where results go'],
      ['--enable-network','Allow network during the build'],
      ['--no-clean','Reuse the existing chroot (faster)'],
      ['--shell / --install','Debug the chroot']],
    example:{cmd:'ls /var/lib/mock/fedora-44-x86_64/result/', out:
`build.log
hello-2.12.1-1.fc44.src.rpm
hello-2.12.1-1.fc44.x86_64.rpm
hello-debuginfo-2.12.1-1.fc44.x86_64.rpm
hello-debugsource-2.12.1-1.fc44.x86_64.rpm
hw_info.log
installed_pkgs.log
root.log
state.log`},
    tip:'A build that works in mock will work in Koji: mock catches missing BuildRequires that your own system happens to have installed.' },

  { title:'COPR: Your Own Package Repo', icon:'🏪', badge:'COPR', color:'blue',
    cmds:[
      ['sudo dnf install copr-cli',''],
      ['# Paste your API token from copr.fedorainfracloud.org/api into ~/.config/copr',''],
      ['copr-cli whoami','Token works?'],
      ['copr-cli create hello --chroot fedora-44-x86_64 --chroot fedora-rawhide-x86_64','New project'],
      ['copr-cli build hello ~/rpmbuild/SRPMS/hello-2.12.1-1.fc44.src.rpm','Upload + build'],
      ['copr-cli buildscm hello --clone-url https://github.com/me/hello.git --spec hello.spec','Build straight from git'],
      ['copr-cli list','Your projects'],
      ['copr-cli status 9123456','State of a build'],
      ['sudo dnf copr enable me/hello && sudo dnf install hello','Users install it like this']],
    flags:[
      ['create --chroot','Releases/arches to build for'],
      ['build --nowait','Don\'t wait for the result'],
      ['buildscm --method','rpkg, tito, make_srpm'],
      ['modify --enable-net on','Allow network during builds'],
      ['delete PROJECT','Remove a project']],
    example:{cmd:'copr-cli build hello hello-2.12.1-1.fc44.src.rpm', out:
`Uploading package hello-2.12.1-1.fc44.src.rpm
100% |################################| 1.1 MB  2.3 MB/s eta 0:00:00
Build was added to hello:
  https://copr.fedorainfracloud.org/coprs/build/9123456
Created builds: 9123456
Watching build(s): (this may be safely interrupted)
  12:04:11 Build 9123456: pending
  12:04:41 Build 9123456: running
  12:06:12 Build 9123456: succeeded`},
    warn:'COPR repos are not reviewed by Fedora. Only enable COPRs from people you trust.' },

  { title:'Contribute to Fedora: fedpkg, Koji & Bodhi', icon:'🎩', badge:'FEDPKG', color:'warn',
    cmds:[
      ['fkinit -u alice','Kerberos login with your Fedora account'],
      ['fedpkg clone hello','Clone a package repo (SSH, for maintainers)'],
      ['fedpkg clone -a hello','Anonymous clone (anyone)'],
      ['fedpkg switch-branch f44','Work on the Fedora 44 branch'],
      ['fedpkg prep','Unpack + patch locally'],
      ['fedpkg local','Build on your machine'],
      ['fedpkg mockbuild','Build in mock'],
      ['fedpkg lint','rpmlint on the spec + builds'],
      ['fedpkg new-sources hello-2.12.2.tar.gz','Upload a new tarball to the lookaside cache'],
      ['fedpkg scratch-build --srpm','Test build in Koji (nothing is released)'],
      ['fedpkg push && fedpkg build','Push to dist-git + real Koji build'],
      ['fedpkg update','Create a Bodhi update'],
      ['koji list-builds --package=hello --state=COMPLETE','Previous builds'],
      ['koji download-build --arch=x86_64 hello-2.12.1-5.fc44','Get RPMs from Koji'],
      ['koji watch-task 140123456','Follow a build'],
      ['bodhi updates query --packages hello','Updates for a package'],
      ['bodhi updates comment FEDORA-2026-1a2b3c4d5e "Works for me" --karma 1','Test + give karma']],
    flags:[
      ['fedpkg clone -a','Read-only, no account needed'],
      ['fedpkg scratch-build','Throw-away Koji build'],
      ['fedpkg update --type','bugfix, enhancement, security, newpackage'],
      ['koji download-build --arch','Only one architecture'],
      ['bodhi … --karma 1 / -1','Positive / negative feedback']],
    example:{cmd:'fedpkg clone -a hello && cd hello && fedpkg sources && ls', out:
`Cloning into 'hello'...
Downloading hello-2.12.1.tar.gz from rpms/hello
######################################################################## 100.0%
hello-2.12.1.tar.gz  hello.spec  sources`},
    tip:'Anyone can help without being a packager: install packages from <b>updates-testing</b> and give karma in Bodhi. That decides when updates reach everyone.' }
  ]});

/* ── Local AI ── */
insertAfter('pkg', { id:'ai', icon:'🧠', title:'Local AI', sub:'RamaLama & Ollama', desc:'run ai models locally and privately with ramalama, ollama and llama.cpp, plus gpu checks and local chat apis',
  cards:[
  { title:'RamaLama (Fedora\'s AI Tool)', icon:'🦙', badge:'RAMALAMA', color:'blue',
    cmds:[
      ['sudo dnf install ramalama','Runs models inside Podman containers'],
      ['ramalama info','Detected GPU, engine + container image'],
      ['ramalama pull tinyllama','Download a small model (short name)'],
      ['ramalama pull ollama://granite3.1-dense:2b','From the Ollama library'],
      ['ramalama pull hf://ggml-org/gemma-3-1b-it-GGUF','From Hugging Face'],
      ['ramalama run granite3.1-dense:2b','Chat in the terminal'],
      ['ramalama serve -d -p 8080 --name chat granite3.1-dense:2b','API + web chat at localhost:8080'],
      ['ramalama list','Downloaded models'],
      ['ramalama ps','Running model containers'],
      ['ramalama stop chat','Stop a served model'],
      ['ramalama rm tinyllama','Delete a model'],
      ['ramalama --nocontainer run tinyllama','Run without containers']],
    flags:[
      ['ollama:// hf:// oci://','Where to get the model from'],
      ['serve -d','Run in the background'],
      ['serve -p PORT','Port for the API'],
      ['--name NAME','Name the container'],
      ['--ngl 0','Don\'t use the GPU (CPU only)'],
      ['--runtime vllm','Use vLLM instead of llama.cpp'],
      ['--nocontainer','Use locally installed llama.cpp']],
    example:{cmd:'ramalama list', out:
`NAME                                        MODIFIED     SIZE
ollama://granite3.1-dense:2b                2 days ago   1.46 GB
ollama://tinyllama:latest                   5 days ago   608.16 MB
hf://ggml-org/gemma-3-1b-it-GGUF            1 hour ago   768.72 MB`},
    tip:'RamaLama picks the right container image for your GPU (CUDA, ROCm, Vulkan or CPU) automatically, so you don\'t install any drivers into your system for AI.' },

  { title:'Ollama', icon:'🐑', badge:'OLLAMA', color:'green',
    cmds:[
      ['curl -fsSL https://ollama.com/install.sh | sh','Official installer (creates the ollama service)'],
      ['podman run -d --name ollama -p 11434:11434 -v ollama:/root/.ollama docker.io/ollama/ollama','…or run it in a container'],
      ['ollama pull llama3.2','Download a model'],
      ['ollama run llama3.2','Chat (/bye to quit)'],
      ['ollama run llama3.2 "Explain SELinux in two sentences"','One-shot answer'],
      ['ollama run llama3.2 "Summarise this log" < /var/log/dnf5.log','Feed a file in'],
      ['ollama list','Downloaded models'],
      ['ollama ps','Loaded models + CPU/GPU split'],
      ['ollama show llama3.2','Parameters, context size, licence'],
      ['ollama stop llama3.2','Unload from memory'],
      ['ollama rm llama3.2','Delete'],
      ['ollama create fedora-helper -f Modelfile','Custom model with your own system prompt'],
      ['sudo systemctl edit ollama','Set OLLAMA_HOST / OLLAMA_MODELS for the service']],
    code:
`# Modelfile
FROM llama3.2
PARAMETER temperature 0.3
PARAMETER num_ctx 8192
SYSTEM """You are a Fedora Linux expert. Answer with exact commands for Fedora 44."""`,
    flags:[
      ['OLLAMA_HOST=0.0.0.0:11434','Listen on the network (default only localhost)'],
      ['OLLAMA_MODELS=/data/ollama','Store models elsewhere'],
      ['OLLAMA_KEEP_ALIVE=30m','How long a model stays loaded'],
      ['/set parameter num_ctx 8192','Inside a chat: bigger context'],
      ['/show info · /bye','Chat commands']],
    example:{cmd:'ollama ps', out:
`NAME               ID              SIZE      PROCESSOR    CONTEXT    UNTIL
llama3.2:latest    a80c4f17acd5    3.5 GB    100% GPU     4096       4 minutes from now`},
    warn:'Setting <code>OLLAMA_HOST=0.0.0.0</code> exposes the API to your whole network without a password. Only do it behind the firewall or a reverse proxy with auth.' },

  { title:'GPU & Memory for AI', icon:'📊', badge:'GPU', color:'warn',
    cmds:[
      ['lspci -nnk | grep -A3 -E "VGA|3D"','Which GPU + driver'],
      ['free -h','RAM: models must fit in RAM or VRAM'],
      ['nvidia-smi --query-gpu=name,memory.used,memory.total --format=csv','NVIDIA VRAM'],
      ['sudo dnf install nvtop && nvtop','Live GPU monitor (NVIDIA, AMD, Intel)'],
      ['sudo dnf install rocminfo rocm-smi','AMD ROCm tools'],
      ['rocminfo | grep -m1 gfx','AMD GPU architecture (e.g. gfx1100)'],
      ['rocm-smi --showmeminfo vram','AMD VRAM use'],
      ['sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml','Let Podman containers use the NVIDIA GPU'],
      ['podman run --rm --device nvidia.com/gpu=all ubuntu nvidia-smi','Test GPU inside a container'],
      ['podman run --rm --device /dev/kfd --device /dev/dri docker.io/rocm/rocm-terminal rocm-smi','Same for AMD']],
    table:{ head:['Model size (Q4)','Needs about','Good for'], rows:[
      ['1–3 B','2–4 GB','Laptops, quick answers, summaries'],
      ['7–8 B','5–8 GB','Everyday chat + coding help'],
      ['13–14 B','9–12 GB','Better reasoning, 12–16 GB GPUs'],
      ['30–32 B','20–24 GB','24 GB GPUs or lots of RAM'],
      ['70 B','40+ GB','Workstations / multi-GPU']]},
    tip:'Unsupported AMD consumer cards often work with <code>HSA_OVERRIDE_GFX_VERSION=10.3.0</code> (RDNA2) or <code>11.0.0</code> (RDNA3). If there is no GPU, models still run on the CPU, just slower.' },

  { title:'llama.cpp & GGUF Models', icon:'⚙️', badge:'LLAMA.CPP', color:'blue',
    cmds:[
      ['sudo dnf install llama-cpp','llama-cli, llama-server and friends'],
      ['pipx install huggingface_hub','Gives the hf download tool'],
      ['hf download Qwen/Qwen2.5-1.5B-Instruct-GGUF qwen2.5-1.5b-instruct-q4_k_m.gguf --local-dir ~/models','Download one GGUF file'],
      ['llama-cli -m ~/models/qwen2.5-1.5b-instruct-q4_k_m.gguf -cnv','Interactive chat'],
      ['llama-cli -m model.gguf -p "Write a haiku about Fedora" -n 64','One prompt, max 64 tokens'],
      ['llama-server -m model.gguf --port 8080 -c 8192','OpenAI-compatible server + web UI'],
      ['llama-server -m model.gguf -ngl 99','Offload all layers to the GPU'],
      ['llama-bench -m model.gguf','Tokens per second on this machine']],
    flags:[
      ['-m FILE','Model (.gguf)'],
      ['-c N','Context size in tokens'],
      ['-ngl N','Layers on the GPU (99 = all)'],
      ['-t N','CPU threads'],
      ['-n N','Max tokens to generate'],
      ['-cnv','Conversation mode'],
      ['--host 0.0.0.0','Listen on the network']],
    example:{cmd:'llama-bench -m qwen2.5-1.5b-instruct-q4_k_m.gguf', out:
`| model                  |     size | params | backend | ngl |  test |           t/s |
| ---------------------- | -------: | -----: | ------- | --: | ----: | ------------: |
| qwen2 1.5B Q4_K - Med  | 1.04 GiB | 1.54 B | Vulkan  |  99 | pp512 | 2210.41 ± 9.8 |
| qwen2 1.5B Q4_K - Med  | 1.04 GiB | 1.54 B | Vulkan  |  99 | tg128 |  118.32 ± 0.6 |`},
    tip:'Q4_K_M is the usual sweet spot between size and quality. pp = reading the prompt, tg = writing the answer (tokens per second).' },

  { title:'Talk to Your Model: APIs & Web Chat', icon:'💬', badge:'API', color:'green',
    cmds:[
      ['curl -s http://localhost:11434/api/generate -d \'{"model":"llama3.2","prompt":"Hi","stream":false}\' | jq -r .response','Ollama native API'],
      ['curl -s http://localhost:8080/v1/chat/completions -H "Content-Type: application/json" -d \'{"model":"granite","messages":[{"role":"user","content":"Hello"}]}\' | jq -r ".choices[0].message.content"','OpenAI-style API (RamaLama, llama-server, Ollama)'],
      ['curl -s http://localhost:11434/api/tags | jq -r ".models[].name"','List models over the API'],
      ['podman run -d --name open-webui -p 3000:8080 -v open-webui:/app/backend/data -e OLLAMA_BASE_URL=http://host.containers.internal:11434 ghcr.io/open-webui/open-webui:main','ChatGPT-like web UI at localhost:3000'],
      ['xdg-open http://localhost:3000','Open it'],
      ['git diff | ollama run llama3.2 "Write a commit message for this diff"','Use AI in a pipe']],
    flags:[
      ['/api/generate','Ollama: single prompt'],
      ['/api/chat','Ollama: chat with history'],
      ['/v1/chat/completions','OpenAI-compatible endpoint'],
      ['"stream": false','One JSON reply instead of a stream'],
      ['host.containers.internal','The host, seen from a Podman container']],
    example:{cmd:'curl -s http://localhost:11434/api/tags | jq -r ".models[].name"', out:
`llama3.2:latest
granite3.1-dense:2b
fedora-helper:latest`},
    tip:'Everything here runs on your machine. Your prompts and files never leave it.' }
  ]});

/* ── Gaming ── */
insertAfter('media', { id:'gaming', icon:'🎮', title:'Gaming', sub:'Steam, Proton & tools', desc:'steam and proton, launch options, gamemode, mangohud, wine, bottles, lutris and vulkan checks',
  cards:[
  { title:'Steam & Proton Setup', icon:'🚂', badge:'STEAM', color:'blue',
    cmds:[
      ['sudo dnf config-manager setopt rpmfusion-nonfree-steam.enabled=1','Enable Fedora\'s third-party Steam repo'],
      ['sudo dnf install steam','Install Steam (RPM)'],
      ['flatpak install flathub com.valvesoftware.Steam','…or the Flatpak version'],
      ['# Steam → Settings → Compatibility → "Enable Steam Play for all other titles"',''],
      ['ls ~/.local/share/Steam/steamapps/common/','Installed games'],
      ['ls ~/.local/share/Steam/steamapps/compatdata/','Proton prefixes (one per game ID)'],
      ['flatpak install flathub net.davidotek.pupgui2','ProtonUp-Qt: install GE-Proton'],
      ['cat /proc/sys/vm/max_map_count','Fedora already sets 1048576 (needed by many games)']],
    flags:[
      ['rpmfusion-nonfree-steam','Repo offered by Fedora Workstation'],
      ['compatdata/APPID','Wine prefix for that game'],
      ['GE-Proton','Community Proton with extra fixes'],
      ['protondb.com','Check how well a game runs']],
    example:{cmd:'dnf repo list --all | grep -i steam', out:
`rpmfusion-nonfree-steam      RPM Fusion for Fedora 44 - Nonfree - Steam   enabled`},
    tip:'Look up a game on ProtonDB first: it tells you if it runs and which launch options or Proton version help.' },

  { title:'Steam Launch Options', icon:'🚀', badge:'LAUNCH', color:'green',
    cmds:[
      ['# Right-click a game → Properties → Launch Options',''],
      ['gamemoderun %command%','Performance mode while the game runs'],
      ['mangohud %command%','FPS + temperature overlay'],
      ['gamemoderun mangohud %command%','Both'],
      ['PROTON_LOG=1 %command%','Write ~/steam-APPID.log for debugging'],
      ['DXVK_HUD=fps,gpuload %command%','DXVK\'s own overlay'],
      ['PROTON_USE_WINED3D=1 %command%','OpenGL fallback if Vulkan breaks'],
      ['%command% -dx11','Ask the game for DirectX 11'],
      ['gamescope -W 2560 -H 1440 -r 144 -- %command%','Run inside gamescope (scaling, HDR, frame limits)']],
    flags:[
      ['%command%','Placeholder for the game\'s own command'],
      ['VAR=value %command%','Set an environment variable for the game'],
      ['PROTON_LOG=1','Log file in your home folder'],
      ['gamescope -f','Fullscreen'],
      ['gamescope -F fsr','AMD FSR upscaling']],
    example:{cmd:'ls ~/steam-*.log', out:
`/home/user/steam-1245620.log`} },

  { title:'GameMode & MangoHud', icon:'📈', badge:'TOOLS', color:'blue',
    cmds:[
      ['sudo dnf install gamemode mangohud gamescope','Install the tools'],
      ['gamemoded -t','Self-test'],
      ['gamemoded -s','Is GameMode active right now?'],
      ['gamemoderun ./game','Use it outside Steam'],
      ['mangohud vkcube','Test the overlay on a Vulkan demo'],
      ['MANGOHUD=1 ./game','Overlay via variable'],
      ['mkdir -p ~/.config/MangoHud && nano ~/.config/MangoHud/MangoHud.conf','Configure (see code)'],
      ['powerprofilesctl set performance','Max performance power profile']],
    code:
`# ~/.config/MangoHud/MangoHud.conf
fps
frametime
gpu_stats
gpu_temp
cpu_stats
cpu_temp
ram
vram
fps_limit=0,60,144     # cycle with Shift_L+F1
toggle_hud=Shift_R+F12
position=top-left`,
    flags:[
      ['Shift_R + F12','Show / hide the overlay'],
      ['Shift_L + F1','Cycle FPS limits'],
      ['Shift_L + F2','Start/stop logging to ~/'],
      ['gamemoded -s','Status'],
      ['/etc/gamemode.ini','System-wide GameMode settings']],
    example:{cmd:'gamemoded -s', out:
`gamemode is active`} },

  { title:'Wine, Bottles, Lutris & Heroic', icon:'🍷', badge:'WINE', color:'warn',
    cmds:[
      ['sudo dnf install wine winetricks','Run Windows programs'],
      ['wine setup.exe','Run an installer'],
      ['WINEPREFIX=~/.wine-office wine setup.exe','Separate prefix per program'],
      ['WINEPREFIX=~/.wine-office winecfg','Windows version, drives, audio'],
      ['winetricks corefonts vcrun2022','Install common runtimes'],
      ['wine uninstaller','Remove Windows programs'],
      ['wineserver -k','Kill everything Wine is running'],
      ['flatpak install flathub com.usebottles.bottles','Bottles: easy, sandboxed prefixes'],
      ['flatpak install flathub net.lutris.Lutris','Lutris: install scripts for many games'],
      ['flatpak install flathub com.heroicgameslauncher.hgl','Heroic: Epic, GOG + Amazon games'],
      ['flatpak install flathub com.github.Matoking.protontricks','protontricks: winetricks for Steam games'],
      ['protontricks -s "elden ring"','Find a game\'s app ID'],
      ['protontricks 1245620 winecfg','winecfg for that game\'s prefix']],
    flags:[
      ['WINEPREFIX=DIR','Which fake C: drive to use'],
      ['WINEARCH=win32','32-bit prefix (old programs)'],
      ['WINEDEBUG=-all','Silence debug output'],
      ['winetricks list-installed','What a prefix has'],
      ['wine --version','Wine version']],
    example:{cmd:'wine --version', out:
`wine-10.15 (Staging)`},
    tip:'Every program in its own prefix (or Bottle) means one broken install never affects the others.' },

  { title:'Vulkan, Drivers & FPS Checks', icon:'🔍', badge:'VULKAN', color:'green',
    cmds:[
      ['sudo dnf install vulkan-tools glx-utils','vulkaninfo, vkcube, glxinfo'],
      ['vulkaninfo --summary','Vulkan GPUs + driver versions'],
      ['vkcube','Spinning cube: Vulkan works'],
      ['glxinfo -B','OpenGL renderer + version'],
      ['ls /usr/share/vulkan/icd.d/','Installed Vulkan drivers'],
      ['sudo dnf install mesa-vulkan-drivers.i686','32-bit Vulkan (older games, Steam)'],
      ['modinfo -F version nvidia','NVIDIA driver version'],
      ['DRI_PRIME=1 vkcube','Run on the discrete GPU (hybrid laptops)'],
      ['switcherooctl list','GPUs GNOME can launch apps on']],
    flags:[
      ['vulkaninfo --summary','Short report'],
      ['MESA_VK_DEVICE_SELECT=list','List devices Mesa sees (then run vkcube)'],
      ['DRI_PRIME=1','Use the other GPU']],
    example:{cmd:'vulkaninfo --summary | sed -n "/Devices:/,$p"', out:
`Devices:
========
GPU0:
	apiVersion         = 1.4.318
	driverVersion      = 25.2.4
	vendorID           = 0x1002
	deviceID           = 0x15bf
	deviceType         = PHYSICAL_DEVICE_TYPE_INTEGRATED_GPU
	deviceName         = AMD Radeon 780M Graphics (RADV PHOENIX)
	driverID           = DRIVER_ID_MESA_RADV
	driverName         = radv
	driverInfo         = Mesa 25.2.4`},
    tip:'Game controllers, NVIDIA drivers and hybrid graphics have their own cards in the <b>Hardware</b> section.' }
  ]});
})();

/* ═════════════════ NEW SECTIONS (v2.46): Cloud, Install & Rescue, Android ═════════════════ */
(function () {
const D = window.FB_DATA;
const insertAfter = (id, s) => D.splice(D.findIndex(x => x.id === id) + 1, 0, s);

/* ── Cloud & IaC ── */
insertAfter('k8s', { id:'cloud', icon:'☁️', title:'Cloud & IaC', sub:'Terraform, CLIs, minikube', desc:'terraform and opentofu, aws, google cloud and azure clis, minikube, cloud-init and fedora cloud images',
  cards:[
  { title:'Terraform & OpenTofu', icon:'🏗️', badge:'IAC', color:'blue',
    cmds:[
      ['sudo dnf config-manager addrepo --from-repofile=https://rpm.releases.hashicorp.com/fedora/hashicorp.repo','HashiCorp repo'],
      ['sudo dnf install terraform','Terraform'],
      ['curl -fsSL https://get.opentofu.org/install-opentofu.sh -o install-opentofu.sh && sh install-opentofu.sh --install-method rpm','…or OpenTofu (open-source fork, command: tofu)'],
      ['terraform init','Download providers + set up state'],
      ['terraform fmt -recursive','Format all .tf files'],
      ['terraform validate','Syntax + type check'],
      ['terraform plan -out=tfplan','Preview changes, save the plan'],
      ['terraform apply tfplan','Apply exactly that plan'],
      ['terraform output -raw ip','Read an output value'],
      ['terraform state list','Resources Terraform manages'],
      ['terraform destroy','Delete everything in this config'],
      ['terraform workspace new staging','Separate state per environment']],
    code:
`# main.tf
terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 6.0" }
  }
}

provider "aws" {
  region = "eu-central-1"
}

variable "ami" { type = string }

resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = "t3.micro"
  tags          = { Name = "fedora-web" }
}

output "ip" { value = aws_instance.web.public_ip }`,
    flags:[
      ['plan -out=FILE','Save a plan to apply later'],
      ['apply -auto-approve','No confirmation (CI only)'],
      ['-var "ami=ami-123"','Set a variable'],
      ['-var-file=prod.tfvars','Variables from a file'],
      ['-target=RESOURCE','Only one resource (emergencies)'],
      ['state rm / import','Forget / adopt a resource']],
    example:{cmd:'terraform plan -var "ami=ami-0abc1234" -out=tfplan | tail -4', out:
`Plan: 1 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + ip = (known after apply)`},
    warn:'The state file (terraform.tfstate) can contain secrets. Never commit it to git; use a remote backend such as S3 with locking.' },

  { title:'AWS CLI', icon:'🟧', badge:'AWS', color:'warn',
    cmds:[
      ['sudo dnf install awscli2','AWS CLI v2'],
      ['aws configure','Access key, secret, region, output format'],
      ['aws configure sso','Log in with IAM Identity Center (recommended)'],
      ['aws sts get-caller-identity','Who am I?'],
      ['aws s3 ls','Buckets'],
      ['aws s3 cp backup.tar.zst s3://my-bucket/backups/','Upload'],
      ['aws s3 sync ./site s3://my-site --delete','Mirror a folder'],
      ['aws ec2 describe-instances --query "Reservations[].Instances[].[InstanceId,State.Name,PublicIpAddress]" --output table','Instances as a table'],
      ['aws ec2 start-instances --instance-ids i-0abc123','Start a VM'],
      ['aws logs tail /aws/lambda/myfunc --follow','Follow CloudWatch logs'],
      ['AWS_PROFILE=prod aws s3 ls','Use another profile']],
    flags:[
      ['--profile NAME','Credentials profile'],
      ['--region REGION','Override region'],
      ['--output json|table|text|yaml','Output format'],
      ['--query JMESPATH','Filter the output'],
      ['--dry-run','Check permissions without doing it (EC2)']],
    example:{cmd:'aws sts get-caller-identity', out:
`{
    "UserId": "AIDAEXAMPLE7Q2ZK3J",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/alice"
}`} },

  { title:'Google Cloud & Azure CLIs', icon:'🌈', badge:'GCP / AZ', color:'blue',
    cmds:[
      ['sudo nano /etc/yum.repos.d/google-cloud-sdk.repo','Add Google\'s repo (see code)'],
      ['sudo dnf install google-cloud-cli','gcloud'],
      ['gcloud init','Log in + choose a project'],
      ['gcloud config set project my-project','Switch project'],
      ['gcloud compute instances list','VMs'],
      ['gcloud compute ssh vm1 --zone europe-west1-b','SSH into a VM'],
      ['gcloud storage cp report.pdf gs://my-bucket/','Upload to Cloud Storage'],
      ['sudo dnf install azure-cli','Azure CLI (in Fedora\'s repos)'],
      ['az login','Browser login'],
      ['az account show -o table','Current subscription'],
      ['az group create -n rg-demo -l westeurope','Resource group'],
      ['az vm list -d -o table','VMs with IPs + power state'],
      ['az group delete -n rg-demo --yes --no-wait','Delete a group and everything in it']],
    code:
`# /etc/yum.repos.d/google-cloud-sdk.repo
[google-cloud-cli]
name=Google Cloud CLI
baseurl=https://packages.cloud.google.com/yum/repos/cloud-sdk-el9-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg`,
    flags:[
      ['gcloud --project ID','One-off project'],
      ['gcloud --format=json','Machine-readable output'],
      ['az -o table|json|tsv','Azure output format'],
      ['az --query JMESPATH','Filter output'],
      ['az account set -s NAME','Switch subscription']],
    example:{cmd:'az account show -o table', out:
`EnvironmentName    HomeTenantId                          IsDefault    Name           State    TenantId
-----------------  ------------------------------------  -----------  -------------  -------  ------------------------------------
AzureCloud         72f988bf-0000-4141-91ab-2d7cd011db47  True         Pay-As-You-Go  Enabled  72f988bf-0000-4141-91ab-2d7cd011db47`} },

  { title:'minikube: Local Kubernetes', icon:'🧊', badge:'MINIKUBE', color:'green',
    cmds:[
      ['curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-latest.x86_64.rpm && sudo dnf install ./minikube-latest.x86_64.rpm','Install'],
      ['minikube start --driver=podman','Cluster in a Podman container'],
      ['minikube start --driver=kvm2 --cpus 4 --memory 8g','…or in a KVM VM'],
      ['minikube status',''],
      ['minikube kubectl -- get pods -A','Built-in kubectl'],
      ['minikube addons enable ingress','Ingress controller'],
      ['minikube addons list','All add-ons'],
      ['minikube dashboard','Web dashboard'],
      ['minikube service web --url','URL for a NodePort service'],
      ['minikube image load myapp:dev','Copy a local image into the cluster'],
      ['minikube stop','Pause the cluster'],
      ['minikube delete --all','Remove every cluster']],
    flags:[
      ['--driver podman|kvm2|docker','Where the cluster runs'],
      ['--cpus / --memory','Resources'],
      ['--kubernetes-version=v1.34.0','Pick a version'],
      ['-p NAME','Several clusters (profiles)'],
      ['--container-runtime=cri-o','Runtime inside the cluster']],
    example:{cmd:'minikube status', out:
`minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured`},
    tip:'kind (in the Kubernetes section) is lighter for CI; minikube has more add-ons and a dashboard for learning.' },

  { title:'Fedora Cloud Images & cloud-init', icon:'🌥️', badge:'CLOUD-INIT', color:'blue',
    cmds:[
      ['# Download Fedora Cloud Base (qcow2 / raw / AWS AMI) from fedoraproject.org/cloud',''],
      ['nano user-data.yaml','First-boot settings (see code)'],
      ['cloud-init schema -c user-data.yaml','Validate user-data before using it'],
      ['cloud-init status --wait','On the VM: wait until first boot is done'],
      ['cloud-init status --long','Details + errors'],
      ['sudo cloud-init query userdata','What the VM received'],
      ['sudo less /var/log/cloud-init-output.log','Output of your commands'],
      ['sudo cloud-init clean --logs','Run again on next boot (for templates)']],
    code:
`#cloud-config
hostname: web01
users:
  - name: admin
    groups: wheel
    sudo: ALL=(ALL) NOPASSWD:ALL
    ssh_authorized_keys:
      - ssh-ed25519 AAAAC3Nza... admin@laptop
package_update: true
packages:
  - nginx
  - htop
runcmd:
  - systemctl enable --now nginx
  - firewall-cmd --permanent --add-service=http
  - firewall-cmd --reload`,
    flags:[
      ['#cloud-config','Must be the first line'],
      ['users / ssh_authorized_keys','Accounts + keys'],
      ['packages','Installed on first boot'],
      ['runcmd','Commands run once'],
      ['write_files','Create config files']],
    example:{cmd:'cloud-init status --long', out:
`status: done
extended_status: done
boot_status_code: enabled-by-generator
last_update: Thu, 01 Oct 2026 09:14:22 +0000
detail: DataSourceNoCloud [seed=/dev/sr0]
errors: []
recoverable_errors: {}`},
    tip:'The same user-data works on AWS, GCP, Azure, OpenStack and local KVM (see "Instant VMs from Cloud Images" in Virtualization).' }
  ]});

/* ── Install & Rescue ── */
insertAfter('boot', { id:'install', icon:'🛟', title:'Install & Rescue', sub:'USB, kickstart, kdump', desc:'create and verify install media, automate installs with kickstart, anaconda boot options and logs, kernel crash dumps with kdump',
  cards:[
  { title:'Create a Bootable USB', icon:'💽', badge:'USB', color:'blue',
    cmds:[
      ['flatpak install flathub org.fedoraproject.MediaWriter','Fedora Media Writer (easiest)'],
      ['lsblk -d -o NAME,SIZE,MODEL,TRAN','Find the USB stick (TRAN = usb)'],
      ['sudo umount /dev/sdb*','Unmount it first'],
      ['sudo dd if=Fedora-Workstation-Live-44.iso of=/dev/sdb bs=4M status=progress oflag=direct conv=fsync','Write the ISO'],
      ['sudo wipefs -a /dev/sdb','Afterwards: wipe it to use as normal storage again']],
    flags:[
      ['of=/dev/sdX','The whole disk, not a partition (sdb, not sdb1)'],
      ['bs=4M','Block size'],
      ['status=progress','Show progress'],
      ['oflag=direct conv=fsync','Really written when dd finishes']],
    example:{cmd:'lsblk -d -o NAME,SIZE,MODEL,TRAN', out:
`NAME      SIZE MODEL                    TRAN
sda     476.9G Samsung SSD 870          sata
sdb      28.7G SanDisk Ultra Fit        usb
nvme0n1 931.5G WD_BLACK SN850X 1000GB   nvme`},
    danger:'<code>dd</code> overwrites the target without asking. Double-check the device name with <code>lsblk</code>: picking your system disk erases it.' },

  { title:'Verify the ISO Download', icon:'✅', badge:'VERIFY', color:'green',
    cmds:[
      ['curl -O https://fedoraproject.org/fedora.gpg','Fedora signing keys'],
      ['gpgv --keyring ./fedora.gpg Fedora-Workstation-44-x86_64-CHECKSUM','Is the CHECKSUM file genuine?'],
      ['sha256sum -c Fedora-Workstation-44-x86_64-CHECKSUM --ignore-missing','Does the ISO match?'],
      ['sudo dnf install isomd5sum && checkisomd5 Fedora-Workstation-Live-44.iso','Embedded media check'],
      ['# At the USB boot menu: "Test this media & start Fedora" does the same',''] ],
    flags:[
      ['gpgv --keyring','Verify against a key file only'],
      ['sha256sum -c','Check files listed in a checksum file'],
      ['--ignore-missing','Skip files you didn\'t download'],
      ['rd.live.check','Boot option: test media first']],
    example:{cmd:'sha256sum -c Fedora-Workstation-44-x86_64-CHECKSUM --ignore-missing', out:
`Fedora-Workstation-Live-44.iso: OK`} },

  { title:'Automated Installs with Kickstart', icon:'🤖', badge:'KICKSTART', color:'blue',
    cmds:[
      ['sudo cat /root/anaconda-ks.cfg','Kickstart of how THIS machine was installed'],
      ['sudo dnf install pykickstart',''],
      ['ksvalidator ks.cfg','Check syntax'],
      ['ksflatten -c ks.cfg -o flat-ks.cfg','Merge %include files into one'],
      ['openssl passwd -6','Make a password hash for the user line'],
      ['python3 -m http.server 8000','Serve ks.cfg on your network'],
      ['# Boot menu → press e → add:  inst.ks=http://192.168.1.5:8000/ks.cfg',''],
      ['sudo virt-install --name web01 --memory 4096 --vcpus 2 --disk size=20 --location https://download.fedoraproject.org/pub/fedora/linux/releases/44/Server/x86_64/os/ --initrd-inject ks.cfg --extra-args "inst.ks=file:/ks.cfg console=ttyS0" --graphics none','Hands-free VM install']],
    code:
`# ks.cfg — Fedora Server, fully automatic
text
lang en_US.UTF-8
keyboard us
timezone Asia/Qatar --utc
network --bootproto=dhcp --hostname=web01
rootpw --lock
user --name=admin --groups=wheel --iscrypted --password=$6$rounds=4096$…
sshkey --username=admin "ssh-ed25519 AAAAC3Nza... admin@laptop"
zerombr
clearpart --all --initlabel --disklabel=gpt
autopart --type=btrfs
bootloader --timeout=3
selinux --enforcing
firewall --enabled --service=ssh
services --enabled=sshd,chronyd
reboot

%packages
@^server-product-environment
vim-enhanced
tmux
%end

%post --log=/root/ks-post.log
dnf -y upgrade
%end`,
    flags:[
      ['inst.ks=URL','Where to fetch the kickstart'],
      ['clearpart --all','Erases every disk it can see'],
      ['autopart --type','btrfs, lvm, plain'],
      ['%packages / %post','Packages / commands after install'],
      ['--initrd-inject','virt-install: put ks.cfg into the installer']],
    example:{cmd:'ksvalidator ks.cfg && echo OK', out:
`OK`},
    danger:'<code>zerombr</code> + <code>clearpart --all</code> wipe every disk in the machine with no question asked. Test kickstarts in a VM first.' },

  { title:'Installer Boot Options & Logs', icon:'🧭', badge:'ANACONDA', color:'warn',
    table:{ head:['Boot option','What it does'], mono:true, rows:[
      ['inst.text','Text-mode installer'],
      ['inst.rdp','Remote graphical install over RDP'],
      ['inst.rdp.username=U inst.rdp.password=P','RDP login for the installer'],
      ['inst.sshd','SSH into the running installer'],
      ['inst.repo=URL','Install from a network mirror'],
      ['inst.ks=URL','Use a kickstart file'],
      ['inst.resolution=1920x1080','Force a screen size'],
      ['nomodeset','Basic graphics (black screen fixes)'],
      ['rd.live.check','Check the media first'],
      ['inst.rescue','Rescue mode instead of installing']]},
    tableFirst:true,
    cmds:[
      ['# At the boot menu press e (UEFI) or Tab (BIOS), add options to the linux line, Ctrl+X to boot',''],
      ['# During install: Ctrl+Alt+F2 opens a shell',''],
      ['less /tmp/anaconda.log','Installer log (during install)'],
      ['less /tmp/storage.log','Disk + partition decisions'],
      ['less /tmp/packaging.log','Package installation'],
      ['sudo ls /var/log/anaconda/','The same logs on the installed system']],
    flags:[
      ['inst.rdp','Replaced inst.vnc in Fedora 42+'],
      ['Ctrl+Alt+F2','Shell during install'],
      ['/var/log/anaconda/','Logs after install']],
    example:{cmd:'sudo ls /var/log/anaconda/', out:
`anaconda.log  dbus.log  dnf.librepo.log  journal.log  lvm.log  packaging.log  program.log  storage.log  syslog`} },

  { title:'Kernel Crash Dumps (kdump)', icon:'💥', badge:'KDUMP', color:'red',
    cmds:[
      ['sudo dnf install kexec-tools','kdump service + tools'],
      ['sudo kdumpctl reset-crashkernel','Reserve memory for the crash kernel'],
      ['sudo reboot','Needed once for the reservation'],
      ['sudo systemctl enable --now kdump',''],
      ['sudo kdumpctl status','Ready?'],
      ['sudo kdumpctl showmem','Reserved memory'],
      ['cat /proc/cmdline | grep -o "crashkernel=[^ ]*"','Kernel parameter in use'],
      ['ls /var/crash/','Saved dumps (one folder per crash)'],
      ['sudo dnf debuginfo-install kernel-core','Symbols to analyse dumps'],
      ['sudo dnf install crash',''],
      ['sudo crash /usr/lib/debug/lib/modules/$(uname -r)/vmlinux /var/crash/*/vmcore','Open a dump (bt = backtrace, log = kernel log)']],
    flags:[
      ['kdumpctl reset-crashkernel','Set a sensible crashkernel= size'],
      ['/etc/kdump.conf','Where + how dumps are saved (local, ssh, nfs)'],
      ['core_collector makedumpfile -l -d 31','Compressed, filtered dumps'],
      ['vmcore-dmesg.txt','Kernel log from the crash (read this first)']],
    example:{cmd:'sudo kdumpctl status', out:
`kdump: Kdump is operational`},
    danger:'To test: <code>echo c | sudo tee /proc/sysrq-trigger</code> crashes the machine on purpose. Save your work and only do it on a test system.' },

  { title:'Back Up Before Reinstalling', icon:'🧳', badge:'REINSTALL', color:'green',
    cmds:[
      ['dnf repoquery --userinstalled --qf "%{name}\\n" > ~/my-packages.txt','Packages you installed yourself'],
      ['flatpak list --app --columns=application > ~/my-flatpaks.txt','Your Flatpaks'],
      ['dconf dump / > ~/gnome-settings.ini','Desktop settings'],
      ['sudo tar -czf ~/etc-backup.tar.gz /etc','System configuration'],
      ['rsync -aHAX --info=progress2 ~/ /run/media/$USER/Backup/home/','Copy your home folder'],
      ['# After reinstalling:',''],
      ['sudo dnf install $(cat ~/my-packages.txt)','Packages back'],
      ['xargs -a ~/my-flatpaks.txt flatpak install -y flathub','Flatpaks back'],
      ['dconf load / < ~/gnome-settings.ini','Settings back']],
    flags:[
      ['--userinstalled','Only packages you asked for'],
      ['rsync -aHAX','Keep permissions, hard links, ACLs, xattrs'],
      ['dconf dump / load','Export / import settings']],
    example:{cmd:'wc -l ~/my-packages.txt ~/my-flatpaks.txt', out:
`  187 /home/user/my-packages.txt
   23 /home/user/my-flatpaks.txt
  210 total`},
    tip:'On the default Btrfs layout, the installer can keep your <code>home</code> subvolume: pick "Custom", assign the existing home to /home and do not tick "Reformat".' }
  ]});

/* ── Android & Phone ── */
insertAfter('hardware', { id:'android', icon:'📱', title:'Android & Phone', sub:'adb, scrcpy, KDE Connect', desc:'adb and fastboot, mirror your phone with scrcpy, kde connect and gsconnect, mtp file transfer and iphones',
  cards:[
  { title:'adb Basics', icon:'🤖', badge:'ADB', color:'green',
    cmds:[
      ['sudo dnf install android-tools','adb + fastboot'],
      ['# Phone: Settings → About → tap Build number 7× → Developer options → USB debugging',''],
      ['adb devices -l','Connected phones (accept the prompt on the phone)'],
      ['adb shell','Shell on the phone'],
      ['adb shell getprop ro.build.version.release','Android version'],
      ['adb install app.apk','Install an APK'],
      ['adb install -r app.apk','Reinstall / update, keep data'],
      ['adb shell pm list packages -3','Apps you installed'],
      ['adb uninstall com.example.app','Remove an app'],
      ['adb push notes.pdf /sdcard/Download/','Copy to the phone'],
      ['adb pull /sdcard/DCIM/Camera ./photos','Copy from the phone'],
      ['adb exec-out screencap -p > screen.png','Screenshot to the PC'],
      ['adb logcat -v time *:E','Only errors from the log'],
      ['adb reboot','Restart the phone'],
      ['adb kill-server','Fix "device offline"']],
    flags:[
      ['-s SERIAL','Pick a device when several are connected'],
      ['-d / -e','Only USB device / only emulator'],
      ['install -r / -g','Replace / grant all permissions'],
      ['pm list packages -3 / -s','Third-party / system apps'],
      ['logcat -c','Clear the log']],
    example:{cmd:'adb devices -l', out:
`List of devices attached
2B111FDH2002WK    device usb:3-2 product:husky model:Pixel_8_Pro device:husky transport_id:1`},
    tip:'"unauthorized" means the phone is waiting for you: unlock it and tap "Allow USB debugging".' },

  { title:'Wireless adb', icon:'📶', badge:'WIFI', color:'blue',
    cmds:[
      ['# Phone: Developer options → Wireless debugging → Pair device with pairing code',''],
      ['adb pair 192.168.1.40:37123','Enter the 6-digit code from the phone'],
      ['adb connect 192.168.1.40:41235','Connect (port shown under Wireless debugging)'],
      ['adb devices',''],
      ['adb tcpip 5555 && adb connect 192.168.1.40:5555','Older phones: switch a USB connection to Wi-Fi'],
      ['adb disconnect','Disconnect all'],
      ['sudo firewall-cmd --add-port=5555/tcp','Only if your firewall blocks it']],
    flags:[
      ['adb pair HOST:PORT','One-time pairing (Android 11+)'],
      ['adb connect HOST:PORT','Connect over Wi-Fi'],
      ['adb tcpip PORT','Legacy: restart adbd on Wi-Fi']],
    example:{cmd:'adb connect 192.168.1.40:41235', out:
`connected to 192.168.1.40:41235`} },

  { title:'fastboot: Bootloader Tools', icon:'⚡', badge:'FASTBOOT', color:'red',
    cmds:[
      ['adb reboot bootloader','Into fastboot mode'],
      ['fastboot devices',''],
      ['fastboot getvar all 2>&1 | head -20','Bootloader info'],
      ['fastboot getvar current-slot','A/B slot in use'],
      ['fastboot flashing unlock','Unlock the bootloader (WIPES the phone)'],
      ['fastboot boot recovery.img','Boot an image once, without flashing'],
      ['fastboot flash boot boot.img','Flash a partition'],
      ['fastboot --set-active=a','Switch slot'],
      ['fastboot -w','Wipe user data'],
      ['fastboot flashing lock','Re-lock (also wipes)'],
      ['fastboot reboot','Back to Android']],
    flags:[
      ['flash PARTITION FILE','Write an image'],
      ['boot FILE','Temporary boot (safer than flash)'],
      ['--set-active=a|b','A/B slot'],
      ['-w','Wipe userdata + cache'],
      ['getvar all','Every bootloader variable']],
    example:{cmd:'fastboot devices', out:
`2B111FDH2002WK	 fastboot`},
    danger:'Unlocking or locking the bootloader erases everything on the phone, and flashing the wrong image can brick it. Back up first and only use images made for your exact model.' },

  { title:'Mirror & Control: scrcpy', icon:'🖥️', badge:'SCRCPY', color:'blue',
    cmds:[
      ['sudo dnf copr enable zeno/scrcpy && sudo dnf install scrcpy','Install'],
      ['scrcpy','Mirror + control the phone (USB debugging on)'],
      ['scrcpy -m 1280 -b 8M','Lower resolution + bitrate'],
      ['scrcpy --turn-screen-off --stay-awake','Phone screen off, PC shows it'],
      ['scrcpy --record phone.mp4','Record the screen'],
      ['scrcpy --no-audio','Video only'],
      ['scrcpy --video-source=camera --camera-facing=back','Use the phone camera'],
      ['scrcpy --tcpip=192.168.1.40','Wireless'],
      ['scrcpy --keyboard=uhid','Type with the PC keyboard like a real keyboard'],
      ['scrcpy --new-display=1920x1080','Separate virtual display (Android 10+)']],
    flags:[
      ['-m SIZE','Max width/height'],
      ['-b RATE','Video bitrate'],
      ['-S / -w','Screen off / stay awake'],
      ['Alt+f','Fullscreen'],
      ['Alt+h / Alt+b','Home / Back'],
      ['Alt+o','Turn phone screen off'],
      ['Alt+c / Alt+v','Copy / paste between phone and PC']],
    example:{cmd:'scrcpy --no-audio -m 1280', out:
`scrcpy 3.3.3 <https://github.com/Genymobile/scrcpy>
INFO: ADB device found:
INFO:     -->   (usb)  2B111FDH2002WK                  device  Pixel_8_Pro
INFO: Renderer: opengl
INFO: Texture: 576x1280`},
    tip:'Drag an APK onto the scrcpy window to install it; drag any other file to copy it to /sdcard/Download.' },

  { title:'KDE Connect & GSConnect', icon:'🔗', badge:'CONNECT', color:'green',
    cmds:[
      ['sudo dnf install kde-connect','KDE Plasma'],
      ['sudo dnf install gnome-shell-extension-gsconnect','GNOME (same phone app)'],
      ['sudo firewall-cmd --permanent --add-service=kdeconnect && sudo firewall-cmd --reload','Ports 1714–1764'],
      ['kdeconnect-cli --refresh && kdeconnect-cli -a','Phones on your network'],
      ['kdeconnect-cli -n Pixel --pair','Pair'],
      ['kdeconnect-cli -n Pixel --ping-msg "Hello from Fedora"','Notification on the phone'],
      ['kdeconnect-cli -n Pixel --share ~/Downloads/ticket.pdf','Send a file'],
      ['kdeconnect-cli -n Pixel --ring','Find my phone'],
      ['kdeconnect-cli -n Pixel --send-sms "On my way" --destination +97455501234','Send an SMS']],
    flags:[
      ['-a / -l','Available / all known devices'],
      ['-n NAME / -d ID','Which device'],
      ['--share FILE|URL','Send to the phone'],
      ['--ring','Ring loudly'],
      ['--send-sms … --destination','Text from the PC']],
    example:{cmd:'kdeconnect-cli -a', out:
`- Pixel 8 Pro: 7c1e2b9a_4f3d_4a51_9e2c_1b2a3c4d5e6f (paired and reachable)
1 device found`} },

  { title:'Files over USB (MTP) & iPhones', icon:'📂', badge:'MTP', color:'blue',
    cmds:[
      ['# Phone: plug in → notification → "File transfer"; it appears in Files',''],
      ['gio mount -li | grep -i -A2 mtp','Is the phone mounted?'],
      ['ls /run/user/$UID/gvfs/','Mounted phones live here'],
      ['sudo dnf install gvfs-mtp','If phones don\'t show up'],
      ['sudo dnf install libimobiledevice-utils ifuse','iPhone tools'],
      ['idevicepair pair','Trust this PC (confirm on the iPhone)'],
      ['ideviceinfo -k ProductVersion','iOS version'],
      ['mkdir -p ~/iphone && ifuse ~/iphone','Mount the iPhone\'s photos + media'],
      ['fusermount3 -u ~/iphone','Unmount'],
      ['idevicescreenshot','Screenshot from the iPhone']],
    flags:[
      ['gio mount -li','All mountable devices'],
      ['gvfs/mtp:host=…','Path of an MTP phone'],
      ['ifuse --documents APPID','An app\'s documents folder'],
      ['idevicesyslog','Live iPhone log']],
    example:{cmd:'ls /run/user/$UID/gvfs/', out:
`'mtp:host=Google_Pixel_8_Pro_2B111FDH2002WK'`},
    tip:'MTP is slow with many small files. For large photo backups, <code>adb pull</code> is usually much faster.' }
  ]});
})();

/* ═════════════════ GAP FILLERS (v2.46) ═════════════════ */
(function () {
const sec = id => window.FB_DATA.find(x => x.id === id);

sec('network').cards.push(
  { title:'mtr & Finding Devices (.local)', icon:'🛰️', badge:'MTR', color:'blue',
    cmds:[
      ['sudo dnf install mtr avahi-tools',''],
      ['mtr 1.1.1.1','Live traceroute + ping for every hop'],
      ['mtr -rwzc 50 1.1.1.1','50-probe report: wide, with AS numbers'],
      ['mtr -T -P 443 example.com','TCP probes (where ICMP is blocked)'],
      ['mtr -4 -b example.com','IPv4 only, show IPs and names'],
      ['avahi-browse -art','Every mDNS service on the LAN (printers, NAS, TVs)'],
      ['avahi-browse -rt _ipp._tcp','Only printers'],
      ['avahi-resolve -n nas.local','Name → IP'],
      ['avahi-resolve -a 192.168.1.10','IP → name'],
      ['ping -c 2 printer.local','.local names work out of the box on Fedora']],
    flags:[
      ['-r -c N','Report mode with N probes'],
      ['-w','Wide report (full host names)'],
      ['-z','Show AS numbers'],
      ['-T -P PORT','TCP to a port'],
      ['avahi-browse -a -r -t','All services, resolve, terminate when done']],
    example:{cmd:'mtr -rwc 10 1.1.1.1', out:
`Start: 2026-10-02T23:50:11+0300
HOST: fedora                       Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- _gateway                    0.0%    10    0.6   0.7   0.5   1.1   0.2
  2.|-- 10.20.0.1                   0.0%    10    3.9   4.2   3.1   6.8   1.0
  3.|-- 185.24.80.17                0.0%    10    4.8   5.0   4.4   6.1   0.5
  4.|-- one.one.one.one             0.0%    10    5.2   5.3   4.9   6.0   0.3`},
    tip:'Loss on one middle hop but not on later ones is normal (routers deprioritise replies). Only loss that continues to the last hop is a real problem.' },

  { title:'Tailscale Mesh VPN', icon:'🕸️', badge:'TAILSCALE', color:'green',
    cmds:[
      ['sudo dnf config-manager addrepo --from-repofile=https://pkgs.tailscale.com/stable/fedora/tailscale.repo','Tailscale repo'],
      ['sudo dnf install tailscale',''],
      ['sudo systemctl enable --now tailscaled',''],
      ['sudo tailscale up','Log in (opens a link)'],
      ['tailscale status','Devices in your tailnet'],
      ['tailscale ip -4','This machine\'s 100.x address'],
      ['tailscale ping nas','Direct or relayed?'],
      ['ssh user@nas','MagicDNS names work everywhere'],
      ['sudo tailscale up --advertise-exit-node','Offer this machine as an exit node'],
      ['sudo tailscale set --exit-node=nas','Route all traffic through "nas"'],
      ['tailscale file cp report.pdf phone:','Send a file (Taildrop)'],
      ['sudo tailscale serve --bg 8080','Share a local web app inside the tailnet'],
      ['sudo tailscale down','Disconnect']],
    flags:[
      ['up --ssh','Enable Tailscale SSH'],
      ['up --advertise-routes=192.168.1.0/24','Subnet router'],
      ['set --exit-node=NAME','Use an exit node ("" to stop)'],
      ['serve / funnel','Share inside the tailnet / to the internet'],
      ['netcheck','NAT + relay diagnostics']],
    example:{cmd:'tailscale status', out:
`100.101.12.7    fedora     alice@  linux   -
100.88.40.21    nas        alice@  linux   active; direct 192.168.1.10:41641
100.92.3.66     phone      alice@  android idle`},
    tip:'Tailscale uses WireGuard underneath; no ports need to be opened on your router.' }
);

sec('security').cards.push(
  { title:'Unlock LUKS with TPM2 or a FIDO2 Key', icon:'🔑', badge:'CRYPTENROLL', color:'blue',
    cmds:[
      ['lsblk -f | grep crypto_LUKS','Find the encrypted partition'],
      ['sudo systemd-cryptenroll /dev/nvme0n1p3','List key slots'],
      ['systemd-cryptenroll --tpm2-device=list','TPM2 chip available?'],
      ['sudo systemd-cryptenroll /dev/nvme0n1p3 --recovery-key','Add a recovery key FIRST (write it down)'],
      ['sudo systemd-cryptenroll /dev/nvme0n1p3 --tpm2-device=auto --tpm2-pcrs=7','Unlock automatically with the TPM'],
      ['sudo systemd-cryptenroll /dev/nvme0n1p3 --fido2-device=auto','…or with a YubiKey / security key'],
      ['sudo nano /etc/crypttab','Add tpm2-device=auto or fido2-device=auto (see code)'],
      ['sudo dracut -f','Rebuild the initramfs'],
      ['sudo systemd-cryptenroll /dev/nvme0n1p3 --wipe-slot=tpm2','Remove TPM unlocking']],
    code:
`# /etc/crypttab — 4th column holds the options
luks-3f2a…  UUID=3f2a…  none  discard,tpm2-device=auto
# or
luks-3f2a…  UUID=3f2a…  none  discard,fido2-device=auto`,
    flags:[
      ['--tpm2-device=auto','Use the TPM'],
      ['--tpm2-pcrs=7','Bind to Secure Boot state'],
      ['--tpm2-with-pin=yes','TPM + PIN'],
      ['--fido2-device=auto','Security key (touch to unlock)'],
      ['--recovery-key','Generate a recovery passphrase'],
      ['--wipe-slot=tpm2|fido2|all','Remove enrolments']],
    example:{cmd:'sudo systemd-cryptenroll /dev/nvme0n1p3', out:
`SLOT TYPE
   0 password
   1 recovery
   2 tpm2`},
    warn:'Keep the password or recovery key. Firmware updates or Secure Boot changes can change the PCRs, and then the TPM won\'t unlock.' },

  { title:'fapolicyd: Only Trusted Programs May Run', icon:'🚦', badge:'FAPOLICYD', color:'warn',
    cmds:[
      ['sudo dnf install fapolicyd',''],
      ['sudo systemctl enable --now fapolicyd','Programs from RPMs are trusted automatically'],
      ['sudo fapolicyd-cli --list','Active rules'],
      ['sudo fapolicyd-cli --file add /opt/tool/bin/tool --trust-file tool','Trust a program not from an RPM'],
      ['sudo fapolicyd-cli --update','Reload the trust database'],
      ['sudo fapolicyd-cli --check-trustdb','Trusted files changed on disk?'],
      ['sudo fapolicyd-cli --check-config','Validate the configuration'],
      ['sudo systemctl stop fapolicyd && sudo fapolicyd --debug-deny','Show what gets blocked, live'],
      ['sudo ausearch -m FANOTIFY -ts recent','Denials in the audit log'],
      ['ls /etc/fapolicyd/rules.d/','Rule files (applied in order)']],
    flags:[
      ['--file add PATH --trust-file NAME','Add to /etc/fapolicyd/trust.d/NAME'],
      ['--file delete PATH','Remove trust'],
      ['--debug-deny','Foreground, print denials only'],
      ['permissive = 1','fapolicyd.conf: log only, don\'t block']],
    example:{cmd:'sudo fapolicyd-cli --check-trustdb', out:
`Checking file /opt/tool/bin/tool ... OK
Trust database checks OK`},
    warn:'Start with <code>permissive = 1</code> in /etc/fapolicyd/fapolicyd.conf and read the logs for a few days, or you may block your own scripts and apps.' },

  { title:'Secrets in Git with sops + age', icon:'🗝️', badge:'SOPS', color:'green',
    cmds:[
      ['sudo dnf install age','age encryption'],
      ['sudo dnf install https://github.com/getsops/sops/releases/download/v3.10.2/sops-3.10.2-1.x86_64.rpm','sops (check GitHub for newer)'],
      ['mkdir -p ~/.config/sops/age && age-keygen -o ~/.config/sops/age/keys.txt','Your private key'],
      ['grep public ~/.config/sops/age/keys.txt','Public key (age1…)'],
      ['nano .sops.yaml','Which files + keys (see code)'],
      ['sops -e secrets.yaml > secrets.enc.yaml','Encrypt (values only, keys stay readable)'],
      ['sops secrets.enc.yaml','Edit in $EDITOR, re-encrypts on save'],
      ['sops -d secrets.enc.yaml','Decrypt to stdout'],
      ['sops -d --extract \'["db"]["password"]\' secrets.enc.yaml','One value'],
      ['sops exec-env secrets.enc.env \'./deploy.sh\'','Run with secrets as env vars'],
      ['sops updatekeys secrets.enc.yaml','After adding a teammate\'s key']],
    code:
`# .sops.yaml
creation_rules:
  - path_regex: .*\\.enc\\.(yaml|json|env)$
    age: >-
      age1qz5…alice,
      age1x7k…bob`,
    flags:[
      ['-e / -d','Encrypt / decrypt'],
      ['-i','In place'],
      ['--extract PATH','Single value'],
      ['exec-env FILE CMD','Secrets as environment'],
      ['SOPS_AGE_KEY_FILE','Key file location']],
    example:{cmd:'sops -d secrets.enc.yaml', out:
`db:
  user: app
  password: s3cr3t-Pa55`},
    tip:'Encrypted files diff nicely in git, because only the values are encrypted. Never commit keys.txt.' }
);

sec('files').cards.push(
  { title:'locate, duf & dust', icon:'🔎', badge:'FAST', color:'blue',
    cmds:[
      ['sudo dnf install plocate duf du-dust',''],
      ['sudo updatedb','Build the file index now (a timer does it daily)'],
      ['locate -i invoice','Instant search by name, ignore case'],
      ['locate -b "\\nginx.conf"','Exact file name only'],
      ['locate -c "*.iso"','Just count matches'],
      ['systemctl status plocate-updatedb.timer','When the index is refreshed'],
      ['duf','Pretty disk usage per filesystem'],
      ['duf --only local','Hide network + special filesystems'],
      ['dust','Biggest folders here, as a tree'],
      ['dust -d 2 ~','Two levels deep'],
      ['dust -n 15 -r /var','Top 15, largest at the top']],
    flags:[
      ['locate -i / -c / -b','Ignore case / count / basename'],
      ['locate -e','Only files that still exist'],
      ['duf --only local,network','Filter by type'],
      ['dust -d N / -n N','Depth / number of rows'],
      ['dust -r','Reverse order']],
    example:{cmd:'duf --only local', out:
`╭──────────────────────────────────────────────────────────────────────────╮
│ 3 local devices                                                          │
├────────────┬────────┬────────┬────────┬────────┬───────┬────────────────┤
│ MOUNTED ON │   SIZE │   USED │  AVAIL │  USE%  │ TYPE  │ FILESYSTEM     │
├────────────┼────────┼────────┼────────┼────────┼───────┼────────────────┤
│ /          │ 930.5G │ 212.4G │ 716.3G │  22.8% │ btrfs │ /dev/nvme0n1p3 │
│ /boot      │ 973.4M │ 312.6M │ 593.6M │  32.1% │ ext4  │ /dev/nvme0n1p2 │
│ /boot/efi  │ 598.8M │  19.6M │ 579.2M │   3.3% │ vfat  │ /dev/nvme0n1p1 │
╰────────────┴────────┴────────┴────────┴────────┴───────┴────────────────╯`},
    tip:'<code>locate</code> only knows files from the last index run. For brand-new files use <code>find</code> or run <code>sudo updatedb</code> first.' },

  { title:'Mount on Demand with autofs', icon:'🪄', badge:'AUTOFS', color:'green',
    cmds:[
      ['sudo dnf install autofs',''],
      ['sudo nano /etc/auto.master.d/nas.autofs','Where to mount (see code)'],
      ['sudo nano /etc/auto.nas','What to mount'],
      ['sudo systemctl enable --now autofs',''],
      ['ls /mnt/nas/media','First access mounts it automatically'],
      ['mount | grep /mnt/nas','Mounted now'],
      ['sudo systemctl reload autofs','After editing maps'],
      ['sudo automount -f -v','Debug in the foreground (stop the service first)']],
    code:
`# /etc/auto.master.d/nas.autofs
/mnt/nas  /etc/auto.nas  --timeout=300

# /etc/auto.nas
media    -fstype=nfs4,rw,soft       nas.lan:/srv/media
backup   -fstype=nfs4,rw            nas.lan:/srv/backup
share    -fstype=cifs,credentials=/etc/samba/nas.cred,uid=1000  ://nas.lan/share`,
    flags:[
      ['--timeout=SEC','Unmount after this idle time'],
      ['-fstype=nfs4 / cifs','Filesystem type'],
      ['credentials=FILE','Samba login file (chmod 600)'],
      ['/- (direct map)','Mount at absolute paths instead']],
    example:{cmd:'ls /mnt/nas/media && mount | grep nas.lan', out:
`Movies  Music  Photos
nas.lan:/srv/media on /mnt/nas/media type nfs4 (rw,relatime,vers=4.2,soft,…)`},
    tip:'Unlike fstab, a NAS that is switched off never delays your boot: autofs only mounts when something opens the folder.' }
);

sec('dev').cards.push(
  { title:'Inspect Binaries & Libraries', icon:'🔬', badge:'ELF', color:'blue',
    cmds:[
      ['file /usr/bin/ls','Type, arch, stripped?'],
      ['readelf -h /usr/bin/ls','ELF header'],
      ['readelf -d /usr/bin/ls | grep NEEDED','Libraries it needs'],
      ['readelf -n /usr/bin/ls | grep "Build ID"','Build ID (matches debuginfo)'],
      ['objdump -d -M intel --no-show-raw-insn ./app | less','Disassemble'],
      ['objdump -h ./app','Sections'],
      ['nm -C ./app | grep " T "','Functions defined in the program (demangled)'],
      ['nm -D --defined-only /usr/lib64/libz.so.1','Symbols a library exports'],
      ['ldd ./app','Resolved libraries'],
      ['sudo dnf install patchelf',''],
      ['patchelf --print-rpath ./app','Library search path'],
      ['patchelf --set-rpath \'$ORIGIN/../lib\' ./app','Find libs relative to the binary'],
      ['pkg-config --cflags --libs gtk4','Compiler flags for a library'],
      ['pkg-config --modversion openssl','Installed version'],
      ['pkg-config --list-all | grep -i glib','Available .pc files']],
    flags:[
      ['readelf -h/-S/-d/-s','Header / sections / dynamic / symbols'],
      ['objdump -d -M intel','Intel syntax disassembly'],
      ['nm -C / -D','Demangle C++ / dynamic symbols'],
      ['patchelf --set-interpreter','Change the dynamic loader'],
      ['pkg-config --exists NAME','Exit 0 if available']],
    example:{cmd:'readelf -d /usr/bin/ls | grep NEEDED', out:
` 0x0000000000000001 (NEEDED)             Shared library: [libselinux.so.1]
 0x0000000000000001 (NEEDED)             Shared library: [libcap.so.2]
 0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]`} },

  { title:'GitLab CLI, Jupyter & Perl One-liners', icon:'🧪', badge:'MORE', color:'green',
    cmds:[
      ['sudo dnf install glab','GitLab CLI'],
      ['glab auth login',''],
      ['glab mr create --fill --draft','Merge request from the current branch'],
      ['glab mr list','Open MRs'],
      ['glab mr checkout 42','Test someone\'s MR'],
      ['glab ci status','Pipeline of this branch'],
      ['glab ci view','Interactive pipeline view'],
      ['glab issue list --assignee=@me','My issues'],
      ['pipx install jupyterlab','JupyterLab'],
      ['jupyter lab','Opens in the browser'],
      ['perl -pi -e \'s/http:/https:/g\' *.html','Replace in many files'],
      ['perl -ne \'print if /error/i\' app.log','grep with Perl regexes'],
      ['perl -lane \'print $F[0]\' access.log | sort | uniq -c | sort -rn | head','Top IPs (awk-style fields)']],
    flags:[
      ['glab mr create --fill','Title + description from commits'],
      ['glab -R group/project','Another repository'],
      ['perl -p / -n','Loop over lines, print / don\'t print'],
      ['perl -i','Edit files in place'],
      ['perl -a / -l','Split into @F / handle newlines']],
    example:{cmd:'glab mr list', out:
`Showing 2 open merge requests on team/web. (Page 1)

!42  team/web!42  Add dark mode        (feature/dark-mode) ← (main)
!39  team/web!39  Fix login redirect   (fix/login) ← (main)`} }
);

sec('hardware').cards.push(
  { title:'DKMS, akmods & Signing Modules', icon:'🧩', badge:'DKMS', color:'warn',
    cmds:[
      ['rpm -qa "akmod-*"','Installed akmod drivers (RPM Fusion)'],
      ['sudo akmods --force --kernels $(uname -r)','Rebuild akmod drivers for this kernel'],
      ['sudo kmodgenca -a','Create a signing key for your modules'],
      ['sudo mokutil --import /etc/pki/akmods/certs/public_key.der','Enrol it for Secure Boot (confirm at next boot)'],
      ['sudo dnf install dkms','DKMS (drivers from source)'],
      ['dkms status','Modules + kernels they are built for'],
      ['sudo dkms add ./mydriver-1.0','Register source in /usr/src/mydriver-1.0'],
      ['sudo dkms install mydriver/1.0','Build + install for the running kernel'],
      ['sudo dkms autoinstall','Build all for the running kernel'],
      ['sudo dkms remove mydriver/1.0 --all','Remove from every kernel'],
      ['modinfo -F signer mydriver','Is the module signed?']],
    flags:[
      ['akmods --force','Rebuild even if present'],
      ['dkms add / build / install','Register / compile / install'],
      ['dkms status','Overview'],
      ['mokutil --sb-state','Secure Boot on?']],
    example:{cmd:'dkms status', out:
`mydriver/1.0, 6.19.8-200.fc44.x86_64, x86_64: installed
v4l2loopback/0.15.1, 6.19.8-200.fc44.x86_64, x86_64: installed`},
    tip:'With Secure Boot on, unsigned modules are refused ("Key was rejected by service"). Enrol your key once and akmods signs every rebuild.' },

  { title:'NUMA & IRQ Balancing', icon:'🧮', badge:'NUMA', color:'blue',
    cmds:[
      ['sudo dnf install numactl',''],
      ['numactl --hardware','Nodes, their CPUs + memory'],
      ['lscpu | grep -i numa','Quick NUMA view'],
      ['numactl --cpunodebind=0 --membind=0 ./app','Keep an app on one node'],
      ['numastat -p $(pidof postgres | cut -d" " -f1)','Memory per node for a process'],
      ['systemctl status irqbalance','Spreads interrupts across CPUs'],
      ['head -5 /proc/interrupts','Interrupt counts per CPU'],
      ['grep -H . /proc/irq/*/smp_affinity_list | head','Which CPUs handle each IRQ']],
    flags:[
      ['--cpunodebind=N','Run on node N\'s CPUs'],
      ['--membind=N','Allocate memory on node N'],
      ['--interleave=all','Spread memory over all nodes'],
      ['numastat -m','System-wide per-node memory']],
    example:{cmd:'numactl --hardware', out:
`available: 2 nodes (0-1)
node 0 cpus: 0 1 2 3 4 5 6 7 16 17 18 19 20 21 22 23
node 0 size: 64215 MB
node 0 free: 41022 MB
node 1 cpus: 8 9 10 11 12 13 14 15 24 25 26 27 28 29 30 31
node 1 size: 64508 MB
node 1 free: 50113 MB
node distances:
node   0   1
  0:  10  21
  1:  21  10`},
    tip:'Most desktops and laptops have a single node; NUMA matters on multi-socket servers and some big workstations.' }
);

sec('fix').cards.push(
  { title:'Trace Library Calls with ltrace', icon:'🧵', badge:'LTRACE', color:'blue',
    cmds:[
      ['sudo dnf install ltrace',''],
      ['ltrace -c ls','Count library calls (summary)'],
      ['ltrace -e getenv ./app','Which environment variables it reads'],
      ['ltrace -e "fopen+open*" ./app','Which files it opens'],
      ['ltrace -S ./app','Library + system calls together'],
      ['ltrace -f -o trace.txt ./app','Follow child processes, write to a file'],
      ['sudo ltrace -p $(pidof app)','Attach to a running program'],
      ['coredumpctl list','Did it crash? (core dumps)'],
      ['coredumpctl info app','Crash backtrace summary']],
    flags:[
      ['-c','Summary table'],
      ['-e PATTERN','Only matching functions'],
      ['-S','Also system calls'],
      ['-f','Follow forks'],
      ['-p PID','Attach'],
      ['-o FILE','Write output to a file']],
    example:{cmd:'ltrace -e getenv ./app', out:
`app->getenv("HOME")                              = "/home/user"
app->getenv("APP_CONFIG")                        = nil
app->getenv("LANG")                              = "en_US.UTF-8"
+++ exited (status 0) +++`},
    tip:'strace shows how a program talks to the kernel; ltrace shows how it talks to libraries. Use strace first for "file not found" or "permission denied".' }
);

sec('virt').cards.push(
  { title:'Incus: System Containers & VMs', icon:'📦', badge:'INCUS', color:'green',
    cmds:[
      ['sudo dnf install incus incus-agent',''],
      ['sudo systemctl enable --now incus.socket',''],
      ['sudo usermod -aG incus-admin $USER','Then log out + in'],
      ['incus admin init --minimal','Default storage + network'],
      ['sudo firewall-cmd --zone=trusted --change-interface=incusbr0 --permanent && sudo firewall-cmd --reload','Let containers reach the network'],
      ['incus launch images:fedora/44 web','Fedora system container'],
      ['incus launch images:fedora/44 vm1 --vm','Full VM instead'],
      ['incus list','Instances + IPs'],
      ['incus exec web -- bash','Shell inside'],
      ['incus file push nginx.conf web/etc/nginx/','Copy a file in'],
      ['incus snapshot create web before-upgrade','Snapshot'],
      ['incus snapshot restore web before-upgrade','Roll back'],
      ['incus stop web && incus delete web','Remove']],
    flags:[
      ['launch IMAGE NAME','Create + start'],
      ['--vm','Virtual machine'],
      ['-c limits.cpu=2 -c limits.memory=4GiB','Resource limits'],
      ['image list images: fedora','Available images'],
      ['config edit NAME','Edit settings']],
    example:{cmd:'incus list', out:
`+------+---------+----------------------+------+-----------------+-----------+
| NAME |  STATE  |         IPV4         | IPV6 |      TYPE       | SNAPSHOTS |
+------+---------+----------------------+------+-----------------+-----------+
| vm1  | RUNNING | 10.12.44.170 (enp5s0)|      | VIRTUAL-MACHINE | 0         |
| web  | RUNNING | 10.12.44.23 (eth0)   |      | CONTAINER       | 1         |
+------+---------+----------------------+------+-----------------+-----------+`},
    tip:'System containers boot a full init (systemd) like a VM, but share the host kernel, so they start in about a second.' },

  { title:'Vagrant with libvirt', icon:'📐', badge:'VAGRANT', color:'blue',
    cmds:[
      ['sudo dnf install vagrant vagrant-libvirt','Fedora packages both'],
      ['vagrant init fedora/42-cloud-base','Vagrantfile for a Fedora box (pick the newest on the box portal)'],
      ['vagrant up --provider=libvirt','Create + boot'],
      ['vagrant ssh','Log in'],
      ['vagrant status',''],
      ['vagrant provision','Re-run provisioning scripts'],
      ['vagrant halt','Shut down'],
      ['vagrant destroy -f','Delete the VM'],
      ['vagrant box list','Downloaded boxes'],
      ['vagrant box prune','Remove old box versions']],
    code:
`# Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.box = "fedora/42-cloud-base"
  config.vm.provider :libvirt do |v|
    v.cpus = 2
    v.memory = 2048
  end
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.provision "shell", inline: "dnf -y install nginx && systemctl enable --now nginx"
end`,
    flags:[
      ['up --provider=libvirt','Use KVM'],
      ['up --no-provision','Skip provisioning'],
      ['ssh -c "CMD"','Run one command'],
      ['global-status','All Vagrant VMs on this host']],
    example:{cmd:'vagrant status', out:
`Current machine states:

default                   running (libvirt)`} }
);

sec('servers').cards.push(
  { title:'IMAP Mail Server (Dovecot)', icon:'📬', badge:'DOVECOT', color:'blue',
    cmds:[
      ['sudo dnf install dovecot',''],
      ['dovecot --version','2.4 uses a new config syntax (see code)'],
      ['sudo nano /etc/dovecot/conf.d/10-mail.conf','Mail storage'],
      ['sudo nano /etc/dovecot/conf.d/10-ssl.conf','TLS certificate'],
      ['sudo doveconf -n','Effective config (also checks syntax)'],
      ['sudo systemctl enable --now dovecot',''],
      ['sudo firewall-cmd --permanent --add-service=imaps && sudo firewall-cmd --reload','Port 993'],
      ['sudo doveadm auth test alice','Can alice log in?'],
      ['sudo doveadm mailbox list -u alice','Her folders'],
      ['sudo doveadm who','Who is connected'],
      ['openssl s_client -connect mail.example.com:993 -quiet','Test TLS from outside']],
    code:
`# Dovecot 2.4 (Fedora 43+)
# 10-mail.conf
mail_driver = maildir
mail_path = ~/Maildir

# 10-ssl.conf
ssl = required
ssl_server_cert_file = /etc/letsencrypt/live/mail.example.com/fullchain.pem
ssl_server_key_file  = /etc/letsencrypt/live/mail.example.com/privkey.pem

# Dovecot 2.3 used instead:
#   mail_location = maildir:~/Maildir
#   ssl_cert = </etc/…/fullchain.pem   ssl_key = </etc/…/privkey.pem`,
    flags:[
      ['doveconf -n','Non-default settings'],
      ['doveadm auth test USER','Test a login'],
      ['doveadm mailbox list -u USER','Folders'],
      ['doveadm quota get -u USER','Quota use'],
      ['doveadm log errors','Recent errors']],
    example:{cmd:'sudo doveadm auth test alice', out:
`Password:
passdb: alice auth succeeded
extra fields:
  user=alice`},
    tip:'Pair it with Postfix (Send-Only Mail Relay card) for sending. Running public mail also needs correct SPF, DKIM, DMARC and reverse DNS.' },

  { title:'Certificates with acme.sh', icon:'📜', badge:'ACME.SH', color:'green',
    cmds:[
      ['curl https://get.acme.sh | sh -s email=admin@example.com','Install into ~/.acme.sh (adds a cron job)'],
      ['acme.sh --set-default-ca --server letsencrypt','Use Let\'s Encrypt (default is ZeroSSL)'],
      ['acme.sh --issue -d example.com -d www.example.com -w /var/www/html','Webroot validation'],
      ['export CF_Token="…" && acme.sh --issue --dns dns_cf -d example.com -d "*.example.com"','Wildcard via Cloudflare DNS'],
      ['acme.sh --install-cert -d example.com --key-file /etc/pki/tls/private/example.com.key --fullchain-file /etc/pki/tls/certs/example.com.crt --reloadcmd "systemctl reload nginx"','Copy to the server + reload on renewal'],
      ['acme.sh --list','Certificates + renewal dates'],
      ['acme.sh --renew -d example.com --force','Renew now'],
      ['acme.sh --revoke -d example.com','Revoke'],
      ['crontab -l | grep acme','The renewal job']],
    flags:[
      ['-w WEBROOT','HTTP-01 validation'],
      ['--dns dns_PROVIDER','DNS-01 (needed for wildcards)'],
      ['--standalone','Temporary server on port 80'],
      ['--keylength ec-256','ECDSA key (default)'],
      ['--staging','Test against the staging CA']],
    example:{cmd:'acme.sh --list', out:
`Main_Domain   KeyLength  SAN_Domains      CA           Created               Renew
example.com   "ec-256"   www.example.com  LetsEncrypt  2026-09-20T08:12:44Z  2026-11-18T08:12:44Z`},
    tip:'Prefer Certbot (packaged in Fedora) for simple setups; acme.sh shines with DNS-01 wildcards across 150+ DNS providers.' }
);

sec('web').cards.push(
  { title:'MongoDB in a Container (mongosh)', icon:'🍃', badge:'MONGODB', color:'green',
    cmds:[
      ['podman run -d --name mongo -p 127.0.0.1:27017:27017 -v mongo:/data/db docker.io/library/mongo:8','MongoDB 8'],
      ['podman exec -it mongo mongosh','Shell'],
      ['podman exec mongo mongosh --quiet --eval "db.version()"','One command'],
      ['podman exec mongo mongodump --archive > mongo-$(date +%F).archive','Backup'],
      ['podman exec -i mongo mongorestore --archive < mongo-2026-10-02.archive','Restore']],
    code:
`// inside mongosh
show dbs
use shop
db.items.insertOne({ name: "pen", qty: 5, tags: ["office"] })
db.items.find({ qty: { $gt: 2 } })
db.items.updateOne({ name: "pen" }, { $inc: { qty: 1 } })
db.items.createIndex({ name: 1 })
db.items.countDocuments()
db.items.deleteMany({ qty: 0 })`,
    flags:[
      ['--eval "JS"','Run JavaScript and exit'],
      ['--quiet','No banner'],
      ['mongodump --archive','Single-file backup to stdout'],
      ['-e MONGO_INITDB_ROOT_USERNAME / _PASSWORD','Create an admin user on first start']],
    example:{cmd:'podman exec mongo mongosh --quiet --eval "db.version()"', out:
`8.0.15`},
    warn:'Without the INITDB user variables MongoDB has no password. Keep it bound to 127.0.0.1 as shown.' }
);

sec('media').cards.push(
  { title:'Convert Documents (pandoc) & Fast Downloads (aria2)', icon:'📝', badge:'PANDOC', color:'blue',
    cmds:[
      ['sudo dnf install pandoc aria2',''],
      ['pandoc notes.md -o notes.docx','Markdown → Word'],
      ['pandoc report.docx -t gfm --extract-media=media -o report.md','Word → Markdown (images saved)'],
      ['pandoc README.md -s --toc -o README.html','Standalone HTML with contents'],
      ['sudo dnf install typst && pandoc notes.md --pdf-engine=typst -o notes.pdf','Markdown → PDF without LaTeX'],
      ['pandoc book.md -o book.epub --metadata title="My Book"','E-book'],
      ['pandoc slides.md -t revealjs -s -o slides.html','Slide show'],
      ['aria2c -x 8 -s 8 https://example.com/big.iso','8 connections at once'],
      ['aria2c -c https://example.com/big.iso','Resume a download'],
      ['aria2c -i urls.txt -j 3 -d ~/Downloads','Many URLs, 3 at a time'],
      ['aria2c --seed-time=0 Fedora-Workstation-Live-44.torrent','Torrent, stop seeding when done']],
    flags:[
      ['pandoc -f / -t FORMAT','From / to format'],
      ['-s','Standalone document'],
      ['--toc','Table of contents'],
      ['--pdf-engine=typst|weasyprint|xelatex','PDF backend'],
      ['aria2c -x / -s N','Connections per server / split'],
      ['aria2c --max-download-limit=2M','Speed limit']],
    example:{cmd:'pandoc --version | head -1 && pandoc notes.md -o notes.docx && ls -l notes.docx', out:
`pandoc 3.6.4
-rw-r--r--. 1 user user 10764 Oct  2 23:55 notes.docx`} }
);
})();

/* Extra playground-only outputs for very common commands */
window.FB_EXTRA_OUT = {
  'git status': `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
	modified:   data.js

no changes added to commit (use "git add" and/or "git commit -a")`,
  'git status -sb': `## main...origin/main
 M data.js`,
  'uname -r': `6.19.8-200.fc44.x86_64`,
  'uname -a': `Linux fedora 6.19.8-200.fc44.x86_64 #1 SMP PREEMPT_DYNAMIC Thu Sep 18 16:02:41 UTC 2026 x86_64 GNU/Linux`,
  'cat /etc/os-release': `NAME="Fedora Linux"
VERSION="44 (Workstation Edition)"
ID=fedora
VERSION_ID=44
PRETTY_NAME="Fedora Linux 44 (Workstation Edition)"
VARIANT="Workstation Edition"
VARIANT_ID=workstation`,
  'uptime': ` 00:40:02 up 15:12,  2 users,  load average: 0.42, 0.37, 0.31`,
  'getenforce': `Enforcing`,
  'df -h': `Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p3  475G  118G  355G  25% /
/dev/nvme0n1p3  475G  118G  355G  25% /home
/dev/nvme0n1p2  974M  312M  595M  35% /boot
/dev/nvme0n1p1  599M   20M  580M   4% /boot/efi
tmpfs            16G  4.2M   16G   1% /tmp`,
  'swapon --show': `NAME       TYPE      SIZE USED PRIO
/dev/zram0 partition   8G   0B  100`,
  'powerprofilesctl': `  performance:
    CpuDriver:	amd_pstate
    PlatformDriver:	placeholder

* balanced:
    CpuDriver:	amd_pstate
    PlatformDriver:	placeholder

  power-saver:
    CpuDriver:	amd_pstate
    PlatformDriver:	placeholder`,
  'chronyc tracking': `Reference ID    : A29FC87B (time.cloudflare.com)
Stratum         : 4
System time     : 0.000012481 seconds fast of NTP time
Last offset     : +0.000008911 seconds
RMS offset      : 0.000031206 seconds
Leap status     : Normal`
};
