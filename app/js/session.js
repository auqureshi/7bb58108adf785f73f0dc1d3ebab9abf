/* The current session plus the program and progress snapshot.
   The coach rewrites this file for every new session (see CLAUDE.md, Workflow A). */
window.ATHLETES = [
  { id: 'ali', name: 'Ali' },
  { id: 'aamna', name: 'Aamna' }
];

window.SESSION = {
  id: '2026-11-07_W1S1',
  week: 1, num: 1,
  date: '2026-11-07', dateLabel: 'Sat 7 Nov 2026',
  title: 'We’re Back',
  type: 'Together', template: 'T-A · Squat & Push', phase: 'Phase 1 · Re-Entry',
  minutes: 60, rpe: '6',
  brief: 'Today’s win is walking out feeling like you could do it all again tomorrow. Your strength is still in there and it comes back fast. Your tendons need 2–3 weeks to catch up, so we give them that time. Ali: your starting weights come from your Predrag notes. Aamna: find yours with the calibration rule below.',
  jobs: ['Show up', 'Move well', 'Find your starting weights', 'Log them'],
  warmup: {
    minutes: 10,
    cardio: '5 min easy bike, rower or incline walk, side by side. Slow enough to chat.',
    items: [
      { ex: 'worlds-greatest-stretch', dose: '3 / side' },
      { ex: 'cat-cow', dose: '× 6' },
      { ex: 'glute-bridge', dose: '× 10, 2 s squeeze' },
      { ex: 'bodyweight-squat', dose: '× 8, 3 s down, 2 s pause' },
      { ex: 'inchworm', dose: '× 4' },
      { ex: 'band-pull-apart', dose: '× 15' },
      { ex: 'dead-bug', dose: '5 / side' }
    ]
  },
  blocks: [
    {
      id: 'A', format: 'Swap Stations', rounds: 3, minutes: 12, rest: 60,
      how: 'One of you does A1 while the other does A2, then swap. Once you’ve both done both, that’s 1 round. Rest about 60 s.',
      note: 'Before your first squat set, do one light feeler set of 8.',
      items: [
        { code: 'A1', ex: 'goblet-squat', sets: 3, reps: '10', rpe: '6', unit: 'kg', start: { ali: '16' }, past: { ali: '20 kg × 10 × 3' } },
        { code: 'A2', ex: 'db-row', sets: 3, reps: '10 / side', rpe: '6', unit: 'kg', start: { ali: '20' }, past: { ali: '40 kg DB row · 45 kg seated row' } }
      ]
    },
    {
      id: 'B', format: 'Swap Stations', rounds: 3, minutes: 12, rest: 60,
      how: 'Same flow: one on B1, one on B2, then swap. Rest about 60 s after each round.',
      items: [
        { code: 'B1', ex: 'db-rdl', sets: 3, reps: '10', rpe: '6', unit: 'kg (each DB)', start: { ali: '14–16' }, past: { ali: '16 kg floor hinge · trap bar 20 kg' } },
        { code: 'B2', ex: 'db-bench', sets: 3, reps: '10', rpe: '6', unit: 'kg (each DB)', variants: ['DB bench', 'Incline push-up', 'Push-up'], start: { ali: '14' }, past: { ali: 'bench ~40 kg (10 kg plates)' } }
      ]
    },
    {
      id: 'C', format: 'Functional trio', rounds: 2, minutes: 10, rest: 45,
      how: 'Take turns on the pulldown. Do the lunges and carries side by side.',
      items: [
        { code: 'C1', ex: 'lat-pulldown', sets: 2, reps: '12', rpe: '6–7', unit: 'kg', start: { ali: '35' }, past: { ali: '45 kg × 12 × 4 (Dec 2022)' } },
        { code: 'C2', ex: 'reverse-lunge', sets: 2, reps: '6 / side', rpe: 'easy', unit: 'kg (blank = bodyweight)', past: { ali: 'lunges with 8–10 kg' } },
        { code: 'C3', ex: 'farmer-carry', sets: 2, reps: '30–40 m', rpe: 'moderate', unit: 'kg per hand', start: { ali: '20' } }
      ]
    }
  ],
  finisher: {
    name: 'Comeback Relay', ex: 'rower', legs: 8, leg: '250 m', rpe: '7',
    how: 'Take turns on the rower: 250 m each, 4 legs each, 8 in total. Whoever is resting gets their breath back and cheers.',
    alt: 'No rower? Bike for 45 s per leg.',
    pace: 'Strong but controlled. Not a sprint, and not the day to feel sick.'
  },
  cooldown: {
    minutes: 5,
    items: [
      { ex: 'hip-flexor-stretch', dose: '45 s / side' },
      { ex: 'childs-pose', dose: '45 s, reach to each side' },
      { ex: 'chest-stretch', dose: '30 s / side' }
    ],
    extra: 'Finish with 5 slow breaths lying down (4 s in, 6 s out), then take your Day 1 photo together.'
  },
  planB: 'Short on time (35 min): 5-min warm-up, Blocks A and B for 2 rounds each, then relay 2 legs each. Skip Block C.',
  swaps: [
    ['Goblet squat', 'Leg press 3 × 12, or Smith squat'],
    ['1-arm DB row', 'Seated cable row'],
    ['DB RDL', 'KB RDL, or cable pull-through'],
    ['DB bench', 'Machine chest press, or push-ups'],
    ['Lat pulldown', 'Assisted pull-up machine, or band pulldown'],
    ['Rower', 'Bike, ski erg, or 60 s incline treadmill legs']
  ],
  after: [
    'Soreness usually peaks 24–48 h after, so expect it Sunday and Monday. It’s normal.',
    'Go for a 30–45 min walk together on Sunday. Moving is the best fix.',
    'Eat protein at every meal and get a full night’s sleep.',
    'Don’t skip Session 2 because you’re sore. Training at RPE 6 makes the soreness fade faster.'
  ],
  next: 'Session 2: T-B Hinge & Pull if you go together, or S-U Solo Upper if Ali goes alone. Message the coach before you go.'
};

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
  updated: '2026-11-06',
  sessions: { ali: 0, aamna: 0, together: 0 },
  streakWeeks: { ali: 0, aamna: 0 },
  prs: { ali: 0, aamna: 0 },
  history: 'Ali’s Predrag notes (Dec 2021 to Dec 2022) are saved. Marks to beat: 5 strict pull-ups, lat pulldown 45 kg × 12.',
  nextMilestone: 'First session back: tomorrow, Sat 7 Nov'
};
