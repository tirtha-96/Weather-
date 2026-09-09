package com.example.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary = Marigold,
    onPrimary = DeepIndigo,
    primaryContainer = MonsoonTeal,
    onPrimaryContainer = Mist,
    secondary = PaddyGreenLight,
    onSecondary = Color.White,
    secondaryContainer = MonsoonTealLight,
    onSecondaryContainer = Mist,
    tertiary = Marigold,
    onTertiary = DeepIndigo,
    background = DeepIndigo,
    onBackground = Mist,
    surface = DeepIndigoElevated,
    onSurface = Mist,
    surfaceVariant = MonsoonTeal,
    onSurfaceVariant = Mist,
    error = SignalRed,
    onError = Color.White
)

private val LightColorScheme = lightColorScheme(
    primary = MonsoonTeal,
    onPrimary = Color.White,
    primaryContainer = MistSurface,
    onPrimaryContainer = MonsoonTeal,
    secondary = PaddyGreen,
    onSecondary = Color.White,
    secondaryContainer = Mist,
    onSecondaryContainer = MonsoonTeal,
    tertiary = MarigoldDark,
    onTertiary = Color.White,
    background = Mist,
    onBackground = DeepIndigo,
    surface = Color.White,
    onSurface = DeepIndigo,
    surfaceVariant = MistSurface,
    onSurfaceVariant = MonsoonTeal,
    error = SignalRed,
    onError = Color.White
)

@Composable
fun BengalSkyTheme(
    darkTheme: Boolean = true, // Default to rich Monsoon Teal / Deep Indigo theme
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
