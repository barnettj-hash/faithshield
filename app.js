const TOTAL_LEVELS = 100;
const STAGES_PER_LEVEL = 5;
const TOTAL_STAGES = TOTAL_LEVELS * STAGES_PER_LEVEL;
const MAX_LIVES = 5;
const MAX_BADGES = 40;
const XP_STAGE_CLEAR = 25;
const XP_INTERACTIVE_CLEAR = 60;
const CONTENT_VERSION = "2026-03-14-final-v6";
const CUTSCENE_DURATION_MS = 15000;
const CUTSCENE_PROGRESS_FRAME_MS_LITE = 80;

const DIFFICULTY_LEVELS = ["easy", "medium", "advanced"];
const SUPPORTED_LANGUAGES = ["en", "es"];
const MUSIC_LEVELS = {
  low: 0.34,
  medium: 0.46,
  high: 0.58
};
const MUSIC_STYLES = {
  cinematic: true,
  energetic: true
};
const DIFFICULTY_BADGE_META = {
  easy: { id: "difficulty-easy", icon: "🌿", name: "Pathfinder: Easy", accomplishment: "Passed FAITHSHIELD on Easy difficulty." },
  medium: { id: "difficulty-medium", icon: "🗡️", name: "Pathfinder: Medium", accomplishment: "Passed FAITHSHIELD on Medium difficulty." },
  advanced: { id: "difficulty-advanced", icon: "👑", name: "Pathfinder: Advanced", accomplishment: "Passed FAITHSHIELD on Advanced difficulty." }
};

const difficultyProfiles = {
  easy: {
    id: "easy",
    label: "Easy",
    quizOptions: 4,
    orderMaxMoves: 14,
    orderNearShuffle: true,
    factPrefill: 1,
    factDecoys: 0,
    interactive: {
      timing: { targetDelta: -1, maxMissesDelta: 2, speedDelta: 120 },
      collect: { targetDelta: -2, maxMissesDelta: 2, secondsDelta: 5, spawnDelta: 90 },
      dodge: { targetDelta: -4, spawnDelta: 90 },
      slingshot: { targetRadiusDelta: 7, maxPullDelta: 10, pullScale: 0.16 },
      pattern: { roundsDelta: -1, maxMissesDelta: 2, paceDelta: 120 },
      balance: { targetDelta: -2, maxMissesDelta: 2, driftDelta: -0.004 },
      route: { maxMissesDelta: 2 },
      discern: { maxMissesDelta: 2 }
    }
  },
  medium: {
    id: "medium",
    label: "Medium",
    quizOptions: 4,
    orderMaxMoves: 10,
    orderNearShuffle: false,
    factPrefill: 0,
    factDecoys: 0,
    interactive: {
      timing: { targetDelta: 0, maxMissesDelta: 0, speedDelta: 0 },
      collect: { targetDelta: 0, maxMissesDelta: 0, secondsDelta: 0, spawnDelta: 0 },
      dodge: { targetDelta: 0, spawnDelta: 0 },
      slingshot: { targetRadiusDelta: 0, maxPullDelta: 0, pullScale: 0.14 },
      pattern: { roundsDelta: 0, maxMissesDelta: 0, paceDelta: 0 },
      balance: { targetDelta: 0, maxMissesDelta: 0, driftDelta: 0 },
      route: { maxMissesDelta: 0 },
      discern: { maxMissesDelta: 0 }
    }
  },
  advanced: {
    id: "advanced",
    label: "Advanced",
    quizOptions: 4,
    orderMaxMoves: 7,
    orderNearShuffle: false,
    factPrefill: 0,
    factDecoys: 2,
    interactive: {
      timing: { targetDelta: 2, maxMissesDelta: -1, speedDelta: -90 },
      collect: { targetDelta: 2, maxMissesDelta: -1, secondsDelta: -4, spawnDelta: -80 },
      dodge: { targetDelta: 6, spawnDelta: -70 },
      slingshot: { targetRadiusDelta: -5, maxPullDelta: -8, pullScale: 0.13 },
      pattern: { roundsDelta: 1, maxMissesDelta: -1, paceDelta: -100 },
      balance: { targetDelta: 2, maxMissesDelta: -1, driftDelta: 0.006 },
      route: { maxMissesDelta: -1 },
      discern: { maxMissesDelta: -1 }
    }
  }
};


const timelineThemes = [
  { name: "Creation Dawn", period: "Genesis 1-2", era: "genesis", fact: "God created all things with purpose and goodness.", sourceRef: "Genesis 1:1-2:3" },
  { name: "Fall and Mercy", period: "Genesis 3", era: "genesis", fact: "Sin entered the world, yet God promised redemption.", sourceRef: "Genesis 3:1-15" },
  { name: "Flood and Covenant", period: "Genesis 6-9", era: "genesis", fact: "God judged evil and preserved Noah through the ark.", sourceRef: "Genesis 6:13-22; 9:8-17" },
  { name: "Nations and Babel", period: "Genesis 10-11", era: "genesis", fact: "Human pride scattered nations, but God continued His plan.", sourceRef: "Genesis 10:32; 11:1-9" },
  { name: "Call of Abram", period: "Genesis 12-15", era: "patriarchs", fact: "God called Abram and promised blessing for all nations.", sourceRef: "Genesis 12:1-3" },
  { name: "Promise Family", period: "Genesis 16-25", era: "patriarchs", fact: "God kept His promise through Abraham, Sarah, and Isaac.", sourceRef: "Genesis 21:1-7" },
  { name: "Jacob to Israel", period: "Genesis 25-36", era: "patriarchs", fact: "God shaped Jacob into Israel and kept covenant mercy.", sourceRef: "Genesis 32:27-30; 35:9-12" },
  { name: "Joseph in Egypt", period: "Genesis 37-50", era: "patriarchs", fact: "God turned Joseph's suffering into rescue for many.", sourceRef: "Genesis 50:20" },
  { name: "Burning Bush", period: "Exodus 1-6", era: "exodus", fact: "God called Moses to lead His people from slavery.", sourceRef: "Exodus 3:1-10" },
  { name: "Plagues and Passover", period: "Exodus 7-12", era: "exodus", fact: "God displayed power over Egypt and saved through Passover.", sourceRef: "Exodus 12:12-14" },
  { name: "Sea Crossing", period: "Exodus 13-15", era: "exodus", fact: "God made a way through the sea and defeated enemies.", sourceRef: "Exodus 14:21-31" },
  { name: "Sinai Covenant", period: "Exodus 19-24", era: "sinai", fact: "God gave His law and called Israel to holy living.", sourceRef: "Exodus 20:1-17" },
  { name: "Wilderness Trust", period: "Exodus 16-18; Numbers-Deuteronomy", era: "wilderness", fact: "God provided daily and taught Israel to trust His word.", sourceRef: "Exodus 16:4-5; Numbers 14:1-9; Deuteronomy 8:3" },
  { name: "Jordan Crossing", period: "Joshua 1-6", era: "conquest", fact: "God brought Israel into the promised land.", sourceRef: "Joshua 1:6-9; 3:14-17" },
  { name: "Land and Legacy", period: "Joshua 7-24", era: "conquest", fact: "God gave victory and called Israel to faithful worship.", sourceRef: "Joshua 24:14-15" },
  { name: "Cycle of Judges", period: "Judges", era: "judges", fact: "God raised judges whenever His people cried for help.", sourceRef: "Judges 2:16-19" },
  { name: "Ruth's Faithfulness", period: "Ruth", era: "judges", fact: "God preserved a faithful line through Ruth and Boaz.", sourceRef: "Ruth 1:16-17; 4:13-17" },
  { name: "Samuel's Calling", period: "1 Samuel 1-7", era: "samuel", fact: "God called Samuel to speak His word to Israel.", sourceRef: "1 Samuel 3:8-10" },
  { name: "Saul's Kingship", period: "1 Samuel 8-15", era: "saul", fact: "Saul became king but struggled to obey God fully.", sourceRef: "1 Samuel 10:1; 15:22-23" },
  { name: "David and Courage", period: "1 Samuel 16-17", era: "david", fact: "David trusted the Lord and defeated Goliath.", sourceRef: "1 Samuel 17:45-47" }
];

const THEME_KEYWORDS = {
  "Creation Dawn": ["light", "earth", "garden"],
  "Fall and Mercy": ["serpent", "Eve", "Eden"],
  "Flood and Covenant": ["Noah", "ark", "rainbow"],
  "Nations and Babel": ["Babel", "tower", "nations"],
  "Call of Abram": ["Abram", "Canaan", "blessing"],
  "Promise Family": ["Isaac", "Sarah", "promise"],
  "Jacob to Israel": ["Jacob", "Israel", "Bethel"],
  "Joseph in Egypt": ["Joseph", "Egypt", "brothers"],
  "Call of Abram": [
    {
      id: "abram-leave-haran",
      engine: "route",
      label: "Leave Haran",
      maxMisses: 4,
      sourceRef: "Genesis 12:1-4",
      storyPrompt: "Follow Abram's road as God calls him to leave his country and go to the land He will show.",
      secondaryPrompt: "Move through each step of the journey in the right direction.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the route.",
      routeSteps: [
        { dir: "right", icon: "🏕️", label: "Leave" },
        { dir: "up", icon: "🧭", label: "Go" },
        { dir: "right", icon: "🌄", label: "Trust" },
        { dir: "right", icon: "🌍", label: "Land" }
      ]
    },
    {
      id: "abram-promise-discern",
      engine: "discern",
      label: "Promise Under the Stars",
      maxMisses: 3,
      sourceRef: "Genesis 12:7-8; 15:5-6",
      storyPrompt: "Discern the promise signs God used to strengthen Abram's faith.",
      secondaryPrompt: "Choose the right sign or response each round.",
      keyboardHint: "Keyboard: press 1-4 to choose the right promise sign.",
      cards: [
        { icon: "⭐", label: "Stars" },
        { icon: "🔥", label: "Altar" },
        { icon: "⛺", label: "Tent" },
        { icon: "🌍", label: "Land" }
      ],
      targets: [
        { prompt: "What did God tell Abram to count if he was able?", correctIndex: 0 },
        { prompt: "What did Abram build to Yahweh in Canaan?", correctIndex: 1 },
        { prompt: "What did Abram pitch between Bethel and Ai?", correctIndex: 2 },
        { prompt: "What did God promise to show Abram?", correctIndex: 3 }
      ]
    },
    {
      id: "abram-altar-stand",
      engine: "balance",
      label: "Altar of Trust",
      target: 7,
      maxMisses: 4,
      drift: 0.025,
      sourceRef: "Genesis 12:7-8",
      storyPrompt: "Stand steady in faith as Abram worships Yahweh in the land of promise.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to stay centered in the trust band."
    }
  ],
  "Promise Family": [
    {
      id: "promise-moriah-ascent",
      engine: "route",
      label: "Moriah Ascent",
      maxMisses: 4,
      sourceRef: "Genesis 22:2-13",
      storyPrompt: "Climb the path to Moriah as Abraham trusts God on the mountain.",
      secondaryPrompt: "Follow the mountain path one step at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the mountain route.",
      routeSteps: [
        { dir: "up", icon: "🪵", label: "Wood" },
        { dir: "right", icon: "🔥", label: "Fire" },
        { dir: "up", icon: "⛰️", label: "Climb" },
        { dir: "right", icon: "🐏", label: "Ram" }
      ]
    },
    {
      id: "promise-household-discern",
      engine: "discern",
      label: "Promise Household",
      maxMisses: 3,
      sourceRef: "Genesis 18:12-14; 21:2-3; 21:19; 22:13",
      storyPrompt: "Discern how God kept His promise through Abraham's family.",
      secondaryPrompt: "Choose the right answer from the promise family story.",
      keyboardHint: "Keyboard: press 1-4 to choose the right family answer.",
      cards: [
        { icon: "👶", label: "Isaac" },
        { icon: "👵", label: "Sarah" },
        { icon: "🐏", label: "Ram" },
        { icon: "💧", label: "Well" }
      ],
      targets: [
        { prompt: "Who gave birth to the promised son?", correctIndex: 1 },
        { prompt: "What was the name of Abraham's promised son?", correctIndex: 0 },
        { prompt: "What substitute did Abraham offer instead of Isaac?", correctIndex: 2 },
        { prompt: "What did God show Hagar in the wilderness?", correctIndex: 3 }
      ]
    },
    {
      id: "promise-tent-provision",
      engine: "collect",
      label: "Tent Provision",
      target: 12,
      maxMisses: 5,
      seconds: 24,
      spawnMs: 430,
      sourceRef: "Genesis 18:6-8",
      storyPrompt: "Gather the meal Abraham prepared for his heavenly visitors.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the provisions."
    }
  ],
  "Jacob to Israel": [
    {
      id: "jacob-bethel-route",
      engine: "route",
      label: "Bethel Return",
      maxMisses: 4,
      sourceRef: "Genesis 28:10-19; 35:1-3",
      storyPrompt: "Follow Jacob's path back to Bethel where God confirmed His covenant.",
      secondaryPrompt: "Trace the journey back to Bethel in the right order.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the Bethel route.",
      routeSteps: [
        { dir: "up", icon: "🪨", label: "Stone" },
        { dir: "right", icon: "🪜", label: "Ladder" },
        { dir: "up", icon: "🙏", label: "Vow" },
        { dir: "right", icon: "🏕️", label: "Bethel" }
      ]
    },
    {
      id: "jacob-blessing-discern",
      engine: "discern",
      label: "Jacob's Turning Point",
      maxMisses: 3,
      sourceRef: "Genesis 27:35-36; 28:12; 32:28; 35:14",
      storyPrompt: "Discern the key moments that shaped Jacob into Israel.",
      secondaryPrompt: "Choose the right part of Jacob's story each round.",
      keyboardHint: "Keyboard: press 1-4 to choose the right Jacob answer.",
      cards: [
        { icon: "🪜", label: "Ladder" },
        { icon: "🪨", label: "Pillar" },
        { icon: "🇮🇱", label: "Israel" },
        { icon: "✨", label: "Blessing" }
      ],
      targets: [
        { prompt: "What did Jacob see reaching toward heaven?", correctIndex: 0 },
        { prompt: "What did Jacob set up and pour a drink offering on?", correctIndex: 1 },
        { prompt: "What new name did God give Jacob?", correctIndex: 2 },
        { prompt: "What did Jacob seek from his father in Genesis 27?", correctIndex: 3 }
      ]
    },
    {
      id: "jacob-jabbok-balance",
      engine: "balance",
      label: "Jabbok Hold",
      target: 8,
      maxMisses: 4,
      drift: 0.028,
      sourceRef: "Genesis 32:24-30",
      storyPrompt: "Hold your ground through the night as Jacob wrestles and clings for blessing.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to stay in the blessing band."
    }
  ],
  "Joseph in Egypt": [
    {
      id: "joseph-prison-palace-route",
      engine: "route",
      label: "Prison to Palace",
      maxMisses: 4,
      sourceRef: "Genesis 39:20; 41:14; 41:41",
      storyPrompt: "Follow Joseph's path from prison to Pharaoh's court as God raises him up.",
      secondaryPrompt: "Trace Joseph's rise one step at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow Joseph's route.",
      routeSteps: [
        { dir: "down", icon: "⛓️", label: "Prison" },
        { dir: "up", icon: "🛁", label: "Prepare" },
        { dir: "right", icon: "👑", label: "Pharaoh" },
        { dir: "up", icon: "🏛️", label: "Rule" }
      ]
    },
    {
      id: "joseph-dreams-discern",
      engine: "discern",
      label: "Dreams and Grain",
      maxMisses: 3,
      sourceRef: "Genesis 37:3; 41:2-7; 41:48-49; 44:2",
      storyPrompt: "Discern the signs and symbols God used in Joseph's story.",
      secondaryPrompt: "Choose the right symbol from Joseph's life each round.",
      keyboardHint: "Keyboard: press 1-4 to choose the right Joseph answer.",
      cards: [
        { icon: "🐄", label: "Cows" },
        { icon: "🌾", label: "Grain" },
        { icon: "🧥", label: "Coat" },
        { icon: "🥈", label: "Silver Cup" }
      ],
      targets: [
        { prompt: "What did Pharaoh see coming up from the Nile?", correctIndex: 0 },
        { prompt: "What did Joseph gather during the years of plenty?", correctIndex: 1 },
        { prompt: "What did Jacob make for Joseph?", correctIndex: 2 },
        { prompt: "What was hidden in Benjamin's sack?", correctIndex: 3 }
      ]
    },
    {
      id: "joseph-granary-store",
      engine: "collect",
      label: "Granary Store",
      target: 13,
      maxMisses: 5,
      seconds: 24,
      spawnMs: 420,
      sourceRef: "Genesis 41:48-49",
      storyPrompt: "Gather grain through the years of plenty before the famine arrives.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the grain."
    }
  ],
  "Burning Bush": ["Moses", "bush", "Pharaoh"],
  "Plagues and Passover": ["plague", "blood", "lamb"],
  "Sea Crossing": ["sea", "Miriam", "dry"],
  "Sinai Covenant": ["Sinai", "law", "covenant"],
  "Wilderness Trust": ["manna", "quail", "wilderness"],
  "Sinai Covenant": [
    {
      id: "sinai-mountain-route",
      engine: "route",
      label: "Mountain Ascent",
      maxMisses: 4,
      sourceRef: "Exodus 19:12-20",
      storyPrompt: "Trace the careful ascent as Moses goes up the mountain to meet with God.",
      secondaryPrompt: "Follow the mountain route in the right order.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the Sinai route.",
      routeSteps: [
        { dir: "up", icon: "⛰️", label: "Climb" },
        { dir: "right", icon: "📯", label: "Trumpet" },
        { dir: "up", icon: "☁️", label: "Cloud" },
        { dir: "right", icon: "📜", label: "Words" }
      ]
    },
    {
      id: "sinai-commandment-discern",
      engine: "discern",
      label: "Covenant Discern",
      maxMisses: 3,
      sourceRef: "Exodus 19:19; 20:1-17; 24:8",
      storyPrompt: "Discern the signs of covenant as Israel hears God's words at Sinai.",
      secondaryPrompt: "Choose the right covenant sign each round.",
      keyboardHint: "Keyboard: press 1-4 to choose the right Sinai answer.",
      cards: [
        { icon: "📯", label: "Trumpet" },
        { icon: "🩸", label: "Blood" },
        { icon: "🪨", label: "Tablets" },
        { icon: "🔥", label: "Fire" }
      ],
      targets: [
        { prompt: "What sound grew louder and louder at the mountain?", correctIndex: 0 },
        { prompt: "What did Moses sprinkle on the people?", correctIndex: 1 },
        { prompt: "What did God give Moses with the covenant words written on them?", correctIndex: 2 },
        { prompt: "How did Yahweh descend on Mount Sinai?", correctIndex: 3 }
      ]
    },
    {
      id: "sinai-covenant-stand",
      engine: "balance",
      label: "Covenant Stand",
      target: 8,
      maxMisses: 4,
      drift: 0.028,
      sourceRef: "Exodus 24:7-8",
      storyPrompt: "Stand firm as the covenant is confirmed before the people of Israel.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to stay inside the covenant band."
    }
  ],
  "Wilderness Trust": [
    {
      id: "wilderness-cloud-route",
      engine: "route",
      label: "Follow the Cloud",
      maxMisses: 4,
      sourceRef: "Exodus 13:21-22; Numbers 9:17-18",
      storyPrompt: "Follow the cloud's leading as Israel learns to trust God's guidance in the wilderness.",
      secondaryPrompt: "Stay with the cloud and move in the right direction.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the cloud route.",
      routeSteps: [
        { dir: "up", icon: "☁️", label: "Cloud" },
        { dir: "right", icon: "🏕️", label: "Camp" },
        { dir: "up", icon: "🧭", label: "Move" },
        { dir: "right", icon: "🔥", label: "Fire" }
      ]
    },
    {
      id: "wilderness-provision-discern",
      engine: "discern",
      label: "Daily Provision",
      maxMisses: 3,
      sourceRef: "Exodus 16:15; Numbers 11:31; Numbers 20:11; Deuteronomy 8:3",
      storyPrompt: "Discern God's provision in the wilderness instead of grumbling at the journey.",
      secondaryPrompt: "Choose the right provision each round.",
      keyboardHint: "Keyboard: press 1-4 to choose the right wilderness answer.",
      cards: [
        { icon: "🍞", label: "Manna" },
        { icon: "🐦", label: "Quail" },
        { icon: "💧", label: "Water" },
        { icon: "📜", label: "Word" }
      ],
      targets: [
        { prompt: "What did the people call the bread from heaven?", correctIndex: 0 },
        { prompt: "What birds covered the camp in Numbers 11?", correctIndex: 1 },
        { prompt: "What came from the rock when Moses struck it?", correctIndex: 2 },
        { prompt: "What does Deuteronomy 8:3 say man lives by besides bread?", correctIndex: 3 }
      ]
    },
    {
      id: "wilderness-tent-balance",
      engine: "balance",
      label: "Tent of Meeting",
      target: 8,
      maxMisses: 4,
      drift: 0.027,
      sourceRef: "Exodus 33:7-11",
      storyPrompt: "Hold steady as Moses meets with Yahweh at the tent outside the camp.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to stay in the meeting band."
    }
  ],
  "Jordan Crossing": ["Jordan", "stones", "ark"],
  "Land and Legacy": ["Jericho", "Ai", "worship"],
  "Cycle of Judges": ["judge", "Gideon", "Samson"],
  "Ruth's Faithfulness": ["Ruth", "Boaz", "Naomi"],
  "Samuel's Calling": ["Samuel", "Eli", "Shiloh"],
  "Saul's Kingship": ["Saul", "king", "obey"],
  "Cycle of Judges": [
    {
      id: "judges-gideon-route",
      engine: "route",
      label: "Gideon's Night Route",
      maxMisses: 4,
      sourceRef: "Judges 7:16-21",
      storyPrompt: "Follow Gideon's night attack as the three companies move into place.",
      secondaryPrompt: "Trace the night route one move at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow Gideon's route.",
      routeSteps: [
        { dir: "left", icon: "🏺", label: "Jar" },
        { dir: "up", icon: "🔥", label: "Torch" },
        { dir: "right", icon: "📯", label: "Trumpet" },
        { dir: "up", icon: "⚔️", label: "Advance" }
      ]
    },
    {
      id: "judges-discern-deliverer",
      engine: "discern",
      label: "Raise the Judge",
      maxMisses: 3,
      sourceRef: "Judges 4:4; 6:34; 16:30; Ruth 1:16",
      storyPrompt: "Discern the key people God used during the time of the judges.",
      secondaryPrompt: "Choose the right person each round.",
      keyboardHint: "Keyboard: press 1-4 to choose the right judge-era answer.",
      cards: [
        { icon: "👩‍⚖️", label: "Deborah" },
        { icon: "📯", label: "Gideon" },
        { icon: "🏛️", label: "Samson" },
        { icon: "🌾", label: "Ruth" }
      ],
      targets: [
        { prompt: "Who judged Israel as a prophetess?", correctIndex: 0 },
        { prompt: "Who led with trumpets and three hundred men?", correctIndex: 1 },
        { prompt: "Who pulled down the pillars of the Philistine house?", correctIndex: 2 },
        { prompt: "Who stayed faithful to Naomi?", correctIndex: 3 }
      ]
    },
    {
      id: "judges-pillars-balance",
      engine: "balance",
      label: "Pillars of Strength",
      target: 8,
      maxMisses: 4,
      drift: 0.029,
      sourceRef: "Judges 16:29-30",
      storyPrompt: "Hold the pressure point as Samson braces himself between the pillars.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to stay centered in the strength band."
    }
  ],
  "Ruth's Faithfulness": [
    {
      id: "ruth-return-route",
      engine: "route",
      label: "Return to Bethlehem",
      maxMisses: 4,
      sourceRef: "Ruth 1:16-22",
      storyPrompt: "Follow Ruth and Naomi's path back to Bethlehem in faithful love.",
      secondaryPrompt: "Trace the return path one step at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the Bethlehem route.",
      routeSteps: [
        { dir: "left", icon: "👣", label: "Go" },
        { dir: "up", icon: "🧕", label: "Naomi" },
        { dir: "right", icon: "🌾", label: "Fields" },
        { dir: "up", icon: "🏠", label: "Bethlehem" }
      ]
    },
    {
      id: "ruth-redeemer-discern",
      engine: "discern",
      label: "Kinsman Redeemer",
      maxMisses: 3,
      sourceRef: "Ruth 1:16; 2:3; 2:12; 4:13",
      storyPrompt: "Discern the signs of faithfulness and redemption in Ruth's story.",
      secondaryPrompt: "Choose the right part of Ruth's story each round.",
      keyboardHint: "Keyboard: press 1-4 to choose the right Ruth answer.",
      cards: [
        { icon: "🌾", label: "Field" },
        { icon: "🫂", label: "Naomi" },
        { icon: "🛡️", label: "Boaz" },
        { icon: "👶", label: "Obed" }
      ],
      targets: [
        { prompt: "Where did Ruth glean behind the reapers?", correctIndex: 0 },
        { prompt: "Who did Ruth refuse to leave?", correctIndex: 1 },
        { prompt: "Who spread his garment over Ruth in protection?", correctIndex: 2 },
        { prompt: "Who was born at the end of Ruth's story?", correctIndex: 3 }
      ]
    },
    {
      id: "ruth-gleaning-grace",
      engine: "collect",
      label: "Gleaning Grace",
      target: 12,
      maxMisses: 5,
      seconds: 24,
      spawnMs: 425,
      sourceRef: "Ruth 2:2-3,17",
      storyPrompt: "Gather the barley as Ruth gleans faithfully in Boaz's field.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the grain."
    }
  ],
  "Samuel's Calling": [
    {
      id: "samuel-night-pattern",
      engine: "pattern",
      label: "Night Call",
      rounds: 4,
      maxMisses: 4,
      playbackMs: 510,
      sourceRef: "1 Samuel 3:4-10",
      storyPrompt: "Remember the night-call pattern as Samuel learns to answer Yahweh.",
      keyboardHint: "Keyboard: press 1-4 to repeat the night-call pattern.",
      pads: [
        { icon: "🛏️", label: "Sleep" },
        { icon: "👂", label: "Hear" },
        { icon: "🏃", label: "Run" },
        { icon: "🗣️", label: "Speak" }
      ],
      sequences: [[1, 2, 3], [1, 2, 1, 3], [1, 2, 3, 1], [1, 2, 1, 3, 1]]
    },
    {
      id: "samuel-run-route",
      engine: "route",
      label: "Run to Eli",
      maxMisses: 4,
      sourceRef: "1 Samuel 3:4-8",
      storyPrompt: "Follow Samuel's path as he runs again and again to Eli in the night.",
      secondaryPrompt: "Trace the path between Samuel and Eli one step at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow Samuel's route.",
      routeSteps: [
        { dir: "right", icon: "🛏️", label: "Bed" },
        { dir: "up", icon: "🏃", label: "Run" },
        { dir: "right", icon: "👴", label: "Eli" },
        { dir: "left", icon: "↩️", label: "Return" }
      ]
    },
    {
      id: "samuel-lamp-balance",
      engine: "balance",
      label: "Lamp Before Yahweh",
      target: 8,
      maxMisses: 4,
      drift: 0.027,
      sourceRef: "1 Samuel 3:3",
      storyPrompt: "Keep the lamp steady before Yahweh as the word of God comes to Samuel.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to stay in the lamp band."
    }
  ],
  "Saul's Kingship": [
    {
      id: "saul-donkey-route",
      engine: "route",
      label: "Donkey Search",
      maxMisses: 4,
      sourceRef: "1 Samuel 9:3-6",
      storyPrompt: "Follow Saul's search as he looks for the lost donkeys before meeting Samuel.",
      secondaryPrompt: "Trace the search route in the right order.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the search route.",
      routeSteps: [
        { dir: "right", icon: "🐴", label: "Search" },
        { dir: "up", icon: "⛰️", label: "Hill" },
        { dir: "right", icon: "🏙️", label: "City" },
        { dir: "up", icon: "👴", label: "Samuel" }
      ]
    },
    {
      id: "saul-anointing-discern",
      engine: "discern",
      label: "Anointed King",
      maxMisses: 3,
      sourceRef: "1 Samuel 10:1,22,24; 15:22-23",
      storyPrompt: "Discern the turning points in Saul's rise and fall as king.",
      secondaryPrompt: "Choose the right sign from Saul's story each round.",
      keyboardHint: "Keyboard: press 1-4 to choose the right Saul answer.",
      cards: [
        { icon: "🫒", label: "Oil" },
        { icon: "🐴", label: "Donkeys" },
        { icon: "🧳", label: "Baggage" },
        { icon: "👑", label: "Kingdom" }
      ],
      targets: [
        { prompt: "What did Samuel pour on Saul's head?", correctIndex: 0 },
        { prompt: "What had Saul been searching for when the story began?", correctIndex: 1 },
        { prompt: "Where was Saul hiding when he was presented to Israel?", correctIndex: 2 },
        { prompt: "What did Yahweh say He had given Saul over Israel?", correctIndex: 3 }
      ]
    },
    {
      id: "saul-gilgal-balance",
      engine: "balance",
      label: "Wait at Gilgal",
      target: 8,
      maxMisses: 4,
      drift: 0.029,
      sourceRef: "1 Samuel 13:8-14",
      storyPrompt: "Hold steady and wait as Saul faces the test of obedience at Gilgal.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to stay inside the waiting band."
    }
  ],
  "David and Courage": ["David", "Goliath", "sling"]
};


const QUESTION_ACTIVITY_TYPES = new Set(["quiz", "spelling", "order", "fact", "truefalse", "matching"]);
const USE_LEGACY_CUTSCENE_VIDEO_FALLBACK = false;
const FORCE_STILL_CUTSCENE_MODE = true;
const PREFER_SYSTEM_NARRATION_VOICE = false;

const CUTSCENE_VIDEO_BY_ERA = {
  genesis: ["./assets/cutscenes/genesis.mp4", "./cutscenes/genesis.mp4", "./genesis.mp4"],
  patriarchs: ["./assets/cutscenes/patriarchs.mp4", "./cutscenes/patriarchs.mp4", "./patriarchs.mp4"],
  exodus: ["./assets/cutscenes/exodus.mp4", "./cutscenes/exodus.mp4", "./exodus.mp4"],
  sinai: ["./assets/cutscenes/sinai.mp4", "./cutscenes/sinai.mp4", "./sinai.mp4"],
  wilderness: ["./assets/cutscenes/wilderness.mp4", "./cutscenes/wilderness.mp4", "./wilderness.mp4"],
  conquest: ["./assets/cutscenes/conquest.mp4", "./cutscenes/conquest.mp4", "./conquest.mp4"],
  judges: ["./assets/cutscenes/judges.mp4", "./cutscenes/judges.mp4", "./judges.mp4"],
  samuel: ["./assets/cutscenes/samuel.mp4", "./cutscenes/samuel.mp4", "./samuel.mp4"],
  saul: ["./assets/cutscenes/saul.mp4", "./cutscenes/saul.mp4", "./saul.mp4"],
  david: ["./assets/cutscenes/david.mp4", "./cutscenes/david.mp4", "./david.mp4"],
  generic: ["./assets/cutscenes/generic.mp4", "./cutscenes/generic.mp4", "./generic.mp4"]
};

const CUTSCENE_POSTER_BY_ERA = {
  genesis: ["./assets/cutscenes/posters/genesis.svg", "./cutscenes/posters/genesis.svg", "./posters/genesis.svg"],
  patriarchs: ["./assets/cutscenes/posters/patriarchs.svg", "./cutscenes/posters/patriarchs.svg", "./posters/patriarchs.svg"],
  exodus: ["./assets/cutscenes/posters/exodus.svg", "./cutscenes/posters/exodus.svg", "./posters/exodus.svg"],
  sinai: [
    "./assets/cutscenes/posters/sinai.svg",
    "./cutscenes/posters/sinai.svg",
    "./posters/sinai.svg",
    "./assets/cutscenes/posters/wilderness.svg",
    "./cutscenes/posters/wilderness.svg",
    "./posters/wilderness.svg"
  ],
  wilderness: ["./assets/cutscenes/posters/wilderness.svg", "./cutscenes/posters/wilderness.svg", "./posters/wilderness.svg"],
  conquest: ["./assets/cutscenes/posters/conquest.svg", "./cutscenes/posters/conquest.svg", "./posters/conquest.svg"],
  judges: ["./assets/cutscenes/posters/judges.svg", "./cutscenes/posters/judges.svg", "./posters/judges.svg"],
  samuel: ["./assets/cutscenes/posters/samuel.svg", "./cutscenes/posters/samuel.svg", "./posters/samuel.svg"],
  saul: ["./assets/cutscenes/posters/saul.svg", "./cutscenes/posters/saul.svg", "./posters/saul.svg"],
  david: ["./assets/cutscenes/posters/david.svg", "./cutscenes/posters/david.svg", "./posters/david.svg"],
  generic: ["./assets/cutscenes/posters/generic.svg", "./cutscenes/posters/generic.svg", "./posters/generic.svg"]
};
const CUTSCENE_POSTER_DEFAULT = "./assets/stage-art.png";

function stillsFileCandidates(name) {
  const prefixes = ["./stills", "./assets/cutscenes/stills", "./cutscenes/stills"];
  const exts = ["jpg", "jpeg", "png", "webp", "svg"];
  const out = [];
  prefixes.forEach((prefix) => {
    exts.forEach((ext) => {
      out.push(`${prefix}/${name}.${ext}`);
    });
  });
  return out;
}

const CUTSCENE_STILL_BY_ERA = {
  genesis: stillsFileCandidates("genesis"),
  patriarchs: stillsFileCandidates("patriarchs"),
  exodus: stillsFileCandidates("exodus"),
  sinai: stillsFileCandidates("sinai"),
  wilderness: stillsFileCandidates("wilderness"),
  conquest: stillsFileCandidates("conquest"),
  judges: stillsFileCandidates("judges"),
  samuel: stillsFileCandidates("samuel"),
  saul: stillsFileCandidates("saul"),
  david: stillsFileCandidates("david"),
  generic: stillsFileCandidates("generic")
};

const CUTSCENE_STILL_SEQUENCE_BY_ERA = {
  genesis: [
    stillsFileCandidates("genesis-1"),
    stillsFileCandidates("genesis-2"),
    stillsFileCandidates("genesis-3")
  ],
  patriarchs: [
    stillsFileCandidates("patriarchs-1"),
    stillsFileCandidates("patriarchs-2"),
    stillsFileCandidates("patriarchs-3")
  ],
  exodus: [
    stillsFileCandidates("exodus-1"),
    stillsFileCandidates("exodus-2"),
    stillsFileCandidates("exodus-3"),
    stillsFileCandidates("exodus-4")
  ],
  sinai: [
    stillsFileCandidates("sinai-1"),
    stillsFileCandidates("sinai-2"),
    stillsFileCandidates("sinai-3"),
    stillsFileCandidates("sinai-4")
  ],
  wilderness: [
    stillsFileCandidates("wilderness-1"),
    stillsFileCandidates("wilderness-2"),
    stillsFileCandidates("wilderness-3")
  ],
  conquest: [
    stillsFileCandidates("conquest-1"),
    stillsFileCandidates("conquest-2"),
    stillsFileCandidates("conquest-3")
  ],
  judges: [
    stillsFileCandidates("judges-1"),
    stillsFileCandidates("judges-2"),
    stillsFileCandidates("judges-3")
  ],
  samuel: [
    stillsFileCandidates("samuel-1"),
    stillsFileCandidates("samuel-2"),
    stillsFileCandidates("samuel-3")
  ],
  saul: [
    stillsFileCandidates("saul-1"),
    stillsFileCandidates("saul-2"),
    stillsFileCandidates("saul-3")
  ],
  david: [
    stillsFileCandidates("david-1"),
    stillsFileCandidates("david-2"),
    stillsFileCandidates("david-3"),
    stillsFileCandidates("david-4")
  ],
  generic: []
};
const CUTSCENE_STILL_SEQUENCE_INTERVAL_MS = 2500;
const CUTSCENE_STILL_VIEW_BY_ERA = {
  genesis: {
    fit: "contain",
    position: "50% 45%",
    backgroundColor: "#0c1320"
  },
  patriarchs: {
    fit: "contain",
    position: "50% 50%",
    backgroundColor: "#0c1320"
  },
  exodus: {
    fit: "contain",
    position: "50% 50%",
    backgroundColor: "#0c1320"
  },
  sinai: {
    fit: "contain",
    position: "50% 50%",
    backgroundColor: "#0c1320"
  },
  wilderness: {
    fit: "contain",
    position: "50% 50%",
    backgroundColor: "#0c1320"
  },
  conquest: {
    fit: "contain",
    position: "50% 50%",
    backgroundColor: "#0c1320"
  },
  judges: {
    fit: "contain",
    position: "50% 50%",
    backgroundColor: "#0c1320"
  },
  samuel: {
    fit: "contain",
    position: "50% 50%",
    backgroundColor: "#0c1320"
  },
  saul: {
    fit: "contain",
    position: "50% 50%",
    backgroundColor: "#0c1320"
  },
  david: {
    fit: "contain",
    position: "50% 50%",
    backgroundColor: "#0c1320"
  },
  generic: {
    fit: "cover",
    position: "50% 50%",
    backgroundColor: "#0f1722"
  }
};
const CUTSCENE_STILL_FRAME_VIEW_BY_ERA = {
  genesis: [
    { position: "50% 38%" },
    { position: "50% 50%" },
    { position: "50% 56%" }
  ],
  patriarchs: [
    { position: "50% 50%" },
    { position: "50% 50%" },
    { position: "50% 50%" }
  ],
  exodus: [
    { position: "50% 50%" },
    { position: "50% 52%" },
    { position: "50% 52%" },
    { position: "50% 52%" }
  ],
  sinai: [
    { position: "50% 50%" },
    { position: "50% 50%" },
    { position: "50% 50%" },
    { position: "50% 50%" }
  ],
  wilderness: [
    { position: "50% 50%" },
    { position: "50% 50%" },
    { position: "50% 50%" }
  ],
  conquest: [
    { position: "50% 50%" },
    { position: "50% 50%" },
    { position: "50% 50%" }
  ],
  judges: [
    { position: "50% 50%", scale: 0.12 },
    { position: "50% 50%" },
    { position: "50% 50%", scale: 0.16 }
  ],
  samuel: [
    { position: "50% 50%" },
    { position: "50% 50%" },
    { position: "50% 50%" }
  ],
  saul: [
    { position: "50% 50%" },
    { position: "50% 50%" },
    { position: "50% 50%" }
  ],
  david: [
    { position: "50% 50%" },
    { position: "50% 50%" },
    { position: "50% 50%" },
    { position: "50% 50%" }
  ],
  generic: []
};

const CANONICAL_BOOK_ORDER = {
  Genesis: 1,
  Exodus: 2,
  Numbers: 3,
  Joshua: 4,
  Judges: 5,
  Ruth: 6,
  "1 Samuel": 7
};
const BOOK_OPTIONS = Object.keys(CANONICAL_BOOK_ORDER);
const SORTED_CANONICAL_BOOKS = Object.keys(CANONICAL_BOOK_ORDER).sort((a, b) => b.length - a.length);
const REFERENCE_PLAN_BY_ERA = {
  genesis: [{ book: "Genesis", start: 1, end: 11 }],
  patriarchs: [{ book: "Genesis", start: 12, end: 50 }],
  exodus: [{ book: "Exodus", start: 1, end: 15 }],
  sinai: [{ book: "Exodus", start: 19, end: 24 }],
  wilderness: [
    { book: "Exodus", start: 16, end: 18 },
    { book: "Numbers", start: 1, end: 36 },
    { book: "Deuteronomy", start: 1, end: 34 }
  ],
  conquest: [{ book: "Joshua", start: 1, end: 24 }],
  judges: [
    { book: "Judges", start: 1, end: 21 },
    { book: "Ruth", start: 1, end: 4 }
  ],
  samuel: [{ book: "1 Samuel", start: 1, end: 7 }],
  saul: [{ book: "1 Samuel", start: 8, end: 15 }],
  david: [{ book: "1 Samuel", start: 16, end: 31 }]
};
const THEME_LEVELS_BY_NAME = {
  "Creation Dawn": 2,
  "Fall and Mercy": 2,
  "Flood and Covenant": 7,
  "Nations and Babel": 6
};
const THEME_REFERENCE_PLAN_BY_NAME = {
  "Creation Dawn": [{ book: "Genesis", start: 1, end: 2 }],
  "Fall and Mercy": [{ book: "Genesis", start: 3, end: 3 }],
  "Flood and Covenant": [{ book: "Genesis", start: 6, end: 9 }],
  "Nations and Babel": [{ book: "Genesis", start: 10, end: 11 }],
  "Call of Abram": [{ book: "Genesis", start: 12, end: 15 }],
  "Promise Family": [{ book: "Genesis", start: 16, end: 25 }],
  "Jacob to Israel": [{ book: "Genesis", start: 25, end: 36 }],
  "Joseph in Egypt": [{ book: "Genesis", start: 37, end: 50 }],
  "Burning Bush": [{ book: "Exodus", start: 1, end: 6 }],
  "Plagues and Passover": [{ book: "Exodus", start: 7, end: 12 }],
  "Sea Crossing": [{ book: "Exodus", start: 13, end: 15 }],
  "Sinai Covenant": [{ book: "Exodus", start: 19, end: 24 }],
  "Wilderness Trust": [
    { book: "Exodus", start: 16, end: 18 },
    { book: "Numbers", start: 1, end: 36 },
    { book: "Deuteronomy", start: 1, end: 34 }
  ],
  "Jordan Crossing": [{ book: "Joshua", start: 1, end: 6 }],
  "Land and Legacy": [{ book: "Joshua", start: 7, end: 24 }],
  "Cycle of Judges": [{ book: "Judges", start: 1, end: 21 }],
  "Ruth's Faithfulness": [{ book: "Ruth", start: 1, end: 4 }],
  "Samuel's Calling": [{ book: "1 Samuel", start: 1, end: 7 }],
  "Saul's Kingship": [{ book: "1 Samuel", start: 8, end: 15 }],
  "David and Courage": [{ book: "1 Samuel", start: 16, end: 17 }]
};
const REFERENCE_VERSES_BY_BUCKET = {
  quiz: [1, 2, 3],
  spelling: [1, 2, 3],
  order: [1, 2, 3],
  fact: [1, 2, 3]
};
const ERA_STORY_LABELS = {
  genesis: "Creation and the first families",
  patriarchs: "the patriarch journey",
  exodus: "Israel's deliverance from Egypt",
  sinai: "the Sinai covenant",
  wilderness: "the wilderness journey",
  conquest: "the crossing into the promised land",
  judges: "the days of the judges",
  samuel: "Samuel's calling years",
  saul: "Saul's early kingship",
  david: "David's rise and courage"
};
const STORY_NARRATION_BY_ERA = {
  genesis: "In the beginning, God created the heavens and the earth. He called light out of darkness, shaped the sea and the land, and filled creation with life. Every scene reveals His wisdom, power, and goodness.",
  patriarchs: "God calls Abraham, builds a covenant family, and preserves His promise through Isaac, Jacob, and Joseph.",
  exodus: "God delivers Israel from slavery in Egypt through Moses, the Passover, and the crossing of the sea.",
  sinai: "At Mount Sinai, God gives His covenant words, calls His people to holiness, and reveals His glory and mercy.",
  wilderness: "In the wilderness, God provides daily bread, leads His people, and teaches trust through every trial.",
  conquest: "Under Joshua, God leads Israel into the promised land and calls them to faithful worship.",
  judges: "In the days of the judges, people fall into cycles of sin and rescue, and God raises leaders to deliver them.",
  samuel: "God calls Samuel as a young servant and establishes His word in Israel.",
  saul: "Saul begins as Israel's first king, but this period shows how partial obedience leads to loss.",
  david: "David trusts in the Lord, defeats Goliath, and shows courage grounded in faith, not size or strength.",
  generic: "This preview highlights a key Bible event. Listen closely, then enter the challenge with confidence in God's Word."
};
const STORY_NARRATION_AUDIO_BY_ERA = {
  genesis: ["./assets/cutscenes/genesis.m4a", "./cutscenes/genesis.m4a", "./genesis.m4a"],
  patriarchs: ["./assets/cutscenes/patriarchs.m4a", "./cutscenes/patriarchs.m4a", "./patriarchs.m4a"],
  exodus: ["./assets/cutscenes/exodus.m4a", "./cutscenes/exodus.m4a", "./exodus.m4a"],
  sinai: ["./assets/cutscenes/sinai.m4a", "./cutscenes/sinai.m4a", "./sinai.m4a"],
  wilderness: ["./assets/cutscenes/wilderness.m4a", "./cutscenes/wilderness.m4a", "./wilderness.m4a"],
  conquest: ["./assets/cutscenes/conquest.m4a", "./cutscenes/conquest.m4a", "./conquest.m4a"],
  judges: ["./assets/cutscenes/judges.m4a", "./cutscenes/judges.m4a", "./judges.m4a"],
  samuel: ["./assets/cutscenes/samuel.m4a", "./cutscenes/samuel.m4a", "./samuel.m4a"],
  saul: ["./assets/cutscenes/saul.m4a", "./cutscenes/saul.m4a", "./saul.m4a"],
  david: ["./assets/cutscenes/david.m4a", "./cutscenes/david.m4a", "./david.m4a"],
  generic: ["./assets/cutscenes/generic.m4a", "./cutscenes/generic.m4a", "./generic.m4a"]
};

const STORY_NARRATION_BY_ERA_ES = {
  genesis: "En el principio, Dios hablo luz sobre la oscuridad, formo las aguas y la tierra, y lleno la creacion de vida.",
  patriarchs: "Dios llama a Abraham y preserva su promesa por medio de Isaac, Jacob y Jose.",
  exodus: "Dios libera a Israel de Egipto por medio de Moises, la Pascua y el cruce del mar.",
  sinai: "En el monte Sinai, Dios entrega su pacto y llama a su pueblo a vivir en santidad.",
  wilderness: "En el desierto, Dios provee cada dia y ensena a su pueblo a confiar en el.",
  conquest: "Bajo Josue, Dios guia a Israel a la tierra prometida y llama a la fidelidad.",
  judges: "En los dias de los jueces, el pueblo cae y Dios levanta libertadores con misericordia.",
  samuel: "Dios llama a Samuel desde joven y establece su palabra en Israel.",
  saul: "Saul comienza como el primer rey de Israel, pero la obediencia parcial trae perdida.",
  david: "David confia en el Senor, vence a Goliat y muestra valor basado en la fe.",
  generic: "Esta vista previa resalta un evento biblico. Escucha con atencion y entra al reto con confianza."
};

const UI_TEXT_BY_LANGUAGE = {
  en: {
    progressLabel: "Progress",
    xpLabel: "XP",
    livesLabel: "Lives",
    badgesLabel: "Badges",
    newLabel: "New",
    badgeShieldLabel: "Badge Shield",
    stageWord: "stages",
    stageLabel: "Stage",
    levelWordSingular: "Level",
    levelWordPlural: "Levels",
    completedTag: "Completed",
    lockedTag: "Locked",
    availableTag: "Available",
    replayLabel: "Replay",
    startLabel: "Start",
    challengeLabel: "Challenge",
    closeLabel: "Close",
    sourceLabel: "Find it in the Bible",
    watchPreview: "Watch Preview",
    storyIntroTitle: "Story Intro",
    keyVerseLabel: "Key Verse",
    startingInLabel: "Starting in",
    startingNowLabel: "Starting now...",
    skipIntro: "Skip Intro",
    checkAnswer: "Check Answer",
    checkSpelling: "Check Spelling",
    checkOrder: "Check Order",
    checkFact: "Check Fact",
    putEventsOrder: "Put these Bible events in order:",
    buildFactOrder: "Build this Bible fact in the right order:",
    typeAnswerPlaceholder: "Type the answer",
    pickOptionFirst: "Pick an option first.",
    typeAnswerFirst: "Type your answer first.",
    noLivesContinue: "No lives left. Use Restore Lives to continue.",
    noLivesShort: "No lives left. Use Restore Lives.",
    outOfLivesContinue: "Out of lives. Restore Lives to continue.",
    correctStageComplete: "Correct. Stage complete.",
    correctSpellingComplete: "Correct spelling. Stage complete.",
    notYetTryAgain: "Not yet. Try another attempt.",
    notCorrectSpellingRetry: "Not correct. Check spelling and try again.",
    movesLabel: "Moves",
    moveLimitExceeded: "Move limit exceeded",
    orderOffRetry: "Order is off. Adjust and retry.",
    greatSequenceComplete: "Great sequence. Stage complete.",
    undoLabel: "Undo",
    resetLabel: "Reset",
    buildLabel: "Build",
    finishFactFirst: "Finish building the full fact first.",
    factCompleteCleared: "Fact complete. Stage cleared.",
    factNotCorrectYet: "Not correct yet. Keep arranging.",
    challengePrompt: "complete this skill challenge to clear the stage.",
    hitsLabel: "Hits",
    missesLabel: "Misses",
    caughtLabel: "Caught",
    timeLabel: "Time",
    surviveLabel: "Survive",
    secShort: "sec",
    strikeAction: "Strike",
    perfectTiming: "Perfect timing.",
    missedTimingWindow: "Missed timing window.",
    challengeComplete: "Challenge complete.",
    challengeFailedReplay: "Challenge failed. Replay to retry.",
    youWereHitReplay: "You were hit. Replay to retry.",
    slingshotPrompt: "Drag the sling stone backward and release to hit the giant.",
    resetShot: "Reset Shot",
    directHitComplete: "Direct hit. Stage complete.",
    missedAimHint: "Missed. Pull farther back and aim higher.",
    musicLabel: "Music",
    sfxLabel: "SFX",
    onLabel: "On",
    offLabel: "Off",
    musicVolumeLabel: "Music Volume",
    musicStyleLabel: "Music Style",
    musicStyleCinematic: "Cinematic",
    musicStyleEnergetic: "Energetic",
    volumeLow: "Low",
    volumeMedium: "Medium",
    volumeHigh: "High",
    watchPreview: "Watch Preview",
    sourceVerseWeb: "Open in Bible (WEB)",
    dailyThoughtHeading: "Bible Thought For Today",
    dailyStrikeLabel: "Daily Strike",
    dailyStrikeButton: "Claim Daily Strike",
    dailyStrikeClaimed: "Strike Claimed Today",
    languageLabel: "Language",
    previewTitleSuffix: "Preview",
    previewRange: "Preview source range",
    narrationAuto: "narration will play automatically",
    narrationOn: "narration on",
    tapPlay: "tap Play if needed",
    loadingPreview: "Loading preview...",
    practicalPrefix: "Practical point"
  },
  es: {
    progressLabel: "Progreso",
    xpLabel: "XP",
    livesLabel: "Vidas",
    badgesLabel: "Insignias",
    newLabel: "Nuevo",
    badgeShieldLabel: "Escudo de Insignias",
    stageWord: "etapas",
    stageLabel: "Etapa",
    levelWordSingular: "Nivel",
    levelWordPlural: "Niveles",
    completedTag: "Completado",
    lockedTag: "Bloqueado",
    availableTag: "Disponible",
    replayLabel: "Repetir",
    startLabel: "Comenzar",
    challengeLabel: "Reto",
    closeLabel: "Cerrar",
    sourceLabel: "Encuentralo en la Biblia",
    watchPreview: "Ver Vista",
    storyIntroTitle: "Introduccion",
    keyVerseLabel: "Versiculo clave",
    startingInLabel: "Empieza en",
    startingNowLabel: "Empieza ahora...",
    skipIntro: "Saltar Intro",
    checkAnswer: "Revisar respuesta",
    checkSpelling: "Revisar ortografia",
    checkOrder: "Revisar orden",
    checkFact: "Revisar dato",
    putEventsOrder: "Pon estos eventos biblicos en orden:",
    buildFactOrder: "Construye este dato biblico en el orden correcto:",
    typeAnswerPlaceholder: "Escribe la respuesta",
    pickOptionFirst: "Primero elige una opcion.",
    typeAnswerFirst: "Primero escribe tu respuesta.",
    noLivesContinue: "No quedan vidas. Usa Restaurar Vidas para continuar.",
    noLivesShort: "No quedan vidas. Usa Restaurar Vidas.",
    outOfLivesContinue: "Sin vidas. Usa Restaurar Vidas para continuar.",
    correctStageComplete: "Correcto. Etapa completada.",
    correctSpellingComplete: "Ortografia correcta. Etapa completada.",
    notYetTryAgain: "Aun no. Intenta otra vez.",
    notCorrectSpellingRetry: "Aun no es correcto. Revisa la ortografia.",
    movesLabel: "Movimientos",
    moveLimitExceeded: "Limite de movimientos superado",
    orderOffRetry: "El orden no es correcto. Ajusta e intenta de nuevo.",
    greatSequenceComplete: "Excelente secuencia. Etapa completada.",
    undoLabel: "Deshacer",
    resetLabel: "Reiniciar",
    buildLabel: "Construye",
    finishFactFirst: "Termina de construir el dato completo primero.",
    factCompleteCleared: "Dato completo. Etapa superada.",
    factNotCorrectYet: "Aun no es correcto. Sigue ordenando.",
    challengePrompt: "completa este reto para superar la etapa.",
    hitsLabel: "Aciertos",
    missesLabel: "Fallos",
    caughtLabel: "Atrapados",
    timeLabel: "Tiempo",
    surviveLabel: "Sobrevive",
    secShort: "seg",
    strikeAction: "Golpear",
    perfectTiming: "Tiempo perfecto.",
    missedTimingWindow: "Fuera de la ventana de tiempo.",
    challengeComplete: "Reto completado.",
    challengeFailedReplay: "Reto fallado. Repite para intentar de nuevo.",
    youWereHitReplay: "Te alcanzaron. Repite para intentar de nuevo.",
    slingshotPrompt: "Arrastra la piedra hacia atras y suelta para golpear al gigante.",
    resetShot: "Reiniciar tiro",
    directHitComplete: "Impacto directo. Etapa completada.",
    missedAimHint: "Fallaste. Tira mas atras y apunta mas alto.",
    musicLabel: "Musica",
    sfxLabel: "Efectos",
    onLabel: "Encendido",
    offLabel: "Apagado",
    musicVolumeLabel: "Volumen musica",
    musicStyleLabel: "Estilo musical",
    musicStyleCinematic: "Cinematico",
    musicStyleEnergetic: "Energetico",
    volumeLow: "Bajo",
    volumeMedium: "Medio",
    volumeHigh: "Alto",
    watchPreview: "Ver Vista",
    sourceVerseWeb: "Abrir en la Biblia (WEB)",
    dailyThoughtHeading: "Pensamiento Biblico Del Dia",
    dailyStrikeLabel: "Racha Diaria",
    dailyStrikeButton: "Reclamar Racha",
    dailyStrikeClaimed: "Racha Reclamada Hoy",
    languageLabel: "Idioma",
    previewTitleSuffix: "Vista",
    previewRange: "Rango biblico",
    narrationAuto: "la narracion iniciara automaticamente",
    narrationOn: "narracion activa",
    tapPlay: "toca Play si es necesario",
    loadingPreview: "Cargando vista previa...",
    practicalPrefix: "Punto practico"
  }
};

const DAILY_THOUGHTS_BY_LANGUAGE = {
  en: [
    { ref: "Romans 10:17 (WEB)", thought: "Faith comes by hearing, and hearing by the word of God.", practical: "Set one fixed time today to read God's Word and write one sentence of application." },
    { ref: "Joshua 1:9 (WEB)", thought: "Be strong and courageous, for the Lord your God is with you wherever you go.", practical: "Choose the hard task you are avoiding and do the first clear step with prayer." },
    { ref: "Psalm 119:105 (WEB)", thought: "Your word is a lamp to my feet and a light for my path.", practical: "Before a decision today, pause and read one related verse first." },
    { ref: "James 1:22 (WEB)", thought: "Be doers of the word, and not only hearers.", practical: "Turn one Bible truth into one action before the day ends." },
    { ref: "Philippians 4:6 (WEB)", thought: "In everything, by prayer and petition with thanksgiving, let your requests be made known to God.", practical: "Replace one worry with a written prayer and one thank-you to God." },
    { ref: "Proverbs 3:5-6 (WEB)", thought: "Trust in the Lord with all your heart and he will make your paths straight.", practical: "Name one area you are controlling too tightly and surrender it in prayer." },
    { ref: "Galatians 6:9 (WEB)", thought: "Let's not be weary in doing good, for we will reap in due season.", practical: "Do one unseen act of kindness today and keep going in faith." }
  ],
  es: [
    { ref: "Romanos 10:17 (WEB)", thought: "La fe viene por el oir, y el oir por la palabra de Dios.", practical: "Aparta un tiempo fijo hoy para leer la Biblia y anota una aplicacion concreta." },
    { ref: "Josue 1:9 (WEB)", thought: "Se fuerte y valiente, porque el Senor tu Dios esta contigo.", practical: "Haz hoy el primer paso de la tarea dificil que has estado evitando." },
    { ref: "Salmo 119:105 (WEB)", thought: "Tu palabra es lampara a mis pies y luz para mi camino.", practical: "Antes de decidir algo importante, lee primero un versiculo relacionado." },
    { ref: "Santiago 1:22 (WEB)", thought: "Sean hacedores de la palabra, y no solamente oidores.", practical: "Convierte una verdad biblica en una accion especifica hoy." },
    { ref: "Filipenses 4:6 (WEB)", thought: "Presenten sus peticiones delante de Dios con accion de gracias.", practical: "Cambia una preocupacion por una oracion escrita y gratitud." },
    { ref: "Proverbios 3:5-6 (WEB)", thought: "Confia en el Senor de todo tu corazon y el enderezara tus caminos.", practical: "Entrega en oracion una area que estas controlando demasiado." },
    { ref: "Galatas 6:9 (WEB)", thought: "No nos cansemos de hacer el bien, porque a su tiempo segaremos.", practical: "Haz hoy un acto de bondad en secreto y persevera en fe." }
  ]
};

const FALLBACK_REFERENCE_POOLS = buildFallbackReferencePools();

const interactiveModes = [
  { id: "timing-1", engine: "timing", label: "Ark Hammer", target: 4, maxMisses: 4, speed: 980, sourceRef: "Genesis 6:14" },
  { id: "collect-1", engine: "collect", label: "Gather Grain", target: 9, maxMisses: 6, seconds: 28, spawnMs: 560, sourceRef: "Genesis 41:49" },
  { id: "dodge-1", engine: "dodge", label: "Stone Storm", target: 14, spawnMs: 420, sourceRef: "Exodus 17:12" },
  { id: "timing-2", engine: "timing", label: "Covenant Strike", target: 5, maxMisses: 4, speed: 900, sourceRef: "Exodus 24:7" },
  { id: "collect-2", engine: "collect", label: "Manna Catch", target: 10, maxMisses: 6, seconds: 26, spawnMs: 500, sourceRef: "Exodus 16:15" },
  { id: "dodge-2", engine: "dodge", label: "Valley Dash", target: 16, spawnMs: 390, sourceRef: "Joshua 8:5" },
  { id: "timing-3", engine: "timing", label: "Jericho Beat", target: 6, maxMisses: 4, speed: 840, sourceRef: "Joshua 6:20" },
  { id: "collect-3", engine: "collect", label: "Harvest Run", target: 11, maxMisses: 6, seconds: 25, spawnMs: 470, sourceRef: "Ruth 2:17" },
  { id: "dodge-3", engine: "dodge", label: "Battle Weave", target: 18, spawnMs: 360, sourceRef: "Judges 7:19" },
  { id: "timing-4", engine: "timing", label: "Signal Tap", target: 7, maxMisses: 5, speed: 790, sourceRef: "Numbers 10:9" },
  { id: "collect-4", engine: "collect", label: "Star Gather", target: 12, maxMisses: 7, seconds: 24, spawnMs: 440, sourceRef: "Genesis 15:5" },
  { id: "dodge-4", engine: "dodge", label: "Spear Escape", target: 20, spawnMs: 345, sourceRef: "1 Samuel 18:11" },
  { id: "timing-5", engine: "timing", label: "Temple Rhythm", target: 8, maxMisses: 5, speed: 760, sourceRef: "1 Samuel 1:24" },
  { id: "collect-5", engine: "collect", label: "Provision Hunt", target: 13, maxMisses: 7, seconds: 23, spawnMs: 420, sourceRef: "Exodus 36:5" },
  { id: "dodge-5", engine: "dodge", label: "Night Watch", target: 22, spawnMs: 330, sourceRef: "1 Samuel 26:7" },
  { id: "timing-6", engine: "timing", label: "Psalm Pulse", target: 8, maxMisses: 5, speed: 720, sourceRef: "1 Samuel 16:23" },
  { id: "collect-6", engine: "collect", label: "Field Sweep", target: 14, maxMisses: 8, seconds: 22, spawnMs: 400, sourceRef: "Ruth 2:2" },
  { id: "dodge-6", engine: "dodge", label: "Champion Run", target: 24, spawnMs: 315, sourceRef: "1 Samuel 17:48" },
  {
    id: "pattern-1",
    engine: "pattern",
    label: "Trumpet Pattern",
    rounds: 4,
    maxMisses: 3,
    playbackMs: 520,
    sourceRef: "Joshua 6:4-5",
    pads: [
      { icon: "📯", label: "Call" },
      { icon: "👣", label: "March" },
      { icon: "🛡️", label: "Hold" },
      { icon: "📢", label: "Shout" }
    ],
    sequences: [[0, 1, 1], [0, 1, 2, 1], [0, 1, 1, 2, 1], [0, 1, 1, 2, 3]]
  },
  {
    id: "balance-1",
    engine: "balance",
    label: "Steady the Ark",
    target: 7,
    maxMisses: 4,
    drift: 0.025,
    sourceRef: "Joshua 3:17"
  },
  { id: "slingshot-1", engine: "slingshot", label: "Giant Duel", target: 1, sourceRef: "1 Samuel 17:45-50" },
  { id: "slingshot-2", engine: "slingshot", label: "Valley Finale", target: 1, sourceRef: "1 Samuel 17:48-50" },
  { id: "timing-7", engine: "timing", label: "Brook Stone Count", target: 6, maxMisses: 4, speed: 780, sourceRef: "1 Samuel 17:40" },
  { id: "collect-7", engine: "collect", label: "Gleaning Field Run", target: 12, maxMisses: 7, seconds: 24, spawnMs: 430, sourceRef: "Ruth 2:2-3" },
  { id: "dodge-7", engine: "dodge", label: "Cave Refuge Sprint", target: 20, spawnMs: 340, sourceRef: "1 Samuel 22:1" },
  {
    id: "pattern-2",
    engine: "pattern",
    label: "Creation Sequence",
    rounds: 4,
    maxMisses: 3,
    playbackMs: 500,
    sourceRef: "Genesis 1:3-18",
    pads: [
      { icon: "☀️", label: "Light" },
      { icon: "🌊", label: "Waters" },
      { icon: "🌿", label: "Land" },
      { icon: "⭐", label: "Lights" }
    ],
    sequences: [[0, 1, 2], [0, 1, 2, 3], [0, 2, 3, 1], [0, 1, 2, 3, 0]]
  },
  {
    id: "balance-2",
    engine: "balance",
    label: "Staff Steady",
    target: 8,
    maxMisses: 4,
    drift: 0.028,
    sourceRef: "Exodus 14:21"
  },
  { id: "timing-8", engine: "timing", label: "Shout at Jericho", target: 7, maxMisses: 4, speed: 760, sourceRef: "Joshua 6:16" },
  { id: "collect-8", engine: "collect", label: "Manna Morning Rush", target: 13, maxMisses: 7, seconds: 23, spawnMs: 410, sourceRef: "Exodus 16:21" },
  { id: "dodge-8", engine: "dodge", label: "Chariot Escape", target: 21, spawnMs: 335, sourceRef: "Exodus 14:25" },
  { id: "timing-9", engine: "timing", label: "Samuel Night Call", target: 8, maxMisses: 5, speed: 740, sourceRef: "1 Samuel 3:10" },
  { id: "collect-9", engine: "collect", label: "Tabernacle Supply Run", target: 14, maxMisses: 8, seconds: 22, spawnMs: 390, sourceRef: "Exodus 35:21-22" },
  { id: "dodge-9", engine: "dodge", label: "Elah Footwork", target: 23, spawnMs: 325, sourceRef: "1 Samuel 17:19" },
  { id: "timing-10", engine: "timing", label: "Harp Rhythm", target: 9, maxMisses: 5, speed: 710, sourceRef: "1 Samuel 16:23" }
];

const THEMED_INTERACTIVE_MODE_SETS = {
  "Creation Dawn": [
    {
      id: "creation-days-pattern",
      engine: "pattern",
      label: "Days of Creation",
      rounds: 4,
      maxMisses: 3,
      playbackMs: 500,
      sourceRef: "Genesis 1:3-18",
      storyPrompt: "Remember the unfolding order as God forms light, sky, land, and lights.",
      keyboardHint: "Keyboard: press 1-4 to repeat the creation pattern after it appears.",
      pads: [
        { icon: "☀️", label: "Light" },
        { icon: "🌊", label: "Sea" },
        { icon: "🌿", label: "Land" },
        { icon: "⭐", label: "Lights" }
      ],
      sequences: [[0, 1, 2], [0, 1, 2, 3], [0, 2, 1, 3], [0, 1, 2, 3, 0]]
    },
    {
      id: "creation-garden-steady",
      engine: "balance",
      label: "Garden Keep",
      target: 7,
      maxMisses: 4,
      drift: 0.024,
      sourceRef: "Genesis 2:15",
      storyPrompt: "Keep your footing steady as Adam tends the garden God has given.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to keep the marker inside the gold band."
    },
    {
      id: "creation-image-discern",
      engine: "discern",
      label: "Image-Bearer Choice",
      maxMisses: 3,
      sourceRef: "Genesis 1:26-28; 2:7",
      storyPrompt: "Discern the right parts of God's good creation as the story unfolds.",
      secondaryPrompt: "Choose the right part of the creation story each round.",
      keyboardHint: "Keyboard: press 1-4 to choose the right creation answer.",
      cards: [
        { icon: "☀️", label: "Light" },
        { icon: "🌿", label: "Plants" },
        { icon: "👤", label: "Man" },
        { icon: "😴", label: "Rest" }
      ],
      targets: [
        { prompt: "What did God create first when He said, 'Let there be' in Genesis 1?", correctIndex: 0 },
        { prompt: "What did the earth bring forth on day three?", correctIndex: 1 },
        { prompt: "What did God form from the dust of the ground?", correctIndex: 2 },
        { prompt: "What did God do on the seventh day?", correctIndex: 3 }
      ]
    }
  ],
  "Fall and Mercy": [
    {
      id: "fall-serpent-evasion",
      engine: "dodge",
      label: "Serpent Evasion",
      target: 16,
      spawnMs: 360,
      sourceRef: "Genesis 3:1-6",
      storyPrompt: "Stay clear of the serpent's attack as temptation closes in.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to avoid the serpent's strikes."
    },
    {
      id: "fall-cherubim-watch",
      engine: "balance",
      label: "Cherubim Watch",
      target: 8,
      maxMisses: 4,
      drift: 0.03,
      sourceRef: "Genesis 3:24",
      storyPrompt: "Hold the path carefully as the flaming sword guards the way to the tree of life.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to stay inside the guarded path."
    },
    {
      id: "fall-garden-hiding",
      engine: "route",
      label: "Garden Hiding",
      maxMisses: 4,
      sourceRef: "Genesis 3:8-10",
      storyPrompt: "Trace Adam and Eve's fearful path as they hide among the trees of the garden.",
      secondaryPrompt: "Follow the hiding path one turn at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the hiding path.",
      routeSteps: [
        { dir: "left", icon: "🌳", label: "Trees" },
        { dir: "down", icon: "👣", label: "Hide" },
        { dir: "right", icon: "🍃", label: "Cover" },
        { dir: "up", icon: "👂", label: "Hear" }
      ]
    }
  ],
  "Flood and Covenant": [
    {
      id: "flood-ark-route",
      engine: "route",
      label: "Ark Blueprint",
      maxMisses: 4,
      sourceRef: "Genesis 6:14-16",
      storyPrompt: "Follow Noah's build path as he obeys God's design for the ark.",
      secondaryPrompt: "Trace the ark-building route one step at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the ark-building route.",
      routeSteps: [
        { dir: "up", icon: "🪵", label: "Gopher Wood" },
        { dir: "right", icon: "📏", label: "Measure" },
        { dir: "down", icon: "🛢️", label: "Pitch" },
        { dir: "left", icon: "🚪", label: "Door" }
      ]
    },
    {
      id: "flood-kind-discern",
      engine: "discern",
      label: "Kinds Preserved",
      maxMisses: 3,
      sourceRef: "Genesis 7:2-3",
      storyPrompt: "Discern the creatures and people God preserved through the flood.",
      secondaryPrompt: "Choose the right answer for each flood round.",
      keyboardHint: "Keyboard: press 1-4 to choose the right flood answer.",
      cards: [
        { icon: "🛶", label: "Ark" },
        { icon: "🕊️", label: "Dove" },
        { icon: "🌈", label: "Rainbow" },
        { icon: "🐘", label: "Animal Pairs" }
      ],
      targets: [
        { prompt: "What did God command Noah to bring into the ark by twos?", correctIndex: 3 },
        { prompt: "What vessel carried Noah's family through the flood?", correctIndex: 0 },
        { prompt: "What bird did Noah send out after the waters began to recede?", correctIndex: 1 },
        { prompt: "What sign did God set in the cloud after the flood?", correctIndex: 2 }
      ]
    },
    {
      id: "flood-waters-pattern",
      engine: "pattern",
      label: "Forty-Day Watch",
      rounds: 4,
      maxMisses: 4,
      playbackMs: 505,
      sourceRef: "Genesis 7:11-12; 8:6",
      storyPrompt: "Remember the flood rhythm as the rain falls and Noah waits for dry ground.",
      keyboardHint: "Keyboard: press 1-4 to repeat the flood-watch pattern.",
      pads: [
        { icon: "☔", label: "Rain" },
        { icon: "🌊", label: "Waters" },
        { icon: "🛶", label: "Ark" },
        { icon: "🕊️", label: "Wait" }
      ],
      sequences: [[0, 1, 2], [0, 1, 2, 3], [0, 1, 0, 2], [0, 1, 2, 3, 2]]
    },
    {
      id: "flood-ark-balance",
      engine: "balance",
      label: "Ark Steady",
      target: 8,
      maxMisses: 4,
      drift: 0.026,
      sourceRef: "Genesis 7:17-18",
      storyPrompt: "Hold steady while the ark rises on the waters exactly as God said.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to keep the marker inside the safe band."
    },
    {
      id: "flood-dove-route",
      engine: "route",
      label: "Dove Return",
      maxMisses: 4,
      sourceRef: "Genesis 8:8-11",
      storyPrompt: "Follow the dove's hopeful path as Noah waits for dry land to appear.",
      secondaryPrompt: "Trace the dove's route from ark to olive leaf and back.",
      keyboardHint: "Keyboard: use arrow keys or WASD to trace the dove's return.",
      routeSteps: [
        { dir: "up", icon: "🕊️", label: "Send Out" },
        { dir: "right", icon: "🌿", label: "Olive Leaf" },
        { dir: "down", icon: "🌍", label: "Dry Land" },
        { dir: "left", icon: "🛶", label: "Return" }
      ]
    },
    {
      id: "flood-covenant-discern",
      engine: "discern",
      label: "Covenant Sign",
      maxMisses: 3,
      sourceRef: "Genesis 9:8-17",
      storyPrompt: "Discern the covenant sign and promise God gave after the flood.",
      secondaryPrompt: "Choose the covenant truth that fits each prompt.",
      keyboardHint: "Keyboard: press 1-4 to choose the covenant answer.",
      cards: [
        { icon: "🌈", label: "Rainbow" },
        { icon: "🌧️", label: "Flood" },
        { icon: "👨‍👩‍👦", label: "Noah's Family" },
        { icon: "🤝", label: "Covenant" }
      ],
      targets: [
        { prompt: "What sign did God place in the cloud as a covenant reminder?", correctIndex: 0 },
        { prompt: "What judgment did God promise would not destroy all flesh again?", correctIndex: 1 },
        { prompt: "With whom did God establish this covenant after the flood?", correctIndex: 2 },
        { prompt: "What kind of promise did God make with Noah and every living creature?", correctIndex: 3 }
      ]
    },
    {
      id: "flood-rainbow-pattern",
      engine: "pattern",
      label: "Rainbow Remembering",
      rounds: 4,
      maxMisses: 4,
      playbackMs: 500,
      sourceRef: "Genesis 9:13-16",
      storyPrompt: "Repeat the covenant pattern as the rainbow calls Noah to remember God's mercy.",
      keyboardHint: "Keyboard: press 1-4 to repeat the rainbow pattern.",
      pads: [
        { icon: "🌈", label: "Bow" },
        { icon: "☁️", label: "Cloud" },
        { icon: "💧", label: "Waters" },
        { icon: "🤝", label: "Remember" }
      ],
      sequences: [[0, 1, 3], [0, 1, 2, 3], [0, 3, 1, 2], [0, 1, 2, 3, 3]]
    }
  ],
  "Nations and Babel": [
    {
      id: "babel-brick-pattern",
      engine: "pattern",
      label: "Brick and Mortar",
      rounds: 4,
      maxMisses: 4,
      playbackMs: 500,
      sourceRef: "Genesis 11:3",
      storyPrompt: "Remember the builders' brick-and-mortar rhythm as Babel rises in pride.",
      keyboardHint: "Keyboard: press 1-4 to repeat the Babel-building pattern.",
      pads: [
        { icon: "🧱", label: "Brick" },
        { icon: "🔥", label: "Burn" },
        { icon: "🛢️", label: "Mortar" },
        { icon: "🏗️", label: "Build" }
      ],
      sequences: [[0, 1, 2], [0, 1, 2, 3], [0, 2, 3, 0], [0, 1, 2, 3, 0]]
    },
    {
      id: "babel-pride-discern",
      engine: "discern",
      label: "Pride or Obedience",
      maxMisses: 3,
      sourceRef: "Genesis 11:4-6",
      storyPrompt: "Discern the proud choices that shaped the tower of Babel.",
      secondaryPrompt: "Choose the answer that fits the Babel story.",
      keyboardHint: "Keyboard: press 1-4 to choose the right Babel answer.",
      cards: [
        { icon: "🏙️", label: "City" },
        { icon: "🗼", label: "Tower" },
        { icon: "👤", label: "Name" },
        { icon: "🌍", label: "Scatter" }
      ],
      targets: [
        { prompt: "What did the people say they wanted to build besides a city?", correctIndex: 1 },
        { prompt: "What did the people want to make for themselves?", correctIndex: 2 },
        { prompt: "What did they fear would happen to them over the whole earth?", correctIndex: 3 },
        { prompt: "What were the people building together in Shinar?", correctIndex: 0 }
      ]
    },
    {
      id: "babel-tower-balance",
      engine: "balance",
      label: "Tower Tilt",
      target: 8,
      maxMisses: 4,
      drift: 0.029,
      sourceRef: "Genesis 11:4",
      storyPrompt: "Hold the tower line as human pride tries to rise to the heavens.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to keep the marker inside the tower band."
    },
    {
      id: "babel-scatter-route",
      engine: "route",
      label: "Scatter the Nations",
      maxMisses: 4,
      sourceRef: "Genesis 11:8-9",
      storyPrompt: "Trace the scattering route as God spreads the people over the earth.",
      secondaryPrompt: "Follow the path of scattering one move at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the scattering route.",
      routeSteps: [
        { dir: "up", icon: "🗼", label: "Babel" },
        { dir: "right", icon: "🗣️", label: "Confuse" },
        { dir: "down", icon: "🌍", label: "Scatter" },
        { dir: "left", icon: "👣", label: "Nations" }
      ]
    },
    {
      id: "babel-tongues-pattern",
      engine: "pattern",
      label: "Tongues Confused",
      rounds: 4,
      maxMisses: 4,
      playbackMs: 495,
      sourceRef: "Genesis 11:7",
      storyPrompt: "Repeat the language-shift pattern as God confuses the speech at Babel.",
      keyboardHint: "Keyboard: press 1-4 to repeat the language pattern.",
      pads: [
        { icon: "🗣️", label: "Speech" },
        { icon: "❓", label: "Confused" },
        { icon: "🧱", label: "Stopped" },
        { icon: "🌍", label: "Scattered" }
      ],
      sequences: [[0, 1, 2], [0, 1, 2, 3], [1, 0, 2, 3], [0, 1, 2, 3, 1]]
    },
    {
      id: "babel-nations-discern",
      engine: "discern",
      label: "Nations Sent Out",
      maxMisses: 3,
      sourceRef: "Genesis 10:32; 11:9",
      storyPrompt: "Discern how God formed nations and languages after Babel.",
      secondaryPrompt: "Choose the true outcome from the Babel account.",
      keyboardHint: "Keyboard: press 1-4 to choose the right outcome.",
      cards: [
        { icon: "🌊", label: "Flood Again" },
        { icon: "🌍", label: "Nations" },
        { icon: "🏗️", label: "Finish Tower" },
        { icon: "👑", label: "One King" }
      ],
      targets: [
        { prompt: "What spread over the earth after Babel?", correctIndex: 1 },
        { prompt: "What did the people fail to finish in Shinar?", correctIndex: 2 },
        { prompt: "What did God confuse at Babel?", correctIndex: 1 },
        { prompt: "What did Babel not produce for all humanity?", correctIndex: 3 }
      ]
    }
  ],
  "Burning Bush": [
    {
      id: "bush-holy-ground-route",
      engine: "route",
      label: "Holy Ground",
      maxMisses: 4,
      sourceRef: "Exodus 3:4-5",
      storyPrompt: "Trace Moses' holy-ground approach as God calls him from the burning bush.",
      secondaryPrompt: "Follow the call one step at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the holy-ground route.",
      routeSteps: [
        { dir: "up", icon: "🏔️", label: "Horeb" },
        { dir: "right", icon: "🔥", label: "Bush" },
        { dir: "down", icon: "👣", label: "Sandals Off" },
        { dir: "left", icon: "👂", label: "Listen" }
      ]
    },
    {
      id: "bush-i-am-discern",
      engine: "discern",
      label: "I AM",
      maxMisses: 3,
      sourceRef: "Exodus 3:13-15",
      storyPrompt: "Discern what God revealed about His name to Moses.",
      secondaryPrompt: "Choose the answer that fits the burning bush account.",
      keyboardHint: "Keyboard: press 1-4 to choose the right answer.",
      cards: [
        { icon: "🔥", label: "Bush" },
        { icon: "👂", label: "Call" },
        { icon: "✋", label: "I AM" },
        { icon: "👑", label: "Pharaoh" }
      ],
      targets: [
        { prompt: "What name did God tell Moses to say to Israel?", correctIndex: 2 },
        { prompt: "What first drew Moses to look more closely on Horeb?", correctIndex: 0 },
        { prompt: "What was Moses doing when God called his name?", correctIndex: 1 },
        { prompt: "Whom was Moses sent to confront in Egypt?", correctIndex: 3 }
      ]
    },
    {
      id: "bush-shepherd-pattern",
      engine: "pattern",
      label: "Call and Response",
      rounds: 4,
      maxMisses: 4,
      playbackMs: 510,
      sourceRef: "Exodus 3:1-10",
      storyPrompt: "Remember the call, answer, and mission pattern from the burning bush.",
      keyboardHint: "Keyboard: press 1-4 to repeat the calling pattern.",
      pads: [
        { icon: "🐑", label: "Flock" },
        { icon: "🔥", label: "Bush" },
        { icon: "👂", label: "Moses" },
        { icon: "🗣️", label: "Go" }
      ],
      sequences: [[0, 1, 2], [0, 1, 2, 3], [1, 2, 3, 2], [0, 1, 2, 3, 3]]
    },
    {
      id: "bush-staff-sign-balance",
      engine: "balance",
      label: "Staff Sign",
      target: 8,
      maxMisses: 4,
      drift: 0.028,
      sourceRef: "Exodus 4:2-5",
      storyPrompt: "Hold steady as God turns Moses' staff into a sign of His power.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to keep the marker inside the sign band."
    },
    {
      id: "bush-egypt-return-route",
      engine: "route",
      label: "Return to Egypt",
      maxMisses: 4,
      sourceRef: "Exodus 4:18-20",
      storyPrompt: "Trace the route back to Egypt as Moses obeys the Lord's command.",
      secondaryPrompt: "Follow the return path one move at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the return route.",
      routeSteps: [
        { dir: "left", icon: "🐑", label: "Midian" },
        { dir: "up", icon: "🪵", label: "Staff" },
        { dir: "right", icon: "👨‍👩‍👦", label: "Family" },
        { dir: "down", icon: "🏛️", label: "Egypt" }
      ]
    }
  ],
  "Plagues and Passover": [
    {
      id: "plagues-sequence-pattern",
      engine: "pattern",
      label: "Plague Sequence",
      rounds: 4,
      maxMisses: 4,
      playbackMs: 505,
      sourceRef: "Exodus 7:20; 8:6; 9:23; 10:22",
      storyPrompt: "Remember the rising pattern of God's signs over Egypt.",
      keyboardHint: "Keyboard: press 1-4 to repeat the plague pattern.",
      pads: [
        { icon: "🩸", label: "Blood" },
        { icon: "🐸", label: "Frogs" },
        { icon: "🌩️", label: "Hail" },
        { icon: "🌑", label: "Darkness" }
      ],
      sequences: [[0, 1, 2], [0, 1, 2, 3], [1, 2, 3, 0], [0, 1, 2, 3, 2]]
    },
    {
      id: "plagues-passover-discern",
      engine: "discern",
      label: "Passover Readiness",
      maxMisses: 3,
      sourceRef: "Exodus 12:3-14",
      storyPrompt: "Discern the steps of faithful obedience on Passover night.",
      secondaryPrompt: "Choose the answer that matches the Passover instructions.",
      keyboardHint: "Keyboard: press 1-4 to choose the right Passover answer.",
      cards: [
        { icon: "🐑", label: "Lamb" },
        { icon: "🩸", label: "Blood" },
        { icon: "🍞", label: "Bread" },
        { icon: "🚪", label: "Doorposts" }
      ],
      targets: [
        { prompt: "What animal was each household to take for Passover?", correctIndex: 0 },
        { prompt: "Where was the blood placed as a sign?", correctIndex: 3 },
        { prompt: "What kind of bread did Israel eat in haste?", correctIndex: 2 },
        { prompt: "What was spread on the doorposts as a sign of protection?", correctIndex: 1 }
      ]
    },
    {
      id: "plagues-doorpost-route",
      engine: "route",
      label: "Doorpost Marking",
      maxMisses: 4,
      sourceRef: "Exodus 12:7",
      storyPrompt: "Trace the Passover marking route with careful obedience.",
      secondaryPrompt: "Follow the doorpost path one move at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the doorpost route.",
      routeSteps: [
        { dir: "up", icon: "🚪", label: "House" },
        { dir: "left", icon: "🩸", label: "Left Post" },
        { dir: "right", icon: "🩸", label: "Right Post" },
        { dir: "up", icon: "🪵", label: "Lintel" }
      ]
    },
    {
      id: "plagues-ready-balance",
      engine: "balance",
      label: "Ready to Depart",
      target: 8,
      maxMisses: 4,
      drift: 0.028,
      sourceRef: "Exodus 12:11",
      storyPrompt: "Hold steady in readiness as Israel eats the Passover prepared to leave.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to stay in the ready band."
    },
    {
      id: "plagues-midnight-discern",
      engine: "discern",
      label: "Midnight Deliverance",
      maxMisses: 3,
      sourceRef: "Exodus 12:29-33",
      storyPrompt: "Discern what happened at midnight when God brought Israel out.",
      secondaryPrompt: "Choose the outcome that matches the Exodus account.",
      keyboardHint: "Keyboard: press 1-4 to choose the right Exodus answer.",
      cards: [
        { icon: "🌙", label: "Midnight" },
        { icon: "😭", label: "Cry" },
        { icon: "🏃", label: "Depart" },
        { icon: "👑", label: "Pharaoh" }
      ],
      targets: [
        { prompt: "What time is highlighted when the final plague struck Egypt?", correctIndex: 0 },
        { prompt: "What rose up throughout Egypt after the plague?", correctIndex: 1 },
        { prompt: "What did Pharaoh tell Israel to do after the plague?", correctIndex: 2 },
        { prompt: "Who finally urged Moses and Aaron to leave Egypt?", correctIndex: 3 }
      ]
    }
  ],
  "Sea Crossing": [
    {
      id: "sea-dry-ground-route",
      engine: "route",
      label: "Dry Ground Path",
      maxMisses: 4,
      sourceRef: "Exodus 14:21-22",
      storyPrompt: "Trace Israel's path through the sea on dry ground.",
      secondaryPrompt: "Follow the dry-ground route one move at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the sea path.",
      routeSteps: [
        { dir: "up", icon: "🪵", label: "Staff" },
        { dir: "right", icon: "🌊", label: "Waters Part" },
        { dir: "up", icon: "👣", label: "Dry Ground" },
        { dir: "left", icon: "🛡️", label: "Walls of Water" }
      ]
    },
    {
      id: "sea-walls-balance",
      engine: "balance",
      label: "Waters Stand",
      target: 8,
      maxMisses: 4,
      drift: 0.027,
      sourceRef: "Exodus 14:22,29",
      storyPrompt: "Keep the path steady while the waters stand like walls on both sides.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to keep the marker inside the dry-ground band."
    },
    {
      id: "sea-faith-discern",
      engine: "discern",
      label: "Sea of Deliverance",
      maxMisses: 3,
      sourceRef: "Exodus 14:13-31",
      storyPrompt: "Discern the acts of deliverance God performed at the sea.",
      secondaryPrompt: "Choose the answer that fits the sea-crossing story.",
      keyboardHint: "Keyboard: press 1-4 to choose the right sea-crossing answer.",
      cards: [
        { icon: "🌊", label: "Sea" },
        { icon: "🪵", label: "Staff" },
        { icon: "🚶", label: "Israel" },
        { icon: "🐎", label: "Egypt" }
      ],
      targets: [
        { prompt: "What did Moses stretch out over the sea?", correctIndex: 1 },
        { prompt: "Who crossed through the sea on dry ground?", correctIndex: 2 },
        { prompt: "What covered Pharaoh's army when the waters returned?", correctIndex: 0 },
        { prompt: "Whose chariots were overthrown in the sea?", correctIndex: 3 }
      ]
    },
    {
      id: "sea-song-pattern",
      engine: "pattern",
      label: "Song of the Sea",
      rounds: 4,
      maxMisses: 4,
      playbackMs: 500,
      sourceRef: "Exodus 15:1,20-21",
      storyPrompt: "Repeat the pattern of praise as Moses and Miriam sing after the crossing.",
      keyboardHint: "Keyboard: press 1-4 to repeat the song pattern.",
      pads: [
        { icon: "🎶", label: "Sing" },
        { icon: "🌊", label: "Sea" },
        { icon: "🥁", label: "Tambourine" },
        { icon: "🙌", label: "Praise" }
      ],
      sequences: [[0, 1, 3], [0, 1, 2, 3], [0, 2, 3, 1], [0, 1, 2, 3, 3]]
    },
    {
      id: "sea-shore-route",
      engine: "route",
      label: "Far Shore",
      maxMisses: 4,
      sourceRef: "Exodus 14:30-31",
      storyPrompt: "Follow the final steps to the far shore as Israel sees God's salvation.",
      secondaryPrompt: "Trace the path to safety one move at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the shoreward path.",
      routeSteps: [
        { dir: "right", icon: "👣", label: "Cross" },
        { dir: "up", icon: "🏖️", label: "Shore" },
        { dir: "left", icon: "🙌", label: "Fear the Lord" },
        { dir: "down", icon: "✝️", label: "Trust" }
      ]
    }
  ],
  "Jordan Crossing": [
    {
      id: "jordan-follow-ark-route",
      engine: "route",
      label: "Follow the Ark",
      maxMisses: 4,
      sourceRef: "Joshua 3:3-4",
      storyPrompt: "Trace the route as Israel follows the ark into a new land.",
      secondaryPrompt: "Follow the ark route one move at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the ark route.",
      routeSteps: [
        { dir: "up", icon: "📦", label: "Ark" },
        { dir: "right", icon: "🌊", label: "Jordan" },
        { dir: "up", icon: "👣", label: "Cross" },
        { dir: "left", icon: "🏕️", label: "Camp" }
      ]
    },
    {
      id: "jordan-riverbed-balance",
      engine: "balance",
      label: "Riverbed Step",
      target: 8,
      maxMisses: 4,
      drift: 0.028,
      sourceRef: "Joshua 3:17",
      storyPrompt: "Hold steady while the priests stand firm in the Jordan and Israel crosses.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to keep the marker inside the crossing band."
    },
    {
      id: "jordan-memorial-discern",
      engine: "discern",
      label: "Memorial Stones",
      maxMisses: 3,
      sourceRef: "Joshua 4:5-7",
      storyPrompt: "Discern the meaning of the stones Israel gathered from the Jordan.",
      secondaryPrompt: "Choose the answer that matches the memorial stones story.",
      keyboardHint: "Keyboard: press 1-4 to choose the right Jordan answer.",
      cards: [
        { icon: "🪨", label: "Stones" },
        { icon: "📦", label: "Ark" },
        { icon: "🌊", label: "Jordan" },
        { icon: "👶", label: "Children" }
      ],
      targets: [
        { prompt: "What did Israel take from the Jordan as a memorial?", correctIndex: 0 },
        { prompt: "What stood in the middle of the river during the crossing?", correctIndex: 1 },
        { prompt: "From which river were the memorial stones taken?", correctIndex: 2 },
        { prompt: "Who would one day ask, 'What do these stones mean?'", correctIndex: 3 }
      ]
    },
    {
      id: "jordan-jericho-pattern",
      engine: "pattern",
      label: "Jericho March",
      rounds: 4,
      maxMisses: 4,
      playbackMs: 510,
      sourceRef: "Joshua 6:3-5,16",
      storyPrompt: "Repeat the march, trumpet, and shout pattern before Jericho falls.",
      keyboardHint: "Keyboard: press 1-4 to repeat the Jericho pattern.",
      pads: [
        { icon: "👣", label: "March" },
        { icon: "📯", label: "Trumpet" },
        { icon: "🤫", label: "Silence" },
        { icon: "📢", label: "Shout" }
      ],
      sequences: [[0, 2, 1], [0, 2, 1, 0], [0, 2, 1, 0, 2], [0, 2, 1, 0, 3]]
    },
    {
      id: "jordan-jericho-discern",
      engine: "discern",
      label: "Jericho Obedience",
      maxMisses: 3,
      sourceRef: "Joshua 6:2-20",
      storyPrompt: "Discern how Israel obeyed God's unusual plan at Jericho.",
      secondaryPrompt: "Choose the answer that fits the Jericho account.",
      keyboardHint: "Keyboard: press 1-4 to choose the right Jericho answer.",
      cards: [
        { icon: "🧱", label: "Walls" },
        { icon: "📯", label: "Trumpets" },
        { icon: "👣", label: "March" },
        { icon: "📢", label: "Shout" }
      ],
      targets: [
        { prompt: "What did the priests carry and blow during the march around Jericho?", correctIndex: 1 },
        { prompt: "What did Israel do around Jericho for six days?", correctIndex: 2 },
        { prompt: "What fell after the people shouted in faith?", correctIndex: 0 },
        { prompt: "What did Joshua tell the people to do on the seventh day after the trumpets sounded?", correctIndex: 3 }
      ]
    }
  ],
  "Land and Legacy": [
    {
      id: "legacy-covenant-balance",
      engine: "balance",
      label: "Covenant Stand",
      target: 8,
      maxMisses: 4,
      drift: 0.027,
      sourceRef: "Joshua 24:14-15",
      storyPrompt: "Stand firm as Joshua calls Israel to serve the Lord alone.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to keep the marker inside the covenant band."
    },
    {
      id: "legacy-achan-discern",
      engine: "discern",
      label: "Hidden Things",
      maxMisses: 3,
      sourceRef: "Joshua 7:10-21",
      storyPrompt: "Discern what brought trouble to Israel after Jericho.",
      secondaryPrompt: "Choose the answer that fits the Achan account.",
      keyboardHint: "Keyboard: press 1-4 to choose the right answer.",
      cards: [
        { icon: "🥷", label: "Hidden" },
        { icon: "💍", label: "Silver" },
        { icon: "🧥", label: "Mantle" },
        { icon: "⛺", label: "Tent" }
      ],
      targets: [
        { prompt: "Where were the devoted things hidden?", correctIndex: 3 },
        { prompt: "What precious metal did Achan confess taking?", correctIndex: 1 },
        { prompt: "What beautiful garment did Achan take from Jericho?", correctIndex: 2 },
        { prompt: "What was done with the devoted things before Israel was confronted?", correctIndex: 0 }
      ]
    },
    {
      id: "legacy-ai-route",
      engine: "route",
      label: "Ai Ambush",
      maxMisses: 4,
      sourceRef: "Joshua 8:4-7",
      storyPrompt: "Trace Joshua's ambush route as Israel turns back to strike Ai.",
      secondaryPrompt: "Follow the battle route one move at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow the ambush route.",
      routeSteps: [
        { dir: "left", icon: "🌃", label: "Night" },
        { dir: "up", icon: "🫥", label: "Hide" },
        { dir: "right", icon: "🏃", label: "Retreat" },
        { dir: "down", icon: "⚔️", label: "Turn" }
      ]
    },
    {
      id: "legacy-gibeon-pattern",
      engine: "pattern",
      label: "Long Day Signal",
      rounds: 4,
      maxMisses: 4,
      playbackMs: 510,
      sourceRef: "Joshua 10:12-14",
      storyPrompt: "Repeat the battle signal as God lengthens the day for Israel's victory.",
      keyboardHint: "Keyboard: press 1-4 to repeat the long-day pattern.",
      pads: [
        { icon: "☀️", label: "Sun" },
        { icon: "🌙", label: "Moon" },
        { icon: "⚔️", label: "Battle" },
        { icon: "🙌", label: "Victory" }
      ],
      sequences: [[0, 1, 2], [0, 1, 2, 3], [2, 0, 1, 3], [0, 1, 2, 3, 2]]
    },
    {
      id: "legacy-choice-discern",
      engine: "discern",
      label: "Choose This Day",
      maxMisses: 3,
      sourceRef: "Joshua 23:14; 24:14-24",
      storyPrompt: "Discern the covenant choice Joshua set before Israel.",
      secondaryPrompt: "Choose the answer that matches Joshua's farewell call.",
      keyboardHint: "Keyboard: press 1-4 to choose the covenant answer.",
      cards: [
        { icon: "🏠", label: "My House" },
        { icon: "🛐", label: "Serve" },
        { icon: "📜", label: "Law" },
        { icon: "🪨", label: "Witness" }
      ],
      targets: [
        { prompt: "What did Joshua say he and his house would do?", correctIndex: 1 },
        { prompt: "Whose house did Joshua mention in his covenant declaration?", correctIndex: 0 },
        { prompt: "What stone was set up as a witness to the covenant?", correctIndex: 3 },
        { prompt: "What did Joshua read before the people when renewing covenant?", correctIndex: 2 }
      ]
    }
  ],
  "David and Courage": [
    {
      id: "david-stones-pattern",
      engine: "pattern",
      label: "Brook Stones",
      rounds: 4,
      maxMisses: 4,
      playbackMs: 500,
      sourceRef: "1 Samuel 17:40",
      storyPrompt: "Remember the stone-picking pattern as David chooses smooth stones from the brook.",
      keyboardHint: "Keyboard: press 1-4 to repeat the stone pattern.",
      pads: [
        { icon: "🪨", label: "Stone" },
        { icon: "🌊", label: "Brook" },
        { icon: "🧺", label: "Bag" },
        { icon: "🎯", label: "Aim" }
      ],
      sequences: [[0, 1, 0], [0, 1, 0, 2], [0, 1, 0, 2, 0], [0, 1, 0, 2, 3]]
    },
    {
      id: "david-provisions-route",
      engine: "route",
      label: "Battle-Line Errand",
      maxMisses: 4,
      sourceRef: "1 Samuel 17:17-20",
      storyPrompt: "Trace David's path as he carries bread and grain to the battle line.",
      secondaryPrompt: "Follow the errand route one move at a time.",
      keyboardHint: "Keyboard: use arrow keys or WASD to follow David's errand route.",
      routeSteps: [
        { dir: "up", icon: "🍞", label: "Bread" },
        { dir: "right", icon: "🧀", label: "Cheese" },
        { dir: "up", icon: "🏕️", label: "Camp" },
        { dir: "left", icon: "👬", label: "Brothers" }
      ]
    },
    {
      id: "david-armor-discern",
      engine: "discern",
      label: "Trust or Armor",
      maxMisses: 3,
      sourceRef: "1 Samuel 17:38-40,45-47",
      storyPrompt: "Discern what David trusted before going out against Goliath.",
      secondaryPrompt: "Choose the answer that fits David's courage.",
      keyboardHint: "Keyboard: press 1-4 to choose the right David answer.",
      cards: [
        { icon: "🛡️", label: "Armor" },
        { icon: "🪨", label: "Stone" },
        { icon: "✝️", label: "Yahweh" },
        { icon: "⚔️", label: "Sword" }
      ],
      targets: [
        { prompt: "Whom did David say the battle belonged to?", correctIndex: 2 },
        { prompt: "What did David choose from the brook before the battle?", correctIndex: 1 },
        { prompt: "What did David refuse because he had not tested it?", correctIndex: 0 },
        { prompt: "What weapon did Goliath trust to defeat David?", correctIndex: 3 }
      ]
    },
    {
      id: "david-giant-duel",
      engine: "slingshot",
      label: "Giant Duel",
      sourceRef: "1 Samuel 17:49-50",
      storyPrompt: "Pull back the sling and strike true against the champion of Gath.",
      secondaryPrompt: "Aim for the giant's forehead and let the stone fly in faith.",
      keyboardHint: "Keyboard: arrows adjust your pull, Space or Enter launches, and R resets the shot."
    },
    {
      id: "david-courage-balance",
      engine: "balance",
      label: "Stand in Courage",
      target: 8,
      maxMisses: 4,
      drift: 0.028,
      sourceRef: "1 Samuel 17:32-37",
      storyPrompt: "Hold steady in courage as David remembers how God delivered him before.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to keep the marker inside the courage band."
    }
  ]
};


const badgeSymbolThemes = [
  { icon: "🌳", name: "Tree of Life" },
  { icon: "🌈", name: "Covenant Rainbow" },
  { icon: "🛶", name: "Noah's Ark" },
  { icon: "🕊️", name: "Olive Branch" },
  { icon: "⭐", name: "Abraham's Stars" },
  { icon: "🪜", name: "Jacob's Ladder" },
  { icon: "🧥", name: "Joseph's Coat" },
  { icon: "🔥", name: "Burning Bush" },
  { icon: "🐑", name: "Passover Lamb" },
  { icon: "🌊", name: "Red Sea Path" },
  { icon: "🪨", name: "Stone Tablets" },
  { icon: "🍞", name: "Manna Basket" },
  { icon: "⛺", name: "Tabernacle Tent" },
  { icon: "📯", name: "Jericho Trumpet" },
  { icon: "⚔️", name: "Gideon's Courage" },
  { icon: "🌾", name: "Ruth's Harvest" },
  { icon: "👂", name: "Samuel's Call" },
  { icon: "👑", name: "Anointed King" },
  { icon: "🎯", name: "David's Sling" },
  { icon: "🕯️", name: "Lamp of Wisdom" },
  { icon: "📜", name: "Covenant Scroll" },
  { icon: "🪵", name: "Moses' Staff" },
  { icon: "🏹", name: "Warrior's Aim" },
  { icon: "🛡️", name: "Valiant Guard" },
  { icon: "🌟", name: "Faithful Star" },
  { icon: "🧭", name: "Wilderness Guide" },
  { icon: "⛰️", name: "Sinai Summit" },
  { icon: "🧎", name: "Prayer Kneeler" },
  { icon: "🕊️", name: "Peace Dove" },
  { icon: "🪙", name: "Treasure Keeper" },
  { icon: "⏳", name: "Steadfast Watch" },
  { icon: "🔔", name: "Trumpet Call" },
  { icon: "📖", name: "Word Bearer" },
  { icon: "🧡", name: "Covenant Heart" },
  { icon: "🏺", name: "Jar of Oil" },
  { icon: "🌿", name: "Branch of Hope" },
  { icon: "⚓", name: "Anchor of Trust" },
  { icon: "🪔", name: "Light Keeper" },
  { icon: "🗡️", name: "Sword of Truth" }
];

const quizBank = [
  { era: "genesis", prompt: "What did God create in the beginning?", options: ["The heavens and the earth", "The ark", "A city", "The sun and the moon"], answer: "The heavens and the earth", sourceRef: "Genesis 1:1" },
  { era: "genesis", prompt: "How many days are in the creation week, including God's rest?", options: ["7", "6", "10", "8"], answer: "7", sourceRef: "Genesis 2:2-3" },
  { era: "genesis", prompt: "Who did God place in the garden to work and keep it?", options: ["Adam", "Noah", "Abel", "Eve"], answer: "Adam", sourceRef: "Genesis 2:15" },
  { era: "genesis", prompt: "Who spoke to the woman in the garden?", options: ["Serpent", "Noah", "Abel", "An angel"], answer: "Serpent", sourceRef: "Genesis 3:1-4" },
  { era: "genesis", prompt: "What did God make for Adam and Eve after the fall?", options: ["Garments of skin", "A boat", "A crown", "Stone houses"], answer: "Garments of skin", sourceRef: "Genesis 3:21" },
  { era: "genesis", prompt: "What sign did God place in the sky after the flood?", options: ["Rainbow", "Comet", "Trumpet", "Lightning"], answer: "Rainbow", sourceRef: "Genesis 9:12-13" },
  { era: "genesis", prompt: "Who built the ark?", options: ["Moses", "Noah", "Abraham", "Cain"], answer: "Noah", sourceRef: "Genesis 6:13-14" },
  { era: "genesis", prompt: "Who said, \"Am I my brother's keeper?\"", options: ["Cain", "Abel", "Adam", "Noah"], answer: "Cain", sourceRef: "Genesis 4:9" },
  { era: "genesis", prompt: "Before Babel, what did the whole earth have?", options: ["One language", "Many kingdoms", "Different laws", "Many alphabets"], answer: "One language", sourceRef: "Genesis 11:1" },
  { era: "genesis", prompt: "Where did the people settle before building the tower?", options: ["Shinar", "Eden", "Ararat", "Hebron"], answer: "Shinar", sourceRef: "Genesis 11:2" },
  { era: "genesis", prompt: "What did the builders use for mortar at Babel?", options: ["Asphalt", "Clay", "Sand", "Straw"], answer: "Asphalt", sourceRef: "Genesis 11:3" },
  { era: "genesis", prompt: "Why did the people say, let's make a name?", options: ["So they would not be scattered", "So they could cross the sea", "So they could find manna", "So they could defeat Egypt"], answer: "So they would not be scattered", sourceRef: "Genesis 11:4" },
  { era: "genesis", prompt: "What happened after Yahweh confused the language at Babel?", options: ["People were scattered", "The flood began", "Noah built an ark", "Abram left Haran"], answer: "People were scattered", sourceRef: "Genesis 11:8" },
  { era: "genesis", prompt: "Why was the city called Babel?", options: ["Yahweh confused the language", "It was where Noah lived", "A king named Babel ruled there", "It had twelve gates"], answer: "Yahweh confused the language", sourceRef: "Genesis 11:9" },
  { era: "genesis", prompt: "Who was called a mighty hunter before Yahweh?", options: ["Nimrod", "Shem", "Japheth", "Noah"], answer: "Nimrod", sourceRef: "Genesis 10:8-9" },
  { era: "patriarchs", prompt: "What new name did God give Abram?", options: ["Abraham", "Absalom", "Aaron", "Amos"], answer: "Abraham", sourceRef: "Genesis 17:5" },
  { era: "patriarchs", prompt: "Who said, \"God will provide himself the lamb for a burnt offering, my son\"?", options: ["Abraham", "Isaac", "Jacob", "Joseph"], answer: "Abraham", sourceRef: "Genesis 22:8" },
  { era: "patriarchs", prompt: "Which son of Jacob was sold into Egypt?", options: ["Joseph", "Benjamin", "Levi", "Judah"], answer: "Joseph", sourceRef: "Genesis 37:28" },
  { era: "patriarchs", prompt: "Jacob was also called what?", options: ["Israel", "Ishmael", "Edom", "Judah"], answer: "Israel", sourceRef: "Genesis 32:28" },
  { era: "patriarchs", prompt: "What name did Abraham call the place where God provided the ram?", options: ["Yahweh Yireh", "El Roi", "Yahweh Nissi", "Yahweh Shalom"], answer: "Yahweh Yireh", sourceRef: "Genesis 22:14" },
  { era: "patriarchs", prompt: "Which title for God did Melchizedek use when he blessed Abram?", options: ["God Most High", "God Almighty", "Yahweh of Armies", "Yahweh is peace"], answer: "God Most High", sourceRef: "Genesis 14:18-20" },
  { era: "patriarchs", prompt: "Which name did God use for Himself when He appeared to Abram at ninety-nine years old?", options: ["El Shaddai", "El Elyon", "El Roi", "Yahweh Nissi"], answer: "El Shaddai", sourceRef: "Genesis 17:1" },
  { era: "patriarchs", prompt: "In Genesis 15:2, how does Abram address God in the WEB text?", options: ["Lord Yahweh", "God Most High", "El Roi", "Yahweh Nissi"], answer: "Lord Yahweh", sourceRef: "Genesis 15:2" },
  { era: "exodus", prompt: "Who confronted Pharaoh and led Israel out of Egypt?", options: ["Joshua", "Moses", "Aaron", "Samuel"], answer: "Moses", sourceRef: "Exodus 5:1; 12:31" },
  { era: "exodus", prompt: "What event protected Israelite homes in Egypt?", options: ["Passover", "Pentecost", "Exile", "Day of Atonement"], answer: "Passover", sourceRef: "Exodus 12:13-14" },
  { era: "exodus", prompt: "What sea did Israel cross on dry ground?", options: ["Red Sea", "Dead Sea", "Galilee", "Mediterranean Sea"], answer: "Red Sea", sourceRef: "Exodus 14:21-22" },
  { era: "exodus", prompt: "Who said, \"Who am I, that I should go to Pharaoh?\"", options: ["Moses", "Aaron", "Pharaoh", "Joshua"], answer: "Moses", sourceRef: "Exodus 3:11" },
  { era: "exodus", prompt: "Who said, \"Don't be afraid. Stand still, and see the salvation of Yahweh\"?", options: ["Moses", "Aaron", "Joshua", "Pharaoh"], answer: "Moses", sourceRef: "Exodus 14:13" },
  { era: "exodus", prompt: "What name did God tell Moses to say forever to all generations?", options: ["Yahweh", "El Roi", "Yahweh Shalom", "El Shaddai"], answer: "Yahweh", sourceRef: "Exodus 3:15" },
  { era: "sinai", prompt: "Where were the Ten Commandments given?", options: ["Mount Sinai", "Mount Carmel", "Mount Zion", "Mount Nebo"], answer: "Mount Sinai", sourceRef: "Exodus 19:20; 20:1" },
  { era: "sinai", prompt: "What did the people promise after hearing the covenant words?", options: ["We will do all the Lord has spoken", "We will return to Egypt", "We will follow Pharaoh", "We will build a new kingdom"], answer: "We will do all the Lord has spoken", sourceRef: "Exodus 24:7" },
  { era: "sinai", prompt: "What did Moses build at the foot of the mountain after writing all Yahweh's words?", options: ["An altar", "A palace", "A bronze serpent", "A city gate"], answer: "An altar", sourceRef: "Exodus 24:4" },
  { era: "wilderness", prompt: "What food did God provide daily?", options: ["Manna", "Figs", "Barley", "Dates"], answer: "Manna", sourceRef: "Exodus 16:14-15" },
  { era: "wilderness", prompt: "Who helped Moses hold up his hands in battle?", options: ["Aaron and Hur", "Joshua and Caleb", "Nadab and Abihu", "Aaron and Miriam"], answer: "Aaron and Hur", sourceRef: "Exodus 17:12" },
  { era: "wilderness", prompt: "What did Moses call the altar after Amalek was defeated?", options: ["Yahweh Nissi", "Yahweh Yireh", "El Roi", "Yahweh of Armies"], answer: "Yahweh Nissi", sourceRef: "Exodus 17:15" },
  { era: "conquest", prompt: "Who led Israel after Moses?", options: ["Joshua", "Saul", "David", "Aaron"], answer: "Joshua", sourceRef: "Joshua 1:1-2" },
  { era: "conquest", prompt: "How many days did Israel march around Jericho before the final shout?", options: ["7", "3", "12", "6"], answer: "7", sourceRef: "Joshua 6:3-4,15-16" },
  { era: "conquest", prompt: "What river did Israel cross into Canaan?", options: ["Jordan", "Nile", "Euphrates", "Jabbok"], answer: "Jordan", sourceRef: "Joshua 3:14-17" },
  { era: "conquest", prompt: "Which people are named among the nations God would drive out before Israel?", options: ["Hivites", "Philistines", "Persians", "Romans"], answer: "Hivites", sourceRef: "Joshua 3:10" },
  { era: "conquest", prompt: "Which people made peace with Israel by pretending to come from far away?", options: ["Gibeonites", "Moabites", "Philistines", "Midianites"], answer: "Gibeonites", sourceRef: "Joshua 9:3-15" },
  { era: "judges", prompt: "Which judge led with 300 men?", options: ["Gideon", "Samson", "Jephthah", "Deborah"], answer: "Gideon", sourceRef: "Judges 7:7" },
  { era: "judges", prompt: "Who was a prophetess and judge?", options: ["Deborah", "Ruth", "Hannah", "Jael"], answer: "Deborah", sourceRef: "Judges 4:4" },
  { era: "judges", prompt: "Ruth stayed loyal to whom?", options: ["Naomi", "Miriam", "Abigail", "Orpah"], answer: "Naomi", sourceRef: "Ruth 1:16-17" },
  { era: "judges", prompt: "What did Gideon call the altar he built after the angel spoke to him?", options: ["Yahweh Shalom", "Yahweh Nissi", "Yahweh Yireh", "El Shaddai"], answer: "Yahweh Shalom", sourceRef: "Judges 6:24" },
  { era: "judges", prompt: "Who said, \"Where you go, I will go; and where you stay, I will stay\"?", options: ["Ruth", "Naomi", "Deborah", "Hannah"], answer: "Ruth", sourceRef: "Ruth 1:16" },
  { era: "judges", prompt: "Who said, \"Yahweh repay your work, and a full reward be given you\"?", options: ["Boaz", "Naomi", "Ruth", "Samuel"], answer: "Boaz", sourceRef: "Ruth 2:12" },
  { era: "samuel", prompt: "Who heard God's call as a boy?", options: ["Samuel", "Eli", "Jonathan", "Saul"], answer: "Samuel", sourceRef: "1 Samuel 3:8-10" },
  { era: "samuel", prompt: "Where did Samuel minister before Yahweh as a youth?", options: ["Shiloh", "Jerusalem", "Bethel", "Hebron"], answer: "Shiloh", sourceRef: "1 Samuel 1:3; 3:21" },
  { era: "samuel", prompt: "Who said, \"Speak, Yahweh, for your servant hears\"?", options: ["Samuel", "Eli", "Hannah", "David"], answer: "Samuel", sourceRef: "1 Samuel 3:10" },
  { era: "samuel", prompt: "What title of God appears in 1 Samuel 1:3?", options: ["Yahweh of Armies", "Yahweh Nissi", "El Roi", "Yahweh Yireh"], answer: "Yahweh of Armies", sourceRef: "1 Samuel 1:3" },
  { era: "saul", prompt: "Who was Israel's first king?", options: ["Saul", "David", "Solomon", "Abner"], answer: "Saul", sourceRef: "1 Samuel 10:1,24" },
  { era: "saul", prompt: "Who anointed Saul?", options: ["Samuel", "Nathan", "Gad", "Eli"], answer: "Samuel", sourceRef: "1 Samuel 10:1" },
  { era: "saul", prompt: "Who said, \"I have performed the commandment of Yahweh\"?", options: ["Saul", "Samuel", "David", "Jonathan"], answer: "Saul", sourceRef: "1 Samuel 15:13" },
  { era: "david", prompt: "How many stones did David pick up?", options: ["5", "3", "10", "1"], answer: "5", sourceRef: "1 Samuel 17:40" },
  { era: "david", prompt: "What weapon did David use against Goliath?", options: ["Sling", "Spear", "Sword", "Bow"], answer: "Sling", sourceRef: "1 Samuel 17:49-50" },
  { era: "david", prompt: "Who said, \"The battle is Yahweh's\"?", options: ["David", "Saul", "Goliath", "Jonathan"], answer: "David", sourceRef: "1 Samuel 17:47" },
  { era: "david", prompt: "Who said, \"Come to me, and I will give your flesh to the birds of the sky\"?", options: ["Goliath", "David", "Saul", "Abner"], answer: "Goliath", sourceRef: "1 Samuel 17:44" },
];


const mediumQuizBank = [
  { era: "genesis", prompt: "What did God call the expanse in Genesis 1?", options: ["Sky", "Earth", "Sea", "Eden"], answer: "Sky", sourceRef: "Genesis 1:8" },
  { era: "genesis", prompt: "Who named the livestock, birds, and animals God brought to him?", options: ["Adam", "Noah", "Cain", "Seth"], answer: "Adam", sourceRef: "Genesis 2:19-20" },
  { era: "genesis", prompt: "What part of Adam did God use to make the woman?", options: ["One of his ribs", "His hand", "Dust", "His foot"], answer: "One of his ribs", sourceRef: "Genesis 2:21-22" },
  { era: "genesis", prompt: "Which tree, besides the tree of life, was in the middle of the garden?", options: ["The tree of the knowledge of good and evil", "The cedar of Lebanon", "The tamarisk", "The olive tree"], answer: "The tree of the knowledge of good and evil", sourceRef: "Genesis 2:9" },
  { era: "genesis", prompt: "What did God say after creating the light?", options: ["It was good", "It was complete", "It was hidden", "It was distant"], answer: "It was good", sourceRef: "Genesis 1:4" },
  { era: "genesis", prompt: "What did God place in the expanse of the sky on day four?", options: ["Lights for signs and seasons", "A rainbow only", "Manna", "Cherubim"], answer: "Lights for signs and seasons", sourceRef: "Genesis 1:14" },
  { era: "genesis", prompt: "What work did God give the man in the garden?", options: ["To work it and keep it", "To name cities", "To build an ark", "To collect manna"], answer: "To work it and keep it", sourceRef: "Genesis 2:15" },
  { era: "genesis", prompt: "What command did God give about the tree of the knowledge of good and evil?", options: ["You shall not eat of it", "You must water it", "You must guard it with fire", "You may harvest it first"], answer: "You shall not eat of it", sourceRef: "Genesis 2:17" },
  { era: "genesis", prompt: "What was not good before God made the woman?", options: ["That the man was alone", "That the land was dry", "That birds were flying", "That rivers flowed"], answer: "That the man was alone", sourceRef: "Genesis 2:18" },
  { era: "genesis", prompt: "What did God do on the seventh day?", options: ["Rested and made it holy", "Made animals", "Created light", "Sent rain"], answer: "Rested and made it holy", sourceRef: "Genesis 2:2-3" },
  { era: "genesis", prompt: "What opened after Adam and Eve ate?", options: ["Their eyes", "The ark door", "The heavens", "The sea"], answer: "Their eyes", sourceRef: "Genesis 3:7" },
  { era: "genesis", prompt: "What did Adam name his wife after the fall?", options: ["Eve", "Naomi", "Sarah", "Hagar"], answer: "Eve", sourceRef: "Genesis 3:20" },
  { era: "genesis", prompt: "Who shut Noah in when he entered the ark?", options: ["Yahweh", "Shem", "Ham", "An angel"], answer: "Yahweh", sourceRef: "Genesis 7:16" },
  { era: "genesis", prompt: "How long did rain fall on the earth during the flood?", options: ["Forty days and forty nights", "Seven days", "One hundred days", "Twelve days"], answer: "Forty days and forty nights", sourceRef: "Genesis 7:12" },
  { era: "genesis", prompt: "What did Noah build after leaving the ark?", options: ["An altar", "A city wall", "A tower", "A vineyard fence"], answer: "An altar", sourceRef: "Genesis 8:20" },
  { era: "genesis", prompt: "What sign did God set in the cloud for His covenant?", options: ["Rainbow", "Thunder", "Flaming sword", "Morning star"], answer: "Rainbow", sourceRef: "Genesis 9:13" },
  { era: "genesis", prompt: "What bird returned to Noah with a freshly plucked olive leaf?", options: ["Dove", "Raven", "Eagle", "Sparrow"], answer: "Dove", sourceRef: "Genesis 8:11" },
  { era: "genesis", prompt: "Who said, \"Cursed be Canaan; a servant of servants will he be to his brothers\"?", options: ["Noah", "Ham", "Shem", "Japheth"], answer: "Noah", sourceRef: "Genesis 9:25" },
  { era: "genesis", prompt: "What did the people say before making bricks in Genesis 11:3?", options: ["Come, let's make bricks", "Come, let's cross the sea", "Come, let's seek Joseph", "Come, let's build an ark"], answer: "Come, let's make bricks", sourceRef: "Genesis 11:3" },
  { era: "genesis", prompt: "In Genesis 11:6, how did Yahweh describe the people?", options: ["One people", "A divided nation", "A wandering tribe", "A royal house"], answer: "One people", sourceRef: "Genesis 11:6" },
  { era: "genesis", prompt: "What did Yahweh say He would confuse in Genesis 11:7?", options: ["Their language", "Their harvest", "Their houses", "Their livestock"], answer: "Their language", sourceRef: "Genesis 11:7" },
  { era: "genesis", prompt: "What was the beginning of Nimrod's kingdom?", options: ["Babel", "Bethel", "Beersheba", "Hebron"], answer: "Babel", sourceRef: "Genesis 10:10" },
  { era: "patriarchs", prompt: "What did God compare Abram's descendants to when He made His promise?", options: ["Stars", "Trees", "Rivers", "Mountains"], answer: "Stars", sourceRef: "Genesis 15:5" },
  { era: "patriarchs", prompt: "What did Jacob see in his dream reaching toward heaven?", options: ["A ladder", "A chariot", "A throne", "A rainbow"], answer: "A ladder", sourceRef: "Genesis 28:12" },
  { era: "patriarchs", prompt: "What did Joseph store during the years of plenty in Egypt?", options: ["Grain", "Gold", "Oil", "Livestock"], answer: "Grain", sourceRef: "Genesis 41:48-49" },
  { era: "patriarchs", prompt: "Who said, \"You intended to harm me, but God intended it for good\"?", options: ["Joseph", "Jacob", "Judah", "Pharaoh"], answer: "Joseph", sourceRef: "Genesis 50:20" },
  { era: "patriarchs", prompt: "What does Yahweh Yireh mean?", options: ["Yahweh will provide", "Yahweh is peace", "Yahweh our Banner", "God Almighty"], answer: "Yahweh will provide", sourceRef: "Genesis 22:14" },
  { era: "patriarchs", prompt: "What does El Shaddai mean in Genesis 17:1?", options: ["God Almighty", "God who sees me", "Yahweh will provide", "Yahweh of Armies"], answer: "God Almighty", sourceRef: "Genesis 17:1" },
  { era: "patriarchs", prompt: "What does El Elyon mean in Genesis 14:18-20?", options: ["God Most High", "God Almighty", "Yahweh will provide", "The Lord of armies"], answer: "God Most High", sourceRef: "Genesis 14:18-20" },
  { era: "patriarchs", prompt: "Which title does Abram use for God in Genesis 15:2 in the WEB text?", options: ["Lord Yahweh", "God Most High", "El Roi", "Yahweh Shalom"], answer: "Lord Yahweh", sourceRef: "Genesis 15:2" },
  { era: "exodus", prompt: "What did Moses' staff become before Pharaoh as a sign?", options: ["A serpent", "A branch", "A torch", "A plow"], answer: "A serpent", sourceRef: "Exodus 7:10" },
  { era: "exodus", prompt: "What was placed on the doorposts and lintel at Passover?", options: ["Lamb's blood", "Oil", "Water", "Ashes"], answer: "Lamb's blood", sourceRef: "Exodus 12:7" },
  { era: "exodus", prompt: "What led Israel by night after leaving Egypt?", options: ["Pillar of fire", "Morning star", "Trumpet blast", "Cloud of smoke"], answer: "Pillar of fire", sourceRef: "Exodus 13:21" },
  { era: "exodus", prompt: "Which divine name did God give Moses as His memorial to all generations?", options: ["Yahweh", "El Roi", "Yahweh Nissi", "Yahweh Shalom"], answer: "Yahweh", sourceRef: "Exodus 3:15" },
  { era: "exodus", prompt: "Who said, \"I AM WHO I AM\"?", options: ["God", "Moses", "Aaron", "Pharaoh"], answer: "God", sourceRef: "Exodus 3:14" },
  { era: "sinai", prompt: "What covered Mount Sinai when the Lord descended on it?", options: ["Smoke", "Snow", "Rain", "Locusts"], answer: "Smoke", sourceRef: "Exodus 19:18" },
  { era: "sinai", prompt: "Which day is commanded as holy in the Ten Commandments?", options: ["Sabbath day", "First day", "New moon", "Passover day"], answer: "Sabbath day", sourceRef: "Exodus 20:8-11" },
  { era: "sinai", prompt: "What did Moses do with the covenant blood in Exodus 24?", options: ["Sprinkled it on the people", "Poured it into the sea", "Burned it on the altar", "Stored it in jars"], answer: "Sprinkled it on the people", sourceRef: "Exodus 24:8" },
  { era: "wilderness", prompt: "What came out of the rock when Moses struck it at Horeb?", options: ["Water", "Oil", "Honey", "Fire"], answer: "Water", sourceRef: "Exodus 17:6" },
  { era: "wilderness", prompt: "What large fruit cluster did the spies bring back from Canaan?", options: ["Grapes", "Figs", "Dates", "Olives"], answer: "Grapes", sourceRef: "Numbers 13:23" },
  { era: "wilderness", prompt: "With what are you to love Yahweh your God according to Deuteronomy 6:5?", options: ["All your heart", "All your silver", "Only your words", "Only your sacrifices"], answer: "All your heart", sourceRef: "Deuteronomy 6:5" },
  { era: "wilderness", prompt: "What does Yahweh Nissi mean in Exodus 17:15?", options: ["Yahweh our Banner", "Yahweh is peace", "Yahweh will provide", "God Almighty"], answer: "Yahweh our Banner", sourceRef: "Exodus 17:15" },
  { era: "conquest", prompt: "Who hid the Israelite spies in Jericho?", options: ["Rahab", "Deborah", "Naomi", "Hannah"], answer: "Rahab", sourceRef: "Joshua 2:4" },
  { era: "conquest", prompt: "What happened to the Jordan waters when the priests stepped in?", options: ["They stood up in a heap", "They turned to blood", "They dried after seven days", "They flooded the camp"], answer: "They stood up in a heap", sourceRef: "Joshua 3:13-16" },
  { era: "conquest", prompt: "What sign was Rahab told to tie in her window?", options: ["Scarlet cord", "Golden ribbon", "White cloth", "Blue thread"], answer: "Scarlet cord", sourceRef: "Joshua 2:18" },
  { era: "conquest", prompt: "Which kings gathered to fight Gibeon after it made peace with Israel?", options: ["Amorites", "Hivites", "Perizzites", "Kenites"], answer: "Amorites", sourceRef: "Joshua 10:5" },
  { era: "conquest", prompt: "Which people are listed first among the nations God would drive out in Joshua 3:10?", options: ["Canaanites", "Hivites", "Jebusites", "Girgashites"], answer: "Canaanites", sourceRef: "Joshua 3:10" },
  { era: "judges", prompt: "What weapon did Shamgar use to strike the Philistines?", options: ["Oxgoad", "Sword", "Sling", "Bow"], answer: "Oxgoad", sourceRef: "Judges 3:31" },
  { era: "judges", prompt: "What did Jael drive through Sisera while he slept?", options: ["Tent peg", "Spear", "Arrow", "Stone"], answer: "Tent peg", sourceRef: "Judges 4:21" },
  { era: "judges", prompt: "What happened to Samson after his hair was cut?", options: ["His strength left him", "He became king", "He escaped immediately", "He defeated more enemies"], answer: "His strength left him", sourceRef: "Judges 16:19-20" },
  { era: "judges", prompt: "What town did Naomi and Ruth come to at the beginning of barley harvest?", options: ["Bethlehem", "Jericho", "Hebron", "Shiloh"], answer: "Bethlehem", sourceRef: "Ruth 1:22" },
  { era: "judges", prompt: "What does Yahweh Shalom mean in Judges 6:24?", options: ["Yahweh is peace", "Yahweh our Banner", "Yahweh will provide", "God Almighty"], answer: "Yahweh is peace", sourceRef: "Judges 6:24" },
  { era: "judges", prompt: "Who said to Barak, \"Hasn't Yahweh, the God of Israel, commanded you?\"", options: ["Deborah", "Jael", "Ruth", "Naomi"], answer: "Deborah", sourceRef: "Judges 4:6" },
  { era: "samuel", prompt: "Who taught Samuel how to answer when the Lord called him?", options: ["Eli", "Saul", "David", "Jonathan"], answer: "Eli", sourceRef: "1 Samuel 3:8-9" },
  { era: "samuel", prompt: "What did Eli think Hannah was when he first saw her praying?", options: ["Drunk", "Singing", "Prophesying", "Sleeping"], answer: "Drunk", sourceRef: "1 Samuel 1:13-14" },
  { era: "samuel", prompt: "What does the title Yahweh of Armies mean?", options: ["The Lord of armies", "The God who sees me", "Yahweh is peace", "Yahweh will provide"], answer: "The Lord of armies", sourceRef: "1 Samuel 1:3" },
  { era: "samuel", prompt: "Who said, \"No, my lord, I am a woman of a sorrowful spirit\"?", options: ["Hannah", "Eli", "Samuel", "Naomi"], answer: "Hannah", sourceRef: "1 Samuel 1:15" },
  { era: "saul", prompt: "From which tribe was Saul?", options: ["Benjamin", "Judah", "Levi", "Ephraim"], answer: "Benjamin", sourceRef: "1 Samuel 9:21" },
  { era: "saul", prompt: "What did Saul do when the Spirit of God came on him after anointing?", options: ["He prophesied", "He built an altar", "He fled to Egypt", "He wrote a psalm"], answer: "He prophesied", sourceRef: "1 Samuel 10:10-11" },
  { era: "saul", prompt: "What did Israel ask Samuel to appoint over them?", options: ["A king", "A new priest", "A judge from Judah", "A temple builder"], answer: "A king", sourceRef: "1 Samuel 8:5" },
  { era: "david", prompt: "Who anointed David as a young man?", options: ["Samuel", "Saul", "Nathan", "Eli"], answer: "Samuel", sourceRef: "1 Samuel 16:13" },
  { era: "david", prompt: "What instrument did David play to soothe Saul?", options: ["Harp", "Trumpet", "Flute", "Drum"], answer: "Harp", sourceRef: "1 Samuel 16:23" },
  { era: "david", prompt: "Who said, \"What have I now done? Is there not a cause?\"", options: ["David", "Eliab", "Saul", "Goliath"], answer: "David", sourceRef: "1 Samuel 17:29" },
];

const advancedQuizBank = [
  { era: "genesis", prompt: "Before God said 'Let there be light,' how does Scripture describe the earth?", options: ["Formless and empty", "Covered with mountains", "Filled with people", "Already full of light"], answer: "Formless and empty", sourceRef: "Genesis 1:2" },
  { era: "genesis", prompt: "What was the first food God gave humanity in Genesis 1?", options: ["Seed-bearing plants and fruit trees", "Meat from every animal", "Manna from heaven", "Fish from the sea"], answer: "Seed-bearing plants and fruit trees", sourceRef: "Genesis 1:29" },
  { era: "genesis", prompt: "What name did Adam give the woman because she was taken out of man?", options: ["Woman", "Eve", "Sarah", "Helper"], answer: "Woman", sourceRef: "Genesis 2:23" },
  { era: "genesis", prompt: "What would the ground grow for Adam after the fall?", options: ["Thorns and thistles", "Cedars and olives", "Wheat and barley", "Lilies and myrrh"], answer: "Thorns and thistles", sourceRef: "Genesis 3:17-18" },
  { era: "genesis", prompt: "What did God place east of the garden to guard the way to the tree of life?", options: ["Cherubim", "Prophets", "Twelve stones", "Angelic singers"], answer: "Cherubim", sourceRef: "Genesis 3:24" },
  { era: "genesis", prompt: "According to Genesis 11:5, what did Yahweh come down to see?", options: ["The city and tower", "The ark and altar", "The garden and river", "The stars and moon"], answer: "The city and tower", sourceRef: "Genesis 11:5" },
  { era: "genesis", prompt: "Who said, \"Come, let's go down, and there confuse their language\"?", options: ["Yahweh", "Noah", "Nimrod", "Shem"], answer: "Yahweh", sourceRef: "Genesis 11:7" },
  { era: "genesis", prompt: "According to Genesis 11:6, what did Yahweh say would not be withheld from them?", options: ["Anything they intended to do", "Rain from heaven", "The promised land", "The covenant sign"], answer: "Anything they intended to do", sourceRef: "Genesis 11:6" },
  { era: "genesis", prompt: "What did Yahweh do so the people would not understand each other's speech?", options: ["Confused their language", "Sent a flood", "Closed the city gate", "Changed the stars"], answer: "Confused their language", sourceRef: "Genesis 11:7" },
  { era: "patriarchs", prompt: "How old was Abram when God appeared and established circumcision as covenant sign?", options: ["99", "75", "86", "120"], answer: "99", sourceRef: "Genesis 17:1,11" },
  { era: "genesis", prompt: "How many clean animals of each kind did Noah take onto the ark?", options: ["Seven pairs", "One pair", "Two pairs", "Seven total"], answer: "Seven pairs", sourceRef: "Genesis 7:2" },
  { era: "patriarchs", prompt: "What did Joseph name his firstborn son, saying God made him forget his trouble?", options: ["Manasseh", "Ephraim", "Benjamin", "Reuben"], answer: "Manasseh", sourceRef: "Genesis 41:51" },
  { era: "patriarchs", prompt: "Which Hebrew name for God is linked to Hagar's words, \"You are a God who sees\"?", options: ["El Roi", "El Shaddai", "Yahweh Yireh", "Yahweh Nissi"], answer: "El Roi", sourceRef: "Genesis 16:13" },
  { era: "patriarchs", prompt: "Which Hebrew name did Abraham use in Genesis 22:14 after God provided the ram?", options: ["Yahweh Yireh", "Yahweh Shalom", "El Roi", "Yahweh of Armies"], answer: "Yahweh Yireh", sourceRef: "Genesis 22:14" },
  { era: "patriarchs", prompt: "After wrestling with the man, what new name did Jacob receive?", options: ["Israel", "Jeshurun", "Edom", "Zion"], answer: "Israel", sourceRef: "Genesis 32:28" },
  { era: "patriarchs", prompt: "What statement shows Joseph's theology about his suffering in Egypt?", options: ["You intended to harm me, but God intended it for good", "I escaped by my own strength", "My brothers were right to fear", "Egypt saved us without God"], answer: "You intended to harm me, but God intended it for good", sourceRef: "Genesis 50:20" },
  { era: "patriarchs", prompt: "Who said, \"Behold, the fire and the wood, but where is the lamb for a burnt offering?\"?", options: ["Isaac", "Abraham", "Jacob", "Joseph"], answer: "Isaac", sourceRef: "Genesis 22:7" },
  { era: "exodus", prompt: "What was the first plague sent on Egypt?", options: ["Water turned to blood", "Frogs", "Gnats", "Hail"], answer: "Water turned to blood", sourceRef: "Exodus 7:20" },
  { era: "exodus", prompt: "What specific instruction was given for applying Passover blood?", options: ["On the sides and tops of the doorframes", "On the roof only", "On every wall of the home", "On the family altar"], answer: "On the sides and tops of the doorframes", sourceRef: "Exodus 12:7" },
  { era: "exodus", prompt: "What did Israel carry out of Egypt before their dough had yeast?", options: ["Unleavened dough in kneading troughs", "Sown grain for harvest", "Only baked loaves", "Stone tablets"], answer: "Unleavened dough in kneading troughs", sourceRef: "Exodus 12:34" },
  { era: "exodus", prompt: "Who said to Moses and Aaron, \"Rise up, get out from among my people\"?", options: ["Pharaoh", "Moses", "Aaron", "Joshua"], answer: "Pharaoh", sourceRef: "Exodus 12:31" },
  { era: "wilderness", prompt: "How long was that unbelieving generation to bear consequences in the wilderness?", options: ["40 years", "14 years", "7 years", "70 years"], answer: "40 years", sourceRef: "Numbers 14:33-34" },
  { era: "sinai", prompt: "According to Exodus 24:1-2, who alone was to come near the Lord?", options: ["Moses alone", "Aaron", "Nadab", "All elders"], answer: "Moses alone", sourceRef: "Exodus 24:1-2" },
  { era: "sinai", prompt: "What was under the God of Israel's feet in the mountain vision?", options: ["A paved work of sapphire stone", "A sea of brass", "A cedar platform", "A bed of gold"], answer: "A paved work of sapphire stone", sourceRef: "Exodus 24:10" },
  { era: "wilderness", prompt: "What stood over the tabernacle by day during Israel's wilderness journey?", options: ["A cloud", "A rainbow", "A pillar of stone", "A curtain of fire"], answer: "A cloud", sourceRef: "Numbers 9:15-16" },
  { era: "wilderness", prompt: "According to Deuteronomy 8:3, man doesn't live by bread alone, but by what?", options: ["Everything that proceeds out of Yahweh's mouth", "Only by manna", "Only by water", "Only by sacrifice"], answer: "Everything that proceeds out of Yahweh's mouth", sourceRef: "Deuteronomy 8:3" },
  { era: "wilderness", prompt: "Which Hebrew name appears on Moses' altar in Exodus 17:15?", options: ["Yahweh Nissi", "Yahweh Shalom", "El Roi", "Yahweh Yireh"], answer: "Yahweh Nissi", sourceRef: "Exodus 17:15" },
  { era: "conquest", prompt: "How many priests carried trumpets before the ark around Jericho?", options: ["7", "12", "3", "40"], answer: "7", sourceRef: "Joshua 6:4" },
  { era: "conquest", prompt: "What did Joshua command the people before crossing Jordan?", options: ["Consecrate yourselves", "Build your homes", "Count your flocks", "Return to Egypt"], answer: "Consecrate yourselves", sourceRef: "Joshua 3:5" },
  { era: "conquest", prompt: "What memorial was set up after crossing the Jordan?", options: ["Twelve stones", "Bronze altar", "Golden lampstand", "Royal throne"], answer: "Twelve stones", sourceRef: "Joshua 4:20" },
  { era: "conquest", prompt: "Which people are named right after the Canaanites in Joshua 3:10?", options: ["Hittites", "Philistines", "Moabites", "Edomites"], answer: "Hittites", sourceRef: "Joshua 3:10" },
  { era: "conquest", prompt: "Which people secured peace with Israel through deception and a treaty?", options: ["Gibeonites", "Jebusites", "Amalekites", "Amorites"], answer: "Gibeonites", sourceRef: "Joshua 9:6-15" },
  { era: "judges", prompt: "What first sign did Gideon request with the fleece?", options: ["Dew on fleece only, ground dry", "Ground wet, fleece dry", "Fire from heaven", "A rainbow"], answer: "Dew on fleece only, ground dry", sourceRef: "Judges 6:37-38" },
  { era: "judges", prompt: "In Judges' cycle, what usually happened after Israel cried out?", options: ["The Lord raised a deliverer", "They were exiled to Babylon", "The temple was rebuilt", "A prophet became king"], answer: "The Lord raised a deliverer", sourceRef: "Judges 2:18" },
  { era: "judges", prompt: "What phrase summarizes the spiritual condition in the days of Judges?", options: ["Everyone did what was right in his own eyes", "All Israel followed David", "The law was forgotten forever", "No sacrifices were offered"], answer: "Everyone did what was right in his own eyes", sourceRef: "Judges 21:25" },
  { era: "judges", prompt: "Under whose wings did Boaz say Ruth came to take refuge?", options: ["Yahweh's", "Boaz's", "Naomi's", "Bethlehem's"], answer: "Yahweh's", sourceRef: "Ruth 2:12" },
  { era: "judges", prompt: "Which Hebrew name appears on Gideon's altar in Judges 6:24?", options: ["Yahweh Shalom", "Yahweh Nissi", "El Roi", "Yahweh Yireh"], answer: "Yahweh Shalom", sourceRef: "Judges 6:24" },
  { era: "judges", prompt: "Who said to Ruth, \"Don't be afraid. I will do to you all that you ask\"?", options: ["Boaz", "Naomi", "Samuel", "Eli"], answer: "Boaz", sourceRef: "Ruth 3:11" },
  { era: "samuel", prompt: "What did Samuel say when the Lord stood and called him again after Eli instructed him?", options: ["Speak, for your servant hears", "Here I am, send me", "I am not worthy", "Please choose another"], answer: "Speak, for your servant hears", sourceRef: "1 Samuel 3:10" },
  { era: "samuel", prompt: "What did Hannah vow regarding her son if God gave her one?", options: ["He would be given to the Lord all his life", "He would serve as king", "He would inherit Eli's house", "He would never leave home"], answer: "He would be given to the Lord all his life", sourceRef: "1 Samuel 1:11" },
  { era: "samuel", prompt: "Who said, \"For this child I prayed, and Yahweh has given me my petition\"?", options: ["Hannah", "Eli", "Samuel", "Naomi"], answer: "Hannah", sourceRef: "1 Samuel 1:27" },
  { era: "samuel", prompt: "Which title of God appears in 1 Samuel 1:3 and 1:11?", options: ["Yahweh of Armies", "Yahweh Nissi", "El Roi", "Yahweh Yireh"], answer: "Yahweh of Armies", sourceRef: "1 Samuel 1:3" },
  { era: "samuel", prompt: "Who said, \"It is Yahweh. Let him do what seems good to him\"?", options: ["Eli", "Samuel", "Hannah", "Saul"], answer: "Eli", sourceRef: "1 Samuel 3:18" },
  { era: "saul", prompt: "What reason did Saul give for sparing the best Amalekite animals?", options: ["To sacrifice them to the Lord", "To feed his army", "To repay the Kenites", "To sell in Gilgal"], answer: "To sacrifice them to the Lord", sourceRef: "1 Samuel 15:15" },
  { era: "saul", prompt: "What principle did Samuel declare to Saul over ritual?", options: ["To obey is better than sacrifice", "Sacrifice covers all disobedience", "Kings decide their own law", "Victory proves obedience"], answer: "To obey is better than sacrifice", sourceRef: "1 Samuel 15:22" },
  { era: "saul", prompt: "Who said, \"I have sinned; for I have transgressed Yahweh's commandment\"?", options: ["Saul", "Samuel", "David", "Jonathan"], answer: "Saul", sourceRef: "1 Samuel 15:24" },
  { era: "david", prompt: "For how many days did Goliath challenge Israel?", options: ["40 days", "7 days", "12 days", "70 days"], answer: "40 days", sourceRef: "1 Samuel 17:16" },
  { era: "david", prompt: "What did David say the battle belongs to?", options: ["The Lord", "Israel's army", "Saul's crown", "The strongest warrior"], answer: "The Lord", sourceRef: "1 Samuel 17:47" },
  { era: "david", prompt: "Who said, \"You come to me with a sword, with a spear, and with a javelin; but I come to you in Yahweh of Armies' name\"?", options: ["David", "Saul", "Goliath", "Samuel"], answer: "David", sourceRef: "1 Samuel 17:45" },
  { era: "david", prompt: "Who said, \"Am I a dog, that you come to me with staffs?\"?", options: ["Goliath", "David", "Saul", "Abner"], answer: "Goliath", sourceRef: "1 Samuel 17:43" },
  { era: "david", prompt: "From where did David take the stones before facing Goliath?", options: ["The stream bed", "Saul's armory", "Bethlehem fields", "Priest's altar"], answer: "The stream bed", sourceRef: "1 Samuel 17:40" }
];

const spellingBank = [
  { era: "genesis", prompt: "Spell the garden God planted in the east.", answer: "Eden", sourceRef: "Genesis 2:8" },
  { era: "genesis", prompt: "Spell the first man's name.", answer: "Adam", sourceRef: "Genesis 3:17" },
  { era: "genesis", prompt: "Spell the name Adam gave the woman in Genesis 3.", answer: "Eve", sourceRef: "Genesis 3:20" },
  { era: "genesis", prompt: "Spell the name of the man who built the ark.", answer: "Noah", sourceRef: "Genesis 6:13-14" },
  { era: "genesis", prompt: "Spell the covenant sign God set in the sky after the flood.", answer: "Rainbow", sourceRef: "Genesis 9:13" },
  { era: "genesis", prompt: "Spell the city where God confused human language.", answer: "Babel", sourceRef: "Genesis 11:9" },
  { era: "genesis", prompt: "Spell the mighty hunter named in Genesis 10.", answer: "Nimrod", sourceRef: "Genesis 10:8-9" },
  { era: "patriarchs", prompt: "Spell the name God gave Abram.", answer: "Abraham", sourceRef: "Genesis 17:5" },
  { era: "patriarchs", prompt: "Spell the name Jacob was given after he wrestled.", answer: "Israel", sourceRef: "Genesis 32:28" },
  { era: "exodus", prompt: "Spell the feast that marked Israel's deliverance from Egypt.", answer: "Passover", sourceRef: "Exodus 12:13-14" },
  { era: "sinai", prompt: "Spell the mountain where God gave the law.", answer: "Sinai", sourceRef: "Exodus 19:20" },
  { era: "wilderness", prompt: "Spell the bread God gave daily in the wilderness.", answer: "Manna", sourceRef: "Exodus 16:15" },
  { era: "conquest", prompt: "Spell the name of the city whose walls fell after Israel shouted.", answer: "Jericho", sourceRef: "Joshua 6:20" },
  { era: "judges", prompt: "Spell the prophetess and judge of Israel.", answer: "Deborah", sourceRef: "Judges 4:4" },
  { era: "samuel", prompt: "Spell the boy who heard God's call at night.", answer: "Samuel", sourceRef: "1 Samuel 3:8-10" },
  { era: "saul", prompt: "Spell the first king of Israel.", answer: "Saul", sourceRef: "1 Samuel 10:1,24" },
  { era: "david", prompt: "Spell the giant David defeated.", answer: "Goliath", sourceRef: "1 Samuel 17:49-50" }
];


const mediumSpellingBank = [
  { era: "genesis", prompt: "Spell what God called the dry land.", answer: "Earth", sourceRef: "Genesis 1:10" },
  { era: "genesis", prompt: "Spell the garden where Adam and Eve first lived.", answer: "Eden", sourceRef: "Genesis 2:8" },
  { era: "genesis", prompt: "Spell what Adam was formed from.", answer: "Dust", sourceRef: "Genesis 2:7" },
  { era: "genesis", prompt: "Spell what the ground would grow after the fall.", answer: "Thistles", sourceRef: "Genesis 3:18" },
  { era: "genesis", prompt: "Spell the mountain region where Noah's ark rested.", answer: "Ararat", sourceRef: "Genesis 8:4" },
  { era: "genesis", prompt: "Spell the plain where the people settled before Babel.", answer: "Shinar", sourceRef: "Genesis 11:2" },
  { era: "genesis", prompt: "Spell the material used for mortar at Babel.", answer: "Asphalt", sourceRef: "Genesis 11:3" },
  { era: "patriarchs", prompt: "Spell the place name Jacob gave after his dream of the ladder.", answer: "Bethel", sourceRef: "Genesis 28:19" },
  { era: "patriarchs", prompt: "Spell Joseph's second son.", answer: "Ephraim", sourceRef: "Genesis 41:52" },
  { era: "exodus", prompt: "Spell the title of Egypt's ruler whom Moses confronted.", answer: "Pharaoh", sourceRef: "Exodus 5:1" },
  { era: "sinai", prompt: "Spell the holy day named in the Ten Commandments.", answer: "Sabbath", sourceRef: "Exodus 20:8" },
  { era: "wilderness", prompt: "Spell the place where water came from the rock in Exodus 17.", answer: "Horeb", sourceRef: "Exodus 17:6" },
  { era: "conquest", prompt: "Spell the woman in Jericho who hid the spies.", answer: "Rahab", sourceRef: "Joshua 2:1-4" },
  { era: "judges", prompt: "Spell the judge who was called a mighty man of valor.", answer: "Gideon", sourceRef: "Judges 6:12" },
  { era: "judges", prompt: "Spell the town Ruth came to with Naomi.", answer: "Bethlehem", sourceRef: "Ruth 1:19,22" },
  { era: "samuel", prompt: "Spell Samuel's mother.", answer: "Hannah", sourceRef: "1 Samuel 1:20" },
  { era: "saul", prompt: "Spell the tribe Saul came from.", answer: "Benjamin", sourceRef: "1 Samuel 9:21" },
  { era: "david", prompt: "Spell the town David came from.", answer: "Bethlehem", sourceRef: "1 Samuel 17:12" }
];

const advancedSpellingBank = [
  { era: "genesis", prompt: "Type the first word that describes the earth in Genesis 1:2.", answer: "formless", sourceRef: "Genesis 1:2" },
  { era: "genesis", prompt: "Type the realm the greater light was made to rule in Genesis 1.", answer: "day", sourceRef: "Genesis 1:16-18" },
  { era: "genesis", prompt: "Type the word that describes the man and woman in Genesis 2:25.", answer: "naked", sourceRef: "Genesis 2:25" },
  { era: "genesis", prompt: "Type the beings God placed east of Eden.", answer: "cherubim", sourceRef: "Genesis 3:24" },
  { era: "genesis", prompt: "Type the first word describing the earth's speech in Genesis 11:1.", answer: "one", sourceRef: "Genesis 11:1" },
  { era: "genesis", prompt: "Type the city name given in Genesis 11:9.", answer: "babel", sourceRef: "Genesis 11:9" },
  { era: "patriarchs", prompt: "Spell Joseph's firstborn son's name.", answer: "Manasseh", sourceRef: "Genesis 41:51" },
  { era: "exodus", prompt: "Spell the word describing bread made without yeast.", answer: "unleavened", sourceRef: "Exodus 12:34" },
  { era: "sinai", prompt: "Type the covenant response phrase summarizing Exodus 24:7: 'we will ___'.", answer: "obey", sourceRef: "Exodus 24:7" },
  { era: "wilderness", prompt: "Type the number word for Israel's wilderness years.", answer: "forty", sourceRef: "Numbers 14:33-34" },
  { era: "conquest", prompt: "Type the command verb from Joshua 3:5 (WEB).", answer: "sanctify", sourceRef: "Joshua 3:5" },
  { era: "conquest", prompt: "Spell the river Israel crossed into Canaan.", answer: "Jordan", sourceRef: "Joshua 3:14-17" },
  { era: "judges", prompt: "Spell the role God raised in Judges 2:18.", answer: "judge", sourceRef: "Judges 2:18" },
  { era: "judges", prompt: "Spell the kinsman-redeemer who married Ruth.", answer: "Boaz", sourceRef: "Ruth 4:13" },
  { era: "samuel", prompt: "Type Samuel's response word in 1 Samuel 3:10 (WEB): 'your servant ___'.", answer: "hears", sourceRef: "1 Samuel 3:10" },
  { era: "saul", prompt: "Spell the word Samuel contrasted with obedience in 1 Samuel 15:22.", answer: "sacrifice", sourceRef: "1 Samuel 15:22" },
  { era: "david", prompt: "Spell the term used for Goliath's people in 1 Samuel 17.", answer: "Philistine", sourceRef: "1 Samuel 17:23" }
];


const mediumOrderBank = [
  { era: "genesis", items: ["Light created", "Sky formed", "Dry land appears"], sourceRef: "Genesis 1:3; 1:6-7; 1:9-10" },
  { era: "genesis", items: ["Man formed from dust", "Garden planted in Eden", "Woman brought to Adam"], sourceRef: "Genesis 2:7; 2:8; 2:22" },
  { era: "genesis", items: ["Serpent speaks", "Eyes opened", "Adam and Eve hide"], sourceRef: "Genesis 3:1-7" },
  { era: "genesis", items: ["Noah obeyed God", "Flood begins", "Rainbow covenant"], sourceRef: "Genesis 6:22; 7:17; 9:13" },
  { era: "genesis", items: ["God warns Noah", "Ark prepared", "Noah enters the ark"], sourceRef: "Genesis 6:13-14; 6:22; 7:7" },
  { era: "genesis", items: ["Fountains burst forth", "Rain falls forty days", "Waters cover the mountains"], sourceRef: "Genesis 7:11-12; 7:17; 7:19" },
  { era: "genesis", items: ["Ark rests on Ararat", "Dove returns with olive leaf", "Ground dries"], sourceRef: "Genesis 8:4; 8:11; 8:14" },
  { era: "genesis", items: ["God makes covenant", "Rainbow set in cloud", "Promise for every living creature"], sourceRef: "Genesis 9:9; 9:13; 9:16" },
  { era: "genesis", items: ["Nimrod rises", "Kingdom begins at Babel", "Families spread by nations"], sourceRef: "Genesis 10:8-10; 10:32" },
  { era: "genesis", items: ["One language", "Come, let's build", "Languages confused"], sourceRef: "Genesis 11:1; 11:4; 11:7" },
  { era: "patriarchs", items: ["Jacob dreams at Bethel", "Jacob serves Laban", "Jacob returns to Canaan"], sourceRef: "Genesis 28:12; 29:20; 31:3" },
  { era: "patriarchs", items: ["Joseph sold", "Joseph imprisoned", "Joseph raised in Egypt"], sourceRef: "Genesis 37:28; 39:20; 41:41" },
  { era: "exodus", items: ["Burning bush call", "Passover night", "Sea crossing"], sourceRef: "Exodus 3:4; 12:29-31; 14:21-22" },
  { era: "sinai", items: ["Mountain trembles", "Ten Commandments spoken", "Covenant blood sprinkled"], sourceRef: "Exodus 19:18; 20:1; 24:8" },
  { era: "wilderness", items: ["Water from rock", "Spies sent", "Bronze serpent lifted"], sourceRef: "Exodus 17:6; Numbers 13:1-2; Numbers 21:9" },
  { era: "wilderness", items: ["Manna provided", "Spies sent", "Moses declares the law"], sourceRef: "Exodus 16:15; Numbers 13:1-2; Deuteronomy 1:5" },
  { era: "conquest", items: ["Spies enter Jericho", "Jordan crossing", "Jericho walls fall"], sourceRef: "Joshua 2:1; 3:14-17; 6:20" },
  { era: "judges", items: ["Israel cries out", "Deliverer raised", "Land has rest"], sourceRef: "Judges 3:9-11" },
  { era: "judges", items: ["Ruth stays with Naomi", "Ruth gleans in Boaz's field", "Boaz redeems Ruth"], sourceRef: "Ruth 1:16; 2:3; 4:13" },
  { era: "samuel", items: ["Hannah prays", "Samuel ministers", "Samuel hears God's call"], sourceRef: "1 Samuel 1:10-11; 2:18; 3:10" },
  { era: "saul", items: ["Saul searches for donkeys", "Saul anointed", "Saul presented as king"], sourceRef: "1 Samuel 9:3; 10:1; 10:24" },
  { era: "david", items: ["David anointed", "Goliath defeated", "David flees Saul"], sourceRef: "1 Samuel 16:13; 17:50; 19:10" }
];


const advancedOrderBank = [
  { era: "genesis", items: ["Earth formless and empty", "Light shines", "Lights set in the heavens"], sourceRef: "Genesis 1:2; 1:3; 1:14-16" },
  { era: "genesis", items: ["Adam placed in the garden", "Animals brought to Adam", "Woman built from the rib"], sourceRef: "Genesis 2:15; 2:19-20; 2:21-22" },
  { era: "genesis", items: ["Adam and Eve hide", "God declares the curse", "Cherubim guard Eden"], sourceRef: "Genesis 3:8; 3:14-19; 3:24" },
  { era: "genesis", items: ["Noah enters ark", "Waters prevail", "Ark rests on Ararat"], sourceRef: "Genesis 7:7; 7:24; 8:4" },
  { era: "genesis", items: ["Noah builds the ark", "Noah enters with his family", "Yahweh shuts him in"], sourceRef: "Genesis 6:22; 7:7; 7:16" },
  { era: "genesis", items: ["Forty days of rain", "Waters prevail", "God remembered Noah"], sourceRef: "Genesis 7:12; 7:24; 8:1" },
  { era: "genesis", items: ["Raven sent out", "Dove sent out", "Dove brings olive leaf"], sourceRef: "Genesis 8:7; 8:8; 8:11" },
  { era: "genesis", items: ["Ark rests on Ararat", "Earth dries", "Noah leaves ark"], sourceRef: "Genesis 8:4; 8:13; 8:18" },
  { era: "genesis", items: ["God blesses Noah", "Rainbow set in cloud", "Everlasting covenant remembered"], sourceRef: "Genesis 9:1; 9:13; 9:16" },
  { era: "genesis", items: ["People settle in Shinar", "Yahweh comes down", "People scattered abroad"], sourceRef: "Genesis 11:2; 11:5; 11:8" },
  { era: "genesis", items: ["Nimrod's kingdom begins", "City called Babel", "Nations spread abroad"], sourceRef: "Genesis 10:10; 11:9; 10:32" },
  { era: "patriarchs", items: ["Abram leaves Haran", "Covenant promise under the stars", "Isaac offered"], sourceRef: "Genesis 12:4; 15:5-6; 22:10-12" },
  { era: "patriarchs", items: ["Joseph dreams", "Joseph interprets Pharaoh", "Joseph reveals himself"], sourceRef: "Genesis 37:5; 41:25-32; 45:4" },
  { era: "exodus", items: ["Staff becomes serpent", "Hail plague falls", "Firstborn struck in Egypt"], sourceRef: "Exodus 7:10; 9:23-24; 12:29" },
  { era: "sinai", items: ["People wash and prepare", "Trumpet grows louder", "Moses enters the cloud"], sourceRef: "Exodus 19:10-11; 19:19; 24:18" },
  { era: "wilderness", items: ["Manna appears", "People refuse after spies report", "Bronze serpent raised"], sourceRef: "Exodus 16:15; Numbers 14:1-4; Numbers 21:9" },
  { era: "wilderness", items: ["Unbelieving generation judged", "Bronze serpent raised", "Moses declares the law"], sourceRef: "Numbers 14:33-34; Numbers 21:9; Deuteronomy 1:5" },
  { era: "conquest", items: ["Jordan memorial stones set up", "Achan judged", "Covenant renewed at Shechem"], sourceRef: "Joshua 4:20; 7:25; 24:25" },
  { era: "judges", items: ["Deborah judges Israel", "Gideon defeats Midian", "Samson pulls the pillars"], sourceRef: "Judges 4:4; 7:22; 16:30" },
  { era: "judges", items: ["Ruth meets Boaz", "Ruth asks for redemption", "Obed is born"], sourceRef: "Ruth 2:8; 3:9; 4:13,17" },
  { era: "samuel", items: ["Hannah prays", "Samuel hears Yahweh", "Ebenezer raised"], sourceRef: "1 Samuel 1:10-11; 3:10; 7:12" },
  { era: "saul", items: ["Saul prophesies", "Saul disobeys at Gilgal", "Kingdom torn from Saul announced"], sourceRef: "1 Samuel 10:10-11; 13:13; 15:28" },
  { era: "david", items: ["David anointed", "David defeats Goliath", "Jonathan and David covenant"], sourceRef: "1 Samuel 16:13; 17:50; 18:3" }
];

const orderBank = [


  { era: "genesis", items: ["Creation", "Fall", "Flood"], sourceRef: "Genesis 1:1; 3:6-7; 7:17" },
  { era: "genesis", items: ["Light", "People created", "God rested"], sourceRef: "Genesis 1:3; 1:27; 2:2-3" },
  { era: "genesis", items: ["Serpent tempts", "Sin enters", "God sends them out"], sourceRef: "Genesis 3:1-6; 3:23" },
  { era: "genesis", items: ["Noah builds the ark", "Flood waters rise", "Rainbow sign appears"], sourceRef: "Genesis 6:22; 7:17; 9:13" },
  { era: "genesis", items: ["Animals enter ark", "Rain falls", "Waters recede"], sourceRef: "Genesis 7:9; 7:12; 8:3" },
  { era: "genesis", items: ["Noah offers burnt offering", "God promises seedtime and harvest", "Covenant sign is given"], sourceRef: "Genesis 8:20-22; 9:13" },
  { era: "genesis", items: ["Flood ends", "Nations spread", "Tower of Babel"], sourceRef: "Genesis 8:13; 10:32; 11:1-9" },
  { era: "genesis", items: ["Whole earth has one language", "People settle in Shinar", "Yahweh scatters them"], sourceRef: "Genesis 11:1; 11:2; 11:8" },
  { era: "genesis", items: ["Bricks made", "Tower planned", "Babel named"], sourceRef: "Genesis 11:3; 11:4; 11:9" },
  { era: "patriarchs", items: ["Abram called", "Isaac born", "Jacob renamed Israel"], sourceRef: "Genesis 12:1; 21:1-3; 32:28" },
  { era: "patriarchs", items: ["Joseph sold", "Pharaoh's dreams interpreted", "Family saved from famine"], sourceRef: "Genesis 37:28; 41:25-32; 45:7" },
  { era: "exodus", items: ["Plagues", "Passover", "Sea crossing"], sourceRef: "Exodus 7:14-12:30; 12:11-14; 14:21-22" },
  { era: "sinai", items: ["People gather at the mountain", "Ten Commandments given", "Covenant sealed with blood"], sourceRef: "Exodus 19:17; 20:1; 24:8" },
  { era: "wilderness", items: ["Manna provided", "Water from rock", "Spies sent"], sourceRef: "Exodus 16:15; 17:6; Numbers 13:1-2" },
  { era: "wilderness", items: ["Manna provided", "Bronze serpent lifted", "Moses declares the law"], sourceRef: "Exodus 16:15; Numbers 21:9; Deuteronomy 1:5" },
  { era: "conquest", items: ["Cross Jordan", "Jericho falls", "Land divided"], sourceRef: "Joshua 3:14-17; 6:20; 13:6-7" },
  { era: "judges", items: ["People rebel", "Oppression comes", "Judge raised"], sourceRef: "Judges 2:11-12,14,16" },
  { era: "judges", items: ["Ruth stays with Naomi", "Ruth gleans in Boaz's field", "Boaz redeems Ruth"], sourceRef: "Ruth 1:16; 2:3; 4:13" },
  { era: "samuel", items: ["Samuel called", "Ark returned", "Ebenezer raised"], sourceRef: "1 Samuel 3:8-10; 6:13; 7:12" },
  { era: "saul", items: ["Saul anointed", "Early victories", "Disobedience exposed"], sourceRef: "1 Samuel 10:1; 11:11; 15:22-23" },
  { era: "david", items: ["David anointed", "David serves Saul", "Goliath defeated"], sourceRef: "1 Samuel 16:13,21; 17:50" }
];


const mediumFactBank = [
  { era: "genesis", parts: ["In", "the", "beginning", "God", "created", "the", "heavens", "and", "the", "earth"], sourceRef: "Genesis 1:1" },
  { era: "genesis", parts: ["God", "called", "the", "dry", "land", "Earth"], sourceRef: "Genesis 1:10" },
  { era: "genesis", parts: ["God", "created", "man", "in", "his", "own", "image"], sourceRef: "Genesis 1:27" },
  { era: "genesis", parts: ["God", "planted", "a", "garden", "eastward", "in", "Eden"], sourceRef: "Genesis 2:8" },
  { era: "genesis", parts: ["Yahweh", "God", "commanded", "the", "man"], sourceRef: "Genesis 2:16" },
  { era: "genesis", parts: ["The", "man", "gave", "names", "to", "all", "livestock"], sourceRef: "Genesis 2:20" },
  { era: "genesis", parts: ["They", "were", "both", "naked", "and", "not", "ashamed"], sourceRef: "Genesis 2:25" },
  { era: "genesis", parts: ["God", "formed", "man", "from", "dust"], sourceRef: "Genesis 2:7" },
  { era: "genesis", parts: ["The", "woman", "saw", "that", "the", "tree", "was", "good", "for", "food"], sourceRef: "Genesis 3:6" },
  { era: "genesis", parts: ["Their", "eyes", "were", "opened"], sourceRef: "Genesis 3:7" },
  { era: "genesis", parts: ["The", "serpent", "deceived", "me"], sourceRef: "Genesis 3:13" },
  { era: "genesis", parts: ["Adam", "called", "his", "wife", "Eve"], sourceRef: "Genesis 3:20" },
  { era: "genesis", parts: ["Noah", "found", "favor", "in", "Yahweh's", "eyes"], sourceRef: "Genesis 6:8" },
  { era: "genesis", parts: ["Noah", "did", "everything", "God", "commanded", "him"], sourceRef: "Genesis 6:22" },
  { era: "genesis", parts: ["God", "shut", "Noah", "in", "the", "ark"], sourceRef: "Genesis 7:16" },
  { era: "genesis", parts: ["God", "remembered", "Noah"], sourceRef: "Genesis 8:1" },
  { era: "genesis", parts: ["I", "set", "my", "rainbow", "in", "the", "cloud"], sourceRef: "Genesis 9:13" },
  { era: "genesis", parts: ["I", "establish", "my", "covenant", "with", "you"], sourceRef: "Genesis 9:9" },
  { era: "genesis", parts: ["Come", "let's", "make", "bricks"], sourceRef: "Genesis 11:3" },
  { era: "genesis", parts: ["Come", "let's", "build", "a", "tower"], sourceRef: "Genesis 11:4" },
  { era: "patriarchs", parts: ["He", "believed", "in", "Yahweh"], sourceRef: "Genesis 15:6" },
  { era: "patriarchs", parts: ["God", "meant", "it", "for", "good"], sourceRef: "Genesis 50:20" },
  { era: "exodus", parts: ["Yahweh", "led", "Israel", "by", "cloud", "and", "fire"], sourceRef: "Exodus 13:21" },
  { era: "sinai", parts: ["Mount", "Sinai", "smoked", "because", "Yahweh", "descended"], sourceRef: "Exodus 19:18" },
  { era: "wilderness", parts: ["God", "brought", "water", "from", "the", "rock"], sourceRef: "Exodus 17:6" },
  { era: "wilderness", parts: ["Love", "Yahweh", "your", "God", "with", "all", "your", "heart"], sourceRef: "Deuteronomy 6:5" },
  { era: "conquest", parts: ["Be", "strong", "and", "very", "courageous"], sourceRef: "Joshua 1:7" },
  { era: "judges", parts: ["Yahweh's", "Spirit", "came", "on", "Gideon"], sourceRef: "Judges 6:34" },
  { era: "judges", parts: ["Where", "you", "go", "I", "will", "go"], sourceRef: "Ruth 1:16" },
  { era: "samuel", parts: ["Eli", "taught", "Samuel", "how", "to", "answer"], sourceRef: "1 Samuel 3:9" },
  { era: "saul", parts: ["Saul", "hid", "among", "the", "baggage"], sourceRef: "1 Samuel 10:22" },
  { era: "david", parts: ["Yahweh", "doesn't", "save", "with", "sword", "and", "spear"], sourceRef: "1 Samuel 17:47" }
];


const advancedFactBank = [
  { era: "genesis", parts: ["In", "the", "beginning", "God", "created", "the", "heavens", "and", "the", "earth"], sourceRef: "Genesis 1:1" },
  { era: "genesis", parts: ["God", "blessed", "the", "seventh", "day"], sourceRef: "Genesis 2:3" },
  { era: "genesis", parts: ["He", "will", "bruise", "your", "head"], sourceRef: "Genesis 3:15" },
  { era: "genesis", parts: ["God", "remembered", "Noah"], sourceRef: "Genesis 8:1" },
  { era: "genesis", parts: ["Yahweh", "came", "down", "to", "see", "the", "city"], sourceRef: "Genesis 11:5" },
  { era: "genesis", parts: ["There", "Yahweh", "confused", "the", "language", "of", "all", "the", "earth"], sourceRef: "Genesis 11:9" },
  { era: "patriarchs", parts: ["Look", "now", "toward", "the", "sky", "and", "count", "the", "stars"], sourceRef: "Genesis 15:5" },
  { era: "patriarchs", parts: ["God", "sent", "me", "before", "you", "to", "preserve", "life"], sourceRef: "Genesis 45:5" },
  { era: "exodus", parts: ["When", "I", "see", "the", "blood", "I", "will", "pass", "over", "you"], sourceRef: "Exodus 12:13" },
  { era: "sinai", parts: ["All", "that", "Yahweh", "has", "spoken", "we", "will", "do", "and", "be", "obedient"], sourceRef: "Exodus 24:7" },
  { era: "wilderness", parts: ["Yahweh", "is", "slow", "to", "anger", "and", "abundant", "in", "loving", "kindness"], sourceRef: "Numbers 14:18" },
  { era: "wilderness", parts: ["Man", "doesn't", "live", "by", "bread", "alone"], sourceRef: "Deuteronomy 8:3" },
  { era: "conquest", parts: ["As", "for", "me", "and", "my", "house", "we", "will", "serve", "Yahweh"], sourceRef: "Joshua 24:15" },
  { era: "judges", parts: ["Yahweh", "raised", "up", "judges", "who", "saved", "them"], sourceRef: "Judges 2:16" },
  { era: "judges", parts: ["Your", "people", "shall", "be", "my", "people"], sourceRef: "Ruth 1:16" },
  { era: "samuel", parts: ["Hannah", "said", "there", "is", "no", "rock", "like", "our", "God"], sourceRef: "1 Samuel 2:2" },
  { era: "saul", parts: ["Yahweh", "has", "torn", "the", "kingdom", "of", "Israel", "from", "you", "today"], sourceRef: "1 Samuel 15:28" },
  { era: "david", parts: ["The", "battle", "is", "Yahweh's", "and", "he", "will", "give", "you", "into", "our", "hand"], sourceRef: "1 Samuel 17:47" }
];

const factBank = [
  { era: "genesis", parts: ["In", "the", "beginning", "God", "created"], sourceRef: "Genesis 1:1" },
  { era: "genesis", parts: ["God", "called", "the", "light", "Day"], sourceRef: "Genesis 1:5" },
  { era: "genesis", parts: ["It", "was", "very", "good"], sourceRef: "Genesis 1:31" },
  { era: "genesis", parts: ["God", "rested", "on", "the", "seventh", "day"], sourceRef: "Genesis 2:2-3" },
  { era: "genesis", parts: ["Yahweh", "God", "planted", "a", "garden"], sourceRef: "Genesis 2:8" },
  { era: "genesis", parts: ["The", "man", "was", "alone"], sourceRef: "Genesis 2:18" },
  { era: "genesis", parts: ["Yahweh", "God", "made", "garments", "of", "skin"], sourceRef: "Genesis 3:21" },
  { era: "genesis", parts: ["Noah", "did", "all", "that", "God", "commanded"], sourceRef: "Genesis 6:22" },
  { era: "genesis", parts: ["Only", "Noah", "was", "left", "alive"], sourceRef: "Genesis 7:23" },
  { era: "genesis", parts: ["God", "remembered", "Noah"], sourceRef: "Genesis 8:1" },
  { era: "genesis", parts: ["I", "set", "my", "rainbow", "in", "the", "cloud"], sourceRef: "Genesis 9:13" },
  { era: "genesis", parts: ["The", "whole", "earth", "was", "of", "one", "language"], sourceRef: "Genesis 11:1" },
  { era: "genesis", parts: ["Yahweh", "scattered", "them", "abroad", "from", "there"], sourceRef: "Genesis 11:8" },
  { era: "patriarchs", parts: ["All", "families", "of", "the", "earth", "will", "be", "blessed"], sourceRef: "Genesis 12:3" },
  { era: "patriarchs", parts: ["God", "intended", "it", "for", "good"], sourceRef: "Genesis 50:20" },
  { era: "exodus", parts: ["Yahweh", "saved", "Israel", "that", "day"], sourceRef: "Exodus 14:30" },
  { era: "sinai", parts: ["God", "spoke", "all", "these", "words"], sourceRef: "Exodus 20:1" },
  { era: "wilderness", parts: ["God", "provided", "manna", "in", "the", "wilderness"], sourceRef: "Exodus 16:15" },
  { era: "conquest", parts: ["Be", "strong", "and", "courageous"], sourceRef: "Joshua 1:9" },
  { era: "judges", parts: ["Yahweh", "raised", "up", "judges"], sourceRef: "Judges 2:16" },
  { era: "samuel", parts: ["Speak", "for", "your", "servant", "hears"], sourceRef: "1 Samuel 3:10" },
  { era: "saul", parts: ["Obedience", "is", "better", "than", "sacrifice"], sourceRef: "1 Samuel 15:22" },
  { era: "david", parts: ["The", "battle", "is", "Yahweh's"], sourceRef: "1 Samuel 17:47" }
];

const ALL_QUIZ_BANKS = [].concat(quizBank, mediumQuizBank, advancedQuizBank);
const ALL_SPELLING_BANKS = [].concat(spellingBank, mediumSpellingBank, advancedSpellingBank);
const ALL_ORDER_BANKS = [].concat(orderBank, mediumOrderBank, advancedOrderBank);
const ALL_FACT_BANKS = [].concat(factBank, mediumFactBank, advancedFactBank);

function themeLevelCount(theme) {
  return Math.max(1, Number(THEME_LEVELS_BY_NAME[theme.name] || 5));
}

function themeReferencePlan(theme) {
  return THEME_REFERENCE_PLAN_BY_NAME[theme.name] || REFERENCE_PLAN_BY_ERA[theme.era] || [];
}

function buildLevelThemeSequence() {
  const sequence = [];
  timelineThemes.forEach((theme) => {
    for (let count = 0; count < themeLevelCount(theme) && sequence.length < TOTAL_LEVELS; count += 1) {
      sequence.push(theme);
    }
  });

  while (sequence.length < TOTAL_LEVELS) {
    sequence.push(timelineThemes[timelineThemes.length - 1]);
  }

  return sequence.slice(0, TOTAL_LEVELS);
}

const levelThemeSequence = buildLevelThemeSequence();
const stages = Array.from({ length: TOTAL_LEVELS }, (_, levelIndex) => {
  const level = levelIndex + 1;
  const theme = levelThemeSequence[levelIndex] || timelineThemes[timelineThemes.length - 1];
  return Array.from({ length: STAGES_PER_LEVEL }, (_, stageIndex) => {
    const stage = stageIndex + 1;
    const id = `l${level}-s${stage}`;
    return {
      id,
      level,
      stage,
      theme
    };
  });
}).flat();

const badgeCatalog = buildBadgeCatalog();
const badgeById = new Map(badgeCatalog.map((badge) => [badge.id, badge]));
let activeCleanup = null;
let activeCutsceneCleanup = null;
let hasResumedSession = false;
let activeShareBadgeId = null;
let storyTheaterProbeTimer = 0;
let storyTheaterAutoCloseTimer = 0;
let storyTheaterAutoCloseToken = 0;
let storyNarrationUtterance = null;
let storyNarrationAudio = null;
let activeStoryTheaterEra = null;
let storyStillSequenceTimer = 0;
let storyStillSequenceToken = 0;
let stageStillSequenceTimer = 0;
let stageStillSequenceToken = 0;
const preloadedCutsceneEras = new Set();
const preloadedCutscenePosters = new Set();
const preloadedCutsceneVideos = [];
const preloadedNarrationEras = new Set();
const preloadedNarrationAudio = [];
let hubMediaWarmupScheduled = false;
let stageGridRenderToken = 0;
let lastStageGridRenderKey = "";
let stageGridRenderDelayTimer = 0;
let hasRenderedStageGridOnce = false;
let pendingStageFocusId = null;
let pendingHubReturnTargetId = null;
let lastPersistFingerprint = "";
const runtimePerformance = {
  reducedMotionQuery: null,
  reducedMotion: false,
  performanceLite: false,
  hiddenCleanupTimer: 0
};

function normalizeDifficulty(value) {
  return DIFFICULTY_LEVELS.includes(value) ? value : "medium";
}

function normalizeLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value) ? value : "en";
}

function detectPerformanceLite() {
  runtimePerformance.reducedMotion = Boolean(
    runtimePerformance.reducedMotionQuery && runtimePerformance.reducedMotionQuery.matches
  );
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  const lowCpu = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  const lowMemory = typeof navigator.deviceMemory === "number" && navigator.deviceMemory > 0 && navigator.deviceMemory <= 4;
  return Boolean(runtimePerformance.reducedMotion || saveData || lowCpu || lowMemory);
}

function applyPerformanceMode() {
  const nextLite = detectPerformanceLite();
  const changed = nextLite !== runtimePerformance.performanceLite;
  runtimePerformance.performanceLite = nextLite;

  if (document.body) {
    document.body.classList.toggle("performance-lite", runtimePerformance.performanceLite);
    document.body.classList.toggle("reduced-motion", runtimePerformance.reducedMotion);
  }

  if (changed && runtimePerformance.performanceLite) {
    trimPreloadedMediaCaches({ aggressive: true });
  }
}

function initPerformanceModeWatcher() {
  if (typeof window.matchMedia === "function") {
    runtimePerformance.reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const query = runtimePerformance.reducedMotionQuery;
    const onChange = () => {
      applyPerformanceMode();
    };
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", onChange);
    } else if (typeof query.addListener === "function") {
      query.addListener(onChange);
    }
  }

  if (navigator.connection && typeof navigator.connection.addEventListener === "function") {
    navigator.connection.addEventListener("change", () => {
      applyPerformanceMode();
    });
  }

  applyPerformanceMode();
}

function localDayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function dayStartFromKey(key) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(key || ""))) return null;
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).getTime();
}

function t(key) {
  const langTable = UI_TEXT_BY_LANGUAGE[state.language] || UI_TEXT_BY_LANGUAGE.en;
  return langTable[key] || UI_TEXT_BY_LANGUAGE.en[key] || key;
}

function challengeCopy(enText, esText) {
  return state.language === "es" ? esText : enText;
}

function volumeLabelFor(level) {
  if (level === "low") return t("volumeLow");
  if (level === "high") return t("volumeHigh");
  return t("volumeMedium");
}

function resolvedMusicLevel() {
  return MUSIC_LEVELS[state.audio.musicLevel] ? state.audio.musicLevel : "high";
}

function resolvedMusicStyle() {
  return MUSIC_STYLES[state.audio.musicStyle] ? state.audio.musicStyle : "cinematic";
}

function musicStyleLabelFor(style) {
  if (style === "energetic") return t("musicStyleEnergetic");
  return t("musicStyleCinematic");
}

function musicGainForCurrentLevel() {
  return MUSIC_LEVELS[resolvedMusicLevel()] || MUSIC_LEVELS.high;
}

function normalizePlayerName(value) {
  const collapsed = String(value || "")
    .replace(/\s+/g, " ")
    .trim();
  const safe = collapsed.replace(/[<>{}\[\]|`^~]/g, "");
  return safe.slice(0, 40);
}

const launchQueryName = normalizePlayerName(new URLSearchParams(window.location.search).get("playerName") || "");

const state = {

  unlocked: Number(localStorage.getItem("faithUnlocked") || 1),
  completed: JSON.parse(localStorage.getItem("faithCompleted") || "[]"),
  xp: Number(localStorage.getItem("faithXp") || 0),
  lives: Number(localStorage.getItem("faithLives") || MAX_LIVES),
  badges: JSON.parse(localStorage.getItem("faithBadges") || "[]"),
  audio: JSON.parse(localStorage.getItem("faithAudio") || "{\"music\":true,\"sfx\":true}"),
  levelFailures: JSON.parse(localStorage.getItem("faithLevelFailures") || "{}"),
  stats: JSON.parse(localStorage.getItem("faithStats") || "{}"),
  difficulty: normalizeDifficulty(localStorage.getItem("faithDifficulty") || "medium"),
  activeStage: localStorage.getItem("faithActiveStage") || null,
  lastStage: localStorage.getItem("faithLastStage") || null,
  lastBadge: localStorage.getItem("faithLastBadge") || "",
  playerName: normalizePlayerName(localStorage.getItem("faithPlayerName") || ""),
  finalSeen: localStorage.getItem("faithFinalSeen") === "true",
  questionHistory: JSON.parse(localStorage.getItem("faithQuestionHistory") || "{}"),
  stageActivities: JSON.parse(localStorage.getItem("faithStageActivities") || "{}"),
  language: normalizeLanguage(localStorage.getItem("faithLanguage") || "en"),
  dailyStrike: JSON.parse(localStorage.getItem("faithDailyStrike") || '{"count":0,"best":0,"lastClaimed":""}')
};

if (launchQueryName) {
  state.playerName = launchQueryName;
}

state.lives = Math.max(0, Math.min(MAX_LIVES, state.lives));
state.playerName = normalizePlayerName(state.playerName);
if (launchQueryName && launchQueryName !== (localStorage.getItem("faithPlayerName") || "")) {
  localStorage.setItem("faithPlayerName", launchQueryName);
}
if (typeof state.audio.music !== "boolean") state.audio.music = true;
if (typeof state.audio.sfx !== "boolean") state.audio.sfx = true;
if (!MUSIC_LEVELS[state.audio.musicLevel]) state.audio.musicLevel = "high";
if (!MUSIC_STYLES[state.audio.musicStyle]) state.audio.musicStyle = "cinematic";
if (typeof state.finalSeen !== "boolean") state.finalSeen = false;
if (!state.questionHistory || typeof state.questionHistory !== "object" || Array.isArray(state.questionHistory)) {
  state.questionHistory = {};
}
if (!state.stageActivities || typeof state.stageActivities !== "object" || Array.isArray(state.stageActivities)) {
  state.stageActivities = {};
}
if (!DIFFICULTY_LEVELS.includes(state.difficulty)) state.difficulty = "medium";
state.language = normalizeLanguage(state.language);
if (!state.dailyStrike || typeof state.dailyStrike !== "object" || Array.isArray(state.dailyStrike)) {
  state.dailyStrike = { count: 0, best: 0, lastClaimed: "" };
}
state.dailyStrike.count = Math.max(0, Number(state.dailyStrike.count || 0));
state.dailyStrike.best = Math.max(state.dailyStrike.count, Number(state.dailyStrike.best || 0));
state.dailyStrike.lastClaimed = /^\d{4}-\d{2}-\d{2}$/.test(String(state.dailyStrike.lastClaimed || ""))
  ? String(state.dailyStrike.lastClaimed)
  : "";

if ((localStorage.getItem("faithContentVersion") || "") !== CONTENT_VERSION) {
  state.questionHistory = {};
  state.stageActivities = {};
  localStorage.setItem("faithQuestionHistory", "{}");
  localStorage.setItem("faithStageActivities", "{}");
  localStorage.setItem("faithContentVersion", CONTENT_VERSION);
}
state.stats = {
  levelsCompleted: Number(state.stats.levelsCompleted || 0),
  stagesCompleted: Number(state.stats.stagesCompleted || 0),
  interactiveWins: Number(state.stats.interactiveWins || 0),
  timingWins: Number(state.stats.timingWins || 0),
  collectWins: Number(state.stats.collectWins || 0),
  dodgeWins: Number(state.stats.dodgeWins || 0),
  slingshotWins: Number(state.stats.slingshotWins || 0),
  flawlessLevels: Number(state.stats.flawlessLevels || 0),
  difficultyPass: {
    easy: Boolean(state.stats.difficultyPass && state.stats.difficultyPass.easy),
    medium: Boolean(state.stats.difficultyPass && state.stats.difficultyPass.medium),
    advanced: Boolean(state.stats.difficultyPass && state.stats.difficultyPass.advanced)
  }
};

const stageGrid = document.getElementById("stageGrid");
const gameDashboard = document.getElementById("gameDashboard");
const storyPathHeading = document.getElementById("storyPathHeading");
const activityOverlay = document.getElementById("activityOverlay");
const activityPanel = document.getElementById("activityPanel");
const closeActivityBtn = document.getElementById("closeActivityBtn");
const welcomeOverlay = document.getElementById("welcomeOverlay");
const acceptChallengeBtn = document.getElementById("acceptChallengeBtn");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const xpText = document.getElementById("xpText");
const livesText = document.getElementById("livesText");
const badgeText = document.getElementById("badgeText");
const dailyStrikeText = document.getElementById("dailyStrikeText");
const resetBtn = document.getElementById("resetBtn");
const restoreLivesBtn = document.getElementById("restoreLivesBtn");
const dailyStrikeBtn = document.getElementById("dailyStrikeBtn");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicVolumeBtn = document.getElementById("musicVolumeBtn");
const musicStyleBtn = document.getElementById("musicStyleBtn");
const sfxToggleBtn = document.getElementById("sfxToggleBtn");
const difficultyEasyBtn = document.getElementById("difficultyEasyBtn");
const difficultyMediumBtn = document.getElementById("difficultyMediumBtn");
const difficultyAdvancedBtn = document.getElementById("difficultyAdvancedBtn");
const difficultyButtons = [difficultyEasyBtn, difficultyMediumBtn, difficultyAdvancedBtn].filter(Boolean);
const badgeGrid = document.getElementById("badgeGrid");
const badgeHelper = document.getElementById("badgeHelper");
const shareLatestBadgeBtn = document.getElementById("shareLatestBadgeBtn");
const openBadgeShieldBtn = document.getElementById("openBadgeShieldBtn");
const badgeShieldOverlay = document.getElementById("badgeShieldOverlay");
const badgeShieldGrid = document.getElementById("badgeShieldGrid");
const badgeShieldProgress = document.getElementById("badgeShieldProgress");
const difficultyBadgeRow = document.getElementById("difficultyBadgeRow");
const closeBadgeShieldBtn = document.getElementById("closeBadgeShieldBtn");
const shareOverlay = document.getElementById("shareOverlay");
const shareBadgeTitle = document.getElementById("shareBadgeTitle");
const shareBadgeText = document.getElementById("shareBadgeText");
const shareByTextBtn = document.getElementById("shareByTextBtn");
const shareByEmailBtn = document.getElementById("shareByEmailBtn");
const shareBySocialBtn = document.getElementById("shareBySocialBtn");
const copyShareTextBtn = document.getElementById("copyShareTextBtn");
const closeShareBtn = document.getElementById("closeShareBtn");
const finalOverlay = document.getElementById("finalOverlay");
const startOverFinalBtn = document.getElementById("startOverFinalBtn");
const openCreditsBtn = document.getElementById("openCreditsBtn");
const closeFinalBtn = document.getElementById("closeFinalBtn");
const finalHeading = document.getElementById("finalHeading");
const finalMessage = document.getElementById("finalMessage");
const certificateName = document.getElementById("certificateName");
const certificateDate = document.getElementById("certificateDate");
const creditsOverlay = document.getElementById("creditsOverlay");
const creditsCrawlTrack = document.getElementById("creditsCrawlTrack");
const replayCreditsBtn = document.getElementById("replayCreditsBtn");
const closeCreditsBtn = document.getElementById("closeCreditsBtn");
const startOverCreditsBtn = document.getElementById("startOverCreditsBtn");
const storyPreviewGrid = document.getElementById("storyPreviewGrid");
const storyTheaterOverlay = document.getElementById("storyTheaterOverlay");
const storyTheaterTitle = document.getElementById("storyTheaterTitle");
const storyTheaterVideo = document.getElementById("storyTheaterVideo");
const storyTheaterNote = document.getElementById("storyTheaterNote");
const closeStoryTheaterBtn = document.getElementById("closeStoryTheaterBtn");
const languageSelect = document.getElementById("languageSelect");
const dailyThoughtHeading = document.getElementById("dailyThoughtHeading");
const dailyThoughtRef = document.getElementById("dailyThoughtRef");
const dailyThoughtText = document.getElementById("dailyThoughtText");
const dailyPracticalText = document.getElementById("dailyPracticalText");

const audioEngine = {
  ctx: null,
  master: null,
  musicGain: null,
  sfxGain: null,
  timer: null,
  step: 0,
  musicStartCtx: 0,
  nextBeatAt: 0,
  finaleTimer: null,
  finaleTimeouts: [],
  creditsTimer: null,
  creditsTimeouts: [],
  musicStartedAt: 0,
  musicFilter: null,
  musicCompressor: null,
  bootMusicHoldUntil: 0
};
const AUDIO_UNLOCK_EVENTS = ["pointerdown", "touchstart", "mousedown", "click", "keydown"];
let audioUnlockArmed = false;

function clearAudioNodes() {
  audioEngine.ctx = null;
  audioEngine.master = null;
  audioEngine.musicGain = null;
  audioEngine.sfxGain = null;
  audioEngine.musicFilter = null;
  audioEngine.musicCompressor = null;
}

function disarmAudioUnlock() {
  if (!audioUnlockArmed) return;
  AUDIO_UNLOCK_EVENTS.forEach((eventName) => {
    document.removeEventListener(eventName, handleAudioUnlock, true);
  });
  audioUnlockArmed = false;
}

function armAudioUnlock() {
  if (audioUnlockArmed) return;
  AUDIO_UNLOCK_EVENTS.forEach((eventName) => {
    document.addEventListener(eventName, handleAudioUnlock, true);
  });
  audioUnlockArmed = true;
}

function handleAudioUnlock() {
  ensureAudio();
  const ctx = audioEngine.ctx;
  if (!ctx) return;
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  if (ctx.state === "running") {
    disarmAudioUnlock();
  }
  updateAudioState();
}

function buildBadgeCatalog() {
  const list = [];
  let themeIndex = 0;

  const nextTheme = () => {
    const theme = badgeSymbolThemes[themeIndex] || badgeSymbolThemes[badgeSymbolThemes.length - 1];
    themeIndex += 1;
    return theme;
  };

  const createBadge = (id, accomplishment, check) => {
    const theme = nextTheme();
    return {
      id,
      name: theme.name,
      icon: theme.icon,
      accomplishment,
      check
    };
  };

  for (let i = 1; i <= 20; i += 1) {
    const levelTarget = i * 5;
    list.push(
      createBadge(
        `level-${levelTarget}`,
        `Completed ${levelTarget} levels in FAITHSHIELD.`,
        (s) => s.stats.levelsCompleted >= levelTarget
      )
    );
  }

  [500, 1200, 2500, 4200, 6500].forEach((xpTarget) => {
    list.push(
      createBadge(
        `xp-${xpTarget}`,
        `Earned ${xpTarget} XP through Scripture challenges.`,
        (s) => s.xp >= xpTarget
      )
    );
  });

  [10, 25, 50, 100, 180].forEach((winsTarget) => {
    list.push(
      createBadge(
        `interactive-${winsTarget}`,
        `Won ${winsTarget} skill challenges.`,
        (s) => s.stats.interactiveWins >= winsTarget
      )
    );
  });

  [8, 20].forEach((target) => {
    list.push(
      createBadge(`timing-${target}`, `Won ${target} timing challenges.`, (s) => s.stats.timingWins >= target),
      createBadge(`collect-${target}`, `Won ${target} collecting challenges.`, (s) => s.stats.collectWins >= target),
      createBadge(`dodge-${target}`, `Won ${target} dodge challenges.`, (s) => s.stats.dodgeWins >= target),
      createBadge(`slingshot-${target / 2}`, `Won ${target / 2} slingshot challenges.`, (s) => s.stats.slingshotWins >= target / 2)
    );
  });

  [5, 15].forEach((target) => {
    list.push(
      createBadge(`flawless-${target}`, `Completed ${target} flawless levels.`, (s) => s.stats.flawlessLevels >= target)
    );
  });

  const baseBadges = list.slice(0, MAX_BADGES - 1);
  baseBadges.push({
    id: "final-shield-of-faith",
    name: "Shield of Faith",
    icon: "🛡️",
    accomplishment: "Completed the full Genesis-to-David quest and earned the Shield of Faith.",
    check: (s) => s.stats.levelsCompleted >= TOTAL_LEVELS && s.badges.length >= MAX_BADGES - 1 && hasAllDifficultyPasses(s)
  });

  return baseBadges;
}

function ensureAudio() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return;

  if (audioEngine.ctx && audioEngine.ctx.state !== "closed") return;
  if (audioEngine.ctx && audioEngine.ctx.state === "closed") {
    clearAudioNodes();
  }

  const ctx = new AudioCtor();
  const master = ctx.createGain();
  const musicGain = ctx.createGain();
  const sfxGain = ctx.createGain();
  const musicFilter = ctx.createBiquadFilter();
  const musicCompressor = ctx.createDynamicsCompressor();

  master.gain.value = 0.9;
  musicGain.gain.value = 0;
  sfxGain.gain.value = state.audio.sfx ? 0.30 : 0;

  musicFilter.type = "lowpass";
  musicFilter.frequency.value = 4200;
  musicFilter.Q.value = 0.28;

  musicCompressor.threshold.value = -24;
  musicCompressor.knee.value = 18;
  musicCompressor.ratio.value = 2.1;
  musicCompressor.attack.value = 0.01;
  musicCompressor.release.value = 0.3;

  musicGain.connect(musicFilter);
  musicFilter.connect(musicCompressor);
  musicCompressor.connect(master);
  sfxGain.connect(master);
  master.connect(ctx.destination);

  audioEngine.ctx = ctx;
  audioEngine.master = master;
  audioEngine.musicGain = musicGain;
  audioEngine.sfxGain = sfxGain;
  audioEngine.musicFilter = musicFilter;
  audioEngine.musicCompressor = musicCompressor;
  audioEngine.bootMusicHoldUntil = Date.now() + 500;
}

function setMusicGainSmooth(target, fadeSeconds = 0.55) {
  if (!audioEngine.ctx || !audioEngine.musicGain) return;
  const now = audioEngine.ctx.currentTime;
  const gainNode = audioEngine.musicGain.gain;
  const current = Number.isFinite(gainNode.value) ? gainNode.value : 0;
  const clampedTarget = Math.max(0, Math.min(1, Number(target) || 0));
  const baseFade = Math.max(0.08, fadeSeconds);
  const fade =
    clampedTarget > current && Date.now() < (audioEngine.bootMusicHoldUntil || 0)
      ? Math.max(baseFade, 1.1)
      : Math.max(baseFade, 0.2);
  gainNode.cancelScheduledValues(now);
  gainNode.setValueAtTime(current, now);
  gainNode.linearRampToValueAtTime(clampedTarget, now + fade);
}

function playTone(freq, duration = 0.12, type = "sine", volume = 0.2, channel = "sfx", startAt = null) {
  if (!audioEngine.ctx) return;
  if (channel === "sfx" && !state.audio.sfx) return;
  if (channel === "music" && !state.audio.music) return;

  const ctx = audioEngine.ctx;
  const when = typeof startAt === "number" ? Math.max(ctx.currentTime, startAt) : ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const out = channel === "music" ? audioEngine.musicGain : audioEngine.sfxGain;

  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.00012, volume), when + Math.min(0.024, duration * 0.16));
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);

  osc.connect(gain);
  gain.connect(out);
  osc.start(when);
  osc.stop(when + duration);
}

function playDrumPulse(kind, when, intensity = 1) {
  if (!audioEngine.ctx || !audioEngine.musicGain) return;
  if (!state.audio.music) return;

  const ctx = audioEngine.ctx;
  const beatTime = Math.max(ctx.currentTime, when);

  if (kind === "kick") {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(118, beatTime);
    osc.frequency.exponentialRampToValueAtTime(46, beatTime + 0.2);
    gain.gain.setValueAtTime(0.0001, beatTime);
    gain.gain.exponentialRampToValueAtTime(0.052 * intensity, beatTime + 0.014);
    gain.gain.exponentialRampToValueAtTime(0.0001, beatTime + 0.24);
    osc.connect(gain);
    gain.connect(audioEngine.musicGain);
    osc.start(beatTime);
    osc.stop(beatTime + 0.26);
    return;
  }

  if (kind === "snare") {
    playTone(174.61, 0.09, "triangle", 0.014 * intensity, "music", beatTime);
    playTone(659.25, 0.06, "triangle", 0.0038 * intensity, "music", beatTime);
    return;
  }

  playTone(1244.51, 0.032, "triangle", 0.0018 * intensity, "music", beatTime);
}

function playSfx(name) {
  if (!state.audio.sfx) return;
  ensureAudio();
  if (!audioEngine.ctx) return;
  if (audioEngine.ctx.state === "suspended") audioEngine.ctx.resume().catch(() => {});

  if (name === "click") {
    // 80s coin-op button press: punchy blip + quick arcade tail.
    playTone(1567.98, 0.012, "square", 0.16);
    setTimeout(() => playTone(1174.66, 0.014, "square", 0.14), 10);
    setTimeout(() => playTone(987.77, 0.015, "square", 0.12), 22);
    setTimeout(() => playTone(783.99, 0.016, "square", 0.1), 36);
    setTimeout(() => playTone(659.25, 0.012, "triangle", 0.07), 52);
  } else if (name === "stage-open") {
    // Stage entry stinger: SFX-forward and brief, with no background music under it.
    playTone(392.0, 0.04, "square", 0.14);
    setTimeout(() => playTone(523.25, 0.05, "square", 0.13), 34);
    setTimeout(() => playTone(659.25, 0.06, "triangle", 0.1), 72);
  } else if (name === "success") {
    playTone(523.25, 0.1, "triangle", 0.18);
    setTimeout(() => playTone(659.25, 0.12, "triangle", 0.18), 90);
  } else if (name === "fail") {
    playTone(185, 0.12, "square", 0.16);
    setTimeout(() => playTone(138.59, 0.12, "square", 0.14), 100);
  } else if (name === "hit") {
    playTone(740, 0.06, "triangle", 0.15);
  } else if (name === "life") {
    playTone(220, 0.08, "sawtooth", 0.14);
  } else {
    playTone(820, 0.034, "square", 0.08);
    setTimeout(() => playTone(620, 0.028, "square", 0.06), 20);
  }
}

function startMusicLoop() {
  ensureAudio();
  if (!audioEngine.ctx) return;
  if (!state.audio.music || state.activeStage || audioEngine.timer || audioEngine.finaleTimer || audioEngine.creditsTimer || isFinalOpen() || isCreditsOpen()) return;
  if (audioEngine.ctx.state === "suspended") audioEngine.ctx.resume().catch(() => {});

  const ctx = audioEngine.ctx;
  const style = resolvedMusicStyle();
  const profileByStyle = {
    cinematic: {
      suiteWindowMs: 46000,
      lookAheadSeconds: 0.36,
      tickMs: 80,
      offBeatFactor: 0.5,
      swellBase: 0.92,
      swellRange: 0.1,
      swellPeriodMs: 8200,
      motifShifts: [0, 0, -2, 0, 2, 0],
      rootWave: "triangle",
      colorWave: "sine",
      rootVol: 0.072,
      thirdVol: 0.046,
      fifthVol: 0.051,
      bassVol: 0.094,
      motifVol: 0.016,
      droneVol: 0.036,
      suites: [
        {
          beatMs: 730,
          progression: [
            { chord: [293.66, 349.23, 440.0], bass: 146.83 },
            { chord: [261.63, 329.63, 392.0], bass: 130.81 },
            { chord: [233.08, 293.66, 349.23], bass: 116.54 },
            { chord: [261.63, 329.63, 392.0], bass: 130.81 }
          ],
          motif: [440.0, 493.88, 523.25, 493.88]
        },
        {
          beatMs: 700,
          progression: [
            { chord: [220.0, 261.63, 329.63], bass: 110.0 },
            { chord: [196.0, 246.94, 293.66], bass: 98.0 },
            { chord: [174.61, 220.0, 261.63], bass: 87.31 },
            { chord: [196.0, 246.94, 293.66], bass: 98.0 }
          ],
          motif: [329.63, 349.23, 392.0, 349.23]
        },
        {
          beatMs: 760,
          progression: [
            { chord: [164.81, 207.65, 246.94], bass: 82.41 },
            { chord: [174.61, 220.0, 261.63], bass: 87.31 },
            { chord: [196.0, 246.94, 293.66], bass: 98.0 },
            { chord: [220.0, 261.63, 329.63], bass: 110.0 }
          ],
          motif: [293.66, 329.63, 349.23, 329.63]
        }
      ],
      drums: {
        kickEvery: 1,
        kickPower: 0.82,
        snareEvery: 4,
        snareOffset: 2,
        snarePower: 0.44,
        hatEvery: 2,
        hatOffset: 1,
        hatPower: 0.30
      }
    },
    energetic: {
      suiteWindowMs: 36000,
      lookAheadSeconds: 0.32,
      tickMs: 70,
      offBeatFactor: 0.5,
      swellBase: 0.95,
      swellRange: 0.11,
      swellPeriodMs: 6400,
      motifShifts: [0, 2, 0, -2],
      rootWave: "sine",
      colorWave: "triangle",
      rootVol: 0.078,
      thirdVol: 0.052,
      fifthVol: 0.058,
      bassVol: 0.102,
      motifVol: 0.022,
      droneVol: 0.038,
      suites: [
        {
          beatMs: 640,
          progression: [
            { chord: [293.66, 349.23, 440.0], bass: 146.83 },
            { chord: [261.63, 329.63, 392.0], bass: 130.81 },
            { chord: [233.08, 293.66, 349.23], bass: 116.54 },
            { chord: [261.63, 329.63, 392.0], bass: 130.81 }
          ],
          motif: [440.0, 493.88, 523.25, 587.33]
        },
        {
          beatMs: 620,
          progression: [
            { chord: [220.0, 261.63, 329.63], bass: 110.0 },
            { chord: [233.08, 293.66, 349.23], bass: 116.54 },
            { chord: [261.63, 329.63, 392.0], bass: 130.81 },
            { chord: [293.66, 349.23, 440.0], bass: 146.83 }
          ],
          motif: [349.23, 392.0, 440.0, 392.0]
        },
        {
          beatMs: 670,
          progression: [
            { chord: [196.0, 246.94, 293.66], bass: 98.0 },
            { chord: [220.0, 261.63, 329.63], bass: 110.0 },
            { chord: [246.94, 293.66, 369.99], bass: 123.47 },
            { chord: [261.63, 329.63, 392.0], bass: 130.81 }
          ],
          motif: [329.63, 349.23, 392.0, 440.0]
        }
      ],
      drums: {
        kickEvery: 1,
        kickPower: 0.9,
        snareEvery: 2,
        snareOffset: 1,
        snarePower: 0.52,
        hatEvery: 1,
        hatOffset: 0,
        hatPower: 0.36
      }
    }
  };
  const profile = profileByStyle[style] || profileByStyle.cinematic;
  const suiteWindowMs = profile.suiteWindowMs;
  const suites = profile.suites;

  if (!audioEngine.musicStartedAt) {
    audioEngine.musicStartedAt = Date.now();
  }
  stopMusicLoop();
  audioEngine.musicStartCtx = ctx.currentTime + 0.18;
  audioEngine.nextBeatAt = audioEngine.musicStartCtx;

  const scheduler = () => {
    if (!state.audio.music || state.activeStage || audioEngine.finaleTimer || audioEngine.creditsTimer || isFinalOpen() || isCreditsOpen()) {
      stopMusicLoop();
      return;
    }

    const lookAheadSeconds = profile.lookAheadSeconds;
    while (audioEngine.nextBeatAt < ctx.currentTime + lookAheadSeconds) {
      const elapsed = Math.max(0, (audioEngine.nextBeatAt - audioEngine.musicStartCtx) * 1000);
      const suiteIndex = Math.floor(elapsed / suiteWindowMs) % suites.length;
      const suite = suites[suiteIndex];
      const chordStep = suite.progression[audioEngine.step % suite.progression.length];
      const motif = suite.motif[audioEngine.step % suite.motif.length];
      const [root, third, fifth] = chordStep.chord;
      const swell = profile.swellBase + profile.swellRange * Math.sin(elapsed / profile.swellPeriodMs);
      const motifShift = profile.motifShifts[audioEngine.step % profile.motifShifts.length];
      const shiftedMotif = motif * Math.pow(2, motifShift / 12);
      const beatTime = audioEngine.nextBeatAt;
      const beatSeconds = suite.beatMs / 1000;
      const offBeatTime = beatTime + beatSeconds * profile.offBeatFactor;

      playTone(root, 0.62, profile.rootWave, profile.rootVol * swell, "music", beatTime);
      playTone(third, 0.56, profile.colorWave, profile.thirdVol * swell, "music", beatTime);
      playTone(fifth, 0.54, profile.colorWave, profile.fifthVol * swell, "music", beatTime);
      playTone(chordStep.bass, 0.78, "triangle", profile.bassVol * swell, "music", beatTime);
      playTone(shiftedMotif, 0.18, "triangle", profile.motifVol * swell, "music", offBeatTime);
      if (audioEngine.step % 4 === 0) {
        playTone(chordStep.bass / 2, beatSeconds * 1.6, "sine", profile.droneVol * swell, "music", beatTime);
      }

      if (audioEngine.step % profile.drums.kickEvery === 0) {
        playDrumPulse("kick", beatTime, profile.drums.kickPower);
      }
      if (audioEngine.step % profile.drums.snareEvery === profile.drums.snareOffset) {
        playDrumPulse("snare", beatTime, profile.drums.snarePower);
      }
      if (audioEngine.step % profile.drums.hatEvery === profile.drums.hatOffset) {
        playDrumPulse("hat", offBeatTime, profile.drums.hatPower);
      }

      audioEngine.step += 1;
      audioEngine.nextBeatAt += beatSeconds;
    }
  };

  scheduler();
  audioEngine.timer = window.setInterval(scheduler, profile.tickMs);
}

function stopMusicLoop() {
  if (audioEngine.timer) {
    clearInterval(audioEngine.timer);
    audioEngine.timer = null;
  }
  audioEngine.musicStartCtx = 0;
  audioEngine.nextBeatAt = 0;
  audioEngine.musicStartedAt = 0;
}


function stopFinaleMusic() {
  if (audioEngine.finaleTimer) {
    clearInterval(audioEngine.finaleTimer);
    audioEngine.finaleTimer = null;
  }

  if (audioEngine.finaleTimeouts.length) {
    audioEngine.finaleTimeouts.forEach((id) => clearTimeout(id));
    audioEngine.finaleTimeouts = [];
  }
}

function scheduleFinaleTone(delayMs, freq, duration, type, volume) {
  const id = window.setTimeout(() => {
    playTone(freq, duration, type, volume, "music");
  }, delayMs);
  audioEngine.finaleTimeouts.push(id);
}

function playFinaleMusic() {
  ensureAudio();
  if (!state.audio.music) return;
  if (audioEngine.ctx.state === "suspended") audioEngine.ctx.resume();

  stopMusicLoop();
  stopFinaleMusic();

  const burst = () => {
    scheduleFinaleTone(0, 261.63, 0.36, "triangle", 0.2);
    scheduleFinaleTone(0, 392.0, 0.36, "triangle", 0.17);
    scheduleFinaleTone(180, 329.63, 0.36, "triangle", 0.2);
    scheduleFinaleTone(180, 493.88, 0.36, "triangle", 0.17);
    scheduleFinaleTone(360, 392.0, 0.42, "sawtooth", 0.2);
    scheduleFinaleTone(360, 587.33, 0.42, "triangle", 0.16);
    scheduleFinaleTone(600, 523.25, 0.52, "sawtooth", 0.24);
    scheduleFinaleTone(600, 659.25, 0.52, "triangle", 0.2);

    scheduleFinaleTone(980, 196.0, 0.5, "sine", 0.17);
    scheduleFinaleTone(1160, 220.0, 0.46, "sine", 0.16);
    scheduleFinaleTone(1320, 246.94, 0.46, "sine", 0.16);
    scheduleFinaleTone(1500, 261.63, 0.68, "sine", 0.2);

    scheduleFinaleTone(1980, 392.0, 0.82, "triangle", 0.21);
    scheduleFinaleTone(1980, 523.25, 0.82, "triangle", 0.18);
    scheduleFinaleTone(1980, 659.25, 0.82, "triangle", 0.16);
  };

  burst();
  audioEngine.finaleTimer = window.setInterval(burst, 4300);
}

function stopCreditsMusic() {
  if (audioEngine.creditsTimer) {
    clearInterval(audioEngine.creditsTimer);
    audioEngine.creditsTimer = null;
  }

  if (audioEngine.creditsTimeouts.length) {
    audioEngine.creditsTimeouts.forEach((id) => clearTimeout(id));
    audioEngine.creditsTimeouts = [];
  }
}

function scheduleCreditsTone(delayMs, freq, duration, type, volume) {
  const id = window.setTimeout(() => {
    playTone(freq, duration, type, volume, "music");
  }, delayMs);
  audioEngine.creditsTimeouts.push(id);
}

function playCreditsMusic() {
  ensureAudio();
  if (!state.audio.music) return;
  if (audioEngine.ctx.state === "suspended") audioEngine.ctx.resume();

  stopMusicLoop();
  stopFinaleMusic();
  stopCreditsMusic();

  const passage = () => {
    scheduleCreditsTone(0, 196.0, 1.8, "sine", 0.11);
    scheduleCreditsTone(0, 293.66, 1.6, "triangle", 0.09);
    scheduleCreditsTone(260, 392.0, 1.5, "triangle", 0.08);

    scheduleCreditsTone(1280, 220.0, 1.7, "sine", 0.11);
    scheduleCreditsTone(1280, 329.63, 1.55, "triangle", 0.09);
    scheduleCreditsTone(1560, 440.0, 1.45, "triangle", 0.08);

    scheduleCreditsTone(2620, 246.94, 1.7, "sine", 0.11);
    scheduleCreditsTone(2620, 349.23, 1.55, "triangle", 0.09);
    scheduleCreditsTone(2890, 493.88, 1.45, "triangle", 0.08);

    scheduleCreditsTone(3960, 261.63, 2.0, "sine", 0.12);
    scheduleCreditsTone(3960, 392.0, 1.8, "triangle", 0.1);
    scheduleCreditsTone(4300, 523.25, 1.5, "triangle", 0.08);
  };

  passage();
  audioEngine.creditsTimer = window.setInterval(passage, 6200);
}

function parseStageId(stageId) {
  const match = stageId.match(/^l(\d+)-s(\d+)$/);
  if (!match) return null;
  return { level: Number(match[1]), stage: Number(match[2]) };
}

function getStageMeta(stageId) {
  return stages.find((stage) => stage.id === stageId);
}

function persist() {
  const fingerprint = JSON.stringify({
    unlocked: state.unlocked,
    completed: state.completed,
    xp: state.xp,
    lives: state.lives,
    badges: state.badges,
    audio: state.audio,
    levelFailures: state.levelFailures,
    stats: state.stats,
    lastBadge: state.lastBadge || "",
    playerName: state.playerName || "",
    finalSeen: state.finalSeen,
    difficulty: state.difficulty,
    questionHistory: state.questionHistory,
    stageActivities: state.stageActivities,
    language: state.language,
    dailyStrike: state.dailyStrike,
    activeStage: state.activeStage || "",
    lastStage: state.lastStage || "",
    contentVersion: CONTENT_VERSION
  });

  if (fingerprint === lastPersistFingerprint) return;
  lastPersistFingerprint = fingerprint;

  localStorage.setItem("faithUnlocked", String(state.unlocked));
  localStorage.setItem("faithCompleted", JSON.stringify(state.completed));
  localStorage.setItem("faithXp", String(state.xp));
  localStorage.setItem("faithLives", String(state.lives));
  localStorage.setItem("faithBadges", JSON.stringify(state.badges));
  localStorage.setItem("faithAudio", JSON.stringify(state.audio));
  localStorage.setItem("faithLevelFailures", JSON.stringify(state.levelFailures));
  localStorage.setItem("faithStats", JSON.stringify(state.stats));
  localStorage.setItem("faithLastBadge", state.lastBadge || "");
  localStorage.setItem("faithPlayerName", state.playerName || "");
  localStorage.setItem("faithFinalSeen", String(state.finalSeen));
  localStorage.setItem("faithDifficulty", state.difficulty);
  localStorage.setItem("faithQuestionHistory", JSON.stringify(state.questionHistory));
  localStorage.setItem("faithStageActivities", JSON.stringify(state.stageActivities));
  localStorage.setItem("faithLanguage", state.language);
  localStorage.setItem("faithDailyStrike", JSON.stringify(state.dailyStrike));
  localStorage.setItem("faithContentVersion", CONTENT_VERSION);

  if (state.activeStage) localStorage.setItem("faithActiveStage", state.activeStage);
  else localStorage.removeItem("faithActiveStage");

  if (state.lastStage) localStorage.setItem("faithLastStage", state.lastStage);
  else localStorage.removeItem("faithLastStage");
}

function isDone(id) {
  return state.completed.includes(id);
}

function countCompletedLevels() {
  let done = 0;
  for (let level = 1; level <= TOTAL_LEVELS; level += 1) {
    const complete = [1, 2, 3, 4, 5].every((stageNum) => isDone(`l${level}-s${stageNum}`));
    if (complete) done += 1;
  }
  return done;
}

function hasClaimedDailyStrikeToday() {
  return state.dailyStrike.lastClaimed === localDayKey();
}

function applyLanguageToDocument() {
  const langCode = SUPPORTED_LANGUAGES.includes(state.language) ? state.language : "en";
  document.documentElement.lang = langCode;
}

function dailyThoughtForToday() {
  const pool = DAILY_THOUGHTS_BY_LANGUAGE[state.language] || DAILY_THOUGHTS_BY_LANGUAGE.en;
  const today = localDayKey();
  const start = dayStartFromKey(today);
  const index = start ? Math.floor(start / 86400000) % pool.length : 0;
  return pool[Math.abs(index) % pool.length];
}

function renderDailyThought() {
  const item = dailyThoughtForToday();
  if (!item) return;

  if (dailyThoughtHeading) dailyThoughtHeading.textContent = t("dailyThoughtHeading");
  if (dailyThoughtRef) dailyThoughtRef.textContent = item.ref;
  if (dailyThoughtText) dailyThoughtText.textContent = item.thought;
  if (dailyPracticalText) dailyPracticalText.textContent = `${t("practicalPrefix")}: ${item.practical}`;
}

function updateHud() {
  applyLanguageToDocument();
  xpText.textContent = `${t("xpLabel")}: ${state.xp}`;
  livesText.textContent = `${t("livesLabel")}: ${state.lives}`;
  badgeText.textContent = state.lastBadge
    ? `${t("badgesLabel")}: ${state.badges.length}/${MAX_BADGES} | ${t("newLabel")}: ${state.lastBadge}`
    : `${t("badgesLabel")}: ${state.badges.length}/${MAX_BADGES}`;
  musicToggleBtn.textContent = `${t("musicLabel")}: ${state.audio.music ? t("onLabel") : t("offLabel")}`;
  sfxToggleBtn.textContent = `${t("sfxLabel")}: ${state.audio.sfx ? t("onLabel") : t("offLabel")}`;
  if (musicVolumeBtn) {
    musicVolumeBtn.textContent = `${t("musicVolumeLabel")}: ${volumeLabelFor(resolvedMusicLevel())}`;
  }
  if (musicStyleBtn) {
    musicStyleBtn.textContent = `${t("musicStyleLabel")}: ${musicStyleLabelFor(resolvedMusicStyle())}`;
  }

  const claimed = hasClaimedDailyStrikeToday();
  if (dailyStrikeText) {
    dailyStrikeText.textContent = `${t("dailyStrikeLabel")}: ${state.dailyStrike.count}`;
  }
  if (dailyStrikeBtn) {
    dailyStrikeBtn.disabled = claimed;
    dailyStrikeBtn.textContent = claimed ? t("dailyStrikeClaimed") : t("dailyStrikeButton");
  }

  if (languageSelect && languageSelect.value !== state.language) {
    languageSelect.value = state.language;
  }

  difficultyButtons.forEach((btn) => {
    const isActive = btn.dataset.difficulty === state.difficulty;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  if (shareLatestBadgeBtn) shareLatestBadgeBtn.disabled = state.badges.length === 0;
  if (openBadgeShieldBtn) {
    openBadgeShieldBtn.textContent = `${t("badgeShieldLabel")} (${state.badges.length}/${MAX_BADGES})`;
  }
  if (closeActivityBtn) closeActivityBtn.textContent = t("closeLabel");
  const activityHeading = document.querySelector("#activityOverlay .activity-shell-head h3");
  if (activityHeading) activityHeading.textContent = t("challengeLabel");
  renderDailyThought();
}

function setDifficulty(nextDifficulty) {
  const normalized = normalizeDifficulty(nextDifficulty);
  if (normalized === state.difficulty) return;

  state.difficulty = normalized;
  persist();
  updateHud();

  if (state.activeStage && getStageMeta(state.activeStage)) {
    openStage(state.activeStage);
  } else {
    render();
  }
}

function setLanguage(nextLanguage) {
  const normalized = normalizeLanguage(nextLanguage);
  if (normalized === state.language) return;

  state.language = normalized;
  preloadedNarrationEras.clear();
  preloadedNarrationAudio.length = 0;
  persist();
  render();

  if (activeStoryTheaterEra && isStoryTheaterOpen()) {
    openStoryTheater(activeStoryTheaterEra);
  }

  window.dispatchEvent(
    new CustomEvent("faith:language-changed", {
      detail: { language: state.language }
    })
  );
}

function cycleMusicLevel() {
  const order = ["low", "medium", "high"];
  const current = resolvedMusicLevel();
  const idx = order.indexOf(current);
  state.audio.musicLevel = order[(idx + 1) % order.length];
  ensureAudio();
  updateAudioState();
}

function cycleMusicStyle() {
  const order = ["cinematic", "energetic"];
  const current = resolvedMusicStyle();
  const idx = order.indexOf(current);
  state.audio.musicStyle = order[(idx + 1) % order.length];
  ensureAudio();
  updateAudioState();
}

function claimDailyStrike() {
  const today = localDayKey();
  if (state.dailyStrike.lastClaimed === today) {
    updateHud();
    window.dispatchEvent(
      new CustomEvent("faith:daily-strike", {
        detail: {
          day: today,
          count: state.dailyStrike.count,
          alreadyClaimed: true
        }
      })
    );
    return;
  }

  let nextCount = 1;
  const lastStart = dayStartFromKey(state.dailyStrike.lastClaimed);
  const todayStart = dayStartFromKey(today);
  if (lastStart && todayStart) {
    const dayGap = Math.round((todayStart - lastStart) / 86400000);
    if (dayGap === 1) nextCount = state.dailyStrike.count + 1;
  }

  state.dailyStrike.count = nextCount;
  state.dailyStrike.best = Math.max(state.dailyStrike.best, nextCount);
  state.dailyStrike.lastClaimed = today;
  persist();
  updateHud();
  window.dispatchEvent(
    new CustomEvent("faith:daily-strike", {
      detail: {
        day: today,
        count: state.dailyStrike.count,
        alreadyClaimed: false
      }
    })
  );
}

function getDifficultyBadgeById(id) {
  const difficultyId = DIFFICULTY_LEVELS.find((key) => DIFFICULTY_BADGE_META[key].id === id);
  if (!difficultyId) return null;
  return DIFFICULTY_BADGE_META[difficultyId];
}

function getBadgeById(id) {
  return badgeById.get(id) || getDifficultyBadgeById(id) || null;
}

function hasAllDifficultyPasses(sourceState = state) {
  return DIFFICULTY_LEVELS.every(
    (difficultyId) => Boolean(sourceState.stats && sourceState.stats.difficultyPass && sourceState.stats.difficultyPass[difficultyId])
  );
}

function markDifficultyPassForCurrentRun() {
  const difficultyId = normalizeDifficulty(state.difficulty);
  if (!DIFFICULTY_LEVELS.includes(difficultyId)) return false;
  if (!state.stats.difficultyPass || typeof state.stats.difficultyPass !== "object") {
    state.stats.difficultyPass = { easy: false, medium: false, advanced: false };
  }
  if (state.stats.difficultyPass[difficultyId]) return false;

  state.stats.difficultyPass[difficultyId] = true;
  const badge = DIFFICULTY_BADGE_META[difficultyId];
  if (badge) state.lastBadge = `${badge.icon} ${badge.name}`;
  return true;
}

function renderDifficultyBadgeRow() {
  if (!difficultyBadgeRow) return;
  difficultyBadgeRow.innerHTML = "";

  DIFFICULTY_LEVELS.forEach((difficultyId) => {
    const badge = DIFFICULTY_BADGE_META[difficultyId];
    const unlocked = Boolean(state.stats.difficultyPass && state.stats.difficultyPass[difficultyId]);

    const cell = document.createElement("article");
    cell.className = `difficulty-shield-badge ${unlocked ? "unlocked" : "locked"}`;
    cell.title = unlocked
      ? `${badge.icon} ${badge.name}`
      : `Locked: ${difficultyProfiles[difficultyId].label}`;

    const symbol = document.createElement("span");
    symbol.className = "badge-symbol";
    symbol.textContent = unlocked ? badge.icon : "◌";

    const name = document.createElement("span");
    name.className = "shield-name";
    name.textContent = unlocked ? badge.name : `${difficultyProfiles[difficultyId].label} Pending`;

    cell.append(symbol, name);
    difficultyBadgeRow.appendChild(cell);
  });
}

function badgeShareMessage(badge) {

  const accomplishment = badge.accomplishment || "Made progress in FAITHSHIELD.";
  return `I just earned the ${badge.icon || "🛡️"} ${badge.name} badge in FAITHSHIELD! ${accomplishment}`;
}

function renderBadgeGallery() {
  if (!badgeGrid) return;
  badgeGrid.innerHTML = "";

  if (!state.badges.length) {
    const empty = document.createElement("article");
    empty.className = "badge-card empty";
    empty.innerHTML = '<span class="badge-symbol">🛡️</span><h3>No badges yet</h3><p>Finish stages and skill challenges to collect Bible-symbol badges.</p>';
    badgeGrid.appendChild(empty);
    if (badgeHelper) badgeHelper.textContent = "Complete stages to earn Bible-symbol badges.";
    return;
  }

  if (badgeHelper) {
    badgeHelper.textContent = `You have earned ${state.badges.length} of ${MAX_BADGES} badges.`;
  }

  state.badges
    .slice()
    .reverse()
    .forEach((badgeId) => {
      const badge = getBadgeById(badgeId);
      if (!badge) return;

      const card = document.createElement("article");
      card.className = "badge-card";

      const symbol = document.createElement("span");
      symbol.className = "badge-symbol";
      symbol.textContent = badge.icon || "🛡️";

      const title = document.createElement("h3");
      title.textContent = badge.name;

      const line = document.createElement("p");
      line.textContent = badge.accomplishment || "Accomplishment unlocked.";

      const shareBtn = document.createElement("button");
      shareBtn.className = "ghost-btn";
      shareBtn.type = "button";
      shareBtn.textContent = "Share Badge";
      shareBtn.addEventListener("click", () => openShareOverlay(badge.id));

      card.append(symbol, title, line, shareBtn);
      badgeGrid.appendChild(card);
    });
}

function renderBadgeShield() {
  if (!badgeShieldGrid) return;
  badgeShieldGrid.innerHTML = "";

  if (badgeShieldProgress) {
    const difficultyEarned = DIFFICULTY_LEVELS.filter((difficultyId) => state.stats.difficultyPass && state.stats.difficultyPass[difficultyId]).length;
    const baseBadgeCount = Math.max(0, state.badges.filter((badgeId) => badgeId !== "final-shield-of-faith").length);
    const finalShieldUnlocked = state.badges.includes("final-shield-of-faith");
    const finalShieldStatus = finalShieldUnlocked
      ? "Final Shield earned"
      : "Final Shield unlocks after 39 badges and all 3 difficulty seals";
    badgeShieldProgress.textContent =
      `${baseBadgeCount}/${MAX_BADGES - 1} core badges earned | Difficulty seals ${difficultyEarned}/3 | ${finalShieldStatus}`;
  }

  renderDifficultyBadgeRow();

  badgeCatalog.forEach((badge) => {
    const unlocked = state.badges.includes(badge.id);

    const cell = document.createElement("article");
    cell.className = `shield-badge ${unlocked ? "unlocked" : "locked"}`;
    cell.title = unlocked ? `${badge.icon || "🛡️"} ${badge.name}` : "Locked";

    const symbol = document.createElement("span");
    symbol.className = "badge-symbol";
    symbol.textContent = unlocked ? badge.icon || "🛡️" : "◌";

    const name = document.createElement("span");
    name.className = "shield-name";
    name.textContent = unlocked ? badge.name : "Locked";

    cell.append(symbol, name);
    badgeShieldGrid.appendChild(cell);
  });
}

function openBadgeShield() {
  if (!badgeShieldOverlay) return;
  renderBadgeShield();
  badgeShieldOverlay.classList.remove("hidden");
  if (badgeShieldOverlay.scrollTo) badgeShieldOverlay.scrollTo({ top: 0, behavior: "auto" });
  updateOverlayLock();
}

function closeBadgeShield() {
  if (!badgeShieldOverlay) return;
  badgeShieldOverlay.classList.add("hidden");
  updateOverlayLock();
}

function currentShareBadge() {

  return getBadgeById(activeShareBadgeId) || getBadgeById(state.badges[state.badges.length - 1]);
}

function openShareOverlay(badgeId) {
  const badge = getBadgeById(badgeId) || getBadgeById(state.badges[state.badges.length - 1]);
  if (!badge || !shareOverlay) return;

  activeShareBadgeId = badge.id;
  if (shareBadgeTitle) shareBadgeTitle.textContent = `${badge.icon || "🛡️"} ${badge.name}`;
  if (shareBadgeText) shareBadgeText.textContent = badgeShareMessage(badge);

  shareOverlay.classList.remove("hidden");
  updateOverlayLock();
}

function closeShareOverlay() {
  if (!shareOverlay) return;
  shareOverlay.classList.add("hidden");
  updateOverlayLock();
}

function shareViaText() {
  const badge = currentShareBadge();
  if (!badge) return;
  const text = encodeURIComponent(badgeShareMessage(badge));
  window.location.href = `sms:&body=${text}`;
}

function shareViaEmail() {
  const badge = currentShareBadge();
  if (!badge) return;
  const subject = encodeURIComponent("My FAITHSHIELD badge accomplishment");
  const body = encodeURIComponent(badgeShareMessage(badge));
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function shareViaSocial() {
  const badge = currentShareBadge();
  if (!badge) return;
  const text = badgeShareMessage(badge);

  if (navigator.share) {
    navigator.share({ title: "FAITHSHIELD Badge", text }).catch(() => {});
    return;
  }

  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function copyShareText() {
  const badge = currentShareBadge();
  if (!badge) return;
  const text = badgeShareMessage(badge);

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      if (shareBadgeText) shareBadgeText.textContent = `${text} (Copied)`;
    });
    return;
  }

  window.prompt("Copy your accomplishment text:", text);
}

function isFinalOpen() {
  return finalOverlay && !finalOverlay.classList.contains("hidden");
}

function isCreditsOpen() {
  return creditsOverlay && !creditsOverlay.classList.contains("hidden");
}

function restartCreditsCrawl() {
  if (!creditsCrawlTrack) return;
  creditsCrawlTrack.classList.remove("run");
  void creditsCrawlTrack.offsetWidth;
  creditsCrawlTrack.classList.add("run");
}

function showCreditsOverlay() {
  if (!creditsOverlay) return;
  if (finalOverlay) finalOverlay.classList.add("hidden");
  stopFinaleMusic();
  creditsOverlay.classList.remove("hidden");
  restartCreditsCrawl();
  updateOverlayLock();
  playCreditsMusic();
}

function hideCreditsOverlay() {
  if (!creditsOverlay) return;
  creditsOverlay.classList.add("hidden");
  stopCreditsMusic();
  updateOverlayLock();
  if (state.audio.music) {
    if (isFinalOpen()) playFinaleMusic();
    else startMusicLoop();
  }
}

function displayPlayerName() {
  return normalizePlayerName(state.playerName) || "Faith Player";
}

function updateFinalCertificate() {
  const name = displayPlayerName();
  const difficultyEarned = DIFFICULTY_LEVELS.filter((difficultyId) => state.stats.difficultyPass && state.stats.difficultyPass[difficultyId]).length;
  const completedAllDifficulties = hasAllDifficultyPasses();
  if (finalHeading) finalHeading.textContent = `Congratulations, ${name}!`;
  if (finalMessage) {
    finalMessage.textContent = completedAllDifficulties
      ? `Your time was not wasted in building your faith, ${name}. You completed the full Genesis-to-David journey and finished the Shield of Progress across Easy, Medium, and Advanced.`
      : `Your progress is strong, ${name}. Complete Easy, Medium, and Advanced to finish the full Shield of Progress and unlock the final certificate. Difficulty seals earned: ${difficultyEarned}/3.`;
  }
  if (certificateName) certificateName.textContent = name;
  if (certificateDate) {
    const stamp = new Date();
    certificateDate.textContent = `Awarded ${stamp.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}`;
  }
}

function isStoryTheaterOpen() {
  return storyTheaterOverlay && !storyTheaterOverlay.classList.contains("hidden");
}

function showFinalOverlay() {
  if (!finalOverlay) return;
  if (creditsOverlay) creditsOverlay.classList.add("hidden");
  stopCreditsMusic();
  updateFinalCertificate();
  finalOverlay.classList.remove("hidden");
  updateOverlayLock();
  playFinaleMusic();
}

function hideFinalOverlay() {
  if (!finalOverlay) return;
  finalOverlay.classList.add("hidden");
  updateOverlayLock();
  stopFinaleMusic();
  if (state.audio.music) startMusicLoop();
}

function maybeShowCompletionFinale() {
  const completedAll = state.completed.length >= TOTAL_STAGES;
  const completedAllDifficulties = hasAllDifficultyPasses();

  if (completedAll && completedAllDifficulties && !state.finalSeen) {
    state.finalSeen = true;
    persist();
    showFinalOverlay();
    return;
  }

  if (completedAll && completedAllDifficulties && state.finalSeen && isFinalOpen()) {
    playFinaleMusic();
  }
}

function awardXp(amount) {
  state.xp += amount;
}

function canPlayStage() {
  return state.lives > 0;
}

function loseLife() {
  state.lives = Math.max(0, state.lives - 1);
  const parsed = parseStageId(state.activeStage || "");
  if (parsed) state.levelFailures[String(parsed.level)] = true;

  const activeStageId = state.activeStage || "";
  const activeActivity = state.stageActivities[state.difficulty + ":" + activeStageId];
  const activityType = activeActivity && activeActivity.type
    ? (activeActivity.type === "interactive" && activeActivity.mode && activeActivity.mode.engine
      ? activeActivity.mode.engine
      : activeActivity.type)
    : "general";

  playSfx("life");
  persist();
  updateHud();

  window.dispatchEvent(
    new CustomEvent("faith:life-lost", {
      detail: {
        stageId: activeStageId,
        activityType,
        lives: state.lives
      }
    })
  );

  return state.lives > 0;
}

function clearActiveChallenge() {
  if (typeof activeCleanup === "function") {
    activeCleanup();
    activeCleanup = null;
  }

  if (typeof activeCutsceneCleanup === "function") {
    activeCutsceneCleanup();
    activeCutsceneCleanup = null;
  }
}

function updateOverlayLock() {
  const activityOpen = activityOverlay && !activityOverlay.classList.contains("hidden");
  const welcomeOpen = welcomeOverlay && !welcomeOverlay.classList.contains("hidden");
  const shareOpen = shareOverlay && !shareOverlay.classList.contains("hidden");
  const shieldOpen = badgeShieldOverlay && !badgeShieldOverlay.classList.contains("hidden");
  const finalOpen = finalOverlay && !finalOverlay.classList.contains("hidden");
  const creditsOpen = creditsOverlay && !creditsOverlay.classList.contains("hidden");
  const theaterOpen = storyTheaterOverlay && !storyTheaterOverlay.classList.contains("hidden");
  document.body.classList.toggle("has-overlay", Boolean(activityOpen || welcomeOpen || shareOpen || shieldOpen || finalOpen || creditsOpen || theaterOpen));

}

function dismissWelcome() {
  if (!welcomeOverlay) return;
  welcomeOverlay.classList.add("hidden");
  updateOverlayLock();
}

function closeActivity() {
  clearActiveChallenge();
  if (document.activeElement && typeof document.activeElement.blur === "function") {
    document.activeElement.blur();
  }
  state.activeStage = null;
  persist();
  activityPanel.innerHTML = "";
  activityOverlay.classList.add("hidden");
  trimPreloadedMediaCaches();
  updateOverlayLock();
  flushQueuedHubReturn();

  updateAudioState();
}

function queueStageAutoClose(stageId, delayMs = 850) {
  window.setTimeout(() => {
    if (state.activeStage === stageId) closeActivity();
  }, delayMs);
}

function isDesktopViewport() {
  return currentViewportWidth() >= 980;
}

function queueHubReturn(targetId = "storyPathHeading") {
  pendingHubReturnTargetId = targetId;
}

function flushQueuedHubReturn() {
  const targetId = pendingHubReturnTargetId;
  pendingHubReturnTargetId = null;
  if (!targetId || !isDesktopViewport()) return;

  const target = document.getElementById(targetId)
    || storyPathHeading
    || gameDashboard
    || document.querySelector(".progress-wrap");
  if (!target) return;

  window.requestAnimationFrame(() => {
    target.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
  });
}

function completeStage(meta, mode, options = {}) {
  // Keep player at current scroll position unless an explicit return target is requested.
  if (options.returnTarget) queueHubReturn(options.returnTarget);
  markDone(meta.id, mode);
  queueStageAutoClose(meta.id, options.delayMs || 850);
}

function maybeAwardBadges() {
  const unlocked = [];
  badgeCatalog.forEach((badge) => {
    if (!state.badges.includes(badge.id) && badge.check(state)) {
      state.badges.push(badge.id);
      unlocked.push({
        id: badge.id,
        name: badge.name,
        icon: badge.icon || "🛡️",
        accomplishment: badge.accomplishment || ""
      });
    }
  });

  if (unlocked.length) {
    const finalBadge = unlocked.find((badge) => badge.id === "final-shield-of-faith");
    if (finalBadge) {
      state.lastBadge = `${finalBadge.icon} ${finalBadge.name} unlocked. Use your knowledge for good.`;
    } else {
      state.lastBadge = `${unlocked[0].icon} ${unlocked[0].name}`;
    }
    playSfx("success");
  }

  return unlocked;
}

function recordLevelCompletionIfNeeded(level) {
  const levelDone = [1, 2, 3, 4, 5].every((stageNum) => isDone(`l${level}-s${stageNum}`));
  if (!levelDone) return;

  const completedLevels = countCompletedLevels();
  state.stats.levelsCompleted = completedLevels;

  let flawless = 0;
  for (let lv = 1; lv <= TOTAL_LEVELS; lv += 1) {
    const done = [1, 2, 3, 4, 5].every((stageNum) => isDone(`l${lv}-s${stageNum}`));
    if (done && !state.levelFailures[String(lv)]) flawless += 1;
  }
  state.stats.flawlessLevels = flawless;
}

function markDone(stageId, mode) {
  const unlockedDifficultyBadge = markDifficultyPassForCurrentRun();
  const modeEngine = mode && mode.engine ? mode.engine : "question";

  if (isDone(stageId)) {
    if (unlockedDifficultyBadge) playSfx("success");
    maybeAwardBadges();
    persist();
    render();
    window.dispatchEvent(
      new CustomEvent("faith:stage-complete", {
        detail: {
          stageId,
          modeEngine,
          replay: true,
          difficulty: state.difficulty
        }
      })
    );
    return;
  }

  state.completed.push(stageId);
  const index = stages.findIndex((s) => s.id === stageId);
  state.unlocked = Math.max(state.unlocked, index + 2);
  state.stats.stagesCompleted = state.completed.length;

  if (mode && mode.engine) {
    awardXp(XP_INTERACTIVE_CLEAR);
    state.stats.interactiveWins += 1;
    if (mode.engine === "timing") state.stats.timingWins += 1;
    if (mode.engine === "collect") state.stats.collectWins += 1;
    if (mode.engine === "dodge") state.stats.dodgeWins += 1;
    if (mode.engine === "slingshot") state.stats.slingshotWins += 1;
  } else {
    awardXp(XP_STAGE_CLEAR);
  }

  const parsed = parseStageId(stageId);
  if (parsed) recordLevelCompletionIfNeeded(parsed.level);

  const unlockedBadges = maybeAwardBadges();
  if (unlockedDifficultyBadge && !unlockedBadges.length) playSfx("success");
  persist();
  render();
  window.dispatchEvent(
    new CustomEvent("faith:stage-complete", {
      detail: {
        stageId,
        modeEngine,
        replay: false,
        difficulty: state.difficulty
      }
    })
  );
}

function resetProgress() {
  clearActiveChallenge();
  state.unlocked = 1;
  state.completed = [];
  state.xp = 0;
  state.lives = MAX_LIVES;
  state.badges = [];
  state.levelFailures = {};
  state.stats = {
    levelsCompleted: 0,
    stagesCompleted: 0,
    interactiveWins: 0,
    timingWins: 0,
    collectWins: 0,
    dodgeWins: 0,
    slingshotWins: 0,
    flawlessLevels: 0,
    difficultyPass: { easy: false, medium: false, advanced: false }
  };
  state.activeStage = null;
  state.lastStage = null;
  state.lastBadge = "";
  state.finalSeen = false;
  state.questionHistory = {};
  state.stageActivities = {};

  stopFinaleMusic();
  stopCreditsMusic();
  closeShareOverlay();
  closeBadgeShield();
  if (finalOverlay) finalOverlay.classList.add("hidden");
  if (creditsOverlay) creditsOverlay.classList.add("hidden");


  closeActivity();
  persist();
  render();
}

function itemSignature(item) {
  if (item && typeof item.prompt === "string") return item.prompt;
  if (item && Array.isArray(item.items)) return item.items.join(" | ");
  if (item && Array.isArray(item.parts)) return item.parts.join(" ");
  return JSON.stringify(item);
}

function historyKeyForItem(item, bucket = "item") {
  const source = normalizeSourceRef(item && item.sourceRef);
  const signature = itemSignature(item);
  if (source) return `${source}::${bucket}::${signature}`;
  return `${bucket}::${signature}`;
}


function normalizeSourceRef(sourceRef) {
  return String(sourceRef || "").trim();
}

function parseSourceRefSegments(sourceRef) {
  const clauses = normalizeSourceRef(sourceRef).split(";").map((part) => part.trim()).filter(Boolean);
  const entries = [];
  let activeBook = "";

  clauses.forEach((clause) => {
    let book = activeBook;
    let remainder = clause;
    const explicitBook = SORTED_CANONICAL_BOOKS.find((candidate) => clause.startsWith(candidate + " "));
    if (explicitBook) {
      book = explicitBook;
      activeBook = explicitBook;
      remainder = clause.slice(explicitBook.length).trim();
    }

    const match = remainder.match(/^(\d+):\d+(?:-(?:(\d+):)?\d+)?/);
    if (!book || !match) return;

    const startChapter = Number(match[1]);
    const endChapter = match[2] ? Number(match[2]) : startChapter;
    entries.push({ book, startChapter, endChapter });
  });

  return entries;
}

function referenceEntriesFromSourceRef(sourceRef) {
  const clauses = normalizeSourceRef(sourceRef).split(";").map((part) => part.trim()).filter(Boolean);
  const entries = [];
  let activeBook = "";

  clauses.forEach((clause) => {
    let book = activeBook;
    let remainder = clause;
    const explicitBook = SORTED_CANONICAL_BOOKS.find((candidate) => clause.startsWith(candidate + " "));
    if (explicitBook) {
      book = explicitBook;
      activeBook = explicitBook;
      remainder = clause.slice(explicitBook.length).trim();
    }

    const match = remainder.match(/^(\d+):(\d+)/);
    if (!book || !match) return;

    const chapter = Number(match[1]);
    const verse = Number(match[2]);
    entries.push({
      book,
      chapter,
      verse,
      ref: `${book} ${chapter}:${verse}`
    });
  });

  return entries;
}

function entryMatchesPlan(entry, plan) {
  return plan.some((segment) => segment.book === entry.book && entry.chapter >= segment.start && entry.chapter <= segment.end);
}

function sourceRefMatchesPlan(sourceRef, plan) {
  const entries = parseSourceRefSegments(sourceRef);
  if (!entries.length || !plan.length) return false;
  return entries.some((entry) => plan.some((segment) => segment.book === entry.book && entry.endChapter >= segment.start && entry.startChapter <= segment.end));
}

function itemMatchesTheme(item, theme) {
  const plan = themeReferencePlan(theme);
  const sourceRef = normalizeSourceRef(item && item.sourceRef);
  if (!plan.length) return item && item.era === theme.era;
  if (!sourceRef) return item && item.era === theme.era;
  return sourceRefMatchesPlan(sourceRef, plan);
}

function themeScopeKey(theme, bucket) {
  return `${bucket}:theme:${theme.name}`;
}

function usedQuestionSourcesForDifficulty(difficultyId = state.difficulty) {
  const used = new Set();

  Object.values(state.stageActivities || {}).forEach((activity) => {
    if (!activity || !QUESTION_ACTIVITY_TYPES.has(activity.type)) return;
    const sourceRef = normalizeSourceRef(activity.historySourceRef || activity.sourceRef);
    if (!sourceRef) return;
    used.add(sourceRef);
  });

  return used;
}

function randomOf(list) {
  if (!list.length) return null;
  return list[Math.floor(Math.random() * list.length)];
}

function eraStoryLabel(era) {
  return ERA_STORY_LABELS[era] || "the Bible journey";
}

function buildBookOptions(answerBook, optionCount) {
  const total = Math.max(2, Math.min(4, optionCount || 3));
  const distractors = shuffled(BOOK_OPTIONS.filter((book) => book !== answerBook)).slice(0, total - 1);
  return shuffled([answerBook].concat(distractors));
}

function sortReferencesByCanon(entries) {
  return entries.slice().sort((a, b) => {
    const bookA = CANONICAL_BOOK_ORDER[a.book] || 999;
    const bookB = CANONICAL_BOOK_ORDER[b.book] || 999;
    if (bookA !== bookB) return bookA - bookB;
    if (a.chapter !== b.chapter) return a.chapter - b.chapter;
    return a.verse - b.verse;
  });
}

function buildFallbackReferencePools() {
  const pools = {};

  Object.entries(REFERENCE_VERSES_BY_BUCKET).forEach(([bucket, verses]) => {
    const byEra = {};
    const all = [];

    Object.entries(REFERENCE_PLAN_BY_ERA).forEach(([era, segments]) => {
      const eraRefs = [];

      segments.forEach((segment) => {
        for (let chapter = segment.start; chapter <= segment.end; chapter += 1) {
          verses.forEach((verse) => {
            const ref = `${segment.book} ${chapter}:${verse}`;
            const entry = {
              era,
              book: segment.book,
              chapter,
              verse,
              ref
            };
            eraRefs.push(entry);
            all.push(entry);
          });
        }
      });

      byEra[era] = eraRefs;
    });

    pools[bucket] = { byEra, all };
  });

  return pools;
}

const themeFallbackReferencePoolCache = {};

function authoredReferenceEntriesForTheme(theme) {
  const seen = new Set();
  const entries = [];
  const pools = [
    quizBank,
    mediumQuizBank,
    advancedQuizBank,
    spellingBank,
    mediumSpellingBank,
    advancedSpellingBank,
    orderBank,
    mediumOrderBank,
    advancedOrderBank,
    factBank,
    mediumFactBank,
    advancedFactBank
  ];

  pools.forEach((pool) => {
    pool.forEach((item) => {
      if (!itemMatchesTheme(item, theme)) return;
      referenceEntriesFromSourceRef(item.sourceRef).forEach((entry) => {
        if (seen.has(entry.ref)) return;
        seen.add(entry.ref);
        entries.push(entry);
      });
    });
  });

  return sortReferencesByCanon(entries);
}

function fallbackReferencePoolForTheme(theme, bucket) {
  const key = `${theme.name}:${bucket}`;
  if (themeFallbackReferencePoolCache[key]) return themeFallbackReferencePoolCache[key];

  let pool = authoredReferenceEntriesForTheme(theme);

  if (!pool.length) {
    const verses = REFERENCE_VERSES_BY_BUCKET[bucket] || REFERENCE_VERSES_BY_BUCKET.quiz;
    pool = [];
    themeReferencePlan(theme).forEach((segment) => {
      for (let chapter = segment.start; chapter <= segment.end; chapter += 1) {
        verses.forEach((verse) => {
          pool.push({
            era: theme.era,
            theme: theme.name,
            book: segment.book,
            chapter,
            verse,
            ref: `${segment.book} ${chapter}:${verse}`
          });
        });
      }
    });
  }

  themeFallbackReferencePoolCache[key] = pool;
  return pool;
}

function nextFallbackReference(theme, bucket, usedSources) {
  const themePool = fallbackReferencePoolForTheme(theme, bucket).filter((entry) => !usedSources.has(entry.ref));
  if (themePool.length) return randomOf(themePool);

  const pool = FALLBACK_REFERENCE_POOLS[bucket] || FALLBACK_REFERENCE_POOLS.quiz;
  const eraPool = (pool.byEra[theme.era] || []).filter((entry) => !usedSources.has(entry.ref));
  const globalPool = pool.all.filter((entry) => !usedSources.has(entry.ref));
  return randomOf(eraPool.length ? eraPool : globalPool);
}

function nextFallbackReferenceSet(theme, bucket, usedSources, count) {
  const pool = FALLBACK_REFERENCE_POOLS[bucket] || FALLBACK_REFERENCE_POOLS.order;
  let candidates = fallbackReferencePoolForTheme(theme, bucket).filter((entry) => !usedSources.has(entry.ref));
  if (candidates.length < count) candidates = (pool.byEra[theme.era] || []).filter((entry) => !usedSources.has(entry.ref));
  if (candidates.length < count) candidates = pool.all.filter((entry) => !usedSources.has(entry.ref));
  if (candidates.length < count) return null;

  for (let attempt = 0; attempt < 80; attempt += 1) {
    const picks = sortReferencesByCanon(shuffled(candidates).slice(0, count));
    const combo = picks.map((entry) => entry.ref).join("; ");
    if (!usedSources.has(combo)) return picks;
  }

  return null;
}

function buildFallbackQuizActivity(meta, theme, difficulty, usedSources) {
  const themeFilter = (item) => itemMatchesTheme(item, theme);
  const scopeKey = themeScopeKey(theme, "quiz");
  const quizPool = ALL_QUIZ_BANKS;
  const scopedQuizPool = quizPool.filter(themeFilter);
  const pick = pickWithoutRepeat(quizPool, theme.era, "quiz", {
    usedSources,
    allowReuse: false,
    filter: themeFilter,
    scopeKey,
    requireScoped: true
  });
  if (!pick.item) return null;

  const question = pick.item;
  return {
    type: "quiz",
    prompt: stagePrompt(meta, question.prompt, pick.reuseCount),
    options: buildQuizOptions(question, theme.era, difficulty.quizOptions, scopedQuizPool.length ? scopedQuizPool : quizPool),
    answer: question.answer,
    sourceRef: question.sourceRef,
    historySourceRef: question.historySourceRef || historyKeyForItem(question, "quiz")
  };
}

function buildFallbackSpellingActivity(meta, theme, difficulty, usedSources) {
  const themeFilter = (item) => itemMatchesTheme(item, theme);
  const scopeKey = themeScopeKey(theme, "spelling");
  const verseFillPool = derivedSpellingPoolForTheme(theme);
  const authoredPool = ALL_SPELLING_BANKS.filter(themeFilter);
  const pool = verseFillPool.length ? verseFillPool.concat(authoredPool) : authoredPool;
  const pick = pickWithoutRepeat(pool, theme.era, "spelling", {
    usedSources,
    allowReuse: false,
    filter: themeFilter,
    scopeKey,
    requireScoped: true
  });
  if (!pick.item) return null;

  return {
    type: "spelling",
    prompt: stagePrompt(meta, pick.item.prompt, pick.reuseCount),
    clue: pick.item.clue || "",
    answer: pick.item.answer,
    sourceRef: pick.item.sourceRef,
    historySourceRef: pick.item.historySourceRef || historyKeyForItem(pick.item, "spelling")
  };
}

function buildFallbackOrderActivity(meta, theme, difficulty, usedSources) {
  const themeFilter = (item) => itemMatchesTheme(item, theme);
  const scopeKey = themeScopeKey(theme, "order");
  const orderPool = ALL_ORDER_BANKS;
  const pick = pickWithoutRepeat(orderPool, theme.era, "order", {
    usedSources,
    allowReuse: false,
    filter: themeFilter,
    scopeKey,
    requireScoped: true
  });
  if (!pick.item) return null;

  return {
    type: "order",
    prompt: stagePrompt(meta, pick.item.prompt || challengeCopy("Put these Bible events in order.", "Pon estos eventos bíblicos en orden."), pick.reuseCount),
    items: pick.item.items.slice(),
    maxMoves: difficulty.orderMaxMoves,
    nearShuffle: difficulty.orderNearShuffle,
    sourceRef: pick.item.sourceRef,
    historySourceRef: pick.item.historySourceRef || historyKeyForItem(pick.item, "order")
  };
}

function buildFallbackFactActivity(meta, theme, difficulty, usedSources) {
  const themeFilter = (item) => itemMatchesTheme(item, theme);
  const scopeKey = themeScopeKey(theme, "fact");
  const factPool = ALL_FACT_BANKS;
  const pick = pickWithoutRepeat(factPool, theme.era, "fact", {
    usedSources,
    allowReuse: false,
    filter: themeFilter,
    scopeKey,
    requireScoped: true
  });
  if (!pick.item) return null;

  const factMode = buildFactActivity(pick.item, theme.era, difficulty);
  return {
    type: "fact",
    prompt: stagePrompt(meta, challengeCopy("Build this Bible truth in the right order.", "Construye esta verdad bíblica en el orden correcto."), pick.reuseCount),
    answerParts: factMode.answerParts,
    prefilled: factMode.prefilled,
    parts: factMode.pool,
    sourceRef: pick.item.sourceRef,
    historySourceRef: pick.item.historySourceRef || historyKeyForItem(pick.item, "fact")
  };
}

function buildTrueFalseActivity(meta, theme, usedSources) {
  const themeFilter = (item) => itemMatchesTheme(item, theme);
  const scopeKey = themeScopeKey(theme, "truefalse");
  const quizPool = ALL_QUIZ_BANKS;
  const pick = pickWithoutRepeat(quizPool, theme.era, "truefalse", {
    usedSources,
    allowReuse: false,
    filter: themeFilter,
    scopeKey,
    requireScoped: true
  });
  if (!pick.item) return null;

  const question = pick.item;
  const falseAnswer = buildFalseAnswer(question);
  if (!falseAnswer) return null;

  const answerIsTrue = (meta.level + meta.stage + question.answer.length) % 2 === 0;
  return {
    type: "truefalse",
    prompt: stagePrompt(meta, challengeCopy("True or false: test the claim against the clue.", "Verdadero o falso: prueba la afirmación con la pista."), pick.reuseCount),
    statement: clueTextFromPrompt(question.prompt),
    claim: answerIsTrue ? question.answer : falseAnswer,
    answer: answerIsTrue,
    sourceRef: question.sourceRef,
    historySourceRef: question.historySourceRef || historyKeyForItem(question, "truefalse")
  };
}

function buildMatchingActivity(meta, theme, usedSources) {
  const themeFilter = (item) => itemMatchesTheme(item, theme);
  const scopeKey = themeScopeKey(theme, "matching");
  const quizPool = ALL_QUIZ_BANKS;
  const scopedPool = quizPool.filter(themeFilter);
  const desiredCount = scopedPool.length >= 3 ? 3 : 2;
  const pick = pickManyWithoutRepeat(quizPool, theme.era, "matching", desiredCount, {
    usedSources,
    allowReuse: false,
    filter: themeFilter,
    scopeKey,
    requireScoped: true
  });
  if (!pick.items || pick.items.length < 2) return null;

  const pairs = pick.items.map((item, index) => ({
    id: `${meta.id}-match-${index + 1}`,
    left: clueTextFromPrompt(item.prompt),
    right: item.answer
  }));

  return {
    type: "matching",
    prompt: stagePrompt(meta, challengeCopy("Match each Bible clue to the correct answer.", "Relaciona cada pista bíblica con la respuesta correcta."), pick.reuseCount),
    pairs,
    options: shuffled(pairs.map((pair) => pair.right)),
    sourceRef: pick.items.map((item) => item.sourceRef).join("; "),
    historySourceRef: pick.items.map((item) => item.historySourceRef || historyKeyForItem(item, "matching")).join(" || ")
  };
}

function buildAuthoredActivityByKind(meta, theme, difficulty, usedSources, kind) {
  const themeFilter = (item) => itemMatchesTheme(item, theme);
  const scopeKey = themeScopeKey(theme, kind);

  if (kind === "quiz") {
    const quizSource = difficulty.id === "advanced" ? advancedQuizBank : difficulty.id === "medium" ? mediumQuizBank : quizBank;
    const scopedQuizSource = quizSource.filter(themeFilter);
    const pick = pickWithoutRepeat(quizSource, theme.era, "quiz", {
      usedSources,
      allowReuse: false,
      filter: themeFilter,
      scopeKey,
      requireScoped: true
    });
    if (!pick.item) return null;
    const q = pick.item;
    return {
      type: "quiz",
      prompt: stagePrompt(meta, q.prompt, pick.reuseCount),
      options: buildQuizOptions(q, theme.era, difficulty.quizOptions, scopedQuizSource.length ? scopedQuizSource : quizSource),
      answer: q.answer,
      sourceRef: q.sourceRef,
      historySourceRef: q.historySourceRef || historyKeyForItem(q, "quiz")
    };
  }

  if (kind === "spelling") {
    const authoredSpellingSource = difficulty.id === "advanced" ? advancedSpellingBank : difficulty.id === "medium" ? mediumSpellingBank : spellingBank;
    const spellingSource = derivedSpellingPoolForTheme(theme).concat(authoredSpellingSource.filter(themeFilter));
    const pick = pickWithoutRepeat(spellingSource, theme.era, "spelling", {
      usedSources,
      allowReuse: false,
      filter: themeFilter,
      scopeKey,
      requireScoped: true
    });
    if (!pick.item) return null;
    const s = pick.item;
    return {
      type: "spelling",
      prompt: stagePrompt(meta, s.prompt, pick.reuseCount),
      clue: s.clue || "",
      answer: s.answer,
      sourceRef: s.sourceRef,
      historySourceRef: s.historySourceRef || historyKeyForItem(s, "spelling")
    };
  }

  if (kind === "order") {
    const orderSource = difficulty.id === "advanced" ? advancedOrderBank : difficulty.id === "medium" ? mediumOrderBank : orderBank;
    const pick = pickWithoutRepeat(orderSource, theme.era, "order", {
      usedSources,
      allowReuse: false,
      filter: themeFilter,
      scopeKey,
      requireScoped: true
    });
    if (!pick.item) return null;
    const order = pick.item;
    return {
      type: "order",
      prompt: stagePrompt(meta, t("putEventsOrder"), pick.reuseCount),
      items: order.items,
      maxMoves: difficulty.orderMaxMoves,
      nearShuffle: difficulty.orderNearShuffle,
      sourceRef: order.sourceRef,
      historySourceRef: order.historySourceRef || historyKeyForItem(order, "order")
    };
  }

  if (kind === "fact") {
    const factSource = difficulty.id === "advanced" ? advancedFactBank : difficulty.id === "medium" ? mediumFactBank : factBank;
    const pick = pickWithoutRepeat(factSource, theme.era, "fact", {
      usedSources,
      allowReuse: false,
      filter: themeFilter,
      scopeKey,
      requireScoped: true
    });
    if (!pick.item) return null;
    const fact = pick.item;
    const factMode = buildFactActivity(fact, theme.era, difficulty);
    return {
      type: "fact",
      prompt: stagePrompt(meta, t("buildFactOrder"), pick.reuseCount),
      answerParts: factMode.answerParts,
      prefilled: factMode.prefilled,
      parts: factMode.pool,
      sourceRef: fact.sourceRef,
      historySourceRef: fact.historySourceRef || historyKeyForItem(fact, "fact")
    };
  }

  return null;
}

function rotateKinds(list, steps = 0) {
  if (!Array.isArray(list) || !list.length) return [];
  const offset = ((steps % list.length) + list.length) % list.length;
  return list.slice(offset).concat(list.slice(0, offset));
}

function stageKindPlan(meta, difficulty) {
  const stageRings = {
    1: ["quiz", "truefalse", "matching", "order", "fact", "spelling"],
    2: ["order", "matching", "quiz", "fact", "spelling", "truefalse"],
    3: ["fact", "spelling", "matching", "quiz", "order", "truefalse"],
    4: ["spelling", "truefalse", "order", "matching", "quiz", "fact"]
  };
  const baseKinds = stageRings[meta.stage] || [];
  if (!baseKinds.length) return [];

  const difficultyShift = difficulty.id === "advanced" ? 2 : difficulty.id === "medium" ? 1 : 0;
  const rotation = (meta.level - 1 + difficultyShift + (meta.stage - 1)) % baseKinds.length;
  return rotateKinds(baseKinds, rotation);
}

function buildQuestionPoolExhaustedActivity(meta, activityKind = "question") {
  const kindLabel = {
    quiz: "quiz questions",
    spelling: "fill-in-the-blank verse questions",
    order: "order challenges",
    fact: "fact builder challenges",
    truefalse: "true or false questions",
    matching: "matching challenges",
    question: "questions"
  }[activityKind] || "questions";

  return {
    type: "exhausted",
    sourceRef: meta.theme.sourceRef,
    prompt: stagePrompt(meta, `This ${kindLabel} pool is exhausted for now.`),
    message: "No-repeat mode keeps these questions authored only, and all available items for this category have been used.",
    detail: "Try another stage type, switch eras, or reset progress if you want a fresh question pool."
  };
}

function createChallengeHint(text) {
  const hint = document.createElement("p");
  hint.className = "challenge-hint";
  if (isDesktopViewport()) {
    hint.textContent = text;
  } else if (/^Keyboard:/i.test(text)) {
    hint.textContent = "Controls: use touch to play this challenge.";
  } else {
    hint.textContent = text;
  }
  return hint;
}

function createSkillStatus(text) {
  const status = document.createElement("p");
  status.className = "skill-status";
  status.textContent = text;
  return status;
}

function drawRoundedRect(context, x, y, width, height, radius, fillStyle, strokeStyle = null) {
  const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(x + width, y + height, x, y + height, safeRadius);
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + width, y, safeRadius);
  context.closePath();
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  if (strokeStyle) {
    context.strokeStyle = strokeStyle;
    context.stroke();
  }
}

function historyRecordFor(key) {
  const raw = state.questionHistory[key];
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const uses = Array.isArray(raw.uses) ? raw.uses.filter((entry) => typeof entry === "string") : [];
    return { uses };
  }
  if (Array.isArray(raw)) {
    return { uses: raw.filter((entry) => typeof entry === "string") };
  }
  return { uses: [] };
}

function recentUseSet(record, size = 3) {
  const windowSize = Math.max(0, Number(size) || 0);
  if (!windowSize || !record || !Array.isArray(record.uses) || !record.uses.length) return new Set();
  return new Set(record.uses.slice(-windowSize));
}

function pickWithoutRepeat(pool, era, bucket, options = {}) {
  const matcher = typeof options.filter === "function"
    ? options.filter
    : ((item) => item.era === era);
  const scopedPool = pool.filter(matcher);
  const requireScoped = options.requireScoped === true;
  if (requireScoped && !scopedPool.length) {
    return { item: null, reuseCount: 0 };
  }
  const source = scopedPool.length ? scopedPool : pool;
  if (!source.length) return { item: null, reuseCount: 0 };

  const usedSources = options.usedSources instanceof Set ? options.usedSources : null;
  const allowReuse = options.allowReuse !== false;

  const sourceFiltered = usedSources
    ? source.filter((item) => {
      const sourceRef = normalizeSourceRef(item.sourceRef);
      return !sourceRef || !usedSources.has(sourceRef);
    })
    : source;

  if (usedSources && !sourceFiltered.length && !allowReuse) {
    return { item: null, reuseCount: 0 };
  }

  const pickPool = sourceFiltered.length ? sourceFiltered : source;

  const historyScope = options.scopeKey || (scopedPool.length ? era : "all");
  const historyKey = "global:" + bucket + ":" + historyScope;
  const record = historyRecordFor(historyKey);
  const counts = {};
  const recentSet = recentUseSet(record, options.recentWindow || 3);

  record.uses.forEach((signature) => {
    counts[signature] = (counts[signature] || 0) + 1;
  });

  const unseen = pickPool.filter((item) => !counts[itemSignature(item)]);

  let choice;
  let reuseCount = 0;

  if (unseen.length) {
    const unseenNotRecent = unseen.filter((item) => !recentSet.has(itemSignature(item)));
    const unseenPool = unseenNotRecent.length ? unseenNotRecent : unseen;
    choice = unseenPool[Math.floor(Math.random() * unseenPool.length)];
  } else {
    // When a scoped pool is fully used, remix the least-used authored item instead of hard-stopping.
    let min = Infinity;
    let leastUsed = [];

    pickPool.forEach((item) => {
      const signature = itemSignature(item);
      const used = counts[signature] || 0;
      if (used < min) {
        min = used;
        leastUsed = [item];
      } else if (used === min) {
        leastUsed.push(item);
      }
    });

    if (!leastUsed.length) return { item: null, reuseCount: 0 };
    const leastUsedNotRecent = leastUsed.filter((item) => !recentSet.has(itemSignature(item)));
    const remixPool = leastUsedNotRecent.length ? leastUsedNotRecent : leastUsed;
    choice = remixPool[Math.floor(Math.random() * remixPool.length)];
    reuseCount = counts[itemSignature(choice)] || 0;
  }

  const pickedSignature = itemSignature(choice);
  record.uses.push(pickedSignature);

  if (record.uses.length > 5000) {
    record.uses.splice(0, record.uses.length - 5000);
  }

  state.questionHistory[historyKey] = record;

  return { item: choice, reuseCount };
}

function pickManyWithoutRepeat(pool, era, bucket, count, options = {}) {
  const matcher = typeof options.filter === "function"
    ? options.filter
    : ((item) => item.era === era);
  const scopedPool = pool.filter(matcher);
  const requireScoped = options.requireScoped === true;
  if (requireScoped && scopedPool.length < count) {
    return { items: null, reuseCount: 0 };
  }

  const source = scopedPool.length ? scopedPool : pool;
  if (source.length < count) return { items: null, reuseCount: 0 };

  const usedSources = options.usedSources instanceof Set ? options.usedSources : null;
  const allowReuse = options.allowReuse !== false;
  const historyScope = options.scopeKey || (scopedPool.length ? era : "all");
  const historyKey = "global:" + bucket + ":" + historyScope;
  const record = historyRecordFor(historyKey);
  const counts = {};
  const recentSet = recentUseSet(record, options.recentWindow || Math.max(2, count));

  record.uses.forEach((signature) => {
    counts[signature] = (counts[signature] || 0) + 1;
  });

  const filterBySource = (items) => (usedSources
    ? items.filter((item) => {
      const sourceRef = normalizeSourceRef(item.sourceRef);
      return !sourceRef || !usedSources.has(sourceRef);
    })
    : items);

  const buildSelection = (items) => {
    const ranked = shuffled(items).sort((a, b) => {
      const aCount = counts[itemSignature(a)] || 0;
      const bCount = counts[itemSignature(b)] || 0;
      if (aCount !== bCount) return aCount - bCount;
      const aRecent = recentSet.has(itemSignature(a)) ? 1 : 0;
      const bRecent = recentSet.has(itemSignature(b)) ? 1 : 0;
      return aRecent - bRecent;
    });
    const preferredRanked = ranked.filter((item) => !recentSet.has(itemSignature(item)));
    const sourceRanked = preferredRanked.length >= count ? preferredRanked : ranked;
    const picked = [];
    const seen = new Set();

    sourceRanked.forEach((item) => {
      const signature = itemSignature(item);
      if (seen.has(signature)) return;
      seen.add(signature);
      picked.push(item);
    });

    return picked.slice(0, count);
  };

  let candidates = buildSelection(filterBySource(source));
  if (candidates.length < count) {
    // Remix mode fallback: prefer least-used authored combos when no-repeat pool is spent.
    candidates = buildSelection(source);
  }

  if (candidates.length < count) return { items: null, reuseCount: 0 };

  let reuseCount = 0;
  candidates.forEach((item) => {
    reuseCount = Math.max(reuseCount, counts[itemSignature(item)] || 0);
    record.uses.push(itemSignature(item));
  });

  if (record.uses.length > 5000) {
    record.uses.splice(0, record.uses.length - 5000);
  }

  state.questionHistory[historyKey] = record;
  return { items: candidates, reuseCount };
}

function compareReferenceEntries(a, b) {
  const aBook = CANONICAL_BOOK_ORDER[a.book] || 999;
  const bBook = CANONICAL_BOOK_ORDER[b.book] || 999;
  if (aBook !== bBook) return aBook - bBook;
  if (a.chapter !== b.chapter) return a.chapter - b.chapter;
  return a.verse - b.verse;
}

function clueTextFromPrompt(prompt) {
  return String(prompt || "")
    .replace(/\?+$/, "")
    .replace(/^True or False:\s*/i, "")
    .trim();
}

function themeScopedQuizItems(theme) {
  return ALL_QUIZ_BANKS
    .filter((item) => itemMatchesTheme(item, theme))
    .map((item) => {
      const entry = referenceEntriesFromSourceRef(item.sourceRef || "")[0];
      return entry ? { item, entry } : null;
    })
    .filter(Boolean)
    .sort((a, b) => compareReferenceEntries(a.entry, b.entry))
    .map(({ item }) => item);
}

function themesInEra(era) {
  return timelineThemes.filter((theme) => theme.era === era);
}

function uniqueList(items) {
  return Array.from(new Set((items || []).filter(Boolean)));
}

const VERSE_FILL_STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "been", "by", "for", "from", "he", "her", "his",
  "i", "in", "into", "is", "it", "its", "me", "my", "of", "on", "or", "our", "that", "the",
  "their", "them", "they", "to", "us", "was", "we", "were", "will", "with", "yahweh", "god"
]);

function normalizeVerseFillWord(word) {
  return normalizeSpellingAnswer(String(word || "").replace(/[.,;:!?()\[\]"“”]/g, " "));
}

function verseFillWordCandidates(parts = []) {
  return uniqueList(
    parts
      .map((part) => String(part || "").trim())
      .map((part) => normalizeVerseFillWord(part))
      .filter((part) => part && /^[a-zà-ÿ'-]+$/i.test(part))
      .filter((part) => part.length >= 4)
      .filter((part) => !VERSE_FILL_STOP_WORDS.has(part.toLowerCase()))
  );
}

function buildVerseFillPoolFromFactItem(item) {
  const parts = Array.isArray(item.parts) ? item.parts.map((part) => String(part || "").trim()) : [];
  if (parts.length < 3) return [];

  const candidates = verseFillWordCandidates(parts).slice(0, 3);
  return candidates.map((answer, index) => {
    const blankIndex = parts.findIndex((part) => normalizeVerseFillWord(part) === answer);
    if (blankIndex === -1) return null;
    const clueParts = parts.slice();
    clueParts[blankIndex] = "____";
    return {
      era: item.era,
      prompt: challengeCopy(
        "Fill in the missing Bible word from this verse.",
        "Completa la palabra bíblica que falta en este versículo."
      ),
      clue: clueParts.join(" "),
      answer: parts[blankIndex],
      sourceRef: item.sourceRef,
      historySourceRef: `${item.sourceRef}::versefill::${answer}::${index + 1}`
    };
  }).filter(Boolean);
}

function derivedQuizPoolForTheme(theme) {
  return [];
}

function derivedSpellingPoolForTheme(theme) {
  const factVersePool = ALL_FACT_BANKS
    .filter((item) => itemMatchesTheme(item, theme))
    .flatMap((item) => buildVerseFillPoolFromFactItem(item));
  if (factVersePool.length) return factVersePool;

  return themeScopedQuizItems(theme)
    .filter((item) => /^[A-Za-zÀ-ÿ'-]+$/.test(String(item.answer || "")))
    .map((item, index) => ({
      era: theme.era,
      prompt: challengeCopy(
        "Fill in the missing Bible word from this clue.",
        "Completa la palabra bíblica que falta en esta pista."
      ),
      clue: `${clueTextFromPrompt(item.prompt)}: ____`,
      answer: item.answer,
      sourceRef: item.sourceRef,
      historySourceRef: `${item.historySourceRef || item.sourceRef}::versefill::fallback::${index + 1}`
    }));
}

function derivedOrderSetsForTheme(theme) {
  const themeItems = themeScopedQuizItems(theme);
  const labels = themeItems.map((item) => clueTextFromPrompt(item.prompt));
  const sets = [];
  for (let index = 0; index <= labels.length - 3; index += 1) {
    sets.push({
      era: theme.era,
      items: labels.slice(index, index + 3),
      sourceRef: themeItems.slice(index, index + 3).map((item) => item.sourceRef).join("; "),
      historySourceRef: themeItems.slice(index, index + 3).map((item) => `${item.sourceRef}::derived-order`).join(" || ")
    });
  }

  const eraThemes = themesInEra(theme.era);
  if (eraThemes.length >= 3) {
    const focusIndex = Math.max(0, eraThemes.findIndex((entry) => entry.name === theme.name));
    const startIndex = Math.max(0, Math.min(focusIndex - 1, eraThemes.length - 3));
    const trio = eraThemes.slice(startIndex, startIndex + 3);
    if (trio.length === 3) {
      sets.push({
        era: theme.era,
        prompt: challengeCopy("Put these Bible sections in order.", "Pon estas secciones de la Biblia en orden."),
        items: trio.map((entry) => entry.name),
        sourceRef: trio.map((entry) => entry.sourceRef).join("; "),
        historySourceRef: trio.map((entry) => `${entry.sourceRef}::theme`).join("; ")
      });
      sets.push({
        era: theme.era,
        prompt: challengeCopy("Put these Bible sections in order.", "Pon estas secciones de la Biblia en orden."),
        items: trio.map((entry) => entry.period),
        sourceRef: trio.map((entry) => entry.sourceRef).join("; "),
        historySourceRef: trio.map((entry) => `${entry.sourceRef}::period`).join("; ")
      });
    }
  }

  return sets;
}

function derivedFactPoolForTheme(theme) {
  return [];
}

function buildFalseAnswer(question) {
  const options = shuffled((question.options || []).filter((option) => option !== question.answer));
  return options[0] || null;
}

function stagePrompt(meta, text, reuseCount = 0) {
  const remix = reuseCount > 0 ? ` (Remix ${reuseCount + 1})` : "";
  return `${t("levelWordSingular")} ${meta.level} ${t("stageLabel")} ${meta.stage}${remix}: ${text}`;
}

function shuffled(list) {

  return list
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value);
}

function currentDifficulty() {
  return difficultyProfiles[state.difficulty] || difficultyProfiles.medium;
}

function shouldShowQuestionSource() {
  return currentDifficulty().id !== "advanced";
}

function normalizeSpellingAnswer(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[’`]/g, "'");
}

function buildQuizOptions(question, era, optionCount, sourcePool = quizBank) {
  const total = 4;
  const options = [];
  const seen = new Set();
  const pool = Array.isArray(sourcePool) && sourcePool.length ? sourcePool : quizBank;
  const combinedPool = [].concat(quizBank, mediumQuizBank, advancedQuizBank);

  const addOption = (answer) => {
    if (!answer || seen.has(answer)) return;
    seen.add(answer);
    options.push(answer);
  };

  addOption(question.answer);
  if (Array.isArray(question.options) && question.options.length) {
    uniqueList(question.options).forEach(addOption);
  }

  const addDistractors = (answers) => {
    for (const answer of shuffled(answers)) {
      addOption(answer);
      if (options.length >= total) return;
    }
  };

  const eraAnswersPrimary = pool.filter((item) => item.era === era && item.answer !== question.answer).map((item) => item.answer);
  addDistractors(eraAnswersPrimary);

  if (options.length < total) {
    const eraAnswersCombined = combinedPool.filter((item) => item.era === era && item.answer !== question.answer).map((item) => item.answer);
    addDistractors(eraAnswersCombined);
  }

  if (options.length < total) {
    const allAnswers = combinedPool.filter((item) => item.answer !== question.answer).map((item) => item.answer);
    addDistractors(allAnswers);
  }

  return shuffled(options.slice(0, total));
}

function nearlyOrdered(list) {

  const copy = list.slice();
  if (copy.length < 2) return copy;
  const idx = Math.floor(Math.random() * (copy.length - 1));
  [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
  return copy;
}

function buildFactActivity(fact, era, profile) {
  const answerParts = fact.parts.slice();
  const prefillCount = Math.max(0, Math.min(profile.factPrefill || 0, Math.max(0, answerParts.length - 1)));
  const prefilled = answerParts.slice(0, prefillCount);
  let pool = answerParts.slice(prefillCount);

  const decoysNeeded = Math.max(0, profile.factDecoys || 0);
  if (decoysNeeded > 0) {
    const inAnswer = new Set(answerParts);
    const factDecoySource = [].concat(factBank, mediumFactBank, advancedFactBank);
    const decoyCandidatesEra = factDecoySource
      .filter((item) => item.era === era)
      .flatMap((item) => item.parts)
      .filter((word) => !inAnswer.has(word));

    const decoyCandidatesAll = factDecoySource
      .flatMap((item) => item.parts)
      .filter((word) => !inAnswer.has(word));

    const decoys = [];
    const seen = new Set();

    for (const candidate of shuffled(decoyCandidatesEra.concat(decoyCandidatesAll))) {
      if (seen.has(candidate)) continue;
      seen.add(candidate);
      decoys.push(candidate);
      if (decoys.length >= decoysNeeded) break;
    }

    pool = pool.concat(decoys);
  }

  return {
    answerParts,
    prefilled,
    pool: shuffled(pool)
  };
}

function nivPassageUrl(reference) {

  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(reference)}&version=WEB`;
}

function renderSourceVerse(reference) {
  const row = document.createElement("div");
  row.className = "source-row";

  const text = document.createElement("p");
  text.className = "source-ref";
  text.textContent = `${t("sourceLabel")}: ${reference}`;

  const link = document.createElement("a");
  link.className = "ghost-btn";
  link.href = nivPassageUrl(reference);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = t("sourceVerseWeb");

  row.append(text, link);
  return row;
}

function activityFor(meta) {
  const cacheKey = state.difficulty + ":" + meta.id;
  const cached = state.stageActivities[cacheKey];
  if (cached && typeof cached === "object") return cached;

  const era = meta.theme.era;
  const difficulty = currentDifficulty();
  const usedSources = usedQuestionSourcesForDifficulty(state.difficulty);

  let activity;

  if (meta.stage >= 1 && meta.stage <= 4) {
    for (const kind of stageKindPlan(meta, difficulty)) {
      if (kind === "truefalse") {
        activity = buildTrueFalseActivity(meta, meta.theme, usedSources);
      } else if (kind === "matching") {
        activity = buildMatchingActivity(meta, meta.theme, usedSources);
      } else if (kind === "quiz") {
        activity = buildAuthoredActivityByKind(meta, meta.theme, difficulty, usedSources, kind)
          || buildFallbackQuizActivity(meta, meta.theme, difficulty, usedSources);
      } else if (kind === "order") {
        activity = buildAuthoredActivityByKind(meta, meta.theme, difficulty, usedSources, kind)
          || buildFallbackOrderActivity(meta, meta.theme, difficulty, usedSources);
      } else if (kind === "spelling") {
        activity = buildAuthoredActivityByKind(meta, meta.theme, difficulty, usedSources, kind)
          || buildFallbackSpellingActivity(meta, meta.theme, difficulty, usedSources);
      } else {
        activity = buildAuthoredActivityByKind(meta, meta.theme, difficulty, usedSources, kind)
          || buildFallbackFactActivity(meta, meta.theme, difficulty, usedSources);
      }
      if (activity) break;
    }
  } else {
    const mode = modeForStage(meta, difficulty);
    activity = {
      type: "interactive",
      mode,
      sourceRef: mode.sourceRef || meta.theme.sourceRef
    };
  }

  if (!activity) {
    const exhaustedType = stageKindPlan(meta, difficulty)[0] || "question";
    activity = buildQuestionPoolExhaustedActivity(meta, exhaustedType);
  }

  state.stageActivities[cacheKey] = activity;
  return activity;
}

function materializeInteractiveMode(base, difficulty = currentDifficulty(), keySeed = "generic", cycle = 0) {
  const mode = { ...base, id: `${base.id}-${keySeed}` };

  if (cycle > 0) {
    mode.label = `${base.label} ${cycle + 1}`;

    if (base.engine === "timing") {
      mode.target = base.target + cycle;
      mode.speed = Math.max(520, base.speed - cycle * 20);
    } else if (base.engine === "collect") {
      mode.target = base.target + cycle;
      mode.seconds = Math.max(16, base.seconds - cycle);
      mode.spawnMs = Math.max(250, base.spawnMs - cycle * 18);
    } else if (base.engine === "dodge") {
      mode.target = base.target + cycle * 2;
      mode.spawnMs = Math.max(240, base.spawnMs - cycle * 10);
    } else if (base.engine === "pattern") {
      mode.rounds = Math.max(3, (base.rounds || 4) + cycle);
      mode.playbackMs = Math.max(320, (base.playbackMs || 500) - cycle * 20);
    } else if (base.engine === "balance") {
      mode.target = (base.target || 7) + cycle;
      mode.drift = Math.min(0.05, (base.drift || 0.026) + cycle * 0.0025);
    } else if (base.engine === "route") {
      mode.maxMisses = Math.max(2, (base.maxMisses || 4) - Math.min(cycle, 1));
    } else if (base.engine === "discern") {
      mode.maxMisses = Math.max(2, (base.maxMisses || 3) - Math.min(cycle, 1));
    }
  }

  const tune = difficulty.interactive[mode.engine] || {};

  if (mode.engine === "timing") {
    mode.target = Math.max(3, mode.target + (tune.targetDelta || 0));
    mode.maxMisses = Math.max(1, (mode.maxMisses || 3) + (tune.maxMissesDelta || 0));
    mode.speed = Math.max(460, mode.speed + (tune.speedDelta || 0));
  } else if (mode.engine === "collect") {
    mode.target = Math.max(6, mode.target + (tune.targetDelta || 0));
    mode.maxMisses = Math.max(2, (mode.maxMisses || 5) + (tune.maxMissesDelta || 0));
    mode.seconds = Math.max(14, (mode.seconds || 22) + (tune.secondsDelta || 0));
    mode.spawnMs = Math.max(210, (mode.spawnMs || 420) + (tune.spawnDelta || 0));
  } else if (mode.engine === "dodge") {
    mode.target = Math.max(10, mode.target + (tune.targetDelta || 0));
    mode.spawnMs = Math.max(210, (mode.spawnMs || 340) + (tune.spawnDelta || 0));
  } else if (mode.engine === "slingshot") {
    mode.targetRadius = Math.max(12, 20 + (tune.targetRadiusDelta || 0));
    mode.maxPull = Math.max(62, 82 + (tune.maxPullDelta || 0));
    mode.pullPowerScale = tune.pullScale || 0.14;
  } else if (mode.engine === "pattern") {
    mode.rounds = Math.max(3, (mode.rounds || 4) + (tune.roundsDelta || 0));
    mode.maxMisses = Math.max(1, (mode.maxMisses || 3) + (tune.maxMissesDelta || 0));
    mode.playbackMs = Math.max(300, (mode.playbackMs || 500) + (tune.paceDelta || 0));
  } else if (mode.engine === "balance") {
    mode.target = Math.max(5, (mode.target || 7) + (tune.targetDelta || 0));
    mode.maxMisses = Math.max(1, (mode.maxMisses || 3) + (tune.maxMissesDelta || 0));
    mode.drift = Math.max(0.014, (mode.drift || 0.026) + (tune.driftDelta || 0));
  } else if (mode.engine === "route") {
    mode.maxMisses = Math.max(1, (mode.maxMisses || 4) + (tune.maxMissesDelta || 0));
  } else if (mode.engine === "discern") {
    mode.maxMisses = Math.max(1, (mode.maxMisses || 3) + (tune.maxMissesDelta || 0));
  }

  return mode;
}

function themeLevelOrdinal(meta) {
  let ordinal = 0;
  for (let index = 0; index < meta.level - 1 && index < levelThemeSequence.length; index += 1) {
    if ((levelThemeSequence[index] || {}).name === meta.theme.name) ordinal += 1;
  }
  return ordinal;
}

const stageFiveSelectionCache = new Map();

function stageFiveBaseSelection(level) {
  if (stageFiveSelectionCache.has(level)) {
    return stageFiveSelectionCache.get(level);
  }

  const theme = levelThemeSequence[level - 1] || timelineThemes[timelineThemes.length - 1];
  const themedModes = THEMED_INTERACTIVE_MODE_SETS[theme.name];
  const useThemedModes = Array.isArray(themedModes) && themedModes.length;
  const pool = useThemedModes ? themedModes : interactiveModes;
  const ordinal = useThemedModes
    ? levelThemeSequence.slice(0, Math.max(0, level - 1)).filter((entry) => (entry || {}).name === theme.name).length
    : (level - 1);
  const startIndex = (ordinal + (level - 1)) % pool.length;
  const candidates = Array.from({ length: pool.length }, (_, offset) => pool[(startIndex + offset) % pool.length]);
  const previous = level > 1 ? stageFiveBaseSelection(level - 1).base : null;

  let base = candidates[0];
  if (useThemedModes) {
    const priorSameTheme = [];
    for (let index = 1; index < level; index += 1) {
      const priorTheme = levelThemeSequence[index - 1] || timelineThemes[timelineThemes.length - 1];
      if ((priorTheme || {}).name !== theme.name) continue;
      const priorSelection = stageFiveBaseSelection(index);
      if (priorSelection && priorSelection.base) priorSameTheme.push(priorSelection.base);
    }

    const usedIds = new Set(priorSameTheme.map((entry) => entry.id));
    const recentEngines = priorSameTheme.slice(-2).map((entry) => entry.engine);

    base = candidates.find((candidate) => !usedIds.has(candidate.id) && candidate.id !== previous?.id && !recentEngines.includes(candidate.engine))
      || candidates.find((candidate) => !usedIds.has(candidate.id) && candidate.id !== previous?.id)
      || candidates.find((candidate) => !usedIds.has(candidate.id))
      || candidates.find((candidate) => candidate.id !== previous?.id && candidate.engine !== previous?.engine)
      || candidates.find((candidate) => candidate.id !== previous?.id)
      || candidates.find((candidate) => candidate.engine !== previous?.engine)
      || base;
  } else if (previous) {
    base = candidates.find((candidate) => candidate.id !== previous.id && candidate.engine !== previous.engine)
      || candidates.find((candidate) => candidate.id !== previous.id)
      || candidates.find((candidate) => candidate.engine !== previous.engine)
      || base;
  }

  const cycle = useThemedModes
    ? Math.floor(ordinal / pool.length)
    : Math.floor((level - 1) / pool.length);
  const selection = { base, cycle };
  stageFiveSelectionCache.set(level, selection);
  return selection;
}

function modeForStage(meta, difficulty = currentDifficulty()) {
  const selection = stageFiveBaseSelection(meta.level);
  return materializeInteractiveMode(selection.base, difficulty, `${meta.theme.era}-l${meta.level}-s${meta.stage}`, selection.cycle);
}

function modeForLevel(level, difficulty = currentDifficulty()) {
  const selection = stageFiveBaseSelection(level);
  return materializeInteractiveMode(selection.base, difficulty, `l${level}`, selection.cycle);
}

function focusStageCard(stageId) {
  if (!stageId) return;
  const card = stageGrid.querySelector(`[data-stage-id="${stageId}"]`);
  if (!card) {
    pendingStageFocusId = stageId;
    return;
  }
  pendingStageFocusId = null;
  card.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
}

function flushPendingStageFocus() {
  if (!pendingStageFocusId) return;
  const card = stageGrid.querySelector(`[data-stage-id="${pendingStageFocusId}"]`);
  if (!card) return;
  card.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
  pendingStageFocusId = null;
}

function resumeLastSession() {
  if (state.activeStage && getStageMeta(state.activeStage)) {
    focusStageCard(state.activeStage);
    openStage(state.activeStage);
    return;
  }

  if (state.lastStage && getStageMeta(state.lastStage)) {
    focusStageCard(state.lastStage);
  }
}

function primeAudioAuto() {
  ensureAudio();
  if (!audioEngine.ctx) return;
  if (audioEngine.ctx.state === "suspended") {
    audioEngine.ctx.resume().catch(() => {});
  }
  if (audioEngine.ctx.state === "running") {
    disarmAudioUnlock();
  } else {
    armAudioUnlock();
  }
  updateAudioState();
}

function buildEraSections() {
  const eraSections = [];
  stages.forEach((meta, index) => {
    const lastSection = eraSections[eraSections.length - 1];
    if (!lastSection || lastSection.era !== meta.theme.era) {
      eraSections.push({
        era: meta.theme.era,
        name: formatEraLabel(meta.theme.era),
        startLevel: meta.level,
        endLevel: meta.level,
        items: [{ meta, index }]
      });
      return;
    }

    lastSection.endLevel = meta.level;
    lastSection.items.push({ meta, index });
  });
  return eraSections;
}

function createEraSectionNode(section, completedSet) {
  const shell = document.createElement("section");
  shell.className = "era-section";

  const head = document.createElement("div");
  head.className = "era-head";

  const textWrap = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = section.name;

  const line = document.createElement("p");
  line.className = "meta";
  const levelRange = section.startLevel === section.endLevel
    ? `${t("levelWordSingular")} ${section.startLevel}`
    : `${t("levelWordPlural")} ${section.startLevel}-${section.endLevel}`;
  line.textContent = `${levelRange} • ${section.items.length} ${t("stageWord")}`;

  textWrap.append(title, line);

  const previewBtn = document.createElement("button");
  previewBtn.type = "button";
  previewBtn.className = "ghost-btn";
  previewBtn.textContent = t("watchPreview");
  previewBtn.addEventListener("click", () => openStoryTheater(section.era));

  head.append(textWrap, previewBtn);

  const sectionGrid = document.createElement("div");
  sectionGrid.className = "stage-grid era-stage-grid";

  section.items.forEach(({ meta, index }) => {
    const locked = index + 1 > state.unlocked;
    const done = completedSet.has(meta.id);
    const card = document.createElement("article");
    card.className = `stage-card ${locked ? "locked" : ""}`;
    card.dataset.stageId = meta.id;
    card.style.animationDelay = `${70 + (index % 12) * 25}ms`;

    const tag = document.createElement("span");
    tag.className = `tag ${done ? "done" : locked ? "locked" : "open"}`;
    tag.textContent = done ? t("completedTag") : locked ? t("lockedTag") : t("availableTag");

    const stageTitle = document.createElement("h3");
    stageTitle.textContent = `${meta.theme.name} - ${t("stageLabel")} ${meta.stage}`;

    const stageLine = document.createElement("p");
    stageLine.className = "meta";
    stageLine.textContent = `${t("levelWordSingular")} ${meta.level} • ${meta.theme.period}`;

    const button = document.createElement("button");
    button.className = "cta-btn";
    button.type = "button";
    button.disabled = locked;
    button.textContent = done ? t("replayLabel") : t("startLabel");
    button.addEventListener("click", () => openStage(meta.id));

    card.append(tag, stageTitle, stageLine, button);
    sectionGrid.appendChild(card);
  });

  shell.append(head, sectionGrid);
  return shell;
}

function stageGridStateKey() {
  return [
    state.language,
    state.unlocked,
    state.completed.join(",")
  ].join("|");
}

function renderStageGridIncremental() {
  const nextKey = stageGridStateKey();
  if (nextKey === lastStageGridRenderKey) {
    flushPendingStageFocus();
    maybeShowCompletionFinale();
    return;
  }

  lastStageGridRenderKey = nextKey;
  stageGridRenderToken += 1;
  const token = stageGridRenderToken;

  const sections = buildEraSections();
  const completedSet = new Set(state.completed);
  stageGrid.innerHTML = "";

  let idx = 0;
  const frameBudgetMs = runtimePerformance.performanceLite ? 6 : 10;
  const pump = (deadline) => {
    if (token !== stageGridRenderToken) return;

    const startedAt = performance.now();
    while (idx < sections.length) {
      stageGrid.appendChild(createEraSectionNode(sections[idx], completedSet));
      idx += 1;
      flushPendingStageFocus();

      const timeBudgetUsed = performance.now() - startedAt;
      const almostOutOfIdleTime = deadline && typeof deadline.timeRemaining === "function"
        ? deadline.timeRemaining() < 3
        : timeBudgetUsed > frameBudgetMs;
      if (almostOutOfIdleTime) break;
    }

    if (idx < sections.length) {
      scheduleIdleWork(pump);
      return;
    }

    flushPendingStageFocus();
    maybeShowCompletionFinale();
  };

  scheduleIdleWork(pump);
}

function scheduleStageGridRender() {
  if (stageGridRenderDelayTimer) {
    window.clearTimeout(stageGridRenderDelayTimer);
    stageGridRenderDelayTimer = 0;
  }
  const delayMs = hasRenderedStageGridOnce ? 0 : (runtimePerformance.performanceLite ? 180 : 90);
  stageGridRenderDelayTimer = window.setTimeout(() => {
    stageGridRenderDelayTimer = 0;
    renderStageGridIncremental();
    hasRenderedStageGridOnce = true;
  }, delayMs);
}

function render() {
  updateHud();
  updateFinalCertificate();
  renderBadgeGallery();
  renderBadgeShield();

  const completedCount = state.completed.length;
  const completedLevels = countCompletedLevels();
  const progressPct = Math.round((completedCount / TOTAL_STAGES) * 100);

  progressFill.style.width = `${progressPct}%`;
  progressText.textContent = `${t("progressLabel")}: ${completedCount}/${TOTAL_STAGES} ${t("stageWord")} | ${completedLevels}/${TOTAL_LEVELS} ${t("levelWordPlural").toLowerCase()}`;

  scheduleStageGridRender();
  scheduleHubMediaWarmup();
}

function renderHeader(meta) {

  const wrap = document.createElement("div");
  wrap.className = "stage-header";

  const icon = document.createElement("img");
  icon.className = "stage-top-icon";
  icon.alt = "FAITHSHIELD icon";

  const sources = stageArtSources();
  let sourceIndex = 0;
  const tryNextSource = () => {
    if (sourceIndex >= sources.length) return;
    icon.src = sources[sourceIndex];
    sourceIndex += 1;
  };
  icon.addEventListener("error", tryNextSource);
  tryNextSource();

  const title = document.createElement("h3");
  title.textContent = `${meta.theme.name} - ${t("stageLabel")} ${meta.stage}`;
  const fact = document.createElement("p");
  fact.className = "fact";
  fact.textContent = meta.theme.fact;
  wrap.append(icon, title, fact);
  return wrap;
}

function hqCutsceneVideoCandidates(era) {
  return [
    `./assets/cutscenes/hq/${era}.mp4`,
    `./cutscenes/hq/${era}.mp4`,
    `./hq/${era}.mp4`
  ];
}

function cutsceneVideoSources() {
  // Release builds now use still-art previews plus narration only.
  return [];
}

function cutscenePosterSource(era) {
  const candidates = cutscenePrimaryStillCandidates(era);
  return candidates.find(Boolean) || CUTSCENE_POSTER_DEFAULT;
}

function cutsceneStillCandidates(era) {
  const stillSpecific = CUTSCENE_STILL_BY_ERA[era] || [];
  const stillGeneric = CUTSCENE_STILL_BY_ERA.generic || [];
  const posterSpecific = CUTSCENE_POSTER_BY_ERA[era] || [];
  const posterGeneric = CUTSCENE_POSTER_BY_ERA.generic || [];
  const stageFallback = stageArtSources();
  return Array.from(
    new Set(
      []
        .concat(stillSpecific)
        .concat(stillGeneric)
        .concat(posterSpecific)
        .concat(posterGeneric)
        .concat(stageFallback)
        .concat([CUTSCENE_POSTER_DEFAULT])
        .filter(Boolean)
    )
  );
}

function cutscenePrimaryStillCandidates(era) {
  const groups = cutsceneStillSequenceGroups(era);
  if (groups.length) {
    return groups[0].slice();
  }
  return cutsceneStillCandidates(era);
}

function cutsceneStillSequenceGroups(era) {
  const specific = CUTSCENE_STILL_SEQUENCE_BY_ERA[era] || [];
  const generic = CUTSCENE_STILL_SEQUENCE_BY_ERA.generic || [];
  return specific
    .concat(generic)
    .map((group) => (Array.isArray(group) ? group.filter(Boolean) : [group].filter(Boolean)))
    .filter((group) => group.length > 0);
}

function cutsceneStillViewConfig(era) {
  return CUTSCENE_STILL_VIEW_BY_ERA[era] || CUTSCENE_STILL_VIEW_BY_ERA.generic;
}

function cutsceneStillFrameViewConfig(era, frameIndex = 0) {
  const base = cutsceneStillViewConfig(era);
  const specificFrames = CUTSCENE_STILL_FRAME_VIEW_BY_ERA[era] || [];
  const genericFrames = CUTSCENE_STILL_FRAME_VIEW_BY_ERA.generic || [];
  const frameViews = specificFrames.length ? specificFrames : genericFrames;
  if (!frameViews.length) return base;
  const safeIndex = Math.max(0, Math.min(frameViews.length - 1, frameIndex));
  return Object.assign({}, base, frameViews[safeIndex]);
}

function applyStoryStillView(era, frameIndex = 0) {
  if (!storyTheaterVideo) return;
  const view = cutsceneStillFrameViewConfig(era, frameIndex);
  const fit = view.fit || "cover";
  const scale = Number(view.scale);
  const hasScale = Number.isFinite(scale) && scale > 0 && Math.abs(scale - 1) > 0.001;
  const scaledSize = hasScale && fit === "contain"
    ? `${Math.round(scale * 100)}% auto`
    : fit;
  storyTheaterVideo.classList.toggle("still-contain", fit === "contain");
  storyTheaterVideo.style.backgroundSize = scaledSize;
  storyTheaterVideo.style.backgroundPosition = view.position || "50% 50%";
  storyTheaterVideo.style.backgroundColor = view.backgroundColor || "#0f1722";
}

function applyStageStillView(imageElement, era, frameIndex = 0) {
  if (!imageElement) return;
  const view = cutsceneStillFrameViewConfig(era, frameIndex);
  const fit = view.fit || "cover";
  const scale = Number(view.scale);
  const hasScale = Number.isFinite(scale) && scale > 0 && Math.abs(scale - 1) > 0.001;
  imageElement.classList.toggle("still-contain", fit === "contain");
  imageElement.style.objectFit = fit;
  imageElement.style.objectPosition = view.position || "50% 50%";
  imageElement.style.backgroundColor = view.backgroundColor || "#0f1722";
  imageElement.style.transform = hasScale ? `scale(${scale})` : "";
  imageElement.style.transformOrigin = view.position || "50% 50%";
}

function stopStoryStillSequence() {
  storyStillSequenceToken += 1;
  if (storyStillSequenceTimer) {
    window.clearInterval(storyStillSequenceTimer);
    storyStillSequenceTimer = 0;
  }
}

function stopStageStillSequence() {
  stageStillSequenceToken += 1;
  if (stageStillSequenceTimer) {
    window.clearInterval(stageStillSequenceTimer);
    stageStillSequenceTimer = 0;
  }
}

function startStoryStillSequence(era) {
  stopStoryStillSequence();
  if (!storyTheaterVideo) return;
  applyStoryStillView(era);
  const frameGroups = cutsceneStillSequenceGroups(era);
  if (!frameGroups.length) return;

  storyStillSequenceToken += 1;
  const token = storyStillSequenceToken;
  const firstGroup = frameGroups[0];
  resolveFirstLoadableImage(firstGroup, 700).then((firstFrame) => {
    if (token !== storyStillSequenceToken) return;
    if (!storyTheaterVideo || !storyTheaterOverlay || storyTheaterOverlay.classList.contains("hidden")) return;
    if (activeStoryTheaterEra !== era) return;

    const applyFrame = (src, frameIndex = 0) => {
      applyStoryStillView(era, frameIndex);
      storyTheaterVideo.style.backgroundImage = `url("${src}")`;
      storyTheaterVideo.poster = src;
    };
    applyFrame(firstFrame, 0);

    if (frameGroups.length < 2) return;

    Promise.all(frameGroups.slice(1).map((group) => resolveFirstLoadableImage(group, 1100))).then((restFrames) => {
      if (token !== storyStillSequenceToken) return;
      if (!storyTheaterVideo || !storyTheaterOverlay || storyTheaterOverlay.classList.contains("hidden")) return;
      if (activeStoryTheaterEra !== era) return;

      const playableFrames = [firstFrame].concat(restFrames).filter(Boolean);
      if (!playableFrames.length) return;

      let frameIndex = 0;
      const applyIndexedFrame = () => {
        applyFrame(playableFrames[frameIndex], frameIndex);
      };

      applyIndexedFrame();
      if (playableFrames.length < 2) return;

      const intervalMs = runtimePerformance.performanceLite ? 3200 : CUTSCENE_STILL_SEQUENCE_INTERVAL_MS;
      storyStillSequenceTimer = window.setInterval(() => {
        if (token !== storyStillSequenceToken || activeStoryTheaterEra !== era || !storyTheaterVideo) {
          stopStoryStillSequence();
          return;
        }
        frameIndex = (frameIndex + 1) % playableFrames.length;
        applyIndexedFrame();
      }, intervalMs);
    });
  });
}

function startStageStillSequence(imageElement, era) {
  stopStageStillSequence();
  if (!imageElement) return;
  applyStageStillView(imageElement, era);
  const frameGroups = cutsceneStillSequenceGroups(era);
  if (!frameGroups.length) return;

  stageStillSequenceToken += 1;
  const token = stageStillSequenceToken;
  const firstGroup = frameGroups[0];
  resolveFirstLoadableImage(firstGroup, 700).then((firstFrame) => {
    if (token !== stageStillSequenceToken) return;
    if (!imageElement.isConnected) return;
    applyStageStillView(imageElement, era, 0);
    imageElement.src = firstFrame;

    if (frameGroups.length < 2) return;

    Promise.all(frameGroups.slice(1).map((group) => resolveFirstLoadableImage(group, 1100))).then((restFrames) => {
      if (token !== stageStillSequenceToken) return;
      if (!imageElement.isConnected) return;

      const playableFrames = [firstFrame].concat(restFrames).filter(Boolean);
      if (!playableFrames.length) return;

      let frameIndex = 0;
      const applyFrame = () => {
        applyStageStillView(imageElement, era, frameIndex);
        imageElement.src = playableFrames[frameIndex];
      };

      applyFrame();
      if (playableFrames.length < 2) return;

      const intervalMs = runtimePerformance.performanceLite ? 3200 : CUTSCENE_STILL_SEQUENCE_INTERVAL_MS;
      stageStillSequenceTimer = window.setInterval(() => {
        if (token !== stageStillSequenceToken || !imageElement.isConnected) {
          stopStageStillSequence();
          return;
        }
        frameIndex = (frameIndex + 1) % playableFrames.length;
        applyFrame();
      }, intervalMs);
    });
  });
}

function assignImageWithFallback(imageElement, candidates) {
  if (!imageElement || !candidates || !candidates.length) return;
  let idx = 0;
  const tryNext = () => {
    if (idx >= candidates.length) return;
    imageElement.src = candidates[idx];
    idx += 1;
  };
  imageElement.addEventListener("error", tryNext);
  tryNext();
}

function resolveFirstLoadableImage(candidates, timeoutMs = 1200) {
  const list = (candidates || []).filter(Boolean);
  if (!list.length) return Promise.resolve(CUTSCENE_POSTER_DEFAULT);

  return new Promise((resolve) => {
    let settled = false;
    const finish = (src) => {
      if (settled) return;
      settled = true;
      resolve(src || CUTSCENE_POSTER_DEFAULT);
    };
    const timer = window.setTimeout(() => {
      finish(CUTSCENE_POSTER_DEFAULT);
    }, timeoutMs);

    let idx = 0;
    const tryNext = () => {
      if (settled) return;
      if (idx >= list.length) {
        window.clearTimeout(timer);
        finish(CUTSCENE_POSTER_DEFAULT);
        return;
      }

      const src = list[idx];
      idx += 1;
      const probe = new Image();
      probe.decoding = "async";
      probe.onload = () => {
        window.clearTimeout(timer);
        finish(src);
      };
      probe.onerror = () => {
        tryNext();
      };
      probe.src = src;
    };

    tryNext();
  });
}

function stageArtSources() {
  return [
    "./assets/stage-art.png",
    "./stage-art.png",
    "./assets/faith-shield.svg",
    "./faith-shield.svg"
  ];
}

function releaseVideoElement(video, eraSet = null) {
  if (!video) return;
  const era = video.__faithEra;
  if (era && eraSet) eraSet.delete(era);
  try {
    video.pause();
    video.removeAttribute("src");
    video.innerHTML = "";
    video.load();
  } catch (_) {
    // Ignore media teardown errors.
  }
}

function releaseAudioElement(audio, eraSet = null) {
  if (!audio) return;
  const era = audio.__faithEra;
  if (era && eraSet) eraSet.delete(era);
  try {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
  } catch (_) {
    // Ignore media teardown errors.
  }
}

function trimPreloadedMediaCaches(options = {}) {
  const aggressive = Boolean(options.aggressive);
  const narrationLimit = aggressive ? 0 : (runtimePerformance.performanceLite ? 1 : 4);
  const cutsceneLimit = aggressive ? 0 : (runtimePerformance.performanceLite ? 1 : 3);

  while (preloadedNarrationAudio.length > narrationLimit) {
    const staleAudio = preloadedNarrationAudio.shift();
    releaseAudioElement(staleAudio, preloadedNarrationEras);
  }

  while (preloadedCutsceneVideos.length > cutsceneLimit) {
    const staleVideo = preloadedCutsceneVideos.shift();
    releaseVideoElement(staleVideo, preloadedCutsceneEras);
  }

  if (aggressive) {
    preloadedNarrationAudio.splice(0).forEach((audio) => releaseAudioElement(audio, preloadedNarrationEras));
    preloadedCutsceneVideos.splice(0).forEach((video) => releaseVideoElement(video, preloadedCutsceneEras));
    preloadedCutscenePosters.clear();
    hubMediaWarmupScheduled = false;
  }
}

function clearHiddenCleanupTimer() {
  if (!runtimePerformance.hiddenCleanupTimer) return;
  window.clearTimeout(runtimePerformance.hiddenCleanupTimer);
  runtimePerformance.hiddenCleanupTimer = 0;
}

function scheduleHiddenMediaCleanup() {
  clearHiddenCleanupTimer();
  runtimePerformance.hiddenCleanupTimer = window.setTimeout(() => {
    runtimePerformance.hiddenCleanupTimer = 0;
    if (document.visibilityState !== "hidden") return;
    stopStoryNarration();
    trimPreloadedMediaCaches({ aggressive: true });
  }, 900);
}

function warmPosterCache(era) {
  if (!era || preloadedCutscenePosters.has(era)) return;
  const candidates = cutsceneStillCandidates(era);
  const first = candidates[0];
  if (!first) return;

  const img = new Image();
  img.decoding = "async";
  img.loading = "eager";
  img.src = first;
  preloadedCutscenePosters.add(era);
}

function warmCutsceneMediaCache(era) {
  if (!era || preloadedCutsceneEras.has(era)) return;
  if (document.visibilityState === "hidden") return;
  const sources = cutsceneVideoSources(era);
  const firstSrc = sources[0];
  if (!firstSrc) return;

  const probe = document.createElement("video");
  probe.preload = runtimePerformance.performanceLite ? "metadata" : "auto";
  probe.muted = true;
  probe.playsInline = true;
  probe.src = firstSrc;
  probe.__faithEra = era;

  try {
    probe.load();
    preloadedCutsceneVideos.push(probe);
    trimPreloadedMediaCaches();
    preloadedCutsceneEras.add(era);
  } catch (_) {
    // Ignore preload failures; runtime playback still has fallback sources.
  }
}

function hqNarrationAudioCandidates(era) {
  return [
    `./assets/cutscenes/hq/${era}.m4a`,
    `./cutscenes/hq/${era}.m4a`,
    `./hq/${era}.m4a`,
    `./assets/cutscenes/hq/${era}.mp3`,
    `./cutscenes/hq/${era}.mp3`,
    `./hq/${era}.mp3`
  ];
}

function narrationAudioSources(era) {
  const specific = hqNarrationAudioCandidates(era).concat(STORY_NARRATION_AUDIO_BY_ERA[era] || []);
  const generic = hqNarrationAudioCandidates("generic").concat(STORY_NARRATION_AUDIO_BY_ERA.generic || []);

  if (state.language === "es") {
    const spanishSpecific = [
      `./assets/cutscenes/es/hq/${era}.m4a`,
      `./cutscenes/es/hq/${era}.m4a`,
      `./assets/cutscenes/es/hq/${era}.mp3`,
      `./cutscenes/es/hq/${era}.mp3`,
      `./assets/cutscenes/es/${era}.m4a`,
      `./cutscenes/es/${era}.m4a`,
      `./${era}.es.m4a`
    ];
    const spanishGeneric = [
      "./assets/cutscenes/es/hq/generic.m4a",
      "./cutscenes/es/hq/generic.m4a",
      "./assets/cutscenes/es/hq/generic.mp3",
      "./cutscenes/es/hq/generic.mp3",
      "./assets/cutscenes/es/generic.m4a",
      "./cutscenes/es/generic.m4a",
      "./generic.es.m4a"
    ];
    return Array.from(new Set(spanishSpecific.concat(spanishGeneric, specific, generic)));
  }

  return Array.from(new Set(specific.concat(generic)));
}

function warmNarrationAudioCache(era) {
  if (!era || preloadedNarrationEras.has(era)) return;
  if (document.visibilityState === "hidden") return;
  const sources = narrationAudioSources(era);
  const first = sources[0];
  if (!first) return;

  const audio = new Audio();
  audio.preload = runtimePerformance.performanceLite ? "none" : "metadata";
  audio.src = first;
  audio.__faithEra = era;
  try {
    audio.load();
    preloadedNarrationAudio.push(audio);
    trimPreloadedMediaCaches();
    preloadedNarrationEras.add(era);
  } catch (_) {
    // Ignore preload errors. Runtime playback has additional fallback sources.
  }
}

function nextStageMeta(currentMeta) {
  const index = stages.findIndex((stage) => stage.id === currentMeta.id);
  if (index < 0 || index >= stages.length - 1) return null;
  return stages[index + 1];
}

function warmUpcomingStageMedia(currentMeta) {
  const nextMeta = nextStageMeta(currentMeta);
  if (!nextMeta) return;
  warmPosterCache(nextMeta.theme.era);
  if (runtimePerformance.performanceLite) return;
  warmCutsceneMediaCache(nextMeta.theme.era);
  warmNarrationAudioCache(nextMeta.theme.era);
}

function scheduleIdleWork(task) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(task, { timeout: 500 });
    return;
  }
  window.setTimeout(() => task({ didTimeout: false, timeRemaining: () => 8 }), 16);
}

function scheduleHubMediaWarmup() {
  if (hubMediaWarmupScheduled) return;
  if (document.visibilityState === "hidden") return;
  hubMediaWarmupScheduled = true;

  const eras = storyPreviewEras();
  const warmLimit = runtimePerformance.performanceLite ? Math.min(2, eras.length) : eras.length;
  let idx = 0;
  const run = () => {
    if (idx >= warmLimit) return;
    const era = eras[idx];
    idx += 1;
    warmPosterCache(era);
    if (!runtimePerformance.performanceLite) {
      warmCutsceneMediaCache(era);
      warmNarrationAudioCache(era);
    }
    scheduleIdleWork(run);
  };

  window.setTimeout(() => scheduleIdleWork(run), runtimePerformance.performanceLite ? 1100 : 820);
}

function formatEraLabel(era) {
  const match = timelineThemes.find((item) => item.era === era);
  if (match) return match.name;
  return String(era || "Story").replace(/^[a-z]/, (ch) => ch.toUpperCase());
}

function storyPreviewEras() {
  return Array.from(new Set(timelineThemes.map((theme) => theme.era)));
}

function renderStoryPreviewGrid() {
  if (!storyPreviewGrid) return;
  storyPreviewGrid.innerHTML = "";

  storyPreviewEras().forEach((era) => {
    const eraThemes = timelineThemes.filter((theme) => theme.era === era);
    const stageCount = eraThemes.reduce((total, theme) => total + themeLevelCount(theme) * STAGES_PER_LEVEL, 0);

    const card = document.createElement("article");
    card.className = "story-preview-card";

    const thumb = document.createElement("img");
    thumb.className = "story-preview-thumb";
    thumb.alt = `${formatEraLabel(era)} preview art`;
    const thumbSources = [cutscenePosterSource(era)].concat(stageArtSources());
    let thumbSourceIndex = 0;
    const thumbNext = () => {
      if (thumbSourceIndex >= thumbSources.length) return;
      thumb.src = thumbSources[thumbSourceIndex];
      thumbSourceIndex += 1;
    };
    thumb.addEventListener("error", thumbNext);
    thumbNext();

    const title = document.createElement("h3");
    title.textContent = formatEraLabel(era);

    const line = document.createElement("p");
    line.className = "meta";
    line.textContent = `${stageCount} connected stages`;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost-btn";
    button.textContent = t("watchPreview");
    button.addEventListener("click", () => openStoryTheater(era));

    card.append(thumb, title, line, button);
    storyPreviewGrid.appendChild(card);
  });
}

function narrationScriptForEra(era) {
  const pack = state.language === "es" ? STORY_NARRATION_BY_ERA_ES : STORY_NARRATION_BY_ERA;
  return pack[era] || pack.generic || STORY_NARRATION_BY_ERA.generic;
}

function pickNarrationVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;

  if (state.language === "es") {
    const esQualityName = /paulina|monica|soledad|isabela|helena|luciana|camila|maria|jorge|diego|premium|enhanced|neural|siri/i;
    const ranked = voices
      .filter((v) => /^es[-_]/i.test(v.lang))
      .map((voice) => {
        let score = 0;
        if (/^es[-_]ES$/i.test(voice.lang)) score += 20;
        if (esQualityName.test(voice.name)) score += 30;
        if (/enhanced|premium|neural|siri/i.test(voice.name)) score += 20;
        if (voice.localService) score += 4;
        if (voice.default) score += 3;
        return { voice, score };
      })
      .sort((a, b) => b.score - a.score);
    if (ranked.length) return ranked[0].voice;
  }

  const preferredName = /samantha|ava|allison|victoria|serena|karen|moira|susan|kathy|joanna|salli|emma|olivia|aria|zoe|luna|daniel|alex/i;
  const rankedEnglish = voices
    .filter((v) => /^en[-_]/i.test(v.lang))
    .map((voice) => {
      let score = 0;
      if (/^en[-_]US$/i.test(voice.lang)) score += 25;
      if (preferredName.test(voice.name)) score += 35;
      if (/enhanced|premium|neural|siri/i.test(voice.name)) score += 20;
      if (voice.localService) score += 4;
      if (voice.default) score += 3;
      return { voice, score };
    })
    .sort((a, b) => b.score - a.score);
  if (rankedEnglish.length) return rankedEnglish[0].voice;

  return voices[0] || null;
}

function stopStoryNarration() {
  storyNarrationUtterance = null;

  if (storyNarrationAudio) {
    try {
      storyNarrationAudio.pause();
      storyNarrationAudio.src = "";
      storyNarrationAudio.load();
    } catch (_) {
      // Ignore media teardown errors.
    }
    storyNarrationAudio = null;
  }

  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch (_) {
    // Ignore speech engine teardown errors.
  }
}

function playRecordedNarration(era) {
  if (PREFER_SYSTEM_NARRATION_VOICE) return Promise.resolve(false);
  const sources = narrationAudioSources(era);
  if (!sources.length) return Promise.resolve(false);

  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.volume = 1;
    let idx = 0;

    const cleanup = () => {
      audio.onerror = null;
      audio.oncanplaythrough = null;
    };

    const tryNext = () => {
      if (idx >= sources.length) {
        cleanup();
        resolve(false);
        return;
      }
      audio.src = sources[idx];
      idx += 1;
      try {
        audio.load();
      } catch (_) {
        tryNext();
      }
    };

    audio.oncanplaythrough = () => {
      const attempt = audio.play();
      if (attempt && typeof attempt.then === "function") {
        attempt
          .then(() => {
            cleanup();
            storyNarrationAudio = audio;
            audio.addEventListener(
              "ended",
              () => {
                if (storyNarrationAudio === audio) storyNarrationAudio = null;
              },
              { once: true }
            );
            resolve(true);
          })
          .catch(() => {
            tryNext();
          });
      } else {
        cleanup();
        storyNarrationAudio = audio;
        resolve(true);
      }
    };

    audio.onerror = () => {
      tryNext();
    };

    tryNext();
  });
}

function speakStoryNarration(era, onComplete = null) {

  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    if (typeof onComplete === "function") onComplete();
    return;
  }

  stopStoryNarration();
  const script = narrationScriptForEra(era);
  const spokenScript = (state.language === "en" && era === "david")
    ? script.replace(/Goliath/gi, "go-LIE-uhth")
    : script;
  const utterance = new SpeechSynthesisUtterance(spokenScript);
  const voice = pickNarrationVoice();

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "en-US";
  } else {
    utterance.lang = state.language === "es" ? "es-ES" : "en-US";
  }

  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.rate = state.language === "es" ? 0.9 : 0.86;
  storyNarrationUtterance = utterance;
  let completed = false;
  const complete = () => {
    if (completed) return;
    completed = true;
    if (typeof onComplete === "function") onComplete();
  };
  utterance.onend = () => {
    if (storyNarrationUtterance === utterance) storyNarrationUtterance = null;
    complete();
  };
  utterance.onerror = () => {
    if (storyNarrationUtterance === utterance) storyNarrationUtterance = null;
    complete();
  };

  const speak = () => {
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (_) {
      // Ignore speech playback errors.
    }
  };

  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) {
    const onVoices = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
      if (storyNarrationUtterance !== utterance) return;
      const lateVoice = pickNarrationVoice();
      if (lateVoice) {
        utterance.voice = lateVoice;
        utterance.lang = lateVoice.lang || "en-US";
      }
      speak();
    };
    window.speechSynthesis.addEventListener("voiceschanged", onVoices);
    window.setTimeout(() => {
      if (storyNarrationUtterance === utterance) speak();
    }, 180);
    return;
  }

  speak();
}

function openStoryTheater(era) {
  if (!storyTheaterOverlay || !storyTheaterVideo) return;

  storyTheaterAutoCloseToken += 1;
  const autoCloseToken = storyTheaterAutoCloseToken;
  if (storyTheaterAutoCloseTimer) {
    window.clearTimeout(storyTheaterAutoCloseTimer);
    storyTheaterAutoCloseTimer = 0;
  }

  let storyVideoDone = false;
  let storyNarrationDone = false;
  const maybeAutoClose = () => {
    if (autoCloseToken !== storyTheaterAutoCloseToken) return;
    if (activeStoryTheaterEra !== era) return;
    if (!storyVideoDone || !storyNarrationDone) return;
    if (storyTheaterAutoCloseTimer) window.clearTimeout(storyTheaterAutoCloseTimer);
    storyTheaterAutoCloseTimer = window.setTimeout(() => {
      if (autoCloseToken !== storyTheaterAutoCloseToken) return;
      if (activeStoryTheaterEra !== era) return;
      closeStoryTheater();
    }, 260);
  };
  const markVideoDone = () => {
    if (autoCloseToken !== storyTheaterAutoCloseToken) return;
    storyVideoDone = true;
    maybeAutoClose();
  };
  const markNarrationDone = () => {
    if (autoCloseToken !== storyTheaterAutoCloseToken) return;
    storyNarrationDone = true;
    maybeAutoClose();
  };

  stopStoryStillSequence();
  stopStoryNarration();
  activeStoryTheaterEra = era;
  warmCutsceneMediaCache(era);
  warmPosterCache(era);
  warmNarrationAudioCache(era);

  const firstTheme = timelineThemes.find((theme) => theme.era === era);
  if (storyTheaterTitle) storyTheaterTitle.textContent = `${formatEraLabel(era)} ${t("previewTitleSuffix")}`;

  const sourceRef = firstTheme ? firstTheme.sourceRef : "Bible";
  const missingText = state.language === "es"
    ? `No se encontro el video HQ para ${formatEraLabel(era)}. Agrega assets/cutscenes/hq/${era}.mp4 (o deja solo el arte fijo).`
    : `HQ video not found for ${formatEraLabel(era)}. Add assets/cutscenes/hq/${era}.mp4 (or keep still-art preview only).`;
  if (storyTheaterNote) {
    storyTheaterNote.textContent = `${t("previewRange")}: ${sourceRef} • ${t("narrationAuto")}.`;
  }

  if (storyTheaterProbeTimer) {
    window.clearTimeout(storyTheaterProbeTimer);
    storyTheaterProbeTimer = 0;
  }

  storyTheaterVideo.pause();
  storyTheaterVideo.innerHTML = "";
  storyTheaterVideo.classList.remove("still-preview", "still-contain");
  storyTheaterVideo.style.backgroundImage = "";
  storyTheaterVideo.style.backgroundSize = "";
  storyTheaterVideo.style.backgroundPosition = "";
  storyTheaterVideo.style.backgroundRepeat = "";
  storyTheaterVideo.style.backgroundColor = "";
  storyTheaterVideo.removeAttribute("aria-label");
  storyTheaterVideo.muted = false;
  storyTheaterVideo.volume = 1;
  storyTheaterVideo.controls = !FORCE_STILL_CUTSCENE_MODE;
  storyTheaterVideo.preload = runtimePerformance.performanceLite ? "metadata" : "auto";
  storyTheaterVideo.playsInline = true;
  storyTheaterVideo.setAttribute("playsinline", "true");
  storyTheaterVideo.setAttribute("webkit-playsinline", "true");
  storyTheaterVideo.removeAttribute("poster");

  const videoSources = cutsceneVideoSources(era);
  videoSources.forEach((src) => {
    const source = document.createElement("source");
    source.src = src;
    source.type = "video/mp4";
    storyTheaterVideo.appendChild(source);
  });

  const stillPreviewMode = FORCE_STILL_CUTSCENE_MODE || videoSources.length === 0;
  if (!stillPreviewMode) {
    storyTheaterVideo.poster = cutscenePosterSource(era);
  }
  storyVideoDone = stillPreviewMode;
  if (stillPreviewMode) {
    storyTheaterVideo.classList.add("still-preview");
    const previewFallback = cutscenePosterSource(era);
    storyTheaterVideo.style.backgroundImage = `url("${previewFallback}")`;
    storyTheaterVideo.style.backgroundRepeat = "no-repeat";
    applyStoryStillView(era);
    storyTheaterVideo.controls = false;
    storyTheaterVideo.setAttribute("aria-label", "Still story preview artwork");
    storyTheaterVideo.poster = previewFallback;
    startStoryStillSequence(era);
    if (storyTheaterNote) {
      storyTheaterNote.textContent = state.language === "es"
        ? `${t("previewRange")}: ${sourceRef} • Arte fijo con narracion.`
        : `${t("previewRange")}: ${sourceRef} • Still-art preview with narration.`;
    }
  }

  const onLoaded = () => {
    if (storyTheaterProbeTimer) {
      window.clearTimeout(storyTheaterProbeTimer);
      storyTheaterProbeTimer = 0;
    }
    if (storyTheaterNote) {
      storyTheaterNote.textContent = `${t("previewRange")}: ${sourceRef} • ${t("narrationOn")}.`;
    }
  };

  const onError = () => {
    if (storyTheaterProbeTimer) {
      window.clearTimeout(storyTheaterProbeTimer);
      storyTheaterProbeTimer = 0;
    }
    if (storyTheaterNote) {
      storyTheaterNote.textContent = missingText;
    }
    markVideoDone();
  };

  storyTheaterVideo.addEventListener("loadeddata", onLoaded, { once: true });
  storyTheaterVideo.addEventListener("error", onError, { once: true });
  storyTheaterVideo.addEventListener("ended", markVideoDone, { once: true });

  if (!stillPreviewMode) {
    storyTheaterVideo.load();
  }
  storyTheaterOverlay.classList.remove("hidden");
  updateOverlayLock();
  updateAudioState();

  if (!stillPreviewMode) {
    storyTheaterProbeTimer = window.setTimeout(() => {
      storyTheaterProbeTimer = 0;
      if (storyTheaterVideo.readyState < 2 && storyTheaterNote && !storyTheaterVideo.error) {
        storyTheaterNote.textContent = t("loadingPreview");
      }
    }, 1400);
  }

  const startNarration = () => {
    playRecordedNarration(era).then((played) => {
      if (autoCloseToken !== storyTheaterAutoCloseToken) return;
      if (activeStoryTheaterEra !== era) return;

      if (!played) {
        speakStoryNarration(era, markNarrationDone);
        return;
      }

      const activeAudio = storyNarrationAudio;
      if (activeAudio) {
        if (activeAudio.ended) {
          markNarrationDone();
          return;
        }
        activeAudio.addEventListener("ended", markNarrationDone, { once: true });
        activeAudio.addEventListener("error", markNarrationDone, { once: true });
        return;
      }

      const words = narrationScriptForEra(era).trim().split(/\s+/).filter(Boolean).length;
      const fallbackMs = Math.max(3200, Math.round((words / 2.75) * 1000));
      window.setTimeout(markNarrationDone, fallbackMs);
    });
  };

  if (stillPreviewMode) {
    startNarration();
  } else {
    const attempt = storyTheaterVideo.play();
    if (attempt && typeof attempt.then === "function") {
      attempt
        .then(() => {
          startNarration();
        })
        .catch(() => {
          if (storyTheaterNote) storyTheaterNote.textContent = `${t("previewRange")}: ${sourceRef} • ${t("tapPlay")}.`;
          markVideoDone();
          startNarration();
        });
    } else {
      startNarration();
    }
  }
}

function closeStoryTheater() {
  if (!storyTheaterOverlay) return;
  storyTheaterOverlay.classList.add("hidden");
  activeStoryTheaterEra = null;
  storyTheaterAutoCloseToken += 1;
  stopStoryStillSequence();
  stopStoryNarration();

  if (storyTheaterProbeTimer) {
    window.clearTimeout(storyTheaterProbeTimer);
    storyTheaterProbeTimer = 0;
  }
  if (storyTheaterAutoCloseTimer) {
    window.clearTimeout(storyTheaterAutoCloseTimer);
    storyTheaterAutoCloseTimer = 0;
  }

  if (storyTheaterVideo) {
    storyTheaterVideo.pause();
    storyTheaterVideo.innerHTML = "";
    storyTheaterVideo.classList.remove("still-contain");
    storyTheaterVideo.load();
  }

  trimPreloadedMediaCaches();
  updateOverlayLock();
  updateAudioState();
}

function cutsceneNarrative(meta, activity) {
  const eraLines = {
    genesis: "From the dawn of creation, God reveals His power and purpose.",
    patriarchs: "God keeps covenant promises through Abraham's family line.",
    exodus: "God delivers His people with mighty acts and faithful mercy.",
    sinai: "At Sinai, God gives covenant words and calls His people to holiness.",
    wilderness: "God teaches trust and obedience in the wilderness journey.",
    conquest: "God goes before His people into the promised land.",
    judges: "Even in broken cycles, God raises help for His people.",
    samuel: "God's voice calls His servants to listen and obey.",
    saul: "Kingship begins, and obedience is tested before the Lord.",
    david: "Courage rises when trust is anchored in the Lord."
  };

  const activityLines = {
    quiz: "Answer with confidence from God's Word.",
    spelling: "Type carefully. Every letter matters.",
    order: "Set the events in their faithful order.",
    fact: "Build the truth in the right sequence.",
    interactive: "Use skill and timing to complete the challenge.",
    exhausted: "No-repeat mode is on, so this question pool is temporarily exhausted."
  };

  const eraLine = eraLines[meta.theme.era] || "God's Word leads every step of this journey.";
  const keyLine = activity.type === "interactive"
    ? `${activity.mode.label} is next. ${activityLines.interactive}`
    : activityLines[activity.type] || "Complete this stage to continue.";

  return { eraLine, keyLine };
}

function renderStageActivity(meta, activity) {
  if (!activity || typeof activity !== "object") {
    renderPoolExhausted(meta, buildQuestionPoolExhaustedActivity(meta));
    return;
  }

  if (activity.type === "quiz") {
    renderQuiz(meta, activity);
  } else if (activity.type === "truefalse") {
    renderTrueFalse(meta, activity);
  } else if (activity.type === "matching") {
    renderMatching(meta, activity);
  } else if (activity.type === "spelling") {
    renderSpelling(meta, activity);
  } else if (activity.type === "order") {
    renderOrder(meta, activity);
  } else if (activity.type === "fact") {
    renderFact(meta, activity);
  } else if (activity.type === "exhausted") {
    renderPoolExhausted(meta, activity);
  } else {
    renderInteractive(meta, activity.mode, activity.sourceRef);
  }
}

function startStageCutscene(meta, activity) {
  clearActiveChallenge();
  stopStageStillSequence();
  activityPanel.innerHTML = "";
  warmCutsceneMediaCache(meta.theme.era);
  warmPosterCache(meta.theme.era);
  warmNarrationAudioCache(meta.theme.era);
  warmUpcomingStageMedia(meta);

  const sourceRef = activity.sourceRef || meta.theme.sourceRef;
  const narrative = cutsceneNarrative(meta, activity);

  const card = document.createElement("section");
  card.className = "cutscene-card";

  const media = document.createElement("div");
  media.className = "cutscene-media";

const video = document.createElement("video");
video.className = "cutscene-video";
video.muted = true;
video.autoplay = true;
video.loop = true;
video.playsInline = true;
video.preload = runtimePerformance.performanceLite ? "metadata" : "auto";
video.controls = false;
video.poster = cutscenePosterSource(meta.theme.era);
video.setAttribute("playsinline", "true");
video.setAttribute("webkit-playsinline", "true");

cutsceneVideoSources(meta.theme.era).forEach((src) => {
  const source = document.createElement("source");
  source.src = src;
  source.type = "video/mp4";
  video.appendChild(source);
});

const art = document.createElement("img");
art.className = "cutscene-art";
art.alt = `${meta.theme.name} story art`;
applyStageStillView(art, meta.theme.era);
assignImageWithFallback(art, cutsceneStillCandidates(meta.theme.era));
startStageStillSequence(art, meta.theme.era);

const showVideo = () => {
  media.classList.add("has-video");
};

const hideVideo = () => {
  media.classList.remove("has-video");
};

const tryPlay = () => {
  const attempt = video.play();
  if (attempt && typeof attempt.catch === "function") {
    attempt.catch(() => {
      hideVideo();
    });
  }
};

video.addEventListener("canplay", tryPlay);
video.addEventListener("loadeddata", showVideo);
video.addEventListener("playing", showVideo);
video.addEventListener("error", hideVideo);

const mediaLabel = document.createElement("p");
mediaLabel.className = "cutscene-label";
mediaLabel.textContent = `${meta.theme.name} - ${t("levelWordSingular")} ${meta.level}`;

const mediaScript = document.createElement("p");
mediaScript.className = "cutscene-script";
mediaScript.textContent = narrationScriptForEra(meta.theme.era);

if (runtimePerformance.performanceLite) {
  media.classList.add("perf-lite");
}

media.append(video, art, mediaLabel, mediaScript);


  const title = document.createElement("h3");
  title.textContent = t("storyIntroTitle");

  const line1 = document.createElement("p");
  line1.className = "cutscene-line";
  line1.textContent = narrative.eraLine;

  const line2 = document.createElement("p");
  line2.className = "cutscene-line";
  line2.textContent = `${meta.theme.fact} ${narrative.keyLine}`;

  const verse = document.createElement("p");
  verse.className = "source-ref";
  verse.textContent = `${t("keyVerseLabel")}: ${sourceRef}`;

  const footer = document.createElement("div");
  footer.className = "cutscene-footer";

  const progress = document.createElement("div");
  progress.className = "cutscene-progress";

  const fill = document.createElement("span");
  fill.style.width = "0%";
  progress.appendChild(fill);

  const timeText = document.createElement("p");
  timeText.className = "meta cutscene-time";
  timeText.textContent = `${t("startingInLabel")} ${Math.ceil(CUTSCENE_DURATION_MS / 1000)}s`;

  const skipBtn = document.createElement("button");
  skipBtn.type = "button";
  skipBtn.className = "ghost-btn";
  skipBtn.textContent = t("skipIntro");
  skipBtn.dataset.noClickSfx = "true";

  footer.append(progress, timeText, skipBtn);
  card.append(media, title, line1, line2, verse, footer);
  activityPanel.append(card);

  let raf = 0;
  let finished = false;
  const stageId = meta.id;
  const startedAt = performance.now();
  let lastPaintedAt = startedAt - CUTSCENE_PROGRESS_FRAME_MS_LITE;

  const cleanup = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    skipBtn.removeEventListener("click", onSkip);
    video.pause();
    stopStageStillSequence();
    stopStoryNarration();
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    cleanup();
    activeCutsceneCleanup = null;

    if (state.activeStage !== stageId) return;
    renderStageActivity(meta, activity);
  };

  const onSkip = () => {
    finish();
  };

  const tick = (now) => {
    if (finished) return;

    const elapsed = now - startedAt;
    if (elapsed >= CUTSCENE_DURATION_MS) {
      finish();
      return;
    }

    if (runtimePerformance.performanceLite && now - lastPaintedAt < CUTSCENE_PROGRESS_FRAME_MS_LITE) {
      raf = window.requestAnimationFrame(tick);
      return;
    }

    lastPaintedAt = now;
    const pct = Math.max(0, Math.min(1, elapsed / CUTSCENE_DURATION_MS));
    fill.style.width = `${Math.round(pct * 100)}%`;

    const secondsLeft = Math.max(0, Math.ceil((CUTSCENE_DURATION_MS - elapsed) / 1000));
    timeText.textContent = secondsLeft > 0 ? `${t("startingInLabel")} ${secondsLeft}s` : t("startingNowLabel");

    raf = window.requestAnimationFrame(tick);
  };

  skipBtn.addEventListener("click", onSkip);
  tryPlay();
  playRecordedNarration(meta.theme.era).then((played) => {
    if (!played) speakStoryNarration(meta.theme.era);
  });
  activeCutsceneCleanup = () => {
    finished = true;
    cleanup();
  };
  raf = window.requestAnimationFrame(tick);
}

function openStage(stageId) {
  const meta = getStageMeta(stageId);
  if (!meta) return;

  warmPosterCache(meta.theme.era);
  warmCutsceneMediaCache(meta.theme.era);
  warmNarrationAudioCache(meta.theme.era);
  warmUpcomingStageMedia(meta);

  clearActiveChallenge();
  stopStoryNarration();
  state.activeStage = stageId;
  state.lastStage = stageId;
  persist();
  activityPanel.innerHTML = "";
  activityOverlay.classList.remove("hidden");
  updateOverlayLock();

  updateAudioState();
  playSfx("stage-open");

  if (!canPlayStage()) {
    const warn = document.createElement("p");
    warn.className = "feedback warn";
    warn.textContent = t("noLivesContinue");
    activityPanel.append(warn);
    return;
  }
  const activity = activityFor(meta);
  persist();

  renderStageActivity(meta, activity);
}

function renderQuiz(meta, activity) {
  activityPanel.innerHTML = "";
  let selectedIndex = -1;
  const header = renderHeader(meta);
  const prompt = document.createElement("p");
  prompt.textContent = activity.prompt;
  const hint = createChallengeHint("Keyboard: press 1-4 to choose an answer, then Enter to submit.");
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef) : null;
  const optionsWrap = document.createElement("div");
  optionsWrap.className = "quiz-options";
  const feedback = document.createElement("p");
  feedback.className = "feedback";
  let selected = "";
  const optionButtons = [];

  const selectOption = (index) => {
    if (index < 0 || index >= activity.options.length) return;
    selectedIndex = index;
    selected = activity.options[index];
    optionButtons.forEach((node, nodeIndex) => {
      node.classList.toggle("selected", nodeIndex === index);
    });
  };

  activity.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.type = "button";
    btn.textContent = option;
    btn.addEventListener("click", () => {
      selectOption(index);
    });
    optionButtons.push(btn);
    optionsWrap.appendChild(btn);
  });

  const submit = document.createElement("button");
  submit.className = "cta-btn";
  submit.type = "button";
  submit.textContent = t("checkAnswer");
  submit.addEventListener("click", () => {
    if (!canPlayStage()) {
      feedback.className = "feedback warn";
      feedback.textContent = t("noLivesShort");
      return;
    }

    if (!selected) {
      feedback.className = "feedback warn";
      feedback.textContent = t("pickOptionFirst");
      return;
    }

    const isCorrect = selected === activity.answer;
    optionButtons.forEach((node) => {
      node.classList.remove("selected", "correct", "wrong");
      if (node.textContent === activity.answer) node.classList.add("correct");
      if (node.textContent === selected && !isCorrect) node.classList.add("wrong");
    });

    if (isCorrect) {
      feedback.className = "feedback ok";
      feedback.textContent = t("correctStageComplete");
      playSfx("success");
      completeStage(meta);
    } else {
      const hasLives = loseLife();
      feedback.className = "feedback warn";
      feedback.textContent = hasLives ? t("notYetTryAgain") : t("outOfLivesContinue");
      playSfx("fail");
      queueStageAutoClose(meta.id);
    }
  });

  const onKey = (event) => {
    if (state.activeStage !== meta.id) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (/^[1-4]$/.test(event.key)) {
      const index = Number(event.key) - 1;
      if (index < optionButtons.length) {
        event.preventDefault();
        selectOption(index);
      }
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectOption(Math.min(optionButtons.length - 1, selectedIndex + 1));
      return;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectOption(Math.max(0, selectedIndex <= 0 ? 0 : selectedIndex - 1));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      submit.click();
    }
  };

  window.addEventListener("keydown", onKey);
  activeCleanup = () => {
    window.removeEventListener("keydown", onKey);
  };

  if (shouldShowQuestionSource() && source) {
    activityPanel.append(header, prompt, hint, source, optionsWrap, submit, feedback);
  } else {
    activityPanel.append(header, prompt, hint, optionsWrap, submit, feedback);
  }
}

function renderTrueFalse(meta, activity) {
  activityPanel.innerHTML = "";
  const header = renderHeader(meta);
  const prompt = document.createElement("p");
  prompt.textContent = activity.prompt;
  const clue = document.createElement("p");
  clue.className = "fact";
  clue.textContent = `${challengeCopy("Clue", "Pista")}: ${activity.statement}`;
  const claim = document.createElement("p");
  claim.className = "fact";
  claim.textContent = `${challengeCopy("Claim", "Afirmación")}: ${activity.claim}`;
  const hint = createChallengeHint(challengeCopy(
    "Keyboard: press T or F, then Enter to submit.",
    "Teclado: presiona V o F, luego Enter para enviar."
  ));
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef) : null;
  const optionsWrap = document.createElement("div");
  optionsWrap.className = "quiz-options";
  const feedback = document.createElement("p");
  feedback.className = "feedback";
  const optionButtons = [];
  let selected = null;

  const options = [
    { label: challengeCopy("True", "Verdadero"), value: true },
    { label: challengeCopy("False", "Falso"), value: false }
  ];

  const selectOption = (value) => {
    selected = value;
    optionButtons.forEach((button, index) => {
      button.classList.toggle("selected", options[index].value === value);
    });
  };

  options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.type = "button";
    btn.textContent = option.label;
    btn.addEventListener("click", () => {
      selectOption(option.value);
    });
    optionButtons.push(btn);
    optionsWrap.appendChild(btn);
  });

  const submit = document.createElement("button");
  submit.className = "cta-btn";
  submit.type = "button";
  submit.textContent = t("checkAnswer");
  submit.addEventListener("click", () => {
    if (!canPlayStage()) {
      feedback.className = "feedback warn";
      feedback.textContent = t("noLivesShort");
      return;
    }

    if (selected === null) {
      feedback.className = "feedback warn";
      feedback.textContent = challengeCopy("Choose true or false first.", "Elige verdadero o falso primero.");
      return;
    }

    const isCorrect = selected === activity.answer;
    optionButtons.forEach((node, index) => {
      node.classList.remove("selected", "correct", "wrong");
      if (options[index].value === activity.answer) node.classList.add("correct");
      if (options[index].value === selected && !isCorrect) node.classList.add("wrong");
    });

    if (isCorrect) {
      feedback.className = "feedback ok";
      feedback.textContent = challengeCopy("Correct. Stage complete.", "Correcto. Etapa completada.");
      playSfx("success");
      completeStage(meta);
    } else {
      const hasLives = loseLife();
      feedback.className = "feedback warn";
      feedback.textContent = hasLives ? t("notYetTryAgain") : t("outOfLivesContinue");
      playSfx("fail");
      queueStageAutoClose(meta.id);
    }
  });

  const onKey = (event) => {
    if (state.activeStage !== meta.id) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (["t", "T", "v", "V", "1"].includes(event.key)) {
      event.preventDefault();
      selectOption(true);
      return;
    }
    if (["f", "F", "2"].includes(event.key)) {
      event.preventDefault();
      selectOption(false);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      submit.click();
    }
  };

  window.addEventListener("keydown", onKey);
  activeCleanup = () => {
    window.removeEventListener("keydown", onKey);
  };

  if (shouldShowQuestionSource() && source) {
    activityPanel.append(header, prompt, clue, claim, hint, source, optionsWrap, submit, feedback);
  } else {
    activityPanel.append(header, prompt, clue, claim, hint, optionsWrap, submit, feedback);
  }
}

function renderMatching(meta, activity) {
  activityPanel.innerHTML = "";
  const header = renderHeader(meta);
  const prompt = document.createElement("p");
  prompt.textContent = activity.prompt;
  const hint = createChallengeHint(challengeCopy(
    "Keyboard: use Tab to move between clues, arrow keys to choose, then Enter to submit.",
    "Teclado: usa Tab para moverte entre pistas, flechas para elegir y Enter para enviar."
  ));
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef) : null;
  const feedback = document.createElement("p");
  feedback.className = "feedback";
  const wrap = document.createElement("div");
  wrap.className = "toggle-list";
  const selects = [];

  activity.pairs.forEach((pair, index) => {
    const row = document.createElement("div");
    row.className = "order-item";
    const label = document.createElement("label");
    label.className = "toggle-row";
    label.style.display = "grid";
    label.style.gap = "0.45rem";

    const clue = document.createElement("span");
    clue.textContent = `${index + 1}. ${pair.left}`;

    const select = document.createElement("select");
    select.className = "language-select";
    const blank = document.createElement("option");
    blank.value = "";
    blank.textContent = challengeCopy("Choose the match", "Elige la pareja");
    select.appendChild(blank);

    activity.options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });

    label.append(clue, select);
    row.appendChild(label);
    wrap.appendChild(row);
    selects.push({ pair, select });
  });

  const submit = document.createElement("button");
  submit.className = "cta-btn";
  submit.type = "button";
  submit.textContent = challengeCopy("Check Matches", "Revisar parejas");
  submit.addEventListener("click", () => {
    if (!canPlayStage()) {
      feedback.className = "feedback warn";
      feedback.textContent = t("noLivesShort");
      return;
    }

    if (selects.some(({ select }) => !select.value)) {
      feedback.className = "feedback warn";
      feedback.textContent = challengeCopy("Finish every match first.", "Completa cada pareja primero.");
      return;
    }

    const chosenValues = selects.map(({ select }) => select.value);
    const uniqueChoices = new Set(chosenValues);
    if (uniqueChoices.size !== chosenValues.length) {
      feedback.className = "feedback warn";
      feedback.textContent = challengeCopy("Use each answer only once.", "Usa cada respuesta solo una vez.");
      return;
    }

    const isCorrect = selects.every(({ pair, select }) => select.value === pair.right);
    if (isCorrect) {
      feedback.className = "feedback ok";
      feedback.textContent = challengeCopy("Great matching. Stage complete.", "Buen trabajo relacionando. Etapa completada.");
      playSfx("success");
      completeStage(meta);
    } else {
      const hasLives = loseLife();
      feedback.className = "feedback warn";
      feedback.textContent = hasLives ? challengeCopy("Not quite. Try the matches again.", "Aún no. Intenta relacionarlas otra vez.") : t("outOfLivesContinue");
      playSfx("fail");
      queueStageAutoClose(meta.id);
    }
  });

  const onKey = (event) => {
    if (state.activeStage !== meta.id) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === "Enter" && document.activeElement && document.activeElement.tagName !== "SELECT") {
      event.preventDefault();
      submit.click();
    }
  };

  window.addEventListener("keydown", onKey);
  activeCleanup = () => {
    window.removeEventListener("keydown", onKey);
  };

  if (shouldShowQuestionSource() && source) {
    activityPanel.append(header, prompt, hint, source, wrap, submit, feedback);
  } else {
    activityPanel.append(header, prompt, hint, wrap, submit, feedback);
  }
}

function renderSpelling(meta, activity) {
  activityPanel.innerHTML = "";
  const header = renderHeader(meta);
  const prompt = document.createElement("p");
  prompt.textContent = activity.prompt;
  const clue = activity.clue ? createSkillStatus(activity.clue) : null;
  if (clue) clue.className = "fact-build";
  const hint = createChallengeHint(activity.clue ? "Keyboard: type the missing Bible word and press Enter." : "Keyboard: type your answer and press Enter.");
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef) : null;

  const input = document.createElement("input");
  input.className = "answer-input";
  input.type = "text";
  input.autocapitalize = "off";
  input.autocomplete = "off";
  input.spellcheck = false;
  input.placeholder = t("typeAnswerPlaceholder");
  input.autocorrect = "off";
  input.enterKeyHint = "done";
  input.inputMode = /^\d+$/.test(String(activity.answer || "")) ? "numeric" : "text";

  const submit = document.createElement("button");
  submit.className = "cta-btn";
  submit.type = "button";
  submit.textContent = t("checkSpelling");

  const feedback = document.createElement("p");
  feedback.className = "feedback";

  const checkAnswer = () => {
    if (!canPlayStage()) {
      feedback.className = "feedback warn";
      feedback.textContent = t("noLivesShort");
      return;
    }

    const attempt = normalizeSpellingAnswer(input.value);
    const answer = normalizeSpellingAnswer(activity.answer);

    if (!attempt) {
      feedback.className = "feedback warn";
      feedback.textContent = t("typeAnswerFirst");
      return;
    }

    if (attempt === answer) {
      feedback.className = "feedback ok";
      feedback.textContent = t("correctSpellingComplete");
      playSfx("success");
      input.blur();
      completeStage(meta, null);
    } else {
      const hasLives = loseLife();
      feedback.className = "feedback warn";
      feedback.textContent = hasLives
        ? t("notCorrectSpellingRetry")
        : t("outOfLivesContinue");
      playSfx("fail");
      queueStageAutoClose(meta.id);
    }
  };

  submit.addEventListener("click", checkAnswer);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkAnswer();
  });
  activeCleanup = null;

  if (shouldShowQuestionSource() && source) {
    activityPanel.append(header, prompt, ...(clue ? [clue] : []), hint, source, input, submit, feedback);
  } else {
    activityPanel.append(header, prompt, ...(clue ? [clue] : []), hint, input, submit, feedback);
  }
}

function renderOrder(meta, activity) {

  activityPanel.innerHTML = "";
  const header = renderHeader(meta);
  const prompt = document.createElement("p");
  prompt.textContent = activity.prompt;
  const hint = createChallengeHint("Keyboard: Up/Down selects a line, Shift+Up/Down moves it, Enter checks, U undoes, and R resets.");
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef) : null;
  const listWrap = document.createElement("div");
  listWrap.className = "order-list";
  const status = document.createElement("p");
  status.className = "skill-status";
  const feedback = document.createElement("p");
  feedback.className = "feedback";

  let current = activity.nearShuffle ? nearlyOrdered(activity.items) : shuffled(activity.items);
  let moves = 0;
  let selectedIndex = 0;

  const updateStatus = () => {
    status.textContent = `${t("movesLabel")}: ${moves}/${activity.maxMoves}`;
  };

  const redraw = () => {
    listWrap.innerHTML = "";
    current.forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "order-item";
      row.tabIndex = 0;
      row.classList.toggle("selected", idx === selectedIndex);
      row.addEventListener("click", () => {
        selectedIndex = idx;
        redraw();
      });

      const text = document.createElement("span");
      text.textContent = `${idx + 1}. ${item}`;

      const controls = document.createElement("div");
      controls.className = "order-controls";

      const up = document.createElement("button");
      up.className = "tiny-btn";
      up.type = "button";
      up.textContent = "↑";
      up.disabled = idx === 0;
      up.addEventListener("click", () => {
        selectedIndex = idx;
        [current[idx], current[idx - 1]] = [current[idx - 1], current[idx]];
        moves += 1;
        selectedIndex = Math.max(0, idx - 1);
        updateStatus();
        redraw();
      });

      const down = document.createElement("button");
      down.className = "tiny-btn";
      down.type = "button";
      down.textContent = "↓";
      down.disabled = idx === current.length - 1;
      down.addEventListener("click", () => {
        selectedIndex = idx;
        [current[idx], current[idx + 1]] = [current[idx + 1], current[idx]];
        moves += 1;
        selectedIndex = Math.min(current.length - 1, idx + 1);
        updateStatus();
        redraw();
      });

      controls.append(up, down);
      row.append(text, controls);
      listWrap.appendChild(row);
    });
  };

  updateStatus();
  redraw();

  const submit = document.createElement("button");
  submit.type = "button";
  submit.className = "cta-btn";
  submit.textContent = t("checkOrder");
  submit.addEventListener("click", () => {
    if (!canPlayStage()) {
      feedback.className = "feedback warn";
      feedback.textContent = t("noLivesShort");
      return;
    }

    if (moves > activity.maxMoves) {
      const hasLives = loseLife();
      feedback.className = "feedback warn";
      feedback.textContent = hasLives
        ? `${t("moveLimitExceeded")} (${activity.maxMoves}).`
        : t("outOfLivesContinue");
      playSfx("fail");
      queueStageAutoClose(meta.id);
      return;
    }

    const ok = current.every((item, idx) => item === activity.items[idx]);
    if (ok) {
      feedback.className = "feedback ok";
      feedback.textContent = t("greatSequenceComplete");
      playSfx("success");
      completeStage(meta);
    } else {
      const hasLives = loseLife();
      feedback.className = "feedback warn";
      feedback.textContent = hasLives ? t("orderOffRetry") : t("outOfLivesContinue");
      playSfx("fail");
      queueStageAutoClose(meta.id);
    }
  });

  const moveSelected = (delta) => {
    const nextIndex = selectedIndex + delta;
    if (nextIndex < 0 || nextIndex >= current.length) return;
    [current[selectedIndex], current[nextIndex]] = [current[nextIndex], current[selectedIndex]];
    selectedIndex = nextIndex;
    moves += 1;
    updateStatus();
    redraw();
  };

  const onKey = (event) => {
    if (state.activeStage !== meta.id) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (event.shiftKey) {
        moveSelected(-1);
      } else {
        selectedIndex = Math.max(0, selectedIndex - 1);
        redraw();
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (event.shiftKey) {
        moveSelected(1);
      } else {
        selectedIndex = Math.min(current.length - 1, selectedIndex + 1);
        redraw();
      }
      return;
    }

    if (event.key === "u" || event.key === "U") {
      event.preventDefault();
      undo.click();
      return;
    }

    if (event.key === "r" || event.key === "R") {
      event.preventDefault();
      reset.click();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      submit.click();
    }
  };

  window.addEventListener("keydown", onKey);
  activeCleanup = () => {
    window.removeEventListener("keydown", onKey);
  };

  if (shouldShowQuestionSource() && source) {
    activityPanel.append(header, prompt, hint, source, status, listWrap, submit, feedback);
  } else {
    activityPanel.append(header, prompt, hint, status, listWrap, submit, feedback);
  }
}

function renderFact(meta, activity) {
  activityPanel.innerHTML = "";
  const header = renderHeader(meta);
  const prompt = document.createElement("p");
  prompt.textContent = activity.prompt;
  const hint = createChallengeHint("Keyboard: Enter checks, U undoes, and R resets the phrase builder.");
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef) : null;

  let pool = activity.parts.slice();
  const chosen = activity.prefilled ? activity.prefilled.slice() : [];

  const buildLine = document.createElement("p");
  buildLine.className = "fact";
  const poolWrap = document.createElement("div");
  poolWrap.className = "quiz-options";
  const controls = document.createElement("div");
  controls.className = "order-controls";
  const feedback = document.createElement("p");
  feedback.className = "feedback";

  const draw = () => {
    buildLine.textContent = `${t("buildLabel")}: ${chosen.join(" ")}`;
    poolWrap.innerHTML = "";

    pool.forEach((word, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.type = "button";
      btn.textContent = word;
      btn.addEventListener("click", () => {
        chosen.push(word);
        pool.splice(idx, 1);
        draw();
      });
      poolWrap.appendChild(btn);
    });
  };

  const undo = document.createElement("button");
  undo.className = "ghost-btn";
  undo.type = "button";
  undo.textContent = t("undoLabel");
  undo.addEventListener("click", () => {
    if (!chosen.length || (activity.prefilled && chosen.length <= activity.prefilled.length)) return;
    pool.push(chosen.pop());
    draw();
  });

  const reset = document.createElement("button");
  reset.className = "ghost-btn";
  reset.type = "button";
  reset.textContent = t("resetLabel");
  reset.addEventListener("click", () => {
    pool = activity.parts.slice();
    chosen.splice(0, chosen.length, ...(activity.prefilled ? activity.prefilled : []));
    draw();
  });

  const submit = document.createElement("button");
  submit.className = "cta-btn";
  submit.type = "button";
  submit.textContent = t("checkFact");
  submit.addEventListener("click", () => {
    if (!canPlayStage()) {
      feedback.className = "feedback warn";
      feedback.textContent = t("noLivesShort");
      return;
    }

    if (chosen.length < activity.answerParts.length) {
      feedback.className = "feedback warn";
      feedback.textContent = t("finishFactFirst");
      return;
    }

    const attempt = chosen.slice(0, activity.answerParts.length).join(" ");
    const answer = activity.answerParts.join(" ");
    if (attempt === answer && chosen.length === activity.answerParts.length) {
      feedback.className = "feedback ok";
      feedback.textContent = t("factCompleteCleared");
      playSfx("success");
      completeStage(meta);
    } else {
      const hasLives = loseLife();
      feedback.className = "feedback warn";
      feedback.textContent = hasLives ? t("factNotCorrectYet") : t("outOfLivesContinue");
      playSfx("fail");
      queueStageAutoClose(meta.id);
    }
  });

  const onKey = (event) => {
    if (state.activeStage !== meta.id) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === "u" || event.key === "U") {
      event.preventDefault();
      undo.click();
      return;
    }

    if (event.key === "r" || event.key === "R") {
      event.preventDefault();
      reset.click();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      submit.click();
    }
  };

  window.addEventListener("keydown", onKey);
  activeCleanup = () => {
    window.removeEventListener("keydown", onKey);
  };

  controls.append(undo, reset);
  draw();
  if (shouldShowQuestionSource()) {
    activityPanel.append(header, prompt, hint, source, buildLine, poolWrap, controls, submit, feedback);
  } else {
    activityPanel.append(header, prompt, hint, buildLine, poolWrap, controls, submit, feedback);
  }
}

function renderPoolExhausted(meta, activity) {
  activityPanel.innerHTML = "";
  const header = renderHeader(meta);
  const prompt = document.createElement("p");
  prompt.textContent = activity.prompt || "This question pool is exhausted for now.";

  const source = renderSourceVerse(activity.sourceRef || meta.theme.sourceRef);

  const feedback = document.createElement("p");
  feedback.className = "feedback warn";
  feedback.textContent = activity.message || "No-repeat mode is on, and all available items have already been used.";

  const detail = document.createElement("p");
  detail.className = "meta";
  detail.textContent = activity.detail || "Try another stage, switch difficulty, or reset progress to refresh the question pool.";

  const actions = document.createElement("div");
  actions.className = "order-controls";

  const closeBtn = document.createElement("button");
  closeBtn.className = "ghost-btn";
  closeBtn.type = "button";
  closeBtn.textContent = t("close") || "Close";
  closeBtn.addEventListener("click", () => closeActivity());

  actions.append(closeBtn);

  if (shouldShowQuestionSource()) {
    activityPanel.append(header, prompt, source, feedback, detail, actions);
  } else {
    activityPanel.append(header, prompt, feedback, detail, actions);
  }
}

function renderInteractive(meta, mode, sourceRef) {

  activityPanel.innerHTML = "";
  const header = renderHeader(meta);
  const prompt = document.createElement("p");
  const promptText = mode.storyPrompt || t("challengePrompt");
  prompt.textContent = `${mode.label} (${currentDifficulty().label}): ${promptText}`;
  const source = shouldShowQuestionSource() && sourceRef ? renderSourceVerse(sourceRef) : null;
  const feedback = document.createElement("p");
  feedback.className = "feedback";

  if (source) {
    activityPanel.append(header, prompt, source);
  } else {
    activityPanel.append(header, prompt);
  }

  if (mode.engine === "pattern") {
    activeCleanup = renderPattern(meta, mode, feedback);
  } else if (mode.engine === "balance") {
    activeCleanup = renderBalance(meta, mode, feedback);
  } else if (mode.engine === "route") {
    activeCleanup = renderRoute(meta, mode, feedback);
  } else if (mode.engine === "discern") {
    activeCleanup = renderDiscern(meta, mode, feedback);
  } else if (mode.engine === "timing") {
    activeCleanup = renderTiming(meta, mode, feedback);
  } else if (mode.engine === "collect") {
    activeCleanup = renderCollect(meta, mode, feedback);
  } else if (mode.engine === "dodge") {
    activeCleanup = renderDodge(meta, mode, feedback);
  } else {
    activeCleanup = renderSlingshot(meta, mode, feedback);
  }

  activityPanel.append(feedback);
}

function canvasPointerPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return { x: 0, y: 0 };
  }

  return {
    x: ((event.clientX - rect.left) * canvas.width) / rect.width,
    y: ((event.clientY - rect.top) * canvas.height) / rect.height
  };
}

function renderPattern(meta, mode, feedback) {
  const prompt = document.createElement("p");
  prompt.textContent = mode.secondaryPrompt || "Watch the sequence, then repeat it from memory.";
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: press 1-4 to repeat the sequence after it plays.");
  const status = createSkillStatus("");
  activityPanel.append(prompt, hint, status);

  const pads = Array.isArray(mode.pads) && mode.pads.length >= 4
    ? mode.pads.slice(0, 4)
    : [
      { icon: "1", label: "One" },
      { icon: "2", label: "Two" },
      { icon: "3", label: "Three" },
      { icon: "4", label: "Four" }
    ];

  const padWrap = document.createElement("div");
  padWrap.style.display = "grid";
  padWrap.style.gridTemplateColumns = "repeat(2, minmax(120px, 1fr))";
  padWrap.style.gap = "0.9rem";
  padWrap.style.marginTop = "0.75rem";
  activityPanel.append(padWrap);

  const padButtons = pads.map((pad, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost-btn";
    button.style.minHeight = "90px";
    button.style.display = "flex";
    button.style.flexDirection = "column";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.gap = "0.35rem";
    button.style.fontSize = "1rem";
    button.style.fontWeight = "700";
    button.dataset.padIndex = String(index);
    button.innerHTML = `<span style="font-size:1.45rem">${pad.icon}</span><span>${index + 1}. ${pad.label}</span>`;
    padWrap.append(button);
    return button;
  });

  const sequences = Array.isArray(mode.sequences) && mode.sequences.length
    ? mode.sequences.map((sequence) => sequence.slice())
    : [[0, 1, 2], [0, 2, 3], [1, 2, 0, 3], [0, 1, 2, 3]];
  const totalRounds = Math.min(mode.rounds || sequences.length, sequences.length);
  const flashMs = Math.max(170, Math.floor((mode.playbackMs || 500) * 0.64));
  const gapMs = Math.max(120, Math.floor((mode.playbackMs || 500) * 0.38));
  const timers = new Set();
  let round = 0;
  let misses = 0;
  let inputIndex = 0;
  let accepting = false;
  let running = true;

  const queue = (callback, delay) => {
    const timer = setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
  };

  const clearTimers = () => {
    timers.forEach((timer) => clearTimeout(timer));
    timers.clear();
  };

  const setPadState = (index, state) => {
    const button = padButtons[index];
    if (!button) return;
    if (state === "play") {
      button.style.transform = "translateY(-3px)";
      button.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.08), 0 0 0 2px rgba(213,169,72,0.42), 0 14px 30px rgba(213,169,72,0.22)";
      button.style.background = "linear-gradient(180deg, rgba(213,169,72,0.22), rgba(18,27,40,0.96))";
    } else if (state === "good") {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 0 0 2px rgba(130,211,146,0.45), 0 14px 30px rgba(70,170,88,0.18)";
      button.style.background = "linear-gradient(180deg, rgba(72,148,88,0.22), rgba(18,27,40,0.96))";
    } else if (state === "bad") {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 0 0 2px rgba(230,132,132,0.45), 0 14px 30px rgba(170,70,70,0.2)";
      button.style.background = "linear-gradient(180deg, rgba(145,52,52,0.24), rgba(18,27,40,0.96))";
    } else {
      button.style.transform = "";
      button.style.boxShadow = "";
      button.style.background = "";
    }
  };

  const updateStatus = (line) => {
    const lead = line ? `${line} ` : "";
    status.textContent = `${lead}${challengeCopy("Round", "Ronda")} ${Math.min(round + 1, totalRounds)}/${totalRounds} | ${t("missesLabel")}: ${misses}/${mode.maxMisses}`;
  };

  const failPattern = () => {
    misses += 1;
    if (misses >= mode.maxMisses) {
      running = false;
      const hasLives = loseLife();
      feedback.className = "feedback warn";
      feedback.textContent = hasLives ? t("challengeFailedReplay") : t("outOfLivesContinue");
      playSfx("fail");
      queueStageAutoClose(meta.id);
      return;
    }
    feedback.className = "feedback warn";
    feedback.textContent = challengeCopy("Wrong pattern. Watch it again.", "Patron incorrecto. Miralo de nuevo.");
    playSfx("fail");
    queue(playRound, 720);
  };

  const completePatternRound = () => {
    if (round >= totalRounds - 1) {
      running = false;
      feedback.className = "feedback ok";
      feedback.textContent = t("challengeComplete");
      playSfx("success");
      completeStage(meta, mode);
      return;
    }
    feedback.className = "feedback ok";
    feedback.textContent = challengeCopy("Pattern complete. Next round.", "Patron completo. Siguiente ronda.");
    playSfx("hit");
    round += 1;
    queue(playRound, 650);
  };

  const handlePad = (index) => {
    if (!running || !accepting || !canPlayStage()) return;
    const sequence = sequences[Math.min(round, sequences.length - 1)];
    const expected = sequence[inputIndex];
    setPadState(index, index === expected ? "good" : "bad");
    queue(() => setPadState(index, "idle"), 190);

    if (index !== expected) {
      accepting = false;
      inputIndex = 0;
      failPattern();
      return;
    }

    inputIndex += 1;
    if (inputIndex >= sequence.length) {
      accepting = false;
      inputIndex = 0;
      completePatternRound();
    }
  };

  function playRound() {
    if (!running) return;
    clearTimers();
    feedback.textContent = "";
    accepting = false;
    inputIndex = 0;
    updateStatus(challengeCopy("Watch the pattern.", "Mira el patron."));
    const sequence = sequences[Math.min(round, sequences.length - 1)];
    sequence.forEach((padIndex, step) => {
      const startAt = 240 + step * ((mode.playbackMs || 500) + gapMs);
      queue(() => setPadState(padIndex, "play"), startAt);
      queue(() => setPadState(padIndex, "idle"), startAt + flashMs);
    });
    queue(() => {
      accepting = true;
      updateStatus(challengeCopy("Repeat it.", "Repitelo."));
    }, 280 + sequence.length * ((mode.playbackMs || 500) + gapMs));
  }

  const clickHandlers = padButtons.map((button, index) => {
    const handler = () => handlePad(index);
    button.addEventListener("click", handler);
    return handler;
  });

  const onKey = (event) => {
    if (state.activeStage !== meta.id) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const keyMap = { "1": 0, "2": 1, "3": 2, "4": 3 };
    if (!(event.key in keyMap)) return;
    event.preventDefault();
    handlePad(keyMap[event.key]);
  };

  window.addEventListener("keydown", onKey);
  playRound();

  return () => {
    running = false;
    clearTimers();
    window.removeEventListener("keydown", onKey);
    padButtons.forEach((button, index) => button.removeEventListener("click", clickHandlers[index]));
  };
}

function renderBalance(meta, mode, feedback) {
  const prompt = document.createElement("p");
  prompt.textContent = mode.secondaryPrompt || "Keep the marker steady inside the gold band.";
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: hold Left/A or Right/D to keep the marker inside the gold band.");
  const status = createSkillStatus("");
  activityPanel.append(prompt, hint, status);

  const wrap = document.createElement("div");
  wrap.className = "activity-panel";
  wrap.style.marginTop = "0.75rem";
  activityPanel.append(wrap);

  const bar = document.createElement("div");
  bar.style.position = "relative";
  bar.style.height = "34px";
  bar.style.borderRadius = "999px";
  bar.style.background = "linear-gradient(180deg, rgba(20,27,38,0.98), rgba(11,16,24,0.96))";
  bar.style.border = "1px solid rgba(240, 207, 147, 0.2)";
  bar.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.02), 0 12px 24px rgba(4,8,12,0.22)";
  bar.style.overflow = "hidden";

  const zone = document.createElement("div");
  zone.style.position = "absolute";
  zone.style.left = "42%";
  zone.style.width = "16%";
  zone.style.top = "0";
  zone.style.bottom = "0";
  zone.style.background = "linear-gradient(180deg, rgba(213,169,72,0.72), rgba(191,138,42,0.84))";
  zone.style.boxShadow = "0 0 18px rgba(213,169,72,0.35)";

  const marker = document.createElement("div");
  marker.style.position = "absolute";
  marker.style.top = "4px";
  marker.style.width = "24px";
  marker.style.height = "24px";
  marker.style.borderRadius = "999px";
  marker.style.background = "linear-gradient(180deg, #fff7df, #f2d18a)";
  marker.style.boxShadow = "0 0 14px rgba(255, 243, 214, 0.45)";

  bar.append(zone, marker);
  wrap.append(bar);

  const controls = document.createElement("div");
  controls.style.display = "grid";
  controls.style.gridTemplateColumns = "repeat(2, minmax(120px, 1fr))";
  controls.style.gap = "0.75rem";
  controls.style.marginTop = "0.85rem";
  wrap.append(controls);

  const leftBtn = document.createElement("button");
  leftBtn.type = "button";
  leftBtn.className = "ghost-btn";
  leftBtn.textContent = challengeCopy("Hold Left", "Mantener izquierda");
  const rightBtn = document.createElement("button");
  rightBtn.type = "button";
  rightBtn.className = "ghost-btn";
  rightBtn.textContent = challengeCopy("Hold Right", "Mantener derecha");
  controls.append(leftBtn, rightBtn);

  let stable = 0;
  let misses = 0;
  let pos = 50;
  let velocity = 0;
  let driftBias = 0;
  let leftHeld = false;
  let rightHeld = false;
  let running = true;
  let raf = 0;
  let lastTime = performance.now();

  const updateStatus = () => {
    status.textContent = `${challengeCopy("Steady", "Firme")}: ${stable.toFixed(1)}/${mode.target} ${t("secShort")} | ${t("missesLabel")}: ${misses}/${mode.maxMisses}`;
  };

  const setHeldState = (button, held) => {
    button.style.transform = held ? "translateY(-2px)" : "";
    button.style.boxShadow = held ? "0 0 0 2px rgba(213,169,72,0.42), 0 12px 22px rgba(213,169,72,0.18)" : "";
  };

  const failBalance = () => {
    misses += 1;
    feedback.className = "feedback warn";
    feedback.textContent = challengeCopy("You drifted too far. Recover your footing.", "Te desviaste demasiado. Recupera el equilibrio.");
    playSfx("fail");
    pos = 50;
    velocity = 0;
    driftBias = (Math.random() - 0.5) * (mode.drift || 0.026);
    if (misses >= mode.maxMisses) {
      running = false;
      const hasLives = loseLife();
      feedback.textContent = hasLives ? t("challengeFailedReplay") : t("outOfLivesContinue");
      queueStageAutoClose(meta.id);
    }
  };

  const holdStart = (side) => {
    if (side === "left") leftHeld = true;
    if (side === "right") rightHeld = true;
    setHeldState(leftBtn, leftHeld);
    setHeldState(rightBtn, rightHeld);
  };

  const holdEnd = (side) => {
    if (side === "left") leftHeld = false;
    if (side === "right") rightHeld = false;
    setHeldState(leftBtn, leftHeld);
    setHeldState(rightBtn, rightHeld);
  };

  const tick = (now) => {
    if (!running) return;
    const dt = Math.min(40, now - lastTime) / 16.67;
    lastTime = now;

    if (Math.random() < 0.02) {
      driftBias += (Math.random() - 0.5) * 0.012;
      driftBias = Math.max(-0.05, Math.min(0.05, driftBias));
    }

    velocity += driftBias * dt;
    if (leftHeld) velocity -= 0.075 * dt;
    if (rightHeld) velocity += 0.075 * dt;
    velocity *= 0.92;
    pos += velocity * 1.45;

    if (pos < 2 || pos > 98) {
      pos = Math.max(2, Math.min(98, pos));
      failBalance();
      if (!running) return;
    }

    marker.style.left = `calc(${pos}% - 12px)`;
    const inBand = pos >= 42 && pos <= 58;
    if (inBand) {
      stable += dt / 60;
      if (!feedback.textContent) {
        feedback.className = "feedback ok";
        feedback.textContent = challengeCopy("Hold steady.", "Manten el equilibrio.");
      }
    } else {
      stable = Math.max(0, stable - dt / 120);
      if (feedback.className !== "feedback warn") {
        feedback.className = "feedback";
        feedback.textContent = challengeCopy("Guide the marker back into the gold band.", "Guia el marcador de vuelta a la banda dorada.");
      }
    }

    updateStatus();

    if (stable >= mode.target) {
      running = false;
      feedback.className = "feedback ok";
      feedback.textContent = t("challengeComplete");
      playSfx("success");
      completeStage(meta, mode);
      return;
    }

    raf = requestAnimationFrame(tick);
  };

  const onKeyDown = (event) => {
    if (state.activeStage !== meta.id) return;
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
      event.preventDefault();
      holdStart("left");
    } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
      event.preventDefault();
      holdStart("right");
    }
  };

  const onKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
      holdEnd("left");
    } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
      holdEnd("right");
    }
  };

  const bindHoldButton = (button, side) => {
    const start = (event) => {
      event.preventDefault();
      holdStart(side);
    };
    const end = (event) => {
      event.preventDefault();
      holdEnd(side);
    };
    button.addEventListener("pointerdown", start);
    button.addEventListener("pointerup", end);
    button.addEventListener("pointercancel", end);
    button.addEventListener("pointerleave", end);
    return { start, end };
  };

  const leftHandlers = bindHoldButton(leftBtn, "left");
  const rightHandlers = bindHoldButton(rightBtn, "right");
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  updateStatus();
  raf = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    holdEnd("left");
    holdEnd("right");
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    leftBtn.removeEventListener("pointerdown", leftHandlers.start);
    leftBtn.removeEventListener("pointerup", leftHandlers.end);
    leftBtn.removeEventListener("pointercancel", leftHandlers.end);
    leftBtn.removeEventListener("pointerleave", leftHandlers.end);
    rightBtn.removeEventListener("pointerdown", rightHandlers.start);
    rightBtn.removeEventListener("pointerup", rightHandlers.end);
    rightBtn.removeEventListener("pointercancel", rightHandlers.end);
    rightBtn.removeEventListener("pointerleave", rightHandlers.end);
  };
}

function renderRoute(meta, mode, feedback) {
  const prompt = document.createElement("p");
  prompt.textContent = mode.secondaryPrompt || "Follow the route one move at a time.";
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: use arrow keys or WASD to follow the route.");
  const status = createSkillStatus("");
  activityPanel.append(prompt, hint, status);

  const stepMeta = Array.isArray(mode.routeSteps) && mode.routeSteps.length
    ? mode.routeSteps.map((step) => ({
      dir: step.dir,
      icon: step.icon || routeIcon(step.dir),
      label: step.label || routeLabel(step.dir)
    }))
    : [
      { dir: "up", icon: "⬆️", label: "Up" },
      { dir: "right", icon: "➡️", label: "Right" },
      { dir: "down", icon: "⬇️", label: "Down" },
      { dir: "left", icon: "⬅️", label: "Left" }
    ];

  const viewport = window.visualViewport || null;
  const viewportWidth = Math.round((viewport && viewport.width) || window.innerWidth || 0);
  const viewportHeight = Math.round((viewport && viewport.height) || window.innerHeight || 0);
  const compactLayout = viewportWidth <= 430 || viewportHeight <= 760;
  const ultraCompact = viewportWidth <= 380 || viewportHeight <= 680;

  const trail = document.createElement("div");
  trail.style.display = "grid";
  if (compactLayout) {
    trail.style.gridAutoFlow = "column";
    trail.style.gridAutoColumns = ultraCompact ? "minmax(84px, 94px)" : "minmax(92px, 108px)";
    trail.style.gap = ultraCompact ? "0.5rem" : "0.6rem";
    trail.style.overflowX = "auto";
    trail.style.overflowY = "hidden";
    trail.style.webkitOverflowScrolling = "touch";
    trail.style.scrollSnapType = "x proximity";
    trail.style.paddingBottom = "0.2rem";
    trail.style.justifyContent = "start";
  } else {
    trail.style.gridTemplateColumns = `repeat(${Math.min(stepMeta.length, 4)}, minmax(110px, 1fr))`;
    trail.style.gap = "0.75rem";
  }
  trail.style.marginTop = "0.8rem";
  activityPanel.append(trail);

  const stepCards = stepMeta.map((step, index) => {
    const card = document.createElement("div");
    card.style.borderRadius = compactLayout ? "14px" : "18px";
    card.style.padding = compactLayout
      ? (ultraCompact ? "0.55rem 0.48rem" : "0.65rem 0.55rem")
      : "0.85rem 0.75rem";
    card.style.border = "1px solid rgba(240, 207, 147, 0.18)";
    card.style.background = "linear-gradient(180deg, rgba(20,27,38,0.98), rgba(11,16,24,0.96))";
    card.style.boxShadow = "0 14px 30px rgba(4,8,12,0.24)";
    card.style.textAlign = "center";
    if (compactLayout) card.style.scrollSnapAlign = "start";
    card.innerHTML = `<div style="font-size:${compactLayout ? (ultraCompact ? "1.15rem" : "1.25rem") : "1.45rem"}">${step.icon}</div><div style="margin-top:0.3rem;font-weight:700;font-size:${compactLayout ? "0.92rem" : "1rem"}">${index + 1}. ${step.label}</div>`;
    trail.append(card);
    return card;
  });

  const controls = document.createElement("div");
  controls.style.display = "grid";
  controls.style.gridTemplateColumns = compactLayout
    ? "repeat(3, minmax(0, 1fr))"
    : "repeat(3, minmax(90px, 120px))";
  controls.style.gap = compactLayout ? (ultraCompact ? "0.45rem" : "0.55rem") : "0.7rem";
  controls.style.justifyContent = "center";
  controls.style.marginTop = compactLayout ? "0.85rem" : "1rem";
  if (compactLayout) {
    controls.style.width = "100%";
    controls.style.maxWidth = ultraCompact ? "320px" : "360px";
    controls.style.marginInline = "auto";
  }
  activityPanel.append(controls);

  const blankA = document.createElement("div");
  const upBtn = routeButton("⬆️ Up");
  const blankB = document.createElement("div");
  const leftBtn = routeButton("⬅️ Left");
  const downBtn = routeButton("⬇️ Down");
  const rightBtn = routeButton("➡️ Right");
  if (compactLayout) {
    [upBtn, leftBtn, downBtn, rightBtn].forEach((button) => {
      button.style.minHeight = ultraCompact ? "46px" : "52px";
      button.style.padding = ultraCompact ? "0.42rem 0.3rem" : "0.5rem 0.35rem";
      button.style.fontSize = ultraCompact ? "0.95rem" : "1rem";
    });
  }
  controls.append(blankA, upBtn, blankB, leftBtn, downBtn, rightBtn);

  let index = 0;
  let misses = 0;
  let running = true;

  const updateStatus = (lead = challengeCopy("Follow the path.", "Sigue el camino.")) => {
    status.textContent = `${lead} ${challengeCopy("Step", "Paso")} ${Math.min(index + 1, stepMeta.length)}/${stepMeta.length} | ${t("missesLabel")}: ${misses}/${mode.maxMisses || 4}`;
  };

  const paintTrail = (activeIndex = index, state = "active") => {
    stepCards.forEach((card, stepIndex) => {
      card.style.transform = stepIndex < activeIndex ? "translateY(-2px)" : "";
      card.style.boxShadow = stepIndex < activeIndex
        ? "0 0 0 2px rgba(130,211,146,0.35), 0 14px 30px rgba(70,170,88,0.18)"
        : "0 14px 30px rgba(4,8,12,0.24)";
      card.style.background = stepIndex < activeIndex
        ? "linear-gradient(180deg, rgba(72,148,88,0.2), rgba(11,16,24,0.96))"
        : "linear-gradient(180deg, rgba(20,27,38,0.98), rgba(11,16,24,0.96))";
      if (stepIndex === activeIndex && state === "active") {
        card.style.boxShadow = "0 0 0 2px rgba(213,169,72,0.45), 0 14px 30px rgba(213,169,72,0.18)";
        card.style.background = "linear-gradient(180deg, rgba(213,169,72,0.16), rgba(11,16,24,0.96))";
      }
      if (stepIndex === activeIndex && state === "bad") {
        card.style.boxShadow = "0 0 0 2px rgba(230,132,132,0.45), 0 14px 30px rgba(170,70,70,0.2)";
        card.style.background = "linear-gradient(180deg, rgba(145,52,52,0.24), rgba(11,16,24,0.96))";
      }
    });
  };

  const fail = () => {
    misses += 1;
    feedback.className = "feedback warn";
    feedback.textContent = challengeCopy("Wrong turn. Start the route again.", "Giro incorrecto. Empieza la ruta otra vez.");
    playSfx("fail");
    index = 0;
    paintTrail(0, "bad");
    if (misses >= (mode.maxMisses || 4)) {
      running = false;
      const hasLives = loseLife();
      feedback.textContent = hasLives ? t("challengeFailedReplay") : t("outOfLivesContinue");
      queueStageAutoClose(meta.id);
    }
    updateStatus(challengeCopy("Recover the route.", "Recupera la ruta."));
  };

  const finish = () => {
    running = false;
    paintTrail(stepMeta.length, "done");
    feedback.className = "feedback ok";
    feedback.textContent = t("challengeComplete");
    playSfx("success");
    completeStage(meta, mode);
  };

  const press = (dir) => {
    if (!running || !canPlayStage()) return;
    const expected = stepMeta[index]?.dir;
    if (dir !== expected) {
      fail();
      return;
    }
    index += 1;
    playSfx("hit");
    if (index >= stepMeta.length) {
      finish();
      return;
    }
    feedback.className = "feedback";
    feedback.textContent = challengeCopy("Keep going.", "Sigue adelante.");
    paintTrail(index, "active");
    updateStatus();
  };

  let swipePadCleanup = () => {};
  if (compactLayout) {
    const swipeWrap = document.createElement("div");
    swipeWrap.style.marginTop = "0.65rem";

    const swipePad = document.createElement("div");
    swipePad.style.borderRadius = "14px";
    swipePad.style.minHeight = ultraCompact ? "82px" : "94px";
    swipePad.style.border = "1px solid rgba(240, 207, 147, 0.32)";
    swipePad.style.background = "linear-gradient(180deg, rgba(21,28,41,0.92), rgba(11,17,26,0.96))";
    swipePad.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.03), 0 10px 24px rgba(0,0,0,0.2)";
    swipePad.style.display = "grid";
    swipePad.style.placeItems = "center";
    swipePad.style.textAlign = "center";
    swipePad.style.fontWeight = "700";
    swipePad.style.padding = ultraCompact ? "0.4rem" : "0.55rem";
    swipePad.style.touchAction = "none";
    swipePad.textContent = challengeCopy("Touch + swipe here", "Toca y desliza aqui");
    swipeWrap.append(swipePad);
    activityPanel.append(swipeWrap);

    let swipeStart = null;
    const swipeThreshold = ultraCompact ? 18 : 22;
    const resetSwipePad = () => {
      swipePad.style.transform = "";
      swipePad.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.03), 0 10px 24px rgba(0,0,0,0.2)";
    };
    const onSwipeStart = (event) => {
      if (!running || !canPlayStage()) return;
      swipeStart = { x: event.clientX, y: event.clientY };
      swipePad.style.transform = "translateY(-1px)";
      swipePad.style.boxShadow = "0 0 0 2px rgba(213,169,72,0.34), 0 12px 24px rgba(213,169,72,0.18)";
    };
    const onSwipeEnd = (event) => {
      if (!swipeStart) return;
      const dx = event.clientX - swipeStart.x;
      const dy = event.clientY - swipeStart.y;
      swipeStart = null;
      resetSwipePad();
      if (Math.abs(dx) < swipeThreshold && Math.abs(dy) < swipeThreshold) return;
      const dir = Math.abs(dx) > Math.abs(dy)
        ? (dx > 0 ? "right" : "left")
        : (dy > 0 ? "down" : "up");
      press(dir);
    };
    const onSwipeCancel = () => {
      swipeStart = null;
      resetSwipePad();
    };
    swipePad.addEventListener("pointerdown", onSwipeStart);
    swipePad.addEventListener("pointerup", onSwipeEnd);
    swipePad.addEventListener("pointercancel", onSwipeCancel);
    swipePad.addEventListener("pointerleave", onSwipeCancel);
    swipePadCleanup = () => {
      swipePad.removeEventListener("pointerdown", onSwipeStart);
      swipePad.removeEventListener("pointerup", onSwipeEnd);
      swipePad.removeEventListener("pointercancel", onSwipeCancel);
      swipePad.removeEventListener("pointerleave", onSwipeCancel);
    };
  }

  const bindings = [
    bindRouteButton(upBtn, "up", press),
    bindRouteButton(leftBtn, "left", press),
    bindRouteButton(downBtn, "down", press),
    bindRouteButton(rightBtn, "right", press)
  ];

  const onKeyDown = (event) => {
    if (state.activeStage !== meta.id) return;
    const dir = routeDirectionFromKey(event.key);
    if (!dir) return;
    event.preventDefault();
    press(dir);
  };

  window.addEventListener("keydown", onKeyDown);
  paintTrail();
  updateStatus();

  return () => {
    running = false;
    window.removeEventListener("keydown", onKeyDown);
    bindings.forEach(({ button, start, end }) => {
      button.removeEventListener("pointerdown", start);
      button.removeEventListener("pointerup", end);
      button.removeEventListener("pointercancel", end);
      button.removeEventListener("pointerleave", end);
    });
    swipePadCleanup();
  };
}

function routeButton(label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "ghost-btn";
  button.textContent = label;
  button.style.minHeight = "58px";
  button.style.fontWeight = "700";
  return button;
}

function routeDirectionFromKey(key) {
  if (key === "ArrowUp" || key === "w" || key === "W") return "up";
  if (key === "ArrowDown" || key === "s" || key === "S") return "down";
  if (key === "ArrowLeft" || key === "a" || key === "A") return "left";
  if (key === "ArrowRight" || key === "d" || key === "D") return "right";
  return "";
}

function routeIcon(dir) {
  return { up: "⬆️", down: "⬇️", left: "⬅️", right: "➡️" }[dir] || "➡️";
}

function routeLabel(dir) {
  return { up: "Up", down: "Down", left: "Left", right: "Right" }[dir] || "Move";
}

function bindRouteButton(button, dir, press) {
  const start = (event) => {
    event.preventDefault();
    button.style.transform = "translateY(-2px)";
    button.style.boxShadow = "0 0 0 2px rgba(213,169,72,0.42), 0 12px 22px rgba(213,169,72,0.18)";
    press(dir);
  };
  const end = (event) => {
    event.preventDefault();
    button.style.transform = "";
    button.style.boxShadow = "";
  };
  button.addEventListener("pointerdown", start);
  button.addEventListener("pointerup", end);
  button.addEventListener("pointercancel", end);
  button.addEventListener("pointerleave", end);
  return { button, start, end };
}

function renderDiscern(meta, mode, feedback) {
  const prompt = document.createElement("p");
  prompt.textContent = mode.secondaryPrompt || "Choose the right answer each round.";
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: press 1-4 to choose the right answer.");
  const status = createSkillStatus("");
  const target = document.createElement("p");
  target.style.fontWeight = "700";
  target.style.marginTop = "0.45rem";
  activityPanel.append(prompt, hint, status, target);

  const cards = Array.isArray(mode.cards) && mode.cards.length >= 4
    ? mode.cards.slice(0, 4)
    : [
      { icon: "1", label: "One" },
      { icon: "2", label: "Two" },
      { icon: "3", label: "Three" },
      { icon: "4", label: "Four" }
    ];
  const rounds = Array.isArray(mode.targets) && mode.targets.length
    ? mode.targets.slice()
    : [{ prompt: "Choose the right answer.", correctIndex: 0 }];

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(2, minmax(140px, 1fr))";
  grid.style.gap = "0.85rem";
  grid.style.marginTop = "0.8rem";
  activityPanel.append(grid);

  const buttons = cards.map((card, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost-btn";
    button.style.minHeight = "96px";
    button.style.display = "flex";
    button.style.flexDirection = "column";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.gap = "0.35rem";
    button.style.fontWeight = "700";
    button.innerHTML = `<span style="font-size:1.5rem">${card.icon}</span><span>${index + 1}. ${card.label}</span>`;
    grid.append(button);
    return button;
  });

  let round = 0;
  let misses = 0;
  let running = true;

  const setState = (index, state) => {
    const button = buttons[index];
    if (!button) return;
    if (state === "good") {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 0 0 2px rgba(130,211,146,0.45), 0 14px 30px rgba(70,170,88,0.18)";
      button.style.background = "linear-gradient(180deg, rgba(72,148,88,0.22), rgba(18,27,40,0.96))";
    } else if (state === "bad") {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 0 0 2px rgba(230,132,132,0.45), 0 14px 30px rgba(170,70,70,0.2)";
      button.style.background = "linear-gradient(180deg, rgba(145,52,52,0.24), rgba(18,27,40,0.96))";
    } else {
      button.style.transform = "";
      button.style.boxShadow = "";
      button.style.background = "";
    }
  };

  const updateStatus = () => {
    status.textContent = `${challengeCopy("Round", "Ronda")} ${Math.min(round + 1, rounds.length)}/${rounds.length} | ${t("missesLabel")}: ${misses}/${mode.maxMisses || 3}`;
    target.textContent = rounds[round] ? rounds[round].prompt : "";
  };

  const fail = (index) => {
    misses += 1;
    setState(index, "bad");
    setTimeout(() => setState(index, "idle"), 220);
    feedback.className = "feedback warn";
    feedback.textContent = challengeCopy("Not that one. Try again.", "No es esa. Intentalo otra vez.");
    playSfx("fail");
    if (misses >= (mode.maxMisses || 3)) {
      running = false;
      const hasLives = loseLife();
      feedback.textContent = hasLives ? t("challengeFailedReplay") : t("outOfLivesContinue");
      queueStageAutoClose(meta.id);
    }
    updateStatus();
  };

  const finish = () => {
    running = false;
    feedback.className = "feedback ok";
    feedback.textContent = t("challengeComplete");
    playSfx("success");
    completeStage(meta, mode);
  };

  const choose = (index) => {
    if (!running || !canPlayStage()) return;
    const current = rounds[round];
    if (!current) return;
    if (index !== current.correctIndex) {
      fail(index);
      return;
    }
    setState(index, "good");
    setTimeout(() => setState(index, "idle"), 220);
    playSfx("hit");
    round += 1;
    if (round >= rounds.length) {
      finish();
      return;
    }
    feedback.className = "feedback ok";
    feedback.textContent = challengeCopy("Good choice. Keep going.", "Buena eleccion. Sigue adelante.");
    updateStatus();
  };

  const clickHandlers = buttons.map((button, index) => {
    const handler = () => choose(index);
    button.addEventListener("click", handler);
    return { button, handler };
  });

  const onKeyDown = (event) => {
    if (state.activeStage !== meta.id) return;
    const index = ["1", "2", "3", "4"].indexOf(event.key);
    if (index === -1) return;
    event.preventDefault();
    choose(index);
  };

  window.addEventListener("keydown", onKeyDown);
  updateStatus();

  return () => {
    running = false;
    window.removeEventListener("keydown", onKeyDown);
    clickHandlers.forEach(({ button, handler }) => button.removeEventListener("click", handler));
  };
}

function renderTiming(meta, mode, feedback) {
  const wrap = document.createElement("div");
  wrap.className = "activity-panel";
  wrap.style.marginTop = "0.75rem";
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: press Space or Enter when the marker is inside the gold zone.");

  const status = createSkillStatus(`${t("hitsLabel")}: 0/${mode.target} | ${t("missesLabel")}: 0/${mode.maxMisses}`);

  const bar = document.createElement("div");
  bar.style.position = "relative";
  bar.style.height = "34px";
  bar.style.borderRadius = "999px";
  bar.style.background = "linear-gradient(180deg, rgba(26,34,47,0.96), rgba(14,20,29,0.96))";
  bar.style.border = "1px solid rgba(240, 207, 147, 0.2)";
  bar.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.02), 0 12px 24px rgba(4,8,12,0.22)";
  bar.style.overflow = "hidden";
  bar.style.touchAction = "manipulation";
  bar.style.cursor = "pointer";

  const zone = document.createElement("div");
  zone.style.position = "absolute";
  zone.style.left = "42%";
  zone.style.width = "16%";
  zone.style.top = "0";
  zone.style.bottom = "0";
  zone.style.background = "linear-gradient(180deg, rgba(213,169,72,0.72), rgba(191,138,42,0.84))";
  zone.style.boxShadow = "0 0 18px rgba(213,169,72,0.35)";

  const marker = document.createElement("div");
  marker.style.position = "absolute";
  marker.style.width = "12px";
  marker.style.top = "-2px";
  marker.style.bottom = "-2px";
  marker.style.background = "linear-gradient(180deg, #fff7df, #f2d18a)";
  marker.style.borderRadius = "999px";
  marker.style.boxShadow = "0 0 14px rgba(255, 243, 214, 0.45)";

  const strike = document.createElement("button");
  strike.className = "cta-btn";
  strike.type = "button";
  strike.textContent = t("strikeAction");

  bar.append(zone, marker);
  wrap.append(hint, status, bar, strike);
  activityPanel.append(wrap);

  let hits = 0;
  let misses = 0;
  let running = true;
  let raf = 0;
  const start = performance.now();

  const tick = (now) => {
    if (!running) return;
    const phase = ((now - start) / mode.speed) % 2;
    const t = phase <= 1 ? phase : 2 - phase;
    marker.style.left = `${t * 100}%`;
    raf = requestAnimationFrame(tick);
  };

  const onStrike = () => {
    if (!running) return;
    if (!canPlayStage()) {
      feedback.className = "feedback warn";
      feedback.textContent = t("noLivesShort");
      running = false;
      return;
    }

    const pos = parseFloat(marker.style.left || "0");
    if (pos >= 42 && pos <= 58) {
      hits += 1;
      feedback.className = "feedback ok";
      feedback.textContent = t("perfectTiming");
      playSfx("hit");
    } else {
      misses += 1;
      feedback.className = "feedback warn";
      feedback.textContent = t("missedTimingWindow");
      playSfx("fail");
    }

    status.textContent = `${t("hitsLabel")}: ${hits}/${mode.target} | ${t("missesLabel")}: ${misses}/${mode.maxMisses}`;

    if (hits >= mode.target) {
      running = false;
      feedback.className = "feedback ok";
      feedback.textContent = t("challengeComplete");
      playSfx("success");
      completeStage(meta, mode);
    }

    if (misses >= mode.maxMisses) {
      running = false;
      const hasLives = loseLife();
      feedback.className = "feedback warn";
      feedback.textContent = hasLives ? t("challengeFailedReplay") : t("outOfLivesContinue");
      queueStageAutoClose(meta.id);
    }
  };

  const onKey = (event) => {
    if (state.activeStage !== meta.id) return;
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    onStrike();
  };

  strike.addEventListener("click", onStrike);
  bar.addEventListener("click", onStrike);
  window.addEventListener("keydown", onKey);
  raf = requestAnimationFrame(tick);

  return () => {
    running = false;
    strike.removeEventListener("click", onStrike);
    bar.removeEventListener("click", onStrike);
    window.removeEventListener("keydown", onKey);
    cancelAnimationFrame(raf);
  };
}

function renderCollect(meta, mode, feedback) {
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: move with Left/Right or A/D. Mouse and trackpad movement still work too.");
  activityPanel.append(hint);
  const canvas = document.createElement("canvas");
  canvas.className = "skill-canvas";
  canvas.width = 540;
  canvas.height = 300;
  canvas.style.touchAction = "none";
  activityPanel.append(canvas);
  const c = canvas.getContext("2d");

  const status = createSkillStatus(`${t("caughtLabel")}: 0/${mode.target} | ${t("missesLabel")}: 0/${mode.maxMisses} | ${t("timeLabel")}: ${mode.seconds}`);
  activityPanel.append(status);

  const player = { x: 260, y: 266, w: 72, h: 18 };
  const drops = [];
  let score = 0;
  let misses = 0;
  let timer = mode.seconds;
  let lastSpawn = 0;
  let lastTime = performance.now();
  let running = true;
  let raf = 0;

  const movePlayer = (x) => {
    player.x = Math.max(0, Math.min(canvas.width - player.w, x - player.w / 2));
  };

  const onPointer = (event) => {
    const pos = canvasPointerPosition(canvas, event);
    movePlayer(pos.x);
  };

  const onKey = (event) => {
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") player.x -= 24;
    if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") player.x += 24;
    player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  };

  canvas.addEventListener("pointerdown", onPointer);
  canvas.addEventListener("pointermove", onPointer);
  window.addEventListener("keydown", onKey);

  const tick = (now) => {
    if (!running) return;

    const dt = Math.min(34, now - lastTime);
    lastTime = now;
    timer -= dt / 1000;

    if (now - lastSpawn > mode.spawnMs) {
      drops.push({ x: 20 + Math.random() * (canvas.width - 40), y: -12, r: 9 + Math.random() * 4, v: 2 + Math.random() * 2.2 });
      lastSpawn = now;
    }

    c.clearRect(0, 0, canvas.width, canvas.height);
    const sky = c.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, "#203d60");
    sky.addColorStop(0.65, "#101926");
    sky.addColorStop(1, "#0c121a");
    c.fillStyle = sky;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "rgba(255, 222, 150, 0.14)";
    c.beginPath();
    c.arc(440, 72, 44, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#34441f";
    c.fillRect(0, 270, canvas.width, 30);
    c.fillStyle = "rgba(255,255,255,0.05)";
    for (let stripe = 0; stripe < canvas.width; stripe += 24) {
      c.fillRect(stripe, 276, 12, 6);
    }

    drawRoundedRect(c, player.x, player.y, player.w, player.h, 8, "#d5a948");
    drawRoundedRect(c, player.x + 8, player.y - 10, player.w - 16, 10, 6, "rgba(245, 233, 203, 0.16)");

    for (let i = drops.length - 1; i >= 0; i -= 1) {
      const d = drops[i];
      d.y += d.v;
      c.beginPath();
      c.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      c.fillStyle = "#f1dfb7";
      c.shadowBlur = 14;
      c.shadowColor = "rgba(241, 223, 183, 0.35)";
      c.fill();
      c.shadowBlur = 0;
      c.fillStyle = "rgba(255,255,255,0.28)";
      c.beginPath();
      c.arc(d.x - d.r * 0.28, d.y - d.r * 0.34, Math.max(2, d.r * 0.24), 0, Math.PI * 2);
      c.fill();

      const caught = d.y + d.r >= player.y && d.x > player.x && d.x < player.x + player.w;
      if (caught) {
        score += 1;
        playSfx("hit");
        drops.splice(i, 1);
      } else if (d.y > canvas.height + 10) {
        misses += 1;
        drops.splice(i, 1);
      }
    }

    status.textContent = `${t("caughtLabel")}: ${score}/${mode.target} | ${t("missesLabel")}: ${misses}/${mode.maxMisses} | ${t("timeLabel")}: ${Math.max(0, Math.ceil(timer))}`;

    if (score >= mode.target) {
      running = false;
      feedback.className = "feedback ok";
      feedback.textContent = t("challengeComplete");
      playSfx("success");
      completeStage(meta, mode);
      return;
    }

    if (misses >= mode.maxMisses || timer <= 0) {
      running = false;
      const hasLives = loseLife();
      feedback.className = "feedback warn";
      feedback.textContent = hasLives ? t("challengeFailedReplay") : t("outOfLivesContinue");
      playSfx("fail");
      queueStageAutoClose(meta.id);
      return;
    }

    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    canvas.removeEventListener("pointerdown", onPointer);
    canvas.removeEventListener("pointermove", onPointer);
    window.removeEventListener("keydown", onKey);
  };
}

function renderDodge(meta, mode, feedback) {
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: move with Left/Right or A/D. Stay alive until the timer ends.");
  activityPanel.append(hint);
  const canvas = document.createElement("canvas");
  canvas.className = "skill-canvas";
  canvas.width = 540;
  canvas.height = 300;
  canvas.style.touchAction = "none";
  activityPanel.append(canvas);
  const c = canvas.getContext("2d");

  const status = createSkillStatus(`${t("surviveLabel")}: 0/${mode.target} ${t("secShort")}`);
  activityPanel.append(status);

  const player = { x: 260, y: 260, w: 28, h: 28 };
  const threats = [];
  let survived = 0;
  let lastSpawn = 0;
  let lastTime = performance.now();
  let running = true;
  let raf = 0;

  const onPointer = (event) => {
    const pos = canvasPointerPosition(canvas, event);
    player.x = Math.max(0, Math.min(canvas.width - player.w, pos.x - player.w / 2));
  };

  const onKey = (event) => {
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") player.x -= 26;
    if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") player.x += 26;
    player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  };

  canvas.addEventListener("pointerdown", onPointer);
  canvas.addEventListener("pointermove", onPointer);
  window.addEventListener("keydown", onKey);

  const tick = (now) => {
    if (!running) return;

    const dt = Math.min(34, now - lastTime);
    lastTime = now;
    survived += dt / 1000;

    if (now - lastSpawn > mode.spawnMs) {
      threats.push({ x: 12 + Math.random() * (canvas.width - 24), y: -20, v: 2 + Math.random() * 2.8, r: 8 + Math.random() * 8 });
      lastSpawn = now;
    }

    c.clearRect(0, 0, canvas.width, canvas.height);
    const sky = c.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, "#151f2d");
    sky.addColorStop(0.72, "#0b1119");
    sky.addColorStop(1, "#080c12");
    c.fillStyle = sky;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.strokeStyle = "rgba(189, 222, 255, 0.16)";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(410, 0);
    c.lineTo(392, 48);
    c.lineTo(438, 108);
    c.stroke();

    drawRoundedRect(c, player.x, player.y, player.w, player.h, 8, "#d5a948");
    c.fillStyle = "rgba(255,245,214,0.3)";
    c.fillRect(player.x + 7, player.y + 7, player.w - 14, 5);

    for (let i = threats.length - 1; i >= 0; i -= 1) {
      const threat = threats[i];
      threat.y += threat.v;
      c.beginPath();
      c.arc(threat.x, threat.y, threat.r, 0, Math.PI * 2);
      const threatFill = c.createRadialGradient(threat.x - 2, threat.y - 2, 2, threat.x, threat.y, threat.r);
      threatFill.addColorStop(0, "#ffd7b1");
      threatFill.addColorStop(0.35, "#db7d4f");
      threatFill.addColorStop(1, "#7f291e");
      c.fillStyle = threatFill;
      c.shadowBlur = 18;
      c.shadowColor = "rgba(219, 125, 79, 0.35)";
      c.fill();
      c.shadowBlur = 0;

      const hitX = threat.x > player.x && threat.x < player.x + player.w;
      const hitY = threat.y + threat.r > player.y && threat.y - threat.r < player.y + player.h;
      if (hitX && hitY) {
        running = false;
        const hasLives = loseLife();
        feedback.className = "feedback warn";
        feedback.textContent = hasLives ? t("youWereHitReplay") : t("outOfLivesContinue");
        playSfx("fail");
        queueStageAutoClose(meta.id);
        return;
      }

      if (threat.y > canvas.height + 20) threats.splice(i, 1);
    }

    status.textContent = `${t("surviveLabel")}: ${Math.floor(survived)}/${mode.target} ${t("secShort")}`;

    if (survived >= mode.target) {
      running = false;
      feedback.className = "feedback ok";
      feedback.textContent = t("challengeComplete");
      playSfx("success");
      completeStage(meta, mode);
      return;
    }

    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    canvas.removeEventListener("pointerdown", onPointer);
    canvas.removeEventListener("pointermove", onPointer);
    window.removeEventListener("keydown", onKey);
  };
}

function renderSlingshot(meta, mode, feedback) {
  const prompt = document.createElement("p");
  prompt.textContent = mode.secondaryPrompt || t("slingshotPrompt");
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: arrows adjust your pull, Space or Enter launches, and R resets the shot.");
  const status = createSkillStatus("Aim low and pull back before you release.");
  activityPanel.append(prompt, hint, status);

  const canvas = document.createElement("canvas");
  canvas.className = "skill-canvas";
  canvas.width = 540;
  canvas.height = 300;
  canvas.style.touchAction = "none";
  activityPanel.append(canvas);

  const retry = document.createElement("button");
  retry.className = "ghost-btn";
  retry.type = "button";
  retry.textContent = t("resetShot");
  activityPanel.append(retry);

  const c = canvas.getContext("2d");
  const sling = { x: 80, y: 230 };
  const giant = { x: 455, y: 110, r: mode.targetRadius || 20 };
  let stone = { x: sling.x, y: sling.y, vx: 0, vy: 0, flying: false };
  let dragPoint = { x: sling.x, y: sling.y };
  let dragging = false;
  let finished = false;
  let running = true;
  let raf = 0;
  let activePointerId = null;
  let keyboardPull = { x: -56, y: 18 };

  function resetStone() {
    stone = { x: sling.x, y: sling.y, vx: 0, vy: 0, flying: false };
    dragPoint = { x: sling.x + keyboardPull.x, y: sling.y + keyboardPull.y };
    dragging = false;
  }

  function applyKeyboardPull() {
    const maxPull = mode.maxPull || 82;
    const len = Math.hypot(keyboardPull.x, keyboardPull.y);
    const scale = len > maxPull ? maxPull / len : 1;
    keyboardPull.x *= scale;
    keyboardPull.y *= scale;
    if (!stone.flying && !dragging) {
      dragPoint.x = sling.x + keyboardPull.x;
      dragPoint.y = sling.y + keyboardPull.y;
      stone.x = dragPoint.x;
      stone.y = dragPoint.y;
    }
  }

  function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    const sky = c.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, "#213653");
    sky.addColorStop(0.7, "#111822");
    sky.addColorStop(1, "#090d13");
    c.fillStyle = sky;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "#343f23";
    c.fillRect(0, 250, canvas.width, 50);
    c.fillStyle = "rgba(255, 214, 127, 0.12)";
    c.beginPath();
    c.arc(102, 72, 34, 0, Math.PI * 2);
    c.fill();

    drawRoundedRect(c, 430, 95, 46, 145, 10, "#8d5c2e");
    c.beginPath();
    c.arc(giant.x, giant.y, giant.r, 0, Math.PI * 2);
    const targetGlow = c.createRadialGradient(giant.x, giant.y, 4, giant.x, giant.y, giant.r + 14);
    targetGlow.addColorStop(0, "#ffd6af");
    targetGlow.addColorStop(0.55, "#dfb07b");
    targetGlow.addColorStop(1, "rgba(111, 64, 34, 0.88)");
    c.fillStyle = targetGlow;
    c.shadowBlur = 18;
    c.shadowColor = "rgba(223,176,123,0.28)";
    c.fill();
    c.shadowBlur = 0;
    c.strokeStyle = "rgba(255, 243, 214, 0.55)";
    c.lineWidth = 3;
    c.beginPath();
    c.arc(giant.x, giant.y, giant.r + 8, 0, Math.PI * 2);
    c.stroke();

    c.strokeStyle = "#b98549";
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(sling.x - 14, sling.y + 8);
    c.lineTo(dragPoint.x, dragPoint.y);
    c.lineTo(sling.x + 14, sling.y + 8);
    c.stroke();

    c.beginPath();
    c.arc(stone.x, stone.y, 8, 0, Math.PI * 2);
    c.fillStyle = "#d9c7ae";
    c.shadowBlur = 12;
    c.shadowColor = "rgba(217, 199, 174, 0.32)";
    c.fill();
    c.shadowBlur = 0;
  }

  function tick() {
    if (!running) return;

    if (stone.flying && !finished) {
      stone.vy += 0.24;
      stone.x += stone.vx;
      stone.y += stone.vy;
      dragPoint.x = stone.x;
      dragPoint.y = stone.y;

      const dx = stone.x - giant.x;
      const dy = stone.y - giant.y;
      if (Math.hypot(dx, dy) < giant.r + 8) {
        finished = true;
        feedback.className = "feedback ok";
        feedback.textContent = t("directHitComplete");
        playSfx("success");
        completeStage(meta, mode);
      }

      if (stone.y > canvas.height + 20 || stone.x > canvas.width + 20 || stone.x < -20) {
        resetStone();
        const hasLives = loseLife();
        feedback.className = "feedback warn";
        feedback.textContent = hasLives ? t("missedAimHint") : t("outOfLivesContinue");
        playSfx("fail");
        queueStageAutoClose(meta.id);
        if (!hasLives) {
          running = false;
          return;
        }
      }
    }

    draw();
    raf = requestAnimationFrame(tick);
  }

  function getPos(event) {
    return canvasPointerPosition(canvas, event);
  }

  const onDown = (event) => {
    if (finished || !canPlayStage()) return;
    const p = getPos(event);
    if (Math.hypot(p.x - stone.x, p.y - stone.y) < 20 && !stone.flying) {
      dragging = true;
      activePointerId = event.pointerId;
      if (canvas.setPointerCapture) {
        try {
          canvas.setPointerCapture(event.pointerId);
        } catch (_) {
          // Ignore capture failures on older iOS builds.
        }
      }
      event.preventDefault();
    }
  };

  const onMove = (event) => {
    if (activePointerId !== null && event.pointerId !== activePointerId) return;
    if (!dragging || finished) return;
    const p = getPos(event);
    const maxPull = mode.maxPull || 82;
    const dx = p.x - sling.x;
    const dy = p.y - sling.y;
    const len = Math.hypot(dx, dy);
    const scale = len > maxPull ? maxPull / len : 1;

    dragPoint.x = sling.x + dx * scale;
    dragPoint.y = sling.y + dy * scale;
    stone.x = dragPoint.x;
    stone.y = dragPoint.y;
    keyboardPull.x = dragPoint.x - sling.x;
    keyboardPull.y = dragPoint.y - sling.y;
  };

  const onUp = (event) => {
    if (activePointerId !== null && event.pointerId !== activePointerId) return;
    if (!dragging || finished || !canPlayStage()) return;
    dragging = false;
    activePointerId = null;
    stone.vx = (sling.x - dragPoint.x) * (mode.pullPowerScale || 0.14);
    stone.vy = (sling.y - dragPoint.y) * (mode.pullPowerScale || 0.14);
    stone.flying = true;
    status.textContent = "Stone released. Hold steady for the hit.";
    playSfx("click");
  };

  const onCancel = (event) => {
    if (activePointerId !== null && event.pointerId !== activePointerId) return;
    dragging = false;
    activePointerId = null;
    resetStone();
  };

  const onRetry = () => {
    finished = false;
    feedback.textContent = "";
    resetStone();
    status.textContent = "Aim low and pull back before you release.";
  };

  const launchStone = () => {
    if (finished || stone.flying || !canPlayStage()) return;
    stone.vx = (sling.x - dragPoint.x) * (mode.pullPowerScale || 0.14);
    stone.vy = (sling.y - dragPoint.y) * (mode.pullPowerScale || 0.14);
    stone.flying = true;
    status.textContent = "Stone released. Hold steady for the hit.";
    playSfx("click");
  };

  const onKey = (event) => {
    if (state.activeStage !== meta.id) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (!stone.flying && !finished) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        keyboardPull.x = Math.max(-(mode.maxPull || 82), keyboardPull.x - 8);
        applyKeyboardPull();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        keyboardPull.x = Math.min(mode.maxPull || 82, keyboardPull.x + 8);
        applyKeyboardPull();
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        keyboardPull.y = Math.max(-(mode.maxPull || 82), keyboardPull.y - 8);
        applyKeyboardPull();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        keyboardPull.y = Math.min(mode.maxPull || 82, keyboardPull.y + 8);
        applyKeyboardPull();
        return;
      }
    }

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      launchStone();
      return;
    }

    if (event.key === "r" || event.key === "R") {
      event.preventDefault();
      onRetry();
    }
  };

  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove, { passive: false });
  window.addEventListener("pointerup", onUp, { passive: false });
  window.addEventListener("pointercancel", onCancel, { passive: false });
  window.addEventListener("keydown", onKey);
  retry.addEventListener("click", onRetry);

  applyKeyboardPull();
  raf = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    canvas.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onCancel);
    window.removeEventListener("keydown", onKey);
    retry.removeEventListener("click", onRetry);
  };
}

function updateAudioState() {
  const theaterOpen = isStoryTheaterOpen();
  const creditsOpen = isCreditsOpen();
  const musicShouldBeAudible = state.audio.music && !theaterOpen && (!state.activeStage || isFinalOpen() || creditsOpen);
  const musicTarget = musicShouldBeAudible ? musicGainForCurrentLevel() : 0;
  const musicFadeSeconds = musicShouldBeAudible ? 0.92 : (theaterOpen || state.activeStage ? 0.24 : 0.46);
  setMusicGainSmooth(musicTarget, musicFadeSeconds);
  if (audioEngine.sfxGain) audioEngine.sfxGain.gain.value = state.audio.sfx ? 0.3 : 0;

  if (state.audio.music) {
    if (creditsOpen) {
      playCreditsMusic();
    } else if (isFinalOpen()) {
      playFinaleMusic();
    } else {
      stopFinaleMusic();
      stopCreditsMusic();
      startMusicLoop();
    }
  } else {
    stopMusicLoop();
    stopFinaleMusic();
    stopCreditsMusic();
  }

  persist();
  updateHud();
}

function restoreLives() {
  state.lives = MAX_LIVES;
  persist();
  updateHud();
  playSfx("success");
}

armAudioUnlock();

document.addEventListener(
  "click",
  (event) => {
    const button = event.target instanceof Element ? event.target.closest("button") : null;
    if (!button || button.disabled) return;
    if (button.dataset.noClickSfx === "true") return;
    playSfx("click");
  },
  true
);

if (closeActivityBtn) closeActivityBtn.addEventListener("click", closeActivity);
if (activityOverlay) {
  activityOverlay.addEventListener("click", (event) => {
    if (event.target === activityOverlay) closeActivity();
  });
}

if (acceptChallengeBtn) acceptChallengeBtn.addEventListener("click", dismissWelcome);
if (welcomeOverlay) {
  welcomeOverlay.addEventListener("click", (event) => {
    if (event.target === welcomeOverlay) dismissWelcome();
  });
  if (!welcomeOverlay.classList.contains("hidden")) updateOverlayLock();
}

if (openBadgeShieldBtn) openBadgeShieldBtn.addEventListener("click", openBadgeShield);
if (closeBadgeShieldBtn) closeBadgeShieldBtn.addEventListener("click", closeBadgeShield);
if (badgeShieldOverlay) {
  badgeShieldOverlay.addEventListener("click", (event) => {
    if (event.target === badgeShieldOverlay) closeBadgeShield();
  });
}

if (shareLatestBadgeBtn) shareLatestBadgeBtn.addEventListener("click", () => openShareOverlay());

if (shareByTextBtn) shareByTextBtn.addEventListener("click", shareViaText);
if (shareByEmailBtn) shareByEmailBtn.addEventListener("click", shareViaEmail);
if (shareBySocialBtn) shareBySocialBtn.addEventListener("click", shareViaSocial);
if (copyShareTextBtn) copyShareTextBtn.addEventListener("click", copyShareText);
if (closeShareBtn) closeShareBtn.addEventListener("click", closeShareOverlay);
if (shareOverlay) {
  shareOverlay.addEventListener("click", (event) => {
    if (event.target === shareOverlay) closeShareOverlay();
  });
}

if (startOverFinalBtn) {
  startOverFinalBtn.addEventListener("click", () => {
    hideFinalOverlay();
    resetProgress();
  });
}
if (openCreditsBtn) openCreditsBtn.addEventListener("click", showCreditsOverlay);
if (closeFinalBtn) closeFinalBtn.addEventListener("click", hideFinalOverlay);
if (finalOverlay) {
  finalOverlay.addEventListener("click", (event) => {
    if (event.target === finalOverlay) hideFinalOverlay();
  });
}

if (replayCreditsBtn) replayCreditsBtn.addEventListener("click", () => {
  restartCreditsCrawl();
  playCreditsMusic();
});
if (closeCreditsBtn) closeCreditsBtn.addEventListener("click", hideCreditsOverlay);
if (startOverCreditsBtn) {
  startOverCreditsBtn.addEventListener("click", () => {
    hideCreditsOverlay();
    resetProgress();
  });
}
if (creditsOverlay) {
  creditsOverlay.addEventListener("click", (event) => {
    if (event.target === creditsOverlay) hideCreditsOverlay();
  });
}

if (closeStoryTheaterBtn) closeStoryTheaterBtn.addEventListener("click", closeStoryTheater);
if (storyTheaterOverlay) {
  storyTheaterOverlay.addEventListener("click", (event) => {
    if (event.target === storyTheaterOverlay) closeStoryTheater();
  });
}

resetBtn.addEventListener("click", resetProgress);
restoreLivesBtn.addEventListener("click", restoreLives);
if (dailyStrikeBtn) dailyStrikeBtn.addEventListener("click", claimDailyStrike);
if (languageSelect) {
  languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value || "en");
  });
}
musicToggleBtn.addEventListener("click", () => {
  state.audio.music = !state.audio.music;
  ensureAudio();
  updateAudioState();
});
if (musicVolumeBtn) {
  musicVolumeBtn.addEventListener("click", () => {
    cycleMusicLevel();
  });
}
if (musicStyleBtn) {
  musicStyleBtn.addEventListener("click", () => {
    cycleMusicStyle();
  });
}
sfxToggleBtn.addEventListener("click", () => {
  state.audio.sfx = !state.audio.sfx;
  ensureAudio();
  updateAudioState();
});

difficultyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setDifficulty(btn.dataset.difficulty || "medium");
  });
});

function clampHorizontalScroll() {
  if (window.scrollX !== 0) {
    window.scrollTo(0, window.scrollY);
  }
}

function currentViewportWidth() {
  const widths = [];
  if (window.visualViewport && Number.isFinite(window.visualViewport.width)) {
    widths.push(window.visualViewport.width);
  }
  if (Number.isFinite(window.innerWidth)) {
    widths.push(window.innerWidth);
  }
  if (document.documentElement && Number.isFinite(document.documentElement.clientWidth)) {
    widths.push(document.documentElement.clientWidth);
  }
  if (window.screen && Number.isFinite(window.screen.width)) {
    widths.push(window.screen.width);
  }
  return Math.max(0, ...widths);
}

function normalizeViewportLayout() {
  const root = document.documentElement;
  const body = document.body;
  if (!root || !body) return;

  const viewportWidth = Math.round(currentViewportWidth());
  if (viewportWidth > 0) {
    root.style.setProperty("--faith-vw", `${viewportWidth}px`);
  }

  body.style.maxWidth = "100%";
  body.style.overflowX = "hidden";
  body.style.width = "100%";

  const appRoot = document.querySelector(".app");
  if (appRoot) {
    appRoot.style.width = "100%";
    appRoot.style.maxWidth = viewportWidth > 820 ? "1180px" : "100%";
    appRoot.style.marginLeft = "auto";
    appRoot.style.marginRight = "auto";
    appRoot.style.transform = "none";

    if (viewportWidth > 0) {
      const overflow = appRoot.scrollWidth - viewportWidth;
      body.classList.toggle("phone-tight", viewportWidth <= 430 && overflow > 2);
    } else {
      body.classList.remove("phone-tight");
    }
  }

  clampHorizontalScroll();
}

let viewportNormalizeTimer = 0;
function scheduleViewportNormalization() {
  if (viewportNormalizeTimer) {
    window.clearTimeout(viewportNormalizeTimer);
  }
  viewportNormalizeTimer = window.setTimeout(() => {
    viewportNormalizeTimer = 0;
    normalizeViewportLayout();
  }, 36);
}

clampHorizontalScroll();
normalizeViewportLayout();
window.addEventListener("scroll", clampHorizontalScroll, { passive: true });
window.addEventListener("resize", () => {
  clampHorizontalScroll();
  scheduleViewportNormalization();
});
window.addEventListener("orientationchange", scheduleViewportNormalization);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", scheduleViewportNormalization);
  window.visualViewport.addEventListener("scroll", scheduleViewportNormalization);
}
window.setInterval(clampHorizontalScroll, 420);

initPerformanceModeWatcher();
render();

updateAudioState();

window.setTimeout(primeAudioAuto, 0);
window.setTimeout(primeAudioAuto, 220);
window.setTimeout(primeAudioAuto, 650);
window.addEventListener("pageshow", () => {
  clearHiddenCleanupTimer();
  applyPerformanceMode();
  trimPreloadedMediaCaches();
  primeAudioAuto();
  scheduleViewportNormalization();
});
window.addEventListener("load", () => {
  applyPerformanceMode();
  primeAudioAuto();
  scheduleViewportNormalization();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    clearHiddenCleanupTimer();
    applyPerformanceMode();
    trimPreloadedMediaCaches();
    if (!hubMediaWarmupScheduled) scheduleHubMediaWarmup();
    primeAudioAuto();
    return;
  }

  if (runtimePerformance.performanceLite) {
    trimPreloadedMediaCaches({ aggressive: true });
  } else {
    trimPreloadedMediaCaches();
  }
  scheduleHiddenMediaCleanup();
});
window.addEventListener("pagehide", () => {
  clearHiddenCleanupTimer();
  stopStoryNarration();
  trimPreloadedMediaCaches({ aggressive: true });
});

window.requestAnimationFrame(() => {
  if (!hasResumedSession) {
    resumeLastSession();
    hasResumedSession = true;
  }
});
