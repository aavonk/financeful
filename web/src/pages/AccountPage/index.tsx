import React from 'react';

import BalanceHistoryChartController from '@Modules/accounts/BalanceHistoryChartController';
import RecentTransactions from '@Modules/accounts/RecentActivity/RecentTransactions';
import { DateRangeProvider } from '@Context/daterange/DateRangeContext';

function AccountPage() {
  return (
    <div>
      <DateRangeProvider>
        <BalanceHistoryChartController />
        <RecentTransactions />
      </DateRangeProvider>
    </div>
  );
}

export default AccountPage;
