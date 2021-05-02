import CardLoader from '@Components/CreditCard/CardLoader';
import BalanceHistoryChart from '@Modules/wallet/BalanceHistoryChart';

function DashboardPage() {
  return (
    <>
      <p>Hi</p>
      <CardLoader />
      <div style={{ marginTop: '20px', maxWidth: '800px' }}>
        <BalanceHistoryChart />
      </div>
    </>
  );
}

export default DashboardPage;
