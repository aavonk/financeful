import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useGetDailyBalancesQuery } from '@Generated/graphql';
import AreaChartSkeleton from '@Components/ChartSkeletons/AreaChartSkeleton';
import { theme } from '@Constants/theme';

type Props = {
  startDate: Date;
  endDate: Date;
  accountId: string;
};

function DailyBalancesChart({ startDate, endDate, accountId }: Props) {
  const { data, error, loading } = useGetDailyBalancesQuery({
    variables: { input: { startDate, endDate, accountId } },
  });

  if (error) {
    return (
      <AreaChartSkeleton
        withOverlappingMessage
        heading="Uh oh"
        subheading="We ran into trouble fetching your account data"
      />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <ResponsiveContainer minHeight={200} width="100%">
      <AreaChart data={data.getAccountDailyBalances}>
        <XAxis dataKey="date" allowDuplicatedCategory={false} />
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
        <Area
          type="monotone"
          dataKey="amount"
          name="Balance"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default DailyBalancesChart;
