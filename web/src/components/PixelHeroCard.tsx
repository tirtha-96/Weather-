"use client";

import React from "react";
import {
  MapPin,
  Compass,
  Radio,
  Calendar,
  Clock,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  ShieldCheck,
  Navigation,
} from "lucide-react";
import { CurrentWeather, LocationMeta, DailyForecast } from "@/types/weather";
import { BengaliDateInfo } from "@/data/bengaliCalendar";

interface PixelHeroCardProps {
  current: CurrentWeather;
  todayForecast?: DailyForecast;
  location: LocationMeta;
  bengaliDate: BengaliDateInfo;
  isBengali: boolean;
  fmtTemp: (val: number) => string;
  fmtNum: (val: number | string) => string;
  onDetectGps: () => void;
  isGpsLoading: boolean;
}

export const PixelHeroCard: React.FC<PixelHeroCardProps> = ({
  current,
  todayForecast,
  location,
  bengaliDate,
  isBengali,
  fmtTemp,
  fmtNum,
  onDetectGps,
  isGpsLoading,
}) => {
  const isDay = current.isDay;

  // Icon selector based on weather condition type
  const renderWeatherIcon = () => {
    switch (current.condition.type) {
      case "sun":
        return <Sun className="w-20 h-20 text-amber-400 animate-[spin_60s_linear_infinite] drop-shadow-[0_0_24px_rgba(251,191,36,0.6)]" />;
      case "rain":
        return <CloudRain className="w-20 h-20 text-cyan-300 drop-shadow-[0_0_20px_rgba(103,232,249,0.5)]" />;
      case "heavy-rain":
        return <CloudRain className="w-20 h-20 text-blue-400 drop-shadow-[0_0_24px_rgba(96,165,250,0.6)]" />;
      case "thunderstorm":
        return <CloudLightning className="w-20 h-20 text-yellow-300 drop-shadow-[0_0_28px_rgba(253,224,71,0.7)]" />;
      case "fog":
        return <CloudFog className="w-20 h-20 text-slate-300 drop-shadow-[0_0_20px_rgba(203,213,225,0.5)]" />;
      default:
        return <Cloud className="w-20 h-20 text-sky-200 drop-shadow-[0_0_22px_rgba(186,230,253,0.5)]" />;
    }
  };

  const highTemp = todayForecast?.tempMax ?? current.temperature + 2;
  const lowTemp = todayForecast?.tempMin ?? current.temperature - 3;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-6 backdrop-blur-2xl shadow-2xl transition-all">
      {/* Background radial ambient glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

      {/* Top Location Bar */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          {/* Location Title */}
          <div className="flex items-center gap-2 flex-wrap">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isBengali ? location.nameBn : location.nameEn}
            </h2>

            {/* GPS Accuracy Pill */}
            {location.type === "gps" ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {isBengali ? "সরাসরি জিপিএস" : "Live GPS"}{" "}
                  {location.accuracyMeters ? `(±${fmtNum(location.accuracyMeters)}m)` : ""}
                </span>
              </span>
            ) : (
              <button
                onClick={onDetectGps}
                disabled={isGpsLoading}
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-300/30 transition active:scale-95"
                title="Detect device GPS location"
              >
                <Navigation className={`w-3 h-3 ${isGpsLoading ? "animate-spin" : ""}`} />
                <span>{isBengali ? "আমার জিপিএস শনাক্ত করুন" : "Use Real GPS"}</span>
              </button>
            )}
          </div>

          {/* Region / Division context */}
          <p className="text-xs text-slate-300/80 mt-1 flex items-center gap-2 font-medium">
            <span>
              {isBengali
                ? `${location.districtBn}, ${location.divisionBn} বিভাগ`
                : `${location.districtEn}, ${location.divisionEn} Division`}
            </span>
            <span>•</span>
            <span>{isBengali ? "বাংলাদেশ" : "Bangladesh"}</span>
          </p>
        </div>

        {/* Date and Bengali Calendar Pill */}
        <div className="text-right shrink-0">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>{bengaliDate.formattedBn}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {isBengali ? bengaliDate.season.nameBn : bengaliDate.season.nameEn}
          </p>
        </div>
      </div>

      {/* Main Temperature Display & Hero Art */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-4">
        {/* Huge Pixel Temperature */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-6xl sm:text-7xl font-black text-white tracking-tighter drop-shadow-sm">
              {fmtTemp(current.temperature)}
            </span>
          </div>

          {/* High / Low Range */}
          <div className="flex items-center gap-3 mt-1 text-sm font-semibold text-slate-300">
            <span>
              {isBengali ? "সর্বোচ্চ" : "H"}: {fmtTemp(highTemp)}
            </span>
            <span>•</span>
            <span>
              {isBengali ? "সর্বনিম্ন" : "L"}: {fmtTemp(lowTemp)}
            </span>
          </div>

          {/* "Feels Like" & Humidity Pill */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-xs font-medium text-white">
              <span>{isBengali ? "অনুভূত" : "Feels like"}</span>
              <span className="font-bold text-amber-300">{fmtTemp(current.apparentTemperature)}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-xs font-medium text-white">
              <span>{isBengali ? "আর্দ্রতা" : "Humidity"}</span>
              <span className="font-bold text-cyan-300">{fmtNum(current.humidity)}%</span>
            </div>
          </div>
        </div>

        {/* Condition Icon and Description */}
        <div className="flex sm:flex-col sm:items-end justify-between items-center gap-2">
          <div className="p-2">{renderWeatherIcon()}</div>
          <div className="sm:text-right">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {isBengali ? current.condition.descriptionBn : current.condition.descriptionEn}
            </h3>
            <p className="text-xs text-slate-300/80 font-medium">
              {current.precipitation > 0
                ? isBengali
                  ? `বৃষ্টিপাত: ${fmtNum(current.precipitation)} মিমি`
                  : `Precipitation: ${current.precipitation} mm`
                : isBengali
                ? "স্বাভাবিক শুষ্ক আবহাওয়া"
                : "Standard Dry Flow"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
