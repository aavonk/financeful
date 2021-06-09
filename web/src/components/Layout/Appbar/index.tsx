import React, { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import { MenuIcon, ScheduleIcon } from '@Common/Icons';
import Badge from '@Common/Badge';
import IconButton from '@Common/IconButton';
import PageTitle from '@Common/PageTitle';
import NotificationsMenu from './NotificationsMenu';
import UserMenu from './UserMenu';
import { AppbarRoot, AppbarContainer, AppbarMenu, AppbarActions } from './style';

function Appbar() {
  const { pathname } = useLocation();
  const mobileDevice = useMediaQuery('(max-width: 500px)');

  return (
    <>
      <AppbarRoot>
        <AppbarContainer>
          <AppbarMenu>
            <PageTitle location={pathname.split('/')[1]} />
          </AppbarMenu>
          <AppbarActions>
            {!mobileDevice && (
              <Badge badgeContent={4}>
                <IconButton
                  grey
                  onClick={() => alert('Upcoming items reminder')}
                  aria-label="Show upcoming items menu"
                  aria-haspopup="true"
                  ariaText="Upcoming items"
                >
                  <ScheduleIcon />
                </IconButton>
              </Badge>
            )}
            {!mobileDevice && <NotificationsMenu />}
            <UserMenu />
          </AppbarActions>
        </AppbarContainer>
      </AppbarRoot>
    </>
  );
}

export default Appbar;
