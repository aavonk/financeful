import { useEffect, useState } from 'react';
import { InfoIcon, ErrorIcon, CheckCircleIcon } from '@Common/Icons';
import { AlertRoot, AlertIcon, AlertMessage } from './style';

interface AlertProps {
  type: 'error' | 'success' | 'info';
  message: string;
  timeout?: number;
}

/* 
  This Component looks exactly the same as the Alert component. 
  This is to be used when we want to return an actual component,
  rather than using the showAlert function provided by the alert context. 

  A good example of when to use this rather than using the alert context
  is when catching an error from a graphql query

  ex: BAD: 
      if (error) {
        showAlert('some message', 'error')
        
      }
      *** This causes an infinite loop of rerenders
  
  ex: GOOD:
      if (error) {
        return <Toast type="error" message="Some message" />
      }
      *** The error will dissapear after three seconds
*/

function Toast({ type, message, timeout = 3000 }: AlertProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, timeout);

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
    <AlertRoot $type={type} role="alert" data-testid="toast">
      <AlertIcon>{renderIcon(type)}</AlertIcon>
      <AlertMessage>{message}</AlertMessage>
    </AlertRoot>
  );
}

export default Toast;
