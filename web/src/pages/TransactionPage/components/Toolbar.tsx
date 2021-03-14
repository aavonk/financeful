import { ToolbarRoot } from './style';
import Searchbox from './Searchbox';
import Tabs from './Tabs';
import Filters from './Filters';

function Toolbar() {
  return (
    <ToolbarRoot>
      <Tabs />
      <Searchbox />
      <Filters />
    </ToolbarRoot>
  );
}

export default Toolbar;
