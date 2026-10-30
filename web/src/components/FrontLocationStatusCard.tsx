"use client";

import React from "react";
import {
  MapPin,
  Navigation,
  RefreshCw,
  Search,
  CheckCircle2,
  Compass,
  Radio,
  SlidersHorizontal,
  CloudSun,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { LocationMeta, CurrentWeather } from "@/types/weather";

interface FrontLocationStatusCardProps {
  location: LocationMeta;
  current: CurrentWeather | null;
  isGpsLoading: boolean;
  isRefreshing: boolean;
  isBengali: boolean;
  fmtTemp: (val: number) => string;
  fmtNum: (val: number | string) => string;
  onDetectGps: () => void;
  onOpenSearch: () => void;
  onRefresh: () => void;
}

export const FrontLocationStatusCard: React.FC<FrontLocationStatusCardProps> = ({
  location,
  current,
  isGpsLoading,
  isRefreshing,
  isBengali,
  fmtTemp,
  fmtNum,
  onDetectGps,
  onOpenSearch,
  onRefresh,
}) => {
  const isGps = location.type === "gps";

  // Meteorological status headline
  const getStatusHeadline = () => {
    if (!current) {
      return isBengali
        ? "আবহাওয়া উপাত্ত সংযোগ করা হচ্ছে..."
        : "Connecting to weather telemetry...";
    }

    const tempStr = fmtTemp(current.temperature);
    const condName = isBengali ? current.condition.descriptionBn : current.condition.descriptionEn;

    if ([95, 96, 99].includes(current.weatherCode)) {
      return isBengali
        ? `বজ্রঝড় সতর্কাবস্থা • ${tempStr} • ${condName}`
        : `Thunderstorm Advisory • ${tempStr} • ${condName}`;
    }
    if ([61, 63, 65, 80, 81, 82].includes(current.weatherCode)) {
      return isBengali
        ? `বৃষ্টিপাত চলছে • ${tempStr} • ${condName}`
        : `Rainfall in progress • ${tempStr} • ${condName}`;
    }
    if (current.weatherCode <= 3) {
      return isBengali
        ? `স্বাভাবিক ও শান্ত আবহাওয়া • ${tempStr} • ${condName}`
        : `Calm & Normal Weather • ${tempStr} • ${condName}`;
    }

    return `${condName} • ${tempStr}`;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-indigo-950/90 border border-white/15 p-4 sm:p-5 backdrop-blur-2xl shadow-xl transition-all">
      {/* Subtle indicator bar on top */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        {/* Left: Location & GPS State */}
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
              isGps
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
            }`}
          >
            {isGps ? (
              <Navigation className="w-5 h-5 animate-pulse text-emerald-400" />
            ) : (
              <MapPin className="w-5 h-5 text-amber-400" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                {isBengali ? location.nameBn : location.nameEn}
              </h1>

              {/* Status Badge */}
              {isGps ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>
                    {isBengali ? "সরাসরি ডিভাইস জিপিএস" : "Live Device GPS"}
                    {location.accuracyMeters ? ` (±${fmtNum(location.accuracyMeters)}m)` : ""}
                  </span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{isBengali ? "নির্বাচিত উপজেলা" : "Selected Upazila"}</span>
                </span>
              )}
            </div>

            {/* Administrative hierarchy */}
            <p className="text-xs text-slate-300 mt-0.5">
              {isBengali
                ? `${location.districtBn || location.nameBn} জেলা • ${location.divisionBn || ""} বিভাগ, বাংলাদেশ`
                : `${location.districtEn || location.nameEn} District • ${location.divisionEn || ""} Division, Bangladesh`}
            </p>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            onClick={onDetectGps}
            disabled={isGpsLoading}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 shadow-md ${
              isGps
                ? "bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-200 border border-emerald-500/40"
                : "bg-emerald-500 hover:bg-emerald-400 text-black border border-emerald-300 font-extrabold"
            }`}
            title="Locate via device GPS"
          >
            <Navigation className={`w-3.5 h-3.5 ${isGpsLoading ? "animate-spin" : ""}`} />
            <span>{isBengali ? "আমার লোকেশন" : "My GPS"}</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-semibold transition active:scale-95"
            title="Browse all 495+ upazilas"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBengali ? "উপজেলা পরিবর্তন" : "Change Upazila"}</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white border border-white/15 transition active:scale-95"
            title="Refresh current meteorological data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Bottom Meteorological Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2.5 text-xs">
        <div className="flex items-center gap-2 text-slate-200 font-medium">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-white font-semibold">{getStatusHeadline()}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>
            {fmtNum(location.latitude.toFixed(4))}°N, {fmtNum(location.longitude.toFixed(4))}°E
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span className="text-emerald-400 font-semibold">
            {isBengali ? "সার্ভার লাইভ সিঙ্ক" : "Live Weather Telemetry"}
          </span>
        </div>
      </div>
    </div>
  );
};
