import React from 'react';
import { List, ListItem } from '@Components/List';

type Props = {
  count: number;
};

function ListSkeleton({ count }: Props) {
  const arr = new Array(count).fill(null).map((i: any, index) => index);
  return (
    <List>
      {arr.map((item) => (
        <ListItem asLoader heading="" key={item} />
      ))}
    </List>
  );
}

export default ListSkeleton;
