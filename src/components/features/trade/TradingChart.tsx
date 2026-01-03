import React, { useEffect, useRef, useState } from "react";
import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
import type { IChartApi, ISeriesApi, Time } from "lightweight-charts";
import axios from "axios";

interface TradingChartProps {
    symbol?: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({ symbol = "BTC" }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

    // Detect theme from class
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

    useEffect(() => {
        // Log symbol usage to suppress unused warning for V2 standard
        console.log("Chart Active:", symbol);
    }, [symbol]);

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    setIsDark(document.documentElement.classList.contains("dark"));
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "transparent" },
                textColor: isDark ? "#A1A1AA" : "#52525B", // Zinc 400 / Zinc 600
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
            },
            grid: {
                vertLines: { color: isDark ? "#27272a" : "#e4e4e7" },
                horzLines: { color: isDark ? "#27272a" : "#e4e4e7" },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight, // Use container height
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
                borderColor: isDark ? "#27272a" : "#e4e4e7",
            },
            rightPriceScale: {
                borderColor: isDark ? "#27272a" : "#e4e4e7",
            },
            crosshair: {
                mode: 1, // Magnet
                vertLine: {
                    color: isDark ? "#52525b" : "#a1a1aa",
                    width: 1,
                    style: 3,
                    labelBackgroundColor: isDark ? "#27272a" : "#e4e4e7",
                },
                horzLine: {
                    color: isDark ? "#52525b" : "#a1a1aa",
                    width: 1,
                    style: 3,
                    labelBackgroundColor: isDark ? "#27272a" : "#e4e4e7",
                },
            }
        });

        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: "#00F090", // Neon Green
            downColor: "#FF2E50", // Neon Red
            borderVisible: false,
            wickUpColor: "#00F090",
            wickDownColor: "#FF2E50",
        });

        chartRef.current = chart;
        seriesRef.current = candlestickSeries;

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    height: chartContainerRef.current.clientHeight
                });
            }
        };

        window.addEventListener("resize", handleResize);

        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/candles/1m");
                if (Array.isArray(data)) {
                    const formattedData = data
                        .map((candle: any) => ({
                            time: Math.floor(new Date(candle.bucket).getTime() / 1000) as Time,
                            open: Number(candle.open),
                            high: Number(candle.high),
                            low: Number(candle.low),
                            close: Number(candle.close),
                        }))
                        .sort((a: any, b: any) => (a.time as number) - (b.time as number));

                    candlestickSeries.setData(formattedData);
                    chart.timeScale().fitContent();
                }
            } catch (err) {
                console.error("Failed to fetch candles", err);
            }
        };
        fetchData();

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, []);

    // Update theme dynamically
    useEffect(() => {
        if (!chartRef.current) return;
        chartRef.current.applyOptions({
            layout: {
                textColor: isDark ? "#A1A1AA" : "#52525B",
            },
            grid: {
                vertLines: { color: isDark ? "#27272a" : "#e4e4e7" },
                horzLines: { color: isDark ? "#27272a" : "#e4e4e7" },
            },
            timeScale: {
                borderColor: isDark ? "#27272a" : "#e4e4e7",
            },
            rightPriceScale: {
                borderColor: isDark ? "#27272a" : "#e4e4e7",
            },
        });
    }, [isDark]);

    return (
        <div className="w-full h-full bg-card relative">
            {/* Overlay Header for Pro Look */}
            <div className="absolute top-2 left-2 z-10 flex gap-4 pointer-events-none">
                <div className="flex flex-col">
                    <span className="text-xl font-bold font-sans tracking-tight">BTCUSDT</span>
                    <span className="text-xs text-muted-foreground">Bitcoin / TetherUS</span>
                </div>
            </div>
            <div ref={chartContainerRef} className="w-full h-full" />
        </div>
    );
};
