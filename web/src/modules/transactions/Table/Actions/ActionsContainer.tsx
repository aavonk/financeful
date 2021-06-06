import React from 'react';
import { EditFormController } from '@Modules/transactions/Forms/EditTransactionForm';
import { Transaction } from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import { useDeleteTransaction } from '@Modules/transactions/mutations/useDeleteTransaction';
import { useDeleteTransfer } from '@Modules/transactions/mutations/useDeleteTransfer';
import type { Action } from '@Pages/TransactionPage/transactionsPageReducer';

type Props = {
  isModalOpen: boolean;
  transaction: Transaction | null;
  dispatch: React.Dispatch<Action>;
};

function ActionsContainer({ isModalOpen, transaction, dispatch }: Props) {
  if (!transaction) {
    return null;
  }
  const { mutate: deleteTransaction } = useDeleteTransaction(transaction.id);
  const { mutate: deleteTransfer } = useDeleteTransfer(transaction.transferId!);
  const { showAlert } = useAlert();

  const onDelete = () => {
    if (transaction.isTransfer && transaction.transferId) {
      return handleTransferDelete(transaction.transferId);
    }

    handlePaymentDelete();
  };

  const closeModal = () => dispatch({ type: 'TOGGLE_MODAL', payload: false });

  const handlePaymentDelete = async () => {
    try {
      const { data } = await deleteTransaction({
        variables: { id: transaction.id },
      });

      closeModal();
      if (data?.deleteTransaction) {
        showAlert(data.deleteTransaction, 'info');
      }
    } catch (err) {
      closeModal();

      showAlert('Please try again later', 'error', 5000);
    }
  };
  const handleTransferDelete = async (transferId: string) => {
    try {
      const { data } = await deleteTransfer({
        variables: { transferId },
      });
      closeModal();

      if (data?.deleteTransfer) {
        showAlert(data.deleteTransfer, 'info');
      }
    } catch (error) {
      closeModal();
      showAlert('Please try again later', 'error', 5000);
    }
  };

  return (
    <EditFormController
      transaction={transaction}
      // closeModal={() => setIsModalOpen(false)}
      dispatch={dispatch}
      isOpen={isModalOpen}
      onDelete={onDelete}
    />
  );
}

export default ActionsContainer;
