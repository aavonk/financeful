import styled from 'styled-components';
import { AlertDialogProps, AlertDialogOverlay } from '@reach/alert-dialog';

export const AlertOverlay = styled(AlertDialogOverlay)<AlertDialogProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(91, 112, 131, 0.35);
  z-index: 1200;

  & > [data-reach-dialog-content] {
    background: ${({ theme }) => theme.colors.darkOne};
    max-width: 80vw;
    width: 320px;
    padding: 32px 20px;
    border-radius: 16px;
    margin: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const StyledActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 100%;
  margin-top: 20px;

  & button:first-of-type {
    margin-right: 20px;
  }
`;

export const PrimaryMessage = styled.div`
  display: flex;
  flex: 0 0 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  & > h1 {
    font-size: 1.625rem;
    font-weight: 700;
  }
`;

export const SecondaryMessage = styled.div`
  display: flex;
  flex: 0 0 100%;
  align-items: center;
  justify-content: center;

  & > p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;
  }
`;
