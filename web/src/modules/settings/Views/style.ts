import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  margin-top: 8px;
`;

export const Title = styled.h5`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.625rem;
`;
