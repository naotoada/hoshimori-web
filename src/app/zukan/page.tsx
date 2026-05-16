import Link from 'next/link';
import { getAllHoshimori } from '@/lib/markdownParser';
import { getCharacterImageUrl } from '@/lib/characterMap';
import JumpSelect from './JumpSelect';
import styles from './page.module.css';

export default function ZukanIndex() {
  const allHoshimori = getAllHoshimori();
  
  // 1〜9の本命星ごとにグループ化
  const grouped = allHoshimori.reduce((acc, curr) => {
    if (!acc[curr.honmeiName]) {
      acc[curr.honmeiName] = [];
    }
    acc[curr.honmeiName].push(curr);
    return acc;
  }, {} as Record<string, typeof allHoshimori>);

  // 一白水星〜九紫火星の順番を保証するため（星守り用語へ更新）
  const honmeiOrder = [
    '水の星', '大地の星', '雷の星', '風の星', '帝の星', 
    '天の星', '果実の星', '山の星', '火の星'
  ];

  const honmeiMeta: Record<string, { display: string, theme: string, bgTheme: string, borderTheme: string }> = {
    '水の星': { display: '💧 水の星', theme: styles.themeWater, bgTheme: styles.bgWater, borderTheme: styles.borderWater },
    '大地の星': { display: '🌍 大地の星', theme: styles.themeEarth, bgTheme: styles.bgEarth, borderTheme: styles.borderEarth },
    '雷の星': { display: '⚡️ 雷の星', theme: styles.themeThunder, bgTheme: styles.bgThunder, borderTheme: styles.borderThunder },
    '風の星': { display: '🍃 風の星', theme: styles.themeWind, bgTheme: styles.bgWind, borderTheme: styles.borderWind },
    '帝の星': { display: '👑 帝の星', theme: styles.themeEmperor, bgTheme: styles.bgEmperor, borderTheme: styles.borderEmperor },
    '天の星': { display: '🌌 天の星', theme: styles.themeHeaven, bgTheme: styles.bgHeaven, borderTheme: styles.borderHeaven },
    '果実の星': { display: '🍎 果実の星', theme: styles.themeMarsh, bgTheme: styles.bgMarsh, borderTheme: styles.borderMarsh },
    '山の星': { display: '🏔️ 山の星', theme: styles.themeMountain, bgTheme: styles.bgMountain, borderTheme: styles.borderMountain },
    '火の星': { display: '🔥 火の星', theme: styles.themeFire, bgTheme: styles.bgFire, borderTheme: styles.borderFire },
  };

  return (
    <>
    <main className="container">
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>← ホームへ</Link>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>星守り図鑑</h1>
          <JumpSelect />
        </div>
      </div>

      <div className={styles.zukanContainer}>
        {honmeiOrder.map(honmeiName => {
          const chars = grouped[honmeiName];
          if (!chars || chars.length === 0) return null;
          
          const meta = honmeiMeta[honmeiName];
          
          return (
            <section key={honmeiName} id={honmeiName} className={`${styles.honmeiSection} ${meta?.bgTheme || ''}`}>
              <h2 className={`${styles.honmeiTitle} ${meta?.theme || ''}`}>{meta?.display || honmeiName}</h2>
              <div className={styles.grid}>
                {chars.map(char => (
                  <Link href={`/hoshimori/${char.id}`} key={char.id} className={styles.charCard}>
                    <div className={`${styles.charIcon} ${meta?.borderTheme || ''}`}>
                      <img src={getCharacterImageUrl(char.id)} alt={char.name} />
                    </div>
                    <div className={styles.charInfo}>
                      <div className={styles.charName}>{char.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>

    <footer className={styles.footer}>
      <Link href="/" className={styles.backLink}>← トップページに戻る</Link>
      <p className={styles.copy}>© 2026 あだちなおと. All rights reserved.</p>
    </footer>
    </>
  );
}
