import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import { useAlert, IAlert } from '@Context/alert/alertContext';
import { useCreateBudgetMutation } from '@Generated/graphql';
import { useQuery } from '@Hooks/useQuery';
import type { ModifiedCategory } from '@Context/create-budget/createBudgetContext';
import type { CreateBudgetItemInput } from '@Generated/graphql';
import CreateBudgetModal from './CreateBudgetModal';

const mapCategoriesToBudgetItems = (
  categories: ModifiedCategory[],
): CreateBudgetItemInput[] => {
  return categories.map((item) => {
    const { id, isIncome, currentMonth } = item;

    return {
      categoryId: id,
      budgetAmount: currentMonth,
      isExpense: !isIncome,
      isIncome,
    };
  });
};

function CreateBudgetController() {
  const [submitBudget, { loading }] = useCreateBudgetMutation();
  const query = useQuery();
  const history = useHistory();
  const { showAlert } = useAlert();
  const {
    state: { selected },
    dispatchSubmittingState,
  } = useCreateBudgetContext();

  React.useEffect(() => {
    dispatchSubmittingState(loading);
  }, [loading]);

  const handleClose = (message: string, alertType: IAlert['type']) => {
    history.push('/budget');
    return showAlert(message, alertType);
  };

  const handleCreateBudget = async () => {
    const month = query.get('month');
    const year = query.get('year');

    if (!month || !year) {
      return handleClose('No month or year provided', 'error');
    }

    try {
      const res = await submitBudget({
        variables: {
          input: {
            month,
            year: Number(year),
            items: mapCategoriesToBudgetItems(selected),
          },
        },
      });

      const data = res.data?.createBudget;

      if (data?.error) {
        return handleClose(data.error.message, 'error');
      }

      if (data?.data) {
        return handleClose(`Created ${data?.data?.month} budget`, 'info');
      }
    } catch (err) {
      showAlert('We ran into an error. Try again?', 'error', 5000);
    }
  };

  return <CreateBudgetModal onComplete={handleCreateBudget} />;
}

export default CreateBudgetController;
