import styled, { css } from 'styled-components';

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
  text-align: center;
`;
export const Description = styled.p<{ whiteText?: boolean }>`
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0 24px;
  text-align: center;
  ${({ whiteText }) =>
    whiteText &&
    css`
      color: #fff !important;
    `}
`;

type ContainerProps = {
  $height?: string;
};
export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ $height }) => ($height ? $height : '100%')};
  width: 100%;
`;

export const FullBlueScreen = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 2500;
  background-color: #1e88e5;
`;
