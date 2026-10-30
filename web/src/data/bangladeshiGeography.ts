export interface Division {
  nameEn: string;
  nameBn: string;
}

export interface District {
  nameEn: string;
  nameBn: string;
  divisionEn: string;
  divisionBn: string;
  latitude: number;
  longitude: number;
  isRiverAdjacent: boolean;
  isCoastal: boolean;
}

export interface Upazila {
  nameEn: string;
  nameBn: string;
  districtEn: string;
  latitude: number;
  longitude: number;
}

export interface ResolvedLocation {
  upazilaEn: string;
  upazilaBn: string;
  districtEn: string;
  districtBn: string;
  divisionEn: string;
  divisionBn: string;
  latitude: number;
  longitude: number;
  isRiverAdjacent: boolean;
  isCoastal: boolean;
  displayNameEn: string;
  displayNameBn: string;
  shortNameEn: string;
  shortNameBn: string;
}

export const DIVISIONS: Division[] = [
  { nameEn: "Dhaka", nameBn: "ঢাকা" },
  { nameEn: "Chattogram", nameBn: "চট্টগ্রাম" },
  { nameEn: "Rajshahi", nameBn: "রাজশাহী" },
  { nameEn: "Khulna", nameBn: "খুলনা" },
  { nameEn: "Barishal", nameBn: "বরিশাল" },
  { nameEn: "Sylhet", nameBn: "সিলেট" },
  { nameEn: "Rangpur", nameBn: "রংপুর" },
  { nameEn: "Mymensingh", nameBn: "ময়মনসিংহ" },
];

export const DISTRICTS: District[] = [
  // Dhaka
  { nameEn: "Dhaka", nameBn: "ঢাকা", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.8103, longitude: 90.4125, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Gazipur", nameBn: "গাজীপুর", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 24.0023, longitude: 90.4264, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Narayanganj", nameBn: "নারায়ণগঞ্জ", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.6238, longitude: 90.5000, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Tangail", nameBn: "টাঙ্গাইল", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 24.2513, longitude: 89.9167, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Kishoreganj", nameBn: "কিশোরগঞ্জ", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 24.4449, longitude: 90.7766, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Manikganj", nameBn: "মানিকগঞ্জ", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.8644, longitude: 90.0047, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Munshiganj", nameBn: "মুন্সীগঞ্জ", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.5422, longitude: 90.5305, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Narsingdi", nameBn: "নরসিংদী", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.9197, longitude: 90.7203, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Faridpur", nameBn: "ফরিদপুর", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.6071, longitude: 89.8429, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Gopalganj", nameBn: "গোপালগঞ্জ", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.0051, longitude: 89.8266, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Madaripur", nameBn: "মাদারীপুর", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.1641, longitude: 90.1897, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Rajbari", nameBn: "রাজবাড়ী", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.7574, longitude: 89.6445, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Shariatpur", nameBn: "শরীয়তপুর", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.2423, longitude: 90.4348, isRiverAdjacent: true, isCoastal: false },

  // Chattogram
  { nameEn: "Chattogram", nameBn: "চট্টগ্রাম", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 22.3569, longitude: 91.7832, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Cox's Bazar", nameBn: "কক্সবাজার", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 21.4272, longitude: 92.0058, isRiverAdjacent: false, isCoastal: true },
  { nameEn: "Cumilla", nameBn: "কুমিল্লা", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 23.4682, longitude: 91.1788, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Feni", nameBn: "ফেনী", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 23.0187, longitude: 91.3966, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Brahmanbaria", nameBn: "ব্রাহ্মণবাড়িয়া", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 23.9571, longitude: 91.1119, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Rangamati", nameBn: "রাঙ্গামাটি", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 22.7324, longitude: 92.2985, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Noakhali", nameBn: "নোয়াখালী", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 22.8696, longitude: 91.0993, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Chandpur", nameBn: "চাঁদপুর", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 23.2333, longitude: 90.6667, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Lakshmipur", nameBn: "লক্ষ্মীপুর", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 22.9425, longitude: 90.8412, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Khagrachhari", nameBn: "খাগড়াছড়ি", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 23.1193, longitude: 91.9847, isRiverAdjacent: false, isCoastal: false },
  { nameEn: "Bandarban", nameBn: "বান্দরবান", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 22.1953, longitude: 92.2184, isRiverAdjacent: true, isCoastal: false },

  // Rajshahi
  { nameEn: "Rajshahi", nameBn: "রাজশাহী", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.3745, longitude: 88.6042, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Bogura", nameBn: "বগুড়া", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.8465, longitude: 89.3778, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Pabna", nameBn: "পাবনা", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.0064, longitude: 89.2372, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Sirajganj", nameBn: "সিরাজগঞ্জ", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.4534, longitude: 89.7008, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Naogaon", nameBn: "নওগাঁ", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.7936, longitude: 88.9318, isRiverAdjacent: false, isCoastal: false },
  { nameEn: "Natore", nameBn: "নাটোর", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.4206, longitude: 88.9324, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Joypurhat", nameBn: "জয়পুরহাট", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 25.1015, longitude: 89.0277, isRiverAdjacent: false, isCoastal: false },
  { nameEn: "Chapainawabganj", nameBn: "চাঁপাইনবাবগঞ্জ", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.5965, longitude: 88.2775, isRiverAdjacent: true, isCoastal: false },

  // Khulna
  { nameEn: "Khulna", nameBn: "খুলনা", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 22.8456, longitude: 89.5403, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Jashore", nameBn: "যশোর", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.1664, longitude: 89.2081, isRiverAdjacent: false, isCoastal: false },
  { nameEn: "Satkhira", nameBn: "সাতক্ষীরা", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 22.7185, longitude: 89.0705, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Bagerhat", nameBn: "বাগেরহাট", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 22.6516, longitude: 89.7859, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Kushtia", nameBn: "কুষ্টিয়া", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.9013, longitude: 89.1205, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Jhenaidah", nameBn: "ঝিনাইদহ", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.5448, longitude: 89.1539, isRiverAdjacent: false, isCoastal: false },
  { nameEn: "Chuadanga", nameBn: "চুয়াডাঙ্গা", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.6402, longitude: 88.8418, isRiverAdjacent: false, isCoastal: false },
  { nameEn: "Meherpur", nameBn: "মেহেরপুর", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.7622, longitude: 88.6318, isRiverAdjacent: false, isCoastal: false },
  { nameEn: "Magura", nameBn: "মাগুরা", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.4873, longitude: 89.4199, isRiverAdjacent: false, isCoastal: false },
  { nameEn: "Narail", nameBn: "নড়াইল", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.1725, longitude: 89.5127, isRiverAdjacent: true, isCoastal: false },

  // Barishal
  { nameEn: "Barishal", nameBn: "বরিশাল", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.7010, longitude: 90.3535, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Patuakhali", nameBn: "পটুয়াখালী", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.3596, longitude: 90.3299, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Bhola", nameBn: "ভোলা", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.6859, longitude: 90.6482, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Pirojpur", nameBn: "পিরোজপুর", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.5841, longitude: 89.9720, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Barguna", nameBn: "বরগুনা", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.0953, longitude: 90.1121, isRiverAdjacent: true, isCoastal: true },
  { nameEn: "Jhalokathi", nameBn: "ঝালকাঠি", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.6406, longitude: 90.1987, isRiverAdjacent: true, isCoastal: true },

  // Sylhet
  { nameEn: "Sylhet", nameBn: "সিলেট", divisionEn: "Sylhet", divisionBn: "সিলেট", latitude: 24.8949, longitude: 91.8687, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Moulvibazar", nameBn: "মৌলভীবাজার", divisionEn: "Sylhet", divisionBn: "সিলেট", latitude: 24.4829, longitude: 91.7774, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Habiganj", nameBn: "হবিগঞ্জ", divisionEn: "Sylhet", divisionBn: "সিলেট", latitude: 24.3749, longitude: 91.4155, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Sunamganj", nameBn: "সুনামগঞ্জ", divisionEn: "Sylhet", divisionBn: "সিলেট", latitude: 25.0658, longitude: 91.3950, isRiverAdjacent: true, isCoastal: false },

  // Rangpur
  { nameEn: "Rangpur", nameBn: "রংপুর", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.7439, longitude: 89.2752, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Dinajpur", nameBn: "দিনাজপুর", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.6217, longitude: 88.6355, isRiverAdjacent: false, isCoastal: false },
  { nameEn: "Gaibandha", nameBn: "গাইবান্ধা", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.3288, longitude: 89.5406, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Kurigram", nameBn: "কুড়িগ্রাম", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.8054, longitude: 89.6362, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Lalmonirhat", nameBn: "লালমনিরহাট", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.9923, longitude: 89.2847, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Nilphamari", nameBn: "নীলফামারী", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.9318, longitude: 88.8560, isRiverAdjacent: false, isCoastal: false },
  { nameEn: "Panchagarh", nameBn: "পঞ্চগড়", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 26.3411, longitude: 88.5542, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Thakurgaon", nameBn: "ঠাকুরগাঁও", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 26.0337, longitude: 88.4617, isRiverAdjacent: false, isCoastal: false },

  // Mymensingh
  { nameEn: "Mymensingh", nameBn: "ময়মনসিংহ", divisionEn: "Mymensingh", divisionBn: "ময়মনসিংহ", latitude: 24.7471, longitude: 90.4203, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Jamalpur", nameBn: "জামালপুর", divisionEn: "Mymensingh", divisionBn: "ময়মনসিংহ", latitude: 24.9375, longitude: 89.9378, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Netrokona", nameBn: "নেত্রকোণা", divisionEn: "Mymensingh", divisionBn: "ময়মনসিংহ", latitude: 24.8709, longitude: 90.7279, isRiverAdjacent: true, isCoastal: false },
  { nameEn: "Sherpur", nameBn: "শেরপুর", divisionEn: "Mymensingh", divisionBn: "ময়মনসিংহ", latitude: 25.0205, longitude: 90.0153, isRiverAdjacent: true, isCoastal: false }
];

import { ALL_UPAZILAS } from "./bangladeshUpazilasData";

export const UPAZILAS: Upazila[] = ALL_UPAZILAS;


function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function resolveCoordinates(latitude: number, longitude: number): ResolvedLocation {
  let closestUpazila: Upazila | null = null;
  let minUpazilaDist = Infinity;

  for (const u of UPAZILAS) {
    const dist = haversine(latitude, longitude, u.latitude, u.longitude);
    if (dist < minUpazilaDist) {
      minUpazilaDist = dist;
      closestUpazila = u;
    }
  }

  let closestDistrict = DISTRICTS[0];
  let minDistrictDist = Infinity;

  if (closestUpazila && minUpazilaDist < 40) {
    const matchedDistrict = DISTRICTS.find((d) => d.nameEn.toLowerCase() === closestUpazila!.districtEn.toLowerCase());
    if (matchedDistrict) {
      closestDistrict = matchedDistrict;
    }
  } else {
    for (const d of DISTRICTS) {
      const dist = haversine(latitude, longitude, d.latitude, d.longitude);
      if (dist < minDistrictDist) {
        minDistrictDist = dist;
        closestDistrict = d;
      }
    }
  }

  const division = DIVISIONS.find((div) => div.nameEn === closestDistrict.divisionEn) || {
    nameEn: closestDistrict.divisionEn,
    nameBn: closestDistrict.divisionBn,
  };

  const upazilaEn = closestUpazila && minUpazilaDist < 40 ? closestUpazila.nameEn : `${closestDistrict.nameEn} Sadar`;
  const upazilaBn = closestUpazila && minUpazilaDist < 40 ? closestUpazila.nameBn : `${closestDistrict.nameBn} সদর`;

  return {
    upazilaEn,
    upazilaBn,
    districtEn: closestDistrict.nameEn,
    districtBn: closestDistrict.nameBn,
    divisionEn: division.nameEn,
    divisionBn: division.nameBn,
    latitude,
    longitude,
    isRiverAdjacent: closestDistrict.isRiverAdjacent,
    isCoastal: closestDistrict.isCoastal,
    displayNameEn: `${upazilaEn}, ${closestDistrict.nameEn}, ${division.nameEn} Division`,
    displayNameBn: `${upazilaBn}, ${closestDistrict.nameBn}, ${division.nameBn} বিভাগ`,
    shortNameEn: `${upazilaEn}, ${closestDistrict.nameEn}`,
    shortNameBn: `${upazilaBn}, ${closestDistrict.nameBn}`,
  };
}
