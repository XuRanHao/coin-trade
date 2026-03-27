import { colors, radius, spacing, typography } from "@coin-platform/tokens";
import type { ReactNode } from "react";

// 中文注释：类型定义说明。 (TabItem)
export interface TabItem<T extends string> {
  label: ReactNode;
  value: T;
}

// 中文注释：类型定义说明。 (TabsProps)
export interface TabsProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
}

// 中文注释：核心逻辑说明。 (Tabs)
export function Tabs<T extends string>({ items, value, onChange }: TabsProps<T>) {
  return (
    <div
      style={{
        display: "inline-flex",
        gap: spacing.xs,
        padding: spacing.xs,
        background: colors.surfaceSecondary,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: radius.md
      }}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            style={{
              border: "none",
              cursor: "pointer",
              borderRadius: radius.md,
              padding: `${spacing.xs}px ${spacing.md}px`,
              background: active ? colors.accent : "transparent",
              color: active ? colors.accentText : colors.textSecondary,
              fontFamily: typography.fontFamily,
              fontWeight: 600
            }}
            type="button"
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
