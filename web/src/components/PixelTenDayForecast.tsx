"use client";

import React, { useMemo } from "react";
import { Calendar, Droplets, Sun, Cloud, CloudRain, CloudLightning, CloudFog } from "lucide-react";
import { DailyForecast } from "@/types/weather";

interface PixelTenDayForecastProps {
  daily: DailyForecast[];
  isBengali: boolean;
  fmtTemp: (val: number) => string;
  fmtNum: (val: number | string) => string;
}

export const PixelTenDayForecast: React.FC<PixelTenDayForecastProps> = ({
  daily,
  isBengali,
  fmtTemp,
  fmtNum,
}) => {
  if (!daily || daily.length === 0) return null;

  // Calculate global min and max across all 10 days for accurate proportional range bar
  const { globalMin, globalMax } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    daily.forEach((d) => {
      if (d.tempMin < min) min = d.tempMin;
      if (d.tempMax > max) max = d.tempMax;
    });
    return { globalMin: min, globalMax: max };
  }, [daily]);

  const renderIcon = (code: number) => {
    switch (code) {
      case 0:
      case 1:
        return <Sun className="w-5 h-5 text-amber-400 shrink-0" />;
      case 2:
      case 3:
        return <Cloud className="w-5 h-5 text-sky-200 shrink-0" />;
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
      case 65:
      case 82:
        return <CloudRain className="w-5 h-5 text-cyan-300 shrink-0" />;
      case 95:
      case 96:
      case 99:
        return <CloudLightning className="w-5 h-5 text-yellow-300 shrink-0" />;
      case 45:
      case 48:
        return <CloudFog className="w-5 h-5 text-slate-300 shrink-0" />;
      default:
        return <Cloud className="w-5 h-5 text-sky-200 shrink-0" />;
    }
  };

  const totalSpread = Math.max(1, globalMax - globalMin);

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-5 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">
            {isBengali ? "১০ দিনের পূর্বাভাস ও বাংলা পঞ্জিকা" : "10-Day Forecast & Bengali Calendar"}
          </h3>
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          {isBengali ? "পরিসীমা বার" : "Range Bar"}
        </span>
      </div>

      <div className="divide-y divide-white/5">
        {daily.map((item, idx) => {
          // Calculate relative left offset and width percentage for the temperature range bar
          const leftPercent = Math.max(0, Math.min(100, ((item.tempMin - globalMin) / totalSpread) * 100));
          const widthPercent = Math.max(8, Math.min(100 - leftPercent, ((item.tempMax - item.tempMin) / totalSpread) * 100));

          return (
            <div
              key={item.dateIso}
              className={`py-3 flex items-center justify-between gap-3 text-sm transition-colors rounded-xl px-2 ${
                idx === 0 ? "bg-white/5" : "hover:bg-white/[0.03]"
              }`}
            >
              {/* Day Label + Banglabda date */}
              <div className="w-28 shrink-0">
                <span className="font-bold text-white block">
                  {isBengali ? item.dayLabelBn : item.dayLabelEn}
                </span>
                <span className="text-[11px] text-amber-400/80 font-medium block">
                  {item.banglaCalendarDate}
                </span>
              </div>

              {/* Weather Condition Icon */}
              <div className="shrink-0 flex items-center justify-center w-8">
                {renderIcon(item.weatherCode)}
              </div>

              {/* Rain Probability */}
              <div className="w-12 shrink-0 text-center">
                {item.precipitationSum > 0 || (item.precipitationProbabilityMax && item.precipitationProbabilityMax > 15) ? (
                  <span className="inline-flex items-center gap-0.5 text-xs font-bold text-cyan-400">
                    <Droplets className="w-3 h-3" />
                    <span>
                      {fmtNum(item.precipitationProbabilityMax ?? Math.round(item.precipitationSum * 12))}%
                    </span>
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 font-medium">—</span>
                )}
              </div>

              {/* Min Temp */}
              <div className="w-10 text-right shrink-0 text-xs font-semibold text-slate-400">
                {fmtTemp(item.tempMin)}
              </div>

              {/* Proportional Range Bar */}
              <div className="flex-1 h-2 bg-white/10 rounded-full relative overflow-hidden hidden sm:block">
                <div
                  className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-400 shadow-sm"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                  }}
                />
              </div>

              {/* Max Temp */}
              <div className="w-10 text-right shrink-0 text-xs font-bold text-white">
                {fmtTemp(item.tempMax)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
