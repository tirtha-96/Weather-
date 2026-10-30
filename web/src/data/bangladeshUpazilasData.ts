export interface Upazila {
  nameEn: string;
  nameBn: string;
  districtEn: string;
  latitude: number;
  longitude: number;
}

export const ALL_UPAZILAS: Upazila[] = [
  // ==========================================
  // DHAKA DIVISION
  // ==========================================
  // Dhaka District
  { nameEn: "Mirpur", nameBn: "মিরপুর", districtEn: "Dhaka", latitude: 23.8041, longitude: 90.3667 },
  { nameEn: "Gulshan", nameBn: "গুলশান", districtEn: "Dhaka", latitude: 23.7925, longitude: 90.4078 },
  { nameEn: "Dhanmondi", nameBn: "ধানমন্ডি", districtEn: "Dhaka", latitude: 23.7461, longitude: 90.3742 },
  { nameEn: "Uttara", nameBn: "উত্তরা", districtEn: "Dhaka", latitude: 23.8759, longitude: 90.3795 },
  { nameEn: "Mohammadpur", nameBn: "মোহাম্মদপুর", districtEn: "Dhaka", latitude: 23.7542, longitude: 90.3588 },
  { nameEn: "Motijheel", nameBn: "মতিঝিল", districtEn: "Dhaka", latitude: 23.7330, longitude: 90.4172 },
  { nameEn: "Tejgaon", nameBn: "তেজগাঁও", districtEn: "Dhaka", latitude: 23.7597, longitude: 90.3923 },
  { nameEn: "Banani", nameBn: "বনানী", districtEn: "Dhaka", latitude: 23.7937, longitude: 90.4048 },
  { nameEn: "Badda", nameBn: "বাড্ডা", districtEn: "Dhaka", latitude: 23.7842, longitude: 90.4258 },
  { nameEn: "Khilgaon", nameBn: "খিলগাঁও", districtEn: "Dhaka", latitude: 23.7508, longitude: 90.4285 },
  { nameEn: "Lalbagh", nameBn: "লালবাগ", districtEn: "Dhaka", latitude: 23.7196, longitude: 90.3887 },
  { nameEn: "Ramna", nameBn: "রমনা", districtEn: "Dhaka", latitude: 23.7410, longitude: 90.4020 },
  { nameEn: "Paltan", nameBn: "পল্টন", districtEn: "Dhaka", latitude: 23.7340, longitude: 90.4120 },
  { nameEn: "Demra", nameBn: "ডেমরা", districtEn: "Dhaka", latitude: 23.7083, longitude: 90.4917 },
  { nameEn: "Jatrabari", nameBn: "যাত্রাবাড়ী", districtEn: "Dhaka", latitude: 23.7094, longitude: 90.4350 },
  { nameEn: "Savar", nameBn: "সাভার", districtEn: "Dhaka", latitude: 23.8583, longitude: 90.2667 },
  { nameEn: "Keraniganj", nameBn: "কেরানীগঞ্জ", districtEn: "Dhaka", latitude: 23.6833, longitude: 90.3167 },
  { nameEn: "Dhamrai", nameBn: "ধামরাই", districtEn: "Dhaka", latitude: 23.9167, longitude: 90.2167 },
  { nameEn: "Dohar", nameBn: "দোহার", districtEn: "Dhaka", latitude: 23.5933, longitude: 90.1333 },
  { nameEn: "Nawabganj", nameBn: "নবাবগঞ্জ", districtEn: "Dhaka", latitude: 23.6667, longitude: 90.1667 },

  // Gazipur District
  { nameEn: "Gazipur Sadar", nameBn: "গাজীপুর সদর", districtEn: "Gazipur", latitude: 24.0023, longitude: 90.4264 },
  { nameEn: "Tongi", nameBn: "টঙ্গী", districtEn: "Gazipur", latitude: 23.8969, longitude: 90.4025 },
  { nameEn: "Kaliakair", nameBn: "কালিয়াকৈর", districtEn: "Gazipur", latitude: 24.0750, longitude: 90.2167 },
  { nameEn: "Kapasia", nameBn: "কাপাসিয়া", districtEn: "Gazipur", latitude: 24.1167, longitude: 90.5667 },
  { nameEn: "Sreepur", nameBn: "শ্রীপুর", districtEn: "Gazipur", latitude: 24.2000, longitude: 90.4667 },
  { nameEn: "Kaliganj", nameBn: "কালীগঞ্জ", districtEn: "Gazipur", latitude: 23.9167, longitude: 90.5333 },

  // Narayanganj District
  { nameEn: "Narayanganj Sadar", nameBn: "নারায়ণগঞ্জ সদর", districtEn: "Narayanganj", latitude: 23.6238, longitude: 90.5000 },
  { nameEn: "Bandar", nameBn: "বন্দর", districtEn: "Narayanganj", latitude: 23.6000, longitude: 90.5333 },
  { nameEn: "Rupganj", nameBn: "রূপগঞ্জ", districtEn: "Narayanganj", latitude: 23.7833, longitude: 90.5167 },
  { nameEn: "Sonargaon", nameBn: "সোনারগাঁও", districtEn: "Narayanganj", latitude: 23.6500, longitude: 90.6000 },
  { nameEn: "Araihazar", nameBn: "আড়াইহাজার", districtEn: "Narayanganj", latitude: 23.7833, longitude: 90.6500 },
  { nameEn: "Fatullah", nameBn: "ফতুল্লা", districtEn: "Narayanganj", latitude: 23.6333, longitude: 90.4833 },
  { nameEn: "Siddhirganj", nameBn: "সিদ্ধিরগঞ্জ", districtEn: "Narayanganj", latitude: 23.6833, longitude: 90.5167 },

  // Tangail District
  { nameEn: "Tangail Sadar", nameBn: "টাঙ্গাইল সদর", districtEn: "Tangail", latitude: 24.2513, longitude: 89.9167 },
  { nameEn: "Gopalpur", nameBn: "গোপালপুর", districtEn: "Tangail", latitude: 24.5583, longitude: 89.9167 },
  { nameEn: "Basail", nameBn: "বাসাইল", districtEn: "Tangail", latitude: 24.2167, longitude: 90.0500 },
  { nameEn: "Bhuapur", nameBn: "ভূঞাপুর", districtEn: "Tangail", latitude: 24.4667, longitude: 89.8667 },
  { nameEn: "Delduar", nameBn: "দেলদুয়ার", districtEn: "Tangail", latitude: 24.1417, longitude: 89.9667 },
  { nameEn: "Ghatail", nameBn: "ঘাটাইল", districtEn: "Tangail", latitude: 24.5000, longitude: 90.0000 },
  { nameEn: "Kalihati", nameBn: "কালিহাতী", districtEn: "Tangail", latitude: 24.3833, longitude: 90.0000 },
  { nameEn: "Madhupur", nameBn: "মধুপুর", districtEn: "Tangail", latitude: 24.6167, longitude: 90.0333 },
  { nameEn: "Mirzapur", nameBn: "মির্জাপুর", districtEn: "Tangail", latitude: 24.1000, longitude: 90.1000 },
  { nameEn: "Nagarpur", nameBn: "নাগরপুর", districtEn: "Tangail", latitude: 24.0500, longitude: 89.8667 },
  { nameEn: "Sakhipur", nameBn: "সখীপুর", districtEn: "Tangail", latitude: 24.3167, longitude: 90.1667 },
  { nameEn: "Dhanbari", nameBn: "ধনবাড়ী", districtEn: "Tangail", latitude: 24.6750, longitude: 89.9500 },

  // Kishoreganj District
  { nameEn: "Kishoreganj Sadar", nameBn: "কিশোরগঞ্জ সদর", districtEn: "Kishoreganj", latitude: 24.4449, longitude: 90.7766 },
  { nameEn: "Bajitpur", nameBn: "বাজিতপুর", districtEn: "Kishoreganj", latitude: 24.2167, longitude: 90.9500 },
  { nameEn: "Bhairab", nameBn: "ভৈরব", districtEn: "Kishoreganj", latitude: 24.0500, longitude: 90.9833 },
  { nameEn: "Hossainpur", nameBn: "হোসেনপুর", districtEn: "Kishoreganj", latitude: 24.4167, longitude: 90.6500 },
  { nameEn: "Itna", nameBn: "ইটনা", districtEn: "Kishoreganj", latitude: 24.5333, longitude: 91.0833 },
  { nameEn: "Karimganj", nameBn: "করিমগঞ্জ", districtEn: "Kishoreganj", latitude: 24.4667, longitude: 90.8667 },
  { nameEn: "Katiadi", nameBn: "কটিয়াদী", districtEn: "Kishoreganj", latitude: 24.2500, longitude: 90.8000 },
  { nameEn: "Kuliarchar", nameBn: "কুলিয়ারচর", districtEn: "Kishoreganj", latitude: 24.1500, longitude: 90.9000 },
  { nameEn: "Mithamain", nameBn: "মিঠামইন", districtEn: "Kishoreganj", latitude: 24.4333, longitude: 91.0500 },
  { nameEn: "Nikli", nameBn: "নিকলী", districtEn: "Kishoreganj", latitude: 24.3167, longitude: 90.9333 },
  { nameEn: "Pakundia", nameBn: "পাকুন্দিয়া", districtEn: "Kishoreganj", latitude: 24.3333, longitude: 90.6833 },
  { nameEn: "Tarail", nameBn: "তাড়াইল", districtEn: "Kishoreganj", latitude: 24.5500, longitude: 90.8500 },
  { nameEn: "Ashtagram", nameBn: "অষ্টগ্রাম", districtEn: "Kishoreganj", latitude: 24.2667, longitude: 91.1167 },

  // Manikganj District
  { nameEn: "Manikganj Sadar", nameBn: "মানিকগঞ্জ সদর", districtEn: "Manikganj", latitude: 23.8644, longitude: 90.0047 },
  { nameEn: "Singair", nameBn: "সিংগাইর", districtEn: "Manikganj", latitude: 23.8167, longitude: 90.1500 },
  { nameEn: "Shibalaya", nameBn: "শিবালয়", districtEn: "Manikganj", latitude: 23.8333, longitude: 89.7833 },
  { nameEn: "Saturia", nameBn: "সাটুরিয়া", districtEn: "Manikganj", latitude: 23.9500, longitude: 90.0167 },
  { nameEn: "Harirampur", nameBn: "হরিরামপুর", districtEn: "Manikganj", latitude: 23.7333, longitude: 89.9667 },
  { nameEn: "Ghior", nameBn: "ঘিওরে", districtEn: "Manikganj", latitude: 23.8833, longitude: 89.8333 },
  { nameEn: "Daulatpur", nameBn: "দৌলতপুর", districtEn: "Manikganj", latitude: 23.9833, longitude: 89.8333 },

  // Munshiganj District
  { nameEn: "Munshiganj Sadar", nameBn: "মুন্সীগঞ্জ সদর", districtEn: "Munshiganj", latitude: 23.5422, longitude: 90.5305 },
  { nameEn: "Sreenagar", nameBn: "শ্রীনগর", districtEn: "Munshiganj", latitude: 23.5333, longitude: 90.2833 },
  { nameEn: "Sirajdikhan", nameBn: "সিরাজদিখান", districtEn: "Munshiganj", latitude: 23.5833, longitude: 90.3667 },
  { nameEn: "Louhajang", nameBn: "লৌহজং", districtEn: "Munshiganj", latitude: 23.4667, longitude: 90.3167 },
  { nameEn: "Tongibari", nameBn: "টংগিবাড়ী", districtEn: "Munshiganj", latitude: 23.5000, longitude: 90.4500 },
  { nameEn: "Gazaria", nameBn: "গজারিয়া", districtEn: "Munshiganj", latitude: 23.5500, longitude: 90.6000 },

  // Narsingdi District
  { nameEn: "Narsingdi Sadar", nameBn: "নরসিংদী সদর", districtEn: "Narsingdi", latitude: 23.9197, longitude: 90.7203 },
  { nameEn: "Belabo", nameBn: "বেলাবো", districtEn: "Narsingdi", latitude: 24.1000, longitude: 90.8500 },
  { nameEn: "Monohardi", nameBn: "মনোহরদী", districtEn: "Narsingdi", latitude: 24.1333, longitude: 90.7000 },
  { nameEn: "Palash", nameBn: "পলাশ", districtEn: "Narsingdi", latitude: 23.9500, longitude: 90.6333 },
  { nameEn: "Raipura", nameBn: "রায়পুরা", districtEn: "Narsingdi", latitude: 23.9667, longitude: 90.8667 },
  { nameEn: "Shibpur", nameBn: "শিবপুর", districtEn: "Narsingdi", latitude: 24.0333, longitude: 90.7333 },

  // Faridpur District
  { nameEn: "Faridpur Sadar", nameBn: "ফরিদপুর সদর", districtEn: "Faridpur", latitude: 23.6071, longitude: 89.8429 },
  { nameEn: "Boalmari", nameBn: "বোয়ালমারী", districtEn: "Faridpur", latitude: 23.3833, longitude: 89.6833 },
  { nameEn: "Alfadanga", nameBn: "আলফাডাঙ্গা", districtEn: "Faridpur", latitude: 23.2833, longitude: 89.7000 },
  { nameEn: "Madhukhali", nameBn: "মধুখালী", districtEn: "Faridpur", latitude: 23.5333, longitude: 89.6333 },
  { nameEn: "Bhanga", nameBn: "ভাঙ্গা", districtEn: "Faridpur", latitude: 23.3833, longitude: 89.9833 },
  { nameEn: "Nagarkanda", nameBn: "নগরকান্দা", districtEn: "Faridpur", latitude: 23.4167, longitude: 89.8833 },
  { nameEn: "Charbhadrasan", nameBn: "চরভদ্রাসন", districtEn: "Faridpur", latitude: 23.6000, longitude: 90.0167 },
  { nameEn: "Sadarpur", nameBn: "সদরপুর", districtEn: "Faridpur", latitude: 23.4833, longitude: 90.0333 },
  { nameEn: "Saltha", nameBn: "সালথা", districtEn: "Faridpur", latitude: 23.4833, longitude: 89.7833 },

  // Gopalganj District
  { nameEn: "Gopalganj Sadar", nameBn: "গোপালগঞ্জ সদর", districtEn: "Gopalganj", latitude: 23.0051, longitude: 89.8266 },
  { nameEn: "Kashiani", nameBn: "কাশিয়ানী", districtEn: "Gopalganj", latitude: 23.2167, longitude: 89.7000 },
  { nameEn: "Kotalipara", nameBn: "কোটালীপাড়া", districtEn: "Gopalganj", latitude: 22.9833, longitude: 90.0000 },
  { nameEn: "Muksudpur", nameBn: "মুকসুদপুর", districtEn: "Gopalganj", latitude: 23.2500, longitude: 89.8667 },
  { nameEn: "Tungipara", nameBn: "টুঙ্গিপাড়া", districtEn: "Gopalganj", latitude: 22.9000, longitude: 89.9000 },

  // Madaripur District
  { nameEn: "Madaripur Sadar", nameBn: "মাদারীপুর সদর", districtEn: "Madaripur", latitude: 23.1641, longitude: 90.1897 },
  { nameEn: "Shibchar", nameBn: "শিবচর", districtEn: "Madaripur", latitude: 23.3500, longitude: 90.1667 },
  { nameEn: "Kalkini", nameBn: "কালকিনি", districtEn: "Madaripur", latitude: 23.0667, longitude: 90.2333 },
  { nameEn: "Rajoir", nameBn: "রাজৈর", districtEn: "Madaripur", latitude: 23.2000, longitude: 90.0333 },
  { nameEn: "Dasar", nameBn: "ডাসার", districtEn: "Madaripur", latitude: 23.1000, longitude: 90.2000 },

  // Rajbari District
  { nameEn: "Rajbari Sadar", nameBn: "রাজবাড়ী সদর", districtEn: "Rajbari", latitude: 23.7574, longitude: 89.6445 },
  { nameEn: "Goalanda", nameBn: "গোয়ালন্দ", districtEn: "Rajbari", latitude: 23.7333, longitude: 89.7667 },
  { nameEn: "Pangsha", nameBn: "পাংশা", districtEn: "Rajbari", latitude: 23.7833, longitude: 89.4167 },
  { nameEn: "Baliakandi", nameBn: "বালিয়াকান্দি", districtEn: "Rajbari", latitude: 23.6333, longitude: 89.5500 },
  { nameEn: "Kalukhali", nameBn: "কালুখালী", districtEn: "Rajbari", latitude: 23.7167, longitude: 89.5000 },

  // Shariatpur District
  { nameEn: "Shariatpur Sadar", nameBn: "শরীয়তপুর সদর", districtEn: "Shariatpur", latitude: 23.2423, longitude: 90.4348 },
  { nameEn: "Damudya", nameBn: "ডামুড্যা", districtEn: "Shariatpur", latitude: 23.1333, longitude: 90.4333 },
  { nameEn: "Naria", nameBn: "নড়িয়া", districtEn: "Shariatpur", latitude: 23.3167, longitude: 90.4000 },
  { nameEn: "Jajira", nameBn: "জাজিরা", districtEn: "Shariatpur", latitude: 23.3500, longitude: 90.3333 },
  { nameEn: "Bhedarganj", nameBn: "ভেদরগঞ্জ", districtEn: "Shariatpur", latitude: 23.2000, longitude: 90.5000 },
  { nameEn: "Gosairhat", nameBn: "গোসাইরহাট", districtEn: "Shariatpur", latitude: 23.0667, longitude: 90.4667 },

  // ==========================================
  // CHATTOGRAM DIVISION
  // ==========================================
  // Chattogram District
  { nameEn: "Kotwali", nameBn: "কোতোয়ালী", districtEn: "Chattogram", latitude: 22.3384, longitude: 91.8317 },
  { nameEn: "Panchlaish", nameBn: "পাঁচলাইশ", districtEn: "Chattogram", latitude: 22.3683, longitude: 91.8236 },
  { nameEn: "Halishahar", nameBn: "হালিশহর", districtEn: "Chattogram", latitude: 22.3167, longitude: 91.7833 },
  { nameEn: "Pahartali", nameBn: "পাহাড়তলী", districtEn: "Chattogram", latitude: 22.3667, longitude: 91.7833 },
  { nameEn: "Patenga", nameBn: "পতেঙ্গা", districtEn: "Chattogram", latitude: 22.2500, longitude: 91.8000 },
  { nameEn: "Double Mooring", nameBn: "ডবলমুরিং", districtEn: "Chattogram", latitude: 22.3333, longitude: 91.8167 },
  { nameEn: "Khulshi", nameBn: "খুলশী", districtEn: "Chattogram", latitude: 22.3667, longitude: 91.8000 },
  { nameEn: "Bakalia", nameBn: "বাকলিয়া", districtEn: "Chattogram", latitude: 22.3400, longitude: 91.8500 },
  { nameEn: "Bayazid", nameBn: "বায়োজিদ", districtEn: "Chattogram", latitude: 22.3833, longitude: 91.8167 },
  { nameEn: "Chandgaon", nameBn: "চান্দগাঁও", districtEn: "Chattogram", latitude: 22.3833, longitude: 91.8667 },
  { nameEn: "Hathazari", nameBn: "হাটহাজারী", districtEn: "Chattogram", latitude: 22.5083, longitude: 91.8083 },
  { nameEn: "Sitakunda", nameBn: "সীতাকুণ্ড", districtEn: "Chattogram", latitude: 22.6167, longitude: 91.6667 },
  { nameEn: "Mirsharai", nameBn: "মীরসরাই", districtEn: "Chattogram", latitude: 22.7667, longitude: 91.5833 },
  { nameEn: "Patiya", nameBn: "পটিয়া", districtEn: "Chattogram", latitude: 22.2917, longitude: 91.9750 },
  { nameEn: "Boalkhali", nameBn: "বোয়ালখালী", districtEn: "Chattogram", latitude: 22.3833, longitude: 91.9167 },
  { nameEn: "Anwara", nameBn: "আনোয়ারা", districtEn: "Chattogram", latitude: 22.2167, longitude: 91.9167 },
  { nameEn: "Chandanaish", nameBn: "চন্দনাইশ", districtEn: "Chattogram", latitude: 22.2167, longitude: 92.0500 },
  { nameEn: "Banshkhali", nameBn: "বাঁশখালী", districtEn: "Chattogram", latitude: 22.0333, longitude: 91.9667 },
  { nameEn: "Rangunia", nameBn: "রাঙ্গুনিয়া", districtEn: "Chattogram", latitude: 22.4667, longitude: 92.0500 },
  { nameEn: "Raozan", nameBn: "রাউজান", districtEn: "Chattogram", latitude: 22.5333, longitude: 91.9167 },
  { nameEn: "Sandwip", nameBn: "সন্দ্বীপ", districtEn: "Chattogram", latitude: 22.5000, longitude: 91.4333 },
  { nameEn: "Satkania", nameBn: "সাতকানিয়া", districtEn: "Chattogram", latitude: 22.0833, longitude: 92.0833 },
  { nameEn: "Lohagara", nameBn: "লোহাগাড়া", districtEn: "Chattogram", latitude: 21.9833, longitude: 92.1167 },
  { nameEn: "Fatikchhari", nameBn: "ফটিকছড়ি", districtEn: "Chattogram", latitude: 22.6833, longitude: 91.7833 },
  { nameEn: "Karnaphuli", nameBn: "কর্ণফুলী", districtEn: "Chattogram", latitude: 22.2833, longitude: 91.8500 },

  // Cox's Bazar District
  { nameEn: "Cox's Bazar Sadar", nameBn: "কক্সবাজার সদর", districtEn: "Cox's Bazar", latitude: 21.4272, longitude: 92.0058 },
  { nameEn: "Chakaria", nameBn: "চকোরিয়া", districtEn: "Cox's Bazar", latitude: 21.7833, longitude: 92.0833 },
  { nameEn: "Maheshkhali", nameBn: "মহেশখালী", districtEn: "Cox's Bazar", latitude: 21.5500, longitude: 91.9667 },
  { nameEn: "Kutubdia", nameBn: "কুতুবদিয়া", districtEn: "Cox's Bazar", latitude: 21.8167, longitude: 91.8500 },
  { nameEn: "Ramu", nameBn: "রামু", districtEn: "Cox's Bazar", latitude: 21.4500, longitude: 92.1000 },
  { nameEn: "Teknaf", nameBn: "টেকনাফ", districtEn: "Cox's Bazar", latitude: 20.8667, longitude: 92.3000 },
  { nameEn: "Ukhia", nameBn: "উখিয়া", districtEn: "Cox's Bazar", latitude: 21.2833, longitude: 92.1500 },
  { nameEn: "Pekua", nameBn: "পেকুয়া", districtEn: "Cox's Bazar", latitude: 21.8000, longitude: 91.9833 },
  { nameEn: "Saint Martin", nameBn: "সেন্টমার্টিন", districtEn: "Cox's Bazar", latitude: 20.6272, longitude: 92.3225 },

  // Cumilla District
  { nameEn: "Cumilla Adarsha Sadar", nameBn: "কুমিল্লা আদর্শ সদর", districtEn: "Cumilla", latitude: 23.4682, longitude: 91.1788 },
  { nameEn: "Cumilla Sadar Dakshin", nameBn: "কুমিল্লা সদর দক্ষিণ", districtEn: "Cumilla", latitude: 23.4167, longitude: 91.1833 },
  { nameEn: "Barura", nameBn: "বরুড়া", districtEn: "Cumilla", latitude: 23.3667, longitude: 91.0500 },
  { nameEn: "Brahmanpara", nameBn: "ব্রাহ্মণপাড়া", districtEn: "Cumilla", latitude: 23.6167, longitude: 91.1167 },
  { nameEn: "Burichang", nameBn: "বুড়িচং", districtEn: "Cumilla", latitude: 23.5500, longitude: 91.1333 },
  { nameEn: "Chandina", nameBn: "চান্দিনা", districtEn: "Cumilla", latitude: 23.4833, longitude: 91.0000 },
  { nameEn: "Chauddagram", nameBn: "চৌদ্দগ্রাম", districtEn: "Cumilla", latitude: 23.2167, longitude: 91.3167 },
  { nameEn: "Daudkandi", nameBn: "দাউদকান্দি", districtEn: "Cumilla", latitude: 23.5333, longitude: 90.7167 },
  { nameEn: "Debidwar", nameBn: "দেবীদ্বার", districtEn: "Cumilla", latitude: 23.6000, longitude: 90.9667 },
  { nameEn: "Homna", nameBn: "হোমনা", districtEn: "Cumilla", latitude: 23.6833, longitude: 90.7833 },
  { nameEn: "Laksam", nameBn: "লাকসাম", districtEn: "Cumilla", latitude: 23.2333, longitude: 91.1167 },
  { nameEn: "Muradnagar", nameBn: "মুরাদনগর", districtEn: "Cumilla", latitude: 23.6333, longitude: 90.9333 },
  { nameEn: "Nangalkot", nameBn: "নাঙ্গলকোট", districtEn: "Cumilla", latitude: 23.1667, longitude: 91.2000 },
  { nameEn: "Meghna", nameBn: "মেঘনা", districtEn: "Cumilla", latitude: 23.6167, longitude: 90.6833 },
  { nameEn: "Titas", nameBn: "তিতাস", districtEn: "Cumilla", latitude: 23.5833, longitude: 90.8167 },
  { nameEn: "Monohargonj", nameBn: "মনোহরগঞ্জ", districtEn: "Cumilla", latitude: 23.1833, longitude: 91.1167 },
  { nameEn: "Lalmai", nameBn: "লালমাই", districtEn: "Cumilla", latitude: 23.3667, longitude: 91.1500 },

  // Feni District
  { nameEn: "Feni Sadar", nameBn: "ফেনী সদর", districtEn: "Feni", latitude: 23.0187, longitude: 91.3966 },
  { nameEn: "Chhagalnaiya", nameBn: "ছাগলনাইয়া", districtEn: "Feni", latitude: 23.0333, longitude: 91.5167 },
  { nameEn: "Daganbhuiyan", nameBn: "দাগনভূঞা", districtEn: "Feni", latitude: 22.9333, longitude: 91.3000 },
  { nameEn: "Parshuram", nameBn: "পরশুরাম", districtEn: "Feni", latitude: 23.2167, longitude: 91.4333 },
  { nameEn: "Sonagazi", nameBn: "সোনাগাজী", districtEn: "Feni", latitude: 22.8500, longitude: 91.3833 },
  { nameEn: "Fulgazi", nameBn: "ফুলগাজী", districtEn: "Feni", latitude: 23.1500, longitude: 91.4333 },

  // Brahmanbaria District
  { nameEn: "Brahmanbaria Sadar", nameBn: "ব্রাহ্মণবাড়িয়া সদর", districtEn: "Brahmanbaria", latitude: 23.9571, longitude: 91.1119 },
  { nameEn: "Kasba", nameBn: "কসবা", districtEn: "Brahmanbaria", latitude: 23.7333, longitude: 91.1667 },
  { nameEn: "Akhaura", nameBn: "আখাউড়া", districtEn: "Brahmanbaria", latitude: 23.8667, longitude: 91.2167 },
  { nameEn: "Ashuganj", nameBn: "আশুগঞ্জ", districtEn: "Brahmanbaria", latitude: 24.0333, longitude: 91.0167 },
  { nameEn: "Bancharampur", nameBn: "বাঞ্ছারামপুর", districtEn: "Brahmanbaria", latitude: 23.7667, longitude: 90.8167 },
  { nameEn: "Bijoynagar", nameBn: "বিজয়নগর", districtEn: "Brahmanbaria", latitude: 24.0167, longitude: 91.2500 },
  { nameEn: "Nasirnagar", nameBn: "নাসিরনগর", districtEn: "Brahmanbaria", latitude: 24.2000, longitude: 91.2167 },
  { nameEn: "Nabinagar", nameBn: "নবীনগর", districtEn: "Brahmanbaria", latitude: 23.8833, longitude: 90.9667 },
  { nameEn: "Sarail", nameBn: "সরাইল", districtEn: "Brahmanbaria", latitude: 24.1167, longitude: 91.1333 },

  // Noakhali District
  { nameEn: "Noakhali Sadar", nameBn: "নোয়াখালী সদর", districtEn: "Noakhali", latitude: 22.8696, longitude: 91.0993 },
  { nameEn: "Begumganj", nameBn: "বেগমগঞ্জ", districtEn: "Noakhali", latitude: 22.9500, longitude: 91.1000 },
  { nameEn: "Chatkhil", nameBn: "চাটখিল", districtEn: "Noakhali", latitude: 23.0500, longitude: 90.9667 },
  { nameEn: "Companiganj", nameBn: "কোম্পানীগঞ্জ", districtEn: "Noakhali", latitude: 22.7833, longitude: 91.2833 },
  { nameEn: "Hatiya", nameBn: "হাতিয়া", districtEn: "Noakhali", latitude: 22.3667, longitude: 91.1167 },
  { nameEn: "Senbagh", nameBn: "সেনবাগ", districtEn: "Noakhali", latitude: 22.9833, longitude: 91.2333 },
  { nameEn: "Sonaimuri", nameBn: "সোনাইমুড়ী", districtEn: "Noakhali", latitude: 23.0333, longitude: 91.0667 },
  { nameEn: "Subarnachar", nameBn: "সুবর্ণচর", districtEn: "Noakhali", latitude: 22.6833, longitude: 91.1500 },
  { nameEn: "Kabirhat", nameBn: "কবিরহাট", districtEn: "Noakhali", latitude: 22.8333, longitude: 91.1833 },

  // Chandpur District
  { nameEn: "Chandpur Sadar", nameBn: "চাঁদপুর সদর", districtEn: "Chandpur", latitude: 23.2333, longitude: 90.6667 },
  { nameEn: "Faridganj", nameBn: "ফরিদগঞ্জ", districtEn: "Chandpur", latitude: 23.1333, longitude: 90.7500 },
  { nameEn: "Haimchar", nameBn: "হাইমচর", districtEn: "Chandpur", latitude: 23.0667, longitude: 90.6333 },
  { nameEn: "Haziganj", nameBn: "হাজীগঞ্জ", districtEn: "Chandpur", latitude: 23.2500, longitude: 90.8500 },
  { nameEn: "Kachua", nameBn: "কচুয়া", districtEn: "Chandpur", latitude: 23.3500, longitude: 90.9000 },
  { nameEn: "Matlab Dakshin", nameBn: "মতলব দক্ষিণ", districtEn: "Chandpur", latitude: 23.3500, longitude: 90.7167 },
  { nameEn: "Matlab Uttar", nameBn: "মতলব উত্তর", districtEn: "Chandpur", latitude: 23.4667, longitude: 90.6667 },
  { nameEn: "Shahrasti", nameBn: "শাহরাস্তি", districtEn: "Chandpur", latitude: 23.2167, longitude: 90.9500 },

  // Lakshmipur District
  { nameEn: "Lakshmipur Sadar", nameBn: "লক্ষ্মীপুর সদর", districtEn: "Lakshmipur", latitude: 22.9425, longitude: 90.8412 },
  { nameEn: "Raipur", nameBn: "রায়পুর", districtEn: "Lakshmipur", latitude: 23.0333, longitude: 90.7667 },
  { nameEn: "Ramganj", nameBn: "রামগঞ্জ", districtEn: "Lakshmipur", latitude: 23.1000, longitude: 90.8667 },
  { nameEn: "Ramgati", nameBn: "রামগতি", districtEn: "Lakshmipur", latitude: 22.6167, longitude: 90.9833 },
  { nameEn: "Kamalnagar", nameBn: "কমলনগর", districtEn: "Lakshmipur", latitude: 22.7500, longitude: 90.8667 },

  // Rangamati District
  { nameEn: "Rangamati Sadar", nameBn: "রাঙ্গামাটি সদর", districtEn: "Rangamati", latitude: 22.7324, longitude: 92.2985 },
  { nameEn: "Kaptai", nameBn: "কাপ্তাই", districtEn: "Rangamati", latitude: 22.5000, longitude: 92.2167 },
  { nameEn: "Kawkhali", nameBn: "কাউখালী", districtEn: "Rangamati", latitude: 22.5500, longitude: 92.0500 },
  { nameEn: "Bagaichhari", nameBn: "বাঘাইছড়ি", districtEn: "Rangamati", latitude: 23.2000, longitude: 92.2000 },
  { nameEn: "Barkal", nameBn: "বরকল", districtEn: "Rangamati", latitude: 22.7333, longitude: 92.3667 },
  { nameEn: "Langadu", nameBn: "লংগদু", districtEn: "Rangamati", latitude: 22.9667, longitude: 92.1500 },
  { nameEn: "Naniarchar", nameBn: "নানিয়ারচর", districtEn: "Rangamati", latitude: 22.8500, longitude: 92.1167 },
  { nameEn: "Rajasthali", nameBn: "রাজস্থলী", districtEn: "Rangamati", latitude: 22.3833, longitude: 92.2500 },
  { nameEn: "Belaichhari", nameBn: "বিলাইছড়ি", districtEn: "Rangamati", latitude: 22.4833, longitude: 92.3667 },
  { nameEn: "Juraichhari", nameBn: "জুরাইছড়ি", districtEn: "Rangamati", latitude: 22.6667, longitude: 92.3833 },

  // Khagrachhari District
  { nameEn: "Khagrachhari Sadar", nameBn: "খাগড়াছড়ি সদর", districtEn: "Khagrachhari", latitude: 23.1193, longitude: 91.9847 },
  { nameEn: "Dighinala", nameBn: "দিঘীনালা", districtEn: "Khagrachhari", latitude: 23.2500, longitude: 92.0500 },
  { nameEn: "Panchhari", nameBn: "পানছড়ি", districtEn: "Khagrachhari", latitude: 23.3000, longitude: 91.9667 },
  { nameEn: "Mahalchhari", nameBn: "মহালছড়ি", districtEn: "Khagrachhari", latitude: 22.9167, longitude: 91.9833 },
  { nameEn: "Matiranga", nameBn: "মাটিরাঙ্গা", districtEn: "Khagrachhari", latitude: 23.0333, longitude: 91.8833 },
  { nameEn: "Manikchhari", nameBn: "মানিকছড়ি", districtEn: "Khagrachhari", latitude: 22.8333, longitude: 91.8333 },
  { nameEn: "Ramgarh", nameBn: "রামগড়", districtEn: "Khagrachhari", latitude: 22.9667, longitude: 91.7000 },
  { nameEn: "Guimara", nameBn: "গুইমারা", districtEn: "Khagrachhari", latitude: 22.9667, longitude: 91.8667 },
  { nameEn: "Lakshmichhari", nameBn: "লক্ষ্মীছড়ি", districtEn: "Khagrachhari", latitude: 22.7833, longitude: 91.9000 },

  // Bandarban District
  { nameEn: "Bandarban Sadar", nameBn: "বান্দরবান সদর", districtEn: "Bandarban", latitude: 22.1953, longitude: 92.2184 },
  { nameEn: "Alikadam", nameBn: "আলীকদম", districtEn: "Bandarban", latitude: 21.6500, longitude: 92.3167 },
  { nameEn: "Naikhongchhari", nameBn: "নাইক্ষ্যংছড়ি", districtEn: "Bandarban", latitude: 21.4167, longitude: 92.1833 },
  { nameEn: "Rowangchhari", nameBn: "রোয়াংছড়ি", districtEn: "Bandarban", latitude: 22.1667, longitude: 92.3333 },
  { nameEn: "Ruma", nameBn: "রুমা", districtEn: "Bandarban", latitude: 22.0500, longitude: 92.4000 },
  { nameEn: "Thanchi", nameBn: "থানচি", districtEn: "Bandarban", latitude: 21.7833, longitude: 92.4333 },
  { nameEn: "Lama", nameBn: "লামা", districtEn: "Bandarban", latitude: 21.7833, longitude: 92.2000 },

  // ==========================================
  // RAJSHAHI DIVISION
  // ==========================================
  // Rajshahi District
  { nameEn: "Boalia", nameBn: "বোয়ালিয়া", districtEn: "Rajshahi", latitude: 24.3667, longitude: 88.6000 },
  { nameEn: "Motihar", nameBn: "মতিহার", districtEn: "Rajshahi", latitude: 24.3600, longitude: 88.6300 },
  { nameEn: "Rajpara", nameBn: "রাজপাড়া", districtEn: "Rajshahi", latitude: 24.3750, longitude: 88.5800 },
  { nameEn: "Shah Makhdum", nameBn: "শাহ মখদুম", districtEn: "Rajshahi", latitude: 24.4000, longitude: 88.6167 },
  { nameEn: "Paba", nameBn: "পবা", districtEn: "Rajshahi", latitude: 24.4167, longitude: 88.6667 },
  { nameEn: "Godagari", nameBn: "গোদাগাড়ী", districtEn: "Rajshahi", latitude: 24.4667, longitude: 88.3333 },
  { nameEn: "Tanore", nameBn: "তানোর", districtEn: "Rajshahi", latitude: 24.5833, longitude: 88.5833 },
  { nameEn: "Bagmara", nameBn: "বাগমারা", districtEn: "Rajshahi", latitude: 24.5667, longitude: 88.8000 },
  { nameEn: "Durgapur", nameBn: "দুর্গাপুর", districtEn: "Rajshahi", latitude: 24.4500, longitude: 88.7667 },
  { nameEn: "Mohanpur", nameBn: "মোহনপুর", districtEn: "Rajshahi", latitude: 24.5333, longitude: 88.6500 },
  { nameEn: "Puthia", nameBn: "পুঠিয়া", districtEn: "Rajshahi", latitude: 24.3667, longitude: 88.8333 },
  { nameEn: "Charghat", nameBn: "চারঘাট", districtEn: "Rajshahi", latitude: 24.2833, longitude: 88.7500 },
  { nameEn: "Bagha", nameBn: "বাঘা", districtEn: "Rajshahi", latitude: 24.1833, longitude: 88.8333 },

  // Bogura District
  { nameEn: "Bogura Sadar", nameBn: "বগুড়া সদর", districtEn: "Bogura", latitude: 24.8465, longitude: 89.3778 },
  { nameEn: "Adamdighi", nameBn: "আদমদিঘী", districtEn: "Bogura", latitude: 24.7833, longitude: 89.0500 },
  { nameEn: "Dhunat", nameBn: "ধুনট", districtEn: "Bogura", latitude: 24.6833, longitude: 89.5333 },
  { nameEn: "Dhupchanchia", nameBn: "দুপচাঁচিয়া", districtEn: "Bogura", latitude: 24.8667, longitude: 89.1667 },
  { nameEn: "Gabtali", nameBn: "গাবতলী", districtEn: "Bogura", latitude: 24.8833, longitude: 89.5000 },
  { nameEn: "Kahaloo", nameBn: "কাহালু", districtEn: "Bogura", latitude: 24.8333, longitude: 89.2667 },
  { nameEn: "Nandigram", nameBn: "নন্দীগ্রাম", districtEn: "Bogura", latitude: 24.6500, longitude: 89.1833 },
  { nameEn: "Sahajanpur", nameBn: "শাজাহানপুর", districtEn: "Bogura", latitude: 24.7667, longitude: 89.3833 },
  { nameEn: "Sariakandi", nameBn: "সারিয়াকান্দি", districtEn: "Bogura", latitude: 24.8833, longitude: 89.6167 },
  { nameEn: "Sherpur", nameBn: "শেরপুর", districtEn: "Bogura", latitude: 24.6833, longitude: 89.4167 },
  { nameEn: "Shibganj", nameBn: "শিবগঞ্জ", districtEn: "Bogura", latitude: 25.0000, longitude: 89.3167 },
  { nameEn: "Sonatala", nameBn: "সোনাতলা", districtEn: "Bogura", latitude: 25.0333, longitude: 89.5000 },

  // Pabna District
  { nameEn: "Pabna Sadar", nameBn: "পাবনা সদর", districtEn: "Pabna", latitude: 24.0064, longitude: 89.2372 },
  { nameEn: "Atgharia", nameBn: "আটঘরিয়া", districtEn: "Pabna", latitude: 24.1333, longitude: 89.2500 },
  { nameEn: "Bera", nameBn: "বেড়া", districtEn: "Pabna", latitude: 23.9833, longitude: 89.6167 },
  { nameEn: "Bhangura", nameBn: "ভাঙ্গুড়া", districtEn: "Pabna", latitude: 24.2167, longitude: 89.4000 },
  { nameEn: "Chatmohar", nameBn: "চাটমোহর", districtEn: "Pabna", latitude: 24.2333, longitude: 89.2833 },
  { nameEn: "Faridpur", nameBn: "ফরিদপুর", districtEn: "Pabna", latitude: 24.1667, longitude: 89.4500 },
  { nameEn: "Ishwardi", nameBn: "ঈশ্বরদী", districtEn: "Pabna", latitude: 24.1333, longitude: 89.0667 },
  { nameEn: "Santhia", nameBn: "সাঁথিয়া", districtEn: "Pabna", latitude: 24.0667, longitude: 89.5333 },
  { nameEn: "Sujanagar", nameBn: "সুজানগর", districtEn: "Pabna", latitude: 23.9167, longitude: 89.4333 },

  // Sirajganj District
  { nameEn: "Sirajganj Sadar", nameBn: "সিরাজগঞ্জ সদর", districtEn: "Sirajganj", latitude: 24.4534, longitude: 89.7008 },
  { nameEn: "Belkuchi", nameBn: "বেলকুচি", districtEn: "Sirajganj", latitude: 24.2833, longitude: 89.7000 },
  { nameEn: "Chauhali", nameBn: "চৌহালী", districtEn: "Sirajganj", latitude: 24.2000, longitude: 89.7667 },
  { nameEn: "Kamarkhanda", nameBn: "কামারখন্দ", districtEn: "Sirajganj", latitude: 24.3667, longitude: 89.6500 },
  { nameEn: "Kazipur", nameBn: "কাজীপুর", districtEn: "Sirajganj", latitude: 24.6667, longitude: 89.6500 },
  { nameEn: "Raiganj", nameBn: "রায়গঞ্জ", districtEn: "Sirajganj", latitude: 24.5167, longitude: 89.5333 },
  { nameEn: "Shahjadpur", nameBn: "শাহজাদপুর", districtEn: "Sirajganj", latitude: 24.1667, longitude: 89.6000 },
  { nameEn: "Tarash", nameBn: "তাড়াশ", districtEn: "Sirajganj", latitude: 24.4333, longitude: 89.3667 },
  { nameEn: "Ullahpara", nameBn: "উল্লাপাড়া", districtEn: "Sirajganj", latitude: 24.3167, longitude: 89.5667 },

  // Naogaon District
  { nameEn: "Naogaon Sadar", nameBn: "নওগাঁ সদর", districtEn: "Naogaon", latitude: 24.7936, longitude: 88.9318 },
  { nameEn: "Atrai", nameBn: "আত্রাই", districtEn: "Naogaon", latitude: 24.6167, longitude: 88.9667 },
  { nameEn: "Badalgachhi", nameBn: "বদলগাছী", districtEn: "Naogaon", latitude: 24.9667, longitude: 88.9000 },
  { nameEn: "Dhamoirhat", nameBn: "ধামইরহাট", districtEn: "Naogaon", latitude: 25.1333, longitude: 88.8667 },
  { nameEn: "Manda", nameBn: "মান্দা", districtEn: "Naogaon", latitude: 24.7833, longitude: 88.6667 },
  { nameEn: "Mohadevpur", nameBn: "মহাদেবপুর", districtEn: "Naogaon", latitude: 24.9167, longitude: 88.7500 },
  { nameEn: "Niamatpur", nameBn: "নিয়ামতপুর", districtEn: "Naogaon", latitude: 24.8500, longitude: 88.5667 },
  { nameEn: "Patnitala", nameBn: "পত্নীতলা", districtEn: "Naogaon", latitude: 25.0500, longitude: 88.7333 },
  { nameEn: "Porsha", nameBn: "পোরশা", districtEn: "Naogaon", latitude: 25.0333, longitude: 88.4833 },
  { nameEn: "Raninagar", nameBn: "রানীনগর", districtEn: "Naogaon", latitude: 24.7167, longitude: 88.9833 },
  { nameEn: "Sapahar", nameBn: "সাপাহার", districtEn: "Naogaon", latitude: 25.1333, longitude: 88.5833 },

  // Natore District
  { nameEn: "Natore Sadar", nameBn: "নাটোর সদর", districtEn: "Natore", latitude: 24.4206, longitude: 88.9324 },
  { nameEn: "Bagatipara", nameBn: "বাগাতিপাড়া", districtEn: "Natore", latitude: 24.3333, longitude: 88.9500 },
  { nameEn: "Baraigram", nameBn: "বড়াইগ্রাম", districtEn: "Natore", latitude: 24.3000, longitude: 89.1667 },
  { nameEn: "Gurudaspur", nameBn: "গুরুদাসপুর", districtEn: "Natore", latitude: 24.5333, longitude: 89.1500 },
  { nameEn: "Lalpur", nameBn: "লালপুর", districtEn: "Natore", latitude: 24.1833, longitude: 88.9833 },
  { nameEn: "Singra", nameBn: "সিংড়া", districtEn: "Natore", latitude: 24.5000, longitude: 89.1500 },
  { nameEn: "Naldanga", nameBn: "নলডাঙ্গা", districtEn: "Natore", latitude: 24.4833, longitude: 88.9167 },

  // Joypurhat District
  { nameEn: "Joypurhat Sadar", nameBn: "জয়পুরহাট সদর", districtEn: "Joypurhat", latitude: 25.1015, longitude: 89.0277 },
  { nameEn: "Akkelpur", nameBn: "আক্কেলপুর", districtEn: "Joypurhat", latitude: 24.9833, longitude: 89.0167 },
  { nameEn: "Kalai", nameBn: "কালাই", districtEn: "Joypurhat", latitude: 25.0667, longitude: 89.1833 },
  { nameEn: "Khetlal", nameBn: "ক্ষেতলাল", districtEn: "Joypurhat", latitude: 24.9667, longitude: 89.1333 },
  { nameEn: "Panchbibi", nameBn: "পাঁচবিবি", districtEn: "Joypurhat", latitude: 25.1833, longitude: 89.0167 },

  // Chapainawabganj District
  { nameEn: "Chapainawabganj Sadar", nameBn: "চাঁপাইনবাবগঞ্জ সদর", districtEn: "Chapainawabganj", latitude: 24.5965, longitude: 88.2775 },
  { nameEn: "Bholahat", nameBn: "ভোলাহাট", districtEn: "Chapainawabganj", latitude: 24.8833, longitude: 88.2500 },
  { nameEn: "Gomastapur", nameBn: "গোমস্তাপুর", districtEn: "Chapainawabganj", latitude: 24.7833, longitude: 88.2833 },
  { nameEn: "Nachole", nameBn: "নাচোল", districtEn: "Chapainawabganj", latitude: 24.7333, longitude: 88.4167 },
  { nameEn: "Shibganj", nameBn: "শিবগঞ্জ", districtEn: "Chapainawabganj", latitude: 24.6833, longitude: 88.1667 },

  // ==========================================
  // KHULNA DIVISION
  // ==========================================
  // Khulna District
  { nameEn: "Khulna Sadar", nameBn: "খুলনা সদর", districtEn: "Khulna", latitude: 22.8167, longitude: 89.5667 },
  { nameEn: "Sonadanga", nameBn: "সোনাডাঙ্গা", districtEn: "Khulna", latitude: 22.8167, longitude: 89.5333 },
  { nameEn: "Khalishpur", nameBn: "খালিশপুর", districtEn: "Khulna", latitude: 22.8667, longitude: 89.5333 },
  { nameEn: "Daulatpur", nameBn: "দৌলতপুর", districtEn: "Khulna", latitude: 22.8833, longitude: 89.5167 },
  { nameEn: "Batiaghata", nameBn: "বটিয়াঘাটা", districtEn: "Khulna", latitude: 22.7333, longitude: 89.5333 },
  { nameEn: "Dacope", nameBn: "দাকোপ", districtEn: "Khulna", latitude: 22.5667, longitude: 89.5167 },
  { nameEn: "Dumuria", nameBn: "ডুমুরিয়া", districtEn: "Khulna", latitude: 22.8000, longitude: 89.4167 },
  { nameEn: "Dighalia", nameBn: "দিঘলিয়া", districtEn: "Khulna", latitude: 22.9000, longitude: 89.5333 },
  { nameEn: "Koyra", nameBn: "কয়রা", districtEn: "Khulna", latitude: 22.3333, longitude: 89.3000 },
  { nameEn: "Paikgachha", nameBn: "পাইকগাছা", districtEn: "Khulna", latitude: 22.5833, longitude: 89.3333 },
  { nameEn: "Phultala", nameBn: "ফুলতলা", districtEn: "Khulna", latitude: 22.9667, longitude: 89.4667 },
  { nameEn: "Rupsha", nameBn: "রূপসা", districtEn: "Khulna", latitude: 22.8333, longitude: 89.5833 },
  { nameEn: "Terokhada", nameBn: "তেরখাদা", districtEn: "Khulna", latitude: 22.9333, longitude: 89.6667 },

  // Jashore District
  { nameEn: "Jashore Sadar", nameBn: "যশোর সদর", districtEn: "Jashore", latitude: 23.1664, longitude: 89.2081 },
  { nameEn: "Abhaynagar", nameBn: "অভয়নগর", districtEn: "Jashore", latitude: 23.0167, longitude: 89.4333 },
  { nameEn: "Bagherpara", nameBn: "বাঘারপাড়া", districtEn: "Jashore", latitude: 23.2167, longitude: 89.3500 },
  { nameEn: "Chaugachha", nameBn: "চৌগাছা", districtEn: "Jashore", latitude: 23.2667, longitude: 89.0333 },
  { nameEn: "Jhikargachha", nameBn: "ঝিকরগাছা", districtEn: "Jashore", latitude: 23.1000, longitude: 89.1333 },
  { nameEn: "Keshabpur", nameBn: "কেশবপুর", districtEn: "Jashore", latitude: 22.9000, longitude: 89.2167 },
  { nameEn: "Manirampur", nameBn: "মণিরামপুর", districtEn: "Jashore", latitude: 23.0167, longitude: 89.2333 },
  { nameEn: "Sharsha", nameBn: "শার্শা", districtEn: "Jashore", latitude: 23.0833, longitude: 88.8667 },

  // Satkhira District
  { nameEn: "Satkhira Sadar", nameBn: "সাতক্ষীরা সদর", districtEn: "Satkhira", latitude: 22.7185, longitude: 89.0705 },
  { nameEn: "Assasuni", nameBn: "আশাশুনি", districtEn: "Satkhira", latitude: 22.5500, longitude: 89.1667 },
  { nameEn: "Debhata", nameBn: "দেবহাটা", districtEn: "Satkhira", latitude: 22.5667, longitude: 88.9667 },
  { nameEn: "Kalaroa", nameBn: "কলারোয়া", districtEn: "Satkhira", latitude: 22.8667, longitude: 89.0333 },
  { nameEn: "Kaliganj", nameBn: "কালীগঞ্জ", districtEn: "Satkhira", latitude: 22.4500, longitude: 89.0333 },
  { nameEn: "Shyamnagar", nameBn: "শ্যামনগর", districtEn: "Satkhira", latitude: 22.3333, longitude: 89.1000 },
  { nameEn: "Tala", nameBn: "তালা", districtEn: "Satkhira", latitude: 22.7500, longitude: 89.2500 },

  // Bagerhat District
  { nameEn: "Bagerhat Sadar", nameBn: "বাগেরহাট সদর", districtEn: "Bagerhat", latitude: 22.6516, longitude: 89.7859 },
  { nameEn: "Chitalmari", nameBn: "চিতলমারী", districtEn: "Bagerhat", latitude: 22.7833, longitude: 89.8667 },
  { nameEn: "Fakirhat", nameBn: "ফকিরহাট", districtEn: "Bagerhat", latitude: 22.7833, longitude: 89.7000 },
  { nameEn: "Kachua", nameBn: "কচুয়া", districtEn: "Bagerhat", latitude: 22.6500, longitude: 89.8833 },
  { nameEn: "Mollahat", nameBn: "মোল্লাহাট", districtEn: "Bagerhat", latitude: 22.9333, longitude: 89.8167 },
  { nameEn: "Mongla", nameBn: "মোংলা", districtEn: "Bagerhat", latitude: 22.4833, longitude: 89.6000 },
  { nameEn: "Morrelganj", nameBn: "মোরেলগঞ্জ", districtEn: "Bagerhat", latitude: 22.4500, longitude: 89.8500 },
  { nameEn: "Rampal", nameBn: "রামপাল", districtEn: "Bagerhat", latitude: 22.5667, longitude: 89.6667 },
  { nameEn: "Sarankhola", nameBn: "শরণখোলা", districtEn: "Bagerhat", latitude: 22.3000, longitude: 89.7833 },

  // Kushtia District
  { nameEn: "Kushtia Sadar", nameBn: "কুষ্টিয়া সদর", districtEn: "Kushtia", latitude: 23.9013, longitude: 89.1205 },
  { nameEn: "Bheramara", nameBn: "ভেড়ামারা", districtEn: "Kushtia", latitude: 24.0167, longitude: 88.9833 },
  { nameEn: "Daulatpur", nameBn: "দৌলতপুর", districtEn: "Kushtia", latitude: 24.0000, longitude: 88.8667 },
  { nameEn: "Khoksa", nameBn: "খোকসা", districtEn: "Kushtia", latitude: 23.8000, longitude: 89.2833 },
  { nameEn: "Kumarkhali", nameBn: "কুমারখালী", districtEn: "Kushtia", latitude: 23.8667, longitude: 89.2500 },
  { nameEn: "Mirpur", nameBn: "মিরপুর", districtEn: "Kushtia", latitude: 23.9167, longitude: 88.9833 },

  // Jhenaidah District
  { nameEn: "Jhenaidah Sadar", nameBn: "ঝিনাইদহ সদর", districtEn: "Jhenaidah", latitude: 23.5448, longitude: 89.1539 },
  { nameEn: "Harinakundu", nameBn: "হরিণাকুণ্ডু", districtEn: "Jhenaidah", latitude: 23.6500, longitude: 89.0500 },
  { nameEn: "Kaliganj", nameBn: "কালীগঞ্জ", districtEn: "Jhenaidah", latitude: 23.4167, longitude: 89.1333 },
  { nameEn: "Kotchandpur", nameBn: "কোটচাঁদপুর", districtEn: "Jhenaidah", latitude: 23.4000, longitude: 89.0167 },
  { nameEn: "Maheshpur", nameBn: "মহেশপুর", districtEn: "Jhenaidah", latitude: 23.3500, longitude: 88.9167 },
  { nameEn: "Shailkupa", nameBn: "শৈলকুপা", districtEn: "Jhenaidah", latitude: 23.6833, longitude: 89.2500 },

  // Chuadanga District
  { nameEn: "Chuadanga Sadar", nameBn: "চুয়াডাঙ্গা সদর", districtEn: "Chuadanga", latitude: 23.6402, longitude: 88.8418 },
  { nameEn: "Alamdanga", nameBn: "আলমডাঙ্গা", districtEn: "Chuadanga", latitude: 23.7667, longitude: 88.9000 },
  { nameEn: "Damurhuda", nameBn: "দামুড়হুদা", districtEn: "Chuadanga", latitude: 23.6167, longitude: 88.7833 },
  { nameEn: "Jibannagar", nameBn: "জীবননগর", districtEn: "Chuadanga", latitude: 23.4167, longitude: 88.8167 },

  // Meherpur District
  { nameEn: "Meherpur Sadar", nameBn: "মেহেরপুর সদর", districtEn: "Meherpur", latitude: 23.7622, longitude: 88.6318 },
  { nameEn: "Gangni", nameBn: "গাংনী", districtEn: "Meherpur", latitude: 23.8000, longitude: 88.7167 },
  { nameEn: "Mujibnagar", nameBn: "মুজিবনগর", districtEn: "Meherpur", latitude: 23.6500, longitude: 88.6000 },

  // Magura District
  { nameEn: "Magura Sadar", nameBn: "মাগুরা সদর", districtEn: "Magura", latitude: 23.4873, longitude: 89.4199 },
  { nameEn: "Mohammadpur", nameBn: "মোহাম্মদপুর", districtEn: "Magura", latitude: 23.4000, longitude: 89.6000 },
  { nameEn: "Shalikha", nameBn: "শালিখা", districtEn: "Magura", latitude: 23.3500, longitude: 89.3333 },
  { nameEn: "Sreepur", nameBn: "শ্রীপুর", districtEn: "Magura", latitude: 23.6000, longitude: 89.4333 },

  // Narail District
  { nameEn: "Narail Sadar", nameBn: "নড়াইল সদর", districtEn: "Narail", latitude: 23.1725, longitude: 89.5127 },
  { nameEn: "Kalia", nameBn: "কালিয়া", districtEn: "Narail", latitude: 23.0333, longitude: 89.6333 },
  { nameEn: "Lohagara", nameBn: "লোহাগড়া", districtEn: "Narail", latitude: 23.1833, longitude: 89.6500 },

  // ==========================================
  // BARISHAL DIVISION
  // ==========================================
  // Barishal District
  { nameEn: "Barishal Sadar", nameBn: "বরিশাল সদর", districtEn: "Barishal", latitude: 22.7010, longitude: 90.3535 },
  { nameEn: "Agailjhara", nameBn: "আগৈলঝাড়া", districtEn: "Barishal", latitude: 22.9667, longitude: 90.1500 },
  { nameEn: "Babuganj", nameBn: "বাবুগঞ্জ", districtEn: "Barishal", latitude: 22.8333, longitude: 90.3167 },
  { nameEn: "Bakerganj", nameBn: "বাকেরগঞ্জ", districtEn: "Barishal", latitude: 22.5500, longitude: 90.3333 },
  { nameEn: "Banaripara", nameBn: "বানারীপাড়া", districtEn: "Barishal", latitude: 22.7833, longitude: 90.1667 },
  { nameEn: "Gaurnadi", nameBn: "গৌরনদী", districtEn: "Barishal", latitude: 22.9667, longitude: 90.2333 },
  { nameEn: "Hizla", nameBn: "হিজলা", districtEn: "Barishal", latitude: 22.9000, longitude: 90.5000 },
  { nameEn: "Mehendiganj", nameBn: "মেহেন্দিগঞ্জ", districtEn: "Barishal", latitude: 22.8167, longitude: 90.5333 },
  { nameEn: "Muladi", nameBn: "মুলাদী", districtEn: "Barishal", latitude: 22.9167, longitude: 90.4167 },
  { nameEn: "Wazirpur", nameBn: "উজিরপুর", districtEn: "Barishal", latitude: 22.8167, longitude: 90.2500 },

  // Patuakhali District
  { nameEn: "Patuakhali Sadar", nameBn: "পটুয়াখালী সদর", districtEn: "Patuakhali", latitude: 22.3596, longitude: 90.3299 },
  { nameEn: "Bauphal", nameBn: "বাউফল", districtEn: "Patuakhali", latitude: 22.4167, longitude: 90.5667 },
  { nameEn: "Dashmina", nameBn: "দশমিনা", districtEn: "Patuakhali", latitude: 22.2833, longitude: 90.5833 },
  { nameEn: "Galachipa", nameBn: "গলাচিপা", districtEn: "Patuakhali", latitude: 22.1667, longitude: 90.4333 },
  { nameEn: "Kalapara", nameBn: "কলাপাড়া", districtEn: "Patuakhali", latitude: 21.9833, longitude: 90.2333 },
  { nameEn: "Kuakata", nameBn: "কুয়াকাটা", districtEn: "Patuakhali", latitude: 21.8167, longitude: 90.1167 },
  { nameEn: "Mirzaganj", nameBn: "মির্জাগঞ্জ", districtEn: "Patuakhali", latitude: 22.3667, longitude: 90.2333 },
  { nameEn: "Rangabali", nameBn: "রাঙ্গাবালী", districtEn: "Patuakhali", latitude: 21.9167, longitude: 90.4667 },
  { nameEn: "Dumki", nameBn: "দুমকি", districtEn: "Patuakhali", latitude: 22.4500, longitude: 90.3833 },

  // Bhola District
  { nameEn: "Bhola Sadar", nameBn: "ভোলা সদর", districtEn: "Bhola", latitude: 22.6859, longitude: 90.6482 },
  { nameEn: "Burhanuddin", nameBn: "বোরহানউদ্দিন", districtEn: "Bhola", latitude: 22.5000, longitude: 90.7167 },
  { nameEn: "Char Fasson", nameBn: "চরফ্যাসন", districtEn: "Bhola", latitude: 22.1833, longitude: 90.7167 },
  { nameEn: "Daulatkhan", nameBn: "দৌলতখান", districtEn: "Bhola", latitude: 22.6167, longitude: 90.7667 },
  { nameEn: "Lalmohan", nameBn: "লালমোহন", districtEn: "Bhola", latitude: 22.3333, longitude: 90.7333 },
  { nameEn: "Manpura", nameBn: "মনপুরা", districtEn: "Bhola", latitude: 22.3000, longitude: 90.9667 },
  { nameEn: "Tazumuddin", nameBn: "তজুমদ্দিন", districtEn: "Bhola", latitude: 22.4167, longitude: 90.8500 },

  // Pirojpur District
  { nameEn: "Pirojpur Sadar", nameBn: "পিরোজপুর সদর", districtEn: "Pirojpur", latitude: 22.5841, longitude: 89.9720 },
  { nameEn: "Bhandaria", nameBn: "ভাণ্ডারিয়া", districtEn: "Pirojpur", latitude: 22.4833, longitude: 90.0667 },
  { nameEn: "Kawkhali", nameBn: "কাউখালী", districtEn: "Pirojpur", latitude: 22.6167, longitude: 90.0667 },
  { nameEn: "Mathbaria", nameBn: "মঠবাড়িয়া", districtEn: "Pirojpur", latitude: 22.2833, longitude: 89.9667 },
  { nameEn: "Nazirpur", nameBn: "নাজিরপুর", districtEn: "Pirojpur", latitude: 22.7167, longitude: 89.9667 },
  { nameEn: "Nesarabad", nameBn: "নেছারাবাদ (স্বরূপকাঠি)", districtEn: "Pirojpur", latitude: 22.7500, longitude: 90.1000 },
  { nameEn: "Indurkani", nameBn: "ইন্দুরকানী", districtEn: "Pirojpur", latitude: 22.5167, longitude: 89.9500 },

  // Barguna District
  { nameEn: "Barguna Sadar", nameBn: "বরগুনা সদর", districtEn: "Barguna", latitude: 22.0953, longitude: 90.1121 },
  { nameEn: "Amtali", nameBn: "আমতলী", districtEn: "Barguna", latitude: 22.1333, longitude: 90.2333 },
  { nameEn: "Bamna", nameBn: "বামনা", districtEn: "Barguna", latitude: 22.3000, longitude: 90.0833 },
  { nameEn: "Betagi", nameBn: "বেতাগী", districtEn: "Barguna", latitude: 22.4167, longitude: 90.1667 },
  { nameEn: "Patharghata", nameBn: "পাথরঘাটা", districtEn: "Barguna", latitude: 22.0500, longitude: 89.9667 },
  { nameEn: "Taltali", nameBn: "তালতলী", districtEn: "Barguna", latitude: 22.0833, longitude: 90.1833 },

  // Jhalokathi District
  { nameEn: "Jhalokathi Sadar", nameBn: "ঝালকাঠি সদর", districtEn: "Jhalokathi", latitude: 22.6406, longitude: 90.1987 },
  { nameEn: "Kathalia", nameBn: "কাঠালিয়া", districtEn: "Jhalokathi", latitude: 22.4167, longitude: 90.1333 },
  { nameEn: "Nalchhiti", nameBn: "নলছিটি", districtEn: "Jhalokathi", latitude: 22.6000, longitude: 90.2667 },
  { nameEn: "Rajapur", nameBn: "রাজাপুর", districtEn: "Jhalokathi", latitude: 22.5500, longitude: 90.1333 },

  // ==========================================
  // SYLHET DIVISION
  // ==========================================
  // Sylhet District
  { nameEn: "Sylhet Sadar", nameBn: "সিলেট সদর", districtEn: "Sylhet", latitude: 24.8949, longitude: 91.8687 },
  { nameEn: "Beanibazar", nameBn: "বিয়ানীবাজার", districtEn: "Sylhet", latitude: 24.8333, longitude: 92.1667 },
  { nameEn: "Bishwanath", nameBn: "বিশ্বনাথ", districtEn: "Sylhet", latitude: 24.7833, longitude: 91.7333 },
  { nameEn: "Dakshin Surma", nameBn: "দক্ষিণ সুরমা", districtEn: "Sylhet", latitude: 24.8500, longitude: 91.8833 },
  { nameEn: "Fenchuganj", nameBn: "ফেঞ্চুগঞ্জ", districtEn: "Sylhet", latitude: 24.7000, longitude: 91.9333 },
  { nameEn: "Golapganj", nameBn: "গোলাপগঞ্জ", districtEn: "Sylhet", latitude: 24.8667, longitude: 92.0167 },
  { nameEn: "Gowainghat", nameBn: "গোয়াইনঘাট", districtEn: "Sylhet", latitude: 25.1000, longitude: 91.9667 },
  { nameEn: "Jaintiapur", nameBn: "জৈন্তাপুর", districtEn: "Sylhet", latitude: 25.1333, longitude: 92.1167 },
  { nameEn: "Kanaighat", nameBn: "কানাইঘাট", districtEn: "Sylhet", latitude: 25.0167, longitude: 92.2667 },
  { nameEn: "Companiganj", nameBn: "কোম্পানীগঞ্জ", districtEn: "Sylhet", latitude: 25.0833, longitude: 91.7500 },
  { nameEn: "Zakiganj", nameBn: "জকিগঞ্জ", districtEn: "Sylhet", latitude: 24.8833, longitude: 92.3667 },
  { nameEn: "Balaganj", nameBn: "বালাগঞ্জ", districtEn: "Sylhet", latitude: 24.6667, longitude: 91.8333 },
  { nameEn: "Osmani Nagar", nameBn: "ওসমানী নগর", districtEn: "Sylhet", latitude: 24.7167, longitude: 91.7500 },

  // Moulvibazar District
  { nameEn: "Moulvibazar Sadar", nameBn: "মৌলভীবাজার সদর", districtEn: "Moulvibazar", latitude: 24.4829, longitude: 91.7774 },
  { nameEn: "Barlekha", nameBn: "বড়লেখা", districtEn: "Moulvibazar", latitude: 24.7000, longitude: 92.2000 },
  { nameEn: "Juri", nameBn: "জুড়ী", districtEn: "Moulvibazar", latitude: 24.6000, longitude: 92.1167 },
  { nameEn: "Kamalganj", nameBn: "কমলগঞ্জ", districtEn: "Moulvibazar", latitude: 24.3667, longitude: 91.8667 },
  { nameEn: "Kulaura", nameBn: "কুলাউড়া", districtEn: "Moulvibazar", latitude: 24.5167, longitude: 92.0333 },
  { nameEn: "Rajnagar", nameBn: "রাজনগর", districtEn: "Moulvibazar", latitude: 24.5333, longitude: 91.8667 },
  { nameEn: "Sreemangal", nameBn: "শ্রীমঙ্গল", districtEn: "Moulvibazar", latitude: 24.3065, longitude: 91.7297 },

  // Habiganj District
  { nameEn: "Habiganj Sadar", nameBn: "হবিগঞ্জ সদর", districtEn: "Habiganj", latitude: 24.3749, longitude: 91.4155 },
  { nameEn: "Ajmiriganj", nameBn: "আজমিরীগঞ্জ", districtEn: "Habiganj", latitude: 24.5500, longitude: 91.2500 },
  { nameEn: "Bahubal", nameBn: "বাহুবল", districtEn: "Habiganj", latitude: 24.3500, longitude: 91.5500 },
  { nameEn: "Baniyachong", nameBn: "বানিয়াচং", districtEn: "Habiganj", latitude: 24.5167, longitude: 91.3667 },
  { nameEn: "Chunarughat", nameBn: "চুনারুঘাট", districtEn: "Habiganj", latitude: 24.2167, longitude: 91.5167 },
  { nameEn: "Lakhai", nameBn: "লাখাই", districtEn: "Habiganj", latitude: 24.2833, longitude: 91.2167 },
  { nameEn: "Madhabpur", nameBn: "মাধবপুর", districtEn: "Habiganj", latitude: 24.1000, longitude: 91.3000 },
  { nameEn: "Nabiganj", nameBn: "নবীগঞ্জ", districtEn: "Habiganj", latitude: 24.5667, longitude: 91.5167 },
  { nameEn: "Sayestaganj", nameBn: "শায়েস্তাগঞ্জ", districtEn: "Habiganj", latitude: 24.2833, longitude: 91.4667 },

  // Sunamganj District
  { nameEn: "Sunamganj Sadar", nameBn: "সুনামগঞ্জ সদর", districtEn: "Sunamganj", latitude: 25.0658, longitude: 91.3950 },
  { nameEn: "Bishwamvarpur", nameBn: "বিশ্বম্ভরপুর", districtEn: "Sunamganj", latitude: 25.2000, longitude: 91.3000 },
  { nameEn: "Chhatak", nameBn: "ছাতক", districtEn: "Sunamganj", latitude: 25.0333, longitude: 91.6667 },
  { nameEn: "Derai", nameBn: "দেরাই", districtEn: "Sunamganj", latitude: 24.7833, longitude: 91.3500 },
  { nameEn: "Dharamapasha", nameBn: "ধর্মপাশা", districtEn: "Sunamganj", latitude: 24.9000, longitude: 91.0167 },
  { nameEn: "Dowarabazar", nameBn: "দোয়ারাবাজার", districtEn: "Sunamganj", latitude: 25.0500, longitude: 91.5667 },
  { nameEn: "Jagannathpur", nameBn: "জগন্নাথপুর", districtEn: "Sunamganj", latitude: 24.7667, longitude: 91.5500 },
  { nameEn: "Jamalganj", nameBn: "জামালগঞ্জ", districtEn: "Sunamganj", latitude: 25.0000, longitude: 91.2333 },
  { nameEn: "Sullah", nameBn: "শাল্লা", districtEn: "Sunamganj", latitude: 24.6500, longitude: 91.2833 },
  { nameEn: "Tahirpur", nameBn: "তাহিরপুর", districtEn: "Sunamganj", latitude: 25.2000, longitude: 91.1833 },
  { nameEn: "Shantiganj", nameBn: "শান্তিগঞ্জ", districtEn: "Sunamganj", latitude: 24.9167, longitude: 91.4500 },
  { nameEn: "Madhyanagar", nameBn: "মধ্যনগর", districtEn: "Sunamganj", latitude: 25.0667, longitude: 90.9833 },

  // ==========================================
  // RANGPUR DIVISION
  // ==========================================
  // Rangpur District
  { nameEn: "Rangpur Sadar", nameBn: "রংপুর সদর", districtEn: "Rangpur", latitude: 25.7439, longitude: 89.2752 },
  { nameEn: "Badarganj", nameBn: "বদরগঞ্জ", districtEn: "Rangpur", latitude: 25.6833, longitude: 89.0500 },
  { nameEn: "Gangachhara", nameBn: "গংগাচড়া", districtEn: "Rangpur", latitude: 25.8500, longitude: 89.2333 },
  { nameEn: "Kaunia", nameBn: "কাউনিয়া", districtEn: "Rangpur", latitude: 25.7667, longitude: 89.4167 },
  { nameEn: "Mithapukur", nameBn: "মিঠাপুকুর", districtEn: "Rangpur", latitude: 25.5833, longitude: 89.2833 },
  { nameEn: "Pirgachha", nameBn: "পীরগাছা", districtEn: "Rangpur", latitude: 25.5833, longitude: 89.4000 },
  { nameEn: "Pirganj", nameBn: "পীরগঞ্জ", districtEn: "Rangpur", latitude: 25.4167, longitude: 89.3167 },
  { nameEn: "Taraganj", nameBn: "তারাগঞ্জ", districtEn: "Rangpur", latitude: 25.8667, longitude: 89.0167 },

  // Dinajpur District
  { nameEn: "Dinajpur Sadar", nameBn: "দিনাজপুর সদর", districtEn: "Dinajpur", latitude: 25.6217, longitude: 88.6355 },
  { nameEn: "Birampur", nameBn: "বিরামপুর", districtEn: "Dinajpur", latitude: 25.2333, longitude: 88.9000 },
  { nameEn: "Birganj", nameBn: "বীরগঞ্জ", districtEn: "Dinajpur", latitude: 25.8500, longitude: 88.6667 },
  { nameEn: "Birol", nameBn: "বিরল", districtEn: "Dinajpur", latitude: 25.6333, longitude: 88.5500 },
  { nameEn: "Bochaganj", nameBn: "বোচাগঞ্জ", districtEn: "Dinajpur", latitude: 25.8000, longitude: 88.4667 },
  { nameEn: "Chirirbandar", nameBn: "চিরিরবন্দর", districtEn: "Dinajpur", latitude: 25.6500, longitude: 88.7833 },
  { nameEn: "Phulbari", nameBn: "ফুলবাড়ী", districtEn: "Dinajpur", latitude: 25.3833, longitude: 88.8833 },
  { nameEn: "Ghoraghat", nameBn: "ঘোড়াঘাট", districtEn: "Dinajpur", latitude: 25.2500, longitude: 89.2167 },
  { nameEn: "Hakimpur", nameBn: "হাকিমপুর", districtEn: "Dinajpur", latitude: 25.2833, longitude: 89.0167 },
  { nameEn: "Kaharole", nameBn: "কাহারোল", districtEn: "Dinajpur", latitude: 25.7833, longitude: 88.6000 },
  { nameEn: "Khansama", nameBn: "খানসামা", districtEn: "Dinajpur", latitude: 25.9167, longitude: 88.7167 },
  { nameEn: "Nawabganj", nameBn: "নবাবগঞ্জ", districtEn: "Dinajpur", latitude: 25.4167, longitude: 89.0833 },
  { nameEn: "Parbatipur", nameBn: "পার্বতীপুর", districtEn: "Dinajpur", latitude: 25.6667, longitude: 88.9167 },

  // Gaibandha District
  { nameEn: "Gaibandha Sadar", nameBn: "গাইবান্ধা সদর", districtEn: "Gaibandha", latitude: 25.3288, longitude: 89.5406 },
  { nameEn: "Fulchhari", nameBn: "ফুলছড়ি", districtEn: "Gaibandha", latitude: 25.2000, longitude: 89.6167 },
  { nameEn: "Gobindaganj", nameBn: "গোবিন্দগঞ্জ", districtEn: "Gaibandha", latitude: 25.1333, longitude: 89.3833 },
  { nameEn: "Palashbari", nameBn: "পলাশবাড়ী", districtEn: "Gaibandha", latitude: 25.2833, longitude: 89.3500 },
  { nameEn: "Sadullapur", nameBn: "সাদুল্লাপুর", districtEn: "Gaibandha", latitude: 25.3833, longitude: 89.4667 },
  { nameEn: "Sughatta", nameBn: "সাঘাটা", districtEn: "Gaibandha", latitude: 25.1000, longitude: 89.5833 },
  { nameEn: "Sundarganj", nameBn: "সুন্দরগঞ্জ", districtEn: "Gaibandha", latitude: 25.5667, longitude: 89.5167 },

  // Kurigram District
  { nameEn: "Kurigram Sadar", nameBn: "কুড়িগ্রাম সদর", districtEn: "Kurigram", latitude: 25.8054, longitude: 89.6362 },
  { nameEn: "Bhurungamari", nameBn: "ভুরুঙ্গামারী", districtEn: "Kurigram", latitude: 26.1333, longitude: 89.6833 },
  { nameEn: "Char Rajibpur", nameBn: "চর রাজিবপুর", districtEn: "Kurigram", latitude: 25.4000, longitude: 89.7000 },
  { nameEn: "Chilmari", nameBn: "চিলমারী", districtEn: "Kurigram", latitude: 25.5667, longitude: 89.6833 },
  { nameEn: "Phulbari", nameBn: "ফুলবাড়ী", districtEn: "Kurigram", latitude: 25.9500, longitude: 89.5667 },
  { nameEn: "Nageshwari", nameBn: "নাগেশ্বরী", districtEn: "Kurigram", latitude: 25.9667, longitude: 89.6833 },
  { nameEn: "Rajarhat", nameBn: "রাজারহাট", districtEn: "Kurigram", latitude: 25.8000, longitude: 89.5500 },
  { nameEn: "Raomari", nameBn: "রৌমারী", districtEn: "Kurigram", latitude: 25.5667, longitude: 89.8500 },
  { nameEn: "Ulipur", nameBn: "উলিপুর", districtEn: "Kurigram", latitude: 25.6667, longitude: 89.6333 },

  // Lalmonirhat District
  { nameEn: "Lalmonirhat Sadar", nameBn: "লালমনিরহাট সদর", districtEn: "Lalmonirhat", latitude: 25.9923, longitude: 89.2847 },
  { nameEn: "Aditmari", nameBn: "আদিতমারী", districtEn: "Lalmonirhat", latitude: 25.9167, longitude: 89.1500 },
  { nameEn: "Hatibandha", nameBn: "হাতীবান্ধা", districtEn: "Lalmonirhat", latitude: 26.1167, longitude: 89.1333 },
  { nameEn: "Kaliganj", nameBn: "কালীগঞ্জ", districtEn: "Lalmonirhat", latitude: 25.9833, longitude: 89.2167 },
  { nameEn: "Patgram", nameBn: "পাটগ্রাম", districtEn: "Lalmonirhat", latitude: 26.3500, longitude: 89.0167 },

  // Nilphamari District
  { nameEn: "Nilphamari Sadar", nameBn: "নীলফামারী সদর", districtEn: "Nilphamari", latitude: 25.9318, longitude: 88.8560 },
  { nameEn: "Dimla", nameBn: "ডিমলা", districtEn: "Nilphamari", latitude: 26.1333, longitude: 88.9333 },
  { nameEn: "Domar", nameBn: "ডোমার", districtEn: "Nilphamari", latitude: 26.1000, longitude: 88.8333 },
  { nameEn: "Jaldhaka", nameBn: "জলঢাকা", districtEn: "Nilphamari", latitude: 26.0167, longitude: 89.0333 },
  { nameEn: "Kishoreganj", nameBn: "কিশোরগঞ্জ", districtEn: "Nilphamari", latitude: 25.9167, longitude: 89.0333 },
  { nameEn: "Syedpur", nameBn: "সৈয়দপুর", districtEn: "Nilphamari", latitude: 25.7833, longitude: 88.9000 },

  // Panchagarh District
  { nameEn: "Panchagarh Sadar", nameBn: "পঞ্চগড় সদর", districtEn: "Panchagarh", latitude: 26.3411, longitude: 88.5542 },
  { nameEn: "Atwari", nameBn: "আটোয়ারী", districtEn: "Panchagarh", latitude: 26.3000, longitude: 88.5000 },
  { nameEn: "Boda", nameBn: "বোদা", districtEn: "Panchagarh", latitude: 26.2000, longitude: 88.6000 },
  { nameEn: "Debiganj", nameBn: "দেবীগঞ্জ", districtEn: "Panchagarh", latitude: 26.1167, longitude: 88.7500 },
  { nameEn: "Tetulia", nameBn: "তেঁতুলিয়া", districtEn: "Panchagarh", latitude: 26.4833, longitude: 88.3500 },

  // Thakurgaon District
  { nameEn: "Thakurgaon Sadar", nameBn: "ঠাকুরগাঁও সদর", districtEn: "Thakurgaon", latitude: 26.0337, longitude: 88.4617 },
  { nameEn: "Baliadangi", nameBn: "বালিয়াডাঙ্গী", districtEn: "Thakurgaon", latitude: 26.1000, longitude: 88.2833 },
  { nameEn: "Haripur", nameBn: "হরিপুর", districtEn: "Thakurgaon", latitude: 25.9667, longitude: 88.1667 },
  { nameEn: "Pirganj", nameBn: "পীরগঞ্জ", districtEn: "Thakurgaon", latitude: 25.8500, longitude: 88.3667 },
  { nameEn: "Ranisankail", nameBn: "রাণীশংকৈল", districtEn: "Thakurgaon", latitude: 25.9833, longitude: 88.3333 },

  // ==========================================
  // MYMENSINGH DIVISION
  // ==========================================
  // Mymensingh District
  { nameEn: "Mymensingh Sadar", nameBn: "ময়মনসিংহ সদর", districtEn: "Mymensingh", latitude: 24.7471, longitude: 90.4203 },
  { nameEn: "Bhaluka", nameBn: "ভালুকা", districtEn: "Mymensingh", latitude: 24.2333, longitude: 90.3833 },
  { nameEn: "Trishal", nameBn: "ত্রিশাল", districtEn: "Mymensingh", latitude: 24.5833, longitude: 90.4000 },
  { nameEn: "Haluaghat", nameBn: "হালুয়াঘাট", districtEn: "Mymensingh", latitude: 25.1333, longitude: 90.3500 },
  { nameEn: "Muktagachha", nameBn: "মুক্তাগাছা", districtEn: "Mymensingh", latitude: 24.7667, longitude: 90.2667 },
  { nameEn: "Dhobaura", nameBn: "ধোবাউড়া", districtEn: "Mymensingh", latitude: 25.0833, longitude: 90.5333 },
  { nameEn: "Fulbaria", nameBn: "ফুলবাড়ীয়া", districtEn: "Mymensingh", latitude: 24.6333, longitude: 90.2667 },
  { nameEn: "Gaffargaon", nameBn: "গফরগাঁও", districtEn: "Mymensingh", latitude: 24.4333, longitude: 90.5500 },
  { nameEn: "Gauripur", nameBn: "গৌরীপুর", districtEn: "Mymensingh", latitude: 24.7667, longitude: 90.5833 },
  { nameEn: "Ishwarganj", nameBn: "ঈশ্বরগঞ্জ", districtEn: "Mymensingh", latitude: 24.6833, longitude: 90.6333 },
  { nameEn: "Nandail", nameBn: "নান্দাইল", districtEn: "Mymensingh", latitude: 24.5833, longitude: 90.7000 },
  { nameEn: "Phulpur", nameBn: "ফুলপুর", districtEn: "Mymensingh", latitude: 24.9500, longitude: 90.3500 },
  { nameEn: "Tara Khanda", nameBn: "তারাকান্দা", districtEn: "Mymensingh", latitude: 24.8833, longitude: 90.4667 },

  // Jamalpur District
  { nameEn: "Jamalpur Sadar", nameBn: "জামালপুর সদর", districtEn: "Jamalpur", latitude: 24.9375, longitude: 89.9378 },
  { nameEn: "Bakshiganj", nameBn: "বকশীগঞ্জ", districtEn: "Jamalpur", latitude: 25.2167, longitude: 89.8667 },
  { nameEn: "Dewanganj", nameBn: "দেওয়ানগঞ্জ", districtEn: "Jamalpur", latitude: 25.1500, longitude: 89.7833 },
  { nameEn: "Islampur", nameBn: "ইসলামপুর", districtEn: "Jamalpur", latitude: 25.0833, longitude: 89.7833 },
  { nameEn: "Madarganj", nameBn: "মাদারগঞ্জ", districtEn: "Jamalpur", latitude: 24.9000, longitude: 89.7500 },
  { nameEn: "Melandaha", nameBn: "মেলান্দহ", districtEn: "Jamalpur", latitude: 24.9667, longitude: 89.8333 },
  { nameEn: "Sarishabari", nameBn: "সরিষাবাড়ী", districtEn: "Jamalpur", latitude: 24.7500, longitude: 89.8333 },

  // Netrokona District
  { nameEn: "Netrokona Sadar", nameBn: "নেত্রকোণা সদর", districtEn: "Netrokona", latitude: 24.8709, longitude: 90.7279 },
  { nameEn: "Atpara", nameBn: "আটপাড়া", districtEn: "Netrokona", latitude: 24.8000, longitude: 90.8667 },
  { nameEn: "Barhatta", nameBn: "বারহাট্টা", districtEn: "Netrokona", latitude: 24.9000, longitude: 90.8833 },
  { nameEn: "Durgapur", nameBn: "দুর্গাপুর", districtEn: "Netrokona", latitude: 25.1333, longitude: 90.6833 },
  { nameEn: "Khaliajuri", nameBn: "খালিয়াজুরী", districtEn: "Netrokona", latitude: 24.7000, longitude: 91.1333 },
  { nameEn: "Kalmakanda", nameBn: "কলমাকান্দা", districtEn: "Netrokona", latitude: 25.0833, longitude: 90.8833 },
  { nameEn: "Kendua", nameBn: "কেন্দুয়া", districtEn: "Netrokona", latitude: 24.6500, longitude: 90.8500 },
  { nameEn: "Madan", nameBn: "মদন", districtEn: "Netrokona", latitude: 24.7167, longitude: 90.9667 },
  { nameEn: "Mohanganj", nameBn: "মোহনগঞ্জ", districtEn: "Netrokona", latitude: 24.8667, longitude: 90.9667 },
  { nameEn: "Purbadhala", nameBn: "পূর্বধলা", districtEn: "Netrokona", latitude: 24.9333, longitude: 90.6000 },

  // Sherpur District
  { nameEn: "Sherpur Sadar", nameBn: "শেরপুর সদর", districtEn: "Sherpur", latitude: 25.0205, longitude: 90.0153 },
  { nameEn: "Jhenaigati", nameBn: "ঝিনাইগাতী", districtEn: "Sherpur", latitude: 25.1833, longitude: 90.0667 },
  { nameEn: "Nakla", nameBn: "নকলা", districtEn: "Sherpur", latitude: 24.9833, longitude: 90.1833 },
  { nameEn: "Nalitabari", nameBn: "নালিতাবাড়ী", districtEn: "Sherpur", latitude: 25.0833, longitude: 90.2000 },
  { nameEn: "Sreebardi", nameBn: "শ্রীবরদী", districtEn: "Sherpur", latitude: 25.1500, longitude: 89.9833 }
];
