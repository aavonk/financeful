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
    case 'ADD_TO_SELECTED':
      return {
        ...state,
        selected: [...state.selected, ...state.queue],
        queue: [],
      };
  }
}
