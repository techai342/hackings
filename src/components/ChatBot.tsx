
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Cpu, Wifi, ShieldAlert, Zap, Terminal, Activity, Ghost } from 'lucide-react';
import { getNetrunnerResponse } from '../services/gemini';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'model', 
      text: "Connection established. I am the Oracle. What data do you seek in the depths of the net, chummer?", 
      timestamp: new Date().toLocaleTimeString() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getNetrunnerResponse(input, history);
    
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex-1 bg-black text-[#00ff41] font-mono flex flex-col p-2 lg:p-4 gap-4 overflow-hidden relative border-2 border-[#00ff41]/20">
      {/* Background HUD Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      {/* Header Panel */}
      <div className="bg-[#0d0208] border border-[#00ff41]/30 p-4 rounded flex items-center justify-between shadow-[0_0_20px_rgba(0,255,65,0.1)] z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[#00ff41]/10 rounded-full border border-[#00ff41]/30 animate-pulse">
            <Ghost size={24} className="text-[#00ff41]" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.5em] glow-text">Oracle Neural Link</h2>
            <div className="text-[9px] opacity-40 uppercase tracking-widest mt-1">Uplink: GHOST_GATEWAY_V9 // Status: SECURE_CHANNEL</div>
          </div>
        </div>
        <div className="flex gap-8 text-[10px] opacity-60">
           <div className="flex items-center gap-2">
              <Activity size={14} />
              <span>SYNC: 100%</span>
           </div>
           <div className="flex items-center gap-2">
              <Wifi size={14} className="text-cyan-400" />
              <span>LATENCY: 12ms</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0 z-10">
        {/* Main Chat Stream */}
        <div className="flex-1 bg-black/80 border border-[#00ff41]/20 rounded flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#00ff41]/5 to-transparent h-1/4 animate-scanline-fast"></div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center border ${msg.role === 'user' ? 'bg-[#00ff41]/20 border-[#00ff41]/40' : 'bg-cyan-500/10 border-cyan-500/40'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded border ${msg.role === 'user' ? 'bg-[#00ff41]/5 border-[#00ff41]/30 text-white' : 'bg-cyan-500/5 border-cyan-500/30'}`}>
                    <div className="text-[10px] font-bold opacity-30 mb-2 uppercase tracking-widest flex justify-between gap-4">
                      <span>{msg.role === 'user' ? 'IDENTITY_CONFIRMED' : 'ORACLE_STREAM'}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    {msg.role === 'model' && msg.id === messages[messages.length - 1].id && !isLoading && (
                      <div className="mt-2 w-1 h-4 bg-[#00ff41] animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center">
                    <Bot size={16} className="text-cyan-500" />
                  </div>
                  <div className="text-[10px] text-cyan-500 font-black uppercase tracking-[0.4em]">Interfacing with Bio-Core...</div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#050505] border-t border-[#00ff41]/20 flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inject query into Neural Stream..."
              className="flex-1 bg-black/60 border border-[#00ff41]/40 p-3 rounded text-sm text-[#00ff41] outline-none focus:border-[#00ff41] focus:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all uppercase placeholder-[#00ff41]/20"
              disabled={isLoading}
              autoFocus
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="px-6 bg-[#00ff41]/10 border border-[#00ff41]/60 text-[#00ff41] rounded hover:bg-[#00ff41] hover:text-black transition-all flex items-center gap-2 font-black uppercase text-xs"
            >
              <Send size={16} />
              {isLoading ? 'TRANS' : 'INJECT'}
            </button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-72 flex flex-col gap-4">
          <div className="bg-[#0d0208] border border-[#00ff41]/20 p-5 rounded flex flex-col gap-6 shadow-xl">
             <div className="flex items-center gap-3 border-b border-[#00ff41]/20 pb-3">
                <Cpu size={18} />
                <h3 className="text-[11px] font-black uppercase tracking-widest">Oracle Core</h3>
             </div>
             
             <div className="space-y-4">
                <div className="flex flex-col gap-1">
                   <span className="text-[8px] opacity-40 uppercase">Memory_Buffer</span>
                   <div className="w-full h-1 bg-[#003b00] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00ff41]" style={{ width: '65%' }}></div>
                   </div>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[8px] opacity-40 uppercase">Encryption_Type</span>
                   <span className="text-[10px] font-bold">RSA_4096_GHOST</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[8px] opacity-40 uppercase">Subnet_Node</span>
                   <span className="text-[10px] font-bold">X-NEO-772</span>
                </div>
             </div>

             <div className="p-3 bg-red-950/20 border border-red-500/30 rounded flex items-start gap-3">
                <ShieldAlert size={16} className="text-red-500 shrink-0 mt-0.5 animate-pulse" />
                <p className="text-[9px] opacity-60 leading-tight uppercase">Warning: Active trace detected in Sector 4. Encryption rotating...</p>
             </div>
          </div>

          <div className="bg-[#0d0208] border border-cyan-500/20 p-5 rounded flex-1 flex flex-col gap-2">
             <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Zap size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Neural Stability</span>
             </div>
             <div className="flex-1 flex items-end gap-[1px]">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="flex-1 bg-cyan-400/20" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="h-8 border-t border-[#00ff41]/10 flex items-center px-4 justify-between text-[8px] font-black tracking-widest opacity-40">
         <span>PROTOCOL: NEURAL_ORACLE_V9</span>
         <span>SESSION: {Math.random().toString(36).substring(7).toUpperCase()}</span>
         <span>TRACE_LEVEL: 0.02%</span>
      </div>
    </div>
  );
};

export default ChatBot;
