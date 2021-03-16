import { ToolbarRoot, ActionsContainer } from './style';
import Searchbox from './Searchbox';
import Tabs from './Tabs';
import SortButton from './SortButton';

function Toolbar() {
  return (
    <ToolbarRoot>
      <Tabs />
      <ActionsContainer>
        <Searchbox />
        <SortButton />
      </ActionsContainer>
    </ToolbarRoot>
  );
}

export default Toolbar;
