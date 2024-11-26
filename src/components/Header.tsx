import { motion } from 'framer-motion';
import { Brain, Bot } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-6"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl animate-pulse" />
              <div className="absolute inset-0.5 bg-gray-900 rounded-[10px]" />
              <Brain className="absolute inset-0 w-full h-full p-2.5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                NetworkJo AI
              </h1>
              <p className="text-indigo-200 text-sm">מערכת ניתוח מניות מתקדמת</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
            >
              <Bot className="w-4 h-4 text-indigo-300" />
              <span className="text-indigo-200 text-sm">מופעל על ידי GPT-4 Turbo</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}