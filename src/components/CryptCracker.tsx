
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Lock, Unlock, Zap, Activity, AlertTriangle, Key, Search, Database } from 'lucide-react';

const CryptCracker: React.FC = () => {
  const [targetHash, setTargetHash] = useState('0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase());
  const [crackedChars, setCrackedChars] = useState<string[]>(new Array(34).fill('?'));
  const [progress, setProgress] = useState(0);
  const [isCracking, setIsCracking] = useState(false);
  const [metrics, setMetrics] = useState({ entropy: 0, heuristics: 0, salts: 0 });

  const startCracking = () => {
    setIsCracking(true);
    setProgress(0);
    setCrackedChars(new Array(targetHash.length).fill('?'));
  };

  useEffect(() => {
    if (!isCracking) return;

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setIsCracking(false);
          setCrackedChars(targetHash.split(''));
          return 100;
        }
        return p + 0.5;
      });

      setMetrics({
        entropy: Math.random() * 100,
        heuristics: Math.random() * 100,
        salts: Math.floor(Math.random() * 4102)
      });

      setCrackedChars(prev => {
        return prev.map((char, i) => {
          if (progress >= (i / targetHash.length) * 100) return targetHash[i];
          return "0123456789ABCDEF"[Math.floor(Math.random() * 16)];
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isCracking, progress, targetHash]);

  return (
    <div className="flex-1 flex flex-col gap-4 animate-in fade-in zoom-in duration-700 h-full overflow-hidden p-2 lg:p-4 bg-[#050505]">
      {/* Header HUD */}
      <div className="bg-[#0d0208] border border-red-600/30 p-5 rounded-lg flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-red-600/10 rounded-full border border-red-600/20">
            <Key size={26} className="text-red-500 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.5em] glow-text text-red-500">Heuristic CryptCracker v9.0</h2>
            <div className="text-[9px] font-mono text-red-500/40 uppercase tracking-widest mt-1">Algorithm: SHA-512_HYBRID // Mode: DISTRIBUTED_BRUTE</div>
          </div>
        </div>
        <button 
          onClick={startCracking}
          disabled={isCracking}
          className={`px-6 py-2 border font-mono text-[11px] uppercase tracking-[0.3em] transition-all ${isCracking ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' : 'bg-[#00ff41]/10 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black shadow-[0_0_15px_#00ff41]/20'}`}
        >
          {isCracking ? 'DECODING...' : 'INITIATE CRACK'}
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Main Display: Hash Cracker */}
        <div className="flex-[2] bg-black border border-white/5 rounded-lg relative overflow-hidden flex flex-col items-center justify-center p-8 shadow-inner">
           {/* Depth Grid Lines */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(#ef4444_1px,transparent_1px),linear-gradient(90deg,#ef4444_1px,transparent_1px)] bg-[length:50px_50px]"></div>

           <div className="relative z-10 w-full flex flex-col items-center gap-12">
              <div className="text-center">
                 <div className="text-[10px] font-black text-red-500/60 uppercase tracking-[0.5em] mb-4">Target Encryption Block</div>
                 <div className="flex flex-wrap justify-center gap-1 max-w-2xl">
                    {crackedChars.map((char, i) => (
                      <div 
                        key={i} 
                        className={`w-8 h-10 border flex items-center justify-center font-mono text-lg rounded transition-all duration-300 ${
                          progress >= (i / targetHash.length) * 100 
                            ? 'bg-red-500/20 border-red-500 text-white shadow-[0_0_10px_red]' 
                            : 'bg-white/5 border-white/10 text-white/20'
                        }`}
                      >
                        {char}
                      </div>
                    ))}
                 </div>
              </div>

              <div className="w-full max-w-xl space-y-4">
                 <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Global Progress</span>
                       <span className="text-2xl font-black text-white glow-text">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="text-right flex flex-col">
                       <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Time Remaining</span>
                       <span className="text-xl font-mono text-red-500">00:04:12:88</span>
                    </div>
                 </div>
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                    <div className="h-full bg-red-500 shadow-[0_0_15px_red] transition-all duration-100" style={{ width: `${progress}%` }}></div>
                 </div>
              </div>
           </div>

           {/* Animated Radar Sweep Overlay */}
           <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-red-500/5 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-1/2 w-full animate-scanline-fast"></div>
           </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="flex-1 flex flex-col gap-4 w-full lg:w-[350px]">
           <div className="bg-[#0d0208] border border-white/5 p-6 rounded-lg flex-1 flex flex-col gap-8 shadow-xl">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-red-500 flex items-center gap-2">
                 <Activity size={16} /> Decryption Analytics
              </h3>
              
              <div className="space-y-6">
                 {[
                   { label: 'Entropy Reduction', val: metrics.entropy, color: 'bg-red-500' },
                   { label: 'Heuristic Probability', val: metrics.heuristics, color: 'bg-yellow-500' },
                   { label: 'Salt Re-Injection', val: (metrics.salts / 4102) * 100, color: 'bg-cyan-500' }
                 ].map((m, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-white/60">
                         <span>{m.label}</span>
                         <span>{m.val.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full ${m.color} transition-all duration-500`} style={{ width: `${m.val}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="mt-auto p-4 bg-red-950/20 border border-red-900/40 rounded flex items-center gap-3">
                 <AlertTriangle size={18} className="text-red-500 shrink-0" />
                 <div className="text-[9px] font-mono text-white/40 uppercase leading-tight">
                    Warning: Computational temperature at 84°C. Cooling systems engaged.
                 </div>
              </div>
           </div>

           <div className="bg-[#050505] border border-white/5 p-5 rounded-lg grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 border-l-2 border-red-500 pl-3">
                 <span className="text-[8px] font-black text-white/30 uppercase">Hashes/sec</span>
                 <span className="text-lg font-black text-white">41.2M</span>
              </div>
              <div className="flex flex-col gap-1 border-l-2 border-yellow-500 pl-3">
                 <span className="text-[8px] font-black text-white/30 uppercase">Complexity</span>
                 <span className="text-lg font-black text-white">E-14</span>
              </div>
           </div>
        </div>
      </div>

      {/* Global Tactics Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Decryption State', val: isCracking ? 'ACTIVE' : 'IDLE', icon: ShieldCheck, color: 'text-red-500' },
          { label: 'CPU Usage', val: '98.4%', icon: Cpu, color: 'text-cyan-400' },
          { label: 'Database Link', val: 'VERIFIED', icon: Database, color: 'text-[#00ff41]' },
          { label: 'Encryption Type', val: 'X-VULNERABLE', icon: Search, color: 'text-white' }
        ].map((item, i) => (
          <div key={i} className="bg-[#0d0208] border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:border-red-500/40 transition-all cursor-default">
            <item.icon size={20} className={item.color} />
            <div className="flex flex-col">
              <span className="text-[8px] text-white/30 uppercase font-black tracking-widest">{item.label}</span>
              <span className={`text-xs font-mono font-bold uppercase ${item.color}`}>{item.val}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptCracker;
