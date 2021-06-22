import React from 'react';
import type { Category } from '@Generated/graphql';
import { createBudgetReducer } from './createBudgetReducer';
import { useFetchCategoriesQuery } from '@Generated/graphql';

interface ModifiedCategory extends Category {
  isChecked: boolean;
}

export type State = {
  categories: Category[] | undefined;
  queue: Category[];
  selected: Category[];
  loading: boolean;
  error: boolean;
};

type ID = string;

export type Action =
  | { type: 'FETCH_ERROR' }
  | { type: 'FETCH_SUCCESS'; payload: Category[] }
  | { type: 'ADD_TO_QUEUE'; payload: Category }
  | { type: 'ADD_TO_SELECTED' }
  | { type: 'REMOVE_FROM_QUEUE'; payload: ID }
  | { type: 'SELECT_ALL_CATEGORIES' }
  | { type: 'REMOVE_ALL_SELECTED' };

type ICreateBudgetContext = {
  state: State;
  handleQueue: (category: Category, checked: boolean) => void;
  selectAll: () => void;
  removeAllSelected: () => void;
  routeToSelected: () => void;
};

const CreateBudgetContext = React.createContext<ICreateBudgetContext | undefined>(
  undefined,
);

const initialState: State = {
  categories: undefined,
  queue: [],
  selected: [],
  loading: true,
  error: false,
};

export function CreateBudgetProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(createBudgetReducer, initialState);
  const { data, error } = useFetchCategoriesQuery();

  React.useEffect(() => {
    if (data?.getCategories) {
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: data.getCategories,
      });
    }
  }, [data]);

  if (error) {
    dispatch({ type: 'FETCH_ERROR' });
  }

  const selectAll = () => {
    dispatch({ type: 'SELECT_ALL_CATEGORIES' });
  };

  const removeAllSelected = () => {
    dispatch({ type: 'REMOVE_ALL_SELECTED' });
  };

  const handleQueue = (category: Category, checked: boolean) => {
    if (!checked) {
      return dispatch({ type: 'REMOVE_FROM_QUEUE', payload: category.id });
    }
    dispatch({ type: 'ADD_TO_QUEUE', payload: category });
  };

  const routeToSelected = () => {
    dispatch({ type: 'ADD_TO_SELECTED' });
  };

  const value: ICreateBudgetContext = {
    state,
    handleQueue,
    routeToSelected,
    removeAllSelected,
    selectAll,
  };

  return (
    <CreateBudgetContext.Provider value={value}>{children}</CreateBudgetContext.Provider>
  );
}

export function useCreateBudgetContext() {
  const context = React.useContext(CreateBudgetContext);

  if (!context) {
    throw new Error(
      'useCreateBudgetContext must be used within a <CreateBudgetProvider />',
    );
  }

  return context;
}
