import axios from 'axios';
import type { MarketData } from '../types/market';

const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';
const OPENAI_API_URL = 'https://api.openai.com/v1';

export async function validateAPIKey(apiKey: string): Promise<boolean> {
  try {
    const response = await axios.get(`${OPENAI_API_URL}/models`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return response.status === 200;
  } catch (error) {
    console.error('Error validating API key:', error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('מפתח API לא תקין');
    } else if (axios.isAxiosError(error) && error.response?.status === 429) {
      throw new Error('חרגת ממכסת הבקשות. אנא שדרג את החשבון שלך או המתן לחידוש המכסה');
    }
    throw new Error('שגיאה באימות המפתח');
  }
}

export async function fetchMarketData(symbol: string): Promise<MarketData> {
  try {
    const response = await axios.get(`${ALPHA_VANTAGE_BASE_URL}`, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY
      }
    });

    const data = response.data['Global Quote'];
    if (!data) {
      throw new Error('לא נמצאו נתונים עבור הסמל המבוקש');
    }

    return {
      symbol: data['01. symbol'],
      price: parseFloat(data['05. price']),
      change: parseFloat(data['09. change']),
      changePercent: parseFloat(data['10. change percent'].replace('%', '')),
      volume: parseInt(data['06. volume']),
      lastUpdated: data['07. latest trading day']
    };
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw new Error('שגיאה בקבלת נתוני שוק');
  }
}

// Add rate limiting and caching
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const rateLimiter = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const requests = rateLimiter.get(key) || [];
  
  // Remove old requests
  const validRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  rateLimiter.set(key, validRequests);

  return validRequests.length >= MAX_REQUESTS;
}

function updateRateLimit(key: string) {
  const requests = rateLimiter.get(key) || [];
  requests.push(Date.now());
  rateLimiter.set(key, requests);
}

export async function getCachedMarketData(symbol: string): Promise<MarketData> {
  const cacheKey = `market-${symbol}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  if (isRateLimited(symbol)) {
    throw new Error('נא המתן מספר שניות לפני ביצוע בקשה נוספת');
  }

  const data = await fetchMarketData(symbol);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  updateRateLimit(symbol);

  return data;
}