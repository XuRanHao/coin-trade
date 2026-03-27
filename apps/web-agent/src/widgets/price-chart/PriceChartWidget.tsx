import { colors } from "@coin-platform/tokens";
import {
  ColorType,
  type IChartApi,
  type ISeriesApi,
  type LineData,
  createChart
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import type { PredictionScenario } from "@/features/prediction/types";
import type { PricePoint } from "@/features/market/types";

export interface PriceChartWidgetProps {
  points: PricePoint[];
  predictions?: PredictionScenario[];
}

const predictionColors: Record<PredictionScenario["type"], string> = {
  bullish: colors.predictionBullish,
  neutral: colors.predictionNeutral,
  bearish: colors.predictionBearish
};

export function PriceChartWidget({ points, predictions = [] }: PriceChartWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const priceSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const forecastSeriesRef = useRef<ISeriesApi<"Line">[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: {
          type: ColorType.Solid,
          color: colors.surfaceSecondary
        },
        textColor: colors.textSecondary
      },
      rightPriceScale: {
        borderColor: colors.borderSubtle
      },
      timeScale: {
        borderColor: colors.borderSubtle
      },
      grid: {
        vertLines: { color: "rgba(148, 163, 184, 0.15)" },
        horzLines: { color: "rgba(148, 163, 184, 0.15)" }
      }
    });

    const priceSeries = chart.addLineSeries({
      color: colors.accent,
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
  }, []);

  useEffect(() => {
    if (!priceSeriesRef.current || !chartRef.current) return;

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
  }, [points, predictions]);

  return <div ref={containerRef} style={{ width: "100%", height: 420 }} />;
}
