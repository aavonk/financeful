import React from 'react';
import { List, ListItem } from '@Components/List';
import { useFetchCategoriesQuery } from '@Generated/graphql';

function MyCategories() {
  const { data, loading, error } = useFetchCategoriesQuery();

  if (error) {
    console.log(error);
    return <div>Error!</div>;
  }

  if (loading) {
    return <div>loading!</div>;
  }

  return (
    <List maxWidth="380px">
      {data?.getCategories.map((category) => (
        <ListItem
          key={category.id}
          heading={category.name}
          subheading="An optional description of the category which might be reall "
          withButton
          buttonProps={{
            text: 'Edit',
            onClick: () => {
              alert(JSON.stringify(category, null, 2));
            },
          }}
        />
      ))}
    </List>
  );
}

export default MyCategories;
