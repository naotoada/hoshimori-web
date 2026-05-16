'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CHARACTER_MAP, CHARACTER_BASE_URL } from '@/lib/characterMap';
import styles from '../page.module.css';

const SLOT_EMOJIS = ['🔥', '💧', '🍃', '⭐️', '⛰️'];

export default function SlotGame({ onBack }: { onBack: () => void }) {
  const [slots, setSlots] = useState([0, 1, 2]); // Indices of EMOJIS
  const [spinning, setSpinning] = useState([false, false, false]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [rewardChar, setRewardChar] = useState<{name: string, imageUrl: string} | null>(null);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    spinning.forEach((isSpinning, i) => {
      if (isSpinning) {
        const speed = 100 + (i * 20); // Slightly different speeds
        intervals[i] = setInterval(() => {
          setSlots(prev => {
            const next = [...prev];
            next[i] = (next[i] + 1) % SLOT_EMOJIS.length;
            return next;
          });
        }, speed);
      }
    });

    return () => {
      intervals.forEach(int => clearInterval(int));
    };
  }, [spinning]);

  const startSpin = () => {
    setSpinning([true, true, true]);
    setIsGameOver(false);
    setRewardChar(null);
  };

  const stopSlot = (index: number) => {
    setSpinning(prev => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  // Check win condition when all stopped
  useEffect(() => {
    if (!spinning.includes(true) && !isGameOver && slots.length === 3) {
      // Game just ended
      const hasSpunBefore = slots.some(s => s > 0); // basic check if actually played
      if (hasSpunBefore) {
        setTimeout(() => handleWin(), 800);
      }
    }
  }, [spinning, isGameOver, slots]);

  const handleWin = () => {
    setIsGameOver(true);
    // Find character based on elements or just random
    const keys = Object.keys(CHARACTER_MAP);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const char = CHARACTER_MAP[randomKey];
    setRewardChar({
      name: char.name,
      imageUrl: `${CHARACTER_BASE_URL}${char.file}.png`
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>
          ◀ ゲーム選択に戻る
        </button>
      </div>

      <div className={styles.playArea} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className={styles.instructions} style={{ position: 'static', marginBottom: '2rem' }}>
          タイミングよくボタンを押して止めてね！
        </div>
        
        <div className={styles.slotMachine}>
          {slots.map((slotValue, i) => (
            <div key={i} className={styles.slotColumn}>
              <div className={`${styles.slotWindow} ${spinning[i] ? styles.slotSpinning : ''}`}>
                {SLOT_EMOJIS[slotValue]}
              </div>
              <button 
                className={styles.slotStopBtn} 
                onClick={() => stopSlot(i)}
                disabled={!spinning[i]}
              >
                ストップ
              </button>
            </div>
          ))}
        </div>

        {!spinning.includes(true) && !isGameOver && (
          <button className={styles.slotStartBtn} onClick={startSpin}>
            スピンスタート！
          </button>
        )}
      </div>

      {isGameOver && rewardChar && (
        <div className={styles.resultScreen}>
          <img src={rewardChar.imageUrl} alt={rewardChar.name} className={styles.characterImg} />
          <h2 className={styles.characterName}>{rewardChar.name} があらわれた！</h2>
          <p className={styles.praiseMessage}>
            どんな星守りが出るかはおたのしみ！<br/>またあそんでみてね！
          </p>
          <button className={styles.replayBtn} onClick={startSpin}>
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
