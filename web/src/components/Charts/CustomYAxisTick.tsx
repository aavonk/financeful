import { theme } from '@Constants/theme';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';

function CustomYAxisTick(props: any) {
  const { x, y, payload, formatCents } = props;

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
        {formatCents ? formatMoneyFromCentsToDollars(payload.value) : payload.value}
      </text>
    </g>
  );
}

export default CustomYAxisTick;
