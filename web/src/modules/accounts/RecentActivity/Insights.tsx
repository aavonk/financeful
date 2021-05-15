import React from 'react';
import Paper from '@Common/Paper';
import {
  Container,
  TopHalf,
  BottomHalf,
  TextWrapper,
  GraphWrapper,
  Header,
  Text,
} from './style';

function Insights() {
  return (
    <Paper>
      <Container>
        <TopHalf>
          <TextWrapper>
            <Header>Insights</Header>
            <Text secondary>Your monthly digest</Text>
            <Text>
              You’ve spent 24% more this month than the previous. Last month, you brought
              in $2,000 in income, which is 23% more than this month.
            </Text>
          </TextWrapper>
          <GraphWrapper>Graph</GraphWrapper>
        </TopHalf>
        <BottomHalf> bottom half</BottomHalf>
      </Container>
    </Paper>
  );
}

export default Insights;
