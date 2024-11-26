import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Bot, Brain } from 'lucide-react';
import Scene3D from './components/Scene3D';
import AIChat from './components/AIChat';
import Features from './components/Features';
import UsageInstructions from './components/UsageInstructions';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2e] to-[#0f1117]">
      {/* Header */}
      <header className="py-6 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl animate-pulse" />
                <div className="absolute inset-0.5 bg-[#0f1117] rounded-[10px]" />
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
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-3 md:mb-4 text-sm md:text-base">
            <Bot className="w-4 h-4 md:w-5 md:h-5 text-indigo-300" />
            <span className="text-indigo-200">מערכת AI מבית NetworkJo.io</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-2 md:mb-4">
            עולם הבינה המלאכותית
          </h2>
          <p className="text-indigo-200 text-base md:text-lg mb-4 md:mb-6">
            חווית העתיד של אינטראקציה עם בינה מלאכותית
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* 3D Scene */}
          <div className="h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl backdrop-blur-sm border border-white/10">
            <Canvas camera={{ position: [0, 0, 4] }}>
              <Scene3D />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>

          {/* AI Chat */}
          <div>
            <AIChat />
          </div>
        </div>

        {/* Features */}
        <Features />

        {/* Usage Instructions */}
        <UsageInstructions />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-indigo-200 text-sm">
            © {new Date().getFullYear()} NetworkJo.io - כל הזכויות שמורות
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;