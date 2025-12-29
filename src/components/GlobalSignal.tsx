
import React from 'react';
import { Satellite, Radio, Globe, Zap } from 'lucide-react';

const GlobalSignal: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="bg-[#0d0208] border border-cyan-500/20 p-6 rounded-lg flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Orbital Info HUD */}
        <div className="absolute top-6 left-6 space-y-2 text-[10px] font-mono text-cyan-400/60 uppercase">
          <div className="flex items-center gap-2"><Satellite size={12} /> Link: SAT-772_ORBITAL</div>
          <div className="flex items-center gap-2"><Radio size={12} /> Frequency: 14.2 GHz</div>
          <div className="flex items-center gap-2"><Zap size={12} /> Power: 98% (Stable)</div>
        </div>

        {/* The Rotating Globe Container */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          {/* Rotating Background Arcs */}
          <div className="absolute inset-0 border-2 border-dashed border-cyan-500/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-4 border border-dashed border-cyan-500/5 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
          
          {/* The Earth SVG */}
          <svg viewBox="0 0 100 100" className="w-64 h-64 text-cyan-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-[spin_60s_linear_infinite]">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <path d="M50 2 A48 48 0 0 1 50 98 A48 48 0 0 1 50 2" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />
            {/* Mock Continents */}
            <path d="M30 40 q5-5 10 0 t10 10 t-5 15 t-15-5 t0-20" fill="currentColor" opacity="0.4" />
            <path d="M60 20 q10 5 5 15 t-10 5 t-5 20 t15 10" fill="currentColor" opacity="0.4" />
            <path d="M20 70 q10 10 20 0 t10-10 t-10-10" fill="currentColor" opacity="0.4" />
          </svg>

          {/* Signal Transfer Arcs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Pulsing signal lines shooting outwards */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <line 
                key={deg}
                x1="50%" y1="50%" x2={`${50 + 60 * Math.cos(deg * Math.PI / 180)}%`} y2={`${50 + 60 * Math.sin(deg * Math.PI / 180)}%`}
                stroke="url(#signalGradient)"
                strokeWidth="1"
                className="animate-pulse opacity-40"
              />
            ))}
          </svg>

          {/* Central Core */}
          <div className="absolute w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee] animate-ping"></div>
        </div>

        <div className="mt-8 text-center space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-[0.6em] glow-text text-cyan-400">Orbital Uplink Active</h2>
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col">
              <span className="text-[8px] text-cyan-400/40 uppercase">Transfer Rate</span>
              <span className="text-xs font-mono text-cyan-400">1.4 GB/s</span>
            </div>
            <div className="h-4 w-px bg-cyan-400/20"></div>
            <div className="flex flex-col">
              <span className="text-[8px] text-cyan-400/40 uppercase">Enc. Strength</span>
              <span className="text-xs font-mono text-cyan-400">RSA-4096</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0d0208] border border-[#00ff41]/20 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
           <span className="text-[10px] uppercase font-bold text-[#00ff41]">Uplink Queue</span>
           <span className="text-[10px] font-mono text-[#00ff41]/40">4 ACTIVE CHANNELS</span>
        </div>
        <div className="space-y-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between text-[9px] font-mono">
              <span className="text-white/60">FILE_SEGMENT_00{i}.ARC</span>
              <span className="text-[#00ff41] animate-pulse">STREAMING...</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalSignal;
