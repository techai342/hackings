
import React, { useMemo } from 'react';
import { ShieldAlert, MapPin } from 'lucide-react';

interface TracerMapProps {
  traceLevel: number;
}

const TracerMap: React.FC<TracerMapProps> = ({ traceLevel }) => {
  // Generate random static nodes
  const nodes = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      active: false
    }));
  }, []);

  const activeCount = Math.floor((traceLevel / 100) * nodes.length);

  return (
    <div className="bg-[#0d0208] border border-[#00ff41]/30 p-4 rounded-lg flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert size={18} className={traceLevel > 70 ? "text-red-500 animate-pulse" : "text-yellow-500"} />
          <h3 className="text-sm font-bold tracking-widest text-white uppercase">Neural Trace Map</h3>
        </div>
        <span className={`font-mono text-xs ${traceLevel > 70 ? 'text-red-500' : 'text-[#00ff41]'}`}>
          SIGNAL: {traceLevel > 80 ? 'CRITICAL' : traceLevel > 40 ? 'INTERCEPTED' : 'SECURE'}
        </span>
      </div>

      <div className="relative flex-1 border border-[#00ff41]/10 bg-black/40 rounded overflow-hidden">
        {/* Simple grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border border-[#00ff41]/20"></div>
          ))}
        </div>

        {/* Local Node (Home) */}
        <div className="absolute bottom-4 right-4 z-10">
          <MapPin size={20} className="text-cyan-400 animate-bounce" />
          <div className="absolute -inset-2 bg-cyan-400/20 rounded-full animate-ping"></div>
        </div>

        {/* Tracer Nodes */}
        {nodes.map((node, i) => {
          const isActive = i < activeCount;
          return (
            <div 
              key={node.id}
              className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-1000 ${
                isActive ? 'bg-red-500 shadow-[0_0_8px_red] scale-125' : 'bg-[#00ff41]/20'
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {isActive && (
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-50"></div>
              )}
            </div>
          );
        })}

        {/* Trace Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node, i) => {
            if (i >= activeCount || i === 0) return null;
            const prevNode = nodes[i-1];
            return (
              <line 
                key={`line-${i}`}
                x1={`${prevNode.x}%`} y1={`${prevNode.y}%`}
                x2={`${node.x}%`} y2={`${node.y}%`}
                stroke="red"
                strokeWidth="1"
                strokeDasharray="4 2"
                className="animate-[dash_2s_linear_infinite]"
              />
            );
          })}
        </svg>
      </div>
      
      <div className="mt-4 space-y-1">
        <div className="flex justify-between text-[10px] text-[#00ff41]/40">
          <span>SOURCE: UNKNOWN_PROXY_V2</span>
          <span>DIST: {Math.max(0, 100 - traceLevel)}km</span>
        </div>
        <div className="w-full h-1 bg-red-900/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-600 shadow-[0_0_10px_red] transition-all duration-500" 
            style={{ width: `${traceLevel}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TracerMap;
