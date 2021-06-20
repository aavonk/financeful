import React from 'react';
import { ViewError } from '@Components/ErrorViews';
import { List } from '@Components/List';

type Props = {
  message?: string;
};
function ListError({ message = 'Uh oh. We ran into a problem' }: Props) {
  return (
    <List>
      <div style={{ padding: '20px 0', width: '100%' }}>
        <ViewError heading={message} />
      </div>
    </List>
  );
}

export default ListError;
