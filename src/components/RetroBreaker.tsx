
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Terminal, AlertTriangle, Cpu, Lock, Activity } from 'lucide-react';

const RetroBreaker: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [solvedChars, setSolvedChars] = useState<string[]>(new Array(8).fill('*'));
  const [grid, setGrid] = useState<string[][]>([]);
  const targetPassword = "5 9 F K 8 2 X 1".split(' ');

  // Initialize and update the character grid
  useEffect(() => {
    const rows = 10; // Reduced rows
    const cols = 18; // Reduced columns
    const interval = setInterval(() => {
      const newGrid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.random() > 0.5 ? '1' : '0')
      );
      setGrid(newGrid);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Solve password logic
  useEffect(() => {
    const solveInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(solveInterval);
          return 100;
        }
        return p + 0.6;
      });
    }, 100);

    return () => clearInterval(solveInterval);
  }, []);

  useEffect(() => {
    const index = Math.floor((progress / 100) * targetPassword.length);
    setSolvedChars(prev => {
      const next = [...prev];
      for (let i = 0; i < index; i++) {
        next[i] = targetPassword[i];
      }
      return next;
    });
  }, [progress]);

  return (
    <div className="h-full bg-black text-[#00ff41] font-mono relative overflow-hidden flex flex-col p-2 border-2 border-[#00ff41]/20 select-none">
      {/* Background Matrix-style Code (Subtle) */}
      <div className="absolute inset-0 opacity-5 text-[7px] pointer-events-none p-2 leading-tight overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            01010110101010101011010101010101011010101111000101011101010101
            SYS_INIT_SEQUENCE_BLOCK_{i}_LOADED_SUCCESSFULLY_CHECKSUM_0x{i.toString(16)}
          </div>
        ))}
      </div>

      {/* 1. Header Area - Slim */}
      <div className="z-10 flex justify-between items-center border-b border-[#00ff41]/20 pb-1 mb-1">
        <div className="flex items-center gap-3">
          <div className="bg-[#00ff41] text-black px-1.5 py-0.5 text-[8px] font-black uppercase">Secure_Link</div>
          <span className="text-[9px] opacity-40 font-bold uppercase tracking-widest">v3.2.6-Legacy-Override</span>
        </div>
        <div className="flex items-center gap-4 text-[9px] opacity-60">
           <span className="flex items-center gap-1"><Cpu size={10} /> Load: 44%</span>
           <span className="flex items-center gap-1 text-[#00ff41] animate-pulse"><Activity size={10} /> Link: Stable</span>
        </div>
      </div>

      {/* 2. Main Content Area - Centered Console */}
      <div className="flex-1 relative flex items-center justify-center min-h-0 overflow-hidden">
        {/* The Decryption Window */}
        <div className="relative w-full max-w-lg bg-[#0d0208] border-[1px] border-[#00ff41]/40 shadow-[0_0_40px_rgba(0,255,65,0.1)] p-3 flex flex-col items-center animate-in zoom-in duration-500">
          
          {/* Internal Title Bar */}
          <div className="w-full flex justify-between items-center bg-[#00ff41]/10 px-2 py-0.5 border-b border-[#00ff41]/20 mb-3">
             <span className="text-[8px] font-bold text-[#00ff41] uppercase">Buffer_Decryptor_Node_77</span>
             <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-yellow-500/50 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full"></div>
             </div>
          </div>

          {/* Grid visualizer - Smaller cells */}
          <div className="grid grid-cols-18 gap-[1px] opacity-50 mb-4 scale-90 sm:scale-100">
            {grid.map((row, i) => (
              row.map((cell, j) => (
                <div 
                  key={`${i}-${j}`} 
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-[6px] flex items-center justify-center transition-colors duration-300 ${cell === '1' ? 'bg-[#00ff41] text-black' : 'text-[#00ff41]/20'}`}
                >
                  {cell}
                </div>
              ))
            ))}
          </div>

          {/* Password Display Box */}
          <div className="w-full bg-black border border-[#00ff41]/30 p-3 flex flex-col items-center gap-1 shadow-[inset_0_0_20px_rgba(0,255,65,0.05)]">
             <div className="text-2xl sm:text-3xl font-black tracking-[0.4em] text-white glow-text animate-in fade-in">
                {solvedChars.join(' ')}
             </div>
             <div className="text-[7px] uppercase tracking-[0.8em] font-bold opacity-40">
                {progress < 100 ? `Searching Hash Space... ${progress.toFixed(0)}%` : 'Sequence Verified'}
             </div>
          </div>

          {/* Progress Bar - Thin */}
          <div className="w-full h-1 bg-[#003b00] mt-4 rounded-full overflow-hidden border border-[#00ff41]/10">
             <div 
               className="h-full bg-[#00ff41] shadow-[0_0_10px_#00ff41] transition-all duration-200" 
               style={{ width: `${progress}%` }}
             ></div>
          </div>

          {/* Side HUD stats INSIDE the window to save screen space */}
          <div className="w-full flex justify-between mt-3 px-1">
             <div className="flex flex-col gap-0.5">
                <span className="text-[6px] text-white/30 uppercase">Entropy</span>
                <span className="text-[8px] font-bold">0.9982</span>
             </div>
             <div className="flex flex-col items-end gap-0.5">
                <span className="text-[6px] text-white/30 uppercase">ID_Sign</span>
                <span className="text-[8px] font-bold">0x7F2A</span>
             </div>
          </div>

          {/* Success Overlay - Instant view */}
          {progress >= 100 && (
            <div className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
               <ShieldCheck size={40} className="text-[#00ff41] animate-bounce mb-2" />
               <h2 className="text-lg font-black uppercase tracking-[0.3em] glow-text">Access Granted</h2>
               <p className="text-[8px] opacity-60 uppercase tracking-widest mt-1">Local_Root_Node_Captured</p>
               <button 
                 onClick={() => window.location.reload()}
                 className="mt-4 px-4 py-1.5 border border-[#00ff41] text-[#00ff41] text-[9px] font-bold uppercase hover:bg-[#00ff41] hover:text-black transition-all"
               >
                 Acknowledge
               </button>
            </div>
          )}
        </div>

        {/* Outer UI Garnish (Left/Right panels) - Hidden on small heights */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-40">
           <div className="flex flex-col gap-1 border-l border-[#00ff41]/30 pl-3">
              <span className="text-[7px] uppercase font-bold text-white/40">Packet_Stream</span>
              <div className="flex gap-1">
                 {[...Array(4)].map((_, i) => <div key={i} className="w-1.5 h-3 bg-[#00ff41]/20 animate-pulse" style={{ animationDelay: `${i*0.2}s` }}></div>)}
              </div>
           </div>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-40 text-right">
           <div className="flex flex-col gap-1 border-r border-[#00ff41]/30 pr-3">
              <span className="text-[7px] uppercase font-bold text-white/40">Encryption_Level</span>
              <span className="text-[9px] font-bold">SHA-512_HYBRID</span>
           </div>
        </div>
      </div>

      {/* 3. Footer Area - Slim and Static */}
      <div className="z-10 border-t border-[#00ff41]/20 pt-1 flex justify-between items-center text-[8px] font-bold uppercase tracking-widest opacity-60">
        <div className="flex gap-6">
           <span>Node: PROXIMA_001</span>
           <span>IP: 10.0.92.112</span>
        </div>
        <div className="flex items-center gap-2">
           <AlertTriangle size={10} className="text-yellow-500 animate-pulse" />
           <span>Security: High_Risk</span>
        </div>
      </div>
    </div>
  );
};

export default RetroBreaker;
