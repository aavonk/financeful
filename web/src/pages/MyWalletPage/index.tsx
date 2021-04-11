import {
  GridContainer,
  CardViewContainer,
  WidgetViewContainer,
  AccountViewContainer,
} from './style';
import AccountList from '@Components/AccountList';

function MyWalletPage() {
  return (
    <GridContainer>
      <CardViewContainer>Cards container</CardViewContainer>
      <WidgetViewContainer> Widgets!</WidgetViewContainer>
      <AccountViewContainer>
        <AccountList />
      </AccountViewContainer>
    </GridContainer>
  );
}

export default MyWalletPage;
