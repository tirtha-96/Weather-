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

data class BengaliDateInfo(
    val dayBn: String,
    val dayEn: Int,
    val monthBn: String,
    val monthEn: String,
    val yearBn: String,
    val yearEn: Int,
    val formattedBn: String,
    val formattedEn: String,
    val season: BengaliSeason
)

object BengaliCalendarHelper {

    private val BANGLA_DIGITS = charArrayOf('০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯')

    fun toBengaliDigits(input: Any): String {
        val str = input.toString()
        val sb = java.lang.StringBuilder()
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
     * Converts a Gregorian timestamp (or now) to the official Bangladesh Bengali Academy calendar
     */
    fun getBengaliDate(timestamp: Long = System.currentTimeMillis()): BengaliDateInfo {
        val cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Dhaka"))
        cal.timeInMillis = timestamp

        val gYear = cal.get(Calendar.YEAR)
        val gMonth = cal.get(Calendar.MONTH) + 1 // 1-12
        val gDay = cal.get(Calendar.DAY_OF_MONTH)

        // Bangladesh standard Bengali calendar starts on April 14
        val isLeapYear = (gYear % 4 == 0 && gYear % 100 != 0) || (gYear % 400 == 0)

        // Bengali month names
        val monthsBn = listOf("বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র")
        val monthsEn = listOf("Boishakh", "Joishtho", "Asharh", "Srabon", "Bhadro", "Ashwin", "Kartik", "Ograhayon", "Poush", "Magh", "Falgun", "Choitro")

        var bMonthIdx: Int
        var bDay: Int
        var bYear: Int = if (gMonth > 4 || (gMonth == 4 && gDay >= 14)) gYear - 593 else gYear - 594

        when {
            // April 14 - May 14 : Boishakh (31 days)
            gMonth == 4 && gDay >= 14 -> {
                bMonthIdx = 0
                bDay = gDay - 13
            }
            gMonth == 5 && gDay <= 14 -> {
                bMonthIdx = 0
                bDay = gDay + 17
            }
            // May 15 - June 14 : Joishtho (31 days)
            gMonth == 5 && gDay >= 15 -> {
                bMonthIdx = 1
                bDay = gDay - 14
            }
            gMonth == 6 && gDay <= 14 -> {
                bMonthIdx = 1
                bDay = gDay + 17
            }
            // June 15 - July 15 : Asharh (31 days)
            gMonth == 6 && gDay >= 15 -> {
                bMonthIdx = 2
                bDay = gDay - 14
            }
            gMonth == 7 && gDay <= 15 -> {
                bMonthIdx = 2
                bDay = gDay + 16
            }
            // July 16 - August 15 : Srabon (31 days)
            gMonth == 7 && gDay >= 16 -> {
                bMonthIdx = 3
                bDay = gDay - 15
            }
            gMonth == 8 && gDay <= 15 -> {
                bMonthIdx = 3
                bDay = gDay + 16
            }
            // August 16 - September 15 : Bhadro (31 days)
            gMonth == 8 && gDay >= 16 -> {
                bMonthIdx = 4
                bDay = gDay - 15
            }
            gMonth == 9 && gDay <= 15 -> {
                bMonthIdx = 4
                bDay = gDay + 16
            }
            // September 16 - October 15 : Ashwin (31 days)
            gMonth == 9 && gDay >= 16 -> {
                bMonthIdx = 5
                bDay = gDay - 15
            }
            gMonth == 10 && gDay <= 15 -> {
                bMonthIdx = 5
                bDay = gDay + 15
            }
            // October 16 - November 14 : Kartik (30 days)
            gMonth == 10 && gDay >= 16 -> {
                bMonthIdx = 6
                bDay = gDay - 15
            }
            gMonth == 11 && gDay <= 14 -> {
                bMonthIdx = 6
                bDay = gDay + 16
            }
            // November 15 - December 14 : Ograhayon (30 days)
            gMonth == 11 && gDay >= 15 -> {
                bMonthIdx = 7
                bDay = gDay - 14
            }
            gMonth == 12 && gDay <= 14 -> {
                bMonthIdx = 7
                bDay = gDay + 16
            }
            // December 15 - January 13 : Poush (30 days)
            gMonth == 12 && gDay >= 15 -> {
                bMonthIdx = 8
                bDay = gDay - 14
            }
            gMonth == 1 && gDay <= 13 -> {
                bMonthIdx = 8
                bDay = gDay + 17
            }
            // January 14 - February 12 : Magh (30 days)
            gMonth == 1 && gDay >= 14 -> {
                bMonthIdx = 9
                bDay = gDay - 13
            }
            gMonth == 2 && gDay <= 12 -> {
                bMonthIdx = 9
                bDay = gDay + 18
            }
            // February 13 - March 14 : Falgun (29 or 30 days)
            gMonth == 2 && gDay >= 13 -> {
                bMonthIdx = 10
                bDay = gDay - 12
            }
            gMonth == 3 && gDay <= 14 -> {
                bMonthIdx = 10
                val febDays = if (isLeapYear) 29 else 28
                bDay = gDay + (febDays - 12)
            }
            // March 15 - April 13 : Choitro (30 days)
            else -> {
                bMonthIdx = 11
                bDay = if (gMonth == 3) gDay - 14 else gDay + 17
            }
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

        val formattedBn = "$dayBn $monthBn $yearBn বঙ্গাব্দ"
        val formattedEn = "$bDay $monthEn $bYear Banglabda"

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
}
