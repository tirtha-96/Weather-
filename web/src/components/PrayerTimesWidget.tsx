"use client";

import { X, Clock, Sun, Moon } from "lucide-react";
import { calculatePrayerTimes, toBengaliDigits } from "@/data/bengaliCalendar";

interface PrayerTimesWidgetProps {
  lat: number;
  lon: number;
  isBengali: boolean;
  useBengaliDigits: boolean;
  onDismiss: () => void;
}

export const PrayerTimesWidget: React.FC<PrayerTimesWidgetProps> = ({
  lat,
  lon,
  isBengali,
  useBengaliDigits,
  onDismiss,
}) => {
  const times = calculatePrayerTimes(lat, lon);

  const fmt = (t: string) => {
    return useBengaliDigits ? toBengaliDigits(t) : t;
  };

  const slots = [
    { nameEn: "Fajr", nameBn: "ফজর", time: times.fajr },
    { nameEn: "Dhuhr", nameBn: "যোহর", time: times.dhuhr },
    { nameEn: "Asr", nameBn: "আসর", time: times.asr },
    { nameEn: "Maghrib", nameBn: "মাগরিব", time: times.maghrib },
    { nameEn: "Isha", nameBn: "ইশা", time: times.isha },
  ];

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-emerald-500/30 p-4 sm:p-5 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              {isBengali ? "নামাজের সময়সূচি (বর্তমান অবস্থান)" : "Daily Prayer Times (Current Location)"}
            </h3>
            <p className="text-[11px] text-slate-400">
              {isBengali ? "সূর্যোদয় ভিত্তিক ভৌগোলিক হিসাব" : "Calculated from solar coordinates"}
            </p>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2 text-center mt-3">
        {slots.map((slot) => (
          <div
            key={slot.nameEn}
            className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center"
          >
            <span className="text-[11px] font-semibold text-amber-300">
              {isBengali ? slot.nameBn : slot.nameEn}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white mt-1">
              {fmt(slot.time)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
