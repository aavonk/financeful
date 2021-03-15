import * as React from 'react';
import { State, Dispatch } from './types';

export const AuthContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
