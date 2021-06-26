import React from 'react';
import { Link } from 'react-router-dom';
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
import {
  convertInputAmountToCents,
  isValidCurrencyFormat,
  formatMoneyFromCentsToDollars,
} from '@Lib/money-utils';
import MessageAlert from '@Common/Alerts/AlertMessage';

const getIncomeCategories = (cats: ModifiedCategory[]): ModifiedCategory[] => {
  return cats.filter((item) => item.isIncome === true);
};

const getExpenseCategories = (cats: ModifiedCategory[]): ModifiedCategory[] => {
  return cats.filter((item) => item.isIncome === false);
};

function BudgetAmountsView() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  return (
    <BudgetAmountContainer>
      <FormSection>
        <DescriptionArea>
          <SectionTitle variant={2}>Income Categories</SectionTitle>

          <MessageAlert
            variant="info"
            customMessage
            messageComponent={
              <span>
                Missing some categories? You might need to{' '}
                <Link to="/settings/categories">mark them as income</Link>
              </span>
            }
          />
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

export default BudgetAmountsView;

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
