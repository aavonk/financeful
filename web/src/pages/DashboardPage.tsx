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
          <li>Delete CreditCards and CreditCards controller</li>
          <li>Delete Account Overview Modal</li>
          <li>
            Change Y Axis on areas to include low and high value, using type number and
            domain prop
          </li>
          <li>
            Update Assets & Liabilites Card & cache when account is created or deleted
          </li>
        </ul>
      </div>
    </>
  );
}

export default DashboardPage;
