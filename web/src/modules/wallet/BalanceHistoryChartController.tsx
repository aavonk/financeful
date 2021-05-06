import { useState } from 'react';
import { useGetBalanceHistoriesQuery } from '@Generated/graphql';
import { addDays } from '@Lib/date-formatting';
import { AreaChartSkeleton } from '@Components/ChartSkeletons';
import { getDateRange } from '@Lib/date-formatting';
import BalanceHistoryChart from './BalanceHistoryChart';
import DateRangeFilter from './DateRangeFilter';

type DateRangeState = {
  startDate: Date;
  endDate: Date;
};

function BalanceHistoryChartController() {
  const [range, setRange] = useState<DateRangeState>(() => getDateRange('90-days'));
  const today = new Date();
  const startDate = addDays(today, { days: -90 });
  console.log({ range });
  const { data, loading, error } = useGetBalanceHistoriesQuery({
    variables: { input: { startDate, endDate: today } },
  });

  if (loading) {
    return <AreaChartSkeleton />;
  }

  if (error) {
    return (
      <AreaChartSkeleton
        withOverlappingMessage
        heading="Uh oh"
        subheading="We ran into trouble getting your balance history. Try refreshing?"
      />
    );
  }

  if (!data?.getBalanceHistories || !data.getBalanceHistories.length) {
    return (
      <AreaChartSkeleton
        withOverlappingMessage
        heading="Woah there"
        subheading="It looks like you don't have enough balance history yet."
      />
    );
  }

  if (!data) {
    return null;
  }
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <DateRangeFilter />
      <BalanceHistoryChart data={data.getBalanceHistories} />
    </div>
  );
}

export default BalanceHistoryChartController;
