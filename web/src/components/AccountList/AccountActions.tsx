import { ErrorIcon, InfoIcon, VerticalMenuIcon } from '@Common/Icons';
import IconDropdown, { DropdownItems } from '@Common/IconDropdown';
import { Account } from '@Generated/graphql';

export type IAccountActions = {
  onEditClick: (account: Account) => void;
  onDelete: (account: Account) => void;
};

type Props = {
  account: Account;
} & IAccountActions;

function AccountActions({ onDelete, onEditClick, account }: Props) {
  const possibleActions: DropdownItems = [
    {
      label: 'Delete account',
      icon: <ErrorIcon />,
      iconVariant: 'danger',
      onSelect: () => onDelete(account),
    },
    {
      label: 'Edit details',
      icon: <InfoIcon />,
      iconVariant: 'muted',
      onSelect: () => onEditClick(account),
    },
  ];
  return (
    <>
      <IconDropdown
        icon={<VerticalMenuIcon />}
        items={possibleActions}
        id="account-actions"
        ariaText="Account Actions"
        variant="small"
      />
    </>
  );
}

export default AccountActions;
