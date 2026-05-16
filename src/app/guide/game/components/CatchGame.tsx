'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CHARACTER_MAP, CHARACTER_BASE_URL } from '@/lib/characterMap';
import styles from '../page.module.css';

type Star = {
  id: number;
  x: number;
  speed: number;
  emoji: string;
};

const EMOJIS = ['✨', '⭐️', '🌟', '💫', '🍎', '💧', '🍃'];
const TARGET_SCORE = 15;

export default function CatchGame({ onBack }: { onBack: () => void }) {
  const [stars, setStars] = useState<Star[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [rewardChar, setRewardChar] = useState<{name: string, imageUrl: string} | null>(null);
  
  const starIdCounter = useRef(0);

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setStars((prev) => {
        if (prev.length >= 8) return prev;
        
        starIdCounter.current += 1;
        const newStar: Star = {
          id: starIdCounter.current,
          x: Math.random() * 80 + 10,
          speed: Math.random() * 2.5 + 2.0,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
        };
        return [...prev, newStar];
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) return;
    const cleanup = setInterval(() => {
      setStars(prev => prev.slice(-5));
    }, 4000);
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
    <div className={styles.gameContainer}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>
          ◀ ゲーム選択に戻る
        </button>
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
          <div className={styles.instructions}>落ちてくる星をタッチしてね！</div>
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
            マップに戻る
          </Link>
        </div>
      )}
    </div>
  );
}
