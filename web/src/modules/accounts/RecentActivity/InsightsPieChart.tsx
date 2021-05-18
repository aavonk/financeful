import React, { useState, useLayoutEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { InsightPieChartData, TransactionTypes } from '@Generated/graphql';
import { theme } from '@Constants/theme';

type Props = {
  data: InsightPieChartData[];
};

const getColor = (name: TransactionTypes) => {
  switch (name) {
    case TransactionTypes.Income:
      return theme.colors.green;
    case TransactionTypes.Expenses:
      return theme.colors.red;
    case TransactionTypes.Transfers:
      return theme.colors.primary;
    default:
      return theme.colors.darkThree;
  }
};

function InsightsPieChart({ data }: Props) {
  const [chartData, setChartData] = useState<InsightPieChartData[]>([]);
  const getTotals = useCallback(() => {
    const value = data.reduce((total, current) => current.value + total, 0);
    return value;
  }, [data]);

  // If all the values are 0 recharts wont render anything.
  // Check to make sure the total isn't 0, and if it is,
  // create a fake data point that will render an "empty" pie chart.
  useLayoutEffect(() => {
    const value = getTotals();
    if (value === 0) {
      return setChartData([
        {
          name: 'No Data' as TransactionTypes,
          value: 1,
        },
      ]);
    }

    setChartData(data);
  }, [data, getTotals]);
  return (
    <ResponsiveContainer height={150} width="100%">
      <PieChart>
        <Pie
          data={chartData}
          innerRadius={45}
          outerRadius={65}
          paddingAngle={5}
          dataKey="value"
          cx="50%"
          cy="50%"
          stroke={theme.colors.darkTwo}
        >
          {chartData.map((item, index) => {
            return <Cell key={`cell-${index}`} fill={getColor(item.name)} />;
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default InsightsPieChart;
