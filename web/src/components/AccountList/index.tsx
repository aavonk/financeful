import Paper from '@Common/Paper';
import { Container } from './style';
import Header from './Header';

import { Account } from '@Generated/graphql';
import AccountItem from './AccountItem';
import EmptyView from '@Components/EmptyViews/GeneralEmptyView';
import AccountListLoader from './AccountListLoader';

const accounts: Account[] = [
  {
    id: 'asdf234',
    accountName: 'Primary Checking',
    accountType: 'DEBIT',
    isAsset: true,
    isLiability: false,
  },
  {
    id: 'lkjlk234',
    accountName: 'Primary Savings',
    accountType: 'SAVINGS',
    isAsset: true,
    isLiability: false,
  },
  {
    id: 'lkas987kjdf',
    accountName: 'Credit Card',
    accountType: 'CREDIT',
    isAsset: false,
    isLiability: true,
  },
  {
    id: 'as1212df234',
    accountName: 'Primary Checking',
    accountType: 'DEBIT',
    isAsset: true,
    isLiability: false,
  },
  {
    id: 'lkj3333lk234',
    accountName: 'Primary Savings',
    accountType: 'SAVINGS',
    isAsset: true,
    isLiability: false,
  },
  {
    id: 'lka11449s987kjdf',
    accountName: 'Credit Card',
    accountType: 'CREDIT',
    isAsset: false,
    isLiability: true,
  },
  {
    id: '098asd',
    accountName: 'Primary Checking',
    accountType: 'DEBIT',
    isAsset: true,
    isLiability: false,
  },
  {
    id: 'asfd7687lksdf',
    accountName: 'Primary Savings',
    accountType: 'SAVINGS',
    isAsset: true,
    isLiability: false,
  },
  {
    id: '123khj987sd',
    accountName: 'Credit Card',
    accountType: 'CREDIT',
    isAsset: false,
    isLiability: true,
  },
  {
    id: 'aaasdfsdfsdf',
    accountName: 'Primary Checking',
    accountType: 'DEBIT',
    isAsset: true,
    isLiability: false,
  },
  {
    id: 'fffffffffffffffffff',
    accountName: 'Primary Savings',
    accountType: 'SAVINGS',
    isAsset: true,
    isLiability: false,
  },
  {
    id: 'ddddddddddddddddd',
    accountName: 'Credit Card',
    accountType: 'CREDIT',
    isAsset: false,
    isLiability: true,
  },
];

function AccountList() {
  return (
    <Paper>
      <Container>
        <Header />
        {/* {accounts.length > 0 ? (
          accounts.map((account) => <AccountItem key={account.id} account={account} />)
        ) : (
          <EmptyView
            heading="You haven't added any accounts yet"
            subheading="When you do, you'll see them here."
            containerHeight="300px"
          />
        )} */}
        <AccountListLoader />
      </Container>
    </Paper>
  );
}

export default AccountList;
