export const JIKKAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

export const HONMEI_NAMES = [
  '', '水の星', '大地の星', '雷の星', '風の星', '帝の星', '天の星', '沢の星', '山の星', '火の星'
];

function getSekki(y: number, m: number): number {
  const c: [number, number, boolean][] = [
    [6.3811, 0.242778, true], [4.8693, 0.242713, true],
    [6.3968, 0.242512, false], [5.6280, 0.242231, false],
    [6.3771, 0.241945, false], [6.5733, 0.241731, false],
    [8.0091, 0.241642, false], [8.4102, 0.241703, false],
    [8.5186, 0.241898, false], [9.1414, 0.242179, false],
    [8.2396, 0.242469, false], [7.9152, 0.242689, false],
  ];
  const d = c[m - 1];
  const baseY = d[2] ? (y - 1) : y;
  return Math.floor(d[0] + (d[1] * (baseY - 1900)) - Math.floor((baseY - 1900) / 4));
}

function getNenban(y: number, m: number, d: number): number {
  const ky = (m === 1 || (m === 2 && d < getSekki(y, 2))) ? y - 1 : y;
  return [2, 1, 9, 8, 7, 6, 5, 4, 3][ky % 9];
}

function getMJD(year: number, month: number, day: number): number {
  let y = year, m = month;
  if (m === 1) { m = 13; y--; }
  else if (m === 2) { m = 14; y--; }
  return Math.floor(365.25 * y) + Math.floor(y / 400)
    - Math.floor(y / 100) + Math.floor(30.59 * (m - 2)) + day - 678912;
}

function getNichiEto(year: number, month: number, day: number): number {
  let eto = (getMJD(year, month, day) + 50) % 60;
  if (eto < 0) eto += 60;
  return eto;
}

function getNikkan(etoNumber: number): string {
  return JIKKAN[etoNumber % 10];
}

export function calculateHoshimori(year: number, month: number, day: number) {
  const honmei = getNenban(year, month, day);
  const etoNumber = getNichiEto(year, month, day);
  const nikkan = getNikkan(etoNumber);
  
  const hoshimoriId = `${honmei}_${nikkan}`;
  const honmeiName = HONMEI_NAMES[honmei];
  
  return {
    honmei,
    honmeiName,
    nikkan,
    hoshimoriId // 例: '1_甲', '9_癸'
  };
}
