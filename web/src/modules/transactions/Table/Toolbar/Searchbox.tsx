import React, { useState } from 'react';
import { SearchIcon } from '@Common/Icons';
import { SearchInput, SearchContainer } from './style';
import { useAsyncDebounce } from 'react-table';
import { useTableContext } from '@Context/react-table/reactTableContext'


function Searchbox() {
  const { state, setGlobalFilter } = useTableContext();
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
