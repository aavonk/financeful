import type { State, Action } from './createBudgetContext';

export function createBudgetReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_ERROR':
      return {
        ...state,
        error: true,
        loading: false,
        categories: undefined,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        categories: action.payload,
      };
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    case 'REMOVE_FROM_QUEUE':
      return {
        ...state,
        queue: state.queue.filter((item) => item.id !== action.payload),
      };
    case 'ADD_TO_SELECTED':
      const filteredCategories = state.categories!.filter(
        (i) => !state.queue.some((j) => j.id === i.id),
      );
      return {
        ...state,
        queue: [],
        categories: [...filteredCategories],
        selected: [...state.selected, ...state.queue],
      };
    case 'SELECT_ALL_CATEGORIES':
      return {
        ...state,
        selected: [...state.selected, ...state.categories!],
        categories: [],
        queue: [],
      };
    case 'REMOVE_ALL_SELECTED':
      const cats = state.categories ? [...state.categories] : [];
      // move the items in the selected queue back to the original
      // "my categories" queue.
      return {
        ...state,
        categories: [...state.selected, ...cats],
        selected: [],
      };
  }
}
