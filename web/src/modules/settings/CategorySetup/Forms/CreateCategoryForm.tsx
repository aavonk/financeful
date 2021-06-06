import React from 'react';
import { CategoryCreateInput } from '@Generated/graphql'
import { InsetInput } from '@Common/FormElements';
import { FormRow } from '@Globals/index';
import { useForm } from '@Hooks/useForm'
import ToggleSwitch from '@Common/ToggleSwitch';

type Props = {
  initialFocusRef: React.MutableRefObject<HTMLInputElement | null>;
};

const initialState: CategoryCreateInput = {
  name: '',
  description: '',
  excludeFromBudget: false,
  isIncome: false,
}

function CreateCategoryForm({ initialFocusRef }: Props) {
  // const {} = useForm<CategoryCreateInput>({

  // })
  return (
    <C>
      <FormRow>
        <InsetInput
          type="text"
          onChange={() => console.log('change')}
          value=""
          ref={initialFocusRef}
        >
          Name
        </InsetInput>
      </FormRow>
      <FormRow>
        <InsetInput type="text" onChange={() => console.log('change')} value="">
          Description (optional)
        </InsetInput>
      </FormRow>
      <FormRow>
        <ToggleSwitch
          small
          ariaLabel="Treat as income switch"
          checked={false}
          onChange={(e: any) => console.log(e)}
        />
      </FormRow>
    </CategoryCreateInput>
  );
}

export default CreateCategoryForm;
