package com.example.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import com.example.data.model.ConditionType
import com.example.ui.theme.*
import java.util.Calendar
import java.util.TimeZone
import kotlin.random.Random

@Composable
fun DynamicSkyBackground(
    conditionType: ConditionType = ConditionType.PARTLY_CLOUDY,
    isDarkTheme: Boolean = true,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    val cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Dhaka"))
    val hour = cal.get(Calendar.HOUR_OF_DAY)
    val minute = cal.get(Calendar.MINUTE)
    val timeDecimal = hour + minute / 60.0

    // Determine target gradient colors
    val isMonsoon = conditionType in listOf(
        ConditionType.RAIN_LIGHT,
        ConditionType.RAIN_HEAVY_MONSOON,
        ConditionType.THUNDERSTORM,
        ConditionType.CYCLONE_STORM
    )

    val (topColorTarget, midColorTarget, bottomColorTarget) = remember(timeDecimal, isMonsoon, isDarkTheme) {
        when {
            isMonsoon -> Triple(MonsoonTeal, Color(0xFF132B32), DeepIndigo)
            timeDecimal in 5.0..6.5 -> Triple(DawnTeal, DawnRose, DawnGold)
            timeDecimal in 6.5..16.5 -> {
                if (isDarkTheme) Triple(MonsoonTeal, MonsoonTealLight, DeepIndigo)
                else Triple(Color(0xFFE3F2FD), Mist, MistSurface)
            }
            timeDecimal in 16.5..18.5 -> Triple(DuskPurple, DuskOrange, Marigold)
            else -> Triple(NightDeep, DeepIndigo, NightStarBlue)
        }
    }

    val topColor by animateColorAsState(topColorTarget, animationSpec = tween(1200), label = "topColor")
    val midColor by animateColorAsState(midColorTarget, animationSpec = tween(1200), label = "midColor")
    val bottomColor by animateColorAsState(bottomColorTarget, animationSpec = tween(1200), label = "bottomColor")

    // Continuous subtle motion for particles
    val infiniteTransition = rememberInfiniteTransition(label = "particles")
    val animProgress by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(1800, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "rainOrStars"
    )

    // Star seeds
    val stars = remember {
        List(35) {
            Triple(Random.nextFloat(), Random.nextFloat(), Random.nextFloat() * 2f + 1f)
        }
    }

    // Rain drop offsets
    val rainDrops = remember {
        List(40) {
            Pair(Random.nextFloat(), Random.nextFloat())
        }
    }

    Box(modifier = modifier.fillMaxSize()) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val canvasWidth = size.width
            val canvasHeight = size.height

            // Background Gradient
            val skyBrush = Brush.verticalGradient(
                listOf(topColor, midColor, bottomColor),
                startY = 0f,
                endY = canvasHeight
            )
            drawRect(brush = skyBrush)

            // Dynamic condition atmospheric overlay
            if (isMonsoon) {
                // Animated Falling Rain Streaks
                val dropLength = 26f
                for ((idx, drop) in rainDrops.withIndex()) {
                    val x = (drop.first * canvasWidth + idx * 7) % canvasWidth
                    val startYOffset = drop.second * canvasHeight
                    val currentY = (startYOffset + animProgress * canvasHeight * 1.5f) % (canvasHeight + dropLength)

                    drawLine(
                        color = Color.White.copy(alpha = 0.22f),
                        start = Offset(x, currentY - dropLength),
                        end = Offset(x - 3f, currentY),
                        strokeWidth = 1.8f
                    )
                }
            } else if (timeDecimal !in 6.5..17.5 && isDarkTheme) {
                // Subtle twinkling stars at night
                for (star in stars) {
                    val x = star.first * canvasWidth
                    val y = star.second * (canvasHeight * 0.6f)
                    val alpha = (0.3f + 0.5f * kotlin.math.sin((animProgress * 2 * Math.PI + star.third).toDouble()).toFloat())
                        .coerceIn(0.15f, 0.85f)
                    drawCircle(
                        color = Color.White.copy(alpha = alpha),
                        radius = star.third,
                        center = Offset(x, y)
                    )
                }
            }
        }

        content()
    }
}
