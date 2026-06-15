"use client";
import { useEffect, useState } from 'react';
import styles from './Reviews.module.css';

const GAS_API_URL = "https://script.google.com/macros/s/AKfycbyN88zmbAYLJChljk6GUg2jsq7lofs9XDnlTNVFaYrd9rhIrvWFB2_ZgH5WELvSsDmlLQ/exec";

export default function Reviews({ category = 'HOSHIMORI' }: { category?: string }) {
  const [stats, setStats] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  const fetchReviews = (off: number) => {
    setLoading(true);
    const cbName = '_kssR' + Date.now();
    
    (window as any)[cbName] = function(data: any) {
      delete (window as any)[cbName];
      const s = document.getElementById('kss-rv');
      if (s) s.remove();
      
      if (off === 0) {
        setStats(data.stats);
        setReviews(data.reviews || []);
      } else {
        setReviews(prev => [...prev, ...(data.reviews || [])]);
      }
      setHasMore(data.hasMore);
      setOffset(off + limit);
      setLoading(false);
    };

    const s = document.createElement('script');
    s.id = 'kss-rv';
    s.src = `${GAS_API_URL}?action=getReviews&limit=${limit}&offset=${off}&category=${category}&callback=${cbName}`;
    document.body.appendChild(s);
  };

  useEffect(() => {
    fetchReviews(0);
  }, [category]);

  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.title}>⭐ ご利用いただいた方の声</h2>
      <p className={styles.subtitle}>星守りレポート＆セルフレポートをご利用いただいた方から寄せられた感想です。</p>

      {!stats || stats.total === 0 ? (
        <p className={styles.loadingText}>まもなくご利用者の声が表示されます</p>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <div className={styles.statValue}>{stats.satisfiedRate}%</div>
              <div className={styles.statLabel}>満足度</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statValue}>{stats.avgScore}</div>
              <div className={styles.statLabel}>平均スコア / 100</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statValue}>{stats.total}</div>
              <div className={styles.statLabel}>回答数</div>
            </div>
          </div>

          <div className={styles.reviewsGrid}>
            {reviews.map((r, idx) => (
              <div key={idx} className={styles.reviewCard}>
                <div className={styles.reviewMeta}>
                  {r.date} <span className={styles.reviewBadge}>{r.q1}</span>
                  {r.gender && r.age_group && (
                    <span className={styles.reviewBadgeDemo}>
                      {r.gender}・{r.age_group}
                    </span>
                  )}
                </div>
                {r.q5 && (
                  <>
                    <div className={styles.reviewHeading}>印象に残った点</div>
                    <div className={styles.reviewText} dangerouslySetInnerHTML={{ __html: r.q5.replace(/\\n/g, '<br>') }} />
                  </>
                )}
                {r.q6 && (
                  <>
                    <div className={styles.reviewHeadingDivider}>実生活での変化</div>
                    <div className={styles.reviewText} dangerouslySetInnerHTML={{ __html: r.q6.replace(/\\n/g, '<br>') }} />
                  </>
                )}
              </div>
            ))}
          </div>

          {hasMore && (
            <button 
              className={styles.moreBtn} 
              onClick={() => fetchReviews(offset)}
              disabled={loading}
            >
              {loading ? '読み込み中...' : 'もっと見る'}
            </button>
          )}
        </>
      )}
    </div>
  );
}
