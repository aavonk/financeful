import React, { useState, useLayoutEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { theme } from '@Constants/theme';

type Data = {
  income: number;
  expenses: number;
  transfers: number;
};
type Props = {
  data: Data;
};

type FormattedObject = {
  name: PossibleKeys;
  value: string;
  fill: string;
};

type Empty = Record<string, unknown>;

type PossibleKeys = 'income' | 'expenses' | 'transfers';

type State = FormattedObject[];

function InsightsPieChart({ data }: Props) {
  const [chartData, setChartData] = useState<State>([]);

  const getFillColor = (key: PossibleKeys) => {
    switch (key) {
      case 'income':
        return theme.colors.green;
      case 'expenses':
        return theme.colors.red;
      case 'transfers':
        return theme.colors.primary;
    }
  };

  const formatData = useCallback(() => {
    const newData = Object.entries(data).map((item) => {
      const obj: FormattedObject | Empty = {};
      obj.name = item[0];
      obj.value = item[1];
      //@ts-ignore
      obj.fill = getFillColor(obj.name);
      return obj;
    });
    return newData;
  }, []);

  useLayoutEffect(() => {
    const data = formatData();
    // Add an "empty" spaceholder incase all values are 0, so that
    // an empty pie chart still appears
    const newData = [
      ...data,
      { name: 'No value', value: 1, fill: theme.colors.darkThree },
    ];
    setChartData(newData as FormattedObject[]);
  }, [formatData]);
  return (
    <ResponsiveContainer height={150} width="100%">
      <PieChart>
        <Pie
          data={chartData}
          innerRadius={45}
          outerRadius={65}
          paddingAngle={5}
          dataKey="value"
          stroke={theme.colors.darkTwo}
        >
          {chartData.map((item, index) => {
            return <Cell key={`cell-${index}`} fill={item.fill} />;
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default InsightsPieChart;
