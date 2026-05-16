'use client';

import { useState } from 'react';
import { calculateHoshimori } from '@/lib/kssLogic';
import { getCharacterImageUrl, CHARACTER_MAP } from '@/lib/characterMap';
import { calculateCompatibility, STAR_NAMES, type CompatResult, DIM_LABELS, farthestDim } from '@/lib/compatibility';
import { TRAITS_TABLE } from '@/lib/traits';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import styles from './page.module.css';

interface PersonResult {
  hoshimoriId: string;
  honmei: number;
  honmeiName: string;
  nikkan: string;
  charName: string;
  imageUrl: string;
}

function PersonForm({
  label, icon, onResult,
}: {
  label: string; icon: string;
  onResult: (result: PersonResult) => void;
}) {
  const currentYear = new Date().getFullYear();
  const [mode, setMode] = useState<'birthday' | 'select'>('birthday');
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string>('');
  const [result, setResult] = useState<PersonResult | null>(null);

  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Emoji map for star groups
  const starEmoji: Record<string, string> = {
    '水の星': '💧', '大地の星': '🌏', '雷の星': '⚡️', '風の星': '🍃',
    '帝の星': '👑', '天の星': '🌌', '果実の星': '🍎', '山の星': '⛰️', '火の星': '🔥',
  };

  // Build sorted character list for dropdown
  const charList = Object.entries(CHARACTER_MAP)
    .filter(([, v]) => v.name)
    .sort((a, b) => {
      const starOrder = ['水の星', '大地の星', '雷の星', '風の星', '帝の星', '天の星', '果実の星', '山の星', '火の星'];
      const aGroup = STAR_NAMES[parseInt(a[0].split('_')[0])] || '';
      const bGroup = STAR_NAMES[parseInt(b[0].split('_')[0])] || '';
      const aIdx = starOrder.indexOf(aGroup);
      const bIdx = starOrder.indexOf(bGroup);
      if (aIdx !== bIdx) return aIdx - bIdx;
      return a[1].name.localeCompare(b[1].name, 'ja');
    });

  const handleDiagnose = () => {
    const res = calculateHoshimori(year, month, day);
    const charName = CHARACTER_MAP[res.hoshimoriId]?.name || res.hoshimoriId;
    const imageUrl = getCharacterImageUrl(res.hoshimoriId);
    const p: PersonResult = { ...res, charName, imageUrl };
    setResult(p);
    onResult(p);
  };

  const handleSelect = () => {
    if (!selectedId) return;
    const char = CHARACTER_MAP[selectedId];
    if (!char) return;
    const honmei = parseInt(selectedId.split('_')[0]);
    const honmeiName = STAR_NAMES[honmei] || '';
    const p: PersonResult = {
      hoshimoriId: selectedId,
      honmei,
      honmeiName,
      nikkan: '',
      charName: char.name,
      imageUrl: getCharacterImageUrl(selectedId),
    };
    setResult(p);
    onResult(p);
  };

  return (
    <div className={styles.personCard}>
      <div className={styles.personLabel}>
        <span className={styles.personIcon}>{icon}</span>
        <span>{label}</span>
      </div>
      <div className={styles.modeToggle}>
        <button
          className={`${styles.modeBtn} ${mode === 'birthday' ? styles.modeBtnActive : ''}`}
          onClick={() => setMode('birthday')}
        >
          📅 生年月日
        </button>
        <button
          className={`${styles.modeBtn} ${mode === 'select' ? styles.modeBtnActive : ''}`}
          onClick={() => setMode('select')}
        >
          ⭐ 星守りから選ぶ
        </button>
      </div>
      {mode === 'birthday' ? (
        <div className={styles.dateRow}>
          <div className={styles.selectWrap}>
            <select value={year} onChange={e => setYear(Number(e.target.value))} className={styles.sel}>
              {years.map(y => <option key={y} value={y}>{y}年</option>)}
            </select>
          </div>
          <div className={styles.selectWrap}>
            <select value={month} onChange={e => setMonth(Number(e.target.value))} className={styles.sel}>
              {months.map(m => <option key={m} value={m}>{m}月</option>)}
            </select>
          </div>
          <div className={styles.selectWrap}>
            <select value={day} onChange={e => setDay(Number(e.target.value))} className={styles.sel}>
              {days.map(d => <option key={d} value={d}>{d}日</option>)}
            </select>
          </div>
          <button onClick={handleDiagnose} className={styles.checkBtn}>決定</button>
        </div>
      ) : (
        <div className={styles.selectRow}>
          <div className={styles.selectWrap} style={{ flex: 1 }}>
            <select value={selectedId} onChange={e => setSelectedId(e.target.value)} className={styles.sel}>
              <option value="">星守りを選んでね</option>
              {charList.map(([id, char]) => (
                <option key={id} value={id}>
                  {starEmoji[STAR_NAMES[parseInt(id.split('_')[0])]] || ''}{STAR_NAMES[parseInt(id.split('_')[0])]}「{char.name}」
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSelect} className={styles.checkBtn} disabled={!selectedId}>決定</button>
        </div>
      )}
      {result && (
        <div className={styles.personResult}>
          <img src={result.imageUrl} alt={result.charName} className={styles.personImg} />
          <div>
            <div className={styles.personName}>{result.charName}</div>
            <div className={styles.personStar}>{STAR_NAMES[result.honmei]}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultView({ result }: { result: CompatResult }) {
  const cfg: Record<string, { color: string; label: string; emoji: string }> = {
    soulmate:  { color: '#a855f7', label: 'うんめいのなかよし度', emoji: '💜' },
    excellent: { color: '#10b981', label: 'なかよし度バツグン！', emoji: '💫' },
    good:      { color: '#3b82f6', label: 'なかよし度たかめ！', emoji: '✨' },
    neutral:   { color: '#f59e0b', label: 'なかよし度ふつう', emoji: '🌙' },
    growth:    { color: '#ef4444', label: 'なかよし度のびしろ◎', emoji: '🔥' },
  };
  const c = cfg[result.level];

  const traitsA = TRAITS_TABLE[result.idA];
  const traitsB = TRAITS_TABLE[result.idB];
  
  let shareText = `【なかよし度：${result.score}点】\n${result.nameA}と${result.nameB}の相性を診断したよ！\n\nあなたとの相性も診断してみてね！`;
  if (traitsA && traitsB) {
    const gap = farthestDim(traitsA, traitsB);
    shareText = `【なかよし度：${result.score}点】\n${result.nameA}と${result.nameB}の相性を診断したよ！\n\nふたりの一番のちがいは「${DIM_LABELS[gap]}」みたい。\n\nあなたとの相性も診断してみてね！`;
  }
  const shareUrl = 'https://hoshimori-web.vercel.app/compatibility';

  return (
    <div className={styles.resultSection}>
      <div className={styles.scoreHeader}>
        <div className={styles.scoreCircle}>
          <span className={styles.scoreEmoji}>{c.emoji}</span>
          <span className={styles.scoreNumber}>{result.score}</span>
          <span className={styles.scoreLabel}>/ 100</span>
        </div>
        <div className={styles.resultLevel}>{c.label}</div>
      </div>

      <div className={styles.subScores}>
        <div className={styles.subScore}>
          <span className={styles.subIcon}>🤝</span>
          <span className={styles.subLabel}>にてる度</span>
          <span className={styles.subValue}>{result.resonance}</span>
        </div>
        <div className={styles.subScore}>
          <span className={styles.subIcon}>🧩</span>
          <span className={styles.subLabel}>たすけあい度</span>
          <span className={styles.subValue}>{result.complement}</span>
        </div>
      </div>

      <p className={styles.resultSummary}>{result.summary}</p>

      <div className={styles.resultGrid}>
        <div className={styles.resultBox}>
          <h3>✨ ふたりのいいところ</h3>
          <ul>{result.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
        <div className={`${styles.resultBox} ${styles.frictionBox}`}>
          <h3>⚡ すれちがいポイント</h3>
          <ul>{result.frictions.map((f, i) => <li key={i}>{f}</li>)}</ul>
        </div>
      </div>

      <div className={styles.adviceBox}>
        <h3>💡 アドバイス</h3>
        <p>{result.advice}</p>
      </div>

      <div className={styles.charCards}>
        <Link href={`/hoshimori/${result.idA}`} className={styles.charCard}>
          <img src={getCharacterImageUrl(result.idA)} alt={result.nameA} className={styles.charCardImg} />
          <span className={styles.charCardName}>{result.nameA}</span>
          <span className={styles.charCardLink}>くわしく見る →</span>
        </Link>
        <Link href={`/hoshimori/${result.idB}`} className={styles.charCard}>
          <img src={getCharacterImageUrl(result.idB)} alt={result.nameB} className={styles.charCardImg} />
          <span className={styles.charCardName}>{result.nameB}</span>
          <span className={styles.charCardLink}>くわしく見る →</span>
        </Link>
      </div>

      <ShareButtons text={shareText} url={shareUrl} hashtags={['星守り', '星守りなかよし診断']} />

      <div className={styles.ctaSection}>
        <p className={styles.ctaText}>
          もっとくわしく知りたい方へ——<br/>
          すれ違いの乗りこえ方や、毎日の声かけのコツをまとめたレポートもあります。
        </p>
        <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
          公式LINEで詳細レポートを依頼
        </a>
      </div>
    </div>
  );
}

export default function CompatibilityPage() {
  const [personA, setPersonA] = useState<PersonResult | null>(null);
  const [personB, setPersonB] = useState<PersonResult | null>(null);
  const [compatResult, setCompatResult] = useState<CompatResult | null>(null);

  const handleCompare = () => {
    if (personA && personB) {
      const result = calculateCompatibility(personA.hoshimoriId, personB.hoshimoriId);
      setCompatResult(result);
    }
  };

  const bothReady = personA && personB;

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>⭐ 星守り <span>- HOSHIMORI -</span></Link>
      </header>

      <section className={styles.hero}>
        <h1>星守りなかよし診断</h1>
        <p>
          90体すべての星守りの性格・強み・弱みをもとに<br/>
          ふたりの「なかよし度」をその場で診断するよ！
        </p>
      </section>

      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <PersonForm label="ひとりめ" icon="🌟" onResult={setPersonA} />
            <PersonForm label="ふたりめ" icon="💫" onResult={setPersonB} />
          </div>

          {bothReady && (
            <div className={styles.compareRow}>
              <div className={styles.vsCard}>
                <img src={personA.imageUrl} alt={personA.charName} className={styles.vsImg} />
                <span className={styles.vsName}>{personA.charName}</span>
              </div>
              <button onClick={handleCompare} className={styles.compareBtn}>
                なかよし度を診断する ⭐
              </button>
              <div className={styles.vsCard}>
                <img src={personB.imageUrl} alt={personB.charName} className={styles.vsImg} />
                <span className={styles.vsName}>{personB.charName}</span>
              </div>
            </div>
          )}

          {compatResult && <ResultView result={compatResult} />}
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.backLink}>← トップページに戻る</Link>
        <p className={styles.copy}>© 2026 あだちなおと. All rights reserved.</p>
      </footer>
    </main>
  );
}
