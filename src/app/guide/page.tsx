'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './page.module.css';

const GUIDE_PASSWORD = 'hoshinohimitsu';

export default function GuidePortal() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === GUIDE_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('パスワードが違います。レポートに記載された合言葉を入力してください。');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <Head>
          <title>星守りの導き | ログイン</title>
        </Head>
        
        <div className={styles.loginCard}>
          <h1 className={styles.title}>星守りの導き</h1>
          <p className={styles.subtitle}>
            お子さまの成長を導く星のマップへようこそ。<br />
            合言葉を入力して、扉を開いてください。
          </p>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="合言葉を入力"
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
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
        <title>星守りの導き | ポータル</title>
      </Head>
      
      <div className={styles.portalCard}>
        <h1 className={styles.title}>星守りの導き</h1>
        <p className={styles.subtitle}>
          お子さまの現在の成長段階をチェックし、<br />
          次のステップへ導くための星のマップです。
        </p>

        <div className={styles.menuGrid}>
          <Link href="/guide/map" className={styles.menuItem}>
            <span className={styles.menuIcon}>🗺️</span>
            <h2 className={styles.menuTitle}>星を繋ぐ星座マップ</h2>
            <p className={styles.menuDesc}>
              成長の5つのステップ（L1〜L5）をチェックし、<br />
              今お子さまがどこにいるのかを確認します。
            </p>
          </Link>

          <Link href="/guide/game" className={styles.menuItem}>
            <span className={styles.menuIcon}>🎮</span>
            <h2 className={styles.menuTitle}>星守りミニゲーム</h2>
            <p className={styles.menuDesc}>
              星座マップを進めると遊べるようになる<br />
              お子さま専用の星集めブラウザゲームです。
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
