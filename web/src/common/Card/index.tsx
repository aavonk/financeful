import * as React from 'react';
import { StyledCard, StyledCardBody } from './style';

type Children = {
  children: React.ReactNode;
  minHeight?: string;
  minWidth?: string;
};
export function Card({ children, minHeight, minWidth }: Children) {
  return (
    <StyledCard minHeight={minHeight} minWidth={minWidth}>
      {children}
    </StyledCard>
  );
}

export function CardBody({ children }: Children) {
  return <StyledCardBody>{children}</StyledCardBody>;
}
