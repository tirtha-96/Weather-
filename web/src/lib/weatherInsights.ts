import { CurrentWeather, HourlyForecast, AirQuality, WeatherInsight } from "@/types/weather";

/**
 * Generates natural language Pixel Weather Intelligence summaries
 */
export function generateWeatherInsights(
  current: CurrentWeather,
  hourly: HourlyForecast[],
  aqi?: AirQuality | null
): WeatherInsight[] {
  const insights: WeatherInsight[] = [];

  // 1. Heat Index / Apparent Temperature Insight
  const tempDiff = current.apparentTemperature - current.temperature;
  if (tempDiff >= 3 && current.temperature >= 28) {
    insights.push({
      id: "heat_index",
      type: "heat",
      headlineEn: `Feels like ${Math.round(current.apparentTemperature)}°C due to high humidity (${current.humidity}%)`,
      headlineBn: `উচ্চ আর্দ্রতার (${current.humidity}%) কারণে তাপমাত্রা অনুভূত হচ্ছে ${Math.round(current.apparentTemperature)}°সে`,
      detailEn: "The air holds dense moisture making perspiration evaporate slowly. Stay hydrated and avoid long direct sun exposure.",
      detailBn: "বাতাসে অতিরিক্ত জলীয় বাষ্পের কারণে শরীর দ্রুত ক্লান্ত হতে পারে। প্রচুর পানি পান করুন ও ছায়াযুক্ত স্থানে থাকুন।",
      iconName: "ThermometerSun",
      severity: current.apparentTemperature >= 38 ? "warning" : "info",
    });
  } else if (current.temperature < 17) {
    insights.push({
      id: "cold_chill",
      type: "general",
      headlineEn: `Cool northern breeze brings temperatures down to ${Math.round(current.temperature)}°C`,
      headlineBn: `উত্তুরে বাতাসের প্রভাবে শীতের আমেজ, তাপমাত্রা ${Math.round(current.temperature)}°সে`,
      detailEn: "Mild winter chill active in the morning and evening. Wear light warm clothing when venturing outdoors.",
      detailBn: "সকাল ও সন্ধ্যায় শীত অনুভূত হবে। বাইরে বের হলে হালকা শীতের পোশাক পরিধান করুন।",
      iconName: "Wind",
      severity: "info",
    });
  }

  // 2. Precipitation Window & Rain Timing Insight
  const nextRainHour = hourly.slice(0, 12).find((h) => h.precipitationProb >= 50 || h.precipitationMm > 0.5);
  if (nextRainHour) {
    const rainTime = nextRainHour.hourLabel;
    const prob = nextRainHour.precipitationProb;
    insights.push({
      id: "rain_window",
      type: "rain",
      headlineEn: `Rain expected around ${rainTime} with ${prob}% probability`,
      headlineBn: `${nextRainHour.hourLabelBn} নাগাদ বৃষ্টির প্রবল সম্ভাবনা (${prob}%)`,
      detailEn: "Precipitation probability peaks during this window. Carry an umbrella or plan commute accordingly.",
      detailBn: "এই সময়ে হালকা থেকে মাঝারি বৃষ্টি হতে পারে। বাইরে বের হওয়ার সময় ছাতা সঙ্গে রাখুন।",
      iconName: "CloudRain",
      severity: prob > 70 ? "warning" : "info",
    });
  } else if (current.precipitation > 0) {
    insights.push({
      id: "active_rain",
      type: "rain",
      headlineEn: "Active rainfall currently observed in your locality",
      headlineBn: "বর্তমানে আপনার এলাকায় বৃষ্টিপাত চলছে",
      detailEn: "Roads may be wet and slippery. Drive with headlights on low beam and avoid waterlogged alleys.",
      detailBn: "রাস্তায় জলাবদ্ধতা ও পিচ্ছিল হতে পারে। সাবধানে চলাচল করুন।",
      iconName: "CloudRain",
      severity: "info",
    });
  }

  // 3. UV Index Insight
  if (current.uvIndex >= 8) {
    insights.push({
      id: "uv_extreme",
      type: "uv",
      headlineEn: `Very High UV Index (${current.uvIndex}) — Sun protection required`,
      headlineBn: `তীব্র আল্ট্রাভায়োলেট রশ্মি (UV সূচক ${current.uvIndex}) — রোদে সতর্কতা প্রয়োজন`,
      detailEn: "Sunburn can occur in less than 20 minutes. Use SPF 30+ sunscreen, sunglasses, and wide-brim umbrellas.",
      detailBn: "২০ মিনিটের মধ্যে ত্বকের ক্ষতি হতে পারে। সানগ্লাস ও ছাতা ব্যবহার করুন এবং দুপুর ১২টা থেকে ৩টা পর্যন্ত ছায়ায় থাকুন।",
      iconName: "Sun",
      severity: "warning",
    });
  } else if (current.uvIndex >= 6) {
    insights.push({
      id: "uv_moderate",
      type: "uv",
      headlineEn: `Moderate-High UV Index (${current.uvIndex}) at midday`,
      headlineBn: `মাঝারি থেকে তীব্র সূর্যালোক (UV সূচক ${current.uvIndex})`,
      detailEn: "Protect eyes and skin during peak daytime sunlight hours.",
      detailBn: "দুপুরে কড়া রোদে চোখ ও ত্বকের যত্ন নিন।",
      iconName: "Sun",
      severity: "info",
    });
  }

  // 4. Wind & Kalbaishakhi Gusts Insight
  if (current.windGusts >= 45 || current.windSpeed >= 30) {
    insights.push({
      id: "wind_gusts",
      type: "wind",
      headlineEn: `Squally wind gusts up to ${Math.round(current.windGusts)} km/h detected`,
      headlineBn: `ঘণ্টায় ${Math.round(current.windGusts)} কিমি বেগে দমকা হাওয়া বইছে`,
      detailEn: "Kalbaishakhi convective winds active. Secure lightweight balcony items and avoid stopping under billboards or old trees.",
      detailBn: "কালবৈশাখী দমকা হাওয়ার আশঙ্কা। বারান্দার আলগা জিনিসপত্র নিরাপদ স্থানে রাখুন ও গাছের নিচে দাঁড়াবেন না।",
      iconName: "Wind",
      severity: "alert",
    });
  }

  // 5. Air Quality (AQI) Insight
  if (aqi && aqi.usAqi > 150) {
    insights.push({
      id: "aqi_alert",
      type: "aqi",
      headlineEn: `Air Quality is ${aqi.categoryEn} (US AQI ${aqi.usAqi})`,
      headlineBn: `বাতাসের মান ${aqi.categoryBn} (AQI ${aqi.usAqi})`,
      detailEn: aqi.adviceEn,
      detailBn: aqi.adviceBn,
      iconName: "AlertTriangle",
      severity: aqi.usAqi > 200 ? "alert" : "warning",
    });
  }

  // 6. Default Pleasant Summary if no alerts
  if (insights.length === 0) {
    insights.push({
      id: "pleasant",
      type: "general",
      headlineEn: "Pleasant seasonal weather across your area",
      headlineBn: "আপনার এলাকায় স্বাভাবিক ও স্বস্তিদায়ক আবহাওয়া বিরাজ করছে",
      detailEn: "Atmospheric conditions are stable. Great weather for travel, sports, and outdoor activities.",
      detailBn: "বায়ুমণ্ডলীয় পরিস্থিতি শান্ত ও স্বাভাবিক। বাইরে চলাফেরা ও দৈনন্দিন কাজের জন্য চমৎকার পরিবেশ।",
      iconName: "Sun",
      severity: "info",
    });
  }

  return insights;
}
