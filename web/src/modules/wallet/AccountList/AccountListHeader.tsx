import { useState } from 'react';
import Button from '@Common/Button';
import { HeaderContainer, Title } from './style';
import { ModalRoot, ModalActions, ModalBody, ModalTitle } from '@Components/Modal';
function AccountListHeader() {
  const [displayModal, setDisplayModal] = useState(false);
  const close = () => setDisplayModal(false);
  return (
    <HeaderContainer>
      <Title>
        <h3>All Accounts</h3>
        <p>Add, edit, or delete your accounts</p>
      </Title>
      <Button variant="primary" onClick={() => setDisplayModal(true)}>
        Add account
      </Button>
      <ModalRoot isOpen={displayModal} onDismiss={close}>
        <ModalTitle title="Testing 123" onClose={close} />
        <ModalBody>
          <div>This is the form yay</div>
        </ModalBody>
        <ModalActions>
          <Button variant="primary">Save</Button>
        </ModalActions>
      </ModalRoot>
    </HeaderContainer>
  );
}

export default AccountListHeader;
