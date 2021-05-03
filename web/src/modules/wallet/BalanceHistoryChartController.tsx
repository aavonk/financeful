import { useGetBalanceHistoriesQuery } from '@Generated/graphql';
import { addDays } from '@Lib/date-formatting';
import { AreaChartSkeleton } from '@Components/ChartSkeletons';
function BalanceHistoryChartController() {
  const today = new Date();
  const startDate = addDays(today, { days: -90 });
  const { data, loading, error } = useGetBalanceHistoriesQuery({
    variables: { input: { startDate, endDate: today } },
  });

  if (loading) {
    return <AreaChartSkeleton />;
  }

  return <div></div>;
}

export default BalanceHistoryChartController;
