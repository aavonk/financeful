/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Account } from '@Generated/graphql';
import { AccountItemBox, ItemName, MenuContainer, TextWrapper } from './style';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import { IAccountActions } from './AccountActions';

type Props = {
  account: Account;
  children: ReactElement<IAccountActions>;
};

function AccountItem({ account, children }: Props) {
  const history = useHistory();

  return (
    <AccountItemBox data-testid="account-item" $inactive={account.isInactive!}>
      <TextWrapper onClick={() => history.push(`/account/${account.id}`)}>
        <ItemName>
          <p>Nickname</p>
          <p>{account.accountName}</p>
        </ItemName>
        <ItemName hide>
          <p>Bank</p>
          <p>{account.bankName ? account.bankName : ' '}</p>
        </ItemName>
        <ItemName hide>
          <p>Account type</p>
          <p>{account.accountType}</p>
        </ItemName>
        <ItemName>
          <p>Current balance</p>
          <p>{formatMoneyFromCentsToDollars(account.balance!)}</p>
        </ItemName>
      </TextWrapper>
      <MenuContainer>{children}</MenuContainer>
    </AccountItemBox>
  );
}

export default AccountItem;
