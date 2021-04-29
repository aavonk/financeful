import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { RelativeContainer, ErrorMessage } from './style';

type ErrorProps =
  | { withOverlappingMessage?: false; heading?: never; subheading?: never }
  | { withOverlappingMessage: true; heading: string; subheading: string };

function AreaChartSkeleton({
  withOverlappingMessage = false,
  heading,
  subheading,
}: ErrorProps) {
  const data = useMemo(
    () => [
      { name: 'Wrapsafe', amount: 2247 },
      { name: 'Solarbreeze', amount: 3173 },
      { name: 'Biodex', amount: 4328 },
      { name: 'Andalax', amount: 4296 },
      { name: 'Cookley', amount: 3560 },
      { name: 'Alpha', amount: 4528 },
      { name: 'Lotlux', amount: 3942 },
      { name: 'Biodex', amount: 2751 },
      { name: 'Konklab', amount: 3099 },
      { name: 'Biodex', amount: 5929 },
    ],
    [],
  );
  return (
    <RelativeContainer>
      <ResponsiveContainer minHeight={200} width="100%">
        <AreaChart data={data}>
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Area
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
