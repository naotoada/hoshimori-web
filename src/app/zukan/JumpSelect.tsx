'use client';

import styles from './page.module.css';

export default function JumpSelect() {
  const options = [
    { value: '', label: '星から選ぶ' },
    { value: '水の星', label: '💧 水の星' },
    { value: '大地の星', label: '🌍 大地の星' },
    { value: '雷の星', label: '⚡️ 雷の星' },
    { value: '風の星', label: '🍃 風の星' },
    { value: '帝の星', label: '👑 帝の星' },
    { value: '天の星', label: '🌌 天の星' },
    { value: '果実の星', label: '🍎 果実の星' },
    { value: '山の星', label: '🏔️ 山の星' },
    { value: '火の星', label: '🔥 火の星' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetId = e.target.value;
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        // Adjust for the sticky header (approx 70px + some padding)
        const yOffset = -90; 
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.location.hash = targetId;
      }
      // Reset the select so it can be used again
      e.target.value = '';
    }
  };

  return (
    <select className={styles.jumpSelect} onChange={handleChange} defaultValue="" aria-label="星から選ぶ">
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
