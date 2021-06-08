import React from 'react';
import { List, ListItem } from '@Components/List';
import { useFetchCategoriesQuery } from '@Generated/graphql';
import EditCategoryController from './Forms/EditCategoryController';
import type { Category } from '@Generated/graphql';

function MyCategories() {
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data, loading, error } = useFetchCategoriesQuery();

  if (error) {
    console.log(error);
    return <div>Error!</div>;
  }

  if (loading) {
    return <div>loading!</div>;
  }

  return (
    <>
      <EditCategoryController
        category={selectedCategory}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <List maxWidth="380px">
        {data?.getCategories.map((category) => (
          <ListItem
            key={category.id}
            heading={category.name}
            subheading={category.description || ''}
            withButton
            buttonProps={{
              text: 'Edit',
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
