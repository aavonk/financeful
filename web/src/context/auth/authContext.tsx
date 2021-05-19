import * as React from 'react';
import { User } from '@Generated/graphql';
import { authReducer } from './authReducer';
export type Error = Record<string, unknown> | null;

export type State = {
  user: User | null;
  isAuthenticated: boolean;
  error: Error;
  loading: boolean;
};

export type Action =
  | { type: 'LOG_IN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_ERROR'; payload: Error }
  | { type: 'USER_LOADED'; payload: User };

export type Dispatch = (action: Action) => void;

export type AuthFunction = () => void;

const AuthContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
);

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

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
