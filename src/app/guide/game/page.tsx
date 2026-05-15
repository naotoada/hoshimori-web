'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { CHARACTER_MAP, CHARACTER_BASE_URL } from '@/lib/characterMap';
import styles from './page.module.css';

type Star = {
  id: number;
  x: number;
  speed: number;
  emoji: string;
};

const EMOJIS = ['✨', '⭐️', '🌟', '💫', '🍎', '💧', '🍃'];
const TARGET_SCORE = 10;

export default function HoshimoriGame() {
  const [stars, setStars] = useState<Star[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [rewardChar, setRewardChar] = useState<{name: string, imageUrl: string} | null>(null);
  const [currentMapLevel, setCurrentMapLevel] = useState(1);
  
  const starIdCounter = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lvl = sessionStorage.getItem('guide_level');
      if (lvl) setCurrentMapLevel(parseInt(lvl, 10));
    }
  }, []);

  useEffect(() => {
    if (isGameOver) return;

    // Spawn a new star every 800ms
    const interval = setInterval(() => {
      setStars((prev) => {
        // Keep max 7 stars on screen to prevent clutter
        if (prev.length >= 7) return prev;
        
        starIdCounter.current += 1;
        const newStar: Star = {
          id: starIdCounter.current,
          x: Math.random() * 80 + 10, // 10% to 90% of screen width
          speed: Math.random() * 2.5 + 2.5, // Fall duration between 2.5s and 5s
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
        };
        return [...prev, newStar];
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isGameOver]);

  // Remove stars that have fallen off screen (lazy cleanup)
  useEffect(() => {
    if (isGameOver) return;
    const cleanup = setInterval(() => {
      setStars(prev => prev.slice(-5));
    }, 5000);
    return () => clearInterval(cleanup);
  }, [isGameOver]);

  const catchStar = (id: number) => {
    if (isGameOver) return;
    
    setStars(prev => prev.filter(s => s.id !== id));
    
    const newScore = score + 1;
    setScore(newScore);

    if (newScore >= TARGET_SCORE) {
      handleWin();
    }
  };

  const handleWin = () => {
    setIsGameOver(true);
    setStars([]);
    
    // Pick a random Hoshimori Character
    const keys = Object.keys(CHARACTER_MAP);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const char = CHARACTER_MAP[randomKey];
    setRewardChar({
      name: char.name,
      imageUrl: `${CHARACTER_BASE_URL}${char.file}.png`
    });
  };

  const resetGame = () => {
    setScore(0);
    setIsGameOver(false);
    setStars([]);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>星守りミニゲーム | 星集め</title>
      </Head>

      <div className={styles.header}>
        <Link href="/guide" className={styles.backBtn}>
          ◀ マップに戻る
        </Link>
        <div className={styles.score}>
          ⭐️ {score} / {TARGET_SCORE}
        </div>
      </div>

      {!isGameOver && (
        <div className={styles.playArea}>
          {stars.map((star) => (
            <div
              key={star.id}
              className={styles.fallingStar}
              style={{
                left: `${star.x}%`,
                animationDuration: `${star.speed}s`
              }}
              onPointerDown={() => catchStar(star.id)}
            >
              {star.emoji}
            </div>
          ))}
        </div>
      )}

      {isGameOver && rewardChar && (
        <div className={styles.resultScreen}>
          <img src={rewardChar.imageUrl} alt={rewardChar.name} className={styles.characterImg} />
          <h2 className={styles.characterName}>{rewardChar.name} があらわれた！</h2>
          <p className={styles.praiseMessage}>
            すごい！<br/>星をたくさん集められたね！
          </p>
          <button className={styles.replayBtn} onClick={resetGame}>
            もういっかい遊ぶ
          </button>
          <Link href="/guide" className={styles.returnBtn}>
            ステップ {currentMapLevel} に戻る
          </Link>
        </div>
      )}
    </div>
  );
}
