package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import com.example.ui.theme.*

@Composable
fun AppSettingsDialog(
    isBengali: Boolean,
    onToggleLanguage: (Boolean) -> Unit,
    useFahrenheit: Boolean,
    onToggleFahrenheit: (Boolean) -> Unit,
    useBengaliDigits: Boolean,
    onToggleBengaliDigits: (Boolean) -> Unit,
    showPrayerTimes: Boolean,
    onTogglePrayerTimes: (Boolean) -> Unit,
    isDarkMode: Boolean,
    onToggleDarkMode: (Boolean) -> Unit,
    onDismiss: () -> Unit
) {
    Dialog(onDismissRequest = onDismiss) {
        Surface(
            shape = RoundedCornerShape(24.dp),
            color = DeepIndigo,
            border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.15f)),
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 16.dp)
                .testTag("app_settings_dialog")
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp)
            ) {
                // Header
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Settings,
                            contentDescription = null,
                            tint = Marigold,
                            modifier = Modifier.size(22.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = if (isBengali) "সেটিংস ও পছন্দসমূহ" else "Settings & Preferences",
                            style = MaterialTheme.typography.titleMedium.copy(
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        )
                    }
                    IconButton(onClick = onDismiss) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "Close",
                            tint = Color.White
                        )
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))

                LazyColumn(
                    modifier = Modifier
                        .weight(1f, fill = false)
                        .fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    // Language Switcher
                    item {
                        SettingsToggleRow(
                            title = if (isBengali) "ভাষা (বাংলা / English)" else "Language (Bangla / English)",
                            subtitle = if (isBengali) "বর্তমানে বাংলা সক্রিয়" else "Currently English active",
                            checked = isBengali,
                            onCheckedChange = onToggleLanguage
                        )
                    }

                    // Temperature Unit
                    item {
                        SettingsToggleRow(
                            title = if (isBengali) "তাপমাত্রা একক (°F ফারেনহাইট)" else "Temperature Unit (°F Fahrenheit)",
                            subtitle = if (useFahrenheit) "ফারেনহাইট (°F)" else "সেলসিয়াস (°C)",
                            checked = useFahrenheit,
                            onCheckedChange = onToggleFahrenheit
                        )
                    }

                    // Bengali Digits
                    item {
                        SettingsToggleRow(
                            title = if (isBengali) "বাংলা সংখ্যা (১, ২, ৩...)" else "Bengali Numerals (১, ২, ৩...)",
                            subtitle = if (useBengaliDigits) "বাংলা সংখ্যা সক্রিয়" else "ইংরেজি সংখ্যা (1, 2, 3)",
                            checked = useBengaliDigits,
                            onCheckedChange = onToggleBengaliDigits
                        )
                    }

                    // Prayer Times Widget
                    item {
                        SettingsToggleRow(
                            title = if (isBengali) "নামাজের সময়সূচি উইজেট" else "Prayer Times Widget",
                            subtitle = if (isBengali) "হোম স্ক্রিনে নামাজের ওয়াক্ত প্রদর্শন" else "Show daily prayer times on main screen",
                            checked = showPrayerTimes,
                            onCheckedChange = onTogglePrayerTimes
                        )
                    }

                    // Dark Theme
                    item {
                        SettingsToggleRow(
                            title = if (isBengali) "ডার্ক থিম (Monsoon Teal)" else "Dark Theme (Monsoon Teal)",
                            subtitle = if (isDarkMode) "মনসুন টিল ও নীলকণ্ঠ আকাশ" else "হালকা কুয়াশা (Mist Base)",
                            checked = isDarkMode,
                            onCheckedChange = onToggleDarkMode
                        )
                    }
                }

                Spacer(modifier = Modifier.height(18.dp))

                Button(
                    onClick = onDismiss,
                    colors = ButtonDefaults.buttonColors(containerColor = Marigold),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = if (isBengali) "সম্পন্ন" else "Done",
                        color = DeepIndigo,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }
    }
}

@Composable
private fun SettingsToggleRow(
    title: String,
    subtitle: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(Color.White.copy(alpha = 0.05f))
            .padding(horizontal = 14.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = title,
                style = MaterialTheme.typography.bodyMedium.copy(
                    fontWeight = FontWeight.SemiBold,
                    color = Color.White
                )
            )
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = subtitle,
                style = MaterialTheme.typography.labelSmall.copy(
                    color = Mist.copy(alpha = 0.6f)
                )
            )
        }
        Switch(
            checked = checked,
            onCheckedChange = onCheckedChange,
            colors = SwitchDefaults.colors(
                checkedThumbColor = Marigold,
                checkedTrackColor = Marigold.copy(alpha = 0.35f),
                uncheckedThumbColor = Mist,
                uncheckedTrackColor = Color.White.copy(alpha = 0.15f)
            )
        )
    }
}
