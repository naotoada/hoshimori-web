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
          <span className={styles.heroBadge}>生年月日でわかる、あなたの心のカタチ</span>
          <h1 className={styles.heroTitle}>
            あなたの心には、<br className={styles.spOnly}/>どの星が宿っている？
          </h1>
          <p className={styles.heroText}>
            星守り（ほしもり）は、<br className={styles.spOnly}/>一人ひとりの心に寄り添う不思議な存在。<br/>
            自分の「星」を知ることで、<br className={styles.spOnly}/>人間関係も子育ても、もっと楽になります。
          </p>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className={styles.diagnosisSection} id="diagnosis">
        <div className={styles.container}>
          <div className={styles.diagnosisBox}>
            <h2 className={styles.diagnosisTitle}>星守りを見つけよう 🔍</h2>
            <p className={styles.diagnosisLead}>
              生年月日を入力するだけ。あなたやお子様の心に宿る「星守り」が30秒で分かります。
            </p>
            <DiagnosisForm />
          </div>
        </div>
      </section>

      {/* Compatibility CTA → New Page */}
      <section className={styles.compatSection} id="compatibility">
        <div className={styles.container}>
          <div className={styles.compatBox}>
            <span className={styles.compatBadge}>⭐ 無料でなかよし度がわかる</span>
            <h2>ふたりのなかよし診断</h2>
            <p className={styles.compatLead}>
              生年月日をふたり分入力するだけで、なかよし度がその場でわかるよ！<br/>
              親子・きょうだい・お友だち——どんな関係でもOK。
            </p>
            <Link href="/compatibility" className={styles.zukanBtn}>
              無料でなかよし度を調べる
            </Link>
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
                ご自身やご家族の星を探してみてください。
              </p>
              <Link href="/zukan" className={styles.zukanBtn}>
                図鑑をひらく
              </Link>
            </div>
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
                「何度言っても伝わらない」「なぜか上手くいかない」…<br/>
                子育てでも、職場でも、パートナーとの関係でも——そんな経験はありませんか？
              </p>
              <p>
                すべての人は、全く異なる「心の構造（星守り）」を持って生まれてきます。<br/>
                活発に動きたい『火の星』に「じっとしなさい」と言い続けるのは、魚に木登りをさせるようなもの。
              </p>
              <p>
                星守りを通じて、自分やお子様の才能が伸びる「環境」を見つけてみませんか。<br/>
                私たちは、<strong>心の構造を見える化する</strong>ための地図をお渡しします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Adult Self Report Section */}
      <section className={styles.selfReportSection} id="self-report">
        <div className={styles.container}>
          <div className={styles.selfReportBox}>
            <span className={styles.selfReportBadge}>🌟 大人のための星守り</span>
            <h2>自分自身の<br/>「取扱説明書」</h2>
            <p className={styles.selfReportLead}>
              あなた自身の構造タイプを深掘りし、<br className={styles.spOnly}/>
              <strong>強みの活かし方</strong>・<strong>エネルギーの回復法</strong>・<strong>人間関係の処方箋</strong>をまとめた<br className={styles.spOnly}/>
              パーソナルレポートです。
            </p>
            <div className={styles.selfReportFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🔍</span>
                <div>
                  <h4>構造タイプ解析</h4>
                  <p>星・器・型の3層構造から、あなたの思考・感情・行動パターンを立体的に分析</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💎</span>
                <div>
                  <h4>才能の棚卸し</h4>
                  <p>あなたが最も輝く環境・活動・役割を構造的に特定</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🤝</span>
                <div>
                  <h4>人間関係マップ</h4>
                  <p>パートナー・上司・部下との構造摩擦ポイントと対処法</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📅</span>
                <div>
                  <h4>今年のナビゲーション</h4>
                  <p>好調月・注意月の年間カレンダーと転機のタイミング</p>
                </div>
              </div>
            </div>
            <div className={styles.selfReportMeta}>
              <span>📄 全5章・8,000〜12,000字</span>
              <span>📱 公式LINEからドキュメントで納品</span>
              <span>🎯 対象: 18歳以上</span>
            </div>
            <div className={styles.selfReportPrice}>¥3,980 <span>(税込)</span></div>
            <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.lineBtn} id="self-report-cta">
              公式LINEから申し込む
            </a>
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
              <span>🎂 対象: お子様（0〜17歳）</span>
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
                無料診断と図鑑は<strong>全年齢</strong>が対象です。
                星守りレポート（お子様向け）は0〜17歳、セルフレポート（大人向け）は18歳以上が対象です。
                パートナー相性診断は年齢を問わず、どなたでもご利用いただけます。
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
