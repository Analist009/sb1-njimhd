import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Brain, Key, Trash2, Bot } from 'lucide-react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import type { Message, ChatHistory } from '../types/chat';
import type { AIModule } from '../types/modules';
import { processAIRequest } from '../services/aiService';
import ModuleSelector from './ModuleSelector';
import APIKeyInput from './APIKeyInput';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import MarketAnalysis from './analysis/MarketAnalysis';

export default function AIChat() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useSessionStorage<string>('openai_api_key', '');
  const [selectedModule, setSelectedModule] = useSessionStorage<AIModule | null>('selected_module', null);
  const [showModuleSelector, setShowModuleSelector] = useState(!selectedModule);
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);
  const [chatHistory, setChatHistory] = useSessionStorage<ChatHistory>('chat_history', {
    messages: [],
    context: ''
  });
  const [currentProgress, setCurrentProgress] = useState<{ stage: string; progress: number } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory.messages]);

  const handleModuleSelect = (module: AIModule) => {
    setSelectedModule(module);
    setShowModuleSelector(false);
  };

  const handleKeySubmit = (key: string, hasUnlimitedAccess: boolean) => {
    setApiKey(key);
    setShowKeyInput(false);
    if (!selectedModule) {
      setShowModuleSelector(true);
    }
  };

  const addMessage = (content: string, role: 'user' | 'assistant', analysis?: any) => {
    setChatHistory(prev => ({
      ...prev,
      messages: [...prev.messages, {
        id: Date.now().toString(),
        content,
        role,
        timestamp: Date.now(),
        analysis
      }]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !apiKey || !selectedModule) return;

    const userMessage = message.trim();
    setMessage('');
    addMessage(userMessage, 'user');
    setIsLoading(true);
    setCurrentProgress({ stage: 'מאתחל', progress: 0 });

    try {
      const response = await processAIRequest(
        userMessage,
        apiKey,
        selectedModule.id,
        (stage, progress) => {
          setCurrentProgress({ stage, progress });
        }
      );

      addMessage(response.message, 'assistant', response.analysis);

      if (response.context) {
        setChatHistory(prev => ({
          ...prev,
          context: response.context
        }));
      }
    } catch (error) {
      addMessage(
        error instanceof Error ? error.message : 'שגיאה בעיבוד הבקשה',
        'assistant'
      );
    } finally {
      setIsLoading(false);
      setCurrentProgress(null);
    }
  };

  if (showKeyInput) {
    return <APIKeyInput onSubmit={handleKeySubmit} />;
  }

  if (showModuleSelector) {
    return (
      <ModuleSelector
        onModuleSelect={handleModuleSelect}
        selectedModule={selectedModule}
        apiKey={apiKey}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">
            {selectedModule?.name || 'העוזר החכם שלך'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowModuleSelector(true)}
            title="החלף מודול"
          >
            <Brain className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowKeyInput(true)}
            title="שנה מפתח API"
          >
            <Key className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      {currentProgress && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-4 bg-white/5 rounded-lg p-3"
        >
          <div className="flex items-center gap-3">
            <div className="text-sm text-indigo-200">{currentProgress.stage}</div>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${currentProgress.progress}%` }}
              />
            </div>
            <div className="text-sm text-indigo-200">
              {currentProgress.progress}%
            </div>
          </div>
        </motion.div>
      )}

      {/* Messages */}
      <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {chatHistory.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`relative p-4 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 mr-8'
                  : 'bg-white/5 ml-8'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <p className="text-indigo-100">{msg.content}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setChatHistory(prev => ({
                      ...prev,
                      messages: prev.messages.filter(m => m.id !== msg.id)
                    }));
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {msg.analysis && <MarketAnalysis analysis={msg.analysis} />}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="הקלד את סמל המניה לניתוח..."
          className="pr-12"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="primary"
          size="icon"
          className="absolute left-1 top-1"
          disabled={isLoading || !message.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>

      {isLoading && !currentProgress && (
        <div className="flex justify-center py-4">
          <div className="animate-pulse flex space-x-2">
            <div className="w-2 h-2 bg-indigo-300 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-300 rounded-full animation-delay-200"></div>
            <div className="w-2 h-2 bg-indigo-300 rounded-full animation-delay-400"></div>
          </div>
        </div>
      )}
    </motion.div>
  );
}