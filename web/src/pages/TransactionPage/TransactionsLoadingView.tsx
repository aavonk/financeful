import React from 'react';
import { TableSkeleton } from '@Modules/transactions/Table';
import { ContentContainer, Left, Right } from '@Components/Layout/styles';
import { ActivityContainer } from '@Modules/transactions/ActivityBar';

function TransactionsLoadingView() {
  return (
    <ContentContainer>
      <Left>
        <TableSkeleton columns={6} rows={25} />
      </Left>
      <Right>
        <ActivityContainer disableSearch disableButton />
      </Right>
    </ContentContainer>
  );
}

export default TransactionsLoadingView;
