import { colors, radius, spacing, typography } from "@coin-platform/tokens";
import type { PropsWithChildren } from "react";

export interface BadgeProps {
  tone?: "default" | "success" | "danger" | "warning";
}

const toneMap: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: colors.surfaceSecondary,
  success: colors.predictionBullish,
  danger: colors.predictionBearish,
  warning: colors.predictionNeutral
};

export function Badge({ tone = "default", children }: PropsWithChildren<BadgeProps>) {
  return (
    <span
      style={{
        display: "inline-block",
        borderRadius: radius.md,
        background: toneMap[tone],
        color: tone === "default" ? colors.textPrimary : "#06281f",
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
