import React from 'react';
import Paper from '@Common/Paper';
import Skeleton from '@Common/Skeleton';
import InsightPillSkeleton from './InsightPillSkeleton';
import { PieChartSkeleton } from '@Components/ChartSkeletons';
import {
  Container,
  TextWrapper,
  GraphWrapper,
  Header,
  Text,
  TopRow,
  MiddleRow,
  BottomRow,
} from '../style';

function InsightSkeleton() {
  return (
    <Paper>
      <Container>
        <TopRow>
          <TextWrapper>
            <Header>Insights</Header>
            <Text secondary>
              <Skeleton width="50%" height="18px" />
            </Text>
          </TextWrapper>
        </TopRow>
        <MiddleRow>
          <Text>
            <Skeleton width="88%" height="18px" style={{ marginBottom: '4px' }} />
            <Skeleton width="96%" height="18px" style={{ marginBottom: '4px' }} />
            <Skeleton width="98%" height="18px" />
          </Text>
          <GraphWrapper>
            <PieChartSkeleton height={150} />
          </GraphWrapper>
        </MiddleRow>
        <BottomRow>
          <InsightPillSkeleton />
          <InsightPillSkeleton />
          <InsightPillSkeleton />
        </BottomRow>
      </Container>
    </Paper>
  );
}

export default InsightSkeleton;
