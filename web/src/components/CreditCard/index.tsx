/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CSSProperties } from 'react';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import { Account } from '@Generated/graphql';
import { Card, BankName, Data, Chip } from './style';

const account: Account = {
  __typename: 'Account',
  id: 'wreqe',
  accountName: 'Primary Checking',
  accountType: 'DEBIT',
  isAsset: true,
  isLiability: false,
  balance: 2000000,
  bankName: 'Chase',
  isInactive: false,
};

type Props = {
  style?: CSSProperties;
};

function CreditCard({ style }: Props) {
  return (
    <Card style={style}>
      <BankName>
        <span />
        <p>{account.accountName}</p>
      </BankName>
      <Chip>
        <div className="side left" />
        <div className="side right" />
        <div className="vertical top" />
        <div className="vertical bottom" />
      </Chip>
      <Data>
        <div className="pan"> {formatMoneyFromCentsToDollars(account.balance!)}</div>
        <div className="details">
          <div className="label">Last used</div>
          <div className="date">12/24/2021</div>
        </div>
      </Data>
    </Card>
  );
}

export default CreditCard;
