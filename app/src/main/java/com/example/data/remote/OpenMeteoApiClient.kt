package com.example.data.remote

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.GET
import retrofit2.http.Url
import java.util.concurrent.TimeUnit

interface OpenMeteoApiService {

    @GET
    suspend fun getForecast(@Url url: String): ForecastResponse

    @GET
    suspend fun getAirQuality(@Url url: String): AirQualityResponse
}

object ApiClient {
    private val moshi: Moshi = Moshi.Builder()
        .addLast(KotlinJsonAdapterFactory())
        .build()

    private val okHttpClient = OkHttpClient.Builder()
        .connectTimeout(15, TimeUnit.SECONDS)
        .readTimeout(15, TimeUnit.SECONDS)
        .build()

    val apiService: OpenMeteoApiService by lazy {
        Retrofit.Builder()
            .baseUrl("https://api.open-meteo.com/")
            .client(okHttpClient)
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .build()
            .create(OpenMeteoApiService::class.java)
    }

    fun buildForecastUrl(lat: Double, lon: Double): String {
        return "https://api.open-meteo.com/v1/forecast" +
                "?latitude=$lat&longitude=$lon" +
                "&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index,is_day" +
                "&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,visibility,dew_point_2m" +
                "&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum" +
                "&timezone=Asia%2FDhaka&forecast_days=10"
    }

    fun buildAirQualityUrl(lat: Double, lon: Double): String {
        return "https://air-quality-api.open-meteo.com/v1/air-quality" +
                "?latitude=$lat&longitude=$lon" +
                "&current=pm10,pm2_5,us_aqi,european_aqi" +
                "&timezone=Asia%2FDhaka"
    }
}
