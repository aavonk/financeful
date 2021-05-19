import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useCallback,
} from 'react';
import { v4 as uuid } from 'uuid';

export type IAlert = {
  message: string;
  type: 'error' | 'info' | 'success';
  id: string;
};

type State = [] | IAlert[];

type Action =
  | { type: 'SET_ALERT'; payload: IAlert }
  | { type: 'REMOVE_ALERT'; payload: string };

type Context = {
  alerts: State;
  // dispatch: Dispatch;
  showAlert: (message: string, type: IAlert['type'], timeout?: number) => void;
};

type AlertProviderProps = {
  children: ReactNode;
};

const AlertContext = createContext<Context | undefined>(undefined);

function alertReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_ALERT':
      return [...state, action.payload];
    case 'REMOVE_ALERT':
      return state.filter((alert) => alert.id !== action.payload);
    default:
      throw new Error(`Unhandled action type in alert reducer`);
  }
}

function AlertProvider({ children }: AlertProviderProps) {
  const [state, dispatch] = useReducer(alertReducer, []);

  const showAlert = useCallback(
    (message: string, type: IAlert['type'], timeout = 3000) => {
      const id = uuid();

      dispatch({
        type: 'SET_ALERT',
        payload: { message, type, id },
      });

      setTimeout(() => {
        dispatch({ type: 'REMOVE_ALERT', payload: id });
      }, timeout);
    },
    [],
  );
  const value = { alerts: state, showAlert };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}

function useAlert() {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }

  return context;
}

export { AlertProvider, useAlert };
