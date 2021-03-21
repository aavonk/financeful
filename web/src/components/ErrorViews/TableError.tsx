import Paper from '@Common/Paper';
import { __DEV__ } from '@Constants/environment';
import ViewError from './ViewError';

function TableError({ error }: { error: Error }) {
  return (
    <Paper minHeight="300px" flex center>
      <ViewError heading="We ran into trouble loading transactions" reload />

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
