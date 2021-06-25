import React from 'react';
import type { Category } from '@Generated/graphql';
import { createBudgetReducer } from './createBudgetReducer';
import { useFetchCategoriesQuery } from '@Generated/graphql';

export type ModifiedCategory = {
  id: string;
  name: string;
  description?: string | undefined | null;
  currentMonth: number;
  isIncome: boolean;
  isValid: boolean;
};

export type State = {
  categories: ModifiedCategory[] | undefined;
  queue: ModifiedCategory[];
  selected: ModifiedCategory[];
  loading: boolean;
  error: boolean;
};

type ID = string;

export type Action =
  | { type: 'FETCH_ERROR' }
  | { type: 'FETCH_SUCCESS'; payload: ModifiedCategory[] }
  | { type: 'ADD_TO_QUEUE'; payload: ModifiedCategory }
  | { type: 'ADD_TO_SELECTED' }
  | { type: 'REMOVE_FROM_QUEUE'; payload: ID }
  | { type: 'SELECT_ALL_CATEGORIES' }
  | { type: 'REMOVE_ALL_SELECTED' }
  | {
      type: 'UPDATE_CURRENT_AMOUNT';
      payload: { id: ModifiedCategory['id']; amount: number };
    }
  | {
      type: 'INVALIDATE_BUDGET_ITEM';
      payload: { id: ModifiedCategory['id'] };
    };

type ICreateBudgetContext = {
  state: State;
  handleQueue: (category: ModifiedCategory, checked: boolean) => void;
  selectAll: () => void;
  removeAllSelected: () => void;
  routeToSelected: () => void;
  markBudgetItemAsInvalid: (categoryId: string) => void;
  updateBudgetAmount: (categoryId: string, amount: number) => void;
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
      const modifiedCategories: ModifiedCategory[] = data.getCategories.map((item) => {
        const { name, id, description, isIncome } = item;
        return {
          name,
          id: id as string,
          description,
          currentMonth: 0,
          isIncome: isIncome as boolean,
          isValid: true,
        };
      });
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: modifiedCategories,
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

  const handleQueue = (category: ModifiedCategory, checked: boolean) => {
    if (!checked) {
      return dispatch({ type: 'REMOVE_FROM_QUEUE', payload: category.id });
    }
    dispatch({ type: 'ADD_TO_QUEUE', payload: category });
  };

  const routeToSelected = () => {
    dispatch({ type: 'ADD_TO_SELECTED' });
  };

  const updateBudgetAmount = (categoryId: string, amount: number) => {
    dispatch({ type: 'UPDATE_CURRENT_AMOUNT', payload: { id: categoryId, amount } });
  };

  const markBudgetItemAsInvalid = (categoryId: string) => {
    dispatch({ type: 'INVALIDATE_BUDGET_ITEM', payload: { id: categoryId } });
  };

  const value: ICreateBudgetContext = {
    state,
    selectAll,
    handleQueue,
    routeToSelected,
    removeAllSelected,
    updateBudgetAmount,
    markBudgetItemAsInvalid,
  };

  //@ts-ignore
  window.state = state;

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
