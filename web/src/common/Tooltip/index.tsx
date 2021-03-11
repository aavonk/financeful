import React, { useState } from 'react';
import { TooltipRoot, TooltipBody } from './style';

type TooltipProps = {
  children: React.ReactNode;
  content: string;
  direction: string;
  autoWidth?: boolean | undefined;
};

function Tooltip({
  children,
  content,
  direction,
  autoWidth,
  ...props
}: TooltipProps) {
  const [active, setActive] = useState(false);
  let timeout: ReturnType<typeof setTimeout>;

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };
  return (
    <TooltipRoot
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      $auto={autoWidth}
      {...props}
      aria-haspopup="true"
    >
      {children}
      {active && <TooltipBody $direction={direction}>{content}</TooltipBody>}
    </TooltipRoot>
  );
}

Tooltip.defaultProps = {
  direction: 'right',
};

export default Tooltip;
