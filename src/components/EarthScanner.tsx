
import React, { useState, useEffect } from 'react';
import { 
  Globe, Crosshair, MapPin, Search, Activity, Zap, ShieldAlert, 
  Satellite, ZoomIn, ZoomOut, Layers, Maximize2, Building2, 
  Eye, Target, Map, Navigation, Wifi, Info
} from 'lucide-react';

const EarthScanner: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(2);
  const [isReLinking, setIsReLinking] = useState(false);
  const [activeCity, setActiveCity] = useState(0);

  // Expanded City Database
  const cities = [
    { 
      id: 0, 
      name: "NEO-TOKYO (SHIBUYA)", 
      lat: "35.6580", 
      lng: "139.7016", 
      img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=2400",
      stats: { pop: "High", grid: "Stable", nodes: 1422, threat: "Minimal" }
    },
    { 
      id: 1, 
      name: "LONDON (THE SHARD)", 
      lat: "51.5045", 
      lng: "-0.0865", 
      img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2400",
      stats: { pop: "Medium", grid: "Filtering", nodes: 890, threat: "Moderate" }
    },
    { 
      id: 2, 
      name: "DUBAI (DOWNTOWN)", 
      lat: "25.2048", 
      lng: "55.2708", 
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2400",
      stats: { pop: "High", grid: "Locked", nodes: 2105, threat: "Low" }
    },
    { 
      id: 3, 
      name: "NYC (MANHATTAN)", 
      lat: "40.7831", 
      lng: "-73.9712", 
      img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=2400",
      stats: { pop: "Maximum", grid: "Unstable", nodes: 4501, threat: "Critical" }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.12) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleCitySwitch = (index: number) => {
    if (index === activeCity) return;
    setIsReLinking(true);
    setTimeout(() => {
      setActiveCity(index);
      setIsReLinking(false);
      setZoom(2);
    }, 1500);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => direction === 'in' ? Math.min(prev + 0.5, 6) : Math.max(prev - 0.5, 1));
  };

  const current = cities[activeCity];

  return (
    <div className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 h-full overflow-hidden p-2 lg:p-4 bg-[#050505]">
      {/* Tactical Surveillance Header */}
      <div className="bg-[#0d0208] border border-cyan-500/30 p-5 rounded-lg flex items-center justify-between shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-500/10 rounded-full animate-pulse border border-cyan-500/20">
            <Satellite size={26} className="text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.5em] glow-text text-cyan-400">Urban Intercept Matrix</h2>
            <div className="text-[9px] font-mono text-cyan-500/40 uppercase tracking-widest mt-1">Satellite: OLYMPUS-4 // Session: {current.name}</div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-mono text-cyan-500/60 uppercase">
          <div className="flex flex-col items-end">
            <span className="text-white/30 tracking-tighter">MAGNIFICATION</span>
            <span className="text-cyan-400 font-bold">{zoom.toFixed(1)}X OPTICAL</span>
          </div>
          <div className="w-px h-8 bg-cyan-500/20"></div>
          <div className="flex flex-col items-end">
            <span className="text-white/30 tracking-tighter">GRID_SYNC</span>
            <span className="text-[#00ff41] font-bold">LOCKED</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Sidebar: Tactical Controls & Selection */}
        <div className="flex flex-col gap-4 w-full lg:w-[350px]">
          {/* Multi-City Selection Grid */}
          <div className="bg-[#0d0208] border border-cyan-500/20 p-5 rounded-lg flex flex-col shadow-xl">
             <div className="flex items-center gap-3 mb-6 border-b border-cyan-500/10 pb-3">
                <Navigation size={18} className="text-cyan-400" />
                <h3 className="text-[11px] font-black text-white uppercase tracking-widest">Global Deployments</h3>
             </div>
             <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[300px] scrollbar-thin pr-1">
                {cities.map((city, idx) => (
                  <button 
                    key={city.id} 
                    onClick={() => handleCitySwitch(idx)}
                    className={`group relative flex items-center gap-4 p-3 border transition-all duration-300 ${activeCity === idx ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'border-white/5 hover:border-cyan-500/30 bg-white/5 hover:bg-cyan-500/5'}`}
                  >
                    <div className="w-12 h-12 rounded overflow-hidden border border-white/10 shrink-0">
                       <img src={city.img} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" alt={city.name} />
                    </div>
                    <div className="flex flex-col text-left truncate">
                       <span className={`text-[10px] font-bold tracking-widest uppercase ${activeCity === idx ? 'text-cyan-400' : 'text-white/60'}`}>{city.name}</span>
                       <span className="text-[8px] font-mono text-white/30">{city.lat}N / {city.lng}E</span>
                    </div>
                    {activeCity === idx && <div className="absolute right-3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_cyan]"></div>}
                  </button>
                ))}
             </div>
          </div>

          {/* Detailed Sector Telemetry */}
          <div className="bg-[#050505] border border-cyan-500/20 p-5 rounded-lg flex-1 overflow-hidden flex flex-col">
             <div className="flex items-center gap-3 mb-6 text-cyan-400">
                <Info size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Sector Metrics</span>
             </div>
             <div className="space-y-5">
                {[
                  { label: 'Population Density', val: current.stats.pop, color: 'text-cyan-400' },
                  { label: 'Power Grid Integrity', val: current.stats.grid, color: 'text-[#00ff41]' },
                  { label: 'Local Subnet Nodes', val: current.stats.nodes, color: 'text-yellow-400' },
                  { label: 'Risk Assessment', val: current.stats.threat, color: current.stats.threat === 'Critical' ? 'text-red-500' : 'text-cyan-400' }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1 border-l-2 border-white/10 pl-3">
                     <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</span>
                     <span className={`text-xs font-mono font-bold ${stat.color}`}>{stat.val}</span>
                  </div>
                ))}
             </div>
             
             {/* Progress Visualizer */}
             <div className="mt-auto pt-6 border-t border-cyan-500/10">
                <div className="flex justify-between text-[8px] font-mono text-cyan-500/40 mb-1">
                   <span>DATA_SYNC_BUFFER</span>
                   <span>{(Math.random() * 100).toFixed(0)}%</span>
                </div>
                <div className="h-0.5 bg-cyan-950 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-400 animate-pulse" style={{ width: '65%' }}></div>
                </div>
             </div>
          </div>
        </div>

        {/* Main High-Resolution Satellite View */}
        <div className="flex-1 bg-black border border-cyan-500/10 rounded-lg relative overflow-hidden shadow-2xl flex flex-col group">
          {/* Zoom Overlay UI */}
          <div className="absolute top-6 right-6 z-40 flex flex-col gap-3">
             <button onClick={() => handleZoom('in')} className="p-3 bg-black/80 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all rounded shadow-lg backdrop-blur-md">
               <ZoomIn size={22} />
             </button>
             <button onClick={() => handleZoom('out')} className="p-3 bg-black/80 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all rounded shadow-lg backdrop-blur-md">
               <ZoomOut size={22} />
             </button>
             <div className="h-px w-full bg-cyan-500/20 my-2"></div>
             <button className="p-3 bg-black/80 border border-cyan-500/40 text-cyan-400 rounded hover:bg-cyan-400 hover:text-black transition-all">
               <Layers size={22} />
             </button>
          </div>

          {/* The Live Satellite Map Window */}
          <div className="flex-1 relative overflow-hidden cursor-crosshair">
            {/* Satellite Image Core */}
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out ${isReLinking ? 'scale-150 blur-xl opacity-0' : 'scale-100 opacity-100'}`}
              style={{ 
                backgroundImage: `url(${current.img})`,
                transform: `scale(${zoom})`,
                filter: `grayscale(0.2) contrast(1.2) brightness(0.9)`
              }}
            ></div>

            {/* Re-linking Overlay (Thehra Animation) */}
            {isReLinking && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg">
                 <div className="relative mb-8">
                   <div className="w-24 h-24 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin"></div>
                   <Satellite size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-pulse" />
                 </div>
                 <h2 className="text-xl font-black text-white uppercase tracking-[0.5em] glow-text">Establishing Link...</h2>
                 <p className="text-[10px] font-mono text-cyan-400/60 mt-2 uppercase tracking-[0.3em]">Re-tasking Orbital Asset OLYMPUS-4</p>
              </div>
            )}

            {/* Static Grid & HUD Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
               <div className="absolute inset-0 bg-[linear-gradient(transparent_39px,#22d3ee_1px),linear-gradient(90deg,transparent_39px,#22d3ee_1px)] bg-[length:40px_40px]"></div>
            </div>

            {/* Simulated Identified Buildings (Dynamic Boxes) */}
            {!isReLinking && (
               <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div 
                     key={i} 
                     className="absolute border border-cyan-400/30 flex flex-col animate-in fade-in zoom-in"
                     style={{ 
                       top: `${25 + (i * 12) + (Math.sin(i) * 5)}%`, 
                       left: `${20 + (i * 10) + (Math.cos(i) * 10)}%`, 
                       width: '100px', 
                       height: '100px',
                       transform: `scale(${1/zoom})`
                     }}
                    >
                       <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></div>
                       <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></div>
                       <div className="p-1 bg-black/60 text-[7px] font-mono text-cyan-400 uppercase tracking-tighter truncate">
                          OBJ_ID: {activeCity}_STR_{100 + i}
                       </div>
                       <div className="mt-auto p-1 bg-cyan-500/20 text-[6px] font-mono text-white flex justify-between items-center">
                          <span>THREAT: {Math.random() > 0.8 ? 'LOW' : 'NONE'}</span>
                          <div className={`w-1 h-1 rounded-full ${Math.random() > 0.5 ? 'bg-[#00ff41]' : 'bg-cyan-400'}`}></div>
                       </div>
                    </div>
                  ))}
               </div>
            )}

            {/* Tactical Crosshair Central HUD */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-[85%] h-[85%] border-[1px] border-cyan-400/5 rounded-full"></div>
               <div className="absolute w-[1px] h-full bg-cyan-500/10"></div>
               <div className="absolute w-full h-[1px] bg-cyan-500/10"></div>
               <div className="relative">
                 <Crosshair size={50} className="text-cyan-400/30" />
                 <div className="absolute -inset-4 border border-cyan-500/20 rounded-full animate-spin-slow"></div>
               </div>
            </div>

            {/* Location Data Panels (Fixed Positions) */}
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
               <div className="bg-black/90 border-l-4 border-cyan-400 p-5 backdrop-blur-xl shadow-2xl min-w-[220px]">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400">
                    <Building2 size={16} />
                    <span className="text-[11px] font-black uppercase tracking-widest">Active Scan</span>
                  </div>
                  <div className="text-2xl font-black text-white tracking-tighter truncate">{current.name}</div>
                  <div className="text-[9px] font-mono text-cyan-500/40 mt-1">STATUS: STRUCTURAL_FINGERPRINT_ACTIVE</div>
               </div>

               <div className="bg-black/90 border-r-4 border-white p-5 backdrop-blur-xl text-right shadow-2xl">
                  <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">GPS COORDS</div>
                  <div className="text-2xl font-mono text-cyan-400">{current.lat}N</div>
                  <div className="text-xl font-mono text-white/60 tracking-tighter">{current.lng}E</div>
               </div>
            </div>
          </div>

          {/* Footer Intercept Log */}
          <div className="h-28 bg-[#0d0208] border-t border-cyan-500/20 p-5 flex gap-10 overflow-hidden">
             <div className="flex flex-col gap-2 min-w-[250px]">
                <div className="flex items-center gap-2 text-cyan-400">
                   <Activity size={12} />
                   <span className="text-[9px] font-bold uppercase tracking-widest">Neural Link Log</span>
                </div>
                <div className="text-[10px] font-mono text-white/50 leading-relaxed uppercase overflow-hidden line-clamp-2">
                   Initializing voxel-level structural mapping... {current.name} footprint captured. Metadata sync with orbital core successful.
                </div>
             </div>
             <div className="h-full w-px bg-cyan-500/10 hidden md:block"></div>
             <div className="hidden md:flex flex-col gap-2 flex-1">
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Subnet Interference</span>
                <div className="flex gap-1 h-6">
                   {[...Array(24)].map((_, i) => (
                     <div key={i} className="flex-1 bg-cyan-500/10 rounded-sm overflow-hidden flex flex-col justify-end">
                        <div className="w-full bg-cyan-400 animate-pulse" style={{ height: `${Math.random() * 80 + 20}%`, animationDelay: `${i * 0.05}s` }}></div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Global Tactics Stats (Footer) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Thermal Sig', val: 'NOMINAL', icon: Eye, color: 'text-cyan-400' },
          { label: 'Uplink Delay', val: '14.2ms', icon: Wifi, color: 'text-[#00ff41]' },
          { label: 'Map Fidelity', val: 'ULTRA_HD', icon: Map, color: 'text-yellow-400' },
          { label: 'Trace Warning', val: 'CLEARED', icon: ShieldAlert, color: 'text-white' }
        ].map((item, i) => (
          <div key={i} className="bg-[#0d0208] border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:border-cyan-500/40 transition-all cursor-default">
            <item.icon size={20} className={item.color} />
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

export default EarthScanner;
