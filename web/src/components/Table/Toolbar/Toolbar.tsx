import { ToolbarRoot, ActionsContainer } from './style';
import Searchbox from './Searchbox';
import Tabs from './Tabs';
import { TableInstance } from 'react-table';
import SelectTypeFilter from './SelectTypeFilter';

type ToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

function Toolbar<T extends Record<string, unknown>>({
  instance,
}: ToolbarProps<T>) {
  const { allColumns } = instance;
  return (
    <ToolbarRoot>
      {/* <Tabs instance={instance} /> */}
      {allColumns
        .filter((it) => it.canFilter)
        .map((column) => column.render('Filter'))}
      <ActionsContainer>
        <Searchbox instance={instance} />
      </ActionsContainer>
    </ToolbarRoot>
  );
}

export default Toolbar;
