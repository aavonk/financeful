import {
  GridContainer,
  CardViewContainer,
  WidgetViewContainer,
  AccountViewContainer,
} from './style';
import AccountList from '@Components/AccountList';
import MutateAccountsController from '@Modules/wallet/MutateAccountsController';

function MyWalletPage() {
  return (
    <GridContainer>
      <CardViewContainer>Cards container</CardViewContainer>
      <WidgetViewContainer> Widgets!</WidgetViewContainer>
      <AccountViewContainer>
        <MutateAccountsController />
      </AccountViewContainer>
    </GridContainer>
  );
}

export default MyWalletPage;
