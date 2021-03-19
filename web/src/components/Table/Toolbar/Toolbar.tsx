import { ToolbarRoot, ActionsContainer } from './style';
import Searchbox from './Searchbox';
import { TableInstance } from 'react-table';
// import DatePicker from './DateRangeFilter';

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
        {/* <DatePicker /> */}
        <Searchbox instance={instance} />
      </ActionsContainer>
    </ToolbarRoot>
  );
}

export default Toolbar;
