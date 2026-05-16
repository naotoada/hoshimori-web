'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

  // Use refs to track the final stopped values
  const slotsRef = useRef([0, 1, 2]);
  const stoppedCountRef = useRef(0);
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    spinning.forEach((isSpinning, i) => {
      if (isSpinning) {
        const speed = 100 + (i * 20);
        intervals[i] = setInterval(() => {
          setSlots(prev => {
            const next = [...prev];
            next[i] = (next[i] + 1) % SLOT_EMOJIS.length;
            slotsRef.current = next;
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
    stoppedCountRef.current = 0;
    hasCheckedRef.current = false;
  };

  const stopSlot = (index: number) => {
    if (!spinning[index]) return;
    
    setSpinning(prev => {
      const next = [...prev];
      next[index] = false;
      return next;
    });

    stoppedCountRef.current += 1;

    // When all 3 are stopped, check result
    if (stoppedCountRef.current === 3 && !hasCheckedRef.current) {
      hasCheckedRef.current = true;
      // Small delay to let the last interval clear and final slot value settle
      setTimeout(() => checkResult(), 200);
    }
  };

  const checkResult = () => {
    const s = slotsRef.current;
    const allMatch = s[0] === s[1] && s[1] === s[2];
    const twoMatch = s[0] === s[1] || s[1] === s[2] || s[0] === s[2];

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
  };

  const startCelebration = () => {
    setIsCelebrating(true);

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

    setCelebrationPhase(1);
    setTimeout(() => setCelebrationPhase(2), 1200);

    setTimeout(() => {
      setIsCelebrating(false);
      setParticles([]);
      handleWin();
    }, 3500);
  };

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
    <div className={styles.gameContainer}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>
          ◀ ゲーム選択に戻る
        </button>
      </div>

      {/* Celebration Overlay */}
      {isCelebrating && (
        <div className={styles.celebrationOverlay}>
          <div className={styles.screenFlash} />

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

          {!spinning.includes(true) && !hasStarted && (
            <button className={styles.slotStartBtn} onClick={startSpin}>
              スピンスタート！
            </button>
          )}

          {!spinning.includes(true) && isMiss && (
            <button className={styles.slotStartBtn} onClick={startSpin}>
              もういっかい！
            </button>
          )}

          {!spinning.includes(true) && hasStarted && !isMiss && !message && (
            <button className={styles.slotStartBtn} onClick={startSpin}>
              スピンスタート！
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
