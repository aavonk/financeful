import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '@Pages/LoginPage';
import DashboardPage from '@Pages/DashboardPage';
import TransactionPage from '@Pages/TransactionPage';
import AppThemeProvider from '../context/AppThemeProvider';
import { GlobalStyle } from '../constants/reset.css';
import Layout from '@Components/Layout';

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
    <Router>
      <GlobalStyle />
      <AppThemeProvider>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route exact path="/login" component={LoginPage} />
          <Layout>
            <PrivateRoute exact path="/dashboard" component={DashboardPage} />
            <PrivateRoute
              exact
              path="/transactions"
              component={TransactionPage}
            />
          </Layout>
        </Switch>
      </AppThemeProvider>
    </Router>
  );
}

export default Routes;
