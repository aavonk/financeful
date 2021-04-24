import Paper from '@Common/Paper';
import { Header, Container, Line } from './style';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import AssetsAndLiabilitiesChart from './AssetsAndLiabilitiesChart';

const data = {
  aggregateBalance: 42222,
  totalAssets: 62222,
  totalLiabilities: -20000,
  assets: [
    {
      id: 'ckntayfcf00166cqsootrl85y',
      accountName: 'asdf',
      accountType: 'Primary Checking',
      balance: 12222,
      isAsset: true,
      isLiability: false,
      isInactive: false,
      percentageOfAssets: 20,
    },
    {
      id: 'cknrv902a0010j4qssdkjn45z',
      accountName: 'Primary Checking',
      accountType: 'Checking Account',
      balance: 50000,
      isAsset: true,
      isLiability: false,
      isInactive: false,
      percentageOfAssets: 10,
    },
    {
      id: 'cknrv902i0016j4qsh6fmu8b8',
      accountName: 'Primary Savings',
      accountType: 'Savings Account',
      balance: 0,
      isAsset: true,
      isLiability: false,
      isInactive: false,
      percentageOfAssets: 10,
    },
    {
      id: 'ckntayfcf00166cqs32ootrl85y',
      accountName: 'asdf',
      accountType: 'Primary Checking',
      balance: 12222,
      isAsset: true,
      isLiability: false,
      isInactive: false,
      percentageOfAssets: 10,
    },
    {
      id: 'cknrv902a0010j4qssdqw1kjn45z',
      accountName: 'Primary Checking',
      accountType: 'Checking Account',
      balance: 50000,
      isAsset: true,
      isLiability: false,
      isInactive: false,
      percentageOfAssets: 30,
    },
    {
      id: 'cknrv902i0016j4334qsh6fmu8b8',
      accountName: 'Primary Savings',
      accountType: 'Savings Account',
      balance: 0,
      isAsset: true,
      isLiability: false,
      isInactive: false,
      percentageOfAssets: 20,
    },
  ],
};

function BalanceOverview() {
  return (
    <Paper>
      <Container>
        <Header>
          <h3>Net Balance</h3>
          <h4>{formatMoneyFromCentsToDollars(data.aggregateBalance)}</h4>
        </Header>
        <Line />
        <AssetsAndLiabilitiesChart />
      </Container>
    </Paper>
  );
}

export default BalanceOverview;
