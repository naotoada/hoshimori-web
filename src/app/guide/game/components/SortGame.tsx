'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { CHARACTER_MAP, CHARACTER_BASE_URL } from '@/lib/characterMap';
import { playSE } from '@/lib/soundHelper';
import styles from '../page.module.css';
import { useLang } from '../i18n';

type ElementType = 'fire' | 'water' | 'wood';
type FallingItem = {
  id: number;
  type: ElementType;
  speed: number;
  x: number;
  createdAt: number;
};

const ELEMENT_EMOJIS: Record<ElementType, string> = {
  fire: '🔥',
  water: '💧',
  wood: '🍃'
};

const TARGET_SCORE = 10;

export default function SortGame({ onBack }: { onBack: () => void }) {
  const t = useLang();
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [rewardChar, setRewardChar] = useState<{name: string, imageUrl: string} | null>(null);
  
  const itemIdCounter = useRef(0);
  const scoreRef = useRef(0);

  // Spawn items
  useEffect(() => {
    if (isGameOver || isCelebrating) return;

    const spawnInterval = setInterval(() => {
      setItems(prev => {
        if (prev.length >= 4) return prev;
        
        itemIdCounter.current += 1;
        const types: ElementType[] = ['fire', 'water', 'wood'];
        const newItem: FallingItem = {
          id: itemIdCounter.current,
          type: types[Math.floor(Math.random() * types.length)],
          speed: Math.random() * 1.5 + 3,
          x: Math.random() * 60 + 20,
          createdAt: Date.now(),
        };
        return [...prev, newItem];
      });
    }, 1200);

    return () => clearInterval(spawnInterval);
  }, [isGameOver, isCelebrating]);

  // Remove item when its fall animation ends
  const handleAnimationEnd = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleBinClick = useCallback((type: ElementType) => {
    playSE.init();
    if (isGameOver || isCelebrating) return;
    
    setItems(prev => {
      if (prev.length === 0) return prev;
      
      const targetItem = prev[0];
      
      if (targetItem.type === type) {
        playSE.tap();
        scoreRef.current += 1;
        setScore(scoreRef.current);
        setFeedback('⭕️');
        if (scoreRef.current >= TARGET_SCORE) {
          setTimeout(() => handleWin(), 100);
        }
      } else {
        playSE.miss();
        setFeedback('❌');
      }
      
      setTimeout(() => setFeedback(''), 400);
      return prev.slice(1);
    });
  }, [isGameOver, isCelebrating]);

  const handleWin = () => {
    playSE.clear();
    setIsCelebrating(true);
    setItems([]);
    const keys = Object.keys(CHARACTER_MAP);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const char = CHARACTER_MAP[randomKey];
    setRewardChar({
      name: char.name,
      imageUrl: `${CHARACTER_BASE_URL}${char.file}.png`
    });

    setTimeout(() => {
      setIsCelebrating(false);
      setIsGameOver(true);
    }, 2500);
  };

  const resetGame = () => {
    setScore(0);
    scoreRef.current = 0;
    setIsGameOver(false);
    setIsCelebrating(false);
    setItems([]);
    setFeedback('');
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>
          {t.backToMenu}
        </button>
        <div className={styles.score}>
          🎯 {score} / {TARGET_SCORE}
        </div>
      </div>

      {!isGameOver && !isCelebrating && (
        <div className={styles.playArea} style={{ position: 'relative' }}>
          <div className={styles.instructions} style={{ position: 'absolute', top: '110px', width: '100%', textAlign: 'center', zIndex: 5, fontSize: '1.2rem' }}>
            {t.sortInstruction}
          </div>
          
          {feedback && (
            <div style={{
              position: 'absolute',
              top: '45%',
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
              onAnimationEnd={() => handleAnimationEnd(item.id)}
            >
              {ELEMENT_EMOJIS[item.type]}
            </div>
          ))}

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

      {isCelebrating && (
        <div className={styles.clearOverlay}>
          <div className={styles.clearIcon}>🌟</div>
          <h2 className={styles.clearText}>CLEAR!!</h2>
        </div>
      )}

      {isGameOver && !isCelebrating && rewardChar && (
        <div className={styles.resultScreen}>
          <img src={rewardChar.imageUrl} alt={rewardChar.name} className={styles.characterImg} />
          <h2 className={styles.characterName}>{t.appeared.replace('{name}', rewardChar.name)}</h2>
          <p className={styles.praiseMessage}>
            {t.sortClear.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>)}
          </p>
          <button className={styles.replayBtn} onClick={resetGame}>
            {t.playAgain}
          </button>
          <button className={styles.returnBtn} onClick={onBack}>
            {t.backToSelect}
          </button>
        </div>
      )}
    </div>
  );
}
