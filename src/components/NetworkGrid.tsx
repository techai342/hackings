
import React, { useMemo } from 'react';
import { Network, Server, Cpu, Radio } from 'lucide-react';

const NetworkGrid: React.FC = () => {
  const nodes = useMemo(() => {
    return [...Array(24)].map((_, i) => ({
      id: i,
      name: `Node-${Math.floor(Math.random() * 999)}`,
      status: Math.random() > 0.8 ? 'offline' : (Math.random() > 0.4 ? 'online' : 'breached'),
      latency: Math.floor(Math.random() * 50) + 10,
    }));
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0d0208] border border-cyan-500/20 p-4 rounded-lg">
          <span className="text-[10px] text-cyan-400/60 uppercase block mb-1">Global Nodes</span>
          <div className="text-2xl font-black text-white">412</div>
        </div>
        <div className="bg-[#0d0208] border border-[#00ff41]/20 p-4 rounded-lg">
          <span className="text-[10px] text-[#00ff41]/60 uppercase block mb-1">Active Pings</span>
          <div className="text-2xl font-black text-white">1,024</div>
        </div>
        <div className="bg-[#0d0208] border border-yellow-500/20 p-4 rounded-lg">
          <span className="text-[10px] text-yellow-500/60 uppercase block mb-1">ICE Integrity</span>
          <div className="text-2xl font-black text-white">94%</div>
        </div>
        <div className="bg-[#0d0208] border border-red-500/20 p-4 rounded-lg">
          <span className="text-[10px] text-red-500/60 uppercase block mb-1">Trace Alerts</span>
          <div className="text-2xl font-black text-white">0</div>
        </div>
      </div>

      <div className="bg-[#0d0208] border border-[#00ff41]/10 rounded-lg p-6 flex-1 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <Radio className="text-[#00ff41] animate-pulse" />
          <h2 className="text-sm font-bold uppercase tracking-widest">Neural Network Topology</h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10">
          {nodes.map(node => (
            <div key={node.id} className="flex flex-col items-center gap-2 group">
              <div className={`
                p-4 rounded-full border-2 transition-all duration-300 relative
                ${node.status === 'online' ? 'border-[#00ff41]/20 bg-[#00ff41]/5 text-[#00ff41]' : ''}
                ${node.status === 'breached' ? 'border-yellow-500/20 bg-yellow-500/5 text-yellow-500' : ''}
                ${node.status === 'offline' ? 'border-red-500/20 bg-red-500/5 text-red-500 opacity-40' : ''}
                group-hover:scale-110 group-hover:shadow-[0_0_15px_currentColor]
              `}>
                <Server size={24} />
                {node.status === 'online' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00ff41] rounded-full border-2 border-black animate-pulse"></div>
                )}
              </div>
              <span className="text-[9px] font-mono uppercase tracking-tighter opacity-60">{node.name}</span>
              <span className="text-[8px] font-mono opacity-30">{node.latency}ms</span>
            </div>
          ))}
        </div>

        {/* Decorative Grid SVG Background */}
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ff41" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default NetworkGrid;
