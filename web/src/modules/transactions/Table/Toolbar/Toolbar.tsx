import React from 'react';
import { ToolbarRoot, ToolbarBottom, ToolbarTop, ToolbarActions } from './style';
import { TableInstance } from 'react-table';
import TransactionFormController from '../../Forms/TransactionForm/TransactionFormController';
import Searchbox from './Searchbox';
import DateRangeFilter from '@Components/DateFilter/DateRangeFilter';
import { useDateRangeContext } from '@Context/daterange/DateRangeContext';

type ToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

function Toolbar<T extends Record<string, unknown>>({ instance }: ToolbarProps<T>) {
  const { allColumns } = instance;
  const { range, setRange } = useDateRangeContext();
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
            selected={range.label}
            range={range}
            setRange={setRange}
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
