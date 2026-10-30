"use client";

import React from "react";
import { Sparkles, AlertTriangle, CloudRain, Sun, Wind, Droplets, Info } from "lucide-react";
import { WeatherInsight } from "@/types/weather";

interface WeatherInsightsCardProps {
  insights: WeatherInsight[];
  isBengali: boolean;
}

export const WeatherInsightsCard: React.FC<WeatherInsightsCardProps> = ({
  insights,
  isBengali,
}) => {
  if (!insights || insights.length === 0) return null;

  const getIcon = (name: string, severity: string) => {
    const iconColor =
      severity === "alert"
        ? "text-red-400"
        : severity === "warning"
        ? "text-amber-400"
        : "text-emerald-400";

    switch (name) {
      case "CloudRain":
        return <CloudRain className={`w-5 h-5 shrink-0 ${iconColor}`} />;
      case "Sun":
        return <Sun className={`w-5 h-5 shrink-0 ${iconColor}`} />;
      case "Wind":
        return <Wind className={`w-5 h-5 shrink-0 ${iconColor}`} />;
      case "AlertTriangle":
        return <AlertTriangle className={`w-5 h-5 shrink-0 ${iconColor}`} />;
      default:
        return <Sparkles className={`w-5 h-5 shrink-0 ${iconColor}`} />;
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-indigo-950/40 border border-emerald-500/25 p-5 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold text-white tracking-wide uppercase">
          {isBengali ? "স্মার্ট আবহাওয়া বিশ্লেষণ ও তাৎক্ষণিক পরামর্শ" : "Pixel Weather Intelligence"}
        </h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all ${
              insight.severity === "alert"
                ? "bg-red-500/10 border-red-500/30 text-red-200"
                : insight.severity === "warning"
                ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                : "bg-white/5 border-white/10 text-slate-200"
            }`}
          >
            {getIcon(insight.iconName, insight.severity)}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white leading-snug">
                {isBengali ? insight.headlineBn : insight.headlineEn}
              </h4>
              <p className="text-xs text-slate-300/80 mt-1 leading-relaxed">
                {isBengali ? insight.detailBn : insight.detailEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
