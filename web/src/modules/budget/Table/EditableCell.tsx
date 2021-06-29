import React from 'react';
import type { Row, ColumnInstance } from 'react-table';
import { InsetInput } from '@Common/FormElements';

type Props<T extends {}> = {
  value: any;
  row: Row<T>;
  column: ColumnInstance<T>;
  updateData: (columnId: string, value: any, originalRow: Row<T>['original']) => void;
};

function EditableCell<T extends Record<string, unknown>>({
  value: initialValue,
  row: { original: originalRow },
  column: { id },
  updateData,
}: Props<T>) {
  const [value, setValue] = React.useState(initialValue);

  //TODO: Make sure the input is valid currency format!!!!!!!!!!!!!
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Editable Cell Input changing');
    setValue(e.target.value);
  };
  const onBlur = () => {
    updateData(id, value, originalRow);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <InsetInput
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      style={{ maxWidth: '100px', height: '30px' }}
      withoutLabel
    />
  );
}

export default EditableCell;
