import React from 'react';
import { InfoIcon, ErrorIcon, CheckCircleIcon } from '@Common/Icons';
import { useAlert, IAlert } from '@Context/alert/alertContext';
import { AlertRoot, AlertIcon, AlertMessage } from './style';

function Alerts() {
  const { alerts } = useAlert();

  const renderIcon = (type: IAlert['type']) => {
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

  if (alerts.length === 0) {
    return null;
  }

  return (
    <>
      {alerts.map((alert: IAlert) => (
        <AlertRoot
          key={alert.id}
          $type={alert.type}
          role="alert"
          data-testid="toast-alert"
        >
          <AlertIcon>{renderIcon(alert.type)}</AlertIcon>
          <AlertMessage
            data-testid="toast-alert-message"
            data-variant={
              alert.type === 'info' || alert.type === 'success' ? 'success' : 'error'
            }
          >
            {alert.message}
          </AlertMessage>
        </AlertRoot>
      ))}
    </>
  );
}

export default Alerts;
