
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Crosshair, Globe, Zap, Search, Target, ShieldAlert } from 'lucide-react';

interface LocationTrackerProps {
  isActive: boolean;
  onClose: () => void;
  externalTarget?: string;
}

const LocationTracker: React.FC<LocationTrackerProps> = ({ isActive, onClose, externalTarget }) => {
  const [coords, setCoords] = useState<{ lat: string, lng: string } | null>(null);
  const [targetCoords, setTargetCoords] = useState<{ lat: string, lng: string } | null>(null);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'retagging' | 'locked' | 'error'>('idle');
  const [targetSig, setTargetSig] = useState('');
  const [intel, setIntel] = useState<{ city: string, isp: string, node: string } | null>(null);
  const [progress, setProgress] = useState(0);

  const cities = ["Neo-Tokyo", "London Sub-Level", "Berlin Grid", "Shanghai Port", "Mars Colony A1", "Dubai Sky"];
  const isps = ["GLOBAL_NET", "ORBIT_LINK", "NEURAL_STRAND", "BLACK_VOID"];

  useEffect(() => {
    if (!isActive) {
      setStatus('idle');
      setProgress(0);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude.toFixed(4),
            lng: pos.coords.longitude.toFixed(4)
          });
        },
        () => setStatus('error')
      );
    }

    if (externalTarget) {
      handleRetag(externalTarget);
    }
  }, [isActive, externalTarget]);

  const handleRetag = (signature: string) => {
    setTargetSig(signature || "AUTO_PICKUP");
    setStatus('retagging');
    setProgress(0);
    setTargetCoords(null);
    setIntel(null);

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTargetCoords({
            lat: (Math.random() * 180 - 90).toFixed(4),
            lng: (Math.random() * 360 - 180).toFixed(4)
          });
          setIntel({
            city: cities[Math.floor(Math.random() * cities.length)],
            isp: isps[Math.floor(Math.random() * isps.length)],
            node: `NODE-${Math.floor(Math.random() * 9999)}`
          });
          setStatus('locked');
          return 100;
        }
        return p + 2;
      });
    }, 50);
  };

  if (!isActive) return null;

  return (
    <div className={`bg-[#0d0208] border-2 p-4 rounded-lg flex flex-col gap-4 shadow-2xl relative overflow-hidden transition-all duration-500 ${status === 'locked' ? 'border-red-500/50 shadow-red-500/10' : 'border-cyan-500/30'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-400">
          <Globe size={18} className={status === 'retagging' ? 'animate-spin' : 'animate-spin-slow'} />
          <h3 className="text-sm font-bold uppercase tracking-widest">TARS: Target Acquisition System</h3>
        </div>
        <button onClick={onClose} className="text-cyan-500/40 hover:text-red-400 text-xs font-mono uppercase">Terminate</button>
      </div>

      <div className="relative h-56 bg-black/80 border border-cyan-500/10 rounded flex items-center justify-center overflow-hidden">
        {/* Radar Sweep Layers */}
        <div className={`absolute inset-0 border border-cyan-500/5 rounded-full scale-150 opacity-20 ${status === 'retagging' ? 'animate-ping' : ''}`}></div>
        <div className="absolute w-full h-full border border-cyan-500/10 rounded-full"></div>
        <div className="absolute w-3/4 h-3/4 border border-cyan-500/10 rounded-full"></div>
        <div className="absolute w-1/2 h-1/2 border border-cyan-500/10 rounded-full"></div>
        
        {/* Radar Line */}
        <div className={`absolute w-[1.5px] h-1/2 bg-cyan-400/40 origin-bottom bottom-1/2 ${status === 'retagging' ? 'animate-[spin_1.5s_linear_infinite] shadow-[0_0_15px_cyan]' : 'animate-[spin_4s_linear_infinite]'}`}></div>

        {/* Home Node */}
        {coords && (
          <div className="absolute z-20 flex flex-col items-center">
            <MapPin size={24} className="text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)]" />
            <span className="text-[8px] font-mono text-[#00ff41] bg-black/90 px-1 border border-[#00ff41]/20 mt-1">HOST_NODE</span>
          </div>
        )}

        {/* Target Node */}
        {targetCoords && (
          <div className="absolute z-20 flex flex-col items-center animate-in fade-in zoom-in duration-500" style={{ 
            top: `${Math.random() * 50 + 10}%`, 
            left: `${Math.random() * 50 + 10}%` 
          }}>
            <Target size={32} className="text-red-500 animate-pulse drop-shadow-[0_0_10px_red]" />
            <span className="text-[8px] font-mono text-white bg-red-600 px-1 mt-1 uppercase tracking-tighter">SIG_MATCH_CONFIRMED</span>
          </div>
        )}

        {status === 'retagging' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/10 backdrop-blur-[1px]">
             <div className="text-[10px] font-mono text-red-500 animate-pulse mb-2">TRAPPING SIGNATURE: {targetSig}</div>
             <div className="w-32 h-1 bg-red-900/40 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: `${progress}%` }}></div>
             </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="IP/SIGNATURE_ID" 
            value={targetSig}
            onChange={(e) => setTargetSig(e.target.value)}
            className="flex-1 bg-black/50 border border-cyan-500/20 p-2 text-xs font-mono text-cyan-400 outline-none focus:border-cyan-400 transition-colors uppercase"
          />
          <button 
            onClick={() => handleRetag(targetSig)}
            className="bg-cyan-500/10 border border-cyan-500/40 px-3 hover:bg-cyan-500 hover:text-black transition-all"
          >
            <Search size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 border border-cyan-500/10 bg-cyan-500/5 rounded">
            <span className="text-[8px] uppercase text-cyan-400/60 block mb-1">Local Origin</span>
            <div className="text-[10px] font-mono text-white leading-tight">
              {coords ? `${coords.lat} N\n${coords.lng} E` : "LOCATING..."}
            </div>
          </div>
          <div className={`p-2 border transition-colors rounded ${status === 'locked' ? 'border-red-500/30 bg-red-500/5' : 'border-white/5 bg-white/5'}`}>
            <span className="text-[8px] uppercase text-red-400/60 block mb-1">Tagged Target</span>
            <div className="text-[10px] font-mono text-white leading-tight">
              {targetCoords ? `${targetCoords.lat} N\n${targetCoords.lng} E` : status === 'retagging' ? "INTERCEPTING..." : "--- ---"}
            </div>
          </div>
        </div>

        {intel && (
          <div className="p-3 border border-[#00ff41]/20 bg-[#00ff41]/5 rounded flex flex-col gap-1 animate-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 text-[#00ff41]">
              <ShieldAlert size={12} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Intel Package Extracted</span>
            </div>
            <div className="grid grid-cols-3 text-[9px] font-mono opacity-80 mt-1 uppercase">
              <div>CITY: {intel.city}</div>
              <div>ISP: {intel.isp}</div>
              <div>ID: {intel.node}</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-[8px] font-mono text-cyan-500/40">
        <span>STR_STRENGTH: {status === 'locked' ? '98%' : '24%'}</span>
        <span>TR-ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
      </div>
    </div>
  );
};

export default LocationTracker;
