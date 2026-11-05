package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Schedule
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
import com.example.data.model.HourlyForecastItem
import com.example.data.model.WeatherCodeMapper
import com.example.ui.theme.*
import kotlin.math.roundToInt

@Composable
fun HourlyForecastRow(
    hourly: List<HourlyForecastItem>,
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
            .padding(vertical = 18.dp)
            .testTag("hourly_forecast_card")
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 18.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.Schedule,
                    contentDescription = "Hourly",
                    tint = Marigold,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = if (isBengali) "ঘণ্টাভিত্তিক পূর্বাভাস (৪৮ ঘণ্টা)" else "Hourly Forecast (48h)",
                    style = MaterialTheme.typography.titleMedium.copy(
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                )
            }

            Spacer(modifier = Modifier.height(14.dp))

            LazyRow(
                contentPadding = PaddingValues(horizontal = 14.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                items(hourly) { item ->
                    HourlyItemCard(
                        item = item,
                        isBengali = isBengali,
                        useFahrenheit = useFahrenheit,
                        useBengaliDigits = useBengaliDigits,
                        tempUnit = tempUnit
                    )
                }
            }
        }
    }
}

@Composable
private fun HourlyItemCard(
    item: HourlyForecastItem,
    isBengali: Boolean,
    useFahrenheit: Boolean,
    useBengaliDigits: Boolean,
    tempUnit: String
) {
    val rawTemp = if (useFahrenheit) (item.temperature * 9 / 5) + 32 else item.temperature
    val tempStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(rawTemp.roundToInt()) else "${rawTemp.roundToInt()}"
    val probStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(item.precipitationProb) else "${item.precipitationProb}"
    val condition = WeatherCodeMapper.map(item.weatherCode)

    Surface(
        shape = RoundedCornerShape(18.dp),
        color = Color.White.copy(alpha = 0.07f),
        border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.08f)),
        modifier = Modifier.width(74.dp)
    ) {
        Column(
            modifier = Modifier.padding(vertical = 12.dp, horizontal = 6.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = if (isBengali) item.hourLabelBn else item.hourLabel,
                style = MaterialTheme.typography.labelSmall.copy(
                    color = Mist.copy(alpha = 0.8f),
                    fontWeight = FontWeight.Medium
                )
            )

            Spacer(modifier = Modifier.height(8.dp))

            AnimatedWeatherIllustration(
                conditionType = condition.conditionType,
                isDay = true,
                size = 32.dp
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = "$tempStr$tempUnit",
                style = MaterialTheme.typography.bodyMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            )

            Spacer(modifier = Modifier.height(6.dp))

            if (item.precipitationProb > 10) {
                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = Color(0xFF64B5F6).copy(alpha = 0.2f)
                ) {
                    Text(
                        text = "$probStr%",
                        style = MaterialTheme.typography.labelSmall.copy(
                            color = Color(0xFF90CAF9),
                            fontSize = 10.sp,
                            fontWeight = FontWeight.SemiBold
                        ),
                        modifier = Modifier.padding(horizontal = 4.dp, vertical = 2.dp)
                    )
                }
            } else {
                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}
