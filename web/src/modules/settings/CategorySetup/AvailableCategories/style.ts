import styled from 'styled-components';

export const GroupListContainer = styled.div`
  min-width: 280px;
`;

export const GroupHeading = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  :hover {
    background-color: #161b22;
    transition: background-color 0.2s ease-in;
  }

  & > h4 {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

export const List = styled.ul`
  list-style: none;

  & > li {
    padding-left: 32px;
  }
`;
export const ListItem = styled.li`
  font-size: 0.675 rem;
`;
