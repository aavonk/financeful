import { ToolbarRoot, ActionsContainer } from './style';
import Searchbox from './Searchbox';
import Tabs from './Tabs';
import { TableInstance } from 'react-table';

type ToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

function Toolbar<T extends Record<string, unknown>>({
  instance,
}: ToolbarProps<T>) {
  return (
    <ToolbarRoot>
      <Tabs instance={instance} />
      <ActionsContainer>
        <Searchbox instance={instance} />
      </ActionsContainer>
    </ToolbarRoot>
  );
}

export default Toolbar;
