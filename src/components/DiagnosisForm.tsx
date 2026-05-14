'use client';

import { useState } from 'react';
import { calculateHoshimori } from '@/lib/kssLogic';
import { getCharacterImageUrl, CHARACTER_MAP } from '@/lib/characterMap';
import Link from 'next/link';
import styles from './DiagnosisForm.module.css';

type DiagnosisTarget = 'self' | 'child';

export default function DiagnosisForm() {
  const currentYear = new Date().getFullYear();
  const [target, setTarget] = useState<DiagnosisTarget>('self');
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [result, setResult] = useState<{hoshimoriId: string, honmeiName: string} | null>(null);

  const handleDiagnose = () => {
    // Basic validation
    if (!year || !month || !day) return;
    
    // JS Date handles overflow (e.g. Feb 30 -> Mar 2), but our logic expects raw numbers.
    // However, we should be aware that the user could select an invalid day.
    const res = calculateHoshimori(year, month, day);
    setResult(res);
  };

  // Generate options
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // 100 years back
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      <div className={styles.tabGroup}>
        <button
          className={`${styles.tab} ${target === 'self' ? styles.tabActive : ''}`}
          onClick={() => { setTarget('self'); setResult(null); }}
        >
          🌟 自分を調べる
        </button>
        <button
          className={`${styles.tab} ${target === 'child' ? styles.tabActive : ''}`}
          onClick={() => { setTarget('child'); setResult(null); }}
        >
          👶 お子様を調べる
        </button>
      </div>
      <h3 className={styles.title}>
        {target === 'self' ? 'あなたの星守りは？' : 'お子様の星守りは？'}
      </h3>
      <div className={styles.inputGroup}>
        <div className={styles.dateSelectors}>
          <div className={styles.selectWrapper}>
            <select value={year} onChange={(e) => setYear(Number(e.target.value))} className={styles.selectInput}>
              {years.map(y => <option key={y} value={y}>{y}年</option>)}
            </select>
          </div>
          <div className={styles.selectWrapper}>
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className={styles.selectInput}>
              {months.map(m => <option key={m} value={m}>{m}月</option>)}
            </select>
          </div>
          <div className={styles.selectWrapper}>
            <select value={day} onChange={(e) => setDay(Number(e.target.value))} className={styles.selectInput}>
              {days.map(d => <option key={d} value={d}>{d}日</option>)}
            </select>
          </div>
        </div>
        <button onClick={handleDiagnose} className={styles.button}>
          診断する
        </button>
      </div>

      {result && (() => {
        const charName = CHARACTER_MAP[result.hoshimoriId]?.name || result.hoshimoriId;
        const imageUrl = getCharacterImageUrl(result.hoshimoriId);
        
        const borderMap: Record<string, string> = {
          '水の星': styles.borderWater,
          '大地の星': styles.borderEarth,
          '雷の星': styles.borderThunder,
          '風の星': styles.borderWind,
          '帝の星': styles.borderEmperor,
          '天の星': styles.borderHeaven,
          '果実の星': styles.borderMarsh,
          '沢の星': styles.borderMarsh, // fallback
          '山の星': styles.borderMountain,
          '火の星': styles.borderFire,
        };
        const borderColorClass = borderMap[result.honmeiName] || '';

        return (
          <div className={styles.resultCard}>
            <p className={styles.resultIntro}>
              {target === 'self' ? 'あなたの星守りは…' : 'お子様の星守りは…'}
            </p>
            <div className={`${styles.resultImageWrapper} ${borderColorClass}`}>
               <img src={imageUrl} alt={charName} className={styles.resultImage} />
            </div>
            <div className={styles.resultId}>{charName}</div>
            <p className={styles.resultHonmei}>({result.honmeiName})</p>
            <Link href={`/hoshimori/${result.hoshimoriId}`} className={styles.detailButton}>
              詳細な「取扱説明書」を見る
            </Link>
            <br/>
            <a href="#line" className={styles.lineButton}>
              専門家に直接相談する
            </a>
          </div>
        );
      })()}
    </div>
  );
}
