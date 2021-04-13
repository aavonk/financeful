import AccountActionsController from '@Modules/wallet/AccountActionsController';
import {
  GridContainer,
  CardViewContainer,
  WidgetViewContainer,
  AccountViewContainer,
} from './style';

function MyWalletPage() {
  return (
    <GridContainer>
      <CardViewContainer>Cards container</CardViewContainer>
      <WidgetViewContainer> Widgets!</WidgetViewContainer>
      <AccountViewContainer>
        {/* TODO: Add an error boundary surrounding mutateaccountscontroller */}
        <AccountActionsController />
      </AccountViewContainer>
    </GridContainer>
  );
}

export default MyWalletPage;
