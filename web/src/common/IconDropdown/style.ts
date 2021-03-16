import styled, { css } from 'styled-components';
import { MenuList, MenuButton, MenuItem } from '@reach/menu-button';

type ButtonProps = {
  $small?: boolean;
  $grey?: boolean;
  $active?: boolean;
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
  }

  &[aria-expanded='true'] {
    background-color: ${({ theme }) => theme.effects.buttonHover};
  }
  ${(props) =>
    props.$small &&
    css`
      height: 32px;
      width: 32px;
      font-size: 0.95rem;
      padding: 0;
    `}
  ${(props) =>
    props.$grey &&
    css`
      color: ${({ theme }) => theme.colors.textSecondary} !important;
    `}
      ${(props) =>
    props.$active &&
    css`
      background-color: ${({ theme }) => theme.effects.buttonHover};
    `}
`;

export const StyledMenuList = styled(MenuList)`
  background: ${({ theme }) => theme.colors.darkTwo};
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  font-size: 1rem;
  text-align: left;
`;

export const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkThree};
  }

  &[data-selected] {
    background-color: ${({ theme }) => theme.colors.darkThree};
  }

  & > i > svg {
    margin-right: 0.35rem;
    vertical-align: middle;
  }
`;
