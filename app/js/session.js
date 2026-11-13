/* The current session plus the program and progress snapshot.
   The coach rewrites this file for every new session (see CLAUDE.md, Workflow A). */
window.ATHLETES = [
  { id: 'ali', name: 'Ali' },
  { id: 'aamna', name: 'Aamna' }
];

window.SESSION = {
  id: '2026-11-13_W1S4',
  week: 1, num: 4,
  date: '2026-11-13', dateLabel: 'Fri 13 Nov 2026',
  title: 'Tag Team',
  type: 'Together', template: 'T-C · Athletic & Engine', phase: 'Phase 1 · Re-Entry',
  minutes: 55, rpe: '6',
  brief: 'The athletic day: throw fast, lunge with weight, learn the kettlebell swing, and finish with a tag-team relay. Today you also coach each other. On the swings, the partner who is resting watches the hinge. Ali, this is your 3rd session this week, which hits your Week 1 target.',
  jobs: ['Throw fast, not hard', 'Add dumbbells to Saturday’s lunges', 'Learn the swing, coach each other', 'Set a relay time to beat'],
  note: 'Still sore from earlier in the week, or short on sleep? Use Plan B. The swing is a hinge: if your lower back feels it more than your glutes, stop and swap to the kettlebell deadlift.',
  warmup: {
    minutes: 10,
    cardio: '5 min easy row or bike, side by side. Chatting pace.',
    items: [
      { ex: 'worlds-greatest-stretch', dose: '3 / side' },
      { ex: 'glute-bridge', dose: '× 10, 2 s squeeze' },
      { ex: 'inchworm', dose: '× 4' },
      { ex: 'band-pull-apart', dose: '× 15' },
      { ex: 'bodyweight-squat', dose: '× 8' },
      { ex: 'dead-bug', dose: '5 / side' }
    ]
  },
  blocks: [
    {
      id: 'A', format: 'Partner power', rounds: 3, minutes: 8, rest: 60,
      how: 'Stand about 3 m apart, facing each other. Pass the ball back and forth: 8 throws each per set. Every throw should be fast and crisp. Stop the set if throws slow down.',
      note: 'Power goes first, while you’re fresh.',
      items: [
        { code: 'A1', ex: 'med-ball-chest-pass', sets: 3, reps: '8 throws each', rpe: 'fast', unit: 'kg ball',
          start: { ali: '6' },
          tip: { ali: 'Step into each throw and drive from the legs', aamna: 'Start with a 3–4 kg ball. Speed matters more than weight' } }
      ]
    },
    {
      id: 'B', format: 'Swap Stations', rounds: 3, minutes: 12, rest: 60,
      how: 'One of you does B1 while the other does B2, then swap. Once you’ve both done both, that’s 1 round. Rest about 60 s.',
      items: [
        { code: 'B1', ex: 'reverse-lunge', sets: 3, reps: '8 / side', rpe: '6', unit: 'kg (each DB, blank = bodyweight)',
          start: { ali: '8' },
          past: { ali: 'Saturday: bodyweight × 6/side, easy · Predrag days: lunges with 8–10 kg' },
          tip: { aamna: 'Round 1 bodyweight (Saturday’s version). Add light dumbbells only if it feels easy' } },
        { code: 'B2', ex: 'push-up', sets: 3, reps: '8–12', rpe: '6', unit: 'pick your version', noWeight: true,
          variants: ['Floor', 'Feet on a bench (harder)', 'Hands on a bench', 'Hands on a Smith bar', 'Knees'],
          tip: { ali: 'Floor push-ups. If 12 reps leave more than 4 in the tank, put your feet on a bench', aamna: 'Tuesday’s height, or one notch lower if every set felt easy' } }
      ]
    },
    {
      id: 'C', format: 'Swap Stations', rounds: 3, minutes: 12, rest: 60,
      how: 'One of you swings while the other does the landmine, then swap.',
      note: 'Swings: the first set is 8 kettlebell deadlifts to learn the hinge, then swing. The partner who is resting watches: hips back (not a squat), arms loose, bell floats to chest height.',
      items: [
        { code: 'C1', ex: 'kb-swing', sets: 3, reps: '12', rpe: '6', unit: 'kg',
          start: { ali: '16' },
          past: { ali: 'Predrag days: 16 kg floor hinge' },
          tip: { ali: 'Aamna checks your hinge. Snap your hips, don’t lift with your arms', aamna: 'Start light (8–12 kg). Ali checks your hinge. Hips back, then snap forward' } },
        { code: 'C2', ex: 'landmine-rotation', sets: 3, reps: '8 / side', rpe: '6', unit: 'kg added (blank = bar only)',
          past: { ali: 'Predrag days: 30 → 20 → 10 kg drop set' },
          tip: { ali: 'Sunday’s weight, or +2.5–5 kg if it was easy', aamna: 'Bar only or Sunday’s weight. Pivot your back foot' } }
      ]
    }
  ],
  finisher: {
    type: 'relay', name: 'Tag Team Relay', ex: 'kb-swing', legs: 10, leg: '1 round', rpe: '7', minutes: 10,
    firstVerb: 'goes first', nowLabel: 'Working now',
    how: 'One round = 8 KB swings + 6 push-ups (today’s version) + 20 m suitcase carry with your bell (switch hands halfway). Do a round, then tag your partner. 5 rounds each.',
    pace: 'Steady and clean. The score is your total time, so we can beat it in a few weeks.',
    alt: 'Swings feel unsure? Do 8 kettlebell deadlifts instead.'
  },
  cooldown: {
    minutes: 5,
    items: [
      { ex: 'hip-flexor-stretch', dose: '45 s / side' },
      { ex: 'childs-pose', dose: '45 s, reach to each side' },
      { ex: 'chest-stretch', dose: '30 s / side' }
    ],
    extra: 'Finish with 5 slow breaths. That wraps up Week 1 of the comeback.'
  },
  planB: 'Short on time or still sore (35 min): 5-min warm-up, Block A × 2, Block B × 2, then Tag Team Relay with 3 rounds each.',
  swaps: [
    ['Med-ball chest pass', 'Chest pass against a wall, or fast push-ups with hands on a bench'],
    ['Reverse lunge', 'DB step-up, or split squat holding a rack'],
    ['Push-up', 'DB bench press 3 × 10'],
    ['KB swing', 'Kettlebell deadlift 3 × 10'],
    ['Landmine rotation', 'Pallof press 3 × 10 / side'],
    ['Suitcase carry (relay)', 'Farmer carry with two bells']
  ],
  after: [
    'Ali: 3 sessions this week, so your Week 1 target is hit. Aamna: 3 or 4, depending on Tuesday.',
    'Weekend: one long walk together, then rest. Week 2 starts Monday.',
    'Send the coach your reports for Sessions 1–4 (cards at the top of this page), so Week 2 starts with exact weights.'
  ],
  next: 'Week 2 starts Mon 16 Nov: effort steps up to RPE 7, and the benchmark tests (push-ups, dead hang, plank, 500 m row, broad jump) give you both a baseline.'
};

/* Earlier sessions, kept so an unsent report can still be built from logs saved on the phone. */
window.PAST_SESSIONS = [
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
