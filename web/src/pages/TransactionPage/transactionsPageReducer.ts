import type { Transaction } from '@Generated/graphql';

export type State = {
  selectedTransaction: Transaction | null;
  isEditModalOpen: boolean;
  isSubrouteShown: boolean;
  data: Transaction[] | undefined;
  isDefaultViewLoading: boolean;
};

export type Action =
  | { type: 'SET_TRANSACTION'; payload: Transaction }
  | { type: 'TOGGLE_MODAL'; payload: boolean }
  | { type: 'SUBROUTE_SHOWN'; payload: boolean }
  | { type: 'SET_DATA'; payload: Transaction[] | undefined }
  | { type: 'SET_IS_DEFAULT_VIEW_LOADING'; payload: boolean };

export function transactionsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_TRANSACTION':
      return {
        ...state,
        selectedTransaction: action.payload,
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isEditModalOpen: action.payload,
      };
    case 'SUBROUTE_SHOWN':
      return {
        ...state,
        isSubrouteShown: action.payload,
      };
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload,
      };
    case 'SET_IS_DEFAULT_VIEW_LOADING':
      return {
        ...state,
        isDefaultViewLoading: action.payload,
      };
    default:
      return state;
  }
}
