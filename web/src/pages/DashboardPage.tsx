import CardLoader from '@Components/CreditCard/CardLoader';

function DashboardPage() {
  return (
    <>
      <p>Hi</p>
      <CardLoader />
      <div style={{ marginTop: '20px', maxWidth: '800px' }}></div>
      <div>
        TODO:
        <ul>
          <li>Make My wallet page more responsive</li>
        </ul>
      </div>
    </>
  );
}

export default DashboardPage;
