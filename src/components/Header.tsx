'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // ゲーム画面では全体ヘッダーを非表示にする
  if (pathname?.startsWith('/guide/game')) {
    return null;
  }

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoIcon}>⭐</span>
              <span className={styles.logoMain}>星守り</span>
              <span className={styles.logoSub}>- HOSHIMORI -</span>
            </a>
            <button
              className={`${styles.menuButton} ${isOpen ? styles.menuOpen : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="メニュー"
            >
              <span className={styles.menuBar}></span>
              <span className={styles.menuBar}></span>
              <span className={styles.menuBar}></span>
            </button>
          </div>
        </div>
      </header>
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <nav className={styles.menu} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="閉じる">
              ✕
            </button>
            <Link href="/#diagnosis" className={styles.menuLink} onClick={handleLinkClick}>
              🔍 星守りを調べる
            </Link>
            <Link href="/compatibility" className={styles.menuLink} onClick={handleLinkClick}>
              ⭐ なかよし診断
            </Link>
            <Link href="/zukan" className={styles.menuLink} onClick={handleLinkClick}>
              📚 星守り図鑑
            </Link>
            <Link href="/#self-report" className={styles.menuLink} onClick={handleLinkClick}>
              📝 星守りレポート
            </Link>
            <Link href="/oracle" className={styles.menuLink} onClick={handleLinkClick}>
              🏛️ 星守り神託所
            </Link>
            <Link href="/guide" className={styles.menuLink} onClick={handleLinkClick}>
              💫 星守りの導き
            </Link>
            <a
              href="https://suzuri.jp/hoshimori-official"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.menuLink}
              onClick={handleLinkClick}
            >
              🛒 公式グッズ
            </a>
            <Link href="/#faq" className={styles.menuLink} onClick={handleLinkClick}>
              ❓ よくある質問
            </Link>
            <a
              href="https://lin.ee/9MSmxO1x"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.menuLinkLine}
              onClick={handleLinkClick}
            >
              💬 公式LINE
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
