import styles from '../product-detail.module.css';
import Reviews from '@/components/Reviews';
import Link from 'next/link';

export const metadata = {
  title: '星守りレポート（子供向け）｜この子だけの「取扱説明書」｜星守り公式',
  description: '90タイプの星守り構造を深掘りし、保護者が明日から実践できる関わり方をまとめた子供向けパーソナルレポート。0〜17歳・3,900円（税込）。',
};

export default function ReportPage() {
  return (
    <main className={styles.main}>

      {/* Hero */}
      <section className={styles.hero} style={{
        background: 'linear-gradient(135deg, #0a3e7a, #1b69cc, #2080e8)',
      }}>
        <span className={styles.heroBadge} style={{
          background: 'linear-gradient(135deg, #FFB347, #D97706)',
          color: '#FFF',
          boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
        }}>📝 子どものための星守り</span>
        <h1 className={styles.heroTitle}>
          この子だけの<br/>「取扱説明書」
        </h1>
        <p className={styles.heroLead}>
          生年月日から導き出される<br className={styles.spOnly}/>90タイプの星守り構造を深掘りし、<br/>
          保護者が<strong>明日から実践できる</strong><br className={styles.spOnly}/>
          関わり方をまとめたパーソナルレポートです。
        </p>
        <div className={styles.heroPrice} style={{ color: '#FFB800' }}>
          ¥3,900 <span>(税込)</span>
        </div>
        <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.lineBtn} id="report-hero-cta">
          公式LINEから申し込む
        </a>
      </section>

      {/* Pain Points */}
      <section className={styles.painSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>こんなお悩み、ありませんか？</h2>
          <div className={styles.painList}>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>😓</span>
              <p className={styles.painText}>何度言っても伝わらない。この子に合った声のかけ方がわからない</p>
            </div>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>😢</span>
              <p className={styles.painText}>つい怒ってしまう。育て方を間違えたのではないかと不安になる</p>
            </div>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>🤷</span>
              <p className={styles.painText}>この子の才能や強みが何なのか知りたい。伸ばしてあげたい</p>
            </div>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>📚</span>
              <p className={styles.painText}>育児書を読んでも、うちの子には当てはまらない気がする</p>
            </div>
          </div>
          <p className={styles.painClose}>
            星守りレポートは、お子様の<strong>心の構造</strong>を<br className={styles.spOnly}/>
            構造的に解き明かし、<br/>
            <strong>この子だけの取扱説明書</strong>をお届けします。
          </p>
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>このレポートでわかること</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>🌟</div>
              <h3>星守りの物語</h3>
              <p>心の芯・世渡りの芽・走り出す方向——4つの視点からお子様の内面を物語として描きます。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>💎</div>
              <h3>才能の原石</h3>
              <p>生まれ持った3つの才能、エネルギータイプ、成長のリズムを構造的に解説します。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>🚨</div>
              <h3>隠れたSOS</h3>
              <p>「困った行動」の裏にある構造的な理由と、3段階のSOSサイン早期発見ガイド。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>📖</div>
              <h3>取扱説明書</h3>
              <p>褒め方・叱り方・やる気スイッチ・禁句集・トラブル時の「親のセリフ集」。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>📅</div>
              <h3>今年のナビゲーション</h3>
              <p>お子様の今年の成長カレンダー（好調月・注意月）と年間テーマをお届け。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>✨</div>
              <h3>星守りの魔法レシピ</h3>
              <p>星が喜ぶ「まもりの色」と空間づくり、親子で楽しめる毎日の小さな習慣。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className={styles.flowSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>お届けまでの流れ</h2>
          <div className={styles.flowSteps}>
            <div className={styles.flowStep}>
              <div className={styles.flowStepNumber} style={{ background: 'linear-gradient(135deg, #1b69cc, #0a3e7a)' }}>1</div>
              <h3>公式LINEからお申込み</h3>
              <p>お子様の生年月日をお送りください。お支払いは銀行振込です。</p>
              <span className={styles.flowArrow}>→</span>
            </div>
            <div className={styles.flowStep}>
              <div className={styles.flowStepNumber} style={{ background: 'linear-gradient(135deg, #1b69cc, #0a3e7a)' }}>2</div>
              <h3>レポート作成</h3>
              <p>お子様の星の構造を多角的に解析し、パーソナルレポートを作成します。</p>
              <span className={styles.flowArrow}>→</span>
            </div>
            <div className={styles.flowStep}>
              <div className={styles.flowStepNumber} style={{ background: 'linear-gradient(135deg, #1b69cc, #0a3e7a)' }}>3</div>
              <h3>レポートをお届け</h3>
              <p>通常1〜3営業日で、LINEからドキュメントリンクでお届けします。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Preview */}
      <section className={styles.sampleSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>レポートのイメージ</h2>
          <div className={styles.sampleBox}>
            <span className={styles.sampleLabel}>📖 第4章より抜粋イメージ</span>
            <div className={styles.sampleContent}>
              <h3>🗣️ この子だけの「親のセリフ集」</h3>
              <p>
                朝の準備が進まない時——「早くしなさい！」の代わりに、こんな声かけを試してみてください。
              </p>
              <p>
                「あと○分で出発だよ。時計の針が○になったら靴を履こうね」
              </p>
              <p>
                ○○ちゃんは、抽象的な指示よりも具体的なゴールを見せてあげた方が、自分から動き出せる構造を持っています。
              </p>
            </div>
            <p className={styles.sampleNote}>※ 実際のレポートはお一人おひとりに合わせた完全オリジナルです</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className={styles.reviewsSection}>
        <Reviews category="HOSHIMORI" />
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>❓ よくあるご質問</h2>
          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary>何歳から何歳まで対象ですか？</summary>
              <p className={styles.faqAnswer}>
                0歳〜17歳のお子様が対象です。
                18歳以上の方にはセルフレポート（大人向け）をおすすめしています。
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>必要な情報は何ですか？</summary>
              <p className={styles.faqAnswer}>
                お子様の生年月日のみです。住所や間取りなどの情報は不要です。
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>兄弟姉妹の分も一緒に注文できますか？</summary>
              <p className={styles.faqAnswer}>
                はい、お一人ずつ個別にお申し込みいただけます。
                それぞれの構造に合わせた完全オリジナルのレポートをお届けします。
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>大人向けのレポートもありますか？</summary>
              <p className={styles.faqAnswer}>
                はい、18歳以上の方には「星守りセルフレポート」をご用意しています。
                ご自身の強み・人間関係・今年のナビゲーションなど、大人の生活シーンに合わせた内容です。
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>この子の「困った」は、<br className={styles.spOnly}/>才能の裏返しかもしれません。</h2>
          <div className={styles.ctaMeta}>
            <span>📄 全7章・11,000〜17,000字</span>
            <span>📱 LINEからドキュメントで納品</span>
            <span>🎂 対象: 0〜17歳</span>
          </div>
          <div className={styles.ctaPrice} style={{ color: '#1b69cc' }}>¥3,900 <span>(税込)</span></div>
          <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.lineBtn} id="report-bottom-cta">
            公式LINEから申し込む
          </a>
        </div>
      </section>

      <Link href="/" className={styles.backLink}>← 星守り公式サイトに戻る</Link>
    </main>
  );
}
