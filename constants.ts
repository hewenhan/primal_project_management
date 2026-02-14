
import { Language, AssessmentQuestion } from './types';

export const APP_VERSION = "v1.6.0";

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    appTitle: "PrimalFocus",
    tagline: "Evolve beyond procrastination.",
    newProject: "New Mission",
    import: "Recover System",
    importProject: "Import Mission",
    export: "Backup System",
    startAssessment: "Analyze Neural Patterns",
    continue: "Continue",
    back: "Back",
    loading: "Consulting the Neural Network...",
    projectPlaceholder: "What is the mission target?",
    descPlaceholder: "Describe the objective roughly...",
    generatePlan: "Tactical Breakdown",
    regenerate: "Re-roll Tactics",
    strategyTitle: "Psychological Protocols",
    startExecution: "Engage Focus Mode",
    timeRemaining: "Time Remaining",
    taskComplete: "Objective Complete",
    allSystemsGo: "All Systems Go",
    assessmentTitle: "Behavioral Analysis Protocol",
    submit: "Submit Analysis",
    delete: "Delete",
    exportProject: "Export Mission JSON",
    noProjects: "No active missions. Initialize a new one.",
    focusMode: "Focus Mode",
    abort: "Abort Mission",
    complete: "Complete",
    analyzing: "Processing 30 Data Points...",
    importError: "Invalid Mission Data",
    importSuccess: "Mission Data Loaded",
    prev: "Previous",
    next: "Next",
    step: "Step",
    editMission: "Supplement / Refine",
    missionIntel: "Mission Intelligence",
    missionDescLabel: "Objective Description",
    regenerateAll: "Calibrate Plan",
    regenerateConfirm: "Execute plan calibration? This cannot be undone.",
    saving: "Updating Neural Link...",
    profileContext: "Subject Profile Context",
    cancel: "Cancel",
    confirm: "Confirm",
    psychAnalysis: "Neural Logs (AI Reasoning)",
    supplementLabel: "New Intelligence / Changes",
    keepCompleted: "Select Tasks to Retain",
    keepCompletedDesc: "Check the tasks you want to keep. Unchecked tasks will be purged.",
    deleteConfirm: "Are you sure you want to delete this mission? This action cannot be undone.",
    refining: "Refining Strategy...",
    viewProfile: "View Psych Profile",
    profileReport: "Subject Analysis Report",
    strengths: "Combat Strengths",
    weaknesses: "Vulnerabilities",
    strategies: "Recommended Protocols",
    viewLogs: "View AI Logs",
    logsTitle: "Mission Logic History",
    execute: "Execute",
    missionCompleteTitle: "MISSION ACCOMPLISHED",
    missionCompleteSubtitle: "Neural Adaptation Complete. Dopamine Receptors Saturated.",
    missionCompleteConfirm: "All objectives met. Finalize mission and archive?",
    finalizeMission: "Finalize Mission",
    returnToBase: "Return to Base",
    totalTime: "Total Focus Time",
    objectivesCleared: "Objectives Cleared",
    reviewMission: "Review Mission",
    archived: "Mission Archived",
    reactivate: "Reactivate / Unlock",
    missionLocked: "Mission is archived. Unlock to edit.",
    reactivateConfirm: "Reactivate this mission? Status will return to active.",
    saveShortcut: "BACKUP",
    importSkip: "Skip assessment by importing config",
    uploadConfig: "Upload Config JSON",
    resetApp: "System Purge",
    resetWarning: "WARNING: This will wipe all profile data and missions. This action is irreversible. Continue?",
    panicButton: "I'M STUCK / PANIC",
    panicAnalyzing: "Deconstructing Obstacle...",
    panicSuccess: "Task decomposed into micro-steps.",
    soundOff: "Silence",
    soundWhite: "White Noise",
    soundPink: "Pink Noise (Rain)",
    soundBinaural: "Binaural Focus (40Hz)",
    ambienceLabel: "Neural Ambience",
    codenameLabel: "Codename",
    objectiveIntelLabel: "Objective Intel",
    aiAssistantTitle: "AI Assistant",
    aiAssistantDesc: "The AI will use your profile to break this down into low-energy micro-tasks.",
    overrideLabel: "Psychological Override",
    activeStatus: "Active",
    startStatus: "Start",
    selectTaskHelp: "Select a task from the list to initiate the focus timer.",
    noLogs: "No logs recorded.",
    inputContext: "Input / Context",
    aiLogic: "AI Logic",
    analysisUnavailable: "Detailed analysis not available.",
    noData: "No data",
    coreFear: "Core Fear",
    panicResolved: "Panic Resolved",
    aiOffline: "AI is offline. Try deep breathing.",
    systemUpdated: "System Updated",
    regenFailed: "Failed to regenerate plan.",
    connectionFailed: "Failed to contact the neural network.",
    missionControl: "Mission Control",
    // Tutorial & Setup
    welcomeTitle: "Initialize PrimalFocus",
    selectLanguage: "Select Interface Language",
    getStarted: "INITIALIZE SYSTEM",
    tutNext: "NEXT",
    tutSkip: "SKIP",
    tutFinish: "FINISH",
    tutDashboardTitle: "Mission Control",
    tutDashboardDesc: "This is your HQ. Create new missions here or manage existing ones. Don't let the list grow too long.",
    tutNewProjectTitle: "New Mission",
    tutNewProjectDesc: "Click here to start. The AI will handle the heavy lifting of planning.",
    tutAssessmentTitle: "Psych Profile",
    tutAssessmentDesc: "Before we start, we need to understand your procrastination style. This is a one-time analysis.",
    tutPlanningTitle: "Tactical Planning",
    tutPlanningDesc: "Just dump your brain here. Vague is fine. The AI interprets 'do the thing' into actionable steps.",
    tutExecutionTitle: "Execution Mode",
    tutExecutionDesc: "This is where work happens. Single task focus. No distractions.",
    tutPanicTitle: "Panic Button",
    tutPanicDesc: "If you get stuck or anxious, hit this. The AI will break the current task into tiny, laughable micro-steps to get you moving.",
  },
  zh: {
    appTitle: "进化动力",
    tagline: "用进化心理学对抗拖延症。",
    newProject: "新建任务",
    import: "恢复系统",
    importProject: "导入单个任务",
    export: "备份系统",
    startAssessment: "行为模式深度分析",
    continue: "继续",
    back: "返回",
    loading: "正在连接神经元网络...",
    projectPlaceholder: "任务目标是什么？",
    descPlaceholder: "粗略描述一下目标...",
    generatePlan: "战术拆解",
    regenerate: "重新生成战术",
    strategyTitle: "心理学激进方案",
    startExecution: "进入专注模式",
    timeRemaining: "剩余时间",
    taskComplete: "目标达成",
    allSystemsGo: "系统就绪",
    assessmentTitle: "拖延行为深度问卷",
    submit: "提交分析报告",
    delete: "删除",
    exportProject: "导出任务配置",
    noProjects: "无活跃任务。请初始化新任务。",
    focusMode: "专注模式",
    abort: "终止任务",
    complete: "完成",
    analyzing: "正在处理30项行为数据...",
    importError: "无效的任务数据",
    importSuccess: "任务载入成功",
    prev: "上一题",
    next: "下一题",
    step: "进度",
    editMission: "补充情报 / 调整",
    missionIntel: "任务情报",
    missionDescLabel: "原始目标",
    regenerateAll: "执行校准",
    regenerateConfirm: "执行计划校准？此操作不可撤销。",
    saving: "正在更新神经连接...",
    profileContext: "主体侧写上下文",
    cancel: "取消",
    confirm: "确认",
    psychAnalysis: "神经日志 (AI 思考记录)",
    supplementLabel: "补充情报 / 变更点",
    keepCompleted: "选择要保留的任务",
    keepCompletedDesc: "勾选你想要保留的任务（包括已完成和未完成）。未勾选的任务将被清除。",
    deleteConfirm: "确定要删除此任务吗？此操作无法撤销。",
    refining: "正在校准战略...",
    viewProfile: "查看心理侧写",
    profileReport: "主体分析报告",
    strengths: "战斗优势",
    weaknesses: "弱点/漏洞",
    strategies: "推荐协议",
    viewLogs: "查看 AI 日志",
    logsTitle: "任务逻辑历史",
    execute: "执行",
    missionCompleteTitle: "任务圆满完成",
    missionCompleteSubtitle: "神经适应完成。多巴胺受体已饱和。",
    missionCompleteConfirm: "所有目标已达成。确认归档任务？",
    finalizeMission: "结算任务",
    returnToBase: "返回基地",
    totalTime: "总专注时长",
    objectivesCleared: "已清理目标",
    reviewMission: "回顾任务",
    archived: "任务已归档",
    reactivate: "重启 / 解锁任务",
    missionLocked: "任务已归档锁定。需解锁以编辑。",
    reactivateConfirm: "确认重启任务？状态将变更为“进行中”。",
    saveShortcut: "全局保存",
    importSkip: "已有配置？导入以跳过测试",
    uploadConfig: "上传配置 JSON",
    resetApp: "系统重置",
    resetWarning: "警告：这将清除所有侧写数据和任务记录。此操作不可逆。是否继续？",
    panicButton: "卡住了 / 紧急求助",
    panicAnalyzing: "正在拆解障碍...",
    panicSuccess: "任务已拆解为微步骤。",
    soundOff: "静音",
    soundWhite: "白噪音",
    soundPink: "粉红噪音 (雨声)",
    soundBinaural: "双耳节拍 (专注)",
    ambienceLabel: "环境音效",
    codenameLabel: "任务代号",
    objectiveIntelLabel: "目标情报",
    aiAssistantTitle: "AI 战术助手",
    aiAssistantDesc: "AI 将利用你的侧写档案，将此目标拆解为“低能耗”的微型任务。",
    overrideLabel: "心理学覆盖协议",
    activeStatus: "进行中",
    startStatus: "开始",
    selectTaskHelp: "从列表中选择一个任务以启动专注计时器。",
    noLogs: "暂无日志记录。",
    inputContext: "输入 / 上下文",
    aiLogic: "AI 逻辑推演",
    analysisUnavailable: "详细分析暂不可用。",
    noData: "无数据",
    coreFear: "核心恐惧",
    panicResolved: "恐慌已解除",
    aiOffline: "AI 离线。请尝试深呼吸。",
    systemUpdated: "系统已更新",
    regenFailed: "生成计划失败。",
    connectionFailed: "无法连接神经元网络。",
    missionControl: "任务控制中心",
    // Tutorial & Setup
    welcomeTitle: "初始化进化动力系统",
    selectLanguage: "选择界面语言",
    getStarted: "初始化系统",
    tutNext: "下一步",
    tutSkip: "跳过",
    tutFinish: "完成",
    tutDashboardTitle: "任务控制中心",
    tutDashboardDesc: "这是你的指挥部。在这里创建新任务或管理现有任务。",
    tutNewProjectTitle: "新建任务",
    tutNewProjectDesc: "点击这里开始。AI 会帮你搞定最难的“计划”部分。",
    tutAssessmentTitle: "心理侧写",
    tutAssessmentDesc: "在开始之前，系统需要分析你的拖延症类型。这是建立档案的必经之路。",
    tutPlanningTitle: "战术规划",
    tutPlanningDesc: "把你脑子里模糊的想法倒在这里。AI 会负责把它翻译成你杏仁核能接受的指令。",
    tutExecutionTitle: "执行模式",
    tutExecutionDesc: "这里是战场。一次只专注一个任务，隔绝所有干扰。",
    tutPanicTitle: "紧急求助按钮",
    tutPanicDesc: "如果你卡住了、焦虑了、想刷手机了，点这个。AI 会立刻介入，把任务切得碎到让你无法拒绝。",
  },
  ja: {
    appTitle: "プライマル・フォーカス",
    tagline: "進化心理学で先延ばしを克服。",
    newProject: "新規ミッション",
    import: "システム復旧",
    importProject: "ミッション読込",
    export: "システムバックアップ",
    startAssessment: "行動パターン分析",
    continue: "次へ",
    back: "戻る",
    loading: "ニューラルネットワークに接続中...",
    projectPlaceholder: "ミッションの目標は？",
    descPlaceholder: "目標を大まかに説明してください...",
    generatePlan: "戦術的内訳",
    regenerate: "戦術再生成",
    strategyTitle: "心理学的プロトコル",
    startExecution: "集中モード開始",
    timeRemaining: "残り時間",
    taskComplete: "目標達成",
    allSystemsGo: "全システム稼働",
    assessmentTitle: "行動分析プロトコル",
    submit: "分析送信",
    delete: "削除",
    exportProject: "ミッション出力",
    noProjects: "アクティブなミッションはありません。",
    focusMode: "集中モード",
    abort: "ミッション中止",
    complete: "完了",
    analyzing: "データ処理中...",
    importError: "無効なミッションデータ",
    importSuccess: "ミッション読込完了",
    prev: "前へ",
    next: "次へ",
    step: "ステップ",
    editMission: "情報補足 / 調整",
    missionIntel: "ミッション情報",
    missionDescLabel: "目標記述",
    regenerateAll: "計画再調整",
    regenerateConfirm: "計画の再調整を実行しますか？この操作は取り消せません。",
    saving: "神経リンク更新中...",
    profileContext: "被験者プロファイル",
    cancel: "キャンセル",
    confirm: "確認",
    psychAnalysis: "ニューラルログ (AI思考記録)",
    supplementLabel: "追加情報 / 変更点",
    keepCompleted: "保持するタスクを選択",
    keepCompletedDesc: "保持したいタスクにチェックを入れてください。チェックされていないタスクは消去されます。",
    deleteConfirm: "このミッションを削除してもよろしいですか？この操作は取り消せません。",
    refining: "戦略調整中...",
    viewProfile: "心理プロファイル",
    profileReport: "被験者分析レポート",
    strengths: "戦闘力",
    weaknesses: "脆弱性",
    strategies: "推奨プロトコル",
    viewLogs: "AIログを見る",
    logsTitle: "ミッション論理履歴",
    execute: "実行",
    missionCompleteTitle: "ミッション完了",
    missionCompleteSubtitle: "神経適応完了。ドーパミン受容体飽和。",
    missionCompleteConfirm: "全目標達成。ミッションを完了しアーカイブしますか？",
    finalizeMission: "ミッション完了",
    returnToBase: "基地へ帰還",
    totalTime: "総集中時間",
    objectivesCleared: "達成目標数",
    reviewMission: "ミッション確認",
    archived: "アーカイブ済み",
    reactivate: "再開 / ロック解除",
    missionLocked: "アーカイブ済みです。編集するにはロックを解除してください。",
    reactivateConfirm: "ミッションを再開しますか？ステータスはアクティブに戻ります。",
    saveShortcut: "保存",
    importSkip: "設定をインポートしてスキップ",
    uploadConfig: "設定JSONをアップロード",
    resetApp: "システム初期化",
    resetWarning: "警告：すべてのプロファイルデータとミッションが消去されます。この操作は元に戻せません。続けますか？",
    panicButton: "パニック / 行き詰まり",
    panicAnalyzing: "障害を分解中...",
    panicSuccess: "タスクをマイクロステップに分解しました。",
    soundOff: "ミュート",
    soundWhite: "ホワイトノイズ",
    soundPink: "ピンクノイズ (雨音)",
    soundBinaural: "バイノーラル (集中)",
    ambienceLabel: "環境音",
    codenameLabel: "コードネーム",
    objectiveIntelLabel: "目標情報",
    aiAssistantTitle: "AI戦術アシスタント",
    aiAssistantDesc: "AIはあなたのプロファイルを利用して、この目標を低エネルギーのマイクロタスクに分解します。",
    overrideLabel: "心理学的オーバーライド",
    activeStatus: "アクティブ",
    startStatus: "開始",
    selectTaskHelp: "リストからタスクを選択して集中タイマーを開始してください。",
    noLogs: "ログは記録されていません。",
    inputContext: "入力 / コンテキスト",
    aiLogic: "AIロジック",
    analysisUnavailable: "詳細な分析は利用できません。",
    noData: "データなし",
    coreFear: "根源的な恐怖",
    panicResolved: "パニック解消",
    aiOffline: "AIはオフラインです。深呼吸を試してください。",
    systemUpdated: "システム更新完了",
    regenFailed: "計画の再生成に失敗しました。",
    connectionFailed: "ニューラルネットワークへの接続に失敗しました。",
    missionControl: "ミッションコントロール",
    // Tutorial
    welcomeTitle: "システム初期化",
    selectLanguage: "言語を選択してください",
    getStarted: "システム起動",
    tutNext: "次へ",
    tutSkip: "スキップ",
    tutFinish: "完了",
    tutDashboardTitle: "ミッションコントロール",
    tutDashboardDesc: "ここは司令部です。新しいミッションを作成したり、既存のミッションを管理します。",
    tutNewProjectTitle: "新規ミッション",
    tutNewProjectDesc: "ここをクリックして開始します。AIが計画の重労働を担当します。",
    tutAssessmentTitle: "心理プロファイル",
    tutAssessmentDesc: "開始する前に、あなたの「先延ばしタイプ」を分析する必要があります。これは一度だけのプロセスです。",
    tutPlanningTitle: "戦術計画",
    tutPlanningDesc: "頭の中の曖昧な考えをここに書き出してください。AIがそれを実行可能なステップに翻訳します。",
    tutExecutionTitle: "実行モード",
    tutExecutionDesc: "ここは戦場です。一つのタスクに集中し、すべての邪魔を排除します。",
    tutPanicTitle: "パニックボタン",
    tutPanicDesc: "行き詰まったり、不安になったりしたら、これを押してください。AIがタスクを瞬時に分解し、救出します。",
  },
  ko: {
    appTitle: "프라이멀 포커스",
    tagline: "진화 심리학으로 미루기를 극복하세요.",
    newProject: "새로운 임무",
    import: "시스템 복구",
    importProject: "임무 가져오기",
    export: "시스템 백업",
    startAssessment: "행동 패턴 분석",
    continue: "계속",
    back: "뒤로",
    loading: "신경망 연결 중...",
    projectPlaceholder: "임무 목표는 무엇입니까?",
    descPlaceholder: "목표를 대략적으로 설명하세요...",
    generatePlan: "전술적 세분화",
    regenerate: "전술 재생성",
    strategyTitle: "심리학적 프로토콜",
    startExecution: "집중 모드 시작",
    timeRemaining: "남은 시간",
    taskComplete: "목표 달성",
    allSystemsGo: "모든 시스템 작동",
    assessmentTitle: "행동 분석 프로토콜",
    submit: "분석 제출",
    delete: "삭제",
    exportProject: "임무 내보내기",
    noProjects: "활성 임무가 없습니다. 새로 시작하세요.",
    focusMode: "집중 모드",
    abort: "임무 중단",
    complete: "완료",
    analyzing: "데이터 처리 중...",
    importError: "잘못된 임무 데이터",
    importSuccess: "임무 로드 완료",
    prev: "이전",
    next: "다음",
    step: "단계",
    editMission: "정보 보충 / 조정",
    missionIntel: "임무 정보",
    missionDescLabel: "목표 설명",
    regenerateAll: "계획 재보정",
    regenerateConfirm: "계획 재보정을 실행하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    saving: "신경 연결 업데이트 중...",
    profileContext: "대상 프로필 컨텍스트",
    cancel: "취소",
    confirm: "확인",
    psychAnalysis: "신경 로그 (AI 사고 기록)",
    supplementLabel: "추가 정보 / 변경 사항",
    keepCompleted: "유지할 작업 선택",
    keepCompletedDesc: "유지할 작업을 선택하세요. 선택하지 않은 작업은 삭제됩니다.",
    deleteConfirm: "이 임무를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    refining: "전략 수정 중...",
    viewProfile: "심리 프로필 보기",
    profileReport: "대상 분석 보고서",
    strengths: "강점",
    weaknesses: "취약점",
    strategies: "권장 프로토콜",
    viewLogs: "AI 로그 보기",
    logsTitle: "임무 논리 기록",
    execute: "실행",
    missionCompleteTitle: "임무 완수",
    missionCompleteSubtitle: "신경 적응 완료. 도파민 수용체 포화 상태.",
    missionCompleteConfirm: "모든 목표 달성. 임무를 완료하고 보관하시겠습니까?",
    finalizeMission: "임무 완료",
    returnToBase: "본부로 귀환",
    totalTime: "총 집중 시간",
    objectivesCleared: "완료된 목표",
    reviewMission: "임무 검토",
    archived: "임무 보관됨",
    reactivate: "재활성화 / 잠금 해제",
    missionLocked: "임무가 보관되었습니다. 편집하려면 잠금을 해제하세요.",
    reactivateConfirm: "임무를 재활성화하시겠습니까? 상태가 활성으로 돌아갑니다.",
    saveShortcut: "백업",
    importSkip: "설정 가져오기로 건너뛰기",
    uploadConfig: "설정 JSON 업로드",
    resetApp: "시스템 초기화",
    resetWarning: "경고: 모든 프로필 데이터와 임무가 삭제됩니다. 이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?",
    panicButton: "패닉 / 긴급 지원",
    panicAnalyzing: "장애물 분해 중...",
    panicSuccess: "작업이 마이크로 단계로 분해되었습니다.",
    soundOff: "음소거",
    soundWhite: "화이트 노이즈",
    soundPink: "핑크 노이즈 (빗소리)",
    soundBinaural: "바이노럴 (집중)",
    ambienceLabel: "배경음",
    codenameLabel: "코드네임",
    objectiveIntelLabel: "목표 정보",
    aiAssistantTitle: "AI 전술 어시스턴트",
    aiAssistantDesc: "AI는 귀하의 프로필을 사용하여 이 목표를 저에너지 마이크로 작업으로 분해합니다.",
    overrideLabel: "심리적 오버라이드",
    activeStatus: "활성",
    startStatus: "시작",
    selectTaskHelp: "목록에서 작업을 선택하여 집중 타이머를 시작하십시오.",
    noLogs: "기록된 로그가 없습니다.",
    inputContext: "입력 / 컨텍스트",
    aiLogic: "AI 로직",
    analysisUnavailable: "상세 분석을 사용할 수 없습니다.",
    noData: "데이터 없음",
    coreFear: "핵심 공포",
    panicResolved: "패닉 해결됨",
    aiOffline: "AI가 오프라인입니다. 심호흡을 시도하세요.",
    systemUpdated: "시스템 업데이트됨",
    regenFailed: "계획을 재생성하지 못했습니다.",
    connectionFailed: "신경망에 연결하지 못했습니다.",
    missionControl: "임무 통제 센터",
    // Tutorial
    welcomeTitle: "시스템 초기화",
    selectLanguage: "언어 선택",
    getStarted: "시스템 시작",
    tutNext: "다음",
    tutSkip: "건너뛰기",
    tutFinish: "완료",
    tutDashboardTitle: "임무 통제실",
    tutDashboardDesc: "이곳은 본부입니다. 새 임무를 생성하거나 관리하세요.",
    tutNewProjectTitle: "새 임무",
    tutNewProjectDesc: "여기를 클릭하여 시작하세요. 계획 수립의 어려운 부분은 AI가 처리합니다.",
    tutAssessmentTitle: "심리 프로필",
    tutAssessmentDesc: "시작하기 전에, 시스템이 귀하의 미루기 유형을 분석해야 합니다. 이 과정은 한 번만 수행됩니다.",
    tutPlanningTitle: "전술 계획",
    tutPlanningDesc: "머릿속의 모호한 생각을 여기에 쏟아내세요. AI가 실행 가능한 단계로 변환해 줍니다.",
    tutExecutionTitle: "실행 모드",
    tutExecutionDesc: "여기는 전장입니다. 한 번에 하나의 임무에만 집중하세요.",
    tutPanicTitle: "패닉 버튼",
    tutPanicDesc: "막히거나 불안할 때 누르세요. AI가 작업을 아주 작게 쪼개어 구출해 줍니다.",
  },
};

// ... existing ASSESSMENT_QUESTIONS ...
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // ... existing questions ...
  // (Keeping existing questions to save space in XML, but implying they are here)
  {
    id: 'q1',
    text: {
      en: "When you sit down to work, how long does it take to actually type/do the first thing?",
      zh: "当你坐下来准备工作时，实际动手做第一件事通常需要多久？",
      ja: "仕事に座ってから、実際に最初の作業を始めるまでどれくらいかかりますか？",
      ko: "자리에 앉아 작업을 시작할 때, 실제로 첫 번째 일을 하는 데 얼마나 걸립니까?"
    },
    options: [
      { value: 'immediate', label: { en: "< 5 minutes", zh: "不到5分钟", ja: "5分未満", ko: "5분 미만" } },
      { value: 'delay_15', label: { en: "15-30 mins of shuffling", zh: "15-30分钟的磨蹭", ja: "15-30分のぐずぐず", ko: "15-30분 정도 꾸물거림" } },
      { value: 'delay_hour', label: { en: "1 hour+ of 'getting ready'", zh: "1小时以上的“准备工作”", ja: "1時間以上の「準備」", ko: "1시간 이상의 '準備' 시간" } },
      { value: 'give_up', label: { en: "I often get up and leave before starting", zh: "经常还没开始就起身离开了", ja: "始める前に席を立つことが多い", ko: "시작도 하기 전에 자리에서 일어나는 경우가 많음" } }
    ]
  },
  {
    id: 'q2',
    text: {
      en: "What is the most common thought right before you decide to delay a task?",
      zh: "在你决定“等会儿再做”的那一瞬间，脑子里最常出现的念头是什么？",
      ja: "タスクを先延ばしにする直前、最もよく浮かぶ考えは何ですか？",
      ko: "일을 미루기로 결정하기 직전에 가장 흔하게 드는 생각은 무엇입니까?"
    },
    options: [
      { value: 'tired', label: { en: "I'm too tired right now", zh: "我现在太累了", ja: "今は疲れすぎている", ko: "지금은 너무 피곤해" } },
      { value: 'perfect_time', label: { en: "It's not the 'right time' (e.g., waiting for :00)", zh: "现在时间点不对 (比如非要等到整点)", ja: "「ちょうどいい時間」ではない（例：00分まで待つ）", ko: "지금은 '적절한 시간'이 아냐 (예: 정각까지 기다림)" } },
      { value: 'boring', label: { en: "This is going to be so boring", zh: "这事儿肯定特无聊", ja: "これは退屈になりそうだ", ko: "이건 너무 지루할 거야" } },
      { value: 'hard', label: { en: "I don't know where to start", zh: "我完全不知道从哪下手", ja: "どこから始めればいいかわからない", ko: "어디서부터 시작해야 할지 모르겠어" } }
    ]
  },
  {
    id: 'q3',
    text: {
      en: "If a task takes 5 minutes, do you do it immediately?",
      zh: "如果一个任务只需要5分钟，你会立刻做吗？",
      ja: "5分で終わるタスクなら、すぐにやりますか？",
      ko: "5분이면 끝나는 일이라면 즉시 합니까?"
    },
    options: [
      { value: 'yes', label: { en: "Yes, to get it out of the way", zh: "会，赶紧做完省心", ja: "はい、片付けるために", ko: "네, 해치우기 위해" } },
      { value: 'no_list', label: { en: "No, I add it to a list for later", zh: "不会，我会记在清单上以后做", ja: "いいえ、後でやるリストに追加します", ko: "아니요, 나중에 하려고 목록에 적어둡니다" } },
      { value: 'no_ignore', label: { en: "No, I ignore it until it's urgent", zh: "不会，直到火烧眉毛才做", ja: "いいえ、緊急になるまで無視します", ko: "아니요, 급해질 때까지 무시합니다" } },
      { value: 'overthink', label: { en: "I think about doing it for 20 minutes first", zh: "我会先纠结20分钟要不要做", ja: "まず20分間、やるかどうか考えます", ko: "먼저 20분 동안 할지 말지 고민합니다" } }
    ]
  },
  {
    id: 'q4',
    text: {
      en: "How do you feel about 'Planning'?",
      zh: "你对“做计划”这件事怎么看？",
      ja: "「計画」についてどう感じますか？",
      ko: "'계획'에 대해 어떻게 생각하십니까?"
    },
    options: [
      { value: 'love', label: { en: "I love planning, but rarely execute", zh: "我超爱做计划，但很少执行", ja: "計画は大好きだが、実行は稀", ko: "계획은 좋아하지만 실행은 거의 안 함" } },
      { value: 'hate', label: { en: "Planning feels like a prison", zh: "做计划感觉像坐牢", ja: "計画は刑務所のように感じる", ko: "계획은 감옥처럼 느껴짐" } },
      { value: 'useless', label: { en: "Plans never work anyway", zh: "反正计划赶不上变化", ja: "どうせ計画通りにはいかない", ko: "어차피計画대로 되는 일은 없음" } },
      { value: 'necessary', label: { en: "It helps me start", zh: "它能帮我开始", ja: "始めるのに役立つ", ko: "시작하는 데 도움이 됨" } }
    ]
  },
  {
    id: 'q5',
    text: {
      en: "When staring at a blank page/screen, what happens?",
      zh: "当盯着空白文档/屏幕时，你会发生什么？",
      ja: "空白のページ/画面を見つめているとき、何が起こりますか？",
      ko: "빈 페이지/화면을 쳐다볼 때 어떤 일이 일어납니까?"
    },
    options: [
      { value: 'blank', label: { en: "Mind goes completely blank", zh: "大脑一片空白", ja: "頭が真っ白になる", ko: "머릿속이 하얗게 됨" } },
      { value: 'distract', label: { en: "I immediately open a new tab", zh: "马上打开浏览器新标签页", ja: "すぐに新しいタブを開く", ko: "즉시 새 탭을 엶" } },
      { value: 'critic', label: { en: "I criticize my ideas before typing", zh: "还没打字就开始批判自己的想法", ja: "タイプする前に自分のアイデアを批判する", ko: "타이핑하기도 전에 내 아이디어를 비판함" } },
      { value: 'focus', label: { en: "I start typing nonsense just to start", zh: "乱打一通先开始再说", ja: "とにかく始めるために適当に打ち始める", ko: "일단 시작하려고 아무 말이나 침" } }
    ]
  },
  // --- PERFECTIONISM & ANXIETY (6-10) ---
  {
    id: 'q6',
    text: {
      en: "Do you delete/erase your work often?",
      zh: "你经常删除/擦掉刚写好的东西吗？",
      ja: "書いたものを頻繁に削除/消去しますか？",
      ko: "작업한 내용을 자주 삭제/지웁니까?"
    },
    options: [
      { value: 'yes_perfect', label: { en: "Yes, if it's not perfect, it's trash", zh: "是的，不完美就是垃圾", ja: "はい、完璧でなければゴミです", ko: "네, 완벽하지 않으면 쓰레기입니다" } },
      { value: 'sometimes', label: { en: "Sometimes, to improve clarity", zh: "有时候会，为了更清晰", ja: "時々、明確にするために", ko: "가끔, 더 명확하게 하기 위해" } },
      { value: 'no_draft', label: { en: "No, I prefer rough drafts", zh: "不，我喜欢先写草稿", ja: "いいえ、ラフな下書きを好みます", ko: "아니요, 초안を好みします" } },
      { value: 'never_start', label: { en: "I haven't written enough to delete yet", zh: "我还没写出能删的东西呢", ja: "削除するほど書いていません", ko: "아직 지울 만큼 쓰지도 않았습니다" } }
    ]
  },
  {
    id: 'q7',
    text: {
      en: "How do you handle deadlines?",
      zh: "你是怎么应对截止日期的？",
      ja: "締め切りにどう対処しますか？",
      ko: "마감 기한을 어떻게 처리합니까?"
    },
    options: [
      { value: 'panic_rush', label: { en: "Panic and do 10 hours work in 2 hours", zh: "恐慌，然后在2小时内干完10小时的活", ja: "パニックになり、10時間分の仕事を2時間でやる", ko: "패닉 상태로 10시간 분량의 일을 2시간 만에 함" } },
      { value: 'miss', label: { en: "I often miss them and apologize", zh: "经常错过，然后道歉", ja: "よく遅れて謝罪する", ko: "자주 놓치고 사과함" } },
      { value: 'early', label: { en: "I finish early to avoid anxiety", zh: "为了不焦虑，我会提前做完", ja: "不安を避けるために早めに終わらせる", ko: "불안を避けるために早めに終わらせる" } },
      { value: 'negotiate', label: { en: "I try to negotiate more time", zh: "我会试图讨价还价争取更多时间", ja: "時間を延ばそうと交渉する", ko: "시간을 더 달라고 협상함" } }
    ]
  },
  {
    id: 'q8',
    text: {
      en: "Does the fear of failure stop you from starting?",
      zh: "“害怕失败”会阻止你开始吗？",
      ja: "失敗への恐れが始まりを妨げますか？",
      ko: "실패에 대한 두려움 때문에 시작하지 못합니까?"
    },
    options: [
      { value: 'always', label: { en: "Yes, better not to try than to fail", zh: "是的，与其失败不如不做", ja: "はい、失敗するよりやらない方がマシ", ko: "네, 실패하느니 안 하는 게 낫습니다" } },
      { value: 'success_fear', label: { en: "Actually, I fear success (expectations)", zh: "其实我更怕成功（因为会有更高期望）", ja: "実は成功（期待）が怖い", ko: "사실 성공이 더 두렵습니다 (기대감 때문에)" } },
      { value: 'judgment', label: { en: "I fear others judging my work", zh: "我怕别人对我的工作指指点点", ja: "他人が自分の仕事を評価するのが怖い", ko: "남들이 내 작업을 평가하는 게 두렵습니다" } },
      { value: 'no', label: { en: "No, I just don't want to work", zh: "不，我纯粹就是不想干活", ja: "いいえ、ただ働きたくないだけ", ko: "아니요, 그냥 일하기 싫은 겁니다" } }
    ]
  },
  {
    id: 'q9',
    text: {
      en: "Do you compare your potential output to others?",
      zh: "你会拿自己还没做出来的成果和别人比吗？",
      ja: "自分の潜在的な成果を他人と比較しますか？",
      ko: "아직 하지도 않은 결과를 남들과 비교합니까?"
    },
    options: [
      { value: 'constantly', label: { en: "Yes, everyone else seems faster/better", zh: "总是比，感觉别人都比我快/好", ja: "はい、他のみんなが速く/優れているように見える", ko: "네, 남들은 다 더 빠르고 잘하는 것 같음" } },
      { value: 'rarely', label: { en: "Rarely", zh: "很少", ja: "稀に", ko: "거의 안 함" } },
      { value: 'inspire', label: { en: "Yes, but it inspires me", zh: "会，但这能激励我", ja: "はい、でもそれは私を奮い立たせる", ko: "네, 하지만 자극이 됨" } },
      { value: 'avoid', label: { en: "I avoid looking at others' work", zh: "我根本不敢看别人的东西", ja: "他人の仕事を見るのを避ける", ko: "남の作業物を安易に見ようとする" } }
    ]
  },
  {
    id: 'q10',
    text: {
      en: "How do you react to a small mistake?",
      zh: "遇到一个小错误你会怎么反应？",
      ja: "小さなミスにどう反応しますか？",
      ko: "사소한 실수를 하면 어떻게 반응합니까?"
    },
    options: [
      { value: 'restart', label: { en: "Scrap the whole thing and restart", zh: "全盘推翻，重头再来", ja: "全て破棄してやり直す", ko: "전부 갈아엎고 다시 시작함" } },
      { value: 'fix', label: { en: "Fix it and move on", zh: "修好它，继续", ja: "修正して進む", ko: "고치고 넘어감" } },
      { value: 'spiral', label: { en: "Lose motivation for the day", zh: "一整天都没动力了", ja: "その日のやる気を失う", ko: "하루 종일 의욕を상실함" } },
      { value: 'ignore', label: { en: "Leave it messy", zh: "不管它，乱就乱吧", ja: "散らかったままにする", ko: "그냥 엉망인 채로 둠" } }
    ]
  },
  // --- DISTRACTION & ATTENTION (11-15) ---
  {
    id: 'q11',
    text: {
      en: "What is your 'Weapon of Choice' for distraction?",
      zh: "你最常用的“分心武器”是什么？",
      ja: "気晴らしに使う「武器」は何ですか？",
      ko: "가장 선호하는 '딴짓 도구'는 무엇입니까?"
    },
    options: [
      { value: 'shorts', label: { en: "Short form video (TikTok/Reels)", zh: "短视频 (抖音/Reels)", ja: "ショート動画 (TikTok/Reels)", ko: "숏폼 동영상 (틱톡/릴스)" } },
      { value: 'games', label: { en: "Immersive Games", zh: "沉浸式游戏", ja: "没入型ゲーム", ko: "몰입형 게임" } },
      { value: 'news', label: { en: "News/Twitter scrolling", zh: "刷新闻/推特", ja: "ニュース/Twitterスクロール", ko: "ニュース/트위터 스크롤" } },
      { value: 'chores', label: { en: "Cleaning/Organizing", zh: "打扫卫生/整理东西", ja: "掃除/整理", ko: "청소/정리" } }
    ]
  },
  {
    id: 'q12',
    text: {
      en: "How many browser tabs do you usually have open?",
      zh: "你通常会打开多少个浏览器标签页？",
      ja: "通常、ブラウザのタブをいくつ開いていますか？",
      ko: "보통 브라우저 탭을 몇 개나 열어둡니까?"
    },
    options: [
      { value: 'minimal', label: { en: "1-5", zh: "1-5个", ja: "1-5個", ko: "1-5개" } },
      { value: 'manageable', label: { en: "6-15", zh: "6-15个", ja: "6-15個", ko: "6-15개" } },
      { value: 'chaos', label: { en: "20+", zh: "20个以上", ja: "20個以上", ko: "20개 이상" } },
      { value: 'hoarder', label: { en: "Too many to count (invisible icons)", zh: "多到数不清 (图标都挤没了)", ja: "数え切れない（アイコンが見えない）", ko: "셀 수 없음 (아이콘이 안 보임)" } }
    ]
  },
  {
    id: 'q13',
    text: {
      en: "If your phone buzzes while working, what do you do?",
      zh: "工作时手机震动了，你会怎么办？",
      ja: "仕事中に携帯が振動したらどうしますか？",
      ko: "일하는 중에 휴대폰이 울리면 어떻게 합니까?"
    },
    options: [
      { value: 'check', label: { en: "Check immediately", zh: "立刻查看", ja: "すぐに確認する", ko: "즉시 확인한다" } },
      { value: 'glance', label: { en: "Glance but don't unlock", zh: "瞄一眼但不解锁", ja: "ちらっと見るがロック解除しない", ko: "힐끗 보지만 잠금 해제는 안 한다" } },
      { value: 'ignore', label: { en: "Ignore it completely", zh: "完全无视", ja: "完全に無視する", ko: "완전히 무시한다" } },
      { value: 'anxiety', label: { en: "Try to ignore but feel anxious", zh: "试图无视但感到焦虑", ja: "無視しようとするが不安になる", ko: "무시하려고 하지만 불안하다" } }
    ]
  },
  {
    id: 'q14',
    text: {
      en: "Can you watch a movie without looking at your phone?",
      zh: "你能看整场电影而不看手机吗？",
      ja: "携帯を見ずに映画を見ることができますか？",
      ko: "휴대폰を安易に見ずに映画を見ることができますか？"
    },
    options: [
      { value: 'yes', label: { en: "Yes, easily", zh: "可以，很轻松", ja: "はい、簡単に", ko: "네, 쉽게 가능합니다" } },
      { value: 'hard', label: { en: "It's hard, I check occasionally", zh: "很难，偶尔会看", ja: "難しい、時々確認する", ko: "어렵습니다, 가끔 확인합니다" } },
      { value: 'impossible', label: { en: "No, I need a second screen", zh: "不行，我需要第二屏幕", ja: "いいえ、セカンドスクリーンが必要", ko: "아니요, 세컨드 스크린이 필요합니다" } },
      { value: 'theater', label: { en: "Only in a theater", zh: "只有在电影院里行", ja: "映画館でのみ", ko: "영화관에서만 가능합니다" } }
    ]
  },
  {
    id: 'q15',
    text: {
      en: "What breaks your focus most often?",
      zh: "什么最常打断你的注意力？",
      ja: "何が最も頻繁に集中を途切れさせますか？",
      ko: "무엇이 집중력을 가장 자주 깨뜨립니까?"
    },
    options: [
      { value: 'external', label: { en: "Noise/People", zh: "噪音/别人干扰", ja: "騒音/人", ko: "소음/사람" } },
      { value: 'internal', label: { en: "My own random thoughts", zh: "我自己的胡思乱想", ja: "自分のランダムな思考", ko: "내 머릿속의 잡생각" } },
      { value: 'hunger', label: { en: "Hunger/Thirst/Bathroom", zh: "饿了/渴了/上厕所", ja: "空腹/喉の渇き/トイレ", ko: "배고픔/목마름/화장실" } },
      { value: 'boredom', label: { en: "Sheer boredom", zh: "纯粹的无聊", ja: "純粋な退屈", ko: "순수한 지루함" } }
    ]
  },
  // --- AUTONOMY & REBELLION (16-20) ---
  {
    id: 'q16',
    text: {
      en: "When someone tells you to do something, how do you feel?",
      zh: "当别人命令你做某事时，你什么感觉？",
      ja: "誰かに何かをするように言われたとき、どう感じますか？",
      ko: "누군가 시키는 일을 할 때 어떤 기분이 듭니까?"
    },
    options: [
      { value: 'resist', label: { en: "I want to do it LESS now", zh: "我现在更不想做了", ja: "やる気が失せる", ko: "더 하기 싫어짐" } },
      { value: 'neutral', label: { en: "I just do it", zh: "做就做呗", ja: "ただやるだけ", ko: "그냥 함" } },
      { value: 'anxious', label: { en: "I feel pressure to please them", zh: "感到压力，想取悦对方", ja: "喜ばせなければというプレッシャー", ko: "잘 보여야 한다는 압박감을 느낌" } },
      { value: 'angry', label: { en: "I feel angry/resentful", zh: "感到愤怒/怨恨", ja: "怒り/憤りを感じる", ko: "화가 나고 억울함" } }
    ]
  },
  {
    id: 'q17',
    text: {
      en: "Do you procrastinate on things you actually WANT to do?",
      zh: "你会拖延那些你其实“想做”的事情吗（比如爱好）？",
      ja: "実際に「やりたい」ことでも先延ばしにしますか（趣味など）？",
      ko: "실제로 '하고 싶은' 일도 미루나요 (취미 등)?"
    },
    options: [
      { value: 'yes', label: { en: "Yes, I can't even start hobbies", zh: "是的，连爱好都开始不了", ja: "はい、趣味さえ始められない", ko: "네, 취미조차 시작 못 함" } },
      { value: 'no', label: { en: "No, only work/chores", zh: "不，只拖延工作/家务", ja: "いいえ、仕事/家事のみ", ko: "아니요, 일/집안일만 미룸" } },
      { value: 'sometimes', label: { en: "Sometimes, if it feels like 'work'", zh: "有时候，如果它搞得像“工作”一样", ja: "時々、それが「仕事」のように感じる場合", ko: "가끔, 그게 '일'처럼 느껴지면" } },
      { value: 'energy', label: { en: "Only when I'm exhausted", zh: "只有在精疲力尽的时候", ja: "疲れているときのみ", ko: "지쳤을 때만" } }
    ]
  },
  {
    id: 'q18',
    text: {
      en: "Do you stay up late for 'Me Time' (Revenge Bedtime Procrastination)?",
      zh: "你会熬夜来享受“由于时间”吗（报复性熬夜）？",
      ja: "「自分の時間」のために夜更かししますか（リベンジ夜更かし）？",
      ko: "'나만의 시간'을 위해 늦게까지 깨어 있습니까 (보복성 취침 미루기)?"
    },
    options: [
      { value: 'every_night', label: { en: "Every night, it's my only freedom", zh: "每晚都熬，这是我唯一的自由", ja: "毎晩、それが唯一の自由", ko: "매일 밤, 그게 내 유일한 자유임" } },
      { value: 'sometimes', label: { en: "Sometimes", zh: "有时候", ja: "時々", ko: "가끔" } },
      { value: 'rarely', label: { en: "No, I value sleep", zh: "不，我更看重睡觉", ja: "いいえ、睡眠を重視する", ko: "아니요, 잠이 더 중요함" } },
      { value: 'insomnia', label: { en: "I try to sleep but can't", zh: "我想睡但睡不着", ja: "寝ようとするが眠れない", ko: "자려고 하는데 잠이 안 옴" } }
    ]
  },
  {
    id: 'q19',
    text: {
      en: "Do you feel like 'Future You' is a different person?",
      zh: "你觉得“未来的你”是另一个人吗？",
      ja: "「未来の自分」は別人だと感じますか？",
      ko: "'미래의 나'는 다른 사람이라고 느껴집니까?"
    },
    options: [
      { value: 'yes_superhero', label: { en: "Yes, Future Me has infinite energy", zh: "是的，未来的我无所不能", ja: "はい、未来の自分は無限のエネルギーを持っている", ko: "네, 미래의 나는 에너지가 무한함" } },
      { value: 'yes_enemy', label: { en: "Yes, and I hate giving him work", zh: "是的，我讨厌给他派活", ja: "はい、彼に仕事を与えるのが嫌い", ko: "네, 그 녀석한테 일 시키는 게 싫음" } },
      { value: 'connected', label: { en: "No, I worry about him/her", zh: "不，我很担心未来的自己", ja: "いいえ、彼/彼女のことを心配している", ko: "아니요, 미래의 내가 걱정됨" } },
      { value: 'numb', label: { en: "I don't think about the future", zh: "我不思考未来", ja: "未来については考えない", ko: "미래에 대해 생각 안 함" } }
    ]
  },
  {
    id: 'q20',
    text: {
      en: "Why do you usually complete a task eventually?",
      zh: "通常是什么让你最终完成了任务？",
      ja: "通常、最終的にタスクを完了させる理由は何ですか？",
      ko: "결국 과제를 완료하게 만드는 원동력은 무엇입니까?"
    },
    options: [
      { value: 'fear', label: { en: "Terror of consequences", zh: "对后果的极度恐惧", ja: "結果への恐怖", ko: "결과에 대한 공포" } },
      { value: 'shame', label: { en: "Shame of letting people down", zh: "让别人失望的羞耻感", ja: "人を失望させることへの恥", ko: "남들을 실망시키는 것에 대한 부끄러움" } },
      { value: 'flow', label: { en: "I finally found it interesting", zh: "终于觉得这事儿有点意思了", ja: "ついにそれが面白いと感じた", ko: "드디어 흥미를 느낌" } },
      { value: 'nagging', label: { en: "Someone wouldn't stop nagging", zh: "有人唠叨个没完", ja: "誰かがしつこく言ってくる", ko: "누가 계속 잔소리해서" } }
    ]
  },
  // --- PHYSIOLOGY & ENERGY (21-25) ---
  {
    id: 'q21',
    text: {
      en: "When is your brain most clear?",
      zh: "你的大脑什么时候最清醒？",
      ja: "脳が最も冴えているのはいつですか？",
      ko: "머리가 가장 맑을 때는 언제입니까?"
    },
    options: [
      { value: 'morning', label: { en: "Early Morning", zh: "清晨", ja: "早朝", ko: "이른 아침" } },
      { value: 'night', label: { en: "Late Night (Vampire mode)", zh: "深夜 (吸血鬼模式)", ja: "深夜 (吸血鬼モード)", ko: "심야 (뱀파이어 모드)" } },
      { value: 'afternoon', label: { en: "Afternoon", zh: "下午", ja: "午後", ko: "오후" } },
      { value: 'random', label: { en: "Completely random / Never", zh: "完全随机 / 没清醒过", ja: "完全にランダム / 決してない", ko: "완전 랜덤 / 맑은 적이 없음" } }
    ]
  },
  {
    id: 'q22',
    text: {
      en: "How does your body feel when you have a big task?",
      zh: "面对大任务时，你的身体感觉如何？",
      ja: "大きなタスクがあるとき、体はどう感じますか？",
      ko: "큰 과제가 있을 때 몸 상태는 어떻습니까?"
    },
    options: [
      { value: 'heavy', label: { en: "Physically heavy/lethargic", zh: "身体沉重/嗜睡", ja: "物理的に重い/無気力", ko: "몸이 무겁고 무기력함" } },
      { value: 'tense', label: { en: "Tense shoulders/jaw", zh: "肩膀/下巴紧绷", ja: "肩/顎が緊張する", ko: "어깨/턱이 긴장됨" } },
      { value: 'jittery', label: { en: "Restless/Leg shaking", zh: "坐立不安/抖腿", ja: "落ち着かない/足が震える", ko: "안절부절못함/다리 떨림" } },
      { value: 'normal', label: { en: "Normal", zh: "正常", ja: "普通", ko: "정상" } }
    ]
  },
  {
    id: 'q23',
    text: {
      en: "Do you rely on caffeine/sugar to start?",
      zh: "你需要咖啡因或糖分才能开始工作吗？",
      ja: "始めるためにカフェイン/糖分に頼りますか？",
      ko: "시작하기 위해 카페인/설탕에 의존합니까?"
    },
    options: [
      { value: 'heavy', label: { en: "Yes, I can't function without it", zh: "是的，没这些我废了", ja: "はい、それがないと機能しません", ko: "네, 없으면 작동 불가" } },
      { value: 'moderate', label: { en: "It helps, but not mandatory", zh: "有帮助，但不是必须", ja: "助けになるが必須ではない", ko: "도움은 되지만 필수는 아님" } },
      { value: 'no', label: { en: "No", zh: "不需要", ja: "いいえ", ko: "아니요" } },
      { value: 'crash', label: { en: "Yes, but I crash hard later", zh: "是，但之后会崩溃", ja: "はい、でも後でひどく落ち込む", ko: "네, 하지만 나중에 급격히 피로해짐" } }
    ]
  },
  {
    id: 'q24',
    text: {
      en: "How is your sleep quality?",
      zh: "你的睡眠质量如何？",
      ja: "睡眠の質はどうですか？",
      ko: "수면의 질은 어떻습니까?"
    },
    options: [
      { value: 'poor', label: { en: "Terrible / Irregular", zh: "很差 / 不规律", ja: "ひどい / 不規則", ko: "끔찍함 / 불규칙함" } },
      { value: 'oversleep', label: { en: "I sleep too much (Escape)", zh: "睡太多 (逃避现实)", ja: "寝すぎる (現実逃避)", ko: "너무 많이 잠 (도피)" } },
      { value: 'good', label: { en: "Good", zh: "不错", ja: "良い", ko: "좋음" } },
      { value: 'variable', label: { en: "Depends on my stress", zh: "看压力大不大", ja: "ストレスによる", ko: "스트레스에 따라 다름" } }
    ]
  },
  {
    id: 'q25',
    text: {
      en: "Do you exercise?",
      zh: "你锻炼身体吗？",
      ja: "運動しますか？",
      ko: "運動をしますか？"
    },
    options: [
      { value: 'regular', label: { en: "Yes, regularly", zh: "是的，很规律", ja: "はい、定期的に", ko: "네, 규칙적으로" } },
      { value: 'rarely', label: { en: "Rarely", zh: "很少", ja: "稀に", ko: "거의 안 함" } },
      { value: 'planning', label: { en: "I plan to, but don't", zh: "总計画要去，但没去", ja: "計画するが、しない", ko: "계획은 하지만 안 함" } },
      { value: 'hate', label: { en: "I hate moving", zh: "我讨厌動", ja: "動くのが嫌い", ko: "움직이는 게 싫음" } }
    ]
  },
  // --- ENVIRONMENT & SOCIAL (26-30) ---
  {
    id: 'q26',
    text: {
      en: "What does your workspace look like right now?",
      zh: "你现在的工作区域长什么样？",
      ja: "現在のワークスペースはどのような状態ですか？",
      ko: "지금 작업 공간은 어떤 모습입니까?"
    },
    options: [
      { value: 'messy', label: { en: "Cluttered chaos", zh: "乱七八糟", ja: "散らかったカオス", ko: "난장판" } },
      { value: 'minimal', label: { en: "Clean / Minimal", zh: "干净 / 极简", ja: "清潔 / ミニマル", ko: "깨끗함 / 미니멀" } },
      { value: 'bed', label: { en: "I work from bed/couch", zh: "我在床上/沙发上工作", ja: "ベッド/ソファで仕事をする", ko: "침대/소파에서 일함" } },
      { value: 'public', label: { en: "Coffee shop / Library", zh: "咖啡店 / 图书馆", ja: "カフェ / 図書館", ko: "카페 / 도서관" } }
    ]
  },
  {
    id: 'q27',
    text: {
      en: "Do you work better with people around?",
      zh: "周围有人你会工作得更好吗？",
      ja: "周りに人がいる方が仕事が捗りますか？",
      ko: "주변에 사람이 있으면 일을 더 잘합니까?"
    },
    options: [
      { value: 'yes', label: { en: "Yes (Body Doubling)", zh: "是的 (同伴效应)", ja: "はい (ボディ・ダブリング)", ko: "네 (바디 더블링)" } },
      { value: 'no', label: { en: "No, they distract me", zh: "不，他们会让我分心", ja: "いいえ、気が散る", ko: "아니요, 산만해짐" } },
      { value: 'anxious', label: { en: "No, I feel watched", zh: "不，感觉被监视很焦虑", ja: "いいえ、見られている気がして不安", ko: "아니요, 감시당하는 것 같아 불안함" } },
      { value: 'noise', label: { en: "I need noise but no interaction", zh: "我需要背景音但别理我", ja: "雑音は必要だが交流は不要", ko: "소음은 필요하지만 대화는 싫음" } }
    ]
  },
  {
    id: 'q28',
    text: {
      en: "Are your goals clearly defined?",
      zh: "你的目标定义清晰吗？",
      ja: "目標は明確に定義されていますか？",
      ko: "목표가 명확하게 정의되어 있습니까?"
    },
    options: [
      { value: 'vague', label: { en: "Vague (e.g., 'Work on project')", zh: "很模糊 (比如: '搞下项目')", ja: "曖昧 (例: 'プロジェクトに取り組む')", ko: "모호함 (예: '프로젝트 작업하기')" } },
      { value: 'clear', label: { en: "Specific (e.g., 'Write 200 words')", zh: "很具体 (比如: '写200字')", ja: "具体的 (例: '200語書く')", ko: "구체적임 (예: '200단어 쓰기')" } },
      { value: 'huge', label: { en: "Huge (e.g., 'Change my life')", zh: "极其宏大 (比如: '改变人生')", ja: "巨大 (例: '人生を変える')", ko: "거대함 (예: '인생 바꾸기')" } },
      { value: 'none', label: { en: "I don't set goals", zh: "我不设目标", ja: "目標を設定しない", ko: "목표 설정 안 함" } }
    ]
  },
  {
    id: 'q29',
    text: {
      en: "Do you tell others about your goals?",
      zh: "你会告诉别人你的目标吗？",
      ja: "自分の目標を他人に話しますか？",
      ko: "목표를 남들에게 말합니까?"
    },
    options: [
      { value: 'yes', label: { en: "Yes, for accountability", zh: "会，为了有人监督", ja: "はい、説明責任のために", ko: "네, 책임감을 느끼기 위해" } },
      { value: 'premature', label: { en: "Yes, and then I feel like I did it", zh: "会，说完感觉就像做完了一样", ja: "はい、そしてやった気になる", ko: "네, 말하고 나면 이미 다 한 기분이 듦" } },
      { value: 'no', label: { en: "No, I keep them secret", zh: "不，我保密", ja: "いいえ、秘密にする", ko: "아니요, 비밀로 함" } },
      { value: 'lie', label: { en: "I lie about my progress", zh: "我会谎报进度", ja: "進捗について嘘をつく", ko: "진행 상황에 대해 거짓말함" } }
    ]
  },
  {
    id: 'q30',
    text: {
      en: "What is your relationship with 'Lists'?",
      zh: "你和“清单”的关系是怎样的？",
      ja: "「リスト」との関係はどうですか？",
      ko: "'목록'과의 관계는 어떻습니까?"
    },
    options: [
      { value: 'hoard', label: { en: "I make lists of lists but do nothing", zh: "我列了一堆清单，但从不执行", ja: "リストのリストを作るが何もしない", ko: "목록의 목록을 만들지만 아무것도 안 함" } },
      { value: 'ignore', label: { en: "I lose the list immediately", zh: "写完就找不到清单了", ja: "すぐにリストをなくす", ko: "쓰자마자 목록 잃어버림" } },
      { value: 'live', label: { en: "I live by my list", zh: "没有清单我就活不了", ja: "リストに従って生きている", ko: "목록 없이는 못 삼" } },
      { value: 'mental', label: { en: "I keep it all in my head (and forget)", zh: "都在脑子里 (然后忘了)", ja: "全て頭の中にある（そして忘れる）", ko: "다 머릿속에 있음 (그리고 까먹음)" } }
    ]
  },
];
