import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@Hooks/useQuery';
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

function PageTitle({ location }: { location: string }) {
  const query = useQuery();
  const renderTitle = (path: string) => {
    switch (path) {
      case 'dashboard':
        return 'Dashboard';
      case 'transactions':
        return 'Transactions';
      case 'calendar':
        return 'Calendar';
      case 'bills':
        return 'Bills';
      case 'settings':
        return 'Settings';
      case 'my-wallet':
        return 'My Wallet';
      case 'account':
        return query.get('name');
      default:
        return 'Financeful';
    }
  };
  return (
    <TitleRow>
      <Title>
        <h1>{renderTitle(location)}</h1>
      </Title>
    </TitleRow>
  );
}

export default PageTitle;
