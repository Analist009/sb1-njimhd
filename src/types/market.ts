export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdated: string;
}

export interface MarketAnalysis {
  symbol: string;
  currentPrice: number;
  changePercent: number;
  volume: number;
  lastUpdated: string;
  technicalAnalysis: {
    trend: string;
    indicators: {
      rsi: number;
      macd: {
        value: number;
        signal: number;
        histogram: number;
      };
    };
  };
  sentiment: {
    score: number;
    signals: string[];
  };
  risks: Array<{
    type: string;
    description: string;
    severity: number;
  }>;
  opportunities: Array<{
    type: string;
    description: string;
    potential: number;
  }>;
  priceTargets: {
    low: number;
    medium: number;
    high: number;
  };
}