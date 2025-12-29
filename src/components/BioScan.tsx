
import React, { useState, useEffect } from 'react';
import { Activity, Fingerprint, User, Dna, Zap, ShieldCheck, Heart, Thermometer, Info, Target, Crosshair } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const BioScan: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [heartData, setHeartData] = useState<{ time: number, val: number }[]>([]);
  const [scanPos, setScanPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 76 : p + 0.5));
      setHeartData(prev => {
        const newData = [...prev, { time: Date.now(), val: 50 + Math.sin(Date.now() / 100) * 20 + (Math.random() * 10) }];
        return newData.slice(-30);
      });
      setScanPos(s => (s + 2) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-black text-cyan-400 font-mono flex flex-col p-2 lg:p-4 gap-4 overflow-hidden relative select-none uppercase border-2 border-cyan-500/30">
      {/* Decorative HUD Corners */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-cyan-400/50"></div>
      <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-cyan-400/50"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-cyan-400/50"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-cyan-400/50"></div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* LEFT COLUMN: DNA & GENETICS */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* DNA Analysis Module */}
          <div className="flex-1 bg-cyan-950/10 border border-cyan-500/30 p-4 relative flex flex-col gap-3">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-3 bg-cyan-400"></div>
                <h2 className="text-xs font-black tracking-widest">DNA ANALYSIS {progress.toFixed(0)}%</h2>
             </div>
             
             <div className="flex-1 flex items-center justify-center relative overflow-hidden border border-cyan-500/10 bg-black/40">
                <svg viewBox="0 0 40 100" className="h-full w-auto opacity-80">
                   {[...Array(12)].map((_, i) => (
                     <g key={i}>
                       <circle cx={20 + Math.sin(i + scanPos/10)*10} cy={10 + i*7} r="1.5" fill="currentColor" />
                       <circle cx={20 - Math.sin(i + scanPos/10)*10} cy={10 + i*7} r="1.5" fill="currentColor" />
                       <line 
                         x1={20 + Math.sin(i + scanPos/10)*10} y1={10 + i*7} 
                         x2={20 - Math.sin(i + scanPos/10)*10} y2={10 + i*7} 
                         stroke="currentColor" strokeWidth="0.5" opacity="0.3" 
                       />
                     </g>
                   ))}
                </svg>
                {/* Lateral Data Tags */}
                <div className="absolute top-4 left-2 text-[6px] flex flex-col gap-1 opacity-60">
                   <span>ADENINE_LINK: OK</span>
                   <span>GUANINE_SEQ: ACTIVE</span>
                </div>
             </div>

             <div className="text-[7px] leading-tight opacity-40">
                MOLLIS PRETIUM // GENE_ID: 0x992B-X1<br/>
                CHECKSUM: VERIFIED_A12
             </div>
          </div>

          {/* DNA Structure Module */}
          <div className="h-44 bg-cyan-950/10 border border-cyan-500/30 p-3 flex flex-col gap-2">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-cyan-400"></div>
                <h2 className="text-[10px] font-black tracking-widest">DNA STRUCTURE</h2>
             </div>
             <div className="grid grid-cols-4 gap-2 flex-1">
                {['Cytosine', 'Guanine', 'Adenine', 'Thymine'].map(name => (
                  <div key={name} className="flex flex-col items-center gap-1">
                     <div className="flex-1 w-full border border-cyan-500/20 flex items-center justify-center p-1">
                        <svg viewBox="0 0 20 20" className="w-full h-full opacity-60">
                           <polygon points="10,2 18,7 18,13 10,18 2,13 2,7" fill="none" stroke="currentColor" strokeWidth="1" />
                           <circle cx="10" cy="10" r="3" fill="currentColor" />
                        </svg>
                     </div>
                     <span className="text-[6px] tracking-tighter opacity-60">{name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* CENTER COLUMN: SUBJECT SCANNER */}
        <div className="col-span-5 flex flex-col bg-cyan-950/5 border border-cyan-500/20 relative items-center justify-center">
           <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-1 bg-cyan-400/10 border border-cyan-400/30">
              <Crosshair size={14} />
              <span className="text-xs font-black tracking-[0.4em] animate-pulse">SCANNING...</span>
           </div>

           {/* The Subject Silhouette */}
           <div className="relative h-[80%] w-full flex items-center justify-center">
              <svg viewBox="0 0 100 200" className="h-full text-cyan-400/40 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                 <path 
                   d="M50 15 Q60 15 65 25 T65 45 T50 50 T35 45 T35 25 T50 15 M35 55 Q25 55 20 70 T20 120 L80 120 T80 70 Q75 55 65 55 Z M35 120 L30 185 L45 185 L50 130 L55 185 L70 185 L65 120" 
                   fill="none" 
                   stroke="currentColor" 
                   strokeWidth="1.5" 
                 />
              </svg>

              {/* Scanning Laser Beam */}
              <div 
                className="absolute w-[60%] h-[1px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] z-20 transition-all duration-75"
                style={{ top: `${scanPos}%` }}
              >
                 <div className="absolute -right-20 -top-1.5 px-2 py-0.5 border border-cyan-400/30 bg-black text-[7px]">
                    VOXEL_MAP_{Math.floor(scanPos * 42)}
                 </div>
              </div>

              {/* Data Callouts */}
              <div className="absolute top-1/4 left-10 flex items-center gap-2 opacity-40">
                 <div className="w-10 h-[1px] bg-cyan-400"></div>
                 <span className="text-[8px]">Neural_Link: 13%</span>
              </div>
              <div className="absolute top-1/2 right-10 flex items-center gap-2 opacity-40">
                 <span className="text-[8px]">Heart_Rate: 72</span>
                 <div className="w-10 h-[1px] bg-cyan-400"></div>
              </div>
           </div>

           {/* Floor Scanner Ring */}
           <div className="absolute bottom-10 w-40 h-10 border-2 border-cyan-400/20 rounded-[100%] flex items-center justify-center">
              <div className="w-32 h-6 border border-cyan-400/40 rounded-[100%] animate-pulse"></div>
           </div>
        </div>

        {/* RIGHT COLUMN: ID & TELEMETRY */}
        <div className="col-span-4 flex flex-col gap-4">
          {/* Profile Module */}
          <div className="bg-cyan-950/10 border border-cyan-500/30 p-4">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 border border-cyan-500/40">
                   <Fingerprint size={48} className="text-cyan-400/80" />
                </div>
                <div className="text-right">
                   <h2 className="text-xl font-black tracking-widest text-white">JOHN DOE</h2>
                   <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] mt-2 opacity-60">
                      <span>AGE</span> <span className="text-white">28</span>
                      <span>ID</span> <span className="text-white">A-13511</span>
                      <span>CITY</span> <span className="text-white">UNKNOWN</span>
                      <span>DATE</span> <span className="text-white">MAY 13 2025</span>
                   </div>
                </div>
                <div className="w-16 h-16 border border-cyan-500/20 bg-cyan-400/5 flex items-center justify-center">
                   <User size={40} className="text-cyan-400/20" />
                </div>
             </div>
          </div>

          {/* Cardiogram Analysis */}
          <div className="flex-1 bg-cyan-950/10 border border-cyan-500/30 p-4 flex flex-col gap-2">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-3 bg-cyan-400"></div>
                <h2 className="text-[10px] font-black tracking-widest uppercase">Cardiogram Analysis</h2>
             </div>
             <div className="flex-1 h-32">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={heartData}>
                      <YAxis hide domain={[0, 100]} />
                      <Line type="monotone" dataKey="val" stroke="#22d3ee" strokeWidth={2} dot={false} animationDuration={0} isAnimationActive={false} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
             <div className="flex justify-between text-[8px] opacity-40 mt-2">
                <span>ANALYZE: MOLLIS POSUERE 94.21 NORMAL</span>
                <span>87.42%</span>
             </div>
          </div>

          {/* General Information */}
          <div className="h-44 bg-cyan-950/10 border border-cyan-500/30 p-3 flex flex-col gap-2 relative">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-cyan-400"></div>
                <h2 className="text-[10px] font-black tracking-widest">INFORMATION</h2>
             </div>
             <div className="flex-1 flex flex-col justify-between">
                <div className="flex gap-1 h-12 items-end">
                   {[...Array(20)].map((_, i) => (
                     <div key={i} className="flex-1 bg-cyan-400/20" style={{ height: `${Math.random()*100}%` }}></div>
                   ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="flex flex-col gap-1">
                      <div className="h-1 bg-cyan-900/40 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400" style={{ width: '80%' }}></div>
                      </div>
                      <div className="h-1 bg-cyan-900/40 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400" style={{ width: '45%' }}></div>
                      </div>
                   </div>
                   <div className="flex items-center justify-center border border-cyan-500/20">
                      <svg viewBox="0 0 40 40" className="w-8 h-8 text-cyan-400/40">
                        <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                        <path d="M20 5 L20 35 M5 20 L35 20" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Interface Status */}
      <div className="h-8 border-t border-cyan-500/20 flex items-center px-4 justify-between text-[9px] font-black tracking-widest opacity-60">
         <div className="flex gap-10">
            <span>UPLINK: ACTIVE</span>
            <span>NODE_ID: BIOS_77</span>
         </div>
         <div className="flex items-center gap-2">
            <Zap size={12} />
            <span>ENCRYPTION: BIO_SECURE_X2</span>
         </div>
      </div>
    </div>
  );
};

export default BioScan;
