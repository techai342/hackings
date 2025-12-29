
import React, { useState, useEffect, useCallback } from 'react';
import { Terminal as TerminalIcon, ShieldAlert, Folder, Monitor, Cpu, Database, Wifi, Search, Bitcoin, Skull, Radio, Power } from 'lucide-react';

const HackerOS: React.FC = () => {
  const [terminalText, setTerminalText] = useState<string[]>(["Online hacker simulator...", "Start typing to simulate hacking..."]);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const hackingSnippets = [
    "INTERFACING WITH MAIN_SERVER_01...",
    "BYPASSING KERNEL RESTRICTIONS...",
    "ENCRYPTING PAYLOAD WITH RSA-4096...",
    "SQL_INJECTION: success",
    "DECRYPTING PASSWORD_HASH: $2y$10$92IXUN...",
    "ROOT_ACCESS: GRANTED",
    "UPLOADING TROJAN.EXE...",
    "CLEANING SYSTEM LOGS...",
    "DISCONNECTING_RELAY_NODE_77..."
  ];

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    setActiveKeys(prev => {
      const next = new Set(prev);
      next.add(e.key.toLowerCase());
      return next;
    });

    setTerminalText(prev => {
      const randomLine = hackingSnippets[Math.floor(Math.random() * hackingSnippets.length)];
      return [randomLine, ...prev].slice(0, 15);
    });

    setTimeout(() => {
      setActiveKeys(prev => {
        const next = new Set(prev);
        next.delete(e.key.toLowerCase());
        return next;
      });
    }, 150);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    const clock = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(clock);
    };
  }, [handleKeyPress]);

  const apps = [
    { name: "Bitcoin Miner", icon: <Bitcoin />, color: "text-orange-500", action: "BTC_LINK_ESTABLISHED" },
    { name: "Surveillance", icon: <Monitor />, color: "text-cyan-500", action: "CAM_FEED_ACTIVE" },
    { name: "Nuke Plant", icon: <Radio />, color: "text-red-500", action: "CRITICAL_OVERHEAT" },
    { name: "Interpol DB", icon: <Database />, color: "text-blue-500", action: "QUERYING_WANTED_LIST" },
    { name: "Password Cracker", icon: <Cpu />, color: "text-[#00ff41]", action: "BRUTE_FORCE_INIT" },
    { name: "Secret Deals", icon: <Skull />, color: "text-purple-500", action: "DARKNET_HANDSHAKE" },
  ];

  const triggerApp = (app: string) => {
    setActiveApp(app);
    setTerminalText(prev => [`[SYSTEM]: INITIALIZING ${app.toUpperCase()}...`, ...prev]);
    setTimeout(() => setActiveApp(null), 3000);
  };

  return (
    <div className="flex-1 bg-[#001100] relative overflow-hidden flex flex-col font-mono text-[#00ff41] select-none">
      {/* 1. Background Layer: Tinted World Map */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain filter brightness-100 invert-[0.2] sepia-[1] hue-rotate-[90deg] saturate-[3]"></div>
      
      {/* 2. Central Agency Seal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <div className="w-[500px] h-[500px] border-4 border-[#00ff41] rounded-full flex flex-col items-center justify-center animate-pulse">
           <ShieldAlert size={180} />
           <span className="text-2xl font-black mt-4 tracking-[0.5em] text-center">NATIONAL SECURITY AGENCY<br/><span className="text-lg">UNITED STATES OF AMERICA</span></span>
        </div>
      </div>

      {/* 3. Main Workspace */}
      <div className="flex-1 p-6 grid grid-cols-12 gap-8 z-10 relative">
        
        {/* Terminal Window (Left) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
           <div className="bg-black/90 border-2 border-[#00ff41] rounded shadow-[0_0_30px_rgba(0,255,65,0.2)] flex flex-col h-[500px]">
              <div className="bg-[#00ff41] text-black px-4 py-1 flex items-center justify-between font-black">
                 <span className="text-sm">GeekPrank Hacker Screen</span>
                 <div className="flex gap-2">
                    <div className="w-3 h-3 border border-black"></div>
                    <div className="w-3 h-3 border border-black bg-black"></div>
                 </div>
              </div>
              <div className="flex-1 p-4 overflow-hidden flex flex-col">
                 <div className="text-sm font-bold mb-4 border-b border-[#00ff41]/20 pb-2">
                    Online hacker simulator<br/>
                    <span className="text-[10px] opacity-60 italic">Start typing random text to simulate that you're hacking a computer system.</span>
                 </div>
                 <div className="flex-1 overflow-y-auto space-y-1 text-[12px]">
                    {terminalText.map((line, i) => (
                      <div key={i} className={i === 0 ? "animate-in slide-in-from-left-2 duration-75 text-white" : "opacity-60"}>
                        {line}
                      </div>
                    ))}
                 </div>
                 
                 {/* Visual Keyboard */}
                 <div className="mt-4 pt-4 border-t border-[#00ff41]/20">
                    <div className="grid grid-cols-10 gap-1">
                       {['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',';'].map(k => (
                         <div key={k} className={`aspect-square border border-[#00ff41]/30 flex items-center justify-center text-[10px] transition-colors ${activeKeys.has(k) ? 'bg-[#00ff41] text-black shadow-[0_0_10px_#00ff41]' : 'bg-black/40'}`}>
                           {k.toUpperCase()}
                         </div>
                       ))}
                    </div>
                    <div className="mt-2 w-full h-4 border border-[#00ff41]/30 bg-black/40 flex items-center justify-center text-[8px] uppercase tracking-widest">
                       {activeKeys.has(' ') ? <div className="w-full h-full bg-[#00ff41]"></div> : "SPACEBAR"}
                    </div>
                 </div>
              </div>
              <div className="p-2 border-t border-[#00ff41]/20 flex justify-between">
                 <button className="px-4 py-1 bg-red-600 text-white text-[10px] font-bold">Automate</button>
                 <span className="text-[10px] opacity-40">How to use?</span>
              </div>
           </div>
        </div>

        {/* Desktop Icons (Right) */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
           {apps.map((app, i) => (
             <button 
               key={i}
               onClick={() => triggerApp(app.name)}
               className="flex flex-col items-center group gap-2"
             >
                <div className={`p-6 border-2 border-transparent group-hover:border-[#00ff41]/40 rounded-lg transition-all ${activeApp === app.name ? 'scale-110 bg-[#00ff41]/10' : ''}`}>
                   <div className={`${app.color} w-16 h-16 flex items-center justify-center`}>
                      {/* Fix: Added explicit props typing to cloneElement to resolve 'size' property error */}
                      {React.cloneElement(app.icon as React.ReactElement<{ size?: number }>, { size: 48 })}
                   </div>
                </div>
                <span className="text-xs font-bold text-white tracking-widest uppercase group-hover:text-[#00ff41]">{app.name}</span>
             </button>
           ))}
        </div>
      </div>

      {/* 4. Active App Popup */}
      {activeApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
           <div className="bg-[#001100] border-2 border-red-500 p-8 rounded-lg shadow-[0_0_50px_rgba(239,68,68,0.3)] animate-in zoom-in duration-300">
              <div className="flex items-center gap-4 text-red-500 mb-6">
                 <ShieldAlert size={48} className="animate-pulse" />
                 <div className="flex flex-col">
                    <span className="text-2xl font-black uppercase tracking-widest">Access Warning</span>
                    <span className="text-xs opacity-60">KERNEL_OVERRIDE_DETECTED</span>
                 </div>
              </div>
              <div className="text-sm font-bold text-white mb-6 uppercase tracking-widest">
                 System is executing protocol: <span className="text-red-500">{activeApp.toUpperCase()}</span>
              </div>
              <div className="w-full h-2 bg-red-950 rounded-full overflow-hidden">
                 <div className="h-full bg-red-500 animate-[scanline-fast_1.5s_linear_infinite]"></div>
              </div>
           </div>
        </div>
      )}

      {/* 5. Bottom Taskbar */}
      <div className="h-10 bg-[#00ff41] text-black flex items-center px-2 z-20 shrink-0 border-t border-black/20">
         <button className="flex items-center gap-2 px-4 py-1 bg-black text-[#00ff41] font-black italic hover:bg-white hover:text-black transition-colors">
            <Monitor size={16} />
            Start
         </button>
         <div className="flex-1 flex px-4 gap-4 overflow-hidden">
            <div className="px-4 py-0.5 border border-black/40 text-[10px] font-bold uppercase truncate">GeekPrank Hacker Screen</div>
         </div>
         <div className="px-4 border-l border-black/40 flex items-center gap-4">
            <Wifi size={16} />
            <span className="text-sm font-black">{time}</span>
         </div>
      </div>
    </div>
  );
};

export default HackerOS;
