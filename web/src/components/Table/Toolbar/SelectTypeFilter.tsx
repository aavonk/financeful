import * as React from 'react';
import { FilterProps } from 'react-table';
import { Transaction } from '@Generated/graphql';
import { TabContainer, TabItem, TabLabel, Indicator } from './style';
import { isTypeSystemDefinitionNode } from 'graphql';

function SelectTypeFilter({
  column: { filterValue, render, setFilter, preFilteredRows, id },
}: FilterProps<Transaction>) {
  // const [activeTab, setActiveTab] = React.useState('all-transactions')
  const options = React.useMemo(() => {
    const opts = new Set<any>();
    preFilteredRows.forEach((row) => {
      opts.add(row.values[id]);
    });
    return [...Array.from(opts.values())];
  }, [id, preFilteredRows]);

  return (
    <>
      <TabContainer>
        {options.map((item, index) => (
          <TabItem
            key={index}
            defaultValue={item}
            onClick={() => setFilter(item)}
          >
            <TabLabel>{item}</TabLabel>
            <Indicator />
          </TabItem>
        ))}
      </TabContainer>
    </>
  );
}

export default SelectTypeFilter;
