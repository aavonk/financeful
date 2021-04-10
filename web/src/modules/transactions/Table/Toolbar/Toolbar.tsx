import { ToolbarRoot, ActionsContainer } from './style';
import { TableInstance } from 'react-table';
import TransactionForm from '../../Forms/TransactionForm/TransactionFormController';
import Searchbox from './Searchbox';

type ToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

function Toolbar<T extends Record<string, unknown>>({ instance }: ToolbarProps<T>) {
  const { allColumns } = instance;

  return (
    <ToolbarRoot>
      {allColumns
        .filter((it) => it.canFilter && it.id !== 'date')
        .map((column) => (
          <div key={column.id}>{column.render('Filter')}</div>
        ))}
      <ActionsContainer>
        <Searchbox instance={instance} />
        <TransactionForm />
      </ActionsContainer>
    </ToolbarRoot>
  );
}

export default Toolbar;
