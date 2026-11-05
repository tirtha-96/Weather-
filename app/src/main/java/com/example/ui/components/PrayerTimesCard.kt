package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Mosque
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
import com.example.data.model.PrayerTimes
import com.example.ui.theme.*

@Composable
fun PrayerTimesCard(
    prayerTimes: PrayerTimes,
    isBengali: Boolean,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(24.dp))
            .background(Color(0xFF0C242C).copy(alpha = 0.88f))
            .border(1.dp, PaddyGreenLight.copy(alpha = 0.35f), RoundedCornerShape(24.dp))
            .padding(18.dp)
            .testTag("prayer_times_card")
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(PaddyGreen.copy(alpha = 0.4f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Mosque,
                            contentDescription = "Prayer Times",
                            tint = Marigold,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = if (isBengali) "নামাজের সময়সূচি" else "Daily Prayer Times",
                            style = MaterialTheme.typography.titleMedium.copy(
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        )
                        Text(
                            text = if (isBengali) "বর্তমান অবস্থানের সূর্যালোক ভিত্তিক হিসাব" else "Calculated for Current Location",
                            style = MaterialTheme.typography.labelSmall.copy(
                                color = Mist.copy(alpha = 0.65f)
                            )
                        )
                    }
                }

                IconButton(
                    onClick = onDismiss,
                    modifier = Modifier.size(28.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Close,
                        contentDescription = "Dismiss widget",
                        tint = Mist.copy(alpha = 0.6f),
                        modifier = Modifier.size(16.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                PrayerSlot(
                    name = if (isBengali) "ফজর" else "Fajr",
                    time = prayerTimes.fajr
                )
                PrayerSlot(
                    name = if (isBengali) "যোহর" else "Dhuhr",
                    time = prayerTimes.dhuhr
                )
                PrayerSlot(
                    name = if (isBengali) "আসর" else "Asr",
                    time = prayerTimes.asr
                )
                PrayerSlot(
                    name = if (isBengali) "মাগরিব" else "Maghrib",
                    time = prayerTimes.maghrib
                )
                PrayerSlot(
                    name = if (isBengali) "ইশা" else "Isha",
                    time = prayerTimes.isha
                )
            }
        }
    }
}

@Composable
private fun PrayerSlot(name: String, time: String) {
    Surface(
        shape = RoundedCornerShape(12.dp),
        color = Color.White.copy(alpha = 0.06f)
    ) {
        Column(
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 6.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = name,
                style = MaterialTheme.typography.labelSmall.copy(
                    color = Marigold,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold
                )
            )
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = time,
                style = MaterialTheme.typography.bodySmall.copy(
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            )
        }
    }
}
