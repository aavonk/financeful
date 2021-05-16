import React from 'react';
import { PillContainer, PillRight, PillLeft } from './style';

function InsightPill() {
  return (
    <PillContainer>
      <PillLeft>
        <span />
      </PillLeft>
      <PillRight>
        <h4>$4,345.12</h4>
        <p>Income</p>
      </PillRight>
    </PillContainer>
  );
}

export default InsightPill;
