'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CHARACTER_MAP, CHARACTER_BASE_URL } from '@/lib/characterMap';
import styles from '../page.module.css';

type ElementType = 'fire' | 'water' | 'wood';
type FallingItem = {
  id: number;
  type: ElementType;
  y: number;
  x: number;
};

const ELEMENT_EMOJIS = {
  fire: '🔥',
  water: '💧',
  wood: '🍃'
};

const TARGET_SCORE = 10;

export default function SortGame({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [rewardChar, setRewardChar] = useState<{name: string, imageUrl: string} | null>(null);
  
  const itemIdCounter = useRef(0);
  const gameLoopRef = useRef<number>(null);

  // Spawner
  useEffect(() => {
    if (isGameOver) return;

    const spawnInterval = setInterval(() => {
      setItems(prev => {
        if (prev.length >= 3) return prev; // Limit items on screen
        
        itemIdCounter.current += 1;
        const types: ElementType[] = ['fire', 'water', 'wood'];
        const newItem: FallingItem = {
          id: itemIdCounter.current,
          type: types[Math.floor(Math.random() * types.length)],
          y: -10, // start above screen
          x: Math.random() * 60 + 20, // 20% to 80%
        };
        return [...prev, newItem];
      });
    }, 1500);

    return () => clearInterval(spawnInterval);
  }, [isGameOver]);

  // Fall logic
  useEffect(() => {
    if (isGameOver) return;

    let lastTime = performance.now();
    
    const update = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      setItems(prev => {
        let missed = false;
        const updated = prev.map(item => {
          const newY = item.y + (deltaTime * 0.02); // Fall speed
          if (newY > 100) missed = true;
          return { ...item, y: newY };
        }).filter(item => item.y <= 100);
        
        // If an item fell past the screen, penalize or ignore. Let's just ignore.
        return updated;
      });

      gameLoopRef.current = requestAnimationFrame(update);
    };

    gameLoopRef.current = requestAnimationFrame(update);
    
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [isGameOver]);

  const handleBinClick = (type: ElementType) => {
    if (isGameOver || items.length === 0) return;
    
    // Find the lowest item (closest to bottom)
    const lowestItem = items.reduce((lowest, current) => {
      return current.y > lowest.y ? current : lowest;
    }, items[0]);

    // If lowest item is at least 50% down the screen, allow catch
    if (lowestItem.y > 40) {
      if (lowestItem.type === type) {
        // Correct catch!
        setItems(prev => prev.filter(i => i.id !== lowestItem.id));
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= TARGET_SCORE) handleWin();
      } else {
        // Wrong! Penalize slightly by removing it but no points.
        setItems(prev => prev.filter(i => i.id !== lowestItem.id));
      }
    }
  };

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
          <div className={styles.instructions} style={{ position: 'absolute', top: '10px', width: '100%', textAlign: 'center' }}>
            落ちてくるマークと同じボタンをおしてね！
          </div>
          
          {items.map(item => (
            <div
              key={item.id}
              className={styles.fallingElement}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                position: 'absolute',
                fontSize: '3rem',
                transform: 'translateX(-50%)'
              }}
            >
              {ELEMENT_EMOJIS[item.type]}
            </div>
          ))}

          {/* Bins at bottom */}
          <div className={styles.binContainer}>
            <button className={`${styles.binBtn} ${styles.binFire}`} onPointerDown={() => handleBinClick('fire')}>
              🔥
            </button>
            <button className={`${styles.binBtn} ${styles.binWood}`} onPointerDown={() => handleBinClick('wood')}>
              🍃
            </button>
            <button className={`${styles.binBtn} ${styles.binWater}`} onPointerDown={() => handleBinClick('water')}>
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
