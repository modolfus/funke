/* =========================================================
   German content for Funke (English: lessons.en.js – same ids, structure and answers).
   Exercise types:
     info   – concept card         {title, text, fig?, tip?}
     mc     – multiple choice      {q, o:[..], a:index, fig?, ex?}
     tf     – true / false         {q, a:true|false, fig?, ex?}
     num    – enter a number       {q, a, unit, tol?, fig?, ex?}
     fill   – code gap (___)       {q, code, o:[..], a:index, ex?}
     match  – find pairs           {q, pairs:[[left, right], ..]}
     order  – put in order         {q, items:[in correct order], ex?}
     color  – set resistor bands   {q, v:ohms}
     logic  – switches / gates     {q, draw:'series'|'parallel'|'AND'|'OR'|'XOR'|'NOT'|'NAND'|'NOR'|'hb', goal, init?, fix?, goalText?, sol?}
     slider – knob / slider        {q, vis:'led'|'pwm'|'div'|'pid', min, max, step, init, ok?:[lo,hi], sol?}
   Figures (fig): 'ohm' | {k:'loop',parts,U} | {k:'par',vals,U} | {k:'div',..} | {k:'sym',s} | {k:'res',b:[d1,d2,mult]} | {k:'pwm',d} | {k:'gate',g,in,hide}
   ========================================================= */
const UNITS = [
  {
    title: 'Strom verstehen', sub: 'Spannung, Strom, Widerstand', color: '#e8c547', dark: '#9c7f12',
    lessons: [
      {
        id: 'u1l1', title: 'Was ist Strom?', ex: [
          { t: 'info', title: 'Strom ist wie Wasser', text: 'Stell dir Kabel wie Wasserrohre vor.\n\n**Spannung (U)** ist der Druck, der das Wasser antreibt – gemessen in **Volt (V)**.\n**Strom (I)** ist, wie viel Wasser pro Sekunde fließt – gemessen in **Ampere (A)**.\n**Widerstand (R)** ist eine Engstelle im Rohr – gemessen in **Ohm (Ω)**.', tip: 'Merksatz: Die Spannung drückt, der Strom fließt, der Widerstand bremst.' },
          { t: 'mc', q: 'In welcher Einheit misst man **Spannung**?', o: ['Volt', 'Ampere', 'Ohm', 'Watt'], a: 0, ex: 'Spannung U wird in Volt (V) gemessen – z. B. 1,5 V bei einer AA-Batterie.' },
          { t: 'match', q: 'Ordne jeder Größe ihre Einheit zu.', pairs: [['Spannung', 'Volt'], ['Strom', 'Ampere'], ['Widerstand', 'Ohm']] },
          { t: 'mc', q: 'Im Wasser-Vergleich: Was entspricht dem **Widerstand**?', o: ['Eine Engstelle im Rohr', 'Der Wasserdruck', 'Die Wassermenge pro Sekunde', 'Der Wassertank'], a: 0 },
          { t: 'tf', q: 'Je größer der Widerstand, desto **mehr** Strom fließt (bei gleicher Spannung).', a: false, ex: 'Umgekehrt: Ein größerer Widerstand bremst stärker, also fließt weniger Strom.' },
          { t: 'mc', q: 'Welches Formelzeichen steht für den **Strom**?', o: ['I', 'U', 'R', 'S'], a: 0, ex: 'I kommt vom französischen „intensité“. U für Spannung, R für Widerstand.' },
          { t: 'mc', q: 'Wie viel sind **20 mA** in Ampere?', o: ['0,02 A', '0,2 A', '2 A', '20 A'], a: 0, ex: 'Milli heißt Tausendstel: 20 mA = 20 / 1000 A = 0,02 A.' },
        ]
      },
      {
        id: 'u1l2', title: 'Der Stromkreis', ex: [
          { t: 'info', title: 'Immer im Kreis', text: 'Strom fließt nur, wenn der Weg **geschlossen** ist: vom Pluspol der Batterie durch die Bauteile zurück zum Minuspol.\n\nEin offener Schalter unterbricht den Kreis – dann fließt gar nichts.', fig: { k: 'loop', parts: [{ k: 'sw', closed: true, lab: 'Schalter' }, { k: 'lamp', on: 1, side: 'r', lab: 'Lampe' }], U: '9 V', live: true } },
          { t: 'tf', q: 'Die Lampe in dieser Schaltung leuchtet.', a: false, fig: { k: 'loop', parts: [{ k: 'sw', closed: false, lab: 'Schalter' }, { k: 'lamp', side: 'r' }], U: '9 V' }, ex: 'Der Schalter ist offen – der Kreis ist unterbrochen, also fließt kein Strom.' },
          { t: 'mc', q: 'Was ist hier passiert?', fig: { k: 'loop', parts: [], U: '9 V' }, o: ['Ein Kurzschluss', 'Ein offener Stromkreis', 'Eine Reihenschaltung', 'Alles in Ordnung'], a: 0, ex: 'Plus und Minus sind direkt ohne Widerstand verbunden. Es fließt riesiger Strom – Batterie und Draht werden heiß!' },
          { t: 'order', q: 'Verfolge den Strom (technische Stromrichtung) durch den Kreis.', items: ['Pluspol der Batterie', 'Schalter', 'Lampe', 'Minuspol der Batterie'], ex: 'Technische Stromrichtung: von Plus nach Minus.' },
          { t: 'logic', q: 'Schließ den Stromkreis.', draw: 'series', init: [0, 1], fix: [null, 1], goal: true, goalText: 'Bring die Lampe zum Leuchten 💡' },
          { t: 'mc', q: 'Warum ist ein Kurzschluss gefährlich?', o: ['Es fließt sehr viel Strom, Teile werden heiß', 'Die Spannung verschwindet für immer', 'Es fließt gar kein Strom', 'Die Lampe wird extra hell'], a: 0 },
        ]
      },
      {
        id: 'u1l3', title: 'Ohmsches Gesetz', ex: [
          { t: 'info', title: 'U = R · I', text: 'Das wichtigste Gesetz der Elektronik:\n\n**Spannung = Widerstand × Strom**\n\nDeck im Dreieck die gesuchte Größe ab – dann siehst du die Formel: U = R·I, I = U/R, R = U/I.', fig: 'ohm', tip: 'Rechne immer in Grundeinheiten: Volt, Ampere, Ohm. 20 mA = 0,02 A.' },
          { t: 'mc', q: 'Du kennst **U** und **R**. Wie berechnest du den Strom?', fig: 'ohm', o: ['I = U / R', 'I = U · R', 'I = R / U', 'I = U − R'], a: 0 },
          { t: 'num', q: 'Durch 220 Ω fließen 0,02 A. Wie groß ist die Spannung?', a: 4.4, unit: 'V', ex: 'U = R · I = 220 Ω · 0,02 A = 4,4 V' },
          { t: 'num', q: 'An 450 Ω liegen 9 V. Wie viel Strom fließt?', a: 20, unit: 'mA', ex: 'I = U / R = 9 V / 450 Ω = 0,02 A = 20 mA' },
          { t: 'num', q: 'Eine Lampe zieht an 12 V genau 0,5 A. Welchen Widerstand hat sie?', a: 24, unit: 'Ω', ex: 'R = U / I = 12 V / 0,5 A = 24 Ω' },
          { t: 'tf', q: 'Verdoppelst du die Spannung an einem Widerstand, verdoppelt sich auch der Strom.', a: true, ex: 'I = U / R – bei gleichem R wächst I genau mit U mit.' },
          { t: 'num', q: '5 V an 1 kΩ (= 1000 Ω). Wie viel Strom fließt?', a: 5, unit: 'mA', ex: 'I = 5 V / 1000 Ω = 0,005 A = 5 mA' },
        ]
      },
    ]
  },
  {
    title: 'Bauteile', sub: 'Widerstand, LED, Kondensator', color: '#66c0f4', dark: '#2f7fb0',
    lessons: [
      {
        id: 'u2l1', title: 'Farbcode lesen', ex: [
          { t: 'info', title: 'Ringe statt Zahlen', text: 'Widerstände sind zu klein für Aufdrucke – deshalb gibt es **Farbringe**.\n\n1. Ring = erste Ziffer, 2. Ring = zweite Ziffer, 3. Ring = Anzahl Nullen. Der goldene Ring (Toleranz ±5 %) kommt ans Ende.\n\nschwarz 0 · braun 1 · rot 2 · orange 3 · gelb 4 · grün 5 · blau 6 · violett 7 · grau 8 · weiß 9', fig: { k: 'res', b: [1, 0, 2] }, tip: 'Beispiel oben: braun (1) · schwarz (0) · rot (2 Nullen) = 1000 Ω = 1 kΩ' },
          { t: 'mc', q: 'Welchen Wert hat dieser Widerstand?', fig: { k: 'res', b: [2, 2, 1] }, o: ['220 Ω', '22 Ω', '2,2 kΩ', '222 Ω'], a: 0, ex: 'rot (2) · rot (2) · braun (1 Null) = 220 Ω' },
          { t: 'color', q: 'Stell **220 Ω** ein.', v: 220 },
          { t: 'mc', q: 'Und dieser hier?', fig: { k: 'res', b: [4, 7, 2] }, o: ['4,7 kΩ', '470 Ω', '47 kΩ', '47 Ω'], a: 0, ex: 'gelb (4) · violett (7) · rot (2 Nullen) = 4700 Ω = 4,7 kΩ' },
          { t: 'color', q: 'Stell **10 kΩ** ein.', v: 10000 },
          { t: 'match', q: 'Farbe → Ziffer', pairs: [['braun', '1'], ['rot', '2'], ['gelb', '4'], ['blau', '6']] },
        ]
      },
      {
        id: 'u2l2', title: 'LEDs richtig anschließen', ex: [
          { t: 'info', title: 'Die LED', text: 'Eine **LED** (Leuchtdiode) leuchtet nur in **eine** Richtung: Das lange Bein (**Anode, +**) zeigt zum Pluspol.\n\nAn einer LED fallen ca. **2 V** (rot) bis **3 V** (blau/weiß) ab. Sie braucht ca. **10–20 mA** – und unbedingt einen **Vorwiderstand**, sonst brennt sie durch.', fig: { k: 'loop', parts: [{ k: 'res', lab: 'Vorwiderstand' }, { k: 'led', on: 1, lab: 'LED' }], U: '5 V', live: true } },
          { t: 'mc', q: 'Welches Bein der LED kommt an **Plus**?', o: ['Das lange (Anode)', 'Das kurze (Kathode)', 'Egal'], a: 0, ex: 'Lang = Anode = Plus. Die Kathode erkennst du auch an der abgeflachten Seite.' },
          { t: 'slider', q: 'Finde einen Vorwiderstand, damit **10–20 mA** durch die LED fließen.', vis: 'led', min: 30, max: 1000, step: 10, init: 1000, ok: [10, 20], U: 5, Uf: 2, sol: 'Etwa 150 bis 300 Ω', ex: 'R = (5 V − 2 V) / I. Bei 15 mA: 3 V / 0,015 A = 200 Ω.' },
          { t: 'num', q: '5 V Versorgung, rote LED (2 V), gewünscht 15 mA. Welcher Vorwiderstand?', a: 200, unit: 'Ω', ex: 'Am Widerstand bleiben 5 − 2 = 3 V. R = 3 V / 0,015 A = 200 Ω' },
          { t: 'tf', q: 'Eine LED kann man ohne Vorwiderstand direkt an 5 V anschließen.', a: false, ex: 'Ohne Widerstand begrenzt nichts den Strom – die LED brennt durch.' },
          { t: 'mc', q: 'Was ist das für ein Bauteil?', fig: { k: 'sym', s: 'led' }, o: ['LED', 'Kondensator', 'Widerstand', 'Batterie'], a: 0, ex: 'Dreieck mit Strich = Diode, die zwei Pfeile = es kommt Licht raus.' },
        ]
      },
      {
        id: 'u2l3', title: 'Kondensator & Diode', ex: [
          { t: 'info', title: 'Speichern und Sperren', text: 'Ein **Kondensator** speichert kurz elektrische Ladung – wie ein kleiner Wassertank. Er glättet Spannung und puffert Spitzen. Einheit: **Farad (F)**, meist µF oder nF.\n\nEine **Diode** ist ein Rückschlagventil: Strom darf nur in Pfeilrichtung fließen.', fig: { k: 'sym', s: 'cap' } },
          { t: 'mc', q: 'Was ist das für ein Bauteil?', fig: { k: 'sym', s: 'cap' }, o: ['Kondensator', 'Widerstand', 'Diode', 'Batterie'], a: 0 },
          { t: 'mc', q: 'Und das?', fig: { k: 'sym', s: 'diode' }, o: ['Diode', 'LED', 'Schalter', 'Lampe'], a: 0, ex: 'Wie die LED, nur ohne Licht-Pfeile.' },
          { t: 'match', q: 'Bauteil → Aufgabe', pairs: [['Widerstand', 'bremst Strom'], ['Kondensator', 'speichert Ladung'], ['Diode', 'nur eine Richtung'], ['Schalter', 'Kreis an/aus']] },
          { t: 'mc', q: 'In welcher Einheit gibt man Kondensatoren an?', o: ['Farad', 'Henry', 'Ohm', 'Watt'], a: 0, ex: 'Typisch sind 100 nF (zum Entstören) oder 100 µF (zum Puffern).' },
          { t: 'tf', q: 'Eine Diode lässt Strom in beide Richtungen fließen.', a: false },
          { t: 'mc', q: 'Welches Symbol ist das?', fig: { k: 'sym', s: 'bat' }, o: ['Batterie', 'Kondensator', 'Masse', 'Motor'], a: 0, ex: 'Langer Strich = Plus, kurzer dicker Strich = Minus.' },
        ]
      },
    ]
  },
  {
    title: 'Schaltungen', sub: 'Reihe, parallel, Spannungsteiler', color: '#a4d007', dark: '#5c7e10',
    lessons: [
      {
        id: 'u3l1', title: 'Reihe & parallel', ex: [
          { t: 'info', title: 'Hintereinander oder nebeneinander?', text: '**Reihenschaltung:** Bauteile hintereinander. Der Strom muss durch alle durch. Widerstände addieren sich: **R = R1 + R2**.\n\n**Parallelschaltung:** Bauteile nebeneinander. Der Strom kann sich aufteilen. Der Gesamtwiderstand wird **kleiner** als der kleinste Einzelne.', fig: { k: 'par', vals: ['R1', 'R2'], U: '9 V' }, tip: 'Zwei gleiche Widerstände parallel = halber Wert.' },
          { t: 'logic', q: 'Zwei Schalter **in Reihe**.', draw: 'series', goal: true, goalText: 'Bring die Lampe zum Leuchten 💡', ex: 'In Reihe müssen beide Schalter geschlossen sein – das ist ein UND.' },
          { t: 'logic', q: 'Zwei Schalter **parallel**. Schalter A klemmt.', draw: 'parallel', init: [0, 0], fix: [0, null], goal: true, goalText: 'Bring die Lampe trotzdem zum Leuchten', ex: 'Parallel reicht ein Weg – das ist ein ODER.' },
          { t: 'num', q: '100 Ω, 220 Ω und 330 Ω in Reihe. Gesamtwiderstand?', a: 650, unit: 'Ω', ex: '100 + 220 + 330 = 650 Ω' },
          { t: 'num', q: 'Zwei 100-Ω-Widerstände parallel. Gesamtwiderstand?', fig: { k: 'par', vals: ['100 Ω', '100 Ω'], U: '9 V' }, a: 50, unit: 'Ω', ex: 'Zwei gleiche parallel = die Hälfte: 50 Ω' },
          { t: 'num', q: '6 Ω parallel zu 3 Ω. Gesamtwiderstand? (R = R1·R2 / (R1+R2))', a: 2, unit: 'Ω', ex: '6·3 / (6+3) = 18 / 9 = 2 Ω' },
          { t: 'mc', q: 'Wie sind die Steckdosen bei dir zu Hause geschaltet?', o: ['Parallel', 'In Reihe'], a: 0, ex: 'Parallel: Jedes Gerät bekommt die vollen 230 V und funktioniert unabhängig.' },
        ]
      },
      {
        id: 'u3l2', title: 'Spannungsteiler', ex: [
          { t: 'info', title: 'Spannung aufteilen', text: 'Zwei Widerstände in Reihe teilen die Spannung im Verhältnis ihrer Werte auf.\n\n**U_aus = U_ein · R2 / (R1 + R2)**\n\nSo machen z. B. Sensoren wie Fotowiderstände aus einer Widerstandsänderung eine Spannung, die ein Mikrocontroller messen kann.', fig: { k: 'div', R1: '10 kΩ', R2: '10 kΩ', Uin: '9 V', Uout: '4,5 V' } },
          { t: 'num', q: 'U_ein = 12 V, R1 = R2 = 1 kΩ. Wie groß ist U_aus?', a: 6, unit: 'V', ex: 'Gleiche Widerstände → die Spannung halbiert sich: 6 V' },
          { t: 'num', q: 'U_ein = 9 V, R1 = 10 kΩ, R2 = 5 kΩ. Wie groß ist U_aus?', fig: { k: 'div', R1: '10 kΩ', R2: '5 kΩ', Uin: '9 V', Uout: '?' }, a: 3, unit: 'V', ex: '9 V · 5 / (10 + 5) = 3 V' },
          { t: 'slider', q: 'Stell R2 so ein, dass **3 V** rauskommen.', vis: 'div', min: 0.5, max: 30, step: 0.5, init: 20, ok: [2.8, 3.2], R1: 10, Uin: 9, sol: 'R2 ≈ 5 kΩ' },
          { t: 'tf', q: 'Wird R2 größer, steigt U_aus.', a: true, ex: 'R2 bekommt dann einen größeren Anteil der Spannung ab.' },
          { t: 'mc', q: 'Wofür nutzt man einen Spannungsteiler oft?', o: ['Sensorwerte in Spannung umwandeln', 'Batterien laden', 'Motoren antreiben', 'Strom speichern'], a: 0 },
        ]
      },
      {
        id: 'u3l3', title: 'Leistung', ex: [
          { t: 'info', title: 'P = U · I', text: '**Leistung** ist, wie viel Energie pro Sekunde umgesetzt wird – gemessen in **Watt (W)**.\n\n**P = U · I**\n\nIn Widerständen wird Leistung zu Wärme. Normale kleine Widerstände vertragen **0,25 W**. Wird es mehr, werden sie zu heiß.', tip: 'Kombiniert mit dem Ohmschen Gesetz: P = I² · R = U² / R' },
          { t: 'num', q: 'Ein Motor bekommt 5 V und zieht 0,2 A. Welche Leistung?', a: 1, unit: 'W', ex: 'P = 5 V · 0,2 A = 1 W' },
          { t: 'num', q: 'Eine 12-V-Lampe hat 24 W. Wie viel Strom zieht sie?', a: 2, unit: 'A', ex: 'I = P / U = 24 W / 12 V = 2 A' },
          { t: 'mc', q: '220 Ω an 5 V – reicht ein normaler 0,25-W-Widerstand?', o: ['Ja, es sind nur ca. 0,11 W', 'Nein, es sind ca. 1,1 W', 'Nein, es sind 5 W'], a: 0, ex: 'P = U² / R = 25 / 220 ≈ 0,11 W – passt locker.' },
          { t: 'match', q: 'Größe → Einheit', pairs: [['Leistung', 'Watt'], ['Spannung', 'Volt'], ['Strom', 'Ampere'], ['Widerstand', 'Ohm']] },
          { t: 'tf', q: 'Ein Widerstand mit zu viel Leistung wird heiß und kann verbrennen.', a: true },
        ]
      },
    ]
  },
  {
    title: 'Halbleiter', sub: 'Transistor & MOSFET als Schalter', color: '#c58bff', dark: '#8a52c9',
    lessons: [
      {
        id: 'u4l1', title: 'Transistor als Schalter', ex: [
          { t: 'info', title: 'Klein steuert Groß', text: 'Ein **Transistor** ist ein elektronischer Schalter ohne bewegliche Teile.\n\nBeim **NPN-Transistor** steuert ein kleiner Strom in die **Basis (B)** einen großen Strom vom **Kollektor (C)** zum **Emitter (E)**.\n\nSo kann ein Mikrocontroller-Pin mit wenigen Milliampere einen Motor oder viele LEDs schalten.', fig: { k: 'sym', s: 'npn' } },
          { t: 'mc', q: 'Was ist das für ein Bauteil?', fig: { k: 'sym', s: 'npn' }, o: ['NPN-Transistor', 'Diode', 'Kondensator', 'Motor'], a: 0, ex: 'Der Pfeil am Emitter zeigt nach außen → NPN.' },
          { t: 'match', q: 'Anschluss → Aufgabe', pairs: [['Basis', 'steuert'], ['Kollektor', 'großer Strom rein'], ['Emitter', 'großer Strom raus']] },
          { t: 'mc', q: 'Warum schaltet man einen Motor über einen Transistor statt direkt am Arduino-Pin?', o: ['Der Pin liefert nur ca. 20 mA', 'Der Motor braucht weniger Strom', 'Damit er rückwärts dreht', 'Weil der Pin 230 V hat'], a: 0, ex: 'Ein Arduino-Pin schafft etwa 20 mA (max. 40). Ein Motor will oft mehrere hundert mA.' },
          { t: 'tf', q: 'Fließt kein Strom in die Basis, ist der NPN-Transistor gesperrt (aus).', a: true },
          { t: 'mc', q: 'Was gehört zwischen Arduino-Pin und Basis?', o: ['Ein Basiswiderstand (z. B. 1 kΩ)', 'Nichts, direkt verbinden', 'Ein Kondensator', 'Eine LED'], a: 0, ex: 'Ohne Basiswiderstand fließt zu viel Strom in die Basis.' },
        ]
      },
      {
        id: 'u4l2', title: 'MOSFET & Freilaufdiode', ex: [
          { t: 'info', title: 'Der MOSFET', text: 'Ein **MOSFET** wird über **Spannung** am **Gate (G)** gesteuert, fast ohne Strom. Er schaltet große Ströme von **Drain (D)** nach **Source (S)** und wird dabei kaum warm.\n\nBei Motoren und Relais braucht man eine **Freilaufdiode**: Beim Abschalten erzeugt die Spule eine Spannungsspitze, die sonst den Transistor zerstört.', fig: { k: 'sym', s: 'mosfet' } },
          { t: 'match', q: 'MOSFET-Anschlüsse', pairs: [['G', 'Gate'], ['D', 'Drain'], ['S', 'Source']] },
          { t: 'mc', q: 'Womit wird ein MOSFET gesteuert?', o: ['Spannung am Gate', 'Strom in die Basis', 'Licht', 'Wärme'], a: 0 },
          { t: 'mc', q: 'Wozu dient die Freilaufdiode an einem Motor?', o: ['Fängt die Spannungsspitze beim Abschalten ab', 'Macht den Motor schneller', 'Lässt den Motor leuchten', 'Spart Strom'], a: 0 },
          { t: 'tf', q: 'Ein „Logic-Level“-MOSFET schaltet schon mit 5 V am Gate voll durch.', a: true, ex: 'Deshalb nimmt man für Arduino-Projekte Logic-Level-Typen.' },
          { t: 'order', q: 'Was passiert, wenn der Arduino den Motor einschaltet?', items: ['Pin geht auf HIGH', 'Gate bekommt 5 V', 'MOSFET leitet', 'Motor dreht'] },
        ]
      },
    ]
  },
  {
    title: 'Digitale Logik', sub: 'Binär, Gatter, Wahrheitstabellen', color: '#ff8a5c', dark: '#c45a2e',
    lessons: [
      {
        id: 'u5l1', title: 'Binärzahlen', ex: [
          { t: 'info', title: 'Nur 0 und 1', text: 'Computer kennen nur zwei Zustände: **0** (aus, 0 V) und **1** (an, z. B. 5 V). Ein Zustand heißt **Bit**, 8 Bit sind ein **Byte**.\n\nBinärzahlen liest man von rechts mit den Stellenwerten **1, 2, 4, 8, 16 …**\n\nBeispiel: **1011** = 8 + 0 + 2 + 1 = **11**', tip: 'Jede Stelle nach links ist doppelt so viel wert.' },
          { t: 'num', q: 'Welche Dezimalzahl ist **101**?', a: 5, unit: '', tol: 0, ex: '4 + 0 + 1 = 5' },
          { t: 'num', q: 'Welche Dezimalzahl ist **1111**?', a: 15, unit: '', tol: 0, ex: '8 + 4 + 2 + 1 = 15' },
          { t: 'mc', q: 'Wie schreibt man **10** binär?', o: ['1010', '1100', '0110', '1001'], a: 0, ex: '8 + 2 = 10 → 1010' },
          { t: 'match', q: 'Binär → Dezimal', pairs: [['10', '2'], ['11', '3'], ['100', '4'], ['111', '7']] },
          { t: 'mc', q: 'Wie viele Bit hat ein Byte?', o: ['8', '2', '10', '16'], a: 0 },
          { t: 'num', q: 'Welche größte Zahl passt in 8 Bit?', a: 255, unit: '', tol: 0, ex: '11111111 = 255. Deshalb geht analogWrite beim Arduino von 0 bis 255.' },
        ]
      },
      {
        id: 'u5l2', title: 'UND, ODER, NICHT', ex: [
          { t: 'info', title: 'Logikgatter', text: '**UND (AND, &):** Ausgang 1 nur, wenn **alle** Eingänge 1 sind.\n**ODER (OR, ≥1):** Ausgang 1, wenn **mindestens einer** 1 ist.\n**NICHT (NOT, 1 mit Kringel):** dreht um – aus 0 wird 1 und umgekehrt.', fig: { k: 'gate', g: 'AND', in: [1, 1] } },
          { t: 'logic', q: 'Ein **UND**-Gatter.', draw: 'AND', goal: true, goalText: 'Bring die LED am Ausgang zum Leuchten' },
          { t: 'logic', q: 'Ein **ODER**-Gatter.', draw: 'OR', init: [1, 1], goal: false, goalText: 'Schalte den Ausgang auf 0', ex: 'ODER ist nur 0, wenn beide Eingänge 0 sind.' },
          { t: 'logic', q: 'Ein **NICHT**-Gatter.', draw: 'NOT', init: [0], goal: false, goalText: 'Schalte den Ausgang auf 0' },
          { t: 'mc', q: 'Was kommt hier raus?', fig: { k: 'gate', g: 'OR', in: [1, 0], hide: true }, o: ['1', '0'], a: 0, ex: 'ODER: Einer reicht → 1' },
          { t: 'mc', q: 'Und hier?', fig: { k: 'gate', g: 'AND', in: [1, 0], hide: true }, o: ['0', '1'], a: 0, ex: 'UND braucht beide → 0' },
          { t: 'mc', q: 'Welches Gatter ist das?', fig: { k: 'gate', g: 'OR', in: [0, 0], hide: true }, o: ['ODER', 'UND', 'NICHT', 'XOR'], a: 0, ex: '≥1 heißt: mindestens ein Eingang muss 1 sein.' },
        ]
      },
      {
        id: 'u5l3', title: 'XOR & NAND', ex: [
          { t: 'info', title: 'Zwei Spezialisten', text: '**XOR (=1):** Ausgang 1, wenn die Eingänge **unterschiedlich** sind. Gut für „entweder – oder“.\n\n**NAND:** ein UND mit umgedrehtem Ausgang. Aus NAND-Gattern kann man **jede** andere Logik bauen – sogar ganze Prozessoren.', fig: { k: 'gate', g: 'XOR', in: [1, 0] } },
          { t: 'logic', q: 'Ein **XOR**-Gatter. A ist fest auf 1.', draw: 'XOR', init: [1, 1], fix: [1, null], goal: true, goalText: 'Bring die LED zum Leuchten' },
          { t: 'logic', q: 'Ein **NAND**-Gatter.', draw: 'NAND', goal: false, goalText: 'Schalte den Ausgang auf 0', ex: 'NAND ist nur 0, wenn beide Eingänge 1 sind.' },
          { t: 'mc', q: 'XOR mit A = 1 und B = 1 ergibt …', o: ['0', '1'], a: 0, ex: 'Gleiche Eingänge → 0' },
          { t: 'tf', q: 'Mit genug NAND-Gattern kann man jede andere Logikschaltung bauen.', a: true },
          { t: 'match', q: 'Gatter → Symbol', pairs: [['UND', '&'], ['ODER', '≥1'], ['XOR', '=1']] },
          { t: 'mc', q: 'Zwei Lichtschalter am Treppenhaus (unten & oben) – welche Logik?', o: ['XOR', 'UND', 'NAND', 'NICHT'], a: 0, ex: 'Jeder Schalter dreht den Zustand um – das ist XOR.' },
        ]
      },
    ]
  },
  {
    title: 'Mikrocontroller', sub: 'Arduino programmieren', color: '#2ee6c4', dark: '#16a58b',
    lessons: [
      {
        id: 'u6l1', title: 'Blinken!', ex: [
          { t: 'info', title: 'setup() und loop()', text: 'Jedes Arduino-Programm hat zwei Teile:\n\n**setup()** läuft einmal beim Start – hier stellst du Pins ein.\n**loop()** läuft danach endlos immer wieder.\n\n`pinMode(13, OUTPUT)` macht Pin 13 zum Ausgang. `digitalWrite(13, HIGH)` legt 5 V an, `LOW` 0 V. `delay(1000)` wartet 1000 ms = 1 s.' },
          { t: 'fill', q: 'Pin 13 soll eine LED steuern.', code: 'void setup() {\n  pinMode(13, ___);\n}', o: ['OUTPUT', 'INPUT', 'HIGH'], a: 0 },
          { t: 'fill', q: 'Schalte die LED ein.', code: 'void loop() {\n  digitalWrite(13, ___);  // LED an\n  delay(1000);\n  digitalWrite(13, LOW);   // LED aus\n  delay(1000);\n}', o: ['HIGH', 'LOW', 'OUTPUT'], a: 0 },
          { t: 'order', q: 'Bau die Blink-Schleife zusammen.', items: ['digitalWrite(13, HIGH);', 'delay(500);', 'digitalWrite(13, LOW);', 'delay(500);'], ex: 'An, warten, aus, warten – und loop() fängt von vorn an.' },
          { t: 'mc', q: 'Wie lange wartet `delay(250)`?', o: ['Eine Viertelsekunde', '250 Sekunden', '2,5 Sekunden', '25 Millisekunden'], a: 0, ex: 'delay rechnet in Millisekunden: 250 ms = 0,25 s' },
          { t: 'tf', q: 'Der Code in `setup()` wird immer wieder ausgeführt.', a: false, ex: 'setup() läuft nur einmal, loop() immer wieder.' },
          { t: 'mc', q: 'Welche Spannung liefert ein Uno-Pin bei `HIGH`?', o: ['5 V', '3,3 V', '12 V', '230 V'], a: 0 },
        ]
      },
      {
        id: 'u6l2', title: 'Taster & Sensoren lesen', ex: [
          { t: 'info', title: 'Eingänge', text: '`digitalRead(pin)` liest **HIGH** oder **LOW**.\n\nEin offener Eingang „schwebt“ und liefert Zufallswerte. Deshalb schaltet man mit `INPUT_PULLUP` einen internen Widerstand nach 5 V. Dann gilt: **nicht gedrückt = HIGH, gedrückt = LOW**.\n\n`analogRead(A0)` misst 0–5 V als Zahl von **0 bis 1023**.' },
          { t: 'fill', q: 'Ein Taster ohne externen Widerstand an Pin 2.', code: 'void setup() {\n  pinMode(2, ___);\n}', o: ['INPUT_PULLUP', 'OUTPUT', 'HIGH'], a: 0 },
          { t: 'mc', q: 'Mit `INPUT_PULLUP`: Was liest `digitalRead` bei **gedrücktem** Taster?', o: ['LOW', 'HIGH', 'Zufall'], a: 0, ex: 'Der Taster verbindet den Pin mit GND → LOW.' },
          { t: 'tf', q: 'Ein Eingang ohne Pull-up oder Pull-down kann zufällige Werte liefern.', a: true, ex: 'Man sagt: Der Eingang „floatet“.' },
          { t: 'mc', q: 'Welchen Wertebereich liefert `analogRead` beim Uno?', o: ['0 bis 1023', '0 bis 255', '0 bis 5', '0 bis 100'], a: 0, ex: '10 Bit Auflösung: 2¹⁰ = 1024 Stufen.' },
          { t: 'num', q: '`analogRead(A0)` liefert 512. Welche Spannung liegt ungefähr an? (5 V = 1023)', a: 2.5, unit: 'V', tol: 0.03, ex: '512 / 1023 · 5 V ≈ 2,5 V' },
        ]
      },
      {
        id: 'u6l3', title: 'PWM: dimmen & regeln', ex: [
          { t: 'info', title: 'Schnell an und aus', text: 'Ein Pin kann nur 0 oder 5 V. Schaltet man ihn aber **sehr schnell** an und aus, wirkt es wie eine Spannung dazwischen. Das heißt **PWM** (Pulsweitenmodulation).\n\nDer **Tastgrad** gibt an, wie viel Prozent der Zeit der Pin an ist. `analogWrite(9, 0…255)` stellt ihn ein.', fig: { k: 'pwm', d: 25 }, tip: 'Mit PWM dimmst du LEDs und regelst die Geschwindigkeit von Motoren.' },
          { t: 'slider', q: 'Stell die LED auf **halbe Helligkeit** (2,5 V im Mittel).', vis: 'pwm', min: 0, max: 100, step: 1, init: 90, ok: [48, 52], sol: '50 % Tastgrad' },
          { t: 'mc', q: 'Welcher Tastgrad ist hier zu sehen?', fig: { k: 'pwm', d: 75 }, o: ['75 %', '25 %', '50 %', '100 %'], a: 0 },
          { t: 'mc', q: '`analogWrite(9, 255)` bedeutet …', o: ['Dauerhaft an (100 %)', 'Halb an', 'Aus', 'Fehler'], a: 0 },
          { t: 'fill', q: 'Dimme die LED an Pin 9 auf halbe Helligkeit.', code: 'void loop() {\n  ___(9, 128);\n}', o: ['analogWrite', 'digitalWrite', 'analogRead'], a: 0 },
          { t: 'num', q: 'Wie viel Prozent sind ungefähr `analogWrite(9, 64)`?', a: 25, unit: '%', tol: 0.04, ex: '64 / 255 ≈ 0,25 = 25 %' },
        ]
      },
    ]
  },
  {
    title: 'Robotik', sub: 'Sensoren, Motoren, Regelung', color: '#ff6b9a', dark: '#c23b67',
    lessons: [
      {
        id: 'u7l1', title: 'Sensoren', ex: [
          { t: 'info', title: 'Die Sinne des Roboters', text: 'Ein Roboter arbeitet im Kreis: **Fühlen → Denken → Handeln**.\n\n**Ultraschall** misst Abstand per Echo. **Fotowiderstand (LDR)** misst Licht. **Infrarot-Sensoren** erkennen Linien am Boden. **Gyroskop/IMU** misst Drehung und Neigung. **Encoder** zählen Radumdrehungen.' },
          { t: 'match', q: 'Sensor → misst', pairs: [['Ultraschall', 'Abstand'], ['LDR', 'Helligkeit'], ['Gyroskop', 'Drehung'], ['Encoder', 'Radumdrehungen']] },
          { t: 'mc', q: 'Wie misst ein Ultraschallsensor den Abstand?', o: ['Er misst die Laufzeit eines Echos', 'Er misst die Helligkeit', 'Er wiegt das Hindernis', 'Per GPS'], a: 0 },
          { t: 'num', q: 'Das Echo kommt nach **1160 µs** zurück. Schall: 343 m/s = 0,0343 cm/µs. Wie weit ist das Hindernis?', a: 19.9, unit: 'cm', tol: 0.03, ex: 'Hin und zurück! 1160 · 0,0343 / 2 ≈ 19,9 cm' },
          { t: 'order', q: 'Bring den Roboter-Kreislauf in Ordnung.', items: ['Fühlen (Sensor lesen)', 'Denken (entscheiden)', 'Handeln (Motor ansteuern)'] },
          { t: 'mc', q: 'Ein Linienfolger-Roboter nutzt meistens …', o: ['Infrarot-Reflexsensoren', 'Mikrofone', 'Temperatursensoren', 'GPS'], a: 0, ex: 'Die schwarze Linie reflektiert weniger Infrarotlicht als der helle Boden.' },
        ]
      },
      {
        id: 'u7l2', title: 'Motoren & H-Brücke', ex: [
          { t: 'info', title: 'Drei Motor-Typen', text: '**Gleichstrommotor (DC):** dreht schnell und endlos – für Räder.\n**Servo:** fährt auf einen bestimmten **Winkel** (meist 0–180°) – für Greifer und Lenkung.\n**Schrittmotor:** dreht in exakten **Schritten** – für 3D-Drucker.\n\nUm einen DC-Motor **vor- und rückwärts** zu drehen, nutzt man eine **H-Brücke**: Vier Schalter drehen die Stromrichtung um.', fig: { k: 'hb', st: [1, 0, 0, 1] } },
          { t: 'match', q: 'Motor → typischer Einsatz', pairs: [['DC-Motor', 'Antriebsräder'], ['Servo', 'Greifarm-Winkel'], ['Schrittmotor', '3D-Drucker']] },
          { t: 'logic', q: 'Steuere die H-Brücke.', draw: 'hb', goal: 'fwd', goalText: 'Lass den Motor vorwärts drehen ↻', sol: 'S1 und S4 schließen', ex: 'Strom fließt von + über S1 durch den Motor und über S4 nach GND.' },
          { t: 'logic', q: 'Jetzt andersrum!', draw: 'hb', init: [1, 0, 0, 1], goal: 'rev', goalText: 'Lass den Motor rückwärts drehen ↺', sol: 'S3 und S2 schließen' },
          { t: 'tf', q: 'Schließt man S1 und S2 gleichzeitig, entsteht ein Kurzschluss.', a: true, ex: 'Beide Schalter auf derselben Seite verbinden + direkt mit GND. Gute H-Brücken-Chips verhindern das.' },
          { t: 'mc', q: 'Womit steuerst du die **Geschwindigkeit** eines DC-Motors am Arduino?', o: ['PWM über analogWrite', 'delay()', 'analogRead', 'Gar nicht möglich'], a: 0 },
        ]
      },
      {
        id: 'u7l3', title: 'Regelung mit PID', ex: [
          { t: 'info', title: 'Ziel erreichen ohne Wackeln', text: 'Ein **Regler** vergleicht ständig **Soll** (Ziel) und **Ist** (Sensor) und korrigiert den Motor.\n\n**P** reagiert auf den aktuellen Fehler – je weiter weg, desto stärker.\n**I** summiert alte Fehler und beseitigt Restabweichungen.\n**D** schaut auf die Änderung und bremst, bevor man übers Ziel schießt.', tip: 'Zu starkes P → der Roboter schwingt über das Ziel hinaus. Zu schwaches P → er kommt kaum hin.' },
          { t: 'slider', q: 'Stell **Kp** so ein, dass der Roboter schnell (unter 2,5 s) und ohne starkes Überschwingen (unter 10 %) sein Ziel erreicht.', vis: 'pid', min: 0.2, max: 8, step: 0.2, init: 0.4, sol: 'Kp ungefähr 1,6 bis 2,8' },
          { t: 'match', q: 'Anteil → Aufgabe', pairs: [['P', 'aktueller Fehler'], ['I', 'Summe alter Fehler'], ['D', 'Änderung bremsen']] },
          { t: 'mc', q: 'Der Roboter schießt immer übers Ziel hinaus und pendelt. Was hilft?', o: ['Kp verkleinern oder D erhöhen', 'Kp stark erhöhen', 'Sensor abschalten', 'Akku tauschen'], a: 0 },
          { t: 'mc', q: 'Wie nennt man den Unterschied zwischen Soll und Ist?', o: ['Fehler (Regelabweichung)', 'Tastgrad', 'Widerstand', 'Offset'], a: 0 },
          { t: 'order', q: 'Ein Durchlauf des Regelkreises:', items: ['Sensorwert messen', 'Fehler = Soll − Ist berechnen', 'Stellwert mit PID berechnen', 'Motor ansteuern'] },
          { t: 'tf', q: 'Ein balancierender Roboter auf zwei Rädern nutzt typischerweise einen PID-Regler.', a: true },
        ]
      },
    ]
  },
];

/* =========================================================
   Chapter tests: own questions per chapter (same order as UNITS).
   A test = these questions + random lesson exercises, 10 in total.
   Pass with 8 correct, no second tries.
   ========================================================= */
const QUIZZES = [
  [ // Understanding electricity
    { t: 'num', q: '3 V liegen an 150 Ω. Wie viel Strom fließt?', a: 20, unit: 'mA', ex: 'I = 3 V / 150 Ω = 0,02 A = 20 mA' },
    { t: 'mc', q: 'Du verdoppelst den Widerstand, die Spannung bleibt gleich. Was passiert mit dem Strom?', o: ['Er halbiert sich', 'Er verdoppelt sich', 'Er bleibt gleich', 'Er wird null'], a: 0, ex: 'I = U / R – doppeltes R, halber Strom.' },
    { t: 'num', q: 'Wie viele Milliampere sind 0,35 A?', a: 350, unit: 'mA', ex: '0,35 · 1000 = 350 mA' },
    { t: 'tf', q: 'Durch einen offenen Stromkreis fließt trotzdem ein kleiner Strom.', a: false, ex: 'Offen heißt unterbrochen – es fließt gar nichts.' },
    { t: 'num', q: 'Durch einen 1-kΩ-Widerstand fließen 9 mA. Welche Spannung liegt an?', a: 9, unit: 'V', ex: 'U = 1000 Ω · 0,009 A = 9 V' },
  ],
  [ // Components
    { t: 'color', q: 'Stell **470 Ω** ein.', v: 470 },
    { t: 'mc', q: 'Welchen Wert hat dieser Widerstand?', fig: { k: 'res', b: [1, 5, 3] }, o: ['15 kΩ', '1,5 kΩ', '150 kΩ', '153 Ω'], a: 0, ex: 'braun (1) · grün (5) · orange (3 Nullen) = 15 000 Ω' },
    { t: 'num', q: '9-V-Block, blaue LED (3 V), gewünscht 20 mA. Welcher Vorwiderstand?', a: 300, unit: 'Ω', ex: '(9 − 3) V / 0,02 A = 300 Ω' },
    { t: 'mc', q: 'Woran erkennst du die **Kathode** (−) einer LED?', o: ['Kürzeres Bein, abgeflachte Seite', 'Längeres Bein', 'Rote Farbe', 'Gar nicht'], a: 0 },
    { t: 'mc', q: '100 µF sind …', o: ['0,0001 F', '0,1 F', '0,001 F', '100 F'], a: 0, ex: 'Mikro = Millionstel: 100 / 1 000 000 = 0,0001 F' },
  ],
  [ // Circuits
    { t: 'num', q: 'Drei 330-Ω-Widerstände in Reihe. Gesamtwiderstand?', a: 990, unit: 'Ω', ex: '3 · 330 = 990 Ω' },
    { t: 'num', q: '200 Ω parallel zu 200 Ω. Gesamtwiderstand?', a: 100, unit: 'Ω', ex: 'Zwei gleiche parallel = die Hälfte.' },
    { t: 'slider', q: 'Stell R2 so ein, dass **6 V** rauskommen.', vis: 'div', min: 0.5, max: 30, step: 0.5, init: 2, ok: [5.8, 6.2], R1: 10, Uin: 9, sol: 'R2 ≈ 20 kΩ' },
    { t: 'num', q: '9 V und 0,5 A – welche Leistung?', a: 4.5, unit: 'W', ex: 'P = 9 V · 0,5 A = 4,5 W' },
    { t: 'mc', q: 'Du schaltest einen weiteren Widerstand **parallel** dazu. Der Gesamtwiderstand …', o: ['wird kleiner', 'wird größer', 'bleibt gleich'], a: 0, ex: 'Ein zusätzlicher Weg – der Strom kommt leichter durch.' },
  ],
  [ // Semiconductors
    { t: 'mc', q: 'Welches Bauteil ist das?', fig: { k: 'sym', s: 'mosfet' }, o: ['MOSFET', 'NPN-Transistor', 'Diode', 'Kondensator'], a: 0 },
    { t: 'tf', q: 'Ein Arduino-Pin kann einen 500-mA-Motor direkt antreiben.', a: false, ex: 'Ein Pin schafft nur ca. 20 mA – dafür braucht man einen Transistor oder MOSFET.' },
    { t: 'mc', q: 'Wie wird die Freilaufdiode angeschlossen?', o: ['Parallel zum Motor, in Sperrrichtung', 'In Reihe vor den Motor', 'Zwischen Gate und Source', 'Direkt an den Arduino-Pin'], a: 0 },
    { t: 'match', q: 'Bauteil → Steueranschluss', pairs: [['NPN-Transistor', 'Basis'], ['MOSFET', 'Gate'], ['Relais', 'Spule']] },
    { t: 'mc', q: 'Ein voll durchgeschalteter Transistor wirkt wie …', o: ['ein geschlossener Schalter', 'ein offener Schalter', 'ein Kondensator', 'eine Batterie'], a: 0 },
  ],
  [ // Digital logic
    { t: 'num', q: 'Welche Dezimalzahl ist **11001**?', a: 25, unit: '', tol: 0, ex: '16 + 8 + 0 + 0 + 1 = 25' },
    { t: 'logic', q: 'Ein **NOR**-Gatter (ODER mit umgedrehtem Ausgang).', draw: 'NOR', init: [1, 0], goal: true, goalText: 'Bring die LED zum Leuchten', ex: 'NOR ist nur 1, wenn beide Eingänge 0 sind.' },
    { t: 'mc', q: 'Was kommt hier raus?', fig: { k: 'gate', g: 'XOR', in: [1, 1], hide: true }, o: ['0', '1'], a: 0, ex: 'XOR: gleiche Eingänge → 0' },
    { t: 'mc', q: 'Wie schreibt man **7** binär?', o: ['111', '110', '101', '1110'], a: 0, ex: '4 + 2 + 1 = 7' },
    { t: 'tf', q: 'NICHT angewendet auf 1 ergibt 0.', a: true },
  ],
  [ // Microcontrollers
    { t: 'fill', q: 'Lies den Taster an Pin 2 ein.', code: 'int taster = ___(2);', o: ['digitalRead', 'analogRead', 'digitalWrite'], a: 0 },
    { t: 'fill', q: 'Warte eine halbe Sekunde.', code: 'delay(___);', o: ['500', '0.5', '50'], a: 0, ex: 'delay rechnet in Millisekunden.' },
    { t: 'mc', q: '`analogRead(A0)` liefert 1023. Welche Spannung liegt an?', o: ['5 V', '0 V', '2,5 V', '1023 V'], a: 0 },
    { t: 'num', q: 'Welcher `analogWrite`-Wert entspricht ungefähr **75 %**?', a: 191, unit: '', tol: 0.03, ex: '0,75 · 255 ≈ 191' },
    { t: 'order', q: 'So läuft ein Arduino-Programm ab:', items: ['Strom an oder Reset', 'setup() läuft einmal', 'loop() läuft', 'loop() läuft wieder und wieder'] },
  ],
  [ // Robotics
    { t: 'logic', q: 'Jemand hat S1 und S2 gleichzeitig geschlossen!', draw: 'hb', init: [1, 1, 0, 0], goal: 'stop', goalText: 'Beende den Kurzschluss – der Motor soll stillstehen', sol: 'S1 oder S2 öffnen, ohne S3/S4 passend dazu zu schließen' },
    { t: 'num', q: 'Das Echo kommt nach **580 µs** zurück (0,0343 cm/µs). Wie weit ist das Hindernis?', a: 9.9, unit: 'cm', tol: 0.03, ex: '580 · 0,0343 / 2 ≈ 9,9 cm' },
    { t: 'mc', q: 'Welcher Motor fährt präzise auf **90°**?', o: ['Servo', 'DC-Motor', 'Lüftermotor', 'Vibrationsmotor'], a: 0 },
    { t: 'mc', q: 'Der Roboter bleibt immer ein Stück **vor** dem Ziel stehen. Welcher Anteil hilft?', o: ['I-Anteil', 'D-Anteil', 'P verkleinern', 'Keiner'], a: 0, ex: 'Der I-Anteil summiert die Restabweichung auf und schiebt nach.' },
    { t: 'tf', q: 'Ein Encoder misst, wie weit sich ein Rad gedreht hat.', a: true },
  ],
];
UNITS.forEach((u, i) => { u.quiz = QUIZZES[i]; });
