import styled, { css } from 'styled-components';

export const StyledContainer = styled.main`
  padding: 1.5rem 2rem;
  flex-grow: 1;
  margin-left: 75px;
  margin-top: 64px;
  transition: margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  overflow-x: hidden;

  @media ${({ theme }) => theme.device.mobile} {
    margin-left: 0;
    padding: 1.5rem 1rem;
  }
`;
