import React from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@Common/Paper';
import InsightPill from './InsightPill';
import { useGetAccountInsightsQuery } from '@Generated/graphql';
import InsightSkeleton from './skeletons/InsightSkeleton';
import InsightsPieChart from './InsightsPieChart';
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
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useGetAccountInsightsQuery({
    variables: { accountId: id },
  });

  if (loading) {
    return <InsightSkeleton />;
  }

  if (!data?.getAccountInsights) {
    return null;
  }
  const { message, income, expenses, transfers } = data.getAccountInsights;
  return (
    <Paper>
      <Container>
        <TopHalf>
          <TextWrapper>
            <Header>Insights</Header>
            <Text secondary>Your monthly digest</Text>
            <Text>{message}</Text>
          </TextWrapper>
          <GraphWrapper>
            <InsightsPieChart data={{ income, expenses, transfers }} />
          </GraphWrapper>
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
