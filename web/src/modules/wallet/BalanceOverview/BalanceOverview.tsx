import Paper from '@Common/Paper';
import { Header, Container } from './style';
import { AssetsAndLiabilitesResponse } from '@Generated/graphql';
import { formatCurrency } from '@Lib/money-utils';
import RangeBar from './RangeBar';
interface Props {
  data: AssetsAndLiabilitesResponse;
}

function BalanceOverview({ data }: Props) {
  const { aggregateBalance, assets, liabilites } = data;
  return (
    <Paper
      maxHeight="350px"
      maxWidth="400px"
      minHeight="250px"
      data-testid="balance-overview"
    >
      <Container>
        <Header>
          <h3>Net Worth</h3>
          <h4>{formatCurrency(aggregateBalance)}</h4>
        </Header>
        <div className="range">
          <RangeBar
            id="assets"
            labelAmount={formatCurrency(assets.amount)}
            labelText="Assets"
          />
          <RangeBar
            id="liabilities"
            percentage={`${liabilites.percentOfAssets}%`}
            labelText="Liabilites"
            labelAmount={formatCurrency(liabilites.amount)}
            secondary
          />
        </div>
      </Container>
    </Paper>
  );
}

export default BalanceOverview;
