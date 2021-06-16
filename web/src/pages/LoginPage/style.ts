import styled from 'styled-components';
import { StyledPaper } from '@Common/Paper';

export const Header = styled.h1`
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 24px;
  /* line-height: 30px */
  font-weight: 600;
`;

export const Paper = styled(StyledPaper)`
  width: 480px;
  min-height: 200px;
  z-index: 20;
  box-shadow: ${({ theme }) => theme.elevation.three};

  @media ${({ theme }) => theme.device.mobile} {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;

export const Form = styled.form`
  padding: 32px;
  width: 100%;
`;

export const Container = styled.div`
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
    top: 20px;
    left: 20px;
    z-index: 10;
  }
`;
