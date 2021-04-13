import { useState } from 'react';
import { ModalRoot, ModalActions, ModalBody, ModalTitle } from '@Components/Modal';
import Button from '@Common/Button';
import AddAccountForm from './AddAccountForm';

function AddAccountFormController() {
  const [displayModal, setDisplayModal] = useState(false);
  const close = () => setDisplayModal(false);

  const onFormSubmit = () => {
    console.log('submit');
  };
  return (
    <>
      <Button variant="primary" onClick={() => setDisplayModal(true)}>
        Add account
      </Button>
      <ModalRoot isOpen={displayModal} onDismiss={close} ariaLabel="Add an account">
        <ModalTitle title="Add account" onClose={close} />
        <ModalBody>
          <AddAccountForm onFormSubmit={onFormSubmit} />
        </ModalBody>
        <ModalActions>
          <Button variant="primary">Save</Button>
        </ModalActions>
      </ModalRoot>
    </>
  );
}

export default AddAccountFormController;
