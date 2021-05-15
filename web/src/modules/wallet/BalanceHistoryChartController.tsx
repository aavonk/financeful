import React, { useState } from 'react';
import { useGetBalanceHistoriesQuery } from '@Generated/graphql';
import { AreaChartSkeleton } from '@Components/ChartSkeletons';
import { getDateRange } from '@Lib/date-formatting';
import { GradientAreaChart } from '@Components/Charts';
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
      {!data.getAggregatedDailyBalances.length ? (
        <AreaChartSkeleton
          withOverlappingMessage
          heading="Woah there"
          subheading="It looks like your balance history doesn't go that far back"
          errorTestId="networth-chart-empty"
        />
      ) : (
        <GradientAreaChart
          data={data.getAggregatedDailyBalances}
          XAxisKey="date"
          YAxisKey="balance"
          AreaDataKey="balance"
        />
      )}
    </div>
  );
}

export default BalanceHistoryChartController;
