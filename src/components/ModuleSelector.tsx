import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Shield, Key, AlertTriangle } from 'lucide-react';
import { availableModules, validateCustomModule } from '../services/moduleService';
import type { AIModule } from '../types/modules';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface Props {
  onModuleSelect: (module: AIModule) => void;
  selectedModule?: AIModule | null;
  apiKey: string;
}

export default function ModuleSelector({ onModuleSelect, selectedModule, apiKey }: Props) {
  const [adminCode, setAdminCode] = useState('');
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleModuleSelect = async (module: AIModule) => {
    setIsValidating(true);
    setError(null);

    try {
      const moduleWithAccess = {
        ...module,
        apiKey,
        hasUnlimitedAccess: adminCode === 'EcD2443Ki0'
      };

      if (moduleWithAccess.hasUnlimitedAccess) {
        onModuleSelect(moduleWithAccess);
        return;
      }

      const isValid = await validateCustomModule(moduleWithAccess);
      
      if (isValid) {
        onModuleSelect(moduleWithAccess);
      } else {
        throw new Error('בדיקת החיבור נכשלה');
      }
    } catch (error: any) {
      if (error?.error?.code === 'insufficient_quota' || 
          error?.message?.includes('quota')) {
        setShowAdminInput(true);
        setError('חרגת ממכסת הבקשות. הזן קוד אדמין להסרת המגבלה או שדרג את החשבון שלך.');
      } else {
        setError(error instanceof Error ? error.message : 'שגיאה בבחירת המודול');
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleAdminSubmit = async () => {
    if (adminCode === 'EcD2443Ki0') {
      setError(null);
      setShowAdminInput(false);
      if (selectedModule) {
        const moduleWithUnlimitedAccess = {
          ...selectedModule,
          hasUnlimitedAccess: true
        };
        onModuleSelect(moduleWithUnlimitedAccess);
      }
    } else {
      setError('קוד אדמין שגוי');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Bot className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-bold text-white">בחר מודול AI</h2>
      </div>

      {showAdminInput && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20 mb-6"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-white">הזן קוד אדמין להסרת מגבלות</h3>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="הזן קוד אדמין"
                  icon={<Key className="w-4 h-4" />}
                />
                <Button
                  variant="primary"
                  onClick={handleAdminSubmit}
                  isLoading={isValidating}
                >
                  אישור
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/10 p-4 rounded-lg border border-red-500/20 mb-6"
        >
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableModules.map((module) => (
          <motion.button
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card text-left ${
              selectedModule?.id === module.id ? 'border-indigo-500' : ''
            }`}
            onClick={() => handleModuleSelect(module)}
            disabled={isValidating}
          >
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <h3 className="font-semibold text-white">{module.name}</h3>
              {module.isExperimental && (
                <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-full">
                  ניסיוני
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-indigo-200">{module.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {module.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="px-2 py-1 text-xs bg-white/5 text-indigo-300 rounded-full"
                >
                  {cap}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}