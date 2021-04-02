import { useEffect, useState } from 'react';
import { InfoIcon, ErrorIcon, CheckCircleIcon } from '@Common/Icons';
import { AlertRoot, AlertIcon, AlertMessage } from './style';

interface AlertProps {
  type: 'error' | 'success' | 'info';
  message: string;
}

function Toast({ type, message }: AlertProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }

  const renderIcon = (type: AlertProps['type']) => {
    switch (type) {
      case 'error':
        return <ErrorIcon />;
      case 'info':
        return <InfoIcon />;
      case 'success':
        return <CheckCircleIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <AlertRoot $type={type} role="alert">
      <AlertIcon>{renderIcon(type)}</AlertIcon>
      <AlertMessage>{message}</AlertMessage>
    </AlertRoot>
  );
}

export default Toast;
