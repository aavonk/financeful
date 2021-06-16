import React from 'react';
import { InsetInput, ErrorMessage } from '@Common/FormElements';
import { FormRow } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import ToggleSwitch from '@Common/ToggleSwitch';
import { SectionTitle, Label } from './style';
import { Footer } from '@Components/Modal/style';
import Button from '@Common/Button';
import type { CategoryCreateInput, Category } from '@Generated/graphql';

type Props = {
  initialFocusRef: React.MutableRefObject<HTMLInputElement | null>;
  onFormSubmit: (values: CategoryCreateInput) => void;
  onDeleteSubmit: (category: Category) => void;
  category: Category;
  disableSubmit: boolean;
};

type InputType = {
  name: string;
  description: string;
  excludeFromBudget: boolean;
  isIncome: boolean;
  isHidden: boolean;
};

function EditCategoryForm({
  initialFocusRef,
  onFormSubmit,
  onDeleteSubmit,
  category,
  disableSubmit,
}: Props) {
  const {
    values,
    handleChange,
    handleTrim,
    handleBooleanChange,
    handleSubmit,
    errors,
  } = useForm<InputType>({
    initialValue: {
      name: category.name,
      description: category.description ? category.description : '',
      excludeFromBudget: category.excludeFromBudget!,
      isIncome: category.isIncome!,
      isHidden: category.isHidden!,
    },
    validations: {
      name: {
        required: {
          value: true,
          message: 'What should we call this category?',
        },
        custom: {
          isValid: (value) => value.length > 2 && value.length < 101,
          message: 'Please choose a name between 3-100 characters',
        },
      },
    },
    onSubmit: () => {
      const formattedValues = {
        ...values,
        description: values.description.length ? values.description : null,
      };

      onFormSubmit(formattedValues);
    },
  });

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <FormRow>
        <InsetInput
          type="text"
          onChange={handleChange('name')}
          onBlur={handleTrim('name')}
          value={values.name}
          ref={initialFocusRef}
        >
          Name
        </InsetInput>
        {errors.name && (
          <ErrorMessage id="name-error-message">{errors.name}</ErrorMessage>
        )}
      </FormRow>
      <FormRow>
        <InsetInput
          type="text"
          onChange={handleChange('description')}
          onBlur={handleTrim('description')}
          value={values.description}
        >
          Description (optional)
        </InsetInput>
      </FormRow>
      <FormRow>
        <SectionTitle>Options</SectionTitle>
      </FormRow>
      <FormRow>
        <Label>
          Treat as income
          <ToggleSwitch
            small
            ariaLabel="Treat as income switch"
            checked={values.isIncome}
            onChange={(checked: boolean) => {
              handleBooleanChange('isIncome', checked);
            }}
          />
        </Label>
      </FormRow>
      <FormRow>
        <Label>
          Exclude from budget
          <ToggleSwitch
            small
            ariaLabel="Treat as income switch"
            checked={values.excludeFromBudget}
            onChange={(checked: boolean) => {
              handleBooleanChange('excludeFromBudget', checked);
            }}
          />
        </Label>
      </FormRow>
      <FormRow>
        <Label>
          Hide Category
          <ToggleSwitch
            small
            ariaLabel="Hide category switch"
            checked={values.isHidden}
            onChange={(checked: boolean) => {
              handleBooleanChange('isHidden', checked);
            }}
          />
        </Label>
      </FormRow>
      <Footer justify="space-between">
        <Button
          variant="danger-secondary"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            onDeleteSubmit(category);
          }}
        >
          Delete
        </Button>
        <Button variant="primary" type="submit" disabled={disableSubmit}>
          Save
        </Button>
      </Footer>
    </form>
  );
}

export default EditCategoryForm;
