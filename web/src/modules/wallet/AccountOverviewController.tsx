import RecentTransactions from '@Modules/wallet/AccountOverview/RecentTransactions';
import { addDays } from '@Lib/date-formatting';

//TODO: Refreshing when modal is open breaks app
// route my-wallet/:id cant refresh -- why?

type Props = {
  accountId: string;
};

function AccountOverviewController({ accountId }: Props) {
  const today = new Date();
  const startDate = addDays(today, { days: -90 });
  return (
    <>
      <RecentTransactions startDate={startDate} endDate={today} accountId={accountId} />
    </>
  );
}

export default AccountOverviewController;
