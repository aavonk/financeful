import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  ModifiedCategory,
  useCreateBudgetContext,
} from '@Context/create-budget/createBudgetContext';
import { SectionTitle } from '@Components/Layout/styles';
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
import { getIncomeCategories, getExpenseCategories } from './helpers';

const renderItem = (item: ModifiedCategory) => {
  return (
    <InputItem key={item.id}>
      <ItemLabel>
        <p>{item.name}</p>
        {item.description && <small>{item.description}</small>}
      </ItemLabel>
      <CurrentAmountInput item={item} />
    </InputItem>
  );
};

function BudgetAmountsView() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  return (
    <BudgetAmountContainer>
      <FormSection className="divider">
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
          {getIncomeCategories(selected).map((item) => renderItem(item))}
        </InputArea>
      </FormSection>
      <FormSection>
        <DescriptionArea>
          <SectionTitle variant={2}>Expense Categories</SectionTitle>
        </DescriptionArea>
        <InputArea>
          {getExpenseCategories(selected).map((item) => renderItem(item))}
        </InputArea>
      </FormSection>
    </BudgetAmountContainer>
  );
}

export default BudgetAmountsView;
