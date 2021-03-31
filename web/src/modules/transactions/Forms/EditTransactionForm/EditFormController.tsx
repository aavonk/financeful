import {
  Transaction,
  useFetchAccountsAndCategoriesQuery,
  TransactionInput,
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
  const { showAlert } = useAlert();

  if (error) {
    if (isOpen) {
      closeModal();
    }
    showAlert('Oops! We ran into an error. Try again', 'error', 7000);
  }

  // Submit the updates and close the modal and set alert!

  const handleEdit = (values: TransactionInput) => {
    console.log(values);
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
