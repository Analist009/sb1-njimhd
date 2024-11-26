export interface AIModule {
  id: string;
  name: string;
  description: string;
  type: 'language' | 'vision' | 'audio' | 'multimodal';
  capabilities: string[];
  maxTokens: number;
  isExperimental: boolean;
  apiKey?: string;
  endpoint?: string;
  customConfig?: Record<string, any>;
  hasUnlimitedAccess?: boolean;
}