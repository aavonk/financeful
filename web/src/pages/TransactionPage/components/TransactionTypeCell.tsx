import styled, { css } from 'styled-components';
import { UpArrowCircle, DownArrowCircle } from '@Common/Icons';
import { formatTransactionType } from '@Lib/money-utils';
import { FlexRow } from '@Globals/index';

type Props = {
  type: string;
};

const ArrowContainer = styled.span<{ type?: string }>`
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
`;

function TransactionTypeCell({ type }: Props) {
  return (
    <FlexRow>
      <ArrowContainer aria-hidden="true" type={type}>
        {type === 'EXPENSE' ? <UpArrowCircle /> : <DownArrowCircle />}
      </ArrowContainer>
      <span>{formatTransactionType(type)}</span>
    </FlexRow>
  );
}

export default TransactionTypeCell;
