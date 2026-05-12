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
              <span className={styles.logoMain}>KSS ARCHITECTURE</span>
              <span className={styles.logoSub}>for Children</span>
            </div>
            <nav className={styles.headerNav}>
              <Link href="/zukan" className={styles.navLink}>星守り図鑑</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={`${styles.container} ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <span className={styles.sectionLabelHero}>HOSHIMORI for Children</span>
            <h1 className={styles.heroTitle}>
              「この子、<em>わたしと全然ちがう</em>」<br/>
              —— そう感じたこと、<br className={styles.spOnly}/>ありませんか？
            </h1>
            <p className={styles.heroSub}>
              子育てのモヤモヤ。その答えは、お子様の心に宿る<strong className={styles.highlightYellow}>「星守り」</strong>が知っています。<br/>
              お子様の心の構造（星守りタイプ）を解析し、<strong className={styles.highlightYellow}>壊れる前にお子様を守る</strong>ための、<br/>
              その子だけの「育て方の地図と羅針盤」をお届けします。
            </p>
          </div>
        </div>
      </section>

      {/* Free Diagnosis Section (Hoshimori) */}
      <section className={styles.diagnosisSection}>
        <div className={styles.container}>
          <div className={styles.diagnosisBox}>
            <span className={styles.sectionLabel}>Free Scan</span>
            <h2 className={styles.sectionHeadline}>まずは無料で「星守り」をチェック</h2>
            <p className={styles.diagnosisLead}>
              生年月日を入力するだけで、お子様の心に宿る90タイプの「星守り」が分かります。
            </p>
            <DiagnosisForm />
          </div>
        </div>
      </section>

      {/* Empathy Section */}
      <section className={styles.empathy}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>For You</span>
          <h2 className={styles.sectionHeadline}>頑張っているのに、うまくいかない。<br/>そんな自分を責めていませんか？</h2>
          <div className={styles.worryNarrative}>
            <p>何度言っても片付けない。声を荒げた後の食卓の沈黙が、胸に刺さる。<br/>
              「また怒ってしまった」と布団の中で自分を責める夜が、もう何十回あっただろう。</p>
            <p>育児書を読み漁った。ネットで検索した。友達に相談した。<br/>
              でも、どのアドバイスも「うちの子」には当てはまらない。</p>
            <p>他の子はちゃんとやれている。うちの子だけ、なぜ？<br/>
              ——私の育て方が、間違っていたんじゃないか。</p>
            <p>もしそんな夜を過ごしたことがあるなら、<br/>
              ひとつだけ、先にお伝えさせてください。</p>
            <p className={styles.strongP}>
              <strong>あなたの育て方のせいではありません。</strong><br/>
              お子様の「星守り」と、今の環境の<strong>周波数がズレているだけ</strong>です。
            </p>
          </div>
          
          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>【⚠ 構造リスクへの警告】</p>
            <p className={styles.alertText}>
              子どもは「努力不足」よりも「環境との不一致」で心を壊します。<br/>
              お子様の「星」を知らないまま、合わない環境や関わり方を続ければ、心のエンジンはいつか限界を迎え、取り返しのつかない親子関係の断絶につながるリスクがあります。
            </p>
          </div>
        </div>
      </section>

      {/* Shift Section */}
      <section className={styles.shift}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>New Perspective</span>
          <h2 className={styles.sectionHeadline}>「もっと頑張れば変わる」は、<br/>子育てにおいては<em>間違った努力</em>かもしれません。</h2>
          <p className={styles.sectionLead}>
            努力が足りないから、うまくいかない——<br/>
            もし今そう思っているなら、<strong>その前提がそもそも間違っている可能性があります。</strong><br/><br/>
            育児書は「平均的な子ども」を前提に書かれています。<br/>
            でも、あなたのお子さまは「平均」ではありません。一人ひとりの心には全く異なる<strong>「星守り（水の星、火の星、木の星など）」が宿って生まれてきた</strong>のです。<br/><br/>
            活発な『火の星』の子に、「じっとしなさい」と言い続けること。<br/>
            それは、エンジン全開のレースカーに「止まれ」と叫び続けるようなもの。<br/>
            <strong>壊れるのは車ではなく、ブレーキを踏み続けたあなたの心</strong>です。
          </p>

          <div className={styles.shiftCompare}>
            <div className={`${styles.shiftCard} ${styles.badCard}`}>
              <h3 className={styles.badTitle}><span>×</span> 才能を押し付ける育児</h3>
              <p>全員に同じ説明書。「こうすればうまくいく」という一般論で、星が合わない子には苦痛でしかない。「魚に木登りをさせる」教育。</p>
            </div>
            <div className={`${styles.shiftCard} ${styles.goodCard}`}>
              <h3 className={styles.goodTitle}><span>✓</span> 適正環境を設計する育児</h3>
              <p>その子だけの星守りのトリセツ。星に最適化されたオーダーメイドの環境で、無理なく才能を伸ばす。「魚は水の中で泳がせる」教育。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>3 Approaches</span>
          <h2 className={styles.sectionHeadline}>「子どもを変える」のではありません。<br/>「星」を解き明かし、環境のほうを適合させる。</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCardBox}>
              <div className={styles.featureIcon}>🔍</div>
              <h3>星守りの解読</h3>
              <p>お子様が生まれ持った「星（心の構造）」を解析。エネルギータイプ・感受性・ストレス耐性を特定し、「なぜお子さまはこう反応するのか」の仕組みを明らかにします。</p>
            </div>
            <div className={styles.featureCardBox}>
              <div className={styles.featureIcon}>🤝</div>
              <h3>親子星マッチング</h3>
              <p>親と子の星の相性を照合し、「噛み合わない理由」を構造的に特定。あなたとお子様の間の摩擦は、どちらかが悪いのではなく「星の相性」の問題です。</p>
            </div>
            <div className={styles.featureCardBox}>
              <div className={styles.featureIcon}>🏠</div>
              <h3>星の環境設計</h3>
              <p>お子様の星に最適化された部屋の配置、勉強法、声かけの方法まで。「星を知って、環境を整えるだけ」で、才能は自然に伸びていきます。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zukan Banner */}
      <section className={styles.zukanBanner}>
        <div className={styles.container}>
          <div className={styles.zukanInner}>
            <div className={styles.zukanText}>
              <h3>📚 全90体の星守り図鑑</h3>
              <p>自然界のエレメント（水・木・火・土・金）からなる、多彩な「星守り」。<br/>それぞれの特徴をまとめた図鑑を公開中。</p>
              <Link href="/zukan" className={styles.btnSecondary}>図鑑を見る</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className={styles.pricing}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Plans</span>
          <h2 className={styles.sectionHeadline}>お子様の「地図と羅針盤」を手に入れる。</h2>

          <div className={styles.priceMain}>
            <div className={styles.priceBadge}>FULL SCAN</div>
            <h3>星守り診断（完全版）</h3>
            <div className={styles.priceAmount}>¥33,000 <span>(税込)</span></div>
            <p className={styles.priceDesc}>
              A4用紙で100ページ以上に及ぶ圧倒的な情報量が詰まった詳細な診断結果を『お子様専用の星守りカルテ』として専用バインダーに綴じ、ご指定の住所へ直接郵送いたします。
            </p>
            <ul className={styles.priceIncludes}>
              <li>構造診断レポート（全8章）</li>
              <li>環境構造レポート</li>
              <li>心のエネルギー状態解析</li>
              <li>運命の地図と羅針盤（俯瞰図）</li>
              <li>推奨補正アイテムリスト</li>
            </ul>
            <a href="https://lin.ee/ekkOkmP" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              公式LINEで診断を申し込む
            </a>
          </div>

          <div className={styles.noticeBox}>
            <p className={styles.noticeTitle}>⚠ 【重要なお知らせ】品質維持のための生産制限について</p>
            <p className={styles.noticeText}>
              九星構造学のお子様向け解析レポートは、すべてあだちなおと本人が1件ずつ手作業で精緻な解析・設計を行っております。そのため、想定を超える多数のお申し込みをいただいた場合は、品質維持のために予告なく新規での受注を一時停止とさせていただく場合がございます。
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <span className={styles.footerLogo}>KSS ARCHITECTURE</span>
          <p className={styles.copy}>© 2026 あだちなおと. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
