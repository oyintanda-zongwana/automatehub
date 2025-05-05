export const AI_CONFIG = {
  apiKey: import.meta.env.VITE_DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope-intl.aliyuncs.com/api/v1',
  defaultModel: 'qwen-plus',
  maxTokens: 2000,
  temperature: 0.7
}; 