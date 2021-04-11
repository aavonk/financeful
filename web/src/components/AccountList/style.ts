import styled from 'styled-components';

export const Topbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 0 0 auto;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 16px;
  font-weight: 600;
`;
export const Container = styled.div`
  padding: 0.825rem;
`;
// export const Actions = styled.div``
