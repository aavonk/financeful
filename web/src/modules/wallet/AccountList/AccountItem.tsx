/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ReactElement } from 'react';
import { Account } from '@Generated/graphql';
import { AccountItemBox, ItemName, MenuContainer } from './style';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
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
        <p>{account.bankName ? account.bankName : ' '}</p>
      </ItemName>
      <ItemName>
        <p>Account type</p>
        <p>{account.accountType}</p>
      </ItemName>
      <ItemName>
        <p>Current balance</p>
        <p>{formatMoneyFromCentsToDollars(account.balance!)}</p>
      </ItemName>
      <MenuContainer>{children}</MenuContainer>
    </AccountItemBox>
  );
}

export default AccountItem;
