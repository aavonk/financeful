import React from 'react';
import { List, ListItem } from '@Components/List';

function MyCategoriesSkeleton() {
  const arr = new Array(10).fill(null).map((i: any, index) => index);
  console.log(arr);
  return (
    <List>
      {arr.map((item) => (
        <ListItem asLoader heading="" key={item} />
      ))}
    </List>
  );
}

export default MyCategoriesSkeleton;
