import { motion } from 'framer-motion';
import { Brain, Zap, Lock, Globe, Bot, BarChart2, Network, Cpu, Database, Code, Cloud, Workflow } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Deep Learning מתקדם',
    description: 'מערכות למידה עמוקה המשלבות רשתות נוירונים מתקדמות ואלגוריתמי AI חדשניים',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Database,
    title: 'Big Data & Analytics',
    description: 'עיבוד וניתוח מידע בזמן אמת באמצעות אלגוריתמי Machine Learning מתקדמים',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Network,
    title: 'Neural Networks',
    description: 'רשתות נוירונים עמוקות לניתוח מגמות וחיזוי מבוסס AI',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Bot,
    title: 'Natural Language Processing',
    description: 'עיבוד שפה טבעית מתקדם עם מודלי Transformer ו-BERT',
    color: 'from-orange-500 to-amber-500'
  },
  {
    icon: Workflow,
    title: 'AutoML & MLOps',
    description: 'אוטומציה של תהליכי למידת מכונה ופריסת מודלים חכמים',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Cloud,
    title: 'AI Cloud Infrastructure',
    description: 'תשתית ענן מתקדמת לעיבוד מבוזר ואופטימיזציה של מודלי AI',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Code,
    title: 'Computer Vision',
    description: 'מערכות ראייה ממוחשבת מבוססות CNN ו-Deep Learning',
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: BarChart2,
    title: 'Predictive Analytics',
    description: 'חיזוי וניתוח מגמות באמצעות אלגוריתמי ML מתקדמים',
    color: 'from-green-500 to-emerald-500'
  }
];

export default function Features() {
  return (
    <div className="py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-4">
          טכנולוגיות AI מתקדמות
        </h2>
        <p className="text-indigo-200 text-lg max-w-3xl mx-auto">
          פתרונות AI חדשניים המשלבים Deep Learning, Machine Learning, ורשתות נוירונים מתקדמות
          לניתוח נתונים חכם ואוטומציה מתקדמת
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl"
                 style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
            />
            <div className="relative bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-2.5 mb-4`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-indigo-200 text-sm">{feature.description}</p>
              
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
          <Bot className="w-5 h-5 text-indigo-300" />
          <span className="text-indigo-200 text-sm">
            מופעל על ידי טכנולוגיות Deep Learning ו-Neural Networks מתקדמות
          </span>
        </div>
      </motion.div>
    </div>
  );
}