import styled, { css } from 'styled-components';

// Containers
export const Container = styled.div`
  padding: 1rem 1.25rem;
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
  padding-top: 28px;
  justify-content: space-between;
`;

export const TextWrapper = styled.div`
  flex-basis: 60%;
  & > :nth-child(2) {
    padding-top: 16px;
    margin-bottom: 5px;
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

// Insight Pill

export const PillContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
  align-items: flex-start;
`;

export const PillLeft = styled.div`
  height: 100%;
  width: 15px;
  & > span {
    width: 10px;
    height: 30px;
    background: ${({ theme }) => theme.colors.primary};
    display: inline-block;
    border-radius: 10px;
  }
`;

export const PillRight = styled.div`
  padding-left: 8px;
  & > h4 {
    font-weight: 700;
    font-size: 1.125rem;
  }

  & > p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
  }
`;
