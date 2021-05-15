import styled from 'styled-components';

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ChartContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media ${({ theme }) => theme.device.tabletAndDown} {
    flex-direction: column-reverse;
  }
`;
export const TransactionsContainer = styled.section`
  flex-basis: 45%;
  @media ${({ theme }) => theme.device.tabletAndDown} {
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    width: 100%;
  }
`;

export const InsightsContainer = styled.section`
  flex-basis: 55%;
  padding-left: 20px;
  @media ${({ theme }) => theme.device.tabletAndDown} {
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    width: 100%;
    padding-left: 0;
  }
`;
