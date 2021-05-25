import React from 'react';
import { ToolbarRoot, ToolbarBottom, ToolbarTop, ToolbarActions } from './style';
import { TableInstance } from 'react-table';
import TransactionFormController from '../../Forms/TransactionForm/TransactionFormController';
import Searchbox from './Searchbox';
import DateRangeFilter from '@Components/DateFilter/DateRangeFilter';

type ToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

function Toolbar<T extends Record<string, unknown>>({ instance }: ToolbarProps<T>) {
  const { allColumns } = instance;

  return (
    <ToolbarRoot>
      <ToolbarTop>
        {allColumns
          .filter((it) => it.canFilter && it.id !== 'date')
          .map((column) => (
            <React.Fragment key={column.id}>{column.render('Filter')}</React.Fragment>
          ))}
        <ToolbarActions>
          <DateRangeFilter
            selected="90 days"
            range={{ startDate: new Date(), endDate: new Date(), label: '90 days' }}
            setRange={() => console.log('date')}
            containerStyle={{ paddingRight: 0 }}
          />
        </ToolbarActions>
      </ToolbarTop>
      <ToolbarBottom>
        <Searchbox instance={instance} />
        <TransactionFormController asIcon />
      </ToolbarBottom>
    </ToolbarRoot>
  );
}

export default Toolbar;
