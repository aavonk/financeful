import styled, { css } from 'styled-components';

type Props = {
  $open: boolean;
};
export const AppbarRoot = styled.header<Props>`
  position: fixed;
  top: 0;
  right: 0;
  left: 75px;
  z-index: 1005;
  background-color: ${({ theme }) => theme.colors.darkOne};
  height: 75px;
  transition: left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  @media ${({ theme }) => theme.device.mobile} {
    left: 0;
  }

  ${(props) =>
    props.$open &&
    css`
      left: 250px !important;
    `}
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

export const MenuButton = styled.button`
  background-color: transparent;
  height: 70px;
  padding: 0.47rem 0.75rem;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  cursor: pointer;
  & > span,
  i {
    display: none;
  }

  @media ${({ theme }) => theme.device.tabletAndUp} {
    & > span {
      display: inline-block;
      margin-right: 1rem;
      font-weight: 700;
      font-size: 1rem;
      color: #fff;
    }
    & > i {
      padding-top: 5px;
      margin-left: 0.4rem;
      display: inline-block;
      font-weight: 700;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
    & > svg {
      vertical-align: text-bottom;
    }
  }
`;

export const DropdownContainer = styled.div`
  position: relative;

  @media ${({ theme }) => theme.device.mobile} {
    position: static;
  }
`;
