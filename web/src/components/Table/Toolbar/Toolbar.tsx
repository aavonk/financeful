import { ToolbarRoot, ActionsContainer } from './style';
import { TableInstance } from 'react-table';
import TransactionForm from '@Components/TransactionForm';
import Searchbox from './Searchbox';

type ToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

function Toolbar<T extends Record<string, unknown>>({
  instance,
}: ToolbarProps<T>) {
  const { allColumns } = instance;
  console.log(
    allColumns.filter((it) => it.canFilter).filter((col) => col.id === 'date'),
  );
  return (
    <ToolbarRoot>
      {allColumns
        .filter((it) => it.canFilter && it.id !== 'date')
        .map((column) => (
          <div key={column.id}>{column.render('Filter')}</div>
        ))}
      <ActionsContainer>
        {allColumns
          .filter((it) => it.canFilter)
          .filter((col) => col.id === 'date')
          .map((column) => (
            <div key={column.id}>{column.render('Filter')}</div>
          ))}
        <Searchbox instance={instance} />
        <TransactionForm />
      </ActionsContainer>
    </ToolbarRoot>
  );
}

export default Toolbar;
