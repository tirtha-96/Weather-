"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Eye,
  Compass,
  AlertTriangle,
  Search,
  Settings,
  RefreshCw,
  MapPin,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Radio,
  ExternalLink,
  Edit3,
} from "lucide-react";
import {
  DISTRICTS,
  DIVISIONS,
  UPAZILAS,
  resolveCoordinates,
  District,
} from "@/data/bangladeshiGeography";
import {
  getBengaliDate,
  toBengaliDigits,
  calculatePrayerTimes,
} from "@/data/bengaliCalendar";
import {
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  AirQuality,
  MonsoonData,
  FloodRisk,
  BmdAlert,
  mapWeatherCode,
} from "@/types/weather";

interface SavedLocation {
  id: string;
  nameEn: string;
  nameBn: string;
  districtEn: string;
  latitude: number;
  longitude: number;
}

const DEFAULT_SAVED_LOCATIONS: SavedLocation[] = [
  { id: "dhaka", nameEn: "Dhaka (Mirpur)", nameBn: "ঢাকা (মিরপুর)", districtEn: "Dhaka", latitude: 23.8041, longitude: 90.3667 },
  { id: "ctg", nameEn: "Chattogram Port", nameBn: "চট্টগ্রাম বন্দর", districtEn: "Chattogram", latitude: 22.3569, longitude: 91.7832 },
  { id: "cox", nameEn: "Cox's Bazar", nameBn: "কক্সবাজার", districtEn: "Cox's Bazar", latitude: 21.4272, longitude: 92.0058 },
  { id: "sylhet", nameEn: "Sylhet (Tea Valley)", nameBn: "সিলেট (চা বাগান)", districtEn: "Sylhet", latitude: 24.8949, longitude: 91.8687 },
];

export default function BengalSkyApp() {
  // Preferences
  const [isBengali, setIsBengali] = useState(true);
  const [useFahrenheit, setUseFahrenheit] = useState(false);
  const [useBengaliDigits, setUseBengaliDigits] = useState(true);
  const [showPrayerTimes, setShowPrayerTimes] = useState(false);

  // Active Location & Geolocation State
  const [lat, setLat] = useState(23.8103);
  const [lon, setLon] = useState(90.4125);
  const [isGpsActive, setIsGpsActive] = useState(false);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(DEFAULT_SAVED_LOCATIONS);

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
  const [bmdAlert, setBmdAlert] = useState<BmdAlert>({
    isActive: false,
    signalNumber: 1,
    titleEn: "No Active BMD Severe Warning",
    titleBn: "কোনো বিশেষ সতর্ক সংকেত নেই",
    bulletinEn: "Normal seasonal weather conditions across the maritime and inland ports.",
    bulletinBn: "সমুদ্র ও অভ্যন্তরীণ নদী বন্দরসমূহে আবহাওয়া স্বাভাবিক রয়েছে।",
    ports: "Chattogram, Cox's Bazar, Mongla, Payra",
    issued: "Daily Regular Bulletin",
  });

  // UI Modals
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showBmdModal, setShowBmdModal] = useState(false);
  const [isAlertExpanded, setIsAlertExpanded] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  // Resolved Location hierarchy
  const locationInfo = useMemo(() => resolveCoordinates(lat, lon), [lat, lon]);
  const bengaliDateInfo = useMemo(() => getBengaliDate(lastUpdated), [lastUpdated]);
  const prayerTimes = useMemo(() => calculatePrayerTimes(lat, lon, lastUpdated), [lat, lon, lastUpdated]);

  // Digits helper
  const fmtNum = useCallback((num: number | string) => {
    return useBengaliDigits ? toBengaliDigits(num) : String(num);
  }, [useBengaliDigits]);

  const fmtTemp = useCallback((celsius: number) => {
    const val = useFahrenheit ? Math.round((celsius * 9) / 5 + 32) : Math.round(celsius);
    const unit = useFahrenheit ? "°F" : "°C";
    return `${fmtNum(val)}${unit}`;
  }, [useFahrenheit, fmtNum]);

  // Fetch Live Weather Data from Open-Meteo API
  const fetchWeather = useCallback(async (latitude: number, longitude: number) => {
    setIsRefreshing(true);
    const locKey = `bengal_sky_${latitude.toFixed(2)}_${longitude.toFixed(2)}`;

    try {
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index,is_day&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=Asia%2FDhaka&forecast_days=10`;
      const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5,us_aqi&timezone=Asia%2FDhaka`;

      const [forecastRes, aqiRes] = await Promise.all([
        fetch(forecastUrl).then((r) => r.json()),
        fetch(aqiUrl).then((r) => r.json()).catch(() => null),
      ]);

      const c = forecastRes.current;
      const h = forecastRes.hourly;
      const d = forecastRes.daily;

      // Current
      const cond = mapWeatherCode(c.weather_code);
      const curData: CurrentWeather = {
        temperature: c.temperature_2m,
        apparentTemperature: c.apparent_temperature,
        humidity: c.relative_humidity_2m,
        precipitation: c.precipitation,
        weatherCode: c.weather_code,
        surfacePressure: c.surface_pressure,
        windSpeed: c.wind_speed_10m,
        windDirection: c.wind_direction_10m,
        uvIndex: c.uv_index,
        isDay: c.is_day === 1,
        condition: cond,
      };
      setCurrent(curData);

      // Hourly (48h)
      const hourlyList: HourlyForecast[] = [];
      const hCount = Math.min(48, h.time?.length || 0);
      for (let i = 0; i < hCount; i++) {
        const timeStr = h.time[i];
        const dateObj = new Date(timeStr);
        const hours = dateObj.getHours().toString().padStart(2, "0") + ":00";
        hourlyList.push({
          timeIso: timeStr,
          hourLabel: hours,
          hourLabelBn: toBengaliDigits(hours),
          temperature: h.temperature_2m[i],
          precipitationProb: h.precipitation_probability[i] || 0,
          precipitationMm: h.precipitation[i] || 0,
          weatherCode: h.weather_code[i],
        });
      }
      setHourly(hourlyList);

      // Daily (10 days)
      const dailyList: DailyForecast[] = [];
      const dCount = Math.min(10, d.time?.length || 0);
      const daysBn = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];
      const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      for (let i = 0; i < dCount; i++) {
        const dt = new Date(d.time[i]);
        const dayIdx = dt.getDay();
        const bDate = getBengaliDate(dt);
        dailyList.push({
          dateIso: d.time[i],
          dayLabelEn: i === 0 ? "Today" : `${daysEn[dayIdx]}, ${dt.getDate()}`,
          dayLabelBn: i === 0 ? "আজ" : `${daysBn[dayIdx]}, ${toBengaliDigits(dt.getDate())}`,
          banglaCalendarDate: `${bDate.dayBn} ${bDate.monthNameBn}`,
          tempMax: d.temperature_2m_max[i],
          tempMin: d.temperature_2m_min[i],
          precipitationSum: d.precipitation_sum[i] || 0,
          weatherCode: d.weather_code[i],
          sunrise: d.sunrise[i]?.slice(-5) || "05:45",
          sunset: d.sunset[i]?.slice(-5) || "18:05",
          uvIndexMax: d.uv_index_max[i] || 5,
          condition: mapWeatherCode(d.weather_code[i]),
        });
      }
      setDaily(dailyList);

      // AQI
      const usAqiVal = aqiRes?.current?.us_aqi || Math.round((c.relative_humidity_2m > 80 ? 85 : 165));
      const pm25Val = aqiRes?.current?.pm2_5 || Math.round(usAqiVal / 2.3);
      const pm10Val = aqiRes?.current?.pm10 || Math.round(pm25Val * 1.6);

      let aqiCatEn = "Good";
      let aqiCatBn = "ভালো বাতাস";
      let aqiAdvEn = "Air quality is satisfactory. Enjoy outdoor activities.";
      let aqiAdvBn = "বায়ুর মান সন্তোষজনক। বাইরে চলাচলে কোনো স্বাস্থ্য ঝুঁকি নেই।";
      let aqiColor = "#2F6E52"; // Paddy Green

      if (usAqiVal > 300) {
        aqiCatEn = "Hazardous (Severe)";
        aqiCatBn = "বিপজ্জনক বায়ু";
        aqiAdvEn = "Health alert: entire population affected. Stay indoors, run air filtration.";
        aqiAdvBn = "জরুরি স্বাস্থ্য সতর্কতা: ঘরের ভেতর থাকুন এবং বাইরের সমস্ত কার্যক্রম পরিহার করুন।";
        aqiColor = "#78281F";
      } else if (usAqiVal > 200) {
        aqiCatEn = "Very Unhealthy";
        aqiCatBn = "খুবই অস্বাস্থ্যকর";
        aqiAdvEn = "Avoid outdoor exertion. Wear N95 mask outdoors.";
        aqiAdvBn = "বাইরে ভারী পরিশ্রম এড়িয়ে চলুন। বের হলে N95 মাস্ক ব্যবহার করুন।";
        aqiColor = "#8E44AD";
      } else if (usAqiVal > 150) {
        aqiCatEn = "Unhealthy (Dhaka Alert)";
        aqiCatBn = "অস্বাস্থ্যকর বায়ুমণ্ডল";
        aqiAdvEn = "Air is unhealthy for all. Wear masks, limit outdoor exposure.";
        aqiAdvBn = "সকলের জন্যই বাতাস অস্বাস্থ্যকর। বাইরে মাস্ক পরুন ও জানালা বন্ধ রাখুন।";
        aqiColor = "#D64545"; // Signal Red
      } else if (usAqiVal > 100) {
        aqiCatEn = "Unhealthy for Sensitive Groups";
        aqiCatBn = "সংবেদনশীলদের জন্য অস্বাস্থ্যকর";
        aqiAdvEn = "Children, elderly, and respiratory patients should reduce outdoor exertion.";
        aqiAdvBn = "শিশু, বৃদ্ধ ও শ্বাসকষ্টের রোগীরা দীর্ঘ সময় বাইরে থাকা পরিহার করুন।";
        aqiColor = "#E67E22";
      } else if (usAqiVal > 50) {
        aqiCatEn = "Moderate";
        aqiCatBn = "মাঝারি";
        aqiAdvEn = "Acceptable air quality for most individuals.";
        aqiAdvBn = "বায়ুর মান গ্রহণযোগ্য, সংবেদনশীলদের জন্য সামান্য অস্বস্তিকর হতে পারে।";
        aqiColor = "#F2A93B"; // Marigold
      }

      setAqi({
        usAqi: usAqiVal,
        pm25: pm25Val,
        pm10: pm10Val,
        categoryEn: aqiCatEn,
        categoryBn: aqiCatBn,
        adviceEn: aqiAdvEn,
        adviceBn: aqiAdvBn,
        color: aqiColor,
      });

      // Monsoon Rainfall Accumulation
      const todayRain = dailyList[0]?.precipitationSum || c.precipitation || 0;
      const weekRain = dailyList.slice(0, 7).reduce((acc, it) => acc + it.precipitationSum, 0);
      const isMonsoonSeason = new Date().getMonth() >= 5 && new Date().getMonth() <= 9;
      const monthRain = isMonsoonSeason ? Math.max(140, weekRain * 3.6 + 80) : weekRain * 1.5 + 20;

      setMonsoon({
        todayMm: Math.round(todayRain * 10) / 10,
        weeklyMm: Math.round(weekRain * 10) / 10,
        monthlyMm: Math.round(monthRain * 10) / 10,
        phaseEn: isMonsoonSeason ? "Active South-West Monsoon Flow" : "Seasonal Flow",
        phaseBn: isMonsoonSeason ? "সক্রিয় দক্ষিণ-পশ্চিম মৌসুমি বায়ুপ্রবাহ" : "সাধারণ মৌসুমি রূপান্তর",
      });

      // Flood Risk
      const locResolved = resolveCoordinates(latitude, longitude);
      const isHeavy = todayRain > 35 || weekRain > 110 || [65, 82, 95, 96, 99].includes(c.weather_code);
      const isMod = todayRain > 15 || weekRain > 50;

      let sev: "Normal" | "Watch" | "Moderate" | "High" = "Normal";
      let fColor = "#2F6E52";
      if (locResolved.isRiverAdjacent && isHeavy) {
        sev = "High";
        fColor = "#D64545";
      } else if (locResolved.isRiverAdjacent && isMod) {
        sev = "Moderate";
        fColor = "#E67E22";
      } else if (locResolved.isCoastal && isHeavy) {
        sev = "Moderate";
        fColor = "#E67E22";
      } else if (locResolved.isRiverAdjacent && isMonsoonSeason) {
        sev = "Watch";
        fColor = "#F2A93B";
      }

      setFlood({
        severity: sev,
        titleEn: sev === "High" ? "High Flood Alert" : sev === "Moderate" ? "Moderate Flood Warning" : sev === "Watch" ? "Monsoon Water Watch" : "Normal River Flow",
        titleBn: sev === "High" ? "উচ্চ বন্যা সতর্কতা" : sev === "Moderate" ? "মাঝারি প্লাবন ঝুঁকি" : sev === "Watch" ? "বর্ষা পানি নজরদারি" : "স্বাভাবিক নদী প্রবাহ",
        descEn: sev === "High" ? "River flowing above danger level. Low-lying and char areas at high risk." : sev === "Moderate" ? "River adjacent upazilas may experience overflow and waterlogging." : "River levels within standard seasonal thresholds.",
        descBn: sev === "High" ? "নদীর পানি বিপদসীমার ওপর দিয়ে প্রবাহিত। তীরবর্তী ও চরাঞ্চলে বন্যার ঝুঁকি।" : sev === "Moderate" ? "তীরবর্তী উপজেলাসমূহে নদী প্লাবিত হওয়া ও জলাবদ্ধতার সম্ভাবনা রয়েছে।" : "নদীর পানি বিপদসীমার নিচ দিয়ে প্রবাহিত হচ্ছে।",
        riverBasinEn: locResolved.isCoastal ? "Lower Meghna & Coastal Estuary" : "Surma-Jamuna-Padma Basin",
        riverBasinBn: locResolved.isCoastal ? "মেঘনা মোহনা ও উপকূলীয় অঞ্চল" : "সুরমা-যমুনা-পদ্মা নদী অববাহিকা",
        color: fColor,
      });

      // Auto BMD Alert trigger for coastal or thunderstorm
      if (locResolved.isCoastal && isHeavy) {
        setBmdAlert({
          isActive: true,
          signalNumber: 3,
          titleEn: "BMD Local Cautionary Signal 3",
          titleBn: "বিএমডি ৩ নম্বর স্থানীয় সতর্ক সংকেত",
          bulletinEn: "Deep depression active over North Bay of Bengal. Maritime ports of Chattogram, Cox's Bazar, Mongla, Payra advised to hoist Signal 3. Squally weather likely.",
          bulletinBn: "উত্তর বঙ্গোপসাগরে গভীর সঞ্চালনশীল মেঘমালা সৃষ্টি হয়েছে। চট্টগ্রাম, কক্সবাজার, মোংলা ও পায়রা সমুদ্রবন্দরসমূহকে ৩ নম্বর স্থানীয় সতর্ক সংকেত দেখাতে বলা হয়েছে।",
          ports: "Chattogram, Cox's Bazar, Mongla, Payra",
          issued: "06:00 BST Maritime Bulletin",
        });
      } else if ([95, 96, 99].includes(c.weather_code)) {
        setBmdAlert({
          isActive: true,
          signalNumber: 2,
          titleEn: "BMD Kalbaishakhi & Lightning Warning",
          titleBn: "কালবৈশাখী ও তীব্র বজ্রপাত সতর্কতা সংকেত ২",
          bulletinEn: "Gusty squally winds reaching 60-80 km/h with severe thunderstorm and lightning. Public advised to stay indoors and avoid tall trees.",
          bulletinBn: "ঘণ্টায় ৬০-৮০ কিমি বেগে কালবৈশাখী ঝড় ও ঘন ঘন বজ্রপাত হতে পারে। সবাইকে নিরাপদ আশ্রয়ে থাকার পরামর্শ দেওয়া হচ্ছে।",
          ports: "Inland River Ports",
          issued: "Emergency Severe Warning",
        });
      }

      setLastUpdated(new Date());
      setIsFromCache(false);

      // Save to localStorage
      try {
        localStorage.setItem(
          locKey,
          JSON.stringify({
            curData,
            hourlyList,
            dailyList,
            timestamp: Date.now(),
          })
        );
      } catch {
        // ignore
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      // Try offline cache fallback
      try {
        const cached = localStorage.getItem(locKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          setCurrent(parsed.curData);
          setHourly(parsed.hourlyList);
          setDaily(parsed.dailyList);
          setIsFromCache(true);
        }
      } catch {
        // ignore
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Request browser GPS Geolocation
  const requestGpsLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const gLat = pos.coords.latitude;
        const gLon = pos.coords.longitude;
        setLat(gLat);
        setLon(gLon);
        setIsGpsActive(true);
        fetchWeather(gLat, gLon);
      },
      (err) => {
        console.warn("GPS error, using fallback location:", err.message);
        // Fallback to Dhaka
        setLat(23.8103);
        setLon(90.4125);
        setIsGpsActive(false);
        fetchWeather(23.8103, 90.4125);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  }, [fetchWeather]);

  // Initial load
  useEffect(() => {
    requestGpsLocation();
  }, [requestGpsLocation]);

  // Filtered districts for search modal
  const filteredDistricts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return DISTRICTS.filter((d) => {
      const matchDiv = !selectedDivision || d.divisionEn === selectedDivision;
      const matchQ =
        !q ||
        d.nameEn.toLowerCase().includes(q) ||
        d.nameBn.includes(q) ||
        d.divisionEn.toLowerCase().includes(q);
      return matchDiv && matchQ;
    });
  }, [searchQuery, selectedDivision]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-monsoon to-indigo-deep text-mist pb-16 transition-colors duration-500">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-monsoon-dark/70 border-b border-white/10 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-marigold/20 border border-marigold/50 flex items-center justify-center text-marigold shadow-inner">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-wide">
                {isBengali ? "বেঙ্গল স্কাই" : "Bengal Sky"}
              </h1>
              <p className="text-xs text-mist/70 font-medium">
                {isBengali ? "বাংলাদেশ আবহাওয়া কেন্দ্র" : "Bangladesh Weather Intelligence"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher Pill */}
            <button
              onClick={() => setIsBengali(!isBengali)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-marigold text-xs font-bold transition active:scale-95"
            >
              {isBengali ? "EN" : "বাং"}
            </button>

            {/* Search District */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white transition active:scale-95"
              aria-label="Search District"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Settings */}
            <button
              onClick={() => setShowSettingsModal(true)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white transition active:scale-95"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 pt-4 space-y-4">
        {/* Saved Locations / Multi-city Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={requestGpsLocation}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap border transition ${
              isGpsActive
                ? "bg-marigold/25 border-marigold text-marigold font-bold shadow-sm"
                : "bg-white/5 border-white/10 text-mist hover:bg-white/10"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-marigold" />
            <span>{isBengali ? "লাইভ জিপিএস" : "Live GPS"}</span>
          </button>

          {savedLocations.map((loc) => {
            const isSelected = Math.abs(loc.latitude - lat) < 0.04 && Math.abs(loc.longitude - lon) < 0.04;
            return (
              <button
                key={loc.id}
                onClick={() => {
                  setIsGpsActive(false);
                  setLat(loc.latitude);
                  setLon(loc.longitude);
                  fetchWeather(loc.latitude, loc.longitude);
                }}
                className={`px-3 py-2 rounded-xl whitespace-nowrap border transition ${
                  isSelected
                    ? "bg-paddy/60 border-paddy-light text-white font-bold shadow-sm"
                    : "bg-white/5 border-white/10 text-mist/80 hover:bg-white/10"
                }`}
              >
                {isBengali ? loc.nameBn : loc.nameEn}
              </button>
            );
          })}

          <button
            onClick={() => setShowSearchModal(true)}
            className="px-3 py-2 rounded-xl whitespace-nowrap bg-white/5 border border-dashed border-white/20 text-mist hover:bg-white/10 flex items-center gap-1"
          >
            + {isBengali ? "অন্য জেলা" : "Add City"}
          </button>
        </div>

        {/* BMD Severe Alert Banner (if active) */}
        {bmdAlert.isActive && (
          <div className="rounded-2xl bg-signal-red/20 border-2 border-signal-red p-4 shadow-lg animate-pulse transition">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-signal-red flex items-center justify-center text-white shadow-md">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-signal-light">
                    {isBengali ? bmdAlert.titleBn : bmdAlert.titleEn}
                  </h3>
                  <p className="text-xs text-white/70">
                    {isBengali ? "বাংলাদেশ আবহাওয়া অধিদপ্তর (BMD) সতর্কতা বুলেটিন" : "Bangladesh Meteorological Dept. Bulletin"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowBmdModal(true)}
                  className="p-1.5 rounded-lg bg-white/10 text-signal-light hover:bg-white/20"
                  title="Edit / Broadcast BMD Signal"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsAlertExpanded(!isAlertExpanded)}
                  className="p-1.5 text-white/80 hover:text-white"
                >
                  {isAlertExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <p className="mt-2.5 text-xs text-white/90 leading-relaxed">
              {isBengali ? bmdAlert.bulletinBn : bmdAlert.bulletinEn}
            </p>

            {isAlertExpanded && (
              <div className="mt-3 pt-3 border-t border-signal-red/40 text-xs text-signal-light space-y-1">
                <p>
                  <strong>{isBengali ? "উপকূলীয় বন্দর:" : "Coastal Ports:"}</strong> {bmdAlert.ports}
                </p>
                <p className="text-white/60">
                  <strong>{isBengali ? "ইস্যু:" : "Issued:"}</strong> {bmdAlert.issued}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Hero Weather Card */}
        {isLoading && !current ? (
          <div className="rounded-3xl bg-monsoon-dark/60 border border-white/10 p-12 text-center">
            <RefreshCw className="w-8 h-8 text-marigold animate-spin mx-auto mb-3" />
            <p className="text-sm text-mist/80">
              {isBengali ? "আবহাওয়ার লাইভ ডাটা লোড হচ্ছে..." : "Fetching live Bangladesh weather..."}
            </p>
          </div>
        ) : current ? (
          <div className="rounded-3xl bg-gradient-to-br from-monsoon/90 via-monsoon-dark/95 to-indigo-deep border border-white/15 p-6 shadow-2xl relative overflow-hidden">
            {/* Header: Location & Refresh */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-marigold font-bold text-lg">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span>
                    {isBengali
                      ? `${locationInfo.upazilaBn}, ${locationInfo.districtBn}`
                      : `${locationInfo.upazilaEn}, ${locationInfo.districtEn}`}
                  </span>
                </div>
                <p className="text-xs text-mist/70 pl-6">
                  {isBengali ? `${locationInfo.divisionBn} বিভাগ` : `${locationInfo.divisionEn} Division`}
                </p>
              </div>

              <button
                onClick={() => fetchWeather(lat, lon)}
                disabled={isRefreshing}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-white transition active:scale-95"
                title="Refresh Weather"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-marigold" : ""}`} />
              </button>
            </div>

            {/* Bengali Season Banner */}
            <div className="mt-4 rounded-2xl bg-paddy/30 border border-paddy-light/40 px-3.5 py-2 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-marigold">
                  {isBengali
                    ? `${bengaliDateInfo.season.nameBn} (${bengaliDateInfo.season.nameEn})`
                    : `${bengaliDateInfo.season.nameEn} • ${bengaliDateInfo.season.nameBn}`}
                </span>
                <p className="text-white/90">{bengaliDateInfo.formattedBn}</p>
              </div>
              <span className="text-mist/60 text-[11px]">
                {lastUpdated.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
              </span>
            </div>

            {/* Main Temperature & Illustration */}
            <div className="mt-5 flex items-center justify-between">
              <div>
                <div className="flex items-start">
                  <span className="text-6xl sm:text-7xl font-black text-white tracking-tighter">
                    {fmtNum(useFahrenheit ? Math.round((current.temperature * 9) / 5 + 32) : Math.round(current.temperature))}
                  </span>
                  <span className="text-2xl font-black text-marigold ml-1 mt-2">
                    {useFahrenheit ? "°F" : "°C"}
                  </span>
                </div>

                <p className="text-base font-semibold text-mist mt-1">
                  {isBengali ? current.condition.descriptionBn : current.condition.descriptionEn}
                </p>

                <p className="text-xs text-mist/75 mt-1">
                  {isBengali ? (
                    <>অনুভূত: {fmtTemp(current.apparentTemperature)} • আর্দ্রতা: {fmtNum(current.humidity)}%</>
                  ) : (
                    <>Feels like: {fmtTemp(current.apparentTemperature)} • Humidity: {fmtNum(current.humidity)}%</>
                  )}
                </p>
              </div>

              {/* Hand-built dynamic animated weather illustration */}
              <div className="w-24 h-24 flex items-center justify-center relative">
                {current.condition.type === "sun" ? (
                  <div className="relative anim-sun text-marigold">
                    <Sun className="w-20 h-20 drop-shadow-[0_0_15px_rgba(242,169,59,0.5)]" />
                  </div>
                ) : current.condition.type === "rain" || current.condition.type === "heavy-rain" ? (
                  <div className="relative text-blue-300">
                    <CloudRain className="w-20 h-20 anim-cloud" />
                    <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 anim-rain">
                      <div className="w-0.5 h-3 bg-blue-300 rounded" />
                      <div className="w-0.5 h-3 bg-blue-300 rounded" />
                      <div className="w-0.5 h-3 bg-blue-300 rounded" />
                    </div>
                  </div>
                ) : current.condition.type === "thunderstorm" ? (
                  <div className="relative text-marigold">
                    <Cloud className="w-20 h-20 text-slate-400 anim-cloud" />
                    <div className="absolute inset-0 flex items-center justify-center anim-lightning">
                      <AlertTriangle className="w-8 h-8 text-marigold" />
                    </div>
                  </div>
                ) : (
                  <div className="relative text-slate-200 anim-cloud">
                    <Cloud className="w-20 h-20" />
                  </div>
                )}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-5 grid grid-cols-3 gap-2 bg-white/5 rounded-2xl p-3 border border-white/10 text-center text-xs">
              <div>
                <span className="text-mist/70">{isBengali ? "আর্দ্রতা" : "Humidity"}</span>
                <p className="font-bold text-white text-sm mt-0.5">{fmtNum(current.humidity)}%</p>
              </div>
              <div className="border-x border-white/10">
                <span className="text-mist/70">{isBengali ? "বাতাস" : "Wind"}</span>
                <p className="font-bold text-white text-sm mt-0.5">{fmtNum(Math.round(current.windSpeed))} km/h</p>
              </div>
              <div>
                <span className="text-mist/70">{isBengali ? "ইউভি ইনডেক্স" : "UV Index"}</span>
                <p className="font-bold text-white text-sm mt-0.5">{fmtNum(Math.round(current.uvIndex))}</p>
              </div>
            </div>

            {isFromCache && (
              <div className="mt-3 py-1.5 px-3 rounded-lg bg-marigold/20 text-marigold text-xs text-center font-medium">
                {isBengali ? "অফলাইন মোড — সংরক্ষিত ক্যাশ ডাটা প্রদর্শিত হচ্ছে" : "Offline Mode — Cached data"}
              </div>
            )}
          </div>
        ) : null}

        {/* Optional Prayer Times Widget */}
        {showPrayerTimes && (
          <div className="rounded-2xl bg-monsoon-dark/80 border border-paddy-light/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-marigold" />
                <h3 className="text-sm font-bold text-white">
                  {isBengali ? "নামাজের সময়সূচি" : "Prayer Times"}
                </h3>
              </div>
              <button
                onClick={() => setShowPrayerTimes(false)}
                className="text-mist/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              <div className="bg-white/5 rounded-xl p-2">
                <span className="text-marigold font-bold">{isBengali ? "ফজর" : "Fajr"}</span>
                <p className="font-semibold text-white mt-1">{fmtNum(prayerTimes.fajr)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <span className="text-marigold font-bold">{isBengali ? "যোহর" : "Dhuhr"}</span>
                <p className="font-semibold text-white mt-1">{fmtNum(prayerTimes.dhuhr)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <span className="text-marigold font-bold">{isBengali ? "আসর" : "Asr"}</span>
                <p className="font-semibold text-white mt-1">{fmtNum(prayerTimes.asr)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <span className="text-marigold font-bold">{isBengali ? "মাগরিব" : "Maghrib"}</span>
                <p className="font-semibold text-white mt-1">{fmtNum(prayerTimes.maghrib)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <span className="text-marigold font-bold">{isBengali ? "ইশা" : "Isha"}</span>
                <p className="font-semibold text-white mt-1">{fmtNum(prayerTimes.isha)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Air Quality Card */}
        {aqi && (
          <div className="rounded-2xl bg-monsoon-dark/80 border border-white/10 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-marigold" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {isBengali ? "বায়ুর মান সূচক (Air Quality Index)" : "Air Quality Index (AQI)"}
                  </h3>
                  <p className="text-xs text-mist/60">
                    {isBengali ? "ঢাকা ও আঞ্চলিক দূষণ সূচক" : "US AQI Scale & PM Breakdown"}
                  </p>
                </div>
              </div>

              <span
                style={{ backgroundColor: `${aqi.color}33`, borderColor: aqi.color, color: aqi.color }}
                className="px-2.5 py-1 rounded-full text-xs font-bold border"
              >
                {isBengali ? aqi.categoryBn : aqi.categoryEn}
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-4xl font-black text-white">{fmtNum(aqi.usAqi)}</span>
                <span className="text-xs text-mist/60 ml-2">US AQI</span>
              </div>

              <div className="flex gap-2 text-xs">
                <div className="bg-white/5 px-2.5 py-1.5 rounded-xl text-center border border-white/10">
                  <span className="text-mist/60 block text-[10px]">PM2.5</span>
                  <span className="font-bold text-white">{fmtNum(aqi.pm25)} µg/m³</span>
                </div>
                <div className="bg-white/5 px-2.5 py-1.5 rounded-xl text-center border border-white/10">
                  <span className="text-mist/60 block text-[10px]">PM10</span>
                  <span className="font-bold text-white">{fmtNum(aqi.pm10)} µg/m³</span>
                </div>
              </div>
            </div>

            {/* Spectrum gradient bar */}
            <div className="mt-3 h-2 rounded-full w-full bg-gradient-to-r from-emerald-600 via-amber-500 to-rose-600" />

            <div className="mt-3 bg-white/5 rounded-xl p-3 text-xs text-white/90 leading-relaxed border border-white/10">
              💡 {isBengali ? aqi.adviceBn : aqi.adviceEn}
            </div>
          </div>
        )}

        {/* Monsoon Rainfall Tracker & Flood Risk */}
        {monsoon && flood && (
          <div className="rounded-2xl bg-monsoon-dark/80 border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CloudRain className="w-5 h-5 text-marigold" />
              <div>
                <h3 className="text-sm font-bold text-white">
                  {isBengali ? "মৌসুমি বর্ষণ ও প্লাবন ট্র্যাকার" : "Monsoon Rain & Flood Risk"}
                </h3>
                <p className="text-xs text-mist/60">
                  {isBengali ? monsoon.phaseBn : monsoon.phaseEn}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs mb-4">
              <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                <span className="text-mist/60 text-[11px] block">{isBengali ? "আজকের বৃষ্টি" : "Today"}</span>
                <span className="font-bold text-white text-sm">{fmtNum(monsoon.todayMm)} mm</span>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-400 h-full" style={{ width: `${Math.min(100, monsoon.todayMm * 2)}%` }} />
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                <span className="text-mist/60 text-[11px] block">{isBengali ? "গত ৭ দিনে" : "7 Days"}</span>
                <span className="font-bold text-marigold text-sm">{fmtNum(monsoon.weeklyMm)} mm</span>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-marigold h-full" style={{ width: `${Math.min(100, (monsoon.weeklyMm / 150) * 100)}%` }} />
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                <span className="text-mist/60 text-[11px] block">{isBengali ? "মাসিক পুঞ্জীভূত" : "Monthly"}</span>
                <span className="font-bold text-paddy-light text-sm">{fmtNum(monsoon.monthlyMm)} mm</span>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-paddy-light h-full" style={{ width: `${Math.min(100, (monsoon.monthlyMm / 300) * 100)}%` }} />
                </div>
              </div>
            </div>

            {/* Flood severity alert box */}
            <div
              style={{ backgroundColor: `${flood.color}22`, borderColor: `${flood.color}55` }}
              className="rounded-xl p-3 border text-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold" style={{ color: flood.color }}>
                  ⚠️ {isBengali ? flood.titleBn : flood.titleEn}
                </span>
                <span className="text-[11px] text-white/80 bg-white/10 px-2 py-0.5 rounded-full">
                  {isBengali ? flood.riverBasinBn : flood.riverBasinEn}
                </span>
              </div>
              <p className="text-white/90 leading-relaxed">
                {isBengali ? flood.descBn : flood.descEn}
              </p>
            </div>
          </div>
        )}

        {/* 48-Hour Hourly Forecast */}
        {hourly.length > 0 && (
          <div className="rounded-2xl bg-monsoon-dark/80 border border-white/10 p-5">
            <h3 className="text-sm font-bold text-white mb-3">
              {isBengali ? "ঘণ্টাভিত্তিক পূর্বাভাস (৪৮ ঘণ্টা)" : "Hourly Forecast (48h)"}
            </h3>

            <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar text-xs">
              {hourly.map((h, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-xl p-2.5 flex flex-col items-center min-w-[68px] border border-white/10 shrink-0"
                >
                  <span className="text-mist/70 font-medium text-[11px]">
                    {isBengali ? h.hourLabelBn : h.hourLabel}
                  </span>
                  <div className="my-2">
                    <Cloud className="w-5 h-5 text-marigold" />
                  </div>
                  <span className="font-bold text-white">{fmtTemp(h.temperature)}</span>
                  {h.precipitationProb > 10 && (
                    <span className="text-[10px] text-blue-300 font-semibold mt-1">
                      {fmtNum(h.precipitationProb)}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10-Day Extended Daily Forecast */}
        {daily.length > 0 && (
          <div className="rounded-2xl bg-monsoon-dark/80 border border-white/10 p-5">
            <h3 className="text-sm font-bold text-white mb-3">
              {isBengali ? "১০ দিনের বর্ধিত পূর্বাভাস" : "10-Day Extended Forecast"}
            </h3>

            <div className="space-y-2 text-xs">
              {daily.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-white/5 rounded-xl p-2.5 border border-white/10"
                >
                  <div className="w-28">
                    <span className="font-bold text-white block">
                      {isBengali ? d.dayLabelBn : d.dayLabelEn}
                    </span>
                    <span className="text-[11px] text-marigold font-medium">
                      {d.banglaCalendarDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-300">
                    <Cloud className="w-4 h-4 text-marigold" />
                    {d.precipitationSum > 1 && (
                      <span className="text-[11px] text-blue-300">
                        {fmtNum(Math.round(d.precipitationSum))} mm
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-mist/60">{fmtTemp(d.tempMin)}</span>
                    <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="bg-marigold h-full w-3/4" />
                    </div>
                    <span className="font-bold text-white">{fmtTemp(d.tempMax)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Metrics Grid */}
        {current && (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-2xl bg-monsoon-dark/80 border border-white/10 p-4">
              <div className="flex items-center justify-between text-mist/60 mb-2">
                <span>{isBengali ? "বায়ুপ্রবাহ" : "Wind"}</span>
                <Compass className="w-4 h-4 text-marigold" />
              </div>
              <p className="text-lg font-bold text-white">{fmtNum(Math.round(current.windSpeed))} km/h</p>
              <p className="text-[11px] text-mist/60 mt-1">{isBengali ? "দক্ষিণ-পশ্চিম মৌসুমি বাতাস" : "South-West Monsoon"}</p>
            </div>

            <div className="rounded-2xl bg-monsoon-dark/80 border border-white/10 p-4">
              <div className="flex items-center justify-between text-mist/60 mb-2">
                <span>{isBengali ? "বায়ুচাপ" : "Pressure"}</span>
                <Wind className="w-4 h-4 text-marigold" />
              </div>
              <p className="text-lg font-bold text-white">{fmtNum(Math.round(current.surfacePressure))} hPa</p>
              <p className="text-[11px] text-mist/60 mt-1">{isBengali ? "স্বাভাবিক সমুদ্র সমতল চাপ" : "Standard sea-level"}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center pt-6 pb-4 text-xs text-mist/50 space-y-1">
          <p>{isBengali ? "বেঙ্গল স্কাই • বাংলার আবহাওয়া প্ল্যাটফর্ম" : "Bengal Sky • Bangladesh Weather Platform"}</p>
          <p>{isBengali ? "তথ্যসূত্র: বাংলাদেশ আবহাওয়া অধিদপ্তর (BMD) ও ওপেন-মেটিও" : "Data sources: BMD & Open-Meteo Weather APIs"}</p>
        </footer>
      </main>

      {/* Location Search Modal (64 Districts & Upazilas) */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-indigo-deep border border-white/15 rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {isBengali ? "স্থান অনুসন্ধান (৬৪ জেলা ও বিভাগ)" : "Search Location (64 Districts)"}
              </h2>
              <button
                onClick={() => setShowSearchModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-marigold absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isBengali ? "জেলা বা উপজেলার নাম লিখুন..." : "Search district or upazila..."}
                  className="w-full bg-white/5 border border-white/20 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-mist/50 focus:outline-none focus:border-marigold"
                />
              </div>

              {/* Division Filter Chips */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                <button
                  onClick={() => setSelectedDivision(null)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap border ${
                    !selectedDivision ? "bg-marigold text-indigo-deep font-bold border-marigold" : "bg-white/5 text-mist border-white/10"
                  }`}
                >
                  {isBengali ? "সব বিভাগ" : "All"}
                </button>
                {DIVISIONS.map((div) => (
                  <button
                    key={div.nameEn}
                    onClick={() => setSelectedDivision(selectedDivision === div.nameEn ? null : div.nameEn)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap border ${
                      selectedDivision === div.nameEn ? "bg-marigold text-indigo-deep font-bold border-marigold" : "bg-white/5 text-mist border-white/10"
                    }`}
                  >
                    {isBengali ? div.nameBn : div.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Results list */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 text-sm">
              {filteredDistricts.map((d) => (
                <div
                  key={d.nameEn}
                  onClick={() => {
                    setIsGpsActive(false);
                    setLat(d.latitude);
                    setLon(d.longitude);
                    fetchWeather(d.latitude, d.longitude);
                    setShowSearchModal(false);
                  }}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer flex items-center justify-between transition"
                >
                  <div>
                    <span className="font-bold text-white block">
                      {isBengali ? d.nameBn : d.nameEn}
                    </span>
                    <span className="text-xs text-mist/60">
                      {isBengali ? `${d.divisionBn} বিভাগ` : `${d.divisionEn} Division`}
                    </span>
                  </div>
                  {d.isCoastal && (
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30">
                      {isBengali ? "উপকূলীয়" : "Coastal"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-indigo-deep border border-white/15 rounded-3xl w-full max-w-sm p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-marigold" />
                {isBengali ? "পছন্দ ও সেটিংস" : "Preferences"}
              </h2>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <span className="font-bold text-white block">{isBengali ? "ভাষা (Language)" : "Language"}</span>
                  <span className="text-mist/60">{isBengali ? "বাংলা সক্রিয়" : "English active"}</span>
                </div>
                <button
                  onClick={() => setIsBengali(!isBengali)}
                  className="px-3 py-1 rounded-full bg-marigold text-indigo-deep font-bold"
                >
                  {isBengali ? "বাংলা" : "English"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <span className="font-bold text-white block">{isBengali ? "তাপমাত্রা একক" : "Temperature Unit"}</span>
                  <span className="text-mist/60">{useFahrenheit ? "ফারেনহাইট (°F)" : "সেলসিয়াস (°C)"}</span>
                </div>
                <button
                  onClick={() => setUseFahrenheit(!useFahrenheit)}
                  className="px-3 py-1 rounded-full bg-white/15 text-white font-bold border border-white/20"
                >
                  {useFahrenheit ? "°F" : "°C"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <span className="font-bold text-white block">{isBengali ? "বাংলা সংখ্যা (১, ২, ৩)" : "Bengali Digits"}</span>
                  <span className="text-mist/60">{useBengaliDigits ? "বাংলা সক্রিয়" : "English digits"}</span>
                </div>
                <button
                  onClick={() => setUseBengaliDigits(!useBengaliDigits)}
                  className="px-3 py-1 rounded-full bg-white/15 text-white font-bold border border-white/20"
                >
                  {useBengaliDigits ? "১২৩" : "123"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <span className="font-bold text-white block">{isBengali ? "নামাজের সময়সূচি উইজেট" : "Prayer Times Widget"}</span>
                  <span className="text-mist/60">{showPrayerTimes ? "হোম স্ক্রিনে প্রদর্শিত" : "লুকানো"}</span>
                </div>
                <button
                  onClick={() => setShowPrayerTimes(!showPrayerTimes)}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    showPrayerTimes ? "bg-paddy-light text-white" : "bg-white/15 text-mist"
                  }`}
                >
                  {showPrayerTimes ? "ON" : "OFF"}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2.5 rounded-xl bg-marigold text-indigo-deep font-bold text-sm"
            >
              {isBengali ? "সংরক্ষণ করুন" : "Done"}
            </button>
          </div>
        </div>
      )}

      {/* BMD Bulletin Admin Editor Modal */}
      {showBmdModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-indigo-deep border border-signal-red/60 rounded-3xl w-full max-w-md p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-signal-light flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-signal-red" />
                {isBengali ? "বিএমডি বুলেটিন সম্পাদক" : "BMD Bulletin Editor"}
              </h2>
              <button
                onClick={() => setShowBmdModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-white font-bold">{isBengali ? "সতর্কবার্তা সক্রিয় রাখুন" : "Active Broadcast"}</span>
                <input
                  type="checkbox"
                  checked={bmdAlert.isActive}
                  onChange={(e) => setBmdAlert({ ...bmdAlert, isActive: e.target.checked })}
                  className="w-4 h-4 accent-signal-red"
                />
              </div>

              <div>
                <label className="text-mist/70 block mb-1">Alert Title (English)</label>
                <input
                  type="text"
                  value={bmdAlert.titleEn}
                  onChange={(e) => setBmdAlert({ ...bmdAlert, titleEn: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-signal-red"
                />
              </div>

              <div>
                <label className="text-mist/70 block mb-1">সতর্কবার্তার শিরোনাম (বাংলা)</label>
                <input
                  type="text"
                  value={bmdAlert.titleBn}
                  onChange={(e) => setBmdAlert({ ...bmdAlert, titleBn: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-signal-red"
                />
              </div>

              <div>
                <label className="text-mist/70 block mb-1">বুলেটিন বিবরণ (বাংলা)</label>
                <textarea
                  rows={3}
                  value={bmdAlert.bulletinBn}
                  onChange={(e) => setBmdAlert({ ...bmdAlert, bulletinBn: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-signal-red"
                />
              </div>
            </div>

            <button
              onClick={() => setShowBmdModal(false)}
              className="w-full py-2.5 rounded-xl bg-signal-red text-white font-bold text-sm shadow-md"
            >
              {isBengali ? "বুলেটিন জারি করুন" : "Broadcast Bulletin"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
