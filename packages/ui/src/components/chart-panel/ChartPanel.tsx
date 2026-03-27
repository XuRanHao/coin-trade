import { colors, spacing, typography } from "@coin-platform/tokens";
import type { PropsWithChildren, ReactNode } from "react";
import { Card } from "../card/Card";

// 中文注释：类型定义说明。 (ChartPanelProps)
export interface ChartPanelProps {
  title: string;
  extra?: ReactNode;
}

// 中文注释：核心逻辑说明。 (ChartPanel)
export function ChartPanel({ title, extra, children }: PropsWithChildren<ChartPanelProps>) {
  return (
    <Card>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.lg,
          paddingBottom: spacing.md,
          borderBottom: `1px solid ${colors.borderSubtle}`
        }}
      >
        <h3
          style={{
            margin: 0,
            color: colors.textPrimary,
            fontFamily: typography.fontFamily,
            fontSize: typography.size.md,
            fontWeight: 600,
            letterSpacing: 0.2
          }}
        >
          {title}
        </h3>
        <div style={{ color: colors.textSecondary, fontSize: typography.size.sm }}>{extra}</div>
      </header>
      {children}
    </Card>
  );
}
