import { FallbackProps } from 'react-error-boundary';
import Button from '@Common/Button';
import { Emoji, Heading, Description, Container } from './style';

interface Props {
  heading?: string;
  subheading?: string;
  reload?: boolean;
  emoji?: string;
  whiteText?: boolean;
  reloadFunction?: () => void;
}
function ViewError(props: Props) {
  const {
    heading = 'Something went wrong',
    subheading = ' You may not have internet connection, or Financeful is just having a hiccup. If you think something has gone wrong, please contact us.',
    emoji = '😤',
    reload,
    reloadFunction,
    whiteText,
  } = props;
  return (
    <Container>
      <Emoji role="img" aria-label="Oops">
        {emoji}
      </Emoji>
      <Heading>{heading}</Heading>
      <Description whiteText={whiteText}>{subheading}</Description>
      {reloadFunction ? (
        <Button variant="primary" margin="8px 0 0 0 " onClick={reloadFunction}>
          Try again
        </Button>
      ) : null}
      {reload ? (
        <Button
          variant="primary"
          margin="8px 0 0 0 "
          onClick={() => window.location.reload()}
        >
          Try again
        </Button>
      ) : null}
    </Container>
  );
}

export default ViewError;
