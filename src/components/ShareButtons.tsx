'use client';

import { useState } from 'react';
import styles from './ShareButtons.module.css';

interface Props {
  text: string;
  url: string;
  hashtags?: string[];
}

export default function ShareButtons({ text, url, hashtags = ['星守り'] }: Props) {
  const [copied, setCopied] = useState(false);

  // X (Twitter) Share URL
  const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags.join(',')}`;

  // Native Web Share API (For Instagram, LINE, etc. on Mobile)
  const handleNativeShare = async () => {
    const shareData = {
      title: '星守り（ほしもり）',
      text: `${text}\n#${hashtags.join(' #')}`,
      url: url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User canceled or error occurred
        console.log('Share canceled or failed:', err);
      }
    } else {
      // Fallback: Copy to clipboard for PC or unsupported browsers
      const copyText = `${shareData.text}\n${shareData.url}`;
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>結果をみんなにシェアする</h3>
      <div className={styles.buttons}>
        <a href={xUrl} target="_blank" rel="noopener noreferrer" className={styles.xButton}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X でポスト
        </a>

        <button onClick={handleNativeShare} className={styles.igButton}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          {copied ? 'コピーしました！' : 'Instagram / その他'}
        </button>
      </div>
    </div>
  );
}
