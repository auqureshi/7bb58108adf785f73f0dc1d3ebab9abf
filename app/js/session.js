/* The current session plus the program and progress snapshot.
   The coach rewrites this file for every new session (see CLAUDE.md, Workflow A). */
window.ATHLETES = [
  { id: 'ali', name: 'Ali' },
  { id: 'aamna', name: 'Aamna' }
];

window.SESSION = {
  id: '2026-11-08_W1S2',
  week: 1, num: 2,
  date: '2026-11-08', dateLabel: 'Sun 8 Nov 2026',
  title: 'Round Two',
  type: 'Together', template: 'T-B · Pull, Press & Glutes', phase: 'Phase 1 · Re-Entry',
  minutes: 55, rpe: '6',
  brief: 'Second day in a row, so today trains what yesterday didn’t hit hard: pulling up, pressing overhead, glutes and core, with a boxing finish. Sore legs are normal. Moving them gently today helps them recover faster. Everything stays at RPE 6.',
  jobs: ['Loosen up the soreness', 'Set your pull-up baseline', 'Learn "bar left right"', 'Box it out together'],
  note: 'Soreness check: if your legs are 7/10 sore or worse, or any joint hurts, use Plan B at the bottom of the page.',
  warmup: {
    minutes: 10,
    cardio: '6 min easy bike side by side. It flushes yesterday’s soreness out of your legs. Chatting pace.',
    items: [
      { ex: 'worlds-greatest-stretch', dose: '3 / side' },
      { ex: 'cat-cow', dose: '× 6' },
      { ex: 'glute-bridge', dose: '× 12, 2 s squeeze' },
      { ex: 'band-pull-apart', dose: '× 15' },
      { ex: 'dead-bug', dose: '5 / side' },
      { ex: 'bodyweight-squat', dose: '× 8, slow, to loosen the legs' }
    ]
  },
  blocks: [
    {
      id: 'A', format: 'Swap Stations', rounds: 3, minutes: 12, rest: 60,
      how: 'One of you does A1 while the other does A2, then swap. Once you’ve both done both, that’s 1 round. Rest about 60 s.',
      note: 'Pull-ups: stop every set with 3–4 reps left, even if you feel great.',
      items: [
        { code: 'A1', ex: 'hip-thrust', sets: 3, reps: '10', rpe: '6', unit: 'kg (DB or bar on hips)',
          start: { ali: '20' },
          tip: { ali: 'New lift for you: first set with one 20 kg dumbbell, then adjust', aamna: 'Feeler set with bodyweight, then add a dumbbell across your hips' } },
        { code: 'A2', ex: 'pull-up', sets: 3, reps: '5–6', rpe: '6', unit: 'kg assistance (blank = strict)',
          variants: ['Assisted machine', 'Band-assisted', 'Strict', 'Slow negatives (3–5 s down)'],
          past: { ali: 'Predrag days: 5 strict × 4 sets (Mar 2022)' },
          tip: { ali: 'Try strict and stop at 4–5 clean reps. If you get 3 or fewer, add light assistance', aamna: 'Assisted machine: pick the assistance that gives 6 smooth reps with 3–4 left. More kg = easier' } }
      ]
    },
    {
      id: 'B', format: 'Swap Stations', rounds: 3, minutes: 12, rest: 60,
      how: 'Same flow: one on B1, one on B2, then swap. Rest about 60 s after each round.',
      note: 'Face pulls are light on purpose. They protect your shoulders.',
      items: [
        { code: 'B1', ex: 'half-kneeling-press', sets: 3, reps: '8 / side', rpe: '6', unit: 'kg',
          start: { ali: '12' },
          past: { ali: 'Predrag days: ~30 kg barbell press × 4 sets' },
          tip: { aamna: 'Start light and use the Easy / Right / Heavy buttons' } },
        { code: 'B2', ex: 'face-pull', sets: 3, reps: '15', rpe: '6–7', unit: 'kg' }
      ]
    },
    {
      id: 'C', format: 'Core & carry trio', rounds: 2, minutes: 10, rest: 45,
      how: 'Take turns on the landmine. Carry side by side, then side plank together.',
      items: [
        { code: 'C1', ex: 'landmine-rotation', sets: 2, reps: '8 / side', rpe: '6', unit: 'kg added (blank = bar only)',
          start: { ali: '5' },
          past: { ali: 'Predrag days: 30 → 20 → 10 kg drop set' },
          tip: { aamna: 'Bar only today. Learn the pivot first' } },
        { code: 'C2', ex: 'farmer-carry', sets: 2, reps: '30 m / side', rpe: 'moderate', unit: 'kg',
          variants: ['Suitcase (one hand)', 'Farmer (two hands)'],
          start: { ali: '20' },
          tip: { ali: 'One dumbbell. Stay level: don’t lean', aamna: 'Use the weight you carried yesterday, in one hand. Stay level' } },
        { code: 'C3', ex: 'side-plank', sets: 2, reps: '20–30 s / side', rpe: 'moderate', unit: 'hold', noWeight: true }
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
    how: 'Side by side, shadow-boxing the same punches at the same time. The app beeps at every switch: two high beeps mean punch, one low beep means rest.',
    pace: 'Fast hands, light feet, breathe out on every punch.',
    alt: 'No space? Same timing on the bike: hard, steady, hard, easy.'
  },
  cooldown: {
    minutes: 5,
    items: [
      { ex: 'childs-pose', dose: '45 s, reach to each side' },
      { ex: 'hip-flexor-stretch', dose: '45 s / side' },
      { ex: 'chest-stretch', dose: '30 s / side' }
    ],
    extra: 'Finish with 5 slow breaths lying down (4 s in, 6 s out). Tomorrow is a rest day.'
  },
  planB: 'Very sore or short on time (35 min): 5-min bike, Block A × 2 (glute bridge on the floor instead of hip thrust), Block B × 2, then 1 set of Predrag Rounds. Skip Block C.',
  swaps: [
    ['Hip thrust', 'Glute bridge on the floor, or the hip-thrust machine'],
    ['Pull-up', 'Lat pulldown 3 × 10'],
    ['Half-kneeling press', 'Seated DB press, or the shoulder-press machine'],
    ['Face pull', 'Band pull-apart, or the rear-delt fly machine'],
    ['Bar left right', 'Pallof press, or a cable woodchop'],
    ['Suitcase carry', 'Farmer carry'],
    ['Boxing', 'Bike: 20 s hard, 20 s steady, 20 s hard, 10 s easy']
  ],
  after: [
    'Two days in a row. Tomorrow (Mon) is a rest day: walk 30–45 min together.',
    'Yesterday’s soreness peaks today or tomorrow. It fades faster if you keep moving.',
    'Protein at every meal, and get to bed on time.',
    'Send the coach your reports from Session 1 and today, so Session 3 has exact weights for you both.'
  ],
  next: 'Session 3 (Tue or Wed): T-C, Athletic & Engine, together. Ali, if you want a 4th session this week, add a solo upper day on Thu or Fri. Message the coach before you go.'
};

/* Earlier sessions, kept so an unsent report can still be built from logs saved on the phone. */
window.PAST_SESSIONS = [
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
  updated: '2026-11-08',
  sessions: { ali: 1, aamna: 1, together: 1 },
  streakWeeks: { ali: 0, aamna: 0 },
  prs: { ali: 0, aamna: 0 },
  history: 'Ali’s Predrag notes (Dec 2021 to Dec 2022) are saved. Marks to beat: 5 strict pull-ups, lat pulldown 45 kg × 12.',
  nextMilestone: 'First full week on target: Ali 3+, Aamna 3 by Sun 15 Nov. After today: 2 done each'
};
