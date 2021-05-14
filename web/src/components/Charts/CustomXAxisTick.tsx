import React from 'react';
import { theme } from '@Constants/theme';
import { format } from 'date-fns';

function CustomXAxisTick(props: any) {
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
        {payload.value ? format(new Date(payload.value), 'MMM d') : ''}
      </text>
    </g>
  );
}

export default CustomXAxisTick;
