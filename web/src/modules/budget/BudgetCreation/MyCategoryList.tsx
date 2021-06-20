import React from 'react';
import { List, ListItem } from '@Components/List';
import ListError from '@Components/List/ListError';
import ListSkeleton from '@Components/List/ListSkeleton';

import { useFetchCategoriesQuery } from '@Generated/graphql';

function MyCategoryList() {
  const { data, loading, error } = useFetchCategoriesQuery();

  if (loading) {
    return <ListSkeleton count={15} />;
  }

  if (error) {
    return <ListError />;
  }

  //TODO: Add categories to useState -- When a category is selected, remove it from the list and add
  // to the selected Categories list in the next column.

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
                onChange: (e) => {
                  console.log(e.target.checked);
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
