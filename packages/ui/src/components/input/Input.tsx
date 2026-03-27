import { colors, radius, spacing, typography } from "@coin-platform/tokens";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        height: 40,
        padding: `0 ${spacing.md}px`,
        borderRadius: radius.md,
        border: `1px solid ${colors.borderSubtle}`,
        background: colors.surfacePrimary,
        color: colors.textPrimary,
        fontFamily: typography.fontFamily,
        ...props.style
      }}
    />
  );
}
