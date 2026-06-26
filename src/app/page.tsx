import styles from './page.module.css';
import DiagnosisForm from '@/components/DiagnosisForm';
import Reviews from '@/components/Reviews';
import Link from 'next/link';


export default function Home() {
  return (
    <main className={styles.main}>

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
            <h2>星守りなかよし診断</h2>
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
              <h2>📚 星守り図鑑</h2>
              <p>
                💧水・🌏大地・⚡️雷・🍃風・👑帝・🌌天・🍎果実・⛰️山・🔥火<br/>
                星のエレメントから生まれた、90種類の星守りたち💫<br/>
                ご自身やご家族、友人の星を探してみてください💡
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
          <div className={styles.conceptGrid} style={{ flexDirection: 'column', alignItems: 'center' }}>
            <div className={styles.conceptImage}>
              <img src="/images/concept_rain_hope.png" alt="雨の中、星を見上げる" style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'block', margin: '0 auto' }} />
            </div>
            <div className={styles.conceptText}>
              <h2 style={{ textAlign: 'center' }}>「頑張ってるのに、なぜかうまくいかない」<br/>——それは、あなたのせいじゃないかもしれません。</h2>
              <p>
                「何度言っても伝わらない」「頑張ってるのに、なぜか報われない」——<br/>
                子育ても、仕事も、パートナーとの関係も。<br/>
                ずっと自分のせいだと思っていませんでしたか？
              </p>
              <p>
                でも、それは「努力不足」でも「相性が悪い」のでもありません。<br/>
                あなたが生まれ持った<strong>心の構造</strong>と、今いる環境がズレているだけ。<br/>
                ただ、それだけのことかもしれません。
              </p>
              <p>
                星守りレポートは、その"ズレ"を見える化する地図です。<br/>
                自分の星を知った瞬間、「なぜあの人と合わなかったのか」「なぜ周りに理解されず苦しかったのか」——<br/>
                その答えが、一気に腑に落ちるはずです。
              </p>
            </div>
            <div className={styles.conceptImage}>
              <img src="/images/star_magic_book.png" alt="星守りの魔法の本" style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'block', margin: '0 auto' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Adult Self Report Section */}
      <section className={styles.selfReportSection} id="self-report">
        <div className={styles.container}>
          <div className={styles.selfReportBox}>
            <span className={styles.selfReportBadge}>🌟 星守りレポート</span>
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
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✨</span>
                <div>
                  <h4>あなたの星を輝かせる魔法</h4>
                  <p>あなたの星が最も喜ぶ「まもりの色」と空間づくり、毎日の小さな習慣をお届け</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💌</span>
                <div>
                  <h4>星守りからの手紙</h4>
                  <p>「あなたの苦手は才能の裏返し」——心に届く安心のメッセージと未来への招待状</p>
                </div>
              </div>
            </div>
            <div className={styles.selfReportMeta}>
              <span>📄 全6章・9,000〜14,000字</span>
              <span>📱 公式LINEからドキュメントで納品</span>
              <span>🎯 対象: 18歳以上</span>
            </div>
            <div className={styles.selfReportPrice}>¥2,900 <span>(税込)</span></div>
            <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.lineBtn} id="self-report-cta">
              公式LINEから申し込む
            </a>
          </div>
        </div>
      </section>

      {/* Report Service Section (Entry: ¥3,900) */}
      <section className={styles.reportSection} id="report">
        <div className={styles.container}>
          <div className={styles.reportBox}>
            <span className={styles.reportBadge}>📝 子どものための星守り</span>
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
                <span className={styles.featureIcon}>✨</span>
                <div>
                  <h4>星守りの魔法レシピ</h4>
                  <p>お子様の星が喜ぶ「まもりの色」と空間づくり、親子で楽しめる毎日の小さな習慣</p>
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
              <span>📄 全7章・11,000〜17,000字</span>
              <span>📱 公式LINEからドキュメントで納品</span>
              <span>🎂 対象: お子様（0〜17歳）</span>
              <span>📝 必要な情報: お子様の生年月日のみ</span>
            </div>

            <div className={styles.reportPrice}>¥3,900 <span>(税込)</span></div>

            <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.lineBtn} id="report-cta">
              公式LINEから申し込む
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={styles.reviewsSection} id="reviews" style={{ padding: '0 20px', maxWidth: '800px', margin: '0 auto' }}>
        <Reviews category="HOSHIMORI" />
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection} id="faq">
        <div className={styles.container}>
          <h2 className={styles.faqTitle}>❓ よくあるご質問</h2>
          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>無料診断と星守りレポートは何が違いますか？</summary>
              <p className={styles.faqAnswer}>
                無料診断では、「星守りタイプ」と基本的な特徴（約500字）をお伝えしています。
                星守りレポートでは、90タイプごとに完全カスタマイズされた<strong>全6〜7章・10,000字超</strong>の詳細な分析をお届けします。
                才能の活かし方、人間関係の処方箋、今年のナビゲーションなど、
                明日から実践できる具体的な内容が含まれています。
              </p>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqQuestion}>どのように届きますか？</summary>
              <p className={styles.faqAnswer}>
                公式LINEを通じて、<strong>ドキュメントリンク</strong>でお届けします。
                スマートフォンでもパソコンでもすぐにお読みいただけます。
                お申し込みからお届けまで、通常1〜3営業日でお届けいたします。
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
              カバンのお守りに、デスクの見守り役に。<br/>
              あなたの星守りをアクリルキーホルダーやマグカップなど、<br className={styles.spOnly}/>
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

      {/* Secret Oracle Section */}
      <section className={styles.oracleSection} id="oracle">
        <div className={styles.container}>
          <div className={styles.secretGrid}>
            <div className={styles.secretCard}>
              <h2 className={styles.secretTitle}>🏛️ 星守り神託所</h2>
              <div className={styles.secretDoor}>🚪</div>
              <Link href="/oracle" className={styles.secretBtn}>
                🗝️ 扉を開く
              </Link>
            </div>
            <div className={styles.secretCard}>
              <h2 className={styles.secretTitle}>💫 星守りの導き</h2>
              <div className={styles.secretDoor}>🚪</div>
              <Link href="/guide" className={styles.secretBtn}>
                🗝️ 扉を開く
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerLogo}>⭐ 星守り - HOSHIMORI -</div>
          <p className={styles.footerPowered}>Powered by 九星構造学(KSS)</p>
          
          <div className={styles.socialButtons}>
            <a href="https://lin.ee/oscNoyi" target="_blank" rel="noopener noreferrer" className={styles.socialButton} aria-label="LINE">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
            </a>
            <a href="https://x.com/adachinaoto_kss" target="_blank" rel="noopener noreferrer" className={styles.socialButton} aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/hoshimori_official/" target="_blank" rel="noopener noreferrer" className={styles.socialButton} aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>
              </svg>
            </a>
            <a href="https://note.com/hoshimori_kss" target="_blank" rel="noopener noreferrer" className={styles.socialButton} aria-label="Note">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 .279c4.623 0 10.953-.235 15.498-.117 6.099.156 8.39 2.813 8.468 9.374.077 3.71 0 14.335 0 14.335h-6.598c0-9.296.04-10.83 0-13.759-.078-2.578-.814-3.807-2.795-4.041-2.097-.235-7.975-.04-7.975-.04v17.84H0Z"/>
              </svg>
            </a>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <a href="https://www.kss-architecture.com/tokushoho.html" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'underline', fontSize: '0.85rem' }}>特定商取引法に基づく表記</a>
          </div>
          <p className={styles.copy}>© 2026 あだちなおと. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
