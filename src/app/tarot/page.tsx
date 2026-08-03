import styles from '../product-detail.module.css';
import Reviews from '@/components/Reviews';
import Link from 'next/link';

export const metadata = {
  title: '星守りタロット 星の導きレター｜星守り公式',
  description: '心の構造 × 10枚の星のメッセージで、今のお悩みに深く寄り添うパーソナルレター。年齢不問・6,900円（税込）。',
};

export default function TarotPage() {
  return (
    <main className={styles.main}>

      {/* Hero */}
      <section className={styles.hero} style={{
        background: 'linear-gradient(135deg, #1a0a3e 0%, #2d1b69 40%, #4a2080 100%)',
      }}>
        <span className={styles.heroBadge} style={{
          background: 'linear-gradient(135deg, #FFD700, #FFA500)',
          color: '#1a0a3e',
          boxShadow: '0 4px 16px rgba(255, 215, 0, 0.35)',
        }}>🌟 星守りタロット</span>
        <h1 className={styles.heroTitle}>
          今のお悩みに、<br className={styles.spOnly}/>星が答える<br/>「導きレター」
        </h1>
        <p className={styles.heroLead}>
          あなたの<strong>心の構造</strong>と、<br className={styles.spOnly}/>
          星守り研究所の専属リーダーが受け取った<br className={styles.spOnly}/>
          <strong>10枚の星のメッセージ</strong>を掛け合わせ、<br/>
          今のお悩みに深く寄り添うパーソナルレターをお届けします。
        </p>
        <div className={styles.heroPrice} style={{ color: '#FFD700', textShadow: '0 2px 20px rgba(255,215,0,0.3)' }}>
          ¥6,900 <span>(税込)</span>
        </div>
        <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.lineBtn} id="tarot-hero-cta">
          公式LINEから申し込む
        </a>
      </section>

      {/* Pain Points */}
      <section className={styles.painSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>こんなお悩み、ありませんか？</h2>
          <div className={styles.painList}>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>💭</span>
              <p className={styles.painText}>ずっと頭から離れない悩みがある。でも誰に相談すればいいかわからない</p>
            </div>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>🔄</span>
              <p className={styles.painText}>同じパターンを繰り返している気がする。なぜかいつも同じ壁にぶつかる</p>
            </div>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>🌙</span>
              <p className={styles.painText}>頑張っているのに前に進めない。動き出すタイミングがわからない</p>
            </div>
            <div className={styles.painItem}>
              <span className={styles.painIcon}>🪞</span>
              <p className={styles.painText}>自分のことなのに、自分の本当の気持ちがわからなくなっている</p>
            </div>
          </div>
          <p className={styles.painClose}>
            星の導きレターは、あなたの<strong>心の構造</strong>と<br className={styles.spOnly}/>
            <strong>星のメッセージ</strong>を掛け合わせて、<br/>
            今の問いに寄り添う「あなただけの手紙」です。
          </p>
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>このレターでわかること</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>🧭</div>
              <h3>心の設計図と今の星回り</h3>
              <p>「なぜ今この悩みが生まれたか」を、あなたの星の構造と今の星回りから多角的に解き明かします。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>💫</div>
              <h3>10枚の星のメッセージ</h3>
              <p>星守り研究所の専属リーダーの感性を通じて受け取られた、あなただけのメッセージを丁寧に解読します。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>🔮</div>
              <h3>構造 × メッセージの統合</h3>
              <p>星の構造と星のメッセージが重なるポイントから、お悩みの核心に迫る統合メッセージをお届けします。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>🏠</div>
              <h3>やさしい魔法のレシピ</h3>
              <p>お部屋の整え方、心の余白のつくり方、行動タイミングまで——今日からできる具体的なアクション。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>⏰</div>
              <h3>星回りを活かしたタイミング</h3>
              <p>動き出すのに適した時期、ゆっくりする月を具体的にお伝え。闇雲な行動から卒業できます。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>💌</div>
              <h3>星守りからの手紙</h3>
              <p>レターの締めくくりに、あなたの今の現在地を肯定し、温かく背中を押すメッセージを贈ります。</p>
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
              <p>生年月日と今のお悩みをお送りください。お支払いはカード決済です。</p>
              <span className={styles.flowArrow}>→</span>
            </div>
            <div className={styles.flowStep}>
              <div className={styles.flowStepNumber} style={{ background: 'linear-gradient(135deg, #7B20CC, #4a0a7a)' }}>2</div>
              <h3>星のメッセージを受け取り</h3>
              <p>星守り研究所の専属リーダーが、あなたのための10枚の星のメッセージを受け取ります。</p>
              <span className={styles.flowArrow}>→</span>
            </div>
            <div className={styles.flowStep}>
              <div className={styles.flowStepNumber} style={{ background: 'linear-gradient(135deg, #7B20CC, #4a0a7a)' }}>3</div>
              <h3>レターをお届け</h3>
              <p>通常1〜3営業日で、LINEからドキュメントリンクでお届けします。7日間のQAサポート付き。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Preview */}
      <section className={styles.sampleSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>レターのイメージ</h2>
          <div className={styles.sampleBox}>
            <span className={styles.sampleLabel}>💫 第2章より抜粋イメージ</span>
            <div className={styles.sampleContent}>
              <h3>🌈 これから広がる可能性</h3>
              <p>
                ○○さんの頭上には、ふんわりと優しい光が広がっています。
              </p>
              <p>
                それは「完璧な答え」ではなく、「まずはやってみよう」という軽やかな一歩を後押しするような光です。
              </p>
              <p>
                少し先に見えている景色は、今の○○さんが想像するよりもずっと柔らかいものかもしれません。
              </p>
              <p>
                星の構造が示すのは、この時期の○○さんには「正しさ」よりも「心地よさ」を選ぶ力が備わっているということ。
              </p>
            </div>
            <p className={styles.sampleNote}>※ 実際のレターはお一人おひとりに合わせた完全オリジナルです</p>
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
              <summary>星守りレポートとの違いは何ですか？</summary>
              <p className={styles.faqAnswer}>
                星守りレポートは「あなたの構造タイプの全体像」をお伝えするものです。
                一方、星の導きレターは「今のお悩み」に焦点を当て、心の構造と10枚の星のメッセージを掛け合わせてお答えする、お悩み特化のパーソナルレターです。
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>「星のメッセージ」とは何ですか？</summary>
              <p className={styles.faqAnswer}>
                星守り研究所の専属リーダーが、あなたのお悩みに向き合いながら感じ取った10枚のメッセージです。
                未来を予言するものではなく、心の奥底を映し出す「鏡」のような存在です。
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>何歳でも申し込めますか？</summary>
              <p className={styles.faqAnswer}>
                はい、年齢不問です。大人の方はもちろん、お子様のお悩みについて保護者の方がお申込みいただくことも可能です。
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>届いた後に質問できますか？</summary>
              <p className={styles.faqAnswer}>
                はい、お届けから7日間・最大2回まで、レターの内容についてのご質問を公式LINEからお受けしています。
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>あなたの星が、<br className={styles.spOnly}/>今伝えたいことがあります。</h2>
          <div className={styles.ctaMeta}>
            <span>📄 全3章・10,000〜16,000字</span>
            <span>📱 LINEからドキュメントで納品</span>
            <span>🎯 年齢不問</span>
            <span>💬 7日間QAサポート</span>
          </div>
          <div className={styles.ctaPrice} style={{ color: '#7B20CC' }}>¥6,900 <span>(税込)</span></div>
          <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.lineBtn} id="tarot-bottom-cta">
            公式LINEから申し込む
          </a>
        </div>
      </section>

      <Link href="/" className={styles.backLink}>← 星守り公式サイトに戻る</Link>
    </main>
  );
}
