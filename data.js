/* ============================================================
   HYROX CAIRO — SUB-80 PROGRAM DATA
   Program: 2026-07-06 (Mon, lead-in rest) -> 2026-11-16 (Mon), 19 weeks
   Rest days: every Monday & Friday (except race-week overrides)
   ============================================================ */

const PROGRAM_META = {
  raceName: "HYROX Cairo",
  raceDates: "Nov 14–15, 2026",
  goal: "Sub-80:00 finish",
  startDate: "2026-07-06",
  totalWeeks: 19
};

// weekday order starting Tuesday (matches the training week: Tue..Mon)
const WEEKDAY_ORDER = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
const SLOT_BY_WEEKDAY = { Tue: "A", Wed: "B", Thu: "C", Fri: "REST", Sat: "D", Sun: "E", Mon: "REST" };
const SLOT_TITLES = {
  A: "Lower Strength + Power",
  B: "Upper Strength + Plyo + Ski/Burpee Skill",
  C: "Posterior Chain + Pull Stations + Core",
  D: "Speed / Compromised Running / Simulation",
  E: "Aerobic Base + Sled/Lunge Skill + Mobility"
};

const GENERIC_REST = {
  title: "Rest Day",
  type: "REST",
  body: [
    "Full rest from structured training. This is not a throwaway day — it's where your body actually adapts to the work you just did.",
    "Optional (10–15 min): easy walk, light stretching, foam rolling quads/calves/forearms.",
    "Prioritize: sleep (7–9h), hydration, and protein-forward meals.",
    "If something feels achy or off, this is the day to address it — not push through it."
  ]
};

const LEAD_IN_REST = {
  title: "Program Start — Welcome",
  type: "REST",
  body: [
    "Your 19-week road to HYROX Cairo officially starts today. Today itself is a rest day — your first training session is tomorrow, Tuesday, and you'll train Tue/Wed/Thu/Sat/Sun each week with Monday and Friday as your standing rest days all the way to race day.",
    "Use today to get set up: read through the Complete Guide (race overview, station cues, sub-80 pacing targets), make sure you have the equipment you'll need, and set your sleep/nutrition habits before the real work begins.",
    "Sub-80 is a serious, achievable goal from here — one session at a time."
  ]
};

/* ============================================================
   GUIDE CONTENT
   ============================================================ */
const GUIDE = {
  overview: {
    title: "Race Overview",
    body: [
      "HYROX is 8km of running split into 8 x 1km segments, alternating with 8 functional stations, done in this fixed order:",
      "Run 1km → SkiErg 1000m → Run 1km → Sled Push 50m → Run 1km → Sled Pull 50m → Run 1km → Burpee Broad Jumps 80m → Run 1km → Rowing 1000m → Run 1km → Farmers Carry 200m → Run 1km → Sandbag Lunges 100m → Run 1km → Wall Balls (100 reps men's open / 75 women's open).",
      "Between each run and station is the 'Roxzone' — the transition area. Fumbling transitions is one of the easiest places to bleed time for free.",
      "Going sub-80 is a serious, competitive target (well ahead of mid-pack). It is won or lost less by any single station and more by: (1) a durable aerobic engine that keeps your run pace from decaying, (2) efficient technique that avoids no-reps and wasted motion, and (3) disciplined even pacing instead of heroics on run 1."
    ]
  },
  pacing: {
    title: "Sub-80 Pacing Targets (guideline)",
    intro: "These are reference splits to train around, not guarantees — adjust to your own strengths as the season goes on. They sum to roughly 69 minutes of 'working' time, leaving ~10 minutes of buffer for transitions, fatigue, and real-world variance versus a hard 80:00 cutoff.",
    rows: [
      ["Run 1 (1km)", "4:45"],
      ["SkiErg 1000m", "4:00"],
      ["Run 2 (1km)", "4:50"],
      ["Sled Push 50m", "1:45"],
      ["Run 3 (1km)", "4:55"],
      ["Sled Pull 50m", "2:00"],
      ["Run 4 (1km)", "5:00"],
      ["Burpee Broad Jumps 80m", "4:00"],
      ["Run 5 (1km)", "5:00"],
      ["Rowing 1000m", "4:00"],
      ["Run 6 (1km)", "5:00"],
      ["Farmers Carry 200m", "1:40"],
      ["Run 7 (1km)", "5:00"],
      ["Sandbag Lunges 100m", "3:00"],
      ["Run 8 (1km)", "5:00"],
      ["Wall Balls (100 reps)", "5:00"],
      ["Roxzone transitions (8x)", "~4:00 total"]
    ]
  },
  stations: [
    {
      id: "skierg", name: "1. SkiErg — 1000m", target: "~4:00",
      cues: "Hinge from the hips like a mini rowing stroke. Engage lats and use body weight to drive the pull down, not just your arms. Full extension at the top, quick relaxed recovery.",
      mistake: "Arms-only pulling (no hip hinge) — torches your shoulders and forearms in minutes. Also: sprinting the first 200m then fading hard.",
      fix: "Wednesday sessions include dedicated SkiErg technique/interval work. Thursday's deadlift pattern builds the hip-hinge strength that actually drives the pull. Sunday's aerobic work builds the capacity to hold pace."
    },
    {
      id: "sledpush", name: "2. Sled Push — 50m", target: "~1:45",
      cues: "Low shin angle like a sprinter's start, short choppy steps, arms locked out, drive through the whole foot, head neutral (not staring at the ground).",
      mistake: "Standing too upright (kills your leverage), overstriding, holding your breath, letting the sled zig-zag sideways and wasting horizontal force.",
      fix: "Sunday sled push technique blocks build the movement pattern. Tuesday's squat-pattern strength work builds the raw leg drive."
    },
    {
      id: "sledpull", name: "3. Sled Pull — 50m", target: "~2:00",
      cues: "Hand-over-hand on the rope, sit back into a hip hinge, drive your legs backward in controlled steps, keep the rope taut at all times, pull with lats not biceps.",
      mistake: "Pulling with arms/biceps only (fried forearms fast), standing too upright and losing leverage, letting the rope go slack between pulls (dead lengths of rope = wasted motion).",
      fix: "Thursday's posterior-chain + pull-station work and grip/forearm carries directly build this. The hip-hinge pattern from your deadlift work transfers straight across."
    },
    {
      id: "burpee", name: "4. Burpee Broad Jumps — 80m", target: "~4:00",
      cues: "Chest fully to the floor (a shallow squat-thrust is a no-rep in competition), jump forward for distance not height, land soft, reset immediately into a repeatable rhythm.",
      mistake: "Jumping for height/showmanship instead of distance, skipping full chest-to-ground contact, sprinting the first 20m then crawling the rest.",
      fix: "Wednesday/Saturday sessions groove the pattern and pacing. Plyometric work (broad jumps, tuck jumps, pogos) builds the explosiveness and elasticity that make each rep cheaper."
    },
    {
      id: "row", name: "5. Rowing — 1000m", target: "~4:00",
      cues: "Same legs-hips-arms sequence as SkiErg but seated: drive with the legs first, quick hands away on the recovery, hold a consistent stroke rate rather than a few huge pulls.",
      mistake: "All-arms rowing that burns out the shoulders, erratic pacing (sprint-then-die), poor sequencing that wastes power on every stroke.",
      fix: "Thursday rowing repeats, your aerobic base work, and the leg-drive strength from squats/deadlifts all feed this station directly."
    },
    {
      id: "farmers", name: "6. Farmers Carry — 200m", target: "~1:40",
      cues: "Tall posture, ribs down (braced core), relaxed shoulders and traps, quick controlled steps, eyes forward not down at your feet.",
      mistake: "Death-gripping and stopping to put the weights down and rest — moving slightly slower but never stopping is almost always faster. Also: rounding the back, shuffling too cautiously.",
      fix: "Thursday's progressive farmers carry loading plus dedicated grip/forearm endurance work and core bracing practice."
    },
    {
      id: "lunges", name: "7. Sandbag Lunges — 100m", target: "~3:00",
      cues: "Upright torso, controlled knee-to-ground contact on every rep, sandbag locked in tight on the back/shoulders, consistent stride length, rhythmic breathing.",
      mistake: "Rushing and losing balance/form, letting the bag slide forward (rounds your back), slamming the knee down hard out of fatigue instead of a controlled tap.",
      fix: "Sunday sandbag lunge technique blocks, plus the unilateral leg strength (split squats, RFE work) that runs through the entire program, plus hip/ankle mobility work."
    },
    {
      id: "wallballs", name: "8. Wall Balls — 100 reps (men's open)", target: "~5:00",
      cues: "Full hip-to-toe extension drives the throw — legs do the work, arms just guide it. Catch and immediately descend into the next rep, no pause at the top. Hit the target every time (a missed target is a no-rep).",
      mistake: "Squatting too shallow (no-reps under fatigue), all-arms throwing that fries the shoulders fast, going unbroken too aggressively early and then needing long rest breaks later in the set.",
      fix: "Tuesday/Wednesday wall ball technique and volume work, leg endurance from squat work, and — critically — practicing a *planned* broken-set strategy (e.g. sets of 20–25) rather than hoping to go unbroken and blowing up."
    }
  ],
  mistakes: {
    title: "Common Training Mistakes to Avoid",
    items: [
      "Neglecting the aerobic base for pure gym strength — HYROX is won by a durable engine. Don't skip the Sunday zone-2 work even when it feels 'too easy'.",
      "Never practicing 'compromised running' (running on fatigued legs right after a station). Training runs fresh-only doesn't prepare you for how a 1km feels after a sled push — the Saturday sessions exist specifically to fix this.",
      "Skipping roxzone transition practice. Losing 10–20 seconds per station to fumbling gear or hesitating adds up to minutes over 8 stations.",
      "Going too heavy, too early on strength work and risking injury mid-program. Follow the progressive load — don't max out in week 2.",
      "Ignoring grip and forearm endurance. Farmers carry, sled pull, and wall balls all punish a weak grip long before your legs or lungs give out.",
      "Training at 100% effort every single session. You also need to rehearse actual race pace (a sustainable RPE 7–8), not just hero workouts — pacing is a trainable skill.",
      "Skipping mobility and recovery. Accumulated tightness from running + lifting + stations without mobility work is how niggles turn into real injuries.",
      "Experimenting with new nutrition on race week. Never try a new gel, drink, or breakfast on race day — test your fueling strategy during long training sessions well in advance.",
      "Skipping deload weeks. Continuous hard training without a lighter week leads to burnout or injury. This program has built-in deloads (weeks 5, 10, 15) plus a full taper — respect them.",
      "Undertraining single-leg / unilateral strength. Running economy and the lunge/carry stations depend on single-leg strength and stability, not just your bilateral squat number."
    ]
  },
  mobility: {
    title: "Mobility & Recovery",
    items: [
      "Daily (5–10 min): ankle dorsiflexion rocks, 90/90 hip switches, thoracic rotations, couch stretch for the hip flexors — especially important given the lunge and running volume in this program.",
      "After leg days: foam roll quads, calves, glutes; hamstring floss.",
      "Grip/forearm recovery: wrist flexor/extensor stretches and a forearm massage ball, especially after Farmers Carry / Sled Pull days.",
      "Sleep: aim for 7–9 hours, especially the night before Saturday's big session.",
      "Deload weeks (5, 10, 15, and the full taper): treat these as mandatory, not optional. This is literally where the adaptation happens — the hard weeks just create the stimulus.",
      "Weekly non-negotiable: at least one full mobility flow, even during the taper when everything else is quiet."
    ]
  },
  qualities: {
    title: "Athletic Qualities — What This Plan Is Actually Building",
    items: [
      ["Agility", "The ability to change direction quickly under control. Built via shuttle sprints, side shuffles, and backward runs in the Saturday sessions."],
      ["Speed", "Raw sprint capacity. Built via short sprint drills (5/10/15m), tempo runs, and race-pace run intervals."],
      ["Coordination", "Your nervous system's ability to sequence movement efficiently. Built via pogo hops, skipping drills, and the complex warm-ups that open every session."],
      ["Explosiveness", "Rate of force development. Built via jump variations (box jumps, broad jumps, split-squat jumps), plyometric push-ups, and medicine ball throws."],
      ["Elasticity", "Your tendons' and muscles' ability to store and release energy (the stretch-shortening cycle). Built via pogo hops, depth jumps, and hurdle jumps."],
      ["Readiness", "How prepared your nervous system and tissues are to perform on demand. Built via structured warm-ups, real recovery, and the taper before race day."],
      ["Strength", "Force production capacity. Built via heavy compound lifts (squat, deadlift, bench, row patterns) that progress across all four phases."],
      ["Aerobic Base", "Your engine's capacity to sustain effort and recover between efforts. Built via zone-2 running/machine cardio, station-to-run transitions, and the conditioning finishers threaded through the whole program."]
    ]
  },
  raceWeek: {
    title: "Race Week & Race Day Checklist",
    items: [
      "Gear: shoes broken in (never new), grip gloves/chalk if you trained with them, HYROX-legal kit, watch, hydration plan sorted.",
      "Warm-up: 10 min easy jog + dynamic mobility (leg swings, walking lunges, hip openers) + a few strides + a light SkiErg/row primer + a handful of easy wall ball reps and burpee broad jumps if the venue allows it.",
      "Pacing: stick to your planned even splits (~4:45–5:00/km). Do not sprint run 1 — settle into rhythm by run 2 and hold it.",
      "Fueling: familiar pre-race breakfast 2–3h out, sip fluids/electrolytes throughout, use a gel/chews only if you've trained with them. Nothing new on race day.",
      "Mental cues: 'smooth and relaxed.' Break each station into manageable chunks (e.g. wall balls in planned sets of 20–25). Focus on the next 1km, not the whole race.",
      "Post-race: easy walk, refuel with protein + carbs within an hour, hydrate, light mobility that evening, sleep."
    ]
  }
};
