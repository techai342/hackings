
import React, { useState, useEffect, useRef } from 'react';
import { Activity, Database, Download, ShieldCheck, Zap, Server, Cpu, AlertTriangle } from 'lucide-react';

const DataTransfer: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [bitrate, setBitrate] = useState('0');
  const [packets, setPackets] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Binary stream animation logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const columns = Math.floor(width / 15);
    const streams: number[] = new Array(columns).fill(0).map(() => Math.random() * -height);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = '12px "Fira Code"';
      
      for (let i = 0; i < streams.length; i++) {
        const char = Math.random() > 0.5 ? '1' : '0';
        const x = i * 15;
        const y = streams[i];

        // Gradient color based on position
        const alpha = Math.min(1, y / height);
        ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
        
        // Occasional "hot" bit
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#fff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00ff41';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        streams[i] += 15 + Math.random() * 20;

        if (streams[i] > height) {
          streams[i] = Math.random() * -100;
        }
      }
    };

    const interval = setInterval(draw, 30);
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Stats simulation
  useEffect(() => {
    const statInterval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.1));
      setBitrate((Math.random() * 50 + 200).toFixed(2));
      setPackets(prev => prev + Math.floor(Math.random() * 100));
    }, 100);
    return () => clearInterval(statInterval);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-4 animate-in fade-in zoom-in duration-500 h-full overflow-hidden">
      {/* Header HUD */}
      <div className="bg-[#0d0208] border border-[#00ff41]/30 p-4 rounded-lg flex items-center justify-between shadow-[0_0_20px_rgba(0,255,65,0.1)]">
        <div className="flex items-center gap-3">
          <Database size={20} className="text-[#00ff41] animate-pulse" />
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] glow-text text-[#00ff41]">Bitstream Exfiltration</h2>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-mono text-[#00ff41]/60 uppercase">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-[#00ff41]" />
            <span>Link: PROXY_OVAL</span>
          </div>
          <span className="text-yellow-400">PACKETS: {packets.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Main Binary Stream Canvas */}
        <div className="flex-[2] bg-black border border-[#00ff41]/20 rounded-lg relative overflow-hidden group">
          <canvas ref={canvasRef} className="w-full h-full opacity-80" />
          
          {/* Overlay HUD */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             <div className="bg-black/60 border border-[#00ff41]/40 p-10 backdrop-blur-md rounded-lg flex flex-col items-center">
                <Download size={48} className="text-[#00ff41] animate-bounce mb-4" />
                <div className="text-4xl font-black text-white tracking-[0.5em] mb-2 glow-text">TRANSFERRING</div>
                <div className="w-64 h-2 bg-[#003b00]/40 rounded-full overflow-hidden border border-[#00ff41]/20">
                   <div className="h-full bg-[#00ff41] shadow-[0_0_20px_#00ff41]" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="mt-4 font-mono text-xs text-[#00ff41] uppercase tracking-[0.2em]">
                  {progress.toFixed(1)}% COMPLETE // {bitrate} MB/S
                </div>
             </div>
          </div>

          {/* Corner Elements */}
          <div className="absolute top-4 left-4 font-mono text-[8px] text-[#00ff41]/40 uppercase space-y-1">
             <div>Source: 172.0.0.1 (CORE)</div>
             <div>Dest: GHOST_RELAY_9</div>
             <div>Encryption: X-CHACHA20</div>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[8px] font-mono text-red-500/60 uppercase">
             <AlertTriangle size={10} />
             <span>Trace Risk: Minimal</span>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="flex-1 flex flex-col gap-4 min-w-[280px]">
          <div className="bg-[#0d0208] border border-[#00ff41]/20 p-4 rounded-lg flex-1 overflow-hidden flex flex-col">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#00ff41] mb-4 flex items-center gap-2">
              <Server size={14} /> Buffer Nodes
            </h3>
            <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="p-2 border border-[#00ff41]/10 bg-black/40 rounded flex justify-between items-center animate-in slide-in-from-right-2" style={{ animationDelay: `${i * 0.1}s` }}>
                   <span className="text-[9px] font-mono text-[#00ff41]/60">NODE-{1000 + i}</span>
                   <div className="flex gap-1">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className={`w-1.5 h-1.5 rounded-sm ${Math.random() > 0.3 ? 'bg-[#00ff41]' : 'bg-red-500'} animate-pulse`} style={{ animationDelay: `${Math.random()}s` }}></div>
                      ))}
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-[#0d0208] border border-cyan-500/20 p-4 rounded-lg">
             <div className="flex items-center gap-2 mb-2">
                <Cpu size={14} className="text-cyan-400" />
                <span className="text-[10px] uppercase font-bold text-white">Neural Load</span>
             </div>
             <div className="flex justify-between text-[9px] font-mono text-cyan-400 mb-1">
                <span>VOLATILITY</span>
                <span>{ (Math.random() * 10 + 85).toFixed(1) }%</span>
             </div>
             <div className="w-full h-1 bg-cyan-950/40 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: '88%' }}></div>
             </div>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Bitrate', val: `${bitrate} MB/s`, icon: Zap, color: 'text-yellow-400' },
          { label: 'Integrity', val: '99.99%', icon: ShieldCheck, color: 'text-[#00ff41]' },
          { label: 'Uptime', val: '00:12:44', icon: Activity, color: 'text-cyan-400' },
          { label: 'Link Type', val: 'DIRECT_CORE', icon: Database, color: 'text-white' }
        ].map((item, i) => (
          <div key={i} className="bg-[#0d0208] border border-[#00ff41]/10 p-3 rounded flex items-center gap-3">
            <item.icon size={16} className={item.color} />
            <div className="flex flex-col">
              <span className="text-[8px] text-[#00ff41]/40 uppercase font-bold">{item.label}</span>
              <span className={`text-[10px] font-mono uppercase ${item.color}`}>{item.val}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTransfer;
