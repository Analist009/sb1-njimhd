import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import type { ProgressMetrics } from '../../types/analysis';

interface Props {
  metrics: ProgressMetrics;
}

export default function ProgressMetricsCard({ metrics }: Props) {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-indigo-400" />
        <h3 className="text-xl font-bold text-white">מדדי ביצוע</h3>
      </div>

      {/* Overall Performance */}
      <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">ביצועים כוללים</h4>
        <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${metrics.performance.progress * 100}%` }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-indigo-200">
            {metrics.performance.current.toFixed(1)} / {metrics.performance.target}
          </span>
          <span className="text-indigo-200">
            {(metrics.performance.progress * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.kpis.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 p-4 rounded-lg border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-indigo-200 text-sm">{kpi.name}</span>
              {getTrendIcon(kpi.trend)}
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">
                {kpi.value.toFixed(1)}%
              </span>
              <span className="text-indigo-200 text-sm">
                יעד: {kpi.target}%
              </span>
            </div>
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(kpi.value / kpi.target) * 100}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Growth & Success Rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <span className="text-indigo-200 text-sm">קצב צמיחה</span>
          <div className="flex items-center gap-2 mt-1">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-white">
              {(metrics.growthRate * 100).toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <span className="text-indigo-200 text-sm">שיעור הצלחה</span>
          <div className="flex items-center gap-2 mt-1">
            <Activity className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              {(metrics.successRate * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}