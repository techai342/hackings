
import React, { useState, useEffect } from 'react';
import { Activity, Database, Zap, ShieldCheck, Microscope, Layers, Search, Info } from 'lucide-react';

const DNASequencer: React.FC = () => {
  const [pulse, setPulse] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 0.1) % (Math.PI * 2));
      setRotation(r => (r + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-black text-[#22d3ee] font-mono flex flex-col p-2 lg:p-4 gap-4 overflow-hidden relative select-none uppercase border-2 border-[#22d3ee]/20">
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(34,211,238,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.2)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

      {/* 1. Header Navigation Bar (Slim) */}
      <div className="h-10 border-b border-[#22d3ee]/30 flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <Microscope size={16} className="text-white" />
              <span className="text-[10px] font-black tracking-widest text-white">STEREOSCOPIC MAGNIFICATION x10,000</span>
           </div>
           <div className="text-[9px] opacity-40">REGRESSIVE PREDICTION VALUE: 29.89 2487 07CB</div>
        </div>
        <div className="flex items-center gap-4 text-[9px] opacity-60">
           <span>DEPTH_OPTICAL_TRAJECTORY: 0.2A4 TT7C C30T</span>
           <div className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse"></div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* LEFT PANEL: VITALS & QRS */}
        <div className="col-span-2 flex flex-col gap-4">
           <div className="flex-1 border border-[#22d3ee]/30 bg-[#22d3ee]/5 p-3 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-[#22d3ee]/20 pb-2">
                 <span className="text-[10px] font-black">QRS: VITALS 04</span>
                 <Activity size={12} className="text-white/40" />
              </div>
              <div className="flex-1 flex items-end gap-[1px]">
                 {[...Array(15)].map((_, i) => (
                   <div 
                     key={i} 
                     className="flex-1 bg-[#22d3ee]/20 relative"
                     style={{ height: `${30 + Math.random() * 70}%` }}
                   >
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#22d3ee]"></div>
                   </div>
                 ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                 <div className="p-1 border border-[#22d3ee]/20 text-center">
                    <div className="text-[8px] opacity-40">M2</div>
                    <div className="text-xs font-bold">88</div>
                 </div>
                 <div className="p-1 border border-[#22d3ee]/20 text-center bg-[#22d3ee]/10">
                    <div className="text-[8px] opacity-40">DD</div>
                    <div className="text-xs font-bold">TRK</div>
                 </div>
              </div>
           </div>
        </div>

        {/* CENTER PANEL: THE R-DNA SEQUENCER */}
        <div className="col-span-7 border-x border-[#22d3ee]/20 flex gap-4 p-4 min-h-0">
           {/* Section N67: DNA Helix */}
           <div className="flex-1 flex flex-col relative">
              <div className="flex items-start justify-between mb-4">
                 <div className="bg-white text-black px-2 py-1 text-xl font-black">N67</div>
                 <div className="text-right flex flex-col">
                    <span className="text-[8px] opacity-40">STEREOSCOPIC_MAGNIFICATION_x10,000</span>
                    <span className="text-[8px] opacity-40">REGRESSIVE_PREDICTION_VALUE: 29.89 2487 07CB</span>
                 </div>
              </div>
              
              <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                 <svg viewBox="0 0 100 200" className="h-full w-auto">
                    {[...Array(20)].map((_, i) => {
                      const y = 10 + i * 9;
                      const phase = (rotation / 20) + i * 0.5;
                      const x1 = 50 + Math.sin(phase) * 20;
                      const x2 = 50 - Math.sin(phase) * 20;
                      const z = Math.cos(phase);
                      const opacity = 0.3 + (z + 1) * 0.35;
                      const r = 3 + z * 1.5;

                      return (
                        <g key={i} style={{ opacity }}>
                           <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeWidth="0.5" />
                           <circle cx={x1} cy={y} r={r} fill="currentColor" />
                           <circle cx={x2} cy={y} r={r} fill="currentColor" className="opacity-60" />
                        </g>
                      );
                    })}
                 </svg>
                 {/* Scanline Highlight */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22d3ee]/10 to-transparent h-1/4 w-full animate-scanline-fast pointer-events-none"></div>
              </div>
           </div>

           {/* Sequencer Metadata & Waves */}
           <div className="w-1/3 flex flex-col gap-4 border-l border-[#22d3ee]/20 pl-4">
              <div className="text-right">
                 <h2 className="text-2xl font-black tracking-widest text-white leading-tight">R-DNA<br/>SEQUENCER</h2>
                 <div className="text-[8px] opacity-40 mt-1">GENETIC_OPTICAL_TRAJECTORY_DATA_LOCK</div>
              </div>
              
              <div className="flex-1 flex flex-col gap-4">
                 {/* Vertical Frequency Wave */}
                 <div className="flex-1 border border-[#22d3ee]/10 bg-black/40 relative overflow-hidden">
                    <svg viewBox="0 0 40 200" className="w-full h-full opacity-60">
                       <path 
                         d={`M20 0 ${[...Array(40)].map((_, i) => `L${20 + Math.sin(pulse*2 + i)*10} ${i*5}`).join(' ')}`} 
                         fill="none" 
                         stroke="currentColor" 
                         strokeWidth="0.5"
                       />
                       <path 
                         d={`M20 0 ${[...Array(40)].map((_, i) => `L${20 + Math.cos(pulse + i)*6} ${i*5}`).join(' ')}`} 
                         fill="none" 
                         stroke="currentColor" 
                         strokeWidth="1"
                         className="opacity-40"
                       />
                    </svg>
                 </div>
                 {/* Status Ticker */}
                 <div className="h-10 grid grid-cols-4 gap-1">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className={`bg-[#22d3ee] transition-all duration-300 ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-10'}`}></div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT PANEL: DATA LOCKS & LOGS */}
        <div className="col-span-3 flex flex-col gap-4">
           {/* BN 03 / LK Blocks */}
           <div className="grid grid-cols-2 gap-4 h-32">
              <div className="border border-[#22d3ee]/30 p-2 flex flex-col">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black bg-[#22d3ee]/20 px-1">BN</span>
                    <span className="text-xl font-black">03</span>
                 </div>
                 <div className="flex-1 flex items-center justify-center opacity-40">
                    <Search size={24} />
                 </div>
              </div>
              <div className="border border-[#22d3ee]/30 p-2 flex flex-col bg-[#22d3ee]/5">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black bg-[#22d3ee]/20 px-1">LK</span>
                    <Layers size={12} className="opacity-40" />
                 </div>
                 <div className="flex-1 flex flex-col justify-around">
                    <div className="h-1 w-full bg-[#22d3ee]/40"></div>
                    <div className="h-1 w-2/3 bg-[#22d3ee]/40 ml-auto"></div>
                    <div className="h-1 w-full bg-[#22d3ee]/40"></div>
                 </div>
              </div>
           </div>

           {/* Vertical Data Bars Block */}
           <div className="flex-1 border border-[#22d3ee]/30 p-4 flex flex-col gap-2 relative">
              <div className="absolute top-1 right-2 text-[8px] opacity-20">DATA_RECOVERY_MOD_X</div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-1">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="h-1 bg-[#22d3ee]/20 relative">
                         <div className="absolute left-0 h-full bg-[#22d3ee]" style={{ width: `${Math.random() * 100}%` }}></div>
                      </div>
                    ))}
                 </div>
                 <div className="flex flex-col gap-1">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="h-1 bg-[#22d3ee]/20 relative">
                         <div className="absolute right-0 h-full bg-[#22d3ee]" style={{ width: `${Math.random() * 100}%` }}></div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* LK1 Result Panel */}
           <div className="h-56 bg-white/5 border border-[#22d3ee]/40 p-4 flex gap-4">
              <div className="flex flex-col justify-between h-full py-2">
                 <div className="bg-[#22d3ee] text-black px-1 text-xs font-black">LK1</div>
                 <div className="flex flex-col gap-1">
                    {[...Array(8)].map((_, i) => <div key={i} className="w-4 h-1 bg-[#22d3ee]/30"></div>)}
                 </div>
              </div>
              <div className="flex-1 flex flex-col justify-between text-right">
                 {[12, 31, 42, 68, 90].map(val => (
                   <div key={val} className="flex flex-col border-b border-[#22d3ee]/10 pb-1">
                      <span className="text-xl font-black text-white">{val}</span>
                      <div className="flex justify-end gap-1">
                         {[...Array(4)].map((_, i) => <div key={i} className="w-1 h-1 bg-[#22d3ee]/40"></div>)}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Footer Interface Status */}
      <div className="h-8 border-t border-[#22d3ee]/20 flex items-center px-4 justify-between text-[8px] font-black tracking-widest opacity-60">
         <div className="flex gap-10">
            <span>UPLINK: RE-DNA_SYNC_ACTIVE</span>
            <span>NODE_ADDR: 0x992B-X1-STEREOSCOPIC</span>
         </div>
         <div className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-[#00ff41]" />
            <span>PROTECTION: QUANTUM_CELL_CRYPTO</span>
         </div>
      </div>
    </div>
  );
};

export default DNASequencer;
