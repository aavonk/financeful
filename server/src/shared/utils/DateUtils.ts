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

  public static getStartOfMonth(date: Date): Date {
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  public static getMonthStartAndEnd(date: Date): StartAndEnd {
    const startDate = this.getStartOfMonth(date);
    const endDate = this.getEndOfMonth(date);

    return { startDate, endDate };
  }
}
