
import React, { useEffect, useState } from 'react';
import { Loader2, ShieldAlert, Crosshair, Wifi } from 'lucide-react';

interface ScannerOverlayProps {
  onClose: () => void;
  type: 'scan' | 'breach';
}

const ScannerOverlay: React.FC<ScannerOverlayProps> = ({ onClose, type }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onClose, 1000);
          return 100;
        }
        return prev + (Math.random() * 15);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="relative mb-8">
        {type === 'scan' ? (
          <Crosshair className="w-24 h-24 text-[#00ff41] animate-spin-slow" />
        ) : (
          <ShieldAlert className="w-24 h-24 text-red-500 animate-pulse" />
        )}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#00ff41] rounded-full scale-125 opacity-20 animate-ping"></div>
      </div>

      <h2 className="text-2xl font-bold tracking-[0.5em] uppercase mb-4 glow-text text-[#00ff41]">
        {type === 'scan' ? 'Analyzing Nodes...' : 'System Breach in Progress...'}
      </h2>

      <div className="w-64 bg-[#003b00]/30 h-1 border border-[#00ff41]/20 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${type === 'scan' ? 'bg-[#00ff41]' : 'bg-red-500 shadow-[0_0_15px_red]'}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-2 text-xs font-mono text-[#00ff41]/60">
        <div>TARGET: 192.168.0.1</div>
        <div>LATENCY: 14ms</div>
        <div>PROTO: SSH-2.0</div>
        <div>STATUS: {Math.floor(progress)}%</div>
      </div>

      <div className="absolute top-8 right-8">
        <button onClick={onClose} className="text-[#00ff41]/30 hover:text-[#00ff41] transition-colors">
          TERMINATE
        </button>
      </div>
    </div>
  );
};

export default ScannerOverlay;
