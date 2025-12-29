
import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Cpu, Zap, ShieldAlert, Code } from 'lucide-react';
import { getNetrunnerResponse } from '../services/gemini';

const AutoTerminal: React.FC = () => {
  const [history, setHistory] = useState<{id: string, text: string, type: 'user' | 'bot'}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setHistory(prev => [...prev, { id: Date.now().toString(), text: userText, type: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getNetrunnerResponse(
        `GIVE ME A HACKING SCRIPT OR SYSTEM LOGS RESPONSE FOR THE FOLLOWING REQUEST IN CODE FORM: ${userText}`,
        history.slice(-5).map(h => ({ role: h.type === 'user' ? 'user' : 'model', parts: [{ text: h.text }] }))
      );
      
      setHistory(prev => [...prev, { id: (Date.now()+1).toString(), text: response, type: 'bot' }]);
    } catch (err) {
      setHistory(prev => [...prev, { id: (Date.now()+1).toString(), text: "ERR: EXCEPTION_DUMP_NULL", type: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-black text-[#00ff41] font-mono p-4 flex flex-col gap-4 overflow-hidden border-2 border-[#00ff41]/40 relative">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-[#00ff41]/20 pb-2">
        <div className="flex items-center gap-3">
          <Code size={20} />
          <h2 className="text-sm font-black uppercase tracking-[0.4em] glow-text">Auto-Sploit Terminal</h2>
        </div>
        <div className="flex gap-4 text-[9px] opacity-50">
           <span>KERNEL: 9.2.1-GHOST</span>
           <span>SESS: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        </div>
      </div>

      {/* Terminal View */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
         {history.length === 0 && (
           <div className="text-[10px] opacity-40 animate-pulse">
             > Waiting for input... Type any target or command to generate exploit payloads.
           </div>
         )}
         {history.map(item => (
           <div key={item.id} className={`${item.type === 'user' ? 'text-white border-l-2 border-white pl-4' : 'text-[#00ff41] bg-[#00ff41]/5 p-4 rounded border border-[#00ff41]/10'}`}>
              <div className="text-[8px] opacity-40 mb-1 uppercase font-black">
                {item.type === 'user' ? 'INPUT_STREAM' : 'SYSTEM_REPLY_DUMP'}
              </div>
              <pre className="text-xs whitespace-pre-wrap leading-relaxed">
                {item.type === 'user' ? `> ${item.text}` : item.text}
              </pre>
           </div>
         ))}
         {isLoading && (
           <div className="flex items-center gap-2 text-yellow-500 animate-pulse">
              <Zap size={14} className="animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-widest">Compiling Payload...</span>
           </div>
         )}
      </div>

      {/* Input Field */}
      <form onSubmit={handleCommand} className="mt-auto border-t border-[#00ff41]/20 pt-4 flex gap-4">
         <span className="text-[#00ff41] font-black">$</span>
         <input 
           type="text" 
           value={input}
           onChange={(e) => setInput(e.target.value)}
           placeholder="Target URI / Host / Service name..."
           className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-[#00ff41]/20 uppercase"
           autoFocus
         />
         <button type="submit" className="hidden">SUBMIT</button>
      </form>
    </div>
  );
};

export default AutoTerminal;
