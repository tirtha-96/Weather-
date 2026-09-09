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

  @Test
  fun `prayer times calculation generates valid 24h slots`() {
    val prayerTimes = PrayerTimesCalculator.calculate(23.8103, 90.4125)
    assertTrue(prayerTimes.fajr.contains(":"))
    assertTrue(prayerTimes.dhuhr.contains(":"))
    assertTrue(prayerTimes.maghrib.contains(":"))
    assertTrue(prayerTimes.isha.contains(":"))
  }
}

