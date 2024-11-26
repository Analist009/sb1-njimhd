import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { Line } from 'react-chartjs-2';
// ... rest of imports

interface MarketDepthData {
  price: number;
  buyVolume: number;
  sellVolume: number;
  timestamp: number;
}

interface Props {
  data?: MarketDepthData[];
  symbol?: string;
}

export default function MarketDepthAnalysis({ data = [], symbol = '' }: Props) {
  if (!data?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-3">
          <BarChart2 className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-bold text-white">ניתוח עומק שוק</h3>
        </div>
        <p className="text-indigo-200 mt-4">אין נתוני עומק שוק זמינים כרגע.</p>
      </motion.div>
    );
  }

  // Rest of the component remains the same...
}