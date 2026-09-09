package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.BengaliCalendarHelper
import com.example.data.model.CompleteWeather
import com.example.ui.theme.*
import kotlin.math.roundToInt

@Composable
fun WeatherDetailsGrid(
    weather: CompleteWeather,
    isBengali: Boolean,
    useFahrenheit: Boolean,
    useBengaliDigits: Boolean,
    modifier: Modifier = Modifier
) {
    val current = weather.current
    val today = weather.daily.firstOrNull()

    // Dew point approx
    val dewPointC = current.temperature - ((100 - current.humidity) / 5.0)
    val rawDewPoint = if (useFahrenheit) (dewPointC * 9 / 5) + 32 else dewPointC
    val dewPointStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(rawDewPoint.roundToInt()) else "${rawDewPoint.roundToInt()}"
    val tempUnit = if (useFahrenheit) "°F" else "°C"

    // Wind direction label
    val windDirectionsEn = listOf("N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW")
    val windDirectionsBn = listOf("উত্তর", "উত্তর-পূর্ব", "উত্তর-পূর্ব", "পূর্ব", "পূর্ব", "দক্ষিণ-পূর্ব", "দক্ষিণ-পূর্ব", "দক্ষিণ", "দক্ষিণ", "দক্ষিণ-পশ্চিম", "দক্ষিণ-পশ্চিম", "পশ্চিম", "পশ্চিম", "উত্তর-পশ্চিম", "উত্তর-পশ্চিম", "উত্তর")
    val dirIdx = ((current.windDirection + 11.25) / 22.5).toInt() % 16
    val windDirLabel = if (isBengali) windDirectionsBn[dirIdx] else windDirectionsEn[dirIdx]

    val windVal = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(current.windSpeed.roundToInt()) else "${current.windSpeed.roundToInt()}"
    val pressureVal = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(current.surfacePressure.roundToInt()) else "${current.surfacePressure.roundToInt()}"
    val uvVal = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(current.uvIndex.roundToInt()) else "${current.uvIndex.roundToInt()}"

    Column(
        modifier = modifier
            .fillMaxWidth()
            .testTag("weather_details_grid"),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            DetailTile(
                title = if (isBengali) "বাতাসের গতি ও দিক" else "Wind & Direction",
                value = "$windVal km/h",
                subtitle = windDirLabel,
                icon = Icons.Default.Navigation,
                iconRotation = current.windDirection.toFloat(),
                modifier = Modifier.weight(1f)
            )

            DetailTile(
                title = if (isBengali) "বায়ুচাপ" else "Pressure",
                value = "$pressureVal hPa",
                subtitle = if (isBengali) "স্বাভাবিক সমুদ্র সমতল চাপ" else "Barometric pressure",
                icon = Icons.Default.Compress,
                modifier = Modifier.weight(1f)
            )
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            DetailTile(
                title = if (isBengali) "সূর্যোদয় ও সূর্যাস্ত" else "Sunrise & Sunset",
                value = today?.sunrise ?: "05:42",
                subtitle = if (isBengali) "সূর্যাস্ত: ${today?.sunset ?: "18:07"}" else "Sunset: ${today?.sunset ?: "18:07"}",
                icon = Icons.Default.WbSunny,
                iconTint = Marigold,
                modifier = Modifier.weight(1f)
            )

            DetailTile(
                title = if (isBengali) "শিশিরাঙ্ক ও দৃশ্যমানতা" else "Dew Point & View",
                value = "$dewPointStr$tempUnit",
                subtitle = if (isBengali) "দৃশ্যমানতা: ৮ কিমি" else "Visibility: 8.0 km",
                icon = Icons.Default.Visibility,
                modifier = Modifier.weight(1f)
            )
        }
    }
}

@Composable
private fun DetailTile(
    title: String,
    value: String,
    subtitle: String,
    icon: ImageVector,
    iconTint: Color = Mist,
    iconRotation: Float = 0f,
    modifier: Modifier = Modifier
) {
    Surface(
        shape = RoundedCornerShape(20.dp),
        color = Color(0xFF102730).copy(alpha = 0.85f),
        border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.12f)),
        modifier = modifier
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.labelSmall.copy(
                        color = Mist.copy(alpha = 0.7f),
                        fontSize = 12.sp
                    )
                )
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = iconTint,
                    modifier = Modifier
                        .size(18.dp)
                        .rotate(iconRotation)
                )
            }

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = value,
                style = MaterialTheme.typography.titleLarge.copy(
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            )

            Spacer(modifier = Modifier.height(4.dp))

            Text(
                text = subtitle,
                style = MaterialTheme.typography.labelSmall.copy(
                    color = Mist.copy(alpha = 0.65f),
                    fontSize = 11.sp
                ),
                maxLines = 1
            )
        }
    }
}
