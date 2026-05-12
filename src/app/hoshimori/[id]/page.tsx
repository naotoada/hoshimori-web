import { getAllHoshimori, getHoshimoriById } from '@/lib/markdownParser';
import { getCharacterImageUrl } from '@/lib/characterMap';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
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

  return (
    <main className="container">
      <div className={styles.header}>
        <a href="/zukan" className={styles.backButton}>← 一覧へ戻る</a>
        <h1 className={styles.title}>{data.name}</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt={data.name} className={styles.characterImage} />
        </div>
        <div className={styles.typeBadgeContainer}>
          <div className={styles.typeBadge}>{data.typeName}</div>
        </div>
        
        <div className={styles.metaInfo}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>魂の構造</span>
            <span className={styles.metaValue}>{data.structure}</span>
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
            <h3 className={styles.sectionTitle}>💦 隠れたSOS（弱み）</h3>
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
      
      <div className={styles.ctaArea}>
        <p className={styles.ctaText}>
          この記事は「星守り」のほんの一部です。<br/>
          お子様専用の100ページを超える『星守りカルテ（完全版）』で、<br/>才能を育む環境づくりを始めませんか？
        </p>
        <a href="https://lin.ee/ekkOkmP" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>公式LINEから申し込む</a>
      </div>
    </main>
  );
}
