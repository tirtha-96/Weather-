package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import com.example.data.model.BmdAlert
import com.example.ui.theme.DeepIndigo
import com.example.ui.theme.Marigold
import com.example.ui.theme.Mist
import com.example.ui.theme.SignalRed

@Composable
fun BmdBulletinEditorDialog(
    currentAlert: BmdAlert,
    isBengali: Boolean,
    onSaveAlert: (BmdAlert) -> Unit,
    onDismiss: () -> Unit
) {
    var isActive by remember { mutableStateOf(currentAlert.isActive) }
    var selectedSignalNumber by remember { mutableIntStateOf(currentAlert.signalNumber) }
    var signalTitleEn by remember { mutableStateOf(currentAlert.signalTitleEn) }
    var signalTitleBn by remember { mutableStateOf(currentAlert.signalTitleBn) }
    var bulletinTextEn by remember { mutableStateOf(currentAlert.bulletinTextEn) }
    var bulletinTextBn by remember { mutableStateOf(currentAlert.bulletinTextBn) }
    var coastalPorts by remember { mutableStateOf(currentAlert.coastalPorts) }

    Dialog(onDismissRequest = onDismiss) {
        Surface(
            shape = RoundedCornerShape(24.dp),
            color = DeepIndigo,
            border = androidx.compose.foundation.BorderStroke(1.dp, SignalRed.copy(alpha = 0.5f)),
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 16.dp)
                .testTag("bmd_bulletin_editor_dialog")
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
                            imageVector = Icons.Default.Warning,
                            contentDescription = null,
                            tint = SignalRed,
                            modifier = Modifier.size(22.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = if (isBengali) "বিএমডি বুলেটিন সম্পাদক" else "BMD Bulletin Editor",
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
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    // Active toggle
                    item {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(12.dp))
                                .background(Color.White.copy(alpha = 0.06f))
                                .padding(horizontal = 14.dp, vertical = 8.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = if (isBengali) "সতর্ক সংকেত সক্রিয় করুন" else "Enable Active Warning",
                                style = MaterialTheme.typography.bodyMedium.copy(color = Color.White)
                            )
                            Switch(
                                checked = isActive,
                                onCheckedChange = { isActive = it },
                                colors = SwitchDefaults.colors(
                                    checkedThumbColor = SignalRed,
                                    checkedTrackColor = SignalRed.copy(alpha = 0.4f)
                                )
                            )
                        }
                    }

                    // Quick Signal presets
                    item {
                        Text(
                            text = if (isBengali) "পূর্বনির্ধারিত সতর্কবার্তা চয়ন করুন:" else "Select Preset BMD Warning:",
                            style = MaterialTheme.typography.labelSmall.copy(color = Marigold)
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            PresetChip(
                                label = "Signal 3",
                                isSelected = selectedSignalNumber == 3,
                                onClick = {
                                    isActive = true
                                    selectedSignalNumber = 3
                                    signalTitleEn = "BMD Local Cautionary Signal 3"
                                    signalTitleBn = "বিএমডি স্থানীয় ৩ নম্বর সতর্ক সংকেত"
                                    bulletinTextEn = "Deep depression over North Bay of Bengal. Maritime ports of Chattogram, Cox's Bazar, Mongla, Payra advised to keep hoisted Local Cautionary Signal 3. Squally weather with gusty winds 40-50 km/h."
                                    bulletinTextBn = "উত্তর বঙ্গোপসাগরে গভীর সঞ্চালনশীল মেঘমালা সৃষ্টি হয়েছে। চট্টগ্রাম, কক্সবাজার, মোংলা ও পায়রা সমুদ্রবন্দরসমূহকে ৩ নম্বর স্থানীয় সতর্ক সংকেত দেখাতে বলা হয়েছে। মাছ ধরার ট্রলারসমূহকে উপকূলের কাছাকাছি চলাচল করতে বলা হয়েছে।"
                                }
                            )
                            PresetChip(
                                label = "Signal 8 (Danger)",
                                isSelected = selectedSignalNumber == 8,
                                onClick = {
                                    isActive = true
                                    selectedSignalNumber = 8
                                    signalTitleEn = "BMD Great Danger Signal 8"
                                    signalTitleBn = "বিএমডি ৮ নম্বর মহাবিপদ সংকেত"
                                    bulletinTextEn = "Severe Cyclonic Storm rapidly approaching coastal districts of Chattogram, Cox's Bazar and Barishal. Storm surge of 6-9 feet expected. Immediate evacuation to cyclone shelters."
                                    bulletinTextBn = "তীব্র ঘূর্ণিঝড় উপকূলীয় জেলাসমূহের দিকে অগ্রসর হচ্ছে। ৬-৯ ফুট উচ্চতার জলোচ্ছ্বাসের আশঙ্কা রয়েছে। জনসাধারণকে দ্রুত সাইক্লোন শেল্টারে আশ্রয় নেওয়ার নির্দেশ দেওয়া হচ্ছে।"
                                }
                            )
                            PresetChip(
                                label = "Kalbaishakhi",
                                isSelected = selectedSignalNumber == 2,
                                onClick = {
                                    isActive = true
                                    selectedSignalNumber = 2
                                    signalTitleEn = "Kalbaishakhi & Lightning Warning"
                                    signalTitleBn = "কালবৈশাখী ও বজ্রপাত সতর্কতা"
                                    bulletinTextEn = "Severe squally Kalbaishakhi wind 60-80 km/h with frequent lightning over inland districts. Avoid open fields and tall metal structures."
                                    bulletinTextBn = "দেশের বিভিন্ন অঞ্চলের ওপর দিয়ে ঘণ্টায় ৬০-৮০ কিমি বেগে কালবৈশাখী ঝড় ও বজ্রবৃষ্টি হতে পারে। খোলা মাঠে অবস্থান এড়িয়ে চলুন।"
                                }
                            )
                        }
                    }

                    // Title En & Bn
                    item {
                        OutlinedTextField(
                            value = signalTitleEn,
                            onValueChange = { signalTitleEn = it },
                            label = { Text("Alert Title (English)", color = Mist.copy(alpha = 0.6f)) },
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedBorderColor = SignalRed,
                                focusedTextColor = Color.White,
                                unfocusedTextColor = Color.White
                            ),
                            modifier = Modifier.fillMaxWidth()
                        )
                    }

                    item {
                        OutlinedTextField(
                            value = signalTitleBn,
                            onValueChange = { signalTitleBn = it },
                            label = { Text("সতর্কবার্তার শিরোনাম (বাংলা)", color = Mist.copy(alpha = 0.6f)) },
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedBorderColor = SignalRed,
                                focusedTextColor = Color.White,
                                unfocusedTextColor = Color.White
                            ),
                            modifier = Modifier.fillMaxWidth()
                        )
                    }

                    // Bulletin Text
                    item {
                        OutlinedTextField(
                            value = bulletinTextEn,
                            onValueChange = { bulletinTextEn = it },
                            label = { Text("Bulletin Details (English)", color = Mist.copy(alpha = 0.6f)) },
                            minLines = 3,
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedBorderColor = SignalRed,
                                focusedTextColor = Color.White,
                                unfocusedTextColor = Color.White
                            ),
                            modifier = Modifier.fillMaxWidth()
                        )
                    }

                    item {
                        OutlinedTextField(
                            value = bulletinTextBn,
                            onValueChange = { bulletinTextBn = it },
                            label = { Text("বুলেটিন বিবরণ (বাংলা)", color = Mist.copy(alpha = 0.6f)) },
                            minLines = 3,
                            colors = OutlinedTextFieldDefaults.colors(
                                focusedBorderColor = SignalRed,
                                focusedTextColor = Color.White,
                                unfocusedTextColor = Color.White
                            ),
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Action Buttons
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    OutlinedButton(
                        onClick = onDismiss,
                        modifier = Modifier.weight(1f)
                    ) {
                        Text(if (isBengali) "বাতিল" else "Cancel", color = Mist)
                    }

                    Button(
                        onClick = {
                            val updated = BmdAlert(
                                isActive = isActive,
                                signalNumber = selectedSignalNumber,
                                signalTitleEn = signalTitleEn,
                                signalTitleBn = signalTitleBn,
                                bulletinTextEn = bulletinTextEn,
                                bulletinTextBn = bulletinTextBn,
                                issuedTime = "Admin Issued Bulletin",
                                coastalPorts = coastalPorts
                            )
                            onSaveAlert(updated)
                            onDismiss()
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = SignalRed),
                        modifier = Modifier.weight(1f)
                    ) {
                        Text(if (isBengali) "সংরক্ষণ ও জারি" else "Save & Broadcast", color = Color.White)
                    }
                }
            }
        }
    }
}

@Composable
private fun PresetChip(label: String, isSelected: Boolean, onClick: () -> Unit) {
    Surface(
        shape = RoundedCornerShape(8.dp),
        color = if (isSelected) SignalRed else Color.White.copy(alpha = 0.08f),
        modifier = Modifier.clickable { onClick() }
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall.copy(
                fontWeight = FontWeight.SemiBold,
                color = if (isSelected) Color.White else Mist
            ),
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 6.dp)
        )
    }
}
