import * as React from 'react';
import { Dropdown } from '@Common/Dropdown';
import { LogoutIcon, WalletIcon } from '@Common/Icons';
import { StyledMenuItem, Divider } from './UserMenu.style';

type UserMenuProps = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (_: boolean) => void;
};

function UserMenu({ open, setOpen }: UserMenuProps) {
  return (
    <>
      <Dropdown open={open} setOpen={setOpen} className="user-menu">
        <StyledMenuItem>
          <WalletIcon />
          <span>My Wallet</span>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <LogoutIcon />
          <span>Logout</span>
        </StyledMenuItem>
      </Dropdown>
    </>
  );
}

export default UserMenu;
