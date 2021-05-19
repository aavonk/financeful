import React from 'react';
import Paper from '@Common/Paper';
import { __DEV__ } from '@Constants/environment';
import ViewError from './ViewError';

function TableError({ error }: { error: Error }) {
  return (
    <Paper minHeight="300px" flex center>
      <ViewError
        heading="Oops! There seems to be a problem"
        subheading="Try refreshing the page to see if that helps. If you think there is a problem, please contact us."
        emoji="😡"
        reload
      />

      {__DEV__ && (
        <pre>
          {error.message}
          {error.stack}
        </pre>
      )}
    </Paper>
  );
}

export default TableError;
