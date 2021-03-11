import styled from 'styled-components';

type CardOptions = {
  minHeight?: string;
  minWidth?: string;
};
export const StyledCard = styled.div<CardOptions>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  border-radius: 0.25rem;
  min-width: ${({ minWidth }) => (minWidth ? minWidth : 0)};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 0)};
`;

export const StyledCardBody = styled.div`
  flex: 1 1 auto;
  padding: 1.25rem;
  min-height: 10px;
`;
