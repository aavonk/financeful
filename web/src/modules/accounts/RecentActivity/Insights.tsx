import React from 'react';
import Paper from '@Common/Paper';
import InsightPill from './InsightPill';

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
              Todo: You’ve spent 24% more this month than the previous. Last month, you
              brought in $2,000 in income, which is 23% more than this month.
            </Text>
          </TextWrapper>
          <GraphWrapper>Graph</GraphWrapper>
        </TopHalf>
        <BottomHalf>
          <InsightPill amount={4000.21} label="Income" />
          <InsightPill amount={2000} label="Expenses" />
          <InsightPill amount={500} label="Transfers" />
        </BottomHalf>
      </Container>
    </Paper>
  );
}

export default Insights;
