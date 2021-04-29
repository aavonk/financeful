import RecentTransactions from '@Modules/wallet/AccountOverview/RecentTransactions';
import { useHistory, useParams } from 'react-router-dom';
import { addDays } from '@Lib/date-formatting';
import { ModalRoot, ModalBody, ModalTitle } from '@Components/Modal';

function AccountOverviewController() {
  const today = new Date();
  const startDate = addDays(today, { days: -90 });
  const history = useHistory();
  const params = useParams<{ account_id: string }>();

  const handleClose = () => {
    history.push('/my-wallet');
  };

  return (
    <ModalRoot
      isOpen={Boolean(params.account_id)}
      onDismiss={handleClose}
      ariaLabel="Account overview"
    >
      <ModalTitle
        onClose={handleClose}
        title="Account Overview"
        splitHeader
        RightSideComponent={<span>See more</span>}
      />
      <ModalBody>
        <RecentTransactions
          startDate={startDate}
          endDate={today}
          accountId={params.account_id}
        />
      </ModalBody>
    </ModalRoot>
  );
}

export default AccountOverviewController;
