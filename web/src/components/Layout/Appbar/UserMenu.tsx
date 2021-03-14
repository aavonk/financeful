import * as React from 'react';
import Dropdown from '@Common/Dropdown';
import { LogoutIcon, WalletIcon } from '@Common/Icons';
import { StyledMenuItem, Divider } from './UserMenu.style';
import { useAuth } from '@Context/auth/authContext';

type UserMenuProps = {
  open: boolean;
  setOpen: (_: boolean) => void;
};

function UserMenu({ open, setOpen }: UserMenuProps) {
  const { dispatch } = useAuth();
  return (
    <>
      <Dropdown open={open} setOpen={setOpen} className="user-menu">
        <StyledMenuItem>
          <WalletIcon />
          <span>My Wallet</span>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={() => dispatch({ type: 'LOGOUT' })}>
          <LogoutIcon />
          <span>Logout</span>
        </StyledMenuItem>
      </Dropdown>
    </>
  );
}

export default UserMenu;
