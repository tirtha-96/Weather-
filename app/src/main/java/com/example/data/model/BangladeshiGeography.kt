package com.example.data.model

import kotlin.math.atan2
import kotlin.math.cos
import kotlin.math.sin
import kotlin.math.sqrt

data class Upazila(
    val nameEn: String,
    val nameBn: String,
    val districtEn: String,
    val latitude: Double,
    val longitude: Double
)

data class District(
    val nameEn: String,
    val nameBn: String,
    val divisionEn: String,
    val divisionBn: String,
    val latitude: Double,
    val longitude: Double,
    val isRiverAdjacent: Boolean = false,
    val isCoastal: Boolean = false
)

data class Division(
    val nameEn: String,
    val nameBn: String
)

data class ResolvedLocation(
    val upazilaEn: String,
    val upazilaBn: String,
    val districtEn: String,
    val districtBn: String,
    val divisionEn: String,
    val divisionBn: String,
    val latitude: Double,
    val longitude: Double,
    val isRiverAdjacent: Boolean,
    val isCoastal: Boolean
) {
    fun getDisplayName(isBengali: Boolean): String {
        return if (isBengali) {
            "$upazilaBn, $districtBn, $divisionBn বিভাগ"
        } else {
            "$upazilaEn, $districtEn, $divisionEn Division"
        }
    }

    fun getShortName(isBengali: Boolean): String {
        return if (isBengali) {
            "$upazilaBn, $districtBn"
        } else {
            "$upazilaEn, $districtEn"
        }
    }
}

object BangladeshGeoData {
    val divisions = listOf(
        Division("Dhaka", "ঢাকা"),
        Division("Chattogram", "চট্টগ্রাম"),
        Division("Rajshahi", "রাজশাহী"),
        Division("Khulna", "খুলনা"),
        Division("Barishal", "বরিশাল"),
        Division("Sylhet", "সিলেট"),
        Division("Rangpur", "রংপুর"),
        Division("Mymensingh", "ময়মনসিংহ")
    )

    val districts = listOf(
        // Dhaka Division
        District("Dhaka", "ঢাকা", "Dhaka", "ঢাকা", 23.8103, 90.4125, isRiverAdjacent = true, isCoastal = false),
        District("Gazipur", "গাজীপুর", "Dhaka", "ঢাকা", 24.0023, 90.4264, isRiverAdjacent = true, isCoastal = false),
        District("Narayanganj", "নারায়ণগঞ্জ", "Dhaka", "ঢাকা", 23.6238, 90.5000, isRiverAdjacent = true, isCoastal = false),
        District("Tangail", "টাঙ্গাইল", "Dhaka", "ঢাকা", 24.2513, 89.9167, isRiverAdjacent = true, isCoastal = false),
        District("Kishoreganj", "কিশোরগঞ্জ", "Dhaka", "ঢাকা", 24.4449, 90.7766, isRiverAdjacent = true, isCoastal = false),
        District("Manikganj", "মানিকগঞ্জ", "Dhaka", "ঢাকা", 23.8644, 90.0047, isRiverAdjacent = true, isCoastal = false),
        District("Munshiganj", "মুন্সীগঞ্জ", "Dhaka", "ঢাকা", 23.5422, 90.5305, isRiverAdjacent = true, isCoastal = false),
        District("Narsingdi", "নরসিংদী", "Dhaka", "ঢাকা", 23.9197, 90.7203, isRiverAdjacent = true, isCoastal = false),
        District("Faridpur", "ফরিদপুর", "Dhaka", "ঢাকা", 23.6071, 89.8429, isRiverAdjacent = true, isCoastal = false),
        District("Gopalganj", "গোপালগঞ্জ", "Dhaka", "ঢাকা", 23.0051, 89.8266, isRiverAdjacent = true, isCoastal = false),
        District("Madaripur", "মাদারীপুর", "Dhaka", "ঢাকা", 23.1641, 90.1897, isRiverAdjacent = true, isCoastal = false),
        District("Rajbari", "রাজবাড়ী", "Dhaka", "ঢাকা", 23.7574, 89.6445, isRiverAdjacent = true, isCoastal = false),
        District("Shariatpur", "শরীয়তপুর", "Dhaka", "ঢাকা", 23.2423, 90.4348, isRiverAdjacent = true, isCoastal = false),

        // Chattogram Division
        District("Chattogram", "চট্টগ্রাম", "Chattogram", "চট্টগ্রাম", 22.3569, 91.7832, isRiverAdjacent = true, isCoastal = true),
        District("Cox's Bazar", "কক্সবাজার", "Chattogram", "চট্টগ্রাম", 21.4272, 92.0058, isRiverAdjacent = false, isCoastal = true),
        District("Cumilla", "কুমিল্লা", "Chattogram", "চট্টগ্রাম", 23.4682, 91.1788, isRiverAdjacent = true, isCoastal = false),
        District("Feni", "ফেনী", "Chattogram", "চট্টগ্রাম", 23.0187, 91.3966, isRiverAdjacent = true, isCoastal = true),
        District("Brahmanbaria", "ব্রাহ্মণবাড়িয়া", "Chattogram", "চট্টগ্রাম", 23.9571, 91.1119, isRiverAdjacent = true, isCoastal = false),
        District("Rangamati", "রাঙ্গামাটি", "Chattogram", "চট্টগ্রাম", 22.7324, 92.2985, isRiverAdjacent = true, isCoastal = false),
        District("Noakhali", "নোয়াখালী", "Chattogram", "চট্টগ্রাম", 22.8696, 91.0993, isRiverAdjacent = true, isCoastal = true),
        District("Chandpur", "চাঁদপুর", "Chattogram", "চট্টগ্রাম", 23.2333, 90.6667, isRiverAdjacent = true, isCoastal = true),
        District("Lakshmipur", "লক্ষ্মীপুর", "Chattogram", "চট্টগ্রাম", 22.9425, 90.8412, isRiverAdjacent = true, isCoastal = true),
        District("Khagrachhari", "খাগড়াছড়ি", "Chattogram", "চট্টগ্রাম", 23.1193, 91.9847, isRiverAdjacent = false, isCoastal = false),
        District("Bandarban", "বান্দরবান", "Chattogram", "চট্টগ্রাম", 22.1953, 92.2184, isRiverAdjacent = true, isCoastal = false),

        // Rajshahi Division
        District("Rajshahi", "রাজশাহী", "Rajshahi", "রাজশাহী", 24.3745, 88.6042, isRiverAdjacent = true, isCoastal = false),
        District("Bogura", "বগুড়া", "Rajshahi", "রাজশাহী", 24.8465, 89.3778, isRiverAdjacent = true, isCoastal = false),
        District("Pabna", "পাবনা", "Rajshahi", "রাজশাহী", 24.0064, 89.2372, isRiverAdjacent = true, isCoastal = false),
        District("Sirajganj", "সিরাজগঞ্জ", "Rajshahi", "রাজশাহী", 24.4534, 89.7008, isRiverAdjacent = true, isCoastal = false),
        District("Naogaon", "নওগাঁ", "Rajshahi", "রাজশাহী", 24.7936, 88.9318, isRiverAdjacent = false, isCoastal = false),
        District("Natore", "নাটোর", "Rajshahi", "রাজশাহী", 24.4206, 88.9324, isRiverAdjacent = true, isCoastal = false),
        District("Joypurhat", "জয়পুরহাট", "Rajshahi", "রাজশাহী", 25.1015, 89.0277, isRiverAdjacent = false, isCoastal = false),
        District("Chapainawabganj", "চাঁপাইনবাবগঞ্জ", "Rajshahi", "রাজশাহী", 24.5965, 88.2775, isRiverAdjacent = true, isCoastal = false),

        // Khulna Division
        District("Khulna", "খুলনা", "Khulna", "খুলনা", 22.8456, 89.5403, isRiverAdjacent = true, isCoastal = true),
        District("Jashore", "যশোর", "Khulna", "খুলনা", 23.1664, 89.2081, isRiverAdjacent = false, isCoastal = false),
        District("Satkhira", "সাতক্ষীরা", "Khulna", "খুলনা", 22.7185, 89.0705, isRiverAdjacent = true, isCoastal = true),
        District("Bagerhat", "বাগেরহাট", "Khulna", "খুলনা", 22.6516, 89.7859, isRiverAdjacent = true, isCoastal = true),
        District("Kushtia", "কুষ্টিয়া", "Khulna", "খুলনা", 23.9013, 89.1205, isRiverAdjacent = true, isCoastal = false),
        District("Jhenaidah", "ঝিনাইদহ", "Khulna", "খুলনা", 23.5448, 89.1539, isRiverAdjacent = false, isCoastal = false),
        District("Chuadanga", "চুয়াডাঙ্গা", "Khulna", "খুলনা", 23.6402, 88.8418, isRiverAdjacent = false, isCoastal = false),
        District("Meherpur", "মেহেরপুর", "Khulna", "খুলনা", 23.7622, 88.6318, isRiverAdjacent = false, isCoastal = false),
        District("Magura", "মাগুরা", "Khulna", "খুলনা", 23.4873, 89.4199, isRiverAdjacent = false, isCoastal = false),
        District("Narail", "নড়াইল", "Khulna", "খুলনা", 23.1725, 89.5127, isRiverAdjacent = true, isCoastal = false),

        // Barishal Division
        District("Barishal", "বরিশাল", "Barishal", "বরিশাল", 22.7010, 90.3535, isRiverAdjacent = true, isCoastal = true),
        District("Patuakhali", "পটুয়াখালী", "Barishal", "বরিশাল", 22.3596, 90.3299, isRiverAdjacent = true, isCoastal = true),
        District("Bhola", "ভোলা", "Barishal", "বরিশাল", 22.6859, 90.6482, isRiverAdjacent = true, isCoastal = true),
        District("Pirojpur", "পিরোজপুর", "Barishal", "বরিশাল", 22.5841, 89.9720, isRiverAdjacent = true, isCoastal = true),
        District("Barguna", "বরগুনা", "Barishal", "বরিশাল", 22.0953, 90.1121, isRiverAdjacent = true, isCoastal = true),
        District("Jhalokathi", "ঝালকাঠি", "Barishal", "বরিশাল", 22.6406, 90.1987, isRiverAdjacent = true, isCoastal = true),

        // Sylhet Division
        District("Sylhet", "সিলেট", "Sylhet", "সিলেট", 24.8949, 91.8687, isRiverAdjacent = true, isCoastal = false),
        District("Moulvibazar", "মৌলভীবাজার", "Sylhet", "সিলেট", 24.4829, 91.7774, isRiverAdjacent = true, isCoastal = false),
        District("Habiganj", "হবিগঞ্জ", "Sylhet", "সিলেট", 24.3749, 91.4155, isRiverAdjacent = true, isCoastal = false),
        District("Sunamganj", "সুনামগঞ্জ", "Sylhet", "সিলেট", 25.0658, 91.3950, isRiverAdjacent = true, isCoastal = false),

        // Rangpur Division
        District("Rangpur", "রংপুর", "Rangpur", "রংপুর", 25.7439, 89.2752, isRiverAdjacent = true, isCoastal = false),
        District("Dinajpur", "দিনাজপুর", "Rangpur", "রংপুর", 25.6217, 88.6355, isRiverAdjacent = false, isCoastal = false),
        District("Gaibandha", "গাইবান্ধা", "Rangpur", "রংপুর", 25.3288, 89.5406, isRiverAdjacent = true, isCoastal = false),
        District("Kurigram", "কুড়িগ্রাম", "Rangpur", "রংপুর", 25.8054, 89.6362, isRiverAdjacent = true, isCoastal = false),
        District("Lalmonirhat", "লালমনিরহাট", "Rangpur", "রংপুর", 25.9923, 89.2847, isRiverAdjacent = true, isCoastal = false),
        District("Nilphamari", "নীলফামারী", "Rangpur", "রংপুর", 25.9318, 88.8560, isRiverAdjacent = false, isCoastal = false),
        District("Panchagarh", "পঞ্চগড়", "Rangpur", "রংপুর", 26.3411, 88.5542, isRiverAdjacent = true, isCoastal = false),
        District("Thakurgaon", "ঠাকুরগাঁও", "Rangpur", "রংপুর", 26.0337, 88.4617, isRiverAdjacent = false, isCoastal = false),

        // Mymensingh Division
        District("Mymensingh", "ময়মনসিংহ", "Mymensingh", "ময়মনসিংহ", 24.7471, 90.4203, isRiverAdjacent = true, isCoastal = false),
        District("Jamalpur", "জামালপুর", "Mymensingh", "ময়মনসিংহ", 24.9375, 89.9378, isRiverAdjacent = true, isCoastal = false),
        District("Netrokona", "নেত্রকোণা", "Mymensingh", "ময়মনসিংহ", 24.8709, 90.7279, isRiverAdjacent = true, isCoastal = false),
        District("Sherpur", "শেরপুর", "Mymensingh", "ময়মনসিংহ", 25.0205, 90.0153, isRiverAdjacent = true, isCoastal = false)
    )

    val upazilas = listOf(
        // Dhaka Metro & Upazilas
        Upazila("Mirpur", "মিরপুর", "Dhaka", 23.8041, 90.3667),
        Upazila("Gulshan", "গুলশান", "Dhaka", 23.7925, 90.4078),
        Upazila("Dhanmondi", "ধানমন্ডি", "Dhaka", 23.7461, 90.3742),
        Upazila("Uttara", "উত্তরা", "Dhaka", 23.8759, 90.3795),
        Upazila("Mohammadpur", "মোহাম্মদপুর", "Dhaka", 23.7542, 90.3588),
        Upazila("Motijheel", "মতিঝিল", "Dhaka", 23.7330, 90.4172),
        Upazila("Savar", "সাভার", "Dhaka", 23.8583, 90.2667),
        Upazila("Keraniganj", "কেরানীগঞ্জ", "Dhaka", 23.6833, 90.3167),
        Upazila("Dhamrai", "ধামরাই", "Dhaka", 23.9167, 90.2167),
        Upazila("Tongi", "টঙ্গী", "Gazipur", 23.8969, 90.4025),
        Upazila("Gazipur Sadar", "গাজীপুর সদর", "Gazipur", 24.0023, 90.4264),
        Upazila("Sreepur", "শ্রীপুর", "Gazipur", 24.2000, 90.4667),
        Upazila("Sonargaon", "সোনারগাঁও", "Narayanganj", 23.6500, 90.6000),
        Upazila("Fatullah", "ফতুল্লা", "Narayanganj", 23.6333, 90.4833),

        // Chattogram
        Upazila("Panchlaish", "পাঁচলাইশ", "Chattogram", 22.3683, 91.8236),
        Upazila("Kotwali", "কোতোয়ালী", "Chattogram", 22.3384, 91.8317),
        Upazila("Halishahar", "হালিশহর", "Chattogram", 22.3167, 91.7833),
        Upazila("Sitakunda", "সীতাকুণ্ড", "Chattogram", 22.6167, 91.6667),
        Upazila("Hathazari", "হাটহাজারী", "Chattogram", 22.5000, 91.8000),
        Upazila("Cox's Bazar Sadar", "কক্সবাজার সদর", "Cox's Bazar", 21.4272, 92.0058),
        Upazila("Teknaf", "টেকনাফ", "Cox's Bazar", 20.8667, 92.3000),
        Upazila("Ramu", "রামু", "Cox's Bazar", 21.4333, 92.1000),
        Upazila("Saint Martin", "সেন্টমার্টিন", "Cox's Bazar", 20.6272, 92.3225),

        // Sylhet
        Upazila("Sylhet Sadar", "সিলেট সদর", "Sylhet", 24.8949, 91.8687),
        Upazila("Golapganj", "গোলাপগঞ্জ", "Sylhet", 24.8667, 92.0167),
        Upazila("Beanibazar", "বিয়ানীবাজার", "Sylhet", 24.8333, 92.1667),
        Upazila("Sreemangal", "শ্রীমঙ্গল", "Moulvibazar", 24.3065, 91.7297),
        Upazila("Sunamganj Sadar", "সুনামগঞ্জ সদর", "Sunamganj", 25.0658, 91.3950),
        Upazila("Tahirpur", "তাহিরপুর", "Sunamganj", 25.1000, 91.1833),

        // Rajshahi
        Upazila("Boalia", "বোয়ালিয়া", "Rajshahi", 24.3667, 88.6000),
        Upazila("Paba", "পবা", "Rajshahi", 24.4333, 88.6167),
        Upazila("Bogura Sadar", "বগুড়া সদর", "Bogura", 24.8465, 89.3778),
        Upazila("Sherpur Bogura", "শেরপুর বগুড়া", "Bogura", 24.6667, 89.4167),

        // Khulna & Barishal
        Upazila("Khulna Sadar", "খুলনা সদর", "Khulna", 22.8167, 89.5667),
        Upazila("Mongla", "মোংলা", "Bagerhat", 22.4833, 89.6000),
        Upazila("Sundarbans", "সুন্দরবন", "Khulna", 21.9497, 89.1833),
        Upazila("Barishal Sadar", "বরিশাল সদর", "Barishal", 22.7010, 90.3535),
        Upazila("Kuakata", "কুয়াকাটা", "Patuakhali", 21.8167, 90.1167)
    )

    fun resolveCoordinates(latitude: Double, longitude: Double): ResolvedLocation {
        // Find closest upazila
        var closestUpazila: Upazila? = null
        var minUpazilaDist = Double.MAX_VALUE

        for (u in upazilas) {
            val dist = calculateDistance(latitude, longitude, u.latitude, u.longitude)
            if (dist < minUpazilaDist) {
                minUpazilaDist = dist
                closestUpazila = u
            }
        }

        // Find closest district
        var closestDistrict: District = districts[0]
        var minDistrictDist = Double.MAX_VALUE

        for (d in districts) {
            val dist = calculateDistance(latitude, longitude, d.latitude, d.longitude)
            if (dist < minDistrictDist) {
                minDistrictDist = dist
                closestDistrict = d
            }
        }

        val division = divisions.find { it.nameEn == closestDistrict.divisionEn }
            ?: Division(closestDistrict.divisionEn, closestDistrict.divisionBn)

        // If closest upazila belongs to the same district or is very close (< 25 km)
        val upazilaEn: String
        val upazilaBn: String
        if (closestUpazila != null && (closestUpazila.districtEn == closestDistrict.nameEn || minUpazilaDist < 25.0)) {
            upazilaEn = closestUpazila.nameEn
            upazilaBn = closestUpazila.nameBn
        } else {
            upazilaEn = "${closestDistrict.nameEn} Sadar"
            upazilaBn = "${closestDistrict.nameBn} সদর"
        }

        return ResolvedLocation(
            upazilaEn = upazilaEn,
            upazilaBn = upazilaBn,
            districtEn = closestDistrict.nameEn,
            districtBn = closestDistrict.nameBn,
            divisionEn = division.nameEn,
            divisionBn = division.nameBn,
            latitude = latitude,
            longitude = longitude,
            isRiverAdjacent = closestDistrict.isRiverAdjacent,
            isCoastal = closestDistrict.isCoastal
        )
    }

    private fun calculateDistance(lat1: Double, lon1: Double, lat2: Double, lon2: Double): Double {
        val r = 6371.0 // Earth's radius in km
        val dLat = Math.toRadians(lat2 - lat1)
        val dLon = Math.toRadians(lon2 - lon1)
        val a = sin(dLat / 2) * sin(dLat / 2) +
                cos(Math.toRadians(lat1)) * cos(Math.toRadians(lat2)) *
                sin(dLon / 2) * sin(dLon / 2)
        val c = 2 * atan2(sqrt(a), sqrt(1 - a))
        return r * c
    }
}
