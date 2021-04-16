import { ViewError } from '@Components/ErrorViews/';
import Paper from '@Common/Paper';
function AccountListError() {
  return (
    <Paper>
      <div style={{ marginTop: '20px', padding: '40px' }}>
        <ViewError heading="We ran into trouble loading your accounts" />
      </div>
    </Paper>
  );
}

export default AccountListError;
