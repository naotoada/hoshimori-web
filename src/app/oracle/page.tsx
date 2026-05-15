'use client';

import { useState } from 'react';
import Head from 'next/head';
import { ORACLE_MESSAGES, ORACLE_STAGES, THEMES, ThemeType } from './oracleData';
import styles from './page.module.css';

const ORACLE_PASSWORD = 'hoshimori-secret';

export default function OraclePage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<ThemeType>('今日の運勢');
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState<typeof ORACLE_MESSAGES[0] | null>(null);
  const [lineResult, setLineResult] = useState<typeof ORACLE_STAGES[0] | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ORACLE_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('パスワードが違います。レポートに記載された合言葉を入力してください。');
    }
  };

  const handleDraw = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    setResult(null);
    setLineResult(null);

    setTimeout(() => {
      const randomHexIndex = Math.floor(Math.random() * ORACLE_MESSAGES.length);
      const randomStageIndex = Math.floor(Math.random() * ORACLE_STAGES.length);
      
      setResult(ORACLE_MESSAGES[randomHexIndex]);
      setLineResult(ORACLE_STAGES[randomStageIndex]);
      setIsDrawing(false);
    }, 2500);
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <span style={{ fontSize: '2rem', display: 'inline-block', marginBottom: '1rem', animation: 'pulse 2s infinite' }}>✨</span>
            <h1 className={styles.title}>星守り神託所</h1>
          </div>
          <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>
            ここは星の声を聴く者だけが訪れる秘密の場所。<br/>
            あなたに託された合言葉を入力してください。
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              className={styles.loginInput}
            />
            <button
              type="submit"
              className={`${styles.button} ${styles.buttonActive}`}
            >
              扉を開く
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>星守り神託所</title>
      </Head>

      <div className={styles.bgEffects}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>星守り神託所</h1>
          <p className={styles.subtitle}>
            星たちは、今のあなたに必要なメッセージを知っています。<br/>
            心の中にある迷いを一つ選び、星に尋ねてください。
          </p>
        </div>

        <form onSubmit={handleDraw} className={styles.glassCard}>
          <label className={styles.label}>
            今、星に尋ねたいテーマ
          </label>
          <div className={styles.selectWrapper}>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemeType)}
              disabled={isDrawing}
              className={styles.select}
            >
              {THEMES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <div className={styles.selectArrow}>▼</div>
          </div>

          <button
            type="submit"
            disabled={isDrawing}
            className={`${styles.button} ${isDrawing ? styles.buttonDisabled : styles.buttonActive}`}
          >
            <span className={styles.btnText}>
              {isDrawing ? (
                <>
                  <span className={styles.star}>✨</span> 星の声を聴いています...
                </>
              ) : (
                '星に尋ねる'
              )}
            </span>
          </button>
        </form>

        {result && lineResult && (
          <div className={styles.resultCard}>
            
            <div className={styles.mainResult}>
              <h2 className={styles.mainTitle}>
                『 {result.title} 』
              </h2>
              <p className={styles.mainMessage}>
                {result.message}
              </p>
            </div>
            
            <div className={styles.divider}></div>
            
            <div className={styles.stageCard}>
              <div className={styles.stageHeader}>
                <span className={styles.stageName}>
                  {lineResult.stageName}
                </span>
                <p className={styles.stageDesc}>
                  {lineResult.description}
                </p>
              </div>

              <div className={styles.themeBox}>
                <div className={styles.themeIndicator}></div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className={styles.themeLabel}>
                    【 {theme} 】への導き
                  </span>
                </div>
                <p className={styles.themeMessage}>
                  {lineResult.themes[theme]}
                </p>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
