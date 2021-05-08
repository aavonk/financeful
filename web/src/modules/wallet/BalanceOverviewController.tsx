import {
  BalanceOverview,
  BalanceOverviewSkeleton,
  BalanceOverviewError,
} from '@Modules/wallet/BalanceOverview';
import { useGetAssetsAndLiabilitiesQuery } from '@Generated/graphql';

function BalanceOverviewController() {
  const { data, loading, error, refetch } = useGetAssetsAndLiabilitiesQuery();

  if (loading) {
    //TODO: Change the skeleton as I deleted the bar chart
    return <BalanceOverviewSkeleton />;
  }
  if (error || !data) {
    return <BalanceOverviewError onRetry={() => refetch()} />;
  }
  return <BalanceOverview data={data.getAssetsAndLiabilites} />;
}

export default BalanceOverviewController;
