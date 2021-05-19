import React from 'react';
import { PillContainer, PillRight, PillLeft } from '../style';
import { theme } from '@Constants/theme';
import Skeleton from '@Common/Skeleton';
import { useMediaQuery } from '@Hooks/useMediaQuery';
function InsightPillSkeleton() {
  const small = useMediaQuery('(max-width: 500px)');
  return (
    <PillContainer>
      <PillLeft $color={theme.colors.darkThree}>
        <span />
      </PillLeft>
      <PillRight style={small ? { minWidth: '80px' } : { minWidth: '110px' }}>
        <h4>
          <Skeleton width="100%" height={small ? '16px' : '24px'} />
        </h4>
        <p style={{ paddingTop: '8px' }}>
          <Skeleton width="80%" height={small ? '10px' : '14px'} />
        </p>
      </PillRight>
    </PillContainer>
  );
}

export default InsightPillSkeleton;
