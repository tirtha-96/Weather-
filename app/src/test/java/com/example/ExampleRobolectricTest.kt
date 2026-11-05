package com.example

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.example.data.model.BangladeshGeoData
import com.example.data.model.BengaliCalendarHelper
import com.example.data.model.PrayerTimesCalculator
import org.junit.Assert.*
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [36])
class ExampleRobolectricTest {

  @Test
  fun `read string from context`() {
    val context = ApplicationProvider.getApplicationContext<Context>()
    val appName = context.getString(R.string.app_name)
    assertEquals("Bengal Sky", appName)
  }

  @Test
  fun `geography resolves Dhaka coordinates correctly`() {
    val resolved = BangladeshGeoData.resolveCoordinates(23.8103, 90.4125)
    assertEquals("Dhaka", resolved.districtEn)
    assertEquals("Dhaka", resolved.divisionEn)
  }

  @Test
  fun `geography resolves Chattogram coastal coordinates correctly`() {
    val resolved = BangladeshGeoData.resolveCoordinates(22.3569, 91.7832)
    assertEquals("Chattogram", resolved.districtEn)
    assertTrue(resolved.isCoastal)
  }

  @Test
  fun `bengali calendar converts digits accurately`() {
    val converted = BengaliCalendarHelper.toBengaliDigits("2026")
    assertEquals("২০২৬", converted)
  }

  private fun dhakaNoon(year: Int, month: Int, day: Int): Long =
    java.util.Calendar.getInstance(java.util.TimeZone.getTimeZone("Asia/Dhaka")).apply {
      clear()
      set(year, month - 1, day, 12, 0)
    }.timeInMillis

  @Test
  fun `bengali calendar matches revised Bangladesh calendar landmarks`() {
    fun bn(y: Int, m: Int, d: Int) = BengaliCalendarHelper.getBengaliDate(dhakaNoon(y, m, d)).let {
      "${it.dayEn} ${it.monthEn} ${it.yearEn}"
    }
    assertEquals("1 Boishakh 1433", bn(2026, 4, 14))   // Pohela Boishakh
    assertEquals("30 Choitro 1432", bn(2026, 4, 13))
    assertEquals("31 Ashwin 1433", bn(2026, 10, 16))
    assertEquals("1 Kartik 1433", bn(2026, 10, 17))
    assertEquals("1 Poush 1432", bn(2025, 12, 16))     // Bijoy Dibos
    assertEquals("1 Falgun 1432", bn(2026, 2, 14))     // Pohela Falgun
    assertEquals("8 Falgun 1432", bn(2026, 2, 21))     // Ekushe February
    assertEquals("1 Choitro 1432", bn(2026, 3, 15))
    assertEquals("30 Falgun 1434", bn(2028, 3, 14))    // leap-year Falgun has 30 days
  }

  @Test
  fun `prayer times for Dhaka are in a realistic window`() {
    val t = PrayerTimesCalculator.calculate(23.8103, 90.4125, timestamp = dhakaNoon(2026, 6, 21))
    assertEquals("03:44", t.fajr)   // published Dhaka timetable: ~03:43
    assertEquals("16:40", t.asr)    // Hanafi Asr, ~16:39
    assertEquals("18:51", t.maghrib)
  }

  @Test
  fun `prayer times calculation generates valid 24h slots`() {
    val prayerTimes = PrayerTimesCalculator.calculate(23.8103, 90.4125)
    assertTrue(prayerTimes.fajr.contains(":"))
    assertTrue(prayerTimes.dhuhr.contains(":"))
    assertTrue(prayerTimes.maghrib.contains(":"))
    assertTrue(prayerTimes.isha.contains(":"))
  }
}

