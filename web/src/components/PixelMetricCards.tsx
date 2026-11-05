"use client";

import React from "react";
import {
  Sun,
  Wind,
  Droplets,
  Compass,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  ShieldAlert,
  Activity,
  Cloud,
  Waves,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import { CurrentWeather, AirQuality, MonsoonData, FloodRisk, DailyForecast } from "@/types/weather";

interface PixelMetricCardsProps {
  current: CurrentWeather;
  todayForecast?: DailyForecast;
  aqi?: AirQuality | null;
  monsoon?: MonsoonData | null;
  flood?: FloodRisk | null;
  isBengali: boolean;
  fmtTemp: (val: number) => string;
  fmtNum: (val: number | string) => string;
  useFahrenheit: boolean;
}

export const PixelMetricCards: React.FC<PixelMetricCardsProps> = ({
  current,
  todayForecast,
  aqi,
  monsoon,
  flood,
  isBengali,
  fmtTemp,
  fmtNum,
  useFahrenheit,
}) => {
  // UV category
  const uv = current.uvIndex;
  const uvCategory =
    uv >= 11
      ? { labelEn: "Extreme", labelBn: "চরম বিপজ্জনক", color: "text-purple-400" }
      : uv >= 8
      ? { labelEn: "Very High", labelBn: "খুব বেশি", color: "text-rose-400" }
      : uv >= 6
      ? { labelEn: "High", labelBn: "বেশি", color: "text-amber-400" }
      : uv >= 3
      ? { labelEn: "Moderate", labelBn: "মাঝারি", color: "text-yellow-300" }
      : { labelEn: "Low", labelBn: "কম", color: "text-emerald-400" };

  // Humidity comfort
  const hum = current.humidity;
  const humComfort =
    hum > 80
      ? { labelEn: "Muggy & Tropical", labelBn: "ভ্যাপসা গরম ও চরম আর্দ্র" }
      : hum > 60
      ? { labelEn: "Humid", labelBn: "আর্দ্র বাতাস" }
      : hum > 30
      ? { labelEn: "Comfortable", labelBn: "স্বস্তিদায়ক" }
      : { labelEn: "Dry", labelBn: "শুষ্ক বাতাস" };

  // Wind direction text
  const getWindDir = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const idx = Math.round(deg / 45) % 8;
    return directions[idx];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
      {/* 1. UV Index Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-4 backdrop-blur-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-amber-400" />
            <span>{isBengali ? "ইউভি সূচক" : "UV Index"}</span>
          </span>
        </div>
        <div className="my-3">
          <div className="text-3xl font-black text-white">{fmtNum(uv)}</div>
          <div className={`text-xs font-bold mt-1 ${uvCategory.color}`}>
            {isBengali ? uvCategory.labelBn : uvCategory.labelEn}
          </div>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          {uv >= 6
            ? isBengali
              ? "দুপুরে সানস্ক্রিন ও ছাতা আবশ্যক"
              : "Use SPF 30+ sun protection"
            : isBengali
            ? "সূর্যালোক মৃদু ও সহনশীল"
            : "No special protection needed"}
        </p>
      </div>

      {/* 2. Wind & Gusts Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-4 backdrop-blur-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>{isBengali ? "বায়ুপ্রবাহ" : "Wind"}</span>
          </span>
          <span className="text-[11px] font-bold text-amber-400">
            {getWindDir(current.windDirection)}
          </span>
        </div>
        <div className="my-3">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white">{fmtNum(Math.round(current.windSpeed))}</span>
            <span className="text-xs text-slate-400">km/h</span>
          </div>
          <div className="text-xs font-medium text-slate-300 mt-1">
            {isBengali ? "দমকা হাওয়া" : "Gusts"}:{" "}
            <span className="font-bold text-amber-300">{fmtNum(Math.round(current.windGusts))} km/h</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <Compass className="w-3 h-3 text-cyan-300" />
          <span>{fmtNum(current.windDirection)}° Azimuth</span>
        </div>
      </div>

      {/* 3. Humidity & Dew Point Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-4 backdrop-blur-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span>{isBengali ? "আর্দ্রতা" : "Humidity"}</span>
          </span>
        </div>
        <div className="my-3">
          <div className="text-3xl font-black text-white">{fmtNum(current.humidity)}%</div>
          <div className="text-xs font-semibold text-cyan-300 mt-1">
            {isBengali ? "শিশিরাঙ্ক" : "Dew point"}: {fmtTemp(current.dewPoint)}
          </div>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          {isBengali ? humComfort.labelBn : humComfort.labelEn}
        </p>
      </div>

      {/* 4. Air Quality Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-4 backdrop-blur-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>{isBengali ? "বায়ুমান (AQI)" : "Air Quality"}</span>
          </span>
        </div>
        <div className="my-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-white">{fmtNum(aqi?.usAqi ?? 75)}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-emerald-300">
              AQI
            </span>
          </div>
          <div className="text-xs font-bold mt-1 text-amber-300">
            {isBengali ? aqi?.categoryBn ?? "মাঝারি" : aqi?.categoryEn ?? "Moderate"}
          </div>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          PM2.5: {fmtNum(aqi?.pm25 ?? 24)} µg/m³ • PM10: {fmtNum(aqi?.pm10 ?? 48)}
        </p>
      </div>

      {/* 5. Sunrise & Sunset Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-4 backdrop-blur-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Sunrise className="w-4 h-4 text-amber-400" />
            <span>{isBengali ? "সূর্যোদয় ও সূর্যাস্ত" : "Sun Times"}</span>
          </span>
        </div>
        <div className="my-3 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">{isBengali ? "সূর্যোদয়" : "Sunrise"}</span>
            <span className="font-bold text-white">{todayForecast?.sunrise ?? "05:45"}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">{isBengali ? "সূর্যাস্ত" : "Sunset"}</span>
            <span className="font-bold text-amber-300">{todayForecast?.sunset ?? "18:15"}</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400">
          {isBengali ? "দিবালোক: প্রায় ১২ ঘণ্টা ৩০ মিনিট" : "Daylight: ~12h 30m"}
        </p>
      </div>

      {/* 6. Atmospheric Pressure Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-4 backdrop-blur-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-purple-400" />
            <span>{isBengali ? "বায়ুচাপ" : "Pressure"}</span>
          </span>
          {current.pressureTrend === "rising" ? (
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          ) : current.pressureTrend === "falling" ? (
            <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />
          ) : (
            <Minus className="w-3.5 h-3.5 text-slate-400" />
          )}
        </div>
        <div className="my-3">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white">{fmtNum(Math.round(current.surfacePressure))}</span>
            <span className="text-xs text-slate-400">hPa</span>
          </div>
          <div className="text-xs font-medium text-slate-300 mt-1">
            {current.pressureTrend === "rising"
              ? isBengali
                ? "চাপ ঊর্ধ্বমুখী (পরিষ্কার আকাশ)"
                : "Rising (Clear weather)"
              : current.pressureTrend === "falling"
              ? isBengali
                ? "চাপ নিম্নমুখী (বৃষ্টির শঙ্কা)"
                : "Falling (Rain likely)"
              : isBengali
              ? "চাপ স্থির"
              : "Steady"}
          </div>
        </div>
        <p className="text-[10px] text-slate-400">
          {isBengali ? "সমুদ্রপৃষ্ঠের প্রমিত মান: ১০১৩ hPa" : "Standard Sea Level: 1013 hPa"}
        </p>
      </div>

      {/* 7. Visibility Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-4 backdrop-blur-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>{isBengali ? "দৃষ্টিসীমা" : "Visibility"}</span>
          </span>
        </div>
        <div className="my-3">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white">{fmtNum(current.visibilityKm)}</span>
            <span className="text-xs text-slate-400">km</span>
          </div>
          <div className="text-xs font-semibold text-cyan-300 mt-1">
            {current.visibilityKm >= 10
              ? isBengali
                ? "সম্পূর্ণ পরিষ্কার"
                : "Perfect View"
              : current.visibilityKm >= 5
              ? isBengali
                ? "হালকা কুয়াশা/ধোঁয়াশা"
                : "Hazy"
              : isBengali
              ? "তীব্র কুয়াশা"
              : "Foggy"}
          </div>
        </div>
        <p className="text-[10px] text-slate-400">
          {isBengali ? "নদী ও মহাসড়কে দৃশ্যমানতা স্বাভাবিক" : "Navigation clear"}
        </p>
      </div>

      {/* 8. Cloud Cover Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-4 backdrop-blur-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Cloud className="w-4 h-4 text-sky-400" />
            <span>{isBengali ? "মেঘের আচ্ছাদন" : "Cloud Cover"}</span>
          </span>
        </div>
        <div className="my-3">
          <div className="text-3xl font-black text-white">{fmtNum(current.cloudCover)}%</div>
          <div className="text-xs font-medium text-slate-300 mt-1">
            {current.cloudCover > 70
              ? isBengali
                ? "ঘন মেঘলা আকাশ"
                : "Overcast"
              : current.cloudCover > 30
              ? isBengali
                ? "আংশিক মেঘলা"
                : "Partly Cloudy"
              : isBengali
              ? "নির্মল রোদ"
              : "Clear"}
          </div>
        </div>
        <p className="text-[10px] text-slate-400">
          {isBengali ? "আকাশে মেঘের স্তর" : "Sky coverage factor"}
        </p>
      </div>
    </div>
  );
};
