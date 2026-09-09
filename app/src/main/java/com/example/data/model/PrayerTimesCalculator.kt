package com.example.data.model

import java.util.Calendar
import java.util.Locale
import java.util.TimeZone
import kotlin.math.*

data class PrayerTimes(
    val fajr: String,
    val sunrise: String,
    val dhuhr: String,
    val asr: String,
    val maghrib: String,
    val isha: String
)

object PrayerTimesCalculator {

    /**
     * Calculates prayer times for given coordinates and date using standard solar declination
     */
    fun calculate(
        latitude: Double,
        longitude: Double,
        timestamp: Long = System.currentTimeMillis(),
        use24Hour: Boolean = true,
        useBengaliDigits: Boolean = false
    ): PrayerTimes {
        val cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Dhaka"))
        cal.timeInMillis = timestamp

        val dayOfYear = cal.get(Calendar.DAY_OF_YEAR)
        val timeZoneOffset = 6.0 // Bangladesh Standard Time GMT+6

        // Solar calculations
        val d = dayOfYear.toDouble()
        val b = 2 * Math.PI * (d - 81) / 365.0
        // Equation of time in minutes
        val eot = 9.87 * sin(2 * b) - 7.53 * cos(b) - 1.5 * sin(b)
        // Solar declination in radians
        val delta = Math.toRadians(23.45 * sin(2 * Math.PI * (d - 81) / 365.0))

        val latRad = Math.toRadians(latitude)

        // Solar noon in hours (BST)
        val solarNoon = 12.0 - (longitude - timeZoneOffset * 15.0) / 15.0 - (eot / 60.0)

        // Hour angle for horizon (-0.833 degrees for refraction & sun radius)
        fun hourAngle(altitudeDeg: Double): Double {
            val altRad = Math.toRadians(altitudeDeg)
            val cosH = (sin(altRad) - sin(latRad) * sin(delta)) / (cos(latRad) * cos(delta))
            val clamped = cosH.coerceIn(-1.0, 1.0)
            return Math.toDegrees(acos(clamped)) / 15.0
        }

        // Twilight angles: Fajr (-18°), Sunrise (-0.833°), Maghrib (-0.833°), Isha (-18°)
        val hSunrise = hourAngle(-0.833)
        val hFajr = hourAngle(-18.0)
        val hIsha = hourAngle(-18.0)

        // Asr: Hanafi/standard angle: shadow = object length + shadow at noon (factor 1 or 2)
        // For South Asia/Bangladesh, Hanafi is common (factor 2) or standard (factor 1)
        val shadowFactor = 1.5
        val noonAltRad = Math.PI / 2.0 - abs(latRad - delta)
        val asrAltRad = atan(1.0 / (shadowFactor + 1.0 / tan(noonAltRad)))
        val asrAltDeg = Math.toDegrees(asrAltRad)
        val hAsr = hourAngle(asrAltDeg)

        val fajrTime = solarNoon - hFajr
        val sunriseTime = solarNoon - hSunrise
        val dhuhrTime = solarNoon + (4.0 / 60.0) // 4 min after noon
        val asrTime = solarNoon + hAsr
        val maghribTime = solarNoon + hSunrise + (3.0 / 60.0) // 3 min after sunset
        val ishaTime = solarNoon + hIsha

        fun formatTime(hoursDecimal: Double): String {
            val totalMinutes = (hoursDecimal * 60.0).roundToInt()
            var h = (totalMinutes / 60) % 24
            val m = totalMinutes % 60
            if (h < 0) h += 24

            val rawStr = if (use24Hour) {
                String.format(Locale.US, "%02d:%02d", h, m)
            } else {
                val amPm = if (h >= 12) "PM" else "AM"
                val h12 = if (h % 12 == 0) 12 else h % 12
                String.format(Locale.US, "%02d:%02d %s", h12, m, amPm)
            }

            return if (useBengaliDigits) {
                BengaliCalendarHelper.toBengaliDigits(rawStr)
            } else {
                rawStr
            }
        }

        return PrayerTimes(
            fajr = formatTime(fajrTime),
            sunrise = formatTime(sunriseTime),
            dhuhr = formatTime(dhuhrTime),
            asr = formatTime(asrTime),
            maghrib = formatTime(maghribTime),
            isha = formatTime(ishaTime)
        )
    }
}
