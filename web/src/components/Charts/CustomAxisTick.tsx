import { theme } from '@Constants/theme';

function CustomAxisTick(props: any) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        textAnchor="end"
        fill={`${theme.colors.textSecondary}`}
        fontSize="12px"
        x={0}
        y={0}
        dy={10}
      >
        {payload.value}
      </text>
    </g>
  );
}

export default CustomAxisTick;
