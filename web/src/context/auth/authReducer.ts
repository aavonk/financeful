import { State, Action } from './types';

export function authReducer(state: State, action: Action) {
  switch (action.type) {
    case 'LOG_IN':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
        error: null,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
  }
}
