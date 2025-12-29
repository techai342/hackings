
import React from 'react';

interface OracleAvatarProps {
  traceLevel: number;
  isTalking: boolean;
}

const OracleAvatar: React.FC<OracleAvatarProps> = ({ traceLevel, isTalking }) => {
  const glitchAmount = traceLevel > 70 ? (traceLevel - 70) / 5 : 0;
  
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#0d0208] border border-[#00ff41]/20 rounded-lg relative overflow-hidden">
      <div 
        className="font-mono text-[10px] leading-tight text-[#00ff41] transition-all duration-100"
        style={{
          transform: `translate(${(Math.random() - 0.5) * glitchAmount}px, ${(Math.random() - 0.5) * glitchAmount}px)`,
          textShadow: traceLevel > 50 ? `2px 0 red, -2px 0 blue` : 'none'
        }}
      >
        <pre className={isTalking ? 'animate-pulse' : ''}>
{`      :::::::::
    :+:    :+:
   +:+    +:+
  +#+    +:+
 +#+    +#+
#+#    #+#
######### `}
        </pre>
      </div>
      <div className="mt-2 flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`w-1 h-3 rounded-full transition-all duration-300 ${
              isTalking ? 'bg-[#00ff41] animate-bounce' : 'bg-[#00ff41]/20'
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      <span className="text-[10px] mt-2 tracking-[0.3em] font-bold text-[#00ff41]/40 uppercase">The Oracle</span>
      
      {/* Background scanline for the avatar box */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#00ff41]/5 to-transparent h-1/2 w-full animate-scanline-fast opacity-20"></div>
    </div>
  );
};

export default OracleAvatar;
