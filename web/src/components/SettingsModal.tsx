"use client";

import React from "react";
import { Settings, X, Globe, Bell, Shield, Sliders, ExternalLink, Moon, Sparkles } from "lucide-react";
import { AppSettings } from "@/types/weather";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onRequestNotifications: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onRequestNotifications,
}) => {
  if (!isOpen) return null;

  const isBn = settings.language === "bn";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              {isBn ? "অ্যাপ সেটিংস" : "App Settings"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 my-4">
          {/* Temperature Unit */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <div className="text-sm font-semibold text-white">
                {isBn ? "তাপমাত্রা একক" : "Temperature Unit"}
              </div>
              <div className="text-xs text-slate-400">
                {settings.temperatureUnit === "C" ? "Celsius (°C)" : "Fahrenheit (°F)"}
              </div>
            </div>
            <div className="flex bg-white/10 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => onUpdateSettings({ temperatureUnit: "C" })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  settings.temperatureUnit === "C"
                    ? "bg-amber-400 text-black shadow"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                °C
              </button>
              <button
                onClick={() => onUpdateSettings({ temperatureUnit: "F" })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  settings.temperatureUnit === "F"
                    ? "bg-amber-400 text-black shadow"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                °F
              </button>
            </div>
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <div className="text-sm font-semibold text-white">
                {isBn ? "ভাষা" : "Language"}
              </div>
              <div className="text-xs text-slate-400">
                {settings.language === "bn" ? "বাংলা" : "English"}
              </div>
            </div>
            <div className="flex bg-white/10 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => onUpdateSettings({ language: "bn" })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  settings.language === "bn"
                    ? "bg-amber-400 text-black shadow"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => onUpdateSettings({ language: "en" })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  settings.language === "en"
                    ? "bg-amber-400 text-black shadow"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Bengali Numerals */}
          {settings.language === "bn" && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <div className="text-sm font-semibold text-white">
                  বাংলা সংখ্যা (১২৩৪)
                </div>
                <div className="text-xs text-slate-400">
                  {settings.useBengaliDigits ? "বাংলা ডিজিট সক্রিয়" : "ইংরেজি ডিজিট (1234)"}
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ useBengaliDigits: !settings.useBengaliDigits })}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  settings.useBengaliDigits ? "bg-amber-400" : "bg-white/20"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-900 transition-transform ${
                    settings.useBengaliDigits ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          )}

          {/* Prayer Times Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <div className="text-sm font-semibold text-white">
                {isBn ? "নামাজের সময়সূচি প্রদর্শন" : "Show Prayer Times Card"}
              </div>
              <div className="text-xs text-slate-400">
                {isBn ? "সূর্যালোক ভিত্তিক হিসাব" : "Astronomical solar calculation"}
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ showPrayerTimes: !settings.showPrayerTimes })}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                settings.showPrayerTimes ? "bg-emerald-500" : "bg-white/20"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-900 transition-transform ${
                  settings.showPrayerTimes ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Browser Severe Weather Notifications */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <div className="text-sm font-semibold text-white">
                {isBn ? "তীব্র আবহাওয়া নোটিফিকেশন" : "Severe Weather Alerts"}
              </div>
              <div className="text-xs text-slate-400">
                {isBn ? "বিএমডি জরুরি সংকেত ব্রাউজারে পান" : "Instant browser alerts for BMD signals"}
              </div>
            </div>
            <button
              onClick={onRequestNotifications}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                settings.browserNotifications
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              {settings.browserNotifications
                ? isBn
                  ? "সক্রিয়"
                  : "Enabled"
                : isBn
                ? "অনুমতি দিন"
                : "Enable"}
            </button>
          </div>
        </div>

        {/* Data Attribution & Licensing Section */}
        <div className="pt-3 border-t border-white/10 text-xs text-slate-400 space-y-1.5">
          <div className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBn ? "উপাত্তের উৎস ও অনুমোদন" : "Data Providers & Transparency"}</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            • <strong>Open-Meteo:</strong> High-resolution ECMWF & GFS weather models under CC BY 4.0.
          </p>
          <p className="text-[11px] leading-relaxed">
            • <strong>BMD:</strong> Marine and inland storm signals under Bangladesh Meteorological Department public advisories.
          </p>
          <p className="text-[11px] leading-relaxed">
            • <strong>Air Quality:</strong> CAMS & Open-Meteo Air Quality integration.
          </p>
        </div>
      </div>
    </div>
  );
};
