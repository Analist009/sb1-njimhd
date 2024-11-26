import OpenAI from 'openai';
import type { MarketAnalysis } from '../types/analysis';
import { fetchMarketData } from './marketDataService';

export async function analyzeMarketData(
  symbol: string,
  apiKey: string,
  progressCallback?: (stage: string, progress: number) => void
): Promise<MarketAnalysis> {
  try {
    progressCallback?.('מאתחל ניתוח', 0);

    const marketData = await fetchMarketData(symbol, apiKey);
    progressCallback?.('מנתח נתוני שוק', 33);

    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
      maxRetries: 3,
      timeout: 30000
    });

    const prompt = `Analyze the following market data for ${symbol}:
      Current Price: ${marketData.price}
      Change: ${marketData.change}
      Change Percent: ${marketData.changePercent}%
      Volume: ${marketData.volume}
      
      Provide a detailed analysis including:
      1. Technical Analysis
      2. Market Sentiment
      3. Risks and Opportunities
      4. Price Targets
      
      Format the response in JSON.`;

    progressCallback?.('מבצע ניתוח AI', 66);

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');
    progressCallback?.('מעבד תוצאות', 100);

    return {
      symbol,
      currentPrice: marketData.price,
      changePercent: marketData.changePercent,
      volume: marketData.volume,
      lastUpdated: marketData.lastUpdated,
      technicalAnalysis: analysis.technicalAnalysis,
      sentiment: analysis.sentiment,
      risks: analysis.risks,
      opportunities: analysis.opportunities,
      priceTargets: analysis.priceTargets
    };
  } catch (error) {
    console.error('Error in market analysis:', error);
    if (error instanceof Error) {
      throw new Error(`שגיאה בניתוח: ${error.message}`);
    }
    throw new Error('שגיאה בניתוח השוק');
  }
}