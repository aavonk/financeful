import { useEffect } from 'react';
import {
  Transaction,
  TransactionInput,
  useFetchAccountsAndCategoriesQuery,
  useUpdateTransactionMutation,
  useUpdateTransferMutation,
  useGetTransferLazyQuery,
  TransferInput,
  GetTransactionsDocument,
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
    getTransfer,
    { data: transfer, loading: fetchingTransfer, error: transferError },
  ] = useGetTransferLazyQuery();
  const [
    updateTransaction,
    { loading: submittingPayment },
  ] = useUpdateTransactionMutation();
  const [updateTransfer, { loading: submittingTransfer }] = useUpdateTransferMutation();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (isOpen && transaction.isTransfer) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getTransfer({ variables: { id: transaction.transferId! } });
    }
  }, [getTransfer, isOpen, transaction.isTransfer, transaction.transferId]);

  if (error || transferError) {
    if (isOpen) {
      closeModal();
    }
    return <Toast type="error" message="We ran into an error, please try again later" />;
  }

  const handlePaymentEdit = async (values: TransactionInput) => {
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

  const handleTransferEdit = async (values: TransferInput, id: string) => {
    try {
      const { data } = await updateTransfer({
        variables: { input: values, transferId: id },
        update(cache, { data }) {
          cache.modify({
            fields: {
              getTransactions(existingTransactionsRef = [], { readField }) {
                const filteredTransactions = existingTransactionsRef.filter(
                  (transactionRef: Transaction) =>
                    id !== readField('transferId', transactionRef),
                );
                const newTransactionsRef = cache.writeQuery({
                  data: data?.updateTransfer,
                  query: GetTransactionsDocument,
                });
                return [newTransactionsRef, ...filteredTransactions];
              },
            },
          });
        },
      });

      if (data?.updateTransfer.error) {
        showAlert(data.updateTransfer.error.message, 'error', 7000);
      }

      if (data?.updateTransfer.transactions) {
        closeModal();
        showAlert('Transfer updated', 'info');
      }
    } catch (err) {
      closeModal();
      showAlert('There was an error updating your transfer. Try again', 'error', 7000);
    }
  };

  return (
    <Overlay isOpen={isOpen} onDismiss={closeModal}>
      <Content aria-label="Edit transaction">
        <EditForm
          paymentType={transaction.type}
          isFetchingData={fetchingAccounts || fetchingTransfer}
        >
          <EditForm.Loader />
          <EditForm.Title onClose={closeModal} />
          <EditForm.Transfer>
            <EditTransferForm
              accounts={data?.getAccounts}
              categories={data?.getCategories}
              isSubmitting={submittingTransfer}
              transfer={transfer?.getTransfer}
              onFormSubmit={handleTransferEdit}
            />
          </EditForm.Transfer>
          <EditForm.Payment>
            <EditPaymentForm
              transaction={transaction}
              onFormSubmit={handlePaymentEdit}
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
