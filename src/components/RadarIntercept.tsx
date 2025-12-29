
import React, { useState, useEffect, useRef } from 'react';
import { Activity, Globe, Satellite, Zap, ShieldAlert, Target, Wifi } from 'lucide-react';

const RadarIntercept: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [targets, setTargets] = useState<{ x: number, y: number, id: number, opacity: number }[]>([]);

  // Rotate the beam
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Update targets based on beam position
  useEffect(() => {
    const beamAngle = rotation;
    setTargets(prev => {
      // Fade existing targets
      const updated = prev.map(t => ({ ...t, opacity: Math.max(0, t.opacity - 0.05) }));
      
      // Occasionally add new target near beam
      if (Math.random() > 0.95) {
        const dist = 20 + Math.random() * 70;
        const rad = (beamAngle * Math.PI) / 180;
        updated.push({
          id: Date.now(),
          x: 50 + Math.cos(rad) * (dist / 2),
          y: 50 + Math.sin(rad) * (dist / 2),
          opacity: 1
        });
      }
      return updated.filter(t => t.opacity > 0).slice(-10);
    });
  }, [rotation]);

  return (
    <div className="flex-1 bg-black text-[#00ff41] font-mono p-4 flex flex-col gap-4 relative overflow-hidden select-none border-2 border-[#00ff41]/20">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(0,255,65,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.2)_1px,transparent_1px)] bg-[length:40px_40px]"></div>

      {/* Main UI Header */}
      <div className="flex justify-between items-start z-10 border-b border-[#00ff41]/30 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-[#00ff41] rounded-full animate-pulse shadow-[0_0_10px_#00ff41]"></div>
             <h2 className="text-xl font-black uppercase tracking-[0.4em] glow-text">Radar Intercept</h2>
          </div>
          <div className="text-[10px] opacity-60 uppercase tracking-widest">Global Tactical Surveillance // Unit: OMEGA-4</div>
        </div>
        <div className="flex gap-10">
           <div className="flex flex-col items-end">
              <span className="text-[9px] opacity-40 uppercase">Bearing</span>
              <span className="text-lg font-bold">{rotation.toString().padStart(3, '0')}° MARK</span>
           </div>
           <div className="flex flex-col items-end">
              <span className="text-[9px] opacity-40 uppercase">Trace_ID</span>
              <span className="text-lg font-bold">X-992-K</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        {/* Main Radar Container - Reduced from max-w-[600px] to max-w-[480px] */}
        <div className="relative aspect-square w-full max-w-[480px] border-4 border-[#00ff41]/40 rounded-full flex items-center justify-center shadow-[inset_0_0_50px_rgba(0,255,65,0.1)]">
          
          {/* World Map Image (Dotted Effect) */}
          <div className="absolute inset-10 opacity-20 mask-image-[radial-gradient(circle,black,transparent)]">
            <svg viewBox="0 0 100 60" className="w-full h-full fill-[#00ff41]">
              <path d="M10 20 Q15 10 25 15 T40 20 T60 15 T85 20 L90 40 Q80 50 60 45 T30 50 T10 40 Z" opacity="0.3" />
              <circle cx="20" cy="30" r="1.5" />
              <circle cx="45" cy="25" r="2" />
              <circle cx="70" cy="35" r="1.5" />
              <circle cx="85" cy="15" r="1" />
              {/* Simplified dotted map pattern */}
              {[...Array(200)].map((_, i) => (
                <rect key={i} x={Math.random()*100} y={Math.random()*60} width="0.5" height="0.5" />
              ))}
            </svg>
          </div>

          {/* Concentric Circles */}
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="absolute border border-[#00ff41]/20 rounded-full" style={{ width: `${i * 25}%`, height: `${i * 25}%` }}></div>
          ))}

          {/* Crosshair Lines */}
          <div className="absolute w-full h-[1px] bg-[#00ff41]/20"></div>
          <div className="absolute h-full w-[1px] bg-[#00ff41]/20"></div>

          {/* Degree Markers */}
          {[...Array(36)].map((_, i) => (
            <div key={i} className="absolute inset-0 flex items-start justify-center" style={{ transform: `rotate(${i * 10}deg)` }}>
              <div className="h-4 w-[1px] bg-[#00ff41]/40"></div>
              {i % 3 === 0 && (
                <span className="absolute -top-6 text-[8px] opacity-60">{(i * 10).toString().padStart(3, '0')}</span>
              )}
            </div>
          ))}

          {/* The Rotating Beam */}
          <div 
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="absolute top-1/2 left-1/2 w-1/2 h-[100px] -translate-y-full origin-left bg-gradient-to-t from-[#00ff41]/40 to-transparent blur-md"></div>
            <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-[#00ff41] shadow-[0_0_15px_#00ff41] origin-left"></div>
          </div>

          {/* Targets */}
          {targets.map(t => (
            <div 
              key={t.id}
              className="absolute w-3 h-3 bg-[#00ff41] shadow-[0_0_10px_#00ff41] rounded-sm transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
              style={{ left: `${t.x}%`, top: `${t.y}%`, opacity: t.opacity }}
            >
               <div className="absolute -inset-2 border border-[#00ff41]/40 rounded-full animate-ping"></div>
            </div>
          ))}

          {/* Center Hub */}
          <div className="z-30 w-10 h-10 bg-black border-2 border-[#00ff41] rounded-full flex items-center justify-center">
             <Target size={16} className="animate-pulse" />
          </div>
        </div>

        {/* Peripheral Modules */}
        {/* Top Right: Wireframe Globe */}
        <div className="absolute top-0 right-0 w-28 h-28 border-2 border-[#00ff41]/20 bg-black/40 flex flex-col items-center justify-center">
           <div className="text-[8px] font-bold border-b border-[#00ff41]/20 w-full text-center pb-1 mb-2">ORBITAL_CAM</div>
           <Globe size={40} className="animate-spin-slow opacity-60" />
           <div className="mt-2 text-[7px] animate-pulse">LOCK_SYNC...</div>
        </div>

        {/* Bottom Left: Oscilloscope Waveform */}
        <div className="absolute bottom-0 left-0 w-44 h-24 border-2 border-[#00ff41]/20 bg-black/40 p-2 overflow-hidden">
           <div className="text-[8px] font-bold border-b border-[#00ff41]/20 mb-2">SIGNAL_WAVEFORM</div>
           <div className="flex items-end gap-[1px] h-10">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-[#00ff41]/60" 
                  style={{ height: `${20 + Math.sin((rotation + i * 10) * Math.PI / 180) * 20}%` }}
                ></div>
              ))}
           </div>
           <div className="mt-2 text-[7px] flex justify-between uppercase">
              <span>Freq: 14.2Ghz</span>
              <span>Mod: QPSK</span>
           </div>
        </div>

        {/* Bottom Right: Signal Equalizer Bars */}
        <div className="absolute bottom-0 right-0 w-44 h-24 border-2 border-[#00ff41]/20 bg-black/40 p-2 overflow-hidden flex flex-col">
           <div className="text-[8px] font-bold border-b border-[#00ff41]/20 mb-2 uppercase">Node Integrity</div>
           <div className="flex-1 flex items-end justify-between gap-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex-1 bg-[#00ff41]/20 relative">
                   <div 
                     className="absolute bottom-0 left-0 right-0 bg-[#00ff41] transition-all duration-300" 
                     style={{ height: `${Math.random() * 80 + 20}%` }}
                   ></div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Footer System Status Bar */}
      <div className="mt-auto flex gap-4 h-10 z-10">
        <div className="flex-1 bg-[#00ff41]/5 border border-[#00ff41]/20 flex items-center px-4 justify-between">
           <div className="flex items-center gap-4">
              <span className="text-[9px] font-bold uppercase">System: Operational</span>
              <div className="w-px h-4 bg-[#00ff41]/20"></div>
              <span className="text-[9px] font-mono text-[#00ff41]/60">LAT: 51.5074° N // LNG: 0.1278° W</span>
           </div>
           <div className="flex gap-4">
              <div className="flex items-center gap-2">
                 <Wifi size={12} />
                 <span className="text-[9px]">UPLINK_STABLE</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RadarIntercept;
