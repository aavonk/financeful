import React from 'react';
import Paper from '@Common/Paper';
import Skeleton from '@Common/Skeleton';
import { AccountItemBox, ItemName, Container } from './style';

function AccountListLoader() {
  const rows = new Array(8).fill(undefined).map((val, idx) => idx);
  const cols = new Array(4).fill(undefined).map((val, idx) => idx);
  return (
    <Paper>
      <Container aria-disabled="true" aria-label="Loading">
        {rows.map((row, index) => (
          <AccountItemBox key={index}>
            {cols.map((col, index) => (
              <ItemName key={index}>
                <Skeleton height="12px" width="25%" />
                <div style={{ marginTop: '10px' }} />
                <Skeleton height="20px" width="100%" />
              </ItemName>
            ))}
          </AccountItemBox>
        ))}
      </Container>
    </Paper>
  );
}

export default AccountListLoader;
