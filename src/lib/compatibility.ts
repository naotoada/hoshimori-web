/**
 * 星守り なかよし診断ロジック
 * 90体すべての星守りの性格・強み・弱みをもとに
 * 「似てるところ」「助け合えるところ」「暮らしの相性」の3つで診断する。
 */

import { TRAITS_TABLE, type CharacterTraits } from './traits';
import { CHARACTER_MAP } from './characterMap';

// ---------- Types ----------
export type CompatLevel = 'soulmate' | 'excellent' | 'good' | 'neutral' | 'growth';

export interface CompatResult {
  score: number;          // 0-100
  level: CompatLevel;
  idA: string;
  idB: string;
  nameA: string;
  nameB: string;
  resonance: number;      // 共鳴スコア (似ている度合い)
  complement: number;     // 補完スコア (弱みを補う度合い)
  summary: string;
  strengths: string[];
  frictions: string[];
  advice: string;
}

// ---------- 性格タイプのラベル ----------
const DIM_LABELS: Record<keyof CharacterTraits, string> = {
  social: 'ひとづきあい',
  stability: 'マイペース度',
  sensitive: 'こころの繊細さ',
  action: 'やってみよう力',
  aesthetic: 'こだわり度',
  independent: 'ひとりでやりたい度',
};

const DIMS: (keyof CharacterTraits)[] = ['social', 'stability', 'sensitive', 'action', 'aesthetic', 'independent'];

// ---------- Core calculation ----------

/** ユークリッド距離（正規化済み: 0-1） */
function distance(a: CharacterTraits, b: CharacterTraits): number {
  let sum = 0;
  for (const d of DIMS) {
    sum += (a[d] - b[d]) ** 2;
  }
  // Max possible distance: sqrt(6 * 9^2) = sqrt(486) ≈ 22.05
  return Math.sqrt(sum) / 22.05;
}

/** 共鳴スコア: 近いほど高い (0-100) */
function resonanceScore(a: CharacterTraits, b: CharacterTraits): number {
  return Math.round((1 - distance(a, b)) * 100);
}

/** 補完スコア: お互いの弱みを補完する度合い (0-100) */
function complementScore(a: CharacterTraits, b: CharacterTraits): number {
  let score = 0;
  let count = 0;
  for (const d of DIMS) {
    const avg = (a[d] + b[d]) / 2;
    // 両者の平均が極端でなく中庸（4〜7）に近いほど良い補完
    const mid = 5.5;
    const distFromMid = Math.abs(avg - mid);
    score += Math.max(0, 1 - distFromMid / 4.5);
    count++;

    // 片方が低く片方が高い → 補完ボーナス
    const diff = Math.abs(a[d] - b[d]);
    if (diff >= 4 && avg >= 4 && avg <= 7) {
      score += 0.3;
    }
  }
  return Math.round((score / (count * 1.3)) * 100);
}

/** 環境一致スコア: 安定性と社交性の方向が近いほど日常生活が楽 */
function lifestyleScore(a: CharacterTraits, b: CharacterTraits): number {
  const stabDiff = Math.abs(a.stability - b.stability);
  const socialDiff = Math.abs(a.social - b.social);
  const sensDiff = Math.abs(a.sensitive - b.sensitive);
  const total = stabDiff + socialDiff + sensDiff;
  // max total = 27
  return Math.round((1 - total / 27) * 100);
}

// ---------- Insight generation ----------

function findTopStrengths(a: CharacterTraits, b: CharacterTraits, nameA: string, nameB: string): string[] {
  const strengths: string[] = [];

  // 似ているところ
  const similar: { dim: keyof CharacterTraits; val: number }[] = [];
  for (const d of DIMS) {
    if (Math.abs(a[d] - b[d]) <= 2) {
      similar.push({ dim: d, val: (a[d] + b[d]) / 2 });
    }
  }
  if (similar.length >= 3) {
    const labels = similar.slice(0, 3).map(s => `「${DIM_LABELS[s.dim]}」`).join('・');
    strengths.push(`${labels}が似ていて、言葉にしなくても気持ちが伝わりやすい関係です`);
  }

  // 具体的な共鳴
  if (Math.abs(a.sensitive - b.sensitive) <= 2 && a.sensitive >= 7) {
    strengths.push('ふたりとも心が繊細。お互いの「言葉にならない気持ち」をそっと分かってあげられます');
  }
  if (Math.abs(a.aesthetic - b.aesthetic) <= 2 && a.aesthetic >= 7) {
    strengths.push('「いいな」と思うもの、「すてきだな」と感じるものが似ていて、好きなものを共有しやすい');
  }
  if (Math.abs(a.stability - b.stability) <= 2) {
    strengths.push('生活リズムや変化への向き合い方が似ているため、日常が自然と噛み合う');
  }
  if (Math.abs(a.social - b.social) <= 2) {
    strengths.push('人付き合いのペースが近いため、一緒にいて疲れにくい');
  }

  // 助け合えるところ（違いがあるからこそ）
  if (a.action >= 7 && b.action <= 4) {
    strengths.push(`${nameA}の「まずやってみよう！」が、じっくり考える${nameB}の背中をそっと押してくれます`);
  } else if (b.action >= 7 && a.action <= 4) {
    strengths.push(`${nameB}の「まずやってみよう！」が、じっくり考える${nameA}の背中をそっと押してくれます`);
  }
  if (a.independent >= 7 && b.independent <= 4) {
    strengths.push(`${nameA}のしっかりした芯と、${nameB}のみんなを大切にする気持ちが、いいバランスを作ります`);
  } else if (b.independent >= 7 && a.independent <= 4) {
    strengths.push(`${nameB}のしっかりした芯と、${nameA}のみんなを大切にする気持ちが、いいバランスを作ります`);
  }
  if (a.social >= 7 && b.social <= 4) {
    strengths.push(`${nameA}がお友だちとの橋渡し役、${nameB}がおうちの安心を守る——すてきな役割分担です`);
  } else if (b.social >= 7 && a.social <= 4) {
    strengths.push(`${nameB}がお友だちとの橋渡し役、${nameA}がおうちの安心を守る——すてきな役割分担です`);
  }

  return strengths.length > 0 ? strengths.slice(0, 4) : ['お互いに干渉しすぎない、自然な距離感を保てる関係'];
}

function findFrictions(a: CharacterTraits, b: CharacterTraits, nameA: string, nameB: string): string[] {
  const frictions: string[] = [];

  if (Math.abs(a.stability - b.stability) >= 5) {
    frictions.push('変化への向き合い方が大きく異なるため、「もっと動いて」「もっと落ち着いて」とすれ違いやすい');
  }
  if (Math.abs(a.action - b.action) >= 5) {
    const fast = a.action > b.action ? nameA : nameB;
    const slow = a.action > b.action ? nameB : nameA;
    frictions.push(`${fast}は「早く動きたい！」タイプ、${slow}は「じっくり考えたい」タイプ。テンポのちがいでイライラしやすいかも`);
  }
  if (Math.abs(a.sensitive - b.sensitive) >= 5) {
    const sensitivePerson = a.sensitive > b.sensitive ? nameA : nameB;
    const toughPerson = a.sensitive > b.sensitive ? nameB : nameA;
    frictions.push(`${sensitivePerson}が傷つく場面で${toughPerson}が気づけないことがある——「なぜそれで傷つくの？」のすれ違い`);
  }
  if (Math.abs(a.social - b.social) >= 5) {
    frictions.push('人付き合いの量や距離感に差があり、「もっと一緒にいたい」「一人の時間がほしい」のギャップが生まれやすい');
  }
  if (Math.abs(a.independent - b.independent) >= 5) {
    frictions.push('「自分でやりたい」と「一緒にやりたい」のバランスが異なり、距離感の調整が必要');
  }
  if (a.aesthetic >= 8 && b.aesthetic <= 3) {
    frictions.push(`${nameA}が重視する美的基準を${nameB}が理解しにくく、「こだわりすぎ」と感じることも`);
  } else if (b.aesthetic >= 8 && a.aesthetic <= 3) {
    frictions.push(`${nameB}が重視する美的基準を${nameA}が理解しにくく、「こだわりすぎ」と感じることも`);
  }

  // 両方が高い独立性 → ぶつかりやすい
  if (a.independent >= 8 && b.independent >= 8) {
    frictions.push('ふたりとも「自分のやり方」に自信があるため、主導権争いが起きやすい');
  }
  // 両方が高い感受性 → 共倒れリスク
  if (a.sensitive >= 8 && b.sensitive >= 8) {
    frictions.push('ふたりとも繊細なため、一方が沈むともう一方も引きずられやすい——「共倒れ」に注意');
  }

  return frictions.length > 0 ? frictions.slice(0, 3) : ['大きな摩擦ポイントは見当たりません。穏やかに関係を続けられるでしょう'];
}

function generateAdvice(a: CharacterTraits, b: CharacterTraits, nameA: string, nameB: string, score: number): string {
  if (score >= 85) {
    return `ふたりはとっても気が合う関係。いっしょにいて自然体でいられることを大切にしてね。「わかってくれてる」って感覚を信じて大丈夫。`;
  }
  if (score >= 70) {
    return `基本的にとても良い相性です。ちょっとしたすれ違いが起きたときは「タイプが違うだけで、どっちが悪いわけでもないんだ」と思い出してみて。`;
  }
  if (score >= 55) {
    const biggestGap = DIMS.reduce((max, d) => Math.abs(a[d] - b[d]) > Math.abs(a[max] - b[max]) ? d : max, DIMS[0]);
    return `「${DIM_LABELS[biggestGap]}」が一番ちがうところ。でもこの違いは「ダメなところ」じゃなく、「自分にはない力を持ってる証拠」。お互いの星守りを知ると、ぐっと仲良くなれるよ。`;
  }
  return `タイプの違いが大きいぶん、わかり合えたときの絆はだれよりも強くなります。「伝わらないのはタイプが違うだけ」——この一言を覚えておくだけで、びっくりするほどラクになるよ。`;
}

function generateSummary(a: CharacterTraits, b: CharacterTraits, nameA: string, nameB: string, score: number, resonance: number, complement: number): string {
  if (score >= 85) {
    return `${nameA}と${nameB}は、とっても気持ちが通じ合う組み合わせ。言葉にしなくてもわかり合えることが多く、いっしょにいて安心できる関係です。`;
  }
  if (score >= 70) {
    if (resonance > complement) {
      return `${nameA}と${nameB}は、似たもの同士の「なかよしタイプ」。好きなことやペースが近くて分かり合える反面、似すぎてマンネリになることもあるかも。`;
    }
    return `${nameA}と${nameB}は、お互いの苦手を助け合える「いいコンビ」。いっしょにいると、ひとりでは気づけなかった世界が広がります。`;
  }
  if (score >= 55) {
    return `${nameA}と${nameB}は、性格にちょっと違いがある組み合わせ。その違いは「ぶつかり」にも「成長のチャンス」にもなります——カギは、お互いのことを知ること。`;
  }
  return `${nameA}と${nameB}は、タイプがかなり違う「チャレンジな関係」。でもこれは「合わない」ということではありません。違いを知って受け入れれば、だれよりも深い絆を結べる可能性を秘めています。`;
}

// ---------- Main ----------

export function calculateCompatibility(idA: string, idB: string): CompatResult {
  const traitsA = TRAITS_TABLE[idA];
  const traitsB = TRAITS_TABLE[idB];
  const nameA = CHARACTER_MAP[idA]?.name || idA;
  const nameB = CHARACTER_MAP[idB]?.name || idB;

  if (!traitsA || !traitsB) {
    return {
      score: 50, level: 'neutral', idA, idB, nameA, nameB,
      resonance: 50, complement: 50,
      summary: '診断データが見つかりませんでした。',
      strengths: [], frictions: [], advice: '',
    };
  }

  // 同一キャラ
  if (idA === idB) {
    return {
      score: 75, level: 'good', idA, idB, nameA, nameB,
      resonance: 100, complement: 30,
      summary: `同じ${nameA}同士！気持ちがぴったり通じ合う反面、同じニガテを持っているから「鏡」みたいな関係になるよ。`,
      strengths: ['言わなくても気持ちが通じやすい', '好きなものや大切にしたいことが似ている', 'いっしょにいてラク'],
      frictions: ['同じニガテがあるから、ピンチのとき両方いっしょに沈んじゃうかも', 'お互いのニガテな部分が目につきやすい（鏡みたい）'],
      advice: 'ふたりとは違うタイプのお友だちを巻き込むと、関係に新しい風が入ってもっと楽しくなるよ。',
    };
  }

  const res = resonanceScore(traitsA, traitsB);
  const comp = complementScore(traitsA, traitsB);
  const life = lifestyleScore(traitsA, traitsB);

  // 総合スコア: 共鳴40% + 補完35% + 生活一致25%
  const raw = res * 0.40 + comp * 0.35 + life * 0.25;
  // 30-95 の範囲に正規化
  const score = Math.round(Math.max(30, Math.min(95, raw)));

  let level: CompatLevel;
  if (score >= 85) level = 'soulmate';
  else if (score >= 72) level = 'excellent';
  else if (score >= 58) level = 'good';
  else if (score >= 45) level = 'neutral';
  else level = 'growth';

  return {
    score, level, idA, idB, nameA, nameB,
    resonance: res, complement: comp,
    summary: generateSummary(traitsA, traitsB, nameA, nameB, score, res, comp),
    strengths: findTopStrengths(traitsA, traitsB, nameA, nameB),
    frictions: findFrictions(traitsA, traitsB, nameA, nameB),
    advice: generateAdvice(traitsA, traitsB, nameA, nameB, score),
  };
}

// 旧API互換: 星番号ベースは廃止（IDベースに移行）
export const STAR_NAMES: Record<number, string> = {
  1: '水の星', 2: '大地の星', 3: '雷の星', 4: '風の星', 5: '帝の星',
  6: '天の星', 7: '果実の星', 8: '山の星', 9: '火の星',
};
