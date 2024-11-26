import { motion } from 'framer-motion';
import { BarChart, Activity, TrendingUp } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VolumeProfileData {
  priceLevel: number;
  volume: number;
  buys: number;
  sells: number;
}

interface Props {
  data: VolumeProfileData[];
  symbol: string;
}

export default function VolumeProfileAnalysis({ data, symbol }: Props) {
  const sortedData = [...data].sort((a, b) => b.volume - a.volume);
  const poc = sortedData[0]; // Point of Control - highest volume level
  
  const chartData = {
    labels: data.map(d => d.priceLevel.toFixed(2)),
    datasets: [
      {
        label: 'קניות',
        data: data.map(d => d.buys),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1
      },
      {
        label: 'מכירות',
        data: data.map(d => -d.sells), // Negative to show on opposite side
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1
      }
    ]
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    scales: {
      x: {
        stacked: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      },
      y: {
        stacked: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            family: 'Heebo'
          }
        }
      },
      title: {
        display: true,
        text: `פרופיל נפח מסחר - ${symbol}`,
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          family: 'Heebo',
          size: 16
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <BarChart className="w-6 h-6 text-indigo-400" />
        <h3 className="text-xl font-bold text-white">פרופיל נפח מסחר</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-200 font-medium">נקודת שליטה</span>
          </div>
          <span className="text-xl font-bold text-white">
            ₪{poc.priceLevel.toFixed(2)}
          </span>
        </div>

        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-indigo-200 font-medium">נפח בנקודת שליטה</span>
          </div>
          <span className="text-xl font-bold text-white">
            {(poc.volume / 1000).toFixed(1)}K
          </span>
        </div>

        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <BarChart className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-200 font-medium">רמות מחיר פעילות</span>
          </div>
          <span className="text-xl font-bold text-white">
            {data.length}
          </span>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <Bar data={chartData} options={options} />
      </div>
    </motion.div>
  );
}