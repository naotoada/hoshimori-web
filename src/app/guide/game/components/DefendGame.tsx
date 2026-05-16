'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CHARACTER_MAP, CHARACTER_BASE_URL } from '@/lib/characterMap';
import styles from '../page.module.css';

type Enemy = {
  id: number;
  x: number;
  y: number;
  speed: number;
};

const SURVIVE_TIME = 20;

export default function DefendGame({ onBack }: { onBack: () => void }) {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [timeLeft, setTimeLeft] = useState(SURVIVE_TIME);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [rewardChar, setRewardChar] = useState<{name: string, imageUrl: string} | null>(null);
  
  const enemyIdCounter = useRef(0);
  const gameLoopRef = useRef<number | null>(null);
  const isGameOverRef = useRef(false);
  const hasWonRef = useRef(false);

  // Timer
  useEffect(() => {
    if (isGameOver || hasWon) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          hasWonRef.current = true;
          setHasWon(true);
          setEnemies([]);
          
          const keys = Object.keys(CHARACTER_MAP);
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          const char = CHARACTER_MAP[randomKey];
          setRewardChar({
            name: char.name,
            imageUrl: `${CHARACTER_BASE_URL}${char.file}.png`
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver, hasWon]);

  // Spawner
  useEffect(() => {
    if (isGameOver || hasWon) return;

    const spawnInterval = setInterval(() => {
      if (isGameOverRef.current || hasWonRef.current) return;
      
      setEnemies(prev => {
        if (prev.length >= 8) return prev;
        
        enemyIdCounter.current += 1;
        let startX = 0;
        let startY = 0;
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { startX = Math.random() * 80 + 10; startY = 0; }
        else if (edge === 1) { startX = 100; startY = Math.random() * 80 + 10; }
        else if (edge === 2) { startX = Math.random() * 80 + 10; startY = 100; }
        else { startX = 0; startY = Math.random() * 80 + 10; }

        const newEnemy: Enemy = {
          id: enemyIdCounter.current,
          x: startX,
          y: startY,
          speed: 0.15 + Math.random() * 0.1,
        };
        return [...prev, newEnemy];
      });
    }, 1200);

    return () => clearInterval(spawnInterval);
  }, [isGameOver, hasWon]);

  // Movement logic
  useEffect(() => {
    if (isGameOver || hasWon) return;

    let lastTime = performance.now();
    
    const update = (time: number) => {
      if (isGameOverRef.current || hasWonRef.current) return;
      
      const deltaTime = Math.min(time - lastTime, 50); // cap delta
      lastTime = time;
      
      setEnemies(prev => {
        let hitCenter = false;
        const updated = prev.map(enemy => {
          const dx = 50 - enemy.x;
          const dy = 50 - enemy.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 6) hitCenter = true;
          if (dist < 1) return enemy; // Prevent NaN
          
          const moveX = (dx / dist) * enemy.speed * deltaTime * 0.06;
          const moveY = (dy / dist) * enemy.speed * deltaTime * 0.06;
          
          return { ...enemy, x: enemy.x + moveX, y: enemy.y + moveY };
        });

        if (hitCenter && !isGameOverRef.current) {
          isGameOverRef.current = true;
          // Schedule state update outside of setEnemies
          setTimeout(() => {
            setIsGameOver(true);
            setEnemies([]);
          }, 0);
        }
        
        return hitCenter ? prev : updated;
      });

      if (!isGameOverRef.current && !hasWonRef.current) {
        gameLoopRef.current = requestAnimationFrame(update);
      }
    };

    gameLoopRef.current = requestAnimationFrame(update);
    
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [isGameOver, hasWon]);

  const tapEnemy = (id: number) => {
    if (isGameOverRef.current || hasWonRef.current) return;
    setEnemies(prev => prev.filter(e => e.id !== id));
  };

  const resetGame = () => {
    isGameOverRef.current = false;
    hasWonRef.current = false;
    setIsGameOver(false);
    setHasWon(false);
    setTimeLeft(SURVIVE_TIME);
    setEnemies([]);
    setRewardChar(null);
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>
          ◀ ゲーム選択に戻る
        </button>
        <div className={styles.score}>
          ⏳ {timeLeft}秒
        </div>
      </div>

      {!isGameOver && !hasWon && (
        <div className={styles.playArea} style={{ position: 'relative' }}>
          <div className={styles.instructions} style={{ position: 'absolute', top: '80px', width: '100%', textAlign: 'center', zIndex: 5 }}>
            迫ってくる雲をタッチして星を守れ！
          </div>
          
          {/* Center Star */}
          <div className={styles.defendCenterStar}>
            ⭐️
          </div>

          {enemies.map(enemy => (
            <div
              key={enemy.id}
              className={styles.defendCloud}
              style={{
                left: `${enemy.x}%`,
                top: `${enemy.y}%`,
              }}
              onClick={() => tapEnemy(enemy.id)}
            >
              ☁️
            </div>
          ))}
        </div>
      )}

      {isGameOver && !hasWon && (
        <div className={styles.resultScreen}>
          <h2 style={{ fontSize: '2rem', color: '#F56565', marginBottom: '2rem' }}>ゲームオーバー...</h2>
          <p className={styles.praiseMessage}>
            星が隠されちゃった！<br/>もういっかいがんばろう！
          </p>
          <button className={styles.replayBtn} onClick={resetGame}>
            もういっかい遊ぶ
          </button>
        </div>
      )}

      {hasWon && rewardChar && (
        <div className={styles.resultScreen}>
          <img src={rewardChar.imageUrl} alt={rewardChar.name} className={styles.characterImg} />
          <h2 className={styles.characterName}>{rewardChar.name} があらわれた！</h2>
          <p className={styles.praiseMessage}>
            すごい！<br/>星をまもりぬいたね！
          </p>
          <button className={styles.replayBtn} onClick={resetGame}>
            もういっかい遊ぶ
          </button>
          <button className={styles.returnBtn} onClick={onBack}>
            ゲーム選択に戻る
          </button>
        </div>
      )}
    </div>
  );
}
