(() => {
  const STORAGE_KEY = "faithEnhancementsV1";
  const SPANISH_MEDIA_ONLY_KEY = "faithSpanishMediaOnly";
  const CHECKLIST_KEYS = ["strike", "stage", "memory", "journal"];

  const I18N = {
    en: {
      heroEyebrow: "Interactive Bible Learning",
      heroMission: "Faith begins at God's Word. Build a stronger faith through deeper knowledge of God's Word. This is your goal now: accept the challenge.",
      heroSubtitle: "Journey from Genesis to David across 100 levels. Questions remix each run with skill-based challenges.",
      languageLabel: "Language",
      difficultyLabel: "Difficulty",
      storyPathHeading: "Story Path",
      badgeCollectionHeading: "Badge Collection",
      shareLatestBadgeBtn: "Share Latest Badge",
      badgeHelper: "Complete stages to earn Bible-symbol badges.",
      resetBtn: "Reset Progress",
      restoreLivesBtn: "Restore Lives",
      todayPlanHeading: "Today's Plan",
      adaptiveHeading: "Language Selection",
      applyCoachBtn: "Use Device Language",
      streakHeading: "Streak Shield",
      graceBtn: "Use Faith Day",
      memoryHeading: "Memory Verse Trainer",
      previousVerseBtn: "Previous Verse",
      revealVerseBtn: "Reveal Verse",
      hideVerseBtn: "Hide Verse",
      nextVerseBtn: "Next Verse",
      checkVerseBtn: "Check Recall",
      journalHeading: "Reflection Journal",
      saveJournalBtn: "Save Reflection",
      journalPlaceholder: "What did God teach you today, and what action will you take?",
      accessibilityHeading: "Accessibility",
      mediaHeading: "Spanish Media Pack",
      refreshMediaPackBtn: "Refresh Pack Status",
      spanishOnlyLabel: "Spanish media only (no English fallback)",
      accessibilityLargeText: "Larger text",
      accessibilityContrast: "High contrast",
      accessibilityReducedMotion: "Reduced motion",
      accessibilityReadableFont: "Readable font",
      moodLabel: "Mood",
      practicalActionLabel: "Practical action",
      guideSelectLabel: "Choose your language",
      strikeTask: "Claim daily strike",
      stageTask: "Complete one stage",
      memoryTask: "Practice one memory verse",
      journalTask: "Write one reflection",
      planComplete: "completed",
      adaptiveScore: "Device language",
      adaptiveFocus: "Current game language",
      adaptiveRecommendation: "Suggested language",
      languageEnglish: "English",
      languageSpanish: "Spanish",
      languageGerman: "German",
      languageChinese: "Chinese",
      languageVietnamese: "Vietnamese",
      languagePortuguese: "Portuguese",
      streakCurrent: "Current streak",
      streakBest: "Best streak",
      streakGrace: "Faith days",
      streakPending: "Missed yesterday. Use a Faith Day to keep your streak.",
      streakStable: "Streak is active. Keep showing up daily.",
      memoryPrompt: "Type the verse from memory:",
      memoryResult: "Accuracy",
      memoryMastered: "Great recall. Verse marked as mastered.",
      memoryTryAgain: "Good effort. Read once more and try again.",
      journalSaved: "Reflection saved.",
      journalNeedText: "Write at least 8 characters before saving.",
      mediaStatusReady: "Spanish media pack ready.",
      mediaStatusPartial: "Spanish media pack partially available.",
      mediaStatusMissing: "Spanish media pack missing files.",
      mediaCounts: "Files detected",
      moodFocused: "Focused",
      moodJoyful: "Joyful",
      moodTired: "Tired",
      moodBurdened: "Burdened",
      moodHopeful: "Hopeful",
      actionPlaceholder: "One practical action for today",
      recentReflections: "Recent reflections"
    },
    es: {
      heroEyebrow: "Aprendizaje Biblico Interactivo",
      heroMission: "La fe comienza en la Palabra de Dios. Fortalece tu fe con un conocimiento mas profundo de Su Palabra. Este es tu objetivo ahora: acepta el desafio.",
      heroSubtitle: "Viaja desde Genesis hasta David en 100 niveles. Las preguntas se mezclan en cada partida con retos por habilidad.",
      languageLabel: "Idioma",
      difficultyLabel: "Dificultad",
      storyPathHeading: "Ruta de Historia",
      badgeCollectionHeading: "Coleccion de Insignias",
      shareLatestBadgeBtn: "Compartir Ultima Insignia",
      badgeHelper: "Completa etapas para ganar insignias biblicas.",
      resetBtn: "Reiniciar Progreso",
      restoreLivesBtn: "Restaurar Vidas",
      todayPlanHeading: "Plan de Hoy",
      adaptiveHeading: "Seleccion de Idioma",
      applyCoachBtn: "Usar Idioma del Dispositivo",
      streakHeading: "Escudo de Racha",
      graceBtn: "Usar Dia de Fe",
      memoryHeading: "Entrenador de Versiculos",
      previousVerseBtn: "Versiculo Anterior",
      revealVerseBtn: "Mostrar Versiculo",
      hideVerseBtn: "Ocultar Versiculo",
      nextVerseBtn: "Siguiente Versiculo",
      checkVerseBtn: "Revisar Memoria",
      journalHeading: "Diario de Reflexion",
      saveJournalBtn: "Guardar Reflexion",
      journalPlaceholder: "Que te enseno Dios hoy y que accion vas a tomar?",
      accessibilityHeading: "Accesibilidad",
      mediaHeading: "Paquete Multimedia Espanol",
      refreshMediaPackBtn: "Actualizar Estado del Paquete",
      spanishOnlyLabel: "Solo multimedia en espanol (sin respaldo en ingles)",
      accessibilityLargeText: "Texto mas grande",
      accessibilityContrast: "Alto contraste",
      accessibilityReducedMotion: "Movimiento reducido",
      accessibilityReadableFont: "Fuente legible",
      moodLabel: "Animo",
      practicalActionLabel: "Accion practica",
      guideSelectLabel: "Elige tu idioma",
      strikeTask: "Reclamar racha diaria",
      stageTask: "Completar una etapa",
      memoryTask: "Practicar un versiculo",
      journalTask: "Escribir una reflexion",
      planComplete: "completado",
      adaptiveScore: "Idioma del dispositivo",
      adaptiveFocus: "Idioma actual del juego",
      adaptiveRecommendation: "Idioma sugerido",
      languageEnglish: "Ingles",
      languageSpanish: "Espanol",
      languageGerman: "Aleman",
      languageChinese: "Chino",
      languageVietnamese: "Vietnamita",
      languagePortuguese: "Portugues",
      streakCurrent: "Racha actual",
      streakBest: "Mejor racha",
      streakGrace: "Dias de fe",
      streakPending: "Ayer se perdio. Usa un Dia de Fe para mantener la racha.",
      streakStable: "La racha sigue activa. Persevera cada dia.",
      memoryPrompt: "Escribe el versiculo de memoria:",
      memoryResult: "Precision",
      memoryMastered: "Excelente memoria. Versiculo dominado.",
      memoryTryAgain: "Buen intento. Lee una vez mas e intenta de nuevo.",
      journalSaved: "Reflexion guardada.",
      journalNeedText: "Escribe al menos 8 caracteres antes de guardar.",
      mediaStatusReady: "Paquete multimedia en espanol listo.",
      mediaStatusPartial: "Paquete multimedia en espanol parcial.",
      mediaStatusMissing: "Faltan archivos del paquete multimedia en espanol.",
      mediaCounts: "Archivos detectados",
      moodFocused: "Enfocado",
      moodJoyful: "Alegre",
      moodTired: "Cansado",
      moodBurdened: "Cargado",
      moodHopeful: "Esperanzado",
      actionPlaceholder: "Una accion practica para hoy",
      recentReflections: "Reflexiones recientes"
    }
  };

  I18N.de = {
    ...I18N.en,
    heroEyebrow: "Interaktives Bibellernen",
    heroMission: "Glaube beginnt mit Gottes Wort. Baue einen staerkeren Glauben durch tiefere Kenntnis von Gottes Wort. Das ist jetzt dein Ziel: Nimm die Herausforderung an.",
    heroSubtitle: "Reise von 1. Mose bis David durch 100 Level. Die Fragen werden in jedem Durchlauf mit Geschicklichkeitsaufgaben neu gemischt.",
    languageLabel: "Sprache",
    difficultyLabel: "Schwierigkeit",
    storyPathHeading: "Geschichtspfad",
    badgeCollectionHeading: "Abzeichensammlung",
    shareLatestBadgeBtn: "Letztes Abzeichen teilen",
    badgeHelper: "Schliesse Stufen ab, um biblische Abzeichen zu erhalten.",
    resetBtn: "Fortschritt zuruecksetzen",
    restoreLivesBtn: "Leben wiederherstellen",
    todayPlanHeading: "Plan fuer heute",
    adaptiveHeading: "Sprachauswahl",
    applyCoachBtn: "Geraetesprache verwenden",
    streakHeading: "Schild der Serie",
    graceBtn: "Glaubenstag nutzen",
    memoryHeading: "Vers-Trainer",
    previousVerseBtn: "Vorheriger Vers",
    revealVerseBtn: "Vers anzeigen",
    hideVerseBtn: "Vers ausblenden",
    nextVerseBtn: "Naechster Vers",
    checkVerseBtn: "Erinnerung pruefen",
    journalHeading: "Reflexionsjournal",
    saveJournalBtn: "Reflexion speichern",
    journalPlaceholder: "Was hat Gott dich heute gelehrt, und welche Handlung wirst du umsetzen?",
    accessibilityHeading: "Barrierefreiheit",
    mediaHeading: "Spanisches Medienpaket",
    refreshMediaPackBtn: "Paketstatus aktualisieren",
    spanishOnlyLabel: "Nur spanische Medien (ohne englischen Rueckfall)",
    accessibilityLargeText: "Groesserer Text",
    accessibilityContrast: "Hoher Kontrast",
    accessibilityReducedMotion: "Weniger Bewegung",
    accessibilityReadableFont: "Gut lesbare Schrift",
    moodLabel: "Stimmung",
    practicalActionLabel: "Praktische Handlung",
    guideSelectLabel: "Waehle deine Sprache",
    strikeTask: "Tagesserie beanspruchen",
    stageTask: "Eine Stufe abschliessen",
    memoryTask: "Einen Vers ueben",
    journalTask: "Eine Reflexion schreiben",
    planComplete: "abgeschlossen",
    adaptiveScore: "Geraetesprache",
    adaptiveFocus: "Aktuelle Spielsprache",
    adaptiveRecommendation: "Empfohlene Sprache",
    languageEnglish: "Englisch",
    languageSpanish: "Spanisch",
    languageGerman: "Deutsch",
    languageChinese: "Chinesisch",
    languageVietnamese: "Vietnamesisch",
    languagePortuguese: "Portugiesisch",
    streakCurrent: "Aktuelle Serie",
    streakBest: "Beste Serie",
    streakGrace: "Glaubenstage",
    streakPending: "Gestern wurde verpasst. Nutze einen Glaubenstag, um deine Serie zu behalten.",
    streakStable: "Die Serie ist aktiv. Bleib taeglich dran.",
    memoryPrompt: "Schreibe den Vers aus dem Gedaechtnis:",
    memoryResult: "Trefferquote",
    memoryMastered: "Starke Erinnerung. Vers als gemeistert markiert.",
    memoryTryAgain: "Guter Versuch. Lies noch einmal und versuche es erneut.",
    journalSaved: "Reflexion gespeichert.",
    journalNeedText: "Schreibe mindestens 8 Zeichen, bevor du speicherst.",
    mediaStatusReady: "Spanisches Medienpaket bereit.",
    mediaStatusPartial: "Spanisches Medienpaket teilweise verfuegbar.",
    mediaStatusMissing: "Dateien des spanischen Medienpakets fehlen.",
    mediaCounts: "Gefundene Dateien",
    moodFocused: "Fokussiert",
    moodJoyful: "Freudig",
    moodTired: "Muede",
    moodBurdened: "Belastet",
    moodHopeful: "Voller Hoffnung",
    actionPlaceholder: "Eine praktische Handlung fuer heute",
    recentReflections: "Letzte Reflexionen"
  };

  I18N.zh = {
    ...I18N.en,
    heroEyebrow: "互动圣经学习",
    heroMission: "信心始于神的话语。借着更深认识神的话语，建立更坚固的信心。你现在的目标就是：接受挑战。",
    heroSubtitle: "从创世记到大卫，共走过100个关卡。每次游玩都会把问题与技巧挑战重新组合。",
    languageLabel: "语言",
    difficultyLabel: "难度",
    storyPathHeading: "故事路径",
    badgeCollectionHeading: "徽章收藏",
    shareLatestBadgeBtn: "分享最新徽章",
    badgeHelper: "完成关卡即可获得圣经主题徽章。",
    resetBtn: "重置进度",
    restoreLivesBtn: "恢复生命",
    todayPlanHeading: "今日计划",
    adaptiveHeading: "语言选择",
    applyCoachBtn: "使用设备语言",
    streakHeading: "连胜盾牌",
    graceBtn: "使用信心日",
    memoryHeading: "经文记忆训练",
    previousVerseBtn: "上一节经文",
    revealVerseBtn: "显示经文",
    hideVerseBtn: "隐藏经文",
    nextVerseBtn: "下一节经文",
    checkVerseBtn: "检查记忆",
    journalHeading: "反思日志",
    saveJournalBtn: "保存反思",
    journalPlaceholder: "今天神教导了你什么？你会采取什么行动？",
    accessibilityHeading: "辅助功能",
    mediaHeading: "西班牙语媒体包",
    refreshMediaPackBtn: "刷新媒体包状态",
    spanishOnlyLabel: "仅西班牙语媒体（无英文后备）",
    accessibilityLargeText: "更大文字",
    accessibilityContrast: "高对比度",
    accessibilityReducedMotion: "减少动画",
    accessibilityReadableFont: "易读字体",
    moodLabel: "心情",
    practicalActionLabel: "实际行动",
    guideSelectLabel: "选择你的语言",
    strikeTask: "领取每日连胜",
    stageTask: "完成一个关卡",
    memoryTask: "练习一节经文",
    journalTask: "写下一篇反思",
    planComplete: "已完成",
    adaptiveScore: "设备语言",
    adaptiveFocus: "当前游戏语言",
    adaptiveRecommendation: "推荐语言",
    languageEnglish: "英语",
    languageSpanish: "西班牙语",
    languageGerman: "德语",
    languageChinese: "中文",
    languageVietnamese: "越南语",
    languagePortuguese: "葡萄牙语",
    streakCurrent: "当前连胜",
    streakBest: "最佳连胜",
    streakGrace: "信心日",
    streakPending: "你昨天错过了。使用一个信心日来保持连胜。",
    streakStable: "连胜仍在继续。每天都坚持出现。",
    memoryPrompt: "凭记忆输入这节经文：",
    memoryResult: "准确率",
    memoryMastered: "记忆很好。这节经文已标记为掌握。",
    memoryTryAgain: "做得不错。再读一遍，然后再试一次。",
    journalSaved: "反思已保存。",
    journalNeedText: "保存前请至少输入8个字符。",
    mediaStatusReady: "西班牙语媒体包已就绪。",
    mediaStatusPartial: "西班牙语媒体包部分可用。",
    mediaStatusMissing: "西班牙语媒体包文件缺失。",
    mediaCounts: "已检测文件",
    moodFocused: "专注",
    moodJoyful: "喜乐",
    moodTired: "疲倦",
    moodBurdened: "沉重",
    moodHopeful: "有盼望",
    actionPlaceholder: "今天的一项实际行动",
    recentReflections: "最近的反思"
  };

  I18N.vi = {
    ...I18N.en,
    heroEyebrow: "Hoc Kinh Thanh Tuong Tac",
    heroMission: "Duc tin bat dau tu Loi Duc Chua Troi. Hay xay dung duc tin vung manh hon qua su hieu biet sau hon ve Loi Ngai. Muc tieu cua ban bay gio la: chap nhan thu thach.",
    heroSubtitle: "Dong hanh tu Sang The Ky den David qua 100 cap do. Cac cau hoi duoc tron lai trong moi lan choi cung voi cac thu thach ky nang.",
    languageLabel: "Ngon ngu",
    difficultyLabel: "Do kho",
    storyPathHeading: "Hanh trinh cau chuyen",
    badgeCollectionHeading: "Bo suu tap huy hieu",
    shareLatestBadgeBtn: "Chia se huy hieu moi nhat",
    badgeHelper: "Hoan thanh cac chang de nhan huy hieu bieu tuong Kinh Thanh.",
    resetBtn: "Dat lai tien trinh",
    restoreLivesBtn: "Khoi phuc mang",
    todayPlanHeading: "Ke hoach hom nay",
    adaptiveHeading: "Lua chon ngon ngu",
    applyCoachBtn: "Dung ngon ngu thiet bi",
    streakHeading: "Khien chuoi ngay",
    graceBtn: "Dung Ngay Duc Tin",
    memoryHeading: "Luyen nho cau Kinh Thanh",
    previousVerseBtn: "Cau truoc",
    revealVerseBtn: "Hien cau Kinh Thanh",
    hideVerseBtn: "An cau Kinh Thanh",
    nextVerseBtn: "Cau tiep theo",
    checkVerseBtn: "Kiem tra ghi nho",
    journalHeading: "Nhat ky suy ngam",
    saveJournalBtn: "Luu suy ngam",
    journalPlaceholder: "Hom nay Duc Chua Troi day ban dieu gi, va ban se thuc hien hanh dong nao?",
    accessibilityHeading: "Tro nang",
    mediaHeading: "Goi truyen thong tieng Tay Ban Nha",
    refreshMediaPackBtn: "Lam moi trang thai goi",
    spanishOnlyLabel: "Chi dung truyen thong tieng Tay Ban Nha (khong co tieng Anh du phong)",
    accessibilityLargeText: "Chu lon hon",
    accessibilityContrast: "Tuong phan cao",
    accessibilityReducedMotion: "Giam chuyen dong",
    accessibilityReadableFont: "Phong chu de doc",
    moodLabel: "Tam trang",
    practicalActionLabel: "Hanh dong thuc te",
    guideSelectLabel: "Chon ngon ngu cua ban",
    strikeTask: "Nhan chuoi ngay hang ngay",
    stageTask: "Hoan thanh mot chang",
    memoryTask: "Luyen mot cau Kinh Thanh",
    journalTask: "Viet mot suy ngam",
    planComplete: "da hoan thanh",
    adaptiveScore: "Ngon ngu thiet bi",
    adaptiveFocus: "Ngon ngu hien tai cua tro choi",
    adaptiveRecommendation: "Ngon ngu de nghi",
    languageEnglish: "Tieng Anh",
    languageSpanish: "Tieng Tay Ban Nha",
    languageGerman: "Tieng Duc",
    languageChinese: "Tieng Trung",
    languageVietnamese: "Tieng Viet",
    languagePortuguese: "Tieng Bo Dao Nha",
    streakCurrent: "Chuoi hien tai",
    streakBest: "Chuoi tot nhat",
    streakGrace: "Ngay Duc Tin",
    streakPending: "Ban da bo lo hom qua. Hay dung mot Ngay Duc Tin de giu chuoi ngay.",
    streakStable: "Chuoi ngay van dang tiep tuc. Hay kien tri moi ngay.",
    memoryPrompt: "Hay go cau Kinh Thanh tu tri nho:",
    memoryResult: "Do chinh xac",
    memoryMastered: "Ghi nho rat tot. Cau Kinh Thanh da duoc danh dau da thuoc.",
    memoryTryAgain: "Co gang tot. Hay doc lai mot lan nua va thu lai.",
    journalSaved: "Da luu suy ngam.",
    journalNeedText: "Hay viet it nhat 8 ky tu truoc khi luu.",
    mediaStatusReady: "Goi truyen thong tieng Tay Ban Nha da san sang.",
    mediaStatusPartial: "Goi truyen thong tieng Tay Ban Nha moi co mot phan.",
    mediaStatusMissing: "Con thieu tep trong goi truyen thong tieng Tay Ban Nha.",
    mediaCounts: "So tep da phat hien",
    moodFocused: "Tap trung",
    moodJoyful: "Vui mung",
    moodTired: "Met moi",
    moodBurdened: "Nang long",
    moodHopeful: "Day hy vong",
    actionPlaceholder: "Mot hanh dong thuc te cho hom nay",
    recentReflections: "Nhung suy ngam gan day"
  };

  I18N.pt = {
    ...I18N.en,
    heroEyebrow: "Aprendizagem Biblica Interativa",
    heroMission: "A fe comeca na Palavra de Deus. Construa uma fe mais forte por meio de um conhecimento mais profundo da Palavra. Este e o seu objetivo agora: aceite o desafio.",
    heroSubtitle: "Viaje de Genesis a Davi por 100 niveis. As perguntas se misturam em cada partida com desafios de habilidade.",
    languageLabel: "Idioma",
    difficultyLabel: "Dificuldade",
    storyPathHeading: "Caminho da Historia",
    badgeCollectionHeading: "Colecao de Insignias",
    shareLatestBadgeBtn: "Compartilhar ultima insignia",
    badgeHelper: "Complete etapas para ganhar insignias com simbolos biblicos.",
    resetBtn: "Redefinir progresso",
    restoreLivesBtn: "Restaurar vidas",
    todayPlanHeading: "Plano de hoje",
    adaptiveHeading: "Selecao de idioma",
    applyCoachBtn: "Usar idioma do dispositivo",
    streakHeading: "Escudo da sequencia",
    graceBtn: "Usar Dia da Fe",
    memoryHeading: "Treinador de versiculos",
    previousVerseBtn: "Versiculo anterior",
    revealVerseBtn: "Mostrar versiculo",
    hideVerseBtn: "Ocultar versiculo",
    nextVerseBtn: "Proximo versiculo",
    checkVerseBtn: "Verificar memorizacao",
    journalHeading: "Diario de reflexao",
    saveJournalBtn: "Salvar reflexao",
    journalPlaceholder: "O que Deus lhe ensinou hoje, e que acao voce vai tomar?",
    accessibilityHeading: "Acessibilidade",
    mediaHeading: "Pacote de Midia em Espanhol",
    refreshMediaPackBtn: "Atualizar status do pacote",
    spanishOnlyLabel: "Somente midia em espanhol (sem apoio em ingles)",
    accessibilityLargeText: "Texto maior",
    accessibilityContrast: "Alto contraste",
    accessibilityReducedMotion: "Movimento reduzido",
    accessibilityReadableFont: "Fonte legivel",
    moodLabel: "Humor",
    practicalActionLabel: "Acao pratica",
    guideSelectLabel: "Escolha seu idioma",
    strikeTask: "Receber sequencia diaria",
    stageTask: "Completar uma etapa",
    memoryTask: "Praticar um versiculo",
    journalTask: "Escrever uma reflexao",
    planComplete: "concluido",
    adaptiveScore: "Idioma do dispositivo",
    adaptiveFocus: "Idioma atual do jogo",
    adaptiveRecommendation: "Idioma sugerido",
    languageEnglish: "Ingles",
    languageSpanish: "Espanhol",
    languageGerman: "Alemao",
    languageChinese: "Chines",
    languageVietnamese: "Vietnamita",
    languagePortuguese: "Portugues",
    streakCurrent: "Sequencia atual",
    streakBest: "Melhor sequencia",
    streakGrace: "Dias da Fe",
    streakPending: "Voce perdeu ontem. Use um Dia da Fe para manter sua sequencia.",
    streakStable: "A sequencia esta ativa. Continue firme todos os dias.",
    memoryPrompt: "Digite o versiculo de memoria:",
    memoryResult: "Precisao",
    memoryMastered: "Otima lembranca. Versiculo marcado como dominado.",
    memoryTryAgain: "Bom esforco. Leia mais uma vez e tente de novo.",
    journalSaved: "Reflexao salva.",
    journalNeedText: "Escreva pelo menos 8 caracteres antes de salvar.",
    mediaStatusReady: "Pacote de midia em espanhol pronto.",
    mediaStatusPartial: "Pacote de midia em espanhol parcialmente disponivel.",
    mediaStatusMissing: "Faltam arquivos do pacote de midia em espanhol.",
    mediaCounts: "Arquivos detectados",
    moodFocused: "Focado",
    moodJoyful: "Alegre",
    moodTired: "Cansado",
    moodBurdened: "Sobrecarregado",
    moodHopeful: "Esperancoso",
    actionPlaceholder: "Uma acao pratica para hoje",
    recentReflections: "Reflexoes recentes"
  };

  const MEMORY_VERSES = {
    en: [
      { ref: "Romans 10:17 (WEB)", text: "So faith comes by hearing, and hearing by the word of God." },
      { ref: "Joshua 1:9 (WEB)", text: "Be strong and courageous. Don't be afraid, because Yahweh your God is with you wherever you go." },
      { ref: "Psalm 119:105 (WEB)", text: "Your word is a lamp to my feet, and a light for my path." },
      { ref: "James 1:22 (WEB)", text: "But be doers of the word, and not only hearers, deluding your own selves." },
      { ref: "1 Samuel 17:47 (WEB)", text: "The battle is Yahweh's, and he will give you into our hand." }
    ],
    es: [
      { ref: "Romanos 10:17 (WEB)", text: "Asi que la fe viene por el oir, y el oir por la palabra de Dios." },
      { ref: "Josue 1:9 (WEB)", text: "Se fuerte y valiente; no tengas miedo, porque el Senor tu Dios estara contigo dondequiera que vayas." },
      { ref: "Salmo 119:105 (WEB)", text: "Lampara es a mis pies tu palabra, y lumbrera a mi camino." },
      { ref: "Santiago 1:22 (WEB)", text: "Sean hacedores de la palabra, y no solamente oidores." },
      { ref: "1 Samuel 17:47 (WEB)", text: "La batalla es del Senor, y el los entregara en nuestras manos." }
    ],
    de: [
      { ref: "Roemer 10:17 (WEB)", text: "Der Glaube kommt aus dem Hoeren, und das Hoeren durch das Wort Gottes." },
      { ref: "Josua 1:9 (WEB)", text: "Sei stark und mutig. Fuerchte dich nicht, denn der HERR, dein Gott, ist mit dir, wohin du auch gehst." },
      { ref: "Psalm 119:105 (WEB)", text: "Dein Wort ist meines Fusses Leuchte und ein Licht auf meinem Weg." },
      { ref: "Jakobus 1:22 (WEB)", text: "Seid aber Taeter des Wortes und nicht nur Hoerer." },
      { ref: "1 Samuel 17:47 (WEB)", text: "Der Kampf gehoert dem HERRN, und er wird euch in unsere Hand geben." }
    ],
    zh: [
      { ref: "罗马书 10:17 (WEB)", text: "可见信道是从听道来的，听道是从神的话来的。" },
      { ref: "约书亚记 1:9 (WEB)", text: "你当刚强壮胆，不要惧怕，因为耶和华你的神必与你同在。" },
      { ref: "诗篇 119:105 (WEB)", text: "你的话是我脚前的灯，是我路上的光。" },
      { ref: "雅各书 1:22 (WEB)", text: "只是你们要行道，不要单单听道。" },
      { ref: "撒母耳记上 17:47 (WEB)", text: "争战的胜败在乎耶和华，他必将你们交在我们手里。" }
    ],
    vi: [
      { ref: "Ro-ma 10:17 (WEB)", text: "Duc tin den boi su nghe, va su nghe den boi loi Duc Chua Troi." },
      { ref: "Gio-su-e 1:9 (WEB)", text: "Hay manh me va can dam, dung so hai, vi Gie-ho-va Duc Chua Troi nguoi o cung nguoi bat cu noi nao nguoi di." },
      { ref: "Thi Thien 119:105 (WEB)", text: "Loi Chua la ngon den cho chan toi, va la anh sang cho duong loi toi." },
      { ref: "Gia-co 1:22 (WEB)", text: "Hay lam theo loi Chua, dung chi nghe ma thoi." },
      { ref: "1 Sa-mu-en 17:47 (WEB)", text: "Tran chien thuoc ve Duc Gie-ho-va, va Ngai se trao cac nguoi vao tay chung ta." }
    ],
    pt: [
      { ref: "Romanos 10:17 (WEB)", text: "Assim, a fe vem pelo ouvir, e o ouvir pela palavra de Deus." },
      { ref: "Josue 1:9 (WEB)", text: "Seja forte e corajoso. Nao tenha medo, porque o Senhor, seu Deus, esta com voce por onde quer que voce for." },
      { ref: "Salmo 119:105 (WEB)", text: "A tua palavra e lampada para os meus pes, e luz para o meu caminho." },
      { ref: "Tiago 1:22 (WEB)", text: "Sejam praticantes da palavra, e nao somente ouvintes." },
      { ref: "1 Samuel 17:47 (WEB)", text: "A batalha pertence ao Senhor, e ele entregara voces em nossas maos." }
    ]
  };
  const MEMORY_LANGS = Object.keys(MEMORY_VERSES);

  const SPANISH_MEDIA_TARGETS = {
    video: [
      "./assets/cutscenes/es/genesis.mp4",
      "./assets/cutscenes/es/patriarchs.mp4",
      "./assets/cutscenes/es/exodus.mp4",
      "./assets/cutscenes/es/wilderness.mp4",
      "./assets/cutscenes/es/conquest.mp4",
      "./assets/cutscenes/es/judges.mp4",
      "./assets/cutscenes/es/samuel.mp4",
      "./assets/cutscenes/es/saul.mp4",
      "./assets/cutscenes/es/david.mp4",
      "./assets/cutscenes/es/generic.mp4"
    ],
    audio: [
      "./assets/cutscenes/es/genesis.m4a",
      "./assets/cutscenes/es/patriarchs.m4a",
      "./assets/cutscenes/es/exodus.m4a",
      "./assets/cutscenes/es/wilderness.m4a",
      "./assets/cutscenes/es/conquest.m4a",
      "./assets/cutscenes/es/judges.m4a",
      "./assets/cutscenes/es/samuel.m4a",
      "./assets/cutscenes/es/saul.m4a",
      "./assets/cutscenes/es/david.m4a",
      "./assets/cutscenes/es/generic.m4a"
    ]
  };

  const DEFAULT_STATE = {
    dailyPlan: {
      date: "",
      items: { strike: false, stage: false, memory: false, journal: false }
    },
    adaptive: {
      wins: 0,
      fails: 0,
      byType: {}
    },
    streak: {
      current: 0,
      best: 0,
      lastActiveDay: "",
      pendingMissDay: "",
      graceTokens: 1,
      graceAppliedForDay: "",
      milestoneAwards: []
    },
    memory: {
      verseIndexByLang: MEMORY_LANGS.reduce((acc, code) => {
        acc[code] = 0;
        return acc;
      }, {}),
      dailyVerseIndexByLang: MEMORY_LANGS.reduce((acc, code) => {
        acc[code] = 0;
        return acc;
      }, {}),
      dailyVerseDayByLang: MEMORY_LANGS.reduce((acc, code) => {
        acc[code] = "";
        return acc;
      }, {}),
      revealed: false,
      lastScore: 0,
      masteredByRef: {},
      lastPracticeDay: ""
    },
    journal: {
      entries: []
    },
    accessibility: {
      largeText: false,
      highContrast: false,
      reducedMotion: false,
      readableFont: false
    },
    media: {
      videoFound: 0,
      audioFound: 0,
      videoTotal: SPANISH_MEDIA_TARGETS.video.length,
      audioTotal: SPANISH_MEDIA_TARGETS.audio.length,
      lastProbeAt: 0
    }
  };

  function safeJsonParse(raw, fallback) {
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function deepMerge(target, source) {
    const out = Array.isArray(target) ? target.slice() : { ...target };
    Object.keys(source || {}).forEach((key) => {
      const value = source[key];
      if (Array.isArray(value)) {
        out[key] = value.slice();
      } else if (value && typeof value === "object") {
        const base = out[key] && typeof out[key] === "object" ? out[key] : {};
        out[key] = deepMerge(base, value);
      } else {
        out[key] = value;
      }
    });
    return out;
  }

  function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return deepMerge(DEFAULT_STATE, {});
    return deepMerge(DEFAULT_STATE, safeJsonParse(raw, {}));
  }

  let state = loadState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function localDayKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function dayStartFromKey(key) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(key || ""))) return null;
    const [y, m, d] = String(key).split("-").map(Number);
    return new Date(y, m - 1, d).getTime();
  }

  function dayDiff(fromKey, toKey) {
    const from = dayStartFromKey(fromKey);
    const to = dayStartFromKey(toKey);
    if (!from || !to) return 0;
    return Math.round((to - from) / 86400000);
  }

  function addDayKey(key, deltaDays) {
    const start = dayStartFromKey(key);
    if (!start) return "";
    return localDayKey(new Date(start + deltaDays * 86400000));
  }

  function language() {
    const value = String(localStorage.getItem("faithLanguage") || "en").toLowerCase();
    const supported = ["en", "es", "de", "zh", "vi", "pt"];
    return supported.includes(value) ? value : "en";
  }

  function t(key) {
    const lang = language();
    return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  }

  function dom(id) {
    return document.getElementById(id);
  }

  function coreSnapshot() {
    const completed = safeJsonParse(localStorage.getItem("faithCompleted") || "[]", []);
    const dailyStrike = safeJsonParse(localStorage.getItem("faithDailyStrike") || "{}", {});
    return {
      completedCount: Array.isArray(completed) ? completed.length : 0,
      lives: Number(localStorage.getItem("faithLives") || 5),
      lastStrike: String(dailyStrike.lastClaimed || ""),
      language: language()
    };
  }

  let snapshot = coreSnapshot();

  function normalizeChecklist() {
    const today = localDayKey();
    if (!state.dailyPlan || typeof state.dailyPlan !== "object") {
      state.dailyPlan = { date: today, items: { strike: false, stage: false, memory: false, journal: false } };
    }
    if (state.dailyPlan.date !== today) {
      state.dailyPlan.date = today;
      state.dailyPlan.items = { strike: false, stage: false, memory: false, journal: false };
    }
    CHECKLIST_KEYS.forEach((key) => {
      if (typeof state.dailyPlan.items[key] !== "boolean") state.dailyPlan.items[key] = false;
    });
  }

  function normalizeStreakPending() {
    const today = localDayKey();
    const last = state.streak.lastActiveDay;
    if (!last) return;
    const gap = dayDiff(last, today);
    if (gap > 2) {
      state.streak.current = 0;
      state.streak.pendingMissDay = "";
      state.streak.graceAppliedForDay = "";
      return;
    }
    if (gap === 2) {
      if (!state.streak.pendingMissDay) state.streak.pendingMissDay = addDayKey(last, 1);
      return;
    }
    if (gap <= 1) {
      state.streak.pendingMissDay = "";
      if (gap === 1) state.streak.graceAppliedForDay = "";
    }
  }

  function markPlanItemDone(key) {
    normalizeChecklist();
    if (!Object.prototype.hasOwnProperty.call(state.dailyPlan.items, key)) return;
    state.dailyPlan.items[key] = true;
  }

  function awardGraceTokenIfNeeded() {
    const current = Number(state.streak.current || 0);
    if (!current || current % 7 !== 0) return;
    if (!Array.isArray(state.streak.milestoneAwards)) state.streak.milestoneAwards = [];
    if (state.streak.milestoneAwards.includes(current)) return;
    state.streak.milestoneAwards.push(current);
    state.streak.graceTokens = Number(state.streak.graceTokens || 0) + 1;
  }

  function recordEngagement() {
    normalizeChecklist();
    normalizeStreakPending();

    const today = localDayKey();
    const last = state.streak.lastActiveDay;
    if (last === today) {
      saveState();
      renderAll();
      return;
    }

    const gap = last ? dayDiff(last, today) : 0;

    if (!last) {
      state.streak.current = 1;
    } else if (gap === 1) {
      state.streak.current = Number(state.streak.current || 0) + 1;
    } else if (gap === 2 && state.streak.pendingMissDay) {
      if (state.streak.graceAppliedForDay === today) {
        state.streak.current = Number(state.streak.current || 0) + 1;
      } else {
        state.streak.current = 1;
      }
    } else {
      state.streak.current = 1;
    }

    state.streak.lastActiveDay = today;
    state.streak.pendingMissDay = "";
    state.streak.best = Math.max(Number(state.streak.best || 0), Number(state.streak.current || 0));
    awardGraceTokenIfNeeded();

    saveState();
    renderAll();
  }

  function deviceLanguagePreference() {
    const candidates = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];
    const ordered = ["es", "en"];
    for (const wanted of ordered) {
      const found = candidates.some((code) => String(code || "").toLowerCase().startsWith(wanted));
      if (found) return wanted;
    }
    return "en";
  }

  function languageLabelFor(code) {
    const labels = {
      en: t("languageEnglish"),
      es: t("languageSpanish")
    };
    return labels[code] || labels.en;
  }

  function scoreRecommendation() {
    const device = deviceLanguagePreference();
    const current = language();
    const recommendation = device;
    return { device, current, recommendation };
  }

  function tokenize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, " ")
      .split(/\s+/)
      .filter(Boolean);
  }

  function memoryDayOrdinal(dayKey = localDayKey()) {
    const start = dayStartFromKey(dayKey);
    return start ? Math.floor(start / 86400000) : 0;
  }

  function syncDailyMemoryVerse(lang, pool) {
    if (!lang || !Array.isArray(pool) || !pool.length) return false;

    const today = localDayKey();
    const lastDay = String((state.memory.dailyVerseDayByLang && state.memory.dailyVerseDayByLang[lang]) || "");
    if (lastDay === today) return false;

    const previousDailyIndex = Number((state.memory.dailyVerseIndexByLang && state.memory.dailyVerseIndexByLang[lang]) || -1);
    let nextIndex = pool.length > 1 ? Math.abs(memoryDayOrdinal(today)) % pool.length : 0;
    if (pool.length > 1 && nextIndex === previousDailyIndex) {
      nextIndex = (nextIndex + 1) % pool.length;
    }

    state.memory.dailyVerseDayByLang[lang] = today;
    state.memory.dailyVerseIndexByLang[lang] = nextIndex;
    state.memory.verseIndexByLang[lang] = nextIndex;
    state.memory.revealed = false;
    state.memory.lastScore = 0;
    saveState();
    return true;
  }

  function verseForCurrentLanguage() {
    const lang = language();
    const pool = MEMORY_VERSES[lang] || MEMORY_VERSES.en;
    syncDailyMemoryVerse(lang, pool);
    const index = Number(state.memory.verseIndexByLang[lang] || 0);
    return {
      lang,
      pool,
      index: ((index % pool.length) + pool.length) % pool.length,
      verse: pool[((index % pool.length) + pool.length) % pool.length]
    };
  }

function memoryScore(expected, typed) {
  const answer = tokenize(expected);
  const attempt = tokenize(typed);
  if (!answer.length || !attempt.length) return 0;

  const remaining = new Map();
  answer.forEach((word) => {
    remaining.set(word, (remaining.get(word) || 0) + 1);
  });

  let matches = 0;
  attempt.forEach((word) => {
    const count = Number(remaining.get(word) || 0);
    if (count > 0) {
      matches += 1;
      remaining.set(word, count - 1);
    }
  });

  return Math.round((matches / answer.length) * 100);
}

  function applyAccessibility() {
    const root = document.body;
    root.classList.toggle("a11y-large-text", Boolean(state.accessibility.largeText));
    root.classList.toggle("a11y-high-contrast", Boolean(state.accessibility.highContrast));
    root.classList.toggle("a11y-reduced-motion", Boolean(state.accessibility.reducedMotion));
    root.classList.toggle("a11y-readable-font", Boolean(state.accessibility.readableFont));
  }

  function probeSource(src, kind) {
    return new Promise((resolve) => {
      const media = kind === "audio" ? new Audio() : document.createElement("video");
      let done = false;
      const timeout = window.setTimeout(() => {
        if (done) return;
        done = true;
        cleanup();
        resolve(false);
      }, 2800);

      const cleanup = () => {
        window.clearTimeout(timeout);
        media.onerror = null;
        media.onloadedmetadata = null;
      };

      media.onloadedmetadata = () => {
        if (done) return;
        done = true;
        cleanup();
        resolve(true);
      };

      media.onerror = () => {
        if (done) return;
        done = true;
        cleanup();
        resolve(false);
      };

      media.preload = "metadata";
      media.src = src;
      try {
        media.load();
      } catch (_) {
        cleanup();
        resolve(false);
      }
    });
  }

  async function refreshMediaPackStatus() {
    const status = dom("mediaPackStatusText");
    const counts = dom("mediaPackCountsText");
    if (status) status.textContent = "...";

    let videoFound = 0;
    for (const src of SPANISH_MEDIA_TARGETS.video) {
      if (await probeSource(src, "video")) videoFound += 1;
    }

    let audioFound = 0;
    for (const src of SPANISH_MEDIA_TARGETS.audio) {
      if (await probeSource(src, "audio")) audioFound += 1;
    }

    state.media.videoFound = videoFound;
    state.media.audioFound = audioFound;
    state.media.videoTotal = SPANISH_MEDIA_TARGETS.video.length;
    state.media.audioTotal = SPANISH_MEDIA_TARGETS.audio.length;
    state.media.lastProbeAt = Date.now();
    saveState();
    renderMediaPack();
  }

  function applyLocalization() {
    const map = {
      heroEyebrow: "heroEyebrow",
      heroMission: "heroMission",
      heroSubtitle: "heroSubtitle",
      languageLabel: "languageLabel",
      difficultyLabel: "difficultyLabel",
      storyPathHeading: "storyPathHeading",
      badgeCollectionHeading: "badgeCollectionHeading",
      shareLatestBadgeBtn: "shareLatestBadgeBtn",
      badgeHelper: "badgeHelper",
      resetBtn: "resetBtn",
      restoreLivesBtn: "restoreLivesBtn",
      todayPlanHeading: "todayPlanHeading",
      adaptiveHeading: "adaptiveHeading",
      applyCoachBtn: "applyCoachBtn",
      streakHeading: "streakHeading",
      graceDayBtn: "graceBtn",
      memoryHeading: "memoryHeading",
      previousVerseBtn: "previousVerseBtn",
      revealVerseBtn: "revealVerseBtn",
      nextVerseBtn: "nextVerseBtn",
      checkVerseBtn: "checkVerseBtn",
      journalHeading: "journalHeading",
      saveJournalBtn: "saveJournalBtn",
      accessibilityHeading: "accessibilityHeading",
      accessibilityLargeText: "accessibilityLargeText",
      accessibilityContrast: "accessibilityContrast",
      accessibilityReducedMotion: "accessibilityReducedMotion",
      accessibilityReadableFont: "accessibilityReadableFont",
      moodLabel: "moodLabel",
      practicalActionLabel: "practicalActionLabel",
      guideSelectLabel: "guideSelectLabel",
      memoryPromptLabel: "memoryPrompt",
      recentReflectionsHeading: "recentReflections"
    };

    Object.entries(map).forEach(([id, key]) => {
      const el = dom(id);
      if (el) el.textContent = t(key);
    });

    const moodSelect = dom("journalMoodSelect");
    if (moodSelect) {
      const labels = {
        focused: t("moodFocused"),
        joyful: t("moodJoyful"),
        tired: t("moodTired"),
        burdened: t("moodBurdened"),
        hopeful: t("moodHopeful")
      };
      Array.from(moodSelect.options).forEach((option) => {
        if (labels[option.value]) option.textContent = labels[option.value];
      });
    }

    const journalInput = dom("reflectionInput");
    if (journalInput) journalInput.placeholder = t("journalPlaceholder");

    const actionInput = dom("practicalActionInput");
    if (actionInput) actionInput.placeholder = t("actionPlaceholder");

    const optionLabels = {
      en: languageLabelFor("en"),
      es: languageLabelFor("es")
    };

    [dom("languageSelect"), dom("languageGuideSelect")].forEach((select) => {
      if (!select) return;
      Array.from(select.options).forEach((option) => {
        if (optionLabels[option.value]) option.textContent = optionLabels[option.value];
      });
    });

    renderPlan();
    renderAdaptive();
    renderStreak();
    renderMemory();
    renderJournal();
  }

  function renderPlan() {
    normalizeChecklist();
    const list = dom("todayPlanChecklist");
    const progress = dom("todayPlanProgress");
    if (!list || !progress) return;

    list.innerHTML = "";

    const labels = {
      strike: t("strikeTask"),
      stage: t("stageTask"),
      memory: t("memoryTask"),
      journal: t("journalTask")
    };

    CHECKLIST_KEYS.forEach((key) => {
      const done = Boolean(state.dailyPlan.items[key]);
      const row = document.createElement("p");
      row.className = `plan-item ${done ? "done" : ""}`;
      row.textContent = `${done ? "[x]" : "[ ]"} ${labels[key]}`;
      list.appendChild(row);
    });

    const doneCount = CHECKLIST_KEYS.filter((key) => state.dailyPlan.items[key]).length;
    progress.textContent = `${doneCount}/${CHECKLIST_KEYS.length} ${t("planComplete")}`;
  }

  function renderAdaptive() {
    const scoreText = dom("adaptiveScoreText");
    const focusText = dom("adaptiveFocusText");
    const recommendationText = dom("adaptiveRecommendationText");
    const guideSelect = dom("languageGuideSelect");
    if (!scoreText || !focusText || !recommendationText) return;

    const recommendation = scoreRecommendation();
    scoreText.textContent = `${t("adaptiveScore")}: ${languageLabelFor(recommendation.device)}`;
    focusText.textContent = `${t("adaptiveFocus")}: ${languageLabelFor(recommendation.current)}`;
    recommendationText.textContent = `${t("adaptiveRecommendation")}: ${languageLabelFor(recommendation.recommendation)}`;

    if (guideSelect) {
      if (guideSelect.value !== recommendation.current) {
        guideSelect.value = recommendation.current;
      }
    }
  }

  function renderStreak() {
    normalizeStreakPending();
    const stats = dom("streakStatsText");
    const note = dom("streakNoteText");
    const graceBtn = dom("graceDayBtn");
    if (!stats || !note || !graceBtn) return;

    stats.textContent = `${t("streakCurrent")}: ${state.streak.current} | ${t("streakBest")}: ${state.streak.best} | ${t("streakGrace")}: ${state.streak.graceTokens}`;

    if (state.streak.pendingMissDay) {
      note.textContent = t("streakPending");
      graceBtn.disabled = Number(state.streak.graceTokens || 0) <= 0;
    } else {
      note.textContent = t("streakStable");
      graceBtn.disabled = true;
    }
  }

  function renderMemory(message) {
    const ref = dom("memoryVerseRef");
    const verse = dom("memoryVerseText");
    const score = dom("memoryResultText");
    const input = dom("memoryInput");
    const revealVerseBtn = dom("revealVerseBtn");
    const previousVerseBtn = dom("previousVerseBtn");
    const nextVerseBtn = dom("nextVerseBtn");
    if (!ref || !verse || !score || !input) return;

    const current = verseForCurrentLanguage();
    ref.textContent = current.verse.ref;
    verse.textContent = current.verse.text;
    verse.classList.toggle("hidden", !state.memory.revealed);
    if (revealVerseBtn) {
      revealVerseBtn.textContent = state.memory.revealed ? t("hideVerseBtn") : t("revealVerseBtn");
    }
    if (previousVerseBtn) previousVerseBtn.disabled = current.pool.length <= 1;
    if (nextVerseBtn) nextVerseBtn.disabled = current.pool.length <= 1;

    const scorePart = Number(state.memory.lastScore || 0);
    score.textContent = `${t("memoryResult")}: ${scorePart}%${message ? ` - ${message}` : ""}`;
  }

  function renderJournal(statusMessage) {
    const status = dom("journalStatusText");
    const list = dom("journalList");
    if (status) status.textContent = statusMessage || "";
    if (!list) return;

    list.innerHTML = "";
    const lang = language();
    const entries = (state.journal.entries || []).slice().reverse().slice(0, 5);
    entries.forEach((entry) => {
      const row = document.createElement("article");
      row.className = "journal-entry";

      const head = document.createElement("p");
      head.className = "meta";
      const stamp = new Date(entry.time || Date.now());
      head.textContent = `${stamp.toLocaleDateString()} ${stamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} | ${entry.mood || "-"}`;

      const body = document.createElement("p");
      body.className = "journal-text";
      body.textContent = entry.text;

      const action = document.createElement("p");
      action.className = "meta";
      action.textContent = `${t("practicalActionLabel")}: ${entry.action || "-"}`;

      row.append(head, body, action);
      list.appendChild(row);
    });

    if (!entries.length) {
      const empty = document.createElement("p");
      empty.className = "meta";
      empty.textContent = lang === "es" ? "Aun no hay reflexiones guardadas." : "No reflections saved yet.";
      list.appendChild(empty);
    }
  }

  function renderMediaPack() {
    const status = dom("mediaPackStatusText");
    const counts = dom("mediaPackCountsText");
    const onlyToggle = dom("spanishOnlyToggle");
    if (!status || !counts || !onlyToggle) return;

    const total = Number(state.media.videoTotal || 0) + Number(state.media.audioTotal || 0);
    const found = Number(state.media.videoFound || 0) + Number(state.media.audioFound || 0);

    let statusKey = "mediaStatusMissing";
    if (found === total && total > 0) statusKey = "mediaStatusReady";
    else if (found > 0) statusKey = "mediaStatusPartial";

    status.textContent = t(statusKey);
    counts.textContent = `${t("mediaCounts")}: ${found}/${total} (${state.media.videoFound}/${state.media.videoTotal} video, ${state.media.audioFound}/${state.media.audioTotal} audio)`;

    onlyToggle.checked = localStorage.getItem(SPANISH_MEDIA_ONLY_KEY) === "true";
  }

  function renderAccessibility() {
    const large = dom("largeTextToggle");
    const contrast = dom("highContrastToggle");
    const motion = dom("reducedMotionToggle");
    const readable = dom("readableFontToggle");

    if (large) large.checked = Boolean(state.accessibility.largeText);
    if (contrast) contrast.checked = Boolean(state.accessibility.highContrast);
    if (motion) motion.checked = Boolean(state.accessibility.reducedMotion);
    if (readable) readable.checked = Boolean(state.accessibility.readableFont);
  }

  function renderAll() {
    renderPlan();
    renderAdaptive();
    renderStreak();
    renderMemory();
    renderJournal();
    renderAccessibility();
  }

  function syncFromCore() {
    const next = coreSnapshot();

    if (next.completedCount > snapshot.completedCount) {
      markPlanItemDone("stage");
      recordEngagement();
    }

    if (next.lives < snapshot.lives) {
      renderStreak();
    }

    if (next.lastStrike && next.lastStrike !== snapshot.lastStrike && next.lastStrike === localDayKey()) {
      markPlanItemDone("strike");
      recordEngagement();
    }

    if (next.language !== snapshot.language) {
      renderAdaptive();
    }

    snapshot = next;
    saveState();
    renderPlan();
    renderStreak();
  }

  function onApplyCoach() {
    const recommendation = scoreRecommendation();
    const target = recommendation.recommendation;
    const languageSelect = dom("languageSelect");
    if (!languageSelect) return;
    languageSelect.value = target;
    languageSelect.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function onUseGraceDay() {
    normalizeStreakPending();
    if (!state.streak.pendingMissDay) return;
    if (Number(state.streak.graceTokens || 0) <= 0) return;

    state.streak.graceTokens -= 1;
    state.streak.graceAppliedForDay = localDayKey();
    state.streak.pendingMissDay = "";

    saveState();
    renderStreak();
  }

  function onRevealVerse() {
    state.memory.revealed = !state.memory.revealed;
    saveState();
    renderMemory();
  }

  function stepMemoryVerse(step) {
    const current = verseForCurrentLanguage();
    const total = current.pool.length || 1;
    state.memory.verseIndexByLang[current.lang] = (current.index + step + total) % total;
    state.memory.revealed = false;
    state.memory.lastScore = 0;

    const input = dom("memoryInput");
    if (input) input.value = "";

    saveState();
    renderMemory();
  }

  function onPreviousVerse() {
    stepMemoryVerse(-1);
  }

  function onNextVerse() {
    stepMemoryVerse(1);
  }

  function onMemoryRecallStart() {
    if (!state.memory.revealed) return;
    state.memory.revealed = false;
    saveState();
    renderMemory();
  }

  function onCheckMemory() {
    const current = verseForCurrentLanguage();
    const input = dom("memoryInput");
    if (!input) return;

    const score = memoryScore(current.verse.text, input.value);
    state.memory.lastScore = score;
    state.memory.lastPracticeDay = localDayKey();

    let message = t("memoryTryAgain");
    if (score >= 85) {
      state.memory.masteredByRef[current.verse.ref] = true;
      message = t("memoryMastered");
    }

    markPlanItemDone("memory");
    recordEngagement();
    saveState();
    renderMemory(message);
    renderPlan();
  }

  function onSaveJournal() {
    const input = dom("reflectionInput");
    const mood = dom("journalMoodSelect");
    const action = dom("practicalActionInput");
    if (!input || !mood || !action) return;

    const text = String(input.value || "").trim();
    const practicalAction = String(action.value || "").trim();

    if (text.length < 8) {
      renderJournal(t("journalNeedText"));
      return;
    }

    const entry = {
      time: Date.now(),
      date: localDayKey(),
      lang: language(),
      mood: mood.value,
      text,
      action: practicalAction
    };

    if (!Array.isArray(state.journal.entries)) state.journal.entries = [];
    state.journal.entries.push(entry);
    if (state.journal.entries.length > 40) {
      state.journal.entries.splice(0, state.journal.entries.length - 40);
    }

    input.value = "";
    action.value = "";

    markPlanItemDone("journal");
    recordEngagement();
    saveState();
    renderJournal(t("journalSaved"));
    renderPlan();
  }

  function onAccessibilityChange() {
    const large = dom("largeTextToggle");
    const contrast = dom("highContrastToggle");
    const motion = dom("reducedMotionToggle");
    const readable = dom("readableFontToggle");

    state.accessibility.largeText = Boolean(large && large.checked);
    state.accessibility.highContrast = Boolean(contrast && contrast.checked);
    state.accessibility.reducedMotion = Boolean(motion && motion.checked);
    state.accessibility.readableFont = Boolean(readable && readable.checked);

    saveState();
    applyAccessibility();
    renderAccessibility();
  }

  function bindEvents() {
    const applyCoachBtn = dom("applyCoachBtn");
    const graceDayBtn = dom("graceDayBtn");
    const previousVerseBtn = dom("previousVerseBtn");
    const revealVerseBtn = dom("revealVerseBtn");
    const nextVerseBtn = dom("nextVerseBtn");
    const checkVerseBtn = dom("checkVerseBtn");
    const saveJournalBtn = dom("saveJournalBtn");
    const languageGuideSelect = dom("languageGuideSelect");
    const memoryInput = dom("memoryInput");

    if (applyCoachBtn) applyCoachBtn.addEventListener("click", onApplyCoach);
    if (graceDayBtn) graceDayBtn.addEventListener("click", onUseGraceDay);
    if (previousVerseBtn) previousVerseBtn.addEventListener("click", onPreviousVerse);
    if (revealVerseBtn) revealVerseBtn.addEventListener("click", onRevealVerse);
    if (nextVerseBtn) nextVerseBtn.addEventListener("click", onNextVerse);
    if (checkVerseBtn) checkVerseBtn.addEventListener("click", onCheckMemory);
    if (saveJournalBtn) saveJournalBtn.addEventListener("click", onSaveJournal);
    if (memoryInput) {
      memoryInput.addEventListener("focus", onMemoryRecallStart);
      memoryInput.addEventListener("input", onMemoryRecallStart);
    }

    ["largeTextToggle", "highContrastToggle", "reducedMotionToggle", "readableFontToggle"].forEach((id) => {
      const el = dom(id);
      if (el) el.addEventListener("change", onAccessibilityChange);
    });

    const languageSelect = dom("languageSelect");
    if (languageSelect) {
      languageSelect.addEventListener("change", () => {
        window.setTimeout(() => {
          applyLocalization();
        }, 40);
      });
    }

    if (languageGuideSelect) {
      languageGuideSelect.addEventListener("change", () => {
        if (!languageSelect) return;
        languageSelect.value = languageGuideSelect.value || "en";
        languageSelect.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }

    window.addEventListener("faith:language-changed", () => {
      applyLocalization();
    });

    window.addEventListener("faith:stage-complete", () => {
      markPlanItemDone("stage");
      recordEngagement();
      renderAll();
    });

    window.addEventListener("faith:daily-strike", () => {
      markPlanItemDone("strike");
      recordEngagement();
      renderAll();
    });

    window.addEventListener("storage", (event) => {
      if (event.key === "faithLanguage") {
        applyLocalization();
      }
    });
  }

  function bootstrap() {
    normalizeChecklist();
    normalizeStreakPending();
    applyAccessibility();
    bindEvents();
    applyLocalization();
    renderAll();
    syncFromCore();

    window.setInterval(syncFromCore, 1400);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  } else {
    bootstrap();
  }
})();
