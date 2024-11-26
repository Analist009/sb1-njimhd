import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Shield, AlertTriangle, ExternalLink, Check } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { validateAPIKey } from '../services/marketDataService';

interface Props {
  onSubmit: (key: string, hasUnlimitedAccess: boolean) => void;
}

export default function APIKeyInput({ onSubmit }: Props) {
  const [apiKey, setApiKey] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsValidating(true);

    try {
      if (!apiKey.trim()) {
        throw new Error('נא להזין מפתח API');
      }

      if (!apiKey.startsWith('sk-')) {
        throw new Error('פורמט מפתח API לא תקין. המפתח חייב להתחיל ב-sk-');
      }

      const isValid = await validateAPIKey(apiKey);
      if (!isValid) {
        throw new Error('מפתח API לא תקין');
      }

      const hasUnlimitedAccess = adminCode === 'EcD2443Ki0';
      onSubmit(apiKey, hasUnlimitedAccess);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('quota')) {
          setShowAdminInput(true);
          setError('חרגת ממכסת הבקשות. הזן קוד אדמין להסרת המגבלה או שדרג את החשבון שלך.');
        } else {
          setError(error.message);
        }
      } else {
        setError('שגיאה באימות המפתח');
      }
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 max-w-md mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <Key className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-bold text-white">הזנת מפתח OpenAI API</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setError(null);
            }}
            placeholder="הזן את מפתח ה-API שלך (sk-...)"
            error={error}
            icon={<Key className="w-4 h-4" />}
          />
          <p className="mt-2 text-sm text-indigo-200">
            המפתח יישמר מקומית למשך 30 דקות בלבד
          </p>
        </div>

        {showAdminInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2"
          >
            <Input
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="הזן קוד אדמין להסרת מגבלות"
              icon={<Shield className="w-4 h-4" />}
            />
            <p className="text-sm text-indigo-200">
              קוד אדמין מאפשר שימוש ללא מגבלת בקשות
            </p>
          </motion.div>
        )}

        {/* API Key Instructions */}
        <div className="bg-indigo-500/10 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-2">איך להשיג מפתח API?</h3>
          <ol className="text-sm text-indigo-200 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">1</span>
              <span>היכנס ל-
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
                >
                  OpenAI Platform <ExternalLink className="w-3 h-3" />
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">2</span>
              <span>לחץ על "Create new secret key"</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">3</span>
              <span>העתק את המפתח והדבק אותו כאן</span>
            </li>
          </ol>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isValidating}
          disabled={!apiKey.trim() || isValidating}
        >
          {isValidating ? 'מאמת מפתח...' : 'המשך'}
        </Button>

        {/* Security Notes */}
        <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-white font-medium mb-1">חשוב לדעת:</p>
              <ul className="text-indigo-200 space-y-1">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  המפתח נשמר באופן מאובטח בדפדפן בלבד
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  המפתח מתאפס אוטומטית לאחר 30 דקות
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  לעולם אל תשתף את המפתח שלך עם אחרים
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}