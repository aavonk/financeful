import {
  Transaction,
  TransactionInput,
  useFetchAccountsAndCategoriesQuery,
  useUpdateTransactionMutation,
} from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import EditForm from './EditForm';

type Props = {
  transaction: Transaction;
  isOpen: boolean;
  closeModal: () => void;
};

function EditFormController({ transaction, isOpen, closeModal }: Props) {
  const { data, loading, error } = useFetchAccountsAndCategoriesQuery();
  const [updateTransaction] = useUpdateTransactionMutation();
  const { showAlert } = useAlert();

  if (error) {
    if (isOpen) {
      closeModal();
    }
    showAlert('Oops! We ran into an error. Try again', 'error', 7000);
  }

  // Submit the updates and close the modal and set alert!

  const handleEdit = async (values: TransactionInput) => {
    try {
      await updateTransaction({
        variables: {
          input: values,
          id: transaction.id,
        },
      });
      closeModal();
      showAlert('Transaction updated', 'info');
    } catch (err) {
      showAlert(
        'There was an error updating your transaction. Try again',
        'error',
        7000,
      );
      console.error(err.message);
    }
  };

  return (
    <EditForm
      isOpen={isOpen}
      closeModal={closeModal}
      transaction={transaction}
      onFormSubmit={handleEdit}
      categories={data?.getCategories}
      accounts={data?.getAccounts}
      isFetching={loading}
    />
  );
}

export default EditFormController;
