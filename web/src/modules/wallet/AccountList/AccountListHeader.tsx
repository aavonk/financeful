import { HeaderContainer, Title } from './style';
import AddAccountFormController from '../Forms/AddAccountFormController';
function AccountListHeader() {
  return (
    <HeaderContainer>
      <Title>
        <h3>All Accounts</h3>
        <p>Add, edit, or delete your accounts</p>
      </Title>
      <AddAccountFormController />
    </HeaderContainer>
  );
}

export default AccountListHeader;
