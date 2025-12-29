
import React, { useState, useEffect } from 'react';
import { Globe, Activity, Radio, Target, Wifi, Zap, Shield } from 'lucide-react';

const GlobalMonitor: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
      setPulse(p => (p + 0.1) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-black text-[#00ff41] font-mono flex flex-col gap-0 border-2 border-[#00ff41]/30 relative overflow-hidden select-none">
      {/* Top Precision Ruler */}
      <div className="h-6 w-full border-b border-[#00ff41]/40 flex items-center px-1 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className={`w-[1px] bg-[#00ff41]/60 ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`}></div>
            {i % 10 === 0 && <span className="text-[6px] opacity-40 mt-0.5">{i.toString().padStart(2, '0')}</span>}
          </div>
        ))}
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* Top Intelligence Row */}
        <div className="grid grid-cols-4 gap-4 h-48">
          {/* Module 1: Mini Radar */}
          <div className="border border-[#00ff41]/40 bg-[#00ff41]/5 relative flex items-center justify-center p-2">
            <div className="absolute top-1 left-2 text-[8px] opacity-60">RADAR_SWEEP_X2</div>
            <div className="relative aspect-square h-full border border-[#00ff41]/20 rounded-full flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="absolute border border-[#00ff41]/10 rounded-full" style={{ width: `${(i + 1) * 33}%`, height: `${(i + 1) * 33}%` }}></div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff41]/40 to-transparent rounded-full opacity-30 origin-center" style={{ transform: `rotate(${rotation}deg)` }}></div>
              <div className="w-1 h-1 bg-[#00ff41] rounded-full animate-ping shadow-[0_0_10px_#00ff41]"></div>
            </div>
          </div>

          {/* Module 2: Frequency Analyzer */}
          <div className="border border-[#00ff41]/40 bg-[#00ff41]/5 flex flex-col p-3 gap-2 overflow-hidden">
            <div className="text-[8px] opacity-60 uppercase flex justify-between items-center">
               <span>Signal_Telemetry</span>
               <span className="text-[7px] text-yellow-500 animate-pulse">LIVE</span>
            </div>
            <div className="flex-1 flex items-end gap-1">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-[#00ff41]/30 relative" 
                  style={{ height: `${20 + Math.sin(pulse + i) * 60 + Math.random() * 20}%` }}
                >
                   <div className="absolute top-0 left-0 right-0 h-1 bg-[#00ff41] shadow-[0_0_5px_#00ff41]"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Module 3: Neural Waveform */}
          <div className="border border-[#00ff41]/40 bg-[#00ff41]/5 p-3 flex flex-col gap-2">
            <div className="text-[8px] opacity-60 uppercase">Wave_Pattern_04</div>
            <div className="flex-1 relative overflow-hidden border border-[#00ff41]/10 bg-black/40">
              <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d">
                <path 
                  d={`M0 20 ${[...Array(20)].map((_, i) => `Q${i*5 + 2.5} ${20 + Math.sin(pulse + i) * 15} ${i*5 + 5} 20`).join(' ')}`} 
                  fill="none" 
                  stroke="#00ff41" 
                  strokeWidth="0.5"
                  className="opacity-80"
                />
              </svg>
            </div>
          </div>

          {/* Module 4: Wireframe Globe */}
          <div className="border border-[#00ff41]/40 bg-[#00ff41]/5 flex items-center justify-center p-2 relative overflow-hidden">
             <div className="absolute top-1 left-2 text-[8px] opacity-60">ORBITAL_CAM</div>
             <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 border border-[#00ff41]/20 rounded-full animate-spin-slow"></div>
                <Globe size={64} className="opacity-40 animate-pulse" />
                <div className="absolute inset-0 border-r-2 border-[#00ff41] rounded-full opacity-20" style={{ transform: `rotate(${rotation}deg)` }}></div>
             </div>
          </div>
        </div>

        {/* Main Strategic Viewport */}
        <div className="flex-1 border-2 border-[#00ff41]/40 bg-black relative overflow-hidden group">
          {/* Tactical Grid Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(0,255,65,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.2)_1px,transparent_1px)] bg-[length:60px_60px]"></div>

          {/* World Map with Scanlines */}
          <div className="absolute inset-0 flex items-center justify-center p-12 overflow-hidden">
            <div className="relative w-full h-full max-w-4xl opacity-80">
               {/* This creates the "Zebra" vertical scanline effect over the world map */}
               <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(90deg,transparent_50%,black_50%)] bg-[length:4px_100%] opacity-60"></div>
               
               {/* World Map Graphic */}
               <svg viewBox="0 0 100 60" className="w-full h-full fill-[#00ff41]/40">
                  {/* Highly simplified world paths */}
                  <path d="M10 20 Q15 10 25 15 T40 20 T60 15 T85 20 L90 40 Q80 50 60 45 T30 50 T10 40 Z" />
                  <path d="M45 40 Q50 35 55 40 L50 55 Z" />
                  <circle cx="75" cy="45" r="4" />
               </svg>

               {/* Sinusoidal Intercept Paths (The yellow waves) */}
               <svg className="absolute inset-0 z-20 pointer-events-none" viewBox="0 0 100 60">
                 <path 
                   d={`M-10 30 ${[...Array(10)].map((_, i) => `Q${i*15 + 7.5} ${30 + Math.sin(pulse + i) * 20} ${i*15 + 15} 30`).join(' ')}`} 
                   fill="none" 
                   stroke="#eab308" 
                   strokeWidth="0.3"
                   className="opacity-60 drop-shadow-[0_0_2px_#eab308]"
                 />
                 <path 
                   d={`M-10 30 ${[...Array(10)].map((_, i) => `Q${i*15 + 7.5} ${30 - Math.sin(pulse + i) * 20} ${i*15 + 15} 30`).join(' ')}`} 
                   fill="none" 
                   stroke="#eab308" 
                   strokeWidth="0.3" 
                   className="opacity-40"
                 />
               </svg>

               {/* Intercept Targets */}
               <div className="absolute top-1/4 left-1/3 animate-pulse">
                  <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>
                  <div className="absolute top-full left-full text-[6px] text-red-500 bg-black/80 border border-red-500 px-1 whitespace-nowrap">SIG_INT_001</div>
               </div>
               <div className="absolute bottom-1/3 right-1/4 animate-pulse" style={{ animationDelay: '1s' }}>
                  <div className="w-2 h-2 bg-[#00ff41] rounded-full shadow-[0_0_10px_#00ff41]"></div>
                  <div className="absolute top-full left-full text-[6px] text-[#00ff41] bg-black/80 border border-[#00ff41] px-1 whitespace-nowrap">NODE_STABLE</div>
               </div>
            </div>
          </div>

          {/* HUD Brackets */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#00ff41]/60"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#00ff41]/60"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#00ff41]/60"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#00ff41]/60"></div>

          {/* Lower HUD Data Bars */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
             <div className="flex flex-col items-center">
                <div className="flex gap-1 mb-1">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className="w-3 h-1 bg-[#00ff41] animate-pulse" style={{ animationDelay: `${i*0.1}s` }}></div>
                   ))}
                </div>
                <span className="text-[7px] uppercase opacity-60">Buffer_Stream</span>
             </div>
             <div className="h-6 w-px bg-[#00ff41]/20"></div>
             <div className="flex flex-col items-center">
                <div className="text-[10px] font-black tracking-widest text-white">42.88.1.0</div>
                <span className="text-[7px] uppercase opacity-60">Target_IP</span>
             </div>
          </div>

          {/* Right Data Stream Column */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 text-[7px] font-mono text-[#00ff41]/40 uppercase text-right">
             <div>Lat: 35.6895 N</div>
             <div>Lng: 139.6917 E</div>
             <div className="w-16 h-[1px] bg-[#00ff41]/20 ml-auto"></div>
             <div>Trace: Nominal</div>
             <div>Link: Active</div>
          </div>
        </div>
      </div>

      {/* Bottom Precision Ruler */}
      <div className="h-6 w-full border-t border-[#00ff41]/40 flex items-center px-1 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            {i % 10 === 0 && <span className="text-[6px] opacity-40 mb-0.5">{i.toString().padStart(2, '0')}</span>}
            <div className={`w-[1px] bg-[#00ff41]/60 ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`}></div>
          </div>
        ))}
      </div>

      {/* Bottom Status Ticker */}
      <div className="bg-[#00ff41]/10 px-4 py-1 flex justify-between items-center text-[8px] font-black uppercase tracking-widest">
        <div className="flex items-center gap-4">
           <span className="flex items-center gap-2"><Zap size={10} /> System: Optimal</span>
           <span className="flex items-center gap-2"><Activity size={10} /> Neural: Synced</span>
        </div>
        <div>
           Trace_ID: GHOST-V9-9821
        </div>
      </div>
    </div>
  );
};

export default GlobalMonitor;
