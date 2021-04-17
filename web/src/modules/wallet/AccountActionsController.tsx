import { useState } from 'react';
import AccountList from '@Modules/wallet/AccountList';
import AccountListLoader from '@Modules/wallet/AccountList/AccountListLoader';
import { Account, useGetAccountsQuery } from '@Generated/graphql';
import AccountListError from './AccountList/AccountListError';
import { useConfirmation } from '@Context/confirmation/confirmationContext';
import EditAccountForm from './Forms/EditAccountForm';

function MutateAccountsController() {
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);
  const { data, loading: loadingAccounts, error: accountsError } = useGetAccountsQuery();
  const confirm = useConfirmation();

  const handleEdit = (account: Account) => {
    setAccountToEdit(account);
    setDisplayEditForm(true);
  };

  const handleDelete = async (account: Account) => {
    const shouldProceed = await confirm({
      title: 'Are you sure?',
      description:
        'Deleting an account will permanently remove all transaction history associated with this account. This cannot be undone. To keep your history, you can mark this account inactive instead.',
      dangerButtonText: 'Delete',
    });

    if (shouldProceed) {
      console.log(account);
    }
  };

  const submitEdit = () => {
    console.log('edit');
  };

  if (loadingAccounts) {
    return <AccountListLoader />;
  }

  if (accountsError) {
    return <AccountListError />;
  }

  return (
    <>
      <AccountList
        accounts={data?.getAccounts}
        onDelete={handleDelete}
        onEditClick={handleEdit}
      />
      <EditAccountForm
        isOpen={displayEditForm}
        onDismiss={() => setDisplayEditForm(false)}
        account={accountToEdit}
        onFormSubmit={submitEdit}
        isSubmitting={true}
      />
    </>
  );
}

export default MutateAccountsController;
