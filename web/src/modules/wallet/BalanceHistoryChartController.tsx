import { useState } from 'react';
import { useGetBalanceHistoriesQuery } from '@Generated/graphql';
import { AreaChartSkeleton } from '@Components/ChartSkeletons';
import { getDateRange } from '@Lib/date-formatting';
import BalanceHistoryChart from './BalanceHistoryChart';
import DateRangeFilter, { DateRangeState } from '@Components/DateFilter/DateRangeFilter';

function BalanceHistoryChartController() {
  const [range, setRange] = useState<DateRangeState>(() => {
    const { startDate, endDate } = getDateRange('90-days');
    return { startDate, endDate, label: '90 days' };
  });
  const { data, loading, error } = useGetBalanceHistoriesQuery({
    variables: { input: { startDate: range.startDate, endDate: range.endDate } },
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

  if (!data) {
    return null;
  }
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <DateRangeFilter setRange={setRange} selected={range.label} range={range} />
      {!data.getBalanceHistories.length ? (
        <AreaChartSkeleton
          withOverlappingMessage
          heading="Woah there"
          subheading="It looks like you don't have enough balance history yet."
          errorTestId="networth-chart-empty"
        />
      ) : (
        <BalanceHistoryChart data={data.getBalanceHistories} />
      )}
    </div>
  );
}

export default BalanceHistoryChartController;
