import {
  Transaction,
  TransactionInput,
  useFetchAccountsAndCategoriesQuery,
  useUpdateTransactionMutation,
} from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import Toast from '@Common/Alerts/Toast';
import { EditForm } from './FormProvider';
import { Overlay, Content } from '../style';
import EditPaymentForm from './EditPaymentForm';
import EditTransferForm from './EditTransferForm';

type Props = {
  transaction: Transaction;
  isOpen: boolean;
  closeModal: () => void;
};

function EditFormController({ transaction, isOpen, closeModal }: Props) {
  const { data, loading: fetchingAccounts, error } = useFetchAccountsAndCategoriesQuery();
  const [
    updateTransaction,
    { loading: submittingPayment },
  ] = useUpdateTransactionMutation();
  const { showAlert } = useAlert();

  if (error) {
    if (isOpen) {
      closeModal();
    }
    return <Toast type="error" message="We ran into an error, please try again later" />;
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
      showAlert('There was an error updating your transaction. Try again', 'error', 7000);
    }
  };

  return (
    <Overlay isOpen={isOpen} onDismiss={closeModal}>
      <Content>
        <EditForm paymentType={transaction.type} isFetchingData={fetchingAccounts}>
          <EditForm.Loader />
          <EditForm.Title onClose={closeModal} />
          <EditForm.Transfer>
            <EditTransferForm
              accounts={data?.getAccounts}
              categories={data?.getCategories}
              isSubmitting={true}
            />
          </EditForm.Transfer>
          <EditForm.Payment>
            <EditPaymentForm
              transaction={transaction}
              onFormSubmit={handleEdit}
              categories={data?.getCategories}
              accounts={data?.getAccounts}
              isSubmitting={submittingPayment}
            />
          </EditForm.Payment>
        </EditForm>
      </Content>
    </Overlay>
  );
}

export default EditFormController;
