import OpenAI from 'openai';
import { fetchMarketData, fetchIntradayData } from './marketDataService';
import type { MarketAnalysis } from '../types/market';

export async function processAIRequest(
  symbol: string,
  apiKey: string,
  moduleId: string,
  progressCallback?: (stage: string, progress: number) => void
): Promise<{
  message: string;
  analysis?: MarketAnalysis;
  context?: string;
}> {
  try {
    progressCallback?.('מאתחל ניתוח', 0);

    // Fetch market data
    const marketData = await fetchMarketData(symbol);
    progressCallback?.('מנתח נתוני שוק', 25);

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });

    // Prepare analysis prompt
    const analysisPrompt = `Analyze the following stock data for ${symbol}:
    Current Price: ${marketData.price}
    Change: ${marketData.change}
    Change Percent: ${marketData.changePercent}%
    Volume: ${marketData.volume}
    
    Provide a comprehensive analysis including:
    1. Technical Analysis (trend, support/resistance, indicators)
    2. Market Sentiment
    3. Risks and Opportunities
    4. Price Targets
    
    Format the response in JSON with the following structure:
    {
      "technicalAnalysis": {
        "trend": string,
        "indicators": {
          "rsi": number,
          "macd": { "value": number, "signal": number, "histogram": number }
        }
      },
      "sentiment": {
        "score": number,
        "signals": string[]
      },
      "risks": [{ "type": string, "description": string, "severity": number }],
      "opportunities": [{ "type": string, "description": string, "potential": number }],
      "priceTargets": {
        "low": number,
        "medium": number,
        "high": number
      }
    }`;

    progressCallback?.('מבצע ניתוח AI', 50);

    // Get AI analysis
    const completion = await openai.chat.completions.create({
      model: moduleId,
      messages: [{ role: "user", content: analysisPrompt }],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    progressCallback?.('מעבד תוצאות', 75);

    const analysisResult = JSON.parse(completion.choices[0].message.content || '{}');

    // Prepare final analysis
    const analysis: MarketAnalysis = {
      symbol,
      currentPrice: marketData.price,
      changePercent: marketData.changePercent,
      volume: marketData.volume,
      lastUpdated: marketData.lastUpdated,
      technicalAnalysis: analysisResult.technicalAnalysis,
      sentiment: analysisResult.sentiment,
      risks: analysisResult.risks,
      opportunities: analysisResult.opportunities,
      priceTargets: analysisResult.priceTargets
    };

    progressCallback?.('מסיים', 100);

    // Generate summary message
    const summaryMessage = `ניתוח מניית ${symbol}:

מחיר נוכחי: ₪${marketData.price.toFixed(2)}
שינוי יומי: ${marketData.changePercent > 0 ? '+' : ''}${marketData.changePercent.toFixed(2)}%

מגמה טכנית: ${analysis.technicalAnalysis.trend}
סנטימנט שוק: ${analysis.sentiment.score > 0 ? 'חיובי' : 'שלילי'}

יעדי מחיר:
• נמוך: ₪${analysis.priceTargets.low.toFixed(2)}
• בינוני: ₪${analysis.priceTargets.medium.toFixed(2)}
• גבוה: ₪${analysis.priceTargets.high.toFixed(2)}`;

    return {
      message: summaryMessage,
      analysis,
      context: JSON.stringify(analysis)
    };

  } catch (error) {
    console.error('Error in AI request:', error);
    if (error instanceof Error) {
      throw new Error(`שגיאה בניתוח: ${error.message}`);
    }
    throw new Error('שגיאה בניתוח המניה');
  }
}