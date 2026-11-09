import moment from 'moment-hijri';

// Pastikan angka Masehi menggunakan digit standar Barat
moment.locale('en');

export const HIJRI_MONTHS = [
  'Muharram',
  'Safar',
  "Rabi'ul Awwal",
  "Rabi'ul Akhir",
  'Jumadil Ula',
  'Jumadil Akhir',
  'Rajab',
  "Sya'ban",
  'Ramadhan',
  'Syawal',
  "Dzulqa'dah",
  'Dzulhijjah',
];

export const MASEHI_MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const DAY_NAMES = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export function getHijriInfo(dateStr: string) {
  const m = moment(dateStr);
  const iDate = m.iDate();
  const iMonthIndex = m.iMonth();
  const iMonthName = HIJRI_MONTHS[iMonthIndex] || `Bulan ${iMonthIndex + 1}`;
  const iYear = m.iYear();
  return {
    day: iDate,
    month: iMonthName,
    year: iYear,
    fullText: `${iDate} ${iMonthName} ${iYear} H`,
  };
}

export function checkIsPingDay(dateStr: string, lastPingTime: string | null): boolean {
  if (!lastPingTime) return false;
  const lastPingMidnight = new Date(lastPingTime);
  lastPingMidnight.setHours(0, 0, 0, 0);

  const checkDate = new Date(dateStr);
  checkDate.setHours(0, 0, 0, 0);

  const diffMs = checkDate.getTime() - lastPingMidnight.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays % 6 === 0;
}

export function checkIsLastPingDay(dateStr: string, lastPingTime: string | null): boolean {
  if (!lastPingTime) return false;
  const lastPingStr = new Date(lastPingTime).toISOString().split('T')[0];
  return dateStr === lastPingStr;
}
