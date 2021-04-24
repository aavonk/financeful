import CardLoader from '@Components/CreditCard/CardLoader';
import BarchartSkeleton from '@Components/ChartSkeletons/BarchartSkeleton';
function DashboardPage() {
  return (
    <>
      <p>Hi</p>
      <CardLoader />
      <div style={{ marginTop: '20px' }}>
        <BarchartSkeleton barsCount={5} />
      </div>
    </>
  );
}

export default DashboardPage;
