import { colors, spacing, typography } from "@coin-platform/tokens";
import type { PropsWithChildren, ReactNode } from "react";
import { Card } from "../card/Card";

export interface ChartPanelProps {
  title: string;
  extra?: ReactNode;
}

export function ChartPanel({ title, extra, children }: PropsWithChildren<ChartPanelProps>) {
  return (
    <Card>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.lg
        }}
      >
        <h3
          style={{
            margin: 0,
            color: colors.textPrimary,
            fontFamily: typography.fontFamily,
            fontSize: typography.size.lg
          }}
        >
          {title}
        </h3>
        <div>{extra}</div>
      </header>
      {children}
    </Card>
  );
}
