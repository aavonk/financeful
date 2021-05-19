import React from 'react';
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
import { useMediaQuery } from '@Hooks/useMediaQuery';
import { theme } from '@Constants/theme';

type ColorProp = {
  stroke: string;
  fill: string;
};
type Props = {
  data: HistoryObject[];
  XAxisKey: string;
  YAxisKey: string;
  AreaDataKey: string;
  color?: ColorProp;
  'data-testid'?: string;
};

const defaultColors: ColorProp = {
  stroke: theme.charts.blueStroke,
  fill: theme.charts.blueFill,
};

function GradientAreaChart({
  data,
  XAxisKey,
  YAxisKey,
  AreaDataKey,
  color = defaultColors,
  ...props
}: Props) {
  const isDesktop = useMediaQuery('(min-width: 1601px)');

  return (
    <ResponsiveContainer
      width="100%"
      height={isDesktop ? 420 : 300}
      data-testid={props['data-testid']}
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color.fill} stopOpacity={0.4} />
            <stop offset="75%" stopColor={color.fill} stopOpacity={0.15} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={XAxisKey}
          axisLine={false}
          tickLine={false}
          tick={<CustomXAxisTick />}
          tickCount={8}
        />
        <YAxis
          type="number"
          dataKey={YAxisKey}
          axisLine={false}
          tickLine={false}
          tickCount={4}
          width={80}
          tick={<CustomYAxisTick />}
          hide
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          dataKey={AreaDataKey}
          type="monotone"
          stackId="1"
          stroke={color.stroke}
          strokeWidth={2}
          fill="url(#color)"
        />
        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default GradientAreaChart;
