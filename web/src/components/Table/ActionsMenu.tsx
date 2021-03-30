import IconDropdown, { DropdownItems } from '@Common/IconDropdown';
import { VerticalMenuIcon } from '@Common/Icons';

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
    <>
      <IconDropdown
        icon={<VerticalMenuIcon />}
        items={items}
        id="actions-menu"
      />
    </>
  );
}

export default ActionsMenu;
