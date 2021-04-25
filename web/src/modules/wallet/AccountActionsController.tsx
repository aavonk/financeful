import { useState } from 'react';
import AccountList from '@Modules/wallet/AccountList';
import AccountListLoader from '@Modules/wallet/AccountList/AccountListLoader';
import {
  Account,
  useGetAccountsQuery,
  EditAccountInput,
  useEditAccountMutation,
  useToggleAccountActiveStatusMutation,
  useDeleteAccountMutation,
} from '@Generated/graphql';
import AccountListError from './AccountList/AccountListError';
import { useConfirmation } from '@Context/confirmation/confirmationContext';
import { useAlert } from '@Context/alert/alertContext';
import EditAccountForm from './Forms/EditAccountForm';

function AccountActionsController() {
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);
  const { showAlert } = useAlert();
  const confirm = useConfirmation();

  const { data, loading: loadingAccounts, error: accountsError } = useGetAccountsQuery();
  const [editAccount, { loading: submittingEdit }] = useEditAccountMutation();
  const [toggleActiveStatus] = useToggleAccountActiveStatusMutation();
  const [deleteAccount] = useDeleteAccountMutation();

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
      const response = await deleteAccount({
        variables: { accountId: account.id },
        update(cache) {
          cache.modify({
            fields: {
              getAccounts(existingAccounts = [], { readField }) {
                return existingAccounts.filter(
                  (reference: any) => account.id !== readField('id', reference),
                );
              },
            },
          });
        },
      });

      if (response.data?.deleteAccount) {
        setDisplayEditForm(false);
        showAlert('Account deleted', 'info');
      }
    }
  };

  const onEditSubmit = async (accountId: string, values: EditAccountInput) => {
    try {
      const response = await editAccount({
        variables: {
          accountId,
          input: values,
        },
      });

      if (response.data?.editAccount) {
        showAlert('Successfully updated account', 'info');
        setDisplayEditForm(false);
      }
    } catch (err) {
      setDisplayEditForm(false);
      showAlert('We ran into an error. Try again?', 'error', 7000);
    }
  };

  const handleMarkInactive = async (account: Account) => {
    try {
      if (account.isInactive) {
        await toggleActiveStatus({ variables: { accountId: account.id } });
        return;
      }
      const shouldProceed = await confirm({
        title: 'Are you sure?',
        description:
          "You will still be able to see previous transaction history related to this account, but won't be able to create new ones.",
        dangerButtonText: 'Confirm',
      });

      if (shouldProceed) {
        await toggleActiveStatus({ variables: { accountId: account.id } });
      }
    } catch (err) {
      showAlert('We ran into an error. Try again?', 'error', 7000);
    }
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
        onDeleteClick={handleDelete}
        onEditClick={handleEdit}
        onMarkInactiveClick={handleMarkInactive}
      />
      <EditAccountForm
        isOpen={displayEditForm}
        onDismiss={() => setDisplayEditForm(false)}
        account={accountToEdit}
        onFormSubmit={onEditSubmit}
        isSubmitting={submittingEdit}
      />
    </>
  );
}

export default AccountActionsController;
