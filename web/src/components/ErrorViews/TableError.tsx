import Paper from '@Common/Paper';
import { FallbackProps } from 'react-error-boundary';
import { __DEV__ } from '@Constants/environment';
import ViewError from './ViewError';

function TableError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Paper minHeight="300px" flex center>
      <ViewError
        heading="We ran into trouble loading transactions"
        reloadFunction={resetErrorBoundary}
      />

      {__DEV__ && (
        <pre>
          error.message
          {error.stack}
        </pre>
      )}
    </Paper>
  );
}

export default TableError;
