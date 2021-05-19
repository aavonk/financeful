import React, { useRef } from 'react';
import {
  AlertDialogLabel,
  AlertDialogDescription,
  AlertDialogContent,
} from '@reach/alert-dialog';
import { AlertOverlay, StyledActions, PrimaryMessage, SecondaryMessage } from './style';
import Button from '@Common/Button';

type ConfirmationDialogProps = {
  /** The heading text to show in the alert */
  heading: string;
  /** The secondary heading or description of the alert */
  message: string;
  /** Id to pass to the AlertDialogContent node */
  id?: string;
  /** The text content of the confirm button */
  confirmButtonText: string;
  /** Is the dialog open */
  isOpen: boolean;
  /** The action to take when the confirm button is clicked */
  onConfirmation: () => void;
  /** The action to take when the cancel button is clicked */
  onCancel: () => void;
};

function ConfirmationDialog(props: ConfirmationDialogProps) {
  const {
    id,
    heading,
    message,
    confirmButtonText,
    onCancel,
    onConfirmation,
    isOpen,
  } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertOverlay id={id} isOpen={isOpen} leastDestructiveRef={cancelRef}>
      <AlertDialogContent>
        <AlertDialogLabel>
          <PrimaryMessage>
            <h1>{heading}</h1>
          </PrimaryMessage>
        </AlertDialogLabel>
        <AlertDialogDescription>
          <SecondaryMessage>
            <p>{message}</p>
          </SecondaryMessage>
        </AlertDialogDescription>
        <StyledActions>
          <Button
            variant="dark"
            ref={cancelRef}
            onClick={onCancel}
            data-testid="confirmation-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirmation}
            data-testid="confirmation-danger"
          >
            {confirmButtonText}
          </Button>
        </StyledActions>
      </AlertDialogContent>
    </AlertOverlay>
  );
}

export default ConfirmationDialog;
