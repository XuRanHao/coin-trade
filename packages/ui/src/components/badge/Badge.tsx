import { colors, radius, spacing, typography } from "@coin-platform/tokens";
import type { PropsWithChildren } from "react";

// 中文注释：类型定义说明。 (BadgeProps)
export interface BadgeProps {
  tone?: "default" | "success" | "danger" | "warning";
}

// 中文注释：映射配置说明。
const toneMap: Record<
  NonNullable<BadgeProps["tone"]>,
  {
    background: string;
    color: string;
    border?: string;
  }
> = {
  default: {
    background: colors.surfaceTertiary,
    color: colors.textPrimary,
    border: `1px solid ${colors.borderSubtle}`
  },
  success: { background: colors.predictionBullish, color: "#051f16" },
  danger: { background: colors.predictionBearish, color: "#fff" },
  warning: { background: colors.predictionNeutral, color: colors.accentText }
};

// 中文注释：核心逻辑说明。 (Badge)
export function Badge({ tone = "default", children }: PropsWithChildren<BadgeProps>) {
  const palette = toneMap[tone];
  return (
    <span
      style={{
        display: "inline-block",
        borderRadius: radius.sm,
        background: palette.background,
        color: palette.color,
        border: palette.border,
        padding: `${spacing.xs}px ${spacing.sm}px`,
        fontFamily: typography.fontFamily,
        fontSize: typography.size.xs,
        fontWeight: 700
      }}
    >
      {children}
    </span>
  );
}
