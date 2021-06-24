import React from 'react';
import type { Row, ColumnInstance } from 'react-table';

type Props<T extends {}> = {
  value: any;
  row: Row<T>;
  column: ColumnInstance<T>;
};

function EditableCell<T extends Record<string, unknown>>({
  value: initialValue,
  row: { index },
  column: { id },
}: Props<T>) {
  const [value, setValue] = React.useState(initialValue);

  //TODO: Make sure the input is valid currency format!!!!!!!!!!!!!
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    // updateMyData(index, id, value)
    console.log('blur');
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
}

export default EditableCell;
