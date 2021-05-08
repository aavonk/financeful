import Skeleton from '@Common/Skeleton';
import Paper from '@Common/Paper';
import { Container, Header } from './style';
import BarchartSkeleton from '@Components/ChartSkeletons/BarchartSkeleton';

function BalanceOverviewSkeleton() {
  return (
    <Paper>
      <Container>
        <Header style={{ marginBottom: '10px' }}>
          <h3>
            <Skeleton width="30%" height="16px" />
          </h3>
          <h4>
            <Skeleton width="70%" height="32px" />
          </h4>
        </Header>
        <BarchartSkeleton barsCount={5} />
      </Container>
    </Paper>
  );
}

export default BalanceOverviewSkeleton;
