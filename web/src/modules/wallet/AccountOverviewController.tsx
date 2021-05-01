import { useHistory, useParams } from 'react-router-dom';
import { addDays } from '@Lib/date-formatting';
import { ModalRoot, ModalBody, ModalTitle } from '@Components/Modal';
import RecentTransactions from '@Modules/wallet/AccountOverview/RecentTransactions';
import DailyBalancesChart from '@Modules/wallet/AccountOverview/DailyBalancesChart';
import { BlueText } from '@Globals/index';
import { useQuery as useURLQuery } from '@Hooks/useQuery';

function AccountOverviewController() {
  const today = new Date();
  const startDate = addDays(today, { days: -30 });
  const history = useHistory();
  const params = useParams<{ account_id: string }>();
  const urlQuery = useURLQuery();
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
        title={`${urlQuery.get('name')}`}
        splitHeader
        RightSideComponent={<BlueText>See more</BlueText>}
      />
      <ModalBody>
        <DailyBalancesChart
          startDate={startDate}
          endDate={today}
          accountId={params.account_id}
        />
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
