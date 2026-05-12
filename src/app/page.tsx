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
            <span className={styles.sectionLabelHero}>KSS for Children</span>
            <h1 className={styles.heroTitle}>
              「この子、<em>わたしと全然ちがう</em>」<br/>
              —— そう感じたこと、<br className={styles.spOnly}/>ありませんか？
            </h1>
            <p className={styles.heroSub}>
              子供の性格のナゾ、相性のモヤモヤ。<br/>
              その答えは「構造」の中にあります。<br/>
              お子様の<strong className={styles.highlightYellow}>「心の構造」</strong>を解析し、<br/>
              <strong className={styles.highlightYellow}>その子だけの「育て方の地図と羅針盤」</strong>をお届けします。
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
              生年月日を入力するだけで、お子様のベースとなる「心の構造（星守りタイプ）」が分かります。
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
              何時間考えても、堂々巡りで納得のいく答えは出なかった。<br/>
              どのアドバイスも「うちの子」には当てはまらない。</p>
            <p>他の子はちゃんとやれている。うちの子だけ、なぜ？<br/>
              ——私の育て方が、間違っていたんじゃないか。</p>
            <p>もしそんな夜を過ごしたことがあるなら、<br/>
              ひとつだけ、先にお伝えさせてください。</p>
            <p className={styles.strongP}>
              <strong>あなたの育て方のせいではありません。</strong><br/>
              お子様の「心の構造」と、今の環境の<strong>周波数がズレているだけ</strong>です。
            </p>
          </div>
          
          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>【⚠ 構造リスクへの警告】</p>
            <p className={styles.alertText}>
              お子さまの「心の構造」を知らないまま、合わない環境や関わり方を続ければ、お子さまの心のエンジンはいつか限界を迎え、取り返しのつかない親子関係の断絶や、深い自己肯定感の喪失につながるリスクがあります。
            </p>
          </div>
        </div>
      </section>

      {/* Shift Section */}
      <section className={styles.shift}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>New Perspective</span>
          <h2 className={styles.sectionHeadline}>「もっと頑張れば変わる」は、<br/>子育てにおいては<em>間違った努力かもしれません</em>。</h2>
          <p className={styles.sectionLead}>
            努力が足りないから、うまくいかない——<br/>
            もし今そう思っているなら、<strong>その前提がそもそも間違っている可能性があります。</strong><br/><br/>
            育児書は「平均的な子ども」を前提に書かれています。<br/>
            でも、あなたのお子さまは「平均」ではありません。<br/>
            <strong>一人ひとりが全く異なる「心の構造」を持って生まれてきた</strong>のです。<br/><br/>
            活発な子に「じっとしなさい」と言い続けること。<br/>
            それは、エンジン全開のレースカーに「止まれ」と叫び続けるようなもの。<br/>
            <strong>壊れるのは車ではなく、ブレーキを踏み続けたあなたの心</strong>です。
          </p>

          <div className={styles.shiftCompare}>
            <div className={`${styles.shiftCard} ${styles.badCard}`}>
              <h3 className={styles.badTitle}><span>×</span> 普通の育児</h3>
              <p>全員に同じ説明書。「こうすればうまくいく」という一般論で、合わない子には苦痛でしかない。</p>
            </div>
            <div className={`${styles.shiftCard} ${styles.goodCard}`}>
              <h3 className={styles.goodTitle}><span>✓</span> 構造に基づく育児</h3>
              <p>その子だけのトリセツ。構造に最適化されたオーダーメイド処方箋で、無理なく才能を伸ばす。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>3 Approaches</span>
          <h2 className={styles.sectionHeadline}>「子どもを変える」のではありません。<br/>「構造」を解き明かし、環境のほうを適合させる。</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCardBox}>
              <div className={styles.featureIcon}>🔍</div>
              <h3>心の構造の解読</h3>
              <p>お子様が生まれ持った「心の構造」を解析。エネルギータイプ・感受性・ストレス耐性を特定し、「なぜお子さまはこう反応するのか」の仕組みを明らかにします。</p>
            </div>
            <div className={styles.featureCardBox}>
              <div className={styles.featureIcon}>🤝</div>
              <h3>親子構造マッチング</h3>
              <p>親と子の構造を照合し、「噛み合わない理由」を構造的に特定。あなたとお子様の間の摩擦は、どちらかが悪いのではなく「構造の相性」の問題です。</p>
            </div>
            <div className={styles.featureCardBox}>
              <div className={styles.featureIcon}>🏠</div>
              <h3>環境設計</h3>
              <p>お子様の構造に最適化された部屋の配置、勉強法、声かけの方法まで。「構造を知って、環境を整えるだけ」で、才能は自然に伸びていきます。</p>
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
              <p>1〜9の星からなる、多彩な「心の構造（星守り）」。<br/>それぞれの特徴をまとめた図鑑を公開中。</p>
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
            <h3>子供向け構造診断</h3>
            <div className={styles.priceAmount}>¥33,000 <span>(税込)</span></div>
            <p className={styles.priceDesc}>
              A4用紙で100ページ以上に及ぶ圧倒的な情報量が詰まった詳細な診断結果を『お子様専用の運命の地図と羅針盤』として専用バインダーに綴じ、ご指定の住所へ直接郵送いたします。
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
