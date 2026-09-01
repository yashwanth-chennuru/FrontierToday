export interface DayInfo {
  iso: string;          // "2026-09-01"
  dayNumber: number;    // 1
  monthName: string;    // "Sep"
  fullMonthName: string;// "September"
  year: number;         // 2026
  dayOfWeek: string;    // "Tue"
  fullDateLabel: string;// "Sep 1, Tue"
  isToday: boolean;
  isWeekend: boolean;
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const FULL_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const formatIsoDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseIsoDate = (iso: string): Date => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const getDayInfo = (iso: string, todayIso: string = '2026-09-01'): DayInfo => {
  const d = parseIsoDate(iso);
  const dayOfWeek = DAY_NAMES[d.getDay()];
  const monthName = MONTH_NAMES[d.getMonth()];
  const fullMonthName = FULL_MONTH_NAMES[d.getMonth()];
  const dayNumber = d.getDate();
  const year = d.getFullYear();

  return {
    iso,
    dayNumber,
    monthName,
    fullMonthName,
    year,
    dayOfWeek,
    fullDateLabel: `${monthName} ${dayNumber}`,
    isToday: iso === todayIso,
    isWeekend: d.getDay() === 0 || d.getDay() === 6,
  };
};

/**
 * Generates a 6-month sequence of dates starting from 2026-09-01 through 2027-02-28
 */
export const generate6MonthsDates = (
  startDateIso: string = '2026-09-01',
  monthsCount: number = 6
): DayInfo[] => {
  const days: DayInfo[] = [];
  const start = parseIsoDate(startDateIso);
  const current = new Date(start);
  
  // Calculate end target month
  const targetMonth = (start.getMonth() + monthsCount) % 12;
  const targetYear = start.getFullYear() + Math.floor((start.getMonth() + monthsCount) / 12);
  const end = new Date(targetYear, targetMonth, 0); // last day of the 6th month

  const todayIso = formatIsoDate(new Date());

  while (current <= end) {
    const iso = formatIsoDate(current);
    days.push(getDayInfo(iso, todayIso));
    current.setDate(current.getDate() + 1);
  }

  return days;
};

export interface MonthOption {
  key: string;       // "2026-09"
  label: string;     // "September 2026"
  shortLabel: string;// "Sep '26"
  year: number;
  monthIndex: number;
  firstDateIso: string;
}

export const get6MonthsList = (startDateIso: string = '2026-09-01'): MonthOption[] => {
  const start = parseIsoDate(startDateIso);
  const months: MonthOption[] = [];

  for (let i = 0; i < 6; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    const year = d.getFullYear();
    const monthIndex = d.getMonth();
    const monthIso = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
    const firstDateIso = `${monthIso}-01`;

    months.push({
      key: monthIso,
      label: `${FULL_MONTH_NAMES[monthIndex]} ${year}`,
      shortLabel: `${MONTH_NAMES[monthIndex]} '${String(year).slice(2)}`,
      year,
      monthIndex,
      firstDateIso
    });
  }

  return months;
};
