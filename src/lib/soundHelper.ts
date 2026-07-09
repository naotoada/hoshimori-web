// WebAudio API による効果音動的シンセサイズヘルパー
let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(
  freqs: number[], 
  duration: number, 
  type: OscillatorType = 'sine', 
  delay = 0,
  sweepFreq?: number
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  // ブラウザのセキュリティポリシー対策（ユーザー操作に紐づいて再生）
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  
  if (freqs.length > 0) {
    osc.frequency.setValueAtTime(freqs[0], now);
    if (sweepFreq) {
      osc.frequency.exponentialRampToValueAtTime(sweepFreq, now + duration);
    }
  }

  // 優しい音量に設定
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
}

export const playSE = {
  // AudioContextの活性化（ユーザージェスチャー内で呼ぶ）
  init: () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  },

  // 星などをタップした時 (ピキッという澄んだ高音)
  tap: () => {
    playTone([1000], 0.08, 'sine', 0, 1500);
  },
  
  // スロットが止まった時 (コッというリール停止音)
  stop: () => {
    playTone([400], 0.05, 'triangle', 0, 150);
  },

  // ミスした時 (ブッという短い低警告音)
  miss: () => {
    playTone([180], 0.22, 'sawtooth', 0, 80);
  },

  // クリアした時 (タラララララ〜ン！という輝かしいアルペジオ)
  clear: () => {
    const tones = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    tones.forEach((freq, index) => {
      playTone([freq], 0.35, 'sine', index * 0.06);
    });
  },

  // 大当たりした時 (ジャラジャラ！ピキーン！というファンファーレ)
  jackpot: () => {
    const tones = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
    tones.forEach((freq, index) => {
      playTone([freq], 0.25, 'triangle', index * 0.05);
    });
    // 追撃の高音きらめき
    setTimeout(() => {
      playTone([1567.98], 0.5, 'sine', 0, 2800);
    }, 350);
  }
};
