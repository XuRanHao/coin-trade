import { colors, spacing, typography } from "@coin-platform/tokens";
import { useEffect, useMemo, useState } from "react";

export interface TokenIdentityProps {
  symbol: string;
  name: string;
  iconUrl?: string | null;
  size?: number;
}

function getJsDelivrIconUrl(symbol: string): string {
  return `https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/128/color/${encodeURIComponent(symbol.toLowerCase())}.png`;
}

function normalizeText(value: string): string {
  return value.trim().toUpperCase();
}

// 中文注释：币种身份信息组件，统一渲染图标、Symbol 和名称。
export function TokenIdentity({ symbol, name, iconUrl = null, size = 32 }: TokenIdentityProps) {
  const normalizedSymbol = normalizeText(symbol);
  const normalizedName = normalizeText(name);
  const displayName = name.trim();
  const showName = displayName.length > 0 && normalizedName !== normalizedSymbol;

  const iconCandidates = useMemo(() => {
    const candidates = [iconUrl, getJsDelivrIconUrl(symbol)];
    const result: string[] = [];

    for (const item of candidates) {
      const normalized = item?.trim();
      if (!normalized) continue;
      if (result.includes(normalized)) continue;
      result.push(normalized);
    }

    return result;
  }, [iconUrl, symbol]);

  const [iconIndex, setIconIndex] = useState(0);
  useEffect(() => {
    setIconIndex(0);
  }, [iconCandidates]);

  const currentIconUrl = iconCandidates[iconIndex] ?? null;
  const showImage = Boolean(currentIconUrl);
  const fallbackText = normalizedSymbol.slice(0, 1);

  const handleImageError = () => {
    if (iconIndex < iconCandidates.length - 1) {
      setIconIndex((previous) => previous + 1);
      return;
    }

    setIconIndex(iconCandidates.length);
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.sm,
        minWidth: 0
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 9999,
          overflow: "hidden",
          flexShrink: 0,
          border: `1px solid ${colors.borderSubtle}`,
          background: colors.surfaceTertiary,
          display: "grid",
          placeItems: "center"
        }}
      >
        {showImage ? (
          <img
            src={currentIconUrl ?? undefined}
            alt={`${symbol} icon`}
            width={size}
            height={size}
            onError={handleImageError}
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span
            style={{
              color: colors.textSecondary,
              fontFamily: typography.fontFamily,
              fontWeight: 700,
              fontSize: typography.size.xs
            }}
          >
            {fallbackText}
          </span>
        )}
      </div>

      <span
        style={{
          display: "inline-flex",
          alignItems: "baseline",
          gap: spacing.xs,
          minWidth: 0
        }}
      >
        <strong
          style={{
            color: colors.textPrimary,
            fontSize: typography.size.lg,
            fontWeight: 700
          }}
        >
          {symbol}
        </strong>
        {showName ? (
          <span
            style={{
              color: colors.textSecondary,
              fontSize: typography.size.lg,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
          >
            {displayName}
          </span>
        ) : null}
      </span>
    </div>
  );
}
