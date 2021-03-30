import IconDropdown, { DropdownItems } from '@Common/IconDropdown';
import { VerticalMenuIcon } from '@Common/Icons';
import { AlignRight } from './style';

function ActionsMenu() {
  const items: DropdownItems = [
    {
      label: 'Delete transaction',
      onSelect: () => console.log('ok'),
    },
    {
      label: 'Edit details',
      onSelect: () => console.log('ok'),
    },
  ];
  return (
    <AlignRight>
      <IconDropdown
        icon={<VerticalMenuIcon />}
        items={items}
        id="actions-menu"
        ariaText="Actions"
        variant="small"
      />
    </AlignRight>
  );
}

export default ActionsMenu;
