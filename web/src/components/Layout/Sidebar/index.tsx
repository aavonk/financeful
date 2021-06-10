import React from 'react';
import {
  SidebarRoot,
  SidebarBrand,
  NavigationItems,
  NavItem,
  NavWrapper,
  Logo,
} from './style';
import IconSvg from '@Common/LogoSvg/Logo';
import {
  DashboardIcon,
  SettingsIcon,
  CalendarIcon,
  BillsIcon,
  CreditCardIcon,
  WalletIcon,
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
    tooltip: 'My Wallet',
    tooltipDirection: 'right',
    path: '/my-wallet',
    text: 'My Wallet',
    icon: <WalletIcon />,
    ariaLabel: 'My wallet page',
  },
  {
    tooltip: 'Budget',
    tooltipDirection: 'right',
    path: '/budget',
    text: 'Budget',
    icon: <CalendarIcon />,
    ariaLabel: 'Budget page',
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
  return (
    <SidebarRoot data-testid="sidebar">
      <SidebarBrand>
        <Logo>
          <IconSvg />
        </Logo>
      </SidebarBrand>
      <NavWrapper>
        <NavigationItems>
          {items.map((item, index) => (
            <Tooltip content={item.tooltip} direction={item.tooltipDirection} key={index}>
              <NavItem to={item.path} exact aria-label={item.ariaLabel}>
                {item.icon}
                <span>{item.text}</span>
              </NavItem>
            </Tooltip>
          ))}
        </NavigationItems>
        {/* Bottom */}
        <Tooltip content="Settings" direction="top">
          <NavItem to="/settings/profile" $last aria-label="Settings page">
            <SettingsIcon />
            <span>Settings</span>
          </NavItem>
        </Tooltip>
      </NavWrapper>
    </SidebarRoot>
  );
}

export default Sidebar;
