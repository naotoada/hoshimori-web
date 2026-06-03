import { getAllHoshimori, getHoshimoriById } from '@/lib/markdownParser';
import { getCharacterImageUrl, getSuzuriDesignUrl, SUZURI_SHOP_URL } from '@/lib/characterMap';
import { TRAITS_TABLE } from '@/lib/traits';
import { getTopTraitText } from '@/lib/compatibility';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import ShareButtons from '@/components/ShareButtons';
import styles from './page.module.css';

export async function generateStaticParams() {
  const characters = getAllHoshimori();
  return characters.map((c) => ({
    id: c.id,
  }));
}

export default async function HoshimoriDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = getHoshimoriById(id);

  if (!data) {
    notFound();
  }

  // Parse markdown lists into HTML safely
  const renderMd = (text: string) => ({ __html: marked(text) as string });
  const imageUrl = getCharacterImageUrl(data.id);
  const suzuriUrl = getSuzuriDesignUrl(data.id);

  const bgMeta: Record<string, string> = {
    '水の星': styles.bgWater,
    '大地の星': styles.bgEarth,
    '雷の星': styles.bgThunder,
    '風の星': styles.bgWind,
    '帝の星': styles.bgEmperor,
    '天の星': styles.bgHeaven,
    '果実の星': styles.bgFruit,
    '山の星': styles.bgMountain,
    '火の星': styles.bgFire,
  };
  const bgClass = bgMeta[data.honmeiName] || '';

  const emojiMeta: Record<string, string> = {
    '水の星': '💧',
    '大地の星': '🌍',
    '雷の星': '⚡️',
    '風の星': '🍃',
    '帝の星': '👑',
    '天の星': '🌌',
    '果実の星': '🍎',
    '山の星': '🏔️',
    '火の星': '🔥',
  };
  const honmeiEmoji = emojiMeta[data.honmeiName] || '';

  const traits = TRAITS_TABLE[data.id];
  const shareText = traits 
    ? `私は星守り「${data.name}」タイプでした！\n\n✨ 際立つ特性：\n・${getTopTraitText(traits)}タイプ\n\nあなたの星守りは？`
    : `私は星守り「${data.name}」タイプでした！\n\nあなたの星守りは？`;
  const shareUrl = `https://hoshimori.kss-architecture.com/`;

  return (
    <>
    <main className="container">
      <div className={styles.header}>
        <a href="/zukan" className={styles.backButton}>← 一覧へ戻る</a>
        <h1 className={styles.title}>{data.name}</h1>
      </div>

      <div className={styles.card}>
        <div className={`${styles.imageWrapper} ${bgClass}`}>
          <img src={imageUrl} alt={data.name} className={styles.characterImage} />
        </div>
        <div className={styles.typeBadgeContainer}>
          <div className={styles.typeBadge}>{data.typeName}</div>
        </div>
        
        <div className={styles.metaInfo}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>魂の構造</span>
            <span className={styles.metaValue}>{honmeiEmoji} {data.honmeiName} × {data.vesselName}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>心の特質</span>
            <span className={styles.metaValue}>{data.fiveElements}</span>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <section className={`${styles.section} ${styles.strengthSection}`}>
            <h3 className={styles.sectionTitle}>✨ 才能の原石（強み）</h3>
            <div className={styles.content} dangerouslySetInnerHTML={renderMd(data.strengths)} />
          </section>

          <section className={`${styles.section} ${styles.weaknessSection}`}>
            <h3 className={styles.sectionTitle}>🚨 隠れたSOS（弱み）</h3>
            <div className={styles.content} dangerouslySetInnerHTML={renderMd(data.weaknesses)} />
          </section>
        </div>

        <section className={`${styles.section} ${styles.envSection}`}>
          <h3 className={styles.sectionTitle}>🏞 才能が伸びる「得意な環境」</h3>
          <div className={styles.content} dangerouslySetInnerHTML={renderMd(data.goodEnvs)} />
        </section>

        <section className={`${styles.section} ${styles.badEnvSection}`}>
          <h3 className={styles.sectionTitle}>🚧 才能が枯れる「苦手な環境」</h3>
          <div className={styles.content} dangerouslySetInnerHTML={renderMd(data.badEnvs)} />
        </section>

        <section className={`${styles.section} ${styles.importantSection}`}>
          <h3 className={styles.sectionTitle}>🤝 関わり方（保護者・教育者向け）</h3>
          <div className={styles.content} dangerouslySetInnerHTML={renderMd(data.howToInteract)} />
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>🌱 成長の軌跡</h3>
          <div className={styles.content} dangerouslySetInnerHTML={renderMd(data.growthPace)} />
        </section>
      </div>

      <ShareButtons text={shareText} url={shareUrl} hashtags={['星守り', '星守り診断', data.name]} />

      <div className={styles.compatLink} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'stretch' }}>
        <Link href="/#diagnosis" className={styles.compatLinkButton} style={{ background: 'linear-gradient(135deg, #FFB347, #D97706)', boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)', color: '#FFFFFF', width: '100%', boxSizing: 'border-box' }}>
          🔍 星守りを調べる →
        </Link>
        <Link href="/compatibility" className={styles.compatLinkButton} style={{ width: '100%', boxSizing: 'border-box' }}>
          ⭐ 星守りなかよし診断で相性をチェック →
        </Link>
      </div>

      {suzuriUrl && (
        <div className={styles.goodsArea}>
          <h3 className={styles.goodsTitle}>🛒 {data.name}のグッズ</h3>
          <p className={styles.goodsText}>アクリルキーホルダー・缶バッジ・マグカップなど、{data.name}の公式グッズを販売中です。</p>
          <a href={suzuriUrl} target="_blank" rel="noopener noreferrer" className={styles.goodsButton}>
            グッズを見る →
          </a>
        </div>
      )}
      
      <div className={styles.ctaAreaSelf}>
        <span className={styles.reportBadge}>📝 星守りレポート</span>
        <p className={styles.ctaText}>
          こちらの内容は「星守り」のほんの一部です。<br/>
          才能の活かし方・人間関係の処方箋・今年のナビゲーションまで、<br className={styles.spOnly}/>全5章のパーソナルレポートをお届けします。
        </p>
        <div className={styles.ctaPriceTag}>¥3,900<span>（税込）</span></div>
        <Link href="/#self-report" className={styles.ctaButton}>くわしく見る</Link>
      </div>

      <div className={styles.ctaArea}>
        <span className={styles.reportBadge}>📝 子どものための星守り</span>
        <p className={styles.ctaText}>
          子供向けの「取扱説明書」もあります。<br/>
          お子様専用の『星守りレポート』で,<br className={styles.spOnly}/>才能の伸ばし方・褒め方・叱り方まで<br className={styles.spOnly}/>全6章の取扱説明書をお届けします。
        </p>
        <div className={styles.ctaPriceTag}>¥4,900<span>（税込）</span></div>
        <Link href="/#report" className={styles.ctaButton}>くわしく見る</Link>
      </div>
    </main>

    <footer className={styles.footer}>
      <Link href="/" className={styles.backLink}>← トップページに戻る</Link>
      
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

      <div style={{ marginTop: '15px', marginBottom: '15px' }}>
        <a href="https://www.kss-architecture.com/tokushoho.html" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'underline', fontSize: '0.85rem' }}>特定商取引法に基づく表記</a>
      </div>
      <p className={styles.copy}>© 2026 あだちなおと. All rights reserved.</p>
    </footer>
    </>
  );
}
