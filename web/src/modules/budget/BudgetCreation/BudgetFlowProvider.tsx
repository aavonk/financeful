import React from 'react';
import type { Category } from '@Generated/graphql';

type IBudgetFlowContext = {
  selected: Category[];
  moveToSelected: () => void;
  prepareForSelection: (category: Category) => void;
};

const BudgetFlowContext = React.createContext<IBudgetFlowContext | undefined>(undefined);

export function useBudgetFlowContext() {
  const context = React.useContext(BudgetFlowContext);

  if (!context) {
    throw new Error(
      'useBudgetFlowContext must be used within a BudgetFlowContext Provider',
    );
  }

  return context;
}

export function BudgetFlowProvider({ children }: { children: React.ReactNode }) {
  const [categoriesToMove, setCategoriesToMove] = React.useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<Category[]>([]);

  const moveToSelected = () => {
    setSelectedCategories([...selectedCategories, ...categoriesToMove]);
  };

  const prepareForSelection = (category: Category) => {
    setCategoriesToMove([...categoriesToMove, category]);
  };

  const value = { moveToSelected, selected: selectedCategories, prepareForSelection };

  return (
    <BudgetFlowContext.Provider value={value}>{children}</BudgetFlowContext.Provider>
  );
}
