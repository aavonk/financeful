import styled from 'styled-components';

export const StyledMenuItem = styled.li`
  width: 100%;
  padding: 0.25rem 1.5rem;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  font-weight: 400;
  transition: background-color 0.2s ease-in;
  & > svg {
    margin-right: 0.35rem;
    vertical-align: middle;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkThree};
  }
`;

export const Divider = styled.div`
  height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid #343747;
`;
