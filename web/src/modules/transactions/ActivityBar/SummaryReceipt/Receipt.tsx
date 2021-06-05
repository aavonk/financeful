import React from 'react';
import Paper from '@Common/Paper';
import { getCurrentMonthName } from '@Lib/date-formatting';
import { Container, Header, Section } from './style';

function Receipt() {
  return (
    <Paper maxWidth="275px">
      <Container>
        <Header>
          <h3>{getCurrentMonthName()} Summary</h3>
        </Header>
        <Section>
          <h4>Income</h4>
        </Section>
        <Section>
          <h4>Expenses</h4>
        </Section>
      </Container>
    </Paper>
  );
}

export default Receipt;
