import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart2, AlertTriangle, Shield, Target, Download } from 'lucide-react';
import { generateAnalysisReport } from '../services/aiService';

// ... rest of the imports and interfaces ...

export default function MarketInsights({ analysis }: Props) {
  const handleDownloadReport = async () => {
    try {
      const reportBlob = await generateAnalysisReport(analysis);
      const url = URL.createObjectURL(reportBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${analysis.symbol}_analysis_report.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('שגיאה בהורדת הדוח');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Real-time Price Section */}
      <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">מחיר בזמן אמת</h3>
          </div>
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>הורד דוח מלא</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-200 font-medium">מחיר נוכחי</span>
            </div>
            <span className="text-xl font-bold text-white">
              ₪{analysis.currentPrice?.toFixed(2)}
            </span>
          </div>

          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-200 font-medium">טרום מסחר</span>
            </div>
            <span className={`text-xl font-bold ${
              analysis.preMarketData?.change > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              ₪{analysis.preMarketData?.price.toFixed(2)}
              <span className="text-sm ml-2">
                ({analysis.preMarketData?.change > 0 ? '+' : ''}
                {analysis.preMarketData?.change.toFixed(2)}%)
              </span>
            </span>
          </div>

          {/* ... rest of the component remains the same ... */}
        </div>
      </div>

      {/* ... rest of the component remains the same ... */}
    </motion.div>
  );
}