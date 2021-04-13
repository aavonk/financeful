import * as React from 'react';
import { Account } from '@Generated/graphql';
import { AccountItemBox, ItemName, MenuContainer } from './style';
import { capitalizeFirstLetter } from '@Lib/string-formating';
import { IAccountActions } from './AccountActions';

type Props = {
  account: Account;
  children: React.ReactElement<IAccountActions>;
};

function AccountItem({ account, children }: Props) {
  return (
    <AccountItemBox>
      {/* name */}
      <ItemName>
        <p>Nickname</p>
        <p>{account.accountName}</p>
      </ItemName>
      <ItemName>
        <p>Bank</p>
        <p>Chase</p>
      </ItemName>
      <ItemName>
        <p>Account type</p>
        <p>{capitalizeFirstLetter(account.accountType!)}</p>
      </ItemName>
      <ItemName>
        <p>Current balance</p>
        <p>$1,345.78</p>
      </ItemName>
      <MenuContainer>{children}</MenuContainer>
    </AccountItemBox>
  );
}

export default AccountItem;
