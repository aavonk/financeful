import React from 'react';
import styled from 'styled-components';
import Blob from './Blob';
import Logo from './Logo';
import { StyledPaper } from '@Common/Paper';

function LoginPage() {
  return (
    <Container>
      <Logo />
      <Blob />

      <Paper>Hello!</Paper>
    </Container>
  );
}

export default LoginPage;

const Paper = styled(StyledPaper)`
  width: 480px;
  padding: 32px;
  min-height: 200px;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.elevation.three};

  @media ${({ theme }) => theme.device.mobile} {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  & > svg.blob {
    position: absolute;
    top: 0;
    left: 0;
  }

  & > svg.logo {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 20;
  }
`;
