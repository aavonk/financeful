import styled, { css } from 'styled-components';

// Containers
export const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;

export const TopHalf = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
`;

export const BottomHalf = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
`;

export const TextWrapper = styled.div`
  flex-basis: 60%;
  border: 1px solid blue;

  & > :nth-child(1) {
    margin-bottom: 10px;
  }
`;

export const GraphWrapper = styled.div`
  flex-basis: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
`;

//Text Styles

export const Header = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
`;

type TextProps = {
  secondary?: boolean;
};

export const Text = styled.p<TextProps>`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.938rem;
  ${({ secondary }) =>
    secondary &&
    css`
      color: ${({ theme }) => theme.colors.textSecondary};
      font-size: 0.875rem;
      font-weight: 400;
    `}
`;
