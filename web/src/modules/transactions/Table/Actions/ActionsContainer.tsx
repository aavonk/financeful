import React, { useState } from 'react';
import {
  Transaction,
  useDeleteTransactionMutation,
  useDeleteTransferMutation,
} from '@Generated/graphql';
import ActionsMenu from './ActionsMenu';
import { EditFormController } from '@Modules/transactions/Forms/EditTransactionForm';
import { useAlert } from '@Context/alert/alertContext';

function ActionsContainer({ transaction }: { transaction: Transaction }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [deleteTransfer] = useDeleteTransferMutation();
  const { showAlert } = useAlert();
  const { id } = transaction;

  const onDelete = () => {
    if (transaction.isTransfer) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return handleTransferDelete(transaction.transferId!);
    }

    handlePaymentDelete();
  };

  const handlePaymentDelete = async () => {
    try {
      const { data } = await deleteTransaction({
        variables: { id },
        update(cache) {
          cache.modify({
            fields: {
              getTransactions(existingTransactionsRef: Transaction[], { readField }) {
                return existingTransactionsRef.filter(
                  (transactionRef) => id !== readField('id', transactionRef),
                );
              },
            },
          });
        },
      });

      if (data?.deleteTransaction) {
        showAlert(data.deleteTransaction, 'info');
      }
    } catch (err) {
      showAlert('Please try again later', 'error', 5000);
    }
  };

  const handleTransferDelete = async (transferId: string) => {
    try {
      const { data } = await deleteTransfer({
        variables: { transferId },
        update(cache) {
          cache.modify({
            fields: {
              getTransactions(existingTransactionsRef: Transaction[], { readField }) {
                return existingTransactionsRef.filter(
                  (transactionRef) =>
                    transferId !== readField('transferId', transactionRef),
                );
              },
            },
          });
        },
      });

      if (data?.deleteTransfer) {
        showAlert(data.deleteTransfer, 'info');
      }
    } catch (error) {
      showAlert('Please try again later', 'error', 5000);
    }
  };

  return (
    <>
      <ActionsMenu onDelete={onDelete} onEditClick={() => setShowEditForm(true)} />
      <EditFormController
        transaction={transaction}
        closeModal={() => setShowEditForm(false)}
        isOpen={showEditForm}
      />
    </>
  );
}

export default ActionsContainer;
