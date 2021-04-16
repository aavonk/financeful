import AccountList from '@Modules/wallet/AccountList';
import AccountListLoader from '@Modules/wallet/AccountList/AccountListLoader';
import { Account, useGetAccountsQuery } from '@Generated/graphql';
import AccountListError from './AccountList/AccountListError';

function MutateAccountsController() {
  const { data, loading: loadingAccounts, error: accountsError } = useGetAccountsQuery();

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
      accounts={data?.getAccounts}
      onDelete={handleDelete}
      onEditClick={handleEdit}
    />
  );
}

export default MutateAccountsController;
