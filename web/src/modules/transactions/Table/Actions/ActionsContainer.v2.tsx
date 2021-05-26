import React from 'react';
import { EditFormController } from '@Modules/transactions/Forms/EditTransactionForm';
import { Transaction } from '@Generated/graphql';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: Transaction | null;
};

function ActionsContainer({ isModalOpen, setIsModalOpen, transaction }: Props) {
  if (!transaction) {
    return null;
  }
  return (
    <EditFormController
      transaction={transaction}
      closeModal={() => setIsModalOpen(false)}
      isOpen={isModalOpen}
    />
  );
}

export default ActionsContainer;
