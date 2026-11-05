package com.example.data.remote

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query
import java.util.concurrent.TimeUnit

data class OpenMeteoWeatherResponse(
    val latitude: Double?,
    val longitude: Double?,
    val current: OpenMeteoCurrent?,
    val hourly: OpenMeteoHourly?,
    val daily: OpenMeteoDaily?
)

data class OpenMeteoCurrent(
    val time: String?,
    val temperature_2m: Double?,
    val relative_humidity_2m: Int?,
    val apparent_temperature: Double?,
    val precipitation: Double?,
    val weather_code: Int?,
    val surface_pressure: Double?,
    val wind_speed_10m: Double?,
    val wind_direction_10m: Int?,
    val is_day: Int?
)

data class OpenMeteoHourly(
    val time: List<String>?,
    val temperature_2m: List<Double>?,
    val relative_humidity_2m: List<Int>?,
    val precipitation_probability: List<Int>?,
    val precipitation: List<Double>?,
    val weather_code: List<Int>?
)

data class OpenMeteoDaily(
    val time: List<String>?,
    val weather_code: List<Int>?,
    val temperature_2m_max: List<Double>?,
    val temperature_2m_min: List<Double>?,
    val sunrise: List<String>?,
    val sunset: List<String>?,
    val uv_index_max: List<Double>?,
    val precipitation_sum: List<Double>?
)

data class OpenMeteoAirQualityResponse(
    val current: OpenMeteoAqiCurrent?
)

data class OpenMeteoAqiCurrent(
    val us_aqi: Int?,
    val pm2_5: Double?,
    val pm10: Double?
)

interface WeatherApi {
    @GET("https://api.open-meteo.com/v1/forecast")
    suspend fun getForecast(
        @Query("latitude") lat: Double,
        @Query("longitude") lon: Double,
        @Query("current") currentParams: String = "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,is_day",
        @Query("hourly") hourlyParams: String = "temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code",
        @Query("daily") dailyParams: String = "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum",
        @Query("timezone") timezone: String = "Asia/Dhaka",
        @Query("forecast_days") forecastDays: Int = 10
    ): OpenMeteoWeatherResponse

    @GET("https://air-quality-api.open-meteo.com/v1/air-quality")
    suspend fun getAirQuality(
        @Query("latitude") lat: Double,
        @Query("longitude") lon: Double,
        @Query("current") currentParams: String = "us_aqi,pm2_5,pm10",
        @Query("timezone") timezone: String = "Asia/Dhaka"
    ): OpenMeteoAirQualityResponse
}

object NetworkClient {
    private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

    private val okHttpClient = OkHttpClient.Builder()
        .connectTimeout(15, TimeUnit.SECONDS)
        .readTimeout(15, TimeUnit.SECONDS)
        .addInterceptor(HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BASIC
        })
        .build()

    val api: WeatherApi = Retrofit.Builder()
        .baseUrl("https://api.open-meteo.com/")
        .client(okHttpClient)
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .build()
        .create(WeatherApi::class.java)
}
