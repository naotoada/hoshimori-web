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
import { useLang } from './i18n';

type GameType = 'menu' | 'catch' | 'memory' | 'sort' | 'slot' | 'defend';

export default function GameHub() {
  const [activeGame, setActiveGame] = useState<GameType>('menu');
  const [isIframe, setIsIframe] = useState(false);
  const t = useLang();

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
        <title>{t.menuTitle}</title>
      </Head>

      <div className={styles.menuContainer}>
        {!isIframe && (
          <Link href="/guide" className={styles.menuBackBtn}>
            {t.menuBack}
          </Link>
        )}
        <h1 className={styles.menuTitle}>{t.menuTitle}</h1>
        
        <div className={styles.menuGrid}>
          {/* Catch Game */}
          <div className={styles.gameCard} onClick={() => setActiveGame('catch')}>
            <div className={styles.gameIcon}>✨</div>
            <h2 className={styles.gameName} style={{ color: '#FDE047' }}>{t.catchName}</h2>
            <p className={styles.gameDesc}>{t.catchDesc}</p>
          </div>

          {/* Sort Game */}
          <div className={styles.gameCard} onClick={() => setActiveGame('sort')}>
            <div className={styles.gameIcon}>🔮</div>
            <h2 className={styles.gameName} style={{ color: '#E879F9' }}>{t.sortName}</h2>
            <p className={styles.gameDesc}>{t.sortDesc}</p>
          </div>

          {/* Defend Game */}
          <div className={styles.gameCard} onClick={() => setActiveGame('defend')}>
            <div className={styles.gameIcon}>☁️</div>
            <h2 className={styles.gameName} style={{ color: '#7DD3FC' }}>{t.defendName}</h2>
            <p className={styles.gameDesc}>{t.defendDesc}</p>
          </div>

          {/* Memory Game */}
          <div className={styles.gameCard} onClick={() => setActiveGame('memory')}>
            <div className={styles.gameIcon}>⭐️</div>
            <h2 className={styles.gameName} style={{ color: '#6EE7B7' }}>{t.memoryName}</h2>
            <p className={styles.gameDesc}>{t.memoryDesc}</p>
          </div>

          {/* Slot Game */}
          <div className={styles.gameCard} onClick={() => setActiveGame('slot')}>
            <div className={styles.gameIcon}>🎰</div>
            <h2 className={styles.gameName} style={{ color: '#FCA5A5' }}>{t.slotName}</h2>
            <p className={styles.gameDesc}>{t.slotDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

