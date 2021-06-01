import React from 'react';
import { EditFormController } from '@Modules/transactions/Forms/EditTransactionForm';
import { Transaction } from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import { useDeleteTransaction } from '@Modules/transactions/mutations/useDeleteTransaction';
import { useDeleteTransfer } from '@Modules/transactions/mutations/useDeleteTransfer';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: Transaction | null;
};

function ActionsContainer({ isModalOpen, setIsModalOpen, transaction }: Props) {
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

  const handlePaymentDelete = async () => {
    try {
      const { data } = await deleteTransaction({
        variables: { id: transaction.id },
      });

      setIsModalOpen(false);
      if (data?.deleteTransaction) {
        showAlert(data.deleteTransaction, 'info');
      }
    } catch (err) {
      setIsModalOpen(false);

      showAlert('Please try again later', 'error', 5000);
    }
  };
  const handleTransferDelete = async (transferId: string) => {
    try {
      const { data } = await deleteTransfer({
        variables: { transferId },
      });
      setIsModalOpen(false);

      if (data?.deleteTransfer) {
        showAlert(data.deleteTransfer, 'info');
      }
    } catch (error) {
      setIsModalOpen(false);
      showAlert('Please try again later', 'error', 5000);
    }
  };

  return (
    <EditFormController
      transaction={transaction}
      closeModal={() => setIsModalOpen(false)}
      isOpen={isModalOpen}
      onDelete={onDelete}
    />
  );
}

export default ActionsContainer;
