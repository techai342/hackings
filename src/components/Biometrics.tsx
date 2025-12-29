
import React, { useState, useEffect } from 'react';
import { Fingerprint, ShieldCheck, Activity, Dna, Lock } from 'lucide-react';

const Biometrics: React.FC = () => {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'verifying' | 'matched'>('idle');
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setScanStatus('scanning');
    setProgress(0);
  };

  useEffect(() => {
    if (scanStatus === 'scanning') {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setScanStatus('verifying');
            return 100;
          }
          return p + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }

    if (scanStatus === 'verifying') {
      const timer = setTimeout(() => {
        setScanStatus('matched');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [scanStatus]);

  return (
    <div className="flex-1 flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
      <div className="bg-[#0d0208] border border-[#00ff41]/20 p-6 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-4 flex items-center gap-2 text-[#00ff41]/40 text-[10px] uppercase font-mono tracking-widest">
          <Activity size={12} />
          <span>Neural Pulse Detected</span>
        </div>

        <div className="relative mt-8 mb-8">
          {/* Scanning Box */}
          <div className={`w-48 h-64 border-2 rounded-xl flex items-center justify-center transition-all duration-500 ${
            scanStatus === 'matched' ? 'border-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_30px_rgba(0,255,65,0.2)]' : 'border-[#00ff41]/30 bg-black/40'
          }`}>
            <Fingerprint size={120} className={`transition-all duration-500 ${
              scanStatus === 'scanning' ? 'text-[#00ff41] animate-pulse scale-110' : 
              scanStatus === 'matched' ? 'text-[#00ff41] scale-100' : 'text-[#00ff41]/20'
            }`} />
            
            {/* Laser Line */}
            {scanStatus === 'scanning' && (
              <div className="absolute w-full h-1 bg-[#00ff41] shadow-[0_0_15px_#00ff41] animate-[scanline-fast_2s_linear_infinite]" style={{ top: '0%' }}></div>
            )}
          </div>

          {/* Decorative Corner Brackets */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#00ff41]"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#00ff41]"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#00ff41]"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#00ff41]"></div>
        </div>

        <div className="w-full max-w-sm space-y-4 text-center">
          {scanStatus === 'idle' && (
            <button 
              onClick={startScan}
              className="px-8 py-3 bg-[#00ff41]/10 border border-[#00ff41]/40 text-[#00ff41] font-bold uppercase tracking-[0.3em] hover:bg-[#00ff41]/20 transition-all rounded shadow-[0_0_15px_rgba(0,255,65,0.1)]"
            >
              Initiate Neural Scan
            </button>
          )}

          {scanStatus === 'scanning' && (
            <div className="space-y-2">
              <div className="text-[#00ff41] font-mono text-sm animate-pulse tracking-widest">RECORDING RIDGES... {progress}%</div>
              <div className="w-full h-1 bg-[#003b00] rounded-full overflow-hidden">
                <div className="h-full bg-[#00ff41]" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {scanStatus === 'verifying' && (
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <Dna className="text-cyan-400 animate-spin" />
              <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Cross-Referencing DNA Database...</div>
            </div>
          )}

          {scanStatus === 'matched' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center justify-center gap-2 text-[#00ff41]">
                <ShieldCheck />
                <span className="font-black text-lg tracking-[0.4em] glow-text uppercase">IDENTITY VERIFIED</span>
              </div>
              <div className="text-[10px] font-mono text-[#00ff41]/60 uppercase">
                SUBJECT: SAQIB // CLEARANCE: LEVEL_OMEGA // NODE: HQ-PROXIMA
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#0d0208] border border-red-500/20 p-4 rounded-lg flex items-center gap-4">
          <Lock className="text-red-500/40" size={24} />
          <div>
            <div className="text-[10px] text-red-500/40 uppercase font-bold">Failed Attempts</div>
            <div className="text-lg font-black text-white">0</div>
          </div>
        </div>
        <div className="bg-[#0d0208] border border-cyan-500/20 p-4 rounded-lg flex items-center gap-4">
          <Activity className="text-cyan-400/40" size={24} />
          <div>
            <div className="text-[10px] text-cyan-400/40 uppercase font-bold">Heart Rate Sync</div>
            <div className="text-lg font-black text-white">72 BPM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biometrics;
