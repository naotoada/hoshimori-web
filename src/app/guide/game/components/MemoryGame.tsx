'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CHARACTER_MAP, CHARACTER_BASE_URL } from '@/lib/characterMap';
import styles from '../page.module.css';

const STARS_COUNT = 5;

export default function MemoryGame({ onBack }: { onBack: () => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [activeStar, setActiveStar] = useState<number | null>(null);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [rewardChar, setRewardChar] = useState<{name: string, imageUrl: string} | null>(null);
  const [message, setMessage] = useState('星の順番をおぼえてね！');

  // Generate sequence for current level
  useEffect(() => {
    if (isGameOver) return;
    
    // Level 1 = 3 stars, Level 2 = 4 stars, Level 3 = 5 stars
    const targetLength = level + 2;
    if (sequence.length === 0) {
      const newSeq = Array.from({ length: targetLength }, () => Math.floor(Math.random() * STARS_COUNT));
      setSequence(newSeq);
      setPlayerSequence([]);
    }
  }, [level, isGameOver, sequence.length]);

  // Play sequence
  useEffect(() => {
    if (sequence.length === 0 || isGameOver) return;
    
    let isMounted = true;
    const playSeq = async () => {
      setIsPlayingSequence(true);
      setMessage('よく見ててね...');
      
      // Initial pause
      await new Promise(r => setTimeout(r, 1000));
      
      for (let i = 0; i < sequence.length; i++) {
        if (!isMounted) return;
        setActiveStar(sequence[i]);
        await new Promise(r => setTimeout(r, 600));
        setActiveStar(null);
        await new Promise(r => setTimeout(r, 200));
      }
      
      if (isMounted) {
        setIsPlayingSequence(false);
        setMessage('順番にタップしてね！');
      }
    };
    
    playSeq();
    
    return () => { isMounted = false; };
  }, [sequence, isGameOver]);

  const handleStarClick = (index: number) => {
    if (isPlayingSequence || isGameOver) return;
    
    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);
    
    // Highlight clicked star briefly
    setActiveStar(index);
    setTimeout(() => setActiveStar(null), 200);

    // Check if correct so far
    const currentIndex = newPlayerSeq.length - 1;
    if (newPlayerSeq[currentIndex] !== sequence[currentIndex]) {
      // Wrong!
      setMessage('ざんねん！もういちど挑戦しよう');
      setTimeout(() => {
        setPlayerSequence([]);
        setSequence([]); // This will trigger regeneration of the same level
      }, 1500);
      return;
    }

    // Check if level complete
    if (newPlayerSeq.length === sequence.length) {
      if (level >= 3) {
        // Game beat
        setMessage('すごい！せいかい！');
        setTimeout(() => handleWin(), 1000);
      } else {
        setMessage('せいかい！つぎのレベルへ！');
        setTimeout(() => {
          setLevel(l => l + 1);
          setSequence([]);
        }, 1500);
      }
    }
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

  const resetGame = () => {
    setLevel(1);
    setSequence([]);
    setPlayerSequence([]);
    setIsGameOver(false);
    setMessage('星の順番をおぼえてね！');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>
          ◀ ゲーム選択に戻る
        </button>
        <div className={styles.score}>
          Lv. {level} / 3
        </div>
      </div>

      {!isGameOver && (
        <div className={styles.playArea} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className={styles.instructions} style={{ position: 'static', marginBottom: '2rem', fontSize: '1.2rem', textAlign: 'center' }}>
            {message}
          </div>
          
          <div className={styles.memoryGrid}>
            {Array.from({ length: STARS_COUNT }).map((_, i) => (
              <div 
                key={i} 
                className={`${styles.memoryStar} ${activeStar === i ? styles.memoryStarActive : ''}`}
                onPointerDown={() => handleStarClick(i)}
              >
                ⭐️
              </div>
            ))}
          </div>
        </div>
      )}

      {isGameOver && rewardChar && (
        <div className={styles.resultScreen}>
          <img src={rewardChar.imageUrl} alt={rewardChar.name} className={styles.characterImg} />
          <h2 className={styles.characterName}>{rewardChar.name} があらわれた！</h2>
          <p className={styles.praiseMessage}>
            ばっちりおぼえられたね！<br/>きおくりょくがすごい！
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
