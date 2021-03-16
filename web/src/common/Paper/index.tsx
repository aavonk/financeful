import * as React from 'react';
import styled from 'styled-components';

const StyledPaper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 20px;
`;

function Paper({ children }: { children: React.ReactNode }) {
  return <StyledPaper>{children}</StyledPaper>;
}

export default Paper;
