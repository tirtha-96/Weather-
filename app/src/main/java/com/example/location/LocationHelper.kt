package com.example.location

import android.annotation.SuppressLint
import android.content.Context
import android.location.Location
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.google.android.gms.tasks.CancellationTokenSource
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlin.coroutines.resume

object LocationHelper {

    @SuppressLint("MissingPermission")
    suspend fun getCurrentLocation(context: Context): Location? {
        return try {
            val fusedLocationClient = LocationServices.getFusedLocationProviderClient(context)
            val cts = CancellationTokenSource()

            suspendCancellableCoroutine { continuation ->
                fusedLocationClient.getCurrentLocation(
                    Priority.PRIORITY_HIGH_ACCURACY,
                    cts.token
                ).addOnSuccessListener { location ->
                    continuation.resume(location)
                }.addOnFailureListener {
                    continuation.resume(null)
                }

                continuation.invokeOnCancellation {
                    cts.cancel()
                }
            }
        } catch (e: Exception) {
            null
        }
    }
}
