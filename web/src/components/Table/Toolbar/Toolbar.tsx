import { ToolbarRoot, ActionsContainer } from './style';
import { TableInstance } from 'react-table';
// import { useFetchCategoriesQuery } from '@Generated/graphql'
import TransactionForm from '@Components/TransactionForm';
import Searchbox from './Searchbox';

type ToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

function Toolbar<T extends Record<string, unknown>>({
  instance,
}: ToolbarProps<T>) {
  const { allColumns } = instance;
  return (
    <ToolbarRoot>
      {allColumns
        .filter((it) => it.canFilter)
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
