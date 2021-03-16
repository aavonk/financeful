import * as React from 'react';
import { AuthContext } from './authContext';
import { authReducer } from './authReducer';

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: true,
  };

  const [state, dispatch] = React.useReducer(authReducer, initialState);

  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
