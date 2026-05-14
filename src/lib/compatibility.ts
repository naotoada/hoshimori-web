/**
 * 星守り精密相性診断ロジック
 * 90体すべての構造属性（6次元ベクトル）を基に、
 * 補完・共鳴・環境一致の3軸で相性を算出する。
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

// ---------- Dimension labels ----------
const DIM_LABELS: Record<keyof CharacterTraits, string> = {
  social: '社交性',
  stability: '安定性',
  sensitive: '感受性',
  action: '行動力',
  aesthetic: '美意識',
  independent: '独立性',
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

  // 共鳴ポイント（近い次元）
  const similar: { dim: keyof CharacterTraits; val: number }[] = [];
  for (const d of DIMS) {
    if (Math.abs(a[d] - b[d]) <= 2) {
      similar.push({ dim: d, val: (a[d] + b[d]) / 2 });
    }
  }
  if (similar.length >= 3) {
    strengths.push('多くの次元で似ているため、言葉にしなくても分かり合える感覚がある');
  }

  // 具体的な共鳴
  if (Math.abs(a.sensitive - b.sensitive) <= 2 && a.sensitive >= 7) {
    strengths.push('ふたりとも感受性が豊か。お互いの「言葉にならない気持ち」を自然に汲み取れる');
  }
  if (Math.abs(a.aesthetic - b.aesthetic) <= 2 && a.aesthetic >= 7) {
    strengths.push('美意識の方向が近い。「いい」と思うもの、「美しい」と感じるものが重なりやすい');
  }
  if (Math.abs(a.stability - b.stability) <= 2) {
    strengths.push('生活リズムや変化への向き合い方が似ているため、日常が自然と噛み合う');
  }
  if (Math.abs(a.social - b.social) <= 2) {
    strengths.push('人付き合いのペースが近いため、一緒にいて疲れにくい');
  }

  // 補完ポイント（離れている次元）
  if (a.action >= 7 && b.action <= 4) {
    strengths.push(`${nameA}の行動力が${nameB}の熟考を実行に移す推進力になる`);
  } else if (b.action >= 7 && a.action <= 4) {
    strengths.push(`${nameB}の行動力が${nameA}の熟考を実行に移す推進力になる`);
  }
  if (a.independent >= 7 && b.independent <= 4) {
    strengths.push(`${nameA}の自立心と${nameB}の協調性が、チームとしてバランスの良い関係を作る`);
  } else if (b.independent >= 7 && a.independent <= 4) {
    strengths.push(`${nameB}の自立心と${nameA}の協調性が、チームとしてバランスの良い関係を作る`);
  }
  if (a.social >= 7 && b.social <= 4) {
    strengths.push(`${nameA}が外の世界との橋渡し役になり、${nameB}が内側の世界を守る——理想的な役割分担`);
  } else if (b.social >= 7 && a.social <= 4) {
    strengths.push(`${nameB}が外の世界との橋渡し役になり、${nameA}が内側の世界を守る——理想的な役割分担`);
  }

  return strengths.length > 0 ? strengths.slice(0, 4) : ['お互いに干渉しすぎない、自然な距離感を保てる関係'];
}

function findFrictions(a: CharacterTraits, b: CharacterTraits, nameA: string, nameB: string): string[] {
  const frictions: string[] = [];

  if (Math.abs(a.stability - b.stability) >= 5) {
    frictions.push('変化への向き合い方が大きく異なるため、「もっと動いて」「もっと落ち着いて」とすれ違いやすい');
  }
  if (Math.abs(a.action - b.action) >= 5) {
    frictions.push('行動のスピードに差があり、一方が「遅い」一方が「早すぎる」と感じがち');
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
    return `ふたりは構造的に非常に高い相性を持っています。自然体で一緒にいることを大切に。「分かり合えている」という感覚を信じてください。`;
  }
  if (score >= 70) {
    return `基本的に良い相性です。小さなすれ違いが起きた時は「構造が違うだけで、どちらが悪いわけでもない」と思い出してみてください。`;
  }
  if (score >= 55) {
    const biggestGap = DIMS.reduce((max, d) => Math.abs(a[d] - b[d]) > Math.abs(a[max] - b[max]) ? d : max, DIMS[0]);
    return `「${DIM_LABELS[biggestGap]}」の違いが最も大きいポイントです。この差は「弱点」ではなく「お互いにない視点を持っている証拠」。違いを武器に変えるには、相手の構造を知ることが第一歩です。`;
  }
  return `構造の差が大きい分、理解し合えた時の絆は何よりも強くなります。「伝わらないのは構造が違うから」——この一言を心に置くだけで、驚くほど楽になります。`;
}

function generateSummary(a: CharacterTraits, b: CharacterTraits, nameA: string, nameB: string, score: number, resonance: number, complement: number): string {
  if (score >= 85) {
    return `${nameA}と${nameB}は、構造的に非常に深い共鳴を持つ組み合わせです。言葉にしなくても通じ合える部分が多く、一緒にいて自然体でいられる関係。`;
  }
  if (score >= 70) {
    if (resonance > complement) {
      return `${nameA}と${nameB}は、似た構造を持つ「共鳴型」の関係です。価値観やペースが近く、分かり合える喜びがある一方、似すぎて新しい視点が生まれにくいことも。`;
    }
    return `${nameA}と${nameB}は、お互いの弱みを補い合う「補完型」の良い関係です。一緒にいると、一人では見えなかった世界が広がります。`;
  }
  if (score >= 55) {
    return `${nameA}と${nameB}は、構造に一定の違いがある組み合わせです。その違いは「摩擦」にも「成長のエンジン」にもなりえます——鍵は、お互いの構造を知ること。`;
  }
  return `${nameA}と${nameB}は、構造的な差が大きい「挑戦的な関係」です。ただし、これは「悪い関係」ではありません。構造の違いを理解すれば、最も深い絆を結べるポテンシャルを持っています。`;
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
      summary: `同じ${nameA}同士。完全に分かり合える反面、同じ弱点を共有するため「鏡」のような関係になります。`,
      strengths: ['言わなくても通じる感覚がある', '価値観の根っこが同じ', '一緒にいて疲れにくい'],
      frictions: ['同じ弱点を持つため、ピンチ時に両方が沈む可能性', 'お互いの短所が目につきやすい（鏡効果）'],
      advice: '第三の視点を持つ人を意識的に巻き込むと、ふたりの関係に新しい風が入ります。',
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
