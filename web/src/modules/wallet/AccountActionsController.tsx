import AccountList from '@Modules/wallet/AccountList';
import AccountListLoader from '@Modules/wallet/AccountList/AccountListLoader';
import { Account, useGetAccountsQuery } from '@Generated/graphql';

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

  //TODO: Error state handling
  if (accountsError) {
    console.error(accountsError);
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
