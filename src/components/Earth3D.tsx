
import React, { useState, useEffect } from 'react';
import { Globe, Satellite, Zap, Crosshair, Shield, Activity, Lock, Unlock } from 'lucide-react';

const Earth3D: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (isLocked) return;
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.15) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isLocked]);

  return (
    <div className="flex-1 flex flex-col gap-4 animate-in fade-in zoom-in duration-1000 h-full overflow-hidden">
      {/* Cinematic Header */}
      <div className="bg-[#050505] border border-cyan-500/40 p-5 rounded-lg flex items-center justify-between shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-500/10 rounded-full">
            <Globe size={24} className="text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.5em] glow-text text-cyan-400">Orbital Interface v7.0</h2>
            <div className="text-[9px] font-mono text-cyan-500/40 uppercase tracking-widest mt-1">Status: Stable Orbit established</div>
          </div>
        </div>
        <button 
          onClick={() => setIsLocked(!isLocked)}
          className={`flex items-center gap-2 px-4 py-2 border transition-all font-mono text-[10px] uppercase tracking-widest ${isLocked ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-cyan-500/10 border-cyan-500 text-cyan-400'}`}
        >
          {isLocked ? <Lock size={14} /> : <Unlock size={14} />}
          {isLocked ? 'Orbit Locked' : 'Free Rotation'}
        </button>
      </div>

      <div className="flex-1 bg-black border border-cyan-500/10 rounded-lg relative flex items-center justify-center overflow-hidden">
        {/* Realistic Starfield Background */}
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[length:100px_100px] opacity-10"></div>
        
        {/* Realistic Volumetric Globe */}
        <div className="relative w-80 h-80 lg:w-[520px] lg:h-[520px] flex items-center justify-center">
          {/* Atmospheric Halo */}
          <div className="absolute inset-[-40px] rounded-full bg-cyan-500/5 blur-[60px]"></div>
          
          {/* Main Globe Sphere */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.15)] border border-cyan-500/30">
            {/* The Earth Surface (Realistic texture) */}
            <div 
              className="absolute inset-0 bg-cover brightness-[0.8] grayscale-[0.1]"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=1600')`,
                backgroundPosition: `${rotation}% center`,
                backgroundSize: '200% 100%',
                transition: 'background-position 0.1s linear'
              }}
            ></div>

            {/* Parallax Clouds (Moves at a slightly different speed) */}
            <div 
              className="absolute inset-0 bg-cover opacity-20 mix-blend-screen scale-110"
              style={{ 
                backgroundImage: `url('https://www.transparenttextures.com/patterns/clouds.png')`,
                backgroundPosition: `${rotation * 1.3}% center`,
                backgroundSize: '200% 100%'
              }}
            ></div>

            {/* Volumetric Shading (Creates the 3D "Ball" look) */}
            <div className="absolute inset-0 rounded-full shadow-[inset_-80px_-80px_120px_rgba(0,0,0,0.95),inset_40px_40px_80px_rgba(255,255,255,0.08)] pointer-events-none"></div>
            
            {/* Edge Glare */}
            <div className="absolute inset-0 rounded-full border-[12px] border-cyan-400/5 blur-[8px] pointer-events-none"></div>
          </div>

          {/* HUD Target Overlay */}
          <div className="absolute inset-[-20%] pointer-events-none opacity-40">
             <div className="absolute inset-0 border border-cyan-500/10 rounded-full scale-90"></div>
             <div className="absolute inset-0 border-[2px] border-dashed border-cyan-500/5 rounded-full animate-spin-slow"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Crosshair size={60} className="text-cyan-400/20" />
             </div>
          </div>

          {/* Target Nodes (Fixed positions that rotate with background if we used 3D, here simulated) */}
          <div className="absolute top-[25%] left-[40%] animate-pulse">
             <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_red]"></div>
             <div className="absolute top-full left-full whitespace-nowrap text-[8px] font-mono text-red-500 bg-black/80 px-1 border border-red-500/30">
               INTERCEPT: SIG-9
             </div>
          </div>
        </div>

        {/* Real-time Telemetry (Thehra/Stable Aligned) */}
        <div className="absolute top-12 left-12 p-6 bg-black/80 border-l-2 border-cyan-400 backdrop-blur-xl space-y-4 min-w-[200px]">
           <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-2">
             <Satellite size={16} className="text-cyan-400" />
             <span className="text-[11px] font-black text-white uppercase tracking-widest">Orbital Stats</span>
           </div>
           <div className="space-y-3 font-mono text-[9px] uppercase">
             <div className="flex justify-between">
                <span className="text-cyan-400/60">Velocity:</span>
                <span className="text-white">27,612 km/h</span>
             </div>
             <div className="flex justify-between">
                <span className="text-cyan-400/60">Altitude:</span>
                <span className="text-white">412.8 km</span>
             </div>
             <div className="flex justify-between">
                <span className="text-cyan-400/60">Uptime:</span>
                <span className="text-[#00ff41]">99.999%</span>
             </div>
           </div>
        </div>

        <div className="absolute bottom-12 right-12 p-6 bg-black/80 border-r-2 border-[#00ff41] backdrop-blur-xl text-right space-y-2">
           <div className="text-[10px] font-bold text-[#00ff41] uppercase tracking-[0.3em]">Neural Uplink</div>
           <div className="text-3xl font-black text-white glow-text tracking-tighter">SECURE</div>
           <div className="text-[8px] font-mono text-[#00ff41]/40">ENCRYPTION: QUANTUM_AES</div>
        </div>
      </div>

      {/* Footer Tactical Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Thermal Sig', val: 'Nominal', icon: Zap, color: 'text-yellow-400' },
          { label: 'Ground Nodes', val: '4,102 ONLINE', icon: Globe, color: 'text-cyan-400' },
          { label: 'Trace Risk', val: '0.01%', icon: Shield, color: 'text-[#00ff41]' },
          { label: 'Latency', val: '12ms', icon: Activity, color: 'text-white' }
        ].map((item, i) => (
          <div key={i} className="bg-[#050505] border border-white/10 p-4 rounded flex items-center gap-4 hover:border-cyan-400 transition-all cursor-default">
            <item.icon size={20} className={item.color} />
            <div className="flex flex-col">
              <span className="text-[8px] text-white/40 uppercase font-bold tracking-widest">{item.label}</span>
              <span className={`text-xs font-mono uppercase ${item.color}`}>{item.val}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Earth3D;
