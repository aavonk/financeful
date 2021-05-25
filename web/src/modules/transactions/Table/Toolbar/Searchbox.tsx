import React, { useState } from 'react';
import { SearchIcon } from '@Common/Icons';
import { SearchInput, SearchContainer } from './style';
import { TableInstance, useAsyncDebounce } from 'react-table';

type SearchProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

function Searchbox<T extends Record<string, unknown>>({ instance }: SearchProps<T>) {
  const { state, setGlobalFilter } = instance;
  const { globalFilter } = state;
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <SearchContainer>
      <SearchInput
        placeholder="Search transactions..."
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <SearchIcon />
    </SearchContainer>
  );
}

export default Searchbox;
