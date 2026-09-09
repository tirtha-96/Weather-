package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.data.model.BangladeshGeoData
import com.example.data.model.District
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LocationSearchSheet(
    isBengali: Boolean,
    onSelectLocation: (nameEn: String, nameBn: String, lat: Double, lon: Double) -> Unit,
    onDismiss: () -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedDivision by remember { mutableStateOf<String?>(null) }

    val allDistricts = remember { BangladeshGeoData.districts }
    val allUpazilas = remember { BangladeshGeoData.upazilas }
    val divisions = remember { BangladeshGeoData.divisions }

    val filteredDistricts = remember(searchQuery, selectedDivision) {
        val q = searchQuery.trim().lowercase()
        allDistricts.filter { d ->
            val matchDivision = selectedDivision == null || d.divisionEn == selectedDivision
            val matchQuery = q.isEmpty() ||
                    d.nameEn.lowercase().contains(q) ||
                    d.nameBn.contains(q) ||
                    d.divisionEn.lowercase().contains(q) ||
                    d.divisionBn.contains(q)
            matchDivision && matchQuery
        }
    }

    val filteredUpazilas = remember(searchQuery) {
        val q = searchQuery.trim().lowercase()
        if (q.length >= 2) {
            allUpazilas.filter { u ->
                u.nameEn.lowercase().contains(q) || u.nameBn.contains(q)
            }
        } else emptyList()
    }

    ModalBottomSheet(
        onDismissRequest = onDismiss,
        containerColor = DeepIndigo,
        tonalElevation = 8.dp,
        modifier = Modifier.testTag("location_search_sheet")
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 10.dp)
                .fillMaxHeight(0.85f)
        ) {
            // Title & Close Row
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = if (isBengali) "স্থান অনুসন্ধান (৬৪ জেলা ও বিভাগ)" else "Search Location (64 Districts)",
                    style = MaterialTheme.typography.titleLarge.copy(
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                )
                IconButton(onClick = onDismiss) {
                    Icon(
                        imageVector = Icons.Default.Close,
                        contentDescription = "Close",
                        tint = Color.White
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Search Bar
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                placeholder = {
                    Text(
                        text = if (isBengali) "জেলা বা উপজেলার নাম লিখুন..." else "Type district or upazila name...",
                        color = Mist.copy(alpha = 0.5f)
                    )
                },
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Search,
                        contentDescription = "Search",
                        tint = Marigold
                    )
                },
                trailingIcon = {
                    if (searchQuery.isNotEmpty()) {
                        IconButton(onClick = { searchQuery = "" }) {
                            Icon(
                                imageVector = Icons.Default.Close,
                                contentDescription = "Clear",
                                tint = Mist.copy(alpha = 0.7f)
                            )
                        }
                    }
                },
                singleLine = true,
                shape = RoundedCornerShape(16.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = Marigold,
                    unfocusedBorderColor = Color.White.copy(alpha = 0.2f),
                    focusedContainerColor = Color.White.copy(alpha = 0.05f),
                    unfocusedContainerColor = Color.White.copy(alpha = 0.05f),
                    focusedTextColor = Color.White,
                    unfocusedTextColor = Color.White
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("location_search_input")
            )

            Spacer(modifier = Modifier.height(14.dp))

            // Division Filter Chips
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                item {
                    FilterChip(
                        selected = selectedDivision == null,
                        onClick = { selectedDivision = null },
                        label = { Text(if (isBengali) "সব বিভাগ" else "All Divisions") },
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = Marigold,
                            selectedLabelColor = DeepIndigo,
                            containerColor = Color.White.copy(alpha = 0.08f),
                            labelColor = Mist
                        )
                    )
                }
                items(divisions) { div ->
                    FilterChip(
                        selected = selectedDivision == div.nameEn,
                        onClick = {
                            selectedDivision = if (selectedDivision == div.nameEn) null else div.nameEn
                        },
                        label = { Text(if (isBengali) div.nameBn else div.nameEn) },
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = Marigold,
                            selectedLabelColor = DeepIndigo,
                            containerColor = Color.White.copy(alpha = 0.08f),
                            labelColor = Mist
                        )
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Results List
            LazyColumn(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                if (filteredUpazilas.isNotEmpty()) {
                    item {
                        Text(
                            text = if (isBengali) "উপজেলা / থানা" else "Upazilas / Thanas",
                            style = MaterialTheme.typography.labelMedium.copy(
                                color = Marigold,
                                fontWeight = FontWeight.Bold
                            ),
                            modifier = Modifier.padding(vertical = 4.dp)
                        )
                    }
                    items(filteredUpazilas) { upazila ->
                        Surface(
                            shape = RoundedCornerShape(14.dp),
                            color = Color.White.copy(alpha = 0.06f),
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable {
                                    onSelectLocation(upazila.nameEn, upazila.nameBn, upazila.latitude, upazila.longitude)
                                }
                        ) {
                            Row(
                                modifier = Modifier.padding(14.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(
                                    imageVector = Icons.Default.LocationOn,
                                    contentDescription = null,
                                    tint = PaddyGreenLight,
                                    modifier = Modifier.size(18.dp)
                                )
                                Spacer(modifier = Modifier.width(12.dp))
                                Column {
                                    Text(
                                        text = if (isBengali) upazila.nameBn else upazila.nameEn,
                                        style = MaterialTheme.typography.bodyMedium.copy(
                                            fontWeight = FontWeight.Bold,
                                            color = Color.White
                                        )
                                    )
                                    Text(
                                        text = "${upazila.districtEn} District",
                                        style = MaterialTheme.typography.labelSmall.copy(
                                            color = Mist.copy(alpha = 0.6f)
                                        )
                                    )
                                }
                            }
                        }
                    }
                }

                item {
                    Text(
                        text = if (isBengali) "জেলাসমূহ (${filteredDistricts.size})" else "Districts (${filteredDistricts.size})",
                        style = MaterialTheme.typography.labelMedium.copy(
                            color = Marigold,
                            fontWeight = FontWeight.Bold
                        ),
                        modifier = Modifier.padding(vertical = 4.dp)
                    )
                }

                items(filteredDistricts) { district ->
                    Surface(
                        shape = RoundedCornerShape(14.dp),
                        color = Color.White.copy(alpha = 0.05f),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable {
                                onSelectLocation(district.nameEn, district.nameBn, district.latitude, district.longitude)
                            }
                    ) {
                        Row(
                            modifier = Modifier.padding(14.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Default.LocationOn,
                                    contentDescription = null,
                                    tint = Marigold,
                                    modifier = Modifier.size(18.dp)
                                )
                                Spacer(modifier = Modifier.width(12.dp))
                                Column {
                                    Text(
                                        text = if (isBengali) district.nameBn else district.nameEn,
                                        style = MaterialTheme.typography.bodyLarge.copy(
                                            fontWeight = FontWeight.Bold,
                                            color = Color.White
                                        )
                                    )
                                    Text(
                                        text = if (isBengali) "${district.divisionBn} বিভাগ" else "${district.divisionEn} Division",
                                        style = MaterialTheme.typography.labelSmall.copy(
                                            color = Mist.copy(alpha = 0.65f)
                                        )
                                    )
                                }
                            }

                            if (district.isCoastal) {
                                Surface(
                                    shape = RoundedCornerShape(6.dp),
                                    color = Color(0xFF64B5F6).copy(alpha = 0.2f)
                                ) {
                                    Text(
                                        text = if (isBengali) "উপকূলীয়" else "Coastal",
                                        style = MaterialTheme.typography.labelSmall.copy(
                                            color = Color(0xFF90CAF9)
                                        ),
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
