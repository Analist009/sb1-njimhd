import { motion } from 'framer-motion';
import { AlertTriangle, Target } from 'lucide-react';
import type { RiskAnalysis, OpportunityAnalysis } from '../../types/analysis';

interface Props {
  risks?: RiskAnalysis[];
  opportunities?: OpportunityAnalysis[];
}

export default function RiskOpportunityMatrix({ risks = [], opportunities = [] }: Props) {
  if (!risks?.length && !opportunities?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">ניתוח סיכונים והזדמנויות</h3>
        </div>
        <p className="text-indigo-200 mt-4">אין נתוני סיכונים והזדמנויות זמינים כרגע.</p>
      </motion.div>
    );
  }

  // Rest of the component remains the same...
}