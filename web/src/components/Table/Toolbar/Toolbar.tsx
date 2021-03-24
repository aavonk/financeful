import { ToolbarRoot, ActionsContainer } from './style';
import Searchbox from './Searchbox';
import { TableInstance } from 'react-table';
import Button from '@Common/Button';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import TransactionForm from '@Components/TransactionForm';

type ToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

function Toolbar<T extends Record<string, unknown>>({
  instance,
}: ToolbarProps<T>) {
  const { allColumns } = instance;
  const smallDevice = useMediaQuery('(max-width: 605px)');
  return (
    <ToolbarRoot>
      {allColumns
        .filter((it) => it.canFilter)
        .map((column) => (
          <div key={column.id}>{column.render('Filter')}</div>
        ))}
      <ActionsContainer>
        <Searchbox instance={instance} />

        {/* <Button variant="primary" onClick={() => alert('hi')}>
          {smallDevice ? 'New' : 'Add Transaction'}
        </Button> */}
        <TransactionForm />
      </ActionsContainer>
    </ToolbarRoot>
  );
}

export default Toolbar;
