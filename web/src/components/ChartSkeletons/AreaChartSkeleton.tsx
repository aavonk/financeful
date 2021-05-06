import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { RelativeContainer, ErrorMessage } from './style';

type NormalProps = {
  height?: number;
};
type ErrorProps =
  | { withOverlappingMessage?: false; heading?: never; subheading?: never }
  | { withOverlappingMessage: true; heading: string; subheading: string };

type Props = NormalProps & ErrorProps;
function AreaChartSkeleton({
  withOverlappingMessage = false,
  heading,
  subheading,
  height,
}: Props) {
  const data = useMemo(
    () => [
      { name: 'Wrapsafe', amount: 191814 },
      { name: 'Solarbreeze', amount: 1991040 },
      { name: 'Biodex', amount: 1799700 },
      { name: 'Andalax', amount: 1818730 },
      { name: 'Cookley', amount: 1717720 },
      { name: 'Alpha', amount: 1523400 },
      { name: 'Lotlux', amount: 1123670 },
      { name: 'Biodex', amount: 1669570 },
      { name: 'Konklab', amount: 1166250 },
      { name: 'Biodex', amount: 1383590 },
    ],
    [],
  );

  return (
    <RelativeContainer>
      <ResponsiveContainer minHeight={height ? height : 300} width="100%">
        <AreaChart data={data}>
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke="#000"
            fill="rgb(255,255,255,0.08)"
          />
        </AreaChart>
      </ResponsiveContainer>
      {withOverlappingMessage && (
        <ErrorMessage>
          <h3>{heading}</h3>
          <p>{subheading}</p>
        </ErrorMessage>
      )}
    </RelativeContainer>
  );
}

export default AreaChartSkeleton;
