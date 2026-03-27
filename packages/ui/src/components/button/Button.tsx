import { colors, radius, spacing, typography } from "@coin-platform/tokens";
import clsx from "clsx";
import type { ButtonHTMLAttributes, CSSProperties, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const sizeMap: Record<ButtonSize, CSSProperties> = {
  sm: { height: 32, fontSize: 13, padding: `0 ${spacing.md}px` },
  md: { height: 40, fontSize: 14, padding: `0 ${spacing.lg}px` },
  lg: { height: 48, fontSize: 16, padding: `0 ${spacing.xl}px` }
};

const variantMap: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: colors.accent,
    color: "#052025",
    border: "none"
  },
  secondary: {
    background: colors.surfaceSecondary,
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
