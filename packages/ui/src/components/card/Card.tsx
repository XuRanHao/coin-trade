import { colors, radius, shadows, spacing } from "@coin-platform/tokens";
import type { HTMLAttributes, PropsWithChildren } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ children, style, ...rest }: PropsWithChildren<CardProps>) {
  return (
    <section
      style={{
        background: colors.surfaceSecondary,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: radius.lg,
        boxShadow: shadows.sm,
        padding: spacing.lg,
        ...style
      }}
      {...rest}
    >
      {children}
    </section>
  );
}
