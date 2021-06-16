import styled from 'styled-components';
import { NavLink, NavLinkProps } from 'react-router-dom';

export const NavMenu = styled.nav`
  --menu-bg-active: #161b22;
  position: sticky;
  top: 80px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.825rem;

  & > ul {
    list-style: none;
  }

  & > ul > li:first-child {
    padding: 8px 16px;
    color: ${({ theme }) => theme.colors.textGrey};
    font-weight: 600;
  }

  & > ul > li:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  @media (min-width: 905px) {
    max-width: 240px;
  }
`;

const activeClassName = 'active';

export const Link = styled(NavLink).attrs({ activeClassName })<NavLinkProps>`
  color: ${({ theme }) => theme.colors.textPrimary};
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: inherit;
  padding: 8px 16px;
  &.${activeClassName} {
    background-color: var(--menu-bg-active);
    border-left: 2px solid ${({ theme }) => theme.colors.primary};
  }

  :hover,
  :focus-within {
    transition: background-color 0.2s ease-in;
    background-color: var(--menu-bg-active);
  }
`;
