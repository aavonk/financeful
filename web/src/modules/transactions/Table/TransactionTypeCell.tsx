import React from 'react';
import styled, { css } from 'styled-components';
import { UpArrowCircle, DownArrowCircle, RepeatingArrow } from '@Common/Icons';
import { capitalizeFirstLetter } from '@Lib/string-formating';
import { FlexRow } from '@Globals/index';

type TransactionTypes = {
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
};

const ArrowContainer = styled.span<{ type?: TransactionTypes['type'] }>`
  height: 1.475rem;
  width: 1.475rem;
  font-size: 0.875rem;

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
      background-color: rgba(236, 69, 97, 0.08);
      color: ${({ theme }) => theme.colors.red};
    `};
  ${({ type }) =>
    type === 'INCOME' &&
    css`
      background-color: rgba(27, 170, 118, 0.08);
      color: ${({ theme }) => theme.colors.green};
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
      return <UpArrowCircle />;
    case 'EXPENSE':
      return <DownArrowCircle />;
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
      <span>{capitalizeFirstLetter(type)}</span>
    </FlexRow>
  );
}

export default TransactionTypeCell;
