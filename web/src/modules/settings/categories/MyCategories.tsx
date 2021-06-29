import React from 'react';
import { List, ListItem } from '@Components/List';
import { useFetchCategoriesQuery } from '@Generated/graphql';
import EditCategoryController from './Forms/EditCategoryController';
import type { Category } from '@Generated/graphql';

import ListSkeleton from '@Components/List/ListSkeleton';
import ListError from '@Components/List/ListError';

function MyCategories() {
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data, loading, error } = useFetchCategoriesQuery();

  if (error) {
    return <ListError />;
  }
  if (loading) {
    return <ListSkeleton count={10} />;
  }

  return (
    <>
      <EditCategoryController
        category={selectedCategory}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <List>
        {data?.getCategories.map((category) => (
          <ListItem
            key={category.id}
            heading={category.name}
            subheading={category.description || ''}
            withButton
            buttonProps={{
              text: 'Edit',
              variant: 'dark',
              onClick: () => {
                setSelectedCategory(category);
                setIsModalOpen(true);
              },
            }}
          />
        ))}
      </List>
    </>
  );
}

export default MyCategories;
