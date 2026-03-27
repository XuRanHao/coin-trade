import { colors, spacing, typography } from "@coin-platform/tokens";
import { NavLink, Route, Routes } from "react-router-dom";
import type { CSSProperties } from "react";
import { AssetDetailPage } from "../pages/AssetDetailPage";
import { MarketPage } from "../pages/MarketPage";

const navLinkStyle: CSSProperties = {
  color: colors.textSecondary,
  textDecoration: "none",
  fontWeight: 700,
  letterSpacing: 0.4
};

export function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: typography.fontFamily
      }}
    >
      <header
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0 ${spacing.xl}px`,
          borderBottom: `1px solid ${colors.borderSubtle}`,
          background: colors.surfacePrimary
        }}
      >
        <strong style={{ color: colors.textPrimary }}>Coin Agent</strong>
        <nav style={{ display: "flex", gap: spacing.lg }}>
          <NavLink to="/market" style={navLinkStyle}>
            Market
          </NavLink>
          <NavLink to="/asset/BTCUSDT" style={navLinkStyle}>
            BTC Detail
          </NavLink>
        </nav>
      </header>

      <main style={{ padding: `${spacing.xl}px` }}>
        <Routes>
          <Route path="/" element={<MarketPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/asset/:symbol" element={<AssetDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
