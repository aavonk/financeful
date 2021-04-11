import Button from '@Common/Button';
import Paper from '@Common/Paper';
import { Topbar, Title, Container } from './style';
function AccountList() {
  return (
    <Paper>
      <Container>
        <Topbar>
          <Title>All accounts</Title>
          <Button variant="primary" onClick={() => alert('todo')}>
            Add account
          </Button>
        </Topbar>
      </Container>
    </Paper>
  );
}

export default AccountList;
