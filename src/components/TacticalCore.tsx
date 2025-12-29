
import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Zap, Radio, Target, Terminal, Maximize2 } from 'lucide-react';

const TacticalCore: React.FC = () => {
  const [pulse, setPulse] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [matrixStates, setMatrixStates] = useState<boolean[]>(new Array(25).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
      
      // Update random matrix state
      setMatrixStates(prev => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * 25);
        next[idx] = !next[idx];
        return next;
      });

      // Add dummy logs
      const logOptions = [
        "> PDQ_SBM_ZON: 18.2",
        "> STATIC_CBYTE: OK",
        "> KDM_NWD: SYNC",
        "> TRAP_LISTBOT: BUSY",
        "> HP/UX_VER: 9.2",
        "> SAVE_FILE: AUTO",
        "> RYS_DIF: EA-0CAE",
        "> BETA_INIT: READY"
      ];
      setLogs(prev => [logOptions[Math.floor(Math.random() * logOptions.length)], ...prev].slice(0, 18));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const matrixLabels = ["YNA", "NWK", "OHB", "RFV", "RLV", "FHL", "KTV", "ODT", "UIC", "IYO", "SUR", "CGB", "QYL", "HTP", "TVE", "PJM", "UHZ", "YVA", "HMU", "POP", "BXT", "ZPR", "TRQ", "NMX", "VLY"];

  return (
    <div className="flex-1 bg-black text-[#00ff41] font-mono flex flex-col p-2 gap-2 border-2 border-[#00ff41]/40 overflow-hidden relative select-none uppercase">
      {/* 1. Header Row */}
      <div className="grid grid-cols-12 gap-2 h-44 shrink-0">
        {/* Module: Vertical Gauge */}
        <div className="col-span-2 border border-[#00ff41]/30 p-2 flex flex-col items-center justify-center relative">
          <div className="absolute top-1 left-2 text-[7px] opacity-40">G_REF_BLOCK</div>
          <div className="flex items-center gap-4 h-full">
            <div className="flex flex-col justify-between text-[10px] h-full py-2">
              {[0, 1, 2, 3, 4, 5].map(v => <div key={v} className="w-4 h-4 rounded-full border border-[#00ff41] flex items-center justify-center text-[8px]">{v}</div>)}
            </div>
            <div className="w-[1px] h-full bg-[#00ff41]/20 relative">
               <div className="absolute w-6 h-[1px] bg-[#00ff41] left-1/2 -translate-x-1/2 transition-all duration-300 shadow-[0_0_10px_#00ff41]" style={{ top: `${pulse}%` }}></div>
            </div>
            <div className="flex flex-col justify-between text-[10px] h-full py-2">
              {[0, 1, 2, 3, 4, 5].map(v => <div key={v} className="w-4 h-4 rounded-full border border-[#00ff41] flex items-center justify-center text-[8px]">{v}</div>)}
            </div>
          </div>
        </div>

        {/* Module: Main Graphs */}
        <div className="col-span-7 grid grid-rows-2 gap-2">
           <div className="border border-[#00ff41]/30 relative flex items-center justify-center overflow-hidden">
              <div className="absolute top-1 left-2 text-[7px] opacity-40">SLUGGISH_PLENUM_LAMINATION</div>
              <svg viewBox="0 0 400 60" className="w-full h-full opacity-80">
                 <path 
                   d={`M0 30 ${[...Array(15)].map((_, i) => `L${i*30} ${30 + (i%2 === 0 ? -15 : 15) + (Math.sin(pulse/10 + i)*5)}`).join(' ')}`} 
                   fill="none" 
                   stroke="#00ff41" 
                   strokeWidth="1.5"
                 />
                 <path 
                   d={`M0 30 ${[...Array(15)].map((_, i) => `L${i*30} ${30 + (i%2 === 0 ? 10 : -10) + (Math.cos(pulse/10 + i)*3)}`).join(' ')}`} 
                   fill="none" 
                   stroke="#00ff41" 
                   strokeWidth="0.5"
                   className="opacity-40"
                 />
              </svg>
           </div>
           <div className="border border-[#00ff41]/30 relative flex items-end gap-[1px] px-4 pb-2">
              <div className="absolute top-1 left-2 text-[7px] opacity-40">ACRYLIC_SPARK_ANNOTATION</div>
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-[#00ff41]" 
                  style={{ height: `${20 + Math.abs(Math.sin(pulse/5 + i)) * 60}%` }}
                ></div>
              ))}
           </div>
        </div>

        {/* Module: Matrix Grid */}
        <div className="col-span-3 border border-[#00ff41]/30 p-1 grid grid-cols-5 gap-1">
           {matrixLabels.slice(0, 20).map((label, i) => (
             <div 
               key={i} 
               className={`flex items-center justify-center text-[8px] font-black border border-[#00ff41]/30 transition-all duration-300 ${matrixStates[i] ? 'bg-[#00ff41] text-black shadow-[0_0_10px_#00ff41]' : 'bg-transparent text-[#00ff41]/40'}`}
             >
                {label}
             </div>
           ))}
        </div>
      </div>

      {/* 2. Middle Row: Schematics and Ticker */}
      <div className="flex gap-2 h-10 shrink-0">
         <div className="flex-1 border border-[#00ff41]/30 flex items-center justify-center gap-6 px-10">
            {["C", "T", "O", "M", "K", "R", "I", "N"].map(char => (
               <div key={char} className="w-8 h-8 rounded-full border border-[#00ff41] flex items-center justify-center text-xs font-black shadow-[inset_0_0_5px_rgba(0,255,65,0.3)]">{char}</div>
            ))}
         </div>
      </div>

      {/* 3. Bottom Large Viewport */}
      <div className="flex-1 grid grid-cols-12 gap-2 min-h-0">
        {/* Module: Topological Wave */}
        <div className="col-span-4 border border-[#00ff41]/30 p-2 flex flex-col relative overflow-hidden bg-[#00ff41]/5">
           <div className="text-[7px] opacity-40 mb-2">TERRAIN_SCAN_MAP</div>
           <div className="flex-1 relative">
              <svg viewBox="0 0 100 60" className="w-full h-full opacity-60">
                 {[...Array(8)].map((_, i) => (
                   <path 
                     key={i}
                     d={`M10 ${10+i*6} Q25 ${5+i*6 - Math.sin(pulse/5 + i)*5} 40 ${10+i*6} T70 ${10+i*6} T90 ${10+i*6}`}
                     fill="none"
                     stroke="#00ff41"
                     strokeWidth="0.3"
                   />
                 ))}
                 <path d="M10 10 L10 50 L90 50" fill="none" stroke="#00ff41" strokeWidth="0.5" />
              </svg>
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                 <div className="text-[6px] border border-[#00ff41]/20 px-1">OBJ_NULL_ERR_6347.1</div>
                 <div className="text-[6px] border border-[#00ff41]/20 px-1">ZMM_TRANSFORM_GCN_9731.32</div>
              </div>
           </div>
           <div className="grid grid-cols-1 gap-1 mt-2">
              <div className="flex gap-2 items-center">
                 <div className="bg-[#00ff41] text-black text-[7px] px-1 font-bold">C_ARRAY</div>
                 <div className="text-[8px] tracking-widest">49C/E58A81</div>
              </div>
              <div className="flex gap-2 items-center">
                 <div className="bg-[#00ff41] text-black text-[7px] px-1 font-bold">B_ARRAY</div>
                 <div className="text-[8px] tracking-widest">FFE/804F74</div>
              </div>
           </div>
        </div>

        {/* Module: System Schematic Monitor */}
        <div className="col-span-5 border border-[#00ff41]/30 p-2 flex flex-col relative">
           <div className="absolute top-1 left-2 text-[7px] opacity-40 uppercase tracking-widest">System Monitor</div>
           <div className="flex-1 bg-black/40 border border-[#00ff41]/20 flex items-center justify-center p-4">
              <div className="relative w-full h-full">
                {/* Circuit paths simulation */}
                <svg className="w-full h-full stroke-[#00ff41]/30 fill-none" viewBox="0 0 100 80">
                  <path d="M10 10 L40 10 L40 30 L60 30 L60 50 L90 50" strokeWidth="0.5" />
                  <path d="M10 70 L30 70 L30 40 L70 40 L70 10" strokeWidth="0.5" />
                  <rect x="35" y="25" width="10" height="10" strokeWidth="0.5" />
                  <rect x="55" y="35" width="10" height="10" strokeWidth="0.5" />
                  <circle cx="80" cy="65" r="4" strokeWidth="0.5" />
                  
                  {/* Moving pulse */}
                  <circle r="1" fill="#00ff41">
                     <animateMotion dur="3s" repeatCount="indefinite" path="M10 10 L40 10 L40 30 L60 30 L60 50 L90 50" />
                  </circle>
                  <circle r="1" fill="#00ff41">
                     <animateMotion dur="4s" repeatCount="indefinite" path="M10 70 L30 70 L30 40 L70 40 L70 10" />
                  </circle>
                </svg>
                {/* Random blinking nodes */}
                <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-[#00ff41] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-3 h-1 bg-[#00ff41]/40"></div>
              </div>
           </div>
           {/* Bottom Gauge */}
           <div className="h-4 border border-[#00ff41]/30 mt-2 relative overflow-hidden">
              <div className="h-full bg-[#00ff41]/40" style={{ width: `${pulse}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-[7px] font-bold">RESOURCE_SYNCING_IDLE</div>
           </div>
        </div>

        {/* Module: Detailed Command Log */}
        <div className="col-span-3 border border-[#00ff41]/30 p-2 flex flex-col overflow-hidden bg-[#00ff41]/5">
           <div className="text-[7px] opacity-40 mb-2 border-b border-[#00ff41]/20 pb-1">COMMAND_LOG_DUMPER</div>
           <div className="flex-1 text-[8px] font-mono leading-tight space-y-0.5 overflow-hidden">
              {logs.map((log, i) => (
                <div key={i} className={`whitespace-nowrap ${i === 0 ? 'text-white font-bold' : 'opacity-60'}`}>
                  {log}
                </div>
              ))}
           </div>
           <div className="mt-2 grid grid-cols-4 gap-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full ${Math.random() > 0.5 ? 'bg-[#00ff41]' : 'bg-[#00ff41]/20'}`}></div>
              ))}
           </div>
        </div>
      </div>

      {/* 4. Footer Ruler / Ticker */}
      <div className="h-10 border-t-2 border-[#00ff41]/30 flex items-center gap-8 px-4 overflow-hidden shrink-0">
         <div className="flex gap-2">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                 <div className="w-[1px] h-2 bg-[#00ff41]/60"></div>
                 <span className="text-[6px] opacity-40">V{i.toString().padStart(2, '0')}</span>
              </div>
            ))}
         </div>
         <div className="flex-1 flex justify-around text-[10px] font-black tracking-[0.2em] animate-pulse">
            <span>XMIT 68</span>
            <span>XMIT 842</span>
            <span>XMIT 880</span>
         </div>
      </div>
    </div>
  );
};

export default TacticalCore;
