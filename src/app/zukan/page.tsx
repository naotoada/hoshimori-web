import Link from 'next/link';
import { getAllHoshimori } from '@/lib/markdownParser';
import { getCharacterImageUrl } from '@/lib/characterMap';
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
    '天の星', '沢の星', '山の星', '火の星'
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
                    <div className={styles.charIcon}>
                      <img src={getCharacterImageUrl(char.id)} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
  );
}
