
import React, { useState, useEffect } from 'react';
import { Target, Globe, Activity, Search, Shield, Zap } from 'lucide-react';

const RadarHub: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
      setScanProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-black text-[#22d3ee] font-mono p-4 flex flex-col gap-6 overflow-hidden border-2 border-[#22d3ee]/20 relative select-none">
      {/* Background Starfield */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(white_1px,transparent_1px)] bg-[length:100px_100px]"></div>

      {/* Top Main Radar Row */}
      <div className="flex-1 flex gap-8 items-center justify-center">
        {/* Circular Radar with Map */}
        <div className="relative w-80 h-80 lg:w-96 lg:h-96 border-2 border-[#22d3ee]/40 rounded-full flex items-center justify-center">
          <div className="absolute inset-4 border border-[#22d3ee]/10 rounded-full"></div>
          <div className="absolute inset-12 border border-[#22d3ee]/10 rounded-full"></div>
          <div className="absolute inset-24 border border-[#22d3ee]/10 rounded-full"></div>
          
          {/* Radar Sweep */}
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#22d3ee]/30 to-transparent opacity-40 origin-center"
            style={{ transform: `rotate(${rotation}deg)` }}
          ></div>

          {/* World Map SVG inside Radar */}
          <svg viewBox="0 0 100 100" className="w-full h-full fill-[#22d3ee]/40 p-10">
            <path d="M10 50 Q20 20 50 20 T90 50 T50 80 T10 50 Z" />
            <path d="M40 40 Q45 35 50 40 T60 45" stroke="#22d3ee" fill="none" strokeWidth="0.5" />
            <circle cx="70" cy="40" r="1.5" className="animate-ping" fill="#22d3ee" />
            <circle cx="30" cy="60" r="1.5" className="animate-ping" fill="#22d3ee" />
          </svg>
          
          <div className="absolute -top-4 bg-black px-2 text-[10px] font-bold border border-[#22d3ee]/40">SECTOR_B7_ALPHA</div>
        </div>

        {/* 3D Wireframe Globe */}
        <div className="relative w-80 h-80 lg:w-96 lg:h-96 border-2 border-[#22d3ee]/40 rounded-full flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 border-[0.5px] border-[#22d3ee]/10 grid grid-cols-8 grid-rows-8"></div>
           <Globe size={240} className="opacity-20 animate-spin-slow" strokeWidth={0.5} />
           
           {/* Latitude/Longitude Rings */}
           {[0, 45, 90, 135].map(deg => (
             <div 
               key={deg}
               className="absolute w-full h-[0.5px] bg-[#22d3ee]/20"
               style={{ top: `${(deg/180) * 100}%` }}
             ></div>
           ))}
           <div className="absolute -top-4 bg-black px-2 text-[10px] font-bold border border-[#22d3ee]/40 uppercase tracking-widest">Global_Sync_v9</div>
        </div>
      </div>

      {/* Identification Sectors Row */}
      <div className="h-64 border-2 border-[#22d3ee]/40 bg-[#22d3ee]/5 p-4 flex flex-col gap-4 relative">
        <div className="absolute -top-4 left-6 bg-black px-4 py-1 border border-[#22d3ee]/40 text-sm font-black uppercase tracking-[0.5em] glow-text">
          Identification Sector
        </div>

        <div className="flex-1 grid grid-cols-4 gap-4">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="border border-[#22d3ee]/20 p-2 flex flex-col gap-2 bg-black/40">
                <div className="flex justify-between text-[10px] opacity-60">
                   <span>SECTOR {i}</span>
                   <span>STABLE</span>
                </div>
                <div className="flex-1 relative overflow-hidden">
                   <svg viewBox="0 0 100 40" className="w-full h-full stroke-[#22d3ee]">
                      <path 
                        d={`M0 20 ${[...Array(10)].map((_, j) => `Q${j*10 + 5} ${20 + Math.sin(rotation/10 + j)*15} ${j*10 + 10} 20`).join(' ')}`}
                        fill="none"
                        strokeWidth="0.5"
                      />
                   </svg>
                </div>
                <div className="h-1 bg-[#22d3ee]/10 overflow-hidden">
                   <div className="h-full bg-[#22d3ee]" style={{ width: `${Math.random()*100}%` }}></div>
                </div>
             </div>
           ))}
        </div>

        {/* Footer Data Bars */}
        <div className="h-8 flex items-center justify-between px-2">
           <div className="flex gap-4 items-center">
              <Zap size={14} className="animate-pulse" />
              <div className="text-[10px] opacity-40 leading-tight">OBJECT: A-21/45T // STATUS: SYSTEM OK // MODE: STEADY // SEARCH: COMPLETE</div>
           </div>
           <div className="flex items-center gap-2">
              <Activity size={14} />
              <span className="text-[10px]">SYNC_DELAY: 0.02ms</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RadarHub;
