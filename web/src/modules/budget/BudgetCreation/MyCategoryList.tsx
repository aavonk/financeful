import React from 'react';
import { List, ListItem } from '@Components/List';
import ListError from '@Components/List/ListError';
import ListSkeleton from '@Components/List/ListSkeleton';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import { SectionTitle } from '@Components/Layout/styles';
import { Outline } from './style';

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
      <SectionTitle variant={2}>Available Categories</SectionTitle>
      <Outline>
        {categories && categories?.length > 0 ? (
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
      </Outline>
    </>
  );
}

export default MyCategoryList;
