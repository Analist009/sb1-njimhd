import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Brain, TrendingUp, BarChart2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SentimentData {
  timestamp: number;
  sentiment: number;
  price: number;
  volume: number;
}

interface Props {
  data?: SentimentData[];
  symbol?: string;
}

export default function SentimentAnalysis({ data = [], symbol = '' }: Props) {
  if (!data?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-bold text-white">ניתוח סנטימנט</h3>
        </div>
        <p className="text-indigo-200 mt-4">אין נתוני סנטימנט זמינים כרגע.</p>
      </motion.div>
    );
  }

  const chartData = {
    labels: data.map(d => new Date(d.timestamp).toLocaleTimeString('he-IL')),
    datasets: [
      {
        label: 'סנטימנט',
        data: data.map(d => d.sentiment),
        borderColor: 'rgba(147, 51, 234, 1)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'מחיר',
        data: data.map(d => d.price),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  // Rest of the component remains the same...
}