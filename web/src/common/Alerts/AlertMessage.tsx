import React from 'react';
import { MessageRoot, MessageIcon, MessageText } from './style';
import type { MessageRootVariants } from './style';
import { WarningIcon, InfoIcon } from '@Common/Icons';
import { usePresence } from 'framer-motion';

type OptionalProps =
  | { customMessage?: false; message: string; messageComponent?: never }
  | { customMessage: true; message?: never; messageComponent: React.ReactNode };

type RootProps = {
  variant: MessageRootVariants;
};

type Props = RootProps & OptionalProps;

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };

function AlertMessage({ variant, message, customMessage, messageComponent }: Props) {
  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    layout: true,
    initial: 'out',
    animate: isPresent ? 'in' : 'out',
    variants: {
      in: { scaleY: 1, opacity: 1 },
      out: { scaleY: 0, opacity: 0, zIndex: -1 },
    },
    onAnimationComplete: () => !isPresent && safeToRemove!(),
    transition,
  };

  const renderIcon = (type: Props['variant']) => {
    switch (type) {
      case 'info':
        return <InfoIcon />;
      case 'warning':
        return <WarningIcon />;
      default:
        return <InfoIcon />;
    }
  };
  return (
    <MessageRoot $variant={variant} {...animations}>
      <MessageIcon>{renderIcon(variant)}</MessageIcon>
      <MessageText>{customMessage ? messageComponent : message}</MessageText>
    </MessageRoot>
  );
}

export default AlertMessage;
