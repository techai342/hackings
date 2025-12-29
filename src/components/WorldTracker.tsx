
import React, { useState, useEffect } from 'react';
import { MapPin, Search, ShieldAlert, Cpu, Activity, Globe } from 'lucide-react';

const WorldTracker: React.FC = () => {
  const [scanLineY, setScanLineY] = useState(0);
  const [scanLineX, setScanLineX] = useState(0);
  const [alerts, setAlerts] = useState<{ id: number, label: string, x: number, y: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLineY(prev => (prev >= 100 ? 0 : prev + 1));
      setScanLineX(prev => (prev >= 100 ? 0 : prev + 0.5));
    }, 40);

    const alertInterval = setInterval(() => {
      const labels = ["EUROPE", "AFRICA", "ASIA", "AMERICA", "AUSTRALIA", "SOUTH AMERICA"];
      const label = labels[Math.floor(Math.random() * labels.length)];
      setAlerts(prev => [
        { id: Date.now(), label, x: 20 + Math.random() * 60, y: 20 + Math.random() * 60 },
        ...prev
      ].slice(0, 5));
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(alertInterval);
    };
  }, []);

  return (
    <div className="flex-1 bg-[#050505] text-[#00ff41] font-mono flex flex-col p-4 gap-4 overflow-hidden border-2 border-[#00ff41]/20 relative select-none">
      {/* World Map Backdrop (Custom Styled) */}
      <div className="flex-1 relative bg-black/40 border border-[#00ff41]/20 overflow-hidden group">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain filter brightness-150 saturate-150 hue-rotate-[90deg]"></div>
        
        {/* Neon Grid Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,255,65,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.2)_1px,transparent_1px)] bg-[length:40px_40px]"></div>

        {/* High-Intensity Horizontal Scan Line */}
        <div 
          className="absolute w-full h-[2px] bg-[#00ff41] shadow-[0_0_25px_#00ff41] z-10 transition-all duration-100 ease-linear"
          style={{ top: `${scanLineY}%` }}
        >
          <div className="absolute right-4 -top-6 text-[8px] bg-black border border-[#00ff41]/40 px-1 font-bold animate-pulse">
            SCAN_AXIS_Y: {scanLineY.toFixed(2)}
          </div>
        </div>

        {/* High-Intensity Vertical Scan Line */}
        <div 
          className="absolute h-full w-[2px] bg-[#00ff41] shadow-[0_0_25px_#00ff41] z-10 transition-all duration-100 ease-linear"
          style={{ left: `${scanLineX}%` }}
        >
          <div className="absolute -left-12 bottom-4 text-[8px] bg-black border border-[#00ff41]/40 px-1 font-bold rotate-90 origin-bottom-left">
            TRACE_COORD_X: {scanLineX.toFixed(2)}
          </div>
        </div>

        {/* Pulsing Intercept Markers */}
        {alerts.map(a => (
          <div 
            key={a.id}
            className="absolute z-20 flex flex-col items-center gap-1 animate-in zoom-in duration-300"
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
          >
             <div className="relative">
                <MapPin size={24} className="text-white drop-shadow-[0_0_10px_white]" />
                <div className="absolute -inset-2 bg-white/20 rounded-full animate-ping"></div>
             </div>
             <div className="bg-white text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter shadow-lg">
                {a.label}
             </div>
             <div className="text-[7px] font-mono text-white/60 bg-black/80 border border-white/20 px-1 mt-1">
                INTERCEPT_0x{Math.floor(Math.random()*999)}
             </div>
          </div>
        ))}

        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 flex flex-col gap-1">
           <div className="text-sm font-black tracking-widest flex items-center gap-2">
              <Globe size={18} className="animate-pulse" />
              <span>GLOBAL TRACKER v4.0.2</span>
           </div>
           <div className="text-[10px] opacity-40">Uplink: STABLE // Sector: NOMINAL</div>
        </div>
      </div>

      {/* Footer Info Hub */}
      <div className="h-44 grid grid-cols-12 gap-4 shrink-0">
        <div className="col-span-12 lg:col-span-4 border border-[#00ff41]/30 p-3 bg-[#00ff41]/5 flex flex-col gap-2 overflow-hidden">
           <div className="flex justify-between items-center border-b border-[#00ff41]/20 pb-1 mb-1">
              <span className="text-[10px] font-black">Intercept Log</span>
              <Activity size={14} className="text-white/40" />
           </div>
           <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="text-[9px] flex justify-between opacity-60">
                   <span>{new Date().toLocaleTimeString()}</span>
                   <span className="text-white truncate max-w-[150px]">Node 0x{821+i} connection capture successful.</span>
                </div>
              ))}
           </div>
        </div>

        <div className="col-span-12 lg:col-span-4 border border-[#00ff41]/30 p-4 flex flex-col items-center justify-center gap-4 relative">
           <div className="absolute top-1 left-2 text-[8px] opacity-40 uppercase tracking-widest">Neural Link Status</div>
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 border-2 border-[#00ff41] rounded-full flex items-center justify-center">
                 <Cpu size={32} className="text-[#00ff41] animate-pulse" />
              </div>
              <div className="flex flex-col">
                 <span className="text-2xl font-black text-white glow-text">98.4%</span>
                 <span className="text-[10px] opacity-60">SYMMETRIC_SYNC</span>
              </div>
           </div>
           <div className="w-full h-1 bg-[#00ff41]/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#00ff41] shadow-[0_0_10px_#00ff41]" style={{ width: '98%' }}></div>
           </div>
        </div>

        <div className="col-span-12 lg:col-span-4 border border-red-500/30 p-3 bg-red-950/10 flex flex-col gap-2">
           <div className="flex items-center gap-2 text-red-500 mb-2">
              <ShieldAlert size={16} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Trace Alerts</span>
           </div>
           <p className="text-[10px] opacity-60 leading-tight uppercase">
              Warning: Local node detected by counter-ICE in European Sector. Shifting relay to Asia Hub 4.
           </p>
           <button className="mt-auto w-full py-1.5 border border-red-500/50 text-red-500 text-[10px] font-bold uppercase hover:bg-red-500 hover:text-white transition-all">
              Initiate Ghost Protocol
           </button>
        </div>
      </div>
    </div>
  );
};

export default WorldTracker;
