import { colors, radius, spacing, typography } from "@coin-platform/tokens";
import type { CSSProperties } from "react";
import { Input } from "../input/Input";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}

// 中文注释：通用搜索输入框，支持清空动作。
export function SearchInput({ value, onChange, placeholder, onClear, disabled, style }: SearchInputProps) {
  const showClear = value.length > 0;

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        ...style
      }}
    >
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        style={{
          paddingRight: showClear ? 44 : spacing.md
        }}
      />

      {showClear ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          style={{
            position: "absolute",
            right: spacing.sm,
            top: "50%",
            transform: "translateY(-50%)",
            border: `1px solid ${colors.borderSubtle}`,
            background: colors.surfaceSecondary,
            color: colors.textSecondary,
            borderRadius: radius.sm,
            height: 24,
            minWidth: 24,
            padding: "0 6px",
            cursor: "pointer",
            fontFamily: typography.fontFamily,
            fontSize: typography.size.xs
          }}
        >
          CLR
        </button>
      ) : null}
    </div>
  );
}
