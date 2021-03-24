import { createContext, useContext, ReactNode, useReducer } from 'react';

type Alert = {
  message: string;
  type: 'error' | 'info' | 'success';
  id: string;
};

type State = [] | Alert[];

type Action =
  | { type: 'SET_ALERT'; payload: Alert }
  | { type: 'REMOVE_ALERT'; payload: string };

type Dispatch = (action: Action) => void;

type Context = {
  state: State;
  dispatch: Dispatch;
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

  const value = { state, dispatch };
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}

function useAlert() {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }

  return context;
}

export { AlertProvider, useAlert };
