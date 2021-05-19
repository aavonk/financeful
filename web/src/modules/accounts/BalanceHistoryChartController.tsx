import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetDailyBalancesQuery as useGetBalances } from '@Generated/graphql';
import { GradientAreaChart } from '@Components/Charts';
import { AreaChartSkeleton } from '@Components/ChartSkeletons';
import { theme } from '@Constants/theme';
import DateRangeFilter from '@Components/DateFilter/DateRangeFilter';
import { useDateRangeContext } from '@Context/daterange/DateRangeContext';

const chartColor = {
  stroke: theme.charts.greenStroke,
  fill: theme.charts.greenFill,
};

function BalanceHistoryChartController() {
  const { id } = useParams<{ id: string }>();
  const { range, setRange } = useDateRangeContext();
  const { data, loading, error } = useGetBalances({
    variables: {
      input: { startDate: range.startDate, endDate: range.endDate, accountId: id },
    },
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
      {!data.getAccountDailyBalances.length ? (
        <AreaChartSkeleton
          withOverlappingMessage
          heading="Woah there"
          subheading="It looks like your balance history doesn't go that far back."
          errorTestId="account-history-chart-empty"
        />
      ) : (
        <GradientAreaChart
          AreaDataKey="balance"
          YAxisKey="balance"
          XAxisKey="date"
          data={data.getAccountDailyBalances}
          color={chartColor}
          data-testid="account-history-chart"
        />
      )}
    </div>
  );
}

export default BalanceHistoryChartController;
