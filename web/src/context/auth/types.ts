import { User } from '@Generated/graphql';

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
  | { type: 'AUTH_ERROR'; payload: Error };

export type Dispatch = (action: Action) => void;

export type AuthFunction = () => void;
