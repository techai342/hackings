
import React, { useState, useEffect } from 'react';
import { Fingerprint, Lock, Unlock, Folder, User, Search, Activity, Database, Shield } from 'lucide-react';

const PersonalIntelligence: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [identified, setIdentified] = useState(false);
  const [progress, setProgress] = useState(0);

  const dataFields = [
    { label: "Name", value: identified ? "ELIAS_VANCE_8" : "********" },
    { label: "Home Address", value: identified ? "SECTOR_7_HIVE_B2" : "********" },
    { label: "Business Address", value: identified ? "NEO_CORP_INT" : "********" },
    { label: "Identity Card No", value: identified ? "00-9284-AX" : "********" },
    { label: "Passport No", value: identified ? "P-992-K0" : "********" },
    { label: "Driving License", value: identified ? "L-X-4421" : "********" },
    { label: "Income Tax No", value: identified ? "TX-99281-Z" : "********" },
    { label: "Car Registration", value: identified ? "NEO-771-K" : "********" },
    { label: "Other", value: identified ? "NO_PRIOR_TRACES" : "********" },
  ];

  const triggerScan = () => {
    setIsScanning(true);
    setProgress(0);
    setIdentified(false);
  };

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setIdentified(true);
            return 100;
          }
          return p + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  return (
    <div className="flex-1 bg-[#050505] text-cyan-400 font-mono p-4 flex flex-col gap-4 animate-in fade-in duration-500 overflow-hidden select-none">
      {/* Background World Map Overlay (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain"></div>

      {/* Top Banner Data Lines */}
      <div className="h-6 overflow-hidden flex gap-1 opacity-40">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex-1 bg-cyan-900/20 h-full border border-cyan-500/20 text-[8px] flex items-center justify-center">
            {Math.random().toString(36).substring(7).toUpperCase()}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 relative">
        {/* LEFT COLUMN: Biometrics & Storage */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          {/* Fingerprint Panel */}
          <div className="bg-[#05111a] border-2 border-cyan-500/40 p-4 rounded-tl-3xl relative group">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
            <h3 className="text-[10px] font-black mb-4 flex items-center gap-2">
              <Activity size={14} className="animate-pulse" /> BIO_ANALYSIS
            </h3>
            <div className="aspect-square border border-cyan-500/20 flex items-center justify-center relative bg-black/40 overflow-hidden">
               <Fingerprint size={80} className={`transition-all duration-700 ${isScanning ? 'text-cyan-400 animate-pulse scale-110' : 'text-cyan-900'}`} />
               {isScanning && (
                 <div className="absolute inset-0 bg-cyan-500/10 animate-scanline-fast"></div>
               )}
            </div>
            <div className="mt-2 text-[8px] flex justify-between opacity-60">
              <span>RIDGE_MATCH: {isScanning ? (progress * 0.9).toFixed(1) : '0.0'}%</span>
              <span>VERIFIED: {identified ? 'OK' : '...'}</span>
            </div>
          </div>

          {/* Confidential Data Panel */}
          <div className="bg-[#05111a] border-2 border-cyan-500/40 p-6 flex flex-col items-center gap-4 relative">
             <div className={`p-4 border-2 transition-all duration-500 ${identified ? 'border-cyan-400 bg-cyan-500/10' : 'border-red-900/40 bg-red-950/10'}`}>
                {identified ? <Unlock size={32} className="text-cyan-400" /> : <Lock size={32} className="text-red-900 animate-pulse" />}
             </div>
             <div className="text-center">
                <h3 className="text-sm font-black tracking-widest uppercase">Confidential Data</h3>
                <div className="text-[10px] opacity-40 mt-1 uppercase">Access: {identified ? 'Granted' : 'Restricted'}</div>
             </div>
          </div>

          {/* Folder Grid */}
          <div className="bg-[#05111a] border-2 border-cyan-500/40 p-4 flex-1">
             <div className="grid grid-cols-3 gap-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`aspect-square border flex items-center justify-center transition-all ${identified ? 'border-cyan-500/40 bg-cyan-500/10' : 'border-cyan-900/20 bg-black/40 opacity-20'}`}>
                    <Folder size={18} />
                  </div>
                ))}
             </div>
             <div className="mt-4 text-[9px] opacity-30 text-center uppercase tracking-widest">Storage_Nodes: Linked</div>
          </div>
        </div>

        {/* CENTER COLUMN: The Digital Silhouette */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* HUD Target Brackets */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-cyan-400/20"></div>
             <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-cyan-400/20"></div>
             <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-cyan-400/20"></div>
             <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-cyan-400/20"></div>
          </div>

          {/* Code Silhouette Container */}
          <div className="relative w-full aspect-[3/4] flex items-center justify-center">
             <div className={`relative transition-all duration-1000 ${isScanning ? 'brightness-150 scale-105' : 'brightness-100'}`}>
                {/* Silhouette SVG with code fill */}
                <svg viewBox="0 0 100 120" className="w-80 h-[480px]">
                   <mask id="silhouetteMask">
                      <path d="M50 10 Q65 10 70 25 T70 45 T50 50 T30 45 T30 25 T50 10 M30 55 Q20 55 15 70 T15 110 L85 110 T85 70 Q80 55 70 55 Z" fill="white" />
                   </mask>
                   <g mask="url(#silhouetteMask)">
                      {/* Flickering Code Background inside the silhouette */}
                      <foreignObject x="0" y="0" width="100" height="120">
                         <div className="w-full h-full text-[2px] leading-[2px] break-all opacity-80 animate-pulse overflow-hidden">
                            {[...Array(200)].map((_, i) => (
                              <span key={i}>{Math.random() > 0.5 ? '0' : '1'}{Math.random().toString(16).substring(2, 4)}</span>
                            ))}
                         </div>
                      </foreignObject>
                   </g>
                   {/* Glowing Outline */}
                   <path 
                     d="M50 10 Q65 10 70 25 T70 45 T50 50 T30 45 T30 25 T50 10 M30 55 Q20 55 15 70 T15 110 L85 110 T85 70 Q80 55 70 55 Z" 
                     fill="none" 
                     stroke="currentColor" 
                     strokeWidth="0.5" 
                     className={`${identified ? 'text-cyan-400' : 'text-cyan-900'} drop-shadow-[0_0_10px_currentColor]`}
                   />
                </svg>
             </div>
             
             {/* Scanning Bar Overlay */}
             {isScanning && (
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] animate-scanline-fast"></div>
               </div>
             )}
          </div>

          {/* Identify Button */}
          <div className="mt-4 w-full px-12">
             <button 
               onClick={triggerScan}
               disabled={isScanning}
               className={`w-full py-4 border-2 font-black uppercase tracking-[0.5em] text-sm transition-all relative overflow-hidden group ${isScanning ? 'bg-cyan-500/10 border-cyan-400/20 text-cyan-400/40' : 'bg-black border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]'}`}
             >
                <div className="relative z-10 flex items-center justify-center gap-4">
                  <Search size={20} className={isScanning ? 'animate-spin' : ''} />
                  {isScanning ? `Extracting... ${progress}%` : '[Identify Person]'}
                </div>
                {/* Progress fill */}
                {isScanning && (
                  <div className="absolute left-0 top-0 bottom-0 bg-cyan-400/20 transition-all duration-100" style={{ width: `${progress}%` }}></div>
                )}
             </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Personal Data Fields */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#05111a] border-2 border-cyan-500/40 p-6 flex flex-col gap-4 h-full relative">
             <div className="absolute top-0 right-0 p-2 bg-cyan-500/20">
                <Shield size={16} className="text-cyan-400" />
             </div>
             <h2 className="text-xl font-black uppercase tracking-[0.3em] text-white border-b-2 border-cyan-500/20 pb-4 mb-2">Personal Data</h2>
             
             <div className="flex flex-col gap-2 overflow-y-auto pr-2 scrollbar-thin">
                {dataFields.map((field, idx) => (
                  <div key={idx} className="group flex flex-col gap-1">
                     <div className="text-[10px] font-bold uppercase text-cyan-400/40 tracking-widest">{field.label}</div>
                     <div className={`p-3 bg-black/40 border-2 transition-all duration-500 ${identified ? 'border-cyan-500/40 text-white' : 'border-cyan-900/10 text-cyan-900 animate-pulse'}`}>
                        {field.value}
                     </div>
                  </div>
                ))}
             </div>

             {/* Tactical Map Pin Simulation */}
             <div className="mt-auto pt-6 flex flex-col gap-2">
                <div className="flex justify-between items-center text-[9px] font-bold opacity-40">
                   <span>LAST_KNOWN_UPLINK</span>
                   <span>GEO_TAG_77</span>
                </div>
                <div className="h-24 bg-black/60 border border-cyan-500/20 relative flex items-center justify-center group overflow-hidden">
                   <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors"></div>
                   <Activity size={32} className="text-cyan-900 group-hover:text-cyan-400 transition-colors animate-pulse" />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Info Lines */}
      <div className="h-6 flex items-center justify-between text-[8px] font-bold opacity-40 border-t border-cyan-500/10 mt-2 px-2">
         <span>PROTOCOL: NEURAL_INTEL_GATHER_V4</span>
         <span>GATEWAY: HQ_MAIN_PROXY</span>
         <span>SESSION: {Math.random().toString(16).substring(2, 10).toUpperCase()}</span>
      </div>
    </div>
  );
};

export default PersonalIntelligence;
