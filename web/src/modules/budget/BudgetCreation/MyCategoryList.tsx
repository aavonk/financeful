import React from 'react';
import { List, ListItem } from '@Components/List';
import ListError from '@Components/List/ListError';
import ListSkeleton from '@Components/List/ListSkeleton';

import { useFetchCategoriesQuery } from '@Generated/graphql';
import { useBudgetFlowContext } from '@Modules/budget/BudgetCreation/BudgetFlowProvider';

function MyCategoryList() {
  const { data, loading, error } = useFetchCategoriesQuery();
  const { prepareForSelection } = useBudgetFlowContext();

  if (loading) {
    return <ListSkeleton count={15} />;
  }

  if (error) {
    return <ListError />;
  }

  return (
    <>
      {data?.getCategories ? (
        <List>
          {data.getCategories.map((category) => (
            <ListItem
              key={category.id}
              heading={category.name}
              subheading={category.description || ''}
              withCheckbox
              checkboxProps={{
                onChange: () => {
                  prepareForSelection(category);
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
