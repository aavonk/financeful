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

function BalanceHistoryChart() {
  return (
    <ResponsiveContainer width="100%" maxHeight={300} minHeight={200}>
      <AreaChart data={networthData}>
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
          dataKey="sum.amount"
          axisLine={false}
          tickLine={false}
          tickCount={4}
          width={80}
          tick={<CustomYAxisTick formatCents />}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          dataKey="sum.amount"
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

const networthData = [
  { date: '2021-02-01', sum: { amount: 1918140 } },
  { date: '2021-02-02', sum: { amount: 1991040 } },
  { date: '2021-02-03', sum: { amount: 1799700 } },
  { date: '2021-02-04', sum: { amount: 1818730 } },
  { date: '2021-02-05', sum: { amount: 1717720 } },
  { date: '2021-02-06', sum: { amount: 1523400 } },
  { date: '2021-02-07', sum: { amount: 1123670 } },
  { date: '2021-02-08', sum: { amount: 1669570 } },
  { date: '2021-02-09', sum: { amount: 1166250 } },
  { date: '2021-02-10', sum: { amount: 1383590 } },
  { date: '2021-02-11', sum: { amount: 1042520 } },
  { date: '2021-02-12', sum: { amount: 1791010 } },
  { date: '2021-02-13', sum: { amount: 1393320 } },
  { date: '2021-02-14', sum: { amount: 1406190 } },
  { date: '2021-02-15', sum: { amount: 1641300 } },
  { date: '2021-02-16', sum: { amount: 1262810 } },
  { date: '2021-02-17', sum: { amount: 1775290 } },
  { date: '2021-02-18', sum: { amount: 1210420 } },
  { date: '2021-02-19', sum: { amount: 1784970 } },
  { date: '2021-02-20', sum: { amount: 1783600 } },
  { date: '2021-02-21', sum: { amount: 1112240 } },
  { date: '2021-02-22', sum: { amount: 1577310 } },
  { date: '2021-02-23', sum: { amount: 1471230 } },
  { date: '2021-02-24', sum: { amount: 1892520 } },
  { date: '2021-02-25', sum: { amount: 1546200 } },
  { date: '2021-02-26', sum: { amount: 1690920 } },
  { date: '2021-02-27', sum: { amount: 1998270 } },
  { date: '2021-02-28', sum: { amount: 1301120 } },
  { date: '2021-03-01', sum: { amount: 1399280 } },
  { date: '2021-03-02', sum: { amount: 1960520 } },
  { date: '2021-03-03', sum: { amount: 1936710 } },
  { date: '2021-03-04', sum: { amount: 1584480 } },
  { date: '2021-03-05', sum: { amount: 1770000 } },
  { date: '2021-03-06', sum: { amount: 1448400 } },
  { date: '2021-03-07', sum: { amount: 1424580 } },
  { date: '2021-03-08', sum: { amount: 1545980 } },
  { date: '2021-03-09', sum: { amount: 1089900 } },
  { date: '2021-03-10', sum: { amount: 1758110 } },
  { date: '2021-03-11', sum: { amount: 1093630 } },
  { date: '2021-03-12', sum: { amount: 1998090 } },
  { date: '2021-03-13', sum: { amount: 1942360 } },
  { date: '2021-03-14', sum: { amount: 1187050 } },
  { date: '2021-03-15', sum: { amount: 1991340 } },
  { date: '2021-03-16', sum: { amount: 1960740 } },
  { date: '2021-03-17', sum: { amount: 1147750 } },
  { date: '2021-03-18', sum: { amount: 1616320 } },
  { date: '2021-03-19', sum: { amount: 1846320 } },
  { date: '2021-03-20', sum: { amount: 1965110 } },
  { date: '2021-03-21', sum: { amount: 1092280 } },
  { date: '2021-03-22', sum: { amount: 1346200 } },
  { date: '2021-03-23', sum: { amount: 1128430 } },
  { date: '2021-03-24', sum: { amount: 1158440 } },
  { date: '2021-03-25', sum: { amount: 1321500 } },
  { date: '2021-03-26', sum: { amount: 1894390 } },
  { date: '2021-03-27', sum: { amount: 1817510 } },
  { date: '2021-03-28', sum: { amount: 1406010 } },
  { date: '2021-03-29', sum: { amount: 1838280 } },
  { date: '2021-03-30', sum: { amount: 1149850 } },
  { date: '2021-03-31', sum: { amount: 1519060 } },
  { date: '2021-04-01', sum: { amount: 1652770 } },
  { date: '2021-04-02', sum: { amount: 1347260 } },
  { date: '2021-04-03', sum: { amount: 1121310 } },
  { date: '2021-04-04', sum: { amount: 1304260 } },
  { date: '2021-04-05', sum: { amount: 1977500 } },
  { date: '2021-04-06', sum: { amount: 1643630 } },
  { date: '2021-04-07', sum: { amount: 1505300 } },
  { date: '2021-04-08', sum: { amount: 1358900 } },
  { date: '2021-04-09', sum: { amount: 1612760 } },
  { date: '2021-04-10', sum: { amount: 1725730 } },
  { date: '2021-04-11', sum: { amount: 1178090 } },
  { date: '2021-04-12', sum: { amount: 1315230 } },
  { date: '2021-04-13', sum: { amount: 1799930 } },
  { date: '2021-04-14', sum: { amount: 1306140 } },
  { date: '2021-04-15', sum: { amount: 1738910 } },
  { date: '2021-04-16', sum: { amount: 1292220 } },
  { date: '2021-04-17', sum: { amount: 1180610 } },
  { date: '2021-04-18', sum: { amount: 1013890 } },
  { date: '2021-04-19', sum: { amount: 1317330 } },
  { date: '2021-04-20', sum: { amount: 1276590 } },
  { date: '2021-04-21', sum: { amount: 1014180 } },
  { date: '2021-04-22', sum: { amount: 1971730 } },
  { date: '2021-04-23', sum: { amount: 1223000 } },
  { date: '2021-04-24', sum: { amount: 1482080 } },
  { date: '2021-04-25', sum: { amount: 1607960 } },
  { date: '2021-04-26', sum: { amount: 1235600 } },
  { date: '2021-04-27', sum: { amount: 1670260 } },
  { date: '2021-04-28', sum: { amount: 1505470 } },
  { date: '2021-04-29', sum: { amount: 1617390 } },
  { date: '2021-04-30', sum: { amount: 1827930 } },
  { date: '2021-05-01', sum: { amount: 1856800 } },
  { date: '2021-05-02', sum: { amount: 1533080 } },
  { date: '2021-05-03', sum: { amount: 1828270 } },
  { date: '2021-05-04', sum: { amount: 1773940 } },
  { date: '2021-05-05', sum: { amount: 1915120 } },
  { date: '2021-05-06', sum: { amount: 1405040 } },
  { date: '2021-05-07', sum: { amount: 1767570 } },
  { date: '2021-05-08', sum: { amount: 1983380 } },
  { date: '2021-05-09', sum: { amount: 1113840 } },
  { date: '2021-05-10', sum: { amount: 1642550 } },
  { date: '2021-05-11', sum: { amount: 1834230 } },
];
