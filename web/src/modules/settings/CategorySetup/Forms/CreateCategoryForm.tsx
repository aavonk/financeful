import React from 'react';
import { InsetInput } from '@Common/FormElements';

type Props = {
  initialFocusRef: React.MutableRefObject<HTMLInputElement | null>;
};

function CreateCategoryForm({ initialFocusRef }: Props) {
  return (
    <InsetInput
      type="text"
      onChange={() => console.log('change')}
      value=""
      ref={initialFocusRef}
    >
      Name
    </InsetInput>
  );
}

export default CreateCategoryForm;
