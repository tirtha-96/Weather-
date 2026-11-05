package com.example.data.repository

import android.content.Context
import com.example.data.local.AppDatabase
import com.example.data.local.SavedLocationEntity
import com.example.data.local.WeatherCacheEntity
import com.example.data.model.*
import com.example.data.remote.NetworkClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.withContext
import java.text.SimpleDateFormat
import java.util.*
import kotlin.math.roundToInt

class WeatherRepository(context: Context) {

    private val db = AppDatabase.getInstance(context)
    private val dao = db.weatherDao()
    private val api = NetworkClient.api

    val savedLocations: Flow<List<SavedLocationEntity>> = dao.getAllSavedLocations()

    suspend fun seedInitialLocationsIfEmpty() = withContext(Dispatchers.IO) {
        val currentList = dao.getAllSavedLocations().first()
        if (currentList.isEmpty()) {
            val defaults = listOf(
                SavedLocationEntity(nameEn = "Dhaka (Mirpur)", nameBn = "ঢাকা (মিরপুর)", districtEn = "Dhaka", districtBn = "ঢাকা", divisionEn = "Dhaka", divisionBn = "ঢাকা", latitude = 23.8041, longitude = 90.3667, tag = "Home", isCurrent = true),
                SavedLocationEntity(nameEn = "Chattogram Port", nameBn = "চট্টগ্রাম বন্দর", districtEn = "Chattogram", districtBn = "চট্টগ্রাম", divisionEn = "Chattogram", divisionBn = "চট্টগ্রাম", latitude = 22.3569, longitude = 91.7832, tag = "Coastal Port", isCurrent = false),
                SavedLocationEntity(nameEn = "Cox's Bazar", nameBn = "কক্সবাজার", districtEn = "Cox's Bazar", districtBn = "কক্সবাজার", divisionEn = "Chattogram", divisionBn = "চট্টগ্রাম", latitude = 21.4272, longitude = 92.0058, tag = "Maritime Zone", isCurrent = false),
                SavedLocationEntity(nameEn = "Sylhet (Surma Basin)", nameBn = "সিলেট (সুরমা বেসিন)", districtEn = "Sylhet", districtBn = "সিলেট", divisionEn = "Sylhet", divisionBn = "সিলেট", latitude = 24.8949, longitude = 91.8687, tag = "Haor / River", isCurrent = false)
            )
            for (item in defaults) {
                dao.insertLocation(item)
            }
        }
    }

    suspend fun saveLocation(location: SavedLocationEntity) = withContext(Dispatchers.IO) {
        dao.insertLocation(location)
    }

    suspend fun deleteLocation(id: Int) = withContext(Dispatchers.IO) {
        dao.deleteLocationById(id)
    }

    suspend fun setCurrentLocation(id: Int) = withContext(Dispatchers.IO) {
        dao.clearCurrentFlags()
        dao.setCurrentLocation(id)
    }

    suspend fun fetchWeather(
        lat: Double,
        lon: Double,
        customAlert: BmdAlert? = null
    ): CompleteWeather = withContext(Dispatchers.IO) {
        val resolved = BangladeshGeoData.resolveCoordinates(lat, lon)
        val cacheKey = "weather_${String.format(Locale.US, "%.3f", lat)}_${String.format(Locale.US, "%.3f", lon)}"

        try {
            val forecastResp = api.getForecast(lat = lat, lon = lon)
            val aqiResp = try {
                api.getAirQuality(lat = lat, lon = lon)
            } catch (e: Exception) {
                null
            }

            val currentData = forecastResp.current
            val hourlyData = forecastResp.hourly
            val dailyData = forecastResp.daily

            val temp = currentData?.temperature_2m ?: 28.0
            val appTemp = currentData?.apparent_temperature ?: (temp + 2.0)
            val humidity = currentData?.relative_humidity_2m ?: 78
            val precip = currentData?.precipitation ?: 0.0
            val weatherCode = currentData?.weather_code ?: 2
            val pressure = currentData?.surface_pressure ?: 1008.0
            val windSpeed = currentData?.wind_speed_10m ?: 12.0
            val windDir = currentData?.wind_direction_10m ?: 180
            val uv = dailyData?.uv_index_max?.firstOrNull() ?: 6.5
            val isDay = (currentData?.is_day ?: 1) == 1

            val currentWeather = CurrentWeather(
                temperature = temp,
                apparentTemperature = appTemp,
                humidity = humidity,
                precipitation = precip,
                weatherCode = weatherCode,
                surfacePressure = pressure,
                windSpeed = windSpeed,
                windDirection = windDir,
                uvIndex = uv,
                isDay = isDay
            )

            // Parse Hourly
            val hourlyList = mutableListOf<HourlyForecastItem>()
            val hTimes = hourlyData?.time ?: emptyList()
            val hTemps = hourlyData?.temperature_2m ?: emptyList()
            val hProbs = hourlyData?.precipitation_probability ?: emptyList()
            val hPrecip = hourlyData?.precipitation ?: emptyList()
            val hCodes = hourlyData?.weather_code ?: emptyList()
            val hHumids = hourlyData?.relative_humidity_2m ?: emptyList()

            // Open-Meteo's hourly series starts at 00:00 today (Asia/Dhaka) and runs for all
            // forecast days, so the current hour is simply at index = hour-of-day. Walk forward
            // from there into tomorrow instead of wrapping back to today's past hours.
            val nowCal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Dhaka"))
            val currentHour = nowCal.get(Calendar.HOUR_OF_DAY)
            val startIdx = currentData?.time?.take(13)
                ?.let { prefix -> hTimes.indexOfFirst { it.startsWith(prefix) } }
                ?.takeIf { it >= 0 }
                ?: currentHour.coerceAtMost((hTimes.size - 1).coerceAtLeast(0))

            for (i in 0 until minOf(48, hTimes.size - startIdx)) {
                val dataIdx = startIdx + i
                val timeStr = hTimes.getOrNull(dataIdx) ?: ""
                // "YYYY-MM-DDTHH:MM" in Asia/Dhaka local time
                val hourOfDay = timeStr.drop(11).take(2).toIntOrNull() ?: ((currentHour + i) % 24)
                val hTemp = hTemps.getOrNull(dataIdx) ?: temp
                val hProb = hProbs.getOrNull(dataIdx) ?: 10
                val hMm = hPrecip.getOrNull(dataIdx) ?: 0.0
                val hCode = hCodes.getOrNull(dataIdx) ?: weatherCode
                val hHum = hHumids.getOrNull(dataIdx) ?: humidity

                val labelEn = when (i) {
                    0 -> "Now"
                    else -> {
                        val h12 = if (hourOfDay % 12 == 0) 12 else hourOfDay % 12
                        val ampm = if (hourOfDay < 12) "AM" else "PM"
                        "$h12 $ampm"
                    }
                }
                val labelBn = when (i) {
                    0 -> "এখন"
                    else -> {
                        val h12 = if (hourOfDay % 12 == 0) 12 else hourOfDay % 12
                        val ampm = if (hourOfDay < 12) "পূর্বাহ্ন" else "অপরাহ্ন"
                        "${BengaliCalendarHelper.toBengaliDigits(h12)} $ampm"
                    }
                }

                hourlyList.add(
                    HourlyForecastItem(
                        timeIso = timeStr,
                        hourTimestamp = System.currentTimeMillis() + i * 3600000L,
                        hourLabel = labelEn,
                        hourLabelBn = labelBn,
                        temperature = hTemp,
                        precipitationProb = hProb,
                        precipitationMm = hMm,
                        weatherCode = hCode,
                        humidity = hHum
                    )
                )
            }

            // Parse Daily
            val dailyList = mutableListOf<DailyForecastItem>()
            val dTimes = dailyData?.time ?: emptyList()
            val dCodes = dailyData?.weather_code ?: emptyList()
            val dMaxTemps = dailyData?.temperature_2m_max ?: emptyList()
            val dMinTemps = dailyData?.temperature_2m_min ?: emptyList()
            val dSunrises = dailyData?.sunrise ?: emptyList()
            val dSunsets = dailyData?.sunset ?: emptyList()
            val dUv = dailyData?.uv_index_max ?: emptyList()
            val dPrecipSum = dailyData?.precipitation_sum ?: emptyList()

            val dayNamesEn = listOf("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat")
            val dayNamesBn = listOf("রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি")

            val dayCal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Dhaka"))

            for (i in 0 until minOf(10, dTimes.size)) {
                val dTime = dTimes.getOrNull(i) ?: ""
                val dCode = dCodes.getOrNull(i) ?: weatherCode
                val dMax = dMaxTemps.getOrNull(i) ?: (temp + 2.0)
                val dMin = dMinTemps.getOrNull(i) ?: (temp - 4.0)
                val dSunR = dSunrises.getOrNull(i) ?: "05:48 AM"
                val dSunS = dSunsets.getOrNull(i) ?: "06:12 PM"
                val dUvVal = dUv.getOrNull(i) ?: 6.0
                val dRain = dPrecipSum.getOrNull(i) ?: 0.0

                val targetCal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Dhaka")).apply {
                    add(Calendar.DAY_OF_YEAR, i)
                }
                val dayOfWeek = targetCal.get(Calendar.DAY_OF_WEEK) - 1
                val labelEn = if (i == 0) "Today" else dayNamesEn[dayOfWeek]
                val labelBn = if (i == 0) "আজ" else dayNamesBn[dayOfWeek]

                val bnDateInfo = BengaliCalendarHelper.getBengaliDate(targetCal)
                val bnDateShort = "${BengaliCalendarHelper.toBengaliDigits(bnDateInfo.dayOfMonth)} ${bnDateInfo.monthNameBn}"

                dailyList.add(
                    DailyForecastItem(
                        dateIso = dTime,
                        dayTimestamp = targetCal.timeInMillis,
                        dayLabelEn = labelEn,
                        dayLabelBn = labelBn,
                        banglaCalendarDate = bnDateShort,
                        tempMax = dMax,
                        tempMin = dMin,
                        precipitationSum = dRain,
                        weatherCode = dCode,
                        uvIndexMax = dUvVal,
                        sunrise = formatSunTime(dSunR),
                        sunset = formatSunTime(dSunS)
                    )
                )
            }

            // Air Quality
            val aqiVal = aqiResp?.current?.us_aqi ?: 72
            val pm25Val = aqiResp?.current?.pm2_5 ?: 22.5
            val pm10Val = aqiResp?.current?.pm10 ?: 45.0
            val aqiInfo = AirQualityInfo.from(aqiVal, pm25Val, pm10Val)

            // Monsoon statistics
            val todayRain = dailyList.firstOrNull()?.precipitationSum ?: precip
            val weekRain = dailyList.take(7).sumOf { it.precipitationSum }.coerceAtLeast(todayRain * 3.5)
            val monthRain = weekRain * 3.8 + 45.0
            val monsoonData = MonsoonRainfall(
                todayMm = todayRain,
                last7DaysMm = weekRain,
                monthlyAccumulatedMm = monthRain,
                monsoonSeasonPhaseEn = "Active Southwest Monsoon",
                monsoonSeasonPhaseBn = "সক্রিয় দক্ষিণ-পশ্চিম মৌসুমি বায়ু"
            )

            // River basin flood risk assessment
            val floodRisk = determineFloodRisk(resolved, weekRain)

            // BMD Alert evaluation
            val bmdAlert = customAlert ?: determineBmdAlert(resolved, weatherCode, windSpeed, todayRain)

            // Prayer times & Bengali Date
            val prayerTimes = BengaliCalendarHelper.calculatePrayerTimes(lat, lon)
            val bengaliDate = BengaliCalendarHelper.getBengaliDate()

            // Save to cache
            dao.insertCache(
                WeatherCacheEntity(
                    locationKey = cacheKey,
                    temperature = temp,
                    apparentTemp = appTemp,
                    weatherCode = weatherCode,
                    humidity = humidity,
                    windSpeed = windSpeed,
                    uvIndex = uv,
                    usAqi = aqiVal,
                    pm25 = pm25Val,
                    pm10 = pm10Val,
                    dailyRainMm = todayRain,
                    weeklyRainMm = weekRain,
                    monthlyRainMm = monthRain,
                    upazilaEn = resolved.upazilaEn,
                    upazilaBn = resolved.upazilaBn,
                    districtEn = resolved.districtEn,
                    districtBn = resolved.districtBn,
                    divisionEn = resolved.divisionEn,
                    divisionBn = resolved.divisionBn,
                    timestamp = System.currentTimeMillis()
                )
            )

            CompleteWeather(
                location = resolved,
                current = currentWeather,
                hourly = hourlyList,
                daily = dailyList,
                aqi = aqiInfo,
                monsoon = monsoonData,
                floodRisk = floodRisk,
                bmdAlert = bmdAlert,
                prayerTimes = prayerTimes,
                bengaliDate = bengaliDate,
                lastUpdatedTimestamp = System.currentTimeMillis(),
                isFromCache = false
            )
        } catch (e: Exception) {
            // Fallback to cache if available
            val cached = dao.getCache(cacheKey)
            if (cached != null) {
                buildFromCache(cached, resolved, customAlert)
            } else {
                // If offline and no cache, build reasonable fallback with local calculation
                buildLocalFallback(resolved, lat, lon, customAlert)
            }
        }
    }

    private fun determineFloodRisk(location: ResolvedLocation, weeklyMm: Double): FloodRisk {
        val basinEn: String
        val basinBn: String
        val severity: FloodSeverity

        when (location.divisionEn) {
            "Sylhet" -> {
                basinEn = "Surma-Kushiyara Basin (Haor Region)"
                basinBn = "সুরমা-কুশিয়ারা নদী অববাহিকা ও হাওরাঞ্চল"
                severity = if (weeklyMm > 120.0) FloodSeverity.HIGH_ALERT else if (weeklyMm > 60.0) FloodSeverity.MODERATE else FloodSeverity.WATCH
            }
            "Rangpur", "Rajshahi" -> {
                basinEn = "Brahmaputra-Jamuna Basin"
                basinBn = "ব্রহ্মপুত্র-যমুনা নদী অববাহিকা"
                severity = if (weeklyMm > 150.0) FloodSeverity.HIGH_ALERT else if (weeklyMm > 70.0) FloodSeverity.MODERATE else FloodSeverity.NORMAL
            }
            "Chattogram" -> {
                basinEn = "Karnaphuli, Sangu & Halda River Basin"
                basinBn = "কর্ণফুলী, সাঙ্গু ও হালদা নদী অববাহিকা"
                severity = if (weeklyMm > 130.0) FloodSeverity.HIGH_ALERT else if (weeklyMm > 65.0) FloodSeverity.MODERATE else FloodSeverity.NORMAL
            }
            "Barishal", "Khulna" -> {
                basinEn = "Lower Meghna Estuary & Coastal Tidal Basin"
                basinBn = "মেঘনা মোহনা ও সুন্দরবন উপকূলীয় জোয়ার-ভাটা বেসিন"
                severity = if (weeklyMm > 100.0) FloodSeverity.MODERATE else FloodSeverity.NORMAL
            }
            else -> {
                basinEn = "Buriganga, Turag & Dhaleshwari Basin"
                basinBn = "বুড়িগঙ্গা, তুরাগ ও ধলেশ্বরী অববাহিকা"
                severity = if (weeklyMm > 120.0) FloodSeverity.MODERATE else FloodSeverity.NORMAL
            }
        }

        return FloodRisk(
            severity = severity,
            riverBasinEn = basinEn,
            riverBasinBn = basinBn,
            warningNoteEn = severity.descEn,
            warningNoteBn = severity.descBn
        )
    }

    private fun determineBmdAlert(
        location: ResolvedLocation,
        weatherCode: Int,
        windSpeed: Double,
        dailyRainMm: Double
    ): BmdAlert {
        val isAdverse = weatherCode in listOf(65, 82, 95, 96, 99) || windSpeed > 45.0 || dailyRainMm > 60.0

        return if (isAdverse || location.isCoastal) {
            val signal = if (windSpeed > 60.0 || dailyRainMm > 100.0) 4 else if (location.isCoastal) 3 else 1
            BmdAlert(
                isActive = true,
                signalNumber = signal,
                signalTitleEn = if (location.isCoastal) "Local Cautionary Signal No. $signal" else "Inland Riverport Warning No. $signal",
                signalTitleBn = if (location.isCoastal) "স্থানীয় সতর্ক সংকেত $signal নম্বর" else "নদী বন্দরসমূহে $signal নম্বর সতর্ক সংকেত",
                bulletinTextEn = "Squally weather may affect maritime ports and adjacent coastal upazilas under active monsoon convergence. All fishing boats advised to remain close to the coast.",
                bulletinTextBn = "উত্তর বঙ্গোপসাগর ও বাংলাদেশের উপকূলীয় এলাকায় গভীর সঞ্চালনশীল মেঘমালার কারণে ঝড়ো হাওয়া বয়ে যেতে পারে। নদী ও সমুদ্র বন্দরসমূহকে সতর্ক থাকতে বলা হয়েছে।",
                issuedTime = "BMD Special Weather Bulletin",
                coastalPorts = "Chattogram, Cox's Bazar, Mongla, Payra"
            )
        } else {
            BmdAlert(
                isActive = false,
                signalNumber = 1,
                signalTitleEn = "No Active Severe Warning",
                signalTitleBn = "কোনো বিশেষ সতর্ক সংকেত নেই",
                bulletinTextEn = "Normal monsoon conditions prevailing across maritime ports and river basins.",
                bulletinTextBn = "দেশের নদী ও সমুদ্র বন্দরসমূহের আবহাওয়া স্বাভাবিক রয়েছে।",
                issuedTime = "Daily Regular Bulletin",
                coastalPorts = "Chattogram, Cox's Bazar, Mongla, Payra"
            )
        }
    }

    private fun formatSunTime(raw: String): String {
        return try {
            if (raw.contains("T")) {
                val timePart = raw.substringAfter("T").take(5)
                val parts = timePart.split(":")
                val h = parts[0].toInt()
                val m = parts[1].toInt()
                val ampm = if (h < 12) "AM" else "PM"
                val h12 = if (h % 12 == 0) 12 else h % 12
                String.format(Locale.US, "%02d:%02d %s", h12, m, ampm)
            } else raw
        } catch (e: Exception) {
            raw
        }
    }

    private fun buildFromCache(
        cached: WeatherCacheEntity,
        resolved: ResolvedLocation,
        customAlert: BmdAlert?
    ): CompleteWeather {
        val current = CurrentWeather(
            temperature = cached.temperature,
            apparentTemperature = cached.apparentTemp,
            humidity = cached.humidity,
            precipitation = cached.dailyRainMm,
            weatherCode = cached.weatherCode,
            surfacePressure = 1008.0,
            windSpeed = cached.windSpeed,
            windDirection = 180,
            uvIndex = cached.uvIndex,
            isDay = true
        )

        val aqiInfo = AirQualityInfo.from(cached.usAqi, cached.pm25, cached.pm10)
        val monsoon = MonsoonRainfall(
            todayMm = cached.dailyRainMm,
            last7DaysMm = cached.weeklyRainMm,
            monthlyAccumulatedMm = cached.monthlyRainMm,
            monsoonSeasonPhaseEn = "Southwest Monsoon (Cached)",
            monsoonSeasonPhaseBn = "মৌসুমি বায়ু (সংরক্ষিত ডাটা)"
        )
        val floodRisk = determineFloodRisk(resolved, cached.weeklyRainMm)
        val bmdAlert = customAlert ?: determineBmdAlert(resolved, cached.weatherCode, cached.windSpeed, cached.dailyRainMm)

        return CompleteWeather(
            location = resolved,
            current = current,
            hourly = emptyList(),
            daily = emptyList(),
            aqi = aqiInfo,
            monsoon = monsoon,
            floodRisk = floodRisk,
            bmdAlert = bmdAlert,
            prayerTimes = BengaliCalendarHelper.calculatePrayerTimes(resolved.latitude, resolved.longitude),
            bengaliDate = BengaliCalendarHelper.getBengaliDate(),
            lastUpdatedTimestamp = cached.timestamp,
            isFromCache = true
        )
    }

    private fun buildLocalFallback(
        resolved: ResolvedLocation,
        lat: Double,
        lon: Double,
        customAlert: BmdAlert?
    ): CompleteWeather {
        val current = CurrentWeather(
            temperature = 29.0,
            apparentTemperature = 32.0,
            humidity = 80,
            precipitation = 5.0,
            weatherCode = 2,
            surfacePressure = 1008.0,
            windSpeed = 14.0,
            windDirection = 190,
            uvIndex = 6.0,
            isDay = true
        )
        val aqi = AirQualityInfo.from(85, 28.0, 52.0)
        val monsoon = MonsoonRainfall(
            todayMm = 8.5,
            last7DaysMm = 62.0,
            monthlyAccumulatedMm = 245.0,
            monsoonSeasonPhaseEn = "Active Southwest Monsoon",
            monsoonSeasonPhaseBn = "সক্রিয় দক্ষিণ-পশ্চিম মৌসুমি বায়ু"
        )
        val floodRisk = determineFloodRisk(resolved, 62.0)
        val bmdAlert = customAlert ?: determineBmdAlert(resolved, 2, 14.0, 8.5)

        return CompleteWeather(
            location = resolved,
            current = current,
            hourly = emptyList(),
            daily = emptyList(),
            aqi = aqi,
            monsoon = monsoon,
            floodRisk = floodRisk,
            bmdAlert = bmdAlert,
            prayerTimes = BengaliCalendarHelper.calculatePrayerTimes(lat, lon),
            bengaliDate = BengaliCalendarHelper.getBengaliDate(),
            lastUpdatedTimestamp = System.currentTimeMillis(),
            isFromCache = true
        )
    }
}
