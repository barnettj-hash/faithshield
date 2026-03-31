const TOTAL_LEVELS = 100;
const STAGES_PER_LEVEL = 5;
const TOTAL_STAGES = TOTAL_LEVELS * STAGES_PER_LEVEL;
const MAX_LIVES = 5;
const MAX_BADGES = 40;
const XP_STAGE_CLEAR = 25;
const XP_INTERACTIVE_CLEAR = 60;
const CONTENT_VERSION = "2026-03-20-stage5-dynamic-reliability-v1";
const CUTSCENE_DURATION_MS = 15000;
const CUTSCENE_PROGRESS_FRAME_MS_LITE = 80;

const DIFFICULTY_LEVELS = ["easy", "medium", "advanced"];
const SUPPORTED_LANGUAGES = ["en", "es"];
const MASTERY_TARGET_PERCENT = 85;
const DAILY_DEVOTION_REWARD_XP = 35;
const DAILY_DEVOTION_REWARD_LIFE = 1;
const WEEKLY_CHALLENGE_TARGET = 7;
const PROFILE_INDEX_KEY = "faithProfilesIndex";
const PROFILE_ACTIVE_KEY = "faithActiveProfileId";
const PROFILE_PREFIX = "faithProfile::";
const PROFILE_LIMIT = 8;
const WEEKEND_EVENT_ROTATION = [
  {
    id: "double-xp",
    name: "Double XP Weekend",
    description: "Your first stage clear this weekend grants a stronger XP reward.",
    rewardXp: 55,
    rewardLives: 0
  },
  {
    id: "mercy-rest",
    name: "Mercy Weekend",
    description: "Your first stage clear this weekend restores one extra life.",
    rewardXp: 20,
    rewardLives: 1
  },
  {
    id: "shield-drill",
    name: "Shield Drill Weekend",
    description: "Your first stage clear this weekend rewards both practice and courage.",
    rewardXp: 35,
    rewardLives: 1
  }
];
const PROFILE_COLOR_SWATCHES = ["#e5b85d", "#8bd3dd", "#f49f85", "#9fdc8a", "#b3a0ff", "#f4d35e", "#94c8ff", "#f08ca0"];
const MUSIC_LEVELS = {
  low: 0.38,
  medium: 0.54,
  high: 0.68
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
      discern: { maxMissesDelta: 2 },
      spotlight: { roundsDelta: -1, shufflesDelta: -1, maxMissesDelta: 2 },
      memoryflip: { peekDelta: 280, maxMissesDelta: 2 },
      sealbreak: { roundsDelta: -1, targetCountDelta: -1, maxMissesDelta: 2 },
      shieldwall: { targetDelta: -2, maxMissesDelta: 2, speedDelta: 120 }
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
      discern: { maxMissesDelta: 0 },
      spotlight: { roundsDelta: 0, shufflesDelta: 0, maxMissesDelta: 0 },
      memoryflip: { peekDelta: 0, maxMissesDelta: 0 },
      sealbreak: { roundsDelta: 0, targetCountDelta: 0, maxMissesDelta: 0 },
      shieldwall: { targetDelta: 0, maxMissesDelta: 0, speedDelta: 0 }
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
      discern: { maxMissesDelta: -1 },
      spotlight: { roundsDelta: 1, shufflesDelta: 1, maxMissesDelta: -1 },
      memoryflip: { peekDelta: -180, maxMissesDelta: -1 },
      sealbreak: { roundsDelta: 1, targetCountDelta: 1, maxMissesDelta: -1 },
      shieldwall: { targetDelta: 2, maxMissesDelta: -1, speedDelta: -110 }
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
    },
    {
      id: "abram-covenant-memory",
      engine: "memoryflip",
      label: "Covenant Signs",
      maxMisses: 3,
      peekMs: 1420,
      sourceRef: "Genesis 12:2-3; 13:14-17; 15:1-6",
      storyPrompt: "Study the covenant signs Yahweh used to strengthen Abram, then match them from memory.",
      secondaryPrompt: "Memorize the covenant cards, then match every pair.",
      keyboardHint: "Keyboard: press 1-8 to flip cards, or click/tap the board.",
      cards: [
        { icon: "🛡️", label: "Shield" },
        { icon: "⭐", label: "Stars" },
        { icon: "🌍", label: "Land" },
        { icon: "✨", label: "Blessing" }
      ]
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


const QUESTION_ACTIVITY_TYPES = new Set(["quiz", "speaker", "hebrew", "spelling", "order", "fact", "truefalse", "matching"]);
const ACTIVITY_SCHEMA_VERSION = 40;
const LEGACY_THEMED_INTERACTIVE_MODE_SETS = Object.fromEntries(
  Object.entries(THEME_KEYWORDS).filter(([, value]) => (
    Array.isArray(value)
    && value.some((entry) => entry && typeof entry === "object" && typeof entry.engine === "string")
  ))
);
let STAGE_FIVE_THEMED_POOLS = null;
const HARDENED_THEME_NAMES = timelineThemes.map((theme) => theme.name);
const STRICT_SECTION_NO_REPEAT_THEMES = new Set(HARDENED_THEME_NAMES);
const STRICT_THEME_DIFFICULTY_ISOLATION = new Set(HARDENED_THEME_NAMES);
const QUIZ_LINKED_ACTIVITY_TYPES = new Set(["quiz", "speaker", "hebrew", "truefalse", "matching"]);
const SEQUENCE_LINKED_ACTIVITY_TYPES = new Set(["order", "fact", "spelling"]);
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
  Deuteronomy: 4,
  Joshua: 5,
  Judges: 6,
  Ruth: 7,
  "1 Samuel": 8
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
    practicalPrefix: "Practical point",
    badgeUnlockedTitle: "Badge Unlocked",
    badgeUnlockedNow: "New badge earned.",
    replayBadgeCeremony: "Replay Badge Celebration",
    exportBadgeCard: "Export Badge Card",
    downloadCard: "Download Card",
    emailReflection: "Email Reflection",
    shareReflectionCard: "Share Reflection Card",
    reflectionCardTitle: "Daily Reflection",
    reflectionEmailSubject: "My FAITHSHIELD Daily Reflection",
    autoOpenBadgeShield: "Auto-open Badge Shield",
    setBonusesLabel: "Set bonuses"
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
    practicalPrefix: "Punto practico",
    badgeUnlockedTitle: "Insignia Desbloqueada",
    badgeUnlockedNow: "Nueva insignia ganada.",
    replayBadgeCeremony: "Repetir celebracion de insignia",
    exportBadgeCard: "Exportar tarjeta de insignia",
    downloadCard: "Descargar tarjeta",
    emailReflection: "Enviar reflexion",
    shareReflectionCard: "Compartir tarjeta de reflexion",
    reflectionCardTitle: "Reflexion diaria",
    reflectionEmailSubject: "Mi reflexion diaria de FAITHSHIELD",
    autoOpenBadgeShield: "Autoabrir escudo de insignias",
    setBonusesLabel: "Bonos de conjunto"
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
      id: "babel-kiln-timing",
      engine: "timing",
      label: "Kiln Rhythm",
      target: 8,
      maxMisses: 4,
      speed: 740,
      sourceRef: "Genesis 11:3",
      storyPrompt: "Keep steady timing as the kiln fires and bricks are shaped in Babel.",
      secondaryPrompt: "Press Strike when the marker lands in the gold zone.",
      keyboardHint: "Keyboard: press Space or Enter to strike in the gold zone."
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
      id: "babel-brick-collect",
      engine: "collect",
      label: "Brick Gathering",
      target: 11,
      maxMisses: 4,
      seconds: 20,
      spawnMs: 395,
      sourceRef: "Genesis 11:3-4",
      storyPrompt: "Gather the Babel building pieces quickly as the city and tower rise in pride.",
      secondaryPrompt: "Catch the right pieces before the build collapses.",
      keyboardHint: "Keyboard: use Left/Right or A/D to gather the falling pieces."
    },
    {
      id: "babel-tongues-slingshot",
      engine: "slingshot",
      label: "Tongues Disrupted",
      targetRadius: 18,
      maxPull: 124,
      pullPowerScale: 0.155,
      sourceRef: "Genesis 11:7",
      storyPrompt: "Take one precise shot as languages are confused and proud plans are broken.",
      secondaryPrompt: "Pull farther back and strike the tower-master's exposed command seal.",
      keyboardHint: "Keyboard: arrows adjust the pull, Space/Enter launches, and R resets."
    },
    {
      id: "babel-lineage-discern",
      engine: "discern",
      label: "Lineage Check",
      maxMisses: 3,
      sourceRef: "Genesis 10:8; 10:25; 11:26",
      storyPrompt: "Discern key people in the Nations and Babel family lines.",
      secondaryPrompt: "Choose the person or line that matches each prompt.",
      keyboardHint: "Keyboard: press 1-4 to choose the right answer.",
      cards: [
        { icon: "🏹", label: "Nimrod" },
        { icon: "👨", label: "Cush" },
        { icon: "🌍", label: "Japheth" },
        { icon: "👴", label: "Terah" }
      ],
      targets: [
        { prompt: "Who was called a mighty hunter before Yahweh?", correctIndex: 0 },
        { prompt: "Who fathered Nimrod?", correctIndex: 1 },
        { prompt: "Which line includes Gomer, Magog, and Javan?", correctIndex: 2 },
        { prompt: "Who was Abram's father?", correctIndex: 3 }
      ]
    },
    {
      id: "babel-tower-balance",
      engine: "balance",
      label: "Tower Balance",
      target: 8,
      maxMisses: 4,
      drift: 0.028,
      sourceRef: "Genesis 11:4-8",
      storyPrompt: "Hold the tower steady as proud builders try to keep their plan together.",
      secondaryPrompt: "Keep the marker inside the safe band as Babel begins to wobble.",
      keyboardHint: "Keyboard: hold Left/A or Right/D to keep the tower balanced."
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

STAGE_FIVE_THEMED_POOLS = Object.freeze({
  ...LEGACY_THEMED_INTERACTIVE_MODE_SETS,
  ...THEMED_INTERACTIVE_MODE_SETS
});


const badgeSymbolThemes = [
  { icon: "🌳", name: "Tree of Life", era: "genesis" },
  { icon: "🌈", name: "Covenant Rainbow", era: "genesis" },
  { icon: "🛶", name: "Noah's Ark", era: "genesis" },
  { icon: "🕊️", name: "Olive Branch", era: "genesis" },
  { icon: "⭐", name: "Abraham's Stars", era: "patriarchs" },
  { icon: "🪜", name: "Jacob's Ladder", era: "patriarchs" },
  { icon: "🧥", name: "Joseph's Coat", era: "patriarchs" },
  { icon: "🔥", name: "Burning Bush", era: "exodus" },
  { icon: "🪵", name: "Moses' Staff", era: "exodus" },
  { icon: "🐑", name: "Passover Lamb", era: "exodus" },
  { icon: "🌊", name: "Red Sea Path", era: "exodus" },
  { icon: "🪨", name: "Stone Tablets", era: "sinai" },
  { icon: "🍞", name: "Manna Basket", era: "wilderness" },
  { icon: "⛺", name: "Tabernacle Tent", era: "wilderness" },
  { icon: "📯", name: "Jericho Trumpet", era: "conquest" },
  { icon: "⚔️", name: "Gideon's Courage", era: "judges" },
  { icon: "🌾", name: "Ruth's Harvest", era: "judges" },
  { icon: "👂", name: "Samuel's Call", era: "samuel" },
  { icon: "👑", name: "Anointed King", era: "saul" },
  { icon: "🎯", name: "David's Sling", era: "david" },
  { icon: "🕯️", name: "Lamp of Wisdom", era: "david" },
  { icon: "📜", name: "Covenant Scroll", era: "david" },
  { icon: "🏹", name: "Warrior's Aim", era: "david" },
  { icon: "🛡️", name: "Valiant Guard", era: "david" },
  { icon: "🌟", name: "Faithful Star", era: "david" },
  { icon: "🧭", name: "Wilderness Guide", era: "wilderness" },
  { icon: "⛰️", name: "Sinai Summit", era: "sinai" },
  { icon: "🧎", name: "Prayer Kneeler", era: "david" },
  { icon: "🕊️", name: "Peace Dove", era: "david" },
  { icon: "🪙", name: "Treasure Keeper", era: "david" },
  { icon: "⏳", name: "Steadfast Watch", era: "david" },
  { icon: "🔔", name: "Trumpet Call", era: "david" },
  { icon: "📖", name: "Word Bearer", era: "david" },
  { icon: "🧡", name: "Covenant Heart", era: "david" },
  { icon: "🏺", name: "Jar of Oil", era: "david" },
  { icon: "🌿", name: "Branch of Hope", era: "david" },
  { icon: "⚓", name: "Anchor of Trust", era: "david" },
  { icon: "🪔", name: "Light Keeper", era: "david" },
  { icon: "🗡️", name: "Sword of Truth", era: "david" }
];

const BADGE_SET_BONUSES = [
  {
    id: "story-forger",
    icon: "🧭",
    name: "Story Forger",
    rewardXp: 320,
    rewardLives: 1,
    accomplishment: "Completed key level milestones and forged a steady story path.",
    check: (s) => (s.badges || []).filter((badgeId) => String(badgeId).startsWith("level-")).length >= 6
  },
  {
    id: "skill-mastery",
    icon: "⚔️",
    name: "Skill Mastery",
    rewardXp: 380,
    rewardLives: 1,
    accomplishment: "Mastered timing, collecting, dodging, and slingshot challenge paths.",
    check: (s) => {
      const owned = new Set(s.badges || []);
      return owned.has("timing-8")
        && owned.has("collect-8")
        && owned.has("dodge-8")
        && owned.has("slingshot-4");
    }
  },
  {
    id: "shield-covenant",
    icon: "✨",
    name: "Shield Covenant",
    rewardXp: 500,
    rewardLives: 2,
    accomplishment: "Completed all three difficulty seals and reached covenant-level consistency.",
    check: (s) => hasAllDifficultyPasses(s)
      && (s.badges || []).filter((badgeId) => String(badgeId).startsWith("flawless-")).length >= 1
  }
];

const quizBank = [
  { era: "genesis", prompt: "What did God create in the beginning?", options: ["The heavens and the earth", "The ark", "A city", "The sun and the moon"], answer: "The heavens and the earth", sourceRef: "Genesis 1:1" },
  { era: "genesis", prompt: "How many days are in the creation week, including God's rest?", options: ["7", "6", "10", "8"], answer: "7", sourceRef: "Genesis 2:2-3" },
  { era: "genesis", prompt: "Who did God place in the garden to work and keep it?", options: ["Adam", "Noah", "Abel", "Eve"], answer: "Adam", sourceRef: "Genesis 2:15" },
  { era: "genesis", prompt: "Who spoke to the woman in the garden?", options: ["Serpent", "Noah", "Abel", "An angel"], answer: "Serpent", sourceRef: "Genesis 3:1-4" },
  { era: "genesis", prompt: "What did God make for Adam and Eve after the fall?", options: ["Garments of skin", "A boat", "A crown", "Stone houses"], answer: "Garments of skin", sourceRef: "Genesis 3:21" },
  { era: "genesis", prompt: "What sign did God place in the sky after the flood?", options: ["Rainbow", "Comet", "Trumpet", "Lightning"], answer: "Rainbow", sourceRef: "Genesis 9:12-13" },
  { era: "genesis", prompt: "Who built the ark?", options: ["Moses", "Noah", "Abraham", "Cain"], answer: "Noah", sourceRef: "Genesis 6:13-14" },
  { era: "genesis", prompt: "How long did the floodwaters prevail on the earth?", options: ["150 days", "40 days", "7 days", "1 year"], answer: "150 days", sourceRef: "Genesis 7:24" },
  { era: "genesis", prompt: "Where did Noah's ark come to rest?", options: ["Mountains of Ararat", "Plain of Shinar", "Mount Sinai", "Valley of Siddim"], answer: "Mountains of Ararat", sourceRef: "Genesis 8:4" },
  { era: "genesis", prompt: "What did Noah send out first from the ark?", options: ["Raven", "Dove", "Eagle", "Sparrow"], answer: "Raven", sourceRef: "Genesis 8:7" },
  { era: "genesis", prompt: "What command did God give Noah and his sons after the flood?", options: ["Be fruitful and multiply", "Build a tower", "Return to Eden", "Offer incense daily"], answer: "Be fruitful and multiply", sourceRef: "Genesis 9:1" },
  { era: "genesis", prompt: "Who did Noah curse after learning what had happened in his tent?", options: ["Canaan", "Shem", "Japheth", "Ham"], answer: "Canaan", sourceRef: "Genesis 9:25" },
  { era: "genesis", prompt: "Who said, \"Am I my brother's keeper?\"", options: ["Cain", "Abel", "Adam", "Noah"], answer: "Cain", sourceRef: "Genesis 4:9" },
  { era: "genesis", prompt: "Before Babel, what did the whole earth have?", options: ["One language", "Many kingdoms", "Different laws", "Many alphabets"], answer: "One language", sourceRef: "Genesis 11:1" },
  { era: "genesis", prompt: "Where did the people settle before building the tower?", options: ["Shinar", "Eden", "Ararat", "Hebron"], answer: "Shinar", sourceRef: "Genesis 11:2" },
  { era: "genesis", prompt: "What did the builders use for mortar at Babel?", options: ["Tar", "Clay", "Sand", "Straw"], answer: "Tar", sourceRef: "Genesis 11:3" },
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
  { era: "patriarchs", prompt: "Who went with Abram when he departed out of Haran?", options: ["Lot", "Ishmael", "Isaac", "Esau"], answer: "Lot", sourceRef: "Genesis 12:4" },
  { era: "exodus", prompt: "Who confronted Pharaoh and led Israel out of Egypt?", options: ["Joshua", "Moses", "Aaron", "Samuel"], answer: "Moses", sourceRef: "Exodus 5:1; 12:31" },
  { era: "exodus", prompt: "What event protected Israelite homes in Egypt?", options: ["Passover", "Pentecost", "Exile", "Day of Atonement"], answer: "Passover", sourceRef: "Exodus 12:13-14" },
  { era: "exodus", prompt: "What sea did Israel cross on dry ground?", options: ["Red Sea", "Dead Sea", "Galilee", "Mediterranean Sea"], answer: "Red Sea", sourceRef: "Exodus 14:21-22" },
  { era: "exodus", prompt: "Who said, \"Who am I, that I should go to Pharaoh?\"", options: ["Moses", "Aaron", "Pharaoh", "Joshua"], answer: "Moses", sourceRef: "Exodus 3:11" },
  { era: "exodus", prompt: "Who said, \"Don't be afraid. Stand still, and see the salvation of Yahweh\"?", options: ["Moses", "Aaron", "Joshua", "Pharaoh"], answer: "Moses", sourceRef: "Exodus 14:13" },
  { era: "exodus", prompt: "What name did God tell Moses to say forever to all generations?", options: ["Yahweh", "El Roi", "Yahweh Shalom", "El Shaddai"], answer: "Yahweh", sourceRef: "Exodus 3:15" },
  { era: "sinai", prompt: "Where were the Ten Commandments given?", options: ["Mount Sinai", "Mount Carmel", "Mount Zion", "Mount Nebo"], answer: "Mount Sinai", sourceRef: "Exodus 19:20; 20:1" },
  { era: "sinai", prompt: "What did the people promise after hearing the covenant words?", options: ["We will do all that Yahweh has spoken", "We will return to Egypt", "We will follow Pharaoh", "We will build a new kingdom"], answer: "We will do all that Yahweh has spoken", sourceRef: "Exodus 24:7" },
  { era: "sinai", prompt: "What did Moses build at the foot of the mountain after writing all Yahweh's words?", options: ["An altar", "A palace", "A bronze serpent", "A city gate"], answer: "An altar", sourceRef: "Exodus 24:4" },
  { era: "wilderness", prompt: "What food did God provide daily?", options: ["Manna", "Figs", "Barley", "Dates"], answer: "Manna", sourceRef: "Exodus 16:14-15" },
  { era: "wilderness", prompt: "Who helped Moses hold up his hands in battle?", options: ["Aaron and Hur", "Joshua and Caleb", "Nadab and Abihu", "Aaron and Miriam"], answer: "Aaron and Hur", sourceRef: "Exodus 17:12" },
  { era: "wilderness", prompt: "What did Moses call the altar after Amalek was defeated?", options: ["Yahweh Nissi", "Yahweh Yireh", "El Roi", "Yahweh of Armies"], answer: "Yahweh Nissi", sourceRef: "Exodus 17:15" },
  { era: "conquest", prompt: "Who led Israel after Moses?", options: ["Joshua", "Saul", "David", "Aaron"], answer: "Joshua", sourceRef: "Joshua 1:1-2" },
  { era: "conquest", prompt: "How many days did Israel march around Jericho before the final shout?", options: ["7", "3", "12", "6"], answer: "7", sourceRef: "Joshua 6:3-4,15-16" },
  { era: "conquest", prompt: "What river did Israel cross into Canaan?", options: ["Jordan", "Nile", "Euphrates", "Jabbok"], answer: "Jordan", sourceRef: "Joshua 3:14-17" },
  { era: "conquest", prompt: "Which people are named among the nations God would drive out before Israel?", options: ["Hivites", "Philistines", "Persians", "Romans"], answer: "Hivites", sourceRef: "Joshua 3:10" },
  { era: "conquest", prompt: "Which people made peace with Israel by pretending to come from far away?", options: ["Gibeonites", "Moabites", "Philistines", "Midianites"], answer: "Gibeonites", sourceRef: "Joshua 9:3-15" },
  { era: "conquest", prompt: "At the end of Joshua, where were all Israel's tribes gathered for covenant renewal?", options: ["Shechem", "Jericho", "Gilgal", "Shiloh"], answer: "Shechem", sourceRef: "Joshua 24:1" },
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
  { era: "genesis", prompt: "Where did God set His covenant sign after the flood?", options: ["In the cloud", "In the ark", "On the altar", "In the river"], answer: "In the cloud", sourceRef: "Genesis 9:13" },
  { era: "genesis", prompt: "What bird returned to Noah with a freshly plucked olive leaf?", options: ["Dove", "Raven", "Eagle", "Sparrow"], answer: "Dove", sourceRef: "Genesis 8:11" },
  { era: "genesis", prompt: "Who was cursed to be a servant of servants in Noah's words?", options: ["Canaan", "Ham", "Shem", "Japheth"], answer: "Canaan", sourceRef: "Genesis 9:25" },
  { era: "genesis", prompt: "What did the people say before making bricks in Genesis 11:3?", options: ["Come, let's make bricks", "Come, let's cross the sea", "Come, let's seek Joseph", "Come, let's build an ark"], answer: "Come, let's make bricks", sourceRef: "Genesis 11:3" },
  { era: "genesis", prompt: "In Genesis 11:6, how did Yahweh describe the people?", options: ["One people", "A divided nation", "A wandering tribe", "A royal house"], answer: "One people", sourceRef: "Genesis 11:6" },
  { era: "genesis", prompt: "What did Yahweh say He would confuse in Genesis 11:7?", options: ["Their language", "Their harvest", "Their houses", "Their livestock"], answer: "Their language", sourceRef: "Genesis 11:7" },
  { era: "genesis", prompt: "What was the beginning of Nimrod's kingdom?", options: ["Babel", "Bethel", "Beersheba", "Hebron"], answer: "Babel", sourceRef: "Genesis 10:10" },
  { era: "patriarchs", prompt: "How many trained men born in Abram's house did he lead to rescue Lot?", options: ["318", "153", "70", "12"], answer: "318", sourceRef: "Genesis 14:14" },
  { era: "patriarchs", prompt: "What did Jacob see in his dream reaching toward heaven?", options: ["A ladder", "A chariot", "A throne", "A rainbow"], answer: "A ladder", sourceRef: "Genesis 28:12" },
  { era: "patriarchs", prompt: "What did Joseph store during the years of plenty in Egypt?", options: ["Grain", "Gold", "Oil", "Livestock"], answer: "Grain", sourceRef: "Genesis 41:48-49" },
  { era: "patriarchs", prompt: "Who said, \"You intended to harm me, but God intended it for good\"?", options: ["Joseph", "Jacob", "Judah", "Pharaoh"], answer: "Joseph", sourceRef: "Genesis 50:20" },
  { era: "patriarchs", prompt: "What does Yahweh Yireh mean?", options: ["Yahweh will provide", "Yahweh is peace", "Yahweh our Banner", "God Almighty"], answer: "Yahweh will provide", sourceRef: "Genesis 22:14" },
  { era: "patriarchs", prompt: "What does El Shaddai mean in Genesis 17:1?", options: ["God Almighty", "God who sees me", "Yahweh will provide", "Yahweh of Armies"], answer: "God Almighty", sourceRef: "Genesis 17:1" },
  { era: "patriarchs", prompt: "What does El Elyon mean in Genesis 14:18-20?", options: ["God Most High", "God Almighty", "Yahweh will provide", "The Lord of armies"], answer: "God Most High", sourceRef: "Genesis 14:18-20" },
  { era: "patriarchs", prompt: "In Genesis 15:1, God told Abram not to fear because He was Abram's what?", options: ["Shield", "Judge", "Servant", "Tent"], answer: "Shield", sourceRef: "Genesis 15:1" },
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
  { era: "samuel", prompt: "Which title for God appears in 1 Samuel 1:3?", options: ["Yahweh of Armies", "The God who sees me", "Yahweh is peace", "Yahweh will provide"], answer: "Yahweh of Armies", sourceRef: "1 Samuel 1:3" },
  { era: "samuel", prompt: "Who said, \"No, my lord, I am a woman of a sorrowful spirit\"?", options: ["Hannah", "Eli", "Samuel", "Naomi"], answer: "Hannah", sourceRef: "1 Samuel 1:15" },
  { era: "saul", prompt: "From which tribe was Saul?", options: ["Benjamin", "Judah", "Levi", "Ephraim"], answer: "Benjamin", sourceRef: "1 Samuel 9:21" },
  { era: "saul", prompt: "What did Saul do when the Spirit of God came on him after anointing?", options: ["He prophesied", "He built an altar", "He fled to Egypt", "He wrote a psalm"], answer: "He prophesied", sourceRef: "1 Samuel 10:10-11" },
  { era: "saul", prompt: "What did Israel ask Samuel to appoint over them?", options: ["A king", "A new priest", "A judge from Judah", "A temple builder"], answer: "A king", sourceRef: "1 Samuel 8:5" },
  { era: "david", prompt: "Who anointed David as a young man?", options: ["Samuel", "Saul", "Nathan", "Eli"], answer: "Samuel", sourceRef: "1 Samuel 16:13" },
  { era: "david", prompt: "What instrument did David play to soothe Saul?", options: ["Harp", "Trumpet", "Flute", "Drum"], answer: "Harp", sourceRef: "1 Samuel 16:23" },
  { era: "david", prompt: "Who said, \"What have I now done? Is there not a cause?\"", options: ["David", "Eliab", "Saul", "Goliath"], answer: "David", sourceRef: "1 Samuel 17:29" },
  { era: "genesis", prompt: "Who walked with God, and he was not, for God took him?", options: ["Enoch", "Noah", "Seth", "Lamech"], answer: "Enoch", sourceRef: "Genesis 5:24" },
  { era: "genesis", prompt: "What bird did Noah send out first from the ark?", options: ["Raven", "Dove", "Eagle", "Sparrow"], answer: "Raven", sourceRef: "Genesis 8:7" },
  { era: "genesis", prompt: "What wood did God tell Noah to use for the ark?", options: ["Gopher wood", "Cedar", "Acacia", "Olive wood"], answer: "Gopher wood", sourceRef: "Genesis 6:14" },
  { era: "genesis", prompt: "How many days passed after Noah entered the ark before the floodwaters came?", options: ["7 days", "40 days", "12 days", "150 days"], answer: "7 days", sourceRef: "Genesis 7:10" },
  { era: "genesis", prompt: "How old was Noah when the floodwaters came on the earth?", options: ["600 years", "500 years", "700 years", "120 years"], answer: "600 years", sourceRef: "Genesis 7:6" },
  { era: "genesis", prompt: "What did God close after remembering Noah and sending wind over the earth?", options: ["The fountains of the deep and windows of the sky", "The ark door and city gates", "The Jordan and Nile", "The caves and mountains"], answer: "The fountains of the deep and windows of the sky", sourceRef: "Genesis 8:1-2" },
  { era: "genesis", prompt: "What did Noah remove in the first month to see that the ground was drying?", options: ["The covering of the ark", "The altar stones", "The tent curtain", "The rainbow banner"], answer: "The covering of the ark", sourceRef: "Genesis 8:13" },
  { era: "genesis", prompt: "What did God forbid Noah to eat because its life is in it?", options: ["Meat with its blood", "Any fruit from trees", "Fish from the sea", "Bread without yeast"], answer: "Meat with its blood", sourceRef: "Genesis 9:4" },
  { era: "genesis", prompt: "What did Noah begin to do after the flood when he planted a vineyard?", options: ["He became a farmer", "He became a king", "He built a city", "He went back to the ark"], answer: "He became a farmer", sourceRef: "Genesis 9:20" },
  { era: "patriarchs", prompt: "What does the Hebrew name El Roi mean?", options: ["God who sees me", "God Most High", "Yahweh is peace", "Yahweh our Banner"], answer: "God who sees me", sourceRef: "Genesis 16:13" },
  { era: "patriarchs", prompt: "Who named the place Bethel after the dream of the ladder?", options: ["Jacob", "Abraham", "Isaac", "Joseph"], answer: "Jacob", sourceRef: "Genesis 28:19" },
  { era: "exodus", prompt: "Who was appointed to speak for Moses before Pharaoh?", options: ["Aaron", "Joshua", "Hur", "Caleb"], answer: "Aaron", sourceRef: "Exodus 4:14-16" },
  { era: "exodus", prompt: "What did the Israelites ask from Egypt before leaving?", options: ["Silver, gold, and clothing", "Chariots and horses", "Stone tablets", "Land deeds"], answer: "Silver, gold, and clothing", sourceRef: "Exodus 12:35-36" },
  { era: "sinai", prompt: "Who went up with Moses partway on the mountain in Exodus 24:1?", options: ["Aaron, Nadab, Abihu, and seventy elders", "Only Joshua", "Only Aaron", "All Israel"], answer: "Aaron, Nadab, Abihu, and seventy elders", sourceRef: "Exodus 24:1" },
  { era: "sinai", prompt: "What did the people do when they saw thunder, lightning, and the mountain smoke?", options: ["They stood far off", "They ran up the mountain", "They camped at the summit", "They built a city"], answer: "They stood far off", sourceRef: "Exodus 20:18" },
  { era: "wilderness", prompt: "What two names were given to the place where Israel tested Yahweh for water?", options: ["Massah and Meribah", "Shittim and Gilgal", "Bethel and Ai", "Horeb and Carmel"], answer: "Massah and Meribah", sourceRef: "Exodus 17:7" },
  { era: "wilderness", prompt: "Which two spies urged Israel to trust Yahweh and enter the land?", options: ["Joshua and Caleb", "Aaron and Hur", "Moses and Aaron", "Nadab and Abihu"], answer: "Joshua and Caleb", sourceRef: "Numbers 14:6-9" },
  { era: "conquest", prompt: "What did the priests carry when they stepped into the Jordan?", options: ["The ark of the covenant", "The bronze serpent", "Stone tablets", "The lampstand"], answer: "The ark of the covenant", sourceRef: "Joshua 3:14-15" },
  { era: "conquest", prompt: "How many stones were set up as a memorial after crossing Jordan?", options: ["12", "7", "40", "3"], answer: "12", sourceRef: "Joshua 4:20" },
  { era: "judges", prompt: "Who was the first judge raised to deliver Israel after they cried out?", options: ["Othniel", "Gideon", "Samson", "Deborah"], answer: "Othniel", sourceRef: "Judges 3:9-11" },
  { era: "judges", prompt: "Who told Ruth to stay close to his young women in the fields?", options: ["Boaz", "Naomi", "Samuel", "Eli"], answer: "Boaz", sourceRef: "Ruth 2:8" },
  { era: "samuel", prompt: "Who ministered before Yahweh as a boy, wearing a linen ephod?", options: ["Samuel", "Saul", "Jonathan", "Abner"], answer: "Samuel", sourceRef: "1 Samuel 2:18" },
  { era: "samuel", prompt: "What did the name Ichabod mean when the ark was captured?", options: ["The glory has departed", "Yahweh is peace", "God remembers", "The king is chosen"], answer: "The glory has departed", sourceRef: "1 Samuel 4:21-22" },
  { era: "saul", prompt: "What did Samuel pour on Saul's head when he anointed him?", options: ["Oil", "Water", "Wine", "Blood"], answer: "Oil", sourceRef: "1 Samuel 10:1" },
  { era: "saul", prompt: "Where did Saul hide when he was chosen as king?", options: ["Among the baggage", "In the temple", "In a cave", "Behind the altar"], answer: "Among the baggage", sourceRef: "1 Samuel 10:22" },
  { era: "david", prompt: "Who sent David with food to his brothers at the battle line?", options: ["Jesse", "Saul", "Samuel", "Jonathan"], answer: "Jesse", sourceRef: "1 Samuel 17:17-18" },
  { era: "david", prompt: "What did David refuse before facing Goliath?", options: ["Saul's armor", "Five stones", "His sling", "A shepherd's staff"], answer: "Saul's armor", sourceRef: "1 Samuel 17:38-39" },
  { era: "genesis", prompt: "Which divine title did Abraham call on after planting a tamarisk tree in Beersheba?", options: ["Yahweh, the Everlasting God", "El Roi", "Yahweh Nissi", "God Most High"], answer: "Yahweh, the Everlasting God", sourceRef: "Genesis 21:33" },
  { era: "patriarchs", prompt: "In Genesis 32:28, what idea is attached to the name Israel?", options: ["One who has striven with God", "Prince of Egypt", "Servant of Pharaoh", "Keeper of flocks"], answer: "One who has striven with God", sourceRef: "Genesis 32:28" },
  { era: "exodus", prompt: "Who said, \"I don't know Yahweh, and moreover I will not let Israel go\"?", options: ["Pharaoh", "Moses", "Aaron", "Joshua"], answer: "Pharaoh", sourceRef: "Exodus 5:2" },
  { era: "sinai", prompt: "Who said, \"All that Yahweh has spoken we will do, and be obedient\"?", options: ["The people of Israel", "Moses alone", "Aaron and his sons only", "The seventy elders only"], answer: "The people of Israel", sourceRef: "Exodus 24:7" },
  { era: "wilderness", prompt: "Who said, \"Would that we had died in the land of Egypt\" after the spies' report?", options: ["The congregation of Israel", "Moses and Aaron", "Joshua and Caleb", "The Amalekites"], answer: "The congregation of Israel", sourceRef: "Numbers 14:1-2" },
  { era: "conquest", prompt: "Who said, \"As for me and my house, we will serve Yahweh\"?", options: ["Joshua", "Caleb", "Eleazar", "Rahab"], answer: "Joshua", sourceRef: "Joshua 24:15" },
  { era: "judges", prompt: "Who said to his men, \"Look at me, and do likewise\" before the Midianite attack?", options: ["Gideon", "Deborah", "Jephthah", "Samson"], answer: "Gideon", sourceRef: "Judges 7:17" },
  { era: "samuel", prompt: "To what city did the ark come when the Philistines returned it?", options: ["Beth Shemesh", "Shiloh", "Gibeah", "Ramah"], answer: "Beth Shemesh", sourceRef: "1 Samuel 6:13" },
  { era: "saul", prompt: "Who said, \"Bring me the burnt offering and the peace offerings\" at Gilgal?", options: ["Saul", "Samuel", "Jonathan", "Abner"], answer: "Saul", sourceRef: "1 Samuel 13:9" },
  { era: "david", prompt: "After choosing stones, where did David put them before facing Goliath?", options: ["In his shepherd's bag", "In Saul's armor pouch", "In a bronze basket", "In the ark room"], answer: "In his shepherd's bag", sourceRef: "1 Samuel 17:40" },
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
  { era: "judges", prompt: "In Judges' cycle, what usually happened after Israel cried out?", options: ["Yahweh raised up judges", "They were exiled to Babylon", "The temple was rebuilt", "A prophet became king"], answer: "Yahweh raised up judges", sourceRef: "Judges 2:18" },
  { era: "judges", prompt: "What phrase summarizes the spiritual condition in the days of Judges?", options: ["Everyone did what was right in his own eyes", "All Israel followed David", "The law was forgotten forever", "No sacrifices were offered"], answer: "Everyone did what was right in his own eyes", sourceRef: "Judges 21:25" },
  { era: "judges", prompt: "Under whose wings did Boaz say Ruth came to take refuge?", options: ["Yahweh's", "Boaz's", "Naomi's", "Bethlehem's"], answer: "Yahweh's", sourceRef: "Ruth 2:12" },
  { era: "judges", prompt: "Which Hebrew name appears on Gideon's altar in Judges 6:24?", options: ["Yahweh Shalom", "Yahweh Nissi", "El Roi", "Yahweh Yireh"], answer: "Yahweh Shalom", sourceRef: "Judges 6:24" },
  { era: "judges", prompt: "Who said to Ruth, \"Don't be afraid. I will do to you all that you ask\"?", options: ["Boaz", "Naomi", "Samuel", "Eli"], answer: "Boaz", sourceRef: "Ruth 3:11" },
  { era: "samuel", prompt: "What did Samuel say when the Lord stood and called him again after Eli instructed him?", options: ["Speak, for your servant hears", "Here I am, send me", "I am not worthy", "Please choose another"], answer: "Speak, for your servant hears", sourceRef: "1 Samuel 3:10" },
  { era: "samuel", prompt: "What did Hannah vow regarding her son if God gave her one?", options: ["He would be given to Yahweh all his life", "He would serve as king", "He would inherit Eli's house", "He would never leave home"], answer: "He would be given to Yahweh all his life", sourceRef: "1 Samuel 1:11" },
  { era: "samuel", prompt: "Who said, \"For this child I prayed, and Yahweh has given me my petition\"?", options: ["Hannah", "Eli", "Samuel", "Naomi"], answer: "Hannah", sourceRef: "1 Samuel 1:27" },
  { era: "samuel", prompt: "Which title of God appears in 1 Samuel 1:3 and 1:11?", options: ["Yahweh of Armies", "Yahweh Nissi", "El Roi", "Yahweh Yireh"], answer: "Yahweh of Armies", sourceRef: "1 Samuel 1:3" },
  { era: "samuel", prompt: "How did Eli respond after hearing Samuel's report?", options: ["It is Yahweh. Let him do what seems good to him", "I will ask Pharaoh for help", "Bring me the ark now", "I will appoint Saul today"], answer: "It is Yahweh. Let him do what seems good to him", sourceRef: "1 Samuel 3:18" },
  { era: "saul", prompt: "What reason did Saul give for sparing the best Amalekite animals?", options: ["To sacrifice them to Yahweh your God", "To feed his army", "To repay the Kenites", "To sell in Gilgal"], answer: "To sacrifice them to Yahweh your God", sourceRef: "1 Samuel 15:15" },
  { era: "saul", prompt: "What principle did Samuel declare to Saul over ritual?", options: ["To obey is better than sacrifice", "Sacrifice covers all disobedience", "Kings decide their own law", "Victory proves obedience"], answer: "To obey is better than sacrifice", sourceRef: "1 Samuel 15:22" },
  { era: "saul", prompt: "Who said, \"I have sinned; for I have transgressed Yahweh's commandment\"?", options: ["Saul", "Samuel", "David", "Jonathan"], answer: "Saul", sourceRef: "1 Samuel 15:24" },
  { era: "david", prompt: "For how many days did Goliath challenge Israel?", options: ["40 days", "7 days", "12 days", "70 days"], answer: "40 days", sourceRef: "1 Samuel 17:16" },
  { era: "david", prompt: "What did David say the battle belongs to?", options: ["Yahweh", "Israel's army", "Saul's crown", "The strongest warrior"], answer: "Yahweh", sourceRef: "1 Samuel 17:47" },
  { era: "david", prompt: "Who said, \"You come to me with a sword, with a spear, and with a javelin; but I come to you in Yahweh of Armies' name\"?", options: ["David", "Saul", "Goliath", "Samuel"], answer: "David", sourceRef: "1 Samuel 17:45" },
  { era: "david", prompt: "Who said, \"Am I a dog, that you come to me with staffs?\"?", options: ["Goliath", "David", "Saul", "Abner"], answer: "Goliath", sourceRef: "1 Samuel 17:43" },
  { era: "david", prompt: "From where did David take the stones before facing Goliath?", options: ["The stream bed", "Saul's armory", "Bethlehem fields", "Priest's altar"], answer: "The stream bed", sourceRef: "1 Samuel 17:40" },
  { era: "genesis", prompt: "Who said, \"My punishment is greater than I can bear\"?", options: ["Cain", "Adam", "Noah", "Lamech"], answer: "Cain", sourceRef: "Genesis 4:13" },
  { era: "genesis", prompt: "After the dove returned with an olive leaf, what did Noah know?", options: ["The waters had gone down", "The flood had just begun", "The ark had sunk", "The tower was finished"], answer: "The waters had gone down", sourceRef: "Genesis 8:11" },
  { era: "genesis", prompt: "On what day of the seventh month did the ark rest on Ararat?", options: ["17th day", "1st day", "10th day", "40th day"], answer: "17th day", sourceRef: "Genesis 8:4" },
  { era: "genesis", prompt: "In what month were the tops of the mountains first seen after the flood?", options: ["10th month", "7th month", "1st month", "12th month"], answer: "10th month", sourceRef: "Genesis 8:5" },
  { era: "genesis", prompt: "How many days after mountain tops appeared did Noah open the window of the ark?", options: ["40 days", "7 days", "30 days", "150 days"], answer: "40 days", sourceRef: "Genesis 8:6" },
  { era: "genesis", prompt: "What promise did Yahweh speak in His heart after Noah's offering?", options: ["He would not again curse the ground because of man", "He would send another flood in seven years", "He would remove winter and summer", "He would end seedtime and harvest"], answer: "He would not again curse the ground because of man", sourceRef: "Genesis 8:21-22" },
  { era: "genesis", prompt: "According to Genesis 9:10, God's covenant after the flood included whom?", options: ["Every living creature with Noah", "Only Noah's household", "Only the clean animals", "Only birds of the sky"], answer: "Every living creature with Noah", sourceRef: "Genesis 9:10" },
  { era: "genesis", prompt: "What did God call the bow in the cloud in Genesis 9?", options: ["The sign of the covenant", "The sword of judgment", "The gate of heaven", "The mark of Noah"], answer: "The sign of the covenant", sourceRef: "Genesis 9:12-13" },
  { era: "genesis", prompt: "What sentence is given in Genesis 9:6 for shedding human blood?", options: ["By man shall his blood be shed", "He must build an altar", "He must leave the land forever", "He must offer seven lambs"], answer: "By man shall his blood be shed", sourceRef: "Genesis 9:6" },
  { era: "genesis", prompt: "At Babel, what danger were the people trying to avoid according to Genesis 11:4?", options: ["Being scattered over the earth", "Losing their crops", "Being defeated by Egypt", "Forgetting their language"], answer: "Being scattered over the earth", sourceRef: "Genesis 11:4" },
  { era: "patriarchs", prompt: "Who said, \"I am not worthy of the least of all the loving kindnesses\"?", options: ["Jacob", "Abraham", "Isaac", "Joseph"], answer: "Jacob", sourceRef: "Genesis 32:10" },
  { era: "patriarchs", prompt: "In Genesis 49:10, from which tribe did Jacob say the scepter would not depart?", options: ["Judah", "Levi", "Benjamin", "Ephraim"], answer: "Judah", sourceRef: "Genesis 49:10" },
  { era: "patriarchs", prompt: "Which Hebrew title means \"God who sees me\" in Hagar's confession?", options: ["El Roi", "El Elyon", "Yahweh Nissi", "Yahweh Shalom"], answer: "El Roi", sourceRef: "Genesis 16:13" },
  { era: "exodus", prompt: "When Moses put his hand into his cloak at Horeb, how did it come out the first time?", options: ["Leprous like snow", "Covered in blood", "Burning with fire", "Shining like bronze"], answer: "Leprous like snow", sourceRef: "Exodus 4:6" },
  { era: "exodus", prompt: "Who said, \"Yahweh will fight for you, and you shall be still\"?", options: ["Moses", "Aaron", "Joshua", "Pharaoh"], answer: "Moses", sourceRef: "Exodus 14:14" },
  { era: "sinai", prompt: "What is the first commandment spoken in Exodus 20?", options: ["You shall have no other gods before me", "Honor your father and mother", "You shall not steal", "Remember the sabbath day"], answer: "You shall have no other gods before me", sourceRef: "Exodus 20:3" },
  { era: "sinai", prompt: "Who read the book of the covenant in the hearing of the people?", options: ["Moses", "Aaron", "Joshua", "Nadab"], answer: "Moses", sourceRef: "Exodus 24:7" },
  { era: "wilderness", prompt: "How long did the spies search the land before returning to Israel's camp?", options: ["40 days", "7 days", "12 days", "70 days"], answer: "40 days", sourceRef: "Numbers 13:25" },
  { era: "wilderness", prompt: "Who made and lifted the bronze serpent so bitten Israelites could look and live?", options: ["Moses", "Aaron", "Joshua", "Caleb"], answer: "Moses", sourceRef: "Numbers 21:9" },
  { era: "conquest", prompt: "What happened to Jericho's wall after the people shouted?", options: ["It fell down flat", "It burned slowly", "It split the river", "It rose higher"], answer: "It fell down flat", sourceRef: "Joshua 6:20" },
  { era: "conquest", prompt: "Whose house was spared in Jericho because of the scarlet line?", options: ["Rahab's", "Achan's", "Joshua's", "Caleb's"], answer: "Rahab's", sourceRef: "Joshua 6:25" },
  { era: "judges", prompt: "What did Samson carry to the top of the hill toward Hebron?", options: ["The gates of Gaza", "The ark of the covenant", "A stone altar", "A trumpet"], answer: "The gates of Gaza", sourceRef: "Judges 16:3" },
  { era: "judges", prompt: "Who said, \"Your people shall be my people, and your God my God\"?", options: ["Ruth", "Naomi", "Deborah", "Hannah"], answer: "Ruth", sourceRef: "Ruth 1:16" },
  { era: "samuel", prompt: "What does 1 Samuel 3:19 say happened to Samuel's words?", options: ["None of them fell to the ground", "All were forgotten", "Only priests heard them", "They were hidden in Shiloh"], answer: "None of them fell to the ground", sourceRef: "1 Samuel 3:19" },
  { era: "samuel", prompt: "Who said, \"It is Yahweh. Let him do what seems good to him\"?", options: ["Eli", "Samuel", "Hannah", "Saul"], answer: "Eli", sourceRef: "1 Samuel 3:18" },
  { era: "saul", prompt: "Whom did Saul spare alive when he struck Amalek?", options: ["Agag", "Doeg", "Abner", "Jonathan"], answer: "Agag", sourceRef: "1 Samuel 15:8-9" },
  { era: "saul", prompt: "According to Samuel, why was Saul rejected from being king?", options: ["He rejected Yahweh's word", "He was too short", "He lost one battle", "He left Gibeah"], answer: "He rejected Yahweh's word", sourceRef: "1 Samuel 15:23" },
  { era: "david", prompt: "Who ran quickly toward the battle line to meet the Philistine?", options: ["David", "Saul", "Jonathan", "Abner"], answer: "David", sourceRef: "1 Samuel 17:48" },
  { era: "david", prompt: "Which name of God did David use when he faced Goliath?", options: ["Yahweh of Armies", "El Roi", "Yahweh Shalom", "El Elyon"], answer: "Yahweh of Armies", sourceRef: "1 Samuel 17:45" },
  { era: "genesis", prompt: "Who named his son Noah, saying, \"This same will comfort us\"?", options: ["Lamech", "Noah", "Seth", "Enoch"], answer: "Lamech", sourceRef: "Genesis 5:29" },
  { era: "patriarchs", prompt: "Which Hebrew title did Jacob use at Bethel when he vowed, \"Yahweh will be my God\"?", options: ["Elohim", "El Roi", "El Elyon", "Yahweh Nissi"], answer: "Elohim", sourceRef: "Genesis 28:20-21" },
  { era: "exodus", prompt: "Who said, \"Please, Lord, I am not eloquent... I am slow of speech\"?", options: ["Moses", "Aaron", "Pharaoh", "Joshua"], answer: "Moses", sourceRef: "Exodus 4:10" },
  { era: "sinai", prompt: "At Sinai, who was told, \"Don't let the priests and the people break through to come up to Yahweh\"?", options: ["Moses", "Aaron", "Joshua", "Nadab"], answer: "Moses", sourceRef: "Exodus 19:24" },
  { era: "wilderness", prompt: "Who said, \"Would that we had died in this wilderness\" after hearing the spies?", options: ["All the children of Israel", "Joshua and Caleb", "Moses and Aaron", "The Amalekites"], answer: "All the children of Israel", sourceRef: "Numbers 14:2" },
  { era: "conquest", prompt: "Who told the two spies, \"I know that Yahweh has given you the land\"?", options: ["Rahab", "Achan", "Caleb", "Deborah"], answer: "Rahab", sourceRef: "Joshua 2:9" },
  { era: "judges", prompt: "Who said, \"If now I have found favor in your eyes, then show me a sign\" before preparing an offering?", options: ["Gideon", "Samson", "Jephthah", "Boaz"], answer: "Gideon", sourceRef: "Judges 6:17" },
  { era: "samuel", prompt: "Who said, \"Talk no more so exceedingly proudly\" in her song?", options: ["Hannah", "Eli", "Samuel", "Saul"], answer: "Hannah", sourceRef: "1 Samuel 2:3" },
  { era: "saul", prompt: "Who said, \"Because you have rejected Yahweh's word, he has also rejected you from being king\"?", options: ["Samuel", "Saul", "Jonathan", "Abner"], answer: "Samuel", sourceRef: "1 Samuel 15:23" },
  { era: "david", prompt: "Who said, \"This day Yahweh will deliver you into my hand\"?", options: ["David", "Goliath", "Saul", "Jonathan"], answer: "David", sourceRef: "1 Samuel 17:46" }
];

const spellingBank = [
  { era: "genesis", prompt: "Spell the garden God planted in the east.", answer: "Eden", sourceRef: "Genesis 2:8" },
  { era: "genesis", prompt: "Spell the first man's name.", answer: "Adam", sourceRef: "Genesis 3:17" },
  { era: "genesis", prompt: "Spell the name Adam gave the woman in Genesis 3.", answer: "Eve", sourceRef: "Genesis 3:20" },
  { era: "genesis", prompt: "Spell the name of the man who built the ark.", answer: "Noah", sourceRef: "Genesis 6:13-14" },
  { era: "genesis", prompt: "Spell the covenant sign God set in the sky after the flood.", answer: "Rainbow", sourceRef: "Genesis 9:13" },
  { era: "genesis", prompt: "Spell the mountain range where the ark rested.", answer: "Ararat", sourceRef: "Genesis 8:4" },
  { era: "genesis", prompt: "Spell the son Noah cursed in Genesis 9.", answer: "Canaan", sourceRef: "Genesis 9:25" },
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
  { era: "genesis", prompt: "Spell the kind of wood Noah used for the ark.", answer: "gopher", sourceRef: "Genesis 6:14" },
  { era: "genesis", prompt: "Type the bird Noah sent out first from the ark.", answer: "raven", sourceRef: "Genesis 8:7" },
  { era: "genesis", prompt: "Spell the plain where the people settled before Babel.", answer: "Shinar", acceptedAnswers: ["Shiner"], sourceRef: "Genesis 11:2" },
  { era: "genesis", prompt: "Spell the material used for mortar at Babel.", answer: "Tar", sourceRef: "Genesis 11:3" },
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
  { era: "genesis", prompt: "Type the chapter-9 command word in Genesis 9:1: 'Be ___ and multiply'.", answer: "fruitful", sourceRef: "Genesis 9:1" },
  { era: "genesis", prompt: "Type the word describing the earth in Genesis 6:11.", answer: "violence", sourceRef: "Genesis 6:11" },
  { era: "genesis", prompt: "Type the covenant duration word in Genesis 9:16.", answer: "everlasting", sourceRef: "Genesis 9:16" },
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
  { era: "genesis", items: ["Noah is six hundred years old", "Floodwaters come", "All high mountains are covered"], sourceRef: "Genesis 7:6; 7:10-11; 7:19" },
  { era: "genesis", items: ["God remembers Noah", "Waters recede", "Noah removes the ark covering"], sourceRef: "Genesis 8:1; 8:3; 8:13" },
  { era: "genesis", items: ["God blesses Noah", "Food includes living creatures", "Blood command is given"], sourceRef: "Genesis 9:1; 9:3; 9:4" },
  { era: "genesis", items: ["Noah plants a vineyard", "Ham sees his father's nakedness", "Noah blesses Shem and Japheth"], sourceRef: "Genesis 9:20; 9:22; 9:26-27" },
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
  { era: "david", items: ["David anointed", "Goliath defeated", "David flees Saul"], sourceRef: "1 Samuel 16:13; 17:50; 19:10" },
  { era: "genesis", items: ["Waters gathered", "Plants sprouted", "Humanity created"], sourceRef: "Genesis 1:9-10; 1:11-12; 1:27" },
  { era: "patriarchs", items: ["Abram called from Haran", "Covenant sign given", "Isaac offered on Moriah"], sourceRef: "Genesis 12:1-4; 17:11; 22:10-12" },
  { era: "exodus", items: ["Moses returns to Egypt", "Passover kept", "Sea divided"], sourceRef: "Exodus 4:20; 12:28; 14:21" },
  { era: "sinai", items: ["People prepare for the third day", "Yahweh descends on Sinai", "Book of the covenant read"], sourceRef: "Exodus 19:10-11; 19:18; 24:7" },
  { era: "wilderness", items: ["Spies explore Canaan", "Israel rebels", "Forty-year judgment declared"], sourceRef: "Numbers 13:25; 14:1-2; 14:33-34" },
  { era: "conquest", items: ["Ark enters Jordan", "Twelve stones taken", "Jericho marched seven days"], sourceRef: "Joshua 3:14-17; 4:8; 6:15" },
  { era: "judges", items: ["Othniel delivers Israel", "Deborah judges Israel", "Gideon defeats Midian"], sourceRef: "Judges 3:9-11; 4:4; 7:22" },
  { era: "samuel", items: ["Samuel serves in Shiloh", "Yahweh calls Samuel", "Samuel reports the vision to Eli"], sourceRef: "1 Samuel 2:18; 3:10; 3:18" },
  { era: "saul", items: ["Saul anointed", "Saul chosen by lot", "Saul spares Agag"], sourceRef: "1 Samuel 10:1; 10:20-24; 15:8-9" },
  { era: "david", items: ["David sent by Jesse", "David rejects Saul's armor", "David strikes Goliath"], sourceRef: "1 Samuel 17:17; 17:39; 17:49" },
  { era: "genesis", items: ["Cain kills Abel", "Yahweh questions Cain", "Cain is driven from the ground"], sourceRef: "Genesis 4:8-12" },
  { era: "patriarchs", items: ["Abram departs Haran", "Abram builds altar at Shechem", "Lot chooses the Jordan plain"], sourceRef: "Genesis 12:4-7; 13:11" },
  { era: "exodus", items: ["Moses speaks to Pharaoh", "Nile turns to blood", "Frogs cover Egypt"], sourceRef: "Exodus 5:1; 7:20; 8:6" },
  { era: "sinai", items: ["Moses writes Yahweh's words", "Offerings are presented", "Blood is sprinkled on the people"], sourceRef: "Exodus 24:4-8" },
  { era: "wilderness", items: ["People quarrel for water at Rephidim", "Water comes from the rock", "Altar called Yahweh Nissi"], sourceRef: "Exodus 17:1-6,15" },
  { era: "conquest", items: ["Rahab hides the spies", "Scarlet line marked in the window", "Rahab's household is spared"], sourceRef: "Joshua 2:4,18; 6:25" },
  { era: "judges", items: ["Israel serves the Baals", "Yahweh gives them into spoilers' hands", "Yahweh raises judges"], sourceRef: "Judges 2:11,14,16" },
  { era: "samuel", items: ["Hannah lends Samuel to Yahweh", "Samuel ministers before Yahweh", "Yahweh reveals himself at Shiloh"], sourceRef: "1 Samuel 1:28; 2:18; 3:21" },
  { era: "saul", items: ["Saul is proclaimed king", "Saul offers burnt offering at Gilgal", "Samuel says Saul's kingdom will not continue"], sourceRef: "1 Samuel 10:24; 13:9; 13:14" },
  { era: "david", items: ["David hears Goliath's challenge", "David picks five smooth stones", "Stone strikes Goliath's forehead"], sourceRef: "1 Samuel 17:23; 17:40; 17:49" }
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
  { era: "genesis", items: ["Seven-day warning given", "Noah enters the ark", "Flood begins"], sourceRef: "Genesis 7:4; 7:7; 7:10-11" },
  { era: "genesis", items: ["Ark rests on Ararat", "Mountain tops appear", "Forty days pass before Noah opens the window"], sourceRef: "Genesis 8:4; 8:5; 8:6" },
  { era: "genesis", items: ["Noah sends raven", "Noah sends dove", "Noah waits seven more days and sends the dove again"], sourceRef: "Genesis 8:7; 8:8; 8:10" },
  { era: "genesis", items: ["Noah offers burnt offerings", "Yahweh promises seedtime and harvest", "God sets His bow in the cloud"], sourceRef: "Genesis 8:20-22; 9:13" },
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
  { era: "david", items: ["David anointed", "David defeats Goliath", "Jonathan and David covenant"], sourceRef: "1 Samuel 16:13; 17:50; 18:3" },
  { era: "genesis", items: ["Humanity multiplies", "Violence fills earth", "Noah finds favor"], sourceRef: "Genesis 6:1; 6:11; 6:8" },
  { era: "patriarchs", items: ["Abram believes Yahweh", "Covenant sign established", "Ram provided instead of Isaac"], sourceRef: "Genesis 15:6; 17:11; 22:13-14" },
  { era: "exodus", items: ["Moses sent to Pharaoh", "Passover blood applied", "Egyptians urge Israel to leave"], sourceRef: "Exodus 3:10; 12:7; 12:33" },
  { era: "sinai", items: ["Moses writes Yahweh's words", "Blood sprinkled on the people", "Moses enters the cloud"], sourceRef: "Exodus 24:4; 24:8; 24:18" },
  { era: "wilderness", items: ["Spies return after forty days", "Caleb urges trust", "Generation sentenced to wander"], sourceRef: "Numbers 13:25; 14:6-9; 14:33-34" },
  { era: "conquest", items: ["Jordan waters stand in a heap", "Rahab and family spared", "Covenant renewed at Shechem"], sourceRef: "Joshua 3:16; 6:25; 24:25" },
  { era: "judges", items: ["Angel calls Gideon", "Army reduced to three hundred", "Midian camp falls"], sourceRef: "Judges 6:12; 7:7; 7:22" },
  { era: "samuel", items: ["Samuel says \"Speak, for your servant hears\"", "Word of Yahweh established with Samuel", "Philistines subdued in Samuel's days"], sourceRef: "1 Samuel 3:10; 3:19; 7:13" },
  { era: "saul", items: ["Saul chosen king", "Saul spares Agag", "Samuel declares rejection"], sourceRef: "1 Samuel 10:24; 15:8-9; 15:26" },
  { era: "david", items: ["David runs toward the battle", "Stone sinks into Goliath's forehead", "Philistine army flees"], sourceRef: "1 Samuel 17:48; 17:49; 17:51" }
];

const orderBank = [


  { era: "genesis", items: ["Creation", "Fall", "Flood"], sourceRef: "Genesis 1:1; 3:6-7; 7:17" },
  { era: "genesis", items: ["Light", "People created", "God rested"], sourceRef: "Genesis 1:3; 1:27; 2:2-3" },
  { era: "genesis", items: ["Serpent tempts", "Sin enters", "God sends them out"], sourceRef: "Genesis 3:1-6; 3:23" },
  { era: "genesis", items: ["Noah builds the ark", "Flood waters rise", "Rainbow sign appears"], sourceRef: "Genesis 6:22; 7:17; 9:13" },
  { era: "genesis", items: ["Animals enter ark", "Rain falls", "Waters recede"], sourceRef: "Genesis 7:9; 7:12; 8:3" },
  { era: "genesis", items: ["Noah offers burnt offering", "God promises seedtime and harvest", "Covenant sign is given"], sourceRef: "Genesis 8:20-22; 9:13" },
  { era: "genesis", items: ["Flood ends", "Nations spread", "Tower of Babel"], sourceRef: "Genesis 8:13; 10:32; 11:1-9" },
  { era: "genesis", items: ["God sees earth's violence", "Noah enters the ark", "Yahweh shuts him in"], sourceRef: "Genesis 6:12-13; 7:7; 7:16" },
  { era: "genesis", items: ["Rain falls forty days", "Waters prevail one hundred fifty days", "Ark rests on Ararat"], sourceRef: "Genesis 7:12; 7:24; 8:4" },
  { era: "genesis", items: ["Raven sent out", "Dove sent out", "Dove returns with olive leaf"], sourceRef: "Genesis 8:7; 8:8; 8:11" },
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
  { era: "david", items: ["David anointed", "David serves Saul", "Goliath defeated"], sourceRef: "1 Samuel 16:13,21; 17:50" },
  { era: "genesis", items: ["Day and night separated", "Fish and birds created", "Humans created"], sourceRef: "Genesis 1:4-5; 1:20-21; 1:27" },
  { era: "patriarchs", items: ["Abram called", "Covenant of stars", "Jacob named Israel"], sourceRef: "Genesis 12:1; 15:5; 32:28" },
  { era: "exodus", items: ["Moses called at bush", "Passover night", "Sea crossed on dry ground"], sourceRef: "Exodus 3:4; 12:29-31; 14:21-22" },
  { era: "sinai", items: ["People prepare", "God speaks commandments", "Covenant sealed"], sourceRef: "Exodus 19:10; 20:1; 24:8" },
  { era: "wilderness", items: ["Manna given", "Spies sent", "Bronze serpent lifted"], sourceRef: "Exodus 16:15; Numbers 13:1-2; Numbers 21:9" },
  { era: "conquest", items: ["Ark enters Jordan", "Walls of Jericho fall", "Joshua renews covenant"], sourceRef: "Joshua 3:14-17; 6:20; 24:25" },
  { era: "judges", items: ["Othniel judges", "Deborah judges", "Gideon delivers"], sourceRef: "Judges 3:9; 4:4; 7:22" },
  { era: "samuel", items: ["Hannah prays", "Samuel hears God's voice", "Samuel warns Israel"], sourceRef: "1 Samuel 1:10; 3:10; 7:3" },
  { era: "saul", items: ["Saul anointed", "Saul chosen king", "Saul rejected"], sourceRef: "1 Samuel 10:1; 10:24; 15:23" },
  { era: "david", items: ["David sent by Jesse", "David takes five stones", "David defeats Goliath"], sourceRef: "1 Samuel 17:17; 17:40; 17:50" }
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
  { era: "genesis", parts: ["All", "the", "high", "mountains", "were", "covered"], sourceRef: "Genesis 7:19" },
  { era: "genesis", parts: ["The", "waters", "prevailed", "on", "the", "earth", "one", "hundred", "fifty", "days"], sourceRef: "Genesis 7:24" },
  { era: "genesis", parts: ["Yahweh", "smelled", "the", "pleasant", "aroma"], sourceRef: "Genesis 8:21" },
  { era: "genesis", parts: ["The", "waters", "will", "no", "more", "become", "a", "flood", "to", "destroy", "all", "flesh"], sourceRef: "Genesis 9:15" },
  { era: "genesis", parts: ["I", "set", "my", "rainbow", "in", "the", "cloud"], sourceRef: "Genesis 9:13" },
  { era: "genesis", parts: ["The", "waters", "prevailed", "one", "hundred", "fifty", "days"], sourceRef: "Genesis 7:24" },
  { era: "genesis", parts: ["The", "ark", "rested", "on", "Ararat"], sourceRef: "Genesis 8:4" },
  { era: "genesis", parts: ["Be", "fruitful", "and", "multiply"], sourceRef: "Genesis 9:1" },
  { era: "genesis", parts: ["This", "is", "the", "sign", "of", "the", "covenant"], sourceRef: "Genesis 9:12" },
  { era: "genesis", parts: ["I", "establish", "my", "covenant", "with", "you"], sourceRef: "Genesis 9:9" },
  { era: "genesis", parts: ["The", "end", "of", "all", "flesh", "has", "come", "before", "me"], sourceRef: "Genesis 6:13" },
  { era: "genesis", parts: ["Noah", "was", "six", "hundred", "years", "old"], sourceRef: "Genesis 7:6" },
  { era: "genesis", parts: ["The", "fountains", "of", "the", "deep", "were", "stopped"], sourceRef: "Genesis 8:2" },
  { era: "genesis", parts: ["While", "the", "earth", "remains", "seedtime", "and", "harvest", "will", "not", "cease"], sourceRef: "Genesis 8:22" },
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
  { era: "genesis", parts: ["All", "the", "high", "mountains", "were", "covered"], sourceRef: "Genesis 7:19" },
  { era: "genesis", parts: ["The", "waters", "prevailed", "on", "the", "earth", "one", "hundred", "fifty", "days"], sourceRef: "Genesis 7:24" },
  { era: "genesis", parts: ["Yahweh", "smelled", "the", "pleasant", "aroma"], sourceRef: "Genesis 8:21" },
  { era: "genesis", parts: ["The", "waters", "will", "no", "more", "become", "a", "flood", "to", "destroy", "all", "flesh"], sourceRef: "Genesis 9:15" },
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
  { era: "genesis", parts: ["The", "waters", "prevailed", "one", "hundred", "fifty", "days"], sourceRef: "Genesis 7:24" },
  { era: "genesis", parts: ["The", "ark", "rested", "on", "Ararat"], sourceRef: "Genesis 8:4" },
  { era: "genesis", parts: ["Be", "fruitful", "and", "multiply"], sourceRef: "Genesis 9:1" },
  { era: "genesis", parts: ["This", "is", "the", "sign", "of", "the", "covenant"], sourceRef: "Genesis 9:12" },
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

const NATIONS_BABEL_QUIZ_EASY_EXPANSION = [
  { era: "genesis", prompt: "Who begat (fathered) Nimrod according to Genesis 10:8?", options: ["Cush", "Ham", "Shem", "Japheth"], answer: "Cush", sourceRef: "Genesis 10:8" },
  { era: "genesis", prompt: "Which one is NOT listed as a son of Japheth in Genesis 10:2?", options: ["Canaan", "Gomer", "Magog", "Javan"], answer: "Canaan", sourceRef: "Genesis 10:2" },
  { era: "genesis", prompt: "Who was Abram's father in Genesis 11:26?", options: ["Terah", "Nahor", "Haran", "Eber"], answer: "Terah", sourceRef: "Genesis 11:26" },
  { era: "genesis", prompt: "How old was Shem when he became the father of Arphaxad?", options: ["100 years", "90 years", "70 years", "120 years"], answer: "100 years", sourceRef: "Genesis 11:10" },
  { era: "genesis", prompt: "How many years after the flood did Shem father Arphaxad?", options: ["2 years", "7 years", "40 years", "12 years"], answer: "2 years", sourceRef: "Genesis 11:10" },
  { era: "genesis", prompt: "In which land did Nimrod's kingdom begin?", options: ["Shinar", "Canaan", "Ararat", "Egypt"], answer: "Shinar", sourceRef: "Genesis 10:10" },
  { era: "genesis", prompt: "Who fathered Peleg and Joktan?", options: ["Eber", "Shelah", "Arphaxad", "Reu"], answer: "Eber", sourceRef: "Genesis 10:25" },
  { era: "genesis", prompt: "Where did Terah settle while traveling toward Canaan?", options: ["Haran", "Ur", "Babel", "Hebron"], answer: "Haran", sourceRef: "Genesis 11:31" },
  { era: "genesis", prompt: "According to Genesis 11:30, what was true of Sarai?", options: ["She was barren", "She was queen in Ur", "She had seven children", "She was a prophetess"], answer: "She was barren", sourceRef: "Genesis 11:30" },
  { era: "genesis", prompt: "Who said, \"Come, let's make bricks, and burn them thoroughly\"?", options: ["The people", "Nimrod", "Noah", "Yahweh"], answer: "The people", sourceRef: "Genesis 11:3" },
  { era: "genesis", prompt: "Who said, \"Come, let's build ourselves a city, and a tower\"?", options: ["The people", "Terah", "Shem", "Yahweh"], answer: "The people", sourceRef: "Genesis 11:4" },
  { era: "genesis", prompt: "Which divine name appears in Genesis 11:5-9 in the WEB text?", options: ["Yahweh", "El Shaddai", "Yahweh Nissi", "El Roi"], answer: "Yahweh", sourceRef: "Genesis 11:5-9" },
  { era: "genesis", prompt: "Who was Nimrod called in Genesis 10:9?", options: ["A mighty hunter before Yahweh", "A priest in Shinar", "A son of Shem", "A king in Egypt"], answer: "A mighty hunter before Yahweh", sourceRef: "Genesis 10:9" },
  { era: "genesis", prompt: "What did the Babel builders use instead of stone?", options: ["Brick", "Timber", "Marble", "Iron"], answer: "Brick", sourceRef: "Genesis 11:3" },
  { era: "genesis", prompt: "Which grandson did Terah take with Abram and Sarai from Ur?", options: ["Lot", "Peleg", "Arphaxad", "Canaan"], answer: "Lot", sourceRef: "Genesis 11:31" },
  { era: "genesis", prompt: "Which two sons are named for Eber in Genesis 10:25?", options: ["Peleg and Joktan", "Shem and Ham", "Abram and Nahor", "Cush and Canaan"], answer: "Peleg and Joktan", sourceRef: "Genesis 10:25" },
  { era: "genesis", prompt: "What name was given to the city because Yahweh confused language there?", options: ["Babel", "Bethel", "Nineveh", "Hebron"], answer: "Babel", sourceRef: "Genesis 11:9" }
];

const NATIONS_BABEL_QUIZ_MEDIUM_EXPANSION = [
  { era: "genesis", prompt: "Why was the name Peleg given in Genesis 10:25?", options: ["In his days the earth was divided", "He built Babel", "He crossed the sea", "He named Abram"], answer: "In his days the earth was divided", sourceRef: "Genesis 10:25" },
  { era: "genesis", prompt: "Who was the father of Eber?", options: ["Shelah", "Arphaxad", "Peleg", "Joktan"], answer: "Shelah", sourceRef: "Genesis 10:24; 11:14" },
  { era: "genesis", prompt: "Which city is listed in the beginning of Nimrod's kingdom?", options: ["Accad", "Jericho", "Hebron", "Bethel"], answer: "Accad", sourceRef: "Genesis 10:10" },
  { era: "genesis", prompt: "Who married Milcah, the daughter of Haran?", options: ["Nahor", "Abram", "Terah", "Lot"], answer: "Nahor", sourceRef: "Genesis 11:29" },
  { era: "genesis", prompt: "Who was the father of Lot?", options: ["Haran", "Nahor", "Abram", "Eber"], answer: "Haran", sourceRef: "Genesis 11:27" },
  { era: "genesis", prompt: "From where did Terah depart when heading toward Canaan?", options: ["Ur of the Chaldees", "Haran", "Shinar", "Ararat"], answer: "Ur of the Chaldees", sourceRef: "Genesis 11:31" },
  { era: "genesis", prompt: "Who did Terah take with Abram and Sarai on the journey?", options: ["Lot", "Ishmael", "Isaac", "Japheth"], answer: "Lot", sourceRef: "Genesis 11:31" },
  { era: "genesis", prompt: "Which option names the three sons of Terah?", options: ["Abram, Nahor, Haran", "Shem, Ham, Japheth", "Cain, Abel, Seth", "Isaac, Ishmael, Lot"], answer: "Abram, Nahor, Haran", sourceRef: "Genesis 11:26-27" },
  { era: "genesis", prompt: "Which son of Shem is listed with Elam, Asshur, and Lud?", options: ["Arphaxad", "Cush", "Canaan", "Gomer"], answer: "Arphaxad", sourceRef: "Genesis 10:22" },
  { era: "genesis", prompt: "Which city is NOT part of the beginning of Nimrod's kingdom in Genesis 10:10?", options: ["Nineveh", "Babel", "Erech", "Calneh"], answer: "Nineveh", sourceRef: "Genesis 10:10-11" },
  { era: "genesis", prompt: "Who said that nothing would be withheld from the people if they remained one in speech?", options: ["Yahweh", "Nimrod", "Shem", "Terah"], answer: "Yahweh", sourceRef: "Genesis 11:6" },
  { era: "genesis", prompt: "Which divine name is repeated through Genesis 10-11 in the WEB text?", options: ["Yahweh", "Yahweh Shalom", "El Elyon", "Yahweh Nissi"], answer: "Yahweh", sourceRef: "Genesis 10:9; 11:5-9" },
  { era: "genesis", prompt: "What goal did Terah set before stopping in Haran?", options: ["To go to Canaan", "To build Babel", "To return to Eden", "To settle in Egypt"], answer: "To go to Canaan", sourceRef: "Genesis 11:31" },
  { era: "genesis", prompt: "Who first appears as father in the line Shem -> Arphaxad -> Shelah -> Eber?", options: ["Shem", "Peleg", "Nahor", "Terah"], answer: "Shem", sourceRef: "Genesis 11:10" },
  { era: "genesis", prompt: "Which statement matches Genesis 11:6 exactly in idea?", options: ["Now nothing will be withheld from them which they intend to do", "They immediately repented and worshiped", "Their tower reached heaven that day", "They divided into twelve tribes"], answer: "Now nothing will be withheld from them which they intend to do", sourceRef: "Genesis 11:6" },
  { era: "genesis", prompt: "Which person died before Terah's migration to Haran in Genesis 11?", options: ["Haran", "Abram", "Nahor", "Lot"], answer: "Haran", sourceRef: "Genesis 11:28" },
  { era: "genesis", prompt: "Which phrase best summarizes Genesis 11:8?", options: ["Yahweh scattered them abroad from there", "Yahweh gave them one king", "Yahweh restored Eden to them", "Yahweh sent manna from heaven"], answer: "Yahweh scattered them abroad from there", sourceRef: "Genesis 11:8" }
];

const NATIONS_BABEL_QUIZ_ADVANCED_EXPANSION = [
  { era: "genesis", prompt: "According to Genesis 10:5, the coastland nations were divided by what four markers?", options: ["Lands, languages, families, nations", "Kings, armies, walls, temples", "Seas, deserts, mountains, rivers", "Priests, judges, kings, prophets"], answer: "Lands, languages, families, nations", sourceRef: "Genesis 10:5" },
  { era: "genesis", prompt: "In Genesis 10:21, Shem is called the brother of whom?", options: ["Japheth the elder", "Ham the younger", "Cush", "Nimrod"], answer: "Japheth the elder", sourceRef: "Genesis 10:21" },
  { era: "genesis", prompt: "How old was Arphaxad when he fathered Shelah?", options: ["35 years", "30 years", "34 years", "32 years"], answer: "35 years", sourceRef: "Genesis 11:12" },
  { era: "genesis", prompt: "How old was Shelah when he fathered Eber?", options: ["30 years", "35 years", "34 years", "29 years"], answer: "30 years", sourceRef: "Genesis 11:14" },
  { era: "genesis", prompt: "How old was Eber when he fathered Peleg?", options: ["34 years", "30 years", "32 years", "35 years"], answer: "34 years", sourceRef: "Genesis 11:16" },
  { era: "genesis", prompt: "How old was Peleg when he fathered Reu?", options: ["30 years", "34 years", "32 years", "35 years"], answer: "30 years", sourceRef: "Genesis 11:18" },
  { era: "genesis", prompt: "How old was Reu when he fathered Serug?", options: ["32 years", "30 years", "34 years", "29 years"], answer: "32 years", sourceRef: "Genesis 11:20" },
  { era: "genesis", prompt: "How old was Serug when he fathered Nahor?", options: ["30 years", "29 years", "32 years", "35 years"], answer: "30 years", sourceRef: "Genesis 11:22" },
  { era: "genesis", prompt: "How old was Nahor when he fathered Terah?", options: ["29 years", "30 years", "34 years", "32 years"], answer: "29 years", sourceRef: "Genesis 11:24" },
  { era: "genesis", prompt: "How old was Terah when he died in Haran?", options: ["205 years", "175 years", "145 years", "230 years"], answer: "205 years", sourceRef: "Genesis 11:32" },
  { era: "genesis", prompt: "Which pair are named as daughters of Haran?", options: ["Milcah and Iscah", "Sarai and Rebekah", "Leah and Rachel", "Naomi and Ruth"], answer: "Milcah and Iscah", sourceRef: "Genesis 11:29" },
  { era: "genesis", prompt: "Which phrase from Genesis 11:4 reveals the builders' pride motive?", options: ["Make a name for ourselves", "Build an altar to Yahweh", "Seek the promised land", "Gather manna for all"], answer: "Make a name for ourselves", sourceRef: "Genesis 11:4" },
  { era: "genesis", prompt: "After fathering Shelah, how many years did Arphaxad live?", options: ["403 years", "430 years", "500 years", "205 years"], answer: "403 years", sourceRef: "Genesis 11:13" },
  { era: "genesis", prompt: "After fathering Eber, how many years did Shelah live?", options: ["403 years", "430 years", "207 years", "119 years"], answer: "403 years", sourceRef: "Genesis 11:15" },
  { era: "genesis", prompt: "After fathering Peleg, how many years did Eber live?", options: ["430 years", "403 years", "209 years", "500 years"], answer: "430 years", sourceRef: "Genesis 11:17" },
  { era: "genesis", prompt: "After fathering Reu, how many years did Peleg live?", options: ["209 years", "430 years", "207 years", "200 years"], answer: "209 years", sourceRef: "Genesis 11:19" },
  { era: "genesis", prompt: "After fathering Serug, how many years did Reu live?", options: ["207 years", "209 years", "200 years", "119 years"], answer: "207 years", sourceRef: "Genesis 11:21" },
  { era: "genesis", prompt: "After fathering Nahor, how many years did Serug live?", options: ["200 years", "207 years", "209 years", "403 years"], answer: "200 years", sourceRef: "Genesis 11:23" },
  { era: "genesis", prompt: "After fathering Terah, how many years did Nahor live?", options: ["119 years", "200 years", "207 years", "430 years"], answer: "119 years", sourceRef: "Genesis 11:25" },
  { era: "genesis", prompt: "At what age did Terah begin fathering Abram, Nahor, and Haran?", options: ["70 years", "90 years", "100 years", "130 years"], answer: "70 years", sourceRef: "Genesis 11:26" }
];

const NATIONS_BABEL_SPELLING_EASY_EXPANSION = [
  { era: "genesis", prompt: "Spell Abram's father from Genesis 11:26.", answer: "Terah", sourceRef: "Genesis 11:26" },
  { era: "genesis", prompt: "Spell the father of Nimrod from Genesis 10:8.", answer: "Cush", sourceRef: "Genesis 10:8" },
  { era: "genesis", prompt: "Spell the son of Eber whose days saw division.", answer: "Peleg", sourceRef: "Genesis 10:25" },
  { era: "genesis", prompt: "Spell the place where Terah settled before his death.", answer: "Haran", sourceRef: "Genesis 11:31-32" }
];

const NATIONS_BABEL_SPELLING_MEDIUM_EXPANSION = [
  { era: "genesis", prompt: "Type the son born to Shem two years after the flood.", answer: "Arphaxad", acceptedAnswers: ["Arpachshad"], sourceRef: "Genesis 11:10" },
  { era: "genesis", prompt: "Type the father of Eber.", answer: "Shelah", sourceRef: "Genesis 11:14" },
  { era: "genesis", prompt: "Type one city in Nimrod's beginning kingdom that starts with C.", answer: "Calneh", sourceRef: "Genesis 10:10" },
  { era: "genesis", prompt: "Type the son of Reu in Genesis 11:20.", answer: "Serug", sourceRef: "Genesis 11:20" },
  { era: "genesis", prompt: "Type the city whose name is linked to confusion of language.", answer: "Babel", sourceRef: "Genesis 11:9" },
  { era: "genesis", prompt: "Type the son of Shelah in Genesis 11:14.", answer: "Eber", sourceRef: "Genesis 11:14" }
];

const NATIONS_BABEL_SPELLING_ADVANCED_EXPANSION = [
  { era: "genesis", prompt: "Type the father of Milcah and Iscah.", answer: "Haran", sourceRef: "Genesis 11:29" },
  { era: "genesis", prompt: "Type the son of Peleg in Genesis 11:18.", answer: "Reu", sourceRef: "Genesis 11:18" },
  { era: "genesis", prompt: "Type one city named with Babel and Calneh that starts with A.", answer: "Accad", sourceRef: "Genesis 10:10" },
  { era: "genesis", prompt: "Type the father of Terah in Genesis 11:24.", answer: "Nahor", sourceRef: "Genesis 11:24" },
  { era: "genesis", prompt: "Type the father of Shelah in Genesis 11:12.", answer: "Arphaxad", acceptedAnswers: ["Arpachshad"], sourceRef: "Genesis 11:12" },
  { era: "genesis", prompt: "Type the son of Nahor in Genesis 11:24.", answer: "Terah", sourceRef: "Genesis 11:24" }
];

const NATIONS_BABEL_ORDER_EASY_EXPANSION = [
  { era: "genesis", items: ["Cush fathers Nimrod", "Nimrod's kingdom begins at Babel", "Yahweh confuses language at Babel"], sourceRef: "Genesis 10:8-10; 11:7" },
  { era: "genesis", items: ["Shem fathers Arphaxad", "Arphaxad fathers Shelah", "Shelah fathers Eber"], sourceRef: "Genesis 11:10; 11:12; 11:14" },
  { era: "genesis", items: ["Terah leaves Ur", "Family comes to Haran", "Terah dies in Haran"], sourceRef: "Genesis 11:31-32" },
  { era: "genesis", items: ["People say, \"Come, let's make bricks\"", "People say, \"Come, let's build a city and tower\"", "Yahweh scatters them abroad"], sourceRef: "Genesis 11:3-4,8" }
];

const NATIONS_BABEL_ORDER_MEDIUM_EXPANSION = [
  { era: "genesis", items: ["People settle in Shinar", "People plan tower", "Yahweh scatters them"], sourceRef: "Genesis 11:2; 11:4; 11:8" },
  { era: "genesis", items: ["Eber fathers Peleg and Joktan", "Peleg fathers Reu", "Reu fathers Serug"], sourceRef: "Genesis 10:25; 11:18; 11:20" },
  { era: "genesis", items: ["Terah fathers Abram, Nahor, Haran", "Haran fathers Lot", "Terah sets out toward Canaan"], sourceRef: "Genesis 11:26-27,31" },
  { era: "genesis", items: ["Shem fathers Arphaxad", "Arphaxad fathers Shelah", "Shelah fathers Eber"], sourceRef: "Genesis 11:10-14" }
];

const NATIONS_BABEL_ORDER_ADVANCED_EXPANSION = [
  { era: "genesis", items: ["Arphaxad fathers Shelah at 35", "Shelah fathers Eber at 30", "Eber fathers Peleg at 34"], sourceRef: "Genesis 11:12; 11:14; 11:16" },
  { era: "genesis", items: ["People make bricks", "People build city and tower", "Yahweh comes down to see"], sourceRef: "Genesis 11:3-5" },
  { era: "genesis", items: ["Peleg fathers Reu", "Reu fathers Serug", "Serug fathers Nahor"], sourceRef: "Genesis 11:18; 11:20; 11:22" },
  { era: "genesis", items: ["Nahor fathers Terah", "Terah fathers Abram/Nahor/Haran", "Terah dies in Haran"], sourceRef: "Genesis 11:24; 11:26; 11:32" }
];

const NATIONS_BABEL_FACT_EASY_EXPANSION = [
  { era: "genesis", parts: ["Cush", "became", "the", "father", "of", "Nimrod"], sourceRef: "Genesis 10:8" },
  { era: "genesis", parts: ["Nimrod", "was", "a", "mighty", "hunter", "before", "Yahweh"], sourceRef: "Genesis 10:9" },
  { era: "genesis", parts: ["Terah", "became", "the", "father", "of", "Abram"], sourceRef: "Genesis 11:26" },
  { era: "genesis", parts: ["Sarai", "was", "barren"], sourceRef: "Genesis 11:30" },
  { era: "genesis", parts: ["They", "came", "to", "Haran", "and", "lived", "there"], sourceRef: "Genesis 11:31" },
  { era: "genesis", parts: ["The", "whole", "earth", "was", "of", "one", "language"], sourceRef: "Genesis 11:1" },
  { era: "genesis", parts: ["Let's", "make", "bricks", "and", "burn", "them", "thoroughly"], sourceRef: "Genesis 11:3" }
];

const NATIONS_BABEL_FACT_MEDIUM_EXPANSION = [
  { era: "genesis", parts: ["Shem", "was", "one", "hundred", "years", "old"], sourceRef: "Genesis 11:10" },
  { era: "genesis", parts: ["In", "his", "days", "the", "earth", "was", "divided"], sourceRef: "Genesis 10:25" },
  { era: "genesis", parts: ["Yahweh", "came", "down", "to", "see", "the", "city", "and", "the", "tower"], sourceRef: "Genesis 11:5" },
  { era: "genesis", parts: ["Terah", "died", "in", "Haran"], sourceRef: "Genesis 11:32" },
  { era: "genesis", parts: ["Nothing", "will", "be", "withheld", "from", "them", "which", "they", "intend", "to", "do"], sourceRef: "Genesis 11:6" },
  { era: "genesis", parts: ["Yahweh", "scattered", "them", "abroad", "from", "there"], sourceRef: "Genesis 11:8" }
];

const NATIONS_BABEL_FACT_ADVANCED_EXPANSION = [
  { era: "genesis", parts: ["The", "beginning", "of", "his", "kingdom", "was", "Babel", "Erech", "Accad", "and", "Calneh"], sourceRef: "Genesis 10:10" },
  { era: "genesis", parts: ["Arphaxad", "lived", "thirty-five", "years", "and", "fathered", "Shelah"], sourceRef: "Genesis 11:12" },
  { era: "genesis", parts: ["Eber", "lived", "thirty-four", "years", "and", "fathered", "Peleg"], sourceRef: "Genesis 11:16" },
  { era: "genesis", parts: ["Reu", "lived", "thirty-two", "years", "and", "fathered", "Serug"], sourceRef: "Genesis 11:20" },
  { era: "genesis", parts: ["Nahor", "lived", "twenty-nine", "years", "and", "fathered", "Terah"], sourceRef: "Genesis 11:24" },
  { era: "genesis", parts: ["Terah", "lived", "two", "hundred", "five", "years"], sourceRef: "Genesis 11:32" }
];

const CALL_OF_ABRAM_QUIZ_EASY_EXPANSION = [
  { era: "patriarchs", prompt: "Who went with Abram into the land of Canaan?", options: ["Lot", "Pharaoh", "Melchizedek", "Chedorlaomer"], answer: "Lot", sourceRef: "Genesis 12:5" },
  { era: "patriarchs", prompt: "Why did Abram go down into Egypt?", options: ["Because there was a famine in the land", "Because Lot was king there", "Because Melchizedek invited him", "Because the ark landed there"], answer: "Because there was a famine in the land", sourceRef: "Genesis 12:10" },
  { era: "patriarchs", prompt: "Between which two places did Abram pitch his tent after he came into the land?", options: ["Bethel and Ai", "Hebron and Gerar", "Sodom and Gomorrah", "Dan and Beersheba"], answer: "Bethel and Ai", sourceRef: "Genesis 12:8" },
  { era: "patriarchs", prompt: "What did Yahweh promise Abram at Shechem?", options: ["To your offspring I will give this land", "You will return to Eden", "You will reign in Egypt", "You will build a temple"], answer: "To your offspring I will give this land", sourceRef: "Genesis 12:7" },
  { era: "patriarchs", prompt: "Toward what region did Abram journey after leaving the area between Bethel and Ai?", options: ["The Negev", "Damascus", "Shinar", "Salem"], answer: "The Negev", sourceRef: "Genesis 12:9" },
  { era: "patriarchs", prompt: "What did Abram ask Sarai to say she was when they entered Egypt?", options: ["His sister", "His daughter", "His servant", "His widow"], answer: "His sister", sourceRef: "Genesis 12:13" },
  { era: "patriarchs", prompt: "What happened to Pharaoh and his house because of Sarai, Abram's wife?", options: ["They were struck with great plagues", "They received manna", "They crossed the Jordan", "They found a ram"], answer: "They were struck with great plagues", sourceRef: "Genesis 12:17" },
  { era: "patriarchs", prompt: "What was Abram very rich in when he came up out of Egypt?", options: ["Livestock, silver, and gold", "Horses, iron, and cedar", "Chariots, wheat, and oil", "Tents, camels, and purple cloth"], answer: "Livestock, silver, and gold", sourceRef: "Genesis 13:2" },
  { era: "patriarchs", prompt: "Who chose all the Plain of the Jordan?", options: ["Lot", "Abram", "Melchizedek", "Pharaoh"], answer: "Lot", sourceRef: "Genesis 13:10-11" },
  { era: "patriarchs", prompt: "Why couldn't the land support Abram and Lot living together?", options: ["Their possessions were too great", "The kings had taken the wells", "Abram had no servants", "The land was under water"], answer: "Their possessions were too great", sourceRef: "Genesis 13:6" },
  { era: "patriarchs", prompt: "What did Abram build by the oaks of Mamre in Hebron?", options: ["An altar", "A tower", "An ark", "A palace"], answer: "An altar", sourceRef: "Genesis 13:18" },
  { era: "patriarchs", prompt: "Who brought out bread and wine to Abram after the rescue of Lot?", options: ["Melchizedek", "The king of Egypt", "Lot", "Terah"], answer: "Melchizedek", sourceRef: "Genesis 14:18" },
  { era: "patriarchs", prompt: "What did the king of Sodom ask Abram to give back to him?", options: ["The people", "The land", "The altar", "The stars"], answer: "The people", sourceRef: "Genesis 14:21" },
  { era: "patriarchs", prompt: "How old was Abram when he departed out of Haran?", options: ["75 years old", "70 years old", "80 years old", "100 years old"], answer: "75 years old", sourceRef: "Genesis 12:4" }
];

const CALL_OF_ABRAM_QUIZ_MEDIUM_EXPANSION = [
  { era: "patriarchs", prompt: "At what landmark did Abram pass through when he first came to Shechem?", options: ["The oak of Moreh", "The terebinth of Mamre", "Mount Moriah", "The river of Egypt"], answer: "The oak of Moreh", sourceRef: "Genesis 12:6" },
  { era: "patriarchs", prompt: "Where did Abram return to the altar and call on Yahweh's name after coming up from Egypt?", options: ["Bethel", "Hebron", "Dan", "Gerar"], answer: "Bethel", sourceRef: "Genesis 13:3-4" },
  { era: "patriarchs", prompt: "Why did Abram say there should be no strife between him and Lot?", options: ["Because they were relatives", "Because Pharaoh was watching", "Because they had no livestock", "Because the famine had ended"], answer: "Because they were relatives", sourceRef: "Genesis 13:8" },
  { era: "patriarchs", prompt: "If Lot chose the left hand, which direction did Abram say he would go?", options: ["To the right", "To Egypt", "To the north", "Back to Haran"], answer: "To the right", sourceRef: "Genesis 13:9" },
  { era: "patriarchs", prompt: "How many trained men born in Abram's house went with him to rescue Lot?", options: ["318", "70", "40", "500"], answer: "318", sourceRef: "Genesis 14:14" },
  { era: "patriarchs", prompt: "As far as what place did Abram pursue the kings who had taken Lot?", options: ["Dan", "Ai", "Gerar", "Beersheba"], answer: "Dan", sourceRef: "Genesis 14:14" },
  { era: "patriarchs", prompt: "In Melchizedek's blessing, who was called Possessor of heaven and earth?", options: ["God Most High", "Abram", "The king of Sodom", "Pharaoh"], answer: "God Most High", sourceRef: "Genesis 14:19" },
  { era: "patriarchs", prompt: "Which Hebrew title did Abram use for God in Genesis 15:2?", options: ["Adonai Yahweh", "El Shaddai", "El Elyon", "Yahweh Yireh"], answer: "Adonai Yahweh", sourceRef: "Genesis 15:2" },
  { era: "patriarchs", prompt: "Who did Yahweh say would be Abram's heir?", options: ["One who would come out of Abram's own body", "Eliezer of Damascus", "Lot", "Ishmael"], answer: "One who would come out of Abram's own body", sourceRef: "Genesis 15:4" },
  { era: "patriarchs", prompt: "What did Abram refuse to take from the king of Sodom?", options: ["Anything that was his", "The people", "Bread and wine", "The altar stones"], answer: "Anything that was his", sourceRef: "Genesis 14:22-23" },
  { era: "patriarchs", prompt: "What fell on Abram when the sun was going down in Genesis 15?", options: ["A deep sleep", "A rainbow", "Manna", "A strong wind"], answer: "A deep sleep", sourceRef: "Genesis 15:12" },
  { era: "patriarchs", prompt: "How many years would Abram's offspring be afflicted in a land that was not theirs?", options: ["400 years", "40 years", "70 years", "430 years"], answer: "400 years", sourceRef: "Genesis 15:13" },
  { era: "patriarchs", prompt: "What was counted to Abram for righteousness in Genesis 15:6?", options: ["His faith", "His tithe", "His journey", "His livestock"], answer: "His faith", sourceRef: "Genesis 15:6" }
];

const CALL_OF_ABRAM_QUIZ_ADVANCED_EXPANSION = [
  { era: "patriarchs", prompt: "To what place north of Damascus did Abram pursue the kings?", options: ["Hobah", "Bethel", "Moreh", "Hebron"], answer: "Hobah", sourceRef: "Genesis 14:15" },
  { era: "patriarchs", prompt: "What did Abram give Melchizedek from the spoils?", options: ["A tenth of all", "All the goods", "Only the people", "A ram"], answer: "A tenth of all", sourceRef: "Genesis 14:20" },
  { era: "patriarchs", prompt: "What did Abram do to the birds of prey that came down on the carcasses?", options: ["He drove them away", "He offered them on the altar", "He fed them", "He fled from them"], answer: "He drove them away", sourceRef: "Genesis 15:11" },
  { era: "patriarchs", prompt: "What came down on Abram's sacrifice pieces before sunset?", options: ["Birds of prey", "Locusts", "A ram", "A dove only"], answer: "Birds of prey", sourceRef: "Genesis 15:11" },
  { era: "patriarchs", prompt: "In what generation did Yahweh say Abram's descendants would come back to the land?", options: ["The fourth generation", "The second generation", "The seventh generation", "The tenth generation"], answer: "The fourth generation", sourceRef: "Genesis 15:16" },
  { era: "patriarchs", prompt: "What did Yahweh say Abram himself would do before his descendants returned to the land?", options: ["Go to his fathers in peace", "Live to see the conquest", "Return to Haran", "Dwell in Sodom"], answer: "Go to his fathers in peace", sourceRef: "Genesis 15:15" },
  { era: "patriarchs", prompt: "What did Yahweh say He had done in Genesis 15:7?", options: ["Brought Abram out of Ur of the Chaldees", "Destroyed Sodom already", "Sent Abram to Egypt", "Given Abram a son already"], answer: "Brought Abram out of Ur of the Chaldees", sourceRef: "Genesis 15:7" },
  { era: "patriarchs", prompt: "Which river is named as the near border of the promised land in Genesis 15:18?", options: ["The river of Egypt", "The Jordan River", "The Jabbok River", "The Chebar River"], answer: "The river of Egypt", sourceRef: "Genesis 15:18" },
  { era: "patriarchs", prompt: "Which river is named as the far border of the promised land in Genesis 15:18?", options: ["The Euphrates River", "The Jordan River", "The Nile River", "The Jabbok River"], answer: "The Euphrates River", sourceRef: "Genesis 15:18" },
  { era: "patriarchs", prompt: "Which people are named among those whose land would be given to Abram's offspring?", options: ["Kenites", "Philistines", "Romans", "Babylonians"], answer: "Kenites", sourceRef: "Genesis 15:19" },
  { era: "patriarchs", prompt: "Which birds did Abram bring in the covenant preparation?", options: ["A turtledove and a young pigeon", "Two ravens", "A dove and a sparrow", "An eagle and a pigeon"], answer: "A turtledove and a young pigeon", sourceRef: "Genesis 15:9" },
  { era: "patriarchs", prompt: "What passed between the pieces in Abram's covenant vision?", options: ["A smoking furnace and a flaming torch", "A pillar of cloud and fire", "Two angels", "A rainbow and thunder"], answer: "A smoking furnace and a flaming torch", sourceRef: "Genesis 15:17" }
];

const CALL_OF_ABRAM_SPELLING_EASY_EXPANSION = [
  { era: "patriarchs", prompt: "Spell Abram's nephew from Genesis 12-14.", answer: "Lot", sourceRef: "Genesis 12:5; 13:1; 14:12" },
  { era: "patriarchs", prompt: "Spell the land Abram entered in Genesis 12:5.", answer: "Canaan", sourceRef: "Genesis 12:5" },
  { era: "patriarchs", prompt: "Spell the region Abram journeyed toward in Genesis 12:9.", answer: "Negev", sourceRef: "Genesis 12:9", acceptedAnswers: ["Negeb"] },
  { era: "patriarchs", prompt: "Spell the city beside Bethel where Abram pitched his tent.", answer: "Ai", sourceRef: "Genesis 12:8" },
  { era: "patriarchs", prompt: "Spell Abram's wife from Genesis 12.", answer: "Sarai", sourceRef: "Genesis 12:11-17" },
  { era: "patriarchs", prompt: "Spell the place where Abram dwelt by the oaks.", answer: "Mamre", sourceRef: "Genesis 13:18" }
];

const CALL_OF_ABRAM_SPELLING_MEDIUM_EXPANSION = [
  { era: "patriarchs", prompt: "Type the city west of Ai in Genesis 12:8.", answer: "Bethel", sourceRef: "Genesis 12:8" },
  { era: "patriarchs", prompt: "Type the city where Abram dwelt after Lot separated from him.", answer: "Hebron", sourceRef: "Genesis 13:18" },
  { era: "patriarchs", prompt: "Type the land Abram came into in Genesis 12:5.", answer: "Canaan", sourceRef: "Genesis 12:5" },
  { era: "patriarchs", prompt: "Type the place where Yahweh first appeared to Abram in Canaan.", answer: "Shechem", sourceRef: "Genesis 12:6-7" },
  { era: "patriarchs", prompt: "Type the oak landmark Abram passed by at Shechem.", answer: "Moreh", sourceRef: "Genesis 12:6" },
  { era: "patriarchs", prompt: "Type the city where Abram returned to call on Yahweh's name after Egypt.", answer: "Bethel", sourceRef: "Genesis 13:3-4" }
];

const CALL_OF_ABRAM_SPELLING_ADVANCED_EXPANSION = [
  { era: "patriarchs", prompt: "Type the king-priest who blessed Abram.", answer: "Melchizedek", sourceRef: "Genesis 14:18" },
  { era: "patriarchs", prompt: "Type the city named with Eliezer in Genesis 15:2.", answer: "Damascus", sourceRef: "Genesis 15:2" },
  { era: "patriarchs", prompt: "Type the far river named in the covenant borders.", answer: "Euphrates", sourceRef: "Genesis 15:18" },
  { era: "patriarchs", prompt: "Type the place north of Damascus where Abram pursued the kings.", answer: "Hobah", sourceRef: "Genesis 14:15" },
  { era: "patriarchs", prompt: "Type the king whom Abram pursued after Lot was taken captive.", answer: "Chedorlaomer", acceptedAnswers: ["Kedorlaomer"], sourceRef: "Genesis 14:17" }
];

const CALL_OF_ABRAM_ORDER_EASY_EXPANSION = [
  { era: "patriarchs", items: ["Yahweh tells Abram to leave", "Abram takes Sarai and Lot", "Abram comes into Canaan"], sourceRef: "Genesis 12:1-5" },
  { era: "patriarchs", items: ["Abram leaves Haran", "Yahweh appears at Shechem", "Abram builds an altar there"], sourceRef: "Genesis 12:4-7" },
  { era: "patriarchs", items: ["Famine comes", "Abram goes down into Egypt", "Pharaoh sends Abram away"], sourceRef: "Genesis 12:10,20" },
  { era: "patriarchs", items: ["Strife rises between herdsmen", "Lot chooses the Plain of the Jordan", "Abram dwells by Mamre"], sourceRef: "Genesis 13:7-12,18" },
  { era: "patriarchs", items: ["Lot is taken captive", "Abram rescues him", "Melchizedek blesses Abram"], sourceRef: "Genesis 14:12-20" }
];

const CALL_OF_ABRAM_ORDER_MEDIUM_EXPANSION = [
  { era: "patriarchs", items: ["Abram becomes very rich", "The land cannot bear Abram and Lot together", "Abram offers Lot the choice"], sourceRef: "Genesis 13:2,6,9" },
  { era: "patriarchs", items: ["Lot separates from Abram", "Yahweh tells Abram to lift up his eyes", "Abram builds an altar in Hebron"], sourceRef: "Genesis 13:11-18" },
  { era: "patriarchs", items: ["Yahweh says, \"Don't be afraid\"", "Abram asks about an heir", "Yahweh brings Abram outside"], sourceRef: "Genesis 15:1-5" },
  { era: "patriarchs", items: ["Yahweh says Abram's heir will come from his own body", "Abram believes Yahweh", "It is counted to him for righteousness"], sourceRef: "Genesis 15:4-6" },
  { era: "patriarchs", items: ["Birds of prey come down", "A deep sleep falls on Abram", "A smoking furnace passes between the pieces"], sourceRef: "Genesis 15:11-12,17" },
  { era: "patriarchs", items: ["King of Sodom offers the goods", "Abram refuses to take them", "Abram says Yahweh made him rich"], sourceRef: "Genesis 14:21-23" }
];

const CALL_OF_ABRAM_ORDER_ADVANCED_EXPANSION = [
  { era: "patriarchs", items: ["Abram departs Haran at seventy-five", "Lot is captured in battle", "Abram gives Melchizedek a tenth"], sourceRef: "Genesis 12:4; 14:12-20" },
  { era: "patriarchs", items: ["Abram divides against the kings by night", "Abram brings back the goods", "Melchizedek blesses Abram"], sourceRef: "Genesis 14:15-19" },
  { era: "patriarchs", items: ["Abram brings the covenant animals", "Abram divides the larger animals", "Abram drives away the birds of prey"], sourceRef: "Genesis 15:9-11" },
  { era: "patriarchs", items: ["Yahweh says Abram's seed will be afflicted", "They will come out with great substance", "They will return in the fourth generation"], sourceRef: "Genesis 15:13-16" },
  { era: "patriarchs", items: ["Melchizedek brings bread and wine", "Abram gives him a tenth", "King of Sodom asks for the people"], sourceRef: "Genesis 14:18-21" }
];

const CALL_OF_ABRAM_FACT_EASY_EXPANSION = [
  { era: "patriarchs", parts: ["I", "will", "make", "of", "you", "a", "great", "nation"], sourceRef: "Genesis 12:2" },
  { era: "patriarchs", parts: ["In", "you", "all", "the", "families", "of", "the", "earth", "will", "be", "blessed"], sourceRef: "Genesis 12:3" },
  { era: "patriarchs", parts: ["To", "your", "offspring", "I", "will", "give", "this", "land"], sourceRef: "Genesis 12:7" },
  { era: "patriarchs", parts: ["There", "was", "a", "famine", "in", "the", "land"], sourceRef: "Genesis 12:10" },
  { era: "patriarchs", parts: ["Lot", "chose", "all", "the", "Plain", "of", "the", "Jordan"], sourceRef: "Genesis 13:11" }
];

const CALL_OF_ABRAM_FACT_MEDIUM_EXPANSION = [
  { era: "patriarchs", parts: ["Abram", "called", "on", "Yahweh's", "name"], sourceRef: "Genesis 13:4" },
  { era: "patriarchs", parts: ["The", "land", "couldn't", "bear", "them"], sourceRef: "Genesis 13:6" },
  { era: "patriarchs", parts: ["Blessed", "be", "Abram", "of", "God", "Most", "High"], sourceRef: "Genesis 14:19" },
  { era: "patriarchs", parts: ["Don't", "be", "afraid", "Abram", "I", "am", "your", "shield"], sourceRef: "Genesis 15:1" },
  { era: "patriarchs", parts: ["Lord", "Yahweh", "what", "will", "you", "give", "me"], sourceRef: "Genesis 15:2" },
  { era: "patriarchs", parts: ["He", "who", "will", "come", "out", "of", "your", "own", "body"], sourceRef: "Genesis 15:4" },
  { era: "patriarchs", parts: ["He", "believed", "in", "Yahweh"], sourceRef: "Genesis 15:6" }
];

const CALL_OF_ABRAM_FACT_ADVANCED_EXPANSION = [
  { era: "patriarchs", parts: ["Abram", "divided", "against", "them", "by", "night"], sourceRef: "Genesis 14:15" },
  { era: "patriarchs", parts: ["He", "brought", "back", "all", "the", "goods"], sourceRef: "Genesis 14:16" },
  { era: "patriarchs", parts: ["Abram", "gave", "him", "a", "tenth", "of", "all"], sourceRef: "Genesis 14:20" },
  { era: "patriarchs", parts: ["A", "deep", "sleep", "fell", "on", "Abram"], sourceRef: "Genesis 15:12" },
  { era: "patriarchs", parts: ["I", "am", "Yahweh", "who", "brought", "you", "out", "of", "Ur"], sourceRef: "Genesis 15:7" },
  { era: "patriarchs", parts: ["Bring", "me", "a", "three-year-old", "heifer"], sourceRef: "Genesis 15:9" },
  { era: "patriarchs", parts: ["A", "smoking", "furnace", "and", "a", "flaming", "torch", "passed", "between", "these", "pieces"], sourceRef: "Genesis 15:17" },
  { era: "patriarchs", parts: ["In", "the", "fourth", "generation", "they", "will", "come", "here", "again"], sourceRef: "Genesis 15:16" }
];

quizBank.push(...NATIONS_BABEL_QUIZ_EASY_EXPANSION);
mediumQuizBank.push(...NATIONS_BABEL_QUIZ_MEDIUM_EXPANSION);
advancedQuizBank.push(...NATIONS_BABEL_QUIZ_ADVANCED_EXPANSION);
spellingBank.push(...NATIONS_BABEL_SPELLING_EASY_EXPANSION);
mediumSpellingBank.push(...NATIONS_BABEL_SPELLING_MEDIUM_EXPANSION);
advancedSpellingBank.push(...NATIONS_BABEL_SPELLING_ADVANCED_EXPANSION);
orderBank.push(...NATIONS_BABEL_ORDER_EASY_EXPANSION);
mediumOrderBank.push(...NATIONS_BABEL_ORDER_MEDIUM_EXPANSION);
advancedOrderBank.push(...NATIONS_BABEL_ORDER_ADVANCED_EXPANSION);
factBank.push(...NATIONS_BABEL_FACT_EASY_EXPANSION);
mediumFactBank.push(...NATIONS_BABEL_FACT_MEDIUM_EXPANSION);
advancedFactBank.push(...NATIONS_BABEL_FACT_ADVANCED_EXPANSION);
quizBank.push(...CALL_OF_ABRAM_QUIZ_EASY_EXPANSION);
mediumQuizBank.push(...CALL_OF_ABRAM_QUIZ_MEDIUM_EXPANSION);
advancedQuizBank.push(...CALL_OF_ABRAM_QUIZ_ADVANCED_EXPANSION);
spellingBank.push(...CALL_OF_ABRAM_SPELLING_EASY_EXPANSION);
mediumSpellingBank.push(...CALL_OF_ABRAM_SPELLING_MEDIUM_EXPANSION);
advancedSpellingBank.push(...CALL_OF_ABRAM_SPELLING_ADVANCED_EXPANSION);
orderBank.push(...CALL_OF_ABRAM_ORDER_EASY_EXPANSION);
mediumOrderBank.push(...CALL_OF_ABRAM_ORDER_MEDIUM_EXPANSION);
advancedOrderBank.push(...CALL_OF_ABRAM_ORDER_ADVANCED_EXPANSION);
factBank.push(...CALL_OF_ABRAM_FACT_EASY_EXPANSION);
mediumFactBank.push(...CALL_OF_ABRAM_FACT_MEDIUM_EXPANSION);
advancedFactBank.push(...CALL_OF_ABRAM_FACT_ADVANCED_EXPANSION);

function normalizePoolText(value) {
  return normalizeQuizAnswerKey(String(value || ""));
}

function poolItemsSignature(items) {
  if (!Array.isArray(items) || !items.length) return "";
  return items.map((item) => normalizePoolText(item)).filter(Boolean).join(" | ");
}

function dedupeBySignature(pool, signatureFor) {
  const seen = new Set();
  const output = [];
  pool.forEach((item) => {
    const signature = signatureFor(item);
    if (!signature || seen.has(signature)) return;
    seen.add(signature);
    output.push(item);
  });
  return output;
}

function applyTierPoolSanity(basePool, mediumPool, advancedPool, uniqueSignature, overlapSignature) {
  const baseUnique = dedupeBySignature(basePool, uniqueSignature);
  const usedOverlap = new Set(baseUnique.map((item) => overlapSignature(item)).filter(Boolean));

  const mediumUnique = dedupeBySignature(mediumPool, uniqueSignature).filter((item) => {
    const overlapKey = overlapSignature(item);
    if (!overlapKey || usedOverlap.has(overlapKey)) return false;
    usedOverlap.add(overlapKey);
    return true;
  });

  const advancedUnique = dedupeBySignature(advancedPool, uniqueSignature).filter((item) => {
    const overlapKey = overlapSignature(item);
    if (!overlapKey || usedOverlap.has(overlapKey)) return false;
    usedOverlap.add(overlapKey);
    return true;
  });

  basePool.length = 0;
  basePool.push(...baseUnique);
  mediumPool.length = 0;
  mediumPool.push(...mediumUnique);
  advancedPool.length = 0;
  advancedPool.push(...advancedUnique);
}

applyTierPoolSanity(
  quizBank,
  mediumQuizBank,
  advancedQuizBank,
  (item) => [item.era || "", normalizePoolText(item.prompt), normalizePoolText(item.answer), normalizePoolText(item.sourceRef)].join("::"),
  (item) => [item.era || "", normalizePoolText(item.prompt)].join("::")
);

applyTierPoolSanity(
  spellingBank,
  mediumSpellingBank,
  advancedSpellingBank,
  (item) => [item.era || "", normalizePoolText(item.prompt), normalizePoolText(item.answer), normalizePoolText(item.sourceRef)].join("::"),
  (item) => [item.era || "", normalizePoolText(item.prompt)].join("::")
);

applyTierPoolSanity(
  orderBank,
  mediumOrderBank,
  advancedOrderBank,
  (item) => [item.era || "", poolItemsSignature(item.items), normalizePoolText(item.sourceRef)].join("::"),
  (item) => [item.era || "", poolItemsSignature(item.items)].join("::")
);

applyTierPoolSanity(
  factBank,
  mediumFactBank,
  advancedFactBank,
  (item) => [item.era || "", poolItemsSignature(item.parts), normalizePoolText(item.sourceRef)].join("::"),
  (item) => [item.era || "", poolItemsSignature(item.parts)].join("::")
);

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
let storyRecapUtterance = null;
let storyRecapAudio = null;
let storyRecapAudioToken = 0;
let storyRecapTimer = 0;
let lastStoryRecapFingerprint = "";
let lastStoryRecapAt = 0;
let pendingStoryRecapReason = "";
let storyRecapRetryArmed = false;
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
let pendingHubReturnScrollY = null;
let pendingHubReturnStageId = null;
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

function isoWeekKey(date = new Date()) {
  const copy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = copy.getUTCDay() || 7;
  copy.setUTCDate(copy.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(copy.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((copy - yearStart) / 86400000) + 1) / 7);
  return `${copy.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function eraOrderList() {
  return Array.from(new Set(timelineThemes.map((theme) => theme.era)));
}

function eraReachedForState(snapshot) {
  const unlocked = Math.max(1, Number((snapshot && snapshot.unlocked) || 1));
  const index = Math.min(Math.max(0, unlocked - 1), stages.length - 1);
  const meta = stages[index] || stages[0];
  return meta && meta.theme ? meta.theme.era : (eraOrderList()[0] || "genesis");
}

function hasReachedEraForState(snapshot, targetEra) {
  if (!targetEra) return true;
  const order = eraOrderList();
  const targetIndex = order.indexOf(targetEra);
  if (targetIndex < 0) return true;
  const currentEra = eraReachedForState(snapshot);
  const currentIndex = order.indexOf(currentEra);
  return currentIndex >= targetIndex;
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

function shouldKeepHubMusicAlive() {
  if (!state.audio.music) return false;
  if (typeof document !== "undefined" && document.visibilityState === "hidden") return false;
  if (state.activeStage) return false;
  if (isStoryTheaterOpen() || isFinalOpen() || isCreditsOpen()) return false;
  if (activityOverlay && !activityOverlay.classList.contains("hidden")) return false;
  return true;
}

function stopMusicHeartbeat() {
  if (!audioEngine.musicHeartbeatTimer) return;
  window.clearInterval(audioEngine.musicHeartbeatTimer);
  audioEngine.musicHeartbeatTimer = null;
}

function ensureMusicHeartbeat() {
  if (audioEngine.musicHeartbeatTimer || typeof window === "undefined") return;
  audioEngine.musicHeartbeatTimer = window.setInterval(() => {
    if (!state.audio.music) {
      stopMusicHeartbeat();
      return;
    }
    if (!shouldKeepHubMusicAlive()) return;
    ensureAudio();
    if (!audioEngine.ctx) return;
    if (audioEngine.ctx.state === "suspended") {
      audioEngine.ctx.resume().catch(() => {});
    }
    if (!audioEngine.timer && !audioEngine.finaleTimer && !audioEngine.creditsTimer) {
      startMusicLoop();
    }
  }, 1600);
}

function normalizePlayerName(value) {
  const collapsed = String(value || "")
    .replace(/\s+/g, " ")
    .trim();
  const safe = collapsed.replace(/[<>{}\[\]|`^~]/g, "");
  return safe.slice(0, 40);
}

const launchQueryName = normalizePlayerName(new URLSearchParams(window.location.search).get("playerName") || "");

function safeJsonParse(value, fallback) {
  try {
    if (value == null || value === "") return fallback;
    return JSON.parse(value);
  } catch (_) {
    return fallback;
  }
}

function deepClone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function profileStorageKey(id) {
  return `${PROFILE_PREFIX}${String(id || "default")}`;
}

function defaultStatsSnapshot() {
  return {
    levelsCompleted: 0,
    stagesCompleted: 0,
    interactiveWins: 0,
    timingWins: 0,
    collectWins: 0,
    dodgeWins: 0,
    slingshotWins: 0,
    flawlessLevels: 0,
    badgeSetBonuses: {},
    difficultyPass: { easy: false, medium: false, advanced: false },
    eraFinalesSeen: {},
    chapterIntrosSeen: {}
  };
}

function defaultStateSnapshot(name = "") {
  return {
    unlocked: 1,
    completed: [],
    xp: 0,
    lives: MAX_LIVES,
    badges: [],
    audio: { music: true, sfx: true, musicLevel: "high", musicStyle: "cinematic" },
    levelFailures: {},
    stats: defaultStatsSnapshot(),
    difficulty: "medium",
    activeStage: null,
    lastStage: null,
    lastBadge: "",
    playerName: normalizePlayerName(name || ""),
    finalSeen: false,
    questionHistory: {},
    stageActivities: {},
    language: "en",
    dailyStrike: { count: 0, best: 0, lastClaimed: "" },
    mastery: {},
    dailyDevotion: { day: "", challenge: false, action: false, reflection: false, reward: false, note: "" },
    weeklyChallenge: { weekKey: "", era: "genesis", target: WEEKLY_CHALLENGE_TARGET, progress: 0, shared: false },
    controls: { hotkeys: true, controller: false, badgeCeremonyAutoOpen: true },
    reviewFocus: null,
    prayerResponses: {},
    dailyCalendar: {}
  };
}

function legacyStateSnapshotFromStorage() {
  const snapshot = defaultStateSnapshot(normalizePlayerName(localStorage.getItem("faithPlayerName") || ""));
  snapshot.unlocked = Number(localStorage.getItem("faithUnlocked") || snapshot.unlocked);
  snapshot.completed = safeJsonParse(localStorage.getItem("faithCompleted"), snapshot.completed);
  snapshot.xp = Number(localStorage.getItem("faithXp") || snapshot.xp);
  snapshot.lives = Number(localStorage.getItem("faithLives") || snapshot.lives);
  snapshot.badges = safeJsonParse(localStorage.getItem("faithBadges"), snapshot.badges);
  snapshot.audio = safeJsonParse(localStorage.getItem("faithAudio"), snapshot.audio);
  snapshot.levelFailures = safeJsonParse(localStorage.getItem("faithLevelFailures"), snapshot.levelFailures);
  snapshot.stats = safeJsonParse(localStorage.getItem("faithStats"), snapshot.stats);
  snapshot.difficulty = localStorage.getItem("faithDifficulty") || snapshot.difficulty;
  snapshot.activeStage = localStorage.getItem("faithActiveStage") || snapshot.activeStage;
  snapshot.lastStage = localStorage.getItem("faithLastStage") || snapshot.lastStage;
  snapshot.lastBadge = localStorage.getItem("faithLastBadge") || snapshot.lastBadge;
  snapshot.playerName = normalizePlayerName(localStorage.getItem("faithPlayerName") || snapshot.playerName);
  snapshot.finalSeen = localStorage.getItem("faithFinalSeen") === "true";
  snapshot.questionHistory = safeJsonParse(localStorage.getItem("faithQuestionHistory"), snapshot.questionHistory);
  snapshot.stageActivities = safeJsonParse(localStorage.getItem("faithStageActivities"), snapshot.stageActivities);
  snapshot.language = localStorage.getItem("faithLanguage") || snapshot.language;
  snapshot.dailyStrike = safeJsonParse(localStorage.getItem("faithDailyStrike"), snapshot.dailyStrike);
  snapshot.mastery = safeJsonParse(localStorage.getItem("faithMastery"), snapshot.mastery);
  snapshot.dailyDevotion = safeJsonParse(localStorage.getItem("faithDailyDevotion"), snapshot.dailyDevotion);
  snapshot.weeklyChallenge = safeJsonParse(localStorage.getItem("faithWeeklyChallenge"), snapshot.weeklyChallenge);
  snapshot.controls = safeJsonParse(localStorage.getItem("faithControls"), snapshot.controls);
  snapshot.reviewFocus = safeJsonParse(localStorage.getItem("faithReviewFocus"), snapshot.reviewFocus);
  snapshot.prayerResponses = safeJsonParse(localStorage.getItem("faithPrayerResponses"), snapshot.prayerResponses);
  snapshot.dailyCalendar = safeJsonParse(localStorage.getItem("faithDailyCalendar"), snapshot.dailyCalendar);
  return snapshot;
}

function writeLegacySnapshotToStorage(snapshot) {
  if (!snapshot || typeof snapshot !== "object") return;
  const merged = { ...defaultStateSnapshot(snapshot.playerName), ...deepClone(snapshot) };
  localStorage.setItem("faithUnlocked", String(merged.unlocked));
  localStorage.setItem("faithCompleted", JSON.stringify(merged.completed || []));
  localStorage.setItem("faithXp", String(merged.xp || 0));
  localStorage.setItem("faithLives", String(merged.lives || MAX_LIVES));
  localStorage.setItem("faithBadges", JSON.stringify(merged.badges || []));
  localStorage.setItem("faithAudio", JSON.stringify(merged.audio || { music: true, sfx: true }));
  localStorage.setItem("faithLevelFailures", JSON.stringify(merged.levelFailures || {}));
  localStorage.setItem("faithStats", JSON.stringify(merged.stats || defaultStatsSnapshot()));
  localStorage.setItem("faithLastBadge", merged.lastBadge || "");
  localStorage.setItem("faithPlayerName", normalizePlayerName(merged.playerName || ""));
  localStorage.setItem("faithFinalSeen", String(Boolean(merged.finalSeen)));
  localStorage.setItem("faithDifficulty", merged.difficulty || "medium");
  localStorage.setItem("faithQuestionHistory", JSON.stringify(merged.questionHistory || {}));
  localStorage.setItem("faithStageActivities", JSON.stringify(merged.stageActivities || {}));
  localStorage.setItem("faithLanguage", merged.language || "en");
  localStorage.setItem("faithDailyStrike", JSON.stringify(merged.dailyStrike || { count: 0, best: 0, lastClaimed: "" }));
  localStorage.setItem("faithMastery", JSON.stringify(merged.mastery || {}));
  localStorage.setItem("faithDailyDevotion", JSON.stringify(merged.dailyDevotion || { day: "", challenge: false, action: false, reflection: false, reward: false, note: "" }));
  localStorage.setItem("faithWeeklyChallenge", JSON.stringify(merged.weeklyChallenge || { weekKey: "", era: "genesis", target: WEEKLY_CHALLENGE_TARGET, progress: 0, shared: false }));
  localStorage.setItem("faithControls", JSON.stringify(merged.controls || { hotkeys: true, controller: false, badgeCeremonyAutoOpen: true }));
  localStorage.setItem("faithPrayerResponses", JSON.stringify(merged.prayerResponses || {}));
  localStorage.setItem("faithDailyCalendar", JSON.stringify(merged.dailyCalendar || {}));
  if (merged.reviewFocus) localStorage.setItem("faithReviewFocus", JSON.stringify(merged.reviewFocus));
  else localStorage.removeItem("faithReviewFocus");
  if (merged.activeStage) localStorage.setItem("faithActiveStage", merged.activeStage);
  else localStorage.removeItem("faithActiveStage");
  if (merged.lastStage) localStorage.setItem("faithLastStage", merged.lastStage);
  else localStorage.removeItem("faithLastStage");
  localStorage.setItem("faithContentVersion", CONTENT_VERSION);
}

function normalizeProfileMeta(profile, index = 0) {
  if (!profile || typeof profile !== "object") return null;
  const fallbackId = `profile-${index + 1}`;
  const createdAt = String(profile.createdAt || localDayKey());
  const updatedAt = String(profile.updatedAt || createdAt);
  const name = normalizePlayerName(profile.name || profile.playerName || "") || `Profile ${index + 1}`;
  const accent = profile.accent || PROFILE_COLOR_SWATCHES[index % PROFILE_COLOR_SWATCHES.length];
  return {
    id: String(profile.id || fallbackId),
    name,
    accent,
    createdAt,
    updatedAt
  };
}

function loadProfileIndex() {
  const parsed = safeJsonParse(localStorage.getItem(PROFILE_INDEX_KEY), []);
  if (!Array.isArray(parsed)) return [];
  const seen = new Set();
  return parsed
    .map((profile, index) => normalizeProfileMeta(profile, index))
    .filter((profile) => {
      if (!profile || seen.has(profile.id)) return false;
      seen.add(profile.id);
      return true;
    })
    .slice(0, PROFILE_LIMIT);
}

function saveProfileIndex(index) {
  localStorage.setItem(PROFILE_INDEX_KEY, JSON.stringify((index || []).slice(0, PROFILE_LIMIT)));
}

function readStoredProfileSnapshot(profileId) {
  return safeJsonParse(localStorage.getItem(profileStorageKey(profileId)), null);
}

function writeStoredProfileSnapshot(profileId, snapshot) {
  localStorage.setItem(profileStorageKey(profileId), JSON.stringify(deepClone(snapshot || defaultStateSnapshot())));
}

function ensureProfileStorageBootstrap() {
  let profiles = loadProfileIndex();
  if (!profiles.length) {
    const defaultProfile = normalizeProfileMeta({
      id: "default",
      name: normalizePlayerName(localStorage.getItem("faithPlayerName") || "") || "Faith Player",
      accent: PROFILE_COLOR_SWATCHES[0],
      createdAt: localDayKey(),
      updatedAt: localDayKey()
    }, 0);
    profiles = [defaultProfile];
    writeStoredProfileSnapshot(defaultProfile.id, legacyStateSnapshotFromStorage());
    saveProfileIndex(profiles);
  }

  let activeId = String(localStorage.getItem(PROFILE_ACTIVE_KEY) || profiles[0].id || "default");
  if (!profiles.some((profile) => profile.id === activeId)) {
    activeId = profiles[0].id;
  }
  localStorage.setItem(PROFILE_ACTIVE_KEY, activeId);

  const snapshot = readStoredProfileSnapshot(activeId);
  if (snapshot) {
    writeLegacySnapshotToStorage(snapshot);
  } else {
    writeStoredProfileSnapshot(activeId, legacyStateSnapshotFromStorage());
  }

  return { profiles, activeId };
}

const initialProfileStore = ensureProfileStorageBootstrap();
let profileIndex = initialProfileStore.profiles;
let activeProfileId = initialProfileStore.activeId;

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
  dailyStrike: JSON.parse(localStorage.getItem("faithDailyStrike") || '{"count":0,"best":0,"lastClaimed":""}'),
  mastery: JSON.parse(localStorage.getItem("faithMastery") || "{}"),
  dailyDevotion: JSON.parse(localStorage.getItem("faithDailyDevotion") || '{"day":"","challenge":false,"action":false,"reflection":false,"reward":false,"note":""}'),
  weeklyChallenge: JSON.parse(localStorage.getItem("faithWeeklyChallenge") || '{"weekKey":"","era":"genesis","target":7,"progress":0,"shared":false}'),
  controls: JSON.parse(localStorage.getItem("faithControls") || '{"hotkeys":true,"controller":false,"badgeCeremonyAutoOpen":true}'),
  reviewFocus: JSON.parse(localStorage.getItem("faithReviewFocus") || "null"),
  prayerResponses: JSON.parse(localStorage.getItem("faithPrayerResponses") || "{}"),
  dailyCalendar: JSON.parse(localStorage.getItem("faithDailyCalendar") || "{}")
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
if (!state.mastery || typeof state.mastery !== "object" || Array.isArray(state.mastery)) {
  state.mastery = {};
}
if (!state.dailyDevotion || typeof state.dailyDevotion !== "object" || Array.isArray(state.dailyDevotion)) {
  state.dailyDevotion = { day: "", challenge: false, action: false, reflection: false, reward: false, note: "" };
}
state.dailyDevotion.day = /^\d{4}-\d{2}-\d{2}$/.test(String(state.dailyDevotion.day || "")) ? String(state.dailyDevotion.day) : "";
state.dailyDevotion.challenge = Boolean(state.dailyDevotion.challenge);
state.dailyDevotion.action = Boolean(state.dailyDevotion.action);
state.dailyDevotion.reflection = Boolean(state.dailyDevotion.reflection);
state.dailyDevotion.reward = Boolean(state.dailyDevotion.reward);
state.dailyDevotion.note = String(state.dailyDevotion.note || "").slice(0, 240);
if (!state.weeklyChallenge || typeof state.weeklyChallenge !== "object" || Array.isArray(state.weeklyChallenge)) {
  state.weeklyChallenge = { weekKey: "", era: "genesis", target: WEEKLY_CHALLENGE_TARGET, progress: 0, shared: false };
}
state.weeklyChallenge.weekKey = String(state.weeklyChallenge.weekKey || "");
state.weeklyChallenge.era = String(state.weeklyChallenge.era || "genesis");
state.weeklyChallenge.target = Math.max(3, Number(state.weeklyChallenge.target || WEEKLY_CHALLENGE_TARGET));
state.weeklyChallenge.progress = Math.max(0, Number(state.weeklyChallenge.progress || 0));
state.weeklyChallenge.shared = Boolean(state.weeklyChallenge.shared);
if (!state.controls || typeof state.controls !== "object" || Array.isArray(state.controls)) {
  state.controls = { hotkeys: true, controller: false, badgeCeremonyAutoOpen: true };
}
state.controls.hotkeys = state.controls.hotkeys !== false;
state.controls.controller = Boolean(state.controls.controller);
state.controls.badgeCeremonyAutoOpen = state.controls.badgeCeremonyAutoOpen !== false;
if (!state.reviewFocus || typeof state.reviewFocus !== "object" || Array.isArray(state.reviewFocus)) {
  state.reviewFocus = null;
}
if (!state.prayerResponses || typeof state.prayerResponses !== "object" || Array.isArray(state.prayerResponses)) {
  state.prayerResponses = {};
}
if (!state.dailyCalendar || typeof state.dailyCalendar !== "object" || Array.isArray(state.dailyCalendar)) {
  state.dailyCalendar = {};
}

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
  badgeSetBonuses: (state.stats && state.stats.badgeSetBonuses && typeof state.stats.badgeSetBonuses === "object" && !Array.isArray(state.stats.badgeSetBonuses))
    ? { ...state.stats.badgeSetBonuses }
    : {},
  difficultyPass: {
    easy: Boolean(state.stats.difficultyPass && state.stats.difficultyPass.easy),
    medium: Boolean(state.stats.difficultyPass && state.stats.difficultyPass.medium),
    advanced: Boolean(state.stats.difficultyPass && state.stats.difficultyPass.advanced)
  },
  eraFinalesSeen: (state.stats && state.stats.eraFinalesSeen && typeof state.stats.eraFinalesSeen === "object" && !Array.isArray(state.stats.eraFinalesSeen))
    ? { ...state.stats.eraFinalesSeen }
    : {}
};
state.stats.chapterIntrosSeen = (state.stats && state.stats.chapterIntrosSeen && typeof state.stats.chapterIntrosSeen === "object" && !Array.isArray(state.stats.chapterIntrosSeen))
  ? { ...state.stats.chapterIntrosSeen }
  : {};

function ensureDailyDevotionState() {
  const today = localDayKey();
  if (state.dailyDevotion.day === today) return;
  state.dailyDevotion = {
    day: today,
    challenge: false,
    action: false,
    reflection: false,
    reward: false,
    note: ""
  };
}

function ensureDailyCalendarEntry(dayKey = localDayKey()) {
  const key = String(dayKey || localDayKey());
  if (!state.dailyCalendar[key] || typeof state.dailyCalendar[key] !== "object" || Array.isArray(state.dailyCalendar[key])) {
    state.dailyCalendar[key] = {
      challenge: false,
      devotion: false,
      reflection: false,
      reward: false,
      weekendRewardClaimed: false,
      weekendEventId: "",
      era: ""
    };
  }
  return state.dailyCalendar[key];
}

function weekendEventForDate(date = new Date()) {
  const day = date.getDay();
  if (day !== 0 && day !== 6) return null;
  const weekKey = isoWeekKey(date);
  const digits = String(weekKey || "").replace(/\D+/g, "");
  const hash = digits ? Number(digits.slice(-4)) : 0;
  return WEEKEND_EVENT_ROTATION[hash % WEEKEND_EVENT_ROTATION.length] || WEEKEND_EVENT_ROTATION[0];
}

function pickWeeklyEraByKey(weekKey) {
  const eras = eraOrderList();
  if (!eras.length) return "genesis";
  const digits = String(weekKey || "").replace(/\D+/g, "");
  const hash = digits ? Number(digits.slice(-4)) : 0;
  return eras[hash % eras.length] || eras[0];
}

function ensureWeeklyChallengeState() {
  const currentWeek = isoWeekKey();
  if (state.weeklyChallenge.weekKey === currentWeek) return;
  state.weeklyChallenge = {
    weekKey: currentWeek,
    era: pickWeeklyEraByKey(currentWeek),
    target: WEEKLY_CHALLENGE_TARGET,
    progress: 0,
    shared: false
  };
}

ensureDailyDevotionState();
ensureDailyCalendarEntry(localDayKey());
ensureWeeklyChallengeState();

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
const appRoot = document.querySelector("main.app") || document.querySelector(".app");

let replayLatestBadgeBtn = null;
let exportLatestBadgeCardBtn = null;
let exportBadgeCardBtn = null;

let campaignMapSection = null;
let campaignMapTrack = null;
let campaignMapSummary = null;
let campaignMapFinish = null;
let masterySection = null;
let masteryOverall = null;
let masteryBars = null;
let weakAreaList = null;
let focusWeakBtn = null;
let startSmartReviewBtn = null;
let reviewDueTodayBtn = null;
let dailyDevotionSection = null;
let dailyDevotionStatus = null;
let dailyDevotionPrompt = null;
let dailyDevotionAction = null;
let dailyDevotionReflection = null;
let playStoryRecapBtn = null;
let completeDevotionChallengeBtn = null;
let completeDevotionActionBtn = null;
let saveDevotionReflectionBtn = null;
let claimDevotionRewardBtn = null;
let emailDevotionReflectionBtn = null;
let exportDevotionReflectionCardBtn = null;
let weeklyChallengeSection = null;
let weeklyChallengeMeta = null;
let weeklyChallengeText = null;
let shareWeeklyChallengeBtn = null;
let profileSection = null;
let profileSummary = null;
let profileGrid = null;
let addProfileBtn = null;
let exportSyncCodeBtn = null;
let importSyncCodeBtn = null;
let hallOfFaithSection = null;
let hallOfFaithSummary = null;
let hallBossGrid = null;
let hallBadgeStrip = null;
let hallVerseGrid = null;
let hallEraGrid = null;
let eraCardPreviewOverlay = null;
let eraCardPreviewTitle = null;
let eraCardPreviewText = null;
let eraCardPreviewImage = null;
let eraCardPreviewSaveBtn = null;
let eraCardPreviewCopyBtn = null;
let closeEraCardPreviewBtn = null;
let shareTextOverlay = null;
let shareTextTitle = null;
let shareTextArea = null;
let shareTextCopyBtn = null;
let shareTextCloseBtn = null;
let recapIndicator = null;
let recapIndicatorLabel = null;
let dailyCalendarSection = null;
let dailyCalendarSummary = null;
let dailyCalendarEvent = null;
let dailyCalendarGrid = null;
let hubQuickNav = null;
let desktopControlsSection = null;
let hotkeysToggle = null;
let controllerToggle = null;
let badgeCeremonyAutoOpenToggle = null;

let desktopHotkeysBound = false;
let controllerPollHandle = 0;
let controllerPrevState = { left: false, right: false, up: false, down: false, confirm: false, cancel: false };

const audioEngine = {
  ctx: null,
  master: null,
  musicGain: null,
  sfxGain: null,
  timer: null,
  musicHeartbeatTimer: null,
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
  bootMusicHoldUntil: 0,
  musicThemeName: "",
  musicThemeEra: "",
  musicProfileKey: "",
  duckTimer: 0,
  duckUntil: 0,
  duckLevel: 1
};
const AUDIO_UNLOCK_EVENTS = ["pointerdown", "pointerup", "touchstart", "touchend", "mousedown", "click", "keydown"];
let audioUnlockArmed = false;
let badgeUnlockToastTimer = 0;
let badgeUnlockToastNode = null;
let stageCompleteToastTimer = 0;
let stageCompleteToastNode = null;
let stageAutoCloseTimer = 0;
let badgePraiseUtterance = null;
let badgeCeremonyRevealTimer = 0;
let badgeCeremonyCloseTimer = 0;
let badgeCeremonyBadgeId = null;
let badgeCeremonyActive = false;
let pendingEraFinaleEra = null;
let bossBattleStylesReady = false;
const bossSpriteSheetCache = new Map();
let verseAudioUtterance = null;
let activeVerseAudioButton = null;
let eraFinaleOverlay = null;
let eraFinaleTitle = null;
let eraFinaleMessage = null;
let eraFinaleReflection = null;
let eraFinaleProgress = null;
let eraFinaleVerse = null;
let eraFinalePrayerPrompt = null;
let eraFinalePrayerInput = null;
let eraFinalePrayerSaveBtn = null;
let eraFinalePrayerStatus = null;
let eraFinaleContinueBtn = null;
let eraFinaleReviewBtn = null;
let eraFinaleBadgeBtn = null;

function clearAudioNodes() {
  if (audioEngine.musicHeartbeatTimer) {
    window.clearInterval(audioEngine.musicHeartbeatTimer);
    audioEngine.musicHeartbeatTimer = null;
  }
  audioEngine.ctx = null;
  audioEngine.master = null;
  audioEngine.musicGain = null;
  audioEngine.sfxGain = null;
  audioEngine.musicFilter = null;
  audioEngine.musicCompressor = null;
  audioEngine.musicThemeName = "";
  audioEngine.musicThemeEra = "";
  audioEngine.musicProfileKey = "";
  if (audioEngine.duckTimer) {
    window.clearTimeout(audioEngine.duckTimer);
    audioEngine.duckTimer = 0;
  }
  audioEngine.duckUntil = 0;
  audioEngine.duckLevel = 1;
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
  const finalize = () => {
    if (ctx.state === "running") {
      disarmAudioUnlock();
    }
    updateAudioState();
  };
  if (ctx.state === "suspended") {
    ctx.resume().then(finalize).catch(finalize);
    return;
  }
  finalize();
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
      era: theme.era || null,
      check: (s) => {
        if (theme.era && !hasReachedEraForState(s, theme.era)) return false;
        return check(s);
      }
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

function duckMusicTemporarily(level = 0.42, durationMs = 1500) {
  audioEngine.duckLevel = Math.max(0.14, Math.min(1, Number(level) || 0.42));
  audioEngine.duckUntil = Date.now() + Math.max(160, Number(durationMs) || 0);
  if (audioEngine.duckTimer) {
    window.clearTimeout(audioEngine.duckTimer);
    audioEngine.duckTimer = 0;
  }
  updateAudioState();
  audioEngine.duckTimer = window.setTimeout(() => {
    audioEngine.duckTimer = 0;
    if (Date.now() < audioEngine.duckUntil) return;
    audioEngine.duckUntil = 0;
    audioEngine.duckLevel = 1;
    updateAudioState();
  }, Math.max(220, durationMs + 120));
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
  } else if (name === "stage-clear") {
    playTone(392.0, 0.08, "triangle", 0.12);
    setTimeout(() => playTone(523.25, 0.1, "triangle", 0.13), 68);
    setTimeout(() => playTone(659.25, 0.12, "triangle", 0.14), 144);
    setTimeout(() => playTone(783.99, 0.2, "triangle", 0.13), 224);
  } else if (name === "boss-enter") {
    playTone(130.81, 0.12, "sawtooth", 0.09);
    setTimeout(() => playTone(196.0, 0.14, "triangle", 0.08), 90);
    setTimeout(() => playTone(261.63, 0.18, "triangle", 0.095), 190);
    setTimeout(() => playTone(392.0, 0.26, "triangle", 0.11), 320);
  } else if (name === "boss-attack") {
    playTone(164.81, 0.06, "sawtooth", 0.11);
    setTimeout(() => playTone(123.47, 0.08, "sawtooth", 0.1), 48);
    setTimeout(() => playTone(92.5, 0.1, "triangle", 0.085), 122);
  } else if (name === "boss-hit") {
    playTone(220.0, 0.04, "square", 0.08);
    setTimeout(() => playTone(659.25, 0.05, "triangle", 0.11), 16);
    setTimeout(() => playTone(987.77, 0.08, "triangle", 0.095), 56);
    setTimeout(() => playTone(1318.51, 0.11, "triangle", 0.075), 110);
  } else if (name === "boss-hurt") {
    playTone(196.0, 0.08, "sawtooth", 0.12);
    setTimeout(() => playTone(146.83, 0.1, "sawtooth", 0.11), 86);
    setTimeout(() => playTone(110.0, 0.13, "triangle", 0.085), 176);
  } else if (name === "boss-win") {
    playTone(392.0, 0.08, "triangle", 0.1);
    setTimeout(() => playTone(523.25, 0.1, "triangle", 0.12), 72);
    setTimeout(() => playTone(783.99, 0.14, "triangle", 0.12), 170);
    setTimeout(() => playTone(1046.5, 0.28, "triangle", 0.125), 300);
  } else if (name === "era-finale") {
    playTone(392.0, 0.12, "triangle", 0.1);
    setTimeout(() => playTone(523.25, 0.16, "triangle", 0.11), 120);
    setTimeout(() => playTone(659.25, 0.18, "triangle", 0.115), 260);
    setTimeout(() => playTone(783.99, 0.22, "triangle", 0.12), 430);
    setTimeout(() => playTone(1046.5, 0.4, "triangle", 0.125), 660);
  } else if (name === "badge") {
    // Badge fanfare: 5-second trumpet-style celebration for badge unlock moments.
    const note = (freq, delay, duration, leadVol = 0.12, colorVol = 0.064) => {
      setTimeout(() => {
        playTone(freq, duration, "sawtooth", leadVol);
        playTone(freq * 2, Math.max(0.12, duration - 0.05), "triangle", colorVol);
      }, delay);
    };
    note(392.0, 0, 0.24);
    note(523.25, 460, 0.28);
    note(587.33, 920, 0.3, 0.125, 0.068);
    note(659.25, 1380, 0.32, 0.13, 0.07);
    note(698.46, 1840, 0.34, 0.135, 0.074);
    note(783.99, 2320, 0.38, 0.14, 0.078);
    note(880.0, 2840, 0.46, 0.145, 0.082);
    note(1046.5, 3340, 0.74, 0.155, 0.086);
    note(1174.66, 4120, 0.5, 0.15, 0.082);
    note(1318.51, 4620, 0.56, 0.16, 0.09);
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

const ERA_MUSIC_MODIFIERS = {
  genesis: {
    transpose: 0,
    beatScale: 1.0,
    filterHz: 4700,
    energy: 0.98
  },
  patriarchs: {
    transpose: -1,
    beatScale: 0.98,
    filterHz: 4300,
    energy: 0.96,
    drums: { kickEvery: 2, snareEvery: 4, snareOffset: 2, hatEvery: 2, hatOffset: 1 }
  },
  exodus: {
    transpose: 1,
    beatScale: 0.95,
    filterHz: 5200,
    energy: 1.06
  },
  sinai: {
    transpose: -2,
    beatScale: 1.04,
    filterHz: 3600,
    energy: 0.92
  },
  wilderness: {
    transpose: -3,
    beatScale: 1.03,
    filterHz: 3300,
    energy: 0.9
  },
  conquest: {
    transpose: 2,
    beatScale: 0.94,
    filterHz: 5400,
    energy: 1.08
  },
  judges: {
    transpose: -2,
    beatScale: 1.01,
    filterHz: 3900,
    energy: 0.96
  },
  samuel: {
    transpose: -1,
    beatScale: 1.0,
    filterHz: 4500,
    energy: 0.95
  },
  saul: {
    transpose: -2,
    beatScale: 0.99,
    filterHz: 4100,
    energy: 0.97
  },
  david: {
    transpose: 2,
    beatScale: 0.93,
    filterHz: 5600,
    energy: 1.1
  }
};

const SECTION_MUSIC_MODIFIERS = {
  "Creation Dawn": {
    transpose: 2,
    beatScale: 1.06,
    suiteRotate: 0,
    motifRotate: 1,
    filterHz: 5800,
    energy: 0.95,
    drums: { kickEvery: 2, snareEvery: 6, snareOffset: 3, hatEvery: 2, hatOffset: 1, hatPower: 0.2 }
  },
  "Fall and Mercy": {
    transpose: -3,
    beatScale: 0.96,
    suiteRotate: 1,
    motifRotate: 2,
    motifDelta: -2,
    filterHz: 3200,
    energy: 0.9,
    drums: { kickEvery: 2, snareEvery: 4, snareOffset: 1, hatEvery: 3, hatOffset: 1 }
  },
  "Flood and Covenant": {
    transpose: -2,
    beatScale: 1.01,
    suiteRotate: 2,
    motifRotate: 0,
    filterHz: 3600,
    energy: 0.95,
    swellScale: 1.22,
    drums: { kickEvery: 1, snareEvery: 4, snareOffset: 2, hatEvery: 2, hatOffset: 1, hatPower: 0.24 }
  },
  "Nations and Babel": {
    transpose: 1,
    beatScale: 0.97,
    suiteRotate: 1,
    motifRotate: 3,
    filterHz: 4300,
    energy: 1.02,
    drums: { kickEvery: 1, snareEvery: 2, snareOffset: 1, hatEvery: 1, hatOffset: 0, hatPower: 0.34 }
  },
  "Call of Abram": {
    transpose: 1,
    beatScale: 0.99,
    suiteRotate: 0,
    motifRotate: 1,
    filterHz: 4700,
    energy: 0.98
  },
  "Promise Family": {
    transpose: 0,
    beatScale: 1.04,
    suiteRotate: 2,
    motifRotate: 0,
    filterHz: 5000,
    energy: 0.94,
    drums: { kickEvery: 2, snareEvery: 6, snareOffset: 2, hatEvery: 2, hatOffset: 1, hatPower: 0.2 }
  },
  "Jacob to Israel": {
    transpose: -2,
    beatScale: 0.98,
    suiteRotate: 1,
    motifRotate: 2,
    motifDelta: -1,
    filterHz: 3600,
    energy: 0.96,
    drums: { kickEvery: 1, snareEvery: 3, snareOffset: 1, hatEvery: 2, hatOffset: 1 }
  },
  "Joseph in Egypt": {
    transpose: 2,
    beatScale: 0.97,
    suiteRotate: 0,
    motifRotate: 3,
    filterHz: 5200,
    energy: 1.03,
    drums: { kickEvery: 1, snareEvery: 4, snareOffset: 2, hatEvery: 1, hatOffset: 0, hatPower: 0.28 }
  },
  "Burning Bush": {
    transpose: -1,
    beatScale: 1.03,
    suiteRotate: 2,
    motifRotate: 1,
    filterHz: 3500,
    energy: 0.93,
    swellScale: 1.18,
    drums: { kickEvery: 2, snareEvery: 8, snareOffset: 4, hatEvery: 2, hatOffset: 1, hatPower: 0.18 }
  },
  "Plagues and Passover": {
    transpose: 2,
    beatScale: 0.92,
    suiteRotate: 1,
    motifRotate: 0,
    filterHz: 5200,
    energy: 1.08,
    drums: { kickEvery: 1, snareEvery: 2, snareOffset: 1, hatEvery: 1, hatOffset: 0, hatPower: 0.38 }
  },
  "Sea Crossing": {
    transpose: 3,
    beatScale: 0.9,
    suiteRotate: 0,
    motifRotate: 2,
    filterHz: 5600,
    energy: 1.12,
    drums: { kickEvery: 1, snareEvery: 2, snareOffset: 1, hatEvery: 1, hatOffset: 0, hatPower: 0.4 }
  },
  "Sinai Covenant": {
    transpose: -3,
    beatScale: 1.06,
    suiteRotate: 2,
    motifRotate: 2,
    motifDelta: -2,
    filterHz: 3000,
    energy: 0.88,
    drums: { kickEvery: 2, snareEvery: 6, snareOffset: 3, hatEvery: 3, hatOffset: 1, hatPower: 0.16 }
  },
  "Wilderness Trust": {
    transpose: -4,
    beatScale: 1.02,
    suiteRotate: 1,
    motifRotate: 3,
    motifDelta: -1,
    filterHz: 3100,
    energy: 0.9,
    drums: { kickEvery: 2, snareEvery: 5, snareOffset: 2, hatEvery: 2, hatOffset: 1, hatPower: 0.2 }
  },
  "Jordan Crossing": {
    transpose: 2,
    beatScale: 0.94,
    suiteRotate: 0,
    motifRotate: 1,
    filterHz: 5100,
    energy: 1.06,
    drums: { kickEvery: 1, snareEvery: 3, snareOffset: 1, hatEvery: 1, hatOffset: 0, hatPower: 0.34 }
  },
  "Land and Legacy": {
    transpose: 3,
    beatScale: 0.93,
    suiteRotate: 2,
    motifRotate: 0,
    filterHz: 5400,
    energy: 1.08,
    drums: { kickEvery: 1, snareEvery: 2, snareOffset: 1, hatEvery: 1, hatOffset: 0, hatPower: 0.36 }
  },
  "Cycle of Judges": {
    transpose: -2,
    beatScale: 0.99,
    suiteRotate: 1,
    motifRotate: 2,
    motifDelta: -1,
    filterHz: 3700,
    energy: 0.97,
    drums: { kickEvery: 1, snareEvery: 3, snareOffset: 1, hatEvery: 2, hatOffset: 1, hatPower: 0.28 }
  },
  "Ruth's Faithfulness": {
    transpose: 0,
    beatScale: 1.05,
    suiteRotate: 0,
    motifRotate: 3,
    filterHz: 5000,
    energy: 0.93,
    drums: { kickEvery: 2, snareEvery: 8, snareOffset: 4, hatEvery: 2, hatOffset: 1, hatPower: 0.18 }
  },
  "Samuel's Calling": {
    transpose: -1,
    beatScale: 1.03,
    suiteRotate: 1,
    motifRotate: 2,
    motifDelta: -2,
    filterHz: 3900,
    energy: 0.91,
    drums: { kickEvery: 2, snareEvery: 6, snareOffset: 3, hatEvery: 3, hatOffset: 1, hatPower: 0.18 }
  },
  "Saul's Kingship": {
    transpose: -2,
    beatScale: 0.97,
    suiteRotate: 2,
    motifRotate: 1,
    filterHz: 4000,
    energy: 1.0,
    drums: { kickEvery: 1, snareEvery: 3, snareOffset: 1, hatEvery: 2, hatOffset: 1, hatPower: 0.28 }
  },
  "David and Courage": {
    transpose: 4,
    beatScale: 0.9,
    suiteRotate: 0,
    motifRotate: 0,
    filterHz: 6000,
    energy: 1.15,
    drums: { kickEvery: 1, snareEvery: 2, snareOffset: 1, hatEvery: 1, hatOffset: 0, hatPower: 0.42 }
  }
};

const MUSIC_SCALE_LIBRARY = [
  [0, 2, 4, 5, 7, 9, 11], // major
  [0, 2, 3, 5, 7, 9, 10], // dorian
  [0, 1, 3, 5, 7, 8, 10], // phrygian
  [0, 2, 3, 5, 7, 8, 10], // natural minor
  [0, 2, 4, 6, 7, 9, 11] // lydian
];
const MUSIC_ROOT_LIBRARY = [174.61, 185.0, 196.0, 207.65, 220.0, 233.08, 246.94, 261.63, 277.18, 293.66];
const MUSIC_PROGRESSIONS = [
  [0, 2, 4, 5],
  [0, 3, 5, 2],
  [0, 4, 2, 5],
  [0, 1, 4, 3],
  [0, 5, 3, 4],
  [0, 2, 5, 3]
];
const MUSIC_MOTIFS = [
  [0, 2, 4, 2],
  [0, 3, 5, 3],
  [0, 1, 4, 2],
  [0, 4, 5, 4],
  [0, 2, 3, 5],
  [0, 5, 4, 2]
];
const MUSIC_SHIFT_PATTERNS = [
  [0, 2, 0, -2],
  [0, 0, 3, -2],
  [0, 5, 2, -3],
  [0, -2, 0, 2],
  [0, 3, 0, -3],
  [0, 4, 1, -2]
];
const MUSIC_WAVE_PACKS = [
  { rootWave: "triangle", colorWave: "sine", bassWave: "triangle", motifWave: "triangle", droneWave: "sine" },
  { rootWave: "sine", colorWave: "triangle", bassWave: "sine", motifWave: "triangle", droneWave: "triangle" },
  { rootWave: "triangle", colorWave: "sawtooth", bassWave: "triangle", motifWave: "sine", droneWave: "sine" },
  { rootWave: "sawtooth", colorWave: "triangle", bassWave: "sine", motifWave: "triangle", droneWave: "triangle" },
  { rootWave: "sine", colorWave: "sine", bassWave: "triangle", motifWave: "sawtooth", droneWave: "sine" }
];
const MUSIC_DRUM_PACKS = [
  { kickEvery: 1, kickPower: 0.9, snareEvery: 2, snareOffset: 1, snarePower: 0.52, hatEvery: 1, hatOffset: 0, hatPower: 0.34 },
  { kickEvery: 1, kickPower: 0.86, snareEvery: 3, snareOffset: 1, snarePower: 0.48, hatEvery: 2, hatOffset: 1, hatPower: 0.28 },
  { kickEvery: 2, kickPower: 0.8, snareEvery: 4, snareOffset: 2, snarePower: 0.44, hatEvery: 2, hatOffset: 1, hatPower: 0.24 },
  { kickEvery: 1, kickPower: 0.93, snareEvery: 2, snareOffset: 1, snarePower: 0.54, hatEvery: 1, hatOffset: 0, hatPower: 0.38 },
  { kickEvery: 2, kickPower: 0.78, snareEvery: 6, snareOffset: 3, snarePower: 0.4, hatEvery: 3, hatOffset: 1, hatPower: 0.2 }
];
const ADVENTURE_ERA_BOOST = {
  conquest: 1.18,
  david: 1.16,
  exodus: 1.14,
  judges: 1.1,
  saul: 1.08,
  samuel: 1.04,
  patriarchs: 1.0,
  genesis: 0.98,
  wilderness: 0.94,
  sinai: 0.92
};

function clampMusicValue(value, min, max) {
  return Math.max(min, Math.min(max, Number(value)));
}

function musicSeed(text) {
  return String(text || "faithshield")
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}

function rotateMusicArray(values, shift) {
  if (!Array.isArray(values) || !values.length) return [];
  const offset = ((Number(shift) || 0) % values.length + values.length) % values.length;
  if (!offset) return values.slice();
  return values.slice(offset).concat(values.slice(0, offset));
}

function scaleDegreeSemitone(scale, degree) {
  const safeScale = Array.isArray(scale) && scale.length ? scale : MUSIC_SCALE_LIBRARY[0];
  const len = safeScale.length;
  const wrapped = ((degree % len) + len) % len;
  const octaves = Math.floor(degree / len);
  return safeScale[wrapped] + octaves * 12;
}

function transposeFrequency(freq, semitoneShift) {
  if (!Number.isFinite(freq) || freq <= 0) return freq;
  const semitones = Number(semitoneShift) || 0;
  return Number((freq * Math.pow(2, semitones / 12)).toFixed(2));
}

function buildSectionSignature(theme, style, baseProfile) {
  if (!theme || !theme.name) return {};
  const seed = musicSeed(`${theme.name}|${theme.era}|${style}`);
  const scale = MUSIC_SCALE_LIBRARY[seed % MUSIC_SCALE_LIBRARY.length];
  const root = MUSIC_ROOT_LIBRARY[seed % MUSIC_ROOT_LIBRARY.length];
  const progression = MUSIC_PROGRESSIONS[(seed >> 2) % MUSIC_PROGRESSIONS.length];
  const motif = MUSIC_MOTIFS[(seed >> 4) % MUSIC_MOTIFS.length];
  const shifts = MUSIC_SHIFT_PATTERNS[(seed >> 6) % MUSIC_SHIFT_PATTERNS.length];
  const wavePack = MUSIC_WAVE_PACKS[(seed >> 5) % MUSIC_WAVE_PACKS.length];
  const drumPack = MUSIC_DRUM_PACKS[(seed >> 7) % MUSIC_DRUM_PACKS.length];

  const styleTempo = style === "energetic" ? 0.92 : 1.03;
  const adventure = ADVENTURE_ERA_BOOST[theme.era] || 1;
  const beatBase = Math.round((style === "energetic" ? 650 : 740) / adventure * styleTempo);
  const beatVariants = [-38, -14, 22];

  const buildSuite = (suiteIdx) => {
    const degreeShift = suiteIdx + (seed % 3);
    const suiteProgression = rotateMusicArray(progression, suiteIdx).map((degree) => {
      const base = degree + degreeShift;
      const rootSemi = scaleDegreeSemitone(scale, base);
      const thirdSemi = scaleDegreeSemitone(scale, base + 2);
      const fifthSemi = scaleDegreeSemitone(scale, base + 4);
      return {
        chord: [
          transposeFrequency(root, rootSemi),
          transposeFrequency(root, thirdSemi),
          transposeFrequency(root, fifthSemi)
        ],
        bass: transposeFrequency(root, rootSemi - 12)
      };
    });

    const motifLine = rotateMusicArray(motif, suiteIdx).map((degree) => {
      const semi = scaleDegreeSemitone(scale, degree + degreeShift) + (style === "energetic" ? 12 : 10);
      return transposeFrequency(root, semi);
    });

    return {
      beatMs: clampMusicValue(beatBase + beatVariants[suiteIdx % beatVariants.length], 520, 900),
      progression: suiteProgression,
      motif: motifLine
    };
  };

  return {
    suites: [buildSuite(0), buildSuite(1), buildSuite(2)],
    motifShifts: shifts.slice(),
    rootWave: wavePack.rootWave,
    colorWave: wavePack.colorWave,
    bassWave: wavePack.bassWave,
    motifWave: wavePack.motifWave,
    droneWave: wavePack.droneWave,
    lookAheadSeconds: clampMusicValue((baseProfile.lookAheadSeconds || 0.34) + (((seed % 5) - 2) * 0.012), 0.24, 0.48),
    tickMs: clampMusicValue((baseProfile.tickMs || 78) + ((((seed >> 3) % 5) - 2) * 4), 56, 96),
    offBeatFactor: clampMusicValue((baseProfile.offBeatFactor || 0.5) + ((((seed >> 1) % 5) - 2) * 0.03), 0.36, 0.66),
    swellRange: clampMusicValue((baseProfile.swellRange || 0.1) + ((adventure - 1) * 0.05), 0.07, 0.18),
    drums: {
      ...drumPack,
      hatPower: clampMusicValue(drumPack.hatPower * adventure, 0.18, 0.44),
      kickPower: clampMusicValue(drumPack.kickPower * adventure, 0.68, 1.08),
      snarePower: clampMusicValue(drumPack.snarePower * adventure, 0.34, 0.72)
    }
  };
}

function resolveActiveMusicTheme() {
  const activeMeta = state.activeStage ? getStageMeta(state.activeStage) : null;
  if (activeMeta && activeMeta.theme) return activeMeta.theme;

  const lastMeta = state.lastStage ? getStageMeta(state.lastStage) : null;
  if (lastMeta && lastMeta.theme) return lastMeta.theme;

  const unlockedIndex = Math.max(0, Math.min(stages.length - 1, Number(state.unlocked || 1) - 1));
  const fallbackMeta = stages[unlockedIndex] || stages[0] || null;
  return fallbackMeta ? fallbackMeta.theme : (timelineThemes[0] || null);
}

function resolveMusicModifier(theme) {
  const eraModifier = (theme && ERA_MUSIC_MODIFIERS[theme.era]) || {};
  const sectionModifier = (theme && SECTION_MUSIC_MODIFIERS[theme.name]) || {};
  return {
    transpose: Number(eraModifier.transpose || 0) + Number(sectionModifier.transpose || 0),
    beatScale: (Number(eraModifier.beatScale) || 1) * (Number(sectionModifier.beatScale) || 1),
    suiteRotate: Number(sectionModifier.suiteRotate || 0),
    motifRotate: Number(sectionModifier.motifRotate || 0),
    motifDelta: Number(sectionModifier.motifDelta || 0),
    filterHz: Number(sectionModifier.filterHz || eraModifier.filterHz || 0),
    energy: (Number(eraModifier.energy) || 1) * (Number(sectionModifier.energy) || 1),
    swellScale: Number(sectionModifier.swellScale || 1),
    drums: {
      ...(eraModifier.drums || {}),
      ...(sectionModifier.drums || {})
    }
  };
}

function buildThemedSuites(baseSuites, modifier) {
  const transpose = Number(modifier.transpose || 0);
  const beatScale = clampMusicValue(Number(modifier.beatScale || 1), 0.78, 1.24);
  const suiteRotate = Number(modifier.suiteRotate || 0);
  const motifRotate = Number(modifier.motifRotate || 0);
  const motifDelta = Number(modifier.motifDelta || 0);

  return rotateMusicArray(baseSuites, suiteRotate).map((suite) => ({
    beatMs: clampMusicValue(Math.round(suite.beatMs * beatScale), 520, 920),
    progression: suite.progression.map((step) => ({
      chord: step.chord.map((freq, idx) => transposeFrequency(freq, transpose + idx * 0.2)),
      bass: transposeFrequency(step.bass, transpose - 0.3)
    })),
    motif: rotateMusicArray(suite.motif, motifRotate).map((freq) => transposeFrequency(freq, transpose + motifDelta))
  }));
}

function buildThemedMusicProfile(baseProfile, modifier, signature = {}) {
  const sourceSuites = Array.isArray(signature.suites) && signature.suites.length
    ? signature.suites
    : baseProfile.suites;
  const suites = buildThemedSuites(sourceSuites, modifier);
  const energy = clampMusicValue(Number(modifier.energy || 1), 0.78, 1.25);
  const swellScale = clampMusicValue(Number(modifier.swellScale || 1), 0.74, 1.32);
  const sourceMotifShifts = Array.isArray(signature.motifShifts) && signature.motifShifts.length
    ? signature.motifShifts
    : baseProfile.motifShifts;

  return {
    ...baseProfile,
    lookAheadSeconds: clampMusicValue(Number(signature.lookAheadSeconds || baseProfile.lookAheadSeconds || 0.34), 0.24, 0.48),
    tickMs: clampMusicValue(Number(signature.tickMs || baseProfile.tickMs || 78), 56, 96),
    offBeatFactor: clampMusicValue(Number(signature.offBeatFactor || baseProfile.offBeatFactor || 0.5), 0.36, 0.66),
    rootWave: signature.rootWave || baseProfile.rootWave || "triangle",
    colorWave: signature.colorWave || baseProfile.colorWave || "sine",
    bassWave: signature.bassWave || baseProfile.bassWave || "triangle",
    motifWave: signature.motifWave || baseProfile.motifWave || "triangle",
    droneWave: signature.droneWave || baseProfile.droneWave || "sine",
    suiteWindowMs: Math.round(baseProfile.suiteWindowMs * clampMusicValue(1 / (modifier.beatScale || 1), 0.8, 1.22)),
    swellPeriodMs: Math.round(baseProfile.swellPeriodMs * swellScale),
    swellRange: clampMusicValue(Number(signature.swellRange || baseProfile.swellRange || 0.1), 0.07, 0.18),
    motifShifts: rotateMusicArray(sourceMotifShifts, modifier.motifRotate || 0),
    rootVol: clampMusicValue(baseProfile.rootVol * energy, 0.03, 0.12),
    thirdVol: clampMusicValue(baseProfile.thirdVol * energy, 0.02, 0.09),
    fifthVol: clampMusicValue(baseProfile.fifthVol * energy, 0.02, 0.1),
    bassVol: clampMusicValue(baseProfile.bassVol * energy, 0.04, 0.13),
    motifVol: clampMusicValue(baseProfile.motifVol * energy, 0.006, 0.04),
    droneVol: clampMusicValue(baseProfile.droneVol * (0.94 + (energy - 1) * 0.6), 0.015, 0.06),
    filterHz: clampMusicValue(modifier.filterHz || 4400, 2200, 6800),
    suites,
    drums: {
      ...baseProfile.drums,
      ...(signature.drums || {}),
      ...(modifier.drums || {})
    }
  };
}

function applyMusicFilterProfile(ctx, profile) {
  if (!audioEngine.musicFilter) return;
  const filterHz = clampMusicValue(profile.filterHz || 4400, 2200, 6800);
  audioEngine.musicFilter.frequency.cancelScheduledValues(ctx.currentTime);
  audioEngine.musicFilter.frequency.setValueAtTime(audioEngine.musicFilter.frequency.value, ctx.currentTime);
  audioEngine.musicFilter.frequency.exponentialRampToValueAtTime(filterHz, ctx.currentTime + 0.34);
}

function startMusicLoop() {
  ensureAudio();
  if (!audioEngine.ctx) return;
  if (!state.audio.music || state.activeStage || audioEngine.finaleTimer || audioEngine.creditsTimer || isFinalOpen() || isCreditsOpen()) return;
  if (audioEngine.ctx.state === "suspended") audioEngine.ctx.resume().catch(() => {});

  const ctx = audioEngine.ctx;
  const activeTheme = resolveActiveMusicTheme();
  const style = resolvedMusicStyle();
  const musicProfileKey = `${style}|${activeTheme ? activeTheme.era : "genesis"}|${activeTheme ? activeTheme.name : "Creation Dawn"}`;
  if (audioEngine.timer && audioEngine.musicProfileKey === musicProfileKey) return;

  stopMusicLoop();

  const profileByStyle = {
    cinematic: {
      suiteWindowMs: 46000,
      lookAheadSeconds: 0.36,
      tickMs: 80,
      offBeatFactor: 0.5,
      swellBase: 0.92,
      swellRange: 0.1,
      swellPeriodMs: 8200,
      filterHz: 4300,
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
      filterHz: 5000,
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
  const baseProfile = profileByStyle[style] || profileByStyle.cinematic;
  const modifier = resolveMusicModifier(activeTheme);
  const signature = buildSectionSignature(activeTheme, style, baseProfile);
  const profile = buildThemedMusicProfile(baseProfile, modifier, signature);
  const suiteWindowMs = profile.suiteWindowMs;
  const suites = profile.suites;

  if (!audioEngine.musicStartedAt) {
    audioEngine.musicStartedAt = Date.now();
  }
  audioEngine.musicProfileKey = musicProfileKey;
  audioEngine.musicThemeName = activeTheme ? activeTheme.name : "";
  audioEngine.musicThemeEra = activeTheme ? activeTheme.era : "";
  audioEngine.musicStartCtx = ctx.currentTime + 0.18;
  audioEngine.nextBeatAt = audioEngine.musicStartCtx;
  applyMusicFilterProfile(ctx, profile);

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
      playTone(chordStep.bass, 0.78, profile.bassWave || "triangle", profile.bassVol * swell, "music", beatTime);
      playTone(shiftedMotif, 0.18, profile.motifWave || "triangle", profile.motifVol * swell, "music", offBeatTime);
      if (audioEngine.step % 4 === 0) {
        playTone(chordStep.bass / 2, beatSeconds * 1.6, profile.droneWave || "sine", profile.droneVol * swell, "music", beatTime);
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
  audioEngine.step = 0;
  audioEngine.musicStartCtx = 0;
  audioEngine.nextBeatAt = 0;
  audioEngine.musicStartedAt = 0;
  audioEngine.musicThemeName = "";
  audioEngine.musicThemeEra = "";
  audioEngine.musicProfileKey = "";
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

function captureStateSnapshot() {
  return deepClone({
    unlocked: state.unlocked,
    completed: state.completed,
    xp: state.xp,
    lives: state.lives,
    badges: state.badges,
    audio: state.audio,
    levelFailures: state.levelFailures,
    stats: state.stats,
    difficulty: state.difficulty,
    activeStage: state.activeStage || null,
    lastStage: state.lastStage || null,
    lastBadge: state.lastBadge || "",
    playerName: state.playerName || "",
    finalSeen: state.finalSeen,
    questionHistory: state.questionHistory,
    stageActivities: state.stageActivities,
    language: state.language,
    dailyStrike: state.dailyStrike,
    mastery: state.mastery,
    dailyDevotion: state.dailyDevotion,
    weeklyChallenge: state.weeklyChallenge,
    controls: state.controls,
    reviewFocus: state.reviewFocus,
    prayerResponses: state.prayerResponses,
    dailyCalendar: state.dailyCalendar
  });
}

function activeProfileMeta() {
  return profileIndex.find((profile) => profile.id === activeProfileId) || null;
}

function syncActiveProfileMetadata() {
  const profile = activeProfileMeta();
  if (!profile) return;
  const preferredName = normalizePlayerName(state.playerName || profile.name || "") || profile.name || "Faith Player";
  profile.name = preferredName;
  profile.updatedAt = localDayKey();
  saveProfileIndex(profileIndex);
}

function persist() {
  const fingerprint = JSON.stringify({
    profileId: activeProfileId,
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
    mastery: state.mastery,
    dailyDevotion: state.dailyDevotion,
    weeklyChallenge: state.weeklyChallenge,
    controls: state.controls,
    reviewFocus: state.reviewFocus,
    prayerResponses: state.prayerResponses,
    dailyCalendar: state.dailyCalendar,
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
  localStorage.setItem("faithMastery", JSON.stringify(state.mastery));
  localStorage.setItem("faithDailyDevotion", JSON.stringify(state.dailyDevotion));
  localStorage.setItem("faithWeeklyChallenge", JSON.stringify(state.weeklyChallenge));
  localStorage.setItem("faithControls", JSON.stringify(state.controls));
  localStorage.setItem("faithPrayerResponses", JSON.stringify(state.prayerResponses));
  localStorage.setItem("faithDailyCalendar", JSON.stringify(state.dailyCalendar));
  if (state.reviewFocus) localStorage.setItem("faithReviewFocus", JSON.stringify(state.reviewFocus));
  else localStorage.removeItem("faithReviewFocus");
  localStorage.setItem("faithContentVersion", CONTENT_VERSION);

  if (state.activeStage) localStorage.setItem("faithActiveStage", state.activeStage);
  else localStorage.removeItem("faithActiveStage");

  if (state.lastStage) localStorage.setItem("faithLastStage", state.lastStage);
  else localStorage.removeItem("faithLastStage");

  syncActiveProfileMetadata();
  localStorage.setItem(PROFILE_ACTIVE_KEY, activeProfileId);
  writeStoredProfileSnapshot(activeProfileId, captureStateSnapshot());
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

function eraIntroCopy(era) {
  const map = {
    genesis: "Creation to Babel",
    patriarchs: "Abraham to Joseph",
    exodus: "Deliverance from Egypt",
    sinai: "Covenant at Sinai",
    wilderness: "Trust in the wilderness",
    conquest: "Crossing and conquest",
    judges: "Judges and mercy",
    samuel: "The call of Samuel",
    saul: "Rise and testing of Saul",
    david: "Courage of David"
  };
  return map[era] || era;
}

function eraFinaleCopy(era) {
  const map = {
    genesis: {
      title: "Genesis Complete",
      body: "You walked from creation, through the fall, the flood, and Babel. God remained faithful through every beginning.",
      reflection: "Take a moment to remember how God's purpose held steady from the very first pages of Scripture."
    },
    patriarchs: {
      title: "Patriarch Journey Complete",
      body: "You followed God's covenant promises from Abram through Joseph. The promise line kept moving forward by faith.",
      reflection: "Notice how God kept His word across generations, even through waiting, weakness, and hardship."
    },
    exodus: {
      title: "Exodus Complete",
      body: "You saw God deliver His people with power, mercy, and remembrance. Redemption defined this journey.",
      reflection: "Remember that God not only rescues, but also teaches His people how to trust Him."
    },
    sinai: {
      title: "Sinai Complete",
      body: "You reached the covenant mountain and traced God's holy words. Sinai shows both God's nearness and His holiness.",
      reflection: "Let this era remind you that God's commands are meant to shape a faithful people."
    },
    wilderness: {
      title: "Wilderness Complete",
      body: "You crossed the hard places of testing and provision. God remained patient even when His people struggled to trust.",
      reflection: "Wilderness stories teach that daily dependence on God matters more than quick confidence."
    },
    conquest: {
      title: "Conquest Complete",
      body: "You crossed into the land and watched God go before His people. Courage and obedience mattered at every step.",
      reflection: "This era shows that victory in Scripture is tied to God's presence, not human strength alone."
    },
    judges: {
      title: "Judges Complete",
      body: "You moved through cycles of failure, mercy, and deliverance. Even in instability, God kept raising help.",
      reflection: "Judges reminds us how much God's people need both repentance and faithful leadership."
    },
    samuel: {
      title: "Samuel Complete",
      body: "You listened through call, leadership, and transition. God's voice shaped the future when His servants listened.",
      reflection: "Stay attentive. The Lord still teaches His people to hear and obey."
    },
    saul: {
      title: "Saul Complete",
      body: "You traced the rise of kingship and the cost of disobedience. Authority without submission to God does not last.",
      reflection: "This era warns that outward position never replaces inward obedience."
    },
    david: {
      title: "David Complete",
      body: "You followed courage, worship, and trust in the Lord. David's path shows that faith can stand firm in battle and weakness alike.",
      reflection: "Carry this lesson forward: the Lord looks at the heart and strengthens those who trust Him."
    }
  };
  return map[era] || {
    title: `${formatEraLabel(era)} Complete`,
    body: "You completed this chapter of the Bible journey.",
    reflection: "Keep going. God's Word is building the whole shield one section at a time."
  };
}

function eraPrayerPrompt(era) {
  const prompts = {
    genesis: challengeCopy(
      "Write one short prayer asking God to help you trust His word over every lie.",
      "Escribe una breve oracion pidiendo a Dios que te ayude a confiar en Su palabra por encima de toda mentira."
    ),
    patriarchs: challengeCopy(
      "Write one short prayer thanking God for keeping His promises across generations.",
      "Escribe una breve oracion dando gracias a Dios por cumplir Sus promesas a traves de generaciones."
    ),
    exodus: challengeCopy(
      "Write one short prayer thanking God for rescue and asking for courage to obey.",
      "Escribe una breve oracion dando gracias a Dios por Su rescate y pidiendo valor para obedecer."
    ),
    sinai: challengeCopy(
      "Write one short prayer asking God to shape your heart to love holiness and obedience.",
      "Escribe una breve oracion pidiendo a Dios que forme tu corazon para amar la santidad y la obediencia."
    ),
    wilderness: challengeCopy(
      "Write one short prayer asking God for daily trust in seasons of waiting and testing.",
      "Escribe una breve oracion pidiendo a Dios confianza diaria en tiempos de espera y prueba."
    ),
    conquest: challengeCopy(
      "Write one short prayer asking God for courage to follow Him step by step.",
      "Escribe una breve oracion pidiendo a Dios valor para seguirle paso a paso."
    ),
    judges: challengeCopy(
      "Write one short prayer asking God to keep you faithful when the world around you drifts.",
      "Escribe una breve oracion pidiendo a Dios que te mantenga fiel cuando el mundo a tu alrededor se aparta."
    ),
    samuel: challengeCopy(
      "Write one short prayer asking God to help you hear and obey His voice.",
      "Escribe una breve oracion pidiendo a Dios que te ayude a oir y obedecer Su voz."
    ),
    saul: challengeCopy(
      "Write one short prayer asking for a humble heart that obeys God fully.",
      "Escribe una breve oracion pidiendo un corazon humilde que obedezca completamente a Dios."
    ),
    david: challengeCopy(
      "Write one short prayer asking God for courage to trust Him in your hardest battle.",
      "Escribe una breve oracion pidiendo a Dios valor para confiar en El en tu batalla mas dificil."
    )
  };
  return prompts[era] || challengeCopy(
    "Write one short prayer from what God taught you in this chapter.",
    "Escribe una breve oracion sobre lo que Dios te enseno en este capitulo."
  );
}

function prayerResponseForEra(era) {
  if (!era) return null;
  const entry = state.prayerResponses && state.prayerResponses[era];
  if (!entry || typeof entry !== "object") return null;
  return {
    text: String(entry.text || "").slice(0, 280),
    updatedAt: String(entry.updatedAt || ""),
    day: String(entry.day || "")
  };
}

function savePrayerResponseForEra(era, text) {
  const cleanEra = String(era || "").trim();
  const cleanText = String(text || "").replace(/\s+/g, " ").trim().slice(0, 280);
  if (!cleanEra || !cleanText) return null;
  const payload = {
    text: cleanText,
    updatedAt: new Date().toISOString(),
    day: localDayKey()
  };
  state.prayerResponses[cleanEra] = payload;
  persist();
  return payload;
}

function refreshEraFinalePrayerState(era) {
  if (!eraFinalePrayerPrompt || !eraFinalePrayerInput || !eraFinalePrayerSaveBtn || !eraFinalePrayerStatus) return;
  const saved = prayerResponseForEra(era);
  eraFinalePrayerPrompt.textContent = eraPrayerPrompt(era);
  if (document.activeElement !== eraFinalePrayerInput) {
    eraFinalePrayerInput.value = saved ? saved.text : "";
  }
  eraFinalePrayerSaveBtn.disabled = !String(eraFinalePrayerInput.value || "").trim();
  eraFinalePrayerStatus.textContent = saved
    ? challengeCopy(`Saved ${saved.day}.`, `Guardado ${saved.day}.`)
    : challengeCopy("Write a short prayer response for this chapter.", "Escribe una breve respuesta de oracion para este capitulo.");
}

function compareDayKeys(a, b) {
  return String(a || "").localeCompare(String(b || ""));
}

function entryDueToday(entry) {
  const nextReviewDay = String(entry && entry.nextReviewDay || "");
  if (!nextReviewDay) return false;
  return compareDayKeys(nextReviewDay, localDayKey()) <= 0;
}

function reviewDueEntries(limit = 5) {
  return masteryEntries()
    .filter((entry) => entryDueToday(entry) || Number(entry.wrongStreak || 0) > 0)
    .sort((a, b) => {
      const dueDiff = compareDayKeys(String(a.nextReviewDay || ""), String(b.nextReviewDay || ""));
      if (dueDiff !== 0) return dueDiff;
      const strengthDiff = Number(a.strength || 0) - Number(b.strength || 0);
      if (strengthDiff !== 0) return strengthDiff;
      return Number(b.wrongStreak || 0) - Number(a.wrongStreak || 0);
    })
    .slice(0, Math.max(1, limit));
}

function smoothScrollToNode(node) {
  if (!node) return;
  const findScrollParent = (el) => {
    if (appRoot && appRoot.scrollHeight > appRoot.clientHeight + 8) return appRoot;
    let parent = el ? el.parentElement : null;
    while (parent) {
      const style = window.getComputedStyle(parent);
      const overflowY = style.overflowY || style.overflow;
      if ((overflowY === "auto" || overflowY === "scroll") && parent.scrollHeight > parent.clientHeight + 8) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return document.scrollingElement || document.documentElement || document.body;
  };

  try {
    node.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  } catch (_) {
    node.scrollIntoView();
  }
  try {
    const rect = node.getBoundingClientRect();
    const container = findScrollParent(node);
    if (container && container !== document.body && container !== document.documentElement && container !== document.scrollingElement) {
      const containerRect = container.getBoundingClientRect();
      const offset = rect.top - containerRect.top + container.scrollTop - 12;
      container.scrollTo({ top: Math.max(0, offset), behavior: "smooth" });
      return;
    }
    const top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || 0) - 12;
    window.scrollTo({ top, behavior: "smooth" });
  } catch (_) {
    // Ignore scroll fallback errors.
  }
}

function jumpToEra(era) {
  const selector = `.era-section[data-era="${era}"]`;
  const eraNode = stageGrid ? stageGrid.querySelector(selector) : null;
  if (eraNode) {
    smoothScrollToNode(eraNode);
    return;
  }
  smoothScrollToNode(storyPathHeading || gameDashboard || stageGrid);
}

function copyTextToClipboardOrPrompt(text, onCopied = null) {
  const message = String(text || "").trim();
  if (!message) return;
  const notifyCopied = () => {
    if (typeof onCopied === "function") onCopied(message);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(message).then(notifyCopied).catch(() => {
      openShareTextOverlay(challengeCopy("Share Text", "Texto para compartir"), message);
      notifyCopied();
    });
    return;
  }

  openShareTextOverlay(challengeCopy("Share Text", "Texto para compartir"), message);
  notifyCopied();
}

function nativeShareOrCopy(title, text, onCopied = null) {
  const message = String(text || "").trim();
  if (!message) return;
  const payload = { title: String(title || "FAITHSHIELD"), text: message };
  if (navigator.share) {
    try {
      const canShare = typeof navigator.canShare === "function" ? navigator.canShare(payload) : true;
      if (canShare) {
        navigator.share(payload).catch(() => {
          copyTextToClipboardOrPrompt(message, onCopied);
        });
        return;
      }
    } catch (_) {
      // Continue to copy fallback.
    }
  }

  copyTextToClipboardOrPrompt(message, onCopied);
}

function ensureBadgeSetBonusState() {
  if (!state.stats || typeof state.stats !== "object") state.stats = {};
  if (!state.stats.badgeSetBonuses || typeof state.stats.badgeSetBonuses !== "object" || Array.isArray(state.stats.badgeSetBonuses)) {
    state.stats.badgeSetBonuses = {};
  }
}

function countUnlockedBadgeSetBonuses() {
  ensureBadgeSetBonusState();
  return BADGE_SET_BONUSES.reduce((count, setBonus) => count + (state.stats.badgeSetBonuses[setBonus.id] ? 1 : 0), 0);
}

function rewardLabelForSetBonus(setBonus) {
  const xp = Number(setBonus.rewardXp || 0);
  const lives = Number(setBonus.rewardLives || 0);
  const segments = [];
  if (xp > 0) segments.push(`+${xp} XP`);
  if (lives > 0) segments.push(`+${lives} life${lives === 1 ? "" : "s"}`);
  return segments.join(" • ");
}

function awardBadgeSetBonuses() {
  ensureBadgeSetBonusState();
  const unlocked = [];

  BADGE_SET_BONUSES.forEach((setBonus) => {
    if (!setBonus || !setBonus.id || typeof setBonus.check !== "function") return;
    if (state.stats.badgeSetBonuses[setBonus.id]) return;
    if (!setBonus.check(state)) return;

    state.stats.badgeSetBonuses[setBonus.id] = true;

    const rewardXp = Math.max(0, Number(setBonus.rewardXp || 0));
    const rewardLives = Math.max(0, Number(setBonus.rewardLives || 0));
    if (rewardXp > 0) awardXp(rewardXp);
    if (rewardLives > 0) state.lives = Math.min(MAX_LIVES, state.lives + rewardLives);

    unlocked.push({
      id: `set-bonus-${setBonus.id}`,
      icon: setBonus.icon || "✨",
      name: `${setBonus.name} (${t("setBonusesLabel")})`,
      accomplishment: `${setBonus.accomplishment} ${rewardLabelForSetBonus(setBonus)}`.trim(),
      skipBoard: true
    });
  });

  return unlocked;
}

function latestOwnedBadge() {
  return getBadgeById(state.badges[state.badges.length - 1]) || null;
}

function replayLatestBadgeCelebration() {
  const badge = latestOwnedBadge();
  if (!badge) return;
  showBadgeUnlockMoment(badge);
  playSfx("badge");
}

function normalizeFileSlug(value, fallback = "badge") {
  const clean = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return clean || fallback;
}

function badgeCardFileName(badge) {
  const date = new Date().toISOString().slice(0, 10);
  const slug = normalizeFileSlug(badge && badge.name ? badge.name : "badge");
  return `faithshield-${slug}-${date}.png`;
}

function createBadgeShareCardCanvas(badge) {
  const width = 1200;
  const height = 1500;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#1c2746");
  bg.addColorStop(0.6, "#0f2143");
  bg.addColorStop(1, "#07142d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(width * 0.78, height * 0.22, 60, width * 0.78, height * 0.22, 520);
  glow.addColorStop(0, "rgba(233, 174, 74, 0.28)");
  glow.addColorStop(1, "rgba(233, 174, 74, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  ctx.fillRect(70, 110, width - 140, height - 220);
  ctx.strokeStyle = "rgba(228, 191, 120, 0.55)";
  ctx.lineWidth = 3;
  ctx.strokeRect(70, 110, width - 140, height - 220);

  const icon = String((badge && badge.icon) || "🛡️");
  ctx.font = "700 140px Georgia, 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(icon, width / 2, 330);

  ctx.fillStyle = "#e6d6b3";
  ctx.font = "700 44px Georgia, 'Times New Roman', serif";
  ctx.fillText("FAITHSHIELD", width / 2, 150);

  ctx.fillStyle = "#f2e5ca";
  ctx.font = "700 72px Georgia, 'Times New Roman', serif";
  const nameText = String((badge && badge.name) || "Badge Unlocked");
  drawWrappedCenterText(ctx, nameText, width / 2, 470, width - 260, 82, 3);

  ctx.fillStyle = "#eedfbf";
  ctx.font = "500 42px system-ui, -apple-system, Segoe UI, sans-serif";
  const bodyText = String((badge && badge.accomplishment) || t("badgeUnlockedNow"));
  const y = drawWrappedCenterText(ctx, bodyText, width / 2, 700, width - 300, 56, 5);

  ctx.fillStyle = "#d9b56b";
  ctx.font = "600 34px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText(`Player: ${state.playerName || "Faith Player"}`, width / 2, y + 92);

  ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
  ctx.font = "500 28px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText(new Date().toLocaleDateString(), width / 2, y + 148);

  return canvas;
}

function drawWrappedCenterText(ctx, text, x, startY, maxWidth, lineHeight, maxLines) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  if (!words.length) return startY;

  const lines = [];
  let current = words.shift() || "";
  while (words.length) {
    const next = words.shift();
    const trial = `${current} ${next}`;
    if (ctx.measureText(trial).width <= maxWidth) {
      current = trial;
    } else {
      lines.push(current);
      current = next;
      if (lines.length >= maxLines - 1) break;
    }
  }
  if (current) lines.push(current);

  if (lines.length > maxLines) {
    lines.length = maxLines;
  }
  const lastIndex = lines.length - 1;
  if (lastIndex >= 0 && words.length) {
    let tail = `${lines[lastIndex]}...`;
    while (tail.length > 4 && ctx.measureText(tail).width > maxWidth) {
      tail = `${tail.slice(0, -4)}...`;
    }
    lines[lastIndex] = tail;
  }

  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + (index * lineHeight));
  });
  return startY + ((lines.length - 1) * lineHeight);
}

function canvasToPngBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 600);
}

function downloadCanvasPng(canvas, fileName) {
  if (!canvas || typeof canvas.toDataURL !== "function") return false;
  try {
    const dataUrl = canvas.toDataURL("image/png");
    if (!dataUrl) return false;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = fileName;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    return true;
  } catch (_) {
    return false;
  }
}

function openCanvasPngInNewTab(canvas, fileName, titleText = "FAITHSHIELD Era Card") {
  if (!canvas || typeof canvas.toDataURL !== "function") return false;
  try {
    const dataUrl = canvas.toDataURL("image/png");
    if (!dataUrl) return false;
    const popup = window.open("", "_blank", "noopener,noreferrer");
    if (!popup) return false;
    const safeTitle = String(titleText || "FAITHSHIELD Era Card")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const safeFileName = String(fileName || "faithshield-era-card.png")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    popup.document.write([
      "<!doctype html>",
      '<html lang="en"><head><meta charset="utf-8">',
      `<title>${safeTitle}</title>`,
      '<meta name="viewport" content="width=device-width,initial-scale=1">',
      '<style>',
      'body{margin:0;background:#0f1827;color:#f6e7c7;font-family:system-ui,-apple-system,Segoe UI,sans-serif;display:flex;flex-direction:column;align-items:center;gap:18px;padding:24px;}',
      'img{max-width:min(96vw,1280px);height:auto;border:2px solid rgba(229,184,93,.48);border-radius:18px;box-shadow:0 18px 60px rgba(0,0,0,.35);}',
      'a{display:inline-block;padding:12px 18px;border-radius:12px;background:#d9b56b;color:#1d1508;text-decoration:none;font-weight:700;}',
      'p{margin:0;opacity:.9;text-align:center;}',
      '</style></head><body>',
      `<a href="${dataUrl}" download="${safeFileName}">Save Era Card</a>`,
      `<p>${challengeCopy("Your browser opened the era card in a new tab. Use the button above if the download did not start automatically.", "Tu navegador abrio la tarjeta de era en una nueva pestana. Usa el boton de arriba si la descarga no comenzo automaticamente.")}</p>`,
      `<img src="${dataUrl}" alt="${safeTitle}">`,
      "</body></html>"
    ].join(""));
    popup.document.close();
    return true;
  } catch (_) {
    return false;
  }
}

async function exportBadgeCard(badge) {
  if (!badge) return false;
  const canvas = createBadgeShareCardCanvas(badge);
  if (!canvas) return false;

  const blob = await canvasToPngBlob(canvas);
  if (!blob) return false;

  const fileName = badgeCardFileName(badge);
  const file = typeof File !== "undefined"
    ? new File([blob], fileName, { type: "image/png" })
    : null;

  if (file && navigator.share && typeof navigator.canShare === "function") {
    try {
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${badge.name} • FAITHSHIELD`,
          text: badgeShareMessage(badge),
          files: [file]
        });
        return true;
      }
    } catch (_) {
      // Fall through to download.
    }
  }

  downloadBlob(blob, fileName);
  return true;
}

async function exportCurrentShareCard() {
  const badge = currentShareBadge();
  if (!badge) return;
  const done = await exportBadgeCard(badge);
  if (done && shareBadgeText) {
    shareBadgeText.textContent = `${badgeShareMessage(badge)} (${t("downloadCard")})`;
  }
}

function currentReflectionSharePayload() {
  ensureDailyDevotionState();
  const note = String(state.dailyDevotion.note || "").trim();
  if (!note) return null;
  const todayWord = dailyThoughtForToday();
  return {
    ref: todayWord && todayWord.ref ? todayWord.ref : "",
    thought: todayWord && todayWord.thought ? todayWord.thought : "",
    practical: todayWord && todayWord.practical ? todayWord.practical : "",
    note,
    player: state.playerName || "Faith Player",
    date: new Date().toLocaleDateString()
  };
}

function reflectionShareMessage(payload = currentReflectionSharePayload()) {
  if (!payload) return "";
  return [
    `${t("reflectionCardTitle")} • FAITHSHIELD`,
    payload.ref,
    payload.thought,
    `${challengeCopy("My reflection", "Mi reflexion")}: ${payload.note}`,
    `${challengeCopy("Practical action", "Accion practica")}: ${payload.practical}`
  ].filter(Boolean).join("\n");
}

function reflectionCardFileName(payload = currentReflectionSharePayload()) {
  const datePart = localDayKey().replace(/[^0-9-]/g, "") || "today";
  return `faithshield-reflection-${datePart}.png`;
}

function createReflectionShareCardCanvas(payload = currentReflectionSharePayload()) {
  if (!payload) return null;
  const width = 1080;
  const height = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#1f3047");
  bg.addColorStop(0.58, "#152637");
  bg.addColorStop(1, "#0f1827");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(width * 0.72, height * 0.18, 30, width * 0.72, height * 0.18, 360);
  glow.addColorStop(0, "rgba(220, 171, 82, 0.28)");
  glow.addColorStop(1, "rgba(220, 171, 82, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(228, 191, 120, 0.58)";
  ctx.lineWidth = 3;
  ctx.strokeRect(56, 56, width - 112, height - 112);

  ctx.fillStyle = "#d9b56b";
  ctx.font = "700 34px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("FAITHSHIELD", width / 2, 112);

  ctx.fillStyle = "#f5e8c9";
  ctx.font = "700 60px Georgia, 'Times New Roman', serif";
  ctx.fillText(t("reflectionCardTitle"), width / 2, 190);

  ctx.fillStyle = "#e8d3a3";
  ctx.font = "600 28px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText(payload.ref || "", width / 2, 242);

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(92, 290, width - 184, 210);
  ctx.strokeStyle = "rgba(228, 191, 120, 0.28)";
  ctx.strokeRect(92, 290, width - 184, 210);

  ctx.fillStyle = "#f0dfbd";
  ctx.font = "600 24px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(challengeCopy("Today's verse", "Versiculo de hoy"), 124, 336);
  ctx.fillStyle = "#f7edd9";
  ctx.font = "500 34px Georgia, 'Times New Roman', serif";
  drawWrappedCenterText(ctx, payload.thought, width / 2, 388, width - 320, 44, 3);

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(92, 550, width - 184, 250);
  ctx.strokeStyle = "rgba(228, 191, 120, 0.28)";
  ctx.strokeRect(92, 550, width - 184, 250);

  ctx.textAlign = "left";
  ctx.fillStyle = "#d9b56b";
  ctx.font = "600 24px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText(challengeCopy("My reflection", "Mi reflexion"), 124, 596);
  ctx.fillStyle = "#f4ead2";
  ctx.font = "500 34px system-ui, -apple-system, Segoe UI, sans-serif";
  drawWrappedCenterText(ctx, payload.note, width / 2, 650, width - 320, 46, 4);

  ctx.fillStyle = "#d9b56b";
  ctx.font = "600 22px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText(challengeCopy("Practical action", "Accion practica"), 124, 846);
  ctx.fillStyle = "#eadfca";
  ctx.font = "500 28px system-ui, -apple-system, Segoe UI, sans-serif";
  drawWrappedCenterText(ctx, payload.practical, width / 2, 892, width - 320, 38, 3);

  ctx.fillStyle = "rgba(255,255,255,0.76)";
  ctx.font = "500 24px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText(`${challengeCopy("Player", "Jugador")}: ${payload.player}`, 124, 994);
  ctx.textAlign = "right";
  ctx.fillText(payload.date, width - 124, 994);

  return canvas;
}

async function exportReflectionCard(payload = currentReflectionSharePayload()) {
  if (!payload) return false;
  const canvas = createReflectionShareCardCanvas(payload);
  if (!canvas) return false;

  const blob = await canvasToPngBlob(canvas);
  if (!blob) return false;

  const fileName = reflectionCardFileName(payload);
  const file = typeof File !== "undefined"
    ? new File([blob], fileName, { type: "image/png" })
    : null;

  if (file && navigator.share && typeof navigator.canShare === "function") {
    try {
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${t("reflectionCardTitle")} • FAITHSHIELD`,
          text: reflectionShareMessage(payload),
          files: [file]
        });
        return true;
      }
    } catch (_) {
      // Fall through to download.
    }
  }

  downloadBlob(blob, fileName);
  return true;
}

function emailCurrentReflection() {
  const payload = currentReflectionSharePayload();
  if (!payload) return;
  const subject = encodeURIComponent(t("reflectionEmailSubject"));
  const body = encodeURIComponent(reflectionShareMessage(payload));
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

async function exportCurrentReflectionCard() {
  const payload = currentReflectionSharePayload();
  if (!payload) return;
  const done = await exportReflectionCard(payload);
  if (done && exportDevotionReflectionCardBtn) {
    exportDevotionReflectionCardBtn.textContent = `${t("shareReflectionCard")} (${t("downloadCard")})`;
  }
}

function firstSourceEntry(sourceRef) {
  const first = normalizeSourceRef(sourceRef).split(";")[0] || "";
  return first.trim();
}

function masteryKeyFor(meta, activity) {
  const type = activity && activity.type
    ? activity.type
    : activity && activity.mode && activity.mode.engine
      ? activity.mode.engine
      : "general";
  const source = firstSourceEntry((activity && activity.sourceRef) || meta.theme.sourceRef || "");
  return `${meta.theme.era}|${meta.theme.name}|${type}|${source}`;
}

function masteryTopicFor(meta, activity) {
  const kind = activity && activity.type === "interactive" && activity.mode
    ? activity.mode.engine || "interactive"
    : activity && activity.type
      ? activity.type
      : "quiz";
  const source = firstSourceEntry((activity && activity.sourceRef) || meta.theme.sourceRef || "");
  const type = activity && activity.type === "interactive" && activity.mode
    ? activity.mode.label || kind || "interactive"
    : activity && activity.type
      ? activity.type
      : "quiz";
  return {
    era: meta.theme.era,
    theme: meta.theme.name,
    label: `${meta.theme.name} • ${type}`,
    source,
    kind
  };
}

function recordMasteryOutcome(meta, activity, wasCorrect) {
  if (!meta) return;
  const key = masteryKeyFor(meta, activity || {});
  const topic = masteryTopicFor(meta, activity || {});
  const existing = state.mastery[key] && typeof state.mastery[key] === "object" ? state.mastery[key] : {};
  const record = {
    era: topic.era,
    theme: topic.theme,
    label: topic.label,
    source: topic.source,
    kind: topic.kind,
    attempts: Math.max(0, Number(existing.attempts || 0)),
    correct: Math.max(0, Number(existing.correct || 0)),
    strength: Math.max(0, Math.min(100, Number(existing.strength || 50))),
    correctStreak: Math.max(0, Number(existing.correctStreak || 0)),
    wrongStreak: Math.max(0, Number(existing.wrongStreak || 0)),
    lastSeenDay: String(existing.lastSeenDay || ""),
    nextReviewDay: String(existing.nextReviewDay || "")
  };

  record.attempts += 1;
  record.lastSeenDay = localDayKey();

  if (wasCorrect) {
    record.correct += 1;
    record.correctStreak += 1;
    record.wrongStreak = 0;
    const gain = 8 + Math.min(6, record.correctStreak);
    record.strength = Math.min(100, record.strength + gain);
  } else {
    record.wrongStreak += 1;
    record.correctStreak = 0;
    const drop = 12 + Math.min(8, record.wrongStreak * 2);
    record.strength = Math.max(0, record.strength - drop);
  }

  const reviewDays = wasCorrect
    ? (record.strength >= 90 ? 7 : record.strength >= 75 ? 4 : record.strength >= 60 ? 2 : 1)
    : 0;
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + reviewDays);
  record.nextReviewDay = localDayKey(nextReview);

  state.mastery[key] = record;
}

function masteryEntries() {
  return Object.entries(state.mastery || {})
    .map(([key, value]) => ({ key, ...(value || {}) }))
    .filter((entry) => entry && entry.attempts > 0);
}

function weakestMasteryEntries(limit = 5) {
  return masteryEntries()
    .filter((entry) => Number(entry.strength || 0) < 70 || Number(entry.wrongStreak || 0) > 0)
    .sort((a, b) => {
      const strengthDiff = Number(a.strength || 0) - Number(b.strength || 0);
      if (strengthDiff !== 0) return strengthDiff;
      return Number(b.wrongStreak || 0) - Number(a.wrongStreak || 0);
    })
    .slice(0, Math.max(1, limit));
}

function reviewKindFromEntry(entry) {
  if (entry && entry.kind) return String(entry.kind);
  const parts = String(entry && entry.key || "").split("|");
  return parts[2] || "quiz";
}

function sourceRefIncludesReference(sourceRef, reference) {
  const target = referenceEntriesFromSourceRef(reference)[0];
  if (!target) return normalizeSourceRef(sourceRef).includes(normalizeSourceRef(reference));
  return parseSourceRefSegments(sourceRef).some((segment) => {
    if (segment.book !== target.book) return false;
    if (target.chapter < segment.startChapter || target.chapter > segment.endChapter) return false;
    if (target.chapter === segment.startChapter && target.verse < segment.startVerse) return false;
    if (target.chapter === segment.endChapter && target.verse > segment.endVerse) return false;
    return true;
  });
}

function itemMatchesReviewFocus(item, focus) {
  if (!focus) return true;
  if (focus.theme && item && item.sourceRef && focus.source) {
    return sourceRefIncludesReference(item.sourceRef, focus.source);
  }
  return true;
}

function clearReviewFocus(options = {}) {
  if (!state.reviewFocus) return;
  state.reviewFocus = null;
  if (!options.silent) persist();
}

function recommendedStageForReview(entry) {
  if (!entry) return null;
  const preferredKind = reviewKindFromEntry(entry);
  const themedStages = stages.filter((meta, index) => {
    if (meta.theme.name !== entry.theme) return false;
    if (meta.stage > 4) return false;
    return index + 1 <= state.unlocked;
  });
  if (!themedStages.length) return null;

  const scored = themedStages.map((meta) => {
    const plan = stageKindPlan(meta, currentDifficulty());
    const kindIndex = plan.indexOf(preferredKind);
    return {
      meta,
      score: kindIndex === -1 ? 99 : kindIndex
    };
  }).sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    return a.meta.stage - b.meta.stage;
  });

  return scored[0] ? scored[0].meta : themedStages[0];
}

function nextSmartReviewEntry(mode = "smart") {
  const due = reviewDueEntries(5);
  const weak = weakestMasteryEntries(5);
  const source = mode === "due"
    ? due
    : due.length
      ? due.concat(weak.filter((entry) => !due.some((dueEntry) => dueEntry.key === entry.key)))
      : weak;
  const filtered = source.filter((entry) => !["interactive", "timing", "pattern", "collect", "balance", "route", "discern", "slingshot"].includes(reviewKindFromEntry(entry)));
  return filtered[0] || source[0] || null;
}

function beginSmartReviewFromEntry(entry, mode = "smart") {
  if (!entry) return false;
  const targetStage = recommendedStageForReview(entry);
  if (!targetStage) return false;

  state.reviewFocus = {
    mode,
    era: entry.era,
    theme: entry.theme,
    source: entry.source,
    label: entry.label || entry.theme,
    kind: reviewKindFromEntry(entry),
    stageId: targetStage.id,
    day: localDayKey()
  };

  const cacheKey = `${state.difficulty}:${targetStage.id}`;
  delete state.stageActivities[cacheKey];
  persist();
  render();
  jumpToEra(entry.era);
  window.setTimeout(() => {
    focusStageCard(targetStage.id);
    openStage(targetStage.id);
  }, 180);
  return true;
}

function beginSmartReview(mode = "smart") {
  return beginSmartReviewFromEntry(nextSmartReviewEntry(mode), mode);
}

function recommendedDailyChallengeStage() {
  const unlockedStages = stages.filter((meta, index) => index + 1 <= state.unlocked);
  if (!unlockedStages.length) return null;

  const weeklyEra = state.weeklyChallenge && state.weeklyChallenge.era;
  const unfinishedWeekly = unlockedStages.find((meta) => meta.theme.era === weeklyEra && !isDone(meta.id));
  if (unfinishedWeekly) return unfinishedWeekly;

  const unfinished = unlockedStages.find((meta) => !isDone(meta.id));
  if (unfinished) return unfinished;

  return unlockedStages[0] || null;
}

function openDailyDevotionChallenge() {
  if (beginSmartReview("smart") || beginSmartReview("due")) {
    return true;
  }

  const targetStage = recommendedDailyChallengeStage();
  if (!targetStage) return false;

  persist();
  render();
  jumpToEra(targetStage.theme.era);
  window.setTimeout(() => {
    focusStageCard(targetStage.id);
    openStage(targetStage.id);
  }, 180);
  return true;
}

function activeReviewFocusForMeta(meta, kind = "") {
  const focus = state.reviewFocus;
  if (!focus || typeof focus !== "object") return null;
  if (focus.stageId && focus.stageId !== meta.id) return null;
  if (focus.era && focus.era !== meta.theme.era) return null;
  if (focus.theme && focus.theme !== meta.theme.name) return null;
  if (kind && focus.kind && focus.kind !== kind) return null;
  return focus;
}

function ensureBadgeActionButtons() {
  const badgeSection = document.querySelector(".badge-section");
  const badgeHead = badgeSection ? badgeSection.querySelector(".badge-head") : null;
  if (!badgeHead) return;

  replayLatestBadgeBtn = badgeHead.querySelector("#replayLatestBadgeBtn");
  if (!replayLatestBadgeBtn) {
    replayLatestBadgeBtn = document.createElement("button");
    replayLatestBadgeBtn.id = "replayLatestBadgeBtn";
    replayLatestBadgeBtn.className = "ghost-btn";
    replayLatestBadgeBtn.type = "button";
    badgeHead.appendChild(replayLatestBadgeBtn);
  }

  exportLatestBadgeCardBtn = badgeHead.querySelector("#exportLatestBadgeCardBtn");
  if (!exportLatestBadgeCardBtn) {
    exportLatestBadgeCardBtn = document.createElement("button");
    exportLatestBadgeCardBtn.id = "exportLatestBadgeCardBtn";
    exportLatestBadgeCardBtn.className = "ghost-btn";
    exportLatestBadgeCardBtn.type = "button";
    badgeHead.appendChild(exportLatestBadgeCardBtn);
  }

  replayLatestBadgeBtn.textContent = t("replayBadgeCeremony");
  exportLatestBadgeCardBtn.textContent = t("exportBadgeCard");

  replayLatestBadgeBtn.onclick = () => {
    replayLatestBadgeCelebration();
  };
  exportLatestBadgeCardBtn.onclick = () => {
    const badge = latestOwnedBadge();
    if (!badge) return;
    exportBadgeCard(badge);
  };
}

function ensureShareOverlayEnhancements() {
  if (!shareOverlay) return;
  const actions = shareOverlay.querySelector(".share-actions");
  if (!actions) return;

  exportBadgeCardBtn = actions.querySelector("#exportBadgeCardBtn");
  if (!exportBadgeCardBtn) {
    exportBadgeCardBtn = document.createElement("button");
    exportBadgeCardBtn.id = "exportBadgeCardBtn";
    exportBadgeCardBtn.className = "ghost-btn";
    exportBadgeCardBtn.type = "button";
    actions.appendChild(exportBadgeCardBtn);
  }

  exportBadgeCardBtn.textContent = t("downloadCard");
  exportBadgeCardBtn.onclick = () => {
    exportCurrentShareCard();
  };
}

function ensurePremiumHubStyles() {
  if (document.getElementById("premiumHubStyles")) return;
  const style = document.createElement("style");
  style.id = "premiumHubStyles";
  style.textContent = [
    ".premium-grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));}",
    ".premium-chip{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:rgba(229,184,93,.16);border:1px solid rgba(229,184,93,.28);font-weight:700;font-size:.92rem;}",
    ".profile-card,.hall-card,.calendar-day-card{padding:16px;border-radius:18px;border:1px solid rgba(229,184,93,.24);background:linear-gradient(180deg,rgba(20,28,44,.94),rgba(11,17,29,.96));box-shadow:0 18px 40px rgba(0,0,0,.18);}",
    ".profile-card.active{box-shadow:0 0 0 2px rgba(229,184,93,.45),0 22px 48px rgba(0,0,0,.24);}",
    ".profile-card-head{display:flex;align-items:center;gap:14px;margin-bottom:10px;}",
    ".profile-avatar{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.2rem;color:#0b1525;}",
    ".profile-meta p,.hall-card p,.calendar-day-card p{margin:0;}",
    ".profile-actions,.hall-actions,.feature-actions.wrap{display:flex;flex-wrap:wrap;gap:10px;}",
    ".hub-quick-nav{margin-top:16px;}",
    ".hub-quick-actions{display:flex;flex-wrap:wrap;gap:10px;}",
    ".hub-quick-actions .ghost-btn{min-width:160px;justify-content:center;}",
    ".shield-note{margin-top:0.16rem;font-size:.62rem;color:rgba(248,236,214,.72);font-weight:600;}",
    ".recap-indicator{position:fixed;top:14px;right:14px;display:flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:rgba(12,18,30,.92);border:1px solid rgba(229,184,93,.35);color:#f8ecd6;font-weight:700;font-size:.78rem;letter-spacing:.02em;opacity:0;transform:translateY(-6px);transition:opacity 220ms ease,transform 240ms ease;z-index:120;pointer-events:auto;cursor:pointer;}",
    ".recap-indicator.show{opacity:1;transform:translateY(0);}",
    ".recap-indicator .pulse{width:10px;height:10px;border-radius:50%;background:#e5b85d;box-shadow:0 0 0 rgba(229,184,93,.6);animation:recapPulse 1.2s infinite;}",
    ".recap-indicator .label{white-space:nowrap;}",
    "@keyframes recapPulse{0%{box-shadow:0 0 0 0 rgba(229,184,93,.6);}70%{box-shadow:0 0 0 8px rgba(229,184,93,0);}100%{box-shadow:0 0 0 0 rgba(229,184,93,0);}}",
    ".hall-badge-strip{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));}",
    ".hall-badge-pill{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:12px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(229,184,93,.16);min-height:108px;text-align:center;}",
    ".hall-badge-pill.locked{opacity:.38;filter:saturate(.4);}",
    ".hall-badge-pill .icon{font-size:1.75rem;}",
    ".hall-boss-grid,.hall-verse-grid,.hall-era-grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));}",
    ".hall-boss-card{position:relative;overflow:hidden;}",
    ".hall-boss-card::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at top right,rgba(229,184,93,.12),transparent 40%);pointer-events:none;}",
    ".hall-boss-title{font-size:1.04rem;font-weight:800;margin-bottom:6px;}",
    ".hall-mastery-meter{height:10px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:10px;}",
    ".hall-mastery-meter span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#e5b85d,#f8e6b0);}",
    ".calendar-grid{display:grid;gap:8px;grid-template-columns:repeat(7,minmax(0,1fr));}",
    ".calendar-weekday{font-size:.84rem;text-transform:uppercase;letter-spacing:.08em;color:rgba(248,238,214,.72);padding:0 0 4px 2px;}",
    ".calendar-day-card{min-height:112px;display:flex;flex-direction:column;justify-content:space-between;}",
    ".calendar-day-card.dim{opacity:.42;}",
    ".calendar-day-number{font-size:1.05rem;font-weight:800;}",
    ".calendar-day-state{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}",
    ".calendar-tag{font-size:.75rem;font-weight:700;padding:4px 8px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);}",
    ".calendar-tag.weekend{background:rgba(229,184,93,.14);border-color:rgba(229,184,93,.26);}",
    ".chapter-intro-banner{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 16px;padding:12px 14px;border-radius:16px;background:rgba(229,184,93,.1);border:1px solid rgba(229,184,93,.24);}",
    ".era-card-title{font-size:1rem;font-weight:800;margin-bottom:6px;}",
    ".era-card-status{margin-bottom:10px;}",
    ".era-preview-card{max-width:min(94vw,1020px)!important;}",
    ".era-preview-card img{display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(229,184,93,.26);box-shadow:0 18px 40px rgba(0,0,0,.22);margin:16px 0 18px;}",
    ".era-preview-card .share-actions{justify-content:center;}",
    "@media (max-width:760px){.calendar-grid{grid-template-columns:repeat(2,minmax(0,1fr));}.calendar-weekday{display:none;}.hub-quick-actions .ghost-btn{width:100%;}.recap-indicator{top:10px;right:10px;}}"
  ].join("");
  document.head.appendChild(style);
}

function ensureEraCardPreviewOverlay() {
  if (eraCardPreviewOverlay && eraCardPreviewOverlay.isConnected) return;
  if (!appRoot) return;

  eraCardPreviewOverlay = document.createElement("div");
  eraCardPreviewOverlay.id = "eraCardPreviewOverlay";
  eraCardPreviewOverlay.className = "welcome-overlay hidden";
  eraCardPreviewOverlay.setAttribute("aria-live", "polite");
  eraCardPreviewOverlay.setAttribute("role", "dialog");
  eraCardPreviewOverlay.setAttribute("aria-modal", "true");
  eraCardPreviewOverlay.innerHTML = [
    '<div class="welcome-card share-card era-preview-card">',
    `  <p class="eyebrow">${challengeCopy("Era Completion Card", "Tarjeta de finalizacion de era")}</p>`,
    '  <h2 id="eraCardPreviewTitle">FAITHSHIELD Era Card</h2>',
    `  <p id="eraCardPreviewText" class="meta">${challengeCopy("Preview your completion card, then save it from here.", "Previsualiza tu tarjeta de finalizacion y luego guardala desde aqui.")}</p>`,
    `  <img id="eraCardPreviewImage" alt="${challengeCopy("Era completion card preview", "Vista previa de la tarjeta de finalizacion de era")}">`,
    '  <div class="share-actions">',
    `    <a id="eraCardPreviewSaveBtn" class="cta-btn" href="#" download="faithshield-era-card.png">${challengeCopy("Save Era Card", "Guardar tarjeta")}</a>`,
    `    <button id="eraCardPreviewCopyBtn" class="ghost-btn" type="button">${challengeCopy("Copy Share Text", "Copiar texto")}</button>`,
    '  </div>',
    `  <button id="closeEraCardPreviewBtn" class="ghost-btn" type="button">${challengeCopy("Close", "Cerrar")}</button>`,
    '</div>'
  ].join("");

  appRoot.appendChild(eraCardPreviewOverlay);
  eraCardPreviewTitle = eraCardPreviewOverlay.querySelector("#eraCardPreviewTitle");
  eraCardPreviewText = eraCardPreviewOverlay.querySelector("#eraCardPreviewText");
  eraCardPreviewImage = eraCardPreviewOverlay.querySelector("#eraCardPreviewImage");
  eraCardPreviewSaveBtn = eraCardPreviewOverlay.querySelector("#eraCardPreviewSaveBtn");
  eraCardPreviewCopyBtn = eraCardPreviewOverlay.querySelector("#eraCardPreviewCopyBtn");
  closeEraCardPreviewBtn = eraCardPreviewOverlay.querySelector("#closeEraCardPreviewBtn");

  if (closeEraCardPreviewBtn) {
    closeEraCardPreviewBtn.onclick = () => closeEraCardPreview();
  }
  eraCardPreviewOverlay.addEventListener("click", (event) => {
    if (event.target === eraCardPreviewOverlay) closeEraCardPreview();
  });
}

function closeEraCardPreview() {
  if (!eraCardPreviewOverlay) return;
  eraCardPreviewOverlay.classList.add("hidden");
  updateOverlayLock();
}

function ensureShareTextOverlay() {
  if (shareTextOverlay && shareTextOverlay.isConnected) return;
  if (!appRoot) return;

  shareTextOverlay = document.createElement("div");
  shareTextOverlay.id = "shareTextOverlay";
  shareTextOverlay.className = "welcome-overlay hidden";
  shareTextOverlay.setAttribute("aria-live", "polite");
  shareTextOverlay.setAttribute("role", "dialog");
  shareTextOverlay.setAttribute("aria-modal", "true");
  shareTextOverlay.innerHTML = [
    '<div class="welcome-card share-card">',
    `  <p class="eyebrow">${challengeCopy("Share Text", "Texto para compartir")}</p>`,
    '  <h2 id="shareTextTitle">FAITHSHIELD Share</h2>',
    `  <p class="meta">${challengeCopy("Copy the text below to share.", "Copia el texto abajo para compartir.")}</p>`,
    '  <textarea id="shareTextArea" class="journal-input" rows="6" readonly></textarea>',
    '  <div class="share-actions">',
    `    <button id="shareTextCopyBtn" class="cta-btn" type="button">${challengeCopy("Copy Text", "Copiar texto")}</button>`,
    `    <button id="closeShareTextBtn" class="ghost-btn" type="button">${challengeCopy("Close", "Cerrar")}</button>`,
    '  </div>',
    '</div>'
  ].join("");

  appRoot.appendChild(shareTextOverlay);
  shareTextTitle = shareTextOverlay.querySelector("#shareTextTitle");
  shareTextArea = shareTextOverlay.querySelector("#shareTextArea");
  shareTextCopyBtn = shareTextOverlay.querySelector("#shareTextCopyBtn");
  shareTextCloseBtn = shareTextOverlay.querySelector("#closeShareTextBtn");

  if (shareTextCloseBtn) {
    shareTextCloseBtn.onclick = () => closeShareTextOverlay();
  }
  shareTextOverlay.addEventListener("click", (event) => {
    if (event.target === shareTextOverlay) closeShareTextOverlay();
  });
}

function closeShareTextOverlay() {
  if (!shareTextOverlay) return;
  shareTextOverlay.classList.add("hidden");
  updateOverlayLock();
}

function ensureRecapIndicator() {
  if (recapIndicator && recapIndicator.isConnected) return;
  if (!document.body) return;
  recapIndicator = document.createElement("div");
  recapIndicator.id = "recapIndicator";
  recapIndicator.className = "recap-indicator";
  recapIndicator.setAttribute("role", "button");
  recapIndicator.setAttribute("tabindex", "0");
  recapIndicator.setAttribute("aria-label", challengeCopy("Replay greeting and badge recap", "Reproducir saludo y resumen de insignias"));
  recapIndicator.innerHTML = [
    '<span class="pulse"></span>',
    `<span class="label">${challengeCopy("Recap + Badges", "Resumen + insignias")}</span>`
  ].join("");
  document.body.appendChild(recapIndicator);
  recapIndicatorLabel = recapIndicator.querySelector(".label");
  recapIndicator.addEventListener("click", () => playStoryRecapNow());
  recapIndicator.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      playStoryRecapNow();
    }
  });
}

function setRecapIndicator(active, label = "") {
  ensureRecapIndicator();
  if (!recapIndicator) return;
  if (recapIndicatorLabel) {
    recapIndicatorLabel.textContent = label || challengeCopy("Recap + Badges", "Resumen + insignias");
  }
  recapIndicator.classList.toggle("show", Boolean(active));
}

function openShareTextOverlay(title, text) {
  ensureShareTextOverlay();
  if (!shareTextOverlay || !shareTextArea) return false;
  const message = String(text || "").trim();
  if (!message) return false;
  if (shareTextTitle) shareTextTitle.textContent = String(title || "FAITHSHIELD Share");
  shareTextArea.value = message;
  if (shareTextCopyBtn) {
    shareTextCopyBtn.onclick = () => {
      const attemptCopy = () => {
        try {
          shareTextArea.focus();
          shareTextArea.select();
        } catch (_) {
          // Ignore selection issues.
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message).then(() => {
          showFeatureMoment(
            challengeCopy("Share text copied", "Texto copiado"),
            challengeCopy("You can now paste it anywhere.", "Ahora puedes pegarlo donde quieras."),
            { icon: "✅", durationMs: 1600 }
          );
        }).catch(() => {
          attemptCopy();
        });
      } else {
        attemptCopy();
      }
    };
  }
  shareTextOverlay.classList.remove("hidden");
  if (shareTextOverlay.scrollTo) shareTextOverlay.scrollTo({ top: 0, behavior: "auto" });
  updateOverlayLock();
  return true;
}

function openEraCardPreview(era) {
  ensureEraCardPreviewOverlay();
  if (!eraCardPreviewOverlay || !eraCardPreviewImage || !eraCardPreviewSaveBtn) return false;
  const canvas = createEraCompletionShareCardCanvas(era);
  if (!canvas) return false;
  let dataUrl = "";
  try {
    dataUrl = canvas.toDataURL("image/png");
  } catch (_) {
    return false;
  }
  if (!dataUrl) return false;
  const label = formatEraLabel(era);
  const fileName = `faithshield-${normalizeFileSlug(era, "era")}-completion-card.png`;
  if (eraCardPreviewTitle) {
    eraCardPreviewTitle.textContent = `${label} ${challengeCopy("Completion Card", "tarjeta de finalizacion")}`;
  }
  if (eraCardPreviewText) {
    eraCardPreviewText.textContent = challengeCopy(
      "Your era card is ready. Save it here or copy the share text below.",
      "Tu tarjeta de era esta lista. Guardala aqui o copia el texto para compartir abajo."
    );
  }
  eraCardPreviewImage.src = dataUrl;
  eraCardPreviewImage.alt = `${label} ${challengeCopy("completion card", "tarjeta de finalizacion")}`;
  eraCardPreviewSaveBtn.href = dataUrl;
  eraCardPreviewSaveBtn.download = fileName;
  if (eraCardPreviewCopyBtn) {
    eraCardPreviewCopyBtn.onclick = () => copyTextToClipboardOrPrompt(eraCompletionShareText(era));
  }
  eraCardPreviewOverlay.classList.remove("hidden");
  if (eraCardPreviewOverlay.scrollTo) eraCardPreviewOverlay.scrollTo({ top: 0, behavior: "auto" });
  updateOverlayLock();
  return true;
}

function profileDisplayInitials(profile) {
  const text = String((profile && profile.name) || "").trim();
  if (!text) return "FS";
  const parts = text.split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "FS";
}

function uniqueProfileId(name = "profile") {
  return `${normalizeFileSlug(name || "profile", "profile")}-${Date.now().toString(36)}`;
}

function switchToProfile(profileId) {
  if (!profileId || profileId === activeProfileId) return;
  writeStoredProfileSnapshot(activeProfileId, captureStateSnapshot());
  activeProfileId = profileId;
  localStorage.setItem(PROFILE_ACTIVE_KEY, activeProfileId);
  const snapshot = readStoredProfileSnapshot(activeProfileId) || defaultStateSnapshot();
  writeLegacySnapshotToStorage(snapshot);
  window.location.reload();
}

function createFreshProfile() {
  if (profileIndex.length >= PROFILE_LIMIT) {
    window.alert(challengeCopy(`You can keep up to ${PROFILE_LIMIT} profiles in Family/Classroom mode.`, `Puedes guardar hasta ${PROFILE_LIMIT} perfiles en el modo familia/clase.`));
    return;
  }
  const input = window.prompt(challengeCopy("Name this new profile:", "Nombra este nuevo perfil:"), "");
  const name = normalizePlayerName(input || "");
  if (!name) return;
  const profile = normalizeProfileMeta({
    id: uniqueProfileId(name),
    name,
    accent: PROFILE_COLOR_SWATCHES[profileIndex.length % PROFILE_COLOR_SWATCHES.length],
    createdAt: localDayKey(),
    updatedAt: localDayKey()
  }, profileIndex.length);
  profileIndex.push(profile);
  saveProfileIndex(profileIndex);
  const snapshot = defaultStateSnapshot(name);
  snapshot.audio = deepClone(state.audio);
  snapshot.language = state.language;
  snapshot.controls = deepClone(state.controls);
  writeStoredProfileSnapshot(profile.id, snapshot);
  switchToProfile(profile.id);
}

function exportCurrentProfileSyncCode() {
  const payload = {
    app: "FAITHSHIELD",
    version: 1,
    exportedAt: new Date().toISOString(),
    profile: activeProfileMeta() || normalizeProfileMeta({ id: activeProfileId, name: state.playerName || "Faith Player" }),
    snapshot: captureStateSnapshot()
  };
  const json = JSON.stringify(payload);
  const code = btoa(unescape(encodeURIComponent(json)));
  copyTextToClipboardOrPrompt(code, () => {
    window.alert(challengeCopy("Sync code copied. Paste it on another device to import this profile.", "Codigo de sincronizacion copiado. Pegalo en otro dispositivo para importar este perfil."));
  });
}

function importProfileFromSyncCode() {
  const code = window.prompt(challengeCopy("Paste a FAITHSHIELD sync code:", "Pega un codigo de sincronizacion de FAITHSHIELD:"), "");
  if (!code) return;
  let payload = null;
  try {
    payload = JSON.parse(decodeURIComponent(escape(atob(String(code).trim()))));
  } catch (_) {
    window.alert(challengeCopy("That sync code could not be read.", "No se pudo leer ese codigo de sincronizacion."));
    return;
  }
  if (!payload || payload.app !== "FAITHSHIELD" || !payload.snapshot) {
    window.alert(challengeCopy("That sync code is not valid for FAITHSHIELD.", "Ese codigo de sincronizacion no es valido para FAITHSHIELD."));
    return;
  }
  const incomingProfile = normalizeProfileMeta({
    ...(payload.profile || {}),
    id: uniqueProfileId((payload.profile && payload.profile.name) || "imported-profile"),
    updatedAt: localDayKey()
  }, profileIndex.length);
  profileIndex.push(incomingProfile);
  profileIndex = profileIndex.slice(0, PROFILE_LIMIT);
  saveProfileIndex(profileIndex);
  writeStoredProfileSnapshot(incomingProfile.id, payload.snapshot);
  switchToProfile(incomingProfile.id);
}

function hallBossEntries() {
  return eraOrderList()
    .map((era) => {
      const bossStage = stages.filter((meta) => meta.theme.era === era && isEraBossStage(meta)).slice(-1)[0] || null;
      if (!bossStage) return null;
      const bossMode = bossModeForStage(bossStage, currentDifficulty());
      const profile = bossVisualProfile(era, bossMode);
      return {
        era,
        bossStage,
        profile,
        defeated: state.completed.includes(bossStage.id)
      };
    })
    .filter(Boolean);
}

function isEraComplete(era) {
  const eraStages = stages.filter((meta) => meta.theme.era === era);
  return Boolean(eraStages.length) && eraStages.every((meta) => state.completed.includes(meta.id));
}

function masteredVerseEntries(limit = 9) {
  return masteryEntries()
    .filter((entry) => Number(entry.strength || 0) >= MASTERY_TARGET_PERCENT && entry.source)
    .sort((a, b) => Number(b.strength || 0) - Number(a.strength || 0))
    .slice(0, Math.max(1, limit));
}

function eraCompletionShareText(era) {
  const label = formatEraLabel(era);
  const stagesDone = stages.filter((meta) => meta.theme.era === era && state.completed.includes(meta.id)).length;
  const total = stages.filter((meta) => meta.theme.era === era).length;
  const bossEntry = hallBossEntries().find((entry) => entry.era === era);
  const bossLine = bossEntry && bossEntry.defeated
    ? `${bossEntry.profile.displayName} was defeated in the final battle.`
    : "The final boss still stands.";
  return `FAITHSHIELD - ${label} complete. I cleared ${stagesDone}/${total} stages, mastered key verses, and ${bossLine}`;
}

function createEraCompletionShareCardCanvas(era) {
  const width = 1280;
  const height = 720;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#17233f");
  bg.addColorStop(0.55, "#101a2f");
  bg.addColorStop(1, "#081220");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(229, 184, 93, 0.12)";
  ctx.fillRect(72, 72, width - 144, height - 144);
  ctx.strokeStyle = "rgba(229, 184, 93, 0.45)";
  ctx.lineWidth = 4;
  ctx.strokeRect(72, 72, width - 144, height - 144);

  const label = formatEraLabel(era);
  const bossEntry = hallBossEntries().find((entry) => entry.era === era);
  const masteryCount = masteredVerseEntries(30).filter((entry) => entry.era === era).length;

  ctx.fillStyle = "#f8ecd6";
  ctx.font = "700 26px Georgia";
  ctx.fillText("FAITHSHIELD ERA COMPLETE", 120, 150);
  ctx.font = "700 62px Georgia";
  ctx.fillText(label, 120, 240);
  ctx.font = "400 30px Georgia";
  ctx.fillStyle = "#ead6b0";
  ctx.fillText(`Player: ${displayPlayerName()}`, 120, 302);
  ctx.fillText(`Stages Cleared: ${stages.filter((meta) => meta.theme.era === era && state.completed.includes(meta.id)).length}/${stages.filter((meta) => meta.theme.era === era).length}`, 120, 350);
  ctx.fillText(`Boss Defeated: ${bossEntry ? bossEntry.profile.displayName : "Era Guardian"}`, 120, 398);
  ctx.fillText(`Verses Mastered In Era: ${masteryCount}`, 120, 446);
  ctx.fillText(new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }), 120, 530);

  ctx.fillStyle = "#e5b85d";
  ctx.font = "700 118px Georgia";
  ctx.fillText("✦", width - 240, 220);
  ctx.font = "700 40px Georgia";
  ctx.fillText(isEraComplete(era) ? "Shield Secured" : "Journey In Progress", width - 370, 310);

  ctx.fillStyle = "#f8ecd6";
  ctx.font = "400 28px Georgia";
  wrapCanvasText(ctx, eraCompletionShareText(era), 120, 600, width - 240, 40);

  return canvas;
}

async function exportEraCompletionCard(era) {
  const canvas = createEraCompletionShareCardCanvas(era);
  if (!canvas) return false;
  const fileName = `faithshield-${normalizeFileSlug(era, "era")}-completion-card.png`;
  if (downloadCanvasPng(canvas, fileName)) {
    return true;
  }
  if (openCanvasPngInNewTab(canvas, fileName, `${formatEraLabel(era)} • FAITHSHIELD`)) {
    return true;
  }
  const blob = await canvasToPngBlob(canvas);
  if (blob) {
    const file = typeof File !== "undefined"
      ? new File([blob], fileName, { type: "image/png" })
      : null;

    if (file && navigator.share && typeof navigator.canShare === "function") {
      try {
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${formatEraLabel(era)} • FAITHSHIELD`,
            text: eraCompletionShareText(era),
            files: [file]
          });
          return true;
        }
      } catch (_) {
        // Fall through to direct download.
      }
    }

    try {
      downloadBlob(blob, fileName);
      return true;
    } catch (_) {
      // Fall through to data URL download below.
    }
  }

  return downloadCanvasPng(canvas, fileName);
}

function renderProfilesSection() {
  if (profileSection && profileSection.isConnected) {
    profileSection.remove();
  }
  profileSection = null;
  profileSummary = null;
  profileGrid = null;
  addProfileBtn = null;
  exportSyncCodeBtn = null;
  importSyncCodeBtn = null;
}

function renderHallOfFaith() {
  ensureExperienceSections();
  ensureEraCardPreviewOverlay();
  if (!hallOfFaithSection) return;
  const bosses = hallBossEntries();
  const defeatedCount = bosses.filter((entry) => entry.defeated).length;
  const mastered = masteredVerseEntries(12);
  if (hallOfFaithSummary) {
    hallOfFaithSummary.textContent = `${defeatedCount}/${bosses.length} bosses defeated • ${state.badges.length}/${MAX_BADGES} badges earned • ${mastered.length} mastered verses ready`;
  }
  if (hallBossGrid) {
    hallBossGrid.innerHTML = "";
    bosses.forEach((entry) => {
      const card = document.createElement("article");
      card.className = "hall-card hall-boss-card";
      card.innerHTML = [
        `<p class="premium-chip">${entry.defeated ? "Boss Defeated" : "Boss Waiting"}</p>`,
        `<p class="hall-boss-title" style="margin-top:14px;">${entry.profile.displayName}</p>`,
        `<p class="meta">${formatEraLabel(entry.era)} • ${entry.profile.title}</p>`,
        `<p style="margin-top:12px;">${entry.profile.weaknessCopy}</p>`
      ].join("");
      hallBossGrid.appendChild(card);
    });
  }
  if (hallBadgeStrip) {
    hallBadgeStrip.innerHTML = "";
    badgeCatalog.slice(0, Math.max(MAX_BADGES, badgeCatalog.length)).forEach((badge) => {
      const earned = state.badges.includes(badge.id);
      const pill = document.createElement("div");
      pill.className = `hall-badge-pill ${earned ? "" : "locked"}`.trim();
      pill.innerHTML = [
        `<span class="icon">${badge.icon || "🛡️"}</span>`,
        `<span>${badge.name}</span>`,
        `<span class="meta">${earned ? challengeCopy("Unlocked", "Desbloqueado") : challengeCopy("Locked", "Bloqueado")}</span>`
      ].join("");
      hallBadgeStrip.appendChild(pill);
    });
  }
  if (hallVerseGrid) {
    hallVerseGrid.innerHTML = "";
    mastered.forEach((entry) => {
      const card = document.createElement("article");
      card.className = "hall-card";
      card.innerHTML = [
        `<p class="hall-boss-title">${entry.theme}</p>`,
        `<p class="meta">${entry.source}</p>`,
        `<div class="hall-mastery-meter"><span style="width:${Math.max(8, Math.round(Number(entry.strength || 0)))}%"></span></div>`,
        `<p class="meta" style="margin-top:10px;">Mastery strength: ${Math.round(Number(entry.strength || 0))}%</p>`
      ].join("");
      hallVerseGrid.appendChild(card);
    });
  }
  if (hallEraGrid) {
    hallEraGrid.innerHTML = "";
    eraOrderList().forEach((era) => {
      const card = document.createElement("article");
      card.className = "hall-card";
      const complete = isEraComplete(era);
      card.innerHTML = [
        `<p class="era-card-title">${formatEraLabel(era)}</p>`,
        `<p class="meta era-card-status">${complete ? challengeCopy("All stages complete. Share this era card.", "Todas las etapas completas. Comparte esta tarjeta.") : challengeCopy("Still in progress. Finish the era to unlock the share card.", "Aun en progreso. Termina la era para desbloquear la tarjeta.")}</p>`,
        '<div class="hall-actions"></div>'
      ].join("");
      const actions = card.querySelector(".hall-actions");
      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "ghost-btn";
      copyBtn.disabled = false;
      copyBtn.textContent = challengeCopy("Copy Share Text", "Copiar texto");
      copyBtn.onclick = () => {
        if (!complete) {
          showFeatureMoment(
            challengeCopy("Era not finished yet", "Era aun no completada"),
            challengeCopy("Finish every stage in this era to unlock the share text.", "Completa cada etapa de esta era para desbloquear el texto."),
            { icon: "🔒", sfx: null, durationMs: 2200 }
          );
          return;
        }
        copyTextToClipboardOrPrompt(eraCompletionShareText(era), () => {
          showFeatureMoment(
            challengeCopy("Share text ready", "Texto listo"),
            challengeCopy("You can now paste it into email or social.", "Ahora puedes pegarlo en correo o redes."),
            { icon: "✅", durationMs: 1600 }
          );
        });
      };
      actions.appendChild(copyBtn);
      const cardBtn = document.createElement("button");
      cardBtn.type = "button";
      cardBtn.className = complete ? "cta-btn" : "ghost-btn";
      cardBtn.disabled = false;
      cardBtn.textContent = challengeCopy("Open Era Card", "Abrir tarjeta");
      cardBtn.onclick = async () => {
        if (!complete) {
          showFeatureMoment(
            challengeCopy("Era not finished yet", "Era aun no completada"),
            challengeCopy("Finish every stage in this era to unlock the era card.", "Completa cada etapa de esta era para desbloquear la tarjeta."),
            { icon: "🔒", sfx: null, durationMs: 2200 }
          );
          return;
        }
        const done = openEraCardPreview(era);
        if (done) {
          showFeatureMoment(
            challengeCopy("Era card opened", "Tarjeta de era abierta"),
            challengeCopy("Preview the card and save it from the overlay.", "Previsualiza la tarjeta y guardala desde la ventana."),
            { icon: "🛡️", durationMs: 1800 }
          );
          return;
        }
        openShareTextOverlay(
          challengeCopy("Era share text", "Texto de era"),
          eraCompletionShareText(era)
        );
        showFeatureMoment(
          challengeCopy("Era card unavailable", "Tarjeta de era no disponible"),
          challengeCopy("The preview could not be opened. Try again, or check whether your browser is blocking canvas images.", "No se pudo abrir la vista previa. Intentalo otra vez o revisa si tu navegador esta bloqueando imagenes de canvas."),
          { icon: "⚠️", sfx: null, durationMs: 2600 }
        );
      };
      actions.appendChild(cardBtn);
      hallEraGrid.appendChild(card);
    });
  }
}

function renderDailyChallengeCalendar() {
  ensureExperienceSections();
  if (!dailyCalendarSection || !dailyCalendarGrid || !dailyCalendarSummary || !dailyCalendarEvent) return;
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthName = monthStart.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const firstCell = new Date(monthStart);
  firstCell.setDate(firstCell.getDate() - firstCell.getDay());
  const entries = state.dailyCalendar || {};
  const activeDays = Object.values(entries).filter((entry) => entry && (entry.challenge || entry.devotion || entry.reward)).length;
  dailyCalendarSummary.textContent = `${monthName} • ${activeDays} active day${activeDays === 1 ? "" : "s"} tracked • Faith day streak: ${state.dailyStrike.count}`;
  const event = weekendEventForDate(today);
  dailyCalendarEvent.textContent = event
    ? `${event.name} • ${event.description}`
    : challengeCopy("Weekday focus: one faithful challenge at a time.", "Enfoque entre semana: un desafio fiel a la vez.");

  dailyCalendarGrid.innerHTML = "";
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((label) => {
    const head = document.createElement("div");
    head.className = "calendar-weekday";
    head.textContent = label;
    dailyCalendarGrid.appendChild(head);
  });

  for (let offset = 0; offset < 35; offset += 1) {
    const date = new Date(firstCell);
    date.setDate(firstCell.getDate() + offset);
    const dayKey = localDayKey(date);
    const entry = entries[dayKey] || null;
    const card = document.createElement("article");
    card.className = `calendar-day-card ${date.getMonth() === today.getMonth() ? "" : "dim"}`.trim();
    const tags = [];
    if (entry && entry.challenge) tags.push('<span class="calendar-tag">Challenge</span>');
    if (entry && entry.reflection) tags.push('<span class="calendar-tag">Reflection</span>');
    if (entry && entry.weekendRewardClaimed) tags.push('<span class="calendar-tag weekend">Weekend Bonus</span>');
    if (!tags.length) tags.push(`<span class="calendar-tag ${date.getDay() === 0 || date.getDay() === 6 ? "weekend" : ""}">${date.getDay() === 0 || date.getDay() === 6 ? "Weekend" : "Open"}</span>`);
    card.innerHTML = [
      `<p class="calendar-day-number">${date.getDate()}</p>`,
      `<p class="meta">${entry && entry.era ? formatEraLabel(entry.era) : "&nbsp;"}</p>`,
      `<div class="calendar-day-state">${tags.join("")}</div>`
    ].join("");
    dailyCalendarGrid.appendChild(card);
  }
}

function ensureExperienceSections() {
  if (!appRoot) return;

  const storySection = storyPathHeading ? storyPathHeading.closest("section") : null;
  const progressSection = gameDashboard ? gameDashboard.closest("section") : null;
  const dailyWordCard = document.querySelector(".daily-word-card");
  const badgeSection = document.querySelector(".badge-section");
  const postStoryAnchor = badgeSection && badgeSection.parentNode ? badgeSection : null;

  ensureBadgeActionButtons();
  ensureShareOverlayEnhancements();
  ensurePremiumHubStyles();

  if (profileSection && profileSection.isConnected) {
    profileSection.remove();
  }
  profileSection = null;
  profileSummary = null;
  profileGrid = null;
  addProfileBtn = null;
  exportSyncCodeBtn = null;
  importSyncCodeBtn = null;

  if (!hallOfFaithSection || !hallOfFaithSection.isConnected) {
    hallOfFaithSection = document.getElementById("hallOfFaithSection");
    if (!hallOfFaithSection) {
      hallOfFaithSection = document.createElement("section");
      hallOfFaithSection.id = "hallOfFaithSection";
      hallOfFaithSection.className = "feature-card";
      hallOfFaithSection.innerHTML = [
        '<div class="feature-head">',
        '  <h2>Hall of Faith</h2>',
        '  <p id="hallOfFaithSummary" class="meta">Bosses, badges, and verses</p>',
        '</div>',
        '<div class="feature-head"><h3>Bosses Defeated</h3></div>',
        '<div id="hallBossGrid" class="hall-boss-grid"></div>',
        '<div class="feature-head" style="margin-top:18px;"><h3>Badges Earned</h3></div>',
        '<div id="hallBadgeStrip" class="hall-badge-strip"></div>',
        '<div class="feature-head" style="margin-top:18px;"><h3>Verses Mastered</h3></div>',
        '<div id="hallVerseGrid" class="hall-verse-grid"></div>',
        '<div class="feature-head" style="margin-top:18px;"><h3>Era Completion Cards</h3></div>',
        '<div id="hallEraGrid" class="hall-era-grid"></div>'
      ].join("");
      if (postStoryAnchor) {
        postStoryAnchor.parentNode.insertBefore(hallOfFaithSection, postStoryAnchor);
      } else if (storySection && storySection.parentNode) {
        storySection.parentNode.insertBefore(hallOfFaithSection, storySection);
      } else {
        appRoot.appendChild(hallOfFaithSection);
      }
    }
    hallOfFaithSummary = hallOfFaithSection.querySelector("#hallOfFaithSummary");
    hallBossGrid = hallOfFaithSection.querySelector("#hallBossGrid");
    hallBadgeStrip = hallOfFaithSection.querySelector("#hallBadgeStrip");
    hallVerseGrid = hallOfFaithSection.querySelector("#hallVerseGrid");
    hallEraGrid = hallOfFaithSection.querySelector("#hallEraGrid");
  }

  if (!dailyCalendarSection || !dailyCalendarSection.isConnected) {
    dailyCalendarSection = document.getElementById("dailyCalendarSection");
    if (!dailyCalendarSection) {
      dailyCalendarSection = document.createElement("section");
      dailyCalendarSection.id = "dailyCalendarSection";
      dailyCalendarSection.className = "feature-card";
      dailyCalendarSection.innerHTML = [
        '<div class="feature-head">',
        '  <h2>Daily Challenge Calendar</h2>',
        '  <p id="dailyCalendarSummary" class="meta">Track daily faithfulness</p>',
        '</div>',
        '<p id="dailyCalendarEvent" class="premium-chip"></p>',
        '<div id="dailyCalendarGrid" class="calendar-grid" style="margin-top:16px;"></div>'
      ].join("");
      if (postStoryAnchor) {
        postStoryAnchor.parentNode.insertBefore(dailyCalendarSection, postStoryAnchor);
      } else if (storySection && storySection.parentNode) {
        storySection.parentNode.insertBefore(dailyCalendarSection, storySection);
      } else {
        appRoot.appendChild(dailyCalendarSection);
      }
    }
    dailyCalendarSummary = dailyCalendarSection.querySelector("#dailyCalendarSummary");
    dailyCalendarEvent = dailyCalendarSection.querySelector("#dailyCalendarEvent");
    dailyCalendarGrid = dailyCalendarSection.querySelector("#dailyCalendarGrid");
  }

  if (!campaignMapSection || !campaignMapSection.isConnected) {
    campaignMapSection = document.getElementById("campaignMapSection");
    if (!campaignMapSection) {
      campaignMapSection = document.createElement("section");
      campaignMapSection.id = "campaignMapSection";
      campaignMapSection.className = "feature-card campaign-map-card";
      campaignMapSection.innerHTML = [
        '<div class="feature-head">',
        '  <h2>Chapter Campaign Map</h2>',
        '  <p id="campaignMapSummary" class="meta">Journey progress</p>',
        '</div>',
        '<p class="meta">Chapter intros, boss stages, and a clear finish line.</p>',
        '<div id="campaignMapTrack" class="campaign-map-track"></div>',
        '<p id="campaignMapFinish" class="meta"></p>'
      ].join("");
      if (postStoryAnchor) {
        postStoryAnchor.parentNode.insertBefore(campaignMapSection, postStoryAnchor);
      } else if (storySection && storySection.parentNode) {
        storySection.parentNode.insertBefore(campaignMapSection, storySection.nextSibling);
      } else {
        appRoot.appendChild(campaignMapSection);
      }
    }
    campaignMapTrack = campaignMapSection.querySelector("#campaignMapTrack");
    campaignMapSummary = campaignMapSection.querySelector("#campaignMapSummary");
    campaignMapFinish = campaignMapSection.querySelector("#campaignMapFinish");
  }

  if (!masterySection || !masterySection.isConnected) {
    masterySection = document.getElementById("masterySection");
    if (!masterySection) {
      masterySection = document.createElement("section");
      masterySection.id = "masterySection";
      masterySection.className = "feature-card mastery-card";
      masterySection.innerHTML = [
        '<div class="feature-head">',
        '  <h2>Mastery Strength</h2>',
        '  <p id="masteryOverall" class="meta">Learning strength: 0%</p>',
        '</div>',
        '<div id="masteryBars" class="mastery-bars"></div>',
        '<div class="feature-head">',
        '  <h3>Weak Areas To Revisit</h3>',
        '  <div class="feature-actions">',
        '    <button id="startSmartReviewBtn" class="ghost-btn" type="button">Start Smart Review</button>',
        '    <button id="reviewDueTodayBtn" class="ghost-btn" type="button">Review Due Today</button>',
        '    <button id="focusWeakBtn" class="ghost-btn" type="button">Focus Weak Area</button>',
        '  </div>',
        '</div>',
        '<div id="weakAreaList" class="weak-area-list"></div>'
      ].join("");
      if (postStoryAnchor) {
        postStoryAnchor.parentNode.insertBefore(masterySection, postStoryAnchor);
      } else if (storySection && storySection.parentNode) {
        storySection.parentNode.insertBefore(masterySection, storySection.nextSibling);
      } else {
        appRoot.appendChild(masterySection);
      }
    }
    masteryOverall = masterySection.querySelector("#masteryOverall");
    masteryBars = masterySection.querySelector("#masteryBars");
    weakAreaList = masterySection.querySelector("#weakAreaList");
    startSmartReviewBtn = masterySection.querySelector("#startSmartReviewBtn");
    reviewDueTodayBtn = masterySection.querySelector("#reviewDueTodayBtn");
    focusWeakBtn = masterySection.querySelector("#focusWeakBtn");
    if (startSmartReviewBtn) {
      startSmartReviewBtn.onclick = () => {
        beginSmartReview("smart");
      };
    }
    if (reviewDueTodayBtn) {
      reviewDueTodayBtn.onclick = () => {
        beginSmartReview("due");
      };
    }
    if (focusWeakBtn) {
      focusWeakBtn.onclick = () => {
        const weak = weakestMasteryEntries(1)[0];
        if (weak) beginSmartReview("weak");
      };
    }
  }

  if (!dailyDevotionSection || !dailyDevotionSection.isConnected) {
    dailyDevotionSection = document.getElementById("dailyDevotionSection");
    if (!dailyDevotionSection) {
      dailyDevotionSection = document.createElement("section");
      dailyDevotionSection.id = "dailyDevotionSection";
      dailyDevotionSection.className = "feature-card devotion-card";
      dailyDevotionSection.innerHTML = [
        '<div class="feature-head">',
        '  <h2>Daily Devotion Quest</h2>',
        '  <p id="dailyDevotionStatus" class="meta">0/3 completed</p>',
        '</div>',
        '<p id="dailyDevotionPrompt" class="meta"></p>',
        '<p id="dailyDevotionAction" class="meta"></p>',
        '<textarea id="dailyDevotionReflection" class="journal-input" rows="3" placeholder="One short reflection for today"></textarea>',
        '<div class="feature-actions">',
        `  <button id="playStoryRecapBtn" class="ghost-btn" type="button">${challengeCopy("Play Welcome Recap", "Reproducir resumen de bienvenida")}</button>`,
        '  <button id="completeDevotionChallengeBtn" class="ghost-btn" type="button">Complete Daily Challenge</button>',
        '  <button id="completeDevotionActionBtn" class="ghost-btn" type="button">Complete Practical Action</button>',
        '  <button id="saveDevotionReflectionBtn" class="ghost-btn" type="button">Save Reflection</button>',
        '  <button id="emailDevotionReflectionBtn" class="ghost-btn" type="button">Email Reflection</button>',
        '  <button id="exportDevotionReflectionCardBtn" class="ghost-btn" type="button">Share Reflection Card</button>',
        '  <button id="claimDevotionRewardBtn" class="cta-btn" type="button">Claim Reward</button>',
        '</div>'
      ].join("");
      if (postStoryAnchor) {
        postStoryAnchor.parentNode.insertBefore(dailyDevotionSection, postStoryAnchor);
      } else if (dailyWordCard && dailyWordCard.parentNode) {
        dailyWordCard.parentNode.insertBefore(dailyDevotionSection, dailyWordCard.nextSibling);
      } else if (progressSection && progressSection.parentNode) {
        progressSection.parentNode.insertBefore(dailyDevotionSection, progressSection.nextSibling);
      } else {
        appRoot.appendChild(dailyDevotionSection);
      }
    }
    dailyDevotionStatus = dailyDevotionSection.querySelector("#dailyDevotionStatus");
    dailyDevotionPrompt = dailyDevotionSection.querySelector("#dailyDevotionPrompt");
    dailyDevotionAction = dailyDevotionSection.querySelector("#dailyDevotionAction");
    dailyDevotionReflection = dailyDevotionSection.querySelector("#dailyDevotionReflection");
    playStoryRecapBtn = dailyDevotionSection.querySelector("#playStoryRecapBtn");
    completeDevotionChallengeBtn = dailyDevotionSection.querySelector("#completeDevotionChallengeBtn");
    completeDevotionActionBtn = dailyDevotionSection.querySelector("#completeDevotionActionBtn");
    saveDevotionReflectionBtn = dailyDevotionSection.querySelector("#saveDevotionReflectionBtn");
    emailDevotionReflectionBtn = dailyDevotionSection.querySelector("#emailDevotionReflectionBtn");
    exportDevotionReflectionCardBtn = dailyDevotionSection.querySelector("#exportDevotionReflectionCardBtn");
    claimDevotionRewardBtn = dailyDevotionSection.querySelector("#claimDevotionRewardBtn");

    if (playStoryRecapBtn) {
      playStoryRecapBtn.onclick = () => {
        playStoryRecapNow();
      };
    }
    if (completeDevotionChallengeBtn) {
      completeDevotionChallengeBtn.onclick = () => {
        ensureDailyDevotionState();
        const launched = openDailyDevotionChallenge();
        if (!launched) {
          showFeatureMoment(
            challengeCopy("No daily challenge ready", "No hay desafio diario listo"),
            challengeCopy("Unlock or reopen a stage to begin today's devotion challenge.", "Desbloquea o vuelve a abrir una etapa para comenzar el desafio devocional de hoy."),
            { icon: "⚠️", sfx: null, durationMs: 2200 }
          );
          return;
        }
        showFeatureMoment(
          challengeCopy("Daily challenge started", "Desafio diario iniciado"),
          challengeCopy("Finish the opened stage to complete today's challenge.", "Completa la etapa abierta para terminar el desafio de hoy."),
          { icon: "⚔️", durationMs: 2100 }
        );
      };
    }
    if (completeDevotionActionBtn) {
      completeDevotionActionBtn.onclick = () => {
        ensureDailyDevotionState();
        if (state.dailyDevotion.action) return;
        state.dailyDevotion.action = true;
        ensureDailyCalendarEntry(localDayKey()).devotion = true;
        persist();
        render();
        const todayWord = dailyThoughtForToday();
        showFeatureMoment(
          challengeCopy("Practical action marked complete", "Accion practica marcada como completada"),
          todayWord ? todayWord.practical : challengeCopy("You completed today's practical faith step.", "Completaste el paso practico de fe de hoy."),
          { icon: "✓" }
        );
      };
    }
    if (saveDevotionReflectionBtn) {
      saveDevotionReflectionBtn.onclick = () => {
        ensureDailyDevotionState();
        const note = String((dailyDevotionReflection && dailyDevotionReflection.value) || "").trim();
        if (!note) {
          showFeatureMoment(
            challengeCopy("Write a reflection first", "Escribe primero una reflexion"),
            challengeCopy("Add one short reflection before saving today's devotion response.", "Agrega una breve reflexion antes de guardar la respuesta devocional de hoy."),
            { icon: "✍️", sfx: null, durationMs: 2200 }
          );
          return;
        }
        state.dailyDevotion.note = note.slice(0, 240);
        state.dailyDevotion.reflection = true;
        ensureDailyCalendarEntry(localDayKey()).reflection = true;
        persist();
        render();
        showFeatureMoment(
          challengeCopy("Reflection saved", "Reflexion guardada"),
          challengeCopy("Your devotion reflection is saved and ready to email or share.", "Tu reflexion devocional esta guardada y lista para enviar o compartir."),
          { icon: "📝" }
        );
      };
    }
    if (emailDevotionReflectionBtn) {
      emailDevotionReflectionBtn.onclick = () => {
        if (!currentReflectionSharePayload()) {
          showFeatureMoment(
            challengeCopy("No reflection to email", "No hay reflexion para enviar"),
            challengeCopy("Save a short reflection first, then email it.", "Guarda primero una breve reflexion y luego enviala por correo."),
            { icon: "✉️", sfx: null, durationMs: 2200 }
          );
          return;
        }
        emailCurrentReflection();
        showFeatureMoment(
          challengeCopy("Opening email draft", "Abriendo borrador de correo"),
          challengeCopy("Your daily reflection is being prepared in email.", "Tu reflexion diaria se esta preparando en un correo."),
          { icon: "✉️", durationMs: 1700 }
        );
      };
    }
    if (exportDevotionReflectionCardBtn) {
      exportDevotionReflectionCardBtn.onclick = () => {
        if (!currentReflectionSharePayload()) {
          showFeatureMoment(
            challengeCopy("No reflection card yet", "Aun no hay tarjeta de reflexion"),
            challengeCopy("Save a short reflection first, then export the card.", "Guarda primero una breve reflexion y luego exporta la tarjeta."),
            { icon: "🖼️", sfx: null, durationMs: 2200 }
          );
          return;
        }
        void exportCurrentReflectionCard().then(() => {
          showFeatureMoment(
            challengeCopy("Reflection card ready", "Tarjeta de reflexion lista"),
            challengeCopy("Your daily reflection card was prepared for sharing.", "Tu tarjeta de reflexion diaria fue preparada para compartir."),
            { icon: "🖼️", durationMs: 1800 }
          );
        });
      };
    }
    if (claimDevotionRewardBtn) {
      claimDevotionRewardBtn.onclick = () => {
        ensureDailyDevotionState();
        const ready = state.dailyDevotion.challenge && state.dailyDevotion.action && state.dailyDevotion.reflection;
        if (!ready) {
          showFeatureMoment(
            challengeCopy("Finish all 3 devotion steps first", "Completa primero los 3 pasos devocionales"),
            challengeCopy("Complete the challenge, practical action, and reflection before claiming the reward.", "Completa el desafio, la accion practica y la reflexion antes de reclamar la recompensa."),
            { icon: "🎯", sfx: null, durationMs: 2300 }
          );
          return;
        }
        if (state.dailyDevotion.reward) return;
        state.dailyDevotion.reward = true;
        ensureDailyCalendarEntry(localDayKey()).reward = true;
        awardXp(DAILY_DEVOTION_REWARD_XP);
        state.lives = Math.min(MAX_LIVES, state.lives + DAILY_DEVOTION_REWARD_LIFE);
        playSfx("success");
        persist();
        render();
        showFeatureMoment(
          challengeCopy("Daily reward claimed", "Recompensa diaria reclamada"),
          challengeCopy(`+${DAILY_DEVOTION_REWARD_XP} XP and +${DAILY_DEVOTION_REWARD_LIFE} life awarded.`, `+${DAILY_DEVOTION_REWARD_XP} XP y +${DAILY_DEVOTION_REWARD_LIFE} vida otorgados.`),
          { icon: "🏆", durationMs: 2100 }
        );
      };
    }
  }

  if (!weeklyChallengeSection || !weeklyChallengeSection.isConnected) {
    weeklyChallengeSection = document.getElementById("weeklyChallengeSection");
    if (!weeklyChallengeSection) {
      weeklyChallengeSection = document.createElement("section");
      weeklyChallengeSection.id = "weeklyChallengeSection";
      weeklyChallengeSection.className = "feature-card weekly-card";
      weeklyChallengeSection.innerHTML = [
        '<div class="feature-head">',
        '  <h2>Weekly Challenge Card</h2>',
        '  <p id="weeklyChallengeMeta" class="meta"></p>',
        '</div>',
        '<p id="weeklyChallengeText" class="meta"></p>',
        '<div class="feature-actions">',
        '  <button id="shareWeeklyChallengeBtn" class="ghost-btn" type="button">Share Weekly Card</button>',
        '</div>'
      ].join("");
      if (badgeSection && badgeSection.parentNode) {
        badgeSection.parentNode.insertBefore(weeklyChallengeSection, badgeSection);
      } else {
        appRoot.appendChild(weeklyChallengeSection);
      }
    }
    weeklyChallengeMeta = weeklyChallengeSection.querySelector("#weeklyChallengeMeta");
    weeklyChallengeText = weeklyChallengeSection.querySelector("#weeklyChallengeText");
    shareWeeklyChallengeBtn = weeklyChallengeSection.querySelector("#shareWeeklyChallengeBtn");
    if (shareWeeklyChallengeBtn) {
      shareWeeklyChallengeBtn.onclick = () => {
        const text = `FAITHSHIELD weekly challenge: ${state.weeklyChallenge.progress}/${state.weeklyChallenge.target} stages in ${formatEraLabel(state.weeklyChallenge.era)} (${state.weeklyChallenge.weekKey}).`;
        nativeShareOrCopy("FAITHSHIELD Weekly Challenge", text);
        state.weeklyChallenge.shared = true;
        persist();
        renderWeeklyChallenge();
      };
    }
  }

  if (!desktopControlsSection || !desktopControlsSection.isConnected) {
    desktopControlsSection = document.getElementById("desktopControlsSection");
    if (!desktopControlsSection) {
      desktopControlsSection = document.createElement("section");
      desktopControlsSection.id = "desktopControlsSection";
      desktopControlsSection.className = "feature-card desktop-controls-card";
      desktopControlsSection.innerHTML = [
        '<div class="feature-head">',
        '  <h2>Desktop Quality Controls</h2>',
        '  <p class="meta">Keyboard-first flow + optional controller support</p>',
        '</div>',
        '<div class="toggle-list">',
        '  <label class="toggle-row" for="hotkeysToggle"><input id="hotkeysToggle" type="checkbox" /> Enable global hotkeys</label>',
        '  <label class="toggle-row" for="controllerToggle"><input id="controllerToggle" type="checkbox" /> Enable controller support (beta)</label>',
        '  <label class="toggle-row" for="badgeCeremonyAutoOpenToggle"><input id="badgeCeremonyAutoOpenToggle" type="checkbox" /> Auto-open Badge Shield</label>',
        '</div>',
        '<p class="meta">Hotkeys: H = hub, P = story path, M = music, Esc = close panel.</p>'
      ].join("");
      if (postStoryAnchor) {
        postStoryAnchor.parentNode.insertBefore(desktopControlsSection, postStoryAnchor);
      } else if (progressSection && progressSection.parentNode) {
        progressSection.parentNode.insertBefore(desktopControlsSection, progressSection.nextSibling);
      } else {
        appRoot.appendChild(desktopControlsSection);
      }
    }
    hotkeysToggle = desktopControlsSection.querySelector("#hotkeysToggle");
    controllerToggle = desktopControlsSection.querySelector("#controllerToggle");
    badgeCeremonyAutoOpenToggle = desktopControlsSection.querySelector("#badgeCeremonyAutoOpenToggle");

    if (hotkeysToggle) {
      hotkeysToggle.onchange = (event) => {
        state.controls.hotkeys = Boolean(event.target.checked);
        persist();
      };
    }
    if (controllerToggle) {
      controllerToggle.onchange = (event) => {
        state.controls.controller = Boolean(event.target.checked);
        persist();
      };
    }
    if (badgeCeremonyAutoOpenToggle) {
      badgeCeremonyAutoOpenToggle.onchange = (event) => {
        state.controls.badgeCeremonyAutoOpen = Boolean(event.target.checked);
        persist();
      };
    }
  }
}

function renderCampaignMap() {
  ensureExperienceSections();
  if (!campaignMapTrack) return;
  const sections = buildEraSections();
  const completedSet = new Set(state.completed);
  campaignMapTrack.innerHTML = "";
  if (!sections.length) return;

  sections.forEach((section, index) => {
    const total = section.items.length;
    const doneCount = section.items.reduce((sum, item) => sum + (completedSet.has(item.meta.id) ? 1 : 0), 0);
    const firstIdx = section.items[0] ? section.items[0].index : 0;
    const unlocked = firstIdx + 1 <= state.unlocked;
    const bossMeta = [...section.items].reverse().map((item) => item.meta).find((meta) => meta.stage === 5) || section.items[section.items.length - 1].meta;
    const bossDone = completedSet.has(bossMeta.id);

    const node = document.createElement("button");
    node.type = "button";
    node.className = `campaign-node ${doneCount >= total ? "done" : unlocked ? "open" : "locked"}`;
    node.innerHTML = [
      `<span class="campaign-era">${formatEraLabel(section.era)}</span>`,
      `<span class="campaign-intro">${eraIntroCopy(section.era)}</span>`,
      `<span class="campaign-progress">${doneCount}/${total} stages</span>`,
      `<span class="campaign-boss">${bossDone ? "Boss cleared" : "Boss stage pending"}</span>`
    ].join("");
    node.addEventListener("click", () => jumpToEra(section.era));
    campaignMapTrack.appendChild(node);

    if (index < sections.length - 1) {
      const divider = document.createElement("span");
      divider.className = "campaign-divider";
      divider.textContent = "➜";
      campaignMapTrack.appendChild(divider);
    }
  });

  if (campaignMapSummary) {
    const completeEras = sections.filter((section) => section.items.every((item) => completedSet.has(item.meta.id))).length;
    campaignMapSummary.textContent = `${completeEras}/${sections.length} eras completed`;
  }
  if (campaignMapFinish) {
    const pct = Math.round((state.completed.length / TOTAL_STAGES) * 100);
    campaignMapFinish.textContent = pct >= 100
      ? "Finish Line: reached. Shield of Faith ending unlocked."
      : `Finish Line: ${pct}% of the full campaign complete.`;
  }
}

function renderMasteryPanel() {
  ensureExperienceSections();
  if (!masteryBars || !weakAreaList) return;
  const entries = masteryEntries();
  const dueEntries = reviewDueEntries(5);
  masteryBars.innerHTML = "";
  weakAreaList.innerHTML = "";

  if (startSmartReviewBtn) {
    startSmartReviewBtn.textContent = "Start Smart Review";
    startSmartReviewBtn.disabled = !entries.length;
  }
  if (reviewDueTodayBtn) {
    reviewDueTodayBtn.textContent = dueEntries.length ? `Review Due Today (${dueEntries.length})` : "Review Due Today";
    reviewDueTodayBtn.disabled = !dueEntries.length;
  }
  if (focusWeakBtn) {
    focusWeakBtn.textContent = "Focus Weak Area";
    focusWeakBtn.disabled = !weakestMasteryEntries(1).length;
  }

  if (!entries.length) {
    if (masteryOverall) masteryOverall.textContent = "Learning strength: 0%";
    const empty = document.createElement("p");
    empty.className = "meta";
    empty.textContent = "Complete stages to build mastery and spaced review targets.";
    masteryBars.appendChild(empty);
    return;
  }

  const average = Math.round(entries.reduce((sum, item) => sum + Number(item.strength || 0), 0) / entries.length);
  if (masteryOverall) masteryOverall.textContent = `Learning strength: ${average}% (goal ${MASTERY_TARGET_PERCENT}%)`;

  entries
    .sort((a, b) => Number(b.attempts || 0) - Number(a.attempts || 0))
    .slice(0, 6)
    .forEach((entry) => {
      const row = document.createElement("div");
      row.className = "mastery-row";
      const label = document.createElement("p");
      label.className = "meta";
      label.textContent = entry.label || entry.theme || "Topic";
      const bar = document.createElement("div");
      bar.className = "mastery-bar";
      const fill = document.createElement("span");
      fill.style.width = `${Math.max(0, Math.min(100, Number(entry.strength || 0)))}%`;
      bar.appendChild(fill);
      row.append(label, bar);
      masteryBars.appendChild(row);
    });

  const weak = weakestMasteryEntries(5);
  if (!weak.length) {
    const stable = document.createElement("p");
    stable.className = "meta";
    stable.textContent = "No weak areas right now. Keep going.";
    weakAreaList.appendChild(stable);
    return;
  }

  weak.forEach((entry) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "ghost-btn weak-chip";
    const strength = Math.round(Number(entry.strength || 0));
    const dueLabel = entryDueToday(entry) ? " • Review now" : "";
    chip.textContent = `${entry.theme || "Topic"} • ${strength}%${dueLabel}`;
    chip.addEventListener("click", () => {
      clearReviewFocus({ silent: true });
      beginSmartReviewFromEntry(entry, "weak");
    });
    weakAreaList.appendChild(chip);
  });
}

function renderDailyDevotionQuest() {
  ensureExperienceSections();
  if (!dailyDevotionSection) return;
  ensureDailyDevotionState();

  const todayWord = dailyThoughtForToday();
  const completed = [state.dailyDevotion.challenge, state.dailyDevotion.action, state.dailyDevotion.reflection].filter(Boolean).length;

  if (dailyDevotionStatus) dailyDevotionStatus.textContent = `${completed}/3 completed`;
  if (dailyDevotionPrompt) {
    dailyDevotionPrompt.textContent = `Daily challenge: ${todayWord ? todayWord.thought : "Read today's thought and respond."}`;
  }
  if (dailyDevotionAction) {
    dailyDevotionAction.textContent = `Practical action: ${todayWord ? todayWord.practical : "Take one practical step today."}`;
  }
  if (dailyDevotionReflection && document.activeElement !== dailyDevotionReflection) {
    dailyDevotionReflection.value = state.dailyDevotion.note || "";
  }

  if (completeDevotionChallengeBtn) {
    completeDevotionChallengeBtn.disabled = state.dailyDevotion.challenge;
    completeDevotionChallengeBtn.textContent = state.dailyDevotion.challenge
      ? challengeCopy("Daily Challenge Complete", "Desafio diario completado")
      : challengeCopy("Start Daily Challenge", "Iniciar desafio diario");
  }
  if (completeDevotionActionBtn) {
    completeDevotionActionBtn.disabled = state.dailyDevotion.action;
    completeDevotionActionBtn.textContent = state.dailyDevotion.action
      ? challengeCopy("Practical Action Complete", "Accion practica completada")
      : challengeCopy("Mark Practical Action Done", "Marcar accion practica");
  }
  if (saveDevotionReflectionBtn) {
    saveDevotionReflectionBtn.disabled = state.dailyDevotion.reflection && Boolean(state.dailyDevotion.note);
    saveDevotionReflectionBtn.textContent = state.dailyDevotion.reflection && Boolean(state.dailyDevotion.note)
      ? challengeCopy("Reflection Saved", "Reflexion guardada")
      : challengeCopy("Save Reflection", "Guardar reflexion");
  }
  if (emailDevotionReflectionBtn) {
    emailDevotionReflectionBtn.textContent = t("emailReflection");
    emailDevotionReflectionBtn.disabled = !Boolean(String(state.dailyDevotion.note || "").trim());
  }
  if (exportDevotionReflectionCardBtn) {
    exportDevotionReflectionCardBtn.textContent = t("shareReflectionCard");
    exportDevotionReflectionCardBtn.disabled = !Boolean(String(state.dailyDevotion.note || "").trim());
  }
  if (claimDevotionRewardBtn) {
    const ready = state.dailyDevotion.challenge && state.dailyDevotion.action && state.dailyDevotion.reflection;
    claimDevotionRewardBtn.disabled = !ready || state.dailyDevotion.reward;
    claimDevotionRewardBtn.textContent = state.dailyDevotion.reward
      ? "Reward Claimed"
      : `Claim Reward (+${DAILY_DEVOTION_REWARD_XP} XP)`;
  }
}

function renderWeeklyChallenge() {
  ensureExperienceSections();
  if (!weeklyChallengeSection) return;
  ensureWeeklyChallengeState();
  const eraLabel = formatEraLabel(state.weeklyChallenge.era);
  if (weeklyChallengeMeta) {
    weeklyChallengeMeta.textContent = `${state.weeklyChallenge.weekKey} • ${eraLabel}`;
  }
  if (weeklyChallengeText) {
    weeklyChallengeText.textContent = `I completed ${state.weeklyChallenge.progress}/${state.weeklyChallenge.target} stages in ${eraLabel} this week.`;
  }
}

function renderDesktopControls() {
  ensureExperienceSections();
  if (!desktopControlsSection) return;
  const desktop = isDesktopViewport();
  desktopControlsSection.classList.toggle("hidden", !desktop);
  if (hotkeysToggle) hotkeysToggle.checked = Boolean(state.controls.hotkeys);
  if (controllerToggle) controllerToggle.checked = Boolean(state.controls.controller);
  if (badgeCeremonyAutoOpenToggle) {
    badgeCeremonyAutoOpenToggle.checked = state.controls.badgeCeremonyAutoOpen !== false;
    const label = badgeCeremonyAutoOpenToggle.closest("label");
    if (label && label.childNodes.length) {
      const textNode = Array.from(label.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
      if (textNode) textNode.textContent = ` ${t("autoOpenBadgeShield")}`;
    }
  }
}

function dispatchVirtualKey(key) {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
  window.dispatchEvent(event);
}

function closeTopOverlay() {
  if (isStoryTheaterOpen()) {
    closeStoryTheater();
    return;
  }
  if (isCreditsOpen()) {
    hideCreditsOverlay();
    return;
  }
  if (isFinalOpen()) {
    hideFinalOverlay();
    return;
  }
  if (shareOverlay && !shareOverlay.classList.contains("hidden")) {
    closeShareOverlay();
    return;
  }
  if (badgeShieldOverlay && !badgeShieldOverlay.classList.contains("hidden")) {
    closeBadgeShield();
    return;
  }
  if (activityOverlay && !activityOverlay.classList.contains("hidden")) {
    closeActivity();
  }
}

function handleGlobalHotkeys(event) {
  if (!state.controls.hotkeys) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const target = event.target;
  const tagName = target && target.tagName ? String(target.tagName).toUpperCase() : "";
  if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || (target && target.isContentEditable)) return;

  if (event.key === "h" || event.key === "H") {
    event.preventDefault();
    smoothScrollToNode(gameDashboard || appRoot);
    return;
  }
  if (event.key === "p" || event.key === "P") {
    event.preventDefault();
    smoothScrollToNode(storyPathHeading || stageGrid);
    return;
  }
  if (event.key === "m" || event.key === "M") {
    event.preventDefault();
    state.audio.music = !state.audio.music;
    updateAudioState();
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    closeTopOverlay();
  }
}

function pollControllerSupport() {
  controllerPollHandle = window.requestAnimationFrame(pollControllerSupport);
  if (!state.controls.controller || !isDesktopViewport() || typeof navigator.getGamepads !== "function") return;
  const pads = navigator.getGamepads();
  const pad = pads && pads[0];
  if (!pad) {
    controllerPrevState = { left: false, right: false, up: false, down: false, confirm: false, cancel: false };
    return;
  }

  const axisX = Number((pad.axes && pad.axes[0]) || 0);
  const axisY = Number((pad.axes && pad.axes[1]) || 0);
  const nextState = {
    left: Boolean((pad.buttons[14] && pad.buttons[14].pressed) || axisX < -0.5),
    right: Boolean((pad.buttons[15] && pad.buttons[15].pressed) || axisX > 0.5),
    up: Boolean((pad.buttons[12] && pad.buttons[12].pressed) || axisY < -0.5),
    down: Boolean((pad.buttons[13] && pad.buttons[13].pressed) || axisY > 0.5),
    confirm: Boolean((pad.buttons[0] && pad.buttons[0].pressed) || (pad.buttons[7] && pad.buttons[7].pressed)),
    cancel: Boolean((pad.buttons[1] && pad.buttons[1].pressed) || (pad.buttons[9] && pad.buttons[9].pressed))
  };

  if (nextState.left && !controllerPrevState.left) dispatchVirtualKey("ArrowLeft");
  if (nextState.right && !controllerPrevState.right) dispatchVirtualKey("ArrowRight");
  if (nextState.up && !controllerPrevState.up) dispatchVirtualKey("ArrowUp");
  if (nextState.down && !controllerPrevState.down) dispatchVirtualKey("ArrowDown");
  if (nextState.confirm && !controllerPrevState.confirm) dispatchVirtualKey("Enter");
  if (nextState.cancel && !controllerPrevState.cancel) dispatchVirtualKey("Escape");

  controllerPrevState = nextState;
}

function initDesktopControlBindings() {
  if (!desktopHotkeysBound) {
    window.addEventListener("keydown", handleGlobalHotkeys, true);
    desktopHotkeysBound = true;
  }
  if (!controllerPollHandle) {
    controllerPollHandle = window.requestAnimationFrame(pollControllerSupport);
  }
}

function trackDailyAndWeeklyCompletion(meta, replay = false) {
  ensureDailyDevotionState();
  const todayEntry = ensureDailyCalendarEntry(localDayKey());
  ensureWeeklyChallengeState();
  let weekendBonus = null;
  if (!replay) {
    state.dailyDevotion.challenge = true;
    todayEntry.challenge = true;
    if (meta && meta.theme && meta.theme.era) {
      todayEntry.era = meta.theme.era;
    }
    if (meta && meta.theme && meta.theme.era === state.weeklyChallenge.era) {
      state.weeklyChallenge.progress = Math.min(
        state.weeklyChallenge.target,
        Number(state.weeklyChallenge.progress || 0) + 1
      );
    }
    const event = weekendEventForDate();
    if (event && !todayEntry.weekendRewardClaimed) {
      todayEntry.weekendRewardClaimed = true;
      todayEntry.weekendEventId = event.id;
      if (event.rewardXp) awardXp(event.rewardXp);
      if (event.rewardLives) state.lives = Math.min(MAX_LIVES, state.lives + Number(event.rewardLives || 0));
      weekendBonus = event;
    }
  }
  return weekendBonus;
}

function ensureCorePracticePlacement() {
  const memoryHeading = document.getElementById("memoryHeading");
  const journalHeading = document.getElementById("journalHeading");
  const dailyThoughtCard = document.querySelector(".daily-word-card");
  if (!memoryHeading || !journalHeading || !dailyThoughtCard || !dailyThoughtCard.parentNode) return;

  const practiceSection = memoryHeading.closest("section");
  if (!practiceSection || practiceSection !== journalHeading.closest("section")) return;
  if (practiceSection.previousElementSibling === dailyThoughtCard) return;

  const parent = dailyThoughtCard.parentNode;
  if (dailyThoughtCard.nextSibling) {
    parent.insertBefore(practiceSection, dailyThoughtCard.nextSibling);
  } else {
    parent.appendChild(practiceSection);
  }
}

function ensureHubQuickNav() {
  const progressSection = gameDashboard ? gameDashboard.closest("section") : null;
  if (!progressSection || !progressSection.parentNode) return;

  if (!hubQuickNav || !hubQuickNav.isConnected) {
    hubQuickNav = document.getElementById("hubQuickNav");
    if (!hubQuickNav) {
      hubQuickNav = document.createElement("section");
      hubQuickNav.id = "hubQuickNav";
      hubQuickNav.className = "feature-card hub-quick-nav";
      hubQuickNav.innerHTML = [
        '  <div class="feature-head">',
        `    <h2>${challengeCopy("Gamehub Shortcuts", "Accesos del Gamehub")}</h2>`,
        `    <p class="meta">${challengeCopy("Jump to the section you need.", "Ve rapido a la seccion que necesitas.")}</p>`,
        "  </div>",
        '  <div class="hub-quick-actions">',
        `    <button id="jumpTopHubBtnHub" class="ghost-btn" type="button">${challengeCopy("Top of Hub", "Inicio del Hub")}</button>`,
        `    <button id="jumpDailyDevotionBtnHub" class="ghost-btn" type="button">${challengeCopy("Daily Devotion", "Devocional diario")}</button>`,
        `    <button id="jumpStoryPathBtnHub" class="ghost-btn" type="button">${challengeCopy("Story Path", "Camino de historia")}</button>`,
        `    <button id="jumpBadgesBtnHub" class="ghost-btn" type="button">${challengeCopy("Badge Collection", "Coleccion de insignias")}</button>`,
        `    <button id="jumpHallBtnHub" class="ghost-btn" type="button">${challengeCopy("Hall of Faith", "Salon de Fe")}</button>`,
        "  </div>"
      ].join("");
      const parent = progressSection.parentNode;
      const anchor = progressSection.nextSibling;
      parent.insertBefore(hubQuickNav, anchor);
    }
  }

  const dailyTarget = document.querySelector(".daily-word-card")
    || dailyDevotionSection
    || document.getElementById("dailyDevotionSection");
  const storyTarget = storyPathHeading
    ? storyPathHeading.closest("section")
    : (stageGrid ? stageGrid.closest("section") : stageGrid);
  const badgeTarget = document.getElementById("badgeCollectionHeading")
    ? document.getElementById("badgeCollectionHeading").closest("section")
    : document.querySelector(".badge-section");
  const hallTarget = hallOfFaithSection || document.getElementById("hallOfFaithSection");

  const topBtn = hubQuickNav.querySelector("#jumpTopHubBtnHub");
  const dailyBtn = hubQuickNav.querySelector("#jumpDailyDevotionBtnHub");
  const storyBtn = hubQuickNav.querySelector("#jumpStoryPathBtnHub");
  const badgeBtn = hubQuickNav.querySelector("#jumpBadgesBtnHub");
  const hallBtn = hubQuickNav.querySelector("#jumpHallBtnHub");

  const dailyBtnPrimary = document.querySelector("#gameDashboard #jumpDailyDevotionBtn");
  const storyBtnPrimary = document.querySelector("#gameDashboard #jumpStoryPathBtn");
  const badgeBtnPrimary = document.querySelector("#gameDashboard #jumpBadgesBtn");

  const goTop = () => smoothScrollToNode(gameDashboard || appRoot || progressSection);
  const goDaily = () => smoothScrollToNode(dailyTarget || storyTarget || progressSection);
  const goStory = () => smoothScrollToNode(storyTarget || progressSection);
  const goBadges = () => smoothScrollToNode(badgeTarget || hallTarget || storyTarget || progressSection);
  const goHall = () => smoothScrollToNode(hallTarget || badgeTarget || storyTarget || progressSection);

  if (topBtn) topBtn.onclick = goTop;
  if (dailyBtn) dailyBtn.onclick = goDaily;
  if (storyBtn) storyBtn.onclick = goStory;
  if (badgeBtn) badgeBtn.onclick = goBadges;
  if (hallBtn) hallBtn.onclick = goHall;
  if (dailyBtnPrimary) dailyBtnPrimary.onclick = goDaily;
  if (storyBtnPrimary) storyBtnPrimary.onclick = goStory;
  if (badgeBtnPrimary) badgeBtnPrimary.onclick = goBadges;
}

function ensureHubSectionOrder() {
  const progressSection = gameDashboard ? gameDashboard.closest("section") : null;
  const storySection = storyPathHeading ? storyPathHeading.closest("section") : null;
  if (!progressSection || !storySection || !progressSection.parentNode || progressSection.parentNode !== storySection.parentNode) return;

  const parent = progressSection.parentNode;
  const dailyThoughtCard = document.querySelector(".daily-word-card");
  const todayPlanSection = document.getElementById("todayPlanHeading") ? document.getElementById("todayPlanHeading").closest("section") : null;
  const streakSection = document.getElementById("streakHeading") ? document.getElementById("streakHeading").closest("section") : null;
  const memoryHeading = document.getElementById("memoryHeading");
  const journalHeading = document.getElementById("journalHeading");
  const practiceSection = memoryHeading && journalHeading && memoryHeading.closest("section") === journalHeading.closest("section")
    ? memoryHeading.closest("section")
    : null;
  const accessibilitySection = document.getElementById("accessibilityHeading")
    ? document.getElementById("accessibilityHeading").closest("section")
    : null;
  const badgeSection = document.querySelector(".badge-section");
  const preferredSections = [
    hubQuickNav,
    dailyThoughtCard,
    todayPlanSection,
    streakSection,
    practiceSection,
    dailyDevotionSection,
    dailyCalendarSection,
    weeklyChallengeSection,
    hallOfFaithSection,
    masterySection,
    campaignMapSection,
    desktopControlsSection,
    accessibilitySection,
    badgeSection
  ];
  const extraHubSections = Array.from(parent.children).filter((section) => {
    if (!(section instanceof HTMLElement)) return false;
    if (section === progressSection || section === storySection) return false;
    if (!section.matches("section")) return false;
    return !preferredSections.includes(section);
  });
  const orderedSections = preferredSections.concat(extraHubSections, storySection);

  let insertAfter = progressSection;
  orderedSections.forEach((section) => {
    if (!section || section === insertAfter || !section.parentNode || section.parentNode !== parent) return;
    const target = insertAfter.nextSibling;
    if (section !== target) {
      parent.insertBefore(section, target);
    }
    insertAfter = section;
  });
}

function renderExperienceSections() {
  ensureCorePracticePlacement();
  ensureRecapIndicator();
  renderDailyChallengeCalendar();
  renderHallOfFaith();
  renderCampaignMap();
  renderMasteryPanel();
  renderDailyDevotionQuest();
  renderWeeklyChallenge();
  renderDesktopControls();
  ensureHubQuickNav();
  ensureHubSectionOrder();
}

function updateHud() {
  applyLanguageToDocument();
  ensureBadgeActionButtons();
  ensureShareOverlayEnhancements();
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

  const hasBadges = state.badges.length > 0;
  if (shareLatestBadgeBtn) shareLatestBadgeBtn.disabled = !hasBadges;
  if (replayLatestBadgeBtn) {
    replayLatestBadgeBtn.textContent = t("replayBadgeCeremony");
    replayLatestBadgeBtn.disabled = !hasBadges;
  }
  if (exportLatestBadgeCardBtn) {
    exportLatestBadgeCardBtn.textContent = t("exportBadgeCard");
    exportLatestBadgeCardBtn.disabled = !hasBadges;
  }
  if (exportBadgeCardBtn) {
    exportBadgeCardBtn.textContent = t("downloadCard");
    exportBadgeCardBtn.disabled = !hasBadges;
  }
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
  if (!DIFFICULTY_LEVELS.includes(difficultyId)) return null;
  if (!state.stats.difficultyPass || typeof state.stats.difficultyPass !== "object") {
    state.stats.difficultyPass = { easy: false, medium: false, advanced: false };
  }
  if (state.stats.difficultyPass[difficultyId]) return null;

  state.stats.difficultyPass[difficultyId] = true;
  const badge = DIFFICULTY_BADGE_META[difficultyId];
  if (!badge) return null;

  state.lastBadge = `${badge.icon} ${badge.name}`;
  return {
    id: badge.id,
    icon: badge.icon || "🛡️",
    name: badge.name,
    accomplishment: badge.accomplishment || ""
  };
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
  const setBonusCount = countUnlockedBadgeSetBonuses();

  if (!state.badges.length) {
    const empty = document.createElement("article");
    empty.className = "badge-card empty";
    empty.innerHTML = '<span class="badge-symbol">🛡️</span><h3>No badges yet</h3><p>Finish stages and skill challenges to collect Bible-symbol badges.</p>';
    badgeGrid.appendChild(empty);
    if (badgeHelper) {
      badgeHelper.textContent = `Complete stages to earn Bible-symbol badges. ${t("setBonusesLabel")}: ${setBonusCount}/${BADGE_SET_BONUSES.length}.`;
    }
    return;
  }

  if (badgeHelper) {
    badgeHelper.textContent = `You have earned ${state.badges.length} of ${MAX_BADGES} badges. ${t("setBonusesLabel")}: ${setBonusCount}/${BADGE_SET_BONUSES.length}.`;
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
    const setBonusCount = countUnlockedBadgeSetBonuses();
    const finalShieldStatus = finalShieldUnlocked
      ? "Final Shield earned"
      : "Final Shield unlocks after 39 badges and all 3 difficulty seals";
    badgeShieldProgress.textContent =
      `${baseBadgeCount}/${MAX_BADGES - 1} core badges earned | Difficulty seals ${difficultyEarned}/3 | ${t("setBonusesLabel")} ${setBonusCount}/${BADGE_SET_BONUSES.length} | ${finalShieldStatus}`;
  }

  renderDifficultyBadgeRow();

  badgeCatalog.forEach((badge) => {
    const unlocked = state.badges.includes(badge.id);
    const eraLocked = !unlocked && badge.era && !hasReachedEraForState(state, badge.era);

    const cell = document.createElement("article");
    cell.className = `shield-badge ${unlocked ? "unlocked" : "locked"}`;
    cell.dataset.badgeId = badge.id;
    cell.title = unlocked ? `${badge.icon || "🛡️"} ${badge.name}` : "Locked";

    const symbol = document.createElement("span");
    symbol.className = "badge-symbol";
    symbol.textContent = unlocked ? badge.icon || "🛡️" : "◌";

    const name = document.createElement("span");
    name.className = "shield-name";
    name.textContent = unlocked ? badge.name : "Locked";

    cell.append(symbol, name);
    if (eraLocked) {
      const note = document.createElement("span");
      note.className = "shield-note";
      note.textContent = challengeCopy(
        `Unlocks in ${formatEraLabel(badge.era)}`,
        `Se desbloquea en ${formatEraLabel(badge.era)}`
      );
      cell.appendChild(note);
    }
    badgeShieldGrid.appendChild(cell);
  });
}

function clearBadgeShieldCeremonyFocus() {
  if (!badgeShieldGrid) return;
  badgeShieldGrid
    .querySelectorAll(".shield-badge.ceremony-focus")
    .forEach((node) => node.classList.remove("ceremony-focus"));
}

function focusBadgeShieldCell(badgeId, options = {}) {
  if (!badgeShieldGrid || !badgeId) return;
  clearBadgeShieldCeremonyFocus();
  const cell = badgeShieldGrid.querySelector(`.shield-badge[data-badge-id="${badgeId}"]`);
  if (!cell) return;
  if (options.ceremony) cell.classList.add("ceremony-focus");
  const behavior = options.ceremony ? "auto" : "smooth";
  cell.scrollIntoView({ block: "center", inline: "nearest", behavior });
}

function clearBadgeCeremonyTimers() {
  if (badgeCeremonyRevealTimer) {
    window.clearTimeout(badgeCeremonyRevealTimer);
    badgeCeremonyRevealTimer = 0;
  }
  if (badgeCeremonyCloseTimer) {
    window.clearTimeout(badgeCeremonyCloseTimer);
    badgeCeremonyCloseTimer = 0;
  }
}

function showBadgeShieldCeremonyBoard() {
  if (!badgeCeremonyBadgeId) return;
  badgeCeremonyActive = true;
  clearBadgeCeremonyTimers();
  openBadgeShield({ ceremony: true, focusBadgeId: badgeCeremonyBadgeId });
  badgeCeremonyCloseTimer = window.setTimeout(() => {
    badgeCeremonyCloseTimer = 0;
    closeBadgeShield({ fromCeremony: true });
  }, 5000);
}

function startBadgeCeremonySequence(badge, options = {}) {
  if (!badge || !badge.id || !badgeShieldOverlay) return;

  clearBadgeCeremonyTimers();
  badgeCeremonyBadgeId = badge.id;
  const shouldAutoOpen = options.skipBoard
    ? false
    : (options.autoOpen !== undefined ? Boolean(options.autoOpen) : state.controls.badgeCeremonyAutoOpen !== false);
  badgeCeremonyActive = shouldAutoOpen;
  if (!shouldAutoOpen) return;

  const revealWhenReady = () => {
    if (!badgeCeremonyActive) return;
    const shareOpen = shareOverlay && !shareOverlay.classList.contains("hidden");
    if (state.activeStage || isStoryTheaterOpen() || isFinalOpen() || isCreditsOpen() || shareOpen) {
      badgeCeremonyRevealTimer = window.setTimeout(revealWhenReady, 700);
      return;
    }
    badgeCeremonyRevealTimer = 0;
    showBadgeShieldCeremonyBoard();
  };

  badgeCeremonyRevealTimer = window.setTimeout(revealWhenReady, 5050);
}

function openBadgeShield(options = {}) {
  if (!badgeShieldOverlay) return;
  renderBadgeShield();
  const ceremonyMode = Boolean(options.ceremony);
  badgeShieldOverlay.classList.toggle("ceremony-mode", ceremonyMode);
  badgeShieldOverlay.classList.remove("hidden");
  if (badgeShieldOverlay.scrollTo) badgeShieldOverlay.scrollTo({ top: 0, behavior: "auto" });
  if (options.focusBadgeId) {
    window.requestAnimationFrame(() => focusBadgeShieldCell(options.focusBadgeId, { ceremony: ceremonyMode }));
  } else {
    clearBadgeShieldCeremonyFocus();
  }
  updateOverlayLock();
}

function closeBadgeShield(options = {}) {
  if (!badgeShieldOverlay) return;
  badgeShieldOverlay.classList.add("hidden");
  badgeShieldOverlay.classList.remove("ceremony-mode");
  clearBadgeShieldCeremonyFocus();
  if (!options.fromCeremony) {
    clearBadgeCeremonyTimers();
    badgeCeremonyActive = false;
    badgeCeremonyBadgeId = null;
  } else {
    badgeCeremonyActive = false;
    badgeCeremonyBadgeId = null;
  }
  updateOverlayLock();
}

function ensureBadgeUnlockToast() {
  if (badgeUnlockToastNode && badgeUnlockToastNode.isConnected) return badgeUnlockToastNode;
  if (!document.body) return null;

  const node = document.createElement("aside");
  node.className = "badge-unlock-toast";
  node.setAttribute("role", "status");
  node.setAttribute("aria-live", "polite");
  node.innerHTML = [
    '<div class="badge-unlock-card">',
    '<p class="badge-unlock-kicker"></p>',
    '<p class="badge-unlock-name"><span class="badge-unlock-icon">🛡️</span><span class="badge-unlock-title"></span></p>',
    '<p class="badge-unlock-sub"></p>',
    '<div class="badge-unlock-actions">',
    '<button class="ghost-btn badge-unlock-share-btn" type="button">Share Badge</button>',
    '<button class="cta-btn badge-unlock-board-btn" type="button">View Badge Board</button>',
    "</div>",
    "</div>"
  ].join("");

  document.body.appendChild(node);
  const shareBtn = node.querySelector(".badge-unlock-share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      if (!badgeCeremonyBadgeId) return;
      openShareOverlay(badgeCeremonyBadgeId);
    });
  }
  const boardBtn = node.querySelector(".badge-unlock-board-btn");
  if (boardBtn) {
    boardBtn.addEventListener("click", () => {
      if (!badgeCeremonyBadgeId) return;
      showBadgeShieldCeremonyBoard();
    });
  }
  badgeUnlockToastNode = node;
  return node;
}

function speakBadgePraise(badge) {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;
  const badgeName = String((badge && badge.name) || "this badge").trim();
  const line = `Good Job, for earning ${badgeName}.`;
  stopStoryRecap();
  const utterance = new SpeechSynthesisUtterance(line);
  const voice = pickPremiumNarrationVoice(state.language) || pickNarrationVoice();

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "en-US";
  } else {
    utterance.lang = state.language === "es" ? "es-ES" : "en-US";
  }

  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.rate = state.language === "es" ? 0.9 : 0.86;
  badgePraiseUtterance = utterance;
  const clearUtterance = () => {
    if (badgePraiseUtterance === utterance) badgePraiseUtterance = null;
  };
  utterance.onend = clearUtterance;
  utterance.onerror = clearUtterance;

  const speak = () => {
    try {
      window.speechSynthesis.speak(utterance);
    } catch (_) {
      // Ignore speech playback errors.
    }
  };

  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) {
    const onVoices = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
      if (badgePraiseUtterance !== utterance) return;
      const lateVoice = pickPremiumNarrationVoice(state.language) || pickNarrationVoice();
      if (lateVoice) {
        utterance.voice = lateVoice;
        utterance.lang = lateVoice.lang || "en-US";
      }
      speak();
    };
    window.speechSynthesis.addEventListener("voiceschanged", onVoices);
    window.setTimeout(() => {
      if (badgePraiseUtterance === utterance) speak();
    }, 180);
    return;
  }

  speak();
}

function showBadgeUnlockMoment(badge, options = {}) {
  if (!badge) return;
  const node = ensureBadgeUnlockToast();
  if (!node) return;
  badgeCeremonyBadgeId = badge.id || null;
  if (stageCompleteToastNode) stageCompleteToastNode.classList.remove("show");

  const kicker = node.querySelector(".badge-unlock-kicker");
  const icon = node.querySelector(".badge-unlock-icon");
  const title = node.querySelector(".badge-unlock-title");
  const sub = node.querySelector(".badge-unlock-sub");
  if (kicker) kicker.textContent = `Good job! ${t("badgeUnlockedTitle")}`;
  if (icon) icon.textContent = badge.icon || "🛡️";
  if (title) title.textContent = badge.name || "Badge";
  if (sub) sub.textContent = badge.accomplishment || t("badgeUnlockedNow");

  node.classList.add("show");
  speakBadgePraise(badge);
  if (badgeUnlockToastTimer) window.clearTimeout(badgeUnlockToastTimer);
  badgeUnlockToastTimer = window.setTimeout(() => {
    node.classList.remove("show");
    badgeUnlockToastTimer = 0;
  }, 5000);
  startBadgeCeremonySequence(badge, options);
}

function ensureStageCompleteToast() {
  if (stageCompleteToastNode && stageCompleteToastNode.isConnected) return stageCompleteToastNode;
  if (!document.body) return null;

  const node = document.createElement("aside");
  node.className = "badge-unlock-toast stage-complete-toast";
  node.setAttribute("role", "status");
  node.setAttribute("aria-live", "polite");
  node.innerHTML = [
    '<div class="badge-unlock-card">',
    '<p class="badge-unlock-kicker"></p>',
    '<p class="badge-unlock-name"><span class="badge-unlock-icon">✓</span><span class="badge-unlock-title"></span></p>',
    '<p class="badge-unlock-sub"></p>',
    "</div>"
  ].join("");

  document.body.appendChild(node);
  node.style.pointerEvents = "none";
  const card = node.querySelector(".badge-unlock-card");
  if (card) card.style.pointerEvents = "none";
  stageCompleteToastNode = node;
  return node;
}

function stageCompletionSummary(result) {
  if (!result || !result.meta) return "";
  const sourceRef = normalizeSourceRef((result.stageActivity && result.stageActivity.sourceRef) || result.meta.theme.sourceRef);
  const sourceLine = sourceRef ? `${challengeCopy("Confirmed in", "Confirmado en")} ${sourceRef.split(";")[0].trim()}.` : "";
  const weekendLine = result.weekendBonus
    ? `${result.weekendBonus.name}: +${Number(result.weekendBonus.rewardXp || 0)} XP${result.weekendBonus.rewardLives ? ` • +${result.weekendBonus.rewardLives} life` : ""}.`
    : "";
  if (result.reviewFocus && result.reviewFocus.label) {
    return [sourceLine, weekendLine, `${challengeCopy("Review strengthened", "Repaso fortalecido")}: ${result.reviewFocus.label}.`].filter(Boolean).join(" ");
  }
  if (result.replay) {
    return [sourceLine, weekendLine, challengeCopy("You strengthened this Bible section again.", "Fortaleciste esta seccion biblica otra vez.")].filter(Boolean).join(" ");
  }
  if (result.nextMeta) {
    return [
      sourceLine,
      weekendLine,
      `${challengeCopy("Next unlocked", "Siguiente desbloqueado")}: ${result.nextMeta.theme.name} - ${t("stageLabel")} ${result.nextMeta.stage}.`
    ].filter(Boolean).join(" ");
  }
  return [sourceLine, weekendLine, challengeCopy("This section is complete. Keep moving through the story path.", "Esta seccion esta completa. Sigue avanzando por el camino de la historia.")].filter(Boolean).join(" ");
}

function showStageCompleteMoment(result, options = {}) {
  if (!result || !result.meta) return;
  const node = ensureStageCompleteToast();
  if (!node) return;

  const kicker = node.querySelector(".badge-unlock-kicker");
  const icon = node.querySelector(".badge-unlock-icon");
  const title = node.querySelector(".badge-unlock-title");
  const sub = node.querySelector(".badge-unlock-sub");

  if (kicker) {
    kicker.textContent = result.replay
      ? challengeCopy("Verse Confirmed Again", "Verso confirmado otra vez")
      : challengeCopy("Stage Complete", "Etapa completada");
  }
  if (icon) icon.textContent = result.replay ? "✓" : "✦";
  if (title) title.textContent = `${result.meta.theme.name} - ${t("stageLabel")} ${result.meta.stage}`;
  if (sub) sub.textContent = stageCompletionSummary(result);

  node.classList.add("show");
  duckMusicTemporarily(0.36, 1800);
  const sfxName = Object.prototype.hasOwnProperty.call(options, "sfx") ? options.sfx : "stage-clear";
  if (sfxName) playSfx(sfxName);
  if (stageCompleteToastTimer) window.clearTimeout(stageCompleteToastTimer);
  stageCompleteToastTimer = window.setTimeout(() => {
    node.classList.remove("show");
    stageCompleteToastTimer = 0;
  }, 1500);
}

function showFeatureMoment(titleText, detailText = "", options = {}) {
  const node = ensureStageCompleteToast();
  if (!node) return;

  const kicker = node.querySelector(".badge-unlock-kicker");
  const icon = node.querySelector(".badge-unlock-icon");
  const title = node.querySelector(".badge-unlock-title");
  const sub = node.querySelector(".badge-unlock-sub");

  if (kicker) kicker.textContent = options.kicker || challengeCopy("Daily Devotion Quest", "Mision devocional diaria");
  if (icon) icon.textContent = options.icon || "✦";
  if (title) title.textContent = titleText || challengeCopy("Updated", "Actualizado");
  if (sub) sub.textContent = detailText || "";

  node.classList.add("show");
  duckMusicTemporarily(
    typeof options.duckVolume === "number" ? options.duckVolume : 0.42,
    typeof options.duckMs === "number" ? options.duckMs : 1500
  );
  if (options.sfx !== null) playSfx(options.sfx || "success");
  if (stageCompleteToastTimer) window.clearTimeout(stageCompleteToastTimer);
  stageCompleteToastTimer = window.setTimeout(() => {
    node.classList.remove("show");
    stageCompleteToastTimer = 0;
  }, Math.max(1200, Number(options.durationMs || 1900)));
}

function hideStageCompleteToast() {
  if (stageCompleteToastTimer) {
    window.clearTimeout(stageCompleteToastTimer);
    stageCompleteToastTimer = 0;
  }
  if (stageCompleteToastNode) stageCompleteToastNode.classList.remove("show");
}

function eraReviewEntry(era) {
  const due = reviewDueEntries(24);
  const weak = weakestMasteryEntries(24);
  const combined = due.concat(weak.filter((entry) => !due.some((dueEntry) => dueEntry.key === entry.key)));
  return combined.find((entry) => entry && entry.era === era && !["interactive", "timing", "pattern", "collect", "balance", "route", "discern", "slingshot", "spotlight", "memoryflip", "sealbreak", "shieldwall"].includes(reviewKindFromEntry(entry))) || null;
}

function firstUnlockedStageForEra(era) {
  return stages.find((meta, index) => meta.theme.era === era && index + 1 <= state.unlocked)
    || stages.find((meta) => meta.theme.era === era)
    || null;
}

function hideEraFinale() {
  if (!eraFinaleOverlay) return;
  eraFinaleOverlay.classList.add("hidden");
  updateOverlayLock();
}

function ensureEraFinaleOverlay() {
  if (eraFinaleOverlay && eraFinaleOverlay.isConnected) return eraFinaleOverlay;
  if (!document.body) return null;

  const overlay = document.createElement("div");
  overlay.id = "eraFinaleOverlay";
  overlay.className = "welcome-overlay hidden";
  overlay.innerHTML = [
    '<div class="welcome-card final-card">',
    `<p class="eyebrow">${challengeCopy("Era Complete", "Era completada")}</p>`,
    '<h2 class="era-finale-title"></h2>',
    '<p class="era-finale-message"></p>',
    '<p class="era-finale-reflection meta"></p>',
    '<p class="era-finale-progress meta"></p>',
    '<p class="era-finale-verse meta"></p>',
    '<div class="era-finale-prayer-wrap" style="margin-top:1rem;text-align:left;">',
    '  <p class="era-finale-prayer-prompt meta"></p>',
    `  <textarea class="journal-input era-finale-prayer-input" rows="3" maxlength="280" placeholder="${challengeCopy("Write one short prayer response", "Escribe una breve oracion")}"></textarea>`,
    '  <div style="display:flex;gap:0.75rem;align-items:center;flex-wrap:wrap;margin-top:0.75rem;">',
    `    <button class="ghost-btn era-finale-prayer-save-btn" type="button">${challengeCopy("Save Prayer Response", "Guardar respuesta de oracion")}</button>`,
    '    <p class="era-finale-prayer-status meta" style="margin:0;"></p>',
    "  </div>",
    "</div>",
    '<div class="final-actions">',
    `<button class="cta-btn era-finale-continue-btn" type="button">${challengeCopy("Continue Journey", "Continuar")}</button>`,
    `<button class="ghost-btn era-finale-review-btn" type="button">${challengeCopy("Review This Era", "Repasar esta era")}</button>`,
    `<button class="ghost-btn era-finale-badge-btn" type="button">${challengeCopy("View Badge Board", "Ver tablero de insignias")}</button>`,
    "</div>",
    "</div>"
  ].join("");

  document.body.appendChild(overlay);
  eraFinaleOverlay = overlay;
  eraFinaleTitle = overlay.querySelector(".era-finale-title");
  eraFinaleMessage = overlay.querySelector(".era-finale-message");
  eraFinaleReflection = overlay.querySelector(".era-finale-reflection");
  eraFinaleProgress = overlay.querySelector(".era-finale-progress");
  eraFinaleVerse = overlay.querySelector(".era-finale-verse");
  eraFinalePrayerPrompt = overlay.querySelector(".era-finale-prayer-prompt");
  eraFinalePrayerInput = overlay.querySelector(".era-finale-prayer-input");
  eraFinalePrayerSaveBtn = overlay.querySelector(".era-finale-prayer-save-btn");
  eraFinalePrayerStatus = overlay.querySelector(".era-finale-prayer-status");
  eraFinaleContinueBtn = overlay.querySelector(".era-finale-continue-btn");
  eraFinaleReviewBtn = overlay.querySelector(".era-finale-review-btn");
  eraFinaleBadgeBtn = overlay.querySelector(".era-finale-badge-btn");

  if (eraFinaleContinueBtn) {
    eraFinaleContinueBtn.addEventListener("click", () => {
      hideEraFinale();
    });
  }
  if (eraFinaleReviewBtn) {
    eraFinaleReviewBtn.addEventListener("click", () => {
      const era = eraFinaleOverlay && eraFinaleOverlay.dataset ? eraFinaleOverlay.dataset.era : "";
      hideEraFinale();
      const reviewEntry = eraReviewEntry(era);
      if (reviewEntry) {
        beginSmartReviewFromEntry(reviewEntry, "weak");
        return;
      }
      const firstStage = firstUnlockedStageForEra(era);
      if (!firstStage) return;
      jumpToEra(era);
      window.setTimeout(() => focusStageCard(firstStage.id), 180);
    });
  }
  if (eraFinaleBadgeBtn) {
    eraFinaleBadgeBtn.addEventListener("click", () => {
      hideEraFinale();
      openBadgeShield();
    });
  }
  if (eraFinalePrayerInput) {
    eraFinalePrayerInput.addEventListener("input", () => {
      const era = eraFinaleOverlay && eraFinaleOverlay.dataset ? eraFinaleOverlay.dataset.era : "";
      if (!eraFinalePrayerSaveBtn) return;
      eraFinalePrayerSaveBtn.disabled = !String(eraFinalePrayerInput.value || "").trim();
      if (eraFinalePrayerStatus && era && !prayerResponseForEra(era)) {
        eraFinalePrayerStatus.textContent = challengeCopy("Save your prayer response for this chapter.", "Guarda tu respuesta de oracion para este capitulo.");
      }
    });
  }
  if (eraFinalePrayerSaveBtn) {
    eraFinalePrayerSaveBtn.addEventListener("click", () => {
      const era = eraFinaleOverlay && eraFinaleOverlay.dataset ? eraFinaleOverlay.dataset.era : "";
      if (!era || !eraFinalePrayerInput) return;
      const saved = savePrayerResponseForEra(era, eraFinalePrayerInput.value);
      if (!saved || !eraFinalePrayerStatus) return;
      eraFinalePrayerStatus.textContent = challengeCopy(`Saved ${saved.day}.`, `Guardado ${saved.day}.`);
      eraFinalePrayerSaveBtn.disabled = true;
      playSfx("success");
    });
  }
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) hideEraFinale();
  });

  return overlay;
}

function showEraFinale(era) {
  const overlay = ensureEraFinaleOverlay();
  if (!overlay) return;

  const copy = eraFinaleCopy(era);
  const eraStages = stages.filter((meta) => meta.theme.era === era);
  const completedCount = eraStages.filter((meta) => isDone(meta.id)).length;
  const firstStage = eraStages[0] || null;
  const reviewEntry = eraReviewEntry(era);

  overlay.dataset.era = era;
  if (eraFinaleTitle) eraFinaleTitle.textContent = copy.title;
  if (eraFinaleMessage) eraFinaleMessage.textContent = copy.body;
  if (eraFinaleReflection) eraFinaleReflection.textContent = copy.reflection;
  if (eraFinaleProgress) {
    eraFinaleProgress.textContent = `${completedCount}/${eraStages.length || 0} ${challengeCopy("stages completed in this chapter of the journey.", "etapas completadas en este capitulo del viaje.")}`;
  }
  if (eraFinaleVerse) {
    eraFinaleVerse.textContent = `${challengeCopy("Key range", "Rango clave")}: ${(firstStage && firstStage.theme && firstStage.theme.sourceRef) || formatEraLabel(era)}`;
  }
  refreshEraFinalePrayerState(era);
  if (eraFinaleReviewBtn) {
    eraFinaleReviewBtn.disabled = !reviewEntry && !firstUnlockedStageForEra(era);
  }

  overlay.classList.remove("hidden");
  updateOverlayLock();
  duckMusicTemporarily(0.34, 2200);
  playSfx("era-finale");
}

function maybeShowQueuedEraFinale() {
  if (!pendingEraFinaleEra) return false;
  if (state.activeStage || isStoryTheaterOpen() || isFinalOpen() || isCreditsOpen()) return false;
  const era = pendingEraFinaleEra;
  pendingEraFinaleEra = null;
  window.setTimeout(() => {
    if (!state.activeStage && !isFinalOpen() && !isCreditsOpen()) showEraFinale(era);
  }, 180);
  return true;
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
    navigator.share({ title: "FAITHSHIELD Badge", text }).catch(() => {
      copyTextToClipboardOrPrompt(text, () => {
        if (shareBadgeText) shareBadgeText.textContent = `${text} (Copied)`;
      });
    });
    return;
  }

  if (isDesktopViewport()) {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  copyTextToClipboardOrPrompt(text, () => {
    if (shareBadgeText) shareBadgeText.textContent = `${text} (Copied)`;
  });
}

function copyShareText() {
  const badge = currentShareBadge();
  if (!badge) return;
  const text = badgeShareMessage(badge);

  copyTextToClipboardOrPrompt(text, () => {
    if (shareBadgeText) shareBadgeText.textContent = `${text} (Copied)`;
  });
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
  const activeMeta = getStageMeta(activeStageId);
  const activeActivity = state.stageActivities[state.difficulty + ":" + activeStageId];
  const activityType = activeActivity && activeActivity.type
    ? (activeActivity.type === "interactive" && activeActivity.mode && activeActivity.mode.engine
      ? activeActivity.mode.engine
      : activeActivity.type)
    : "general";

  if (activeMeta && activeActivity) {
    recordMasteryOutcome(activeMeta, activeActivity, false);
  }

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
  clearStageAutoCloseTimer();
  if (typeof activeCleanup === "function") {
    activeCleanup();
    activeCleanup = null;
  }

  stopVerseAudio();

  if (typeof activeCutsceneCleanup === "function") {
    activeCutsceneCleanup();
    activeCutsceneCleanup = null;
  }
}

function releaseActiveChallengeRuntime() {
  if (typeof activeCleanup === "function") {
    activeCleanup();
    activeCleanup = null;
  }
}

function updateOverlayLock() {
  const activityOpen = activityOverlay && !activityOverlay.classList.contains("hidden");
  const welcomeOpen = welcomeOverlay && !welcomeOverlay.classList.contains("hidden");
  const shareOpen = shareOverlay && !shareOverlay.classList.contains("hidden");
  const shieldOpen = badgeShieldOverlay && !badgeShieldOverlay.classList.contains("hidden");
  const eraCardOpen = eraCardPreviewOverlay && !eraCardPreviewOverlay.classList.contains("hidden");
  const shareTextOpen = shareTextOverlay && !shareTextOverlay.classList.contains("hidden");
  const eraFinaleOpen = eraFinaleOverlay && !eraFinaleOverlay.classList.contains("hidden");
  const finalOpen = finalOverlay && !finalOverlay.classList.contains("hidden");
  const creditsOpen = creditsOverlay && !creditsOverlay.classList.contains("hidden");
  const theaterOpen = storyTheaterOverlay && !storyTheaterOverlay.classList.contains("hidden");
  document.body.classList.toggle("has-overlay", Boolean(activityOpen || welcomeOpen || shareOpen || shieldOpen || eraCardOpen || shareTextOpen || eraFinaleOpen || finalOpen || creditsOpen || theaterOpen));

}

function dismissWelcome(event) {
  if (!welcomeOverlay || welcomeOverlay.classList.contains("hidden")) return;
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  primeAudioAuto();
  welcomeOverlay.classList.add("hidden");
  updateOverlayLock();
  pendingStoryRecapReason = "";
  disarmStoryRecapRetry();
  playPreferredStoryRecap({ reason: "welcome-dismiss", force: true, ignoreUserActivation: true }).then((played) => {
    if (played) return;
    scheduleStoryReturnRecap("welcome-dismiss", 180);
  });
}

function closeActivity() {
  clearStageAutoCloseTimer();
  hideStageCompleteToast();
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
  const queuedReturnHandled = flushQueuedHubReturn();
  if (!queuedReturnHandled) restoreHubScrollPosition();
  maybeShowQueuedEraFinale();

  updateAudioState();
  window.setTimeout(() => {
    if (!state.activeStage && shouldKeepHubMusicAlive()) primeAudioAuto();
  }, 60);
}

function clearStageAutoCloseTimer() {
  if (!stageAutoCloseTimer) return;
  window.clearTimeout(stageAutoCloseTimer);
  stageAutoCloseTimer = 0;
}

function queueStageAutoClose(stageId, delayMs = 850) {
  clearStageAutoCloseTimer();
  if (state.activeStage === stageId) {
    releaseActiveChallengeRuntime();
  }
  stageAutoCloseTimer = window.setTimeout(() => {
    stageAutoCloseTimer = 0;
    if (state.activeStage === stageId) closeActivity();
  }, delayMs);
}

function isDesktopViewport() {
  return currentViewportWidth() >= 980;
}

function queueHubReturn(targetId = "storyPathHeading") {
  pendingHubReturnTargetId = targetId;
}

function captureHubScrollPosition(stageId = null) {
  if (Number.isFinite(window.scrollY)) {
    pendingHubReturnScrollY = Math.max(0, Math.round(window.scrollY));
  }
  pendingHubReturnStageId = stageId || state.activeStage || state.lastStage || null;
}

function restoreHubScrollPosition() {
  const hasScrollTarget = Number.isFinite(pendingHubReturnScrollY);
  const hasStageAnchor = Boolean(pendingHubReturnStageId);
  if (!hasScrollTarget && !hasStageAnchor) return;
  const y = hasScrollTarget ? Math.max(0, pendingHubReturnScrollY) : 0;
  const stageId = pendingHubReturnStageId;
  pendingHubReturnScrollY = null;
  pendingHubReturnStageId = null;

  const restore = () => {
    if (!hasScrollTarget) return;
    try {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    } catch (_) {
      window.scrollTo(0, y);
    }
  };
  const restoreStageAnchor = () => {
    if (!stageId) return;
    const card = stageGrid.querySelector(`[data-stage-id="${stageId}"]`);
    if (!card) return;
    card.scrollIntoView({ block: "center", inline: "nearest", behavior: "auto" });
  };

  restore();
  window.requestAnimationFrame(restore);
  window.setTimeout(restore, 80);
  window.setTimeout(restore, 180);
  window.setTimeout(restore, 360);
  window.setTimeout(restore, 520);
  if (hasStageAnchor) {
    window.requestAnimationFrame(restoreStageAnchor);
    window.setTimeout(restoreStageAnchor, 180);
    window.setTimeout(restoreStageAnchor, 420);
  }
}

function flushQueuedHubReturn() {
  const targetId = pendingHubReturnTargetId;
  pendingHubReturnTargetId = null;
  if (!targetId || !isDesktopViewport()) return false;

  const target = document.getElementById(targetId)
    || storyPathHeading
    || gameDashboard
    || document.querySelector(".progress-wrap");
  if (!target) return false;

  window.requestAnimationFrame(() => {
    target.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
  });
  pendingHubReturnScrollY = null;
  pendingHubReturnStageId = null;
  return true;
}

function completeStage(meta, mode, options = {}) {
  // Keep player at current scroll position unless an explicit return target is requested.
  captureHubScrollPosition(state.activeStage || meta.id);
  if (options.returnTarget) queueHubReturn(options.returnTarget);
  const result = markDone(meta.id, mode);
  if (result && !result.celebrationBadge) {
    showStageCompleteMoment(result, options);
  }
  const delayMs = options.delayMs || (result && result.celebrationBadge ? 1120 : 1680);
  queueStageAutoClose(meta.id, delayMs);
  return result;
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
  }

  const unlockedSetBonuses = awardBadgeSetBonuses();
  if (unlockedSetBonuses.length) {
    if (!unlocked.length) {
      state.lastBadge = `${unlockedSetBonuses[0].icon} ${unlockedSetBonuses[0].name}`;
    }
    unlocked.push(...unlockedSetBonuses);
  }

  return unlocked;
}

function pickCelebrationBadge(unlockedBadges, unlockedDifficultyBadge) {
  const finalBadge = Array.isArray(unlockedBadges)
    ? unlockedBadges.find((badge) => badge && badge.id === "final-shield-of-faith")
    : null;
  if (finalBadge) return finalBadge;
  if (Array.isArray(unlockedBadges) && unlockedBadges.length) return unlockedBadges[0];
  if (unlockedDifficultyBadge) return unlockedDifficultyBadge;
  return null;
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
  const meta = getStageMeta(stageId);
  const stageActivity = state.stageActivities[state.difficulty + ":" + stageId] || null;
  const nextMeta = meta ? nextStageMeta(meta) : null;
  const completedReviewFocus = state.reviewFocus && state.reviewFocus.stageId === stageId && stageActivity && stageActivity.reviewFocus
    ? { ...state.reviewFocus }
    : null;

  if (isDone(stageId)) {
    if (meta && stageActivity) {
      recordMasteryOutcome(meta, stageActivity, true);
      trackDailyAndWeeklyCompletion(meta, true);
    }
    if (completedReviewFocus) clearReviewFocus({ silent: true });
    const unlockedBadges = maybeAwardBadges();
    const celebrationBadge = pickCelebrationBadge(unlockedBadges, unlockedDifficultyBadge);
    if (celebrationBadge) {
      showBadgeUnlockMoment(celebrationBadge, { skipBoard: Boolean(celebrationBadge.skipBoard) });
      playSfx("badge");
    }
    persist();
    render();
    window.dispatchEvent(
      new CustomEvent("faith:stage-complete", {
        detail: {
          stageId,
          modeEngine,
          replay: true,
          difficulty: state.difficulty,
          eraFinaleEra: null
        }
      })
    );
    return {
      stageId,
      meta,
      stageActivity,
      modeEngine,
      replay: true,
      difficulty: state.difficulty,
      celebrationBadge,
      nextMeta,
      eraFinaleEra: null,
      reviewFocus: completedReviewFocus
    };
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
  let weekendBonus = null;
  if (meta && stageActivity) {
    recordMasteryOutcome(meta, stageActivity, true);
    weekendBonus = trackDailyAndWeeklyCompletion(meta, false);
  }
  if (completedReviewFocus) clearReviewFocus({ silent: true });

  let eraFinaleEra = null;
  if (meta && meta.theme && meta.theme.era) {
    const era = meta.theme.era;
    const eraStages = stages.filter((stage) => stage.theme.era === era);
    const eraComplete = eraStages.length > 0 && eraStages.every((stage) => isDone(stage.id));
    if (eraComplete && !state.stats.eraFinalesSeen[era]) {
      state.stats.eraFinalesSeen[era] = true;
      pendingEraFinaleEra = era;
      eraFinaleEra = era;
    }
  }

  const unlockedBadges = maybeAwardBadges();
  const celebrationBadge = pickCelebrationBadge(unlockedBadges, unlockedDifficultyBadge);
  if (celebrationBadge) {
    showBadgeUnlockMoment(celebrationBadge, { skipBoard: Boolean(celebrationBadge.skipBoard) });
    playSfx("badge");
  }
  persist();
  render();
  window.dispatchEvent(
      new CustomEvent("faith:stage-complete", {
        detail: {
          stageId,
          modeEngine,
          replay: false,
          difficulty: state.difficulty,
          eraFinaleEra,
          weekendBonus
        }
      })
    );
  return {
    stageId,
    meta,
    stageActivity,
    modeEngine,
    replay: false,
    difficulty: state.difficulty,
    celebrationBadge,
    nextMeta,
    eraFinaleEra,
    weekendBonus,
    reviewFocus: completedReviewFocus
  };
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
    badgeSetBonuses: {},
    difficultyPass: { easy: false, medium: false, advanced: false },
    eraFinalesSeen: {},
    chapterIntrosSeen: {}
  };
  state.activeStage = null;
  state.lastStage = null;
  state.lastBadge = "";
  state.finalSeen = false;
  state.questionHistory = {};
  state.stageActivities = {};
  state.mastery = {};
  state.reviewFocus = null;
  state.prayerResponses = {};
  state.dailyDevotion = {
    day: localDayKey(),
    challenge: false,
    action: false,
    reflection: false,
    reward: false,
    note: ""
  };
  const currentWeek = isoWeekKey();
  state.weeklyChallenge = {
    weekKey: currentWeek,
    era: pickWeeklyEraByKey(currentWeek),
    target: WEEKLY_CHALLENGE_TARGET,
    progress: 0,
    shared: false
  };
  state.dailyCalendar = {};
  ensureDailyCalendarEntry(localDayKey());

  stopFinaleMusic();
  stopCreditsMusic();
  closeShareOverlay();
  closeBadgeShield();
  hideEraFinale();
  pendingEraFinaleEra = null;
  if (stageCompleteToastTimer) {
    window.clearTimeout(stageCompleteToastTimer);
    stageCompleteToastTimer = 0;
  }
  if (stageCompleteToastNode) stageCompleteToastNode.classList.remove("show");
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

function canonicalQuestionBucket(bucket = "item") {
  return bucket;
}

function canonicalizeQuestionUsageRef(value) {
  const normalized = normalizeSourceRef(value);
  if (!normalized) return "";
  const parts = normalized.split("::").map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 3 && QUESTION_ACTIVITY_TYPES.has(parts[1])) {
    return [parts[0]].concat(parts.slice(2)).join("::");
  }
  if (parts.length >= 2 && QUESTION_ACTIVITY_TYPES.has(parts[0])) {
    return parts.slice(1).join("::");
  }
  return normalized;
}

function historyKeyForItem(item, bucket = "item") {
  const normalizedBucket = canonicalQuestionBucket(bucket);
  const source = normalizeSourceRef(item && item.sourceRef);
  const signature = itemSignature(item);
  if (source) return `${source}::${normalizedBucket}::${signature}`;
  return `${normalizedBucket}::${signature}`;
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

    const match = remainder.match(/^(\d+):(\d+)(?:-(?:(\d+):)?(\d+))?/);
    if (!book || !match) return;

    const startChapter = Number(match[1]);
    const startVerse = Number(match[2]);
    const endChapter = match[3] ? Number(match[3]) : startChapter;
    const endVerse = match[4] ? Number(match[4]) : startVerse;
    entries.push({ book, startChapter, endChapter, startVerse, endVerse });
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
  return `${canonicalQuestionBucket(bucket)}:theme:${theme.name}`;
}

function reviewScopeKey(theme, bucket, focus) {
  const sourceKey = canonicalizeQuestionUsageRef(focus && focus.source);
  if (!sourceKey) return `${themeScopeKey(theme, bucket)}:review`;
  return `${themeScopeKey(theme, bucket)}:review:${sourceKey}`;
}

function themeItemFilter(theme, focus = null) {
  return (item) => itemMatchesTheme(item, theme) && itemMatchesReviewFocus(item, focus);
}

function questionSourceGroup(bucket) {
  if (!bucket) return null;
  if (QUIZ_LINKED_ACTIVITY_TYPES.has(bucket)) return QUIZ_LINKED_ACTIVITY_TYPES;
  if (SEQUENCE_LINKED_ACTIVITY_TYPES.has(bucket)) return SEQUENCE_LINKED_ACTIVITY_TYPES;
  return new Set([bucket]);
}

function usedQuestionSourcesForDifficulty(difficultyId = state.difficulty, bucket = null, theme = null) {
  const used = new Set();
  const cachePrefix = `${difficultyId}:`;
  const strictThemeNoRepeat = Boolean(theme && STRICT_SECTION_NO_REPEAT_THEMES.has(theme.name));
  const typeGroup = strictThemeNoRepeat ? null : questionSourceGroup(bucket);
  const plan = theme ? themeReferencePlan(theme) : [];

  Object.entries(state.stageActivities || {}).forEach(([cacheKey, activity]) => {
    if (!String(cacheKey || "").startsWith(cachePrefix)) return;
    if (!activity || !QUESTION_ACTIVITY_TYPES.has(activity.type)) return;
    if (typeGroup && !typeGroup.has(activity.type)) return;
    const usageRef = canonicalizeQuestionUsageRef(activity.historySourceRef || activity.sourceRef);
    if (!usageRef) return;
    usageRef
      .split("||")
      .map((entry) => canonicalizeQuestionUsageRef(entry))
      .filter(Boolean)
      .forEach((entry) => {
        if (!plan.length) {
          used.add(entry);
          return;
        }
        const looksLikeSourceRef = /^[1-3]?\s?[A-Za-z]/.test(entry) && /\d+:\d+/.test(entry);
        if (looksLikeSourceRef && !sourceRefMatchesPlan(entry, plan)) return;
        used.add(entry);
      });
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

function buildFallbackQuizActivity(meta, theme, difficulty, usedSources, focus = null) {
  const themeFilter = themeItemFilter(theme, focus);
  const scopeKey = focus ? reviewScopeKey(theme, "quiz", focus) : themeScopeKey(theme, "quiz");
  const scopedUsedSources = focus ? null : usedSources;
  const selectionOptions = selectionConstraintsForTheme(theme, difficulty, focus);
  const authoredQuizPool = shouldIsolateThemeByDifficulty(theme)
    ? quizPoolForDifficulty(difficulty)
    : ALL_QUIZ_BANKS;
  const quizPool = dedupeActivityPool(authoredQuizPool.concat(derivedQuizPoolForTheme(theme, difficulty)), "quiz");
  const scopedQuizPool = quizPool.filter(themeFilter);
  const pick = pickWithoutRepeat(quizPool, theme.era, "quiz", {
    usedSources: scopedUsedSources,
    allowReuse: Boolean(focus),
    filter: themeFilter,
    scopeKey,
    requireScoped: true,
    ...selectionOptions
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

function buildFallbackSpellingActivity(meta, theme, difficulty, usedSources, focus = null) {
  const themeFilter = themeItemFilter(theme, focus);
  const scopeKey = focus ? reviewScopeKey(theme, "spelling", focus) : themeScopeKey(theme, "spelling");
  const scopedUsedSources = focus ? null : usedSources;
  const selectionOptions = selectionConstraintsForTheme(theme, difficulty, focus);
  const verseFillPool = derivedSpellingPoolForTheme(theme, difficulty);
  const authoredPool = shouldIsolateThemeByDifficulty(theme)
    ? spellingBankForDifficulty(difficulty).filter(themeFilter)
    : ALL_SPELLING_BANKS.filter(themeFilter);
  const pool = dedupeActivityPool(verseFillPool.concat(authoredPool), "spelling");
  const pick = pickWithoutRepeat(pool, theme.era, "spelling", {
    usedSources: scopedUsedSources,
    allowReuse: Boolean(focus),
    filter: themeFilter,
    scopeKey,
    requireScoped: true,
    ...selectionOptions
  });
  if (!pick.item) return null;

  return {
    type: "spelling",
    prompt: stagePrompt(meta, pick.item.prompt, pick.reuseCount),
    clue: pick.item.clue || "",
    answer: pick.item.answer,
    acceptedAnswers: Array.isArray(pick.item.acceptedAnswers) ? pick.item.acceptedAnswers.slice() : [],
    sourceRef: pick.item.sourceRef,
    historySourceRef: pick.item.historySourceRef || historyKeyForItem(pick.item, "spelling")
  };
}

function buildFallbackOrderActivity(meta, theme, difficulty, usedSources, focus = null) {
  const themeFilter = themeItemFilter(theme, focus);
  const scopeKey = focus ? reviewScopeKey(theme, "order", focus) : themeScopeKey(theme, "order");
  const scopedUsedSources = focus ? null : usedSources;
  const selectionOptions = selectionConstraintsForTheme(theme, difficulty, focus);
  const authoredOrderPool = shouldIsolateThemeByDifficulty(theme)
    ? orderBankForDifficulty(difficulty)
    : ALL_ORDER_BANKS;
  const orderPool = dedupeActivityPool(authoredOrderPool.concat(derivedOrderSetsForTheme(theme, difficulty)), "order");
  const pick = pickWithoutRepeat(orderPool, theme.era, "order", {
    usedSources: scopedUsedSources,
    allowReuse: Boolean(focus),
    filter: themeFilter,
    scopeKey,
    requireScoped: true,
    ...selectionOptions
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

function buildFallbackFactActivity(meta, theme, difficulty, usedSources, focus = null) {
  const themeFilter = themeItemFilter(theme, focus);
  const scopeKey = focus ? reviewScopeKey(theme, "fact", focus) : themeScopeKey(theme, "fact");
  const scopedUsedSources = focus ? null : usedSources;
  const selectionOptions = selectionConstraintsForTheme(theme, difficulty, focus);
  const authoredFactPool = shouldIsolateThemeByDifficulty(theme)
    ? factBankForDifficulty(difficulty)
    : ALL_FACT_BANKS;
  const factPool = dedupeActivityPool(authoredFactPool.concat(derivedFactPoolForTheme(theme, difficulty)), "fact");
  const pick = pickWithoutRepeat(factPool, theme.era, "fact", {
    usedSources: scopedUsedSources,
    allowReuse: Boolean(focus),
    filter: themeFilter,
    scopeKey,
    requireScoped: true,
    ...selectionOptions
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

function buildTrueFalseActivity(meta, theme, difficulty, usedSources, focus = null) {
  const themeFilter = themeItemFilter(theme, focus);
  const scopeKey = focus ? reviewScopeKey(theme, "truefalse", focus) : themeScopeKey(theme, "truefalse");
  const scopedUsedSources = focus ? null : usedSources;
  const selectionOptions = selectionConstraintsForTheme(theme, difficulty, focus);
  const quizPool = shouldIsolateThemeByDifficulty(theme)
    ? quizPoolForDifficulty(difficulty)
    : ALL_QUIZ_BANKS;
  const pick = pickWithoutRepeat(quizPool, theme.era, "truefalse", {
    usedSources: scopedUsedSources,
    allowReuse: Boolean(focus),
    filter: themeFilter,
    scopeKey,
    requireScoped: true,
    ...selectionOptions
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

function buildMatchingActivity(meta, theme, difficulty, usedSources, focus = null) {
  const themeFilter = themeItemFilter(theme, focus);
  const scopeKey = focus ? reviewScopeKey(theme, "matching", focus) : themeScopeKey(theme, "matching");
  const scopedUsedSources = focus ? null : usedSources;
  const selectionOptions = selectionConstraintsForTheme(theme, difficulty, focus);
  const matchingReferenceCounts = selectionOptions.refUsageCounts instanceof Map ? selectionOptions.refUsageCounts : null;
  const matchingMaxRefUses = Number.isFinite(Number(selectionOptions.maxRefUses)) ? Math.max(1, Number(selectionOptions.maxRefUses)) : null;
  const matchingReferenceKeyForItem = typeof selectionOptions.referenceKeyForItem === "function"
    ? selectionOptions.referenceKeyForItem
    : ((item) => primaryReferenceKeyForItem(item));
  const quizPool = shouldIsolateThemeByDifficulty(theme)
    ? quizPoolForDifficulty(difficulty)
    : ALL_QUIZ_BANKS;
  const scopedPool = quizPool.filter(themeFilter);
  const desiredCount = scopedPool.length >= 3 ? 3 : 2;
  const pick = pickManyWithoutRepeat(quizPool, theme.era, "matching", desiredCount, {
    usedSources: scopedUsedSources,
    allowReuse: Boolean(focus),
    filter: themeFilter,
    scopeKey,
    requireScoped: true,
    ...selectionOptions
  });
  if (!pick.items || pick.items.length < 2) return null;

  const selectedItems = [];
  const seenAnswers = new Set();
  const seenSignatures = new Set();
  const addedItems = [];

  const tryAdd = (item, trackAdded = false) => {
    if (!item || !item.answer) return false;
    const answerKey = normalizeQuizAnswerKey(item.answer);
    if (!answerKey || seenAnswers.has(answerKey)) return false;
    const signature = itemSignature(item);
    if (seenSignatures.has(signature)) return false;
    const refKey = matchingReferenceKeyForItem(item);
    if (matchingMaxRefUses && matchingReferenceCounts && refKey) {
      const currentRefCount = matchingReferenceCounts.get(refKey) || 0;
      const selectedRefCount = selectedItems.reduce((total, entry) => {
        return total + (matchingReferenceKeyForItem(entry) === refKey ? 1 : 0);
      }, 0);
      if (currentRefCount + selectedRefCount >= matchingMaxRefUses) return false;
    }
    seenAnswers.add(answerKey);
    seenSignatures.add(signature);
    selectedItems.push(item);
    if (trackAdded) addedItems.push(item);
    return true;
  };

  pick.items.forEach((item) => tryAdd(item, false));

  if (selectedItems.length < desiredCount) {
    const matchingUsageKey = (item) => canonicalizeQuestionUsageRef(item && (item.historySourceRef || historyKeyForItem(item, "matching")));
    const scopedUnusedBySource = (usedSources instanceof Set)
      ? scopedPool.filter((item) => {
        const usageKey = matchingUsageKey(item);
        return !usageKey || !usedSources.has(usageKey);
      })
      : scopedPool;

    for (const item of shuffled(scopedUnusedBySource)) {
      if (selectedItems.length >= desiredCount) break;
      tryAdd(item, true);
    }

    for (const item of shuffled(scopedPool)) {
      if (selectedItems.length >= desiredCount) break;
      tryAdd(item, true);
    }
  }

  if (selectedItems.length < 2) return null;
  const finalItems = selectedItems.slice(0, desiredCount);

  const stabilizedItems = [];
  const stabilizedAnswers = new Set();
  const stabilizedSignatures = new Set();
  const tryStabilize = (item) => {
    if (!item || !item.answer) return false;
    const answerKey = normalizeQuizAnswerKey(item.answer);
    if (!answerKey || stabilizedAnswers.has(answerKey)) return false;
    const signature = itemSignature(item);
    if (stabilizedSignatures.has(signature)) return false;
    stabilizedAnswers.add(answerKey);
    stabilizedSignatures.add(signature);
    stabilizedItems.push(item);
    return true;
  };

  finalItems.forEach(tryStabilize);
  if (stabilizedItems.length < desiredCount) {
    for (const item of shuffled(scopedPool)) {
      if (stabilizedItems.length >= desiredCount) break;
      tryStabilize(item);
    }
  }

  if (stabilizedItems.length < 2) return null;
  const renderItems = stabilizedItems.slice(0, Math.min(desiredCount, stabilizedItems.length));

  if (addedItems.length) {
    const historyKey = "global:" + canonicalQuestionBucket("matching") + ":" + scopeKey;
    const record = historyRecordFor(historyKey);
    addedItems.forEach((item) => {
      record.uses.push(itemSignature(item));
    });
    if (record.uses.length > 5000) {
      record.uses.splice(0, record.uses.length - 5000);
    }
    state.questionHistory[historyKey] = record;
  }

  const pairs = renderItems.map((item, index) => ({
    id: `${meta.id}-match-${index + 1}`,
    left: clueTextFromPrompt(item.prompt),
    right: item.answer
  }));

  return {
    type: "matching",
    prompt: stagePrompt(meta, challengeCopy("Match each Bible clue to the correct answer.", "Relaciona cada pista bíblica con la respuesta correcta."), pick.reuseCount),
    pairs,
    options: shuffled(pairs.map((pair) => pair.right)),
    sourceRef: renderItems.map((item) => item.sourceRef).join("; "),
    historySourceRef: renderItems.map((item) => item.historySourceRef || historyKeyForItem(item, "matching")).join(" || ")
  };
}

const HEBREW_NAME_MARKERS = [
  "yahweh",
  "lord yahweh",
  "adonai yahweh",
  "yahweh yireh",
  "yahweh nissi",
  "yahweh shalom",
  "yahweh of armies",
  "el shaddai",
  "el elyon",
  "el roi",
  "elohim",
  "god most high",
  "god almighty",
  "god who sees"
];

function isSpeakerQuestion(item) {
  const prompt = String(item && item.prompt || "").trim();
  return /^who (said|asked|answered|told|replied|cried)\b/i.test(prompt);
}

function isHebrewNameQuestion(item) {
  const prompt = String(item && item.prompt || "").toLowerCase();
  const answer = normalizeQuizAnswerKey(item && item.answer);
  if (HEBREW_NAME_MARKERS.some((marker) => answer.includes(marker))) return true;
  return /name of god|what does|which name|divine name|title of god|hebrew/i.test(prompt);
}

function shouldIsolateThemeByDifficulty(theme) {
  return Boolean(theme && STRICT_THEME_DIFFICULTY_ISOLATION.has(theme.name));
}

function quizPoolForDifficulty(difficulty) {
  if (difficulty.id === "advanced") return advancedQuizBank;
  if (difficulty.id === "medium") return mediumQuizBank;
  return quizBank;
}

function spellingBankForDifficulty(difficulty) {
  if (difficulty.id === "advanced") return advancedSpellingBank;
  if (difficulty.id === "medium") return mediumSpellingBank;
  return spellingBank;
}

function orderBankForDifficulty(difficulty) {
  if (difficulty.id === "advanced") return advancedOrderBank;
  if (difficulty.id === "medium") return mediumOrderBank;
  return orderBank;
}

function factBankForDifficulty(difficulty) {
  if (difficulty.id === "advanced") return advancedFactBank;
  if (difficulty.id === "medium") return mediumFactBank;
  return factBank;
}

function buildSpecialQuizActivity(meta, theme, difficulty, usedSources, kind, focus = null) {
  const kindFilter = kind === "speaker" ? isSpeakerQuestion : isHebrewNameQuestion;
  const themeFilter = (item) => themeItemFilter(theme, focus)(item) && kindFilter(item);
  const scopeKey = focus ? reviewScopeKey(theme, kind, focus) : themeScopeKey(theme, kind);
  const scopedUsedSources = focus ? null : usedSources;
  const selectionOptions = selectionConstraintsForTheme(theme, difficulty, focus);

  const preferred = quizPoolForDifficulty(difficulty);
  const combinedPool = shouldIsolateThemeByDifficulty(theme)
    ? preferred.slice()
    : preferred
      .concat(quizBank)
      .concat(mediumQuizBank)
      .concat(advancedQuizBank);
  const dedupedPool = [];
  const seen = new Set();
  combinedPool.forEach((item) => {
    const key = historyKeyForItem(item, "quiz");
    if (seen.has(key)) return;
    seen.add(key);
    dedupedPool.push(item);
  });

  const forcedAbramHebrewQuestion = !focus
    && kind === "hebrew"
    && difficulty.id === "medium"
    && theme && theme.name === "Call of Abram"
    && meta && meta.stage === 3
    && meta.level === 20
      ? dedupedPool.find((item) =>
          itemMatchesTheme(item, theme)
          && String(item.sourceRef || "").includes("Genesis 15:2")
          && normalizeQuizAnswerKey(item.answer) === "adonai yahweh"
        )
      : null;

  if (forcedAbramHebrewQuestion) {
    const q = forcedAbramHebrewQuestion;
    return {
      type: kind,
      prompt: stagePrompt(meta, `${challengeCopy("Names of God mode", "Modo Nombres de Dios")}: ${q.prompt}`, 0),
      options: buildQuizOptions(q, theme.era, difficulty.quizOptions, dedupedPool.filter(themeFilter)),
      answer: q.answer,
      sourceRef: q.sourceRef,
      historySourceRef: q.historySourceRef || historyKeyForItem(q, kind)
    };
  }

  const pick = pickWithoutRepeat(dedupedPool, theme.era, kind, {
    usedSources: scopedUsedSources,
    allowReuse: Boolean(focus),
    filter: themeFilter,
    scopeKey,
    requireScoped: true,
    ...selectionOptions
  });
  if (!pick.item) return null;

  const q = pick.item;
  const intro = kind === "speaker"
    ? challengeCopy("Who-Said-It mode", "Modo ¿Quién lo dijo?")
    : challengeCopy("Names of God mode", "Modo Nombres de Dios");
  return {
    type: kind,
    prompt: stagePrompt(meta, `${intro}: ${q.prompt}`, pick.reuseCount),
    options: buildQuizOptions(q, theme.era, difficulty.quizOptions, dedupedPool.filter(themeFilter)),
    answer: q.answer,
    sourceRef: q.sourceRef,
    historySourceRef: q.historySourceRef || historyKeyForItem(q, kind)
  };
}

function buildAuthoredActivityByKind(meta, theme, difficulty, usedSources, kind, focus = null) {
  const themeFilter = themeItemFilter(theme, focus);
  const scopeKey = focus ? reviewScopeKey(theme, kind, focus) : themeScopeKey(theme, kind);
  const scopedUsedSources = focus ? null : usedSources;
  const selectionOptions = selectionConstraintsForTheme(theme, difficulty, focus);

  if (kind === "speaker" || kind === "hebrew") {
    return buildSpecialQuizActivity(meta, theme, difficulty, usedSources, kind, focus);
  }

  if (kind === "quiz") {
    const quizSource = dedupeActivityPool(
      quizPoolForDifficulty(difficulty).concat(derivedQuizPoolForTheme(theme, difficulty)),
      "quiz"
    );
    const scopedQuizSource = quizSource.filter(themeFilter);
    const pick = pickWithoutRepeat(quizSource, theme.era, "quiz", {
      usedSources: scopedUsedSources,
      allowReuse: Boolean(focus),
      filter: themeFilter,
      scopeKey,
      requireScoped: true,
      ...selectionOptions
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
    const forcedAbramSpellingQuestion = !focus
      && difficulty.id === "medium"
      && theme && theme.name === "Call of Abram"
      && meta && meta.stage === 2
      && meta.level === 20
        ? mediumSpellingBank.find((item) =>
            itemMatchesTheme(item, theme)
            && String(item.sourceRef || "").includes("Genesis 12:6-7")
            && normalizeSpellingAnswer(item.answer) === "shechem"
          )
        : null;

    if (forcedAbramSpellingQuestion) {
      return {
        type: "spelling",
        prompt: stagePrompt(meta, forcedAbramSpellingQuestion.prompt, 0),
        clue: forcedAbramSpellingQuestion.clue || "",
        answer: forcedAbramSpellingQuestion.answer,
        acceptedAnswers: Array.isArray(forcedAbramSpellingQuestion.acceptedAnswers)
          ? forcedAbramSpellingQuestion.acceptedAnswers.slice()
          : [],
        sourceRef: forcedAbramSpellingQuestion.sourceRef,
        historySourceRef: forcedAbramSpellingQuestion.historySourceRef || historyKeyForItem(forcedAbramSpellingQuestion, "spelling")
      };
    }

    const authoredSpellingSource = spellingBankForDifficulty(difficulty);
    const spellingSource = dedupeActivityPool(
      derivedSpellingPoolForTheme(theme, difficulty).concat(authoredSpellingSource.filter(themeFilter)),
      "spelling"
    );
    const pick = pickWithoutRepeat(spellingSource, theme.era, "spelling", {
      usedSources: scopedUsedSources,
      allowReuse: Boolean(focus),
      filter: themeFilter,
      scopeKey,
      requireScoped: true,
      ...selectionOptions
    });
    if (!pick.item) return null;
    const s = pick.item;
    return {
      type: "spelling",
      prompt: stagePrompt(meta, s.prompt, pick.reuseCount),
      clue: s.clue || "",
      answer: s.answer,
      acceptedAnswers: Array.isArray(s.acceptedAnswers) ? s.acceptedAnswers.slice() : [],
      sourceRef: s.sourceRef,
      historySourceRef: s.historySourceRef || historyKeyForItem(s, "spelling")
    };
  }

  if (kind === "order") {
    const orderSource = dedupeActivityPool(
      orderBankForDifficulty(difficulty).filter(themeFilter).concat(derivedOrderSetsForTheme(theme, difficulty)),
      "order"
    );
    const pick = pickWithoutRepeat(orderSource, theme.era, "order", {
      usedSources: scopedUsedSources,
      allowReuse: Boolean(focus),
      filter: themeFilter,
      scopeKey,
      requireScoped: true,
      ...selectionOptions
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
    const forcedAbramFactLevel22 = !focus
      && theme && theme.name === "Call of Abram"
      && meta && meta.stage === 3
      && meta.level === 22
        ? {
            era: theme.era,
            parts: ["I", "am", "Yahweh", "who", "brought", "you", "out", "of", "Ur"],
            sourceRef: "Genesis 15:7"
          }
        : null;

    if (forcedAbramFactLevel22) {
      const factMode = buildFactActivity(forcedAbramFactLevel22, theme.era, difficulty);
      return {
        type: "fact",
        prompt: stagePrompt(meta, t("buildFactOrder"), 0),
        answerParts: factMode.answerParts,
        prefilled: factMode.prefilled,
        parts: factMode.pool,
        sourceRef: forcedAbramFactLevel22.sourceRef,
        historySourceRef: historyKeyForItem(forcedAbramFactLevel22, "fact")
      };
    }

    const forcedAbramFactQuestion = !focus
      && difficulty.id === "medium"
      && theme && theme.name === "Call of Abram"
      && meta && meta.stage === 2
      && meta.level === 19
        ? mediumFactBank.find((item) =>
            itemMatchesTheme(item, theme)
            && String(item.sourceRef || "").includes("Genesis 15:2")
            && Array.isArray(item.parts)
            && item.parts.join(" ") === "Lord Yahweh what will you give me"
          )
        : null;

    if (forcedAbramFactQuestion) {
      const factMode = buildFactActivity(forcedAbramFactQuestion, theme.era, difficulty);
      return {
        type: "fact",
        prompt: stagePrompt(meta, t("buildFactOrder"), 0),
        answerParts: factMode.answerParts,
        prefilled: factMode.prefilled,
        parts: factMode.pool,
        sourceRef: forcedAbramFactQuestion.sourceRef,
        historySourceRef: forcedAbramFactQuestion.historySourceRef || historyKeyForItem(forcedAbramFactQuestion, "fact")
      };
    }

    const factSource = dedupeActivityPool(
      factBankForDifficulty(difficulty).filter(themeFilter).concat(derivedFactPoolForTheme(theme, difficulty)),
      "fact"
    );
    const pick = pickWithoutRepeat(factSource, theme.era, "fact", {
      usedSources: scopedUsedSources,
      allowReuse: Boolean(focus),
      filter: themeFilter,
      scopeKey,
      requireScoped: true,
      ...selectionOptions
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
    1: ["quiz", "speaker", "truefalse", "matching", "order", "fact", "spelling", "hebrew"],
    2: ["order", "matching", "hebrew", "quiz", "fact", "spelling", "speaker", "truefalse"],
    3: ["fact", "spelling", "speaker", "matching", "quiz", "order", "hebrew", "truefalse"],
    4: ["hebrew", "truefalse", "order", "speaker", "quiz", "fact", "matching", "spelling"]
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
    speaker: "Who-Said-It questions",
    hebrew: "Hebrew name questions",
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

  const normalizedBucket = canonicalQuestionBucket(bucket);
  const usedSources = options.usedSources instanceof Set ? options.usedSources : null;
  const usageKeyForItem = (item) => canonicalizeQuestionUsageRef(item && (item.historySourceRef || historyKeyForItem(item, normalizedBucket)));

  const sourceFiltered = usedSources
    ? source.filter((item) => {
      const usageKey = usageKeyForItem(item);
      return !usageKey || !usedSources.has(usageKey);
    })
    : source;

  const refUsageCounts = options.refUsageCounts instanceof Map ? options.refUsageCounts : null;
  const maxRefUses = Number.isFinite(Number(options.maxRefUses)) ? Math.max(1, Number(options.maxRefUses)) : null;
  const referenceKeyForItem = typeof options.referenceKeyForItem === "function"
    ? options.referenceKeyForItem
    : ((item) => primaryReferenceKeyForItem(item));
  const refFiltered = maxRefUses && refUsageCounts
    ? sourceFiltered.filter((item) => {
      const refKey = referenceKeyForItem(item);
      return !refKey || (refUsageCounts.get(refKey) || 0) < maxRefUses;
    })
    : sourceFiltered;

  const pickPool = usedSources ? (refFiltered.length ? refFiltered : sourceFiltered) : (refFiltered.length ? refFiltered : source);
  if (!pickPool.length) return { item: null, reuseCount: 0 };

  const historyScope = options.scopeKey || (scopedPool.length ? era : "all");
  const historyKey = "global:" + normalizedBucket + ":" + historyScope;
  const record = historyRecordFor(historyKey);
  const counts = {};
  const recentSet = recentUseSet(record, options.recentWindow || 3);

  record.uses.forEach((signature) => {
    counts[signature] = (counts[signature] || 0) + 1;
  });

  const unseen = pickPool.filter((item) => !counts[itemSignature(item)]);
  let choice = null;
  let reuseCount = 0;

  if (unseen.length) {
    const unseenNotRecent = unseen.filter((item) => !recentSet.has(itemSignature(item)));
    const unseenPool = unseenNotRecent.length ? unseenNotRecent : unseen;
    const rankedUnseen = unseenPool
      .slice()
      .sort((a, b) => {
        const aRefCount = refUsageCounts ? (refUsageCounts.get(referenceKeyForItem(a)) || 0) : 0;
        const bRefCount = refUsageCounts ? (refUsageCounts.get(referenceKeyForItem(b)) || 0) : 0;
        if (aRefCount !== bRefCount) return aRefCount - bRefCount;
        return Math.random() - 0.5;
      });
    choice = rankedUnseen[0] || null;
  } else if (options.allowReuse) {
    const reusablePool = pickPool
      .slice()
      .sort((a, b) => {
        const aRefCount = refUsageCounts ? (refUsageCounts.get(referenceKeyForItem(a)) || 0) : 0;
        const bRefCount = refUsageCounts ? (refUsageCounts.get(referenceKeyForItem(b)) || 0) : 0;
        if (aRefCount !== bRefCount) return aRefCount - bRefCount;
        const aCount = counts[itemSignature(a)] || 0;
        const bCount = counts[itemSignature(b)] || 0;
        if (aCount !== bCount) return aCount - bCount;
        const aRecent = recentSet.has(itemSignature(a)) ? 1 : 0;
        const bRecent = recentSet.has(itemSignature(b)) ? 1 : 0;
        return aRecent - bRecent;
      });
    choice = reusablePool[0] || null;
    reuseCount = choice ? (counts[itemSignature(choice)] || 0) : 0;
  }

  if (!choice) return { item: null, reuseCount: 0 };

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

  const normalizedBucket = canonicalQuestionBucket(bucket);
  const usedSources = options.usedSources instanceof Set ? options.usedSources : null;
  const usageKeyForItem = (item) => canonicalizeQuestionUsageRef(item && (item.historySourceRef || historyKeyForItem(item, normalizedBucket)));
  const historyScope = options.scopeKey || (scopedPool.length ? era : "all");
  const historyKey = "global:" + normalizedBucket + ":" + historyScope;
  const record = historyRecordFor(historyKey);
  const counts = {};
  const recentSet = recentUseSet(record, options.recentWindow || Math.max(2, count));

  record.uses.forEach((signature) => {
    counts[signature] = (counts[signature] || 0) + 1;
  });

  const filterBySource = (items) => (usedSources
    ? items.filter((item) => {
      const usageKey = usageKeyForItem(item);
      return !usageKey || !usedSources.has(usageKey);
    })
    : items);

  const refUsageCounts = options.refUsageCounts instanceof Map ? options.refUsageCounts : null;
  const maxRefUses = Number.isFinite(Number(options.maxRefUses)) ? Math.max(1, Number(options.maxRefUses)) : null;
  const referenceKeyForItem = typeof options.referenceKeyForItem === "function"
    ? options.referenceKeyForItem
    : ((item) => primaryReferenceKeyForItem(item));

  const filterByReferenceCap = (items) => (!maxRefUses || !refUsageCounts
    ? items
    : items.filter((item) => {
      const refKey = referenceKeyForItem(item);
      return !refKey || (refUsageCounts.get(refKey) || 0) < maxRefUses;
    }));

  const buildSelection = (items) => {
    const ranked = shuffled(items).sort((a, b) => {
      const aRefCount = refUsageCounts ? (refUsageCounts.get(referenceKeyForItem(a)) || 0) : 0;
      const bRefCount = refUsageCounts ? (refUsageCounts.get(referenceKeyForItem(b)) || 0) : 0;
      if (aRefCount !== bRefCount) return aRefCount - bRefCount;
      const aCount = counts[itemSignature(a)] || 0;
      const bCount = counts[itemSignature(b)] || 0;
      if (aCount !== bCount) return aCount - bCount;
      const aRecent = recentSet.has(itemSignature(a)) ? 1 : 0;
      const bRecent = recentSet.has(itemSignature(b)) ? 1 : 0;
      return aRecent - bRecent;
    });
    const unseenRanked = ranked.filter((item) => !counts[itemSignature(item)]);
    const preferredRanked = unseenRanked.filter((item) => !recentSet.has(itemSignature(item)));
    const sourceRanked = preferredRanked.length >= count ? preferredRanked : unseenRanked;
    const picked = [];
    const seen = new Set();
    const localRefCounts = new Map();

    sourceRanked.forEach((item) => {
      const signature = itemSignature(item);
      if (seen.has(signature)) return;
      const refKey = referenceKeyForItem(item);
      if (maxRefUses && refUsageCounts && refKey) {
        const currentRefCount = refUsageCounts.get(refKey) || 0;
        const localRefCount = localRefCounts.get(refKey) || 0;
        if (currentRefCount + localRefCount >= maxRefUses) return;
        localRefCounts.set(refKey, localRefCount + 1);
      }
      seen.add(signature);
      picked.push(item);
    });

    return picked.slice(0, count);
  };

  let candidates = buildSelection(filterByReferenceCap(filterBySource(source)));

  if (candidates.length < count && options.allowReuse) {
    const reusable = shuffled(filterByReferenceCap(filterBySource(source))).sort((a, b) => {
      const aRefCount = refUsageCounts ? (refUsageCounts.get(referenceKeyForItem(a)) || 0) : 0;
      const bRefCount = refUsageCounts ? (refUsageCounts.get(referenceKeyForItem(b)) || 0) : 0;
      if (aRefCount !== bRefCount) return aRefCount - bRefCount;
      const aCount = counts[itemSignature(a)] || 0;
      const bCount = counts[itemSignature(b)] || 0;
      if (aCount !== bCount) return aCount - bCount;
      const aRecent = recentSet.has(itemSignature(a)) ? 1 : 0;
      const bRecent = recentSet.has(itemSignature(b)) ? 1 : 0;
      return aRecent - bRecent;
    });
    const seenReuse = new Set(candidates.map((item) => itemSignature(item)));
    reusable.forEach((item) => {
      const signature = itemSignature(item);
      if (candidates.length >= count || seenReuse.has(signature)) return;
      seenReuse.add(signature);
      candidates.push(item);
    });
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

function themeScopedQuizItems(theme, sourcePool = ALL_QUIZ_BANKS) {
  return (Array.isArray(sourcePool) && sourcePool.length ? sourcePool : ALL_QUIZ_BANKS)
    .filter((item) => itemMatchesTheme(item, theme))
    .map((item) => {
      const entry = referenceEntriesFromSourceRef(item.sourceRef || "")[0];
      return entry ? { item, entry } : null;
    })
    .filter(Boolean)
    .sort((a, b) => compareReferenceEntries(a.entry, b.entry))
    .map(({ item }) => item);
}

function themeScopedFactItems(theme, sourcePool = ALL_FACT_BANKS) {
  return (Array.isArray(sourcePool) && sourcePool.length ? sourcePool : ALL_FACT_BANKS)
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
const VERSE_FILL_PRIORITY_WORDS = [
  "flood",
  "rainbow",
  "covenant",
  "ark",
  "noah",
  "dove",
  "raven",
  "language",
  "babel",
  "shinar",
  "nimrod"
];

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

function prioritizeVerseFillCandidates(candidates = []) {
  if (!Array.isArray(candidates) || !candidates.length) return [];
  const baseOrder = new Map();
  candidates.forEach((word, index) => {
    if (!baseOrder.has(word)) baseOrder.set(word, index);
  });
  const priorityRank = new Map();
  VERSE_FILL_PRIORITY_WORDS.forEach((word, index) => {
    priorityRank.set(word, index);
  });

  let ordered = candidates.slice().sort((a, b) => {
    const rankA = priorityRank.has(a) ? priorityRank.get(a) : Number.POSITIVE_INFINITY;
    const rankB = priorityRank.has(b) ? priorityRank.get(b) : Number.POSITIVE_INFINITY;
    if (rankA !== rankB) return rankA - rankB;
    return (baseOrder.get(a) || 0) - (baseOrder.get(b) || 0);
  });

  if (ordered.includes("flood")) {
    ordered = ordered.filter((word) => !["waters", "become", "more"].includes(word));
    ordered = ["flood"].concat(ordered.filter((word) => word !== "flood"));
  }

  return ordered;
}

function dedupeActivityPool(items = [], bucket = "item") {
  const seen = new Set();
  return items.filter((item) => {
    const usageKey = canonicalizeQuestionUsageRef(item && (item.historySourceRef || historyKeyForItem(item, bucket)));
    const fallbackKey = usageKey || `${bucket}::${itemSignature(item)}`;
    if (!fallbackKey || seen.has(fallbackKey)) return false;
    seen.add(fallbackKey);
    return true;
  });
}

function displayWordMapFromFactItems(items = []) {
  const map = new Map();
  items.forEach((item) => {
    const parts = Array.isArray(item && item.parts) ? item.parts : [];
    parts.forEach((part) => {
      const normalized = normalizeVerseFillWord(part);
      const cleaned = String(part || "").replace(/[.,;:!?()\[\]"“”]/g, "").trim();
      if (!normalized || !cleaned || map.has(normalized)) return;
      map.set(normalized, cleaned);
    });
  });
  return map;
}

function displayWordForNormalized(normalized, displayMap = new Map()) {
  return displayMap.get(normalized) || normalized;
}

function phrasePartsFromLabel(label) {
  return String(label || "")
    .split(/\s+/)
    .map((part) => String(part || "").replace(/^[^\wÀ-ÿ']+|[^\wÀ-ÿ']+$/g, "").trim())
    .filter(Boolean);
}

function buildVerseFillPoolFromFactItem(item) {
  const parts = Array.isArray(item.parts) ? item.parts.map((part) => String(part || "").trim()) : [];
  if (parts.length < 3) return [];

  const candidates = prioritizeVerseFillCandidates(verseFillWordCandidates(parts)).slice(0, 5);
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
        acceptedAnswers: normalizeSpellingAnswer(parts[blankIndex]) === "flood" ? ["flooding"] : [],
        sourceRef: item.sourceRef,
        historySourceRef: `${item.sourceRef}::versefill::${answer}::${index + 1}`
      };
  }).filter(Boolean);
}

function buildVerseFillQuizPoolFromFactItems(items = []) {
  if (!items.length) return [];

  const displayMap = displayWordMapFromFactItems(items);
  const themeWords = uniqueList(
    items.flatMap((item) => prioritizeVerseFillCandidates(verseFillWordCandidates(item.parts || [])))
  );

  return items.flatMap((item, itemIndex) => {
    const parts = Array.isArray(item.parts) ? item.parts.map((part) => String(part || "").trim()) : [];
    if (parts.length < 3) return [];

    const candidates = prioritizeVerseFillCandidates(verseFillWordCandidates(parts)).slice(0, 4);
    return candidates.map((answerKey, answerIndex) => {
      const blankIndex = parts.findIndex((part) => normalizeVerseFillWord(part) === answerKey);
      if (blankIndex === -1) return null;

      const answer = parts[blankIndex].replace(/[.,;:!?()\[\]"“”]/g, "").trim();
      if (!answer) return null;

      const clueParts = parts.slice();
      clueParts[blankIndex] = "____";
      const distractors = shuffled(themeWords.filter((word) => normalizeQuizAnswerKey(word) !== normalizeQuizAnswerKey(answer)))
        .map((word) => displayWordForNormalized(word, displayMap));
      const options = [];
      const seen = new Set();
      const addOption = (option) => {
        const text = String(option || "").trim();
        const key = normalizeQuizAnswerKey(text);
        if (!text || !key || seen.has(key)) return;
        seen.add(key);
        options.push(text);
      };

      addOption(answer);
      distractors.forEach(addOption);
      FALLBACK_QUIZ_DISTRACTORS.forEach(addOption);

      if (options.length < 4) return null;

      return {
        era: item.era,
        prompt: challengeCopy(
          `Which word completes this Bible line? ${clueParts.join(" ")}`,
          `¿Qué palabra completa esta línea bíblica? ${clueParts.join(" ")}`
        ),
        options: shuffled(options.slice(0, 4)),
        answer,
        sourceRef: item.sourceRef,
        historySourceRef: `${item.sourceRef}::quiz::verse-fill::${answerKey}::${itemIndex + 1}-${answerIndex + 1}`
      };
    }).filter(Boolean);
  });
}

function partItemsFromOrderItems(items = []) {
  return items.flatMap((item, itemIndex) => {
    const labels = Array.isArray(item && item.items) ? item.items : [];
    const refs = referenceEntriesFromSourceRef(item && item.sourceRef || "").map((entry) => entry.ref);
    return labels.map((label, labelIndex) => {
      const parts = phrasePartsFromLabel(label);
      if (parts.length < 2) return null;
      const sourceRef = refs[labelIndex] || item.sourceRef;
      return {
        era: item.era,
        parts,
        sourceRef,
        historySourceRef: `${sourceRef}::label-parts::${normalizeQuizAnswerKey(label)}::${itemIndex + 1}-${labelIndex + 1}`
      };
    }).filter(Boolean);
  });
}

function summaryFactItemsForTheme(theme) {
  const parts = phrasePartsFromLabel(theme && theme.fact);
  if (!theme || parts.length < 3 || !theme.sourceRef) return [];
  return [{
    era: theme.era,
    parts,
    sourceRef: theme.sourceRef,
    historySourceRef: `${theme.sourceRef}::theme-summary::${normalizeQuizAnswerKey(theme.fact)}`
  }];
}

function interactiveModeSetsForTheme(theme) {
  if (!theme || !theme.name || !STAGE_FIVE_THEMED_POOLS) return [];
  const sets = STAGE_FIVE_THEMED_POOLS[theme.name];
  return Array.isArray(sets) ? sets : [];
}

function buildQuizItemsFromInteractiveSets(theme, sets = []) {
  return sets.flatMap((set, setIndex) => {
    if (!Array.isArray(set && set.targets) || !Array.isArray(set && set.cards) || set.cards.length < 2) return [];
    const cardLabels = uniqueList(
      set.cards
        .map((card) => String(card && card.label || "").trim())
        .filter(Boolean)
    );
    return set.targets.map((target, targetIndex) => {
      const prompt = String(target && target.prompt || "").trim();
      const correctCard = set.cards[target && Number.isInteger(target.correctIndex) ? target.correctIndex : -1];
      const answer = String(correctCard && correctCard.label || "").trim();
      if (!prompt || !answer) return null;

      const options = [];
      const seen = new Set();
      const addOption = (option) => {
        const text = String(option || "").trim();
        const key = normalizeQuizAnswerKey(text);
        if (!text || !key || seen.has(key)) return;
        seen.add(key);
        options.push(text);
      };

      addOption(answer);
      cardLabels.forEach(addOption);
      FALLBACK_QUIZ_DISTRACTORS.forEach(addOption);
      if (options.length < 4) return null;

      return {
        era: theme.era,
        prompt,
        options: shuffled(options.slice(0, 4)),
        answer,
        sourceRef: set.sourceRef || theme.sourceRef,
        historySourceRef: `${set.sourceRef || theme.sourceRef}::interactive-quiz::${normalizeQuizAnswerKey(prompt)}::${setIndex + 1}-${targetIndex + 1}`
      };
    }).filter(Boolean);
  });
}

function buildOrderSetsFromInteractiveSets(theme, sets = []) {
  const built = [];
  sets.forEach((set, setIndex) => {
    if (Array.isArray(set && set.routeSteps) && set.routeSteps.length >= 2) {
      const labels = set.routeSteps
        .map((step) => String(step && step.label || "").trim())
        .filter(Boolean);
      if (labels.length >= 2) {
        built.push({
          era: theme.era,
          items: labels.slice(0, Math.min(3, labels.length)),
          sourceRef: set.sourceRef || theme.sourceRef,
          historySourceRef: `${set.sourceRef || theme.sourceRef}::interactive-order::route::${setIndex + 1}`
        });
      }
    }

    if (Array.isArray(set && set.sequences) && Array.isArray(set && set.pads) && set.sequences.length) {
      const labels = set.sequences
        .slice(0, 2)
        .map((sequence, sequenceIndex) => {
          const ordered = (Array.isArray(sequence) ? sequence : [])
            .map((index) => set.pads[index])
            .map((pad) => String(pad && pad.label || "").trim())
            .filter(Boolean);
          if (ordered.length < 2) return null;
          return {
            era: theme.era,
            items: ordered.slice(0, Math.min(3, ordered.length)),
            sourceRef: set.sourceRef || theme.sourceRef,
            historySourceRef: `${set.sourceRef || theme.sourceRef}::interactive-order::pattern::${setIndex + 1}-${sequenceIndex + 1}`
          };
        })
        .filter(Boolean);
      built.push(...labels);
    }
  });
  return built;
}

const THEME_DERIVED_POOL_RULES = {
  "Call of Abram": {
    quiz: { perRef: 1, maxItems: 10 },
    spelling: { perRef: 1, maxItems: 10 },
    orderBase: { perRef: 1, maxItems: 8 },
    order: { perRef: 1, maxItems: 12 },
    fact: { perRef: 1, maxItems: 14 }
  },
  "Promise Family": {
    quiz: { perRef: 1, maxItems: 10 },
    spelling: { perRef: 1, maxItems: 10 },
    orderBase: { perRef: 1, maxItems: 8 },
    order: { perRef: 1, maxItems: 12 },
    fact: { perRef: 1, maxItems: 14 }
  },
  "Jacob to Israel": {
    quiz: { perRef: 1, maxItems: 10 },
    spelling: { perRef: 1, maxItems: 10 },
    orderBase: { perRef: 1, maxItems: 8 },
    order: { perRef: 1, maxItems: 12 },
    fact: { perRef: 1, maxItems: 14 }
  },
  "Joseph in Egypt": {
    quiz: { perRef: 1, maxItems: 10 },
    spelling: { perRef: 1, maxItems: 10 },
    orderBase: { perRef: 1, maxItems: 8 },
    order: { perRef: 1, maxItems: 12 },
    fact: { perRef: 1, maxItems: 14 }
  },
  "Burning Bush": {
    quiz: { perRef: 1, maxItems: 10 },
    spelling: { perRef: 1, maxItems: 10 },
    orderBase: { perRef: 1, maxItems: 8 },
    order: { perRef: 1, maxItems: 12 },
    fact: { perRef: 1, maxItems: 14 }
  },
  "Plagues and Passover": {
    quiz: { perRef: 1, maxItems: 10 },
    spelling: { perRef: 1, maxItems: 10 },
    orderBase: { perRef: 1, maxItems: 8 },
    order: { perRef: 1, maxItems: 12 },
    fact: { perRef: 1, maxItems: 14 }
  },
  "Sea Crossing": {
    quiz: { perRef: 1, maxItems: 10 },
    spelling: { perRef: 1, maxItems: 10 },
    orderBase: { perRef: 1, maxItems: 8 },
    order: { perRef: 1, maxItems: 12 },
    fact: { perRef: 1, maxItems: 14 }
  },
  "Sinai Covenant": {
    quiz: { perRef: 1, maxItems: 10 },
    spelling: { perRef: 1, maxItems: 10 },
    orderBase: { perRef: 1, maxItems: 8 },
    order: { perRef: 1, maxItems: 12 },
    fact: { perRef: 1, maxItems: 14 }
  },
  "Wilderness Trust": {
    quiz: { perRef: 1, maxItems: 10 },
    spelling: { perRef: 1, maxItems: 10 },
    orderBase: { perRef: 1, maxItems: 8 },
    order: { perRef: 1, maxItems: 12 },
    fact: { perRef: 1, maxItems: 14 }
  }
};

const THEME_DIFFICULTY_REFERENCE_CAPS = {
  "Call of Abram": {
    easy: { perRef: 3 },
    medium: { perRef: 3 },
    advanced: { perRef: 2 }
  },
  "Promise Family": {
    easy: { perRef: 3 },
    medium: { perRef: 3 },
    advanced: { perRef: 2 }
  },
  "Jacob to Israel": {
    easy: { perRef: 3 },
    medium: { perRef: 3 },
    advanced: { perRef: 2 }
  },
  "Joseph in Egypt": {
    easy: { perRef: 3 },
    medium: { perRef: 3 },
    advanced: { perRef: 2 }
  },
  "Burning Bush": {
    easy: { perRef: 3 },
    medium: { perRef: 3 },
    advanced: { perRef: 2 }
  },
  "Plagues and Passover": {
    easy: { perRef: 3 },
    medium: { perRef: 3 },
    advanced: { perRef: 2 }
  },
  "Sea Crossing": {
    easy: { perRef: 3 },
    medium: { perRef: 3 },
    advanced: { perRef: 2 }
  },
  "Sinai Covenant": {
    easy: { perRef: 3 },
    medium: { perRef: 3 },
    advanced: { perRef: 2 }
  },
  "Wilderness Trust": {
    easy: { perRef: 3 },
    medium: { perRef: 3 },
    advanced: { perRef: 2 }
  }
};

function primaryReferenceKeyForItem(item) {
  const refs = referenceEntriesFromSourceRef(item && item.sourceRef || "");
  if (refs.length) return refs[0].ref;
  return normalizeSourceRef(item && item.sourceRef);
}

function trimDerivedItemsForTheme(theme, bucket, items = []) {
  const rule = theme && THEME_DERIVED_POOL_RULES[theme.name] && THEME_DERIVED_POOL_RULES[theme.name][bucket];
  if (!rule) return items.slice();

  const perRef = Math.max(1, Number(rule.perRef || 1));
  const counts = new Map();
  const trimmed = [];

  items.forEach((item) => {
    const key = primaryReferenceKeyForItem(item) || itemSignature(item);
    const seen = counts.get(key) || 0;
    if (seen >= perRef) return;
    counts.set(key, seen + 1);
    trimmed.push(item);
  });

  return Number.isFinite(rule.maxItems) ? trimmed.slice(0, Math.max(1, Number(rule.maxItems))) : trimmed;
}

function themeDifficultyReferenceRule(theme, difficultyId = state.difficulty) {
  const caps = theme && THEME_DIFFICULTY_REFERENCE_CAPS[theme.name];
  if (!caps) return null;
  return caps[normalizeDifficulty(difficultyId)] || null;
}

function referenceKeysForItem(item) {
  const refs = referenceEntriesFromSourceRef(item && item.sourceRef || "").map((entry) => entry.ref).filter(Boolean);
  if (refs.length) return uniqueList(refs);
  const fallback = primaryReferenceKeyForItem(item);
  return fallback ? [fallback] : [];
}

function themeReferenceUsageCountsForDifficulty(difficultyId = state.difficulty, theme = null) {
  const counts = new Map();
  const cachePrefix = `${difficultyId}:`;
  const plan = theme ? themeReferencePlan(theme) : [];

  Object.entries(state.stageActivities || {}).forEach(([cacheKey, activity]) => {
    if (!String(cacheKey || "").startsWith(cachePrefix)) return;
    if (!activity || !QUESTION_ACTIVITY_TYPES.has(activity.type)) return;
    if (theme && !itemMatchesTheme(activity, theme)) return;

    referenceKeysForItem(activity).forEach((ref) => {
      if (plan.length && !sourceRefMatchesPlan(ref, plan)) return;
      counts.set(ref, (counts.get(ref) || 0) + 1);
    });
  });

  return counts;
}

function selectionConstraintsForTheme(theme, difficulty, focus = null) {
  if (focus) return {};
  const difficultyId = difficulty && difficulty.id ? difficulty.id : difficulty;
  const rule = themeDifficultyReferenceRule(theme, difficultyId);
  if (!rule) return {};
  return {
    maxRefUses: Math.max(1, Number(rule.perRef || 1)),
    refUsageCounts: themeReferenceUsageCountsForDifficulty(difficultyId, theme),
    referenceKeyForItem: (item) => referenceKeysForItem(item)[0] || ""
  };
}

function derivedQuizPoolForTheme(theme, difficulty = currentDifficulty()) {
  const quizSource = themeScopedQuizItems(theme, quizPoolForDifficulty(difficulty));
  const factSource = factBankForDifficulty(difficulty).filter((item) => itemMatchesTheme(item, theme));
  const orderSource = orderBankForDifficulty(difficulty).filter((item) => itemMatchesTheme(item, theme));
  const labelPartSource = partItemsFromOrderItems(orderSource);
  const quizDerivedFacts = buildDerivedFactPoolFromQuizItems(quizSource);
  const summaryFacts = summaryFactItemsForTheme(theme);
  const interactiveQuizItems = buildQuizItemsFromInteractiveSets(theme, interactiveModeSetsForTheme(theme));
  return trimDerivedItemsForTheme(theme, "quiz", dedupeActivityPool(
    interactiveQuizItems.concat(
      buildVerseFillQuizPoolFromFactItems(factSource.concat(quizDerivedFacts, summaryFacts))
        .concat(buildVerseFillQuizPoolFromFactItems(labelPartSource))
    ),
    "quiz"
  ));
}

function derivedSpellingPoolForTheme(theme, difficulty = currentDifficulty()) {
  const factSource = factBankForDifficulty(difficulty);
  const quizSource = themeScopedQuizItems(theme, quizPoolForDifficulty(difficulty));
  const orderSource = orderBankForDifficulty(difficulty).filter((item) => itemMatchesTheme(item, theme));
  const labelPartSource = partItemsFromOrderItems(orderSource);
  const quizDerivedFacts = buildDerivedFactPoolFromQuizItems(quizSource);
  const summaryFacts = summaryFactItemsForTheme(theme);
  const factVersePool = factSource
    .filter((item) => itemMatchesTheme(item, theme))
    .flatMap((item) => buildVerseFillPoolFromFactItem(item))
    .concat(quizDerivedFacts.flatMap((item) => buildVerseFillPoolFromFactItem(item)))
    .concat(summaryFacts.flatMap((item) => buildVerseFillPoolFromFactItem(item)))
    .concat(labelPartSource.flatMap((item) => buildVerseFillPoolFromFactItem(item)));
  const quizFallbackPool = themeScopedQuizItems(theme, quizPoolForDifficulty(difficulty))
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
  return trimDerivedItemsForTheme(theme, "spelling", dedupeActivityPool(factVersePool.concat(quizFallbackPool), "spelling"));
}

function derivedOrderSetsForTheme(theme, difficulty = currentDifficulty()) {
  const quizSource = themeScopedQuizItems(theme, quizPoolForDifficulty(difficulty));
  const quizItems = quizSource.map((item) => ({
    label: clueTextFromPrompt(item.prompt),
    sourceRef: item.sourceRef
  }));
  const factItems = themeScopedFactItems(theme, factBankForDifficulty(difficulty)).map((item) => ({
    label: (item.parts || []).join(" "),
    sourceRef: item.sourceRef
  }));
  const quizDerivedFacts = buildDerivedFactPoolFromQuizItems(quizSource).map((item) => ({
    label: (item.parts || []).join(" "),
    sourceRef: item.sourceRef
  }));
  const summaryItems = summaryFactItemsForTheme(theme).map((item) => ({
    label: (item.parts || []).join(" "),
    sourceRef: item.sourceRef
  }));
  const interactiveItems = buildOrderSetsFromInteractiveSets(theme, interactiveModeSetsForTheme(theme));
  const combined = trimDerivedItemsForTheme(theme, "orderBase", quizItems.concat(factItems, quizDerivedFacts, summaryItems));
  const sets = [];

  if (combined.length >= 3) {
    for (let first = 0; first < combined.length - 2; first += 1) {
      for (let second = first + 1; second < combined.length - 1; second += 1) {
        for (let third = second + 1; third < combined.length; third += 1) {
          const trio = [combined[first], combined[second], combined[third]];
          sets.push({
            era: theme.era,
            items: trio.map((item) => item.label),
            sourceRef: trio.map((item) => item.sourceRef).join("; "),
            historySourceRef: trio.map((item) => `${item.sourceRef}::derived-order::${normalizeQuizAnswerKey(item.label)}`).join(" || ")
          });
        }
      }
    }
  } else if (combined.length === 2) {
    sets.push({
      era: theme.era,
      items: combined.map((item) => item.label),
      sourceRef: combined.map((item) => item.sourceRef).join("; "),
      historySourceRef: combined.map((item) => `${item.sourceRef}::derived-order::${normalizeQuizAnswerKey(item.label)}`).join(" || ")
    });
  }

  return trimDerivedItemsForTheme(
    theme,
    "order",
    dedupeActivityPool(sets.concat(interactiveItems), "order").slice(0, Math.max(18, themeLevelCount(theme) * 6))
  );
}

function buildDerivedFactPoolFromOrderItems(items = []) {
  return items.flatMap((item, itemIndex) => {
    const refs = referenceEntriesFromSourceRef(item.sourceRef || "").map((entry) => entry.ref);
    const labels = Array.isArray(item && item.items) ? item.items : [];
    return labels.map((label, labelIndex) => {
      const parts = phrasePartsFromLabel(label);
      if (parts.length < 2) return null;

      const sourceRef = refs[labelIndex] || item.sourceRef;
      return {
        era: item.era,
        parts,
        sourceRef,
        historySourceRef: `${sourceRef}::fact::order-line::${normalizeQuizAnswerKey(label)}::${itemIndex + 1}-${labelIndex + 1}`
      };
    }).filter(Boolean);
  });
}

const QUIZ_VERB_PAST_TENSE = {
  be: "was",
  become: "became",
  begin: "began",
  build: "built",
  call: "called",
  come: "came",
  compare: "compared",
  confront: "confronted",
  create: "created",
  cross: "crossed",
  do: "did",
  father: "fathered",
  find: "found",
  give: "gave",
  hear: "heard",
  lead: "led",
  leave: "left",
  make: "made",
  place: "placed",
  say: "said",
  see: "saw",
  send: "sent",
  settle: "settled",
  set: "set",
  shut: "shut",
  speak: "spoke",
  store: "stored",
  use: "used"
};

function pastTenseVerb(verb) {
  const normalized = String(verb || "").trim().toLowerCase();
  if (!normalized) return "";
  if (QUIZ_VERB_PAST_TENSE[normalized]) return QUIZ_VERB_PAST_TENSE[normalized];
  if (normalized.endsWith("e")) return `${normalized}d`;
  return `${normalized}ed`;
}

function statementPartsFromQuizItem(item) {
  const prompt = clueTextFromPrompt(item && item.prompt);
  const answer = String(item && item.answer || "").trim();
  if (!prompt || !answer) return null;

  const patterns = [
    {
      regex: /^Who said, ["“]?(.+?)["”]?$/i,
      build: (match) => `${answer} said ${match[1]}`
    },
    {
      regex: /^Who was (.+)$/i,
      build: (match) => `${answer} was ${match[1]}`
    },
    {
      regex: /^Who (.+)$/i,
      build: (match) => `${answer} ${match[1]}`
    },
    {
      regex: /^What does (.+) mean$/i,
      build: (match) => `${match[1]} means ${answer}`
    },
    {
      regex: /^What did ([A-Za-zÀ-ÿ'’\\s-]+?) ([a-z]+)(.*)$/i,
      build: (match) => `${match[1].trim()} ${pastTenseVerb(match[2])} ${answer}${match[3] || ""}`
    },
    {
      regex: /^Where did ([A-Za-zÀ-ÿ'’\\s-]+?) ([a-z]+)(.*)$/i,
      build: (match) => `${match[1].trim()} ${pastTenseVerb(match[2])}${match[3] || ""} ${answer}`
    },
    {
      regex: /^Why did ([A-Za-zÀ-ÿ'’\\s-]+?) say,? (.+)$/i,
      build: (match) => `${match[1].trim()} said ${match[2]} ${answer}`
    }
  ];

  const statement = patterns.reduce((found, rule) => {
    if (found) return found;
    const match = prompt.match(rule.regex);
    return match ? rule.build(match).replace(/\s+/g, " ").trim() : null;
  }, null);

  if (!statement) return null;
  const parts = phrasePartsFromLabel(statement);
  return parts.length >= 2 ? parts : null;
}

function buildDerivedFactPoolFromQuizItems(items = []) {
  return items.map((item, index) => {
    const parts = statementPartsFromQuizItem(item);
    if (!parts) return null;
    return {
      era: item.era,
      parts,
      sourceRef: item.sourceRef,
      historySourceRef: `${item.sourceRef}::fact::quiz-line::${normalizeQuizAnswerKey(item.prompt)}::${index + 1}`
    };
  }).filter(Boolean);
}

function derivedFactPoolForTheme(theme, difficulty = currentDifficulty()) {
  const authoredOrderSource = orderBankForDifficulty(difficulty).filter((item) => itemMatchesTheme(item, theme));
  const derivedOrderSource = derivedOrderSetsForTheme(theme, difficulty);
  const quizDerivedSource = buildDerivedFactPoolFromQuizItems(themeScopedQuizItems(theme, quizPoolForDifficulty(difficulty)));
  const summaryFacts = summaryFactItemsForTheme(theme);
  return trimDerivedItemsForTheme(theme, "fact", dedupeActivityPool(
    buildDerivedFactPoolFromOrderItems(authoredOrderSource.concat(derivedOrderSource)).concat(quizDerivedSource, summaryFacts),
    "fact"
  ).slice(0, Math.max(24, themeLevelCount(theme) * 8)));
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

function spellingAnswerAliases(value) {
  const normalized = normalizeSpellingAnswer(value);
  if (!normalized) return [];

  if (normalized === "flood") return ["flooding"];
  if (normalized === "flooding") return ["flood"];
  if (normalized === "floodwaters" || normalized === "flood waters") {
    return ["flood", "flooding", "flood waters", "floodwaters"];
  }
  return [];
}

function normalizeQuizAnswerKey(value) {
  return normalizeSpellingAnswer(value)
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const FALLBACK_QUIZ_DISTRACTORS = [
  "Abraham",
  "Isaac",
  "Jacob",
  "Joseph",
  "Moses",
  "Aaron",
  "Joshua",
  "Caleb",
  "Samuel",
  "Saul",
  "David",
  "Noah",
  "Jericho",
  "Sinai",
  "Canaan",
  "Passover",
  "Covenant",
  "Manna",
  "Ark",
  "Judah",
  "Benjamin",
  "Levi",
  "Ephraim",
  "Boaz",
  "Ruth"
];

function buildQuizOptions(question, era, optionCount, sourcePool = quizBank) {
  const total = 4;
  const options = [];
  const seen = new Set();
  const pool = Array.isArray(sourcePool) && sourcePool.length ? sourcePool : quizBank;
  const combinedPool = [].concat(quizBank, mediumQuizBank, advancedQuizBank);

  const addOption = (answer, prefer = false) => {
    const text = String(answer || "").trim();
    if (!text) return;
    const key = normalizeQuizAnswerKey(text);
    if (!key) return;
    if (seen.has(key)) {
      if (prefer) {
        const existingIndex = options.findIndex((entry) => entry.key === key);
        if (existingIndex >= 0) {
          options[existingIndex] = { key, text };
        }
      }
      return;
    }
    seen.add(key);
    options.push({ key, text });
  };

  addOption(question.answer, true);
  if (Array.isArray(question.options) && question.options.length) {
    uniqueList(question.options).forEach((option) => addOption(option));
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

  if (options.length < total) {
    addDistractors(FALLBACK_QUIZ_DISTRACTORS);
  }

  if (options.length < total) {
    addDistractors(BOOK_OPTIONS);
  }

  return shuffled(options.slice(0, total).map((entry) => entry.text));
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

function renderSourceVerse(reference, options = {}) {
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

  const audioBtn = document.createElement("button");
  audioBtn.type = "button";
  audioBtn.className = "ghost-btn";
  audioBtn.textContent = verseAudioLabel(false);
  const speechReady = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  audioBtn.disabled = !speechReady;
  audioBtn.addEventListener("click", () => {
    speakVerseAudio(reference, audioBtn, options.fallbackText || "");
  });

  row.append(text, link, audioBtn);
  return row;
}

function activityFor(meta) {
  const cacheKey = state.difficulty + ":" + meta.id;
  const cached = state.stageActivities[cacheKey];
  if (cached && typeof cached === "object") {
    const cachedVersion = Number(cached.__v || 0);
    const cachedQuizLikeOptions = (cached.type === "quiz" || cached.type === "speaker" || cached.type === "hebrew")
      && Array.isArray(cached.options)
      ? cached.options.map((option) => normalizeQuizAnswerKey(option))
      : null;
    const cachedMatchingOptions = cached.type === "matching" && Array.isArray(cached.options)
      ? cached.options.map((option) => normalizeSpellingAnswer(option))
      : null;
    const cachedQuizHasDuplicateOptions = Boolean(
      cachedQuizLikeOptions && new Set(cachedQuizLikeOptions.filter(Boolean)).size !== cachedQuizLikeOptions.filter(Boolean).length
    );
    const cachedQuizMissingAnswer = Boolean(
      cachedQuizLikeOptions
      && normalizeQuizAnswerKey(cached.answer)
      && !cachedQuizLikeOptions.includes(normalizeQuizAnswerKey(cached.answer))
    );
    const cachedQuizTooShort = Boolean(cachedQuizLikeOptions && cachedQuizLikeOptions.length < 4);
    const shouldRebuild = cached.type === "exhausted"
      || cachedVersion !== ACTIVITY_SCHEMA_VERSION
      || cachedQuizHasDuplicateOptions
      || cachedQuizMissingAnswer
      || cachedQuizTooShort
      || Boolean(cachedMatchingOptions && new Set(cachedMatchingOptions.filter(Boolean)).size !== cachedMatchingOptions.filter(Boolean).length);
    if (shouldRebuild) {
      delete state.stageActivities[cacheKey];
    } else {
      return cached;
    }
  }

  const difficulty = currentDifficulty();
  const sourceBucketForKind = (kind) => kind;
  const reviewFocus = activeReviewFocusForMeta(meta);
  const buildByKind = (kind, focus = null) => {
    const usedSources = focus
      ? null
      : usedQuestionSourcesForDifficulty(state.difficulty, sourceBucketForKind(kind), meta.theme);

    if (kind === "speaker" || kind === "hebrew") {
      return buildAuthoredActivityByKind(meta, meta.theme, difficulty, usedSources, kind, focus);
    }
    if (kind === "truefalse") {
      return buildTrueFalseActivity(meta, meta.theme, difficulty, usedSources, focus);
    }
    if (kind === "matching") {
      return buildMatchingActivity(meta, meta.theme, difficulty, usedSources, focus);
    }
    if (kind === "quiz") {
      return buildAuthoredActivityByKind(meta, meta.theme, difficulty, usedSources, kind, focus)
        || buildFallbackQuizActivity(meta, meta.theme, difficulty, usedSources, focus);
    }
    if (kind === "order") {
      return buildAuthoredActivityByKind(meta, meta.theme, difficulty, usedSources, kind, focus)
        || buildFallbackOrderActivity(meta, meta.theme, difficulty, usedSources, focus);
    }
    if (kind === "spelling") {
      return buildAuthoredActivityByKind(meta, meta.theme, difficulty, usedSources, kind, focus)
        || buildFallbackSpellingActivity(meta, meta.theme, difficulty, usedSources, focus);
    }
    return buildAuthoredActivityByKind(meta, meta.theme, difficulty, usedSources, kind, focus)
      || buildFallbackFactActivity(meta, meta.theme, difficulty, usedSources, focus);
  };

  let activity;
  let usedReviewFocus = false;

  if (meta.stage >= 1 && meta.stage <= 4) {
    const stageKinds = stageKindPlan(meta, difficulty);
    const orderedKinds = reviewFocus && reviewFocus.kind && stageKinds.includes(reviewFocus.kind)
      ? [reviewFocus.kind].concat(stageKinds.filter((kind) => kind !== reviewFocus.kind))
      : stageKinds;

    for (const kind of orderedKinds) {
      const focusForKind = reviewFocus && (!reviewFocus.kind || reviewFocus.kind === kind) ? reviewFocus : null;
      activity = buildByKind(kind, focusForKind);
      if (activity && focusForKind) usedReviewFocus = true;
      if (!activity && focusForKind && reviewFocus.kind === kind) {
        activity = buildByKind(kind, null);
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
    const exhaustedType = (reviewFocus && reviewFocus.kind) || stageKindPlan(meta, difficulty)[0] || "question";
    activity = buildQuestionPoolExhaustedActivity(meta, exhaustedType);
  }

  if (activity && typeof activity === "object") {
    if (usedReviewFocus) activity.reviewFocus = true;
    activity.__v = ACTIVITY_SCHEMA_VERSION;
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
    } else if (base.engine === "spotlight") {
      mode.rounds = Math.max(3, (base.rounds || 4) + cycle);
      mode.shuffles = Math.max(2, (base.shuffles || 3) + Math.min(cycle, 2));
    } else if (base.engine === "memoryflip") {
      mode.peekMs = Math.max(540, (base.peekMs || 1180) - cycle * 60);
    } else if (base.engine === "sealbreak") {
      mode.rounds = Math.max(3, (base.rounds || 4) + cycle);
    } else if (base.engine === "shieldwall") {
      mode.target = Math.max(4, (base.target || 5) + cycle);
      mode.speedMs = Math.max(880, (base.speedMs || 1420) - cycle * 55);
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
  } else if (mode.engine === "spotlight") {
    mode.rounds = Math.max(3, (mode.rounds || 4) + (tune.roundsDelta || 0));
    mode.shuffles = Math.max(2, (mode.shuffles || 3) + (tune.shufflesDelta || 0));
    mode.maxMisses = Math.max(1, (mode.maxMisses || 3) + (tune.maxMissesDelta || 0));
  } else if (mode.engine === "memoryflip") {
    mode.peekMs = Math.max(420, (mode.peekMs || 1180) + (tune.peekDelta || 0));
    mode.maxMisses = Math.max(1, (mode.maxMisses || 4) + (tune.maxMissesDelta || 0));
  } else if (mode.engine === "sealbreak") {
    mode.rounds = Math.max(3, (mode.rounds || 4) + (tune.roundsDelta || 0));
    mode.maxMisses = Math.max(1, (mode.maxMisses || 3) + (tune.maxMissesDelta || 0));
  } else if (mode.engine === "shieldwall") {
    mode.target = Math.max(4, (mode.target || 5) + (tune.targetDelta || 0));
    mode.maxMisses = Math.max(1, (mode.maxMisses || 3) + (tune.maxMissesDelta || 0));
    mode.speedMs = Math.max(820, (mode.speedMs || 1420) + (tune.speedDelta || 0));
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

const NON_DIRECTIONAL_STAGE_FIVE_ENGINES = new Set(["pattern", "discern", "timing", "slingshot", "collect", "balance", "spotlight", "memoryflip", "sealbreak", "shieldwall"]);
const STAGE_FIVE_PATTERN_FALLBACK_PADS = [
  { icon: "📜", label: "Word" },
  { icon: "🕯️", label: "Light" },
  { icon: "🛡️", label: "Faith" },
  { icon: "🙏", label: "Trust" }
];
const STAGE_FIVE_PATTERN_SEQUENCE_LIBRARY = [
  [[0, 1, 2], [0, 1, 2, 3], [1, 3, 2, 0], [0, 2, 1, 3, 0]],
  [[0, 2, 1], [0, 2, 1, 3], [2, 0, 3, 1], [1, 2, 3, 0, 1]],
  [[1, 0, 2], [1, 0, 2, 3], [3, 1, 0, 2], [2, 1, 3, 0, 2]],
  [[2, 0, 1], [2, 0, 1, 3], [1, 3, 0, 2], [0, 2, 3, 1, 0]]
];
const STAGE_FIVE_DISCERN_VARIANTS = [
  {
    cards: [
      { icon: "📖", label: "Obey God" },
      { icon: "🙏", label: "Trust Him" },
      { icon: "⚡", label: "Act in panic" },
      { icon: "👑", label: "Seek glory" }
    ],
    rounds: [
      { prompt: "Which response fits faithful obedience in this moment?", correctIndex: 0 },
      { prompt: "Which response shows dependence on God over self?", correctIndex: 1 },
      { prompt: "Which reaction should be rejected in this story?", correctIndex: 2 },
      { prompt: "Which motive turns the heart away from God?", correctIndex: 3 }
    ]
  },
  {
    cards: [
      { icon: "🕊️", label: "Wait on God" },
      { icon: "🧭", label: "Follow truth" },
      { icon: "🏃", label: "Run in fear" },
      { icon: "🗿", label: "Trust idols" }
    ],
    rounds: [
      { prompt: "Which choice reflects patient faith in this Bible scene?", correctIndex: 0 },
      { prompt: "Which choice aligns with God's word in this story?", correctIndex: 1 },
      { prompt: "Which response shows fear without trust?", correctIndex: 2 },
      { prompt: "Which response rejects God's way for substitutes?", correctIndex: 3 }
    ]
  },
  {
    cards: [
      { icon: "🛡️", label: "Stand firm" },
      { icon: "🤝", label: "Keep covenant" },
      { icon: "💬", label: "Complain" },
      { icon: "🔥", label: "Harden heart" }
    ],
    rounds: [
      { prompt: "Which response pictures steadfast faith here?", correctIndex: 0 },
      { prompt: "Which response keeps covenant loyalty with God?", correctIndex: 1 },
      { prompt: "Which response shows distrust instead of worship?", correctIndex: 2 },
      { prompt: "Which response resists God's warning?", correctIndex: 3 }
    ]
  }
];
const STAGE_FIVE_BATTLE_THEME_NAMES = new Set([
  "Sea Crossing",
  "Jordan Crossing",
  "Land and Legacy",
  "Cycle of Judges",
  "Saul's Kingship",
  "David and Courage"
]);
const STAGE_FIVE_SLINGSHOT_KEYWORDS = [
  "battle",
  "duel",
  "giant",
  "shield",
  "strike",
  "war",
  "army",
  "march",
  "jericho",
  "conquest",
  "chariot",
  "fortress",
  "wall"
];

function stageFiveHashSeed(base, themeName = "") {
  const seed = `${themeName}::${base?.id || ""}::${base?.label || ""}::${base?.sourceRef || ""}`;
  return seed.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}

function stageFiveThemeCue(themeName = "") {
  if (!themeName) return "Bible";
  return String(themeName).replace(/[^A-Za-z0-9' ]+/g, " ").trim() || "Bible";
}

const BOSS_BATTLE_DIFFICULTY = {
  easy: { bossHealth: 3, playerHealth: 5 },
  medium: { bossHealth: 4, playerHealth: 4 },
  advanced: { bossHealth: 5, playerHealth: 3 }
};

const BOSS_BATTLE_PROFILES = {
  genesis: {
    enemyName: "Serpent of Eden",
    enemyIcon: "🐍",
    label: "Serpent Showdown",
    sourceRef: "Genesis 2:16-17; 3:1-15,21",
    storyPrompt: "Strike the serpent with truth, obedience, and God's promised hope.",
    rounds: [
      {
        prompt: "What command had God already given before the serpent spoke?",
        answer: "Do not eat from that tree",
        options: [
          { icon: "📜", label: "Do not eat from that tree" },
          { icon: "🧱", label: "Build a city and tower" },
          { icon: "⭐", label: "Count the stars" },
          { icon: "🛶", label: "Take animals into the ark" }
        ]
      },
      {
        prompt: "Whose offspring was promised to bruise the serpent?",
        answer: "The woman's offspring",
        options: [
          { icon: "👶", label: "The woman's offspring" },
          { icon: "🌿", label: "Cain's offering" },
          { icon: "🌊", label: "The floodwaters" },
          { icon: "🕊️", label: "The dove" }
        ]
      },
      {
        prompt: "What faithful response should Adam and Eve have chosen?",
        answer: "Obey God's word",
        options: [
          { icon: "🛡️", label: "Obey God's word" },
          { icon: "🍃", label: "Hide among the trees" },
          { icon: "👈", label: "Blame someone else" },
          { icon: "🪡", label: "Sew fig leaves" }
        ]
      },
      {
        prompt: "What entered the world through sin and curse?",
        answer: "Death and sorrow",
        options: [
          { icon: "⚰️", label: "Death and sorrow" },
          { icon: "🌈", label: "Rainbow peace" },
          { icon: "📯", label: "Trumpet victory" },
          { icon: "👑", label: "A new king" }
        ]
      },
      {
        prompt: "What mercy did God provide before sending them out of Eden?",
        answer: "Garments of skin",
        options: [
          { icon: "🧥", label: "Garments of skin" },
          { icon: "🪵", label: "Wood for an ark" },
          { icon: "🔥", label: "A pillar of fire" },
          { icon: "📖", label: "Stone tablets" }
        ]
      }
    ]
  },
  patriarchs: {
    enemyName: "Jealous Brothers",
    enemyIcon: "🗡️",
    label: "Betrayal Breaker",
    sourceRef: "Genesis 37:4,28,31; 41:48-49; 50:20",
    storyPrompt: "Answer with truth from Joseph's story and break the power of betrayal.",
    rounds: [
      {
        prompt: "Which son was sold into Egypt by his brothers?",
        answer: "Joseph",
        options: [
          { icon: "🌾", label: "Joseph" },
          { icon: "🐏", label: "Isaac" },
          { icon: "🥣", label: "Esau" },
          { icon: "⛺", label: "Lot" }
        ]
      },
      {
        prompt: "Who was Joseph's father?",
        answer: "Jacob",
        options: [
          { icon: "👴", label: "Jacob" },
          { icon: "⭐", label: "Abraham" },
          { icon: "🧭", label: "Laban" },
          { icon: "👑", label: "Pharaoh" }
        ]
      },
      {
        prompt: "What was dipped in goat's blood to deceive Jacob?",
        answer: "Joseph's coat",
        options: [
          { icon: "🧥", label: "Joseph's coat" },
          { icon: "🥖", label: "Joseph's bread" },
          { icon: "🪨", label: "Joseph's stone" },
          { icon: "🪵", label: "Joseph's staff" }
        ]
      },
      {
        prompt: "What did Joseph say God meant for good?",
        answer: "What his brothers meant for evil",
        options: [
          { icon: "✨", label: "What his brothers meant for evil" },
          { icon: "🧱", label: "What Babel built for pride" },
          { icon: "🌧️", label: "What the flood did in judgment" },
          { icon: "⚔️", label: "What Esau planned in anger" }
        ]
      },
      {
        prompt: "What had Joseph gathered and stored during the famine years?",
        answer: "Grain",
        options: [
          { icon: "🌾", label: "Grain" },
          { icon: "🕊️", label: "Doves" },
          { icon: "💧", label: "Water skins" },
          { icon: "🛡️", label: "Bronze shields" }
        ]
      }
    ]
  },
  exodus: {
    enemyName: "Pharaoh",
    enemyIcon: "👑",
    label: "Pharaoh's Last Stand",
    sourceRef: "Exodus 12:7,13; 13:21; 14:16,21; 14:23-28",
    storyPrompt: "Choose the right act of obedience and deliverance to break Pharaoh's resistance.",
    rounds: [
      {
        prompt: "What sign on the doorposts spared Israel's firstborn?",
        answer: "Passover blood",
        options: [
          { icon: "🩸", label: "Passover blood" },
          { icon: "🌈", label: "Rainbow sign" },
          { icon: "🕊️", label: "Olive leaf" },
          { icon: "📯", label: "Ram's horn" }
        ]
      },
      {
        prompt: "What did Moses stretch out over the sea?",
        answer: "His hand with the staff",
        options: [
          { icon: "🪄", label: "His hand with the staff" },
          { icon: "🐍", label: "A bronze serpent" },
          { icon: "🎵", label: "A harp" },
          { icon: "🪨", label: "A smooth stone" }
        ]
      },
      {
        prompt: "What led Israel by night after leaving Egypt?",
        answer: "A pillar of fire",
        options: [
          { icon: "🔥", label: "A pillar of fire" },
          { icon: "🌿", label: "A flowering rod" },
          { icon: "⚓", label: "An ark anchor" },
          { icon: "⛺", label: "A desert tent" }
        ]
      },
      {
        prompt: "Who kept refusing to let Israel go?",
        answer: "Pharaoh",
        options: [
          { icon: "👑", label: "Pharaoh" },
          { icon: "🗡️", label: "Joshua" },
          { icon: "🪙", label: "Boaz" },
          { icon: "🎯", label: "David" }
        ]
      },
      {
        prompt: "Which meal remembers God's rescue from Egypt?",
        answer: "Passover",
        options: [
          { icon: "🍞", label: "Passover" },
          { icon: "🌾", label: "Barley harvest" },
          { icon: "💧", label: "Water from the rock" },
          { icon: "🥣", label: "Lentil stew" }
        ]
      }
    ]
  },
  sinai: {
    enemyName: "Golden Calf",
    enemyIcon: "🐂",
    label: "Idol Breaker",
    sourceRef: "Exodus 20:3-4; 24:12; 32:4,19,26",
    storyPrompt: "Stand against false worship with the covenant words God really gave.",
    rounds: [
      {
        prompt: "Which command forbade making carved images?",
        answer: "Do not make idols",
        options: [
          { icon: "📜", label: "Do not make idols" },
          { icon: "🛶", label: "Build the ark" },
          { icon: "📯", label: "March around the city" },
          { icon: "🪨", label: "Take five stones" }
        ]
      },
      {
        prompt: "What did Moses break when he came down from the mountain?",
        answer: "Stone tablets",
        options: [
          { icon: "🪨", label: "Stone tablets" },
          { icon: "🌈", label: "Rainbow bows" },
          { icon: "🥖", label: "Bread loaves" },
          { icon: "🧱", label: "Bricks" }
        ]
      },
      {
        prompt: "Who gathered to Moses and stood on Yahweh's side?",
        answer: "The sons of Levi",
        options: [
          { icon: "🗡️", label: "The sons of Levi" },
          { icon: "⚔️", label: "Philistine lords" },
          { icon: "🏹", label: "Amalekite scouts" },
          { icon: "🧱", label: "Babel builders" }
        ]
      },
      {
        prompt: "What did the people say about the golden calf?",
        answer: "These are your gods",
        options: [
          { icon: "🐂", label: "These are your gods" },
          { icon: "🎵", label: "The Lord is my shepherd" },
          { icon: "🔥", label: "Let my people go" },
          { icon: "👂", label: "Speak, for your servant hears" }
        ]
      },
      {
        prompt: "On what did God write the covenant words?",
        answer: "Stone tablets",
        options: [
          { icon: "🪨", label: "Stone tablets" },
          { icon: "📘", label: "A papyrus scroll" },
          { icon: "🛡️", label: "A bronze shield" },
          { icon: "🏔️", label: "A mountain banner" }
        ]
      }
    ]
  },
  wilderness: {
    enemyName: "Amalek",
    enemyIcon: "⚔️",
    label: "Amalek Ambush",
    sourceRef: "Exodus 17:9-15; Exodus 16:15; Numbers 14:33-34; Numbers 21:9",
    storyPrompt: "Answer with wilderness truth and faithful dependence as Amalek presses the camp.",
    rounds: [
      {
        prompt: "Who fought below while Moses held up his hands?",
        answer: "Joshua",
        options: [
          { icon: "🗡️", label: "Joshua" },
          { icon: "📯", label: "Samuel" },
          { icon: "👑", label: "Saul" },
          { icon: "🎵", label: "David" }
        ]
      },
      {
        prompt: "What name did Moses give the altar after the victory?",
        answer: "Yahweh Nissi",
        options: [
          { icon: "🏳️", label: "Yahweh Nissi" },
          { icon: "🌄", label: "Bethel" },
          { icon: "🪨", label: "Ebenezer" },
          { icon: "⭐", label: "El Shaddai" }
        ]
      },
      {
        prompt: "What fell each morning for Israel to gather?",
        answer: "Manna",
        options: [
          { icon: "🍞", label: "Manna" },
          { icon: "🍇", label: "Grapes" },
          { icon: "🌾", label: "Barley" },
          { icon: "🥩", label: "Venison" }
        ]
      },
      {
        prompt: "How many years did unbelief bring upon that generation?",
        answer: "Forty",
        options: [
          { icon: "4️⃣0️⃣", label: "Forty" },
          { icon: "7️⃣", label: "Seven" },
          { icon: "1️⃣2️⃣", label: "Twelve" },
          { icon: "3️⃣", label: "Three" }
        ]
      },
      {
        prompt: "What stood uplifted for healing in the camp?",
        answer: "A bronze serpent",
        options: [
          { icon: "🐍", label: "A bronze serpent" },
          { icon: "🌈", label: "A rainbow sign" },
          { icon: "🪨", label: "A sling stone" },
          { icon: "📯", label: "A silver trumpet" }
        ]
      }
    ]
  },
  conquest: {
    enemyName: "Jericho Stronghold",
    enemyIcon: "🏰",
    label: "Jericho Boss Siege",
    sourceRef: "Joshua 3:14-17; 6:4-5,16,20,25",
    storyPrompt: "Bring down the stronghold with the exact obedience God commanded.",
    rounds: [
      {
        prompt: "How many days did Israel march before the final shout?",
        answer: "Seven days",
        options: [
          { icon: "7️⃣", label: "Seven days" },
          { icon: "3️⃣", label: "Three days" },
          { icon: "4️⃣0️⃣", label: "Forty days" },
          { icon: "1️⃣2️⃣", label: "Twelve days" }
        ]
      },
      {
        prompt: "What did the priests carry and blow at Jericho?",
        answer: "Ram's horn trumpets",
        options: [
          { icon: "📯", label: "Ram's horn trumpets" },
          { icon: "🎵", label: "Silver harps" },
          { icon: "🪨", label: "Smooth stones" },
          { icon: "⚓", label: "Bronze hooks" }
        ]
      },
      {
        prompt: "What happened after the people shouted?",
        answer: "The wall fell flat",
        options: [
          { icon: "🧱", label: "The wall fell flat" },
          { icon: "🌊", label: "The river turned to blood" },
          { icon: "🔥", label: "Fire consumed the city" },
          { icon: "☁️", label: "A cloud covered the camp" }
        ]
      },
      {
        prompt: "Who was spared when Jericho fell?",
        answer: "Rahab and her household",
        options: [
          { icon: "🧣", label: "Rahab and her household" },
          { icon: "🪙", label: "Achan and his sons" },
          { icon: "👑", label: "The king of Jericho" },
          { icon: "🏹", label: "Only the spies" }
        ]
      },
      {
        prompt: "What entered the Jordan before the people crossed?",
        answer: "The ark of the covenant",
        options: [
          { icon: "🛡️", label: "The ark of the covenant" },
          { icon: "🐍", label: "The bronze serpent" },
          { icon: "🐂", label: "The golden calf" },
          { icon: "🎵", label: "The king's harp" }
        ]
      }
    ]
  },
  judges: {
    enemyName: "Philistine Lords",
    enemyIcon: "⚔️",
    label: "Judges Warfront",
    sourceRef: "Judges 4:21; 6:36-40; 7:7; 16:30; Ruth 1:16",
    storyPrompt: "Break the oppression by remembering the judges, deliverers, and faithful people God raised up.",
    rounds: [
      {
        prompt: "How many men remained with Gideon for the battle?",
        answer: "Three hundred",
        options: [
          { icon: "3️⃣0️⃣0️⃣", label: "Three hundred" },
          { icon: "7️⃣0️⃣", label: "Seventy" },
          { icon: "1️⃣2️⃣", label: "Twelve" },
          { icon: "1️⃣0️⃣0️⃣0️⃣", label: "One thousand" }
        ]
      },
      {
        prompt: "Who struck Sisera with the tent peg?",
        answer: "Jael",
        options: [
          { icon: "🪓", label: "Jael" },
          { icon: "👩‍⚖️", label: "Deborah" },
          { icon: "🌾", label: "Ruth" },
          { icon: "👑", label: "Naomi" }
        ]
      },
      {
        prompt: "What sign did Gideon ask God to give with the fleece?",
        answer: "Dew on the fleece",
        options: [
          { icon: "💧", label: "Dew on the fleece" },
          { icon: "⭐", label: "Stars in the sky" },
          { icon: "🔥", label: "Fire on the altar" },
          { icon: "🌊", label: "Water in the sea" }
        ]
      },
      {
        prompt: "What weapon did Samson use against a thousand Philistines?",
        answer: "A donkey's jawbone",
        options: [
          { icon: "🦴", label: "A donkey's jawbone" },
          { icon: "🪨", label: "A sling stone" },
          { icon: "📯", label: "A trumpet" },
          { icon: "⚔️", label: "A bronze sword" }
        ]
      },
      {
        prompt: "Who said, 'Your people shall be my people'?",
        answer: "Ruth",
        options: [
          { icon: "🌾", label: "Ruth" },
          { icon: "👵", label: "Naomi" },
          { icon: "👩‍⚖️", label: "Deborah" },
          { icon: "💇", label: "Delilah" }
        ]
      }
    ]
  },
  samuel: {
    enemyName: "Philistine Threat",
    enemyIcon: "🛡️",
    label: "Ebenezer Stand",
    sourceRef: "1 Samuel 3:10; 7:9-13",
    storyPrompt: "Stand firm with Samuel's call and the Lord's help against the Philistine threat.",
    rounds: [
      {
        prompt: "Who heard God's call in the night?",
        answer: "Samuel",
        options: [
          { icon: "👂", label: "Samuel" },
          { icon: "👑", label: "Saul" },
          { icon: "🪨", label: "David" },
          { icon: "🛏️", label: "Eliab" }
        ]
      },
      {
        prompt: "What did Samuel answer the Lord?",
        answer: "Speak, for your servant hears",
        options: [
          { icon: "🗣️", label: "Speak, for your servant hears" },
          { icon: "🛶", label: "Let my people go" },
          { icon: "⚔️", label: "The battle is mine" },
          { icon: "👑", label: "Make us a king" }
        ]
      },
      {
        prompt: "What memorial stone did Samuel raise after victory?",
        answer: "Ebenezer",
        options: [
          { icon: "🪨", label: "Ebenezer" },
          { icon: "🌄", label: "Bethel" },
          { icon: "🏕️", label: "Gilgal" },
          { icon: "⛰️", label: "Ararat" }
        ]
      },
      {
        prompt: "What offering did Samuel present as Israel cried to Yahweh?",
        answer: "A suckling lamb",
        options: [
          { icon: "🐑", label: "A suckling lamb" },
          { icon: "🕊️", label: "A dove" },
          { icon: "🐂", label: "A golden calf" },
          { icon: "🌾", label: "Barley loaves" }
        ]
      },
      {
        prompt: "Who thundered with a great sound against the Philistines?",
        answer: "Yahweh",
        options: [
          { icon: "⛈️", label: "Yahweh" },
          { icon: "👑", label: "Saul" },
          { icon: "👂", label: "Samuel alone" },
          { icon: "⚔️", label: "Jonathan" }
        ]
      }
    ]
  },
  saul: {
    enemyName: "Agag of Amalek",
    enemyIcon: "⚔️",
    label: "Agag Reckoning",
    sourceRef: "1 Samuel 10:1; 15:8-9,22-28",
    storyPrompt: "Answer with obedience and truth as Saul's compromise is brought into the light.",
    rounds: [
      {
        prompt: "Whom did Saul spare when he should have devoted him to destruction?",
        answer: "Agag",
        options: [
          { icon: "👑", label: "Agag" },
          { icon: "🛡️", label: "Goliath" },
          { icon: "🐍", label: "Pharaoh" },
          { icon: "⚔️", label: "Sisera" }
        ]
      },
      {
        prompt: "What did Samuel say is better than sacrifice?",
        answer: "Obedience",
        options: [
          { icon: "📜", label: "Obedience" },
          { icon: "🎵", label: "Singing" },
          { icon: "🍞", label: "Fasting" },
          { icon: "🏃", label: "Hiding" }
        ]
      },
      {
        prompt: "From whom did Samuel say the kingdom would be torn?",
        answer: "Saul",
        options: [
          { icon: "👑", label: "Saul" },
          { icon: "🪨", label: "David" },
          { icon: "🗡️", label: "Jonathan" },
          { icon: "👴", label: "Jesse" }
        ]
      },
      {
        prompt: "Who anointed Saul king?",
        answer: "Samuel",
        options: [
          { icon: "🫗", label: "Samuel" },
          { icon: "📜", label: "Nathan" },
          { icon: "⛰️", label: "Moses" },
          { icon: "🛏️", label: "Eli" }
        ]
      },
      {
        prompt: "What nation was Saul commanded to strike?",
        answer: "Amalek",
        options: [
          { icon: "⚔️", label: "Amalek" },
          { icon: "🌊", label: "Egypt" },
          { icon: "🏹", label: "Moab" },
          { icon: "🧱", label: "Babylon" }
        ]
      }
    ]
  },
  david: {
    enemyName: "Goliath",
    enemyIcon: "🗿",
    label: "Goliath Boss Battle",
    sourceRef: "1 Samuel 17:40,45-50",
    storyPrompt: "Use David's faith, words, and weapons to bring down the giant.",
    rounds: [
      {
        prompt: "What did David take from the brook?",
        answer: "Five smooth stones",
        options: [
          { icon: "🪨", label: "Five smooth stones" },
          { icon: "📜", label: "Two stone tablets" },
          { icon: "🍞", label: "Manna" },
          { icon: "🌿", label: "Olive leaves" }
        ]
      },
      {
        prompt: "In whose name did David come against Goliath?",
        answer: "Yahweh of Armies",
        options: [
          { icon: "🛡️", label: "Yahweh of Armies" },
          { icon: "👑", label: "Saul" },
          { icon: "🐟", label: "Dagon" },
          { icon: "⚔️", label: "Pharaoh" }
        ]
      },
      {
        prompt: "What did David refuse before the battle?",
        answer: "Saul's armor",
        options: [
          { icon: "🦺", label: "Saul's armor" },
          { icon: "🪨", label: "His sling" },
          { icon: "🪵", label: "His staff" },
          { icon: "❤️", label: "His courage" }
        ]
      },
      {
        prompt: "Where did the stone strike Goliath?",
        answer: "His forehead",
        options: [
          { icon: "🎯", label: "His forehead" },
          { icon: "🛡️", label: "His shield" },
          { icon: "👣", label: "His foot" },
          { icon: "✋", label: "His hand" }
        ]
      },
      {
        prompt: "What weapon did David use to bring the giant down?",
        answer: "A sling",
        options: [
          { icon: "🎯", label: "A sling" },
          { icon: "📯", label: "A trumpet" },
          { icon: "🦴", label: "A jawbone" },
          { icon: "⚔️", label: "A spear" }
        ]
      }
    ]
  }
};

function bossOptionKey(option) {
  return normalizeQuizAnswerKey(option && typeof option === "object" ? option.label : option);
}

function materializeBossRound(round, steps = 0) {
  const normalizedOptions = (Array.isArray(round && round.options) ? round.options : [])
    .map((option) => (option && typeof option === "object"
      ? { icon: String(option.icon || "✨"), label: String(option.label || "").trim() }
      : { icon: "✨", label: String(option || "").trim() }))
    .filter((option) => option.label);
  const options = rotateKinds(normalizedOptions, steps);
  const answerKey = bossOptionKey(round && round.answer);
  const correctIndex = Math.max(0, options.findIndex((option) => bossOptionKey(option) === answerKey));
  return {
    prompt: String((round && round.prompt) || "").trim(),
    successText: String((round && round.successText) || "").trim(),
    failText: String((round && round.failText) || "").trim(),
    options,
    correctIndex
  };
}

function isEraBossStage(meta) {
  if (!meta || meta.stage !== 5) return false;
  const nextMeta = nextStageMeta(meta);
  return !nextMeta || !nextMeta.theme || nextMeta.theme.era !== meta.theme.era;
}

function bossModeForStage(meta, difficulty = currentDifficulty()) {
  if (!meta || !meta.theme) return null;
  const profile = BOSS_BATTLE_PROFILES[meta.theme.era];
  if (!profile) return null;
  const difficultyId = difficulty && difficulty.id ? difficulty.id : String(difficulty || "medium");
  const tuning = BOSS_BATTLE_DIFFICULTY[difficultyId] || BOSS_BATTLE_DIFFICULTY.medium;
  const seedBase = stageFiveHashSeed({
    id: `boss-${meta.theme.era}`,
    label: profile.label,
    sourceRef: profile.sourceRef || meta.theme.sourceRef
  }, meta.theme.name) + meta.level + meta.stage;
  const rounds = (Array.isArray(profile.rounds) ? profile.rounds : []).map((round, index) => materializeBossRound(round, (seedBase + index) % 4));

  return {
    id: `boss-${meta.theme.era}-${difficultyId}-l${meta.level}`,
    engine: "boss",
    label: profile.label,
    enemyName: profile.enemyName,
    enemyIcon: profile.enemyIcon || "⚔️",
    sourceRef: profile.sourceRef || meta.theme.sourceRef,
    storyPrompt: profile.storyPrompt || challengeCopy("Choose the right item or response to defeat the enemy.", "Elige el objeto o respuesta correctos para derrotar al enemigo."),
    keyboardHint: challengeCopy("Keyboard: use arrow keys or WASD to raise the shield in the right direction.", "Teclado: usa las flechas o WASD para levantar el escudo en la direccion correcta."),
    rounds,
    bossHealth: tuning.bossHealth,
    playerHealth: tuning.playerHealth
  };
}

function stageFivePatternPadsFromRoute(base) {
  const routeSteps = Array.isArray(base.routeSteps) ? base.routeSteps : [];
  const pads = [];
  const seen = new Set();
  routeSteps.forEach((step) => {
    if (pads.length >= 4) return;
    const icon = String((step && step.icon) || "📜").trim() || "📜";
    const label = String((step && step.label) || "Step").trim() || "Step";
    const key = `${icon}::${label.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    pads.push({ icon, label });
  });
  STAGE_FIVE_PATTERN_FALLBACK_PADS.forEach((pad) => {
    if (pads.length >= 4) return;
    const key = `${pad.icon}::${pad.label.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    pads.push({ ...pad });
  });
  while (pads.length < 4) {
    pads.push({ icon: "✨", label: `Step ${pads.length + 1}` });
  }
  return pads.slice(0, 4);
}

function stageFivePatternPadsFromChoices(base) {
  const pool = Array.isArray(base.cards) && base.cards.length
    ? base.cards
    : (Array.isArray(base.pads) ? base.pads : []);
  const pads = [];
  const seen = new Set();
  pool.forEach((entry) => {
    if (pads.length >= 4) return;
    const icon = String((entry && entry.icon) || "📜").trim() || "📜";
    const label = String((entry && entry.label) || "Step").trim() || "Step";
    const key = `${icon}::${label.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    pads.push({ icon, label });
  });
  STAGE_FIVE_PATTERN_FALLBACK_PADS.forEach((pad) => {
    if (pads.length >= 4) return;
    const key = `${pad.icon}::${pad.label.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    pads.push({ ...pad });
  });
  while (pads.length < 4) {
    pads.push({ icon: "✨", label: `Step ${pads.length + 1}` });
  }
  return pads.slice(0, 4);
}

function stageFiveThemeSupportCards(themeName = "", excludeBaseId = "") {
  const themedPool = STAGE_FIVE_THEMED_POOLS && themeName ? STAGE_FIVE_THEMED_POOLS[themeName] : null;
  if (!Array.isArray(themedPool) || !themedPool.length) return [];

  const cards = [];
  const seen = new Set();
  themedPool.forEach((mode) => {
    if (!mode || (excludeBaseId && mode.id === excludeBaseId)) return;
    const pool = Array.isArray(mode.cards) && mode.cards.length
      ? mode.cards
      : (Array.isArray(mode.pads) && mode.pads.length
        ? mode.pads
        : (Array.isArray(mode.routeSteps) ? mode.routeSteps : []));
    pool.forEach((entry) => {
      const icon = String((entry && entry.icon) || "📜").trim() || "📜";
      const label = String((entry && entry.label) || "").trim();
      const key = normalizeQuizAnswerKey(label);
      if (!label || !key || seen.has(key)) return;
      seen.add(key);
      cards.push({ icon, label });
    });
  });
  return cards;
}

function stageFiveChoiceCardsFromBase(base, limit = 4, themeName = "") {
  const pool = Array.isArray(base?.cards) && base.cards.length
    ? base.cards
    : (Array.isArray(base?.pads) && base.pads.length
      ? base.pads
      : (Array.isArray(base?.routeSteps) ? base.routeSteps : []));
  const cards = [];
  const seen = new Set();

  pool.forEach((entry) => {
    if (cards.length >= limit) return;
    const icon = String((entry && entry.icon) || "📜").trim() || "📜";
    const label = String((entry && entry.label) || "Card").trim() || "Card";
    const key = normalizeQuizAnswerKey(label) || `${icon}-${cards.length}`;
    if (seen.has(key)) return;
    seen.add(key);
    cards.push({ id: `${key}-${cards.length}`, icon, label });
  });

  const siblingThemeCards = stageFiveThemeSupportCards(themeName || base?.themeName || "", base?.id || "");
  siblingThemeCards.forEach((entry) => {
    if (cards.length >= limit) return;
    const key = normalizeQuizAnswerKey(entry.label) || `${entry.icon}-${cards.length}`;
    if (seen.has(key)) return;
    seen.add(key);
    cards.push({ id: `${key}-${cards.length}`, icon: entry.icon, label: entry.label });
  });

  STAGE_FIVE_PATTERN_FALLBACK_PADS.forEach((entry) => {
    if (cards.length >= limit) return;
    const key = normalizeQuizAnswerKey(entry.label) || `${entry.icon}-${cards.length}`;
    if (seen.has(key)) return;
    seen.add(key);
    cards.push({ id: `${key}-${cards.length}`, icon: entry.icon, label: entry.label });
  });

  while (cards.length < limit) {
    const index = cards.length;
    cards.push({ id: `faith-card-${index}`, icon: "✨", label: `Faith ${index + 1}` });
  }

  return cards.slice(0, limit);
}

function stageFivePatternFromBase(base, themeName = "") {
  const hash = stageFiveHashSeed(base, themeName);
  const pads = Array.isArray(base.routeSteps) && base.routeSteps.length
    ? stageFivePatternPadsFromRoute(base)
    : stageFivePatternPadsFromChoices(base);
  const sequenceSet = STAGE_FIVE_PATTERN_SEQUENCE_LIBRARY[hash % STAGE_FIVE_PATTERN_SEQUENCE_LIBRARY.length];
  const suffix = base.engine === "pattern" ? "echo" : "pattern";
  const labelSuffix = base.engine === "pattern" ? "Echo" : "Sequence";
  return {
    id: `${base.id || "stage5-route"}-${suffix}`,
    engine: "pattern",
    label: `${base.label || "Story Path"} ${labelSuffix}`,
    rounds: 4,
    maxMisses: Math.max(2, Math.min(4, Number(base.maxMisses) || 3)),
    playbackMs: 500,
    sourceRef: base.sourceRef,
    storyPrompt: base.storyPrompt || "Remember the Bible story sequence in the right order.",
    secondaryPrompt: "Repeat the story sequence in order.",
    keyboardHint: "Keyboard: press 1-4 to repeat the sequence.",
    pads,
    sequences: sequenceSet.map((sequence) => sequence.slice())
  };
}

function stageFivePatternFromRoute(base, themeName = "") {
  return stageFivePatternFromBase(base, themeName);
}

function stageFiveTimingFromDirectional(base, themeName = "") {
  const hash = stageFiveHashSeed(base, themeName);
  const paceOffset = (hash % 5) * 18;
  const cue = stageFiveThemeCue(themeName);
  return {
    id: `${base.id || "stage5-direction"}-timing`,
    engine: "timing",
    label: `${base.label || "Story Focus"} Focus`,
    target: Math.max(5, Math.min(10, Number(base.target) || 7)),
    maxMisses: Math.max(2, Math.min(5, Number(base.maxMisses) || 4)),
    speed: Math.max(620, 860 - paceOffset),
    sourceRef: base.sourceRef,
    storyPrompt: base.storyPrompt || `Stay focused in this ${cue} moment and strike with precise timing.`,
    secondaryPrompt: "Press Strike when the marker enters the gold zone.",
    keyboardHint: "Keyboard: press Space or Enter to strike in the gold zone."
  };
}

function stageFiveDiscernFromDirectional(base, themeName = "") {
  const hash = stageFiveHashSeed(base, themeName);
  const cue = stageFiveThemeCue(themeName);
  const variant = STAGE_FIVE_DISCERN_VARIANTS[hash % STAGE_FIVE_DISCERN_VARIANTS.length];
  const rounds = variant.rounds.map((round) => ({
    prompt: `${round.prompt} (${cue})`,
    correctIndex: round.correctIndex
  }));
  return {
    id: `${base.id || "stage5-action"}-discern`,
    engine: "discern",
    label: `${base.label || cue} Discernment`,
    maxMisses: Math.max(2, Math.min(4, Number(base.maxMisses) || 3)),
    sourceRef: base.sourceRef,
    storyPrompt: base.storyPrompt || `Discern the faithful response in this ${cue} story moment.`,
    secondaryPrompt: "Choose the strongest response each round.",
    keyboardHint: "Keyboard: press 1-4 to choose your answer.",
    cards: variant.cards.map((card) => ({ ...card })),
    targets: rounds
  };
}

function stageFiveBalanceFromBase(base, themeName = "") {
  const hash = stageFiveHashSeed(base, themeName);
  const cue = stageFiveThemeCue(themeName);
  return {
    id: `${base.id || "stage5-balance"}-balance`,
    engine: "balance",
    label: `${base.label || cue} Steady`,
    target: 7 + (hash % 2),
    maxMisses: Math.max(2, Math.min(4, Number(base.maxMisses) || 4)),
    drift: 0.023 + ((hash % 4) * 0.0015),
    sourceRef: base.sourceRef,
    storyPrompt: base.storyPrompt || `Hold steady through this ${cue} Bible moment.`,
    secondaryPrompt: "Keep the marker inside the gold band.",
    keyboardHint: "Keyboard: hold Left/A or Right/D to keep the marker centered."
  };
}

function stageFiveCollectFromBase(base, themeName = "") {
  const hash = stageFiveHashSeed(base, themeName);
  const cue = stageFiveThemeCue(themeName);
  return {
    id: `${base.id || "stage5-collect"}-collect`,
    engine: "collect",
    label: `${base.label || cue} Gathering`,
    target: 10 + (hash % 4),
    maxMisses: Math.max(3, Math.min(5, Number(base.maxMisses) || 4)),
    seconds: 20 + (hash % 4),
    spawnMs: 360 + ((hash % 4) * 25),
    sourceRef: base.sourceRef,
    storyPrompt: base.storyPrompt || `Gather the key story pieces in this ${cue} moment.`,
    secondaryPrompt: "Catch the right pieces before time runs out.",
    keyboardHint: "Keyboard: use Left/Right or A/D to gather the falling items."
  };
}

function stageFiveSlingshotFromDirectional(base, themeName = "") {
  const hash = stageFiveHashSeed(base, themeName);
  const cue = stageFiveThemeCue(themeName);
  const radiusScale = 18 - Math.min(4, hash % 3);
  return {
    id: `${base.id || "stage5-action"}-slingshot`,
    engine: "slingshot",
    label: `${base.label || cue} Precision`,
    targetRadius: Math.max(14, radiusScale),
    maxPull: 80 + ((hash % 4) * 3),
    pullPowerScale: 0.13 + ((hash % 3) * 0.01),
    sourceRef: base.sourceRef,
    storyPrompt: base.storyPrompt || `Take one bold, precise shot in this ${cue} battle moment.`,
    secondaryPrompt: "Aim carefully, then release one decisive strike.",
    keyboardHint: "Keyboard: arrows adjust aim, Space/Enter launches, R resets."
  };
}

function stageFiveSpotlightFromBase(base, themeName = "") {
  const hash = stageFiveHashSeed(base, themeName);
  const cue = stageFiveThemeCue(themeName);
  const cards = stageFiveChoiceCardsFromBase(base, 4, themeName);
  const roundsData = Array.from({ length: 4 }, (_, index) => {
    const targetCard = cards[(hash + index) % cards.length];
    return {
      targetId: targetCard.id,
      targetLabel: targetCard.label,
      shuffleSeed: hash + index * 3
    };
  });
  return {
    id: `${base.id || "stage5-spotlight"}-spotlight`,
    engine: "spotlight",
    label: `${base.label || cue} Spotlight`,
    rounds: roundsData.length,
    shuffles: 3 + (hash % 2),
    peekMs: 880 + ((hash % 3) * 70),
    maxMisses: Math.max(2, Math.min(4, Number(base.maxMisses) || 3)),
    sourceRef: base.sourceRef,
    storyPrompt: base.storyPrompt || `Keep your eyes on the key truth in this ${cue} moment.`,
    secondaryPrompt: "Watch the highlighted clue, let the board shuffle, then find it again.",
    keyboardHint: "Keyboard: press 1-4 to pick the card after the shuffle.",
    themeName,
    cards,
    roundsData
  };
}

function stageFiveMemoryFlipFromBase(base, themeName = "") {
  const hash = stageFiveHashSeed(base, themeName);
  const cue = stageFiveThemeCue(themeName);
  const cards = stageFiveChoiceCardsFromBase(base, 4, themeName);
  const board = rotateKinds(
    cards.flatMap((card, index) => [
      { slotId: `${card.id}-a-${index}`, cardId: card.id },
      { slotId: `${card.id}-b-${index}`, cardId: card.id }
    ]),
    hash % Math.max(1, cards.length * 2)
  );
  return {
    id: `${base.id || "stage5-memory"}-memoryflip`,
    engine: "memoryflip",
    label: `${base.label || cue} Memory`,
    maxMisses: Math.max(2, Math.min(5, Number(base.maxMisses) || 4)),
    peekMs: 1180 + ((hash % 3) * 90),
    sourceRef: base.sourceRef,
    storyPrompt: base.storyPrompt || `Study the clues in this ${cue} scene, then match them from memory.`,
    secondaryPrompt: "Memorize the cards, then flip and match every pair.",
    keyboardHint: "Keyboard: press 1-8 to flip cards, or click/tap the board.",
    themeName,
    cards,
    board
  };
}

function stageFiveSealbreakFromBase(base, themeName = "") {
  const hash = stageFiveHashSeed(base, themeName);
  const cue = stageFiveThemeCue(themeName);
  const cards = stageFiveChoiceCardsFromBase(base, 6, themeName);
  const roundsData = Array.from({ length: 4 }, (_, index) => {
    const rotated = rotateKinds(cards, (hash + index) % cards.length);
    const targetCount = 2 + ((hash + index) % 2);
    const targets = rotated.slice(0, targetCount);
    const cells = targets.map((card, cellIndex) => ({
      slotId: `seal-target-${index}-${cellIndex}`,
      cardId: card.id
    }));
    const decoys = rotateKinds(cards, (hash + index + 2) % cards.length);
    let fillIndex = 0;
    while (cells.length < 9) {
      const pick = decoys[fillIndex % decoys.length];
      fillIndex += 1;
      if (targets.some((card) => card.id === pick.id)) continue;
      cells.push({
        slotId: `seal-decoy-${index}-${cells.length}`,
        cardId: pick.id
      });
    }
    return {
      prompt: `Break the seals marked ${targets.map((card) => card.label).join(" + ")}.`,
      targetIds: targets.map((card) => card.id),
      grid: rotateKinds(cells, (hash + index * 2) % cells.length)
    };
  });
  return {
    id: `${base.id || "stage5-sealbreak"}-sealbreak`,
    engine: "sealbreak",
    label: `${base.label || cue} Seal Break`,
    rounds: roundsData.length,
    maxMisses: Math.max(2, Math.min(4, Number(base.maxMisses) || 3)),
    sourceRef: base.sourceRef,
    storyPrompt: base.storyPrompt || `Identify the true seals in this ${cue} moment and break only the right ones.`,
    secondaryPrompt: "Read the clue and break only the correct seals.",
    keyboardHint: "Keyboard: press 1-9 to break the matching seals.",
    themeName,
    cards,
    roundsData
  };
}

function stageFiveShieldwallFromBase(base, themeName = "") {
  const hash = stageFiveHashSeed(base, themeName);
  const cue = stageFiveThemeCue(themeName);
  const cards = stageFiveChoiceCardsFromBase(base, 4, themeName);
  const roundsData = Array.from({ length: 5 }, (_, index) => {
    const lane = (hash + index * 2) % cards.length;
    return {
      lane,
      cardId: cards[lane].id,
      prompt: `Guard the ${cards[lane].label} lane before the strike lands.`
    };
  });
  return {
    id: `${base.id || "stage5-shieldwall"}-shieldwall`,
    engine: "shieldwall",
    label: `${base.label || cue} Shield Wall`,
    target: roundsData.length,
    maxMisses: Math.max(2, Math.min(4, Number(base.maxMisses) || 3)),
    speedMs: 1460 - ((hash % 3) * 90),
    sourceRef: base.sourceRef,
    storyPrompt: base.storyPrompt || `Hold the wall in this ${cue} challenge and block the right gate in time.`,
    secondaryPrompt: "Watch the attack lane, then raise the shield at the matching gate.",
    keyboardHint: "Keyboard: press 1-4 to guard the right gate, or tap the shield buttons.",
    themeName,
    cards,
    roundsData
  };
}

function shouldUseStageFiveSlingshot(base, themeName = "") {
  if (STAGE_FIVE_BATTLE_THEME_NAMES.has(themeName)) return true;
  const text = `${base?.label || ""} ${base?.storyPrompt || ""} ${base?.sourceRef || ""}`.toLowerCase();
  return STAGE_FIVE_SLINGSHOT_KEYWORDS.some((keyword) => text.includes(keyword));
}

function toNonDirectionalStageFiveMode(base, themeName = "") {
  if (!base || typeof base !== "object") return null;
  if (base.engine === "spotlight" || base.engine === "memoryflip" || base.engine === "sealbreak" || base.engine === "shieldwall") {
    return { ...base, themeName: base.themeName || themeName };
  }
  if (base.engine === "pattern") return stageFiveSpotlightFromBase(base, themeName);
  if (base.engine === "discern") return stageFiveMemoryFlipFromBase(base, themeName);
  if (base.engine === "timing") return stageFiveSealbreakFromBase(base, themeName);
  if (base.engine === "collect" || base.engine === "balance") return stageFiveShieldwallFromBase(base, themeName);
  if (base.engine === "slingshot") return stageFiveSlingshotFromDirectional(base, themeName);
  if (base.engine === "route") return stageFiveSpotlightFromBase(base, themeName);
  if (base.engine === "dodge") {
    return shouldUseStageFiveSlingshot(base, themeName)
      ? stageFiveSlingshotFromDirectional(base, themeName)
      : stageFiveShieldwallFromBase(base, themeName);
  }
  if (NON_DIRECTIONAL_STAGE_FIVE_ENGINES.has(base.engine)) {
    return { ...base, themeName: base.themeName || themeName };
  }
  return stageFiveSealbreakFromBase(base, themeName);
}

function stageFiveVariantModes(base, themeName = "") {
  if (!base || typeof base !== "object") return [];
  switch (base.engine) {
    case "spotlight":
      return [stageFiveMemoryFlipFromBase(base, themeName), stageFiveSealbreakFromBase(base, themeName), stageFiveShieldwallFromBase(base, themeName)];
    case "memoryflip":
      return [stageFiveSpotlightFromBase(base, themeName), stageFiveSealbreakFromBase(base, themeName), stageFiveShieldwallFromBase(base, themeName)];
    case "sealbreak":
      return [stageFiveSpotlightFromBase(base, themeName), stageFiveMemoryFlipFromBase(base, themeName), stageFiveShieldwallFromBase(base, themeName)];
    case "shieldwall":
      return [stageFiveSpotlightFromBase(base, themeName), stageFiveMemoryFlipFromBase(base, themeName), stageFiveSealbreakFromBase(base, themeName)];
    case "slingshot":
      return [stageFiveMemoryFlipFromBase(base, themeName), stageFiveSealbreakFromBase(base, themeName)];
    default:
      return [stageFiveSpotlightFromBase(base, themeName), stageFiveMemoryFlipFromBase(base, themeName), stageFiveSealbreakFromBase(base, themeName), stageFiveShieldwallFromBase(base, themeName)];
  }
}

function normalizedStageFivePool(rawPool, themeName = "") {
  const seen = new Set();
  const converted = [];
  (Array.isArray(rawPool) ? rawPool : []).forEach((mode) => {
    const normalized = toNonDirectionalStageFiveMode(mode, themeName);
    if (!normalized || !NON_DIRECTIONAL_STAGE_FIVE_ENGINES.has(normalized.engine)) return;
    const id = String(normalized.id || `${normalized.engine}-${normalized.label || converted.length}`);
    if (seen.has(id)) return;
    seen.add(id);
    converted.push(normalized);
  });
  return converted;
}

function expandedStageFivePool(rawPool, themeName = "", requiredCount = 0) {
  const seen = new Set();
  const expanded = [];
  const addMode = (mode) => {
    if (!mode || !NON_DIRECTIONAL_STAGE_FIVE_ENGINES.has(mode.engine)) return;
    const id = String(mode.id || `${mode.engine}-${expanded.length}`);
    if (seen.has(id)) return;
    seen.add(id);
    expanded.push(mode);
  };

  const normalized = normalizedStageFivePool(rawPool, themeName);
  normalized.forEach((base) => {
    addMode(base);
    stageFiveVariantModes(base, themeName).forEach(addMode);
  });

  if (expanded.length < requiredCount) {
    normalized.forEach((base) => {
      [
        stageFiveSpotlightFromBase(base, themeName),
        stageFiveMemoryFlipFromBase(base, themeName),
        stageFiveSealbreakFromBase(base, themeName),
        stageFiveShieldwallFromBase(base, themeName)
      ].forEach(addMode);
    });
  }

  return expanded;
}

const stageFiveSelectionCache = new Map();

function stageFiveBaseSelection(level) {
  if (stageFiveSelectionCache.has(level)) {
    return stageFiveSelectionCache.get(level);
  }

  const theme = levelThemeSequence[level - 1] || timelineThemes[timelineThemes.length - 1];
  const themedModes = STAGE_FIVE_THEMED_POOLS[theme.name];
  const useThemedModes = Array.isArray(themedModes) && themedModes.length;
  const rawPool = useThemedModes ? themedModes : interactiveModes;
  const normalizedPrimaryPool = useThemedModes
    ? expandedStageFivePool(rawPool, theme.name, themeLevelCount(theme))
    : normalizedStageFivePool(rawPool, theme.name);
  const normalizedFallbackPool = normalizedStageFivePool(interactiveModes, theme.name);
  const emergencyMode = {
    id: "stage5-emergency-timing",
    engine: "timing",
    label: "Faith Focus",
    target: 7,
    maxMisses: 4,
    speed: 780,
    sourceRef: theme.sourceRef,
    storyPrompt: "Stay focused and strike with precision.",
    secondaryPrompt: "Press Strike when the marker enters the gold zone.",
    keyboardHint: "Keyboard: press Space or Enter to strike in the gold zone."
  };
  const pool = normalizedPrimaryPool.length
    ? normalizedPrimaryPool
    : (normalizedFallbackPool.length ? normalizedFallbackPool : [emergencyMode]);

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
    const recentEngines = priorSameTheme.slice(-3).map((entry) => entry.engine);

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
  if (isEraBossStage(meta)) {
    const bossMode = bossModeForStage(meta, difficulty);
    if (bossMode) return bossMode;
  }
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
  ensureMusicHeartbeat();
}

let firstInteractionRecapArmed = false;
function armFirstInteractionRecap() {
  if (firstInteractionRecapArmed) return;
  firstInteractionRecapArmed = true;
  const handler = () => {
    if (!firstInteractionRecapArmed) return;
    firstInteractionRecapArmed = false;
    AUDIO_UNLOCK_EVENTS.forEach((eventName) => {
      document.removeEventListener(eventName, handler, true);
    });
    primeAudioAuto();
    if (state.audio.music && shouldKeepHubMusicAlive()) startMusicLoop();
    if (!state.activeStage) {
      playStoryRecapNow();
    }
  };
  AUDIO_UNLOCK_EVENTS.forEach((eventName) => {
    document.addEventListener(eventName, handler, true);
  });
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

  renderExperienceSections();
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

function pickPremiumNarrationVoice(language = "en") {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;

  const wantsSpanish = String(language || "").toLowerCase().startsWith("es");
  const langPattern = wantsSpanish ? /^es[-_]/i : /^en[-_]/i;
  const preferredPremium = wantsSpanish
    ? /premium|enhanced|neural|siri|paulina|monica|soledad|isabela|helena|luciana|camila|maria|jorge|diego|reed|evan/i
    : /premium|enhanced|neural|siri|reed|evan|alex|daniel|ava|allison|victoria|serena|samantha|joanna|emma|olivia|aria|zoe|luna/i;

  const localVoices = voices.filter((voice) => langPattern.test(voice.lang));
  const pool = localVoices.length ? localVoices : voices;
  const ranked = pool
    .map((voice) => {
      let score = 0;
      if (langPattern.test(voice.lang)) score += 35;
      if (wantsSpanish && /^es[-_]ES$/i.test(voice.lang)) score += 20;
      if (!wantsSpanish && /^en[-_]US$/i.test(voice.lang)) score += 20;
      if (preferredPremium.test(voice.name)) score += 60;
      if (/premium|enhanced|neural|siri|reed|evan/i.test(voice.name)) score += 40;
      if (voice.localService) score += 6;
      if (voice.default) score += 5;
      return { voice, score };
    })
    .sort((a, b) => b.score - a.score);

  return ranked.length ? ranked[0].voice : null;
}

function pickNarrationVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;

  const premium = pickPremiumNarrationVoice(state.language);
  if (premium) return premium;

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

function clearStoryRecapTimer() {
  if (!storyRecapTimer) return;
  window.clearTimeout(storyRecapTimer);
  storyRecapTimer = 0;
}

function stopStoryRecap() {
  clearStoryRecapTimer();
  setRecapIndicator(false);
  storyRecapAudioToken += 1;
  if (storyRecapAudio) {
    try {
      storyRecapAudio.pause();
      storyRecapAudio.src = "";
      storyRecapAudio.load();
    } catch (_) {
      // Ignore media teardown errors.
    }
    storyRecapAudio = null;
  }
  const activeUtterance = storyRecapUtterance;
  storyRecapUtterance = null;
  if (!activeUtterance || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch (_) {
    // Ignore speech engine teardown errors.
  }
}

function disarmStoryRecapRetry() {
  if (!storyRecapRetryArmed) return;
  AUDIO_UNLOCK_EVENTS.forEach((eventName) => {
    document.removeEventListener(eventName, handleStoryRecapRetry, true);
  });
  storyRecapRetryArmed = false;
}

function queueStoryRecapRetry(reason = "return") {
  pendingStoryRecapReason = String(reason || pendingStoryRecapReason || "return");
  if (storyRecapRetryArmed) return true;
  AUDIO_UNLOCK_EVENTS.forEach((eventName) => {
    document.addEventListener(eventName, handleStoryRecapRetry, true);
  });
  storyRecapRetryArmed = true;
  return true;
}

function handleStoryRecapRetry() {
  if (!pendingStoryRecapReason) {
    disarmStoryRecapRetry();
    return;
  }
  primeAudioAuto();
  window.setTimeout(() => {
    if (!pendingStoryRecapReason) return;
    const reason = pendingStoryRecapReason;
    playPreferredStoryRecap({ reason, force: true, ignoreUserActivation: true }).then((spoken) => {
      if (spoken) {
        pendingStoryRecapReason = "";
        disarmStoryRecapRetry();
      }
    });
  }, 90);
}

function completedLevelCount() {
  const completedSet = new Set(state.completed || []);
  let total = 0;
  for (let level = 1; level <= TOTAL_LEVELS; level += 1) {
    let done = true;
    for (let stage = 1; stage <= STAGES_PER_LEVEL; stage += 1) {
      if (!completedSet.has(`l${level}-s${stage}`)) {
        done = false;
        break;
      }
    }
    if (done) total += 1;
  }
  return total;
}

function lastCompletedStageMeta() {
  const completedSet = new Set(state.completed || []);
  for (let index = stages.length - 1; index >= 0; index -= 1) {
    if (completedSet.has(stages[index].id)) return stages[index];
  }
  return null;
}

function nextStoryStageMeta() {
  const completedSet = new Set(state.completed || []);
  return stages.find((meta) => !completedSet.has(meta.id)) || null;
}

function storyBossDefeatCount() {
  const completedSet = new Set(state.completed || []);
  return stages.filter((meta) => isEraBossStage(meta) && completedSet.has(meta.id)).length;
}

function recentStoryBadgeNames(limit = 3) {
  return (state.badges || [])
    .slice(-Math.max(1, limit))
    .map((badgeId) => getBadgeById(badgeId))
    .filter(Boolean)
    .map((badge) => String(badge.name || "").trim())
    .filter(Boolean);
}

function storyRecapPayload() {
  const playerName = displayPlayerName();
  const stagesCleared = Math.max(0, Number((state.completed || []).length));
  const levelsCleared = completedLevelCount();
  const badgesEarned = Math.max(0, Number((state.badges || []).length));
  const bossesDefeated = storyBossDefeatCount();
  const masteredCount = masteredVerseEntries(40).length;
  const recentBadges = recentStoryBadgeNames(3);
  const nextMeta = nextStoryStageMeta();
  const lastMeta = getStageMeta(state.lastStage || "") || lastCompletedStageMeta();
  const focusMeta = nextMeta || lastMeta || stages[0] || null;

  if (!focusMeta) return null;

  const bossBitEn = bossesDefeated > 0
    ? `, and defeated ${bossesDefeated} ${bossesDefeated === 1 ? "boss" : "bosses"}`
    : "";
  const bossBitEs = bossesDefeated > 0
    ? ` y derrotaste ${bossesDefeated} ${bossesDefeated === 1 ? "jefe" : "jefes"}`
    : "";
  const masteryBitEn = masteredCount > 0
    ? ` You have also mastered ${masteredCount} ${masteredCount === 1 ? "verse" : "verses"}.`
    : "";
  const masteryBitEs = masteredCount > 0
    ? ` Tambien dominaste ${masteredCount} ${masteredCount === 1 ? "versiculo" : "versiculos"}.`
    : "";
  const badgeNamesBitEn = recentBadges.length
    ? ` Your newest ${recentBadges.length === 1 ? "badge is" : "badges are"} ${recentBadges.join(", ")}.`
    : "";
  const badgeNamesBitEs = recentBadges.length
    ? ` Tus ${recentBadges.length === 1 ? "ultima insignia es" : "ultimas insignias son"} ${recentBadges.join(", ")}.`
    : "";
  const encouragementEn = challengeCopy(
    " Keep going. Your shield is growing stronger.",
    ""
  );
  const encouragementEs = challengeCopy(
    "",
    " Sigue adelante. Tu escudo se esta fortaleciendo."
  );

  const text = stagesCleared <= 0
    ? challengeCopy(
      `Welcome back, ${playerName}. Your story begins in ${focusMeta.theme.name}, ${focusMeta.theme.period}. Level 1, stage 1 is ready. Start the journey and build your shield of faith.${encouragementEn}`,
      `Bienvenido de nuevo, ${playerName}. Tu historia comienza en ${focusMeta.theme.name}, ${focusMeta.theme.period}. El nivel 1, etapa 1 ya esta listo. Comienza el viaje y fortalece tu escudo de fe.${encouragementEs}`
    )
    : nextMeta
      ? challengeCopy(
        `Welcome back, ${playerName}. You have cleared ${stagesCleared} story stages, finished ${levelsCleared} full levels, and earned ${badgesEarned} badges${bossBitEn}.${badgeNamesBitEn} You are now in ${focusMeta.theme.name}, ${focusMeta.theme.period}. Next, continue with level ${nextMeta.level}, stage ${nextMeta.stage}.${masteryBitEn}${encouragementEn}`,
        `Bienvenido de nuevo, ${playerName}. Ya completaste ${stagesCleared} etapas de la historia, terminaste ${levelsCleared} niveles completos y ganaste ${badgesEarned} insignias${bossBitEs}.${badgeNamesBitEs} Ahora estas en ${focusMeta.theme.name}, ${focusMeta.theme.period}. Sigue con el nivel ${nextMeta.level}, etapa ${nextMeta.stage}.${masteryBitEs}${encouragementEs}`
      )
      : challengeCopy(
        `Welcome back, ${playerName}. You completed all ${TOTAL_STAGES} story stages, earned ${badgesEarned} badges${bossBitEn}.${badgeNamesBitEn} You finished the Genesis to David journey.${masteryBitEn}${encouragementEn}`,
        `Bienvenido de nuevo, ${playerName}. Completaste las ${TOTAL_STAGES} etapas de la historia, ganaste ${badgesEarned} insignias${bossBitEs}.${badgeNamesBitEs} Terminaste el recorrido de Genesis a David.${masteryBitEs}${encouragementEs}`
      );

  const fingerprint = [
    state.language,
    state.playerName || "",
    stagesCleared,
    levelsCleared,
    badgesEarned,
    bossesDefeated,
    masteredCount,
    recentBadges.join(","),
    focusMeta.id,
    nextMeta ? nextMeta.id : "complete",
    state.difficulty
  ].join("|");

  return {
    text,
    fingerprint,
    stagesCleared,
    recentBadges,
    focusThemeName: String((focusMeta.theme && focusMeta.theme.name) || "").trim(),
    completeJourney: !nextMeta
  };
}

function storyRecapNeedsUserActivation() {
  try {
    if (!navigator || !navigator.userActivation) return false;
    return !navigator.userActivation.hasBeenActive;
  } catch (_) {
    return false;
  }
}

function canSpeakStoryRecap() {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return false;
  if (document.visibilityState && document.visibilityState !== "visible") return false;
  if (state.activeStage) return false;
  if (storyRecapUtterance || storyRecapAudio || storyNarrationUtterance || storyNarrationAudio || verseAudioUtterance || badgePraiseUtterance) return false;
  if (welcomeOverlay && !welcomeOverlay.classList.contains("hidden")) return false;
  if (activityOverlay && !activityOverlay.classList.contains("hidden")) return false;
  if (shareOverlay && !shareOverlay.classList.contains("hidden")) return false;
  if (badgeShieldOverlay && !badgeShieldOverlay.classList.contains("hidden")) return false;
  if (eraCardPreviewOverlay && !eraCardPreviewOverlay.classList.contains("hidden")) return false;
  if (eraFinaleOverlay && !eraFinaleOverlay.classList.contains("hidden")) return false;
  if (isStoryTheaterOpen() || isFinalOpen() || isCreditsOpen()) return false;
  return true;
}

function canPlayStoryRecapMedia() {
  if (document.visibilityState && document.visibilityState !== "visible") return false;
  if (state.activeStage) return false;
  if (storyRecapUtterance || storyRecapAudio || storyNarrationUtterance || storyNarrationAudio || verseAudioUtterance || badgePraiseUtterance) return false;
  if (welcomeOverlay && !welcomeOverlay.classList.contains("hidden")) return false;
  if (activityOverlay && !activityOverlay.classList.contains("hidden")) return false;
  if (shareOverlay && !shareOverlay.classList.contains("hidden")) return false;
  if (badgeShieldOverlay && !badgeShieldOverlay.classList.contains("hidden")) return false;
  if (eraCardPreviewOverlay && !eraCardPreviewOverlay.classList.contains("hidden")) return false;
  if (eraFinaleOverlay && !eraFinaleOverlay.classList.contains("hidden")) return false;
  if (isStoryTheaterOpen() || isFinalOpen() || isCreditsOpen()) return false;
  return true;
}

function recapAudioSlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function storyRecapAudioBasePath() {
  return "./assets/cutscenes/hq/recap/en";
}

function buildRecordedStoryRecapClips(payload) {
  if (!payload || state.language !== "en") return [];

  const base = storyRecapAudioBasePath();
  const clips = [];
  const pushFixed = (name) => clips.push(`${base}/fixed/${name}.wav`);
  const pushTheme = (themeName) => {
    const slug = recapAudioSlug(themeName);
    if (slug) clips.push(`${base}/themes/${slug}.wav`);
  };
  const pushBadge = (badgeName) => {
    const slug = recapAudioSlug(badgeName);
    if (slug) clips.push(`${base}/badges/${slug}.wav`);
  };

  pushFixed("welcome-back");

  if (payload.completeJourney) {
    pushFixed("you-finished-the-journey");
  } else if (payload.stagesCleared <= 0) {
    pushFixed("your-story-begins-in");
    pushTheme(payload.focusThemeName);
  } else {
    pushFixed("you-are-now-in");
    pushTheme(payload.focusThemeName);
  }

  const badges = (payload.recentBadges || []).slice(0, 3);
  if (badges.length === 1) {
    pushFixed("your-newest-badge-is");
    pushBadge(badges[0]);
  } else if (badges.length > 1) {
    pushFixed("your-newest-badges-are");
    badges.forEach(pushBadge);
  }

  pushFixed("keep-going");
  return clips;
}

function playRecordedStoryRecap(options = {}) {
  if (!options.ignoreUserActivation && storyRecapNeedsUserActivation()) {
    queueStoryRecapRetry(options.reason || "return");
    return Promise.resolve(false);
  }

  if (!canPlayStoryRecapMedia()) {
    queueStoryRecapRetry(options.reason || "return");
    return Promise.resolve(false);
  }

  const payload = storyRecapPayload();
  if (!payload || !payload.text) return Promise.resolve(false);

  const now = Date.now();
  if (!options.force && payload.fingerprint === lastStoryRecapFingerprint && now - lastStoryRecapAt < 60000) {
    return Promise.resolve(false);
  }

  const clips = buildRecordedStoryRecapClips(payload);
  if (!clips.length) return Promise.resolve(false);

  stopStoryRecap();
  const token = ++storyRecapAudioToken;
  let resolved = false;
  let started = false;
  let index = 0;

  return new Promise((resolve) => {
    const finishResolve = (value) => {
      if (resolved) return;
      resolved = true;
      resolve(value);
    };

    const clearActive = () => {
      if (storyRecapAudioToken !== token) return;
      storyRecapAudio = null;
      setRecapIndicator(false);
    };

    const playNext = () => {
      if (storyRecapAudioToken !== token) {
        finishResolve(started);
        return;
      }
      if (index >= clips.length) {
        clearActive();
        finishResolve(started);
        return;
      }

      const src = clips[index];
      index += 1;
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.muted = false;
      audio.volume = 1;
      audio.currentTime = 0;
      storyRecapAudio = audio;

      audio.onended = () => {
        playNext();
      };
      audio.onerror = () => {
    if (!started && index <= 1) {
      clearActive();
      setRecapIndicator(false);
      finishResolve(false);
      return;
    }
        playNext();
      };

      try {
        const attempt = audio.play();
        if (attempt && typeof attempt.then === "function") {
          attempt.then(() => {
            if (!started) {
              started = true;
              setRecapIndicator(true, challengeCopy("Recap playing", "Resumen reproduciendo"));
              lastStoryRecapFingerprint = payload.fingerprint;
              lastStoryRecapAt = Date.now();
              pendingStoryRecapReason = "";
              disarmStoryRecapRetry();
              finishResolve(true);
            }
          }).catch(() => {
            if (!started && index <= 1) {
              clearActive();
              finishResolve(false);
              return;
            }
            playNext();
          });
        } else if (!started) {
          started = true;
          setRecapIndicator(true, challengeCopy("Recap playing", "Resumen reproduciendo"));
          lastStoryRecapFingerprint = payload.fingerprint;
          lastStoryRecapAt = Date.now();
          pendingStoryRecapReason = "";
          disarmStoryRecapRetry();
          finishResolve(true);
        }
      } catch (_) {
        if (!started && index <= 1) {
          clearActive();
          setRecapIndicator(false);
          finishResolve(false);
          return;
        }
        playNext();
      }
    };

    playNext();
  });
}

function playPreferredStoryRecap(options = {}) {
  const spoken = speakStoryReturnRecap(options);
  if (spoken) return Promise.resolve(true);
  return playRecordedStoryRecap(options);
}

function speakStoryReturnRecap(options = {}) {
  if (!options.ignoreUserActivation && storyRecapNeedsUserActivation()) {
    queueStoryRecapRetry(options.reason || "return");
    return false;
  }

  if (!canSpeakStoryRecap()) {
    queueStoryRecapRetry(options.reason || "return");
    return false;
  }

  const payload = storyRecapPayload();
  if (!payload || !payload.text) return false;

  const now = Date.now();
  if (!options.force && payload.fingerprint === lastStoryRecapFingerprint && now - lastStoryRecapAt < 60000) {
    return false;
  }

  stopStoryRecap();
  const utterance = new SpeechSynthesisUtterance(payload.text);
  const voice = pickPremiumNarrationVoice(state.language) || pickNarrationVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "en-US";
  } else {
    utterance.lang = state.language === "es" ? "es-ES" : "en-US";
  }
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.rate = state.language === "es" ? 0.9 : 0.88;
  storyRecapUtterance = utterance;

  const finish = () => {
    if (storyRecapUtterance === utterance) storyRecapUtterance = null;
    setRecapIndicator(false);
  };
  utterance.onend = finish;
  utterance.onerror = finish;

  const speak = () => {
    if (!canSpeakStoryRecap()) {
      queueStoryRecapRetry(options.reason || "return");
      finish();
      return;
    }
    try {
      setRecapIndicator(true, challengeCopy("Recap playing", "Resumen reproduciendo"));
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      lastStoryRecapFingerprint = payload.fingerprint;
      lastStoryRecapAt = Date.now();
      pendingStoryRecapReason = "";
      disarmStoryRecapRetry();
    } catch (_) {
      queueStoryRecapRetry(options.reason || "return");
      finish();
    }
  };

  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) {
    // Speak immediately with the browser default voice so we stay inside the
    // trusted interaction window on desktop/mobile browsers.
    speak();
    return true;
  }

  speak();
  return true;
}

function scheduleStoryReturnRecap(reason = "return", delayMs = 420) {
  clearStoryRecapTimer();
  storyRecapTimer = window.setTimeout(() => {
    storyRecapTimer = 0;
    playPreferredStoryRecap({ reason });
  }, Math.max(0, delayMs));
}

function playStoryRecapNow() {
  primeAudioAuto();
  try {
    if ("speechSynthesis" in window) window.speechSynthesis.resume();
  } catch (_) {
    // Ignore resume failures and rely on direct speak.
  }
  showFeatureMoment(
    challengeCopy("Greeting + badge recap starting", "Iniciando saludo y resumen"),
    challengeCopy("Audio will begin if your device allows it.", "El audio comenzara si tu dispositivo lo permite."),
    { icon: "🔊", durationMs: 1600 }
  );
  pendingStoryRecapReason = "";
  disarmStoryRecapRetry();
  playPreferredStoryRecap({ reason: "manual-button", force: true, ignoreUserActivation: true }).then((spoken) => {
    if (spoken) {
      showFeatureMoment(
        challengeCopy("Welcome recap playing", "Reproduciendo resumen de bienvenida"),
        challengeCopy("Your story progress is now being read aloud.", "Tu progreso de la historia se esta leyendo en voz alta."),
        { icon: "🔊", durationMs: 1600 }
      );
      return;
    }
    showFeatureMoment(
      challengeCopy("Recap unavailable", "Resumen no disponible"),
      challengeCopy("If you still hear nothing, check device volume and silent mode, then tap again.", "Si aun no escuchas nada, revisa el volumen y el modo silencio, y toca este boton otra vez."),
      { icon: "⚠️", sfx: null, durationMs: 2600 }
    );
  });
  return true;
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

function verseAudioLabel(active = false) {
  return active
    ? challengeCopy("Stop Audio", "Detener audio")
    : challengeCopy("Listen to Verse", "Escuchar versiculo");
}

function resetVerseAudioButton() {
  if (!activeVerseAudioButton) return;
  activeVerseAudioButton.textContent = verseAudioLabel(false);
  activeVerseAudioButton.dataset.playing = "false";
  activeVerseAudioButton = null;
}

function stopVerseAudio() {
  verseAudioUtterance = null;
  resetVerseAudioButton();
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch (_) {
    // Ignore speech engine teardown errors.
  }
}

function factSnippetFromParts(parts) {
  return (Array.isArray(parts) ? parts : [])
    .map((part) => String(part || "").trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function verseAudioTextForReference(reference, fallbackText = "") {
  const normalizedReference = normalizeSourceRef(reference);
  const firstRef = firstSourceEntry(normalizedReference) || normalizedReference;
  const matchingFacts = ALL_FACT_BANKS.filter((entry) => {
    const entryRef = normalizeSourceRef(entry && entry.sourceRef);
    if (!entryRef) return false;
    return entryRef === normalizedReference
      || sourceRefIncludesReference(normalizedReference, entryRef)
      || sourceRefIncludesReference(entryRef, normalizedReference);
  });

  const snippets = [];
  const seenRefs = new Set();
  matchingFacts.forEach((entry) => {
    if (snippets.length >= 2) return;
    const entryRef = normalizeSourceRef(entry && entry.sourceRef);
    if (!entryRef || seenRefs.has(entryRef)) return;
    const snippet = factSnippetFromParts(entry.parts);
    if (!snippet) return;
    seenRefs.add(entryRef);
    snippets.push(`${firstSourceEntry(entryRef) || entryRef}. ${snippet}`);
  });

  if (snippets.length) return snippets.join(" ");

  const cleanFallback = String(fallbackText || "").replace(/\s+/g, " ").trim();
  if (cleanFallback) return `${firstRef}. ${cleanFallback}`;
  return `${firstRef}.`;
}

function speakVerseAudio(reference, button = null, fallbackText = "") {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;
  if (button && activeVerseAudioButton === button && verseAudioUtterance) {
    stopVerseAudio();
    return;
  }

  stopStoryRecap();
  stopVerseAudio();
  const utterance = new SpeechSynthesisUtterance(verseAudioTextForReference(reference, fallbackText));
  const voice = pickPremiumNarrationVoice(state.language) || pickNarrationVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "en-US";
  } else {
    utterance.lang = state.language === "es" ? "es-ES" : "en-US";
  }
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.rate = state.language === "es" ? 0.9 : 0.88;
  verseAudioUtterance = utterance;
  if (button) {
    activeVerseAudioButton = button;
    activeVerseAudioButton.textContent = verseAudioLabel(true);
    activeVerseAudioButton.dataset.playing = "true";
  }
  const complete = () => {
    if (verseAudioUtterance === utterance) verseAudioUtterance = null;
    resetVerseAudioButton();
  };
  utterance.onend = complete;
  utterance.onerror = complete;

  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } catch (_) {
    complete();
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

  stopStoryRecap();
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
    speaker: "Listen closely and identify who said it in Scripture.",
    hebrew: "Study God's revealed names and their meaning in context.",
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

  if (activity.type === "quiz" || activity.type === "speaker" || activity.type === "hebrew") {
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

  primeAudioAuto();
  captureHubScrollPosition(stageId);
  pendingStageFocusId = null;
  warmPosterCache(meta.theme.era);
  warmCutsceneMediaCache(meta.theme.era);
  warmNarrationAudioCache(meta.theme.era);
  warmUpcomingStageMedia(meta);

  clearActiveChallenge();
  hideStageCompleteToast();
  stopStoryRecap();
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
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef, { fallbackText: activity.prompt }) : null;
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
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef, {
    fallbackText: `${activity.prompt} ${activity.statement} ${activity.claim}`
  }) : null;
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
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef, { fallbackText: activity.prompt }) : null;
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
    const chosenKeys = chosenValues.map((value) => normalizeQuizAnswerKey(value));
    const uniqueChoices = new Set(chosenKeys);
    if (uniqueChoices.size !== chosenKeys.length) {
      feedback.className = "feedback warn";
      feedback.textContent = challengeCopy("Use each answer only once.", "Usa cada respuesta solo una vez.");
      return;
    }

    const isCorrect = selects.every(({ pair, select }) => normalizeQuizAnswerKey(select.value) === normalizeQuizAnswerKey(pair.right));
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
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef, {
    fallbackText: `${activity.prompt} ${activity.clue || ""}`
  }) : null;

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
    const acceptedAnswers = [activity.answer]
      .concat(Array.isArray(activity.acceptedAnswers) ? activity.acceptedAnswers : []);
    const acceptedSet = new Set();
    acceptedAnswers.forEach((entry) => {
      const normalized = normalizeSpellingAnswer(entry);
      if (!normalized) return;
      acceptedSet.add(normalized);
      spellingAnswerAliases(normalized).forEach((alias) => {
        const aliasNormalized = normalizeSpellingAnswer(alias);
        if (aliasNormalized) acceptedSet.add(aliasNormalized);
      });
    });
    const isCorrect = acceptedSet.has(attempt);

    if (!attempt) {
      feedback.className = "feedback warn";
      feedback.textContent = t("typeAnswerFirst");
      return;
    }

    if (isCorrect) {
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
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef, { fallbackText: activity.prompt }) : null;
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
  const source = activity.sourceRef ? renderSourceVerse(activity.sourceRef, { fallbackText: activity.prompt }) : null;

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

  const source = renderSourceVerse(activity.sourceRef || meta.theme.sourceRef, {
    fallbackText: activity.prompt || activity.message || ""
  });

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
  const source = shouldShowQuestionSource() && sourceRef ? renderSourceVerse(sourceRef, { fallbackText: promptText }) : null;
  const feedback = document.createElement("p");
  feedback.className = "feedback";

  if (source) {
    activityPanel.append(header, prompt, source);
  } else {
    activityPanel.append(header, prompt);
  }

  if (mode.engine === "boss") {
    activeCleanup = renderBoss(meta, mode, feedback);
  } else if (mode.engine === "spotlight") {
    activeCleanup = renderSpotlight(meta, mode, feedback);
  } else if (mode.engine === "memoryflip") {
    activeCleanup = renderMemoryFlip(meta, mode, feedback);
  } else if (mode.engine === "sealbreak") {
    activeCleanup = renderSealbreak(meta, mode, feedback);
  } else if (mode.engine === "shieldwall") {
    activeCleanup = renderShieldwall(meta, mode, feedback);
  } else if (mode.engine === "pattern") {
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

function bossBattlePalette(era) {
  const palette = {
    genesis: {
      accent: "#d9b15c",
      accentSoft: "rgba(217,177,92,0.28)",
      glow: "rgba(241,199,110,0.34)",
      player: "#7bc9d7",
      playerGlow: "rgba(123,201,215,0.3)"
    },
    patriarchs: {
      accent: "#c89a63",
      accentSoft: "rgba(200,154,99,0.28)",
      glow: "rgba(222,175,108,0.3)",
      player: "#8ed7bc",
      playerGlow: "rgba(142,215,188,0.28)"
    },
    exodus: {
      accent: "#79d0e8",
      accentSoft: "rgba(121,208,232,0.24)",
      glow: "rgba(121,208,232,0.34)",
      player: "#f6d37a",
      playerGlow: "rgba(246,211,122,0.28)"
    },
    sinai: {
      accent: "#f0cf93",
      accentSoft: "rgba(240,207,147,0.24)",
      glow: "rgba(240,207,147,0.32)",
      player: "#89baf6",
      playerGlow: "rgba(137,186,246,0.26)"
    },
    wilderness: {
      accent: "#c08f58",
      accentSoft: "rgba(192,143,88,0.24)",
      glow: "rgba(220,168,92,0.28)",
      player: "#90d4c7",
      playerGlow: "rgba(144,212,199,0.28)"
    },
    conquest: {
      accent: "#d6a64b",
      accentSoft: "rgba(214,166,75,0.26)",
      glow: "rgba(214,166,75,0.32)",
      player: "#8fc7ff",
      playerGlow: "rgba(143,199,255,0.3)"
    },
    judges: {
      accent: "#d27a52",
      accentSoft: "rgba(210,122,82,0.26)",
      glow: "rgba(210,122,82,0.34)",
      player: "#f1d48b",
      playerGlow: "rgba(241,212,139,0.24)"
    },
    samuel: {
      accent: "#b78cf0",
      accentSoft: "rgba(183,140,240,0.24)",
      glow: "rgba(183,140,240,0.32)",
      player: "#8fcff1",
      playerGlow: "rgba(143,207,241,0.28)"
    },
    saul: {
      accent: "#cb6b66",
      accentSoft: "rgba(203,107,102,0.24)",
      glow: "rgba(203,107,102,0.32)",
      player: "#f3d489",
      playerGlow: "rgba(243,212,137,0.24)"
    },
    david: {
      accent: "#f0d17e",
      accentSoft: "rgba(240,209,126,0.24)",
      glow: "rgba(240,209,126,0.34)",
      player: "#85d0ff",
      playerGlow: "rgba(133,208,255,0.28)"
    },
    generic: {
      accent: "#d9b15c",
      accentSoft: "rgba(217,177,92,0.28)",
      glow: "rgba(241,199,110,0.34)",
      player: "#7bc9d7",
      playerGlow: "rgba(123,201,215,0.3)"
    }
  };
  return palette[era] || palette.generic;
}

function bossBattleBackdropStyle(era, frameIndex = 0) {
  const view = cutsceneStillFrameViewConfig(era, frameIndex);
  const fit = view.fit || "cover";
  const scale = Number(view.scale);
  const hasScale = Number.isFinite(scale) && scale > 0 && Math.abs(scale - 1) > 0.001;
  const size = fit === "contain"
    ? (hasScale ? `${Math.round(scale * 100)}% auto` : "contain")
    : (hasScale ? `${Math.round(scale * 100)}%` : fit);
  return {
    size,
    position: view.position || "50% 50%",
    backgroundColor: view.backgroundColor || "#0f1722"
  };
}

function bossBattlePhaseLabel(roundIndex, totalRounds, bossRatio, playerRatio) {
  if (bossRatio <= 0.25) return challengeCopy("Final Strike", "Golpe final");
  if (playerRatio <= 0.34) return challengeCopy("Hold Fast", "Mantente firme");
  if (roundIndex >= Math.max(1, totalRounds - 2)) return challengeCopy("Turning Point", "Punto decisivo");
  return challengeCopy("Opening Clash", "Choque inicial");
}

function bossBattleStatusText(mode, bossRatio, playerRatio) {
  if (bossRatio <= 0.25) {
    return challengeCopy(
      `${mode.enemyName} is losing stamina. One more faithful block could end the battle.`,
      `${mode.enemyName} esta perdiendo resistencia. Un bloqueo fiel mas puede terminar la batalla.`
    );
  }
  if (playerRatio <= 0.34) {
    return challengeCopy(
      "Stand firm. Read the tell, raise the shield, and survive the next strike.",
      "Mantente firme. Lee la señal, levanta el escudo y sobrevive al siguiente golpe."
    );
  }
  if (bossRatio <= 0.5) {
    return challengeCopy(
      "The boss is weakening. Keep blocking with the right truth and drain the enemy's stamina.",
      "El jefe se esta debilitando. Sigue bloqueando con la verdad correcta y agota su resistencia."
    );
  }
  return challengeCopy(
    "The battle has begun. Read the clue and raise the shield from the right direction.",
    "La batalla ha comenzado. Lee la pista y levanta el escudo desde la direccion correcta."
  );
}

function ensureBossBattleStyles() {
  if (bossBattleStylesReady || typeof document === "undefined") return;
  const existing = document.getElementById("faithBossBattleStyles");
  if (existing) {
    bossBattleStylesReady = true;
    return;
  }

  const style = document.createElement("style");
  style.id = "faithBossBattleStyles";
  style.textContent = `
    .faith-boss-arena {
      position: relative;
      overflow: hidden;
      isolation: isolate;
      border-radius: 24px;
      border: 1px solid rgba(240, 207, 147, 0.18);
      box-shadow: 0 28px 60px rgba(0, 0, 0, 0.28);
      background: linear-gradient(180deg, rgba(15, 22, 33, 0.98), rgba(10, 15, 23, 0.98));
    }
    .faith-boss-backdrop,
    .faith-boss-veil,
    .faith-boss-atmosphere {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .faith-boss-backdrop {
      opacity: 0.9;
      transform: scale(1.04);
      filter: saturate(1.08) contrast(1.02) brightness(0.48);
      transition: transform 220ms ease, filter 220ms ease, opacity 220ms ease;
    }
    .faith-boss-veil {
      background:
        radial-gradient(circle at 20% 18%, rgba(255, 255, 255, 0.08), transparent 34%),
        radial-gradient(circle at 80% 10%, var(--boss-glow), transparent 30%),
        linear-gradient(180deg, rgba(8, 12, 18, 0.16), rgba(8, 12, 18, 0.72) 42%, rgba(8, 12, 18, 0.92));
      transition: background 220ms ease;
    }
    .faith-boss-atmosphere span {
      position: absolute;
      width: 180px;
      height: 180px;
      border-radius: 999px;
      background: radial-gradient(circle, var(--boss-accent-soft), transparent 70%);
      filter: blur(8px);
      opacity: 0.72;
      animation: faithBossFloat 6s ease-in-out infinite;
    }
    .faith-boss-atmosphere span:nth-child(1) { top: -18px; left: -24px; }
    .faith-boss-atmosphere span:nth-child(2) { top: 26%; right: -36px; animation-duration: 7.2s; }
    .faith-boss-atmosphere span:nth-child(3) { bottom: -42px; left: 28%; animation-duration: 8.1s; }
    .faith-boss-content {
      position: relative;
      z-index: 1;
      display: grid;
      gap: 0.95rem;
      padding: 1.05rem;
    }
    .faith-boss-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.9rem;
      flex-wrap: wrap;
    }
    .faith-boss-identity {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      min-width: min(100%, 460px);
    }
    .faith-boss-icon {
      position: relative;
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 999px;
      display: grid;
      place-items: center;
      font-size: 2.05rem;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), var(--boss-accent-soft));
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 0 24px var(--boss-glow), 0 18px 32px rgba(0,0,0,0.34);
      animation: faithBossFloat 3.8s ease-in-out infinite, faithBossPulse 1.9s ease-in-out infinite;
    }
    .faith-boss-icon::after {
      content: "";
      position: absolute;
      inset: -7px;
      border-radius: inherit;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .faith-boss-icon.is-danger {
      animation: faithBossFloat 2.2s ease-in-out infinite, faithBossPulse 0.96s ease-in-out infinite;
    }
    .faith-boss-copy {
      display: grid;
      gap: 0.18rem;
    }
    .faith-boss-title {
      margin: 0;
      font-size: 1.35rem;
    }
    .faith-boss-story {
      margin: 0;
    }
    .faith-boss-statusline {
      margin: 0.12rem 0 0;
      font-size: 0.94rem;
      font-weight: 700;
      color: var(--boss-accent);
      text-shadow: 0 0 16px rgba(0, 0, 0, 0.4);
    }
    .faith-boss-meta {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      flex-wrap: wrap;
    }
    .faith-boss-meta-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 2rem;
      padding: 0.38rem 0.72rem;
      border-radius: 999px;
      border: 1px solid rgba(240, 207, 147, 0.22);
      background: rgba(8, 12, 18, 0.6);
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 0.03em;
      color: #f6ead2;
    }
    .faith-boss-bars {
      display: grid;
      gap: 0.82rem;
    }
    .faith-boss-health-row {
      display: grid;
      gap: 0.28rem;
    }
    .faith-boss-health-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.6rem;
    }
    .faith-boss-health-value {
      color: #efe3cb;
      font-size: 0.92rem;
      font-weight: 700;
    }
    .faith-boss-shell {
      position: relative;
      height: 16px;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid rgba(240, 207, 147, 0.18);
      background: linear-gradient(180deg, rgba(18,24,36,0.96), rgba(9,13,20,0.98));
    }
    .faith-boss-fill {
      height: 100%;
      width: 100%;
      border-radius: 999px;
      transition: width 220ms ease, filter 220ms ease;
    }
    .faith-boss-round {
      border: 1px solid rgba(240, 207, 147, 0.18);
      border-radius: 20px;
      background: linear-gradient(180deg, rgba(12,18,28,0.84), rgba(8,13,20,0.82));
      padding: 1rem;
      display: grid;
      gap: 0.75rem;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    }
    .faith-boss-roundlabel {
      margin: 0;
    }
    .faith-boss-prompt {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 1.45;
    }
    .faith-boss-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 0.8rem;
    }
    .faith-boss-option {
      min-height: 98px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      text-align: center;
      line-height: 1.3;
      font-weight: 700;
      border-radius: 18px;
      border: 1px solid rgba(240, 207, 147, 0.18);
      background:
        radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 46%),
        linear-gradient(180deg, rgba(22, 30, 43, 0.96), rgba(12, 18, 27, 0.98));
      box-shadow: 0 14px 30px rgba(0,0,0,0.22);
      transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
    }
    .faith-boss-option:hover:not(:disabled),
    .faith-boss-option:focus-visible {
      transform: translateY(-3px) scale(1.01);
      border-color: rgba(240, 207, 147, 0.34);
      box-shadow: 0 16px 34px rgba(0,0,0,0.26), 0 0 0 1px rgba(240, 207, 147, 0.08);
      outline: none;
    }
    .faith-boss-option:disabled {
      cursor: default;
      opacity: 0.96;
    }
    .faith-boss-option .boss-hotkey {
      font-size: 0.76rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(240, 228, 205, 0.82);
    }
    .faith-boss-option .boss-icon {
      font-size: 1.55rem;
      line-height: 1;
    }
    .faith-boss-option .boss-label {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.34;
    }
    .faith-boss-option.correct {
      border-color: rgba(130, 211, 146, 0.62) !important;
      box-shadow: 0 0 0 2px rgba(130, 211, 146, 0.34), 0 16px 32px rgba(70, 170, 88, 0.2) !important;
      background: linear-gradient(180deg, rgba(28, 54, 37, 0.96), rgba(13, 28, 20, 0.98)) !important;
    }
    .faith-boss-option.wrong {
      border-color: rgba(226, 122, 122, 0.62) !important;
      box-shadow: 0 0 0 2px rgba(226, 122, 122, 0.34), 0 16px 32px rgba(160, 60, 60, 0.2) !important;
      background: linear-gradient(180deg, rgba(58, 25, 25, 0.96), rgba(24, 12, 12, 0.98)) !important;
    }
    .faith-boss-stage {
      display: grid;
      grid-template-columns: minmax(122px, 1fr) minmax(280px, 420px) minmax(122px, 1fr);
      grid-template-rows: auto 1fr auto;
      grid-template-areas:
        ". up ."
        "left center right"
        ". down .";
      align-items: center;
      justify-items: center;
      gap: 0.8rem 0.95rem;
    }
    .faith-boss-weakpoint {
      width: 100%;
      max-width: 210px;
      min-height: 88px;
      display: grid;
      gap: 0.18rem;
      align-content: center;
      justify-items: center;
      padding: 0.72rem 0.7rem;
      border-radius: 18px;
      border: 1px solid rgba(240, 207, 147, 0.18);
      background: linear-gradient(180deg, rgba(22, 30, 43, 0.94), rgba(12, 18, 27, 0.96));
      box-shadow: 0 14px 28px rgba(0,0,0,0.18);
      text-align: center;
      transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
    }
    .faith-boss-weakpoint.is-up { grid-area: up; }
    .faith-boss-weakpoint.is-left { grid-area: left; }
    .faith-boss-weakpoint.is-right { grid-area: right; }
    .faith-boss-weakpoint.is-down { grid-area: down; }
    .faith-boss-weakpoint.correct {
      border-color: rgba(130, 211, 146, 0.62);
      box-shadow: 0 0 0 2px rgba(130, 211, 146, 0.32), 0 16px 32px rgba(70, 170, 88, 0.18);
      transform: translateY(-3px);
    }
    .faith-boss-weakpoint.wrong {
      border-color: rgba(226, 122, 122, 0.62);
      box-shadow: 0 0 0 2px rgba(226, 122, 122, 0.32), 0 16px 32px rgba(160, 60, 60, 0.18);
      transform: translateY(-3px);
    }
    .faith-boss-weakpoint.incoming {
      border-color: rgba(240, 207, 147, 0.66);
      box-shadow:
        0 0 0 2px rgba(240, 207, 147, 0.28),
        0 18px 34px rgba(214, 168, 72, 0.22);
      animation: faithBossIncomingPulse 0.56s ease-in-out infinite;
    }
    .faith-boss-target-dir {
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(240, 228, 205, 0.78);
    }
    .faith-boss-target-label {
      font-size: 0.95rem;
      font-weight: 800;
      line-height: 1.28;
      color: #f7ecd8;
    }
    .faith-boss-sprite-frame {
      grid-area: center;
      width: min(100%, 420px);
      align-self: stretch;
      justify-self: stretch;
      padding: 0.75rem 0.75rem 0.45rem;
      border-radius: 22px;
      border: 1px solid rgba(240, 207, 147, 0.2);
      background:
        radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 36%),
        linear-gradient(180deg, rgba(16, 24, 36, 0.9), rgba(8, 13, 20, 0.96));
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 36px rgba(0,0,0,0.22);
    }
    .faith-boss-sprite {
      width: 100%;
      aspect-ratio: 5 / 6;
      display: grid;
      place-items: center;
      overflow: hidden;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), transparent 18%),
        radial-gradient(circle at 50% 18%, var(--boss-accent-soft), transparent 34%),
        linear-gradient(180deg, rgba(17, 24, 36, 0.8), rgba(8, 12, 18, 0.98));
    }
    .faith-boss-sprite svg {
      width: 100%;
      height: auto;
      display: block;
      image-rendering: pixelated;
    }
    .faith-boss-duel {
      position: relative;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr);
      align-items: end;
      gap: 0.4rem;
      padding: 0.4rem 0.2rem 0;
    }
    .faith-boss-duel-foe,
    .faith-boss-duel-hero {
      align-self: end;
      transition: transform 180ms ease, filter 180ms ease;
    }
    .faith-boss-duel-foe svg,
    .faith-boss-duel-hero svg {
      width: 100%;
      height: auto;
      display: block;
      image-rendering: pixelated;
    }
    .faith-boss-sheet-shell {
      width: min(100%, 330px);
      aspect-ratio: 1 / 1;
      display: grid;
      align-items: end;
      justify-items: center;
      transform-origin: center bottom;
      filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.34));
    }
    .faith-boss-sheet-art {
      width: calc(var(--sheet-frame-width, 320px) * var(--sheet-anchor-scale, 1));
      height: calc(var(--sheet-frame-height, 320px) * var(--sheet-anchor-scale, 1));
      background-repeat: no-repeat;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      background-position: center bottom;
      background-size: cover;
      transform-origin: center bottom;
    }
    .faith-boss-sheet-shell.is-telegraph {
      animation: faithBossThreat 0.36s ease-in-out infinite;
      filter: drop-shadow(0 0 18px rgba(240, 207, 147, 0.26)) drop-shadow(0 18px 30px rgba(0, 0, 0, 0.34));
    }
    .faith-boss-sheet-shell.is-strike {
      transform: translateY(-8px) scale(1.04);
      filter: drop-shadow(0 0 20px rgba(218, 78, 78, 0.28)) drop-shadow(0 22px 32px rgba(0, 0, 0, 0.36));
    }
    .faith-boss-duel-foe {
      transform: translateY(6px);
    }
    .faith-boss-duel-hero {
      transform: translateY(10px);
      filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.24));
    }
    .faith-boss-duel.is-telegraph .faith-boss-duel-foe {
      animation: faithBossThreat 0.42s ease-in-out infinite;
      filter: drop-shadow(0 0 18px rgba(240, 207, 147, 0.22));
    }
    .faith-boss-duel.is-strike.dir-up .faith-boss-duel-foe {
      transform: translateY(-18px) scale(1.03);
      filter: drop-shadow(0 0 22px rgba(218, 78, 78, 0.26));
    }
    .faith-boss-duel.is-strike.dir-left .faith-boss-duel-foe {
      transform: translate(-18px, 2px) scale(1.03);
      filter: drop-shadow(0 0 22px rgba(218, 78, 78, 0.26));
    }
    .faith-boss-duel.is-strike.dir-right .faith-boss-duel-foe {
      transform: translate(18px, 2px) scale(1.03);
      filter: drop-shadow(0 0 22px rgba(218, 78, 78, 0.26));
    }
    .faith-boss-duel.is-strike.dir-down .faith-boss-duel-foe {
      transform: translateY(18px) scale(1.03);
      filter: drop-shadow(0 0 22px rgba(218, 78, 78, 0.26));
    }
    .faith-boss-duel.is-strike .faith-boss-duel-hero {
      filter: drop-shadow(0 16px 26px rgba(0, 0, 0, 0.26)) brightness(0.96);
    }
    .faith-boss-weapon-chip {
      margin-top: 0.55rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.42rem;
      width: 100%;
      min-height: 2.2rem;
      padding: 0.45rem 0.7rem;
      border-radius: 999px;
      border: 1px solid rgba(240, 207, 147, 0.18);
      background: rgba(8, 12, 18, 0.58);
      color: #f5ead0;
      font-size: 0.92rem;
      font-weight: 800;
      text-align: center;
    }
    .faith-boss-weakness-copy {
      margin: 0;
      color: rgba(240, 228, 205, 0.86);
      font-size: 0.94rem;
      line-height: 1.45;
    }
    .faith-boss-attack-pad {
      display: grid;
      grid-template-columns: repeat(3, minmax(58px, 74px));
      grid-template-areas:
        ". up ."
        "left center right"
        ". down .";
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.15rem;
    }
    .faith-boss-attack-btn {
      min-height: 58px;
      border-radius: 16px;
      border: 1px solid rgba(240, 207, 147, 0.18);
      background:
        radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 52%),
        linear-gradient(180deg, rgba(24, 34, 48, 0.96), rgba(12, 18, 27, 0.98));
      font-size: 1.5rem;
      font-weight: 900;
      box-shadow: 0 14px 28px rgba(0,0,0,0.18);
      transition: transform 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
    }
    .faith-boss-attack-btn.is-up { grid-area: up; }
    .faith-boss-attack-btn.is-left { grid-area: left; }
    .faith-boss-attack-btn.is-right { grid-area: right; }
    .faith-boss-attack-btn.is-down { grid-area: down; }
    .faith-boss-attack-btn:hover:not(:disabled),
    .faith-boss-attack-btn:focus-visible {
      transform: translateY(-2px);
      border-color: rgba(240, 207, 147, 0.34);
      box-shadow: 0 16px 32px rgba(0,0,0,0.22), 0 0 0 1px rgba(240, 207, 147, 0.08);
      outline: none;
    }
    .faith-boss-attack-btn.correct {
      border-color: rgba(130, 211, 146, 0.62);
      box-shadow: 0 0 0 2px rgba(130, 211, 146, 0.32), 0 16px 32px rgba(70, 170, 88, 0.18);
    }
    .faith-boss-attack-btn.wrong {
      border-color: rgba(226, 122, 122, 0.62);
      box-shadow: 0 0 0 2px rgba(226, 122, 122, 0.32), 0 16px 32px rgba(160, 60, 60, 0.18);
    }
    .faith-boss-arena.is-hit .faith-boss-content,
    .faith-boss-arena.is-hurt .faith-boss-content {
      animation: faithBossShake 0.42s ease;
    }
    .faith-boss-arena.is-hit .faith-boss-backdrop {
      transform: scale(1.08);
      filter: saturate(1.18) contrast(1.06) brightness(0.56);
    }
    .faith-boss-arena.is-hurt .faith-boss-backdrop {
      transform: scale(1.05);
      filter: saturate(0.95) contrast(1.08) brightness(0.42);
    }
    .faith-boss-arena.is-hurt .faith-boss-veil {
      background:
        radial-gradient(circle at 20% 18%, rgba(255, 196, 196, 0.08), transparent 34%),
        radial-gradient(circle at 80% 10%, rgba(206, 79, 79, 0.22), transparent 30%),
        linear-gradient(180deg, rgba(28, 10, 12, 0.22), rgba(28, 10, 12, 0.72) 42%, rgba(18, 8, 9, 0.94));
    }
    @keyframes faithBossFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    @keyframes faithBossPulse {
      0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 0 24px var(--boss-glow), 0 18px 32px rgba(0,0,0,0.34); }
      50% { box-shadow: 0 0 0 1px rgba(255,255,255,0.07), 0 0 34px var(--boss-glow), 0 22px 36px rgba(0,0,0,0.38); }
    }
    @keyframes faithBossShake {
      0% { transform: translateX(0); }
      20% { transform: translateX(-5px); }
      40% { transform: translateX(4px); }
      60% { transform: translateX(-3px); }
      80% { transform: translateX(2px); }
      100% { transform: translateX(0); }
    }
    @keyframes faithBossThreat {
      0% { transform: translateY(6px) scale(1); }
      50% { transform: translateY(0) scale(1.02); }
      100% { transform: translateY(6px) scale(1); }
    }
    @keyframes faithBossIncomingPulse {
      0%, 100% {
        transform: translateY(0);
        filter: brightness(1);
      }
      50% {
        transform: translateY(-2px);
        filter: brightness(1.08);
      }
    }
    @media (max-width: 700px) {
      .faith-boss-content {
        padding: 0.9rem;
      }
      .faith-boss-option {
        min-height: 92px;
      }
      .faith-boss-stage {
        grid-template-columns: repeat(2, minmax(120px, 1fr));
        grid-template-areas:
          "up up"
          "center center"
          "left right"
          "down down";
      }
      .faith-boss-sprite-frame {
        width: min(100%, 350px);
      }
    }
  `;
  document.head.appendChild(style);
  bossBattleStylesReady = true;
}

function bossVisualProfile(era, mode) {
  const guardNames = {
    genesis: challengeCopy("Shield of Promise", "Escudo de promesa"),
    patriarchs: challengeCopy("Shield of Mercy", "Escudo de misericordia"),
    exodus: challengeCopy("Passover Shield", "Escudo de Pascua"),
    sinai: challengeCopy("Covenant Shield", "Escudo del pacto"),
    wilderness: challengeCopy("Banner Shield", "Escudo del estandarte"),
    conquest: challengeCopy("March Shield", "Escudo de la marcha"),
    judges: challengeCopy("Deliverer Shield", "Escudo del libertador"),
    samuel: challengeCopy("Ebenezer Shield", "Escudo de Eben-ezer"),
    saul: challengeCopy("Obedience Shield", "Escudo de obediencia"),
    david: challengeCopy("Shepherd Shield", "Escudo del pastor"),
    generic: challengeCopy("Shield of Faith", "Escudo de fe")
  };
  const profiles = {
    genesis: {
      displayName: "Nahash, Serpent of Eden",
      kind: "serpent-lord",
      title: challengeCopy("Garden Tempter", "Tentador del huerto"),
      weaponName: challengeCopy("Promise Blade", "Espada de promesa"),
      weaponIcon: "🗡️",
      bossWeapon: "fang",
      spriteSheet: {
        src: "assets/bosses/serpent-of-eden-sheet.png",
        frameWidth: 320,
        frameHeight: 320,
        anchorScale: 1.26,
        idle: { row: 0, frames: 4, speed: 140 },
        telegraph: { row: 1, frames: 4, speed: 90 },
        strike: { row: 2, frames: 5, speed: 72 },
        hurt: { row: 3, frames: 3, speed: 110 },
        defeat: { row: 4, frames: 6, speed: 132 }
      },
      skin: "#d2a180",
      hair: "#30412b",
      beard: "#30412b",
      robe: "#4a6d48",
      robeDark: "#314730",
      armor: "#89bf62",
      trim: "#d9b15c",
      cape: "#243224"
    },
    patriarchs: {
      displayName: "Joseph's Brothers",
      kind: "captain",
      title: challengeCopy("Betrayal Captain", "Capitan de traicion"),
      weaponName: challengeCopy("Mercy Spear", "Lanza de misericordia"),
      weaponIcon: "🛡️",
      bossWeapon: "club",
      skin: "#d8ae84",
      hair: "#2f2118",
      beard: "#2f2118",
      robe: "#8b6a4e",
      robeDark: "#664b37",
      armor: "#705648",
      trim: "#d7c27d",
      cape: "#4a3729"
    },
    exodus: {
      displayName: "Pharaoh of Egypt",
      kind: "king",
      title: challengeCopy("Hard-Hearted King", "Rey de corazon duro"),
      weaponName: challengeCopy("Sea Staff", "Baston del mar"),
      weaponIcon: "🪄",
      bossWeapon: "staff",
      skin: "#d0a57f",
      hair: "#19160f",
      beard: "#19160f",
      robe: "#2d5c83",
      robeDark: "#1e3f5c",
      armor: "#c9a24a",
      trim: "#f0d17e",
      cape: "#3e2330"
    },
    sinai: {
      displayName: "Idol Priest of Sinai",
      kind: "priest",
      title: challengeCopy("Keeper of False Worship", "Guardian de adoracion falsa"),
      weaponName: challengeCopy("Covenant Hammer", "Martillo del pacto"),
      weaponIcon: "🔨",
      bossWeapon: "scepter",
      skin: "#d5a581",
      hair: "#5a4d37",
      beard: "#5a4d37",
      robe: "#8f6a3f",
      robeDark: "#6c4f2f",
      armor: "#d7b25f",
      trim: "#f0cf93",
      cape: "#3f3225"
    },
    wilderness: {
      displayName: "Amalekite Raider",
      kind: "raider",
      title: challengeCopy("Desert Ambusher", "Emboscador del desierto"),
      weaponName: challengeCopy("Banner Spear", "Lanza del estandarte"),
      weaponIcon: "🏹",
      bossWeapon: "spear",
      skin: "#cf9d73",
      hair: "#2d1c12",
      beard: "#2d1c12",
      robe: "#7b5739",
      robeDark: "#5a402a",
      armor: "#ae7e4e",
      trim: "#d7bb79",
      cape: "#483222"
    },
    conquest: {
      displayName: "King of Jericho",
      kind: "king",
      title: challengeCopy("Wall-Crowned King", "Rey coronado del muro"),
      weaponName: challengeCopy("Trumpet Charge", "Carga de trompeta"),
      weaponIcon: "📯",
      bossWeapon: "spear",
      skin: "#d1a57d",
      hair: "#241a14",
      beard: "#241a14",
      robe: "#8a6238",
      robeDark: "#664828",
      armor: "#b48a4b",
      trim: "#e0bf77",
      cape: "#4a3423"
    },
    judges: {
      displayName: "Philistine Lord",
      kind: "warlord",
      title: challengeCopy("Oppressor of Israel", "Opresor de Israel"),
      weaponName: challengeCopy("Deliverer Blade", "Espada del libertador"),
      weaponIcon: "⚔️",
      bossWeapon: "sword",
      skin: "#cd9b72",
      hair: "#17130e",
      beard: "#17130e",
      robe: "#6e5d86",
      robeDark: "#524566",
      armor: "#8f6c54",
      trim: "#e1be74",
      cape: "#35283d"
    },
    samuel: {
      displayName: "Philistine Captain",
      kind: "captain",
      title: challengeCopy("Enemy at Ebenezer", "Enemigo en Eben-ezer"),
      weaponName: challengeCopy("Thunder Horn", "Cuerno del trueno"),
      weaponIcon: "📯",
      bossWeapon: "spear",
      skin: "#d3a47d",
      hair: "#2b1f18",
      beard: "#2b1f18",
      robe: "#526b8f",
      robeDark: "#3c4f69",
      armor: "#8da3c3",
      trim: "#d6c38c",
      cape: "#2f3449"
    },
    saul: {
      displayName: "Agag of Amalek",
      kind: "king",
      title: challengeCopy("Pride of Amalek", "Orgullo de Amalec"),
      weaponName: challengeCopy("Obedience Spear", "Lanza de obediencia"),
      weaponIcon: "🗡️",
      bossWeapon: "scepter",
      skin: "#cf9b76",
      hair: "#271a14",
      beard: "#271a14",
      robe: "#8b4043",
      robeDark: "#672d31",
      armor: "#bc6b62",
      trim: "#e6c08d",
      cape: "#422126"
    },
    david: {
      displayName: "Goliath of Gath",
      kind: "giant",
      title: challengeCopy("Champion of Gath", "Campeon de Gat"),
      weaponName: challengeCopy("Sling of Faith", "Honda de fe"),
      weaponIcon: "🎯",
      bossWeapon: "spear",
      skin: "#c99672",
      hair: "#1c1613",
      beard: "#1c1613",
      robe: "#6f4b33",
      robeDark: "#523624",
      armor: "#9c7b55",
      trim: "#f0d17e",
      cape: "#3b2a22",
      stature: 1.18
    },
    generic: {
      displayName: mode && mode.enemyName ? mode.enemyName : challengeCopy("Bible Boss", "Jefe biblico"),
      kind: "warlord",
      title: challengeCopy("Faithful Final Battle", "Batalla final de fe"),
      weaponName: challengeCopy("Shieldbreaker Blade", "Espada rompepoder"),
      weaponIcon: "🗡️",
      bossWeapon: "sword",
      skin: "#d2a37d",
      hair: "#231913",
      beard: "#231913",
      robe: "#5f4f66",
      robeDark: "#473b4d",
      armor: "#7f6d86",
      trim: "#d9b15c",
      cape: "#2f2635"
    }
  };

  const profile = profiles[era] || profiles.generic;
  return {
    displayName: profile.displayName || (mode && mode.enemyName) || challengeCopy("Bible Boss", "Jefe biblico"),
    title: profile.title || challengeCopy("Faithful Final Battle", "Batalla final de fe"),
    weaponName: profile.weaponName || challengeCopy("Faith Blade", "Espada de fe"),
    weaponIcon: profile.weaponIcon || "🗡️",
    guardName: profile.guardName || guardNames[era] || guardNames.generic,
    bossWeapon: profile.bossWeapon || "sword",
    skin: profile.skin || "#d2a37d",
    hair: profile.hair || "#231913",
    beard: profile.beard || "#231913",
    robe: profile.robe || "#5f4f66",
    robeDark: profile.robeDark || "#473b4d",
    armor: profile.armor || "#7f6d86",
    trim: profile.trim || "#d9b15c",
    cape: profile.cape || "#2f2635",
    kind: profile.kind || "warlord",
    stature: Number.isFinite(profile.stature) ? profile.stature : 1,
    spriteSheet: profile.spriteSheet || null,
    weaknessCopy: profile.weaknessCopy || challengeCopy(
      "Watch the attack lanes around the enemy, find the true opening, and raise the shield in the right direction.",
      "Observa los carriles de ataque alrededor del enemigo, encuentra la apertura verdadera y levanta el escudo en la direccion correcta."
    )
  };
}

function ensureBossSpriteSheetRecord(config, onResolved) {
  if (!config || !config.src || typeof Image === "undefined") return null;
  let record = bossSpriteSheetCache.get(config.src);
  if (!record) {
    const image = new Image();
    record = {
      src: config.src,
      status: "loading",
      width: 0,
      height: 0,
      image,
      listeners: new Set()
    };
    image.onload = () => {
      record.status = "ready";
      record.width = image.naturalWidth || 0;
      record.height = image.naturalHeight || 0;
      [...record.listeners].forEach((listener) => listener(record));
      record.listeners.clear();
    };
    image.onerror = () => {
      record.status = "error";
      [...record.listeners].forEach((listener) => listener(record));
      record.listeners.clear();
    };
    image.src = config.src;
    bossSpriteSheetCache.set(config.src, record);
  }
  if (typeof onResolved === "function") {
    if (record.status === "loading") {
      record.listeners.add(onResolved);
    } else {
      onResolved(record);
    }
  }
  return record;
}

function bossSpriteAnimationDefinition(profile, attackPhase, bossRatio, playerRatio) {
  const sheet = profile && profile.spriteSheet;
  if (!sheet) return null;
  if (bossRatio <= 0) return sheet.defeat || sheet.hurt || sheet.idle || null;
  if (attackPhase === "strike") return sheet.strike || sheet.telegraph || sheet.idle || null;
  if (attackPhase === "telegraph") return sheet.telegraph || sheet.idle || null;
  if (bossRatio <= 0.5 || playerRatio <= 0.34) return sheet.hurt || sheet.idle || null;
  return sheet.idle || null;
}

function bossSpriteSheetMarkup(profile, bossRatio, playerRatio, attackPhase, animationTick) {
  const sheet = profile && profile.spriteSheet;
  if (!sheet) return "";
  const record = ensureBossSpriteSheetRecord(sheet);
  if (!record || record.status !== "ready") return "";
  const animation = bossSpriteAnimationDefinition(profile, attackPhase, bossRatio, playerRatio) || {};
  const frameCount = Math.max(1, Number(animation.frames) || 1);
  const row = Math.max(0, Number(animation.row) || 0);
  const safeTick = Math.max(0, Number(animationTick) || 0);
  const frameIndex = safeTick % frameCount;
  const frameWidth = Math.max(1, Number(sheet.frameWidth) || 320);
  const frameHeight = Math.max(1, Number(sheet.frameHeight) || 320);
  const anchorScale = Math.max(0.6, Number(sheet.anchorScale) || 1);
  const sheetWidth = Math.max(frameWidth * frameCount, Number(record.width) || frameWidth * frameCount);
  const sheetHeight = Math.max(frameHeight * (row + 1), Number(record.height) || frameHeight * (row + 1));
  const offsetX = -(frameIndex * frameWidth);
  const offsetY = -(row * frameHeight);
  const stanceClass = attackPhase === "strike" ? "is-strike" : attackPhase === "telegraph" ? "is-telegraph" : "is-idle";
  return `
    <div class="faith-boss-sheet-shell ${stanceClass}" style="--sheet-anchor-scale:${anchorScale};">
      <div
        class="faith-boss-sheet-art"
        role="img"
        aria-label="${profile.displayName}"
        style="
          background-image:url('${sheet.src}');
          background-size:${sheetWidth}px ${sheetHeight}px;
          background-position:${offsetX}px ${offsetY}px;
          --sheet-frame-width:${frameWidth}px;
          --sheet-frame-height:${frameHeight}px;
        "
      ></div>
    </div>
  `;
}

function retroBossSpriteMarkup(profile, bossRatio = 1, playerRatio = 1) {
  const bossState = bossRatio <= 0.25 ? "faltering" : bossRatio <= 0.5 ? "wounded" : playerRatio <= 0.34 ? "taunting" : "fierce";
  const scale = profile && Number.isFinite(profile.stature) ? profile.stature : 1;
  const auraOpacity = bossState === "faltering" ? 0.28 : bossState === "wounded" ? 0.34 : 0.46;
  const headTilt = bossState === "faltering" ? -4 : bossState === "taunting" ? 3 : 0;
  const bodyTilt = bossState === "faltering" ? -3 : bossState === "taunting" ? 2 : 0;
  const eyeY = bossState === "taunting" ? 74 : 76;
  const browLift = bossState === "faltering" ? 2 : bossState === "taunting" ? -2 : -1;
  const mouthMarkup = bossState === "faltering"
    ? `<rect x="96" y="95" width="10" height="3" fill="#2c1c15" />`
    : bossState === "taunting"
      ? `<path d="M92 95 Q101 102 112 95" fill="none" stroke="#2c1c15" stroke-width="3" stroke-linecap="square" />`
      : `<path d="M92 98 Q101 92 112 98" fill="none" stroke="#2c1c15" stroke-width="3" stroke-linecap="square" />`;
  const browLeft = `<rect x="86" y="${69 + browLift}" width="12" height="3" fill="#1b1410" transform="rotate(-12 92 ${70 + browLift})" />`;
  const browRight = `<rect x="104" y="${69 + browLift}" width="12" height="3" fill="#1b1410" transform="rotate(12 110 ${70 + browLift})" />`;

  let headAccent = "";
  if (profile.kind === "king") {
    headAccent = `<path d="M76 48 L84 34 L96 48 L108 34 L120 48 L128 34 L136 48 L136 58 L76 58 Z" fill="${profile.trim}" stroke="#312417" stroke-width="2" />`;
  } else if (profile.kind === "giant") {
    headAccent = `<path d="M74 51 L88 40 L114 40 L128 51 L122 60 L80 60 Z" fill="${profile.armor}" stroke="#201913" stroke-width="2" />`;
  } else if (profile.kind === "serpent-lord") {
    headAccent = `
      <path d="M70 54 Q100 16 130 54 L120 66 Q100 44 80 66 Z" fill="${profile.armor}" stroke="#22311f" stroke-width="2" />
      <circle cx="80" cy="54" r="5" fill="#f0d17e" />
      <circle cx="120" cy="54" r="5" fill="#f0d17e" />
    `;
  } else if (profile.kind === "priest") {
    headAccent = `<rect x="82" y="45" width="36" height="10" rx="2" fill="${profile.trim}" stroke="#2a2018" stroke-width="2" />`;
  }

  let bossWeaponMarkup = "";
  switch (profile.bossWeapon) {
    case "staff":
      bossWeaponMarkup = `
        <rect x="150" y="96" width="7" height="120" fill="#8d6b45" />
        <path d="M150 96 Q151 78 166 78 Q176 78 176 87 Q176 98 160 99" fill="none" stroke="#8d6b45" stroke-width="7" stroke-linecap="square" />
      `;
      break;
    case "scepter":
      bossWeaponMarkup = `
        <rect x="150" y="92" width="7" height="122" fill="#8d6b45" />
        <circle cx="153.5" cy="84" r="10" fill="${profile.trim}" stroke="#2a2018" stroke-width="2" />
      `;
      break;
    case "club":
      bossWeaponMarkup = `
        <rect x="151" y="112" width="7" height="96" fill="#7d5a38" />
        <rect x="144" y="94" width="20" height="28" rx="4" fill="#9d7446" stroke="#261a10" stroke-width="2" />
      `;
      break;
    case "fang":
      bossWeaponMarkup = `
        <path d="M150 114 L174 84 L182 90 L160 126 Z" fill="${profile.trim}" stroke="#1f1712" stroke-width="2" />
      `;
      break;
    case "sword":
      bossWeaponMarkup = `
        <rect x="150" y="108" width="7" height="78" fill="#80603e" />
        <rect x="143" y="106" width="21" height="6" fill="${profile.trim}" stroke="#231812" stroke-width="2" />
        <path d="M151 46 L160 106 L147 106 Z" fill="#d8dde7" stroke="#2b2f39" stroke-width="2" />
      `;
      break;
    default:
      bossWeaponMarkup = `
        <rect x="150" y="92" width="7" height="122" fill="#8d6b45" />
        <polygon points="153,52 165,86 141,86" fill="#d8dde7" stroke="#272a33" stroke-width="2" />
      `;
      break;
  }

  return `
    <svg viewBox="0 0 220 260" role="img" aria-label="${profile.displayName}" shape-rendering="crispEdges">
      <ellipse cx="110" cy="238" rx="68" ry="16" fill="rgba(0,0,0,0.42)" />
      <ellipse cx="110" cy="128" rx="74" ry="74" fill="rgba(255,255,255,0.04)" />
      <g opacity="${auraOpacity}">
        <circle cx="110" cy="124" r="82" fill="${profile.trim}" opacity="0.18" />
        <circle cx="110" cy="124" r="56" fill="${profile.armor}" opacity="0.16" />
      </g>
      <g transform="translate(110 140) scale(${scale}) rotate(${bodyTilt}) translate(-110 -140)">
        <path d="M76 111 Q110 78 144 111 L148 190 L72 190 Z" fill="${profile.cape}" opacity="0.74" />
        <rect x="82" y="170" width="18" height="48" fill="${profile.robeDark}" />
        <rect x="120" y="170" width="18" height="48" fill="${profile.robeDark}" />
        <rect x="78" y="216" width="24" height="10" fill="#6c5339" />
        <rect x="118" y="216" width="24" height="10" fill="#6c5339" />
        <path d="M74 116 L146 116 L156 198 L64 198 Z" fill="${profile.robe}" stroke="${profile.robeDark}" stroke-width="3" />
        <path d="M86 116 L110 150 L134 116" fill="none" stroke="${profile.trim}" stroke-width="6" />
        <rect x="88" y="104" width="44" height="20" fill="${profile.armor}" stroke="${profile.robeDark}" stroke-width="3" />
        <rect x="74" y="118" width="16" height="64" rx="6" fill="${profile.skin}" transform="rotate(14 82 150)" />
        <rect x="130" y="118" width="16" height="64" rx="6" fill="${profile.skin}" transform="rotate(-18 138 150)" />
        <circle cx="80" cy="181" r="8" fill="${profile.skin}" />
        <circle cx="140" cy="181" r="8" fill="${profile.skin}" />
        ${bossWeaponMarkup}
        <g transform="rotate(${headTilt} 110 78)">
          <rect x="88" y="52" width="44" height="16" rx="6" fill="${profile.hair}" />
          <circle cx="110" cy="78" r="28" fill="${profile.skin}" stroke="#2d2119" stroke-width="3" />
          <path d="M86 84 Q110 116 134 84 L126 106 Q110 118 94 106 Z" fill="${profile.beard}" opacity="0.92" />
          <path d="M82 58 Q110 34 138 58 L136 74 Q110 60 84 74 Z" fill="${profile.hair}" />
          ${headAccent}
          <rect x="88" y="${eyeY}" width="8" height="4" fill="#f6f0e6" />
          <rect x="114" y="${eyeY}" width="8" height="4" fill="#f6f0e6" />
          <rect x="90" y="${eyeY + 1}" width="4" height="4" fill="#1e1812" />
          <rect x="116" y="${eyeY + 1}" width="4" height="4" fill="#1e1812" />
          ${browLeft}
          ${browRight}
          <rect x="104" y="84" width="4" height="8" fill="#b9805f" />
          ${mouthMarkup}
        </g>
      </g>
    </svg>
  `;
}

function retroShieldHeroMarkup(profile, palette, playerRatio = 1, activeDirection = "") {
  const heroState = playerRatio <= 0.34 ? "strained" : activeDirection ? "guarding" : "ready";
  const shieldShift = {
    up: { x: -2, y: -10, rotate: -8 },
    left: { x: -12, y: -2, rotate: -18 },
    right: { x: 8, y: -2, rotate: 8 },
    down: { x: -2, y: 8, rotate: 10 },
    "": { x: 0, y: 0, rotate: 0 }
  }[activeDirection || ""] || { x: 0, y: 0, rotate: 0 };
  const mouth = heroState === "strained"
    ? `<rect x="64" y="66" width="8" height="3" fill="#2c1c15" />`
    : `<path d="M62 66 Q68 70 74 66" fill="none" stroke="#2c1c15" stroke-width="3" stroke-linecap="square" />`;

  return `
    <svg viewBox="0 0 150 220" role="img" aria-label="${challengeCopy("Faith warrior", "Guerrero de fe")}" shape-rendering="crispEdges">
      <ellipse cx="72" cy="202" rx="44" ry="12" fill="rgba(0,0,0,0.38)" />
      <g transform="translate(0 4)">
        <path d="M42 98 Q74 72 106 98 L110 162 L38 162 Z" fill="#214260" opacity="0.32" />
        <rect x="50" y="136" width="14" height="42" fill="#73563b" />
        <rect x="82" y="136" width="14" height="42" fill="#73563b" />
        <rect x="48" y="176" width="18" height="9" fill="#5e4a33" />
        <rect x="80" y="176" width="18" height="9" fill="#5e4a33" />
        <path d="M42 94 L106 94 L112 164 L36 164 Z" fill="#eadcb8" stroke="#987948" stroke-width="3" />
        <path d="M58 94 L74 118 L90 94" fill="none" stroke="${palette.player}" stroke-width="6" />
        <rect x="54" y="84" width="36" height="16" fill="${palette.player}" stroke="#416e83" stroke-width="3" />
        <rect x="32" y="98" width="14" height="54" rx="6" fill="#d7ad83" transform="rotate(14 39 126)" />
        <rect x="94" y="98" width="14" height="54" rx="6" fill="#d7ad83" transform="rotate(-18 101 126)" />
        <circle cx="40" cy="150" r="7" fill="#d7ad83" />
        <circle cx="100" cy="150" r="7" fill="#d7ad83" />
        <g transform="translate(${shieldShift.x} ${shieldShift.y}) rotate(${shieldShift.rotate} 32 112)">
          <path d="M20 90 L44 84 L62 96 L60 130 L40 150 L18 134 L16 102 Z" fill="${palette.player}" stroke="#244050" stroke-width="3" />
          <path d="M26 100 L42 96 L53 104 L51 125 L39 138 L24 127 L22 106 Z" fill="rgba(255,255,255,0.16)" />
          <rect x="31" y="107" width="9" height="26" fill="#f6ead2" opacity="0.72" />
        </g>
        <g>
          <rect x="105" y="100" width="6" height="58" fill="#7f6141" />
          <path d="M108 74 L116 100 L100 100 Z" fill="#d8dde7" stroke="#2b2f39" stroke-width="2" />
        </g>
        <rect x="54" y="38" width="28" height="12" rx="5" fill="#3a2a1c" />
        <circle cx="68" cy="58" r="22" fill="#d7ad83" stroke="#2d2119" stroke-width="3" />
        <path d="M48 48 Q68 32 88 48 L84 64 Q68 54 52 64 Z" fill="#3a2a1c" />
        <rect x="56" y="56" width="7" height="4" fill="#f6f0e6" />
        <rect x="73" y="56" width="7" height="4" fill="#f6f0e6" />
        <rect x="58" y="57" width="3" height="3" fill="#1e1812" />
        <rect x="75" y="57" width="3" height="3" fill="#1e1812" />
        <rect x="54" y="50" width="10" height="3" fill="#1b1410" transform="rotate(-10 59 51)" />
        <rect x="72" y="50" width="10" height="3" fill="#1b1410" transform="rotate(10 77 51)" />
        <rect x="66" y="60" width="4" height="7" fill="#bf8461" />
        ${mouth}
      </g>
    </svg>
  `;
}

function retroBossBattleSceneMarkup(
  profile,
  palette,
  bossRatio = 1,
  playerRatio = 1,
  activeDirection = "",
  incomingDirection = "",
  attackPhase = "idle",
  animationTick = 0
) {
  const duelClasses = ["faith-boss-duel"];
  if (attackPhase === "telegraph") duelClasses.push("is-telegraph");
  if (attackPhase === "strike") duelClasses.push("is-strike");
  if (incomingDirection) duelClasses.push(`dir-${incomingDirection}`);
  const bossMarkup = bossSpriteSheetMarkup(profile, bossRatio, playerRatio, attackPhase, animationTick)
    || retroBossSpriteMarkup(profile, bossRatio, playerRatio);
  return `
    <div class="${duelClasses.join(" ")}">
      <div class="faith-boss-duel-foe">${bossMarkup}</div>
      <div class="faith-boss-duel-hero">${retroShieldHeroMarkup(profile, palette, playerRatio, activeDirection)}</div>
    </div>
  `;
}

function renderBoss(meta, mode, feedback) {
  ensureBossBattleStyles();
  const era = meta && meta.theme ? meta.theme.era : "generic";
  const palette = bossBattlePalette(era);
  const profile = bossVisualProfile(era, mode);
  const enemyDisplayName = profile.displayName || mode.enemyName || challengeCopy("Bible Boss", "Jefe biblico");
  const bossMode = {
    ...mode,
    enemyName: enemyDisplayName
  };
  const bossBadgeIcon = {
    "serpent-lord": "🐍",
    captain: "🛡️",
    king: "👑",
    priest: "🔥",
    raider: "⚔️",
    warlord: "⚔️",
    giant: "🗿"
  }[profile.kind] || mode.enemyIcon || "⚔️";
  const bossFrames = cutsceneStillSequenceGroups(era)
    .map((group) => (Array.isArray(group) ? group.find(Boolean) : ""))
    .filter(Boolean);
  const fallbackPoster = cutscenePosterSource(era);

  const hint = createChallengeHint(mode.keyboardHint || challengeCopy(
    "Keyboard: use arrow keys or WASD to raise the shield in the right direction.",
    "Teclado: usa las flechas o WASD para levantar el escudo en la direccion correcta."
  ));
  const status = createSkillStatus("");
  activityPanel.append(hint, status);

  const arena = document.createElement("div");
  arena.className = "activity-panel faith-boss-arena";
  arena.style.marginTop = "0.85rem";
  arena.style.setProperty("--boss-accent", palette.accent);
  arena.style.setProperty("--boss-accent-soft", palette.accentSoft);
  arena.style.setProperty("--boss-glow", palette.glow);
  arena.style.setProperty("--boss-player", palette.player);
  arena.style.setProperty("--boss-player-glow", palette.playerGlow);

  const backdrop = document.createElement("div");
  backdrop.className = "faith-boss-backdrop";

  const veil = document.createElement("div");
  veil.className = "faith-boss-veil";

  const atmosphere = document.createElement("div");
  atmosphere.className = "faith-boss-atmosphere";
  for (let index = 0; index < 3; index += 1) {
    atmosphere.appendChild(document.createElement("span"));
  }

  const content = document.createElement("div");
  content.className = "faith-boss-content";

  const bossHead = document.createElement("div");
  bossHead.className = "faith-boss-head";

  const bossIdentity = document.createElement("div");
  bossIdentity.className = "faith-boss-identity";

  const bossIcon = document.createElement("div");
  bossIcon.className = "faith-boss-icon";
  bossIcon.textContent = bossBadgeIcon;

  const bossTextWrap = document.createElement("div");
  bossTextWrap.className = "faith-boss-copy";

  const bossTitle = document.createElement("h3");
  bossTitle.className = "faith-boss-title";
  bossTitle.textContent = enemyDisplayName;

  const bossStory = document.createElement("p");
  bossStory.className = "meta faith-boss-story";
  bossStory.textContent = profile.title || mode.storyPrompt || challengeCopy(
    "Choose the faithful response to defeat the enemy.",
    "Elige la respuesta fiel para derrotar al enemigo."
  );

  const battleLine = document.createElement("p");
  battleLine.className = "faith-boss-statusline";

  bossTextWrap.append(bossTitle, bossStory, battleLine);
  bossIdentity.append(bossIcon, bossTextWrap);

  const difficultyChip = document.createElement("div");
  difficultyChip.className = "faith-boss-meta-chip";
  difficultyChip.textContent = `${challengeCopy("Boss", "Jefe")} • ${currentDifficulty().label}`;

  const phaseChip = document.createElement("div");
  phaseChip.className = "faith-boss-meta-chip";

  const headMeta = document.createElement("div");
  headMeta.className = "faith-boss-meta";
  headMeta.append(difficultyChip, phaseChip);

  bossHead.append(bossIdentity, headMeta);

  const barWrap = document.createElement("div");
  barWrap.className = "faith-boss-bars";

  const makeHealthRow = (labelText, accent) => {
    const row = document.createElement("div");
    row.className = "faith-boss-health-row";

    const top = document.createElement("div");
    top.className = "faith-boss-health-top";

    const label = document.createElement("strong");
    label.textContent = labelText;

    const value = document.createElement("span");
    value.className = "faith-boss-health-value";

    top.append(label, value);

    const shell = document.createElement("div");
    shell.className = "faith-boss-shell";

    const fill = document.createElement("div");
    fill.className = "faith-boss-fill";
    fill.style.background = accent;

    shell.append(fill);
    row.append(top, shell);
    return { row, value, fill };
  };

  const bossHealth = makeHealthRow(
    challengeCopy("Boss Stamina", "Resistencia del jefe"),
    "linear-gradient(90deg, rgba(195,76,76,0.95), rgba(132,28,28,0.98))"
  );
  const playerHealth = makeHealthRow(
    challengeCopy("Shield Guard", "Guardia del escudo"),
    "linear-gradient(90deg, rgba(117,189,214,0.96), rgba(53,123,162,0.98))"
  );
  barWrap.append(bossHealth.row, playerHealth.row);

  const roundCard = document.createElement("div");
  roundCard.className = "faith-boss-round";

  const roundLabel = document.createElement("p");
  roundLabel.className = "meta faith-boss-roundlabel";

  const roundPrompt = document.createElement("p");
  roundPrompt.className = "faith-boss-prompt";

  const bossStage = document.createElement("div");
  bossStage.className = "faith-boss-stage";

  const spriteFrame = document.createElement("div");
  spriteFrame.className = "faith-boss-sprite-frame";

  const spriteWrap = document.createElement("div");
  spriteWrap.className = "faith-boss-sprite";

  const weaponChip = document.createElement("div");
  weaponChip.className = "faith-boss-weapon-chip";

  spriteFrame.append(spriteWrap, weaponChip);

  const weaknessCopy = document.createElement("p");
  weaknessCopy.className = "faith-boss-weakness-copy";
  weaknessCopy.textContent = profile.weaknessCopy;

  const attackPad = document.createElement("div");
  attackPad.className = "faith-boss-attack-pad";

  roundCard.append(roundLabel, roundPrompt, bossStage, weaknessCopy, attackPad);
  content.append(bossHead, barWrap, roundCard);
  arena.append(backdrop, veil, atmosphere, content);
  activityPanel.append(arena);

  const rounds = Array.isArray(mode.rounds) && mode.rounds.length ? mode.rounds : [];
  let bossHp = Math.max(1, Number(mode.bossHealth) || 4);
  let playerHp = Math.max(1, Number(mode.playerHealth) || 4);
  let roundIndex = 0;
  let running = rounds.length > 0;
  let locked = false;
  let defenseDirection = "";
  let incomingDirection = "";
  let attackPhase = "idle";
  let roundAttackToken = 0;
  let animationTick = 0;
  let spriteLoopStarted = false;
  const buttons = [];
  const targetNodes = [];
  const timers = new Set();
  const directionSlots = [
    { key: "up", className: "is-up", icon: "↑", label: challengeCopy("Up", "Arriba") },
    { key: "left", className: "is-left", icon: "←", label: challengeCopy("Left", "Izquierda") },
    { key: "right", className: "is-right", icon: "→", label: challengeCopy("Right", "Derecha") },
    { key: "down", className: "is-down", icon: "↓", label: challengeCopy("Down", "Abajo") }
  ];

  const schedule = (callback, delay) => {
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

  const currentSpriteAnimationSpeed = () => {
    const maxBoss = Math.max(1, Number(mode.bossHealth) || 1);
    const maxPlayer = Math.max(1, Number(mode.playerHealth) || 1);
    const animation = bossSpriteAnimationDefinition(profile, attackPhase, bossHp / maxBoss, playerHp / maxPlayer);
    return Math.max(66, Number(animation && animation.speed) || 120);
  };

  const startSpriteLoop = () => {
    if (spriteLoopStarted || !profile.spriteSheet) return;
    const record = ensureBossSpriteSheetRecord(profile.spriteSheet, (resolved) => {
      if (resolved && resolved.status === "ready") {
        updateBars();
        startSpriteLoop();
      }
    });
    if (!record || record.status !== "ready") return;
    spriteLoopStarted = true;
    const tick = () => {
      if (!running) return;
      animationTick += 1;
      updateBars();
      schedule(tick, currentSpriteAnimationSpeed());
    };
    schedule(tick, currentSpriteAnimationSpeed());
  };

  const refreshBackdrop = () => {
    const safeFrameIndex = bossFrames.length ? (roundIndex % bossFrames.length) : 0;
    const src = bossFrames[safeFrameIndex] || fallbackPoster;
    if (!src) return;
    const view = bossBattleBackdropStyle(era, safeFrameIndex);
    backdrop.style.backgroundImage = `url("${src}")`;
    backdrop.style.backgroundRepeat = "no-repeat";
    backdrop.style.backgroundSize = view.size;
    backdrop.style.backgroundPosition = view.position;
    backdrop.style.backgroundColor = view.backgroundColor;
  };

  const setLocked = (value) => {
    locked = value;
    buttons.forEach((button) => {
      button.disabled = value || !running;
    });
  };

  const clearButtonState = () => {
    buttons.forEach((button) => {
      button.classList.remove("selected", "correct", "wrong");
      button.style.transform = "";
      button.style.boxShadow = "";
    });
    targetNodes.forEach((node) => node.classList.remove("correct", "wrong"));
  };

  const markButtonState = (index, kind) => {
    const button = buttons[index];
    if (!button) return;
    button.classList.add(kind);
    if (kind === "correct") {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 0 0 2px rgba(130,211,146,0.42), 0 16px 30px rgba(70,170,88,0.18)";
    } else if (kind === "wrong") {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 0 0 2px rgba(226,122,122,0.42), 0 16px 30px rgba(160,60,60,0.18)";
    }
  };

  const markTargetState = (index, kind) => {
    const node = targetNodes[index];
    if (!node) return;
    node.classList.add(kind);
  };

  const updateBars = () => {
    const maxBoss = Math.max(1, Number(mode.bossHealth) || 1);
    const maxPlayer = Math.max(1, Number(mode.playerHealth) || 1);
    const bossRatio = bossHp / maxBoss;
    const playerRatio = playerHp / maxPlayer;
    bossHealth.value.textContent = `${bossHp}/${maxBoss}`;
    playerHealth.value.textContent = `${playerHp}/${maxPlayer}`;
    bossHealth.fill.style.width = `${Math.max(0, Math.min(100, (bossHp / maxBoss) * 100))}%`;
    playerHealth.fill.style.width = `${Math.max(0, Math.min(100, (playerHp / maxPlayer) * 100))}%`;
    bossIcon.classList.toggle("is-danger", bossRatio <= 0.5 || playerRatio <= 0.34);
    phaseChip.textContent = bossBattlePhaseLabel(roundIndex, rounds.length, bossRatio, playerRatio);
    battleLine.textContent = bossBattleStatusText(bossMode, bossRatio, playerRatio);
    spriteWrap.innerHTML = retroBossBattleSceneMarkup(
      profile,
      palette,
      bossRatio,
      playerRatio,
      defenseDirection,
      incomingDirection,
      attackPhase,
      animationTick
    );
    weaponChip.innerHTML = `🛡️ <span>${challengeCopy("Raise", "Levanta")}:</span> <span>${profile.guardName}</span>`;
    status.textContent = `${challengeCopy("Boss Stamina", "Resistencia del jefe")}: ${bossHp}/${maxBoss} | ${challengeCopy("Shield Guard", "Guardia del escudo")}: ${playerHp}/${maxPlayer} | ${challengeCopy("Round", "Ronda")} ${Math.min(roundIndex + 1, rounds.length)}/${rounds.length}`;
  };

  const syncIncomingAttack = () => {
    targetNodes.forEach((node, index) => {
      const slot = directionSlots[index];
      const isIncoming = attackPhase !== "idle" && slot && slot.key === incomingDirection;
      node.classList.toggle("incoming", !!isIncoming);
    });
    updateBars();
  };

  const pulseArena = (kind) => {
    arena.classList.remove("is-hit", "is-hurt");
    void arena.offsetWidth;
    arena.classList.add(kind);
    schedule(() => {
      arena.classList.remove(kind);
    }, 430);
  };

  const renderRound = () => {
    const round = rounds[roundIndex % rounds.length];
    if (!round) return;
    refreshBackdrop();
    clearButtonState();
    defenseDirection = "";
    attackPhase = "idle";
    roundLabel.textContent = `${mode.label} • ${challengeCopy("Round", "Ronda")} ${Math.min(roundIndex + 1, rounds.length)}/${rounds.length}`;
    roundPrompt.textContent = round.prompt || challengeCopy(
      "The boss is attacking. Read the clue and raise the shield in the right direction.",
      "El jefe esta atacando. Lee la pista y levanta el escudo en la direccion correcta."
    );
    bossStage.innerHTML = "";
    attackPad.innerHTML = "";
    buttons.length = 0;
    targetNodes.length = 0;

    directionSlots.forEach((slot, index) => {
      const weakpoint = document.createElement("div");
      weakpoint.className = `faith-boss-weakpoint ${slot.className}`;
      weakpoint.innerHTML = `<span class="faith-boss-target-dir">${slot.label}</span><span class="faith-boss-target-label">${round.options[index] ? round.options[index].label : challengeCopy("No clue", "Sin pista")}</span>`;
      targetNodes.push(weakpoint);
      bossStage.appendChild(weakpoint);
    });

    bossStage.appendChild(spriteFrame);

    directionSlots.forEach((slot, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `ghost-btn faith-boss-attack-btn ${slot.className}`;
      button.setAttribute("aria-label", `${challengeCopy("Guard", "Proteger")} ${slot.label}`);
      button.innerHTML = `🛡️${slot.icon}`;
      button.addEventListener("click", () => resolveRound(index));
      buttons.push(button);
      attackPad.appendChild(button);
    });

    incomingDirection = directionSlots[round.correctIndex] ? directionSlots[round.correctIndex].key : "";
    syncIncomingAttack();
    setLocked(false);
    if (buttons[0] && typeof buttons[0].focus === "function") {
      buttons[0].focus({ preventScroll: true });
    }

    const currentToken = ++roundAttackToken;
    schedule(() => {
      if (!running || locked || currentToken !== roundAttackToken) return;
      attackPhase = "telegraph";
      feedback.className = "feedback warn";
      feedback.textContent = challengeCopy(
        `${enemyDisplayName} coils to strike. Block the true lane now.`,
        `${enemyDisplayName} se prepara para golpear. Bloquea el carril verdadero ahora.`
      );
      syncIncomingAttack();
      playSfx("boss-attack");
    }, 320);

    schedule(() => {
      if (!running || locked || currentToken !== roundAttackToken) return;
      attackPhase = "strike";
      feedback.className = "feedback warn";
      feedback.textContent = challengeCopy(
        `${enemyDisplayName} lunges. Raise the shield before the hit lands.`,
        `${enemyDisplayName} se lanza. Levanta el escudo antes de que golpee.`
      );
      syncIncomingAttack();
      playSfx("boss-attack");
    }, 1380);

    schedule(() => {
      if (!running || locked || currentToken !== roundAttackToken) return;
      resolveRound(-1, { timedOut: true });
    }, 2250);
  };

  const finishBossVictory = () => {
    running = false;
    setLocked(true);
    feedback.className = "feedback ok";
    feedback.textContent = challengeCopy(
      `Victory. ${enemyDisplayName} has been defeated.`,
      `Victoria. ${enemyDisplayName} ha sido derrotado.`
    );
    completeStage(meta, mode, { delayMs: 2300, sfx: null });
  };

  const finishBossFailure = () => {
    running = false;
    setLocked(true);
    const hasLives = loseLife();
    feedback.className = "feedback warn";
    feedback.textContent = hasLives ? t("challengeFailedReplay") : t("outOfLivesContinue");
    playSfx("fail");
    queueStageAutoClose(meta.id, 1700);
  };

  function resolveRound(index, options = {}) {
    if (!running || locked || !canPlayStage()) return;
    const round = rounds[roundIndex % rounds.length];
    if (!round) return;
    setLocked(true);
    roundAttackToken += 1;
    clearButtonState();
    defenseDirection = directionSlots[index] ? directionSlots[index].key : "";
    attackPhase = "strike";
    const timedOut = !!options.timedOut;
    const isCorrect = index === round.correctIndex;
    markButtonState(round.correctIndex, "correct");
    markTargetState(round.correctIndex, isCorrect ? "correct" : "wrong");
    if (!isCorrect) {
      if (index >= 0) {
        markButtonState(index, "wrong");
      }
    }

    if (isCorrect) {
      bossHp = Math.max(0, bossHp - 1);
      feedback.className = "feedback ok";
      feedback.textContent = round.successText || challengeCopy(
        "Strong block. The enemy loses stamina.",
        "Bloqueo firme. El enemigo pierde resistencia."
      );
      pulseArena("is-hit");
      playSfx(bossHp <= 0 ? "boss-win" : "boss-hit");
    } else {
      playerHp = Math.max(0, playerHp - 1);
      feedback.className = "feedback warn";
      feedback.textContent = timedOut
        ? challengeCopy(
            `${enemyDisplayName} struck first. Your shield was too late.`,
            `${enemyDisplayName} golpeo primero. Tu escudo llego demasiado tarde.`
          )
        : round.failText || challengeCopy(
            "Guard broken. The enemy lands a hit.",
            "La guardia se rompio. El enemigo logra un golpe."
          );
      pulseArena("is-hurt");
      playSfx(playerHp <= 0 ? "fail" : "boss-hurt");
    }

    syncIncomingAttack();

    if (bossHp <= 0) {
      schedule(finishBossVictory, 780);
      return;
    }

    if (playerHp <= 0) {
      schedule(finishBossFailure, 780);
      return;
    }

    roundIndex += 1;
    schedule(() => {
      if (!running) return;
      renderRound();
      if (feedback.className !== "feedback warn") {
        feedback.className = "feedback";
        feedback.textContent = "";
      }
    }, 820);
  }

  const onKey = (event) => {
    if (state.activeStage !== meta.id || !running || locked) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const key = String(event.key || "").toLowerCase();
    const keyToIndex = {
      arrowup: 0,
      w: 0,
      arrowleft: 1,
      a: 1,
      arrowright: 2,
      d: 2,
      arrowdown: 3,
      s: 3
    };
    if (Object.prototype.hasOwnProperty.call(keyToIndex, key)) {
      const index = keyToIndex[key];
      if (index < buttons.length) {
        event.preventDefault();
        resolveRound(index);
      }
    }
  };

  if (!rounds.length) {
    status.textContent = challengeCopy("Boss data is not ready for this stage yet.", "Los datos del jefe no estan listos para esta etapa.");
    feedback.className = "feedback warn";
    feedback.textContent = challengeCopy("Replay this stage after the next update.", "Vuelve a jugar esta etapa despues de la proxima actualizacion.");
    return () => {};
  }

  window.addEventListener("keydown", onKey);
  refreshBackdrop();
  renderRound();
  feedback.className = "feedback";
  feedback.textContent = challengeCopy(
    `The battle is live. ${enemyDisplayName} is pressing forward. Raise the shield, survive the assault, and drain the boss's stamina.`,
    `La batalla esta en marcha. ${enemyDisplayName} esta avanzando. Levanta el escudo, sobrevive al asalto y agota la resistencia del jefe.`
  );
  duckMusicTemporarily(0.22, 2200);
  playSfx("boss-enter");

  return () => {
    running = false;
    clearTimers();
    window.removeEventListener("keydown", onKey);
  };
}

function renderSpotlight(meta, mode, feedback) {
  const prompt = document.createElement("p");
  prompt.textContent = mode.secondaryPrompt || "Watch the highlighted clue, then pick it after the shuffle.";
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: press 1-4 to pick the clue after the shuffle.");
  const status = createSkillStatus("");
  activityPanel.append(prompt, hint, status);

  const board = document.createElement("div");
  board.style.display = "grid";
  board.style.gridTemplateColumns = "repeat(2, minmax(150px, 1fr))";
  board.style.gap = "0.85rem";
  board.style.marginTop = "0.8rem";
  activityPanel.append(board);

  const cards = Array.isArray(mode.cards) && mode.cards.length ? mode.cards.slice(0, 4) : stageFiveChoiceCardsFromBase(mode, 4, mode.themeName || "");
  const roundsData = Array.isArray(mode.roundsData) && mode.roundsData.length
    ? mode.roundsData
    : cards.map((card, index) => ({ targetId: card.id, targetLabel: card.label, shuffleSeed: index + 1 }));
  const totalRounds = Math.max(1, Number(mode.rounds) || roundsData.length);
  const maxMisses = Math.max(1, Number(mode.maxMisses) || 3);
  const peekMs = Math.max(480, Number(mode.peekMs) || 900);
  const shuffleCount = Math.max(2, Number(mode.shuffles) || 3);
  const cardMap = new Map(cards.map((card) => [card.id, card]));
  const timers = new Set();
  const buttons = [];
  let running = true;
  let locked = true;
  let roundIndex = 0;
  let misses = 0;
  let activeTargetId = "";
  let currentOrder = cards.map((card) => card.id);

  const queue = (callback, delay) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
  };

  const clearTimers = () => {
    timers.forEach((timer) => window.clearTimeout(timer));
    timers.clear();
  };

  const updateStatus = (line = "") => {
    const lead = line ? `${line} ` : "";
    status.textContent = `${lead}${challengeCopy("Round", "Ronda")} ${Math.min(roundIndex + 1, totalRounds)}/${totalRounds} | ${t("missesLabel")}: ${misses}/${maxMisses}`;
  };

  const renderBoard = (order, revealTarget = false) => {
    board.innerHTML = "";
    buttons.length = 0;
    order.forEach((cardId, index) => {
      const card = cardMap.get(cardId) || { icon: "✨", label: "Faith" };
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ghost-btn";
      button.style.minHeight = "108px";
      button.style.display = "grid";
      button.style.placeItems = "center";
      button.style.gap = "0.35rem";
      button.style.fontWeight = "800";
      button.style.textAlign = "center";
      button.style.padding = "0.85rem";
      button.innerHTML = `<span style="font-size:1.55rem">${card.icon}</span><span>${index + 1}. ${card.label}</span>`;
      if (revealTarget && cardId === activeTargetId) {
        button.style.boxShadow = "0 0 0 2px rgba(229,191,93,0.46), 0 18px 36px rgba(229,191,93,0.22)";
        button.style.transform = "translateY(-2px)";
      }
      button.addEventListener("click", () => handlePick(cardId));
      buttons.push(button);
      board.append(button);
    });
  };

  const failStage = () => {
    running = false;
    const hasLives = loseLife();
    feedback.className = "feedback warn";
    feedback.textContent = hasLives ? t("challengeFailedReplay") : t("outOfLivesContinue");
    playSfx("fail");
    queueStageAutoClose(meta.id);
  };

  const beginShuffle = (seed, stepsLeft) => {
    if (!running) return;
    if (stepsLeft <= 0) {
      locked = false;
      currentOrder = rotateKinds(currentOrder, (seed % currentOrder.length) + 1);
      renderBoard(currentOrder, false);
      updateStatus(`Find ${roundsData[roundIndex % roundsData.length].targetLabel}.`);
      return;
    }
    currentOrder = rotateKinds(currentOrder, ((seed + stepsLeft) % (currentOrder.length - 1 || 1)) + 1);
    renderBoard(currentOrder, false);
    queue(() => beginShuffle(seed + 1, stepsLeft - 1), 150);
  };

  const startRound = () => {
    clearTimers();
    if (!running) return;
    const round = roundsData[roundIndex % roundsData.length];
    activeTargetId = round.targetId;
    currentOrder = cards.map((card) => card.id);
    locked = true;
    renderBoard(currentOrder, true);
    feedback.className = "feedback";
    feedback.textContent = "";
    updateStatus(`Watch ${round.targetLabel}.`);
    queue(() => beginShuffle(round.shuffleSeed || roundIndex + 1, shuffleCount), peekMs);
  };

  function handlePick(cardId) {
    if (!running || locked || !canPlayStage()) return;
    const round = roundsData[roundIndex % roundsData.length];
    if (cardId === activeTargetId) {
      feedback.className = "feedback ok";
      feedback.textContent = challengeCopy("You tracked the right clue.", "Seguiste la pista correcta.");
      playSfx("success");
      roundIndex += 1;
      if (roundIndex >= totalRounds) {
        completeStage(meta, mode);
        return;
      }
      locked = true;
      queue(startRound, 520);
      return;
    }

    misses += 1;
    feedback.className = "feedback warn";
    feedback.textContent = challengeCopy(
      `That was not ${round.targetLabel}. Watch the shuffle again.`,
      `Esa no era ${round.targetLabel}. Mira la mezcla otra vez.`
    );
    playSfx("fail");
    if (misses >= maxMisses) {
      failStage();
      return;
    }
    locked = true;
    updateStatus(`Watch ${round.targetLabel}.`);
    queue(startRound, 520);
  }

  const onKey = (event) => {
    if (state.activeStage !== meta.id || !running || locked) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const index = Number(String(event.key || "").trim()) - 1;
    if (!Number.isInteger(index) || index < 0 || index >= buttons.length) return;
    event.preventDefault();
    buttons[index]?.click();
  };

  window.addEventListener("keydown", onKey);
  startRound();

  return () => {
    running = false;
    clearTimers();
    window.removeEventListener("keydown", onKey);
  };
}

function renderMemoryFlip(meta, mode, feedback) {
  const prompt = document.createElement("p");
  prompt.textContent = mode.secondaryPrompt || "Memorize the cards, then flip and match every pair.";
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: press 1-8 to flip cards.");
  const status = createSkillStatus("");
  activityPanel.append(prompt, hint, status);

  const board = document.createElement("div");
  board.style.display = "grid";
  board.style.gridTemplateColumns = "repeat(4, minmax(110px, 1fr))";
  board.style.gap = "0.75rem";
  board.style.marginTop = "0.8rem";
  activityPanel.append(board);

  const cards = Array.isArray(mode.cards) && mode.cards.length ? mode.cards.slice(0, 4) : stageFiveChoiceCardsFromBase(mode, 4, mode.themeName || "");
  const deck = Array.isArray(mode.board) && mode.board.length
    ? mode.board.slice(0, 8)
    : rotateKinds(cards.flatMap((card, index) => [
      { slotId: `${card.id}-a-${index}`, cardId: card.id },
      { slotId: `${card.id}-b-${index}`, cardId: card.id }
    ]), 1);
  const peekMs = Math.max(420, Number(mode.peekMs) || 1150);
  const maxMisses = Math.max(1, Number(mode.maxMisses) || 4);
  const cardMap = new Map(cards.map((card) => [card.id, card]));
  const matched = new Set();
  const timers = new Set();
  let openSlots = [];
  let misses = 0;
  let running = true;
  let locked = true;

  const queue = (callback, delay) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
  };

  const clearTimers = () => {
    timers.forEach((timer) => window.clearTimeout(timer));
    timers.clear();
  };

  const updateStatus = (line = "") => {
    const lead = line ? `${line} ` : "";
    status.textContent = `${lead}${challengeCopy("Matched", "Emparejadas")}: ${matched.size / 2}/${cards.length} | ${t("missesLabel")}: ${misses}/${maxMisses}`;
  };

  const isFaceUp = (index, revealAll = false) => revealAll || matched.has(index) || openSlots.includes(index);

  const renderBoard = (revealAll = false) => {
    board.innerHTML = "";
    deck.forEach((slot, index) => {
      const card = cardMap.get(slot.cardId) || { icon: "✨", label: "Faith" };
      const faceUp = isFaceUp(index, revealAll);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ghost-btn";
      button.disabled = !running || matched.has(index);
      button.style.minHeight = "96px";
      button.style.display = "grid";
      button.style.placeItems = "center";
      button.style.padding = "0.75rem";
      button.style.fontWeight = "800";
      button.innerHTML = faceUp
        ? `<span style="font-size:1.4rem">${card.icon}</span><span>${index + 1}. ${card.label}</span>`
        : `<span style="font-size:1.5rem">🛡️</span><span>${index + 1}. ${challengeCopy("Hidden", "Oculta")}</span>`;
      if (!faceUp) {
        button.style.opacity = "0.94";
      }
      button.addEventListener("click", () => handleFlip(index));
      board.append(button);
    });
  };

  const failStage = () => {
    running = false;
    const hasLives = loseLife();
    feedback.className = "feedback warn";
    feedback.textContent = hasLives ? t("challengeFailedReplay") : t("outOfLivesContinue");
    playSfx("fail");
    queueStageAutoClose(meta.id);
  };

  function handleFlip(index) {
    if (!running || locked || matched.has(index) || openSlots.includes(index) || !canPlayStage()) return;
    openSlots = openSlots.concat(index);
    renderBoard(false);
    updateStatus();
    if (openSlots.length < 2) return;

    locked = true;
    const [first, second] = openSlots;
    const firstCard = deck[first];
    const secondCard = deck[second];
    const isMatch = firstCard && secondCard && firstCard.cardId === secondCard.cardId;
    if (isMatch) {
      matched.add(first);
      matched.add(second);
      feedback.className = "feedback ok";
      feedback.textContent = challengeCopy("Strong memory. You found the pair.", "Buena memoria. Encontraste la pareja.");
      playSfx("success");
      openSlots = [];
      locked = false;
      renderBoard(false);
      updateStatus();
      if (matched.size >= deck.length) {
        completeStage(meta, mode);
      }
      return;
    }

    misses += 1;
    feedback.className = "feedback warn";
    feedback.textContent = challengeCopy("Those cards do not match.", "Esas cartas no coinciden.");
    playSfx("fail");
    renderBoard(false);
    updateStatus();
    queue(() => {
      openSlots = [];
      renderBoard(false);
      locked = false;
      if (misses >= maxMisses) {
        failStage();
      }
    }, 660);
  }

  const onKey = (event) => {
    if (state.activeStage !== meta.id || !running || locked) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const index = Number(String(event.key || "").trim()) - 1;
    if (!Number.isInteger(index) || index < 0 || index >= deck.length) return;
    event.preventDefault();
    handleFlip(index);
  };

  renderBoard(true);
  updateStatus(challengeCopy("Memorize the board.", "Memoriza el tablero."));
  queue(() => {
    if (!running) return;
    locked = false;
    renderBoard(false);
    updateStatus();
  }, peekMs);
  window.addEventListener("keydown", onKey);

  return () => {
    running = false;
    clearTimers();
    window.removeEventListener("keydown", onKey);
  };
}

function renderSealbreak(meta, mode, feedback) {
  const prompt = document.createElement("p");
  prompt.textContent = mode.secondaryPrompt || "Read the clue and break only the correct seals.";
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: press 1-9 to break a seal.");
  const status = createSkillStatus("");
  activityPanel.append(prompt, hint, status);

  const board = document.createElement("div");
  board.style.display = "grid";
  board.style.gridTemplateColumns = "repeat(3, minmax(120px, 1fr))";
  board.style.gap = "0.75rem";
  board.style.marginTop = "0.8rem";
  activityPanel.append(board);

  const cards = Array.isArray(mode.cards) && mode.cards.length ? mode.cards.slice() : stageFiveChoiceCardsFromBase(mode, 6, mode.themeName || "");
  const roundsData = Array.isArray(mode.roundsData) && mode.roundsData.length ? mode.roundsData : [];
  const totalRounds = Math.max(1, Number(mode.rounds) || roundsData.length || 1);
  const maxMisses = Math.max(1, Number(mode.maxMisses) || 3);
  const cardMap = new Map(cards.map((card) => [card.id, card]));
  const timers = new Set();
  let roundIndex = 0;
  let misses = 0;
  let running = true;
  let locked = false;
  let currentTargets = new Set();
  let brokenTargets = new Set();

  const queue = (callback, delay) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
  };

  const clearTimers = () => {
    timers.forEach((timer) => window.clearTimeout(timer));
    timers.clear();
  };

  const updateStatus = (line = "") => {
    const lead = line ? `${line} ` : "";
    status.textContent = `${lead}${challengeCopy("Round", "Ronda")} ${Math.min(roundIndex + 1, totalRounds)}/${totalRounds} | ${t("missesLabel")}: ${misses}/${maxMisses}`;
  };

  const failStage = () => {
    running = false;
    const hasLives = loseLife();
    feedback.className = "feedback warn";
    feedback.textContent = hasLives ? t("challengeFailedReplay") : t("outOfLivesContinue");
    playSfx("fail");
    queueStageAutoClose(meta.id);
  };

  const renderRound = () => {
    if (!running) return;
    board.innerHTML = "";
    brokenTargets = new Set();
    const round = roundsData[roundIndex % roundsData.length];
    currentTargets = new Set(round.targetIds || []);
    prompt.textContent = round.prompt || mode.secondaryPrompt || "Read the clue and break only the correct seals.";
    updateStatus();

    (round.grid || []).forEach((cell, index) => {
      const card = cardMap.get(cell.cardId) || { icon: "✨", label: "Faith" };
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ghost-btn";
      button.style.minHeight = "92px";
      button.style.display = "grid";
      button.style.placeItems = "center";
      button.style.padding = "0.7rem";
      button.style.fontWeight = "800";
      button.innerHTML = `<span style="font-size:1.3rem">${card.icon}</span><span>${index + 1}. ${card.label}</span>`;
      button.addEventListener("click", () => handleBreak(cell, button));
      board.append(button);
    });
  };

  function handleBreak(cell, button) {
    if (!running || locked || !canPlayStage()) return;
    if (currentTargets.has(cell.cardId)) {
      button.disabled = true;
      button.style.boxShadow = "0 0 0 2px rgba(130,211,146,0.42), 0 16px 30px rgba(70,170,88,0.18)";
      button.style.transform = "translateY(-2px)";
      brokenTargets.add(cell.cardId);
      playSfx("hit");
      feedback.className = "feedback ok";
      feedback.textContent = challengeCopy("Correct seal broken.", "Sello correcto roto.");
      if (brokenTargets.size >= currentTargets.size) {
        roundIndex += 1;
        if (roundIndex >= totalRounds) {
          completeStage(meta, mode);
          return;
        }
        locked = true;
        queue(() => {
          locked = false;
          renderRound();
        }, 420);
      }
      return;
    }

    misses += 1;
    button.disabled = true;
    button.style.boxShadow = "0 0 0 2px rgba(226,122,122,0.42), 0 16px 30px rgba(160,60,60,0.18)";
    button.style.transform = "translateY(-2px)";
    feedback.className = "feedback warn";
    feedback.textContent = challengeCopy("That seal does not fit the clue.", "Ese sello no corresponde a la pista.");
    playSfx("fail");
    updateStatus();
    if (misses >= maxMisses) {
      failStage();
      return;
    }
  }

  const onKey = (event) => {
    if (state.activeStage !== meta.id || !running || locked) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const index = Number(String(event.key || "").trim()) - 1;
    if (!Number.isInteger(index) || index < 0 || index >= board.children.length) return;
    event.preventDefault();
    board.children[index]?.click();
  };

  window.addEventListener("keydown", onKey);
  renderRound();

  return () => {
    running = false;
    clearTimers();
    window.removeEventListener("keydown", onKey);
  };
}

function renderShieldwall(meta, mode, feedback) {
  const prompt = document.createElement("p");
  prompt.textContent = mode.secondaryPrompt || "Watch the attack lane, then raise the shield at the matching gate.";
  const hint = createChallengeHint(mode.keyboardHint || "Keyboard: press 1-4 to guard the right gate.");
  const status = createSkillStatus("");
  activityPanel.append(prompt, hint, status);

  const arena = document.createElement("div");
  arena.style.display = "grid";
  arena.style.gap = "0.8rem";
  arena.style.padding = "1rem";
  arena.style.border = "1px solid rgba(240, 207, 147, 0.18)";
  arena.style.borderRadius = "20px";
  arena.style.background = "linear-gradient(180deg, rgba(12, 18, 28, 0.92), rgba(8, 13, 20, 0.96))";
  activityPanel.append(arena);

  const laneRow = document.createElement("div");
  laneRow.style.display = "grid";
  laneRow.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";
  laneRow.style.gap = "0.65rem";
  arena.append(laneRow);

  const buttonRow = document.createElement("div");
  buttonRow.style.display = "grid";
  buttonRow.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";
  buttonRow.style.gap = "0.65rem";
  arena.append(buttonRow);

  const cards = Array.isArray(mode.cards) && mode.cards.length ? mode.cards.slice(0, 4) : stageFiveChoiceCardsFromBase(mode, 4, mode.themeName || "");
  const roundsData = Array.isArray(mode.roundsData) && mode.roundsData.length ? mode.roundsData : cards.map((card, index) => ({ lane: index, cardId: card.id, prompt: `Guard ${card.label}.` }));
  const targetWins = Math.max(1, Number(mode.target) || roundsData.length);
  const maxMisses = Math.max(1, Number(mode.maxMisses) || 3);
  const speedMs = Math.max(820, Number(mode.speedMs) || 1420);
  const laneNodes = [];
  const laneBeacons = [];
  const shieldButtons = [];
  const timers = new Set();
  let running = true;
  let locked = true;
  let wins = 0;
  let misses = 0;
  let roundIndex = 0;
  let activeLane = -1;

  const queue = (callback, delay) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
  };

  const clearTimers = () => {
    timers.forEach((timer) => window.clearTimeout(timer));
    timers.clear();
  };

  const updateStatus = (line = "") => {
    const lead = line ? `${line} ` : "";
    status.textContent = `${lead}${challengeCopy("Guarded", "Bloqueadas")}: ${wins}/${targetWins} | ${t("missesLabel")}: ${misses}/${maxMisses}`;
  };

  cards.forEach((card, index) => {
    const lane = document.createElement("div");
    lane.style.position = "relative";
    lane.style.minHeight = "130px";
    lane.style.padding = "0.75rem 0.55rem";
    lane.style.borderRadius = "18px";
    lane.style.border = "1px solid rgba(240, 207, 147, 0.18)";
    lane.style.background = "linear-gradient(180deg, rgba(18, 25, 37, 0.92), rgba(10, 15, 23, 0.98))";
    lane.style.overflow = "hidden";
    lane.innerHTML = `<div style="display:grid;gap:0.25rem;text-align:center;font-weight:800;"><span style="font-size:1.45rem">${card.icon}</span><span>${card.label}</span></div>`;

    const beacon = document.createElement("div");
    beacon.style.position = "absolute";
    beacon.style.left = "50%";
    beacon.style.top = "6px";
    beacon.style.transform = "translate(-50%, -28px)";
    beacon.style.width = "32px";
    beacon.style.height = "32px";
    beacon.style.borderRadius = "999px";
    beacon.style.background = "radial-gradient(circle, rgba(255,238,188,0.95), rgba(213,169,72,0.18) 68%, rgba(213,169,72,0) 100%)";
    beacon.style.opacity = "0";
    beacon.style.transition = "transform 0.18s ease, opacity 0.18s ease";
    lane.append(beacon);

    laneNodes.push(lane);
    laneBeacons.push(beacon);
    laneRow.append(lane);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost-btn";
    button.innerHTML = `🛡️ <span>${index + 1}</span>`;
    button.addEventListener("click", () => guardLane(index));
    shieldButtons.push(button);
    buttonRow.append(button);
  });

  const failStage = () => {
    running = false;
    const hasLives = loseLife();
    feedback.className = "feedback warn";
    feedback.textContent = hasLives ? t("challengeFailedReplay") : t("outOfLivesContinue");
    playSfx("fail");
    queueStageAutoClose(meta.id);
  };

  const setLaneState = (laneIndex, phase = "idle") => {
    laneNodes.forEach((lane, index) => {
      lane.style.boxShadow = "";
      lane.style.transform = "";
      laneBeacons[index].style.opacity = "0";
      laneBeacons[index].style.transform = "translate(-50%, -28px)";
      if (phase === "idle" || index !== laneIndex) return;
      lane.style.boxShadow = phase === "impact"
        ? "0 0 0 2px rgba(226,122,122,0.42), 0 18px 38px rgba(160,60,60,0.22)"
        : "0 0 0 2px rgba(229,191,93,0.42), 0 18px 38px rgba(229,191,93,0.18)";
      lane.style.transform = "translateY(-2px)";
      laneBeacons[index].style.opacity = "1";
      laneBeacons[index].style.transform = phase === "impact" ? "translate(-50%, 78px)" : "translate(-50%, 24px)";
    });
  };

  const setButtonsLocked = (value) => {
    shieldButtons.forEach((button) => {
      button.disabled = value;
    });
  };

  const startRound = () => {
    clearTimers();
    if (!running) return;
    const round = roundsData[roundIndex % roundsData.length];
    activeLane = Math.max(0, Math.min(3, Number(round.lane) || 0));
    prompt.textContent = round.prompt || mode.secondaryPrompt || "Watch the attack lane, then raise the shield at the matching gate.";
    locked = true;
    setButtonsLocked(true);
    setLaneState(activeLane, "telegraph");
    feedback.className = "feedback";
    feedback.textContent = challengeCopy("An attack is forming. Hold the right gate.", "Se forma un ataque. Protege la puerta correcta.");
    updateStatus();
    queue(() => {
      if (!running) return;
      locked = false;
      setButtonsLocked(false);
      setLaneState(activeLane, "telegraph");
      playSfx("boss-attack");
    }, 220);
    queue(() => {
      if (!running || locked) return;
      locked = true;
      setButtonsLocked(true);
      setLaneState(activeLane, "impact");
      misses += 1;
      feedback.className = "feedback warn";
      feedback.textContent = challengeCopy("The strike landed before your shield was set.", "El golpe llego antes de que tu escudo estuviera listo.");
      playSfx("boss-hurt");
      updateStatus();
      if (misses >= maxMisses) {
        failStage();
        return;
      }
      roundIndex += 1;
      queue(startRound, 520);
    }, speedMs);
  };

  function guardLane(index) {
    if (!running || locked || !canPlayStage()) return;
    locked = true;
    setButtonsLocked(true);
    clearTimers();
    if (index === activeLane) {
      wins += 1;
      setLaneState(index, "telegraph");
      feedback.className = "feedback ok";
      feedback.textContent = challengeCopy("Shield raised in time. The wall holds.", "Escudo levantado a tiempo. La muralla resiste.");
      playSfx("success");
      updateStatus();
      if (wins >= targetWins) {
        completeStage(meta, mode);
        return;
      }
      roundIndex += 1;
      queue(startRound, 420);
      return;
    }

    misses += 1;
    setLaneState(activeLane, "impact");
    feedback.className = "feedback warn";
    feedback.textContent = challengeCopy("Wrong gate. The strike slipped through.", "Puerta equivocada. El golpe paso.");
    playSfx("fail");
    updateStatus();
    if (misses >= maxMisses) {
      failStage();
      return;
    }
    roundIndex += 1;
    queue(startRound, 520);
  }

  const onKey = (event) => {
    if (state.activeStage !== meta.id || !running || locked) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const index = Number(String(event.key || "").trim()) - 1;
    if (!Number.isInteger(index) || index < 0 || index >= shieldButtons.length) return;
    event.preventDefault();
    guardLane(index);
  };

  window.addEventListener("keydown", onKey);
  updateStatus();
  startRound();

  return () => {
    running = false;
    clearTimers();
    window.removeEventListener("keydown", onKey);
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
  const themeText = `${mode.id || ""} ${mode.label || ""} ${mode.storyPrompt || ""} ${mode.sourceRef || ""}`.toLowerCase();
  const slingshotTheme = themeText.includes("babel") || themeText.includes("shinar")
    ? "babel"
    : (themeText.includes("goliath") || themeText.includes("giant") || themeText.includes("gath") || themeText.includes("1 samuel 17")
      ? "giant"
      : "champion");
  const weaknessHint = slingshotTheme === "babel"
    ? "Pull back farther and strike the tower-master's glowing seal."
    : (slingshotTheme === "giant"
      ? "Pull back with conviction and aim for the giant's exposed forehead."
      : "Draw back fully and hit the enemy's glowing weak point.");
  const status = createSkillStatus(weaknessHint);
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
  const target = {
    x: slingshotTheme === "babel" ? 448 : 455,
    y: slingshotTheme === "babel" ? 118 : 110,
    r: mode.targetRadius || 20
  };
  let stone = { x: sling.x, y: sling.y, vx: 0, vy: 0, flying: false };
  let dragPoint = { x: sling.x, y: sling.y };
  let dragging = false;
  let finished = false;
  let running = true;
  let raf = 0;
  let activePointerId = null;
  let keyboardPull = slingshotTheme === "babel"
    ? { x: -92, y: 24 }
    : (slingshotTheme === "giant" ? { x: -72, y: 18 } : { x: -66, y: 18 });

  function maxPullDistance() {
    const base = Number(mode.maxPull) || 82;
    if (slingshotTheme === "babel") return Math.max(base, 124);
    if (slingshotTheme === "giant") return Math.max(base, 104);
    return Math.max(base, 94);
  }

  function pullPowerScale() {
    const base = Number(mode.pullPowerScale) || 0.14;
    if (slingshotTheme === "babel") return Math.max(base, 0.155);
    if (slingshotTheme === "giant") return Math.max(base, 0.145);
    return Math.max(base, 0.142);
  }

  function weakPointAt(now = 0) {
    if (slingshotTheme === "babel") {
      const sway = Math.sin(now / 420) * 4;
      return { x: target.x + sway, y: target.y + Math.cos(now / 480) * 2, r: target.r };
    }
    if (slingshotTheme === "giant") {
      const sway = Math.sin(now / 520) * 2;
      return { x: target.x + sway, y: target.y + Math.cos(now / 620), r: target.r };
    }
    return { x: target.x, y: target.y, r: target.r };
  }

  function resetStone() {
    stone = { x: sling.x, y: sling.y, vx: 0, vy: 0, flying: false };
    dragPoint = { x: sling.x + keyboardPull.x, y: sling.y + keyboardPull.y };
    dragging = false;
  }

  function applyKeyboardPull() {
    const maxPull = maxPullDistance();
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

  function drawBackdrop(now) {
    const sky = c.createLinearGradient(0, 0, 0, canvas.height);
    if (slingshotTheme === "babel") {
      sky.addColorStop(0, "#2d3a58");
      sky.addColorStop(0.58, "#17202f");
      sky.addColorStop(1, "#0c1018");
    } else if (slingshotTheme === "giant") {
      sky.addColorStop(0, "#304968");
      sky.addColorStop(0.64, "#15212f");
      sky.addColorStop(1, "#0a1018");
    } else {
      sky.addColorStop(0, "#213653");
      sky.addColorStop(0.7, "#111822");
      sky.addColorStop(1, "#090d13");
    }
    c.fillStyle = sky;
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "rgba(255, 214, 127, 0.1)";
    c.beginPath();
    c.arc(slingshotTheme === "babel" ? 112 : 102, 72, 36, 0, Math.PI * 2);
    c.fill();

    if (slingshotTheme === "babel") {
      c.fillStyle = "#2a3344";
      c.beginPath();
      c.moveTo(0, 212);
      c.lineTo(70, 164);
      c.lineTo(138, 204);
      c.lineTo(220, 148);
      c.lineTo(288, 198);
      c.lineTo(364, 142);
      c.lineTo(444, 204);
      c.lineTo(canvas.width, 160);
      c.lineTo(canvas.width, 250);
      c.lineTo(0, 250);
      c.closePath();
      c.fill();

      c.fillStyle = "#404b32";
      c.fillRect(0, 250, canvas.width, 50);
      c.fillStyle = "rgba(219, 181, 120, 0.12)";
      for (let i = 0; i < 11; i += 1) {
        c.fillRect(26 + i * 48, 256 + ((i % 2) * 3), 28, 5);
      }
    } else if (slingshotTheme === "giant") {
      c.fillStyle = "#2a3640";
      c.beginPath();
      c.moveTo(0, 208);
      c.lineTo(58, 186);
      c.lineTo(130, 210);
      c.lineTo(208, 166);
      c.lineTo(276, 204);
      c.lineTo(362, 154);
      c.lineTo(446, 208);
      c.lineTo(canvas.width, 178);
      c.lineTo(canvas.width, 250);
      c.lineTo(0, 250);
      c.closePath();
      c.fill();

      c.fillStyle = "#425136";
      c.fillRect(0, 250, canvas.width, 50);
    } else {
      c.fillStyle = "#343f23";
      c.fillRect(0, 250, canvas.width, 50);
    }

    c.fillStyle = "rgba(255,255,255,0.04)";
    for (let i = 0; i < 14; i += 1) {
      const px = (i * 43 + Math.sin(now / 1300 + i) * 6) % canvas.width;
      const py = 28 + (i % 5) * 16;
      c.fillRect(px, py, 2, 2);
    }
  }

  function drawBabelBoss(now, weakPoint) {
    const sway = Math.sin(now / 420) * 4;
    const towerX = 408;
    const towerY = 86;
    const towerW = 92;
    const towerH = 156;
    drawRoundedRect(c, towerX, towerY, towerW, towerH, 12, "#8c5a33");

    c.fillStyle = "#9d6a3c";
    for (let row = 0; row < 12; row += 1) {
      const y = towerY + 10 + row * 11;
      c.fillRect(towerX + 6, y, towerW - 12, 2);
    }
    for (let col = 0; col < 3; col += 1) {
      const x = towerX + 20 + col * 22;
      c.fillRect(x, towerY + 8, 2, towerH - 16);
    }

    c.fillStyle = "#b98549";
    for (let i = 0; i < 5; i += 1) {
      c.fillRect(towerX + 8 + i * 16, towerY - 8, 10, 12);
    }
    drawRoundedRect(c, towerX + 8, towerY + 42, towerW - 16, 16, 8, "#6a4328");
    drawRoundedRect(c, towerX + 12, towerY + 108, towerW - 24, 12, 6, "#5d3a24");

    const bodyX = 450 + sway;
    const bodyY = 130 + Math.cos(now / 420) * 2;
    c.strokeStyle = "#dfb789";
    c.lineWidth = 8;
    c.beginPath();
    c.moveTo(bodyX - 14, bodyY + 28);
    c.lineTo(bodyX - 30, bodyY + 48);
    c.moveTo(bodyX + 14, bodyY + 28);
    c.lineTo(bodyX + 32, bodyY + 46);
    c.stroke();

    c.fillStyle = "#6c3926";
    c.beginPath();
    c.moveTo(bodyX - 18, bodyY + 12);
    c.lineTo(bodyX + 18, bodyY + 12);
    c.lineTo(bodyX + 24, bodyY + 76);
    c.lineTo(bodyX - 24, bodyY + 76);
    c.closePath();
    c.fill();

    c.strokeStyle = "#4b2519";
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(bodyX - 10, bodyY + 76);
    c.lineTo(bodyX - 10, bodyY + 106);
    c.moveTo(bodyX + 10, bodyY + 76);
    c.lineTo(bodyX + 10, bodyY + 106);
    c.stroke();

    c.fillStyle = "#2f2219";
    c.fillRect(bodyX - 18, bodyY + 100, 14, 8);
    c.fillRect(bodyX + 4, bodyY + 100, 14, 8);

    c.fillStyle = "#e4c09a";
    c.beginPath();
    c.arc(bodyX, bodyY, 16, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = "#3e261d";
    c.beginPath();
    c.arc(bodyX, bodyY - 3, 17, Math.PI, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.moveTo(bodyX - 6, bodyY + 10);
    c.lineTo(bodyX, bodyY + 18);
    c.lineTo(bodyX + 6, bodyY + 10);
    c.closePath();
    c.fill();

    c.strokeStyle = "#2c140f";
    c.lineWidth = 2.5;
    c.beginPath();
    c.moveTo(bodyX - 8, bodyY - 4);
    c.lineTo(bodyX - 2, bodyY - 6);
    c.moveTo(bodyX + 2, bodyY - 6);
    c.lineTo(bodyX + 8, bodyY - 4);
    c.moveTo(bodyX - 6, bodyY + 7);
    c.quadraticCurveTo(bodyX, bodyY + 12, bodyX + 6, bodyY + 7);
    c.stroke();

    c.fillStyle = "#d5a255";
    c.beginPath();
    c.moveTo(bodyX - 22, bodyY + 28);
    c.lineTo(bodyX - 40, bodyY + 20);
    c.lineTo(bodyX - 34, bodyY + 10);
    c.lineTo(bodyX - 18, bodyY + 18);
    c.closePath();
    c.fill();

    const sealGlow = c.createRadialGradient(weakPoint.x, weakPoint.y, 3, weakPoint.x, weakPoint.y, weakPoint.r + 12);
    sealGlow.addColorStop(0, "#fff0bf");
    sealGlow.addColorStop(0.45, "#f5c361");
    sealGlow.addColorStop(1, "rgba(245,195,97,0)");
    c.fillStyle = sealGlow;
    c.beginPath();
    c.arc(weakPoint.x, weakPoint.y, weakPoint.r + 10, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = "#f4c153";
    c.beginPath();
    c.moveTo(weakPoint.x, weakPoint.y - weakPoint.r);
    c.lineTo(weakPoint.x + weakPoint.r - 2, weakPoint.y);
    c.lineTo(weakPoint.x, weakPoint.y + weakPoint.r);
    c.lineTo(weakPoint.x - weakPoint.r + 2, weakPoint.y);
    c.closePath();
    c.fill();

    c.strokeStyle = "rgba(255, 240, 196, 0.8)";
    c.lineWidth = 2;
    c.stroke();
  }

  function drawGiantBoss(now, weakPoint) {
    const sway = Math.sin(now / 520) * 2.2;
    const bodyX = 455 + sway;
    const bodyY = 108 + Math.cos(now / 650);

    c.strokeStyle = "#704f2c";
    c.lineWidth = 10;
    c.beginPath();
    c.moveTo(bodyX + 36, bodyY + 18);
    c.lineTo(bodyX + 48, bodyY + 148);
    c.stroke();

    c.fillStyle = "#a57a47";
    c.fillRect(bodyX + 42, bodyY + 10, 12, 16);

    c.fillStyle = "#7f542b";
    c.beginPath();
    c.moveTo(bodyX - 28, bodyY + 28);
    c.lineTo(bodyX + 28, bodyY + 28);
    c.lineTo(bodyX + 38, bodyY + 116);
    c.lineTo(bodyX - 38, bodyY + 116);
    c.closePath();
    c.fill();

    c.strokeStyle = "#d9b48a";
    c.lineWidth = 10;
    c.beginPath();
    c.moveTo(bodyX - 18, bodyY + 44);
    c.lineTo(bodyX - 46, bodyY + 82);
    c.moveTo(bodyX + 18, bodyY + 44);
    c.lineTo(bodyX + 44, bodyY + 84);
    c.moveTo(bodyX - 14, bodyY + 116);
    c.lineTo(bodyX - 16, bodyY + 164);
    c.moveTo(bodyX + 14, bodyY + 116);
    c.lineTo(bodyX + 16, bodyY + 164);
    c.stroke();

    c.fillStyle = "#2f2117";
    c.fillRect(bodyX - 28, bodyY + 158, 20, 10);
    c.fillRect(bodyX + 8, bodyY + 158, 20, 10);

    c.fillStyle = "#d8b48c";
    c.beginPath();
    c.arc(bodyX, bodyY, 22, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = "#7f542b";
    c.beginPath();
    c.arc(bodyX, bodyY - 6, 24, Math.PI, Math.PI * 2);
    c.fill();
    c.fillRect(bodyX - 25, bodyY - 4, 50, 10);

    c.strokeStyle = "#26150f";
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(bodyX - 11, bodyY - 4);
    c.lineTo(bodyX - 4, bodyY - 8);
    c.moveTo(bodyX + 4, bodyY - 8);
    c.lineTo(bodyX + 11, bodyY - 4);
    c.moveTo(bodyX - 8, bodyY + 10);
    c.quadraticCurveTo(bodyX, bodyY + 15, bodyX + 8, bodyY + 10);
    c.stroke();

    const weakGlow = c.createRadialGradient(weakPoint.x, weakPoint.y, 3, weakPoint.x, weakPoint.y, weakPoint.r + 10);
    weakGlow.addColorStop(0, "#fff0d1");
    weakGlow.addColorStop(0.5, "#e79e60");
    weakGlow.addColorStop(1, "rgba(231,158,96,0)");
    c.fillStyle = weakGlow;
    c.beginPath();
    c.arc(weakPoint.x, weakPoint.y, weakPoint.r + 8, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = "#f0b96d";
    c.beginPath();
    c.arc(weakPoint.x, weakPoint.y, weakPoint.r, 0, Math.PI * 2);
    c.fill();
  }

  function drawChampionBoss(now, weakPoint) {
    const sway = Math.sin(now / 600) * 2;
    const bodyX = 450 + sway;
    const bodyY = 114;

    c.fillStyle = "#59412a";
    drawRoundedRect(c, bodyX - 36, bodyY + 26, 72, 106, 18, "#59412a");
    c.fillStyle = "#d9b48c";
    c.beginPath();
    c.arc(bodyX, bodyY, 18, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#2e2017";
    c.beginPath();
    c.arc(bodyX, bodyY - 5, 20, Math.PI, Math.PI * 2);
    c.fill();
    c.strokeStyle = "#2e2017";
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(bodyX - 8, bodyY - 2);
    c.lineTo(bodyX - 3, bodyY - 6);
    c.moveTo(bodyX + 3, bodyY - 6);
    c.lineTo(bodyX + 8, bodyY - 2);
    c.moveTo(bodyX - 6, bodyY + 8);
    c.quadraticCurveTo(bodyX, bodyY + 12, bodyX + 6, bodyY + 8);
    c.stroke();

    const weakGlow = c.createRadialGradient(weakPoint.x, weakPoint.y, 3, weakPoint.x, weakPoint.y, weakPoint.r + 10);
    weakGlow.addColorStop(0, "#fff3d1");
    weakGlow.addColorStop(0.55, "#e5a85f");
    weakGlow.addColorStop(1, "rgba(229,168,95,0)");
    c.fillStyle = weakGlow;
    c.beginPath();
    c.arc(weakPoint.x, weakPoint.y, weakPoint.r + 9, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = "#efbd72";
    c.beginPath();
    c.arc(weakPoint.x, weakPoint.y, weakPoint.r, 0, Math.PI * 2);
    c.fill();
  }

  function drawSling() {
    c.strokeStyle = "#7d5533";
    c.lineWidth = 8;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(sling.x - 14, sling.y + 10);
    c.lineTo(sling.x - 8, sling.y - 54);
    c.moveTo(sling.x + 14, sling.y + 10);
    c.lineTo(sling.x + 8, sling.y - 54);
    c.stroke();

    c.fillStyle = "#8f6944";
    c.beginPath();
    c.ellipse(sling.x, sling.y + 6, 18, 10, 0, 0, Math.PI * 2);
    c.fill();

    c.strokeStyle = "#c69459";
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(sling.x - 14, sling.y + 8);
    c.lineTo(dragPoint.x, dragPoint.y);
    c.lineTo(sling.x + 14, sling.y + 8);
    c.stroke();

    c.fillStyle = "#8c6940";
    c.beginPath();
    c.ellipse(dragPoint.x, dragPoint.y, 12, 7, 0, 0, Math.PI * 2);
    c.fill();
  }

  function drawTrajectoryPreview() {
    if (stone.flying || dragging) return;
    const previewVx = (sling.x - dragPoint.x) * pullPowerScale();
    const previewVy = (sling.y - dragPoint.y) * pullPowerScale();
    let px = dragPoint.x;
    let py = dragPoint.y;
    c.fillStyle = "rgba(255, 232, 180, 0.22)";
    for (let i = 1; i <= 10; i += 1) {
      px += previewVx;
      py += previewVy + (0.24 * i);
      c.beginPath();
      c.arc(px, py, Math.max(1.8, 4 - i * 0.18), 0, Math.PI * 2);
      c.fill();
    }
  }

  function draw(now = performance.now()) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawBackdrop(now);
    const weakPoint = weakPointAt(now);
    if (slingshotTheme === "babel") {
      drawBabelBoss(now, weakPoint);
    } else if (slingshotTheme === "giant") {
      drawGiantBoss(now, weakPoint);
    } else {
      drawChampionBoss(now, weakPoint);
    }
    drawTrajectoryPreview();
    drawSling();

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

      const weakPoint = weakPointAt(performance.now());
      const dx = stone.x - weakPoint.x;
      const dy = stone.y - weakPoint.y;
      if (Math.hypot(dx, dy) < weakPoint.r + 8) {
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

  const releaseActivePointerCapture = (pointerId = activePointerId) => {
    if (pointerId == null || !canvas.releasePointerCapture) return;
    try {
      canvas.releasePointerCapture(pointerId);
    } catch (_) {
      // Ignore release failures on older iOS builds.
    }
  };

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
    const maxPull = maxPullDistance();
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
    releaseActivePointerCapture(event.pointerId);
    activePointerId = null;
    stone.vx = (sling.x - dragPoint.x) * pullPowerScale();
    stone.vy = (sling.y - dragPoint.y) * pullPowerScale();
    stone.flying = true;
    status.textContent = "Stone released. Hold steady for the hit.";
    playSfx("click");
  };

  const onCancel = (event) => {
    if (activePointerId !== null && event.pointerId !== activePointerId) return;
    dragging = false;
    releaseActivePointerCapture(event.pointerId);
    activePointerId = null;
    resetStone();
  };

  const onRetry = () => {
    finished = false;
    feedback.textContent = "";
    resetStone();
    status.textContent = weaknessHint;
  };

  const launchStone = () => {
    if (finished || stone.flying || !canPlayStage()) return;
    stone.vx = (sling.x - dragPoint.x) * pullPowerScale();
    stone.vy = (sling.y - dragPoint.y) * pullPowerScale();
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
        keyboardPull.x = Math.max(-maxPullDistance(), keyboardPull.x - 8);
        applyKeyboardPull();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        keyboardPull.x = Math.min(maxPullDistance(), keyboardPull.x + 8);
        applyKeyboardPull();
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        keyboardPull.y = Math.max(-maxPullDistance(), keyboardPull.y - 8);
        applyKeyboardPull();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        keyboardPull.y = Math.min(maxPullDistance(), keyboardPull.y + 8);
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
    dragging = false;
    releaseActivePointerCapture();
    activePointerId = null;
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
  const duckMultiplier = Date.now() < (audioEngine.duckUntil || 0)
    ? Math.max(0.14, Math.min(1, Number(audioEngine.duckLevel) || 0.42))
    : 1;
  const musicTarget = musicShouldBeAudible ? musicGainForCurrentLevel() * duckMultiplier : 0;
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

  if (state.audio.music) {
    ensureMusicHeartbeat();
  } else {
    stopMusicHeartbeat();
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

function requestActivityClose(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!state.activeStage || !activityOverlay || activityOverlay.classList.contains("hidden")) return;
  closeActivity();
}

if (closeActivityBtn) {
  closeActivityBtn.addEventListener("pointerdown", requestActivityClose);
  closeActivityBtn.addEventListener("click", requestActivityClose);
}
if (activityOverlay) {
  activityOverlay.addEventListener("click", (event) => {
    if (event.target === activityOverlay) requestActivityClose(event);
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!state.activeStage || !activityOverlay || activityOverlay.classList.contains("hidden")) return;
  requestActivityClose(event);
});

if (acceptChallengeBtn) {
  acceptChallengeBtn.addEventListener("pointerdown", dismissWelcome);
  acceptChallengeBtn.addEventListener("click", dismissWelcome);
}
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
initDesktopControlBindings();
render();

updateAudioState();
armFirstInteractionRecap();

window.setTimeout(primeAudioAuto, 0);
window.setTimeout(primeAudioAuto, 220);
window.setTimeout(primeAudioAuto, 650);
window.addEventListener("pageshow", () => {
  clearHiddenCleanupTimer();
  applyPerformanceMode();
  trimPreloadedMediaCaches();
  primeAudioAuto();
  scheduleViewportNormalization();
  scheduleStoryReturnRecap("pageshow", 520);
});
window.addEventListener("load", () => {
  applyPerformanceMode();
  primeAudioAuto();
  scheduleViewportNormalization();
  scheduleStoryReturnRecap("load", 680);
});
window.addEventListener("focus", () => {
  window.setTimeout(() => {
    if (shouldKeepHubMusicAlive()) primeAudioAuto();
  }, 40);
  scheduleStoryReturnRecap("focus", 520);
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    clearHiddenCleanupTimer();
    applyPerformanceMode();
    trimPreloadedMediaCaches();
    if (!hubMediaWarmupScheduled) scheduleHubMediaWarmup();
    primeAudioAuto();
    scheduleStoryReturnRecap("visible", 460);
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
  stopStoryRecap();
  stopStoryNarration();
  trimPreloadedMediaCaches({ aggressive: true });
});

window.requestAnimationFrame(() => {
  if (!hasResumedSession) {
    resumeLastSession();
    hasResumedSession = true;
    scheduleStoryReturnRecap("resume", 540);
  }
});
