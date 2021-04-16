import AccountList from '@Modules/wallet/AccountList';
import AccountListLoader from '@Modules/wallet/AccountList/AccountListLoader';
import { Account, useGetAccountsQuery } from '@Generated/graphql';
import Toast from '@Common/Alerts/Toast';
import AccountListError from './AccountList/AccountListError';

function MutateAccountsController() {
  const {
    data: accounts,
    loading: loadingAccounts,
    error: accountsError,
  } = useGetAccountsQuery();
  const handleEdit = (account: Account) => {
    alert(JSON.stringify(account, null, 2));
  };

  const handleDelete = (account: Account) => {
    alert(JSON.stringify(account, null, 2));
  };

  if (loadingAccounts) {
    return <AccountListLoader />;
  }

  if (accountsError) {
    return <AccountListError />;
  }
  return (
    <AccountList
      accounts={accounts?.getAccounts}
      onDelete={handleDelete}
      onEditClick={handleEdit}
    />
  );
}

//<AccountList
// accounts={accounts?.getAccounts}
// onDelete={handleDelete}
// onEditClick={handleEdit}
// >
//
// <AccountListHeader />
//

export default MutateAccountsController;
