import {
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { CustomXAxisTick, CustomTooltip, CustomYAxisTick } from '@Components/Charts';
import { HistoryObject } from '@Generated/graphql';

type Props = {
  data: HistoryObject[];
};
function BalanceHistoryChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" maxHeight={300} minHeight={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.15} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          dataKey="balance"
          axisLine={false}
          tickLine={false}
          tickCount={4}
          width={80}
          tick={<CustomYAxisTick formatCents />}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          dataKey="balance"
          type="monotone"
          stackId="1"
          stroke="#2451B7"
          strokeWidth={2}
          fill="url(#color)"
        />
        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default BalanceHistoryChart;
