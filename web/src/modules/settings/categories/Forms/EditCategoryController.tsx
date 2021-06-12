import React from 'react';
import EditCategoryForm from './EditCategoryForm';
import { ModalRoot, ModalTitle, ModalBody } from '@Components/Modal';
import { useUpdateCategoryMutation, useDeleteCategoryMutation } from '@Generated/graphql';
import type { Category, CategoryCreateInput } from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import { useConfirmation } from '@Context/confirmation/confirmationContext';
import { useDeleteCategory } from '../../mutations/useDeleteCategory';
type Props = {
  category: Category | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditCategoryController({ category, isOpen, setIsOpen }: Props) {
  if (!category) {
    return null;
  }
  const [updateCategory, { loading }] = useUpdateCategoryMutation();
  const { mutate: deleteCategory } = useDeleteCategory(category!.id);
  const { showAlert } = useAlert();
  const confirm = useConfirmation();

  const initialFocusRef = React.useRef<HTMLInputElement | null>(null);

  const close = () => setIsOpen(false);

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

  const onDeleteSubmit = async (category: Category) => {
    const shouldProceed = await confirm({
      dangerButtonText: 'Delete',
      title: 'Are you sure?',
      description: `If you delete ${category.name} from your categories, you will no longer be able to apply transactions to this category, and will have to recategorize the transactions that currently have this category.`,
    });

    if (!shouldProceed) return;

    try {
      const res = await deleteCategory({ variables: { categoryId: category.id } });

      if (res.data?.deleteCategory) {
        showAlert(res.data.deleteCategory, 'info');
        close();
      }
    } catch (err) {
      showAlert('We ran into a problem. Try again?', 'error', 7000);
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
            onDeleteSubmit={onDeleteSubmit}
          />
        </ModalBody>
      </ModalRoot>
    </>
  );
}

export default EditCategoryController;
