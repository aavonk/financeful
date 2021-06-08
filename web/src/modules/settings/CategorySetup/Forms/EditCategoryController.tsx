import React from 'react';
import EditCategoryForm from './EditCategoryForm';
import { ModalRoot, ModalTitle, ModalBody } from '@Components/Modal';
import type { Category, CategoryCreateInput } from '@Generated/graphql';

type Props = {
  category: Category | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditCategoryController({ category, isOpen, setIsOpen }: Props) {
  const initialFocusRef = React.useRef<HTMLInputElement | null>(null);
  const close = () => setIsOpen(false);

  const onEditSubmit = (values: CategoryCreateInput) => {
    console.log(values);
  };

  if (!category) {
    return null;
  }

  return (
    <>
      <ModalRoot
        ariaLabel="Edit Category Form"
        isOpen={isOpen}
        onDismiss={close}
        initialFocusRef={initialFocusRef}
      >
        <ModalTitle title="Edit a category" onClose={close} />
        <ModalBody overrideStyle={{ justifyContent: 'flex-start' }}>
          <EditCategoryForm
            category={category}
            onFormSubmit={onEditSubmit}
            initialFocusRef={initialFocusRef}
          />
        </ModalBody>
      </ModalRoot>
    </>
  );
}

export default EditCategoryController;
