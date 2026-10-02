# Contributing to Fedora Bible

Thanks for helping! Small fixes are just as welcome as new sections.

## Ways to help
- **Report a wrong or outdated command:** open an issue with the card name and the correct command (a link to docs or man page helps).
- **Suggest commands or topics:** use the "Command request" issue template.
- **Send a pull request:** see below.

## Making changes
1. Fork the repo and create a branch: `git checkout -b add-btrfs-scrub`
2. Edit content in `data.js` (cards) and/or `tools/cmdref/*.txt` (pop-up reference).
3. If you changed `tools/cmdref/`, run `python3 tools/build_cmdref.py`.
4. Run the app locally: `python3 -m http.server 8000` and check your card on a phone-sized window.
5. Run the test: `python3 tests/smoke_test.py`
6. Open a pull request describing what you changed.

## Content guidelines
- Commands must work on the current Fedora release (DNF5 syntax: `dnf config-manager setopt …`, `dnf repo list`, etc.).
- One command per row. Don't join several commands with " · "; use `&&` only when they belong together.
- Short, plain-English descriptions (a few words).
- Comment rows start with `#` and have an empty description.
- Simulated output should look realistic but must not contain real personal data, keys or passwords.
- Mark destructive commands with a `danger:` or `warn:` note.
- Inside template literals (`code`, example `out`), escape backslashes and `${`.

## Releasing (maintainers)
- Bump `VERSION` in `sw.js` and add an entry to `CHANGELOG.md`.
