package com.example.data.model

import java.util.Calendar
import java.util.TimeZone

enum class BengaliSeason(
    val nameEn: String,
    val nameBn: String,
    val descriptionEn: String,
    val descriptionBn: String,
    val iconKey: String
) {
    GRISHMO("Grishmo (Summer)", "গ্রীষ্ম কাল", "High heat, humid winds & Kalbaishakhi thunderstorms", "তপ্ত রোদ, কালবৈশাখী ও পাকা ফলের সুবাস", "summer"),
    BARSHA("Barsha (Monsoon)", "বর্ষা কাল", "Heavy monsoon rains, active river flows & cloudbursts", "মেঘভাঙা বারিধারা, সজল বাতাস ও প্লাবিত নদী", "monsoon"),
    SHARAT("Sharat (Autumn)", "শরৎ কাল", "Clear blue skies, drifting white kashful clouds", "নীল আকাশে সাদা মেঘের ভেলা ও শুভ্র কাশফুল", "autumn"),
    HEMANTO("Hemanto (Late Autumn)", "হেমন্ত কাল", "Dewy dawns, golden paddy harvest & gentle chill", "ভোরের শিশিরভেজা ঘাস, পাকা আমন ধান ও নবান্ন", "late_autumn"),
    SHEET("Sheet (Winter)", "শীত কাল", "Cool northern breeze, morning mist & date palm sap", "উত্তুরে হাওয়া, ভোরের কুয়াশা ও খেজুরের রস", "winter"),
    BOSHONTO("Boshonto (Spring)", "বসন্ত কাল", "Pleasant warmth, blooming shimul & south breeze", "দক্ষিণা সমীরণ, পলাশ-শিমুল ও কোকিলের গান", "spring")
}

data class PrayerTimes(
    val fajr: String,
    val sunrise: String = "",
    val dhuhr: String,
    val asr: String,
    val maghrib: String,
    val isha: String
)

data class BengaliDateInfo(
    val dayBn: String,
    val dayEn: Int,
    val monthBn: String,
    val monthEn: String,
    val yearBn: String,
    val yearEn: Int,
    val formattedBn: String,
    val formattedEn: String,
    val season: BengaliSeason,
    // Compatibility accessors for UI & repository layers
    val dayOfMonth: Int = dayEn,
    val monthNameEn: String = monthEn,
    val monthNameBn: String = monthBn,
    val year: Int = yearEn,
    val seasonEn: String = season.nameEn,
    val seasonBn: String = season.nameBn,
    val fullFormattedBn: String = formattedBn,
    val fullFormattedEn: String = formattedEn
)

object BengaliCalendarHelper {

    private val BANGLA_DIGITS = charArrayOf('০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯')

    fun toBengaliDigits(input: Any): String {
        val str = input.toString()
        val sb = StringBuilder()
        for (ch in str) {
            if (ch in '0'..'9') {
                sb.append(BANGLA_DIGITS[ch - '0'])
            } else {
                sb.append(ch)
            }
        }
        return sb.toString()
    }

    /**
     * Converts a Gregorian Calendar or timestamp to the official Bangladesh Bengali Academy calendar
     */
    fun getBengaliDate(cal: Calendar): BengaliDateInfo {
        return getBengaliDate(cal.timeInMillis)
    }

    fun getBengaliDate(timestamp: Long = System.currentTimeMillis()): BengaliDateInfo {
        val cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Dhaka"))
        cal.timeInMillis = timestamp

        val gYear = cal.get(Calendar.YEAR)
        val gMonth = cal.get(Calendar.MONTH) + 1 // 1-12
        val gDay = cal.get(Calendar.DAY_OF_MONTH)

        val monthsBn = listOf("বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র")
        val monthsEn = listOf("Boishakh", "Joishtho", "Asharh", "Srabon", "Bhadro", "Ashwin", "Kartik", "Ograhayon", "Poush", "Magh", "Falgun", "Choitro")

        // Revised Bangladesh calendar (Bangla Academy, 2019): the year starts on 14 April;
        // Boishakh–Ashwin have 31 days, Kartik–Magh 30, Falgun 29 (30 when the February inside
        // it is a Gregorian leap year) and Choitro 30. This keeps 1 Poush on 16 December,
        // 1 Falgun on 14 February and 8 Falgun on 21 February.
        val startYear = if (gMonth > 4 || (gMonth == 4 && gDay >= 14)) gYear else gYear - 1
        val bYear = startYear - 593

        val falgunDays = if (isGregorianLeapYear(startYear + 1)) 30 else 29
        val monthLengths = intArrayOf(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, falgunDays, 30)

        // Whole days since 14 April of startYear, counted on a UTC calendar so DST can't skew it.
        val utc = TimeZone.getTimeZone("UTC")
        val target = Calendar.getInstance(utc).apply { clear(); set(gYear, gMonth - 1, gDay) }
        val yearStart = Calendar.getInstance(utc).apply { clear(); set(startYear, Calendar.APRIL, 14) }
        var remaining = ((target.timeInMillis - yearStart.timeInMillis) / 86_400_000L).toInt()

        var bMonthIdx = 11
        var bDay = 1
        for (i in monthLengths.indices) {
            if (remaining < monthLengths[i]) {
                bMonthIdx = i
                bDay = remaining + 1
                break
            }
            remaining -= monthLengths[i]
        }

        val monthBn = monthsBn[bMonthIdx]
        val monthEn = monthsEn[bMonthIdx]

        // 6 Bengali Seasons: 2 months each
        val season = when (bMonthIdx) {
            0, 1 -> BengaliSeason.GRISHMO   // Boishakh, Joishtho
            2, 3 -> BengaliSeason.BARSHA    // Asharh, Srabon
            4, 5 -> BengaliSeason.SHARAT    // Bhadro, Ashwin
            6, 7 -> BengaliSeason.HEMANTO   // Kartik, Ograhayon
            8, 9 -> BengaliSeason.SHEET     // Poush, Magh
            else -> BengaliSeason.BOSHONTO  // Falgun, Choitro
        }

        val dayBn = toBengaliDigits(bDay)
        val yearBn = toBengaliDigits(bYear)

        val formattedBn = "$dayBn $monthBn, $yearBn বঙ্গাব্দ (${season.nameBn})"
        val formattedEn = "$bDay $monthEn, $bYear Banglabda (${season.nameEn})"

        return BengaliDateInfo(
            dayBn = dayBn,
            dayEn = bDay,
            monthBn = monthBn,
            monthEn = monthEn,
            yearBn = yearBn,
            yearEn = bYear,
            formattedBn = formattedBn,
            formattedEn = formattedEn,
            season = season
        )
    }

    private fun isGregorianLeapYear(year: Int): Boolean =
        (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)

    /**
     * Prayer times for Bangladesh (Islamic Foundation convention: 18° Fajr/Isha, Hanafi Asr),
     * formatted as 12-hour "hh:mm AM/PM". Delegates to [PrayerTimesCalculator].
     */
    fun calculatePrayerTimes(
        lat: Double,
        lon: Double,
        cal: Calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Dhaka"))
    ): PrayerTimes = PrayerTimesCalculator.calculate(
        latitude = lat,
        longitude = lon,
        timestamp = cal.timeInMillis,
        use24Hour = false
    )
}
