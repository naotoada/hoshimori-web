'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { CHARACTER_MAP, CHARACTER_BASE_URL } from '@/lib/characterMap';
import styles from '../page.module.css';

type ElementType = 'fire' | 'water' | 'wood';
type FallingItem = {
  id: number;
  type: ElementType;
  speed: number;
  x: number;
};

const ELEMENT_EMOJIS: Record<ElementType, string> = {
  fire: '🔥',
  water: '💧',
  wood: '🍃'
};

const TARGET_SCORE = 10;

export default function SortGame({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rewardChar, setRewardChar] = useState<{name: string, imageUrl: string} | null>(null);
  
  const itemIdCounter = useRef(0);

  // Spawn items using CSS animation for falling
  useEffect(() => {
    if (isGameOver) return;

    const spawnInterval = setInterval(() => {
      setItems(prev => {
        if (prev.length >= 4) return prev;
        
        itemIdCounter.current += 1;
        const types: ElementType[] = ['fire', 'water', 'wood'];
        const newItem: FallingItem = {
          id: itemIdCounter.current,
          type: types[Math.floor(Math.random() * types.length)],
          speed: Math.random() * 1.5 + 3, // 3-4.5 seconds to fall
          x: Math.random() * 60 + 20,
        };
        return [...prev, newItem];
      });
    }, 1200);

    return () => clearInterval(spawnInterval);
  }, [isGameOver]);

  // Cleanup items that have finished falling (animation ended)
  useEffect(() => {
    if (isGameOver) return;
    const cleanup = setInterval(() => {
      // Remove items older than 5 seconds (they've fallen off screen)
      setItems(prev => prev.slice(-6));
    }, 5000);
    return () => clearInterval(cleanup);
  }, [isGameOver]);

  const handleBinClick = useCallback((type: ElementType) => {
    if (isGameOver) return;
    
    setItems(prev => {
      if (prev.length === 0) return prev;
      
      // Take the first (oldest) item — the one closest to the bottom
      const targetItem = prev[0];
      
      if (targetItem.type === type) {
        // Correct!
        setScore(s => {
          const newScore = s + 1;
          if (newScore >= TARGET_SCORE) {
            handleWin();
          }
          return newScore;
        });
        setFeedback('⭕️');
      } else {
        // Wrong
        setFeedback('❌');
      }
      
      setTimeout(() => setFeedback(''), 400);
      return prev.slice(1); // Remove the first item
    });
  }, [isGameOver]);

  const handleWin = () => {
    setIsGameOver(true);
    setItems([]);
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
    setItems([]);
    setFeedback('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>
          ◀ ゲーム選択に戻る
        </button>
        <div className={styles.score}>
          🎯 {score} / {TARGET_SCORE}
        </div>
      </div>

      {!isGameOver && (
        <div className={styles.playArea} style={{ position: 'relative' }}>
          <div className={styles.instructions} style={{ position: 'absolute', top: '70px', width: '100%', textAlign: 'center', zIndex: 5 }}>
            落ちてくるマークと同じボタンをおしてね！
          </div>
          
          {/* Feedback indicator */}
          {feedback && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '5rem',
              zIndex: 20,
              pointerEvents: 'none'
            }}>
              {feedback}
            </div>
          )}

          {items.map(item => (
            <div
              key={item.id}
              className={styles.fallingStar}
              style={{
                left: `${item.x}%`,
                animationDuration: `${item.speed}s`,
                fontSize: '3.5rem'
              }}
            >
              {ELEMENT_EMOJIS[item.type]}
            </div>
          ))}

          {/* Bins at bottom */}
          <div className={styles.binContainer}>
            <button className={`${styles.binBtn} ${styles.binFire}`} onClick={() => handleBinClick('fire')}>
              🔥
            </button>
            <button className={`${styles.binBtn} ${styles.binWood}`} onClick={() => handleBinClick('wood')}>
              🍃
            </button>
            <button className={`${styles.binBtn} ${styles.binWater}`} onClick={() => handleBinClick('water')}>
              💧
            </button>
          </div>
        </div>
      )}

      {isGameOver && rewardChar && (
        <div className={styles.resultScreen}>
          <img src={rewardChar.imageUrl} alt={rewardChar.name} className={styles.characterImg} />
          <h2 className={styles.characterName}>{rewardChar.name} があらわれた！</h2>
          <p className={styles.praiseMessage}>
            すごい！<br/>上手にわけられたね！
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
