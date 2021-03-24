import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import { MenuIcon, ScheduleIcon } from '@Common/Icons';
import Badge from '@Common/Badge';
import IconButton from '@Common/IconButton';
import PageTitle from '@Common/PageTitle';
import NotificationsMenu from './NotificationsMenu';
import UserMenu from './UserMenu';
import {
  AppbarRoot,
  AppbarContainer,
  AppbarMenu,
  AppbarActions,
} from './style';

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

function Appbar({ isSidebarOpen, setIsSidebarOpen }: Props) {
  const { pathname } = useLocation();
  const mobileDevice = useMediaQuery('(max-width: 500px)');

  return (
    <>
      <AppbarRoot $open={isSidebarOpen}>
        <AppbarContainer>
          <AppbarMenu>
            <IconButton
              grey
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              data-testid="toggle-button"
              aria-label="toggle-sidebar"
              ariaText="Toggle sidebar"
            >
              <MenuIcon />
            </IconButton>
            <PageTitle location={pathname} />
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
