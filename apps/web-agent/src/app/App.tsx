import { colors, radius, spacing, typography } from "@coin-platform/tokens";
import { LanguageSwitcher, ThemeSwitcher } from "@coin-platform/ui";
import type { CSSProperties } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { useAppPreferences } from "../shared/preferences/AppPreferencesProvider";
import { AssetDetailPage } from "../pages/AssetDetailPage";
import { MarketPage } from "../pages/MarketPage";

const actionButtonStyle: CSSProperties = {
  height: 36,
  padding: "0 14px",
  borderRadius: radius.sm,
  border: "none",
  fontFamily: typography.fontFamily,
  fontWeight: 600,
  fontSize: typography.size.sm,
  cursor: "pointer"
};

// 中文注释：核心逻辑说明。 (App)
export function App() {
  const { locale, setLocale, theme, setTheme, t } = useAppPreferences();

  const menuItems = [
    { to: "/market", label: t("navMarkets") },
    { to: "/asset/BTCUSDT", label: t("navTrade") }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: typography.fontFamily,
        background: colors.surfacePrimary
      }}
    >
      <header
        style={{
          height: 64,
          borderBottom: `1px solid ${colors.borderSubtle}`,
          background: colors.surfacePrimary
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `0 ${spacing.xl}px`,
            gap: spacing.lg
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: spacing.xl }}>
            <strong
              style={{
                color: colors.accent,
                letterSpacing: 0.8,
                fontSize: 30,
                lineHeight: 1
              }}
            >
              CoinTrade
            </strong>

            <nav style={{ display: "flex", alignItems: "center", gap: spacing.xl }}>
              {menuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? colors.textPrimary : colors.textSecondary,
                    fontWeight: isActive ? 600 : 500,
                    fontSize: typography.size.sm
                  })}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
            <LanguageSwitcher value={locale} onChange={setLocale} />
            <ThemeSwitcher value={theme} onChange={setTheme} />

            <button
              type="button"
              style={{
                ...actionButtonStyle,
                background: colors.surfaceTertiary,
                color: colors.textPrimary,
                border: `1px solid ${colors.borderSubtle}`
              }}
            >
              {t("actionLogIn")}
            </button>
            <button
              type="button"
              style={{
                ...actionButtonStyle,
                background: colors.accent,
                color: colors.accentText
              }}
            >
              {t("actionSignUp")}
            </button>
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: `${spacing.xl}px`
        }}
      >
        <Routes>
          <Route path="/" element={<MarketPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/asset/:symbol" element={<AssetDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
