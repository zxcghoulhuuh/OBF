
export interface ObfuscationSettings {
  language: 'ru' | 'en';
  deadCodePercent: number;
  virtualizationIntensity: number;
  useAI: boolean;
  seed: string;
  antiTracing: boolean;
  antiTamper: boolean;
  envLock: boolean;
  watermark: string;
  dynamicKeys: boolean;
  heavyMath: boolean;
  nonLinearPC: boolean;
  decoyTraps: boolean;
  stateAnchors: boolean;
  ghostCycles: boolean;
  stackMachine: boolean;
  opcodeShuffle: boolean;
  instructionEncryption: boolean;
  controlFlowChaos: boolean;
  vmMutation: boolean;
  proxyNative: boolean;
  stackShuffling: boolean;
  decoyConstants: boolean;
  optimizeGlobals: boolean;
  nestedVM: boolean;
  honeyPots: boolean;
  arithmeticObf: boolean;
  jumpLogic: boolean;
}

export interface ObfuscationResult {
  code: string;
  logs: string[];
  stats: {
    originalSize: number;
    newSize: number;
    reduction?: string;
  };
}
