import * as React from 'react';
import styled, { css } from 'styled-components';

export type Props = {
  minHeight?: string;
  maxHeight?: string;
  maxWidth?: string;
  flex?: boolean;
  center?: boolean;
  withElevation?: boolean;
  children: React.ReactNode;
  'data-testid'?: string;
  style?: React.CSSProperties;
};
export const StyledPaper = styled.div<Props>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  box-shadow: ${(props) =>
    props.withElevation === false
      ? 'none'
      : '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),0px 1px 3px 0px rgb(0 0 0 / 12%)'};
  border-radius: 4px;
  overflow-x: auto;
  min-height: ${({ minHeight }) => minHeight || '0'};
  max-height: ${({ maxHeight }) => maxHeight || '100%'};
  max-width: ${({ maxWidth }) => maxWidth || '100%'};

  ${({ flex, center }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: ${center ? 'center' : 'flex-start'};
      align-items: ${center ? 'center' : 'flex-start'};
    `};
`;

function Paper({
  children,
  minHeight,
  maxHeight,
  flex,
  center,
  withElevation = true,
  maxWidth,
  style,
  ...props
}: Props) {
  return (
    <StyledPaper
      data-testid={props['data-testid']}
      minHeight={minHeight}
      flex={flex}
      center={center}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      withElevation={withElevation}
      style={style}
    >
      {children}
    </StyledPaper>
  );
}

export default Paper;
