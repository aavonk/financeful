import React from 'react';
import { List, ListItem } from '@Components/List';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import { SectionTitle } from '@Components/Layout/styles';
import { Outline } from './style';

function SelectedCategoryList() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  return (
    <>
      <SectionTitle variant={2}>Selected Categories</SectionTitle>
      <Outline>
        {selected.length > 0 ? (
          <List>
            {selected.map((item) => (
              <ListItem
                key={item.id}
                heading={item.name}
                subheading={item.description || ''}
              />
            ))}
          </List>
        ) : null}
      </Outline>
    </>
  );
}

export default SelectedCategoryList;
