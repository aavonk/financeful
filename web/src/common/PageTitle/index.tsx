import styled from 'styled-components';

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 100%;
`;

const Title = styled.div`
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex: 0 0 auto;
  margin-left: 18px;

  & > h1 {
    font-weight: 700;
    font-size: 24px !important;
  }
`;

const renderTitle = (path: string) => {
  switch (path) {
    case '/dashboard':
      return 'Dashboard';
    case '/transactions':
      return 'Transactions';
    case '/calendar':
      return 'Calendar';
    case '/bills':
      return 'Bills';
    case '/settings':
      return 'Settings';
    default:
      return 'Financeful';
  }
};

function PageTitle({ location }: { location: string }) {
  return (
    <TitleRow>
      <Title>
        <h1>{renderTitle(location)}</h1>
      </Title>
    </TitleRow>
  );
}

export default PageTitle;
