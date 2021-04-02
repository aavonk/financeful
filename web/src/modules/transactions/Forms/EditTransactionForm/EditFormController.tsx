import {
  Transaction,
  TransactionInput,
  useFetchAccountsAndCategoriesQuery,
  useUpdateTransactionMutation,
} from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import EditForm from './EditForm';
import Toast from '@Common/Alerts/Toast';
type Props = {
  transaction: Transaction;
  isOpen: boolean;
  closeModal: () => void;
};

function EditFormController({ transaction, isOpen, closeModal }: Props) {
  const { data, loading, error } = useFetchAccountsAndCategoriesQuery();
  const [updateTransaction, submitting] = useUpdateTransactionMutation();
  const { showAlert } = useAlert();

  if (error) {
    if (isOpen) {
      closeModal();
    }
    return (
      <Toast
        type="error"
        message="We ran into an error, please try again later"
      />
    );
  }

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
      closeModal();
      showAlert(
        'There was an error updating your transaction. Try again',
        'error',
        7000,
      );
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
      isSubmitting={submitting.loading}
    />
  );
}

export default EditFormController;
