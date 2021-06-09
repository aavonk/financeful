import React from 'react';
import { StyledContainer } from './style';

type Props = {
  children: React.ReactNode;
};

function PageContainer({ children }: Props) {
  return <StyledContainer>{children}</StyledContainer>;
}

export default PageContainer;
