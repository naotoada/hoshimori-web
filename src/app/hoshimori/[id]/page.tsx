import { getAllHoshimori, getHoshimoriById } from '@/lib/markdownParser';
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

  return (
    <main className="container">
      <div className={styles.header}>
        <a href="/" className={styles.backButton}>← 戻る</a>
        <h1 className={styles.title}>{data.name}</h1>
        <p className={styles.subtitle}>{data.honmeiName} / {data.id}</p>
      </div>

      <div className={styles.card}>
        <div className={styles.typeBadge}>{data.typeName}</div>
        
        <div className={styles.metaInfo}>
          <p><strong>構造:</strong> {data.structure}</p>
          <p><strong>五行関係:</strong> {data.fiveElements}</p>
        </div>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>✨ 強み</h3>
          <div className={styles.content} dangerouslySetInnerHTML={renderMd(data.strengths)} />
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>💦 弱み</h3>
          <div className={styles.content} dangerouslySetInnerHTML={renderMd(data.weaknesses)} />
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>🏞 得意な環境</h3>
          <div className={styles.content} dangerouslySetInnerHTML={renderMd(data.goodEnvs)} />
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>🚧 苦手な環境</h3>
          <div className={styles.content} dangerouslySetInnerHTML={renderMd(data.badEnvs)} />
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>🤝 関わり方（保護者・教育者向け）</h3>
          <div className={`${styles.content} ${styles.important}`} dangerouslySetInnerHTML={renderMd(data.howToInteract)} />
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>🌱 成長ペース</h3>
          <div className={styles.content} dangerouslySetInnerHTML={renderMd(data.growthPace)} />
        </section>
      </div>
      
      <div className={styles.ctaArea}>
        <p>この子の才能を爆発させる具体的な設計図（物理レポート）と<br/>専用グッズを手に入れませんか？</p>
        <a href="#line" className={styles.ctaButton}>公式LINEから申し込む</a>
      </div>
    </main>
  );
}
