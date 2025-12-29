
import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { LogEntry, ViewType } from '../types';
import { getNetrunnerResponse } from '../services/gemini';

interface TerminalProps {
  onScan: () => void;
  onBreach: () => void;
  onDecrypt: () => void;
  onExtract: () => void;
  onLocate: () => void;
  onViewChange: (view: ViewType) => void;
  traceLevel: number;
  missions: any[];
}

const Terminal: React.FC<TerminalProps> = ({ 
  onScan, onBreach, onViewChange, traceLevel
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', type: 'info', message: 'Neural link established.', timestamp: new Date().toLocaleTimeString() },
    { id: '2', type: 'success', message: 'Root access confirmed for: GHOST_INITIATE.', timestamp: new Date().toLocaleTimeString() },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmdParts = input.trim().toLowerCase().split(' ');
    const cmd = cmdParts[0];
    const arg = cmdParts[1];
    addLog(`> ${input}`, 'input');
    setInput('');

    switch (cmd) {
      case 'help':
        addLog('Available Directives:', 'info');
        addLog(' - scan: Discovery network nodes', 'info');
        addLog(' - breach: Initiate ICE bypass', 'info');
        addLog(' - goto [view]: dashboard, network, archives, oracle, missions', 'info');
        addLog(' - ai [query]: Interface with the Oracle', 'success');
        addLog(' - clear: Wipe console logs', 'info');
        break;
      case 'scan':
        addLog('Broadcasting node discovery...', 'info');
        onScan();
        break;
      case 'breach':
        addLog('Initializing breach sequence...', 'warning');
        onBreach();
        break;
      case 'goto':
        if (!arg) { addLog('ERR: Target required.', 'error'); break; }
        const views: Record<string, ViewType> = {
          'dashboard': 'DASHBOARD',
          'network': 'NETWORK',
          'archives': 'FILES',
          'oracle': 'CHATBOT',
          'missions': 'MISSIONS'
        };
        if (views[arg]) {
          addLog(`Routing to ${arg.toUpperCase()}...`, 'info');
          onViewChange(views[arg]);
        } else {
          addLog(`ERR: Unknown node '${arg}'`, 'error');
        }
        break;
      case 'ai':
        const prompt = input.substring(3);
        if (!prompt) { addLog('Oracle requires a query.', 'error'); return; }
        setIsLoading(true);
        const response = await getNetrunnerResponse(prompt);
        setIsLoading(false);
        addLog(`Oracle: ${response}`, 'success');
        break;
      case 'clear':
        setLogs([]);
        break;
      default:
        addLog(`ERR: Unknown command '${cmd}'`, 'error');
    }
  };

  return (
    <div className={`flex flex-col h-full bg-black/80 border rounded-lg overflow-hidden transition-all duration-300 ${traceLevel > 80 ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-[#00ff41]/30 shadow-[0_0_20px_rgba(0,255,65,0.15)]'}`}>
      <div className={`border-b p-2 flex items-center gap-2 ${traceLevel > 80 ? 'bg-red-950/40 border-red-500/30' : 'bg-[#003b00]/20 border-[#00ff41]/30'}`}>
        <TerminalIcon size={16} className={traceLevel > 80 ? "text-red-500 animate-pulse" : "text-[#00ff41]"} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#00ff41]">Core_Terminal_v4</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-xs">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2">
            <span className="text-[#003b00] shrink-0">[{log.timestamp.split(' ')[0]}]</span>
            <span className={`
              ${log.type === 'error' ? 'text-red-500' : ''}
              ${log.type === 'success' ? 'text-[#00ff41] glow-text' : ''}
              ${log.type === 'warning' ? 'text-yellow-400' : ''}
              ${log.type === 'info' ? 'text-cyan-400' : ''}
              ${log.type === 'input' ? 'text-white' : ''}
            `}>
              {log.message}
            </span>
          </div>
        ))}
        {isLoading && <div className="text-yellow-500 animate-pulse">> Processing...</div>}
        <div ref={logEndRef} />
      </div>

      <form onSubmit={handleCommand} className="p-3 bg-black border-t border-[#00ff41]/10 flex gap-2">
        <span className="text-[#00ff41] font-bold">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command (type 'help')..."
          className="flex-1 bg-transparent border-none outline-none text-[#00ff41] font-mono text-xs"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
