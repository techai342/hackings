
import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, ShieldAlert, Zap, Terminal } from 'lucide-react';

interface SystemOverrideProps {
  onBack: () => void;
}

const SystemOverride: React.FC<SystemOverrideProps> = ({ onBack }) => {
  const [stage, setStage] = useState<'BINARY' | 'TRANSFER' | 'HACKED'>('BINARY');
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stage 1: Intensive Binary Rain
  useEffect(() => {
    if (stage !== 'BINARY') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const columns = Math.floor(canvas.width / 20);
    const drops = new Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = '20px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 30);
    const timer = setTimeout(() => setStage('TRANSFER'), 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [stage]);

  // Stage 2: Fast Data Transfer
  useEffect(() => {
    if (stage !== 'TRANSFER') return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setStage('HACKED'), 1000);
          return 100;
        }
        return p + 2.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="fixed inset-0 z-[150] bg-black flex flex-col items-center justify-center overflow-hidden font-mono">
      {stage === 'BINARY' && (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
          <div className="relative z-10 bg-black/80 p-8 border border-green-500 animate-pulse">
            <h1 className="text-4xl font-black text-green-500 tracking-[0.5em] uppercase">Injecting Payload...</h1>
            <div className="mt-4 text-green-500/60 text-xs">BYPASSING_CORE_ICE // SECTOR_7_GATEWAY_OPEN</div>
          </div>
        </>
      )}

      {stage === 'TRANSFER' && (
        <div className="w-full max-w-2xl p-12 bg-[#0d0208] border-2 border-cyan-500/30 rounded-lg shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-in fade-in zoom-in">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 text-cyan-400">
              <Zap className="animate-bounce" />
              <span className="text-xl font-black tracking-widest uppercase">Exfiltrating Data</span>
            </div>
            <span className="text-cyan-400 font-bold">{progress.toFixed(0)}%</span>
          </div>
          
          <div className="grid grid-cols-10 gap-2 mb-8">
            {[...Array(30)].map((_, i) => (
              <div 
                key={i} 
                className={`h-4 rounded-sm transition-all duration-300 ${
                  progress > (i / 30) * 100 ? 'bg-cyan-500 shadow-[0_0_10px_cyan]' : 'bg-cyan-900/20'
                }`}
              />
            ))}
          </div>

          <div className="space-y-2 text-[10px] text-cyan-500/40 uppercase">
             <div className="flex justify-between"><span>Packet_ID: 0x77AF</span><span>Status: OK</span></div>
             <div className="flex justify-between"><span>Relay_Node: LONDON_SUB_4</span><span>Latency: 4ms</span></div>
             <div className="flex justify-between"><span>Encryption: CRACKED</span><span>Entropy: NULL</span></div>
          </div>
        </div>
      )}

      {stage === 'HACKED' && (
        <div className="fixed inset-0 bg-[#1a0000] flex flex-col items-center justify-center animate-[shake_0.2s_infinite]">
          {/* Glitch Background Effect */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-red-900/40 pointer-events-none"></div>
          
          <div className="relative flex flex-col items-center gap-6 animate-in zoom-in duration-300">
            {/* Red Warning Triangle */}
            <div className="relative mb-4">
              <div className="text-red-600 drop-shadow-[0_0_20px_red]">
                <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
                  <path d="M100 20L185 165H15L100 20Z" stroke="currentColor" strokeWidth="12" />
                  <rect x="92" y="70" width="16" height="50" fill="currentColor" />
                  <rect x="92" y="130" width="16" height="16" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Hacked Text */}
            <div className="text-center space-y-2">
              <h1 className="text-7xl font-black text-white tracking-widest drop-shadow-[0_0_30px_white] uppercase">SYSTEM</h1>
              <h1 className="text-7xl font-black text-white tracking-widest drop-shadow-[0_0_30px_white] uppercase">HACKED</h1>
            </div>

            <div className="mt-12 text-red-500 font-mono text-sm tracking-[0.5em] animate-pulse">
              ACCESS_GRANTED // ROOT_PRIVILEGES_OBTAINED
            </div>

            <button 
              onClick={onBack}
              className="mt-12 px-10 py-3 bg-red-600 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all border-2 border-white/20"
            >
              Return to Terminal
            </button>
          </div>

          {/* Scrolling Red Code Background */}
          <div className="absolute inset-y-0 left-4 w-48 font-mono text-[8px] text-red-600/20 overflow-hidden leading-tight pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div key={i}>0101101010111100010101101010101101010111</div>
            ))}
          </div>
          <div className="absolute inset-y-0 right-4 w-48 font-mono text-[8px] text-red-600/20 overflow-hidden leading-tight pointer-events-none text-right">
            {[...Array(50)].map((_, i) => (
              <div key={i}>0101101010111100010101101010101101010111</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemOverride;
