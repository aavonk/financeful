import { ToolbarRoot } from './style';
import Searchbox from './Searchbox';
import Tabs from './Tabs';

function Toolbar() {
  return (
    <ToolbarRoot>
      <Tabs />
      <Searchbox />
    </ToolbarRoot>
  );
}

export default Toolbar;
