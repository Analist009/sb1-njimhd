import { motion } from 'framer-motion';
import { Brain, TrendingUp, BarChart2 } from 'lucide-react';

interface Props {
  sentiment?: number; // -1 to 1
  confidence?: number; // 0 to 1
  volume?: number;
}

export default function MarketSentimentGauge({ 
  sentiment = 0, 
  confidence = 0, 
  volume = 0 
}: Props) {
  const sentimentDegrees = ((sentiment || 0) + 1) * 180; // Convert -1:1 to 0:360 degrees
  const sentimentColor = sentiment > 0.3 ? 'text-green-400' : 
                        sentiment < -0.3 ? 'text-red-400' : 
                        'text-yellow-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-indigo-400" />
        <h3 className="text-xl font-bold text-white">מד סנטימנט שוק</h3>
      </div>

      <div className="relative w-48 h-24 mx-auto mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-red-400 via-yellow-400 to-green-400 rounded-t-full opacity-20" />
        <motion.div
          className="absolute bottom-0 left-1/2 w-1 h-20 bg-indigo-400 origin-bottom"
          initial={{ rotate: 0 }}
          animate={{ rotate: sentimentDegrees }}
          transition={{ type: "spring", stiffness: 100 }}
          style={{ transformOrigin: 'bottom center' }}
        />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-200 font-medium">סנטימנט</span>
          </div>
          <span className={`text-xl font-bold ${sentimentColor}`}>
            {((sentiment || 0) * 100).toFixed(1)}%
          </span>
        </div>

        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-200 font-medium">ביטחון</span>
          </div>
          <span className="text-xl font-bold text-white">
            {((confidence || 0) * 100).toFixed(1)}%
          </span>
        </div>

        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-200 font-medium">נפח ניתוח</span>
          </div>
          <span className="text-xl font-bold text-white">
            {(volume || 0).toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}