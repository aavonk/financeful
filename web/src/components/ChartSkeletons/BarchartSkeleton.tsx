import { useState, useLayoutEffect, useCallback } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { theme } from '@Constants/theme';

type Data = {
  message: string;
  value: number;
};

const generateNumber = () => {
  return Number((Math.random() * (600 - 300) + 300).toFixed(2));
};

type Props = {
  height?: string | number;
  width?: string | number;
  barsCount: number;
};

function BarchartSkeleton({ height = 200, width = 300, barsCount }: Props) {
  const [data, setData] = useState<Data[]>([]);

  const generateBars = useCallback(() => {
    const arr: Data[] = [];
    for (let i = 0; i < barsCount; i++) {
      arr.push({
        message: `Loading-${i}`,
        value: generateNumber(),
      });
    }
    return arr;
  }, [barsCount]);

  useLayoutEffect(() => {
    const barData = generateBars();
    setData(barData);
  }, [generateBars]);

  return (
    <ResponsiveContainer height={height} width={width}>
      <BarChart data={data}>
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
