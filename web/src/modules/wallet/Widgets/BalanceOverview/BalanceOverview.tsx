import Paper from '@Common/Paper';
import { Header, Container, Line } from './style';
import AssetsAndLiabilitiesChart from './AssetsAndLiabilitiesChart';
import { AssetsAndLiabilitesResponse } from '@Generated/graphql';

interface Props {
  data: AssetsAndLiabilitesResponse;
}
function BalanceOverview({ data }: Props) {
  return (
    <Paper maxHeight="350px" maxWidth="400px">
      <Container>
        <Header>
          <h3>Net Balance</h3>
          <h4>${data.aggregateBalance}</h4>
        </Header>
        <Line />
        <AssetsAndLiabilitiesChart data={data.accounts} />
      </Container>
    </Paper>
  );
}

export default BalanceOverview;
