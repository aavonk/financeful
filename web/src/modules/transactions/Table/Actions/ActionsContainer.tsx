import { useState } from 'react';
import { Transaction, useDeleteTransactionMutation } from '@Generated/graphql';
import ActionsMenu from './ActionsMenu';
import { EditFormController } from '@Modules/transactions/Forms/EditTransactionForm';
import { useAlert } from '@Context/alert/alertContext';

function ActionsContainer({ transaction }: { transaction: Transaction }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteTransactionMutation] = useDeleteTransactionMutation();
  const { showAlert } = useAlert();
  const { id } = transaction;

  const onDelete = () => {
    alert('Need to handle deleting a transfer');
  };

  // const onDelete = async () => {
  //   try {
  //     const { data } = await deleteTransactionMutation({
  //       variables: { id },
  //       update(cache) {
  //         cache.modify({
  //           fields: {
  //             getTransactions(existingTransactionsRef: Transaction[], { readField }) {
  //               return existingTransactionsRef.filter(
  //                 (transactionRef) => id !== readField('id', transactionRef),
  //               );
  //             },
  //           },
  //         });
  //       },
  //     });

  //     if (data?.deleteTransaction) {
  //       showAlert(data.deleteTransaction, 'info');
  //     }
  //   } catch (err) {
  //     showAlert('Please try again later', 'error', 5000);
  //   }
  // };

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
