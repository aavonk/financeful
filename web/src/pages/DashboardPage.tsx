import ConfirmationDialog from '@Components/Confirmation';

function DashboardPage() {
  return (
    <>
      <div>Dashboard page yay</div>;
      <p>
        {' '}
        In the backend, make sure that when making a transfer, the two accounts are not
        the same
      </p>
      <p>Add query to get transfer to populate editTransferForm</p>
      <ConfirmationDialog
        heading="Heyo!"
        message="Whats up fam"
        confirmButtonText="Delete"
      />
    </>
  );
}

export default DashboardPage;
