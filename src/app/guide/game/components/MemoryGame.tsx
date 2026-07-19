'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CHARACTER_MAP, CHARACTER_BASE_URL, getLocalizedCharacterName } from '@/lib/characterMap';
import { playSE } from '@/lib/soundHelper';
import styles from '../page.module.css';
import { useLang } from '../i18n';

const STARS_COUNT = 5;

export default function MemoryGame({ onBack }: { onBack: () => void }) {
  const t = useLang();
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [activeStar, setActiveStar] = useState<number | null>(null);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [rewardChar, setRewardChar] = useState<{id: string, name: string, imageUrl: string} | null>(null);
  const [message, setMessage] = useState('');

  // Generate sequence for current level
  useEffect(() => {
    if (isGameOver || isCelebrating) return;
    
    // Level 1 = 3 stars, Level 2 = 4 stars, Level 3 = 5 stars
    const targetLength = level + 2;
    if (sequence.length === 0) {
      const newSeq = Array.from({ length: targetLength }, () => Math.floor(Math.random() * STARS_COUNT));
      setSequence(newSeq);
      setPlayerSequence([]);
    }
  }, [level, isGameOver, isCelebrating, sequence.length]);

  // Play sequence
  useEffect(() => {
    if (sequence.length === 0 || isGameOver || isCelebrating) return;
    
    let isMounted = true;
    const playSeq = async () => {
      setIsPlayingSequence(true);
      setMessage(t.memoryWatch);
      
      // Initial pause
      await new Promise(r => setTimeout(r, 1000));
      
      for (let i = 0; i < sequence.length; i++) {
        if (!isMounted) return;
        setActiveStar(sequence[i]);
        playSE.tap();
        await new Promise(r => setTimeout(r, 600));
        setActiveStar(null);
        await new Promise(r => setTimeout(r, 200));
      }
      
      if (isMounted) {
        setIsPlayingSequence(false);
        setMessage(t.memoryTap);
      }
    };
    
    playSeq();
    
    return () => { isMounted = false; };
  }, [sequence, isGameOver, isCelebrating]);
 
  const handleStarClick = (index: number) => {
    playSE.init();
    if (isPlayingSequence || isGameOver || isCelebrating) return;
    
    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);
    
    // Highlight clicked star briefly
    playSE.tap();
    setActiveStar(index);
    setTimeout(() => setActiveStar(null), 200);
 
    // Check if correct so far
    const currentIndex = newPlayerSeq.length - 1;
    if (newPlayerSeq[currentIndex] !== sequence[currentIndex]) {
      // Wrong!
      playSE.miss();
      setMessage(t.memoryWrong);
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
        playSE.clear();
        setMessage(t.memoryCorrect);
        setTimeout(() => handleWin(), 1000);
      } else {
        playSE.clear();
        setMessage(t.memoryNext);
        setTimeout(() => {
          setLevel(l => l + 1);
          setSequence([]);
        }, 1500);
      }
    }
  };
 
  const handleWin = () => {
    setIsCelebrating(true);
    const keys = Object.keys(CHARACTER_MAP);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const char = CHARACTER_MAP[randomKey];
    setRewardChar({
      id: randomKey,
      name: char.name,
      imageUrl: `${CHARACTER_BASE_URL}${char.file}.png`
    });

    setTimeout(() => {
      setIsCelebrating(false);
      setIsGameOver(true);
    }, 2500);
  };

  const resetGame = () => {
    setLevel(1);
    setSequence([]);
    setPlayerSequence([]);
    setIsGameOver(false);
    setIsCelebrating(false);
    setMessage(t.memoryReady);
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>
          {t.backToMenu}
        </button>
        <div className={styles.score}>
          Lv. {level} / 3
        </div>
      </div>

      {!isGameOver && !isCelebrating && (
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

      {isCelebrating && (
        <div className={styles.clearOverlay}>
          <div className={styles.clearIcon}>🌟</div>
          <h2 className={styles.clearText}>CLEAR!!</h2>
        </div>
      )}

      {isGameOver && !isCelebrating && rewardChar && (
        <div className={styles.resultScreen}>
          <img src={rewardChar.imageUrl} alt={rewardChar.name} className={styles.characterImg} />
          <h2 className={styles.characterName}>{t.appeared.replace('{name}', getLocalizedCharacterName(rewardChar.id, t.currentLang))}</h2>
          <p className={styles.praiseMessage}>
            {t.memoryClear.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>)}
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
