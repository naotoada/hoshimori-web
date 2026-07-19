'use client';

import { useState, useEffect } from 'react';

// ── 翻訳辞書型 ──
export interface GameI18n {
  // Menu
  menuTitle: string;
  menuBack: string;
  catchName: string;
  catchDesc: string;
  sortName: string;
  sortDesc: string;
  defendName: string;
  defendDesc: string;
  memoryName: string;
  memoryDesc: string;
  slotName: string;
  slotDesc: string;

  // Shared
  backToMenu: string;
  appeared: string;      // "{name} があらわれた！"
  playAgain: string;
  backToSelect: string;

  // CatchGame
  catchInstruction: string;
  catchClear: string;

  // MemoryGame
  memoryReady: string;
  memoryWatch: string;
  memoryTap: string;
  memoryWrong: string;
  memoryCorrect: string;
  memoryNext: string;
  memoryClear: string;

  // SortGame
  sortInstruction: string;
  sortClear: string;

  // DefendGame
  defendGameOver: string;
  defendFail: string;
  defendClear: string;

  // SlotGame
  slotAlmost: string;
  slotMiss: string;
  slotJackpot: string;
  slotCongrats: string;
  slotHint: string;
  slotStop: string;
  slotSpin: string;
  slotRetry: string;
  slotClear: string;
}

// ── 日本語（デフォルト） ──
const ja: GameI18n = {
  menuTitle: 'あそぶゲームをえらんでね！',
  menuBack: '◀ マップに戻る',
  catchName: 'お星さまキャッチ',
  catchDesc: '落ちてくる星をタッチして、たくさん集めよう！',
  sortName: '魔法のしるし合わせ',
  sortDesc: '落ちてくるしるしと同じボタンを素早くおそう！',
  defendName: '迷いを払う！星の防衛戦',
  defendDesc: '迫ってくる雲をタッチして、真ん中の星を守り抜け！',
  memoryName: '星座の記憶つなぎ',
  memoryDesc: '光った星の順番をおぼえて、おなじようにタッチしよう！',
  slotName: '星のルーレット',
  slotDesc: 'タイミングよくボタンをおして、ルーレットをとめてね！',

  backToMenu: '◀ ゲーム選択に戻る',
  appeared: '{name} があらわれた！',
  playAgain: 'もういっかい遊ぶ',
  backToSelect: 'ゲーム選択に戻る',

  catchInstruction: '落ちてくる星をタッチしてね！',
  catchClear: 'すごい！\n星をたくさん集められたね！',

  memoryReady: '星の順番をおぼえてね！',
  memoryWatch: 'よく見ててね...',
  memoryTap: '順番にタップしてね！',
  memoryWrong: 'ざんねん！もういちど挑戦しよう',
  memoryCorrect: 'すごい！せいかい！',
  memoryNext: 'せいかい！つぎのレベルへ！',
  memoryClear: 'ばっちりおぼえられたね！\nきおくりょくがすごい！',

  sortInstruction: '落ちてくるしるしと同じボタンをおしてね！',
  sortClear: 'すごい！\n上手にあわせられたね！',

  defendGameOver: 'ゲームオーバー...',
  defendFail: '星が隠されちゃった！\nもういっかいがんばろう！',
  defendClear: 'すごい！\n星をまもりぬいたね！',

  slotAlmost: 'おしい！あと1つだった！',
  slotMiss: 'ざんねん…！もういっかい！',
  slotJackpot: '🎰 大当たり！ 🎰',
  slotCongrats: '✨ おめでとう！ ✨',
  slotHint: '3つ揃えたら星守りが出てくるよ！',
  slotStop: 'ストップ',
  slotSpin: 'スピンスタート！',
  slotRetry: 'もういっかい！',
  slotClear: '3つ揃ったね！すごい！\nまたあそんでみてね！',
};

// ── 英語 ──
const en: GameI18n = {
  menuTitle: 'Choose a game to play!',
  menuBack: '◀ Back to Map',
  catchName: 'Star Catch',
  catchDesc: 'Tap the falling stars and collect as many as you can!',
  sortName: 'Magic Symbol Match',
  sortDesc: 'Quickly tap the button that matches the falling symbol!',
  defendName: 'Star Defense!',
  defendDesc: 'Tap the approaching clouds to protect the star in the center!',
  memoryName: 'Constellation Memory',
  memoryDesc: 'Remember the order of the glowing stars and tap them!',
  slotName: 'Star Roulette',
  slotDesc: 'Press the button at the right time to stop the roulette!',

  backToMenu: '◀ Back to Games',
  appeared: '{name} appeared!',
  playAgain: 'Play Again',
  backToSelect: 'Back to Game Select',

  catchInstruction: 'Tap the falling stars!',
  catchClear: 'Amazing!\nYou collected so many stars!',

  memoryReady: 'Remember the order of stars!',
  memoryWatch: 'Watch carefully...',
  memoryTap: 'Tap in order!',
  memoryWrong: 'Oops! Try again!',
  memoryCorrect: 'Great! Correct!',
  memoryNext: 'Correct! Next level!',
  memoryClear: 'Perfect memory!\nYou remembered them all!',

  sortInstruction: 'Tap the button matching the falling symbol!',
  sortClear: 'Amazing!\nYou matched them perfectly!',

  defendGameOver: 'Game Over...',
  defendFail: 'The star got hidden!\nTry again!',
  defendClear: 'Amazing!\nYou protected the star!',

  slotAlmost: 'So close! Just one more!',
  slotMiss: 'Oops! Try again!',
  slotJackpot: '🎰 Jackpot! 🎰',
  slotCongrats: '✨ Congratulations! ✨',
  slotHint: 'Match 3 to meet a Hoshimori!',
  slotStop: 'STOP',
  slotSpin: 'SPIN!',
  slotRetry: 'Try Again!',
  slotClear: 'You matched 3! Amazing!\nPlay again anytime!',
};

// ── 繁体字中国語 ──
const zh: GameI18n = {
  menuTitle: '選一個遊戲來玩吧！',
  menuBack: '◀ 回到地圖',
  catchName: '星星接接樂',
  catchDesc: '點擊掉落的星星，盡量多收集一些！',
  sortName: '魔法符號配對',
  sortDesc: '快速按下與掉落符號相同的按鈕！',
  defendName: '星星防衛戰！',
  defendDesc: '點擊靠近的雲朵，守護中央的星星！',
  memoryName: '星座記憶連連看',
  memoryDesc: '記住發光星星的順序，然後按順序點擊！',
  slotName: '星星輪盤',
  slotDesc: '在合適的時機按下按鈕來停止輪盤！',

  backToMenu: '◀ 回到遊戲選擇',
  appeared: '{name} 出現了！',
  playAgain: '再玩一次',
  backToSelect: '回到遊戲選擇',

  catchInstruction: '點擊掉落的星星！',
  catchClear: '太厲害了！\n收集了好多星星！',

  memoryReady: '記住星星的順序！',
  memoryWatch: '仔細看好喔...',
  memoryTap: '按順序點擊！',
  memoryWrong: '可惜！再試一次吧！',
  memoryCorrect: '太棒了！正確！',
  memoryNext: '正確！進入下一關！',
  memoryClear: '完美記住了！\n記憶力超強！',

  sortInstruction: '按下與掉落符號相同的按鈕！',
  sortClear: '太厲害了！\n配對得很完美！',

  defendGameOver: '遊戲結束...',
  defendFail: '星星被藏起來了！\n再挑戰一次吧！',
  defendClear: '太厲害了！\n成功守護了星星！',

  slotAlmost: '好可惜！就差一個！',
  slotMiss: '可惜！再試一次！',
  slotJackpot: '🎰 大獎！ 🎰',
  slotCongrats: '✨ 恭喜！ ✨',
  slotHint: '三個一樣就能遇見星守護喔！',
  slotStop: '停止',
  slotSpin: '開始轉！',
  slotRetry: '再來一次！',
  slotClear: '三個一樣了！太厲害了！\n再來玩玩看吧！',
};

// ── 韓国語 ──
const ko: GameI18n = {
  menuTitle: '하고 싶은 게임을 골라봐!',
  menuBack: '◀ 맵으로 돌아가기',
  catchName: '별 잡기',
  catchDesc: '떨어지는 별을 터치해서 많이 모으자!',
  sortName: '마법의 기호 맞추기',
  sortDesc: '떨어지는 기호와 같은 버튼을 빠르게 눌러!',
  defendName: '별 방어전!',
  defendDesc: '다가오는 구름을 터치해서 가운데 별을 지켜!',
  memoryName: '별자리 기억 잇기',
  memoryDesc: '빛나는 별의 순서를 기억하고 같은 순서로 터치!',
  slotName: '별 룰렛',
  slotDesc: '타이밍에 맞춰 버튼을 눌러 룰렛을 멈춰!',

  backToMenu: '◀ 게임 선택으로',
  appeared: '{name} 이(가) 나타났다!',
  playAgain: '다시 한 번!',
  backToSelect: '게임 선택으로',

  catchInstruction: '떨어지는 별을 터치해!',
  catchClear: '대단해!\n별을 많이 모았어!',

  memoryReady: '별의 순서를 기억해!',
  memoryWatch: '잘 보고 있어...',
  memoryTap: '순서대로 터치해!',
  memoryWrong: '아쉽다! 다시 도전해 보자!',
  memoryCorrect: '대단해! 정답!',
  memoryNext: '정답! 다음 레벨로!',
  memoryClear: '완벽하게 기억했어!\n기억력이 대단해!',

  sortInstruction: '떨어지는 기호와 같은 버튼을 눌러!',
  sortClear: '대단해!\n잘 맞췄어!',

  defendGameOver: '게임 오버...',
  defendFail: '별이 숨겨졌어!\n다시 한 번 힘내자!',
  defendClear: '대단해!\n별을 지켜냈어!',

  slotAlmost: '아깝다! 하나만 더였는데!',
  slotMiss: '아쉽다! 다시 한 번!',
  slotJackpot: '🎰 대박! 🎰',
  slotCongrats: '✨ 축하해! ✨',
  slotHint: '3개가 맞으면 별지기를 만날 수 있어!',
  slotStop: '스톱',
  slotSpin: '스핀 시작!',
  slotRetry: '다시 한 번!',
  slotClear: '3개 맞았다! 대단해!\n또 놀아 보자!',
};

// ── スペイン語 ──
const es: GameI18n = {
  menuTitle: '¡Elige un juego!',
  menuBack: '◀ Volver al Mapa',
  catchName: 'Atrapa Estrellas',
  catchDesc: '¡Toca las estrellas que caen y recoge muchas!',
  sortName: 'Combina Símbolos',
  sortDesc: '¡Toca rápido el botón del símbolo que cae!',
  defendName: '¡Defensa Estelar!',
  defendDesc: '¡Toca las nubes para proteger la estrella central!',
  memoryName: 'Memoria Estelar',
  memoryDesc: '¡Recuerda el orden de las estrellas y tócalas!',
  slotName: 'Ruleta Estelar',
  slotDesc: '¡Pulsa el botón en el momento justo para parar!',

  backToMenu: '◀ Volver a Juegos',
  appeared: '¡{name} ha aparecido!',
  playAgain: 'Jugar de nuevo',
  backToSelect: 'Volver a Juegos',

  catchInstruction: '¡Toca las estrellas que caen!',
  catchClear: '¡Increíble!\n¡Recogiste muchas estrellas!',

  memoryReady: '¡Recuerda el orden!',
  memoryWatch: 'Observa bien...',
  memoryTap: '¡Toca en orden!',
  memoryWrong: '¡Casi! ¡Inténtalo de nuevo!',
  memoryCorrect: '¡Genial! ¡Correcto!',
  memoryNext: '¡Correcto! ¡Siguiente nivel!',
  memoryClear: '¡Memoria perfecta!\n¡Increíble!',

  sortInstruction: '¡Toca el botón del símbolo que cae!',
  sortClear: '¡Increíble!\n¡Lo combinaste perfecto!',

  defendGameOver: 'Fin del juego...',
  defendFail: '¡La estrella fue cubierta!\n¡Inténtalo de nuevo!',
  defendClear: '¡Increíble!\n¡Protegiste la estrella!',

  slotAlmost: '¡Casi! ¡Faltó uno!',
  slotMiss: '¡Ups! ¡Otra vez!',
  slotJackpot: '🎰 ¡Premio! 🎰',
  slotCongrats: '✨ ¡Felicidades! ✨',
  slotHint: '¡Combina 3 para encontrar un Hoshimori!',
  slotStop: 'PARAR',
  slotSpin: '¡GIRAR!',
  slotRetry: '¡Otra vez!',
  slotClear: '¡3 iguales! ¡Increíble!\n¡Juega cuando quieras!',
};

// ── フランス語 ──
const fr: GameI18n = {
  menuTitle: 'Choisis un jeu !',
  menuBack: '◀ Retour à la Carte',
  catchName: 'Attrape-Étoiles',
  catchDesc: 'Touche les étoiles qui tombent et collecte-en plein !',
  sortName: 'Symboles Magiques',
  sortDesc: 'Appuie vite sur le bouton du symbole qui tombe !',
  defendName: 'Défense Stellaire !',
  defendDesc: 'Touche les nuages pour protéger l\'étoile centrale !',
  memoryName: 'Mémoire Stellaire',
  memoryDesc: 'Retiens l\'ordre des étoiles et touche-les !',
  slotName: 'Roulette Stellaire',
  slotDesc: 'Appuie au bon moment pour arrêter la roulette !',

  backToMenu: '◀ Retour aux Jeux',
  appeared: '{name} est apparu(e) !',
  playAgain: 'Rejouer',
  backToSelect: 'Retour aux Jeux',

  catchInstruction: 'Touche les étoiles qui tombent !',
  catchClear: 'Génial !\nTu as collecté plein d\'étoiles !',

  memoryReady: 'Retiens l\'ordre des étoiles !',
  memoryWatch: 'Regarde bien...',
  memoryTap: 'Touche dans l\'ordre !',
  memoryWrong: 'Raté ! Réessaie !',
  memoryCorrect: 'Super ! Correct !',
  memoryNext: 'Correct ! Niveau suivant !',
  memoryClear: 'Mémoire parfaite !\nIncroyable !',

  sortInstruction: 'Appuie sur le bouton du symbole qui tombe !',
  sortClear: 'Génial !\nParfaitement combiné !',

  defendGameOver: 'Fin de partie...',
  defendFail: 'L\'étoile a été cachée !\nRéessaie !',
  defendClear: 'Génial !\nTu as protégé l\'étoile !',

  slotAlmost: 'Presque ! Plus qu\'un !',
  slotMiss: 'Raté ! Encore une fois !',
  slotJackpot: '🎰 Jackpot ! 🎰',
  slotCongrats: '✨ Félicitations ! ✨',
  slotHint: 'Aligne 3 pour rencontrer un Hoshimori !',
  slotStop: 'STOP',
  slotSpin: 'TOURNER !',
  slotRetry: 'Encore !',
  slotClear: '3 alignés ! Génial !\nRejoue quand tu veux !',
};

// ── ドイツ語 ──
const de: GameI18n = {
  menuTitle: 'Wähle ein Spiel!',
  menuBack: '◀ Zurück zur Karte',
  catchName: 'Sternenfang',
  catchDesc: 'Tippe auf die fallenden Sterne und sammle viele!',
  sortName: 'Magische Symbole',
  sortDesc: 'Drücke schnell den passenden Symbol-Button!',
  defendName: 'Sternenverteidigung!',
  defendDesc: 'Tippe auf die Wolken, um den Stern zu schützen!',
  memoryName: 'Sternen-Memory',
  memoryDesc: 'Merke dir die Reihenfolge und tippe sie nach!',
  slotName: 'Sternen-Roulette',
  slotDesc: 'Drücke im richtigen Moment, um das Roulette zu stoppen!',

  backToMenu: '◀ Zurück zur Auswahl',
  appeared: '{name} ist erschienen!',
  playAgain: 'Nochmal spielen',
  backToSelect: 'Zurück zur Auswahl',

  catchInstruction: 'Tippe auf die fallenden Sterne!',
  catchClear: 'Toll!\nDu hast viele Sterne gesammelt!',

  memoryReady: 'Merke dir die Reihenfolge!',
  memoryWatch: 'Schau genau hin...',
  memoryTap: 'Tippe in der Reihenfolge!',
  memoryWrong: 'Schade! Versuch es nochmal!',
  memoryCorrect: 'Super! Richtig!',
  memoryNext: 'Richtig! Nächstes Level!',
  memoryClear: 'Perfektes Gedächtnis!\nUnglaublich!',

  sortInstruction: 'Drücke den passenden Symbol-Button!',
  sortClear: 'Toll!\nPerfekt kombiniert!',

  defendGameOver: 'Spiel vorbei...',
  defendFail: 'Der Stern wurde versteckt!\nVersuch es nochmal!',
  defendClear: 'Toll!\nDu hast den Stern beschützt!',

  slotAlmost: 'Knapp! Nur noch eins!',
  slotMiss: 'Schade! Nochmal!',
  slotJackpot: '🎰 Volltreffer! 🎰',
  slotCongrats: '✨ Glückwunsch! ✨',
  slotHint: '3 gleiche für einen Hoshimori!',
  slotStop: 'STOPP',
  slotSpin: 'DREHEN!',
  slotRetry: 'Nochmal!',
  slotClear: '3 gleiche! Toll!\nSpiel jederzeit wieder!',
};

// ── ロシア語 ──
const ru: GameI18n = {
  menuTitle: 'Выбери игру!',
  menuBack: '◀ Назад к Карте',
  catchName: 'Лови Звёзды',
  catchDesc: 'Нажимай на падающие звёзды и собери побольше!',
  sortName: 'Магические Символы',
  sortDesc: 'Быстро нажми кнопку с таким же символом!',
  defendName: 'Защита Звёзд!',
  defendDesc: 'Нажимай на облака, чтобы защитить звезду!',
  memoryName: 'Звёздная Память',
  memoryDesc: 'Запомни порядок звёзд и нажми их по порядку!',
  slotName: 'Звёздная Рулетка',
  slotDesc: 'Нажми кнопку вовремя, чтобы остановить рулетку!',

  backToMenu: '◀ К выбору игр',
  appeared: '{name} появился!',
  playAgain: 'Играть снова',
  backToSelect: 'К выбору игр',

  catchInstruction: 'Нажимай на падающие звёзды!',
  catchClear: 'Потрясающе!\nТы собрал(а) много звёзд!',

  memoryReady: 'Запомни порядок звёзд!',
  memoryWatch: 'Смотри внимательно...',
  memoryTap: 'Нажми по порядку!',
  memoryWrong: 'Ой! Попробуй ещё!',
  memoryCorrect: 'Супер! Правильно!',
  memoryNext: 'Правильно! Следующий уровень!',
  memoryClear: 'Отличная память!\nНевероятно!',

  sortInstruction: 'Нажми кнопку с таким же символом!',
  sortClear: 'Потрясающе!\nОтлично совмещено!',

  defendGameOver: 'Игра окончена...',
  defendFail: 'Звезда спрятана!\nПопробуй ещё!',
  defendClear: 'Потрясающе!\nТы защитил(а) звезду!',

  slotAlmost: 'Почти! Ещё одна!',
  slotMiss: 'Ой! Ещё раз!',
  slotJackpot: '🎰 Джекпот! 🎰',
  slotCongrats: '✨ Поздравляем! ✨',
  slotHint: 'Собери 3 одинаковых — встретишь Хосимори!',
  slotStop: 'СТОП',
  slotSpin: 'КРУТИ!',
  slotRetry: 'Ещё раз!',
  slotClear: '3 совпали! Потрясающе!\nИграй снова!',
};

// ── ポルトガル語 ──
const pt: GameI18n = {
  menuTitle: 'Escolha um jogo!',
  menuBack: '◀ Voltar ao Mapa',
  catchName: 'Pega Estrelas',
  catchDesc: 'Toque nas estrelas que caem e colete muitas!',
  sortName: 'Símbolos Mágicos',
  sortDesc: 'Pressione rápido o botão do símbolo que cai!',
  defendName: 'Defesa Estelar!',
  defendDesc: 'Toque nas nuvens para proteger a estrela central!',
  memoryName: 'Memória Estelar',
  memoryDesc: 'Lembre a ordem das estrelas e toque nelas!',
  slotName: 'Roleta Estelar',
  slotDesc: 'Aperte o botão na hora certa para parar a roleta!',

  backToMenu: '◀ Voltar aos Jogos',
  appeared: '{name} apareceu!',
  playAgain: 'Jogar de novo',
  backToSelect: 'Voltar aos Jogos',

  catchInstruction: 'Toque nas estrelas que caem!',
  catchClear: 'Incrível!\nVocê coletou muitas estrelas!',

  memoryReady: 'Lembre a ordem das estrelas!',
  memoryWatch: 'Observe bem...',
  memoryTap: 'Toque em ordem!',
  memoryWrong: 'Quase! Tente de novo!',
  memoryCorrect: 'Ótimo! Correto!',
  memoryNext: 'Correto! Próximo nível!',
  memoryClear: 'Memória perfeita!\nIncrível!',

  sortInstruction: 'Toque no botão do símbolo que cai!',
  sortClear: 'Incrível!\nCombinação perfeita!',

  defendGameOver: 'Fim de jogo...',
  defendFail: 'A estrela foi escondida!\nTente de novo!',
  defendClear: 'Incrível!\nVocê protegeu a estrela!',

  slotAlmost: 'Quase! Faltou um!',
  slotMiss: 'Ops! Tente de novo!',
  slotJackpot: '🎰 Jackpot! 🎰',
  slotCongrats: '✨ Parabéns! ✨',
  slotHint: 'Combine 3 para encontrar um Hoshimori!',
  slotStop: 'PARAR',
  slotSpin: 'GIRAR!',
  slotRetry: 'De novo!',
  slotClear: '3 iguais! Incrível!\nJogue quando quiser!',
};

// ── 辞書マップ ──
const TRANSLATIONS: Record<string, GameI18n> = { ja, en, zh, ko, es, fr, de, ru, pt };

// ── フック: URLの ?lang= パラメータから翻訳オブジェクトを返す ──
export function useLang(): GameI18n {
  const [lang, setLang] = useState('ja');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const l = params.get('lang') || 'ja';
      setLang(l);
    }
  }, []);

  return TRANSLATIONS[lang] || TRANSLATIONS.ja;
}
