package com.example.ui

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.BangladeshGeoData
import com.example.data.model.BengaliCalendarHelper
import com.example.data.model.ConditionType
import com.example.ui.components.*
import com.example.ui.theme.*
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
    var selectedDivisionFilter by remember { mutableStateOf<String?>(null) }
    var searchQuery by remember { mutableStateOf("") }

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
                            onSelectGps = {
                                viewModel.refreshWeather()
                            },
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

                    // Weather Details Grid (AQI, Wind, Humidity, Pressure, UV)
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
            }
        }
    }

    // 64 Districts Search Modal
    if (showSearchDialog) {
        AlertDialog(
            onDismissRequest = { showSearchDialog = false },
            title = {
                Column {
                    Text(
                        text = if (uiState.isBengali) "জেলা বা উপজেলা নির্বাচন করুন" else "Select District / Upazila",
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = searchQuery,
                        onValueChange = { searchQuery = it },
                        placeholder = { Text(if (uiState.isBengali) "খুঁজুন (যেমন: ঢাকা, বগুড়া, কক্সবাজার)" else "Search (e.g. Dhaka, Bogura, Cox)") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true,
                        leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) }
                    )
                }
            },
            text = {
                Column(modifier = Modifier.heightIn(max = 380.dp)) {
                    // Division filter chips
                    LazyRow(
                        horizontalArrangement = Arrangement.spacedBy(6.dp),
                        modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp)
                    ) {
                        item {
                            FilterChip(
                                selected = selectedDivisionFilter == null,
                                onClick = { selectedDivisionFilter = null },
                                label = { Text(if (uiState.isBengali) "সব বিভাগ" else "All") }
                            )
                        }
                        items(BangladeshGeoData.divisions) { div ->
                            FilterChip(
                                selected = selectedDivisionFilter == div.nameEn,
                                onClick = { selectedDivisionFilter = div.nameEn },
                                label = { Text(if (uiState.isBengali) div.nameBn else div.nameEn) }
                            )
                        }
                    }

                    val filteredDistricts = BangladeshGeoData.districts.filter { d ->
                        (selectedDivisionFilter == null || d.divisionEn == selectedDivisionFilter) &&
                                (searchQuery.isBlank() ||
                                        d.nameEn.contains(searchQuery, ignoreCase = true) ||
                                        d.nameBn.contains(searchQuery))
                    }

                    LazyColumn(
                        modifier = Modifier.fillMaxWidth(),
                        verticalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        items(filteredDistricts) { district ->
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = Color.White.copy(alpha = 0.05f),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable {
                                        viewModel.loadWeather(district.latitude, district.longitude)
                                        showSearchDialog = false
                                    }
                            ) {
                                Row(
                                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 10.dp),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Column {
                                        Text(
                                            text = if (uiState.isBengali) district.nameBn else district.nameEn,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 15.sp,
                                            color = Color.White
                                        )
                                        Text(
                                            text = if (uiState.isBengali) "${district.divisionBn} বিভাগ" else "${district.divisionEn} Division",
                                            fontSize = 12.sp,
                                            color = Mist
                                        )
                                    }
                                    if (district.isCoastal) {
                                        Box(
                                            modifier = Modifier
                                                .clip(RoundedCornerShape(4.dp))
                                                .background(Color(0xFF0284C7).copy(alpha = 0.3f))
                                                .padding(horizontal = 6.dp, vertical = 2.dp)
                                        ) {
                                            Text(
                                                text = if (uiState.isBengali) "উপকূলীয়" else "Coastal",
                                                color = Color(0xFF7DD3FC),
                                                fontSize = 10.sp
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { showSearchDialog = false }) {
                    Text(if (uiState.isBengali) "বাতিল" else "Cancel")
                }
            }
        )
    }

    // Settings Bottom Sheet
    if (showSettingsSheet) {
        ModalBottomSheet(
            onDismissRequest = { showSettingsSheet = false }
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text(
                    text = if (uiState.isBengali) "সেটিংস ও পছন্দসমূহ" else "Settings & Preferences",
                    fontWeight = FontWeight.Bold,
                    fontSize = 20.sp
                )

                // Language switch
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = if (uiState.isBengali) "ভাষা (Language)" else "Language", fontWeight = FontWeight.SemiBold)
                        Text(text = if (uiState.isBengali) "বাংলায় তথ্য প্রদর্শন" else "Switch between Bangla & English", color = Mist, fontSize = 12.sp)
                    }
                    Switch(
                        checked = uiState.isBengali,
                        onCheckedChange = { viewModel.toggleLanguage() }
                    )
                }

                // Temp unit switch
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = if (uiState.isBengali) "ফারেনহাইট (°F) একক" else "Fahrenheit (°F) Unit", fontWeight = FontWeight.SemiBold)
                        Text(text = if (uiState.isBengali) "ডিফল্ট সেলসিয়াস (°C)" else "Default is Celsius (°C)", color = Mist, fontSize = 12.sp)
                    }
                    Switch(
                        checked = uiState.useFahrenheit,
                        onCheckedChange = { viewModel.toggleFahrenheit() }
                    )
                }

                // Bengali numerals
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = if (uiState.isBengali) "বাংলা সংখ্যা (১২৩৪৫)" else "Bengali Digits", fontWeight = FontWeight.SemiBold)
                        Text(text = if (uiState.isBengali) "সংখ্যার জন্য বাংলা রূপান্তর" else "Display numbers in Bengali script", color = Mist, fontSize = 12.sp)
                    }
                    Switch(
                        checked = uiState.useBengaliDigits,
                        onCheckedChange = { viewModel.toggleBengaliDigits() }
                    )
                }

                // Prayer times widget toggle
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = if (uiState.isBengali) "নামাজের সময়সূচি উইজেট" else "Prayer Times Widget", fontWeight = FontWeight.SemiBold)
                        Text(text = if (uiState.isBengali) "হোম স্ক্রিনে নামাজের ওয়াক্ত দেখুন" else "Show Islamic prayer times on home card", color = Mist, fontSize = 12.sp)
                    }
                    Switch(
                        checked = uiState.showPrayerTimes,
                        onCheckedChange = { viewModel.togglePrayerTimes() }
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))
            }
        }
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
