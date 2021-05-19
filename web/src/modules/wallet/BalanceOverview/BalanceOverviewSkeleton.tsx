import React from 'react';
import Skeleton from '@Common/Skeleton';
import Paper from '@Common/Paper';
import { Container, Header, RangeContainer, RangeLabel } from './style';

function BalanceOverviewSkeleton() {
  return (
    <Paper maxHeight="350px" maxWidth="400px" minHeight="250px">
      <Container>
        <Header style={{ marginBottom: '10px' }}>
          <h3>Net Worth</h3>
          <h4>
            <Skeleton width="70%" height="40px" />
          </h4>
        </Header>
        <div className="range">
          <RangeContainer>
            <RangeLabel>
              <span>Assets</span>
            </RangeLabel>
            <Skeleton width="100%" height="6px" />
          </RangeContainer>
          <RangeContainer>
            <RangeLabel>
              <span>Liabilities</span>
            </RangeLabel>
            <Skeleton width="100%" height="6px" />
          </RangeContainer>
        </div>
      </Container>
    </Paper>
  );
}

export default BalanceOverviewSkeleton;
