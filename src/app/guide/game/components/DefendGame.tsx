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

const SURVIVE_TIME = 20; // 20 seconds to win

export default function DefendGame({ onBack }: { onBack: () => void }) {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [timeLeft, setTimeLeft] = useState(SURVIVE_TIME);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [rewardChar, setRewardChar] = useState<{name: string, imageUrl: string} | null>(null);
  
  const enemyIdCounter = useRef(0);
  const gameLoopRef = useRef<number>(null);

  // Timer
  useEffect(() => {
    if (isGameOver || hasWon) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleWin();
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
      setEnemies(prev => {
        if (prev.length >= 8) return prev;
        
        enemyIdCounter.current += 1;
        // Spawn randomly on edges
        let startX = 0;
        let startY = 0;
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { startX = Math.random() * 100; startY = -10; } // Top
        else if (edge === 1) { startX = 110; startY = Math.random() * 100; } // Right
        else if (edge === 2) { startX = Math.random() * 100; startY = 110; } // Bottom
        else { startX = -10; startY = Math.random() * 100; } // Left

        const newEnemy: Enemy = {
          id: enemyIdCounter.current,
          x: startX,
          y: startY,
          speed: Math.random() * 0.1 + 0.1, // movement per frame
        };
        return [...prev, newEnemy];
      });
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [isGameOver, hasWon]);

  // Movement logic toward center (50, 50)
  useEffect(() => {
    if (isGameOver || hasWon) return;

    let lastTime = performance.now();
    
    const update = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      setEnemies(prev => {
        let hitCenter = false;
        const updated = prev.map(enemy => {
          const dx = 50 - enemy.x;
          const dy = 50 - enemy.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 5) hitCenter = true; // Hit center star!
          
          const moveX = (dx / dist) * enemy.speed * (deltaTime * 0.1);
          const moveY = (dy / dist) * enemy.speed * (deltaTime * 0.1);
          
          return { ...enemy, x: enemy.x + moveX, y: enemy.y + moveY };
        });

        if (hitCenter) {
          handleLose();
        }
        
        return updated;
      });

      gameLoopRef.current = requestAnimationFrame(update);
    };

    gameLoopRef.current = requestAnimationFrame(update);
    
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [isGameOver, hasWon]);

  const tapEnemy = (id: number) => {
    if (isGameOver || hasWon) return;
    setEnemies(prev => prev.filter(e => e.id !== id));
  };

  const handleWin = () => {
    setHasWon(true);
    setEnemies([]);
    
    const keys = Object.keys(CHARACTER_MAP);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const char = CHARACTER_MAP[randomKey];
    setRewardChar({
      name: char.name,
      imageUrl: `${CHARACTER_BASE_URL}${char.file}.png`
    });
  };

  const handleLose = () => {
    setIsGameOver(true);
    setEnemies([]);
  };

  const resetGame = () => {
    setIsGameOver(false);
    setHasWon(false);
    setTimeLeft(SURVIVE_TIME);
    setEnemies([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>
          ◀ ゲーム選択に戻る
        </button>
        <div className={styles.score}>
          ⏳ {timeLeft}秒
        </div>
      </div>

      {!isGameOver && !hasWon && (
        <div className={styles.playArea} style={{ position: 'relative', overflow: 'hidden' }}>
          <div className={styles.instructions} style={{ position: 'absolute', top: '10px', width: '100%', textAlign: 'center', zIndex: 10 }}>
            迫ってくる黒い雲をタッチして、真ん中の星を守れ！
          </div>
          
          {/* Center Star */}
          <div 
            className={styles.centerStar}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '4rem',
              animation: 'pulse 1s infinite'
            }}
          >
            ⭐️
          </div>

          {enemies.map(enemy => (
            <div
              key={enemy.id}
              className={styles.defendEnemy}
              style={{
                left: `${enemy.x}%`,
                top: `${enemy.y}%`,
                position: 'absolute',
                fontSize: '2.5rem',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer'
              }}
              onPointerDown={() => tapEnemy(enemy.id)}
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
          <Link href="/guide" className={styles.returnBtn}>
            マップに戻る
          </Link>
        </div>
      )}
    </div>
  );
}
