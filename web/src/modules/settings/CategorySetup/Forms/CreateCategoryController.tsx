import React from 'react';
import styled from 'styled-components';
import { ModalRoot, ModalTitle, ModalActions, ModalBody } from '@Components/Modal';
import Button from '@Common/Button';
import CreateCategoryForm from './CreateCategoryForm';

function CreateCategoryController() {
  const [isOpen, setIsOpen] = React.useState(false);

  const close = () => setIsOpen(false);
  const initialFocusRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <Container>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Create category
      </Button>
      <ModalRoot
        ariaLabel="Create Category Form"
        isOpen={isOpen}
        onDismiss={close}
        initialFocusRef={initialFocusRef}
      >
        <ModalTitle title="Create a category" onClose={close} />
        <ModalBody overrideStyle={{ justifyContent: 'flex-start' }}>
          <CreateCategoryForm initialFocusRef={initialFocusRef} />
        </ModalBody>
        <ModalActions>
          <Button variant="primary" onClick={() => alert('save')}>
            Save
          </Button>
        </ModalActions>
      </ModalRoot>
    </Container>
  );
}

export default CreateCategoryController;

const Container = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
