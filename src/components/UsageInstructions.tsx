import { motion } from 'framer-motion';
import { Command, MessageSquare, Key, Bot, ChevronRight, ExternalLink } from 'lucide-react';

const steps = [
  {
    icon: Key,
    title: 'השגת מפתח OpenAI API',
    description: 'גש ל-platform.openai.com והירשם לחשבון. לאחר ההרשמה, צור מפתח API חדש תחת "API Keys".',
    link: 'https://platform.openai.com/account/api-keys'
  },
  {
    icon: MessageSquare,
    title: 'הזנת המפתח',
    description: 'הכנס את מפתח ה-API שיצרת. המפתח מאובטח ונשמר מקומית למשך 30 דקות בלבד.'
  },
  {
    icon: Bot,
    title: 'ניתוח מניות',
    description: 'הקלד את סמל המניה שברצונך לנתח. המערכת תספק ניתוח מקיף בזמן אמת.'
  },
  {
    icon: Command,
    title: 'קבלת תוצאות',
    description: 'צפה בניתוח הטכני, הפונדמנטלי והסנטימנט של המניה עם גרפים ותובנות מתקדמות.'
  }
];

export default function UsageInstructions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Command className="w-5 h-5 text-indigo-400" />
        הוראות שימוש במערכת
      </h3>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-1.5">
              <step.icon className="w-full h-full text-white" />
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <ChevronRight className="w-4 h-4 text-indigo-400" />
                <h4 className="font-semibold text-white">{step.title}</h4>
              </div>
              <p className="text-indigo-200 text-sm">{step.description}</p>
              {step.link && (
                <a
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>קישור להשגת מפתח</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <Key className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h5 className="font-semibold text-white mb-1">חשוב לדעת:</h5>
            <ul className="text-indigo-200 text-sm space-y-1">
              <li>• המפתח נשמר באופן מאובטח בדפדפן שלך בלבד</li>
              <li>• המפתח מתאפס אוטומטית לאחר 30 דקות מטעמי אבטחה</li>
              <li>• לעולם אל תשתף את המפתח שלך עם אחרים</li>
              <li>• מומלץ להגביל את המפתח לשימוש ספציפי בפלטפורמת OpenAI</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}