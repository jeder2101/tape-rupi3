/* =========================================================
   Tape-rupi 2.0 — game.js
   20 fases | progressão de dificuldade
   Fontes: Lições de Gramática Nhandewa-Guarani vol. 1 e 2,
           Vocabulário Bilíngue Tupi-Guarani (SEE-SP 2010),
           roteiro Tape-rupi 2.0
   ========================================================= */

const CONFIG = {
  storageKey: 'taperupi2.save.v2',
  scorePerHit: 10,
  comboBonusPerStep: 2,
  maxComboBonus: 20,
  assetPath: 'assets/img/',
  assetExt: '.png',
};

/* ---------------------------------------------------------
   1. DADOS DAS FASES
   --------------------------------------------------------- */

/* Fase 1 — Alfabeto (21 grafemas conforme vol. 1, p. 20) */
const ALPHABET = [
  { letter: 'a',  word: 'awá',       translation: 'pessoa / homem',       emoji: '🧍' },
  { letter: 'dj', word: 'djety',     translation: 'batata-doce',          emoji: '🍠' },
  { letter: 'e',  word: 'eiru',      translation: 'abelha',               emoji: '🐝' },
  { letter: 'gw', word: 'gwyrá',     translation: 'pássaro',              emoji: '🐦' },
  { letter: 'i',  word: 'itxó',      translation: 'coró',                 emoji: '🐛' },
  { letter: 'k',  word: 'kunumĩ',    translation: 'rapaz / menino',       emoji: '👦' },
  { letter: 'kw', word: 'kwaray',    translation: 'sol',                  emoji: '☀️' },
  { letter: 'm',  word: 'mitã',      translation: 'criança',              emoji: '👶' },
  { letter: 'mb', word: 'mbodjape',  translation: 'pão / bolo',           emoji: '🍞' },
  { letter: 'n',  word: "narã-pe'i", translation: 'mexerica',             emoji: '🍊' },
  { letter: 'nd', word: 'ndipoiry',  translation: 'zero / não tem',       emoji: '0️⃣' },
  { letter: 'ng', word: "angu'a",    translation: 'tambor',               emoji: '🥁' },
  { letter: 'nh', word: 'nhandewa',  translation: 'indígena',             emoji: '🪶' },
  { letter: 'o',  word: 'oké',       translation: 'dormir / porta',       emoji: '🚪' },
  { letter: 'p',  word: 'pirá',      translation: 'peixe',                emoji: '🐟' },
  { letter: 'r',  word: "ry'e",      translation: 'barriga',              emoji: '🫄' },
  { letter: 't',  word: 'tatá',      translation: 'fogo',                 emoji: '🔥' },
  { letter: 'ts', word: 'tsugwai',   translation: 'porco doméstico',      emoji: '🐖' },
  { letter: 'tx', word: 'txiwi',     translation: 'gato',                 emoji: '🐈' },
  { letter: 'u',  word: 'uru',       translation: 'galinha',              emoji: '🐔' },
  { letter: 'w',  word: 'wera',      translation: 'relâmpago',            emoji: '⚡' },
  { letter: 'y',  word: 'ywyrá',     translation: 'árvore',               emoji: '🌳' },
  { letter: '’',  word: "mandi'o",   translation: 'mandioca',             emoji: '🌱' },
];

/* Fase 2 — Objetos e números (roteiro) */
const OBJETOS = [
  { pt: 'cesto',                tupi: 'adjaká',       emoji: '🧺' },
  { pt: 'tambor',               tupi: "angu'apu",     emoji: '🥁' },
  { pt: 'machado',              tupi: 'atxá',         emoji: '🪓' },
  { pt: 'colar transversal',    tupi: 'djatsaá',      emoji: '📿' },
  { pt: 'arco',                 tupi: 'gwyrapá',      emoji: '🏹' },
  { pt: 'arco-e-flecha',        tupi: "gwyrapá'u'i",  emoji: '🎯' },
  { pt: 'lança',                tupi: 'gwyrarakwá',   emoji: '🗡️' },
  { pt: 'cocar',                tupi: 'kangwaá',      emoji: '🪶' },
  { pt: 'rede',                 tupi: 'kyá',          emoji: '🕸️' },
  { pt: 'maraca',               tupi: 'mbaraká',      emoji: '🪇' },
  { pt: 'colar',                tupi: "mbo'y",        emoji: '💎' },
  { pt: 'flauta',               tupi: 'mimby',        emoji: '🎶' },
  { pt: 'anel',                 tupi: 'kwãregwá',     emoji: '💍' },
  { pt: 'brinco',               tupi: 'nambitsã',     emoji: '🪬' },
  { pt: 'leque',                tupi: 'pedjuá',       emoji: '🪭' },
  { pt: 'cachimbo',             tupi: 'petỹngwá',     emoji: '🚬' },
  { pt: 'pulseira',             tupi: 'poapyregwá',   emoji: '⌚' },
  { pt: 'roupa tradicional',    tupi: 'tambeó',       emoji: '👕' },
  { pt: 'instrumento feminino', tupi: 'takwapu',      emoji: '🪘' },
  { pt: 'adorno labial',        tupi: 'tembetá',      emoji: '💋' },
  { pt: 'flecha',               tupi: "u'y",          emoji: '🏹' },
  { pt: 'zarabatana',           tupi: "u'ypedjuá",    emoji: '🎋' },
  { pt: 'pau-de-chuva',         tupi: 'ywyrá-rokyá',  emoji: '🌧️' },
  { pt: 'colher',               tupi: 'kutxá',        emoji: '🥄' },
  { pt: 'garfo',                tupi: 'kutxá rakwá',  emoji: '🍴' },
  { pt: 'copo / caneca',        tupi: 'karó',         emoji: '🥤' },
  { pt: 'panela',               tupi: 'djapepó',      emoji: '🍲' },
  { pt: 'peneira',              tupi: 'irympẽ',       emoji: '🕳️' },
  { pt: 'espremedor',           tupi: 'tipiti',       emoji: '🌀' },
];

const NUMEROS = [
  { n: 0,  tupi: 'djere' },
  { n: 1,  tupi: 'peteĩ' },
  { n: 2,  tupi: 'mokõe' },
  { n: 3,  tupi: 'mboapy' },
  { n: 4,  tupi: 'irundy' },
  { n: 5,  tupi: 'nirui' },
  { n: 6,  tupi: 'ypé' },
  { n: 7,  tupi: 'ipoká' },
  { n: 9,  tupi: 'tsyta' },
  { n: 10, tupi: 'tei-djere' },
];

/* Fase 3 — Animais */
const ANIMAIS = [
  { pt: 'cutia',              tupi: 'akuti',          emoji: '🐿️' },
  { pt: 'morcego frugívoro',  tupi: 'andirá',         emoji: '🦇' },
  { pt: 'rato',               tupi: 'angudjá',        emoji: '🐀' },
  { pt: 'onça',               tupi: 'djagwareté',     emoji: '🐆' },
  { pt: 'puma',               tupi: "djagwareté'ũ",   emoji: '🦁' },
  { pt: 'jaguatirica',        tupi: 'djagwatiri',     emoji: '🐈‍⬛' },
  { pt: 'paca',               tupi: 'djaitxá',        emoji: '🐹' },
  { pt: 'lontra',             tupi: 'gwairaká',       emoji: '🦦' },
  { pt: 'veado',              tupi: 'gwatsu',         emoji: '🦌' },
  { pt: 'veado galheiro',     tupi: "gwatsu'i'y",     emoji: '🦌' },
  { pt: 'papa-mel',           tupi: 'irara',          emoji: '🦡' },
  { pt: 'tamanduá-mirim',     tupi: 'kagwaré',        emoji: '🐜' },
  { pt: 'macaco',             tupi: "ka'i",           emoji: '🐒' },
  { pt: 'cateto',             tupi: 'kaititu',        emoji: '🐗' },
  { pt: 'capivara',           tupi: "kapi'i'uwá",     emoji: '🦫' },
  { pt: 'bugio',              tupi: 'karadjá',        emoji: '🐵' },
  { pt: 'cachorro',           tupi: 'katxuru',        emoji: '🐕' },
  { pt: 'porco-espinho',      tupi: "kui'ĩ",          emoji: '🦔' },
  { pt: 'quati-mirim',        tupi: 'kwati-mirim',    emoji: '🦝' },
  { pt: 'quati-mundéu',       tupi: 'kwati-mondé',    emoji: '🦝' },
  { pt: 'rato do bambu',      tupi: 'kydjá',          emoji: '🐁' },
  { pt: 'ratinho silvestre',  tupi: 'kydjara',        emoji: '🐭' },
  { pt: 'gato do mato',       tupi: 'mbarakadjá',     emoji: '🐈' },
  { pt: 'anta',               tupi: 'tapir',          emoji: '🦓' },
  { pt: 'gambá',              tupi: 'mbyku',          emoji: '🦨' },
  { pt: 'preá',               tupi: 'pereá',          emoji: '🐹' },
  { pt: 'queixada',           tupi: 'tadjatsu',       emoji: '🐗' },
  { pt: 'preguiça',           tupi: 'taĩdjá',         emoji: '🦥' },
  { pt: 'lebre',              tupi: 'tapiti',         emoji: '🐇' },
  { pt: 'tatu',               tupi: 'tatu',           emoji: '🦔' },
  { pt: 'porco doméstico',    tupi: 'tsugwai',        emoji: '🐖' },
  { pt: 'suçuarana',          tupi: 'tsutsuarã',      emoji: '🐆' },
  { pt: 'caxinguelê',         tupi: "tugwaipe'i",     emoji: '🐿️' },
  { pt: 'gato',               tupi: 'txiwi',          emoji: '🐈' },
];

/* Fase 4 — Insetos, répteis e anfíbios */
const INSETOS = [
  { pt: 'vespa / marimbondo', tupi: 'kawy',         emoji: '🐝' },
  { pt: 'piolho',             tupi: 'ky',           emoji: '🪳' },
  { pt: 'grilo',              tupi: 'kydju',        emoji: '🦗' },
  { pt: 'besouro',            tupi: 'kyi-kyi',      emoji: '🪲' },
  { pt: 'mosquito',           tupi: 'mbarigwi',     emoji: '🦟' },
  { pt: 'mosca',              tupi: 'mberu',        emoji: '🪰' },
  { pt: 'mutuca',             tupi: 'mbutu',        emoji: '🪰' },
  { pt: 'vagalume',           tupi: 'muã',          emoji: '✨' },
  { pt: 'cigarra',            tupi: 'nhakyrã',      emoji: '🦗' },
  { pt: 'aranha',             tupi: 'nhandu',       emoji: '🕷️' },
  { pt: 'pernilongo',         tupi: "nhati'ũ",      emoji: '🦟' },
  { pt: 'borboleta',          tupi: "popo'i",       emoji: '🦋' },
  { pt: 'barata',             tupi: 'tarawé',       emoji: '🪳' },
  { pt: 'formiga',            tupi: 'tay',          emoji: '🐜' },
  { pt: 'gafanhoto',          tupi: 'ytsoendy',     emoji: '🦗' },
  { pt: 'minhoca',            tupi: 'tsewoí',       emoji: '🪱' },
  { pt: 'lagartixa',          tupi: 'amberé',       emoji: '🦎' },
  { pt: 'jacaré',             tupi: 'djakaré',      emoji: '🐊' },
  { pt: 'perereca',           tupi: "dju'i",        emoji: '🐸' },
  { pt: 'jabuti',             tupi: 'jabuti',       emoji: '🐢' },
  { pt: 'cágado',             tupi: 'karumbé',      emoji: '🐢' },
  { pt: 'sapo',               tupi: 'kururu',       emoji: '🐸' },
  { pt: 'cobra',              tupi: 'mboí',         emoji: '🐍' },
  { pt: 'centopeia',          tupi: 'mboiky',       emoji: '🐛' },
  { pt: 'lagarto',            tupi: 'tedju',        emoji: '🦎' },
];

/* Fase 5 — Cores */
const CORES = [
  { pt: 'verde',    tupi: 'owy',           hex: '#2fbf5a', emoji: '🟢' },
  { pt: 'amarelo',  tupi: 'idjú',          hex: '#f2c94c', emoji: '🟡' },
  { pt: 'vermelho', tupi: 'pytã',          hex: '#e33b3b', emoji: '🔴' },
  { pt: 'azul',     tupi: 'owy rei',       hex: '#3b6be3', emoji: '🔵' },
  { pt: 'branco',   tupi: 'morõti',        hex: '#eaeaea', emoji: '⚪' },
  { pt: 'preto',    tupi: 'unã',           hex: '#151515', emoji: '⚫' },
  { pt: 'rosa',     tupi: 'potygwá',       hex: '#f06eb4', emoji: '🩷' },
  { pt: 'roxo',     tupi: 'putã regwá',    hex: '#8a3bff', emoji: '🟣' },
  { pt: 'marrom',   tupi: 'ywy ramigwá',   hex: '#7a4a21', emoji: '🟤' },
  { pt: 'laranja',  tupi: 'nãrã',          hex: '#f28f2b', emoji: '🟠' },
];

/* Fase 6 — Corpo humano (vol. 2, p. 41) */
const CORPO = [
  { pt: 'cabeça',      tupi: 'akã',        emoji: '🧠' },
  { pt: 'cabelo',      tupi: 'awy',        emoji: '💈' },
  { pt: 'rosto',       tupi: 'rowá',       emoji: '😊' },
  { pt: 'olho',        tupi: 'retsá',      emoji: '👁️' },
  { pt: 'orelha',      tupi: 'nambi',      emoji: '👂' },
  { pt: 'nariz',       tupi: 'apyingwá',   emoji: '👃' },
  { pt: 'boca',        tupi: 'djuru',      emoji: '👄' },
  { pt: 'dente',       tupi: 'raĩ',        emoji: '🦷' },
  { pt: 'língua',      tupi: 'apenkũ',     emoji: '👅' },
  { pt: 'ombro',       tupi: "ati'y",      emoji: '🤷' },
  { pt: 'braço',       tupi: 'djywá',      emoji: '💪' },
  { pt: 'cotovelo',    tupi: 'djywá-tãkã', emoji: '🦾' },
  { pt: 'mão',         tupi: 'pó',         emoji: '✋' },
  { pt: 'dedo',        tupi: 'kwã',        emoji: '👆' },
  { pt: 'peito',       tupi: "poti'á",     emoji: '🫀' },
  { pt: 'barriga',     tupi: "ry'e",       emoji: '🫄' },
  { pt: 'perna',       tupi: 'tymã',       emoji: '🦵' },
  { pt: 'joelho',      tupi: 'tãkã',       emoji: '🦵' },
  { pt: 'pé',          tupi: 'py',         emoji: '🦶' },
  { pt: 'costas',      tupi: 'kupé',       emoji: '🔙' },
];

/* Fase 7 — Parentesco (vol. 2, p. 35-37) */
const PARENTESCO = [
  { pt: 'mãe',              tupi: 'sy',              emoji: '👩' },
  { pt: 'pai',              tupi: 'ru',              emoji: '👨' },
  { pt: 'filho (homem fala)', tupi: "ra'y",          emoji: '👦' },
  { pt: 'filha (mulher fala)', tupi: 'memby',        emoji: '👧' },
  { pt: 'avô',              tupi: 'ramoĩ',           emoji: '👴' },
  { pt: 'avó',              tupi: 'djaryi',          emoji: '👵' },
  { pt: 'tio',              tupi: 'tuty',            emoji: '🧔' },
  { pt: 'tia',              tupi: "txy'y",           emoji: '👩‍🦰' },
  { pt: 'irmão mais velho', tupi: 'kywy',            emoji: '🧑' },
  { pt: 'irmã mais velha',  tupi: 'rikéy',           emoji: '👩‍🦱' },
  { pt: 'irmãzinha',        tupi: "rêndy'i",         emoji: '👧' },
  { pt: 'amigo',            tupi: 'rapitxá',         emoji: '🤝' },
  { pt: 'companheiro',      tupi: 'irũ',             emoji: '👥' },
  { pt: 'esposa',           tupi: 'mbirekó',         emoji: '👰' },
  { pt: 'marido',           tupi: 'mẽ',              emoji: '🤵' },
  { pt: 'sogro',            tupi: 'ratywy',          emoji: '🧓' },
  { pt: 'sogra',            tupi: "ra'ytxó",         emoji: '👵' },
  { pt: 'cunhado',          tupi: 'rowadjá',         emoji: '🧑‍🦱' },
  { pt: 'neto / neta',      tupi: 'ramaminó',        emoji: '👶' },
];

/* Fase 8 — Comidas (vol. 2, p. 27) */
const COMIDAS = [
  { pt: 'mandioca',          tupi: "mandi'o",       emoji: '🌱' },
  { pt: 'milho',             tupi: 'awati',         emoji: '🌽' },
  { pt: 'batata-doce',       tupi: 'djety',         emoji: '🍠' },
  { pt: 'peixe',             tupi: 'pirá',          emoji: '🐟' },
  { pt: 'carne',             tupi: "tso'o",         emoji: '🥩' },
  { pt: 'mel',               tupi: 'eí',            emoji: '🍯' },
  { pt: 'pão / bolo',        tupi: 'mbodjape',      emoji: '🍞' },
  { pt: 'feijão',            tupi: 'kumandá',       emoji: '🫘' },
  { pt: 'arroz',             tupi: "aro'i",         emoji: '🍚' },
  { pt: 'inhame',            tupi: 'tadjá',         emoji: '🍠' },
  { pt: 'abóbora',           tupi: 'andaí',         emoji: '🎃' },
  { pt: 'amendoim',          tupi: 'manduwi',       emoji: '🥜' },
  { pt: 'banana',            tupi: 'pakowá',        emoji: '🍌' },
  { pt: 'melancia',          tupi: 'tsandiá',       emoji: '🍉' },
  { pt: 'cana-de-açúcar',    tupi: 'kanã',          emoji: '🎋' },
  { pt: 'sal',               tupi: 'tsaá',          emoji: '🧂' },
  { pt: 'pimenta',           tupi: "ky'yi",         emoji: '🌶️' },
  { pt: 'água',              tupi: 'yy',            emoji: '💧' },
  { pt: 'comida',            tupi: "tembi'u",       emoji: '🍽️' },
  { pt: 'café',              tupi: "mba'e'ũ",       emoji: '☕' },
];

/* Fase 9 — Advérbios de lugar (vol. 2, p. 12) */
const ADV_LUGAR = [
  { pt: 'aqui',            tupi: 'apy',              emoji: '📍' },
  { pt: 'por aqui',        tupi: 'kó-rupi',          emoji: '🧭' },
  { pt: 'por aí',          tupi: 'okó-rupi',         emoji: '👣' },
  { pt: 'lá / ali',        tupi: "a'e-py",           emoji: '📍' },
  { pt: 'embaixo',         tupi: 'igwy-py',          emoji: '⬇️' },
  { pt: 'por baixo',       tupi: 'igwy-rupi',        emoji: '⬇️' },
  { pt: 'do lado',         tupi: 'djyké-py',         emoji: '↔️' },
  { pt: 'longe',           tupi: 'mombyry',          emoji: '🛣️' },
  { pt: 'perto',           tupi: 'djawé',            emoji: '📏' },
  { pt: 'fora',            tupi: 'oká-py',           emoji: '🚪' },
  { pt: 'dentro',          tupi: 'py-py',            emoji: '🏠' },
  { pt: 'atrás de',        tupi: 'rakykwé',          emoji: '⬅️' },
  { pt: 'na frente de',    tupi: 'nondé-py',         emoji: '➡️' },
  { pt: 'no meio',         tupi: 'mbyté-py',         emoji: '🎯' },
  { pt: 'neste lado',      tupi: 'kowá djyké-py',    emoji: '👈' },
  { pt: 'daquele lado',    tupi: 'pewá djyké-py',    emoji: '👉' },
  { pt: 'por lá',          tupi: 'pewá-rupi',        emoji: '🛤️' },
  { pt: 'em cima',         tupi: 'ywaté-py',         emoji: '⬆️' },
  { pt: 'na beirada',      tupi: 'rembé-py',         emoji: '🌊' },
  { pt: 'naquele lugar',   tupi: 'upé-py',           emoji: '📌' },
];

/* Fase 10 — Advérbios de tempo (vol. 2, p. 11) */
const ADV_TEMPO = [
  { pt: 'antigamente',       tupi: 'ymã',           emoji: '🕰️' },
  { pt: 'ontem',             tupi: 'kweé',          emoji: '📆' },
  { pt: 'hoje',              tupi: "ko'aỹ",         emoji: '📅' },
  { pt: 'amanhã',            tupi: "ko'ẽro",        emoji: '🌅' },
  { pt: 'manhã',             tupi: "ko'ẽ",          emoji: '🌄' },
  { pt: 'cedinho',           tupi: "ko'ẽmba'i",     emoji: '🐓' },
  { pt: 'antes de',          tupi: 'mbowé',         emoji: '⬅️' },
  { pt: 'depois de',         tupi: 'riré',          emoji: '➡️' },
  { pt: 'depois (sozinho)',  tupi: 'anguewé',       emoji: '⏭️' },
  { pt: 'ainda',             tupi: 'teri',          emoji: '⏳' },
  { pt: 'agora',             tupi: 'aỹ',            emoji: '⏱️' },
  { pt: 'sempre',            tupi: 'riaé',          emoji: '♾️' },
  { pt: 'nunca',             tupi: "e'ỹwa",         emoji: '🚫' },
  { pt: 'de novo',           tupi: 'djiwy',         emoji: '🔄' },
  { pt: 'noite',             tupi: 'pytũ',          emoji: '🌙' },
  { pt: 'acabou de fazer',   tupi: 'aẽma',          emoji: '✅' },
  { pt: 'mais tarde',        tupi: 'anguewé',       emoji: '🕗' },
  { pt: 'de manhã cedo',     tupi: "ko'ẽpyi",       emoji: '🌄' },
  { pt: 'no passado',        tupi: 'ymãdje',        emoji: '📜' },
  { pt: 'quase sempre',      tupi: 'mboaẽro',       emoji: '🔁' },
];

/* Fase 11 — Natureza e pontos cardeais (vol. 2, p. 17, 55) */
const NATUREZA = [
  { pt: 'sol',              tupi: 'kwaray',              emoji: '☀️' },
  { pt: 'lua',              tupi: 'djatsy',              emoji: '🌙' },
  { pt: 'estrela',          tupi: 'djatsy-tatá',         emoji: '⭐' },
  { pt: 'céu',              tupi: 'aryrei',              emoji: '🌌' },
  { pt: 'chuva',            tupi: 'oky',                 emoji: '🌧️' },
  { pt: 'rio',              tupi: 'paraná',              emoji: '🌊' },
  { pt: 'rio grande',       tupi: 'paragwatsu',          emoji: '🌊' },
  { pt: 'mar',              tupi: 'yy ramõe',            emoji: '🌊' },
  { pt: 'cachoeira',        tupi: 'yy akã',              emoji: '💦' },
  { pt: 'nascente do rio',  tupi: 'yy ontsẽa',           emoji: '💦' },
  { pt: 'mata',             tupi: "ka'agwy",             emoji: '🌳' },
  { pt: 'floresta',         tupi: "ka'agwy rutsu",       emoji: '🌲' },
  { pt: 'campo',            tupi: 'oká rutsu',           emoji: '🌾' },
  { pt: 'serra',            tupi: 'ywyty ywaté',         emoji: '⛰️' },
  { pt: 'estrada',          tupi: 'tapé',                emoji: '🛤️' },
  { pt: 'picada',           tupi: "tape'i",              emoji: '🛤️' },
  { pt: 'nascente (leste)', tupi: 'kwaray ontsẽa',       emoji: '🌅' },
  { pt: 'poente (oeste)',   tupi: 'kwaray okeá',         emoji: '🌇' },
  { pt: 'terra',            tupi: 'ywy',                 emoji: '🌍' },
  { pt: 'vento',            tupi: 'ywytu',               emoji: '💨' },
];

/* Fase 12 — Verbos básicos (conjugação 1ª e 2ª, vol. 1, p. 39-42) */
const VERBOS_BASICOS = [
  { pt: 'comer',                tupi: 'karu',          emoji: '🍽️' },
  { pt: 'saber',                tupi: 'kwaá',          emoji: '🧠' },
  { pt: 'andar',                tupi: 'gwatá',         emoji: '🚶' },
  { pt: 'ver',                  tupi: 'etxá',          emoji: '👁️' },
  { pt: 'escutar',              tupi: 'endu',          emoji: '👂' },
  { pt: 'falar',                tupi: 'aywu',          emoji: '💬' },
  { pt: 'dormir',               tupi: 'ké',            emoji: '😴' },
  { pt: 'chorar',               tupi: "djae'o",        emoji: '😢' },
  { pt: 'cantar',               tupi: 'porai',         emoji: '🎤' },
  { pt: 'dançar',               tupi: 'djeroky',       emoji: '💃' },
  { pt: 'fazer',                tupi: 'djapó',         emoji: '🔧' },
  { pt: 'plantar',              tupi: 'djaty',         emoji: '🌱' },
  { pt: 'beber / tomar',        tupi: "mbo'apy",       emoji: '🥤' },
  { pt: 'brincar',              tupi: 'nimangá',       emoji: '🎮' },
  { pt: 'correr',               tupi: 'djopará',       emoji: '🏃' },
  { pt: 'estudar / aprender',   tupi: 'nimbo’é',       emoji: '📚' },
  { pt: 'chegar',               tupi: 'aẽ',            emoji: '🚪' },
  { pt: 'ver / olhar',          tupi: "ma'ẽ",          emoji: '👀' },
  { pt: 'estar com frio',       tupi: "ro'y",          emoji: '🥶' },
  { pt: 'estar cansado',        tupi: "kane'õ",        emoji: '😮‍💨' },
];

/* Fase 13 — Perguntas (vol. 2, p. 43) */
const PERGUNTAS = [
  { pt: 'Quem?',        tupi: 'Mawã?',          emoji: '🧑' },
  { pt: 'O que?',       tupi: "Mba'ewa?",       emoji: '❓' },
  { pt: 'Quando?',      tupi: 'Marũ?',          emoji: '⏰' },
  { pt: 'Por quê?',     tupi: "Ma'erã?",        emoji: '🤔' },
  { pt: 'Onde?',        tupi: 'Mamõ?',          emoji: '📍' },
  { pt: 'Para onde?',   tupi: 'Mamõ-pe?',       emoji: '➡️' },
  { pt: 'De onde?',     tupi: 'Mamõ-gwi?',      emoji: '⬅️' },
  { pt: 'Qual? / Como?',tupi: 'Maraingwá?',     emoji: '🔍' },
  { pt: 'Como? (modo)', tupi: 'Marãi?',         emoji: '🛠️' },
  { pt: 'Quanto?',      tupi: 'Mbowy?',         emoji: '🔢' },
  { pt: 'Cadê?',        tupi: 'Maã?',           emoji: '🔎' },
  { pt: 'Como você está?', tupi: 'Marãi reikó?', emoji: '💬' },
  { pt: 'Qual seu nome?', tupi: 'Marãi nderery?', emoji: '📛' },
  { pt: 'Quantos anos?', tupi: 'Mbowy ary?',    emoji: '🎂' },
  { pt: 'Aonde você vai?', tupi: 'Mamõ reóta?', emoji: '🚶' },
  { pt: 'O que você quer?', tupi: "Mba'ewa repotá?", emoji: '❓' },
  { pt: 'Você sabe?',   tupi: 'Reikwaá?',       emoji: '🧠' },
  { pt: 'Você comeu?',  tupi: 'Rekaruma?',      emoji: '🍽️' },
  { pt: 'Tudo bem?',    tupi: "Ndera'eweiry?",  emoji: '😊' },
  { pt: 'Você vai?',    tupi: 'Reóta?',         emoji: '🚶' },
];

/* Fase 14 — Posposições (vol. 1, p. 50; vol. 2, p. 22-24) */
const POSPOSICOES = [
  { pt: 'em, no (lugar)',      tupi: '-py',           emoji: '📍' },
  { pt: 'de (origem)',         tupi: '-gwi',          emoji: '⬅️' },
  { pt: 'por, pelo',           tupi: '-rupi',         emoji: '🛣️' },
  { pt: 'em cima de',          tupi: '-arõ',          emoji: '⬆️' },
  { pt: 'embaixo de',          tupi: '-gwypy',        emoji: '⬇️' },
  { pt: 'entre, no meio de',   tupi: '-mbyté-py',     emoji: '🎯' },
  { pt: 'para (direção)',      tupi: '-re',           emoji: '➡️' },
  { pt: 'com (junto de)',      tupi: '-rewé',         emoji: '👥' },
  { pt: 'até',                 tupi: '-pevé',         emoji: '➡️' },
  { pt: 'de (origem/nascimento)', tupi: '-pygwá',     emoji: '🌱' },
  { pt: 'desde',               tupi: '-gwi',          emoji: '🕰️' },
  { pt: 'sem',                 tupi: "-e'ỹ",          emoji: '🚫' },
  { pt: 'para mim',            tupi: 'txewy',         emoji: '🙋' },
  { pt: 'para você',           tupi: 'ndewy',         emoji: '👉' },
  { pt: 'comigo',              tupi: 'txerewé',       emoji: '🤝' },
  { pt: 'daqui',               tupi: 'agwi',          emoji: '↘️' },
  { pt: 'por aqui (caminho)',  tupi: 'kó-rupi',       emoji: '👣' },
  { pt: 'na frente de',        tupi: 'nondé-py',      emoji: '➡️' },
  { pt: 'atrás de',            tupi: 'rakykwé',       emoji: '⬅️' },
  { pt: 'na beirada de',       tupi: '-rembé',        emoji: '🌊' },
];

/* Fase 15 — Pronomes (vol. 1, p. 29-30, 48) */
const PRONOMES = [
  { pt: 'eu (livre)',            tupi: 'txeé',           emoji: '🙋' },
  { pt: 'você (livre)',          tupi: 'ndeé',           emoji: '👉' },
  { pt: 'ele / ela (livre)',     tupi: "a'e",            emoji: '🧑' },
  { pt: 'nós incl. (livre)',     tupi: 'nhandé',         emoji: '👥' },
  { pt: 'nós excl. (livre)',     tupi: 'oré',            emoji: '👥' },
  { pt: 'vocês (livre)',         tupi: 'peẽ',            emoji: '👥' },
  { pt: 'eles / elas (livre)',   tupi: "eiwĩwa'e",       emoji: '👥' },
  { pt: 'marca "eu" (posse)',    tupi: 'txe-',           emoji: '🔗' },
  { pt: 'marca "você" (posse)',  tupi: 'nde-',           emoji: '🔗' },
  { pt: 'marca "ele/ela" (posse)', tupi: 'i-',           emoji: '🔗' },
  { pt: 'marca "nós incl." (posse)', tupi: 'nhande-',    emoji: '🔗' },
  { pt: 'marca "nós excl." (posse)', tupi: 'ore-',       emoji: '🔗' },
  { pt: 'marca "vocês" (posse)', tupi: 'pende-',         emoji: '🔗' },
  { pt: 'marca "eu" (sujeito verbal 2ª conj.)', tupi: 'txe-',  emoji: '🔗' },
  { pt: 'marca "você" (sujeito verbal 2ª conj.)', tupi: 'nde-', emoji: '🔗' },
  { pt: 'marca "nós incl." (sujeito verbal 2ª conj.)', tupi: 'nhande-', emoji: '🔗' },
  { pt: 'meu',                   tupi: 'txe-',           emoji: '🫵' },
  { pt: 'teu',                   tupi: 'nde-',           emoji: '🫵' },
  { pt: 'nosso incl.',           tupi: 'nhande-',        emoji: '🫶' },
  { pt: 'deles / delas',         tupi: 'i-',             emoji: '🫵' },
];

/* Fase 16 — Conjugação 1ª (vol. 1, p. 39-42) */
const CONJ1 = [
  { pt: 'eu como',         tupi: 'akaru',           emoji: '🍽️' },
  { pt: 'você come',       tupi: 'rekaru',          emoji: '🍽️' },
  { pt: 'ele / ela come',  tupi: 'okaru',           emoji: '🍽️' },
  { pt: 'nós incl. comemos', tupi: 'djakaru',       emoji: '🍽️' },
  { pt: 'nós excl. comemos', tupi: 'rokaru',        emoji: '🍽️' },
  { pt: 'eu sei',          tupi: 'aikwaá',          emoji: '🧠' },
  { pt: 'você sabe',       tupi: 'reikwaá',         emoji: '🧠' },
  { pt: 'ele / ela sabe',  tupi: 'oikwaá',          emoji: '🧠' },
  { pt: 'eu vejo',         tupi: 'aetxá',           emoji: '👁️' },
  { pt: 'ele / ela vê',    tupi: 'oetxá',           emoji: '👁️' },
  { pt: 'eu ando',         tupi: 'agwatá',          emoji: '🚶' },
  { pt: 'ele / ela anda',  tupi: 'ogwatá',          emoji: '🚶' },
  { pt: 'eu falo',         tupi: 'aidjaywu',        emoji: '💬' },
  { pt: 'você fala',       tupi: 'reidjaywu',       emoji: '💬' },
  { pt: 'eu olho / ajudo', tupi: "ama'ẽ",           emoji: '👀' },
  { pt: 'ele / ela olha',  tupi: "oma'ẽ",           emoji: '👀' },
  { pt: 'eu bato',         tupi: 'ainupã',          emoji: '✊' },
  { pt: 'ela dança',       tupi: 'odjeroky',        emoji: '💃' },
  { pt: 'eu canto',        tupi: 'aporaí',          emoji: '🎤' },
  { pt: 'ele / ela canta', tupi: 'oporaí',          emoji: '🎤' },
];

/* Fase 17 — Conjugação 2ª (verbos descritivos, vol. 1, p. 40-42) */
const CONJ2 = [
  { pt: 'eu tenho frio',          tupi: "txero'y",        emoji: '🥶' },
  { pt: 'você tem frio',          tupi: "ndero'y",        emoji: '🥶' },
  { pt: 'ele / ela tem frio',     tupi: "iro'y",          emoji: '🥶' },
  { pt: 'nós incl. temos frio',   tupi: "nhandero'y",     emoji: '🥶' },
  { pt: 'eu estou cansado',       tupi: "txekane'õ",      emoji: '😮‍💨' },
  { pt: 'você está cansado',      tupi: "ndekane'õ",      emoji: '😮‍💨' },
  { pt: 'eu lembro',              tupi: "txemandu'a",     emoji: '💭' },
  { pt: 'você lembra',            tupi: "nemandu'a",      emoji: '💭' },
  { pt: 'nós incl. lembramos',    tupi: "nhanemandu'a",   emoji: '💭' },
  { pt: 'eu estou com calor',     tupi: 'txeraku',        emoji: '🥵' },
  { pt: 'ele / ela é velho',      tupi: 'itudjá',         emoji: '👴' },
  { pt: 'ela é bonita',           tupi: 'iporã',          emoji: '🌸' },
  { pt: 'ele / ela está quente',  tupi: 'iaku',           emoji: '🔥' },
  { pt: 'eu estou feliz',         tupi: 'txerory',        emoji: '😄' },
  { pt: 'eu estou com fome',      tupi: 'txenimbyai',     emoji: '🍽️' },
  { pt: 'eu estou com saudade',   tupi: "txemandu'a",     emoji: '💭' },
  { pt: 'ele / ela está com medo', tupi: 'ikydje',        emoji: '😱' },
  { pt: 'é grande',               tupi: 'ituwixá',        emoji: '📏' },
  { pt: 'é pequeno',              tupi: "imbari'i",       emoji: '🐜' },
  { pt: 'é novo',                 tupi: 'ipyaú',          emoji: '🆕' },
];

/* Fase 18 — Verbos irregulares (vol. 2, p. 29-31) */
const IRREGULARES = [
  { pt: 'eu vou',             tupi: 'aá',           emoji: '🚶' },
  { pt: 'você vai',           tupi: 'reó',          emoji: '🚶' },
  { pt: 'ele / ela vai',      tupi: 'oó',           emoji: '🚶' },
  { pt: 'nós incl. vamos',    tupi: 'djaá',         emoji: '👥' },
  { pt: 'nós excl. vamos',    tupi: 'roó',          emoji: '👥' },
  { pt: 'vocês vão',          tupi: 'peó',          emoji: '👥' },
  { pt: 'eu venho',           tupi: 'adju',         emoji: '⬅️' },
  { pt: 'você vem',           tupi: 'redju',        emoji: '⬅️' },
  { pt: 'ele / ela vem',      tupi: 'oú',           emoji: '⬅️' },
  { pt: 'nós incl. viemos',   tupi: 'djadju',       emoji: '👥' },
  { pt: 'vocês vêm',          tupi: 'pedju',        emoji: '👥' },
  { pt: 'eu digo',            tupi: "a'e",          emoji: '🗣️' },
  { pt: 'você diz',           tupi: 'ere',          emoji: '🗣️' },
  { pt: 'ele / ela diz',      tupi: "e'i",          emoji: '🗣️' },
  { pt: 'eu tenho',           tupi: 'arekó',        emoji: '🤲' },
  { pt: 'você tem',           tupi: 'rerekó',       emoji: '🤲' },
  { pt: 'ele / ela tem',      tupi: 'ogwerekó',     emoji: '🤲' },
  { pt: 'eu trago',           tupi: 'aru',          emoji: '📦' },
  { pt: 'ele / ela traz',     tupi: 'ogweru',       emoji: '📦' },
  { pt: 'nós incl. trazemos', tupi: 'djagweru',     emoji: '📦' },
];

/* Fase 19 — Causativos e negação (vol. 1, p. 43-46) */
const CAUSATIVOS = [
  { pt: 'fazer sentar',           tupi: 'mbogwapy',      emoji: '🪑' },
  { pt: 'fazer chorar',           tupi: "mbodjae'o",     emoji: '😭' },
  { pt: 'moer / pulverizar',      tupi: "mongu'i",       emoji: '⚙️' },
  { pt: 'alimentar',              tupi: 'mongaru',       emoji: '🍽️' },
  { pt: 'fazer cansar',           tupi: "mokane'õ",      emoji: '😮‍💨' },
  { pt: 'esquentar',              tupi: 'mboaku',        emoji: '🔥' },
  { pt: 'mostrar / fazer ver',    tupi: 'etxá-uká',      emoji: '👁️' },
  { pt: 'fazer fazer',            tupi: 'djapó-uká',     emoji: '🔧' },
  { pt: 'fazer amarrar',          tupi: 'djorá-uká',     emoji: '🪢' },
  { pt: 'fazer dormir',           tupi: 'mongue',        emoji: '😴' },
  { pt: 'fazer calar',            tupi: 'mongirirĩ',     emoji: '🤫' },
  { pt: 'fazer cair / derrubar',  tupi: "mbo'a",         emoji: '⬇️' },
  { pt: 'fazer crescer',          tupi: 'mboytu',        emoji: '🌱' },
  { pt: 'queimar (fazer)',        tupi: 'mbodjapy',      emoji: '🔥' },
  { pt: 'é ruim / está ruim',     tupi: "ndaporãiry",    emoji: '👎' },
  { pt: 'não tem / não existe',   tupi: 'ndipoiry',      emoji: '🚫' },
  { pt: 'não (resposta)',         tupi: 'anyiry',        emoji: '🙅' },
  { pt: 'sem chuva',              tupi: 'ndaokyiry',     emoji: '☀️' },
  { pt: 'eu não como',            tupi: 'ndakaruiry',    emoji: '🚫' },
  { pt: 'eu não sei',             tupi: 'ndaikwaairy',   emoji: '🚫' },
];

/* Fase 20 — Frases completas (desafio final) */
const FRASES = [
  { pt: 'Bom dia!',                     tupi: "Ko'ẽ porã!",       emoji: '🌅' },
  { pt: 'Boa tarde!',                   tupi: "Ka'aru porã!",     emoji: '🌇' },
  { pt: 'Boa noite!',                   tupi: 'Pytũ porã!',       emoji: '🌙' },
  { pt: 'Obrigado / Muito bom!',        tupi: 'Porã eté!',        emoji: '🙏' },
  { pt: 'Como você se chama?',          tupi: 'Marãi nderery?',   emoji: '📛' },
  { pt: 'Eu estou bem',                 tupi: 'Aikó porã',        emoji: '😊' },
  { pt: 'Eu não sei',                   tupi: 'Ndaikwaairy',      emoji: '🤷' },
  { pt: 'Eu vou para a cidade',         tupi: 'Aá tetã-re',       emoji: '🏘️' },
  { pt: 'Eu vim para a aldeia',         tupi: 'Adju tekoá-py',    emoji: '🏕️' },
  { pt: 'A água está quente',           tupi: 'Yy aku',           emoji: '💧' },
  { pt: 'Você é bonita',                tupi: 'Nde porã',         emoji: '🌸' },
  { pt: 'O cachorro morreu',            tupi: 'Katxuru omanõ',    emoji: '🐕' },
  { pt: 'Meu pai acendeu o fogo',       tupi: 'Txeru omoendy tatá', emoji: '🔥' },
  { pt: 'Os meninos brincam lá fora',   tupi: 'Kunumĩ oká-py onhimangá', emoji: '🧒' },
  { pt: 'Eu sou professor',             tupi: 'Txeé nimbo’eá',    emoji: '👨‍🏫' },
  { pt: 'Eu vi o teu pai',              tupi: 'Txeé aetxá nderu', emoji: '👀' },
  { pt: 'O que você quer?',             tupi: "Mba'ewa repotá?",  emoji: '❓' },
  { pt: 'Eu quero aprender',            tupi: 'Aipotá animbo’é',  emoji: '📚' },
  { pt: 'A terra é nossa mãe',          tupi: 'Ywy nhandetsy',    emoji: '🌍' },
  { pt: 'Vou com Deus',                 tupi: 'Tereó porã Nhanderú rewé!', emoji: '🙏' },
];

/* ---------------------------------------------------------
   2. SAUDAÇÕES AUTOMÁTICAS (fase 5+)
   --------------------------------------------------------- */
const GREETINGS = {
  madrugada: [
    { tupi: "Pytũ porã!",   pt: "Boa noite (madrugada)" },
    { tupi: "Ko'ẽmba'i!",   pt: "De manhãzinha, cedinho" },
  ],
  manha: [
    { tupi: "Ko'ẽ porã!",   pt: "Bom dia" },
    { tupi: "Ary porã!",    pt: "Bom dia / dia bonito" },
  ],
  tarde: [
    { tupi: "Ka'aru porã!", pt: "Boa tarde" },
  ],
  noite: [
    { tupi: "Pytũ porã!",   pt: "Boa noite" },
  ],
};

function greetingForHour(h = new Date().getHours()) {
  if (h >= 0 && h < 5) return pick(GREETINGS.madrugada);
  if (h >= 5 && h < 12) return pick(GREETINGS.manha);
  if (h >= 12 && h < 18) return pick(GREETINGS.tarde);
  return pick(GREETINGS.noite);
}

/* ---------------------------------------------------------
   3. SCHEMA DAS FASES
   --------------------------------------------------------- */
const PHASES = {
  1:  { id: 1,  title: 'Alfabeto Tupi',           subtitle: 'Conheça as letras e suas primeiras palavras', level: 'easy',   type: 'alphabet', questions: 0 },
  2:  { id: 2,  title: 'Objetos e Contagem',      subtitle: 'Cesto, arco, panela — e os números',  level: 'easy',   type: 'quiz', questions: 10, pool: () => buildObjectPool().concat(buildNumberPool()) },
  3:  { id: 3,  title: 'Os Animais',              subtitle: 'Bichos da mata na língua nativa',     level: 'easy',   type: 'quiz', questions: 15, pool: () => buildVocabPool(ANIMAIS, 'Animais') },
  4:  { id: 4,  title: 'Insetos e Répteis',       subtitle: 'Bichos pequenos e suas palavras',    level: 'easy',   type: 'quiz', questions: 20, pool: () => buildVocabPool(INSETOS, 'Insetos & Répteis') },
  5:  { id: 5,  title: 'As Cores',                subtitle: 'As cores do mundo Nhandewa',          level: 'easy',   type: 'quiz', questions: 10, pool: () => buildColorPool() },
  6:  { id: 6,  title: 'O Corpo Humano',          subtitle: 'Cabeça, braços, pernas e mais',       level: 'medium', type: 'quiz', questions: 12, pool: () => buildVocabPool(CORPO, 'Corpo') },
  7:  { id: 7,  title: 'A Família',               subtitle: 'Termos de parentesco',                level: 'medium', type: 'quiz', questions: 12, pool: () => buildVocabPool(PARENTESCO, 'Parentesco') },
  8:  { id: 8,  title: 'As Comidas',              subtitle: 'Tembi’u — o que comemos',             level: 'medium', type: 'quiz', questions: 12, pool: () => buildVocabPool(COMIDAS, 'Comidas') },
  9:  { id: 9,  title: 'Advérbios de Lugar',      subtitle: 'Aqui, longe, perto…',                 level: 'medium', type: 'quiz', questions: 12, pool: () => buildVocabPool(ADV_LUGAR, 'Lugar') },
  10: { id: 10, title: 'Advérbios de Tempo',      subtitle: 'Hoje, ontem, amanhã…',                level: 'medium', type: 'quiz', questions: 12, pool: () => buildVocabPool(ADV_TEMPO, 'Tempo') },
  11: { id: 11, title: 'A Natureza',              subtitle: 'Sol, mata, rio e pontos cardeais',    level: 'hard',   type: 'quiz', questions: 12, pool: () => buildVocabPool(NATUREZA, 'Natureza') },
  12: { id: 12, title: 'Verbos Básicos',          subtitle: 'Comer, dormir, cantar, fazer',        level: 'hard',   type: 'quiz', questions: 12, pool: () => buildVocabPool(VERBOS_BASICOS, 'Verbos') },
  13: { id: 13, title: 'Perguntas',               subtitle: 'Mawã? Ma’erã? Mamõ?',                 level: 'hard',   type: 'quiz', questions: 12, pool: () => buildVocabPool(PERGUNTAS, 'Perguntas') },
  14: { id: 14, title: 'Posposições',             subtitle: '-py, -gwi, -rupi: para onde?',        level: 'hard',   type: 'quiz', questions: 12, pool: () => buildVocabPool(POSPOSICOES, 'Gramática') },
  15: { id: 15, title: 'Pronomes',                subtitle: 'Livres e presos',                     level: 'hard',   type: 'quiz', questions: 12, pool: () => buildVocabPool(PRONOMES, 'Gramática') },
  16: { id: 16, title: 'Conjugação 1ª',           subtitle: 'a-, re-, o-: os verbos do dia a dia', level: 'hard',   type: 'quiz', questions: 12, pool: () => buildVocabPool(CONJ1, 'Conjugação') },
  17: { id: 17, title: 'Conjugação 2ª',           subtitle: 'txe-, nde-, i-: os descritivos',      level: 'hard',   type: 'quiz', questions: 12, pool: () => buildVocabPool(CONJ2, 'Conjugação') },
  18: { id: 18, title: 'Verbos Irregulares',      subtitle: 'Ir, vir, dizer, ter, trazer',         level: 'hard',   type: 'quiz', questions: 12, pool: () => buildVocabPool(IRREGULARES, 'Irregulares') },
  19: { id: 19, title: 'Causativos e Negação',    subtitle: '-mbo-, -uká, -iry',                   level: 'hard',   type: 'quiz', questions: 12, pool: () => buildVocabPool(CAUSATIVOS, 'Gramática') },
  20: { id: 20, title: 'Desafio Final',           subtitle: 'Traduza frases inteiras',             level: 'hard',   type: 'quiz', questions: 12, pool: () => buildVocabPool(FRASES, 'Frases') },
};

const ORDER = Array.from({ length: 20 }, (_, i) => i + 1);

/* ---------------------------------------------------------
   4. GERADORES DE POOL
   --------------------------------------------------------- */
function buildVocabPool(list, category) {
  return list.map(item => ({
    category,
    tupi: item.tupi,
    pt: item.pt,
    emoji: item.emoji,
    prompt: `Como se diz <em>${item.pt}</em> em nhandewa?`,
    answer: item.tupi,
    options: sampleOptions(item.tupi, list.map(x => x.tupi)),
  }));
}

function buildObjectPool() {
  return OBJETOS.map(o => ({
    category: 'Objetos',
    tupi: o.tupi, pt: o.pt, emoji: o.emoji,
    prompt: `Como se diz <em>${o.pt}</em> em nhandewa?`,
    answer: o.tupi,
    options: sampleOptions(o.tupi, OBJETOS.map(x => x.tupi)),
  }));
}

function buildNumberPool() {
  return NUMEROS.map(nm => ({
    category: 'Números',
    tupi: nm.tupi, pt: String(nm.n), emoji: '',
    prompt: `Qual é o número <em>${nm.n}</em> em nhandewa?`,
    answer: nm.tupi,
    options: sampleOptions(nm.tupi, NUMEROS.map(x => x.tupi)),
  }));
}

function buildColorPool() {
  return CORES.map(c => ({
    category: 'Cores',
    tupi: c.tupi, pt: c.pt, emoji: c.emoji, hex: c.hex,
    prompt: `Qual palavra nhandewa corresponde à cor
      <span style="display:inline-block;width:14px;height:14px;border-radius:4px;
      vertical-align:-2px;background:${c.hex};border:1px solid rgba(255,255,255,.35);
      margin-right:6px"></span>
      <em>${c.pt}</em>?`,
    answer: c.tupi,
    options: sampleOptions(c.tupi, CORES.map(x => x.tupi)),
  }));
}

function sampleOptions(correct, allTupi, n = 4) {
  const distractors = uniq(allTupi.filter(w => w !== correct));
  const picked = shuffle(distractors).slice(0, n - 1);
  return shuffle([correct, ...picked]);
}

/* ---------------------------------------------------------
   5. UTILITÁRIOS
   --------------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function uniq(arr) { return [...new Set(arr)]; }
function slug(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/* ---------------------------------------------------------
   6. ESTADO + PERSISTÊNCIA
   --------------------------------------------------------- */
const defaultState = () => ({
  avatar: null,
  unlocked: [1],
  best: {},
  totalPoints: 0,
  savedAt: null,
});

let state = loadState();
function loadState() {
  try {
    const raw = localStorage.getItem(CONFIG.storageKey);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch { return defaultState(); }
}
function saveState() {
  state.savedAt = new Date().toISOString();
  try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(state)); } catch {}
}

/* ---------------------------------------------------------
   7. NAVEGAÇÃO
   --------------------------------------------------------- */
function goTo(id) {
  $$('.screen').forEach(s => s.classList.remove('is-active'));
  const screen = document.getElementById('screen-' + id);
  if (screen) screen.classList.add('is-active');
  if (id === 'phases') renderPhaseList();
  if (id === 'start') renderGreeting();
}

/* ---------------------------------------------------------
   8. TELA INICIAL
   --------------------------------------------------------- */
function renderGreeting() {
  const g = greetingForHour();
  const avatar = state.avatar;
  const name = avatar === 'konomi' ? 'Konomĩ' : avatar === 'kunhatai' ? 'Kunhataĩ' : 'viajante';
  const el = $('#greeting');
  if (!el) return;
  el.innerHTML = `<b>${g.tupi}</b> — ${g.pt}. Boa caminhada, <b>${name}</b>!`;
}

function setupStartScreen() {
  const startBtn = $('#btn-start');
  const avatarButtons = $$('.avatar-card');

  avatarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      avatarButtons.forEach(b => b.setAttribute('aria-checked', 'false'));
      btn.setAttribute('aria-checked', 'true');
      state.avatar = btn.dataset.avatar;
      saveState();
      startBtn.disabled = false;
    });
  });

  if (state.avatar) {
    const pre = avatarButtons.find(b => b.dataset.avatar === state.avatar);
    if (pre) { pre.setAttribute('aria-checked', 'true'); startBtn.disabled = false; }
  }

  startBtn.addEventListener('click', () => {
    if (!state.avatar) return;
    goTo('phases');
  });
}

/* ---------------------------------------------------------
   9. LISTA DE FASES (20)
   --------------------------------------------------------- */
function levelLabel(level) {
  return level === 'easy' ? 'Iniciante' : level === 'medium' ? 'Médio' : 'Difícil';
}

function renderPhaseList() {
  const container = $('#phase-list');
  container.innerHTML = '';
  $('#total-score-pill').textContent = `${state.totalPoints} pts`;

  // barra de progresso geral
  const unlockedCount = state.unlocked.length;
  const fill = $('#phase-progress-fill');
  if (fill) fill.style.width = `${(unlockedCount / ORDER.length) * 100}%`;

  ORDER.forEach(id => {
    const phase = PHASES[id];
    const isUnlocked = state.unlocked.includes(id);
    const best = state.best[id];
    const card = document.createElement('button');
    card.className = 'phase-card'
      + (isUnlocked ? '' : ' locked')
      + (best ? ' done' : '');
    card.disabled = !isUnlocked;

    card.innerHTML = `
      <span class="phase-num">${id}</span>
      <span class="phase-info">
        <h3>${phase.title}<span class="phase-level ${phase.level}">${levelLabel(phase.level)}</span></h3>
        <p>${best ? `Melhor: ${best.hits}/${best.total} · ${best.points} pts` : phase.subtitle}</p>
      </span>
      <span class="phase-medal">${best ? medalFor(best.pct) : (isUnlocked ? '▶' : '🔒')}</span>
    `;

    if (isUnlocked) card.addEventListener('click', () => openPhase(id));
    container.appendChild(card);
  });
}

/* ---------------------------------------------------------
   10. FASE 1 — ALFABETO
   --------------------------------------------------------- */
let alphaIndex = 0;

function openAlphabet() { alphaIndex = 0; renderAlphabet(); }

function renderAlphabet() {
  const entry = ALPHABET[alphaIndex];
  if (!entry) return;

  $('#alpha-letter').textContent = entry.letter;
  $('#alpha-word').textContent = entry.word;
  $('#alpha-translation').textContent = entry.translation;
  $('#alpha-emoji').textContent = entry.emoji || '🖼️';
  $('#alpha-progress').textContent = `${alphaIndex + 1}/${ALPHABET.length}`;
  $('#alpha-bar').style.setProperty('--p', `${((alphaIndex + 1) / ALPHABET.length) * 100}%`);

  const visual = $('#alpha-visual');
  const img = $('#alpha-img');
  visual.classList.remove('has-img');
  img.onerror = () => visual.classList.remove('has-img');
  img.onload = () => visual.classList.add('has-img');
  img.src = `${CONFIG.assetPath}${slug(entry.word)}${CONFIG.assetExt}`;

  $('#btn-alpha-prev').disabled = alphaIndex === 0;
  const isLast = alphaIndex === ALPHABET.length - 1;
  $('#btn-alpha-next').textContent = isLast ? 'Concluir fase ✓' : 'Próximo →';
}

function setupAlphabetScreen() {
  $('#btn-alpha-prev').addEventListener('click', () => {
    if (alphaIndex > 0) { alphaIndex--; renderAlphabet(); }
  });
  $('#btn-alpha-next').addEventListener('click', () => {
    if (alphaIndex < ALPHABET.length - 1) { alphaIndex++; renderAlphabet(); }
    else finishAlphabet();
  });
  $('#btn-alpha-restart').addEventListener('click', () => {
    alphaIndex = 0; renderAlphabet();
  });
}

function finishAlphabet() {
  const result = { hits: ALPHABET.length, total: ALPHABET.length, points: 0, pct: 100 };
  state.best[1] = result;
  unlockNext(1);
  saveState();
  showResult(1, result, { mode: 'alphabet' });
}

/* ---------------------------------------------------------
   11. QUIZ (fases 2–20)
   --------------------------------------------------------- */
let quiz = null;

function openPhase(id) {
  const phase = PHASES[id];
  if (!phase) return;

  if (phase.type === 'alphabet') {
    goTo('alphabet'); openAlphabet(); return;
  }

  const pool = phase.pool();
  const questions = shuffle(pool).slice(0, Math.min(phase.questions, pool.length));
  quiz = {
    phaseId: id,
    title: phase.title,
    questions,
    index: 0,
    hits: 0,
    combo: 0,
    points: 0,
    answered: false,
  };

  $('#quiz-title').textContent = `Fase ${id} · ${phase.title}`;
  goTo('quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = quiz.questions[quiz.index];
  if (!q) return finishQuiz();

  const total = quiz.questions.length;
  $('#quiz-progress').textContent = `${quiz.index + 1}/${total}`;
  $('#hud-hits').textContent = quiz.hits;
  $('#hud-combo').textContent = `×${quiz.combo}`;
  $('#hud-points').textContent = quiz.points;

  const g = greetingForHour();
  $('#npc-text').innerHTML = `<b>${g.tupi}</b> (${g.pt}) — ${
    quiz.index === 0 ? 'Vamos começar!' :
    quiz.combo >= 3 ? 'Nembareté! Continue assim!' :
    'Vamos em frente!'
  }`;

  $('#q-kicker').textContent = q.category ? `Categoria · ${q.category}` : 'Pergunta';
  $('#q-text').innerHTML = q.prompt;

  const opts = $('#options');
  opts.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((word, i) => {
    const b = document.createElement('button');
    b.className = 'opt';
    b.innerHTML = `<span class="key">${letters[i]}</span><span>${word}</span>`;
    b.dataset.value = word;
    b.addEventListener('click', () => answer(i, word));
    opts.appendChild(b);
  });

  $('#feedback').innerHTML = '';
  $('#feedback').classList.remove('error');
  $('#btn-next-q').hidden = true;
  quiz.answered = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function answer(index, value) {
  if (quiz.answered) return;
  quiz.answered = true;

  const q = quiz.questions[quiz.index];
  const correct = value === q.answer;
  $$('#options .opt').forEach(b => {
    b.disabled = true;
    if (b.dataset.value === q.answer) b.classList.add('correct');
    else if (b.dataset.value === value) b.classList.add('wrong');
  });

  const fb = $('#feedback');

  if (correct) {
    quiz.hits++;
    quiz.combo++;
    const bonus = Math.min(quiz.combo * CONFIG.comboBonusPerStep, CONFIG.maxComboBonus);
    quiz.points += CONFIG.scorePerHit + bonus;

    fb.classList.remove('error');
    fb.innerHTML = `
      <div class="seal">
        <span class="seal-emoji">${q.emoji || '✅'}</span>
        <div>
          <strong>${q.tupi}</strong>
          <span>${q.pt}</span>
          <div class="cat">${q.category}</div>
        </div>
      </div>`;
  } else {
    quiz.combo = 0;
    fb.classList.add('error');
    fb.innerHTML = `
      <div class="seal">
        <span class="seal-emoji">❌</span>
        <div>
          <strong>${q.answer}</strong>
          <span>${q.pt} — você marcou <em>${value}</em></span>
          <div class="cat">${q.category}</div>
        </div>
      </div>`;
  }

  $('#hud-hits').textContent = quiz.hits;
  $('#hud-combo').textContent = `×${quiz.combo}`;
  $('#hud-points').textContent = quiz.points;
  $('#btn-next-q').hidden = false;
  $('#btn-next-q').textContent = quiz.index === quiz.questions.length - 1
    ? 'Ver resultado ✓' : 'Próxima →';
}

function setupQuizScreen() {
  $('#btn-next-q').addEventListener('click', () => {
    if (!quiz) return;
    quiz.index++;
    if (quiz.index >= quiz.questions.length) finishQuiz();
    else renderQuestion();
  });

  $('#btn-quit-quiz').addEventListener('click', () => {
    if (!quiz) return;
    if (confirm('Sair da fase? O progresso atual será perdido.')) {
      quiz = null; goTo('phases');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!$('#screen-quiz').classList.contains('is-active')) return;
    if (!quiz) return;
    if (['1', '2', '3', '4'].includes(e.key)) {
      const idx = Number(e.key) - 1;
      const btns = $$('#options .opt');
      if (btns[idx] && !btns[idx].disabled) btns[idx].click();
    }
    if (e.key === 'Enter' && !$('#btn-next-q').hidden) $('#btn-next-q').click();
  });
}

function finishQuiz() {
  if (!quiz) return;
  const total = quiz.questions.length;
  const pct = Math.round((quiz.hits / total) * 100);
  const result = { hits: quiz.hits, total, points: quiz.points, pct };
  const phaseId = quiz.phaseId;

  const prev = state.best[phaseId];
  const better = !prev || result.points > prev.points;
  if (better) {
    const diff = result.points - (prev?.points || 0);
    state.totalPoints += diff;
    state.best[phaseId] = result;
  }
  unlockNext(phaseId);
  saveState();
  showResult(phaseId, result, { mode: 'quiz' });
  quiz = null;
}

function unlockNext(phaseId) {
  const next = ORDER[ORDER.indexOf(phaseId) + 1];
  if (next && !state.unlocked.includes(next)) {
    state.unlocked.push(next);
    state.unlocked.sort((a, b) => a - b);
  }
}

/* ---------------------------------------------------------
   12. RESULTADO / MEDALHA
   --------------------------------------------------------- */
function medalFor(pct) {
  if (pct >= 90) return '🥇';
  if (pct >= 70) return '🥈';
  if (pct >= 50) return '🥉';
  return '🎖️';
}

function showResult(phaseId, result, { mode }) {
  const phase = PHASES[phaseId];
  const medal = medalFor(result.pct);

  $('#medal-emoji').textContent = medal;
  $('#result-title').textContent = result.pct >= 70 ? 'Porãeté!' : 'Katu! continua!';
  $('#result-sub').textContent = `Fase ${phaseId} · ${phase.title}`;

  $('#r-hits').textContent = result.hits;
  $('#r-total').textContent = result.total;
  $('#r-points').textContent = result.points;
  $('#r-pct').textContent = result.pct + '%';

  $('#btn-replay').onclick = () => openPhase(phaseId);

  const nextId = ORDER[ORDER.indexOf(phaseId) + 1];
  const nextBtn = $('#btn-next-phase');
  if (nextId && state.unlocked.includes(nextId)) {
    nextBtn.hidden = false;
    nextBtn.textContent = `Seguir para a fase ${nextId} →`;
    nextBtn.onclick = () => openPhase(nextId);
  } else {
    nextBtn.hidden = true;
  }

  goTo('result');
}

/* ---------------------------------------------------------
   13. INIT
   --------------------------------------------------------- */
function init() {
  setupStartScreen();
  setupAlphabetScreen();
  setupQuizScreen();

  $$('[data-go]').forEach(btn => {
    btn.addEventListener('click', () => goTo(btn.dataset.go));
  });

  renderGreeting();
  saveState();

  window.__TAPERUPI = {
    state, PHASES, ALPHABET, OBJETOS, NUMEROS, ANIMAIS, INSETOS, CORES,
    CORPO, PARENTESCO, COMIDAS, ADV_LUGAR, ADV_TEMPO, NATUREZA,
    VERBOS_BASICOS, PERGUNTAS, POSPOSICOES, PRONOMES, CONJ1, CONJ2,
    IRREGULARES, CAUSATIVOS, FRASES,
  };
}

document.addEventListener('DOMContentLoaded', init);
