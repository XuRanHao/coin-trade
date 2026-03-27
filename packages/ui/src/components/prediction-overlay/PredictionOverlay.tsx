export interface PredictionOverlayProps {
  lines: Array<{ id: string; values: number[] }>;
}

// 中文注释：核心逻辑说明。 (PredictionOverlay)
export function PredictionOverlay({ lines }: PredictionOverlayProps) {
  return <span>{lines.length ? "PredictionOverlay" : "-"}</span>;
}
