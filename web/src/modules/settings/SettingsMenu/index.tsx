import React from 'react';
import { NavMenu, Link } from './style';

type SettingsItem = {
  subpath: string;
  text: string;
};

const items: SettingsItem[] = [
  {
    subpath: '/accounts',
    text: 'Accounts',
  },
  {
    subpath: '/categories',
    text: 'Categories',
  },
  {
    subpath: '/security',
    text: 'Account security',
  },
];

function SettingsMenu() {
  return (
    <NavMenu>
      <ul>
        <li>Account settings</li>
        {items.map((item) => (
          <li>
            <Link to={`/settings${item.subpath}`}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </NavMenu>
  );
}

export default SettingsMenu;
