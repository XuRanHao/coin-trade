import { colors, radius, spacing } from "@coin-platform/tokens";
import type { HTMLAttributes, PropsWithChildren } from "react";

// 中文注释：类型定义说明。 (CardProps)
export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

// 中文注释：核心逻辑说明。 (Card)
export function Card({ children, style, ...rest }: PropsWithChildren<CardProps>) {
  return (
    <section
      style={{
        background: colors.surfaceSecondary,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: radius.md,
        boxShadow: "none",
        padding: spacing.lg,
        ...style
      }}
      {...rest}
    >
      {children}
    </section>
  );
}
