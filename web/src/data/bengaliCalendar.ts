export interface BengaliDateInfo {
  dayOfMonth: number;
  dayEn: number;
  dayBn: string;
  monthNameEn: string;
  monthNameBn: string;
  year: number;
  yearEn: number;
  yearBn: string;
  seasonEn: string;
  seasonBn: string;
  season: {
    nameEn: string;
    nameBn: string;
  };
  formattedBn: string;
  formattedEn: string;
  fullFormattedBn: string;
  fullFormattedEn: string;
}

export interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export function toBengaliDigits(input: string | number): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return input
    .toString()
    .replace(/[0-9]/g, (match) => bengaliDigits[parseInt(match, 10)]);
}

export function getBengaliDate(date: Date = new Date()): BengaliDateInfo {
  const year = date.getFullYear();

  const bnMonths = [
    "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন",
    "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"
  ];
  const enMonths = [
    "Boishakh", "Joishtho", "Ashar", "Srabon", "Vadro", "Ashwin",
    "Kartik", "Agrahayan", "Poush", "Magh", "Falgun", "Choitro"
  ];
  const seasonsBn = ["গ্রীষ্ম", "বর্ষা", "শরৎ", "হেমন্ত", "শীত", "বসন্ত"];
  const seasonsEn = ["Grishho (Summer)", "Borsha (Monsoon)", "Sharat (Autumn)", "Hemanta (Late Autumn)", "Sheet (Winter)", "Basanta (Spring)"];

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  const april14 = new Date(year, 3, 14, 0, 0, 0); // Month 3 is April (0-indexed)
  const diffTime = date.getTime() - april14.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let bengaliYear = year - 593;
  let bnMonthIdx = 0;
  let bnDay = 1;

  if (diffDays >= 0) {
    const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, isLeapYear ? 30 : 29, 30];
    let remaining = diffDays;
    for (let m = 0; m < monthDays.length; m++) {
      if (remaining < monthDays[m]) {
        bnMonthIdx = m;
        bnDay = remaining + 1;
        break;
      }
      remaining -= monthDays[m];
    }
  } else {
    bengaliYear -= 1;
    const prevIsLeapYear = ((year - 1) % 4 === 0 && (year - 1) % 100 !== 0) || ((year - 1) % 400 === 0);
    const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, prevIsLeapYear ? 30 : 29, 30];
    const totalPrevDays = monthDays.reduce((a, b) => a + b, 0);
    let remaining = totalPrevDays + diffDays;
    for (let m = 0; m < monthDays.length; m++) {
      if (remaining < monthDays[m]) {
        bnMonthIdx = m;
        bnDay = remaining + 1;
        break;
      }
      remaining -= monthDays[m];
    }
  }

  const seasonIdx = Math.min(5, Math.max(0, Math.floor(bnMonthIdx / 2)));
  const monthBn = bnMonths[bnMonthIdx];
  const monthEn = enMonths[bnMonthIdx];
  const seasonBn = seasonsBn[seasonIdx];
  const seasonEn = seasonsEn[seasonIdx];

  const fullFormattedBn = `${toBengaliDigits(bnDay)} ${monthBn}, ${toBengaliDigits(bengaliYear)} বঙ্গাব্দ (${seasonBn} কাল)`;
  const fullFormattedEn = `${bnDay} ${monthEn}, ${bengaliYear} BS (${seasonEn})`;

  return {
    dayOfMonth: bnDay,
    dayEn: bnDay,
    dayBn: toBengaliDigits(bnDay),
    monthNameEn: monthEn,
    monthNameBn: monthBn,
    year: bengaliYear,
    yearEn: bengaliYear,
    yearBn: toBengaliDigits(bengaliYear),
    seasonEn: seasonEn,
    seasonBn: seasonBn,
    season: {
      nameEn: seasonEn,
      nameBn: seasonBn,
    },
    formattedBn: `${toBengaliDigits(bnDay)} ${monthBn}, ${toBengaliDigits(bengaliYear)} বঙ্গাব্দ`,
    formattedEn: `${bnDay} ${monthEn}, ${bengaliYear} BS`,
    fullFormattedBn,
    fullFormattedEn,
  };
}

export function calculatePrayerTimes(
  lat: number,
  lon: number,
  date: Date = new Date()
): PrayerTimes {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const b = (2 * Math.PI * (dayOfYear - 81)) / 365.0;
  const declination = (23.45 * Math.PI) / 180 * Math.sin(b);
  const eqTime = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);

  const solarNoon = 12.0 - lon / 15.0 - eqTime / 60.0 + 6.0; // Bangladesh UTC+6
  const latRad = (lat * Math.PI) / 180;

  function getHourAngle(alphaDeg: number): number {
    const alphaRad = (alphaDeg * Math.PI) / 180;
    const cosH =
      (Math.sin(alphaRad) - Math.sin(latRad) * Math.sin(declination)) /
      (Math.cos(latRad) * Math.cos(declination));
    if (cosH >= 1.0) return 0;
    if (cosH <= -1.0) return 12;
    return (Math.acos(cosH) * 180) / Math.PI / 15.0;
  }

  const fajrHour = solarNoon - getHourAngle(-18.0);
  const dhuhrHour = solarNoon + 4.0 / 60.0;
  const asrHour = solarNoon + getHourAngle(-4.5) * 0.58;
  const maghribHour = solarNoon + getHourAngle(-0.833);
  const ishaHour = solarNoon + getHourAngle(-18.0);

  function formatTime(hourDecimal: number): string {
    let h = Math.floor(hourDecimal);
    let m = Math.round((hourDecimal - h) * 60);
    if (m >= 60) {
      h += 1;
      m -= 60;
    }
    if (h >= 24) h -= 24;
    if (h < 0) h += 24;
    const period = h >= 12 ? "PM" : "AM";
    const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${displayH.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${period}`;
  }

  return {
    fajr: formatTime(Math.min(5.5, Math.max(4.2, fajrHour))),
    dhuhr: formatTime(Math.min(12.6, Math.max(11.8, dhuhrHour))),
    asr: formatTime(Math.min(16.6, Math.max(15.2, asrHour))),
    maghrib: formatTime(Math.min(18.8, Math.max(17.5, maghribHour))),
    isha: formatTime(Math.min(20.3, Math.max(18.9, ishaHour))),
  };
}
