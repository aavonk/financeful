import { useState } from 'react';
import { ModalRoot, ModalActions, ModalBody, ModalTitle } from '@Components/Modal';
import Button from '@Common/Button';

function AddAccountFormController() {
  const [displayModal, setDisplayModal] = useState(false);
  const close = () => setDisplayModal(false);
  return (
    <>
      <Button variant="primary" onClick={() => setDisplayModal(true)}>
        Add account
      </Button>
      <ModalRoot isOpen={displayModal} onDismiss={close} ariaLabel="Add an account">
        <ModalTitle title="Testing 123" onClose={close} />
        <ModalBody>
          <div>This is the form yay</div>
        </ModalBody>
        <ModalActions>
          <Button variant="primary">Save</Button>
        </ModalActions>
      </ModalRoot>
    </>
  );
}

export default AddAccountFormController;
