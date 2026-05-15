'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import styles from './page.module.css';

const GUIDE_PASSWORD = 'hoshinohimitsu';

const LEVEL_DATA = [
  {
    level: 1,
    name: '⛲️泉の季節',
    subtitle: '心の土台・安心基地',
    question: 'お子さんは、お家の中やパパ・ママのそばで「安心」して過ごせていますか？',
    advice: 'もし「いいえ」なら、今は他のルールや教育を急がず、まずは抱っこやスキンシップで「安心の泉」を満たすことに全力を注ぎましょう。',
    praise: 'パパやママのそばで、安心して過ごせているね！とってもえらい！',
  },
  {
    level: 2,
    name: '⛰️大地の季節',
    subtitle: 'からだの土台・生活リズム',
    question: '食事・睡眠・運動など、毎日の生活リズムは安定して繰り返せていますか？',
    advice: '生活の土台が揺らぐと、心も揺らぎます。まずは決まった時間に寝て、起きる。「大地」をしっかり踏み固めましょう。',
    praise: '毎日しっかり寝て、ごはんも食べて、からだが元気に育っているね！',
  },
  {
    level: 3,
    name: '⚡️雷の季節',
    subtitle: '心の芽生え・自己主張',
    question: '「イヤ！」「自分でやる！」といったワガママや自己主張を、しっかり外に出せていますか？',
    advice: '反抗は、順調に心が育っている証拠です。雷のようにまっすぐで力強い自己主張を受け止めることで、本当の個性が芽生えます。',
    praise: '自分の気持ちを「イヤ！」ってちゃんと言えてすごい！心が大きくなっている証拠だよ！',
  },
  {
    level: 4,
    name: '🍃風の季節',
    subtitle: 'まわりとの調和・思いやり',
    question: 'お友達に優しくできたり、相手の気持ちを少しずつ想像できるようになってきましたか？',
    advice: '雷の季節で自己主張がしっかりできて初めて、他者への「思いやり（風の優しさ）」が育ちます。まずは大人が共感する姿をたくさん見せてあげましょう。',
    praise: 'お友達に優しくできたり、順番を守れたりしてすごいね！思いやりの心が育っているよ！',
  },
  {
    level: 5,
    name: '☀️天の季節',
    subtitle: '自分だけの輝き・探究心',
    question: '誰に言われなくても、時間を忘れて夢中になっている「好きなこと」がありますか？',
    advice: 'ここまできたら、もう大丈夫。親の役割は「教える」ことから「見守る」ことへ変わります。お子さんだけの星を輝かせましょう！',
    praise: '大好きなことに夢中になっている姿、とってもかっこいいよ！キミだけの星が輝いているね！',
  }
];

export default function GuideMap() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('guide_auth') === 'true') {
        setIsAuthenticated(true);
      }
      const lvl = sessionStorage.getItem('guide_level');
      if (lvl) {
        setCurrentLevel(parseInt(lvl, 10));
      }
      if (sessionStorage.getItem('guide_unlocked') === 'true') {
        setShowGame(true);
      }
      setIsLoaded(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === GUIDE_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('guide_auth', 'true');
    } else {
      alert('パスワードが違います。レポートに記載された合言葉を入力してください。');
    }
  };

  const handlePlayGame = () => {
    router.push('/guide/game');
  };

  if (!isLoaded) return null;

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <Head>
          <title>星守りの導き | ログイン</title>
        </Head>
        
        <div className={styles.loginCard}>
          <h1 className={styles.title}>星守りの導き</h1>
          <p className={styles.subtitle}>
            お子さまの成長を導く星のマップへようこそ。<br />
            合言葉を入力して、扉を開いてください。
          </p>
          
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="合言葉を入力"
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              扉を開く
            </button>
          </form>
        </div>
      </div>
    );
  }

  const levelInfo = LEVEL_DATA[currentLevel - 1];

  return (
    <div className={styles.container}>
      <Head>
        <title>星守りの導き | 星座マップ</title>
      </Head>
      
      <div className={styles.mapCard}>
        <div className={styles.levelProgress}>
          {LEVEL_DATA.map((l) => (
            <div 
              key={l.level} 
              className={`${styles.levelDot} ${currentLevel >= l.level ? styles.activeDot : ''} ${currentLevel === l.level ? styles.currentDot : ''}`}
            >
              {l.level}
            </div>
          ))}
        </div>

        {currentLevel === 0 ? (
          <div className={styles.introBox} style={{ marginTop: '1rem' }}>
            <h2 className={styles.levelName}>💫星守りの導きへようこそ</h2>
            <div className={styles.adviceText} style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                この「星座マップ」は、星の成長プロセスに基づき、お子さんの「心の土台（泉）」から「自立（天）」までを順番に育むためのサポートツールです。
              </p>
              <p style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: '#FBBF24' }}>
                【使い方】
              </p>
              <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}>質問を見て、お子さんの日々の様子を振り返ります。</li>
                <li style={{ marginBottom: '0.5rem' }}>「できている」と感じたら、扉を開いてください。</li>
                <li>扉の向こうでは星守りたちが待っています。スマホをお子さんに渡し、一緒に「星集めミニゲーム」で遊んでたくさん褒めてあげましょう！</li>
              </ol>
            </div>
            <button className={styles.button} onClick={() => {
              setCurrentLevel(1);
              sessionStorage.setItem('guide_level', '1');
            }}>
              マップを始める（STEP 1へ）
            </button>
          </div>
        ) : (
          <>
            <h2 className={styles.levelName}>
              STEP {levelInfo?.level}：{levelInfo?.name}
              <span className={styles.levelSubtitle}>({levelInfo?.subtitle})</span>
            </h2>

            {!showGame && (
              <div className={styles.questionBox}>
                <p className={styles.questionText}>{levelInfo?.question}</p>
                <p className={styles.adviceText}>{levelInfo?.advice}</p>
              </div>
            )}

        {!showGame ? (
          <div className={styles.doorContainer}>
            <div 
              className={styles.doorIcon}
              onClick={() => {
                setShowGame(true);
                sessionStorage.setItem('guide_unlocked', 'true');
              }}
            >
              🚪
            </div>
            <button className={styles.button} onClick={() => {
              setShowGame(true);
              sessionStorage.setItem('guide_unlocked', 'true');
            }}>
              はい、できています<br />（🗝️扉をひらく）
            </button>
          </div>
        ) : (
          <div className={styles.unlockedArea}>
            <div className={styles.unlockedMessage}>
              ✨ 星の扉が開きました！ ✨<br/>
              <span style={{ fontSize: '1.2rem', display: 'inline-block', marginTop: '1rem', fontWeight: 'bold', color: '#FFFDF9', lineHeight: '1.5' }}>
                {levelInfo?.praise}
              </span>
            </div>
            {currentLevel < 5 && (
              <button className={styles.nextLevelButton} onClick={() => {
                const nextLvl = currentLevel + 1;
                setCurrentLevel(nextLvl);
                setShowGame(false);
                sessionStorage.setItem('guide_level', nextLvl.toString());
                sessionStorage.setItem('guide_unlocked', 'false');
              }}>
                次のステップへ進む
              </button>
            )}
            <button className={styles.gameButton} onClick={handlePlayGame} style={{ marginTop: '0.5rem' }}>
              🎮 星守りミニゲームで遊ぶ
            </button>
            {currentLevel === 5 && (
              <div className={styles.adviceText} style={{ border: 'none', textAlign: 'center' }}>
                すべてのステップをクリアしました！<br />これからもお子さんの輝きを見守ってください。
              </div>
            )}
          </div>
        )}

        {currentLevel > 1 && (
          <div className={styles.prevButtonContainer}>
            <button 
              className={styles.prevLevelButton} 
              onClick={() => {
                const prevLvl = currentLevel - 1;
                setCurrentLevel(prevLvl);
                setShowGame(false);
                sessionStorage.setItem('guide_level', prevLvl.toString());
                sessionStorage.setItem('guide_unlocked', 'false');
              }}
            >
              ◀ 前のステップ（{currentLevel - 1}）に戻る
            </button>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
}
