import { ViewError } from '@Components/ErrorViews';
import Paper from '@Common/Paper';
import { Container } from './style';
type Props = {
  onRetry: () => void;
};
function ErrorView({ onRetry }: Props) {
  return (
    <Paper>
      <Container>
        <ViewError
          heading="Well that's not good..."
          subheading="We ran into trouble fetching data from our server. You might not have internet connection issues, or we're experienceing a hiccup "
          reloadFunction={onRetry}
        />
      </Container>
    </Paper>
  );
}

export default ErrorView;
