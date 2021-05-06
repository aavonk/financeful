import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Rectangle,
} from 'recharts';
import { AssetsAndLiabilitesResponse } from '@Generated/graphql';
import { theme } from '@Constants/theme';

const ASSETS_COLOR = `${theme.colors.green}`;
const LIABILITIES_COLOR = `${theme.colors.yellow}`;

const CustomBar = (props: any) => {
  const { isLiability } = props;
  let fillColor = ASSETS_COLOR;

  if (isLiability) {
    fillColor = LIABILITIES_COLOR;
  }

  return (
    <Rectangle
      {...props}
      fill={fillColor}
      fillOpacity={0.8}
      id={isLiability ? 'liability' : 'asset'}
    />
  );
};

interface Props {
  data: AssetsAndLiabilitesResponse['accounts'];
}

function AssetsAndLiabilitesChart({ data }: Props) {
  return (
    <ResponsiveContainer maxHeight={250} minHeight={200} width="100%">
      <BarChart data={data} margin={{ top: 10 }}>
        <CartesianGrid stroke={`${theme.colors.textSecondary}`} vertical={false} />
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

        <Bar dataKey="balance" shape={CustomBar} name="Balance" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AssetsAndLiabilitesChart;
