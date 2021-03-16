import {
  SidebarRoot,
  SidebarBrand,
  NavigationItems,
  NavItem,
  NavWrapper,
  Logo,
} from './style';
import IconSvg from '@Common/LogoSvg/IconSvg';
import {
  DashboardIcon,
  SettingsIcon,
  CalendarIcon,
  BillsIcon,
  CreditCardIcon,
  ChevronLeftIcon,
} from '@Common/Icons';
import Tooltip from '@Common/Tooltip';
import IconButton from '@Common/IconButton';
import { useSidebar } from '@Context/sidebar/sidebarContext';

const items = [
  {
    tooltip: 'Dashboard',
    tooltipDirection: 'right',
    path: '/dashboard',
    text: 'Dashboard',
    icon: <DashboardIcon />,
    ariaLabel: 'Dashboard page',
  },
  {
    tooltip: 'Transactions',
    tooltipDirection: 'right',
    path: '/transactions',
    text: 'Transactions',
    icon: <CreditCardIcon />,
    ariaLabel: 'Transactions page',
  },
  {
    tooltip: 'Calendar',
    tooltipDirection: 'right',
    path: '/calendar',
    text: 'Calendar',
    icon: <CalendarIcon />,
    ariaLabel: 'Calendar page',
  },
  {
    tooltip: 'Bills',
    tooltipDirection: 'right',
    path: '/bills',
    text: 'Bills',
    icon: <BillsIcon />,
    ariaLabel: 'Bills page',
  },
];

function Sidebar() {
  const {
    state: { isOpen },
    dispatch,
  } = useSidebar();

  return (
    <SidebarRoot $open={isOpen} data-testid="sidebar">
      <SidebarBrand>
        <Logo>
          <IconSvg />
          <h2>financeful</h2>
        </Logo>
        <span>
          <IconButton onClick={() => dispatch({ type: 'CLOSE' })}>
            <ChevronLeftIcon />
          </IconButton>
        </span>
      </SidebarBrand>
      <NavWrapper>
        <NavigationItems>
          {items.map((item, index) => (
            <Tooltip
              content={item.tooltip}
              direction={item.tooltipDirection}
              key={index}
            >
              <NavItem to={item.path} exact aria-label={item.ariaLabel}>
                {item.icon}
                <span>{item.text}</span>
              </NavItem>
            </Tooltip>
          ))}
        </NavigationItems>
        {/* Bottom */}
        <Tooltip content="Settings" direction="top">
          <NavItem to="/settings" $last aria-label="Settings page">
            <SettingsIcon />
            <span>Settings</span>
          </NavItem>
        </Tooltip>
      </NavWrapper>
    </SidebarRoot>
  );
}

export default Sidebar;
