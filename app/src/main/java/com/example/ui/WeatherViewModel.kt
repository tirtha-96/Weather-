package com.example.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.local.SavedLocationEntity
import com.example.data.model.BangladeshGeoData
import com.example.data.model.BmdAlert
import com.example.data.model.CompleteWeather
import com.example.data.repository.WeatherRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

data class WeatherUiState(
    val isLoading: Boolean = true,
    val weather: CompleteWeather? = null,
    val errorMessage: String? = null,
    val isBengali: Boolean = true,
    val useFahrenheit: Boolean = false,
    val useBengaliDigits: Boolean = true,
    val showPrayerTimes: Boolean = false,
    val isDarkMode: Boolean = true,
    val currentLat: Double = 23.8041,
    val currentLon: Double = 90.3667
)

class WeatherViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = WeatherRepository(application)

    private val _uiState = MutableStateFlow(WeatherUiState())
    val uiState: StateFlow<WeatherUiState> = _uiState.asStateFlow()

    val savedLocations: StateFlow<List<SavedLocationEntity>> = repository.savedLocations
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private var customBmdAlert: BmdAlert? = null

    init {
        viewModelScope.launch {
            // Seed initial locations if needed
            repository.seedInitialLocationsIfEmpty()
        }
        loadWeather(_uiState.value.currentLat, _uiState.value.currentLon)
    }

    fun loadWeather(lat: Double, lon: Double) {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, errorMessage = null, currentLat = lat, currentLon = lon) }
            try {
                val data = repository.fetchWeather(lat, lon, customBmdAlert)
                _uiState.update {
                    it.copy(
                        isLoading = false,
                        weather = data,
                        errorMessage = null
                    )
                }
            } catch (e: Exception) {
                _uiState.update {
                    it.copy(
                        isLoading = false,
                        errorMessage = e.localizedMessage ?: "Failed to fetch weather data"
                    )
                }
            }
        }
    }

    fun refreshWeather() {
        val curLat = _uiState.value.currentLat
        val curLon = _uiState.value.currentLon
        loadWeather(curLat, curLon)
    }

    fun updateGpsLocation(lat: Double, lon: Double) {
        loadWeather(lat, lon)
    }

    fun saveLocation(nameEn: String, nameBn: String, lat: Double, lon: Double, tag: String = "Custom") {
        viewModelScope.launch {
            val resolved = BangladeshGeoData.resolveCoordinates(lat, lon)
            val entity = SavedLocationEntity(
                nameEn = nameEn,
                nameBn = nameBn,
                districtEn = resolved.districtEn,
                districtBn = resolved.districtBn,
                divisionEn = resolved.divisionEn,
                divisionBn = resolved.divisionBn,
                latitude = lat,
                longitude = lon,
                tag = tag,
                isCurrent = false
            )
            repository.saveLocation(entity)
        }
    }

    fun deleteLocation(id: Int) {
        viewModelScope.launch {
            repository.deleteLocation(id)
        }
    }

    fun setAdminBmdAlert(alert: BmdAlert) {
        customBmdAlert = alert
        _uiState.value.weather?.let { current ->
            _uiState.update {
                it.copy(weather = current.copy(bmdAlert = alert))
            }
        }
    }

    fun toggleLanguage(isBn: Boolean) {
        _uiState.update { it.copy(isBengali = isBn) }
    }

    fun toggleFahrenheit(useF: Boolean) {
        _uiState.update { it.copy(useFahrenheit = useF) }
    }

    fun toggleBengaliDigits(useDigits: Boolean) {
        _uiState.update { it.copy(useBengaliDigits = useDigits) }
    }

    fun togglePrayerTimes(show: Boolean) {
        _uiState.update { it.copy(showPrayerTimes = show) }
    }

    fun toggleDarkMode(isDark: Boolean) {
        _uiState.update { it.copy(isDarkMode = isDark) }
    }
}
