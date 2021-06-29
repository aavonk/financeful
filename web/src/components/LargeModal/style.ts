import styled from 'styled-components';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import type { DialogOverlayProps, DialogContentProps } from '@reach/dialog';

export const Overlay = styled(DialogOverlay)<DialogOverlayProps>`
  background: rgba(0, 0, 0, 0.67);
  z-index: 1200;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > [data-reach-dialog-content] {
    margin: 0;
  }
`;

export const Content = styled(DialogContent)<DialogContentProps>`
  background: ${({ theme }) => theme.colors.darkTwo};
  height: 80vh;
  width: 75vw;
  max-width: 1000px;
  padding: 0;
  overflow-y: auto;
  border-radius: 8px;

  @media ${({ theme }) => theme.device.tabletAndDown} {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    border-radius: 0;
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.825rem 1rem 3rem 0.825rem;
`;
