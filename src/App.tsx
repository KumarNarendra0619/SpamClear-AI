import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Mail, Trash2, Ban, Loader2, Settings } from 'lucide-react';

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [manualEmail, setManualEmail] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev].slice(0, 5));
  };

  const handleConnect = () => {
    // Simulate OAuth connection
    addLog('Connecting to Gmail...');
    setTimeout(() => {
      setIsConnected(true);
      addLog('Connected to Gmail successfully.');
    }, 1500);
  };

  const handleScan = () => {
    if (!isConnected) return;
    setIsScanning(true);
    addLog('Scanning inbox with Gemini AI...');
    
    // Simulate scanning process
    setTimeout(() => {
      addLog('Found 12 spam emails.');
      setTimeout(() => {
        addLog('Deleted 12 spam emails.');
        addLog('Blocked 3 spam senders.');
        setIsScanning(false);
      }, 1500);
    }, 2000);
  };

  const handleManualBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualEmail) return;
    addLog(`Blocked sender: ${manualEmail}`);
    setManualEmail('');
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
      <div className="w-[360px] h-[600px] bg-slate-50 text-slate-900 font-sans flex flex-col shadow-2xl rounded-2xl overflow-hidden border border-slate-300">
        {/* Header */}
        <header className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg shadow-cyan-500/30 overflow-hidden p-0.5">
            <img 
              src="https://images.unsplash.com/photo-1614064641913-a53b946f71d2?q=80&w=128&auto=format&fit=crop" 
              alt="SpamClear AI Logo" 
              className="w-full h-full object-cover rounded-full" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">SpamClear AI</h1>
            <p className="text-xs text-slate-400 font-medium">Gmail Cleaner & Blocker</p>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <Settings className="w-5 h-5 text-slate-400" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 flex flex-col gap-6">
        
        {/* Connection Status */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isConnected ? 'bg-emerald-100' : 'bg-rose-100'}`}>
              {isConnected ? (
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              ) : (
                <Mail className="w-5 h-5 text-rose-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {isConnected ? 'Gmail Connected' : 'Gmail Not Connected'}
              </p>
              <p className="text-xs text-slate-500">
                {isConnected ? 'Ready to scan and block' : 'Connect to start cleaning'}
              </p>
            </div>
          </div>
          {!isConnected && (
            <button 
              onClick={handleConnect}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              Connect
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleScan}
            disabled={!isConnected || isScanning}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border ${
              !isConnected 
                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                : isScanning
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:shadow-md transition-all'
            }`}
          >
            {isScanning ? (
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            ) : (
              <Trash2 className={`w-6 h-6 ${isConnected ? 'text-blue-600' : 'text-slate-400'}`} />
            )}
            <span className="text-sm font-semibold">
              {isScanning ? 'Scanning...' : 'Auto Clean'}
            </span>
          </button>

          <button 
            disabled={!isConnected || isScanning}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border ${
              !isConnected 
                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-white border-slate-200 text-slate-700 hover:border-rose-400 hover:shadow-md transition-all'
            }`}
          >
            <Ban className={`w-6 h-6 ${isConnected ? 'text-rose-600' : 'text-slate-400'}`} />
            <span className="text-sm font-semibold">Bulk Block</span>
          </button>
        </div>

        {/* Manual Block */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-800 mb-2">Manual Block</h3>
          <form onSubmit={handleManualBlock} className="flex gap-2">
            <input 
              type="email" 
              value={manualEmail}
              onChange={(e) => setManualEmail(e.target.value)}
              placeholder="spammer@example.com" 
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button 
              type="submit"
              disabled={!isConnected}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Block
            </button>
          </form>
        </div>

        {/* Activity Logs */}
        <div className="flex-1 bg-slate-900 rounded-xl p-4 shadow-inner overflow-hidden flex flex-col">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Activity Log</h3>
          <div className="flex-1 overflow-y-auto flex flex-col gap-2">
            {logs.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No recent activity.</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-xs font-mono text-emerald-400 flex items-start gap-2">
                  <span className="text-slate-500 mt-0.5">&gt;</span>
                  <span>{log}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
      </div>
    </div>
  );
}
