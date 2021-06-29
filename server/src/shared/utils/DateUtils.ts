type StartAndEnd = {
  startDate: Date;
  endDate: Date;
};

export class DateUtils {
  public static getMonthName;
  public static formatNumericDate(date: Date): string {
    const d = new Date(date);

    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();

    return `${month}/${day}/${year}`;
  }

  public static getEndOfMonth(date: Date): Date {
    const month = date.getMonth();
    date.setFullYear(date.getFullYear(), month + 1, 0);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  public static getStartOfMonth(dirtyDate: Date): Date {
    const date = new Date(dirtyDate);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  public static getMonthStartAndEnd(dirtyDate: Date): StartAndEnd {
    const date = new Date(dirtyDate);
    const startDate = this.getStartOfMonth(date);
    const endDate = this.getEndOfMonth(date);

    return { startDate, endDate };
  }

  public static getPreviousMonthStartAndEnd(today: Date): StartAndEnd {
    const date = new Date(today);
    const previousMonth = this.addMonths(date, -1);

    return this.getMonthStartAndEnd(previousMonth);
  }

  public static addMonths(dirtyDate: Date | number, dirtyAmount: number): Date {
    const date = new Date(dirtyDate);
    const amount = Number(dirtyAmount);
    if (isNaN(amount)) {
      return new Date(NaN);
    }
    if (!amount) {
      // If 0 months, no-op to avoid changing times in the hour before end of DST
      return date;
    }
    const dayOfMonth = date.getDate();
    const endOfDesiredMonth = new Date(date.getTime());
    endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
    const daysInMonth = endOfDesiredMonth.getDate();
    if (dayOfMonth >= daysInMonth) {
      // If we're already at the end of the month, then this is the correct date
      // and we're done.
      return endOfDesiredMonth;
    } else {
      date.setFullYear(
        endOfDesiredMonth.getFullYear(),
        endOfDesiredMonth.getMonth(),
        dayOfMonth,
      );
      return date;
    }
  }

  public static min(dirtyDatesArray: Date[] | number[]): Date {
    let datesArray: Date[] | number[];
    // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
    if (dirtyDatesArray && typeof dirtyDatesArray.forEach === 'function') {
      datesArray = dirtyDatesArray;
      // If `dirtyDatesArray` is Array-like Object, convert to Array.
    } else if (
      typeof dirtyDatesArray === 'object' &&
      dirtyDatesArray !== null
    ) {
      datesArray = Array.prototype.slice.call(dirtyDatesArray);
    } else {
      // `dirtyDatesArray` is non-iterable, return Invalid Date
      return new Date(NaN);
    }

    let result: Date | undefined;

    datesArray.forEach(function (dirtyDate: Date | number) {
      let currentDate = new Date(dirtyDate);

      if (
        result === undefined ||
        result > currentDate ||
        isNaN(currentDate.getDate())
      ) {
        result = currentDate;
      }
    });

    return result || new Date(NaN);
  }

  public static max(dirtyDatesArray: Date[] | string[] | number[]): Date {
    let datesArray;
    // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
    if (dirtyDatesArray && typeof dirtyDatesArray.forEach === 'function') {
      datesArray = dirtyDatesArray;

      // If `dirtyDatesArray` is Array-like Object, convert to Array.
    } else if (
      typeof dirtyDatesArray === 'object' &&
      dirtyDatesArray !== null
    ) {
      datesArray = Array.prototype.slice.call(dirtyDatesArray);
    } else {
      // `dirtyDatesArray` is non-iterable, return Invalid Date
      return new Date(NaN);
    }

    let result: Date | undefined;
    datesArray.forEach(function (dirtyDate: any) {
      const currentDate = new Date(dirtyDate);

      if (
        result === undefined ||
        result < currentDate ||
        isNaN(Number(currentDate))
      ) {
        result = currentDate;
      }
    });

    return result || new Date(NaN);
  }
}
