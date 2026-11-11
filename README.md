# Funke ⚡ – Elektronik lernen

Eigene Lern-App im Duolingo-Stil für Elektronik, Mikrocontroller und Robotik.
Reine Web-App (PWA): kein Build, keine Abhängigkeiten, läuft offline und vom iPhone-Homescreen im Vollbild.

## Inhalt
- 7 Kapitel, 20 Lektionen + 7 Kapitel-Tests, 164 Karten (Strom-Grundlagen → Bauteile → Schaltungen → Halbleiter → Logik → Arduino → Robotik)
- Kapitel-Tests: 10 Fragen (5 eigene + 5 zufällige aus dem Kapitel), bestanden ab 8 richtig, kein zweiter Versuch
- Deutsch & Englisch (Profil → Sprache). Englische Inhalte: `lessons.en.js` – gleiche Struktur, IDs und Lösungen wie `lessons.js`
- Design im Steam-Stil (grau, flach, Motiva Sans/Arial)
- Übungstypen: Auswahl, Stimmt/Stimmt nicht, Rechnen, Code-Lücken, Paare, Reihenfolge, Farbring-Picker, interaktive Schalter/Logikgatter/H-Brücke, Regler-Simulationen (LED-Vorwiderstand, Spannungsteiler, PWM, PID)
- XP, Tagesserie, Tagesziel, Akku (Leben) mit Aufladen, Fehler-Training, Werkzeuge (Ohm-Rechner, LED-Vorwiderstand, Farbcode)
- Fortschritt bleibt lokal auf dem Gerät; Backup-Code im Profil

## Lokal testen
```bash
python3 -m http.server 8765
```
→ http://localhost:8765

## Aufs iPhone (kostenlos, dauerhaft): GitHub Pages
1. Kostenlosen Account auf github.com anlegen, neues **öffentliches** Repository `funke` erstellen.
2. Diesen Ordner hochladen (per „Add file → Upload files“ oder `git push`).
3. Repository → Settings → Pages → Source: „Deploy from a branch“, Branch `main`, Ordner `/ (root)` → Save.
4. Nach ~1 Minute läuft die App unter `https://<name>.github.io/funke/`.
5. Auf dem iPhone in **Safari** öffnen → Teilen → **Zum Home-Bildschirm**.

## Updates
Nach Änderungen in `sw.js` die `VERSION` hochzählen (z. B. `funke-v2`) und neu hochladen.
Die App holt sich die neue Version beim nächsten Öffnen mit Internet.

## Eigene Lektionen
Alle Inhalte stehen in `lessons.js` (Format oben in der Datei beschrieben).
Icons neu erzeugen: `python3 tools/make_icons.py`
