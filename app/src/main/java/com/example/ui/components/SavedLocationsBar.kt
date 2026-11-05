package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.filled.MyLocation
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.data.local.SavedLocationEntity
import com.example.ui.theme.*

@Composable
fun SavedLocationsBar(
    savedLocations: List<SavedLocationEntity>,
    selectedLat: Double,
    selectedLon: Double,
    isBengali: Boolean,
    onSelectGps: () -> Unit,
    onSelectLocation: (SavedLocationEntity) -> Unit,
    onAddLocationClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    LazyRow(
        modifier = modifier
            .fillMaxWidth()
            .testTag("saved_locations_bar"),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        contentPadding = PaddingValues(horizontal = 4.dp)
    ) {
        // Current GPS location chip
        item {
            Surface(
                shape = RoundedCornerShape(16.dp),
                color = if (savedLocations.none { Math.abs(it.latitude - selectedLat) < 0.05 && Math.abs(it.longitude - selectedLon) < 0.05 })
                    Marigold.copy(alpha = 0.25f)
                else Color.White.copy(alpha = 0.08f),
                border = androidx.compose.foundation.BorderStroke(
                    1.dp,
                    if (savedLocations.none { Math.abs(it.latitude - selectedLat) < 0.05 && Math.abs(it.longitude - selectedLon) < 0.05 })
                        Marigold
                    else Color.White.copy(alpha = 0.12f)
                ),
                modifier = Modifier.clickable { onSelectGps() }
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.MyLocation,
                        contentDescription = "Current GPS",
                        tint = Marigold,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = if (isBengali) "বর্তমান জিপিএস" else "Live GPS",
                        style = MaterialTheme.typography.labelMedium.copy(
                            fontWeight = FontWeight.SemiBold,
                            color = Color.White
                        )
                    )
                }
            }
        }

        // Saved locations chips
        items(savedLocations) { loc ->
            val isSelected = Math.abs(loc.latitude - selectedLat) < 0.05 && Math.abs(loc.longitude - selectedLon) < 0.05
            Surface(
                shape = RoundedCornerShape(16.dp),
                color = if (isSelected) PaddyGreen.copy(alpha = 0.4f) else Color.White.copy(alpha = 0.07f),
                border = androidx.compose.foundation.BorderStroke(
                    1.dp,
                    if (isSelected) PaddyGreenLight else Color.White.copy(alpha = 0.1f)
                ),
                modifier = Modifier.clickable { onSelectLocation(loc) }
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Bookmark,
                        contentDescription = null,
                        tint = if (isSelected) Marigold else Mist.copy(alpha = 0.6f),
                        modifier = Modifier.size(14.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = if (isBengali) loc.nameBn else loc.nameEn,
                        style = MaterialTheme.typography.labelMedium.copy(
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                            color = if (isSelected) Color.White else Mist.copy(alpha = 0.85f)
                        )
                    )
                }
            }
        }

        // Add / Search chip
        item {
            Surface(
                shape = RoundedCornerShape(16.dp),
                color = Color.White.copy(alpha = 0.06f),
                border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.15f)),
                modifier = Modifier.clickable { onAddLocationClick() }
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Add,
                        contentDescription = "Add Location",
                        tint = Color.White,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = if (isBengali) "জেলা যোগ" else "Add City",
                        style = MaterialTheme.typography.labelMedium.copy(
                            fontWeight = FontWeight.Medium,
                            color = Color.White
                        )
                    )
                }
            }
        }
    }
}
