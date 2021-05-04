import { useGetBalanceHistoriesQuery } from '@Generated/graphql';
import { addDays } from '@Lib/date-formatting';
import { AreaChartSkeleton } from '@Components/ChartSkeletons';
import BalanceHistoryChart from './BalanceHistoryChart';
function BalanceHistoryChartController() {
  const today = new Date();
  const startDate = addDays(today, { days: -90 });

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
  return <BalanceHistoryChart data={data.getBalanceHistories} />;
}

export default BalanceHistoryChartController;
