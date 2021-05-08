import styled from 'styled-components';
import { DialogOverlay, DialogContent } from '@reach/dialog';

export const Overlay = styled(DialogOverlay)`
  background: rgba(91, 112, 131, 0.35);
  z-index: 1200;
  > [data-reach-dialog-content] {
    margin: 5vh auto;
  }

  @media (max-width: 705px) {
    > [data-reach-dialog-content] {
      margin: 0;
    }
  }
`;

export const Content = styled(DialogContent)`
  background: ${({ theme }) => theme.colors.darkTwo};
  border-radius: 1rem;
  max-height: 90vh;
  min-width: 600px;
  max-width: 600px;
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

  @media ${({ theme }) => theme.device.desktop} {
    height: 650px;
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
  background-color: ${({ theme }) => theme.colors.darkTwo};
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
  padding: 0.825rem 1rem 3rem 0.825rem;
  /* overflow-y: auto;
  max-height: 80vh; */
`;

export const Footer = styled.div`
  height: 53px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  z-index: 2;
  position: sticky;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  border-top: 1px solid ${({ theme }) => theme.colors.darkThree};
  padding: 0 1rem;
`;
