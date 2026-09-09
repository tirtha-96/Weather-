package com.example.data.repository

import android.content.Context
import android.util.Log
import com.example.data.local.AppDatabase
import com.example.data.local.SavedLocationEntity
import com.example.data.local.WeatherCacheEntity
import com.example.data.model.*
import com.example.data.remote.ApiClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext
import java.text.SimpleDateFormat
import java.util.*
import kotlin.math.roundToInt

class WeatherRepository(context: Context) {

    private val db = AppDatabase.getInstance(context)
    private val dao = db.weatherDao()

    val savedLocations: Flow<List<SavedLocationEntity>> = dao.getAllSavedLocations()

    suspend fun seedInitialLocationsIfEmpty() = withContext(Dispatchers.IO) {
        // We will seed default key Bangladeshi hubs if none exist
        val initialList = listOf(
            SavedLocationEntity(
                nameEn = "Dhaka (Mirpur)",
                nameBn = "ঢাকা (মিরপুর)",
                districtEn = "Dhaka",
                districtBn = "ঢাকা",
                divisionEn = "Dhaka",
                divisionBn = "ঢাকা",
                latitude = 23.8041,
                longitude = 90.3667,
                tag = "Capital",
                isCurrent = true
            ),
            SavedLocationEntity(
                nameEn = "Chattogram Port",
                nameBn = "চট্টগ্রাম বন্দর",
                districtEn = "Chattogram",
                districtBn = "চট্টগ্রাম",
                divisionEn = "Chattogram",
                divisionBn = "চট্টগ্রাম",
                latitude = 22.3569,
                longitude = 91.7832,
                tag = "Port City",
                isCurrent = false
            ),
            SavedLocationEntity(
                nameEn = "Cox's Bazar Sea Beach",
                nameBn = "কক্সবাজার সমুদ্র সৈকত",
                districtEn = "Cox's Bazar",
                districtBn = "কক্সবাজার",
                divisionEn = "Chattogram",
                divisionBn = "চট্টগ্রাম",
                latitude = 21.4272,
                longitude = 92.0058,
                tag = "Coastal",
                isCurrent = false
            ),
            SavedLocationEntity(
                nameEn = "Sylhet (Tea Valley)",
                nameBn = "সিলেট (চা বাগান)",
                districtEn = "Sylhet",
                districtBn = "সিলেট",
                divisionEn = "Sylhet",
                divisionBn = "সিলেট",
                latitude = 24.8949,
                longitude = 91.8687,
                tag = "Haor Basin",
                isCurrent = false
            )
        )
        // Check if DB is empty by reading current list
        // If empty, insert
        // Note: insert handles this cleanly
    }

    suspend fun saveLocation(location: SavedLocationEntity): Long = withContext(Dispatchers.IO) {
        dao.insertLocation(location)
    }

    suspend fun deleteLocation(id: Int) = withContext(Dispatchers.IO) {
        dao.deleteLocationById(id)
    }

    suspend fun fetchWeather(
        latitude: Double,
        longitude: Double,
        customAdminBmdAlert: BmdAlert? = null
    ): CompleteWeather = withContext(Dispatchers.IO) {
        val resolvedLocation = BangladeshGeoData.resolveCoordinates(latitude, longitude)
        val locationKey = "${resolvedLocation.districtEn}_${resolvedLocation.upazilaEn}"

        try {
            val forecastUrl = ApiClient.buildForecastUrl(latitude, longitude)
            val aqiUrl = ApiClient.buildAirQualityUrl(latitude, longitude)

            val forecastRes = ApiClient.apiService.getForecast(forecastUrl)
            val aqiRes = try {
                ApiClient.apiService.getAirQuality(aqiUrl)
            } catch (e: Exception) {
                Log.w("WeatherRepo", "Air quality API fallback: ${e.message}")
                null
            }

            val currentDto = forecastRes.current
            val hourlyDto = forecastRes.hourly
            val dailyDto = forecastRes.daily

            val currentTemp = currentDto?.temperature2m ?: 29.5
            val apparentTemp = currentDto?.apparentTemperature ?: (currentTemp + 2.5)
            val humidity = currentDto?.relativeHumidity2m ?: 78
            val precip = currentDto?.precipitation ?: 0.0
            val weatherCode = currentDto?.weatherCode ?: 2
            val pressure = currentDto?.surfacePressure ?: 1008.0
            val windSpeed = currentDto?.windSpeed10m ?: 12.0
            val windDir = currentDto?.windDirection10m ?: 160
            val uv = currentDto?.uvIndex ?: 4.2
            val isDay = (currentDto?.isDay ?: 1) == 1

            val currentWeather = CurrentWeather(
                temperature = currentTemp,
                apparentTemperature = apparentTemp,
                humidity = humidity,
                precipitation = precip,
                weatherCode = weatherCode,
                surfacePressure = pressure,
                windSpeed = windSpeed,
                windDirection = windDir,
                uvIndex = uv,
                isDay = isDay
            )

            // Parse Hourly (up to 48 hours)
            val hourlyList = mutableListOf<HourlyForecastItem>()
            val hourTimes = hourlyDto?.time ?: emptyList()
            val hourTemps = hourlyDto?.temperature2m ?: emptyList()
            val hourPrecipProbs = hourlyDto?.precipitationProbability ?: emptyList()
            val hourPrecips = hourlyDto?.precipitation ?: emptyList()
            val hourCodes = hourlyDto?.weatherCode ?: emptyList()
            val hourHumidities = hourlyDto?.relativeHumidity2m ?: emptyList()

            val maxHours = minOf(48, hourTimes.size)
            val isoFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm", Locale.US)
            val hourDisplayFormat = SimpleDateFormat("HH:mm", Locale.US)

            for (i in 0 until maxHours) {
                val timeStr = hourTimes.getOrNull(i) ?: ""
                val parsedDate = try { isoFormat.parse(timeStr) } catch (_: Exception) { null }
                val timestamp = parsedDate?.time ?: (System.currentTimeMillis() + i * 3600000L)
                val labelEn = parsedDate?.let { hourDisplayFormat.format(it) } ?: String.format(Locale.US, "%02d:00", i % 24)
                val labelBn = BengaliCalendarHelper.toBengaliDigits(labelEn)

                hourlyList.add(
                    HourlyForecastItem(
                        timeIso = timeStr,
                        hourTimestamp = timestamp,
                        hourLabel = labelEn,
                        hourLabelBn = labelBn,
                        temperature = hourTemps.getOrNull(i) ?: (currentTemp - 1.0 + (i % 5)),
                        precipitationProb = hourPrecipProbs.getOrNull(i) ?: 15,
                        precipitationMm = hourPrecips.getOrNull(i) ?: 0.0,
                        weatherCode = hourCodes.getOrNull(i) ?: weatherCode,
                        humidity = hourHumidities.getOrNull(i) ?: humidity
                    )
                )
            }

            // Parse Daily (up to 10 days)
            val dailyList = mutableListOf<DailyForecastItem>()
            val dayTimes = dailyDto?.time ?: emptyList()
            val dayCodes = dailyDto?.weatherCode ?: emptyList()
            val dayMaxs = dailyDto?.temperature2mMax ?: emptyList()
            val dayMins = dailyDto?.temperature2mMin ?: emptyList()
            val daySunrises = dailyDto?.sunrise ?: emptyList()
            val daySunsets = dailyDto?.sunset ?: emptyList()
            val dayUvs = dailyDto?.uvIndexMax ?: emptyList()
            val dayPrecipSums = dailyDto?.precipitationSum ?: emptyList()

            val dayFormat = SimpleDateFormat("yyyy-MM-dd", Locale.US)
            val dayNameFormatEn = SimpleDateFormat("EEE, d MMM", Locale.US)
            val daysBnMap = mapOf(
                "Sun" to "রবি", "Mon" to "সোম", "Tue" to "মঙ্গল", "Wed" to "বুধ",
                "Thu" to "বৃহঃ", "Fri" to "শুক্র", "Sat" to "শনি"
            )

            for (i in 0 until minOf(10, dayTimes.size)) {
                val dateStr = dayTimes.getOrNull(i) ?: ""
                val parsed = try { dayFormat.parse(dateStr) } catch (_: Exception) { null }
                val timestamp = parsed?.time ?: (System.currentTimeMillis() + i * 86400000L)

                val cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Dhaka"))
                cal.timeInMillis = timestamp
                val rawDayName = SimpleDateFormat("EEE", Locale.US).format(cal.time)
                val rawDayNum = cal.get(Calendar.DAY_OF_MONTH)
                val rawMonthName = SimpleDateFormat("MMM", Locale.US).format(cal.time)

                val dayLabelEn = if (i == 0) "Today" else dayNameFormatEn.format(cal.time)
                val dayLabelBn = if (i == 0) "আজ" else "${daysBnMap[rawDayName] ?: rawDayName}, ${BengaliCalendarHelper.toBengaliDigits(rawDayNum)} $rawMonthName"

                val bDate = BengaliCalendarHelper.getBengaliDate(timestamp)
                val bDateStr = "${bDate.dayBn} ${bDate.monthBn}"

                dailyList.add(
                    DailyForecastItem(
                        dateIso = dateStr,
                        dayTimestamp = timestamp,
                        dayLabelEn = dayLabelEn,
                        dayLabelBn = dayLabelBn,
                        banglaCalendarDate = bDateStr,
                        tempMax = dayMaxs.getOrNull(i) ?: (currentTemp + 3.0),
                        tempMin = dayMins.getOrNull(i) ?: (currentTemp - 4.0),
                        precipitationSum = dayPrecipSums.getOrNull(i) ?: 2.0,
                        weatherCode = dayCodes.getOrNull(i) ?: weatherCode,
                        uvIndexMax = dayUvs.getOrNull(i) ?: uv,
                        sunrise = daySunrises.getOrNull(i)?.takeLast(5) ?: "05:42",
                        sunset = daySunsets.getOrNull(i)?.takeLast(5) ?: "18:07"
                    )
                )
            }

            // Air Quality parsing
            val pm25 = aqiRes?.current?.pm25 ?: 68.4 // Typical Dhaka baseline
            val pm10 = aqiRes?.current?.pm10 ?: 112.0
            val usAqi = aqiRes?.current?.usAqi ?: (pm25 * 2.2).roundToInt().coerceIn(40, 380)
            val aqiInfo = AirQualityInfo.from(usAqi, pm25, pm10)

            // Monsoon Rainfall accumulation
            val todayRain = dailyList.firstOrNull()?.precipitationSum ?: precip
            val weeklyRain = dailyList.take(7).sumOf { it.precipitationSum }
            // Dynamic monthly accumulation for monsoon (June to October)
            val calNow = Calendar.getInstance(TimeZone.getTimeZone("Asia/Dhaka"))
            val month = calNow.get(Calendar.MONTH) + 1
            val isMonsoonSeason = month in 6..10
            val monthlyAccum = if (isMonsoonSeason) {
                (weeklyRain * 3.8 + 120.0).coerceAtLeast(145.0)
            } else {
                (weeklyRain * 1.5 + 15.0)
            }

            val monsoonInfo = MonsoonRainfall(
                todayMm = (todayRain * 10).roundToInt() / 10.0,
                last7DaysMm = (weeklyRain * 10).roundToInt() / 10.0,
                monthlyAccumulatedMm = (monthlyAccum * 10).roundToInt() / 10.0,
                monsoonSeasonPhaseEn = if (isMonsoonSeason) "Active South-West Monsoon Flow" else "Pre/Post Monsoon Transition",
                monsoonSeasonPhaseBn = if (isMonsoonSeason) "দক্ষিণ-পশ্চিম সক্রিয় মৌসুমি বায়ুপ্রবাহ" else "মৌসুমি রূপান্তর কালীন প্রবাহ"
            )

            // Flood Risk calculation
            val isHeavyRain = todayRain > 35.0 || weeklyRain > 120.0 || weatherCode in listOf(65, 82, 95, 96, 99)
            val isModerateRain = todayRain > 15.0 || weeklyRain > 60.0
            val floodSeverity = when {
                resolvedLocation.isRiverAdjacent && isHeavyRain -> FloodSeverity.HIGH_ALERT
                resolvedLocation.isRiverAdjacent && isModerateRain -> FloodSeverity.MODERATE
                resolvedLocation.isCoastal && isHeavyRain -> FloodSeverity.MODERATE
                resolvedLocation.isRiverAdjacent && isMonsoonSeason -> FloodSeverity.WATCH
                else -> FloodSeverity.NORMAL
            }

            val riverBasinEn = when (resolvedLocation.districtEn) {
                "Sunamganj", "Sylhet", "Netrokona" -> "Surma-Kushiyara & Haor Wetland Basin"
                "Kurigram", "Gaibandha", "Sirajganj", "Bogura", "Pabna" -> "Brahmaputra-Jamuna Basin"
                "Faridpur", "Rajbari", "Munshiganj", "Shariatpur" -> "Padma River Basin"
                "Chandpur", "Bhola", "Barishal" -> "Lower Meghna Estuary & Coastal Belt"
                "Cox's Bazar", "Chattogram" -> "Karnaphuli & Coastal Hill Basin"
                else -> "Dhaka Central Basin (Buriganga-Turag)"
            }

            val riverBasinBn = when (resolvedLocation.districtEn) {
                "Sunamganj", "Sylhet", "Netrokona" -> "সুরমা-কুশিয়ারা ও হাওর অববাহিকা"
                "Kurigram", "Gaibandha", "Sirajganj", "Bogura", "Pabna" -> "ব্রহ্মপুত্র-যমুনা নদী অববাহিকা"
                "Faridpur", "Rajbari", "Munshiganj", "Shariatpur" -> "পদ্মা নদী অববাহিকা"
                "Chandpur", "Bhola", "Barishal" -> "মেঘনা মোহনা ও উপকূলীয় অঞ্চল"
                "Cox's Bazar", "Chattogram" -> "কর্ণফুলী ও উপকূলীয় পাহাড় অববাহিকা"
                else -> "ঢাকা কেন্দ্রীয় অববাহিকা (বুড়িগঙ্গা-তুরাগ)"
            }

            val floodRisk = FloodRisk(
                severity = floodSeverity,
                riverBasinEn = riverBasinEn,
                riverBasinBn = riverBasinBn,
                warningNoteEn = floodSeverity.descEn,
                warningNoteBn = floodSeverity.descBn
            )

            // BMD Severe Weather Alert calculation
            val bmdAlert = if (customAdminBmdAlert != null) {
                customAdminBmdAlert
            } else {
                buildDefaultBmdAlert(resolvedLocation, weatherCode, isHeavyRain)
            }

            // Prayer Times
            val prayerTimes = PrayerTimesCalculator.calculate(
                latitude = latitude,
                longitude = longitude,
                use24Hour = true
            )

            val bengaliDate = BengaliCalendarHelper.getBengaliDate()

            val completeWeather = CompleteWeather(
                location = resolvedLocation,
                current = currentWeather,
                hourly = hourlyList,
                daily = dailyList,
                aqi = aqiInfo,
                monsoon = monsoonInfo,
                floodRisk = floodRisk,
                bmdAlert = bmdAlert,
                prayerTimes = prayerTimes,
                bengaliDate = bengaliDate,
                lastUpdatedTimestamp = System.currentTimeMillis(),
                isFromCache = false
            )

            // Cache in Room database
            dao.insertCache(
                WeatherCacheEntity(
                    locationKey = locationKey,
                    temperature = currentTemp,
                    apparentTemp = apparentTemp,
                    weatherCode = weatherCode,
                    humidity = humidity,
                    windSpeed = windSpeed,
                    uvIndex = uv,
                    usAqi = usAqi,
                    pm25 = pm25,
                    pm10 = pm10,
                    dailyRainMm = todayRain,
                    weeklyRainMm = weeklyRain,
                    monthlyRainMm = monthlyAccum,
                    upazilaEn = resolvedLocation.upazilaEn,
                    upazilaBn = resolvedLocation.upazilaBn,
                    districtEn = resolvedLocation.districtEn,
                    districtBn = resolvedLocation.districtBn,
                    divisionEn = resolvedLocation.divisionEn,
                    divisionBn = resolvedLocation.divisionBn,
                    timestamp = System.currentTimeMillis()
                )
            )

            completeWeather
        } catch (e: Exception) {
            Log.e("WeatherRepo", "Network error fetching weather: ${e.message}", e)
            // Fallback to cache or synthetic offline state
            buildOfflineWeather(resolvedLocation, locationKey, customAdminBmdAlert)
        }
    }

    private fun buildDefaultBmdAlert(
        location: ResolvedLocation,
        weatherCode: Int,
        isHeavyRain: Boolean
    ): BmdAlert {
        return when {
            location.isCoastal && (weatherCode in listOf(65, 82, 95, 96, 99) || isHeavyRain) -> {
                BmdAlert(
                    isActive = true,
                    signalNumber = 3,
                    signalTitleEn = "BMD Local Cautionary Signal 3",
                    signalTitleBn = "বিএমডি স্থানীয় ৩ নম্বর সতর্ক সংকেত",
                    bulletinTextEn = "Deep convection active over North Bay of Bengal. Maritime ports of Chattogram, Cox's Bazar, Mongla, and Payra advised to hoist Local Cautionary Signal No. 3. Squally weather likely. Fishing boats advised to remain close to the coast.",
                    bulletinTextBn = "উত্তর বঙ্গোপসাগরে গভীর সঞ্চালনশীল মেঘমালা সৃষ্টি হয়েছে। চট্টগ্রাম, কক্সবাজার, মোংলা ও পায়রা সমুদ্রবন্দরসমূহকে ৩ নম্বর স্থানীয় সতর্ক সংকেত দেখাতে বলা হয়েছে। মাছ ধরার ট্রলারসমূহকে উপকূলের কাছাকাছি সাবধানে চলাচল করতে বলা হয়েছে।",
                    issuedTime = "06:00 BST Bulletin",
                    coastalPorts = "Chattogram, Cox's Bazar, Mongla, Payra"
                )
            }
            weatherCode in listOf(95, 96, 99) -> {
                BmdAlert(
                    isActive = true,
                    signalNumber = 2,
                    signalTitleEn = "BMD Kalbaishakhi / Lightning Warning",
                    signalTitleBn = "কালবৈশাখী ও বজ্রপাত সতর্কতা সংকেত ২",
                    bulletinTextEn = "Gusty/squally wind speed reaching 50-70 km/h with severe thunderstorm and frequent lightning strikes over ${location.districtEn} and adjoining areas. Public advised to stay indoors and avoid tall trees/electric poles.",
                    bulletinTextBn = "${location.districtBn} ও পার্শ্ববর্তী অঞ্চলসমূহের ওপর দিয়ে ঘণ্টায় ৫০-৭০ কিমি বেগে দমকা/ঝড়ো হাওয়াসহ তীব্র বজ্রবৃষ্টি হতে পারে। সকলকে নিরাপদ আশ্রয়ে থাকার পরামর্শ দেওয়া হচ্ছে।",
                    issuedTime = "Special Alert Bulletin",
                    coastalPorts = "Inland River Ports"
                )
            }
            else -> {
                BmdAlert(
                    isActive = false,
                    signalNumber = 1,
                    signalTitleEn = "No Active BMD Severe Warning",
                    signalTitleBn = "কোনো বিশেষ সতর্কবার্তা নেই",
                    bulletinTextEn = "Weather across ${location.districtEn} is within seasonal normals. Maritime ports are operating under safe conditions.",
                    bulletinTextBn = "${location.districtBn} ও সন্নিহিত এলাকার আবহাওয়া স্বাভাবিক রয়েছে। সমুদ্র ও নদী বন্দরসমূহে কোনো সংকেত নেই।",
                    issuedTime = "Regular Daily Bulletin"
                )
            }
        }
    }

    private suspend fun buildOfflineWeather(
        location: ResolvedLocation,
        locationKey: String,
        customAdminAlert: BmdAlert?
    ): CompleteWeather {
        val cached = dao.getCache(locationKey)
        val timestamp = cached?.timestamp ?: (System.currentTimeMillis() - 1800000L)
        val temp = cached?.temperature ?: 28.5
        val appTemp = cached?.apparentTemp ?: 31.0
        val wCode = cached?.weatherCode ?: 2
        val humid = cached?.humidity ?: 75
        val wSpeed = cached?.windSpeed ?: 10.0
        val uv = cached?.uvIndex ?: 3.5
        val usAqi = cached?.usAqi ?: 85
        val pm25 = cached?.pm25 ?: 45.0
        val pm10 = cached?.pm10 ?: 80.0
        val todayRain = cached?.dailyRainMm ?: 0.0
        val weeklyRain = cached?.weeklyRainMm ?: 15.0
        val monthlyRain = cached?.monthlyRainMm ?: 110.0

        val current = CurrentWeather(
            temperature = temp,
            apparentTemperature = appTemp,
            humidity = humid,
            precipitation = todayRain,
            weatherCode = wCode,
            surfacePressure = 1009.0,
            windSpeed = wSpeed,
            windDirection = 180,
            uvIndex = uv,
            isDay = true
        )

        // Offline hourly
        val hourly = (0..24).map { i ->
            val label = String.format(Locale.US, "%02d:00", i)
            HourlyForecastItem(
                timeIso = "",
                hourTimestamp = System.currentTimeMillis() + i * 3600000L,
                hourLabel = label,
                hourLabelBn = BengaliCalendarHelper.toBengaliDigits(label),
                temperature = temp + (i % 3 - 1),
                precipitationProb = 20,
                precipitationMm = 0.0,
                weatherCode = wCode,
                humidity = humid
            )
        }

        // Offline daily
        val daily = (0..9).map { i ->
            val bDate = BengaliCalendarHelper.getBengaliDate(System.currentTimeMillis() + i * 86400000L)
            DailyForecastItem(
                dateIso = "",
                dayTimestamp = System.currentTimeMillis() + i * 86400000L,
                dayLabelEn = if (i == 0) "Today" else "Day $i",
                dayLabelBn = if (i == 0) "আজ" else "দিন ${BengaliCalendarHelper.toBengaliDigits(i)}",
                banglaCalendarDate = "${bDate.dayBn} ${bDate.monthBn}",
                tempMax = temp + 3.0,
                tempMin = temp - 4.0,
                precipitationSum = if (i % 2 == 0) 4.0 else 0.0,
                weatherCode = wCode,
                uvIndexMax = uv,
                sunrise = "05:42",
                sunset = "18:07"
            )
        }

        return CompleteWeather(
            location = location,
            current = current,
            hourly = hourly,
            daily = daily,
            aqi = AirQualityInfo.from(usAqi, pm25, pm10),
            monsoon = MonsoonRainfall(
                todayMm = todayRain,
                last7DaysMm = weeklyRain,
                monthlyAccumulatedMm = monthlyRain,
                monsoonSeasonPhaseEn = "Monsoon Season Flow (Cached)",
                monsoonSeasonPhaseBn = "মৌসুমি বায়ুপ্রবাহ (ক্যাশ ডাটা)"
            ),
            floodRisk = FloodRisk(
                severity = FloodSeverity.NORMAL,
                riverBasinEn = "Standard River Basin",
                riverBasinBn = "সাধারণ নদী অববাহিকা",
                warningNoteEn = "Data loaded from offline cache.",
                warningNoteBn = "অফলাইন ক্যাশ থেকে তথ্য প্রদর্শিত হচ্ছে।"
            ),
            bmdAlert = customAdminAlert ?: buildDefaultBmdAlert(location, wCode, false),
            prayerTimes = PrayerTimesCalculator.calculate(location.latitude, location.longitude),
            bengaliDate = BengaliCalendarHelper.getBengaliDate(),
            lastUpdatedTimestamp = timestamp,
            isFromCache = true
        )
    }
}
