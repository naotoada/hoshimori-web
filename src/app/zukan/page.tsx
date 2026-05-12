import Link from 'next/link';
import { getAllHoshimori } from '@/lib/markdownParser';
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

  // 一白水星〜九紫火星の順番を保証するため
  const honmeiOrder = [
    '一白水星', '二黒土星', '三碧木星', '四緑木星', '五黄土星', 
    '六白金星', '七赤金星', '八白土星', '九紫火星'
  ];

  return (
    <main className="container">
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>← ホームへ</Link>
        <h1 className={styles.title}>星守り図鑑</h1>
        <p className={styles.subtitle}>全90体の星守りデータ</p>
      </div>

      <div className={styles.zukanContainer}>
        {honmeiOrder.map(honmeiName => {
          const chars = grouped[honmeiName];
          if (!chars || chars.length === 0) return null;
          
          return (
            <section key={honmeiName} className={styles.honmeiSection}>
              <h2 className={styles.honmeiTitle}>{honmeiName}（{chars.length}体）</h2>
              <div className={styles.grid}>
                {chars.map(char => (
                  <Link href={`/hoshimori/${char.id}`} key={char.id} className={styles.charCard}>
                    <div className={styles.charIcon}>⭐</div>
                    <div className={styles.charInfo}>
                      <div className={styles.charName}>{char.name}</div>
                      <div className={styles.charId}>{char.id}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
