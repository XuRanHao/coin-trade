export type PredictionScenarioType = "bullish" | "neutral" | "bearish";

export interface PredictionPoint {
  time: number;
  value: number;
}

export interface PredictionScenario {
  id: string;
  type: PredictionScenarioType;
  label: string;
  probability: number;
  points: PredictionPoint[];
  summary?: string;
}

export interface AssetPrediction {
  symbol: string;
  generatedAt: number;
  horizon: "1H" | "4H" | "1D";
  scenarios: PredictionScenario[];
}
