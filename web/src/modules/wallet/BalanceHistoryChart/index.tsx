import {
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { CustomAxisTick, CustomTooltip } from '@Components/Charts';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';

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
          tick={<CustomAxisTick />}
        />
        <YAxis
          dataKey="sum.amount"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(num: any) => formatMoneyFromCentsToDollars(num)}
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
  { date: '2021-02-01', sum: { amount: 191814 } },
  { date: '2021-02-02', sum: { amount: 199104 } },
  { date: '2021-02-03', sum: { amount: 179970 } },
  { date: '2021-02-04', sum: { amount: 181873 } },
  { date: '2021-02-05', sum: { amount: 171772 } },
  { date: '2021-02-06', sum: { amount: 152340 } },
  { date: '2021-02-07', sum: { amount: 112367 } },
  { date: '2021-02-08', sum: { amount: 166957 } },
  { date: '2021-02-09', sum: { amount: 116625 } },
  { date: '2021-02-10', sum: { amount: 138359 } },
  { date: '2021-02-11', sum: { amount: 104252 } },
  { date: '2021-02-12', sum: { amount: 179101 } },
  { date: '2021-02-13', sum: { amount: 139332 } },
  { date: '2021-02-14', sum: { amount: 140619 } },
  { date: '2021-02-15', sum: { amount: 164130 } },
  { date: '2021-02-16', sum: { amount: 126281 } },
  { date: '2021-02-17', sum: { amount: 177529 } },
  { date: '2021-02-18', sum: { amount: 121042 } },
  { date: '2021-02-19', sum: { amount: 178497 } },
  { date: '2021-02-20', sum: { amount: 178360 } },
  { date: '2021-02-21', sum: { amount: 111224 } },
  { date: '2021-02-22', sum: { amount: 157731 } },
  { date: '2021-02-23', sum: { amount: 147123 } },
  { date: '2021-02-24', sum: { amount: 189252 } },
  { date: '2021-02-25', sum: { amount: 154620 } },
  { date: '2021-02-26', sum: { amount: 169092 } },
  { date: '2021-02-27', sum: { amount: 199827 } },
  { date: '2021-02-28', sum: { amount: 130112 } },
  { date: '2021-03-01', sum: { amount: 139928 } },
  { date: '2021-03-02', sum: { amount: 196052 } },
  { date: '2021-03-03', sum: { amount: 193671 } },
  { date: '2021-03-04', sum: { amount: 158448 } },
  { date: '2021-03-05', sum: { amount: 177000 } },
  { date: '2021-03-06', sum: { amount: 144840 } },
  { date: '2021-03-07', sum: { amount: 142458 } },
  { date: '2021-03-08', sum: { amount: 154598 } },
  { date: '2021-03-09', sum: { amount: 108990 } },
  { date: '2021-03-10', sum: { amount: 175811 } },
  { date: '2021-03-11', sum: { amount: 109363 } },
  { date: '2021-03-12', sum: { amount: 199809 } },
  { date: '2021-03-13', sum: { amount: 194236 } },
  { date: '2021-03-14', sum: { amount: 118705 } },
  { date: '2021-03-15', sum: { amount: 199134 } },
  { date: '2021-03-16', sum: { amount: 196074 } },
  { date: '2021-03-17', sum: { amount: 114775 } },
  { date: '2021-03-18', sum: { amount: 161632 } },
  { date: '2021-03-19', sum: { amount: 184632 } },
  { date: '2021-03-20', sum: { amount: 196511 } },
  { date: '2021-03-21', sum: { amount: 109228 } },
  { date: '2021-03-22', sum: { amount: 134620 } },
  { date: '2021-03-23', sum: { amount: 112843 } },
  { date: '2021-03-24', sum: { amount: 115844 } },
  { date: '2021-03-25', sum: { amount: 132150 } },
  { date: '2021-03-26', sum: { amount: 189439 } },
  { date: '2021-03-27', sum: { amount: 181751 } },
  { date: '2021-03-28', sum: { amount: 140601 } },
  { date: '2021-03-29', sum: { amount: 183828 } },
  { date: '2021-03-30', sum: { amount: 114985 } },
  { date: '2021-03-31', sum: { amount: 151906 } },
  { date: '2021-04-01', sum: { amount: 165277 } },
  { date: '2021-04-02', sum: { amount: 134726 } },
  { date: '2021-04-03', sum: { amount: 112131 } },
  { date: '2021-04-04', sum: { amount: 130426 } },
  { date: '2021-04-05', sum: { amount: 197750 } },
  { date: '2021-04-06', sum: { amount: 164363 } },
  { date: '2021-04-07', sum: { amount: 150530 } },
  { date: '2021-04-08', sum: { amount: 135890 } },
  { date: '2021-04-09', sum: { amount: 161276 } },
  { date: '2021-04-10', sum: { amount: 172573 } },
  { date: '2021-04-11', sum: { amount: 117809 } },
  { date: '2021-04-12', sum: { amount: 131523 } },
  { date: '2021-04-13', sum: { amount: 179993 } },
  { date: '2021-04-14', sum: { amount: 130614 } },
  { date: '2021-04-15', sum: { amount: 173891 } },
  { date: '2021-04-16', sum: { amount: 129222 } },
  { date: '2021-04-17', sum: { amount: 118061 } },
  { date: '2021-04-18', sum: { amount: 101389 } },
  { date: '2021-04-19', sum: { amount: 131733 } },
  { date: '2021-04-20', sum: { amount: 127659 } },
  { date: '2021-04-21', sum: { amount: 101418 } },
  { date: '2021-04-22', sum: { amount: 197173 } },
  { date: '2021-04-23', sum: { amount: 122300 } },
  { date: '2021-04-24', sum: { amount: 148208 } },
  { date: '2021-04-25', sum: { amount: 160796 } },
  { date: '2021-04-26', sum: { amount: 123560 } },
  { date: '2021-04-27', sum: { amount: 167026 } },
  { date: '2021-04-28', sum: { amount: 150547 } },
  { date: '2021-04-29', sum: { amount: 161739 } },
  { date: '2021-04-30', sum: { amount: 182793 } },
  { date: '2021-05-01', sum: { amount: 185680 } },
  { date: '2021-05-02', sum: { amount: 153308 } },
  { date: '2021-05-03', sum: { amount: 182827 } },
  { date: '2021-05-04', sum: { amount: 177394 } },
  { date: '2021-05-05', sum: { amount: 191512 } },
  { date: '2021-05-06', sum: { amount: 140504 } },
  { date: '2021-05-07', sum: { amount: 176757 } },
  { date: '2021-05-08', sum: { amount: 198338 } },
  { date: '2021-05-09', sum: { amount: 111384 } },
  { date: '2021-05-10', sum: { amount: 164255 } },
  { date: '2021-05-11', sum: { amount: 183423 } },
];
const data = {
  accountIds: ['cko50plvm0009s0qsvhy95j87', 'cko50plvz0016s0qskqo6xo7x'],
  histories: [
    {
      accountName: 'Primary Checking',
      balance: 1941.66,
      date: '4/1/2021',
      balanceId: 'cko50plyt0101s0qsibqa3qf4',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Checking',
      balance: 1032.14,
      date: '4/2/2021',
      balanceId: 'cko50plz40108s0qsrdpta5vv',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Checking',
      balance: 1281.86,
      date: '4/3/2021',
      balanceId: 'cko50plzd0114s0qslb1id614',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Savings',
      balance: 1321.52,
      date: '4/4/2021',
      balanceId: 'cko50plzo0120s0qsjtttust2',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Checking',
      balance: 1119.31,
      date: '4/5/2021',
      balanceId: 'cko50plzz0127s0qs2shwidn8',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Savings',
      balance: 1394.89,
      date: '4/6/2021',
      balanceId: 'cko50pm070134s0qsx7fohxc6',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Savings',
      balance: 1789.97,
      date: '4/7/2021',
      balanceId: 'cko50pm0e0140s0qs2dshpo3v',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Checking',
      balance: 1275.93,
      date: '4/8/2021',
      balanceId: 'cko50pm0m0147s0qs5pezj2i2',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Checking',
      balance: 1772.33,
      date: '4/9/2021',
      balanceId: 'cko50pm0u0154s0qs0yfathtq',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Checking',
      balance: 1025.55,
      date: '4/10/2021',
      balanceId: 'cko50pm140160s0qse1tzgaxl',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Savings',
      balance: 1850.95,
      date: '4/11/2021',
      balanceId: 'cko50pm1b0167s0qsz9yk8t04',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Checking',
      balance: 1075,
      date: '4/12/2021',
      balanceId: 'cko50pm1u0174s0qsy07u5369',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Checking',
      balance: 1823.47,
      date: '4/13/2021',
      balanceId: 'cko50pm230181s0qskwe7aemo',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Savings',
      balance: 1630.79,
      date: '4/14/2021',
      balanceId: 'cko50pm2c0187s0qstaqzzj2a',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Checking',
      balance: 1534.98,
      date: '4/15/2021',
      balanceId: 'cko50pm2j0193s0qs16yob3h4',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Savings',
      balance: 1078.43,
      date: '4/16/2021',
      balanceId: 'cko50pm2r0200s0qsaep17wq8',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Checking',
      balance: 1705.26,
      date: '4/17/2021',
      balanceId: 'cko50pm340206s0qspdke4p4x',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Checking',
      balance: 1898.16,
      date: '4/18/2021',
      balanceId: 'cko50pm3d0212s0qsjprg3vde',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Checking',
      balance: 1430.85,
      date: '4/19/2021',
      balanceId: 'cko50pm3k0219s0qs486j05f9',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Savings',
      balance: 1063.71,
      date: '4/20/2021',
      balanceId: 'cko50pm3s0225s0qshjigvmuv',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Checking',
      balance: 1335.24,
      date: '4/21/2021',
      balanceId: 'cko50pm3z0231s0qsebb7rl1x',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Savings',
      balance: 1902.85,
      date: '4/22/2021',
      balanceId: 'cko50pm470237s0qskheyjxj0',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Checking',
      balance: 1168.22,
      date: '4/23/2021',
      balanceId: 'cko50pm4g0243s0qs5n5rv8zs',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Savings',
      balance: 1822.18,
      date: '4/24/2021',
      balanceId: 'cko50pm4n0249s0qsydqfammk',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Savings',
      balance: 1881.43,
      date: '4/25/2021',
      balanceId: 'cko50pm4t0255s0qszb1innmo',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Checking',
      balance: 1200.68,
      date: '4/26/2021',
      balanceId: 'cko50pm4z0262s0qsjhy6qdku',
      accountId: 'cko50plvm0009s0qsvhy95j87',
    },
    {
      accountName: 'Primary Savings',
      balance: 1915.12,
      date: '4/27/2021',
      balanceId: 'cko50pm570269s0qs8pymxlx1',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Savings',
      balance: 1922.98,
      date: '4/28/2021',
      balanceId: 'cko50pm5e0276s0qssvxn8htp',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Savings',
      balance: 1555.06,
      date: '4/29/2021',
      balanceId: 'cko50pm5k0282s0qs1ycfpnqn',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
    {
      accountName: 'Primary Savings',
      balance: 1737.54,
      date: '4/30/2021',
      balanceId: 'cko50pm5q0289s0qsgmwh033h',
      accountId: 'cko50plvz0016s0qskqo6xo7x',
    },
  ],
};
