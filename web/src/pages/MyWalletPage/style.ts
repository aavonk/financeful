import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  gap: 20px 20px;
  grid-template-areas:
    'accounts'
    'accounts'
    'accounts';

  /* tablet */
  @media (min-width: 768px) {
    grid-template-areas:
      'cards'
      'accounts'
      'accounts';
  }
  @media ${({ theme }) => theme.device.laptopAndUp} {
    grid-template-columns: 0.6fr 1.4fr;
    grid-template-rows: 0.6fr 1.4fr;
    gap: 20px 40px;
    grid-template-areas:
      'cards cards'
      'widgets accounts';
  }
`;

export const CardViewContainer = styled.section`
  display: none;
  position: relative;

  @media (min-width: 768px) {
    grid-area: cards;
    display: block;
    /* Inner grid */
    /* display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px 20px;
    justify-items: center; */
  }
`;

export const WidgetViewContainer = styled.section`
  display: none;
  grid-area: widgets;

  @media ${({ theme }) => theme.device.laptopAndUp} {
    display: block;
  }
`;

export const AccountViewContainer = styled.section`
  grid-area: accounts;
  /* background-color: blue; */
`;
