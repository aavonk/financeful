/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CSSProperties } from 'react';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import { Account } from '@Generated/graphql';
import { Card, BankName, Data, Chip, AmountBar } from './style';

type Props = {
  style?: CSSProperties;
  account: Account;
};

function CreditCard({ style, account }: Props) {
  return (
    <Card style={style}>
      <BankName>
        <span className="empty" />
        <div className="names">
          <p>{account.accountName}</p>
          <span className="bank-name">{account.bankName}</span>
        </div>
      </BankName>
      <AmountBar>
        <Chip>
          <div className="side left" />
          <div className="side right" />
          <div className="vertical top" />
          <div className="vertical bottom" />
        </Chip>
        <div className="pan"> {formatMoneyFromCentsToDollars(account.balance!)}</div>
      </AmountBar>

      <Data>
        <div className="details">
          <div className="label">Last used</div>
          <div className="date">12/24/2021</div>
        </div>
      </Data>
    </Card>
  );
}

export default CreditCard;
