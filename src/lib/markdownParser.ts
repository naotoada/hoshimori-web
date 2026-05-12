import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export interface HoshimoriData {
  id: string;          // e.g. "1_甲"
  name: string;        // e.g. "アイス"
  honmeiName: string;  // e.g. "水の星"
  vesselName: string;  // e.g. "🌳 大樹の器"
  typeName: string;    // e.g. "🌳清流を育む大樹タイプ"
  structure: string;
  fiveElements: string;
  strengths: string;
  weaknesses: string;
  goodEnvs: string;
  badEnvs: string;
  howToInteract: string;
  growthPace: string;
}

const ZUKAN_DIR = path.join(process.cwd(), 'src/data/zukan');

function extractSection(content: string, sectionName: string): string {
  const regex = new RegExp(`###\\s*${sectionName}[^\\n]*\\n([\\s\\S]*?)(?=###|$)`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function extractLineProperty(content: string, prefix: string): string {
  const regex = new RegExp(`-\\s*\\*\\*${prefix}\\*\\*:\\s*(.*)`);
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

export function getAllHoshimori(): HoshimoriData[] {
  const files = fs.readdirSync(ZUKAN_DIR).filter(f => f.match(/^\d{2}_.*\.md$/));
  const results: HoshimoriData[] = [];

  for (const file of files) {
    const filePath = path.join(ZUKAN_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract Honmei Name from the file name or title
    const honmeiNameMatch = file.match(/^\d{2}_(.*)\.md$/);
    let honmeiName = honmeiNameMatch ? honmeiNameMatch[1] : '';
    
    // Map traditional Kyusei terms to Hoshimori terms
    const termMap: Record<string, string> = {
      '一白水星': '水の星',
      '二黒土星': '大地の星',
      '三碧木星': '雷の星',
      '四緑木星': '風の星',
      '五黄土星': '帝の星',
      '六白金星': '天の星',
      '七赤金星': '果実の星',
      '八白土星': '山の星',
      '九紫火星': '火の星'
    };
    honmeiName = termMap[honmeiName] || honmeiName;

    // Split by "## " (ignoring the first one if it's the title "# ")
    const sections = content.split(/^## /m).slice(1);

    for (const section of sections) {
      // First line contains name and ID
      const lines = section.split('\n');
      const headerLine = lines[0].trim();
      const nameMatch = headerLine.match(/^(.*?)\s*[（(](.*?)[）)]/);
      if (!nameMatch) continue;

      const name = nameMatch[1].trim();
      const id = nameMatch[2].trim();

      const typeName = extractLineProperty(section, 'タイプ名');
      const structure = extractLineProperty(section, '構造');
      const fiveElements = extractLineProperty(section, '五行関係');

      const vesselMap: Record<string, string> = {
        '甲': '🌳 大樹の器',
        '乙': '🌸 草花の器',
        '丙': '☀️ 太陽の器',
        '丁': '🕯️ 灯火の器',
        '戊': '🏔️ 大山の器',
        '己': '🌾 花畑の器',
        '庚': '⚔️ 鉄剣の器',
        '辛': '💎 宝石の器',
        '壬': '🌊 大海の器',
        '癸': '🌧️ 雨露の器'
      };
      const stem = id.split('_')[1];
      const vesselName = vesselMap[stem] || stem;

      results.push({
        id,
        name,
        honmeiName,
        vesselName,
        typeName,
        structure,
        fiveElements,
        strengths: extractSection(section, '強み'),
        weaknesses: extractSection(section, '弱み'),
        goodEnvs: extractSection(section, '得意な環境'),
        badEnvs: extractSection(section, '苦手な環境'),
        howToInteract: extractSection(section, '関わり方'),
        growthPace: extractSection(section, '成長ペース'),
      });
    }
  }

  return results;
}

export function getHoshimoriById(id: string): HoshimoriData | undefined {
  const all = getAllHoshimori();
  const decodedId = decodeURIComponent(id);
  return all.find(h => h.id === id || h.id === decodedId || encodeURIComponent(h.id) === id);
}
