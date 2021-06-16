import styled from 'styled-components';

export const SectionTitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 600;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 10px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: row-reverse;
  font-size: 0.875rem;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  & > div {
    padding-right: 10px;
  }
`;
