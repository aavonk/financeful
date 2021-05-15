import React, { createContext, useState, ReactNode, useContext } from 'react';
import { getDateRange } from '@Lib/date-formatting';

type Range = {
  startDate: Date;
  endDate: Date;
  label: string;
};

export interface DateRangeContext {
  range: Range;
  setRange: React.Dispatch<React.SetStateAction<Range>>;
}

const DateRangeContext = createContext<DateRangeContext | undefined>(undefined);

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState(() => {
    const { startDate, endDate } = getDateRange('90-days');

    return {
      startDate,
      endDate,
      label: '90 days',
    };
  });

  const value = { range, setRange };

  return <DateRangeContext.Provider value={value}>{children}</DateRangeContext.Provider>;
}

export function useDateRangeContext() {
  const context = useContext(DateRangeContext);

  if (!context) {
    throw new Error('uesDateRange must be used within a DateRangeProvider');
  }
  return context;
}
