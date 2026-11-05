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

const DHAKA_TZ = "Asia/Dhaka";

/** Returns the calendar date (year, month 1-12, day) of `date` as seen in Bangladesh (UTC+6). */
function dhakaYmd(date: Date): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: DHAKA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { y: get("year"), m: get("month"), d: get("day") };
}

function toYmd(input: Date | string): { y: number; m: number; d: number } {
  if (typeof input === "string") {
    // "YYYY-MM-DD" (Open-Meteo daily dates are already Asia/Dhaka local dates)
    const [y, m, d] = input.slice(0, 10).split("-").map(Number);
    return { y, m, d };
  }
  return dhakaYmd(input);
}

function isGregorianLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Converts a Gregorian date to the revised Bangladesh (Bangla Academy, 2019) calendar.
 *
 * Year starts on 14 April. Boishakh–Ashwin have 31 days, Kartik–Magh 30, Falgun 29
 * (30 when the Gregorian February that falls inside it is a leap year), Choitro 30.
 * This puts 1 Poush on 16 December, 1 Falgun on 14 February and 8 Falgun on 21 February.
 *
 * Accepts a Date (interpreted in Asia/Dhaka) or a "YYYY-MM-DD" string.
 */
export function getBengaliDate(input: Date | string = new Date()): BengaliDateInfo {
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

  const { y, m, d } = toYmd(input);

  // Gregorian year in which the current Bengali year began (on 14 April).
  const startYear = m > 4 || (m === 4 && d >= 14) ? y : y - 1;
  const bengaliYear = startYear - 593;

  // Whole days since 14 April of startYear, computed in UTC so DST/timezones can't skew it.
  const diffDays = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(startYear, 3, 14)) / 86400000);

  // Falgun spans the February of startYear + 1.
  const falgunDays = isGregorianLeap(startYear + 1) ? 30 : 29;
  const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, falgunDays, 30];

  let bnMonthIdx = 11;
  let bnDay = 1;
  let remaining = diffDays;
  for (let i = 0; i < monthDays.length; i++) {
    if (remaining < monthDays[i]) {
      bnMonthIdx = i;
      bnDay = remaining + 1;
      break;
    }
    remaining -= monthDays[i];
  }

  const seasonIdx = Math.floor(bnMonthIdx / 2);
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

/**
 * Astronomical prayer times for Bangladesh (Islamic Foundation Bangladesh convention):
 * Fajr & Isha at 18° below the horizon (University of Islamic Sciences, Karachi),
 * Asr by the Hanafi shadow rule (shadow = 2 × object + noon shadow).
 */
export function calculatePrayerTimes(
  lat: number,
  lon: number,
  date: Date = new Date()
): PrayerTimes {
  const { y, m, d } = dhakaYmd(date);
  const dayOfYear = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 0)) / 86400000);

  const rad = Math.PI / 180;
  const b = (2 * Math.PI * (dayOfYear - 81)) / 365.0;
  const declination = 23.45 * rad * Math.sin(b);
  const eqTimeMin = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);

  const TZ_OFFSET_HOURS = 6; // Bangladesh Standard Time, UTC+6, no DST
  const solarNoon = 12 - (lon - TZ_OFFSET_HOURS * 15) / 15 - eqTimeMin / 60;
  const latRad = lat * rad;

  /** Hours between solar noon and the moment the sun reaches `altitudeDeg`. */
  function hourAngle(altitudeDeg: number): number {
    const cosH =
      (Math.sin(altitudeDeg * rad) - Math.sin(latRad) * Math.sin(declination)) /
      (Math.cos(latRad) * Math.cos(declination));
    return Math.acos(Math.max(-1, Math.min(1, cosH))) / rad / 15;
  }

  // Hanafi Asr: altitude where shadow length = 2 × object height + noon shadow.
  const HANAFI_SHADOW_FACTOR = 2;
  const asrAltitudeDeg =
    Math.atan(1 / (HANAFI_SHADOW_FACTOR + Math.tan(Math.abs(latRad - declination)))) / rad;

  const sunsetAngle = hourAngle(-0.833); // refraction + solar radius

  const fajrHour = solarNoon - hourAngle(-18);
  const dhuhrHour = solarNoon + 4 / 60; // a few minutes after zenith
  const asrHour = solarNoon + hourAngle(asrAltitudeDeg);
  const maghribHour = solarNoon + sunsetAngle + 3 / 60; // a few minutes after sunset
  const ishaHour = solarNoon + hourAngle(-18);

  function formatTime(hourDecimal: number): string {
    const totalMinutes = ((Math.round(hourDecimal * 60) % 1440) + 1440) % 1440;
    const h = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const period = h >= 12 ? "PM" : "AM";
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")} ${period}`;
  }

  return {
    fajr: formatTime(fajrHour),
    dhuhr: formatTime(dhuhrHour),
    asr: formatTime(asrHour),
    maghrib: formatTime(maghribHour),
    isha: formatTime(ishaHour),
  };
}
