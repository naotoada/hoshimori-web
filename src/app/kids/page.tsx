import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
  title: '星守りキッズ - 毎日の子育てに星の導きを',
  description: 'AIと星の導きが子育てをサポートするアプリ「星守りキッズ」の紹介ページです。',
};

export default function KidsAppPage() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/app/hoshimorhi_kizs_openning.webp"
            alt="星守りキッズ オープニング"
            fill
            className={styles.heroImage}
            priority
          />
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.appIconWrapper}>
            <Image
              src="/images/app/icon.webp"
              alt="星守りキッズ アプリアイコン"
              width={100}
              height={100}
              className={styles.appIcon}
            />
          </div>
          <h1 className={styles.title}>星守りキッズ</h1>
          <p className={styles.subtitle}>毎日が少しラクになる、我が子専用の育児ナビ</p>
          
          <div className={styles.storeButtons}>
            <a
              href="https://apps.apple.com/jp/app/%E6%98%9F%E5%AE%88%E3%82%8A%E3%82%AD%E3%83%83%E3%82%BA-%E5%AD%90%E3%81%A9%E3%82%82%E3%81%AE%E6%80%A7%E6%A0%BC%E8%A8%BA%E6%96%AD-%E8%A6%AA%E5%AD%90%E7%9B%B8%E6%80%A7-%E8%82%B2%E5%85%90%E8%A8%98%E9%8C%B2/id6785143561"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.storeButton}
            >
              <span className={styles.storeIcon}>🍎</span> App Storeでダウンロード
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.kss.hoshimori"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.storeButton}
            >
              <span className={styles.storeIcon}>🤖</span> Google Playで手に入れる
            </a>
          </div>
        </div>
      </section>

      {/* Feature Gallery Section */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.starIcon}>✨</span> アプリの主な機能
          </h2>
          <p className={styles.sectionLead}>
            「なんで言うことを聞いてくれないの…？」<br className={styles.spOnly} />
            そんな育児の悩みに、AIと星の導きが優しく答えます。
          </p>

          <div className={styles.gallery}>
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className={styles.galleryItem}>
                <Image
                  src={`/images/app/store_${num}.webp`}
                  alt={`機能紹介 ${num}`}
                  width={300}
                  height={650}
                  className={styles.screenshot}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className={styles.closingSection}>
        <div className={styles.container}>
          <h2 className={styles.closingTitle}>子育てに正解はないけれど、<br />心の余裕をもつヒントはあります。</h2>
          <p className={styles.closingText}>
            星守りといっしょに、<br className={styles.spOnly} />
            お子様の才能を伸ばす楽しい毎日を始めませんか？
          </p>
          <div className={styles.storeButtons} style={{ marginTop: '32px' }}>
            <a
              href="https://apps.apple.com/jp/app/%E6%98%9F%E5%AE%88%E3%82%8A%E3%82%AD%E3%83%83%E3%82%BA-%E5%AD%90%E3%81%A9%E3%82%82%E3%81%AE%E6%80%A7%E6%A0%BC%E8%A8%BA%E6%96%AD-%E8%A6%AA%E5%AD%90%E7%9B%B8%E6%80%A7-%E8%82%B2%E5%85%90%E8%A8%98%E9%8C%B2/id6785143561"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.storeButton}
            >
              <span className={styles.storeIcon}>🍎</span> App Storeでダウンロード
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.kss.hoshimori"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.storeButton}
            >
              <span className={styles.storeIcon}>🤖</span> Google Playで手に入れる
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
