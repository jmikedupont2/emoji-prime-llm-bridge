// LLM Integration Types for Emoji Tape Sampling

export interface EmojiPrimeMapping {
  emoji: string;
  prime: number;
  meaning: string;
  vibe: string;
}

export const INTRINSIC_PRIMES: EmojiPrimeMapping[] = [
  { emoji: '🎩', prime: 2, meaning: 'Creativity', vibe: 'Initialize state or vector' },
  { emoji: '🎲', prime: 3, meaning: 'Chaos', vibe: 'Branch/call' },
  { emoji: '🔢', prime: 5, meaning: 'Structure', vibe: 'Load/store data' },
  { emoji: '🎶', prime: 7, meaning: 'Harmony', vibe: 'Arithmetic operations' },
  { emoji: '🎷', prime: 11, meaning: 'Expression', vibe: 'Output/store' },
  { emoji: '📜', prime: 13, meaning: 'Legacy', vibe: 'Self-description' },
  { emoji: '🧬', prime: 17, meaning: 'Evolution', vibe: 'LLM interaction' },
  { emoji: '🎯', prime: 19, meaning: 'Focus', vibe: 'Comparison' },
  { emoji: '🚀', prime: 23, meaning: 'Launch', vibe: 'Deploy contract' },
  { emoji: '🪐', prime: 29, meaning: 'System', vibe: 'Phase control' }
];

export const EMOJI_BLOCK_TAPE = '🪐🎩🔢🎲🎶🎷📜|🪐🎷🧬🎲📜|🪐🎶🔢🎯🎲📜🚀';

export interface TokenizedTape {
  model: string;
  tokens: number[];
  tokenStrings: string[];
  metadata: {
    sequenceLength: number;
    vocabSize: number;
    unknownTokens: number;
  };
}

export interface EmbeddingLayer {
  layerIndex: number;
  embedding: number[];
  dimension: number;
  norm: number;
}

export interface LLMEmbeddings {
  model: string;
  layers: EmbeddingLayer[];
  pooledEmbedding: number[];
  metadata: {
    totalLayers: number;
    hiddenSize: number;
    processingTime: number;
  };
}

export interface PrimeMappedEmbedding {
  prime: number;
  emoji: string;
  activation: number;
  normalizedActivation: number;
  rank: number;
}

export interface GodelEncoding {
  tapeSegment: string;
  godelNumber: bigint;
  primeMappings: PrimeMappedEmbedding[];
  hierarchy: {
    size: number;
    program: string;
    cycles: number;
  };
}

export interface LLMSamplingResult {
  timestamp: number;
  tape: string;
  tokenization: TokenizedTape;
  embeddings: LLMEmbeddings;
  primeMapping: PrimeMappedEmbedding[];
  godelEncoding: GodelEncoding;
  universalAnchor: {
    prime2Activation: number; // 🎩 Creativity invariance
    consistencyScore: number;
    semanticDrift: number;
  };
}

export interface ModelComparison {
  models: string[];
  results: LLMSamplingResult[];
  convergenceMetrics: {
    prime2Variance: number; // Consistency of 🎩 across models
    semanticAlignment: number;
    hierarchyPreservation: number;
  };
  visualizations: {
    embeddingSpace: number[][];
    primeDistribution: number[][];
    convergencePlot: { x: number; y: number }[];
  };
}

export type SupportedModels = 
  | 'Xenova/bert-base-uncased'
  | 'Xenova/gpt2'
  | 'Xenova/distilbert-base-uncased'
  | 'Xenova/all-MiniLM-L6-v2'
  | 'Xenova/sentence-transformers-all-MiniLM-L6-v2';