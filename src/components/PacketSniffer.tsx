
import React, { useState, useEffect, useRef } from 'react';
import { Activity, ShieldCheck, Wifi, Globe, Terminal, Cpu, Database, Server, Zap } from 'lucide-react';

const PacketSniffer: React.FC = () => {
  const [packets, setPackets] = useState<any[]>([]);
  const [totalIntercepted, setTotalIntercepted] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const generateHex = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newPacket = {
        id: Date.now(),
        protocol: ['TCP', 'UDP', 'ICMP', 'HTTP', 'SSH'][Math.floor(Math.random() * 5)],
        source: `192.168.1.${Math.floor(Math.random() * 255)}`,
        dest: `10.0.0.${Math.floor(Math.random() * 255)}`,
        size: `${Math.floor(Math.random() * 1024)}B`,
        hex: generateHex(32),
        status: Math.random() > 0.9 ? 'FLAGGED' : 'CLEARED'
      };
      setPackets(prev => [newPacket, ...prev].slice(0, 50));
      setTotalIntercepted(prev => prev + 1);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-right-8 duration-700 h-full overflow-hidden">
      {/* HUD Header */}
      <div className="bg-[#0d0208] border border-cyan-500/20 p-5 rounded-lg flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            <Wifi size={24} className="text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.5em] glow-text text-cyan-400">Deep Packet Sniffer v4.2</h2>
            <div className="text-[9px] font-mono text-cyan-500/40 uppercase tracking-widest mt-1">Interface: eth0 // Status: PROMISCUOUS_MODE</div>
          </div>
        </div>
        <div className="flex gap-8 text-[10px] font-mono uppercase">
           <div className="text-right">
              <div className="text-white/30">Total Intercepted</div>
              <div className="text-white font-black">{totalIntercepted.toLocaleString()}</div>
           </div>
           <div className="text-right">
              <div className="text-white/30">Buffer State</div>
              <div className="text-[#00ff41] font-black">94.2% NOMINAL</div>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Real-time Scrolling Log */}
        <div className="flex-[3] bg-black border border-white/5 rounded-lg overflow-hidden flex flex-col">
          <div className="bg-white/5 p-3 flex border-b border-white/10 text-[9px] font-mono text-white/40 uppercase font-black">
             <div className="w-[15%]">Protocol</div>
             <div className="w-[20%]">Source IP</div>
             <div className="w-[20%]">Destination</div>
             <div className="w-[10%]">Size</div>
             <div className="flex-1">Hex Payload Intercept</div>
          </div>
          <div className="flex-1 overflow-y-auto font-mono text-[10px] p-2 space-y-1 scrollbar-thin">
             {packets.map(p => (
               <div key={p.id} className={`flex items-center py-1 border-b border-white/5 hover:bg-white/5 transition-colors ${p.status === 'FLAGGED' ? 'text-red-500 bg-red-500/5' : 'text-[#00ff41]/80'}`}>
                  <div className="w-[15%] font-black">{p.protocol}</div>
                  <div className="w-[20%]">{p.source}</div>
                  <div className="w-[20%]">{p.dest}</div>
                  <div className="w-[10%] opacity-40">{p.size}</div>
                  <div className="flex-1 truncate opacity-30 tracking-tighter">{p.hex}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Sidebar Intercept Details */}
        <div className="flex-1 flex flex-col gap-4 w-full lg:w-[400px]">
           <div className="bg-[#050505] border border-cyan-500/20 p-5 rounded-lg flex-1 flex flex-col overflow-hidden shadow-xl">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-cyan-400 mb-6 flex items-center gap-2">
                <Database size={16} /> Intercepted Metadata
              </h3>
              <div className="space-y-4 flex-1 overflow-y-auto scrollbar-thin pr-2">
                 {[...Array(6)].map((_, i) => (
                   <div key={i} className="p-3 border border-white/5 bg-white/5 rounded space-y-2 group hover:border-cyan-500/30 transition-all">
                      <div className="flex justify-between text-[9px] font-mono">
                         <span className="text-cyan-400">SOCKET_OPEN</span>
                         <span className="text-white/20">#{100 + i}</span>
                      </div>
                      <div className="text-[10px] text-white/60 font-mono break-all leading-tight">
                        AUTH_REQ: user=root&sess={generateHex(16)}&priv=0
                      </div>
                      <div className="h-0.5 w-full bg-cyan-950/30">
                         <div className="h-full bg-cyan-400 animate-pulse" style={{ width: `${Math.random() * 100}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-[10px] font-bold text-white/30 uppercase">Neural Load</span>
                   <span className="text-[10px] font-mono text-cyan-400">88%</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-400" style={{ width: '88%' }}></div>
                 </div>
              </div>
           </div>

           <div className="bg-[#0d0208] border border-red-500/20 p-5 rounded-lg flex items-center gap-4">
              <Zap size={24} className="text-red-500 animate-bounce" />
              <div>
                <div className="text-[9px] font-black uppercase text-red-500 tracking-[0.2em]">Intercept Warning</div>
                <div className="text-[10px] font-mono text-white/50">SSL_HANDSHAKE_BYPASS: ATTEMPT_FAILURE</div>
              </div>
           </div>
        </div>
      </div>

      {/* Global Tactics Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Throughput', val: '4.2 Gbps', icon: Activity, color: 'text-cyan-400' },
          { label: 'Socket Pool', val: '1,024 ACTIVE', icon: Server, color: 'text-[#00ff41]' },
          { label: 'Entropy Rate', val: '0.992', icon: Cpu, color: 'text-yellow-400' },
          { label: 'Latency', val: '8ms', icon: Globe, color: 'text-white' }
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

export default PacketSniffer;
