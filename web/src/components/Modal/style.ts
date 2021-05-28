import styled from 'styled-components';
import { DialogOverlay, DialogContent } from '@reach/dialog';

export const Overlay = styled(DialogOverlay)`
  background: rgba(0, 0, 0, 0.67);
  z-index: 1200;
  > [data-reach-dialog-content] {
    margin: 0;
  }

  @media (max-width: 705px) {
    > [data-reach-dialog-content] {
      margin: 0;
    }
  }
`;

export const Content = styled(DialogContent)`
  background: #21222d;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  width: 33%;
  max-width: 450px;
  padding: 0;
  overflow-y: auto;

  @media (max-width: 705px) {
    width: 100vw;
    max-width: 100vw;
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
    min-width: 0;
  }
`;

export const Header = styled.div`
  height: 53px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 2;
  position: sticky;
  top: 0;
  padding: 0 0.825rem;
  background-color: ${({ theme }) => theme.colors.cardLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkThree};
  & > button {
    margin-left: 1rem;
  }
`;

export const HeaderLeft = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const HeaderRight = styled.div`
  flex: 0 0 auto;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  line-height: 24px;
  font-weight: 700;
  margin-left: 1.25rem;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 90%;
  padding: 0.825rem 1rem 3rem 0.825rem;
  background-color: ${({ theme }) => theme.colors.cardDark};
`;

type FooterProps = {
  justify?: 'space-between' | 'space-evenly' | 'flex-start' | 'flex-end';
};

export const Footer = styled.div<FooterProps>`
  height: 53px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justify }) => justify || 'flex-end'};
  width: 100%;
  z-index: 2;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.825rem;
  background-color: ${({ theme }) => theme.colors.cardLight};
  border-top: 1px solid ${({ theme }) => theme.colors.darkThree};
`;
