
import React, { useState, useEffect } from 'react';
import { UserCheck, ShieldAlert, Target, Activity, User, Eye, Box, Cpu, Fingerprint, Search } from 'lucide-react';

const FaceID: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'accessing' | 'scanning' | 'verifying' | 'identified' | 'denied'>('idle');
  const [progress, setProgress] = useState(0);
  
  // High-quality realistic human face portrait for the database match
  const targetFaceUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";

  const startRecognition = () => {
    setStatus('accessing');
    // Simulate data stream establishment
    setTimeout(() => setStatus('scanning'), 1200);
  };

  useEffect(() => {
    if (status === 'scanning') {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setStatus('verifying');
            return 100;
          }
          return p + 1.5;
        });
      }, 50);
      return () => clearInterval(interval);
    }

    if (status === 'verifying') {
      const timer = setTimeout(() => {
        setStatus('identified');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="flex-1 flex flex-col gap-6 animate-in fade-in zoom-in duration-500 overflow-hidden">
      <div className="bg-[#0d0208] border border-cyan-500/30 p-6 rounded-lg flex flex-col items-center justify-center relative min-h-[600px] overflow-hidden">
        
        {/* HUD Elements */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 text-[10px] font-mono text-cyan-400/60 uppercase">
          <div className="flex items-center gap-2"><Target size={12} /> Target: Human_Subject_Alpha</div>
          <div className="flex items-center gap-2"><Activity size={12} /> Biometric_Sync: {status === 'identified' ? 'LOCKED' : status === 'scanning' ? 'ESTABLISHING...' : 'OFFLINE'}</div>
        </div>

        <div className="absolute top-4 right-4 text-right text-[10px] font-mono text-cyan-500/60 uppercase">
          <div className="flex items-center gap-2 justify-end">
             <span className={status === 'scanning' ? 'animate-pulse text-cyan-400' : ''}>DATABASE_LINK</span>
             <div className={`w-2 h-2 rounded-full ${status === 'scanning' ? 'bg-cyan-400 shadow-[0_0_8px_cyan]' : 'bg-gray-800'}`}></div>
          </div>
          <div className="mt-1 font-mono">ENCRYPTION: AES-256</div>
        </div>

        {/* Main Display Area */}
        <div className="relative w-full max-w-2xl aspect-[16/9] bg-black/60 rounded border border-cyan-500/20 overflow-hidden flex items-center justify-center shadow-[inset_0_0_100px_rgba(0,0,0,1)] group">
          
          {/* Human Face Image Container */}
          <div className="absolute inset-0 z-0">
            <img 
              src={targetFaceUrl}
              alt="Subject Face"
              className={`w-full h-full object-cover transition-all duration-1000 ${
                status === 'idle' ? 'grayscale brightness-[0.15] blur-[8px]' : 
                status === 'identified' ? 'grayscale-0 brightness-100 scale-100' : 
                'grayscale brightness-50'
              }`}
            />
            {/* Scan Mesh Textures */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
            <div className={`absolute inset-0 bg-cyan-900/10 mix-blend-color transition-opacity duration-1000 ${status === 'idle' ? 'opacity-100' : 'opacity-40'}`}></div>
          </div>

          {/* 1. IDLE STATE */}
          {status === 'idle' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center animate-in fade-in duration-1000">
               <div className="relative mb-12">
                  <div className="absolute -inset-16 border border-cyan-500/10 rounded-full animate-spin-slow"></div>
                  <div className="absolute -inset-10 border border-cyan-500/20 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
                  <div className="w-40 h-40 border border-cyan-500/40 flex items-center justify-center overflow-hidden bg-black/60 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                    <User size={100} className="text-cyan-500/10" />
                  </div>
                  <div className="absolute bottom-0 right-2 p-2 bg-cyan-500/20 border border-cyan-500/40 rounded-full">
                    <Fingerprint size={20} className="text-cyan-400" />
                  </div>
               </div>

               <div className="text-center z-30">
                  <h2 className="text-cyan-400 font-mono text-xs uppercase tracking-[0.8em] mb-8 animate-pulse">Human Node Detected</h2>
                  <button 
                    onClick={startRecognition}
                    className="group relative px-20 py-4 bg-cyan-500/5 border border-cyan-400/60 text-cyan-400 font-bold uppercase tracking-[0.6em] hover:bg-cyan-400 hover:text-black transition-all rounded shadow-[0_0_20px_rgba(6,182,212,0.2)] overflow-hidden"
                  >
                    <span className="relative z-10">Scan Subject</span>
                    <div className="absolute inset-0 bg-cyan-400/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
               </div>
            </div>
          )}

          {/* 2. ACCESSING STATE */}
          {status === 'accessing' && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md">
               <div className="relative">
                 <div className="w-24 h-24 border-2 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin"></div>
                 <Activity size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-pulse" />
               </div>
               <div className="mt-8 text-cyan-400 font-mono text-[10px] uppercase tracking-[1em] animate-pulse">Linking Bio-Core...</div>
            </div>
          )}

          {/* 3. ACTIVE SCAN HUD */}
          {status !== 'idle' && status !== 'accessing' && (
            <>
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* HUD Borders */}
                <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-cyan-400/60"></div>
                <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-cyan-400/60"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-cyan-400/60"></div>
                <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-cyan-400/60"></div>

                {/* Facial Point Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[60%] border border-cyan-500/40 rounded-[20%]">
                   {/* Scanning Horizontal Line */}
                   {(status === 'scanning' || status === 'verifying') && (
                      <div className="absolute inset-0 overflow-hidden rounded-[20%]">
                         <div className="absolute w-full h-1.5 bg-cyan-400 shadow-[0_0_35px_#22d3ee] animate-[scanline-fast_1.8s_linear_infinite]"></div>
                         <div className="absolute inset-0 bg-cyan-400/5 animate-pulse"></div>
                      </div>
                   )}

                   {/* Feature Mapping Points */}
                   {status === 'scanning' && (
                     <div className="absolute inset-0">
                        {[...Array(15)].map((_, i) => (
                          <div 
                            key={i} 
                            className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_cyan]"
                            style={{ 
                              left: `${15 + Math.random() * 70}%`, 
                              top: `${15 + Math.random() * 70}%`,
                              opacity: 0.8,
                              animation: `pulse ${1 + Math.random()}s infinite`
                            }}
                          ></div>
                        ))}
                     </div>
                   )}
                </div>

                {/* Dynamic Data Stream Sidebar */}
                <div className="absolute top-1/2 -translate-y-1/2 left-8 flex flex-col gap-4 text-[7px] font-mono text-cyan-400/50 uppercase">
                  <div className="flex flex-col"><span>F_MATCH: 92.4%</span><div className="w-10 h-1 bg-cyan-500/20"><div className="bg-cyan-400 h-full" style={{width: '92%'}}></div></div></div>
                  <div className="flex flex-col"><span>V_SYNC: LOCKED</span><div className="w-10 h-1 bg-cyan-500/20"><div className="bg-cyan-400 h-full" style={{width: '100%'}}></div></div></div>
                  <div className="flex flex-col"><span>T_ACQ: 0.12ms</span><div className="w-10 h-1 bg-cyan-500/20"><div className="bg-cyan-400 h-full" style={{width: '45%'}}></div></div></div>
                </div>
              </div>
            </>
          )}

          {/* 4. SUCCESS OVERLAY */}
          {status === 'identified' && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-cyan-950/40 backdrop-blur-[8px] animate-in fade-in zoom-in duration-700">
               <div className="bg-[#050505]/95 border-2 border-cyan-400 p-10 rounded-lg flex flex-col items-center shadow-[0_0_120px_rgba(6,182,212,0.8)] relative">
                  <div className="absolute -top-12">
                    <div className="w-24 h-24 bg-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_40px_#22d3ee]">
                      <UserCheck size={48} className="text-black" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-[0.4em] uppercase mt-8 mb-2 glow-text text-cyan-400">CITIZEN MATCHED</h2>
                  <div className="text-cyan-400 font-mono text-xs uppercase tracking-[0.5em] border-y border-cyan-400/30 py-4 my-4 w-full text-center">
                    NAME: JONATHAN_V_77
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-[9px] font-mono text-cyan-400/80 uppercase w-full">
                    <div className="flex flex-col border-l border-cyan-400/30 pl-2"><span>LEVEL:</span> <span className="text-white font-bold">ALPHA-ONE</span></div>
                    <div className="flex flex-col border-l border-cyan-400/30 pl-2"><span>ORIGIN:</span> <span className="text-white font-bold">NEO-LONDON</span></div>
                    <div className="flex flex-col border-l border-cyan-400/30 pl-2"><span>THREAT:</span> <span className="text-green-400 font-bold">MINIMAL</span></div>
                    <div className="flex flex-col border-l border-cyan-400/30 pl-2"><span>ACCESS:</span> <span className="text-white font-bold">GRANTED</span></div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Dynamic Controls / Feedback Panels */}
        <div className="mt-10 w-full max-w-xl">
          {status === 'scanning' && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex justify-between w-full text-cyan-400 font-mono text-[10px] uppercase tracking-widest">
                <span className="flex items-center gap-2"><Fingerprint size={14} className="animate-pulse" /> Identifying Facial Landmarks</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-cyan-950/50 rounded-full overflow-hidden border border-cyan-400/20 p-[2px]">
                <div className="h-full bg-cyan-400 shadow-[0_0_20px_#22d3ee] transition-all duration-100 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-[0.3em] animate-pulse">Accessing INTERPOL_CORE Database...</div>
            </div>
          ) }
          
          {status === 'verifying' && (
            <div className="flex flex-col items-center gap-4 animate-in fade-in">
               <div className="flex gap-1">
                 {[...Array(4)].map((_, i) => (
                   <div key={i} className="w-3 h-3 bg-cyan-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}></div>
                 ))}
               </div>
               <div className="text-cyan-400 font-mono text-sm tracking-[0.8em] uppercase text-center">Validating Identity Matrix</div>
            </div>
          )}

          {status === 'identified' && (
             <div className="flex justify-center">
                <button 
                  onClick={() => {
                    setStatus('idle');
                    setProgress(0);
                  }}
                  className="px-16 py-4 bg-red-600/10 border border-red-500/50 text-red-500 text-xs font-bold uppercase tracking-[0.6em] hover:bg-red-600 hover:text-white transition-all rounded shadow-[0_0_25px_rgba(239,68,68,0.2)]"
                >
                  Close Data Link
                </button>
             </div>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0d0208] border border-cyan-500/20 p-6 rounded-lg flex flex-col gap-3 group hover:border-cyan-400/40 transition-all">
          <div className="text-[11px] text-cyan-400/40 uppercase font-bold flex items-center gap-2">
            <ShieldAlert size={16} /> Data Integrity
          </div>
          <div className="text-[12px] font-mono text-white/90 uppercase tracking-tighter">SECURE_ID: 100%_STABLE</div>
          <div className="w-full h-1 bg-cyan-950 rounded-full"><div className="h-full bg-cyan-400/60 rounded-full" style={{ width: status === 'identified' ? '100%' : '15%' }}></div></div>
        </div>
        <div className="bg-[#0d0208] border border-cyan-500/20 p-6 rounded-lg flex flex-col gap-3 group hover:border-cyan-400/40 transition-all">
          <div className="text-[11px] text-cyan-400/40 uppercase font-bold flex items-center gap-2">
            <Cpu size={16} /> Neural Engine
          </div>
          <div className="text-[12px] font-mono text-white/90 uppercase tracking-tighter">VERSION: 4.1-NEO_HUMAN</div>
          <div className="w-full h-1 bg-cyan-950 rounded-full"><div className="h-full bg-cyan-400/60 rounded-full" style={{ width: status !== 'idle' ? '90%' : '5%' }}></div></div>
        </div>
        <div className="bg-[#0d0208] border border-cyan-500/20 p-6 rounded-lg flex flex-col gap-3 group hover:border-cyan-400/40 transition-all">
          <div className="text-[11px] text-cyan-400/40 uppercase font-bold flex items-center gap-2">
            <Activity size={16} /> Network Ping
          </div>
          <div className="text-[12px] font-mono text-white/90 uppercase tracking-tighter">LATENCY: {status === 'idle' ? 'STANDBY' : '18ms'}</div>
          <div className="w-full h-1 bg-cyan-950 rounded-full"><div className="h-full bg-cyan-400/60 rounded-full" style={{ width: '100%' }}></div></div>
        </div>
      </div>
    </div>
  );
};

export default FaceID;
