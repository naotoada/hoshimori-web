import styles from './page.module.css';

export default function PrivacyPolicy() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>プライバシーポリシー</h1>
        <p className={styles.lastUpdated}>最終更新日：2026年7月13日</p>

        <div className={styles.content}>
          <p>
            「星守り」（以下「当アプリ」といいます）は、ユーザーの皆様のプライバシー情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
          </p>

          <section className={styles.section}>
            <h2>1. 収集する情報</h2>
            <p>当アプリでは、サービスの提供および改善のため、以下の情報を取得する場合があります。</p>
            <ul>
              <li><strong>入力されたプロフィール情報：</strong> アプリ内で設定されるお子様や保護者のお名前（ニックネーム可）、生年月日、性別など。（※個人を特定できる情報は収集しません）</li>
              <li><strong>端末および利用状況：</strong> 利用されているOSの種類、アプリのバージョン、操作履歴、クラッシュレポートなど。</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>2. 情報の利用目的</h2>
            <p>取得した情報は、以下の目的で利用いたします。</p>
            <ul>
              <li>当アプリのサービス提供（星守りの算出やAIチャット等）のため</li>
              <li>ユーザー体験の向上および不具合の修正のため</li>
              <li>機能アップデート等のご案内のため</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. 情報の第三者提供について</h2>
            <p>
              当アプリは、ユーザーご本人の同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法やその他の法令で認められる場合を除きます。
            </p>
            <p>
              なお、当アプリではAIチャット機能等に外部API（OpenAI / Google Gemini）を利用しています。入力されたテキストデータは生成処理の目的でのみ送信され、AIモデルの学習データとして利用されることはありません。
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. プライバシーポリシーの変更</h2>
            <p>
              本ポリシーの内容は、ユーザーに通知することなく変更することができるものとします。変更後のプライバシーポリシーは、当ウェブサイトまたは当アプリ内に掲示したときから効力を生じるものとします。
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. お問い合わせ窓口</h2>
            <p>
              本ポリシーに関するお問い合わせ、またはアプリに関するサポートは、以下の公式LINEよりご連絡ください。
            </p>
            <a href="https://lin.ee/9MSmxO1x" target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
              💬 公式LINEでお問い合わせ
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
