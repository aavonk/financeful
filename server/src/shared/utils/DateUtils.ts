type StartAndEnd = {
  startDate: Date;
  endDate: Date;
};

export class DateUtils {
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
}
