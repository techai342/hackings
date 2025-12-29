
import React, { useState, useEffect } from 'react';
import { Activity, Brain, User, AlertCircle, Clock, Search, ChevronRight, BarChart3, Database, Shield } from 'lucide-react';

const MedicalCore: React.FC = () => {
  const [pulse, setPulse] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleString());
  const [anomalies, setAnomalies] = useState<{id: number, x: number, y: number}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
      setTime(new Date().toLocaleString());
      
      // Randomly spawn brain anomalies
      if (Math.random() > 0.8) {
        setAnomalies(prev => [
          ...prev, 
          { id: Date.now(), x: 30 + Math.random() * 40, y: 30 + Math.random() * 40 }
        ].slice(-3));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-[#010b14] text-[#22d3ee] font-sans flex flex-col p-2 lg:p-4 gap-4 overflow-hidden border-2 border-[#22d3ee]/20 relative select-none">
      {/* Background HUD Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[length:30px_30px]"></div>

      {/* Header Bar */}
      <div className="h-12 bg-[#021a2c] border-b border-[#22d3ee]/30 flex items-center justify-between px-6 z-10 shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <Activity size={24} className="text-[#22d3ee] animate-pulse" />
          <h1 className="text-lg font-black tracking-[0.3em] uppercase glow-text">Neural Medical Hub v9.2</h1>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span className="opacity-80">{time}</span>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded text-red-500 font-bold animate-pulse">
            URGENT: CORE_ANOMALY
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 overflow-hidden">
        
        {/* LEFT PANEL: Filters & Layout */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          {/* Section: Temporal Density */}
          <div className="bg-[#021a2c]/60 border border-[#22d3ee]/20 p-4 rounded flex flex-col gap-2">
             <h3 className="text-[11px] font-black uppercase tracking-widest border-l-4 border-[#22d3ee] pl-2 mb-2">Neural Frequency Density</h3>
             <div className="grid grid-cols-10 gap-1 opacity-60">
                {[...Array(60)].map((_, i) => (
                  <div key={i} className={`w-full aspect-square rounded-sm ${Math.random() > 0.7 ? 'bg-[#22d3ee]' : 'bg-[#22d3ee]/10'}`} style={{ opacity: Math.random() }}></div>
                ))}
             </div>
          </div>

          {/* Section: Department Load */}
          <div className="flex-1 bg-[#021a2c]/60 border border-[#22d3ee]/20 p-4 rounded flex flex-col gap-4 overflow-hidden">
             <h3 className="text-[11px] font-black uppercase tracking-widest border-l-4 border-[#22d3ee] pl-2">Department Status</h3>
             <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin">
                {['NEURO_LAB_1', 'NEURO_LAB_2', 'BIO_SURGERY', 'CRYOGENIC_HUB'].map((dept, i) => (
                  <div key={dept} className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold opacity-60">
                       <span>{dept}</span>
                       <span>{2000 + (i * 400)} UNITS</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-[#22d3ee]/10">
                       <div className="h-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]" style={{ width: `${40 + (i * 15) + (Math.sin(pulse/5)*10)}%` }}></div>
                    </div>
                  </div>
                ))}
             </div>
             
             {/* Trend Mini-Chart */}
             <div className="mt-auto pt-4 border-t border-[#22d3ee]/10">
                <span className="text-[9px] font-bold opacity-40 uppercase">Trajectory Prediction</span>
                <svg viewBox="0 0 100 30" className="w-full h-12 stroke-[#22d3ee] fill-none opacity-40">
                   <path d="M0 25 Q10 20 20 22 T40 10 T60 18 T80 5 T100 15" strokeWidth="1" />
                   <path d="M0 25 Q10 20 20 22 T40 10 T60 18 T80 5 T100 15" strokeWidth="3" opacity="0.1" />
                </svg>
             </div>
          </div>
        </div>

        {/* CENTER PANEL: THE SCANNER */}
        <div className="col-span-6 flex flex-col gap-4 min-h-0">
          {/* Patient Grid Header */}
          <div className="h-44 bg-[#021a2c]/60 border border-[#22d3ee]/20 p-4 rounded overflow-hidden">
             <div className="flex justify-between items-center mb-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest border-l-4 border-[#22d3ee] pl-2">Active Subject Stream</h3>
                <div className="flex gap-4">
                   <Search size={14} className="opacity-40" />
                   <div className="text-[10px] text-yellow-500 font-bold tracking-tighter">TOTAL_LINKED: 412</div>
                </div>
             </div>
             <table className="w-full text-left text-[9px] uppercase font-mono">
                <thead className="text-[#22d3ee]/40 border-b border-[#22d3ee]/10">
                   <tr>
                      <th className="pb-1">ID</th>
                      <th className="pb-1">Subject_Alias</th>
                      <th className="pb-1">Node</th>
                      <th className="pb-1">Sync_Rate</th>
                      <th className="pb-1">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-[#22d3ee]/5">
                   {[...Array(5)].map((_, i) => (
                     <tr key={i} className="hover:bg-[#22d3ee]/5 group cursor-default">
                        <td className="py-1.5 text-white">0x{821 + i}F4</td>
                        <td className="py-1.5 opacity-60">SUBJECT_{68 + i}</td>
                        <td className="py-1.5 opacity-60">CORP_CORE_{i+1}</td>
                        <td className="py-1.5 font-bold text-yellow-500">{92 - i}%</td>
                        <td className="py-1.5"><span className="px-1 border border-[#22d3ee]/30 text-[8px]">ACTIVE</span></td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>

          {/* MAIN BRAIN SCANNER */}
          <div className="flex-1 bg-black/40 border border-[#22d3ee]/20 rounded relative flex items-center justify-center overflow-hidden">
             {/* Scanner HUD Lines */}
             <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#22d3ee]/10"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#22d3ee]/10"></div>
                <div className="absolute top-4 left-4 text-[8px] font-mono opacity-20">COORDS: {pulse.toFixed(2)} / {-pulse.toFixed(2)}</div>
             </div>

             <div className="relative w-full h-full flex items-center justify-center">
                {/* Simulated 3D Brain SVG */}
                <svg viewBox="0 0 200 160" className="w-[80%] h-auto opacity-80 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                   <defs>
                      <filter id="glow">
                         <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                         <feMerge>
                            <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                         </feMerge>
                      </filter>
                   </defs>
                   {/* Left Lobe Wireframe */}
                   <path 
                     d="M100 10 Q80 10 70 30 T60 70 T70 110 T100 130" 
                     stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="2 1" 
                   />
                   {/* Right Lobe Wireframe */}
                   <path 
                     d="M100 10 Q120 10 130 30 T140 70 T130 110 T100 130" 
                     stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="2 1" 
                   />
                   {/* Internal Mesh Details */}
                   {[...Array(6)].map((_, i) => (
                     <circle key={i} cx={100 + Math.sin(pulse/10 + i)*20} cy={30 + i*15} r="0.5" fill="currentColor" />
                   ))}
                   <path d="M80 40 Q100 60 120 40 M80 80 Q100 100 120 80" stroke="currentColor" fill="none" strokeWidth="0.2" opacity="0.4" />
                   
                   {/* Neural Flares (Anomalies) */}
                   {anomalies.map(a => (
                     <g key={a.id} className="animate-ping origin-center">
                        <circle cx={a.x * 2} cy={a.y * 1.5} r="2" fill="#ef4444" />
                        <circle cx={a.x * 2} cy={a.y * 1.5} r="4" fill="#ef4444" opacity="0.3" />
                     </g>
                   ))}
                   {anomalies.map(a => (
                     <circle key={`s-${a.id}`} cx={a.x * 2} cy={a.y * 1.5} r="2" fill="#f97316" filter="url(#glow)" />
                   ))}
                </svg>

                {/* Overlays for depth */}
                <div className="absolute top-10 right-10 bg-[#021a2c]/80 border border-[#22d3ee]/40 p-3 backdrop-blur-md rounded shadow-xl animate-in fade-in zoom-in duration-1000">
                   <div className="flex items-center gap-2 text-xs font-black text-white uppercase mb-1">
                      <Brain size={14} className="text-yellow-500" /> CORTEX_SYNC
                   </div>
                   <div className="text-[24px] font-black text-[#22d3ee] tracking-tighter">98.42%</div>
                   <div className="h-0.5 w-full bg-white/5 mt-1 overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '98%' }}></div>
                   </div>
                </div>
             </div>

             {/* Bottom Scanner Navigation Bar */}
             <div className="absolute bottom-4 left-0 w-full flex justify-center gap-10">
                {[2010, 2012, 2015, 2018, 2025].map(yr => (
                  <div key={yr} className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-2 h-2 border border-[#22d3ee] rotate-45 group-hover:bg-[#22d3ee]"></div>
                    <span className="text-[8px] opacity-40 font-bold group-hover:opacity-100">{yr}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* RIGHT PANEL: REPORTS & LOGS */}
        <div className="col-span-3 flex flex-col gap-4 min-h-0">
          {/* Detailed Diagnosis Panel */}
          <div className="flex-1 bg-[#021a2c]/60 border border-[#22d3ee]/20 p-5 rounded flex flex-col gap-4 overflow-hidden">
             <div className="flex items-center justify-between border-b border-[#22d3ee]/10 pb-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-white">Neural History</h3>
                <Database size={14} className="opacity-40" />
             </div>
             
             <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin">
                <div className="space-y-1">
                   <div className="text-[8px] font-black text-yellow-500">2025-05-12 14:22:01</div>
                   <p className="text-[10px] opacity-70 leading-relaxed uppercase">
                      Frontal Lobe Intercept: Phase sequence 0x992 detected. Encryption handshake established. Data flow nominal.
                   </p>
                </div>
                <div className="space-y-1">
                   <div className="text-[8px] font-black text-red-500">2025-05-13 09:11:44</div>
                   <p className="text-[10px] opacity-70 leading-relaxed uppercase">
                      Warning: Sudden spike in Theta waves at Sector G7. Possible neural ghosting occurring.
                   </p>
                </div>
                <div className="space-y-1">
                   <div className="text-[8px] font-black text-[#22d3ee]">2025-05-13 10:45:00</div>
                   <p className="text-[10px] opacity-70 leading-relaxed uppercase">
                      Bio-Matrix successfully reconstructed from remote telemetry. Resolution: 4.8K Sub-Voxel.
                   </p>
                </div>
             </div>

             <div className="mt-auto space-y-3">
                <div className="p-3 bg-cyan-900/10 border border-cyan-500/20 rounded">
                   <h4 className="text-[9px] font-black mb-1 uppercase tracking-widest text-[#22d3ee]">System Advisory</h4>
                   <p className="text-[8px] opacity-50 uppercase leading-tight italic">
                      Do not exceed cortical bandwidth limits during exfiltration. Monitor subject heart-sync for trace detection.
                   </p>
                </div>
                <button className="w-full py-2 bg-[#22d3ee]/10 border border-[#22d3ee]/40 text-[#22d3ee] text-[10px] font-black uppercase tracking-widest hover:bg-[#22d3ee] hover:text-black transition-all">
                   Generate Full Intel Pack
                </button>
             </div>
          </div>

          {/* Mini Stats Grid */}
          <div className="h-32 grid grid-cols-2 gap-2">
             <div className="bg-[#021a2c]/60 border border-white/5 p-3 rounded flex flex-col justify-between">
                <span className="text-[8px] opacity-40 uppercase">Trace Risk</span>
                <span className="text-xl font-black text-[#22d3ee]">LOW</span>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-[#22d3ee]" style={{ width: '20%' }}></div></div>
             </div>
             <div className="bg-[#021a2c]/60 border border-white/5 p-3 rounded flex flex-col justify-between">
                <span className="text-[8px] opacity-40 uppercase">Stability</span>
                <span className="text-xl font-black text-white">94%</span>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-yellow-500" style={{ width: '94%' }}></div></div>
             </div>
          </div>
        </div>
      </div>

      {/* Interface Footer */}
      <div className="h-8 border-t border-[#22d3ee]/20 flex items-center px-6 justify-between text-[8px] font-black tracking-widest opacity-40 uppercase">
         <div className="flex gap-12">
            <span className="flex items-center gap-2"><Shield size={10} /> SECURE_UPLINK_88</span>
            <span>NODE_ENCRYPTION: QUANTUM_CELL_V2</span>
         </div>
         <div className="flex items-center gap-4">
            <span className="text-[#22d3ee] animate-pulse">● CONNECTION_STABLE</span>
            <span>LATENCY: 4ms</span>
         </div>
      </div>
    </div>
  );
};

export default MedicalCore;
