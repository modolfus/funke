/* English content for Funke. Same structure, ids and answer indices as lessons.js. */
const UNITS_EN = [
  {
    title: 'Understanding electricity', sub: 'Voltage, current, resistance', color: '#e8c547', dark: '#9c7f12',
    lessons: [
      {
        id: 'u1l1', title: 'What is electricity?', ex: [
          { t: 'info', title: 'Electricity is like water', text: 'Think of wires as water pipes.\n\n**Voltage (U)** is the pressure that pushes the water – measured in **volts (V)**.\n**Current (I)** is how much water flows per second – measured in **amperes (A)**.\n**Resistance (R)** is a narrow section in the pipe – measured in **ohms (Ω)**.', tip: 'Remember: voltage pushes, current flows, resistance slows.' },
          { t: 'mc', q: 'Which unit measures **voltage**?', o: ['Volt', 'Ampere', 'Ohm', 'Watt'], a: 0, ex: 'Voltage U is measured in volts (V) – e.g. 1.5 V for an AA battery.' },
          { t: 'match', q: 'Match each quantity to its unit.', pairs: [['Voltage', 'Volt'], ['Current', 'Ampere'], ['Resistance', 'Ohm']] },
          { t: 'mc', q: 'In the water analogy: what is the **resistance**?', o: ['A narrow section of pipe', 'The water pressure', 'The amount of water per second', 'The water tank'], a: 0 },
          { t: 'tf', q: 'The larger the resistance, the **more** current flows (at the same voltage).', a: false, ex: 'The opposite: a larger resistance slows things down more, so less current flows.' },
          { t: 'mc', q: 'Which symbol stands for **current**?', o: ['I', 'U', 'R', 'S'], a: 0, ex: 'I comes from the French “intensité”. U for voltage, R for resistance.' },
          { t: 'mc', q: 'How much is **20 mA** in amperes?', o: ['0.02 A', '0.2 A', '2 A', '20 A'], a: 0, ex: 'Milli means thousandth: 20 mA = 20 / 1000 A = 0.02 A.' },
        ]
      },
      {
        id: 'u1l2', title: 'The circuit', ex: [
          { t: 'info', title: 'Always in a loop', text: 'Current only flows when the path is **closed**: from the battery’s plus terminal through the components and back to minus.\n\nAn open switch breaks the loop – then nothing flows at all.', fig: { k: 'loop', parts: [{ k: 'sw', closed: true, lab: 'Switch' }, { k: 'lamp', on: 1, side: 'r', lab: 'Lamp' }], U: '9 V', live: true } },
          { t: 'tf', q: 'The lamp in this circuit is lit.', a: false, fig: { k: 'loop', parts: [{ k: 'sw', closed: false, lab: 'Switch' }, { k: 'lamp', side: 'r' }], U: '9 V' }, ex: 'The switch is open – the loop is broken, so no current flows.' },
          { t: 'mc', q: 'What happened here?', fig: { k: 'loop', parts: [], U: '9 V' }, o: ['A short circuit', 'An open circuit', 'A series circuit', 'Everything is fine'], a: 0, ex: 'Plus and minus are connected directly without resistance. A huge current flows – battery and wire get hot!' },
          { t: 'order', q: 'Follow the current (conventional direction) around the loop.', items: ['Battery plus terminal', 'Switch', 'Lamp', 'Battery minus terminal'], ex: 'Conventional current flows from plus to minus.' },
          { t: 'logic', q: 'Close the circuit.', draw: 'series', init: [0, 1], fix: [null, 1], goal: true, goalText: 'Make the lamp light up 💡' },
          { t: 'mc', q: 'Why is a short circuit dangerous?', o: ['Huge current flows, parts get hot', 'The voltage disappears forever', 'No current flows at all', 'The lamp gets extra bright'], a: 0 },
        ]
      },
      {
        id: 'u1l3', title: 'Ohm’s law', ex: [
          { t: 'info', title: 'U = R · I', text: 'The most important law in electronics:\n\n**Voltage = resistance × current**\n\nCover the quantity you’re looking for in the triangle and you see the formula: U = R·I, I = U/R, R = U/I.', fig: 'ohm', tip: 'Always calculate in base units: volts, amperes, ohms. 20 mA = 0.02 A.' },
          { t: 'mc', q: 'You know **U** and **R**. How do you calculate the current?', fig: 'ohm', o: ['I = U / R', 'I = U · R', 'I = R / U', 'I = U − R'], a: 0 },
          { t: 'num', q: '0.02 A flows through 220 Ω. What is the voltage?', a: 4.4, unit: 'V', ex: 'U = R · I = 220 Ω · 0.02 A = 4.4 V' },
          { t: 'num', q: '9 V across 450 Ω. How much current flows?', a: 20, unit: 'mA', ex: 'I = U / R = 9 V / 450 Ω = 0.02 A = 20 mA' },
          { t: 'num', q: 'A lamp draws exactly 0.5 A at 12 V. What is its resistance?', a: 24, unit: 'Ω', ex: 'R = U / I = 12 V / 0.5 A = 24 Ω' },
          { t: 'tf', q: 'If you double the voltage across a resistor, the current doubles too.', a: true, ex: 'I = U / R – with the same R, I grows exactly with U.' },
          { t: 'num', q: '5 V across 1 kΩ (= 1000 Ω). How much current flows?', a: 5, unit: 'mA', ex: 'I = 5 V / 1000 Ω = 0.005 A = 5 mA' },
        ]
      },
    ]
  },
  {
    title: 'Components', sub: 'Resistor, LED, capacitor', color: '#66c0f4', dark: '#2f7fb0',
    lessons: [
      {
        id: 'u2l1', title: 'Reading the color code', ex: [
          { t: 'info', title: 'Bands instead of numbers', text: 'Resistors are too small for printed values – so they use **color bands**.\n\n1st band = first digit, 2nd band = second digit, 3rd band = number of zeros. The gold band (±5 % tolerance) goes at the end.\n\nblack 0 · brown 1 · red 2 · orange 3 · yellow 4 · green 5 · blue 6 · violet 7 · grey 8 · white 9', fig: { k: 'res', b: [1, 0, 2] }, tip: 'Example above: brown (1) · black (0) · red (2 zeros) = 1000 Ω = 1 kΩ' },
          { t: 'mc', q: 'What is the value of this resistor?', fig: { k: 'res', b: [2, 2, 1] }, o: ['220 Ω', '22 Ω', '2.2 kΩ', '222 Ω'], a: 0, ex: 'red (2) · red (2) · brown (1 zero) = 220 Ω' },
          { t: 'color', q: 'Set **220 Ω**.', v: 220 },
          { t: 'mc', q: 'And this one?', fig: { k: 'res', b: [4, 7, 2] }, o: ['4.7 kΩ', '470 Ω', '47 kΩ', '47 Ω'], a: 0, ex: 'yellow (4) · violet (7) · red (2 zeros) = 4700 Ω = 4.7 kΩ' },
          { t: 'color', q: 'Set **10 kΩ**.', v: 10000 },
          { t: 'match', q: 'Color → digit', pairs: [['brown', '1'], ['red', '2'], ['yellow', '4'], ['blue', '6']] },
        ]
      },
      {
        id: 'u2l2', title: 'Wiring LEDs correctly', ex: [
          { t: 'info', title: 'The LED', text: 'An **LED** (light-emitting diode) only lights up in **one** direction: the long leg (**anode, +**) goes towards plus.\n\nAn LED drops about **2 V** (red) to **3 V** (blue/white). It needs about **10–20 mA** – and always a **series resistor**, otherwise it burns out.', fig: { k: 'loop', parts: [{ k: 'res', lab: 'Resistor' }, { k: 'led', on: 1, lab: 'LED' }], U: '5 V', live: true } },
          { t: 'mc', q: 'Which LED leg goes to **plus**?', o: ['The long one (anode)', 'The short one (cathode)', 'Doesn’t matter'], a: 0, ex: 'Long = anode = plus. You can also spot the cathode by the flat edge.' },
          { t: 'slider', q: 'Find a series resistor so that **10–20 mA** flow through the LED.', vis: 'led', min: 30, max: 1000, step: 10, init: 1000, ok: [10, 20], U: 5, Uf: 2, sol: 'About 150 to 300 Ω', ex: 'R = (5 V − 2 V) / I. At 15 mA: 3 V / 0.015 A = 200 Ω.' },
          { t: 'num', q: '5 V supply, red LED (2 V), target 15 mA. Which series resistor?', a: 200, unit: 'Ω', ex: '5 − 2 = 3 V remain across the resistor. R = 3 V / 0.015 A = 200 Ω' },
          { t: 'tf', q: 'You can connect an LED directly to 5 V without a resistor.', a: false, ex: 'Without a resistor nothing limits the current – the LED burns out.' },
          { t: 'mc', q: 'What component is this?', fig: { k: 'sym', s: 'led' }, o: ['LED', 'Capacitor', 'Resistor', 'Battery'], a: 0, ex: 'Triangle with a bar = diode, the two arrows = light comes out.' },
        ]
      },
      {
        id: 'u2l3', title: 'Capacitor & diode', ex: [
          { t: 'info', title: 'Storing and blocking', text: 'A **capacitor** briefly stores electric charge – like a small water tank. It smooths voltage and buffers spikes. Unit: **farad (F)**, usually µF or nF.\n\nA **diode** is a one-way valve: current may only flow in the direction of the arrow.', fig: { k: 'sym', s: 'cap' } },
          { t: 'mc', q: 'What component is this?', fig: { k: 'sym', s: 'cap' }, o: ['Capacitor', 'Resistor', 'Diode', 'Battery'], a: 0 },
          { t: 'mc', q: 'And this?', fig: { k: 'sym', s: 'diode' }, o: ['Diode', 'LED', 'Switch', 'Lamp'], a: 0, ex: 'Like the LED, just without the light arrows.' },
          { t: 'match', q: 'Component → job', pairs: [['Resistor', 'limits current'], ['Capacitor', 'stores charge'], ['Diode', 'one direction only'], ['Switch', 'loop on/off']] },
          { t: 'mc', q: 'Which unit is used for capacitors?', o: ['Farad', 'Henry', 'Ohm', 'Watt'], a: 0, ex: 'Typical values are 100 nF (decoupling) or 100 µF (buffering).' },
          { t: 'tf', q: 'A diode lets current flow in both directions.', a: false },
          { t: 'mc', q: 'Which symbol is this?', fig: { k: 'sym', s: 'bat' }, o: ['Battery', 'Capacitor', 'Ground', 'Motor'], a: 0, ex: 'Long line = plus, short thick line = minus.' },
        ]
      },
    ]
  },
  {
    title: 'Circuits', sub: 'Series, parallel, voltage divider', color: '#a4d007', dark: '#5c7e10',
    lessons: [
      {
        id: 'u3l1', title: 'Series & parallel', ex: [
          { t: 'info', title: 'One after another or side by side?', text: '**Series circuit:** components one after another. The current has to pass through all of them. Resistances add up: **R = R1 + R2**.\n\n**Parallel circuit:** components side by side. The current can split. The total resistance becomes **smaller** than the smallest single one.', fig: { k: 'par', vals: ['R1', 'R2'], U: '9 V' }, tip: 'Two equal resistors in parallel = half the value.' },
          { t: 'logic', q: 'Two switches **in series**.', draw: 'series', goal: true, goalText: 'Make the lamp light up 💡', ex: 'In series both switches must be closed – that’s an AND.' },
          { t: 'logic', q: 'Two switches **in parallel**. Switch A is stuck.', draw: 'parallel', init: [0, 0], fix: [0, null], goal: true, goalText: 'Make the lamp light up anyway', ex: 'In parallel one path is enough – that’s an OR.' },
          { t: 'num', q: '100 Ω, 220 Ω and 330 Ω in series. Total resistance?', a: 650, unit: 'Ω', ex: '100 + 220 + 330 = 650 Ω' },
          { t: 'num', q: 'Two 100 Ω resistors in parallel. Total resistance?', fig: { k: 'par', vals: ['100 Ω', '100 Ω'], U: '9 V' }, a: 50, unit: 'Ω', ex: 'Two equal ones in parallel = half: 50 Ω' },
          { t: 'num', q: '6 Ω in parallel with 3 Ω. Total resistance? (R = R1·R2 / (R1+R2))', a: 2, unit: 'Ω', ex: '6·3 / (6+3) = 18 / 9 = 2 Ω' },
          { t: 'mc', q: 'How are the wall sockets in your home wired?', o: ['In parallel', 'In series'], a: 0, ex: 'Parallel: every device gets the full mains voltage and works independently.' },
        ]
      },
      {
        id: 'u3l2', title: 'Voltage divider', ex: [
          { t: 'info', title: 'Splitting voltage', text: 'Two resistors in series split the voltage according to their values.\n\n**U_out = U_in · R2 / (R1 + R2)**\n\nThat’s how sensors like light-dependent resistors turn a change in resistance into a voltage that a microcontroller can measure.', fig: { k: 'div', R1: '10 kΩ', R2: '10 kΩ', Uin: '9 V', Uout: '4.5 V' } },
          { t: 'num', q: 'U_in = 12 V, R1 = R2 = 1 kΩ. What is U_out?', a: 6, unit: 'V', ex: 'Equal resistors → the voltage is halved: 6 V' },
          { t: 'num', q: 'U_in = 9 V, R1 = 10 kΩ, R2 = 5 kΩ. What is U_out?', fig: { k: 'div', R1: '10 kΩ', R2: '5 kΩ', Uin: '9 V', Uout: '?' }, a: 3, unit: 'V', ex: '9 V · 5 / (10 + 5) = 3 V' },
          { t: 'slider', q: 'Set R2 so that **3 V** come out.', vis: 'div', min: 0.5, max: 30, step: 0.5, init: 20, ok: [2.8, 3.2], R1: 10, Uin: 9, sol: 'R2 ≈ 5 kΩ' },
          { t: 'tf', q: 'If R2 gets larger, U_out rises.', a: true, ex: 'R2 then gets a larger share of the voltage.' },
          { t: 'mc', q: 'What is a voltage divider often used for?', o: ['Turning sensor values into a voltage', 'Charging batteries', 'Driving motors', 'Storing current'], a: 0 },
        ]
      },
      {
        id: 'u3l3', title: 'Power', ex: [
          { t: 'info', title: 'P = U · I', text: '**Power** is how much energy is converted per second – measured in **watts (W)**.\n\n**P = U · I**\n\nIn resistors power turns into heat. Ordinary small resistors handle **0.25 W**. More than that and they get too hot.', tip: 'Combined with Ohm’s law: P = I² · R = U² / R' },
          { t: 'num', q: 'A motor gets 5 V and draws 0.2 A. What power?', a: 1, unit: 'W', ex: 'P = 5 V · 0.2 A = 1 W' },
          { t: 'num', q: 'A 12 V lamp is rated 24 W. How much current does it draw?', a: 2, unit: 'A', ex: 'I = P / U = 24 W / 12 V = 2 A' },
          { t: 'mc', q: '220 Ω at 5 V – is a normal 0.25 W resistor enough?', o: ['Yes, it’s only about 0.11 W', 'No, it’s about 1.1 W', 'No, it’s 5 W'], a: 0, ex: 'P = U² / R = 25 / 220 ≈ 0.11 W – easily fine.' },
          { t: 'match', q: 'Quantity → unit', pairs: [['Power', 'Watt'], ['Voltage', 'Volt'], ['Current', 'Ampere'], ['Resistance', 'Ohm']] },
          { t: 'tf', q: 'A resistor with too much power gets hot and can burn.', a: true },
        ]
      },
    ]
  },
  {
    title: 'Semiconductors', sub: 'Transistor & MOSFET as switches', color: '#c58bff', dark: '#8a52c9',
    lessons: [
      {
        id: 'u4l1', title: 'Transistor as a switch', ex: [
          { t: 'info', title: 'Small controls big', text: 'A **transistor** is an electronic switch with no moving parts.\n\nIn an **NPN transistor** a small current into the **base (B)** controls a large current from the **collector (C)** to the **emitter (E)**.\n\nThat’s how a microcontroller pin with a few milliamps can switch a motor or lots of LEDs.', fig: { k: 'sym', s: 'npn' } },
          { t: 'mc', q: 'What component is this?', fig: { k: 'sym', s: 'npn' }, o: ['NPN transistor', 'Diode', 'Capacitor', 'Motor'], a: 0, ex: 'The arrow on the emitter points outwards → NPN.' },
          { t: 'match', q: 'Pin → job', pairs: [['Base', 'controls'], ['Collector', 'big current in'], ['Emitter', 'big current out']] },
          { t: 'mc', q: 'Why switch a motor through a transistor instead of directly from an Arduino pin?', o: ['The pin only supplies about 20 mA', 'The motor needs less current', 'So it spins backwards', 'Because the pin has mains voltage'], a: 0, ex: 'An Arduino pin manages about 20 mA (max. 40). A motor often wants several hundred mA.' },
          { t: 'tf', q: 'If no current flows into the base, the NPN transistor is off.', a: true },
          { t: 'mc', q: 'What belongs between the Arduino pin and the base?', o: ['A base resistor (e.g. 1 kΩ)', 'Nothing, connect directly', 'A capacitor', 'An LED'], a: 0, ex: 'Without a base resistor too much current flows into the base.' },
        ]
      },
      {
        id: 'u4l2', title: 'MOSFET & flyback diode', ex: [
          { t: 'info', title: 'The MOSFET', text: 'A **MOSFET** is controlled by **voltage** at the **gate (G)**, with almost no current. It switches large currents from **drain (D)** to **source (S)** and barely gets warm.\n\nMotors and relays need a **flyback diode**: when switched off, the coil produces a voltage spike that would otherwise destroy the transistor.', fig: { k: 'sym', s: 'mosfet' } },
          { t: 'match', q: 'MOSFET pins', pairs: [['G', 'Gate'], ['D', 'Drain'], ['S', 'Source']] },
          { t: 'mc', q: 'What controls a MOSFET?', o: ['Voltage at the gate', 'Current into the base', 'Light', 'Heat'], a: 0 },
          { t: 'mc', q: 'What is the flyback diode on a motor for?', o: ['It absorbs the voltage spike at switch-off', 'It makes the motor faster', 'It makes the motor glow', 'It saves power'], a: 0 },
          { t: 'tf', q: 'A “logic-level” MOSFET switches fully on with just 5 V at the gate.', a: true, ex: 'That’s why logic-level types are used for Arduino projects.' },
          { t: 'order', q: 'What happens when the Arduino switches the motor on?', items: ['Pin goes HIGH', 'Gate gets 5 V', 'MOSFET conducts', 'Motor spins'] },
        ]
      },
    ]
  },
  {
    title: 'Digital logic', sub: 'Binary, gates, truth tables', color: '#ff8a5c', dark: '#c45a2e',
    lessons: [
      {
        id: 'u5l1', title: 'Binary numbers', ex: [
          { t: 'info', title: 'Only 0 and 1', text: 'Computers only know two states: **0** (off, 0 V) and **1** (on, e.g. 5 V). One state is a **bit**, 8 bits make a **byte**.\n\nRead binary numbers from the right with the place values **1, 2, 4, 8, 16 …**\n\nExample: **1011** = 8 + 0 + 2 + 1 = **11**', tip: 'Each place to the left is worth twice as much.' },
          { t: 'num', q: 'Which decimal number is **101**?', a: 5, unit: '', tol: 0, ex: '4 + 0 + 1 = 5' },
          { t: 'num', q: 'Which decimal number is **1111**?', a: 15, unit: '', tol: 0, ex: '8 + 4 + 2 + 1 = 15' },
          { t: 'mc', q: 'How do you write **10** in binary?', o: ['1010', '1100', '0110', '1001'], a: 0, ex: '8 + 2 = 10 → 1010' },
          { t: 'match', q: 'Binary → decimal', pairs: [['10', '2'], ['11', '3'], ['100', '4'], ['111', '7']] },
          { t: 'mc', q: 'How many bits are in a byte?', o: ['8', '2', '10', '16'], a: 0 },
          { t: 'num', q: 'What is the largest number that fits in 8 bits?', a: 255, unit: '', tol: 0, ex: '11111111 = 255. That’s why Arduino’s analogWrite goes from 0 to 255.' },
        ]
      },
      {
        id: 'u5l2', title: 'AND, OR, NOT', ex: [
          { t: 'info', title: 'Logic gates', text: '**AND (&):** output 1 only if **all** inputs are 1.\n**OR (≥1):** output 1 if **at least one** is 1.\n**NOT (1 with a bubble):** flips it – 0 becomes 1 and vice versa.', fig: { k: 'gate', g: 'AND', in: [1, 1] } },
          { t: 'logic', q: 'An **AND** gate.', draw: 'AND', goal: true, goalText: 'Light up the LED at the output' },
          { t: 'logic', q: 'An **OR** gate.', draw: 'OR', init: [1, 1], goal: false, goalText: 'Set the output to 0', ex: 'OR is only 0 when both inputs are 0.' },
          { t: 'logic', q: 'A **NOT** gate.', draw: 'NOT', init: [0], goal: false, goalText: 'Set the output to 0' },
          { t: 'mc', q: 'What comes out here?', fig: { k: 'gate', g: 'OR', in: [1, 0], hide: true }, o: ['1', '0'], a: 0, ex: 'OR: one is enough → 1' },
          { t: 'mc', q: 'And here?', fig: { k: 'gate', g: 'AND', in: [1, 0], hide: true }, o: ['0', '1'], a: 0, ex: 'AND needs both → 0' },
          { t: 'mc', q: 'Which gate is this?', fig: { k: 'gate', g: 'OR', in: [0, 0], hide: true }, o: ['OR', 'AND', 'NOT', 'XOR'], a: 0, ex: '≥1 means: at least one input must be 1.' },
        ]
      },
      {
        id: 'u5l3', title: 'XOR & NAND', ex: [
          { t: 'info', title: 'Two specialists', text: '**XOR (=1):** output 1 when the inputs are **different**. Great for “either – or”.\n\n**NAND:** an AND with an inverted output. With NAND gates you can build **any** other logic – even whole processors.', fig: { k: 'gate', g: 'XOR', in: [1, 0] } },
          { t: 'logic', q: 'An **XOR** gate. A is fixed at 1.', draw: 'XOR', init: [1, 1], fix: [1, null], goal: true, goalText: 'Light up the LED' },
          { t: 'logic', q: 'A **NAND** gate.', draw: 'NAND', goal: false, goalText: 'Set the output to 0', ex: 'NAND is only 0 when both inputs are 1.' },
          { t: 'mc', q: 'XOR with A = 1 and B = 1 gives …', o: ['0', '1'], a: 0, ex: 'Equal inputs → 0' },
          { t: 'tf', q: 'With enough NAND gates you can build any other logic circuit.', a: true },
          { t: 'match', q: 'Gate → symbol', pairs: [['AND', '&'], ['OR', '≥1'], ['XOR', '=1']] },
          { t: 'mc', q: 'Two light switches on a staircase (bottom & top) – which logic?', o: ['XOR', 'AND', 'NAND', 'NOT'], a: 0, ex: 'Each switch flips the state – that’s XOR.' },
        ]
      },
    ]
  },
  {
    title: 'Microcontrollers', sub: 'Programming Arduino', color: '#2ee6c4', dark: '#16a58b',
    lessons: [
      {
        id: 'u6l1', title: 'Blink!', ex: [
          { t: 'info', title: 'setup() and loop()', text: 'Every Arduino program has two parts:\n\n**setup()** runs once at start-up – this is where you configure pins.\n**loop()** then runs over and over forever.\n\n`pinMode(13, OUTPUT)` makes pin 13 an output. `digitalWrite(13, HIGH)` applies 5 V, `LOW` 0 V. `delay(1000)` waits 1000 ms = 1 s.' },
          { t: 'fill', q: 'Pin 13 should drive an LED.', code: 'void setup() {\n  pinMode(13, ___);\n}', o: ['OUTPUT', 'INPUT', 'HIGH'], a: 0 },
          { t: 'fill', q: 'Turn the LED on.', code: 'void loop() {\n  digitalWrite(13, ___);  // LED on\n  delay(1000);\n  digitalWrite(13, LOW);   // LED off\n  delay(1000);\n}', o: ['HIGH', 'LOW', 'OUTPUT'], a: 0 },
          { t: 'order', q: 'Build the blink loop.', items: ['digitalWrite(13, HIGH);', 'delay(500);', 'digitalWrite(13, LOW);', 'delay(500);'], ex: 'On, wait, off, wait – and loop() starts over.' },
          { t: 'mc', q: 'How long does `delay(250)` wait?', o: ['A quarter of a second', '250 seconds', '2.5 seconds', '25 milliseconds'], a: 0, ex: 'delay counts in milliseconds: 250 ms = 0.25 s' },
          { t: 'tf', q: 'The code in `setup()` runs again and again.', a: false, ex: 'setup() runs only once, loop() again and again.' },
          { t: 'mc', q: 'What voltage does an Uno pin output at `HIGH`?', o: ['5 V', '3.3 V', '12 V', '230 V'], a: 0 },
        ]
      },
      {
        id: 'u6l2', title: 'Reading buttons & sensors', ex: [
          { t: 'info', title: 'Inputs', text: '`digitalRead(pin)` reads **HIGH** or **LOW**.\n\nAn unconnected input “floats” and returns random values. That’s why `INPUT_PULLUP` connects an internal resistor to 5 V. Then: **not pressed = HIGH, pressed = LOW**.\n\n`analogRead(A0)` measures 0–5 V as a number from **0 to 1023**.' },
          { t: 'fill', q: 'A button on pin 2 without an external resistor.', code: 'void setup() {\n  pinMode(2, ___);\n}', o: ['INPUT_PULLUP', 'OUTPUT', 'HIGH'], a: 0 },
          { t: 'mc', q: 'With `INPUT_PULLUP`: what does `digitalRead` return when the button is **pressed**?', o: ['LOW', 'HIGH', 'Random'], a: 0, ex: 'The button connects the pin to GND → LOW.' },
          { t: 'tf', q: 'An input without a pull-up or pull-down can return random values.', a: true, ex: 'We say the input is “floating”.' },
          { t: 'mc', q: 'What range does `analogRead` return on an Uno?', o: ['0 to 1023', '0 to 255', '0 to 5', '0 to 100'], a: 0, ex: '10-bit resolution: 2¹⁰ = 1024 steps.' },
          { t: 'num', q: '`analogRead(A0)` returns 512. Roughly what voltage is present? (5 V = 1023)', a: 2.5, unit: 'V', tol: 0.03, ex: '512 / 1023 · 5 V ≈ 2.5 V' },
        ]
      },
      {
        id: 'u6l3', title: 'PWM: dimming & speed', ex: [
          { t: 'info', title: 'Fast on and off', text: 'A pin can only do 0 or 5 V. But if you switch it on and off **very fast**, it acts like a voltage in between. That’s called **PWM** (pulse-width modulation).\n\nThe **duty cycle** says what percentage of the time the pin is on. `analogWrite(9, 0…255)` sets it.', fig: { k: 'pwm', d: 25 }, tip: 'With PWM you dim LEDs and control motor speed.' },
          { t: 'slider', q: 'Set the LED to **half brightness** (2.5 V on average).', vis: 'pwm', min: 0, max: 100, step: 1, init: 90, ok: [48, 52], sol: '50 % duty cycle' },
          { t: 'mc', q: 'Which duty cycle is shown here?', fig: { k: 'pwm', d: 75 }, o: ['75 %', '25 %', '50 %', '100 %'], a: 0 },
          { t: 'mc', q: '`analogWrite(9, 255)` means …', o: ['Always on (100 %)', 'Half on', 'Off', 'Error'], a: 0 },
          { t: 'fill', q: 'Dim the LED on pin 9 to half brightness.', code: 'void loop() {\n  ___(9, 128);\n}', o: ['analogWrite', 'digitalWrite', 'analogRead'], a: 0 },
          { t: 'num', q: 'Roughly what percentage is `analogWrite(9, 64)`?', a: 25, unit: '%', tol: 0.04, ex: '64 / 255 ≈ 0.25 = 25 %' },
        ]
      },
    ]
  },
  {
    title: 'Robotics', sub: 'Sensors, motors, control', color: '#ff6b9a', dark: '#c23b67',
    lessons: [
      {
        id: 'u7l1', title: 'Sensors', ex: [
          { t: 'info', title: 'The robot’s senses', text: 'A robot works in a loop: **sense → think → act**.\n\n**Ultrasound** measures distance by echo. A **light-dependent resistor (LDR)** measures light. **Infrared sensors** detect lines on the floor. A **gyroscope/IMU** measures rotation and tilt. **Encoders** count wheel turns.' },
          { t: 'match', q: 'Sensor → measures', pairs: [['Ultrasound', 'Distance'], ['LDR', 'Brightness'], ['Gyroscope', 'Rotation'], ['Encoder', 'Wheel turns']] },
          { t: 'mc', q: 'How does an ultrasonic sensor measure distance?', o: ['It measures how long an echo takes', 'It measures brightness', 'It weighs the obstacle', 'Via GPS'], a: 0 },
          { t: 'num', q: 'The echo returns after **1160 µs**. Sound: 343 m/s = 0.0343 cm/µs. How far is the obstacle?', a: 19.9, unit: 'cm', tol: 0.03, ex: 'There and back! 1160 · 0.0343 / 2 ≈ 19.9 cm' },
          { t: 'order', q: 'Put the robot loop in order.', items: ['Sense (read sensor)', 'Think (decide)', 'Act (drive motor)'] },
          { t: 'mc', q: 'A line-following robot usually uses …', o: ['Infrared reflection sensors', 'Microphones', 'Temperature sensors', 'GPS'], a: 0, ex: 'The black line reflects less infrared light than the bright floor.' },
        ]
      },
      {
        id: 'u7l2', title: 'Motors & H-bridge', ex: [
          { t: 'info', title: 'Three motor types', text: '**DC motor:** spins fast and endlessly – for wheels.\n**Servo:** moves to a specific **angle** (usually 0–180°) – for grippers and steering.\n**Stepper motor:** turns in exact **steps** – for 3D printers.\n\nTo spin a DC motor **forwards and backwards** you use an **H-bridge**: four switches reverse the direction of the current.', fig: { k: 'hb', st: [1, 0, 0, 1] } },
          { t: 'match', q: 'Motor → typical use', pairs: [['DC motor', 'Drive wheels'], ['Servo', 'Gripper angle'], ['Stepper', '3D printer']] },
          { t: 'logic', q: 'Control the H-bridge.', draw: 'hb', goal: 'fwd', goalText: 'Make the motor spin forward ↻', sol: 'Close S1 and S4', ex: 'Current flows from + through S1, through the motor and via S4 to GND.' },
          { t: 'logic', q: 'Now the other way round!', draw: 'hb', init: [1, 0, 0, 1], goal: 'rev', goalText: 'Make the motor spin backward ↺', sol: 'Close S3 and S2' },
          { t: 'tf', q: 'Closing S1 and S2 at the same time creates a short circuit.', a: true, ex: 'Both switches on the same side connect + directly to GND. Good H-bridge chips prevent that.' },
          { t: 'mc', q: 'How do you control the **speed** of a DC motor with an Arduino?', o: ['PWM via analogWrite', 'delay()', 'analogRead', 'Not possible'], a: 0 },
        ]
      },
      {
        id: 'u7l3', title: 'PID control', ex: [
          { t: 'info', title: 'Reach the target without wobbling', text: 'A **controller** constantly compares the **setpoint** (target) with the **actual value** (sensor) and corrects the motor.\n\n**P** reacts to the current error – the further away, the stronger.\n**I** adds up past errors and removes remaining offsets.\n**D** looks at the rate of change and brakes before you overshoot.', tip: 'Too much P → the robot overshoots the target. Too little P → it barely gets there.' },
          { t: 'slider', q: 'Set **Kp** so the robot reaches its target quickly (under 2.5 s) without much overshoot (under 10 %).', vis: 'pid', min: 0.2, max: 8, step: 0.2, init: 0.4, sol: 'Kp roughly 1.6 to 2.8' },
          { t: 'match', q: 'Term → job', pairs: [['P', 'current error'], ['I', 'sum of past errors'], ['D', 'brake on change']] },
          { t: 'mc', q: 'The robot always overshoots and swings back and forth. What helps?', o: ['Lower Kp or raise D', 'Raise Kp a lot', 'Turn off the sensor', 'Swap the battery'], a: 0 },
          { t: 'mc', q: 'What do you call the difference between setpoint and actual value?', o: ['Error', 'Duty cycle', 'Resistance', 'Offset'], a: 0 },
          { t: 'order', q: 'One pass through the control loop:', items: ['Measure sensor value', 'Error = setpoint − actual', 'Compute output with PID', 'Drive motor'] },
          { t: 'tf', q: 'A self-balancing two-wheeled robot typically uses a PID controller.', a: true },
        ]
      },
    ]
  },
];

const QUIZZES_EN = [
  [
    { t: 'num', q: '3 V across 150 Ω. How much current flows?', a: 20, unit: 'mA', ex: 'I = 3 V / 150 Ω = 0.02 A = 20 mA' },
    { t: 'mc', q: 'You double the resistance, the voltage stays the same. What happens to the current?', o: ['It halves', 'It doubles', 'It stays the same', 'It becomes zero'], a: 0, ex: 'I = U / R – double R, half the current.' },
    { t: 'num', q: 'How many milliamps are 0.35 A?', a: 350, unit: 'mA', ex: '0.35 · 1000 = 350 mA' },
    { t: 'tf', q: 'A small current still flows through an open circuit.', a: false, ex: 'Open means broken – nothing flows.' },
    { t: 'num', q: '9 mA flow through a 1 kΩ resistor. What voltage is across it?', a: 9, unit: 'V', ex: 'U = 1000 Ω · 0.009 A = 9 V' },
  ],
  [
    { t: 'color', q: 'Set **470 Ω**.', v: 470 },
    { t: 'mc', q: 'What is the value of this resistor?', fig: { k: 'res', b: [1, 5, 3] }, o: ['15 kΩ', '1.5 kΩ', '150 kΩ', '153 Ω'], a: 0, ex: 'brown (1) · green (5) · orange (3 zeros) = 15,000 Ω' },
    { t: 'num', q: '9 V battery, blue LED (3 V), target 20 mA. Which series resistor?', a: 300, unit: 'Ω', ex: '(9 − 3) V / 0.02 A = 300 Ω' },
    { t: 'mc', q: 'How do you recognise the **cathode** (−) of an LED?', o: ['Shorter leg, flat edge', 'Longer leg', 'Red color', 'You can’t'], a: 0 },
    { t: 'mc', q: '100 µF is …', o: ['0.0001 F', '0.1 F', '0.001 F', '100 F'], a: 0, ex: 'Micro = millionth: 100 / 1,000,000 = 0.0001 F' },
  ],
  [
    { t: 'num', q: 'Three 330 Ω resistors in series. Total resistance?', a: 990, unit: 'Ω', ex: '3 · 330 = 990 Ω' },
    { t: 'num', q: '200 Ω in parallel with 200 Ω. Total resistance?', a: 100, unit: 'Ω', ex: 'Two equal ones in parallel = half.' },
    { t: 'slider', q: 'Set R2 so that **6 V** come out.', vis: 'div', min: 0.5, max: 30, step: 0.5, init: 2, ok: [5.8, 6.2], R1: 10, Uin: 9, sol: 'R2 ≈ 20 kΩ' },
    { t: 'num', q: '9 V and 0.5 A – what power?', a: 4.5, unit: 'W', ex: 'P = 9 V · 0.5 A = 4.5 W' },
    { t: 'mc', q: 'You add another resistor **in parallel**. The total resistance …', o: ['gets smaller', 'gets larger', 'stays the same'], a: 0, ex: 'An extra path – current gets through more easily.' },
  ],
  [
    { t: 'mc', q: 'What component is this?', fig: { k: 'sym', s: 'mosfet' }, o: ['MOSFET', 'NPN transistor', 'Diode', 'Capacitor'], a: 0 },
    { t: 'tf', q: 'An Arduino pin can drive a 500 mA motor directly.', a: false, ex: 'A pin only manages about 20 mA – you need a transistor or MOSFET.' },
    { t: 'mc', q: 'How is the flyback diode connected?', o: ['Parallel to the motor, reverse-biased', 'In series before the motor', 'Between gate and source', 'Directly to the Arduino pin'], a: 0 },
    { t: 'match', q: 'Component → control pin', pairs: [['NPN transistor', 'Base'], ['MOSFET', 'Gate'], ['Relay', 'Coil']] },
    { t: 'mc', q: 'A fully switched-on transistor acts like …', o: ['a closed switch', 'an open switch', 'a capacitor', 'a battery'], a: 0 },
  ],
  [
    { t: 'num', q: 'Which decimal number is **11001**?', a: 25, unit: '', tol: 0, ex: '16 + 8 + 0 + 0 + 1 = 25' },
    { t: 'logic', q: 'A **NOR** gate (OR with inverted output).', draw: 'NOR', init: [1, 0], goal: true, goalText: 'Light up the LED', ex: 'NOR is only 1 when both inputs are 0.' },
    { t: 'mc', q: 'What comes out here?', fig: { k: 'gate', g: 'XOR', in: [1, 1], hide: true }, o: ['0', '1'], a: 0, ex: 'XOR: equal inputs → 0' },
    { t: 'mc', q: 'How do you write **7** in binary?', o: ['111', '110', '101', '1110'], a: 0, ex: '4 + 2 + 1 = 7' },
    { t: 'tf', q: 'NOT applied to 1 gives 0.', a: true },
  ],
  [
    { t: 'fill', q: 'Read the button on pin 2.', code: 'int button = ___(2);', o: ['digitalRead', 'analogRead', 'digitalWrite'], a: 0 },
    { t: 'fill', q: 'Wait half a second.', code: 'delay(___);', o: ['500', '0.5', '50'], a: 0, ex: 'delay counts in milliseconds.' },
    { t: 'mc', q: '`analogRead(A0)` returns 1023. What voltage is present?', o: ['5 V', '0 V', '2.5 V', '1023 V'], a: 0 },
    { t: 'num', q: 'Which `analogWrite` value is roughly **75 %**?', a: 191, unit: '', tol: 0.03, ex: '0.75 · 255 ≈ 191' },
    { t: 'order', q: 'This is how an Arduino program runs:', items: ['Power on or reset', 'setup() runs once', 'loop() runs', 'loop() runs again and again'] },
  ],
  [
    { t: 'logic', q: 'Someone closed S1 and S2 at the same time!', draw: 'hb', init: [1, 1, 0, 0], goal: 'stop', goalText: 'End the short circuit – the motor should stand still', sol: 'Open S1 or S2 without closing the matching S3/S4' },
    { t: 'num', q: 'The echo returns after **580 µs** (0.0343 cm/µs). How far is the obstacle?', a: 9.9, unit: 'cm', tol: 0.03, ex: '580 · 0.0343 / 2 ≈ 9.9 cm' },
    { t: 'mc', q: 'Which motor moves precisely to **90°**?', o: ['Servo', 'DC motor', 'Fan motor', 'Vibration motor'], a: 0 },
    { t: 'mc', q: 'The robot always stops a bit **short** of the target. Which term helps?', o: ['I term', 'D term', 'Lower P', 'None'], a: 0, ex: 'The I term adds up the remaining error and pushes further.' },
    { t: 'tf', q: 'An encoder measures how far a wheel has turned.', a: true },
  ],
];
UNITS_EN.forEach((u, i) => { u.quiz = QUIZZES_EN[i]; });
