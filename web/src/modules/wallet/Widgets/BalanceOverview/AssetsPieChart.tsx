import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Rectangle,
} from 'recharts';
import { theme } from '@Constants/theme';
const data = {
  aggregateBalance: 42222,
  totalAssets: 62222,
  totalLiabilities: -20000,
  assets: [
    {
      id: 'ckntayfcf00166cqsootrl85y',
      accountType: 'Primary Checking',
      balance: 122.23,
    },
    {
      id: 'cknrv902a0010j4qssdkjn45z',
      accountName: 'Primary Checking',
      balance: 875.0,
    },
    {
      id: 'cknrv902i0016j4qsh6fmu8b8',
      accountName: 'Primary Savings',
      balance: 5000.21,
    },
    {
      id: 'ckntayfcf00166cqs32ootrl85y',
      accountName: 'Bank with Debt ',
      balance: -522.22,
    },
    {
      id: 'cknrv902a0010j4qssdqw1kjn45z',
      accountName: 'Primary Checking',
      balance: 900.0,
    },
    {
      id: 'cknrv902i0016j4334qsh6fmu8b8',
      accountName: 'Primary Savings',
      balance: 0,
    },
    {
      id: 'cknrv902i0016j4334qsh6fmu8b8',
      accountName: 'Credit Card',
      balance: -1480.0,
    },
  ],
};

const ASSETS_COLOR = `${theme.colors.primary}`;
const LIABILITIES_COLOR = `${theme.colors.red}`;
const CustomBar = (props: any) => {
  const { balance } = props;
  // let fillColor = `${theme.colors.primary}`;
  let fillColor = ASSETS_COLOR;
  if (balance < 0) {
    fillColor = LIABILITIES_COLOR;
  }

  return (
    <Rectangle
      {...props}
      fill={fillColor}
      fillOpacity={0.8}
      id={balance < 0 ? 'liability' : 'asset'}
    />
  );
};

function AssetsPieChart() {
  return (
    <ResponsiveContainer maxHeight={250} minHeight={200} width="100%">
      <BarChart data={data.assets} margin={{ top: 10 }}>
        <CartesianGrid
          stroke={`${theme.colors.textSecondary}`}
          strokeDasharray="3"
          vertical={false}
        />
        <XAxis dataKey="accountName" hide />
        <YAxis hide />
        <Tooltip
          itemStyle={{ color: `${theme.colors.textPrimary}` }}
          contentStyle={{
            backgroundColor: `${theme.colors.darkThree}`,
            borderColor: `${theme.colors.darkThree}`,
            borderRadius: '4px',
          }}
          cursor={{
            stroke: `${theme.colors.darkThree}`,
            strokeWidth: 2,
            fill: `${theme.colors.darkThree}`,
          }}
        />
        <ReferenceLine y={0} stroke={`${theme.colors.textSecondary}`} />
        <Legend
          margin={{ top: 10 }}
          iconSize={8}
          payload={[
            { value: 'Assets', type: 'circle', id: 'asset', color: ASSETS_COLOR },
            {
              value: 'Liabilities',
              type: 'circle',
              id: 'liability',
              color: LIABILITIES_COLOR,
            },
          ]}
        />
        <Bar dataKey="balance" shape={CustomBar} name="Balance" />
      </BarChart>
    </ResponsiveContainer>
  );
}

{
  /* <PieChart>
<Pie
  data={data.assets}
  innerRadius={60}
  outerRadius={70}
  paddingAngle={5}
  cx="50%"
  cy="50%"
  fill="#000504"
  dataKey="balance"
>
  {data.assets.map((asset, index) => (
    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
  ))}
</Pie>
</PieChart> */
}
export default AssetsPieChart;
