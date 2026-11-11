'use strict';
/* =========================================================
   Funke – learning app for electronics, microcontrollers & robotics
   Plain HTML/CSS/JS, no dependencies. Content: lessons.js (DE), lessons.en.js (EN)
   ========================================================= */

const app = document.getElementById('app');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const md = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
const paras = s => s.split(/\n\n/).map(p => `<p>${md(p)}</p>`).join('');
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const fmt = (n, d = 2) => Number(n).toLocaleString(typeof LANG !== 'undefined' && LANG === 'en' ? 'en-US' : 'de-DE', { maximumFractionDigits: d });
const fmtOhm = v => v >= 1e6 ? fmt(v / 1e6) + ' MΩ' : v >= 1e3 ? fmt(v / 1e3) + ' kΩ' : fmt(v) + ' Ω';
const parseNum = s => { const v = parseFloat(String(s).replace(/\s/g, '').replace(',', '.')); return isFinite(v) ? v : null; };

/* ---------------- Icons ---------------- */
const I = {
  bolt: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13.6 2 4.8 13.4h6.1L9.9 22l9.2-12.1h-6.3L13.6 2z"/></svg>',
  flame: '<svg viewBox="0 0 24 24"><path fill="#ff9d2e" d="M12 2c1 4 5.5 5.5 5.5 11.2a5.5 5.5 0 0 1-11 0c0-2.6 1.3-4.3 2.6-5.3.2 2.1 1 3.1 2.1 3.4C10.6 8.8 10.9 5.2 12 2z"/><path fill="#ffd34d" d="M12 12.6c.6 2 2.6 2.6 2.6 4.7a2.6 2.6 0 0 1-5.2 0c0-1.6 1-2.6 2.6-4.7z"/></svg>',
  gem: '<svg viewBox="0 0 24 24"><path fill="#66c0f4" d="M12 21.5 2.5 9 6 3.5h12L21.5 9z"/><path fill="#a6dbff" d="M6 3.5h12L15.5 9h-7z"/><path fill="#2a83cc" d="M12 21.5 8.5 9h7z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2.6"/></svg>',
  trophy: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 3h10v2h3.5v2.5A4.5 4.5 0 0 1 16.6 12 5 5 0 0 1 13 14.8V18h3v3H8v-3h3v-3.2A5 5 0 0 1 7.4 12 4.5 4.5 0 0 1 3.5 7.5V5H7zm0 4H5.5v.5A2.5 2.5 0 0 0 7 9.8zm10 0v2.8a2.5 2.5 0 0 0 1.5-2.3V7z"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2.8" stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/></svg>',
  okC: '<svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="11" fill="currentColor"/><path fill="none" stroke="#12382a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="m7 12.5 3.2 3.2L17 9"/></svg>',
  badC: '<svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="11" fill="currentColor"/><path stroke="#3d1a26" stroke-width="3" stroke-linecap="round" d="M8.5 8.5l7 7M15.5 8.5l-7 7"/></svg>',
  learn: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  practice: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M2 10h2V8h3v8H4v-2H2zM22 10h-2V8h-3v8h3v-2h2zM8 11h8v2H8z"/></svg>',
  tools: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21.7 18.3 13.6 10.2a5.5 5.5 0 0 0-7.2-7l3.4 3.4-2.8 2.8-3.5-3.4a5.5 5.5 0 0 0 7 7.2l8.1 8.1a1 1 0 0 0 1.4 0l1.7-1.6a1 1 0 0 0 0-1.4z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.5" fill="currentColor"/><path fill="currentColor" d="M3.5 21a8.5 8.5 0 0 1 17 0z"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2.6"/><path stroke="currentColor" stroke-width="2.6" stroke-linecap="round" d="M12 7v5l3 2"/></svg>',
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>',
};
function batt(n) {
  if (S.unlimited) return `<svg viewBox="0 0 28 24"><rect x="2" y="6" width="20" height="12" rx="3" fill="none" stroke="#a4d007" stroke-width="2.2"/><rect x="22.5" y="10" width="3" height="4" rx="1" fill="#a4d007"/><path d="M8 12c1.5-3 3.5-3 4 0s2.5 3 4 0c-1.5-3-3.5-3-4 0s-2.5 3-4 0" fill="none" stroke="#a4d007" stroke-width="1.8"/></svg>`;
  const c = n <= 1 ? '#ff5c6c' : n <= 2 ? '#e8c547' : '#a4d007';
  return `<svg viewBox="0 0 28 24"><rect x="2" y="6" width="20" height="12" rx="3" fill="none" stroke="${c}" stroke-width="2.2"/><rect x="22.5" y="10" width="3" height="4" rx="1" fill="${c}"/>${n > 0 ? `<rect x="4.5" y="8.5" width="${15 * n / 5}" height="7" rx="1.5" fill="${c}"/>` : ''}</svg>`;
}

/* ---------------- State ---------------- */
const KEY = 'funke-state';
const MAXE = 5, REGEN = 30 * 60 * 1000;
const DEF = { xp: 0, done: {}, energy: MAXE, energyAt: Date.now(), streak: 0, lastDay: null, days: {}, goal: 20,
  sound: true, haptic: true, unlimited: false, mistakes: [], answered: 0, correct: 0, hideInstall: false,
  lang: (navigator.language || 'de').toLowerCase().startsWith('de') ? 'de' : 'en' };
let S = load();

/* ---------------- Language (DE / EN) ---------------- */
const LANG = S.lang === 'en' ? 'en' : 'de';
document.documentElement.lang = LANG;
const STR = {
  de: {
    colors: ['schwarz', 'braun', 'rot', 'orange', 'gelb', 'grün', 'blau', 'violett', 'grau', 'weiß'],
    short: '💥 Kurzschluss!', fwd: '↻ dreht vorwärts', rev: '↺ dreht rückwärts', stop: 'steht still', uin: 'ein', uout: 'aus',
    goal: 'Ziel', time: 'Zeit →', resistance: 'Widerstand', ledI: 'LED-Strom', tooMuch: '💥 zu viel!', duty: 'Tastgrad', avgU: 'Mittlere Spannung',
    Uout: 'U aus', overshoot: 'Überschwingen', t90: 'Zeit bis 90 %', tooSlow: 'zu langsam',
    kind: { mc: 'Wähle die richtige Antwort', tf: 'Stimmt das?', num: 'Rechne aus', fill: 'Vervollständige den Code', match: 'Finde die Paare',
      order: 'Bring es in die richtige Reihenfolge', color: 'Stell den Widerstand ein', logic: 'Probier es aus', slider: 'Dreh am Regler' },
    praise: ['Super!', 'Richtig!', 'Stark!', 'Genau so!', 'Volltreffer!', 'Voll geladen!', 'Kurzschlussfrei!', 'Spannend gut!'],
    tf: ['Stimmt', 'Stimmt nicht'], bands: ['1. Ring', '2. Ring', 'Multiplikator'], on: 'AN', off: 'AUS',
    nothing: 'Noch nichts zum Üben da', check: 'Prüfen', cont: 'Weiter', newKnow: '⚡ Neues Wissen', retry: '↻ Zweiter Versuch',
    wrong: 'Nicht ganz', correctIs: 'Richtig:', hits: 'Treffer', timeC: 'Zeit', quit: 'Beenden',
    perfect: 'Perfekt gemeistert!', mastered: 'Kapitel gemeistert!', close: 'Knapp daneben!',
    score: (r, n, need) => `${r} von ${n} richtig · bestanden ab ${need}`,
    quizTip: 'Tipp: Deine Fehler warten im Tab „Üben“. Danach klappt\'s bestimmt.', again: 'Nochmal versuchen', back: 'Zurück',
    flawless: 'Fehlerfrei!', lessonDone: 'Lektion geschafft!', trainDone: 'Training geschafft!', testUnlocked: '🏆 Der Kapitel-Test ist freigeschaltet!',
    recharged: 'Akku wieder voll geladen 🔋', streak: n => `Serie: ${n} ${n === 1 ? 'Tag' : 'Tage'}`,
    empty: 'Akku leer!', emptyTxt: 'Alle 30 Minuten lädt sich ein Balken von selbst. Schneller geht\'s mit einem Training: Danach ist der Akku wieder voll.',
    trainNow: 'Jetzt trainieren', later: 'Später',
    tabs: ['Lernen', 'Üben', 'Werkzeuge', 'Profil'],
    install: '📲 <b>Als App installieren:</b> In Safari unten auf <b>Teilen</b> tippen → <b>Zum Home-Bildschirm</b>. Dann läuft Funke im Vollbild und offline.',
    chapter: 'Kapitel', quizTitle: t => `Kapitel-Test: ${t}`, test: 'TEST', start: 'START',
    allDone: '🏆 Alles geschafft!', allDoneTxt: 'Du hast alle Kapitel abgeschlossen. Halte dein Wissen im Tab „Üben“ frisch.',
    quizLocked: 'Schließe zuerst alle Lektionen dieses Kapitels ab.',
    quizInfo: (n, need) => `${n} Fragen aus dem ganzen Kapitel · bestanden ab ${need} richtig · kein zweiter Versuch, kostet keinen Akku`,
    lessonLocked: 'Schließe zuerst die vorherigen Lektionen ab, um diese freizuschalten.',
    lessonInfo: (i, n, k) => `Lektion ${i} von ${n} · ${k} Aufgaben`,
    quizRedo: 'Nochmal testen · +10 XP', quizGo: 'Test starten · +20 XP', redo: 'Wiederholen · +5 XP', go: "Los geht's · +10 XP",
    practice: 'Üben', battery: 'Akku', unlimitedW: 'unbegrenzt', unlimitedOn: 'Unbegrenzter Akku ist im Profil eingeschaltet.',
    full: 'Voll geladen. Jeder Fehler in einer Lektion kostet einen Balken.', nextBar: m => `Nächster Balken in ca. ${m} Min. Ein abgeschlossenes Training lädt sofort voll.`,
    mistakes: '🎯 Fehler wiederholen', mistakesTxt: m => `${m} Aufgabe${m === 1 ? '' : 'n'}, die du schon mal falsch hattest. Richtig gelöste fliegen raus.`,
    noMistakes: 'Keine offenen Fehler – stark!', mistakesBtn: 'Fehler üben', mix: '🔀 Gemischtes Training',
    mixTxt: '8 zufällige Aufgaben aus allem, was du schon gelernt hast.', mixLocked: 'Schließe zuerst eine Lektion ab.', mixBtn: 'Training starten',
    tools: 'Werkzeuge', ohm: 'Ohmsches Gesetz', ohmTxt: 'Zwei Werte eintragen, der dritte wird berechnet.', voltage: 'Spannung U', current: 'Strom I', resistR: 'Widerstand R', eg: 'z. B.',
    ledR: 'LED-Vorwiderstand', ledRTxt: 'Welchen Widerstand brauche ich vor meiner LED?', supply: 'Versorgung', ledU: 'LED-Spannung (rot ≈ 2 V, blau/weiß ≈ 3 V)',
    ledCur: 'LED-Strom', tooLow: 'Versorgung zu klein', take: 'nimm', e12: p => `nächster Normwert (E12), Leistung ${p} mW`,
    colorRead: 'Farbcode lesen', colorReadTxt: 'Ringe antippen und Farbe wählen.',
    profile: 'Profil', streakDays: 'Tage Serie', xpTotal: 'XP gesamt', lessons: 'Lektionen', rate: 'Trefferquote',
    daily: 'Tagesziel', dailyDone: '✅ Heute geschafft!', dailyProg: (x, g) => `${x} von ${g} XP heute`, wd: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    settings: 'Einstellungen', language: 'Sprache', sound: 'Töne', haptic: 'Vibration', unlimited: 'Unbegrenzter Akku',
    backup: 'Fortschritt sichern', backupTxt: 'Dein Fortschritt liegt nur auf diesem Gerät. Kopier dir den Code ab und zu in die Notizen – damit kannst du ihn wiederherstellen.',
    backupPh: 'Hier Code einfügen zum Wiederherstellen', copy: 'Code kopieren', restore: 'Wiederherstellen',
    reset: 'Zurücksetzen', resetTxt: 'Löscht allen Fortschritt auf diesem Gerät.', resetBtn: 'Alles zurücksetzen',
    footer: (l, c) => `Funke · ${l} Lektionen · ${c} Karten`, cancel: 'Abbrechen',
    quitT: 'Lektion beenden?', quitTxt: 'Dein Fortschritt in dieser Lektion geht verloren.',
    copied: 'Code kopiert ✓', marked: 'Code markiert – jetzt kopieren', restored: 'Wiederhergestellt ✓', invalid: 'Ungültiger Code',
    resetT: 'Wirklich alles löschen?', resetQ: 'XP, Serie und alle Lektionen werden zurückgesetzt. Das lässt sich nicht rückgängig machen.', del: 'Löschen',
  },
  en: {
    colors: ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'],
    short: '💥 Short circuit!', fwd: '↻ spinning forward', rev: '↺ spinning backward', stop: 'stopped', uin: 'in', uout: 'out',
    goal: 'Target', time: 'Time →', resistance: 'Resistance', ledI: 'LED current', tooMuch: '💥 too much!', duty: 'Duty cycle', avgU: 'Average voltage',
    Uout: 'U out', overshoot: 'Overshoot', t90: 'Time to 90 %', tooSlow: 'too slow',
    kind: { mc: 'Choose the right answer', tf: 'True or false?', num: 'Calculate', fill: 'Complete the code', match: 'Find the pairs',
      order: 'Put it in the right order', color: 'Set the resistor', logic: 'Try it out', slider: 'Turn the knob' },
    praise: ['Great!', 'Correct!', 'Nice!', 'Exactly!', 'Spot on!', 'Fully charged!', 'No short circuit!', 'Electrifying!'],
    tf: ['True', 'False'], bands: ['1st band', '2nd band', 'Multiplier'], on: 'ON', off: 'OFF',
    nothing: 'Nothing to practice yet', check: 'Check', cont: 'Continue', newKnow: '⚡ New concept', retry: '↻ Second try',
    wrong: 'Not quite', correctIs: 'Correct:', hits: 'Accuracy', timeC: 'Time', quit: 'Quit',
    perfect: 'Perfectly mastered!', mastered: 'Chapter mastered!', close: 'So close!',
    score: (r, n, need) => `${r} of ${n} correct · pass mark ${need}`,
    quizTip: 'Tip: Your mistakes are waiting in the “Practice” tab. You\'ll nail it after that.', again: 'Try again', back: 'Back',
    flawless: 'Flawless!', lessonDone: 'Lesson complete!', trainDone: 'Practice complete!', testUnlocked: '🏆 The chapter test is unlocked!',
    recharged: 'Battery fully recharged 🔋', streak: n => `Streak: ${n} ${n === 1 ? 'day' : 'days'}`,
    empty: 'Battery empty!', emptyTxt: 'One bar recharges every 30 minutes. Faster: finish a practice session and your battery is full again.',
    trainNow: 'Practice now', later: 'Later',
    tabs: ['Learn', 'Practice', 'Tools', 'Profile'],
    install: '📲 <b>Install as an app:</b> In Safari tap <b>Share</b> → <b>Add to Home Screen</b>. Funke then runs full-screen and offline.',
    chapter: 'Chapter', quizTitle: t => `Chapter test: ${t}`, test: 'TEST', start: 'START',
    allDone: '🏆 All done!', allDoneTxt: 'You finished every chapter. Keep your knowledge fresh in the “Practice” tab.',
    quizLocked: 'Finish all lessons of this chapter first.',
    quizInfo: (n, need) => `${n} questions from the whole chapter · pass with ${need} correct · no second tries, costs no battery`,
    lessonLocked: 'Finish the previous lessons first to unlock this one.',
    lessonInfo: (i, n, k) => `Lesson ${i} of ${n} · ${k} exercises`,
    quizRedo: 'Test again · +10 XP', quizGo: 'Start test · +20 XP', redo: 'Repeat · +5 XP', go: "Let's go · +10 XP",
    practice: 'Practice', battery: 'Battery', unlimitedW: 'unlimited', unlimitedOn: 'Unlimited battery is switched on in your profile.',
    full: 'Fully charged. Every mistake in a lesson costs one bar.', nextBar: m => `Next bar in about ${m} min. Finishing a practice session recharges it fully.`,
    mistakes: '🎯 Review mistakes', mistakesTxt: m => `${m} exercise${m === 1 ? '' : 's'} you got wrong before. Solved ones drop out.`,
    noMistakes: 'No open mistakes – nice!', mistakesBtn: 'Practice mistakes', mix: '🔀 Mixed practice',
    mixTxt: '8 random exercises from everything you\'ve learned.', mixLocked: 'Finish a lesson first.', mixBtn: 'Start practice',
    tools: 'Tools', ohm: 'Ohm\'s law', ohmTxt: 'Enter two values, the third is calculated.', voltage: 'Voltage U', current: 'Current I', resistR: 'Resistance R', eg: 'e.g.',
    ledR: 'LED resistor', ledRTxt: 'Which resistor do I need in front of my LED?', supply: 'Supply', ledU: 'LED voltage (red ≈ 2 V, blue/white ≈ 3 V)',
    ledCur: 'LED current', tooLow: 'Supply too low', take: 'use', e12: p => `next standard value (E12), power ${p} mW`,
    colorRead: 'Read color code', colorReadTxt: 'Tap a band and choose its color.',
    profile: 'Profile', streakDays: 'Day streak', xpTotal: 'Total XP', lessons: 'Lessons', rate: 'Accuracy',
    daily: 'Daily goal', dailyDone: '✅ Done for today!', dailyProg: (x, g) => `${x} of ${g} XP today`, wd: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    settings: 'Settings', language: 'Language', sound: 'Sounds', haptic: 'Vibration', unlimited: 'Unlimited battery',
    backup: 'Back up progress', backupTxt: 'Your progress only lives on this device. Copy the code into your notes now and then so you can restore it.',
    backupPh: 'Paste a code here to restore', copy: 'Copy code', restore: 'Restore',
    reset: 'Reset', resetTxt: 'Deletes all progress on this device.', resetBtn: 'Reset everything',
    footer: (l, c) => `Funke · ${l} lessons · ${c} cards`, cancel: 'Cancel',
    quitT: 'Quit lesson?', quitTxt: 'Your progress in this lesson will be lost.',
    copied: 'Code copied ✓', marked: 'Code selected – copy it now', restored: 'Restored ✓', invalid: 'Invalid code',
    resetT: 'Really delete everything?', resetQ: 'XP, streak and all lessons will be reset. This cannot be undone.', del: 'Delete',
  },
};
const t = (k, ...a) => { const v = STR[LANG][k] ?? STR.de[k]; return typeof v === 'function' ? v(...a) : v; };
const CONTENT = LANG === 'en' && typeof UNITS_EN !== 'undefined' ? UNITS_EN : UNITS;
function load() { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { return { ...DEF }; } }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
const dayKey = (off = 0) => { const d = new Date(); d.setDate(d.getDate() + off); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const streakNow = () => (S.lastDay === dayKey() || S.lastDay === dayKey(-1)) ? S.streak : 0;
function award(xp) {
  const t = dayKey();
  if (S.lastDay !== t) { S.streak = S.lastDay === dayKey(-1) ? S.streak + 1 : 1; S.lastDay = t; }
  S.xp += xp; S.days[t] = (S.days[t] || 0) + xp; save();
}
function tickEnergy() {
  if (S.energy >= MAXE) { S.energy = MAXE; return; }
  const n = Math.floor((Date.now() - S.energyAt) / REGEN);
  if (n > 0) { S.energy = Math.min(MAXE, S.energy + n); S.energyAt += n * REGEN; save(); }
}
function useEnergy() { if (S.unlimited) return; tickEnergy(); if (S.energy >= MAXE) S.energyAt = Date.now(); S.energy = Math.max(0, S.energy - 1); }
const minsToNext = () => Math.max(1, Math.ceil((REGEN - (Date.now() - S.energyAt)) / 60000));

/* Flat lesson list + index */
const ALL = [];
const QUIZ_N = 10, PASS = 0.8;
CONTENT.forEach((u, ui) => {
  u.n = ui + 1;
  if (u.quiz && !u.lessons.some(l => l.quiz)) u.lessons.push({ id: `${u.id || 'u' + (ui + 1)}q`, title: t('quizTitle', u.title), quiz: true, ex: u.quiz });
  u.lessons.forEach((l, li) => { l.unit = u; l.li = li; ALL.push(l); }); });
const BYID = Object.fromEntries(ALL.map(l => [l.id, l]));
const curIdx = () => { const i = ALL.findIndex(l => !S.done[l.id]); return i; };
const refOf = (l, i) => `${l}:${i}`;
function resolve(ref) { const [l, i] = ref.split(':'); const les = BYID[l]; const ex = les && les.ex[+i]; return ex && ex.t !== 'info' ? { ex, ref } : null; }
function addMistake(ref) { if (!S.mistakes.includes(ref)) S.mistakes.push(ref); }
function dropMistake(ref) { S.mistakes = S.mistakes.filter(r => r !== ref); }

/* ---------------- Feedback: sound & haptics ---------------- */
let ac = null;
function tone(f, t, dur, type = 'sine', vol = .14) {
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(g).connect(ac.destination); o.start(t); o.stop(t + dur + .02);
}
function sfx(k) {
  if (!S.sound) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    const t = ac.currentTime + .01;
    if (k === 'ok') { tone(784, t, .12, 'triangle'); tone(1175, t + .08, .22, 'triangle'); }
    else if (k === 'bad') { tone(196, t, .16, 'square', .06); tone(147, t + .12, .26, 'square', .06); }
    else if (k === 'tap') tone(660, t, .05, 'sine', .05);
    else if (k === 'win') [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, t + i * .1, .3, 'triangle', .11));
    else if (k === 'zap') { tone(1400, t, .05, 'sawtooth', .04); tone(900, t + .03, .06, 'sawtooth', .04); }
  } catch (e) { }
}
function buzz(n = 1) {
  if (!S.haptic) return;
  if (navigator.vibrate) { navigator.vibrate(n > 1 ? [25, 70, 25] : 18); return; }
  const l = $('#haptic'); if (!l) return;
  l.click(); if (n > 1) setTimeout(() => l.click(), 110);
}
function toast(t) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2000); }

/* =========================================================
   Schematic drawings (SVG)
   ========================================================= */
const BGF = 'style="fill:var(--bg2)"';
const W = live => `class="wire${live ? ' live' : ''}"`;
const RES_COLS = ['#151515', '#7b4a1e', '#e23b3b', '#ff8a1f', '#ffd400', '#2dbf55', '#2f6dff', '#8f4dff', '#8a8a8a', '#f4f4f4']
  .map((c, i) => [t('colors')[i], c]);

const P = {
  res: (x, y) => `<rect class="sym" ${BGF} x="${x - 20}" y="${y - 8}" width="40" height="16" rx="2"/>`,
  pot: (x, y) => P.res(x, y) + `<path class="sym" d="M${x - 16} ${y + 15}L${x + 14} ${y - 13}m-7 0h7v7"/>`,
  lamp: (x, y, o = {}) => `${o.on ? `<circle cx="${x}" cy="${y}" r="26" fill="#e8c547" opacity="${.35 * o.on}"/>` : ''}<circle class="sym" cx="${x}" cy="${y}" r="13" style="fill:${o.on ? '#ffe9a8' : 'var(--bg2)'}"/><path class="sym" d="M${x - 9} ${y - 9}l18 18M${x + 9} ${y - 9}l-18 18"/>`,
  led: (x, y, o = {}) => {
    const on = o.burnt ? 0 : (o.on || 0);
    return `<rect x="${x - 12}" y="${y - 14}" width="24" height="28" ${BGF}/>` +
      (on ? `<circle cx="${x}" cy="${y}" r="24" fill="#ff5c6c" opacity="${.45 * on}"/>` : '') +
      `<path class="sym" d="M${x - 9} ${y - 11}V${y + 11}L${x + 8} ${y}Z" style="fill:${on ? `rgba(255,92,108,${.3 + .7 * on})` : 'var(--bg2)'};${o.burnt ? 'stroke:#777' : ''}"/>` +
      `<path class="sym" d="M${x + 8} ${y - 11}V${y + 11}M${x + 1} ${y - 14}l7-7m-5 0h5v5M${x + 8} ${y - 10}l7-7m-5 0h5v5" ${o.burnt ? 'style="stroke:#777"' : ''}/>` +
      (o.burnt ? `<text x="${x}" y="${y - 22}" text-anchor="middle" class="lbl" style="fill:#ff5c6c">💥</text>` : '');
  },
  diode: (x, y) => `<rect x="${x - 12}" y="${y - 13}" width="24" height="26" ${BGF}/><path class="sym" ${BGF} d="M${x - 9} ${y - 11}V${y + 11}L${x + 8} ${y}Z"/><path class="sym" d="M${x + 8} ${y - 11}V${y + 11}"/>`,
  cap: (x, y) => `<rect x="${x - 6}" y="${y - 16}" width="12" height="32" ${BGF}/><path class="sym" d="M${x - 5} ${y - 15}v30M${x + 5} ${y - 15}v30"/>`,
  sw: (x, y, o = {}) => `<rect x="${x - 16}" y="${y - 22}" width="32" height="26" ${BGF}/><path class="sym" d="M${x - 18} ${y}${o.closed ? `L${x + 18} ${y}` : `L${x + 13} ${y - 17}`}"/><circle cx="${x - 18}" cy="${y}" r="3.5" fill="#dcdedf"/><circle cx="${x + 18}" cy="${y}" r="3.5" fill="#dcdedf"/>`,
  meter: (x, y, o = {}) => `<circle class="sym" ${BGF} cx="${x}" cy="${y}" r="15"/><text x="${x}" y="${y + 6}" text-anchor="middle" class="lbl" style="font-size:16px;fill:#66c0f4">${o.l || 'V'}</text>`,
  motor: (x, y) =>`<circle class="sym" ${BGF} cx="${x}" cy="${y}" r="16"/><text x="${x}" y="${y + 6}" text-anchor="middle" class="lbl" style="font-size:17px">M</text>`,
  bat: (x, y) => `<rect x="${x - 8}" y="${y - 18}" width="16" height="36" ${BGF}/><path class="sym" d="M${x - 5} ${y - 17}v34"/><path class="sym" style="stroke-width:6" d="M${x + 5} ${y - 9}v18"/>`,
};
const rot = (x, y, inner) => `<g transform="rotate(90 ${x} ${y})">${inner}</g>`;

function loopFig(parts, o = {}) {
  const T = 35, B = 150, L = 40, Rx = 290, M = (T + B) / 2, live = o.live;
  const top = parts.filter(p => p.side !== 'r'), right = parts.find(p => p.side === 'r');
  let s = `<svg viewBox="0 0 320 175"><path ${W(live)} d="M${L} ${T}H${Rx}V${B}H${L}Z"/>`;
  s += rot(L, M, P.bat(L, M)) + `<text class="lbl" x="${L - 26}" y="${M - 22}">+</text>`;
  if (o.U) s += `<text class="lbl" x="${L + 24}" y="${M + 5}">${esc(o.U)}</text>`;
  top.forEach((p, i) => {
    const cx = L + (Rx - L) * (i + 1) / (top.length + 1);
    s += P[p.k](cx, T, p);
    if (p.lab) s += `<text class="lbl" x="${cx}" y="${T + 36}" text-anchor="middle">${esc(p.lab)}</text>`;
  });
  if (right) { s += rot(Rx, M, P[right.k](Rx, M, right)); if (right.lab) s += `<text class="lbl" x="${Rx - 24}" y="${M + 5}" text-anchor="end">${esc(right.lab)}</text>`; }
  if (o.I) s += `<path d="M${L + 26} ${T - 10}h26m-6-5 6 5-6 5" fill="none" stroke="#66c0f4" stroke-width="2.4"/><text class="lbl" x="${L + 58}" y="${T - 6}" style="fill:#66c0f4">${esc(o.I)}</text>`;
  return s + '</svg>';
}
function parFig(s) {
  const T = 30, B = 160, L = 40, M = 95, vals = s.vals, xs = vals.length === 2 ? [170, 260] : [140, 210, 280], Rx = xs[xs.length - 1];
  let g = `<svg viewBox="0 0 320 175"><path class="wire" d="M${L} ${T}H${Rx}M${L} ${B}H${Rx}M${L} ${T}V${B}${xs.map(x => `M${x} ${T}V${B}`).join('')}"/>`;
  g += rot(L, M, P.bat(L, M)) + `<text class="lbl" x="${L - 26}" y="${M - 22}">+</text>`;
  if (s.U) g += `<text class="lbl" x="${L + 24}" y="${M + 5}">${esc(s.U)}</text>`;
  xs.forEach((x, i) => { g += rot(x, M, P.res(x, M)) + `<text class="lbl" x="${x + 14}" y="${M + 5}">${esc(vals[i])}</text>`; });
  return g + '</svg>';
}
function divFig(s) {
  const X = 150;
  return `<svg viewBox="0 0 320 190"><path class="wire" d="M55 25H${X}V170H55M${X} 98H250M${X} 170H250"/>` +
    rot(X, 62, P.res(X, 62)) + rot(X, 134, P.res(X, 134)) +
    `<circle cx="55" cy="25" r="5" fill="#dcdedf"/><circle cx="55" cy="170" r="5" fill="#dcdedf"/><circle cx="250" cy="98" r="5" fill="#e8c547"/><circle cx="250" cy="170" r="5" fill="#dcdedf"/><circle cx="${X}" cy="98" r="4" fill="#dcdedf"/>` +
    `<text class="lbl" x="${X + 16}" y="67">R1 ${esc(s.R1 || '')}</text><text class="lbl" x="${X + 16}" y="139">R2 ${esc(s.R2 || '')}</text>` +
    `<text class="lbl" x="22" y="102" text-anchor="middle">U<tspan dy="4" font-size="10">${t('uin')}</tspan></text><text class="lbl m" x="22" y="120" text-anchor="middle">${esc(s.Uin || '')}</text><path d="M40 35v125" stroke="#8f98a0" stroke-width="1.6" stroke-dasharray="4 4"/>` +
    `<text class="lbl" x="285" y="128" text-anchor="middle" style="fill:#e8c547">U<tspan dy="4" font-size="10">${t('uout')}</tspan></text><text class="lbl" x="285" y="148" text-anchor="middle" style="fill:#e8c547">${esc(s.Uout || '?')}</text><path d="M265 106v56" stroke="#e8c547" stroke-width="1.6" stroke-dasharray="4 4"/></svg>`;
}
function ohmFig() {
  return `<svg viewBox="0 0 220 160"><path class="sym" d="M110 12 202 148H18Z"/><path class="sym" d="M52 98H168M110 98V148"/>` +
    `<text x="110" y="82" text-anchor="middle" class="lbl" style="font-size:30px;fill:#e8c547">U</text>` +
    `<text x="72" y="136" text-anchor="middle" class="lbl" style="font-size:28px;fill:#66c0f4">R</text>` +
    `<text x="148" y="136" text-anchor="middle" class="lbl" style="font-size:28px;fill:#a4d007">I</text></svg>`;
}
function symFig(k) {
  if (k === 'gnd') return `<svg viewBox="0 0 120 70"><path class="sym" d="M60 8v26M42 34h36M48 43h24M54 52h12"/></svg>`;
  if (k === 'npn') return `<svg viewBox="0 0 120 80"><circle class="sym" cx="62" cy="40" r="24"/><path class="sym" d="M24 40h26M50 26v28M50 33l18-12V6M50 47l18 12v15"/><path d="M68 59l-9-1 4-6z" fill="#dcdedf" stroke="#dcdedf" stroke-width="2" stroke-linejoin="round"/><text class="lbl m" x="76" y="12">C</text><text class="lbl m" x="16" y="36">B</text><text class="lbl m" x="76" y="76">E</text></svg>`;
  if (k === 'mosfet') return `<svg viewBox="0 0 120 80"><path class="sym" d="M24 40h20M44 24v32M52 22v8M52 36v8M52 50v8M52 26h18V6M52 54h18v20M52 40h18v14"/><path d="M53 40l8-4v8z" fill="#dcdedf"/><text class="lbl m" x="78" y="14">D</text><text class="lbl m" x="16" y="36">G</text><text class="lbl m" x="78" y="74">S</text></svg>`;
  const draw = P[k]; if (!draw) return '';
  return `<svg viewBox="0 0 120 70"><path class="wire" d="M10 38H110"/>${draw(60, 38, { on: k === 'led' || k === 'lamp' ? 0 : 0 })}</svg>`;
}
function resSvg(bands) { // bands: [d1,d2,mult] as color index or null
  const col = i => i == null ? '#cbb27e' : RES_COLS[i][1];
  return `<svg viewBox="0 0 300 110"><path d="M10 55H290" stroke="#b9bfd9" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M70 30q-10 0-10 25t10 25h12q8 0 14-6h108q6 6 14 6h12q10 0 10-25t-10-25h-12q-8 0-14 6H96q-6-6-14-6z" fill="#d8c08a"/>` +
    `<rect x="78" y="30" width="13" height="50" fill="${col(bands[0])}"/><rect x="112" y="36" width="13" height="38" fill="${col(bands[1])}"/>` +
    `<rect x="144" y="36" width="13" height="38" fill="${col(bands[2])}"/><rect x="205" y="31" width="11" height="48" fill="#d4af37"/>` +
    `<path d="M70 34q-6 6-6 21" stroke="#fff" stroke-opacity=".35" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;
}
const ohmOf = b => (b[0] * 10 + b[1]) * Math.pow(10, b[2]);
function bandsFor(v) { let m = 0; while (v >= 100) { v /= 10; m++; } v = Math.round(v); return [Math.floor(v / 10), v % 10, m]; }

function pwmSvg(d, withLed = true) {
  const x0 = 20, per = 80, hi = 25, lo = 90, w = per * d / 100;
  let p = `M${x0} ${lo}`;
  for (let k = 0; k < 3; k++) { const xs = x0 + k * per; if (d > 0) p += `L${xs} ${lo}V${hi}H${xs + w}V${lo}`; p += `H${xs + per}`; }
  return `<svg viewBox="0 0 320 125"><path d="M${x0} ${lo}H${x0 + 3 * per}" stroke="#3d424a" stroke-width="2"/><path d="${p}" fill="none" stroke="#e8c547" stroke-width="3" stroke-linejoin="round"/>` +
    `<text class="lbl m" x="${x0}" y="18">5 V</text><text class="lbl m" x="${x0}" y="112">0 V</text>` +
    (withLed ? `<circle cx="292" cy="58" r="${10 + 14 * d / 100}" fill="#ff5c6c" opacity="${.5 * d / 100}"/><circle cx="292" cy="58" r="10" fill="rgba(255,92,108,${.15 + .85 * d / 100})" stroke="#dcdedf" stroke-width="2"/>` : '') + '</svg>';
}

const GATES = { series: (a, b) => a && b, parallel: (a, b) => a || b, AND: (a, b) => a && b, OR: (a, b) => a || b, XOR: (a, b) => a !== b, NOT: a => !a, NAND: (a, b) => !(a && b), NOR: (a, b) => !(a || b) };
const GSYM = { AND: '&', OR: '≥1', XOR: '=1', NOT: '1', NAND: '&', NOR: '≥1' };
function gateSvg(g, ins, out, hide) {
  const one = g === 'NOT', ys = one ? [80] : [55, 105], inv = ['NOT', 'NAND', 'NOR'].includes(g);
  let s = `<svg viewBox="0 0 300 160">`;
  ys.forEach((y, i) => { s += `<path ${W(ins[i])} d="M45 ${y}H120"/><text class="lbl" x="22" y="${y + 5}" text-anchor="middle" style="font-size:17px">${'AB'[i]}</text><text class="lbl" x="60" y="${y - 8}" style="fill:${ins[i] ? '#e8c547' : '#8f98a0'}">${ins[i] ? 1 : 0}</text>`; });
  s += `<rect class="sym" ${BGF} x="120" y="30" width="70" height="100" rx="6"/><text class="lbl" x="155" y="88" text-anchor="middle" style="font-size:24px">${GSYM[g]}</text>`;
  if (inv) s += `<circle class="sym" ${BGF} cx="197" cy="80" r="6"/>`;
  if (hide) out = false;
  s += `<path ${W(out)} d="M${inv ? 203 : 190} 80H248"/><text class="lbl" x="215" y="72" style="fill:${out ? '#e8c547' : '#8f98a0'}">${hide ? '?' : out ? 1 : 0}</text>`;
  s += `${out ? `<circle cx="266" cy="80" r="26" fill="#ff5c6c" opacity=".45"/>` : ''}<circle cx="266" cy="80" r="14" fill="${out ? '#ff8a96' : 'var(--bg2)'}" stroke="#dcdedf" stroke-width="3"/>`;
  return s + '</svg>';
}
function swSvg(kind, st, on) {
  const [a, b] = st;
  if (kind === 'series') {
    return loopFig([{ k: 'sw', closed: a, lab: 'A' }, { k: 'sw', closed: b, lab: 'B' }, { k: 'lamp', on: on ? 1 : 0, side: 'r' }], { live: on, U: '9 V' });
  }
  const T = 35, B = 155, L = 40, Rx = 290, M = 95;
  let s = `<svg viewBox="0 0 320 175"><path ${W(on)} d="M${L} ${T}H95M205 ${T}H${Rx}V${B}H${L}Z"/>`;
  s += `<path ${W(on && a)} d="M95 ${T}H205"/><path ${W(on && b)} d="M95 ${T}V${M + 10}H205V${T}"/>`;
  s += rot(L, M, P.bat(L, M)) + `<text class="lbl" x="${L + 24}" y="${M + 5}">9 V</text>`;
  s += P.sw(150, T, { closed: a }) + `<text class="lbl" x="150" y="${T + 30}" text-anchor="middle">A</text>`;
  s += P.sw(150, M + 10, { closed: b }) + `<text class="lbl" x="150" y="${M + 40}" text-anchor="middle">B</text>`;
  s += rot(Rx, M, P.lamp(Rx, M, { on: on ? 1 : 0 }));
  return s + '</svg>';
}
function hbState(s) { const [a, b, c, d] = s; if ((a && b) || (c && d)) return 'short'; if (a && d && !b && !c) return 'fwd'; if (c && b && !a && !d) return 'rev'; return 'stop'; }
function hbSvg(st, state) {
  const short = state === 'short', fwd = state === 'fwd', rev = state === 'rev';
  const lv = (fwd || rev) ? ' live' : '';
  let s = `<svg viewBox="0 0 300 200"><path class="wire${short ? '' : lv}" d="M60 25H240M60 180H240M60 25V180M240 25V180M60 100H132M168 100H240"/>`;
  if (short) s += `<path class="wire" style="stroke:#ff5c6c" d="M60 25V180M240 25V180" />`;
  [[60, 62, 'S1'], [60, 143, 'S2'], [240, 62, 'S3'], [240, 143, 'S4']].forEach(([x, y, n], i) => {
    s += rot(x, y, P.sw(x, y, { closed: st[i] })) + `<text class="lbl" x="${x < 150 ? x - 36 : x + 36}" y="${y + 5}" text-anchor="middle">${n}</text>`;
  });
  s += P.motor(150, 100) + `<text class="lbl m" x="150" y="18" text-anchor="middle">+ 9 V</text><text class="lbl m" x="150" y="196" text-anchor="middle">GND</text>`;
  const txt = short ? [t('short'), '#ff5c6c'] : fwd ? [t('fwd'), '#a4d007'] : rev ? [t('rev'), '#66c0f4'] : [t('stop'), '#8f98a0'];
  s += `<text class="lbl" x="150" y="${short ? 145 : 140}" text-anchor="middle" style="fill:${txt[1]}">${txt[0]}</text>`;
  return s + '</svg>';
}

const FIGS = {
  ohm: () => ohmFig(),
  loop: s => loopFig(s.parts, s),
  par: s => parFig(s),
  div: s => divFig(s),
  sym: s => symFig(s.s),
  res: s => resSvg(s.b),
  pwm: s => pwmSvg(s.d, false),
  gate: s => gateSvg(s.g, s.in || [0, 0], !!GATES[s.g](...(s.in || [0, 0]).map(Boolean)), s.hide),
  hb: s => hbSvg(s.st, hbState(s.st)),
};
function fig(spec) { if (!spec) return ''; const s = typeof spec === 'string' ? { k: spec } : spec; const f = FIGS[s.k]; return f ? `<div class="figure">${f(s)}</div>` : ''; }

/* Slider visualisations */
const VIS = {
  led(R, ex) {
    const U = ex.U || 5, Uf = ex.Uf || 2, I = (U - Uf) / R * 1000, burnt = I > (ex.max || 35);
    return { out: I, svg: loopFig([{ k: 'res', lab: fmt(R, 0) + ' Ω' }, { k: 'led', on: clamp(I / 20, 0, 1), burnt }], { U: U + ' V', live: !burnt }),
      vals: [[t('resistance'), fmt(R, 0) + ' Ω'], [t('ledI'), burnt ? t('tooMuch') : fmt(I, 1) + ' mA']] };
  },
  pwm(d) { return { out: d, svg: pwmSvg(d), vals: [[t('duty'), fmt(d, 0) + ' %'], [t('avgU'), fmt(5 * d / 100, 2) + ' V']] }; },
  div(R2, ex) {
    const R1 = ex.R1 || 10, Uin = ex.Uin || 9, u = Uin * R2 / (R1 + R2);
    return { out: u, svg: divFig({ R1: R1 + ' kΩ', R2: fmt(R2, 1) + ' kΩ', Uin: Uin + ' V', Uout: fmt(u, 2) + ' V' }), vals: [['R2', fmt(R2, 1) + ' kΩ'], [t('Uout'), fmt(u, 2) + ' V']] };
  },
  pid(Kp) {
    let x = 0, v = 0, mx = 0, t90 = null; const dt = .01, c = 2, pts = [];
    for (let i = 0; i <= 600; i++) {
      const t = i * dt; if (i % 5 === 0) pts.push(`${(30 + t / 6 * 270).toFixed(1)},${(135 - clamp(x, -.2, 1.8) * 80).toFixed(1)}`);
      if (t90 === null && x >= .9) t90 = t; mx = Math.max(mx, x);
      const a = Kp * (1 - x) - c * v; v += a * dt; x += v * dt;
    }
    const os = Math.max(0, (mx - 1) * 100), pass = os < 10 && t90 !== null && t90 <= 2.5;
    const svg = `<svg viewBox="0 0 310 150"><path d="M30 135H300M30 10V135" stroke="#3d424a" stroke-width="2"/><path d="M30 55H300" stroke="#a4d007" stroke-width="2" stroke-dasharray="6 5"/><path d="M30 47H300M30 63H300" stroke="#a4d007" stroke-opacity=".25" stroke-width="1"/>` +
      `<text class="lbl m" x="296" y="48" text-anchor="end" style="fill:#a4d007">${t('goal')}</text><text class="lbl m" x="296" y="148" text-anchor="end">${t('time')}</text>` +
      `<polyline points="${pts.join(' ')}" fill="none" stroke="${pass ? '#a4d007' : '#e8c547'}" stroke-width="3" stroke-linejoin="round"/></svg>`;
    return { out: Kp, pass, svg, vals: [[t('overshoot'), fmt(os, 0) + ' %'], [t('t90'), t90 === null ? t('tooSlow') : fmt(t90, 1) + ' s']] };
  },
};

/* =========================================================
   Exercise types
   ========================================================= */
const KIND = t('kind');
const PRAISE = t('praise');
const R = {};

R.mc = (ex, b, c) => {
  const ord = shuffle(ex.o.map((_, i) => i)), short = ex.o.every(o => o.length <= 11);
  b.insertAdjacentHTML('beforeend', `<div class="opts ${short ? 'grid' : ''}">${ord.map((i, k) => `<button class="opt ${short ? 'center' : ''}" data-i="${i}">${short ? '' : `<span class="k">${k + 1}</span>`}${md(ex.o[i])}</button>`).join('')}</div>`);
  let sel = null;
  $$('.opt', b).forEach(o => o.onclick = () => { $$('.opt', b).forEach(x => x.classList.remove('sel')); o.classList.add('sel'); sel = +o.dataset.i; sfx('tap'); c.ready(true); });
  return () => {
    const ok = sel === ex.a;
    $$('.opt', b).forEach(o => { const i = +o.dataset.i; if (i === ex.a) o.classList.add('ok'); else if (i === sel) o.classList.add('bad'); });
    return { ok, sol: ex.o[ex.a] };
  };
};
R.tf = (ex, b, c) => R.mc({ ...ex, o: t('tf'), a: ex.a ? 0 : 1 }, b, c);

R.num = (ex, b, c) => {
  b.insertAdjacentHTML('beforeend', `<div class="numrow"><input id="ni" inputmode="decimal" autocomplete="off" placeholder="?"><span class="unit">${esc(ex.unit || '')}</span></div>`);
  const inp = $('#ni', b);
  inp.oninput = () => c.ready(parseNum(inp.value) !== null);
  inp.onkeydown = e => { if (e.key === 'Enter') c.submit(); };
  return () => {
    inp.blur(); const v = parseNum(inp.value), tol = ex.tol ?? 0.02;
    const ok = v !== null && Math.abs(v - ex.a) <= Math.abs(ex.a) * tol + 1e-9;
    inp.style.borderColor = ok ? 'var(--green)' : 'var(--red)';
    return { ok, sol: fmt(ex.a, 3) + ' ' + (ex.unit || '') };
  };
};

function hlCode(code) {
  return code.split('\n').map(line => {
    let cm = ''; const ci = line.indexOf('//');
    if (ci >= 0) { cm = `<span class="cm">${esc(line.slice(ci))}</span>`; line = line.slice(0, ci); }
    let h = esc(line)
      .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="nu">$1</span>')
      .replace(/\b(void|int|float|bool|long|const|if|else|for|while|return|true|false|HIGH|LOW|OUTPUT|INPUT|INPUT_PULLUP)\b/g, '<span class="kw">$1</span>')
      .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="fn">$1</span>');
    return h + cm;
  }).join('\n').replace('___', '<span class="gap" id="gap">&nbsp;</span>');
}
R.fill = (ex, b, c) => {
  b.insertAdjacentHTML('beforeend', `<div class="code">${hlCode(ex.code)}</div><div class="opts grid">${shuffle(ex.o.map((_, i) => i)).map(i => `<button class="opt center" data-i="${i}" style="font-family:ui-monospace,Menlo,monospace;font-size:15px">${esc(ex.o[i])}</button>`).join('')}</div>`);
  let sel = null; const gap = $('#gap', b);
  $$('.opt', b).forEach(o => o.onclick = () => { $$('.opt', b).forEach(x => x.classList.remove('sel')); o.classList.add('sel'); sel = +o.dataset.i; gap.textContent = ex.o[sel]; sfx('tap'); c.ready(true); });
  return () => { const ok = sel === ex.a; $$('.opt', b).forEach(o => { const i = +o.dataset.i; if (i === ex.a) o.classList.add('ok'); else if (i === sel) o.classList.add('bad'); }); return { ok, sol: ex.o[ex.a] }; };
};

R.match = (ex, b, c) => {
  const n = ex.pairs.length, la = shuffle([...Array(n).keys()]), ra = shuffle([...Array(n).keys()]);
  let html = '<div class="opts grid">';
  for (let k = 0; k < n; k++) html += `<button class="opt center" data-s="l" data-i="${la[k]}">${md(ex.pairs[la[k]][0])}</button><button class="opt center" data-s="r" data-i="${ra[k]}">${md(ex.pairs[ra[k]][1])}</button>`;
  b.insertAdjacentHTML('beforeend', html + '</div>');
  let sl = null, sr = null, left = n;
  $$('.opt', b).forEach(o => o.onclick = () => {
    if (o.classList.contains('gone')) return;
    const side = o.dataset.s;
    $$(`.opt[data-s="${side}"]`, b).forEach(x => x.classList.remove('sel'));
    o.classList.add('sel'); if (side === 'l') sl = o; else sr = o;
    if (sl && sr) {
      const A = sl, B = sr; sl = sr = null;
      if (A.dataset.i === B.dataset.i) {
        A.className = B.className = 'opt center ok'; sfx('tap'); buzz();
        setTimeout(() => { A.classList.add('gone'); B.classList.add('gone'); }, 260);
        if (--left === 0) c.ready(true);
      } else {
        A.className = B.className = 'opt center bad'; sfx('bad'); buzz(2);
        setTimeout(() => { A.className = B.className = 'opt center'; }, 450);
      }
    } else sfx('tap');
  });
  return () => ({ ok: true });
};

R.order = (ex, b, c) => {
  const n = ex.items.length, bank = shuffle([...Array(n).keys()]), picked = [];
  b.insertAdjacentHTML('beforeend', `<div class="order-slot" id="os"></div><div class="opts" id="ob"></div>`);
  const draw = () => {
    $('#os', b).innerHTML = picked.map(i => `<button class="opt" data-i="${i}">${md(ex.items[i])}</button>`).join('');
    $('#ob', b).innerHTML = bank.map(i => `<button class="opt ${picked.includes(i) ? 'gone' : ''}" data-i="${i}">${md(ex.items[i])}</button>`).join('');
    $$('#os .opt', b).forEach(o => o.onclick = () => { picked.splice(picked.indexOf(+o.dataset.i), 1); sfx('tap'); draw(); });
    $$('#ob .opt', b).forEach(o => o.onclick = () => { picked.push(+o.dataset.i); sfx('tap'); draw(); });
    c.ready(picked.length === n);
  };
  draw();
  return () => {
    const same = (v, k) => ex.items[v] === ex.items[k];
    const ok = picked.length === ex.items.length && picked.every(same);
    $$('#os .opt', b).forEach((o, k) => o.classList.add(same(+o.dataset.i, k) ? 'ok' : 'bad'));
    return { ok, sol: ex.items.join(' → ') };
  };
};

function colorPicker(box, onChange, opts = {}) {
  const st = opts.init ? [...opts.init] : [null, null, null]; let tab = 0;
  const names = t('bands');
  box.innerHTML = `<div class="figure" data-r></div><div class="band-tabs">${names.map((n, i) => `<button class="band-tab" data-t="${i}">${n}</button>`).join('')}</div>
    <div class="swatches">${RES_COLS.map(([n, col], i) => `<button class="sw" data-c="${i}" style="background:${col};color:${i === 0 || i === 1 || i === 6 || i === 7 ? '#fff' : '#111'}">${i}</button>`).join('')}</div><div class="readout" data-o></div>`;
  const draw = () => {
    $('[data-r]', box).innerHTML = resSvg(st);
    $$('.band-tab', box).forEach((t, i) => t.classList.toggle('on', i === tab));
    $$('.sw', box).forEach((s, i) => s.classList.toggle('sel', st[tab] === i));
    const full = st.every(v => v != null);
    $('[data-o]', box).innerHTML = full ? fmtOhm(ohmOf(st)) : `<span style="color:var(--muted)">${st.map(v => v == null ? '?' : RES_COLS[v][0]).join(' · ')}</span>`;
    onChange(full ? ohmOf(st) : null, st);
  };
  $$('.band-tab', box).forEach(t => t.onclick = () => { tab = +t.dataset.t; sfx('tap'); draw(); });
  $$('.sw', box).forEach(s => s.onclick = () => { st[tab] = +s.dataset.c; if (tab < 2 && st[tab + 1] == null) tab++; sfx('tap'); draw(); });
  draw();
}
R.color = (ex, b, c) => {
  const box = document.createElement('div'); b.appendChild(box); let val = null;
  colorPicker(box, v => { val = v; c.ready(v != null); });
  return () => ({ ok: val === ex.v, sol: bandsFor(ex.v).map(i => RES_COLS[i][0]).join(' – ') + ` (${fmtOhm(ex.v)})` });
};

R.logic = (ex, b, c) => {
  const hb = ex.draw === 'hb', n = hb ? 4 : ex.draw === 'NOT' ? 1 : 2;
  const st = (ex.init || Array(n).fill(0)).map(Boolean), fix = ex.fix || [];
  const names = hb ? ['S1', 'S2', 'S3', 'S4'] : n === 1 ? ['A'] : ['A', 'B'];
  const isSw = hb || ex.draw === 'series' || ex.draw === 'parallel';
  const out = () => hb ? hbState(st) : !!GATES[ex.draw](...st);
  b.insertAdjacentHTML('beforeend', `${ex.goalText ? `<p class="goal">${md(ex.goalText)}</p>` : ''}<div class="figure" data-f></div><div class="toggles" data-t></div>`);
  const draw = () => {
    const o = out();
    $('[data-f]', b).innerHTML = hb ? hbSvg(st, o) : isSw ? swSvg(ex.draw, st, o) : gateSvg(ex.draw, st, o);
    $('[data-t]', b).innerHTML = names.map((nm, i) => `<button class="tog ${st[i] ? 'on' : ''}" data-i="${i}" ${fix[i] != null ? 'disabled style="opacity:.55"' : ''}><small>${nm}${fix[i] != null ? ' 🔒' : ''}</small>${isSw ? (st[i] ? t('on') : t('off')) : (st[i] ? '1' : '0')}</button>`).join('');
    $$('.tog', b).forEach(t => t.onclick = () => { const i = +t.dataset.i; st[i] = !st[i]; sfx(out() === true || out() === 'fwd' || out() === 'rev' ? 'zap' : 'tap'); buzz(); draw(); });
  };
  draw(); c.ready(true);
  return () => ({ ok: out() === ex.goal, sol: ex.sol || null });
};

R.slider = (ex, b, c) => {
  const V = VIS[ex.vis]; let x = ex.init;
  b.insertAdjacentHTML('beforeend', `<div class="figure" data-f></div><div class="slider-box"><input type="range" min="${ex.min}" max="${ex.max}" step="${ex.step}" value="${ex.init}"></div><div class="slider-vals" data-v></div>`);
  const upd = () => { const r = V(x, ex); $('[data-f]', b).innerHTML = r.svg; $('[data-v]', b).innerHTML = r.vals.map(v => `<div><small>${v[0]}</small>${v[1]}</div>`).join(''); };
  $('input', b).oninput = e => { x = +e.target.value; upd(); c.ready(true); };
  upd();
  return () => { const r = V(x, ex); const ok = r.pass !== undefined ? r.pass : r.out >= ex.ok[0] && r.out <= ex.ok[1]; return { ok, sol: ex.sol || null }; };
};

/* =========================================================
   Lesson flow
   ========================================================= */
let L = null;
const pct = () => Math.min(100, L.solved / L.total * 100);

function startLesson(les) {
  if (les.quiz) { // Chapter test: own questions + random chapter exercises, no second tries, no battery cost
    const own = les.ex.map((ex, i) => ({ ex, ref: refOf(les.id, i) })), pool = [];
    les.unit.lessons.filter(l => !l.quiz).forEach(l => l.ex.forEach((ex, i) => { if (ex.t !== 'info') pool.push({ ex, ref: refOf(l.id, i) }); }));
    const queue = shuffle([...own, ...shuffle(pool).slice(0, Math.max(0, QUIZ_N - own.length))]);
    L = { kind: 'quiz', les, queue, pos: 0, solved: 0, wrong: 0, right: 0, t0: Date.now(), total: queue.length };
    return renderEx();
  }
  tickEnergy();
  if (!S.unlimited && S.energy <= 0) return outOfEnergy();
  L = { kind: 'lesson', les, queue: les.ex.map((ex, i) => ({ ex, ref: refOf(les.id, i) })), pos: 0, solved: 0, wrong: 0, right: 0, t0: Date.now() };
  L.total = L.queue.length; renderEx();
}
function startPractice(mode) {
  let refs;
  if (mode === 'mistakes') refs = shuffle(S.mistakes).slice(0, 8);
  else {
    const pool = []; ALL.filter(l => S.done[l.id]).forEach(l => l.ex.forEach((ex, i) => { if (ex.t !== 'info') pool.push(refOf(l.id, i)); }));
    refs = shuffle(pool).slice(0, 8);
  }
  const queue = refs.map(resolve).filter(Boolean);
  if (!queue.length) return toast(t('nothing'));
  L = { kind: 'practice', queue, pos: 0, solved: 0, wrong: 0, right: 0, t0: Date.now(), total: queue.length };
  renderEx();
}

function renderEx() {
  const item = L.queue[L.pos], ex = item.ex;
  L.phase = 'answer';
  const showE = L.kind === 'lesson';
  app.innerHTML = `<div class="lesson">
    <div class="lesson-top"><button class="x" data-act="quit" aria-label="${t('quit')}">${I.x}</button><div class="bar"><i style="width:${pct()}%"></i></div>${showE ? `<div class="stat" id="en">${batt(S.energy)}<span>${S.unlimited ? '' : S.energy}</span></div>` : ''}${L.kind === 'quiz' ? `<div class="stat" style="font-size:15px;color:var(--muted)">${L.pos + 1}/${L.total}</div>` : ''}</div>
    <div class="lesson-body" id="lb"></div>
    <div class="lesson-foot" id="lf"><div class="fb" id="fb"></div><button class="btn" id="go" disabled>${t('check')}</button></div></div>`;
  const b = $('#lb'), go = $('#go');
  if (ex.t === 'info') {
    b.innerHTML = `<div class="ex-kind" style="color:var(--yellow)">${t('newKnow')}</div><div class="info"><h2>${md(ex.title)}</h2>${fig(ex.fig)}${paras(ex.text)}${ex.tip ? `<div class="tip">${md(ex.tip)}</div>` : ''}</div>`;
    go.disabled = false; go.textContent = t('cont');
    go.onclick = () => { L.solved++; sfx('tap'); next(); };
    return;
  }
  b.innerHTML = `${item.retry ? `<span class="again">${t('retry')}</span>` : ''}<div class="ex-kind">${KIND[ex.t]}</div><p class="q">${md(ex.q)}</p>${['logic', 'slider', 'color'].includes(ex.t) ? '' : fig(ex.fig)}`;
  const ctx = { ready: v => { if (L.phase === 'answer') go.disabled = !v; }, submit: () => go.click() };
  const check = R[ex.t](ex, b, ctx);
  go.onclick = () => {
    if (L.phase === 'answer') { if (go.disabled) return; const r = check(); judge(r.ok, r.sol, ex); }
    else next();
  };
}
function judge(ok, sol, ex) {
  L.phase = 'fb';
  const item = L.queue[L.pos], b = $('#lb');
  b.classList.add('lockd');
  S.answered++;
  if (ok) { S.correct++; L.solved++; L.right++; sfx('ok'); buzz(); if (L.kind === 'practice') dropMistake(item.ref); }
  else {
    L.wrong++; sfx('bad'); buzz(2); addMistake(item.ref);
    if (L.kind === 'quiz') L.solved++; else L.queue.push({ ...item, retry: true });
    if (L.kind === 'lesson') useEnergy();
    b.classList.add('shake');
  }
  save();
  const lf = $('#lf'), fb = $('#fb'), go = $('#go');
  lf.classList.add(ok ? 'ok' : 'bad');
  fb.innerHTML = ok
    ? `<h4>${I.okC} ${pick(PRAISE)}</h4>${ex.ex ? `<p>${md(ex.ex)}</p>` : ''}`
    : `<h4>${I.badC} ${t('wrong')}</h4><p>${sol ? `${t('correctIs')} <b>${md(String(sol))}</b><br>` : ''}${ex.ex ? md(ex.ex) : ''}</p>`;
  fb.classList.add('show');
  go.textContent = t('cont'); go.className = 'btn ' + (ok ? 'green' : 'red'); go.disabled = false;
  $('.bar i').style.width = pct() + '%';
  const en = $('#en'); if (en) en.innerHTML = `${batt(S.energy)}<span>${S.unlimited ? '' : S.energy}</span>`;
}
function next() {
  if (L.kind === 'lesson' && !S.unlimited && S.energy <= 0) { L = null; return outOfEnergy(); }
  L.pos++;
  if (L.pos >= L.queue.length) return finish();
  renderEx();
}
function chips(xp, acc, secs) {
  return `<div class="chips">
      <div class="chip" style="--c:var(--yellow)"><small>XP</small><b>${I.bolt}${xp}</b></div>
      <div class="chip" style="--c:var(--green)"><small>${t('hits')}</small><b>${I.target}${acc}%</b></div>
      <div class="chip" style="--c:var(--blue)"><small>${t('timeC')}</small><b>${I.clock}${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}</b></div>
    </div>`;
}
function quizDone() {
  const les = L.les, n = L.right + L.wrong, need = Math.ceil(n * PASS), pass = L.right >= need, first = !S.done[les.id];
  const xp = pass ? (first ? 20 : 10) + (L.wrong === 0 ? 10 : 0) : 5;
  if (pass) S.done[les.id] = true;
  award(xp);
  const secs = Math.round((Date.now() - L.t0) / 1000), acc = n ? Math.round(L.right / n * 100) : 0;
  if (pass) { sfx('win'); buzz(2); } else sfx('bad');
  app.innerHTML = `<div class="result">
    <div class="big-ico" style="color:${pass ? 'var(--yellow)' : 'var(--muted)'}">${I.trophy}</div>
    <h1 style="${pass ? '' : 'color:var(--text)'}">${pass ? (L.wrong === 0 ? t('perfect') : t('mastered')) : t('close')}</h1>
    <div style="color:var(--muted);font-weight:700">${t('score', L.right, n, need)}</div>
    ${chips(xp, acc, secs)}
    ${pass ? `<button class="btn" data-act="home" style="max-width:420px">${t('cont')}</button>`
      : `<p style="color:var(--muted);font-weight:600;max-width:340px;margin:0 0 20px">${t('quizTip')}</p>
         <div style="width:100%;max-width:420px;display:flex;flex-direction:column;gap:14px"><button class="btn" data-act="start" data-id="${les.id}">${t('again')}</button><button class="btn ghost" data-act="home">${t('back')}</button></div>`}</div>`;
  if (pass) confetti();
  L = null;
}
function finish() {
  if (L.kind === 'quiz') return quizDone();
  let xp, title;
  if (L.kind === 'lesson') {
    const first = !S.done[L.les.id];
    xp = (first ? 10 : 5) + (L.wrong === 0 ? 5 : 0);
    S.done[L.les.id] = true;
    title = L.wrong === 0 ? t('flawless') : t('lessonDone');
  } else { xp = 10; S.energy = MAXE; title = t('trainDone'); }
  const was = S.lastDay === dayKey();
  award(xp);
  const acc = L.right + L.wrong ? Math.round(L.right / (L.right + L.wrong) * 100) : 100;
  const secs = Math.round((Date.now() - L.t0) / 1000);
  const lastInUnit = L.kind === 'lesson' && L.les.unit.lessons.filter(l => !l.quiz).every(l => S.done[l.id]) && L.les.unit.lessons.some(l => l.quiz && !S.done[l.id]);
  sfx('win'); buzz(2);
  app.innerHTML = `<div class="result">
    <div class="big-ico" style="color:var(--yellow)">${lastInUnit ? I.trophy : I.bolt}</div>
    <h1>${title}</h1>
    ${lastInUnit ? `<div style="color:var(--blue);font-weight:800;margin-bottom:6px">${t('testUnlocked')}</div>` : ''}
    <div style="color:var(--muted);font-weight:700">${L.kind === 'practice' ? t('recharged') : was ? t('streak', streakNow()) : `🔥 ${t('streak', S.streak)}!`}</div>
    ${chips(xp, acc, secs)}
    <button class="btn" data-act="home" style="max-width:420px">${t('cont')}</button></div>`;
  confetti();
  L = null;
}
function confetti() {
  const box = $('.result'); const cols = ['#e8c547', '#a4d007', '#66c0f4', '#ff5c6c', '#c58bff'];
  for (let i = 0; i < 60; i++) {
    const d = document.createElement('i'); d.className = 'confetti';
    d.style.cssText = `left:${Math.random() * 100}%;background:${pick(cols)};animation-duration:${1.6 + Math.random() * 1.8}s;animation-delay:${Math.random() * .5}s;transform:rotate(${Math.random() * 360}deg)`;
    box.appendChild(d);
  }
}
function outOfEnergy() {
  app.innerHTML = `<div class="result"><div class="big-ico">${batt(0).replace('<svg', '<svg width="120" height="120"')}</div><h1 style="color:var(--red)">${t('empty')}</h1>
    <p style="color:var(--muted);font-weight:600;max-width:340px">${t('emptyTxt')}</p>
    <div style="width:100%;max-width:420px;display:flex;flex-direction:column;gap:14px;margin-top:20px">
      <button class="btn" data-act="practice-go">${t('trainNow')}</button><button class="btn ghost" data-act="home">${t('later')}</button></div></div>`;
}

/* =========================================================
   Main screens
   ========================================================= */
let tab = 'learn';
function home() {
  tickEnergy();
  const st = streakNow();
  app.innerHTML = `<div class="topbar">
      <div class="stat ${st ? '' : 'off'}">${I.flame}<span>${st}</span></div>
      <div class="stat">${I.gem}<span>${S.xp}</span></div>
      <button class="stat" data-act="tab" data-t="practice">${batt(S.energy)}<span>${S.unlimited ? '∞' : S.energy}</span></button>
    </div>
    <div class="scroll" id="sc">${({ learn: learnTab, practice: practiceTab, tools: toolsTab, me: meTab })[tab]()}</div>
    <nav class="tabbar">${[['learn', I.learn], ['practice', I.practice], ['tools', I.tools], ['me', I.user]]
      .map(([k, ic], i) => [k, t('tabs')[i], ic]).map(([k, n, ic]) => `<button class="tab ${tab === k ? 'on' : ''}" data-act="tab" data-t="${k}">${ic}${n}</button>`).join('')}</nav>`;
  if (tab === 'learn') { const c = $('.node.current'); if (c) c.scrollIntoView({ block: 'center' }); }
  if (tab === 'tools') mountTools();
}

function learnTab() {
  const standalone = navigator.standalone || matchMedia('(display-mode: standalone)').matches;
  let h = (!standalone && !S.hideInstall) ? `<div class="install"><div>${t('install')}</div><button data-act="hide-install">×</button></div>` : '';
  const cur = curIdx(); let g = 0;
  CONTENT.forEach(u => {
    const doneN = u.lessons.filter(l => S.done[l.id]).length;
    h += `<div class="unit-head" style="--uc:${u.color}"><small>${t('chapter')} ${u.n} · ${doneN}/${u.lessons.length}</small><b>${esc(u.title)}</b><span>${esc(u.sub)}</span></div><div class="path">`;
    u.lessons.forEach((l, i) => {
      const idx = ALL.indexOf(l), st = S.done[l.id] ? 'done' : idx === cur ? 'current' : 'locked';
      const off = l.quiz ? 0 : Math.round(Math.sin(g++ * 1.15) * 72);
      const icon = l.quiz ? I.trophy : st === 'done' ? I.check : st === 'current' ? I.bolt : I.lock;
      const col = l.quiz && st === 'done' ? 'background:#e8c547;--sh:#9c7f12;--c:#e8c547;color:#1b1500' : st !== 'locked' ? `background:${u.color};--sh:${u.dark};--c:${u.color};color:#10132a` : '';
      h += `<div class="node-wrap ${l.quiz ? 'quiz' : ''}"><button class="node ${st} ${l.quiz ? 'quiz' : ''}" data-act="node" data-id="${l.id}" style="transform:translateX(${off}px);${col}">${icon}${st === 'current' ? `<span class="start-tag">${l.quiz ? t('test') : t('start')}</span>` : ''}</button></div>`;
    });
    h += '</div>';
  });
  if (cur === -1) h += `<div class="card" style="margin:20px 16px;text-align:center"><h3>${t('allDone')}</h3><p>${t('allDoneTxt')}</p></div>`;
  return h;
}
function nodePop(btn) {
  const l = BYID[btn.dataset.id], u = l.unit, idx = ALL.indexOf(l), cur = curIdx();
  const locked = !S.done[l.id] && idx !== cur, r = btn.getBoundingClientRect();
  const top = Math.min(r.bottom + 14, innerHeight - 230);
  const bg = document.createElement('div'); bg.className = 'pop-bg';
  const p = document.createElement('div'); p.className = 'pop';
  p.style.cssText = `top:${top}px;--uc:${locked ? 'var(--line)' : u.color}`;
  const info = l.quiz
    ? (locked ? t('quizLocked') : t('quizInfo', QUIZ_N, Math.ceil(QUIZ_N * PASS)))
    : (locked ? t('lessonLocked') : t('lessonInfo', l.li + 1, u.lessons.filter(x => !x.quiz).length, l.ex.filter(e => e.t !== 'info').length));
  const label = l.quiz ? (S.done[l.id] ? t('quizRedo') : t('quizGo')) : (S.done[l.id] ? t('redo') : t('go'));
  p.innerHTML = `<h3>${esc(l.title)}</h3><p>${info}</p>${locked ? '' : `<button class="btn white" data-act="start" data-id="${l.id}">${label}</button>`}`;
  const close = () => { bg.remove(); p.remove(); };
  bg.onclick = close; app.append(bg, p); sfx('tap');
}

function practiceTab() {
  const dn = ALL.filter(l => S.done[l.id]).length, m = S.mistakes.length;
  return `<div class="page"><h2>${t('practice')}</h2>
    <div class="card"><h3 style="display:flex;align-items:center;gap:8px">${batt(S.energy).replace('<svg', '<svg width="30" height="26"')} ${t('battery')}: ${S.unlimited ? t('unlimitedW') : `${S.energy} / ${MAXE}`}</h3>
      <p>${S.unlimited ? t('unlimitedOn') : S.energy >= MAXE ? t('full') : t('nextBar', minsToNext())}</p></div>
    <div class="card"><h3>${t('mistakes')}</h3><p>${m ? t('mistakesTxt', m) : t('noMistakes')}</p>
      <button class="btn" data-act="practice" data-m="mistakes" ${m ? '' : 'disabled'}>${t('mistakesBtn')}</button></div>
    <div class="card"><h3>${t('mix')}</h3><p>${dn ? t('mixTxt') : t('mixLocked')}</p>
      <button class="btn" data-act="practice" data-m="mix" ${dn ? '' : 'disabled'}>${t('mixBtn')}</button></div></div>`;
}

function toolsTab() {
  return `<div class="page"><h2>${t('tools')}</h2>
    <div class="card"><h3>${t('ohm')}</h3><p>${t('ohmTxt')}</p>
      <div class="field"><label>${t('voltage')}</label><div><input id="tU" inputmode="decimal" placeholder="${t('eg')} 5"><span>V</span></div></div>
      <div class="field"><label>${t('current')}</label><div><input id="tI" inputmode="decimal" placeholder="${t('eg')} 20"><span>mA</span></div></div>
      <div class="field"><label>${t('resistR')}</label><div><input id="tR" inputmode="decimal" placeholder="${t('eg')} 250"><span>Ω</span></div></div>
      <div class="readout" id="tOut" style="font-size:20px">–</div></div>
    <div class="card"><h3>${t('ledR')}</h3><p>${t('ledRTxt')}</p>
      <div class="field"><label>${t('supply')}</label><div><input id="lU" inputmode="decimal" value="5"><span>V</span></div></div>
      <div class="field"><label>${t('ledU')}</label><div><input id="lF" inputmode="decimal" value="2"><span>V</span></div></div>
      <div class="field"><label>${t('ledCur')}</label><div><input id="lI" inputmode="decimal" value="15"><span>mA</span></div></div>
      <div class="readout" id="lOut" style="font-size:20px">–</div></div>
    <div class="card"><h3>${t('colorRead')}</h3><p>${t('colorReadTxt')}</p><div id="cp"></div></div></div>`;
}
const E12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
function nextE12(r) { for (let d = 1; d < 1e7; d *= 10) for (const e of E12) if (e * d / 10 >= r - 1e-9) return e * d / 10; return r; }
function mountTools() {
  const ids = ['tU', 'tI', 'tR'];
  const calc = () => {
    const [U, Im, Rv] = ids.map(i => parseNum($('#' + i).value)), I = Im == null ? null : Im / 1000, o = $('#tOut');
    if (U != null && I != null && Rv == null) o.innerHTML = `R = <span style="color:var(--yellow)">${fmtOhm(U / I)}</span>`;
    else if (U != null && Rv != null && I == null) o.innerHTML = `I = <span style="color:var(--yellow)">${fmt(U / Rv * 1000, 2)} mA</span>`;
    else if (I != null && Rv != null && U == null) o.innerHTML = `U = <span style="color:var(--yellow)">${fmt(I * Rv, 3)} V</span>`;
    else o.textContent = '–';
  };
  ids.forEach(i => $('#' + i).oninput = calc);
  const led = () => {
    const [U, F, Im] = ['lU', 'lF', 'lI'].map(i => parseNum($('#' + i).value)), o = $('#lOut');
    if (U == null || F == null || !Im || U <= F) { o.textContent = U != null && F != null && U <= F ? t('tooLow') : '–'; return; }
    const r = (U - F) / (Im / 1000), e = nextE12(r);
    o.innerHTML = `${fmtOhm(r)} → ${t('take')} <span style="color:var(--yellow)">${fmtOhm(e)}</span><div style="font-size:14px;color:var(--muted);font-weight:700">${t('e12', fmt((U - F) * (U - F) / e * 1000, 0))}</div>`;
  };
  ['lU', 'lF', 'lI'].forEach(i => $('#' + i).oninput = led); led();
  colorPicker($('#cp'), () => { }, { init: [4, 7, 2] });
}

function meTab() {
  const dn = ALL.filter(l => S.done[l.id]).length, acc = S.answered ? Math.round(S.correct / S.answered * 100) : 0;
  const todayXp = S.days[dayKey()] || 0, wd = t('wd');
  const week = [...Array(7)].map((_, k) => { const off = k - 6, d = new Date(); d.setDate(d.getDate() + off); const on = (S.days[dayKey(off)] || 0) > 0; return `<div>${wd[d.getDay()]}<span class="${on ? 'on' : ''}">${on ? I.check : ''}</span></div>`; }).join('');
  const sw = (k, n) => `<div class="row"><span>${n}</span><button class="switch ${S[k] ? 'on' : ''}" data-act="toggle" data-k="${k}" aria-label="${n}"></button></div>`;
  return `<div class="page"><h2>${t('profile')}</h2>
    <div class="stats">
      <div class="card">${I.flame}<div><b>${streakNow()}</b><small>${t('streakDays')}</small></div></div>
      <div class="card">${I.gem}<div><b>${S.xp}</b><small>${t('xpTotal')}</small></div></div>
      <div class="card"><span style="color:var(--yellow)">${I.bolt}</span><div><b>${dn}/${ALL.length}</b><small>${t('lessons')}</small></div></div>
      <div class="card"><span style="color:var(--green)">${I.target}</span><div><b>${acc}%</b><small>${t('rate')}</small></div></div>
    </div>
    <div class="card"><h3>${t('daily')}</h3><p>${todayXp >= S.goal ? t('dailyDone') : t('dailyProg', todayXp, S.goal)}</p>
      <div class="goalbar"><i style="width:${Math.min(100, todayXp / S.goal * 100)}%"></i></div>
      <div class="seg" style="margin-top:12px">${[10, 20, 30, 50].map(g => `<button class="${S.goal === g ? 'on' : ''}" data-act="goal" data-g="${g}">${g} XP</button>`).join('')}</div>
      <div class="week">${week}</div></div>
    <div class="card"><h3>${t('settings')}</h3>
      <div class="row"><span>${LANG === 'de' ? 'Sprache / Language' : 'Language / Sprache'}</span><div class="seg" style="flex:none;width:150px">${[['de', 'DE'], ['en', 'EN']].map(([k, n]) => `<button class="${LANG === k ? 'on' : ''}" data-act="lang" data-l="${k}">${n}</button>`).join('')}</div></div>
      ${sw('sound', t('sound'))}${sw('haptic', t('haptic'))}${sw('unlimited', t('unlimited'))}</div>
    <div class="card"><h3>${t('backup')}</h3><p>${t('backupTxt')}</p>
      <textarea class="backup" id="bk" placeholder="${t('backupPh')}"></textarea>
      <div class="seg" style="margin-top:10px"><button data-act="export">${t('copy')}</button><button data-act="import">${t('restore')}</button></div></div>
    <div class="card"><h3>${t('reset')}</h3><p>${t('resetTxt')}</p><button class="btn red" data-act="reset">${t('resetBtn')}</button></div>
    <p style="text-align:center;color:var(--muted);font-size:13px;font-weight:700">${t('footer', ALL.length, ALL.reduce((a, l) => a + l.ex.length, 0))}</p></div>`;
}

function confirmBox(title, text, yes, onYes) {
  const bg = document.createElement('div'); bg.className = 'pop-bg'; bg.style.background = 'rgba(0,0,0,.55)';
  const p = document.createElement('div'); p.className = 'pop'; p.style.cssText = 'top:28%;background:var(--card);color:var(--text)';
  p.innerHTML = `<h3>${title}</h3><p style="color:var(--muted)">${text}</p><div style="display:flex;flex-direction:column;gap:12px"><button class="btn red" data-y>${yes}</button><button class="btn ghost" data-n>${t('cancel')}</button></div>`;
  const close = () => { bg.remove(); p.remove(); };
  bg.onclick = close; $('[data-n]', p).onclick = close; $('[data-y]', p).onclick = () => { close(); onYes(); };
  document.body.append(bg, p);
}

/* ---------------- Actions ---------------- */
const ACT = {
  tab: b => { tab = b.dataset.t; sfx('tap'); home(); },
  home: () => { tab = 'learn'; home(); },
  node: b => nodePop(b),
  start: b => { $$('.pop,.pop-bg').forEach(e => e.remove()); startLesson(BYID[b.dataset.id]); },
  practice: b => startPractice(b.dataset.m),
  'practice-go': () => { if (S.mistakes.length) startPractice('mistakes'); else if (ALL.some(l => S.done[l.id])) startPractice('mix'); else { S.energy = MAXE; save(); home(); } },
  quit: () => confirmBox(t('quitT'), t('quitTxt'), t('quit'), () => { L = null; home(); }),
  lang: b => { if (b.dataset.l === LANG) return; S.lang = b.dataset.l; save(); location.reload(); },
  'hide-install': () => { S.hideInstall = true; save(); home(); },
  toggle: b => { const k = b.dataset.k; S[k] = !S[k]; save(); b.classList.toggle('on', S[k]); if (S[k]) { sfx('tap'); buzz(); } if (k === 'unlimited') home(); },
  goal: b => { S.goal = +b.dataset.g; save(); sfx('tap'); home(); },
  export: () => {
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(S)))), ta = $('#bk'); ta.value = code;
    (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(() => toast(t('copied')), () => { ta.select(); toast(t('marked')); });
  },
  import: () => {
    try { const d = JSON.parse(decodeURIComponent(escape(atob($('#bk').value.trim())))); if (typeof d.xp !== 'number') throw 0; S = Object.assign({}, DEF, d); save(); toast(t('restored')); if (S.lang !== LANG) location.reload(); else home(); }
    catch (e) { toast(t('invalid')); }
  },
  reset: () => confirmBox(t('resetT'), t('resetQ'), t('del'), () => { S = { ...DEF, lang: LANG, energyAt: Date.now() }; save(); tab = 'learn'; home(); }),
};
app.addEventListener('click', e => { const b = e.target.closest('[data-act]'); if (b && ACT[b.dataset.act]) ACT[b.dataset.act](b, e); });

/* ---------------- Start ---------------- */
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => { });
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => { });
document.addEventListener('visibilitychange', () => { if (!document.hidden && !L) home(); });
home();
