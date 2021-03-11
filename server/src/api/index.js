import AuthAPI from './AuthAPI';
import UsersAPI from './UsersAPI';
import TransactionsAPI from './TransactionsAPI';

// Models
import Transaction from '../models/Transactions';
import User from '../models/User';

// Utils
import {
  checkAuth,
  generateToken,
  validatePassword,
  hashPassword,
} from '../util/auth';

const userApiDependencies = {
  generateToken,
  user: User,
};

const authApiDependencies = {
  userModel: User,
  validatePassword,
  generateToken,
  hashPassword,
};

// Set up data sources for appollo server
export const APIContainer = {
  transactionAPI: new TransactionsAPI(Transaction, checkAuth),
  userAPI: new UsersAPI(userApiDependencies),
  authAPI: new AuthAPI(authApiDependencies),
};
