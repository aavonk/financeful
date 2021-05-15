import React from 'react';
import { GradientAreaChart } from '@Components/Charts';
import { theme } from '@Constants/theme';

const chartColor = {
  stroke: theme.charts.greenStroke,
  fill: theme.charts.greenFill,
};

function BalanceHistoryChartController() {
  return (
    <GradientAreaChart
      AreaDataKey="balance"
      YAxisKey="balance"
      XAxisKey="date"
      data={data.getAccountDailyBalances}
      color={chartColor}
    />
  );
}

export default BalanceHistoryChartController;

const data = {
  getAccountDailyBalances: [
    {
      date: '4/2/2021',
      balance: 1570.81,
    },
    {
      date: '4/4/2021',
      balance: 1600.42,
    },
    {
      date: '4/11/2021',
      balance: 1771.16,
    },
    {
      date: '4/12/2021',
      balance: 1735.52,
    },
    {
      date: '4/13/2021',
      balance: 1811.89,
    },
    {
      date: '4/14/2021',
      balance: 1092.11,
    },
    {
      date: '4/15/2021',
      balance: 1718.53,
    },
    {
      date: '4/21/2021',
      balance: -1000.59,
    },
    {
      date: '4/22/2021',
      balance: 1994.83,
    },
    {
      date: '4/25/2021',
      balance: 1413.22,
    },
    {
      date: '4/26/2021',
      balance: 1699.59,
    },
    {
      date: '4/27/2021',
      balance: 1681.73,
    },
    {
      date: '4/29/2021',
      balance: 1567.45,
    },
    {
      date: '2/28/2021',
      balance: 1590.33,
    },
    {
      date: '3/1/2021',
      balance: 1941.03,
    },
    {
      date: '3/6/2021',
      balance: 1404.26,
    },
    {
      date: '3/7/2021',
      balance: 1013.79,
    },
    {
      date: '3/9/2021',
      balance: 1580.15,
    },
    {
      date: '3/10/2021',
      balance: 1117.75,
    },
    {
      date: '3/11/2021',
      balance: 1122.01,
    },
    {
      date: '3/13/2021',
      balance: 1788.68,
    },
    {
      date: '3/14/2021',
      balance: 1873.6,
    },
    {
      date: '3/16/2021',
      balance: 1027.24,
    },
    {
      date: '3/17/2021',
      balance: 1478.66,
    },
    {
      date: '3/19/2021',
      balance: 1777.58,
    },
    {
      date: '3/20/2021',
      balance: 1596.58,
    },
    {
      date: '3/21/2021',
      balance: 1794.05,
    },
    {
      date: '3/23/2021',
      balance: 1547.44,
    },
    {
      date: '3/25/2021',
      balance: 1583.26,
    },
    {
      date: '3/26/2021',
      balance: 1162.62,
    },
    {
      date: '3/29/2021',
      balance: 1566.95,
    },
  ],
};
