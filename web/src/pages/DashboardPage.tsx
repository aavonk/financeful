import CardLoader from '@Components/CreditCard/CardLoader';
import AssetsPieChart from '@Modules/wallet/Widgets/BalanceOverview/AssetsPieChart';
function DashboardPage() {
  return (
    <>
      <p>Hi</p>
      <CardLoader />
      <div style={{ marginTop: '20px' }}>
        <AssetsPieChart />
      </div>
    </>
  );
}

export default DashboardPage;
