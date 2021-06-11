import React from 'react';
import { ViewError } from '@Components/ErrorViews';
import { List } from '@Components/List';

function MyCategoriesError() {
  return (
    <List>
      <div style={{ padding: '20px 0', width: '100%' }}>
        <ViewError heading="Uh oh. We ran into an error" />
      </div>
    </List>
  );
}

export default MyCategoriesError;
