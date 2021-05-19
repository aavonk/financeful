import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  grid-template-rows: repeat(auto-fill, minmax(0, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  max-width: 1440px;
  width: 100%;
`;

export const CardViewContainer = styled.section`
  position: relative;
  width: 100%;
  grid-area: 1 / 1 / 2 / 3;
`;

export const WidgetViewContainer = styled.section`
  display: none;

  @media ${({ theme }) => theme.device.laptopAndUp} {
    display: block;
    grid-area: 2 / 1 / 4 / 2;
    min-width: 400px;
    min-height: 200px;
  }
`;

export const AccountViewContainer = styled.section`
  display: block;
  grid-area: 2 / 1 / 4 / 3;
  /* overflow: hidden; */
  @media ${({ theme }) => theme.device.laptopAndUp} {
    grid-area: 2 / 2 / 4 / 3;
    display: contents;
    min-width: 600px;
    min-height: 200px;
  }
`;
