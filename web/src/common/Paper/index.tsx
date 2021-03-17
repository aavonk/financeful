import * as React from 'react';
import styled from 'styled-components';

const StyledPaper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 9px;
  overflow-x: auto;
  ::-webkit-scrollbar {
    width: 14px;
    height: 16px;
  }

  ::-webkit-scrollbar-thumb {
    height: 4px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    background-color: rgba(255, 255, 255, 0.2);
    -webkit-border-radius: 16px;
    -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
      inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }

  ::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

function Paper({ children }: { children: React.ReactNode }) {
  return <StyledPaper>{children}</StyledPaper>;
}

export default Paper;
