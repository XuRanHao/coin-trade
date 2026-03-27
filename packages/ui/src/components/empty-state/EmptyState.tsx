import { colors, spacing, typography } from "@coin-platform/tokens";
import type { ReactNode } from "react";

// 中文注释：类型定义说明。 (EmptyStateProps)
export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

// 中文注释：核心逻辑说明。 (EmptyState)
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: `${spacing.xxl}px ${spacing.lg}px`,
        color: colors.textSecondary,
        fontFamily: typography.fontFamily
      }}
    >
      <p style={{ color: colors.textPrimary, margin: 0, fontSize: typography.size.md }}>{title}</p>
      {description ? <p style={{ marginTop: spacing.sm }}>{description}</p> : null}
      {action ? <div style={{ marginTop: spacing.lg }}>{action}</div> : null}
    </div>
  );
}
