import * as React from 'react';
import { BadgeWrapper, StyledBadge } from './style';

interface BadgeProps {
  badgeContent: string | number;
  children: React.ReactNode;
}

function Badge({ badgeContent, children }: BadgeProps) {
  return (
    <BadgeWrapper>
      {children}
      <StyledBadge>{badgeContent}</StyledBadge>
    </BadgeWrapper>
  );
}

export default Badge;
