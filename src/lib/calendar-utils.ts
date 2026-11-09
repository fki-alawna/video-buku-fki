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
  try {
    const parts = dateStr.split('-');
    const dateObj = new Date(
      Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), 12, 0, 0)
    );
    const formatter = new Intl.DateTimeFormat('id-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    let day = 1;
    let monthIndex = 0;
    let year = 1448;

    for (const part of formatter.formatToParts(dateObj)) {
      if (part.type === 'day') day = parseInt(part.value, 10);
      if (part.type === 'month') monthIndex = parseInt(part.value, 10) - 1;
      if (part.type === 'year') year = parseInt(part.value, 10);
    }

    const monthName = HIJRI_MONTHS[monthIndex] || `Bulan ${monthIndex + 1}`;
    return {
      day,
      month: monthName,
      year,
      fullText: `${day} ${monthName} ${year} H`,
    };
  } catch {
    return {
      day: 1,
      month: HIJRI_MONTHS[0],
      year: 1448,
      fullText: `1 ${HIJRI_MONTHS[0]} 1448 H`,
    };
  }
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
