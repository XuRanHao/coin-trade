import { colors, spacing, typography } from "@coin-platform/tokens";
import { Card } from "../card/Card";

export interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card
      style={{
        minWidth: 140
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
          fontWeight: 700
        }}
      >
        {value}
      </p>
    </Card>
  );
}
