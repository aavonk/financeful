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
  onFormSubmit: (values: TransactionInput) => void;
};

function EditFormController({
  transaction,
  isOpen,
  closeModal,
  onFormSubmit,
}: Props) {
  const { data, loading, error } = useFetchAccountsAndCategoriesQuery();
  const { showAlert } = useAlert();

  if (error) {
    if (isOpen) {
      closeModal();
    }
    showAlert('Oops! We ran into an error. Try again', 'error', 7000);
  }
  return (
    <EditForm
      isOpen={isOpen}
      closeModal={closeModal}
      transaction={transaction}
      onFormSubmit={onFormSubmit}
      categories={data?.getCategories}
      accounts={data?.getAccounts}
      isFetching={loading}
    />
  );
}

export default EditFormController;
