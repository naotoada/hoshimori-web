'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CHARACTER_MAP, CHARACTER_BASE_URL } from '@/lib/characterMap';
import styles from '../page.module.css';

const SLOT_EMOJIS = ['🔥', '💧', '🍃', '⭐️', '⛰️'];
const CELEBRATION_EMOJIS = ['🎉', '✨', '⭐️', '🌟', '💫', '🎊', '🔥', '💎', '👑', '🌈'];

type Particle = {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
};

export default function SlotGame({ onBack }: { onBack: () => void }) {
  const [slots, setSlots] = useState([0, 1, 2]);
  const [spinning, setSpinning] = useState([false, false, false]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMiss, setIsMiss] = useState(false);
  const [message, setMessage] = useState('');
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [celebrationPhase, setCelebrationPhase] = useState(0);
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
    setIsCelebrating(false);
    setCelebrationPhase(0);
    setMessage('');
    setRewardChar(null);
    setParticles([]);
  };

  const stopSlot = (index: number) => {
    setSpinning(prev => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  const startCelebration = useCallback(() => {
    setIsCelebrating(true);

    // Generate particles in waves
    const allParticles: Particle[] = [];
    for (let wave = 0; wave < 3; wave++) {
      for (let i = 0; i < 15; i++) {
        allParticles.push({
          id: wave * 15 + i,
          emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
          x: Math.random() * 100,
          delay: wave * 0.8 + Math.random() * 0.5,
          duration: 1.5 + Math.random() * 1.5,
          size: 1.5 + Math.random() * 2,
        });
      }
    }
    setParticles(allParticles);

    // Phase 1: Flash + "大当たり！"
    setCelebrationPhase(1);

    // Phase 2: Bigger text
    setTimeout(() => setCelebrationPhase(2), 1200);

    // Phase 3: Transition to result
    setTimeout(() => {
      setIsCelebrating(false);
      setParticles([]);
      handleWin();
    }, 3500);
  }, []);

  // Check result when all stopped
  useEffect(() => {
    if (hasStarted && !spinning.includes(true) && !isGameOver && !isMiss && !isCelebrating) {
      const allMatch = slots[0] === slots[1] && slots[1] === slots[2];
      const twoMatch = slots[0] === slots[1] || slots[1] === slots[2] || slots[0] === slots[2];

      if (allMatch) {
        setMessage('');
        setTimeout(() => startCelebration(), 300);
      } else if (twoMatch) {
        setMessage('おしい！あと1つだった！');
        setTimeout(() => setIsMiss(true), 800);
      } else {
        setMessage('ざんねん…！もういっかい！');
        setTimeout(() => setIsMiss(true), 800);
      }
    }
  }, [spinning, isGameOver, isMiss, hasStarted, isCelebrating, slots, startCelebration]);

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

      {/* Celebration Overlay */}
      {isCelebrating && (
        <div className={styles.celebrationOverlay}>
          {/* Screen flash */}
          <div className={styles.screenFlash} />

          {/* Particles */}
          {particles.map(p => (
            <div
              key={p.id}
              className={styles.celebrationParticle}
              style={{
                left: `${p.x}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                fontSize: `${p.size}rem`,
              }}
            >
              {p.emoji}
            </div>
          ))}

          {/* Center text */}
          <div className={styles.celebrationText}>
            {celebrationPhase >= 1 && (
              <div className={styles.jackpotText1}>
                🎰 大当たり！ 🎰
              </div>
            )}
            {celebrationPhase >= 2 && (
              <div className={styles.jackpotText2}>
                ✨ おめでとう！ ✨
              </div>
            )}
          </div>

          {/* Slot machine still visible behind */}
          <div className={styles.slotMachine} style={{ opacity: 0.3, position: 'relative', zIndex: 1 }}>
            {slots.map((slotValue, i) => (
              <div key={i} className={styles.slotColumn}>
                <div className={`${styles.slotWindow} ${styles.slotWinGlow}`}>
                  {SLOT_EMOJIS[slotValue]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isGameOver && !isCelebrating && (
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
