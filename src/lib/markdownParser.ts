import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export interface HoshimoriData {
  id: string;          // e.g. "1_甲"
  name: string;        // e.g. "アイス"
  honmeiName: string;  // e.g. "一白水星"
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

const ZUKAN_DIR = '/Users/adachinaoto/Documents/2nd-Brain/03_知識ベース/九星構造学(KSS)/07_ビジネス関連/教育分野/星守り図鑑';

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
    const honmeiName = honmeiNameMatch ? honmeiNameMatch[1] : '';

    // Split by "## " (ignoring the first one if it's the title "# ")
    const sections = content.split(/^## /m).slice(1);

    for (const section of sections) {
      // First line contains name and ID
      const lines = section.split('\n');
      const headerLine = lines[0].trim();
      const nameMatch = headerLine.match(/^(.*?)\s*\((.*?)\)/);
      if (!nameMatch) continue;

      const name = nameMatch[1].trim();
      const id = nameMatch[2].trim();

      const typeName = extractLineProperty(section, 'タイプ名');
      const structure = extractLineProperty(section, '構造');
      const fiveElements = extractLineProperty(section, '五行関係');

      results.push({
        id,
        name,
        honmeiName,
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
  return all.find(h => h.id === id);
}
