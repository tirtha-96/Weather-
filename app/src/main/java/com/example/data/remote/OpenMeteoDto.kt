package com.example.data.remote

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class ForecastResponse(
    val latitude: Double,
    val longitude: Double,
    @Json(name = "current") val current: CurrentDto?,
    @Json(name = "hourly") val hourly: HourlyDto?,
    @Json(name = "daily") val daily: DailyDto?
)

@JsonClass(generateAdapter = true)
data class CurrentDto(
    val time: String?,
    @Json(name = "temperature_2m") val temperature2m: Double?,
    @Json(name = "relative_humidity_2m") val relativeHumidity2m: Int?,
    @Json(name = "apparent_temperature") val apparentTemperature: Double?,
    val precipitation: Double?,
    @Json(name = "weather_code") val weatherCode: Int?,
    @Json(name = "surface_pressure") val surfacePressure: Double?,
    @Json(name = "wind_speed_10m") val windSpeed10m: Double?,
    @Json(name = "wind_direction_10m") val windDirection10m: Int?,
    @Json(name = "uv_index") val uvIndex: Double?,
    @Json(name = "is_day") val isDay: Int?
)

@JsonClass(generateAdapter = true)
data class HourlyDto(
    val time: List<String>?,
    @Json(name = "temperature_2m") val temperature2m: List<Double>?,
    @Json(name = "relative_humidity_2m") val relativeHumidity2m: List<Int>?,
    @Json(name = "precipitation_probability") val precipitationProbability: List<Int>?,
    val precipitation: List<Double>?,
    @Json(name = "weather_code") val weatherCode: List<Int>?,
    val visibility: List<Double>?,
    @Json(name = "dew_point_2m") val dewPoint2m: List<Double>?
)

@JsonClass(generateAdapter = true)
data class DailyDto(
    val time: List<String>?,
    @Json(name = "weather_code") val weatherCode: List<Int>?,
    @Json(name = "temperature_2m_max") val temperature2mMax: List<Double>?,
    @Json(name = "temperature_2m_min") val temperature2mMin: List<Double>?,
    val sunrise: List<String>?,
    val sunset: List<String>?,
    @Json(name = "uv_index_max") val uvIndexMax: List<Double>?,
    @Json(name = "precipitation_sum") val precipitationSum: List<Double>?
)

@JsonClass(generateAdapter = true)
data class AirQualityResponse(
    val latitude: Double,
    val longitude: Double,
    @Json(name = "current") val current: AirQualityCurrentDto?
)

@JsonClass(generateAdapter = true)
data class AirQualityCurrentDto(
    val time: String?,
    @Json(name = "pm10") val pm10: Double?,
    @Json(name = "pm2_5") val pm25: Double?,
    @Json(name = "us_aqi") val usAqi: Int?,
    @Json(name = "european_aqi") val europeanAqi: Int?
)
