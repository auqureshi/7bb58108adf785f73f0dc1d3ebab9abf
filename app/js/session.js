/* The current session plus the program and progress snapshot.
   The coach rewrites this file for every new session (see CLAUDE.md, Workflow A). */
window.ATHLETES = [
  { id: 'ali', name: 'Ali' },
  { id: 'aamna', name: 'Aamna' }
];

window.SESSION = {
  id: '2026-11-10_W1S3_aamna',
  week: 1, num: 3,
  date: '2026-11-10', dateLabel: 'Tue 10 Nov 2026',
  title: 'Solo Strong',
  athletes: ['aamna'],
  type: 'Solo · Aamna', template: 'T-C · Athletic & Engine (solo version)', phase: 'Phase 1 · Re-Entry',
  minutes: 50, rpe: '6',
  brief: 'Your first solo session, Aamna. Everything here is easy to set up on your own: dumbbells, one cable machine, a bench and the rower. You trained Saturday and Sunday, so today makes three sessions and completes your Week 1 target.',
  jobs: ['Show up solo', 'Goblet squat: Saturday’s weight or one step up', 'Learn the step-up', 'Finish strong on the rower'],
  note: 'Feeling very sore or run down? Use Plan B at the bottom. Sharp or joint pain means stop that exercise and use its swap.',
  warmup: {
    minutes: 8,
    cardio: '5 min incline walk or easy bike, slow enough to hold a conversation.',
    items: [
      { ex: 'worlds-greatest-stretch', dose: '3 / side' },
      { ex: 'glute-bridge', dose: '× 12, 2 s squeeze' },
      { ex: 'band-pull-apart', dose: '× 15 (no band: arm circles)' },
      { ex: 'bodyweight-squat', dose: '× 8, 3 s down, pause at the bottom' },
      { ex: 'inchworm', dose: '× 4' }
    ]
  },
  blocks: [
    {
      id: 'A', format: 'Superset', rounds: 3, minutes: 12, rest: 60,
      how: 'Do A1, then go straight to A2, then rest about 60 s. That’s 1 round. Grab your dumbbell and take it near the cable row so you don’t lose your spot.',
      items: [
        { code: 'A1', ex: 'goblet-squat', sets: 3, reps: '10', rpe: '6', unit: 'kg',
          tip: { aamna: 'Start with Saturday’s weight. If 10 reps felt easy then, go one dumbbell up' } },
        { code: 'A2', ex: 'cable-row', sets: 3, reps: '12', rpe: '6', unit: 'kg',
          tip: { aamna: 'Pick a weight you could pull about 15 times. Chest tall, no rocking' } }
      ]
    },
    {
      id: 'B', format: 'Superset', rounds: 3, minutes: 12, rest: 60,
      how: 'B1 then B2, then rest about 60 s. Use the same bench for both: step up onto it, then put your hands on it for push-ups.',
      items: [
        { code: 'B1', ex: 'step-up', sets: 3, reps: '8 / side', rpe: '6', unit: 'kg (each DB, blank = bodyweight)',
          tip: { aamna: 'Round 1 with bodyweight on a knee-height box or bench. Hold light dumbbells only if it feels easy' } },
        { code: 'B2', ex: 'push-up', sets: 3, reps: '8–10', rpe: '6', unit: 'pick your height', noWeight: true,
          variants: ['Hands on a bench', 'Hands on a Smith bar (higher = easier)', 'Knees on the floor', 'Full push-up'],
          tip: { aamna: 'Choose the height where 8–10 reps leave 3–4 in the tank' } }
      ]
    },
    {
      id: 'C', format: 'Core & carry', rounds: 2, minutes: 8, rest: 45,
      how: 'C1, then C2, then rest about 45 s.',
      items: [
        { code: 'C1', ex: 'pallof-press', sets: 2, reps: '10 / side', rpe: '6', unit: 'kg',
          tip: { aamna: 'Light enough to hold the handle perfectly still for 2 s' } },
        { code: 'C2', ex: 'farmer-carry', sets: 2, reps: '30–40 m', rpe: 'moderate', unit: 'kg per hand',
          tip: { aamna: 'Saturday’s carry weight, or one step up' } }
      ]
    }
  ],
  finisher: {
    type: 'intervals', name: 'Row Strong', ex: 'rower', rpe: '7',
    sets: 1, rounds: 6, setRest: 0,
    segments: [
      { label: 'Row strong', secs: 30 },
      { label: 'Easy', secs: 30, rest: true }
    ],
    how: '6 rounds of 30 s strong rowing and 30 s easy paddling. The app beeps at every switch.',
    pace: 'Strong, not all-out. Legs first, then body, then arms.',
    alt: 'No rower free? Same timing on the bike.'
  },
  cooldown: {
    minutes: 5,
    items: [
      { ex: 'hip-flexor-stretch', dose: '45 s / side' },
      { ex: 'childs-pose', dose: '45 s, reach to each side' },
      { ex: 'chest-stretch', dose: '30 s / side' }
    ],
    extra: 'Finish with 5 slow breaths (4 s in, 6 s out). That’s 3 sessions: your Week 1 target is done.'
  },
  planB: 'Tired, sore or short on time (30 min): 5-min warm-up, Block A × 2, Block B × 2, then 3 rounds of Row Strong.',
  swaps: [
    ['Goblet squat', 'Leg press 3 × 12'],
    ['Seated cable row', 'Chest-supported row machine, or 1-arm DB row'],
    ['Step-up', 'Reverse lunge, holding a rack for balance'],
    ['Push-up', 'Machine chest press 3 × 10'],
    ['Pallof press', 'Dead bug 2 × 6 / side'],
    ['Farmer carry', 'Hold the dumbbells for 30 s, standing tall'],
    ['Rower', 'Bike, same timing']
  ],
  after: [
    'Send three things to the coach (or Ali): your goblet squat weight, your push-up height, and how hard it felt from 1 to 10.',
    'A walk tomorrow helps recovery.',
    'Protein at every meal and a good night’s sleep.'
  ],
  next: 'Next: together again on Thu or Fri (T-C, Athletic & Engine, with partner med-ball throws and a partner workout).'
};

/* Earlier sessions, kept so an unsent report can still be built from logs saved on the phone. */
window.PAST_SESSIONS = [
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
  updated: '2026-11-09',
  sessions: { ali: 2, aamna: 2, together: 2 },
  streakWeeks: { ali: 0, aamna: 0 },
  prs: { ali: 0, aamna: 0 },
  history: 'Ali\u2019s Predrag notes (Dec 2021 to Dec 2022) are saved. Marks to beat: 5 strict pull-ups, lat pulldown 45 kg × 12.',
  nextMilestone: 'Aamna: Tuesday\u2019s solo session completes her Week 1 target (3 of 3). Ali: 2 done, 1–2 to go by Sun 15 Nov'
};
