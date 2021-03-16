import styled from 'styled-components';
import { MenuButton, MenuList, MenuItem } from '@reach/menu-button';

export const StyledMenuButton = styled(MenuButton)`
  font-size: 1rem;
  min-width: 64px;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 9px;
  letter-spacing: 0.02857em;
  cursor: pointer;
  display: inline-flex;
  position: relative;
  outline: 0;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  transition: background-color 0.2s ease-in-out;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: ${(props) => (props.margin ? props.margin : '0')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkThree};
  }

  &::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }
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
`;
