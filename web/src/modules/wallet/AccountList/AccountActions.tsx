import React from 'react';
import { ErrorIcon, InfoIcon, VerticalMenuIcon, PlusIcon } from '@Common/Icons';
import IconDropdown, { DropdownItems } from '@Common/IconDropdown';
import { Account } from '@Generated/graphql';

export type IAccountActions = {
  onEditClick: (account: Account) => void;
  onDeleteClick: (account: Account) => void;
  onMarkInactiveClick: (account: Account) => void;
};

type Props = {
  account: Account;
} & IAccountActions;

function AccountActions({
  onDeleteClick,
  onEditClick,
  onMarkInactiveClick,
  account,
}: Props) {
  const possibleActions: DropdownItems = [
    {
      label: 'Edit details',
      icon: <InfoIcon />,
      iconVariant: 'muted',
      onSelect: () => onEditClick(account),
    },
    {
      label: `Mark ${!account.isInactive ? 'inactive' : 'active'}`,
      icon: <PlusIcon />,
      iconVariant: 'muted',
      onSelect: () => onMarkInactiveClick(account),
    },
    {
      label: 'Delete account',
      icon: <ErrorIcon />,
      iconVariant: 'danger',
      onSelect: () => onDeleteClick(account),
    },
  ];
  return (
    <>
      <IconDropdown
        icon={<VerticalMenuIcon data-testid="account-action-button" />}
        items={possibleActions}
        id="account-actions"
        ariaText="Account Actions"
        variant="small"
        data-testid="account-action-menu"
      />
    </>
  );
}

export default AccountActions;
