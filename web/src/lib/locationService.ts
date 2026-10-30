import { LocationMeta } from "@/types/weather";
import { DISTRICTS, UPAZILAS, District, Upazila } from "@/data/bangladeshiGeography";

export interface GeolocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
}

/**
 * Calculates Great-Circle distance between two coordinates in kilometers (Haversine formula)
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Finds the nearest Bangladeshi district for given coordinates
 */
export function findNearestDistrict(lat: number, lon: number): { district: District; distanceKm: number } {
  let closest = DISTRICTS[0];
  let minDistance = calculateDistanceKm(lat, lon, closest.latitude, closest.longitude);

  for (const d of DISTRICTS) {
    const dist = calculateDistanceKm(lat, lon, d.latitude, d.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closest = d;
    }
  }

  return { district: closest, distanceKm: Math.round(minDistance * 10) / 10 };
}

/**
 * Finds the nearest Bangladeshi Upazila for given coordinates
 */
export function findNearestUpazila(lat: number, lon: number): { upazila: Upazila; distanceKm: number } | null {
  if (UPAZILAS.length === 0) return null;
  let closest = UPAZILAS[0];
  let minDistance = calculateDistanceKm(lat, lon, closest.latitude, closest.longitude);

  for (const u of UPAZILAS) {
    const dist = calculateDistanceKm(lat, lon, u.latitude, u.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closest = u;
    }
  }

  return { upazila: closest, distanceKm: Math.round(minDistance * 10) / 10 };
}

/**
 * Reverse-geocodes coordinates using BigDataCloud reverse geocode client API
 * with graceful fallback to local geography database
 */
export async function reverseGeocode(
  lat: number,
  lon: number,
  accuracyMeters?: number
): Promise<LocationMeta> {
  const nearestD = findNearestDistrict(lat, lon);
  const nearestU = findNearestUpazila(lat, lon);

  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      { signal: AbortSignal.timeout(4000) }
    );

    if (res.ok) {
      const data = await res.json();
      const locality = data.locality || data.city || data.principalSubdivision || "";
      const districtName = data.localityInfo?.administrative?.find(
        (a: any) => a.adminLevel === 6 || a.adminLevel === 5 || a.description?.toLowerCase().includes("district")
      )?.name || nearestD.district.nameEn;

      const divisionName = data.principalSubdivision || nearestD.district.divisionEn;

      return {
        latitude: lat,
        longitude: lon,
        accuracyMeters: accuracyMeters ? Math.round(accuracyMeters) : undefined,
        nameEn: locality ? `${locality}, ${districtName}` : `${nearestD.district.nameEn}`,
        nameBn: nearestD.district.nameBn,
        locality: locality || nearestD.district.nameEn,
        upazilaEn: nearestU?.upazila?.nameEn,
        upazilaBn: nearestU?.upazila?.nameBn,
        districtEn: districtName,
        districtBn: nearestD.district.nameBn,
        divisionEn: divisionName,
        divisionBn: nearestD.district.divisionBn,
        country: data.countryName || "Bangladesh",
        type: accuracyMeters ? "gps" : "searched",
      };
    }
  } catch {
    // network or timeout fallback
  }

  // Fallback to local high-precision Bangladeshi Geography database
  const upazilaText = nearestU && nearestU.distanceKm < 15 ? `${nearestU.upazila.nameEn}, ` : "";
  const upazilaTextBn = nearestU && nearestU.distanceKm < 15 ? `${nearestU.upazila.nameBn}, ` : "";

  return {
    latitude: lat,
    longitude: lon,
    accuracyMeters: accuracyMeters ? Math.round(accuracyMeters) : undefined,
    nameEn: `${upazilaText}${nearestD.district.nameEn}`,
    nameBn: `${upazilaTextBn}${nearestD.district.nameBn}`,
    locality: nearestU?.upazila?.nameEn || nearestD.district.nameEn,
    upazilaEn: nearestU?.upazila?.nameEn,
    upazilaBn: nearestU?.upazila?.nameBn,
    districtEn: nearestD.district.nameEn,
    districtBn: nearestD.district.nameBn,
    divisionEn: nearestD.district.divisionEn,
    divisionBn: nearestD.district.divisionBn,
    country: "Bangladesh",
    type: accuracyMeters ? "gps" : "fallback",
  };
}

/**
 * Prompts user for real device GPS location with high accuracy
 */
export function requestDeviceLocation(): Promise<GeolocationResult> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser environment."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        let msg = "Could not retrieve GPS location.";
        switch (err.code) {
          case err.PERMISSION_DENIED:
            msg = "Location permission denied. Using fallback location.";
            break;
          case err.POSITION_UNAVAILABLE:
            msg = "GPS location unavailable on this device.";
            break;
          case err.TIMEOUT:
            msg = "Location request timed out. Retrying or using last known.";
            break;
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}
