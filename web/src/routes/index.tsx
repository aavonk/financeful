import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import AppThemeProvider from '@Context/theme';
import PrivateRoute from './PrivateRoute';
import LoginPage from '@Pages/LoginPage';
import DashboardPage from '@Pages/DashboardPage';
import TransactionPage from '@Pages/TransactionPage';
import MyWalletPage from '@Pages/MyWalletPage';
import { GlobalStyle } from '../constants/reset.css';
import Layout from '@Components/Layout';
import { BlueScreen, DefaultView } from '@Components/ErrorViews';
import { useFetchUserQuery } from '@Generated/graphql';
import { useAuth } from '@Context/auth/authContext';
import { AlertProvider } from '@Context/alert/alertContext';
import { ConfirmationProvider } from '@Context/confirmation/confirmationContext';
import { DateRangeProvider } from '@Context/daterange/DateRangeContext';
import Alerts from '@Common/Alerts';
import AccountPage from '@Pages/AccountPage';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <ConfirmationProvider>
                  <PrivateRoute exact path="/dashboard" component={DashboardPage} />
                  <ErrorBoundary FallbackComponent={DefaultView}>
                    <DateRangeProvider>
                      <PrivateRoute
                        exact
                        path="/transactions"
                        component={TransactionPage}
                      />
                    </DateRangeProvider>
                  </ErrorBoundary>
                  <PrivateRoute path="/my-wallet" component={MyWalletPage} exact />
                  <PrivateRoute
                    path="/my-wallet/:account_id"
                    component={MyWalletPage}
                    exact={false}
                  />
                </ConfirmationProvider>
                <PrivateRoute exact path="/account/:id" component={AccountPage} />
              </Layout>
            </Switch>
          </AlertProvider>
        </AppThemeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default Routes;
