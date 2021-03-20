import Paper from '@Common/Paper';
import { Emoji, Heading, Description } from './style';
import Button from '@Common/Button';

function TableError() {
  return (
    <Paper minHeight="300px" flex center>
      <Emoji role="img" aria-label="Oops">
        😤
      </Emoji>
      <Heading>We ran into trouble loading transactions</Heading>
      <Description>
        You may not have internet connection, or Financeful is just having a
        hiccup. If you think something has gone wrong, please contact us.
      </Description>
      <Button
        variant="primary"
        margin="8px 0 0 0 "
        onClick={() => window.location.reload()}
      >
        Try again
      </Button>
    </Paper>
  );
}

export default TableError;
