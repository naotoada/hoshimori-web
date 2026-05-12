import Image from 'next/image';
import styles from './page.module.css';
import DiagnosisForm from '@/components/DiagnosisForm';

export default function Home() {
  return (
    <main className="container">
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.starIcon}>⭐</span>
          <h1>星守り</h1>
        </div>
        <button className={styles.profileBtn}>
          <span className={styles.profileIcon}>👤</span>
        </button>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <p className={styles.subtitle}>Hoshimori で、お子様の<br/>「本当の個性」と「未来」を守り、育む。</p>
        <h2 className={styles.title}>親子で笑顔になれる、<br/>やさしいAI診断と<br/>専門家サポート。</h2>
        
        <DiagnosisForm />

        <div className={styles.heroIllustration}>
          {/* Placeholder for illustration */}
          <div className={styles.starPath}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={`${styles.featureCard} ${styles.blueCard}`}>
          <div className={styles.featureIcon}>1. AI診断</div>
          <p>AIを活用した<br/>性格・発達傾向の分析</p>
        </div>
        
        <div className={`${styles.featureCard} ${styles.greenCard}`}>
          <div className={styles.featureIcon}>2. 専門家相談</div>
          <p>臨床心理士による<br/>安心のカウンセリング</p>
        </div>

        <div className={`${styles.featureCard} ${styles.redCard}`}>
          <div className={styles.featureIcon}>3. 学習サポート</div>
          <p>個性に合わせた<br/>教育プログラム</p>
        </div>
      </section>

      {/* Zukan Teaser */}
      <section className={styles.zukanTeaser}>
        <h3>📚 全90体の星守り図鑑</h3>
        <p>1〜9の星から、お子様の才能と環境の相性を紐解きます。</p>
        <a href="/zukan" className={styles.zukanButton}>星守り図鑑を見る</a>
      </section>

      {/* Theory Section */}
      <section className={styles.theory}>
        <h3>💡 魚に木登りをさせない教育</h3>
        <p>「九星教育論」に基づくHoshimoriは、子供を変えるのではなく**環境を合わせる**アプローチです。心理OSの土台（安心基地）から構築することで、自発的な成長を促します。</p>
      </section>

      {/* Service CTA */}
      <section className={styles.serviceCta}>
        <h3>✨ さらに深く知る（CHILD_FULL）</h3>
        <p>無料診断ではお伝えしきれない「親子の相性」や「NGワード（禁句）」など、お子様専用の本格的な構造設計図（冊子＋グッズ）をお届けします。</p>
        <a href="#line" className={styles.lineButton}>公式LINEから申し込む</a>
      </section>

      {/* Footer Nav (Mock) */}
      <nav className={styles.bottomNav}>
        <a href="/">ホーム</a>
        <a href="/zukan">図鑑</a>
        <a href="#shop">ショップ</a>
        <a href="#line">公式LINE</a>
      </nav>
    </main>
  );
}
