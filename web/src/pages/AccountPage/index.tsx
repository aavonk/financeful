import React from 'react';

import BalanceHistoryChartController from '@Modules/accounts/BalanceHistoryChartController';
import RecentTransactions from '@Modules/accounts/RecentActivity/RecentTransactions';
function AccountPage() {
  return (
    <div>
      <BalanceHistoryChartController />
      <RecentTransactions />
    </div>
  );
}

export default AccountPage;
