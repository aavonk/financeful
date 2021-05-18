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
  TextWrapper,
  GraphWrapper,
  Header,
  Text,
  TopRow,
  MiddleRow,
  BottomRow,
} from './style';

function Insights() {
  const { id } = useParams<{ id: string }>();
  const { data, error, loading } = useGetAccountInsightsQuery({
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
        <TopRow>
          <TextWrapper>
            <Header>Insights</Header>
            <Text secondary>Your monthly digest</Text>
          </TextWrapper>
        </TopRow>
        <MiddleRow>
          <Text>{data.getAccountInsights.message}</Text>
          <GraphWrapper>
            <InsightsPieChart data={data.getAccountInsights.data} />
          </GraphWrapper>
        </MiddleRow>
        <BottomRow>
          {data.getAccountInsights.data.map((item, index) => (
            <InsightPill
              data={item}
              key={`insight-${index}`}
              data-testid={`insight-pill-${index}`}
            />
          ))}
        </BottomRow>
      </Container>
    </Paper>
  );
}

export default Insights;
