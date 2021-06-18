import {
  format,
  add,
  Duration,
  endOfMonth,
  startOfMonth,
  subMonths,
  endOfDay,
  startOfYear,
  endOfYear,
  getYear,
} from 'date-fns';

type FormatOptions = 'MMM do yyyy' | 'M/d/yyyy' | 'MMMM do yyyy';

export const formatDate = (date: Date | string, options: FormatOptions): string => {
  return format(new Date(date), options);
};

export const getCurrentYear = (): number => {
  const date = new Date();

  return getYear(date);
};

export const getCurrentMonthName = () => {
  const today = new Date();
  const date = formatDate(today, 'MMMM do yyyy');
  return date.split(' ')[0];
};

export const addDays = (date: Date, duration: Duration) => {
  // Set the beginning date to the very start of the day so
  // that results from the day aren't excluded because
  // of the hour/minute
  date.setHours(0, 0, 0, 0);
  return add(date, duration);
};

export const getEndOfMonth = (date: Date): Date => {
  return endOfMonth(date);
};

const getStartOfMonth = (date: Date): Date => {
  return startOfMonth(date);
};

const subtractMonths = (date: Date, amount: number): Date => {
  return subMonths(date, amount);
};

const getEndOfDay = (date: Date): Date => {
  return endOfDay(date);
};

const getStartOfYear = (date: Date): Date => {
  return startOfYear(date);
};

const getEndOfYear = (date: Date): Date => {
  return endOfYear(date);
};

type RangeOptions =
  | 'current-month'
  | 'last-month'
  | '90-days'
  | '1-year'
  | 'this-year'
  | 'last-year';

type Range = {
  startDate: Date;
  endDate: Date;
};

//
export const getDateRange = (range: RangeOptions): Range => {
  const today = new Date();

  switch (range) {
    case 'current-month': {
      const endDate = getEndOfDay(getEndOfMonth(today));
      const startDate = getStartOfMonth(today);
      return { startDate, endDate };
    }
    case 'last-month': {
      const startMonth = getStartOfMonth(today);
      const startDate = subtractMonths(startMonth, 1);
      const endDate = getEndOfDay(getEndOfMonth(startDate));
      return { startDate, endDate };
    }
    case '90-days': {
      return {
        startDate: addDays(today, { days: -90 }),
        endDate: getEndOfDay(today),
      };
    }
    case '1-year': {
      return {
        startDate: addDays(today, { years: -1 }),
        endDate: getEndOfDay(today),
      };
    }
    case 'this-year': {
      return {
        startDate: getStartOfYear(today),
        endDate: getEndOfDay(today),
      };
    }
    case 'last-year': {
      const oneYearAgo = addDays(today, { years: -1 });
      return {
        startDate: getStartOfYear(oneYearAgo),
        endDate: getEndOfYear(oneYearAgo),
      };
    }
    default:
      throw new Error('Insufficient date range passed to getDateRange');
  }
};
