package com.example.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Fill
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.BengaliCalendarHelper
import com.example.ui.theme.*

data class DivisionAlertZone(
    val id: String,
    val nameEn: String,
    val nameBn: String,
    val lat: Double,
    val lon: Double,
    val signalNumber: Int,
    val alertLevel: AlertLevel,
    val headlineEn: String,
    val headlineBn: String,
    val seaConditionEn: String,
    val seaConditionBn: String,
    // Normalized geographic polygon coordinates [x: 0..1, y: 0..1]
    val polygonPoints: List<Pair<Float, Float>>
)

enum class AlertLevel(val color: Color, val labelEn: String, val labelBn: String) {
    GREEN(Color(0xFF10B981), "Normal", "স্বাভাবিক"),
    YELLOW(Color(0xFFFBBF24), "Cautionary", "সতর্ক সংকেত"),
    ORANGE(Color(0xFFF97316), "Warning", "হুঁশিয়ারি সংকেত"),
    RED(Color(0xFFEF4444), "Danger", "বিপদ সংকেত")
}

// Bangladesh 8 Divisions with calibrated geographic projection polygons [x, y] in normalized space [0..1]
val BANGLADESH_DIVISIONS_DATA = listOf(
    DivisionAlertZone(
        id = "rangpur",
        nameEn = "Rangpur",
        nameBn = "রংপুর",
        lat = 25.7439,
        lon = 89.2752,
        signalNumber = 1,
        alertLevel = AlertLevel.GREEN,
        headlineEn = "Brahmaputra upper basin calm",
        headlineBn = "উত্তরাঞ্চলে শান্ত আবহাওয়া, স্বাভাবিক বৃষ্টিপাত",
        seaConditionEn = "Inland river ports signal 1",
        seaConditionBn = "অভ্যন্তরীণ নদী বন্দর ১ নম্বর সতর্ক সংকেত",
        polygonPoints = listOf(
            0.20f to 0.05f, 0.40f to 0.03f, 0.46f to 0.12f, 0.42f to 0.26f, 0.28f to 0.27f, 0.21f to 0.21f, 0.18f to 0.10f
        )
    ),
    DivisionAlertZone(
        id = "rajshahi",
        nameEn = "Rajshahi",
        nameBn = "রাজশাহী",
        lat = 24.3745,
        lon = 88.6042,
        signalNumber = 1,
        alertLevel = AlertLevel.GREEN,
        headlineEn = "Padma river normal flow",
        headlineBn = "পদ্মা নদী অববাহিকায় স্বাভাবিক অবস্থা",
        seaConditionEn = "Inland river ports normal",
        seaConditionBn = "নদী বন্দর স্বাভাবিক",
        polygonPoints = listOf(
            0.15f to 0.23f, 0.30f to 0.28f, 0.38f to 0.29f, 0.34f to 0.45f, 0.18f to 0.46f, 0.12f to 0.36f
        )
    ),
    DivisionAlertZone(
        id = "mymensingh",
        nameEn = "Mymensingh",
        nameBn = "ময়মনসিংহ",
        lat = 24.7471,
        lon = 90.4203,
        signalNumber = 2,
        alertLevel = AlertLevel.YELLOW,
        headlineEn = "Garo hills runoff & squall alert",
        headlineBn = "গারো পাহাড় পাদদেশে দমকা হাওয়া ও বৃষ্টির সম্ভাবনা",
        seaConditionEn = "River ports cautionary 2",
        seaConditionBn = "নদী বন্দরসমূহে ২ নম্বর হুঁশিয়ারি সংকেত",
        polygonPoints = listOf(
            0.43f to 0.17f, 0.62f to 0.19f, 0.60f to 0.33f, 0.44f to 0.32f, 0.41f to 0.24f
        )
    ),
    DivisionAlertZone(
        id = "sylhet",
        nameEn = "Sylhet",
        nameBn = "সিলেট",
        lat = 24.8949,
        lon = 91.8687,
        signalNumber = 3,
        alertLevel = AlertLevel.YELLOW,
        headlineEn = "Surma-Kushiyara heavy rainfall watch",
        headlineBn = "মেঘালয় সীমান্তে অতি ভারী বর্ষণ ও পাহাড়ি ঢলের পূর্বাভাস",
        seaConditionEn = "Haor river warning active",
        seaConditionBn = "হাওর ও অভ্যন্তরীণ নদী এলাকায় সতর্কতা জারি",
        polygonPoints = listOf(
            0.63f to 0.20f, 0.88f to 0.22f, 0.85f to 0.42f, 0.67f to 0.40f, 0.62f to 0.30f
        )
    ),
    DivisionAlertZone(
        id = "dhaka",
        nameEn = "Dhaka",
        nameBn = "ঢাকা",
        lat = 23.8103,
        lon = 90.4125,
        signalNumber = 2,
        alertLevel = AlertLevel.YELLOW,
        headlineEn = "Monsoon rain with localized urban waterlogging",
        headlineBn = "রাজধানী ও আশপাশে মাঝারি থেকে ভারী বর্ষণ",
        seaConditionEn = "Sadarghat river port cautionary 1",
        seaConditionBn = "সদরঘাট নদী বন্দর ১ নম্বর সতর্ক সংকেত",
        polygonPoints = listOf(
            0.38f to 0.35f, 0.58f to 0.34f, 0.59f to 0.53f, 0.45f to 0.55f, 0.36f to 0.46f
        )
    ),
    DivisionAlertZone(
        id = "khulna",
        nameEn = "Khulna",
        nameBn = "খুলনা",
        lat = 22.8456,
        lon = 89.5403,
        signalNumber = 3,
        alertLevel = AlertLevel.ORANGE,
        headlineEn = "Mongla port cautionary signal 3",
        headlineBn = "মোংলা সমুদ্র বন্দরে ৩ নম্বর স্থানীয় সতর্ক সংকেত",
        seaConditionEn = "Sundarbans coastal squalls 50-60 km/h",
        seaConditionBn = "উপকূলীয় এলাকায় দমকা/ঝড়ো হাওয়া অব্যাহত",
        polygonPoints = listOf(
            0.18f to 0.50f, 0.40f to 0.49f, 0.42f to 0.76f, 0.24f to 0.84f, 0.17f to 0.68f
        )
    ),
    DivisionAlertZone(
        id = "barishal",
        nameEn = "Barishal",
        nameBn = "বরিশাল",
        lat = 22.7010,
        lon = 90.3535,
        signalNumber = 3,
        alertLevel = AlertLevel.ORANGE,
        headlineEn = "Payra port signal 3 & tidal surge watch",
        headlineBn = "পায়রা সমুদ্র বন্দরে ৩ নম্বর সতর্ক সংকেত",
        seaConditionEn = "Meghna estuary rough sea",
        seaConditionBn = "বঙ্গোপসাগর উত্তাল, ট্রলারসমূহকে উপকূলে থাকতে নির্দেশ",
        polygonPoints = listOf(
            0.41f to 0.55f, 0.58f to 0.55f, 0.57f to 0.81f, 0.44f to 0.80f, 0.40f to 0.65f
        )
    ),
    DivisionAlertZone(
        id = "chattogram",
        nameEn = "Chattogram",
        nameBn = "চট্টগ্রাম",
        lat = 22.3569,
        lon = 91.7832,
        signalNumber = 4,
        alertLevel = AlertLevel.RED,
        headlineEn = "Chattogram & Cox's Bazar cautionary signal 4",
        headlineBn = "চট্টগ্রাম ও কক্সবাজার বন্দরে ৪ নম্বর স্থানীয় হুঁশিয়ারি সংকেত",
        seaConditionEn = "Deep depression over Bay of Bengal",
        seaConditionBn = "উত্তর বঙ্গোপসাগরে গভীর সঞ্চালনশীল মেঘমালা সৃষ্টি",
        polygonPoints = listOf(
            0.60f to 0.42f, 0.78f to 0.44f, 0.90f to 0.58f, 0.83f to 0.94f, 0.70f to 0.85f, 0.58f to 0.65f
        )
    )
)

@Composable
fun BmdAlertMapCard(
    isBengali: Boolean,
    useBengaliDigits: Boolean,
    onSelectDivisionLocation: (Double, Double, String, String) -> Unit,
    modifier: Modifier = Modifier
) {
    var selectedDivisionId by remember { mutableStateOf<String?>("chattogram") }
    var showInfoDialog by remember { mutableStateOf(false) }

    val selectedZone = remember(selectedDivisionId) {
        BANGLADESH_DIVISIONS_DATA.find { it.id == selectedDivisionId } ?: BANGLADESH_DIVISIONS_DATA.last()
    }

    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(24.dp))
            .background(Color(0xFF0F1B26).copy(alpha = 0.92f))
            .border(1.dp, Color.White.copy(alpha = 0.12f), RoundedCornerShape(24.dp))
            .padding(18.dp)
            .testTag("bmd_alert_map_card")
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            // Header Row
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .clip(CircleShape)
                            .background(SignalRed.copy(alpha = 0.2f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Map,
                            contentDescription = "BMD Alert Map",
                            tint = SignalRedLight,
                            modifier = Modifier.size(22.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = if (isBengali) "বিএমডি সতর্কতা জোন মানচিত্র" else "BMD Alert Zones Map",
                            color = Color.White,
                            fontSize = 17.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = if (isBengali) "বাংলাদেশ আবহাওয়া অধিদপ্তর ৮ বিভাগ" else "Bangladesh Meteorological Dept. Zones",
                            color = Mist,
                            fontSize = 12.sp
                        )
                    }
                }

                IconButton(
                    onClick = { showInfoDialog = true },
                    modifier = Modifier.size(32.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Info,
                        contentDescription = "BMD Signals Info",
                        tint = MarigoldLight,
                        modifier = Modifier.size(20.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Alert Level Legend Row
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.White.copy(alpha = 0.05f))
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                LegendChip(color = AlertLevel.GREEN.color, text = if (isBengali) "স্বাভাবিক (১)" else "Normal (1)")
                LegendChip(color = AlertLevel.YELLOW.color, text = if (isBengali) "সতর্ক (২)" else "Caution (2)")
                LegendChip(color = AlertLevel.ORANGE.color, text = if (isBengali) "হুঁশিয়ারি (৩)" else "Warning (3)")
                LegendChip(color = AlertLevel.RED.color, text = if (isBengali) "বিপদ (৪-১০)" else "Danger (4+)")
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Interactive Map Canvas Area
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(260.dp)
                    .clip(RoundedCornerShape(18.dp))
                    .background(Color(0xFF08131C))
                    .border(1.dp, Color.White.copy(alpha = 0.07f), RoundedCornerShape(18.dp))
            ) {
                // Background Bay of Bengal wave watermark
                Canvas(
                    modifier = Modifier
                        .fillMaxSize()
                        .pointerInput(Unit) {
                            detectTapGestures { tapOffset ->
                                val w = size.width
                                val h = size.height
                                val nx = tapOffset.x / w
                                val ny = tapOffset.y / h

                                // Find nearest division centroid
                                val closest = BANGLADESH_DIVISIONS_DATA.minByOrNull { zone ->
                                    val avgX = zone.polygonPoints.map { it.first }.average().toFloat()
                                    val avgY = zone.polygonPoints.map { it.second }.average().toFloat()
                                    val dx = nx - avgX
                                    val dy = ny - avgY
                                    dx * dx + dy * dy
                                }
                                if (closest != null) {
                                    selectedDivisionId = closest.id
                                }
                            }
                        }
                ) {
                    val w = size.width
                    val h = size.height

                    // Subtle grid lines
                    for (x in 1..4) {
                        drawLine(
                            color = Color.White.copy(alpha = 0.03f),
                            start = Offset(w * (x / 5f), 0f),
                            end = Offset(w * (x / 5f), h),
                            strokeWidth = 1f
                        )
                    }

                    // Draw each division polygon
                    BANGLADESH_DIVISIONS_DATA.forEach { zone ->
                        val isSelected = zone.id == selectedDivisionId
                        val path = Path()
                        val pts = zone.polygonPoints
                        if (pts.isNotEmpty()) {
                            path.moveTo(pts[0].first * w, pts[0].second * h)
                            for (i in 1 until pts.size) {
                                path.lineTo(pts[i].first * w, pts[i].second * h)
                            }
                            path.close()

                            // Fill
                            val fillColor = if (isSelected) {
                                zone.alertLevel.color.copy(alpha = 0.65f)
                            } else {
                                zone.alertLevel.color.copy(alpha = 0.28f)
                            }
                            drawPath(path, color = fillColor, style = Fill)

                            // Stroke border
                            val strokeColor = if (isSelected) Color.White else zone.alertLevel.color
                            val strokeWidth = if (isSelected) 3.5f else 1.8f
                            drawPath(path, color = strokeColor, style = Stroke(width = strokeWidth))

                            // Draw division centroid marker with signal number
                            val cx = pts.map { it.first }.average().toFloat() * w
                            val cy = pts.map { it.second }.average().toFloat() * h

                            drawCircle(
                                color = if (isSelected) Color.White else Color(0xFF0F172A),
                                radius = if (isSelected) 13f else 10f,
                                center = Offset(cx, cy)
                            )
                            drawCircle(
                                color = zone.alertLevel.color,
                                radius = if (isSelected) 10f else 8f,
                                center = Offset(cx, cy)
                            )
                        }
                    }

                    // Water Label: Bay of Bengal (বঙ্গোপসাগর)
                    // Decorative coastal text indicator
                }

                // Overlay Map Title & Bay of Bengal Badge
                Box(
                    modifier = Modifier
                        .align(Alignment.BottomCenter)
                        .padding(bottom = 8.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color(0xFF0369A1).copy(alpha = 0.45f))
                        .padding(horizontal = 10.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = if (isBengali) "🌊 বঙ্গোপসাগর (Bay of Bengal)" else "🌊 Bay of Bengal (Maritime Warning Zone)",
                        color = Color(0xFFBAE6FD),
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Medium
                    )
                }

                // Tap instruction pill
                Box(
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                        .padding(8.dp)
                        .clip(RoundedCornerShape(6.dp))
                        .background(Color.Black.copy(alpha = 0.6f))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = if (isBengali) "বিভাগে ট্যাপ করুন" else "Tap division to inspect",
                        color = Color.White.copy(alpha = 0.8f),
                        fontSize = 10.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Division Chips Bar
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(BANGLADESH_DIVISIONS_DATA) { zone ->
                    val isSelected = zone.id == selectedDivisionId
                    Surface(
                        shape = RoundedCornerShape(12.dp),
                        color = if (isSelected) zone.alertLevel.color.copy(alpha = 0.25f) else Color.White.copy(alpha = 0.05f),
                        border = androidx.compose.foundation.BorderStroke(
                            1.dp,
                            if (isSelected) zone.alertLevel.color else Color.White.copy(alpha = 0.08f)
                        ),
                        modifier = Modifier.clickable { selectedDivisionId = zone.id }
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(8.dp)
                                    .clip(CircleShape)
                                    .background(zone.alertLevel.color)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = if (isBengali) zone.nameBn else zone.nameEn,
                                color = if (isSelected) Color.White else Mist,
                                fontSize = 12.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            val sigStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(zone.signalNumber) else "${zone.signalNumber}"
                            Text(
                                text = "[$sigStr]",
                                color = zone.alertLevel.color,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Detailed Selected Zone Inspection Card
            Surface(
                shape = RoundedCornerShape(16.dp),
                color = selectedZone.alertLevel.color.copy(alpha = 0.12f),
                border = androidx.compose.foundation.BorderStroke(1.dp, selectedZone.alertLevel.color.copy(alpha = 0.35f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f).padding(end = 8.dp)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = if (isBengali) "${selectedZone.nameBn} বিভাগ" else "${selectedZone.nameEn} Division",
                                    color = Color.White,
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(6.dp))
                                        .background(selectedZone.alertLevel.color)
                                        .padding(horizontal = 8.dp, vertical = 2.dp)
                                ) {
                                    val sigText = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(selectedZone.signalNumber) else "${selectedZone.signalNumber}"
                                    Text(
                                        text = if (isBengali) "সংকেত $sigText নম্বর" else "Signal No. $sigText",
                                        color = Color.Black,
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.ExtraBold
                                    )
                                }
                            }
                            Spacer(modifier = Modifier.height(2.dp))
                            Text(
                                text = if (isBengali) selectedZone.headlineBn else selectedZone.headlineEn,
                                color = Color.White.copy(alpha = 0.9f),
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Medium
                            )
                        }

                        // Switch to this division weather button
                        Button(
                            onClick = {
                                onSelectDivisionLocation(
                                    selectedZone.lat,
                                    selectedZone.lon,
                                    selectedZone.nameEn,
                                    selectedZone.nameBn
                                )
                            },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = selectedZone.alertLevel.color
                            ),
                            shape = RoundedCornerShape(10.dp),
                            contentPadding = PaddingValues(horizontal = 10.dp, vertical = 6.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.NearMe,
                                contentDescription = "View Weather",
                                tint = Color.Black,
                                modifier = Modifier.size(14.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = if (isBengali) "আবহাওয়া দেখুন" else "View Weather",
                                color = Color.Black,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    // Port & Marine bullet
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.DirectionsBoat,
                            contentDescription = "Ports",
                            tint = selectedZone.alertLevel.color,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = if (isBengali) selectedZone.seaConditionBn else selectedZone.seaConditionEn,
                            color = Mist,
                            fontSize = 12.sp
                        )
                    }
                }
            }
        }
    }

    // BMD Maritime Signal Info Sheet / Dialog
    if (showInfoDialog) {
        AlertDialog(
            onDismissRequest = { showInfoDialog = false },
            title = {
                Text(
                    text = if (isBengali) "বাংলাদেশ আবহাওয়া অধিদপ্তরের সতর্ক সংকেত নির্দেশিকা" else "BMD Warning Signal Reference",
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
            },
            text = {
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    SignalExplanationRow("১ নম্বর (Signal 1)", "দূরবর্তী সতর্ক সংকেত (Distant Cautionary)", "জাহাজগুলো ছেড়ে যাওয়ার পর দুর্যোগপূর্ণ আবহাওয়ায় পড়তে পারে।", AlertLevel.GREEN.color)
                    SignalExplanationRow("২ নম্বর (Signal 2)", "দূরবর্তী হুঁশিয়ারি (Distant Warning)", "সাগরে ঘূর্ণিবায়ুর সৃষ্টি হয়েছে, উপকূলে পৌঁছাতে পারে।", AlertLevel.YELLOW.color)
                    SignalExplanationRow("৩ নম্বর (Signal 3)", "স্থানীয় সতর্ক সংকেত (Local Cautionary)", "বন্দর ও উপকূলীয় এলাকা দমকা হাওয়া দ্বারা আক্রান্ত হতে পারে।", AlertLevel.YELLOW.color)
                    SignalExplanationRow("৪ নম্বর (Signal 4)", "স্থানীয় হুঁশিয়ারি (Local Warning)", "বন্দর অবিলম্বে ঘূর্ণিঝড়ের কবলে পড়তে পারে।", AlertLevel.ORANGE.color)
                    SignalExplanationRow("৫-৭ নম্বর (Signals 5-7)", "বিপদ সংকেত (Danger Signal)", "বন্দর মাঝারি বা তীব্র ঘূর্ণিঝড়ের সরাসরি কবলে পড়ার আশঙ্কা।", AlertLevel.RED.color)
                    SignalExplanationRow("৮-১০ নম্বর (Signals 8-10)", "মহাবিপদ সংকেত (Great Danger)", "বন্দর প্রচণ্ড তীব্র ঘূর্ণিঝড়ের কবলে পড়বে ও ব্যাপক জলোচ্ছ্বাসের আশঙ্কা।", AlertLevel.RED.color)
                }
            },
            confirmButton = {
                TextButton(onClick = { showInfoDialog = false }) {
                    Text(if (isBengali) "বুঝেছি" else "Close", fontWeight = FontWeight.Bold)
                }
            }
        )
    }
}

@Composable
private fun LegendChip(color: Color, text: String) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Box(
            modifier = Modifier
                .size(9.dp)
                .clip(CircleShape)
                .background(color)
        )
        Spacer(modifier = Modifier.width(5.dp))
        Text(text = text, color = Mist, fontSize = 11.sp)
    }
}

@Composable
private fun SignalExplanationRow(title: String, subtitle: String, desc: String, tagColor: Color) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .background(Color.White.copy(alpha = 0.05f))
            .padding(8.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(8.dp)
                    .clip(CircleShape)
                    .background(tagColor)
            )
            Spacer(modifier = Modifier.width(6.dp))
            Text(text = title, color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.width(4.dp))
            Text(text = subtitle, color = tagColor, fontSize = 11.sp)
        }
        Spacer(modifier = Modifier.height(2.dp))
        Text(text = desc, color = Mist, fontSize = 11.sp)
    }
}
