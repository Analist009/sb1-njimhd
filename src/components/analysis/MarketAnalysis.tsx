import { motion } from 'framer-motion';
import TechnicalAnalysis from './TechnicalAnalysis';
import SentimentAnalysis from './SentimentAnalysis';
import MarketDepthAnalysis from './MarketDepthAnalysis';
import RiskOpportunityMatrix from './RiskOpportunityMatrix';
import PriceAnalysis from './PriceAnalysis';
import MarketSentimentGauge from './MarketSentimentGauge';
import type { MarketAnalysis as MarketAnalysisType } from '../../types/market';

interface Props {
  analysis?: MarketAnalysisType;
}

export default function MarketAnalysis({ analysis }: Props) {
  if (!analysis) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center"
      >
        <p className="text-indigo-200">אין נתוני ניתוח זמינים כרגע.</p>
      </motion.div>
    );
  }

  const {
    currentPrice = 0,
    changePercent = 0,
    volume = 0,
    symbol = '',
    sentiment = { score: 0, signals: [] },
    technicalAnalysis = {
      trend: '',
      indicators: { rsi: 0, macd: { value: 0, signal: 0, histogram: 0 } }
    },
    risks = [],
    opportunities = []
  } = analysis;

  const priceAnalysisData = {
    currentPrice,
    fairValue: currentPrice * (1 + changePercent / 100),
    momentum: {
      daily: changePercent / 100,
      weekly: changePercent / 100 * 0.8,
      monthly: changePercent / 100 * 0.6
    },
    volatility: Math.abs(changePercent / 100),
    priceTargets: {
      low: currentPrice * 0.95,
      medium: currentPrice * 1.05,
      high: currentPrice * 1.15
    }
  };

  const technicalData = {
    trend: technicalAnalysis.trend,
    support: currentPrice * 0.95,
    resistance: currentPrice * 1.05,
    rsi: technicalAnalysis.indicators?.rsi,
    macd: technicalAnalysis.indicators?.macd
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 mt-4"
    >
      {/* Price Analysis */}
      <PriceAnalysis 
        analysis={priceAnalysisData}
        symbol={symbol}
      />

      {/* Technical Analysis */}
      <TechnicalAnalysis analysis={technicalData} />

      {/* Market Sentiment */}
      <MarketSentimentGauge
        sentiment={sentiment.score}
        confidence={0.85}
        volume={volume}
      />

      {/* Risk & Opportunity Matrix */}
      <RiskOpportunityMatrix
        risks={risks.map(risk => ({
          type: risk.type as any,
          description: risk.description,
          severity: risk.severity,
          mitigationStrategy: 'ניטור והערכה מתמדת',
          metrics: {
            probability: risk.severity / 10,
            impact: risk.severity / 5,
            timeframe: 'קצר טווח'
          },
          indicators: [risk.description]
        }))}
        opportunities={opportunities.map(opp => ({
          type: opp.type as any,
          description: opp.description,
          potential: opp.potential,
          implementationStrategy: 'מעקב אחר התפתחויות שוק',
          metrics: {
            marketSize: opp.potential * 1000000,
            growthRate: opp.potential / 10,
            timeToMarket: 'מיידי'
          },
          requirements: [opp.description]
        }))}
      />
    </motion.div>
  );
}