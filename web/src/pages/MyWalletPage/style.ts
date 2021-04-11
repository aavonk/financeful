import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.4fr;
  grid-template-rows: 0.6fr 1.4fr;
  gap: 0px 0px;
  grid-template-areas:
    'cards cards'
    'widgets accounts';
`;

export const CardViewContainer = styled.div`
  grid-area: cards;
  background-color: yellow;
`;

export const WidgetViewContainer = styled.div`
  grid-area: widgets;
  /* background-color: red; */
`;

export const AccountViewContainer = styled.div`
  grid-area: accounts;
  /* background-color: blue; */
`;
