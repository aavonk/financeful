import '@reach/menu-button/styles.css';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import { ChevronDownIcon, LogoutIcon, WalletIcon } from '@Common/Icons';
import { useAuth } from '@Context/auth/authContext';
import Avatar from '@Common/Avatar';

const StyledMenuList = styled(MenuList)`
  background: ${({ theme }) => theme.colors.darkTwo};
  box-shadow: rgb(136 153 166 / 20%) 0px 0px 15px, rgb(136 153 166 / 15%) 0px 0px 3px 1px;
  border-radius: 0.25rem;
  font-size: 1rem;
  text-align: left;
`;
const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkThree};
  }

  &[data-selected] {
    background-color: ${({ theme }) => theme.colors.darkThree};
  }

  & > span > svg {
    margin-right: 0.75rem;
    vertical-align: middle;
  }

  & > a {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const StyledMenuButton = styled(MenuButton)`
  background-color: transparent;
  height: 70px;
  padding: 0.47rem 0.75rem;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  cursor: pointer;
  & > .name,
  .icon > svg {
    display: none;
  }

  @media ${({ theme }) => theme.device.tabletAndUp} {
    & > .name {
      display: inline-block;
      margin-right: 1rem;
      font-weight: 700;
      font-size: 1rem;
      color: #fff;
    }
    & .icon > svg {
      padding-top: 5px;
      margin-left: 0.4rem;
      display: inline-block;
      font-weight: 700;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.textSecondary};
      vertical-align: text-bottom;
    }
  }
`;
export const Divider = styled.div`
  height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid #343747;
`;

function UserMenu() {
  const {
    state: { user },
    dispatch,
  } = useAuth();
  const history = useHistory();
  return (
    <Menu>
      <StyledMenuButton id="user-actions">
        <span aria-hidden="true" className="icon">
          <ChevronDownIcon />
        </span>
        <Avatar size="36px" alt="profile" />
        <span className="name">{user?.firstName}</span>
      </StyledMenuButton>

      <StyledMenuList>
        <StyledMenuItem onSelect={() => history.push('/my-wallet')}>
          <span aria-hidden="true">
            <WalletIcon />
          </span>
          <span>My Wallet</span>
        </StyledMenuItem>
        <StyledMenuItem onSelect={() => dispatch({ type: 'LOGOUT' })}>
          <span aria-hidden="true">
            <LogoutIcon />
          </span>
          <span>Logout</span>
        </StyledMenuItem>
      </StyledMenuList>
    </Menu>
  );
}

export default UserMenu;
