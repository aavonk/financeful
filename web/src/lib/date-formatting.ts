import { format } from 'date-fns';

type FormatOptions = 'MMM do yyyy' | 'M/d/yyyy';

export const formatDate = (date: Date | string, options: FormatOptions): string => {
  return format(new Date(date), options);
};
