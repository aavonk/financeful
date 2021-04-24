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

import Skeleton from '@Common/Skeleton';
type Data = {
  message: string;
  value: number;
};

const loadingData: Data[] = [
  {
    message: 'Loading 1',
    value: 424.74,
  },
  {
    message: 'Loading 2',
    value: 124.83,
  },
  {
    message: 'Loading 3',
    value: 324.53,
  },
  {
    message: 'Loading 4',
    value: 124.53,
  },
  {
    message: 'Loading 5',
    value: 224.53,
  },
];

const generateNumber = () => {
  return Number((Math.random() * (500 - 300) + 300).toFixed(2));
};

type Props = {
  height?: string | number;
  width?: string | number;
  barsCount: number;
};

function BarchartSkeleton({ height = 200, width = 300, barsCount }: Props) {
  return (
    <ResponsiveContainer height={height} width={width}>
      <BarChart data={loadingData}>
        <CartesianGrid
          stroke="rgba(255, 255, 255, 0.1)"
          strokeDasharray="3"
          vertical={false}
        />
        <XAxis dataKey="message" hide />
        <YAxis hide />
        <Legend
          iconSize={4}
          payload={[
            {
              value: 'Loading...',
              type: 'circle',
              color: `${theme.colors.textSecondary}`,
            },
          ]}
        />
        <Bar dataKey="value" fill="rgba(255, 255, 255, 0.08)" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarchartSkeleton;
