
import React, { useState, useEffect } from 'react';
import { Activity, Zap, Server, Database, Cpu, Shield } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState(1);
  const [logs, setLogs] = useState<string[]>([]);
  
  const fullText = "WELCOME SAQIB TO KALI LINUX TOOLS";
  
  // User Requested Image
  const secondImage = "https://i.postimg.cc/sgzmCfZc/28ff97ebc7ae1c0fc38abd0eefe9451b.jpg";
  const firstImage = "https://images.hdqwalls.com/download/kali-linux-logo-4k-36-1280x720.jpg";

  useEffect(() => {
    // 1. Text Typewriter Effect
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, charIndex));
        charIndex++;
      }
    }, 50);

    // 2. Loading Progress Bar
    const progressInterval = setInterval(() => {
      setLoadingStep(prev => (prev < 100 ? prev + 1 : 100));
    }, 40);

    // 3. Dynamic Logs
    const logInterval = setInterval(() => {
      const messages = [
        "Mounting /dev/kali_core...",
        "Establishing neural gateway...",
        "Bypassing secure boot protocols...",
        "Loading Meta-Sploit framework...",
        "Injecting kernel hooks...",
        "Initializing SAQIB_ROOT privileges...",
        "System Ready: STABLE_RELEASE"
      ];
      setLogs(prev => [...prev, messages[Math.floor(Math.random() * messages.length)]].slice(-4));
    }, 600);

    // 4. Phase Transitions
    const phase2Timer = setTimeout(() => setPhase(2), 2500);
    const finishTimer = setTimeout(() => onComplete(), 6500);

    return () => {
      clearInterval(typeInterval);
      clearInterval(progressInterval);
      clearInterval(logInterval);
      clearTimeout(phase2Timer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center overflow-hidden font-mono select-none">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-5xl px-8 transition-all duration-1000">
        
        {/* Animated Display Area */}
        <div className="relative group w-full flex flex-col items-center">
           <div className={`absolute -inset-20 bg-white/5 rounded-full blur-[100px] transition-opacity duration-1000 ${phase === 2 ? 'opacity-20' : 'opacity-10'}`}></div>
           
           <div className="relative w-full max-w-3xl aspect-video overflow-hidden rounded-lg border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05)] bg-black">
              {/* First Image - Phase 1 */}
              <img 
                src={firstImage} 
                alt="Kali 1" 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${phase === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-110 blur-xl'}`}
              />
              
              {/* Second Image - Phase 2 (User Requested Link) */}
              <img 
                src={secondImage} 
                alt="Kali 2" 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${phase === 2 ? 'opacity-100 scale-100 grayscale-0' : 'opacity-0 scale-90 grayscale'}`}
              />

              {/* Glitch Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[length:100%_4px,3px_100%] opacity-40 pointer-events-none"></div>
              
              {/* Overlay HUD (Phase 2 Specific) */}
              {phase === 2 && (
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent animate-in fade-in duration-700">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">System Initialization Complete</span>
                   </div>
                   <div className="flex gap-4">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                           <div className="h-full bg-white animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                        </div>
                      ))}
                   </div>
                </div>
              )}
           </div>
           
           {/* Decorative Corner Brackets */}
           <div className="absolute -top-6 -left-6 w-16 h-16 border-t-2 border-l-2 border-white/20"></div>
           <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-2 border-r-2 border-white/20"></div>
        </div>

        {/* Text Area */}
        <div className="text-center space-y-6 w-full max-w-2xl">
           <div className={`text-2xl lg:text-5xl font-black text-white tracking-[0.2em] uppercase transition-all duration-700 ${phase === 2 ? 'glow-text' : ''}`}>
             {displayText}
             <span className="inline-block w-1 h-10 bg-white ml-3 animate-pulse align-middle"></span>
           </div>
           
           <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-6 text-[10px] text-white/40 tracking-[0.4em] font-bold uppercase">
                 <span className="animate-pulse">Loading Module X-7...</span>
                 <span className="text-white/20">|</span>
                 <span>Buffer: {loadingStep}%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
                 <div 
                   className="h-full bg-white shadow-[0_0_20px_white] transition-all duration-300 ease-out" 
                   style={{ width: `${loadingStep}%` }}
                 ></div>
              </div>
           </div>

           {/* Scrolling Status Logs (Hacking Style) */}
           <div className="h-16 bg-white/5 border border-white/10 rounded p-3 overflow-hidden text-[9px] font-mono text-left space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3 items-center opacity-60 animate-in slide-in-from-bottom-1 duration-300">
                   <span className="text-white font-bold">[READY]</span>
                   <span className="uppercase">{log}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Global Telemetry HUD */}
        <div className="grid grid-cols-4 gap-8 w-full text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] pt-8 border-t border-white/5">
           <div className="flex flex-col gap-1">
              <span className="text-white/60 flex items-center gap-2 font-black"><Zap size={10} /> Voltage</span>
              <span className="animate-pulse">24.2V // STABLE</span>
           </div>
           <div className="flex flex-col gap-1 items-center">
              <span className="text-white/60 flex items-center gap-2 font-black"><Server size={10} /> Data_Core</span>
              <span>UPLINK_OK</span>
           </div>
           <div className="flex flex-col gap-1 items-center">
              <span className="text-white/60 flex items-center gap-2 font-black"><Database size={10} /> Memory</span>
              <span>92.8GB_USED</span>
           </div>
           <div className="flex flex-col gap-1 items-end">
              <span className="text-white/60 flex items-center gap-2 font-black"><Cpu size={10} /> Thread_X</span>
              <span>PROC_ACTIVE</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
