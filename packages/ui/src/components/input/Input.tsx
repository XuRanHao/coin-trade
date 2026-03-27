import { colors, radius, spacing, typography } from "@coin-platform/tokens";
import { useState } from "react";
import type { FocusEvent, InputHTMLAttributes } from "react";

// 中文注释：类型定义说明。 (InputProps)
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

// 中文注释：核心逻辑说明。 (Input)
export function Input({ onFocus, onBlur, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <input
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        width: "100%",
        height: 44,
        padding: `0 ${spacing.md}px`,
        borderRadius: radius.md,
        border: `1px solid ${focused ? colors.accent : colors.borderSubtle}`,
        background: colors.surfaceTertiary,
        color: colors.textPrimary,
        fontFamily: typography.fontFamily,
        outline: "none",
        transition: "border-color 0.18s ease",
        ...props.style
      }}
    />
  );
}
