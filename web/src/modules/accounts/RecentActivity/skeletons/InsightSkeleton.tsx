import React from 'react';
import Paper from '@Common/Paper';
import Skeleton from '@Common/Skeleton';
import InsightPillSkeleton from './InsightPillSkeleton';
import { PieChartSkeleton } from '@Components/ChartSkeletons';
import {
  Container,
  TopHalf,
  BottomHalf,
  TextWrapper,
  GraphWrapper,
  Header,
  Text,
} from '../style';

function InsightSkeleton() {
  return (
    <Paper>
      <Container>
        <TopHalf>
          <TextWrapper>
            <Header>Insights</Header>
            <Text secondary>
              <Skeleton width="50%" height="18px" />
            </Text>
            <Text>
              <Skeleton width="88%" height="18px" style={{ marginBottom: '4px' }} />
              <Skeleton width="96%" height="18px" style={{ marginBottom: '4px' }} />
              <Skeleton width="98%" height="18px" />
            </Text>
          </TextWrapper>
          <GraphWrapper>
            <PieChartSkeleton height={150} />
          </GraphWrapper>
        </TopHalf>
        <BottomHalf>
          <InsightPillSkeleton />
          <InsightPillSkeleton />
          <InsightPillSkeleton />
        </BottomHalf>
      </Container>
    </Paper>
  );
}

export default InsightSkeleton;
