export interface District {
  nameEn: string;
  nameBn: string;
  divisionEn: string;
  divisionBn: string;
  latitude: number;
  longitude: number;
  isCoastal: boolean;
  isRiverAdjacent: boolean;
}

export interface Division {
  nameEn: string;
  nameBn: string;
  headquarters: string;
}

export interface Upazila {
  nameEn: string;
  nameBn: string;
  districtEn: string;
  latitude: number;
  longitude: number;
}

export const DIVISIONS: Division[] = [
  { nameEn: "Dhaka", nameBn: "ঢাকা", headquarters: "Dhaka" },
  { nameEn: "Chattogram", nameBn: "চট্টগ্রাম", headquarters: "Chattogram" },
  { nameEn: "Rajshahi", nameBn: "রাজশাহী", headquarters: "Rajshahi" },
  { nameEn: "Khulna", nameBn: "খুলনা", headquarters: "Khulna" },
  { nameEn: "Barishal", nameBn: "বরিশাল", headquarters: "Barishal" },
  { nameEn: "Sylhet", nameBn: "সিলেট", headquarters: "Sylhet" },
  { nameEn: "Rangpur", nameBn: "রংপুর", headquarters: "Rangpur" },
  { nameEn: "Mymensingh", nameBn: "ময়মনসিংহ", headquarters: "Mymensingh" },
];

export const DISTRICTS: District[] = [
  // Dhaka Division
  { nameEn: "Dhaka", nameBn: "ঢাকা", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.8103, longitude: 90.4125, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Gazipur", nameBn: "গাজীপুর", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 24.0022, longitude: 90.4264, isCoastal: false, isRiverAdjacent: false },
  { nameEn: "Narayanganj", nameBn: "নারায়ণগঞ্জ", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.6238, longitude: 90.5000, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Tangail", nameBn: "টাঙ্গাইল", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 24.2513, longitude: 89.9167, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Faridpur", nameBn: "ফরিদপুর", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.6071, longitude: 89.8429, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Manikganj", nameBn: "মানিকগঞ্জ", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.8617, longitude: 90.0003, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Munshiganj", nameBn: "মুন্সিগঞ্জ", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.5422, longitude: 90.5305, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Narsingdi", nameBn: "নরসিংদী", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.9322, longitude: 90.7154, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Rajbari", nameBn: "রাজবাড়ী", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.7574, longitude: 89.6444, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Madaripur", nameBn: "মাদারীপুর", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.1641, longitude: 90.1896, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Gopalganj", nameBn: "গোপালগঞ্জ", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.0051, longitude: 89.8266, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Shariatpur", nameBn: "শরীয়তপুর", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 23.2423, longitude: 90.4348, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Kishoreganj", nameBn: "কিশোরগঞ্জ", divisionEn: "Dhaka", divisionBn: "ঢাকা", latitude: 24.4449, longitude: 90.7766, isCoastal: false, isRiverAdjacent: true },

  // Chattogram Division
  { nameEn: "Chattogram", nameBn: "চট্টগ্রাম", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 22.3569, longitude: 91.7832, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Cox's Bazar", nameBn: "কক্সবাজার", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 21.4272, longitude: 92.0058, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Cumilla", nameBn: "কুমিল্লা", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 23.4607, longitude: 91.1809, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Feni", nameBn: "ফেনী", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 23.0159, longitude: 91.3976, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Noakhali", nameBn: "নোয়াখালী", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 22.8696, longitude: 91.0998, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Lakshmipur", nameBn: "লক্ষ্মীপুর", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 22.9425, longitude: 90.8412, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Chandpur", nameBn: "চাঁদপুর", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 23.2333, longitude: 90.6667, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Brahmanbaria", nameBn: "ব্রাহ্মণবাড়িয়া", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 23.9571, longitude: 91.1119, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Rangamati", nameBn: "রাঙ্গামাটি", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 22.6533, longitude: 92.1753, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Bandarban", nameBn: "বান্দরবান", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 22.1953, longitude: 92.2184, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Khagrachhari", nameBn: "খাগড়াছড়ি", divisionEn: "Chattogram", divisionBn: "চট্টগ্রাম", latitude: 23.1193, longitude: 91.9847, isCoastal: false, isRiverAdjacent: false },

  // Sylhet Division
  { nameEn: "Sylhet", nameBn: "সিলেট", divisionEn: "Sylhet", divisionBn: "সিলেট", latitude: 24.8949, longitude: 91.8687, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Sunamganj", nameBn: "সুনামগঞ্জ", divisionEn: "Sylhet", divisionBn: "সিলেট", latitude: 25.0658, longitude: 91.3950, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Moulvibazar", nameBn: "মৌলভীবাজার", divisionEn: "Sylhet", divisionBn: "সিলেট", latitude: 24.4829, longitude: 91.7774, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Habiganj", nameBn: "হবিগঞ্জ", divisionEn: "Sylhet", divisionBn: "সিলেট", latitude: 24.3750, longitude: 91.4167, isCoastal: false, isRiverAdjacent: true },

  // Rajshahi Division
  { nameEn: "Rajshahi", nameBn: "রাজশাহী", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.3636, longitude: 88.6241, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Bogura", nameBn: "বগুড়া", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.8465, longitude: 89.3777, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Pabna", nameBn: "পাবনা", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.0064, longitude: 89.2372, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Sirajganj", nameBn: "সিরাজগঞ্জ", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.4534, longitude: 89.7008, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Naogaon", nameBn: "নওগাঁ", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.7936, longitude: 88.9318, isCoastal: false, isRiverAdjacent: false },
  { nameEn: "Natore", nameBn: "নাটোর", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.4206, longitude: 89.0003, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Chapai Nawabganj", nameBn: "চাঁপাইনবাবগঞ্জ", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 24.5965, longitude: 88.2776, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Joypurhat", nameBn: "জয়পুরহাট", divisionEn: "Rajshahi", divisionBn: "রাজশাহী", latitude: 25.1015, longitude: 89.0277, isCoastal: false, isRiverAdjacent: false },

  // Khulna Division
  { nameEn: "Khulna", nameBn: "খুলনা", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 22.8456, longitude: 89.5403, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Jashore", nameBn: "যশোর", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.1664, longitude: 89.2182, isCoastal: false, isRiverAdjacent: false },
  { nameEn: "Satkhira", nameBn: "সাতক্ষীরা", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 22.7185, longitude: 89.0705, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Bagerhat", nameBn: "বাগেরহাট", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 22.6516, longitude: 89.7859, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Kushtia", nameBn: "কুষ্টিয়া", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.9013, longitude: 89.1205, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Jhenaidah", nameBn: "ঝিনাইদহ", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.5448, longitude: 89.1539, isCoastal: false, isRiverAdjacent: false },
  { nameEn: "Chuadanga", nameBn: "চুয়াডাঙ্গা", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.6402, longitude: 88.8418, isCoastal: false, isRiverAdjacent: false },
  { nameEn: "Meherpur", nameBn: "মেহেরপুর", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.7622, longitude: 88.6318, isCoastal: false, isRiverAdjacent: false },
  { nameEn: "Magura", nameBn: "মাগুরা", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.4873, longitude: 89.4199, isCoastal: false, isRiverAdjacent: false },
  { nameEn: "Narail", nameBn: "নড়াইল", divisionEn: "Khulna", divisionBn: "খুলনা", latitude: 23.1725, longitude: 89.5127, isCoastal: false, isRiverAdjacent: false },

  // Barishal Division
  { nameEn: "Barishal", nameBn: "বরিশাল", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.7010, longitude: 90.3535, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Bhola", nameBn: "ভোলা", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.6859, longitude: 90.6482, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Patuakhali", nameBn: "পটুয়াখালী", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.3596, longitude: 90.3299, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Pirojpur", nameBn: "পিরোজপুর", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.5841, longitude: 89.9720, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Barguna", nameBn: "বরগুনা", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.0953, longitude: 90.1121, isCoastal: true, isRiverAdjacent: true },
  { nameEn: "Jhalokati", nameBn: "ঝালকাঠি", divisionEn: "Barishal", divisionBn: "বরিশাল", latitude: 22.6406, longitude: 90.1987, isCoastal: true, isRiverAdjacent: true },

  // Rangpur Division
  { nameEn: "Rangpur", nameBn: "রংপুর", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.7439, longitude: 89.2752, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Dinajpur", nameBn: "দিনাজপুর", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.6217, longitude: 88.6355, isCoastal: false, isRiverAdjacent: false },
  { nameEn: "Kurigram", nameBn: "কুড়িগ্রাম", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.8054, longitude: 89.6362, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Gaibandha", nameBn: "গাইবান্ধা", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.3288, longitude: 89.5430, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Nilphamari", nameBn: "নীলফামারী", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.9318, longitude: 88.8560, isCoastal: false, isRiverAdjacent: false },
  { nameEn: "Panchagarh", nameBn: "পঞ্চগড়", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 26.3411, longitude: 88.5542, isCoastal: false, isRiverAdjacent: false },
  { nameEn: "Thakurgaon", nameBn: "ঠাকুরগাঁও", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 26.0337, longitude: 88.4617, isCoastal: false, isRiverAdjacent: false },
  { nameEn: "Lalmonirhat", nameBn: "লালমনিরহাট", divisionEn: "Rangpur", divisionBn: "রংপুর", latitude: 25.9923, longitude: 89.2847, isCoastal: false, isRiverAdjacent: true },

  // Mymensingh Division
  { nameEn: "Mymensingh", nameBn: "ময়মনসিংহ", divisionEn: "Mymensingh", divisionBn: "ময়মনসিংহ", latitude: 24.7471, longitude: 90.4203, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Jamalpur", nameBn: "জামালপুর", divisionEn: "Mymensingh", divisionBn: "ময়মনসিংহ", latitude: 24.9375, longitude: 89.9378, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Netrokona", nameBn: "নেত্রকোণা", divisionEn: "Mymensingh", divisionBn: "ময়মনসিংহ", latitude: 24.8709, longitude: 90.7279, isCoastal: false, isRiverAdjacent: true },
  { nameEn: "Sherpur", nameBn: "শেরপুর", divisionEn: "Mymensingh", divisionBn: "ময়মনসিংহ", latitude: 25.0205, longitude: 90.0153, isCoastal: false, isRiverAdjacent: false },
];

export const UPAZILAS: Upazila[] = [
  { nameEn: "Mirpur", nameBn: "মিরপুর", districtEn: "Dhaka", latitude: 23.8041, longitude: 90.3667 },
  { nameEn: "Dhanmondi", nameBn: "ধানমন্ডি", districtEn: "Dhaka", latitude: 23.7461, longitude: 90.3742 },
  { nameEn: "Uttara", nameBn: "উত্তরা", districtEn: "Dhaka", latitude: 23.8759, longitude: 90.3795 },
  { nameEn: "Gulshan", nameBn: "গুলশান", districtEn: "Dhaka", latitude: 23.7925, longitude: 90.4078 },
  { nameEn: "Old Dhaka (Kotwali)", nameBn: "পুরান ঢাকা (কোতোয়ালী)", districtEn: "Dhaka", latitude: 23.7099, longitude: 90.4071 },
  { nameEn: "Pahartali", nameBn: "পাহাড়তলী", districtEn: "Chattogram", latitude: 22.3685, longitude: 91.7766 },
  { nameEn: "Teknaf", nameBn: "টেকনাফ", districtEn: "Cox's Bazar", latitude: 20.8653, longitude: 92.2985 },
  { nameEn: "Sreemangal", nameBn: "শ্রীমঙ্গল", districtEn: "Moulvibazar", latitude: 24.3065, longitude: 91.7296 },
  { nameEn: "Tahahirpur (Tanguar Haor)", nameBn: "তাহিরপুর (টাঙ্গুয়ার হাওর)", districtEn: "Sunamganj", latitude: 25.1054, longitude: 91.1788 },
  { nameEn: "Kuakata", nameBn: "কুয়াকাটা", districtEn: "Patuakhali", latitude: 21.8274, longitude: 90.1207 },
  { nameEn: "Sundarbans (Mongla)", nameBn: "সুন্দরবন (মোংলা)", districtEn: "Bagerhat", latitude: 22.4833, longitude: 89.6000 },
];

export function resolveCoordinates(lat: number, lon: number): {
  upazilaEn: string;
  upazilaBn: string;
  districtEn: string;
  districtBn: string;
  divisionEn: string;
  divisionBn: string;
  isCoastal: boolean;
  isRiverAdjacent: boolean;
} {
  function dist(lat1: number, lon1: number, lat2: number, lon2: number) {
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  let nearestUpazila = UPAZILAS[0];
  let minUpazilaDist = Number.MAX_VALUE;
  for (const u of UPAZILAS) {
    const d = dist(lat, lon, u.latitude, u.longitude);
    if (d < minUpazilaDist) {
      minUpazilaDist = d;
      nearestUpazila = u;
    }
  }

  let nearestDistrict = DISTRICTS[0];
  let minDistDist = Number.MAX_VALUE;
  for (const d of DISTRICTS) {
    const dDist = dist(lat, lon, d.latitude, d.longitude);
    if (dDist < minDistDist) {
      minDistDist = dDist;
      nearestDistrict = d;
    }
  }

  const hasCloseUpazila = minUpazilaDist < 18.0;
  const upazilaEn = hasCloseUpazila ? nearestUpazila.nameEn : `${nearestDistrict.nameEn} Sadar`;
  const upazilaBn = hasCloseUpazila ? nearestUpazila.nameBn : `${nearestDistrict.nameBn} সদর`;

  return {
    upazilaEn,
    upazilaBn,
    districtEn: nearestDistrict.nameEn,
    districtBn: nearestDistrict.nameBn,
    divisionEn: nearestDistrict.divisionEn,
    divisionBn: nearestDistrict.divisionBn,
    isCoastal: nearestDistrict.isCoastal,
    isRiverAdjacent: nearestDistrict.isRiverAdjacent,
  };
}
