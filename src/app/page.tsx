import styles from './page.module.css';
import DiagnosisForm from '@/components/DiagnosisForm';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />

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

      {/* Report Service Section (Entry: ¥4,980) */}
      <section className={styles.reportSection} id="report">
        <div className={styles.container}>
          <div className={styles.reportBox}>
            <span className={styles.reportBadge}>📝 星守りレポート</span>
            <h2>この子だけの<br/>「取扱説明書」</h2>
            <p className={styles.reportLead}>
              生年月日から導き出される90タイプの星守り構造を深掘りし、<br className={styles.spOnly}/>
              保護者が<strong>明日から実践できる</strong>関わり方をまとめたパーソナルレポートです。
            </p>

            <div className={styles.reportFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🌟</span>
                <div>
                  <h4>星守りの物語</h4>
                  <p>心の芯・世渡りの芽・走り出す方向——4つの視点からお子様の内面を物語として描きます</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💎</span>
                <div>
                  <h4>才能の原石</h4>
                  <p>生まれ持った3つの才能、エネルギータイプ、成長のリズムを構造的に解説</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🚨</span>
                <div>
                  <h4>隠れたSOS</h4>
                  <p>「困った行動」の裏にある構造的な理由と、3段階のSOSサイン早期発見ガイド</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📖</span>
                <div>
                  <h4>取扱説明書</h4>
                  <p>褒め方・叱り方・やる気スイッチ・禁句集・日常トラブルの「親のセリフ集」</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📅</span>
                <div>
                  <h4>今年のナビゲーション</h4>
                  <p>お子様の今年の成長カレンダー（好調月・注意月）と年間テーマ</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💌</span>
                <div>
                  <h4>星守りからの手紙</h4>
                  <p>「この子の困ったは才能の裏返し」——保護者の心に届く安心のメッセージ</p>
                </div>
              </div>
            </div>

            <div className={styles.reportMeta}>
              <span>📄 全6章・10,000〜15,000字</span>
              <span>📱 公式LINEからドキュメントで納品</span>
              <span>🎂 対象: 0〜17歳</span>
              <span>📝 必要な情報: お子様の生年月日のみ</span>
            </div>

            <div className={styles.reportPrice}>¥4,980 <span>(税込)</span></div>

            <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.lineBtn} id="report-cta">
              公式LINEから申し込む
            </a>
          </div>
        </div>
      </section>

      {/* Premium Service Section (CHILD_FULL: ¥33,000) */}
      <section className={styles.premiumSection}>
        <div className={styles.container}>
          <div className={styles.premiumBox}>
            <span className={styles.premiumBadge}>Premium</span>
            <h2>星守りカルテ<br/>【完全版】</h2>
            <p className={styles.premiumLead}>
              星守りレポートでは伝えきれない「親子の構造的な相性」「お名前の力」「お部屋の環境診断」まで——<br/>
              お子様を取り巻く<strong>環境のすべて</strong>を構造的に解析した、100ページを超える人生の設計図。<br/>
              物理バインダーに製本してお届けする、世界にひとつだけの一冊です。
            </p>
            <div className={styles.premiumPrice}>¥33,000 <span>(税込)</span></div>
            <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.lineBtn}>
              公式LINEから詳細を見る
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection} id="faq">
        <div className={styles.container}>
          <h2 className={styles.faqTitle}>❓ よくあるご質問</h2>
          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>無料診断と星守りレポートは何が違いますか？</summary>
              <p className={styles.faqAnswer}>
                無料診断では、お子様の「星守りタイプ」と基本的な特徴（約500字）をお伝えしています。
                星守りレポートでは、90タイプごとに完全カスタマイズされた<strong>全6章・10,000字超</strong>の詳細な分析をお届けします。
                褒め方・叱り方の処方箋、やる気スイッチの場所、日常トラブルの「親のセリフ集」、今年の成長カレンダーなど、
                明日から実践できる具体的な内容が含まれています。
              </p>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>どのように届きますか？</summary>
              <p className={styles.faqAnswer}>
                公式LINEを通じて、<strong>ドキュメントリンク</strong>でお届けします。
                スマートフォンでもパソコンでもすぐにお読みいただけます。
                お申し込みからお届けまで、通常3〜5営業日ほどお時間をいただいております。
              </p>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>星守りレポートと星守りカルテ（完全版）の違いは？</summary>
              <p className={styles.faqAnswer}>
                星守りレポートは<strong>お子様の星守りタイプそのものの深掘り</strong>（才能・SOS・関わり方・今年の運勢）に特化した1冊です。
                星守りカルテ（完全版）は、それに加えて<strong>親子の構造的な相性診断</strong>、<strong>お名前に刻まれた力の分析</strong>、
                <strong>お部屋の環境診断と補正マニュアル</strong>まで、お子様を取り巻く環境すべてを網羅した100ページ超の物理製本レポートです。
              </p>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>何歳から何歳まで対象ですか？</summary>
              <p className={styles.faqAnswer}>
                <strong>0歳〜17歳</strong>のお子様が対象です。
                年齢区分（乳幼児期・未就学児・小学校低学年・高学年・中学生・高校生）に合わせて、
                レポートのトーンや具体例を自動で調整してお届けします。
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Goods Section */}
      <section className={styles.goodsSection} id="goods">
        <div className={styles.container}>
          <div className={styles.goodsBox}>
            <span className={styles.goodsBadge}>🛒 公式グッズ</span>
            <h2>星守りを、いつもそばに。</h2>
            <p className={styles.goodsLead}>
              通園バッグのお守りに、勉強机の見守り役に。<br/>
              お子様の星守りをアクリルキーホルダーやマグカップなど、<br className={styles.spOnly}/>
              日常のアイテムとしてお届けします。
            </p>
            <div className={styles.goodsItems}>
              <div className={styles.goodsItem}>
                <span className={styles.goodsItemIcon}>🔑</span>
                <span>アクリルキーホルダー</span>
              </div>
              <div className={styles.goodsItem}>
                <span className={styles.goodsItemIcon}>🏅</span>
                <span>缶バッジ</span>
              </div>
              <div className={styles.goodsItem}>
                <span className={styles.goodsItemIcon}>☕</span>
                <span>マグカップ</span>
              </div>
              <div className={styles.goodsItem}>
                <span className={styles.goodsItemIcon}>📱</span>
                <span>スマホケース</span>
              </div>
            </div>
            <a href="https://suzuri.jp/hoshimori-official" target="_blank" rel="noopener noreferrer" className={styles.goodsBtn}>
              公式ショップを見る
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
