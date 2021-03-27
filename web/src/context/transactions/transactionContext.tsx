import { createContext, useContext, ReactNode, useReducer } from 'react';
import { Transaction } from '@Generated/graphql';

type State = {
  transactions: Transaction[] | [];
};

type Action =
  | { type: 'FETCH_SUCCESS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction };

type Dispatch = (action: Action) => void;

const TransactionContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function transactionReducer(state: State, action: Action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        transactions: action.payload,
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
}

function TransactionProvider({ children }: { children: ReactNode }) {
  const initialState = {
    transactions: [],
  };

  const [state, dispatch] = useReducer(transactionReducer, initialState);

  const value = { state, dispatch };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      'useTransactions must be used within a TransactionProvider',
    );
  }
  return context;
}

export { useTransactions, TransactionProvider };
