import React from 'react';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import { SectionTitle } from '@Components/Layout/styles';
import { InsetInput, ErrorMessage } from '@Common/FormElements';
import { useForm } from '@Hooks/useForm';
import {
  FormSection,
  InputArea,
  DescriptionArea,
  InputItem,
  ItemLabel,
  BudgetAmountContainer,
} from '../style';
import type { ModifiedCategory } from '@Context/create-budget/createBudgetContext';
import { convertInputAmountToCents, isValidCurrencyFormat } from '@Lib/money-utils';

const getIncomeCategories = (cats: ModifiedCategory[]): ModifiedCategory[] => {
  return cats.filter((item) => item.isIncome === true);
};

const getExpenseCategories = (cats: ModifiedCategory[]): ModifiedCategory[] => {
  return cats.filter((item) => item.isIncome === false);
};

function BudgetAmountsViewV2() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  return (
    <BudgetAmountContainer>
      <FormSection>
        <DescriptionArea>
          <SectionTitle variant={2}>Income Categories</SectionTitle>
          <small>
            Don't see what you're looking for? You might need to mark your categories as
            Income.{' '}
          </small>
        </DescriptionArea>
        <InputArea>
          {getIncomeCategories(selected).map((item) => (
            <InputItem key={item.id}>
              <ItemLabel>
                <p>{item.name}</p>
                {item.description && <small>{item.description}</small>}
              </ItemLabel>
              <CurrentAmountInput item={item} />
            </InputItem>
          ))}
        </InputArea>
      </FormSection>
      <FormSection>
        <DescriptionArea>
          <SectionTitle variant={2}>Expense Categories</SectionTitle>
          <small>
            Don't see what you're looking for? You might need to mark your categories as
            Income or remove the "Exclude from Budget" option.{' '}
          </small>
        </DescriptionArea>
        <InputArea>
          {getExpenseCategories(selected).map((item) => (
            <InputItem key={item.id}>
              <ItemLabel>
                <p>{item.name}</p>
                {item.description && <small>{item.description}</small>}
              </ItemLabel>
              <CurrentAmountInput item={item} />
            </InputItem>
          ))}
        </InputArea>
      </FormSection>
    </BudgetAmountContainer>
  );
}

export default BudgetAmountsViewV2;

function CurrentAmountInput({ item }: { item: ModifiedCategory }) {
  const { values, errors, handleChange, handleValidationOnBlur } = useForm<{
    amount: string;
  }>({
    initialValue: {
      amount: item.currentMonth.toString(),
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
  const { updateBudgetAmount } = useCreateBudgetContext();

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

          if (isValid) {
            const value = convertInputAmountToCents(values.amount);
            updateBudgetAmount(item.id, value);
          }
        }}
      />
      {errors.amount ? <ErrorMessage>{errors.amount}</ErrorMessage> : null}
    </div>
  );
}
