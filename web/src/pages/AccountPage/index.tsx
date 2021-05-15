import React from 'react';

import BalanceHistoryChartController from '@Modules/accounts/BalanceHistoryChartController';
import RecentTransactions from '@Modules/accounts/RecentActivity/RecentTransactions';
import { DateRangeProvider } from '@Context/daterange/DateRangeContext';
import {
  ChartContainer,
  TransactionsContainer,
  InsightsContainer,
  GridContainer,
  ItemsContainer,
} from './style';
import Insights from '@Modules/accounts/RecentActivity/Insights';

function AccountPage() {
  return (
    <GridContainer>
      <DateRangeProvider>
        <ChartContainer>
          <BalanceHistoryChartController />
        </ChartContainer>
        <ItemsContainer>
          <TransactionsContainer>
            <RecentTransactions />
          </TransactionsContainer>
          <InsightsContainer>
            <Insights />
          </InsightsContainer>
        </ItemsContainer>
      </DateRangeProvider>
    </GridContainer>
  );
}

export default AccountPage;
