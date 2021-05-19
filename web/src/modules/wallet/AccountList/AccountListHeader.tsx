import React from 'react';
import { HeaderContainer, Title } from './style';
import AddAccountFormController from '../Forms/AddAccountFormController';
function AccountListHeader() {
  return (
    <HeaderContainer>
      <Title>
        <h2>All Accounts</h2>
        <p>Add, edit, or delete your accounts</p>
      </Title>
      <AddAccountFormController />
    </HeaderContainer>
  );
}

export default AccountListHeader;
