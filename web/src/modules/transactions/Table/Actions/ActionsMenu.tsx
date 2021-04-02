import IconDropdown, { DropdownItems } from '@Common/IconDropdown';
import { VerticalMenuIcon, InfoIcon, ErrorIcon } from '@Common/Icons';
import { AlignRight } from '../style';

type Props = {
  onDelete: () => void;
  onEditClick: () => void;
};

function ActionsMenu({ onDelete, onEditClick }: Props) {
  const possibleActions: DropdownItems = [
    {
      label: 'Delete transaction',
      icon: <ErrorIcon />,
      iconVariant: 'danger',
      onSelect: () => onDelete(),
    },
    {
      label: 'Edit details',
      icon: <InfoIcon />,
      iconVariant: 'muted',
      onSelect: () => onEditClick(),
    },
  ];
  return (
    <AlignRight>
      <IconDropdown
        icon={<VerticalMenuIcon />}
        items={possibleActions}
        id="actions-menu"
        ariaText="Actions"
        variant="small"
      />
    </AlignRight>
  );
}

export default ActionsMenu;
