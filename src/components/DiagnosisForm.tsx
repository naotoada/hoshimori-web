'use client';

import { useState } from 'react';
import { calculateHoshimori } from '@/lib/kssLogic';
import { getCharacterImageUrl, CHARACTER_MAP } from '@/lib/characterMap';
import styles from './DiagnosisForm.module.css';

export default function DiagnosisForm() {
  const [dateStr, setDateStr] = useState('');
  const [result, setResult] = useState<{hoshimoriId: string, honmeiName: string} | null>(null);

  const handleDiagnose = () => {
    if (!dateStr) return;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return;

    const res = calculateHoshimori(date.getFullYear(), date.getMonth() + 1, date.getDate());
    setResult(res);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>うちの子の星守りは？</h3>
      <div className={styles.inputGroup}>
        <input 
          type="date" 
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          className={styles.dateInput}
        />
        <button onClick={handleDiagnose} className={styles.button}>
          診断する
        </button>
      </div>

      {result && (() => {
        const charName = CHARACTER_MAP[result.hoshimoriId]?.name || result.hoshimoriId;
        const imageUrl = getCharacterImageUrl(result.hoshimoriId);
        return (
          <div className={styles.resultCard}>
            <p className={styles.resultIntro}>あなたのお子様の星守りは…</p>
            <div className={styles.resultImageWrapper}>
               <img src={imageUrl} alt={charName} className={styles.resultImage} />
            </div>
            <div className={styles.resultId}>{charName}</div>
            <p className={styles.resultHonmei}>({result.honmeiName})</p>
            <a href={`/hoshimori/${result.hoshimoriId}`} className={styles.detailButton}>
              詳細な「取扱説明書」を見る
            </a>
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
