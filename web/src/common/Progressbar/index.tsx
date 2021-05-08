import styled, { keyframes } from 'styled-components';

export const StyledBar = styled.div`
  position: relative;
  height: 3px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.paper};
`;

const progressKeyframes1 = keyframes`
0% {
    left: -35%;
    right: 100%;
  }
60% {
    left: 100%;
    right: -90%;
  }
100% {
    left: 100%;
    right: -90%;
  }
`;

const progressKeyframes2 = keyframes`
0% {
    left: -200%;
    right: 100%;
  }
60% {
    left: 107%;
    right: -8%;
  }
100% {
    left: 107%;
    right: -8%;
  }
`;

export const BarOne = styled.div`
  width: auto;
  animation: ${progressKeyframes1} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  background-color: ${({ theme }) => theme.colors.primary};
  top: 0;
  left: 0;
  bottom: 0;
  position: absolute;
  transition: transform 0.2s linear;
  transform-origin: left;
`;

export const BarTwo = styled.div`
  width: auto;
  animation: ${progressKeyframes2} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
  background-color: ${({ theme }) => theme.colors.primary};
  top: 0;
  left: 0;
  bottom: 0;
  position: absolute;
  transition: transform 0.2s linear;
  transform-origin: left;
`;

function Progressbar() {
  return (
    <StyledBar>
      <BarOne />
      <BarTwo />
    </StyledBar>
  );
}

export default Progressbar;
