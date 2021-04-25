import { ErrorBoundary } from 'react-error-boundary';
import AccountActionsController from '@Modules/wallet/AccountActionsController';
import AccountListError from '@Modules/wallet/AccountList/AccountListError';
import CreditCardsContainer from '@Modules/wallet/CreditCardsContainer';
import BalanceOverviewController from '@Modules/wallet/BalanceOverviewController';
import {
  GridContainer,
  CardViewContainer,
  WidgetViewContainer,
  AccountViewContainer,
} from './style';

function MyWalletPage() {
  return (
    <GridContainer>
      <CardViewContainer>
        <CreditCardsContainer />
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
