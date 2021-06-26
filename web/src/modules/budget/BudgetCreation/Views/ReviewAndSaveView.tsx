import React from 'react';
import {
  ModifiedCategory,
  useCreateBudgetContext,
} from '@Context/create-budget/createBudgetContext';
import { getIncomeCategories, getExpenseCategories } from './helpers';
import { SectionTitle } from '@Components/Layout/styles';
import MessageAlert from '@Common/Alerts/AlertMessage';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import { useQuery } from '@Hooks/useQuery';
import {
  FormSection,
  InputArea,
  DescriptionArea,
  InputItem,
  ItemLabel,
  BudgetAmountContainer,
} from '../style';

const renderItem = (item: ModifiedCategory) => {
  return (
    <InputItem key={item.id}>
      <ItemLabel>
        <p>{item.name}</p>
        {item.description && <small>{item.description}</small>}
      </ItemLabel>
      <div>{formatMoneyFromCentsToDollars(item.currentMonth)}</div>
    </InputItem>
  );
};

function ReviewAndSaveView() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  const query = useQuery();
  return (
    <BudgetAmountContainer>
      <div style={{ paddingBottom: '8px' }}>
        <MessageAlert
          variant="info"
          message={`Does everything look right? Clicking finish will create your ${query.get(
            'month',
          )} budget for ${query.get('year')}.`}
        />
      </div>
      <FormSection className="divider">
        <DescriptionArea>
          <SectionTitle variant={2}>Income Categories</SectionTitle>
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

export default ReviewAndSaveView;
