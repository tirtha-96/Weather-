export interface WeatherCondition {
  code: number;
  descriptionEn: string;
  descriptionBn: string;
  type: "sun" | "cloud" | "overcast" | "rain" | "heavy-rain" | "thunderstorm" | "fog";
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  surfacePressure: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  isDay: boolean;
  condition: WeatherCondition;
}

export interface HourlyForecast {
  timeIso: string;
  hourLabel: string;
  hourLabelBn: string;
  temperature: number;
  precipitationProb: number;
  precipitationMm: number;
  weatherCode: number;
}

export interface DailyForecast {
  dateIso: string;
  dayLabelEn: string;
  dayLabelBn: string;
  banglaCalendarDate: string;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  weatherCode: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  condition: WeatherCondition;
}

export interface AirQuality {
  usAqi: number;
  pm25: number;
  pm10: number;
  categoryEn: string;
  categoryBn: string;
  adviceEn: string;
  adviceBn: string;
  color: string;
}

export interface MonsoonData {
  todayMm: number;
  weeklyMm: number;
  monthlyMm: number;
  phaseEn: string;
  phaseBn: string;
}

export interface FloodRisk {
  severity: "Normal" | "Watch" | "Moderate" | "High";
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  riverBasinEn: string;
  riverBasinBn: string;
  color: string;
}

export interface BmdAlert {
  isActive: boolean;
  signalNumber: number;
  titleEn: string;
  titleBn: string;
  bulletinEn: string;
  bulletinBn: string;
  ports: string;
  issued: string;
}

export function mapWeatherCode(code: number): WeatherCondition {
  switch (code) {
    case 0:
      return { code, descriptionEn: "Clear Sky", descriptionBn: "পরিষ্কার আকাশ", type: "sun" };
    case 1:
      return { code, descriptionEn: "Mainly Clear", descriptionBn: "প্রায় পরিষ্কার", type: "sun" };
    case 2:
      return { code, descriptionEn: "Partly Cloudy", descriptionBn: "আংশিক মেঘলা", type: "cloud" };
    case 3:
      return { code, descriptionEn: "Overcast Monsoon Sky", descriptionBn: "মেঘলা আকাশ", type: "overcast" };
    case 45:
    case 48:
      return { code, descriptionEn: "River Fog / Mist", descriptionBn: "কুয়াশা / নদী তীরবর্তী কুয়াশা", type: "fog" };
    case 51:
    case 53:
    case 55:
      return { code, descriptionEn: "Light Drizzle (ঝিরিঝিরি বৃষ্টি)", descriptionBn: "ঝিরিঝিরি বৃষ্টি", type: "rain" };
    case 61:
    case 63:
      return { code, descriptionEn: "Moderate Rain", descriptionBn: "মাঝারি বৃষ্টি", type: "rain" };
    case 65:
    case 82:
      return { code, descriptionEn: "Heavy Monsoon Downpour", descriptionBn: "ভারী বর্ষণ / মুষলধারে বৃষ্টি", type: "heavy-rain" };
    case 95:
      return { code, descriptionEn: "Kalbaishakhi / Thunderstorm", descriptionBn: "বজ্রঝড় / কালবৈশাখী", type: "thunderstorm" };
    case 96:
    case 99:
      return { code, descriptionEn: "Severe Thunderstorm with Hail", descriptionBn: "শিলাবৃষ্টিসহ তীব্র ঝড়", type: "thunderstorm" };
    default:
      return { code, descriptionEn: "Partly Cloudy", descriptionBn: "আংশিক মেঘলা", type: "cloud" };
  }
}
