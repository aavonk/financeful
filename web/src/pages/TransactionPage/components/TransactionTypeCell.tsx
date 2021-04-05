import styled, { css } from 'styled-components';
import { UpArrowCircle, DownArrowCircle, RepeatingArrow } from '@Common/Icons';
import { formatTransactionType } from '@Lib/money-utils';
import { FlexRow } from '@Globals/index';

type TransactionTypes = {
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
};

const ArrowContainer = styled.span<{ type?: TransactionTypes['type'] }>`
  height: 1.875rem;
  width: 1.875rem;
  font-size: 1rem;

  border-radius: 50%;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  & > svg {
    vertical-align: text-bottom;
  }
  ${({ type }) =>
    type === 'EXPENSE' &&
    css`
      background-color: rgba(255, 46, 46, 0.08);
      color: #fd5353;
    `};
  ${({ type }) =>
    type === 'INCOME' &&
    css`
      background-color: rgba(43, 193, 85, 0.08);
      color: #2bc155;
    `};
  ${({ type }) =>
    type === 'TRANSFER' &&
    css`
      background-color: rgba(30, 136, 229, 0.08);
      color: ${({ theme }) => theme.colors.primary};
    `};
`;
//

const renderIcon = (type: TransactionTypes['type']) => {
  switch (type) {
    case 'INCOME':
      return <DownArrowCircle />;
    case 'EXPENSE':
      return <UpArrowCircle />;
    case 'TRANSFER':
      return <RepeatingArrow />;
    default:
      throw new Error('Unhandled transaction type in <TransactionTypeCell />');
  }
};

function TransactionTypeCell({ type }: TransactionTypes) {
  return (
    <FlexRow>
      <ArrowContainer aria-hidden="true" type={type}>
        {renderIcon(type)}
      </ArrowContainer>
      <span>{formatTransactionType(type)}</span>
    </FlexRow>
  );
}

export default TransactionTypeCell;
