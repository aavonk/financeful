import {
  BalanceOverview,
  BalanceOverviewSkeleton,
  BalanceOverviewError,
} from '@Modules/wallet/Widgets/BalanceOverview/';
import { useGetAssetsAndLiabilitiesQuery } from '@Generated/graphql';

function BalanceOverviewController() {
  const { data, loading, error, refetch } = useGetAssetsAndLiabilitiesQuery();

  if (loading) {
    return <BalanceOverviewSkeleton />;
  }
  if (error || !data) {
    return <BalanceOverviewError onRetry={() => refetch()} />;
  }
  return <BalanceOverview data={data.getAssetsAndLiabilites} />;
}

export default BalanceOverviewController;
