import { colors, radius, spacing, typography } from "@coin-platform/tokens";

export type LanguageValue = "zh" | "en";

// 中文注释：类型定义说明。 (LanguageSwitcherProps)
export interface LanguageSwitcherProps {
  value: LanguageValue;
  onChange: (value: LanguageValue) => void;
}

// 中文注释：核心逻辑说明。 (LanguageSwitcher)
export function LanguageSwitcher({ value, onChange }: LanguageSwitcherProps) {
  const items: Array<{ label: string; value: LanguageValue }> = [
    { label: "中", value: "zh" },
    { label: "EN", value: "en" }
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
              minWidth: 36,
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
