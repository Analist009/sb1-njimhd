import OpenAI from 'openai';
import type { AIModule } from '../types/modules';

export const availableModules: AIModule[] = [
  {
    id: 'gpt-4-turbo-preview',
    name: 'GPT-4 Turbo',
    description: 'המודל המתקדם ביותר של OpenAI',
    type: 'language',
    capabilities: ['market_analysis', 'sentiment_analysis', 'technical_analysis'],
    maxTokens: 4096,
    isExperimental: false
  },
  {
    id: 'gpt-4-1106-preview',
    name: 'GPT-4 Preview',
    description: 'גרסת בטא עם יכולות מתקדמות',
    type: 'language',
    capabilities: ['market_analysis', 'sentiment_analysis'],
    maxTokens: 4096,
    isExperimental: true
  }
];

export async function validateCustomModule(moduleConfig: Partial<AIModule>): Promise<boolean> {
  try {
    if (!moduleConfig.apiKey) {
      throw new Error('API key is required');
    }

    // If module has unlimited access, skip validation
    if (moduleConfig.hasUnlimitedAccess) {
      return true;
    }

    const openai = new OpenAI({
      apiKey: moduleConfig.apiKey,
      dangerouslyAllowBrowser: true
    });

    // Use a minimal test request
    const response = await openai.chat.completions.create({
      model: moduleConfig.id || 'gpt-4',
      messages: [{ role: 'user', content: 'Test connection' }],
      max_tokens: 1
    });

    return response.choices.length > 0;
  } catch (error: any) {
    console.error('Error validating module:', error);
    
    // Handle rate limit specifically
    if (error?.error?.code === 'insufficient_quota' || 
        error?.message?.includes('quota')) {
      throw error;
    }
    
    return false;
  }
}

export async function testModuleConnection(moduleId: string, apiKey: string): Promise<boolean> {
  try {
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });

    const response = await openai.chat.completions.create({
      model: moduleId,
      messages: [{ role: 'user', content: 'Test connection' }],
      max_tokens: 1
    });

    return response.choices.length > 0;
  } catch (error: any) {
    console.error('Error testing module connection:', error);
    
    if (error?.error?.code === 'insufficient_quota' || 
        error?.message?.includes('quota')) {
      throw error;
    }
    
    return false;
  }
}