import React from 'react';
import { PillContainer, PillRight, PillLeft } from '../style';
import { theme } from '@Constants/theme';
import Skeleton from '@Common/Skeleton';

function InsightPillSkeleton() {
  return (
    <PillContainer>
      <PillLeft $color={theme.colors.darkThree}>
        <span />
      </PillLeft>
      <PillRight style={{ minWidth: '110px' }}>
        <h4>
          <Skeleton width="100%" height="24px" />
        </h4>
        <p style={{ paddingTop: '8px' }}>
          <Skeleton width="80%" height="14px" />
        </p>
      </PillRight>
    </PillContainer>
  );
}

export default InsightPillSkeleton;
