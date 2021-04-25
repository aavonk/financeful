import styled from 'styled-components';

type Props = {
  containerHeight?: string;
  heading: string;
  subheading: string;
};

type ContainerProps = {
  $height?: string;
};

const Container = styled.div<ContainerProps>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;

  & > :first-child {
    font-size: 1.25rem;
    margin-bottom: 12px;
    font-weight: 600;
  }

  & > :last-child {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

function GeneralEmptyView({ containerHeight, heading, subheading }: Props) {
  return (
    <Container $height={containerHeight}>
      <p>{heading}</p>
      <p>{subheading}</p>
    </Container>
  );
}

export default GeneralEmptyView;
