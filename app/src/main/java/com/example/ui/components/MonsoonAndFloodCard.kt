package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Thunderstorm
import androidx.compose.material.icons.filled.WaterDrop
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
import com.example.data.model.FloodRisk
import com.example.data.model.MonsoonRainfall
import com.example.ui.theme.*

@Composable
fun MonsoonAndFloodCard(
    monsoon: MonsoonRainfall,
    flood: FloodRisk,
    isBengali: Boolean,
    useBengaliDigits: Boolean,
    modifier: Modifier = Modifier
) {
    val floodSeverity = flood.severity
    val floodColor = Color(floodSeverity.colorHex)

    fun formatMm(v: Double): String {
        val s = String.format(java.util.Locale.US, "%.1f", v)
        return if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(s) else s
    }

    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(24.dp))
            .background(Color(0xFF0F262F).copy(alpha = 0.85f))
            .border(1.dp, Color.White.copy(alpha = 0.12f), RoundedCornerShape(24.dp))
            .padding(18.dp)
            .testTag("monsoon_flood_card")
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            // Header
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
                            .background(PaddyGreen.copy(alpha = 0.35f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.WaterDrop,
                            contentDescription = "Monsoon Rain",
                            tint = Marigold,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = if (isBengali) "মৌসুমি বর্ষণ ও প্লাবন ট্র্যাকার" else "Monsoon Rain & Flood Risk",
                            style = MaterialTheme.typography.titleMedium.copy(
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        )
                        Text(
                            text = if (isBengali) monsoon.monsoonSeasonPhaseBn else monsoon.monsoonSeasonPhaseEn,
                            style = MaterialTheme.typography.labelSmall.copy(
                                color = Mist.copy(alpha = 0.65f)
                            )
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // 3-Metric Accumulation Row
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                RainAccumulationTile(
                    title = if (isBengali) "আজকের বৃষ্টি" else "Today's Rain",
                    value = "${formatMm(monsoon.todayMm)} mm",
                    progress = (monsoon.todayMm / 50.0).toFloat().coerceIn(0.05f, 1f),
                    color = Color(0xFF64B5F6),
                    modifier = Modifier.weight(1f)
                )

                RainAccumulationTile(
                    title = if (isBengali) "গত ৭ দিনে" else "Last 7 Days",
                    value = "${formatMm(monsoon.last7DaysMm)} mm",
                    progress = (monsoon.last7DaysMm / 200.0).toFloat().coerceIn(0.05f, 1f),
                    color = Marigold,
                    modifier = Modifier.weight(1f)
                )

                RainAccumulationTile(
                    title = if (isBengali) "মাসিক পুঞ্জীভূত" else "Monthly Total",
                    value = "${formatMm(monsoon.monthlyAccumulatedMm)} mm",
                    progress = (monsoon.monthlyAccumulatedMm / 400.0).toFloat().coerceIn(0.05f, 1f),
                    color = PaddyGreenLight,
                    modifier = Modifier.weight(1f)
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Flood Risk Indicator Box
            Surface(
                shape = RoundedCornerShape(16.dp),
                color = floodColor.copy(alpha = 0.15f),
                border = androidx.compose.foundation.BorderStroke(1.dp, floodColor.copy(alpha = 0.45f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.Thunderstorm,
                                contentDescription = "Flood",
                                tint = floodColor,
                                modifier = Modifier.size(18.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = if (isBengali) floodSeverity.titleBn else floodSeverity.titleEn,
                                style = MaterialTheme.typography.labelLarge.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = floodColor
                                )
                            )
                        }

                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = floodColor.copy(alpha = 0.25f)
                        ) {
                            Text(
                                text = if (isBengali) flood.riverBasinBn else flood.riverBasinEn,
                                style = MaterialTheme.typography.labelSmall.copy(
                                    color = Color.White.copy(alpha = 0.9f),
                                    fontWeight = FontWeight.Medium
                                ),
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = if (isBengali) flood.warningNoteBn else flood.warningNoteEn,
                        style = MaterialTheme.typography.bodySmall.copy(
                            color = Color.White.copy(alpha = 0.85f),
                            lineHeight = 18.sp
                        )
                    )
                }
            }
        }
    }
}

@Composable
private fun RainAccumulationTile(
    title: String,
    value: String,
    progress: Float,
    color: Color,
    modifier: Modifier = Modifier
) {
    Surface(
        shape = RoundedCornerShape(14.dp),
        color = Color.White.copy(alpha = 0.07f),
        modifier = modifier
    ) {
        Column(
            modifier = Modifier.padding(10.dp),
            horizontalAlignment = Alignment.Start
        ) {
            Text(
                text = title,
                style = MaterialTheme.typography.labelSmall.copy(
                    color = Mist.copy(alpha = 0.7f),
                    fontSize = 11.sp
                ),
                maxLines = 1
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = value,
                style = MaterialTheme.typography.bodyMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            )
            Spacer(modifier = Modifier.height(6.dp))
            LinearProgressIndicator(
                progress = { progress },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(4.dp)
                    .clip(RoundedCornerShape(2.dp)),
                color = color,
                trackColor = Color.White.copy(alpha = 0.1f),
            )
        }
    }
}
