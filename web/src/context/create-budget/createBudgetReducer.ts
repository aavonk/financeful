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
        categories: state.categories?.map((item) =>
          item.id === action.payload.id ? { ...item, isChecked: true } : item,
        ),
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
  }
}
