import React from 'react';
import { List, ListItem } from '@Components/List';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';

function SelectedCategories() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  return (
    <List>
      {selected.map((item) => (
        <ListItem key={item.id} heading={item.name} subheading={item.description || ''} />
      ))}
    </List>
  );
}

export default SelectedCategories;
