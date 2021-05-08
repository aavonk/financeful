import styled, { css } from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  & > h3 {
    font-size: 0.875rem;
    font-weight: 500;
  }

  & > h4 {
    font-size: 2.5rem;
    font-weight: 400;
    padding-top: 8px;
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 0.825rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > .range {
    margin-top: 20px;
  }
`;

type BarProps = {
  percentage?: string;
  secondary?: boolean;
};
export const RangeBar = styled.div<BarProps>`
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
  border-radius: 2px;
  & > span {
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    display: inherit;
    width: ${({ percentage }) => (percentage ? `${percentage}` : '100%')};
  }
  ${({ secondary }) =>
    secondary &&
    css`
      & > span {
        background: #ff9e15 !important;
      }
    `}
`;

export const RangeLabel = styled.label`
  display: flex;
  justify-content: space-between;
  flex: 0 0 auto;
  margin-bottom: 4px;
  & > span {
    font-size: 0.875rem;
  }
`;

export const RangeContainer = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;
