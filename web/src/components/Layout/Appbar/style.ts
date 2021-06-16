import styled, { css } from 'styled-components';

export const AppbarRoot = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 75px;
  z-index: 1005;
  background-color: ${({ theme }) => theme.colors.darkOne};
  height: 64px;
  transition: left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  @media ${({ theme }) => theme.device.mobile} {
    left: 0;
  }
`;

export const AppbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0 0.625rem 0 0;
  flex-shrink: 0;
`;

export const AppbarMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  margin-left: 0.625rem;
`;

export const AppbarActions = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
`;
