/**
 * 九星構造学ベースの相性判定ロジック
 * 五行の相生・相剋関係から構造的な相性を算出する
 */

// 九星 → 五行マッピング
const STAR_TO_ELEMENT: Record<number, string> = {
  1: '水', // 一白水星
  2: '土', // 二黒土星
  3: '木', // 三碧木星
  4: '木', // 四緑木星
  5: '土', // 五黄土星
  6: '金', // 六白金星
  7: '金', // 七赤金星
  8: '土', // 八白土星
  9: '火', // 九紫火星
};

// 九星名
export const STAR_NAMES: Record<number, string> = {
  1: '一白水星',
  2: '二黒土星',
  3: '三碧木星',
  4: '四緑木星',
  5: '五黄土星',
  6: '六白金星',
  7: '七赤金星',
  8: '八白土星',
  9: '九紫火星',
};

// 五行の相生関係（AがBを生む）
const GENERATES: Record<string, string> = {
  '木': '火', // 木生火
  '火': '土', // 火生土
  '土': '金', // 土生金
  '金': '水', // 金生水
  '水': '木', // 水生木
};

// 五行の相剋関係（AがBを剋す）
const OVERCOMES: Record<string, string> = {
  '木': '土', // 木剋土
  '土': '水', // 土剋水
  '水': '火', // 水剋火
  '火': '金', // 火剋金
  '金': '木', // 金剋木
};

export type CompatibilityLevel = 'excellent' | 'good' | 'neutral' | 'friction' | 'challenge';

export interface CompatibilityResult {
  level: CompatibilityLevel;
  score: number; // 0-100
  elementA: string;
  elementB: string;
  starA: number;
  starB: number;
  relationship: string;
  summary: string;
  strengths: string[];
  frictions: string[];
  advice: string;
}

export function calculateCompatibility(starA: number, starB: number): CompatibilityResult {
  const elementA = STAR_TO_ELEMENT[starA];
  const elementB = STAR_TO_ELEMENT[starB];

  // 同じ星
  if (starA === starB) {
    return {
      level: 'good',
      score: 75,
      elementA, elementB, starA, starB,
      relationship: '同質（ツイン）',
      summary: '同じ構造を持つふたり。分かり合える部分が大きい反面、似すぎて盲点も共有しやすいかもしれません。',
      strengths: [
        '言わなくても通じる感覚がある',
        '価値観の根っこが似ている',
        '一緒にいて疲れにくい',
      ],
      frictions: [
        '似すぎて新しい視点が生まれにくい',
        '同じ弱点を持つため、ピンチ時に両方が沈む可能性',
        'お互いの短所が目につきやすい（鏡効果）',
      ],
      advice: '第三の視点を持つ人を意識的に巻き込むと、ふたりの関係に新しい風が入ります。',
    };
  }

  // 同じ五行
  if (elementA === elementB) {
    return {
      level: 'good',
      score: 70,
      elementA, elementB, starA, starB,
      relationship: '同族（比和）',
      summary: '同じ五行を持つ仲間。根本的な方向性は近いですが、アプローチが少し違うので良い刺激になるかもしれません。',
      strengths: [
        '基本的な価値観が近い',
        '協力関係を築きやすい',
        '相手の考えを直感的に理解できる',
      ],
      frictions: [
        '似た才能を持つため、無意識にライバル意識が生まれることも',
        '同じ方向に進みやすく、バランスが偏る可能性',
      ],
      advice: 'お互いの微妙な「違い」に注目すると、似ているからこそ見つかる強みがあります。',
    };
  }

  // A が B を生む（相生：応援関係）
  if (GENERATES[elementA] === elementB) {
    return {
      level: 'excellent',
      score: 90,
      elementA, elementB, starA, starB,
      relationship: '応援（相生）',
      summary: `${STAR_NAMES[starA]}が${STAR_NAMES[starB]}を自然と後押しする関係です。一緒にいると${STAR_NAMES[starB]}のエネルギーが上がりやすいかもしれません。`,
      strengths: [
        `${STAR_NAMES[starA]}の存在が${STAR_NAMES[starB]}のパワー源になる`,
        '一緒にいると自然と成長できる関係',
        '教える側・教わる側の役割分担が自然にできる',
      ],
      frictions: [
        `${STAR_NAMES[starA]}が与えすぎて消耗する可能性`,
        `${STAR_NAMES[starB]}が依存しやすくなることも`,
      ],
      advice: '応援する側が疲れていないか、定期的に確認し合うと長続きする関係になります。',
    };
  }

  // B が A を生む（被相生：応援される関係）
  if (GENERATES[elementB] === elementA) {
    return {
      level: 'excellent',
      score: 88,
      elementA, elementB, starA, starB,
      relationship: '応援（相生）',
      summary: `${STAR_NAMES[starB]}が${STAR_NAMES[starA]}を自然と後押しする関係です。一緒にいると${STAR_NAMES[starA]}のエネルギーが上がりやすいかもしれません。`,
      strengths: [
        `${STAR_NAMES[starB]}の存在が${STAR_NAMES[starA]}のパワー源になる`,
        '無理なく支え合える自然な関係',
        'お互いの才能が引き立て合う',
      ],
      frictions: [
        `${STAR_NAMES[starB]}が与えすぎて消耗する可能性`,
        '一方通行の関係にならないよう注意',
      ],
      advice: '応援される側も、感謝を言葉にして伝えると関係のバランスが整います。',
    };
  }

  // A が B を剋す（相剋：緊張関係）
  if (OVERCOMES[elementA] === elementB) {
    return {
      level: 'challenge',
      score: 40,
      elementA, elementB, starA, starB,
      relationship: '挑戦（相剋）',
      summary: `${STAR_NAMES[starA]}の力が${STAR_NAMES[starB]}を無意識に抑え込みやすい構造です。ただし、これは「悪い関係」ではなく「構造を知れば乗り越えられる関係」です。`,
      strengths: [
        'お互いにない視点を持っている',
        '緊張感が成長のエンジンになりうる',
        '乗り越えると最強のパートナーになれる',
      ],
      frictions: [
        `${STAR_NAMES[starA]}の言動が${STAR_NAMES[starB]}のエネルギーを削ぎやすい`,
        '意図せずプレッシャーを与えてしまうことがある',
        '「なんで分かってくれないの？」と感じやすい',
      ],
      advice: '「伝わらないのは構造が違うから」と理解するだけで、驚くほど関係が楽になります。相手の五行を意識した声かけを心がけてみてください。',
    };
  }

  // B が A を剋す（被相剋：抑制される関係）
  if (OVERCOMES[elementB] === elementA) {
    return {
      level: 'challenge',
      score: 42,
      elementA, elementB, starA, starB,
      relationship: '挑戦（相剋）',
      summary: `${STAR_NAMES[starB]}の力が${STAR_NAMES[starA]}を無意識に抑え込みやすい構造です。ただし、構造を知っていれば十分に乗り越えられる関係です。`,
      strengths: [
        '自分にない強みを持つ相手から学べる',
        '補完関係として機能する可能性',
        '意識的に距離感を調整すれば安定する',
      ],
      frictions: [
        `${STAR_NAMES[starB]}が無意識にペースを握りやすい`,
        `${STAR_NAMES[starA]}が自分を出しにくくなることがある`,
        '上下関係に見えやすい',
      ],
      advice: '「相手が悪いわけではなく、構造の違い」と知るだけで呼吸が楽になります。お互いの領域を尊重し合うことが鍵です。',
    };
  }

  // フォールバック（理論的にはここに到達しない）
  return {
    level: 'neutral',
    score: 60,
    elementA, elementB, starA, starB,
    relationship: '中庸',
    summary: '特別な相生・相剋関係にないニュートラルな組み合わせです。',
    strengths: ['お互いに干渉しすぎない自然な距離感', 'フラットな関係を築きやすい'],
    frictions: ['特別なきっかけがないと関係が深まりにくい'],
    advice: '意識的に共通の体験を作ると、関係が深まっていきます。',
  };
}
