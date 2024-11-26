import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart2 } from 'lucide-react';

interface Props {
  analysis?: {
    trend?: string;
    support?: number;
    resistance?: number;
    rsi?: number;
    macd?: {
      value: number;
      signal: number;
      histogram: number;
    };
  };
}

export default function TechnicalAnalysis({ analysis = {} }: Props) {
  if (!analysis || !analysis.trend) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">ניתוח טכני</h3>
        </div>
        <p className="text-indigo-200 mt-4">אין נתוני ניתוח טכני זמינים כרגע.</p>
      </motion.div>
    );
  }

  const isBullish = analysis.trend === "עולה";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-4">
        <Activity className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-bold text-white">ניתוח טכני</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Trend */}
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            {isBullish ? (
              <TrendingUp className="w-5 h-5 text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
            <span className="text-indigo-200 font-medium">מגמה</span>
          </div>
          <span className={`text-xl font-bold ${isBullish ? 'text-green-400' : 'text-red-400'}`}>
            {analysis.trend}
          </span>
        </div>

        {/* Support */}
        {analysis.support !== undefined && (
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-200 font-medium">תמיכה</span>
            </div>
            <span className="text-xl font-bold text-white">
              ₪{analysis.support.toFixed(2)}
            </span>
          </div>
        )}

        {/* Resistance */}
        {analysis.resistance !== undefined && (
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-200 font-medium">התנגדות</span>
            </div>
            <span className="text-xl font-bold text-white">
              ₪{analysis.resistance.toFixed(2)}
            </span>
          </div>
        )}

        {/* RSI */}
        {analysis.rsi !== undefined && (
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-200 font-medium">RSI</span>
            </div>
            <span className={`text-xl font-bold ${
              analysis.rsi > 70 ? 'text-red-400' : 
              analysis.rsi < 30 ? 'text-green-400' : 
              'text-white'
            }`}>
              {analysis.rsi.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* MACD */}
      {analysis.macd && (
        <div className="mt-4 bg-white/5 p-4 rounded-lg border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-3">MACD</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-indigo-200 text-sm">ערך</span>
              <p className="text-lg font-bold text-white">{analysis.macd.value.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-indigo-200 text-sm">סיגנל</span>
              <p className="text-lg font-bold text-white">{analysis.macd.signal.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-indigo-200 text-sm">היסטוגרמה</span>
              <p className={`text-lg font-bold ${
                analysis.macd.histogram > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {analysis.macd.histogram.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}