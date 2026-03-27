export type PredictionScenarioType = "bullish" | "neutral" | "bearish";

// 中文注释：类型定义说明。 (PredictionPoint)
export interface PredictionPoint {
  time: number;
  value: number;
}

// 中文注释：类型定义说明。 (PredictionScenario)
export interface PredictionScenario {
  id: string;
  type: PredictionScenarioType;
  label: string;
  probability: number;
  points: PredictionPoint[];
  summary?: string;
}

// 中文注释：类型定义说明。 (AssetPrediction)
export interface AssetPrediction {
  symbol: string;
  generatedAt: number;
  horizon: "1H" | "4H" | "1D";
  scenarios: PredictionScenario[];
}
