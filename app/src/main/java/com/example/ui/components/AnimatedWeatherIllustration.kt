package com.example.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.example.data.model.ConditionType
import com.example.ui.theme.Marigold
import com.example.ui.theme.Mist
import kotlin.math.cos
import kotlin.math.sin

@Composable
fun AnimatedWeatherIllustration(
    conditionType: ConditionType,
    isDay: Boolean = true,
    size: Dp = 100.dp,
    modifier: Modifier = Modifier
) {
    val infiniteTransition = rememberInfiniteTransition(label = "weatherAnim")

    // Pulse & Rotation for sun
    val sunPulse by infiniteTransition.animateFloat(
        initialValue = 0.92f,
        targetValue = 1.08f,
        animationSpec = infiniteRepeatable(
            animation = tween(2200, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "sunPulse"
    )

    val sunRotation by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            animation = tween(24000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "sunRotation"
    )

    // Cloud drift
    val cloudDrift by infiniteTransition.animateFloat(
        initialValue = -6f,
        targetValue = 6f,
        animationSpec = infiniteRepeatable(
            animation = tween(3200, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "cloudDrift"
    )

    // Rain drop translation
    val rainDropShift by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(900, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "rainDrop"
    )

    // Lightning Flash
    val lightningAlpha by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = keyframes {
                durationMillis = 2800
                0.0f at 0
                0.0f at 2200
                1.0f at 2250
                0.2f at 2300
                1.0f at 2350
                0.0f at 2500
            },
            repeatMode = RepeatMode.Restart
        ),
        label = "lightningFlash"
    )

    Canvas(modifier = modifier.size(size)) {
        val cx = this.size.width / 2f
        val cy = this.size.height / 2f
        val r = this.size.width * 0.22f

        when (conditionType) {
            ConditionType.CLEAR_SUN -> {
                if (isDay) {
                    drawRadiantSun(cx, cy, r, sunPulse, sunRotation)
                } else {
                    drawCrescentMoon(cx, cy, r)
                }
            }
            ConditionType.PARTLY_CLOUDY -> {
                if (isDay) {
                    drawRadiantSun(cx + 14f, cy - 14f, r * 0.75f, sunPulse, sunRotation)
                }
                drawStylizedCloud(cx + cloudDrift, cy + 8f, r * 0.85f, Color.White.copy(alpha = 0.95f))
            }
            ConditionType.OVERCAST -> {
                drawStylizedCloud(cx - 10f, cy - 6f, r * 0.75f, Color(0xFF90A4AE).copy(alpha = 0.7f))
                drawStylizedCloud(cx + cloudDrift + 4f, cy + 6f, r * 0.95f, Color.White.copy(alpha = 0.9f))
            }
            ConditionType.FOG_MIST -> {
                drawStylizedCloud(cx + cloudDrift, cy - 10f, r * 0.75f, Color(0xFFCFD8DC).copy(alpha = 0.75f))
                drawMistWaves(cx, cy + 12f, this.size.width * 0.75f, cloudDrift)
            }
            ConditionType.RAIN_LIGHT -> {
                drawStylizedCloud(cx + cloudDrift, cy - 10f, r * 0.88f, Color(0xFFB0BEC5))
                drawRainStreaks(cx, cy + 14f, rainDropShift, count = 4, isHeavy = false)
            }
            ConditionType.RAIN_HEAVY_MONSOON -> {
                drawStylizedCloud(cx - 8f, cy - 16f, r * 0.85f, Color(0xFF78909C))
                drawStylizedCloud(cx + cloudDrift, cy - 6f, r * 0.95f, Color(0xFF455A64))
                drawRainStreaks(cx, cy + 14f, rainDropShift, count = 6, isHeavy = true)
            }
            ConditionType.THUNDERSTORM, ConditionType.CYCLONE_STORM -> {
                drawStylizedCloud(cx + cloudDrift, cy - 12f, r * 0.95f, Color(0xFF37474F))
                drawRainStreaks(cx, cy + 14f, rainDropShift, count = 5, isHeavy = true)
                if (lightningAlpha > 0.05f) {
                    drawLightningBolt(cx, cy + 2f, lightningAlpha)
                }
            }
        }
    }
}

private fun DrawScope.drawRadiantSun(
    cx: Float,
    cy: Float,
    r: Float,
    pulse: Float,
    rotationDeg: Float
) {
    // Halo glow
    drawCircle(
        color = Marigold.copy(alpha = 0.22f * pulse),
        radius = r * 1.5f * pulse,
        center = Offset(cx, cy)
    )
    // Sun Rays
    val numRays = 8
    val rayLength = r * 0.45f
    val rotRad = Math.toRadians(rotationDeg.toDouble())
    for (i in 0 until numRays) {
        val angle = rotRad + i * (2 * Math.PI / numRays)
        val startX = cx + (r * 1.15f) * cos(angle).toFloat()
        val startY = cy + (r * 1.15f) * sin(angle).toFloat()
        val endX = cx + (r * 1.15f + rayLength) * cos(angle).toFloat()
        val endY = cy + (r * 1.15f + rayLength) * sin(angle).toFloat()
        drawLine(
            color = Marigold,
            start = Offset(startX, startY),
            end = Offset(endX, endY),
            strokeWidth = 3f
        )
    }
    // Main Sun Body
    drawCircle(
        color = Marigold,
        radius = r * pulse,
        center = Offset(cx, cy)
    )
}

private fun DrawScope.drawCrescentMoon(cx: Float, cy: Float, r: Float) {
    drawCircle(
        color = Color(0xFFFFF9C4),
        radius = r,
        center = Offset(cx, cy)
    )
    drawCircle(
        color = Color(0xFF0B1420),
        radius = r * 0.9f,
        center = Offset(cx + r * 0.45f, cy - r * 0.25f)
    )
}

private fun DrawScope.drawStylizedCloud(
    cx: Float,
    cy: Float,
    r: Float,
    color: Color
) {
    // Cloud composed of 3 overlapping circles and bottom pill
    drawCircle(color = color, radius = r * 0.55f, center = Offset(cx - r * 0.7f, cy + r * 0.1f))
    drawCircle(color = color, radius = r * 0.82f, center = Offset(cx, cy - r * 0.15f))
    drawCircle(color = color, radius = r * 0.65f, center = Offset(cx + r * 0.68f, cy + r * 0.12f))
    drawRoundRect(
        color = color,
        topLeft = Offset(cx - r * 1.15f, cy + r * 0.05f),
        size = Size(r * 2.3f, r * 0.65f),
        cornerRadius = CornerRadius(r * 0.35f, r * 0.35f)
    )
}

private fun DrawScope.drawRainStreaks(
    cx: Float,
    baseY: Float,
    progress: Float,
    count: Int,
    isHeavy: Boolean
) {
    val dropColor = if (isHeavy) Color(0xFF81D4FA) else Color(0xFFB3E5FC)
    val dropLength = if (isHeavy) 16f else 10f
    val spacing = 12f
    val startX = cx - (count - 1) * spacing / 2f

    for (i in 0 until count) {
        val x = startX + i * spacing
        val dropProg = (progress + i * 0.22f) % 1.0f
        val y = baseY + dropProg * 28f
        drawLine(
            color = dropColor.copy(alpha = 0.85f),
            start = Offset(x, y),
            end = Offset(x - 2.5f, y + dropLength),
            strokeWidth = if (isHeavy) 2.6f else 1.8f
        )
    }
}

private fun DrawScope.drawLightningBolt(cx: Float, cy: Float, alpha: Float) {
    val path = Path().apply {
        moveTo(cx - 3f, cy)
        lineTo(cx + 6f, cy + 12f)
        lineTo(cx, cy + 13f)
        lineTo(cx + 7f, cy + 28f)
        lineTo(cx - 5f, cy + 15f)
        lineTo(cx - 1f, cy + 14f)
        close()
    }
    drawPath(path, color = Marigold.copy(alpha = alpha))
}

private fun DrawScope.drawMistWaves(cx: Float, cy: Float, width: Float, drift: Float) {
    val mistColor = Mist.copy(alpha = 0.55f)
    for (i in 0..2) {
        val y = cy + i * 8f
        val lineStart = cx - width / 2f + (drift * (i + 1))
        val lineEnd = cx + width / 2f + (drift * (i + 1))
        drawLine(
            color = mistColor,
            start = Offset(lineStart, y),
            end = Offset(lineEnd, y),
            strokeWidth = 3.5f
        )
    }
}
