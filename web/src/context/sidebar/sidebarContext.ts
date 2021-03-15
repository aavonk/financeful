import * as React from 'react';

export type State = {
  isOpen: boolean;
};

export type Action = { type: 'OPEN' } | { type: 'CLOSE' } | { type: 'TOGGLE' };

export type Dispatch = (action: Action) => void;

export const SidebarContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
