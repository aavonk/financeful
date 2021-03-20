import styled from 'styled-components';

export const Emoji = styled.span`
  font-size: 28px;
  margin-bottom: 16px;
`;

export const Heading = styled.h3`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0 24px;
`;
export const Description = styled.p`
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0 24px;
`;
