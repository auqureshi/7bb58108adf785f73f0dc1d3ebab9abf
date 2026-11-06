/* Exercise library for The Comeback.
   Muscle keys match the body map: quadriceps, gluteal, hamstring, adductor, calves, abs, obliques,
   lower-back, upper-back, trapezius, chest, front-deltoids, back-deltoids, biceps, triceps, forearm, neck.
   kind: strength | core | power | engine | warmup | cooldown
   goals: strong | lean | functional | mobility
   Photos: Free Exercise DB (public domain). Image files are img/<id>-0.jpg (start) and img/<id>-1.jpg (finish). */
window.EXERCISES = {

  /* ---------- Today's main lifts ---------- */
  'goblet-squat': {
    name: 'Goblet Squat', pattern: 'Squat', equipment: 'Dumbbell or kettlebell', kind: 'strength',
    primary: ['quadriceps', 'gluteal'], secondary: ['adductor', 'abs', 'upper-back', 'calves'],
    goals: ['strong', 'functional'],
    what: 'A squat with the weight hugged at your chest. Your quads and glutes work through full depth while your upper back and core keep you upright.',
    why: 'This is the best squat for a comeback. Holding the weight in front teaches you to sit down and stay tall, so you groove a clean pattern before the barbell returns in Week 3. It is hard to do badly, which protects your knees and back while they re-adapt.',
    cues: ['Hold the bell by the horns, tight to your chest', 'Feet shoulder-width, toes turned out slightly', 'Sit down between your heels, elbows inside your knees', 'Keep your chest proud the whole way', '3 seconds down, then drive the floor away'],
    mistakes: ['Heels lifting: shift your weight to mid-foot, or put small plates under your heels', 'Knees caving in: push them out over your toes', 'Bell drifting away from your chest, which pulls your back round'],
    easier: 'Box squat: sit to a bench and stand back up.',
    harder: 'Heels-elevated goblet squat, then front squat or back squat.',
    life: 'Getting up off the floor, out of a low sofa, or lifting a child.'
  },
  'db-row': {
    name: '1-Arm Dumbbell Row', pattern: 'Horizontal pull', equipment: 'Dumbbell + bench', kind: 'strength',
    primary: ['upper-back'], secondary: ['back-deltoids', 'biceps', 'trapezius', 'forearm'],
    goals: ['strong', 'functional'],
    what: 'One arm pulls a dumbbell from a hang up to your hip while your other hand and knee brace on a bench. It builds your lats and mid-back.',
    why: 'It balances all the pushing you do, in daily life and in this program. A strong upper back gives you better posture, healthier shoulders and, later, a bigger bench. Working one arm at a time also trains your core to resist twisting.',
    cues: ['Hand and knee on the bench, flat back, neck long', 'Pull your elbow toward your hip pocket', 'Pause 1 second at the top and squeeze your shoulder blade', 'Lower slowly to a full stretch'],
    mistakes: ['Twisting your torso to heave the weight up', 'Shrugging toward your ear', 'Rushing the lowering'],
    easier: 'Chest-supported row on an incline bench, or a seated cable row.',
    harder: 'A heavier dumbbell, or a 2-second pause at the top.',
    life: 'Starting a lawnmower, pulling open a heavy door, lifting a suitcase into the car.'
  },
  'db-rdl': {
    name: 'Dumbbell Romanian Deadlift', pattern: 'Hinge', equipment: 'Dumbbells', kind: 'strength',
    primary: ['hamstring', 'gluteal'], secondary: ['lower-back', 'forearm', 'trapezius'],
    goals: ['strong', 'functional', 'lean'],
    what: 'With soft knees, you push your hips back until the dumbbells reach mid-shin, then squeeze your glutes to stand. It loads your hamstrings and glutes in a long stretch.',
    why: 'The hinge is the most important lifting pattern for a healthy back. The RDL teaches it with a light load and builds the glutes and hamstrings that power deadlifts, jumps and sprints. They are big muscles, so training them burns a lot of energy, which helps you get lean.',
    cues: ['Soft knees, then push your hips back like shutting a car door with your butt', 'Keep the dumbbells sliding down close to your thighs', 'Stop when your hamstrings are tight, usually around mid-shin', 'Back flat, chest long', 'Squeeze your glutes to stand tall'],
    mistakes: ['Turning it into a squat: knees bend a lot and your hips never move back', 'Rounding your back to reach lower', 'Leaning back at the top instead of just standing tall'],
    easier: 'Practise the hinge holding a stick along your spine, or use a single kettlebell.',
    harder: 'Barbell RDL, or a single-leg RDL.',
    life: 'Picking things up off the floor without your back complaining.'
  },
  'db-bench': {
    name: 'Dumbbell Bench Press', pattern: 'Horizontal push', equipment: 'Dumbbells + flat bench', kind: 'strength',
    primary: ['chest'], secondary: ['front-deltoids', 'triceps'],
    goals: ['strong'],
    what: 'Lying on a flat bench, you lower two dumbbells to chest level and press them back up. It builds your chest, front shoulders and triceps.',
    why: 'Dumbbells let each shoulder move in its own natural path and stop your stronger side from doing all the work. That makes them kinder to joints coming back from a break, and the strength carries straight over to the barbell bench when it returns.',
    cues: ['Pinch your shoulder blades together and down', 'Feet planted flat, slight arch in your upper back', 'Lower for 2–3 seconds until the dumbbells are level with your chest', 'Press up and slightly in'],
    mistakes: ['Elbows flared straight out: keep them about 45° from your body', 'Bouncing the dumbbells off the bottom', 'Lifting your hips off the bench'],
    easier: 'Push-ups with your hands on a bench or bar (the higher, the easier), or a machine chest press.',
    harder: 'Heavier dumbbells, a 2-second pause at the bottom, then the barbell bench press.',
    life: 'Pushing yourself up off the floor, pushing a heavy trolley or a stuck door.'
  },
  'lat-pulldown': {
    name: 'Lat Pulldown', pattern: 'Vertical pull', equipment: 'Cable machine', kind: 'strength',
    primary: ['upper-back'], secondary: ['biceps', 'back-deltoids', 'forearm', 'trapezius'],
    goals: ['strong', 'functional'],
    what: 'Seated with your thighs locked under the pad, you pull a wide bar down to your upper chest. It builds your lats, the big wings of your back.',
    why: 'Wider lats give you a V-shape and make your waist look smaller, which helps the "lean" look as much as fat loss does. It is also the stepping stone to pull-ups, which are on the roadmap for both of you.',
    cues: ['Grip a little wider than your shoulders, thighs locked under the pad', 'Lean back slightly with your chest up', 'Drive your elbows down toward your back pockets', 'Bar to your upper chest, then 2 seconds back up to a full stretch'],
    mistakes: ['Pulling the bar behind your neck', 'Swinging your body back to move the weight', 'Letting the weight yank your arms up'],
    easier: 'A lighter weight, or a single-arm cable pulldown.',
    harder: 'A slow 3-second return, then assisted pull-ups, then pull-ups.',
    life: 'Climbing, pulling yourself up, lifting things down from a high shelf.'
  },
  'reverse-lunge': {
    name: 'Reverse Lunge', pattern: 'Single leg', equipment: 'Bodyweight (dumbbells later)', kind: 'strength',
    primary: ['quadriceps', 'gluteal'], secondary: ['hamstring', 'adductor', 'calves', 'abs'],
    goals: ['functional', 'strong'],
    what: 'You step one foot back and lower your back knee toward the floor, then drive through your front heel to return. Each leg works on its own.',
    why: 'Most of life happens on one leg: walking, stairs, running. Lunges fix left-to-right imbalances and build balance. Stepping backward is gentler on the knees than a forward lunge, which makes it ideal for a comeback.',
    cues: ['Stand tall and take a long step back', 'Lower until your back knee softly kisses the floor', 'Front shin roughly vertical, weight in the front heel', 'Drive up through the front heel to stand'],
    mistakes: ['A short step, so the front knee shoots forward', 'Wobbling: hold a rack lightly with one hand', 'Slamming the back knee into the floor'],
    easier: 'Hold a rack or bench for balance, or don’t go as deep.',
    harder: 'Hold dumbbells, step back off a low plate, then Bulgarian split squats.',
    life: 'Stairs, hiking, kneeling down and getting back up.'
  },
  'farmer-carry': {
    name: 'Farmer Carry', pattern: 'Carry', equipment: 'Heavy dumbbells or kettlebells', kind: 'strength',
    primary: ['forearm', 'trapezius', 'abs'], secondary: ['obliques', 'gluteal', 'quadriceps', 'calves', 'upper-back'],
    goals: ['functional', 'strong', 'lean'],
    what: 'You pick up two heavy weights and walk tall. Your whole body has to stabilise while your grip holds on.',
    why: 'This is about as functional as an exercise gets. It builds grip strength (strongly linked to long-term health), a solid core, good posture and stable shoulders. It also raises your heart rate fast, so it burns more than it looks.',
    cues: ['Lift the weights up with a flat back, like a deadlift', 'Stand tall, shoulders down and back, ribs down', 'Short, quick steps, eyes straight ahead', 'Set the weights down with control by hinging. Don’t drop them'],
    mistakes: ['Shoulders creeping up to your ears', 'Leaning or swaying side to side', 'Picking the weights up with a rounded back'],
    easier: 'Lighter weights, shorter distance.',
    harder: 'Heavier, longer, or one hand only (suitcase carry).',
    life: 'Carrying all the shopping in from the car in one trip.'
  },
  'rower': {
    name: 'Rowing Machine', pattern: 'Engine', equipment: 'Rower', kind: 'engine',
    primary: ['quadriceps', 'upper-back'], secondary: ['gluteal', 'hamstring', 'back-deltoids', 'biceps', 'abs', 'lower-back'],
    goals: ['lean', 'functional'],
    what: 'A full-body cardio machine. Each stroke is a leg drive, a hip swing and an arm pull, so most of your muscles work on every stroke.',
    why: 'It is excellent for getting lean: it works most of your muscles with no impact on your joints. Short relays build your engine quickly, and the score gives you something easy to beat next time.',
    cues: ['On the drive: legs, then body, then arms', 'On the way back: arms, then body, then legs', 'Push the floor away with your legs. Don’t just pull with your arms', 'About 24–28 strokes a minute for steady work', 'Damper (the lever on the fan) on 4–6, not 10'],
    mistakes: ['Pulling mostly with your arms', 'Knees rising before your hands have passed them on the way back', 'Rounding your back at the front of the stroke'],
    easier: 'Bike (45 s per leg) or an incline walk.',
    harder: 'Longer legs (500 m), or more power at the same stroke rate.',
    life: 'An engine that lasts: playing with kids, long walks, stairs without getting out of breath.'
  },

  /* ---------- Warm-up ---------- */
  'worlds-greatest-stretch': {
    name: 'World’s Greatest Stretch', pattern: 'Mobility', equipment: 'None', kind: 'warmup',
    primary: ['hamstring', 'gluteal', 'adductor'], secondary: ['quadriceps', 'upper-back', 'obliques'],
    goals: ['mobility'],
    what: 'A deep lunge, an elbow drop toward the floor, and a twist up to the ceiling. It opens your hips, hamstrings and upper back in one move.',
    why: 'It covers the joints that stiffen most from sitting, which is how it got its name. A great primer before squats and deadlifts.',
    cues: ['Step into a long lunge, both hands down inside your front foot', 'Drop your inside elbow toward the floor', 'Rotate and reach that arm to the ceiling, eyes following your hand', 'Keep your back leg straight and strong'],
    mistakes: ['Rushing through it', 'Letting your back knee collapse'],
    easier: 'Put your back knee down on the floor.',
    harder: 'After the twist, straighten your front leg for a hamstring stretch.',
    life: 'Bending, twisting and reaching without stiffness.'
  },
  'cat-cow': {
    name: 'Cat-Cow', pattern: 'Mobility', equipment: 'None', kind: 'warmup',
    primary: ['lower-back', 'abs'], secondary: ['upper-back', 'trapezius'],
    goals: ['mobility'],
    what: 'On hands and knees, you round your spine up like a cat, then let it sag and look up.',
    why: 'It wakes up every section of your spine and gets it moving before you load it.',
    cues: ['Hands under shoulders, knees under hips', 'Breathe out: round up and push the floor away', 'Breathe in: let your belly drop, chest forward, look up', 'Slow, one breath per position'],
    mistakes: ['Moving only your neck', 'Going fast'],
    easier: 'Smaller range.', harder: 'Pause 3 seconds at each end.',
    life: 'A back that feels good after a long day sitting.'
  },
  'glute-bridge': {
    name: 'Glute Bridge', pattern: 'Activation', equipment: 'None', kind: 'warmup',
    primary: ['gluteal'], secondary: ['hamstring', 'abs'],
    goals: ['mobility', 'strong'],
    what: 'Lying on your back with your knees bent, you drive your hips up and squeeze your glutes.',
    why: 'It switches your glutes on after a day of sitting, so they do the work in squats and RDLs instead of your lower back.',
    cues: ['Feet flat and hip-width, heels close to your butt', 'Ribs down, drive through your heels', 'Squeeze your glutes hard for 2 seconds at the top', 'Straight line from knees to shoulders'],
    mistakes: ['Arching your lower back to get higher', 'Pushing through your toes'],
    easier: 'Smaller range.', harder: 'Single-leg bridge, or the barbell hip thrust.',
    life: 'Glutes that switch on when you need them.'
  },
  'bodyweight-squat': {
    name: 'Bodyweight Squat (paused)', pattern: 'Squat', equipment: 'None', kind: 'warmup',
    primary: ['quadriceps', 'gluteal'], secondary: ['adductor', 'calves'],
    goals: ['mobility'],
    what: 'A slow squat with no weight and a pause at the bottom.',
    why: 'It rehearses today’s main lift and warms up your knees and hips through their full range.',
    cues: ['3 seconds down', '2-second pause at the bottom, chest tall', 'Push your knees out', 'Stand up and squeeze your glutes'],
    mistakes: ['Dropping into the bottom', 'Heels lifting'],
    easier: 'Squat to a bench.', harder: 'Hold the bottom for 5 seconds.',
    life: 'Comfortable deep squatting, like playing on the floor.'
  },
  'inchworm': {
    name: 'Inchworm', pattern: 'Mobility', equipment: 'None', kind: 'warmup',
    primary: ['hamstring', 'abs'], secondary: ['front-deltoids', 'chest', 'triceps'],
    goals: ['mobility'],
    what: 'From standing, you walk your hands out into a plank, then walk your feet up to your hands.',
    why: 'It stretches your hamstrings and warms up your shoulders and core in one move.',
    cues: ['Fold forward with your hands on the floor (bend your knees if you need to)', 'Walk your hands out to a plank', 'Add a push-up if it feels good', 'Walk your feet in toward your hands, then stand'],
    mistakes: ['Hips sagging in the plank'],
    easier: 'Bend your knees more.', harder: 'Add a push-up at the bottom.',
    life: 'Getting down to the floor and back up easily.'
  },
  'band-pull-apart': {
    name: 'Band Pull-Apart', pattern: 'Activation', equipment: 'Resistance band', kind: 'warmup',
    primary: ['back-deltoids', 'upper-back'], secondary: ['trapezius'],
    goals: ['mobility', 'functional'],
    what: 'Holding a band at shoulder height with straight arms, you pull it apart to your chest.',
    why: 'It wakes up the small muscles at the back of your shoulders, which protects them in the pressing and pulling that follow.',
    cues: ['Arms straight, band at shoulder height', 'Pull the band to your chest by squeezing your shoulder blades together', 'Return it slowly. Don’t let it snap back'],
    mistakes: ['Shrugging', 'Bending your elbows a lot'],
    easier: 'A lighter band, or arm circles.', harder: 'Pause 2 seconds at your chest.',
    life: 'Healthier shoulders and better posture.'
  },
  'dead-bug': {
    name: 'Dead Bug', pattern: 'Core', equipment: 'None', kind: 'core',
    primary: ['abs'], secondary: ['obliques'],
    goals: ['functional', 'mobility'],
    what: 'Lying on your back with arms and knees up, you slowly lower the opposite arm and leg while your lower back stays pressed into the floor.',
    why: 'It teaches you to brace your core while your arms and legs move, which is exactly what squats, carries and running need.',
    cues: ['Lower back glued to the floor the whole time', 'Breathe out as you extend the opposite arm and leg', 'Slow: 3 seconds out, 3 seconds back', 'Only go as low as you can keep your back flat'],
    mistakes: ['Lower back arching off the floor', 'Rushing'],
    easier: 'Move only your legs.', harder: 'Hold light weights in your hands.',
    life: 'A core that protects your back when you lift and carry.'
  },

  /* ---------- Cool-down ---------- */
  'hip-flexor-stretch': {
    name: 'Half-Kneeling Hip-Flexor Stretch', pattern: 'Stretch', equipment: 'Pad or mat', kind: 'cooldown',
    primary: ['quadriceps'], secondary: ['abs'],
    goals: ['mobility'],
    what: 'Kneeling on one knee, you tuck your pelvis under and shift forward to stretch the front of the back hip.',
    why: 'Sitting all day shortens your hip flexors. That tilts your pelvis and can make your lower back ache. Stretching them after squats keeps your hips moving freely.',
    cues: ['Back knee on a pad, front foot forward', 'Tuck your tailbone under and squeeze your back glute', 'Shift forward gently until you feel the front of your hip', 'For a deeper couch stretch, put your back foot up on a bench'],
    mistakes: ['Arching your lower back instead of tucking'],
    easier: 'Smaller forward shift.', harder: 'Couch stretch with your back foot up on a bench.',
    life: 'Looser hips and a happier lower back.'
  },
  'childs-pose': {
    name: 'Child’s Pose', pattern: 'Stretch', equipment: 'Mat', kind: 'cooldown',
    primary: ['lower-back', 'upper-back'], secondary: ['gluteal'],
    goals: ['mobility'],
    what: 'Kneeling, you sit your hips back to your heels and reach your arms forward along the floor.',
    why: 'It decompresses your spine and stretches your lats after a session, and it helps your body switch from training mode to recovery.',
    cues: ['Knees wide, big toes together', 'Sit your hips back to your heels', 'Walk your hands forward, then to one side for a lat stretch', 'Slow breaths into your back'],
    mistakes: ['Holding your breath'],
    easier: 'A pillow under your hips.', harder: 'Reach further to each side.',
    life: 'Winding down after a hard day.'
  },
  'chest-stretch': {
    name: 'Doorway Chest Stretch', pattern: 'Stretch', equipment: 'Doorframe or rack', kind: 'cooldown',
    primary: ['chest'], secondary: ['front-deltoids', 'biceps'],
    goals: ['mobility'],
    what: 'With your forearm on a doorframe or rack, you step through gently to stretch your chest and the front of your shoulder.',
    why: 'It opens your chest after pressing and counters hunched desk posture.',
    cues: ['Forearm on the frame, elbow at shoulder height', 'Step through gently, chest tall', 'Breathe and don’t force it', '30 seconds per side'],
    mistakes: ['Forcing it so far that your shoulder pinches'],
    easier: 'Lower elbow position.', harder: 'Raise your elbow a little higher.',
    life: 'Standing taller, with less rounded shoulders.'
  },

  /* ---------- Coming up in the program ---------- */
  'push-up': {
    name: 'Push-Up', pattern: 'Horizontal push', equipment: 'Bodyweight', kind: 'strength',
    primary: ['chest'], secondary: ['triceps', 'front-deltoids', 'abs'],
    goals: ['strong', 'functional'],
    what: 'From a straight plank, you lower your chest to near the floor and press back up.',
    why: 'It builds upper-body pushing strength and a strong core with no equipment, so you can do it anywhere. It scales easily from incline to weighted.',
    cues: ['Hands under your shoulders, body in one straight line', 'Squeeze your glutes and brace', 'Lower until your chest is a fist’s height from the floor, elbows about 45°', 'Push the floor away'],
    mistakes: ['Hips sagging', 'Head poking forward', 'Half reps'],
    easier: 'Hands on a bench or bar: the higher, the easier.',
    harder: 'Feet raised, slow tempo, or a weight vest.',
    life: 'Getting up off the floor, pushing anything heavy.'
  },
  'hip-thrust': {
    name: 'Hip Thrust', pattern: 'Glutes', equipment: 'Bench + barbell or dumbbell', kind: 'strength',
    primary: ['gluteal'], secondary: ['hamstring', 'quadriceps', 'adductor'],
    goals: ['strong', 'functional'],
    what: 'With your upper back on a bench and a weight across your hips, you drive your hips up to full extension.',
    why: 'This is the strongest glute builder there is. Strong glutes protect your lower back and knees, make you faster and help you jump higher.',
    cues: ['Bench under your shoulder blades', 'Chin tucked, ribs down', 'Drive through your heels until your body is a flat tabletop', 'Squeeze for 1 second at the top without arching'],
    mistakes: ['Arching your lower back to finish the rep', 'Feet too far away, which lets your hamstrings take over'],
    easier: 'Glute bridge on the floor.',
    harder: 'Heavier barbell, single leg, or a pause at the top.',
    life: 'Powering up stairs and hills, standing up from anything.'
  },
  'kb-swing': {
    name: 'Kettlebell Swing', pattern: 'Hinge (power)', equipment: 'Kettlebell', kind: 'power',
    primary: ['gluteal', 'hamstring'], secondary: ['lower-back', 'abs', 'forearm', 'front-deltoids'],
    goals: ['lean', 'functional', 'strong'],
    what: 'A fast hinge: you hike the bell back between your legs, then snap your hips so it floats up to chest height.',
    why: 'It is strength and cardio in one. Swings build explosive hips and push your heart rate up, which is why they feature in the "lean" finishers.',
    cues: ['It is a hinge, not a squat', 'Hike the bell back high between your thighs', 'Snap your hips forward and squeeze your glutes', 'Your arms are just ropes: the bell floats to chest height'],
    mistakes: ['Squatting the swing', 'Lifting the bell with your arms', 'Leaning back at the top'],
    easier: 'Kettlebell deadlift, then small swings.',
    harder: 'A heavier bell, or single-arm swings.',
    life: 'Explosive hips for sport, sprinting and jumping.'
  },
  'step-up': {
    name: 'Dumbbell Step-Up', pattern: 'Single leg', equipment: 'Box + dumbbells', kind: 'strength',
    primary: ['quadriceps', 'gluteal'], secondary: ['hamstring', 'calves', 'adductor'],
    goals: ['functional', 'strong'],
    what: 'You step one foot onto a box and drive up to stand on it, then lower with control.',
    why: 'It builds single-leg strength with very little stress on your back, and carries over directly to stairs, hiking and climbing.',
    cues: ['Whole foot on the box', 'Lean slightly forward and drive through your heel', 'Don’t push off with your back foot', 'Lower slowly, over 2 seconds'],
    mistakes: ['Bouncing off the back foot', 'Knee caving in'],
    easier: 'A lower box.', harder: 'A higher box, or heavier dumbbells.',
    life: 'Stairs, hiking, climbing into a high vehicle.'
  },
  'cable-row': {
    name: 'Seated Cable Row', pattern: 'Horizontal pull', equipment: 'Cable machine', kind: 'strength',
    primary: ['upper-back'], secondary: ['back-deltoids', 'biceps', 'trapezius', 'lower-back'],
    goals: ['strong'],
    what: 'Sitting tall, you pull a cable handle to your stomach and squeeze your shoulder blades together.',
    why: 'Constant tension from the cable makes it easy to feel your back working. It builds the mid-back thickness that gives you good posture.',
    cues: ['Chest tall, slight bend in your knees', 'Pull to your belly button', 'Squeeze your shoulder blades for 1 second', 'Let your arms stretch forward slowly'],
    mistakes: ['Rocking back and forth', 'Shrugging'],
    easier: 'Lighter weight.', harder: 'Single arm, or a 2-second pause.',
    life: 'Pulling, lifting and carrying with good posture.'
  },
  'lateral-raise': {
    name: 'Lateral Raise', pattern: 'Shoulders', equipment: 'Dumbbells', kind: 'strength',
    primary: ['front-deltoids'], secondary: ['back-deltoids', 'trapezius'],
    goals: ['strong'],
    what: 'You raise light dumbbells out to your sides until they reach shoulder height.',
    why: 'It builds the side of your shoulders, which makes your frame look wider and your waist look smaller.',
    cues: ['Slight bend in your elbows', 'Lead with your elbows, out to the sides', 'Stop at shoulder height', 'Lower over 2–3 seconds'],
    mistakes: ['Swinging the weights up', 'Shrugging'],
    easier: 'Lighter weights, or a cable.', harder: 'Slower lowering, or a lean-away cable raise.',
    life: 'Stable, healthy shoulders.'
  },
  'db-curl': {
    name: 'Dumbbell Curl', pattern: 'Arms', equipment: 'Dumbbells', kind: 'strength',
    primary: ['biceps'], secondary: ['forearm'],
    goals: ['strong'],
    what: 'You curl dumbbells from your thighs to your shoulders with your elbows pinned at your sides.',
    why: 'It builds your biceps and grip, which helps with every pull and carry.',
    cues: ['Elbows pinned to your sides', 'Turn your palms up as you curl', 'Squeeze at the top', 'Lower slowly, all the way down'],
    mistakes: ['Swinging your body', 'Half reps'],
    easier: 'Lighter weights.', harder: 'Incline curls, or a slow lowering.',
    life: 'Carrying bags and children.'
  },
  'triceps-pushdown': {
    name: 'Triceps Pushdown', pattern: 'Arms', equipment: 'Cable machine', kind: 'strength',
    primary: ['triceps'], secondary: [],
    goals: ['strong'],
    what: 'With your elbows fixed at your sides, you push a cable bar or rope down until your arms are straight.',
    why: 'Your triceps make up most of your upper arm, and stronger triceps mean a stronger bench and overhead press.',
    cues: ['Elbows pinned to your sides', 'Push down until your arms are straight', 'Squeeze for 1 second', 'Let the bar or rope return slowly'],
    mistakes: ['Elbows drifting forward', 'Leaning over the weight'],
    easier: 'Lighter weight.', harder: 'Rope attachment, with a pause at the bottom.',
    life: 'Pushing yourself up, out of a pool or off the floor.'
  },
  'pallof-press': {
    name: 'Pallof Press', pattern: 'Anti-rotation core', equipment: 'Cable or band', kind: 'core',
    primary: ['obliques', 'abs'], secondary: ['gluteal', 'front-deltoids'],
    goals: ['functional'],
    what: 'Standing side-on to a cable, you press the handle straight out from your chest and hold it without letting it twist you.',
    why: 'It trains your core to resist rotation, which is its real job. That protects your back when you carry, twist, or catch something.',
    cues: ['Side-on to the cable, feet hip-width', 'Handle at your chest, then press straight out', 'Hold 2 seconds without letting it rotate you', 'Bring it back with control'],
    mistakes: ['Letting your body twist toward the cable', 'Leaning away from it'],
    easier: 'Lighter weight, wider stance.', harder: 'Half-kneeling, or a heavier weight.',
    life: 'A core that protects your back from awkward twists.'
  },
  'half-kneeling-press': {
    name: 'Half-Kneeling 1-Arm DB Press', pattern: 'Vertical push', equipment: 'Dumbbell', kind: 'strength',
    primary: ['front-deltoids'], secondary: ['triceps', 'abs', 'obliques', 'gluteal'],
    goals: ['strong', 'functional'],
    what: 'Kneeling on one knee, you press a dumbbell overhead with one arm.',
    why: 'It is a shoulder-friendly way to rebuild overhead strength. Kneeling stops you leaning back, so your core has to do its job.',
    cues: ['Squeeze the glute of the knee that is down', 'Ribs down', 'Press up and slightly forward', 'Lower to shoulder height with control'],
    mistakes: ['Leaning back', 'Shrugging the shoulder'],
    easier: 'Seated, with your back supported.', harder: 'Standing, or a heavier dumbbell.',
    life: 'Putting heavy things on high shelves.'
  },
  'med-ball-chest-pass': {
    name: 'Med-Ball Chest Pass (partner)', pattern: 'Power', equipment: 'Medicine ball', kind: 'power',
    primary: ['chest', 'triceps'], secondary: ['front-deltoids', 'abs'],
    goals: ['functional', 'strong'],
    what: 'You explode the ball off your chest to your partner, who catches it softly and passes it back.',
    why: 'It trains speed and power, which fade first as we age. It is also the most fun way to do upper-body power work together.',
    cues: ['Ball at your chest, athletic stance', 'Push explosively and step into it', 'Catch softly with your arms bending', 'Fast and crisp. Stop before you slow down'],
    mistakes: ['Throwing with your arms only', 'Doing too many reps once you’ve slowed down'],
    easier: 'A lighter ball.', harder: 'A heavier ball, or rotational throws.',
    life: 'Fast reactions and pushing power.'
  },
  'back-squat': {
    name: 'Barbell Back Squat', pattern: 'Squat', equipment: 'Barbell + rack', kind: 'strength',
    primary: ['quadriceps', 'gluteal'], secondary: ['adductor', 'hamstring', 'lower-back', 'abs', 'calves'],
    goals: ['strong'],
    what: 'The king of leg exercises: a barbell on your upper back, squatting to depth and standing up.',
    why: 'It lets you lift the heaviest loads for your legs. It returns in Phase 2, once your joints are ready.',
    cues: ['Big breath into your belly, then brace', 'Bar on your upper back, knees out', 'Go only as deep as you can control', 'Drive the floor away'],
    mistakes: ['Losing your brace at the bottom', 'Knees caving in'],
    easier: 'Goblet squat, or a Smith machine squat.', harder: 'Pause squats, or tempo squats.',
    life: 'Strong legs for everything.'
  },
  'bench-press': {
    name: 'Barbell Bench Press', pattern: 'Horizontal push', equipment: 'Barbell + bench', kind: 'strength',
    primary: ['chest'], secondary: ['triceps', 'front-deltoids'],
    goals: ['strong'],
    what: 'Lying on a bench, you lower a barbell to your lower chest and press it back up.',
    why: 'It is the classic upper-body strength test and returns in Phase 2. Your dumbbell work now builds the base for it.',
    cues: ['Grip just outside shoulder width', 'Shoulder blades pinched, feet planted', 'Touch your lower chest', 'Drive the bar up and slightly back'],
    mistakes: ['Bouncing the bar off your chest', 'Flaring your elbows'],
    easier: 'Dumbbell bench.', harder: 'Paused or close-grip bench.',
    life: 'Pushing power.'
  },
  'deadlift': {
    name: 'Barbell Deadlift', pattern: 'Hinge', equipment: 'Barbell', kind: 'strength',
    primary: ['gluteal', 'hamstring', 'lower-back'], secondary: ['quadriceps', 'upper-back', 'trapezius', 'forearm', 'adductor'],
    goals: ['strong', 'functional'],
    what: 'You lift a barbell from the floor to standing by pushing the floor away and driving your hips through.',
    why: 'It builds total-body strength like nothing else. It returns in Phase 3.',
    cues: ['Bar over the middle of your feet', 'Take the slack out of the bar first', 'Push the floor away, keeping the bar close', 'Stand tall with your glutes'],
    mistakes: ['Jerking the bar off the floor', 'Rounding your back'],
    easier: 'Trap bar deadlift.', harder: 'Deficit deadlift, or a pause at the knee.',
    life: 'Lifting heavy things safely.'
  },
  'trap-bar-deadlift': {
    name: 'Trap Bar Deadlift', pattern: 'Hinge', equipment: 'Trap (hex) bar', kind: 'strength',
    primary: ['quadriceps', 'gluteal', 'hamstring'], secondary: ['lower-back', 'trapezius', 'forearm', 'upper-back'],
    goals: ['strong', 'functional'],
    what: 'You stand inside a hexagonal bar, grip the side handles and stand up with it.',
    why: 'It is the most beginner-friendly heavy lift. The load sits in line with your body, which is easier on your back. It is a Phase 2 favourite.',
    cues: ['Stand in the centre', 'Chest up, then push the floor away', 'Stand tall', 'Lower with control'],
    mistakes: ['Squatting too low', 'Rounding your back'],
    easier: 'Raised handles.', harder: 'Low handles, then the conventional deadlift.',
    life: 'Picking up heavy things safely.'
  },
  'overhead-press': {
    name: 'Standing Overhead Press', pattern: 'Vertical push', equipment: 'Barbell or dumbbells', kind: 'strength',
    primary: ['front-deltoids'], secondary: ['triceps', 'trapezius', 'abs', 'gluteal'],
    goals: ['strong', 'functional'],
    what: 'Standing tall, you press a weight from your shoulders to overhead.',
    why: 'It builds strong shoulders and a stable core. Pressing while standing is a full-body skill.',
    cues: ['Squeeze your glutes, ribs down', 'Press the bar straight up', 'Push your head through at the top', 'Lower to your collarbone'],
    mistakes: ['Leaning back', 'Flaring your ribs'],
    easier: 'Dumbbell or landmine press.', harder: 'Push press.',
    life: 'Lifting bags into overhead bins.'
  },
  'pull-up': {
    name: 'Pull-Up', pattern: 'Vertical pull', equipment: 'Bar (assisted machine or band to start)', kind: 'strength',
    primary: ['upper-back'], secondary: ['biceps', 'back-deltoids', 'forearm', 'abs'],
    goals: ['strong', 'functional'],
    what: 'Hanging from a bar, you pull your chest up toward it.',
    why: 'It is the ultimate test of relative strength, and it gets easier as you get leaner. It is a goal for both of you.',
    cues: ['Pull your shoulders down first', 'Chest to the bar', 'Full hang at the bottom', 'Control the way down'],
    mistakes: ['Kipping or swinging', 'Half reps'],
    easier: 'Assisted machine, then a band, then 3–5 second lowering-only reps.', harder: 'Strict reps, then weighted pull-ups.',
    life: 'Climbing and pulling yourself up anything.'
  },
  'split-squat': {
    name: 'Split Squat / Bulgarian Split Squat', pattern: 'Single leg', equipment: 'Dumbbells (+ bench for Bulgarian)', kind: 'strength',
    primary: ['quadriceps', 'gluteal'], secondary: ['adductor', 'hamstring', 'calves'],
    goals: ['strong', 'functional'],
    what: 'In a long split stance, you lower your back knee toward the floor. Put the back foot up on a bench and it becomes the Bulgarian version.',
    why: 'It builds big strength in each leg with a light load on your spine, which is why it is a favourite of athletes.',
    cues: ['Long stance', 'Most of your weight on the front leg', 'Lean forward slightly', 'Drive through your front heel'],
    mistakes: ['Stance too short', 'Bouncing out of the bottom'],
    easier: 'Back foot on the floor.', harder: 'Back foot up on a bench, then add dumbbells.',
    life: 'Balance and strength on each leg.'
  },
  'box-jump': {
    name: 'Box Jump', pattern: 'Power', equipment: 'Plyo box', kind: 'power',
    primary: ['quadriceps', 'gluteal', 'calves'], secondary: ['hamstring', 'adductor'],
    goals: ['functional'],
    what: 'You jump up onto a box, land softly, and step back down.',
    why: 'It builds explosive power, which fades first with age. It appears in Phase 2 and 3, always done fresh.',
    cues: ['Swing your arms', 'Land soft and quiet', 'Stand up tall on the box', 'Step down. Don’t jump down'],
    mistakes: ['A box so high you land in a deep squat', 'Jumping down off the box'],
    easier: 'A low box, or squat jumps.', harder: 'A higher box, or seated box jumps.',
    life: 'Spring in your legs, and faster reactions.'
  },
  'sled-push': {
    name: 'Sled Push', pattern: 'Engine', equipment: 'Sled', kind: 'engine',
    primary: ['quadriceps', 'gluteal', 'calves'], secondary: ['hamstring', 'chest', 'triceps', 'abs'],
    goals: ['lean', 'functional', 'strong'],
    what: 'With your arms long and your body low, you drive a weighted sled across the floor.',
    why: 'It is brutal conditioning with almost no joint stress and no lowering phase, so it causes little soreness. It is excellent for getting lean.',
    cues: ['Arms long, body at about 45°', 'Drive with your legs', 'Short, powerful steps', 'Keep your head neutral'],
    mistakes: ['Standing too upright', 'Taking long, slow steps'],
    easier: 'Lighter sled.', harder: 'Heavier sled, or a longer distance.',
    life: 'Pushing a car or a heavy trolley.'
  },
  'ab-wheel': {
    name: 'Ab Wheel Rollout', pattern: 'Core', equipment: 'Ab wheel', kind: 'core',
    primary: ['abs'], secondary: ['obliques', 'upper-back', 'front-deltoids'],
    goals: ['strong', 'functional'],
    what: 'Kneeling, you roll the wheel out in front of you and pull it back without letting your back sag.',
    why: 'It is one of the hardest anti-extension core exercises, and it builds abs that protect your spine.',
    cues: ['Ribs down, glutes squeezed', 'Roll out only as far as you can keep your back flat', 'Pull back with your abs', 'Breathe out on the way back'],
    mistakes: ['Lower back sagging', 'Going too far too soon'],
    easier: 'Short range, or roll out toward a wall.', harder: 'Longer range, then from your toes.',
    life: 'A strong, protected spine.'
  },
  'side-plank': {
    name: 'Side Plank', pattern: 'Core', equipment: 'None', kind: 'core',
    primary: ['obliques'], secondary: ['abs', 'gluteal', 'front-deltoids'],
    goals: ['functional'],
    what: 'On one forearm, you hold your body in a straight line sideways.',
    why: 'It builds the side of your core that keeps you level when you carry weight in one hand.',
    cues: ['Elbow under your shoulder', 'Hips high, in one straight line', 'Squeeze your glutes', 'Breathe'],
    mistakes: ['Hips sagging', 'Rolling forward'],
    easier: 'From your knees.', harder: 'Lift your top leg.',
    life: 'Carrying a bag in one hand without leaning.'
  },
  'plank': {
    name: 'Plank', pattern: 'Core', equipment: 'None', kind: 'core',
    primary: ['abs'], secondary: ['obliques', 'front-deltoids', 'gluteal', 'quadriceps'],
    goals: ['functional'],
    what: 'On your forearms and toes, you hold your body in a straight line.',
    why: 'It is the foundation of bracing, and it is a Week 2 benchmark test.',
    cues: ['Elbows under your shoulders', 'Squeeze your glutes and quads', 'Ribs down, no sagging', 'Breathe behind your brace'],
    mistakes: ['Hips too high or too low', 'Holding your breath'],
    easier: 'From your knees.', harder: 'Long-lever plank, or lift one foot.',
    life: 'Core stability for everything.'
  }
};

/* ---------- Added from Ali's Predrag history (history/summary.md) ---------- */
Object.assign(window.EXERCISES, {
  'landmine-rotation': {
    name: 'Landmine Rotation ("Bar left right")', pattern: 'Rotation core', equipment: 'Barbell in a landmine or a corner', kind: 'core',
    primary: ['obliques', 'abs'], secondary: ['front-deltoids', 'gluteal', 'upper-back'],
    goals: ['functional', 'strong'],
    what: 'Holding the free end of a barbell anchored in a corner, you swing it in an arc from one hip to the other, turning through your hips and feet.',
    why: 'It trains your core to create and control rotation, which is what you use to throw, punch, swing and turn. It is also your favourite, and that counts: exercises you enjoy get done.',
    cues: ['Arms long, end of the bar at chest height', 'Pivot your back foot as you rotate, like throwing a punch', 'Turn from your hips, not your lower back', 'Control the bar across. Don’t let it pull you'],
    mistakes: ['Bending your arms and turning it into a press', 'Twisting only through your lower back', 'Going so heavy that the bar throws you around'],
    easier: 'Bar only, with a smaller arc.',
    harder: 'Add plates, or add a press at the end of each arc.',
    life: 'Turning, throwing and swinging with power and a safe back.'
  },
  'shadow-boxing': {
    name: 'Boxing Rounds', pattern: 'Engine', equipment: 'None (a bag or pads if your gym has them)', kind: 'engine', img: false,
    primary: ['front-deltoids', 'obliques', 'triceps'], secondary: ['abs', 'chest', 'back-deltoids', 'calves', 'upper-back'],
    goals: ['lean', 'functional'],
    what: 'Fast punching rounds: jabs, crosses, hooks and uppercuts in short bursts with brief rests.',
    why: 'It is serious cardio that doesn’t feel like cardio, and it trains rotation, coordination and shoulder endurance. You already know it from Predrag, so it makes an easy finisher to do together.',
    cues: ['Stay light on the balls of your feet, guard up', 'Turn your back foot and hip into every cross and hook', 'Snap each punch out and back. Don’t lock your elbow', 'Breathe out sharply on every punch'],
    mistakes: ['Punching with only your arms', 'Dropping your guard when you get tired', 'Locking your elbows'],
    easier: 'A slower pace and longer rests.',
    harder: 'Longer rounds, a heavy bag, or 1–2 kg dumbbells on straight punches only.',
    life: 'Fitness that is fun, and stress relief.'
  },
  'hammer-curl': {
    name: 'Hammer Curl', pattern: 'Arms', equipment: 'Dumbbells', kind: 'strength',
    primary: ['biceps', 'forearm'], secondary: [],
    goals: ['strong'],
    what: 'A curl with your palms facing each other, as if you were holding a hammer.',
    why: 'It builds the muscle under your biceps and your forearms, which makes your arms look thicker and your grip stronger.',
    cues: ['Palms facing each other', 'Elbows pinned to your sides', 'Curl up to your shoulder and squeeze', 'Lower slowly'],
    mistakes: ['Swinging the weights', 'Elbows drifting forward'],
    easier: 'Lighter dumbbells.', harder: 'Superset it with regular curls, as you did with Predrag.',
    life: 'Grip and carrying strength.'
  },
  'face-pull': {
    name: 'Face Pull', pattern: 'Rear shoulders', equipment: 'Cable + rope', kind: 'strength',
    primary: ['back-deltoids'], secondary: ['trapezius', 'upper-back'],
    goals: ['functional'],
    what: 'You pull a rope attachment toward your face, splitting the rope so your hands finish beside your ears.',
    why: 'It strengthens the back of your shoulders and your upper back. That keeps your shoulders healthy alongside all the pressing, and helps your posture.',
    cues: ['Cable at face height, rope attachment', 'Pull toward your forehead with your elbows high', 'Split the rope and pull your hands past your ears', 'Pause, then return slowly'],
    mistakes: ['Leaning back to move a heavy weight', 'Letting your elbows drop'],
    easier: 'Lighter weight.', harder: 'Pause for 2 seconds at the end of each rep.',
    life: 'Healthy shoulders and better posture.'
  },
  'back-extension': {
    name: 'Back Extension', pattern: 'Hinge', equipment: '45° back-extension bench', kind: 'strength',
    primary: ['lower-back', 'gluteal'], secondary: ['hamstring'],
    goals: ['functional', 'strong'],
    what: 'On a 45° bench with your hips on the pad, you lower your torso toward the floor and raise it back to a straight line.',
    why: 'It builds endurance in your lower back and glutes, which protects your back in deadlifts and in daily life.',
    cues: ['Pad just below your hip bones', 'Hinge down with a flat back', 'Squeeze your glutes to come up', 'Stop when your body is in a straight line. Don’t over-arch'],
    mistakes: ['Over-arching at the top', 'Jerking up'],
    easier: 'A smaller range.', harder: 'Hold a plate at your chest.',
    life: 'A resilient lower back.'
  }
});

/* Cues from Ali's sessions with trainer Predrag, shown in the app as "From your sessions with Predrag". */
(function (E) {
  var C = {
    'goblet-squat': 'Go to 90°, pause a second at the bottom, and don’t lock your legs when you stand. Last time with Predrag: 20 kg × 10 × 3.',
    'back-squat': 'Knees out. Smith squat with 15 kg per side was your last logged set.',
    'trap-bar-deadlift': 'Arms long, shoulders back, then lift.',
    'lat-pulldown': 'Thumbs-outside grip, and hold it down for a second. Last logged: 45 kg × 12 × 4 (Dec 2022).',
    'cable-row': 'Don’t rock forward and back. Stay straight, leaning slightly back. Last logged: 45 kg × 12 × 3 (Dec 2022).',
    'lateral-raise': 'Elbows up. Last logged: 4 kg × 15.',
    'db-rdl': 'Predrag’s version: feet close, back straight, push your hips back first, then bend your knees to reach the floor. Today, stop at mid-shin where your hamstrings are tight.',
    'split-squat': 'Back foot on the bench, and the back knee comes down to touch the floor softly.',
    'db-curl': 'Twist as much as you can. You supersetted these with hammer curls.',
    'hammer-curl': 'Superset with curls: 8 kg × 15 last time.',
    'landmine-rotation': 'Your favourite, "bar left right". Last logged: one drop set at 30, 20 and 10 kg (Dec 2022).',
    'shadow-boxing': 'Predrag’s rounds: 20 s jabs, 20 s uppercuts, 20 s hooks, then 10 s rest. 3 rounds make a set. Do 3 sets.',
    'db-row': 'Your notes say 40 kg on the single-arm row. Start lighter in Week 1 and earn it back.',
    'pull-up': '5 strict reps × 4 sets in March 2022. That’s the first target to beat.',
    'overhead-press': 'Bar plus 5 kg per side × 4 sets in March 2022.',
    'back-extension': '12 × 3 to finish back day.'
  };
  Object.keys(C).forEach(function (k) { if (E[k]) E[k].predrag = C[k]; });
})(window.EXERCISES);
