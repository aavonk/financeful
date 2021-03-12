import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '@Context/auth/authContext';
import FullscreenLoader from '@Common/Backdrop/FullscreenLoader';

interface Props extends RouteProps {
  component: React.ComponentType<any>;
}

function PrivateRoute({ component: Component, ...rest }: Props) {
  const {
    state: { isAuthenticated, loading },
  } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <FullscreenLoader />
        ) : isAuthenticated && !loading ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
