const CACHE = [],
  KEY_TRANSCRIPT_IDS = "hangouts",
  APPLICATION_SPEECH_IDS = "speeches",
  SEARCH_TEXT_NO_MEETING_NAME = "Meeting details";
let SPEAKER_NAME_MAP,
  TRANSCRIPT_FORMAT_SPEAKER,
  TRANSCRIPT_FORMAT_SPEAKER_JOIN,
  TRANSCRIPT_FORMAT_SESSION_JOIN,
  TRANSCRIPT_FORMAT_MEETING,
  DEBUG;
const XPATH_SELECTOR_PARTICIPANTS =
    "//div[@aria-label='Show everyone']//*[@d='M15 8c0-1.42-.5-2.73-1.33-3.76.42-.14.86-.24 1.33-.24 2.21 0 4 1.79 4 4s-1.79 4-4 4c-.43 0-.84-.09-1.23-.21-.03-.01-.06-.02-.1-.03A5.98 5.98 0 0 0 15 8zm1.66 5.13C18.03 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.58-3.47-6.34-3.87zM9 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 9c-2.7 0-5.8 1.29-6 2.01V18h12v-1c-.2-.71-3.3-2-6-2M9 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 9c2.67 0 8 1.34 8 4v3H1v-3c0-2.66 5.33-4 8-4z']",
  XPATH_SELECTOR_PARTICIPANTS_V20210602 =
    "//button[@aria-label='Show everyone'] | //button[@aria-label='Mostrar a todos'] | //button[@aria-label='显示所有人'] |//button[@aria-label='顯示所有參與者'] |//button[@aria-label='顯示所有人'] | //button[@aria-label='Alle anzeigen'] | //button[@aria-label='Afficher tout le monde'] | //button[@aria-label='全員を表示'] | //button[@aria-label='Mostra tutti'] | //button[@aria-label='Mostrar todas as pessoas'] | //button[@aria-label='Mostrar todos']",
  XPATH_SELECTOR_CHAT =
    "//div[@aria-label='Chat with everyone']//*[@d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H4V4h16v12z']",
  XPATH_SELECTOR_CHAT_V20210602 =
    "//button[@aria-label='Chat with everyone'] | //button[@aria-label='Chatear con todos'] | //button[@aria-label='与所有人聊天'] | //button[@aria-label='與所有參與者進行即時通訊'] | //button[@aria-label='同所有人即時通訊'] | //button[@aria-label='Mit allen chatten'] | //button[@aria-label='Clavarder avec tout le monde'] | //button[@aria-label='全員とチャット'] | //button[@aria-label='Chatta con tutti'] | //button[@aria-label='Conversar com todos'] | //button[@aria-label='Discuter avec tous les participants'] | //button[@aria-label='Chat com todos']",
  XPATH_TURN_ON_CAPTIONS_BUTTON =
    "//div[text()='Turn on captions']/ancestor::div[@role='button']",
  XPATH_TURN_ON_CAPTIONS_BUTTON_V20210602 =
    "//button[contains(@aria-label, 'Turn on captions')] | //button[contains(@aria-label, 'Untertitel aktivieren')] | //button[contains(@aria-label, 'Activer les sous-titres')] | //button[contains(@aria-label, 'Activar subtítulos')] | //button[contains(@aria-label, 'Attiva sottotitoli')] | //button[contains(@aria-label, '字幕をオンにする')]",
  XPATH_TURN_OFF_CAPTIONS_BUTTON =
    "//div[text()='Turn off captions']/ancestor::div[@role='button']",
  XPATH_TURN_OFF_CAPTIONS_BUTTON_V20210602 =
    "//button[contains(@aria-label, 'Turn off captions')] | //button[contains(@aria-label, 'Untertitel deaktivieren')] | //button[contains(@aria-label, 'Désactiver les sous-titres')] | //button[contains(@aria-label, 'Desactivar subtítulos')] | //button[contains(@aria-label, 'Disattiva sottotitoli')]  | //button[contains(@aria-label, '字幕をオフにする')]",
  XPATH_CAPTION_OPEN_TOAST = "//div[contains(@id, 'J9Hpafc')]",
  XPATH_CAPTION_OPEN_TOAST_V20210602 = "//div[contains(@id, 'J9Hpafc')]",
  XPATH_TITLE = "//div[contains(@jscontroller,'WEGDee')]",
  XPATH_TITLE_V20220324 = "//div[contains(@jscontroller,'yEvoid')]",
  XPATH_TITLE_TOOLTIP = "//div[contains(@id,'tooltip-c15')]";
let captionsContainer = null,
  closedCaptionsAttachInterval = null,
  isTranscribing = !1,
  weTurnedCaptionsOn = !1,
  currentTranscriptId = null,
  currentSessionIndex = null,
  firstStart = !0,
  loadLocalStorage = 0,
  startTimeStored = null,
  loginStatus = 0,
  appUser = "You";
