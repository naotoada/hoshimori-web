import styles from './page.module.css';
import DiagnosisForm from '@/components/DiagnosisForm';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>⭐</span>
              <span className={styles.logoMain}>星守り</span>
              <span className={styles.logoSub}>- HOSHIMORI -</span>
            </div>
            <nav className={styles.headerNav}>
              <Link href="/zukan" className={styles.navLink}>図鑑をみる</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>生年月日でわかる、お子様の心のカタチ</span>
          <h1 className={styles.heroTitle}>
            君の心には、<br className={styles.spOnly}/>どの星が宿っている？
          </h1>
          <p className={styles.heroText}>
            星守り（ほしもり）は、<br className={styles.spOnly}/>子どもたちの心に寄り添う不思議な存在。<br/>
            一人ひとり違う「星」を知ることで、<br className={styles.spOnly}/>子育てはもっと楽しく、やさしくなります。
          </p>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className={styles.diagnosisSection} id="diagnosis">
        <div className={styles.container}>
          <div className={styles.diagnosisBox}>
            <h2 className={styles.diagnosisTitle}>星守りを見つけよう 🔍</h2>
            <p className={styles.diagnosisLead}>
              生年月日を入力して、お子様の心に宿る「星守り」を調べてみましょう。
            </p>
            <DiagnosisForm />
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className={styles.conceptSection}>
        <div className={styles.container}>
          <div className={styles.conceptGrid}>
            <div className={styles.conceptImage}>
              {/* Placeholder for a warm, cute illustration */}
              <div className={styles.conceptImagePlaceholder}>
                🌟
              </div>
            </div>
            <div className={styles.conceptText}>
              <h2>「努力不足」ではなく、<br/>「環境との不一致」でした。</h2>
              <p>
                「何度言っても片付けない」「すぐ癇癪を起こす」…<br/>
                子育てで悩んだとき、つい自分の育て方を責めてしまいませんか？
              </p>
              <p>
                でも、すべての子どもは全く異なる「心の構造（星守り）」を持って生まれてきます。<br/>
                活発に動きたい『火の星』に「じっとしなさい」と言い続けるのは、魚に木登りをさせるようなもの。
              </p>
              <p>
                星守りを通じて、お子様の本当の才能が伸びる「環境」を見つけてあげませんか。<br/>
                私たちは、<strong>壊れる前に子どもを守る</strong>ための地図をお渡しします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zukan Section */}
      <section className={styles.zukanSection}>
        <div className={styles.container}>
          <div className={styles.zukanCard}>
            <div className={styles.zukanContent}>
              <h2>📚 全90体の星守り図鑑</h2>
              <p>
                水、木、火、土、金。<br/>
                自然界のエレメントから生まれた、90種類の星守りたち。<br/>
                お子様やご家族の星を探してみてください。
              </p>
              <Link href="/zukan" className={styles.zukanBtn}>
                図鑑をひらく
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Service Section */}
      <section className={styles.premiumSection}>
        <div className={styles.container}>
          <div className={styles.premiumBox}>
            <span className={styles.premiumBadge}>Premium</span>
            <h2>星守りカルテ（完全版）</h2>
            <p className={styles.premiumLead}>
              無料診断ではお伝えしきれない「親子の相性」や「NGワード」、<br/>
              そして才能が爆発する環境づくりを100ページ超のカルテにまとめました。
            </p>
            <div className={styles.premiumPrice}>¥33,000 <span>(税込 / 物理バインダー納品)</span></div>
            <a href="https://lin.ee/ekkOkmP" target="_blank" rel="noopener noreferrer" className={styles.lineBtn}>
              公式LINEから詳細を見る
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerLogo}>⭐ 星守り - HOSHIMORI -</div>
          <p className={styles.footerPowered}>Powered by 九星構造学(KSS)</p>
          <p className={styles.copy}>© 2026 あだちなおと. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
