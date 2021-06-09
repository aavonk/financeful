import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { TooltipBody } from '@Common/Tooltip/style';

export const SidebarRoot = styled.div<{ $open: boolean }>`
  width: 75px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  z-index: 1005;
  box-shadow: ${({ theme }) => theme.elevation.two};
  transition: width 225ms cubic-bezier(0.4, 0, 0.4, 1) 0ms;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }

  ${(props) =>
    props.$open &&
    css`
      display: block !important;
      width: 250px;
      ${SidebarBrand} {
        width: 250px;
      }
      ${NavWrapper} {
        padding: 0 1.35rem;
        align-items: flex-start;
      }
      ${NavigationItems} {
        align-items: flex-start;
      }
      ${Logo} {
        /* justify-content: flex-start; */
        padding: 0 1.55rem;

        & > h2 {
          display: inline-flex;
        }
      }
      ${NavItem} {
        justify-content: flex-start;
        padding: 0 1.2rem;
        border-radius: 12px;
        & > span {
          display: inline-flex;
        }

        & > svg {
          height: 1em;
          width: 1em;
          margin-right: 20px;
        }
      }
      ${TooltipBody} {
        display: none;
      }

      @media ${({ theme }) => theme.device.mobile} {
        width: 100vw;

        ${Logo} {
          justify-content: flex-start;
        }
      }
    `}
`;

export const SidebarBrand = styled.div`
  height: 64px;
  width: 75px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  & > span {
    display: none;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100% !important;
    & > span {
      display: block;
      margin-right: 1rem;
    }
  }
`;

export const Logo = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;

  & > h2 {
    display: none;
    color: #fff;
    font-size: 2rem;
    font-weight: 700;
  }

  & > svg {
    margin-top: 4px;
    height: 40px;
    width: 40px;
    vertical-align: text-bottom;
  }
`;

export const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 70px);
`;

export const NavigationItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 30px;
`;
const activeClassName = 'nav-item-active';
export const NavItem = styled(NavLink).attrs({ activeClassName })<{
  $last?: boolean;
}>`
  width: 100%;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  transition: background-color 0.2s ease-in;
  margin-top: 5px;

  & > span {
    display: none;
    font-size: 16px;
    font-weight: 600;
  }
  & > svg {
    height: 1.5em;
    width: 1.5em;
    vertical-align: text-bottom;
  }
  &.${activeClassName} {
    color: #fff;
    /* background-color: #0d34ff; */
    background-color: ${({ theme }) => theme.colors.darkFour};
  }

  &:hover,
  :focus {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.darkThree};
  }

  ${(props) =>
    props.$last &&
    css`
      margin-bottom: 10px;
    `}
`;
