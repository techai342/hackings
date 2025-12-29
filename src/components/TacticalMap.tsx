
import React, { useState, useEffect } from 'react';
import { Target, Wifi, Activity, ShieldAlert, Cpu, Globe } from 'lucide-react';

const TacticalMap: React.FC = () => {
  const [scanPos, setScanPos] = useState({ x: 50, y: 50 });
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(prev => ({
        x: (prev.x + 0.4) % 100,
        y: (prev.y + 0.2) % 100
      }));
      setPulse(p => (p + 0.1) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const regions = [
    { name: "NORTH AMERICA", x: 20, y: 30 },
    { name: "SOUTH AMERICA", x: 30, y: 70 },
    { name: "EUROPE", x: 50, y: 25 },
    { name: "AFRICA", x: 52, y: 55 },
    { name: "ASIA", x: 75, y: 35 },
    { name: "AUSTRALIA", x: 85, y: 75 }
  ];

  return (
    <div className="flex-1 bg-black text-[#00ff41] font-mono p-4 flex flex-col gap-4 overflow-hidden border-2 border-[#00ff41]/20 relative select-none">
      {/* Background Scanline Pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10"></div>
      
      {/* HUD Header */}
      <div className="h-14 border border-[#00ff41]/30 bg-black/40 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
          <Globe size={24} className="animate-pulse" />
          <h2 className="text-sm font-black tracking-[0.4em] uppercase glow-text">Tactical Global Intercept</h2>
        </div>
        <div className="flex gap-10 text-[9px] opacity-60 uppercase font-black">
          <div className="flex flex-col">
            <span className="text-white/40">Satellite</span>
            <span>OSIRIS_7</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/40">Grid Link</span>
            <span className="text-cyan-400">ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Map Viewport */}
      <div className="flex-1 relative bg-[#010b14] border border-[#00ff41]/20 overflow-hidden shadow-[inset_0_0_100px_rgba(0,255,65,0.05)]">
        
        {/* Neon World Map Outline */}
        <div className="absolute inset-0 flex items-center justify-center p-8 opacity-80 scale-110">
          <svg viewBox="0 0 1000 600" className="w-full h-full fill-none stroke-[#00ff41] stroke-[1.5]">
             {/* Highly stylized continent paths matching the uploaded image aesthetic */}
             <path d="M50 150 L150 100 L250 120 L300 250 L250 350 L150 380 L100 300 Z" opacity="0.3" /> {/* North America simplified */}
             <path d="M220 380 L280 400 L320 550 L250 580 L200 500 Z" opacity="0.3" /> {/* South America simplified */}
             <path d="M450 120 L550 100 L600 150 L580 250 L480 220 Z" opacity="0.4" /> {/* Europe simplified */}
             <path d="M480 250 L600 280 L620 450 L550 500 L450 420 Z" opacity="0.3" /> {/* Africa simplified */}
             <path d="M600 100 L900 120 L950 350 L800 450 L620 250 Z" opacity="0.4" /> {/* Asia simplified */}
             <path d="M800 480 L920 480 L950 550 L850 580 Z" opacity="0.3" /> {/* Australia simplified */}
             
             {/* Actual World Map Image as overlay for better fidelity if needed */}
             <image href="https://www.transparenttextures.com/patterns/world-map.png" x="0" y="0" width="1000" height="600" className="opacity-40 brightness-200 saturate-200 contrast-200 hue-rotate-[90deg]" />
          </svg>
        </div>

        {/* Scanning Axes */}
        {/* Vertical Sweeper */}
        <div className="absolute h-full w-[1px] bg-[#00ff41]/60 shadow-[0_0_15px_#00ff41] z-20 transition-all duration-100 ease-linear" style={{ left: `${scanPos.x}%` }}>
           <div className="absolute bottom-4 left-2 text-[7px] bg-black border border-[#00ff41]/40 px-1 py-0.5">X_AXIS: {scanPos.x.toFixed(2)}</div>
           {/* Intersection Wave */}
           <div className="absolute w-20 h-20 -left-10 bg-[#00ff41]/5 rounded-full border border-[#00ff41]/20 animate-ping" style={{ top: `${scanPos.y}%` }}></div>
        </div>

        {/* Horizontal Sweeper */}
        <div className="absolute w-full h-[1px] bg-[#00ff41]/60 shadow-[0_0_15px_#00ff41] z-20 transition-all duration-100 ease-linear" style={{ top: `${scanPos.y}%` }}>
           <div className="absolute top-4 right-4 text-[7px] bg-black border border-[#00ff41]/40 px-1 py-0.5 text-right">Y_AXIS: {scanPos.y.toFixed(2)}</div>
        </div>

        {/* Region Labels */}
        {regions.map((region, i) => (
          <div key={i} className="absolute z-30 flex flex-col group transition-all hover:scale-110" style={{ left: `${region.x}%`, top: `${region.y}%` }}>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse"></div>
                <span className="text-[10px] font-black text-white glow-text tracking-widest">{region.name}</span>
             </div>
             {/* Frequency line below label */}
             <div className="mt-1 flex items-end gap-[1px] h-3 opacity-60">
                {[...Array(12)].map((_, j) => (
                  <div key={j} className="w-[2px] bg-[#00ff41]" style={{ height: `${20 + Math.sin(pulse + j + i) * 60 + Math.random() * 20}%` }}></div>
                ))}
             </div>
          </div>
        ))}

        {/* Random Intercept Alerts */}
        <div className="absolute top-10 left-10 p-4 bg-red-950/20 border border-red-500/40 rounded animate-pulse z-40">
           <div className="flex items-center gap-3 text-red-500 mb-1">
              <ShieldAlert size={16} />
              <span className="text-[9px] font-black uppercase tracking-widest">Compromised Node</span>
           </div>
           <div className="text-[10px] text-white opacity-60">ID: ALPHA_9_77 // SIG_LOSS: 44%</div>
        </div>

        {/* Corner Telemetry */}
        <div className="absolute bottom-4 right-4 flex flex-col items-end text-right z-30 opacity-40">
           <div className="text-[8px] font-mono leading-tight">
              LAT: 35.6895° N<br/>
              LNG: 139.6917° E<br/>
              ALT: 412.8 KM
           </div>
           <div className="mt-2 h-0.5 w-24 bg-[#00ff41]/20 overflow-hidden">
              <div className="h-full bg-[#00ff41] animate-pulse" style={{ width: '70%' }}></div>
           </div>
        </div>
      </div>

      {/* Stats Footer Row */}
      <div className="h-32 grid grid-cols-12 gap-4 z-20">
        <div className="col-span-12 lg:col-span-4 border border-[#00ff41]/20 bg-[#00ff41]/5 p-3 flex flex-col gap-2">
           <div className="flex justify-between items-center text-[10px] font-black border-b border-[#00ff41]/20 pb-1 uppercase">
              <span>Intercept Matrix</span>
              <Wifi size={14} className="opacity-40" />
           </div>
           <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin pr-1 text-[8px] opacity-60 font-mono">
              <div>> CONNECTING TO NEST_RELAY_4...</div>
              <div>> ENCRYPTION HANDSHAKE: SUCCESS</div>
              <div>> SECTOR_G7: MAPPED</div>
              <div className="text-[#00ff41] animate-pulse">> SNIFFING PACKETS ON CHANNEL 9...</div>
           </div>
        </div>

        <div className="col-span-12 lg:col-span-4 border border-[#00ff41]/20 bg-black flex flex-col items-center justify-center p-3 relative">
           <div className="absolute top-1 left-2 text-[7px] opacity-40">SYSTEM_LOAD</div>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#00ff41] flex items-center justify-center">
                 <Target size={24} className="animate-spin-slow opacity-80" />
              </div>
              <div className="flex flex-col">
                 <span className="text-xl font-black text-white glow-text leading-none">99.2%</span>
                 <span className="text-[8px] opacity-60">SYNCHRONIZATION</span>
              </div>
           </div>
        </div>

        <div className="col-span-12 lg:col-span-4 border border-[#00ff41]/20 bg-[#00ff41]/5 p-3 flex flex-col justify-between">
           <div className="flex items-center gap-3 text-cyan-400">
              <Cpu size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Neural Linkage</span>
           </div>
           <div className="flex items-end gap-1 h-12">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="flex-1 bg-cyan-500/20" style={{ height: `${30 + Math.random() * 70}%` }}></div>
              ))}
           </div>
           <div className="text-[8px] opacity-40 uppercase text-center mt-2 tracking-widest">Buffer_State: Stable</div>
        </div>
      </div>
    </div>
  );
};

export default TacticalMap;
