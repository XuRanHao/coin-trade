import { colors } from "@coin-platform/tokens";
import {
  ColorType,
  type IChartApi,
  type ISeriesApi,
  type LineData,
  createChart
} from "lightweight-charts";
import { useEffect, useMemo, useRef } from "react";
import type { PricePoint } from "@/features/market/types";
import type { PredictionScenario } from "@/features/prediction/types";
import { useAppPreferences } from "@/shared/preferences/AppPreferencesProvider";

// 中文注释：类型定义说明。 (PriceChartWidgetProps)
export interface PriceChartWidgetProps {
  points: PricePoint[];
  predictions?: PredictionScenario[];
}

// 中文注释：核心逻辑说明。 (resolveCssColor)
function resolveCssColor(value: string): string {
  const matched = value.match(/^var\((--[^,\s)]+)\s*,\s*([^)]+)\)$/);
  if (!matched || typeof window === "undefined") return value;

  const cssVar = matched[1];
  const fallback = matched[2].trim();
  const computed = window.getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
  return computed || fallback;
}

// 中文注释：核心逻辑说明。 (PriceChartWidget)
export function PriceChartWidget({ points, predictions = [] }: PriceChartWidgetProps) {
  const { theme } = useAppPreferences();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const priceSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const forecastSeriesRef = useRef<ISeriesApi<"Line">[]>([]);

  const palette = useMemo(
    () => ({
      surfaceSecondary: resolveCssColor(colors.surfaceSecondary),
      textSecondary: resolveCssColor(colors.textSecondary),
      borderSubtle: resolveCssColor(colors.borderSubtle),
      accent: resolveCssColor(colors.accent),
      bullish: resolveCssColor(colors.predictionBullish),
      neutral: resolveCssColor(colors.predictionNeutral),
      bearish: resolveCssColor(colors.predictionBearish)
    }),
    [theme]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: {
          type: ColorType.Solid,
          color: palette.surfaceSecondary
        },
        textColor: palette.textSecondary
      },
      rightPriceScale: {
        borderColor: palette.borderSubtle
      },
      timeScale: {
        borderColor: palette.borderSubtle
      },
      grid: {
        vertLines: { color: "rgba(148, 163, 184, 0.15)" },
        horzLines: { color: "rgba(148, 163, 184, 0.15)" }
      }
    });

    const priceSeries = chart.addLineSeries({
      color: palette.accent,
      lineWidth: 2
    });

    chartRef.current = chart;
    priceSeriesRef.current = priceSeries;

    return () => {
      chartRef.current?.remove();
      chartRef.current = null;
      priceSeriesRef.current = null;
      forecastSeriesRef.current = [];
    };
  }, [palette]);

  useEffect(() => {
    if (!priceSeriesRef.current || !chartRef.current) return;

    const predictionColors: Record<PredictionScenario["type"], string> = {
      bullish: palette.bullish,
      neutral: palette.neutral,
      bearish: palette.bearish
    };

    const priceData: LineData[] = points.map((point) => ({
      time: point.time as LineData["time"],
      value: point.value
    }));
    priceSeriesRef.current.setData(priceData);

    forecastSeriesRef.current.forEach((series) => chartRef.current?.removeSeries(series));
    forecastSeriesRef.current = [];

    predictions.forEach((scenario) => {
      if (!chartRef.current) return;
      const series = chartRef.current.addLineSeries({
        color: predictionColors[scenario.type],
        lineWidth: 2,
        lineStyle: 2
      });
      const scenarioData: LineData[] = scenario.points.map((point) => ({
        time: point.time as LineData["time"],
        value: point.value
      }));
      series.setData(scenarioData);
      forecastSeriesRef.current.push(series);
    });

    chartRef.current.timeScale().fitContent();
  }, [points, predictions, palette]);

  return <div ref={containerRef} style={{ width: "100%", height: 420 }} />;
}
