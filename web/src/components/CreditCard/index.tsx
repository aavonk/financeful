/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import { Account } from '@Generated/graphql';
import { Card, BankName, Data, Chip, LinesUp, LinesDown } from './style';
import { motion, useTransform, useMotionValue, useCycle } from 'framer-motion';

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
  layoutId: string;
};

function CreditCard({ layoutId }: Props) {
  const [animate, cycle] = useCycle({ scale: 1, rotate: 0 }, { scale: 1.25, rotate: 90 });

  return (
    <motion.div
      layoutId={layoutId}
      animate={animate}
      onTap={() => cycle()}
      // whileHover={{ scale: 1.2 }
    >
      <Card>
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
          <div className="pan" title="XXXX XXXX XXXX XXXX">
            {' '}
            Balance: {formatMoneyFromCentsToDollars(account.balance!)}
          </div>
          <div className="details">
            <div className="label">Last used</div>
            <div className="date">12/24/2021</div>
          </div>
        </Data>
        <LinesUp />
        <LinesDown />
      </Card>
    </motion.div>
  );
}

export default CreditCard;
