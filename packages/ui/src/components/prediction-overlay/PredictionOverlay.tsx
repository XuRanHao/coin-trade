export interface PredictionOverlayProps {
  lines: Array<{ id: string; values: number[] }>;
}

export function PredictionOverlay({ lines }: PredictionOverlayProps) {
  return <span>{lines.length ? "PredictionOverlay" : "-"}</span>;
}
