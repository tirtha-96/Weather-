package com.example.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
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
import com.example.data.model.BmdAlert
import com.example.ui.theme.SignalRed
import com.example.ui.theme.SignalRedLight

@Composable
fun SevereWeatherAlertBanner(
    alert: BmdAlert,
    isBengali: Boolean,
    onEditBulletin: () -> Unit,
    modifier: Modifier = Modifier
) {
    var isExpanded by remember { mutableStateOf(false) }

    if (!alert.isActive) return

    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(20.dp))
            .background(Color(0xFF330B0B))
            .border(1.5.dp, SignalRed, RoundedCornerShape(20.dp))
            .clickable { isExpanded = !isExpanded }
            .padding(16.dp)
            .testTag("bmd_alert_banner")
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.weight(1f)
                ) {
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(SignalRed),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Warning,
                            contentDescription = "Severe Alert",
                            tint = Color.White,
                            modifier = Modifier.size(22.dp)
                        )
                    }

                    Spacer(modifier = Modifier.width(12.dp))

                    Column {
                        Text(
                            text = if (isBengali) alert.signalTitleBn else alert.signalTitleEn,
                            style = MaterialTheme.typography.titleMedium.copy(
                                fontWeight = FontWeight.Bold,
                                color = SignalRedLight
                            )
                        )
                        Text(
                            text = if (isBengali) "বাংলাদেশ আবহাওয়া অধিদপ্তর (BMD) বুলেটিন" else "Bangladesh Meteorological Dept. Bulletin",
                            style = MaterialTheme.typography.labelSmall.copy(
                                color = Color.White.copy(alpha = 0.7f)
                            )
                        )
                    }
                }

                Row(verticalAlignment = Alignment.CenterVertically) {
                    IconButton(
                        onClick = onEditBulletin,
                        modifier = Modifier.size(36.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Edit,
                            contentDescription = "Edit Bulletin",
                            tint = SignalRedLight,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                    Icon(
                        imageVector = if (isExpanded) Icons.Default.KeyboardArrowUp else Icons.Default.KeyboardArrowDown,
                        contentDescription = "Toggle Details",
                        tint = Color.White.copy(alpha = 0.8f)
                    )
                }
            }

            // Summary preview
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = if (isBengali) alert.bulletinTextBn else alert.bulletinTextEn,
                style = MaterialTheme.typography.bodySmall.copy(
                    color = Color.White.copy(alpha = 0.92f),
                    lineHeight = MaterialTheme.typography.bodySmall.lineHeight
                ),
                maxLines = if (isExpanded) 12 else 2
            )

            AnimatedVisibility(visible = isExpanded) {
                Column(modifier = Modifier.padding(top = 10.dp)) {
                    Divider(color = SignalRed.copy(alpha = 0.35f))
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = if (isBengali) "উপকূলীয় বন্দর: ${alert.coastalPorts}" else "Maritime Ports: ${alert.coastalPorts}",
                        style = MaterialTheme.typography.labelSmall.copy(
                            fontWeight = FontWeight.SemiBold,
                            color = SignalRedLight
                        )
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = if (isBengali) "ইস্যুর সময়: ${alert.issuedTime}" else "Issued: ${alert.issuedTime}",
                        style = MaterialTheme.typography.labelSmall.copy(
                            color = Color.White.copy(alpha = 0.6f)
                        )
                    )
                }
            }
        }
    }
}
