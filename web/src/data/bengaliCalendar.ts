export interface BengaliSeason {
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
}

export interface BengaliDateInfo {
  day: number;
  dayBn: string;
  monthNameEn: string;
  monthNameBn: string;
  year: number;
  yearBn: string;
  season: BengaliSeason;
  formattedBn: string;
  formattedEn: string;
}

export function toBengaliDigits(input: string | number): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(input).replace(/[0-9]/g, (w) => bengaliDigits[parseInt(w, 10)]);
}

export function getBengaliDate(dateInput: Date = new Date()): BengaliDateInfo {
  const d = new Date(dateInput);
  const year = d.getFullYear();
  const month = d.getMonth() + 1; // 1-12
  const day = d.getDate();

  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  // Bengali Academy revised rules
  let bYear = year - 593;
  if (month < 4 || (month === 4 && day < 14)) {
    bYear -= 1;
  }

  let bMonthIndex = 0; // 0: Boishakh .. 11: Choitra
  let bDay = 1;

  if (month === 4 && day >= 14) {
    bMonthIndex = 0;
    bDay = day - 14 + 1;
  } else if (month === 5) {
    if (day <= 14) {
      bMonthIndex = 0;
      bDay = 17 + day;
    } else {
      bMonthIndex = 1;
      bDay = day - 14;
    }
  } else if (month === 6) {
    if (day <= 14) {
      bMonthIndex = 1;
      bDay = 17 + day;
    } else {
      bMonthIndex = 2;
      bDay = day - 14;
    }
  } else if (month === 7) {
    if (day <= 15) {
      bMonthIndex = 2;
      bDay = 16 + day;
    } else {
      bMonthIndex = 3;
      bDay = day - 15;
    }
  } else if (month === 8) {
    if (day <= 15) {
      bMonthIndex = 3;
      bDay = 16 + day;
    } else {
      bMonthIndex = 4;
      bDay = day - 15;
    }
  } else if (month === 9) {
    if (day <= 15) {
      bMonthIndex = 4;
      bDay = 16 + day;
    } else {
      bMonthIndex = 5;
      bDay = day - 15;
    }
  } else if (month === 10) {
    if (day <= 15) {
      bMonthIndex = 5;
      bDay = 15 + day;
    } else {
      bMonthIndex = 6;
      bDay = day - 15;
    }
  } else if (month === 11) {
    if (day <= 14) {
      bMonthIndex = 6;
      bDay = 16 + day;
    } else {
      bMonthIndex = 7;
      bDay = day - 14;
    }
  } else if (month === 12) {
    if (day <= 14) {
      bMonthIndex = 7;
      bDay = 16 + day;
    } else {
      bMonthIndex = 8;
      bDay = day - 14;
    }
  } else if (month === 1) {
    if (day <= 13) {
      bMonthIndex = 8;
      bDay = 17 + day;
    } else {
      bMonthIndex = 9;
      bDay = day - 13;
    }
  } else if (month === 2) {
    if (day <= 12) {
      bMonthIndex = 9;
      bDay = 18 + day;
    } else {
      bMonthIndex = 10;
      bDay = day - 12;
    }
  } else if (month === 3) {
    const falgunDays = isLeap ? 30 : 29;
    const cutOff = falgunDays - 16;
    if (day <= cutOff) {
      bMonthIndex = 10;
      bDay = 16 + day;
    } else {
      bMonthIndex = 11;
      bDay = day - cutOff;
    }
  } else if (month === 4 && day < 14) {
    bMonthIndex = 11;
    bDay = day + 17;
  }

  const MONTH_NAMES_EN = [
    "Boishakh", "Joishtho", "Asharh", "Shrabon", "Bhadro", "Ashwin",
    "Kartik", "Agrahayan", "Poush", "Magh", "Falgun", "Choitra"
  ];
  const MONTH_NAMES_BN = [
    "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন",
    "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"
  ];

  const SEASONS: BengaliSeason[] = [
    { nameEn: "Grishma (Summer)", nameBn: "গ্রীষ্ম কাল", descriptionEn: "Intense heat and Kalbaishakhi storms", descriptionBn: "তীব্র তাপদাহ ও কালবৈশাখীর কাল" },
    { nameEn: "Barsha (Monsoon)", nameBn: "বর্ষা কাল", descriptionEn: "Heavy monsoon rains and lush wetlands", descriptionBn: "টানা বর্ষণ ও নদ-নদীতে প্লাবনের কাল" },
    { nameEn: "Sharat (Autumn)", nameBn: "শরৎ কাল", descriptionEn: "Clear blue skies and blooming kashful", descriptionBn: "শুভ্র মেঘ ও কাশফুলের শোভা" },
    { nameEn: "Hemanta (Late Autumn)", nameBn: "হেমন্ত কাল", descriptionEn: "Golden paddy harvest and early mist", descriptionBn: "নবান্ন ও সোনালী ধানের উৎসব" },
    { nameEn: "Sheet (Winter)", nameBn: "শীত কাল", descriptionEn: "Morning river fog and date palm sap", descriptionBn: "কুয়াশাচ্ছন্ন সকাল ও খেজুর রসের মিষ্টি আমেজ" },
    { nameEn: "Basanta (Spring)", nameBn: "বসন্ত কাল", descriptionEn: "Blooming nature and gentle southern breeze", descriptionBn: "দক্ষিণা বাতাস ও ফুল ফোটার ঋতু" }
  ];

  const seasonIndex = Math.floor(bMonthIndex / 2);
  const season = SEASONS[seasonIndex] || SEASONS[0];

  const dayBn = toBengaliDigits(bDay);
  const yearBn = toBengaliDigits(bYear);

  return {
    day: bDay,
    dayBn,
    monthNameEn: MONTH_NAMES_EN[bMonthIndex],
    monthNameBn: MONTH_NAMES_BN[bMonthIndex],
    year: bYear,
    yearBn,
    season,
    formattedBn: `${dayBn} ${MONTH_NAMES_BN[bMonthIndex]}, ${yearBn} বঙ্গাব্দ`,
    formattedEn: `${bDay} ${MONTH_NAMES_EN[bMonthIndex]}, ${bYear} Bangabda`
  };
}

export function calculatePrayerTimes(lat: number, lon: number, date: Date = new Date()) {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const d = dayOfYear;
  const b = (2 * Math.PI * (d - 81)) / 365.0;
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  const delta = (23.45 * Math.PI / 180) * Math.sin((2 * Math.PI * (d - 81)) / 365.0);
  const latRad = (lat * Math.PI) / 180;
  const solarNoon = 12.0 - (lon - 6.0 * 15.0) / 15.0 - eot / 60.0;

  function hourAngle(altitudeDeg: number): number {
    const altRad = (altitudeDeg * Math.PI) / 180;
    const cosH = (Math.sin(altRad) - Math.sin(latRad) * Math.sin(delta)) / (Math.cos(latRad) * Math.cos(delta));
    const clamped = Math.max(-1.0, Math.min(1.0, cosH));
    return (Math.acos(clamped) * 180 / Math.PI) / 15.0;
  }

  const hSunrise = hourAngle(-0.833);
  const hFajr = hourAngle(-18.0);
  const hIsha = hourAngle(-18.0);

  const shadowFactor = 1.5;
  const noonAltRad = Math.PI / 2.0 - Math.abs(latRad - delta);
  const asrAltRad = Math.atan(1.0 / (shadowFactor + 1.0 / Math.tan(noonAltRad)));
  const hAsr = hourAngle((asrAltRad * 180) / Math.PI);

  const fajrTime = solarNoon - hFajr;
  const sunriseTime = solarNoon - hSunrise;
  const dhuhrTime = solarNoon + 4.0 / 60.0;
  const asrTime = solarNoon + hAsr;
  const maghribTime = solarNoon + hSunrise + 3.0 / 60.0;
  const ishaTime = solarNoon + hIsha;

  function fmt(hoursDec: number): string {
    const mins = Math.round(hoursDec * 60);
    let h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    if (h < 0) h += 24;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  }

  return {
    fajr: fmt(fajrTime),
    sunrise: fmt(sunriseTime),
    dhuhr: fmt(dhuhrTime),
    asr: fmt(asrTime),
    maghrib: fmt(maghribTime),
    isha: fmt(ishaTime),
  };
}
