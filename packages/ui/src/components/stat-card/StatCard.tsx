import { colors, radius, spacing, typography } from "@coin-platform/tokens";

// 中文注释：类型定义说明。 (StatCardProps)
export interface StatCardProps {
  label: string;
  value: string;
}

// 中文注释：核心逻辑说明。 (StatCard)
export function StatCard({ label, value }: StatCardProps) {
  return (
    <article
      style={{
        minWidth: 160,
        background: colors.surfaceTertiary,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: radius.md,
        padding: spacing.lg
      }}
    >
      <p
        style={{
          margin: 0,
          color: colors.textSecondary,
          fontFamily: typography.fontFamily,
          fontSize: typography.size.xs
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: `${spacing.sm}px 0 0`,
          color: colors.textPrimary,
          fontFamily: typography.monoFamily,
          fontWeight: 700,
          fontSize: typography.size.md
        }}
      >
        {value}
      </p>
    </article>
  );
}
