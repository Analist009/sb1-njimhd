import { motion } from 'framer-motion';
import { Key, ExternalLink, Shield, AlertTriangle, Check } from 'lucide-react';

export default function APIKeyInstructions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <Key className="w-6 h-6 text-indigo-400" />
        <h3 className="text-xl font-bold text-white">הנחיות להשגת מפתחות API</h3>
      </div>

      <div className="space-y-6">
        {/* OpenAI API Key */}
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            OpenAI API Key
          </h4>
          <ol className="space-y-3 text-indigo-200">
            <li className="flex items-start gap-2">
              <span className="bg-white/10 px-2 py-0.5 rounded text-sm">1</span>
              <span>היכנס ל-<a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1">OpenAI Platform <ExternalLink className="w-3 h-3" /></a></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-white/10 px-2 py-0.5 rounded text-sm">2</span>
              <span>צור חשבון חדש או התחבר לחשבון קיים</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-white/10 px-2 py-0.5 rounded text-sm">3</span>
              <span>עבור ל-<code className="bg-white/10 px-2 py-0.5 rounded">API Keys</code> בתפריט</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-white/10 px-2 py-0.5 rounded text-sm">4</span>
              <span>לחץ על "Create new secret key"</span>
            </li>
          </ol>
        </div>

        {/* Alpha Vantage API Key */}
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Alpha Vantage API Key
          </h4>
          <ol className="space-y-3 text-indigo-200">
            <li className="flex items-start gap-2">
              <span className="bg-white/10 px-2 py-0.5 rounded text-sm">1</span>
              <span>בקר ב-<a href="https://www.alphavantage.co/support/#api-key" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1">Alpha Vantage <ExternalLink className="w-3 h-3" /></a></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-white/10 px-2 py-0.5 rounded text-sm">2</span>
              <span>מלא את הטופס לקבלת מפתח API חינמי</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-white/10 px-2 py-0.5 rounded text-sm">3</span>
              <span>המפתח יישלח למייל שלך מיידית</span>
            </li>
          </ol>
        </div>

        {/* Security Notes */}
        <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h5 className="font-semibold text-white mb-2">הערות אבטחה חשובות:</h5>
              <ul className="space-y-2 text-indigo-200 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  המפתחות נשמרים מקומית בדפדפן בלבד
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  המפתחות מתאפסים אוטומטית לאחר 30 דקות
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  לעולם אל תשתף את המפתחות שלך עם אחרים
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  מומלץ להגביל את המפתחות לשימוש ספציפי
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}