import React from 'react';
import EditCategoryForm from './EditCategoryForm';
import { ModalRoot, ModalTitle, ModalBody } from '@Components/Modal';
import { useUpdateCategoryMutation } from '@Generated/graphql';
import type { Category, CategoryCreateInput } from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';

type Props = {
  category: Category | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditCategoryController({ category, isOpen, setIsOpen }: Props) {
  const [updateCategory, { loading }] = useUpdateCategoryMutation();

  const initialFocusRef = React.useRef<HTMLInputElement | null>(null);
  const { showAlert } = useAlert();

  const close = () => setIsOpen(false);

  if (!category) {
    return null;
  }

  const onEditSubmit = async (values: CategoryCreateInput) => {
    try {
      const response = await updateCategory({
        variables: { categoryId: category.id!, input: values },
      });
      const updatedCategory = response.data?.updateCategory;

      if (response.errors) {
        showAlert('We ran into a problem. Try again?', 'error');
      }

      if (updatedCategory) {
        close();
        showAlert(`Successfully updated ${updatedCategory.name}`, 'info');
      }
    } catch (err) {
      showAlert('We ran into a problem. Try again?', 'error');
    }
  };

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
            disableSubmit={loading}
          />
        </ModalBody>
      </ModalRoot>
    </>
  );
}

export default EditCategoryController;
