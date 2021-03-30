import IconDropdown, { DropdownItems } from '@Common/IconDropdown';
import { VerticalMenuIcon, InfoIcon, ErrorIcon } from '@Common/Icons';
import { AlignRight } from './style';

function ActionsMenu() {
  const items: DropdownItems = [
    {
      label: 'Delete transaction',
      onSelect: () => console.log('ok'),
      icon: <ErrorIcon />,
      iconVariant: 'danger',
    },
    {
      label: 'Edit details',
      onSelect: () => console.log('ok'),
      icon: <InfoIcon />,
      iconVariant: 'muted',
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
