import Paper from '@Common/Paper';
import { Header, Container, Progressbar, ProgressbarRoot } from './style';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';

// function SolidProgress(){

// }

function BalanceOverview() {
  const balance = 1000000;

  return (
    <Paper>
      <Container>
        <Header>
          <h3>Net Balance</h3>
          <h4>{formatMoneyFromCentsToDollars(balance)}</h4>
        </Header>
        <ProgressbarRoot>
          <Progressbar style={{ transform: 'translateX(-40%)' }} />
        </ProgressbarRoot>
      </Container>
    </Paper>
  );
}

export default BalanceOverview;
