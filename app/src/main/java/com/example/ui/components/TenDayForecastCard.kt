package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.BengaliCalendarHelper
import com.example.data.model.DailyForecastItem
import com.example.ui.theme.*
import kotlin.math.roundToInt

@Composable
fun TenDayForecastCard(
    daily: List<DailyForecastItem>,
    isBengali: Boolean,
    useFahrenheit: Boolean,
    useBengaliDigits: Boolean,
    modifier: Modifier = Modifier
) {
    val tempUnit = if (useFahrenheit) "°" else "°"

    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(24.dp))
            .background(Color(0xFF102730).copy(alpha = 0.85f))
            .border(1.dp, Color.White.copy(alpha = 0.12f), RoundedCornerShape(24.dp))
            .padding(18.dp)
            .testTag("ten_day_forecast_card")
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.CalendarMonth,
                    contentDescription = "Calendar",
                    tint = Marigold,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = if (isBengali) "১০ দিনের বর্ধিত পূর্বাভাস" else "10-Day Extended Forecast",
                    style = MaterialTheme.typography.titleMedium.copy(
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                )
            }

            Spacer(modifier = Modifier.height(14.dp))

            Column(
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                daily.forEachIndexed { index, item ->
                    val rawMax = if (useFahrenheit) (item.tempMax * 9 / 5) + 32 else item.tempMax
                    val rawMin = if (useFahrenheit) (item.tempMin * 9 / 5) + 32 else item.tempMin

                    val maxStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(rawMax.roundToInt()) else "${rawMax.roundToInt()}"
                    val minStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(rawMin.roundToInt()) else "${rawMin.roundToInt()}"
                    val precipStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(String.format(java.util.Locale.US, "%.1f", item.precipitationSum)) else String.format(java.util.Locale.US, "%.1f", item.precipitationSum)

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(14.dp))
                            .background(Color.White.copy(alpha = 0.04f))
                            .padding(horizontal = 12.dp, vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Day Label & Bengali Calendar Date
                        Column(modifier = Modifier.width(108.dp)) {
                            Text(
                                text = if (isBengali) item.dayLabelBn else item.dayLabelEn,
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    fontWeight = FontWeight.SemiBold,
                                    color = Color.White
                                )
                            )
                            Text(
                                text = item.banglaCalendarDate,
                                style = MaterialTheme.typography.labelSmall.copy(
                                    color = Marigold.copy(alpha = 0.85f),
                                    fontSize = 11.sp
                                )
                            )
                        }

                        // Animated condition icon
                        AnimatedWeatherIllustration(
                            conditionType = item.condition.conditionType,
                            isDay = true,
                            size = 28.dp
                        )

                        Spacer(modifier = Modifier.width(10.dp))

                        // Precipitation mm
                        if (item.precipitationSum > 0.5) {
                            Text(
                                text = "$precipStr mm",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    color = Color(0xFF90CAF9),
                                    fontWeight = FontWeight.Medium
                                ),
                                modifier = Modifier.width(52.dp)
                            )
                        } else {
                            Spacer(modifier = Modifier.width(52.dp))
                        }

                        // Temp Range
                        Row(
                            modifier = Modifier.weight(1f),
                            horizontalArrangement = Arrangement.End,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "$minStr$tempUnit",
                                style = MaterialTheme.typography.bodySmall.copy(
                                    color = Mist.copy(alpha = 0.65f),
                                    fontWeight = FontWeight.Medium
                                )
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Box(
                                modifier = Modifier
                                    .width(60.dp)
                                    .height(4.dp)
                                    .clip(RoundedCornerShape(2.dp))
                                    .background(Color.White.copy(alpha = 0.15f))
                            ) {
                                Box(
                                    modifier = Modifier
                                        .fillMaxHeight()
                                        .fillMaxWidth(0.7f)
                                        .clip(RoundedCornerShape(2.dp))
                                        .background(Marigold)
                                )
                            }
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "$maxStr$tempUnit",
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    color = Color.White,
                                    fontWeight = FontWeight.Bold
                                )
                            )
                        }
                    }
                }
            }
        }
    }
}
