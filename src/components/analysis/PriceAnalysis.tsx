import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, BarChart2, Target } from 'lucide-react';
import type { PriceAnalysis as PriceAnalysisType } from '../../types/analysis';

interface Props {
  analysis: PriceAnalysisType;
  symbol: string;
}

export default function PriceAnalysis({ analysis, symbol }: Props) {
  const priceDeviation = ((analysis.fairValue - analysis.currentPrice) / analysis.currentPrice) * 100;
  const isPriceUndervalued = priceDeviation > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-6 h-6 text-indigo-400" />
        <h3 className="text-xl font-bold text-white">ניתוח מחיר - {symbol}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-200 font-medium">מחיר נוכחי</span>
          </div>
          <span className="text-xl font-bold text-white">
            ₪{analysis.currentPrice.toFixed(2)}
          </span>
        </div>

        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-200 font-medium">שווי הוגן</span>
          </div>
          <span className="text-xl font-bold text-white">
            ₪{analysis.fairValue.toFixed(2)}
          </span>
          <span className={`text-sm ${isPriceUndervalued ? 'text-green-400' : 'text-red-400'}`}>
            {Math.abs(priceDeviation).toFixed(1)}% {isPriceUndervalued ? 'מתחת לשווי' : 'מעל השווי'}
          </span>
        </div>

        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-200 font-medium">תנודתיות</span>
          </div>
          <span className="text-xl font-bold text-white">
            {(analysis.volatility * 100).toFixed(1)}%
          </span>
        </div>

        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-200 font-medium">מומנטום</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-indigo-200 text-sm">יומי</span>
              <span className={`text-sm ${analysis.momentum.daily > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {(analysis.momentum.daily * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-200 text-sm">שבועי</span>
              <span className={`text-sm ${analysis.momentum.weekly > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {(analysis.momentum.weekly * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-200 text-sm">חודשי</span>
              <span className={`text-sm ${analysis.momentum.monthly > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {(analysis.momentum.monthly * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <h4 className="text-lg font-semibold text-white mb-4">יעדי מחיר</h4>
        <div className="relative h-2 bg-white/10 rounded-full mb-6">
          <div className="absolute bottom-full left-0 transform -translate-x-1/2 mb-2">
            <span className="text-sm text-red-400">₪{analysis.priceTargets.low.toFixed(2)}</span>
          </div>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
            <span className="text-sm text-yellow-400">₪{analysis.priceTargets.medium.toFixed(2)}</span>
          </div>
          <div className="absolute bottom-full right-0 transform translate-x-1/2 mb-2">
            <span className="text-sm text-green-400">₪{analysis.priceTargets.high.toFixed(2)}</span>
          </div>
          <div 
            className="absolute h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full"
            style={{ width: '100%' }}
          />
          <div 
            className="absolute w-2 h-4 bg-white rounded-full top-1/2 transform -translate-y-1/2"
            style={{ 
              left: `${((analysis.currentPrice - analysis.priceTargets.low) / 
                (analysis.priceTargets.high - analysis.priceTargets.low)) * 100}%` 
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}