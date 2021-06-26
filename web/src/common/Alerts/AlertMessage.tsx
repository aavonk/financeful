import React from 'react';
import { MessageRoot, MessageIcon, MessageText } from './style';
import type { MessageRootVariants } from './style';
import { WarningIcon, InfoIcon } from '@Common/Icons';

type OptionalProps =
  | { customMessage?: false; message: string; messageComponent?: never }
  | { customMessage: true; message?: never; messageComponent: React.ReactNode };

type RootProps = {
  variant: MessageRootVariants;
};

type Props = RootProps & OptionalProps;

function AlertMessage({ variant, message, customMessage, messageComponent }: Props) {
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
    <MessageRoot $variant={variant}>
      <MessageIcon>{renderIcon(variant)}</MessageIcon>
      <MessageText>{customMessage ? messageComponent : message}</MessageText>
    </MessageRoot>
  );
}

export default AlertMessage;
