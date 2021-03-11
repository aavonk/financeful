import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from '@Pages/LoginPage';
import DashboardPage from '@Pages/DashboardPage';
import TransactionPage from '@Pages/TransactionPage';
import AppThemeProvider from '../context/AppThemeProvider';
import { GlobalStyle } from '../constants/reset.css';
import Layout from '@Components/Layout';

function Routes() {
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
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/transactions" component={TransactionPage} />
          </Layout>
        </Switch>
      </AppThemeProvider>
    </Router>
  );
}

export default Routes;
