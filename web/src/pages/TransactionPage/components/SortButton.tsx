import { useState } from 'react';
import DropdownButton from '@Common/DropdownButton';

function SortButton() {
  const [selectedOption, setSelectedOption] = useState('Newest');

  const items = [
    {
      label: 'Newest',
      onSelect: () => setSelectedOption('Newest'),
    },
    {
      label: 'Oldest',
      onSelect: () => setSelectedOption('Oldest'),
    },
    {
      label: 'By date',
      onSelect: () => setSelectedOption('By date'),
    },
  ];
  return (
    <DropdownButton
      selected={selectedOption}
      items={items}
      id="filter-transactions"
    />
  );
}

export default SortButton;
