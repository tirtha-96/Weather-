package com.example.ui

import android.Manifest
import android.content.pm.PackageManager
import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
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
import com.example.data.model.BengaliCalendarHelper
import com.example.data.model.ConditionType
import com.example.location.LocationHelper
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch
import kotlin.math.roundToInt

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun WeatherScreen(
    viewModel: WeatherViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsState()
    val savedLocations by viewModel.savedLocations.collectAsState()

    var showSearchDialog by remember { mutableStateOf(false) }
    var showSettingsSheet by remember { mutableStateOf(false) }
    // --- Live GPS -------------------------------------------------------------------------
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var isLocating by remember { mutableStateOf(false) }

    fun hasLocationPermission(): Boolean =
        ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED ||
            ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED

    fun fetchGpsWeather() {
        if (isLocating) return
        isLocating = true
        scope.launch {
            val location = LocationHelper.getCurrentLocation(context)
            isLocating = false
            if (location != null) {
                viewModel.updateGpsLocation(location.latitude, location.longitude)
            } else {
                Toast.makeText(
                    context,
                    if (uiState.isBengali) "জিপিএস অবস্থান পাওয়া যায়নি। লোকেশন চালু আছে কিনা দেখুন।" else "Couldn't get a GPS fix. Check that Location is turned on.",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    val locationPermissionLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { grants ->
        if (grants.values.any { it }) {
            fetchGpsWeather()
        } else {
            Toast.makeText(
                context,
                if (uiState.isBengali) "লোকেশন অনুমতি দেওয়া হয়নি — জেলা খুঁজে নির্বাচন করুন।" else "Location permission denied — search for a district instead.",
                Toast.LENGTH_SHORT
            ).show()
        }
    }

    fun requestGpsWeather() {
        if (hasLocationPermission()) {
            fetchGpsWeather()
        } else {
            locationPermissionLauncher.launch(
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION)
            )
        }
    }

    // On first launch, use the device location if permission was already granted.
    var triedInitialGps by rememberSaveable { mutableStateOf(false) }
    LaunchedEffect(Unit) {
        if (!triedInitialGps) {
            triedInitialGps = true
            if (hasLocationPermission()) fetchGpsWeather()
        }
    }

    val weather = uiState.weather
    val conditionType = weather?.current?.condition?.conditionType ?: ConditionType.PARTLY_CLOUDY
    val isDay = weather?.current?.isDay ?: true

    DynamicSkyBackground(
        conditionType = conditionType,
        isDarkTheme = uiState.isDarkMode,
        modifier = modifier
    ) {
        Scaffold(
            containerColor = Color.Transparent,
            topBar = {
                TopAppBar(
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = Color.Transparent,
                        titleContentColor = Color.White
                    ),
                    title = {
                        Column(
                            modifier = Modifier
                                .clickable { showSearchDialog = true }
                                .testTag("location_picker_button")
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Default.LocationOn,
                                    contentDescription = "Location",
                                    tint = SignalRedLight,
                                    modifier = Modifier.size(18.dp)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = weather?.location?.getShortName(uiState.isBengali) ?: (if (uiState.isBengali) "ঢাকা" else "Dhaka"),
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )
                                Icon(
                                    imageVector = Icons.Default.KeyboardArrowDown,
                                    contentDescription = "Select District",
                                    tint = Mist,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                            Text(
                                text = weather?.location?.divisionBn?.let { if (uiState.isBengali) "$it বিভাগ" else "${weather.location.divisionEn} Division" } ?: "",
                                fontSize = 12.sp,
                                color = Mist
                            )
                        }
                    },
                    actions = {
                        IconButton(
                            onClick = { showSearchDialog = true },
                            modifier = Modifier.testTag("search_district_btn")
                        ) {
                            Icon(
                                imageVector = Icons.Default.Search,
                                contentDescription = "Search Bangladesh Districts",
                                tint = Color.White
                            )
                        }
                        IconButton(
                            onClick = { viewModel.refreshWeather() },
                            modifier = Modifier.testTag("refresh_weather_btn")
                        ) {
                            Icon(
                                imageVector = Icons.Default.Refresh,
                                contentDescription = "Refresh Weather",
                                tint = Color.White
                            )
                        }
                        IconButton(
                            onClick = { showSettingsSheet = true },
                            modifier = Modifier.testTag("settings_btn")
                        ) {
                            Icon(
                                imageVector = Icons.Default.Settings,
                                contentDescription = "Settings",
                                tint = Color.White
                            )
                        }
                    }
                )
            }
        ) { paddingValues ->
            if (uiState.isLoading && weather == null) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(paddingValues),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        CircularProgressIndicator(color = PaddyGreenLight)
                        Spacer(modifier = Modifier.height(14.dp))
                        Text(
                            text = if (uiState.isBengali) "আবহাওয়ার তথ্য লোড হচ্ছে..." else "Loading Bangladesh Weather...",
                            color = Color.White,
                            fontSize = 15.sp
                        )
                    }
                }
            } else if (weather != null) {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(paddingValues)
                        .padding(horizontal = 16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // Refresh / location change in progress
                    if (uiState.isLoading || isLocating) {
                        item {
                            LinearProgressIndicator(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(2.dp)),
                                color = PaddyGreenLight,
                                trackColor = Color.White.copy(alpha = 0.1f)
                            )
                        }
                    }

                    // Severe Weather Alert Banner (BMD Signal)
                    if (weather.bmdAlert.isActive) {
                        item {
                            SevereWeatherAlertBanner(
                                alert = weather.bmdAlert,
                                isBengali = uiState.isBengali
                            )
                        }
                    }

                    // Hero Current Weather Card
                    item {
                        HeroWeatherSection(
                            weather = weather,
                            isBengali = uiState.isBengali,
                            useFahrenheit = uiState.useFahrenheit,
                            useBengaliDigits = uiState.useBengaliDigits
                        )
                    }

                    // BMD Alert Zones Map Component
                    item {
                        BmdAlertMapCard(
                            isBengali = uiState.isBengali,
                            useBengaliDigits = uiState.useBengaliDigits,
                            onSelectDivisionLocation = { lat, lon, nameEn, nameBn ->
                                viewModel.loadWeather(lat, lon)
                            }
                        )
                    }

                    // Saved Locations quick row
                    item {
                        SavedLocationsBar(
                            savedLocations = savedLocations,
                            selectedLat = uiState.currentLat,
                            selectedLon = uiState.currentLon,
                            isBengali = uiState.isBengali,
                            onSelectGps = { requestGpsWeather() },
                            onSelectLocation = { loc ->
                                viewModel.loadWeather(loc.latitude, loc.longitude)
                            },
                            onAddLocationClick = {
                                showSearchDialog = true
                            }
                        )
                    }

                    // 48-Hour Forecast Row
                    if (weather.hourly.isNotEmpty()) {
                        item {
                            HourlyForecastRow(
                                hourly = weather.hourly,
                                isBengali = uiState.isBengali,
                                useFahrenheit = uiState.useFahrenheit,
                                useBengaliDigits = uiState.useBengaliDigits
                            )
                        }
                    }

                    // 10-Day Bengali Academy Forecast Card
                    if (weather.daily.isNotEmpty()) {
                        item {
                            TenDayForecastCard(
                                daily = weather.daily,
                                isBengali = uiState.isBengali,
                                useFahrenheit = uiState.useFahrenheit,
                                useBengaliDigits = uiState.useBengaliDigits
                            )
                        }
                    }

                    // Monsoon Accumulated Rainfall & River Basin Flood Risk Card
                    item {
                        MonsoonAndFloodCard(
                            monsoon = weather.monsoon,
                            flood = weather.floodRisk,
                            isBengali = uiState.isBengali,
                            useBengaliDigits = uiState.useBengaliDigits
                        )
                    }

                    // Prayer Times Widget (if enabled or always accessible)
                    if (uiState.showPrayerTimes) {
                        item {
                            PrayerTimesCard(
                                prayerTimes = weather.prayerTimes,
                                isBengali = uiState.isBengali,
                                onDismiss = { viewModel.togglePrayerTimes() }
                            )
                        }
                    }

                    // Air Quality (US AQI, PM2.5, PM10)
                    item {
                        AirQualityCard(
                            aqi = weather.aqi,
                            isBengali = uiState.isBengali,
                            useBengaliDigits = uiState.useBengaliDigits
                        )
                    }

                    // Weather Details Grid (Wind, Pressure, Sunrise/Sunset, Dew Point)
                    item {
                        WeatherDetailsGrid(
                            weather = weather,
                            isBengali = uiState.isBengali,
                            useFahrenheit = uiState.useFahrenheit,
                            useBengaliDigits = uiState.useBengaliDigits
                        )
                    }

                    item {
                        Spacer(modifier = Modifier.height(24.dp))
                    }
                }
            } else {
                // Loading finished without any data (shouldn't normally happen because the
                // repository falls back to cache / local estimates, but never show a blank screen).
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(paddingValues)
                        .padding(24.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(Icons.Default.CloudOff, contentDescription = null, tint = Mist, modifier = Modifier.size(48.dp))
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = uiState.errorMessage
                                ?: if (uiState.isBengali) "আবহাওয়ার তথ্য লোড করা যায়নি" else "Couldn't load weather data",
                            color = Color.White,
                            fontSize = 15.sp
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Button(onClick = { viewModel.refreshWeather() }) {
                            Text(if (uiState.isBengali) "আবার চেষ্টা করুন" else "Try again")
                        }
                    }
                }
            }
        }
    }

    // Location search (64 districts + upazilas)
    if (showSearchDialog) {
        LocationSearchSheet(
            isBengali = uiState.isBengali,
            onSelectLocation = { _, _, lat, lon ->
                viewModel.loadWeather(lat, lon)
                showSearchDialog = false
            },
            onDismiss = { showSearchDialog = false }
        )
    }

    // Settings
    if (showSettingsSheet) {
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
            onDismiss = { showSettingsSheet = false }
        )
    }
}

@Composable
private fun HeroWeatherSection(
    weather: com.example.data.model.CompleteWeather,
    isBengali: Boolean,
    useFahrenheit: Boolean,
    useBengaliDigits: Boolean
) {
    val current = weather.current
    val rawTemp = if (useFahrenheit) (current.temperature * 9 / 5) + 32 else current.temperature
    val rawAppTemp = if (useFahrenheit) (current.apparentTemperature * 9 / 5) + 32 else current.apparentTemperature
    val tempUnit = if (useFahrenheit) "°F" else "°C"

    val tempStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(rawTemp.roundToInt()) else "${rawTemp.roundToInt()}"
    val appTempStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(rawAppTemp.roundToInt()) else "${rawAppTemp.roundToInt()}"

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 12.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Bengali Academy Date Banner
        Box(
            modifier = Modifier
                .clip(RoundedCornerShape(20.dp))
                .background(Color.White.copy(alpha = 0.10f))
                .padding(horizontal = 14.dp, vertical = 6.dp)
        ) {
            Text(
                text = if (isBengali) weather.bengaliDate.fullFormattedBn else weather.bengaliDate.fullFormattedEn,
                color = MarigoldLight,
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        if (weather.isFromCache) {
            Spacer(modifier = Modifier.height(8.dp))
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(12.dp))
                    .background(Marigold.copy(alpha = 0.2f))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(
                    text = if (isBengali) "অফলাইন — সংরক্ষিত/আনুমানিক তথ্য" else "Offline — showing cached / estimated data",
                    color = Marigold,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Center Illustration
        AnimatedWeatherIllustration(
            conditionType = current.condition.conditionType,
            isDay = current.isDay,
            size = 110.dp
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Temperature Big Number
        Row(
            verticalAlignment = Alignment.Top,
            horizontalArrangement = Arrangement.Center
        ) {
            Text(
                text = tempStr,
                fontSize = 72.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color.White
            )
            Text(
                text = tempUnit,
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = MarigoldLight,
                modifier = Modifier.padding(top = 10.dp)
            )
        }

        // Weather Condition Description
        Text(
            text = if (isBengali) current.condition.descriptionBn else current.condition.descriptionEn,
            fontSize = 20.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color.White
        )

        Spacer(modifier = Modifier.height(4.dp))

        // Feels like & High/Low
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Text(
                text = if (isBengali) "অনুভূত হচ্ছে $appTempStr$tempUnit" else "Feels like $appTempStr$tempUnit",
                color = Mist,
                fontSize = 13.sp
            )
            val today = weather.daily.firstOrNull()
            if (today != null) {
                val maxT = if (useFahrenheit) (today.tempMax * 9 / 5) + 32 else today.tempMax
                val minT = if (useFahrenheit) (today.tempMin * 9 / 5) + 32 else today.tempMin
                val maxStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(maxT.roundToInt()) else "${maxT.roundToInt()}"
                val minStr = if (useBengaliDigits) BengaliCalendarHelper.toBengaliDigits(minT.roundToInt()) else "${minT.roundToInt()}"
                Text(
                    text = "• ↑$maxStr° ↓$minStr°",
                    color = Mist,
                    fontSize = 13.sp
                )
            }
        }
    }
}
