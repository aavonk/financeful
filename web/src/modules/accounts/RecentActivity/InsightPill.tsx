import React from 'react';
import { PillContainer, PillRight, PillLeft } from './style';
import { formatCurrency } from '@Lib/money-utils';
import { theme } from '@Constants/theme';

type Props = {
  amount: number;
  label: 'Income' | 'Expenses' | 'Transfers';
};

const generateColor = (label: Props['label']) => {
  switch (label) {
    case 'Income':
      return theme.colors.green;
    case 'Expenses':
      return theme.colors.red;
    case 'Transfers':
      return theme.colors.primary;
  }
};

function InsightPill({ amount, label }: Props) {
  return (
    <PillContainer>
      <PillLeft $color={generateColor(label)}>
        <span />
      </PillLeft>
      <PillRight>
        <h4>{formatCurrency(amount)}</h4>
        <p>{label}</p>
      </PillRight>
    </PillContainer>
  );
}

export default InsightPill;
