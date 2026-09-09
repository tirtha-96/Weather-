package com.example.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "saved_locations")
data class SavedLocationEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val nameEn: String,
    val nameBn: String,
    val districtEn: String,
    val districtBn: String,
    val divisionEn: String,
    val divisionBn: String,
    val latitude: Double,
    val longitude: Double,
    val tag: String = "Custom", // "Home", "Office", "Origin", "Current"
    val isCurrent: Boolean = false,
    val addedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "weather_cache")
data class WeatherCacheEntity(
    @PrimaryKey val locationKey: String,
    val temperature: Double,
    val apparentTemp: Double,
    val weatherCode: Int,
    val humidity: Int,
    val windSpeed: Double,
    val uvIndex: Double,
    val usAqi: Int,
    val pm25: Double,
    val pm10: Double,
    val dailyRainMm: Double,
    val weeklyRainMm: Double,
    val monthlyRainMm: Double,
    val upazilaEn: String,
    val upazilaBn: String,
    val districtEn: String,
    val districtBn: String,
    val divisionEn: String,
    val divisionBn: String,
    val timestamp: Long
)
