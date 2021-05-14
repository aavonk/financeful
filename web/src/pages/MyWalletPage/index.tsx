import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AccountActionsController from '@Modules/wallet/AccountActionsController';
import AccountListError from '@Modules/wallet/AccountList/AccountListError';
import BalanceOverviewController from '@Modules/wallet/BalanceOverviewController';
import BalanceHistoryChartController from '@Modules/wallet/BalanceHistoryChartController';
import {
  GridContainer,
  CardViewContainer,
  WidgetViewContainer,
  AccountViewContainer,
} from './style';

function MyWalletPage() {
  return (
    <GridContainer>
      <CardViewContainer data-testid="networth-chart">
        <BalanceHistoryChartController />
      </CardViewContainer>
      <WidgetViewContainer>
        <BalanceOverviewController />
      </WidgetViewContainer>
      <AccountViewContainer>
        <ErrorBoundary FallbackComponent={AccountListError}>
          <AccountActionsController />
        </ErrorBoundary>
      </AccountViewContainer>
    </GridContainer>
  );
}

export default MyWalletPage;
