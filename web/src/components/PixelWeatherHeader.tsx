"use client";

import React from "react";
import { Cloud, Search, Settings, RefreshCw, MapPin, Radio } from "lucide-react";
import { LocationMeta } from "@/types/weather";

interface PixelWeatherHeaderProps {
  location: LocationMeta;
  isBengali: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onToggleLanguage: () => void;
  useFahrenheit: boolean;
  onToggleTempUnit: () => void;
}

export const PixelWeatherHeader: React.FC<PixelWeatherHeaderProps> = ({
  location,
  isBengali,
  isRefreshing,
  onRefresh,
  onOpenSearch,
  onOpenSettings,
  onToggleLanguage,
  useFahrenheit,
  onToggleTempUnit,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/60 border-b border-white/10 px-4 py-3 transition-colors">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-emerald-950/40">
            <Cloud className="w-5 h-5 drop-shadow" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>{isBengali ? "বেঙ্গল স্কাই" : "Bengal Sky"}</span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Pixel
              </span>
            </h1>
            <p className="text-[11px] text-slate-300/80 font-medium leading-none">
              {isBengali ? "আবহাওয়া ও সংকেত কেন্দ্র" : "Weather & Alert Center"}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition active:scale-95 shadow-sm"
            title="Search District or Upazila"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">
              {isBengali ? "অবস্থান খুঁজুন" : "Search"}
            </span>
          </button>

          {/* Temp Unit Toggle (°C / °F) */}
          <button
            onClick={onToggleTempUnit}
            className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold transition active:scale-95"
            title="Toggle Temperature Unit"
          >
            {useFahrenheit ? "°F" : "°C"}
          </button>

          {/* Language Toggle (বাং / EN) */}
          <button
            onClick={onToggleLanguage}
            className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-amber-300 text-xs font-bold transition active:scale-95"
            title="Toggle Bengali / English"
          >
            {isBengali ? "EN" : "বাং"}
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`p-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white transition active:scale-90 ${
              isRefreshing ? "animate-spin text-amber-400" : ""
            }`}
            title="Refresh Live Forecast"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white transition active:scale-90"
            title="Settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
