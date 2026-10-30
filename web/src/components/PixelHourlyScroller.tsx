"use client";

import React from "react";
import { Clock, Sun, Cloud, CloudRain, CloudLightning, CloudFog, Droplets } from "lucide-react";
import { HourlyForecast } from "@/types/weather";

interface PixelHourlyScrollerProps {
  hourly: HourlyForecast[];
  isBengali: boolean;
  fmtTemp: (val: number) => string;
  fmtNum: (val: number | string) => string;
}

export const PixelHourlyScroller: React.FC<PixelHourlyScrollerProps> = ({
  hourly,
  isBengali,
  fmtTemp,
  fmtNum,
}) => {
  if (!hourly || hourly.length === 0) return null;

  const renderIcon = (code: number) => {
    switch (code) {
      case 0:
      case 1:
        return <Sun className="w-6 h-6 text-amber-400 shrink-0" />;
      case 2:
      case 3:
        return <Cloud className="w-6 h-6 text-sky-200 shrink-0" />;
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
      case 65:
      case 82:
        return <CloudRain className="w-6 h-6 text-cyan-300 shrink-0" />;
      case 95:
      case 96:
      case 99:
        return <CloudLightning className="w-6 h-6 text-yellow-300 shrink-0" />;
      case 45:
      case 48:
        return <CloudFog className="w-6 h-6 text-slate-300 shrink-0" />;
      default:
        return <Cloud className="w-6 h-6 text-sky-200 shrink-0" />;
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-5 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">
            {isBengali ? "ঘণ্টাভিত্তিক পূর্বাভাস (৩৬ ঘণ্টা)" : "Hourly Forecast (36 Hours)"}
          </h3>
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          {isBengali ? "স্ক্রল করুন →" : "Scroll for more →"}
        </span>
      </div>

      {/* Horizontal Scroller */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-white/20">
        {hourly.map((item, idx) => (
          <div
            key={item.timeIso}
            className={`flex flex-col items-center justify-between min-w-[76px] px-2.5 py-3 rounded-2xl border transition-all ${
              idx === 0
                ? "bg-white/15 border-amber-400/40 shadow-md shadow-amber-950/20"
                : "bg-white/5 hover:bg-white/10 border-white/10"
            }`}
          >
            {/* Time */}
            <span className="text-[11px] font-semibold text-slate-300">
              {idx === 0 ? (isBengali ? "এখন" : "Now") : isBengali ? item.hourLabelBn : item.hourLabel}
            </span>

            {/* Weather Icon */}
            <div className="my-2.5">{renderIcon(item.weatherCode)}</div>

            {/* Temperature */}
            <span className="text-sm font-bold text-white tracking-tight">
              {fmtTemp(item.temperature)}
            </span>

            {/* Precipitation Prob Bar */}
            <div className="mt-2 flex flex-col items-center w-full">
              {item.precipitationProb > 0 ? (
                <div className="flex items-center gap-0.5 text-[10px] font-bold text-cyan-400">
                  <Droplets className="w-2.5 h-2.5" />
                  <span>{fmtNum(item.precipitationProb)}%</span>
                </div>
              ) : (
                <span className="text-[10px] text-slate-500 font-medium">0%</span>
              )}

              {/* Mini rainfall depth pill if > 0 */}
              {item.precipitationMm > 0 && (
                <span className="text-[9px] font-semibold text-blue-300 mt-0.5">
                  {fmtNum(item.precipitationMm)}mm
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
