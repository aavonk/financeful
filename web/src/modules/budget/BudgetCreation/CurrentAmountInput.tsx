import React from 'react';
import { InsetInput, ErrorMessage } from '@Common/FormElements';
import { useForm } from '@Hooks/useForm';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import type { ModifiedCategory } from '@Context/create-budget/createBudgetContext';

import {
  convertInputAmountToCents,
  isValidCurrencyFormat,
  formatMoneyFromCentsToDollars,
} from '@Lib/money-utils';

function CurrentAmountInput({ item }: { item: ModifiedCategory }) {
  const { updateBudgetAmount, markBudgetItemAsInvalid } = useCreateBudgetContext();
  const { values, errors, handleChange, handleValidationOnBlur } = useForm<{
    amount: string;
  }>({
    initialValue: {
      amount: formatMoneyFromCentsToDollars(item.currentMonth, false),
    },
    validations: {
      amount: {
        required: {
          value: true,
          message: 'Required',
        },
        custom: {
          isValid: (value) => isValidCurrencyFormat(value),
          message: 'Expected format: 1,200.00',
        },
      },
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <InsetInput
        withoutLabel
        type="text"
        value={values.amount}
        onChange={handleChange('amount')}
        onBlur={() => {
          const isValid = handleValidationOnBlur();

          if (!isValid) {
            return markBudgetItemAsInvalid(item.id);
          }
          const value = convertInputAmountToCents(values.amount);
          updateBudgetAmount(item.id, value);
        }}
      />
      {errors.amount ? <ErrorMessage>{errors.amount}</ErrorMessage> : null}
    </div>
  );
}

export default CurrentAmountInput;
