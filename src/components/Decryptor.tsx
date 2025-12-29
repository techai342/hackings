
import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Zap } from 'lucide-react';

interface DecryptorProps {
  isActive: boolean;
  onComplete: () => void;
}

const Decryptor: React.FC<DecryptorProps> = ({ isActive, onComplete }) => {
  const [codes, setCodes] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const target = "A9-FF-32-B1-0C";
  
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setCodes(prev => {
        const newCodes = [...prev];
        for (let i = 0; i < 5; i++) {
          if (progress < (i + 1) * 20) {
            newCodes[i] = Math.random().toString(16).substring(2, 4).toUpperCase();
          } else {
            newCodes[i] = target.split('-')[i];
          }
        }
        return newCodes;
      });
      
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return p + 2;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isActive, progress, onComplete]);

  if (!isActive) return null;

  return (
    <div className="bg-[#0d0208] border border-cyan-500/30 p-4 rounded-lg flex flex-col items-center gap-4 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
      <div className="flex items-center gap-2 text-cyan-400">
        <Zap size={16} className="animate-pulse" />
        <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Sequence Decryptor</h3>
      </div>
      
      <div className="flex gap-2">
        {codes.map((code, i) => (
          <div 
            key={i} 
            className={`w-10 h-10 border flex items-center justify-center font-mono text-sm rounded transition-all duration-300 ${
              progress >= (i + 1) * 20 
                ? 'border-[#00ff41] text-[#00ff41] bg-[#00ff41]/10' 
                : 'border-cyan-500/20 text-cyan-500/40'
            }`}
          >
            {code || '??'}
          </div>
        ))}
      </div>
      
      <div className="w-full bg-cyan-950/30 h-1 rounded-full overflow-hidden">
        <div 
          className="h-full bg-cyan-500 transition-all duration-100 shadow-[0_0_10px_#06b6d4]" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="text-[10px] font-mono text-cyan-500/60 uppercase">
        {progress < 100 ? `Cracking Header: ${progress}%` : "Access Granted"}
      </div>
    </div>
  );
};

export default Decryptor;
