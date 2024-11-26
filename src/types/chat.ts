export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  analysis?: {
    symbol: string;
    summary: string;
    recommendation: string;
    confidence: number;
    technicalAnalysis: {
      trend: string;
      support: number;
      resistance: number;
      rsi?: number;
      macd?: {
        value: number;
        signal: number;
        histogram: number;
      };
    };
    fundamentalAnalysis: {
      peRatioAnalysis?: string;
      marketCapAnalysis?: string;
      sectorAnalysis?: string;
      competitorComparison?: string;
    };
    risks: string[];
    opportunities: string[];
    sentimentData?: {
      timestamp: number;
      sentiment: number;
      price: number;
      volume: number;
    }[];
    metrics?: Record<string, string | number>;
  };
}

export interface ChatHistory {
  messages: Message[];
  context?: string;
}