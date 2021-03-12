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
import AuthProvider from '@Context/auth/AuthProvider';

function Routes() {
  return (
    <Router>
      <GlobalStyle />
      <AppThemeProvider>
        <AuthProvider>
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
        </AuthProvider>
      </AppThemeProvider>
    </Router>
  );
}

export default Routes;
