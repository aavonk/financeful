import RecentTransactions from '@Modules/wallet/AccountOverview/RecentTransactions';
import { addDays } from '@Lib/date-formatting';

//TODO: Refreshing when modal is open breaks app
// route my-wallet/:id cant refresh -- why?
function AccountOverviewController() {
  const today = new Date();
  const startDate = addDays(today, { days: -90 });
  console.log({ startDate, today });
  return (
    <>
      <RecentTransactions startDate={startDate} endDate={today} />
    </>
  );
}

export default AccountOverviewController;
