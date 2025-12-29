
import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, ShieldAlert, Cpu, Heart, Thermometer, Database, Search, Target, Eye, Crosshair } from 'lucide-react';

const SkeletonScan: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isAnalysisActive, setIsAnalysisActive] = useState(true);
  const [rotation, setRotation] = useState(0);

  // 3D Point Cloud Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Define a simplified 3D skeletal structure (relative coords)
    // Format: [x, y, z]
    const skeletonPoints: [number, number, number][] = [];
    
    // Skull (Sphere-ish)
    for (let i = 0; i < 200; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      skeletonPoints.push([
        8 * Math.sin(phi) * Math.cos(theta),
        -75 + 10 * Math.sin(phi) * Math.sin(theta),
        8 * Math.cos(phi)
      ]);
    }

    // Spine
    for (let i = 0; i < 40; i++) {
      skeletonPoints.push([
        (Math.random() - 0.5) * 2,
        -60 + i * 2.5,
        (Math.random() - 0.5) * 2
      ]);
    }

    // Ribs (Cycles)
    for (let r = 0; r < 10; r++) {
      for (let i = 0; i < 30; i++) {
        const ang = (i / 30) * Math.PI * 2;
        const radX = 15 - r * 0.5;
        const radZ = 10 - r * 0.3;
        skeletonPoints.push([
          Math.cos(ang) * radX,
          -55 + r * 4,
          Math.sin(ang) * radZ
        ]);
      }
    }

    // Pelvis
    for (let i = 0; i < 100; i++) {
      const ang = (i / 100) * Math.PI * 2;
      skeletonPoints.push([
        Math.cos(ang) * 16,
        40 + Math.sin(ang * 2) * 2,
        Math.sin(ang) * 12
      ]);
    }

    // Arms & Legs (Simplified Segments)
    const addLimb = (startX: number, startY: number, endX: number, endY: number, pts: number) => {
      for (let i = 0; i < pts; i++) {
        const t = i / pts;
        skeletonPoints.push([
          startX + (endX - startX) * t + (Math.random() - 0.5),
          startY + (endY - startY) * t + (Math.random() - 0.5),
          (Math.random() - 0.5) * 2
        ]);
      }
    };

    // Right Arm
    addLimb(16, -55, 30, -20, 40); // Upper
    addLimb(30, -20, 25, 20, 40);  // Lower
    // Left Arm
    addLimb(-16, -55, -30, -20, 40);
    addLimb(-30, -20, -25, 20, 40);
    // Right Leg
    addLimb(12, 45, 14, 100, 60);  // Upper
    addLimb(14, 100, 12, 160, 60); // Lower
    // Left Leg
    addLimb(-12, 45, -14, 100, 60);
    addLimb(-14, 100, -12, 160, 60);

    let angleY = 0;
    const focalLength = 400;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      if (isAnalysisActive) angleY += 0.015;

      // Draw vertical scan lines in background
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Sort points by Z (Painter's algorithm for depth)
      const projected = skeletonPoints.map(pt => {
        // Rotation around Y
        const x = pt[0] * Math.cos(angleY) - pt[2] * Math.sin(angleY);
        const z = pt[0] * Math.sin(angleY) + pt[2] * Math.cos(angleY);
        const y = pt[1];

        const scale = focalLength / (focalLength + z + 200);
        return {
          px: x * scale + width / 2,
          py: y * scale + height / 2,
          pz: z,
          scale
        };
      }).sort((a, b) => b.pz - a.pz);

      // Draw points
      projected.forEach(p => {
        const opacity = Math.max(0.1, (p.pz + 50) / 100);
        const size = Math.max(0.5, p.scale * 2.5);
        
        // Scanline logic: highlight points near the current scan height
        const scanHeight = (progress / 100) * height;
        const distToScan = Math.abs(p.py - scanHeight);
        
        if (distToScan < 5) {
          ctx.fillStyle = '#fff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#22d3ee';
        } else {
          ctx.fillStyle = `rgba(34, 211, 238, ${opacity * 0.6})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillRect(p.px, p.py, size, size);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isAnalysisActive, progress]);

  // Progress update
  useEffect(() => {
    if (!isAnalysisActive) return;
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.5));
    }, 50);
    return () => clearInterval(interval);
  }, [isAnalysisActive]);

  return (
    <div className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 h-full overflow-hidden p-2 lg:p-0">
      {/* Bio-Surveillance Header */}
      <div className="bg-[#0d0208] border border-cyan-500/30 p-5 rounded-lg flex items-center justify-between shadow-[0_0_25px_rgba(6,182,212,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-500/10 rounded-full animate-pulse border border-cyan-500/20">
            <Activity size={24} className="text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.5em] glow-text text-cyan-400">Bio-Neural Point Cloud</h2>
            <div className="text-[9px] font-mono text-cyan-500/40 uppercase tracking-widest mt-1">Uplink: OMEGA-POINT // RECONSTRUCTION: 4K_VOXEL</div>
          </div>
        </div>
        <div className="flex gap-4">
           <div className="hidden md:flex flex-col items-end">
             <span className="text-[8px] text-cyan-500/40 uppercase font-bold tracking-widest">Buffer Status</span>
             <div className="w-32 h-1 bg-cyan-900/20 rounded-full mt-1 overflow-hidden">
               <div className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" style={{ width: `${progress}%` }}></div>
             </div>
           </div>
           <button 
             onClick={() => setIsAnalysisActive(!isAnalysisActive)}
             className={`px-4 py-2 border text-[10px] uppercase font-mono transition-all ${isAnalysisActive ? 'bg-red-500/10 border-red-500/40 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'}`}
           >
             {isAnalysisActive ? 'Freeze Link' : 'Re-Establish'}
           </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Main 3D Display Window */}
        <div className="flex-[2.5] bg-black border border-cyan-500/10 rounded-lg relative flex items-center justify-center overflow-hidden">
          {/* Canvas for Point Cloud */}
          <canvas ref={canvasRef} className="w-full h-full" />
          
          {/* High-Tech HUD Overlays */}
          <div className="absolute inset-0 pointer-events-none">
             {/* Horizontal Scan Bar */}
             <div 
               className="absolute w-full h-[1px] bg-cyan-400/50 shadow-[0_0_20px_#22d3ee] z-30 transition-all duration-100 ease-linear"
               style={{ top: `${progress}%` }}
             >
                <div className="absolute right-10 text-[7px] font-mono text-cyan-400 bg-black/80 px-2 py-0.5 border border-cyan-500/30 uppercase tracking-[0.2em] translate-y-[-100%]">
                  SLICE_SCAN_SEQ: { (progress * 42).toFixed(0) }
                </div>
             </div>

             {/* HUD Brackets */}
             <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-cyan-500/20"></div>
             <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-cyan-500/20"></div>
             <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-cyan-500/20"></div>
             <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-cyan-500/20"></div>

             {/* Center Reticle */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
                <Crosshair size={100} className="text-cyan-400 animate-spin-slow" />
             </div>

             {/* Floating Info Labels */}
             <div className="absolute top-[20%] right-[15%] group">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-[1px] bg-cyan-400/40"></div>
                   <div className="text-[9px] font-mono text-cyan-400 bg-black/60 p-1 border border-cyan-500/20 animate-pulse">CORTEX_MATCH</div>
                </div>
             </div>
             <div className="absolute bottom-[30%] left-[10%] group">
                <div className="flex items-center gap-2">
                   <div className="text-[9px] font-mono text-cyan-400 bg-black/60 p-1 border border-cyan-500/20">FEMUR_INTEGRITY</div>
                   <div className="w-8 h-[1px] bg-cyan-400/40"></div>
                </div>
             </div>
          </div>

          {/* Real-time Telemetry Overlays */}
          <div className="absolute top-12 right-12 flex flex-col gap-3 items-end z-40">
             <div className="bg-black/90 border-r-4 border-cyan-400 p-4 backdrop-blur-md shadow-2xl min-w-[140px] border border-cyan-500/10">
                <div className="text-[9px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2 justify-end">
                   DENSITY <Target size={12} />
                </div>
                <div className="text-xl font-mono text-white tracking-tighter">99.8%</div>
             </div>
             <div className="bg-black/90 border-r-4 border-red-500 p-4 backdrop-blur-md shadow-2xl min-w-[140px] border border-red-500/10">
                <div className="text-[9px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2 justify-end">
                   ANOMALIES <Eye size={12} />
                </div>
                <div className="text-xl font-mono text-white tracking-tighter uppercase">NULL</div>
             </div>
          </div>
        </div>

        {/* Sidebar: Diagnostics */}
        <div className="flex flex-col gap-4 w-full lg:w-[350px]">
          <div className="bg-[#0d0208] border border-cyan-500/20 p-6 rounded-lg flex-1 flex flex-col shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl pointer-events-none"></div>
             <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-8 flex items-center gap-3 border-b border-cyan-500/10 pb-4">
               <Database size={18} /> Neural Bio-Stats
             </h3>
             
             <div className="space-y-6 flex-1 overflow-y-auto scrollbar-thin pr-2">
                {[
                  { label: 'Neural Linkage', val: 'SECURE', icon: Cpu, color: 'text-cyan-400', pct: 94 },
                  { label: 'Marrow Density', val: 'NOMINAL', icon: Heart, color: 'text-red-500', pct: 88 },
                  { label: 'Structural Sync', val: 'ACTIVE', icon: Target, color: 'text-yellow-500', pct: 100 },
                  { label: 'Thermal Pattern', val: '36.8°C', icon: Thermometer, color: 'text-white', pct: 36.8 }
                ].map((stat, i) => (
                  <div key={i} className="group">
                     <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest mb-2">
                        <span className="flex items-center gap-2 text-white/40 group-hover:text-cyan-400 transition-colors">
                           <stat.icon size={14} className={stat.color} /> {stat.label}
                        </span>
                        <span className={`${stat.color} font-bold`}>{stat.val}</span>
                     </div>
                     <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/10">
                        <div className={`h-full transition-all duration-1000 ${stat.color.replace('text', 'bg')} shadow-[0_0_10px_currentColor]`} style={{ width: `${stat.pct}%` }}></div>
                     </div>
                  </div>
                ))}
             </div>

             <div className="mt-8 p-4 bg-cyan-950/20 border border-cyan-500/20 rounded flex items-start gap-4">
                <ShieldAlert size={18} className="text-cyan-400 shrink-0 mt-1 animate-pulse" />
                <p className="text-[10px] font-mono text-white/40 leading-relaxed uppercase">
                  Warning: Biological signature is being transmitted through local proxy. Maintain signal strength to prevent voxel fragmentation.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Tactics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Interface Mode', val: 'VOXEL_RENDER', icon: Zap, color: 'text-cyan-400' },
          { label: 'Bio-Grounding', val: 'SAQIB_ROOT', icon: Search, color: 'text-[#00ff41]' },
          { label: 'Scan Engine', val: 'NEO_STRUCT', icon: Cpu, color: 'text-yellow-500' },
          { label: 'Trace Risk', val: 'IDLE', icon: ShieldAlert, color: 'text-white' }
        ].map((item, i) => (
          <div key={i} className="bg-[#0d0208] border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:border-cyan-500/40 transition-all cursor-default group">
            <item.icon size={20} className={`${item.color} group-hover:scale-110 transition-transform`} />
            <div className="flex flex-col">
              <span className="text-[8px] text-white/30 uppercase font-black tracking-widest">{item.label}</span>
              <span className={`text-xs font-mono font-bold uppercase ${item.color}`}>{item.val}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonScan;
