# Funke ⚡ – Learn electronics

A free, Duolingo-style learning app for electronics, microcontrollers and robotics.
It's a plain web app (PWA): no build step, no dependencies, works offline and runs full-screen from the iPhone home screen.

**Live:** https://funke.maurice-hmnn.workers.dev/ (Cloudflare, deployed automatically on every push to `main`)

## Features
- 7 chapters, 20 lessons + 7 chapter tests, 164 cards: electricity basics → components → circuits → semiconductors → digital logic → Arduino → robotics
- Exercise types: multiple choice, true/false, calculations, code gaps, matching pairs, ordering, resistor color-band picker, interactive switches / logic gates / H-bridge, simulations with a slider (LED resistor, voltage divider, PWM, PID tuning)
- Chapter tests: 10 questions (5 test-only + 5 random from the chapter), pass with 8 correct, no second tries
- XP, daily streak, daily goal, battery "lives" that recharge, mistake review, tools (Ohm's law, LED resistor, color code)
- German & English (Profile → Language); defaults to the device language
- Steam-inspired look (grey, flat, Motiva Sans / Arial)
- Progress is stored locally on the device; backup code in Profile

## Install on iPhone
1. Open https://funke.maurice-hmnn.workers.dev/ in **Safari**.
2. Tap **Share** → **Add to Home Screen**.

## Run locally
```bash
python3 -m http.server 8765
```
Then open http://localhost:8765

## Project structure
| File | Purpose |
|---|---|
| `index.html` | App shell, PWA meta tags |
| `app.js` | Engine: learning path, exercise types, XP/streak/battery, practice, tools, profile, UI strings (DE/EN) |
| `lessons.js` | German content (format documented at the top of the file) |
| `lessons.en.js` | English content – same ids, structure and answers as `lessons.js` |
| `styles.css` | Styling |
| `sw.js` | Service worker for offline use |
| `manifest.webmanifest` | PWA manifest |
| `tools/make_icons.py` | Generates the app icons: `python3 tools/make_icons.py` |

## Updating
After changing anything, bump `VERSION` in `sw.js` (e.g. `funke-v4`) and push.
Installed apps pick up the new version the next time they are opened with internet access.

## Adding lessons
Add a lesson to the matching chapter in **both** `lessons.js` and `lessons.en.js`, using the same `id` and the same exercise order and answers.
