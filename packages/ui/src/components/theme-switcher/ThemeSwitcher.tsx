import { colors, radius, spacing, typography } from "@coin-platform/tokens";

export type ThemeValue = "dark" | "light";

// 中文注释：类型定义说明。 (ThemeSwitcherProps)
export interface ThemeSwitcherProps {
  value: ThemeValue;
  onChange: (value: ThemeValue) => void;
}

// 中文注释：核心逻辑说明。 (ThemeSwitcher)
export function ThemeSwitcher({ value, onChange }: ThemeSwitcherProps) {
  const items: Array<{ label: string; value: ThemeValue }> = [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" }
  ];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: 2,
        gap: 2,
        borderRadius: radius.sm,
        border: `1px solid ${colors.borderSubtle}`,
        background: colors.surfaceTertiary
      }}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            style={{
              minWidth: 54,
              height: 28,
              padding: `0 ${spacing.sm}px`,
              border: "none",
              borderRadius: radius.sm,
              cursor: "pointer",
              fontFamily: typography.fontFamily,
              fontSize: typography.size.xs,
              fontWeight: 600,
              color: active ? colors.accentText : colors.textSecondary,
              background: active ? colors.accent : "transparent"
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
