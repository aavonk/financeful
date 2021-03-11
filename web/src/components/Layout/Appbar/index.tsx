import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Avatar from '@Common/Avatar';
import Tooltip from '@Common/Tooltip';
import Badge from '@Common/Badge';
import {
  ChevronDownIcon,
  MenuIcon,
  NotificationsIcon,
  ScheduleIcon,
} from '@Common/Icons';
import IconButton from '@Common/IconButton';
import PageTitle from '@Common/PageTitle';
import NotificationsMenu from './NotificationsMenu';
import UserMenu from './UserMenu';
import {
  AppbarRoot,
  AppbarContainer,
  AppbarMenu,
  AppbarActions,
  MenuButton,
  DropdownContainer,
} from './style';
import { useMediaQuery } from '@Hooks/useMediaQuery';

type Props = {
  drawerOpen: boolean;
  setDrawerOpen: (__: boolean) => void;
};

const TooltipStyle = {
  width: 'auto',
} as const;

function Appbar({ setDrawerOpen, drawerOpen }: Props) {
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const mobileDevice = useMediaQuery('(max-width: 500px)');
  return (
    <>
      <AppbarRoot $open={drawerOpen}>
        <AppbarContainer>
          <AppbarMenu>
            <IconButton
              grey
              onClick={() => setDrawerOpen(!drawerOpen)}
              data-testid="toggle-button"
              aria-label="toggle-sidebar"
            >
              <MenuIcon />
            </IconButton>

            <PageTitle location={pathname} />
          </AppbarMenu>
          <AppbarActions>
            {!mobileDevice && (
              <>
                <Tooltip
                  content="Show upcoming items"
                  direction="bottom"
                  autoWidth
                >
                  <Badge badgeContent={4}>
                    <IconButton
                      grey
                      onClick={() => alert('Upcoming items reminder')}
                      aria-label="Show upcoming items menu"
                      aria-haspopup="true"
                    >
                      <ScheduleIcon />
                    </IconButton>
                  </Badge>
                </Tooltip>
              </>
            )}

            <DropdownContainer>
              {!mobileDevice && (
                <>
                  <Tooltip content="Show notifications" direction="bottom">
                    <IconButton
                      grey
                      onClick={() => setNotificationsOpen(true)}
                      aria-haspopup="true"
                      aria-expanded={notificationsOpen}
                      aria-label="Show notifications menu"
                      data-testid="notifications-button"
                    >
                      <NotificationsIcon />
                    </IconButton>
                  </Tooltip>
                  <NotificationsMenu
                    open={notificationsOpen}
                    setOpen={setNotificationsOpen}
                  />
                </>
              )}
            </DropdownContainer>
            <DropdownContainer>
              <MenuButton
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen(true)}
                data-testid="user-menu-button"
              >
                <i>
                  <ChevronDownIcon />
                </i>
                <Avatar size="36px" alt="Aaron" />
                <span>Aaron</span>
              </MenuButton>
              <UserMenu open={userMenuOpen} setOpen={setUserMenuOpen} />
            </DropdownContainer>
          </AppbarActions>
        </AppbarContainer>
      </AppbarRoot>
    </>
  );
}

Appbar.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
};

export default Appbar;
