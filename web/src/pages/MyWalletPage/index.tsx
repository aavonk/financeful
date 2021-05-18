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
  PageContainer,
} from './style';

function MyWalletPage() {
  return (
    <PageContainer>
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
    </PageContainer>
  );
}

export default MyWalletPage;
