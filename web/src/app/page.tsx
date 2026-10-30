"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Cloud,
  MapPin,
  RefreshCw,
  AlertTriangle,
  WifiOff,
  Navigation,
  Compass,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  AirQuality,
  MonsoonData,
  FloodRisk,
  BmdAlert,
  LocationMeta,
  WeatherInsight,
  AppSettings,
} from "@/types/weather";
import { OpenMeteoProvider } from "@/lib/weatherProvider";
import { requestDeviceLocation, reverseGeocode } from "@/lib/locationService";
import { generateWeatherInsights } from "@/lib/weatherInsights";
import { getBengaliDate, toBengaliDigits, calculatePrayerTimes } from "@/data/bengaliCalendar";
import { PixelWeatherHeader } from "@/components/PixelWeatherHeader";
import { PixelHeroCard } from "@/components/PixelHeroCard";
import { WeatherInsightsCard } from "@/components/WeatherInsightsCard";
import { PixelHourlyScroller } from "@/components/PixelHourlyScroller";
import { PixelTenDayForecast } from "@/components/PixelTenDayForecast";
import { PixelMetricCards } from "@/components/PixelMetricCards";
import { BmdAlertBanner } from "@/components/BmdAlertBanner";
import { PrayerTimesWidget } from "@/components/PrayerTimesWidget";
import { LocationSearchModal } from "@/components/LocationSearchModal";
import { SettingsModal } from "@/components/SettingsModal";
import { BmdAlertDetailsModal } from "@/components/BmdAlertDetailsModal";
import { FrontLocationStatusCard } from "@/components/FrontLocationStatusCard";

// Dynamic import for Leaflet map with SSR false to prevent server-side window errors
const BmdAlertZoneMap = dynamic(() => import("@/components/BmdAlertZoneMap"), {
  ssr: false,
  loading: () => (
    <div className="h-96 rounded-3xl bg-slate-900/60 border border-white/10 flex items-center justify-center text-slate-400">
      <RefreshCw className="w-6 h-6 animate-spin text-cyan-400 mr-2" />
      <span>Loading Interactive Map...</span>
    </div>
  ),
});

const DEFAULT_LOCATION: LocationMeta = {
  latitude: 23.8103,
  longitude: 90.4125,
  nameEn: "Dhaka (Capital)",
  nameBn: "ঢাকা (রাজধানী)",
  districtEn: "Dhaka",
  districtBn: "ঢাকা",
  divisionEn: "Dhaka",
  divisionBn: "ঢাকা",
  country: "Bangladesh",
  type: "fallback",
};

const DEFAULT_SETTINGS: AppSettings = {
  temperatureUnit: "C",
  windSpeedUnit: "kmh",
  pressureUnit: "hpa",
  language: "bn",
  useBengaliDigits: true,
  theme: "dark",
  showPrayerTimes: true,
  browserNotifications: false,
};

export default function BengalSkyApp() {
  // App Settings & Preferences
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // Active Location & Geolocation State
  const [location, setLocation] = useState<LocationMeta>(DEFAULT_LOCATION);
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Weather Data States
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFromCache, setIsFromCache] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [hourly, setHourly] = useState<HourlyForecast[]>([]);
  const [daily, setDaily] = useState<DailyForecast[]>([]);
  const [aqi, setAqi] = useState<AirQuality | null>(null);
  const [monsoon, setMonsoon] = useState<MonsoonData | null>(null);
  const [flood, setFlood] = useState<FloodRisk | null>(null);
  const [bmdAlert, setBmdAlert] = useState<BmdAlert | null>(null);

  // Modals
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAlertDetailsModal, setShowAlertDetailsModal] = useState(false);
  const [showMapSection, setShowMapSection] = useState(true);

  const provider = useMemo(() => new OpenMeteoProvider(), []);
  const isBengali = settings.language === "bn";

  // Helpers for number and temperature formatting
  const fmtNum = useCallback(
    (num: number | string) => {
      return isBengali && settings.useBengaliDigits ? toBengaliDigits(num) : String(num);
    },
    [isBengali, settings.useBengaliDigits]
  );

  const fmtTemp = useCallback(
    (celsius: number) => {
      const isF = settings.temperatureUnit === "F";
      const val = isF ? Math.round((celsius * 9) / 5 + 32) : Math.round(celsius);
      const unit = isF ? "°F" : "°C";
      return `${fmtNum(val)}${unit}`;
    },
    [settings.temperatureUnit, fmtNum]
  );

  const bengaliDateInfo = useMemo(() => getBengaliDate(lastUpdated), [lastUpdated]);

  // Pixel Weather Intelligence insights
  const weatherInsights: WeatherInsight[] = useMemo(() => {
    if (!current) return [];
    return generateWeatherInsights(current, hourly, aqi);
  }, [current, hourly, aqi]);

  // Main weather fetch function with localStorage caching
  const loadWeatherData = useCallback(
    async (lat: number, lon: number, isSilent = false) => {
      if (!isSilent) setIsRefreshing(true);
      const cacheKey = `bengal_sky_cache_${lat.toFixed(2)}_${lon.toFixed(2)}`;

      try {
        const result = await provider.fetchWeather(lat, lon);
        setCurrent(result.current);
        setHourly(result.hourly);
        setDaily(result.daily);
        setAqi(result.aqi);
        setMonsoon(result.monsoon);
        setFlood(result.flood);
        setBmdAlert(result.bmdAlert);
        setLastUpdated(new Date());
        setIsFromCache(false);

        // Save fresh data to local cache
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              result,
              timestamp: Date.now(),
            })
          );
        } catch {
          // Ignore quota errors
        }
      } catch (err) {
        console.warn("Live weather fetch failed, checking offline cache:", err);
        // Fallback to cache if available
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const parsed = JSON.parse(cached);
            const r = parsed.result;
            setCurrent(r.current);
            setHourly(r.hourly);
            setDaily(r.daily);
            setAqi(r.aqi);
            setMonsoon(r.monsoon);
            setFlood(r.flood);
            setBmdAlert(r.bmdAlert);
            setIsFromCache(true);
          }
        } catch {
          // Ignore parse errors
        }
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [provider]
  );

  // Request high-accuracy GPS location
  const handleDetectGps = useCallback(async () => {
    setIsGpsLoading(true);
    try {
      const geo = await requestDeviceLocation();
      const resolved = await reverseGeocode(geo.latitude, geo.longitude, geo.accuracy);
      setLocation(resolved);
      await loadWeatherData(geo.latitude, geo.longitude);
    } catch (err: any) {
      console.warn("GPS detection note:", err.message);
      // Keep current location or fallback
    } finally {
      setIsGpsLoading(false);
    }
  }, [loadWeatherData]);

  // Manual location selection from Search modal
  const handleSelectLocation = useCallback(
    async (lat: number, lon: number, nameEn: string, nameBn: string) => {
      const resolved = await reverseGeocode(lat, lon);
      resolved.type = "searched";
      setLocation(resolved);
      await loadWeatherData(lat, lon);
    },
    [loadWeatherData]
  );

  // Request browser notifications for severe BMD alerts
  const handleRequestNotifications = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      alert(isBengali ? "আপনার ব্রাউজার নোটিফিকেশন সমর্থন করে না।" : "Browser does not support notifications.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setSettings((prev) => ({ ...prev, browserNotifications: true }));
      new Notification(isBengali ? "বেঙ্গল স্কাই আবহাওয়া সতর্কতা" : "Bengal Sky Weather Alert", {
        body: isBengali
          ? "তীব্র আবহাওয়া ও ঘূর্ণিঝড় সংকেত নোটিফিকেশন সক্রিয় হয়েছে।"
          : "Severe weather notifications are now enabled.",
        icon: "/favicon.ico",
      });
    } else {
      setSettings((prev) => ({ ...prev, browserNotifications: false }));
    }
  }, [isBengali]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial load: Attempt high-precision GPS detection
    handleDetectGps();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleDetectGps]);

  // Dynamic sky background CSS classes based on weather condition & day/night
  const dynamicBackgroundClass = useMemo(() => {
    if (!current) return "from-slate-950 via-slate-900 to-indigo-950";
    const type = current.condition.type;
    const isDay = current.isDay;

    if (type === "thunderstorm") return "from-slate-950 via-purple-950 to-slate-900";
    if (type === "heavy-rain" || type === "rain") return "from-slate-950 via-cyan-950 to-slate-900";
    if (type === "fog") return "from-slate-900 via-zinc-900 to-slate-950";
    if (!isDay) return "from-slate-950 via-indigo-950 to-slate-900";
    if (type === "sun") return "from-sky-950 via-teal-950 to-slate-950";
    return "from-slate-950 via-slate-900 to-indigo-950";
  }, [current]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${dynamicBackgroundClass} text-slate-100 transition-colors duration-700 font-sans pb-20`}
    >
      {/* Offline Alert Strip */}
      {!isOnline && (
        <div className="bg-amber-500 text-black px-4 py-2 text-xs font-bold flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4" />
          <span>
            {isBengali
              ? "ইন্টারনেট সংযোগ নেই। সংরক্ষিত অফলাইন ডাটা দেখানো হচ্ছে।"
              : "Offline mode active. Showing cached weather data."}
          </span>
        </div>
      )}

      {/* Top Navbar Header */}
      <PixelWeatherHeader
        location={location}
        isBengali={isBengali}
        isRefreshing={isRefreshing}
        onRefresh={() => loadWeatherData(location.latitude, location.longitude)}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
        onToggleLanguage={() =>
          setSettings((prev) => ({
            ...prev,
            language: prev.language === "bn" ? "en" : "bn",
          }))
        }
        useFahrenheit={settings.temperatureUnit === "F"}
        onToggleTempUnit={() =>
          setSettings((prev) => ({
            ...prev,
            temperatureUnit: prev.temperatureUnit === "C" ? "F" : "C",
          }))
        }
      />

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4 py-5 space-y-5">
        {/* Loading Skeleton */}
        {isLoading && !current ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-64 rounded-3xl bg-white/10" />
            <div className="h-32 rounded-3xl bg-white/5" />
            <div className="h-44 rounded-3xl bg-white/5" />
            <div className="h-72 rounded-3xl bg-white/5" />
          </div>
        ) : current ? (
          <>
            {/* 0. Front Location & Current Status Card */}
            <FrontLocationStatusCard
              location={location}
              current={current}
              isGpsLoading={isGpsLoading}
              isRefreshing={isRefreshing}
              isBengali={isBengali}
              fmtTemp={fmtTemp}
              fmtNum={fmtNum}
              onDetectGps={handleDetectGps}
              onOpenSearch={() => setShowSearchModal(true)}
              onRefresh={() => loadWeatherData(location.latitude, location.longitude)}
            />

            {/* 1. Hero Weather Card */}
            <PixelHeroCard
              current={current}
              todayForecast={daily[0]}
              location={location}
              bengaliDate={bengaliDateInfo}
              isBengali={isBengali}
              fmtTemp={fmtTemp}
              fmtNum={fmtNum}
              onDetectGps={handleDetectGps}
              isGpsLoading={isGpsLoading}
            />

            {/* 2. Pixel Weather Intelligence Summary */}
            <WeatherInsightsCard insights={weatherInsights} isBengali={isBengali} />

            {/* 3. Severe BMD Alert Banner (Only when active warning is in effect) */}
            {bmdAlert && bmdAlert.isActive && (
              <BmdAlertBanner
                alert={bmdAlert}
                isBengali={isBengali}
                onOpenMap={() => {
                  setShowMapSection(true);
                  const el = document.getElementById("bmd-map-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                onOpenDetails={() => setShowAlertDetailsModal(true)}
              />
            )}

            {/* 4. Hourly Weather Scroller */}
            <PixelHourlyScroller
              hourly={hourly}
              isBengali={isBengali}
              fmtTemp={fmtTemp}
              fmtNum={fmtNum}
            />

            {/* 5. 10-Day Forecast & Bengali Calendar */}
            <PixelTenDayForecast
              daily={daily}
              isBengali={isBengali}
              fmtTemp={fmtTemp}
              fmtNum={fmtNum}
            />

            {/* 6. Modular Weather Metrics Grid */}
            <PixelMetricCards
              current={current}
              todayForecast={daily[0]}
              aqi={aqi}
              monsoon={monsoon}
              flood={flood}
              isBengali={isBengali}
              fmtTemp={fmtTemp}
              fmtNum={fmtNum}
              useFahrenheit={settings.temperatureUnit === "F"}
            />

            {/* 7. Astronomical Prayer Times Widget */}
            {settings.showPrayerTimes && (
              <PrayerTimesWidget
                lat={location.latitude}
                lon={location.longitude}
                isBengali={isBengali}
                useBengaliDigits={settings.useBengaliDigits}
                onDismiss={() => setSettings((prev) => ({ ...prev, showPrayerTimes: false }))}
              />
            )}

            {/* 8. Interactive BMD Alert Zone Map */}
            <div id="bmd-map-section" className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                    {isBengali ? "বিএমডি উপকূল ও বিভাগীয় সতর্কতা মানচিত্র" : "BMD Division & Maritime Alert Map"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowMapSection(!showMapSection)}
                  className="text-xs text-amber-400 hover:underline font-semibold"
                >
                  {showMapSection
                    ? isBengali
                      ? "লুকান"
                      : "Hide Map"
                    : isBengali
                    ? "দেখুন"
                    : "Show Map"}
                </button>
              </div>

              {showMapSection && (
                <div className="rounded-3xl overflow-hidden border border-white/10 shadow-xl">
                  <BmdAlertZoneMap
                    isBengali={isBengali}
                    useBengaliDigits={settings.useBengaliDigits}
                    onSelectCoordinates={handleSelectLocation}
                  />
                </div>
              )}
            </div>

            {/* 9. Provider Attribution Footer */}
            <footer className="pt-6 pb-2 text-center text-xs text-slate-500 space-y-1">
              <p>
                {isBengali
                  ? "আবহাওয়া উপাত্ত: Open-Meteo (ECMWF & GFS) • সতর্ক সংকেত: বাংলাদেশ আবহাওয়া অধিদপ্তর (BMD)"
                  : "Weather: Open-Meteo (ECMWF & GFS) • Alerts: Bangladesh Meteorological Department (BMD)"}
              </p>
              <p className="text-[11px] text-slate-600">
                {isBengali
                  ? `সর্বশেষ হালনাগাদ: ${lastUpdated.toLocaleTimeString()}`
                  : `Last synced: ${lastUpdated.toLocaleTimeString()}`}
                {isFromCache ? " (Cached)" : " (Live)"}
              </p>
            </footer>
          </>
        ) : null}
      </main>

      {/* Modals */}
      <LocationSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectLocation={handleSelectLocation}
        onDetectGps={handleDetectGps}
        isGpsLoading={isGpsLoading}
        isBengali={isBengali}
        currentLat={location.latitude}
        currentLon={location.longitude}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings((prev) => ({ ...prev, ...newSettings }))}
        onRequestNotifications={handleRequestNotifications}
      />

      {bmdAlert && (
        <BmdAlertDetailsModal
          isOpen={showAlertDetailsModal}
          onClose={() => setShowAlertDetailsModal(false)}
          alert={bmdAlert}
          isBengali={isBengali}
        />
      )}
    </div>
  );
}
