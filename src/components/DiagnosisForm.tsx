'use client';

import { useState } from 'react';
import { calculateHoshimori } from '@/lib/kssLogic';
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

      {result && (
        <div className={styles.resultCard}>
          <p>あなたのお子様の星守りタイプは…</p>
          <div className={styles.resultId}>{result.hoshimoriId}</div>
          <p className={styles.resultHonmei}>({result.honmeiName})</p>
          <a href="#line" className={styles.lineButton}>
            続きを公式LINEで見る
          </a>
        </div>
      )}
    </div>
  );
}
