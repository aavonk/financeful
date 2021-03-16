import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TabContainer, TabItem, TabLabel, Indicator } from './style';
import { useQuery } from '@Hooks/useQuery';

const tabItems = [
  {
    label: 'All Transactions',
    identifier: 'all-transactions',
    ariaControls: 'all-transactions-tab',
  },
  {
    label: 'Expenses',
    identifier: 'expenses',
    ariaControls: 'expenses-tab',
  },
  {
    label: 'Income',
    identifier: 'income',
    ariaControls: 'income-tab',
  },
  {
    label: 'Transfers',
    identifier: 'transfers',
    ariaControls: 'transfers-tab',
  },
];

function Tabs() {
  const query = useQuery();
  const [activeTab, setActiveTab] = useState(() => {
    const filter = query.get('filter');
    if (!filter) {
      return 'all-transactions';
    } else {
      return filter;
    }
  });
  // eslint-disable-next-line prefer-const
  let history = useHistory();

  useEffect(() => {
    history.push(`${history.location.pathname}?filter=${activeTab}`);
  }, [activeTab]);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <>
      <TabContainer role="tablist">
        {tabItems.map((item) => (
          <TabItem
            key={item.identifier}
            active={activeTab === item.identifier}
            aria-selected={activeTab === item.identifier}
            onClick={() => handleClick(item.identifier)}
            role="tab"
            aria-controls={item.ariaControls}
          >
            <TabLabel>{item.label}</TabLabel>
            <Indicator />
          </TabItem>
        ))}
      </TabContainer>
    </>
  );
}

export default Tabs;
