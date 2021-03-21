import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import AppThemeProvider from '@Context/AppThemeProvider';
import SidebarProvider from '@Context/sidebar/SidebarProvider';
import PrivateRoute from './PrivateRoute';
import LoginPage from '@Pages/LoginPage';
import DashboardPage from '@Pages/DashboardPage';
import TransactionPage from '@Pages/TransactionPage';
import { GlobalStyle } from '../constants/reset.css';
import Layout from '@Components/Layout';
import { BlueScreen, ViewError } from '@Components/ErrorViews';
import { useFetchUserQuery } from '@Generated/graphql';
import { useAuth } from '@Context/auth/authContext';

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
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route exact path="/login" component={LoginPage} />
            <SidebarProvider>
              <Layout>
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={DashboardPage}
                />
                <ErrorBoundary FallbackComponent={ViewError}>
                  <PrivateRoute
                    exact
                    path="/transactions"
                    component={TransactionPage}
                  />
                </ErrorBoundary>
              </Layout>
            </SidebarProvider>
          </Switch>
        </AppThemeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default Routes;
