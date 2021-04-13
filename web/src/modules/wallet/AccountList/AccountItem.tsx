import { ReactElement } from 'react';
import { Account } from '@Generated/graphql';
import { AccountItemBox, ItemName, MenuContainer } from './style';
import { capitalizeFirstLetter } from '@Lib/string-formating';
import { IAccountActions } from './AccountActions';

type Props = {
  account: Account;
  children: ReactElement<IAccountActions>;
};

function AccountItem({ account, children }: Props) {
  return (
    <AccountItemBox>
      <ItemName>
        <p>Nickname</p>
        <p>{account.accountName}</p>
      </ItemName>
      <ItemName>
        <p>Bank</p>
        <p>Todo - Add bank</p>
      </ItemName>
      <ItemName>
        <p>Account type</p>
        <p>{capitalizeFirstLetter(account.accountType!)}</p>
      </ItemName>
      <ItemName>
        <p>Current balance</p>
        {/* <p>{account.balance}</p> */}
      </ItemName>
      <MenuContainer>{children}</MenuContainer>
    </AccountItemBox>
  );
}

export default AccountItem;
