import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogLabel,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogProps,
} from '@reach/alert-dialog';

import { AlertOverlay, StyledActions } from './style';
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
};

function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { id, heading, message, confirmButtonText } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertOverlay id={id} isOpen={true} leastDestructiveRef={cancelRef}>
      <AlertDialogContent>
        <AlertDialogLabel>{heading}</AlertDialogLabel>
        <AlertDialogDescription>{message}</AlertDialogDescription>
        <StyledActions>
          <Button variant="dark" ref={cancelRef}>
            Cancel
          </Button>
          <Button variant="danger">{confirmButtonText}</Button>
        </StyledActions>
      </AlertDialogContent>
    </AlertOverlay>
  );
}

export default ConfirmationDialog;
