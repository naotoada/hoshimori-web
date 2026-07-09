'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CatchGame from './components/CatchGame';
import MemoryGame from './components/MemoryGame';
import SortGame from './components/SortGame';
import SlotGame from './components/SlotGame';
import DefendGame from './components/DefendGame';
import styles from './page.module.css';

type GameType = 'menu' | 'catch' | 'memory' | 'sort' | 'slot' | 'defend';

export default function GameHub() {
  const [activeGame, setActiveGame] = useState<GameType>('menu');
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setIsIframe(params.get('iframe') === 'true');
    }
  }, []);

  if (activeGame === 'catch') return <CatchGame onBack={() => setActiveGame('menu')} />;
  if (activeGame === 'memory') return <MemoryGame onBack={() => setActiveGame('menu')} />;
  if (activeGame === 'sort') return <SortGame onBack={() => setActiveGame('menu')} />;
  if (activeGame === 'slot') return <SlotGame onBack={() => setActiveGame('menu')} />;
  if (activeGame === 'defend') return <DefendGame onBack={() => setActiveGame('menu')} />;

  // Menu Render
  return (
    <div className={styles.container}>
      <Head>
        <title>星守りの導き | ミニゲーム</title>
      </Head>

      <div className={styles.menuContainer}>
        {!isIframe && (
          <Link href="/guide" className={styles.menuBackBtn}>
            ◀ マップに戻る
          </Link>
        )}
        <h1 className={styles.menuTitle}>あそぶゲームをえらんでね！</h1>
        
        <div className={styles.menuGrid}>
          {/* Catch Game */}
          <div className={styles.gameCard} onClick={() => setActiveGame('catch')}>
            <div className={styles.gameIcon}>✨</div>
            <h2 className={styles.gameName} style={{ color: '#FDE047' }}>お星さまキャッチ</h2>
            <p className={styles.gameDesc}>落ちてくる星をタッチして、たくさん集めよう！</p>
          </div>

          {/* Sort Game */}
          <div className={styles.gameCard} onClick={() => setActiveGame('sort')}>
            <div className={styles.gameIcon}>🔮</div>
            <h2 className={styles.gameName} style={{ color: '#E879F9' }}>魔法のしるし合わせ</h2>
            <p className={styles.gameDesc}>落ちてくるしるしと同じボタンを素早くおそう！</p>
          </div>

          {/* Defend Game */}
          <div className={styles.gameCard} onClick={() => setActiveGame('defend')}>
            <div className={styles.gameIcon}>☁️</div>
            <h2 className={styles.gameName} style={{ color: '#7DD3FC' }}>迷いを払う！星の防衛戦</h2>
            <p className={styles.gameDesc}>迫ってくる雲をタッチして、真ん中の星を守り抜け！</p>
          </div>

          {/* Memory Game */}
          <div className={styles.gameCard} onClick={() => setActiveGame('memory')}>
            <div className={styles.gameIcon}>⭐️</div>
            <h2 className={styles.gameName} style={{ color: '#6EE7B7' }}>星座の記憶つなぎ</h2>
            <p className={styles.gameDesc}>光った星の順番をおぼえて、おなじようにタッチしよう！</p>
          </div>

          {/* Slot Game */}
          <div className={styles.gameCard} onClick={() => setActiveGame('slot')}>
            <div className={styles.gameIcon}>🎰</div>
            <h2 className={styles.gameName} style={{ color: '#FCA5A5' }}>星のルーレット</h2>
            <p className={styles.gameDesc}>タイミングよくボタンをおして、ルーレットをとめてね！</p>
          </div>
        </div>
      </div>
    </div>
  );
}
