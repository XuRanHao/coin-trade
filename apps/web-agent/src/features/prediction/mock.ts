import type { AssetPrediction, PredictionPoint } from "./types";

// 中文注释：核心逻辑说明。 (projectPoints)
function projectPoints(base: PredictionPoint[], ratio: number): PredictionPoint[] {
  return base.map((point, index) => {
    const wave = 1 + Math.sin(index / 5) * 0.005;
    return {
      time: point.time + 3600,
      value: point.value * ratio * wave
    };
  });
}

// 中文注释：核心逻辑说明。 (createMockPrediction)
export function createMockPrediction(symbol: string, points: PredictionPoint[]): AssetPrediction {
  const forecastBase = points.slice(-24);
  return {
    symbol,
    generatedAt: Date.now(),
    horizon: "1H",
    scenarios: [
      {
        id: "bull",
        type: "bullish",
        label: "Bullish",
        probability: 0.35,
        points: projectPoints(forecastBase, 1.04),
        summary: "Momentum keeps positive in short window."
      },
      {
        id: "neutral",
        type: "neutral",
        label: "Neutral",
        probability: 0.45,
        points: projectPoints(forecastBase, 1.0),
        summary: "Range-bound movement around current trend."
      },
      {
        id: "bear",
        type: "bearish",
        label: "Bearish",
        probability: 0.2,
        points: projectPoints(forecastBase, 0.96),
        summary: "Pullback risk if volume weakens."
      }
    ]
  };
}
