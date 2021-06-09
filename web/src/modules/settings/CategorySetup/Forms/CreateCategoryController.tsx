import React from 'react';
import styled from 'styled-components';
import { ModalRoot, ModalTitle, ModalBody } from '@Components/Modal';
import Button from '@Common/Button';
import CreateCategoryForm from './CreateCategoryForm';
import type { CategoryCreateInput } from '@Generated/graphql';
import { useCreateCategory } from '../../mutations/useCreateCategory';
import { useAlert } from '@Context/alert/alertContext';

function CreateCategoryController() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutate: createCategory } = useCreateCategory();
  const { showAlert } = useAlert();

  const close = () => setIsOpen(false);
  const initialFocusRef = React.useRef<HTMLInputElement | null>(null);

  const onCategorySubmit = async (values: CategoryCreateInput) => {

    try{
      const response = await createCategory({ variables: { input: values } });

      const category = response.data?.createCategory.category;
      const createError = response.data?.createCategory.error;
  
      if (createError) {
        showAlert(createError.message, 'error', 5000);
      }
  
      if (response.errors) {
        showAlert('We ran into a problem. Try again?', 'error');
      }
  
      if (category) {
        close();
        showAlert(`Successfully added ${category.name}`, 'info');
      }
    } catch (err) {
      showAlert('We ran into a problem. Try again?', 'error');
    }
   
  };

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
          <CreateCategoryForm
            initialFocusRef={initialFocusRef}
            onFormSubmit={onCategorySubmit}
          />
        </ModalBody>
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
