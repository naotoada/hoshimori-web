'use client';

import { useState } from 'react';
import { calculateHoshimori } from '@/lib/kssLogic';
import { getCharacterImageUrl, CHARACTER_MAP } from '@/lib/characterMap';
import { calculateCompatibility, STAR_NAMES, type CompatResult } from '@/lib/compatibility';
import Link from 'next/link';
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
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [result, setResult] = useState<PersonResult | null>(null);

  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDiagnose = () => {
    const res = calculateHoshimori(year, month, day);
    const charName = CHARACTER_MAP[res.hoshimoriId]?.name || res.hoshimoriId;
    const imageUrl = getCharacterImageUrl(res.hoshimoriId);
    const p: PersonResult = { ...res, charName, imageUrl };
    setResult(p);
    onResult(p);
  };

  return (
    <div className={styles.personCard}>
      <div className={styles.personLabel}>
        <span className={styles.personIcon}>{icon}</span>
        <span>{label}</span>
      </div>
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

  return (
    <div className={styles.resultSection}>
      <div className={styles.scoreCircle} style={{ borderColor: c.color }}>
        <span className={styles.scoreEmoji}>{c.emoji}</span>
        <span className={styles.scoreNumber}>{result.score}</span>
        <span className={styles.scoreLabel}>/ 100</span>
      </div>
      <div className={styles.resultLevel} style={{ color: c.color }}>{c.label}</div>

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
        <h1>ふたりのなかよし診断</h1>
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
