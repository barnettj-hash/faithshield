const TOTAL_LEVELS = 100;
const STAGES_PER_LEVEL = 5;
const TOTAL_STAGES = TOTAL_LEVELS * STAGES_PER_LEVEL;
const MAX_LIVES = 5;
const MAX_BADGES = 40;
const XP_STAGE_CLEAR = 25;
const XP_INTERACTIVE_CLEAR = 60;
const CONTENT_VERSION = "2026-03-13-bible-accuracy-v1";
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
      slingshot: { targetRadiusDelta: 7, maxPullDelta: 10, pullScale: 0.16 }
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
      slingshot: { targetRadiusDelta: 0, maxPullDelta: 0, pullScale: 0.14 }
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
      slingshot: { targetRadiusDelta: -5, maxPullDelta: -8, pullScale: 0.13 }
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
  "Burning Bush": ["Moses", "bush", "Pharaoh"],
  "Plagues and Passover": ["plague", "blood", "lamb"],
  "Sea Crossing": ["sea", "Miriam", "dry"],
  "Sinai Covenant": ["Sinai", "law", "covenant"],
  "Wilderness Trust": ["manna", "quail", "wilderness"],
  "Jordan Crossing": ["Jordan", "stones", "ark"],
  "Land and Legacy": ["Jericho", "Ai", "worship"],
  "Cycle of Judges": ["judge", "Gideon", "Samson"],
  "Ruth's Faithfulness": ["Ruth", "Boaz", "Naomi"],
  "Samuel's Calling": ["Samuel", "Eli", "Shiloh"],
  "Saul's Kingship": ["Saul", "king", "obey"],
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
  { id: "slingshot-1", engine: "slingshot", label: "Giant Duel", target: 1, sourceRef: "1 Samuel 17:45-50" },
  { id: "slingshot-2", engine: "slingshot", label: "Valley Finale", target: 1, sourceRef: "1 Samuel 17:48-50" },
  { id: "timing-7", engine: "timing", label: "Brook Stone Count", target: 6, maxMisses: 4, speed: 780, sourceRef: "1 Samuel 17:40" },
  { id: "collect-7", engine: "collect", label: "Gleaning Field Run", target: 12, maxMisses: 7, seconds: 24, spawnMs: 430, sourceRef: "Ruth 2:2-3" },
  { id: "dodge-7", engine: "dodge", label: "Cave Refuge Sprint", target: 20, spawnMs: 340, sourceRef: "1 Samuel 22:1" },
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
      id: "creation-light-gather",
      engine: "collect",
      label: "Gather the First Light",
      target: 10,
      maxMisses: 5,
      seconds: 26,
      spawnMs: 480,
      sourceRef: "Genesis 1:3-4",
      storyPrompt: "Gather the first light as God separates it from the darkness.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the light."
    },
    {
      id: "creation-garden-keep",
      engine: "timing",
      label: "Garden Keep",
      target: 6,
      maxMisses: 4,
      speed: 820,
      sourceRef: "Genesis 2:15",
      storyPrompt: "Keep the garden in faithful rhythm as Adam works what God has given.",
      keyboardHint: "Keyboard: press Space or Enter when the marker is inside the gold zone."
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
      engine: "timing",
      label: "Cherubim Watch",
      target: 7,
      maxMisses: 4,
      speed: 780,
      sourceRef: "Genesis 3:24",
      storyPrompt: "Move in step with the guarded way as the flaming sword turns every direction.",
      keyboardHint: "Keyboard: press Space or Enter when the marker enters the guarded path."
    }
  ],
  "Flood and Covenant": [
    {
      id: "flood-ark-hammer",
      engine: "timing",
      label: "Ark Hammer",
      target: 6,
      maxMisses: 4,
      speed: 880,
      sourceRef: "Genesis 6:14",
      storyPrompt: "Build with steady rhythm as Noah follows God's design for the ark.",
      keyboardHint: "Keyboard: press Space or Enter when the marker is inside the build zone."
    },
    {
      id: "flood-gather-pairs",
      engine: "collect",
      label: "Gather the Pairs",
      target: 11,
      maxMisses: 5,
      seconds: 25,
      spawnMs: 450,
      sourceRef: "Genesis 7:2-3",
      storyPrompt: "Gather the pairs in time before the rain begins.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the pairs."
    },
    {
      id: "flood-rainline-run",
      engine: "dodge",
      label: "Rainline Run",
      target: 18,
      spawnMs: 350,
      sourceRef: "Genesis 7:11-12",
      storyPrompt: "Stay on course while the floodwaters crash around the ark.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to avoid the falling storm."
    },
    {
      id: "flood-olive-leaf",
      engine: "collect",
      label: "Olive Leaf Search",
      target: 12,
      maxMisses: 6,
      seconds: 24,
      spawnMs: 430,
      sourceRef: "Genesis 8:11",
      storyPrompt: "Search for the olive leaf that signals dry land is near.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to catch the signs of hope."
    },
    {
      id: "flood-rainbow-promise",
      engine: "timing",
      label: "Rainbow Promise",
      target: 7,
      maxMisses: 4,
      speed: 760,
      sourceRef: "Genesis 9:13-16",
      storyPrompt: "Strike in time as the covenant rainbow shines over the earth.",
      keyboardHint: "Keyboard: press Space or Enter when the marker enters the promise band."
    }
  ],
  "Nations and Babel": [
    {
      id: "babel-brick-rush",
      engine: "collect",
      label: "Brick Rush",
      target: 11,
      maxMisses: 5,
      seconds: 25,
      spawnMs: 460,
      sourceRef: "Genesis 11:3",
      storyPrompt: "Gather the bricks as the builders race to raise their tower.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the bricks."
    },
    {
      id: "babel-tongue-tangle",
      engine: "timing",
      label: "Tongue Tangle",
      target: 6,
      maxMisses: 4,
      speed: 800,
      sourceRef: "Genesis 11:7",
      storyPrompt: "Strike in rhythm before the languages scatter the work.",
      keyboardHint: "Keyboard: press Space or Enter when the marker lines up with the signal."
    },
    {
      id: "babel-scatter-sprint",
      engine: "dodge",
      label: "Scatter Sprint",
      target: 17,
      spawnMs: 355,
      sourceRef: "Genesis 11:8",
      storyPrompt: "Keep moving as the nations scatter away from Babel.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to dodge the falling rubble."
    },
    {
      id: "babel-humble-tower",
      engine: "timing",
      label: "Humble the Tower",
      target: 7,
      maxMisses: 4,
      speed: 770,
      sourceRef: "Genesis 11:9",
      storyPrompt: "Stay on the beat as pride falls and God brings the tower low.",
      keyboardHint: "Keyboard: press Space or Enter when the marker reaches the gold zone."
    }
  ],
  "Burning Bush": [
    {
      id: "bush-holy-ground",
      engine: "timing",
      label: "Holy Ground",
      target: 6,
      maxMisses: 4,
      speed: 840,
      sourceRef: "Exodus 3:5",
      storyPrompt: "Step carefully on holy ground as God calls Moses from the bush.",
      keyboardHint: "Keyboard: press Space or Enter when the marker reaches the holy path."
    },
    {
      id: "bush-shepherd-gather",
      engine: "collect",
      label: "Shepherd's Gather",
      target: 10,
      maxMisses: 5,
      seconds: 25,
      spawnMs: 470,
      sourceRef: "Exodus 3:1",
      storyPrompt: "Gather the flock before the call sends Moses back to Egypt.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the flock."
    },
    {
      id: "bush-court-escape",
      engine: "dodge",
      label: "Court Escape",
      target: 17,
      spawnMs: 350,
      sourceRef: "Exodus 2:15",
      storyPrompt: "Stay ahead of danger as Moses flees toward Midian.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to avoid the pursuers."
    },
    {
      id: "bush-staff-lift",
      engine: "timing",
      label: "Staff Lift",
      target: 7,
      maxMisses: 4,
      speed: 790,
      sourceRef: "Exodus 4:2-4",
      storyPrompt: "Answer God's sign in rhythm as the staff becomes a witness.",
      keyboardHint: "Keyboard: press Space or Enter when the marker enters the sign zone."
    },
    {
      id: "bush-let-my-people-go",
      engine: "timing",
      label: "Let My People Go",
      target: 8,
      maxMisses: 4,
      speed: 760,
      sourceRef: "Exodus 5:1",
      storyPrompt: "Stand firm and deliver God's word with courage before Pharaoh.",
      keyboardHint: "Keyboard: press Space or Enter when the marker reaches the bold band."
    }
  ],
  "Plagues and Passover": [
    {
      id: "plagues-nile-turn",
      engine: "timing",
      label: "Nile Turn",
      target: 6,
      maxMisses: 4,
      speed: 840,
      sourceRef: "Exodus 7:20",
      storyPrompt: "Strike in time as the Nile turns and Egypt sees God's power.",
      keyboardHint: "Keyboard: press Space or Enter when the marker hits the judgment zone."
    },
    {
      id: "plagues-hail-escape",
      engine: "dodge",
      label: "Hail Escape",
      target: 18,
      spawnMs: 340,
      sourceRef: "Exodus 9:23-26",
      storyPrompt: "Avoid the storm as hail falls across the land of Egypt.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to dodge the hail."
    },
    {
      id: "plagues-unleavened-gather",
      engine: "collect",
      label: "Unleavened Gather",
      target: 11,
      maxMisses: 5,
      seconds: 24,
      spawnMs: 450,
      sourceRef: "Exodus 12:17",
      storyPrompt: "Gather the unleavened bread in haste before the night of deliverance.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather what is needed."
    },
    {
      id: "plagues-doorpost-mark",
      engine: "timing",
      label: "Doorpost Mark",
      target: 7,
      maxMisses: 4,
      speed: 780,
      sourceRef: "Exodus 12:7",
      storyPrompt: "Mark the doorposts in faithful rhythm for Passover night.",
      keyboardHint: "Keyboard: press Space or Enter when the marker lines up with the blood mark."
    },
    {
      id: "plagues-midnight-rush",
      engine: "collect",
      label: "Midnight Rush",
      target: 12,
      maxMisses: 6,
      seconds: 23,
      spawnMs: 420,
      sourceRef: "Exodus 12:31-33",
      storyPrompt: "Gather what you need quickly as Egypt urges Israel to depart.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the supplies."
    }
  ],
  "Sea Crossing": [
    {
      id: "sea-path-step",
      engine: "timing",
      label: "Sea Path Step",
      target: 7,
      maxMisses: 4,
      speed: 790,
      sourceRef: "Exodus 14:21-22",
      storyPrompt: "Walk in step through the path God opens in the sea.",
      keyboardHint: "Keyboard: press Space or Enter when the marker enters the dry-ground lane."
    },
    {
      id: "sea-chariot-escape",
      engine: "dodge",
      label: "Chariot Escape",
      target: 19,
      spawnMs: 330,
      sourceRef: "Exodus 14:23-25",
      storyPrompt: "Stay ahead of Pharaoh's chariots until the shore is secure.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to avoid the chariot charge."
    },
    {
      id: "sea-shoreline-rescue",
      engine: "collect",
      label: "Shoreline Rescue",
      target: 12,
      maxMisses: 5,
      seconds: 24,
      spawnMs: 430,
      sourceRef: "Exodus 14:29-31",
      storyPrompt: "Gather your people safely as Israel reaches the far shore.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the survivors."
    },
    {
      id: "sea-song-rhythm",
      engine: "timing",
      label: "Song of the Sea",
      target: 8,
      maxMisses: 4,
      speed: 750,
      sourceRef: "Exodus 15:1",
      storyPrompt: "Keep the rhythm as Moses and Miriam sing of God's victory.",
      keyboardHint: "Keyboard: press Space or Enter when the marker hits the song line."
    },
    {
      id: "sea-dry-ground-dash",
      engine: "dodge",
      label: "Dry Ground Dash",
      target: 20,
      spawnMs: 320,
      sourceRef: "Exodus 14:29",
      storyPrompt: "Keep your footing on the dry ground while the waters stand high.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to stay on the path."
    }
  ],
  "Jordan Crossing": [
    {
      id: "jordan-memorial-stones",
      engine: "collect",
      label: "Memorial Stones",
      target: 11,
      maxMisses: 5,
      seconds: 25,
      spawnMs: 450,
      sourceRef: "Joshua 4:5-7",
      storyPrompt: "Gather the memorial stones from the Jordan before the waters return.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the stones."
    },
    {
      id: "jordan-riverbed-step",
      engine: "timing",
      label: "Riverbed Step",
      target: 7,
      maxMisses: 4,
      speed: 790,
      sourceRef: "Joshua 3:17",
      storyPrompt: "Cross the riverbed in step while the ark stands firm in the Jordan.",
      keyboardHint: "Keyboard: press Space or Enter when the marker reaches the safe crossing lane."
    },
    {
      id: "jordan-ark-ahead",
      engine: "collect",
      label: "Ark Ahead",
      target: 12,
      maxMisses: 5,
      seconds: 24,
      spawnMs: 420,
      sourceRef: "Joshua 3:3-4",
      storyPrompt: "Keep your eyes on the ark and gather your line to follow it.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather behind the ark."
    },
    {
      id: "jordan-jericho-arrow-watch",
      engine: "dodge",
      label: "Jericho Arrow Watch",
      target: 19,
      spawnMs: 325,
      sourceRef: "Joshua 6:3-5",
      storyPrompt: "March around Jericho and avoid the arrows while you hold the line.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to avoid the arrows during the march."
    },
    {
      id: "jordan-trumpet-march",
      engine: "timing",
      label: "Trumpet March",
      target: 8,
      maxMisses: 4,
      speed: 750,
      sourceRef: "Joshua 6:16",
      storyPrompt: "Keep the march and shout in time as Jericho's walls begin to fall.",
      keyboardHint: "Keyboard: press Space or Enter when the marker lines up with the trumpet call."
    }
  ],
  "Land and Legacy": [
    {
      id: "legacy-covenant-stand",
      engine: "timing",
      label: "Covenant Stand",
      target: 7,
      maxMisses: 4,
      speed: 780,
      sourceRef: "Joshua 24:14-15",
      storyPrompt: "Stand firm in rhythm as Joshua calls Israel to serve the Lord.",
      keyboardHint: "Keyboard: press Space or Enter when the marker enters the covenant band."
    },
    {
      id: "legacy-ai-ambush",
      engine: "dodge",
      label: "Ai Ambush Run",
      target: 19,
      spawnMs: 330,
      sourceRef: "Joshua 8:4-7",
      storyPrompt: "Move quickly through the ambush as Joshua leads the turn at Ai.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to stay clear of the attack."
    },
    {
      id: "legacy-gibeon-defense",
      engine: "collect",
      label: "Gibeon Defense",
      target: 12,
      maxMisses: 5,
      seconds: 24,
      spawnMs: 430,
      sourceRef: "Joshua 10:6-8",
      storyPrompt: "Gather strength for the march as Joshua moves to defend Gibeon.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the needed supplies."
    },
    {
      id: "legacy-sun-stand",
      engine: "timing",
      label: "Sun-Stand Signal",
      target: 8,
      maxMisses: 4,
      speed: 740,
      sourceRef: "Joshua 10:12-14",
      storyPrompt: "Hold the line in time as God lengthens the day for Israel's victory.",
      keyboardHint: "Keyboard: press Space or Enter when the marker reaches the signal line."
    },
    {
      id: "legacy-farewell-stones",
      engine: "collect",
      label: "Farewell Stones",
      target: 13,
      maxMisses: 6,
      seconds: 23,
      spawnMs: 410,
      sourceRef: "Joshua 24:26-27",
      storyPrompt: "Gather the witness stones as Joshua seals the covenant before Israel.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the witness stones."
    }
  ],
  "David and Courage": [
    {
      id: "david-brook-stone-count",
      engine: "timing",
      label: "Brook Stone Count",
      target: 7,
      maxMisses: 4,
      speed: 780,
      sourceRef: "1 Samuel 17:40",
      storyPrompt: "Keep the rhythm as David chooses the smooth stones from the brook.",
      keyboardHint: "Keyboard: press Space or Enter when the marker reaches the stone line."
    },
    {
      id: "david-shepherd-run",
      engine: "collect",
      label: "Shepherd's Run",
      target: 12,
      maxMisses: 5,
      seconds: 24,
      spawnMs: 430,
      sourceRef: "1 Samuel 17:15-18",
      storyPrompt: "Gather the provisions David carries to the battle line.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to gather the provisions."
    },
    {
      id: "david-elah-footwork",
      engine: "dodge",
      label: "Elah Footwork",
      target: 19,
      spawnMs: 325,
      sourceRef: "1 Samuel 17:48",
      storyPrompt: "Stay light on your feet as David runs toward the giant in faith.",
      keyboardHint: "Keyboard: move with Left/Right or A/D to dodge the giant's attack."
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
      id: "david-armor-refusal",
      engine: "timing",
      label: "Armor Refusal",
      target: 8,
      maxMisses: 4,
      speed: 740,
      sourceRef: "1 Samuel 17:39",
      storyPrompt: "Move in step as David refuses Saul's armor and trusts the Lord instead.",
      keyboardHint: "Keyboard: press Space or Enter when the marker enters the trust band."
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
  { era: "patriarchs", prompt: "What new name did God give Abram?", options: ["Abraham", "Absalom", "Aaron", "Amos"], answer: "Abraham", sourceRef: "Genesis 17:5" },
  { era: "patriarchs", prompt: "Which son of Jacob was sold into Egypt?", options: ["Joseph", "Benjamin", "Levi", "Judah"], answer: "Joseph", sourceRef: "Genesis 37:28" },
  { era: "patriarchs", prompt: "Jacob was also called what?", options: ["Israel", "Ishmael", "Edom", "Judah"], answer: "Israel", sourceRef: "Genesis 32:28" },
  { era: "exodus", prompt: "Who confronted Pharaoh and led Israel out of Egypt?", options: ["Joshua", "Moses", "Aaron", "Samuel"], answer: "Moses", sourceRef: "Exodus 5:1; 12:31" },
  { era: "exodus", prompt: "What event protected Israelite homes in Egypt?", options: ["Passover", "Pentecost", "Exile", "Day of Atonement"], answer: "Passover", sourceRef: "Exodus 12:13-14" },
  { era: "exodus", prompt: "What sea did Israel cross on dry ground?", options: ["Red Sea", "Dead Sea", "Galilee", "Mediterranean Sea"], answer: "Red Sea", sourceRef: "Exodus 14:21-22" },
  { era: "sinai", prompt: "Where were the Ten Commandments given?", options: ["Mount Sinai", "Mount Carmel", "Mount Zion", "Mount Nebo"], answer: "Mount Sinai", sourceRef: "Exodus 19:20; 20:1" },
  { era: "sinai", prompt: "What did the people promise after hearing the covenant words?", options: ["We will do all the Lord has spoken", "We will return to Egypt", "We will follow Pharaoh", "We will build a new kingdom"], answer: "We will do all the Lord has spoken", sourceRef: "Exodus 24:7" },
  { era: "sinai", prompt: "What did Moses build at the foot of the mountain after writing all Yahweh's words?", options: ["An altar", "A palace", "A bronze serpent", "A city gate"], answer: "An altar", sourceRef: "Exodus 24:4" },
  { era: "wilderness", prompt: "What food did God provide daily?", options: ["Manna", "Figs", "Barley", "Dates"], answer: "Manna", sourceRef: "Exodus 16:14-15" },
  { era: "wilderness", prompt: "Who helped Moses hold up his hands in battle?", options: ["Aaron and Hur", "Joshua and Caleb", "Nadab and Abihu", "Aaron and Miriam"], answer: "Aaron and Hur", sourceRef: "Exodus 17:12" },
  { era: "conquest", prompt: "Who led Israel after Moses?", options: ["Joshua", "Saul", "David", "Aaron"], answer: "Joshua", sourceRef: "Joshua 1:1-2" },
  { era: "conquest", prompt: "How many days did Israel march around Jericho before the final shout?", options: ["7", "3", "12", "6"], answer: "7", sourceRef: "Joshua 6:3-4,15-16" },
  { era: "conquest", prompt: "What river did Israel cross into Canaan?", options: ["Jordan", "Nile", "Euphrates", "Jabbok"], answer: "Jordan", sourceRef: "Joshua 3:14-17" },
  { era: "judges", prompt: "Which judge led with 300 men?", options: ["Gideon", "Samson", "Jephthah", "Deborah"], answer: "Gideon", sourceRef: "Judges 7:7" },
  { era: "judges", prompt: "Who was a prophetess and judge?", options: ["Deborah", "Ruth", "Hannah", "Jael"], answer: "Deborah", sourceRef: "Judges 4:4" },
  { era: "judges", prompt: "Ruth stayed loyal to whom?", options: ["Naomi", "Miriam", "Abigail", "Orpah"], answer: "Naomi", sourceRef: "Ruth 1:16-17" },
  { era: "samuel", prompt: "Who heard God's call as a boy?", options: ["Samuel", "Eli", "Jonathan", "Saul"], answer: "Samuel", sourceRef: "1 Samuel 3:8-10" },
  { era: "samuel", prompt: "Where did Samuel minister before Yahweh as a youth?", options: ["Shiloh", "Jerusalem", "Bethel", "Hebron"], answer: "Shiloh", sourceRef: "1 Samuel 1:3; 3:21" },
  { era: "saul", prompt: "Who was Israel's first king?", options: ["Saul", "David", "Solomon", "Abner"], answer: "Saul", sourceRef: "1 Samuel 10:1,24" },
  { era: "saul", prompt: "Who anointed Saul?", options: ["Samuel", "Nathan", "Gad", "Eli"], answer: "Samuel", sourceRef: "1 Samuel 10:1" },
  { era: "david", prompt: "How many stones did David pick up?", options: ["5", "3", "10", "1"], answer: "5", sourceRef: "1 Samuel 17:40" },
  { era: "david", prompt: "What weapon did David use against Goliath?", options: ["Sling", "Spear", "Sword", "Bow"], answer: "Sling", sourceRef: "1 Samuel 17:49-50" }
];


const mediumQuizBank = [
  { era: "genesis", prompt: "What did God call the expanse in Genesis 1?", options: ["Sky", "Earth", "Sea", "Eden"], answer: "Sky", sourceRef: "Genesis 1:8" },
  { era: "genesis", prompt: "Who named the livestock, birds, and animals God brought to him?", options: ["Adam", "Noah", "Cain", "Seth"], answer: "Adam", sourceRef: "Genesis 2:19-20" },
  { era: "genesis", prompt: "What part of Adam did God use to make the woman?", options: ["One of his ribs", "His hand", "Dust", "His foot"], answer: "One of his ribs", sourceRef: "Genesis 2:21-22" },
  { era: "genesis", prompt: "Which tree, besides the tree of life, was in the middle of the garden?", options: ["The tree of the knowledge of good and evil", "The cedar of Lebanon", "The tamarisk", "The olive tree"], answer: "The tree of the knowledge of good and evil", sourceRef: "Genesis 2:9" },
  { era: "genesis", prompt: "What opened after Adam and Eve ate?", options: ["Their eyes", "The ark door", "The heavens", "The sea"], answer: "Their eyes", sourceRef: "Genesis 3:7" },
  { era: "genesis", prompt: "What did Adam name his wife after the fall?", options: ["Eve", "Naomi", "Sarah", "Hagar"], answer: "Eve", sourceRef: "Genesis 3:20" },
  { era: "genesis", prompt: "What bird returned to Noah with a freshly plucked olive leaf?", options: ["Dove", "Raven", "Eagle", "Sparrow"], answer: "Dove", sourceRef: "Genesis 8:11" },
  { era: "patriarchs", prompt: "What did God compare Abram's descendants to when He made His promise?", options: ["Stars", "Trees", "Rivers", "Mountains"], answer: "Stars", sourceRef: "Genesis 15:5" },
  { era: "patriarchs", prompt: "What did Jacob see in his dream reaching toward heaven?", options: ["A ladder", "A chariot", "A throne", "A rainbow"], answer: "A ladder", sourceRef: "Genesis 28:12" },
  { era: "patriarchs", prompt: "What did Joseph store during the years of plenty in Egypt?", options: ["Grain", "Gold", "Oil", "Livestock"], answer: "Grain", sourceRef: "Genesis 41:48-49" },
  { era: "exodus", prompt: "What did Moses' staff become before Pharaoh as a sign?", options: ["A serpent", "A branch", "A torch", "A plow"], answer: "A serpent", sourceRef: "Exodus 7:10" },
  { era: "exodus", prompt: "What was placed on the doorposts and lintel at Passover?", options: ["Lamb's blood", "Oil", "Water", "Ashes"], answer: "Lamb's blood", sourceRef: "Exodus 12:7" },
  { era: "exodus", prompt: "What led Israel by night after leaving Egypt?", options: ["Pillar of fire", "Morning star", "Trumpet blast", "Cloud of smoke"], answer: "Pillar of fire", sourceRef: "Exodus 13:21" },
  { era: "sinai", prompt: "What covered Mount Sinai when the Lord descended on it?", options: ["Smoke", "Snow", "Rain", "Locusts"], answer: "Smoke", sourceRef: "Exodus 19:18" },
  { era: "sinai", prompt: "Which day is commanded as holy in the Ten Commandments?", options: ["Sabbath day", "First day", "New moon", "Passover day"], answer: "Sabbath day", sourceRef: "Exodus 20:8-11" },
  { era: "sinai", prompt: "What did Moses do with the covenant blood in Exodus 24?", options: ["Sprinkled it on the people", "Poured it into the sea", "Burned it on the altar", "Stored it in jars"], answer: "Sprinkled it on the people", sourceRef: "Exodus 24:8" },
  { era: "wilderness", prompt: "What came out of the rock when Moses struck it at Horeb?", options: ["Water", "Oil", "Honey", "Fire"], answer: "Water", sourceRef: "Exodus 17:6" },
  { era: "wilderness", prompt: "What large fruit cluster did the spies bring back from Canaan?", options: ["Grapes", "Figs", "Dates", "Olives"], answer: "Grapes", sourceRef: "Numbers 13:23" },
  { era: "wilderness", prompt: "With what are you to love Yahweh your God according to Deuteronomy 6:5?", options: ["All your heart", "All your silver", "Only your words", "Only your sacrifices"], answer: "All your heart", sourceRef: "Deuteronomy 6:5" },
  { era: "conquest", prompt: "Who hid the Israelite spies in Jericho?", options: ["Rahab", "Deborah", "Naomi", "Hannah"], answer: "Rahab", sourceRef: "Joshua 2:4" },
  { era: "conquest", prompt: "What happened to the Jordan waters when the priests stepped in?", options: ["They stood up in a heap", "They turned to blood", "They dried after seven days", "They flooded the camp"], answer: "They stood up in a heap", sourceRef: "Joshua 3:13-16" },
  { era: "conquest", prompt: "What sign was Rahab told to tie in her window?", options: ["Scarlet cord", "Golden ribbon", "White cloth", "Blue thread"], answer: "Scarlet cord", sourceRef: "Joshua 2:18" },
  { era: "judges", prompt: "What weapon did Shamgar use to strike the Philistines?", options: ["Oxgoad", "Sword", "Sling", "Bow"], answer: "Oxgoad", sourceRef: "Judges 3:31" },
  { era: "judges", prompt: "What did Jael drive through Sisera while he slept?", options: ["Tent peg", "Spear", "Arrow", "Stone"], answer: "Tent peg", sourceRef: "Judges 4:21" },
  { era: "judges", prompt: "What happened to Samson after his hair was cut?", options: ["His strength left him", "He became king", "He escaped immediately", "He defeated more enemies"], answer: "His strength left him", sourceRef: "Judges 16:19-20" },
  { era: "judges", prompt: "What town did Naomi and Ruth come to at the beginning of barley harvest?", options: ["Bethlehem", "Jericho", "Hebron", "Shiloh"], answer: "Bethlehem", sourceRef: "Ruth 1:22" },
  { era: "samuel", prompt: "Who taught Samuel how to answer when the Lord called him?", options: ["Eli", "Saul", "David", "Jonathan"], answer: "Eli", sourceRef: "1 Samuel 3:8-9" },
  { era: "samuel", prompt: "What did Eli think Hannah was when he first saw her praying?", options: ["Drunk", "Singing", "Prophesying", "Sleeping"], answer: "Drunk", sourceRef: "1 Samuel 1:13-14" },
  { era: "saul", prompt: "From which tribe was Saul?", options: ["Benjamin", "Judah", "Levi", "Ephraim"], answer: "Benjamin", sourceRef: "1 Samuel 9:21" },
  { era: "saul", prompt: "What did Saul do when the Spirit of God came on him after anointing?", options: ["He prophesied", "He built an altar", "He fled to Egypt", "He wrote a psalm"], answer: "He prophesied", sourceRef: "1 Samuel 10:10-11" },
  { era: "saul", prompt: "What did Israel ask Samuel to appoint over them?", options: ["A king", "A new priest", "A judge from Judah", "A temple builder"], answer: "A king", sourceRef: "1 Samuel 8:5" },
  { era: "david", prompt: "Who anointed David as a young man?", options: ["Samuel", "Saul", "Nathan", "Eli"], answer: "Samuel", sourceRef: "1 Samuel 16:13" },
  { era: "david", prompt: "What instrument did David play to soothe Saul?", options: ["Harp", "Trumpet", "Flute", "Drum"], answer: "Harp", sourceRef: "1 Samuel 16:23" }
];

const advancedQuizBank = [
  { era: "genesis", prompt: "Before God said 'Let there be light,' how does Scripture describe the earth?", options: ["Formless and empty", "Covered with mountains", "Filled with people", "Already full of light"], answer: "Formless and empty", sourceRef: "Genesis 1:2" },
  { era: "genesis", prompt: "What was the first food God gave humanity in Genesis 1?", options: ["Seed-bearing plants and fruit trees", "Meat from every animal", "Manna from heaven", "Fish from the sea"], answer: "Seed-bearing plants and fruit trees", sourceRef: "Genesis 1:29" },
  { era: "genesis", prompt: "What name did Adam give the woman because she was taken out of man?", options: ["Woman", "Eve", "Sarah", "Helper"], answer: "Woman", sourceRef: "Genesis 2:23" },
  { era: "genesis", prompt: "What would the ground grow for Adam after the fall?", options: ["Thorns and thistles", "Cedars and olives", "Wheat and barley", "Lilies and myrrh"], answer: "Thorns and thistles", sourceRef: "Genesis 3:17-18" },
  { era: "genesis", prompt: "What did God place east of the garden to guard the way to the tree of life?", options: ["Cherubim", "Prophets", "Twelve stones", "Angelic singers"], answer: "Cherubim", sourceRef: "Genesis 3:24" },
  { era: "patriarchs", prompt: "How old was Abram when God appeared and established circumcision as covenant sign?", options: ["99", "75", "86", "120"], answer: "99", sourceRef: "Genesis 17:1,11" },
  { era: "genesis", prompt: "How many clean animals of each kind did Noah take onto the ark?", options: ["Seven pairs", "One pair", "Two pairs", "Seven total"], answer: "Seven pairs", sourceRef: "Genesis 7:2" },
  { era: "patriarchs", prompt: "What did Joseph name his firstborn son, saying God made him forget his trouble?", options: ["Manasseh", "Ephraim", "Benjamin", "Reuben"], answer: "Manasseh", sourceRef: "Genesis 41:51" },
  { era: "patriarchs", prompt: "After wrestling with the man, what new name did Jacob receive?", options: ["Israel", "Jeshurun", "Edom", "Zion"], answer: "Israel", sourceRef: "Genesis 32:28" },
  { era: "patriarchs", prompt: "What statement shows Joseph's theology about his suffering in Egypt?", options: ["You intended to harm me, but God intended it for good", "I escaped by my own strength", "My brothers were right to fear", "Egypt saved us without God"], answer: "You intended to harm me, but God intended it for good", sourceRef: "Genesis 50:20" },
  { era: "exodus", prompt: "What was the first plague sent on Egypt?", options: ["Water turned to blood", "Frogs", "Gnats", "Hail"], answer: "Water turned to blood", sourceRef: "Exodus 7:20" },
  { era: "exodus", prompt: "What specific instruction was given for applying Passover blood?", options: ["On the sides and tops of the doorframes", "On the roof only", "On every wall of the home", "On the family altar"], answer: "On the sides and tops of the doorframes", sourceRef: "Exodus 12:7" },
  { era: "exodus", prompt: "What did Israel carry out of Egypt before their dough had yeast?", options: ["Unleavened dough in kneading troughs", "Sown grain for harvest", "Only baked loaves", "Stone tablets"], answer: "Unleavened dough in kneading troughs", sourceRef: "Exodus 12:34" },
  { era: "wilderness", prompt: "How long was that unbelieving generation to bear consequences in the wilderness?", options: ["40 years", "14 years", "7 years", "70 years"], answer: "40 years", sourceRef: "Numbers 14:33-34" },
  { era: "sinai", prompt: "According to Exodus 24:1-2, who alone was to come near the Lord?", options: ["Moses alone", "Aaron", "Nadab", "All elders"], answer: "Moses alone", sourceRef: "Exodus 24:1-2" },
  { era: "sinai", prompt: "What was under the God of Israel's feet in the mountain vision?", options: ["A paved work of sapphire stone", "A sea of brass", "A cedar platform", "A bed of gold"], answer: "A paved work of sapphire stone", sourceRef: "Exodus 24:10" },
  { era: "wilderness", prompt: "What stood over the tabernacle by day during Israel's wilderness journey?", options: ["A cloud", "A rainbow", "A pillar of stone", "A curtain of fire"], answer: "A cloud", sourceRef: "Numbers 9:15-16" },
  { era: "wilderness", prompt: "According to Deuteronomy 8:3, man doesn't live by bread alone, but by what?", options: ["Everything that proceeds out of Yahweh's mouth", "Only by manna", "Only by water", "Only by sacrifice"], answer: "Everything that proceeds out of Yahweh's mouth", sourceRef: "Deuteronomy 8:3" },
  { era: "conquest", prompt: "How many priests carried trumpets before the ark around Jericho?", options: ["7", "12", "3", "40"], answer: "7", sourceRef: "Joshua 6:4" },
  { era: "conquest", prompt: "What did Joshua command the people before crossing Jordan?", options: ["Consecrate yourselves", "Build your homes", "Count your flocks", "Return to Egypt"], answer: "Consecrate yourselves", sourceRef: "Joshua 3:5" },
  { era: "conquest", prompt: "What memorial was set up after crossing the Jordan?", options: ["Twelve stones", "Bronze altar", "Golden lampstand", "Royal throne"], answer: "Twelve stones", sourceRef: "Joshua 4:20" },
  { era: "judges", prompt: "What first sign did Gideon request with the fleece?", options: ["Dew on fleece only, ground dry", "Ground wet, fleece dry", "Fire from heaven", "A rainbow"], answer: "Dew on fleece only, ground dry", sourceRef: "Judges 6:37-38" },
  { era: "judges", prompt: "In Judges' cycle, what usually happened after Israel cried out?", options: ["The Lord raised a deliverer", "They were exiled to Babylon", "The temple was rebuilt", "A prophet became king"], answer: "The Lord raised a deliverer", sourceRef: "Judges 2:18" },
  { era: "judges", prompt: "What phrase summarizes the spiritual condition in the days of Judges?", options: ["Everyone did what was right in his own eyes", "All Israel followed David", "The law was forgotten forever", "No sacrifices were offered"], answer: "Everyone did what was right in his own eyes", sourceRef: "Judges 21:25" },
  { era: "judges", prompt: "Under whose wings did Boaz say Ruth came to take refuge?", options: ["Yahweh's", "Boaz's", "Naomi's", "Bethlehem's"], answer: "Yahweh's", sourceRef: "Ruth 2:12" },
  { era: "samuel", prompt: "What did Samuel say when the Lord stood and called him again after Eli instructed him?", options: ["Speak, for your servant hears", "Here I am, send me", "I am not worthy", "Please choose another"], answer: "Speak, for your servant hears", sourceRef: "1 Samuel 3:10" },
  { era: "samuel", prompt: "What did Hannah vow regarding her son if God gave her one?", options: ["He would be given to the Lord all his life", "He would serve as king", "He would inherit Eli's house", "He would never leave home"], answer: "He would be given to the Lord all his life", sourceRef: "1 Samuel 1:11" },
  { era: "saul", prompt: "What reason did Saul give for sparing the best Amalekite animals?", options: ["To sacrifice them to the Lord", "To feed his army", "To repay the Kenites", "To sell in Gilgal"], answer: "To sacrifice them to the Lord", sourceRef: "1 Samuel 15:15" },
  { era: "saul", prompt: "What principle did Samuel declare to Saul over ritual?", options: ["To obey is better than sacrifice", "Sacrifice covers all disobedience", "Kings decide their own law", "Victory proves obedience"], answer: "To obey is better than sacrifice", sourceRef: "1 Samuel 15:22" },
  { era: "david", prompt: "For how many days did Goliath challenge Israel?", options: ["40 days", "7 days", "12 days", "70 days"], answer: "40 days", sourceRef: "1 Samuel 17:16" },
  { era: "david", prompt: "What did David say the battle belongs to?", options: ["The Lord", "Israel's army", "Saul's crown", "The strongest warrior"], answer: "The Lord", sourceRef: "1 Samuel 17:47" },
  { era: "david", prompt: "From where did David take the stones before facing Goliath?", options: ["The stream bed", "Saul's armory", "Bethlehem fields", "Priest's altar"], answer: "The stream bed", sourceRef: "1 Samuel 17:40" }
];

const spellingBank = [
  { era: "genesis", prompt: "Spell the garden God planted in the east.", answer: "Eden", sourceRef: "Genesis 2:8" },
  { era: "genesis", prompt: "Spell the first man's name.", answer: "Adam", sourceRef: "Genesis 3:17" },
  { era: "genesis", prompt: "Spell the name Adam gave the woman in Genesis 3.", answer: "Eve", sourceRef: "Genesis 3:20" },
  { era: "genesis", prompt: "Spell the name of the man who built the ark.", answer: "Noah", sourceRef: "Genesis 6:13-14" },
  { era: "genesis", prompt: "Spell the covenant sign God set in the sky after the flood.", answer: "Rainbow", sourceRef: "Genesis 9:13" },
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
  { era: "genesis", items: ["Noah obeys God", "Flood begins", "Rainbow covenant"], sourceRef: "Genesis 6:22; 7:17; 9:13" },
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
  { era: "genesis", items: ["Flood ends", "Nations spread", "Tower of Babel"], sourceRef: "Genesis 8:13; 10:32; 11:1-9" },
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
  { era: "genesis", parts: ["God", "formed", "man", "from", "dust"], sourceRef: "Genesis 2:7" },
  { era: "genesis", parts: ["The", "serpent", "deceived", "me"], sourceRef: "Genesis 3:13" },
  { era: "genesis", parts: ["Noah", "found", "favor", "in", "Yahweh's", "eyes"], sourceRef: "Genesis 6:8" },
  { era: "genesis", parts: ["God", "shut", "Noah", "in", "the", "ark"], sourceRef: "Genesis 7:16" },
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
  { era: "genesis", parts: ["It", "was", "very", "good"], sourceRef: "Genesis 1:31" },
  { era: "genesis", parts: ["God", "rested", "on", "the", "seventh", "day"], sourceRef: "Genesis 2:2-3" },
  { era: "genesis", parts: ["Yahweh", "God", "made", "garments", "of", "skin"], sourceRef: "Genesis 3:21" },
  { era: "genesis", parts: ["Only", "Noah", "was", "left", "alive"], sourceRef: "Genesis 7:23" },
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
  if (audioEngine.ctx) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
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
  if (audioEngine.ctx.state === "suspended") audioEngine.ctx.resume();

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
  if (!state.audio.music || state.activeStage || audioEngine.timer || audioEngine.finaleTimer || audioEngine.creditsTimer || isFinalOpen() || isCreditsOpen()) return;
  if (audioEngine.ctx.state === "suspended") audioEngine.ctx.resume();

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
  if (options.returnTarget !== false) {
    queueHubReturn(options.returnTarget || "storyPathHeading");
  }
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
    if (sourceRef) used.add(sourceRef);
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
    historySourceRef: question.historySourceRef || question.sourceRef
  };
}

function buildFallbackSpellingActivity(meta, theme, difficulty, usedSources) {
  const themeFilter = (item) => itemMatchesTheme(item, theme);
  const scopeKey = themeScopeKey(theme, "spelling");
  const pool = ALL_SPELLING_BANKS.concat(derivedSpellingPoolForTheme(theme));
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
    answer: pick.item.answer,
    sourceRef: pick.item.sourceRef,
    historySourceRef: pick.item.historySourceRef || pick.item.sourceRef
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
    historySourceRef: pick.item.historySourceRef || pick.item.sourceRef
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
    historySourceRef: pick.item.historySourceRef || pick.item.sourceRef
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
    historySourceRef: question.historySourceRef || question.sourceRef
  };
}

function buildMatchingActivity(meta, theme, usedSources) {
  const themeFilter = (item) => itemMatchesTheme(item, theme);
  const scopeKey = themeScopeKey(theme, "matching");
  const quizPool = ALL_QUIZ_BANKS;
  const pick = pickManyWithoutRepeat(quizPool, theme.era, "matching", 3, {
    usedSources,
    allowReuse: false,
    filter: themeFilter,
    scopeKey,
    requireScoped: true
  });
  if (!pick.items || pick.items.length < 3) return null;

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
    historySourceRef: pick.items.map((item) => item.historySourceRef || item.sourceRef).join("; ")
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
      sourceRef: q.sourceRef
    };
  }

  if (kind === "spelling") {
    const spellingSource = difficulty.id === "advanced" ? advancedSpellingBank : difficulty.id === "medium" ? mediumSpellingBank : spellingBank;
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
      answer: s.answer,
      sourceRef: s.sourceRef
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
      sourceRef: order.sourceRef
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
      sourceRef: fact.sourceRef
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
    spelling: "spelling questions",
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

  record.uses.forEach((signature) => {
    counts[signature] = (counts[signature] || 0) + 1;
  });

  const unseen = pickPool.filter((item) => !counts[itemSignature(item)]);

  let choice;
  let reuseCount = 0;

  if (unseen.length) {
    choice = unseen[Math.floor(Math.random() * unseen.length)];
  } else {
    if (!allowReuse) return { item: null, reuseCount: 0 };

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

    choice = leastUsed[Math.floor(Math.random() * leastUsed.length)];
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
      return aCount - bCount;
    });
    const picked = [];
    const seen = new Set();

    ranked.forEach((item) => {
      const signature = itemSignature(item);
      if (seen.has(signature)) return;
      seen.add(signature);
      picked.push(item);
    });

    return picked.slice(0, count);
  };

  let candidates = buildSelection(filterBySource(source));
  if (candidates.length < count && allowReuse) {
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

function derivedQuizPoolForTheme(theme) {
  return [];
}

function derivedSpellingPoolForTheme(theme) {
  return themeScopedQuizItems(theme)
    .filter((item) => /^[A-Za-zÀ-ÿ'-]+$/.test(String(item.answer || "")))
    .map((item) => ({
      era: theme.era,
      prompt: challengeCopy(
        `Type the one-word Bible answer for this clue: ${clueTextFromPrompt(item.prompt)}.`,
        `Escribe la respuesta bíblica de una sola palabra para esta pista: ${clueTextFromPrompt(item.prompt)}.`
      ),
      answer: item.answer,
      sourceRef: item.sourceRef,
      historySourceRef: item.historySourceRef || item.sourceRef
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
      historySourceRef: themeItems.slice(index, index + 3).map((item) => item.sourceRef).join("; ")
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
  if (previous) {
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
  if (audioEngine.ctx && audioEngine.ctx.state === "suspended") {
    audioEngine.ctx.resume().catch(() => {});
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
  const hint = createChallengeHint("Keyboard: type your answer and press Enter.");
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
    activityPanel.append(header, prompt, hint, source, input, submit, feedback);
  } else {
    activityPanel.append(header, prompt, hint, input, submit, feedback);
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

  if (mode.engine === "timing") {
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

document.addEventListener(
  "pointerdown",
  () => {
    ensureAudio();
    updateAudioState();
  },
  { once: true }
);

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
