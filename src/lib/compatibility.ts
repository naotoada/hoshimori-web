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
  social: '人との距離感',
  stability: 'マイペース度',
  sensitive: 'こころの繊細さ',
  action: 'やってみよう力',
  aesthetic: 'こだわりの強さ',
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
  return Math.min(100, Math.round((score / (count * 1.3)) * 100) + 8);
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
    strengths.push(`${nameA}がまわりとの関係を広げてくれて、${nameB}が自分の世界をじっくり深める——いいバランスです`);
  } else if (b.social >= 7 && a.social <= 4) {
    strengths.push(`${nameB}がまわりとの関係を広げてくれて、${nameA}が自分の世界をじっくり深める——いいバランスです`);
  }

  return strengths.length > 0 ? strengths.slice(0, 4) : ['お互いに干渉しすぎない、自然な距離感を保てる関係'];
}

function findFrictions(a: CharacterTraits, b: CharacterTraits, nameA: string, nameB: string): string[] {
  const frictions: string[] = [];

  if (Math.abs(a.stability - b.stability) >= 5) {
    const steady = a.stability > b.stability ? nameA : nameB;
    const explorer = a.stability > b.stability ? nameB : nameA;
    frictions.push(`${steady}は「いつも通り」が安心するタイプ、${explorer}は「新しいことをやってみたい」タイプ。ペースが合わないと感じやすいかも`);
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
    const outgoing = a.social > b.social ? nameA : nameB;
    const homebody = a.social > b.social ? nameB : nameA;
    frictions.push(`${outgoing}は「みんなとワイワイ」が好きだけど、${homebody}は「ひとりの時間」が大切。休日の過ごし方などで「もっと一緒にいたい」「一人の時間がほしい」とギャップが生まれやすいです`);
  }
  if (Math.abs(a.independent - b.independent) >= 5) {
    const solo = a.independent > b.independent ? nameA : nameB;
    const together = a.independent > b.independent ? nameB : nameA;
    frictions.push(`${solo}は「自分で決めたい」タイプ、${together}は「一緒に決めたい」タイプ。何でも相談してほしい${together}が寂しく感じることも`);
  }
  if (a.aesthetic >= 8 && b.aesthetic <= 3) {
    frictions.push(`${nameA}の「こういうのが好き！」というこだわりが、${nameB}には「なんでそんなに気にするの？」と不思議に思えるかも`);
  } else if (b.aesthetic >= 8 && a.aesthetic <= 3) {
    frictions.push(`${nameB}の「こういうのが好き！」というこだわりが、${nameA}には「なんでそんなに気にするの？」と不思議に思えるかも`);
  }

  // 両方が高い独立性 → ぶつかりやすい
  if (a.independent >= 8 && b.independent >= 8) {
    frictions.push('ふたりとも「自分のやり方」に自信があるため、「私がやる！」「いや僕が！」と主導権争いが起きやすいかも');
  }
  // 両方が高い感受性 → 共倒れリスク
  if (a.sensitive >= 8 && b.sensitive >= 8) {
    frictions.push('ふたりとも心が繊細。一方が落ち込むともう一方も「自分のせいかも」と引きずられやすい——「共倒れ」に注意してね');
  }

  return frictions.length > 0 ? frictions.slice(0, 3) : ['大きな摩擦ポイントは見当たりません。穏やかに関係を続けられるでしょう'];
}

// ---------- Trait descriptor helpers ----------

/** キャラの最も際立つ特性を日本語で返す */
function describeTopTrait(t: CharacterTraits, name: string): string {
  const ranked = DIMS.map(d => ({ dim: d, val: t[d] })).sort((x, y) => y.val - x.val);
  const top = ranked[0];
  const MAP: Record<keyof CharacterTraits, { high: string; low: string }> = {
    social: { high: 'みんなと一緒が大好き', low: 'ひとりの時間が大切' },
    stability: { high: 'いつものペースが安心', low: '新しいことにワクワクする' },
    sensitive: { high: 'こころがとっても繊細', low: 'たいていのことは気にしない' },
    action: { high: '思い立ったらすぐ動く', low: 'じっくり考えてから動く' },
    aesthetic: { high: 'こだわりが強い', low: 'なんでもOKの柔軟派' },
    independent: { high: '自分の道を信じるタイプ', low: 'まわりと合わせるのが上手' },
  };
  return `${name}は「${MAP[top.dim].high}」タイプ`;
}

/** ふたりの間で最も近い次元 */
function closestDim(a: CharacterTraits, b: CharacterTraits): keyof CharacterTraits {
  return DIMS.reduce((min, d) => Math.abs(a[d] - b[d]) < Math.abs(a[min] - b[min]) ? d : min, DIMS[0]);
}

/** ふたりの間で最も遠い次元 */
function farthestDim(a: CharacterTraits, b: CharacterTraits): keyof CharacterTraits {
  return DIMS.reduce((max, d) => Math.abs(a[d] - b[d]) > Math.abs(a[max] - b[max]) ? d : max, DIMS[0]);
}

// ---------- Dynamic summary & advice ----------

/** 各次元の「違うと具体的にどうなるか＋どうすればいいか」 */
const GAP_ADVICE: Record<keyof CharacterTraits, string> = {
  social: '片方が「もっと一緒にいたい」、もう片方が「ひとりの時間がほしい」と感じやすいよ。「今日はひとりの日」「今日はいっしょの日」とルールを決めると楽になるよ。',
  stability: '片方は「いつも通り」がいいのに、もう片方は「たまには違うことしたい」と感じがち。お互いの"安心ゾーン"を知っておくと、ケンカが減るよ。',
  sensitive: '片方が傷ついてるのに、もう片方は気づかないことがあるかも。「今ちょっとつらい」と言葉にする練習をすると、ぐっと楽になるよ。',
  action: 'テンポがちがうから「早くして！」「ちょっと待って！」とイライラしやすいかも。急がないときは相手のペースに合わせてみてね。',
  aesthetic: '「こだわりたいこと」の量が違うから、片方が「なんでそこまで気にするの？」と感じるかも。お互いの"ゆずれないポイント"を1つだけ共有してみて。',
  independent: '「自分でやりたい」と「一緒にやりたい」がぶつかりやすいよ。大事なことだけ一緒に決めて、あとはお互いの自由にするとうまくいくよ。',
};

function generateAdvice(a: CharacterTraits, b: CharacterTraits, nameA: string, nameB: string, score: number): string {
  const gap = farthestDim(a, b);
  const gapLabel = DIM_LABELS[gap];
  const close = closestDim(a, b);
  const closeLabel = DIM_LABELS[close];

  if (score >= 78) {
    return `ふたりは「${closeLabel}」がとっても似ていて、自然体でいっしょにいられる関係。お互いのペースを大切にしてね。`;
  }
  if (score >= 70) {
    return `「${closeLabel}」が近いから分かり合える、すてきなバランスのふたり。「${gapLabel}」はちょっと違うけど、${GAP_ADVICE[gap]}`;
  }
  if (score >= 62) {
    return `「${gapLabel}」が一番ちがうところ。${GAP_ADVICE[gap]}`;
  }
  return `ちがいが大きいぶん、わかり合えたときの絆はだれよりも強くなるよ。まずは「${closeLabel}」が似てるところから話してみて。「${gapLabel}」については——${GAP_ADVICE[gap]}`;
}

function generateSummary(a: CharacterTraits, b: CharacterTraits, nameA: string, nameB: string, score: number, resonance: number, complement: number): string {
  const descA = describeTopTrait(a, nameA);
  const descB = describeTopTrait(b, nameB);
  const close = closestDim(a, b);
  const closeLabel = DIM_LABELS[close];
  const far = farthestDim(a, b);
  const farLabel = DIM_LABELS[far];

  if (score >= 78) {
    return `${descA}、${descB}。「${closeLabel}」がとっても近いから、いっしょにいるだけで安心できる関係です。`;
  }
  if (score >= 70) {
    if (resonance > complement) {
      return `${descA}、${descB}。「${closeLabel}」が似ているなかよしタイプ。好きなことやペースが近いぶん、分かり合えるよろこびがあります。`;
    }
    return `${descA}、${descB}。「${farLabel}」はちがうけど、そのぶんお互いの苦手をカバーし合えるいいコンビです。`;
  }
  if (score >= 62) {
    return `${descA}、${descB}。「${closeLabel}」は近いけど「${farLabel}」にはちょっと差がある組み合わせ。その違いが「ぶつかり」にも「成長のチャンス」にもなります。`;
  }
  return `${descA}、${descB}。タイプはかなり違うけど、「${closeLabel}」には共通点あり。ちがいを知って受け入れると、だれよりも深い絆になれる可能性を秘めています。`;
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
  if (score >= 78) level = 'soulmate';
  else if (score >= 70) level = 'excellent';
  else if (score >= 62) level = 'good';
  else if (score >= 54) level = 'neutral';
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
