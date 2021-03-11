import PropTypes from 'prop-types';
import {
  SidebarRoot,
  SidebarBrand,
  NavigationItems,
  NavItem,
  NavWrapper,
} from './style';
import IconSvg from '@Common/LogoSvg/IconSvg';
import {
  DashboardIcon,
  SettingsIcon,
  CalendarIcon,
  BillsIcon,
  CreditCardIcon,
} from '@Common/Icons';
import Tooltip from '@Common/Tooltip';

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

function Sidebar({ drawerOpen }: { drawerOpen: boolean }) {
  return (
    <SidebarRoot $open={drawerOpen} data-testid="sidebar">
      <SidebarBrand>
        <IconSvg />
        <h2>financeful</h2>
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
