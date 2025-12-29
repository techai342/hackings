
import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Lock, User, Terminal as TerminalIcon } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'error' | 'success'>('idle');
  const [bootText, setBootText] = useState<string[]>([]);
  
  const bootSequence = [
    "INITIALIZING NEURAL LINK...",
    "ESTABLISHING SECURE HANDSHAKE...",
    "DECRYPTING GATEWAY PROTOCOLS...",
    "WAITING FOR USER CREDENTIALS..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setBootText(prev => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('checking');
    
    setTimeout(() => {
      if (username === 'saqib' && password === '345876') {
        setStatus('success');
        setTimeout(() => {
          onLoginSuccess();
        }, 1500);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className={`w-full max-w-md bg-[#0d0208] border-2 transition-all duration-300 ${
        status === 'error' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-[shake_0.5s_ease-in-out]' : 
        status === 'success' ? 'border-[#00ff41] shadow-[0_0_30px_rgba(0,255,65,0.4)]' : 
        'border-[#00ff41]/30 shadow-[0_0_20px_rgba(0,255,65,0.1)]'
      } rounded-lg overflow-hidden`}>
        
        <div className="bg-[#003b00]/20 border-b border-[#00ff41]/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon size={18} className="text-[#00ff41]" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#00ff41]">Secure Gateway v2.4</span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-[#00ff41]/50"></div>
          </div>
        </div>

        <div className="p-8">
          <div className="font-mono text-[10px] text-[#00ff41]/40 mb-6 space-y-1">
            {bootText.map((text, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-[#003b00]">[OK]</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {status === 'success' ? (
            <div className="flex flex-col items-center py-8 animate-pulse">
              <ShieldCheck size={48} className="text-[#00ff41] mb-4" />
              <h2 className="text-xl font-bold tracking-[0.5em] text-[#00ff41] glow-text">ACCESS GRANTED</h2>
              <p className="text-[10px] font-mono mt-2 text-[#00ff41]/60 uppercase">Redirecting to neural core...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 text-[#00ff41]/40" size={16} />
                  <input
                    type="text"
                    placeholder="USERNAME"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black/40 border border-[#00ff41]/20 rounded p-3 pl-10 text-[#00ff41] font-mono text-sm focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/50 placeholder-[#00ff41]/10 uppercase tracking-widest"
                    disabled={status === 'checking'}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-[#00ff41]/40" size={16} />
                  <input
                    type="password"
                    placeholder="PASSCODE"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-[#00ff41]/20 rounded p-3 pl-10 text-[#00ff41] font-mono text-sm focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/50 placeholder-[#00ff41]/10 tracking-[0.5em]"
                    disabled={status === 'checking'}
                  />
                </div>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 font-mono text-[10px] uppercase animate-pulse">
                  <ShieldAlert size={14} />
                  <span>Invalid clearance credentials. Trace active.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'checking'}
                className={`w-full py-3 font-bold tracking-[0.3em] uppercase transition-all duration-300 border rounded flex items-center justify-center gap-2 ${
                  status === 'checking' 
                  ? 'bg-[#00ff41]/10 border-[#00ff41]/20 text-[#00ff41]/40' 
                  : 'bg-[#00ff41]/10 border-[#00ff41]/40 text-[#00ff41] hover:bg-[#00ff41]/20 hover:border-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.1)] hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]'
                }`}
              >
                {status === 'checking' ? 'Decrypting...' : 'Override Gateway'}
              </button>
            </form>
          )}
        </div>

        <div className="p-3 bg-black/40 text-[8px] font-mono text-[#00ff41]/20 text-center uppercase tracking-widest">
          Unauthorized access is a class-a neural felony
        </div>
      </div>
    </div>
  );
};

export default Login;
