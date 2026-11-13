/* The current session plus the program and progress snapshot.
   The coach rewrites this file for every new session (see CLAUDE.md, Workflow A). */
window.ATHLETES = [
  { id: 'ali', name: 'Ali' },
  { id: 'aamna', name: 'Aamna' }
];

window.SESSION = {
  id: '2026-11-13_W1S4m',
  week: 1, num: 4,
  date: '2026-11-13', dateLabel: 'Fri 13 Nov 2026',
  title: 'Machine Day',
  type: 'Together', template: 'Machines · full body', phase: 'Phase 1 · Re-Entry',
  minutes: 50, rpe: '6',
  brief: 'Same goals, your way: a full-body session on machines. Machines are quick to set up and easy to adjust, and you can push them safely. On every machine, pick a weight where 12 reps leave 3–4 in the tank.',
  jobs: ['Legs: leg press + leg curl', 'Pull: pulldown + row', 'Push: chest + shoulder press', 'Arm pump to finish'],
  note: 'Machine weights differ between gyms, so the first set on each machine is a feeler set. Write down the pin or the plates: that’s your number to beat next time.',
  warmup: {
    minutes: 7,
    cardio: '5 min easy bike, side by side.',
    items: [
      { ex: 'band-pull-apart', dose: '× 15' },
      { ex: 'bodyweight-squat', dose: '× 10' },
      { ex: 'glute-bridge', dose: '× 10' },
      { ex: 'worlds-greatest-stretch', dose: '2 / side' }
    ]
  },
  blocks: [
    {
      id: 'A', format: 'Swap Stations', rounds: 3, minutes: 10, rest: 60,
      how: 'One of you on the leg press, the other on the lat pulldown, then swap. Rest about 60 s after each round.',
      items: [
        { code: 'A1', ex: 'leg-press', sets: 3, reps: '12', rpe: '6', unit: 'kg (plates or pin)',
          start: { ali: '50' }, past: { ali: 'Predrag days: 55 kg × 10, then 45 kg × 15' },
          tip: { aamna: 'Feeler set light: a weight you could press about 20 times. Then adjust' } },
        { code: 'A2', ex: 'lat-pulldown', sets: 3, reps: '12', rpe: '6', unit: 'kg',
          start: { ali: '35' }, past: { ali: 'Predrag days: 45 kg × 12 × 4' },
          tip: { aamna: 'A weight you could pull about 15 times. Hold the bar at your chest for 1 s' } }
      ]
    },
    {
      id: 'B', format: 'Swap Stations', rounds: 3, minutes: 10, rest: 60,
      how: 'Chest press and seated row, then swap. Rest about 60 s.',
      items: [
        { code: 'B1', ex: 'chest-press-machine', sets: 3, reps: '12', rpe: '6', unit: 'kg (pin)',
          past: { ali: 'Predrag days: bench 40 kg' },
          tip: { ali: 'Feeler set first, then adjust', aamna: 'Feeler set light, then adjust' } },
        { code: 'B2', ex: 'cable-row', sets: 3, reps: '12', rpe: '6', unit: 'kg',
          start: { ali: '35' }, past: { ali: 'Predrag days: 45 kg × 12 × 3' },
          tip: { aamna: 'A weight you could pull about 15 times. Chest tall, no rocking' } }
      ]
    },
    {
      id: 'C', format: 'Swap Stations', rounds: 3, minutes: 10, rest: 60,
      how: 'Shoulder press and leg curl, then swap. Rest about 60 s.',
      items: [
        { code: 'C1', ex: 'shoulder-press-machine', sets: 3, reps: '12', rpe: '6', unit: 'kg (pin)',
          tip: { ali: 'Feeler set first. Back flat on the pad', aamna: 'Light feeler set, back flat on the pad' } },
        { code: 'C2', ex: 'leg-curl', sets: 3, reps: '12', rpe: '6', unit: 'kg (pin)',
          tip: { ali: 'Squeeze 1 s at the bottom, lower slowly', aamna: 'Squeeze 1 s at the bottom, lower slowly' } }
      ]
    },
    {
      id: 'D', format: 'Swap Stations', rounds: 2, minutes: 6, rest: 45,
      how: 'Arm pump. One on curls, one on pushdowns, then swap. If there’s only one cable station, take turns.',
      items: [
        { code: 'D1', ex: 'cable-curl', sets: 2, reps: '15', rpe: '7', unit: 'kg',
          tip: { ali: 'Elbows pinned, squeeze at the top', aamna: 'Elbows pinned, squeeze at the top' } },
        { code: 'D2', ex: 'triceps-pushdown', sets: 2, reps: '15', rpe: '7', unit: 'kg',
          past: { ali: 'Predrag days: pushdown 11 kg' } }
      ]
    }
  ],
  finisher: {
    type: 'intervals', name: 'Bike Finish', ex: 'bike', rpe: '7',
    sets: 1, rounds: 6, setRest: 0,
    segments: [
      { label: 'Push', secs: 30 },
      { label: 'Easy', secs: 30, rest: true }
    ],
    how: 'Side by side on two bikes: 30 s hard pedalling, 30 s easy, 6 times. The app beeps at every switch.',
    pace: 'Raise the resistance for the hard parts. Hard but steady, not a sprint.',
    alt: 'Optional if you’re short on time.'
  },
  cooldown: {
    minutes: 4,
    items: [
      { ex: 'chest-stretch', dose: '30 s / side' },
      { ex: 'childs-pose', dose: '45 s' },
      { ex: 'hip-flexor-stretch', dose: '30 s / side' }
    ],
    extra: 'That wraps up Week 1.'
  },
  planB: 'Short on time (35 min): warm-up, Blocks A and B (3 rounds each), then Block D. Skip Block C and the bike.',
  swaps: [
    ['Leg press', 'Hack squat or Smith machine squat 3 × 12'],
    ['Lat pulldown', 'Assisted pull-up machine'],
    ['Chest press machine', 'Pec deck (fly machine) or DB bench press'],
    ['Seated cable row', 'Chest-supported row machine'],
    ['Shoulder press machine', 'Seated DB shoulder press'],
    ['Leg curl', 'Lying leg curl'],
    ['Cable curl', 'DB curl'],
    ['Triceps pushdown', 'Triceps dip machine']
  ],
  after: [
    'Write down the pin or plates for every machine. That’s your number to beat next time.',
    'Ali: 3 sessions this week, so the Week 1 target is hit.',
    'Send the coach your report (the "Build my report" button at the bottom).'
  ],
  next: 'Week 2 (from Mon 16 Nov) will be built around machines plus a few dumbbell moves, at RPE 7.'
};

/* Earlier sessions, kept so an unsent report can still be built from logs saved on the phone. */
window.PAST_SESSIONS = [
  {
    id: '2026-11-13_W1S4', week: 1, num: 4, type: 'Together', dateLabel: 'Fri 13 Nov 2026', title: 'Tag Team (switched to machines)',
    warmup: { items: [1, 2, 3, 4, 5, 6] },
    cooldown: { items: [1, 2, 3] },
    blocks: [
      { items: [{ code: 'A1', ex: 'med-ball-chest-pass', sets: 3, reps: '8 throws each', unit: 'kg ball' }] },
      { items: [
        { code: 'B1', ex: 'reverse-lunge', sets: 3, reps: '8 / side', unit: 'kg (each DB, blank = bodyweight)' },
        { code: 'B2', ex: 'push-up', sets: 3, reps: '8–12', unit: 'pick your version', noWeight: true, variants: ['Floor', 'Feet on a bench (harder)', 'Hands on a bench', 'Hands on a Smith bar', 'Knees'] }
      ] },
      { items: [
        { code: 'C1', ex: 'kb-swing', sets: 3, reps: '12', unit: 'kg' },
        { code: 'C2', ex: 'landmine-rotation', sets: 3, reps: '8 / side', unit: 'kg added (blank = bar only)' }
      ] }
    ],
    finisher: { type: 'relay', name: 'Tag Team Relay', legs: 10, leg: '1 round' }
  },
  {
    id: '2026-11-10_W1S3_aamna', week: 1, num: 3, type: 'Solo · Aamna', athletes: ['aamna'], dateLabel: 'Tue 10 Nov 2026', title: 'Solo Strong',
    warmup: { items: [1, 2, 3, 4, 5] },
    cooldown: { items: [1, 2, 3] },
    blocks: [
      { items: [
        { code: 'A1', ex: 'goblet-squat', sets: 3, reps: '10', unit: 'kg' },
        { code: 'A2', ex: 'cable-row', sets: 3, reps: '12', unit: 'kg' }
      ] },
      { items: [
        { code: 'B1', ex: 'step-up', sets: 3, reps: '8 / side', unit: 'kg (each DB, blank = bodyweight)' },
        { code: 'B2', ex: 'push-up', sets: 3, reps: '8–10', unit: 'pick your height', noWeight: true, variants: ['Hands on a bench', 'Hands on a Smith bar (higher = easier)', 'Knees on the floor', 'Full push-up'] }
      ] },
      { items: [
        { code: 'C1', ex: 'pallof-press', sets: 2, reps: '10 / side', unit: 'kg' },
        { code: 'C2', ex: 'farmer-carry', sets: 2, reps: '30–40 m', unit: 'kg per hand' }
      ] }
    ],
    finisher: { type: 'intervals', name: 'Row Strong', sets: 1, rounds: 6 }
  },
  {
    id: '2026-11-08_W1S2', week: 1, num: 2, type: 'Together', dateLabel: 'Sun 8 Nov 2026', title: 'Round Two',
    warmup: { items: [1, 2, 3, 4, 5, 6] },
    cooldown: { items: [1, 2, 3] },
    blocks: [
      { items: [
        { code: 'A1', ex: 'back-extension', sets: 3, reps: '12', unit: 'kg plate at chest (blank = bodyweight)' },
        { code: 'A2', ex: 'pull-up', sets: 3, reps: '5–6', unit: 'kg assistance (blank = strict)', variants: ['Assisted machine', 'Band-assisted', 'Strict', 'Slow negatives (3–5 s down)'] }
      ] },
      { items: [
        { code: 'B1', ex: 'half-kneeling-press', sets: 3, reps: '8 / side', unit: 'kg' },
        { code: 'B2', ex: 'face-pull', sets: 3, reps: '15', unit: 'kg' }
      ] },
      { items: [
        { code: 'C1', ex: 'landmine-rotation', sets: 2, reps: '8 / side', unit: 'kg added (blank = bar only)' },
        { code: 'C2', ex: 'farmer-carry', sets: 2, reps: '30 m / side', unit: 'kg', variants: ['Suitcase (one hand)', 'Farmer (two hands)'] },
        { code: 'C3', ex: 'side-plank', sets: 2, reps: '20–30 s / side', unit: 'hold', noWeight: true }
      ] }
    ],
    finisher: { type: 'intervals', name: 'Predrag Rounds', sets: 2, rounds: 3 }
  },
  {
    id: '2026-11-07_W1S1', week: 1, num: 1, type: 'Together', dateLabel: 'Sat 7 Nov 2026', title: 'We’re Back',
    warmup: { items: [1, 2, 3, 4, 5, 6, 7] },
    cooldown: { items: [1, 2, 3] },
    blocks: [
      { items: [
        { code: 'A1', ex: 'goblet-squat', sets: 3, reps: '10', unit: 'kg' },
        { code: 'A2', ex: 'db-row', sets: 3, reps: '10 / side', unit: 'kg' }
      ] },
      { items: [
        { code: 'B1', ex: 'db-rdl', sets: 3, reps: '10', unit: 'kg (each DB)' },
        { code: 'B2', ex: 'db-bench', sets: 3, reps: '10', unit: 'kg (each DB)', variants: ['DB bench', 'Incline push-up', 'Push-up'] }
      ] },
      { items: [
        { code: 'C1', ex: 'lat-pulldown', sets: 2, reps: '12', unit: 'kg' },
        { code: 'C2', ex: 'reverse-lunge', sets: 2, reps: '6 / side', unit: 'kg (blank = bodyweight)' },
        { code: 'C3', ex: 'farmer-carry', sets: 2, reps: '30–40 m', unit: 'kg per hand' }
      ] }
    ],
    finisher: { type: 'relay', name: 'Comeback Relay', legs: 8, leg: '250 m' }
  }
];

window.PLAN = {
  currentWeek: 1,
  weeks: [
    { w: 1, dates: '7–15 Nov', phase: 'reentry', note: 'Kickoff · RPE 6' },
    { w: 2, dates: '16–22 Nov', phase: 'reentry', note: 'RPE 7 · benchmarks' },
    { w: 3, dates: '23–29 Nov', phase: 'reentry', note: 'RPE 7–8 · barbells back' },
    { w: 4, dates: '30 Nov–6 Dec', phase: 'build' },
    { w: 5, dates: '7–13 Dec', phase: 'build' },
    { w: 6, dates: '14–20 Dec', phase: 'build' },
    { w: 7, dates: '21–27 Dec', phase: 'build', note: 'Re-test' },
    { w: 8, dates: '28 Dec–3 Jan', phase: 'deload', note: 'New Year' },
    { w: 9, dates: '4–10 Jan', phase: 'power' },
    { w: 10, dates: '11–17 Jan', phase: 'power' },
    { w: 11, dates: '18–24 Jan', phase: 'power', note: 'Heavier' },
    { w: 12, dates: '25–31 Jan', phase: 'power' },
    { w: 13, dates: '1–7 Feb', phase: 'test', note: 'Final tests' }
  ],
  phases: {
    reentry: { name: 'Re-Entry', weeks: '1–3', feel: 'Easier than you want. Technique, baselines, rebuilding your joints’ tolerance.', rx: '3 × 8–10 at RPE 6 → 7 → 7–8. No failure.' },
    build: { name: 'Build', weeks: '4–7', feel: 'Weights go up every week. Barbells are back. Intervals get spicy.', rx: '4 × 6–8 at RPE 7–8, adding load.' },
    deload: { name: 'Deload', weeks: '8', feel: 'Half the volume over New Year. Recharge and come back hungry.', rx: 'Half the sets, ~90% of the load.' },
    power: { name: 'Strength & Power', weeks: '9–12', feel: 'Heavy 5 × 5s, jumps, throws and partner workouts.', rx: '5 × 5 → 5 × 3–5 at RPE 8.' },
    test: { name: 'Test & Celebrate', weeks: '13', feel: 'Benchmarks against Week 2, photos, then we plan the next block.', rx: 'Tests plus an easy week.' }
  },
  targets: { ali: '3–4 sessions / week', aamna: '2–3 sessions / week', min: 'Minimum 2 each, every week' }
};

window.PROGRESS = {
  updated: '2026-11-13',
  sessions: { ali: 2, aamna: 2, together: 2 },
  streakWeeks: { ali: 0, aamna: 0 },
  prs: { ali: 0, aamna: 0 },
  history: 'Ali\u2019s Predrag notes (Dec 2021 to Dec 2022) are saved. Marks to beat: 5 strict pull-ups, lat pulldown 45 kg × 12.',
  nextMilestone: 'Today: Ali\u2019s 3rd session of the week hits the Week 1 target. Aamna\u2019s Tuesday solo session is still to be confirmed'
};
