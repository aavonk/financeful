import AccountList from '@Components/AccountList';
import { Account } from '@Generated/graphql';

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

function MutateAccountsController() {
  const handleEdit = (account: Account) => {
    alert(account);
  };

  const handleDelete = (account: Account) => {
    alert(account);
  };
  return (
    <AccountList
      accounts={accounts}
      onDelete={handleDelete}
      onEditClick={handleEdit}
    ></AccountList>
  );
}

export default MutateAccountsController;
