import styled, { css } from 'styled-components';

// Containers
export const Container = styled.div`
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;

export const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
`;
export const MiddleRow = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;

  @media ${({ theme }) => theme.device.tabletAndUp} {
    flex-direction: row;
    flex: 1 0 100%;
    align-items: flex-start;
    & > p {
      flex-basis: 60%;
    }
  }
`;

export const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
  padding-top: 28px;
  justify-content: space-between;
`;

export const TextWrapper = styled.div`
  width: 100%;
  & > :nth-child(2) {
    padding-top: 6px;
    margin-bottom: 5px;
  }
`;

export const GraphWrapper = styled.div`
  margin-top: 10px;
  @media ${({ theme }) => theme.device.tabletAndUp} {
    flex-basis: 40%;
    margin-top: 0;
  }
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
  font-size: 1rem;
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

type PillLeftProps = {
  $color: string;
};

export const PillLeft = styled.div<PillLeftProps>`
  height: 100%;
  width: 15px;
  & > span {
    width: 10px;
    height: 30px;
    background: ${({ $color }) => $color};
    display: inline-block;
    border-radius: 10px;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 10px;

    & > span {
      width: 6px;
    }
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

  @media ${({ theme }) => theme.device.mobile} {
    padding-left: 0;
    & > h4 {
      font-weight: 600;
      font-size: 0.875rem;
    }
    & > p {
      font-size: 0.725rem;
    }
  }
`;
