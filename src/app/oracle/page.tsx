'use client';

import { useState } from 'react';
import Head from 'next/head';
import { ORACLE_MESSAGES, ORACLE_LINES } from './oracleData';

const ORACLE_PASSWORD = 'hoshimori-secret';

export default function OraclePage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState<typeof ORACLE_MESSAGES[0] | null>(null);
  const [lineResult, setLineResult] = useState<typeof ORACLE_LINES[0] | null>(null);

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
    if (!theme.trim()) {
      alert('お悩みのテーマを入力してください。');
      return;
    }
    
    setIsDrawing(true);
    setResult(null);
    setLineResult(null);

    // シャッフル演出（2秒待つ）
    setTimeout(() => {
      const randomHexIndex = Math.floor(Math.random() * ORACLE_MESSAGES.length);
      const randomLineIndex = Math.floor(Math.random() * ORACLE_LINES.length);
      
      setResult(ORACLE_MESSAGES[randomHexIndex]);
      setLineResult(ORACLE_LINES[randomLineIndex]);
      setIsDrawing(false);
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
        <div className="max-w-md w-full bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700">
          <h1 className="text-2xl font-bold text-center mb-6 text-amber-200">✨ 星守り神託所</h1>
          <p className="text-sm text-slate-300 mb-6 text-center">
            ここは星守りレポート購入者限定の秘密の場所です。<br/>
            レポートに記載されたパスワードを入力してください。
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition-colors"
            >
              扉を開く
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col items-center py-12">
      <Head>
        <title>星守り神託所</title>
      </Head>

      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-amber-200 mb-4">✨ 星守り神託所</h1>
          <p className="text-slate-300">
            星たちは、今のあなたに必要なメッセージを知っています。<br/>
            心の中にある迷いやテーマを一つ入力し、星に尋ねてください。
          </p>
        </div>

        <form onSubmit={handleDraw} className="mb-12 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            今のお悩み・尋ねたいテーマ
          </label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="例：今の仕事はこのまま続けるべき？"
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white mb-4 focus:outline-none focus:border-amber-400"
            disabled={isDrawing}
          />
          <button
            type="submit"
            disabled={isDrawing || !theme.trim()}
            className={`w-full py-4 font-bold rounded-lg transition-all ${
              isDrawing 
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-lg'
            }`}
          >
            {isDrawing ? '✨ 星の声を聴いています...' : '星に尋ねる'}
          </button>
        </form>

        {result && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-amber-500/30 shadow-2xl animate-fade-in">
            <div className="text-center mb-6">
              <span className="text-amber-400 text-sm font-bold tracking-widest uppercase block mb-2">
                星からのメッセージ
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">『{result.title}』</h2>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 mb-6">
              <p className="text-lg leading-relaxed text-slate-200">
                {result.message}
              </p>
            </div>
            
            {lineResult && (
              <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-amber-400 font-bold">✨ {lineResult.lineName}</span>
                  <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-300 rounded-full">
                    {lineResult.stage}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-amber-100/90">
                  {lineResult.message}
                </p>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400 italic">
                「{theme}」について尋ねたあなたへ
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
