'use client';

import { useState } from 'react';
import Head from 'next/head';
import { ORACLE_MESSAGES, ORACLE_STAGES, THEMES, ThemeType } from './oracleData';

const ORACLE_PASSWORD = 'hoshimori-secret';

export default function OraclePage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<ThemeType>('今日の運勢');
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState<typeof ORACLE_MESSAGES[0] | null>(null);
  const [lineResult, setLineResult] = useState<typeof ORACLE_STAGES[0] | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ORACLE_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('パスワードが違います。レポートに記載された合言葉を入力してください。');
    }
  };

  const handleDraw = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    setResult(null);
    setLineResult(null);

    // 星降るシャッフル演出（2.5秒）
    setTimeout(() => {
      const randomHexIndex = Math.floor(Math.random() * ORACLE_MESSAGES.length);
      const randomStageIndex = Math.floor(Math.random() * ORACLE_STAGES.length);
      
      setResult(ORACLE_MESSAGES[randomHexIndex]);
      setLineResult(ORACLE_STAGES[randomStageIndex]);
      setIsDrawing(false);
    }, 2500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a] text-white p-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0a0f1a] to-[#0a0f1a] z-0"></div>
        <div className="relative z-10 max-w-md w-full bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_40px_rgba(139,92,246,0.15)] border border-white/10 transition-transform hover:scale-[1.01] duration-500">
          <div className="text-center mb-8">
            <span className="inline-block text-4xl mb-4 animate-pulse">✨</span>
            <h1 className="text-2xl tracking-widest font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 drop-shadow-md">
              星守り神託所
            </h1>
          </div>
          <p className="text-sm text-indigo-200/80 mb-8 text-center font-light leading-relaxed">
            ここは星の声を聴く者だけが訪れる秘密の場所。<br/>
            あなたに託された合言葉を入力してください。
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワードを入力"
                className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl text-center tracking-[0.2em] text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-amber-700/80 to-amber-600/80 hover:from-amber-600 hover:to-amber-500 text-white font-medium tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] border border-amber-500/30"
            >
              扉を開く
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-4 flex flex-col items-center py-16 relative overflow-x-hidden">
      <Head>
        <title>星守り神託所</title>
      </Head>

      {/* 魔法の背景エフェクト */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl tracking-[0.15em] font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200 mb-6 drop-shadow-lg">
            星守り神託所
          </h1>
          <p className="text-indigo-200/80 font-light leading-loose tracking-wider">
            星たちは、今のあなたに必要なメッセージを知っています。<br/>
            心の中にある迷いを一つ選び、星に尋ねてください。
          </p>
        </div>

        <form onSubmit={handleDraw} className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
            <label className="block text-sm font-medium tracking-widest text-indigo-300 mb-4 text-center">
              今、星に尋ねたいテーマ
            </label>
            <div className="relative mb-8 group">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as ThemeType)}
                disabled={isDrawing}
                className="w-full appearance-none px-6 py-4 bg-black/40 border border-white/10 rounded-xl text-white text-center text-lg tracking-wider focus:outline-none focus:border-amber-400/50 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-white/20"
              >
                {THEMES.map((t) => (
                  <option key={t} value={t} className="bg-slate-900 text-white py-2">
                    {t}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/50 group-hover:text-amber-200 transition-colors">
                ▼
              </div>
            </div>

            <button
              type="submit"
              disabled={isDrawing}
              className={`relative w-full py-5 rounded-xl font-medium tracking-widest transition-all duration-500 overflow-hidden group ${
                isDrawing 
                  ? 'bg-slate-800/80 text-white/40 cursor-not-allowed border border-white/5'
                  : 'bg-gradient-to-r from-amber-700/80 to-amber-500/80 hover:from-amber-600 hover:to-amber-400 text-white border border-amber-400/30 shadow-[0_0_30px_rgba(217,119,6,0.2)] hover:shadow-[0_0_50px_rgba(217,119,6,0.4)]'
              }`}
            >
              {isDrawing && (
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-spin-slow"></div>
              )}
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isDrawing ? (
                  <>
                    <span className="animate-pulse">✨</span> 星の声を聴いています...
                  </>
                ) : (
                  '星に尋ねる'
                )}
              </span>
            </button>
          </div>
        </form>

        {result && lineResult && (
          <div className="bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-amber-500/20 shadow-[0_0_60px_rgba(139,92,246,0.15)] animate-reveal">
            
            {/* メインの神託 */}
            <div className="text-center mb-12">
              <span className="inline-block text-amber-500/60 text-xs font-bold tracking-[0.3em] mb-4 border border-amber-500/30 px-4 py-1 rounded-full">
                {result.hexagram}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-white mb-6 leading-relaxed drop-shadow-md">
                『 {result.title} 』
              </h2>
              <p className="text-lg leading-loose text-indigo-100/90 font-light max-w-lg mx-auto text-justify md:text-center">
                {result.message}
              </p>
            </div>
            
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent my-10"></div>
            
            {/* 季節（段階）の導きとテーマ別アドバイス */}
            <div className="bg-black/20 p-6 md:p-8 rounded-2xl border border-white/5">
              <div className="flex flex-col items-center mb-6">
                <span className="text-amber-300 font-serif text-lg tracking-widest mb-2">
                  {lineResult.stageName}
                </span>
                <p className="text-sm text-indigo-200/70 text-center font-light leading-relaxed">
                  {lineResult.description}
                </p>
              </div>

              <div className="bg-amber-900/10 p-6 rounded-xl border border-amber-500/10 mt-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400/50 to-transparent"></div>
                <div className="mb-2">
                  <span className="text-xs tracking-widest text-amber-500/80 font-bold">
                    【 {theme} 】への導き
                  </span>
                </div>
                <p className="text-base md:text-lg leading-loose text-amber-50 font-light">
                  {lineResult.themes[theme]}
                </p>
              </div>
            </div>
            
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-reveal {
          animation: reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes reveal {
          0% { opacity: 0; transform: scale(0.98) translateY(20px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
