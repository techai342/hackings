
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu, Zap, Activity, ShieldAlert } from 'lucide-react';

const StatsPanel: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState<number>(45);
  const [networkTraffic, setNetworkTraffic] = useState<{ time: string, val: number }[]>([]);

  useEffect(() => {
    // Simulate real-time data
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 40) + 30);
      
      setNetworkTraffic(prev => {
        const newData = [...prev, { 
          time: new Date().toLocaleTimeString(), 
          val: Math.floor(Math.random() * 100) 
        }];
        if (newData.length > 20) return newData.slice(1);
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 h-full">
      <div className="bg-[#0d0208] border border-[#00ff41]/30 p-4 rounded-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            <h3 className="text-sm font-bold tracking-widest text-white uppercase">Neural Processing</h3>
          </div>
          <span className="text-cyan-400 font-mono text-xl">{cpuUsage}%</span>
        </div>
        <div className="w-full bg-[#003b00]/20 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-cyan-400 h-full transition-all duration-1000 ease-in-out shadow-[0_0_10px_#22d3ee]" 
            style={{ width: `${cpuUsage}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-[#0d0208] border border-[#00ff41]/30 p-4 rounded-lg flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={18} className="text-yellow-400" />
          <h3 className="text-sm font-bold tracking-widest text-white uppercase">Subnet Traffic</h3>
        </div>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={networkTraffic}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="val" 
                stroke="#eab308" 
                fillOpacity={1} 
                fill="url(#colorVal)" 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#0d0208] border border-[#00ff41]/30 p-4 rounded-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-[#00ff41]" />
            <h3 className="text-sm font-bold tracking-widest text-white uppercase">Uptime Stability</h3>
          </div>
          <span className="text-[#00ff41] font-mono">STABLE</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[...Array(24)].map((_, i) => (
            <div 
              key={i} 
              className={`h-4 rounded-sm ${Math.random() > 0.1 ? 'bg-[#00ff41]/40' : 'bg-red-500/40 animate-pulse'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
