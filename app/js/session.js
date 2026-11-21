/* The current session plus the program and progress snapshot.
   The coach rewrites this file for every new session (see CLAUDE.md, Workflow A). */
window.ATHLETES = [
  { id: 'ali', name: 'Ali' },
  { id: 'aamna', name: 'Aamna' }
];

window.SESSION = {
  id: '2026-11-21_W2S1',
  week: 2, num: 1,
  date: '2026-11-21', dateLabel: 'Sat 21 Nov 2026',
  title: 'Shoulders & Back',
  type: 'Together', template: 'Upper body · machines & cables', phase: 'Phase 1 · Re-Entry',
  minutes: 50, rpe: '7',
  brief: 'No legs today. Shoulders get paired with back, because pressing and pulling in the same session keeps your shoulders healthy and builds the V-shape. Ali, Predrag ran back-and-shoulder days the same way. Then an arm pump, a little "bar left right", and boxing to finish.',
  jobs: ['Press: shoulder machine + side raises', 'Pull: pulldown + row', 'Rear shoulders and arms pump', 'Box it out'],
  note: 'Week 2 effort is RPE 7: stop each set with about 3 reps left. If this is your first session since Fri 13 Nov, keep it at RPE 6 today (about 4 left).',
  warmup: {
    minutes: 7,
    cardio: '5 min easy incline walk or cross-trainer, side by side.',
    items: [
      { ex: 'band-pull-apart', dose: '× 15' },
      { ex: 'cat-cow', dose: '× 6' },
      { ex: 'inchworm', dose: '× 4' },
      { ex: 'dead-bug', dose: '5 / side' }
    ]
  },
  blocks: [
    {
      id: 'A', format: 'Swap Stations', rounds: 3, minutes: 10, rest: 75,
      how: 'One of you on the shoulder press, the other on the lat pulldown, then swap. Rest about 60–90 s.',
      note: 'Before the first working set of each, do one light set of 10 to warm up the joint.',
      items: [
        { code: 'A1', ex: 'shoulder-press-machine', sets: 3, reps: '10', rpe: '7', unit: 'kg (pin)',
          past: { ali: 'Predrag days: barbell press ~30 kg × 4 sets' },
          tip: { ali: 'Start at your Machine Day (13 Nov) weight. If 12 reps felt easy then, go one pin up', aamna: 'Start at your Machine Day (13 Nov) weight. If 12 reps felt easy then, go one pin up' } },
        { code: 'A2', ex: 'lat-pulldown', sets: 3, reps: '10', rpe: '7', unit: 'kg',
          start: { ali: '40' }, past: { ali: 'Predrag days: 45 kg × 12 × 4' },
          tip: { aamna: 'Machine Day weight, or one pin up. Hold the bar at your chest for 1 s' } }
      ]
    },
    {
      id: 'B', format: 'Swap Stations', rounds: 3, minutes: 10, rest: 60,
      how: 'Seated row and lateral raises, then swap. Rest about 60 s.',
      items: [
        { code: 'B1', ex: 'cable-row', sets: 3, reps: '10', rpe: '7', unit: 'kg',
          start: { ali: '40' }, past: { ali: 'Predrag days: 45 kg × 12 × 3' },
          tip: { aamna: 'Machine Day weight, or one pin up. Chest tall, no rocking' } },
        { code: 'B2', ex: 'lateral-raise', sets: 3, reps: '12–15', rpe: '7', unit: 'kg (each DB)',
          start: { ali: '6' }, past: { ali: 'Predrag days: 4 kg × 15, elbows up' },
          tip: { aamna: 'Start with 2–4 kg. Lead with your elbows, stop at shoulder height' } }
      ]
    },
    {
      id: 'C', format: 'Circuit', rounds: 2, minutes: 9, rest: 45,
      how: 'Face pull → cable curl → triceps pushdown, then rest about 45 s. All three are on the cable, so take turns: while one works, the other rests.',
      items: [
        { code: 'C1', ex: 'face-pull', sets: 2, reps: '15', rpe: '7', unit: 'kg',
          tip: { ali: 'Light and strict: the back of your shoulders does the work', aamna: 'Light and strict: the back of your shoulders does the work' } },
        { code: 'C2', ex: 'cable-curl', sets: 2, reps: '12', rpe: '7', unit: 'kg',
          tip: { ali: 'Elbows pinned, squeeze at the top', aamna: 'Elbows pinned, squeeze at the top' } },
        { code: 'C3', ex: 'triceps-pushdown', sets: 2, reps: '12', rpe: '7', unit: 'kg',
          past: { ali: 'Predrag days: pushdown 11 kg' } }
      ]
    },
    {
      id: 'D', format: 'Core', rounds: 2, minutes: 4, rest: 30,
      how: 'Take turns on the landmine.',
      items: [
        { code: 'D1', ex: 'landmine-rotation', sets: 2, reps: '8 / side', rpe: '6', unit: 'kg added (blank = bar only)',
          past: { ali: 'Predrag days: 30 → 20 → 10 kg drop set' },
          tip: { ali: 'Your favourite. Smooth, controlled arcs', aamna: 'Bar only. Pivot your back foot' } }
      ]
    }
  ],
  finisher: {
    type: 'intervals', name: 'Predrag Rounds', ex: 'shadow-boxing', rpe: '7',
    sets: 2, rounds: 3, setRest: 60,
    segments: [
      { label: 'Jab–cross', secs: 20 },
      { label: 'Uppercuts', secs: 20 },
      { label: 'Hooks', secs: 20 },
      { label: 'Rest', secs: 10, rest: true }
    ],
    how: 'Upper-body cardio, no leg work: shadow-box side by side. Two high beeps mean punch, one low beep means rest.',
    pace: 'Fast hands, light feet, breathe out on every punch.',
    alt: 'Shoulders cooked? Do 1 set instead of 2.'
  },
  cooldown: {
    minutes: 4,
    items: [
      { ex: 'chest-stretch', dose: '30 s / side' },
      { ex: 'childs-pose', dose: '45 s, reach to each side' }
    ],
    extra: 'Then 5 slow breaths.'
  },
  planB: 'Short on time (35 min): warm-up, Blocks A and B (3 rounds each), then 1 set of Predrag Rounds. Skip C and D.',
  swaps: [
    ['Shoulder press machine', 'Seated DB shoulder press'],
    ['Lat pulldown', 'Assisted pull-up machine'],
    ['Seated cable row', 'Chest-supported row machine, or 1-arm DB row'],
    ['Lateral raise (DB)', 'Cable lateral raise, or the lateral raise machine'],
    ['Face pull', 'Rear-delt fly machine (reverse pec deck)'],
    ['Cable curl', 'DB curl'],
    ['Triceps pushdown', 'Triceps dip machine'],
    ['Bar left right', 'Pallof press']
  ],
  after: [
    'Write down the pin or weight for every exercise. That’s your number to beat next time.',
    'Send the coach your report (Build my report). No lifts are logged yet, so your first PRs are waiting.',
    'Next session: legs are fresh, so make it a lower-body or full-body machine day.'
  ],
  next: 'Next: a leg-focused machine day (leg press, leg curl, leg extension, plus a little core).'
};

/* Earlier sessions, kept so an unsent report can still be built from logs saved on the phone. */
window.PAST_SESSIONS = [
  {
    id: '2026-11-13_W1S4m', week: 1, num: 4, type: 'Together', dateLabel: 'Fri 13 Nov 2026', title: 'Machine Day',
    warmup: { items: [1, 2, 3, 4] },
    cooldown: { items: [1, 2, 3] },
    blocks: [
      { items: [
        { code: 'A1', ex: 'leg-press', sets: 3, reps: '12', unit: 'kg (plates or pin)' },
        { code: 'A2', ex: 'lat-pulldown', sets: 3, reps: '12', unit: 'kg' }
      ] },
      { items: [
        { code: 'B1', ex: 'chest-press-machine', sets: 3, reps: '12', unit: 'kg (pin)' },
        { code: 'B2', ex: 'cable-row', sets: 3, reps: '12', unit: 'kg' }
      ] },
      { items: [
        { code: 'C1', ex: 'shoulder-press-machine', sets: 3, reps: '12', unit: 'kg (pin)' },
        { code: 'C2', ex: 'leg-curl', sets: 3, reps: '12', unit: 'kg (pin)' }
      ] },
      { items: [
        { code: 'D1', ex: 'cable-curl', sets: 2, reps: '15', unit: 'kg' },
        { code: 'D2', ex: 'triceps-pushdown', sets: 2, reps: '15', unit: 'kg' }
      ] }
    ],
    finisher: { type: 'intervals', name: 'Bike Finish', sets: 1, rounds: 6 }
  },
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
  currentWeek: 2,
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
  updated: '2026-11-21',
  sessions: { ali: 2, aamna: 2, together: 2 },
  streakWeeks: { ali: 0, aamna: 0 },
  prs: { ali: 0, aamna: 0 },
  history: 'Ali\u2019s Predrag notes (Dec 2021 to Dec 2022) are saved. Marks to beat: 5 strict pull-ups, lat pulldown 45 kg × 12.',
  nextMilestone: 'Send your reports: no lifts are logged yet. Confirmed so far: 2 sessions each. Tell the coach about 10 and 13 Nov and any sessions since'
};
