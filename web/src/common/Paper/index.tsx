import * as React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  minHeight?: string;
  maxHeight?: string;
  flex?: boolean;
  center?: boolean;
  children: React.ReactNode;
};
export const StyledPaper = styled.div<Props>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 9px;
  overflow-x: auto;
  min-height: ${({ minHeight }) => minHeight || '0'};
  max-height: ${({ maxHeight }) => maxHeight || '100%'};

  ${({ flex, center }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: ${center ? 'center' : 'flex-start'};
      align-items: ${center ? 'center' : 'flex-start'};
    `};
  ::-webkit-scrollbar {
    width: 14px;
    height: 16px;
  }

  ::-webkit-scrollbar-thumb {
    height: 4px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    background-color: rgba(255, 255, 255, 0.2);
    -webkit-border-radius: 16px;
    -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
      inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }

  ::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

function Paper({ children, minHeight, maxHeight, flex, center }: Props) {
  return (
    <StyledPaper
      minHeight={minHeight}
      flex={flex}
      center={center}
      maxHeight={maxHeight}
    >
      {children}
    </StyledPaper>
  );
}

export default Paper;
