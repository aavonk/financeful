import * as React from 'react';
import { SidebarContext, State, Action } from './sidebarContext';

function sidebarReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        isOpen: true,
      };
    case 'CLOSE':
      return {
        ...state,
        isOpen: false,
      };
    case 'TOGGLE':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
  }
}

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const initialState = {
    isOpen: true,
  };
  const [state, dispatch] = React.useReducer(sidebarReducer, initialState);

  const value = { state, dispatch };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export default SidebarProvider;
