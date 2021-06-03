import React from 'react';
import { ToolbarRoot, ToolbarBottom, ToolbarTop, ToolbarActions } from './style';
import { TableInstance } from 'react-table';
import { useDateRangeContext } from '@Context/daterange/DateRangeContext';
import { useTableContext } from '@Context/react-table/reactTableContext';
import Searchbox from './Searchbox';
import DateRangeFilter from '@Components/DateFilter/DateRangeFilter';
import TransactionFormController from '../../Forms/TransactionForm/TransactionFormController';

type Props = { hide?: boolean };

function Toolbar({ hide }: Props) {
  const { allColumns } = useTableContext();
  const { range, setRange } = useDateRangeContext();
  return (
    <>
      {hide ? null : (
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
        </ToolbarRoot>
      )}
    </>
  );
}

export default Toolbar;
