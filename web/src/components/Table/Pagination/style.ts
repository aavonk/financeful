import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1.25rem;
`;

export const PageCountWrapper = styled.div`
  flex: 0 0 41.666667%;
  min-width: 41.666667%;
  padding: 1rem 0;
`;

export const ActionsWrapper = styled.div`
  flex: 0 0 58.333333%;
  min-width: 58.333333%;
  padding: 1rem 0;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Text = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
