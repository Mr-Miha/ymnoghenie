'use strict';

const STORAGE_KEY = 'rex-multiplication-v1';
const NUMBERS = Array.from({ length: 10 }, (_, index) => index + 1);
const STAGE_LABELS = [
  'Целое яйцо',
  'Трещинка',
  'Малыш',
  'Взрослый'
];
const STAGE_TOASTS = [
  'Начало!',
  'Трещинка!',
  'Малыш вылупился!',
  'Динозавр вырос!'
];
const PRAISE = [
  'Верно!',
  'Отлично!',
  'Супер!',
  'Ты молодец!',
  'Точно!',
  'Рекс рад!'
];
const ENCOURAGE = [
  'Почти! Посчитаем вместе.',
  'Не спеши. Смотри на яйца.',
  'Ошибка — не беда.',
  'Давай посчитаем яйца.'
];
const DINOS = [
  { id: 'velociraptor', name: 'Велоцираптор', emoji: '🦖', color: '#e39b24', fact: 'Быстрый охотник размером с индейку.' },
  { id: 'stegosaurus', name: 'Стегозавр', emoji: '🦕', color: '#2aa66b', fact: 'Пластины на спине и шипы на хвосте.' },
  { id: 'triceratops', name: 'Трицератопс', emoji: '🦖', color: '#c26c22', fact: 'Три рога и костяной воротник.' },
  { id: 'brachiosaurus', name: 'Брахиозавр', emoji: '🦕', color: '#328fad', fact: 'Доставал листья с макушек деревьев.' },
  { id: 'ankylosaurus', name: 'Анкилозавр', emoji: '🦖', color: '#7a6bcf', fact: 'Весь в броне, а хвост — булава.' },
  { id: 'parasaurolophus', name: 'Паразауролоф', emoji: '🦕', color: '#d87545', fact: 'Трубил через гребень на голове.' },
  { id: 'diplodocus', name: 'Диплодок', emoji: '🦕', color: '#1d9777', fact: 'Шея и хвост длиной в несколько автобусов.' },
  { id: 'trex', name: 'Тираннозавр', emoji: '🦖', color: '#b85742', fact: 'Огромные зубы и крошечные лапки.' },
  { id: 'allosaurus', name: 'Аллозавр', emoji: '🦖', color: '#a65a2e', fact: 'Сильный хищник с гребнями над глазами.' },
  { id: 'apatosaurus', name: 'Апатозавр', emoji: '🦕', color: '#3f9a5c', fact: 'Спокойный великан, ел листья весь день.' },
  { id: 'iguanodon', name: 'Игуанодон', emoji: '🦕', color: '#4a8fb8', fact: 'Большой палец — как шип.' },
  { id: 'megalosaurus', name: 'Мегалозавр', emoji: '🦖', color: '#9b5f3a', fact: 'Первый динозавр, описанный учёными.' },
  { id: 'centrosaurus', name: 'Кентрозавр', emoji: '🦕', color: '#5c9e7d', fact: 'Носил костяные шипы на спине.' },
  { id: 'ceratosaurus', name: 'Цератозавр', emoji: '🦖', color: '#c76a4a', fact: 'Рог на носу и острые зубы.' },
  { id: 'compsognathus', name: 'Компсогнат', emoji: '🦖', color: '#d8a13f', fact: 'Маленький, как курица, и очень шустрый.' },
  { id: 'gallimimus', name: 'Галлимим', emoji: '🦖', color: '#8fae4a', fact: 'Бегал как страус на длинных ногах.' },
  { id: 'deinonychus', name: 'Дейноних', emoji: '🦖', color: '#b86b3c', fact: 'Серп-коготь на каждой лапе.' },
  { id: 'oviraptor', name: 'Овираптор', emoji: '🦖', color: '#d1833f', fact: 'Согревал яйца, как наседка.' },
  { id: 'protoceratops', name: 'Протоцератопс', emoji: '🦕', color: '#a98a4a', fact: 'Маленький родственник трицератопса.' },
  { id: 'pachycephalosaurus', name: 'Пахицефалозавр', emoji: '🦖', color: '#7d8f4f', fact: 'Голова-шлем из толстой кости.' },
  { id: 'styracosaurus', name: 'Стиракозавр', emoji: '🦖', color: '#c06f2e', fact: 'Длинный рог на носу и шипы.' },
  { id: 'edmontosaurus', name: 'Эдмонтозавр', emoji: '🦕', color: '#6a9a6a', fact: 'Утиный клюв помогал жевать растения.' },
  { id: 'corythosaurus', name: 'Коритозавр', emoji: '🦕', color: '#4f9e8f', fact: 'Гребень на голове — как труба.' },
  { id: 'lambeosaurus', name: 'Ламбеозавр', emoji: '🦕', color: '#5b8fbe', fact: 'Гребень-трубач на голове.' },
  { id: 'saurolophus', name: 'Зауролоф', emoji: '🦕', color: '#b58a44', fact: 'Трубил через гребень, как тромбон.' },
  { id: 'maiasaura', name: 'Майазавр', emoji: '🦕', color: '#8f7a5a', fact: 'Заботливо охранял гнёзда.' },
  { id: 'troodon', name: 'Троодон', emoji: '🦖', color: '#7a6bb0', fact: 'Умный, с большими глазами.' },
  { id: 'therizinosaurus', name: 'Теризинозавр', emoji: '🦕', color: '#9a7f4a', fact: 'Огромные когти, но ел траву.' },
  { id: 'giganotosaurus', name: 'Гиганотозавр', emoji: '🦖', color: '#a94f3f', fact: 'Крупнее тираннозавра.' },
  { id: 'spinosaurus', name: 'Спинозавр', emoji: '🦖', color: '#3f7f9e', fact: 'Парус на спине и морда рыболова.' },
  { id: 'carnotaurus', name: 'Карнотавр', emoji: '🦖', color: '#b3643f', fact: 'Быстрый, с рожками над глазами.' },
  { id: 'abelisaurus', name: 'Абелизавр', emoji: '🦖', color: '#8f5a44', fact: 'Короткая морда и острые зубы.' },
  { id: 'mamenchisaurus', name: 'Маменчизавр', emoji: '🦕', color: '#3f8f7a', fact: 'Самая длинная шея среди динозавров.' },
  { id: 'zupaysaurus', name: 'Зупайзавр', emoji: '🦖', color: '#6f6fae', fact: 'Быстрый хищник с гребнями.' },
  { id: 'brontosaurus', name: 'Бронтозавр', emoji: '🦕', color: '#4a8f5f', fact: 'Тяжёлый великан с длинной шеей.' },
  { id: 'camarasaurus', name: 'Камаразавр', emoji: '🦕', color: '#5f8f5a', fact: 'Огромный, с маленькой головой.' },
  { id: 'nigersaurus', name: 'Нигерзавр', emoji: '🦕', color: '#8a8f4a', fact: 'Больше всего зубов — как щётка.' },
  { id: 'rebbachisaurus', name: 'Ребахизавр', emoji: '🦕', color: '#4f8f9e', fact: 'Длинная морда, как у крокодила.' },
  { id: 'ouranosaurus', name: 'Уранозавр', emoji: '🦕', color: '#b0873f', fact: 'Парус на спине — для тепла или красоты.' },
  { id: 'quetzalcoatlus', name: 'Кетцалькоатль', emoji: '🦅', color: '#7a5fa8', fact: 'Гигантский летун с огромными крыльями.' },
  { id: 'pteranodon', name: 'Птеранодон', emoji: '🦅', color: '#4f8fb8', fact: 'Летал на крыльях, как самолётик.' },
  { id: 'rhamphorhynchus', name: 'Рампоринх', emoji: '🦅', color: '#5f9e7a', fact: 'Длинный клюв рыболова.' },
  { id: 'dimorphodon', name: 'Диморфодон', emoji: '🦅', color: '#a8743f', fact: 'Два разных зуба — вот и имя.' },
  { id: 'ichthyosaurus', name: 'Ихтиозавр', emoji: '🐊', color: '#3f8f9e', fact: 'Плавал как дельфин.' },
  { id: 'plesiosaurus', name: 'Плезиозавр', emoji: '🐢', color: '#4a8f9a', fact: 'Длинная шея и ласты вместо лап.' },
  { id: 'liopleurodon', name: 'Лиоплевродон', emoji: '🐊', color: '#3f6f8f', fact: 'Морской хищник с зубами-кинжалами.' },
  { id: 'archelon', name: 'Архелон', emoji: '🐢', color: '#6a8f6a', fact: 'Огромная древняя черепаха.' },
  { id: 'dunkleosteus', name: 'Дункелостеус', emoji: '🐟', color: '#6f7f9e', fact: 'Рыба-броненосец с пластинами.' },
  { id: 'meganeura', name: 'Меганевра', emoji: '🦗', color: '#7a9e4a', fact: 'Стрекоза размером с ворону.' },
  { id: 'archaeopteryx', name: 'Археоптерикс', emoji: '🐦', color: '#a97f4a', fact: 'Древняя птица с зубами и перьями.' },
  { id: 'microraptor', name: 'Микрораптор', emoji: '🦖', color: '#6a6fb0', fact: 'Четыре крыла и перья, как у птицы.' },
  { id: 'utahraptor', name: 'Ютараптор', emoji: '🦖', color: '#b06a3f', fact: 'Большой серповидный коготь.' },
  { id: 'dromaeosaurus', name: 'Дромеозавр', emoji: '🦖', color: '#8f6a5a', fact: 'Быстрый бегун с перьями.' },
  { id: 'saurornitholestes', name: 'Заврорнитолестес', emoji: '🦖', color: '#9a7a4a', fact: 'Мелкий, но с острыми когтями.' },
  { id: 'sauroposeidon', name: 'Завропосейдон', emoji: '🦕', color: '#3f8f6f', fact: 'Один из самых больших динозавров.' },
  { id: 'argentinosaurus', name: 'Аргентинозавр', emoji: '🦕', color: '#4f8f5f', fact: 'Тяжеловесный великан.' },
  { id: 'patagotitan', name: 'Патаготитан', emoji: '🦕', color: '#5a9a6f', fact: 'Огромный, но нашли лишь кости.' },
  { id: 'dreadnoughtus', name: 'Дредноут', emoji: '🦕', color: '#6a8f5f', fact: 'Гигант с именем «неустрашимый».' },
  { id: 'amargasaurus', name: 'Амаргазавр', emoji: '🦕', color: '#4a9e8a', fact: 'Диплодок с шипами на шее.' },
  { id: 'baryonyx', name: 'Барионикс', emoji: '🦖', color: '#3f8f8a', fact: 'Ловил рыбу большим когтем.' },
  { id: 'sinornithosaurus', name: 'Синорнитозавр', emoji: '🦖', color: '#8f7f4a', fact: 'Маленький, с длинными лапами.' },
  { id: 'psittacosaurus', name: 'Пситтакозавр', emoji: '🦕', color: '#a98a3f', fact: 'Клюв, как у попугая.' },
  { id: 'scelidosaurus', name: 'Скутеллозавр', emoji: '🦕', color: '#7a8f5a', fact: 'Маленький динозавр в броне.' },
  { id: 'lesothosaurus', name: 'Лесотозавр', emoji: '🦕', color: '#6f9a5f', fact: 'Маленький растительноядный динозавр.' },
  { id: 'plateosaurus', name: 'Платеозавр', emoji: '🦕', color: '#8a8f3f', fact: 'Один из первых крупных динозавров.' },
  { id: 'eoraptor', name: 'Эораптор', emoji: '🦖', color: '#c08a3f', fact: 'Один из самых древних динозавров.' },
  { id: 'deinocheirus', name: 'Дейнохейрус', emoji: '🦕', color: '#8f8f5a', fact: 'Руки длиной почти три метра.' }
];
const EGG_CRACK_SVG = `
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M41 12L32 29L43 38L31 52L42 63L35 82" stroke="#90681f" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42 38L54 45L49 55" stroke="#90681f" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M32 29L24 35" stroke="#90681f" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`;
const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function defaultState() {
  return {
    version: 1,
    soundOn: true,
    activeNumber: 3,
    progress: Object.fromEntries(NUMBERS.map((number) => [number, []])),
    totalCorrect: 0,
    totalWrong: 0,
    unlockedDinos: []
  };
}

function loadState() {
  const base = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== 'object') return base;

    base.soundOn = saved.soundOn !== false;
    base.activeNumber = clamp(Number(saved.activeNumber) || 3, 1, 10);
    base.totalCorrect = Math.max(0, Number(saved.totalCorrect) || 0);
    base.totalWrong = Math.max(0, Number(saved.totalWrong) || 0);

    NUMBERS.forEach((number) => {
      const savedProgress = saved.progress && saved.progress[number];
      if (Array.isArray(savedProgress)) {
        base.progress[number] = [...new Set(savedProgress.map(Number))]
          .filter((multiplier) => multiplier >= 1 && multiplier <= 10)
          .sort((a, b) => a - b);
      }
    });

    if (Array.isArray(saved.unlockedDinos)) {
      const validIds = new Set(DINOS.map((dino) => dino.id));
      base.unlockedDinos = [...new Set(saved.unlockedDinos.filter((id) => validIds.has(id)))];
    }

    return base;
  } catch (error) {
    return base;
  }
}

let state = loadState();

const ui = {
  currentScreen: 'home',
  learnStep: 0,
  feed: {
    a: 0,
    b: 0,
    answer: 0,
    locked: false,
    solved: 0,
    streak: 0,
    nextTimer: null
  },
  save: {
    a: 0,
    b: 0,
    answer: 0,
    input: '',
    locked: false,
    series: 0,
    nextTimer: null
  },
  table: { a: 3, b: 4 },
  lab: { a: 3, b: 4 },
  lastFocused: null,
  toastTimer: null
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(list) {
  return list[randomInt(0, list.length - 1)];
}

function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function pluralRu(number, one, few, many) {
  const lastTwo = number % 100;
  const last = number % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return many;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;
  return many;
}

function eggsWord(number) {
  return pluralRu(number, 'яйцо', 'яйца', 'яиц');
}

function groupsWord(number) {
  return pluralRu(number, 'гнездо', 'гнезда', 'гнёзд');
}

function timesWord(number) {
  return pluralRu(number, 'раз', 'раза', 'раз');
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // Игра продолжает работать, даже если браузер запретил сохранение.
  }
}

function getProgressCount(number) {
  return state.progress[number] ? state.progress[number].length : 0;
}

function stageForCount(count) {
  if (count >= 8) return 3;
  if (count >= 4) return 2;
  if (count >= 1) return 1;
  return 0;
}

function isFactLearned(number, multiplier) {
  return Boolean(state.progress[number] && state.progress[number].includes(multiplier));
}

function markFact(number, multiplier) {
  if (!state.progress[number]) state.progress[number] = [];
  if (state.progress[number].includes(multiplier)) return false;
  state.progress[number].push(multiplier);
  state.progress[number].sort((a, b) => a - b);
  saveState();
  renderNumberGrid();
  return true;
}

function announce(message) {
  const region = $('#liveRegion');
  if (!region) return;
  region.textContent = '';
  window.setTimeout(() => {
    region.textContent = message;
  }, 35);
}

function showToast(message, type = 'success') {
  const toast = $('#toast');
  if (!toast) return;
  window.clearTimeout(ui.toastTimer);
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  ui.toastTimer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

function burstConfetti(x, y, count = 14) {
  if (PREFERS_REDUCED_MOTION) return;
  const symbols = ['🌿', '✨', '⭐', '🍃', '💚', '🥚'];
  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = symbols[index % symbols.length];
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.setProperty('--dx', `${randomInt(-105, 105)}px`);
    piece.style.setProperty('--dy', `${randomInt(-120, 45)}px`);
    piece.style.setProperty('--rot', `${randomInt(-220, 220)}deg`);
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 1050);
  }
}

function burstFromElement(element) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

/* Звуки через Web Audio API */
let audioContext = null;

function ensureAudio() {
  if (!state.soundOn) return null;
  try {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      audioContext = new AudioContextClass();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }
    return audioContext;
  } catch (error) {
    return null;
  }
}

function playTone(frequency, delay = 0, duration = 0.18, type = 'sine', volume = 0.045) {
  if (!state.soundOn) return;
  const context = ensureAudio();
  if (!context) return;
  const start = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.03);
}

function playClick() {
  playTone(640, 0, 0.055, 'triangle', 0.022);
}

function playSuccess() {
  [523.25, 659.25, 783.99, 1046.5].forEach((note, index) => {
    playTone(note, index * 0.085, 0.24, 'sine', 0.045);
  });
}

function playError() {
  playTone(392, 0, 0.18, 'sine', 0.035);
  playTone(329.63, 0.12, 0.24, 'sine', 0.03);
}

function playHatch() {
  [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((note, index) => {
    playTone(note, index * 0.085, 0.28, index % 2 ? 'triangle' : 'sine', 0.04);
  });
  playTone(1567.98, 0.44, 0.35, 'sine', 0.025);
}

function updateSoundButton() {
  const button = $('#soundToggle');
  if (!button) return;
  button.setAttribute('aria-pressed', String(state.soundOn));
  button.setAttribute('aria-label', 'Звук');
  button.setAttribute('title', state.soundOn ? 'Выключить звук' : 'Включить звук');
  const icon = $('.sound-icon', button);
  const label = $('.sound-label', button);
  if (icon) icon.textContent = state.soundOn ? '🔊' : '🔇';
  if (label) label.textContent = 'Звук';
}

function toggleSound() {
  state.soundOn = !state.soundOn;
  saveState();
  updateSoundButton();
  if (state.soundOn) {
    ensureAudio();
    playClick();
    showToast('Звук включён. Рекс снова слышит тебя!', 'success');
  } else {
    showToast('Звук выключен. Можно играть тихо.', 'success');
  }
  announce(state.soundOn ? 'Звук включён' : 'Звук выключен');
}

/* Главный экран и карта */
function renderNumberGrid() {
  const grid = $('#numberGrid');
  if (!grid) return;
  grid.innerHTML = NUMBERS.map((number, index) => {
    const learned = getProgressCount(number);
    const stage = stageForCount(learned);
    const isActive = number === state.activeNumber;
    const dinoEmoji = number % 2 === 0 ? '🦕' : '🦖';
    const stageLabel = STAGE_LABELS[stage];
    return `
      <button class="number-card stage-${stage}${isActive ? ' active' : ''}" type="button"
        data-number="${number}" style="--i:${index}" aria-pressed="${isActive}"
        aria-label="Умножение на ${number}. ${stageLabel}. Освоено ${learned}/10.">
        <span class="num-badge" aria-hidden="true">${number}</span>
        <span class="egg-stage" aria-hidden="true">
          <span class="egg-glow"></span>
          <span class="egg-bg"></span>
          <span class="egg-cracks">${EGG_CRACK_SVG}</span>
          <span class="hatchling">${dinoEmoji}</span>
          <span class="adult">${dinoEmoji}<span class="adult-spark">✨</span></span>
        </span>
        <span class="number-title">Умножение на ${number}</span>
        <span class="stage-caption">${stageLabel}</span>
        <span class="mini-progress" aria-hidden="true"><span style="width:${learned * 10}%"></span></span>
        <span class="mini-count">${learned}/10</span>
      </button>`;
  }).join('');
}

function syncNumberCardSelection() {
  $$('.number-card').forEach((card) => {
    const isActive = Number(card.dataset.number) === state.activeNumber;
    card.classList.toggle('active', isActive);
    card.setAttribute('aria-pressed', String(isActive));
  });
}

function syncActiveNumberLabels() {
  $$('.js-active-number').forEach((element) => {
    element.textContent = String(state.activeNumber);
  });
}

function updateHomeSpeechForNumber() {
  const speech = $('#homeSpeech');
  if (!speech) return;
  const number = state.activeNumber;
  const messages = {
    1: 'Единица не меняет число.',
    2: 'Двойка удваивает.',
    3: 'Считаем тройками!',
    4: 'Четыре — это два раза по два.',
    5: 'Пятёрки: в конце 0 или 5.',
    6: 'Шесть — это пять и ещё один.',
    7: 'Семёрку разложим на части.',
    8: 'Восемь — четыре, удвоенное дважды.',
    9: 'У девятки есть секрет.',
    10: 'Десятка: просто нолик.'
  };
  speech.textContent = messages[number];
}

function renderCollectionPreview() {
  const preview = $('#collectionPreview');
  if (!preview) return;
  const unlocked = DINOS.filter((dino) => state.unlockedDinos.includes(dino.id));
  if (!unlocked.length) {
    preview.innerHTML = '<span class="empty-collection">🥚 Пока пусто — спаси первое яйцо!</span>';
    return;
  }
  const shown = unlocked.slice(0, 14);
  const extra = unlocked.length - shown.length;
  preview.innerHTML = `
    <span class="sr-only">Спасено динозавров: ${unlocked.length} из ${DINOS.length}.</span>
    ${shown.map((dino) => `
    <span class="dino-mini" style="--c:${dino.color}" title="${dino.name}" aria-hidden="true">
      <span>${dino.emoji}</span>
    </span>`).join('')}
    ${extra > 0 ? `<span class="dino-mini dino-more" aria-hidden="true">+${extra}</span>` : ''}`;
}

function renderSaveCollection() {
  const container = $('#saveCollection');
  const counter = $('#saveCollectionCount');
  if (!container) return;
  const unlocked = DINOS.filter((dino) => state.unlockedDinos.includes(dino.id));
  if (counter) counter.textContent = `${unlocked.length}/${DINOS.length}`;
  if (!unlocked.length) {
    container.innerHTML = '<span class="empty-collection">Пока пусто — спаси яйцо!</span>';
    return;
  }
  container.innerHTML = `
    <span class="sr-only">Спасено динозавров: ${unlocked.length} из ${DINOS.length}.</span>
    ${unlocked.slice(-6).map((dino) => `
    <span class="dino-mini" style="--c:${dino.color}" title="${dino.name}" aria-hidden="true">
      <span>${dino.emoji}</span>
    </span>`).join('')}`;
}

function updateStatsUI() {
  const dinos = state.unlockedDinos.length;
  if ($('#statDinos')) $('#statDinos').textContent = String(dinos);
  if ($('#statCorrect')) $('#statCorrect').textContent = String(state.totalCorrect);
  if ($('#collectionModeCount')) $('#collectionModeCount').textContent = `${dinos} из ${DINOS.length}`;
  renderSaveCollection();
}

function renderHome() {
  renderNumberGrid();
  syncActiveNumberLabels();
  updateStatsUI();
  renderCollectionPreview();
  updateHomeSpeechForNumber();
}

function setActiveNumber(number, { announceChange = false } = {}) {
  state.activeNumber = clamp(Number(number) || 3, 1, 10);
  saveState();
  syncNumberCardSelection();
  syncActiveNumberLabels();
  updateHomeSpeechForNumber();
  if (announceChange) {
    announce(`Выбрано число ${state.activeNumber}`);
  }
}

function showScreen(screenName) {
  ui.currentScreen = screenName;
  $$('.screen').forEach((screen) => {
    screen.classList.toggle('active', screen.id === `screen-${screenName}`);
  });
  const activeScreen = $(`#screen-${screenName}`);
  if (activeScreen) {
    activeScreen.focus({ preventScroll: true });
  }
  window.scrollTo({ top: 0, behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth' });
}

function clearModeTimers() {
  if (ui.feed.nextTimer) {
    window.clearTimeout(ui.feed.nextTimer);
    ui.feed.nextTimer = null;
  }
  if (ui.save.nextTimer) {
    window.clearTimeout(ui.save.nextTimer);
    ui.save.nextTimer = null;
  }
}

function goHome() {
  clearModeTimers();
  closeAllModals();
  showScreen('home');
  renderHome();
}

function handleMode(mode) {
  switch (mode) {
    case 'learn':
      openLearn(state.activeNumber);
      break;
    case 'feed':
      openFeed(state.activeNumber);
      break;
    case 'save':
      openSave(state.activeNumber);
      break;
    case 'table':
      openTable();
      break;
    case 'lab':
      openLab();
      break;
    case 'collection':
      openCollection();
      break;
    default:
      break;
  }
}

/* Группы и сложение */
function groupsHTML(groups, items, compact = false) {
  const groupCards = Array.from({ length: groups }, (_, groupIndex) => {
    const eggs = Array.from({ length: items }, (_, eggIndex) => (
      `<span class="egg-item" style="--ei:${Math.min(eggIndex, 12)}" aria-hidden="true">🥚</span>`
    )).join('');
    return `
      <div class="group-card" style="--gi:${groupIndex}">
        <div class="group-head">
          <span>Гнездо ${groupIndex + 1}</span>
          <span>${items} ${eggsWord(items)}</span>
        </div>
        <div class="group-items">${eggs}</div>
      </div>`;
  }).join('');

  return `
    <div class="groups-viz${compact ? ' compact' : ''}" aria-hidden="true">
      ${groupCards}
    </div>
    <span class="sr-only">${groups} ${groupsWord(groups)} по ${items} ${eggsWord(items)}. Всего ${groups * items}.</span>`;
}

function additionCardHTML(groups, items, { showResult = true, label = 'Замена сложением', caption = '' } = {}) {
  const terms = Array.from({ length: groups }, (_, index) => {
    const plus = index > 0 ? '<span class="op">+</span>' : '';
    return `${plus}<span class="term">${items}</span>`;
  }).join('');
  const result = showResult
    ? `<span class="term total">${groups * items}</span>`
    : '<span class="term unknown">?</span>';
  return `
    <div class="addition-card">
      <span class="addition-label">${label}</span>
      <div class="terms">${terms}<span class="op">=</span>${result}</div>
      ${caption ? `<p class="addition-caption">${caption}</p>` : ''}
    </div>`;
}

function renderHelpInto(container, groups, items, { place = 'выбери ответ' } = {}) {
  if (!container) return;
  container.hidden = false;
  container.innerHTML = `
    <div class="help-head">
      <span class="help-head-icon" aria-hidden="true">🦖</span>
      <div>
        <b>Считаем вместе: ${groups} × ${items}</b>
        <p>${groups} ${groupsWord(groups)} по ${items} ${eggsWord(items)}. Посчитай и ${place}.</p>
      </div>
    </div>
    ${groupsHTML(groups, items, true)}
    ${additionCardHTML(groups, items, {
      showResult: false,
      label: 'Сложение',
      caption: `Число ${items} повторяется ${groups} ${timesWord(groups)}. Досчитай!`
    })}
    <p class="help-note">Не торопись.</p>`;
}

/* Режим 1: изучаем */
function openLearn(number = state.activeNumber) {
  setActiveNumber(number);
  clearModeTimers();
  ui.learnStep = 0;
  showScreen('learn');
  renderLearn();
  announce(`Открыт режим изучения умножения на ${state.activeNumber}`);
}

function getTip(number, multiplier) {
  if (multiplier === 1) {
    return `Один раз — столько же: ${number} × 1 = ${number}.`;
  }
  if (number === 1) {
    return `Единица не меняет число: 1 × ${multiplier} = ${multiplier}.`;
  }
  switch (number) {
    case 2:
      return `Удвой: ${multiplier} + ${multiplier} = ${number * multiplier}.`;
    case 3:
      return `Три раза по ${multiplier}: ${number * multiplier}.`;
    case 4:
      return `Удвой дважды: ${2 * multiplier}, потом ${4 * multiplier}.`;
    case 5:
      return `В конце 0 или 5: ${number * multiplier}.`;
    case 6:
      return `Пять раз и ещё один: ${5 * multiplier} + ${multiplier}.`;
    case 7:
      return `Разложи на 5 и 2: ${5 * multiplier} + ${2 * multiplier}.`;
    case 8:
      return `Дважды по ${4 * multiplier}: ${8 * multiplier}.`;
    case 9:
      return `Умножь на 10 и вычти: ${10 * multiplier} − ${multiplier} = ${9 * multiplier}.`;
    case 10:
      return `Припиши нолик: ${10 * multiplier}.`;
    default:
      return `Прибавляй по ${multiplier}: ${number * multiplier}.`;
  }
}

function renderLearn() {
  const number = state.activeNumber;
  const multiplier = ui.learnStep + 1;
  const result = number * multiplier;
  const currentStage = stageForCount(getProgressCount(number));
  const learned = isFactLearned(number, multiplier);

  if ($('#learnStepChip')) $('#learnStepChip').textContent = String(ui.learnStep + 1);
  if ($('#learnEquation')) {
    $('#learnEquation').innerHTML = `
      <span class="eq-part"><span>${number}</span><span class="times">×</span><span>${multiplier}</span></span>
      <span class="eq-equals">=</span>
      <span class="eq-result">${result}</span>`;
  }
  if ($('#learnGroupsSummary')) {
    $('#learnGroupsSummary').textContent = `${number} ${groupsWord(number)} по ${multiplier} ${eggsWord(multiplier)}`;
  }
  if ($('#learnGroups')) {
    $('#learnGroups').innerHTML = groupsHTML(number, multiplier);
  }
  if ($('#learnAddition')) {
    $('#learnAddition').innerHTML = additionCardHTML(number, multiplier, {
      showResult: true,
      label: 'То же сложением',
      caption: `Число ${multiplier} повторяется ${number} ${timesWord(number)}. Итого ${result}.`
    });
  }
  if ($('#learnTip')) {
    $('#learnTip').textContent = getTip(number, multiplier);
  }
  if ($('#learnSpeech')) {
    $('#learnSpeech').textContent = `Смотри: ${number} ${groupsWord(number)} по ${multiplier} ${eggsWord(multiplier)}. Всего ${result}.`;
  }
  if ($('#learnInsight')) {
    const chips = Array.from({ length: 10 }, (_, index) => {
      const value = number * (index + 1);
      return `<span class="rhythm-chip${index === ui.learnStep ? ' current' : ''}">${value}</span>`;
    }).join('');
    $('#learnInsight').innerHTML = `
      <span class="insight-title">Ритм</span>
      <p>Ответы растут на <b>${number}</b>. Можно переставить: <b>${multiplier} × ${number} = ${result}</b>.</p>
      <div class="rhythm-chips" role="group" aria-label="Ритм чисел при умножении на ${number}">${chips}</div>`;
  }

  const prevButton = $('#learnPrev');
  const nextButton = $('#learnNext');
  const rememberButton = $('#learnRemember');
  if (prevButton) prevButton.disabled = ui.learnStep === 0;
  if (nextButton) nextButton.textContent = ui.learnStep === 9 ? 'К тренировке →' : 'Дальше →';
  if (rememberButton) {
    rememberButton.disabled = learned;
    rememberButton.textContent = learned ? '✅ Уже в копилке' : '✅ Запомнить пример';
  }

  const dots = $('#learnDots');
  if (dots) {
    dots.innerHTML = Array.from({ length: 10 }, (_, index) => {
      const multiplierForDot = index + 1;
      const isDone = isFactLearned(number, multiplierForDot);
      const isCurrent = index === ui.learnStep;
      return `<button class="lesson-dot${isDone ? ' done' : ''}${isCurrent ? ' current' : ''}" type="button"
        data-step="${index}" aria-label="Пример ${number} умножить на ${multiplierForDot}" aria-current="${isCurrent}">${multiplierForDot}</button>`;
    }).join('');
  }

  const stageAfter = stageForCount(getProgressCount(number));
  if (stageAfter > currentStage && $('#learnSpeech')) {
    $('#learnSpeech').textContent = STAGE_TOASTS[stageAfter];
  }
}

function rememberCurrentFact() {
  const number = state.activeNumber;
  const multiplier = ui.learnStep + 1;
  const stageBefore = stageForCount(getProgressCount(number));
  const added = markFact(number, multiplier);
  if (!added) {
    showToast('Этот пример уже в твоей копилке.', 'success');
    return;
  }
  const stageAfter = stageForCount(getProgressCount(number));
  if (stageAfter > stageBefore) {
    showToast(STAGE_TOASTS[stageAfter], 'success');
  } else {
    showToast(`Готово! ${number} × ${multiplier} = ${number * multiplier}.`, 'success');
  }
  playSuccess();
  burstFromElement($('#learnRemember'));
  announce(`Пример ${number} умножить на ${multiplier} запомнен`);
  renderLearn();
  updateStatsUI();
}

/* Режим 2: покорми динозавра */
function makeChoices(correct) {
  const candidates = new Set([correct]);
  const nearby = [
    correct + 1,
    correct - 1,
    correct + 2,
    correct - 2,
    correct + 3,
    correct - 3,
    correct + 10,
    correct - 10
  ];
  shuffle(nearby).forEach((value) => {
    if (value > 0 && candidates.size < 4) candidates.add(value);
  });
  while (candidates.size < 4) {
    const value = randomInt(1, 110);
    if (value !== correct) candidates.add(value);
  }
  return shuffle([...candidates]);
}

function updateFeedScore() {
  if ($('#feedSolved')) $('#feedSolved').textContent = String(ui.feed.solved);
  if ($('#feedStreak')) $('#feedStreak').textContent = String(ui.feed.streak);
}

function stopFeedTimer() {
  if (ui.feed.nextTimer) {
    window.clearTimeout(ui.feed.nextTimer);
    ui.feed.nextTimer = null;
  }
}

function openFeed(number = state.activeNumber) {
  setActiveNumber(number);
  stopFeedTimer();
  ui.feed.solved = 0;
  ui.feed.streak = 0;
  showScreen('feed');
  nextFeedQuestion();
  announce(`Открыт режим «Покорми динозавра». Число ${state.activeNumber}`);
}

function nextFeedQuestion() {
  stopFeedTimer();
  const previousB = ui.feed.b;
  let multiplier = randomInt(1, 10);
  for (let attempt = 0; attempt < 5 && multiplier === previousB; attempt += 1) {
    multiplier = randomInt(1, 10);
  }
  ui.feed.a = state.activeNumber;
  ui.feed.b = multiplier;
  ui.feed.answer = ui.feed.a * multiplier;
  ui.feed.locked = false;

  if ($('#feedQuestion')) {
    $('#feedQuestion').innerHTML = `${ui.feed.a}<span class="q-times"> × </span>${multiplier}<span class="q-result"> = ?</span>`;
  }
  if ($('#feedOptions')) {
    const choices = makeChoices(ui.feed.answer);
    $('#feedOptions').innerHTML = choices.map((value, index) => `
      <button class="leaf-option" type="button" data-value="${value}" style="--oi:${index}" aria-label="Ответ ${value}">
        <span class="leaf-value">${value}</span>
      </button>`).join('');
  }
  const help = $('#feedHelp');
  if (help) {
    help.hidden = true;
    help.innerHTML = '';
  }
  const feedback = $('#feedFeedback');
  if (feedback) {
    feedback.textContent = '';
    feedback.className = 'feedback-line';
  }
  if ($('#feedSpeech')) {
    $('#feedSpeech').textContent = pickRandom([
      'Я голоден! Выбери верный лист.',
      'Сначала реши пример.',
      'Найди верный ответ.',
      'Считай внимательно.'
    ]);
  }
  updateFeedScore();
  announce(`Пример: ${ui.feed.a} умножить на ${multiplier}. Выбери ответ.`);
}

function handleFeedCorrect(button) {
  ui.feed.locked = true;
  $$('#feedOptions .leaf-option').forEach((option) => {
    option.disabled = true;
  });
  button.classList.add('correct');

  const stageBefore = stageForCount(getProgressCount(ui.feed.a));
  const praise = pickRandom(PRAISE);
  state.totalCorrect += 1;
  ui.feed.solved += 1;
  ui.feed.streak += 1;
  markFact(ui.feed.a, ui.feed.b);
  saveState();
  updateStatsUI();
  updateFeedScore();

  const feedback = $('#feedFeedback');
  if (feedback) {
    feedback.textContent = `${praise} ${ui.feed.a} × ${ui.feed.b} = ${ui.feed.answer}.`;
    feedback.className = 'feedback-line';
  }
  if ($('#feedSpeech')) $('#feedSpeech').textContent = praise;
  const help = $('#feedHelp');
  if (help) help.hidden = true;

  const stageAfter = stageForCount(getProgressCount(ui.feed.a));
  if (stageAfter > stageBefore) showToast(STAGE_TOASTS[stageAfter], 'success');
  playSuccess();
  burstFromElement(button);
  announce(`Верно! ${ui.feed.a} умножить на ${ui.feed.b} равно ${ui.feed.answer}`);

  stopFeedTimer();
  ui.feed.nextTimer = window.setTimeout(() => {
    if (ui.currentScreen === 'feed' && !document.querySelector('.modal-backdrop.open')) {
      nextFeedQuestion();
    }
  }, 1450);
}

function handleFeedWrong(button) {
  const feedback = $('#feedFeedback');
  ui.feed.streak = 0;
  state.totalWrong += 1;
  saveState();
  updateFeedScore();
  button.classList.add('wrong');
  button.disabled = true;
  playError();

  if (feedback) {
    feedback.textContent = pickRandom(ENCOURAGE);
    feedback.className = 'feedback-line error';
  }
  if ($('#feedSpeech')) {
    $('#feedSpeech').textContent = 'Не спеши. Посмотри на гнёзда и посчитай.';
  }
  renderHelpInto($('#feedHelp'), ui.feed.a, ui.feed.b, { place: 'выбери новый ответ' });
  const help = $('#feedHelp');
  if (help) {
    help.scrollIntoView({ block: 'nearest', behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth' });
  }
  announce(`Пока неверно. Посчитай яйца ещё раз.`);
}

function showFeedHint() {
  if (ui.feed.locked) return;
  renderHelpInto($('#feedHelp'), ui.feed.a, ui.feed.b, { place: 'выбери ответ' });
  if ($('#feedSpeech')) {
    $('#feedSpeech').textContent = `Смотри: ${ui.feed.a} ${groupsWord(ui.feed.a)} по ${ui.feed.b} ${eggsWord(ui.feed.b)}. Посчитай и выбери ответ.`;
  }
  const help = $('#feedHelp');
  if (help) {
    help.scrollIntoView({ block: 'nearest', behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth' });
  }
  announce('Подсказка открыта. Посчитай яйца в каждом гнезде.');
}

/* Режим 3: спаси яйцо */
function stopSaveTimer() {
  if (ui.save.nextTimer) {
    window.clearTimeout(ui.save.nextTimer);
    ui.save.nextTimer = null;
  }
}

function openSave(number = state.activeNumber) {
  setActiveNumber(number);
  stopSaveTimer();
  showScreen('save');
  nextSaveQuestion();
  announce(`Открыт режим «Спаси яйцо». Число ${state.activeNumber}`);
}

function nextSaveQuestion() {
  stopSaveTimer();
  const previousB = ui.save.b;
  let multiplier = randomInt(1, 10);
  for (let attempt = 0; attempt < 5 && multiplier === previousB; attempt += 1) {
    multiplier = randomInt(1, 10);
  }
  ui.save.a = state.activeNumber;
  ui.save.b = multiplier;
  ui.save.answer = ui.save.a * multiplier;
  ui.save.input = '';
  ui.save.locked = false;

  const help = $('#saveHelp');
  if (help) {
    help.hidden = true;
    help.innerHTML = '';
  }
  const feedback = $('#saveFeedback');
  if (feedback) {
    feedback.textContent = '';
    feedback.className = 'feedback-line';
  }
  if ($('#saveSpeech')) {
    $('#saveSpeech').textContent = pickRandom([
      'Реши пример и набери ответ.',
      'Считай группы и вводи ответ.',
      'Пять верных — и яйцо спасено.',
      'Нужна помощь? Нажми «Подсказка».'
    ]);
  }
  if ($('#saveEgg')) $('#saveEgg').textContent = '🥚';
  renderSave();
  announce(`Пример: ${ui.save.a} умножить на ${ui.save.b}. Введи ответ.`);
}

function updateSaveSeriesUI() {
  const series = clamp(ui.save.series, 0, 5);
  const dots = $('#saveSeriesDots');
  if (dots) {
    dots.innerHTML = Array.from({ length: 5 }, (_, index) => {
      const filled = index < series;
      const current = index === series;
      return `<span class="series-egg${filled ? ' filled' : ''}${current ? ' current' : ''}" aria-hidden="true">${filled ? '🥚' : '·'}</span>`;
    }).join('');
    dots.setAttribute('aria-label', `Правильных ответов: ${series} из 5`);
  }
  if ($('#saveSeriesCount')) $('#saveSeriesCount').textContent = String(series);
  if ($('#saveSeriesText')) {
    if (series >= 5) {
      $('#saveSeriesText').textContent = 'Яйцо спасено!';
    } else {
      const remaining = 5 - series;
      $('#saveSeriesText').textContent = `Осталось: ${remaining} ${pluralRu(remaining, 'ответ', 'ответа', 'ответов')}.`;
    }
  }
  const egg = $('#saveEgg');
  if (egg) {
    egg.classList.toggle('cracked', series >= 2 && series < 4);
    egg.classList.toggle('ready', series >= 4);
    if (series >= 5) egg.textContent = '🐣';
  }
}

function updateSaveAnswer() {
  const display = $('#saveAnswer');
  if (!display) return;
  if (ui.save.locked && ui.save.input === '') return;
  if (!ui.save.locked) display.classList.remove('correct', 'wrong');
  display.textContent = ui.save.input || '?';
  display.classList.toggle('empty', !ui.save.input);
  display.classList.toggle('filled', Boolean(ui.save.input));
}

function renderSave() {
  const number = ui.save.a || state.activeNumber;
  const multiplier = ui.save.b || 1;
  if ($('#saveExpr')) $('#saveExpr').textContent = `${number} × ${multiplier} =`;
  updateSaveAnswer();
  updateSaveSeriesUI();
  renderSaveCollection();
}

function handleSaveKey(key) {
  if (ui.save.locked) return;
  if (key === 'clear') {
    ui.save.input = ui.save.input.slice(0, -1);
  } else if (key === 'check') {
    submitSaveAnswer();
    return;
  } else if (/^\d$/.test(key) && ui.save.input.length < 3) {
    ui.save.input += key;
  }
  const display = $('#saveAnswer');
  if (display) {
    display.classList.remove('wrong', 'correct');
  }
  updateSaveAnswer();
}

function submitSaveAnswer() {
  if (ui.save.locked) return;
  if (!ui.save.input) {
    const feedback = $('#saveFeedback');
    if (feedback) {
      feedback.textContent = 'Сначала набери ответ цифрами, а потом проверь.';
      feedback.className = 'feedback-line error';
    }
    playError();
    announce('Сначала введи ответ');
    return;
  }

  const display = $('#saveAnswer');
  const feedback = $('#saveFeedback');
  const entered = Number(ui.save.input);
  const isCorrect = entered === ui.save.answer;

  if (isCorrect) {
    ui.save.locked = true;
    const stageBefore = stageForCount(getProgressCount(ui.save.a));
    state.totalCorrect += 1;
    ui.save.series = clamp(ui.save.series + 1, 0, 5);
    markFact(ui.save.a, ui.save.b);
    saveState();
    updateStatsUI();
    updateSaveSeriesUI();

    if (display) {
      display.textContent = ui.save.input;
      display.className = 'answer-display correct';
    }
    if (feedback) {
      feedback.textContent = `${pickRandom(PRAISE)} ${ui.save.a} × ${ui.save.b} = ${ui.save.answer}.`;
      feedback.className = 'feedback-line';
    }
    if ($('#saveSpeech')) $('#saveSpeech').textContent = pickRandom(PRAISE);
    playSuccess();
    burstFromElement(display);
    announce(`Верно! ${ui.save.a} умножить на ${ui.save.b} равно ${ui.save.answer}`);

    const stageAfter = stageForCount(getProgressCount(ui.save.a));
    if (stageAfter > stageBefore) showToast(STAGE_TOASTS[stageAfter], 'success');

    if (ui.save.series >= 5) {
      if ($('#saveEgg')) $('#saveEgg').textContent = '🐣';
      ui.save.nextTimer = window.setTimeout(() => {
        if (ui.currentScreen !== 'save') return;
        const dino = unlockNextDino();
        showReward(dino);
      }, 850);
    } else {
      ui.save.nextTimer = window.setTimeout(() => {
        if (ui.currentScreen === 'save' && !document.querySelector('.modal-backdrop.open')) {
          nextSaveQuestion();
        }
      }, 1150);
    }
  } else {
    state.totalWrong += 1;
    saveState();
    playError();
    if (display) {
      display.textContent = ui.save.input || '?';
      display.className = 'answer-display wrong';
    }
    if (feedback) {
      feedback.textContent = pickRandom(ENCOURAGE);
      feedback.className = 'feedback-line error';
    }
    if ($('#saveSpeech')) {
      $('#saveSpeech').textContent = 'Посмотри на гнёзда. Посчитай и введи ответ.';
    }
    renderHelpInto($('#saveHelp'), ui.save.a, ui.save.b, { place: 'введи ответ' });
    const help = $('#saveHelp');
    if (help) {
      help.scrollIntoView({ block: 'nearest', behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth' });
    }
    announce(`Пока неверно. Посчитай яйца ещё раз.`);
    ui.save.input = '';
    window.setTimeout(() => {
      if (ui.currentScreen === 'save' && !ui.save.locked && ui.save.input === '') {
        if (display) display.className = 'answer-display empty';
        updateSaveAnswer();
      }
    }, 750);
  }
}

function showSaveHint() {
  if (ui.save.locked) return;
  renderHelpInto($('#saveHelp'), ui.save.a, ui.save.b, { place: 'введи ответ' });
  if ($('#saveSpeech')) {
    $('#saveSpeech').textContent = `Смотри: ${ui.save.a} ${groupsWord(ui.save.a)} по ${ui.save.b} ${eggsWord(ui.save.b)}. Посчитай и введи ответ.`;
  }
  const help = $('#saveHelp');
  if (help) {
    help.scrollIntoView({ block: 'nearest', behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth' });
  }
  announce('Подсказка открыта. Посчитай яйца и введи ответ.');
}

/* Коллекция и награды */
function renderCollection() {
  const grid = $('#collectionGrid');
  const summary = $('#collectionSummary');
  if (!grid) return;
  const unlockedCount = state.unlockedDinos.length;
  if (summary) {
    if (unlockedCount === DINOS.length) {
      summary.textContent = 'Вся коллекция собрана! Рекс гордится тобой!';
    } else {
      summary.textContent = `Открыто ${unlockedCount} из ${DINOS.length}. Спасай яйца — и знакомься с новыми друзьями.`;
    }
  }
  grid.innerHTML = DINOS.map((dino) => {
    const unlocked = state.unlockedDinos.includes(dino.id);
    return `
      <article class="dino-card${unlocked ? '' : ' locked'}" style="--dino-color:${dino.color}">
        <div class="dino-avatar" aria-hidden="true">${unlocked ? dino.emoji : '🥚'}</div>
        <h3>${unlocked ? dino.name : 'Загадка'}</h3>
        <p>${unlocked ? dino.fact : 'Реши 5 примеров'}</p>
      </article>`;
  }).join('');
}

function unlockNextDino() {
  const nextDino = DINOS.find((dino) => !state.unlockedDinos.includes(dino.id));
  if (!nextDino) return null;
  state.unlockedDinos.push(nextDino.id);
  saveState();
  updateStatsUI();
  renderCollectionPreview();
  renderSaveCollection();
  return nextDino;
}

function showReward(dino) {
  const modal = $('#rewardModal');
  if (!modal) return;
  const finalReward = !dino;
  if ($('#rewardStage')) {
    $('#rewardStage').innerHTML = finalReward
      ? '<span class="reward-egg">🏆</span><span class="reward-dino">🦖</span>'
      : `<span class="reward-egg">🥚</span><span class="reward-dino">${dino.emoji}</span>`;
  }
  if ($('#rewardTitle')) {
    $('#rewardTitle').textContent = finalReward ? 'Все динозавры спасены!' : dino.name;
  }
  if ($('#rewardFact')) {
    $('#rewardFact').textContent = finalReward
      ? 'Ты собрал всех динозавров!'
      : dino.fact;
  }
  const eyebrow = $('.eyebrow', modal);
  if (eyebrow) eyebrow.textContent = finalReward ? 'Коллекция собрана' : 'Новый друг в коллекции';
  openModal(modal, '#rewardCloseBtn');
  playHatch();
  window.setTimeout(() => {
    if (modal.classList.contains('open')) {
      burstConfetti(window.innerWidth / 2, window.innerHeight * 0.42, 24);
    }
  }, 620);
  announce(finalReward ? 'Коллекция собрана полностью!' : `Новый динозавр в коллекции: ${dino.name}`);
}

function closeRewardAndContinue() {
  const modal = $('#rewardModal');
  if (modal) closeModal(modal, false);
  if (ui.currentScreen === 'save') {
    ui.save.series = 0;
    nextSaveQuestion();
  }
}

function openCollection() {
  renderCollection();
  openModal($('#collectionModal'), '.modal-close');
  announce('Открыта коллекция динозавров');
}

function openModal(modal, focusSelector) {
  if (!modal || !modal.hidden) return;
  ui.lastFocused = document.activeElement;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  // Принудительный reflow, чтобы анимация сработала без requestAnimationFrame.
  void modal.offsetWidth;
  modal.classList.add('open');
  const focusTarget = focusSelector ? $(focusSelector, modal) : $('.modal-card', modal);
  if (focusTarget) focusTarget.focus({ preventScroll: true });
}

function closeModal(modal, restoreFocus = true) {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
  window.setTimeout(() => {
    modal.hidden = true;
  }, 220);
  if (restoreFocus && ui.lastFocused && document.contains(ui.lastFocused)) {
    ui.lastFocused.focus({ preventScroll: true });
  }
}

function closeAllModals() {
  $$('.modal-backdrop').forEach((modal) => {
    modal.classList.remove('open');
    modal.hidden = true;
  });
  document.body.classList.remove('modal-open');
}

/* Таблица Пифагора */
function buildPythTable() {
  const table = $('#pythTable');
  if (!table) return;
  let html = '<div class="pyth-corner" aria-hidden="true">×</div>';
  for (let column = 1; column <= 10; column += 1) {
    html += `<div class="pyth-head" data-col="${column}" role="columnheader">${column}</div>`;
  }
  for (let row = 1; row <= 10; row += 1) {
    html += `<div class="pyth-head" data-row="${row}" role="rowheader">${row}</div>`;
    for (let column = 1; column <= 10; column += 1) {
      html += `<button class="pyth-cell" type="button" role="gridcell" data-a="${row}" data-b="${column}"
        aria-label="${row} умножить на ${column} равно ${row * column}">${row * column}</button>`;
    }
  }
  table.innerHTML = html;
  updatePythTable(ui.table.a, ui.table.b, false);
}

function updatePythTable(row, column, shouldAnnounce = false) {
  if (!row || !column) return;
  ui.table = { a: row, b: column };
  const table = $('#pythTable');
  if (!table) return;

  $$('.pyth-cell', table).forEach((cell) => {
    const cellRow = Number(cell.dataset.a);
    const cellColumn = Number(cell.dataset.b);
    const inArea = cellRow <= row && cellColumn <= column;
    const selected = cellRow === row && cellColumn === column;
    cell.classList.toggle('in-area', inArea);
    cell.classList.toggle('is-selected', selected);
    cell.setAttribute('aria-selected', String(selected));
  });
  $$('.pyth-head[data-row]', table).forEach((head) => {
    head.classList.toggle('is-axis', Number(head.dataset.row) <= row);
  });
  $$('.pyth-head[data-col]', table).forEach((head) => {
    head.classList.toggle('is-axis', Number(head.dataset.col) <= column);
  });

  const result = row * column;
  if ($('#tableEquation')) {
    $('#tableEquation').innerHTML = `${row}<span class="times"> × </span>${column}<span class="eq-equals"> = </span><span class="eq-result">${result}</span>`;
  }
  if ($('#tableAddition')) {
    $('#tableAddition').innerHTML = additionCardHTML(row, column, {
      showResult: true,
      label: 'Разложение на сложение',
      caption: `Число ${column} повторяется ${row} ${timesWord(row)}.`
    });
  }
  if ($('#tableAreaText')) {
    $('#tableAreaText').textContent = `${row} × ${column} = ${result} ${pluralRu(result, 'клетка', 'клетки', 'клеток')}.`;
  }
  if ($('#tableCommutative')) {
    $('#tableCommutative').textContent = `Переставь: ${column} × ${row} = ${result}. Результат тот же.`;
  }
  if ($('#tableSpeech')) {
    $('#tableSpeech').textContent = pickRandom([
      `${row} × ${column} — это ${result} клеток.`,
      `${row} ${pluralRu(row, 'ряд', 'ряда', 'рядов')} по ${column}. Всего ${result}.`,
      `Прямоугольник ${row} на ${column} — это ${result}.`
    ]);
  }
  if (shouldAnnounce) {
    announce(`${row} умножить на ${column} равно ${result}`);
  }
}

function openTable() {
  showScreen('table');
  const column = state.activeNumber === 4 ? 3 : 4;
  updatePythTable(state.activeNumber, column, false);
  announce(`Таблица Пифагора. Выбран пример ${state.activeNumber} умножить на ${column}`);
}

/* Лаборатория умножения */
function dotArrayHTML(rows, columns, warm = false) {
  const dots = Array.from({ length: rows * columns }, () => '<i></i>').join('');
  return `<div class="dot-array${warm ? ' warm' : ''}" style="grid-template-columns:repeat(${columns}, max-content)"
    role="img" aria-label="${rows} рядов по ${columns} точек, всего ${rows * columns}">${dots}</div>`;
}

function renderLab() {
  const groups = clamp(ui.lab.a, 1, 10);
  const items = clamp(ui.lab.b, 1, 10);
  ui.lab = { a: groups, b: items };
  const result = groups * items;

  if ($('#labARange')) $('#labARange').value = String(groups);
  if ($('#labBRange')) $('#labBRange').value = String(items);
  if ($('#labAValue')) $('#labAValue').textContent = String(groups);
  if ($('#labBValue')) $('#labBValue').textContent = String(items);

  const aWord = $('#labAValue') ? $('#labAValue').parentElement.querySelector('span') : null;
  const bWord = $('#labBValue') ? $('#labBValue').parentElement.querySelector('span') : null;
  if (aWord) aWord.textContent = groupsWord(groups);
  if (bWord) bWord.textContent = eggsWord(items);

  if ($('#labEquation')) {
    $('#labEquation').innerHTML = `${groups}<span class="times"> × </span>${items}<span class="eq-equals"> = </span><span class="lab-total">${result}</span>`;
  }
  if ($('#labAddition')) {
    $('#labAddition').innerHTML = additionCardHTML(groups, items, {
      showResult: true,
      label: 'Сложение',
      caption: `Число ${items} повторяется ${groups} ${timesWord(groups)}.`
    });
  }
  if ($('#labGroupsSummary')) {
    $('#labGroupsSummary').textContent = `${groups} ${groupsWord(groups)} по ${items} ${eggsWord(items)}`;
  }
  if ($('#labGroups')) {
    $('#labGroups').innerHTML = groupsHTML(groups, items);
  }
  if ($('#labArrays')) {
    $('#labArrays').innerHTML = `
      <div class="array-demo">
        <span class="array-label">${groups} × ${items} = ${result}</span>
        ${dotArrayHTML(groups, items)}
      </div>
      <span class="lab-arrays-equals" aria-hidden="true">=</span>
      <div class="array-demo">
        <span class="array-label">${items} × ${groups} = ${result}</span>
        ${dotArrayHTML(items, groups, true)}
      </div>`;
  }
  if ($('#labSpeech')) {
    $('#labSpeech').textContent = `Вот ${groups} ${groupsWord(groups)} по ${items} ${eggsWord(items)}. Всего ${result}. А ${items} × ${groups} — тоже ${result}!`;
  }
}

function openLab() {
  showScreen('lab');
  renderLab();
  announce('Открыта лаборатория умножения');
}

/* Сброс прогресса */
function resetProgress() {
  const confirmed = window.confirm('Начать заново? Прогресс и коллекция очистятся.');
  if (!confirmed) return;
  const soundOn = state.soundOn;
  state = defaultState();
  state.soundOn = soundOn;
  saveState();
  ui.learnStep = 0;
  ui.feed.solved = 0;
  ui.feed.streak = 0;
  ui.feed.a = 0;
  ui.feed.b = 0;
  ui.save.series = 0;
  ui.save.a = 0;
  ui.save.b = 0;
  renderHome();
  buildPythTable();
  renderLab();
  updateSoundButton();
  showToast('Новое приключение начинается! Прогресс очищен.', 'success');
  announce('Прогресс очищен. Можно начать заново.');
}

/* События */
function attachEvents() {
  $('#brandBtn')?.addEventListener('click', goHome);
  $('#soundToggle')?.addEventListener('click', toggleSound);

  $('#continueBtn')?.addEventListener('click', () => openLearn(state.activeNumber));
  $('#chooseNumberBtn')?.addEventListener('click', () => {
    $('#mapSection')?.scrollIntoView({ behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth', block: 'start' });
    announce('Карта чисел открыта');
  });
  $('#startSelected')?.addEventListener('click', () => openLearn(state.activeNumber));

  $('#numberGrid')?.addEventListener('click', (event) => {
    const card = event.target.closest('.number-card');
    if (!card) return;
    setActiveNumber(card.dataset.number, { announceChange: true });
    if (state.activeNumber) {
      const learned = getProgressCount(state.activeNumber);
      const stage = stageForCount(learned);
      showToast(`Число ${state.activeNumber}: ${stage === 3 ? 'динозавр вырос!' : STAGE_LABELS[stage]}.`, 'success');
    }
  });

  $$('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => handleMode(button.dataset.mode));
  });
  $$('[data-go-home]').forEach((button) => {
    button.addEventListener('click', goHome);
  });

  $('#openCollectionBtn')?.addEventListener('click', openCollection);
  $$('[data-open-collection]').forEach((button) => {
    button.addEventListener('click', openCollection);
  });
  $$('[data-close-collection]').forEach((button) => {
    button.addEventListener('click', () => closeModal($('#collectionModal')));
  });
  $('#collectionModal')?.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeModal($('#collectionModal'));
  });

  $('#rewardCloseBtn')?.addEventListener('click', closeRewardAndContinue);
  $('#rewardModal')?.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeRewardAndContinue();
  });

  $('#resetProgressBtn')?.addEventListener('click', resetProgress);

  $('#learnPrev')?.addEventListener('click', () => {
    if (ui.learnStep <= 0) return;
    ui.learnStep -= 1;
    renderLearn();
    announce(`Пример ${state.activeNumber} умножить на ${ui.learnStep + 1}`);
  });
  $('#learnNext')?.addEventListener('click', () => {
    if (ui.learnStep < 9) {
      ui.learnStep += 1;
      renderLearn();
      announce(`Пример ${state.activeNumber} умножить на ${ui.learnStep + 1}`);
    } else {
      openFeed(state.activeNumber);
    }
  });
  $('#learnRemember')?.addEventListener('click', rememberCurrentFact);
  $('#learnDots')?.addEventListener('click', (event) => {
    const dot = event.target.closest('.lesson-dot');
    if (!dot) return;
    ui.learnStep = clamp(Number(dot.dataset.step) || 0, 0, 9);
    renderLearn();
    announce(`Пример ${state.activeNumber} умножить на ${ui.learnStep + 1}`);
  });

  $('#feedOptions')?.addEventListener('click', (event) => {
    const option = event.target.closest('.leaf-option');
    if (!option || option.disabled || ui.feed.locked) return;
    const selectedValue = Number(option.dataset.value);
    if (selectedValue === ui.feed.answer) {
      handleFeedCorrect(option);
    } else {
      handleFeedWrong(option);
    }
  });
  $('#feedHintBtn')?.addEventListener('click', showFeedHint);
  $('#feedSkipBtn')?.addEventListener('click', () => {
    if (ui.feed.locked) return;
    nextFeedQuestion();
    announce('Новый пример');
  });

  $('#keypad')?.addEventListener('click', (event) => {
    const key = event.target.closest('[data-key]');
    if (!key) return;
    handleSaveKey(key.dataset.key);
  });
  $('#saveHintBtn')?.addEventListener('click', showSaveHint);
  $('#saveSkipBtn')?.addEventListener('click', () => {
    if (ui.save.locked) return;
    nextSaveQuestion();
    announce('Новый пример');
  });

  $('#pythTable')?.addEventListener('pointerover', (event) => {
    const cell = event.target.closest('.pyth-cell');
    if (!cell) return;
    updatePythTable(Number(cell.dataset.a), Number(cell.dataset.b), false);
  });
  $('#pythTable')?.addEventListener('focusin', (event) => {
    const cell = event.target.closest('.pyth-cell');
    if (!cell) return;
    updatePythTable(Number(cell.dataset.a), Number(cell.dataset.b), true);
  });
  $('#pythTable')?.addEventListener('click', (event) => {
    const cell = event.target.closest('.pyth-cell');
    if (!cell) return;
    updatePythTable(Number(cell.dataset.a), Number(cell.dataset.b), true);
  });

  $('#labARange')?.addEventListener('input', (event) => {
    ui.lab.a = clamp(Number(event.target.value), 1, 10);
    renderLab();
  });
  $('#labBRange')?.addEventListener('input', (event) => {
    ui.lab.b = clamp(Number(event.target.value), 1, 10);
    renderLab();
  });
  $$('[data-lab-step]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.labStep;
      const delta = Number(button.dataset.delta);
      ui.lab[key] = clamp((ui.lab[key] || 1) + delta, 1, 10);
      renderLab();
    });
  });
  $('#labSwap')?.addEventListener('click', () => {
    const previous = { ...ui.lab };
    ui.lab = { a: previous.b, b: previous.a };
    renderLab();
    playSuccess();
    announce(`Поменяли местами: ${ui.lab.a} на ${ui.lab.b}`);
  });
  $('#labRandom')?.addEventListener('click', () => {
    const oldA = ui.lab.a;
    const oldB = ui.lab.b;
    let nextA = randomInt(1, 10);
    let nextB = randomInt(1, 10);
    for (let attempt = 0; attempt < 5 && nextA === oldA && nextB === oldB; attempt += 1) {
      nextA = randomInt(1, 10);
      nextB = randomInt(1, 10);
    }
    ui.lab = { a: nextA, b: nextB };
    renderLab();
    announce(`Новый опыт: ${nextA} умножить на ${nextB}`);
  });

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    playClick();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openModals = $$('.modal-backdrop.open');
      if (openModals.length) {
        const topModal = openModals[openModals.length - 1];
        if (topModal.id === 'rewardModal') {
          closeRewardAndContinue();
        } else {
          closeModal(topModal);
        }
      }
      return;
    }

    if (document.querySelector('.modal-backdrop.open')) return;

    if (ui.currentScreen === 'save') {
      if (/^\d$/.test(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        handleSaveKey(event.key);
        return;
      }
      if (event.key === 'Backspace') {
        event.preventDefault();
        handleSaveKey('clear');
        return;
      }
      if (event.key === 'Enter') {
        if (event.target instanceof Element && event.target.closest('button')) return;
        event.preventDefault();
        handleSaveKey('check');
        return;
      }
    }

    if (ui.currentScreen === 'learn') {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (ui.learnStep < 9) {
          ui.learnStep += 1;
          renderLearn();
          announce(`Пример ${state.activeNumber} умножить на ${ui.learnStep + 1}`);
        }
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (ui.learnStep > 0) {
          ui.learnStep -= 1;
          renderLearn();
          announce(`Пример ${state.activeNumber} умножить на ${ui.learnStep + 1}`);
        }
      }
    }
  });
}

/* Установка как приложение и офлайн-режим */
function setupPwa() {
  const installBtn = $('#installBtn');
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    if (installBtn) installBtn.hidden = false;
  });

  installBtn?.addEventListener('click', async () => {
    if (!deferredPrompt) {
      showToast('Открой меню браузера и нажми «Установить приложение».', 'success');
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });

  window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.hidden = true;
    showToast('Приложение установлено!', 'success');
  });

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

function init() {
  renderHome();
  buildPythTable();
  renderLab();
  updateSoundButton();
  attachEvents();
  setupPwa();
  showScreen('home');
  updateStatsUI();
}

init();
