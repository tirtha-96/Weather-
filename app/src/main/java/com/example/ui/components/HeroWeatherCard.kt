package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.BengaliCalendarHelper
import com.example.data.model.CompleteWeather
import com.example.ui.theme.*
import java.text.SimpleDateFormat
import java.util.*
import kotlin.math.roundToInt

@Composable
fun HeroWeatherCard(
    weather: CompleteWeather,
    isBengali: Boolean,
    useFahrenheit: Boolean,
    useBengaliDigits: Boolean,
    onRefresh: () -> Unit,
    modifier: Modifier = Modifier
) {
    val current = weather.current
    val loc = weather.location
    val todayDaily = weather.daily.firstOrNull()

    // Temperature conversions
    val rawTemp = if (useFahrenheit) (current.temperature * 9 / 5) + 32 else current.temperature
    val rawAppTemp = if (useFahrenheit) (current.apparentTemperature * 9 / 5) + 32 else current.apparentTemperature
    val rawMax = todayDaily?.let { if (useFahrenheit) (it.tempMax * 9 / 5) + 32 else it.tempMax } ?: (rawTemp + 3.0)
    val rawMin = todayDaily?.let { if (useFahrenheit) (it.tempMin * 9 / 5) + 32 else it.tempMin } ?: (rawTemp - 4.0)

    val tempUnit = if (useFahrenheit) "°F" else "°C"

    fun formatNum(num: Double): String {
        val rounded = num.roundToInt()
        return if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(rounded) else "$rounded"
    }

    // Season info
    val season = weather.bengaliDate.season
    val seasonLabel = if (isBengali) "${season.nameBn} (${season.nameEn})" else "${season.nameEn} • ${season.nameBn}"

    // Gregorian date
    val gregFormat = SimpleDateFormat("EEEE, d MMMM yyyy", Locale.US)
    val gregDateStr = gregFormat.format(Date(weather.lastUpdatedTimestamp))

    val banglaDateStr = weather.bengaliDate.formattedBn

    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(28.dp))
            .background(
                Brush.linearGradient(
                    listOf(
                        Color(0xFF132F38).copy(alpha = 0.85f),
                        Color(0xFF0D222A).copy(alpha = 0.92f)
                    )
                )
            )
            .border(1.dp, Color.White.copy(alpha = 0.15f), RoundedCornerShape(28.dp))
            .padding(20.dp)
            .testTag("hero_weather_card")
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            // Location and Refresh Action Row
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(
                        imageVector = Icons.Default.LocationOn,
                        contentDescription = "Location",
                        tint = Marigold,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Column {
                        Text(
                            text = loc.getShortName(isBengali),
                            style = MaterialTheme.typography.titleLarge.copy(
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        )
                        Text(
                            text = if (isBengali) "${loc.divisionBn} বিভাগ" else "${loc.divisionEn} Division",
                            style = MaterialTheme.typography.bodySmall.copy(
                                color = Mist.copy(alpha = 0.75f)
                            )
                        )
                    }
                }

                IconButton(
                    onClick = onRefresh,
                    modifier = Modifier
                        .size(40.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(Color.White.copy(alpha = 0.1f))
                        .testTag("hero_refresh_button")
                ) {
                    Icon(
                        imageVector = Icons.Default.Refresh,
                        contentDescription = "Refresh weather data",
                        tint = Color.White
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Bengali Season and Bangla Calendar Date Banner
            Surface(
                shape = RoundedCornerShape(14.dp),
                color = PaddyGreen.copy(alpha = 0.35f),
                border = androidx.compose.foundation.BorderStroke(1.dp, PaddyGreenLight.copy(alpha = 0.4f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 12.dp, vertical = 8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = seasonLabel,
                            style = MaterialTheme.typography.labelMedium.copy(
                                color = Marigold,
                                fontWeight = FontWeight.SemiBold
                            )
                        )
                        Text(
                            text = banglaDateStr,
                            style = MaterialTheme.typography.bodySmall.copy(
                                color = Color.White.copy(alpha = 0.9f)
                            )
                        )
                    }
                    Text(
                        text = gregDateStr.take(12),
                        style = MaterialTheme.typography.labelSmall.copy(
                            color = Mist.copy(alpha = 0.6f)
                        )
                    )
                }
            }

            Spacer(modifier = Modifier.height(18.dp))

            // Main Temperature and Animated Illustration Row
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    Row(verticalAlignment = Alignment.Top) {
                        Text(
                            text = formatNum(rawTemp),
                            style = MaterialTheme.typography.displayLarge.copy(
                                fontSize = 68.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        )
                        Text(
                            text = tempUnit,
                            style = MaterialTheme.typography.titleLarge.copy(
                                color = Marigold,
                                fontWeight = FontWeight.Bold
                            ),
                            modifier = Modifier.padding(top = 8.dp, start = 4.dp)
                        )
                    }

                    Text(
                        text = if (isBengali) current.condition.descriptionBn else current.condition.descriptionEn,
                        style = MaterialTheme.typography.titleMedium.copy(
                            color = Mist,
                            fontWeight = FontWeight.Medium
                        )
                    )

                    Spacer(modifier = Modifier.height(4.dp))

                    Text(
                        text = if (isBengali) {
                            "অনুভূত: ${formatNum(rawAppTemp)}$tempUnit  •  সর্বোচ্চ: ${formatNum(rawMax)}$tempUnit / সর্বনিম্ন: ${formatNum(rawMin)}$tempUnit"
                        } else {
                            "Feels like: ${formatNum(rawAppTemp)}$tempUnit  •  H: ${formatNum(rawMax)}$tempUnit / L: ${formatNum(rawMin)}$tempUnit"
                        },
                        style = MaterialTheme.typography.bodySmall.copy(
                            color = Mist.copy(alpha = 0.8f)
                        )
                    )
                }

                AnimatedWeatherIllustration(
                    conditionType = current.condition.conditionType,
                    isDay = current.isDay,
                    size = 105.dp
                )
            }

            Spacer(modifier = Modifier.height(18.dp))

            // Quick Stats Row (Humidity, Wind, Pressure)
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(Color.White.copy(alpha = 0.07f))
                    .padding(vertical = 10.dp, horizontal = 14.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                QuickMetricItem(
                    label = if (isBengali) "আর্দ্রতা" else "Humidity",
                    value = "${if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(current.humidity) else current.humidity}%"
                )
                Divider(
                    color = Color.White.copy(alpha = 0.15f),
                    modifier = Modifier
                        .height(26.dp)
                        .width(1.dp)
                )
                QuickMetricItem(
                    label = if (isBengali) "বাতাস" else "Wind",
                    value = "${if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(current.windSpeed.roundToInt()) else current.windSpeed.roundToInt()} km/h"
                )
                Divider(
                    color = Color.White.copy(alpha = 0.15f),
                    modifier = Modifier
                        .height(26.dp)
                        .width(1.dp)
                )
                QuickMetricItem(
                    label = if (isBengali) "ইউভি ইনডেক্স" else "UV Index",
                    value = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(current.uvIndex.roundToInt()) else "${current.uvIndex.roundToInt()}"
                )
            }

            if (weather.isFromCache) {
                Spacer(modifier = Modifier.height(10.dp))
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = Color(0x33F2A93B),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = if (isBengali) "অফলাইন মোড — সংরক্ষিত ক্যাশ ডাটা প্রদর্শিত হচ্ছে" else "Offline Mode — Displaying cached weather snapshot",
                        style = MaterialTheme.typography.labelSmall.copy(color = Marigold),
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }
        }
    }
}

@Composable
private fun QuickMetricItem(label: String, value: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall.copy(color = Mist.copy(alpha = 0.7f))
        )
        Spacer(modifier = Modifier.height(2.dp))
        Text(
            text = value,
            style = MaterialTheme.typography.bodyMedium.copy(
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
        )
    }
}
