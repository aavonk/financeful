import styled, { css } from 'styled-components';

type HeadingProps = {
  isExpanded?: boolean;
};

export const GroupListContainer = styled.div`
  min-width: 280px;
  position: relative;
`;

export const GroupHeading = styled.div<HeadingProps>`
  padding: 8px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  border-radius: 4px;
  :hover {
    background-color: #161b22;
    transition: background-color 0.2s ease-in;
  }

  & > h4 {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.8rem;
    font-weight: 600;
    padding-left: 8px;
  }

  ::before {
    content: '+';
    color: ${({ theme }) => theme.colors.textGrey};
    position: absolute;
    left: 5px;
    top: 5px;
  }

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      background-color: #161b22;

      ::before {
        content: '-';
      }
    `}
`;

export const List = styled.ul`
  list-style: none;

  & > li {
    padding: 8px 8px 8px 32px;
  }
`;

export const ListItem = styled.li`
  font-size: 0.825rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
