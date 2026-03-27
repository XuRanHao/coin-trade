import { colors, radius } from "@coin-platform/tokens";

export interface SkeletonProps {
  width?: number | string;
  height?: number;
}

export function Skeleton({ width = "100%", height = 16 }: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius.sm,
        background: `linear-gradient(90deg, ${colors.surfaceSecondary} 25%, ${colors.borderSubtle} 37%, ${colors.surfaceSecondary} 63%)`,
        backgroundSize: "400% 100%"
      }}
    />
  );
}
