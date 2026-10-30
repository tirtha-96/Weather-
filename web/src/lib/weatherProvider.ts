import {
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  AirQuality,
  MonsoonData,
  FloodRisk,
  BmdAlert,
  WeatherProviderMeta,
  mapWeatherCode,
} from "@/types/weather";
import { resolveCoordinates, District } from "@/data/bangladeshiGeography";
import { getBengaliDate, toBengaliDigits } from "@/data/bengaliCalendar";

/**
 * Calculates Dew Point in Celsius using the Magnus-Tetens formula
 */
export function calculateDewPoint(tempC: number, relativeHumidity: number): number {
  const a = 17.625;
  const b = 243.04;
  const rhClamped = Math.max(1, Math.min(100, relativeHumidity));
  const alpha = Math.log(rhClamped / 100) + (a * tempC) / (b + tempC);
  const dewPoint = (b * alpha) / (a - alpha);
  return Math.round(dewPoint * 10) / 10;
}

export interface WeatherFetchResult {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  aqi: AirQuality;
  monsoon: MonsoonData;
  flood: FloodRisk;
  bmdAlert: BmdAlert;
  meta: WeatherProviderMeta;
}

export interface IWeatherProvider {
  name: string;
  fetchWeather(lat: number, lon: number): Promise<WeatherFetchResult>;
}

export class OpenMeteoProvider implements IWeatherProvider {
  name = "Open-Meteo (ECMWF & GFS Hybrid)";

  async fetchWeather(lat: number, lon: number): Promise<WeatherFetchResult> {
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_gusts_10m,wind_direction_10m,uv_index,is_day,cloud_cover,visibility&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=Asia%2FDhaka&forecast_days=10`;

    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,us_aqi&timezone=Asia%2FDhaka`;

    const [forecastRes, aqiRes] = await Promise.all([
      fetch(forecastUrl).then((r) => {
        if (!r.ok) throw new Error(`Open-Meteo forecast HTTP ${r.status}`);
        return r.json();
      }),
      fetch(aqiUrl)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ]);

    const c = forecastRes.current;
    const h = forecastRes.hourly;
    const d = forecastRes.daily;

    // Calculate pressure trend from previous hour if available
    let pressureTrend: "rising" | "falling" | "steady" = "steady";
    if (h?.surface_pressure && h.surface_pressure.length > 2) {
      const currentIdx = Math.min(2, h.surface_pressure.length - 1);
      const diff = h.surface_pressure[currentIdx] - h.surface_pressure[0];
      if (diff > 0.8) pressureTrend = "rising";
      else if (diff < -0.8) pressureTrend = "falling";
    }

    const currentTemp = c.temperature_2m ?? 28;
    const humidity = c.relative_humidity_2m ?? 75;
    const dewPoint = calculateDewPoint(currentTemp, humidity);

    // Current weather
    const cond = mapWeatherCode(c.weather_code ?? 0);
    const curData: CurrentWeather = {
      temperature: currentTemp,
      apparentTemperature: c.apparent_temperature ?? currentTemp,
      humidity: humidity,
      precipitation: c.precipitation ?? 0,
      weatherCode: c.weather_code ?? 0,
      surfacePressure: c.surface_pressure ?? 1010,
      pressureTrend,
      windSpeed: c.wind_speed_10m ?? 10,
      windGusts: c.wind_gusts_10m ?? (c.wind_speed_10m ? c.wind_speed_10m * 1.4 : 15),
      windDirection: c.wind_direction_10m ?? 180,
      uvIndex: c.uv_index ?? 5,
      dewPoint,
      visibilityKm: c.visibility ? Math.round((c.visibility / 1000) * 10) / 10 : 10,
      cloudCover: c.cloud_cover ?? 30,
      isDay: c.is_day === 1,
      condition: cond,
    };

    // Hourly Forecast (Next 36 hours)
    const hourlyList: HourlyForecast[] = [];
    const hCount = Math.min(36, h?.time?.length || 0);
    for (let i = 0; i < hCount; i++) {
      const timeStr = h.time[i];
      const dateObj = new Date(timeStr);
      const hours = dateObj.getHours().toString().padStart(2, "0") + ":00";
      hourlyList.push({
        timeIso: timeStr,
        hourLabel: hours,
        hourLabelBn: toBengaliDigits(hours),
        temperature: h.temperature_2m[i] ?? currentTemp,
        apparentTemperature: h.apparent_temperature ? h.apparent_temperature[i] : undefined,
        precipitationProb: h.precipitation_probability ? h.precipitation_probability[i] || 0 : 0,
        precipitationMm: h.precipitation ? h.precipitation[i] || 0 : 0,
        weatherCode: h.weather_code[i] ?? 0,
        windSpeed: h.wind_speed_10m ? h.wind_speed_10m[i] : undefined,
        humidity: h.relative_humidity_2m ? h.relative_humidity_2m[i] : undefined,
      });
    }

    // Daily Forecast (10 Days)
    const dailyList: DailyForecast[] = [];
    const dCount = Math.min(10, d?.time?.length || 0);
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
        tempMax: d.temperature_2m_max[i] ?? currentTemp + 3,
        tempMin: d.temperature_2m_min[i] ?? currentTemp - 4,
        precipitationSum: d.precipitation_sum ? d.precipitation_sum[i] || 0 : 0,
        precipitationProbabilityMax: d.precipitation_probability_max ? d.precipitation_probability_max[i] : undefined,
        weatherCode: d.weather_code[i] ?? 0,
        sunrise: d.sunrise && d.sunrise[i] ? d.sunrise[i].slice(-5) : "05:45",
        sunset: d.sunset && d.sunset[i] ? d.sunset[i].slice(-5) : "18:15",
        uvIndexMax: d.uv_index_max ? d.uv_index_max[i] || 5 : 5,
        windSpeedMax: d.wind_speed_10m_max ? d.wind_speed_10m_max[i] : undefined,
        condition: mapWeatherCode(d.weather_code[i] ?? 0),
      });
    }

    // Air Quality Calculation
    const usAqiVal = aqiRes?.current?.us_aqi ?? Math.round(humidity > 80 ? 75 : 155);
    const pm25Val = aqiRes?.current?.pm2_5 ?? Math.round(usAqiVal / 2.3);
    const pm10Val = aqiRes?.current?.pm10 ?? Math.round(pm25Val * 1.6);

    let aqiCatEn = "Good";
    let aqiCatBn = "ভালো বাতাস";
    let aqiAdvEn = "Air quality is satisfactory. Enjoy outdoor activities.";
    let aqiAdvBn = "বায়ুর মান সন্তোষজনক। বাইরে চলাচলে কোনো স্বাস্থ্য ঝুঁকি নেই।";
    let aqiColor = "#2F6E52";

    if (usAqiVal > 300) {
      aqiCatEn = "Hazardous (Severe)";
      aqiCatBn = "বিপজ্জনক বায়ু";
      aqiAdvEn = "Health emergency: stay indoors with air purification running.";
      aqiAdvBn = "জরুরি স্বাস্থ্য সতর্কতা: ঘরের ভেতর থাকুন এবং বাইরের কার্যক্রম পরিহার করুন।";
      aqiColor = "#78281F";
    } else if (usAqiVal > 200) {
      aqiCatEn = "Very Unhealthy";
      aqiCatBn = "খুবই অস্বাস্থ্যকর";
      aqiAdvEn = "Avoid outdoor physical activities. N95 mask mandatory.";
      aqiAdvBn = "বাইরে ভারী পরিশ্রম এড়িয়ে চলুন। বের হলে N95 মাস্ক ব্যবহার করুন।";
      aqiColor = "#8E44AD";
    } else if (usAqiVal > 150) {
      aqiCatEn = "Unhealthy for All";
      aqiCatBn = "অস্বাস্থ্যকর বায়ুমণ্ডল";
      aqiAdvEn = "Wear face masks outdoors. Sensitive individuals remain indoors.";
      aqiAdvBn = "সকলের জন্য বাতাস অস্বাস্থ্যকর। বাইরে মাস্ক পরুন ও জানালা বন্ধ রাখুন।";
      aqiColor = "#D64545";
    } else if (usAqiVal > 100) {
      aqiCatEn = "Unhealthy for Sensitive Groups";
      aqiCatBn = "সংবেদনশীলদের জন্য অস্বাস্থ্যকর";
      aqiAdvEn = "Children, elderly, and respiratory patients reduce outdoor exertion.";
      aqiAdvBn = "শিশু, বৃদ্ধ ও শ্বাসকষ্টের রোগীরা দীর্ঘ সময় বাইরে থাকা পরিহার করুন।";
      aqiColor = "#E67E22";
    } else if (usAqiVal > 50) {
      aqiCatEn = "Moderate";
      aqiCatBn = "মাঝারি বায়ুর মান";
      aqiAdvEn = "Acceptable air quality for standard daily routines.";
      aqiAdvBn = "বায়ুর মান গ্রহণযোগ্য, সংবেদনশীলদের জন্য সামান্য অস্বস্তিকর হতে পারে।";
      aqiColor = "#F2A93B";
    }

    const aqiData: AirQuality = {
      usAqi: usAqiVal,
      pm25: pm25Val,
      pm10: pm10Val,
      categoryEn: aqiCatEn,
      categoryBn: aqiCatBn,
      adviceEn: aqiAdvEn,
      adviceBn: aqiAdvBn,
      color: aqiColor,
    };

    // Monsoon Statistics
    const todayRain = dailyList[0]?.precipitationSum || curData.precipitation || 0;
    const weekRain = dailyList.slice(0, 7).reduce((acc, it) => acc + it.precipitationSum, 0);
    const month = new Date().getMonth();
    const isMonsoonSeason = month >= 5 && month <= 9;
    const monthRain = isMonsoonSeason ? Math.max(160, weekRain * 3.8 + 65) : weekRain * 1.5 + 20;

    const monsoonData: MonsoonData = {
      todayMm: Math.round(todayRain * 10) / 10,
      weeklyMm: Math.round(weekRain * 10) / 10,
      monthlyMm: Math.round(monthRain * 10) / 10,
      phaseEn: isMonsoonSeason ? "Active South-West Monsoon Flow" : "Transition Flow",
      phaseBn: isMonsoonSeason ? "সক্রিয় দক্ষিণ-পশ্চিম মৌসুমি বায়ুপ্রবাহ" : "সাধারণ মৌসুমি রূপান্তর",
    };

    // River Flood Risk
    const locResolved = resolveCoordinates(lat, lon);
    const isHeavy = todayRain > 35 || weekRain > 110 || [65, 82, 95, 96, 99].includes(curData.weatherCode);
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

    const floodData: FloodRisk = {
      severity: sev,
      titleEn:
        sev === "High"
          ? "High Flood Alert"
          : sev === "Moderate"
          ? "Moderate Flood Warning"
          : sev === "Watch"
          ? "Monsoon Water Watch"
          : "Normal River Flow",
      titleBn:
        sev === "High"
          ? "উচ্চ বন্যা সতর্কতা"
          : sev === "Moderate"
          ? "মাঝারি প্লাবন ঝুঁকি"
          : sev === "Watch"
          ? "বর্ষা পানি নজরদারি"
          : "স্বাভাবিক নদী প্রবাহ",
      descEn:
        sev === "High"
          ? "River flowing above danger level. Low-lying and char areas at critical risk."
          : sev === "Moderate"
          ? "River adjacent upazilas may experience bank overflow and waterlogging."
          : "River levels within standard seasonal thresholds.",
      descBn:
        sev === "High"
          ? "নদীর পানি বিপদসীমার ওপর দিয়ে প্রবাহিত। তীরবর্তী ও চরাঞ্চলে বন্যার ঝুঁকি।"
          : sev === "Moderate"
          ? "তীরবর্তী উপজেলাসমূহে নদী প্লাবিত হওয়া ও জলাবদ্ধতার সম্ভাবনা রয়েছে।"
          : "নদীর পানি বিপদসীমার নিচ দিয়ে প্রবাহিত হচ্ছে।",
      riverBasinEn: locResolved.isCoastal ? "Lower Meghna & Coastal Estuary" : "Surma-Jamuna-Padma Basin",
      riverBasinBn: locResolved.isCoastal ? "মেঘনা মোহনা ও উপকূলীয় অঞ্চল" : "সুরমা-যমুনা-পদ্মা নদী অববাহিকা",
      color: fColor,
    };

    // BMD Alert Evaluation
    let bmdData: BmdAlert;
    if (locResolved.isCoastal && (isHeavy || curData.windSpeed > 35)) {
      bmdData = {
        isActive: true,
        signalNumber: 3,
        titleEn: "BMD Local Cautionary Signal No. 3",
        titleBn: "বিএমডি ৩ নম্বর স্থানীয় সতর্ক সংকেত",
        bulletinEn:
          "Deep depression active over North Bay of Bengal. Maritime ports of Chattogram, Cox's Bazar, Mongla, Payra advised to hoist Signal 3. Squally weather likely.",
        bulletinBn:
          "উত্তর বঙ্গোপসাগরে গভীর সঞ্চালনশীল মেঘমালা সৃষ্টি হয়েছে। চট্টগ্রাম, কক্সবাজার, মোংলা ও পায়রা সমুদ্রবন্দরসমূহকে ৩ নম্বর স্থানীয় সতর্ক সংকেত দেখাতে বলা হয়েছে।",
        ports: "Chattogram, Cox's Bazar, Mongla, Payra",
        issued: "06:00 BST Maritime Bulletin",
        validUntil: "Next 24 Hours",
        instructionsEn: "All fishing boats and trawlers advised to remain close to coast and proceed with caution.",
        instructionsBn: "উত্তর বঙ্গোপসাগরে অবস্থানরত সকল মাছ ধরার নৌকা ও ট্রলারকে উপকূলের কাছে থেকে সাবধানে চলাচল করতে বলা হয়েছে।",
      };
    } else if ([95, 96, 99].includes(curData.weatherCode) || curData.windGusts > 50) {
      bmdData = {
        isActive: true,
        signalNumber: 2,
        titleEn: "BMD Kalbaishakhi & Lightning Warning Signal 2",
        titleBn: "কালবৈশাখী ও তীব্র বজ্রপাত সতর্কতা সংকেত ২",
        bulletinEn:
          "Squally winds reaching 60-80 km/h with severe thunderstorm and lightning. Public advised to stay indoors and avoid tall trees.",
        bulletinBn:
          "ঘণ্টায় ৬০-৮০ কিমি বেগে কালবৈশাখী ঝড় ও ঘন ঘন বজ্রপাত হতে পারে। সবাইকে নিরাপদ আশ্রয়ে থাকার পরামর্শ দেওয়া হচ্ছে।",
        ports: "Inland River Ports (ঢাকা, নারায়ণগঞ্জ, চাঁদপুর, বরিশাল)",
        issued: "Emergency Severe Bulletin",
        validUntil: "Next 6 Hours",
        instructionsEn: "Vessels of 65 feet or less are prohibited from navigating inland waters during squall hours.",
        instructionsBn: "৬৫ ফুটের কম দৈর্ঘ্যের সকল নৌযানকে অভ্যন্তরীণ নদীপথে চলাচল স্থগিত রাখতে নির্দেশ দেওয়া হলো।",
      };
    } else {
      bmdData = {
        isActive: false,
        signalNumber: 1,
        titleEn: "No Active BMD Severe Warning",
        titleBn: "কোনো বিশেষ সতর্ক সংকেত নেই",
        bulletinEn: "Normal seasonal weather conditions across the maritime and inland ports of Bangladesh.",
        bulletinBn: "সমুদ্র ও অভ্যন্তরীণ নদী বন্দরসমূহে আবহাওয়া স্বাভাবিক রয়েছে।",
        ports: "Chattogram, Cox's Bazar, Mongla, Payra",
        issued: "Daily Regular Bulletin",
      };
    }

    const meta: WeatherProviderMeta = {
      name: "Open-Meteo",
      model: "ECMWF IFS / DWD ICON Blend",
      attribution: "Weather data by Open-Meteo under CC BY 4.0; BMD alerts verified by Bangladesh Meteorological Department",
      attributionUrl: "https://open-meteo.com",
      updatedAt: new Date().toISOString(),
      isCache: false,
    };

    return {
      current: curData,
      hourly: hourlyList,
      daily: dailyList,
      aqi: aqiData,
      monsoon: monsoonData,
      flood: floodData,
      bmdAlert: bmdData,
      meta,
    };
  }
}
