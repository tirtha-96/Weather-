package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Air
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
import com.example.data.model.AirQualityInfo
import com.example.data.model.BengaliCalendarHelper
import com.example.ui.theme.*

@Composable
fun AirQualityCard(
    aqi: AirQualityInfo,
    isBengali: Boolean,
    useBengaliDigits: Boolean,
    modifier: Modifier = Modifier
) {
    val level = aqi.level
    val statusColor = Color(level.colorHex)

    val aqiValStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(aqi.usAqi) else "${aqi.usAqi}"
    val pm25Str = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(aqi.pm25.toInt()) else "${aqi.pm25.toInt()}"
    val pm10Str = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(aqi.pm10.toInt()) else "${aqi.pm10.toInt()}"

    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(24.dp))
            .background(Color(0xFF102730).copy(alpha = 0.85f))
            .border(1.dp, Color.White.copy(alpha = 0.12f), RoundedCornerShape(24.dp))
            .padding(18.dp)
            .testTag("air_quality_card")
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            // Header Row
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(34.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(statusColor.copy(alpha = 0.25f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Air,
                            contentDescription = "Air Quality",
                            tint = statusColor,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = if (isBengali) "বায়ুর মান সূচক (AQI)" else "Air Quality Index (AQI)",
                            style = MaterialTheme.typography.titleMedium.copy(
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        )
                        Text(
                            text = if (isBengali) "ঢাকা ও আঞ্চলিক বিশ্লেষণ" else "Dhaka & Regional Analysis",
                            style = MaterialTheme.typography.labelSmall.copy(
                                color = Mist.copy(alpha = 0.65f)
                            )
                        )
                    }
                }

                // Severity Pill
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = statusColor.copy(alpha = 0.25f),
                    border = androidx.compose.foundation.BorderStroke(1.dp, statusColor.copy(alpha = 0.7f))
                ) {
                    Text(
                        text = if (isBengali) level.titleBn else level.titleEn,
                        style = MaterialTheme.typography.labelSmall.copy(
                            fontWeight = FontWeight.Bold,
                            color = statusColor
                        ),
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Score and PM Breakdown
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Row(verticalAlignment = Alignment.Bottom) {
                        Text(
                            text = aqiValStr,
                            style = MaterialTheme.typography.displayMedium.copy(
                                fontWeight = FontWeight.Bold,
                                color = Color.White,
                                fontSize = 42.sp
                            )
                        )
                        Text(
                            text = " US AQI",
                            style = MaterialTheme.typography.labelMedium.copy(
                                color = Mist.copy(alpha = 0.7f)
                            ),
                            modifier = Modifier.padding(bottom = 6.dp, start = 4.dp)
                        )
                    }
                }

                Row(
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    MetricMiniBox(
                        label = "PM2.5",
                        value = "$pm25Str µg/m³",
                        isHighlight = aqi.pm25 > 35.0
                    )
                    MetricMiniBox(
                        label = "PM10",
                        value = "$pm10Str µg/m³",
                        isHighlight = aqi.pm10 > 50.0
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Color spectrum bar
            SpectrumBar(currentAqi = aqi.usAqi)

            Spacer(modifier = Modifier.height(14.dp))

            // Plain-Language Health Advisory Note
            Surface(
                shape = RoundedCornerShape(14.dp),
                color = Color.White.copy(alpha = 0.06f),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.Top
                ) {
                    Box(
                        modifier = Modifier
                            .padding(top = 2.dp)
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(statusColor)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = if (isBengali) level.adviceBn else level.adviceEn,
                        style = MaterialTheme.typography.bodySmall.copy(
                            color = Color.White.copy(alpha = 0.9f),
                            lineHeight = 18.sp
                        )
                    )
                }
            }
        }
    }
}

@Composable
private fun MetricMiniBox(label: String, value: String, isHighlight: Boolean) {
    Surface(
        shape = RoundedCornerShape(12.dp),
        color = Color.White.copy(alpha = 0.08f),
        modifier = Modifier.widthIn(min = 72.dp)
    ) {
        Column(
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 8.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = label,
                style = MaterialTheme.typography.labelSmall.copy(color = Mist.copy(alpha = 0.7f))
            )
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = value,
                style = MaterialTheme.typography.bodySmall.copy(
                    fontWeight = FontWeight.Bold,
                    color = if (isHighlight) Marigold else Color.White
                )
            )
        }
    }
}

@Composable
private fun SpectrumBar(currentAqi: Int) {
    val gradient = Brush.horizontalGradient(
        listOf(
            Color(0xFF2F6E52), // Good
            Color(0xFFF2A93B), // Moderate
            Color(0xFFE67E22), // Unhealthy sensitive
            Color(0xFFD64545), // Unhealthy
            Color(0xFF8E44AD), // Very unhealthy
            Color(0xFF78281F)  // Hazardous
        )
    )

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(8.dp)
            .clip(RoundedCornerShape(4.dp))
            .background(gradient)
    )
}
