import * as React from 'react';
import { Menu } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import Badge from '@Common/Badge';
import { StyledMenuButton, StyledMenuList, StyledMenuItem } from './style';

export type DropdownItems = Array<{
  icon?: React.ReactNode;
  label: string;
  onSelect: () => void;
}>;

type Props = {
  icon: React.ReactNode;
  withBadge?: boolean;
  badgeContent?: string | number;
  id: string;
  items: DropdownItems;
};

/* children : [
  {
    icon?: <Icon />,
    label: "Some Text"
    onClick: () => void
  }
]

*/

function IconDropdown({ icon, withBadge, badgeContent, items, id }: Props) {
  return (
    <Menu>
      {withBadge && badgeContent ? (
        <Badge badgeContent={badgeContent}>
          <StyledMenuButton $grey id={id}>
            {icon}
          </StyledMenuButton>
        </Badge>
      ) : (
        <StyledMenuButton $grey id={id}>
          {icon}
        </StyledMenuButton>
      )}

      <StyledMenuList>
        {items.map((child, index) => (
          <StyledMenuItem key={index} onSelect={child.onSelect}>
            {child.icon ? (
              <>
                <i>{child.icon}</i>
                <span>{child.label}</span>
              </>
            ) : (
              <span>{child.label}</span>
            )}
          </StyledMenuItem>
        ))}
      </StyledMenuList>
    </Menu>
  );
}

export default IconDropdown;
