import styles from '../product-detail.module.css';
import Reviews from '@/components/Reviews';
import Link from 'next/link';

export const metadata = {
  title: '星守りセルフレポート｜自分自身の「取扱説明書」｜星守り公式',
  description: 'あなたの構造タイプを深掘りし、強みの活かし方・人間関係の処方箋・今年のナビゲーションをまとめたパーソナルレポート。18歳以上・2,900円（税込）。',
};

export default function SelfReportPage() {
  return (
    <main className={styles.main}>

      {/* Hero */}
      <section className={styles.hero} style={{
        background: 'linear-gradient(135deg, #4a0a7a, #7B20CC)',
      }}>
        <span className={styles.heroBadge} style={{
          background: 'linear-gradient(135deg, #FFB347, #D97706)',
          color: '#FFF',
          boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
        }}>🌟 星守りレポート</span>
        <h1 className={styles.heroTitle}>
          自分自身の<br/>「取扱説明書」
        </h1>
        <p className={styles.heroLead}>
          あなたの構造タイプを深掘りし、<br className={styles.spOnly}/>
          <strong>強みの活かし方</strong>・<strong>人間関係の処方箋</strong>・<br className={styles.spOnly}/>
          <strong>今年のナビゲーション</strong>をまとめた<br/>
          パーソナルレポートです。
        </p>
        <div className={styles.heroPrice} style={{ color: '#FFB800' }}>
          ¥2,900 <span>(税込)</span>
        </div>
        <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.lineBtn} id="self-report-hero-cta">
          公式LINEから申し込む
        </a>
      </section>

      {/* Pain Points */}
      <section className={styles.painSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>こんなお悩み、ありませんか？</h2>
          <div className={styles.painList}>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>🤔</span>
              <p className={styles.painText}>自分の強みがわからない。何が向いているのか知りたい</p>
            </div>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>😤</span>
              <p className={styles.painText}>なぜかいつも人間関係で同じパターンにハマってしまう</p>
            </div>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>😩</span>
              <p className={styles.painText}>頑張っているのに報われない。疲れてしまった</p>
            </div>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>🔮</span>
              <p className={styles.painText}>今年がどんな年になるか、自分に合ったペースが知りたい</p>
            </div>
          </div>
          <p className={styles.painClose}>
            セルフレポートは、あなたの<strong>心の構造</strong>を<br className={styles.spOnly}/>
            「星・器・型」の3層から解き明かし、<br/>
            <strong>あなただけの取扱説明書</strong>をお届けします。
          </p>
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>このレポートでわかること</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>🔍</div>
              <h3>構造タイプ解析</h3>
              <p>星・器・型の3層構造から、あなたの思考・感情・行動パターンを立体的に分析します。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>💎</div>
              <h3>才能の棚卸し</h3>
              <p>あなたが最も輝く環境・活動・役割を構造的に特定します。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>🤝</div>
              <h3>人間関係マップ</h3>
              <p>パートナー・上司・部下との摩擦ポイントと対処法をお伝えします。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>📅</div>
              <h3>今年のナビゲーション</h3>
              <p>好調月・注意月の年間カレンダーと転機のタイミングをお届けします。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>✨</div>
              <h3>星を輝かせる魔法</h3>
              <p>あなたの星が喜ぶ「まもりの色」と空間づくり、毎日の小さな習慣をご提案。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>💌</div>
              <h3>星守りからの手紙</h3>
              <p>「苦手は才能の裏返し」——安心と希望のメッセージ、未来への招待状。</p>
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
              <div className={styles.flowStepNumber} style={{ background: 'linear-gradient(135deg, #7B20CC, #4a0a7a)' }}>1</div>
              <h3>公式LINEからお申込み</h3>
              <p>生年月日をお送りください。お支払いは銀行振込です。</p>
              <span className={styles.flowArrow}>→</span>
            </div>
            <div className={styles.flowStep}>
              <div className={styles.flowStepNumber} style={{ background: 'linear-gradient(135deg, #7B20CC, #4a0a7a)' }}>2</div>
              <h3>レポート作成</h3>
              <p>あなたの星の構造を多角的に解析し、パーソナルレポートを作成します。</p>
              <span className={styles.flowArrow}>→</span>
            </div>
            <div className={styles.flowStep}>
              <div className={styles.flowStepNumber} style={{ background: 'linear-gradient(135deg, #7B20CC, #4a0a7a)' }}>3</div>
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
            <span className={styles.sampleLabel}>✨ 第1章より抜粋イメージ</span>
            <div className={styles.sampleContent}>
              <h3>🌟 あなたの星守りの物語</h3>
              <p>
                ○○さんの心の奥底には、穏やかでありながらとても芯の強いエネルギーが宿っています。
              </p>
              <p>
                まるで深い湖のように、表面はいつも静かで落ち着いている。
              </p>
              <p>
                でもその水面の下には、驚くほど豊かな世界が広がっています。
              </p>
              <p>
                それが○○さんの「心の芯」——あなたを根っこから突き動かしているエネルギーの正体です。
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
              <summary>無料診断とは何が違いますか？</summary>
              <p className={styles.faqAnswer}>
                無料診断では星守りタイプと基本的な特徴（約500字）をお伝えしています。
                セルフレポートでは全6章・10,000字超の詳細な分析をお届けします。
                才能の活かし方、人間関係の処方箋、今年のナビゲーションなど、すぐに実践できる内容です。
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>必要な情報は何ですか？</summary>
              <p className={styles.faqAnswer}>
                ご本人の生年月日のみです。住所や間取りなどの情報は不要です。
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>どのように届きますか？</summary>
              <p className={styles.faqAnswer}>
                公式LINEを通じて、ドキュメントリンクでお届けします。
                スマートフォンでもパソコンでもすぐにお読みいただけます。
                通常1〜3営業日でお届けいたします。
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>子供のレポートも欲しいのですが</summary>
              <p className={styles.faqAnswer}>
                0〜17歳のお子様向けには「星守りレポート（子供向け）」をご用意しています。
                保護者の方が実践できる関わり方に特化した内容です。
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>自分の星を知る。<br className={styles.spOnly}/>それが、一番の味方になる。</h2>
          <div className={styles.ctaMeta}>
            <span>📄 全6章・9,000〜14,000字</span>
            <span>📱 LINEからドキュメントで納品</span>
            <span>🎯 対象: 18歳以上</span>
          </div>
          <div className={styles.ctaPrice} style={{ color: '#7B20CC' }}>¥2,900 <span>(税込)</span></div>
          <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.lineBtn} id="self-report-bottom-cta">
            公式LINEから申し込む
          </a>
        </div>
      </section>

      <Link href="/" className={styles.backLink}>← 星守り公式サイトに戻る</Link>
    </main>
  );
}
