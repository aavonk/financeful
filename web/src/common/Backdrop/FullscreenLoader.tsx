import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Brand = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;

const Line = styled.div`
  min-height: 4px;
  width: 75%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 9px;
`;

const pulse = keyframes`
  0% {
		transform: scale(0.85);
	}
	
	70% {
		transform: scale(1);
	}
	
	100% {
		transform: scale(0.85);
	}
`;

const Container = styled.div`
  animation: ${pulse} 2s infinite;
  /* background: white; */
  /* box-shadow: 0 0 0 0 rgba(255, 255, 255, 1); */
`;

function FullscreenLoader() {
  return (
    <Backdrop>
      <Container>
        <Brand>financeful</Brand>
        <Line />
      </Container>
    </Backdrop>
  );
}

export default FullscreenLoader;
