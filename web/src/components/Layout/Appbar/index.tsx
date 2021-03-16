import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import { useSidebar } from '@Context/sidebar/sidebarContext';
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

function Appbar() {
  const { pathname } = useLocation();
  const mobileDevice = useMediaQuery('(max-width: 500px)');
  const {
    state: { isOpen },
    dispatch,
  } = useSidebar();
  return (
    <>
      <AppbarRoot $open={isOpen}>
        <AppbarContainer>
          <AppbarMenu>
            <IconButton
              grey
              onClick={() => dispatch({ type: 'TOGGLE' })}
              data-testid="toggle-button"
              aria-label="toggle-sidebar"
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
