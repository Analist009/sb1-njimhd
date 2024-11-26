export interface RiskAnalysis {
  type: 'MARKET_VOLATILITY' | 'REGULATORY' | 'COMPETITION';
  description: string;
  severity: number;
  mitigationStrategy: string;
  metrics: {
    probability: number;
    impact: number;
    timeframe: string;
  };
  indicators: string[];
}

export interface OpportunityAnalysis {
  type: 'MARKET_GROWTH' | 'INNOVATION' | 'GLOBAL_EXPANSION';
  description: string;
  potential: number;
  implementationStrategy: string;
  metrics: {
    marketSize: number;
    growthRate: number;
    timeToMarket: string;
  };
  requirements: string[];
}

export interface PriceAnalysis {
  currentPrice: number;
  fairValue: number;
  momentum: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  volatility: number;
  priceTargets: {
    low: number;
    medium: number;
    high: number;
  };
}

export interface ProgressMetrics {
  performance: {
    current: number;
    target: number;
    progress: number;
  };
  kpis: Array<{
    name: string;
    value: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  growthRate: number;
  successRate: number;
}