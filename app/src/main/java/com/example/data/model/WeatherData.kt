package com.example.data.model

data class WeatherCondition(
    val code: Int,
    val descriptionEn: String,
    val descriptionBn: String,
    val conditionType: ConditionType
)

enum class ConditionType {
    CLEAR_SUN,
    PARTLY_CLOUDY,
    OVERCAST,
    FOG_MIST,
    RAIN_LIGHT,
    RAIN_HEAVY_MONSOON,
    THUNDERSTORM,
    CYCLONE_STORM
}

object WeatherCodeMapper {
    fun map(code: Int): WeatherCondition {
        return when (code) {
            0 -> WeatherCondition(code, "Clear Sky", "পরিষ্কার আকাশ", ConditionType.CLEAR_SUN)
            1 -> WeatherCondition(code, "Mainly Clear", "প্রায় পরিষ্কার আকাশ", ConditionType.CLEAR_SUN)
            2 -> WeatherCondition(code, "Partly Cloudy", "আংশিক মেঘলা", ConditionType.PARTLY_CLOUDY)
            3 -> WeatherCondition(code, "Overcast Monsoon Sky", "মেঘলা আকাশ", ConditionType.OVERCAST)
            45, 48 -> WeatherCondition(code, "Fog / River Mist", "কুয়াশা / নদী তীরবর্তী কুয়াশা", ConditionType.FOG_MIST)
            51, 53, 55 -> WeatherCondition(code, "Drizzle (ঝিরিঝিরি বৃষ্টি)", "ঝিরিঝিরি বৃষ্টি", ConditionType.RAIN_LIGHT)
            61, 63 -> WeatherCondition(code, "Moderate Rain", "মাঝারি বৃষ্টিপাত", ConditionType.RAIN_LIGHT)
            65 -> WeatherCondition(code, "Heavy Monsoon Downpour", "ভারী বর্ষণ / মেঘভাঙা বৃষ্টি", ConditionType.RAIN_HEAVY_MONSOON)
            80, 81 -> WeatherCondition(code, "Rain Showers", "বৃষ্টির ধারা", ConditionType.RAIN_LIGHT)
            82 -> WeatherCondition(code, "Torrential Monsoon Showers", "মুষলধারে বৃষ্টি", ConditionType.RAIN_HEAVY_MONSOON)
            95 -> WeatherCondition(code, "Thunderstorm / Kalbaishakhi", "বজ্রঝড় / কালবৈশাখী", ConditionType.THUNDERSTORM)
            96, 99 -> WeatherCondition(code, "Severe Thunderstorm with Hail", "বজ্রসহ তীব্র শিলাবৃষ্টি", ConditionType.CYCLONE_STORM)
            else -> WeatherCondition(code, "Variable Clouds", "পরিবর্তনশীল মেঘ", ConditionType.PARTLY_CLOUDY)
        }
    }
}

data class CurrentWeather(
    val temperature: Double,
    val apparentTemperature: Double,
    val humidity: Int,
    val precipitation: Double,
    val weatherCode: Int,
    val surfacePressure: Double,
    val windSpeed: Double,
    val windDirection: Int,
    val uvIndex: Double,
    val isDay: Boolean,
    val condition: WeatherCondition = WeatherCodeMapper.map(weatherCode)
)

data class HourlyForecastItem(
    val timeIso: String,
    val hourTimestamp: Long,
    val hourLabel: String,
    val hourLabelBn: String,
    val temperature: Double,
    val precipitationProb: Int,
    val precipitationMm: Double,
    val weatherCode: Int,
    val humidity: Int
)

data class DailyForecastItem(
    val dateIso: String,
    val dayTimestamp: Long,
    val dayLabelEn: String,
    val dayLabelBn: String,
    val banglaCalendarDate: String,
    val tempMax: Double,
    val tempMin: Double,
    val precipitationSum: Double,
    val weatherCode: Int,
    val uvIndexMax: Double,
    val sunrise: String,
    val sunset: String,
    val condition: WeatherCondition = WeatherCodeMapper.map(weatherCode)
)

enum class AqiLevel(
    val rangeMin: Int,
    val rangeMax: Int,
    val titleEn: String,
    val titleBn: String,
    val adviceEn: String,
    val adviceBn: String,
    val colorHex: Long
) {
    GOOD(0, 50, "Good Air Quality", "ভালো বাতাসের মান", "Air quality is satisfactory. Enjoy outdoor activities.", "বায়ুর মান সন্তোষজনক। বাইরে চলাচলে কোনো ঝুঁকি নেই।", 0xFF2F6E52),
    MODERATE(51, 100, "Moderate", "মাঝারি", "Acceptable air quality. Unusually sensitive individuals should limit heavy outdoor exertion.", "বায়ুর মান গ্রহণযোগ্য, তবে অতিরিক্ত সংবেদনশীলদের জন্য সামান্য অস্বস্তিকর হতে পারে।", 0xFFF2A93B),
    UNHEALTHY_SENSITIVE(101, 150, "Unhealthy for Sensitive Groups", "সংবেদনশীলদের জন্য অস্বাস্থ্যকর", "Children, elderly, and those with respiratory illness should wear a mask and avoid prolonged outdoor exertion.", "শিশু, বৃদ্ধ এবং শ্বাসকষ্টের রোগীরা মাস্ক ব্যবহার করুন এবং দীর্ঘ সময় বাইরে থাকা এড়িয়ে চলুন।", 0xFFE67E22),
    UNHEALTHY(151, 200, "Unhealthy (Dhaka Alert)", "অস্বাস্থ্যকর বায়ুমণ্ডল", "Air is unhealthy for all. Wear an N95 mask outdoors, keep windows closed, and run air filtration if possible.", "সকলের জন্যই বাতাস অস্বাস্থ্যকর। বাইরে বের হলে N95 মাস্ক পরুন এবং ঘরের দরজা-জানালা বন্ধ রাখুন।", 0xFFD64545),
    VERY_UNHEALTHY(201, 300, "Very Unhealthy", "খুবই অস্বাস্থ্যকর", "Health alert: significant increase in health effects. Avoid all unnecessary outdoor activity.", "জরুরি স্বাস্থ্য সতর্কতা: বাইরে সব ধরনের কায়িক পরিশ্রম ও অপ্রয়োজনীয় যাতায়াত পরিহার করুন।", 0xFF8E44AD),
    HAZARDOUS(301, 500, "Hazardous (Severe)", "বিপজ্জনক বায়ু", "Emergency conditions. Entire population is more likely to be affected. Stay indoors.", "চরম স্বাস্থ্যঝুঁকি! ঘরের ভেতরে অবস্থান করুন এবং এয়ার পিউরিফায়ার চালু রাখুন।", 0xFF78281F)
}

data class AirQualityInfo(
    val usAqi: Int,
    val pm25: Double,
    val pm10: Double,
    val level: AqiLevel
) {
    companion object {
        fun from(usAqiVal: Int, pm25Val: Double, pm10Val: Double): AirQualityInfo {
            val level = when (usAqiVal) {
                in 0..50 -> AqiLevel.GOOD
                in 51..100 -> AqiLevel.MODERATE
                in 101..150 -> AqiLevel.UNHEALTHY_SENSITIVE
                in 151..200 -> AqiLevel.UNHEALTHY
                in 201..300 -> AqiLevel.VERY_UNHEALTHY
                else -> AqiLevel.HAZARDOUS
            }
            return AirQualityInfo(usAqiVal, pm25Val, pm10Val, level)
        }
    }
}

enum class FloodSeverity(
    val titleEn: String,
    val titleBn: String,
    val descEn: String,
    val descBn: String,
    val colorHex: Long
) {
    NORMAL("Normal River Flow", "স্বাভাবিক নদী প্রবাহ", "River water levels are within danger threshold.", "নদীর পানি বিপদসীমার নিচ দিয়ে প্রবাহিত হচ্ছে।", 0xFF2F6E52),
    WATCH("Monsoon Watch", "বর্ষা নজরদারি", "Rising water levels in low-lying char & haor wetlands.", "হাওর ও নিম্নাঞ্চলের নদ-নদীতে পানি বৃদ্ধি পাচ্ছে।", 0xFFF2A93B),
    MODERATE("Moderate Flood Warning", "মাঝারি বন্যা ঝুঁকি", "River adjacent upazilas may experience waterlogging and overflow.", "তীরবর্তী উপজেলাসমূহে নদী প্লাবিত হওয়ার সম্ভাবনা রয়েছে।", 0xFFE67E22),
    HIGH_ALERT("High Flood Alert", "উচ্চ বন্যা সতর্কতা", "Rivers flowing above danger level. Critical alert for haor/river basin upazilas.", "নদী বিপদসীমার ওপর দিয়ে প্রবাহিত। তীরবর্তী এলাকায় বন্যার ঝুঁকি রয়েছে।", 0xFFD64545)
}

data class MonsoonRainfall(
    val todayMm: Double,
    val last7DaysMm: Double,
    val monthlyAccumulatedMm: Double,
    val monsoonSeasonPhaseEn: String,
    val monsoonSeasonPhaseBn: String
)

data class FloodRisk(
    val severity: FloodSeverity,
    val riverBasinEn: String,
    val riverBasinBn: String,
    val warningNoteEn: String,
    val warningNoteBn: String
)

data class BmdAlert(
    val isActive: Boolean,
    val signalNumber: Int,
    val signalTitleEn: String,
    val signalTitleBn: String,
    val bulletinTextEn: String,
    val bulletinTextBn: String,
    val issuedTime: String,
    val coastalPorts: String = "Chattogram, Cox's Bazar, Mongla, Payra"
)

data class CompleteWeather(
    val location: ResolvedLocation,
    val current: CurrentWeather,
    val hourly: List<HourlyForecastItem>,
    val daily: List<DailyForecastItem>,
    val aqi: AirQualityInfo,
    val monsoon: MonsoonRainfall,
    val floodRisk: FloodRisk,
    val bmdAlert: BmdAlert,
    val prayerTimes: PrayerTimes,
    val bengaliDate: BengaliDateInfo,
    val lastUpdatedTimestamp: Long,
    val isFromCache: Boolean = false
)
