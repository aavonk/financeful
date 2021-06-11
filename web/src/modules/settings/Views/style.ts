import styled from 'styled-components';

export const Heading = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  & > h2 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export const Section = styled.section`
  width: 100%;
  margin-top: 8px;
`;

export const Title = styled.h5`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.625rem;
`;
