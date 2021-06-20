import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  & > h2 {
    font-size: 1.5rem;
    font-weight: 600;
    flex: 1 0 auto;
  }
`;

export const ButtonGroup = styled.div`
  display: block;

  & > :first-child {
    margin-right: 1rem;
  }
`;
