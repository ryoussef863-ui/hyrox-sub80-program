/* ============================================================
   PHASES — workout templates, progression rules, and the fully
   custom week-by-week content for the taper/race phase.
   ============================================================ */

// Helper to build a block quickly
function blk(section, structure, goal, items) {
  return { section, structure, goal, items };
}

const PHASES = [
  {
    id: 1,
    name: "Foundation & Aerobic Base",
    weeks: [1, 5],
    color: "#3b82f6",
    focus: "Build the aerobic engine, groove clean movement patterns, and introduce all 8 Hyrox stations with light loads so technique is automatic before load and fatigue get added later.",
    templates: {
      A: {
        title: "Lower Strength + Wall Ball Skill",
        blocks: [
          blk("Warm-Up", "3 rounds – circuit style (1 min rest)", "Activate full body, raise core temperature", [
            "Cross Connect Forward-to-Reverse Lunge – 5 reps/leg",
            "Hanging Knee Raise – 12 reps",
            "Alternating Bent-Over Row – 10 reps/arm"
          ]),
          blk("Strength", "3 rounds – superset (2 min rest)", "Build bilateral leg strength with a power carryover", [
            "Barbell Back Squat – 6 reps (heavy for clean form)",
            "Box Jump (step down) – 5 reps"
          ]),
          blk("Hyrox Skill — Wall Balls", "4 rounds (90 sec rest)", "Groove the pattern early: full leg extension, catch-and-go rhythm, no pause at the bottom", [
            "Wall Ball – 12 reps"
          ]),
          blk("Conditioning", "5–8 rounds (based on fitness level)", "Build aerobic power and recovery capacity", [
            "High Effort Run/Bike/Row/Ski – 40 sec",
            "Recovery Pace – 80 sec"
          ]),
          blk("Accessories", "3 rounds – circuit style (1:30 rest)", "General upper/lower hypertrophy base", [
            "Dumbbell Bench Press – 15 reps",
            "Lat Pulldown – 15 reps",
            "Leg Extension – 15 reps"
          ])
        ]
      },
      B: {
        title: "Upper Strength + Plyo + SkiErg/Burpee Skill",
        blocks: [
          blk("Warm-Up — Plyometrics (sub-max)", "2 sets each", "Coordination, elasticity, readiness for explosive movement", [
            "Linear Pogos – 20 reps",
            "Side-to-Side Pogos – 10 reps/leg",
            "Alternating Pogos – 10 reps/leg",
            "Single-Leg Hops in Place – 15 reps/leg"
          ]),
          blk("Strength", "3 rounds (2 min rest)", "Pressing strength + explosiveness", [
            "Barbell Bench Press – 5 reps (heavy)",
            "Bench Plyometric Push-Ups – 5 reps",
            "Medicine Ball Chest Pass – 8 reps",
            "Banded Pull-Apart – 12 reps"
          ]),
          blk("Hyrox Skill — SkiErg & Burpee Broad Jump", "4 rounds", "Engrain correct technique at low fatigue before load gets added", [
            "SkiErg – 250m controlled/moderate pace, hip-hinge driven",
            "Burpee Broad Jump – 8 reps, chest-to-deck, jump forward not up"
          ]),
          blk("Accessories", "3 rounds – circuit style (1:30 rest)", "Single-leg power, upper body strength, pulling control", [
            "Rear Foot Elevated (RFE) Split Squat Jumps – 15 reps",
            "Incline Bench Press – 15 reps",
            "Single-Arm Low Cable Row – 15 reps/arm"
          ])
        ]
      },
      C: {
        title: "Posterior Chain + Pull Stations + Core",
        blocks: [
          blk("Warm-Up", "3 rounds – circuit style (1 min rest)", "Activate posterior chain and core stability", [
            "Hip Bridge Long Lever – 10 reps",
            "Single-Leg Romanian Deadlift (RDL) – 10 reps/leg",
            "Straight Arm Lat Pulls – 10 reps"
          ]),
          blk("Strength", "3 rounds – superset (2 min rest)", "Posterior chain strength and power endurance", [
            "Deadlift with 2-sec Pause Below Knee – 5 reps (heavy)",
            "Kettlebell Swings – 8 reps"
          ]),
          blk("Hyrox Skill — Farmers Carry, Sled Pull & Row", "4 rounds", "Introduce technique for all three pulling/carrying stations", [
            "Farmers Carry – 40m moderate load, tall posture, braced core",
            "Sled Pull – 25m light-moderate, hand-over-hand, sit back into the hinge",
            "Rowing – 300m moderate pace, legs-hips-arms sequencing"
          ]),
          blk("Accessories", "3 rounds – circuit style (1:30 rest)", "Core, hamstrings, and upper pushing patterns", [
            "Hamstring Curl – 15 reps",
            "Alternating Floor Press – 15 reps/arm",
            "Oblique Cable Crunch – 15 reps/side"
          ]),
          blk("Optional Cardio", "1 set", "Maintain aerobic base through steady effort", [
            "Machine Cardio (row, ski, or bike) – 20 min easy"
          ])
        ]
      },
      D: {
        title: "Speed & Agility",
        blocks: [
          blk("Warm-Up", "3 rounds", "Move dynamically, prepare sprinting mechanics", [
            "A-Skip – 20 reps",
            "Side Shuffle – 30 sec",
            "Backward Run – 30 sec"
          ]),
          blk("Conditioning", "4 rounds (2 min rest)", "Maintain a high, sustainable pace across all intervals — weeks 1–3 keep this as pure speed work; weeks 4–5 add the finisher below to start introducing running on tired legs", [
            "Sprint 5m, 10m, 15m out-and-back (one after the other)"
          ]),
          blk("Compromised Running Finisher (Weeks 4–5 only)", "3 rounds (2 min rest)", "First taste of running combined with a station — the core Hyrox skill", [
            "Easy-Moderate Run – 1km",
            "Sandbag Lunges – 20m"
          ]),
          blk("Accessories", "3 rounds – circuit style (2 min rest)", "Shoulder girdle strength and stability", [
            "Shoulder Press – 15 reps",
            "Dumbbell Side Raises – 15 reps",
            "Rear Delt Flies – 15 reps"
          ]),
          blk("Accessories 2", "3 rounds – circuit style (2 min rest)", "Hip stabilizers and core control", [
            "Copenhagen Raises – 15 reps",
            "Kettlebell Goblet Marches – 15 reps",
            "Lateral Band Walk – 30 sec"
          ])
        ]
      },
      E: {
        title: "Aerobic Base + Sled Push/Sandbag Lunge Skill + Mobility",
        blocks: [
          blk("Aerobic Base", "1 continuous effort", "Build the aerobic engine underneath the entire race — nose-breathing, conversational effort", [
            "Easy Run or Machine Cardio – {LONGRUN}"
          ]),
          blk("Hyrox Skill — Sled Push & Sandbag Lunges", "1 set", "Groove technique: low shin angle, short powerful steps for the push; upright torso, controlled knee-tap for lunges", [
            "Sled Push – 4 x 15m light-moderate",
            "Sandbag Lunges – 3 x 20m light"
          ]),
          blk("Mobility & Recovery Flow", "10–15 min", "Address the tissues this program leans on most", [
            "Hip Flexor Stretch",
            "Ankle Dorsiflexion Rocks",
            "Thoracic Rotations",
            "Foam Roll — Quads & Calves"
          ])
        ]
      }
    },
    progression: {
      1: { label: "Baseline Week", rpe: "RPE 6–7", note: "Establish clean technique and honest baseline loads/times. Don't chase numbers yet — chase form." },
      2: { label: "Build Week", rpe: "RPE 7", note: "Add ~5–10% load or 1 extra round versus Week 1. Keep every rep crisp." },
      3: { label: "Build Week", rpe: "RPE 7–8", note: "Add another 5–10% load, or cut rest by ~15–20 sec. Push the pace on conditioning pieces." },
      4: { label: "Peak Load Week", rpe: "RPE 8–9", note: "The heaviest/hardest week of this block. Aim to hit your best loads and paces for Phase 1." },
      5: { label: "Deload / Transition Week", rpe: "RPE 5–6", note: "Cut volume ~30%. Moderate intensity only. Arrive at Phase 2 fully recovered, not just surviving." }
    },
    longRun: { 1: "25 min", 2: "30 min", 3: "35 min", 4: "40 min", 5: "25 min easy" }
  },

  {
    id: 2,
    name: "Strength & Power Build",
    weeks: [6, 10],
    color: "#f59e0b",
    focus: "Increase loads across the board, build station-specific strength (heavier sled work, farmers carries, wall ball volume), add real explosive power, and introduce compromised running.",
    templates: {
      A: {
        title: "Unilateral Lower Strength + Wall Ball Volume",
        blocks: [
          blk("Warm-Up", "3 rounds – circuit style (1 min rest)", "Activate full body, raise core temperature", [
            "Cross Connect Forward-to-Reverse Lunge – 5 reps/leg",
            "Hanging Knee Raise – 12 reps",
            "Alternating Bent-Over Row – 10 reps/arm"
          ]),
          blk("Strength", "4 rounds – superset (2 min rest)", "Build single-leg strength with added power development", [
            "Reverse Lunge – 5 reps/leg (heavy for clean form)",
            "Weighted Jumping Split Squat – 5 reps/leg"
          ]),
          blk("Hyrox Skill — Wall Balls", "5 rounds", "Build volume capacity and, where possible, ball weight", [
            "Wall Ball – 15 reps unbroken"
          ]),
          blk("Conditioning", "5–8 rounds (based on fitness level)", "Push to ~80% of max effort on the work interval", [
            "High Effort Run – 30 sec",
            "Recovery Pace – 90 sec"
          ]),
          blk("Accessories", "3–4 rounds – circuit style (1:30 rest)", "Maintain upper/lower hypertrophy and control", [
            "Dumbbell Bench Press – 15 reps",
            "Lat Pulldown – 15 reps",
            "Leg Extension – 15 reps"
          ])
        ]
      },
      B: {
        title: "Upper Power + Plyo + SkiErg/Burpee Race-Pace",
        blocks: [
          blk("Warm-Up — Plyometrics", "2 sets each, increased volume", "Coordination, elasticity, readiness for explosive movement", [
            "Linear Pogos – 20 reps",
            "Side-to-Side Pogos – 20 reps/leg",
            "Alternating Pogos – 20 reps/leg",
            "Single-Leg Hops in Place – 15 reps/leg"
          ]),
          blk("Strength", "3 rounds (2 min rest)", "Upper body maximal strength and speed", [
            "Barbell Bench Press – 3 reps (heavy)",
            "Bench Plyometric Push-Ups – 5 reps",
            "Medicine Ball Chest Pass – 8 reps",
            "Banded Pull-Apart – 12 reps"
          ]),
          blk("Hyrox Skill — SkiErg & Burpee Broad Jump", "5 rounds (90 sec rest)", "Race-pace effort now, not just technique", [
            "SkiErg – 300–400m at race-pace effort",
            "Burpee Broad Jump – 10 reps continuous, minimal pause"
          ]),
          blk("Accessories", "3 rounds – circuit style (1:30 rest)", "Reinforce single-leg power, pushing strength, rowing control", [
            "Rear Foot Elevated (RFE) Split Squat Jumps (light) – 15 reps",
            "Incline Bench Press – 15 reps",
            "Single-Arm Cable Row – 15 reps/arm"
          ])
        ]
      },
      C: {
        title: "Posterior Chain + Heavier Pull Stations + Grip",
        blocks: [
          blk("Warm-Up", "3 rounds – circuit style (1 min rest)", "Prime posterior chain and motor control", [
            "Hip Bridge Long Lever – 10 reps",
            "Single-Leg Romanian Deadlift (RDL) – 10 reps/leg",
            "Straight Arm Lat Pulls – 10 reps"
          ]),
          blk("Strength", "4 rounds – superset (2 min rest)", "Unilateral strength and hip explosiveness", [
            "Kettlebell Single-Leg Deadlift – 5 reps/leg",
            "Kettlebell Swings – 8 reps"
          ]),
          blk("Hyrox Skill — Farmers Carry, Sled Pull & Row", "5 rounds", "Increase load ~5–10% week over week vs your Phase 1 numbers", [
            "Farmers Carry – 50m, heavier load",
            "Sled Pull – 25m moderate-heavy",
            "Rowing – 400m moderate-hard, negative-split focus"
          ]),
          blk("Grip Finisher", "3 rounds", "Direct grip/forearm endurance for carries and pulls", [
            "Dead-Hang or Plate Pinch Hold – 20–30 sec"
          ]),
          blk("Accessories", "4 rounds – circuit style (1:30 rest)", "Posterior chain, core stability, pressing mechanics", [
            "Hamstring Curl – 15 reps",
            "Alternating Floor Press – 15 reps/arm",
            "Oblique Cable Crunch – 15 reps/side"
          ]),
          blk("Optional Cardio", "1 set", "Aerobic capacity at a low, steady pace", [
            "Long Run – 4–6 km easy"
          ])
        ]
      },
      D: {
        title: "Tempo Running → Compromised Running Ladder",
        blocks: [
          blk("Warm-Up", "3 rounds + prep block", "Prepare for directional speed and high-tempo footwork", [
            "A-Skip – 20 reps",
            "Side Shuffle – 30 sec",
            "Backward Run – 30 sec",
            "Banded High Knees – 30 sec on/off x5"
          ]),
          blk("Conditioning (Weeks 6–7)", "4 rounds (2:30 rest)", "Train tempo running under fatigue with consistent pacing", [
            "Medium-High Pace Run – 5 min"
          ]),
          blk("Compromised Running Ladder (Weeks 8–10)", "2 rounds", "The signature Hyrox skill: running immediately off the back of a station", [
            "Run – 1km",
            "Sled Push – 20m",
            "Run – 1km",
            "Wall Balls – 15 reps"
          ]),
          blk("Accessories", "4 rounds – circuit style (1 min rest)", "Groin, core, and locomotor control", [
            "Weighted Copenhagen Raises – 15 reps",
            "Kettlebell Goblet Marches – 15 reps",
            "Lateral Band Walk – 30 sec"
          ]),
          blk("Accessories 2", "3 rounds – circuit style (1:30 rest)", "Shoulder control and overhead stability", [
            "Half-Kneeling One-Arm Alternating Press – 12 reps/side",
            "Dumbbell Side Raises – 12–15 reps",
            "Rear Delt Flies – 12–15 reps"
          ])
        ]
      },
      E: {
        title: "Longer Aerobic Base + Sled Push/Sandbag Lunge Skill",
        blocks: [
          blk("Aerobic Base", "1 continuous effort (or 2x split)", "Build duration in the aerobic engine", [
            "Easy Run or Machine Cardio – {LONGRUN}"
          ]),
          blk("Hyrox Skill — Sled Push & Sandbag Lunges", "1 set", "Moderate-heavy loads now that technique is established", [
            "Sled Push – 5 x 20m moderate-heavy",
            "Sandbag Lunges – 4 x 30m moderate load"
          ]),
          blk("Mobility & Recovery Flow", "10–15 min", "Add thoracic and hip-flexor focus for the increased lunge/push volume", [
            "Couch Stretch (Hip Flexors)",
            "Thoracic Opener",
            "Ankle Dorsiflexion Rocks",
            "Foam Roll — Quads & Calves"
          ])
        ]
      }
    },
    progression: {
      1: { label: "Baseline Week", rpe: "RPE 6–7", note: "Re-establish baseline at the new, heavier phase intensity. Technique first." },
      2: { label: "Build Week", rpe: "RPE 7", note: "Add ~5–10% load or 1 extra round versus Week 6." },
      3: { label: "Build Week", rpe: "RPE 7–8", note: "Add another 5–10% load, or cut rest by ~15–20 sec." },
      4: { label: "Peak Load Week", rpe: "RPE 8–9", note: "The heaviest/hardest week of this block. Hit your best Phase 2 numbers." },
      5: { label: "Deload / Transition Week", rpe: "RPE 5–6", note: "Cut volume ~30%. Moderate intensity only — arrive at Phase 3 fresh." }
    },
    longRun: { 1: "35 min", 2: "40 min", 3: "45 min", 4: "50 min", 5: "30 min easy" }
  },

  {
    id: 3,
    name: "Hyrox-Specific Race Prep",
    weeks: [11, 15],
    color: "#ef4444",
    focus: "Shift from general strength to race execution: race-pace intervals, roxzone transition drills, and full/half Hyrox simulations at increasing intensity, building straight toward your sub-80 target.",
    templates: {
      A: {
        title: "Explosive Lower Strength + Wall Ball Race Pace",
        blocks: [
          blk("Warm-Up", "3 rounds – circuit style (1 min rest)", "Mobilize hips, activate core, prepare upper back", [
            "Side Lunge to Curtsey Lunge – 5 reps/leg",
            "V-Ups – 12 reps",
            "Alternating Dumbbell Row – 10 reps/arm"
          ]),
          blk("Strength", "4 rounds – superset (2 min rest)", "Controlled strength and explosive power from a split stance", [
            "Back Rack RFE Split Squat – 5 reps/leg (heavy with control)",
            "RFE Split Squat Box Jumps – 5 reps/leg"
          ]),
          blk("Hyrox Skill — Wall Balls at Race Pace", "3 rounds", "Practice your actual race strategy: a planned broken-set pace, not a hero unbroken attempt", [
            "Wall Ball – 25 reps at race pace, break early and often on purpose"
          ]),
          blk("Conditioning", "5–8 rounds (based on fitness level, 2 min rest)", "Maximize top speed while maintaining form under fatigue", [
            "Sprint 5m, 10m, 15m out-and-back, twice each"
          ]),
          blk("Accessories", "3–4 rounds – 45 sec work/30 sec rest", "Sustain hypertrophy and endurance under moderate fatigue", [
            "Dumbbell Bench Press – 15 reps",
            "Lat Pulldown – 15 reps",
            "Leg Extension – 15 reps"
          ])
        ]
      },
      B: {
        title: "Max Explosiveness + SkiErg/Burpee Time Trial + Roxzone Drill",
        blocks: [
          blk("Warm-Up — Intensive Plyometrics", "3 sets each", "Prepare the body for maximal explosive output", [
            "Intensive Pogos – 15 reps",
            "Tuck Jumps – 10 reps/leg",
            "Broad Jumps – 5 reps"
          ]),
          blk("Push Prep", "3 rounds", "Activate and prime pressing muscles for power work", [
            "Plyometric Bench Push-Ups – 6 reps",
            "Medicine Ball Chest Pass – 8 reps",
            "Banded Pull-Apart – 10 reps"
          ]),
          blk("Strength", "10 min EMOM", "Reinforce upper body strength under a time constraint", [
            "Bench Press – 1 rep (heavy, 80–90% max)"
          ]),
          blk("Hyrox Skill — SkiErg & Burpee Broad Jump Time Trial", "1 set each (3 min rest between)", "Know your real numbers against the sub-80 targets (SkiErg ~4:00, Burpee Broad Jump ~4:00)", [
            "SkiErg – 1000m for time",
            "Burpee Broad Jump – 80m for time"
          ]),
          blk("Roxzone Transition Drill", "4 rounds", "Transitions are free time if you rehearse them — sprint in, minimal setup, explosive first reps", [
            "Sprint into 'station', 10 sec transition, 5 explosive reps of any station movement"
          ])
        ]
      },
      C: {
        title: "Posterior Chain + Pull Station Time Trials",
        blocks: [
          blk("Warm-Up", "3 rounds – circuit style (1 min rest)", "Prepare posterior chain, improve core activation", [
            "Hip Bridge Long Lever Marches – 8 reps/leg",
            "Romanian Deadlift (RDL) to Row – 10 reps/leg",
            "Straight Arm Lat Pulls – 10 reps"
          ]),
          blk("Strength", "4 rounds – giant set (2 min rest)", "Maximize hip power and full-body explosiveness", [
            "Halting Deadlift – 5 reps (heavy, no ground contact)",
            "Banded Kettlebell Swings – 8 reps",
            "Depth Jump to Double Broad Jump – 2 reps"
          ]),
          blk("Hyrox Skill — Farmers Carry & Sled Pull Time Trials", "1 set each (3 min rest between)", "Know your real numbers against the sub-80 targets (Farmers Carry ~1:40, Sled Pull ~2:00)", [
            "Farmers Carry – 200m for time",
            "Sled Pull – 50m for time"
          ]),
          blk("Rowing", "1 set or 2x500m", "Race-pace rowing capacity (target ~4:00 for 1000m)", [
            "Rowing – 1000m time trial, or 2 x 500m race-pace repeats"
          ]),
          blk("Accessories", "4 rounds – circuit style (1:30 rest)", "Posterior chain, pressing, and oblique power", [
            "Hamstring Curl – 15 reps",
            "Alternating Floor Press – 15 reps/arm",
            "High-to-Low Oblique Rotation – 15 reps/side"
          ]),
          blk("Optional Cardio", "1 set", "Maintain aerobic capacity with moderate intensity", [
            "Any Cardio Machine – 20 min (bike, row, or ski)"
          ])
        ]
      },
      // D handled via specialD below (unique content per week)
      E: {
        title: "Race-Pace Long Aerobic + Sandbag Lunge/Sled Time Trial",
        blocks: [
          blk("Aerobic / Race-Pace Work", "1 set", "Alternate weeks between building duration and rehearsing goal pace", [
            "Either: Long Easy Run – {LONGRUN}",
            "Or: 4 x 2km @ goal race pace (~4:45–5:00/km), 90 sec rest between"
          ]),
          blk("Hyrox Skill — Sandbag Lunges & Sled Push", "1 set", "Know your Sandbag Lunges number against the sub-80 target (~3:00)", [
            "Sandbag Lunges – 100m for time",
            "Sled Push – technique-speed reps, moderate-heavy load"
          ]),
          blk("Mobility & Recovery Flow", "10–15 min", "Non-negotiable — this is peak accumulated fatigue territory", [
            "Full lower-body mobility flow",
            "Foam Roll — full body",
            "Forearm/grip release"
          ])
        ]
      }
    },
    // Unique Saturday sessions across the 5 weeks of Phase 3 — the most important sessions in the whole program
    specialD: {
      11: {
        title: "Half Hyrox Simulation A (~70% intensity)",
        blocks: [
          blk("Warm-Up", "10 min", "Full-body prep — you're about to simulate race demand", [
            "Easy jog + dynamic mobility + a few strides"
          ]),
          blk("Half Hyrox Simulation", "1 set, log total time", "First simulation of the block — controlled pace, clean technique, get comfortable with the format", [
            "Run 1km → Sled Push 25m (light-moderate) → Run 1km → Burpee Broad Jump 40m → Run 1km → Farmers Carry 100m → Run 1km → Wall Balls 50 reps"
          ]),
          blk("Cool-Down", "10 min", "Easy walk + mobility", ["Easy walk + light stretching"])
        ]
      },
      12: {
        title: "Half Hyrox Simulation B (~80% intensity, faster)",
        blocks: [
          blk("Warm-Up", "10 min", "Full-body prep", ["Easy jog + dynamic mobility + a few strides"]),
          blk("Half Hyrox Simulation", "1 set, log total time — beat Week 11", "Same format, higher intensity — push pace closer to your goal splits", [
            "Run 1km → Sled Push 25m → Run 1km → Burpee Broad Jump 40m → Run 1km → Farmers Carry 100m → Run 1km → Wall Balls 50 reps"
          ]),
          blk("Cool-Down", "10 min", "Easy walk + mobility", ["Easy walk + light stretching"])
        ]
      },
      13: {
        title: "FULL Hyrox Simulation #1 (~85–90% intensity)",
        blocks: [
          blk("Warm-Up", "15 min", "This is the biggest session so far — warm up properly", ["Easy jog + full dynamic mobility + strides + light station primers"]),
          blk("Full Hyrox Simulation", "All 8 stations, 8 x 1km runs — log total time and every split", "Dress rehearsal #1. Scale reps/distance to ~80–90% if needed — the goal is completing the full sequence and learning your pacing, not a max-effort race", [
            "Run 1km → SkiErg 1000m → Run 1km → Sled Push 50m → Run 1km → Sled Pull 50m → Run 1km → Burpee Broad Jump 80m → Run 1km → Row 1000m → Run 1km → Farmers Carry 200m → Run 1km → Sandbag Lunges 100m → Run 1km → Wall Balls 100 reps"
          ]),
          blk("Cool-Down", "15 min", "Full recovery protocol", ["Easy walk + full mobility flow + refuel immediately"])
        ]
      },
      14: {
        title: "Compromised Running Ladder — Race Pace, Heavy Stations",
        blocks: [
          blk("Warm-Up", "10 min", "Dynamic prep", ["Easy jog + dynamic mobility + strides"]),
          blk("Compromised Running Ladder", "4 rounds, rest 2 min between", "Rebuild running legs under heavier station load — this is where sub-80 pacing gets rehearsed hardest", [
            "Run 1km @ goal race pace",
            "Sled Push 25m (heavy) or Farmers Carry 100m (alternate rounds)"
          ]),
          blk("Finisher", "1 set", "Top off grip/leg endurance", ["Wall Balls – 40 reps for time"]),
          blk("Cool-Down", "10 min", "Recovery", ["Easy walk + mobility"])
        ]
      },
      15: {
        title: "Deload — Light Half-Simulation",
        blocks: [
          blk("Warm-Up", "10 min", "Easy prep, no urgency this week", ["Easy jog + mobility"]),
          blk("Light Half Simulation", "1 set, easy pace only — RPE 6", "Deload week: keep the pattern familiar, remove the fatigue. Recovery is the priority before Phase 4", [
            "Run 1km → Sled Push 25m (light) → Run 1km → Wall Balls 30 reps (easy)"
          ]),
          blk("Cool-Down", "10 min", "Full recovery", ["Easy walk + full mobility flow"])
        ]
      }
    },
    progression: {
      1: { label: "Simulation Week 1", rpe: "RPE 6–7", note: "Half simulation A — controlled pace, clean technique." },
      2: { label: "Simulation Week 2", rpe: "RPE 7", note: "Half simulation B — push pace closer to race goal." },
      3: { label: "Full Simulation Week", rpe: "RPE 8", note: "First full 8-station simulation — a dress rehearsal, not a max effort." },
      4: { label: "Race-Pace Week", rpe: "RPE 8–9", note: "Heaviest compromised-running week of the whole program." },
      5: { label: "Deload Week", rpe: "RPE 5–6", note: "Cut volume ~30–40%. Full recovery before the final push in Phase 4." }
    },
    longRun: { 1: "45 min easy", 2: "50 min easy", 3: "4x2km @ race pace", 4: "4x2km @ race pace", 5: "35 min easy" }
  }
];

/* ============================================================
   PHASE 4 — Peak, Taper & Race (fully custom, week by week)
   ============================================================ */
const PHASE_4 = {
  id: 4,
  name: "Peak, Taper & Race",
  weeks: [16, 19],
  color: "#8b5cf6",
  focus: "One final full-intensity test, then a real taper: cut volume hard while keeping just enough sharpness, and arrive at Cairo rested, confident, and ready to execute your pacing plan.",
  customWeeks: {
    16: {
      label: "Peak Simulation Week",
      A: { title: "Lower Strength (Moderate)", blocks: [
        blk("Warm-Up", "3 rounds", "Standard full-body activation", ["Cross Connect Lunge – 5/leg", "Hanging Knee Raise – 12", "Alternating Bent-Over Row – 10/arm"]),
        blk("Strength", "3 rounds (2 min rest)", "Moderate load — protect the legs for Saturday's big test", ["Barbell Back Squat – 6 reps @ ~75–80% of recent best"]),
        blk("Accessories", "2 rounds", "Light maintenance only", ["Dumbbell Bench Press – 12 reps", "Lat Pulldown – 12 reps"])
      ]},
      B: { title: "Upper Maintenance + Sharpening", blocks: [
        blk("Warm-Up", "1 set", "Short and crisp", ["Linear Pogos – 20", "Tuck Jumps – 8"]),
        blk("Strength", "3 rounds", "Maintain, don't chase new maxes this week", ["Barbell Bench Press – 5 reps moderate"]),
        blk("Hyrox Skill — SkiErg/Burpee Sharpening", "3 rounds, short and crisp", "Feel fast, not tired — this is priming, not building", ["SkiErg – 250m @ race pace", "Burpee Broad Jump – 8 reps crisp"])
      ]},
      C: { title: "Posterior Chain + Pull Stations (Moderate)", blocks: [
        blk("Warm-Up", "3 rounds", "Standard posterior prep", ["Hip Bridge Long Lever – 10", "Single-Leg RDL – 10/leg"]),
        blk("Strength", "3 rounds", "Moderate load", ["Deadlift – 5 reps @ ~75% of recent best"]),
        blk("Hyrox Skill", "2 rounds", "Keep grip sharp without frying it", ["Farmers Carry – 50m moderate", "Sled Pull – 25m moderate"]),
        blk("Core", "2 rounds", "Light", ["Oblique Cable Crunch – 12/side"])
      ]},
      D: { title: "FULL HYROX SIMULATION — 100% Effort", blocks: [
        blk("Warm-Up", "15–20 min", "Treat this exactly like race day — same shoes, same breakfast timing, same warm-up you'll use in Cairo", ["Easy jog + full dynamic mobility + strides + light station primers"]),
        blk("Full Hyrox Simulation", "All 8 stations, 8 x 1km, full reps/distances, goal race pace throughout", "This is your dress rehearsal. Practice your nutrition/hydration plan exactly as you will on race day. Log every split against the sub-80 target sheet — identify your single weakest station", [
          "Run 1km → SkiErg 1000m → Run 1km → Sled Push 50m → Run 1km → Sled Pull 50m → Run 1km → Burpee Broad Jump 80m → Run 1km → Row 1000m → Run 1km → Farmers Carry 200m → Run 1km → Sandbag Lunges 100m → Run 1km → Wall Balls 100 reps"
        ]),
        blk("Cool-Down", "15–20 min", "Full recovery protocol — you earned it", ["Easy walk + full mobility flow + refuel immediately"])
      ]},
      E: { title: "Full Recovery + Debrief", blocks: [
        blk("Recovery", "20–30 min", "Very easy — flush the legs, nothing more", ["Easy spin, walk, or swim"]),
        blk("Mobility", "15 min", "Full flow", ["Full-body mobility flow + foam roll"]),
        blk("Debrief", "5–10 min", "Look at yesterday's splits vs the sub-80 target sheet in the Guide. Identify your weakest station — Phase 4's remaining weeks are your last chance to sharpen it", ["Compare simulation splits to target sheet", "Note the one station needing the most attention"])
      ]}
    },
    17: {
      label: "Taper Week 1 (-30% volume)",
      A: { title: "Lower Strength — Light", blocks: [
        blk("Strength", "2 rounds (short session, ~60–70% of usual volume)", "Movement quality over load this week", ["Barbell Back Squat – 5 reps light-moderate", "Box Jump – 3 reps"])
      ]},
      B: { title: "Upper Maintenance — Short", blocks: [
        blk("Strength + Skill", "2 rounds, short", "Brief touches only", ["Barbell Bench Press – 5 reps light-moderate", "SkiErg – 3 x 250m @ race pace", "Burpee Broad Jump – 3 x 8 reps"])
      ]},
      C: { title: "Posterior Chain + Pull Stations — Short", blocks: [
        blk("Strength + Skill", "2 rounds, short", "Light touches, keep grip fresh", ["Deadlift – 5 reps light-moderate", "Farmers Carry – 2 x 50m", "Sled Pull – 2 x 25m"])
      ]},
      D: { title: "Short Compromised-Running Touch", blocks: [
        blk("Warm-Up", "10 min", "Standard prep", ["Easy jog + dynamic mobility"]),
        blk("Compromised Running (Reduced Volume)", "3 rounds", "Sharpen pacing feel without accumulating real fatigue", ["Run 1km @ goal race pace", "Sled Push – 30m"]),
        blk("Cool-Down", "10 min", "Easy walk + mobility", ["Easy walk + light stretching"])
      ]},
      E: { title: "Easy Aerobic + Weak-Station Technique Work", blocks: [
        blk("Aerobic", "30 min", "Easy, conversational effort", ["Easy Run or Machine Cardio – 30 min"]),
        blk("Weak-Station Technique", "15–20 min, technique only — no fatigue", "Direct, focused work on the station you flagged in Week 16's debrief", ["Technique-only reps on your identified weak station"]),
        blk("Mobility", "10 min", "Standard flow", ["Full mobility flow"])
      ]}
    },
    18: {
      label: "Taper Week 2 — Sharpen (-50% volume)",
      A: { title: "Short Full-Body Activation", blocks: [
        blk("Activation", "15–20 min total", "Just enough to stay sharp — should feel easy", ["Squat Pattern – 3 x 5 moderate", "A few explosive jumps – 3 x 3"])
      ]},
      B: { title: "Short Upper Activation + Crisp Reps", blocks: [
        blk("Activation", "15–20 min total", "Feel fast, not tired", ["Bench Press – 3 x 5 light", "SkiErg – 2 x 200m crisp", "Burpee Broad Jump – 2 x 6 crisp"])
      ]},
      C: { title: "Short Posterior Activation + Grip Touch", blocks: [
        blk("Activation", "15–20 min total", "Grip should feel fresh, not fatigued", ["RDL – 3 x 5 light", "Farmers Carry – 1 x 40m light touch"])
      ]},
      D: { title: "Race-Pace Primer + Station Walkthrough", blocks: [
        blk("Race-Pace Primer", "Under 30 min total", "No fatigue — this is about confidence and feel, not fitness", [
          "Run 2 x 1km @ goal race pace, full recovery between",
          "Walk through technique cues for all 8 stations, a few easy reps each"
        ])
      ]},
      E: { title: "Easy Shakeout + Race-Day Plan Review", blocks: [
        blk("Aerobic", "20–25 min easy", "Shakeout only", ["Easy jog or spin – 20–25 min"]),
        blk("Mobility", "15 min", "Full flow", ["Full mobility & recovery flow"]),
        blk("Race Plan Review", "10 min", "Read through the Guide's pacing targets and race-day checklist. Know your splits before you stand on the start line", ["Review sub-80 pacing targets", "Review race-day checklist"])
      ]}
    },
    19: {
      label: "Race Week",
      A: { title: "Light Activation", blocks: [
        blk("Activation", "15 min, very light", "Just enough to feel loose — mental rehearsal, not physical work", ["Easy movement + a few strides", "Visualize your race-pace strategy station by station"])
      ]},
      B: { title: "Shakeout / Optional Rest", blocks: [
        blk("Shakeout", "10–15 min easy, optional", "Skip entirely if you feel any fatigue at all", ["Easy spin or walk"]),
        blk("Prep", "—", "Logistics day", ["Begin hydration/carb-up", "Pack race bag, check gear"])
      ]},
      C: { title: "Rest / Very Light", blocks: [
        blk("Optional", "10 min, easy walk only", "Rest is the priority now", ["Easy walk + light mobility"]),
        blk("Prep", "—", "Final logistics", ["Confirm travel/venue plan", "Final nutrition prep", "Early to bed"])
      ]},
      FRI_REST: { title: "Pre-Race Rest (Mandatory)", type: "REST", body: [
        "No training today. This is not optional.",
        "Light stretching only. Hydrate well and continue carb-loading.",
        "Lay out your full race kit tonight: shoes, socks, top, watch, gloves/chalk if used, nutrition/gels.",
        "Re-read the sub-80 pacing targets and race-day checklist in the Guide.",
        "Early to bed — sleep is your last real training input before the race."
      ]},
      D: { title: "RACE DAY", type: "RACE", body: [
        "This is it. If your heat is today (Saturday), execute the plan: even pacing (~4:45–5:00/km), a real warm-up, break wall balls into planned sets, and stay relaxed through the roxzone transitions.",
        "If your heat is tomorrow (Sunday), treat today as a very easy shakeout — a short 10–15 min jog and mobility only — and use the day to scout the course, watch heats, and stay off your feet otherwise.",
        "See the Guide's 'Race Week & Race Day Checklist' for the full warm-up and fueling protocol."
      ]},
      E: { title: "RACE DAY", type: "RACE", body: [
        "If your heat is today (Sunday), execute the plan: even pacing (~4:45–5:00/km), a real warm-up, break wall balls into planned sets, and stay relaxed through the roxzone transitions.",
        "If your heat was yesterday (Saturday), treat today as active recovery — an easy walk, light mobility, and enjoy watching the rest of the event.",
        "See the Guide's 'Race Week & Race Day Checklist' for the full warm-up and fueling protocol."
      ]},
      MON_REST: { title: "Post-Race Recovery", type: "REST", body: [
        "Congratulations — you did the work for over four months, and it's done.",
        "Easy walk, light mobility, hydrate and refuel well.",
        "No training today. Just recover and enjoy it.",
        "When you're ready: reflect on your splits, what went right, and what you'd sharpen next time."
      ]}
    }
  }
};

PHASES.push(PHASE_4);
