'use client';

import { useState } from 'react';
import { calculateHoshimori } from '@/lib/kssLogic';
import { getCharacterImageUrl, CHARACTER_MAP } from '@/lib/characterMap';
import { calculateCompatibility, STAR_NAMES, type CompatResult, DIM_LABELS, farthestDim } from '@/lib/compatibility';
import { TRAITS_TABLE } from '@/lib/traits';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import styles from './page.module.css';

interface PersonResult {
  hoshimoriId: string;
  honmei: number;
  honmeiName: string;
  nikkan: string;
  charName: string;
  imageUrl: string;
}

function PersonForm({
  label, icon, onResult,
}: {
  label: string; icon: string;
  onResult: (result: PersonResult) => void;
}) {
  const currentYear = new Date().getFullYear();
  const [mode, setMode] = useState<'birthday' | 'select'>('birthday');
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string>('');
  const [result, setResult] = useState<PersonResult | null>(null);

  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Emoji map for star groups
  const starEmoji: Record<string, string> = {
    '水の星': '💧', '大地の星': '🌏', '雷の星': '⚡️', '風の星': '🍃',
    '帝の星': '👑', '天の星': '🌌', '果実の星': '🍎', '山の星': '⛰️', '火の星': '🔥',
  };

  // Build sorted character list for dropdown
  const charList = Object.entries(CHARACTER_MAP)
    .filter(([, v]) => v.name)
    .sort((a, b) => {
      const starOrder = ['水の星', '大地の星', '雷の星', '風の星', '帝の星', '天の星', '果実の星', '山の星', '火の星'];
      const aGroup = STAR_NAMES[parseInt(a[0].split('_')[0])] || '';
      const bGroup = STAR_NAMES[parseInt(b[0].split('_')[0])] || '';
      const aIdx = starOrder.indexOf(aGroup);
      const bIdx = starOrder.indexOf(bGroup);
      if (aIdx !== bIdx) return aIdx - bIdx;
      return a[1].name.localeCompare(b[1].name, 'ja');
    });

  const handleDiagnose = () => {
    const res = calculateHoshimori(year, month, day);
    const charName = CHARACTER_MAP[res.hoshimoriId]?.name || res.hoshimoriId;
    const imageUrl = getCharacterImageUrl(res.hoshimoriId);
    const p: PersonResult = { ...res, charName, imageUrl };
    setResult(p);
    onResult(p);
  };

  const handleSelect = () => {
    if (!selectedId) return;
    const char = CHARACTER_MAP[selectedId];
    if (!char) return;
    const honmei = parseInt(selectedId.split('_')[0]);
    const honmeiName = STAR_NAMES[honmei] || '';
    const p: PersonResult = {
      hoshimoriId: selectedId,
      honmei,
      honmeiName,
      nikkan: '',
      charName: char.name,
      imageUrl: getCharacterImageUrl(selectedId),
    };
    setResult(p);
    onResult(p);
  };

  return (
    <div className={styles.personCard}>
      <div className={styles.personLabel}>
        <span className={styles.personIcon}>{icon}</span>
        <span>{label}</span>
      </div>
      <div className={styles.modeToggle}>
        <button
          className={`${styles.modeBtn} ${mode === 'birthday' ? styles.modeBtnActive : ''}`}
          onClick={() => setMode('birthday')}
        >
          📅 生年月日
        </button>
        <button
          className={`${styles.modeBtn} ${mode === 'select' ? styles.modeBtnActive : ''}`}
          onClick={() => setMode('select')}
        >
          ⭐ 星守りから選ぶ
        </button>
      </div>
      {mode === 'birthday' ? (
        <>
          <div className={styles.dateRow}>
            <div className={styles.selectWrap}>
              <select value={year} onChange={e => setYear(Number(e.target.value))} className={styles.sel}>
                {years.map(y => <option key={y} value={y}>{y}年</option>)}
              </select>
            </div>
            <div className={styles.selectWrap}>
              <select value={month} onChange={e => setMonth(Number(e.target.value))} className={styles.sel}>
                {months.map(m => <option key={m} value={m}>{m}月</option>)}
              </select>
            </div>
            <div className={styles.selectWrap}>
              <select value={day} onChange={e => setDay(Number(e.target.value))} className={styles.sel}>
                {days.map(d => <option key={d} value={d}>{d}日</option>)}
              </select>
            </div>
            <button onClick={handleDiagnose} className={styles.checkBtn}>決定</button>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '8px', textAlign: 'center', lineHeight: '1.4' }}>
            ※23:00〜0:00にお生まれの方は、生年月日に「+1日」を追加してください。<br />
            （例：1990年5月15日 23:30生まれ →「1990年5月16日」に設定して診断）
          </p>
        </>
      ) : (
        <div className={styles.selectRow}>
          <div className={styles.selectWrap} style={{ flex: 1 }}>
            <select value={selectedId} onChange={e => setSelectedId(e.target.value)} className={styles.sel}>
              <option value="">星守りを選んでね</option>
              {charList.map(([id, char]) => (
                <option key={id} value={id}>
                  {starEmoji[STAR_NAMES[parseInt(id.split('_')[0])]] || ''}{STAR_NAMES[parseInt(id.split('_')[0])]}「{char.name}」
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSelect} className={styles.checkBtn} disabled={!selectedId}>決定</button>
        </div>
      )}
      {result && (
        <div className={styles.personResult}>
          <img src={result.imageUrl} alt={result.charName} className={styles.personImg} />
          <div>
            <div className={styles.personName}>{result.charName}</div>
            <div className={styles.personStar}>{STAR_NAMES[result.honmei]}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultView({ result }: { result: CompatResult }) {
  const cfg: Record<string, { color: string; label: string; emoji: string }> = {
    soulmate:  { color: '#a855f7', label: 'うんめいのなかよし度', emoji: '💜' },
    excellent: { color: '#10b981', label: 'なかよし度バツグン！', emoji: '💫' },
    good:      { color: '#3b82f6', label: 'なかよし度たかめ！', emoji: '✨' },
    neutral:   { color: '#f59e0b', label: 'なかよし度ふつう', emoji: '🌙' },
    growth:    { color: '#ef4444', label: 'なかよし度のびしろ◎', emoji: '🔥' },
  };
  const c = cfg[result.level];

  const traitsA = TRAITS_TABLE[result.idA];
  const traitsB = TRAITS_TABLE[result.idB];
  
  let shareText = `【なかよし度：${result.score}点】\n${result.nameA}と${result.nameB}の相性を診断したよ！\n\nあなたとの相性も診断してみてね！`;
  if (traitsA && traitsB) {
    const gap = farthestDim(traitsA, traitsB);
    shareText = `【なかよし度：${result.score}点】\n${result.nameA}と${result.nameB}の相性を診断したよ！\n\nふたりの一番のちがいは「${DIM_LABELS[gap]}」みたい。\n\nあなたとの相性も診断してみてね！`;
  }
  const shareUrl = 'https://hoshimori.kss-architecture.com/compatibility';

  return (
    <div className={styles.resultSection}>
      <div className={styles.scoreHeader}>
        <div className={styles.scoreCircle}>
          <span className={styles.scoreEmoji}>{c.emoji}</span>
          <span className={styles.scoreNumber}>{result.score}</span>
          <span className={styles.scoreLabel}>/ 100</span>
        </div>
        <div className={styles.resultLevel}>{c.label}</div>
      </div>

      <div className={styles.subScores}>
        <div className={styles.subScore}>
          <span className={styles.subIcon}>🤝</span>
          <span className={styles.subLabel}>にてる度</span>
          <span className={styles.subValue}>{result.resonance}</span>
        </div>
        <div className={styles.subScore}>
          <span className={styles.subIcon}>🧩</span>
          <span className={styles.subLabel}>たすけあい度</span>
          <span className={styles.subValue}>{result.complement}</span>
        </div>
      </div>

      <p className={styles.resultSummary}>{result.summary}</p>

      <div className={styles.resultGrid}>
        <div className={styles.resultBox}>
          <h3>✨ ふたりのいいところ</h3>
          <ul>{result.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
        <div className={`${styles.resultBox} ${styles.frictionBox}`}>
          <h3>⚡ すれちがいポイント</h3>
          <ul>{result.frictions.map((f, i) => <li key={i}>{f}</li>)}</ul>
        </div>
      </div>

      <div className={styles.adviceBox}>
        <h3>💡 アドバイス</h3>
        <p>{result.advice}</p>
      </div>

      <div className={styles.charCards}>
        <Link href={`/hoshimori/${result.idA}`} className={styles.charCard}>
          <img src={getCharacterImageUrl(result.idA)} alt={result.nameA} className={styles.charCardImg} />
          <span className={styles.charCardName}>{result.nameA}</span>
          <span className={styles.charCardLink}>くわしく見る →</span>
        </Link>
        <Link href={`/hoshimori/${result.idB}`} className={styles.charCard}>
          <img src={getCharacterImageUrl(result.idB)} alt={result.nameB} className={styles.charCardImg} />
          <span className={styles.charCardName}>{result.nameB}</span>
          <span className={styles.charCardLink}>くわしく見る →</span>
        </Link>
      </div>

      <ShareButtons text={shareText} url={shareUrl} hashtags={['星守り', '星守りなかよし診断']} />

      <div className={styles.ctaAreaSelf}>
        <span className={styles.reportBadge}>📝 星守りレポート</span>
        <p className={styles.ctaText}>
          相手との関係をもっと深めたい大人の方へ。<br/>
          大人のあなた自身の「取扱説明書（星守りレポート）」で、<br className={styles.spOnly}/>人間関係の処方箋や、才能の活かし方を<br className={styles.spOnly}/>詳しく知ることができます。
        </p>
        <div className={styles.ctaPriceTag}>¥2,900<span>（税込）</span></div>
        <Link href="/#self-report" className={styles.ctaButton}>くわしく見る</Link>
      </div>

      <div className={styles.ctaArea}>
        <span className={styles.reportBadge}>📝 子どものための星守り</span>
        <p className={styles.ctaText}>
          子育てのヒントをもっと知りたい方へ。<br/>
          お子様専用の『星守りレポート』で、<br className={styles.spOnly}/>すれ違いの乗りこえ方や、毎日の声かけのコツ、<br className={styles.spOnly}/>才能の伸ばし方をお届けします。
        </p>
        <div className={styles.ctaPriceTag}>¥3,900<span>（税込）</span></div>
        <Link href="/#report" className={styles.ctaButton}>くわしく見る</Link>
      </div>
    </div>
  );
}

export default function CompatibilityPage() {
  const [personA, setPersonA] = useState<PersonResult | null>(null);
  const [personB, setPersonB] = useState<PersonResult | null>(null);
  const [compatResult, setCompatResult] = useState<CompatResult | null>(null);

  const handleCompare = () => {
    if (personA && personB) {
      const result = calculateCompatibility(personA.hoshimoriId, personB.hoshimoriId);
      setCompatResult(result);
    }
  };

  const bothReady = personA && personB;

  return (
    <main className={styles.main}>

      <section className={styles.hero}>
        <h1>星守りなかよし診断</h1>
        <p>
          90体すべての星守りの性格・強み・弱みをもとに<br/>
          ふたりの「なかよし度」をその場で診断するよ！
        </p>
      </section>

      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <PersonForm label="ひとりめ" icon="🌟" onResult={setPersonA} />
            <PersonForm label="ふたりめ" icon="💫" onResult={setPersonB} />
          </div>

          {bothReady && (
            <div className={styles.compareRow}>
              <div className={styles.vsCard}>
                <img src={personA.imageUrl} alt={personA.charName} className={styles.vsImg} />
                <span className={styles.vsName}>{personA.charName}</span>
              </div>
              <button onClick={handleCompare} className={styles.compareBtn}>
                なかよし度を診断する ⭐
              </button>
              <div className={styles.vsCard}>
                <img src={personB.imageUrl} alt={personB.charName} className={styles.vsImg} />
                <span className={styles.vsName}>{personB.charName}</span>
              </div>
            </div>
          )}

          {compatResult && <ResultView result={compatResult} />}
        </div>
      </section>

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
    </main>
  );
}
