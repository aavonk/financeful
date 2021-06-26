import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import { SectionTitle } from '@Components/Layout/styles';
import type { ModifiedCategory } from '@Context/create-budget/createBudgetContext';
import MessageAlert from '@Common/Alerts/AlertMessage';
import CurrentAmountInput from '../CurrentAmountInput';
import {
  FormSection,
  InputArea,
  DescriptionArea,
  InputItem,
  ItemLabel,
  BudgetAmountContainer,
} from '../style';

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
          <AnimatePresence initial={false}>
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
          </AnimatePresence>
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
          {/* <small>
            Don't see what you're looking for? You might need to mark your categories as
            Income or remove the "Exclude from Budget" option.{' '}
          </small> */}
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
