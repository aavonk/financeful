import styled, { css } from 'styled-components';
import { MenuList, MenuButton, MenuItem } from '@reach/menu-button';

type ButtonProps = {
  $grey?: boolean;
  $active?: boolean;
  variant?: 'small';
};

export const StyledMenuButton = styled(MenuButton)<ButtonProps>`
  cursor: pointer;
  display: inline-flex;
  outline: 0;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  flex: 0 0 auto;
  color: ${(props) => props.theme.colors.textPrimary};
  padding: 12px;
  font-size: 1.5rem;
  text-align: center;
  transition: background-color 0.2s ease-in-out;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  &:hover {
    background-color: ${({ theme }) => theme.effects.buttonHover};
    color: ${({ theme }) => theme.colors.primary};
  }
  &:focus {
    background-color: ${({ theme }) => theme.effects.buttonHover};
    color: ${({ theme }) => theme.colors.primary};
  }

  &[aria-expanded='true'] {
    background-color: ${({ theme }) => theme.effects.buttonHover};
    color: ${({ theme }) => theme.colors.primary};
  }

  ${(props) =>
    props.$grey &&
    css`
      color: ${({ theme }) => theme.colors.textGrey};
    `}
  ${(props) =>
    props.$active &&
    css`
      background-color: ${({ theme }) => theme.effects.buttonHover};
    `}
  ${({ variant }) =>
    variant === 'small' &&
    css`
      height: 35px;
      width: 35px;
      font-size: 1.2rem;
      padding: 2px;
    `}
`;

export const StyledMenuList = styled(MenuList)`
  background: ${({ theme }) => theme.colors.darkTwo};
  border-radius: 0.25rem;
  font-size: 0.938rem;
  text-align: left;
  box-shadow: rgb(136 153 166 / 20%) 0px 0px 15px, rgb(136 153 166 / 15%) 0px 0px 3px 1px;
  z-index: 100;
`;

export const StyledMenuItem = styled(MenuItem)<{
  $iconVariant?: 'danger' | 'muted';
}>`
  font-size: inherit;
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkThree};
  }

  &[data-selected] {
    background-color: ${({ theme }) => theme.colors.darkThree};
  }

  & > i > svg {
    margin-right: 0.75rem;
    vertical-align: middle;
  }

  ${({ $iconVariant }) =>
    $iconVariant === 'danger' &&
    css`
      & > i > svg {
        color: ${({ theme }) => theme.colors.textError};
      }
    `}
  ${({ $iconVariant }) =>
    $iconVariant === 'muted' &&
    css`
      & > i > svg {
        color: ${({ theme }) => theme.colors.textSecondary};
      }
    `}
`;
