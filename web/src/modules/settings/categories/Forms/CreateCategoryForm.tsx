import React from 'react';
import { InsetInput, ErrorMessage } from '@Common/FormElements';
import { FormRow } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import ToggleSwitch from '@Common/ToggleSwitch';
import { SectionTitle, Label } from './style';
import { Footer } from '@Components/Modal/style';
import Button from '@Common/Button';
import type { CategoryCreateInput } from '@Generated/graphql';

type Props = {
  initialFocusRef: React.MutableRefObject<HTMLInputElement | null>;
  onFormSubmit: (values: CategoryCreateInput) => void;
};

type InputType = {
  name: string;
  description: string;
  excludeFromBudget: boolean;
  isIncome: boolean;
};

function CreateCategoryForm({ initialFocusRef, onFormSubmit }: Props) {
  const {
    values,
    handleChange,
    handleTrim,
    handleBooleanChange,
    handleSubmit,
    errors,
  } = useForm<InputType>({
    initialValue: {
      name: '',
      description: '',
      excludeFromBudget: false,
      isIncome: false,
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
        isHidden: false,
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
      <Footer>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Footer>
    </form>
  );
}

export default CreateCategoryForm;
