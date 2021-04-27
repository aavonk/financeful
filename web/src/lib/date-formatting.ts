import { format, add, Duration } from 'date-fns';

type FormatOptions = 'MMM do yyyy' | 'M/d/yyyy';

export const formatDate = (date: Date | string, options: FormatOptions): string => {
  return format(new Date(date), options);
};

export const addDays = (date: Date, duration: Duration) => {
  // Set the beginning date to the very start of the day so
  // that results from the day aren't excluded because
  // of the hour/minute
  date.setHours(0, 0, 0, 0);
  return add(date, duration);
};
