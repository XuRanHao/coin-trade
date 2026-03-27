import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AppLocale = "zh" | "en";
export type AppTheme = "dark" | "light";

const messages = {
  zh: {
    navMarkets: "行情",
    navTrade: "交易",
    actionLogIn: "登录",
    actionSignUp: "注册",
    groupHot: "热门",
    groupTopGainer: "涨幅榜",
    groupTopVolume: "成交量榜",
    commonMore: "更多",
    pageOverviewTitle: "市场总览",
    pageOverviewDesc: "查看全量 USDT 现货对，支持按价格、涨跌、成交量和市值排序。",
    tableName: "名称",
    tablePrice: "价格",
    tableChange24h: "24h 涨跌",
    tableVolume24h: "24h 成交量",
    tableMarketCap: "市值",
    sectionTopTokensTitle: "主流币市场数据",
    sectionTopTokensDesc: "在一张表中追踪实时价格、24h 变化和交易量。",
    badge24h: "24h",
    loadingMarket: "正在加载行情数据...",
    errorMarketTitle: "行情加载失败",
    errorMarketDesc: "请稍后重试或检查网络连接。",
    emptyMarketTitle: "暂无行情数据",
    emptyMarketDesc: "当前没有可展示的币种。",
    emptySearchTitle: "没有匹配的币种",
    emptySearchDesc: "请尝试其他关键词。",
    marketAllTitle: "全部币种行情",
    marketAllDesc: "接入 Binance 现货行情并合并 CoinGecko 市值。",
    marketResultLabel: "结果数量",
    marketSearchPlaceholder: "搜索 Symbol 或币种名称",
    paginationPrev: "上一页",
    paginationNext: "下一页",
    assetSubtitle: "实时价格走势 + AI 多情景预测叠加。",
    badgeAIForecast: "AI 预测",
    statLastPrice: "最新价格",
    stat24hChange: "24h 涨跌",
    stat24hVolume: "24h 成交量",
    chartTitle: "价格与预测",
    intervalHour: "周期：1 小时",
    loadingChart: "正在加载图表...",
    emptyChartTitle: "暂无图表数据",
    emptyChartDesc: "当前币种暂时无法加载图表。"
  },
  en: {
    navMarkets: "Markets",
    navTrade: "Trade",
    actionLogIn: "Log In",
    actionSignUp: "Sign Up",
    groupHot: "Hot",
    groupTopGainer: "Top Gainer",
    groupTopVolume: "Top Volume",
    commonMore: "More",
    pageOverviewTitle: "Market Overview",
    pageOverviewDesc: "Browse all USDT spot pairs and sort by price, change, volume and market cap.",
    tableName: "Name",
    tablePrice: "Price",
    tableChange24h: "24h Change",
    tableVolume24h: "24h Volume",
    tableMarketCap: "Market Cap",
    sectionTopTokensTitle: "Top Tokens by Market Data",
    sectionTopTokensDesc: "Track live price, 24h change and trading volume in one clean table.",
    badge24h: "24h",
    loadingMarket: "Loading market data...",
    errorMarketTitle: "Failed to load market data",
    errorMarketDesc: "Please retry or check your network access.",
    emptyMarketTitle: "No market data",
    emptyMarketDesc: "No symbols available.",
    emptySearchTitle: "No matched symbol",
    emptySearchDesc: "Try another keyword.",
    marketAllTitle: "All Market Pairs",
    marketAllDesc: "Binance spot market data merged with Alternative.me/CoinLore market cap.",
    marketResultLabel: "Results",
    marketSearchPlaceholder: "Search symbol or token name",
    paginationPrev: "PREV",
    paginationNext: "NEXT",
    assetSubtitle: "Live price timeline with AI multi-scenario projection overlay.",
    badgeAIForecast: "AI Forecast",
    statLastPrice: "Last Price",
    stat24hChange: "24h Change",
    stat24hVolume: "24h Volume",
    chartTitle: "Price + Prediction",
    intervalHour: "Interval: 1H",
    loadingChart: "Loading chart...",
    emptyChartTitle: "No chart data",
    emptyChartDesc: "Cannot load this symbol right now."
  }
} as const;

export type TranslationKey = keyof (typeof messages)["zh"];

interface AppPreferencesContextValue {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  t: (key: TranslationKey) => string;
}

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null);

function readSavedLocale(): AppLocale {
  if (typeof window === "undefined") return "zh";
  const saved = window.localStorage.getItem("cp-locale");
  return saved === "en" || saved === "zh" ? saved : "zh";
}

function readSavedTheme(): AppTheme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("cp-theme");
  return saved === "light" || saved === "dark" ? saved : "dark";
}

// 中文注释：全局偏好上下文，统一管理语言和主题并持久化到 localStorage。
export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<AppLocale>(readSavedLocale);
  const [theme, setTheme] = useState<AppTheme>(readSavedTheme);

  useEffect(() => {
    window.localStorage.setItem("cp-locale", locale);
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem("cp-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo<AppPreferencesContextValue>(
    () => ({
      locale,
      setLocale,
      theme,
      setTheme,
      t: (key) => messages[locale][key]
    }),
    [locale, theme]
  );

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
}

// 中文注释：读取全局偏好上下文。
export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);
  if (!context) {
    throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  }
  return context;
}
