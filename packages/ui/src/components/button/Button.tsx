import { colors, radius, spacing, typography } from "@coin-platform/tokens";
import clsx from "clsx";
import type { ButtonHTMLAttributes, CSSProperties, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

// 中文注释：类型定义说明。 (ButtonProps)
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

// 中文注释：映射配置说明。
const sizeMap: Record<ButtonSize, CSSProperties> = {
  sm: { height: 32, fontSize: 13, padding: `0 ${spacing.md}px` },
  md: { height: 40, fontSize: 14, padding: `0 ${spacing.lg}px` },
  lg: { height: 48, fontSize: 16, padding: `0 ${spacing.xl}px` }
};

// 中文注释：映射配置说明。
const variantMap: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: colors.accent,
    color: colors.accentText,
    border: "none"
  },
  secondary: {
    background: colors.surfaceTertiary,
    color: colors.textPrimary,
    border: `1px solid ${colors.borderSubtle}`
  },
  ghost: {
    background: "transparent",
    color: colors.textPrimary,
    border: `1px solid ${colors.borderSubtle}`
  },
  danger: {
    background: colors.priceDown,
    color: "#fff",
    border: "none"
  }
};

// 中文注释：核心逻辑说明。 (Button)
export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  style,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const isDisabled = loading || disabled;
  return (
    <button
      className={clsx("cp-button", className)}
      disabled={isDisabled}
      style={{
        borderRadius: radius.md,
        cursor: isDisabled ? "not-allowed" : "pointer",
        fontFamily: typography.fontFamily,
        fontWeight: 600,
        opacity: isDisabled ? 0.7 : 1,
        transition: "all 0.2s ease",
        ...sizeMap[size],
        ...variantMap[variant],
        ...style
      }}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
