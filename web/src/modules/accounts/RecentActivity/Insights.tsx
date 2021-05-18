import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAccountInsightsQuery } from '@Generated/graphql';
import { ViewError } from '@Components/ErrorViews';
import InsightPill from './InsightPill';
import Paper from '@Common/Paper';
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

  if (error) {
    return (
      <Paper minHeight="300px" center>
        <ViewError containerHeight="300px" />
      </Paper>
    );
  }

  if (!data?.getAccountInsights) {
    return null;
  }
  return (
    <Paper>
      <Container>
        <TopHalf>
          <TextWrapper>
            <Header>Insights</Header>
            <Text secondary>Your monthly digest</Text>
            <Text>{data.getAccountInsights.message}</Text>
          </TextWrapper>
          <GraphWrapper>
            <InsightsPieChart data={data.getAccountInsights.data} />
          </GraphWrapper>
        </TopHalf>
        <BottomHalf>
          {data.getAccountInsights.data.map((item, index) => (
            <InsightPill data={item} key={`insight-${index}`} />
          ))}
        </BottomHalf>
      </Container>
    </Paper>
  );
}

export default Insights;
