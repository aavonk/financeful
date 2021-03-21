import { ToolbarRoot, ActionsContainer } from './style';
import Searchbox from './Searchbox';
import { TableInstance } from 'react-table';
import Button from '@Common/Button';

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
        <Button variant="primary" onClick={() => alert('hi')}>
          Add Transaction
        </Button>
      </ActionsContainer>
    </ToolbarRoot>
  );
}

export default Toolbar;
