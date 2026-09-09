package com.example.ui

import android.Manifest
import android.content.pm.PackageManager
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import com.example.data.model.ConditionType
import com.example.location.LocationHelper
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun WeatherScreen(
    viewModel: WeatherViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsState()
    val savedLocations by viewModel.savedLocations.collectAsState()
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()

    var showSearchSheet by remember { mutableStateOf(false) }
    var showSettingsDialog by remember { mutableStateOf(false) }
    var showBmdEditorDialog by remember { mutableStateOf(false) }

    // Location Permission launcher
    val locationPermissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val fineGranted = permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true
        val coarseGranted = permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true
        if (fineGranted || coarseGranted) {
            coroutineScope.launch {
                val loc = LocationHelper.getCurrentLocation(context)
                if (loc != null) {
                    viewModel.updateGpsLocation(loc.latitude, loc.longitude)
                }
            }
        }
    }

    // Auto-request location on first launch if not granted
    LaunchedEffect(Unit) {
        val hasFine = ContextCompat.checkSelfPermission(
            context, Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED

        if (hasFine) {
            val loc = LocationHelper.getCurrentLocation(context)
            if (loc != null) {
                viewModel.updateGpsLocation(loc.latitude, loc.longitude)
            }
        } else {
            locationPermissionLauncher.launch(
                arrayOf(
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                )
            )
        }
    }

    val conditionType = uiState.weather?.current?.condition?.conditionType ?: ConditionType.PARTLY_CLOUDY

    DynamicSkyBackground(
        conditionType = conditionType,
        isDarkTheme = uiState.isDarkMode,
        modifier = modifier
    ) {
        Scaffold(
            containerColor = Color.Transparent,
            contentWindowInsets = WindowInsets.statusBars,
            topBar = {
                // Top App Bar
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // App Branding
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.testTag("app_branding_header")
                    ) {
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = Marigold.copy(alpha = 0.2f),
                            border = androidx.compose.foundation.BorderStroke(1.dp, Marigold.copy(alpha = 0.5f))
                        ) {
                            Icon(
                                imageVector = Icons.Default.CloudQueue,
                                contentDescription = null,
                                tint = Marigold,
                                modifier = Modifier
                                    .padding(6.dp)
                                    .size(22.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = if (uiState.isBengali) "বেঙ্গল স্কাই" else "Bengal Sky",
                                style = MaterialTheme.typography.titleLarge.copy(
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color.White,
                                    letterSpacing = 0.5.sp
                                )
                            )
                            Text(
                                text = if (uiState.isBengali) "বাংলাদেশ ওয়েদার ইন্টেলিজেন্স" else "Bangladesh Weather Hub",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    color = Mist.copy(alpha = 0.7f),
                                    fontSize = 10.sp
                                )
                            )
                        }
                    }

                    // Actions (Language Toggle, Search, Settings)
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        // Language Switcher Pill
                        Surface(
                            shape = RoundedCornerShape(14.dp),
                            color = Color.White.copy(alpha = 0.12f),
                            border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.2f)),
                            modifier = Modifier
                                .clickable { viewModel.toggleLanguage(!uiState.isBengali) }
                                .testTag("language_toggle_button")
                        ) {
                            Text(
                                text = if (uiState.isBengali) "EN" else "বাং",
                                style = MaterialTheme.typography.labelMedium.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = Marigold
                                ),
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                            )
                        }

                        // Search Location
                        IconButton(
                            onClick = { showSearchSheet = true },
                            modifier = Modifier
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(Color.White.copy(alpha = 0.1f))
                                .testTag("search_location_button")
                        ) {
                            Icon(
                                imageVector = Icons.Default.Search,
                                contentDescription = "Search District",
                                tint = Color.White,
                                modifier = Modifier.size(20.dp)
                            )
                        }

                        // Settings
                        IconButton(
                            onClick = { showSettingsDialog = true },
                            modifier = Modifier
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(Color.White.copy(alpha = 0.1f))
                                .testTag("settings_button")
                        ) {
                            Icon(
                                imageVector = Icons.Default.Tune,
                                contentDescription = "Settings",
                                tint = Color.White,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                    }
                }
            }
        ) { innerPadding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
            ) {
                if (uiState.isLoading && uiState.weather == null) {
                    // Initial Loading Screen
                    Column(
                        modifier = Modifier.fillMaxSize(),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        CircularProgressIndicator(
                            color = Marigold,
                            modifier = Modifier.size(48.dp)
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Text(
                            text = if (uiState.isBengali) "আবহাওয়ার তথ্য লোড হচ্ছে..." else "Fetching Bangladesh Weather...",
                            style = MaterialTheme.typography.bodyMedium.copy(color = Mist)
                        )
                    }
                } else {
                    val weather = uiState.weather
                    if (weather != null) {
                        LazyColumn(
                            modifier = Modifier
                                .fillMaxSize()
                                .padding(horizontal = 16.dp),
                            verticalArrangement = Arrangement.spacedBy(16.dp),
                            contentPadding = PaddingValues(top = 4.dp, bottom = 48.dp)
                        ) {
                            // Saved Locations / Quick City Switcher Bar
                            item {
                                SavedLocationsBar(
                                    savedLocations = savedLocations,
                                    selectedLat = uiState.currentLat,
                                    selectedLon = uiState.currentLon,
                                    isBengali = uiState.isBengali,
                                    onSelectGps = {
                                        coroutineScope.launch {
                                            val loc = LocationHelper.getCurrentLocation(context)
                                            if (loc != null) {
                                                viewModel.updateGpsLocation(loc.latitude, loc.longitude)
                                            } else {
                                                locationPermissionLauncher.launch(
                                                    arrayOf(
                                                        Manifest.permission.ACCESS_FINE_LOCATION,
                                                        Manifest.permission.ACCESS_COARSE_LOCATION
                                                    )
                                                )
                                            }
                                        }
                                    },
                                    onSelectLocation = { loc ->
                                        viewModel.loadWeather(loc.latitude, loc.longitude)
                                    },
                                    onAddLocationClick = { showSearchSheet = true }
                                )
                            }

                            // BMD Severe Weather Alert (if active)
                            item {
                                SevereWeatherAlertBanner(
                                    alert = weather.bmdAlert,
                                    isBengali = uiState.isBengali,
                                    onEditBulletin = { showBmdEditorDialog = true }
                                )
                            }

                            // Hero Weather Card (Monsoon Teal glassmorphic, Administrative hierarchy, Bengali season)
                            item {
                                HeroWeatherCard(
                                    weather = weather,
                                    isBengali = uiState.isBengali,
                                    useFahrenheit = uiState.useFahrenheit,
                                    useBengaliDigits = uiState.useBengaliDigits,
                                    onRefresh = { viewModel.refreshWeather() }
                                )
                            }

                            // Optional Prayer Times Widget (toggleable, default off as requested)
                            if (uiState.showPrayerTimes) {
                                item {
                                    PrayerTimesCard(
                                        prayerTimes = weather.prayerTimes,
                                        isBengali = uiState.isBengali,
                                        onDismiss = { viewModel.togglePrayerTimes(false) }
                                    )
                                }
                            }

                            // Air Quality Card (US AQI, PM2.5/PM10, plain-language health note)
                            item {
                                AirQualityCard(
                                    aqi = weather.aqi,
                                    isBengali = uiState.isBengali,
                                    useBengaliDigits = uiState.useBengaliDigits
                                )
                            }

                            // Monsoon Rainfall Tracker & River Basin Flood Risk
                            item {
                                MonsoonAndFloodCard(
                                    monsoon = weather.monsoon,
                                    flood = weather.floodRisk,
                                    isBengali = uiState.isBengali,
                                    useBengaliDigits = uiState.useBengaliDigits
                                )
                            }

                            // 48-Hour Hourly Forecast
                            item {
                                HourlyForecastRow(
                                    hourly = weather.hourly,
                                    isBengali = uiState.isBengali,
                                    useFahrenheit = uiState.useFahrenheit,
                                    useBengaliDigits = uiState.useBengaliDigits
                                )
                            }

                            // 10-Day Daily Extended Forecast with Bengali Calendar Dates
                            item {
                                TenDayForecastCard(
                                    daily = weather.daily,
                                    isBengali = uiState.isBengali,
                                    useFahrenheit = uiState.useFahrenheit,
                                    useBengaliDigits = uiState.useBengaliDigits
                                )
                            }

                            // Detailed Metrics Grid (Wind, Direction, Barometer, Sun, Dew Point)
                            item {
                                WeatherDetailsGrid(
                                    weather = weather,
                                    isBengali = uiState.isBengali,
                                    useFahrenheit = uiState.useFahrenheit,
                                    useBengaliDigits = uiState.useBengaliDigits
                                )
                            }

                            // Bottom Credits & Attribution
                            item {
                                Column(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(vertical = 12.dp),
                                    horizontalAlignment = Alignment.CenterHorizontally
                                ) {
                                    Text(
                                        text = if (uiState.isBengali) "বেঙ্গল স্কাই • বাংলার আবহাওয়া মানচিত্র" else "Bengal Sky • Bangladesh Weather Intelligence",
                                        style = MaterialTheme.typography.labelMedium.copy(
                                            color = Mist.copy(alpha = 0.6f),
                                            fontWeight = FontWeight.Medium
                                        )
                                    )
                                    Spacer(modifier = Modifier.height(4.dp))
                                    Text(
                                        text = if (uiState.isBengali) "তথ্যসূত্র: বাংলাদেশ আবহাওয়া অধিদপ্তর (BMD) ও ওপেন-মেটিও" else "Data Sources: BMD & Open-Meteo Weather APIs",
                                        style = MaterialTheme.typography.labelSmall.copy(
                                            color = Mist.copy(alpha = 0.4f),
                                            fontSize = 11.sp
                                        )
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Location Search Bottom Sheet
    if (showSearchSheet) {
        LocationSearchSheet(
            isBengali = uiState.isBengali,
            onSelectLocation = { nameEn, nameBn, lat, lon ->
                viewModel.loadWeather(lat, lon)
                viewModel.saveLocation(nameEn, nameBn, lat, lon)
                showSearchSheet = false
            },
            onDismiss = { showSearchSheet = false }
        )
    }

    // Settings Dialog
    if (showSettingsDialog) {
        AppSettingsDialog(
            isBengali = uiState.isBengali,
            onToggleLanguage = { viewModel.toggleLanguage(it) },
            useFahrenheit = uiState.useFahrenheit,
            onToggleFahrenheit = { viewModel.toggleFahrenheit(it) },
            useBengaliDigits = uiState.useBengaliDigits,
            onToggleBengaliDigits = { viewModel.toggleBengaliDigits(it) },
            showPrayerTimes = uiState.showPrayerTimes,
            onTogglePrayerTimes = { viewModel.togglePrayerTimes(it) },
            isDarkMode = uiState.isDarkMode,
            onToggleDarkMode = { viewModel.toggleDarkMode(it) },
            onDismiss = { showSettingsDialog = false }
        )
    }

    // BMD Alert Editor Dialog
    if (showBmdEditorDialog && uiState.weather != null) {
        BmdBulletinEditorDialog(
            currentAlert = uiState.weather!!.bmdAlert,
            isBengali = uiState.isBengali,
            onSaveAlert = { updatedAlert ->
                viewModel.setAdminBmdAlert(updatedAlert)
            },
            onDismiss = { showBmdEditorDialog = false }
        )
    }
}
