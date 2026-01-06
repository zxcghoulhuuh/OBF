
import React, { useState, useCallback, useEffect } from 'react';
import { ObfuscationSettings, ObfuscationResult } from './types';
import Editor from './components/Editor';
import Toggle from './components/Toggle';
import { localObfuscate } from './services/obfuscator';
import { aiObfuscate } from './services/geminiService';

const DEFAULT_SETTINGS: ObfuscationSettings = {
  language: 'ru',
  deadCodePercent: 99,
  virtualizationIntensity: 100,
  useAI: false,
  seed: Math.random().toString(36).substring(7).toUpperCase(),
  antiTracing: true,
  antiTamper: true,
  envLock: true,
  watermark: "Arcanum_v5.0.0",
  dynamicKeys: true,
  heavyMath: true,
  nonLinearPC: true,
  decoyTraps: true,
  stateAnchors: true,
  ghostCycles: true,
  stackMachine: true,
  opcodeShuffle: true,
  instructionEncryption: true,
  controlFlowChaos: true,
  vmMutation: true,
  proxyNative: true,
  stackShuffling: true,
  decoyConstants: true,
  optimizeGlobals: true,
  nestedVM: true,
  honeyPots: true,
  arithmeticObf: true,
  jumpLogic: true
};

const App: React.FC = () => {
  const [inputCode, setInputCode] = useState<string>('-- Arcanum.lua v5.0.0 CHIMERA GHOST [PRISMATIC]\n-- Final Boss Level Obfuscation\nlocal secret = "PrismVoid"\nlocal tickRate = tick()\n\nprint("GHOST Engine: PHASE_SHIFT_ACTIVE")\nprint("Target: " .. secret .. " | " .. tickRate)\n\nif true then\n    warn("Logic: EVAPORATING")\nend');
  const [outputResult, setOutputResult] = useState<ObfuscationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [processLogs, setProcessLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'kernel' | 'security'>('kernel');
  
  const [settings, setSettings] = useState<ObfuscationSettings>(() => {
    const saved = localStorage.getItem('arcanum_v500_cfg');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('arcanum_v500_cfg', JSON.stringify(settings));
  }, [settings]);

  const t = (ru: string, en: string) => settings.language === 'ru' ? ru : en;

  const handleObfuscate = useCallback(async () => {
    if (!inputCode.trim()) return;
    setIsProcessing(true);
    setIsCopied(false);
    setOutputResult(null);
    setProcessLogs([t("Инициализация CHIMERA GHOST 5.0.0...", "Initializing CHIMERA GHOST 5.0.0...")]);
    
    try {
      let currentCode = inputCode;
      if (settings.useAI) {
        setProcessLogs(prev => [...prev, t("AI: Спектральная призма...", "AI: Spectral prism...")]);
        try {
          currentCode = await aiObfuscate(inputCode, settings);
        } catch (e) {
          setProcessLogs(prev => [...prev, t("AI: Сбой, прямой билд.", "AI: Failure, direct build.")]);
        }
      }

      const result = localObfuscate(currentCode, settings);
      setProcessLogs(result.logs);
      setOutputResult(result);
    } catch (err) {
      setProcessLogs(prev => [...prev, "GHOST_VOID_DISSOLUTION"]);
    } finally {
      setIsProcessing(false);
    }
  }, [inputCode, settings]);

  const handleCopy = useCallback(() => {
    if (outputResult?.code) {
      navigator.clipboard.writeText(outputResult.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [outputResult]);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-[1300px] mx-auto gap-8 relative z-10">
      
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-b border-white/10 animate-fade-in">
        <div className="flex items-center gap-10">
          <div className="w-20 h-20 ui-blur rounded-3xl flex items-center justify-center shadow-2xl border border-cyan-500/20 group overflow-hidden relative glass-card">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-500/20 pointer-events-none" />
            <svg className="w-10 h-10 text-cyan-400 group-hover:scale-[1.4] transition-all duration-700 prismatic-anim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-6xl font-black tracking-[-0.12em] ghost-gradient uppercase leading-none select-none italic prismatic-glow">
              ARCANUM.LUA
            </h1>
            <div className="flex items-center gap-6 mt-4">
              <span className="text-cyan-400 font-mono text-[11px] font-bold tracking-[0.2em] bg-cyan-950/30 px-3 py-1 rounded border border-cyan-500/20 shadow-[0_0_15px_rgba(0,242,254,0.2)]">v5.0.0</span>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.6em] border-l border-zinc-800 pl-6">
                Chimera Ghost Engine
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="flex bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-1.5 border border-white/5 shadow-2xl">
            <button 
              onClick={() => setSettings({...settings, language: 'ru'})}
              className={`px-6 py-2 text-[11px] font-black uppercase rounded-xl transition-all ${settings.language === 'ru' ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'text-zinc-600 hover:text-zinc-400'}`}
            >RU</button>
            <button 
              onClick={() => setSettings({...settings, language: 'en'})}
              className={`px-6 py-2 text-[11px] font-black uppercase rounded-xl transition-all ${settings.language === 'en' ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'text-zinc-600 hover:text-zinc-400'}`}
            >EN</button>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleObfuscate}
              disabled={isProcessing}
              className={`px-16 py-4 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] transition-all relative overflow-hidden group border border-cyan-500/10 ${
                isProcessing 
                  ? 'bg-zinc-900 text-zinc-700 cursor-not-allowed' 
                  : 'bg-white text-black hover:scale-[1.05] shadow-[0_0_60px_rgba(0,242,254,0.3)] active:scale-95'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-violet-400/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isProcessing ? t("DISSOLVING...", "DISSOLVING...") : t("BUILD GHOST", "BUILD GHOST")}
            </button>

            {outputResult && (
              <button 
                onClick={handleCopy}
                className={`px-8 py-4 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] transition-all animate-fade-in border border-violet-500/20 ${
                  isCopied 
                    ? 'bg-violet-500/30 text-white border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {isCopied ? t("COPIED", "COPIED") : t("COPY", "COPY")}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        
        <aside className="w-full lg:w-96 flex flex-col gap-6">
          <div className="ui-blur rounded-3xl overflow-hidden flex flex-col h-full shadow-2xl glass-card border border-cyan-500/10">
            <div className="flex bg-white/[0.02] border-b border-white/5 p-1.5">
              <button 
                onClick={() => setActiveTab('kernel')}
                className={`flex-1 py-5 text-[11px] font-black uppercase tracking-widest transition-all rounded-2xl ${activeTab === 'kernel' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-inner' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                Ghost Core
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex-1 py-5 text-[11px] font-black uppercase tracking-widest transition-all rounded-2xl ${activeTab === 'security' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-inner' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                Void Cloak
              </button>
            </div>

            <div className="p-8 space-y-10 flex-1 overflow-y-auto">
              {activeTab === 'kernel' ? (
                <div className="space-y-10">
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Spectral Density</span>
                      <span className="text-[14px] text-cyan-400 font-mono prismatic-glow">{settings.deadCodePercent}%</span>
                    </div>
                    <input type="range" min="95" max="100" step="1" value={settings.deadCodePercent} onChange={(e) => setSettings({...settings, deadCodePercent: parseInt(e.target.value)})} className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-cyan-400" />
                  </div>
                  
                  <div className="space-y-7 pt-8 border-t border-white/5">
                    <Toggle label="Ghost Shadowing" description="Localized Native Mapping" enabled={true} onChange={() => {}} />
                    <Toggle label="Stack Scramble" description="Prismatic index shuffling" enabled={true} onChange={() => {}} />
                    <Toggle label="Shredding 2.0" description="Deceptive bytecode shred" enabled={true} onChange={() => {}} />
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <Toggle label="Upvalue Shield" description="Hash integrity verification" enabled={true} onChange={() => {}} />
                  <Toggle label="Metatable Lock" description="Encapsulated storage" enabled={true} onChange={() => {}} />
                  <Toggle label="Void Proxy" description="Hide external calls" enabled={true} onChange={() => {}} />
                  
                  <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl mt-8 shadow-inner relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <p className="text-[10px] text-zinc-400 leading-relaxed font-bold text-center uppercase tracking-widest italic">
                      {t("GHOST 5.0.0: Логика испаряется после чтения, делая отладку физически невозможной.", "GHOST 5.0.0: Logic evaporates after reading, making debugging physically impossible.")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-black/40 border-t border-white/5">
              <div className="bg-black/80 rounded-2xl p-5 h-56 overflow-y-auto code-font text-[11px] text-zinc-600 border border-white/5 shadow-2xl">
                {processLogs.map((log, i) => (
                  <div key={i} className="mb-3 flex gap-5 animate-fade-in opacity-60 hover:opacity-100 transition-opacity group">
                    <span className="text-zinc-800 select-none font-bold group-hover:text-cyan-500 transition-colors">#{i.toString().padStart(2, '0')}</span>
                    <span className="whitespace-pre-wrap">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[700px]">
          <Editor label={t("LuaU Исходник", "LuaU Input")} value={inputCode} onChange={setInputCode} />
          <div className="relative group">
            <Editor label={t("Ghost Prismatic Core", "Ghost Prismatic Core")} value={outputResult?.code || ""} readOnly />
            {outputResult && (
              <div className="absolute top-16 right-12 animate-fade-in pointer-events-none">
                <div className="flex items-center gap-6 ui-blur px-6 py-3 rounded-2xl border border-cyan-400/30 shadow-2xl prismatic-glow">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(0,242,254,0.6)]" />
                  <span className="text-[12px] text-white font-black tracking-[0.3em] uppercase">V5.0.0_PHASE</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="flex justify-between items-center py-12 text-[12px] text-zinc-800 uppercase tracking-[2em] border-t border-white/5 mt-auto font-black select-none">
        <div className="flex gap-24">
          <span className="hover:text-cyan-400 transition-colors cursor-default">ARCANUM.LUA v5.0.0</span>
          <span className="hidden md:inline hover:text-violet-400 transition-colors cursor-default">GHOST_STABLE</span>
        </div>
        <span className="italic text-[11px] tracking-widest text-zinc-900 border-b border-zinc-900">SYSTEM_PHASE_LOCKED</span>
      </footer>
    </div>
  );
};

export default App;
