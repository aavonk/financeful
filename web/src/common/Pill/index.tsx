import React from 'react';
import styled, { css } from 'styled-components';

export type PillVariants = 'primary' | 'warning' | 'default' | 'danger';

type Props = {
  text: string;
  variant?: PillVariants;
};

function Pill({ text, variant = 'default' }: Props) {
  return (
    <PillRoot $variant={variant}>
      <PillLabel>{text}</PillLabel>
    </PillRoot>
  );
}

export default Pill;

// Add color & background color based on props

const PillLabel = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 0.65rem;
`;

const PillRoot = styled.div<{ $variant: PillVariants }>`
  display: inline-flex;
  outline: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  vertical-align: middle;
  height: 18px;
  font-size: 0.75rem;

  ${({ $variant }) =>
    $variant === 'default' &&
    css`
      background-color: ${({ theme }) => theme.colors.darkThree};
      color: ${({ theme }) => theme.colors.textSecondary};
    `}

  ${({ $variant }) =>
    $variant === 'warning' &&
    css`
      background-color: ${({ theme }) => theme.elements.pills.warning.background};
      color: ${({ theme }) => theme.elements.pills.warning.text};
    `}

    ${({ $variant }) =>
    $variant === 'primary' &&
    css`
      background-color: ${({ theme }) => theme.elements.pills.primary.background};
      color: ${({ theme }) => theme.elements.pills.primary.text};
    `}

    
    ${({ $variant }) =>
    $variant === 'danger' &&
    css`
      background-color: ${({ theme }) => theme.elements.pills.danger.background};
      color: ${({ theme }) => theme.elements.pills.danger.text};
    `}
`;
