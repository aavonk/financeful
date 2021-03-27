import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import AppThemeProvider from '@Context/theme';
import PrivateRoute from './PrivateRoute';
import LoginPage from '@Pages/LoginPage';
import DashboardPage from '@Pages/DashboardPage';
import TransactionPage from '@Pages/TransactionPage';
import { GlobalStyle } from '../constants/reset.css';
import Layout from '@Components/Layout';
import { BlueScreen, DefaultView } from '@Components/ErrorViews';
import { useFetchUserQuery } from '@Generated/graphql';
import { useAuth } from '@Context/auth/authContext';
import { AlertProvider } from '@Context/alert/alertContext';
import { TransactionProvider } from '@Context/transactions/transactionContext';

import Alerts from '@Common/Alerts';

function Routes() {
  const { data, error } = useFetchUserQuery();
  const { dispatch } = useAuth();

  React.useEffect(() => {
    if (data?.getCurrentUser) {
      dispatch({
        type: 'USER_LOADED',
        payload: data.getCurrentUser,
      });
    }

    if (error) {
      dispatch({ type: 'AUTH_ERROR', payload: { err: 'Unauthenticated' } });
    }
  }, [data, error]);

  return (
    <ErrorBoundary FallbackComponent={BlueScreen}>
      <Router>
        <GlobalStyle />
        <AppThemeProvider>
          <AlertProvider>
            <Alerts />
            <Switch>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route exact path="/login" component={LoginPage} />
              <Layout>
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={DashboardPage}
                />
                <ErrorBoundary FallbackComponent={DefaultView}>
                  <TransactionProvider>
                    <PrivateRoute
                      exact
                      path="/transactions"
                      component={TransactionPage}
                    />
                  </TransactionProvider>
                </ErrorBoundary>
              </Layout>
            </Switch>
          </AlertProvider>
        </AppThemeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default Routes;
