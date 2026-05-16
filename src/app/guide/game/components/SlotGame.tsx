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
  const [hasStarted, setHasStarted] = useState(false);
  const [isMiss, setIsMiss] = useState(false);
  const [message, setMessage] = useState('');
  const [rewardChar, setRewardChar] = useState<{name: string, imageUrl: string} | null>(null);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    spinning.forEach((isSpinning, i) => {
      if (isSpinning) {
        const speed = 100 + (i * 20);
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
    setHasStarted(true);
    setIsMiss(false);
    setMessage('');
    setRewardChar(null);
  };

  const stopSlot = (index: number) => {
    setSpinning(prev => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  // Check result when all stopped
  useEffect(() => {
    if (hasStarted && !spinning.includes(true) && !isGameOver && !isMiss) {
      const allMatch = slots[0] === slots[1] && slots[1] === slots[2];
      const twoMatch = slots[0] === slots[1] || slots[1] === slots[2] || slots[0] === slots[2];

      if (allMatch) {
        setMessage('🎉 大当たり！');
        setTimeout(() => handleWin(), 800);
      } else if (twoMatch) {
        setMessage('おしい！あと1つだった！');
        setTimeout(() => setIsMiss(true), 800);
      } else {
        setMessage('ざんねん…！もういっかい！');
        setTimeout(() => setIsMiss(true), 800);
      }
    }
  }, [spinning, isGameOver, isMiss, hasStarted, slots]);

  const handleWin = () => {
    setIsGameOver(true);
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

      {!isGameOver && (
        <div className={styles.playArea} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className={styles.instructions} style={{ position: 'static', marginBottom: '2rem' }}>
            3つ揃えたら星守りが出てくるよ！
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

          {message && !spinning.includes(true) && (
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FBBF24', marginTop: '1.5rem', textAlign: 'center' }}>
              {message}
            </p>
          )}

          {!spinning.includes(true) && (
            <button className={styles.slotStartBtn} onClick={startSpin}>
              {isMiss ? 'もういっかい！' : 'スピンスタート！'}
            </button>
          )}
        </div>
      )}

      {isGameOver && rewardChar && (
        <div className={styles.resultScreen}>
          <img src={rewardChar.imageUrl} alt={rewardChar.name} className={styles.characterImg} />
          <h2 className={styles.characterName}>{rewardChar.name} があらわれた！</h2>
          <p className={styles.praiseMessage}>
            3つ揃ったね！すごい！<br/>またあそんでみてね！
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
