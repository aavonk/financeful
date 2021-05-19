import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { theme } from '@Constants/theme';

type Props = {
  height: number;
  innerRadius?: number;
  outterRadius?: number;
};

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 500 },
];

function PieChartSkeleton({ height, innerRadius = 45, outterRadius = 65 }: Props) {
  return (
    <ResponsiveContainer height={height} width="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={innerRadius}
          outerRadius={outterRadius}
          paddingAngle={5}
          dataKey="value"
          stroke={theme.colors.darkTwo}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={theme.colors.darkThree} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartSkeleton;
