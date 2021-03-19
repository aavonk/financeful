import * as React from 'react';
import { FilterProps } from 'react-table';
import { Transaction } from '@Generated/graphql';
import { TabContainer, TabItem, TabLabel, Indicator } from './style';
import { formatTransactionType } from '@Lib/formatTransactionType';

function SelectTypeFilter({
  column: { setFilter, preFilteredRows, id },
}: FilterProps<Transaction>) {
  const [activeTab, setActiveTab] = React.useState(0);

  const options = React.useMemo(() => {
    const opts = new Set<any>();
    preFilteredRows.forEach((row) => {
      opts.add(row.values[id]);
    });
    return [...Array.from(opts.values())];
  }, [id, preFilteredRows]);

  const onMappedItemClick = (value: string, index: number) => {
    setFilter(value);
    setActiveTab(index);
  };
  return (
    <>
      <TabContainer>
        <TabItem
          defaultValue=""
          onClick={() => {
            setFilter(undefined);
            setActiveTab(0);
          }}
          active={activeTab === 0}
        >
          <TabLabel>All Transactions</TabLabel>
          <Indicator />
        </TabItem>
        {options.map((item, index) => (
          <TabItem
            key={index}
            defaultValue={item}
            onClick={() => onMappedItemClick(item, index + 1)}
            active={activeTab === index + 1}
          >
            <TabLabel>{formatTransactionType(item)}</TabLabel>
            <Indicator />
          </TabItem>
        ))}
      </TabContainer>
    </>
  );
}

export default SelectTypeFilter;
