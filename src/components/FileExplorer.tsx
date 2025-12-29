
import React from 'react';
import { FileCode, FileArchive, FileText, Download, ShieldCheck } from 'lucide-react';
import { FileData } from '../types';

const MOCK_FILES: FileData[] = [
  { id: '1', name: 'corporate_ledger.arc', size: '14.2 MB', type: 'archive', date: '2025-05-12' },
  { id: '2', name: 'node_keys.key', size: '4 KB', type: 'key', date: '2025-05-14' },
  { id: '3', name: 'sys_log_v2.log', size: '842 KB', type: 'log', date: '2025-05-15' },
  { id: '4', name: 'neural_payload.exe', size: '2.1 MB', type: 'executable', date: '2025-05-18' },
];

const FileExplorer: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 animate-in fade-in zoom-in duration-300">
      <div className="flex items-center justify-between bg-[#0d0208] border border-[#00ff41]/20 p-4 rounded-lg">
        <h2 className="text-sm font-bold tracking-[0.3em] uppercase flex items-center gap-2">
          <FileArchive size={18} className="text-yellow-500" />
          Exfiltrated Archives
        </h2>
        <div className="text-[10px] text-[#00ff41]/40 font-mono">
          STORAGE: 4.2GB / 100GB // ENCRYPTION: AES-X
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_FILES.map(file => (
          <div key={file.id} className="bg-[#0d0208] border border-[#00ff41]/10 p-4 rounded-lg hover:border-[#00ff41]/40 transition-all group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-[#00ff41]/5 rounded border border-[#00ff41]/10 group-hover:bg-[#00ff41]/10 transition-colors">
                {file.type === 'archive' && <FileArchive className="text-yellow-500" />}
                {file.type === 'key' && <ShieldCheck className="text-cyan-400" />}
                {file.type === 'log' && <FileText className="text-gray-400" />}
                {file.type === 'executable' && <FileCode className="text-red-500" />}
              </div>
              <Download size={16} className="text-[#00ff41]/20 group-hover:text-[#00ff41] transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1 truncate">{file.name}</h3>
            <div className="flex justify-between text-[10px] font-mono text-[#00ff41]/40 uppercase">
              <span>{file.size}</span>
              <span>{file.date}</span>
            </div>
          </div>
        ))}
        {/* Placeholder for "Locked" files */}
        <div className="bg-[#0d0208] border border-dashed border-[#00ff41]/5 p-4 rounded-lg flex items-center justify-center opacity-30">
          <span className="text-[10px] uppercase tracking-widest italic">Data Segment Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
