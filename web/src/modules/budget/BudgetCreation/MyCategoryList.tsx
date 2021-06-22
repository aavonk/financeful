import React from 'react';
import { List, ListItem } from '@Components/List';
import ListError from '@Components/List/ListError';
import ListSkeleton from '@Components/List/ListSkeleton';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';

function MyCategoryList() {
  const {
    handleQueue,
    state: { categories, loading, error },
  } = useCreateBudgetContext();

  if (loading) {
    return <ListSkeleton count={15} />;
  }

  if (error) {
    return <ListError />;
  }

  return (
    <>
      {categories ? (
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              heading={category.name}
              subheading={category.description || ''}
              withCheckbox
              checkboxProps={{
                onChange: (e) => {
                  handleQueue(category, e.target.checked);
                },
              }}
            />
          ))}
        </List>
      ) : null}
    </>
  );
}

export default MyCategoryList;
