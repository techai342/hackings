
import React, { useState, useEffect } from 'react';
import { Globe, MapPin, Search, Activity, ShieldAlert, Satellite, Wifi, Target, Info, Database } from 'lucide-react';

const IPInterceptor: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [activeTrace, setActiveTrace] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const generateIP = () => `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
  const locations = ["MOSCOW", "BEIJING", "NEW_YORK", "PARIS", "SEOUL", "MUMBAI", "NEO_TOKYO"];

  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry = {
        id: Date.now(),
        ip: generateIP(),
        loc: locations[Math.floor(Math.random() * locations.length)],
        status: Math.random() > 0.8 ? "HIGH_THREAT" : "NOMINAL",
        port: Math.floor(Math.random() * 9000)
      };
      setLogs(prev => [newEntry, ...prev].slice(0, 8));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const triggerTrace = (ip: string) => {
    setActiveTrace(ip);
    setProgress(0);
    const traceInt = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(traceInt);
          return 100;
        }
        return p + 5;
      });
    }, 100);
  };

  return (
    <div className="flex-1 bg-black text-[#00ff41] font-mono flex flex-col p-4 gap-4 overflow-hidden border-2 border-[#00ff41]/20 relative">
      {/* Tactical Grid Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Header Panel */}
      <div className="h-16 bg-[#0d0208] border border-[#00ff41]/30 p-4 rounded flex items-center justify-between shadow-[0_0_20px_rgba(0,255,65,0.1)] z-10">
        <div className="flex items-center gap-4">
          <Satellite size={24} className="text-cyan-400 animate-pulse" />
          <h2 className="text-sm font-black uppercase tracking-[0.5em] glow-text">IP Interceptor v4.0</h2>
        </div>
        <div className="flex gap-8 text-[10px] opacity-60">
           <div className="flex items-center gap-2">
              <Activity size={14} />
              <span>NODES: 412</span>
           </div>
           <div className="flex items-center gap-2">
              <Target size={14} className="text-red-500" />
              <span>TRACES: {activeTrace ? '1' : '0'}</span>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 z-10">
        {/* Left: Map Visualization */}
        <div className="col-span-12 lg:col-span-8 bg-black/60 border border-[#00ff41]/20 rounded relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain filter brightness-100 invert-[0.1] hue-rotate-[90deg]"></div>
          
          {/* Active Trace UI */}
          {activeTrace && (
            <div className="relative z-20 flex flex-col items-center">
               <div className="relative">
                 <Target size={120} className="text-red-500 animate-ping opacity-40 absolute -inset-10" />
                 <Target size={120} className="text-red-600 animate-pulse" />
                 <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
               </div>
               <div className="mt-8 bg-black/80 border border-red-500 p-4 text-center">
                  <div className="text-xs font-black uppercase text-red-500 mb-1">Target Identified</div>
                  <div className="text-lg font-black text-white">{activeTrace}</div>
                  <div className="text-[9px] opacity-60 mt-2">GEO_COORDS: 35.6895° N, 139.6917° E</div>
                  <div className="mt-4 w-48 h-1 bg-red-950 rounded-full overflow-hidden">
                     <div className="h-full bg-red-500 transition-all duration-100" style={{ width: `${progress}%` }}></div>
                  </div>
               </div>
            </div>
          )}

          {/* Random Intercept Markers */}
          {!activeTrace && [...Array(5)].map((_, i) => (
             <div key={i} className="absolute w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_cyan]" style={{ top: `${20 + i*15}%`, left: `${10 + i*18}%` }}></div>
          ))}

          {/* HUD Overlay */}
          <div className="absolute top-4 right-4 text-[8px] font-mono text-[#00ff41]/40 uppercase text-right space-y-1">
             <div>Source: OLYMPUS_GATEWAY</div>
             <div>Protocol: ICMP_REDIRECT</div>
             <div>Filter: OFF</div>
          </div>
        </div>

        {/* Right: Live Log */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
           <div className="flex-1 bg-[#0d0208] border border-[#00ff41]/20 p-4 rounded flex flex-col overflow-hidden">
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-[#00ff41]/10 pb-2">
                 <Database size={14} /> Incoming Requests
              </h3>
              <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin">
                 {logs.map((log) => (
                   <div key={log.id} onClick={() => triggerTrace(log.ip)} className="p-3 border border-white/5 bg-white/5 rounded hover:border-[#00ff41]/40 group cursor-pointer transition-all">
                      <div className="flex justify-between items-center mb-1">
                         <span className="text-[10px] font-black text-white group-hover:text-[#00ff41]">{log.ip}</span>
                         <span className={`text-[8px] px-1 border ${log.status === 'HIGH_THREAT' ? 'border-red-500 text-red-500' : 'border-cyan-500 text-cyan-400'}`}>
                           {log.status}
                         </span>
                      </div>
                      <div className="flex justify-between text-[8px] opacity-40 uppercase">
                         <span>Loc: {log.loc}</span>
                         <span>Port: {log.port}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-red-950/10 border border-red-500/30 p-4 rounded">
              <div className="flex items-center gap-3 text-red-500 mb-2">
                 <ShieldAlert size={18} className="animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Trace Warning</span>
              </div>
              <p className="text-[9px] opacity-60 uppercase leading-tight">
                 Local node 0x77AF is being pinged by unknown source. Deploying counter-ICE.
              </p>
           </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="h-8 border-t border-[#00ff41]/10 flex items-center px-4 justify-between text-[8px] font-black tracking-widest opacity-40 uppercase">
         <span>Uplink: STABLE // Enc: RSA_2048</span>
         <span>Latency: 14ms</span>
      </div>
    </div>
  );
};

export default IPInterceptor;
